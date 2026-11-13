<script lang="ts">
  import Button from "../lib/ui/Button.svelte";
  import IconButton from "../lib/ui/IconButton.svelte";
  import Icon from "../lib/ui/Icon.svelte";
  import Badge from "../lib/ui/Badge.svelte";
  import Avatar from "../lib/ui/Avatar.svelte";
  import Input from "../lib/ui/Input.svelte";
  import Textarea from "../lib/ui/Textarea.svelte";
  import Checkbox from "../lib/ui/Checkbox.svelte";
  import Switch from "../lib/ui/Switch.svelte";
  import RadioGroup from "../lib/ui/RadioGroup.svelte";
  import Select from "../lib/ui/Select.svelte";
  import Tabs from "../lib/ui/Tabs.svelte";
  import Tooltip from "../lib/ui/Tooltip.svelte";
  import Dialog from "../lib/ui/Dialog.svelte";
  import Card from "../lib/ui/Card.svelte";
  import Separator from "../lib/ui/Separator.svelte";
  import Skeleton from "../lib/ui/Skeleton.svelte";
  import Field from "../lib/components/Field.svelte";
  import EmptyState from "../lib/components/EmptyState.svelte";
  import ErrorState from "../lib/components/ErrorState.svelte";
  import LoadingState from "../lib/components/LoadingState.svelte";

  let theme = $state<"light" | "dark">("light");
  let text = $state("");
  let notes = $state("");
  let checked = $state(false);
  let enabled = $state(false);
  let choice = $state("room");
  let selected = $state("general");
  let filter = $state("all");
  let count = $state(0);
  let status = $state("");
  $effect(() => {
    document.documentElement.dataset.theme = theme;
  });
  const variants = [
    "primary",
    "secondary",
    "outline",
    "ghost",
    "destructive",
    "link",
  ] as const;
</script>

<main
  class="tw:min-h-dvh tw:bg-background tw:px-4 tw:py-8 tw:font-sans tw:text-sm tw:font-normal tw:leading-5 tw:text-foreground tw:sm:px-8"
  data-gallery
