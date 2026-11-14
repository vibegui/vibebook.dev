# Native attachment screenshot crop

The native chat image preview follows the vanilla attachment rule introduced in `3fff34fa1d5420e1b2ee12a003b5fef2bfa8309a`: maximum width 320px, maximum height 260px, minimum readable width 220px, a border and rounded corners, `object-fit: cover`, and top positioning. The file viewer continues to show the complete image with `object-fit: contain`.

The native anchor owns the minimum width, clamped to its parent's available width; its image fills that minimum. This avoids the cyclic percentage sizing of an auto-width anchor. Below 220px the native preview fits the parent instead of retaining vanilla's overflowing fixed minimum. Vanilla assets are unchanged. Image actions preserve immutable file identity; callbacks on removed image anchors are inert even while the surrounding attachment component remains mounted.

The DOM regression in `scripts/ui-panels.test.ts` checks exact file actions and detached-anchor ownership. Happy DOM does not measure layout.

`scripts/native-attachment-crop-browser.ts` is the separate real geometry gate. It requires an already built loopback DEV_EMAIL Worker. It creates a real room, generates deterministic normal/square/wide/tall PNG bytes, uploads through the typed HTTP client, and posts those file IDs through a real Book WebSocket command. It never intercepts or replaces room/API state. Geometry at normal widths is compared with the image rule extracted from actual vanilla source. A reference element and an explicitly constrained 180px attachment parent are controlled layout probes, not claims about natural application/network ordering. A screenshot pixel proves the tall preview shows its dark top; clicking opens the same immutable file in the full-image viewer. The JSON report records the supplied app revision, actual loaded `vb-v`, dimensions, source dimensions, and scope limitations. Failure artifacts contain only this isolated fixture room.

Run after building and starting the Worker, with no other browser/checker process:

```sh
TEST_BASE_URL=http://127.0.0.1:8797 TEST_APP_REVISION="$(git rev-parse HEAD)" bun scripts/native-attachment-crop-browser.ts
```

At source authoring time the DOM, type, build and browser gates remain unrun. Safari and production acceptance remain separate gates.
