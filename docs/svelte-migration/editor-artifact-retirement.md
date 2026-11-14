# Native editor artifact ownership

The native document owner loads `svelte/features/documents/editor.ts` through Vite. Its emitted lazy editor chunk is included in the preview's normal recursive JS/CSS content hash. Vanilla independently keeps `collab/editor.ts`, its `build:collab` command and `public/collab.js`.

The old host-only `public/collab-svelte.js`, `build:collab:svelte` command and Vite development compatibility route are removed. Native shell versions no longer depend on unused editor bytes. The version regression now changes an actual preview editor-chunk path and retains stable-rebuild, unrelated-vanilla-output and shell-cycle checks.

Local verification: `bun test scripts/ui-version.test.ts scripts/app-development.test.ts` passed 29 tests / 2,530 assertions (`/tmp/vibebook-native-editor-retirement1.log`). This covers the version/development boundary change; integrated native editor/Worker, collaboration and final build acceptance remain separate gates. The next clean build must regenerate and commit the shell's version query.
