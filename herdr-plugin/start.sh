#!/bin/sh
# Open the runner tab, unless a runner is already going (it keeps a pid file; one per machine).
. ./lib.sh
pid=$(cat "$HOME/.vibebook/herdr.pid" 2>/dev/null || true)
if [ -n "$pid" ] && kill -0 "$pid" 2>/dev/null; then exit 0; fi
exec "$HERDR" plugin pane open --plugin vibebook --entrypoint runner --placement tab --no-focus
