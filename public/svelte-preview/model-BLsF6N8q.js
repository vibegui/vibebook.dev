import { L as e, P as t, V as n, c as r, d as i, f as a, i as o, l as s, m as c, n as l, r as u, t as d, u as f } from "./api-CwXbABNL.js";
// svelte/features/auth/api.ts
var p = class extends Error {
	status;
	returnTo;
	constructor(e, t = 0, n) {
		super(e), this.status = t, this.returnTo = n;
	}
};
async function m(e) {
	let t = await e.json().catch(() => null);
	if (!e.ok) {
		let n = i.safeParse(t);
		throw new p(n.success ? n.data.error : `HTTP ${e.status}`, e.status);
	}
	return t;
}
function h(e) {
	let t = /* @__PURE__ */ new Map();
	for (let [n, r] of new URLSearchParams(e)) {
		let e = t.get(n);
		t.set(n, e === void 0 ? r : Array.isArray(e) ? [...e, r] : [e, r]);
	}
	return Object.fromEntries(t);
}
function g(e) {
	let t = d("/", e).auth, n = l("/", e).api;
	return {
		async login(e, n) {
			let r = new URLSearchParams(e), i = await m(await t.context.$get({ query: {
				next: r.get("next") ?? void 0,
				error: r.get("error") ?? void 0
			} }, { init: { signal: n } }));
			return a.parse(i);
		},
		async start(e, n) {
			return c.parse(await m(await t.email.start.$post({ json: { email: e } }, { init: { signal: n } })));
		},
		async verify(e, n, r, i) {
			return f.parse(await m(await t.email.verify.$post({ json: {
				email: e,
				code: n,
				next: r
			} }, { init: { signal: i } })));
		},
		async access(e, n) {
			return u.parse(await m(await t.room[":id"].$get({ param: { id: encodeURIComponent(e) } }, { init: { signal: n } })));
		},
		async ask(e, t) {
			return o.parse(await m(await n.books[":id"].request.$post({ param: { id: encodeURIComponent(e) } }, { init: { signal: t } })));
		},
		async consent(e, t) {
			let i = await n.authorize.context.$get({ query: h(e) }, { init: { signal: t } }), a = await i.json().catch(() => null);
			if (!i.ok) {
				let e = s.safeParse(a);
				throw new p(e.success ? e.data.error : `HTTP ${i.status}`, i.status, e.success ? e.data.redirect_to : void 0);
			}
			return r.parse(a);
		}
	};
}
// svelte/features/auth/owner.ts
var _ = 2e4, v = {
	schedule: (e, t) => setTimeout(e, t),
	cancel: (e) => clearTimeout(e)
};
function y(e = v) {
	let t = !0, n = 0, r = !1, i = null, a = null, o = () => {
		n++, r = !1, a?.abort(), a = null, i !== null && e.cancel(i), i = null;
	};
	return {
		active: () => t,
		async run(s, c, l) {
			if (!t || r) return !1;
			let u = ++n;
			r = !0, a = new AbortController();
			let d = () => t && u === n;
			i = e.schedule(() => {
				d() && (o(), l(/* @__PURE__ */ Error("timeout")));
			}, _);
			try {
				let e = await s(a.signal);
				if (d()) return o(), c(e), !0;
			} catch (e) {
				d() && (o(), l(e));
			}
			return !1;
		},
		cancel: o,
		dispose() {
			t = !1, o();
		}
	};
}
// svelte/features/file-viewer/model.ts
var b = t({
	roomId: e().check(n(/^[a-z0-9]{6,40}$/)),
	id: e().check(n(/^[0-9a-f]{1,64}$/))
});
function x(e) {
	try {
		let t = new URL(e), n = /^\/b\/([a-z0-9]{6,40})\/?$/.exec(t.pathname)?.[1], r = /^#f([0-9a-f]{1,64})$/.exec(t.hash)?.[1], i = b.safeParse({
			roomId: n,
			id: r
		});
		return i.success ? i.data : null;
	} catch {
		return null;
	}
}
function S(e, t) {
	try {
		let n = new URL(e, t);
		if (n.origin !== new URL(t).origin) return null;
		let r = /^\/api\/books\/([^/]+)\/files\/([^/]+)$/.exec(n.pathname);
		if (!r) return null;
		let i = b.safeParse({
			roomId: decodeURIComponent(r[1]),
			id: decodeURIComponent(r[2])
		});
		return i.success ? i.data : null;
	} catch {
		return null;
	}
}
function C(e, t = !1) {
	let n = b.parse(e);
	return `/api/books/${n.roomId}/files/${n.id}?ui=svelte${t ? "&esc=1" : ""}`;
}
function w(e) {
	let t = b.parse(e);
	return `/b/${t.roomId}?ui=svelte#f${t.id}`;
}
function T(e, t) {
	return e.id === t.id && e.name === t.name && e.type === t.type && e.size === t.size && e.ts === t.ts && e.author === t.author;
}
function E(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e.files || []) t.set(n.id, n);
	if (!e.filesAll) for (let n of [...e.messages, ...e.origins || []]) for (let e of n.files || []) t.has(e.id) || t.set(e.id, e);
	return [...t.values()];
}
function D(e, t) {
	return E(e).filter((e) => e.name === t).map((e, t) => ({
		file: e,
		index: t
	})).sort((e, t) => t.file.ts - e.file.ts || e.index - t.index).map((e) => e.file);
}
function O(e, t) {
	let n = e.split(";")[0].trim().toLowerCase();
	return n.startsWith("image/") && n !== "image/svg+xml" ? "image" : n.startsWith("audio/") ? "audio" : n === "text/html" ? "html" : n === "application/pdf" ? "pdf" : n === "text/markdown" || n === "text/plain" && /\.(md|markdown)$/i.test(t) ? "markdown" : n === "text/csv" || n === "text/plain" && /\.csv$/i.test(t) ? "csv" : n === "text/plain" ? "text" : "download";
}
function k(e, t = 2e3, n = 50) {
	let r = [], i = [], a = "", o = !1, s = !1, c = 0, l = e.slice(0, 200).includes(",") ? "," : ";", u = () => {
		i.length < n ? i.push(a.replace(/\r$/, "")) : s = !0, a = "";
	};
	for (; c < e.length && r.length < t; c++) {
		let t = e[c];
		o ? t === "\"" ? e[c + 1] === "\"" ? (a += "\"", c++) : o = !1 : a += t : t === "\"" ? o = !0 : t === l ? u() : t === "\n" ? (u(), r.push(i), i = []) : a += t;
	}
	return c < e.length && (s = !0), r.length < t && (a || i.length) && (u(), r.push(i)), {
		rows: r,
		truncated: s
	};
}
function A(e, t, n) {
	let r = new URL(C(e), t).href;
	return n && r.startsWith("https:") ? `x-safari-${r}` : r;
}
export { x as a, D as c, O as d, v as f, g as h, w as i, E as l, p as m, k as n, S as o, y as p, A as r, C as s, b as t, T as u };
