import * as z from "zod/mini";
/** Public boot metadata only. Contexts, authorization handles and identities are fetched through typed APIs. */
export const NativeAuthMetadata = z.object({
  page: z.enum(["login", "access", "consent"]),
  lang: z.enum(["pt", "en"]),
  autoAccess: z.boolean(),
  consentFailure: z.optional(z.boolean()),
});
export type NativeAuthMetadata = z.infer<typeof NativeAuthMetadata>;
