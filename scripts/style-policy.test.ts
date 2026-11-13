import { expect, test } from "bun:test";
import { auditHTML, auditPresentation, auditTailwind } from "./style-policy";

test("HTML parsing catches embedded styles and stylesheet links, including template fragments", () => {
  for (const source of [
    '<div style="color:red"></div>',
    "<style>body{color:red}</style>",
    '<link rel="stylesheet" href="https://fonts.example/theme.css">',
    '<link rel="alternate stylesheet" href="/legacy.css" title="legacy">',
    '<template><p style="color:red"></p></template>',
    '<script>element.style.color="red";</script>',
  ])
    expect(auditHTML("app.html", source).length).toBeGreaterThan(0);
  expect(
    auditHTML(
      "app.html",
      '<link rel="stylesheet" href="/svelte-preview/ui.css?v=abc"><div class="tw:bg-card"></div>',
    ),
  ).toEqual([]);
});

test("native component audit rejects style blocks, directives, markup and CSSOM bypasses", () => {
  for (const source of [
    '<div style="color:red"></div>',
    '<div style:color="red"></div>',
    '<svelte:head><link rel="stylesheet" href="/legacy.css" /></svelte:head><p>hi</p>',
    '<svelte:head><link rel="alternate stylesheet" href={url} /></svelte:head>',
    "<div></div><style>div{color:red}</style>",
    '<script lang="ts">const markup = `<span style="color:red">bad</span>`;</script>',
    '<script lang="ts">const markup = `<span style="color:${color}">bad</span>`;</script>',
    '<script lang="ts">element.style.color = "red";</script>',
    '<script lang="ts">const {style: presentation} = document.body; presentation.color = "red";</script>',
    '<p class={"legacy-message"}></p>',
    '<p class={cn("legacy-message")}></p>',
    '<p class={active ? "tw:block" : "legacy-message"}></p>',
    "<p class={`tw:bg-${color}`}></p>",
    "<button onclick={() => { document.body.style.color = String(1); }}>Click</button>",
    '<script lang="ts">const load = () => import("some-theme/theme.css");</script>',
    '<script lang="ts">export * from "some-theme/theme.css";</script>',
    '<script lang="ts">const sheet = new CSSStyleSheet(); sheet.insertRule("div{}");</script>',
    '<script lang="ts">EditorView.theme({".cm-content": {color: "red"}});</script>',
    '<script lang="ts">element.setAttribute("style", "color:red");</script>',
    '<script lang="ts">const props = {style: "color:red"};</script>',
  ])
    expect(
      auditPresentation("svelte/lib/ui/Test.svelte", source).length,
    ).toBeGreaterThan(0);
  expect(
    auditPresentation(
      "svelte/lib/ui/Test.svelte",
      '<script lang="ts">let value = $state("hello");</script><p class="tw:text-foreground">{value}</p>',
    ),
  ).toEqual([]);
});
test("closed card variants select Tailwind utilities without permitting CSSOM or inline CSS", () => {
  const file = "svelte/features/chat-interactive/CardView.svelte";
  expect(
    auditPresentation(
      file,
      '<p class={element.props.style === "bold" ? "tw:font-semibold" : "tw:font-normal"}>Card</p>',
    ),
  ).toEqual([]);
  for (const source of [
    "<p style={element.props.style}>Card</p>",
    '<script>element.props.style = "bold";</script>',
    '<script>element.props.style.color = "red";</script>',
    "<script>const variant = element.props.style === userInput;</script>",
    '<script>const variant = element.props.style === "display:none";</script>',
    '<script>const variant = document.body.style === "bold";</script>',
    '<script>const variant = element.props["style"] === "bold";</script>',
  ])
    expect(auditPresentation(file, source).length).toBeGreaterThan(0);
});

test("stylesheet policy distinguishes tokens from custom selector and import escapes", () => {
  expect(
    auditTailwind(
      "tailwind.css",
      '@import "tailwindcss" source(none); @theme inline {--color-card:var(--card)} :root{--card:#fff} .dark{--card:#111}',
    ),
  ).toEqual([]);
  for (const source of [
    ".button{color:red}",
    ":root{color:red}",
    "@utility secret{color:red}",
    '@plugin "unlisted-theme-package";',
    '@config "../hidden-theme.js";',
    '@import "legacy.css";',
    ":where([data-vb-native]) { color:red; }",
    ':where([data-vb-native]) { @import "legacy.css"; }',
    ".button{@apply bg-card}",
  ])
    expect(auditTailwind("tailwind.css", source).length).toBeGreaterThan(0);
  expect(
    auditTailwind(
      "tailwind.css",
      ':where([data-vb-native]) { @import "tailwindcss/preflight.css" layer(base); }',
    ),
  ).toEqual([]);
  expect(
    auditPresentation("svelte/lib/ui/test.ts", 'import "./extra.css";'),
  ).toHaveLength(1);
  expect(
    auditPresentation("svelte/styles.ts", 'import "./styles/tailwind.css";'),
  ).toEqual([]);
});
