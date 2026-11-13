<script lang="ts">
  import { untrack } from "svelte";
  import type { RoomMutations } from "./session";
  import Button from "../../lib/ui/Button.svelte";
  let { owner, t }: { owner: RoomMutations; t: (text: string) => string } =
    $props();
  const status = untrack(() => owner.state);
</script>

{#if $status.phase === "pending"}<p
    role="status"
    class="tw:m-0 tw:text-xs tw:text-muted-foreground"
  >
    {t("Aguardando confirmação…")}
  </p>{/if}
{#if $status.phase === "error"}<p
    role="alert"
    class="tw:m-0 tw:text-sm tw:text-destructive"
  >
    {t("Não deu pra enviar agora. Tente de novo.")}
    {$status.error}
  </p>{/if}
{#if $status.phase === "unconfirmed"}<div
    role="status"
    class="tw:space-y-2 tw:text-sm tw:text-muted-foreground"
  >
    <p class="tw:m-0">
      {t("Ainda sem confirmação. Confira a sala antes de enviar novamente.")}
    </p>
    <Button
      variant="outline"
      size="sm"
      onclick={(event) => {
        if (event.currentTarget.isConnected) owner.review();
      }}>{t("Conferi a sala")}</Button
    >
  </div>{/if}
