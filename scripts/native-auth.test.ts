import { expect, test } from "bun:test";
import { get } from "svelte/store";
import {
  createAuthApi,
  AuthFailure,
  oauthQuery,
  type AuthApi,
} from "../svelte/features/auth/api";
import { createAuthOwner, type AuthClock } from "../svelte/features/auth/owner";
import {
  createLoginSession,
  createAccessSession,
  createConsentSession,
} from "../svelte/features/auth/session";
import {
  authContinuation,
  consentReturn,
} from "../svelte/features/auth/navigation";
import { nativeAuthHtml } from "../src/native-page";
import { authIssue } from "../svelte/features/auth/copy";
import { NativeAuthMetadata } from "../shared/nativeAuth";
const login = {
  providers: { email: true as const, google: true, github: false },
  next: "/b/abcdef?pedir=1",
  error: null,
};
const consent = {
  client_name: "<unverified app>",
  client_domain: null,
  redirect_host: "127.0.0.1:4567",
  redirect_is_loopback: true,
  scope: ["rooms"],
  email: "me@test.com",
  handle: "one-time-handle",
};
function api(overrides: Partial<AuthApi> = {}): AuthApi {
  return {
    login: async () => login,
    start: async () => ({ ok: true }),
    verify: async () => ({ ok: true, next: login.next }),
    access: async () => ({
      state: "ask",
      email: "me@test.com",
      title: "<Room>",
    }),
    ask: async () => ({ ok: true }),
    consent: async () => consent,
    ...overrides,
  };
}
function deferred<T>() {
  let resolve!: (value: T) => void, reject!: (error: Error) => void;
  const promise = new Promise<T>((yes, no) => {
    resolve = yes;
    reject = no;
  });
  return { promise, resolve, reject };
}
function timer() {
  const jobs = new Set<() => void>();
  const clock: AuthClock = {
    schedule: (fn) => {
      jobs.add(fn);
      return fn;
    },
    cancel: (handle) => {
      jobs.delete(handle as () => void);
    },
  };
  return {
    clock,
    jobs,
    fire() {
      for (const fn of [...jobs]) {
        jobs.delete(fn);
        fn();
      }
    },
  };
}
test("continuations stay on supported local routes and preserve explicit selection", () => {
  for (const unsafe of [
    "//evil.test/app",
    "https://evil.test/app",
    "/\\evil.test/app",
    "/app\n",
    "/app-evil",
    "/b/abcdef/extra",
    "/authorizeevil?x=y",
    "javascript:alert(1)",
    "/api/private",
  ])
    expect(authContinuation(unsafe, "https://vibebook.test")).toBe(
      "/app?ui=svelte",
    );
  expect(
    authContinuation(
      "/authorize?client_id=x&redirect_uri=https%3A%2F%2Fagent.test%2Fcallback",
      "https://vibebook.test",
    ),
  ).toBe(
    "/authorize?client_id=x&redirect_uri=https%3A%2F%2Fagent.test%2Fcallback&ui=svelte",
  );
  expect(
    authContinuation("/b/abcdef?t=epic#file", "https://vibebook.test"),
  ).toBe("/b/abcdef?t=epic&ui=svelte#file");
  expect(
    authContinuation("/api/books/abcdef/files/123abc", "https://vibebook.test"),
  ).toBe("/api/books/abcdef/files/123abc");
  expect(consentReturn("javascript:alert(1)")).toBeNull();
  expect(consentReturn("https://user:pass@agent.test/callback")).toBeNull();
  expect(consentReturn("http://127.0.0.1:1234/?error=denied")).toBe(
    "http://127.0.0.1:1234/?error=denied",
  );
});
test("native shell allowlists only versioned emitted assets and public metadata", () => {
  const version = "0123456789abcdef0123";
  const shell = `<link href="https://fonts.googleapis.com/a"><link href="/app-svelte.css?v=${version}"><link rel="stylesheet" href="/svelte-preview/ui.css?v=${version}"><script src="/vendor/marked.js"></script><nav>legacy</nav><script type="module" src="/svelte-preview/app.js?v=${version}"></script>`;
  for (const page of ["login", "access", "consent"] as const) {
    const html = nativeAuthHtml(shell, { page, lang: "en", autoAccess: false });
    expect(html).toContain(`content="${page}"`);
    expect(html).toContain(`name="vb-v" content="${version}"`);
    expect(html).toContain(`/svelte-preview/app.js?v=${version}`);
    expect(html).toContain(`/svelte-preview/ui.css?v=${version}`);
    expect(html).not.toMatch(
      /legacy|vendor|googleapis|app-svelte\.css|<style|<nav/,
    );
    expect(html).not.toContain("handle");
    expect(html).not.toContain("email");
  }
  expect(() =>
    nativeAuthHtml(
      shell + `<script src="/svelte-preview/app.js?v=${version}"></script>`,
      { page: "login", lang: "pt", autoAccess: false },
    ),
  ).toThrow("exactly one");
  expect(() =>
    nativeAuthHtml(shell.replace(/\?v=[a-f0-9]+/g, ""), {
      page: "login",
      lang: "pt",
      autoAccess: false,
    }),
  ).toThrow("versioned");
  expect(() =>
    nativeAuthHtml(shell.replace("/svelte-preview/ui.css", "/other.css"), {
      page: "login",
      lang: "pt",
      autoAccess: false,
    }),
  ).toThrow("exactly one");
  expect(
    NativeAuthMetadata.safeParse({
      page: "legacy",
      lang: "en",
      autoAccess: true,
    }).success,
  ).toBe(false);
});
test("typed auth adapters validate malformed success and contextual errors", async () => {
  const calls: { url: string; init?: RequestInit }[] = [];
  let response = new Response(JSON.stringify(login));
  const http = createAuthApi(async (input, init) => {
    calls.push({ url: String(input), init });
    return response.clone();
  });
  expect((await http.login("?next=%2Fb%2Fabcdef&error=google")).next).toBe(
    login.next,
  );
  expect(calls[0]!.url).toContain("next=%2Fb%2Fabcdef");
  response = new Response('{"ok":true}');
  await http.start("me@test.com");
  expect(JSON.parse(String(calls[1]!.init?.body))).toEqual({
    email: "me@test.com",
  });
  response = new Response('{"ok":false}');
  await expect(http.start("me@test.com")).rejects.toThrow();
  response = new Response('{"error":"rate limited"}', { status: 429 });
  await expect(http.verify("me@test.com", "123456", "/app")).rejects.toThrow(
    "rate limited",
  );
  response = new Response("not-json");
  await expect(http.access("abcdef")).rejects.toThrow();
  response = new Response(JSON.stringify(consent));
  expect((await http.consent("?client_id=x&state=a%2Bb")).handle).toBe(
    consent.handle,
  );
  expect(calls.at(-1)!.url).toContain("state=a%2Bb");
  response = new Response(
    '{"error":"invalid_request","redirect_to":"https://agent.test/callback?error=invalid"}',
    { status: 400 },
  );
  try {
    await http.consent("?client_id=x");
    throw Error("accepted");
  } catch (error) {
    expect(error).toBeInstanceOf(AuthFailure);
    if (error instanceof AuthFailure)
      expect(error.returnTo).toContain("https://agent.test");
  }
});
test("login rejects duplicates, retains failed code and navigates only after validated success", async () => {
  const time = timer(),
    answer = deferred<{ ok: true }>(),
    destinations: string[] = [];
  let starts = 0;
  const session = createLoginSession(
    api({
      start: async () => {
        starts++;
        return answer.promise;
      },
      verify: async () => {
        throw new Error("Wrong code.");
      },
    }),
    "",
    "https://vibebook.test",
    (url) => destinations.push(url),
    time.clock,
  );
  await session.load();
  session.email(" ME@Test.com ");
  const first = session.submit();
  session.submit();
  expect(starts).toBe(1);
  answer.resolve({ ok: true });
  await first;
  expect(get(session.state)).toMatchObject({
    phase: "code",
    email: "me@test.com",
    busy: false,
  });
  session.code("12x3456");
  await session.submit();
  expect(get(session.state)).toMatchObject({
    code: "123456",
    error: "Wrong code.",
    busy: false,
  });
  expect(destinations).toEqual([]);
  session.back();
  expect(get(session.state)).toMatchObject({
    phase: "email",
    email: "me@test.com",
    code: "",
  });
  session.dispose();
  expect(time.jobs.size).toBe(0);
});
test("login verification rejects unsafe returned next and expired/disposed results cannot navigate", async () => {
  const time = timer(),
    destinations: string[] = [];
  const session = createLoginSession(
    api({ verify: async () => ({ ok: true, next: "https://evil.test/" }) }),
    "",
    "https://vibebook.test",
    (url) => destinations.push(url),
    time.clock,
  );
  await session.load();
  session.email("me@test.com");
  await session.submit();
  session.code("123456");
  await session.submit();
  expect(destinations).toEqual(["/app?ui=svelte"]);
  session.dispose();
  const old = deferred<{ ok: true; next: string }>();
  const stale = createLoginSession(
    api({ verify: () => old.promise }),
    "",
    "https://vibebook.test",
    (url) => destinations.push(url),
    time.clock,
  );
  await stale.load();
  stale.email("me@test.com");
  await stale.submit();
  stale.code("123456");
  const pending = stale.submit();
  stale.dispose();
  const before = get(stale.state);
  old.resolve({ ok: true, next: "/app" });
  await pending;
  stale.email("changed@test.com");
  stale.back();
  await stale.load();
  expect(get(stale.state)).toEqual(before);
  expect(destinations).toHaveLength(1);
});
test("owner times out requests, aborts transport and prevents old callbacks from stealing retry", async () => {
  const time = timer(),
    owner = createAuthOwner(time.clock),
    old = deferred<string>(),
    values: string[] = [],
    failures: string[] = [];
  let signal: AbortSignal | undefined;
  const first = owner.run(
    (s) => {
      signal = s;
      return old.promise;
    },
    (value) => values.push(value),
    (error) => failures.push(String(error)),
  );
  const callbacks = [...time.jobs];
  time.fire();
  expect(signal?.aborted).toBe(true);
  expect(failures).toEqual(["Error: timeout"]);
  const current = deferred<string>();
  const second = owner.run(
    () => current.promise,
    (value) => values.push(value),
    () => {
      throw Error("stale timer");
    },
  );
  old.resolve("old");
  await first;
  for (const fn of callbacks) fn();
  current.resolve("new");
  await second;
  expect(values).toEqual(["new"]);
  owner.dispose();
  expect(time.jobs.size).toBe(0);
});
test("access sends no bare-link request, auto-request is explicit and ask errors preserve context", async () => {
  const time = timer(),
    destinations: string[] = [];
  let asks = 0;
  const bare = createAccessSession(
    api({
      ask: async () => {
        asks++;
        return { ok: true };
      },
    }),
    "abcdef",
    false,
    (url) => destinations.push(url),
    time.clock,
  );
  await bare.load();
  expect(asks).toBe(0);
  await bare.ask();
  expect(asks).toBe(1);
  expect(destinations).toEqual(["/b/abcdef?ui=svelte"]);
  bare.dispose();
  const auto = createAccessSession(
    api({
      ask: async () => {
        asks++;
        throw new Error("rate limited");
      },
    }),
    "abcdef",
    true,
    (url) => destinations.push(url),
    time.clock,
  );
  await auto.load();
  await Promise.resolve();
  expect(asks).toBe(2);
  expect(get(auto.state)).toMatchObject({
    context: { state: "ask" },
    error: "rate limited",
  });
  await auto.load();
  expect(asks).toBe(2);
  auto.dispose();
});
test("asked access polls real context, handles approval and disposal suppresses departed-page navigation", async () => {
  const time = timer(),
    destinations: string[] = [];
  let approved = false;
  const session = createAccessSession(
    api({
      access: async () => ({
        state: approved ? "member" : "asked",
        email: "me@test.com",
        title: "Room",
      }),
    }),
    "abcdef",
    false,
    (url) => destinations.push(url),
    time.clock,
  );
  await session.load();
  expect(time.jobs.size).toBe(1);
  approved = true;
  time.fire();
  await Promise.resolve();
  await Promise.resolve();
  expect(destinations).toEqual(["/b/abcdef?ui=svelte"]);
  session.dispose();
  expect(time.jobs.size).toBe(0);
  const late = deferred<Awaited<ReturnType<AuthApi["access"]>>>();
  const old = createAccessSession(
    api({ access: () => late.promise }),
    "abcdef",
    false,
    (url) => destinations.push(url),
    time.clock,
  );
  const pending = old.load();
  old.dispose();
  late.resolve({ state: "member", email: "me@test.com", title: "Room" });
  await pending;
  expect(destinations).toHaveLength(1);
});
test("consent validates context and offers only safe explicit error returns, with stale result suppression", async () => {
  const time = timer(),
    session = createConsentSession(
      api({
        consent: async () => {
          throw new AuthFailure("invalid", 400, "javascript:alert(1)");
        },
      }),
      "?client_id=x",
      time.clock,
    );
  await session.load();
  expect(get(session.state)).toMatchObject({
    error: "invalid",
    returnTo: null,
    context: null,
  });
  session.dispose();
  const late = deferred<typeof consent>(),
    old = createConsentSession(
      api({ consent: () => late.promise }),
      "?client_id=x",
      time.clock,
    );
  const pending = old.load();
  old.dispose();
  const before = get(old.state);
  late.resolve(consent);
  await pending;
  await old.load();
  expect(get(old.state)).toEqual(before);
  expect(time.jobs.size).toBe(0);
});

