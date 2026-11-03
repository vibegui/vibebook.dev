#!/bin/sh
# PostToolUse(Bash): after a push, a PR or a deploy in a repo linked to a room, remind Claude to report it there.
room=$(sed -n 's/^room_id=//p' "${CLAUDE_PROJECT_DIR:-.}/.vibebook" 2>/dev/null | head -n 1)
[ -n "$room" ] || exit 0
grep -Eq 'git push|gh pr (create|ready|merge)|wrangler deploy|bun run deploy' || exit 0
printf '{"hookSpecificOutput":{"hookEventName":"PostToolUse","additionalContext":"vibebook: that looked like a push, PR or deploy. If it succeeded and matters to the project (not a WIP push), post one short line in vibebook room %s with the link (commit, PR or URL) and what it is for, and move the related task (review for a PR waiting on someone, done when shipped). Follow the vibebook skill."}}\n' "$room"
