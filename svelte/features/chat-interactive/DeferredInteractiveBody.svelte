<script lang="ts">
  import type { Room, Message } from "../../../shared/room";
  import type { ChatActions, ChatBridge } from "../../chatTypes";
  import InteractivePresentation from "./InteractivePresentation.svelte";
  import { interactiveIdentity } from "./deferred";
  import type InteractiveBody from "./InteractiveBody.svelte";
  let {
    room,
    message,
    actions,
    vb,
    load = () =>
      import("./InteractiveBody.svelte").then((module) => module.default),
  }: {
    room: Room;
    message: Message;
    actions: ChatActions;
    vb: ChatBridge;
    /** Public component transport; private message data never enters a module cache. */
    load?: () => Promise<typeof InteractiveBody>;
  } = $props();
</script>

{#key interactiveIdentity(room, message)}
  <InteractivePresentation {room} {message} {actions} {vb} {load} />
{/key}
