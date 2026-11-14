import { expect, test } from "bun:test";
import { withAgentGrant, type AgentProps } from "../src/agentGrant";

test("malformed serialized grants cannot enter MCP or its effects", async () => {
  let effects = 0;
  const dispatch = () => {
    effects++;
    return new Response("unexpected");
  };
  for (const raw of [
    null,
    [],
    "signed-but-not-props",
    {},
    { email: "bad", client: "CLI" },
    { email: "a@example.test", client: 7 },
    { email: "a@example.test", client: "" },
    ...["gid", "sandbox", "room"].flatMap((field) =>
      [null, 0, {}, [], ""].map((value) => ({
        email: "a@example.test",
        client: "CLI",
        [field]: value,
      })),
    ),
  ]) {
    const response = await withAgentGrant(raw, dispatch);
    expect(response.status).toBe(401);
    expect(await response.json()).toEqual({ error: "unauthenticated" });
    expect(response.headers.get("www-authenticate")).toBe(
      'Bearer error="invalid_token"',
    );
  }
  expect(effects).toBe(0);
});

test("original email/client grants and independent optional historical scopes retain their exact values", async () => {
  for (const raw of [
    { email: "Case@example.test", client: "Original CLI" },
    { email: "a@example.test", client: "CLI", gid: "old-grant" },
    { email: "a@example.test", client: "CLI", sandbox: "legacy-name" },
    {
      email: "a@example.test",
      client: "vibebook sandbox",
      gid: "grant",
      sandbox: "worker",
      room: "room-id",
    },
  ]) {
    let received: AgentProps | undefined;
    const expected = new Response("actual dispatcher result", { status: 202 });
    const response = await withAgentGrant(raw, async (props) => {
      received = props;
      return expected;
    });
    expect(received).toEqual(raw);
    expect(response).toBe(expected);
  }
});

test("unknown metadata never becomes authority and dispatched failures propagate without retry", async () => {
  let calls = 0;
  await expect(
    withAgentGrant(
      { email: "a@example.test", client: "CLI", admin: true },
      async (props) => {
        calls++;
        expect(Object.keys(props)).toEqual(["email", "client"]);
        throw Error("owned-dispatch-failure");
      },
    ),
  ).rejects.toThrow("owned-dispatch-failure");
  expect(calls).toBe(1);
});
