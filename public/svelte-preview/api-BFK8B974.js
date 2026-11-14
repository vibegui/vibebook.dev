import { n as e, t } from "./api-D4u8Abqp.js";
import { S as n, T as r, b as i, g as a, h as o, n as s, t as c, y as l } from "./schemas-cfL4JcHa.js";
// svelte/features/auth/api.ts
var u = class extends Error {
	status;
	returnTo;
	constructor(e, t = 0, n) {
		super(e), this.status = t, this.returnTo = n;
	}
};
async function d(e) {
	let t = await e.json().catch(() => null);
	if (!e.ok) {
		let n = i.safeParse(t);
		throw new u(n.success ? n.data.error : `HTTP ${e.status}`, e.status);
	}
	return t;
}
function f(e) {
	let t = /* @__PURE__ */ new Map();
	for (let [n, r] of new URLSearchParams(e)) {
		let e = t.get(n);
		t.set(n, e === void 0 ? r : Array.isArray(e) ? [...e, r] : [e, r]);
	}
	return Object.fromEntries(t);
}
function p(i) {
	let p = t("/", i).auth, m = e("/", i).api;
	return {
		async login(e, t) {
			let r = new URLSearchParams(e), i = await d(await p.context.$get({ query: {
				next: r.get("next") ?? void 0,
				error: r.get("error") ?? void 0
			} }, { init: { signal: t } }));
			return n.parse(i);
		},
		async start(e, t) {
			return r.parse(await d(await p.email.start.$post({ json: { email: e } }, { init: { signal: t } })));
		},
		async verify(e, t, n, r) {
			return l.parse(await d(await p.email.verify.$post({ json: {
				email: e,
				code: t,
				next: n
			} }, { init: { signal: r } })));
		},
		async access(e, t) {
			return c.parse(await d(await p.room[":id"].$get({ param: { id: encodeURIComponent(e) } }, { init: { signal: t } })));
		},
		async ask(e, t) {
			return s.parse(await d(await m.books[":id"].request.$post({ param: { id: encodeURIComponent(e) } }, { init: { signal: t } })));
		},
		async consent(e, t) {
			let n = await m.authorize.context.$get({ query: f(e) }, { init: { signal: t } }), r = await n.json().catch(() => null);
			if (!n.ok) {
				let e = a.safeParse(r);
				throw new u(e.success ? e.data.error : `HTTP ${n.status}`, n.status, e.success ? e.data.redirect_to : void 0);
			}
			return o.parse(r);
		}
	};
}
function m(e) {
	let n = t("/", e).auth;
	return async (e) => r.parse(await d(await (e ? n["logout-all"].$post({}) : n.logout.$post({}))));
}
export { p as n, m as r, u as t };
