import assert from "node:assert/strict";
import { UI_VERSION_HEX_LENGTH } from "../shared/uiVersion";

/** The real Worker appends its original static asset ETag to the served head
 * and returns that same domain from Me.v. A controlled asset server must do the
 * same augmentation, while declaring its own ETag algorithm rather than claiming
 * Cloudflare's production ETag identity. Browser bundle query versions differ. */
export function metricShell(source: string, originalETag: string, variant: "vanilla" | "svelte") {
  const version = originalETag.replace(/[^\w-]/g, "");
  assert(version, "Original shell ETag must identify the controlled response");
  assert(!/<meta\b[^>]*\bname=["']vb-v["']/i.test(source), "Static app shell must not already contain Worker-owned vb-v metadata");
  const opening = /<head\b[^>]*>/i.exec(source), closing = /<\/head\s*>/i.exec(source);
  assert(opening && closing && opening.index < closing.index, "App shell must contain one actual head for Worker metadata");
  const prefix = source.slice(0, closing.index), suffix = source.slice(closing.index);
  assert(!/<head\b/i.test(source.slice(opening.index + opening[0].length, closing.index)), "Duplicate head cannot be safely augmented");
  let entryVersion: string | null = null;
  if (variant === "svelte") {
    const entry = [...source.matchAll(/<script\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/gi)].map(match => new URL(match[1]!, "https://metrics.invalid")).filter(url => url.pathname === "/svelte-preview/app.js");
    const style = [...source.matchAll(/<link\b[^>]*\bhref=["']([^"']+)["'][^>]*>/gi)].map(match => new URL(match[1]!, "https://metrics.invalid")).filter(url => url.pathname === "/svelte-preview/ui.css");
    assert(entry.length === 1 && style.length === 1, "Native shell requires exactly one built app.js and ui.css reference");
    const versions = [...entry, ...style].map(url => { assert(url.origin === "https://metrics.invalid" && url.searchParams.getAll("v").length === 1); const value = url.searchParams.get("v"); assert(value && new RegExp(`^[a-f0-9]{${UI_VERSION_HEX_LENGTH}}$`).test(value), "Native bundle reference needs its actual build digest"); return value; });
    assert.equal(versions[0], versions[1], "Native script/style must retain the same actual build version");
    entryVersion = versions[0]!;
  }
  return { body: prefix + `<meta name="vb-v" content="${version}" />` + suffix, version, entryVersion, versionDomain: "controlled-original-static-shell-etag" as const };
}
