import project from "../package.json";

// CI reports every independent gate in one run. Local `bun run check` keeps its
// fast failure behavior; the package script remains the single list of gates.
const commands = project.scripts.check.split(/\s*&&\s*/).map((command) => {
  const match = /^bun run ([\w:.-]+)$/.exec(command);
  const name = match?.[1];
  if (!name) throw new Error(`Unsupported check command: ${command}`);
  return name;
});
const results: { name: string; code: number }[] = [];
for (const name of commands) {
  console.info(`::group::${name}`);
  const child = Bun.spawn(["bun", "run", name], {
    stdin: "ignore",
    stdout: "inherit",
    stderr: "inherit",
  });
  results.push({ name, code: await child.exited });
  console.info("::endgroup::");
}
for (const { name, code } of results)
  console.info(`${code === 0 ? "PASS" : "FAIL"} ${name} (${code})`);
if (results.some(({ code }) => code !== 0)) process.exitCode = 1;
