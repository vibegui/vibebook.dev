// Native notifications (Web Push, VAPID): ported from tama (api/notifications/webpush.ts), pure Web Crypto, no deps.
// VAPID JWT (RFC 8292, ES256) + aes128gcm payload encryption (RFC 8188 + RFC 8291). Subscriptions in D1 push_subs.
import type { Env } from "./index";

type Bytes = Uint8Array<ArrayBuffer>;
const b64d = (s: string): Bytes => {
  let p = s.replace(/-/g, "+").replace(/_/g, "/");
  while (p.length % 4) p += "=";
  const bin = atob(p), out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
};
const b64e = (buf: ArrayBuffer | Uint8Array) => {
  const b = buf instanceof Uint8Array ? buf : new Uint8Array(buf);
  let s = "";
  for (let i = 0; i < b.length; i++) s += String.fromCharCode(b[i]);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
};
const cat = (...parts: Uint8Array[]): Bytes => {
  const out = new Uint8Array(parts.reduce((n, p) => n + p.length, 0));
  let o = 0;
  for (const p of parts) { out.set(p, o); o += p.length; }
  return out;
};
const enc = (s: string): Bytes => new Uint8Array(new TextEncoder().encode(s));

async function vapidJwt(env: Env, endpoint: string) {
  const d = b64d(env.VAPID_PRIVATE_KEY!), pub = b64d(env.VAPID_PUBLIC_KEY!);
  if (d.length !== 32 || pub.length !== 65 || pub[0] !== 4) throw new Error("bad VAPID keys");
  const key = await crypto.subtle.importKey("jwk", { kty: "EC", crv: "P-256", x: b64e(pub.slice(1, 33)), y: b64e(pub.slice(33, 65)), d: b64e(d), ext: true, key_ops: ["sign"] }, { name: "ECDSA", namedCurve: "P-256" }, false, ["sign"]);
  const u = new URL(endpoint);
  const head = b64e(enc(JSON.stringify({ typ: "JWT", alg: "ES256" })));
  // Subject: the site, not anyone's email (push services see it).
  const body = b64e(enc(JSON.stringify({ aud: `${u.protocol}//${u.host}`, exp: Math.floor(Date.now() / 1000) + 12 * 3600, sub: "https://vibebook.dev" })));
  const sig = await crypto.subtle.sign({ name: "ECDSA", hash: "SHA-256" }, key, enc(`${head}.${body}`));
  return `vapid t=${head}.${body}.${b64e(sig)}, k=${b64e(pub)}`;
}

async function hkdf(salt: Bytes, ikm: Bytes, info: Bytes, len: number): Promise<Bytes> {
  const k = await crypto.subtle.importKey("raw", ikm, "HKDF", false, ["deriveBits"]);
  return new Uint8Array(await crypto.subtle.deriveBits({ name: "HKDF", hash: "SHA-256", salt, info }, k, len * 8));
}

async function encrypt(payload: Bytes, sub: Sub): Promise<Bytes> {
  const eph = (await crypto.subtle.generateKey({ name: "ECDH", namedCurve: "P-256" }, true, ["deriveBits"])) as CryptoKeyPair;
  const asPub: Bytes = new Uint8Array((await crypto.subtle.exportKey("raw", eph.publicKey)) as ArrayBuffer);
  const uaRaw = b64d(sub.p256dh);
  const uaPub = await crypto.subtle.importKey("raw", uaRaw, { name: "ECDH", namedCurve: "P-256" }, false, []);
  const shared: Bytes = new Uint8Array(await crypto.subtle.deriveBits({ name: "ECDH", public: uaPub } as never, eph.privateKey, 256));
  const ikm = await hkdf(b64d(sub.auth), shared, cat(enc("WebPush: info\0"), uaRaw, asPub), 32);
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const cek = await crypto.subtle.importKey("raw", await hkdf(salt, ikm, enc("Content-Encoding: aes128gcm\0"), 16), { name: "AES-GCM" }, false, ["encrypt"]);
  const nonce = await hkdf(salt, ikm, enc("Content-Encoding: nonce\0"), 12);
  const sealed: Bytes = new Uint8Array(await crypto.subtle.encrypt({ name: "AES-GCM", iv: nonce }, cek, cat(payload, new Uint8Array([2]))));
  const head: Bytes = new Uint8Array(21 + asPub.length);
  head.set(salt, 0);
  new DataView(head.buffer).setUint32(16, 4096, false);
  head[20] = asPub.length;
  head.set(asPub, 21);
  return cat(head, sealed);
}

type Sub = { endpoint: string; p256dh: string; auth: string };
export type Push = { title: string; body: string; url: string; tag: string };

/** Send to every device these people subscribed. Dead endpoints (404/410) are dropped. No keys = no-op. */
export async function pushTo(env: Env, emails: string[], p: Push) {
  if (!env.VAPID_PUBLIC_KEY || !env.VAPID_PRIVATE_KEY || !emails.length) return 0;
  const subs = (await env.DB.prepare(`SELECT endpoint, p256dh, auth FROM push_subs WHERE email IN (${emails.map(() => "?").join(",")})`).bind(...emails).all<Sub>()).results;
  const body = enc(JSON.stringify({ ...p, title: p.title.slice(0, 120), body: p.body.slice(0, 240) }));
  let sent = 0;
  await Promise.all(subs.map(async (s) => {
    try {
      const res = await fetch(s.endpoint, { method: "POST", headers: { "content-type": "application/octet-stream", "content-encoding": "aes128gcm", ttl: String(4 * 3600), urgency: "high", authorization: await vapidJwt(env, s.endpoint) }, body: await encrypt(body, s) });
      if (res.status === 404 || res.status === 410) await env.DB.prepare(`DELETE FROM push_subs WHERE endpoint = ?`).bind(s.endpoint).run();
      else if (res.ok) sent++;
    } catch (e) { console.error("push", String(e)); }
  }));
  return sent;
}
