import { expect, test } from "bun:test";
import { mcpArguments, parseMcpRequest } from "../src/mcpRequest";

test("normal initialize, tool calls and notifications retain protocol data", () => {
  expect(
    parseMcpRequest({
      jsonrpc: "2.0",
      id: 0,
      method: "initialize",
      params: { protocolVersion: "2025-06-18", capabilities: {} },
    })?.id,
  ).toBe(0);
  const args = { room_id: "aaaaaa", card: { rows: [{ text: "kept" }] } };
  const request = parseMcpRequest({
    jsonrpc: "2.0",
    id: "call",
    method: "tools/call",
    params: { name: "post", arguments: args },
  });
  expect(mcpArguments(request?.params?.arguments)).toEqual(args);
  expect(
    parseMcpRequest({ jsonrpc: "2.0", method: "notifications/initialized" })
      ?.id,
  ).toBeUndefined();
  expect(
    parseMcpRequest({ jsonrpc: "2.0", id: null, method: "ping" })?.id,
  ).toBeNull();
});
test("malformed envelopes cannot reach method dispatch", () => {
  for (const value of [
    null,
    [],
    {},
    { jsonrpc: "1.0", method: "ping" },
    { jsonrpc: "2.0", method: 3 },
    { jsonrpc: "2.0", method: "" },
    { jsonrpc: "2.0", method: "ping", id: {} },
    { jsonrpc: "2.0", method: "ping", params: [] },
    { jsonrpc: "2.0", method: "ping", params: "bad" },
  ])
    expect(parseMcpRequest(value)).toBeNull();
});
test("tool arguments accept records and reject scalar/array payloads without coercion", () => {
  expect(mcpArguments(undefined)).toEqual({});
  expect(mcpArguments(null)).toEqual({});
  for (const value of ["bad", 1, false, ["bad"]])
    expect(() => mcpArguments(value)).toThrow(
      "Tool arguments must be an object",
    );
});
