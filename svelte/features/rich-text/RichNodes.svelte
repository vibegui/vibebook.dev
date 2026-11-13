<script lang="ts">
  import { onDestroy } from "svelte";
  import type { RichActions, RichNode, SafeAttributes } from "./types";
  import { HTML_NS } from "./allowlist";
  import Icon from "../../lib/ui/Icon.svelte";
  let { nodes, actions }: { nodes: readonly RichNode[]; actions: RichActions } =
    $props();
  let active = true;
  onDestroy(() => {
    active = false;
  });
  const voidTags = new Set([
    "area",
    "br",
    "col",
    "hr",
    "source",
    "track",
    "wbr",
  ]);
  function elementClass(tag: string, namespace: string, attrs: SafeAttributes) {
    if (namespace !== HTML_NS) return tag === "svg" ? "tw:max-w-full" : "";
    if (/^h[1-6]$/.test(tag))
      return [
        "tw:my-3 tw:font-sans tw:font-semibold tw:tracking-normal tw:[font-variation-settings:normal] tw:[font-feature-settings:normal]",
        tag === "h1"
          ? "tw:text-xl tw:leading-7"
          : tag === "h2"
            ? "tw:text-lg tw:leading-6"
            : "tw:text-base tw:leading-6",
      ];
    if (tag === "p")
      return "tw:my-2 tw:font-sans tw:tracking-normal tw:leading-6";
    if (tag === "pre")
      return "tw:my-3 tw:max-w-full tw:overflow-x-auto tw:whitespace-pre tw:rounded-control tw:bg-muted tw:p-3 tw:font-mono tw:text-xs tw:leading-5";
    if (tag === "code" || tag === "kbd" || tag === "samp")
      return "tw:font-mono tw:text-xs";
    if (tag === "blockquote")
      return "tw:my-3 tw:border-l-2 tw:border-border tw:pl-3 tw:text-muted-foreground";
    if (tag === "ul") return "tw:my-2 tw:list-disc tw:space-y-1 tw:pl-5";
    if (tag === "ol") return "tw:my-2 tw:list-decimal tw:space-y-1 tw:pl-5";
    if (tag === "table")
      return "tw:my-3 tw:w-full tw:border-collapse tw:font-sans tw:text-sm";
    if (tag === "td" || tag === "th")
      return [
        "tw:border tw:border-border tw:px-3 tw:py-2 tw:align-top",
        attrs.align === "center"
          ? "tw:text-center"
          : attrs.align === "right"
            ? "tw:text-right"
            : "tw:text-left",
        tag === "th" ? "tw:font-semibold" : "",
      ];
    if (tag === "details")
      return "tw:my-2 tw:rounded-control tw:border tw:border-border tw:p-3";
    if (tag === "summary")
      return "tw:cursor-pointer tw:rounded-control tw:font-medium tw:focus-visible:outline-2 tw:focus-visible:outline-ring";
    if (tag === "hr") return "tw:my-4 tw:border-border";
    if (tag === "strong" || tag === "b") return "tw:font-semibold";
    if (tag === "small") return "tw:text-xs";
    if (tag === "audio" || tag === "video") return "tw:max-w-full";
    return "";
  }
  function open(
    event: MouseEvent | KeyboardEvent,
    node: Extract<RichNode, { kind: "link" }>,
  ) {
    if (!active) {
      event.preventDefault();
      return;
    }
    if (
      ("button" in event && event.button !== 0) ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    )
      return;
    const target = node.target;
    if (target.kind === "message") {
      event.preventDefault();
      event.stopPropagation();
      actions.navigate(target.id);
    } else if (target.kind === "thread" || target.kind === "document") {
      if (actions.navigateRich) {
        event.preventDefault();
        event.stopPropagation();
        actions.navigateRich({ kind: target.kind, id: target.id });
      }
    } else if (target.kind === "file") {
      if (target.attachment) {
        event.preventDefault();
        event.stopPropagation();
        actions.openFile(target.attachment);
      } else if (actions.openFileReference) {
        event.preventDefault();
        event.stopPropagation();
        actions.openFileReference(target.file);
      }
    }
  }
  const external = (node: Extract<RichNode, { kind: "link" }>) =>
    node.target.kind === "github" ||
    (node.target.kind === "url" && node.target.external);
