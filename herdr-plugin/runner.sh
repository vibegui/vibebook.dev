#!/bin/sh
# The runner pane. Needs a login once; then it keeps one Claude per room you switched on.
. ./lib.sh
if [ ! -x "$VB" ]; then echo "vibebook CLI missing: curl -fsSL https://vibebook.dev/install.sh | sh"; exec sleep 86400; fi
if [ ! -f "$HOME/.vibebook/session.json" ]; then
  echo "First time: connecting this machine to vibebook (your browser opens)…"
  "$VB" login || { echo "Login didn't finish. Run: vibebook login"; exec sleep 86400; }
fi
exec "$VB" herdr
