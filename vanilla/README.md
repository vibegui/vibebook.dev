# Preserved vanilla application sources

The current default application remains `public/app.html`, its independently committed Inbox bundle `public/svelte/ui.js`, and its editor `public/collab.js`.

`inbox/` preserves the default application's typed Inbox component, bridge types and build entry. `bun run build:vanilla-ui` builds this source only. It must not import preview components, Tailwind, preview CSS or preview feature services. Changes to the Svelte design system cannot change this source graph or the default application.

This directory is outside the new Svelte application's style-migration scope. Continue maintaining vanilla here and in its existing application files until an explicit adoption decision retires it. Do not replace rebuildable vanilla sources with a permanently frozen compiled asset.
