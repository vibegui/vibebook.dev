import * as z from "zod/mini";

const Token = z.object({ access_token: z.string().check(z.minLength(1)) });
const Emails = z.array(
  z.object({
    email: z.string().check(z.minLength(1)),
    primary: z.boolean(),
    verified: z.boolean(),
  }),
);
const Profile = z.object({
  name: z.optional(z.nullable(z.string())),
  login: z.optional(z.string()),
});

/** Provider JSON stays unknown until validated. Identity comes only from the
 * verified primary email, never from optional display/profile metadata. */
export function githubToken(value: unknown): string | null {
  const result = Token.safeParse(value);
  return result.success ? result.data.access_token : null;
}
export function githubEmail(value: unknown): string | null {
  const result = Emails.safeParse(value);
  return result.success
    ? (result.data.find((email) => email.primary && email.verified)?.email ??
        null)
    : null;
}
export function githubName(value: unknown): string {
  const result = Profile.safeParse(value);
  return result.success
    ? (result.data.name || result.data.login || "").trim().slice(0, 60)
    : "";
}
