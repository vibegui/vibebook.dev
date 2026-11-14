// Real loopback OAuth provider/browser verification. This script starts no servers
// and never supplies provider/KV responses or changes their clock/state directly.
import assert from "node:assert/strict";
import { createHash, randomBytes } from "node:crypto";
import { execFileSync } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import { request as httpRequest, type IncomingHttpHeaders } from "node:http";
import {
  chromium,
  expect as baseExpect,
  type Browser,
  type BrowserContext,
  type Page,
} from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import * as z from "zod/mini";
import {
  AccessContext,
  AgentGrantsResult,
  ConsentContext,
  CreateRoomResult,
  MeResult,
} from "../shared/schemas";

const base = process.env.TEST_BASE_URL ?? "http://127.0.0.1:8797";
const source = process.env.TEST_SOURCE_URL;
const output =
  process.env.TEST_OUTPUT_DIR ?? "/tmp/vibebook-native-auth-browser";
const ttlEnabled = process.env.TEST_AUTH_TTL === "1";
const timeout = Number(process.env.TEST_AUTH_TIMEOUT_MS ?? 60_000);
for (const origin of [base, ...(source ? [source] : [])])
  assert(
    /^http:\/\/(?:127\.0\.0\.1|localhost):\d+$/.test(origin),
    "Use existing loopback Worker/Vite origins only",
  );
if (source)
  assert.equal(
    new URL(source).hostname,
    new URL(base).hostname,
    "Worker/Vite must use the same loopback hostname for the real browser cookie boundary",
  );
assert(
  Number.isFinite(timeout) && timeout >= 10_000 && timeout <= 600_000,
  "Invalid auth timeout",
);
const expect = baseExpect.configure({ timeout });
const run = randomBytes(5).toString("hex"),
  email = `auth-owner-${run}@example.test`;
const secrets = new Set<string>();
function secret(value: string) {
  if (value.length >= 8) {
    secrets.add(value);
    secrets.add(encodeURIComponent(value));
  }
  return value;
}
function redact(value: string) {
  for (const item of [...secrets].sort((a, b) => b.length - a.length))
    value = value.replaceAll(item, "[redacted]");
  return value;
}
const result: Record<string, unknown> = {
  scope:
    "Real native OAuth/DCR/PKCE lifecycle on a loopback Worker; no production or complete M6/M7 acceptance",
  harnessHead: execFileSync("git", ["rev-parse", "HEAD"], {
    encoding: "utf8",
    cwd: new URL("..", import.meta.url),
  }).trim(),
  declaredAppHead: process.env.TEST_APP_HEAD ?? null,
  provider: "@cloudflare/workers-oauth-provider 1.2.4",
  status: "running",
  ttl: {
    status: ttlEnabled ? "pending" : "unrun",
    reason: ttlEnabled
      ? "Requires real 600-second wall clock expiry"
      : "Set TEST_AUTH_TTL=1 for the actual provider/KV expiry gate",
  },
  gaps: [
    "DEV example.test identities verify the real consent provider, not email delivery or application email-login/session-cookie issuance.",
    "Signed-out login/logout and Google/GitHub provider end-to-end need a separate DEV_EMAIL-free Worker and real test-provider/mailbox credentials.",
    "Unexpected native500 is covered by source/mock-provider fixtures only; this real harness does not fabricate a provider500.",
    "Sequential replay is verified. The provider documents non-atomic KV get/delete for simultaneous same-browser consumption; no global concurrency guarantee is claimed.",
    "Browser callback fulfillment is an explicit registered relying-party landing fixture only; provider/auth/token/API responses are never intercepted.",
  ],
};
const phases: { name: string; ms: number; status: string }[] = [],
  audits: unknown[] = [],
  trace: { method: string; path: string; status: number }[] = [],
  pageErrors: string[] = [];
let phase = "initialization",
  browser: Browser | undefined;
