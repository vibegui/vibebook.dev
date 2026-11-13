<script lang="ts">
  import { onDestroy, untrack } from "svelte";
  import type {
    DocumentSession,
    OrphanedDocumentDraft,
    RecoveryToken,
  } from "./session";
  import type { DocumentProps } from "./types";
  import DocumentPreview from "./DocumentPreview.svelte";
  import Button from "../../lib/ui/Button.svelte";
  import Textarea from "../../lib/ui/Textarea.svelte";
  let { owner, props }: { owner: DocumentSession; props: DocumentProps } =
    $props();
  const view = untrack(() => owner.state);
  let active = true,
    copyNotice = $state("");
  onDestroy(() => (active = false));
  async function copyOrphan(snapshot: OrphanedDocumentDraft) {
    if (!active || !owner.ownsOrphan(snapshot)) return;
    const key = JSON.stringify(owner.target());
    try {
      if (!navigator.clipboard) throw Error("Unavailable");
      await navigator.clipboard.writeText(snapshot.text);
      if (
        active &&
        owner.ownsOrphan(snapshot) &&
        JSON.stringify(owner.target()) === key
      )
        copyNotice = en ? "Copied" : "Copiado";
    } catch {
      if (
        active &&
        owner.ownsOrphan(snapshot) &&
        JSON.stringify(owner.target()) === key
      )
        copyNotice = en
          ? "Clipboard unavailable. Select the retained text to copy it."
          : "Área de transferência indisponível. Selecione o texto guardado para copiar.";
    }
  }
  const recoveryToken = $derived.by(() => {
    $view.recovery;
    $view.target;
    return owner.recoveryToken();
  });
  function recoveryFrom(event: Event): RecoveryToken | null {
    const element = event.currentTarget;
    if (!(element instanceof HTMLElement)) return null;
    const key = element.dataset.documentRecoveryKey,
      revision = Number(element.dataset.documentRecoveryRevision);
    return key && Number.isSafeInteger(revision) ? { key, revision } : null;
  }
  async function copyRecovery(event: Event) {
    if (!connected(event) || !active) return;
    const token = recoveryFrom(event),
      text = owner.recoveryText(token);
    if (text === null) return;
    try {
      if (!navigator.clipboard) throw Error("Unavailable");
      await navigator.clipboard.writeText(text);
      if (active && owner.recoveryText(token) === text)
        copyNotice = en ? "Copied" : "Copiado";
    } catch {
      if (active && owner.recoveryText(token) === text)
        copyNotice = en
          ? "Clipboard unavailable. Select the retained text to copy it."
          : "Área de transferência indisponível. Selecione o texto guardado para copiar.";
    }
  }
  const en = $derived(props.lang === "en");
  const epic = $derived(
    props.room.epics.find((epic) => epic.id === props.thread),
  );
  $effect(() => {
    JSON.stringify($view.target);
    copyNotice = "";
  });
  const editable = $derived(
    !$view.denied && props.room.members.includes(props.room.me),
  );
  const connected = (event: Event) =>
    event.currentTarget instanceof HTMLElement &&
    event.currentTarget.isConnected;
  function editor(node: HTMLElement) {
    const detach = owner.attach(node);
    return { destroy: detach };
  }
</script>

<section
  data-native-document
  data-vb-native
  hidden={props.pane !== "doc"}
  class="tw:min-h-0 tw:min-w-0 tw:flex-1 tw:flex-col tw:bg-background tw:font-sans tw:text-foreground tw:[&:not([hidden])]:flex"
