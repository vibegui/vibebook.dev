export const TERMINAL_KEYS = {
  Esc: "\x1b",
  Tab: "\t",
  "Ctrl-C": "\x03",
  "↑": "\x1b[A",
  "↓": "\x1b[B",
  "←": "\x1b[D",
  "→": "\x1b[C",
  "/": "/",
} as const;
export type TerminalKey = keyof typeof TERMINAL_KEYS;
const loopback = (hostname: string) =>
  ["127.0.0.1", "localhost", "[::1]"].includes(hostname);
export function terminalEndpoint(
  value: string,
  appOrigin: string,
  vmId: string,
) {
  const url = new URL(value),
    app = new URL(appOrigin),
    exact = `/v5/vms/${encodeURIComponent(vmId)}/pty`;
  const official =
    url.protocol === "wss:" &&
    url.hostname === "api.freestyle.sh" &&
    !url.port &&
    url.pathname === exact;
  const local =
    loopback(app.hostname) &&
    loopback(url.hostname) &&
    ["http:", "https:"].includes(app.protocol) &&
    ["ws:", "wss:"].includes(url.protocol) &&
    url.pathname.endsWith(exact);
  if (
    (!official && !local) ||
    url.username ||
    url.password ||
    url.hash ||
    url.searchParams.get("slug") !== "claude" ||
    !url.searchParams.get("exec")
  )
    throw Error("Invalid terminal endpoint");
  return url;
}
export function terminalProtocols(token: string) {
  const bytes = new TextEncoder().encode(token);
  if (!bytes.length || bytes.length > 65_536)
    throw Error("Invalid terminal credential");
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return [
    "freestyle-pty",
    `freestyle-identity.${btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")}`,
  ];
}
export const terminalDimensions = (cols: number, rows: number) =>
  Number.isSafeInteger(cols) &&
  cols >= 2 &&
  Number.isSafeInteger(rows) &&
  rows >= 1;
export function terminalControl(
  value: unknown,
): "connected" | "exited" | "error" | null {
  if (typeof value !== "string" || value.length > 65_536) return null;
  try {
    const object: unknown = JSON.parse(value);
    if (!object || typeof object !== "object" || !("type" in object))
      return null;
    return object.type === "sessionInfo"
      ? "connected"
      : object.type === "exited"
        ? "exited"
        : object.type === "error"
          ? "error"
          : null;
  } catch {
    return null;
  }
}
