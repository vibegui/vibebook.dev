<script lang="ts">
  import { onMount, onDestroy, untrack } from "svelte";
  import { get } from "svelte/store";
  import type { McpUiHostContext } from "@modelcontextprotocol/ext-apps/app-bridge";
  import type { AppsProps } from "./types";
  import { AppsFailure } from "./api";
  import { appIdentity, roomApps, signinUrl } from "./model";
  import type { NativeAppBridge } from "./bridge";
  import { createAppConsent, type AppQuestion } from "./consent";
  import { createAppRequests } from "./requests";
  import { appDocumentAction } from "./documentAction";
  import {
    createRoomAppTools,
    roomRead,
    roomTools,
    toolOutput,
    toolError,
  } from "./tools";
  import Button from "../../lib/ui/Button.svelte";
  import Snapshot from "../../lib/ui/Snapshot.svelte";
  import { appDocumentFrameName } from "../../../shared/appDocumentProtocol";
  const frameName = appDocumentFrameName();
  let { props }: { props: AppsProps } = $props();
  const view = untrack(() => props.owner.state),
    requests = createAppRequests();
  let frame: HTMLIFrameElement | undefined = $state(),
    bridge: NativeAppBridge | null = null,
    protocol: typeof import("./bridge") | null = null,
    active = true,
    error = $state(""),
    loading = $state(true),
    signinNeeded = $state(false);
  const selected = untrack(() => get(props.owner.state).target),
    initialKey = untrack(() =>
      selected
        ? appIdentity(
            props.room,
            get(props.owner.state).connections || [],
            selected,
          )
        : null,
    ),
    revision = untrack(() => get(props.owner.state).frameRevision);
  const room = () => get(props.owner.state).room;
  const current = () =>
    active &&
    props.current() &&
    props.owner.current() &&
    !!frame?.isConnected &&
    get(props.owner.state).frameRevision === revision &&
    !!selected &&
    get(props.owner.state).target?.connection === selected.connection &&
    get(props.owner.state).target?.tool === selected.tool &&
    !!room() &&
    appIdentity(
      room() || props.room,
      get(props.owner.state).connections || [],
      selected,
    ) === initialKey;
  const documentCurrent = () => current() && !!bridge?.active();
  const consent = createAppConsent(documentCurrent),
    question = consent.question;
  const ask = consent.ask;
  function choose(intent: AppQuestion, answer: boolean) {
    consent.choose(intent, answer);
  }
  const connected = (event: Event) =>
    current() &&
    event.currentTarget instanceof HTMLElement &&
    event.currentTarget.isConnected;
  function context(): McpUiHostContext {
    const rect = frame?.getBoundingClientRect(),
      dark =
        document.documentElement.dataset.theme === "dark" ||
        (document.documentElement.dataset.theme !== "light" &&
          matchMedia("(prefers-color-scheme: dark)").matches);
    return {
      theme: dark ? "dark" : "light",
      displayMode: "fullscreen",
      availableDisplayModes: ["fullscreen"],
      containerDimensions: {
        height: Math.round(rect?.height || 0),
        width: Math.round(rect?.width || 0),
      },
      locale: props.lang === "en" ? "en-US" : "pt-BR",
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      platform: matchMedia("(max-width: 900px)").matches ? "mobile" : "web",
      user: { email: props.room.me, name: props.name(props.room.me) },
      room: { id: props.room.id, title: props.room.book.title },
    };
  }
  const callRemote = async (
    cid: string,
    name: string,
    args: unknown,
    documentRequest = true,
  ) => {
    if (!current()) throw Error("App is no longer active");
    const operation = () =>
      requests
        .run((signal) => props.api.call(cid, name, args, signal))
        .catch((error: unknown) => {
          if (error instanceof AppsFailure && error.accessDenied)
            props.owner.revoke();
          if (current() && error instanceof AppsFailure && error.signIn) {
            signinNeeded = true;
            props.owner.load();
          }
          throw error;
        });
    const result = documentRequest
      ? await appDocumentAction(current, () => bridge, operation)
      : { ok: true as const, value: await operation() };
    if (!result.ok || !current() || (documentRequest && !documentCurrent()))
      throw Error("App is no longer active");
    if (!protocol) throw Error("App bridge unavailable");
    return protocol.remoteToolResult(result.value.result);
  };
  const membershipError = (error: unknown): never => {
    if (error instanceof AppsFailure && error.accessDenied)
      props.owner.revoke();
    throw error;
  };
  const tools = createRoomAppTools({
    room: () => (documentCurrent() ? room() : null),
    current: documentCurrent,
    request: async (command) => {
      const result = await appDocumentAction(
        current,
        () => bridge,
        () => props.request(command),
      );
      return result.ok ? result.value : { ok: false, error: "disconnected" };
    },
    name: (email) => props.name(email),
    ask,
    connections: async () => {
      const result = await requests
        .run((signal) => props.api.list(signal))
        .catch(membershipError);
      return current() ? result.connections : [];
    },
    call: callRemote,
    metric: (kind, roomOnly) =>
      props.metric(kind, roomOnly).catch((error: unknown) => {
        if (error instanceof AppsFailure && error.sessionDenied)
          props.owner.revoke();
        throw error;
      }),
    t: (text, vars) => props.t(text, vars),
  });
  async function start() {
    if (!frame || !selected || !initialKey) return;
    const isRoom = selected.connection === "room";
    try {
      const loaded = await requests.run(() => import("./bridge"));
      if (!current()) return;
      protocol = loaded;
      const app = isRoom
        ? roomApps(props.room).find((app) => app.tool === selected.tool)
        : null;
      const ui = isRoom
        ? null
        : await requests.run((signal) =>
            props.api.ui(selected.connection, selected.tool, signal),
          );
      if (!current()) return;
      const tool = protocol.appToolInfo(ui?.tool, {
        name: selected.tool,
        title: app?.title || selected.tool,
        inputSchema: { type: "object" },
      });
      const first = isRoom
        ? Promise.resolve(
            toolOutput(roomRead(room() || props.room, {}, props.name)),
          )
        : callRemote(selected.connection, selected.tool, {}, false).catch(
            (error) =>
              toolError(error instanceof Error ? error.message : "Tool failed"),
          );
      bridge = protocol.createNativeAppBridge({
        frame,
        current,
        revoked: () => {
          if (!current()) return;
          requests.dispose();
          consent.cancel();
          loading = false;
          error =
            props.lang === "en"
              ? "This app was closed. Reopen it to continue."
              : "O app foi fechado. Abra de novo para continuar.";
        },
        context: () => ({ ...context(), toolInfo: { tool } }),
        tools: isRoom ? roomTools : [],
        call: isRoom
          ? tools
          : (name, args) => callRemote(selected.connection, name, args),
        message: (text) =>
          tools("vibebook_post", { text, thread: props.thread }),
        ask,
        open: (url) => {
          if (current()) props.openLink(url);
        },
        first,
        contextText: isRoom
          ? undefined
          : async (text) => {
              await appDocumentAction(
                current,
                () => bridge,
                () =>
                  requests
                    .run((signal) =>
                      props.api.context(
                        selected.connection,
                        selected.tool,
                        text,
                        signal,
                      ),
                    )
                    .catch(membershipError),
              );
            },
        t: (text, vars) => props.t(text, vars),
      });
      await bridge.ready;
      if (!current()) return;
      if (isRoom && app)
        bridge.loadFile(
          `/api/books/${encodeURIComponent(props.room.id)}/files/${encodeURIComponent(app.file.id)}`,
        );
      else if (ui) bridge.loadHtml(ui.html);
      loading = false;
    } catch (failure) {
      if (failure instanceof AppsFailure && failure.accessDenied)
        props.owner.revoke();
      if (current()) {
        if (failure instanceof AppsFailure && failure.signIn)
          signinNeeded = true;
        loading = false;
        error =
          failure instanceof Error ? failure.message : "App failed to load";
      }
    }
  }
  onMount(() => {
    void start();
    const observer = new ResizeObserver(() => bridge?.update());
    if (frame) observer.observe(frame);
    return () => observer.disconnect();
  });
  $effect(() => {
    props.room;
    props.lang;
    bridge?.update();
  });
  onDestroy(() => {
    active = false;
    requests.dispose();
    bridge?.dispose();
    consent.dispose();
  });
