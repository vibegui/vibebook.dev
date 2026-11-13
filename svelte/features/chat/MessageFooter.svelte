<script lang="ts">
  import type { ChatBridge } from "../../chatTypes";
  import type { MessageFooter } from "./model";
  import { agentMark, prettyModel } from "./model";
  import Avatar from "../../lib/ui/Avatar.svelte";
  import Button from "../../lib/ui/Button.svelte";
  let { footer, vb }: { footer: MessageFooter; vb: ChatBridge } = $props();
  let opened = $state(false),
    hovered = $state(false),
    focused = $state(false),
    dismissed = $state(false);
  const shown = $derived(!dismissed && (opened || hovered || focused));
  const ids = $props.id();
  const read = $derived(footer.readers.filter((r) => r.read).length);
  const label = $derived(
    read === footer.readers.length
      ? vb.t("visto por {n}", { n: read })
      : vb.t("visto por {n} de {m}", { n: read, m: footer.readers.length }),
  );
  const who = (model: string, email: string) =>
    vb.t("{via} de {who}", { via: prettyModel(model), who: vb.name(email) });
</script>

<div
  data-message-footer
  class="tw:mt-2 tw:flex tw:flex-wrap tw:items-center tw:gap-2 tw:text-xs tw:text-muted-foreground"
>
  {#each footer.statuses as status (`${status.ack.who}|${status.ack.email}`)}
    <span
      data-ack-state={status.kind}
      class={status.kind === "blocked"
        ? "tw:whitespace-pre-wrap tw:break-words tw:text-warning"
        : "tw:whitespace-pre-wrap tw:break-words"}
    >
      {#if status.kind === "blocked"}⏸ {vb.t("{who} espera você no terminal", {
          who: who(status.ack.who, status.ack.email),
        })}{status.ack.note ? `: ${status.ack.note}` : ""}
      {:else if status.kind === "doing"}<span
          aria-hidden="true"
          class="tw:inline-block tw:animate-spin tw:motion-reduce:animate-none"
          >✻</span
        >
        {vb.t("{who} está fazendo isso", {
          who: who(status.ack.who, status.ack.email),
        })}
      {:else if status.kind === "done"}✓ {vb.t("{who} fez isso", {
          who: who(status.ack.who, status.ack.email),
        })}
      {:else if status.kind === "waiting"}⏳ {vb.t("aguardando {who}", {
          who: status.owners.map(vb.name).join(", "),
        })}
      {:else}– {vb.t("{who} parou", {
          who: who(status.ack.who, status.ack.email),
        })}{/if}
      {#if ["blocked", "doing", "idle"].includes(status.kind)}
        · <time title={vb.dateTime?.(status.ack.ts)}
          >{vb.ago(status.ack.ts)}</time
        >{/if}
    </span>
  {/each}
  {#if footer.readers.length}
    <div
      role="group"
      aria-label={label}
      class="tw:relative"
      onpointerenter={() => {
        hovered = true;
        dismissed = false;
      }}
      onpointerleave={() => {
        hovered = false;
      }}
    >
      <Button
        variant="ghost"
        size="sm"
        class="tw:h-auto tw:gap-1 tw:px-1 tw:py-1"
        aria-label={label}
        aria-expanded={shown}
        aria-controls={`${ids}-readers`}
        aria-describedby={shown ? `${ids}-readers` : undefined}
        onfocus={() => {
          focused = true;
          dismissed = false;
        }}
        onblur={() => {
          focused = false;
          opened = false;
        }}
        onclick={() => {
          opened = !opened;
          dismissed = !opened;
        }}
        onkeydown={(event) => {
          if (event.key === "Escape") {
            dismissed = true;
            opened = false;
            event.stopPropagation();
          }
        }}
      >
        {#each footer.readers.slice(0, 5) as reader (`${reader.receipt.who}|${reader.receipt.email}`)}
          <span
            data-reader-read={reader.read}
            class={reader.read
              ? "tw:relative tw:inline-flex"
              : "tw:relative tw:inline-flex tw:opacity-50"}
          >
            <Avatar
              name={vb.name(reader.receipt.email)}
              src={vb.avatarUrl?.(reader.receipt.email)}
              class="tw:size-6"
            /><span
              aria-hidden="true"
              class="tw:absolute tw:-right-1 tw:-bottom-1 tw:rounded-full tw:bg-card tw:px-0.5 tw:text-xs"
              >{agentMark(reader.receipt.who)}</span
            >
          </span>
        {/each}
        {#if footer.readers.length > 5}<span>+{footer.readers.length - 5}</span
          >{/if}<span aria-hidden="true">{read ? "✓✓" : "✓"}</span>
      </Button>
      {#if shown}<div
          id={`${ids}-readers`}
          role="tooltip"
          class="tw:absolute tw:bottom-full tw:left-0 tw:z-20 tw:mb-2 tw:w-72 tw:max-w-[80vw] tw:space-y-2 tw:rounded-surface tw:border tw:border-border tw:bg-popover tw:p-3 tw:text-popover-foreground tw:shadow-md"
        >
          {#each footer.readers as reader (`${reader.receipt.who}|${reader.receipt.email}`)}<div
              class="tw:flex tw:items-center tw:gap-2"
            >
              <Avatar
                name={vb.name(reader.receipt.email)}
                src={vb.avatarUrl?.(reader.receipt.email)}
                class="tw:size-6"
              /><span class="tw:min-w-0 tw:flex-1 tw:break-words"
                >{who(reader.receipt.who, reader.receipt.email)}</span
              ><span>{vb.t(reader.read ? "leu" : "recebeu")}</span>
            </div>{/each}
        </div>{/if}
    </div>
  {/if}
</div>
