import { uiNavigationUrl } from "../../../shared/uiVariant";
import { targetHref, messageIdentity, type RoomTarget } from "../home/model";
export type ApplicationRoute =
  | { kind: "home" }
  | { kind: "archived" }
  | { kind: "room"; target: RoomTarget }
  | { kind: "document"; url: string };
export const roomIdFromPath = (pathname: string) =>
  pathname.match(/^\/b\/([a-z0-9]{6,40})\/?$/)?.[1] ?? null;
export function applicationRoute(href: string): ApplicationRoute {
  const url = new URL(href),
    roomId = roomIdFromPath(url.pathname);
  if (url.pathname === "/app" || url.pathname === "/") return { kind: "home" };
  if (url.pathname === "/archived") return { kind: "archived" };
  if (roomId) {
    const mid = /^#m(\d+)$/.exec(url.hash)?.[1],
      file = /^#f([a-z0-9]+)$/.exec(url.hash)?.[1];
    return {
      kind: "room",
      target: {
        roomId,
        thread: url.searchParams.get("t") ?? "main",
        messageId: messageIdentity(mid),
        fileId: file,
        document: url.hash.startsWith("#doc"),
      },
    };
  }
  return { kind: "document", url: href };
}
/** URL/history only. Room/editor/viewer internals remain explicit lifecycle callbacks during their migration. */
export function createApplicationRouter(options: {
  current: () => string;
  history: Pick<History, "pushState" | "replaceState">;
  activate: (route: ApplicationRoute) => void;
  beforeChange: () => void;
  sameRoom: (target: RoomTarget) => boolean;
  consumePop: () => boolean;
  document: (href: string) => void;
}) {
  let generation = 0,
    active = true;
  function go(value: string | RoomTarget, replace = false) {
    if (!active) return;
    const target = typeof value === "string" ? value : targetHref(value),
      url = new URL(target, options.current());
    if (url.origin !== new URL(options.current()).origin) {
      options.document(url.href);
      return;
    }
    const selected = uiNavigationUrl(url, options.current(), "svelte"),
      route = applicationRoute(new URL(selected, options.current()).href);
    generation++;
    if (route.kind === "document") {
      options.document(selected);
      return;
    }
    options.beforeChange();
    options.history[replace ? "replaceState" : "pushState"](null, "", selected);
    if (route.kind === "room" && options.sameRoom(route.target)) return;
    options.activate(route);
  }
  return {
    go,
    pop() {
      if (!active || options.consumePop()) return;
      generation++;
      options.beforeChange();
      const route = applicationRoute(options.current());
      if (route.kind === "room" && options.sameRoom(route.target)) return;
      options.activate(route);
    },
    generation: () => generation,
    dispose() {
      active = false;
      generation++;
    },
  };
}
