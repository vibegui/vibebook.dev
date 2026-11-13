<script lang="ts">
  import { untrack, tick } from "svelte";
  import Heading from "../../lib/ui/Heading.svelte";
  import Button from "../../lib/ui/Button.svelte";
  import Input from "../../lib/ui/Input.svelte";
  import Textarea from "../../lib/ui/Textarea.svelte";
  import Avatar from "../../lib/ui/Avatar.svelte";
  import SetupInstructions from "../agents/SetupInstructions.svelte";
  import { avatarImage } from "../account/image";
  import { homeIssue } from "../home/copy";
  import type { OnboardingSession } from "./session";
  import { onboardingText } from "./copy";
  let { owner, lang, onlanguage }: { owner: OnboardingSession; lang: "pt" | "en"; onlanguage(lang: "pt" | "en"): void } = $props();
  const view = untrack(() => owner.state), account = untrack(() => owner.personal.state), profile = untrack(() => owner.profile.state), creator = untrack(() => owner.creator.state), draft = untrack(() => owner.personal.draft);
  const text = (key: Parameters<typeof onboardingText>[1], n?: number) => onboardingText(lang, key, n);
  const busyProfile = $derived(["pending", "confirming", "unconfirmed"].includes($profile.phase));
  let nameInput = $state<HTMLInputElement | null>(null), roomInput = $state<HTMLTextAreaElement | null>(null), photo = $state<HTMLInputElement | null>(null);
  const focusScope = $derived($view.visible ? `${$account.identityRevision}:${$account.me?.email}:${$view.step}` : "");
  const actionScope = $derived(`${focusScope}:${$view.profileBinding?.generation ?? "-"}:${$view.creatorBinding?.generation ?? "-"}`);
  $effect(() => {
    const scope = focusScope;
    if (!scope) return;
    const before = document.activeElement;
    void tick().then(() => {
      if (!owner.current() || focusScope !== scope || document.activeElement !== before && document.activeElement !== document.body && document.activeElement !== document.documentElement) return;
      const target = $view.step === 1 ? nameInput : $view.step === 3 ? roomInput : null;
      if (target?.isConnected) target.focus();
    });
  });
  // A connected outgoing step may survive until Svelte flushes. Its DOM scope
  // must still match the canonical presentation before a gesture can act.
  const live = (event: Event) => owner.current() && $view.visible && event.currentTarget instanceof HTMLElement && event.currentTarget.isConnected && event.currentTarget.closest("[data-native-onboarding]")?.getAttribute("data-onboarding-scope") === owner.actionScope();
</script>

