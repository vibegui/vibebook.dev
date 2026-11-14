import {
  APP_DOCUMENT_CHANNEL,
  APP_DOCUMENT_NONCE_PLACEHOLDER,
  documentRecord,
  documentToken,
} from "../../shared/appDocumentProtocol";

// This script executes before app code and removes its nonce-bearing script node.
// Captured document identity plus pagehide permanently retires the private port.
const initialDocument = document;
const parentWindow = parent;
const channel = new MessageChannel();
const port = channel.port1;
const send = port.postMessage.bind(port);
const close = port.close.bind(port);
const define = Object.defineProperty;
const dataGetter = Object.getOwnPropertyDescriptor(
  MessageEvent.prototype,
  "data",
)?.get;
if (!dataGetter) throw Error("MessageEvent data getter unavailable");
const readData = (event: MessageEvent<unknown>): unknown =>
  dataGetter.call(event);
const stop = Event.prototype.stopImmediatePropagation;
const payloads = new Map<string, unknown>();
let live = true;
const current = () => live && window.document === initialDocument;
const revoke = () => {
  if (!live) return;
  live = false;
  payloads.clear();
  send({ kind: "revoke" });
  close();
};
window.addEventListener("pagehide", revoke, { capture: true });
window.addEventListener(
  "message",
  (event: MessageEvent<unknown>) => {
    const data = readData(event);
    if (event.source !== parentWindow || !documentRecord(data)) return;
    if (data.channel !== APP_DOCUMENT_CHANNEL) return;
    // An unknown reference is never exposed to app listeners as an RPC response.
    const token = data.token;
    if (!current() || !documentToken(token) || !payloads.has(token)) {
      stop.call(event);
      return;
    }
    const value = payloads.get(token);
    payloads.delete(token);
    try {
      // Preserve the actual browser event's source, origin and isTrusted for the SDK.
      define(event, "data", { value });
    } catch {
      stop.call(event);
      revoke();
    }
  },
  { capture: true },
);
port.onmessage = (event: MessageEvent<unknown>) => {
  const value = readData(event);
  if (!current() || !documentRecord(value)) return;
  if (!documentToken(value.token)) return;
  if (value.kind === "challenge")
    send({ kind: "attested", token: value.token });
  else if (value.kind === "payload") {
    if (payloads.size >= 128) {
      revoke();
      return;
    }
    payloads.set(value.token, value.value);
    send({ kind: "payload-ready", token: value.token });
  }
};
port.start();
document.currentScript?.remove();
parentWindow.postMessage(
  {
    channel: APP_DOCUMENT_CHANNEL,
    kind: "claim",
    nonce: APP_DOCUMENT_NONCE_PLACEHOLDER,
  },
  "*",
  [channel.port2],
);
