import * as z from "zod/mini";
/** Public boot metadata only. Contexts, authorization handles and identities are fetched through typed APIs. */
export const NativeAuthMetadata = z.object({
  page: z.enum([
    "login",
    "access",
    "consent",
    "file-access",
    "connection-error",
  ]),
  lang: z.enum(["pt", "en"]),
  autoAccess: z.boolean(),
  consentFailure: z.optional(z.boolean()),
  connectionFailure: z.optional(
    z.enum(["failed", "forbidden", "missing", "rate", "signed-out"]),
  ),
});
export type NativeAuthMetadata = z.infer<typeof NativeAuthMetadata>;
