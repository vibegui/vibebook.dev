// External OAuth JSON is projected only after runtime validation. These DTOs
// are server-only provider responses, never browser-visible grant material.
import * as z from "zod/mini";

const text = z.string().check(z.minLength(1));
const ProtectedResource = z.object({
  authorization_servers: z.optional(z.nullable(z.array(z.string()))),
  scopes_supported: z.optional(z.nullable(z.array(z.string()))),
});
const AuthorizationServer = z.object({
  authorization_endpoint: text,
  token_endpoint: text,
  registration_endpoint: z.optional(z.nullable(z.string())),
});
const ClientRegistration = z.object({
  client_id: text,
  client_secret: z.optional(z.nullable(z.string())),
});
// Numeric strings are a supported provider compatibility case. Keep the
// existing saveGrant default/clamp behavior for zero and negative values.
const numericString = z
  .string()
  .check(
    z.refine(
      (value) => value.trim().length > 0 && Number.isFinite(Number(value)),
    ),
  );
const TokenResponse = z.object({
  access_token: text,
  refresh_token: z.optional(z.nullable(z.string())),
  expires_in: z.optional(z.nullable(z.union([z.number(), numericString]))),
});
const OAuthError = z.object({ error: z.optional(z.string()) });

export type AuthorizationServerMetadata = z.infer<typeof AuthorizationServer>;
export type ProviderGrant = {
  access_token: string;
  refresh_token?: string;
  expires_in?: number;
};
export function protectedResourceMetadata(value: unknown) {
  const parsed = ProtectedResource.safeParse(value);
  return parsed.success ? parsed.data : null;
}
export function authorizationServerMetadata(value: unknown) {
  const parsed = AuthorizationServer.safeParse(value);
  return parsed.success ? parsed.data : null;
}
export function clientRegistration(value: unknown) {
  const parsed = ClientRegistration.safeParse(value);
  return parsed.success ? parsed.data : null;
}
export function providerGrant(value: unknown): ProviderGrant | null {
  const parsed = TokenResponse.safeParse(value);
  if (!parsed.success) return null;
  return {
    access_token: parsed.data.access_token,
    ...(parsed.data.refresh_token == null
      ? {}
      : { refresh_token: parsed.data.refresh_token }),
    ...(parsed.data.expires_in == null
      ? {}
      : { expires_in: Number(parsed.data.expires_in) }),
  };
}
export function providerOAuthError(value: unknown): string | null {
  const parsed = OAuthError.safeParse(value);
  return parsed.success && parsed.data.error
    ? parsed.data.error.slice(0, 60)
    : null;
}