test("protocol queries preserve duplicate values and treat prototype keys as data", () => {
  const query = oauthQuery("?scope=rooms&scope=offline_access&__proto__=value");
  expect(query.scope).toEqual(["rooms", "offline_access"]);
  expect(Object.hasOwn(query, "__proto__")).toBe(true);
  expect(query["__proto__"]).toBe("value");
  expect(authIssue("en", "toString")).toBe("toString");
});

test("signed-out consent and access mutations expose recovery without navigating or polling forever", async () => {
  const time = timer(),
    urls: string[] = [];
  const access = createAccessSession(
    api({
      ask: async () => {
        throw new AuthFailure("unauthenticated", 401);
      },
    }),
    "abcdef",
    false,
    (url) => urls.push(url),
    time.clock,
  );
  await access.load();
  await access.ask();
  expect(get(access.state).signedOut).toBe(true);
  expect(urls).toEqual([]);
  access.dispose();
  const consent = createConsentSession(
    api({
      consent: async () => {
        throw new AuthFailure("unauthenticated", 401);
      },
    }),
    "?client_id=x",
    time.clock,
  );
  await consent.load();
  expect(get(consent.state).signedOut).toBe(true);
  consent.dispose();
  const before = get(consent.state);
  await consent.load();
  expect(get(consent.state)).toEqual(before);
  expect(time.jobs.size).toBe(0);
});
test("native shell rejects mixed asset generations and escapes the standard no-JS URL", () => {
  const a = "a".repeat(20),
    b = "b".repeat(20),
    shell = `<link href="/svelte-preview/ui.css?v=${a}"><script src="/svelte-preview/app.js?v=${a}"></script>`;
  expect(() =>
    nativeAuthHtml(shell.replace("ui.css?v=" + a, "ui.css?v=" + b), {
      page: "consent",
      lang: "en",
      autoAccess: false,
    }),
  ).toThrow("mismatched");
  const html = nativeAuthHtml(
    shell,
    { page: "consent", lang: "en", autoAccess: false },
    '/authorize?client_id=x&state="quoted"',
  );
  expect(html).toContain(
    'href="/authorize?client_id=x&amp;state=&quot;quoted&quot;"',
  );
  expect(html).toContain("<noscript>");
});
