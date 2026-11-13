import type { ChatSurface } from "./controller";
/** Scroll/measurement interop only: no first-party style or DOM presentation builder. */
export function createChatSurface(element: HTMLElement): ChatSurface {
  return {
    connected: () => element.isConnected,
    metrics: () => ({ top: element.scrollTop, height: element.scrollHeight, client: element.clientHeight }),
    top(value) { if (element.isConnected) element.scrollTop = value; },
    message(id) {
      const target = element.querySelector<HTMLElement>(`#m${id}`);
      return target ? { reveal() { if (target.isConnected && element.contains(target)) target.scrollIntoView({ block: "center", behavior: "smooth" }); }, highlight() { if (target.isConnected && element.contains(target)) target.dispatchEvent(new CustomEvent("vb:message-highlight")); } } : null;
    },
    listen(scroll, growth) {
      let active = true;
      const resized = () => { if (active && element.isConnected) growth(); };
      const resize = new ResizeObserver(resized);
      const observe = () => { resize.disconnect(); resize.observe(element); for (const child of element.children) resize.observe(child); };
      const mutation = new MutationObserver(() => { if (!active || !element.isConnected) return; observe(); growth(); });
      observe(); mutation.observe(element, { childList: true, subtree: true });
      element.addEventListener("scroll", scroll);
      element.ownerDocument.fonts?.addEventListener("loadingdone", resized);
      return () => { if (!active) return; active = false; resize.disconnect(); mutation.disconnect(); element.removeEventListener("scroll", scroll); element.ownerDocument.fonts?.removeEventListener("loadingdone", resized); };
    },
  };
}
