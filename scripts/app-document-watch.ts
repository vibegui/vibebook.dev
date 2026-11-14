import { watch } from "node:fs";
import { join } from "node:path";
import { projectRoot } from "../svelte/build/clientBoundary";
import { buildAppDocument } from "./build-app-document";

export const APP_DOCUMENT_READY = "[app-document] ready";

/** Coalesce edits during an in-flight build; no generation can race another. */
export function createGenerationQueue(build: () => Promise<unknown>) {
  let active = true,
    dirty = false,
    pending: Promise<void> | null = null;
  return {
    request(): Promise<void> {
      if (!active) return Promise.resolve();
      dirty = true;
      if (pending) return pending;
      pending = Promise.resolve()
        .then(async () => {
          while (active && dirty) {
            dirty = false;
            await build();
          }
        })
        .finally(() => {
          pending = null;
        });
      return pending;
    },
    dispose() {
      active = false;
      dirty = false;
    },
  };
}

/** Directory ownership survives editors replacing source inodes atomically. */
export function watchAppDocumentSources(root: string, changed: () => void) {
  return [
    watch(
      join(root, "browser/app-document"),
      { recursive: true },
      (_event, filename) => {
        if (filename === null || filename.toString().endsWith(".ts")) changed();
      },
    ),
    watch(join(root, "shared"), (_event, filename) => {
      if (
        filename === null ||
        ["appDocument.ts", "appDocumentProtocol.ts"].includes(
          filename.toString(),
        )
      )
        changed();
    }),
  ];
}

export async function watchAppDocuments(root = projectRoot) {
  const abort = new AbortController();
  const queue = createGenerationQueue(() =>
    buildAppDocument({ root, signal: abort.signal }),
  );
  const watchers: ReturnType<typeof watch>[] = [];
  let stopping = false;
  const stop = () => {
    if (stopping) return;
    stopping = true;
    abort.abort(new Error("App document watcher stopped"));
    queue.dispose();
    for (const watcher of watchers) watcher.close();
    process.exitCode = 130;
    // Bun's build cannot be interrupted; never let a stopped generator hold the supervisor indefinitely.
    setTimeout(() => process.exit(130), 1000).unref();
  };
  process.on("SIGINT", stop);
  process.on("SIGTERM", stop);
  const changed = () => {
    void queue.request().catch((error) => {
      if (!stopping) console.error("[app-document] generation failed", error);
    });
  };
  try {
    watchers.push(...watchAppDocumentSources(root, changed));
    await queue.request();
    if (!stopping) console.log(APP_DOCUMENT_READY);
  } catch (error) {
    stop();
    throw error;
  }
  // Active fs watchers own this process until the supervisor's signal.
}
if (import.meta.main) await watchAppDocuments();
