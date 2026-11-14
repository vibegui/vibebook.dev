<script lang="ts">
  import { untrack } from "svelte";
  import Heading from "../../lib/ui/Heading.svelte";
  import Button from "../../lib/ui/Button.svelte";
  import Checkbox from "../../lib/ui/Checkbox.svelte";
  import AgentPresenceRows from "../room-sidebar/AgentPresenceRows.svelte";
  import SetupInstructions from "./SetupInstructions.svelte";
  import SandboxPanel from "../sandboxes/SandboxPanel.svelte";
  import TerminalDialog from "../sandboxes/TerminalDialog.svelte";
  import type { RoomAgentSession } from "./room";
  import type { AgentFormatting } from "./types";
  import { agentPresence, agentQueue } from "./model";
  import { runnerPath } from "./runner";
  import { roomAgentText } from "./roomCopy";
  let {
    owner,
    origin,
    vb,
    name,
    onnavigate,
    lang = "pt",
  }: {
    owner: RoomAgentSession;
    origin: string;
    vb: AgentFormatting;
    name(email: string): string;
    onnavigate(id: number, thread: string): void;
    lang?: "pt" | "en";
  } = $props();
  const view = untrack(() => owner.state),
    runner = untrack(() => owner.runner.state);
  let shown = $state(4);
  const text = (key: Parameters<typeof roomAgentText>[1]) =>
    roomAgentText(lang, key);
  const presence = $derived(
    agentPresence($view.data, owner.account, $view.now),
  );
  const queue = $derived($view.room ? agentQueue($view.room, $view.now) : []);
  const path = $derived(runnerPath($runner.where));
  const busy = $derived(["pending", "unconfirmed"].includes($view.togglePhase));
  function navigate(id: number, thread: string) {
    if (
      owner.current() &&
      queue.some(
        (item) => item.message.id === id && item.message.thread === thread,
      )
    )
      onnavigate(id, thread);
  }
</script>

<section
  data-vb-native
  data-native-agents
  class="tw:space-y-5 tw:p-4 tw:font-sans tw:text-sm tw:text-foreground"
