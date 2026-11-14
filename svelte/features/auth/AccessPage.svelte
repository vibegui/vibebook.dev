<script lang="ts">
  import { onMount, untrack } from "svelte";
  import type { AuthApi } from "./api";
  import { authIssue, authText, type AuthLanguage } from "./copy";
  import { createAccessSession } from "./session";
  import AuthFrame from "./AuthFrame.svelte";
  import Button from "../../lib/ui/Button.svelte";
  import { buttonVariants } from "../../lib/ui/button";
  let {
    api,
    id,
    auto,
    origin,
    lang,
    navigate,
    fileId,
  }: {
    api: AuthApi;
    id: string;
    auto: boolean;
    origin: string;
    lang: AuthLanguage;
    navigate: (url: string) => void;
    fileId?: string;
  } = $props();
  const session = untrack(() =>
      createAccessSession(
        api,
        id,
        fileId ? false : auto,
        navigate,
        undefined,
        fileId ? `#f${fileId}` : undefined,
      ),
    ),
    view = session.state;
  const text = (
    key: Parameters<typeof authText>[1],
    vars?: Record<string, string>,
  ) => authText(lang, key, vars);
  const roomURL = $derived(
    `/b/${encodeURIComponent(id)}?ui=svelte${fileId ? `#f${fileId}` : ""}`,
  );
  const loginURL = $derived(
    `/login?ui=svelte&next=${encodeURIComponent(fileId ? roomURL : roomURL + "&pedir=1")}`,
  );
  onMount(() => {
    void session.load();
    return () => session.dispose();
  });
</script>

<AuthFrame
  title={$view.context?.state === "missing"
    ? text("missing")
    : ($view.context?.title ?? text("access"))}
>
  {#if fileId}<p class="tw:m-0 tw:text-muted-foreground">
      {lang === "en"
        ? "Only room members can open this file. Sign in or ask for room access."
        : "Só quem está na sala abre este arquivo. Entre ou peça acesso à sala."}
    </p>{/if}
  {#if $view.loading && !$view.context}<p
      role="status"
      class="tw:m-0 tw:text-muted-foreground"
    >
      {text("loading")}
    </p>
  {:else if $view.context?.state === "missing"}<p
      class="tw:m-0 tw:text-muted-foreground"
    >
      {text("missingBody")}
    </p>
    <a class={buttonVariants()} href="/app?ui=svelte">{text("open")}</a>
  {:else if $view.context?.state === "out" || $view.signedOut}<p
      class="tw:m-0 tw:text-muted-foreground"
    >
      {text("closed")}
    </p>
    <a class={buttonVariants()} href={loginURL}>{text("signinAsk")}</a>
  {:else if $view.context?.state === "ask"}<p
      class="tw:m-0 tw:break-words tw:text-muted-foreground"
    >
      {text("signed", { email: $view.context.email ?? "" })}
    </p>
    <Button loading={$view.busy} onclick={() => session.ask()}
      >{text("ask")}</Button
    >
  {:else if $view.context?.state === "asked"}<p
      role="status"
      class="tw:m-0 tw:text-foreground"
    >
      ✓ {text("asked")}
    </p>
    <p class="tw:m-0 tw:text-muted-foreground">{text("askedBody")}</p>{/if}
  {#if $view.error}<p
      role="alert"
      class="tw:m-0 tw:break-words tw:text-destructive"
    >
      {authIssue(lang, $view.error)}
    </p>
    {#if $view.context?.state !== "ask"}<Button
        variant="outline"
        onclick={() => session.load()}>{text("retry")}</Button
      >{/if}{/if}
  {#if $view.context && $view.context.state !== "missing"}<p
      class="tw:m-0 tw:break-words tw:text-xs tw:text-muted-foreground"
    >
      {text("agent", { origin, url: origin + roomURL })}
    </p>{/if}
</AuthFrame>
