import type { Room, Message } from "../../../shared/room";
import type { RoomCommand } from "../../../shared/commands";
import type { RequestRoomCommand } from "../../roomConnection";
import {
  answerOf,
  canAnswer,
  canClosePoll,
  choicesOf,
  cardView,
  permissionAsk,
  pollIdentity,
} from "./model";
export type InteractiveState = {
  phase: "idle" | "pending" | "error" | "unconfirmed";
  error: string;
};
export const idleState = (): InteractiveState => ({ phase: "idle", error: "" });
export type InteractiveClock = {
  schedule(fn: () => void, ms: number): unknown;
  cancel(handle: unknown): void;
};
const clock: InteractiveClock = {
  schedule: (fn, ms) => setTimeout(fn, ms),
  cancel: (handle) => clearTimeout(handle as ReturnType<typeof setTimeout>),
};
export const INTERACTIVE_CONFIRMATION_TIMEOUT = 10_000;
type Operation = {
  token: symbol;
  kind: "reply" | "vote" | "close";
  option?: number;
  desired?: boolean;
  identity?: string;
  timer?: unknown;
};
/** One mounted prompt/poll owns its command and canonical wait. ACKs never synthesize room data. */
export function createInteractiveSession(
  roomId: string,
  messageId: number,
  changed: (state: InteractiveState) => void,
  timer = clock,
  kind: "card" | "permission" | "poll" = "card",
) {
  let owner: string | undefined;
  let active = true,
    room: Room | undefined,
    message: Message | undefined,
    identity: string | undefined,
    operation: Operation | undefined,
    state = idleState();
  const publish = (next: InteractiveState) => {
    state = next;
    changed(next);
  };
  function clear(next = idleState()) {
    if (operation?.timer !== undefined) timer.cancel(operation.timer);
    operation = undefined;
    publish(next);
  }
  function signature(m: Message) {
    return JSON.stringify([
      m.thread,
      m.author,
      m.kind,
      kind === "card" ? m.card : undefined,
      kind === "permission" ? m.choices : undefined,
      kind === "poll" ? m.poll : undefined,
      kind === "permission" ? m.text : undefined,
    ]);
  }
  function settled(op: Operation) {
    if (!room || !message) return true;
    if (op.kind === "reply")
      return (
        !!answerOf(room, message) ||
        (kind === "permission" && !!choicesOf(message.choices)?.closed)
      );
    const poll = message.poll ? room.polls?.[message.poll] : undefined;
    return (
      !poll ||
      poll.closed ||
      (op.kind === "vote" &&
        !!poll.votes[op.option!]?.includes(room.me) === op.desired)
    );
  }
  function sync(next: Room) {
    if (!active) return;
    if (owner === undefined) owner = next.me;
    if (next.id !== roomId || next.me !== owner) {
      room = undefined;
      message = undefined;
      clear();
      return;
    }
    room = next;
    const target =
      next.messages.find((m) => m.id === messageId) ||
      next.origins?.find((m) => m.id === messageId);
    const key =
      target === message ? identity : target ? signature(target) : undefined;
    if (key !== identity) {
      identity = key;
      message = target;
      clear();
    } else message = target;
    if (operation && operation.kind !== "reply") {
      const poll = target?.poll ? next.polls?.[target.poll] : undefined;
      if (!poll || pollIdentity(poll) !== operation.identity) clear();
    }
    if (operation && settled(operation)) clear();
    if (!target || !next.members.includes(next.me)) clear();
    if (
      state.phase !== "idle" &&
      target &&
      (answerOf(next, target) ||
        (kind === "permission" && choicesOf(target.choices)?.closed) ||
        (kind === "poll" && target.poll && next.polls?.[target.poll]?.closed))
    )
      clear();
  }
  async function run(
    command: RoomCommand,
    op: Operation,
    request: RequestRoomCommand,
  ) {
    operation = op;
    publish({ phase: "pending", error: "" });
    const owns = () => active && operation?.token === op.token;
    try {
      const result = await request(command);
      if (!owns()) return;
      if (settled(op)) {
        clear();
        return;
      }
      if (!result.ok) {
        if (
          result.error === "timeout" ||
          result.error === "disconnected" ||
          result.error === "server error"
        )
          publish({ phase: "unconfirmed", error: result.error });
        else clear({ phase: "error", error: result.error });
        return;
      }
      op.timer = timer.schedule(() => {
        if (owns()) {
          op.timer = undefined;
          publish({ phase: "unconfirmed", error: "unconfirmed" });
        }
      }, INTERACTIVE_CONFIRMATION_TIMEOUT);
    } catch (error) {
      if (owns())
        publish({
          phase: "unconfirmed",
          error: error instanceof Error ? error.message : "failed",
        });
    }
  }
  return {
    sync,
    reply(value: string, request: RequestRoomCommand) {
      if (
        !active ||
        !room ||
        !message ||
        operation ||
        state.phase === "unconfirmed" ||
        !canAnswer(room, message) ||
        !value.trim()
      )
        return Promise.resolve();
      const values =
        kind === "permission" &&
        permissionAsk(message) &&
        !choicesOf(message.choices)?.closed
          ? ["Aprovar", "Negar"]
          : kind === "card"
            ? Object.values(
                cardView(message.card, room.id)?.elements || {},
              ).flatMap((el) =>
                el.type === "Button" ? [el.props.value || el.props.label] : [],
              )
            : [];
      if (!values.includes(value)) return Promise.resolve();
      return run(
        {
          t: "msg",
          thread: message.thread,
          text: value,
          files: [],
          reply_to: messageId,
        },
        { token: Symbol(), kind: "reply" },
        request,
      );
    },
    vote(option: number, request: RequestRoomCommand) {
      const poll = message?.poll ? room?.polls?.[message.poll] : undefined;
      if (
        !active ||
        !room ||
        !message ||
        operation ||
        !room.members.includes(room.me) ||
        !poll ||
        poll.closed ||
        !Number.isInteger(option) ||
        option < 0 ||
        option >= poll.options.length
      )
        return Promise.resolve();
      return run(
        { t: "vote", id: poll.id, opt: option },
        {
          token: Symbol(),
          kind: "vote",
          identity: pollIdentity(poll),
          option,
          desired: !poll.votes[option]?.includes(room.me),
        },
        request,
      );
    },
    close(request: RequestRoomCommand) {
      const poll = message?.poll ? room?.polls?.[message.poll] : undefined;
      if (
        !active ||
        !room ||
        !message ||
        operation ||
        !poll ||
        !canClosePoll(room, poll)
      )
        return Promise.resolve();
      return run(
        { t: "poll.close", id: poll.id },
        { token: Symbol(), kind: "close", identity: pollIdentity(poll) },
        request,
      );
    },
    dispose() {
      active = false;
      if (operation?.timer !== undefined) timer.cancel(operation.timer);
      operation = undefined;
      room = undefined;
      message = undefined;
      identity = undefined;
    },
  };
}
