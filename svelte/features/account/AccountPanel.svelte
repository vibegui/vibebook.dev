<script lang="ts">
  import { onDestroy, untrack } from "svelte";
  import type { Snippet } from "svelte";
  import Dialog from "../../lib/ui/Dialog.svelte";
  import AlertDialog from "../../lib/ui/AlertDialog.svelte";
  import Button from "../../lib/ui/Button.svelte";
  import Input from "../../lib/ui/Input.svelte";
  import Label from "../../lib/ui/Label.svelte";
  import Heading from "../../lib/ui/Heading.svelte";
  import Avatar from "../../lib/ui/Avatar.svelte";
  import Checkbox from "../../lib/ui/Checkbox.svelte";
  import type { AccountSession, AccountBinding } from "./session";
  import type { DeviceLock } from "./device";
  import { avatarImage } from "./image";
  import Snapshot from "../../lib/ui/Snapshot.svelte";
  let {
    owner,
    device,
    lang,
    theme,
    onTheme,
    onLanguage,
    onArchive,
    onLogout,
    notifications,
    agentSettings,
  }: {
    owner: AccountSession;
    device: DeviceLock;
    lang: string;
    theme: "auto" | "light" | "dark";
    onTheme(): void;
    onLanguage(lang: "pt" | "en"): void;
    onArchive(): void;
    onLogout(all: boolean): void;
    notifications: Snippet;
    agentSettings: Snippet;
  } = $props();
  const view = untrack(() => owner.state),
    lock = untrack(() => device.state),
    en = $derived(lang === "en");
  let active = true;
  onDestroy(() => {
    active = false;
    owner.close();
    device.cancel();
  });
  const live = (event: Event, binding: AccountBinding) =>
    active &&
    owner.owns(binding) &&
    draftAccount === binding.account &&
    event.currentTarget instanceof HTMLElement &&
    event.currentTarget.isConnected;
  const busy = $derived(
    $view.phase === "pending" ||
      $view.phase === "confirming" ||
      $view.phase === "unconfirmed",
  );
  let name = $state(""),
    email = $state(""),
    draftAccount = $state(""),
    lastName = $state(""),
    wasOpen = $state(false),
    photo: HTMLInputElement | undefined = $state(),
    nameInput: HTMLInputElement | null = $state(null),
    friendInput: HTMLInputElement | null = $state(null);
  let remove = $state.raw<{
      email: string;
      name: string;
      binding: AccountBinding;
    } | null>(null),
    logoutAll = $state.raw<{ account: string; binding: AccountBinding } | null>(
      null,
    );
  $effect(() => {
    const me = $view.me;
    if (me?.email !== draftAccount) {
      draftAccount = me?.email ?? "";
      name = lastName = me?.name ?? "";
      email = "";
      remove = null;
      logoutAll = null;
    } else if (me && me.name !== lastName) {
      if (name === lastName) name = me.name ?? "";
      lastName = me.name ?? "";
    }
    if (!$view.open) {
      remove = null;
      logoutAll = null;
      if (wasOpen) device.cancel();
    }
    wasOpen = $view.open;
  });
  const loginRows = $derived(
    [
      {
        method: "email",
        label: en ? "Email code" : "Código por email",
        show: true,
      },
      {
        method: "google",
        label: "Google",
        show:
          $view.logins?.providers.google ||
          $view.logins?.logins.some((row) => row.method === "google"),
      },
      {
        method: "github",
        label: "GitHub",
        show:
          $view.logins?.providers.github ||
          $view.logins?.logins.some((row) => row.method === "github"),
      },
      {
        method: "invite",
        label: en ? "Invite link" : "Link de convite",
        show: $view.logins?.logins.some((row) => row.method === "invite"),
      },
    ].filter((row) => row.show),
  );
</script>

