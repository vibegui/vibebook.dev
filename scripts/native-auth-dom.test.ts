// Source component tests only: no Worker, browser process, database or OAuth grant is fabricated here.
import { afterEach, expect, test } from "bun:test";
import { plugin } from "bun";
import { readFileSync } from "node:fs";
import { compile } from "svelte/compiler";
import { Window } from "happy-dom";
import { writable } from "svelte/store";
import type { AuthApi } from "../svelte/features/auth/api";
const environment = new Window({
  url: "https://vibebook.test/login?ui=svelte",
});
// One environment boundary: Svelte sees the same Happy DOM constructors as the mounted DOM nodes.
for (const name of [
  "window",
  "document",
  "navigator",
  "Node",
  "Element",
  "HTMLElement",
  "HTMLInputElement",
  "HTMLButtonElement",
  "HTMLFormElement",
  "SVGElement",
  "DocumentFragment",
  "Text",
  "Comment",
  "MutationObserver",
  "Event",
  "MouseEvent",
  "CustomEvent",
  "FormData",
  "getComputedStyle",
]) {
  const value =
    name === "window" ? environment : Reflect.get(environment, name);
  Object.defineProperty(globalThis, name, {
    value: name === "getComputedStyle" ? value.bind(environment) : value,
    configurable: true,
    writable: true,
  });
}
plugin({
  name: "native-auth-components",
  setup(build) {
    build.onLoad({ filter: /\.svelte$/ }, (args) => ({
      contents: compile(readFileSync(args.path, "utf8"), {
        filename: args.path,
        generate: "client",
        css: "injected",
      }).js.code,
      loader: "js",
    }));
  },
});
const { mount, unmount, flushSync, tick } = await import("svelte");
const { default: AuthRoot } =
  await import("../svelte/features/auth/AuthRoot.svelte");
const { readNativeAuthMetadata, restoreAuthTheme } =
  await import("../svelte/features/auth/mount");