>
  {#if epic}<nav
      aria-label={en ? "Document scope" : "Escopo do documento"}
      class="tw:flex tw:flex-wrap tw:items-center tw:gap-1 tw:border-b tw:border-border tw:px-3 tw:py-2"
    >
      <Button
        size="sm"
        variant={$view.target?.epicId ? "ghost" : "secondary"}
        aria-pressed={!$view.target?.epicId}
        onclick={(event) => {
          if (connected(event)) owner.chooseRoom(true);
        }}>{props.room.book.title || "vibebook"}</Button
      ><span aria-hidden="true">›</span><Button
        size="sm"
        variant={$view.target?.epicId ? "secondary" : "ghost"}
        aria-pressed={!!$view.target?.epicId}
        onclick={(event) => {
          if (connected(event)) owner.chooseRoom(false);
        }}>{epic.title}</Button
      >
    </nav>{/if}
  {#if $view.orphaned.length}<aside
      role="status"
      class="tw:space-y-2 tw:border-b tw:border-border tw:bg-muted tw:p-3"
    >
      <p class="tw:m-0 tw:text-sm">
        {en
          ? "Retained edits belong to epics that no longer exist. They will never be sent to another document."
          : "Edições guardadas pertencem a épicos que não existem mais. Elas nunca serão enviadas para outro documento."}
      </p>
      {#each $view.orphaned as draft (draft.epicId)}<details>
          <summary class="tw:cursor-pointer tw:text-sm">{draft.epicId}</summary>
          <pre
            class="tw:max-h-64 tw:overflow-auto tw:whitespace-pre-wrap tw:font-mono tw:text-xs">{draft.text}</pre>
          <div class="tw:flex tw:gap-2">
            <Button
              variant="outline"
              size="sm"
              onclick={(event) => {
                if (connected(event) && active) void copyOrphan(draft);
              }}>{en ? "Copy retained text" : "Copiar texto guardado"}</Button
            ><Button
              variant="outline"
              size="sm"
              onclick={(event) => {
                if (connected(event) && active) owner.discardOrphan(draft);
              }}>{en ? "Discard" : "Descartar"}</Button
            >
          </div>
        </details>{/each}{#if copyNotice}<p
          aria-live="polite"
          class="tw:m-0 tw:text-xs"
        >
          {copyNotice}
        </p>{/if}
    </aside>{/if}
  {#if $view.readPending}<p
      role="status"
      class="tw:m-0 tw:p-3 tw:text-sm tw:text-muted-foreground"
    >
      {en ? "Loading document…" : "Carregando documento…"}
    </p>{/if}
  {#if $view.fallbackUnconfirmed}<p
      role="alert"
      class="tw:m-0 tw:p-3 tw:text-sm tw:text-destructive"
    >
      {en
        ? "The last edit was not confirmed. Your text is retained; review it before retrying live editing."
        : "A última edição não foi confirmada. Seu texto está guardado; revise antes de tentar a edição ao vivo."}
    </p>{/if}
  {#if $view.recovery !== null}<aside
      role="status"
      class="tw:space-y-2 tw:border-b tw:border-border tw:bg-muted tw:p-3"
    >
      <p class="tw:m-0 tw:text-sm">
        {en
          ? "An earlier local edit was not confirmed. Review it before replacing the current document."
          : "Uma edição local anterior não foi confirmada. Revise antes de substituir o documento atual."}
      </p>
      <details>
        <summary class="tw:cursor-pointer tw:text-sm"
          >{en ? "Review retained text" : "Revisar texto guardado"}</summary
        >
        <pre
          class="tw:max-h-64 tw:overflow-auto tw:whitespace-pre-wrap tw:font-mono tw:text-xs">{$view.recovery}</pre>
      </details>
      <div class="tw:flex tw:gap-2">
        <Button
          data-document-recovery-key={recoveryToken?.key}
          data-document-recovery-revision={recoveryToken?.revision}
          size="sm"
          disabled={$view.mode !== "edit" ||
            !editable ||
            !(
              $view.status === "fallback" ||
              ($view.status === "connected" && $view.synced)
            )}
          onclick={(event) => {
            if (connected(event)) owner.restore(recoveryFrom(event));
          }}>{en ? "Use retained text" : "Usar texto guardado"}</Button
        ><Button
          variant="outline"
          size="sm"
          data-document-recovery-key={recoveryToken?.key}
          data-document-recovery-revision={recoveryToken?.revision}
          onclick={(event) => {
            if (connected(event)) owner.dismissRecovery(recoveryFrom(event));
          }}>{en ? "Discard retained text" : "Descartar texto guardado"}</Button
        >
        <Button
          size="sm"
          variant="outline"
          data-document-recovery-key={recoveryToken?.key}
          data-document-recovery-revision={recoveryToken?.revision}
          onclick={(event) => {
            void copyRecovery(event);
          }}>{en ? "Copy retained text" : "Copiar texto guardado"}</Button
        >
      </div>
      {#if copyNotice}<p role="status" class="tw:m-0 tw:text-xs">
          {copyNotice}
        </p>{/if}
    </aside>{/if}
  {#if $view.denied}<p
      role="alert"
      class="tw:m-0 tw:p-3 tw:text-sm tw:text-destructive"
    >
      {$view.checkingAccess
        ? en
          ? "Checking document access…"
          : "Verificando acesso ao documento…"
        : en
          ? "Document access must be checked again. Only your retained local text is available."
          : "O acesso ao documento precisa ser verificado novamente. Apenas seu texto local guardado está disponível."}<Button
        variant="outline"
        size="sm"
        onclick={(event) => {
          if (connected(event) && active) props.onAuthorize();
        }}>{en ? "Check access again" : "Verificar acesso novamente"}</Button
      >
    </p>{/if}
  {#if !$view.denied}<div
      hidden={$view.mode !== "preview"}
      class="tw:min-h-0 tw:flex-1 tw:flex-col tw:[&:not([hidden])]:flex"
    >
      {#key JSON.stringify( [props.room.me, props.room.id, $view.target?.epicId] )}<DocumentPreview
          {owner}
          text={$view.text}
          epic={$view.target?.epicId ?? null}
          {props}
        />{/key}
    </div>{/if}
  <div
    hidden={$view.denied ||
      $view.mode !== "edit" ||
      $view.status === "fallback"}
    use:editor
    data-document-editor
    class="tw:min-h-0 tw:flex-1 tw:overflow-auto tw:[&:not([hidden])]:flex tw:[&_.cm-editor]:min-w-0 tw:[&_.cm-editor]:flex-1 tw:[&_.cm-editor]:bg-transparent tw:[&_.cm-scroller]:overflow-auto tw:[&_.cm-scroller]:p-4 tw:[&_.cm-scroller]:font-mono tw:[&_.cm-scroller]:text-base tw:[&_.cm-scroller]:leading-6 tw:[&_.cm-content]:caret-foreground tw:[&_.cm-cursor]:border-l-2 tw:[&_.cm-cursor]:border-foreground tw:[&_.cm-dropCursor]:border-foreground tw:[&_.cm-selectionBackground]:bg-accent! tw:[&_.cm-ySelectionInfo]:rounded-sm tw:[&_.cm-ySelectionInfo]:px-1 tw:[&_.cm-ySelectionInfo]:font-sans! tw:[&_.cm-ySelectionInfo]:text-xs! tw:[&_.cm-ySelectionInfo]:font-medium! tw:[&_.cm-ySelectionInfo]:leading-4!"
  ></div>
  {#if !$view.denied}{#if $view.mode === "edit" && $view.status === "fallback"}<div
        class="tw:flex tw:min-h-0 tw:flex-1 tw:flex-col tw:p-3"
      >
        <p role="status" class="tw:my-2 tw:text-sm tw:text-muted-foreground">
          {en
            ? "Live editing could not start. Plain-text changes use the room connection and may conflict with other edits."
            : "A edição ao vivo não iniciou. Alterações em texto simples usam a conexão da sala e podem conflitar com outras edições."}
        </p>
        <Textarea
          aria-label={en ? "Document editor" : "Editor do documento"}
          value={$view.text}
          disabled={!editable}
          class="tw:min-h-64 tw:flex-1 tw:resize-none tw:font-mono! tw:text-base! tw:leading-6! tw:p-4! tw:border! tw:border-input! tw:rounded-control! tw:bg-studio-input-background!"
          oninput={(event) => {
            if (connected(event)) owner.input(event.currentTarget.value);
          }}
        /><Button
          variant="outline"
          size="sm"
          onclick={(event) => {
            if (connected(event)) owner.retry();
          }}>{en ? "Retry live editing" : "Tentar edição ao vivo"}</Button
        >
      </div>{/if}
    {#if $view.mode === "edit"}<p
        role="status"
        aria-live="polite"
        class="tw:m-0 tw:border-t tw:border-border tw:px-3 tw:py-2 tw:text-xs tw:text-muted-foreground"
      >
        {$view.fallbackPending
          ? en
            ? "Changes sent or queued locally; confirmation is pending."
            : "Alterações enviadas ou guardadas localmente; confirmação pendente."
          : $view.status === "connected" && $view.synced
            ? en
              ? "Live connection synchronized. Server persistence is asynchronous."
              : "Conexão ao vivo sincronizada. A gravação no servidor é assíncrona."
            : $view.status === "fallback"
              ? en
                ? "Plain-text fallback"
                : "Edição em texto simples"
              : en
                ? "Connecting or reconnecting; keep this page open for local edits."
                : "Conectando; mantenha a página aberta para suas edições locais."}
      </p>{/if}
    {#if $view.error && $view.status !== "fallback"}<p
        role="alert"
        class="tw:m-0 tw:p-3 tw:text-sm tw:text-destructive"
      >
        {en
          ? "Document request could not be confirmed."
          : "Não foi possível confirmar o pedido do documento."}<Button
          variant="outline"
          size="sm"
          onclick={(event) => {
            if (connected(event)) owner.retry();
          }}>{en ? "Try again" : "Tentar novamente"}</Button
        >
      </p>{/if}
    <footer class="tw:flex tw:justify-end tw:border-t tw:border-border tw:p-2">
      <Button
        disabled={!editable}
        variant={$view.mode === "edit" ? "primary" : "outline"}
        aria-pressed={$view.mode === "edit"}
        onclick={(event) => {
          if (connected(event))
            owner.mode($view.mode === "edit" ? "preview" : "edit");
        }}
        >{$view.mode === "edit"
          ? en
            ? "Done"
            : "Pronto"
          : en
            ? "Edit"
            : "Editar"}</Button
      >
    </footer>
  {/if}
</section>
