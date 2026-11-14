<script lang="ts">
  import type { Room, Message } from "../../../shared/room";
  import type { ChatActions, ChatBridge } from "../../chatTypes";
  import { cardView, choicesOf, permissionAsk } from "./model";
  import CardView from "./CardView.svelte";
  import ChoicesView from "./ChoicesView.svelte";
  import PermissionAsk from "./PermissionAsk.svelte";
  import PollView from "./PollView.svelte";
  let {
    message,
    room,
    actions,
    vb,
  }: { message: Message; room: Room; actions: ChatActions; vb: ChatBridge } =
    $props();
  const rawCard = $derived(message.card),
    rawChoices = $derived(message.choices),
    roomId = $derived(room.id);
  const card = $derived(cardView(rawCard, roomId));
  const choices = $derived(choicesOf(rawChoices));
  const poll = $derived(message.poll ? room.polls?.[message.poll] : undefined);
</script>

{#key `${room.id}:${room.me}:${message.id}:${message.thread}`}
  {#if rawCard && rawCard.length > 1_000_000}<pre
      data-native-card-fallback
      class="tw:max-w-full tw:overflow-auto tw:whitespace-pre-wrap tw:break-words tw:font-mono tw:text-xs">{rawCard}</pre>{:else if card}<CardView
      {card}
      {message}
      {room}
      {actions}
      {vb}
    />{/if}
  {#if choices}{#if permissionAsk(message)}<PermissionAsk
        {choices}
        {message}
        {room}
        {actions}
        {vb}
      />{:else}<ChoicesView
        {choices}
        {message}
        {room}
        {actions}
        {vb}
      />{/if}{/if}
  {#if poll}<PollView {poll} {message} {room} {actions} {vb} />{/if}
{/key}
