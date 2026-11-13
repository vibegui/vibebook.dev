import { realpathSync } from "node:fs";
import { dirname, resolve } from "node:path";

/** Canonicalize existing ancestors as well as files: missing tooling must not
 * escape classification just because /tmp (or a project directory) is an alias. */
export function canonicalFilesystemPath(file: string): string {
  let current = resolve(file);
  const missing: string[] = [];
  for (;;) {
    try {
      return resolve(realpathSync(current), ...missing);
    } catch (error) {
      if (
        !(error instanceof Error) ||
        !("code" in error) ||
        error.code !== "ENOENT"
      )
        throw error;
      const parent = dirname(current);
      if (parent === current) throw error;
      missing.unshift(current.slice(parent.length).replace(/^[/\\]/, ""));
      current = parent;
    }
  }
}

/** Resolve aliases above the project root without resolving away lexical names
 * inside it (for example shared/.hidden.ts -> shared/public.ts). */
export function projectFilesystemPath(
  file: string,
  physicalRoot: string,
): string | undefined {
  let current = resolve(file);
  const suffix: string[] = [];
  for (;;) {
    if (canonicalFilesystemPath(current) === physicalRoot)
      return resolve(physicalRoot, ...suffix);
    const parent = dirname(current);
    if (parent === current) return;
    suffix.unshift(current.slice(parent.length).replace(/^[/\\]/, ""));
    current = parent;
  }
}
