import { V as e } from "./api-DKmEofkD.js";
import { C as t, E as n, S as r, _ as i, et as a, i as o, n as s, r as c, rt as l, t as u, v as d, x as f } from "./api-Dv5tb54t.js";
// svelte/features/auth/owner.ts
var p = 2e4, m = {
	schedule: (e, t) => setTimeout(e, t),
	cancel: (e) => clearTimeout(e)
};
function h(e = m) {
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
			}, p);
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
var g = a({
	roomId: l().check(e(/^[a-z0-9]{6,40}$/)),
	id: l().check(e(/^[0-9a-f]{1,64}$/))
});
function _(e) {
	try {
		let t = new URL(e), n = /^\/b\/([a-z0-9]{6,40})\/?$/.exec(t.pathname)?.[1], r = /^#f([0-9a-f]{1,64})$/.exec(t.hash)?.[1], i = g.safeParse({
			roomId: n,
			id: r
		});
		return i.success ? i.data : null;
	} catch {
		return null;
	}
}
function v(e, t) {
	try {
		let n = new URL(e, t);
		if (n.origin !== new URL(t).origin) return null;
		let r = /^\/api\/books\/([^/]+)\/files\/([^/]+)$/.exec(n.pathname);
		if (!r) return null;
		let i = g.safeParse({
			roomId: decodeURIComponent(r[1]),
			id: decodeURIComponent(r[2])
		});
		return i.success ? i.data : null;
	} catch {
		return null;
	}
}
function y(e, t = !1) {
	let n = g.parse(e);
	return `/api/books/${n.roomId}/files/${n.id}?ui=svelte${t ? "&esc=1" : ""}`;
}
function b(e) {
	let t = g.parse(e);
	return `/b/${t.roomId}?ui=svelte#f${t.id}`;
}
function x(e, t) {
	return e.id === t.id && e.name === t.name && e.type === t.type && e.size === t.size && e.ts === t.ts && e.author === t.author;
}
function S(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e.files || []) t.set(n.id, n);
	if (!e.filesAll) for (let n of [...e.messages, ...e.origins || []]) for (let e of n.files || []) t.has(e.id) || t.set(e.id, e);
	return [...t.values()];
}
function C(e, t) {
	return S(e).filter((e) => e.name === t).map((e, t) => ({
		file: e,
		index: t
	})).sort((e, t) => t.file.ts - e.file.ts || e.index - t.index).map((e) => e.file);
}
function w(e, t) {
	let n = e.split(";")[0].trim().toLowerCase();
	return n.startsWith("image/") && n !== "image/svg+xml" ? "image" : n.startsWith("audio/") ? "audio" : n === "text/html" ? "html" : n === "application/pdf" ? "pdf" : n === "text/markdown" || n === "text/plain" && /\.(md|markdown)$/i.test(t) ? "markdown" : n === "text/csv" || n === "text/plain" && /\.csv$/i.test(t) ? "csv" : n === "text/plain" ? "text" : "download";
}
function T(e, t = 2e3, n = 50) {
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
function E(e, t, n) {
	let r = new URL(y(e), t).href;
	return n && r.startsWith("https:") ? `x-safari-${r}` : r;
}
// svelte/features/auth/api.ts
var D = class extends Error {
	status;
	returnTo;
	constructor(e, t = 0, n) {
		super(e), this.status = t, this.returnTo = n;
	}
};
async function O(e) {
	let t = await e.json().catch(() => null);
	if (!e.ok) {
		let n = r.safeParse(t);
		throw new D(n.success ? n.data.error : `HTTP ${e.status}`, e.status);
	}
	return t;
}
function k(e) {
	let t = /* @__PURE__ */ new Map();
	for (let [n, r] of new URLSearchParams(e)) {
		let e = t.get(n);
		t.set(n, e === void 0 ? r : Array.isArray(e) ? [...e, r] : [e, r]);
	}
	return Object.fromEntries(t);
}
function A(e) {
	let r = u("/", e).auth, a = s("/", e).api;
	return {
		async login(e, n) {
			let i = new URLSearchParams(e), a = await O(await r.context.$get({ query: {
				next: i.get("next") ?? void 0,
				error: i.get("error") ?? void 0
			} }, { init: { signal: n } }));
			return t.parse(a);
		},
		async start(e, t) {
			return n.parse(await O(await r.email.start.$post({ json: { email: e } }, { init: { signal: t } })));
		},
		async verify(e, t, n, i) {
			return f.parse(await O(await r.email.verify.$post({ json: {
				email: e,
				code: t,
				next: n
			} }, { init: { signal: i } })));
		},
		async access(e, t) {
			return c.parse(await O(await r.room[":id"].$get({ param: { id: encodeURIComponent(e) } }, { init: { signal: t } })));
		},
		async ask(e, t) {
			return o.parse(await O(await a.books[":id"].request.$post({ param: { id: encodeURIComponent(e) } }, { init: { signal: t } })));
		},
		async consent(e, t) {
			let n = await a.authorize.context.$get({ query: k(e) }, { init: { signal: t } }), r = await n.json().catch(() => null);
			if (!n.ok) {
				let e = d.safeParse(r);
				throw new D(e.success ? e.data.error : `HTTP ${n.status}`, n.status, e.success ? e.data.redirect_to : void 0);
			}
			return i.parse(r);
		}
	};
}
export { E as a, v as c, S as d, x as f, h as g, m as h, T as i, y as l, p as m, A as n, b as o, w as p, g as r, _ as s, D as t, C as u };
