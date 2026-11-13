# Native authentication and access slice

Source implementation, not final migration acceptance. Vanilla stays default. Select
`?ui=svelte` on `/login`, a room link `/b/ROOM`, or `/authorize` to request the
native page. Room members still get the incremental Svelte application.

The server validates a consent request and identifies the session before serving
its native shell. The native page reads the published `/api/authorize/context`:
that endpoint validates the OAuth request, creates the consent transaction and
sets its binding cookie. Approval/denial remains a real browser form POST to
`/authorize` with `handle` and `decision=approve|deny`. Cancel is first in the
form's DOM order. A submission without an approval decision follows the existing
provider's default denial. The native page does not approve on mount, focus,
context loading, or error retry. “Not you?” remains the existing form POST to
`/auth/logout`, carrying the local authorization continuation.

The native consent form requires JavaScript to fetch its context. The shell's
`noscript` link removes only the explicit UI selection and opens the existing
standard server consent page, which works without JavaScript. Native login and
access flows also require JavaScript; this is not a claim that the entire app
works without it. OAuth callback navigation and provider consent POST results
stay owned by the backend/provider. A server-rejected, expired POST may still
return the existing provider error page; the POST behavior is preserved.

The minimal shell copies exactly one matching versioned generated app module and
Tailwind CSS reference from the existing preview shell. Missing, duplicate,
unversioned, or mismatched references fail visibly with 503. The shared
`UI_VERSION_HEX_LENGTH` is used by both the builder and reference validator.
`vb-v` equals the selected module/CSS `?v` digest. Native pages have only public
`vb-page`, `vb-auto-access`, UI selection and locale metadata. Session cookies,
email codes, consent handles and identities are not embedded in the initial
HTML. Room titles remain public link-preview metadata, matching existing access
behavior. Context data arrives through schema-validated typed endpoints.

The bootstrap checks `vb-page` before importing the legacy application host.
Native mounting restores only a validated explicit `vb.theme` light/dark preference;
storage failures leave the system theme usable. Native pages key async session
ownership to page, origin/path/query and automatic-access metadata.
Native auth imports the sole Tailwind entry through that bootstrap and does not
load legacy application CSS, Google font CSS, vendor Markdown scripts or legacy
host chrome. Native async tasks have a 20-second deadline, abort on disposal and
ignore replaced/expired completions. They keep drafts on failure, avoid duplicate
submissions, and never retry writes automatically. An access page polls its
canonical context while a request is pending and disposes that poll on departure.
Automatic access requests retain the existing server-side same-origin Referer
and `pedir` rule; a bare room link does not send a request.

`native-auth.test.ts` exercises navigation safety, shell isolation/versioning,
actual Hono adapter response validation, OAuth query preservation, deadlines,
duplicate/error/draft handling, access polling and stale/disposed result guards.
`native-auth-dom.test.ts` compiles the actual components for DOM-level form,
provider-link, escaping, focus, and default-denial checks; these are component
fixtures, not E2E evidence. Run it with `bun test --conditions=browser`.

Still required at integration: frontend/backend/tooling checks, fresh generated
API declarations and preview build, default-vanilla/artifact/style gates, real
EN/PT light/dark desktop/mobile browser checks, actual code-email login including
invalid/expired/rate-limited attempts, room access approval across two sessions,
real provider authorize/deny/logout and PKCE callback completion, direct and
continued `?ui=svelte` links, no-JavaScript standard consent, HMR source-shell
transformation and zero legacy-host imports on native page routes. No such
runtime result is implied by source/component tests.
