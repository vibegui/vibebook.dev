// Test-only component adapter. The application composes features directly.
import { flushSync, mount, unmount } from "svelte";
import type { Component, ComponentProps } from "svelte";
import { writable } from "svelte/store";
import View from "./UiPanelView.svelte";
import Tasks from "../svelte/Tasks.svelte";
import Board from "../svelte/Board.svelte";
import Files from "../svelte/Files.svelte";
import Reminders from "../svelte/Reminders.svelte";
import Decisions from "../svelte/Decisions.svelte";
import Sidebar from "../svelte/Sidebar.svelte";
import Chat from "../svelte/Chat.svelte";
import Composer from "../svelte/Composer.svelte";
import DocumentPanel from "../svelte/features/documents/DocumentPanel.svelte";
import AppsPanel from "../svelte/features/apps/AppsPanel.svelte";
import AgentSettings from "../svelte/features/agents/AgentSettings.svelte";
import ThreadHeader from "../svelte/features/room-sidebar/ThreadHeader.svelte";
import SuggestionPreview from "../svelte/features/room-sidebar/SuggestionPreview.svelte";
export { dismissDialogs } from "../svelte/lib/ui/dialogController";
const fixtures = {
  tasks: Tasks,
  board: Board,
  files: Files,
  reminders: Reminders,
  decisions: Decisions,
  sidebar: Sidebar,
  chat: Chat,
  composer: Composer,
  document: DocumentPanel,
  apps: AppsPanel,
  agentSettings: AgentSettings,
  threadHeader: ThreadHeader,
  suggestionPreview: SuggestionPreview,
};
type FixtureName = keyof typeof fixtures;
/** Preserve the existing checked test call-site relation and flush/update/cleanup
 * behavior. The pre-existing erased forwarding boundary is confined to tests. */
export function mountView<K extends FixtureName>(
  kind: K,
  target: Element,
  props: ComponentProps<(typeof fixtures)[K]>,
) {
  const values = writable<Record<string, unknown>>(props);
  const component = fixtures[kind] as unknown as Component<
    Record<string, unknown>
  >;
  const instance = flushSync(() =>
    mount(View, { target, props: { component, values } }),
  );
  return {
    update(next: ComponentProps<(typeof fixtures)[K]>) {
      flushSync(() => values.set(next));
    },
    destroy() {
      flushSync(() => {
        void unmount(instance);
      });
    },
  };
}
