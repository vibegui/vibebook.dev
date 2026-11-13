<script lang="ts">
  import { onMount, untrack } from "svelte";
  import type { AuthApi } from "./api";
  import { authIssue, authText, type AuthLanguage } from "./copy";
  import { createConsentSession } from "./session";
  import AuthFrame from "./AuthFrame.svelte";
  import AuthLogoutForm from "./AuthLogoutForm.svelte";
  import Button from "../../lib/ui/Button.svelte";
  import { buttonVariants } from "../../lib/ui/button";
  let {
    api,
    search,
    lang,
    initialFailure = false,
  }: {
    api: AuthApi;
    search: string;
    lang: AuthLanguage;
    initialFailure?: boolean;
  } = $props();
  const session = untrack(() =>
      createConsentSession(api, search, undefined, initialFailure),
    ),
    view = session.state;
  let submitted = $state(false);
  const text = (
    key: Parameters<typeof authText>[1],
    vars?: Record<string, string>,
  ) => authText(lang, key, vars);
  onMount(() => {
    if (!initialFailure) void session.load();
    return () => session.dispose();
  });
</script>

<AuthFrame
  title={$view.context
    ? text("connect", { name: $view.context.client_name })
    : text("consentError")}
>
  {#if $view.loading}<p role="status" class="tw:m-0 tw:text-muted-foreground">
      {text("loading")}
    </p>
  {:else if $view.context}
    <p class="tw:m-0 tw:break-words">
      {text("as", { email: $view.context.email })}
    </p>
    <ul class="tw:m-0 tw:list-disc tw:space-y-1 tw:pl-5">
      <li>{text("rooms")}</li>
      <li>{text("read")}</li>
      <li>{text("post")}</li>
    </ul>
    <p class="tw:m-0 tw:text-muted-foreground">{text("cant")}</p>
    <p class="tw:m-0 tw:break-words tw:text-muted-foreground">
      {$view.context.client_domain
        ? text("publisher", { domain: $view.context.client_domain })
        : text("unverified")}
      {text("goes", { host: $view.context.redirect_host })}
    </p>
    <p class="tw:m-0 tw:break-words tw:text-xs tw:text-muted-foreground">
      {text("scope")}: {$view.context.scope.join(", ")}
    </p>
    {#if $view.context.redirect_is_loopback}<p
        role="note"
        class="tw:m-0 tw:rounded-control tw:border tw:border-warning tw:bg-warning/10 tw:p-3 tw:text-foreground"
      >
        {text("local")}
      </p>{/if}
    <form
      method="post"
      action={`/authorize${search}`}
      aria-busy={submitted}
      class="tw:flex tw:flex-wrap tw:gap-2"
      onsubmit={(event) => {
        if (submitted) event.preventDefault();
        else submitted = true;
      }}
    >
      <input type="hidden" name="handle" value={$view.context.handle} />
      <Button
        type="submit"
        name="decision"
        value="deny"
        variant="outline"
        aria-disabled={submitted}>{text("cancel")}</Button
      >
      <Button
        type="submit"
        name="decision"
        value="approve"
        aria-disabled={submitted}>{text("allow")}</Button
      >
    </form>
    {#if submitted}<p role="status" class="tw:m-0 tw:text-muted-foreground">
        {text("waiting")}
      </p>{/if}
    <AuthLogoutForm
      next={`/authorize${search}`}
      {lang}
      onBegin={() => {
        submitted = true;
      }}
    />
  {:else}<p role="alert" class="tw:m-0 tw:break-words tw:text-destructive">
      {authIssue(lang, $view.error)}
    </p>
    {#if $view.signedOut}<a
        class={buttonVariants()}
        href={`/login?ui=svelte&next=${encodeURIComponent("/authorize" + search)}`}
        >{text("login")}</a
      >{:else}<Button variant="outline" onclick={() => session.load()}
        >{text("retry")}</Button
      >{/if}{#if $view.returnTo}<a
        class={buttonVariants({ variant: "ghost" })}
        href={$view.returnTo}>{text("return")}</a
      >{/if}{/if}
</AuthFrame>
