import type { Room, Attachment } from "../../../shared/room";
import type { ChatEmbedControls } from "../../chatTypes";
import type { RequestRoomCommand } from "../../roomConnection";
import type { NativeAppBridge } from "./bridge";
import {
  appMembershipFailure,
  appSessionFailure,
  type AppsAuthority,
} from "./authority";
import { createAppsApi, createAppMetrics } from "./api";
import { createAppRequests } from "./requests";
import { createRoomAppTools, roomTools } from "./tools";
export function mountNativeChatApp(options: {
  frame: HTMLIFrameElement;
  file: Attachment;
  controls: ChatEmbedControls;
  authority: AppsAuthority | null;
  room(): Room | null;
  current(): boolean;
  request: RequestRoomCommand;
  name(email: string): string;
  t(text: string, vars?: Record<string, string | number>): string;
  locale: string;
  open(url: string): void;
}) {
  const candidate = options.room(),
    candidateAuthority = options.authority;
  if (!candidate || !candidateAuthority) return () => {};
  const initial: Room = candidate,
    authority: AppsAuthority = candidateAuthority;
  const roomId = initial.id,
    account = initial.me,
    frame = options.frame,
    requests = createAppRequests(),
    api = createAppsApi(roomId),
    metrics = createAppMetrics();
  let active = true,
    bridge: NativeAppBridge | null = null;
  const current = () => {
    const room = options.room();
    return (
      active &&
      authority.current() &&
      options.current() &&
      frame.isConnected &&
      room?.id === roomId &&
      room.me === account &&
      room.members.includes(account) &&
      [
        ...(room.files || []),
        ...room.messages.flatMap((message) => message.files || []),
      ].some(
        (file) =>
          file.embed === true &&
          file.id === options.file.id &&
          file.name === options.file.name &&
          file.type === options.file.type &&
          file.ts === options.file.ts &&
          file.size === options.file.size &&
          file.author === options.file.author,
      )
    );
  };
  const unlisten = authority.listen(() => {
    requests.dispose();
    bridge?.dispose();
    options.controls.deny?.();
    options.controls.cancel?.();
  });
  const membershipError = (error: unknown): never =>
    appMembershipFailure(authority, error);
  async function start() {
    const protocol = await requests.run(() => import("./bridge"));
    if (!current()) return;
    const tools = createRoomAppTools({
      room: options.room,
      current,
      request: options.request,
      name: options.name,
      ask: options.controls.ask,
      connections: async () => {
        const result = await requests
          .run((signal) => api.list(signal))
          .catch(membershipError);
        return current() ? result.connections : [];
      },
      call: async (cid, tool, args) => {
        if (!current()) throw Error("App is no longer active");
        const result = await requests
          .run((signal) => api.call(cid, tool, args, signal))
          .catch(membershipError);
        if (!current()) throw Error("App is no longer active");
        return protocol.remoteToolResult(result.result);
      },
      metric: (kind, roomOnly) =>
        requests
          .run((signal) => metrics(kind, roomId, roomOnly, signal))
          .catch((error) => appSessionFailure(authority, error)),
      t: options.t,
    });
    bridge = protocol.createNativeAppBridge({
      frame,
      current,
      tools: roomTools,
      call: tools,
      message: (text) =>
        tools("vibebook_post", { text, thread: options.controls.thread }),
      ask: options.controls.ask,
      resize: options.controls.resize,
      embed: true,
      open: options.open,
      t: options.t,
      context: () => {
        const room = options.room() || initial,
          rect = frame.getBoundingClientRect(),
          dark =
            document.documentElement.dataset.theme === "dark" ||
            (document.documentElement.dataset.theme !== "light" &&
              matchMedia("(prefers-color-scheme: dark)").matches);
        return {
          theme: dark ? "dark" : "light",
          displayMode: "inline",
          availableDisplayModes: ["inline"],
          containerDimensions: {
            maxHeight: 420,
            width: Math.round(rect.width),
          },
          locale: options.locale,
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          platform: matchMedia("(max-width: 900px)").matches ? "mobile" : "web",
          user: { email: account, name: options.name(account) },
          room: { id: roomId, title: room.book.title },
        };
      },
    });
    await bridge.ready;
    if (current()) options.controls.ready();
  }
  void start().catch(() => {
    if (current()) options.controls.fail?.();
  });
  return () => {
    active = false;
    unlisten();
    requests.dispose();
    bridge?.dispose();
    options.controls.cancel?.();
  };
}