const login = {
  providers: { email: true as const, google: true, github: true },
  next: "/app",
  error: null,
};
const consent = {
  client_name: "<img src=x onerror=alert(1)>",
  client_domain: null,
  redirect_host: "127.0.0.1:1234",
  redirect_is_loopback: true,
  scope: ["rooms", "offline_access"],
  email: "me@test.com",
  handle: "single-use-handle",
};
function api(overrides: Partial<AuthApi> = {}): AuthApi {
  return {
    login: async () => login,
    start: async () => ({ ok: true }),
    verify: async () => ({ ok: true, next: "/app" }),
    access: async () => ({ state: "out", title: "<Room>", email: null }),
    ask: async () => ({ ok: true }),
    consent: async () => consent,
    ...overrides,
  };
}
const mounted: ReturnType<typeof mount>[] = [];
afterEach(() => {
  for (const component of mounted.splice(0))
    flushSync(() => {
      void unmount(component);
    });
  document.body.replaceChildren();
});
async function settle() {
  await Promise.resolve();
  flushSync();
  await tick();
  flushSync();
}
async function render(
  page: "login" | "access" | "consent",
  http: AuthApi = api(),
  lang: "pt" | "en" = "en",
  consentFailure = false,
) {
  const target = document.createElement("div");
  document.body.append(target);
  const navigations: string[] = [];
  mounted.push(
    flushSync(() =>
      mount(AuthRoot, {
        target,
        props: {
          metadata: { page, lang, autoAccess: false, consentFailure },
          href:
            page === "access"
              ? "https://vibebook.test/b/abcdef?ui=svelte"
              : `https://vibebook.test/${page === "consent" ? "authorize?ui=svelte&client_id=client" : "login?ui=svelte"}`,
          api: http,
          navigate: (url) => navigations.push(url),
        },
      }),
    ),
  );
  await settle();
  return { target, navigations };
}
function input(selector: string, value: string) {
  const element = document.querySelector<HTMLInputElement>(selector)!;
  element.value = value;
  element.dispatchEvent(new Event("input", { bubbles: true }));
  flushSync();
  return element;
}
test("login renders native provider/email controls, keeps server errors and verifies six digits once", async () => {
  let starts = 0,
    verifications = 0;
  const { target, navigations } = await render(
    "login",
    api({
      start: async () => {
        starts++;
        return { ok: true };
      },
      verify: async () => {
        verifications++;
        throw Error("Wrong code.");
      },
    }),
  );
  expect(target.querySelector('[data-vb-native="auth"]')).not.toBeNull();
  expect(target.querySelectorAll('a[href^="/auth/"]')).toHaveLength(2);
  input("#auth-email", "me@test.com");
  target
    .querySelector<HTMLFormElement>("form")!
    .dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
  await settle();
  expect(starts).toBe(1);
  expect(document.activeElement).toBe(target.querySelector("#auth-code"));
  input("#auth-code", "123456");
  await settle();
  expect(verifications).toBe(1);
  expect(target.querySelector('[role="alert"]')?.textContent).toContain(
    "Wrong code.",
  );
  expect(target.querySelector<HTMLInputElement>("#auth-code")!.value).toBe(
    "123456",
  );
  expect(navigations).toEqual([]);
});
test("access escapes room data and never requests membership from a bare link", async () => {
  let asks = 0;
  const { target } = await render(
    "access",
    api({
      ask: async () => {
        asks++;
        return { ok: true };
      },
    }),
  );
  expect(target.textContent).toContain("<Room>");
  expect(target.querySelector("Room")).toBeNull();
  expect(asks).toBe(0);
  const link = target.querySelector<HTMLAnchorElement>('a[href^="/login?"]')!;
  expect(link.href).toContain("ui=svelte");
  expect(new URL(link.href).searchParams.get("next")).toBe(
    "/b/abcdef?ui=svelte&pedir=1",
  );
});
test("consent uses the real same-origin browser form and defaults to denial; external client data stays text", async () => {
  const { target } = await render("consent");
  expect(target.querySelector("img")).toBeNull();
  expect(target.textContent).toContain(consent.client_name);
  expect(target.textContent).toContain("name is not verified");
  expect(target.textContent).toContain("Continue only if");
  const form = target.querySelector<HTMLFormElement>(
    'form[action^="/authorize"]',
  )!;
  expect(form.method).toBe("post");
  expect(form.getAttribute("action")).toBe(
    "/authorize?ui=svelte&client_id=client",
  );
  expect(
    form.querySelector<HTMLInputElement>('input[name="handle"]')!.value,
  ).toBe(consent.handle);
  const decisions = Array.from(
    form.querySelectorAll<HTMLButtonElement>('button[name="decision"]'),
  );
  expect(decisions.map((button) => button.value)).toEqual(["deny", "approve"]);
  expect(new FormData(form).get("decision")).toBeNull(); // POST handler treats absent/non-approve as denial.
  expect(new FormData(form, decisions[0]).get("decision")).toBe("deny");
  expect(new FormData(form, decisions[1]).get("decision")).toBe("approve");
  expect(
    target
      .querySelector('form[action="/auth/logout"] input[name="next"]')
      ?.getAttribute("value"),
  ).toBe("/authorize?ui=svelte&client_id=client");
});
test("public metadata rejects unknown page discriminants and never routes them into legacy UI", () => {
  document.head.innerHTML =
    '<meta name="vb-page" content="malicious"><meta name="vb-auto-access" content="1">';
  expect(readNativeAuthMetadata(document)).toBeNull();
  document.head.innerHTML =
    '<meta name="vb-page" content="access"><meta name="vb-auto-access" content="1">';
  document.documentElement.lang = "pt-BR";
  expect(readNativeAuthMetadata(document)).toEqual({
    page: "access",
    lang: "pt",
    autoAccess: true,
  });
  document.head.innerHTML =
    '<meta name="vb-page" content="consent"><meta name="vb-consent-failure" content="1">';
  expect(readNativeAuthMetadata(document)).toEqual({
    page: "consent",
    lang: "pt",
    autoAccess: false,
    consentFailure: true,
  });
  document.head.replaceChildren();
});

