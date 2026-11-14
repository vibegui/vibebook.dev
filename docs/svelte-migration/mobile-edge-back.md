# Native phone left-edge Back parity

Ports main `12d68b7` without taking over browser/Safari history gestures. A touch
starting within the phone's leftmost 24 CSS pixels cannot become a message reply
or copy. The room-owned listener is passive; it never prevents the browser action.
Only installed mode maps a rightward gesture over 60 pixels, with smaller vertical
movement, to the same scoped action as the visible header Back button.

The header now matches the actual vanilla baseline: inside an epic/suggestion it
returns to the main thread; in main it opens Home. Existing RoomScope/Viewer/sheet
navigation gates remain responsible for that transition. Each gesture captures its
thread, and route/owner/media change, multitouch, touchcancel and disposal invalidate
it. The room's existing cell attachment owns listener cleanup. No Frame/type or
geometry presentation change is introduced.

Four pure cases cover edge bounds, thresholds, browser versus installed mode,
prototype-getter Touch coordinates, cancellation and ownership transitions. An
actual DOM source case composes the real swipe action and passive room listener,
checks no edge default-prevention/reply, nonedge reply, and disposal. That case is
unrun until the normal component/browser gates. Real iOS installed/Safari gestures
and Back/Forward integration require device/runtime verification.

Author verification: the combined edge/runner pure suite passed eight tests / 44
assertions with Bun 1.4.4 in 1.244 seconds; 12 owned paths formatted and both config
format checks passed. No compiler, DOM test or real browser/device ran here.
