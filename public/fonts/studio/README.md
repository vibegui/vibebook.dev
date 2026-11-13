# Studio font assets

These unmodified WOFF2 files come from the frozen deco Studio reference recorded in `docs/svelte-migration/studio-tokens.json`. Source URLs, byte counts and SHA-256 digests are recorded in `docs/svelte-migration/font-assets.json`. Filenames contain a digest prefix so a changed font cannot silently reuse an immutable asset URL.

- Inter variable normal and italic: [Inter project](https://github.com/rsms/inter), SIL Open Font License 1.1. Preserve `Inter-LICENSE.txt`.
- Commit Mono variable: [Commit Mono project](https://github.com/eigilnikolajsen/commit-mono), SIL Open Font License 1.1. Preserve `CommitMono-LICENSE.txt`. The website's separate MIT license does not replace the font license.

Fonts are registered only in `svelte/styles/tailwind.css`; no external font stylesheet is needed by the migrated components. Switzer is not redistributed or assigned to headings without verification of its actual workspace role and licensing.

Native gallery checks verify loaded Inter/Commit Mono, computed font families/weights and frozen-source token roles. Actual authenticated workspace role comparisons and the final transfer-size budget remain acceptance gates. Copying the source fonts alone does not complete the Studio theme.
