import "./shared-Cn4mm4KY.js";
// node_modules/hono/dist/client/utils.js
var e = (e, t) => (e = e.replace(/\/+$/, ""), e += "/", t = t.replace(/^\/+/, ""), e + t), t = (e, t) => {
	for (let [n, r] of Object.entries(t)) {
		let t = RegExp("/:" + n + "(?:{[^/]+})?\\??(?=/|$)");
		e = e.replace(t, () => r ? `/${r}` : "");
	}
	return e;
}, n = (e) => {
	let t = new URLSearchParams();
	for (let [n, r] of Object.entries(e)) if (r !== void 0) {
		if (Array.isArray(r)) for (let e of r) e !== void 0 && t.append(n, e);
		else t.set(n, r);
	}
	return t;
}, r = (e, t) => {
	switch (t) {
		case "ws": return e.replace(/^http/, "ws");
		case "http": return e.replace(/^ws/, "http");
	}
}, i = (e) => /^https?:\/\/[^\/]+?\/index(?=\?|$)/.test(e) ? e.replace(/\/index(?=\?|$)/, "/") : e.replace(/\/index(?=\?|$)/, "");
function a(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function o(e, t) {
	if (!a(e) && !a(t)) return t;
	let n = { ...e };
	for (let e in t) {
		let r = t[e];
		n[e] = a(n[e]) && a(r) ? o(n[e], r) : r;
	}
	return n;
}
// node_modules/hono/dist/utils/cookie.js
var s = /^[\w!#$%&'*.^`|~+-]+$/, c = (e, t, n = {}) => {
	if (!s.test(e)) throw Error("Invalid cookie name");
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
}, l = (e, t, n) => (t = encodeURIComponent(t), c(e, t, n)), u = (e, t) => new Proxy(() => {}, {
	get(n, r) {
		if (typeof r == "string" && r !== "then") return u(e, [...t, r]);
	},
	apply(n, r, i) {
		return e({
			path: t,
			args: i
		});
	}
}), d = (e, t) => {
	let n = t.toString();
	return n ? `${e}?${n}` : e;
}, f = class {
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
	fetch = async (e, n) => {
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
		let r = this.method.toUpperCase(), a = {
			...e?.header,
			...typeof n?.headers == "function" ? await n.headers() : n?.headers
		};
		if (e?.cookie) {
			let t = [];
			for (let [n, r] of Object.entries(e.cookie)) r !== void 0 && t.push(l(n, r));
			t.length > 0 && (a.Cookie = t.join("; "));
		}
		this.cType && (a["Content-Type"] = this.cType);
		let o = new Headers();
		for (let [e, t] of Object.entries(a)) t !== void 0 && o.set(e, t);
		let s = this.url;
		s = i(s), s = t(s, this.pathParams), this.queryParams && (s = d(s, this.queryParams)), r = this.method.toUpperCase();
		let c = r !== "GET" && r !== "HEAD";
		return (n?.fetch || fetch)(s, {
			body: c ? this.rBody : void 0,
			method: r,
			headers: o,
			...n?.init
		});
	};
}, p = (a, s) => u(function c(l) {
	let u = s?.buildSearchParams ?? n, p = [...l.path], m = p.slice(-3).reverse();
	if (m[0] === "toString") return m[1] === "name" ? m[2] || "" : c.toString();
	if (m[0] === "valueOf") return m[1] === "name" ? m[2] || "" : c;
	let h = "";
	if (/^\$/.test(m[0])) {
		let e = p.pop();
		e && (h = e.replace(/^\$/, ""));
	}
	let g = e(a, p.join("/"));
	if (h === "url" || h === "path") {
		let e = i(g);
		return l.args[0] && (l.args[0].param && (e = t(e, l.args[0].param)), l.args[0].query && (e = d(e, u(l.args[0].query)))), h === "url" ? new URL(e) : e.slice(a.replace(/\/+$/, "").length).replace(/^\/?/, "/");
	}
	if (h === "ws") {
		let e = i(g), n = r(l.args[0]?.param ? t(e, l.args[0].param) : e, "ws"), a = new URL(n), o = l.args[0]?.query;
		return o && u(o).forEach((e, t) => {
			a.searchParams.append(t, e);
		}), ((...e) => s?.webSocket !== void 0 && typeof s.webSocket == "function" ? s.webSocket(...e) : new WebSocket(...e))(a.toString());
	}
	let _ = new f(g, h, { buildSearchParams: u });
	if (h) {
		s ??= {};
		let e = { ...l.args[1] }, t = s.headers, n = e.headers;
		t && n && (e.headers = async () => ({
			...typeof t == "function" ? await t() : t,
			...typeof n == "function" ? await n() : n
		}));
		let r = o(s, e);
		return _.fetch(l.args[0], r);
	}
	return _;
}, []);
// node_modules/zod/v4/core/util.js
function m(e) {
	let t = Object.values(e).filter((e) => typeof e == "number");
	return Object.entries(e).filter(([e, n]) => t.indexOf(+e) === -1).map(([e, t]) => t);
}
function h(e, t) {
	return typeof t == "bigint" ? t.toString() : t;
}
var g = class {
	constructor(e) {
		this._getter = e, this._value = void 0;
	}
	get value() {
		let e = this._getter;
		return e !== void 0 && (this._value = e(), this._getter = void 0), this._value;
	}
};
function _(e) {
	return new g(e);
}
function ee(e) {
	return e == null;
}
function v(e) {
	let t = +!!e.startsWith("^"), n = e.endsWith("$") ? e.length - 1 : e.length;
	return e.slice(t, n);
}
function y(e, t, n) {
	Object.defineProperty(e, t, {
		value: n,
		writable: !0,
		enumerable: !0,
		configurable: !0
	});
}
function te(e) {
	let t = Object.getOwnPropertyDescriptor(e, "shape");
	return t?.get ? t.get.raw : t?.value;
}
function b(e) {
	return te(e._zod.def) ?? e._zod.def.shape;
}
function ne(e, t, n) {
	Object.defineProperty(e, t, {
		get() {
			let e = n();
			return y(this, t, e), e;
		},
		enumerable: !0,
		configurable: !0
	});
}
function re(e, t, n) {
	t in e ? y(e, t, n) : e[t] = n;
}
function ie(e, t, n, r) {
	let i = b(t);
	for (let a of n) {
		let n = Object.getOwnPropertyDescriptor(i, a);
		n.enumerable && (n.get ? ne(e, a, () => {
			let e = t._zod.def.shape[a];
			return r ? r(e, a) : e;
		}) : re(e, a, r ? r(n.value, a) : n.value));
	}
}
function ae(e, t) {
	for (let n of Reflect.ownKeys(t)) {
		let r = Object.getOwnPropertyDescriptor(t, n);
		r.enumerable && (r.get ? ne(e, n, () => t[n]) : re(e, n, r.value));
	}
}
function oe(...e) {
	let t = {};
	for (let n of e) {
		let e = Object.getOwnPropertyDescriptors(n);
		Object.assign(t, e);
	}
	return Object.defineProperties({}, t);
}
var se = "captureStackTrace" in Error ? Error.captureStackTrace : (...e) => {};
function x(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function ce(e) {
	if (x(e) === !1) return !1;
	let t = e.constructor;
	if (t === void 0 || typeof t != "function") return !0;
	let n = t.prototype;
	return x(n) !== !1 && Object.prototype.hasOwnProperty.call(n, "isPrototypeOf") !== !1;
}
var le = /* @__PURE__*/ new Set([
	"string",
	"number",
	"symbol"
]);
function S(e) {
	return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function ue(e, t, n) {
	let r = new e._zod.constr(t ?? e._zod.def);
	return (!t || n?.parent) && (r._zod.parent = e), r;
}
function C(e) {
	let t = e;
	if (!t) return {};
	if (typeof t == "string") return { error: () => t };
	if (t?.message !== void 0) {
		if (t?.error !== void 0) throw Error("Cannot specify both `message` and `error` params");
		t.error = t.message;
	}
	return delete t.message, typeof t.error == "string" ? {
		...t,
		error: () => t.error
	} : t;
}
function de(e) {
	return Object.keys(e).filter((t) => e[t]._zod.optin !== void 0 && e[t]._zod.optout === "optional");
}
function fe(e, t) {
	if (!ce(t)) throw Error("Invalid input to extend: expected a plain object");
	let n = e._zod.def.checks;
	if (n && n.length > 0) {
		let n = b(e);
		for (let e of Reflect.ownKeys(t)) if (Object.getOwnPropertyDescriptor(n, e) !== void 0) throw Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
	}
	return ue(e, oe(e._zod.def, { shape: pe(e, t) }));
}
function pe(e, t) {
	let n = {};
	return ie(n, e, Reflect.ownKeys(b(e))), ae(n, t), n;
}
function w(e, t = 0) {
	if (e.aborted === !0) return !0;
	for (let n = t; n < e.issues.length; n++) if (e.issues[n]?.continue !== !0) return !0;
	return !1;
}
function me(e, t = 0) {
	if (e.aborted === !0) return !0;
	for (let n = t; n < e.issues.length; n++) if (e.issues[n]?.continue === !1) return !0;
	return !1;
}
function T(e, t) {
	return t.map((t) => {
		var n;
		return (n = t).path ?? (n.path = []), t.path.unshift(e), t;
	});
}
function E(e) {
	return typeof e == "string" ? e : e?.message;
}
function he(e) {
	let t = [];
	for (let n of e ?? []) {
		let e = n._zod.def;
		if (!/_(length|size)$|_equals$/.test(e.check)) break;
		let r = e.maximum ?? e.length ?? e.size;
		r >= 0 && t.push([r, n]);
	}
	return t;
}
function D(e, t, n) {
	var r;
	for (let i = t; i < e.length; i++) (r = e[i]).schema ?? (r.schema = n);
}
function O(e, t, n) {
	var r;
	let i = e.inst?._zod?.traits;
	i?.has("$ZodType") && (i.has("$ZodCheck") ? (r = e).schema ?? (r.schema = e.inst) : e.schema = e.inst);
	let a = e.schema === e.inst ? void 0 : e.schema?._zod.def?.error, o = e.message ? e.message : E(e.inst?._zod.def?.error?.(e)) ?? E(a?.(e)) ?? E(t?.error?.(e)) ?? E(n.customError?.(e)) ?? E(n.localeError?.(e)) ?? "Invalid input", s = {};
	for (let t of Object.keys(e)) t !== "inst" && t !== "schema" && t !== "continue" && t !== "input" && t !== "__proto__" && (s[t] = e[t]);
	return s.path ??= [], s.message = o, t?.reportInput && (s.input = e.input), s;
}
var ge = /[\uD800-\uDBFF]/;
function _e(e) {
	let t = e.length;
	if (!ge.test(e)) return t;
	let n = t;
	for (let r = 0; r < t - 1; r++) (e.charCodeAt(r) & 64512) == 55296 && (e.charCodeAt(r + 1) & 64512) == 56320 && (n--, r++);
	return n;
}
function ve(e) {
	return Array.isArray(e) ? "array" : typeof e == "string" ? "string" : "unknown";
}
function ye(e, t) {
	for (let n in t) {
		let r = Object.getOwnPropertyDescriptor(t, n);
		r.get ? Object.defineProperty(e, n, {
			...r,
			enumerable: !1
		}) : xe(e, n, r.value);
	}
}
function k(e, t, n, r = !0) {
	return Object.defineProperty(e, t, {
		configurable: !0,
		writable: !0,
		enumerable: r,
		value: n
	}), n;
}
function be(e, t, n) {
	return k(e, t, n, !1);
}
function xe(e, t, n) {
	Object.defineProperty(e, t, {
		configurable: !0,
		get() {
			return this == null ? n : k(this, t, n.bind(this));
		},
		set(e) {
			k(this, t, e);
		}
	});
}
function Se(e, t) {
	let n = Object.getPrototypeOf(e);
	return t in n ? void 0 : n;
}
var A, j = !1, Ce = {
	configurable: !0,
	get() {
		j = !0;
	}
};
function M(e, t, n) {
	let r = Object.getPrototypeOf(e._zod);
	t in r && A !== e._zod ? A = void 0 : (A = e._zod, Object.defineProperty(r, t, {
		configurable: !0,
		get() {
			Object.defineProperty(this, t, Ce);
			let e = j;
			j = !1;
			try {
				let r = n(this);
				return j ? delete this[t] : Object.defineProperty(this, t, {
					configurable: !0,
					writable: !0,
					value: r
				}), j ||= e, r;
			} catch (n) {
				throw delete this[t], j ||= e, n;
			}
		},
		set(e) {
			Object.defineProperty(this, t, {
				configurable: !0,
				writable: !0,
				value: e
			});
		}
	}));
}
function we(e, t, n, r) {
	let i = Se(e, t);
	i && Object.defineProperty(i, t, {
		configurable: !0,
		get() {
			let e = {
				configurable: !0,
				writable: !0,
				enumerable: r,
				value: void 0
			};
			return Object.defineProperty(this, t, e), e.value = n(this), Object.defineProperty(this, t, e), e.value;
		},
		set(e) {
			Object.defineProperty(this, t, {
				configurable: !0,
				writable: !0,
				enumerable: r,
				value: e
			});
		}
	});
}
// node_modules/zod/v4/core/core.js
var Te, Ee = {
	value: void 0,
	enumerable: !1
}, De = "captureStackTrace" in Error ? Error : null;
function Oe(e) {
	let t = De;
	if (t) {
		let n = t.stackTraceLimit;
		if (typeof n == "number") {
			try {
				t.stackTraceLimit = 0;
			} catch {
				return De = null, new e();
			}
			try {
				return new e();
			} finally {
				t.stackTraceLimit = n;
			}
		}
	}
	return new e();
}
/* @__NO_SIDE_EFFECTS__ */
function N(e, t, n, r) {
	let i = {};
	function a(e) {
		this.def = e, this.constr = d, this.traits = /* @__PURE__ */ new Set();
	}
	a.prototype = i;
	let o = n, s = o && /* @__PURE__ */ new WeakSet();
	function c(n, r) {
		if (!n._zod) {
			Ee.value = new a(r);
			try {
				Object.defineProperty(n, "_zod", Ee);
			} finally {
				Ee.value = void 0;
			}
		} else if (n._zod.traits.has(e)) return;
		if (n._zod.traits.add(e), t(n, r), s) {
			let e = Object.getPrototypeOf(n), t = n._zod.constr.prototype, r = e;
			for (; r && r !== t;) r = Object.getPrototypeOf(r);
			let i = r ?? e;
			s.has(i) || (s.add(i), ye(i, o));
		}
		let i = d.prototype;
		for (let e in i) Object.prototype.hasOwnProperty.call(i, e) && (e in n || (n[e] = i[e].bind(n)));
	}
	let l = r?.Parent ?? Object;
	class u extends l {}
	Object.defineProperty(u, "name", { value: e });
	function d(e) {
		let t = r?.Parent ? Oe(u) : this;
		c(t, e);
		let n = t._zod.deferred;
		if (n) {
			for (let e of n) e();
			t._zod.deferred = void 0;
		}
		let i = globalThis.__zod_globalConfig?.postProcessor;
		return i && i(t), t;
	}
	return Object.defineProperty(d, "init", { value: c }), Object.defineProperty(d, Symbol.hasInstance, { value: (t) => r?.Parent && t instanceof r.Parent ? !0 : t?._zod?.traits?.has(e) }), Object.defineProperty(d, "name", { value: e }), d;
}
var P = class extends Error {
	constructor() {
		super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
	}
};
(Te = globalThis).__zod_globalConfig ?? (Te.__zod_globalConfig = {});
var F = globalThis.__zod_globalConfig;
function I(e) {
	return e && Object.assign(F, e), F;
}
// node_modules/zod/v4/core/errors.js
function ke() {
	let e = this._zod;
	return e.message ??= JSON.stringify(e.def, h, 2), e.message;
}
function Ae(e) {
	this._zod.message = e;
}
var je = {
	get: ke,
	set: Ae,
	enumerable: !0,
	configurable: !0
}, L = {
	value: void 0,
	enumerable: !1
}, Me = /* @__PURE__ */ new WeakSet([Object.prototype, Error.prototype]), R = /* @__PURE__ */ N("$ZodError", (e, t) => {
	e.name = "$ZodError", L.value = t, Object.defineProperty(e, "issues", L), L.value = void 0, Object.defineProperty(e, "message", je);
	let n = Object.getPrototypeOf(e);
	Me.has(n) || (Me.add(n), Object.defineProperty(n, "toString", {
		configurable: !0,
		enumerable: !1,
		get() {
			let e = () => this.message;
			return Object.defineProperty(this, "toString", {
				value: e,
				configurable: !0,
				writable: !0
			}), e;
		},
		set(e) {
			Object.defineProperty(this, "toString", {
				value: e,
				configurable: !0,
				writable: !0
			});
		}
	}));
}, void 0, { Parent: Error }), Ne = /* @__PURE__*/ ((e) => {
	let t = (n, r, i, a) => {
		let o = i ? {
			...i,
			async: !1
		} : { async: !1 }, s = n._zod.run({
			value: r,
			issues: []
		}, o);
		if (s instanceof Promise) throw new P();
		if (s.issues.length) {
			let n = new ((a?.Err) ?? e)(s.issues.map((e) => O(e, o, I())));
			throw se(n, a?.callee ?? t), n;
		}
		return s.value;
	};
	return t;
})(R), Pe = /* @__PURE__*/ ((e) => {
	let t = async (n, r, i, a) => {
		let o = i ? {
			...i,
			async: !0
		} : { async: !0 }, s = n._zod.run({
			value: r,
			issues: []
		}, o);
		if (s instanceof Promise && (s = await s), s.issues.length) {
			let n = new ((a?.Err) ?? e)(s.issues.map((e) => O(e, o, I())));
			throw se(n, a?.callee ?? t), n;
		}
		return s.value;
	};
	return t;
})(R), Fe = /* @__PURE__*/ ((e) => (t, n, r) => {
	let i = r ? {
		...r,
		async: !1
	} : { async: !1 }, a = t._zod.run({
		value: n,
		issues: []
	}, i);
	if (a instanceof Promise) throw new P();
	return a.issues.length ? Ie(e, a.issues, i) : {
		success: !0,
		data: a.value
	};
})(R);
function Ie(e, t, n) {
	let r;
	return {
		success: !1,
		get error() {
			return r || (r = new e(t.map((e) => O(e, n, I()))), t = void 0, n = void 0), r;
		},
		set error(e) {
			r = e, t = void 0, n = void 0;
		}
	};
}
var Le = /* @__PURE__*/ ((e) => async (t, n, r) => {
	let i = r ? {
		...r,
		async: !0
	} : { async: !0 }, a = t._zod.run({
		value: n,
		issues: []
	}, i);
	return a instanceof Promise && (a = await a), a.issues.length ? Ie(e, a.issues, i) : {
		success: !0,
		data: a.value
	};
})(R), Re = /^[\s\S]{0,}$/, ze = /^-?\d+(?:\.\d+)?$/, Be = /^(?:true|false)$/i, z = /*@__PURE__*/ N("$ZodCheck", (e, t) => {
	var n;
	e._zod ??= {}, e._zod.def = t, (n = e._zod).onattach ?? (n.onattach = []);
}), Ve = (e) => {
	let t = e.value;
	return !ee(t) && t.length !== void 0;
}, He = /*@__PURE__*/ N("$ZodCheckMaxLength", (e, t) => {
	var n;
	z.init(e, t), (n = e._zod.def).when ?? (n.when = Ve), e._zod.check = (n) => {
		let r = n.value, i = r.length;
		if ((typeof r == "string" && i > t.maximum ? _e(r) : i) <= t.maximum) return;
		let a = ve(r);
		n.issues.push({
			origin: a,
			code: "too_big",
			maximum: t.maximum,
			inclusive: !0,
			input: r,
			inst: e,
			continue: !t.abort
		});
	};
}), Ue = /*@__PURE__*/ N("$ZodCheckMinLength", (e, t) => {
	var n;
	z.init(e, t), (n = e._zod.def).when ?? (n.when = Ve), e._zod.check = (n) => {
		let r = n.value, i = r.length;
		if ((typeof r == "string" && i >= t.minimum && i < t.minimum * 2 ? _e(r) : i) >= t.minimum) return;
		let a = ve(r);
		n.issues.push({
			origin: a,
			code: "too_small",
			minimum: t.minimum,
			inclusive: !0,
			input: r,
			inst: e,
			continue: !t.abort
		});
	};
}), We = /*@__PURE__*/ N("$ZodCheckStringFormat", (e, t) => {
	var n, r;
	z.init(e, t), t.pattern ? (n = e._zod).check ?? (n.check = (n) => {
		t.pattern.lastIndex = 0, t.pattern.test(n.value) || n.issues.push({
			origin: "string",
			code: "invalid_format",
			format: t.format,
			input: n.value,
			...t.pattern ? { pattern: t.pattern.toString() } : {},
			inst: e,
			continue: !t.abort
		});
	}) : (r = e._zod).check ?? (r.check = () => {});
}), Ge = /*@__PURE__*/ N("$ZodCheckRegex", (e, t) => {
	We.init(e, t), e._zod.check = (n) => {
		t.pattern.lastIndex = 0, t.pattern.test(n.value) || n.issues.push({
			origin: "string",
			code: "invalid_format",
			format: "regex",
			input: n.value,
			pattern: t.pattern.toString(),
			inst: e,
			continue: !t.abort
		});
	};
}), Ke = /*@__PURE__*/ N("$ZodCheckStartsWith", (e, t) => {
	z.init(e, t);
	let n = RegExp(`^${S(t.prefix)}.*`);
	t.pattern ??= n, e._zod.check = (n) => {
		n.value.startsWith(t.prefix) || n.issues.push({
			origin: "string",
			code: "invalid_format",
			format: "starts_with",
			prefix: t.prefix,
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
}), qe = {
	major: 4,
	minor: 6,
	patch: 7
}, B = /*@__PURE__*/ N("$ZodType", (e, t) => {
	var n;
	e ??= {}, e._zod.def = t, e._zod.bag = e._zod.bag || {}, e._zod.version = qe;
	let r = e._zod.def.checks, i = e._zod.traits.has("$ZodCheck") ? [e, ...r ?? []] : r?.length ? [...r] : [];
	for (let t of i) for (let n of t._zod.onattach) n(e);
	if (i.length === 0) (n = e._zod).deferred ?? (n.deferred = []), e._zod.deferred?.push(() => {
		e._zod.run = e._zod.parse;
	});
	else {
		let t = (t, n, r) => {
			if (t.memo) return t;
			let i = w(t), a;
			for (let o of n) {
				if (o._zod.def.when) {
					if (me(t) || !o._zod.def.when(t)) continue;
				} else if (i) continue;
				let n = t.issues.length, s = o._zod.check(t);
				if (s instanceof Promise && r?.async === !1) throw new P();
				if (a || s instanceof Promise) a = (a ?? Promise.resolve()).then(async () => {
					await s, t.issues.length !== n && (D(t.issues, n, e), i ||= w(t, n));
				});
				else {
					if (t.issues.length === n) continue;
					D(t.issues, n, e), i ||= w(t, n);
				}
			}
			return a ? a.then(() => t) : t;
		}, n = (n, r, a) => {
			if (w(n)) return n.aborted = !0, n;
			let o = t(r, i, a);
			if (o instanceof Promise) {
				if (a.async === !1) throw new P();
				return o.then((t) => e._zod.parse(t, a));
			}
			return e._zod.parse(o, a);
		};
		e._zod.run = (r, a) => {
			if (a.skipChecks) return e._zod.parse(r, a);
			if (a.direction === "backward") {
				let t = e._zod.parse({
					value: r.value,
					issues: []
				}, {
					...a,
					skipChecks: !0
				});
				return t instanceof Promise ? t.then((e) => n(e, r, a)) : n(t, r, a);
			}
			let o = e._zod.parse(r, a);
			if (o instanceof Promise) {
				if (a.async === !1) throw new P();
				return o.then((e) => t(e, i, a));
			}
			return t(o, i, a);
		};
	}
}, {
	get "~standard"() {
		return be(this, "~standard", Xe(this));
	},
	set "~standard"(e) {
		k(this, "~standard", e);
	}
}), Je = (e, t) => e.issues.length ? { issues: e.issues.map((e) => O(e, t, I())) } : { value: e.value };
async function Ye(e, t) {
	let n = { async: !0 };
	return Je(await e._zod.run({
		value: t,
		issues: []
	}, n), n);
}
function Xe(e) {
	return {
		validate: (t) => {
			let n = { async: !1 };
			try {
				let r = e._zod.run({
					value: t,
					issues: []
				}, n);
				if (!(r instanceof Promise)) return Je(r, n);
			} catch {}
			return Ye(e, t);
		},
		vendor: "zod",
		version: 1
	};
}
var Ze = /*@__PURE__*/ N("$ZodString", (e, t) => {
	B.init(e, t), e._zod.pattern = t.pattern ?? Re, e._zod.parse = (n, r) => {
		if (t.coerce) try {
			n.value = String(n.value);
		} catch {}
		return typeof n.value == "string" || n.issues.push({
			expected: "string",
			code: "invalid_type",
			input: n.value,
			inst: e
		}), n;
	};
}), Qe = /*@__PURE__*/ N("$ZodNumber", (e, t) => {
	B.init(e, t), e._zod.pattern = ze, e._zod.parse = (n, r) => {
		if (t.coerce) try {
			n.value = Number(n.value);
		} catch {}
		let i = n.value;
		if (typeof i == "number" && !Number.isNaN(i) && Number.isFinite(i)) return n;
		let a = typeof i == "number" ? Number.isNaN(i) ? "NaN" : Number.isFinite(i) ? void 0 : String(i) : void 0;
		return n.issues.push({
			expected: "number",
			code: "invalid_type",
			input: i,
			inst: e,
			...a ? { received: a } : {}
		}), n;
	};
}), $e = /*@__PURE__*/ N("$ZodBoolean", (e, t) => {
	B.init(e, t), e._zod.pattern = Be, e._zod.parse = (n, r) => {
		if (t.coerce) try {
			n.value = !!n.value;
		} catch {}
		let i = n.value;
		return typeof i == "boolean" || n.issues.push({
			expected: "boolean",
			code: "invalid_type",
			input: i,
			inst: e
		}), n;
	};
}), et = /*@__PURE__*/ N("$ZodNever", (e, t) => {
	B.init(e, t), e._zod.parse = (t, n) => (t.issues.push({
		expected: "never",
		code: "invalid_type",
		input: t.value,
		inst: e
	}), t);
});
function tt(e, t) {
	let n = he(e._zod.def.checks);
	if (!n.length) return;
	let r = Math.min(...n.map((e) => e[0])), i = e._zod.parse;
	e._zod.parse = (n, a) => {
		let o = t(n.value);
		if (o > r && !a?.skipChecks && a?.direction !== "backward") {
			for (let [t, r] of he(e._zod.def.checks)) if (o > t && r._zod.def.when(n)) {
				let t = n.issues.length;
				return r._zod.check(n), n.issues[t].continue = !1, D(n.issues, t, e), n;
			}
		}
		return i(n, a);
	};
}
var nt = (e) => Array.isArray(e) ? e.length : -1;
function rt(e, t, n) {
	e.issues.length && t.issues.push(...T(n, e.issues)), t.value[n] = e.value;
}
var it = /*@__PURE__*/ N("$ZodArray", (e, t) => {
	B.init(e, t);
	let n = F.memoizer;
	n?.attach(e), e._zod.parse = (r, i) => {
		let a = r.value;
		if (!Array.isArray(a)) return r.issues.push({
			expected: "array",
			code: "invalid_type",
			input: a,
			inst: e
		}), r;
		r.value = n ? n.alloc(e, r, Array(a.length), i) : Array(a.length);
		let o = [], s = i?.abortEarly;
		for (let e = 0; e < a.length; e++) {
			let n = a[e], c = t.element._zod.run({
				value: n,
				issues: []
			}, i);
			if (c instanceof Promise) o.push(c.then((t) => rt(t, r, e)));
			else if (rt(c, r, e), s && c.issues.length !== 0 && w(c)) break;
		}
		return o.length ? Promise.all(o).then(() => r) : r;
	}, tt(e, nt);
});
function V(e, t, n, r, i, a) {
	let o = n in r, s = a === "optional";
	if (o || !s || i !== "optional") {
		if (e.issues.length) {
			if (i !== void 0 && s && !o) return;
			t.issues.push(...T(n, e.issues));
		}
		!o && i === void 0 ? e.issues.length || t.issues.push({
			code: "invalid_type",
			expected: "nonoptional",
			input: void 0,
			path: [n]
		}) : e.value === void 0 ? (o || i === "defaulted" && !s) && (t.value[n] = void 0) : t.value[n] = e.value;
	}
}
var at = [];
function ot(e) {
	let t = Object.keys(e.shape), n = Object.getOwnPropertySymbols(e.shape), r = n.length ? n : at, i = r.length ? [...t, ...r] : t;
	for (let t of i) if (!e.shape?.[t]?._zod?.traits?.has("$ZodType")) throw Error(`Invalid element at key "${String(t)}": expected a Zod schema`);
	let a = de(e.shape);
	return {
		...e,
		allKeys: i,
		symbolKeys: r,
		keySet: new Set(t),
		numKeys: t.length,
		optionalKeys: new Set(a)
	};
}
function st(e, t, n, r, i, a, o) {
	let s = [], c = i.keySet, l = i.catchall._zod, u = l.def.type, d = l.optin, f = l.optout, p = 0;
	for (let i in t) {
		if (o && n.issues.length !== p) {
			if (w(n, p)) break;
			p = n.issues.length;
		}
		if (c.has(i)) continue;
		if (i === "__proto__") {
			u === "never" && s.push(i);
			continue;
		}
		if (u === "never") {
			s.push(i);
			continue;
		}
		let a = l.run({
			value: t[i],
			issues: []
		}, r);
		a instanceof Promise ? e.push(a.then((e) => V(e, n, i, t, d, f))) : V(a, n, i, t, d, f);
	}
	return s.length && n.issues.push({
		code: "unrecognized_keys",
		keys: s,
		input: t,
		inst: a,
		continue: !0
	}), e.length ? Promise.all(e).then(() => n) : n;
}
var ct = /*@__PURE__*/ N("$ZodObject", (e, t) => {
	B.init(e, t);
	let n = Object.getOwnPropertyDescriptor(t, "shape"), r = n?.get ? n.get.raw : t.shape ?? {};
	if (r) {
		let e = () => {
			let n = { ...r };
			return Object.defineProperty(t, "shape", { value: n }), e.raw = n, n;
		};
		e.raw = r, Object.defineProperty(t, "shape", { get: e });
	}
	let i = _(() => ot(t));
	M(e, "propValues", (e) => {
		let t = e.def.shape, n = {};
		for (let e in t) {
			let r = t[e]._zod;
			if (r.values) {
				Object.prototype.hasOwnProperty.call(n, e) || y(n, e, /* @__PURE__ */ new Set());
				for (let t of r.values) n[e].add(t);
				r.optin !== void 0 && n[e].add(void 0);
			}
		}
		return n;
	});
	let a = x, o = t.catchall, s, c = F.memoizer;
	c?.attach(e), e._zod.parse = (t, n) => {
		s ??= i.value;
		let r = t.value;
		if (!a(r)) return t.issues.push({
			expected: "object",
			code: "invalid_type",
			input: r,
			inst: e
		}), t;
		t.value = c ? c.alloc(e, t, {}, n) : {};
		let l = [], u = s.shape, d = n?.abortEarly, f = t.issues.length;
		for (let e of s.allKeys) {
			if (d && t.issues.length !== f) {
				if (w(t, f)) break;
				f = t.issues.length;
			}
			if (e === "__proto__") continue;
			let i = u[e], a = i._zod.optin, o = i._zod.optout, s = i._zod.run({
				value: r[e],
				issues: []
			}, n);
			s instanceof Promise ? l.push(s.then((n) => V(n, t, e, r, a, o))) : V(s, t, e, r, a, o);
		}
		return o ? st(l, r, t, n, i.value, e, d === !0) : l.length ? Promise.all(l).then(() => t) : t;
	};
});
function lt(e, t, n, r) {
	for (let n of e) if (n.issues.length === 0) return t.value = n.value, t;
	let i = e.filter((e) => !w(e));
	return i.length === 1 ? (t.value = i[0].value, i[0]) : (t.issues.push({
		code: "invalid_union",
		input: t.value,
		inst: n,
		errors: e.map((e) => e.issues.map((e) => O(e, r, I())))
	}), t);
}
var ut = /*@__PURE__*/ N("$ZodUnion", (e, t) => {
	B.init(e, t), M(e, "optin", (e) => e.def.options.some((e) => e._zod.optin === "defaulted") ? "defaulted" : e.def.options.some((e) => e._zod.optin !== void 0) ? "optional" : void 0), M(e, "optout", (e) => e.def.options.some((e) => e._zod.optout === "optional") ? "optional" : void 0), M(e, "values", (e) => {
		if (e.def.options.every((e) => e._zod.values)) return new Set(e.def.options.flatMap((e) => Array.from(e._zod.values)));
	}), M(e, "pattern", (e) => {
		if (e.def.options.every((e) => e._zod.pattern)) {
			let t = e.def.options.map((e) => e._zod.pattern);
			return RegExp(`^(${t.map((e) => v(e.source)).join("|")})$`);
		}
	});
	let n = t.options.length === 1 ? t.options[0]._zod.run : null;
	e._zod.parse = (r, i) => {
		if (n) return n(r, i);
		let a = !1, o = [];
		for (let e of t.options) {
			let t = e._zod.run({
				value: r.value,
				issues: []
			}, i);
			if (t instanceof Promise) o.push(t), a = !0;
			else {
				if (t.issues.length === 0) return t;
				o.push(t);
			}
		}
		return a ? Promise.all(o).then((t) => lt(t, r, e, i)) : lt(o, r, e, i);
	};
});
function dt(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e.options) {
		let r = n._zod.propValues?.[e.discriminator];
		if (!r || r.size === 0) throw Error(`Invalid discriminated union option at index "${e.options.indexOf(n)}"`);
		for (let e of r) if (t.has(e)) {
			if (e !== void 0) throw Error(`Duplicate discriminator value "${String(e)}"`);
			t.set(e, null);
		} else t.set(e, n);
	}
	return t;
}
var ft = /*@__PURE__*/ N("$ZodDiscriminatedUnion", (e, t) => {
	t.inclusive = !1, ut.init(e, t);
	let n = e._zod.parse;
	M(e, "propValues", (e) => {
		let t = {}, n = 0;
		for (let r of e.def.options) {
			let i = r._zod.propValues;
			if (!i || Object.keys(i).length === 0) throw Error(`Invalid discriminated union option at index "${e.def.options.indexOf(r)}"`);
			i[e.def.discriminator]?.has(void 0) && n++;
			for (let [e, n] of Object.entries(i)) {
				Object.prototype.hasOwnProperty.call(t, e) || y(t, e, /* @__PURE__ */ new Set());
				for (let r of n) t[e].add(r);
			}
		}
		return !e.def.unionFallback && n > 1 && t[e.def.discriminator]?.delete(void 0), t;
	}), t.options.forEach((e, n) => {
		let r = te(e._zod.def);
		if (r && !Object.prototype.hasOwnProperty.call(r, t.discriminator)) throw Error(`Invalid discriminated union option at index "${n}"`);
	});
	let r = _(() => dt(t));
	e._zod.parse = (i, a) => {
		let o = i.value;
		if (!x(o)) return i.issues.push({
			code: "invalid_type",
			expected: "object",
			input: o,
			inst: e
		}), i;
		let s = o?.[t.discriminator], c = r.value.get(s);
		return c && (s !== void 0 || a.direction !== "backward") ? c._zod.run(i, a) : t.unionFallback || a.direction === "backward" ? n(i, a) : (i.issues.push({
			code: "invalid_union",
			errors: [],
			note: "No matching discriminator",
			discriminator: t.discriminator,
			options: Array.from(r.value.keys()).filter((e) => r.value.get(e) !== null),
			input: o,
			path: [t.discriminator],
			inst: e
		}), i);
	};
}), pt = /*@__PURE__*/ N("$ZodRecord", (e, t) => {
	B.init(e, t);
	let n = F.memoizer;
	n?.attach(e), e._zod.parse = (r, i) => {
		let a = r.value;
		if (!ce(a)) return r.issues.push({
			expected: "record",
			code: "invalid_type",
			input: a,
			inst: e
		}), r;
		let o = [], s = t.keyType._zod.values;
		if (s && !t.partial) {
			r.value = n ? n.alloc(e, r, {}, i) : {};
			let c = /* @__PURE__ */ new Set();
			for (let n of s) if (typeof n == "string" || typeof n == "number" || typeof n == "symbol") {
				if (c.add(typeof n == "number" ? n.toString() : n), n === "__proto__") continue;
				let s = t.keyType._zod.run({
					value: n,
					issues: []
				}, i);
				if (s instanceof Promise) throw Error("Async schemas not supported in object keys currently");
				if (s.issues.length) {
					r.issues.push({
						code: "invalid_key",
						origin: "record",
						issues: s.issues.map((e) => O(e, i, I())),
						input: n,
						path: [n],
						inst: e
					});
					continue;
				}
				let l = s.value;
				if (l === "__proto__") continue;
				let u = t.valueType._zod.run({
					value: a[n],
					issues: []
				}, i);
				u instanceof Promise ? o.push(u.then((e) => {
					e.issues.length && r.issues.push(...T(n, e.issues)), r.value[l] = e.value;
				})) : (u.issues.length && r.issues.push(...T(n, u.issues)), r.value[l] = u.value);
			}
			let l;
			for (let e in a) if (!c.has(e)) {
				if (t.mode === "loose") {
					if (e === "__proto__") continue;
					r.value[e] = a[e];
				} else l ??= [], l.push(e);
			}
			l && l.length > 0 && r.issues.push({
				code: "unrecognized_keys",
				input: a,
				inst: e,
				keys: l,
				continue: !0
			});
		} else {
			r.value = n ? n.alloc(e, r, {}, i) : {};
			let c;
			for (let n of Reflect.ownKeys(a)) {
				if (n === "__proto__" || !Object.prototype.propertyIsEnumerable.call(a, n)) continue;
				let l = t.keyType._zod.run({
					value: n,
					issues: []
				}, i);
				if (l instanceof Promise) throw Error("Async schemas not supported in object keys currently");
				if (typeof n == "string" && ze.test(n) && l.issues.length) {
					let e = t.keyType._zod.run({
						value: Number(n),
						issues: []
					}, i);
					if (e instanceof Promise) throw Error("Async schemas not supported in object keys currently");
					e.issues.length === 0 && (l = e);
				}
				if (l.issues.length) {
					t.mode === "loose" ? r.value[n] = a[n] : s ? (c ??= [], c.push(n)) : r.issues.push({
						code: "invalid_key",
						origin: "record",
						issues: l.issues.map((e) => O(e, i, I())),
						input: n,
						path: [n],
						inst: e
					});
					continue;
				}
				let u = l.value;
				if (u === "__proto__") continue;
				let d = t.valueType._zod.run({
					value: a[n],
					issues: []
				}, i);
				d instanceof Promise ? o.push(d.then((e) => {
					e.issues.length && r.issues.push(...T(n, e.issues)), r.value[u] = e.value;
				})) : (d.issues.length && r.issues.push(...T(n, d.issues)), r.value[u] = d.value);
			}
			c && c.length > 0 && r.issues.push({
				code: "unrecognized_keys",
				input: a,
				inst: e,
				keys: c,
				continue: !0
			});
		}
		return o.length ? Promise.all(o).then(() => r) : r;
	};
}), mt = /*@__PURE__*/ N("$ZodEnum", (e, t) => {
	B.init(e, t);
	let n = m(t.entries), r = new Set(n);
	e._zod.values = r, M(e, "pattern", (e) => {
		let t = m(e.def.entries).filter((e) => le.has(typeof e));
		return RegExp(t.length ? `^(${t.map((e) => S(e.toString())).join("|")})$` : "^[^\\s\\S]$");
	}), e._zod.parse = (t, i) => {
		let a = t.value;
		return r.has(a) || t.issues.push({
			code: "invalid_value",
			values: n,
			input: a,
			inst: e
		}), t;
	};
}), ht = /*@__PURE__*/ N("$ZodLiteral", (e, t) => {
	B.init(e, t);
	let n = new Set(t.values);
	e._zod.values = n, M(e, "pattern", (e) => {
		let t = e.def.values;
		return RegExp(t.length ? `^(${t.map((e) => typeof e == "string" ? S(e) : e ? S(e.toString()) : String(e)).join("|")})$` : "^[^\\s\\S]$");
	}), e._zod.parse = (r, i) => {
		let a = r.value;
		return n.has(a) || r.issues.push({
			code: "invalid_value",
			values: t.values,
			input: a,
			inst: e
		}), r;
	};
});
function gt(e, t) {
	return e.value = t.issues.length ? void 0 : t.value, e;
}
var _t = /*@__PURE__*/ N("$ZodOptional", (e, t) => {
	B.init(e, t), M(e, "optin", (e) => e.def.innerType._zod.optin === "defaulted" ? "defaulted" : "optional"), e._zod.optout = "optional", M(e, "values", (e) => {
		let t = e.def.innerType._zod.values;
		return t ? /* @__PURE__ */ new Set([...t, void 0]) : void 0;
	}), M(e, "pattern", (e) => {
		let t = e.def.innerType._zod.pattern;
		return t ? RegExp(`^(${v(t.source)})?$`) : void 0;
	}), e._zod.parse = (e, n) => {
		if (e.value === void 0) {
			if (t.innerType._zod.optin !== "defaulted") return e;
			let r = t.innerType._zod.run({
				value: e.value,
				issues: []
			}, n);
			return r instanceof Promise ? r.then((t) => gt(e, t)) : gt(e, r);
		}
		return t.innerType._zod.run(e, n);
	};
}), vt = /*@__PURE__*/ N("$ZodNullable", (e, t) => {
	B.init(e, t), M(e, "optin", (e) => e.def.innerType._zod.optin), M(e, "optout", (e) => e.def.innerType._zod.optout), M(e, "pattern", (e) => {
		let t = e.def.innerType._zod.pattern;
		return t ? RegExp(`^(${v(t.source)}|null)$`) : void 0;
	}), M(e, "values", (e) => e.def.innerType._zod.values ? /* @__PURE__ */ new Set([...e.def.innerType._zod.values, null]) : void 0), e._zod.parse = (e, n) => e.value === null ? e : t.innerType._zod.run(e, n);
});
// node_modules/zod/v4/core/api.js
function yt(e) {
	return e.checks &&= [...e.checks], e;
}
// @__NO_SIDE_EFFECTS__
function bt(e, t) {
	return new e(yt({
		type: "string",
		...C(t)
	}));
}
// @__NO_SIDE_EFFECTS__
function xt(e, t) {
	return new e(yt({
		type: "number",
		checks: [],
		...C(t)
	}));
}
// @__NO_SIDE_EFFECTS__
function St(e, t) {
	return new e({
		type: "boolean",
		...C(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Ct(e, t) {
	return new e({
		type: "never",
		...C(t)
	});
}
// @__NO_SIDE_EFFECTS__
function wt(e, t) {
	return new He({
		check: "max_length",
		...C(t),
		maximum: e
	});
}
// @__NO_SIDE_EFFECTS__
function H(e, t) {
	return new Ue({
		check: "min_length",
		...C(t),
		minimum: e
	});
}
// @__NO_SIDE_EFFECTS__
function Tt(e, t) {
	return new Ge({
		check: "string_format",
		format: "regex",
		...C(t),
		pattern: e
	});
}
// @__NO_SIDE_EFFECTS__
function Et(e, t) {
	return new Ke({
		check: "string_format",
		format: "starts_with",
		...C(t),
		prefix: e
	});
}
// node_modules/zod/v4/mini/schemas.js
var U = /*@__PURE__*/ N("ZodMiniType", (e, t) => {
	if (!e._zod) throw Error("Uninitialized schema in ZodMiniType.");
	B.init(e, t), e.def = t, e.type = t.type;
}, {
	get with() {
		return this.check;
	},
	set with(e) {
		k(this, "with", e);
	},
	parse(e, t) {
		return Ne(this, e, t, { callee: this.parse });
	},
	parseAsync(e, t) {
		return Pe(this, e, t, { callee: this.parseAsync });
	},
	safeParse(e, t) {
		return Fe(this, e, t);
	},
	safeParseAsync(e, t) {
		return Le(this, e, t);
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
	clone(e, t) {
		return ue(this, e, t);
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
}), Dt = /*@__PURE__*/ N("ZodMiniString", (e, t) => {
	Ze.init(e, t), U.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function W(e) {
	return /* @__PURE__ */ bt(Dt, e);
}
var Ot = /*@__PURE__*/ N("ZodMiniNumber", (e, t) => {
	Qe.init(e, t), U.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function G(e) {
	return /* @__PURE__ */ xt(Ot, e);
}
var kt = /*@__PURE__*/ N("ZodMiniBoolean", (e, t) => {
	$e.init(e, t), U.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function K(e) {
	return /* @__PURE__ */ St(kt, e);
}
var At = /*@__PURE__*/ N("ZodMiniNever", (e, t) => {
	et.init(e, t), U.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function jt(e) {
	return /* @__PURE__ */ Ct(At, e);
}
var Mt = /*@__PURE__*/ N("ZodMiniArray", (e, t) => {
	it.init(e, t), U.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function q(e, t) {
	return new Mt({
		type: "array",
		element: e,
		...C(t)
	});
}
var Nt = /*@__PURE__*/ N("ZodMiniObject", (e, t) => {
	ct.init(e, t), U.init(e, t), we(e, "shape", (e) => e._zod.def.shape, !1);
});
// @__NO_SIDE_EFFECTS__
function J(e, t) {
	return new Nt({
		type: "object",
		shape: e ?? {},
		...C(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Pt(e, t) {
	return fe(e, t);
}
var Ft = /*@__PURE__*/ N("ZodMiniUnion", (e, t) => {
	ut.init(e, t), U.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function It(e, t) {
	return new Ft({
		type: "union",
		options: e,
		...C(t)
	});
}
var Lt = /*@__PURE__*/ N("ZodMiniDiscriminatedUnion", (e, t) => {
	ft.init(e, t), U.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function Rt(e, t, n) {
	return new Lt({
		type: "union",
		options: t,
		discriminator: e,
		...C(n)
	});
}
var zt = /*@__PURE__*/ N("ZodMiniRecord", (e, t) => {
	pt.init(e, t), U.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function Bt(e, t, n) {
	return !t || !t._zod ? new zt({
		type: "record",
		keyType: /* @__PURE__ */ W(),
		valueType: e,
		...C(t)
	}) : new zt({
		type: "record",
		keyType: e,
		valueType: t,
		...C(n)
	});
}
var Vt = /*@__PURE__*/ N("ZodMiniEnum", (e, t) => {
	mt.init(e, t), U.init(e, t), e.options = [...e._zod.values];
});
// @__NO_SIDE_EFFECTS__
function Ht(e, t) {
	return new Vt({
		type: "enum",
		entries: Array.isArray(e) ? Object.fromEntries(e.map((e) => [e, e])) : e,
		...C(t)
	});
}
var Ut = /*@__PURE__*/ N("ZodMiniLiteral", (e, t) => {
	ht.init(e, t), U.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function Y(e, t) {
	return new Ut({
		type: "literal",
		values: Array.isArray(e) ? e : [e],
		...C(t)
	});
}
var Wt = /*@__PURE__*/ N("ZodMiniOptional", (e, t) => {
	_t.init(e, t), U.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function X(e) {
	return new Wt({
		type: "optional",
		innerType: e
	});
}
var Gt = /*@__PURE__*/ N("ZodMiniNullable", (e, t) => {
	vt.init(e, t), U.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function Z(e) {
	return new Gt({
		type: "nullable",
		innerType: e
	});
}
var Kt = /* @__PURE__ */ It([/* @__PURE__ */ J({
	ok: /* @__PURE__ */ Y(!0),
	id: /* @__PURE__ */ G(),
	thread: /* @__PURE__ */ W()
}), /* @__PURE__ */ J({
	ok: /* @__PURE__ */ Y(!1),
	error: /* @__PURE__ */ W()
})]), qt = /* @__PURE__ */ J({
	ok: /* @__PURE__ */ K(),
	name: /* @__PURE__ */ X(/* @__PURE__ */ W()),
	error: /* @__PURE__ */ X(/* @__PURE__ */ W()),
	every: /* @__PURE__ */ X(/* @__PURE__ */ Z(/* @__PURE__ */ W())),
	cron: /* @__PURE__ */ X(/* @__PURE__ */ Z(/* @__PURE__ */ W())),
	timezone: /* @__PURE__ */ X(/* @__PURE__ */ W()),
	next_at: /* @__PURE__ */ X(/* @__PURE__ */ W())
}), Jt = /* @__PURE__ */ J({
	id: /* @__PURE__ */ W(),
	name: /* @__PURE__ */ W(),
	type: /* @__PURE__ */ W(),
	size: /* @__PURE__ */ G(),
	author: /* @__PURE__ */ W(),
	ts: /* @__PURE__ */ G(),
	embed: /* @__PURE__ */ X(/* @__PURE__ */ K())
}), Yt = /* @__PURE__ */ Pt(Jt, { reminder: /* @__PURE__ */ X(qt) }), Xt = /* @__PURE__ */ J({ error: /* @__PURE__ */ W() }), Zt = [
	"blue",
	"green",
	"yellow",
	"orange",
	"pink",
	"purple"
], Qt = /* @__PURE__ */ J({
	endpoint: (/* @__PURE__ */ W()).check(/* @__PURE__ */ Et("https://"), /* @__PURE__ */ wt(1e3)),
	p256dh: (/* @__PURE__ */ W()).check(/* @__PURE__ */ H(1)),
	auth: (/* @__PURE__ */ W()).check(/* @__PURE__ */ H(1))
});
(/* @__PURE__ */ W()).check(/* @__PURE__ */ H(1)), (/* @__PURE__ */ W()).check(/* @__PURE__ */ Et("m"));
var $t = /* @__PURE__ */ J({ ok: /* @__PURE__ */ Y(!0) }), en = /* @__PURE__ */ J({ key: /* @__PURE__ */ Z(/* @__PURE__ */ W()) }), tn = /* @__PURE__ */ J({
	ok: /* @__PURE__ */ Y(!0),
	sent: /* @__PURE__ */ G()
}), nn = /* @__PURE__ */ J({ books: /* @__PURE__ */ q(/* @__PURE__ */ J({
	id: /* @__PURE__ */ W(),
	title: /* @__PURE__ */ W(),
	folder: /* @__PURE__ */ Z(/* @__PURE__ */ W()),
	summary: /* @__PURE__ */ Z(/* @__PURE__ */ W()),
	updated_at: /* @__PURE__ */ G(),
	archived_at: /* @__PURE__ */ G(),
	members: /* @__PURE__ */ Z(/* @__PURE__ */ W())
})) }), rn = /* @__PURE__ */ J({
	rooms: /* @__PURE__ */ G(),
	failed: /* @__PURE__ */ X(/* @__PURE__ */ G()),
	epics: /* @__PURE__ */ q(/* @__PURE__ */ J({
		id: /* @__PURE__ */ W(),
		title: /* @__PURE__ */ W(),
		archived: /* @__PURE__ */ K(),
		ts: /* @__PURE__ */ G(),
		room_id: /* @__PURE__ */ W(),
		room: /* @__PURE__ */ W()
	})),
	messages: /* @__PURE__ */ q(/* @__PURE__ */ J({
		id: /* @__PURE__ */ G(),
		thread: /* @__PURE__ */ W(),
		topic: /* @__PURE__ */ Z(/* @__PURE__ */ W()),
		author: /* @__PURE__ */ W(),
		by_agent: /* @__PURE__ */ K(),
		via: /* @__PURE__ */ Z(/* @__PURE__ */ W()),
		ts: /* @__PURE__ */ G(),
		files: /* @__PURE__ */ q(/* @__PURE__ */ J({
			id: /* @__PURE__ */ W(),
			name: /* @__PURE__ */ W()
		})),
		snippet: /* @__PURE__ */ W(),
		room_id: /* @__PURE__ */ W(),
		room: /* @__PURE__ */ W()
	}))
}), an = /* @__PURE__ */ J({
	ok: /* @__PURE__ */ Y(!0),
	member: /* @__PURE__ */ X(/* @__PURE__ */ Y(!0))
}), on = /* @__PURE__ */ J({
	id: /* @__PURE__ */ W(),
	invited: /* @__PURE__ */ q(/* @__PURE__ */ W()),
	unknown: /* @__PURE__ */ q(/* @__PURE__ */ W()),
	cost: /* @__PURE__ */ G()
}), sn = /* @__PURE__ */ J({
	book_id: /* @__PURE__ */ W(),
	book_title: /* @__PURE__ */ W(),
	epic_id: /* @__PURE__ */ Z(/* @__PURE__ */ W()),
	epic_title: /* @__PURE__ */ Z(/* @__PURE__ */ W())
}), cn = /* @__PURE__ */ J({
	pick: /* @__PURE__ */ Z(sn),
	reason: /* @__PURE__ */ X(/* @__PURE__ */ W()),
	alternatives: /* @__PURE__ */ q(sn),
	new_room_title: /* @__PURE__ */ W(),
	cost: /* @__PURE__ */ G()
}), Q = /* @__PURE__ */ Z(/* @__PURE__ */ G()), $ = /* @__PURE__ */ Z(/* @__PURE__ */ W()), ln = /* @__PURE__ */ Pt(/* @__PURE__ */ J({
	email: /* @__PURE__ */ W(),
	name: $,
	avatar: Q,
	books: /* @__PURE__ */ q(/* @__PURE__ */ J({
		id: /* @__PURE__ */ W(),
		title: $,
		folder: $,
		summary: $,
		updated_at: Q,
		created_at: Q,
		icon: Q,
		busy_until: Q,
		position: Q,
		tint: $,
		opened_at: Q,
		last_human_id: /* @__PURE__ */ G(),
		last_agent_id: /* @__PURE__ */ G(),
		read_id: /* @__PURE__ */ G(),
		sandboxes_running: /* @__PURE__ */ G(),
		members: $
	})),
	friends: /* @__PURE__ */ q(/* @__PURE__ */ J({
		email: /* @__PURE__ */ W(),
		name: $,
		avatar: Q,
		joined: /* @__PURE__ */ G(),
		shared: /* @__PURE__ */ G()
	})),
	waits: /* @__PURE__ */ q(/* @__PURE__ */ J({
		book_id: /* @__PURE__ */ W(),
		room: /* @__PURE__ */ W(),
		ref: /* @__PURE__ */ W(),
		thread: /* @__PURE__ */ W(),
		topic: $,
		author: /* @__PURE__ */ W(),
		author_name: $,
		text: /* @__PURE__ */ W(),
		ts: /* @__PURE__ */ G()
	}))
}), {
	v: /* @__PURE__ */ W(),
	cached: /* @__PURE__ */ X(/* @__PURE__ */ Y(!0))
}), un = /* @__PURE__ */ J({
	ok: /* @__PURE__ */ Y(!0),
	icon: Q
}), dn = /* @__PURE__ */ J({
	providers: /* @__PURE__ */ J({
		google: /* @__PURE__ */ K(),
		github: /* @__PURE__ */ K(),
		email: /* @__PURE__ */ Y(!0)
	}),
	next: /* @__PURE__ */ W(),
	error: /* @__PURE__ */ Z(/* @__PURE__ */ Ht(["google", "github"]))
}), fn = /* @__PURE__ */ J({
	ok: /* @__PURE__ */ Y(!0),
	next: /* @__PURE__ */ W()
}), pn = /* @__PURE__ */ J({
	state: /* @__PURE__ */ Ht([
		"missing",
		"out",
		"ask",
		"asked",
		"member"
	]),
	title: /* @__PURE__ */ Z(/* @__PURE__ */ W()),
	email: /* @__PURE__ */ Z(/* @__PURE__ */ W())
}), mn = /* @__PURE__ */ J({
	agents: /* @__PURE__ */ q(/* @__PURE__ */ J({
		id: /* @__PURE__ */ W(),
		client: /* @__PURE__ */ W(),
		connected_at: /* @__PURE__ */ G(),
		used_at: /* @__PURE__ */ X(/* @__PURE__ */ Z(/* @__PURE__ */ G()))
	})),
	last_used: /* @__PURE__ */ Z(/* @__PURE__ */ G())
}), hn = /* @__PURE__ */ J({
	client_name: /* @__PURE__ */ W(),
	client_domain: /* @__PURE__ */ Z(/* @__PURE__ */ W()),
	redirect_host: /* @__PURE__ */ W(),
	redirect_is_loopback: /* @__PURE__ */ K(),
	scope: /* @__PURE__ */ q(/* @__PURE__ */ W()),
	email: /* @__PURE__ */ W(),
	handle: /* @__PURE__ */ W()
}), gn = /* @__PURE__ */ J({
	error: /* @__PURE__ */ W(),
	redirect_to: /* @__PURE__ */ X(/* @__PURE__ */ W())
}), _n = (e = "/", t) => p(e, t ? { fetch: t } : {}), vn = (e = "/", t) => p(e, t ? { fetch: t } : {});
export { Y as A, H as B, Zt as C, K as D, q as E, X as F, Bt as I, W as L, Z as M, G as N, Rt as O, J as P, It as R, on as S, Ht as T, Tt as V, Qt as _, mn as a, cn as b, hn as c, Xt as d, dn as f, en as g, Kt as h, an as i, jt as j, Pt as k, gn as l, $t as m, _n as n, nn as o, ln as p, pn as r, Jt as s, vn as t, fn as u, tn as v, Yt as w, rn as x, un as y, wt as z };
