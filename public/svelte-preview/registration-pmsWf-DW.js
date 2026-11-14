import { r as e, t } from "./index-client-B2aDKUZc.js";
import { A as n, E as r, O as i, S as a, k as o, n as s } from "./api-Dv5tb54t.js";
// svelte/features/notifications/api.ts
async function c(e) {
	let t = await e.json().catch(() => null);
	if (!e.ok) {
		let n = a.safeParse(t);
		throw Error(n.success ? n.data.error : `HTTP ${e.status}`);
	}
	return t;
}
function l(e) {
	let t = s("/", e).api.push;
	return {
		async key() {
			return i.parse(await c(await t.key.$get())).key;
		},
		async subscribe(e) {
			let n = o.parse(e);
			return r.parse(await c(await t.subscribe.$post({ json: n })));
		},
		async unsubscribe(e) {
			return r.parse(await c(await t.unsubscribe.$post({ json: { endpoint: e } })));
		},
		async test() {
			return n.parse(await c(await t.test.$post()));
		}
	};
}
function u(e) {
	let t = (e) => typeof navigator < "u" && navigator.locks ? navigator.locks.request("vibebook.push.endpoint", e) : e();
	return {
		...e,
		subscribe: (n) => t(() => e.subscribe(n)),
		unsubscribe: (n) => t(() => e.unsubscribe(n))
	};
}
// svelte/features/notifications/reconcile.ts
function d(n, r, i = 2e4) {
	let a = e({
		status: "idle",
		error: ""
	}), o = !0, s = 0, c = 0, l = {
		account: null,
		enabled: !1
	}, u = null, d = !1, f = /* @__PURE__ */ new Set();
	async function p() {
		for (; o && c < s;) {
			let e = s, t = { ...l };
			a.set({
				status: "working",
				error: ""
			});
			let u = setTimeout(() => {
				o && c < e && a.set({
					status: "unconfirmed",
					error: "unconfirmed"
				});
			}, i);
			try {
				let i = await r.get();
				if (!o) break;
				if (t.account && t.enabled) {
					let t = await n.key();
					if (!o) break;
					if (e !== s) {
						c = e;
						continue;
					}
					if (!t) {
						a.set({
							status: "unavailable",
							error: "no-key"
						}), c = e;
						continue;
					}
					if (i && r.matchesKey && !r.matchesKey(i, t)) {
						if (await n.unsubscribe(i.endpoint), f.delete(i.endpoint), !o) break;
						if (e !== s) {
							c = e;
							continue;
						}
						if (!await i.unsubscribe()) throw Error("unsubscribe-unconfirmed");
						if (i = null, !o) break;
						if (e !== s) {
							c = e;
							continue;
						}
					}
					if (i ??= await r.subscribe(t), !o) break;
					if (e !== s) {
						c = e;
						continue;
					}
					let l = i.toJSON();
					if (!l.endpoint || !l.keys?.p256dh || !l.keys.auth) throw Error("invalid-subscription");
					f.add(l.endpoint), await n.subscribe({
						endpoint: l.endpoint,
						p256dh: l.keys.p256dh,
						auth: l.keys.auth
					});
				} else {
					let e;
					i && f.add(i.endpoint);
					for (let t of f) try {
						await n.unsubscribe(t), f.delete(t);
					} catch (t) {
						e = t;
					}
					let t = !i || await i.unsubscribe();
					if (e) throw e;
					if (!t) throw Error("unsubscribe-unconfirmed");
				}
				o && e === s && a.set({
					status: t.account && t.enabled ? "on" : "off",
					error: ""
				});
			} catch (t) {
				o && e === s && a.set({
					status: "failed",
					error: t instanceof Error ? t.message : "failed"
				});
			} finally {
				clearTimeout(u), c = e;
			}
		}
	}
	function m() {
		return u ||= p().finally(() => {
			u = null, o && c < s && m();
		}), u;
	}
	return {
		state: a,
		set(e, t) {
			return !o || d ? u ?? Promise.resolve() : (l = {
				account: e,
				enabled: t
			}, s++, m());
		},
		retry() {
			if (o) return s++, m();
		},
		async beforeLogout() {
			d = !0, l = {
				account: null,
				enabled: !1
			}, s++;
			let e = !1, n = (async () => {
				try {
					let t = await r.get();
					e = !t || await t.unsubscribe();
				} catch {}
			})(), c = m(), u, f = await Promise.race([Promise.all([n, c]).then(() => !0), new Promise((e) => {
				u = setTimeout(() => e(!1), i);
			})]).finally(() => clearTimeout(u));
			return o && !f && a.set({
				status: "unconfirmed",
				error: "logout-unconfirmed"
			}), {
				local: e,
				settled: f,
				confirmed: e && f && t(a).status === "off"
			};
		},
		dispose() {
			o = !1, s++;
		}
	};
}
// svelte/features/pwa/registration.ts
var f = null;
async function p() {
	if (!("serviceWorker" in navigator)) return;
	let e = await navigator.serviceWorker.getRegistration("/"), t = e?.active ?? e?.waiting ?? e?.installing;
	if (e && (e.scope !== new URL("/", location.origin).href || t && new URL(t.scriptURL).pathname !== "/sw.js")) throw Error("unexpected-worker");
	return e;
}
function m() {
	if (!f) {
		let e = (async () => {
			let e = await p(), t = e ?? await navigator.serviceWorker.register("/sw.js", { scope: "/" });
			if (e && await t.update(), (await navigator.serviceWorker.ready).scope !== new URL("/", location.origin).href) throw Error("unexpected-worker");
			return t;
		})(), t, n = Promise.race([e, new Promise((e, n) => {
			t = setTimeout(() => n(/* @__PURE__ */ Error("worker-timeout")), 2e4);
		})]).finally(() => clearTimeout(t));
		f = n, n.catch(() => {
			f === n && (f = null);
		});
	}
	return f;
}
function h(e) {
	if (!/^[A-Za-z0-9_-]+$/.test(e)) throw Error("invalid-key");
	return Uint8Array.from(atob(e.replace(/-/g, "+").replace(/_/g, "/") + "=".repeat((4 - e.length % 4) % 4)), (e) => e.charCodeAt(0));
}
export { l as a, d as i, h as n, u as o, m as r, p as t };
