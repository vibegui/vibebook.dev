<script lang="ts">
  import { onDestroy, untrack } from "svelte";
  import type { FileViewer } from "./session";
  import type { RichActions } from "../rich-text/types";
  import RichContent from "../rich-text/RichContent.svelte";
  import Dialog from "../../lib/ui/Dialog.svelte";
  import Button from "../../lib/ui/Button.svelte";
  import Select from "../../lib/ui/Select.svelte";
  import { buttonVariants } from "../../lib/ui/button";
  import ViewerMedia from "./ViewerMedia.svelte";
  import { csvData, externalFileURL, fileURL } from "./model";
  import { viewerText } from "./copy";
  let {
    controller,
    lang = "pt",
    actions,
    iosStandalone = false,
  }: {
    controller: FileViewer;
    lang?: "pt" | "en";
    actions: RichActions;
    iosStandalone?: boolean;
  } = $props();
  const view = untrack(() => controller.state);
  const text = (key: Parameters<typeof viewerText>[1]) => viewerText(lang, key);
  let csvPage = $state(0);
  const csvText = $derived(
    $view.content?.kind === "csv" ? ($view.content.text ?? "") : null,
  );
  const csv = $derived(
    csvText === null ? { rows: [], truncated: false } : csvData(csvText),
  );
  const headers = $derived(
    Array.from(
      {
        length: csv.rows.reduce((count, row) => Math.max(count, row.length), 0),
      },
      (_, index) => csv.rows[0]?.[index] ?? "",
    ),
  );
  const rows = $derived(
    csv.rows.slice(csvPage * 19 + 1, (csvPage + 1) * 19 + 1),
  );
  $effect(() => {
    void $view.content?.operation;
    csvPage = 0;
  });
  const pinned = $derived(
    $view.room?.pins?.some(
      (pin) => pin.kind === "file" && pin.ref === $view.target?.id,
    ),
  );
  const ownedActions: RichActions = $derived.by(() => {
    const ticket = $view.content?.operation;
    const owned = () => ticket !== undefined && controller.current(ticket);
    const leave = (callback: () => void) => {
      if (!owned()) return;
      controller.closeUser();
      if (!controller.deferNavigation(callback)) callback();
    };
    return {
      navigate: (id, thread) => leave(() => actions.navigate(id, thread)),
      openFile: (file) => {
        if (owned()) actions.openFile(file);
      },
      navigateRich: (target) => leave(() => actions.navigateRich?.(target)),
      openFileReference: (file) => {
        if (owned()) actions.openFileReference?.(file);
      },
    };
  });
  onDestroy(() => controller.closeNavigation());
</script>

<Dialog
  open={$view.open}
  title={$view.name || "File"}
  closeLabel={text("close")}
  fullScreen
  returnFocus={() => controller.returnFocus()}
  onOpenChange={(open) => {
    if (!open) controller.closeUser();
  }}