const interrupted = new AbortController();
const stop = () => {
  interrupted.abort();
  void browser?.close().catch(() => {});
};
process.once("SIGINT", stop);
process.once("SIGTERM", stop);
const actors: {
  context: BrowserContext;
  page: Page;
  ui: string;
  requests: string[];
}[] = [];
async function step(name: string, work: () => Promise<void>) {
  phase = name;
  const at = performance.now();
  try {
    await work();
    phases.push({
      name,
      ms: Math.round(performance.now() - at),
      status: "pass",
    });
  } catch (error) {
    phases.push({
      name,
      ms: Math.round(performance.now() - at),
      status: "fail",
    });
    throw error;
  }
}
function pathOf(value: string) {
  const url = new URL(value);
  return (
    url.pathname +
    (url.search ? "?" + [...url.searchParams.keys()].sort().join("&") : "")
  );
}
type Actor = (typeof actors)[number];
type Client = {
  id: string;
  redirect: string;
  verifier: string;
  state: string;
  query: URLSearchParams;
};
type Transaction = {
  handle: string;
  cookie: string;
  bindingName: string;
  bindingValue: string;
  issued: number;
  ttl: number;
  client: Client;
};
type Wire = { status: number; headers: IncomingHttpHeaders; text: string };
async function protocol(
  origin: string,
  path: string,
  form: URLSearchParams,
  cookie: string,
  metadata: Record<string, string | undefined> = {},
): Promise<Wire> {
  assert(!interrupted.signal.aborted, "Verification interrupted");
  const body = Buffer.from(form.toString());
  return new Promise((resolve, reject) => {
    const headers: Record<string, string> = {
      "content-type": "application/x-www-form-urlencoded",
      "content-length": String(body.length),
      cookie,
      origin,
    };
    for (const [name, value] of Object.entries(metadata))
      if (value === undefined) delete headers[name];
      else headers[name] = value;
    const req = httpRequest(
      new URL(path, origin),
      { method: "POST", headers },
      (response) => {
        const chunks: Uint8Array[] = [];
        let size = 0;
        response.on("data", (chunk: unknown) => {
          if (
            !(chunk instanceof Uint8Array) ||
            (size += chunk.length) > 1_048_576
          ) {
            response.destroy(Error("Unexpected protocol response size/type"));
            return;
          }
          chunks.push(chunk);
        });
        response.on("error", reject);
        response.on("end", () => {
          trace.push({
            method: "POST",
            path: pathOf(new URL(path, origin).href),
            status: response.statusCode ?? 0,
          });
          resolve({
            status: response.statusCode ?? 0,
            headers: response.headers,
            text: Buffer.concat(chunks).toString("utf8"),
          });
        });
      },
    );
    const deadline = setTimeout(
      () =>
        req.destroy(
          Error("Protocol deadline exceeded; mutation outcome unconfirmed"),
        ),
      timeout,
    );
    req.once("close", () => clearTimeout(deadline));
    const abort = () =>
      req.destroy(
        Error("Verification interrupted; mutation outcome unconfirmed"),
      );
    interrupted.signal.addEventListener("abort", abort, { once: true });
    req.once("close", () =>
      interrupted.signal.removeEventListener("abort", abort),
    );
    req.setTimeout(timeout, () =>
      req.destroy(Error("Protocol request timed out; outcome unconfirmed")),
    );
    req.on("error", reject);
    req.end(body);
  });
}
async function cookieHeader(actor: Actor) {
  const cookies = await actor.context.cookies(actor.ui);
  for (const cookie of cookies) secret(cookie.value);
  return cookies.map((cookie) => `${cookie.name}=${cookie.value}`).join("; ");
}
async function grants(actor: Actor) {
  const response = await actor.context.request.get(`${base}/api/agents`, {
    timeout,
  });
  assert(response.ok(), "Canonical grant read failed");
  const raw: unknown = await response.json();
  const parsed = AgentGrantsResult.safeParse(raw);
  assert(parsed.success, "Canonical grant response malformed");
  return parsed.data.agents.map((grant) => grant.id).sort();
}
async function actor(
  ui: string,
  identity = email,
  mobile = false,
  lang = "en",
): Promise<Actor> {
  assert(browser);
  const context = await browser.newContext({
    viewport: mobile
      ? { width: 390, height: 844 }
      : { width: 1280, height: 900 },
    isMobile: mobile,
    hasTouch: mobile,
    colorScheme: mobile ? "dark" : "light",
    locale: lang,
  });
  context.setDefaultTimeout(timeout);
  context.setDefaultNavigationTimeout(timeout);
  const allowed = new Set([new URL(base).origin, new URL(ui).origin]);
  await context.route("**/*", (route) =>
    allowed.has(new URL(route.request().url()).origin)
      ? route.continue()
      : route.abort("blockedbyclient"),
  );
  // Only the registered client's landing page is fulfilled, after the real302.
  await context.route(
    (url) =>
      url.origin === new URL(ui).origin &&
      url.pathname === "/native-auth-callback",
    (route) =>
      route.fulfill({
        status: 200,
        contentType: "text/plain",
        body: "Registered local OAuth client callback fixture",
      }),
  );
  await context.route("https://fonts.googleapis.com/**", (route) =>
    route.fulfill({ status: 200, contentType: "text/css", body: "" }),
  );
  const picked = await context.request.get(
    `${base}/api/dev/as?email=${encodeURIComponent(identity)}`,
    { maxRedirects: 0, timeout },
  );
  assert.equal(
    picked.status(),
    302,
    "Supported loopback DEV identity endpoint required",
  );
  const meResponse = await context.request.get(`${base}/api/me?ui=svelte`, {
    timeout,
  });
  assert(meResponse.ok(), "DEV identity confirmation failed");
  const me = MeResult.safeParse(await meResponse.json());
  assert(me.success, "Malformed DEV identity response");
  assert.equal(
    me.data.email,
    identity,
    "Unexpected authenticated DEV identity",
  );
  if (result.workerVersion === undefined) result.workerVersion = me.data.v;
  await context.addCookies([{ name: "vb_lang", value: lang, url: base }]);
  const page = await context.newPage(),
    entry: Actor = { context, page, ui, requests: [] };
  actors.push(entry);
  page.on("request", (request) => entry.requests.push(request.url()));
  page.on("pageerror", (error) => pageErrors.push(error.message));
  page.on("websocket", (socket) => entry.requests.push(socket.url()));
  page.on("response", (response) => {
    const url = new URL(response.url());
    if ([new URL(base).origin, new URL(ui).origin].includes(url.origin))
      trace.push({
        method: response.request().method(),
        path: pathOf(url.href),
        status: response.status(),
      });
  });
  return entry;
}
async function client(actor: Actor): Promise<Client> {
  const redirect = `${actor.ui}/native-auth-callback`,
    response = await actor.context.request.post(`${base}/oauth/register`, {
      timeout,
      data: {
        client_name: `Native auth ${run} <img src=x onerror=alert(1)>`,
        redirect_uris: [redirect],
        grant_types: ["authorization_code", "refresh_token"],
        response_types: ["code"],
        token_endpoint_auth_method: "none",
      },
    });
  assert(response.ok(), "Actual dynamic client registration failed");
  const parsed = z
    .object({ client_id: z.string() })
    .safeParse(await response.json());
  assert(parsed.success, "Malformed DCR response");
  const verifier = secret(randomBytes(32).toString("base64url")),
    state = secret(randomBytes(16).toString("hex"));
  return {
    id: parsed.data.client_id,
    redirect,
    verifier,
    state,
    query: new URLSearchParams({
      response_type: "code",
      client_id: parsed.data.client_id,
      redirect_uri: redirect,
      scope: "rooms",
      code_challenge: createHash("sha256").update(verifier).digest("base64url"),
      code_challenge_method: "S256",
      state,
      ui: "svelte",
    }),
  };
}
async function transaction(
  actor: Actor,
  registered?: Client,
  reload = false,
): Promise<Transaction> {
  const registration = registered ?? (await client(actor)),
    pending = actor.page.waitForResponse(
      (response) =>
        new URL(response.url()).pathname === "/api/authorize/context",
    );
  const document = reload
    ? await actor.page.reload()
    : await actor.page.goto(`${actor.ui}/authorize?${registration.query}`);
  assert(
    document && document.status() === 200,
    "Native consent document failed",
  );
  const response = await pending;
  assert(response.ok(), "Actual native consent context failed");
  const raw: unknown = await response.json();
  if (
    typeof raw === "object" &&
    raw !== null &&
    "handle" in raw &&
    typeof raw.handle === "string"
  )
    secret(raw.handle);
  const parsed = ConsentContext.safeParse(raw);
  assert(parsed.success, "Consent context malformed");
  assert(
    typeof raw === "object" && raw !== null && !Array.isArray(raw),
    "Consent context must be an object",
  );
  assert.deepEqual(
    Object.keys(raw).sort(),
    [
      "client_name",
      "client_domain",
      "redirect_host",
      "redirect_is_loopback",
      "scope",
      "email",
      "handle",
    ].sort(),
    "Consent context must contain public review metadata and opaque handle only",
  );
  const handle = secret(parsed.data.handle);
  await expect(actor.page.locator('input[name="handle"]')).toHaveValue(handle);
  assert.equal(parsed.data.email, email, "Consent identity mismatch");
  const html = await document.text();
  assert(
    !html.includes(handle),
    "Native initial HTML leaked the transaction handle",
  );
  assert(
    html.includes('name="vb-page" content="consent"'),
    "Native consent shell marker missing",
  );
  assert.equal(
    await actor.page
      .locator('button[name="decision"]')
      .first()
      .getAttribute("value"),
    "deny",
    "First consent submitter must deny",
  );
  assert.equal(
    await actor.page.locator('img[src="x"]').count(),
    0,
    "Client metadata was interpreted as HTML",
  );
  const hash = secret(createHash("sha256").update(handle).digest("hex")),
    cookies = await actor.context.cookies(actor.ui),
    binding = cookies.find(
      (cookie) => cookie.name === `__Host-oauth-consent-${hash.slice(0, 16)}`,
    );
  assert(
    binding && binding.value === hash,
    "Real browser-bound transaction cookie missing",
  );
  assert(
    binding.httpOnly && binding.secure && binding.path === "/",
    "Consent cookie flags changed",
  );
  const setCookie =
    (await response.headersArray()).find(
      (header) =>
        header.name.toLowerCase() === "set-cookie" &&
        header.value.startsWith(binding.name + "="),
    )?.value ?? "";
  const ttl = Number(/(?:^|;)\s*Max-Age=(\d+)/i.exec(setCookie)?.[1]);
  assert(
    ttl === 600,
    "Provider transaction TTL changed; review pinned provider before changing the gate",
  );
  return {
    handle,
    cookie: await cookieHeader(actor),
    bindingName: binding.name,
    bindingValue: secret(binding.value),
    issued: Date.now(),
    ttl,
    client: registration,
  };
}
function denied(response: Wire, registered: Client) {
  assert.equal(response.status, 302, "Actual denial must redirect");
  assert(response.headers.location, "Denial redirect missing");
  const url = new URL(response.headers.location);
  assert.equal(
    url.origin + url.pathname,
    registered.redirect,
    "Denial used unregistered redirect",
  );
  assert.equal(
    url.searchParams.get("error"),
    "access_denied",
    "Denial error changed",
  );
  assert.equal(
    url.searchParams.get("state"),
    registered.state,
    "Denial lost original state",
  );
  assert(!url.searchParams.has("code"), "Denial minted a code");
}
async function decision(
  actor: Actor,
  tx: Transaction,
  value: "approve" | "deny",
  keyboard = false,
): Promise<Wire> {
  const pending = actor.page.waitForResponse(
    (response) =>
      new URL(response.url()).pathname === "/authorize" &&
      response.request().method() === "POST",
  );
  const button = actor.page.locator(
    `button[name="decision"][value="${value}"]`,
  );
  if (keyboard) {
    await button.focus();
    await actor.page.keyboard.press("Enter");
  } else await button.click();
  const response = await pending;
  assert.equal(response.status(), 302, "Real consent form did not redirect");
  const headers: IncomingHttpHeaders = {};
  for (const header of await response.headersArray())
    if (header.name.toLowerCase() === "set-cookie")
      headers["set-cookie"] = [...(headers["set-cookie"] ?? []), header.value];
    else headers[header.name.toLowerCase()] = header.value;
  await actor.page.waitForURL(
    (url) => url.origin + url.pathname === tx.client.redirect,
    { timeout },
  );
  return { status: response.status(), headers, text: "" };
}
async function audit(actor: Actor, label: string) {
  const report = await new AxeBuilder({ page: actor.page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  audits.push({
    label,
    violations: report.violations.map((v) => ({
      id: v.id,
      impact: v.impact,
      nodes: v.nodes.length,
    })),
  });
  assert(
    !report.violations.some(
      (v) => v.impact === "critical" || v.impact === "serious",
    ),
    "Native auth has serious/critical accessibility violations",
  );
}
async function noGrant(actor: Actor, before: string[]) {
  assert.deepEqual(
    await grants(actor),
    before,
    "Read/denial/invalid request changed actual grants",
  );
}
function form(handle: string, decision?: string) {
  const value = new URLSearchParams({ handle });
  if (decision !== undefined) value.set("decision", decision);
  return value;
}
function nativeAssets(actor: Actor, from: number) {
  const paths = actor.requests.slice(from);
  assert(
    !paths.some(
      (url) =>
        /\/(?:legacy\/host(?:\.js)?|host[-.]|collab(?:-svelte)?\.js|inbox\.js|ws(?:\/|-)|yjs\/)/.test(
          new URL(url).pathname,
        ) || new URL(url).origin === "https://fonts.googleapis.com",
    ),
    "Native auth loaded a legacy host/runtime/style asset",
  );
}

await mkdir(output, { recursive: true });
try {
  browser = await chromium.launch({ headless: true });
  const primary = await actor(source ?? base),
    baseline = await grants(primary);
  let ttl: Transaction | undefined;
  if (ttlEnabled)
    await step("start real TTL transaction", async () => {
      ttl = await transaction(primary);
    });
  let approvedToken = "";
  await step("native selection, GET/context/reload cannot grant", async () => {
    const start = primary.requests.length,
      tx = await transaction(primary),
      fresh = await transaction(primary, tx.client, true);
    assert.notEqual(
      fresh.handle,
      tx.handle,
      "Reload must mount a fresh native transaction",
    );
    await noGrant(primary, baseline);
    nativeAssets(primary, start);
    await audit(primary, "EN desktop native consent");
    const entry = primary.requests.find((url) =>
      /\/(?:bootstrap\.ts|svelte-preview\/app\.js)(?:\?|$)/.test(url),
    );
    assert(entry, "Native entry request missing");
    const asset = await primary.context.request.get(entry, { timeout });
    assert(asset.ok(), "Native entry read failed");
    result.application = {
      entry: new URL(entry).pathname + new URL(entry).search,
      entrySha256: createHash("sha256")
        .update(await asset.body())
        .digest("hex"),
      documentVersion: await primary.page
        .locator('meta[name="vb-v"]')
        .getAttribute("content")
        .catch(() => null),
      sourceMode: !!source,
    };
    denied(await decision(primary, fresh, "deny", true), fresh.client);
    await noGrant(primary, baseline);
    const legacy = await client(primary);
    legacy.query.delete("ui");
    const response = await primary.context.request.get(
      `${base}/authorize?${legacy.query}`,
      { maxRedirects: 0, timeout },
    );
    assert.equal(response.status(), 200, "Vanilla consent default failed");
    const html = await response.text();
    assert(
      !html.includes('name="vb-page"'),
      "Default consent selected native UI",
    );
    const handle = secret(
      /name="handle" value="([^"]+)"/.exec(html)?.[1] ?? "",
    );
    assert(handle, "Vanilla real handle missing");
    denied(
      await protocol(
        base,
        `/authorize?${legacy.query}`,
        form(handle),
        await cookieHeader(primary),
      ),
      legacy,
    );
    await noGrant(primary, baseline);
  });
  await step(
    "real native approve, PKCE binding, consumed code and consent replay",
    async () => {
      const tx = await transaction(primary),
        response = await decision(primary, tx, "approve");
      assert(response.headers.location, "Approval redirect missing");
      const callback = new URL(response.headers.location);
      assert.equal(callback.origin + callback.pathname, tx.client.redirect);
      assert.equal(callback.searchParams.get("state"), tx.client.state);
      const code = secret(callback.searchParams.get("code") ?? "");
      assert(code, "Approval code missing");
      assert(
        (response.headers["set-cookie"] ?? []).some(
          (value) =>
            value.startsWith(tx.bindingName + "=") && /Max-Age=0/i.test(value),
        ),
        "Approval did not clear real binding cookie",
      );
      const tokenForm = (verifier: string) =>
        new URLSearchParams({
          grant_type: "authorization_code",
          client_id: tx.client.id,
          code,
          redirect_uri: tx.client.redirect,
          code_verifier: verifier,
        });
      const wrong = await protocol(
        base,
        "/oauth/token",
        tokenForm(secret(randomBytes(32).toString("base64url"))),
        "",
      );
      assert.equal(wrong.status, 400, "Wrong PKCE verifier accepted");
      const exchanged = await protocol(
        base,
        "/oauth/token",
        tokenForm(tx.client.verifier),
        "",
      );
      assert.equal(exchanged.status, 200, "Actual code exchange failed");
      const token = z
        .object({ access_token: z.string() })
        .safeParse(JSON.parse(exchanged.text));
      assert(token.success, "Actual token response malformed");
      approvedToken = secret(token.data.access_token);
      const mcp = await primary.context.request.post(`${base}/mcp`, {
        timeout,
        headers: { authorization: `Bearer ${approvedToken}` },
        data: { jsonrpc: "2.0", id: 1, method: "tools/list", params: {} },
      });
      assert(mcp.ok(), "Real issued access token did not authenticate MCP");
      const rpc: unknown = await mcp.json();
      assert(
        typeof rpc === "object" && rpc !== null && "result" in rpc,
        "Actual MCP tools/list failed",
      );
      const replay = await protocol(
        source ?? base,
        `/authorize?${tx.client.query}`,
        form(tx.handle, "approve"),
        tx.cookie,
      );
      assert.equal(
        replay.status,
        400,
        "Consumed consent transaction replay accepted",
      );
      const actual = await grants(primary);
      assert.equal(
        actual.length,
        baseline.length + 1,
        "Approval did not create exactly one canonical grant",
      );
      assert(
        actual.some((id) => !baseline.includes(id)),
        "Canonical grant missing",
      );
      // Pinned provider deliberately revokes the entire grant on code replay.
      assert.equal(
        (
          await protocol(
            base,
            "/oauth/token",
            tokenForm(tx.client.verifier),
            "",
          )
        ).status,
        400,
        "Consumed authorization code replay accepted",
      );
      await noGrant(primary, baseline);
      const rejected = await primary.context.request.post(`${base}/mcp`, {
        timeout,
        headers: { authorization: `Bearer ${approvedToken}` },
        data: { jsonrpc: "2.0", id: 2, method: "tools/list", params: {} },
      });
      assert.equal(
        rejected.status(),
        401,
        "Replayed-code grant still authenticated MCP",
      );
      result.approval = {
        tokenAuthenticatedMcp: true,
        codeReplayRejected: true,
        codeReplayRevokedGrant: true,
        consentReplayRejected: true,
      };
    },
  );
  await step(
    "wrong browser/mismatched cookie cannot consume a real transaction",
    async () => {
      const before = await grants(primary),
        tx = await transaction(primary),
        other = await actor(source ?? base),
        otherTx = await transaction(other);
      for (const cookie of [
        otherTx.cookie,
        tx.cookie.replace(
          `${tx.bindingName}=${tx.bindingValue}`,
          `${tx.bindingName}=${otherTx.bindingValue}`,
        ),
      ])
        assert.equal(
          (
            await protocol(
              base,
              `/authorize?${tx.client.query}`,
              form(tx.handle, "approve"),
              cookie,
            )
          ).status,
          400,
          "Wrong binding cookie accepted",
        );
      denied(
        await protocol(
          base,
          `/authorize?${tx.client.query}`,
          form(tx.handle, "deny"),
          tx.cookie,
        ),
        tx.client,
      );
      denied(
        await protocol(
          base,
          `/authorize?${otherTx.client.query}`,
          form(otherTx.handle, "deny"),
          otherTx.cookie,
        ),
        otherTx.client,
      );
      await noGrant(primary, before);
      await other.context.close();
    },
  );
  await step(
    "actual Worker CSRF rejects nominated Origin/Sec-Fetch metadata without consuming handle",
    async () => {
      const before = await grants(primary),
        tx = await transaction(primary);
      for (const origin of [base, ...(source ? [source] : [])])
        for (const metadata of [
          {
            origin: "https://evil.example.test",
            "sec-fetch-site": "same-origin",
          },
          { origin: undefined, "sec-fetch-site": "cross-site" },
          { origin, "sec-fetch-site": "cross-site" },
        ]) {
          const response = await protocol(
            origin,
            `/authorize?${tx.client.query}`,
            form(tx.handle, "approve"),
            tx.cookie,
            { ...metadata, connection: "origin, sec-fetch-site" },
          );
          assert.equal(response.status, 403, "Worker CSRF gate bypassed");
        }
      denied(
        await protocol(
          base,
          `/authorize?${tx.client.query}`,
          form(tx.handle),
          tx.cookie,
        ),
        tx.client,
      );
      await noGrant(primary, before);
    },
  );
  await step(
    "real native POST400 has no automatic consent GET until explicit Retry",
    async () => {
      const before = await grants(primary),
        tx = await transaction(primary),
        start = primary.requests.length;
      // Malformed client input only; the Worker/provider response remains real.
      await primary.page.locator('input[name="handle"]').evaluate((input) => {
        if (!(input instanceof HTMLInputElement))
          throw Error("Consent form input missing");
        input.value = "invalid-client-handle";
      });
      const posted = primary.page.waitForResponse(
        (response) =>
          new URL(response.url()).pathname === "/authorize" &&
          response.request().method() === "POST",
      );
      await primary.page
        .locator('button[name="decision"][value="approve"]')
        .click();
      const response = await posted;
      assert.equal(
        response.status(),
        400,
        "Invalid handle did not produce real POST400",
      );
      await primary.page.waitForLoadState("domcontentloaded");
      await expect(primary.page.locator('[role="alert"]')).toBeVisible();
      await primary.page.evaluate(
        () =>
          new Promise<void>((resolve) =>
            requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
          ),
      );
      assert(
        (await response.text()).includes('name="vb-consent-failure"'),
        "Real error marker missing",
      );
      assert.equal(
        primary.requests
          .slice(start)
          .filter((url) => new URL(url).pathname === "/api/authorize/context")
          .length,
        0,
        "Failure mount silently created a fresh consent transaction",
      );
      nativeAssets(primary, start);
      if (source)
        assert(
          (await response.text()).includes("/@vite/client"),
          "Real source POST400 omitted Vite client",
        );
      const retried = primary.page.waitForResponse(
        (r) => new URL(r.url()).pathname === "/api/authorize/context",
      );
      await primary.page
        .getByRole("button", { name: "Try again", exact: true })
        .click();
      assert((await retried).ok(), "Explicit consent retry failed");
      await expect(primary.page.locator('input[name="handle"]')).toHaveValue(
        /.+/,
      );
      await noGrant(primary, before);
      void tx;
    },
  );
  await step(
    "invalid redirects and missing room render real native public errors",
    async () => {
      const registration = await client(primary);
      registration.query.set(
        "redirect_uri",
        "https://evil.example.test/callback",
      );
      const response = await primary.page.goto(
        `${primary.ui}/authorize?${registration.query}`,
      );
      assert(
        response && response.status() === 400,
        "Unregistered redirect was accepted",
      );
      await expect(primary.page.locator('[role="alert"]')).toBeVisible();
      assert.equal(
        await primary.page.locator('input[name="handle"]').count(),
        0,
      );
      const missing = randomBytes(6).toString("hex"),
        access = await primary.page.goto(
          `${primary.ui}/b/${missing}?ui=svelte`,
        );
      assert(
        access && access.status() === 404,
        "Missing room page did not return real404",
      );
      await expect(
        primary.page.getByRole("heading", {
          name: "Room not found",
          exact: true,
        }),
      ).toBeVisible();
    },
  );
  await step("actual room access context is public metadata only", async () => {
    const created = await primary.context.request.post(`${base}/api/books`, {
      timeout,
      data: { title: `Auth public context ${run}` },
    });
    assert(created.ok(), "Supported room creation failed");
    const parsed = CreateRoomResult.safeParse(await created.json());
    assert(parsed.success, "Room creation response malformed");
    const outsider = await actor(base, `auth-outsider-${run}@example.test`),
      context = await outsider.context.request.get(
        `${base}/auth/room/${encodeURIComponent(parsed.data.id)}`,
        { timeout },
      );
    assert(context.ok(), "Public room context failed");
    const raw: unknown = await context.json();
    assert(
      AccessContext.safeParse(raw).success &&
        typeof raw === "object" &&
        raw !== null,
      "Public room context malformed",
    );
    assert(
      Object.keys(raw).every((key) =>
        ["state", "title", "email"].includes(key),
      ),
      "Public context disclosed private room data",
    );
    result.localRoomCreated = true;
    await outsider.context.close();
  });
  await step(
    "PT mobile keyboard/axe and native/default login selection",
    async () => {
      const mobile = await actor(source ?? base, email, true, "pt"),
        tx = await transaction(mobile),
        before = await grants(mobile);
      await audit(mobile, "PT mobile native consent");
      denied(await decision(mobile, tx, "deny", true), tx.client);
      await noGrant(mobile, before);
      const native = await mobile.page.goto(
        `${mobile.ui}/login?ui=svelte&next=%2Fapp`,
      );
      assert(native && native.status() === 200);
      assert((await native.text()).includes('name="vb-page" content="login"'));
      await expect(mobile.page.locator('input[type="email"]')).toBeVisible();
      await audit(
        mobile,
        "PT mobile native login (DEV identity, no login success claim)",
      );
      const vanilla = await mobile.context.request.get(
        `${base}/login?next=%2Fapp`,
        { timeout },
      );
      assert(vanilla.ok());
      assert(
        !(await vanilla.text()).includes('name="vb-page"'),
        "Login default selected native UI",
      );
      await mobile.context.close();
    },
  );
  await step("canonical grant cleanup uses supported revoke API", async () => {
    // A distinct real approval keeps explicit-revoke coverage independent of
    // the provider's mandatory replay-triggered revocation above.
    const tx = await transaction(primary),
      response = await decision(primary, tx, "approve");
    assert(response.headers.location, "Cleanup approval redirect missing");
    const callback = new URL(response.headers.location),
      code = secret(callback.searchParams.get("code") ?? "");
    assert(code, "Cleanup approval code missing");
    const exchanged = await protocol(
      base,
      "/oauth/token",
      new URLSearchParams({
        grant_type: "authorization_code",
        client_id: tx.client.id,
        code,
        redirect_uri: tx.client.redirect,
        code_verifier: tx.client.verifier,
      }),
      "",
    );
    assert.equal(exchanged.status, 200, "Cleanup code exchange failed");
    const token = z
      .object({ access_token: z.string() })
      .safeParse(JSON.parse(exchanged.text));
    assert(token.success, "Cleanup token malformed");
    const access = secret(token.data.access_token);
    const actual = await grants(primary);
    assert.equal(
      actual.length,
      baseline.length + 1,
      "Cleanup approval did not create exactly one grant",
    );
    const id = actual.find((id) => !baseline.includes(id));
    assert(id, "Cleanup grant missing");
    const revoked = await primary.context.request.post(
      `${base}/api/agents/revoke`,
      { timeout, data: { ids: [id] } },
    );
    assert(revoked.ok(), "Supported grant cleanup failed");
    await noGrant(primary, baseline);
    const rejected = await primary.context.request.post(`${base}/mcp`, {
      timeout,
      headers: { authorization: `Bearer ${access}` },
      data: { jsonrpc: "2.0", id: 3, method: "tools/list", params: {} },
    });
    assert.equal(
      rejected.status(),
      401,
      "Revoked actual grant still authenticated MCP",
    );
  });
  await step(
    "Not you keeps real logout form and safe query-only continuation (DEV session gap explicit)",
    async () => {
      const tx = await transaction(primary),
        pending = primary.page.waitForResponse(
          (response) =>
            new URL(response.url()).pathname === "/auth/logout" &&
            response.request().method() === "POST",
        );
      const continued = primary.page.getByRole("button", {
        name: "Continue signing out",
        exact: true,
      });
      await primary.page
        .locator('form[action="/auth/logout"] button[type="submit"]')
        .click();
      const first = await Promise.race([
        pending.then(() => "response"),
        continued.waitFor({ state: "visible", timeout }).then(() => "continue"),
      ]);
      if (first === "continue") {
        await expect(primary.page.locator('[role="alert"]')).toBeVisible();
        await continued.click();
      }
      const response = await pending;
      assert.equal(
        response.status(),
        303,
        "Real logout form must use its existing303",
      );
      const submitted = new URLSearchParams(
        response.request().postData() ?? "",
      );
      assert(
        !submitted.has("handle") &&
          !(response.request().postData() ?? "").includes(tx.handle),
        "Logout carried a consent handle",
      );
      await primary.page.waitForURL((url) => url.pathname === "/login", {
        timeout,
      });
      const login = new URL(primary.page.url()),
        next = new URL(login.searchParams.get("next") ?? "/", primary.ui);
      assert.equal(
        login.searchParams.get("ui"),
        "svelte",
        "Logout continuation lost native selection",
      );
      assert.equal(
        next.origin,
        new URL(primary.ui).origin,
        "Logout continuation escaped origin",
      );
      assert.equal(next.pathname, "/authorize");
      assert.equal(next.searchParams.get("client_id"), tx.client.id);
      assert.equal(next.searchParams.get("state"), tx.client.state);
      assert(!next.searchParams.has("handle"));
      // DEV fallback deliberately cannot establish real signed-out/session-cookie
      // behavior. Re-establish only the test identity for its canonical grant read.
      const picked = await primary.context.request.get(
        `${base}/api/dev/as?email=${encodeURIComponent(email)}`,
        { maxRedirects: 0, timeout },
      );
      assert.equal(picked.status(), 302);
      await noGrant(primary, baseline);
      result.logout = {
        realForm303: true,
        queryOnlyContinuation: true,
        applicationSignedOutGate: "unrun: DEV identity fallback",
      };
    },
  );
  if (ttlEnabled) {
    assert(ttl);
    const saved = ttl;
    await browser.close();
    browser = undefined;
    await step(
      "real provider/KV TTL expires with original matching cookie replay",
      async () => {
        const remaining = Math.max(
          0,
          saved.issued + (saved.ttl + 5) * 1000 - Date.now(),
        );
        result.ttl = {
          status: "waiting",
          ttlSeconds: saved.ttl,
          remainingMs: remaining,
        };
        await writeFile(
          `${output}/results.json`,
          redact(JSON.stringify({ ...result, phases }, null, 2)),
        );
        // Real wall clock only. Close Chromium during this wait; no fake timers/KV
        // mutation and no expired-cookie-only claim: replay the ORIGINAL binding.
        while (Date.now() < saved.issued + (saved.ttl + 5) * 1000) {
          assert(
            !interrupted.signal.aborted,
            "Real TTL wait interrupted; expiry gate remains unrun",
          );
          await new Promise((resolve) =>
            setTimeout(
              resolve,
              Math.min(
                1000,
                saved.issued + (saved.ttl + 5) * 1000 - Date.now(),
              ),
            ),
          );
        }
        const response = await protocol(
          base,
          `/authorize?${saved.client.query}`,
          form(saved.handle, "approve"),
          saved.cookie,
        );
        assert.equal(
          response.status,
          400,
          "Real expired KV transaction accepted original matching binding cookie",
        );
        result.ttl = {
          status: "pass",
          ttlSeconds: saved.ttl,
          elapsedMs: Date.now() - saved.issued,
          originalMatchingCookieReplayed: true,
        };
      },
    );
  }
  assert.equal(
    pageErrors.length,
    0,
    "Native auth threw browser JavaScript errors",
  );
  result.status = "pass";
} catch (error) {
  result.status = "fail";
  result.interrupted = interrupted.signal.aborted;
  const gate = result.ttl;
  if (
    typeof gate === "object" &&
    gate !== null &&
    "status" in gate &&
    gate.status !== "pass"
  )
    result.ttl = {
      status: "unrun",
      reason: "Earlier failure or interruption; real expiry not verified",
    };
  result.phase = phase;
  result.failure = redact(
    error instanceof Error ? `${error.name}: ${error.message}` : String(error),
  );
  process.exitCode = 1;
} finally {
  await browser?.close().catch(() => {});
  process.off("SIGINT", stop);
  process.off("SIGTERM", stop);
  await writeFile(
    `${output}/results.json`,
    redact(
      JSON.stringify({ ...result, phases, audits, trace, pageErrors }, null, 2),
    ),
  );
}
