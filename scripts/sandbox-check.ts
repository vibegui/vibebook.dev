// The sandbox setup script must parse in bash for any agents/<name>.md: the default template (a block with only a
// comment), no blocks, and real commands. An empty `( )` once killed every sandbox's setup. Run: bun scripts/sandbox-check.ts
import { spawnSync } from "node:child_process";
import { defaultAgentMd, setupScript, slug } from "../src/sandbox";

let fail = 0;
for (const [label, md] of [
  ["default template", defaultAgentMd("Viagem SP", "https://vibebook.dev/b/x")],
  ["no blocks", "# nada aqui"],
  ["commands", "```sh\ngit clone https://example.com/r .\nnpm i -g x\n```\n```bash\necho 'quoted' \"too\"\n```"],
]) {
  const r = spawnSync("bash", ["-n"], { input: setupScript({ roomId: "abc123", folder: slug("Viagem SP"), md, origin: "https://vibebook.dev" }) });
  if (r.status !== 0) { fail++; console.log("FAIL", label, String(r.stderr)); } else console.log("ok  ", label);
}
if (slug("Próximos passos do vibebook!") !== "proximos-passos-do-vibebook") { fail++; console.log("FAIL slug"); } else console.log("ok   slug");
console.log(fail ? `${fail} failed` : "all checks passed");
process.exit(fail ? 1 : 0);
