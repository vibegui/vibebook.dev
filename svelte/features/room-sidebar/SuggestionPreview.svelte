<script lang="ts">
  import { onDestroy, untrack } from "svelte";
  import type { Suggestion } from "../../../shared/room";
  import type { SuggestionPreviewProps } from "./types";
  import { suggestionIdentity } from "./model";
  import Button from "../../lib/ui/Button.svelte";
  import Heading from "../../lib/ui/Heading.svelte";
  import MutationStatus from "./MutationStatus.svelte";
  import Snapshot from "../../lib/ui/Snapshot.svelte";
  let { room, index, owner, vb }: SuggestionPreviewProps = $props();
  const status = untrack(() => owner.state);
  const suggestion = $derived(room.suggestions[index]);
  const busy = $derived(
    $status.phase === "pending" || $status.phase === "unconfirmed",
  );
  let active = true;
  function act(accept: boolean, shown: Suggestion) {
    if (!active || busy || !suggestion || !room.members.includes(room.me))
      return;
    const expected = suggestionIdentity(shown);
    if (suggestionIdentity(room.suggestions[index]!) !== expected) return;
    void owner.run({ t: "suggestion", i: index, accept, expected: shown });
  }
  onDestroy(() => {
    active = false;
  });
</script>

{#if suggestion}{#key suggestionIdentity(suggestion)}<Snapshot value={suggestion}>{#snippet children(shown)}
    <article
      data-vb-native
      data-native-suggestion
      class="tw:mx-auto tw:w-full tw:max-w-2xl tw:space-y-4 tw:p-6 tw:font-sans tw:text-sm tw:leading-6 tw:text-foreground"
    >
      <p class="tw:m-0 tw:text-xs tw:text-muted-foreground">
        ✦ {vb.t("O @vibe sugere um épico")}
      </p>
      <Heading level={3}>{suggestion.title}</Heading>
      <p class="tw:m-0">
        {suggestion.why ||
          vb.t(
            "Ele viu isso na conversa e acha que vale virar um épico, com as tarefas abaixo.",
          )}
      </p>
      {#if suggestion.tasks.length}<Heading level={4}
          >{vb.t("Tarefas propostas")}</Heading
        >
        <ul class="tw:m-0 tw:list-disc tw:space-y-1 tw:pl-5">
          {#each suggestion.tasks as task}<li>{task}</li>{/each}
        </ul>{/if}
      <div class="tw:flex tw:flex-wrap tw:gap-2">
        <Button
          disabled={busy}
          onclick={(event) => {
            if (event.currentTarget.isConnected) act(true, shown);
          }}>{vb.t("Pedir pro meu agent")}</Button
        ><Button
          variant="ghost"
          disabled={busy}
          onclick={(event) => {
            if (event.currentTarget.isConnected) act(false, shown);
          }}>{vb.t("Descartar")}</Button
        >
      </div>
      <p class="tw:m-0 tw:text-muted-foreground">
        {vb.t(
          "Vira um pedido seu na sala: seu agent confere se ainda faz sentido, ajusta o doc e as tarefas e cria o épico.",
        )}
      </p>
      <MutationStatus {owner} t={vb.t} />
    </article>{/snippet}</Snapshot>{/key}{/if}
