<script lang="ts">
  import { untrack } from "svelte";
  import Button from "../../lib/ui/Button.svelte";
  import Dialog from "../../lib/ui/Dialog.svelte";
  import SetupInstructions from "./SetupInstructions.svelte";
  import type { RoomAgentSession } from "./room";
  import { agentPresence, pendingAsk, askPreview } from "./model";
  import { roomAgentText } from "./roomCopy";
  let {
    owner,
    origin,
    name,
    onopen,
    onnavigate,
    lang = "pt",
  }: {
    owner: RoomAgentSession;
    origin: string;
    name(email: string): string;
    onopen(): void;
    onnavigate(id: number, thread: string): void;
    lang?: "pt" | "en";
  } = $props();
  const view = untrack(() => owner.state);
  const text = (key: Parameters<typeof roomAgentText>[1]) =>
    roomAgentText(lang, key);
  let step = $state(0),
    connect = $state(false);
  const presence = $derived(
    agentPresence($view.data, owner.account, $view.now),
  );
  const ask = $derived(pendingAsk($view.waits, owner.roomId, $view.thread));
  const start = $derived(
    $view.room?.book.owner === owner.account &&
      !$view.room.epics.length &&
      $view.thread === "main" &&
      !$view.startDismissed,
  );
  const nudge = $derived($view.hasAgent === false && !$view.setupDismissed);
  const offer = $derived(
    $view.data &&
      !nudge &&
      $view.hasAgent !== false &&
      !presence.around &&
      (!$view.offerDismissed || !!$view.askedAt),
  );
  const late = $derived($view.now - $view.askedAt > 180_000);
  $effect(() => {
    void $view.room;
    void $view.data;
    if (!owner.current()) connect = false;
  });
  function open() {
    if (owner.current()) onopen();
  }
  function navigate() {
    const current = pendingAsk($view.waits, owner.roomId, $view.thread);
    if (owner.current() && current && /^a\d+$/.test(current.ref)) {
      const id = Number(current.ref.slice(1));
      if (Number.isSafeInteger(id)) onnavigate(id, current.thread || "main");
    }
  }
</script>

<div
  data-vb-native
  data-native-agent-banners
  class="tw:space-y-3 tw:font-sans tw:text-sm tw:text-foreground"
