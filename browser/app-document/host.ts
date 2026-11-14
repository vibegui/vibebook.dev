import { withAppDocumentBootstrap } from "../../shared/appDocument";
import {
  APP_DOCUMENT_CHANNEL,
  documentRecord,
  documentToken,
} from "../../shared/appDocumentProtocol";

export type AppDocumentHostOptions = {
  frame: HTMLIFrameElement;
  current(): boolean;
  /** Called only after a challenge acknowledged by the original document. */
  receive(value: unknown): void;
  revoked(): void;
};
const grantedFrames = new WeakSet<HTMLIFrameElement>();
const token = () =>
  Array.from(crypto.getRandomValues(new Uint8Array(32)), (n) =>
    n.toString(16).padStart(2, "0"),
  ).join("");
const DEADLINE = 10_000;
const MAX_PENDING = 32;

/** WindowProxy identifies a frame; the single claimed port identifies its initial document. */
export function createAppDocumentHost(options: AppDocumentHostOptions) {
  const { frame } = options;
  if (grantedFrames.has(frame))
    throw Error("Reopening an app requires a fresh iframe");
  if (
    frame.hasAttribute("srcdoc") ||
    (frame.getAttribute("src") && frame.getAttribute("src") !== "about:blank")
  )
    throw Error("App documents must load through their document host");
  grantedFrames.add(frame);
  const nonce = token();
  // The name attribute only initializes a child navigable when it is created.
  // Callers must put this public label on the iframe before DOM insertion.
  const targetName = frame.getAttribute("name");
  let started = false;
  let loaded = false;
  let disposed = false;
  let revoked = false;
  let port: MessagePort | null = null;
  let navigationForm: HTMLFormElement | null = null;
  const clearNavigationForm = () => {
    navigationForm?.remove();
    navigationForm = null;
  };
  let claimTimer: ReturnType<typeof setTimeout> | undefined;
  const pending = new Map<
    string,
    { kind: "attested" | "payload-ready"; finish(ok: boolean): void }
  >();
  const ready = new Set<(ok: boolean) => void>();
  const ownerCurrent = () =>
    !disposed && !revoked && options.current() && frame.isConnected;
  const active = () => ownerCurrent() && port !== null;
  function retire(notify: boolean) {
    if (revoked || disposed) return;
    revoked = true;
    clearTimeout(claimTimer);
    clearNavigationForm();
    port?.close();
    port = null;
    for (const finish of [...ready]) finish(false);
    ready.clear();
    for (const task of [...pending.values()]) task.finish(false);
    pending.clear();
    if (notify) options.revoked();
  }
  function waitForPort(): Promise<boolean> {
    if (active()) return Promise.resolve(true);
    if (!ownerCurrent() || !started || !loaded) return Promise.resolve(false);
    return new Promise((resolve) => {
      const timer = setTimeout(() => {
        finish(false);
        retire(true);
      }, DEADLINE);
      const finish = (ok: boolean) => {
        clearTimeout(timer);
        ready.delete(finish);
        resolve(ok && active());
      };
      ready.add(finish);
    });
  }
  async function exchange(
    kind: "challenge" | "payload",
    value?: unknown,
  ): Promise<string | null> {
    if (!(await waitForPort()) || !port || pending.size >= MAX_PENDING)
      return null;
    const id = token();
    return new Promise((resolve) => {
      const timer = setTimeout(() => {
        finish(false);
        retire(true);
      }, DEADLINE);
      const finish = (ok: boolean) => {
        clearTimeout(timer);
        pending.delete(id);
        resolve(ok && active() ? id : null);
      };
      pending.set(id, {
        kind: kind === "challenge" ? "attested" : "payload-ready",
        finish,
      });
      try {
        port?.postMessage(
          kind === "challenge"
            ? { kind, token: id }
            : { kind, token: id, value },
        );
      } catch {
        finish(false);
        retire(true);
      }
    });
  }
  async function attest() {
    return (await exchange("challenge")) !== null;
  }
  function deny(value: unknown) {
    if (
      !documentRecord(value) ||
      value.jsonrpc !== "2.0" ||
      !(
        typeof value.id === "string" ||
        (typeof value.id === "number" && Number.isFinite(value.id))
      )
    )
      return;
    frame.contentWindow?.postMessage(
      {
        jsonrpc: "2.0",
        id: value.id,
        error: {
          code: -32000,
          message: "App document authorization expired; reopen the app",
        },
      },
      "*",
    );
  }
  const listener = (event: MessageEvent<unknown>) => {
    if (
      disposed ||
      event.source !== frame.contentWindow ||
      event.origin !== "null" ||
      !frame.isConnected
    )
      return;
    if (
      documentRecord(event.data) &&
      event.data.channel === APP_DOCUMENT_CHANNEL &&
      event.data.kind === "claim"
    ) {
      if (
        !ownerCurrent() ||
        !loaded ||
        port ||
        event.data.nonce !== nonce ||
        event.ports.length !== 1
      ) {
        for (const candidate of event.ports) candidate.close();
        return;
      }
      if (
        !frame.sandbox.contains("allow-scripts") ||
        frame.sandbox.contains("allow-same-origin")
      ) {
        event.ports[0].close();
        retire(true);
        return;
      }
      port = event.ports[0];
      // A valid claim proves the initial navigation consumed the nonce form.
      clearNavigationForm();
      port.onmessage = (message: MessageEvent<unknown>) => {
        const value = message.data;
        if (!documentRecord(value)) return;
        if (value.kind === "revoke") {
          retire(true);
          return;
        }
        if (!ownerCurrent() || !documentToken(value.token)) return;
        const task = pending.get(value.token);
        if (task && task.kind === value.kind) task.finish(true);
      };
      port.onmessageerror = () => retire(true);
      port.start();
      clearTimeout(claimTimer);
      for (const finish of [...ready]) finish(true);
      return;
    }
    const value = event.data;
    if (!active()) {
      deny(value);
      return;
    }
    // Raw window messages are proposals, including SDK initialization and legacy embeds.
    void attest().then((ok) => {
      if (ok && active()) options.receive(value);
      else deny(value);
    });
  };
  function beginLoad() {
    if (!started || !ownerCurrent() || loaded)
      throw Error("App document cannot be loaded");
    loaded = true;
    claimTimer = setTimeout(() => retire(true), DEADLINE);
  }
  return {
    start() {
      if (disposed || revoked) throw Error("App document host disposed");
      if (started) return;
      started = true;
      window.addEventListener("message", listener);
    },
    async post(value: unknown) {
      const id = await exchange("payload", value);
      if (!id || !active()) throw Error("App document authorization expired");
      // Only the bootstrap in the original document has the corresponding private payload.
      frame.contentWindow?.postMessage(
        { channel: APP_DOCUMENT_CHANNEL, token: id },
        "*",
      );
    },
    attest,
    loadHtml(html: string) {
      beginLoad();
      frame.srcdoc = withAppDocumentBootstrap(html, nonce);
    },
    loadFile(url: string) {
      const target = new URL(url, location.href);
      if (
        target.origin !== location.origin ||
        target.search ||
        target.hash ||
        !/^\/api\/books\/[^/]+\/files\/[^/]+$/.test(target.pathname)
      )
        throw Error("Invalid app document file URL");
      if (
        !targetName ||
        !/^app-document-[a-zA-Z0-9-]+$/.test(targetName) ||
        frame.getAttribute("name") !== targetName
      )
        throw Error(
          "App file requires a stable target name before iframe insertion",
        );
      beginLoad();
      const form = document.createElement("form");
      form.hidden = true;
      form.method = "post";
      form.action = target.href;
      form.target = targetName;
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = "nonce";
      input.value = nonce;
      form.append(input);
      document.body.append(form);
      navigationForm = form;
      try {
        // Submission is asynchronous. Retain its source until the document
        // claims its port, or scope/deadline retirement cancels ownership.
        form.submit();
      } catch (error) {
        retire(true);
        throw error;
      }
    },
    active,
    dispose() {
      if (disposed) return;
      retire(false);
      disposed = true;
      window.removeEventListener("message", listener);
    },
  };
}
