<script lang="ts">
  import Avatar from "../../lib/ui/Avatar.svelte";
  import type { MeResult } from "../../../shared/schemas";
  import IconButton from "../../lib/ui/IconButton.svelte";
  import type { RoomsSession } from "../rooms/session";
  import {
    targetHref,
    waitTarget,
    personAvatar,
    type Wait,
    type RoomTarget,
  } from "./model";
  import { homeText, homeIssue, type HomeLanguage } from "./copy";
  let {
    waits,
    rooms,
    lang,
    ago,
    onnavigate,
    people,
  }: {
    waits: Wait[];
    people: MeResult;
    rooms: RoomsSession;
    lang: HomeLanguage;
    ago: (time: number) => string;
    onnavigate: (target: RoomTarget) => void;
  } = $props();
  const actions = $derived(rooms.state);
  const text = (
    key: Parameters<typeof homeText>[1],
    vars?: Record<string, string | number>,
  ) => homeText(lang, key, vars);
</script>

<ul class="tw:m-0 tw:list-none tw:space-y-3 tw:p-0">
  {#each waits as wait (wait.book_id + ":" + wait.ref)}{@const key = `wait:${wait.book_id}:${wait.ref}`}
    <li class="tw:flex tw:items-start tw:gap-2" data-native-wait={wait.ref}>
      <Avatar
        name={wait.author_name || wait.author}
        src={personAvatar(people, wait.author)}
      />
      <a
        class="tw:min-w-0 tw:flex-1 tw:rounded-control tw:text-sm tw:text-foreground tw:no-underline tw:outline-none tw:focus-visible:ring-2 tw:focus-visible:ring-ring"
        href={targetHref(waitTarget(wait))}
        onclick={(event) => {
          if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey)
            return;
          event.preventDefault();
          if (event.currentTarget.isConnected) onnavigate(waitTarget(wait));
        }}
        ><p class="tw:m-0 tw:line-clamp-3 tw:break-words">{wait.text}</p>
        <small class="tw:break-words tw:text-muted-foreground"
          >{wait.ref.startsWith("t")
            ? text("taskWait")
            : text("asked", {
                who:
                  (wait.author_name || wait.author.split("@")[0] || "").split(
                    " ",
                  )[0] ?? "",
              })} · {wait.topic || text("main")} · {ago(wait.ts)}</small
        ></a
      >
      {#if wait.ref.startsWith("m")}<IconButton
          icon="check"
          label={text("resolve")}
          disabled={!!$actions.pending[key]}
          onclick={(event) => {
            if (event.currentTarget.isConnected)
              void rooms.resolve(wait.book_id, wait.ref);
          }}
        />{/if}
      {#if $actions.issues[key]}<p
          role="alert"
          class="tw:m-0 tw:break-words tw:text-destructive"
        >
          {homeIssue(lang, $actions.issues[key]!)}
        </p>{/if}
    </li>{/each}
</ul>
