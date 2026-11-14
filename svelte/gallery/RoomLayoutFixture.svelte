<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import RoomLayout from "../features/room-layout/RoomLayout.svelte";
  import { createRoomLayout } from "../features/room-layout/controller";
  import { createRoomLayoutBrowser } from "../features/room-layout/browser";
  import Button from "../lib/ui/Button.svelte";
  import Heading from "../lib/ui/Heading.svelte";
  import Textarea from "../lib/ui/Textarea.svelte";
  import RoomLayoutFixtureBoard from "./RoomLayoutFixtureBoard.svelte";
  import SetupInstructions from "../features/agents/SetupInstructions.svelte";
  import AlertDialog from "../lib/ui/AlertDialog.svelte";
  const capacityProbe =
    new URL(location.href).searchParams.get("capacity") === "1";
  let setupAttention = $state(capacityProbe);
  let active = true,
    rail = $state(false),
    tallHeader = $state(false),
    boardMounts = $state(0),
    navigations = $state(0),
    docMode = $state("preview"),
    docDraft = $state(""),
    cancelClicks = $state(0),
    alertOpen = $state(false);
  const browser = createRoomLayoutBrowser(window),
    storage = browser.storage;
  browser.storage = storage
    ? {
        getItem: () => storage.getItem("vb.room-layout-fixture.docW"),
        setItem: (_key, value) =>
          storage.setItem("vb.room-layout-fixture.docW", value),
      }
    : null;
  const owner = createRoomLayout({
      scopeKey: "public-layout-fixture",
      current: () => active,
      browser,
      onDocumentClosed: () => {
        docMode = "preview";
      },
    }),
    view = owner.state;
  const labels = {
    documentWidth: "Document width",
    closeDocument: "Close document",
    closeSidebar: "Close sidebar",
    closeSheet: "Close panel",
    historyUnconfirmed: "Panel Back is unconfirmed.",
    historyRetry: "Retry panel Back",
    animationUnavailable: "Declared stylesheet animation unavailable.",
  };
  onMount(() => {
    const pop = () => owner.consumePop();
    window.addEventListener("popstate", pop);
    return () => window.removeEventListener("popstate", pop);
  });
  onDestroy(() => {
    active = false;
    owner.dispose();
  });
  function navigate() {
    owner.closeSheet();
    const run = () => {
      if (!active) return;
      owner.beforeNavigation();
      navigations++;
      const url = new URL(location.href);
      url.hash = "layout-deferred";
      history.pushState(null, "", url);
    };
    if (!owner.deferNavigation(run)) run();
  }
  function pick() {
    const replace = owner.takeSheetEntry();
    owner.beforeNavigation();
    const url = new URL(location.href);
    url.hash = "layout-picked";
    history[replace ? "replaceState" : "pushState"](null, "", url);
  }
</script>

<main
  data-vb-native
  data-room-layout-fixture
  class="tw:fixed tw:inset-0 tw:grid tw:grid-rows-[auto_minmax(0,1fr)] tw:overflow-hidden tw:bg-background tw:font-sans tw:text-sm tw:text-foreground"
