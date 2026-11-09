// PreToolUse hook on Bash: a command that only runs the vibebook CLI (optionally after `cd <dir>` and piped to `jq`)
// is approved without a prompt, so a Claude talking to its room doesn't stop at the terminal (or post a ⏸ ask).
// Anything that could run something else is left to the normal permission flow: $(…), backticks, $VAR, redirections,
// background &, subshells, or any other program in the chain.
import { pathToFileURL } from "node:url";

const OK = new Set(["vibebook", "jq", "cd"]);
const SUBS = new Set(["call", "listen", "upload", "status", "tools", "describe"]);

// Splits a shell command into segments (on unquoted && || ; | and newlines). Returns null when it can't vouch for it.
export function segments(cmd) {
  const segs = [];
  let cur = "", q = null;
  for (let i = 0; i < cmd.length; i++) {
    const c = cmd[i];
    if (q === "'") { cur += c; if (c === "'") q = null; continue; }
    if (c === "\\") { if (q === '"' || i + 1 >= cmd.length) return null; cur += c + cmd[++i]; continue; }
    if (c === "$" || c === "`") return null;
    if (q === '"') { cur += c; if (c === '"') q = null; continue; }
    if (c === "'" || c === '"') { q = c; cur += c; continue; }
    if (c === ";" || c === "\n" || c === "|" || c === "&") {
      if (c === "&" && cmd[i + 1] !== "&") return null;
      if ((c === "&" || c === "|") && cmd[i + 1] === c) i++;
      segs.push(cur); cur = ""; continue;
    }
    if ("<>(){}".includes(c) && !q) return null;
    cur += c;
  }
  if (q) return null;
  segs.push(cur);
  return segs.map((s) => s.trim()).filter(Boolean);
}

export function allowed(cmd) {
  const segs = typeof cmd === "string" && segments(cmd);
  if (!segs || !segs.length) return false;
  let vb = false;
  for (const s of segs) {
    const [prog, sub, tool] = s.split(/\s+/);
    const name = prog.endsWith("/vibebook") ? "vibebook" : prog;
    if (!OK.has(name)) return false;
    if (name !== "vibebook") continue;
    // Not login/logout (could point the session at another origin), statusline (runs a command), herdr/update.
    if (!SUBS.has(sub)) return false;
    // Running commands in a cloud sandbox is not "talking to the room": that keeps its prompt.
    if (sub === "call" && /^['"]?sandbox_/.test(tool || "")) return false;
    vb = true;
  }
  return vb;
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) {
  let d = "";
  process.stdin.on("data", (c) => (d += c)).on("end", () => {
    let j = {};
    try { j = JSON.parse(d); } catch {}
    if (j.tool_name !== "Bash" || !allowed(j.tool_input?.command)) return;
    process.stdout.write(JSON.stringify({ hookSpecificOutput: { hookEventName: "PreToolUse", permissionDecision: "allow", permissionDecisionReason: "vibebook CLI call" } }));
  });
}
