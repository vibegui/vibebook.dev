import type { Attachment, Pin, Room } from "../../../shared/room";

export type PinAppTarget = { connectionId: string; tool: string };
export type PinTarget =
  | { kind: "link"; href: string; label: string; detail: string }
  | { kind: "file"; file: Attachment; label: string; detail: "arquivo" }
  | { kind: "app"; app: PinAppTarget; label: string; detail: "app" | "app da sala" }
  | { kind: "unavailable"; label: string; reason: "Link inválido" | "Arquivo indisponível" | "App indisponível" | "Item indisponível" };

/** Match Book.pinAdd's scheme normalization, retaining only browser-safe HTTP(S) links. */
export function normalizePinLink(value: string): string | null {
  const text = value.trim();
  if (!text || text.length > 2000 || /[\u0000-\u001f\u007f]/.test(text)) return null;
  try {
    const url = new URL(/^[a-z]+:\/\//i.test(text) ? text : `https://${text}`);
    return url.protocol === "http:" || url.protocol === "https:" ? url.href : null;
  } catch { return null; }
}

export function pinAppTarget(ref: string): PinAppTarget | null {
  const match = /^(?:((?:[a-f0-9]{12}|room))\/)?([\w.-]{1,100})$/.exec(ref);
  return match ? { connectionId: match[1] ?? "room", tool: match[2] } : null;
}

/** Resolve against the current room, so removed/unknown targets remain removable without executable hrefs. */
export function resolvePin(pin: Pin, room: Pick<Room, "files" | "filesAll">): PinTarget {
  if (pin.kind === "link") {
    const href = normalizePinLink(pin.ref);
    if (!href) return { kind: "unavailable", label: pin.title || pin.ref, reason: "Link inválido" };
    const host = new URL(href).hostname.replace(/^www\./, "");
    return { kind: "link", href, label: pin.title || host, detail: host };
  }
  if (pin.kind === "file") {
    const file = room.files?.find(file => file.id === pin.ref);
    return file ? { kind: "file", file, label: pin.title || file.name, detail: "arquivo" }
      : { kind: "unavailable", label: pin.title || pin.ref, reason: "Arquivo indisponível" };
  }
  if (pin.kind === "app") {
    const app = pinAppTarget(pin.ref);
    // Files may initially be a partial page; absence proves removal only after files.get has completed.
    const missing = app?.connectionId === "room" && room.filesAll && !room.files?.some(file => file.name === `apps/${app.tool}.html`);
    return app && !missing ? { kind: "app", app, label: pin.title || app.tool, detail: app.connectionId === "room" ? "app da sala" : "app" }
      : { kind: "unavailable", label: pin.title || pin.ref, reason: "App indisponível" };
  }
  return { kind: "unavailable", label: pin.title || pin.ref, reason: "Item indisponível" };
}
