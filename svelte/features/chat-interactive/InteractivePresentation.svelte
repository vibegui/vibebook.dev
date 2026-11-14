<script lang="ts">
  import { onDestroy, untrack } from "svelte";
  import type { Room, Message } from "../../../shared/room";
  import type { ChatActions, ChatBridge } from "../../chatTypes";
  import type InteractiveBody from "./InteractiveBody.svelte";
  import { createInteractivePresentation } from "./deferred";
  import DeferredViewStatus from "../deferred-view/DeferredViewStatus.svelte";
  let {
    room,
    message,
    actions,
    vb,
    load,
  }: {
    room: Room;
    message: Message;
    actions: ChatActions;
    vb: ChatBridge;
    load: () => Promise<typeof InteractiveBody>;
  } = $props();
  const owner = untrack(() =>
      createInteractivePresentation(() => ({ room, message }), load),
    ),
    view = owner.state;
  const Loaded = $derived($view.component);
  const authorized = $derived(owner.current());
  // Keep the same delegated action object across receipt refreshes. Existing
  // sessions still own ACK/canonical uncertainty; this fence is pre-dispatch only.
  const guarded: ChatActions = {
    ...untrack(() => actions),
    request: (command) =>
      owner.current()
        ? actions.request(command)
        : Promise.resolve({ ok: false, error: "stale target" }),
    draftReply: (draft) => {
      if (owner.current()) actions.draftReply(draft);
    },
    navigate: (id, thread) => {
      if (owner.current()) actions.navigate(id, thread);
    },
    navigateRich: (target) => {
      if (owner.current()) actions.navigateRich?.(target);
    },
    openApp: (target) => {
      if (owner.current()) actions.openApp?.(target);
    },
  };
  $effect(() => {
    if (authorized) void owner.ensure();
  });
  onDestroy(() => owner.dispose());
</script>

{#if authorized}
  <div
    data-native-interactive-state={$view.phase}
    aria-busy={$view.phase !== "ready"}
  >
    {#if Loaded}<Loaded {room} {message} actions={guarded} {vb} />{:else}
      <DeferredViewStatus
        phase={$view.phase}
        lang={vb.locale?.startsWith("en") ? "en" : "pt"}
        label={vb.locale?.startsWith("en")
          ? "Interactive message"
          : "Mensagem interativa"}
        retry={() => {
          void owner.retry();
        }}
        current={owner.current}
      />
    {/if}
  </div>
{/if}
