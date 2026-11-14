<script lang="ts">
  import { untrack } from "svelte";
  import Button from "../../lib/ui/Button.svelte";
  import type { RoomAgentSession } from "./room";
  import { agentPresence } from "./model";
  import { runnerPath } from "./runner";
  import { roomAgentText } from "./roomCopy";
  let {
    owner,
    onopen,
    lang = "pt",
  }: { owner: RoomAgentSession; onopen(): void; lang?: "pt" | "en" } = $props();
  const view = untrack(() => owner.state),
    runner = untrack(() => owner.runner.state);
  const presence = $derived(
    agentPresence($view.data, owner.account, $view.now),
  );
  const path = $derived(runnerPath($runner.where));
  const text = (key: Parameters<typeof roomAgentText>[1]) =>
    roomAgentText(lang, key);
</script>

{#if $view.data}<Button
    data-native-agent-trigger
    variant="outline"
    aria-pressed={presence.on}
    onclick={() => {
      if (owner.current()) onopen();
    }}
    title={path
      ? `${path} (${text($runner.where?.how === "used" ? "usedFolder" : $runner.where?.how === "linked" ? "bound" : $runner.where?.how === "slug" ? "slug" : $runner.where?.how === "new" ? "newFolder" : "folder")})`
      : text("localHelp")}
    ><span
      aria-hidden="true"
      class={presence.live
        ? "tw:text-success"
        : presence.on
          ? "tw:text-warning"
          : "tw:text-muted-foreground"}>✻</span
    ><span
      >{text(
        presence.on ? (presence.live ? "listening" : "notListening") : "turnOn",
      )}</span
    >{#if path}<span
        class="tw:max-w-40 tw:truncate tw:text-xs tw:text-muted-foreground"
        >{path.replace(/^~\/Projects\//, "")}{#if $runner.where?.how === "new"}
          +{/if}</span
      >{/if}</Button
  >{/if}
