#!/bin/sh
# PermissionRequest hook: Claude Code is about to ask for a permission in the terminal. In a repo linked to a vibebook
# room, ask the person in the room instead (Aprovar / Negar, only they can pick) and hand the answer back to Claude.
# No answer within VIBEBOOK_PERMISSION_WAIT seconds (default 120), or anything failing: no decision, and the usual
# terminal prompt shows. Only the tool's name and a short summary go to the room; the secret filter refuses the rest.
command -v vibebook >/dev/null 2>&1 || exit 0
command -v node >/dev/null 2>&1 || exit 0
root=$(git rev-parse --show-toplevel 2>/dev/null) || exit 0
[ -f "$root/.vibebook" ] || grep -qs "vibebook.dev/b/" "$root/README.md" "$root/AGENTS.md" "$root/CLAUDE.md" || exit 0
q=$(node -e '
let d="";process.stdin.on("data",c=>d+=c).on("end",()=>{
  let j={};try{j=JSON.parse(d)}catch{}
  const tool=String(j.tool_name||"uma ferramenta"), i=j.tool_input||{};
  const what=String(i.command||i.description||i.file_path||i.url||i.subject||i.to||JSON.stringify(i)).replace(/\s+/g," ").slice(0,220);
  // A plan to approve (ExitPlanMode) shows as the plan itself, not a cut JSON.
  if(tool==="ExitPlanMode"&&i.plan){process.stdout.write(JSON.stringify({text:"⏸ Seu Claude quer seguir com este plano:\n\n"+String(i.plan).slice(0,3000),choices:["Aprovar","Negar"]}));return}
  process.stdout.write(JSON.stringify({text:"⏸ Seu Claude pede permissão: **"+tool+"**\n`"+what.replace(/`/g,"ʼ")+"`\n\nSó vale a resposta da sua conta logada aqui.",choices:["Aprovar","Negar"]}));
})') || exit 0
id=$(vibebook call post "$q" 2>/dev/null | node -e 'let d="";process.stdin.on("data",c=>d+=c).on("end",()=>{try{const j=JSON.parse(d);if(j.ok&&j.id)process.stdout.write(String(j.id))}catch{}})')
[ -n "$id" ] || exit 0
end=$(( $(date +%s) + ${VIBEBOOK_PERMISSION_WAIT:-120} ))
while [ "$(date +%s)" -lt "$end" ]; do
  left=$(( end - $(date +%s) )); [ "$left" -gt 45 ] && left=45
  d=$(vibebook call permission_wait "{\"message_id\":$id,\"timeout_seconds\":$left}" 2>/dev/null | node -e 'let d="";process.stdin.on("data",c=>d+=c).on("end",()=>{try{const j=JSON.parse(d);if(j.decision)process.stdout.write(j.decision)}catch{}})')
  if [ -n "$d" ]; then
    printf '{"hookSpecificOutput":{"hookEventName":"PermissionRequest","decision":{"behavior":"%s"}}}\n' "$d"
    exit 0
  fi
done
exit 0
