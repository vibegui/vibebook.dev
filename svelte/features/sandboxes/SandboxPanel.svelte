<script lang="ts">
  import { untrack, onDestroy } from "svelte";
  import Heading from "../../lib/ui/Heading.svelte";
  import Button from "../../lib/ui/Button.svelte";
  import Input from "../../lib/ui/Input.svelte";
  import AlertDialog from "../../lib/ui/AlertDialog.svelte";
  import { sandboxIdentity, type SandboxSession } from "./session";
  import type { SandboxCredentials } from "./credentials";
  import type { TerminalSession } from "./terminalSession";
  import { sandboxText, sandboxStateText, type SandboxLocale } from "./copy";
  import { sandboxLog } from "./log";
  let {
    owner,
    credentials,
    terminal,
    lang = "pt",
  }: {
    owner: SandboxSession;
    credentials: SandboxCredentials;
    terminal: TerminalSession;
    lang?: SandboxLocale;
  } = $props();
  const view = untrack(() => owner.state),
    credentialView = untrack(() => credentials.state);
  let apiKey = $state(""),
    token = $state(""),
    notice = $state("");
  let selected = $state<
    | { kind: "sandbox"; id: string; identity: string; name: string }
    | {
        kind: "credential";
        action: "remove-key" | "remove-token";
        identity: string;
      }
    | null
  >(null);
  let trigger: HTMLElement | null = null,
    active = true,
    copyTicket = 0;
  const text = (key: Parameters<typeof sandboxText>[1]) =>
    sandboxText(lang, key);
  const busy = $derived(
    !owner.current() ||
      ["pending", "unconfirmed"].includes($view.phase) ||
      ["pending", "unconfirmed"].includes($credentialView.phase),
  );
  const credentialIdentity = $derived(
    JSON.stringify([$credentialView.connected, $credentialView.claude]),
  );
  function validSelection() {
    const snapshot = selected;
    if (!snapshot) return false;
    return snapshot.kind === "credential"
      ? snapshot.identity === credentialIdentity
      : ($view.data?.sandboxes.some(
          (card) =>
            card.id === snapshot.id &&
            sandboxIdentity(card) === snapshot.identity,
        ) ?? false);
  }
  $effect(() => {
    if (selected && !validSelection()) selected = null;
  });
  async function save(action: "key" | "token") {
    if (busy || !owner.current()) return;
    const input = action === "key" ? apiKey : token;
    apiKey = "";
    token = "";
    await credentials.write(action, input);
  }
  function confirm() {
    if (busy || !validSelection() || !selected || !owner.current()) return;
    const snapshot = selected;
    selected = null;
    if (snapshot.kind === "sandbox")
      void owner.remove(snapshot.id, snapshot.identity);
    else void credentials.write(snapshot.action);
  }
  function removeCredential(
    action: "remove-key" | "remove-token",
    element: HTMLElement,
  ) {
    trigger = element;
    selected = { kind: "credential", action, identity: credentialIdentity };
  }
  $effect(() => {
    void $view.data;
    if (!owner.current()) {
      apiKey = "";
      token = "";
      selected = null;
      notice = "";
      copyTicket++;
    }
  });
  async function copy(value: string) {
    if (!owner.current()) return;
    const ticket = ++copyTicket;
    notice = "";
    try {
      await navigator.clipboard.writeText(value);
      if (active && owner.current() && ticket === copyTicket)
        notice = text("copied");
    } catch {
      if (active && owner.current() && ticket === copyTicket)
        notice = text("copyFailed");
    }
  }
  onDestroy(() => {
    active = false;
    copyTicket++;
    apiKey = "";
    token = "";
  });
</script>

<section
  data-vb-native
  data-native-sandboxes
  class="tw:space-y-4 tw:font-sans tw:text-sm tw:text-foreground"
