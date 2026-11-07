# Shared by the plugin's scripts: where the vibebook CLI is.
VB=$(command -v vibebook 2>/dev/null || true)
[ -n "$VB" ] || VB="$HOME/.vibebook/bin/vibebook"
HERDR=${HERDR_BIN_PATH:-herdr}
