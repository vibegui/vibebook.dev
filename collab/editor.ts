// Co-editing for the room doc: CodeMirror 6 bound to a Yjs Y.Text over y-websocket (/yjs/<room>[~<epic>]).
// Bundled by `bun run build:collab` into public/collab.js (one file, one copy of yjs), loaded by app.html on demand.
import { markdown } from "@codemirror/lang-markdown";
import { EditorView, minimalSetup } from "codemirror";
import { yCollab } from "y-codemirror.next";
import { WebsocketProvider } from "y-websocket";
import * as Y from "yjs";

export type Collab = { destroy(): void; focus(): void };

export function mountCollab(
  el: HTMLElement,
  opts: { room: string; name: string; color: string; onText(text: string): void; onStatus?(s: "connected" | "disconnected"): void },
): Collab {
  const doc = new Y.Doc();
  const provider = new WebsocketProvider(`${location.protocol === "https:" ? "wss" : "ws"}://${location.host}/yjs`, opts.room, doc);
  const ytext = doc.getText("md");
  provider.awareness.setLocalStateField("user", { name: opts.name, color: opts.color, colorLight: `${opts.color}33` });
  provider.on("status", (e: { status: string }) => opts.onStatus?.(e.status === "connected" ? "connected" : "disconnected"));
  ytext.observe(() => opts.onText(ytext.toString()));
  const view = new EditorView({
    parent: el,
    extensions: [minimalSetup, markdown(), EditorView.lineWrapping, yCollab(ytext, provider.awareness)],
  });
  return {
    destroy() {
      view.destroy();
      provider.destroy();
      doc.destroy();
    },
    focus: () => view.focus(),
  };
}
