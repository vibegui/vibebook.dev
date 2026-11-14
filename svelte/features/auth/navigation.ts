/** Defense in depth for server-provided continuations; auth never navigates to an incoming authority. */
export function authContinuation(value: string, origin: string): string {
  const fallback = "/app?ui=svelte";
  if (
    !value.startsWith("/") ||
    value.startsWith("//") ||
    /[\\\u0000-\u0020\u007f]/.test(value)
  )
    return fallback;
  const target = new URL(value, origin);
  if (
    target.origin !== new URL(origin).origin ||
    target.username ||
    target.password
  )
    return fallback;
  if (/^\/api\/books\/[a-z0-9]+\/files\/[a-z0-9]+$/.test(target.pathname))
    return target.pathname + target.search + target.hash;
  if (
    !/^\/(?:app|archived|login|b\/[a-z0-9]+|authorize)$/.test(target.pathname)
  )
    return fallback;
  target.searchParams.set("ui", "svelte");
  return target.pathname + target.search + target.hash;
}
/** Error redirects are offered explicitly, never followed automatically or interpreted as script URLs. */
export function consentReturn(value: string | undefined): string | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    return ["http:", "https:"].includes(url.protocol) &&
      !url.username &&
      !url.password
      ? url.href
      : null;
  } catch {
    return null;
  }
}
