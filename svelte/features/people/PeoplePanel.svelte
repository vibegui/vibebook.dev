<script lang="ts">
  import { onDestroy, untrack, type Snippet } from "svelte";
  import {
    canRemove,
    canAct,
    inviteMessage,
    normalizeEmail,
    peopleModel,
    type PeopleRoom,
  } from "./model";
  import { createPeopleRequest, type PeopleRequest } from "./api";
  import { createPeopleSession } from "./session";
  import AlertDialog from "../../lib/ui/AlertDialog.svelte";
  import Avatar from "../../lib/ui/Avatar.svelte";
  import Badge from "../../lib/ui/Badge.svelte";
  import Button from "../../lib/ui/Button.svelte";
  import IconButton from "../../lib/ui/IconButton.svelte";
  import Input from "../../lib/ui/Input.svelte";
  import Heading from "../../lib/ui/Heading.svelte";
  import Label from "../../lib/ui/Label.svelte";
  let {
    room,
    friends = [],
    vb,
    foldOpen = { off: false, friends: null },
    agents,
    sandboxes,
    request,
    onfoldchange,
  }: {
    room: PeopleRoom;
    friends?: string[];
    vb: {
      t: (text: string, vars?: Record<string, string | number>) => string;
      name: (email: string) => string;
      ago: (ts: number) => string;
      avatarUrl?: (email: string) => string | undefined;
    };
    foldOpen?: { off: boolean; friends: boolean | null };
    agents?: Snippet<[string]>;
    sandboxes?: Snippet;
    request?: PeopleRequest;
    onfoldchange?: (key: "off" | "friends", value: boolean) => void;
  } = $props();
  const session = untrack(() => createPeopleSession(room.id));
  const http = untrack(() => createPeopleRequest(room.id));
  const view = session.state;
  const model = $derived(peopleModel(room, friends));
  const ids = $props.id();
  let dialogOpen = $state(false),
    deletion = $state<{ email: string; action: "remove" | "deny" } | null>(
      null,
    );
  let trigger = $state<HTMLElement | null>(null),
    root = $state<HTMLElement | null>(null);
  let offlineOpen = $state(untrack(() => foldOpen.off)),
    friendsOpen = $state(
      untrack(() => foldOpen.friends ?? room.members.length <= 1),
    );
  const issueText = (issue: string) =>
    issue === "invalid-email"
      ? vb.t("Email inválido.")
      : issue === "already-member"
        ? vb.t("Esta pessoa já está na sala.")
        : issue === "unconfirmed"
          ? vb.t(
              "Ainda não recebi a confirmação. Confira antes de tentar de novo.",
            )
          : issue;
  const avatarUrl = (email: string) =>
    vb.avatarUrl?.(email) ||
    (room.avatars?.[email]
      ? `/api/avatar/${encodeURIComponent(email)}?v=${room.avatars[email]}`
      : undefined);
  $effect(() => {
    session.sync(room);
    if (
      deletion &&
      (deletion.action === "remove"
        ? !canRemove(room, deletion.email)
        : !room.requests?.some((r) => r.email === deletion!.email))
    ) {
      dialogOpen = false;
      deletion = null;
    }
  });
  onDestroy(() => session.dispose());
  function copy(email: string) {
    const text = inviteMessage(room, email, location.origin, vb.t);
    void session.copy(
      email,
      () =>
        navigator.clipboard?.writeText(text) ??
        Promise.reject(new Error("clipboard unavailable")),
    );
  }
  function invite(raw: string) {
    const email = normalizeEmail(raw);
    if ($view.pending[email]) return;
    const action = room.pending?.includes(email) ? "resend" : "invite";
    if (canAct(room, action, email)) copy(email); // Keep clipboard user activation; its result is separate from the HTTP invitation result.
    void session.mutate(action, email, request || http);
  }
  function confirm(
    email: string,
    action: "remove" | "deny",
    element: HTMLElement,
  ) {
    deletion = { email, action };
    trigger = element;
    dialogOpen = true;
  }
  async function remove() {
    const selected = deletion;
    if (!selected) return;
    const success = await session.mutate(
      selected.action,
      selected.email,
      request || http,
    );
    if (success && deletion === selected && !$view.pending[selected.email])
      dialogOpen = false;
  }
</script>

