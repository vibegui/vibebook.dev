<script lang="ts">
  import { untrack } from "svelte";
  import type { Connection } from "../../../shared/schemas";
  import type { AppsProps } from "./types";
  import {
    roomApps,
    connectionApps,
    appIdentity,
    signinUrl,
    type AppTarget,
  } from "./model";
  import AppFrame from "./AppFrame.svelte";
  import Button from "../../lib/ui/Button.svelte";
  import Heading from "../../lib/ui/Heading.svelte";
  import Input from "../../lib/ui/Input.svelte";
  import Label from "../../lib/ui/Label.svelte";
  import RadioGroup from "../../lib/ui/RadioGroup.svelte";
  import AlertDialog from "../../lib/ui/AlertDialog.svelte";
  import Snapshot from "../../lib/ui/Snapshot.svelte";
  let { props }: { props: AppsProps } = $props();
  const owner = untrack(() => props.owner),
    view = untrack(() => owner.state),
    pinView = untrack(() => owner.pin.state),
    id = $props.id();
  let remove = $state.raw<Connection | null>(null);
  const current = () => props.current() && owner.current();
  const live = (event: Event) =>
    current() &&
    event.currentTarget instanceof HTMLElement &&
    event.currentTarget.isConnected;
  const busy = $derived($view.pending || $view.unconfirmed),
    apps = $derived(roomApps(props.room)),
    target = $derived($view.target),
    identity = $derived(
      target ? appIdentity(props.room, $view.connections || [], target) : null,
    );
  const connection = $derived(
    target?.connection === "room"
      ? null
      : $view.connections?.find(
          (connection) => connection.id === target?.connection,
        ),
  );
  const app = $derived(
    target?.connection === "room"
      ? apps.find((app) => app.tool === target.tool)
      : connection?.apps.find((app) => app.tool === target?.tool),
  );
  const pinRef = $derived(
    target
      ? target.connection === "room"
        ? target.tool
        : `${target.connection}/${target.tool}`
      : null,
  );
  const pin = $derived(
    props.room.pins?.find((pin) => pin.kind === "app" && pin.ref === pinRef),
  );
  const getConnection = (intent: Connection) =>
    $view.connections?.some(
      (item) =>
        item.id === intent.id && item.mine && item.owner === intent.owner,
    );
</script>

