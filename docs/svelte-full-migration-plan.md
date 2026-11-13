# Full Svelte migration and conditions of satisfaction

Status: in progress; not complete. The online Svelte preview is a foundation, not completion of this plan. This document defines the goal, implementation order, required evidence and final acceptance gates for the complete migration. Checked implementation milestones must be revalidated against the final deployed revision before sign-off.

## Goal to use

> Complete the first-party vibebook application migration to Svelte 5, strict TypeScript and Vite; deliver schema-derived contracts and inferred end-to-end typed RPC; replace the legacy host with native Svelte features; build an atomic, accessible design system with Tailwind CSS and a Studio-matched theme; use exactly one authored Tailwind stylesheet with only the explicitly permitted third-party styling exceptions; verify functional parity and publish the completed Svelte version online for side-by-side testing. Preserve vanilla and all its ongoing work as the default until an explicit maintainer decision changes it. Satisfy every condition and provide the evidence specified in this file before marking the goal complete.

**Completion rule:** every checkbox below must be satisfied against the final deployed revision, with evidence recorded in the completion report. An online hybrid preview, manually typed fetch wrappers, a partial feature port, or unfinished styling migration cannot satisfy this goal. Amend a condition explicitly with the maintainer before accepting a different result; do not silently waive it or redefine completion around passing tests.

## Scope and invariants

- The target is the complete authenticated vibebook application and its login/access flows, including every feature available in current vanilla at the start of the work and relevant vanilla changes made during migration. The separate marketing/Studio-editable `site/` app, CLI and MCP protocol are outside the UI rewrite; preserve their operation.
- First-party Svelte application logic, UI logic, shared contracts and application backend services are TypeScript. Generated JavaScript and third-party JavaScript distributions are allowed. Renaming legacy JavaScript to TypeScript with suppressed checking does not count.
- Vanilla stays maintained and default at `/app` and `/b/ROOM`. Svelte stays explicitly selected by `?ui=svelte`, with separate assets and no global cookie or account setting that silently changes another tab. Both use the same authorized backend and persistent room data.
- The single-stylesheet/Tailwind rule applies to the entire new Svelte application and design system. It does not require deleting or rewriting the preserved vanilla application's historical CSS. Vanilla CSS must never be imported into Svelte as a compatibility layer.
- Completing the migration and approving a switch of the default are separate decisions. This goal does not authorize removing vanilla or automatically promoting Svelte.
- User-uploaded HTML and external MCP applications retain their sandboxed content styles. The owned viewer/iframe wrapper follows this design system. Moving first-party features into an iframe to evade the migration or styling rules is forbidden.

## Chosen direction

Use Svelte 5 and Vite, the existing Hono/Cloudflare backend, pure shared schemas and an inferred Hono RPC client. Keep separately checked frontend, backend, shared-contract and tooling TypeScript projects. Backend route types may cross through type-only exports/declarations; backend runtime implementations may not enter any browser bundle.

