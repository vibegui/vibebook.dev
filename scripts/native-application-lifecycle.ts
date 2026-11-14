import assert from "node:assert/strict";
import { expect as baseExpect, type Page } from "@playwright/test";
import { record } from "../shared/validation";

export type ApplicationSockets = { book: number; personal: number; yjs: number };
export type ApplicationLifecycleSnapshot = { cycle: number; heapUsedBytes: number | null; heapTotalBytes: number | null; dom: { documents: number | null; nodes: number | null; eventListeners: number | null }; sockets: ApplicationSockets; mountedEditors: number };
export type ApplicationLifecycleEvidence = { scope: string; cycles: number; status: string; snapshots: ApplicationLifecycleSnapshot[]; coverage: { sockets: string; editor: string; heap: string; observers: string; detachedTrees: string } };
export type ApplicationLifecycleOptions = {
  page: Page;
  roomId: string;
  secondRoomId: string;
  epicId: string;
  /** Caller uses real application navigation and waits for canonical readiness. */
  openRoom(roomId: string, thread?: string): Promise<void>;
  /** Idempotent actual Edit + synchronized live Yjs readiness; never fallback. */
  openEditor(): Promise<void>;
  closeEditor(): Promise<void>;
  /** Count this page's actual WebSocket open/close events, not server guesses. */
  activeSockets(): ApplicationSockets;
  step(name: string, run: () => Promise<void>): Promise<void>;
  /** Store this live evidence object before the first step so failed runs also retain samples. */
  onEvidence?(evidence: ApplicationLifecycleEvidence): void;
};

/** Complement to the synthetic UI timing experiment. Called by the real
 * disposable Worker harness after HTTP/MCP/auth setup, never seeds canonical
 * state itself or supplies a replacement editor/provider/transport. */
export async function auditNativeApplicationLifecycle(options: ApplicationLifecycleOptions, cycles = Number(process.env.APPLICATION_LIFECYCLE_CYCLES ?? 20)) {
  assert(Number.isInteger(cycles) && cycles >= 20 && cycles <= 100, "Lifecycle cohort requires 20..100 real cycles");
  const { page } = options, cdp = await page.context().newCDPSession(page);
  const expect = baseExpect.configure({ timeout: 30_000 });
  const snapshots: ApplicationLifecycleSnapshot[] = [];
  const evidence: ApplicationLifecycleEvidence = { scope: "Actual authenticated native application, Worker Book/DocRoom and Yjs editor mount/dispose; no simulated canonical state or provider", cycles, status: "running", snapshots,
    coverage: { sockets: "Actual page WebSocket events and active-socket assertions", editor: "Real CM/Yjs synchronized mount, Done, target change and removed editor DOM", heap: "CDP forced GC at equivalent closed-editor main-thread checkpoints", observers: "Not directly enumerated", detachedTrees: "DOM node/listener counts are retention signals, not a complete detached-tree heap graph audit" },
  };
  try {
    options.onEvidence?.(evidence);
    await cdp.send("Performance.enable");
    const snapshot = async (cycle: number) => {
      await cdp.send("HeapProfiler.collectGarbage");
      const rawMetrics: unknown = await cdp.send("Performance.getMetrics"), dom: unknown = await cdp.send("Memory.getDOMCounters");
      const metrics = new Map<string, number>();
      if (record(rawMetrics) && Array.isArray(rawMetrics.metrics)) for (const metric of rawMetrics.metrics) if (record(metric) && typeof metric.name === "string" && typeof metric.value === "number" && Number.isFinite(metric.value)) metrics.set(metric.name, metric.value);
      const count = (name: string) => { const value = record(dom) ? dom[name] : null; return typeof value === "number" && Number.isFinite(value) ? value : null; };
      const value = { cycle, heapUsedBytes: metrics.get("JSHeapUsedSize") ?? null, heapTotalBytes: metrics.get("JSHeapTotalSize") ?? null, dom: { documents: count("documents"), nodes: count("nodes"), eventListeners: count("jsEventListeners") }, sockets: { ...options.activeSockets() }, mountedEditors: await page.locator("[data-document-editor] .cm-editor").count() };
      snapshots.push(value);
      return value;
    };
    await options.step("real editor lifecycle warmup and equivalent closed-editor baseline", async () => {
      await options.openRoom(options.roomId, options.epicId);
      await options.openEditor();
      await expect.poll(() => options.activeSockets().yjs).toBe(1);
      await options.closeEditor();
      await options.openRoom(options.secondRoomId);
      await options.openRoom(options.roomId);
      await expect.poll(options.activeSockets).toEqual({ book: 1, personal: 1, yjs: 0 });
      await expect(page.locator("[data-document-editor] .cm-editor")).toHaveCount(0);
      await snapshot(0);
    });
    for (let cycle = 1; cycle <= cycles; cycle++) await options.step(`real room/thread/editor lifecycle ${cycle}/${cycles}`, async () => {
      await options.openRoom(options.secondRoomId);
      await options.openRoom(options.roomId, options.epicId);
      await options.openEditor();
      await expect(page.locator("[data-document-editor] .cm-content")).toBeVisible();
      await expect.poll(options.activeSockets).toEqual({ book: 1, personal: 1, yjs: 1 });
      await options.closeEditor();
      await options.openRoom(options.roomId);
      await expect.poll(options.activeSockets).toEqual({ book: 1, personal: 1, yjs: 0 });
      await expect(page.locator("[data-document-editor] .cm-editor")).toHaveCount(0);
      const value = await snapshot(cycle);
      assert(value.heapUsedBytes !== null, "Post-GC heap must be observed, never fabricated as zero");
    });
    evidence.status = "observed-socket-and-editor-assertions-passed";
    return evidence;
  } catch (error) {
    evidence.status = "failed";
    // The parent harness retains this attached evidence even on failure.
    throw Object.assign(error instanceof Error ? error : new Error("Lifecycle failed"), { lifecycleEvidence: evidence });
  } finally { await cdp.detach(); }
}