>
  {#if $view.target}
    <div
      data-file-viewer
      data-file-id={$view.target.id}
      class="tw:flex tw:min-h-0 tw:flex-1 tw:flex-col tw:gap-4"
    >
      <div class="tw:flex tw:flex-wrap tw:items-center tw:gap-2">
        {#if $view.versions.length > 1}
          <label
            class="tw:flex tw:min-w-0 tw:flex-1 tw:items-center tw:gap-2 tw:text-sm"
            >{text("version")}
            <Select
              aria-label={text("version")}
              value={$view.target.id}
              items={$view.versions.map((file, index) => ({
                value: file.id,
                label: `v${$view.versions.length - index} · ${new Date(file.ts).toLocaleString(lang === "en" ? "en" : "pt-BR")}`,
              }))}
              onchange={(event) => {
                if (event.currentTarget.isConnected)
                  controller.select(event.currentTarget.value);
              }}
              class="tw:min-w-0"
            />
          </label>
        {/if}
        {#if $view.file}<Button
            variant="outline"
            disabled={$view.pinPending}
            onclick={(event) => {
              if (event.currentTarget.isConnected) controller.togglePin();
            }}>{pinned ? text("unpin") : text("pin")}</Button
          >{/if}
        <a
          class={buttonVariants({ variant: "outline" })}
          href={externalFileURL($view.target, location.origin, iosStandalone)}
          target="_blank"
          rel="noopener noreferrer">{text("external")}</a
        >
      </div>
      {#if $view.indexPending}<p
          role="status"
          class="tw:m-0 tw:text-sm tw:text-muted-foreground"
        >
          {text("history")}
        </p>{/if}
      {#if $view.indexError}<div
          class="tw:flex tw:flex-wrap tw:items-center tw:gap-2"
        >
          <p role="alert" class="tw:m-0 tw:text-sm tw:text-destructive">
            {text("historyError")}
          </p>
          <Button
            variant="outline"
            onclick={(event) => {
              if (event.currentTarget.isConnected) controller.retryIndex();
            }}>{text("retryHistory")}</Button
          >
        </div>{/if}
      {#if $view.pinError}<p
          role="alert"
          class="tw:m-0 tw:text-sm tw:text-destructive"
        >
          {text("pinError")}
        </p>{/if}
      {#if $view.phase === "loading"}<p
          role="status"
          class="tw:m-0 tw:text-muted-foreground"
        >
          {text("loading")}
        </p>{/if}
      {#if $view.phase === "error"}
        <p role="alert" class="tw:m-0 tw:text-destructive">
          {text(
            $view.error === "missing"
              ? "missing"
              : $view.error === "metadata-changed"
                ? "changed"
                : ["signed-out", "forbidden"].includes($view.error)
                  ? "denied"
                  : $view.error === "read-timeout"
                    ? "timeout"
                    : "unavailable",
          )}
        </p>
        {#if ["signed-out", "forbidden"].includes($view.error)}<a
            href={fileURL($view.target)}
            class={buttonVariants()}>{text("access")}</a
          >
        {:else if !["missing", "metadata-changed"].includes($view.error)}<Button
            variant="outline"
            onclick={(event) => {
              if (event.currentTarget.isConnected) controller.retry();
            }}>{text("retry")}</Button
          >{/if}
      {:else if $view.content}
        {#key $view.content.operation}
          {#if ["image", "audio", "html", "pdf"].includes($view.content.kind)}
            {@const operation = $view.content.operation}
            <ViewerMedia
              content={$view.content}
              name={$view.name}
              onready={() => controller.ready(operation)}
              onerror={() => controller.mediaError(operation)}
              onclose={() => {
                if (controller.current(operation)) controller.closeUser();
              }}
            />
          {:else if $view.content.kind === "markdown" && $view.room && $view.phase === "ready"}<RichContent
              text={$view.content.text ?? ""}
              room={$view.room}
              actions={ownedActions}
              policy="file-preview"
              pageUrl={location.href}
            />
          {:else if $view.content.kind === "csv" && $view.phase === "ready"}<div
              class="tw:max-w-full tw:overflow-auto"
            >
              <table
                class="tw:w-full tw:border-collapse tw:text-left tw:text-sm"
              >
                <thead
                  ><tr
                    >{#each headers as cell, index}<th
                        scope="col"
                        aria-label={cell.trim()
                          ? undefined
                          : `${text("column")} ${index + 1}`}
                        class="tw:whitespace-pre-wrap tw:border tw:border-border tw:p-2 tw:font-semibold"
                        >{cell}</th
                      >{/each}</tr
                  ></thead
                >
                <tbody
                  >{#each rows as row}<tr
                      >{#each row as cell}<td
                          class="tw:whitespace-pre-wrap tw:border tw:border-border tw:p-2"
                          >{cell}</td
                        >{/each}</tr
                    >{/each}</tbody
                >
              </table>
            </div>
          {:else if $view.content.kind === "text" && $view.phase === "ready"}<pre
              class="tw:m-0 tw:max-w-full tw:overflow-auto tw:whitespace-pre-wrap tw:break-words tw:font-mono tw:text-sm">{$view
                .content.text}</pre>
          {:else if $view.content.kind === "download"}<a
              href={fileURL($view.target)}
              target="_blank"
              rel="noopener noreferrer"
              class={buttonVariants()}>{text("download")}</a
            >{/if}
        {/key}
        {#if $view.content.kind === "csv" && csv.rows.length > 20}<nav
            aria-label={text("rows")}
            class="tw:flex tw:flex-wrap tw:items-center tw:gap-2"
          >
            <Button
              variant="outline"
              disabled={csvPage === 0}
              onclick={(event) => {
                if (event.currentTarget.isConnected)
                  csvPage = Math.max(0, csvPage - 1);
              }}>{text("previous")}</Button
            ><span
              >{text("rows")}
              {csvPage * 19 + 2}–{Math.min(
                (csvPage + 1) * 19 + 1,
                csv.rows.length,
              )} /
              {csv.rows.length}</span
            ><Button
              variant="outline"
              disabled={(csvPage + 1) * 19 + 1 >= csv.rows.length}
              onclick={(event) => {
                if (event.currentTarget.isConnected) csvPage++;
              }}>{text("next")}</Button
            >
          </nav>{/if}
        {#if $view.content.truncated || ($view.content.kind === "csv" && csv.truncated)}<p
            role="status"
            class="tw:m-0 tw:text-sm tw:text-muted-foreground"
          >
            {text("truncated")}
          </p>{/if}
      {/if}
    </div>
  {/if}
</Dialog>

{#if $view.closingUnconfirmed}<div
    data-vb-native
    role="alert"
    class="tw:fixed tw:inset-x-4 tw:top-4 tw:z-50 tw:flex tw:flex-wrap tw:items-center tw:gap-3 tw:rounded-surface tw:border tw:border-border tw:bg-card tw:p-4 tw:font-sans tw:text-sm tw:text-card-foreground tw:shadow-lg"
  >
    <p class="tw:m-0 tw:flex-1">{text("closing")}</p>
    <Button
      onclick={(event) => {
        if (event.currentTarget.isConnected) location.reload();
      }}>{text("reload")}</Button
    >
  </div>{/if}
