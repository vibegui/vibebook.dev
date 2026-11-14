# Native chat frames: bounded migration slice

The real Chat mount owns ordinary and quiet message frames, stable message anchors, author/time metadata, copy/reply/quote/origin controls, attachments, receipt/ack footers, working indicators and archived/production end markers. The host no longer appends receipt/status/end HTML into Svelte-owned message bodies. Native quiet rows fold adjacent matching reminders and issues without changing canonical messages; origin copies omit message IDs and self-linking thread cards.

F22 includes the ongoing vanilla compact receipt requirement observed in `public/app.html` (`seenPill`): at most five profile/agent marks, overflow count, distinct read/delivered state, and details available by hover, focus and tap. The preceding Svelte host rendered the older textual receipt variant. This slice implements the compact presentation and typed receipt/ack projection instead of copying that outdated Svelte presentation.

## Explicit pending integrations

`LegacyChatIntegrations` is a temporary body-fragment contract, not a native rich-content implementation. It cannot return frames, message actions, attachments or footers.

The former rich-text, interactive-body and thread-card HTML fragments are now native. See [rich text](native-rich-text.md), [interactive bodies](native-chat-interactive.md) and [room sidebar/thread outputs](native-room-sidebar.md). The final `LegacyChatContent` integration and markup adapter are removed from the real Message mount.

`ChatActions.mountEmbed` explicitly retains the F49 app protocol as a temporary lifecycle integration. Native Embed owns sandboxed iframe markup, intrinsic bounded media geometry, inline consent queues and disposal. The host registers exact frames and checks null origin/source plus mounted-room/thread identity; consent completion is rechecked before writes. This protocol integration is not a completed native Apps migration.

The host still owns history paging, deep-message navigation, scroll anchoring and the room shell. Native Composer and Viewer own their separate accepted source slices; private message projection is typed. Scoped callbacks name those remaining integrations directly. No Boolean send contract is widened; this read/presentation slice introduces no new server mutation protocol.

No reaction schema, command or UI was found in the inspected baseline. Emoji input/shortcodes are separate existing features and remain intact.

## Validation scope

Pure tests cover immutable folding, continuity boundaries, authoritative ack deduplication/expiry, receipt targeting and self-agent exclusion, workers, and canonical descendant-file projection. DOM tests cover streaming anchor stability, quotes/origins, quiet rows, typed actions, exact attachment IDs and iframe sandboxing, compact receipt interaction, explicit rich-body preservation and disposal after room replacement.

Only the focused pure suite may be run during source implementation. DOM, type, style, build, browser, mobile/scroll, and published artifact gates require root integration validation. F15–F23 remain pending as full parity rows; this document is not evidence of full chat or M6 completion.
