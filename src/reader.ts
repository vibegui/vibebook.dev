// Safe-ish link reading for the AI: public http(s) only, Firecrawl renders JS pages,
// output is cleaned, capped, and always handed to the model as untrusted data.

const MAX_CHARS = 20_000;

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

/** Markdown → readable text: drop images, unwrap links, collapse blank lines, cap length. */
export function clean(md: string): string {
  const t = md
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{2,}/g, "\n")
    .trim();
  return t.length > MAX_CHARS ? `${t.slice(0, MAX_CHARS)}\n[…cortado]` : t;
}

export type ReadResult = { ok: true; title: string; text: string } | { ok: false; error: string };

export async function readUrl(url: string, firecrawlKey: string | undefined): Promise<ReadResult> {
  if (!firecrawlKey) return { ok: false, error: "leitor de links não configurado" };
  try {
    const r = await fetch("https://api.firecrawl.dev/v2/scrape", {
      method: "POST",
      headers: { authorization: `Bearer ${firecrawlKey}`, "content-type": "application/json" },
      body: JSON.stringify({
        url,
        formats: ["markdown"],
        onlyMainContent: true,
        excludeTags: ["nav", "header", "footer", "script", "style"],
        timeout: 30_000,
      }),
      signal: AbortSignal.timeout(40_000),
    });
    const body = (await r.json().catch(() => null)) as {
      success?: boolean;
      error?: string;
      data?: { markdown?: string; metadata?: { title?: string; statusCode?: number } };
    } | null;
    if (!r.ok || !body?.success) return { ok: false, error: `falha ao ler (${body?.error ?? r.status})` };
    const status = body.data?.metadata?.statusCode;
    if (status && status >= 400) return { ok: false, error: `o site respondeu ${status}` };
    const text = clean(body.data?.markdown ?? "");
    if (!text) return { ok: false, error: "página sem conteúdo legível" };
    return { ok: true, title: body.data?.metadata?.title ?? url, text };
  } catch (e) {
    return { ok: false, error: `falha ao ler (${String(e).slice(0, 120)})` };
  }
}