>
  <div class="tw:flex tw:items-center tw:gap-2">
    <Heading
      level={3}
      class="tw:m-0 tw:flex-1 tw:font-sans tw:text-base tw:font-semibold tw:tracking-normal"
      >{text("title")}</Heading
    ><Button
      variant="ghost"
      size="sm"
      disabled={$view.loading}
      onclick={() => void owner.refresh(true)}>{text("refresh")}</Button
    >
  </div>
  <p class="tw:m-0 tw:text-muted-foreground">{text("description")}</p>
  {#if $view.loading && !$view.data}<p role="status">{text("loading")}</p>{/if}
  {#if $view.readError}<p role="alert" class="tw:text-destructive">
      {text("readFailed")}
    </p>{/if}
  {#if $view.data}
    {#each ["key", "token"] as kind}
      {@const configured =
        kind === "key" ? $credentialView.connected : $credentialView.claude}
      <div
        class="tw:space-y-2 tw:rounded-surface tw:border tw:border-border tw:p-3"
      >
        <div class="tw:flex tw:items-center tw:gap-2">
          <strong class="tw:flex-1"
            >{text(kind === "key" ? "key" : "token")}</strong
          ><span class="tw:text-muted-foreground"
            >{text(configured ? "connected" : "missing")}</span
          >{#if configured}<Button
              variant="ghost"
              size="sm"
              disabled={busy}
              onclick={(event) =>
                removeCredential(
                  kind === "key" ? "remove-key" : "remove-token",
                  event.currentTarget,
                )}>{text("remove")}</Button
            >{/if}
        </div>
        {#if !configured}
          <p class="tw:m-0 tw:text-xs tw:text-muted-foreground">
            {text(kind === "key" ? "keyHelp" : "tokenHelp")}
          </p>
          {@const command =
            kind === "key"
              ? "npx freestyle@latest tokens create vibebook"
              : "claude setup-token"}
          <div class="tw:flex tw:items-center tw:gap-2">
            <code
              class="tw:min-w-0 tw:flex-1 tw:overflow-auto tw:font-mono tw:text-xs"
              >{command}</code
            ><Button
              variant="outline"
              size="sm"
              onclick={() => void copy(command)}>{text("copy")}</Button
            >
          </div>
          <form
            class="tw:flex tw:gap-2"
            onsubmit={(event) => {
              event.preventDefault();
              void save(kind === "key" ? "key" : "token");
            }}
          >
            {#if kind === "key"}<Input
                type="password"
                bind:value={apiKey}
                aria-label={text("key")}
                autocomplete="off"
                required
                disabled={busy}
              />{:else}<Input
                type="password"
                bind:value={token}
                aria-label={text("token")}
                autocomplete="off"
                required
                disabled={busy}
              />{/if}
            <Button type="submit" disabled={busy}>{text("save")}</Button>
          </form>
          <p class="tw:m-0 tw:text-xs tw:text-muted-foreground">
            {text("secretHelp")}
          </p>
        {/if}
      </div>
    {/each}
    {#if notice}<p role="status">{notice}</p>{/if}
    {#if $credentialView.notice}<p role="status">
        {text($credentialView.notice === "removed" ? "removed" : "saved")}
      </p>{/if}
    {#if $credentialView.phase === "error"}<p
        role="alert"
        class="tw:text-destructive"
      >
        {text("failed")}
      </p>{/if}
    {#if $credentialView.phase === "unconfirmed"}<p role="status">
        {text("unconfirmed")}
      </p>
      <Button
        variant="outline"
        onclick={() => {
          credentials.review();
          void owner.refresh(true);
        }}>{text("reviewed")}</Button
      >{/if}
    {#each $view.data.sandboxes as card (card.id)}
      <article
        data-sandbox-id={card.id}
        class="tw:space-y-3 tw:rounded-surface tw:border tw:border-border tw:p-3"
      >
        <div class="tw:flex tw:items-start tw:gap-3">
          <div class="tw:min-w-0 tw:flex-1">
            <strong class="tw:block tw:break-words">☁ {card.name}</strong>
            <p class="tw:m-0 tw:text-xs tw:text-muted-foreground">
              {sandboxStateText(card.state, lang)} · {new Intl.NumberFormat(
                lang,
                { style: "currency", currency: "USD" },
              ).format(card.rate)}/h
            </p>
            {#if card.error}<p
                class="tw:m-0 tw:break-words tw:text-xs tw:text-destructive"
              >
                {sandboxLog(card.error)}
              </p>{/if}
          </div>
          <span class="tw:text-xs"
            >{new Intl.NumberFormat(lang, {
              style: "currency",
              currency: "USD",
            }).format(card.cost)}</span
          >
        </div>
        {#if $view.logs[card.id] || (!card.ready && card.log)}<details>
            <summary class="tw:cursor-pointer">{text("log")}</summary>
            <pre
              class="tw:max-h-64 tw:overflow-auto tw:whitespace-pre-wrap tw:break-words tw:font-mono tw:text-xs">{sandboxLog(
                $view.logs[card.id] || card.log,
              )}</pre>
          </details>{/if}
        <div class="tw:flex tw:flex-wrap tw:gap-2">
          {#if card.state !== "deleted"}<Button
              size="sm"
              disabled={busy || !$credentialView.connected}
              onclick={(event) => terminal.open(card, event.currentTarget)}
              >{text("terminal")}</Button
            >{/if}
          {#if card.state === "running"}<Button
              variant="outline"
              size="sm"
              disabled={busy || !$credentialView.connected}
              onclick={() =>
                void owner.power(card.id, "pause", sandboxIdentity(card))}
              >{text("pause")}</Button
            >{:else if card.state === "paused" || card.state === "stopped"}<Button
              variant="outline"
              size="sm"
              disabled={busy || !$credentialView.connected}
              onclick={() =>
                void owner.power(card.id, "start", sandboxIdentity(card))}
              >{text("start")}</Button
            >{/if}
          {#if !card.ready && card.state === "running"}<Button
              variant="outline"
              size="sm"
              disabled={busy || !$credentialView.connected}
              onclick={() => void owner.setup(card.id, sandboxIdentity(card))}
              >{text("setup")}</Button
            >{/if}
          <Button
            variant="ghost"
            size="sm"
            disabled={busy || !$credentialView.connected}
            onclick={(event) => {
              trigger = event.currentTarget;
              selected = {
                kind: "sandbox",
                id: card.id,
                identity: sandboxIdentity(card),
                name: card.name,
              };
            }}>{text("remove")}</Button
          >
        </div>
      </article>
    {:else}<p class="tw:text-muted-foreground">{text("empty")}</p>{/each}
    {#if $view.phase === "pending" || $credentialView.phase === "pending"}<p
        role="status"
      >
        {text($view.operation === "setup" ? "setupPending" : "pending")}
      </p>{/if}
    {#if $view.phase === "error"}<p role="alert" class="tw:text-destructive">
        {text("failed")}
      </p>{/if}
    {#if $view.phase === "unconfirmed"}<p role="status">
        {text("unconfirmed")}
      </p>
      {#if $view.candidates.length}<p class="tw:text-muted-foreground">
          {text("uncertainCreate")}
        </p>{/if}<Button
        variant="outline"
        onclick={() => {
          owner.review();
          void owner.refresh(true);
        }}>{text("reviewed")}</Button
      >{/if}
    <Button
      disabled={busy ||
        !$credentialView.connected ||
        $view.data.sandboxes.length >= 3}
      onclick={() => {
        if (!busy) void owner.create();
      }}>{text("create")}</Button
    >
    <p class="tw:m-0 tw:text-xs tw:text-muted-foreground">{text("costHelp")}</p>
    <p class="tw:m-0 tw:text-xs tw:text-muted-foreground">
      {text($credentialView.connected ? "createLimit" : "keyRequired")}
    </p>
  {/if}
</section>
<AlertDialog
  open={selected !== null}
  title={text(
    selected?.kind === "sandbox" ? "removeTitle" : "credentialRemoveTitle",
  )}
  description={text(
    selected?.kind === "sandbox"
      ? "removeBody"
      : selected?.kind === "credential" && selected.action === "remove-token"
        ? "removeTokenBody"
        : "removeKeyBody",
  )}
  confirmLabel={text("remove")}
  cancelLabel={text("cancel")}
  confirmDisabled={busy || !validSelection()}
  onconfirm={confirm}
  onOpenChange={(open) => {
    if (!open) selected = null;
  }}
  returnFocus={() => (trigger?.isConnected ? trigger : null)}
/>
