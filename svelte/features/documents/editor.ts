// Browser-only adapter. CM/Yjs structural styles are the existing named vendor families.
import { markdown } from "@codemirror/lang-markdown";
import { EditorView, minimalSetup } from "codemirror";
import { keymap } from "@codemirror/view";
import { Compartment, EditorState } from "@codemirror/state";
import { yCollab, yUndoManagerKeymap } from "y-codemirror.next";
import { WebsocketProvider } from "y-websocket";
import * as Y from "yjs";
import { safeAwareness } from "./model";
import type { Editor, EditorOptions } from "./types";
export function mountEditor(
  element: HTMLElement,
  options: EditorOptions,
): Editor {
  const doc = new Y.Doc(),
    provider = new WebsocketProvider(
      `${location.protocol === "https:" ? "wss" : "ws"}://${location.host}/yjs`,
      options.target.roomId +
        (options.target.epicId ? `~${options.target.epicId}` : ""),
      doc,
      {
        connect: false,
        disableBc: true,
        shouldReconnect: (event) =>
          event.code !== 4003 && !(event.code >= 4400 && event.code < 4500),
      },
    );
  const states = provider.awareness.getStates.bind(provider.awareness);
  provider.awareness.getStates = () =>
    new Map([...states()].map(([id, state]) => [id, safeAwareness(state)]));
  provider.awareness.setLocalStateField(
    "user",
    safeAwareness({ user: { name: options.name, color: options.color } }).user,
  );
  const text = doc.getText("md"),
    undoManager = new Y.UndoManager(text),
    editing = new Compartment();
  let active = true,
    suspended = false,
    view: EditorView | undefined,
    position = { anchor: 0, head: 0 },
    scroll = 0;
  const status = ({
    status,
  }: {
    status: "connected" | "connecting" | "disconnected";
  }) => {
    if (active && !suspended) options.onStatus(status);
  };
  const sync = (value: boolean) => {
    if (active && !suspended) options.onSync(value);
  };
  const changed = (_event: Y.YTextEvent, transaction: Y.Transaction) => {
    if (active && !suspended)
      options.onText(text.toString(), transaction.local);
  };
  const closed = (event: { code: number }) => {
    if (active && !suspended && [4003, 4401, 4403].includes(event.code))
      options.onDenied();
  };
  provider.on("status", status);
  provider.on("sync", sync);
  provider.on("closed", closed);
  text.observe(changed);
  function mountView() {
    view = new EditorView({
      parent: element,
      extensions: [
        keymap.of(yUndoManagerKeymap),
        editing.of([
          EditorView.editable.of(true),
          EditorState.readOnly.of(false),
        ]),
        minimalSetup,
        markdown(),
        EditorView.lineWrapping,
        EditorView.contentAttributes.of({
          "aria-label": options.label,
          spellcheck: "true",
        }),
        yCollab(text, provider.awareness, { undoManager }),
      ],
    });
  }
  function removeView() {
    if (view) {
      position = {
        anchor: view.state.selection.main.anchor,
        head: view.state.selection.main.head,
      };
      scroll = view.scrollDOM.scrollTop;
      view.destroy();
      view = undefined;
    }
    element.replaceChildren();
  }
  function destroy() {
    if (!active) return;
    active = false;
    removeView();
    text.unobserve(changed);
    provider.off("status", status);
    provider.off("sync", sync);
    provider.off("closed", closed);
    provider.destroy();
    undoManager.destroy();
    doc.destroy();
  }
  try {
    mountView();
    provider.connect();
  } catch (error) {
    destroy();
    throw error;
  }
  return {
    destroy,
    pause() {
      if (!active || suspended) return;
      suspended = true;
      if (view) {
        position = {
          anchor: view.state.selection.main.anchor,
          head: view.state.selection.main.head,
        };
        scroll = view.scrollDOM.scrollTop;
        view.dispatch({
          effects: editing.reconfigure([
            EditorView.editable.of(false),
            EditorState.readOnly.of(true),
          ]),
        });
        view.dom.remove();
      }
      provider.disconnect();
    },
    resume() {
      if (!active || !suspended) return;
      suspended = false;
      try {
        if (!view) throw Error("Editor unavailable");
        element.append(view.dom);
        view.dispatch({
          effects: editing.reconfigure([
            EditorView.editable.of(true),
            EditorState.readOnly.of(false),
          ]),
        });
        view.scrollDOM.scrollTop = scroll;
        view.requestMeasure();
        options.onText(text.toString(), false);
        provider.connect();
      } catch (error) {
        destroy();
        throw error;
      }
    },
    focus() {
      if (active && !suspended) view?.focus();
    },
    text: () => text.toString(),
    scroll: () => view?.scrollDOM.scrollTop ?? scroll,
    setScroll(value) {
      scroll = value;
      if (view) view.scrollDOM.scrollTop = value;
    },
    replace(value) {
      if (active && !suspended)
        doc.transact(() => {
          text.delete(0, text.length);
          text.insert(0, value);
        });
    },
    selection: () =>
      view
        ? {
            anchor: view.state.selection.main.anchor,
            head: view.state.selection.main.head,
          }
        : position,
    setSelection(value) {
      position = value;
      if (active && view)
        view.dispatch({
          selection: {
            anchor: Math.min(Math.max(0, value.anchor), view.state.doc.length),
            head: Math.min(Math.max(0, value.head), view.state.doc.length),
          },
        });
    },
  };
}