<main data-vb-native data-native-onboarding data-onboarding-step={$view.step} data-onboarding-scope={actionScope} class="tw:flex tw:min-h-dvh tw:flex-col tw:items-center tw:bg-background tw:px-4 tw:py-6 tw:font-sans tw:text-sm tw:leading-6 tw:text-foreground">
  <header class="tw:mb-16 tw:flex tw:w-full tw:max-w-xl tw:flex-wrap tw:items-center tw:gap-3"><a href="/" class="tw:flex-1 tw:font-sans tw:text-2xl tw:font-semibold tw:tracking-normal tw:text-primary tw:no-underline">vibebook</a><div aria-label={text("language")} class="tw:flex tw:gap-1"><Button variant="ghost" size="sm" aria-pressed={lang === "pt"} onclick={(event) => { if (live(event)) onlanguage("pt"); }}>PT</Button><Button variant="ghost" size="sm" aria-pressed={lang === "en"} onclick={(event) => { if (live(event)) onlanguage("en"); }}>EN</Button></div></header>
  <section class="tw:grid tw:w-full tw:max-w-xl tw:gap-4">
    <div aria-label={text("step", $view.step)} class="tw:flex tw:items-center tw:gap-2 tw:text-xs tw:text-muted-foreground">{#each [1, 2, 3] as step}<span aria-hidden="true" class={step <= $view.step ? "tw:h-1 tw:w-6 tw:rounded-full tw:bg-primary" : "tw:h-1 tw:w-6 tw:rounded-full tw:bg-border"}></span>{/each}<span>{text("step", $view.step)}</span></div>
    {#if $view.step === 1}
      <Heading level={1} class="tw:text-3xl tw:leading-tight">{text("nameTitle")}</Heading><p class="tw:m-0 tw:text-base tw:text-muted-foreground">{text("nameHelp")}</p>
      <form class="tw:flex tw:gap-2" onsubmit={(event) => { event.preventDefault(); if (live(event)) owner.continueName(); }}><Input bind:ref={nameInput} value={$view.name} oninput={(event) => { if (live(event)) owner.editName(event.currentTarget.value); }} placeholder={text("name")} aria-label={text("name")} required maxlength={60} autocomplete="given-name" disabled={busyProfile || !$view.profileBinding}/><Button type="submit" disabled={busyProfile || !$view.profileBinding}>{text("next")}</Button></form>
      <div><Button variant="ghost" disabled={busyProfile || !$view.profileBinding} onclick={(event) => { if (live(event)) photo?.click(); }}>{#if $account.me?.avatar}<Avatar name={$account.me.name || $account.me.email} src={`/api/avatar/${encodeURIComponent($account.me.email)}?v=${$account.me.avatar}`}/>{/if}{text($account.me?.avatar ? "changePhoto" : "photo")}</Button><input bind:this={photo} type="file" accept="image/png,image/jpeg,image/webp" aria-label={text("photoLabel")} class="tw:sr-only" onchange={(event) => { const file = event.currentTarget.files?.[0]; event.currentTarget.value = ""; if (live(event) && file) owner.photo((current) => avatarImage(file, current)); }}/></div>
      {#if $profile.phase === "pending" || $profile.phase === "confirming"}<p role="status" class="tw:m-0 tw:text-muted-foreground">{text("pending")}</p>{:else if $profile.phase === "error"}<p role="alert" class="tw:m-0 tw:text-destructive">{text("failed")}</p>{:else if $profile.phase === "unconfirmed"}<p role="status" class="tw:m-0 tw:text-muted-foreground">{text("unconfirmed")}</p><Button variant="outline" onclick={(event) => { if (live(event)) owner.reviewProfile(); }}>{text("reviewed")}</Button>{/if}
    {:else if $view.step === 2}
      <Heading level={1} class="tw:text-3xl tw:leading-tight">{text("claudeTitle")}</Heading><p class="tw:m-0 tw:text-base tw:text-muted-foreground">{text("claudeHelp")}</p>
      {#if $view.connectedNotice}<p role="status" class="tw:m-0 tw:rounded-surface tw:border tw:border-border tw:p-4 tw:font-semibold tw:text-success">✓ {text("connected")}</p>{:else}<SetupInstructions origin={location.origin} {lang} intro={false} current={owner.current}/>{/if}
      <div class="tw:flex tw:flex-wrap tw:justify-end tw:gap-2"><Button variant="ghost" onclick={(event) => { if (live(event)) owner.back(); }}>{text("back")}</Button><Button variant="ghost" onclick={(event) => { if (live(event)) owner.skipClaude(); }}>{text("skipClaude")}</Button></div>
    {:else}
      <Heading level={1} class="tw:text-3xl tw:leading-tight">{text("roomTitle")}</Heading><p class="tw:m-0 tw:text-base tw:text-muted-foreground">{text("roomHelp")}</p>
      <form onsubmit={(event) => { event.preventDefault(); if (live(event)) void owner.createRoom(); }}><Textarea bind:ref={roomInput} rows={3} value={$draft.create} oninput={(event) => { if (live(event)) owner.editRoom(event.currentTarget.value); }} required aria-label={text("roomTitle")} placeholder={text("roomPlaceholder")} disabled={$creator.busy || !$view.creatorBinding} onkeydown={(event) => { if (live(event) && event.key === "Enter" && !event.shiftKey && !event.isComposing) { event.preventDefault(); void owner.createRoom(); } }}/>{#if $creator.error}<p role="alert" class="tw:text-sm tw:text-destructive">{homeIssue(lang, $creator.error)}</p>{/if}<div class="tw:mt-4 tw:flex tw:flex-wrap tw:justify-end tw:gap-2"><Button variant="ghost" onclick={(event) => { if (live(event)) owner.back(); }}>{text("back")}</Button><Button type="submit" disabled={$creator.busy || !$view.creatorBinding}>{text($creator.busy ? "creating" : "create")}</Button></div></form>
    {/if}
  </section>
  <div class="tw:mt-auto tw:pt-8"><Button variant="ghost" size="sm" class="tw:text-muted-foreground" onclick={(event) => { if (live(event)) owner.skipHome(); }}>{text("skipHome")}</Button></div>
</main>
