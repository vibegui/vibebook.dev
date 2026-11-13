<script lang="ts">
  import { onDestroy, tick } from "svelte";
  import type { Attachment, Room } from "../../../shared/room";
  import type { SendRoomCommand } from "../../../shared/commands";
  import type { RequestRoomCommand } from "../../roomConnection";
  import Button from "../../lib/ui/Button.svelte";
  import Icon from "../../lib/ui/Icon.svelte";
  import IconButton from "../../lib/ui/IconButton.svelte";
  import Input from "../../lib/ui/Input.svelte";
  import Label from "../../lib/ui/Label.svelte";
  import ErrorState from "../../lib/components/ErrorState.svelte";
  import { resolvePin, type PinAppTarget } from "./model";
  import {
    closePinDraft,
    openPinDraft,
    removePinnedItem,
    requestPinnedFiles,
    submitPinDraft,
    updatePinDraft,
    type PinDraft,
    type PinIssue,
    type PinsSession,
  } from "./session";

  let {
    room,
    session,
    send,
    request,
    onopenfile,
    onopenapp,
    t,
  }: {
    room: Room;
    session: PinsSession;
    send: SendRoomCommand;
    request: RequestRoomCommand;
    onopenfile: (file: Attachment) => void;
    onopenapp: (app: PinAppTarget) => void;
    t: (text: string, vars?: Record<string, string | number>) => string;
  } = $props();
  let disposed = false;
  onDestroy(() => {
    disposed = true;
  });
  function interactive() {
    return !disposed && session.active && session.roomId === room.id;
  }
  function updateDraft(patch: Partial<PinDraft>) {
    if (interactive()) updatePinDraft(session, patch);
  }
  function escape(event: KeyboardEvent) {
    if (!interactive() || event.key !== "Escape") return;
    event.preventDefault();
    event.stopPropagation();
    void close();
  }
  function retryFiles() {
    if (interactive()) requestPinnedFiles(session, room, send, true);
  }
  function remove(id: string) {
    if (interactive()) void removePinnedItem(session, room.id, id, request);
  }
  const pinState = $derived(session.state);
  const rows = $derived(
    (room.pins ?? []).map((pin) => ({ pin, target: resolvePin(pin, room) })),
  );
  const unknownFiles = $derived(
    rows.some((row) => row.target.kind === "file-unloaded"),
  );
  let fileToOpen: string | null = $state(null);
  let requestedFrom = $state.raw<PinsSession | null>(null);
  const live = $derived(session.active && session.roomId === room.id);
  let urlInput: HTMLInputElement | null = $state(null);
  let addButton: HTMLButtonElement | null = $state(null);
  const fieldId = $derived(`pin-url-${room.id}`);
  const issueTitle = (issue: PinIssue) =>
    t(
      {
        "invalid-link": "Use um link http ou https válido.",
        offline: "Sem conexão. Seu rascunho foi mantido.",
        "send-failed": "Não deu pra enviar agora. Tente de novo.",
        unconfirmed:
          "Ainda não recebi confirmação. Confira os fixados antes de tentar de novo.",
        "already-pinned": "Este link já está nos fixados.",
        rejected: "Não deu pra atualizar os fixados. Tente de novo.",
      }[issue.kind],
    );

  $effect(() => {
    if (disposed || !fileToOpen) return;
    if (
      requestedFrom !== session ||
      !session.active ||
      session.roomId !== room.id
    ) {
      fileToOpen = null;
      requestedFrom = null;
      return;
    }
    const pin = room.pins?.find(
      (pin) => pin.id === fileToOpen && pin.kind === "file",
    );
    if (!pin) {
      fileToOpen = null;
      requestedFrom = null;
      return;
    }
    const target = resolvePin(pin, room);
    if (target.kind === "file") {
      fileToOpen = null;
      requestedFrom = null;
      onopenfile(target.file);
    } else if (room.filesAll) {
      fileToOpen = null;
      requestedFrom = null;
    }
  });
  async function open() {
    if (!interactive()) return;
    const current = session;
    openPinDraft(current);
    await tick();
    if (
      !disposed &&
      session === current &&
      current.active &&
      current.roomId === room.id &&
      urlInput?.isConnected
    )
      urlInput.focus();
  }
  async function close() {
    if (!interactive()) return;
    const current = session;
    closePinDraft(current);
    await tick();
    if (
      !disposed &&
      session === current &&
      current.active &&
      current.roomId === room.id &&
      addButton?.isConnected
    )
      addButton.focus();
  }
  function submit(event: SubmitEvent) {
    event.preventDefault();
    if (interactive()) void submitPinDraft(session, room.id, request);
  }
  function activate(id: string) {
    if (!interactive()) return;
    // Resolve again at the action boundary; a removed pin/file is not kept alive by a stale row closure.
    const pin = room.pins?.find((pin) => pin.id === id);
    if (!pin) return;
    const target = resolvePin(pin, room);
    if (target.kind === "file") onopenfile(target.file);
    if (target.kind === "app") onopenapp(target.app);
    if (target.kind === "file-unloaded") {
      requestedFrom = session;
      fileToOpen = id;
      requestPinnedFiles(session, room, send, !$pinState.filesPending);
    }
  }
