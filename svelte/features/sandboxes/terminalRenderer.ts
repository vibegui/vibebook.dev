import { cssRGBA as terminalRGBA } from "../../lib/ui/cssColor";
export { cssRGBA as terminalRGBA } from "../../lib/ui/cssColor";
import type { ITheme, Terminal as Xterm } from "@xterm/xterm";
export type TerminalSemanticTheme = Pick<
  ITheme,
  | "background"
  | "foreground"
  | "cursor"
  | "cursorAccent"
  | "selectionBackground"
>;
export type TerminalRendererCallbacks = {
  current(): boolean;
  data(value: string): void;
  resize(cols: number, rows: number): void;
  semantic(value: {
    theme: TerminalSemanticTheme;
    fontFamily: string;
    fontSize: number;
  }): void;
  failed(): void;
};
export type TerminalRenderer = {
  readonly cols: number;
  readonly rows: number;
  write(data: Uint8Array): void;
  focus(): void;
  input(enabled: boolean): void;
  dispose(): void;
};
/** The only approved renderer theme fields; application controls remain Tailwind-owned. */
export function resolveTerminalTheme(
  mount: HTMLElement,
): TerminalSemanticTheme {
  const window = mount.ownerDocument.defaultView;
  if (!window) throw Error("Terminal document unavailable");
  const style = window.getComputedStyle(mount),
    selection = window.getComputedStyle(mount, "::selection");
  const foreground = terminalRGBA(mount.ownerDocument, style.color),
    background = terminalRGBA(mount.ownerDocument, style.backgroundColor);
  return {
    background,
    foreground,
    cursor: foreground,
    cursorAccent: background,
    selectionBackground: terminalRGBA(
      mount.ownerDocument,
      selection.backgroundColor,
    ),
  };
}
function terminalFont(mount: HTMLElement) {
  const style = mount.ownerDocument.defaultView?.getComputedStyle(mount),
    size = Number.parseFloat(style?.fontSize ?? "");
  if (!style?.fontFamily || !Number.isFinite(size) || size <= 0)
    throw Error("Terminal typography unavailable");
  return { family: style.fontFamily, size };
}
async function loadFont(
  mount: HTMLElement,
  font: { family: string; size: number },
  signal: AbortSignal,
) {
  const fonts = mount.ownerDocument.fonts;
  if (!fonts || signal.aborted) return;
  await new Promise<void>((resolve) => {
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      signal.removeEventListener("abort", finish);
      resolve();
    };
    const timer = setTimeout(finish, 5000);
    signal.addEventListener("abort", finish, { once: true });
    void fonts.load(`${font.size}px ${font.family}`, "M").then(finish, finish);
  });
}
let modules: Promise<{
  Terminal: typeof Xterm;
  FitAddon: typeof import("@xterm/addon-fit").FitAddon;
}> | null = null;
function loadModules() {
  return (modules ??= Promise.all([
    import("@xterm/xterm"),
    import("@xterm/addon-fit"),
  ])
    .then(([core, fit]) => ({
      Terminal: core.Terminal,
      FitAddon: fit.FitAddon,
    }))
    .catch((error: unknown) => {
      modules = null;
      throw error;
    }));
}
/** Actual vendor interop only. This adapter never injects a first-party stylesheet or forwards arbitrary theme objects. */
export async function mountTerminalRenderer(
  mount: HTMLElement,
  callbacks: TerminalRendererCallbacks,
  signal: AbortSignal,
): Promise<TerminalRenderer> {
  const vendor = await loadModules();
  const current = () =>
    !signal.aborted && callbacks.current() && mount.isConnected;
  if (!current()) throw Error("cancelled");
  const font = terminalFont(mount);
  await loadFont(mount, font, signal);
  if (!current()) throw Error("cancelled");
  const terminal = new vendor.Terminal({
    cursorBlink: true,
    disableStdin: true,
    scrollback: 1000,
    screenReaderMode: true,
    fontFamily: font.family,
    fontSize: font.size,
    theme: resolveTerminalTheme(mount),
  });
  let active = true,
    frame: number | null = null;
  let resize: ResizeObserver | null = null,
    theme: MutationObserver | null = null,
    data: { dispose(): void } | null = null,
    dimensions: { dispose(): void } | null = null;
  let fontListener: (() => void) | null = null;
  function release() {
    if (!active) return;
    active = false;
    if (frame !== null) cancelAnimationFrame(frame);
    frame = null;
    resize?.disconnect();
    theme?.disconnect();
    if (fontListener)
      mount.ownerDocument.fonts?.removeEventListener(
        "loadingdone",
        fontListener,
      );
    data?.dispose();
    dimensions?.dispose();
    const element = terminal.element;
    terminal.dispose();
    element?.remove();
  }
  try {
    const fit = new vendor.FitAddon();
    terminal.loadAddon(fit);
    terminal.open(mount);
    const owned = () => active && current();
    const emitSemantic = () =>
      callbacks.semantic({
        theme: resolveTerminalTheme(mount),
        fontFamily: terminal.options.fontFamily ?? font.family,
        fontSize: terminal.options.fontSize ?? font.size,
      });
    const update = () => {
      if (!owned()) return;
      const typography = terminalFont(mount);
      terminal.options.theme = resolveTerminalTheme(mount);
      terminal.options.fontFamily = typography.family;
      terminal.options.fontSize = typography.size;
      fit.fit();
      emitSemantic();
    };
    const schedule = () => {
      if (!owned() || frame !== null) return;
      frame = requestAnimationFrame(() => {
        frame = null;
        if (owned()) {
          try {
            update();
          } catch {
            callbacks.failed();
          }
        }
      });
    };
    resize = new ResizeObserver(schedule);
    theme = new MutationObserver(schedule);
    resize.observe(mount);
    theme.observe(mount.ownerDocument.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme"],
    });
    fontListener = schedule;
    mount.ownerDocument.fonts?.addEventListener("loadingdone", schedule);
    data = terminal.onData((value) => {
      if (owned()) callbacks.data(value);
    });
    dimensions = terminal.onResize(({ cols, rows }) => {
      if (owned()) callbacks.resize(cols, rows);
    });
    fit.fit();
    emitSemantic();
    return {
      get cols() {
        return terminal.cols;
      },
      get rows() {
        return terminal.rows;
      },
      write(value) {
        if (owned()) terminal.write(value);
      },
      focus() {
        if (owned()) terminal.focus();
      },
      input(enabled) {
        if (owned()) terminal.options.disableStdin = !enabled;
      },
      dispose: release,
    };
  } catch (error) {
    release();
    throw error;
  }
}
