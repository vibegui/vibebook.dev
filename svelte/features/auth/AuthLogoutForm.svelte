<script lang="ts">
  import { onDestroy } from "svelte";
  import Button from "../../lib/ui/Button.svelte";
  import { authText, type AuthLanguage } from "./copy";
  import type { PushCleanupResult } from "../notifications/logout";
  let {
    next,
    lang,
    onBegin,
    blocked = false,
    cleanup = async () =>
      (await import("../notifications/logout")).cleanupCurrentDevicePush(),
  }: {
    next: string;
    lang: AuthLanguage;
    onBegin: () => void;
    blocked?: boolean;
    cleanup?: () => Promise<PushCleanupResult>;
  } = $props();
  let active = true;
  let phase = $state<"idle" | "pending" | "unconfirmed" | "ready">("idle");
  const text = (key: Parameters<typeof authText>[1]) => authText(lang, key);
  onDestroy(() => {
    active = false;
  });
  async function submit(
    event: SubmitEvent & { currentTarget: HTMLFormElement },
  ) {
    const form = event.currentTarget;
    if (!active || !form.isConnected || (phase === "idle" && blocked)) {
      event.preventDefault();
      return;
    }
    // This remains a real form POST. Cleanup failure requires a second explicit
    // submit; neither cleanup nor login ever processes the consent handle.
    if (phase === "ready" || phase === "unconfirmed") return;
    event.preventDefault();
    if (phase === "pending") return;
    phase = "pending";
    onBegin();
    let confirmed = false;
    try {
      confirmed = (await cleanup()).confirmed;
    } catch {
      // Unknown cleanup failures have the same public, limited outcome.
    }
    if (!active || !form.isConnected) return;
    phase = confirmed ? "ready" : "unconfirmed";
    if (confirmed) form.requestSubmit();
  }
</script>

<form
  method="post"
  action="/auth/logout"
  onsubmit={submit}
  aria-busy={phase === "pending"}
>
  <input type="hidden" name="next" value={next} />
  <Button
    variant="link"
    type="submit"
    loading={phase === "pending"}
    disabled={phase === "idle" && blocked}
    class="tw:h-auto tw:whitespace-normal tw:p-0 tw:text-left"
    >{text(phase === "unconfirmed" ? "continueLogout" : "other")}</Button
  >
  {#if phase === "unconfirmed"}<p
      role="alert"
      class="tw:m-0 tw:break-words tw:text-destructive"
    >
      {text("logoutCleanup")}
    </p>
    <a href={next} class="tw:text-link">{text("reviewAgain")}</a>{/if}
</form>
