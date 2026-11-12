export type UiVariant = "vanilla" | "svelte";

/** Selection belongs to the URL, so another tab or a normal link stays vanilla. */
export function uiVariant(url: string | URL): UiVariant {
  return new URL(url).searchParams.get("ui") === "svelte"
    ? "svelte"
    : "vanilla";
}

export function uiShellPath(url: string | URL): "/app" | "/app-svelte" {
  return uiVariant(url) === "svelte" ? "/app-svelte" : "/app";
}

/** Keep the opt-in on app navigation, without attaching it to API or external URLs. */
export function uiNavigationUrl(
  target: string | URL,
  current: string | URL,
  variant: UiVariant,
): string {
  const base = new URL(current);
  const url = new URL(target, base);
  if (
    url.origin !== base.origin ||
    !/^\/(?:app|archived|login|b\/[a-z0-9]+)\/?$/.test(url.pathname)
  )
    return String(target);
  if (variant === "svelte") url.searchParams.set("ui", "svelte");
  else url.searchParams.delete("ui");
  return url.pathname + url.search + url.hash;
}