test("native theme restore respects explicit choice and ignores invalid or unavailable storage", () => {
  document.documentElement.removeAttribute("data-theme");
  restoreAuthTheme(document, { getItem: () => "dark" });
  expect(document.documentElement.dataset.theme).toBe("dark");
  restoreAuthTheme(document, { getItem: () => "evil" });
  expect(document.documentElement.dataset.theme).toBe("dark");
  restoreAuthTheme(document, {
    getItem: () => {
      throw Error("denied");
    },
  });
  expect(document.documentElement.dataset.theme).toBe("dark");
  restoreAuthTheme(document, { getItem: () => "light" });
  expect(document.documentElement.dataset.theme).toBe("light");
  document.documentElement.removeAttribute("data-theme");
});
test("changing a native page URL disposes the old context before a late response can submit or navigate", async () => {
  const { default: Harness } = await import("./auth-page-harness.svelte");
  let finish!: (value: Awaited<ReturnType<AuthApi["consent"]>>) => void;
  const old = new Promise<Awaited<ReturnType<AuthApi["consent"]>>>(
    (resolve) => {
      finish = resolve;
    },
  );
  const href = writable(
    "https://vibebook.test/authorize?ui=svelte&client_id=old",
  );
  const target = document.createElement("div");
  document.body.append(target);
  const navigations: string[] = [];
  mounted.push(
    flushSync(() =>
      mount(Harness, {
        target,
        props: {
          href,
          page: "consent",
          api: api({
            consent: async (search) =>
              new URLSearchParams(search).get("client_id") === "old"
                ? old
                : { ...consent, client_name: "New app", handle: "new-handle" },
          }),
          navigate: (url) => navigations.push(url),
        },
      }),
    ),
  );
  await settle();
  href.set("https://vibebook.test/authorize?ui=svelte&client_id=new");
  await settle();
  expect(target.textContent).toContain("New app");
  expect(
    target.querySelector<HTMLInputElement>('input[name="handle"]')?.value,
  ).toBe("new-handle");
  finish({ ...consent, client_name: "Old app", handle: "old-handle" });
  await settle();
  expect(target.textContent).not.toContain("Old app");
  expect(
    target.querySelector<HTMLInputElement>('input[name="handle"]')?.value,
  ).toBe("new-handle");
  expect(navigations).toEqual([]);
});

test("native POST failure marker renders an error without context creation until explicit Retry", async () => {
  let calls = 0;
  const { target } = await render(
    "consent",
    api({
      consent: async () => {
        calls++;
        return { ...consent, handle: "fresh-retry-handle" };
      },
    }),
    "en",
    true,
  );
  expect(calls).toBe(0);
  expect(target.querySelector('[role="alert"]')?.textContent).toContain(
    "not completed",
  );
  expect(target.querySelector('input[name="handle"]')).toBeNull();
  expect(target.querySelector('form[action^="/authorize"]')).toBeNull();
  const retry = Array.from(
    target.querySelectorAll<HTMLButtonElement>("button"),
  ).find((button) => button.textContent?.includes("Try again"))!;
  retry.click();
  await settle();
  expect(calls).toBe(1);
  expect(
    target.querySelector<HTMLInputElement>('input[name="handle"]')?.value,
  ).toBe("fresh-retry-handle");
  const form = target.querySelector<HTMLFormElement>(
    'form[action^="/authorize"]',
  )!;
  expect(new FormData(form).get("decision")).toBeNull();
  expect(
    form.querySelector<HTMLButtonElement>('button[name="decision"]')!.value,
  ).toBe("deny");
});

// These fixtures intercept requestSubmit only to observe the real form boundary;
// they do not fabricate a server logout, cookie deletion or push delivery.
const { default: AuthLogoutForm } =
  await import("../svelte/features/auth/AuthLogoutForm.svelte");
