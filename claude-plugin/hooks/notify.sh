#!/bin/sh
# Notification hook: Claude Code stopped at a permission prompt (or a question dialog) in this terminal. In a repo
# linked to a vibebook room, mark this Claude's ack there as "blocked" with the prompt, so the room shows
# "⏸ espera você no terminal" and the person sees it waits on them. No-op elsewhere; never blocks Claude.
command -v vibebook >/dev/null 2>&1 || exit 0
command -v node >/dev/null 2>&1 || exit 0
root=$(git rev-parse --show-toplevel 2>/dev/null) || exit 0
[ -f "$root/.vibebook" ] || grep -qs "vibebook.dev/b/" "$root/README.md" "$root/AGENTS.md" "$root/CLAUDE.md" || exit 0
args=$(node -e 'let d="";process.stdin.on("data",c=>d+=c).on("end",()=>{let j={};try{j=JSON.parse(d)}catch{};const t=String(j.notification_type||"");if(t&&!/permission|elicitation/.test(t))return;const m=String(j.message||"").slice(0,200);if(!m)return;process.stdout.write(JSON.stringify({status:"blocked",note:m}))})') || exit 0
[ -n "$args" ] || exit 0
( vibebook call ack "$args" >/dev/null 2>&1 & )
exit 0
