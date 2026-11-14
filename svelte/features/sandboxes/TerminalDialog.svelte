<script lang="ts">
  import { untrack } from "svelte";
  import Dialog from "../../lib/ui/Dialog.svelte";
  import Button from "../../lib/ui/Button.svelte";
  import type { TerminalSession } from "./terminalSession";
  import { mountTerminalRenderer } from "./terminalRenderer";
  import { TERMINAL_KEYS, type TerminalKey } from "./terminalProtocol";
  import { sandboxText, type SandboxLocale } from "./copy";
  let { owner, lang = "pt" }: { owner: TerminalSession; lang?: SandboxLocale } =
    $props();
  const view = untrack(() => owner.state);
  const text = (key: Parameters<typeof sandboxText>[1]) =>
    sandboxText(lang, key);
  const phase = $derived(
    $view.phase === "loading"
      ? "terminalLoading"
      : $view.phase === "connecting"
        ? "terminalConnecting"
        : $view.phase === "connected"
          ? "terminalConnected"
          : $view.phase === "exited"
            ? "terminalExited"
            : $view.phase === "error"
              ? "terminalFailed"
              : "terminalDisconnected",
  );
  let focusTarget: HTMLElement | null = null;
  const keys = Object.keys(TERMINAL_KEYS) as TerminalKey[];
  function mount(node: HTMLElement, ticket: number) {
    focusTarget = node;
    let focusAllowed = true;
    const document = node.ownerDocument;
    const intent = (event: Event) => {
      if (event instanceof KeyboardEvent && event.key !== "Tab") return;
      if (!(event.target instanceof Node) || !node.contains(event.target))
        focusAllowed = false;
    };
    document.addEventListener("pointerdown", intent, true);
    document.addEventListener("keydown", intent, true);
    void owner.mount(
      (callbacks, signal) => mountTerminalRenderer(node, callbacks, signal),
      ticket,
      () => {
        const dialog = node.closest('[role="dialog"]');
        return (
          focusAllowed &&
          !!dialog &&
          !!document.activeElement &&
          dialog.contains(document.activeElement)
        );
      },
    );
    return {
      destroy() {
        document.removeEventListener("pointerdown", intent, true);
        document.removeEventListener("keydown", intent, true);
        if (focusTarget === node) focusTarget = null;
        if (owner.current(ticket)) owner.close(ticket);
      },
    };
  }
</script>

{#key $view.generation}
  {@const ticket = $view.generation}
  <Dialog
    open={$view.open}
    title={`${text("terminal")} · ${$view.name}`}
    description={text("terminalHelp")}
    closeLabel={text("close")}
    fullScreen
    initialFocus={() =>
      owner.current(ticket)
        ? (focusTarget?.querySelector<HTMLTextAreaElement>("textarea") ??
          focusTarget)
        : null}
    onOpenChange={(open) => {
      if (!open) owner.close(ticket);
    }}
    returnFocus={() => owner.returnFocus(ticket)}
  >
    <p role="status" class="tw:m-0 tw:text-sm tw:text-muted-foreground">
      {text(phase)}
    </p>
    <div
      tabindex="-1"
      data-native-terminal-renderer
      data-terminal-phase={$view.phase}
      data-terminal-font={$view.semantic?.fontFamily}
      data-terminal-font-size={$view.semantic?.fontSize}
      data-terminal-background={$view.semantic?.theme.background}
      data-terminal-foreground={$view.semantic?.theme.foreground}
      data-terminal-selection={$view.semantic?.theme.selectionBackground}
      use:mount={ticket}
      class="tw:min-h-64 tw:flex-1 tw:overflow-hidden tw:bg-background tw:font-mono tw:text-sm tw:text-foreground tw:selection:bg-primary/30"
    ></div>
    <div class="tw:flex tw:flex-wrap tw:gap-2">
      {#each keys as key}<Button
          variant="outline"
          size="sm"
          disabled={$view.phase !== "connected"}
          onpointerdown={(event) => {
            event.preventDefault();
            if (event.currentTarget.isConnected && owner.current(ticket))
              owner.key(key, ticket);
          }}
          onclick={(event) => {
            if (
              event.detail === 0 &&
              event.currentTarget.isConnected &&
              owner.current(ticket)
            )
              owner.key(key, ticket);
          }}>{key}</Button
        >{/each}
    </div>
  </Dialog>
{/key}
