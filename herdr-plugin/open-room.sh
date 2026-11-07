#!/bin/sh
# Jump to a room's workspace: from a clicked vibebook.dev/b/<id> link, else the room linked to this folder.
. ./lib.sh
room=$(printf '%s' "${HERDR_PLUGIN_CLICKED_URL:-}" | sed -n 's#^https://vibebook\.dev/b/\([a-z0-9]*\).*#\1#p')
if [ -z "$room" ] && [ -f .vibebook ]; then room=$(sed -n 's/^room_id=//p' .vibebook | head -1); fi
if [ -z "$room" ]; then "$HERDR" notification show "vibebook" --body "No room here: click a vibebook.dev/b/… link."; exit 0; fi
out=$(curl -s -H "Origin: https://vibebook.dev" "http://127.0.0.1:${VIBEBOOK_HERDR_PORT:-47321}/focus?room=$room" || true)
case "$out" in
  *'"ok":true'*) exit 0 ;;
  *) "$HERDR" notification show "vibebook" --body "That room has no Claude on. Switch ✻ on in the room: https://vibebook.dev/b/$room" ;;
esac
