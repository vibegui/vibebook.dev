import { mount } from "svelte";
import { NativeAuthMetadata } from "../../../shared/nativeAuth";
import AuthRoot from "./AuthRoot.svelte";
export function readNativeAuthMetadata(document: Document) {
  const consentFailure = document.querySelector(
    'meta[name="vb-consent-failure"]',
  );
  const parsed = NativeAuthMetadata.safeParse({
    ...(consentFailure
      ? { consentFailure: consentFailure.getAttribute("content") === "1" }
      : {}),
    page: document
      .querySelector('meta[name="vb-page"]')
      ?.getAttribute("content"),
    lang: document.documentElement.lang.startsWith("en") ? "en" : "pt",
    autoAccess:
      document
        .querySelector('meta[name="vb-auto-access"]')
        ?.getAttribute("content") === "1",
  });
  return parsed.success ? parsed.data : null;
}
/** Restore only a validated explicit preference; browser storage may be disabled. */
export function restoreAuthTheme(
  document: Document,
  storage?: Pick<Storage, "getItem">,
) {
  try {
    const theme = (storage ?? document.defaultView?.localStorage)?.getItem(
      "vb.theme",
    );
    if (theme === "light" || theme === "dark")
      document.documentElement.dataset.theme = theme;
  } catch {
    /* System theme remains usable when storage is unavailable. */
  }
}
export function mountAuthPage(target: Element, document: Document) {
  restoreAuthTheme(document);
  return mount(AuthRoot, {
    target,
    props: { metadata: readNativeAuthMetadata(document) },
  });
}
