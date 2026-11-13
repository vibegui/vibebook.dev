<script lang="ts">
  import { onMount, tick, untrack } from "svelte";
  import type { AuthApi } from "./api";
  import type { AuthLanguage } from "./copy";
  import { authIssue, authText } from "./copy";
  import { authContinuation } from "./navigation";
  import { createLoginSession } from "./session";
  import AuthFrame from "./AuthFrame.svelte";
  import Button from "../../lib/ui/Button.svelte";
  import { buttonVariants } from "../../lib/ui/button";
  import Input from "../../lib/ui/Input.svelte";
  import Label from "../../lib/ui/Label.svelte";
  let {
    api,
    search,
    origin,
    lang,
    navigate,
  }: {
    api: AuthApi;
    search: string;
    origin: string;
    lang: AuthLanguage;
    navigate: (url: string) => void;
  } = $props();
  const session = untrack(() =>
      createLoginSession(api, search, origin, navigate),
    ),
    view = session.state;
  let emailInput = $state<HTMLInputElement | null>(null),
    codeInput = $state<HTMLInputElement | null>(null);
  const text = (
    key: Parameters<typeof authText>[1],
    vars?: Record<string, string>,
  ) => authText(lang, key, vars);
  onMount(() => {
    void session.load();
    return () => session.dispose();
  });
  $effect(() => {
    const phase = $view.phase,
      ready = !!$view.context;
    if (ready)
      void tick().then(() => {
        (phase === "email" ? emailInput : codeInput)?.focus();
      });
  });
  const next = $derived(
    authContinuation($view.context?.next ?? "/app", origin),
  );
</script>

<AuthFrame title={$view.phase === "email" ? text("login") : text("check")}>
  {#if $view.loading}<p role="status" class="tw:m-0 tw:text-muted-foreground">
      {text("loading")}
    </p>
  {:else if !$view.context}<Button onclick={() => session.load()}
      >{text("retry")}</Button
    >
  {:else}
    {#if $view.phase === "email"}
      <p class="tw:m-0 tw:text-muted-foreground">{text("welcome")}</p>
      <div class="tw:flex tw:flex-col tw:gap-2">
        {#if $view.context.providers.google}<a
            class={buttonVariants({ variant: "outline" })}
            href={`/auth/google/start?next=${encodeURIComponent(next)}`}
            onclick={(event) => {
              if ($view.busy) event.preventDefault();
            }}>{text("google")}</a
          >{/if}
        {#if $view.context.providers.github}<a
            class={buttonVariants({ variant: "outline" })}
            href={`/auth/github/start?next=${encodeURIComponent(next)}`}
            onclick={(event) => {
              if ($view.busy) event.preventDefault();
            }}>{text("github")}</a
          >{/if}
        {#if $view.context.providers.google || $view.context.providers.github}<p
            class="tw:m-0 tw:text-center tw:text-muted-foreground"
          >
            {text("or")}
          </p>{/if}
      </div>
    {:else}<p class="tw:m-0 tw:break-words tw:text-muted-foreground">
        {text("sent", { email: $view.email })}
      </p>{/if}
    <form
      class="tw:space-y-3"
      onsubmit={(event) => {
        event.preventDefault();
        void session.submit();
      }}
      aria-busy={$view.busy}
    >
      {#if $view.phase === "email"}<Label for="auth-email"
          >{text("email")}</Label
        ><Input
          bind:ref={emailInput}
          id="auth-email"
          type="email"
          autocomplete="email"
          required
          disabled={$view.busy}
          value={$view.email}
          oninput={(event) => session.email(event.currentTarget.value)}
        />
      {:else}<Label for="auth-code">{text("code")}</Label><Input
          bind:ref={codeInput}
          id="auth-code"
          inputmode="numeric"
          autocomplete="one-time-code"
          maxlength={6}
          pattern="[0-9]{6}"
          required
          disabled={$view.busy}
          value={$view.code}
          oninput={(event) => {
            session.code(event.currentTarget.value);
            if ($view.code.length === 6) void session.submit();
          }}
        />{/if}
      <Button type="submit" class="tw:w-full" loading={$view.busy}
        >{$view.phase === "email" ? text("send") : text("login")}</Button
      >
      {#if $view.phase === "code"}<Button
          variant="ghost"
          onclick={() => session.back()}>{text("another")}</Button
        >{/if}
    </form>
  {/if}
  {#if $view.error}<p
      role="alert"
      class="tw:m-0 tw:whitespace-pre-wrap tw:break-words tw:text-destructive"
    >
      {authIssue(lang, $view.error)}
    </p>{/if}
</AuthFrame>
