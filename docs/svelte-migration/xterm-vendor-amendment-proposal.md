# Approved scoped terminal vendor amendment

Status: explicitly approved by the maintainer on 2026-11-13 through the scoped xterm decision. The migration plan now records the approved fourth family. Manifest/enforcement updates, pinned installation, implementation and runtime verification remain pending; approval alone is not acceptance evidence. The exact scope below remains binding.

The current maintained vanilla and hybrid terminal use `@xterm/xterm` 5.5.0 and `@xterm/addon-fit` 0.10.0 from jsDelivr. Preserve those exact versions initially. Both packages declare MIT licensing; addon-fit declares peer compatibility with `@xterm/xterm ^5.0.0`. Package metadata is evidence of compatibility intent, not completed native integration/runtime verification.

| Artifact | Exact source URL | Bytes | SHA-256 |
| --- | --- | --- | --- |
| Required upstream terminal CSS | `https://cdn.jsdelivr.net/npm/@xterm/xterm@5.5.0/css/xterm.css` | 5559 | `ba8e6985669488981ccf40c0cefe3aba80722cb6c92de7ad628b0bd717faf2b6` |
| Terminal renderer/runtime injectors | `https://cdn.jsdelivr.net/npm/@xterm/xterm@5.5.0/lib/xterm.js` | 289441 | `1f991ac3b4b283ebf96e60ae23a00a52765dd3a2e46fa6fdda9f1aab032f7495` |
| Fit addon | `https://cdn.jsdelivr.net/npm/@xterm/addon-fit@0.10.0/lib/addon-fit.js` | 1497 | `bdaefa370b1bfc42ee88d46fe6072400902a4d4b2d45cd93438dda9b23c97089` |

These bounded read-only artifact fetches were measured locally. No package installation or shared dependency mutation was performed. During the later approved dependency install, compare installed package bytes to these digests and preserve upstream license notices in shipped artifacts. Package metadata sources: `https://cdn.jsdelivr.net/npm/@xterm/xterm@5.5.0/package.json` and `https://cdn.jsdelivr.net/npm/@xterm/addon-fit@0.10.0/package.json`.

## Exact requested exception

Add one fourth family, **xterm terminal rendering internals**, limited to a native terminal's vendor-owned descendant subtree. Exact package pins:

```json
{
  "@xterm/xterm": "5.5.0",
  "@xterm/addon-fit": "0.10.0"
}
```

Approved sources would be only:

- `@xterm/xterm/css/xterm.css`: native terminal viewport, hidden input/IME, screen rows, selection/accessibility and decoration structure.
- `@xterm/xterm/lib/xterm.js`: dependency-owned canvas/DOM terminal rendering, font/cell measurement, cursor/selection/scroll geometry and terminal-generated palette styles. The inspected bundle creates `_dimensionsStyleElement` and `_themeStyleElement` inside its screen element; those injectors must be explicitly attributed rather than hidden behind a first-party adapter.
- `@xterm/addon-fit/lib/addon-fit.js`: dependency cell/viewport measurement and `Terminal.resize` integration only. It is not permission for application styling or additional vendor themes.

All vendor DOM/style nodes and geometry must live beneath the single native terminal renderer mount. Disposable observers, key/data handlers, WebSocket ownership and resize callbacks belong to the typed first-party adapter. An old room/account, closed dialog or replaced terminal cannot write, resize, reconnect or focus the new owner.

The static stylesheet would enter exclusively through `svelte/styles/tailwind.css`, using one package import in a named layer:

```css
@import "@xterm/xterm/css/xterm.css" layer(components);
```

No CDN stylesheet link, second first-party stylesheet, copied vendor CSS, global `window.Terminal`, arbitrary `node_modules` exception or first-party stylesheet injector is requested. Native dialog, toolbar, status, error, mobile key row and surrounding layout remain shared atoms and Tailwind/Studio utilities. The native mount's `.composition-view` appearance must use finite Tailwind descendant utilities to override upstream fixed black/white IME colors.

## Palette and typography decision included in this amendment

The pinned renderer draws text into its canvas or generates its own DOM theme stylesheet. Tailwind cannot directly recolor those pixels. To keep the app's terminal base appearance aligned with Studio in both themes, this proposal additionally requests permission for the renderer's **native semantic theme options only**: background, foreground, cursor, cursorAccent and selectionBackground from the mount's resolved Studio token colors. Font family and size come from the native mount's resolved monospace typography. Theme changes update those renderer options while preserving the same terminal/session.

This is an explicit additional exception to the current prohibition on first-party style objects forwarded through vendor APIs. It permits no CSS selectors, declaration objects, ad hoc colors or application appearance through those options. Terminal-protocol ANSI/true-color content remains terminal data rendered by the dependency, as required for existing shell programs. No application controls are placed inside the terminal to evade atomic/Tailwind rules.

If this native theme-option exception is declined, a different library-supported method must be demonstrated to satisfy Studio colors/typography without weakening terminal behavior. Keeping an unexplained hard-coded black surface in light mode, reimplementing terminal rendering, dropping IME/selection/accessibility behavior or silently retaining a fourth undeclared family is not an accepted fallback.

## Proposed enforcement and acceptance changes

After explicit approval, update the plan's family table/count, add the exact fourth manifest entry and teach the existing style policy the narrowly named package/source/hash set. Keep rejection fixtures for unknown families, wildcard dependencies, arbitrary theme imports, first-party style directives and copied vendor styles. Add a digest fixture for installed CSS/runtime bytes and verify the emitted stylesheet contains the dependency through the sole entry.

Required terminal evidence includes authenticated owner-only terminal retrieval, real PTY bytes/Unicode, mobile Esc/Tab/Ctrl-C/arrows/slash keys, resize, focus, selection/IME and keyboard operation in both themes. Exercise terminal close, room/account change and late credential/socket callbacks, plus a user-hidden document pane and disconnected/error/reopen paths. The 15-minute terminal identity token goes only to the exact authorized WebSocket subprotocol; it is never rendered, persisted or logged. No actual sandbox lifecycle or PTY/browser success is claimed by this proposal.
