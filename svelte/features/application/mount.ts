import { mount, unmount } from "svelte";
import NativeApplication from "./NativeApplication.svelte";

export function applicationShellVersion(doc: Document): string | null {
  const entry = doc.querySelector<HTMLScriptElement>(
    'script[type="module"][src*="/svelte-preview/app.js"]',
  );
  if (!entry) return "development";
  try {
    return new URL(entry.src, doc.baseURI).searchParams.get("v");
  } catch {
    return null;
  }
}

/** The single Svelte root; domain views are composed inside the component. */
export function mountApplication(target: HTMLElement, doc: Document = document) {
  const instance = mount(NativeApplication, {
    target,
    props: { document: doc, shellVersion: applicationShellVersion(doc) },
  });
  let active = true;
  return {
    destroy() {
      if (!active) return;
      active = false;
      return unmount(instance);
    },
  };
}