{#if $view.binding}{#key $view.binding}<Snapshot value={$view.binding}
      >{#snippet children(rendered: AccountBinding)}
        <Dialog
          open={$view.open}
          title={en ? "Your account" : "Sua conta"}
          closeLabel={en ? "Close" : "Fechar"}
          sheet
          onOpenChange={(open) => {
            if (
              !open &&
              $view.presentation !== "inline" &&
              owner.owns(rendered)
            )
              owner.close();
          }}
          returnFocus={owner.returnFocus}
          initialFocus={() =>
            $view.section === "friends"
              ? (friendInput ?? null)
              : $view.section === "profile"
                ? (nameInput ?? null)
                : null}
        >
          {#if $view.me}<div data-native-account class="tw:space-y-6">
              <div class="tw:flex tw:items-center tw:gap-3">
                <Avatar
                  name={$view.me.name || $view.me.email}
                  src={$view.me.avatar
                    ? `/api/avatar/${encodeURIComponent($view.me.email)}?v=${$view.me.avatar}`
                    : undefined}
                  class="tw:size-12"
                />
                <div class="tw:min-w-0 tw:break-words">
                  <p class="tw:font-medium">
                    {$view.me.name || $view.me.email}
                  </p>
                  <p class="tw:text-sm tw:text-muted-foreground">
                    {$view.me.email}
                  </p>
                </div>
              </div>
              <form
                class="tw:space-y-2"
                onsubmit={(event) => {
                  event.preventDefault();
                  if (live(event, rendered) && !busy) owner.rename(name);
                }}
              >
                <Label for="account-name">{en ? "Your name" : "Seu nome"}</Label
                ><Input
                  id="account-name"
                  bind:ref={nameInput}
                  value={name}
                  oninput={(event) => {
                    if (live(event, rendered)) name = event.currentTarget.value;
                  }}
                  required
                  maxlength={60}
                  autocomplete="given-name"
                  disabled={busy}
                /><Button type="submit" disabled={busy}
                  >{en ? "Save name" : "Salvar nome"}</Button
                >
              </form>
              <div>
                <Button
                  disabled={busy}
                  onclick={(event) => {
                    if (live(event, rendered)) photo?.click();
                  }}>{en ? "Add photo" : "Adicionar foto"}</Button
                ><input
                  bind:this={photo}
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  aria-label={en ? "Profile photo" : "Foto do perfil"}
                  class="tw:sr-only"
                  onchange={(event) => {
                    const file = event.currentTarget.files?.[0];
                    if (live(event, rendered) && file && !busy)
                      owner.photo((current) => avatarImage(file, current));
                    event.currentTarget.value = "";
                  }}
                />
              </div>
              {#if $view.phase === "pending" || $view.phase === "confirming"}<p
                  role="status"
                  class="tw:text-sm tw:text-muted-foreground"
                >
                  {en ? "Waiting for confirmation…" : "Esperando confirmação…"}
                </p>{/if}
              {#if $view.phase === "error"}<p
                  role="alert"
                  class="tw:text-sm tw:text-destructive"
                >
                  {en
                    ? "Could not save this change. Check the details and try again."
                    : "Não deu para salvar esta mudança. Confira os dados e tente de novo."}
                </p>{/if}
              {#if $view.phase === "unconfirmed"}<div
                  role="alert"
                  class="tw:space-y-2 tw:text-sm"
                >
                  <p>
                    {en
                      ? "This change is unconfirmed. It may have been saved. Refresh before trying again."
                      : "Esta mudança não foi confirmada. Ela pode ter sido salva. Atualize antes de tentar de novo."}
                  </p>
                  <Button
                    variant="outline"
                    onclick={(event) => {
                      if (live(event, rendered)) owner.refresh();
                    }}>{en ? "Refresh" : "Atualizar"}</Button
                  ><Button
                    variant="outline"
                    onclick={(event) => {
                      if (live(event, rendered)) owner.review();
                    }}
                    >{en
                      ? "Review and try again"
                      : "Revisar e tentar de novo"}</Button
                  >
                </div>{/if}
              <section class="tw:space-y-2">
                <Heading level={2} class="tw:text-base"
                  >{en ? "How you sign in" : "Como você entra"}</Heading
                >
                {#if $view.loginsLoading}<p role="status">
                    {en ? "Loading…" : "Carregando…"}
                  </p>{:else if $view.loginsError}<p role="alert">
                    {en
                      ? "Could not load sign-in history."
                      : "Não deu para carregar o histórico de entrada."}
                  </p>
                  <Button
                    variant="outline"
                    onclick={(event) => {
                      if (live(event, rendered)) owner.logins();
                    }}>{en ? "Retry" : "Tentar de novo"}</Button
                  >{:else if $view.logins}<ul class="tw:space-y-2">
                    {#each loginRows as row}{@const used =
                        $view.logins.logins.find(
                          (item) => item.method === row.method,
                        )}
                      <li class="tw:flex tw:justify-between tw:gap-2">
                        <span>{row.label}</span><span
                          class="tw:text-xs tw:text-muted-foreground"
                          >{used
                            ? `${new Date(used.last).toLocaleDateString(lang)} · ${used.n}×`
                            : row.method === "email"
                              ? en
                                ? "always works"
                                : "sempre funciona"
                              : en
                                ? "not used yet"
                                : "ainda não usou"}</span
                        >
                      </li>{/each}
                  </ul>{/if}
                <p class="tw:text-xs tw:text-muted-foreground">
                  {en
                    ? "Google and GitHub use their email's account. A different email means a different account."
                    : "Google e GitHub entram na conta do email deles: se for outro email, vira outra conta."}
                </p>
              </section>
              <nav
                class="tw:flex tw:flex-wrap tw:items-center tw:gap-2"
                aria-label={en ? "Preferences" : "Preferências"}
              >
                <Button
                  variant="outline"
                  onclick={(event) => {
                    if (live(event, rendered)) onArchive();
                  }}>{en ? "Archive" : "Arquivo"}</Button
                ><Button
                  variant="outline"
                  onclick={(event) => {
                    if (live(event, rendered)) onTheme();
                  }}>{en ? `Theme: ${theme}` : `Tema: ${theme}`}</Button
                >{#each ["pt", "en"] as language}<Button
                    variant={lang === language ? "secondary" : "ghost"}
                    onclick={(event) => {
                      if (
                        live(event, rendered) &&
                        (language === "pt" || language === "en")
                      )
                        onLanguage(language);
                    }}>{language.toUpperCase()}</Button
                  >{/each}{@render notifications()}
              </nav>
              <div class="tw:space-y-2">
                <label class="tw:flex tw:items-center tw:gap-2"
                  ><Checkbox
                    checked={$lock.enabled}
                    disabled={!$lock.supported || $lock.busy}
                    onchange={(event) => {
                      const wanted = event.currentTarget.checked;
                      event.currentTarget.checked = $lock.enabled;
                      const account = $view.me?.email;
                      if (live(event, rendered) && account)
                        void device.configure(wanted, account, () =>
                          owner.owns(rendered),
                        );
                    }}
                  /><span
                    >{en
                      ? "Require Face ID when opening"
                      : "Exigir Face ID ao abrir"}</span
                  ></label
                >
                <p class="tw:text-xs tw:text-muted-foreground">
                  {en
                    ? "A local lock on this device; your login session stays the same."
                    : "Uma trava local neste aparelho; sua sessão continua a mesma."}
                </p>
                {#if !$lock.supported}<p
                    class="tw:text-xs tw:text-muted-foreground"
                  >
                    {en
                      ? "Unavailable in this browser."
                      : "Não disponível neste navegador."}
                  </p>{/if}{#if $lock.error}<p
                    role="alert"
                    class="tw:text-sm tw:text-destructive"
                  >
                    {en
                      ? "Device authentication was cancelled or failed. Try again."
                      : "A autenticação do aparelho foi cancelada ou falhou. Tente de novo."}
                  </p>{/if}
              </div>
              {@render agentSettings()}
              <section class="tw:space-y-3">
                <Heading level={2} class="tw:text-base"
                  >{en ? "Friends" : "Amigos"}</Heading
                >
                <ul class="tw:space-y-2">
                  {#each $view.me.friends as friend (friend.email)}<li
                      class="tw:flex tw:items-center tw:gap-2"
                    >
                      <Avatar
                        name={friend.name || friend.email}
                        src={friend.avatar
                          ? `/api/avatar/${encodeURIComponent(friend.email)}?v=${friend.avatar}`
                          : undefined}
                      />
                      <div class="tw:min-w-0 tw:flex-1 tw:break-words">
                        <p>{friend.name || friend.email}</p>
                        <small class="tw:text-muted-foreground"
                          >{friend.shared || ""}</small
                        >
                      </div>
                      <Button
                        variant="ghost"
                        disabled={busy}
                        onclick={(event) => {
                          if (live(event, rendered))
                            remove = {
                              email: friend.email,
                              name: friend.name || friend.email,
                              binding: rendered,
                            };
                        }}>{en ? "Remove" : "Remover"}</Button
                      >
                    </li>{/each}
                </ul>
                <form
                  class="tw:space-y-2"
                  onsubmit={(event) => {
                    event.preventDefault();
                    if (live(event, rendered) && !busy) owner.add(email);
                  }}
                >
                  <Label for="account-friend"
                    >{en ? "Friend's email" : "Email do amigo"}</Label
                  ><Input
                    id="account-friend"
                    bind:ref={friendInput}
                    type="email"
                    required
                    value={email}
                    oninput={(event) => {
                      if (live(event, rendered))
                        email = event.currentTarget.value;
                    }}
                    disabled={busy}
                  /><Button type="submit" disabled={busy}
                    >{en ? "Invite" : "Convidar"}</Button
                  >
                </form>
              </section>
              <div class="tw:flex tw:flex-wrap tw:gap-2">
                <Button
                  onclick={(event) => {
                    if (live(event, rendered)) onLogout(false);
                  }}>{en ? "Sign out" : "Sair"}</Button
                ><Button
                  variant="outline"
                  onclick={(event) => {
                    if (live(event, rendered) && $view.me)
                      logoutAll = {
                        account: $view.me.email,
                        binding: rendered,
                      };
                  }}
                  >{en
                    ? "Sign out on every device"
                    : "Sair de todos os aparelhos"}</Button
                >
              </div>
            </div>{/if}
        </Dialog>
        {#if remove && remove.binding === rendered}{#key remove}<Snapshot
              value={remove}
              >{#snippet children(intent)}
                <AlertDialog
                  open
                  title={en ? "Remove friend?" : "Remover amigo?"}
                  description={`${intent.name} · ${en ? "Shared vibebooks stay." : "Os vibebooks em comum continuam."}`}
                  confirmLabel={en ? "Remove" : "Remover"}
                  cancelLabel={en ? "Cancel" : "Cancelar"}
                  onOpenChange={(open) => {
                    if (!open && remove === intent) remove = null;
                  }}
                  onconfirm={() => {
                    if (
                      remove === intent &&
                      owner.owns(intent.binding) &&
                      !busy &&
                      $view.me?.friends.some(
                        (friend) => friend.email === intent.email,
                      )
                    ) {
                      owner.remove(intent.email);
                      remove = null;
                    }
                  }}
                />
              {/snippet}</Snapshot
            >{/key}{/if}
        {#if logoutAll && logoutAll.binding === rendered}{#key logoutAll}<Snapshot
              value={logoutAll}
              >{#snippet children(intent)}
                <AlertDialog
                  open
                  title={en
                    ? "Sign out on every device?"
                    : "Sair de todos os aparelhos?"}
                  description={en
                    ? "Every browser and phone will need to sign in again, including this one. Connected agents stay."
                    : "Todo navegador e celular vai pedir login de novo, este também. Seus agents conectados continuam."}
                  confirmLabel={en ? "Sign out" : "Sair"}
                  cancelLabel={en ? "Cancel" : "Cancelar"}
                  onOpenChange={(open) => {
                    if (!open && logoutAll === intent) logoutAll = null;
                  }}
                  onconfirm={() => {
                    if (
                      logoutAll === intent &&
                      owner.owns(intent.binding) &&
                      $view.me?.email === intent.account
                    ) {
                      logoutAll = null;
                      onLogout(true);
                    }
                  }}
                />
              {/snippet}</Snapshot
            >{/key}{/if}
      {/snippet}</Snapshot
    >{/key}{/if}