{#if $view.room}
  <section
    data-native-apps
    data-vb-native
    class="tw:flex tw:min-h-0 tw:flex-1 tw:flex-col tw:gap-3 tw:p-3 tw:font-sans tw:text-foreground"
  >
    {#if $pinView.phase === "pending" || $pinView.phase === "waiting"}<p
        role="status"
        class="tw:text-sm tw:text-muted-foreground"
      >
        {props.t("Esperando confirmação…")}
      </p>{/if}
    {#if $pinView.phase === "unconfirmed"}<div
        role="alert"
        class="tw:space-y-2 tw:text-sm"
      >
        <p>
          {props.t(
            "Ainda sem confirmação. Confira os itens fixados antes de tentar novamente.",
          )}
        </p>
        <Button
          variant="outline"
          onclick={(event) => {
            if (live(event)) owner.pin.review();
          }}>{props.t("Revisar e tentar de novo")}</Button
        >
      </div>{/if}
    {#if target}
      {#key $view.frameRevision}<Snapshot value={{ target, revision: $view.frameRevision }}>
        {#snippet children(rendered)}
      <div class="tw:flex tw:flex-wrap tw:items-center tw:gap-2">
        <Button
          variant="ghost"
          onclick={(event) => {
            if (live(event) && owner.ownsTarget(rendered.target, rendered.revision))
              owner.back();
          }}>← Apps</Button
        ><Heading
          level={2}
          class="tw:min-w-0 tw:flex-1 tw:break-words tw:text-base"
          >{app?.title || target.tool}</Heading
        ><span class="tw:rounded-control tw:bg-muted tw:px-2 tw:py-1 tw:text-xs"
          >{connection?.scope === "me"
            ? props.t("minha")
            : props.t("da sala")}</span
        ><Button
          variant="ghost"
          disabled={$pinView.phase !== "idle" || !identity}
          aria-pressed={!!pin}
          onclick={(event) => {
            if (live(event) && owner.ownsTarget(rendered.target, rendered.revision) && pinRef)
              owner.pin.toggle(pinRef, props.request);
          }}>{pin ? props.t("Desafixar") : props.t("Fixar na lateral")}</Button
        ><Button
          variant="ghost"
          onclick={(event) => {
            if (live(event) && owner.ownsTarget(rendered.target, rendered.revision))
              owner.reload();
          }}>{props.t("Recarregar")}</Button
        >
      </div>
        {/snippet}</Snapshot>{/key}
      {#if $view.error}<p
          role="alert"
          class="tw:break-words tw:text-sm tw:text-destructive"
        >
          {$view.error}
        </p>
        <Button
          variant="outline"
          onclick={(event) => {
            if (live(event)) {
              owner.load();
              owner.loadFiles(props.request, true);
            }
          }}>{props.t("Atualizar")}</Button
        >{/if}
      {#if identity && $view.connections !== null}{#key identity + ":" + $view.frameRevision}<AppFrame
            {props}
          />{/key}
      {:else if $view.loading || (!$view.error && ($view.connections === null || !props.room.filesAll))}<p
          role="status"
        >
          {props.t("Carregando…")}
        </p>
      {:else}<div class="tw:space-y-2">
          <p role="alert">
            {props.t(
              "Esse app não está nas conexões que você pode usar nesta sala.",
            )}
          </p>
          <Button
            onclick={(event) => {
              if (live(event)) owner.back();
            }}>← Apps</Button
          >
        </div>{/if}
    {:else}
      <div class="tw:flex tw:items-center tw:justify-between tw:gap-2">
        <Heading level={2} class="tw:text-lg">Apps</Heading
        >{#if !$view.form}<Button
            variant="outline"
            onclick={(event) => {
              if (live(event)) owner.form(true);
            }}>{props.t("Conectar MCP")}</Button
          >{/if}
      </div>
      {#if $view.form}<form
          class="tw:space-y-3 tw:rounded-control tw:border tw:border-border tw:p-3"
          onsubmit={(event) => {
            event.preventDefault();
            if (live(event) && !busy) owner.connect();
          }}
        >
          <Label for={id + "-url"}>{props.t("URL do servidor MCP")}</Label
          ><Input
            id={id + "-url"}
            value={$view.url}
            required
            placeholder="https://…/mcp"
            autocomplete="off"
            spellcheck={false}
            disabled={busy}
            oninput={(event) => {
              if (live(event))
                owner.draft(event.currentTarget.value, $view.scope);
            }}
          />
          <p class="tw:text-xs tw:text-muted-foreground">
            {props.t(
              "Sem token aqui: se o servidor pedir login, cada pessoa entra com a própria conta dela, e o vibebook só diz quem é e de qual sala.",
            )}
          </p>
          <RadioGroup
            value={$view.scope}
            label={props.t("Quem pode usar")}
            disabled={busy}
            items={[
              { value: "me", label: props.t("Só minha: só eu e meus agents") },
              {
                value: "room",
                label: props.t(
                  "Da sala: todo mundo vê; cada um entra com a própria conta",
                ),
              },
            ]}
            onValueChange={(value, event) => {
              if (live(event) && (value === "me" || value === "room"))
                owner.draft($view.url, value);
            }}
          />
          <div class="tw:flex tw:gap-2">
            <Button
              variant="outline"
              disabled={$view.pending}
              onclick={(event) => {
                if (live(event)) owner.form(false);
              }}>{props.t("Cancelar")}</Button
            ><Button type="submit" disabled={busy}
              >{$view.pending
                ? props.t("Conectando…")
                : props.t("Conectar")}</Button
            >
          </div>
        </form>{/if}
      {#if $view.loading}<p
          role="status"
          class="tw:text-sm tw:text-muted-foreground"
        >
          {props.t("Carregando…")}
        </p>{/if}
      {#if $view.error}<p
          role="alert"
          class="tw:break-words tw:text-sm tw:text-destructive"
        >
          {$view.error}
        </p>
        <Button
          variant="outline"
          onclick={(event) => {
            if (live(event)) {
              owner.load();
              owner.loadFiles(props.request, true);
            }
          }}>{props.t("Atualizar")}</Button
        >{/if}
      {#if $view.unconfirmed}<p role="alert" class="tw:text-sm">
          {props.t(
            "Mudança não confirmada. Ela pode ter sido salva. Confira antes de tentar de novo.",
          )}
        </p>
        <Button
          variant="outline"
          onclick={(event) => {
            if (live(event)) owner.review();
          }}>{props.t("Revisar e tentar de novo")}</Button
        >{/if}
      <section
        class="tw:space-y-2 tw:rounded-control tw:border tw:border-border tw:p-3"
      >
        <div class="tw:flex tw:items-center tw:gap-2">
          <Heading level={3} class="tw:text-base"
            >{props.t("Esta sala")}</Heading
          ><span class="tw:text-xs tw:text-muted-foreground">apps/*.html</span>
        </div>
        {#if apps.length}<div class="tw:grid tw:gap-2">
            {#each apps as app (app.file.id)}<Button
                variant="outline"
                class="tw:h-auto tw:justify-start tw:whitespace-normal tw:text-left"
                onclick={(event) => {
                  if (live(event))
                    owner.open({ connection: "room", tool: app.tool });
                }}
                ><span
                  ><strong class="tw:block">{app.title}</strong><small
                    class="tw:block tw:text-muted-foreground"
                    >{props.name(app.file.author)} · {props.ago(
                      app.file.ts,
                    )}</small
                  ></span
                ></Button
              >{/each}
          </div>{:else}<p class="tw:text-xs tw:text-muted-foreground">
            {props.t(
              "Um app da sala é um arquivo HTML em apps/ que usa a sala pelo iframe: lê o doc, as tarefas e as mensagens, posta e mexe nas tarefas (com o seu OK). Peça pro seu agent: “faz um app apps/enquete.html pra esta sala”.",
            )}
          </p>{/if}
      </section>
      {#each $view.connections || [] as item (item.id)}{@const all =
          connectionApps(item)}{@const screens = all.filter(
          (app) => app.screen,
        )}{@const visible =
          screens.length && !$view.more.has(item.id) ? screens : all}
        <section
          class="tw:space-y-2 tw:rounded-control tw:border tw:border-border tw:p-3"
        >
          <div class="tw:flex tw:flex-wrap tw:items-center tw:gap-2">
            <Heading level={3} class="tw:text-base">{item.title}</Heading><span
              class="tw:rounded-control tw:bg-muted tw:px-2 tw:text-xs"
              >{item.scope === "me"
                ? props.t("minha")
                : props.t("da sala")}</span
            ><small class="tw:break-words tw:text-muted-foreground"
              >{item.host} · {props.name(item.owner)}</small
            ><Button
              variant="ghost"
              disabled={busy}
              onclick={(event) => {
                if (live(event)) owner.refresh(item.id);
              }}>{props.t("Atualizar")}</Button
            >{#if item.mine}<Button
                variant="ghost"
                disabled={busy}
                onclick={(event) => {
                  if (live(event)) remove = item;
                }}>{props.t("Remover conexão")}</Button
              >{/if}
          </div>
          {#if item.auth === "identity"}{#if item.signed_in}<p
                class="tw:text-sm"
              >
                {props.t("Você entrou em {host} com a sua conta.", {
                  host: item.host,
                })}
                <Button
                  variant="link"
                  disabled={busy}
                  onclick={(event) => {
                    if (live(event)) owner.signout(item.id);
                  }}>{props.t("Sair")}</Button
                >
              </p>{:else}<p class="tw:text-sm">
                {props.t(
                  "Entre em {host} com a sua conta pra usar. O vibebook não guarda token: só diz quem é você e de qual sala.",
                  { host: item.host },
                )}
              </p>
              <a
                class="tw:inline-flex tw:rounded-control tw:bg-primary tw:px-3 tw:py-2 tw:text-sm tw:text-primary-foreground tw:focus-visible:outline-2 tw:focus-visible:outline-ring"
                href={signinUrl(props.room.id, item.id)}
                onclick={(event) => {
                  if (!live(event)) event.preventDefault();
                }}>{props.t("Entrar em {host}", { host: item.host })}</a
              >{/if}{/if}
          {#if visible.length}<div class="tw:grid tw:gap-2">
              {#each visible as app (app.tool)}<Button
                  variant="outline"
                  class="tw:h-auto tw:justify-start tw:whitespace-normal tw:text-left"
                  onclick={(event) => {
                    if (live(event))
                      owner.open({ connection: item.id, tool: app.tool });
                  }}
                  ><span
                    ><strong class="tw:block">{app.title}</strong><small
                      class="tw:block tw:text-muted-foreground"
                      >{app.description}</small
                    ></span
                  ></Button
                >{/each}
            </div>{:else}<p class="tw:text-xs tw:text-muted-foreground">
              {props.t("{n} tools, nenhum app", { n: item.tools.length })}
            </p>{/if}
          {#if screens.length && screens.length < all.length}<Button
              variant="link"
              onclick={(event) => {
                if (live(event)) owner.more(item.id);
              }}
              >{$view.more.has(item.id)
                ? props.t("só as telas")
                : props.t("ver todas ({n})", { n: all.length })}</Button
            >{/if}
        </section>{/each}
    {/if}
  </section>
  {#if remove}{#key remove}<Snapshot value={remove}>
      {#snippet children(intent)}<AlertDialog
        open
        title={props.t("Remover conexão")}
        description={props.t(
          "Remover a conexão {name}? Os apps dela saem da sala.",
          { name: intent.title },
        )}
        confirmLabel={props.t("Remover")}
        cancelLabel={props.t("Cancelar")}
        onOpenChange={(open) => {
          if (!open && remove === intent) remove = null;
        }}
        confirmDisabled={busy}
        onconfirm={() => {
          if (current() && remove === intent && getConnection(intent)) {
            owner.remove(intent.id);
            remove = null;
          }
        }}
      />{/snippet}</Snapshot>{/key}{/if}
{:else if $view.denied}<section
    data-native-apps-denied
    data-vb-native
    class="tw:space-y-2 tw:p-3 tw:font-sans tw:text-foreground"
  >
    <p role="alert">{props.t("Você não tem acesso a esta sala.")}</p>
    <Button
      variant="outline"
      onclick={(event) => {
        if (event.currentTarget.isConnected && $view.denied)
          props.checkAccess();
      }}>{props.t("Verificar acesso novamente")}</Button
    >
  </section>
{/if}
