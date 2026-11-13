import { get, writable } from "svelte/store";
import {
  canAct,
  normalizeEmail,
  type PeopleAction,
  type PeopleRoom,
} from "./model";
import type { PeopleRequest } from "./api";
export type PeopleClock = {
  schedule(fn: () => void, ms: number): unknown;
  cancel(handle: unknown): void;
};
const defaultClock: PeopleClock = {
  schedule: (fn, ms) => setTimeout(fn, ms),
  cancel: (handle) => clearTimeout(handle as ReturnType<typeof setTimeout>),
};
export const PEOPLE_REQUEST_TIMEOUT = 20_000;
export const PEOPLE_CONFIRMATION_TIMEOUT = 10_000;
export type PeopleState = {
  draft: string;
  pending: Record<string, PeopleAction>;
  issues: Record<string, string>;
  notices: Record<string, string>;
  clipboard: { email: string; status: "copied" | "failed" } | null;
};
export function createPeopleSession(roomId: string, clock = defaultClock) {
  const state = writable<PeopleState>({
    draft: "",
    pending: {},
    issues: {},
    notices: {},
    clipboard: null,
  });
  let active = true,
    room: PeopleRoom | null = null,
    copySequence = 0;
  const operations = new Map<
    string,
    { token: symbol; action: PeopleAction; ack: boolean; timer?: unknown }
  >();
  const finish = (email: string, issue?: string) => {
    const op = operations.get(email);
    if (op?.timer !== undefined) clock.cancel(op.timer);
    operations.delete(email);
    state.update((s) => {
      const pending = { ...s.pending },
        issues = { ...s.issues };
      delete pending[email];
      if (issue) issues[email] = issue;
      else delete issues[email];
      return { ...s, pending, issues };
    });
  };
  const canonical = (email: string, action: PeopleAction) =>
    !!room &&
    (action === "remove"
      ? !room.members.includes(email)
      : action === "invite"
        ? room.members.includes(email)
        : action === "approve"
          ? room.members.includes(email) &&
            !room.requests?.some((r) => r.email === email)
          : action === "deny"
            ? !room.requests?.some((r) => r.email === email)
            : true);
  return {
    state,
    sync(next: PeopleRoom) {
      if (!active || next.id !== roomId) return;
      room = next;
      for (const [email, op] of operations) {
        const obsolete =
          op.action === "remove"
            ? !next.members.includes(email)
            : (op.action === "approve" || op.action === "deny") &&
              !next.requests?.some((r) => r.email === email);
        // Remote removal makes the action obsolete, without claiming that our request succeeded.
        if (obsolete || (op.ack && canonical(email, op.action))) finish(email);
      }
    },
    edit(draft: string) {
      if (active) state.update((s) => ({ ...s, draft }));
    },
    async copy(email: string, write: () => Promise<void>) {
      if (!active) return;
      const ticket = ++copySequence;
      try {
        await write();
        if (active && ticket === copySequence)
          state.update((s) => ({
            ...s,
            clipboard: { email, status: "copied" },
          }));
      } catch {
        if (active && ticket === copySequence)
          state.update((s) => ({
            ...s,
            clipboard: { email, status: "failed" },
          }));
      }
    },
    async mutate(
      action: PeopleAction,
      raw: string,
      request: PeopleRequest,
    ): Promise<boolean> {
      const email = normalizeEmail(raw);
      if (!active || !room || operations.has(email)) return false;
      if (!canAct(room, action, email)) {
        if (action === "invite")
          state.update((s) => ({
            ...s,
            issues: {
              ...s.issues,
              [email]: room!.members.includes(email)
                ? "already-member"
                : "invalid-email",
            },
          }));
        return false;
      }
      const token = Symbol(),
        submitted = get(state).draft;
      operations.set(email, { token, action, ack: false });
      state.update((s) => {
        const issues = { ...s.issues },
          notices = { ...s.notices };
        delete issues[email];
        delete notices[email];
        return {
          ...s,
          pending: { ...s.pending, [email]: action },
          issues,
          notices,
        };
      });
      const owns = () => active && operations.get(email)?.token === token;
      operations.get(email)!.timer = clock.schedule(() => {
        if (owns()) finish(email, "unconfirmed");
      }, PEOPLE_REQUEST_TIMEOUT);
      try {
        await request(action, email);
      } catch (error) {
        if (owns())
          finish(email, error instanceof Error ? error.message : "failed");
        return false;
      }
      if (!owns()) return false;
      const op = operations.get(email)!;
      if (op.timer !== undefined) clock.cancel(op.timer);
      op.ack = true;
      state.update((s) => ({
        ...s,
        draft:
          action === "invite" &&
          normalizeEmail(submitted) === email &&
          s.draft === submitted
            ? ""
            : s.draft,
        notices: { ...s.notices, [email]: action },
      }));
      if (canonical(email, action)) finish(email);
      else
        op.timer = clock.schedule(() => {
          if (owns()) finish(email, "unconfirmed");
        }, PEOPLE_CONFIRMATION_TIMEOUT);
      return true;
    },
    dispose() {
      active = false;
      copySequence++;
      for (const op of operations.values())
        if (op.timer !== undefined) clock.cancel(op.timer);
      operations.clear();
      room = null;
    },
  };
}