test("consent sign-out cleanup keeps real POST and original query, then submits only its owned form", async () => {
  let finish!: (value: {
    local: boolean;
    settled: boolean;
    confirmed: boolean;
  }) => void;
  const cleanup = new Promise<{
    local: boolean;
    settled: boolean;
    confirmed: boolean;
  }>((resolve) => {
    finish = resolve;
  });
  const target = document.createElement("div");
  document.body.append(target);
  let begun = 0;
  mounted.push(
    flushSync(() =>
      mount(AuthLogoutForm, {
        target,
        props: {
          next: "/authorize?ui=svelte&client_id=original",
          lang: "en",
          onBegin: () => {
            begun++;
          },
          cleanup: () => cleanup,
        },
      }),
    ),
  );
  const form = target.querySelector<HTMLFormElement>("form")!;
  expect(form.getAttribute("method")).toBe("post");
  expect(form.getAttribute("action")).toBe("/auth/logout");
  expect(
    form.querySelector<HTMLInputElement>('input[name="next"]')?.value,
  ).toBe("/authorize?ui=svelte&client_id=original");
  expect(form.querySelector('input[name="handle"]')).toBe(null);
  let submits = 0;
  form.requestSubmit = () => {
    const event = new Event("submit", { bubbles: true, cancelable: true });
    form.dispatchEvent(event);
    if (!event.defaultPrevented) submits++;
  };
  const first = new Event("submit", { bubbles: true, cancelable: true });
  form.dispatchEvent(first);
  expect(first.defaultPrevented).toBe(true);
  expect(begun).toBe(1);
  expect(submits).toBe(0);
  finish({ local: true, settled: true, confirmed: true });
  await settle();
  expect(submits).toBe(1);
});
test("unconfirmed sign-out cleanup requires explicit continuation and exposes safe fresh review", async () => {
  const target = document.createElement("div");
  document.body.append(target);
  mounted.push(
    flushSync(() =>
      mount(AuthLogoutForm, {
        target,
        props: {
          next: "/authorize?ui=svelte&client_id=original",
          lang: "en",
          onBegin: () => {},
          cleanup: async () => ({
            local: true,
            settled: false,
            confirmed: false,
          }),
        },
      }),
    ),
  );
  const form = target.querySelector<HTMLFormElement>("form")!;
  let automatic = 0;
  form.requestSubmit = () => {
    automatic++;
  };
  form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
  await settle();
  expect(automatic).toBe(0);
  expect(target.querySelector('[role="alert"]')?.textContent).toContain(
    "unconfirmed",
  );
  expect(target.querySelector("button")?.textContent).toContain(
    "Continue signing out",
  );
  expect(target.querySelector("a")?.getAttribute("href")).toBe(
    "/authorize?ui=svelte&client_id=original",
  );
  const explicit = new Event("submit", { bubbles: true, cancelable: true });
  form.dispatchEvent(explicit);
  expect(explicit.defaultPrevented).toBe(false);
});
test("disposed consent sign-out cleanup cannot submit its detached form", async () => {
  let finish!: (value: {
    local: boolean;
    settled: boolean;
    confirmed: boolean;
  }) => void;
  const pending = new Promise<{
    local: boolean;
    settled: boolean;
    confirmed: boolean;
  }>((resolve) => {
    finish = resolve;
  });
  const target = document.createElement("div");
  document.body.append(target);
  const component = flushSync(() =>
    mount(AuthLogoutForm, {
      target,
      props: {
        next: "/authorize?ui=svelte",
        lang: "en",
        onBegin: () => {},
        cleanup: () => pending,
      },
    }),
  );
  const form = target.querySelector<HTMLFormElement>("form")!;
  let automatic = 0;
  form.requestSubmit = () => {
    automatic++;
  };
  form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
  flushSync(() => {
    void unmount(component);
  });
  finish({ local: true, settled: true, confirmed: true });
  await settle();
  expect(form.isConnected).toBe(false);
  expect(automatic).toBe(0);
});
