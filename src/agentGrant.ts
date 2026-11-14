import "server-only";
import * as z from "zod/mini";
import { EMAIL_RE } from "./auth";
import { UNAUTHENTICATED } from "../shared/schemas";

const text = z.string().check(z.minLength(1));
/** Serialized provider props are unknown even after bearer-token validation. */
export const AgentPropsSchema = z.object({
  email: z.string().check(z.regex(EMAIL_RE)),
  client: text,
  gid: z.optional(text),
  sandbox: z.optional(text),
  room: z.optional(text),
});
export type AgentProps = z.infer<typeof AgentPropsSchema>;

/** Reject malformed identity/scope before any MCP dispatch or database/session effects. */
export function withAgentGrant(
  raw: unknown,
  dispatch: (props: AgentProps) => Response | Promise<Response>,
): Response | Promise<Response> {
  const parsed = AgentPropsSchema.safeParse(raw);
  if (!parsed.success)
    return Response.json(UNAUTHENTICATED, {
      status: 401,
      headers: { "www-authenticate": 'Bearer error="invalid_token"' },
    });
  return dispatch(parsed.data);
}
