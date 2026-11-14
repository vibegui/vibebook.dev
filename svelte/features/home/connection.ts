import { parsePersonEvent } from "../../../shared/person";
import { authClock, type AuthClock } from "../auth/owner";
export type PersonalNotice =
  | { kind: "account"; book?: string; message?: boolean }
  | { kind: "agents"; book: string };
export function decodePersonalNotice(raw: unknown): PersonalNotice | null {
  const event = parsePersonEvent(raw);
  return event?.t === "me"
    ? { kind: "account", book: event.book, message: event.msg === 1 }
    : event?.t === "agents"
      ? { kind: "agents", book: event.book }
      : null;
}
type PersonalSocket = Pick<
  WebSocket,
  "readyState" | "close" | "onopen" | "onmessage" | "onclose"
>;
export function createPersonalConnection(options: {
  url: () => string;
  decode?: (raw: unknown) => PersonalNotice | null;
  onAccount: () => void;
  onAgents: (book: string) => void;
  onVisible: () => void;
  onConnected?: () => void;
  currentRoom: () => string | null;
  visible: () => boolean;
  listenVisibility: (callback: () => void) => () => void;
  createSocket?: (url: string) => PersonalSocket;
  clock?: AuthClock;
}) {
  const clock = options.clock ?? authClock,
    createSocket = options.createSocket ?? ((url) => new WebSocket(url));
  let active = true,
    started = false,
    socket: PersonalSocket | null = null,
    retry: unknown | null = null,
    stable: unknown | null = null,
    tries = 0,
    unlisten = () => {};
  const clear = (handle: unknown | null) => {
    if (handle !== null) clock.cancel(handle);
  };
  function connect() {
    if (!active || (socket && socket.readyState <= 1) || !options.visible())
      return;
    const current = createSocket(options.url());
    socket = current;
    let opened = false;
    current.onopen = () => {
      if (!active || socket !== current || opened) return;
      opened = true;
      options.onConnected?.();
      clear(stable);
      stable = clock.schedule(() => {
        if (active && socket === current) tries = 0;
      }, 3000);
    };
    current.onmessage = (event) => {
      if (!active || socket !== current) return;
      let notice: PersonalNotice | null;
      try {
        notice = (options.decode ?? decodePersonalNotice)(event.data);
      } catch {
        return;
      }
      if (!notice) return;
      if (notice.kind === "account") {
        if (!(
          notice.message &&
          notice.book &&
          notice.book === options.currentRoom()
        ))
          options.onAccount();
      } else options.onAgents(notice.book);
    };
    current.onclose = () => {
      if (!active || socket !== current) return;
      socket = null;
      clear(stable);
      stable = null;
      if (options.visible()) {
        clear(retry);
        retry = clock.schedule(
          () => {
            retry = null;
            connect();
          },
          Math.min(30_000, 1000 * 2 ** tries++),
        );
      }
    };
  }
  return {
    start() {
      if (!active || started) return;
      started = true;
      unlisten = options.listenVisibility(() => {
        if (!active || !options.visible()) return;
        options.onVisible();
        connect();
      });
      connect();
    },
    restart() {
      if (!active) return;
      const prior = socket;
      socket = null;
      clear(retry);
      clear(stable);
      retry = stable = null;
      tries = 0;
      prior?.close();
      connect();
    },
    dispose() {
      active = false;
      unlisten();
      clear(retry);
      clear(stable);
      const prior = socket;
      socket = null;
      prior?.close();
    },
  };
}
