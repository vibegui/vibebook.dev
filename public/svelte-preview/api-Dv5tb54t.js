import { Bn as e, Bt as t, Dn as n, En as r, F as i, Ht as a, Jt as o, Kn as s, Lt as c, M as l, Mt as u, Pn as d, Pt as ee, Qn as f, R as p, Rt as m, Tn as h, U as g, Un as _, W as te, Z as ne, Zt as re, at as ie, bt as ae, ct as oe, er as se, gt as ce, i as le, j as ue, nn as de, qt as fe, rn as pe, wn as me } from "./api-DKmEofkD.js";
// node_modules/hono/dist/client/utils.js
var he = (e, t) => (e = e.replace(/\/+$/, ""), e += "/", t = t.replace(/^\/+/, ""), e + t), v = (e, t) => {
	for (let [n, r] of Object.entries(t)) {
		let t = RegExp("/:" + n + "(?:{[^/]+})?\\??(?=/|$)");
		e = e.replace(t, () => r ? `/${r}` : "");
	}
	return e;
}, y = (e) => {
	let t = new URLSearchParams();
	for (let [n, r] of Object.entries(e)) if (r !== void 0) {
		if (Array.isArray(r)) for (let e of r) e !== void 0 && t.append(n, e);
		else t.set(n, r);
	}
	return t;
}, b = (e, t) => {
	switch (t) {
		case "ws": return e.replace(/^http/, "ws");
		case "http": return e.replace(/^ws/, "http");
	}
}, x = (e) => /^https?:\/\/[^\/]+?\/index(?=\?|$)/.test(e) ? e.replace(/\/index(?=\?|$)/, "/") : e.replace(/\/index(?=\?|$)/, "");
function S(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function C(e, t) {
	if (!S(e) && !S(t)) return t;
	let n = { ...e };
	for (let e in t) {
		let r = t[e];
		n[e] = S(n[e]) && S(r) ? C(n[e], r) : r;
	}
	return n;
}
// node_modules/hono/dist/utils/cookie.js
var ge = /^[\w!#$%&'*.^`|~+-]+$/, _e = (e, t, n = {}) => {
	if (!ge.test(e)) throw Error("Invalid cookie name");
	let r = `${e}=${t}`;
	if (e.startsWith("__Secure-") && !n.secure) throw Error("__Secure- Cookie must have Secure attributes");
	if (e.startsWith("__Host-")) {
		if (!n.secure) throw Error("__Host- Cookie must have Secure attributes");
		if (n.path !== "/") throw Error("__Host- Cookie must have Path attributes with \"/\"");
		if (n.domain) throw Error("__Host- Cookie must not have Domain attributes");
	}
	for (let e of [
		"domain",
		"path",
		"sameSite",
		"priority"
	]) if (n[e] && /[;\r\n]/.test(n[e])) throw Error(`${e} must not contain ";", "\\r", or "\\n"`);
	if (n && typeof n.maxAge == "number" && n.maxAge >= 0) {
		if (n.maxAge > 3456e4) throw Error("Cookies Max-Age SHOULD NOT be greater than 400 days (34560000 seconds) in duration.");
		r += `; Max-Age=${n.maxAge | 0}`;
	}
	if (n.domain && n.prefix !== "host" && (r += `; Domain=${n.domain}`), n.path && (r += `; Path=${n.path}`), n.expires) {
		if (n.expires.getTime() - Date.now() > 3456e7) throw Error("Cookies Expires SHOULD NOT be greater than 400 days (34560000 seconds) in the future.");
		r += `; Expires=${n.expires.toUTCString()}`;
	}
	if (n.httpOnly && (r += "; HttpOnly"), n.secure && (r += "; Secure"), n.sameSite && (r += `; SameSite=${n.sameSite.charAt(0).toUpperCase() + n.sameSite.slice(1)}`), n.priority && (r += `; Priority=${n.priority.charAt(0).toUpperCase() + n.priority.slice(1)}`), n.partitioned) {
		if (!n.secure) throw Error("Partitioned Cookie must have Secure attributes");
		r += "; Partitioned";
	}
	return r;
}, ve = (e, t, n) => (t = encodeURIComponent(t), _e(e, t, n)), w = (e, t) => new Proxy(() => {}, {
	get(n, r) {
		if (typeof r == "string" && r !== "then") return w(e, [...t, r]);
	},
	apply(n, r, i) {
		return e({
			path: t,
			args: i
		});
	}
}), T = (e, t) => {
	let n = t.toString();
	return n ? `${e}?${n}` : e;
}, E = class {
	url;
	method;
	buildSearchParams;
	queryParams = void 0;
	pathParams = {};
	rBody;
	cType = void 0;
	constructor(e, t, n) {
		this.url = e, this.method = t, this.buildSearchParams = n.buildSearchParams;
	}
	fetch = async (e, t) => {
		if (e) {
			if (e.query && (this.queryParams = this.buildSearchParams(e.query)), e.form) {
				let t = new FormData();
				for (let [n, r] of Object.entries(e.form)) if (r !== void 0) {
					if (Array.isArray(r)) for (let e of r) e !== void 0 && t.append(n, e);
					else t.append(n, r);
				}
				this.rBody = t;
			}
			e.json !== void 0 && (this.rBody = JSON.stringify(e.json), this.cType = "application/json"), e.param && (this.pathParams = e.param);
		}
		let n = this.method.toUpperCase(), r = {
			...e?.header,
			...typeof t?.headers == "function" ? await t.headers() : t?.headers
		};
		if (e?.cookie) {
			let t = [];
			for (let [n, r] of Object.entries(e.cookie)) r !== void 0 && t.push(ve(n, r));
			t.length > 0 && (r.Cookie = t.join("; "));
		}
		this.cType && (r["Content-Type"] = this.cType);
		let i = new Headers();
		for (let [e, t] of Object.entries(r)) t !== void 0 && i.set(e, t);
		let a = this.url;
		a = x(a), a = v(a, this.pathParams), this.queryParams && (a = T(a, this.queryParams)), n = this.method.toUpperCase();
		let o = n !== "GET" && n !== "HEAD";
		return (t?.fetch || fetch)(a, {
			body: o ? this.rBody : void 0,
			method: n,
			headers: i,
			...t?.init
		});
	};
}, D = (e, t) => w(function n(r) {
	let i = t?.buildSearchParams ?? y, a = [...r.path], o = a.slice(-3).reverse();
	if (o[0] === "toString") return o[1] === "name" ? o[2] || "" : n.toString();
	if (o[0] === "valueOf") return o[1] === "name" ? o[2] || "" : n;
	let s = "";
	if (/^\$/.test(o[0])) {
		let e = a.pop();
		e && (s = e.replace(/^\$/, ""));
	}
	let c = he(e, a.join("/"));
	if (s === "url" || s === "path") {
		let t = x(c);
		return r.args[0] && (r.args[0].param && (t = v(t, r.args[0].param)), r.args[0].query && (t = T(t, i(r.args[0].query)))), s === "url" ? new URL(t) : t.slice(e.replace(/\/+$/, "").length).replace(/^\/?/, "/");
	}
	if (s === "ws") {
		let e = x(c), n = b(r.args[0]?.param ? v(e, r.args[0].param) : e, "ws"), a = new URL(n), o = r.args[0]?.query;
		return o && i(o).forEach((e, t) => {
			a.searchParams.append(t, e);
		}), ((...e) => t?.webSocket !== void 0 && typeof t.webSocket == "function" ? t.webSocket(...e) : new WebSocket(...e))(a.toString());
	}
	let l = new E(c, s, { buildSearchParams: i });
	if (s) {
		t ??= {};
		let e = { ...r.args[1] }, n = t.headers, i = e.headers;
		n && i && (e.headers = async () => ({
			...typeof n == "function" ? await n() : n,
			...typeof i == "function" ? await i() : i
		}));
		let a = C(t, e);
		return l.fetch(r.args[0], a);
	}
	return l;
}, []), O = /*@__PURE__*/ d("ZodMiniType", (e, t) => {
	if (!e._zod) throw Error("Uninitialized schema in ZodMiniType.");
	re.init(e, t), e.def = t, e.type = t.type;
}, {
	get with() {
		return this.check;
	},
	set with(e) {
		se(this, "with", e);
	},
	parse(e, t) {
		return me(this, e, t, { callee: this.parse });
	},
	parseAsync(e, t) {
		return h(this, e, t, { callee: this.parseAsync });
	},
	safeParse(e, t) {
		return r(this, e, t);
	},
	safeParseAsync(e, t) {
		return n(this, e, t);
	},
	check(...e) {
		let t = this.def;
		return this.clone({
			...t,
			checks: [...t.checks ?? [], ...e.map((e) => typeof e == "function" ? { _zod: {
				check: e,
				def: { check: "custom" },
				onattach: []
			} } : e)]
		}, { parent: !0 });
	},
	clone(t, n) {
		return e(this, t, n);
	},
	brand() {
		return this;
	},
	register(e, t) {
		return e.add(this, t), this;
	},
	apply(e, ...t) {
		return t.length === 0 ? e(this) : e(this, ...t);
	}
}), k = /*@__PURE__*/ d("ZodMiniString", (e, t) => {
	o.init(e, t), O.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function A(e) {
	return te(k, e);
}
var j = /*@__PURE__*/ d("ZodMiniNumber", (e, t) => {
	m.init(e, t), O.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function M(e) {
	return p(j, e);
}
var N = /*@__PURE__*/ d("ZodMiniBoolean", (e, t) => {
	oe.init(e, t), O.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function P(e) {
	return le(N, e);
}
var F = /*@__PURE__*/ d("ZodMiniUnknown", (e, t) => {
	pe.init(e, t), O.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function I() {
	return ne(F);
}
var ye = /*@__PURE__*/ d("ZodMiniNever", (e, t) => {
	ee.init(e, t), O.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function be(e) {
	return i(ye, e);
}
var xe = /*@__PURE__*/ d("ZodMiniArray", (e, t) => {
	ie.init(e, t), O.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function L(e, t) {
	return new xe({
		type: "array",
		element: e,
		...f(t)
	});
}
var Se = /*@__PURE__*/ d("ZodMiniObject", (e, n) => {
	t.init(e, n), O.init(e, n), s(e, "shape", (e) => e._zod.def.shape, !1);
});
// @__NO_SIDE_EFFECTS__
function R(e, t) {
	return new Se({
		type: "object",
		shape: e ?? {},
		...f(t)
	});
}
// @__NO_SIDE_EFFECTS__
function z(e, t) {
	return _(e, t);
}
var Ce = /*@__PURE__*/ d("ZodMiniUnion", (e, t) => {
	de.init(e, t), O.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function B(e, t) {
	return new Ce({
		type: "union",
		options: e,
		...f(t)
	});
}
var we = /*@__PURE__*/ d("ZodMiniDiscriminatedUnion", (e, t) => {
	ce.init(e, t), O.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function Te(e, t, n) {
	return new we({
		type: "union",
		options: t,
		discriminator: e,
		...f(n)
	});
}
var V = /*@__PURE__*/ d("ZodMiniRecord", (e, t) => {
	fe.init(e, t), O.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function H(e, t, n) {
	return !t || !t._zod ? new V({
		type: "record",
		keyType: /* @__PURE__ */ A(),
		valueType: e,
		...f(t)
	}) : new V({
		type: "record",
		keyType: e,
		valueType: t,
		...f(n)
	});
}
var Ee = /*@__PURE__*/ d("ZodMiniEnum", (e, t) => {
	ae.init(e, t), O.init(e, t), e.options = [...e._zod.values];
});
// @__NO_SIDE_EFFECTS__
function U(e, t) {
	return new Ee({
		type: "enum",
		entries: Array.isArray(e) ? Object.fromEntries(e.map((e) => [e, e])) : e,
		...f(t)
	});
}
var De = /*@__PURE__*/ d("ZodMiniLiteral", (e, t) => {
	u.init(e, t), O.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function W(e, t) {
	return new De({
		type: "literal",
		values: Array.isArray(e) ? e : [e],
		...f(t)
	});
}
var Oe = /*@__PURE__*/ d("ZodMiniOptional", (e, t) => {
	a.init(e, t), O.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function G(e) {
	return new Oe({
		type: "optional",
		innerType: e
	});
}
var ke = /*@__PURE__*/ d("ZodMiniNullable", (e, t) => {
	c.init(e, t), O.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function K(e) {
	return new ke({
		type: "nullable",
		innerType: e
	});
}
var Ae = /* @__PURE__ */ B([/* @__PURE__ */ R({
	ok: /* @__PURE__ */ W(!0),
	id: /* @__PURE__ */ M(),
	thread: /* @__PURE__ */ A()
}), /* @__PURE__ */ R({
	ok: /* @__PURE__ */ W(!1),
	error: /* @__PURE__ */ A()
})]), je = /* @__PURE__ */ R({
	ok: /* @__PURE__ */ P(),
	name: /* @__PURE__ */ G(/* @__PURE__ */ A()),
	error: /* @__PURE__ */ G(/* @__PURE__ */ A()),
	every: /* @__PURE__ */ G(/* @__PURE__ */ K(/* @__PURE__ */ A())),
	cron: /* @__PURE__ */ G(/* @__PURE__ */ K(/* @__PURE__ */ A())),
	timezone: /* @__PURE__ */ G(/* @__PURE__ */ A()),
	next_at: /* @__PURE__ */ G(/* @__PURE__ */ A())
}), q = /* @__PURE__ */ R({
	id: /* @__PURE__ */ A(),
	name: /* @__PURE__ */ A(),
	type: /* @__PURE__ */ A(),
	size: /* @__PURE__ */ M(),
	author: /* @__PURE__ */ A(),
	ts: /* @__PURE__ */ M(),
	embed: /* @__PURE__ */ G(/* @__PURE__ */ P())
}), Me = /* @__PURE__ */ z(q, { reminder: /* @__PURE__ */ G(je) }), J = /* @__PURE__ */ R({ error: /* @__PURE__ */ A() }), Ne = [
	"blue",
	"green",
	"yellow",
	"orange",
	"pink",
	"purple"
], Pe = /* @__PURE__ */ R({
	endpoint: (/* @__PURE__ */ A()).check(g("https://"), ue(1e3)),
	p256dh: (/* @__PURE__ */ A()).check(l(1)),
	auth: (/* @__PURE__ */ A()).check(l(1))
});
(/* @__PURE__ */ A()).check(l(1)), (/* @__PURE__ */ A()).check(g("m"));
var Fe = /* @__PURE__ */ R({ ok: /* @__PURE__ */ W(!0) }), Ie = /* @__PURE__ */ R({ key: /* @__PURE__ */ K(/* @__PURE__ */ A()) }), Le = /* @__PURE__ */ R({
	ok: /* @__PURE__ */ W(!0),
	sent: /* @__PURE__ */ M()
}), Re = /* @__PURE__ */ R({ books: /* @__PURE__ */ L(/* @__PURE__ */ R({
	id: /* @__PURE__ */ A(),
	title: /* @__PURE__ */ A(),
	folder: /* @__PURE__ */ K(/* @__PURE__ */ A()),
	summary: /* @__PURE__ */ K(/* @__PURE__ */ A()),
	updated_at: /* @__PURE__ */ M(),
	archived_at: /* @__PURE__ */ M(),
	members: /* @__PURE__ */ K(/* @__PURE__ */ A())
})) }), ze = /* @__PURE__ */ R({
	rooms: /* @__PURE__ */ M(),
	failed: /* @__PURE__ */ G(/* @__PURE__ */ M()),
	epics: /* @__PURE__ */ L(/* @__PURE__ */ R({
		id: /* @__PURE__ */ A(),
		title: /* @__PURE__ */ A(),
		archived: /* @__PURE__ */ P(),
		ts: /* @__PURE__ */ M(),
		room_id: /* @__PURE__ */ A(),
		room: /* @__PURE__ */ A()
	})),
	messages: /* @__PURE__ */ L(/* @__PURE__ */ R({
		id: /* @__PURE__ */ M(),
		thread: /* @__PURE__ */ A(),
		topic: /* @__PURE__ */ K(/* @__PURE__ */ A()),
		author: /* @__PURE__ */ A(),
		by_agent: /* @__PURE__ */ P(),
		via: /* @__PURE__ */ K(/* @__PURE__ */ A()),
		ts: /* @__PURE__ */ M(),
		files: /* @__PURE__ */ L(/* @__PURE__ */ R({
			id: /* @__PURE__ */ A(),
			name: /* @__PURE__ */ A()
		})),
		snippet: /* @__PURE__ */ A(),
		room_id: /* @__PURE__ */ A(),
		room: /* @__PURE__ */ A()
	}))
}), Be = /* @__PURE__ */ R({
	logins: /* @__PURE__ */ L(/* @__PURE__ */ R({
		method: /* @__PURE__ */ A(),
		last: /* @__PURE__ */ M(),
		n: /* @__PURE__ */ M()
	})),
	providers: /* @__PURE__ */ R({
		google: /* @__PURE__ */ P(),
		github: /* @__PURE__ */ P()
	})
}), Ve = /* @__PURE__ */ R({
	ok: /* @__PURE__ */ W(!0),
	claude_on: /* @__PURE__ */ P()
}), He = /* @__PURE__ */ R({
	ok: /* @__PURE__ */ W(!0),
	member: /* @__PURE__ */ G(/* @__PURE__ */ W(!0))
}), Ue = /* @__PURE__ */ R({
	ok: /* @__PURE__ */ W(!0),
	name: /* @__PURE__ */ A()
}), We = /* @__PURE__ */ R({
	id: /* @__PURE__ */ A(),
	invited: /* @__PURE__ */ L(/* @__PURE__ */ A()),
	unknown: /* @__PURE__ */ L(/* @__PURE__ */ A()),
	cost: /* @__PURE__ */ M()
}), Y = /* @__PURE__ */ R({
	book_id: /* @__PURE__ */ A(),
	book_title: /* @__PURE__ */ A(),
	epic_id: /* @__PURE__ */ K(/* @__PURE__ */ A()),
	epic_title: /* @__PURE__ */ K(/* @__PURE__ */ A())
}), Ge = /* @__PURE__ */ R({
	pick: /* @__PURE__ */ K(Y),
	reason: /* @__PURE__ */ G(/* @__PURE__ */ A()),
	alternatives: /* @__PURE__ */ L(Y),
	new_room_title: /* @__PURE__ */ A(),
	cost: /* @__PURE__ */ M()
}), Ke = /* @__PURE__ */ R({ connected: /* @__PURE__ */ P() }), X = /* @__PURE__ */ K(/* @__PURE__ */ M()), Z = /* @__PURE__ */ K(/* @__PURE__ */ A()), qe = /* @__PURE__ */ R({
	claude_on: /* @__PURE__ */ P(),
	sandboxes: /* @__PURE__ */ L(/* @__PURE__ */ R({
		id: /* @__PURE__ */ A(),
		email: /* @__PURE__ */ A(),
		name: Z,
		state: Z,
		run_s: X,
		rate: X,
		disk_rate: X,
		checked_at: X,
		created_at: X
	})),
	agents: /* @__PURE__ */ L(/* @__PURE__ */ R({
		email: /* @__PURE__ */ A(),
		who: /* @__PURE__ */ A(),
		repo: Z,
		seen_at: X,
		listening: /* @__PURE__ */ P(),
		all_rooms: /* @__PURE__ */ P(),
		context: /* @__PURE__ */ K(/* @__PURE__ */ R({
			tokens: /* @__PURE__ */ M(),
			window: /* @__PURE__ */ M(),
			at: X,
			limits: /* @__PURE__ */ K(/* @__PURE__ */ H(/* @__PURE__ */ A(), /* @__PURE__ */ R({
				p: /* @__PURE__ */ M(),
				r: /* @__PURE__ */ M()
			})))
		}))
	}))
}), Je = /* @__PURE__ */ R({
	connected: /* @__PURE__ */ P(),
	claude: /* @__PURE__ */ P(),
	sandboxes: /* @__PURE__ */ L(/* @__PURE__ */ R({
		id: /* @__PURE__ */ A(),
		name: /* @__PURE__ */ A(),
		vm_id: /* @__PURE__ */ A(),
		ready: /* @__PURE__ */ P(),
		state: /* @__PURE__ */ A(),
		error: /* @__PURE__ */ G(/* @__PURE__ */ A()),
		log: /* @__PURE__ */ G(/* @__PURE__ */ A()),
		created_at: /* @__PURE__ */ M(),
		rate: /* @__PURE__ */ M(),
		cost: /* @__PURE__ */ M()
	}))
}), Ye = /* @__PURE__ */ R({
	ok: /* @__PURE__ */ W(!0),
	id: /* @__PURE__ */ A(),
	vm_id: /* @__PURE__ */ A(),
	name: /* @__PURE__ */ A()
}), Xe = /* @__PURE__ */ R({
	ok: /* @__PURE__ */ P(),
	log: /* @__PURE__ */ A(),
	error: /* @__PURE__ */ G(/* @__PURE__ */ A())
}), Ze = /* @__PURE__ */ R({
	token: /* @__PURE__ */ A(),
	url: /* @__PURE__ */ A()
}), Q = /* @__PURE__ */ R({
	id: /* @__PURE__ */ A(),
	title: /* @__PURE__ */ A(),
	host: /* @__PURE__ */ A(),
	scope: /* @__PURE__ */ U(["room", "me"]),
	owner: /* @__PURE__ */ A(),
	mine: /* @__PURE__ */ P(),
	created_at: /* @__PURE__ */ M(),
	auth: /* @__PURE__ */ U(["token", "identity"]),
	signed_in: /* @__PURE__ */ P(),
	apps: /* @__PURE__ */ L(/* @__PURE__ */ R({
		tool: /* @__PURE__ */ A(),
		title: /* @__PURE__ */ A(),
		description: /* @__PURE__ */ A(),
		screen: /* @__PURE__ */ P()
	})),
	tools: /* @__PURE__ */ L(/* @__PURE__ */ R({
		name: /* @__PURE__ */ A(),
		description: /* @__PURE__ */ A(),
		read_only: /* @__PURE__ */ P(),
		app: /* @__PURE__ */ P()
	})),
	context: /* @__PURE__ */ H(/* @__PURE__ */ A(), /* @__PURE__ */ R({
		text: /* @__PURE__ */ A(),
		by: /* @__PURE__ */ A(),
		at: /* @__PURE__ */ M()
	}))
}), Qe = /* @__PURE__ */ R({ connections: /* @__PURE__ */ L(Q) }), $e = /* @__PURE__ */ R({
	ok: /* @__PURE__ */ W(!0),
	connection: /* @__PURE__ */ K(/* @__PURE__ */ z(Q, { needs_sign_in: /* @__PURE__ */ P() }))
}), et = /* @__PURE__ */ R({
	ok: /* @__PURE__ */ W(!0),
	connection: Q
}), tt = /* @__PURE__ */ R({
	html: /* @__PURE__ */ A(),
	tool: /* @__PURE__ */ R({
		name: /* @__PURE__ */ A(),
		title: /* @__PURE__ */ G(/* @__PURE__ */ A()),
		description: /* @__PURE__ */ G(/* @__PURE__ */ A()),
		inputSchema: /* @__PURE__ */ G(/* @__PURE__ */ I()),
		annotations: /* @__PURE__ */ G(/* @__PURE__ */ I()),
		_meta: /* @__PURE__ */ G(/* @__PURE__ */ I())
	})
}), nt = /* @__PURE__ */ R({ result: /* @__PURE__ */ I() }), rt = /* @__PURE__ */ R({
	error: /* @__PURE__ */ A(),
	sign_in: /* @__PURE__ */ G(/* @__PURE__ */ W(!0))
}), it = /* @__PURE__ */ z(/* @__PURE__ */ R({
	email: /* @__PURE__ */ A(),
	name: Z,
	avatar: X,
	books: /* @__PURE__ */ L(/* @__PURE__ */ R({
		id: /* @__PURE__ */ A(),
		title: Z,
		folder: Z,
		summary: Z,
		updated_at: X,
		created_at: X,
		icon: X,
		busy_until: X,
		position: X,
		tint: Z,
		opened_at: X,
		last_human_id: /* @__PURE__ */ M(),
		last_agent_id: /* @__PURE__ */ M(),
		read_id: /* @__PURE__ */ M(),
		sandboxes_running: /* @__PURE__ */ M(),
		members: Z
	})),
	friends: /* @__PURE__ */ L(/* @__PURE__ */ R({
		email: /* @__PURE__ */ A(),
		name: Z,
		avatar: X,
		joined: /* @__PURE__ */ M(),
		shared: /* @__PURE__ */ M()
	})),
	waits: /* @__PURE__ */ L(/* @__PURE__ */ R({
		book_id: /* @__PURE__ */ A(),
		room: /* @__PURE__ */ A(),
		ref: /* @__PURE__ */ A(),
		thread: /* @__PURE__ */ A(),
		topic: Z,
		author: /* @__PURE__ */ A(),
		author_name: Z,
		text: /* @__PURE__ */ A(),
		ts: /* @__PURE__ */ M()
	}))
}), {
	v: /* @__PURE__ */ A(),
	cached: /* @__PURE__ */ G(/* @__PURE__ */ W(!0))
}), at = /* @__PURE__ */ R({
	ok: /* @__PURE__ */ W(!0),
	avatar: /* @__PURE__ */ M()
}), ot = /* @__PURE__ */ R({
	ok: /* @__PURE__ */ W(!0),
	icon: X
}), st = { error: "unauthenticated" }, ct = /* @__PURE__ */ R({
	providers: /* @__PURE__ */ R({
		google: /* @__PURE__ */ P(),
		github: /* @__PURE__ */ P(),
		email: /* @__PURE__ */ W(!0)
	}),
	next: /* @__PURE__ */ A(),
	error: /* @__PURE__ */ K(/* @__PURE__ */ U(["google", "github"]))
}), lt = /* @__PURE__ */ R({
	ok: /* @__PURE__ */ W(!0),
	next: /* @__PURE__ */ A()
}), ut = /* @__PURE__ */ R({
	state: /* @__PURE__ */ U([
		"missing",
		"out",
		"ask",
		"asked",
		"member"
	]),
	title: /* @__PURE__ */ K(/* @__PURE__ */ A()),
	email: /* @__PURE__ */ K(/* @__PURE__ */ A())
}), dt = /* @__PURE__ */ R({
	agents: /* @__PURE__ */ L(/* @__PURE__ */ R({
		id: /* @__PURE__ */ A(),
		client: /* @__PURE__ */ A(),
		connected_at: /* @__PURE__ */ M(),
		used_at: /* @__PURE__ */ G(/* @__PURE__ */ K(/* @__PURE__ */ M()))
	})),
	last_used: /* @__PURE__ */ K(/* @__PURE__ */ M())
}), ft = /* @__PURE__ */ R({
	ok: /* @__PURE__ */ W(!0),
	removed: /* @__PURE__ */ M()
}), pt = /* @__PURE__ */ R({
	client_name: /* @__PURE__ */ A(),
	client_domain: /* @__PURE__ */ K(/* @__PURE__ */ A()),
	redirect_host: /* @__PURE__ */ A(),
	redirect_is_loopback: /* @__PURE__ */ P(),
	scope: /* @__PURE__ */ L(/* @__PURE__ */ A()),
	email: /* @__PURE__ */ A(),
	handle: /* @__PURE__ */ A()
}), mt = /* @__PURE__ */ R({
	error: /* @__PURE__ */ A(),
	redirect_to: /* @__PURE__ */ G(/* @__PURE__ */ A())
}), $ = /* @__PURE__ */ R({
	n: /* @__PURE__ */ M(),
	ignore: /* @__PURE__ */ M(),
	answer: /* @__PURE__ */ M(),
	wake: /* @__PURE__ */ M(),
	cost: /* @__PURE__ */ M(),
	p50: /* @__PURE__ */ G(/* @__PURE__ */ K(/* @__PURE__ */ M())),
	p95: /* @__PURE__ */ G(/* @__PURE__ */ K(/* @__PURE__ */ M()))
}), ht = /* @__PURE__ */ R({
	since: /* @__PURE__ */ A(),
	arms: /* @__PURE__ */ R({
		jev: $,
		hybrid: $,
		haiku: $,
		rule: $
	}),
	recent: /* @__PURE__ */ L(/* @__PURE__ */ R({
		book_id: /* @__PURE__ */ A(),
		room: /* @__PURE__ */ K(/* @__PURE__ */ A()),
		who: /* @__PURE__ */ A(),
		msg_id: /* @__PURE__ */ M(),
		arm: /* @__PURE__ */ A(),
		decision: /* @__PURE__ */ A(),
		why: /* @__PURE__ */ K(/* @__PURE__ */ A()),
		source: /* @__PURE__ */ K(/* @__PURE__ */ A()),
		reply_id: /* @__PURE__ */ K(/* @__PURE__ */ M()),
		ms: /* @__PURE__ */ K(/* @__PURE__ */ M()),
		cost: /* @__PURE__ */ K(/* @__PURE__ */ M()),
		text: /* @__PURE__ */ K(/* @__PURE__ */ A()),
		ts: /* @__PURE__ */ M()
	}))
}), gt = /* @__PURE__ */ R({
	recorded: /* @__PURE__ */ R({
		jev: /* @__PURE__ */ M(),
		llm: /* @__PURE__ */ M(),
		router: /* @__PURE__ */ M(),
		since: /* @__PURE__ */ K(/* @__PURE__ */ A())
	}),
	by_event: /* @__PURE__ */ L(/* @__PURE__ */ R({
		event: /* @__PURE__ */ A(),
		kind: /* @__PURE__ */ A(),
		model: /* @__PURE__ */ A(),
		calls: /* @__PURE__ */ M(),
		cost: /* @__PURE__ */ M()
	})),
	router: /* @__PURE__ */ L(/* @__PURE__ */ R({
		arm: /* @__PURE__ */ A(),
		n: /* @__PURE__ */ M(),
		cost: /* @__PURE__ */ M()
	})),
	days: /* @__PURE__ */ L(/* @__PURE__ */ R({
		day: /* @__PURE__ */ A(),
		jev: /* @__PURE__ */ M(),
		llm: /* @__PURE__ */ M(),
		router: /* @__PURE__ */ M()
	})),
	openrouter_key: /* @__PURE__ */ K(/* @__PURE__ */ R({
		usage: /* @__PURE__ */ M(),
		limit: /* @__PURE__ */ K(/* @__PURE__ */ M()),
		daily: /* @__PURE__ */ K(/* @__PURE__ */ M()),
		weekly: /* @__PURE__ */ K(/* @__PURE__ */ M()),
		monthly: /* @__PURE__ */ K(/* @__PURE__ */ M())
	})),
	note: /* @__PURE__ */ A()
}), _t = (e = "/", t) => D(e, t ? { fetch: t } : {}), vt = (e = "/", t) => D(e, t ? { fetch: t } : {});
export { M as $, Le as A, Ue as B, ct as C, Ae as D, Fe as E, ht as F, U as G, Ne as H, Xe as I, Te as J, L as K, Ze as L, ft as M, ot as N, Ie as O, Ge as P, K as Q, Je as R, J as S, it as T, st as U, We as V, Me as W, W as X, z as Y, be as Z, pt as _, dt as a, Ye as b, Re as c, Ve as d, R as et, Ke as f, Qe as g, tt as h, He as i, B as it, et as j, Pe as k, q as l, rt as m, _t as n, H as nt, qe as o, nt as p, P as q, ut as r, A as rt, gt as s, vt as t, G as tt, at as u, mt as v, Be as w, lt as x, $e as y, ze as z };