</script>

<div
  data-native-app-frame
  class="tw:flex tw:min-h-0 tw:flex-1 tw:flex-col tw:gap-2"
>
  {#if loading}<p
      role="status"
      class="tw:p-3 tw:text-sm tw:text-muted-foreground"
    >
      {props.t("Carregando…")}
    </p>{/if}
  {#if error}<div
      role="alert"
      class="tw:space-y-2 tw:p-3 tw:text-sm tw:text-destructive"
    >
      <p>{error}</p>
      <Button
        variant="outline"
        onclick={(event) => {
          if (connected(event)) props.owner.reload();
        }}>{props.t("Tentar de novo")}</Button
      >
    </div>{/if}
  {#if $question}{#key $question}<Snapshot value={$question}>
        {#snippet children(intent)}
          <section
            aria-label={props.t("Permissão do app")}
            class="tw:space-y-2 tw:rounded-control tw:border tw:border-border tw:bg-card tw:p-3"
            aria-live="polite"
          >
            <p class="tw:text-sm">
              {props.t("Este app quer {what}, como você:", {
                what: intent.what,
              })}
            </p>
            <blockquote
              class="tw:m-0 tw:max-h-32 tw:overflow-auto tw:whitespace-pre-wrap tw:break-words tw:font-mono tw:text-xs"
            >
              {intent.detail}
            </blockquote>
            <div class="tw:flex tw:gap-2">
              <Button
                variant="outline"
                onclick={(event) => {
                  if (connected(event)) choose(intent, false);
                }}>{props.t("Cancelar")}</Button
              ><Button
                onclick={(event) => {
                  if (connected(event)) choose(intent, true);
                }}>{props.t("Permitir")}</Button
              >
            </div>
          </section>{/snippet}</Snapshot
      >{/key}{/if}
  {#if signinNeeded && selected && selected.connection !== "room"}<p
      role="alert"
      class="tw:text-sm"
    >
      <a
        href={signinUrl(props.room.id, selected.connection)}
        onclick={(event) => {
          if (!connected(event)) event.preventDefault();
        }}
        class="tw:text-link tw:underline tw:focus-visible:outline-2 tw:focus-visible:outline-ring"
        >{props.t("Entrar")}</a
      >
    </p>{/if}
  <iframe
    bind:this={frame}
    name={frameName}
    sandbox="allow-scripts allow-forms"
    title={selected?.tool || "App"}
    class="tw:min-h-80 tw:w-full tw:flex-1 tw:border-0 tw:bg-background"
    hidden={!!error}
  ></iframe>
</div>
