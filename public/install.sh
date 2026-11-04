#!/bin/sh
# vibebook CLI installer: curl -fsSL https://vibebook.dev/install.sh | sh
# Puts the CLI in ~/.vibebook and a `vibebook` command in ~/.vibebook/bin (linked into ~/.local/bin when it's on PATH).
set -e
ORIGIN="${VIBEBOOK_ORIGIN:-https://vibebook.dev}"
DIR="${VIBEBOOK_HOME:-$HOME/.vibebook}"
if command -v node >/dev/null 2>&1; then RUN=node; elif command -v bun >/dev/null 2>&1; then RUN=bun; else
  echo "vibebook needs Node.js 18+ or Bun. Install one (https://bun.com) and run this again." >&2; exit 1; fi
mkdir -p "$DIR/bin"
curl -fsSL "$ORIGIN/cli.mjs" -o "$DIR/cli.mjs"
cat > "$DIR/bin/vibebook" <<SH
#!/bin/sh
exec $RUN "$DIR/cli.mjs" "\$@"
SH
chmod +x "$DIR/bin/vibebook"
case ":$PATH:" in
  *":$HOME/.local/bin:"*) mkdir -p "$HOME/.local/bin"; ln -sf "$DIR/bin/vibebook" "$HOME/.local/bin/vibebook"; echo "vibebook installed: $(command -v vibebook || echo "$HOME/.local/bin/vibebook")";;
  *) echo "vibebook installed at $DIR/bin/vibebook (add $DIR/bin to your PATH, or call it by that path)";;
esac
echo "Next: vibebook login"