>
  {#if nudge}<div
      class="tw:relative tw:rounded-surface tw:border tw:border-border tw:p-3 tw:pr-12"
    >
      <SetupInstructions
        {origin}
        roomId={owner.roomId}
        {lang}
        waiting
        current={owner.current}
      /><Button
        variant="ghost"
        size="sm"
        class="tw:absolute tw:right-1 tw:top-1"
        aria-label={text("close")}
        onclick={() => owner.dismissBanner("setup")}>×</Button
      >
    </div>{/if}
  {#if $view.setupFeedback || $view.listeningFeedback}<p
      role="status"
      class="tw:m-0 tw:rounded-surface tw:border tw:border-border tw:p-3 tw:text-success"
    >
      ✻ {text($view.setupFeedback ? "setupDone" : "listeningDone")}
    </p>{/if}
  {#if start && $view.room}<div
      class="tw:flex tw:items-start tw:gap-3 tw:rounded-surface tw:border tw:border-border tw:p-3"
    >
      <span aria-hidden="true">✻</span>
      <div class="tw:min-w-0 tw:flex-1">
        <strong>{text("starting")}</strong>
        <ul class="tw:m-0 tw:list-none tw:space-y-1 tw:p-0">
          <li>✓ {text("roomCreated")}</li>
          <li>
            {$view.room.members.length > 1
              ? `✓ ${text("members")}: ${$view.room.members
                  .filter((member) => member !== owner.account)
                  .map(name)
                  .join(", ")}`
              : `○ ${text("alone")}`}
          </li>
          <li>
            {presence.around
              ? `✓ ${text("here")}`
              : $view.hasAgent === false
                ? `○ ${text("connectFirst")}`
                : presence.on
                  ? `✻ ${text("opening")}`
                  : `○ ${text("agentOff")}`}{#if $view.hasAgent !== false && !presence.on}<Button
                variant="link"
                size="sm"
                onclick={open}>{text("turnOn")}</Button
              >{/if}
          </li>
          <li>{presence.around ? "✻" : "○"} {text("docNext")}</li>
        </ul>
      </div>
      <Button
        variant="ghost"
        size="sm"
        aria-label={text("close")}
        onclick={() => owner.dismissBanner("start")}>×</Button
      >
    </div>
  {:else if offer}<div
      class="tw:flex tw:flex-wrap tw:items-start tw:gap-3 tw:rounded-surface tw:border tw:border-border tw:p-3"
    >
      <span aria-hidden="true">✻</span>
      <div class="tw:min-w-0 tw:flex-1">
        <strong
          >{text(presence.on ? (late ? "late" : "opening") : "absent")}</strong
        >
        <p class="tw:m-0 tw:text-xs tw:text-muted-foreground">
          {text(
            presence.on ? (late ? "lateHelp" : "openingHelp") : "absentHelp",
          )}
        </p>
      </div>
      {#if !presence.on}<Button size="sm" onclick={() => (connect = true)}
          >{text("connect")}</Button
        ><Button variant="outline" size="sm" onclick={open}
          >{text("turnOn")}</Button
        >{/if}<Button
        variant="ghost"
        size="sm"
        aria-label={text("close")}
        onclick={() => owner.dismissBanner("offer")}>×</Button
      >
    </div>{/if}
  {#if ask}<div
      class="tw:flex tw:items-center tw:gap-3 tw:rounded-surface tw:border tw:border-border tw:bg-muted tw:p-3"
    >
      <p class="tw:m-0 tw:min-w-0 tw:flex-1 tw:break-words">
        ⏸ <strong>{text("ask")}</strong> · {ask.topic || text("main")}: {askPreview(
          ask.text,
        )}
      </p>
      <Button size="sm" onclick={navigate}>{text("view")}</Button>
    </div>{/if}
</div>
<Dialog
  open={connect && owner.current()}
  title={text("connect")}
  closeLabel={text("close")}
  onOpenChange={(open) => (connect = open)}
  ><SetupInstructions
    {origin}
    roomId={owner.roomId}
    {lang}
    current={owner.current}
  /></Dialog
>
<Dialog
  open={$view.welcome && owner.current()}
  title={step === 0
    ? `${text("welcome")} ${$view.room?.book.title || text("main")}`
    : text(step === 1 ? "ownAgent" : step === 2 ? "context" : "connect")}
  closeLabel={text("close")}
  onOpenChange={(open) => {
    if (!open) owner.closeWelcome();
  }}
>
  <p class="tw:m-0 tw:text-muted-foreground">
    {step === 0
      ? `${name($view.room?.book.owner || "")} ${text("welcomeBody")}`
      : text(
          step === 1
            ? "ownAgentBody"
            : step === 2
              ? "contextBody"
              : "connectBody",
        )}
  </p>
  {#if step === 3 && $view.hasAgent !== true}<SetupInstructions
      {origin}
      roomId={owner.roomId}
      {lang}
      current={owner.current}
    />{/if}
  <div class="tw:flex tw:items-center tw:gap-2">
    <span
      aria-label={`${step + 1} / 4`}
      class="tw:flex-1 tw:text-xs tw:text-muted-foreground">{step + 1} / 4</span
    ><Button
      variant="ghost"
      onclick={() => {
        if (step) step--;
        else owner.closeWelcome();
      }}>{text(step ? "back" : "skip")}</Button
    ><Button
      onclick={() => {
        if (step === 3) owner.closeWelcome();
        else step++;
      }}>{text(step === 3 ? "enter" : "next")}</Button
    >
  </div>
</Dialog>