Use [shadcn-svelte](https://www.shadcn-svelte.com/docs/installation/vite) as the starting point for owned component source, with [Bits UI](https://www.bits-ui.com/docs/introduction) for appropriate accessible behavior. This supports the existing Vite application; switching to SvelteKit is not a prerequisite. Generated/copied shadcn components become first-party code and must follow every typing, theming and styling rule here.

Use Tailwind's Vite integration and CSS-first theme configuration. Default paths below are proposed implementation destinations, not claims that the architecture already exists:

| Area                     | Destination                  | Responsibility                                                                    |
| ------------------------ | ---------------------------- | --------------------------------------------------------------------------------- |
| Backend/domain           | `src/`                       | Authorization, persistence, domain rules, typed application routes                |
| Shared contracts         | `shared/`                    | Runtime schemas, derived DTOs/events/commands, public API type exports            |
| Application features     | `svelte/features/`           | Native Svelte screens, orchestration and feature composition                      |
| Atomic UI                | `svelte/lib/ui/`             | Owned shadcn-style primitives, tokens expressed through utility classes           |
| Composed UI              | `svelte/lib/components/`     | Reusable fields, toolbars, panels and interaction patterns                        |
| Client services          | `svelte/lib/client/`         | Inferred RPC client, typed WebSocket and editor adapters                          |
| Sole authored stylesheet | `svelte/styles/tailwind.css` | Tailwind imports/configuration, Studio tokens, fonts and permitted vendor imports |

## M0 — Inventory and baseline

- [ ] Record the starting main commit and a feature-parity matrix covering all screens, operations, states and routes. Include light/dark themes, English/Portuguese and desktop/mobile behavior.
- [ ] Inventory first-party JavaScript, legacy host responsibilities, direct DOM rendering/event wiring, application API calls, protocol messages, CSS sources, inline styles and runtime CSS injection. Each entry has a migration destination and a verification case.
- [x] Separate any currently shared UI source before migrating its design. In particular, the vanilla Inbox must remain rebuildable with its original styling while Svelte adopts Tailwind; preserving an old compiled bundle while breaking its source/build does not satisfy maintaining vanilla. Evidence: `vanilla/inbox/`, `check:vanilla`, cross-variant import fixtures and `docs/svelte-migration/vanilla-build.json` (strict source check: zero errors/warnings; independent build: no preview-owned modules; default assets preserved).
- [ ] Include login/access/OAuth; home and room switching; chat/history/replies/mentions/reactions/search/Inbox; sidebar/epics/tasks/board; documents/Yjs; files/folders/versions/viewers/uploads/pins; reminders/decisions; people/invites/account/theme; MCP apps/connections/embeds; sandboxes/agents; PWA/install/push and mobile interactions. Add any current vanilla feature missing from this list.
- [ ] Capture the vanilla baseline and Studio reference described below. Keep ongoing vanilla fixes in a change ledger; account for them before each preview release.

Evidence: `docs/svelte-migration/feature-parity.md`, `inventory.md` and reproducible baseline fixtures/results, tied to commits. A row is not complete when its screen merely renders; its user actions and error states must work.

## M1 — Typed architecture and schema-derived contracts

- [ ] Frontend, backend, shared contracts and tooling pass separate strict TypeScript checks; Svelte checking reports zero errors/warnings. Build/type dependencies are explicit and reproducible from the frozen lockfile.
- [ ] Shared wire types derive from runtime schemas. Remove the manually duplicated DTO/interface-versus-validator definitions for migrated operations. A schema edit changes the inferred consumer type.
- [ ] Validate untrusted HTTP inputs/responses and WebSocket commands/events at their boundaries. Cover nullable values, malformed nested data, invalid discriminants and rolling compatibility with stored/older payloads. Type assertions alone are not validation.
- [ ] Keep shared runtime schemas browser-safe. No database bindings, credentials, environment objects, Node/Worker runtime modules or backend implementations are exported as shared values. Normalize database representations before exposing public DTOs.
- [ ] Preserve and test `server-only`, backend-directory and private-file rejection in every browser build, including editor/MCP builders. Direct, transitive, dynamic, alias, symlink and raw/URL paths are covered. Type-only API references erase from emitted JavaScript.
- [ ] Remove first-party `any`, unchecked JSON casts, double casts, `@ts-ignore` and disabled checking used to bypass application/contract errors. Any unavoidable third-party interop assertion is localized, documented, runtime-narrowed and covered; it cannot conceal an API mismatch.

Evidence: project dependency diagram, schema/type exports, compile-time negative fixtures, runtime protocol tests and actual browser bundle inspection. A synthetic backend sentinel must not appear in browser output.

## M2 — Inferred end-to-end RPC

- [ ] Build application route types from actual validated Hono handlers and consume them through Hono's inferred client. Start with posting/uploading, then cover every first-party JSON query/mutation used by Svelte, including auth/account, files, tasks, reminders, connections, agents and push settings.
- [ ] Request parameters, query/body payloads, successful responses and supported error/status responses are inferred from the server contract. Frontend components do not maintain copies of those types.
- [ ] Produce a complete API coverage matrix: operation, handler/schema, inferred client method, consumers, authorization, error behavior and tests. No undocumented raw-fetch bypass remains in the Svelte application.
- [ ] Compile-time tests prove that an invalid request fails and that renaming/changing a server response field breaks an incompatible client. A generic `fetch<T>`, return-type annotation or `as ResponseType` does not satisfy inferred RPC.
- [ ] Runtime validation and authorization remain enforced. Exercise business failures, unauthenticated/forbidden access, not-found, rate-limit, upload-limit, malformed/non-JSON responses and network/server failures. Declared result-versus-throw behavior matches runtime behavior.
- [ ] Binary uploads/downloads use explicit typed endpoints/adapters with validated metadata and limits; browser navigation/OAuth redirects, asset retrieval and external protocols are documented separately rather than forced into JSON RPC. These are not exemptions for ordinary application queries/mutations.
- [ ] WebSocket events/commands remain schema-derived typed protocols. Yjs remains the document protocol; keep its adapter/provider lifecycle typed. Preserve vanilla-compatible endpoints/events or add compatible adapters instead of breaking vanilla during the transition.

Evidence: `docs/svelte-migration/api-coverage.md`, generated/inferred API declarations, positive/negative type tests and HTTP/WebSocket integration tests. See [Hono RPC](https://hono.dev/docs/guides/rpc). Zod Mini is an available schema implementation; measure the actual bundle cost rather than assuming it is free.

## M3 — Exactly one Tailwind stylesheet

- [ ] Install Tailwind through its Vite plugin. Exactly one first-party authored stylesheet exists for the new app: `svelte/styles/tailwind.css`. Import it once at the Svelte root; point component-generator configuration at that same file.
- [ ] The file contains only Tailwind imports/configuration, semantic theme tokens, light/dark token assignments, required font registrations, token-based animation definitions and explicitly permitted vendor imports. All application/component presentation uses Tailwind utilities and variants.
- [ ] No Svelte `<style>` blocks, CSS modules, SCSS/Sass/Less, additional app stylesheets, CSS-in-JS, bespoke component selectors, first-party inline styles/style directives, DOM style mutations or first-party runtime stylesheet injection remain. Do not move old CSS into the one file, hide it behind `@apply`/custom utilities, or pass custom style objects through a vendor API except the narrowly approved xterm semantic theme options below.
- [ ] Remove the legacy stylesheet `public/app-svelte.css` as an authored dependency. The Svelte build emits one generated application CSS asset from the sole entry; disable application CSS splitting and component-style injection. Generated output is not another authored source. Vendor runtime styling below is the only permitted exception.
- [ ] Use complete statically discoverable utility classes and typed variant maps. Avoid runtime class-name concatenation that Tailwind cannot discover. Theme colors, fonts, radii, shadows, spacing and motion use semantic tokens rather than repeated feature-specific values.
- [ ] Markdown, tables, rich messages, viewers, portals, dialogs and editor wrappers are styled through Tailwind classes, including descendant/data-state variants when necessary. Tailwind-generated typography utilities are allowed; an imported second theme stylesheet is not.
- [ ] A required `check:styles` audit enforces these rules in first-party source and actual production artifacts. Include HTML/template strings, generated/copied component source, TS/JS style objects, CSSOM calls, imports and lazy entries; a grep for `.css` alone is insufficient.

### Small third-party styling allowlist

Only the following families may supply styling that is not generated from application Tailwind classes. Each actual exception must be recorded with exact package/version, stylesheet or runtime injector, scope, purpose and verification in `svelte/styles/vendor-css.json`:

| Family                              | Permitted scope                                                                        |
| ----------------------------------- | -------------------------------------------------------------------------------------- |
| CodeMirror 6 view internals         | Required editor structure/behavior supplied by the dependency                          |
| Yjs/`y-codemirror.next` integration | Required collaborator caret/selection rendering supplied by the dependency             |
| Bits UI/Floating UI internals       | Required runtime positioning/measurement of headless overlays, not application theming |
| xterm terminal rendering internals | Pinned terminal structural CSS, vendor rendering geometry and approved Studio semantic theme options |

- [ ] The manifest is limited to these four narrowly scoped families; unused entries are absent. No wildcard permission for `node_modules`, framework CSS, copied shadcn source or arbitrary vendor themes exists.
- [ ] Static vendor CSS imports enter through the sole Tailwind entry. Necessary vendor-injected styles/inline geometry are attributed to the named dependency and tested. Forwarding genuine primitive positioning props is allowed; adding first-party presentation rules to them is not.
- [ ] App colors, typography and component appearance still come from Tailwind/Studio tokens. First-party CodeMirror theme CSS objects and legacy override styles are removed. Use Tailwind utilities to adapt vendor surfaces.
- [ ] Fonts are assets, not a second theme stylesheet: register required font files in the sole entry and preserve their required notices. Do not retain separate Google Fonts CSS links or import `tw-animate-css`/other style packs without an explicit amendment to this policy.

The maintainer explicitly approved the scoped xterm amendment on 2026-11-13. Pin `@xterm/xterm` 5.5.0 and `@xterm/addon-fit` 0.10.0; import upstream structural CSS only through the sole Tailwind entry. Vendor-owned terminal rendering/measurement styles are allowed only inside its terminal subtree. Native renderer options may use the resolved Studio background, foreground, cursor, selection and monospace font tokens; terminal ANSI/true-color output remains protocol data. Surrounding controls remain atomic Tailwind components. No arbitrary theme objects, first-party CSS injectors, copied vendor styles or general dependency exemption is allowed. Exact sources/digests, lifecycle and rejection gates are specified in [the approved amendment](svelte-migration/xterm-vendor-amendment-proposal.md); approval does not prove implementation or runtime acceptance.

Adding another exception or relaxing this rule requires an explicit maintainer amendment before completion. Preserve vanilla's CSS in its isolated version; it is never an allowed Svelte dependency.

## M4 — Studio-matched theme

Here, Studio means **deco Studio at https://studio.decocms.com/**, not its marketing site or a generic shadcn palette. Match its typography and semantic colors; adapt the product layout for vibebook's workflows.

Reference inspected on 2026-11-12: [Studio stylesheet](https://studio.decocms.com/assets/index-69S-cBsb.css), SHA-256 `eb3311919cdb7d1d1ff2dfb8d422e3d449526450239c572f194b35de1f4aaafb`. Its root tokens specify Inter variable for sans-serif UI and CommitMono for monospace; its semantic font-weight mapping is normal 400, medium 500, semibold 500 and bold 600. A Switzer font-face also exists in that stylesheet; its presence alone is not evidence that every heading uses it.

Selected observed tokens, to make the intended palette concrete:

| Role               | Studio light | Studio dark        |
| ------------------ | ------------ | ------------------ |
| Background         | `#fefdfb`    | `oklch(17.5% 0 0)` |
| Foreground         | `#0a0a09`    | `oklch(96% 0 0)`   |
| Card               | `#fffffd`    | `oklch(21% 0 0)`   |
| Popover            | `#fffffd`    | `oklch(22% 0 0)`   |
| Muted surface      | `#f5f4f2`    | `oklch(23% 0 0)`   |
| Muted foreground   | `#676664`    | `oklch(62% 0 0)`   |
| Border             | `#edecea`    | `oklch(26% 0 0)`   |
| Input              | `#e4e3e1`    | `oklch(28% 0 0)`   |
| Primary            | `#0a0a09`    | `oklch(82% 0 0)`   |
| Primary foreground | `#ffffff`    | `oklch(14% 0 0)`   |

This is a starting reference, not the complete token inventory. The reference phase must capture sidebar, accent/hover, focus ring, links, destructive/success/warning, selection, chart and disabled-state roles as used in the actual Studio workspace.

- [ ] Commit a reproducible Studio reference: URL, date, asset/source revision or digest, light/dark screenshots, token values and computed typography per role. Confirm workspace usage, not merely a login-page resemblance. Freeze this reference for acceptance; update it explicitly if Studio changes during the project.
- [ ] Map Studio's complete semantic palette into the sole Tailwind entry. Applicable values match the recorded reference exactly after equivalent color normalization, including light/dark modes and interaction states. Do not substitute Tailwind's stock palette or shadcn defaults and call it Studio-inspired.
- [ ] UI/body/navigation/form and code typography use the verified Studio families, actual loaded font files, weights, sizes, line heights and tracking. Check computed styles and font loading; a fallback displaying similar text does not count. Record heading/display roles before assigning a display font.
- [ ] Create a checked token/typography comparison report with zero unexplained mismatches. Screenshot comparisons cover representative buttons, inputs, menus, sidebar, cards, dialogs and typography in both themes.
- [ ] Preserve readable contrast by choosing appropriate Studio semantic roles. Decorative/disabled tokens must not be reused as unreadable body text. Any necessary departure from the recorded palette or typography is an explicit maintainer-approved amendment, not an undocumented approximation.
- [ ] The theme applies consistently to every Svelte feature, overlay and permitted vendor surface. No remaining original vibebook font/color styles leak in from the legacy stylesheet.

Evidence: `docs/svelte-migration/studio-reference.md`, token snapshot/comparison, font notices and light/dark visual results. Token names may be adapted; typography and color values may not be guessed.

## M5 — Atomic component design system

- [ ] Own a reusable, typed shadcn-svelte-style component layer. Atoms/primitives cover Button/IconButton, Input/Textarea, Label, Checkbox/Radio/Switch, Badge, Avatar, Separator, Skeleton, Tooltip, Select and loading/status feedback.
- [ ] Compositions cover fields and validation, menus/popovers, Dialog/AlertDialog/Sheet, Tabs, command/search, toast feedback, cards/panels, tables/lists, pagination/history controls, EmptyState and ErrorState. Add primitives required by the feature inventory.
- [ ] Domain screens compose these components. Primitives do not import room stores, business services, authentication state or backend implementations. Shared interactions and variant styling are not independently reimplemented in each feature.
- [ ] Component APIs have typed props/events/snippets/variants and support the required states: default, hover, focus-visible, active/selected, disabled, loading, invalid and destructive. Central class merging and variants preserve semantic token use.
- [ ] Maintain an interactive component gallery with usage examples and representative states, light/dark themes and mobile layouts. It uses the same components and Tailwind entry as the app. A gallery of unused components does not satisfy integration.
- [ ] Verify keyboard operation, visible focus, accessible names, form errors, focus trapping/restoration, Escape dismissal and correct portal behavior. Check contrast and reduced motion. Combine automated checks with manual keyboard/screen-reader spot checks.
- [ ] No unexplained accessibility violations or focus/overlay regressions remain. Document intentional design changes separately from functional regressions. Keep core UI consistent with Studio while retaining vibebook's workflows.

Evidence: component catalog, component/interaction tests, accessibility results and representative visual baselines at 390, 768 and 1440 CSS pixels.

## M6 — Complete native Svelte and TypeScript migration

- [ ] Port every feature-matrix row to typed Svelte components and typed services, using the shared atomic design system and Tailwind theme. Routing, home/room navigation, composer and account UI are included, not just the already-migrated room panels.
- [ ] Port document/editor lifecycle, files/viewers, embeds/MCP connections, agents/sandboxes, mobile sheets and PWA/push/install flows. Existing third-party editor/protocol internals remain dependencies; first-party integration code is TypeScript.
- [ ] Remove `svelte/legacy/host.js` and its preview dependency/mount compatibility layer after replacement. The final preview module graph contains no legacy host, copied vanilla application entry or hidden iframe running vanilla to provide missing features.
- [ ] Remove first-party string-based application rendering, direct DOM replacement/event wiring and component-style injection replaced by Svelte. Narrow, typed vendor/DOM adapters are permitted for actual interop; recreating the monolithic host inside an adapter is not.
- [ ] Preserve drafts, scroll/history/reply context and keyed state during ordinary updates. Scope drafts to room/thread. Dispose sockets, reconnect timers, observers, subscriptions and Yjs providers on transitions, including delayed imports and queued callbacks.
- [ ] Verify both local actions and remote updates for the complete matrix, with persistence after reload and simultaneous vanilla/Svelte clients. Maintain i18n, authentication/membership behavior, mobile interactions and current vanilla feature compatibility.
- [ ] Every matrix row has a passing verification reference. An omitted capability, disabled button or placeholder cannot count as migrated.

Evidence: completed feature matrix, module-graph report, first-party JS/legacy-rendering audit, component tests and real browser integration results.

## M7 — Developer experience, regression and performance gates

- [ ] Provide documented frontend HMR with the local Worker/backend. Cold start, component edits, shared-contract edits and reloads work without manually rebuilding the app for each change. Production behavior stays separate from development URLs/code.
Source workflow and pending runtime acceptance: [full app development](svelte-app-development.md). The HMR gate stays open until its browser acceptance passes.

- [ ] Required checks cover frontend/backend/shared/tooling typing, protocol/RPC tests, bundle isolation, style policy, component behavior, build/version consistency, formatting and the relevant browser suite. Fresh install/build instructions work in a clean checkout.
- [ ] Frontend releases keep deterministic asset/update versions, all generated preview assets are consistent, and no preview build rewrites vanilla assets. Review source-to-artifact boundaries, including independently loaded editor code.
- [ ] Real browser checks cover English/Portuguese, light/dark, desktop/mobile, keyboard flows, permission/error states, two concurrent clients and collaborative editing. No uncaught errors or failed required assets remain.
- [ ] Benchmark complete vanilla versus complete Svelte with equivalent data, history windows and user actions. Use at least 1,000 messages, 30 epics and 200 tasks; seven alternating runs per variant; desktop and 390px mobile with 4x CPU throttling. Fix browser/version, network, cache and readiness definitions; publish raw samples and medians.
- [ ] Measure readiness, thread switching, loading older history, downloaded JS/CSS/font bytes, post-GC heap and repeated navigation/editor lifecycle. Do not claim a framework-only speedup from unlike feature sets or different validation work.
- [ ] Meet the initial budgets below, or obtain an explicit amendment before signing off. Record measurements and any approved amendment in the completion report; a failed budget cannot be silently ignored.

Initial budgets for adopting this plan as a goal:

| Metric                                                                 | Budget                                                                                    |
| ---------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| Readiness, thread switch and history-load medians, each device profile | Svelte ≤ the larger of `1.20 × vanilla` and `vanilla + 50 ms`                             |
| Initial downloaded application JS + CSS, gzip                          | Svelte ≤ vanilla + 30 KiB                                                                 |
| Font transfer                                                          | Record separately; Svelte ≤ vanilla + 100 KiB, using the actual Studio fonts              |
| Post-GC JS heap on the common fixture                                  | Svelte ≤ vanilla + 8 MiB                                                                  |
| Twenty room/thread/editor open-close cycles                            | No retained inactive-room sockets/providers/observers or growing detached component trees |

These are plan acceptance choices, not measurements or a claim that Svelte is faster. Compare the actual product versions; use a separately controlled equivalent rendering experiment before attributing differences to a framework.

## M8 — Publish and verify the completed version

- [ ] Publish the fully migrated, Tailwind-only Svelte app online with its final commit/build/check identifiers. Keep `/b/ROOM` vanilla and `/b/ROOM?ui=svelte` Svelte; publish equivalent home/thread links.
- [ ] Verify the final deployed revision in authenticated production sessions for both variants against the same designated test room, including a bidirectional live update and document synchronization. Public login pages returning 200 alone do not satisfy this gate.
- [ ] Verify real production module/CSS/font loading, version-specific update metadata, login/OAuth continuation, reload/Back/room navigation, mobile layout and zero uncaught errors. Capture evidence without exposing cookies or credentials.
- [ ] Compare vanilla source/assets and behavior with the current vanilla baseline and account for intentional concurrent changes. No vanilla feature, PWA/push work, endpoint compatibility or existing data was removed/revoked by the migration.
- [ ] Document rollback to vanilla and test it without data loss. Keep vanilla default; promote/remove it only through a later explicit decision.
- [ ] Obtain maintainer acceptance of the full migration against this file, with all functional, styling, Studio-theme, typing/RPC, accessibility and performance gates addressed. Product experimentation may continue; unchecked mandatory migration criteria may not be labeled complete.

## Evidence and final sign-off

Write `docs/svelte-migration/completion.md` containing the final deployed commit, both online URLs, clean-checkout commands/results, schema/RPC coverage, zero-legacy and style-audit results, Studio reference/token/font comparisons, gallery/accessibility evidence, feature matrix, browser results, performance samples and rollback verification. Link artifacts to the exact tested code revision; do not reuse earlier hybrid-preview results as proof of the final system.

- [ ] M0 through M8 are complete, with every checkbox above supported by current evidence.
- [ ] There are zero unexplained first-party JavaScript/legacy host dependencies, manually duplicated API contracts or non-Tailwind styling exceptions.
- [ ] Exactly one authored Tailwind file and the narrowly scoped vendor manifest satisfy the source/build audit.
- [ ] The Studio typography and palette comparison passes; all first-party screens actually use the atomic design system.
- [ ] The final fully migrated version is online and authenticated cross-client checks pass; vanilla remains maintained and default.
- [ ] The completion report records maintainer sign-off and any explicit amendments. Missing evidence or unresolved mandatory criteria means the goal remains incomplete.

Sign-off fields: deployed commit; check-run URLs; vanilla URL; Svelte URL; Studio reference digest; style-audit result; RPC/type-test result; functional/accessibility/performance report links; approved amendments; maintainer; acceptance date.

## Implementation references

- [shadcn-svelte source ownership and component approach](https://www.shadcn-svelte.com/docs)
- [shadcn-svelte Vite installation](https://www.shadcn-svelte.com/docs/installation/vite) and [theming](https://www.shadcn-svelte.com/docs/theming)
- [Tailwind Vite integration](https://tailwindcss.com/docs/installation/using-vite) and [theme variables](https://tailwindcss.com/docs/theme)
- [Bits UI](https://www.bits-ui.com/docs/introduction)
- [Hono inferred RPC](https://hono.dev/docs/guides/rpc)
- [Zod Mini](https://zod.dev/packages/mini)

The earlier `svelte-rollout-plan.md` describes the initial online-preview rollout. This file is the acceptance specification for the complete migration, including the subsequent design-system and Studio-theme requirements.
