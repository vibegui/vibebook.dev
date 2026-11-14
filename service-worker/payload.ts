import * as z from "zod/mini";
export const PushPayload = z.object({
  title: z.optional(z.string()),
  body: z.optional(z.string()),
  tag: z.optional(z.string()),
  url: z.optional(z.string()),
});
export function notificationTarget(
  value: unknown,
  origin: string,
  client?: string,
) {
  let target: URL;
  try {
    target = new URL(typeof value === "string" ? value : "/app", origin);
  } catch {
    target = new URL("/app", origin);
  }
  if (
    target.origin !== origin ||
    !/^\/(?:app|archived|b\/[a-z0-9]+)\/?$/.test(target.pathname)
  )
    target = new URL("/app", origin);
  // A chosen existing tab keeps its own opt-in. A new window is always default.
  const selected = client
    ? new URL(client).searchParams.get("ui") === "svelte"
    : false;
  target.searchParams.delete("ui");
  if (selected) target.searchParams.set("ui", "svelte");
  return target.href;
}