>
  <div class="tw:mx-auto tw:max-w-6xl tw:space-y-6">
    <header
      class="tw:flex tw:flex-wrap tw:items-start tw:justify-between tw:gap-4"
    >
      <div class="tw:space-y-2">
        <a
          href="/app?ui=svelte"
          class="tw:text-sm tw:text-link tw:underline-offset-4 tw:hover:underline"
          >vibebook</a
        >
        <h1
          class="tw:m-0 tw:font-sans tw:text-2xl tw:font-semibold tw:leading-8 tw:tracking-tight"
        >
          Component gallery
        </h1>
        <p class="tw:m-0 tw:text-muted-foreground">
          Shared primitives, Studio tokens, and one Tailwind entry.
        </p>
      </div>
      <div class="tw:flex tw:items-center tw:gap-2">
        <IconButton
          label={theme === "light" ? "Use dark theme" : "Use light theme"}
          icon={theme === "light" ? "moon" : "sun"}
          variant="outline"
          onclick={() => (theme = theme === "light" ? "dark" : "light")}
        /><Badge>{theme}</Badge>
      </div>
    </header>
    <div class="tw:grid tw:grid-cols-1 tw:gap-5 tw:md:grid-cols-2">
      <Card
        title="Actions"
        description="Variants share focus, disabled and loading behavior."
      >
        <div class="tw:flex tw:flex-wrap tw:gap-2">
          {#each variants as variant}<Button
              {variant}
              onclick={() => {
                count += 1;
                status = `${variant} activated`;
              }}>{variant}</Button
            >{/each}
        </div>
        <div class="tw:flex tw:flex-wrap tw:items-center tw:gap-2">
          <Button disabled>Disabled</Button><Button loading>Saving</Button
          ><Button size="sm" variant="outline">Small</Button><IconButton
            label="Add item"
            icon="plus"
            onclick={() => (count += 1)}
          /><Tooltip label="Search rooms"><Icon name="search" /></Tooltip>
        </div>
        <p class="tw:m-0 tw:text-xs tw:text-muted-foreground">
          Actions: {count}
        </p>
      </Card>
      <Card
        title="Fields"
        description="Labels, hints and errors have explicit associations."
      >
        <Field
          id="gallery-title"
          label="Room name"
          hint="Choose a name your team recognizes."
          >{#snippet children(props)}<Input
              {...props}
              bind:value={text}
              placeholder="Project room"
            />{/snippet}</Field
        >
        <Field
          id="gallery-email"
          label="Email"
          error="Enter a valid email address."
          >{#snippet children(props)}<Input
              {...props}
              type="email"
              value="invalid"
            />{/snippet}</Field
        >
        <Field id="gallery-notes" label="Notes"
          >{#snippet children(props)}<Textarea
              {...props}
              bind:value={notes}
              placeholder="Write a note"
            />{/snippet}</Field
        >
        <Field id="gallery-disabled" label="Unavailable"
          >{#snippet children(props)}<Input
              {...props}
              disabled
              value="Disabled input"
            />{/snippet}</Field
        >
      </Card>
      <Card
        title="Selection"
        description="Keyboard controls use native semantics or Bits UI behavior."
      >
        <div class="tw:flex tw:items-center tw:gap-2">
          <Checkbox id="gallery-checkbox" bind:checked /><label
            for="gallery-checkbox">Include archived rooms</label
          >
        </div>
        <div class="tw:flex tw:items-center tw:gap-2">
          <Switch id="gallery-switch" bind:checked={enabled} /><label
            for="gallery-switch">Notifications</label
          >
        </div>
        <RadioGroup
          label="Room visibility"
          bind:value={choice}
          items={[
            { value: "room", label: "Room members" },
            { value: "personal", label: "Only me" },
            { value: "disabled", label: "Unavailable", disabled: true },
          ]}
        />
        <Field id="gallery-filter" label="Show"
          >{#snippet children(props)}<Select
              {...props}
              bind:value={filter}
              items={[
                { value: "all", label: "All rooms" },
                { value: "active", label: "Active rooms" },
              ]}
            />{/snippet}</Field
        >
        <output
          data-selection-state
          class="tw:block tw:text-xs tw:text-muted-foreground"
          aria-live="polite">{choice} · {filter}</output
        >
      </Card>
      <Card
        title="Overlays"
        description="Focus trap, Escape dismissal and focus restoration are provided by Bits UI."
      >
        <div class="tw:flex tw:flex-wrap tw:gap-2">
          <Dialog
            title="Edit room"
            description="Changes apply to the current room."
            closeLabel="Close dialog"
          >
            {#snippet trigger()}Open dialog{/snippet}
            {#snippet children()}<Field id="dialog-name" label="Name"
                >{#snippet children(props)}<Input
                    {...props}
                    bind:value={text}
                  />{/snippet}</Field
              ><Button onclick={() => (status = "Dialog action completed")}
                >Save name</Button
              >{/snippet}
          </Dialog>
          <Dialog
            title="Room details"
            description="A responsive sheet shares the dialog behavior."
            closeLabel="Close sheet"
            sheet
          >
            {#snippet trigger()}Open sheet{/snippet}
            {#snippet children()}<p class="tw:m-0 tw:text-muted-foreground">
                The same dialog primitives support mobile and desktop layouts.
              </p>
              <Input
                aria-label="Sheet note"
                placeholder="Add a note"
              />{/snippet}
          </Dialog>
        </div>
        <Tabs
          label="Room settings"
          bind:value={selected}
          items={[
            { value: "general", label: "General" },
            { value: "members", label: "Members" },
            { value: "disabled", label: "Unavailable", disabled: true },
          ]}
        >
          {#snippet children(value)}<p
              class="tw:m-0 tw:rounded-control tw:border tw:border-border tw:p-3"
            >
              {value === "general" ? "General settings" : "Room members"}
            </p>{/snippet}
        </Tabs>
      </Card>
      <Card title="Identity and feedback">
        <div class="tw:flex tw:items-center tw:gap-3">
          <Avatar name="Gimenes" /><Avatar name="Guilherme Rodrigues" /><Avatar
            name="Sample user"
            src="/favicon.svg"
          /><span class="tw:text-muted-foreground"
            >Images and initials share one frame.</span
          >
        </div>
        <Separator />
        <div class="tw:flex tw:flex-wrap tw:gap-2">
          <Badge>Default</Badge><Badge variant="primary">Selected</Badge><Badge
            variant="success">Complete</Badge
          ><Badge variant="warning">Waiting</Badge><Badge variant="destructive"
            >Failed</Badge
          >
        </div>
        <div class="tw:flex tw:items-center tw:gap-3">
          <Skeleton class="tw:size-9 tw:rounded-full" />
          <div class="tw:flex-1 tw:space-y-2">
            <Skeleton class="tw:h-3 tw:w-3/4" /><Skeleton
              class="tw:h-3 tw:w-1/2"
            />
          </div>
        </div>
      </Card>
      <Card title="Empty states"
        ><EmptyState
          title="Nothing waiting for you"
          description="New requests and tasks in review will appear here."
          ><Button
            variant="outline"
            onclick={() => (status = "Empty state action completed")}
            >Explore rooms</Button
          ></EmptyState
        ></Card
      >
      <Card title="Status feedback"
        ><LoadingState label="Saving changes" /><ErrorState
          title="Could not save changes"
          description="Your draft is still available."
          retryLabel="Try again"
          onretry={() => (status = "Retry requested")}
        /></Card
      >
      <Card title="Typography" class="tw:md:col-span-2">
        <h3
          class="tw:m-0 tw:font-sans tw:text-xl tw:font-semibold tw:leading-7 tw:tracking-tight"
        >
          Inter variable — headings and UI
        </h3>
        <p class="tw:m-0 tw:text-sm tw:leading-5">
          Body 400 · medium 500 · semibold 500 · bold 600. English and
          Portuguese: Olá, colaboração, ações.
        </p>
        <p class="tw:m-0 tw:text-muted-foreground">
          Muted text uses the Studio semantic role.
        </p>
        <pre
          class="tw:m-0 tw:overflow-auto tw:rounded-control tw:border tw:border-border tw:bg-muted tw:p-3 tw:font-mono tw:text-sm tw:leading-6"><code
            >const room = "fully typed";</code
          ></pre>
      </Card>
    </div>
    <p role="status" class="tw:min-h-5 tw:text-sm tw:text-muted-foreground">
      {status}
    </p>
  </div>
</main>
