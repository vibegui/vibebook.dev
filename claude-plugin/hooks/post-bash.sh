#!/bin/sh
# PostToolUse(Bash): after a push, a PR or a deploy in a repo linked to a room, remind Claude to report it there.
room=$(sed -n 's/^room_id=//p' "${CLAUDE_PROJECT_DIR:-.}/.vibebook" 2>/dev/null | head -n 1)
# No .vibebook? A room link in README/AGENTS/CLAUDE (the vibebook badge) links the repo too.
[ -n "$room" ] || room=$(cd "${CLAUDE_PROJECT_DIR:-.}" 2>/dev/null && cat README.md AGENTS.md CLAUDE.md 2>/dev/null | grep -oE 'vibebook\.dev/b/[a-z0-9]{12}' | head -n 1 | cut -d/ -f3)
[ -n "$room" ] || exit 0
# Only the command itself, and only when it runs the push/PR/deploy (not a grep or a heredoc that mentions one).
cmd=$(sed -nE 's/.*"command":"(([^"\\]|\\.)*)".*/\1/p' | head -n 1)
printf '%s' "$cmd" | grep -Eq '(^|[;&|(]|\\n)[[:space:]]*(git push|gh pr (create|ready|merge)|(npx |bunx )?wrangler deploy|bun run deploy)' || exit 0
printf '{"hookSpecificOutput":{"hookEventName":"PostToolUse","additionalContext":"vibebook: that looked like a push, PR or deploy. If it succeeded and matters to the project (not a WIP push): a PR goes as one short line in its epic in vibebook room %s with the link; a push to main that deploys, or a CLI publish, goes ONCE the build is green as a native deploy banner in the room main thread (post with a card: Card title starting with a rocket and the commit or version, one Field per change, Actions with a LinkButton to each epic it came from (#e<epic id>) and one to the commit). Move the related task (review for a PR waiting on someone, done when shipped). Follow the vibebook skill."}}\n' "$room"
