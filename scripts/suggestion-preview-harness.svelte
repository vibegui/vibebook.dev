<script lang="ts">
  import type { Readable } from "svelte/store";
  import SuggestionPreview from "../svelte/features/room-sidebar/SuggestionPreview.svelte";
  import type { SuggestionPreviewProps } from "../svelte/features/room-sidebar/types";
  let { values }: { values: Readable<SuggestionPreviewProps> } = $props();
</script>

<SuggestionPreview {...$values} />