</script>

{#snippet content(items: readonly RichNode[])}
  {#each items as node}
    {#if node.kind === "text"}{node.text}
    {:else if node.kind === "mention"}<span
        data-rich-mention={node.who}
        title={node.who === "ai" ? "@vibe" : node.who}
        class={node.mine
          ? "tw:rounded-sm tw:bg-primary/15 tw:px-1 tw:font-semibold tw:text-foreground"
          : "tw:rounded-sm tw:bg-primary/10 tw:px-1 tw:text-foreground"}
        >{node.text}</span
      >
    {:else if node.kind === "link"}
      {#if node.namespace !== HTML_NS}<svelte:element
          this={"a"}
          role="link"
          tabindex="0"
          onkeydown={(event: KeyboardEvent) => {
            if (event.key === "Enter") open(event, node);
          }}
          xmlns={node.namespace}
          href={node.target.href}
          title={node.title}
          target={external(node) ? "_blank" : undefined}
          rel={external(node) ? "noopener noreferrer nofollow ugc" : undefined}
          onclick={(event: MouseEvent) => open(event, node)}
          >{@render content(node.children)}</svelte:element
        >
      {:else}<a
          href={node.target.href}
          title={node.target.kind === "file"
            ? node.target.file.name
            : node.target.kind === "github"
              ? node.target.label || undefined
              : node.title}
          target={external(node) ? "_blank" : undefined}
          rel={external(node) ? "noopener noreferrer nofollow ugc" : undefined}
          onclick={(event) => open(event, node)}
          data-rich-link={node.target.kind}
          class={node.target.kind === "file" || node.target.kind === "github"
            ? "tw:inline-flex tw:max-w-full tw:items-center tw:gap-1 tw:rounded-full tw:border tw:border-border tw:bg-muted tw:px-2 tw:py-0.5 tw:align-middle tw:text-xs tw:font-medium tw:text-link tw:underline-offset-2 tw:hover:underline tw:focus-visible:outline-2 tw:focus-visible:outline-ring"
            : "tw:rounded-sm tw:text-link tw:underline-offset-2 tw:hover:underline tw:focus-visible:outline-2 tw:focus-visible:outline-ring"}
        >
          {#if node.target.kind === "github"}<svg
              aria-hidden="true"
              viewBox="0 0 16 16"
              fill="currentColor"
              class="tw:size-4 tw:shrink-0"
              ><path
                d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
              ></path></svg
            >{#if node.target.label}{node.target.label}{:else}{@render content(
                node.children,
              )}{/if}
          {:else if node.target.kind === "file"}<Icon name="file" /><span
              class="tw:min-w-0 tw:break-words">{node.target.file.name}</span
            >{#if node.target.version}<small class="tw:text-muted-foreground"
                >v{node.target.version}</small
              >{/if}
          {:else}{@render content(node.children)}{/if}
        </a>{/if}
    {:else if node.namespace === HTML_NS && voidTags.has(node.tag)}<svelte:element
        this={node.tag}
        xmlns={node.namespace}
        {...node.attrs}
        class={elementClass(node.tag, node.namespace, node.attrs)}
      />
    {:else}<svelte:element
        this={node.tag}
        xmlns={node.namespace}
        {...node.attrs}
        data-code-language={node.language}
        class={elementClass(node.tag, node.namespace, node.attrs)}
        >{#if node.task !== undefined}<span
            aria-hidden="true"
            class="tw:mr-1 tw:font-mono">{node.task ? "☑" : "☐"}</span
          >{/if}{@render content(node.children)}</svelte:element
      >{/if}
  {/each}
{/snippet}
{@render content(nodes)}
