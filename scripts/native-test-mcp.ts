import assert from "node:assert/strict";
import { createHash, randomBytes } from "node:crypto";
import type { Page } from "@playwright/test";
import * as z from "zod/mini";

/** A real OAuth/PKCE agent for loopback browser fixtures. Never use production credentials. */
export async function nativeTestAgent(page: Page, base: string) {
  assert(/^http:\/\/(127\.0\.0\.1|localhost):\d+$/.test(base));
  const request = page.context().request;
  const redirect = `${base}/native-verification-callback`;
  const registration = await request.post(`${base}/oauth/register`, {
    data: {
      client_name: "Native navigation verification",
      redirect_uris: [redirect],
      grant_types: ["authorization_code"],
      response_types: ["code"],
      token_endpoint_auth_method: "none",
    },
  });
  assert(
    registration.ok(),
    `Local OAuth registration: ${registration.status()}`,
  );
  const client = z
    .object({ client_id: z.string() })
    .parse(await registration.json());
  const verifier = randomBytes(32).toString("base64url");
  const challenge = createHash("sha256").update(verifier).digest("base64url");
  const state = randomBytes(16).toString("hex");
  const params = new URLSearchParams({
    response_type: "code",
    client_id: client.client_id,
    redirect_uri: redirect,
    scope: "rooms",
    code_challenge: challenge,
    code_challenge_method: "S256",
    state,
  });
  await page.goto(`${base}/authorize?${params}`);
  const handle = await page
    .locator('input[name="handle"]')
    .getAttribute("value");
  assert(handle, "Local OAuth consent handle missing");
  const consent = await request.post(`${base}/authorize`, {
    form: { handle, decision: "approve" },
    headers: { origin: base },
    maxRedirects: 0,
  });
  assert.equal(consent.status(), 302, "Local OAuth consent failed");
  const location = consent.headers().location;
  assert(location, "Local OAuth authorization redirect missing");
  const callback = new URL(location);
  assert.equal(callback.origin + callback.pathname, redirect);
  assert.equal(callback.searchParams.get("state"), state);
  const code = callback.searchParams.get("code");
  assert(code, "Local OAuth code missing");
  const tokenResponse = await request.post(`${base}/oauth/token`, {
    form: {
      grant_type: "authorization_code",
      code,
      redirect_uri: redirect,
      client_id: client.client_id,
      code_verifier: verifier,
    },
  });
  assert(
    tokenResponse.ok(),
    `Local OAuth token exchange: ${tokenResponse.status()}`,
  );
  const token = z
    .object({ access_token: z.string() })
    .parse(await tokenResponse.json());
  let id = 0;
  return async (
    name: string,
    args: Record<string, unknown>,
  ): Promise<unknown> => {
    const response = await request.post(`${base}/mcp`, {
      headers: { authorization: `Bearer ${token.access_token}` },
      data: {
        jsonrpc: "2.0",
        id: ++id,
        method: "tools/call",
        params: { name, arguments: args },
      },
    });
    assert(response.ok(), `Local MCP ${name}: ${response.status()}`);
    const body = z
      .object({
        result: z.object({
          isError: z.optional(z.boolean()),
          structuredContent: z.optional(z.unknown()),
        }),
      })
      .parse(await response.json());
    assert(
      !body.result.isError,
      `Local MCP ${name} rejected the fixture operation`,
    );
    return body.result.structuredContent;
  };
}
