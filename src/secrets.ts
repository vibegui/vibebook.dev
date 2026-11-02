// Secrets never land in a room. Known key shapes only: a generic entropy check would flag hashes and URLs.
const PATTERNS: [string, RegExp][] = [
  ["chave privada", /-----BEGIN [A-Z ]*PRIVATE KEY-----/],
  ["chave de API (sk-)", /\bsk-(?:ant-|proj-|or-)?[A-Za-z0-9_-]{20,}/],
  ["chave Stripe", /\b[rs]k_(?:live|test)_[A-Za-z0-9]{16,}/],
  ["token Shopify", /\bshp(?:at|ss|ca|pa)_[a-fA-F0-9]{32}\b/],
  ["token GitHub", /\b(?:gh[pousr]_[A-Za-z0-9]{36,}|github_pat_[A-Za-z0-9_]{40,})/],
  ["chave AWS", /\bAKIA[0-9A-Z]{16}\b/],
  ["chave Google", /\bAIza[0-9A-Za-z_-]{35}\b/],
  ["token Slack", /\bxox[abprs]-[A-Za-z0-9-]{10,}/],
  ["JWT", /\beyJ[A-Za-z0-9_-]{10,}\.eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}/],
  ["senha", /\b(?:password|senha|passwd|secret|api[_-]?key|token)\s*[:=]\s*\S{8,}/i],
];

/** Name of the first secret shape found in `text`, or null. */
export const findSecret = (text: string) => PATTERNS.find(([, re]) => re.test(text))?.[0] ?? null;
