/** Only opaque references cross WindowProxy; document data stays on the claimed port. */
export const APP_DOCUMENT_CHANNEL = "vibebook.app-document.v1";
export const APP_DOCUMENT_NONCE_PLACEHOLDER = "__VIBEBOOK_APP_DOCUMENT_NONCE__";
/** Public routing label, not a grant. Set it before inserting the iframe. */
export const appDocumentFrameName = () => `app-document-${crypto.randomUUID()}`;
export const documentRecord = (
  value: unknown,
): value is Record<string, unknown> =>
  value !== null && typeof value === "object" && !Array.isArray(value);
export const documentToken = (value: unknown): value is string =>
  typeof value === "string" && /^[a-f0-9]{64}$/.test(value);
export type AppDocumentPortMessage =
  | { kind: "challenge"; token: string }
  | { kind: "attested"; token: string }
  | { kind: "payload"; token: string; value: unknown }
  | { kind: "payload-ready"; token: string }
  | { kind: "revoke" };
