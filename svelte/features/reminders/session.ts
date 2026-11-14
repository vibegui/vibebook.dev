import { get, writable } from "svelte/store";
import type { Reminder } from "../../../shared/room";
import type { CommandOutcome } from "../../../shared/commands";
import type { RoomApi } from "../../../shared/rpc";
import type { RequestRoomCommand } from "../../roomConnection";

export type ReminderDraft = { name: string; text: string; fixed?: boolean };
export type ReminderIssue = {
  kind: "upload" | "command" | "unconfirmed";
  detail: string;
};
type Pending = {
  sequence: number;
  kind: "enable" | "delete";
  enabled?: boolean;
  acknowledged: boolean;
};
export type RemindersState = {
  draft: ReminderDraft | null;
  saving: boolean;
  issue: ReminderIssue | null;
  pending: Record<string, Pending>;
  rowIssues: Record<string, ReminderIssue>;
};
export type ReminderClock = {
  schedule(callback: () => void, ms: number): unknown;
  cancel(handle: unknown): void;
};
const defaultClock: ReminderClock = {
  schedule: (fn, ms) => setTimeout(fn, ms),
  cancel: (h) => clearTimeout(h as ReturnType<typeof setTimeout>),
};
export const REMINDER_CONFIRMATION_TIMEOUT = 10_000;
export const reminderFileName = (name: string) =>
  name.trim().replace(/\.md$/i, "").replace(/[\\/]/g, "-");

// Upload ownership outlives a form or component: reopening the same room must not race the same file on the server.
const outstandingUploads = new Set<string>();

/** A session belongs to one mounted room. A response from an older form, room or component cannot own its state. */
export function createRemindersSession(
  roomId: string,
  clock: ReminderClock = defaultClock,
) {
  const state = writable<RemindersState>({
    draft: null,
    saving: false,
    issue: null,
    pending: {},
    rowIssues: {},
  });
  let active = true,
    sequence = 0,
    form = 0,
    uploading = false;
  let reminders: readonly Reminder[] = [];
  const timers = new Map<string, unknown>();
  const clear = (id: string) => {
    if (timers.has(id)) clock.cancel(timers.get(id));
    timers.delete(id);
  };
  const canonical = (id: string, pending: Pending) =>
    pending.kind === "delete"
      ? !reminders.some((r) => r.id === id)
      : reminders.some((r) => r.id === id && r.enabled === pending.enabled);
  const finish = (id: string, issue?: ReminderIssue) => {
    clear(id);
    state.update((s) => {
      const pending = { ...s.pending },
        rowIssues = { ...s.rowIssues };
      delete pending[id];
      if (issue) rowIssues[id] = issue;
      else delete rowIssues[id];
      return { ...s, pending, rowIssues };
    });
  };
  return {
    roomId,
    state,
    sync(next: readonly Reminder[]) {
      if (!active) return;
      reminders = next;
      for (const [id, pending] of Object.entries(get(state).pending))
        if (pending.acknowledged && canonical(id, pending)) finish(id);
    },
    open(draft: ReminderDraft) {
      if (!active) return;
      form++;
      state.update((s) => ({
        ...s,
        draft: { ...draft },
        saving: uploading,
        issue: null,
      }));
    },
    edit(patch: Partial<ReminderDraft>) {
      if (active)
        state.update((s) =>
          s.draft ? { ...s, draft: { ...s.draft, ...patch }, issue: null } : s,
        );
    },
    cancel() {
      if (!active) return;
      form++;
      state.update((s) => ({
        ...s,
        draft: null,
        saving: uploading,
        issue: null,
      }));
    },
    async save(upload: RoomApi["uploadFile"]): Promise<void> {
      const before = get(state);
      if (!active || !before.draft || uploading) return;
      const draft = { ...before.draft },
        owner = form,
        name = reminderFileName(draft.name);
      if (!name || !draft.text.trim()) return;
      const uploadKey = JSON.stringify([roomId, name]);
      if (outstandingUploads.has(uploadKey)) {
        state.update((s) => ({
          ...s,
          issue: { kind: "upload", detail: "upload-in-progress" },
        }));
        return;
      }
      outstandingUploads.add(uploadKey);
      uploading = true;
      state.update((s) => ({ ...s, saving: true, issue: null }));
      const owns = () => active && owner === form && !!get(state).draft;
      try {
        const result = await upload({
          name: `reminders/${name}.md`,
          type: "text/markdown",
          body: draft.text,
        });
        if (!owns()) return;
        if (!result.reminder) {
          state.update((s) => ({
            ...s,
            issue: {
              kind: "upload",
              detail: "reminder-processing-unconfirmed",
            },
          }));
          return;
        }
        const processing = result.reminder;
        state.update((s) => {
          if (!s.draft) return s;
          // A successful file write fixes only the submitted filename; edits made while waiting stay in the form.
          const sameName = reminderFileName(s.draft.name) === name;
          const current = sameName
            ? { ...s.draft, name, fixed: true }
            : s.draft;
          if (!processing.ok)
            return {
              ...s,
              draft: current,
              issue: {
                kind: "upload",
                detail: processing.error || "failed",
              },
            };
          return {
            ...s,
            draft: sameName && s.draft.text === draft.text ? null : current,
          };
        });
      } catch (error) {
        if (owns())
          state.update((s) => ({
            ...s,
            issue: {
              kind: "upload",
              detail: error instanceof Error ? error.message : "failed",
            },
          }));
      } finally {
        outstandingUploads.delete(uploadKey);
        uploading = false;
        if (active) state.update((s) => ({ ...s, saving: false }));
      }
    },
    async mutate(
      id: string,
      kind: "enable" | "delete",
      request: RequestRoomCommand,
      enabled?: boolean,
    ): Promise<boolean> {
      if (!active || get(state).pending[id]) return false;
      const token = ++sequence;
      const pending: Pending = {
        sequence: token,
        kind,
        enabled,
        acknowledged: false,
      };
      state.update((s) => {
        const rowIssues = { ...s.rowIssues };
        delete rowIssues[id];
        return { ...s, pending: { ...s.pending, [id]: pending }, rowIssues };
      });
      let answer: CommandOutcome;
      try {
        answer = await request(
          kind === "delete"
            ? { t: "reminder.delete", id }
            : { t: "reminder.enable", id, on: !!enabled },
        );
      } catch (error) {
        answer = {
          ok: false,
          error: error instanceof Error ? error.message : "failed",
        };
      }
      if (!active || get(state).pending[id]?.sequence !== token) return false;
      if (!answer.ok) {
        finish(id, { kind: "command", detail: answer.error });
        return false;
      }
      pending.acknowledged = true;
      if (canonical(id, pending)) finish(id);
      else {
        state.update((s) => ({
          ...s,
          pending: { ...s.pending, [id]: { ...pending } },
        }));
        timers.set(
          id,
          clock.schedule(() => {
            if (active && get(state).pending[id]?.sequence === token)
              finish(id, { kind: "unconfirmed", detail: "unconfirmed" });
          }, REMINDER_CONFIRMATION_TIMEOUT),
        );
      }
      return true;
    },
    dispose() {
      active = false;
      form++;
      for (const id of [...timers.keys()]) clear(id);
    },
  };
}