>
  <div class="tw:flex tw:items-center tw:gap-2">
    <Heading
      level={2}
      class="tw:m-0 tw:flex-1 tw:font-sans tw:text-lg tw:font-semibold tw:tracking-normal"
      >{text("title")}</Heading
    ><Button
      variant="ghost"
      size="sm"
      disabled={$view.loading}
      onclick={() => void owner.refresh(true)}>{text("retry")}</Button
    >
  </div>
  {#if $view.readError}<p role="alert" class="tw:text-destructive">
      {text("readFailed")}
    </p>{/if}
  <div
    class="tw:space-y-2 tw:rounded-surface tw:border tw:border-border tw:p-3"
  >
    <div class="tw:flex tw:items-center tw:gap-3">
      <span
        aria-hidden="true"
        class={presence.live
          ? "tw:text-success"
          : presence.on
            ? "tw:text-warning"
            : "tw:text-muted-foreground"}>✻</span
      >
      <div class="tw:min-w-0 tw:flex-1">
        <strong class="tw:block">{text("local")}</strong><small
          class="tw:block tw:break-words tw:text-muted-foreground"
          >{presence.on
            ? `${text("on")} · ${text(presence.live ? "listening" : presence.around ? "working" : "notListening")}`
            : text("off")}{#if path}
            · {path}{#if $runner.where?.how === "new"}
              ({text("newFolder")}){/if}{/if}</small
        >
      </div>
      {#if presence.on && $runner.available && $runner.rooms.includes(owner.roomId)}<Button
          variant="outline"
          size="sm"
          disabled={$runner.focusing}
          onclick={() => {
            if (owner.current()) void owner.runner.focus(owner.roomId);
          }}>{text("focus")}</Button
        >{/if}
      <Checkbox
        checked={presence.on}
        disabled={busy || !$view.data}
        aria-label={text(presence.on ? "turnOff" : "turnOn")}
        onchange={() => void owner.toggle()}
      />
    </div>
    <p class="tw:m-0 tw:text-xs tw:text-muted-foreground">
      {text("localHelp")}
    </p>
    {#if $runner.focusError}<p role="alert" class="tw:text-destructive">
        {text($runner.focusBlocked ? "focusBlocked" : "focusFailed")}
      </p>{/if}
    {#if $view.togglePhase === "pending"}<p role="status">
        {text("pending")}
      </p>{:else if $view.togglePhase === "error"}<p
        role="alert"
        class="tw:text-destructive"
      >
        {text("failed")}
      </p>{:else if $view.togglePhase === "unconfirmed"}<p role="status">
        {text("unconfirmed")}
      </p>
      <Button
        variant="outline"
        onclick={() => {
          owner.reviewToggle();
          void owner.refresh(true);
        }}>{text("reviewed")}</Button
      >{/if}
  </div>
  <SetupInstructions
    {origin}
    roomId={owner.roomId}
    {lang}
    waiting={false}
    current={owner.current}
  />
  <section class="tw:space-y-2" aria-label={text("queue")}>
    <Heading
      level={3}
      class="tw:m-0 tw:font-sans tw:text-base tw:font-semibold tw:tracking-normal"
      >{text("queue")} {queue.length || ""}</Heading
    >
    {#each queue.slice(0, shown) as item (item.message.id)}<div
        class="tw:flex tw:items-center tw:gap-2"
      >
        <Button
          variant="ghost"
          class="tw:h-auto tw:min-w-0 tw:flex-1 tw:justify-start tw:whitespace-normal tw:text-left"
          onclick={() => navigate(item.message.id, item.message.thread)}
          title={`${$view.room?.epics.find((epic) => epic.id === item.message.thread)?.title || text("main")} · ${vb.ago(item.message.ts)}`}
          ><span class="tw:min-w-0 tw:flex-1 tw:break-words"
            >{item.message.text.replace(/\s+/g, " ").slice(0, 120)}</span
          ><span class="tw:text-xs tw:text-muted-foreground"
            >{text(
              item.phase === "blocked"
                ? "blocked"
                : item.phase === "doing"
                  ? "doing"
                  : "queued",
            )}</span
          ></Button
        ><Button
          variant="ghost"
          size="sm"
          disabled={["pending", "unconfirmed"].includes($view.dismissPhase)}
          onclick={() => void owner.dismiss(item.message.id)}
          aria-label={text("dismiss")}>×</Button
        >
      </div>{:else}<p class="tw:text-muted-foreground">
        {text("queueEmpty")}
      </p>{/each}
    {#if queue.length > shown}<Button
        variant="ghost"
        size="sm"
        onclick={() => (shown += 20)}
        >{text("more")} ({queue.length - shown})</Button
      >{/if}{#if shown > 4}<Button
        variant="ghost"
        size="sm"
        onclick={() => (shown = 4)}>{text("less")}</Button
      >{/if}
    {#if $view.dismissPhase === "error"}<p
        role="alert"
        class="tw:text-destructive"
      >
        {text("failed")}
      </p>{:else if $view.dismissPhase === "pending"}<p role="status">
        {text("pending")}
      </p>{:else if $view.dismissPhase === "unconfirmed"}<p role="status">
        {text("unconfirmed")}
      </p>
      <Button variant="outline" onclick={() => owner.reviewDismiss()}
        >{text("reviewed")}</Button
      >{/if}
  </section>
  {#if presence.mine.length}<section aria-label={text("connected")}>
      <Heading
        level={3}
        class="tw:m-0 tw:font-sans tw:text-base tw:font-semibold tw:tracking-normal"
        >{text("connected")}</Heading
      ><AgentPresenceRows
        presence={{ agents: presence.mine, sandboxes: [] }}
        email={owner.account}
        t={vb.t}
        {name}
        ago={vb.ago}
        locale={lang === "en" ? "en-US" : "pt-BR"}
      />
    </section>{/if}
  <SandboxPanel
    owner={owner.sandboxes}
    credentials={owner.credentials}
    terminal={owner.terminal}
    {lang}
  />
</section>
<TerminalDialog owner={owner.terminal} {lang} />
