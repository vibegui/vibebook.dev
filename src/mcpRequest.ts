import * as z from "zod/mini";

// JSON-RPC is an external protocol, separate from the inferred browser RPC API.
// Unknown tool payloads stay unknown until each tool validates its own inputs.
const RequestEnvelope = z.object({
  jsonrpc: z.literal("2.0"),
  id: z.optional(z.union([z.string(), z.number(), z.null()])),
  method: z.string().check(z.minLength(1)),
  params: z.optional(z.record(z.string(), z.unknown())),
});
export function parseMcpRequest(value: unknown) {
  const parsed = RequestEnvelope.safeParse(value);
  return parsed.success ? parsed.data : null;
}
export function recordValue(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
export function mcpArguments(value: unknown): Record<string, unknown> {
  if (value === null || value === undefined) return {};
  if (!recordValue(value)) throw new Error("Tool arguments must be an object");
  return value;
}
