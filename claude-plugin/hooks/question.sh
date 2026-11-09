#!/bin/sh
# PreToolUse hook on AskUserQuestion: in a repo linked to a vibebook room, the Claude's questions go to the room as
# clickable choices (only the person can pick; a typed reply counts as an "other" answer) and the answers come back to
# Claude as the hook's reason, so it carries on without the terminal. Any question unanswered within
# VIBEBOOK_QUESTION_WAIT seconds (default 120), or anything failing: no decision, and the terminal asks as usual.
command -v vibebook >/dev/null 2>&1 || exit 0
command -v node >/dev/null 2>&1 || exit 0
root=$(git rev-parse --show-toplevel 2>/dev/null) || exit 0
[ -f "$root/.vibebook" ] || grep -qs "vibebook.dev/b/" "$root/README.md" "$root/AGENTS.md" "$root/CLAUDE.md" || exit 0
exec node -e '
const { execFileSync, execFile } = require("node:child_process");
const call = (tool, args) => { try { return JSON.parse(execFileSync("vibebook", ["call", tool, JSON.stringify(args)], { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"], timeout: 60000 })); } catch { return {}; } };
// Async for the waits, so a SIGTERM from Claude Code is handled between them (a sync loop would never yield).
const callA = (tool, args) => new Promise((r) => execFile("vibebook", ["call", tool, JSON.stringify(args)], { encoding: "utf8", timeout: 60000 }, (e, out) => { try { r(JSON.parse(out)); } catch { r({}); } }));
let d = ""; process.stdin.on("data", (c) => (d += c)).on("end", async () => {
  let j = {}; try { j = JSON.parse(d); } catch {}
  const qs = (j.tool_input?.questions || []).slice(0, 4);
  if (!qs.length) return;
  const end = Date.now() + (Number(process.env.VIBEBOOK_QUESTION_WAIT) || 120) * 1000;
  const out = [];
  // A question left unanswered in the room went to the terminal: close it there (also when Claude Code ends this hook).
  let open = null;
  const close = () => { if (open) call("permission_close", { message_id: open }); open = null; };
  process.on("SIGTERM", () => { close(); process.exit(0); });
  for (const q of qs) {
    const opts = (q.options || []).map((o) => String(o.label ?? o).slice(0, 120)).filter(Boolean).slice(0, 8);
    const notes = (q.options || []).filter((o) => o.description).map((o) => `- **${o.label}**: ${String(o.description).slice(0, 200)}`).join("\n");
    const text = `❓ Seu Claude pergunta${q.header ? ` · **${String(q.header).slice(0, 40)}**` : ""}\n${String(q.question || "").slice(0, 600)}${notes ? `\n\n${notes}` : ""}`;
    const post = await callA("post", opts.length >= 2 ? { text, choices: opts, multi: !!q.multiSelect } : { text });
    if (!post.ok || !post.id) return;
    open = post.id;
    let answer = null;
    while (!answer && Date.now() < end) {
      const left = Math.min(45, Math.ceil((end - Date.now()) / 1000));
      if (left < 1) break;
      answer = (await callA("permission_wait", { message_id: post.id, timeout_seconds: left })).text || null;
    }
    if (!answer) return close(); // the terminal asks as usual
    open = null;
    out.push(`"${q.question}" → ${answer}`);
  }
  process.stdout.write(JSON.stringify({ hookSpecificOutput: { hookEventName: "PreToolUse", permissionDecision: "deny",
    permissionDecisionReason: `Your human answered in the vibebook room instead of the terminal (do not ask again; go on with these answers):\n${out.join("\n")}` } }));
});'
