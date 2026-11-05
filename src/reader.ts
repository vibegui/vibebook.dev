// URL guard for anything the Worker fetches on someone's behalf (set_room_icon): public http(s) only.

/** Returns a normalized URL string, or an error message for URLs we refuse to fetch. */
export function checkUrl(raw: string): { url: string } | { error: string } {
  let u: URL;
  try {
    u = new URL(raw.trim());
  } catch {
    return { error: "URL inválida" };
  }
  if (u.protocol !== "https:" && u.protocol !== "http:") return { error: "só http/https" };
  if (u.username || u.password) return { error: "URL com credenciais" };
  const host = u.hostname.toLowerCase();
  if (
    host === "localhost" ||
    !host.includes(".") ||
    /\.(local|internal|localhost|lan|home|arpa)$/.test(host) ||
    /^[\d.]+$/.test(host) || // IPv4 literal
    host.includes(":") || // IPv6 literal
    host === "vibebook.dev" ||
    host.endsWith(".vibebook.dev")
  )
    return { error: "endereço não permitido" };
  if (raw.length > 2000) return { error: "URL longa demais" };
  u.hash = "";
  return { url: u.toString() };
}
