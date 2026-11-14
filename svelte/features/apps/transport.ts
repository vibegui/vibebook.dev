import {
  JSONRPCMessageSchema,
  type JSONRPCMessage,
} from "@modelcontextprotocol/sdk/types.js";
import type { Transport } from "@modelcontextprotocol/sdk/shared/transport.js";
import { createAppDocumentHost } from "../../../browser/app-document/host";
/** SDK envelope parsing leaves opaque tool argument values untouched; no invented payload budget. */
export function decodeAppEnvelope(value: unknown): JSONRPCMessage | null {
  const parsed = JSONRPCMessageSchema.safeParse(value);
  return parsed.success ? parsed.data : null;
}
export function acceptsAppSource(
  frame: { window: unknown; connected: boolean; opaque: boolean },
  event: { origin: string; source: unknown },
  current: boolean,
) {
  return (
    current &&
    !!frame.window &&
    frame.connected &&
    frame.opaque &&
    event.origin === "null" &&
    event.source === frame.window
  );
}
export function acceptsFrameMessage(
  frame: HTMLIFrameElement,
  event: Pick<MessageEvent, "origin" | "source">,
  current: () => boolean,
) {
  return acceptsAppSource(
    {
      window: frame.contentWindow,
      connected: frame.isConnected,
      opaque:
        frame.sandbox.contains("allow-scripts") &&
        !frame.sandbox.contains("allow-same-origin"),
    },
    event,
    current(),
  );
}
/** Context prefilters above are not document authorization. The document host
 * attests each proposal and carries private replies on its initial port. */
const record = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === "object" && !Array.isArray(value);
const legacyRequests = new Set([
  "tools/list",
  "tools/call",
  "ui/open-link",
  "ui/message",
  "ui/update-model-context",
  "ui/request-display-mode",
  "ping",
]);
export class OpaqueAppTransport implements Transport {
  onmessage?: Transport["onmessage"];
  onclose?: () => void;
  onerror?: (error: Error) => void;
  private started = false;
  private closed = false;
  private legacyId = 0;
  private documentHost: ReturnType<typeof createAppDocumentHost>;
  constructor(
    private frame: HTMLIFrameElement,
    private current: () => boolean,
    private legacy?: (value: { height: number } | { text: string }) => void,
    revoked?: () => void,
  ) {
    this.documentHost = createAppDocumentHost({
      frame,
      current,
      receive: (value) => this.receive(value),
      revoked: () => {
        if (!this.closed) revoked?.();
      },
    });
  }
  private receive = (value: unknown) => {
    if (this.closed || !this.current() || !this.documentHost.active()) return;
    if (
      value &&
      typeof value === "object" &&
      "vbEmbed" in value &&
      value.vbEmbed === 1
    ) {
      if (
        "h" in value &&
        typeof value.h === "number" &&
        Number.isFinite(value.h)
      )
        this.legacy?.({ height: value.h });
      else if ("send" in value && typeof value.send === "string")
        this.legacy?.({ text: value.send.slice(0, 4000) });
      return;
    }
    let compatible: unknown = value;
    if (
      record(value) &&
      value.jsonrpc === "2.0" &&
      typeof value.method === "string"
    ) {
      let params = value.params;
      if (
        value.method === "ui/message" &&
        record(params) &&
        params.role === undefined
      )
        params = { ...params, role: "user" };
      compatible = {
        ...value,
        ...(params === undefined ? {} : { params }),
        ...(value.id === undefined && legacyRequests.has(value.method)
          ? { id: `legacy-${++this.legacyId}` }
          : {}),
      };
    }
    const parsed = decodeAppEnvelope(compatible);
    if (parsed) this.onmessage?.(parsed);
  };
  async start() {
    if (this.closed) throw Error("App transport disposed");
    if (this.started) return;
    this.started = true;
    this.documentHost.start();
  }
  async send(message: JSONRPCMessage) {
    if (this.closed || !this.current() || !this.frame.isConnected)
      throw Error("App is no longer active");
    await this.documentHost.post(message);
  }
  attest() {
    return this.documentHost.attest();
  }
  active() {
    return !this.closed && this.documentHost.active();
  }
  loadHtml(html: string) {
    this.documentHost.loadHtml(html);
  }
  loadFile(url: string) {
    this.documentHost.loadFile(url);
  }
  async close() {
    if (this.closed) return;
    this.closed = true;
    this.documentHost.dispose();
    this.onclose?.();
  }
}
