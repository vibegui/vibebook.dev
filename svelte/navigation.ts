import { uiNavigationUrl, type UiVariant } from "../shared/uiVariant";

export function createUiNavigation(
  history: Pick<History, "pushState" | "replaceState">,
  current: () => string,
  variant: UiVariant,
) {
  const route = (url?: string | URL | null) =>
    url == null ? url : uiNavigationUrl(url, current(), variant);
  return {
    pushState(data: unknown, unused: string, url?: string | URL | null) {
      history.pushState(data, unused, route(url));
    },
    replaceState(data: unknown, unused: string, url?: string | URL | null) {
      history.replaceState(data, unused, route(url));
    },
  };
}
