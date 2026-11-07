#!/bin/sh
# Build step: install the vibebook CLI if it isn't there. It never logs in for you.
. ./lib.sh
if [ -x "$VB" ]; then echo "vibebook CLI found: $VB"; exit 0; fi
echo "Installing the vibebook CLI (https://vibebook.dev/install.sh)…"
curl -fsSL https://vibebook.dev/install.sh | sh
