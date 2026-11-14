import { expect, test } from "bun:test";
import { readFile } from "node:fs/promises";
import { Window, type HTMLElement } from "happy-dom";

async function consentFixture() {
  const html = await readFile(
    new URL("../public/app.html", import.meta.url),
    "utf8",
  );
  const start = html.indexOf("let appAskQ = Promise.resolve();");
  const end = html.indexOf("// vibebook's tools", start);
  if (start < 0 || end < start)
    throw Error("Actual vanilla consent function not found");
  const ask: (
    box: HTMLElement,
    what: string,
    detail: string,
    signal?: AbortSignal,
  ) => Promise<boolean> = new Function(
    "t",
    "esc",
    `${html.slice(start, end)};return appAsk;`,
  )(
    (text: string) => text,
    (text: string) => text,
  );
  const window = new Window();
  const firstBox = window.document.createElement("div"),
    secondBox = window.document.createElement("div");
  window.document.body.append(firstBox, secondBox);
  return { ask, firstBox, secondBox, close: () => window.happyDOM.abort() };
}

test("retired consent resolves false and releases the next real vanilla question", async () => {
  const { ask, firstBox, secondBox, close } = await consentFixture();
  try {
    const controller = new AbortController();
    const first = ask(firstBox, "old", "old detail", controller.signal);
    const second = ask(secondBox, "new", "new detail");
    await Promise.resolve();
    const oldButton = firstBox.querySelector("button")!;
    controller.abort();
    expect(await first).toBe(false);
    await Promise.resolve();
    expect(firstBox.hidden).toBe(true);
    expect(secondBox.querySelector("q")?.textContent).toBe("new detail");
    oldButton.click();
    expect(secondBox.hidden).toBe(false);
    secondBox.querySelector("button")!.click();
    expect(await second).toBe(true);
  } finally {
    await close();
  }
});

test("already-aborted queued questions never display and abort only clears owned controls", async () => {
  const { ask, firstBox, secondBox, close } = await consentFixture();
  try {
    const active = new AbortController(),
      queued = new AbortController();
    const first = ask(firstBox, "active", "detail", active.signal);
    const second = ask(
      secondBox,
      "cancelled",
      "must not render",
      queued.signal,
    );
    await Promise.resolve();
    firstBox.innerHTML = '<span data-new-owner="true">newer UI</span>';
    queued.abort();
    active.abort();
    expect(await first).toBe(false);
    expect(await second).toBe(false);
    expect(firstBox.querySelector("[data-new-owner]")?.textContent).toBe(
      "newer UI",
    );
    expect(secondBox.innerHTML).toBe("");
  } finally {
    await close();
  }
});
