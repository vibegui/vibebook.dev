<script lang="ts">
  import type { PanelProps, Reminder } from "./panels";
  import { createRoomApi } from "./transport";
  let { room, vb, send }: PanelProps = $props();
  let edit = $state<{ name: string; text: string; fixed?: boolean } | null>(
      null,
    ),
    error = $state(""),
    saving = $state(false),
    opened = $state<string[]>([]);
  const list = $derived(room.reminders || []);
  const locale = $derived(
    vb.locale || (document.documentElement.lang === "en" ? "en-US" : "pt-BR"),
  );
  const when = (ms: number) =>
    new Date(ms).toLocaleString(locale, {
      weekday: "short",
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  function open(value: { name: string; text: string; fixed?: boolean }) {
    edit = value;
    error = "";
  }
  function toggle(r: Reminder) {
    opened = opened.includes(r.id)
      ? opened.filter((id) => id !== r.id)
      : [...opened, r.id];
  }
  async function save(e: SubmitEvent) {
    e.preventDefault();
    if (!edit || saving) return;
    const draft = { ...edit };
    const nm = draft.name.trim().replace(/\.md$/i, "").replace(/[\\/]/g, "-");
    saving = true;
    error = "";
    try {
      const result = await createRoomApi(room.id).uploadFile({
        name: `reminders/${nm}.md`,
        type: "text/markdown",
        body: draft.text,
      });
      if (result.reminder && !result.reminder.ok) {
        error = `⚠ ${result.reminder.error || vb.t("falhou")}`;
        edit = { ...draft, name: nm, fixed: true };
        return;
      }
      edit = null;
    } catch (cause) {
      error = cause instanceof Error ? cause.message : vb.t("sem conexão");
    } finally {
      saving = false;
    }
  }
</script>

<div class="remHead">
  <p>
    {@html vb.t(
      "Cada lembrete é um arquivo <code>reminders/&lt;nome&gt;.md</code>: o texto diz quando rodar e o que fazer. Na hora, o @vibe posta o texto aqui e o agent de quem salvou faz.",
    )}
  </p>
  {#if !edit}<button
      class="primary"
      id="remNew"
      onclick={() => open({ name: "", text: "" })}
      >{@html vb.icon("plus", 14)} {vb.t("Novo lembrete")}</button
    >{/if}
</div>
{#if edit}
  <form class="remForm" id="remForm" onsubmit={save}>
    <input
      name="name"
      maxlength="60"
      required
      placeholder={vb.t("nome, ex.: relatorio-diario")}
      bind:value={edit.name}
      readonly={edit.fixed}
    />
    <textarea
      name="text"
      required
      placeholder={vb.t(
        "Diga quando e o quê. Ex.: Todo dia às 8h: puxe os números de ontem e poste aqui o que mudou.",
      )}
      bind:value={edit.text}></textarea>
    <div class="row">
      <span class="err" id="remErr">{error}</span><button
        type="button"
        class="ghost"
        id="remCancel"
        onclick={() => (edit = null)}>{vb.t("Cancelar")}</button
      ><button class="primary" id="remSave" disabled={saving}
        >{vb.t("Salvar")}</button
      >
    </div>
  </form>
{/if}
{#each list as r (r.id)}
  <div
    class="rem"
    class:bad={!!r.error}
    class:off={!r.enabled}
    class:open={opened.includes(r.id)}
  >
    <div
      class="remBody"
      data-rem-open={r.id}
      role="button"
      tabindex="0"
      title={vb.t(opened.includes(r.id) ? "Esconder o texto" : "Ver o texto")}
      onclick={(e) => {
        if (!(e.target as HTMLElement).closest(".remText")) toggle(r);
      }}
      onkeydown={(e) => {
        if (e.key === "Enter") toggle(r);
      }}
    >
      <b
        >{@html vb.icon(
          opened.includes(r.id) ? "chevronDown" : "chevronRight",
          13,
        )}
        {r.name ? `${r.name}.md` : r.text}</b
      >
      <small
        >{#if !r.error}{r.every || r.cron || ""}{r.enabled && r.next_at
            ? ` · ${vb.t("próximo {when}", { when: when(r.next_at) })}`
            : ""} ·
        {/if}{vb.t("de {who}", { who: vb.name(r.owner) })}</small
      >
      {#if r.error}<span class="err">⚠ {r.error}</span
        >{/if}{#if opened.includes(r.id)}<pre
          class="remText">{r.text}</pre>{/if}
    </div>
    {#if r.name}<button
        class="ghost"
        data-rem-edit={r.id}
        title={vb.t("Editar")}
        aria-label={vb.t("Editar")}
        onclick={() => open({ name: r.name!, text: r.text, fixed: true })}
        >{@html vb.icon("pencil", 14)}</button
      >{/if}
    <label class="sw" title={vb.t("Ligado")}
      ><input
        type="checkbox"
        data-rem-on={r.id}
        checked={r.enabled}
        disabled={!!r.error}
        onchange={(e) =>
          send({ t: "reminder.enable", id: r.id, on: e.currentTarget.checked })}
      />{vb.t("ligado")}</label
    >
    <button
      class="ghost"
      data-rem-del={r.id}
      title={vb.t("Apagar lembrete")}
      aria-label={vb.t("Apagar lembrete")}
      onclick={() => {
        if (confirm(vb.t("Apagar este lembrete?")))
          send({ t: "reminder.delete", id: r.id });
      }}>{@html vb.icon("x")}</button
    >
  </div>
{/each}
{#if !list.length && !edit}<div class="empty">
    {vb.t(
      "Nenhum lembrete ainda. Clique em Novo lembrete, ou peça pro seu agent: “todo dia às 8h, me manda o resumo do que mudou”.",
    )}
  </div>{/if}
