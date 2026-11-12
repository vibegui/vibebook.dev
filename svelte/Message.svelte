<script lang="ts">
  import type { ChatBridge, ChatMessage } from "./chatTypes";
  let {
    message: m,
    previous,
    origin = false,
    typing,
    vb,
  }: {
    message: ChatMessage;
    previous?: ChatMessage;
    origin?: boolean;
    typing?: string;
    vb: ChatBridge;
  } = $props();

  const continuous = $derived(vb.continues(previous, m));
  const special = $derived(
    m.tag === "reminder"
      ? vb.remHtml(m, origin)
      : m.tag === "issue"
        ? vb.issueHtml(m)
        : vb.isNotice(m)
          ? vb.noticeHtml(m)
          : null,
  );
  // Origin messages share actions with their original message but must not
  // duplicate its DOM id or display an epic card pointing back into this thread.
  const specialMarkup = $derived(
    origin && special ? special.replace(/\sid="m\d+"/, "") : special,
  );
  const text = $derived(
    !m.text && typing
      ? `<span class="typing">${vb.esc(vb.typingNote?.(m.id) || vb.t("pensando ({mode})", { mode: vb.typingLabel?.(typing) ?? typing }))}…</span>`
      : m.author === "ai"
        ? m.text
          ? vb.mentions(vb.md(m.text))
          : m.poll
            ? ""
            : `<span class="typing">${vb.t("pensando…")}</span>`
        : m.text
          ? vb.mentions(
              m.kind === "agent" ? vb.md(m.text) : vb.linkify(vb.esc(m.text)),
            )
          : "",
  );
  const timestamp = $derived(
    vb.dateTime?.(m.ts) ?? new Date(m.ts).toLocaleString(),
  );
</script>

{#if specialMarkup !== null}
  {@html specialMarkup}
{:else}
  <div
    class="msg"
    class:ai={m.author === "ai"}
    class:agent={m.author !== "ai" && m.kind === "agent"}
    class:done={m.tag === "done"}
    class:cont={continuous}
    class:waitMsg={vb.waiting(m.id)}
    id={origin ? undefined : `m${m.id}`}
  >
    {@html m.kind === "agent"
      ? vb.agentAvatar(m.author, m.via)
      : vb.avatar(m.author)}
    {#if continuous}<span class="gut" title={timestamp}>{vb.hhmm(m.ts)}</span
      >{/if}
    <span class="mact">
      <button
        type="button"
        class="rbtn"
        data-copymsg={m.id}
        title={vb.t("Copiar")}
        aria-label={vb.t("Copiar o texto desta mensagem")}
        >{@html vb.icon("copy", 14)} {vb.t("Copiar")}</button
      >
      <button
        type="button"
        class="rbtn"
        data-copylink={m.id}
        title={vb.t("Copiar link")}
        aria-label={vb.t("Copiar o link desta mensagem")}
        >{@html vb.icon("link", 14)} {vb.t("Copiar link")}</button
      >
      <button
        type="button"
        class="rbtn"
        data-reply={m.id}
        title={vb.t("Responder")}
        aria-label={vb.t("Responder a esta mensagem")}
        >{@html vb.icon("reply", 14)} {vb.t("Responder")}</button
      >
    </span>
    <div class="body">
      {#if m.reply_to}{@html vb.quoteHtml(m.reply_to)}{/if}
      <div class="who">
        {#if m.kind === "agent"}
          {vb.t("{via} de {who}", {
            via: m.via || "agent",
            who: vb.name(m.author),
          })}
          <span
            class="agentTag"
            title={vb.t("Escrito pelo agent dessa pessoa, em nome dela")}
            >agent</span
          >
        {:else}{vb.name(m.author)}{/if}
        {#if m.tag === "done"}<span
            class="doneTag"
            title={vb.t("Reporta algo entregue")}>✓ {vb.t("entregue")}</span
          >{/if}
        · {vb.ago(m.ts)}<span class="hhmm" title={timestamp}
          >{vb.hhmm(m.ts)}</span
        >
      </div>
      <div class="txt" hidden={!text}>{@html text}</div>
      {@html vb.attHtml(m.files)}
      {#if m.card}{@html vb.cardHtml(m)}{/if}
      {#if m.choices}{@html vb.choiceHtml(m)}{/if}
      {#if m.poll}{@html vb.pollHtml(m.poll)}{/if}
      {#if !origin}{@html vb.threadCards(m.id)}{/if}
    </div>
  </div>
{/if}