{#snippet member(email: string)}
  <div class="tw:space-y-2">
    <div class="tw:flex tw:items-start tw:gap-2" data-person={email}>
      <Avatar name={vb.name(email)} src={avatarUrl(email)} />
      <div class="tw:min-w-0 tw:flex-1 tw:space-y-1">
        <p
          class="tw:m-0 tw:break-words tw:text-sm tw:font-medium"
          title={email}
        >
          {room.names?.[email] || vb.name(email)}
        </p>
        <p class="tw:m-0 tw:break-all tw:text-xs tw:text-muted-foreground">
          {email}
        </p>
        {#if room.pending?.includes(email)}
          <Badge>{vb.t("pendente")}</Badge>
          <div class="tw:flex tw:flex-wrap tw:gap-1">
            <Button
              size="sm"
              variant="ghost"
              data-copyinv={email}
              title={vb.t(
                "Copiar a mensagem de convite (link da sala + setup do agent) para mandar no WhatsApp",
              )}
              onclick={() => copy(email)}>{vb.t("copiar")}</Button
            >
            <Button
              size="sm"
              variant="ghost"
              data-resend={email}
              disabled={!!$view.pending[email]}
              onclick={() => {
                void session.mutate("resend", email, request || http);
              }}>{vb.t("reenviar")}</Button
            >
          </div>
        {:else}<Badge
            variant={room.online.includes(email) || email === room.me
              ? "success"
              : "neutral"}
            >{room.online.includes(email) || email === room.me
              ? vb.t("online")
              : vb.t("offline")}</Badge
          >{/if}
      </div>
      {#if canRemove(room, email)}<IconButton
          icon="close"
          data-remove={email}
          label={room.pending?.includes(email)
            ? vb.t("Cancelar convite")
            : vb.t("Remover {email}", { email })}
          disabled={!!$view.pending[email]}
          onclick={(event) => confirm(email, "remove", event.currentTarget)}
        />{/if}
    </div>
    {@render agents?.(email)}
  </div>
{/snippet}
<section
  bind:this={root}
  tabindex="-1"
  data-vb-native
  data-people-panel
  class="tw:space-y-4 tw:border-t tw:border-border tw:p-3 tw:font-sans tw:text-sm tw:text-foreground"
>
  {#if room.requests?.length}<div class="tw:space-y-3">
      <Heading level={3} class="tw:text-sm tw:leading-5">
        {vb.t("Pedindo pra entrar")}
      </Heading>
      {#each room.requests as access (access.email)}<div
          class="tw:flex tw:items-start tw:gap-2"
          data-access-request={access.email}
        >
          <Avatar
            name={access.name || access.email}
            src={avatarUrl(access.email)}
          />
          <div class="tw:min-w-0 tw:flex-1 tw:space-y-1">
            <p class="tw:m-0 tw:break-words tw:font-medium">
              {access.name || access.email}
            </p>
            <p class="tw:m-0 tw:break-all tw:text-xs tw:text-muted-foreground">
              {access.email} · {vb.t("pediu {ago}", { ago: vb.ago(access.ts) })}
            </p>
            <Button
              size="sm"
              variant="outline"
              data-ask={access.email}
              data-ok="1"
              disabled={!!$view.pending[access.email]}
              onclick={() => {
                void session.mutate("approve", access.email, request || http);
              }}>{vb.t("liberar")}</Button
            >
          </div>
          <IconButton
            icon="close"
            data-ask={access.email}
            data-ok=""
            label={vb.t("Recusar {email}", { email: access.email })}
            disabled={!!$view.pending[access.email]}
            onclick={(event) =>
              confirm(access.email, "deny", event.currentTarget)}
          />
        </div>{/each}
    </div>{/if}
  <Heading level={3} class="tw:text-sm tw:leading-5"
    >{vb.t("Pessoas e agents")}</Heading
  >
  {@render sandboxes?.()}
  <div class="tw:space-y-3">
    {#each model.online as email (email)}{@render member(email)}{/each}
  </div>
  {#if model.offline.length}<details
      bind:open={offlineOpen}
      class="tw:space-y-3"
    >
      <summary
        onclick={() => onfoldchange?.("off", !offlineOpen)}
        class="tw:cursor-pointer tw:rounded-control tw:p-1 tw:text-xs tw:text-muted-foreground tw:focus-visible:outline-2 tw:focus-visible:outline-ring"
        >{vb.t("{n} offline", { n: model.offline.length })}</summary
      >
      <div class="tw:space-y-3">
        {#each model.offline as email (email)}{@render member(email)}{/each}
      </div>
    </details>{/if}
  {#if model.friends.length}<details
      bind:open={friendsOpen}
      class="tw:space-y-2"
    >
      <summary
        onclick={() => onfoldchange?.("friends", !friendsOpen)}
        class="tw:cursor-pointer tw:rounded-control tw:p-1 tw:text-xs tw:text-muted-foreground tw:focus-visible:outline-2 tw:focus-visible:outline-ring"
        >{vb.t("Seus amigos")} · {model.friends.length}</summary
      >
      {#each model.friends as email (email)}<Button
          variant="ghost"
          class="tw:h-auto tw:w-full tw:justify-start tw:whitespace-normal tw:text-left"
          data-add={email}
          disabled={!!$view.pending[email]}
          onclick={() => invite(email)}
          ><Avatar name={vb.name(email)} src={avatarUrl(email)} /><span
            class="tw:min-w-0 tw:break-all">{vb.name(email)}</span
          ><span aria-hidden="true">+</span></Button
        >{/each}
    </details>{/if}
  <form
    id="invite"
    class="tw:space-y-2"
    onsubmit={(event) => {
      event.preventDefault();
      invite($view.draft);
    }}
  >
    <Label for={`${ids}-email`}>{vb.t("convidar por email")}</Label>
    <div class="tw:flex tw:items-center tw:gap-2">
      <Input
        id={`${ids}-email`}
        type="email"
        required
        list={`${ids}-friends`}
        autocomplete="off"
        value={$view.draft}
        oninput={(event) => session.edit(event.currentTarget.value)}
      /><Button
        type="submit"
        size="sm"
        disabled={!!$view.pending[normalizeEmail($view.draft)]}
        >{vb.t("Convidar")}</Button
      >
    </div>
    <datalist id={`${ids}-friends`}
      >{#each model.friends as email}<option value={email}
        ></option>{/each}</datalist
    >
  </form>
  {#each Object.entries($view.pending) as [email]}<p
      role="status"
      class="tw:m-0 tw:break-words tw:text-xs tw:text-muted-foreground"
    >
      {email} · {vb.t("Aguardando confirmação…")}
    </p>{/each}
  {#each Object.entries($view.issues) as [email, issue]}<p
      role="alert"
      class="tw:m-0 tw:whitespace-pre-wrap tw:break-words tw:text-xs tw:text-destructive"
    >
      {email} · {issueText(issue)}
    </p>{/each}
  {#each Object.entries($view.notices) as [email, action]}{#if action === "invite" || action === "resend"}<p
        role="status"
        class="tw:m-0 tw:break-words tw:text-xs tw:text-muted-foreground"
      >
        {email} · {vb.t("enviado")} ✓
      </p>{/if}{/each}
  {#if $view.clipboard}<p
      role={$view.clipboard.status === "failed" ? "alert" : "status"}
      class="tw:m-0 tw:break-words tw:text-xs tw:text-muted-foreground"
    >
      {$view.clipboard.status === "failed"
        ? vb.t(
            'Não consegui copiar. Use "copiar" ao lado de {email} em Pessoas.',
            { email: $view.clipboard.email },
          )
        : vb.t(
            "Copiei a mensagem com o link da sala e o setup do agent para {name}: cola no WhatsApp.",
            { name: vb.name($view.clipboard.email) },
          )}
    </p>{/if}
</section>
<AlertDialog
  bind:open={dialogOpen}
  title={deletion?.action === "deny"
    ? vb.t("Recusar o pedido de {email}?", { email: deletion.email })
    : room.pending?.includes(deletion?.email || "")
      ? vb.t("Cancelar o convite de {email}?", { email: deletion?.email || "" })
      : vb.t("Remover {email} deste vibebook?", {
          email: deletion?.email || "",
        })}
  description={deletion?.email}
  confirmLabel={deletion?.action === "deny"
    ? vb.t("Recusar")
    : vb.t("Remover do vibebook")}
  cancelLabel={vb.t("Cancelar")}
  busy={!!(deletion && $view.pending[deletion.email])}
  error={deletion && $view.issues[deletion.email]
    ? issueText($view.issues[deletion.email])
    : ""}
  onconfirm={() => {
    void remove();
  }}
  returnFocus={() => (trigger?.isConnected ? trigger : root)}
/>
