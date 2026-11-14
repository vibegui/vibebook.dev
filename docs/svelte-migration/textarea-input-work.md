# Typing-path source finding

At `c3e057c`, both default Home (`wireAsk`) and room textarea input handlers reset
inline height to `auto`, synchronously read `scrollHeight`, then write a pixel
height on every input. Writing style before the geometry read can force layout
inside the input handler. This is concrete avoidable work, not a measured cause
of the user's reported lag or a measured latency improvement.

The bounded fix prefers `field-sizing: content` where the browser advertises
support. It activates after the first edit, retaining original initial rows and
all existing min/max/width constraints. It adds the presentation marker only once
and performs no inline height write or geometry read in that supported path.
Unsupported/absent CSS detection preserves the exact prior auto/read/pixel-write
fallback. Room mention handling remains synchronous. Keyboard/composition/send,
paste/dictation, data handling and default variant selection are unchanged.

The focused regression executes the actual extracted shared sizing function and
the actual Home/room input handlers against observed geometry/style ports. It
checks 100 repeated inputs, no supported-path synchronous measurement, one marker
activation, retained mention calls, and exact fallback order. It does not establish
real browser growth/shrink geometry, selection, IME, keyboard viewport behavior or
end-to-end typing latency. Those require root's real-browser verification.

The native room composer already uses CSS `field-sizing: content`. Its input path
edits the account-owned in-memory draft and updates caret/mention state, with no
`scrollHeight`/inline style measurement, persistence write or room/network dispatch
found per key. Mention matching scans the draft prefix; newline rows are derived
from draft text and the orphan-draft subscriber may inspect the bounded draft bank.
Native Home updates its draft and clears obsolete routing results. This source
inspection does not prove those native paths meet latency budgets; none is changed
in this default-only fix.

Author verification: the focused test/docs formatter and package/tooling-config
format check passed. The actual-handler suite passed two tests / 20 assertions
with Bun 1.4.4 in 1.477 seconds. No compiler, real-browser sizing/typing measurement
or remote job ran for this checkpoint. Browser performance remains unmeasured.
