<script lang="ts">
  import { onDestroy, untrack } from "svelte";
  import type { PanelProps } from "../../panels";
  import type { DocumentProps } from "./types";
  import RichNodes from "../rich-text/RichNodes.svelte";
  import { createRichSession } from "../rich-text/session";
  import type { DocumentSession } from "./session";
  import type { RichActions, RichContext } from "../rich-text/types";
  import Tasks from "../../Tasks.svelte";
  import Mermaid from "./Mermaid.svelte";
  import { documentBlocks, mermaidSource } from "./preview";
  let {
    text,
    epic,
    props,
    owner,
  }: {
    text: string;
    epic: string | null;
    props: DocumentProps;
    owner: DocumentSession;
  } = $props();
  const idPrefix = $props.id();
  const binding = untrack(() => ({
    account: props.room.me,
    roomId: props.room.id,
    epicId: epic,
  }));
  let active = true;
  onDestroy(() => (active = false));
  const current = () => {
    const target = owner.target();
    return (
      active &&
      owner.authorized() &&
      target?.account === binding.account &&
      target.roomId === binding.roomId &&
      target.epicId === binding.epicId
    );
  };
  const actions: RichActions = {
    navigate: (id, thread) => {
      if (current()) props.actions.navigate(id, thread);
    },
    openFile: (file) => {
      if (current()) props.actions.openFile(file);
    },
    navigateRich: (target) => {
      if (current()) props.actions.navigateRich?.(target);
    },
    openFileReference: (file) => {
      if (current()) props.actions.openFileReference?.(file);
    },
  };
  const taskProps: PanelProps = $derived({
    ...props.taskProps,
    send: (command) => (current() ? props.taskProps.send(command) : false),
    request: (command) =>
      current()
        ? props.taskProps.request(command)
        : Promise.resolve({ ok: false, error: "disconnected" }),
  });
  const context: RichContext = $derived({
    room: props.room,
    pageUrl: location.href,
    idPrefix,
    policy: "document",
  });
  const session = createRichSession();
  onDestroy(() => session.dispose());
  const nodes = $derived(session.render(text, "markdown", context));
  const hasTasks = $derived(
    !!epic || (props.thread === "main" && !!props.room.roomTasks?.length),
  );
  const literal = $derived(nodes.length === 1 && nodes[0].kind === "text");
  const blocks = $derived(documentBlocks(nodes, hasTasks));
</script>

{#snippet taskSlot()}<section data-document-tasks class="tw:my-3">
    <Tasks {...taskProps} thread={epic ?? "main"} />
  </section>{/snippet}
<div
  data-document-preview
  data-vb-native
  class="tw:min-h-0 tw:min-w-0 tw:flex-1 tw:overflow-auto tw:p-4 tw:font-sans tw:text-foreground tw:break-words"
>
  {#if !epic && props.room.docNotes?.length}<aside
      aria-label={props.lang === "en"
        ? "Document review"
        : "Revisão do documento"}
      class="tw:mb-3 tw:space-y-1 tw:rounded-control tw:border tw:border-border tw:bg-muted tw:p-3 tw:text-sm tw:text-muted-foreground"
    >
      {#each props.room.docNotes as note}<p class="tw:m-0">{note}</p>{/each}
    </aside>{/if}
  {#if !text.trim()}<p class="tw:m-0 tw:text-muted-foreground">
      {props.lang === "en"
        ? "This document is empty. Choose Edit or ask your agent to summarize the decisions here."
        : "Documento vazio. Clique em Editar ou peça pro seu agent resumir as decisões aqui."}
    </p>{/if}
  {#if literal && text.trim()}<p
      role="status"
      class="tw:my-2 tw:text-xs tw:text-muted-foreground"
    >
      {props.lang === "en"
        ? "Preview shown as plain text. The full document remains available to read, copy and edit."
        : "Prévia em texto simples. O documento completo continua disponível para ler, copiar e editar."}
    </p>{/if}
  {#each blocks as block}
    {#if "tasks" in block}<section data-document-tasks class="tw:my-3">
        <Tasks {...taskProps} thread={epic ?? "main"} />
      </section>
    {:else}{@const diagram = mermaidSource(
        block.node,
      )}{#if diagram !== null}<Mermaid
          source={diagram}
          {context}
          {actions}
          lang={props.lang}
        />{:else}<div
          class={block.node.kind === "text"
            ? "tw:whitespace-pre-wrap tw:break-words"
            : "tw:min-w-0"}
        >
          <RichNodes nodes={[block.node]} actions={props.actions} {taskSlot} />
        </div>{/if}{/if}
  {/each}
</div>