>
  <div
    class="tw:flex tw:flex-wrap tw:gap-1 tw:border-b tw:border-border tw:p-1"
  >
    {#if capacityProbe}<Button
        size="sm"
        onclick={() => (setupAttention = !setupAttention)}>Setup notice</Button
      ><Button size="sm" onclick={() => owner.toggleDocument()}
        >Toggle document capacity</Button
      >
    {:else}<Button size="sm" onclick={() => owner.openSheet("doc")}
        >Open document</Button
      ><Button size="sm" onclick={() => owner.openSheet("side")}
        >Open sidebar</Button
      >
      <Button size="sm" onclick={() => owner.setPane("doc", { open: true })}
        >Document pane</Button
      ><Button size="sm" onclick={() => owner.setPane("board", { open: true })}
        >Board pane</Button
      ><Button size="sm" onclick={() => owner.toggleBoard()}>Full Board</Button>
      <Button size="sm" onclick={() => owner.toggleSidebar()}
        >Sidebar rail</Button
      ><Button
        size="sm"
        onclick={() => {
          rail = !rail;
        }}>Application rail</Button
      ><Button
        size="sm"
        onclick={() => {
          tallHeader = !tallHeader;
        }}>Wrap header</Button
      >
      <Button
        size="sm"
        onclick={() => {
          docMode = "edit";
          owner.setPane("doc", { open: true });
        }}>Edit form</Button
      ><Button size="sm" onclick={navigate}>Close then navigate</Button><Button
        size="sm"
        onclick={pick}>Pick thread</Button
      >
      <Button
        size="sm"
        onclick={() => {
          active = false;
          owner.dispose();
        }}>Dispose layout</Button
      >
      <Button
        size="sm"
        onclick={() => {
          alertOpen = true;
        }}>Open nested confirmation</Button
      >
      <output data-layout-mounts>{boardMounts}</output><output
        data-layout-navigations>{navigations}</output
      ><output data-layout-cancels>{cancelClicks}</output><output
        data-layout-sheet>{$view.sheet ?? "closed"}</output
      >
    {/if}
  </div>
  <div
    data-layout-fixture-room
    class={rail
      ? "tw:grid tw:min-h-0 tw:grid-cols-[68px_minmax(0,1fr)]"
      : "tw:grid tw:min-h-0 tw:grid-cols-[0_minmax(0,1fr)]"}
  >
    <div class="tw:overflow-hidden tw:bg-muted">Application rail fixture</div>
    <RoomLayout controller={owner} {labels}>
      {#snippet sidebar()}<nav
          aria-label="Fixture threads"
          class="tw:space-y-3 tw:p-4"
        >
          <Heading level={2}>Room sidebar</Heading><Button onclick={pick}
            >Choose fixture thread</Button
          >
        </nav>{/snippet}
      {#snippet header()}<Heading level={1} class="tw:text-base"
          >{tallHeader
            ? "Natural room header wraps across several lines without measuring header CSS properties. ".repeat(
                6,
              )
            : "Natural room header"}</Heading
        >{/snippet}
      {#snippet peek()}<div class="tw:flex tw:gap-1 tw:p-2">
          <Button
            size="sm"
            onclick={() => owner.setPane("doc", { open: true, toggle: true })}
            >Doc tab</Button
          ><Button
            size="sm"
            onclick={() => owner.setPane("board", { open: true, toggle: true })}
            >Board tab</Button
          ><span
            data-layout-open-drag
            class="tw:ml-auto tw:flex tw:w-16 tw:items-center tw:justify-center"
            >Drag</span
          >
        </div>{/snippet}
      {#snippet attention()}{#if capacityProbe}{#if setupAttention}<div
              class="tw:px-4"
            >
              <div
                class="tw:relative tw:rounded-surface tw:border tw:border-border tw:p-3 tw:pr-12"
              >
                <SetupInstructions
                  origin={location.origin}
                  roomId="aabbccdd0011"
                  lang="en"
                />
              </div>
            </div>{/if}{:else}<p class="tw:px-4 tw:py-1">
            Fixed attention row outside the message scroller
          </p>{/if}{/snippet}
      {#snippet chat()}<p>
          Neutral geometry fixture; no room, provider or backend data.
        </p>
        {#each Array.from({ length: 50 }, (_, index) => index) as row}<p
            class="tw:py-2"
          >
            Scrollable fixture line {row}
          </p>{/each}{/snippet}
      {#snippet composer()}<div class="tw:p-2">
          <Textarea aria-label="Fixture composer" />
        </div>{/snippet}
      {#snippet documentToolbar()}<div class="tw:flex tw:gap-1 tw:p-2">
          <Button size="sm" onclick={() => owner.setPane("doc")}
            >Desktop Doc</Button
          ><Button size="sm" onclick={() => owner.setPane("board")}
            >Desktop Board</Button
          >
        </div>{/snippet}
      {#snippet document()}<div
          class="tw:flex tw:min-h-0 tw:flex-1 tw:flex-col tw:gap-2 tw:p-3"
        >
          <Heading level={2}>Document surface</Heading
          >{#if docMode === "edit"}<form
              class="tw:flex tw:min-h-0 tw:flex-1 tw:flex-col tw:gap-2"
              onsubmit={(event) => event.preventDefault()}
            >
              <label for="layout-doc-draft">Document draft</label><Textarea
                id="layout-doc-draft"
                bind:value={docDraft}
                class="tw:min-h-0 tw:flex-1"
              /><Button
                onclick={() => {
                  cancelClicks++;
                  docMode = "preview";
                }}>Cancel document form</Button
              >
            </form>{:else}<p>Readonly fixture preview</p>{/if}
        </div>{/snippet}
      {#snippet board()}<RoomLayoutFixtureBoard
          mounted={() => {
            boardMounts++;
          }}
        />{/snippet}
    </RoomLayout>
  </div>
</main>
<AlertDialog
  bind:open={alertOpen}
  title="Nested layout confirmation"
  description="Public fixture; no mutation."
  confirmLabel="Confirm fixture"
  cancelLabel="Cancel fixture"
  onconfirm={() => {
    alertOpen = false;
  }}
/>
