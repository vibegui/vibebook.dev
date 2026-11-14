import { expect, test } from "bun:test";
import { mkdtemp, mkdir, writeFile, rename, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
  createGenerationQueue,
  watchAppDocumentSources,
} from "./app-document-watch";

test("generator serializes and coalesces edits, releases a failed run for explicit later edits", async () => {
  const releases: (() => void)[] = [];
  let calls = 0,
    live = 0,
    maximum = 0;
  const queue = createGenerationQueue(async () => {
    calls++;
    maximum = Math.max(maximum, ++live);
    try {
      await new Promise<void>((resolve) => releases.push(resolve));
    } finally {
      live--;
    }
  });
  const first = queue.request();
  await Promise.resolve();
  expect(queue.request()).toBe(first);
  expect(queue.request()).toBe(first);
  expect(calls).toBe(1);
  releases.shift()!();
  await Promise.resolve();
  await Promise.resolve();
  expect(calls).toBe(2);
  releases.shift()!();
  await first;
  expect(maximum).toBe(1);
  queue.dispose();
  let fail = true;
  const retry = createGenerationQueue(async () => {
    if (fail) throw Error("compile failed");
  });
  await expect(retry.request()).rejects.toThrow("compile failed");
  fail = false;
  await retry.request();
  retry.dispose();
});

test("disposed generation never starts queued or subsequent builds", async () => {
  let calls = 0;
  const queue = createGenerationQueue(async () => {
    calls++;
  });
  const waiting = queue.request();
  queue.dispose();
  await waiting;
  await queue.request();
  expect(calls).toBe(0);
});

test("source directory watcher follows repeated atomic replacements and excludes generated output", async () => {
  const root = await mkdtemp(join(tmpdir(), "vibebook-app-document-watch-"));
  let notify: (() => void) | undefined;
  const watchers: ReturnType<typeof watchAppDocumentSources> = [];
  try {
    await mkdir(join(root, "browser/app-document"), { recursive: true });
    await mkdir(join(root, "shared/generated"), { recursive: true });
    await writeFile(join(root, "shared/appDocumentProtocol.ts"), "original");
    watchers.push(...watchAppDocumentSources(root, () => notify?.()));
    for (const revision of ["first", "second"]) {
      let resolveChange!: () => void;
      const changed = new Promise<void>((resolve) => {
        resolveChange = resolve;
      });
      let observed = false;
      notify = () => {
        observed = true;
        resolveChange();
      };
      await writeFile(join(root, "shared/replacement.tmp"), revision);
      await rename(
        join(root, "shared/replacement.tmp"),
        join(root, "shared/appDocumentProtocol.ts"),
      );
      const timer = setTimeout(() => resolveChange(), 2000);
      try {
        await changed;
        expect(observed).toBe(true);
      } finally {
        clearTimeout(timer);
      }
    }
    let unrelated = 0;
    notify = () => {
      unrelated++;
    };
    await writeFile(
      join(root, "shared/generated/appDocumentBootstrap.ts"),
      "generated",
    );
    await new Promise((resolve) => setTimeout(resolve, 50));
    expect(unrelated).toBe(0);
  } finally {
    for (const watcher of watchers) watcher.close();
    await rm(root, { recursive: true, force: true });
  }
});