</script>

<section
  class="pinsSec tw:space-y-2 tw:border-t tw:border-border tw:bg-sidebar tw:px-3 tw:py-3 tw:font-sans tw:text-sm tw:text-sidebar-foreground"
  aria-labelledby={`pins-title-${room.id}`}
  data-native-pins
  data-vb-native
>
  <div class="tw:flex tw:items-center tw:justify-between tw:gap-2">
    <h2
      id={`pins-title-${room.id}`}
      class="tw:m-0 tw:font-sans tw:text-xs tw:font-semibold tw:uppercase tw:tracking-wide tw:text-muted-foreground"
    >
      {t("Fixados")}
    </h2>
    {#if !$pinState.adding}
      <IconButton
        label={t("Fixar um link")}
        icon="plus"
        bind:ref={addButton}
        disabled={!live}
        onclick={open}
      />
    {/if}
  </div>

  {#if $pinState.adding}
    <form
      class="tw:space-y-3 tw:rounded-surface tw:border tw:border-border tw:bg-card tw:p-3"
      onsubmit={submit}
      aria-label={t("Fixar um link")}
    >
      <div class="tw:space-y-1">
        <Label for={fieldId}>{t("Link pra fixar")}</Label>
        <Input
          id={fieldId}
          name="url"
          bind:ref={urlInput}
          value={$pinState.draft.url}
          onkeydown={escape}
          oninput={(event) => updateDraft({ url: event.currentTarget.value })}
          required
          maxlength={2000}
          autocomplete="url"
          placeholder={t("Cole um link (site, repo, painel…)")}
          disabled={!live}
          aria-invalid={$pinState.issue?.kind === "invalid-link" || undefined}
        />
      </div>
      <div class="tw:space-y-1">
        <Label for={`${fieldId}-title`}>{t("Nome (opcional)")}</Label>
        <Input
          id={`${fieldId}-title`}
          name="title"
          value={$pinState.draft.title}
          onkeydown={escape}
          oninput={(event) => updateDraft({ title: event.currentTarget.value })}
          maxlength={80}
          disabled={!live}
        />
      </div>
      <div class="tw:flex tw:flex-wrap tw:justify-end tw:gap-2">
        <Button
          variant="ghost"
          size="sm"
          disabled={!live}
          onclick={close}
          onkeydown={escape}>{t("Cancelar")}</Button
        >
        <Button
          type="submit"
          size="sm"
          disabled={!live || !!$pinState.pending}
          onkeydown={escape}>{t("Fixar")}</Button
        >
      </div>
    </form>
  {/if}

  {#if $pinState.pending}
    <p
      role="status"
      class="tw:m-0 tw:font-sans tw:text-xs tw:leading-5 tw:text-muted-foreground"
    >
      {t("Aguardando confirmação…")}
    </p>
  {/if}
  {#if $pinState.issue?.kind === "already-pinned"}
    <p
      role="status"
      class="tw:m-0 tw:font-sans tw:text-xs tw:leading-5 tw:text-muted-foreground"
    >
      {issueTitle($pinState.issue)}
    </p>
  {:else if $pinState.issue}<ErrorState
      compact
      title={issueTitle($pinState.issue)}
      description={$pinState.issue.detail}
    />{/if}
  {#if $pinState.fileIssue}<ErrorState
      compact
      title={issueTitle({ kind: $pinState.fileIssue })}
    />{/if}
  {#if unknownFiles && ($pinState.filesPending || $pinState.fileIssue)}
    <Button variant="ghost" size="sm" disabled={!live} onclick={retryFiles}
      >{t("Tentar carregar novamente")}</Button
    >
  {/if}

  {#if rows.length}
    <ul class="tw:m-0 tw:list-none tw:space-y-1 tw:p-0">
      {#each rows as { pin, target } (pin.id)}
        <li class="tw:flex tw:items-start tw:gap-1" data-pin-id={pin.id}>
          {#if target.kind === "link"}
            <a
              href={target.href}
              target="_blank"
              rel="noopener noreferrer"
              onclick={(event) => {
                if (!interactive()) event.preventDefault();
              }}
              class="tw:flex tw:min-w-0 tw:flex-1 tw:items-center tw:gap-2 tw:rounded-control tw:px-2 tw:py-2 tw:font-sans tw:text-sm tw:text-foreground tw:no-underline tw:hover:bg-accent tw:focus-visible:outline-none tw:focus-visible:ring-2 tw:focus-visible:ring-ring"
              title={target.href}
            >
              <Icon name="chevronRight" /><span class="tw:min-w-0"
                ><span class="tw:block tw:truncate">{target.label}</span><span
                  class="tw:block tw:truncate tw:text-xs tw:text-muted-foreground"
                  >{target.detail}</span
                ></span
              >
            </a>
          {:else if target.kind === "file" || target.kind === "app" || target.kind === "file-unloaded"}
            <Button
              variant="ghost"
              class="tw:h-auto tw:min-w-0 tw:flex-1 tw:justify-start tw:whitespace-normal tw:px-2 tw:py-2 tw:text-left"
              disabled={!live}
              onclick={() => activate(pin.id)}
            >
              <Icon name="chevronRight" /><span class="tw:min-w-0"
                ><span class="tw:block tw:truncate">{target.label}</span><span
                  class="tw:block tw:truncate tw:text-xs tw:font-normal tw:text-muted-foreground"
                  >{target.kind === "file-unloaded"
                    ? t(
                        $pinState.filesPending
                          ? "Carregando arquivo…"
                          : "Carregar arquivo",
                      )
                    : t(target.detail)}</span
                ></span
              >
            </Button>
          {:else}
            <div
              class="tw:flex tw:min-w-0 tw:flex-1 tw:items-start tw:gap-2 tw:px-2 tw:py-2 tw:font-sans tw:text-sm tw:text-muted-foreground"
            >
              <Icon name="warning" class="tw:mt-0.5" /><span class="tw:min-w-0"
                ><span class="tw:block tw:truncate">{target.label}</span><span
                  class="tw:block tw:text-xs">{t(target.reason)}</span
                ></span
              >
            </div>
          {/if}
          <IconButton
            icon="close"
            label={t("Desafixar {name}", { name: target.label })}
            disabled={!live || !!$pinState.pending}
            onclick={() => remove(pin.id)}
          />
        </li>
      {/each}
    </ul>
  {:else if !$pinState.adding}
    <Button
      variant="ghost"
      class="tw:w-full tw:justify-start tw:whitespace-normal tw:text-left tw:text-muted-foreground"
      disabled={!live}
      onclick={open}
    >
      <Icon name="plus" />{t("Fixar site, repo ou app")}
    </Button>
  {/if}
</section>
