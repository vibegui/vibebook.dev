// pt or en, for what the server writes to a person: the vb_lang cookie (set by the landing and the app's PT · EN
// switch), else the browser's first language (en only when it starts with "en"), else pt. users.lang keeps the last
// one seen at login or in /api/me, for emails sent while the person isn't on a request (mentions, invites).
export type Lang = "pt" | "en";

export const reqLang = (req: Request): Lang =>
  (req.headers.get("cookie")?.match(/(?:^|;\s*)vb_lang=(pt|en)\b/)?.[1] as Lang | undefined) ??
  (req.headers.get("accept-language")?.split(",", 1)[0]?.trim().toLowerCase().startsWith("en") ? "en" : "pt");

/** The cookie alone (no browser fallback): only an explicit choice should overwrite users.lang. */
export const cookieLang = (req: Request): Lang | null => (req.headers.get("cookie")?.match(/(?:^|;\s*)vb_lang=(pt|en)\b/)?.[1] as Lang | undefined) ?? null;

export const asLang = (x: unknown): Lang => (x === "en" ? "en" : "pt");
