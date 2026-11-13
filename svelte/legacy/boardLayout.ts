/** Temporary DOM ownership adapter for the legacy shell; never remount the native board. */
export function moveBoardContainer(
  book: HTMLElement,
  target: Element | null,
  before: Node | null = null,
) {
  const board = book.querySelector<HTMLElement>("#kanban");
  if (!board || !target || board.parentElement === target) return;
  const active = book.ownerDocument.activeElement;
  const focused =
    active instanceof HTMLElement && board.contains(active) ? active : null;
  target.insertBefore(board, before?.parentNode === target ? before : null);
  focused?.focus({ preventScroll: true });
}

type BoardMediaQuery = {
  readonly matches: boolean;
  addEventListener(type: "change", listener: () => void): void;
  removeEventListener(type: "change", listener: () => void): void;
};

export function watchBoardLayout(
  book: HTMLElement,
  media: BoardMediaQuery,
  onDesktop: () => void,
) {
  let disposed = false;
  const changed = () => {
    if (
      !disposed &&
      book.isConnected &&
      !media.matches &&
      book.classList.contains("boardview")
    )
      onDesktop();
  };
  media.addEventListener("change", changed);
  return () => {
    if (disposed) return;
    disposed = true;
    media.removeEventListener("change", changed);
  };
}
