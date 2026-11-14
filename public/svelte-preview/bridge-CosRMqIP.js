import { n as e } from "./rolldown-runtime-DfEuXgQw.js";
import { i as t, l as n } from "./tools-Tr0Xzge5.js";
import { $ as r, $n as i, $t as a, A as o, An as s, At as c, B as l, Bn as u, C as d, Cn as f, Ct as p, D as m, Dt as h, E as ee, En as te, Et as ne, F as re, Fn as ie, Ft as ae, G as oe, Gn as se, Gt as ce, H as le, Hn as ue, Ht as de, I as fe, In as pe, It as me, J as he, Jn as ge, Jt as _e, K as ve, Kn as ye, Kt as be, L as xe, Ln as Se, Lt as Ce, M as we, Mn as Te, Mt as Ee, N as De, Nn as Oe, Nt as ke, O as Ae, On as je, Ot as Me, P as Ne, Pn as g, Pt as Pe, Q as Fe, Qn as _, Qt as Ie, R as Le, Rn as Re, Rt as ze, S as Be, Sn as Ve, St as He, T as Ue, Tt as We, U as Ge, Un as Ke, Ut as qe, V as Je, Vn as Ye, Vt as Xe, W as Ze, Wn as Qe, Wt as $e, X as et, Xn as tt, Xt as nt, Y as rt, Yn as it, Yt as at, Z as ot, Zn as v, Zt as st, _ as ct, _n as lt, _t as ut, a as dt, an as ft, ar as pt, at as mt, b as ht, bn as gt, bt as _t, c as vt, cn as yt, cr as bt, ct as xt, d as St, dn as Ct, dt as wt, en as Tt, er as Et, et as Dt, f as Ot, fn as kt, ft as At, g as jt, gn as Mt, gt as Nt, h as Pt, hn as Ft, ht as It, i as Lt, in as Rt, ir as zt, it as Bt, j as Vt, jn as Ht, jt as Ut, k as Wt, kn as Gt, kt as Kt, l as qt, ln as Jt, lt as Yt, m as Xt, mn as Zt, mt as Qt, n as $t, nn as en, nr as tn, nt as nn, o as rn, on as an, or as on, ot as sn, p as cn, pn as ln, pt as un, q as dn, qn as fn, qt as pn, r as mn, rn as hn, rr as gn, rt as _n, s as vn, sn as yn, sr as bn, st as xn, t as Sn, tn as Cn, tr as wn, tt as Tn, u as En, un as Dn, ut as On, v as kn, vn as An, vt as jn, w as Mn, wt as Nn, x as Pn, xn as Fn, xt as In, y as Ln, yn as Rn, yt as zn, z as Bn, zn as Vn, zt as Hn } from "./api-DKmEofkD.js";
// node_modules/zod/v4/core/memoizer.js
var Un = class extends Error {
	constructor() {
		super("Cannot parse a reference cycle that closes through a transform"), this.name = "ZodCyclicError";
	}
}, Wn = "~memo", Gn = [];
function Kn(e) {
	return typeof e == "object" && !!e;
}
function qn(e) {
	return e.map((e) => e.path ? {
		...e,
		path: e.path.slice()
	} : { ...e });
}
var Jn = /*@__PURE__*/ new WeakMap(), y = 0, Yn = 1, Xn = 2;
function Zn(e, t, n) {
	let r = Jn.get(e);
	if (r !== void 0) return r ? Xn : y;
	if (t.has(e)) return Xn;
	t.add(e);
	let i = y, a = (e) => {
		if (i !== Xn && e?._zod) {
			let r = Zn(e, t, n);
			r > i && (i = r);
		}
	}, o = (e, r) => {
		let i = y;
		for (let a of Reflect.ownKeys(e)) {
			let o = Object.getOwnPropertyDescriptor(e, a);
			if (r && !o.enumerable) continue;
			let s = o.get ? Yn : o.value?._zod ? Zn(o.value, t, n) : y;
			s > i && (i = s);
		}
		return i;
	}, s = (e) => {
		e > i && (i = e);
	}, c = e._zod.def;
	switch (c.type) {
		case "object": {
			let e = zt(c);
			s(e ? o(e, !0) : Yn), a(c.catchall);
			break;
		}
		case "array":
			a(c.element);
			break;
		case "tuple":
			for (let e of c.items) a(e);
			a(c.rest);
			break;
		case "record":
		case "map":
			a(c.keyType), a(c.valueType);
			break;
		case "set":
			a(c.valueType);
			break;
		case "union":
			for (let e of c.options) a(e);
			break;
		case "intersection":
			a(c.left), a(c.right);
			break;
		case "optional":
		case "nullable":
		case "default":
		case "prefault":
		case "catch":
		case "readonly":
		case "nonoptional":
		case "promise":
		case "success":
			a(c.innerType);
			break;
		case "pipe":
			a(c.in), a(c.out);
			break;
		case "function":
			a(c.input), a(c.output);
			break;
		case "lazy": {
			let r = c._cachedInner ?? (n ? e._zod.innerType : void 0);
			s(r ? Zn(r, t, !1) : Yn);
			break;
		}
		case "template_literal":
		case "string":
		case "number":
		case "int":
		case "boolean":
		case "bigint":
		case "symbol":
		case "undefined":
		case "null":
		case "void":
		case "never":
		case "any":
		case "unknown":
		case "date":
		case "nan":
		case "enum":
		case "literal":
		case "file":
		case "transform":
		case "custom": break;
		default: for (let e in c) {
			let t = Object.getOwnPropertyDescriptor(c, e);
			if (!t || t.get) continue;
			let n = t.value;
			if (n && typeof n == "object") {
				if (n._zod) a(n);
				else if (Array.isArray(n)) for (let e of n) a(e);
			}
		}
	}
	return t.delete(e), Qn(e, i);
}
function Qn(e, t) {
	return t !== Yn && Jn.set(e, t === Xn), t;
}
function $n(e, t) {
	let n = e.buckets.get(t);
	return n || (n = /* @__PURE__ */ new WeakMap(), e.buckets.set(t, n)), n;
}
var er, tr = [], nr = {
	alloc(e, t, n) {
		let r = er;
		if (!r) return n;
		er = void 0;
		let i = {
			value: n,
			issues: null
		};
		return r.set(t.value, i), tr.push(i), n;
	},
	guard(e) {
		var t;
		(t = e._zod).deferred ?? (t.deferred = []), e._zod.deferred.push(() => {
			let t = e._zod.parse, n = (e, n) => {
				if (n.direction !== "backward" && ir(n, e.value)) throw new Un();
				return t(e, n);
			};
			e._zod.parse = n, e._zod.run === t && (e._zod.run = n);
		});
	},
	attach(e) {
		var t;
		let n, r = !1, i, a;
		(t = e._zod).deferred ?? (t.deferred = []), e._zod.deferred.push(() => {
			let t = e._zod.parse, o = (s, c) => {
				if (n === void 0) {
					let i = Zn(e, /* @__PURE__ */ new Set(), !1);
					if (i === y) return e._zod.parse = t, e._zod.run === o && (e._zod.run = t), t(s, c);
					i === Xn || r ? n = !0 : r = !0;
				}
				let l = s.value;
				if (!Kn(l)) return t(s, c);
				let u = c[Wn];
				u || (u = {
					buckets: /* @__PURE__ */ new WeakMap(),
					backEdges: void 0
				}, c[Wn] = u);
				let d;
				i === c ? d = a : (d = $n(u, e), i = c, a = d);
				let f = d.get(l);
				if (f) return s.value = f.value, f.issues ? f.issues.length && s.issues.push(...qn(f.issues)) : (s.memo = !0, u.backEdges ?? (u.backEdges = /* @__PURE__ */ new WeakSet()), u.backEdges.add(f.value)), s;
				er = d;
				let p = tr.length, m = t(s, c);
				er = void 0;
				let h = tr.length > p ? tr.pop() : void 0;
				return m instanceof Promise ? m.then((e) => (h && (h.issues = e.issues.length ? qn(e.issues) : Gn), e)) : (h && (h.issues = m.issues.length ? qn(m.issues) : Gn), m);
			};
			e._zod.parse = o, e._zod.run === t && (e._zod.run = o);
		});
	}
};
function rr() {
	return nr;
}
function ir(e, t) {
	let n = e[Wn]?.backEdges;
	return n !== void 0 && Kn(t) && n.has(t);
}
// node_modules/zod/v4/locales/en.js
var ar = () => {
	let e = {
		string: {
			unit: "characters",
			verb: "to have"
		},
		file: {
			unit: "bytes",
			verb: "to have"
		},
		array: {
			unit: "items",
			verb: "to have"
		},
		set: {
			unit: "items",
			verb: "to have"
		},
		map: {
			unit: "entries",
			verb: "to have"
		}
	};
	function t(t) {
		return e[t] ?? null;
	}
	let n = {
		regex: "input",
		email: "email address",
		url: "URL",
		emoji: "emoji",
		uuid: "UUID",
		uuidv4: "UUIDv4",
		uuidv6: "UUIDv6",
		nanoid: "nanoid",
		guid: "GUID",
		cuid: "cuid",
		cuid2: "cuid2",
		ulid: "ULID",
		xid: "XID",
		ksuid: "KSUID",
		datetime: "ISO datetime",
		date: "ISO date",
		time: "ISO time",
		duration: "ISO duration",
		ipv4: "IPv4 address",
		ipv6: "IPv6 address",
		mac: "MAC address",
		cidrv4: "IPv4 range",
		cidrv6: "IPv6 range",
		base64: "base64-encoded string",
		base64url: "base64url-encoded string",
		json_string: "JSON string",
		e164: "E.164 number",
		currency_code: "currency code",
		credit_card: "credit card number",
		iban: "IBAN",
		jwt: "JWT",
		template_literal: "input"
	}, r = { nan: "NaN" };
	function i(e, t) {
		return e === "number" && typeof t == "number" && !Number.isFinite(t) ? String(t) : r[e] ?? e;
	}
	return (e) => {
		switch (e.code) {
			case "invalid_type": return `Invalid input: expected ${i(e.expected)}, received ${i(wn(e.input), e.input)}`;
			case "invalid_value": return e.values.length === 1 ? `Invalid input: expected ${bt(e.values[0])}` : `Invalid option: expected one of ${ge(e.values, "|")}`;
			case "too_big": {
				let n = e.exact ? "exactly " : e.inclusive ? "<=" : "<", r = t(e.origin);
				return r ? `Too big: expected ${e.origin ?? "value"} to have ${n}${e.maximum.toString()} ${r.unit ?? "elements"}` : `Too big: expected ${e.origin ?? "value"} to be ${n}${e.maximum.toString()}`;
			}
			case "too_small": {
				let n = e.exact ? "exactly " : e.inclusive ? ">=" : ">", r = t(e.origin);
				return r ? `Too small: expected ${e.origin} to have ${n}${e.minimum.toString()} ${r.unit}` : `Too small: expected ${e.origin} to be ${n}${e.minimum.toString()}`;
			}
			case "invalid_format": {
				let t = e;
				return t.format === "starts_with" ? `Invalid string: must start with "${t.prefix}"` : t.format === "ends_with" ? `Invalid string: must end with "${t.suffix}"` : t.format === "includes" ? `Invalid string: must include "${t.includes}"` : t.format === "regex" ? `Invalid string: must match pattern ${t.pattern}` : `Invalid ${n[t.format] ?? e.format}`;
			}
			case "not_multiple_of": return `Invalid number: must be a multiple of ${e.divisor}`;
			case "unrecognized_keys": return `Unrecognized key${e.keys.length > 1 ? "s" : ""}: ${ge(e.keys, ", ")}`;
			case "invalid_key": return `Invalid key in ${e.origin}`;
			case "invalid_union": return e.options && Array.isArray(e.options) && e.options.length > 0 ? `Invalid discriminator value. Expected ${e.options.map((e) => `'${e}'`).join(" | ")}` : e.inclusive === !1 ? "Invalid input: more than one option matched" : "Invalid input";
			case "invalid_element": return `Invalid value in ${e.origin}`;
			default: return "Invalid input";
		}
	};
};
function or() {
	return { localeError: ar() };
}
// node_modules/zod/v4/core/registries.js
var sr, cr = class {
	constructor() {
		this._map = /* @__PURE__ */ new WeakMap(), this._idmap = /* @__PURE__ */ new Map();
	}
	add(e, ...t) {
		let n = t[0];
		return this._map.set(e, n), n && typeof n == "object" && "id" in n && this._idmap.set(n.id, e), this;
	}
	clear() {
		return this._map = /* @__PURE__ */ new WeakMap(), this._idmap = /* @__PURE__ */ new Map(), this;
	}
	remove(e) {
		let t = this._map.get(e);
		return t && typeof t == "object" && "id" in t && this._idmap.delete(t.id), this._map.delete(e), this;
	}
	get(e) {
		let t = e._zod.parent;
		if (t) {
			let n = { ...this.get(t) ?? {} };
			delete n.id;
			let r = {
				...n,
				...this._map.get(e)
			};
			return Object.keys(r).length ? r : void 0;
		}
		return this._map.get(e);
	}
	has(e) {
		return this._map.has(e);
	}
};
function lr() {
	return new cr();
}
(sr = globalThis).__zod_globalRegistry ?? (sr.__zod_globalRegistry = lr());
var ur = globalThis.__zod_globalRegistry;
// node_modules/zod/v4/core/to-json-schema.js
function dr(e, ...t) {
	for (let n of t) for (let t of Reflect.ownKeys(n)) Object.prototype.propertyIsEnumerable.call(n, t) && Vn(e, t, n[t]);
	return e;
}
function fr(e) {
	let t = e?.target ?? "draft-2020-12";
	return t === "draft-4" && (t = "draft-04"), t === "draft-7" && (t = "draft-07"), {
		processors: e.processors ?? {},
		metadataRegistry: e?.metadata ?? ur,
		target: t,
		unrepresentable: e?.unrepresentable ?? "throw",
		override: e?.override ?? (() => {}),
		io: e?.io ?? "output",
		counter: 0,
		seen: /* @__PURE__ */ new Map(),
		sharedDefsExtractedFor: void 0,
		sharedEmitDoneFor: void 0,
		cycles: e?.cycles ?? "ref",
		reused: e?.reused ?? "inline",
		intersections: [],
		deferred: [],
		external: e?.external ?? void 0
	};
}
function b(e, t, n, r, i) {
	let a = typeof t.unrepresentable == "function" ? t.unrepresentable({
		zodSchema: e,
		path: r.path,
		message: i
	}) : t.unrepresentable;
	if (a === "any") return !1;
	if (a === void 0 || a === "throw") throw Error(i);
	return Object.assign(n, a), !0;
}
function x(e, t, n = {
	path: [],
	schemaPath: []
}) {
	var r;
	let i = e._zod.def, a = t.seen.get(e);
	if (a) return a.count++, n.schemaPath.includes(e) && (a.cycle = n.path), a.schema;
	let o = {
		schema: {},
		count: 1,
		cycle: void 0,
		path: n.path
	};
	t.seen.set(e, o), t.sharedDefsExtractedFor = void 0, t.sharedEmitDoneFor = void 0;
	let s = e._zod.toJSONSchema?.();
	if (s) o.schema = s;
	else {
		let r = {
			...n,
			schemaPath: [...n.schemaPath, e],
			path: n.path
		};
		if (e._zod.processJSONSchema) e._zod.processJSONSchema(t, o.schema, r);
		else {
			let n = o.schema, a = t.processors[i.type];
			if (!a) throw Error(`[toJSONSchema]: Non-representable type encountered: ${i.type}`);
			a(e, t, n, r);
		}
		let a = e._zod.parent;
		a && (o.ref ||= a, x(a, t, r), t.seen.get(a).isParent = !0);
	}
	let c = t.metadataRegistry.get(e);
	return c && dr(o.schema, c), t.io === "input" && S(e) && (delete o.schema.examples, delete o.schema.default), t.io === "input" && "_prefault" in o.schema && ((r = o.schema).default ?? (r.default = o.schema._prefault)), delete o.schema._prefault, t.seen.get(e).schema;
}
function pr(e) {
	return e.replace(/~/g, "~0").replace(/\//g, "~1");
}
function mr(e, t) {
	let n = e.seen.get(t);
	if (!n) throw Error("Unprocessed schema. This is a bug in Zod.");
	if (e.external && e.sharedDefsExtractedFor === e.external) return;
	let r = /* @__PURE__ */ new Map();
	for (let t of e.seen.entries()) {
		let n = e.metadataRegistry.get(t[0])?.id;
		if (n) {
			let e = r.get(n);
			if (e && e !== t[0]) throw Error(`Duplicate schema id "${n}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`);
			r.set(n, t[0]);
		}
	}
	let i = (t) => {
		let r = e.target === "draft-2020-12" ? "$defs" : "definitions";
		if (e.external) {
			let n = e.external.registry.get(t[0])?.id, i = e.external.uri ?? ((e) => e);
			if (n) return { ref: i(n) };
			let a = t[1].defId ?? t[1].schema.id ?? `schema${e.counter++}`;
			return t[1].defId = a, {
				defId: a,
				ref: `${i("__shared")}#/${r}/${pr(a)}`
			};
		}
		let i = `#/${r}/`;
		if (t[1] === n && !t[1].schema.id) return { ref: "#" };
		let a = t[1].schema.id ?? `__schema${e.counter++}`;
		return {
			defId: a,
			ref: i + pr(a)
		};
	}, a = (e) => {
		if (e[1].schema.$ref) return;
		let t = e[1], { ref: n, defId: r } = i(e);
		t.def = { ...t.schema }, r && (t.defId = r);
		let a = t.schema;
		for (let e in a) delete a[e];
		a.$ref = n;
	};
	if (e.cycles === "throw") for (let t of e.seen.entries()) {
		let e = t[1];
		if (e.cycle) throw Error(`Cycle detected: #/${e.cycle?.join("/")}/<root>

Set the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`);
	}
	for (let n of e.seen.entries()) {
		let r = n[1];
		if (t === n[0]) a(n);
		else {
			if (e.external) {
				let r = e.external.registry.get(n[0])?.id;
				if (t !== n[0] && r) {
					a(n);
					continue;
				}
			}
			(e.metadataRegistry.get(n[0])?.id || r.cycle || r.count > 1 && e.reused === "ref") && a(n);
		}
	}
	e.external && (e.sharedDefsExtractedFor = e.external);
}
function hr(e) {
	let t = e.anyOf;
	if (!Array.isArray(t) || t.length === 0 || e.type !== void 0) return;
	let n = [];
	for (let e of t) {
		if (!e || typeof e != "object") return;
		hr(e);
		let t = Object.keys(e);
		if (t.length !== 1 || t[0] !== "type") return;
		let r = e.type;
		for (let e of Array.isArray(r) ? r : [r]) {
			if (typeof e != "string") return;
			n.includes(e) || n.push(e);
		}
	}
	delete e.anyOf, e.type = n.length === 1 ? n[0] : n;
}
var gr = /* @__PURE__ */ new Set([
	"type",
	"properties",
	"required",
	"additionalProperties"
]), _r = ["oneOf", "anyOf"];
function vr(e) {
	let t = e.additionalProperties;
	return t === void 0 || t === !1 || typeof t != "object" || !t ? null : Object.keys(t).length ? t : null;
}
function yr(e) {
	let t = [];
	for (let n of e) {
		if (typeof n != "object" || n.type !== "object") return null;
		for (let e in n) if (!gr.has(e)) return null;
		t.push(n);
	}
	let n = {}, r = /* @__PURE__ */ new Set();
	for (let e of t) {
		for (let r in e.properties) {
			if (Object.prototype.hasOwnProperty.call(n, r)) continue;
			let e = [];
			for (let n of t) {
				let t = n.properties?.[r] ?? vr(n);
				t != null && (e.some((e) => JSON.stringify(e) === JSON.stringify(t)) || e.push(t));
			}
			let i = e.length === 1 ? e[0] : yr(e) ?? { allOf: e };
			Vn(n, r, i);
		}
		for (let t of e.required ?? []) r.add(t);
	}
	let i = {
		type: "object",
		properties: n
	};
	if (r.size && (i.required = [...r]), t.every((e) => e.additionalProperties === !1)) i.additionalProperties = !1;
	else {
		let e = [];
		for (let n of t) {
			let t = vr(n);
			t && !e.some((e) => JSON.stringify(e) === JSON.stringify(t)) && e.push(t);
		}
		e.length === 1 ? i.additionalProperties = e[0] : e.length > 1 && (i.additionalProperties = { allOf: e });
	}
	return i;
}
function br(e) {
	let t = e.allOf;
	if (!Array.isArray(t) || t.length < 2) return;
	for (let t of gr) if (t in e) return;
	let n = t.filter((e) => _r.some((t) => Array.isArray(e[t]))), r = null;
	if (!n.length) r = yr(t);
	else {
		let e = n[0], i = _r.find((t) => Array.isArray(e[t]));
		if (Object.keys(e).length !== 1) return;
		let a = t.filter((t) => t !== e), o = e[i].map((e) => yr([...a, e]));
		if (o.some((e) => !e)) return;
		r = { [i]: o };
	}
	r && (delete e.allOf, dr(e, r));
}
function xr(e, t) {
	let n = e.seen.get(t);
	if (!n) throw Error("Unprocessed schema. This is a bug in Zod.");
	let r = (t) => {
		let n = e.seen.get(t);
		if (n.ref === null) return;
		let i = n.def ?? n.schema, a = { ...i }, o = n.ref;
		if (n.ref = null, o) {
			r(o);
			let n = e.seen.get(o), s = n.schema;
			if (s.$ref && (e.target === "draft-07" || e.target === "draft-04" || e.target === "openapi-3.0") ? (i.allOf = i.allOf ?? [], i.allOf.push(s)) : dr(i, s), dr(i, a), t._zod.parent === o) for (let e in i) e !== "$ref" && e !== "allOf" && (e in a || delete i[e]);
			if (s.$ref && n.def) for (let e in i) e !== "$ref" && e !== "allOf" && e in n.def && JSON.stringify(i[e]) === JSON.stringify(n.def[e]) && delete i[e];
		}
		let s = t._zod.parent;
		if (s && s !== o) {
			r(s);
			let t = e.seen.get(s);
			if (t?.schema.$ref && (i.$ref = t.schema.$ref, t.def)) for (let e in i) e !== "$ref" && e !== "allOf" && e in t.def && JSON.stringify(i[e]) === JSON.stringify(t.def[e]) && delete i[e];
		}
		e.override({
			zodSchema: t,
			jsonSchema: i,
			path: n.path ?? []
		});
	};
	if (!e.external || e.sharedEmitDoneFor !== e.external) {
		for (let t of [...e.seen.entries()].reverse()) r(t[0]);
		if (e.target !== "openapi-3.0") for (let t of e.seen.entries()) hr(t[1].def ?? t[1].schema);
		for (let t of e.deferred) t();
		if (e.intersections.length) {
			let t = /* @__PURE__ */ new Map();
			for (let n of e.seen.values()) for (let e of [n.schema, n.def]) {
				let n = e?.allOf;
				if (!Array.isArray(n)) continue;
				let r = t.get(n);
				r ? r.push(e) : t.set(n, [e]);
			}
			for (let n of e.intersections) for (let e of t.get(n) ?? []) br(e);
		}
	}
	let i = {};
	if (e.target === "draft-2020-12" ? i.$schema = "https://json-schema.org/draft/2020-12/schema" : e.target === "draft-07" ? i.$schema = "http://json-schema.org/draft-07/schema#" : e.target === "draft-04" ? i.$schema = "http://json-schema.org/draft-04/schema#" : e.target, e.external?.uri) {
		let n = e.external.registry.get(t)?.id;
		if (!n) throw Error("Schema is missing an `id` property");
		i.$id = e.external.uri(n);
	}
	dr(i, n.defId ? n.schema : n.def ?? n.schema);
	let a = e.metadataRegistry.get(t)?.id;
	a !== void 0 && i.id === a && delete i.id;
	let o = e.external?.defs ?? {};
	if (!e.external || e.sharedEmitDoneFor !== e.external) for (let t of e.seen.entries()) {
		let e = t[1];
		e.def && e.defId && (e.def.id === e.defId && delete e.def.id, Vn(o, e.defId, e.def));
	}
	e.external && (e.sharedEmitDoneFor = e.external), e.external || Object.keys(o).length > 0 && (e.target === "draft-2020-12" ? i.$defs = o : i.definitions = o);
	try {
		let n = JSON.parse(JSON.stringify(i));
		return Object.defineProperty(n, "~standard", {
			value: {
				...t["~standard"],
				jsonSchema: {
					input: Cr(t, "input", e.processors),
					output: Cr(t, "output", e.processors)
				}
			},
			enumerable: !1,
			writable: !1
		}), n;
	} catch {
		throw Error("Error converting schema to JSON.");
	}
}
function S(e, t) {
	let n = t ?? { seen: /* @__PURE__ */ new Set() };
	if (n.seen.has(e)) return !1;
	n.seen.add(e);
	let r = e._zod.def;
	if (r.type === "transform") return !0;
	if (r.type === "array") return S(r.element, n);
	if (r.type === "set") return S(r.valueType, n);
	if (r.type === "lazy") return S(r.getter(), n);
	if (r.type === "promise" || r.type === "optional" || r.type === "nonoptional" || r.type === "nullable" || r.type === "readonly" || r.type === "default" || r.type === "prefault" || r.type === "catch") return S(r.innerType, n);
	if (r.type === "intersection") return S(r.left, n) || S(r.right, n);
	if (r.type === "record" || r.type === "map") return S(r.keyType, n) || S(r.valueType, n);
	if (r.type === "pipe") return e._zod.traits.has("$ZodCodec") ? !0 : S(r.in, n) || S(r.out, n);
	if (r.type === "object") {
		for (let e in r.shape) if (S(r.shape[e], n)) return !0;
		return !1;
	}
	if (r.type === "union") {
		for (let e of r.options) if (S(e, n)) return !0;
		return !1;
	}
	if (r.type === "tuple") {
		for (let e of r.items) if (S(e, n)) return !0;
		return !!(r.rest && S(r.rest, n));
	}
	return !1;
}
var Sr = (e, t = {}) => (n) => {
	let r = fr({
		...n,
		processors: t
	});
	return x(e, r), mr(r, e), xr(r, e);
}, Cr = (e, t, n = {}) => (r) => {
	let { libraryOptions: i, target: a } = r ?? {}, o = fr({
		...i ?? {},
		target: a,
		io: t,
		processors: n
	});
	return x(e, o), mr(o, e), xr(o, e);
}, C = (e, t, n) => {
	(e[t] === void 0 || n > e[t]) && (e[t] = n);
}, w = (e, t, n) => {
	(e[t] === void 0 || n < e[t]) && (e[t] = n);
}, wr = (e, t) => {
	C(e, "minimum", t), w(e, "maximum", t);
}, Tr = (e, t) => {
	e.multipleOf ??= [], e.multipleOf.includes(t) || e.multipleOf.push(t);
}, Er = (e, t) => {
	e.patterns ??= /* @__PURE__ */ new Set(), e.patterns.add(t);
}, Dr = (e, t) => {
	e.mime = e.mime ? e.mime.filter((e) => t.includes(e)) : [...t];
}, Or = (e, t) => {
	e.format = t, t.includes("int") && (e.isInt = !0);
}, kr = (e, t) => C(e, "minimum", t.minimum), Ar = (e, t) => w(e, "maximum", t.maximum), jr = (e) => (t, n) => {
	Or(t, n.format);
	let [r, i] = e[n.format];
	C(t, "minimum", r), w(t, "maximum", i);
}, Mr = {
	greater_than: (e, t) => C(e, t.inclusive ? "minimum" : "exclusiveMinimum", t.value),
	less_than: (e, t) => w(e, t.inclusive ? "maximum" : "exclusiveMaximum", t.value),
	multiple_of: (e, t) => Tr(e, t.value),
	number_format: jr(Re),
	bigint_format: jr(Se),
	min_length: kr,
	max_length: Ar,
	length_equals: (e, t) => wr(e, t.length),
	min_size: kr,
	max_size: Ar,
	size_equals: (e, t) => wr(e, t.size),
	string_format: (e, t) => {
		Or(e, t.format), t.pattern && Er(e, t.pattern), (t.format === "base64" || t.format === "base64url") && (e.contentEncoding = t.format), (t.local || t.precision === -1) && (e.laxFormat = !0);
	},
	mime_type: (e, t) => Dr(e, t.mime)
};
function T(e) {
	let t = {}, n = e._zod.def, r = e._zod.traits.has("$ZodCheck") ? [e, ...n.checks ?? []] : n.checks ?? [];
	for (let e of r) Mr[e._zod.def.check]?.(t, e._zod.def);
	let i = e._zod.bag;
	i.minimum !== void 0 && C(t, "minimum", i.minimum), i.exclusiveMinimum !== void 0 && C(t, "exclusiveMinimum", i.exclusiveMinimum), i.maximum !== void 0 && w(t, "maximum", i.maximum), i.exclusiveMaximum !== void 0 && w(t, "exclusiveMaximum", i.exclusiveMaximum), i.multipleOf !== void 0 && Tr(t, i.multipleOf), i.format !== void 0 && (t.format ??= i.format, i.format.includes("int") && (t.isInt = !0)), i.mime && Dr(t, i.mime);
	for (let e of i.patterns ?? []) Er(t, e);
	return t;
}
var Nr = {
	guid: "uuid",
	url: "uri",
	datetime: "date-time",
	json_string: "json-string",
	regex: ""
}, Pr = /* @__PURE__ */ new Map([[ft, yt], [an, Jt]]), Fr = (e) => Pr.get(e) ?? e, Ir = (e, t, n, r) => {
	let i = n;
	i.type = "string";
	let { minimum: a, maximum: o, format: s, patterns: c, contentEncoding: l, laxFormat: u } = T(e);
	if (typeof a == "number" && (i.minLength = a), typeof o == "number" && (i.maxLength = o), s && (i.format = Nr[s] ?? s, i.format === "" && delete i.format, (s === "time" || u) && delete i.format), l && (i.contentEncoding = l), c && c.size > 0) {
		let e = [...c].map(Fr);
		e.length === 1 ? i.pattern = e[0].source : e.length > 1 && (i.allOf = [...e.map((e) => ({
			...t.target === "draft-07" || t.target === "draft-04" || t.target === "openapi-3.0" ? { type: "string" } : {},
			pattern: e.source
		}))]);
	}
}, Lr = (e, t, n, r) => {
	let i = n, { minimum: a, maximum: o, multipleOf: s, exclusiveMaximum: c, exclusiveMinimum: l, isInt: u } = T(e);
	i.type = u ? "integer" : "number";
	let d = typeof l == "number" && l >= (a ?? -Infinity), f = typeof c == "number" && c <= (o ?? Infinity), p = t.target === "draft-04" || t.target === "openapi-3.0";
	if (d ? p ? (i.minimum = l, i.exclusiveMinimum = !0) : i.exclusiveMinimum = l : typeof a == "number" && (i.minimum = a), f ? p ? (i.maximum = c, i.exclusiveMaximum = !0) : i.exclusiveMaximum = c : typeof o == "number" && (i.maximum = o), s) {
		let n = /* @__PURE__ */ new Set();
		for (let a of s) Number.isFinite(a) && a !== 0 ? n.add(Math.abs(a)) : b(e, t, i, r, `A multipleOf divisor of ${a} cannot be represented in JSON Schema`);
		let [a, ...o] = n;
		a !== void 0 && (i.multipleOf = a), o.length && (i.allOf = [...i.allOf ?? [], ...o.map((e) => ({ multipleOf: e }))]);
	}
}, Rr = (e, t, n, r) => {
	n.type = "boolean";
}, zr = (e, t, n, r) => {
	t.target === "openapi-3.0" ? (n.type = "string", n.nullable = !0, n.enum = [null]) : n.type = "null";
}, Br = (e, t, n, r) => {
	b(e, t, n, r, "Undefined cannot be represented in JSON Schema");
}, Vr = (e, t, n, r) => {
	n.not = {};
}, Hr = (e, t, n, r) => {
	let i = e._zod.def, a = Qe(i.entries);
	a.length === 0 ? n.not = {} : (a.every((e) => typeof e == "number") && (n.type = "number"), a.every((e) => typeof e == "string") && (n.type = "string"), n.enum = a);
}, Ur = (e, t, n, r) => {
	let i = e._zod.def;
	if (i.values.length === 0) {
		n.not = {};
		return;
	}
	let a = [];
	for (let o of i.values) if (o === void 0) {
		if (b(e, t, n, r, "Literal `undefined` cannot be represented in JSON Schema")) return;
	} else if (typeof o == "bigint") {
		if (b(e, t, n, r, "BigInt literals cannot be represented in JSON Schema")) return;
		a.push(Number(o));
	} else a.push(o);
	if (a.length !== 0) {
		if (a.length === 1) {
			let e = a[0];
			n.type = e === null ? "null" : typeof e, t.target === "draft-04" || t.target === "openapi-3.0" ? n.enum = [e] : n.const = e;
		} else a.every((e) => typeof e == "number") && (n.type = "number"), a.every((e) => typeof e == "string") && (n.type = "string"), a.every((e) => typeof e == "boolean") && (n.type = "boolean"), a.every((e) => e === null) && (n.type = "null"), n.enum = a;
	}
}, Wr = (e, t, n, r) => {
	b(e, t, n, r, "Custom types cannot be represented in JSON Schema");
}, Gr = (e, t, n, r) => {
	b(e, t, n, r, "Transforms cannot be represented in JSON Schema");
}, Kr = (e, t, n, r) => {
	let i = n, a = e._zod.def, { minimum: o, maximum: s } = T(e);
	typeof o == "number" && (i.minItems = o), typeof s == "number" && (i.maxItems = s), i.type = "array", i.items = x(a.element, t, {
		...r,
		path: [...r.path, "items"]
	});
};
function qr(e) {
	let t = e._zod.def;
	return t.type === "pipe" && t.in._zod.traits.has("$ZodTransform") ? qr(t.out) : t.type === "catch" ? qr(t.innerType) : e._zod.optin;
}
var Jr = (e, t, n, r) => {
	let i = n, a = e._zod.def, o = a.shape;
	if (Object.getOwnPropertySymbols(o).length && b(e, t, i, r, "Symbol keys cannot be represented in JSON Schema")) return;
	i.type = "object", i.properties = {};
	for (let e in o) Vn(i.properties, e, x(o[e], t, {
		...r,
		path: [
			...r.path,
			"properties",
			e
		]
	}));
	let s = [];
	for (let e of Object.keys(o)) {
		let n = a.shape[e];
		(t.io === "input" ? qr(n) === void 0 : n._zod.optout === void 0) && s.push(e);
	}
	s.length > 0 && (i.required = s), a.catchall?._zod.def.type === "never" ? i.additionalProperties = !1 : a.catchall ? a.catchall && (i.additionalProperties = x(a.catchall, t, {
		...r,
		path: [...r.path, "additionalProperties"]
	})) : t.io === "output" && (i.additionalProperties = !1);
}, Yr = (e, t, n, r) => {
	let i = e._zod.def, a = i.inclusive === !1, o = i.options.map((e, n) => x(e, t, {
		...r,
		path: [
			...r.path,
			a ? "oneOf" : "anyOf",
			n
		]
	}));
	a ? n.oneOf = o : n.anyOf = o;
}, Xr = (e, t, n, r) => {
	let i = e._zod.def, a = x(i.left, t, {
		...r,
		path: [
			...r.path,
			"allOf",
			0
		]
	}), o = x(i.right, t, {
		...r,
		path: [
			...r.path,
			"allOf",
			1
		]
	}), s = (e) => "allOf" in e && Object.keys(e).length === 1, c = [...s(a) ? a.allOf : [a], ...s(o) ? o.allOf : [o]];
	n.allOf = c, t.intersections.push(c);
};
function Zr(e, t, n) {
	if (t.$ref) {
		if (n.has(t)) return t;
		n.add(t);
		let r = e.get(t)?.def;
		if (!r) return t;
		let i = Zr(e, r, n);
		return i === r ? t : i;
	}
	for (let r of ["anyOf", "oneOf"]) {
		let i = t[r];
		if (!Array.isArray(i)) continue;
		let a = i.map((t) => Zr(e, t, n));
		a.some((e, t) => e !== i[t]) && (t = {
			...t,
			[r]: a
		});
	}
	let r = Array.isArray(t.type) ? t.type : [t.type], i = !r.includes("string") && r.some((e) => e === "number" || e === "integer"), a = t.enum ?? (t.const === void 0 ? void 0 : [t.const]);
	if (!i && !a?.some((e) => typeof e == "number")) return t;
	let { minimum: o, maximum: s, exclusiveMinimum: c, exclusiveMaximum: l, multipleOf: u, format: d, id: f, ...p } = t;
	return p.enum ? p.enum = p.enum.map((e) => typeof e == "number" ? String(e) : e) : typeof p.const == "number" && (p.const = String(p.const)), i && (p.type = "string", a || (p.pattern = (r.includes("number") ? Ct : Dn).source)), p;
}
var Qr = /* @__PURE__ */ new WeakMap();
function $r(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e.seen.values()) n.def && !t.has(n.schema) && t.set(n.schema, n);
	let n = /* @__PURE__ */ new Map();
	for (let r of Qr.get(e) ?? []) {
		let i = e.seen.get(r), a = (i?.def ?? i?.schema)?.propertyNames;
		if (!a || a === !0 || n.has(a)) continue;
		let o = Zr(t, a, /* @__PURE__ */ new Set());
		o !== a && n.set(a, o);
	}
	if (n.size) for (let t of e.seen.values()) for (let e of [t.schema, t.def]) {
		let t = e && n.get(e.propertyNames);
		t && (e.propertyNames = t);
	}
}
var ei = (e, t, n, r) => {
	let i = n, a = e._zod.def;
	i.type = "object";
	let o = a.keyType, s = T(o).patterns;
	if (a.mode === "loose" && s && s.size > 0) {
		let e = x(a.valueType, t, {
			...r,
			path: [
				...r.path,
				"patternProperties",
				"*"
			]
		});
		i.patternProperties = {};
		for (let t of s) Vn(i.patternProperties, Fr(t).source, e);
	} else {
		if (t.target === "draft-07" || t.target === "draft-2020-12") {
			i.propertyNames = x(a.keyType, t, {
				...r,
				path: [...r.path, "propertyNames"]
			});
			let n = Qr.get(t);
			n || (n = [], Qr.set(t, n), t.deferred.push(() => $r(t))), n.push(e);
		}
		i.additionalProperties = x(a.valueType, t, {
			...r,
			path: [...r.path, "additionalProperties"]
		});
	}
	let c = o._zod.values, l = t.io === "input" && qr(a.valueType) !== void 0;
	if (c && !a.partial && !l) {
		let e = [...c].filter((e) => typeof e == "string" || typeof e == "number");
		e.length > 0 && (i.required = e.map(String));
	}
}, ti = (e, t, n, r) => {
	let i = e._zod.def, a = x(i.innerType, t, r), o = t.seen.get(e);
	t.target === "openapi-3.0" ? (o.ref = i.innerType, n.nullable = !0) : n.anyOf = [a, { type: "null" }];
}, ni = (e, t, n, r) => {
	let i = e._zod.def;
	x(i.innerType, t, r);
	let a = t.seen.get(e);
	a.ref = i.innerType;
}, ri = Symbol();
function ii(e, t, n, r, i) {
	let a = !1, o = JSON.stringify(e, (e, t) => typeof t == "bigint" ? (a = !0, null) : t);
	return a ? (b(t, n, r, i, "BigInt defaults cannot be represented in JSON Schema"), ri) : JSON.parse(o);
}
var ai = (e, t, n, r) => {
	let i = e._zod.def;
	x(i.innerType, t, r);
	let a = t.seen.get(e);
	a.ref = i.innerType;
	let o = ii(i.defaultValue, e, t, n, r);
	o !== ri && (n.default = o);
}, oi = (e, t, n, r) => {
	let i = e._zod.def;
	x(i.innerType, t, r);
	let a = t.seen.get(e);
	if (a.ref = i.innerType, t.io !== "input") return;
	let o = ii(i.defaultValue, e, t, n, r);
	o !== ri && (n._prefault = o);
}, si = (e, t, n, r) => {
	let i = e._zod.def;
	x(i.innerType, t, r);
	let a = t.seen.get(e);
	a.ref = i.innerType;
	let o;
	try {
		o = i.catchValue(void 0);
	} catch {
		b(e, t, n, r, "Dynamic catch values are not supported in JSON Schema");
		return;
	}
	n.default = o;
}, ci = (e, t, n, r) => {
	let i = e._zod.def, a = i.in._zod.traits.has("$ZodTransform"), o = t.io === "input" ? a ? i.out : i.in : i.out;
	x(o, t, r);
	let s = t.seen.get(e);
	s.ref = o;
}, li = (e, t, n, r) => {
	let i = e._zod.def;
	x(i.innerType, t, r);
	let a = t.seen.get(e);
	a.ref = i.innerType, n.readOnly = !0;
}, ui = (e, t, n, r) => {
	let i = e._zod.def;
	x(i.innerType, t, r);
	let a = t.seen.get(e);
	a.ref = i.innerType;
}, di = /* @__PURE__ */ new WeakSet([Object.prototype, Error.prototype]);
function fi(e, t, n) {
	Object.defineProperty(e, t, {
		configurable: !0,
		enumerable: !1,
		get() {
			let e = n(this);
			return Object.defineProperty(this, t, {
				value: e,
				configurable: !0,
				writable: !0
			}), e;
		},
		set(e) {
			Object.defineProperty(this, t, {
				value: e,
				configurable: !0,
				writable: !0
			});
		}
	});
}
var E = /*@__PURE__*/ g("ZodError", (e, t) => {
	s.init(e, t), e.name = "ZodError";
	let n = Object.getPrototypeOf(e);
	di.has(n) || (di.add(n), fi(n, "format", (e) => (t) => Te(e, t)), fi(n, "flatten", (e) => (t) => Ht(e, t)), fi(n, "addIssue", (e) => (t) => {
		e.issues.push(t), e.message = JSON.stringify(e.issues, it, 2);
	}), fi(n, "addIssues", (e) => (t) => {
		e.issues.push(...t), e.message = JSON.stringify(e.issues, it, 2);
	}), Object.defineProperty(n, "isEmpty", {
		configurable: !0,
		enumerable: !1,
		get() {
			return this.issues.length === 0;
		}
	}));
}, void 0, { Parent: Error }), pi = /* @__PURE__ */ Mt(E), mi = /* @__PURE__ */ lt(E), hi = /* @__PURE__ */ Ve(E), gi = /* @__PURE__ */ f(E), _i = /* @__PURE__ */ Zt(E), vi = /* @__PURE__ */ kt(E), yi = /* @__PURE__ */ Ft(E), bi = /* @__PURE__ */ ln(E), xi = /* @__PURE__ */ gt(E), Si = /* @__PURE__ */ An(E), Ci = /* @__PURE__ */ Fn(E), wi = /* @__PURE__ */ Rn(E);
// node_modules/zod/v4/classic/schemas.js
function Ti() {
	pe.localeError || ie(or());
}
function Ei() {
	pe.memoizer || ie({ memoizer: rr() });
}
var D = /*@__PURE__*/ g("ZodType", (e, t) => (Ti(), st.init(e, t), e.def = t, e.type = t.type, e), {
	check(...e) {
		let t = this.def;
		return this.clone(v(t, { checks: [...t.checks ?? [], ...e.map((e) => typeof e == "function" ? { _zod: {
			check: e,
			def: { check: "custom" },
			onattach: []
		} } : e)] }), { parent: !0 });
	},
	with(...e) {
		return this.check(...e);
	},
	clone(e, t) {
		return u(this, e, t);
	},
	brand() {
		return this;
	},
	register(e, t) {
		return e.add(this, t), this;
	},
	refine(e, t) {
		return this.check(Va(e, t));
	},
	superRefine(e, t) {
		return this.check(Ha(e, t));
	},
	overwrite(e) {
		return this.check(Bn(e));
	},
	optional() {
		return B(this);
	},
	exactOptional() {
		return Ca(this);
	},
	nullable() {
		return Ta(this);
	},
	nullish() {
		return B(Ta(this));
	},
	nonoptional(e) {
		return ja(this, e);
	},
	array() {
		return N(this);
	},
	or(e) {
		return I([this, e]);
	},
	and(e) {
		return ha(this, e);
	},
	transform(e) {
		return Fa(this, ba(e));
	},
	default(e) {
		return Da(this, e);
	},
	prefault(e) {
		return ka(this, e);
	},
	catch(e) {
		return Na(this, e);
	},
	pipe(e) {
		return Fa(this, e);
	},
	readonly() {
		return Ra(this);
	},
	describe(e) {
		let t = this.clone();
		return ur.add(t, { description: e }), t;
	},
	meta(...e) {
		if (e.length === 0) return ur.get(this);
		let t = this.clone();
		return ur.add(t, e[0]), t;
	},
	isOptional() {
		return this.safeParse(void 0).success;
	},
	isNullable() {
		return this.safeParse(null).success;
	},
	apply(e, ...t) {
		return t.length === 0 ? e(this) : e(this, ...t);
	},
	get "~standard"() {
		return se(this, "~standard", {
			...yn(this),
			jsonSchema: {
				input: Cr(this, "input"),
				output: Cr(this, "output")
			}
		});
	},
	set "~standard"(e) {
		Et(this, "~standard", e);
	},
	parse: function e(t, n) {
		return pi(this, t, n, { callee: e });
	},
	parseAsync: async function e(t, n) {
		return await mi(this, t, n, { callee: e });
	},
	safeParse(e, t) {
		return hi(this, e, t);
	},
	async safeParseAsync(e, t) {
		return gi(this, e, t);
	},
	get spa() {
		return this?.safeParseAsync;
	},
	set spa(e) {
		Et(this, "spa", e);
	},
	validate(e, t) {
		return je(this, e, t);
	},
	validateAsync(e, t) {
		return Gt(this, e, t);
	},
	encode: function e(t, n) {
		return _i(this, t, n, { callee: e });
	},
	decode: function e(t, n) {
		return vi(this, t, n, { callee: e });
	},
	encodeAsync: async function e(t, n) {
		return await yi(this, t, n, { callee: e });
	},
	decodeAsync: async function e(t, n) {
		return await bi(this, t, n, { callee: e });
	},
	safeEncode(e, t) {
		return xi(this, e, t);
	},
	safeDecode(e, t) {
		return Si(this, e, t);
	},
	async safeEncodeAsync(e, t) {
		return Ci(this, e, t);
	},
	async safeDecodeAsync(e, t) {
		return wi(this, e, t);
	},
	toJSONSchema(e) {
		return Sr(this, {})(e);
	},
	get description() {
		return ur.get(this)?.description;
	},
	get _def() {
		return this._zod.def;
	}
}), Di = /*@__PURE__*/ g("_ZodString", (e, t) => {
	_e.init(e, t), D.init(e, t), e._zod.processJSONSchema = (t, n, r) => Ir(e, t, n, r);
}, /*@__PURE__*/ ue({
	format: (e) => T(e).format ?? null,
	minLength: (e) => T(e).minimum ?? null,
	maxLength: (e) => T(e).maximum ?? null
}, {
	regex(...e) {
		return this.check(Je(...e));
	},
	includes(...e) {
		return this.check(ct(...e));
	},
	startsWith(...e) {
		return this.check(Ge(...e));
	},
	endsWith(...e) {
		return this.check(cn(...e));
	},
	min(...e) {
		return this.check(we(...e));
	},
	max(...e) {
		return this.check(Vt(...e));
	},
	length(...e) {
		return this.check(m(...e));
	},
	nonempty(...e) {
		return this.check(we(1, ...e));
	},
	lowercase(e) {
		return this.check(Ae(e));
	},
	uppercase(e) {
		return this.check(Fe(e));
	},
	trim() {
		return this.check(he());
	},
	normalize(...e) {
		return this.check(fe(...e));
	},
	toLowerCase() {
		return this.check(ve());
	},
	toUpperCase() {
		return this.check(dn());
	},
	slugify() {
		return this.check(le());
	}
})), Oi = /*@__PURE__*/ g("ZodString", (e, t) => {
	_e.init(e, t), Di.init(e, t);
}, {
	email(e) {
		return this.check(St(Ni, e));
	},
	url(e) {
		return this.check(r(Ii, e));
	},
	jwt(e) {
		return this.check(Ue(Zi, e));
	},
	emoji(e) {
		return this.check(Ot(Li, e));
	},
	guid(e) {
		return this.check(jt(Pi, e));
	},
	uuid(e) {
		return this.check(Dt(Fi, e));
	},
	uuidv4(e) {
		return this.check(Tn(Fi, e));
	},
	uuidv6(e) {
		return this.check(nn(Fi, e));
	},
	uuidv7(e) {
		return this.check(_n(Fi, e));
	},
	nanoid(e) {
		return this.check(Ne(Ri, e));
	},
	cuid(e) {
		return this.check(vn(zi, e));
	},
	cuid2(e) {
		return this.check(vt(Bi, e));
	},
	ulid(e) {
		return this.check(rt(Vi, e));
	},
	base64(e) {
		return this.check($t(Ji, e));
	},
	base64url(e) {
		return this.check(mn(Yi, e));
	},
	xid(e) {
		return this.check(Bt(Hi, e));
	},
	ksuid(e) {
		return this.check(ee(Ui, e));
	},
	ipv4(e) {
		return this.check(Ln(Wi, e));
	},
	ipv6(e) {
		return this.check(ht(Gi, e));
	},
	cidrv4(e) {
		return this.check(dt(Ki, e));
	},
	cidrv6(e) {
		return this.check(rn(qi, e));
	},
	e164(e) {
		return this.check(En(Xi, e));
	},
	datetime(e) {
		return this.check(Be(ki, e));
	},
	date(e) {
		return this.check(Pn(Ai, e));
	},
	time(e) {
		return this.check(Mn(ji, e));
	},
	duration(e) {
		return this.check(d(Mi, e));
	}
});
function O(e) {
	return Ze(Oi, e);
}
var k = /*@__PURE__*/ g("ZodStringFormat", (e, t) => {
	at.init(e, t), Di.init(e, t);
}), ki = /*@__PURE__*/ g("ZodISODateTime", (e, t) => {
	ne.init(e, t), k.init(e, t);
}), Ai = /*@__PURE__*/ g("ZodISODate", (e, t) => {
	We.init(e, t), k.init(e, t);
}), ji = /*@__PURE__*/ g("ZodISOTime", (e, t) => {
	Me.init(e, t), k.init(e, t);
}), Mi = /*@__PURE__*/ g("ZodISODuration", (e, t) => {
	h.init(e, t), k.init(e, t);
}), Ni = /*@__PURE__*/ g("ZodEmail", (e, t) => {
	jn.init(e, t), k.init(e, t);
}), Pi = /*@__PURE__*/ g("ZodGUID", (e, t) => {
	He.init(e, t), k.init(e, t);
}), Fi = /*@__PURE__*/ g("ZodUUID", (e, t) => {
	Tt.init(e, t), k.init(e, t);
}), Ii = /*@__PURE__*/ g("ZodURL", (e, t) => {
	a.init(e, t), k.init(e, t);
}), Li = /*@__PURE__*/ g("ZodEmoji", (e, t) => {
	zn.init(e, t), k.init(e, t);
}), Ri = /*@__PURE__*/ g("ZodNanoID", (e, t) => {
	ke.init(e, t), k.init(e, t);
}), zi = /*@__PURE__*/ g("ZodCUID", (e, t) => {
	wt.init(e, t), k.init(e, t);
}), Bi = /*@__PURE__*/ g("ZodCUID2", (e, t) => {
	At.init(e, t), k.init(e, t);
}), Vi = /*@__PURE__*/ g("ZodULID", (e, t) => {
	Ie.init(e, t), k.init(e, t);
}), Hi = /*@__PURE__*/ g("ZodXID", (e, t) => {
	Rt.init(e, t), k.init(e, t);
}), Ui = /*@__PURE__*/ g("ZodKSUID", (e, t) => {
	Ut.init(e, t), k.init(e, t);
}), Wi = /*@__PURE__*/ g("ZodIPv4", (e, t) => {
	p.init(e, t), k.init(e, t);
}), Gi = /*@__PURE__*/ g("ZodIPv6", (e, t) => {
	Nn.init(e, t), k.init(e, t);
}), Ki = /*@__PURE__*/ g("ZodCIDRv4", (e, t) => {
	Yt.init(e, t), k.init(e, t);
}), qi = /*@__PURE__*/ g("ZodCIDRv6", (e, t) => {
	On.init(e, t), k.init(e, t);
}), Ji = /*@__PURE__*/ g("ZodBase64", (e, t) => {
	sn.init(e, t), k.init(e, t);
}), Yi = /*@__PURE__*/ g("ZodBase64URL", (e, t) => {
	xn.init(e, t), k.init(e, t);
}), Xi = /*@__PURE__*/ g("ZodE164", (e, t) => {
	ut.init(e, t), k.init(e, t);
}), Zi = /*@__PURE__*/ g("ZodJWT", (e, t) => {
	c.init(e, t), k.init(e, t);
}), Qi = /*@__PURE__*/ g("ZodNumber", (e, t) => {
	ze.init(e, t), D.init(e, t), e._zod.processJSONSchema = (t, n, r) => Lr(e, t, n, r), e.isFinite = !0;
}, /*@__PURE__*/ ue({
	minValue: (e) => {
		let { minimum: t, exclusiveMinimum: n } = T(e);
		return Math.max(t ?? -Infinity, n ?? -Infinity);
	},
	maxValue: (e) => {
		let { maximum: t, exclusiveMaximum: n } = T(e);
		return Math.min(t ?? Infinity, n ?? Infinity);
	},
	isInt: (e) => {
		let { isInt: t, multipleOf: n } = T(e);
		return !!t || !!n?.some(Number.isSafeInteger);
	},
	format: (e) => T(e).format ?? null
}, {
	gt(e, t) {
		return this.check(Xt(e, t));
	},
	gte(e, t) {
		return this.check(Pt(e, t));
	},
	min(e, t) {
		return this.check(Pt(e, t));
	},
	lt(e, t) {
		return this.check(Wt(e, t));
	},
	lte(e, t) {
		return this.check(o(e, t));
	},
	max(e, t) {
		return this.check(o(e, t));
	},
	int(e) {
		return this.check(ea(e));
	},
	safe(e) {
		return this.check(ea(e));
	},
	positive(e) {
		return this.check(Xt(0, e));
	},
	nonnegative(e) {
		return this.check(Pt(0, e));
	},
	negative(e) {
		return this.check(Wt(0, e));
	},
	nonpositive(e) {
		return this.check(o(0, e));
	},
	multipleOf(e, t) {
		return this.check(De(e, t));
	},
	step(e, t) {
		return this.check(De(e, t));
	},
	finite() {
		return this;
	}
}));
function A(e) {
	return Le(Qi, e);
}
var $i = /*@__PURE__*/ g("ZodNumberFormat", (e, t) => {
	Hn.init(e, t), Qi.init(e, t);
});
function ea(e) {
	return kn($i, e);
}
var ta = /*@__PURE__*/ g("ZodBoolean", (e, t) => {
	xt.init(e, t), D.init(e, t), e._zod.processJSONSchema = (t, n, r) => Rr(e, t, n, r);
});
function j(e) {
	return Lt(ta, e);
}
var na = /*@__PURE__*/ g("ZodUndefined", (e, t) => {
	Cn.init(e, t), D.init(e, t), e._zod.processJSONSchema = (t, n, r) => Br(e, t, n, r);
});
function ra(e) {
	return et(na, e);
}
var ia = /*@__PURE__*/ g("ZodNull", (e, t) => {
	me.init(e, t), D.init(e, t), e._zod.processJSONSchema = (t, n, r) => zr(e, t, n, r);
});
function aa(e) {
	return xe(ia, e);
}
var oa = /*@__PURE__*/ g("ZodUnknown", (e, t) => {
	hn.init(e, t), D.init(e, t), e._zod.processJSONSchema = (e, t, n) => void 0;
});
function M() {
	return ot(oa);
}
var sa = /*@__PURE__*/ g("ZodNever", (e, t) => {
	Pe.init(e, t), D.init(e, t), e._zod.processJSONSchema = (t, n, r) => Vr(e, t, n, r);
});
function ca(e) {
	return re(sa, e);
}
var la = /*@__PURE__*/ g("ZodArray", (e, t) => {
	Ei(), mt.init(e, t), D.init(e, t), e._zod.processJSONSchema = (t, n, r) => Kr(e, t, n, r), e.element = t.element;
}, {
	min(e, t) {
		return this.check(we(e, t));
	},
	nonempty(e) {
		return this.check(we(1, e));
	},
	max(e, t) {
		return this.check(Vt(e, t));
	},
	length(e, t) {
		return this.check(m(e, t));
	},
	unwrap() {
		return this.element;
	}
});
function N(e, t) {
	return Sn(la, e, t);
}
var ua = /*@__PURE__*/ g("ZodObject", (e, t) => {
	Ei(), Xe.init(e, t), D.init(e, t), e._zod.processJSONSchema = (t, n, r) => Jr(e, t, n, r), ye(e, "shape", (e) => e._zod.def.shape, !1);
}, {
	keyof() {
		return R(Object.keys(this._zod.def.shape));
	},
	catchall(e) {
		return this.clone(v(this._zod.def, { catchall: e }));
	},
	passthrough() {
		return this.clone(v(this._zod.def, { catchall: M() }));
	},
	loose() {
		return this.clone(v(this._zod.def, { catchall: M() }));
	},
	strict() {
		return this.clone(v(this._zod.def, { catchall: ca() }));
	},
	strip() {
		return this.clone(v(this._zod.def, { catchall: void 0 }));
	},
	extend(e) {
		return Ke(this, e);
	},
	safeExtend(e) {
		return on(this, e);
	},
	merge(e) {
		return tt(this, e);
	},
	pick(e) {
		return gn(this, e);
	},
	omit(e) {
		return i(this, e);
	},
	partial(...e) {
		return tn(xa, this, e[0]);
	},
	exactPartial(...e) {
		return tn(Sa, this, e[0], "exactPartial");
	},
	required(...e) {
		return pt(Aa, this, e[0]);
	}
});
function P(e, t) {
	return new ua({
		type: "object",
		shape: e ?? {},
		..._(t)
	});
}
function F(e, t) {
	return new ua({
		type: "object",
		shape: e,
		catchall: M(),
		..._(t)
	});
}
var da = /*@__PURE__*/ g("ZodUnion", (e, t) => {
	en.init(e, t), D.init(e, t), e._zod.processJSONSchema = (t, n, r) => Yr(e, t, n, r), e.options = t.options;
});
function I(e, t) {
	return new da({
		type: "union",
		options: e,
		..._(t)
	});
}
var fa = /*@__PURE__*/ g("ZodDiscriminatedUnion", (e, t) => {
	da.init(e, t), Nt.init(e, t);
});
function pa(e, t, n) {
	return new fa({
		type: "union",
		options: t,
		discriminator: e,
		..._(n)
	});
}
var ma = /*@__PURE__*/ g("ZodIntersection", (e, t) => {
	Kt.init(e, t), D.init(e, t), e._zod.processJSONSchema = (t, n, r) => Xr(e, t, n, r);
});
function ha(e, t) {
	return new ma({
		type: "intersection",
		left: e,
		right: t
	});
}
var ga = /*@__PURE__*/ g("ZodRecord", (e, t) => {
	Ei(), pn.init(e, t), D.init(e, t), e._zod.processJSONSchema = (t, n, r) => ei(e, t, n, r), e.keyType = t.keyType, e.valueType = t.valueType;
});
function L(e, t, n) {
	return !t || !t._zod ? new ga({
		type: "record",
		keyType: O(),
		valueType: e,
		..._(t)
	}) : new ga({
		type: "record",
		keyType: e,
		valueType: t,
		..._(n)
	});
}
var _a = /*@__PURE__*/ g("ZodEnum", (e, t) => {
	_t.init(e, t), D.init(e, t), e._zod.processJSONSchema = (t, n, r) => Hr(e, t, n, r), e.enum = t.entries, e.options = [...e._zod.values];
	let n = new Set(Object.keys(t.entries));
	e.extract = (e, r) => {
		let i = {};
		for (let r of e) if (n.has(r)) i[r] = t.entries[r];
		else throw Error(`Key ${r} not found in enum`);
		return new _a({
			...t,
			checks: [],
			..._(r),
			entries: i
		});
	}, e.exclude = (e, r) => {
		let i = { ...t.entries };
		for (let t of e) if (n.has(t)) delete i[t];
		else throw Error(`Key ${t} not found in enum`);
		return new _a({
			...t,
			checks: [],
			..._(r),
			entries: i
		});
	};
});
function R(e, t) {
	return new _a({
		type: "enum",
		entries: Array.isArray(e) ? Object.fromEntries(e.map((e) => [e, e])) : e,
		..._(t)
	});
}
var va = /*@__PURE__*/ g("ZodLiteral", (e, t) => {
	Ee.init(e, t), D.init(e, t), e._zod.processJSONSchema = (t, n, r) => Ur(e, t, n, r), e.values = new Set(t.values), Object.defineProperty(e, "value", { get() {
		if (t.values.length > 1) throw Error("This schema contains multiple valid literal values. Use `.values` instead.");
		return t.values[0];
	} });
});
function z(e, t) {
	return new va({
		type: "literal",
		values: Array.isArray(e) ? e : [e],
		..._(t)
	});
}
var ya = /*@__PURE__*/ g("ZodTransform", (e, t) => {
	Ei(), nt.init(e, t), D.init(e, t), e._zod.processJSONSchema = (t, n, r) => Gr(e, t, n, r), e._zod.parse = (n, r) => {
		if (r.direction === "backward") throw new Oe(e.constructor.name);
		n.addIssue = (r) => {
			if (typeof r == "string") n.issues.push(fn(r, n.value, t));
			else {
				let t = r;
				t.fatal && (t.continue = !1), t.code ??= "custom", "input" in t || (t.input = n.value), t.inst ??= e, n.issues.push(fn(t));
			}
		};
		let i = t.transform(n.value, n);
		return i instanceof Promise ? i.then((e) => (n.value = e, n)) : (n.value = i, n);
	};
});
function ba(e) {
	return new ya({
		type: "transform",
		transform: e
	});
}
var xa = /*@__PURE__*/ g("ZodOptional", (e, t) => {
	de.init(e, t), D.init(e, t), e._zod.processJSONSchema = (t, n, r) => ui(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
});
function B(e) {
	return new xa({
		type: "optional",
		innerType: e
	});
}
var Sa = /*@__PURE__*/ g("ZodExactOptional", (e, t) => {
	In.init(e, t), D.init(e, t), e._zod.processJSONSchema = (t, n, r) => ui(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
});
function Ca(e) {
	return new Sa({
		type: "optional",
		innerType: e
	});
}
var wa = /*@__PURE__*/ g("ZodNullable", (e, t) => {
	Ce.init(e, t), D.init(e, t), e._zod.processJSONSchema = (t, n, r) => ti(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
});
function Ta(e) {
	return new wa({
		type: "nullable",
		innerType: e
	});
}
var Ea = /*@__PURE__*/ g("ZodDefault", (e, t) => {
	It.init(e, t), D.init(e, t), e._zod.processJSONSchema = (t, n, r) => ai(e, t, n, r), e.unwrap = () => e._zod.def.innerType, e.removeDefault = e.unwrap;
});
function Da(e, t) {
	return new Ea({
		type: "default",
		innerType: e,
		get defaultValue() {
			return typeof t == "function" ? t() : bn(t);
		}
	});
}
var Oa = /*@__PURE__*/ g("ZodPrefault", (e, t) => {
	$e.init(e, t), D.init(e, t), e._zod.processJSONSchema = (t, n, r) => oi(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
});
function ka(e, t) {
	return new Oa({
		type: "prefault",
		innerType: e,
		get defaultValue() {
			return typeof t == "function" ? t() : bn(t);
		}
	});
}
var Aa = /*@__PURE__*/ g("ZodNonOptional", (e, t) => {
	ae.init(e, t), D.init(e, t), e._zod.processJSONSchema = (t, n, r) => ni(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
});
function ja(e, t) {
	return new Aa({
		type: "nonoptional",
		innerType: e,
		..._(t)
	});
}
var Ma = /*@__PURE__*/ g("ZodCatch", (e, t) => {
	un.init(e, t), D.init(e, t), e._zod.processJSONSchema = (t, n, r) => si(e, t, n, r), e.unwrap = () => e._zod.def.innerType, e.removeCatch = e.unwrap;
});
function Na(e, t) {
	return new Ma({
		type: "catch",
		innerType: e,
		catchValue: typeof t == "function" ? t : Ye(t)
	});
}
var Pa = /*@__PURE__*/ g("ZodPipe", (e, t) => {
	qe.init(e, t), D.init(e, t), e._zod.processJSONSchema = (t, n, r) => ci(e, t, n, r), e.in = t.in, e.out = t.out;
});
function Fa(e, t) {
	return new Pa({
		type: "pipe",
		in: e,
		out: t
	});
}
var Ia = /*@__PURE__*/ g("ZodPreprocess", (e, t) => {
	Pa.init(e, t), ce.init(e, t);
}), La = /*@__PURE__*/ g("ZodReadonly", (e, t) => {
	be.init(e, t), D.init(e, t), e._zod.processJSONSchema = (t, n, r) => li(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
});
function Ra(e) {
	return new La({
		type: "readonly",
		innerType: e
	});
}
var za = /*@__PURE__*/ g("ZodCustom", (e, t) => {
	Qt.init(e, t), D.init(e, t), e._zod.processJSONSchema = (t, n, r) => Wr(e, t, n, r);
});
function Ba(e, t) {
	return qt(za, e ?? (() => !0), t);
}
function Va(e, t = {}) {
	return l(za, e, t);
}
function Ha(e, t) {
	return oe(e, t);
}
function Ua(e, t) {
	return new Ia({
		type: "pipe",
		in: ba(e),
		out: t
	});
}
// node_modules/zod/v4/classic/iso.js
function Wa(e) {
	return Be(ki, e);
}
// node_modules/@modelcontextprotocol/sdk/dist/esm/types.js
var V = "io.modelcontextprotocol/related-task", H = Ba((e) => e !== null && (typeof e == "object" || typeof e == "function")), Ga = I([O(), A().int()]), Ka = O();
F({
	ttl: A().optional(),
	pollInterval: A().optional()
});
var qa = P({ ttl: A().optional() }), Ja = P({ taskId: O() }), Ya = F({
	progressToken: Ga.optional(),
	[V]: Ja.optional()
}), U = P({ _meta: Ya.optional() }), Xa = U.extend({ task: qa.optional() }), Za = (e) => Xa.safeParse(e).success, W = P({
	method: O(),
	params: U.loose().optional()
}), G = P({ _meta: Ya.optional() }), K = P({
	method: O(),
	params: G.loose().optional()
}), q = F({ _meta: Ya.optional() }), Qa = I([O(), A().int()]), $a = P({
	jsonrpc: z("2.0"),
	id: Qa,
	...W.shape
}).strict(), eo = (e) => $a.safeParse(e).success, to = P({
	jsonrpc: z("2.0"),
	...K.shape
}).strict(), no = (e) => to.safeParse(e).success, ro = P({
	jsonrpc: z("2.0"),
	id: Qa,
	result: q
}).strict(), io = (e) => ro.safeParse(e).success, J;
(function(e) {
	e[e.ConnectionClosed = -32e3] = "ConnectionClosed", e[e.RequestTimeout = -32001] = "RequestTimeout", e[e.ParseError = -32700] = "ParseError", e[e.InvalidRequest = -32600] = "InvalidRequest", e[e.MethodNotFound = -32601] = "MethodNotFound", e[e.InvalidParams = -32602] = "InvalidParams", e[e.InternalError = -32603] = "InternalError", e[e.UrlElicitationRequired = -32042] = "UrlElicitationRequired";
})(J ||= {});
var ao = P({
	jsonrpc: z("2.0"),
	id: Qa.optional(),
	error: P({
		code: A().int(),
		message: O(),
		data: M().optional()
	})
}).strict(), oo = (e) => ao.safeParse(e).success, so = I([
	$a,
	to,
	ro,
	ao
]);
I([ro, ao]);
var co = q.strict(), lo = G.extend({
	requestId: Qa.optional(),
	reason: O().optional()
}), uo = K.extend({
	method: z("notifications/cancelled"),
	params: lo
}), fo = P({ icons: N(P({
	src: O(),
	mimeType: O().optional(),
	sizes: N(O()).optional(),
	theme: R(["light", "dark"]).optional()
})).optional() }), Y = P({
	name: O(),
	title: O().optional()
}), po = Y.extend({
	...Y.shape,
	...fo.shape,
	version: O(),
	websiteUrl: O().optional(),
	description: O().optional()
}), mo = Ua((e) => e && typeof e == "object" && !Array.isArray(e) && Object.keys(e).length === 0 ? { form: {} } : e, ha(P({
	form: ha(P({ applyDefaults: j().optional() }), L(O(), M())).optional(),
	url: H.optional()
}), L(O(), M()).optional())), ho = F({
	list: H.optional(),
	cancel: H.optional(),
	requests: F({
		sampling: F({ createMessage: H.optional() }).optional(),
		elicitation: F({ create: H.optional() }).optional()
	}).optional()
}), go = F({
	list: H.optional(),
	cancel: H.optional(),
	requests: F({ tools: F({ call: H.optional() }).optional() }).optional()
}), _o = P({
	experimental: L(O(), H).optional(),
	sampling: P({
		context: H.optional(),
		tools: H.optional()
	}).optional(),
	elicitation: mo.optional(),
	roots: P({ listChanged: j().optional() }).optional(),
	tasks: ho.optional(),
	extensions: L(O(), H).optional()
}), vo = U.extend({
	protocolVersion: O(),
	capabilities: _o,
	clientInfo: po
}), yo = W.extend({
	method: z("initialize"),
	params: vo
}), bo = P({
	experimental: L(O(), H).optional(),
	logging: H.optional(),
	completions: H.optional(),
	prompts: P({ listChanged: j().optional() }).optional(),
	resources: P({
		subscribe: j().optional(),
		listChanged: j().optional()
	}).optional(),
	tools: P({ listChanged: j().optional() }).optional(),
	tasks: go.optional(),
	extensions: L(O(), H).optional()
}), xo = q.extend({
	protocolVersion: O(),
	capabilities: bo,
	serverInfo: po,
	instructions: O().optional()
}), So = K.extend({
	method: z("notifications/initialized"),
	params: G.optional()
}), Co = W.extend({
	method: z("ping"),
	params: U.optional()
}), wo = P({
	progress: A(),
	total: B(A()),
	message: B(O())
}), To = P({
	...G.shape,
	...wo.shape,
	progressToken: Ga
}), Eo = K.extend({
	method: z("notifications/progress"),
	params: To
}), Do = U.extend({ cursor: Ka.optional() }), Oo = W.extend({ params: Do.optional() }), ko = q.extend({ nextCursor: Ka.optional() }), Ao = R([
	"working",
	"input_required",
	"completed",
	"failed",
	"cancelled"
]), jo = P({
	taskId: O(),
	status: Ao,
	ttl: I([A(), aa()]),
	createdAt: O(),
	lastUpdatedAt: O(),
	pollInterval: B(A()),
	statusMessage: B(O())
}), Mo = q.extend({ task: jo }), No = G.merge(jo), Po = K.extend({
	method: z("notifications/tasks/status"),
	params: No
}), Fo = W.extend({
	method: z("tasks/get"),
	params: U.extend({ taskId: O() })
}), Io = q.merge(jo), Lo = W.extend({
	method: z("tasks/result"),
	params: U.extend({ taskId: O() })
});
q.loose();
var Ro = Oo.extend({ method: z("tasks/list") }), zo = ko.extend({ tasks: N(jo) }), Bo = W.extend({
	method: z("tasks/cancel"),
	params: U.extend({ taskId: O() })
}), Vo = q.merge(jo), Ho = P({
	uri: O(),
	mimeType: B(O()),
	_meta: L(O(), M()).optional()
}), Uo = Ho.extend({ text: O() }), Wo = O().refine((e) => {
	try {
		return atob(e), !0;
	} catch {
		return !1;
	}
}, { message: "Invalid Base64 string" }), Go = Ho.extend({ blob: Wo }), Ko = R(["user", "assistant"]), X = P({
	audience: N(Ko).optional(),
	priority: A().min(0).max(1).optional(),
	lastModified: Wa({ offset: !0 }).optional()
}), qo = P({
	...Y.shape,
	...fo.shape,
	uri: O(),
	description: B(O()),
	mimeType: B(O()),
	size: B(A()),
	annotations: X.optional(),
	_meta: B(F({}))
}), Jo = P({
	...Y.shape,
	...fo.shape,
	uriTemplate: O(),
	description: B(O()),
	mimeType: B(O()),
	annotations: X.optional(),
	_meta: B(F({}))
}), Yo = Oo.extend({ method: z("resources/list") }), Xo = ko.extend({ resources: N(qo) }), Zo = Oo.extend({ method: z("resources/templates/list") }), Qo = ko.extend({ resourceTemplates: N(Jo) }), $o = U.extend({ uri: O() }), es = $o, ts = W.extend({
	method: z("resources/read"),
	params: es
}), ns = q.extend({ contents: N(I([Uo, Go])) }), rs = K.extend({
	method: z("notifications/resources/list_changed"),
	params: G.optional()
}), is = $o, as = W.extend({
	method: z("resources/subscribe"),
	params: is
}), os = $o, ss = W.extend({
	method: z("resources/unsubscribe"),
	params: os
}), cs = G.extend({ uri: O() }), ls = K.extend({
	method: z("notifications/resources/updated"),
	params: cs
}), us = P({
	name: O(),
	description: B(O()),
	required: B(j())
}), ds = P({
	...Y.shape,
	...fo.shape,
	description: B(O()),
	arguments: B(N(us)),
	_meta: B(F({}))
}), fs = Oo.extend({ method: z("prompts/list") }), ps = ko.extend({ prompts: N(ds) }), ms = U.extend({
	name: O(),
	arguments: L(O(), O()).optional()
}), hs = W.extend({
	method: z("prompts/get"),
	params: ms
}), gs = P({
	type: z("text"),
	text: O(),
	annotations: X.optional(),
	_meta: L(O(), M()).optional()
}), _s = P({
	type: z("image"),
	data: Wo,
	mimeType: O(),
	annotations: X.optional(),
	_meta: L(O(), M()).optional()
}), vs = P({
	type: z("audio"),
	data: Wo,
	mimeType: O(),
	annotations: X.optional(),
	_meta: L(O(), M()).optional()
}), ys = P({
	type: z("tool_use"),
	name: O(),
	id: O(),
	input: L(O(), M()),
	_meta: L(O(), M()).optional()
}), bs = P({
	type: z("resource"),
	resource: I([Uo, Go]),
	annotations: X.optional(),
	_meta: L(O(), M()).optional()
}), xs = qo.extend({ type: z("resource_link") }), Ss = I([
	gs,
	_s,
	vs,
	xs,
	bs
]), Cs = P({
	role: Ko,
	content: Ss
}), ws = q.extend({
	description: O().optional(),
	messages: N(Cs)
}), Ts = K.extend({
	method: z("notifications/prompts/list_changed"),
	params: G.optional()
}), Es = P({
	title: O().optional(),
	readOnlyHint: j().optional(),
	destructiveHint: j().optional(),
	idempotentHint: j().optional(),
	openWorldHint: j().optional()
}), Ds = P({ taskSupport: R([
	"required",
	"optional",
	"forbidden"
]).optional() }), Os = P({
	...Y.shape,
	...fo.shape,
	description: O().optional(),
	inputSchema: P({
		type: z("object"),
		properties: L(O(), H).optional(),
		required: N(O()).optional()
	}).catchall(M()),
	outputSchema: P({
		type: z("object"),
		properties: L(O(), H).optional(),
		required: N(O()).optional()
	}).catchall(M()).optional(),
	annotations: Es.optional(),
	execution: Ds.optional(),
	_meta: L(O(), M()).optional()
}), ks = Oo.extend({ method: z("tools/list") }), As = ko.extend({ tools: N(Os) }), Z = q.extend({
	content: N(Ss).default([]),
	structuredContent: L(O(), M()).optional(),
	isError: j().optional()
});
Z.or(q.extend({ toolResult: M() }));
var js = Xa.extend({
	name: O(),
	arguments: L(O(), M()).optional()
}), Ms = W.extend({
	method: z("tools/call"),
	params: js
}), Ns = K.extend({
	method: z("notifications/tools/list_changed"),
	params: G.optional()
});
P({
	autoRefresh: j().default(!0),
	debounceMs: A().int().nonnegative().default(300)
});
var Ps = R([
	"debug",
	"info",
	"notice",
	"warning",
	"error",
	"critical",
	"alert",
	"emergency"
]), Fs = U.extend({ level: Ps }), Is = W.extend({
	method: z("logging/setLevel"),
	params: Fs
}), Ls = G.extend({
	level: Ps,
	logger: O().optional(),
	data: M()
}), Rs = K.extend({
	method: z("notifications/message"),
	params: Ls
}), zs = P({
	hints: N(P({ name: O().optional() })).optional(),
	costPriority: A().min(0).max(1).optional(),
	speedPriority: A().min(0).max(1).optional(),
	intelligencePriority: A().min(0).max(1).optional()
}), Bs = P({ mode: R([
	"auto",
	"required",
	"none"
]).optional() }), Vs = P({
	type: z("tool_result"),
	toolUseId: O().describe("The unique identifier for the corresponding tool call."),
	content: N(Ss).default([]),
	structuredContent: P({}).loose().optional(),
	isError: j().optional(),
	_meta: L(O(), M()).optional()
}), Hs = pa("type", [
	gs,
	_s,
	vs
]), Us = pa("type", [
	gs,
	_s,
	vs,
	ys,
	Vs
]), Ws = P({
	role: Ko,
	content: I([Us, N(Us)]),
	_meta: L(O(), M()).optional()
}), Gs = Xa.extend({
	messages: N(Ws),
	modelPreferences: zs.optional(),
	systemPrompt: O().optional(),
	includeContext: R([
		"none",
		"thisServer",
		"allServers"
	]).optional(),
	temperature: A().optional(),
	maxTokens: A().int(),
	stopSequences: N(O()).optional(),
	metadata: H.optional(),
	tools: N(Os).optional(),
	toolChoice: Bs.optional()
}), Ks = W.extend({
	method: z("sampling/createMessage"),
	params: Gs
}), qs = q.extend({
	model: O(),
	stopReason: B(R([
		"endTurn",
		"stopSequence",
		"maxTokens"
	]).or(O())),
	role: Ko,
	content: Hs
}), Js = q.extend({
	model: O(),
	stopReason: B(R([
		"endTurn",
		"stopSequence",
		"maxTokens",
		"toolUse"
	]).or(O())),
	role: Ko,
	content: I([Us, N(Us)])
}), Ys = P({
	type: z("boolean"),
	title: O().optional(),
	description: O().optional(),
	default: j().optional()
}), Xs = P({
	type: z("string"),
	title: O().optional(),
	description: O().optional(),
	minLength: A().optional(),
	maxLength: A().optional(),
	format: R([
		"email",
		"uri",
		"date",
		"date-time"
	]).optional(),
	default: O().optional()
}), Zs = P({
	type: R(["number", "integer"]),
	title: O().optional(),
	description: O().optional(),
	minimum: A().optional(),
	maximum: A().optional(),
	default: A().optional()
}), Qs = P({
	type: z("string"),
	title: O().optional(),
	description: O().optional(),
	enum: N(O()),
	default: O().optional()
}), $s = P({
	type: z("string"),
	title: O().optional(),
	description: O().optional(),
	oneOf: N(P({
		const: O(),
		title: O()
	})),
	default: O().optional()
}), ec = I([
	I([
		P({
			type: z("string"),
			title: O().optional(),
			description: O().optional(),
			enum: N(O()),
			enumNames: N(O()).optional(),
			default: O().optional()
		}),
		I([Qs, $s]),
		I([P({
			type: z("array"),
			title: O().optional(),
			description: O().optional(),
			minItems: A().optional(),
			maxItems: A().optional(),
			items: P({
				type: z("string"),
				enum: N(O())
			}),
			default: N(O()).optional()
		}), P({
			type: z("array"),
			title: O().optional(),
			description: O().optional(),
			minItems: A().optional(),
			maxItems: A().optional(),
			items: P({ anyOf: N(P({
				const: O(),
				title: O()
			})) }),
			default: N(O()).optional()
		})])
	]),
	Ys,
	Xs,
	Zs
]), tc = I([Xa.extend({
	mode: z("form").optional(),
	message: O(),
	requestedSchema: P({
		type: z("object"),
		properties: L(O(), ec),
		required: N(O()).optional()
	})
}), Xa.extend({
	mode: z("url"),
	message: O(),
	elicitationId: O(),
	url: O().url()
})]), nc = W.extend({
	method: z("elicitation/create"),
	params: tc
}), rc = G.extend({ elicitationId: O() }), ic = K.extend({
	method: z("notifications/elicitation/complete"),
	params: rc
}), ac = q.extend({
	action: R([
		"accept",
		"decline",
		"cancel"
	]),
	content: Ua((e) => e === null ? void 0 : e, L(O(), I([
		O(),
		A(),
		j(),
		N(O())
	])).optional())
}), oc = P({
	type: z("ref/resource"),
	uri: O()
}), sc = P({
	type: z("ref/prompt"),
	name: O()
}), cc = U.extend({
	ref: I([sc, oc]),
	argument: P({
		name: O(),
		value: O()
	}),
	context: P({ arguments: L(O(), O()).optional() }).optional()
}), lc = W.extend({
	method: z("completion/complete"),
	params: cc
}), uc = q.extend({ completion: F({
	values: N(O()).max(100),
	total: B(A().int()),
	hasMore: B(j())
}) }), dc = P({
	uri: O().startsWith("file://"),
	name: O().optional(),
	_meta: L(O(), M()).optional()
}), fc = W.extend({
	method: z("roots/list"),
	params: U.optional()
}), pc = q.extend({ roots: N(dc) }), mc = K.extend({
	method: z("notifications/roots/list_changed"),
	params: G.optional()
});
I([
	Co,
	yo,
	lc,
	Is,
	hs,
	fs,
	Yo,
	Zo,
	ts,
	as,
	ss,
	Ms,
	ks,
	Fo,
	Lo,
	Ro,
	Bo
]), I([
	uo,
	Eo,
	So,
	mc,
	Po
]), I([
	co,
	qs,
	Js,
	ac,
	pc,
	Io,
	zo,
	Mo
]), I([
	Co,
	Ks,
	nc,
	fc,
	Fo,
	Lo,
	Ro,
	Bo
]), I([
	uo,
	Eo,
	Rs,
	ls,
	rs,
	Ns,
	Ts,
	Po,
	ic
]), I([
	co,
	xo,
	uc,
	ws,
	ps,
	Xo,
	Qo,
	ns,
	Z,
	As,
	Io,
	zo,
	Mo
]);
var Q = class e extends Error {
	constructor(e, t, n) {
		super(`MCP error ${e}: ${t}`), this.code = e, this.data = n, this.name = "McpError";
	}
	static fromError(t, n, r) {
		if (t === J.UrlElicitationRequired && r) {
			let e = r;
			if (e.elicitations) return new hc(e.elicitations, n);
		}
		return new e(t, n, r);
	}
}, hc = class extends Q {
	constructor(e, t = `URL elicitation${e.length > 1 ? "s" : ""} required`) {
		super(J.UrlElicitationRequired, t, { elicitations: e });
	}
	get elicitations() {
		return this.data?.elicitations ?? [];
	}
};
// node_modules/@modelcontextprotocol/sdk/dist/esm/server/zod-compat.js
function gc(e) {
	return !!e._zod;
}
function _c(e, t) {
	return gc(e) ? te(e, t) : e.safeParse(t);
}
function vc(e) {
	if (!e) return;
	let t;
	if (t = gc(e) ? e._zod?.def?.shape : e.shape, t) {
		if (typeof t == "function") try {
			return t();
		} catch {
			return;
		}
		return t;
	}
}
function yc(e) {
	if (gc(e)) {
		let t = e._zod?.def;
		if (t) {
			if (t.value !== void 0) return t.value;
			if (Array.isArray(t.values) && t.values.length > 0) return t.values[0];
		}
	}
	let t = e._def;
	if (t) {
		if (t.value !== void 0) return t.value;
		if (Array.isArray(t.values) && t.values.length > 0) return t.values[0];
	}
	let n = e.value;
	if (n !== void 0) return n;
}
// node_modules/@modelcontextprotocol/sdk/dist/esm/experimental/tasks/interfaces.js
function $(e) {
	return e === "completed" || e === "failed" || e === "cancelled";
}
// node_modules/@modelcontextprotocol/sdk/dist/esm/server/zod-json-schema-compat.js
function bc(e) {
	let t = vc(e)?.method;
	if (!t) throw Error("Schema is missing a method literal");
	let n = yc(t);
	if (typeof n != "string") throw Error("Schema method literal must be a string");
	return n;
}
function xc(e, t) {
	let n = _c(e, t);
	if (!n.success) throw n.error;
	return n.data;
}
var Sc = class {
	constructor(e) {
		this._options = e, this._requestMessageId = 0, this._requestHandlers = /* @__PURE__ */ new Map(), this._requestHandlerAbortControllers = /* @__PURE__ */ new Map(), this._notificationHandlers = /* @__PURE__ */ new Map(), this._responseHandlers = /* @__PURE__ */ new Map(), this._progressHandlers = /* @__PURE__ */ new Map(), this._timeoutInfo = /* @__PURE__ */ new Map(), this._pendingDebouncedNotifications = /* @__PURE__ */ new Set(), this._taskProgressTokens = /* @__PURE__ */ new Map(), this._requestResolvers = /* @__PURE__ */ new Map(), this.setNotificationHandler(uo, (e) => {
			this._oncancel(e);
		}), this.setNotificationHandler(Eo, (e) => {
			this._onprogress(e);
		}), this.setRequestHandler(Co, (e) => ({})), this._taskStore = e?.taskStore, this._taskMessageQueue = e?.taskMessageQueue, this._taskStore && (this.setRequestHandler(Fo, async (e, t) => {
			let n = await this._taskStore.getTask(e.params.taskId, t.sessionId);
			if (!n) throw new Q(J.InvalidParams, "Failed to retrieve task: Task not found");
			return { ...n };
		}), this.setRequestHandler(Lo, async (e, t) => {
			let n = async () => {
				let r = e.params.taskId;
				if (!await this._taskStore.getTask(r, t.sessionId)) throw new Q(J.InvalidParams, `Task not found: ${r}`);
				if (this._taskMessageQueue) {
					let e;
					for (; e = await this._taskMessageQueue.dequeue(r, t.sessionId);) if (e.type === "response" || e.type === "error") {
						let t = e.message, n = t.id, r = this._requestResolvers.get(n);
						if (r) {
							if (this._requestResolvers.delete(n), e.type === "response") r(t);
							else {
								let e = t;
								r(new Q(e.error.code, e.error.message, e.error.data));
							}
						} else {
							let t = e.type === "response" ? "Response" : "Error";
							this._onerror(/* @__PURE__ */ Error(`${t} handler missing for request ${n}`));
						}
					} else await this._transport?.send(e.message, { relatedRequestId: t.requestId });
				}
				let i = await this._taskStore.getTask(r, t.sessionId);
				if (!i) throw new Q(J.InvalidParams, `Task not found: ${r}`);
				if (!$(i.status)) return await this._waitForTaskUpdate(r, t.signal, t.sessionId), await n();
				if ($(i.status)) {
					let e = await this._taskStore.getTaskResult(r, t.sessionId);
					return this._clearTaskQueue(r, t.sessionId), {
						...e,
						_meta: {
							...e._meta,
							[V]: { taskId: r }
						}
					};
				}
				return await n();
			};
			return await n();
		}), this.setRequestHandler(Ro, async (e, t) => {
			try {
				let { tasks: n, nextCursor: r } = await this._taskStore.listTasks(e.params?.cursor, t.sessionId);
				return {
					tasks: n,
					nextCursor: r,
					_meta: {}
				};
			} catch (e) {
				throw new Q(J.InvalidParams, `Failed to list tasks: ${e instanceof Error ? e.message : String(e)}`);
			}
		}), this.setRequestHandler(Bo, async (e, t) => {
			try {
				let n = await this._taskStore.getTask(e.params.taskId, t.sessionId);
				if (!n) throw new Q(J.InvalidParams, `Task not found: ${e.params.taskId}`);
				if ($(n.status)) throw new Q(J.InvalidParams, `Cannot cancel task in terminal status: ${n.status}`);
				await this._taskStore.updateTaskStatus(e.params.taskId, "cancelled", "Client cancelled task execution.", t.sessionId), this._clearTaskQueue(e.params.taskId, t.sessionId);
				let r = await this._taskStore.getTask(e.params.taskId, t.sessionId);
				if (!r) throw new Q(J.InvalidParams, `Task not found after cancellation: ${e.params.taskId}`);
				return {
					_meta: {},
					...r
				};
			} catch (e) {
				throw e instanceof Q ? e : new Q(J.InvalidRequest, `Failed to cancel task: ${e instanceof Error ? e.message : String(e)}`);
			}
		}));
	}
	async _oncancel(e) {
		e.params.requestId && this._requestHandlerAbortControllers.get(e.params.requestId)?.abort(e.params.reason);
	}
	_setupTimeout(e, t, n, r, i = !1) {
		this._timeoutInfo.set(e, {
			timeoutId: setTimeout(r, t),
			startTime: Date.now(),
			timeout: t,
			maxTotalTimeout: n,
			resetTimeoutOnProgress: i,
			onTimeout: r
		});
	}
	_resetTimeout(e) {
		let t = this._timeoutInfo.get(e);
		if (!t) return !1;
		let n = Date.now() - t.startTime;
		if (t.maxTotalTimeout && n >= t.maxTotalTimeout) throw this._timeoutInfo.delete(e), Q.fromError(J.RequestTimeout, "Maximum total timeout exceeded", {
			maxTotalTimeout: t.maxTotalTimeout,
			totalElapsed: n
		});
		return clearTimeout(t.timeoutId), t.timeoutId = setTimeout(t.onTimeout, t.timeout), !0;
	}
	_cleanupTimeout(e) {
		let t = this._timeoutInfo.get(e);
		t && (clearTimeout(t.timeoutId), this._timeoutInfo.delete(e));
	}
	async connect(e) {
		if (this._transport) throw Error("Already connected to a transport. Call close() before connecting to a new transport, or use a separate Protocol instance per connection.");
		this._transport = e;
		let t = this.transport?.onclose;
		this._transport.onclose = () => {
			t?.(), this._onclose();
		};
		let n = this.transport?.onerror;
		this._transport.onerror = (e) => {
			n?.(e), this._onerror(e);
		};
		let r = this._transport?.onmessage;
		this._transport.onmessage = (e, t) => {
			r?.(e, t), io(e) || oo(e) ? this._onresponse(e) : eo(e) ? this._onrequest(e, t) : no(e) ? this._onnotification(e) : this._onerror(/* @__PURE__ */ Error(`Unknown message type: ${JSON.stringify(e)}`));
		}, await this._transport.start();
	}
	_onclose() {
		let e = this._responseHandlers;
		this._responseHandlers = /* @__PURE__ */ new Map(), this._progressHandlers.clear(), this._taskProgressTokens.clear(), this._pendingDebouncedNotifications.clear();
		for (let e of this._timeoutInfo.values()) clearTimeout(e.timeoutId);
		this._timeoutInfo.clear();
		for (let e of this._requestHandlerAbortControllers.values()) e.abort();
		this._requestHandlerAbortControllers.clear();
		let t = Q.fromError(J.ConnectionClosed, "Connection closed");
		this._transport = void 0, this.onclose?.();
		for (let n of e.values()) n(t);
	}
	_onerror(e) {
		this.onerror?.(e);
	}
	_onnotification(e) {
		let t = this._notificationHandlers.get(e.method) ?? this.fallbackNotificationHandler;
		t !== void 0 && Promise.resolve().then(() => t(e)).catch((e) => this._onerror(/* @__PURE__ */ Error(`Uncaught error in notification handler: ${e}`)));
	}
	_onrequest(e, t) {
		let n = this._requestHandlers.get(e.method) ?? this.fallbackRequestHandler, r = this._transport, i = e.params?._meta?.[V]?.taskId, a = r?.sessionId, o = this._taskStore, s = !0, c;
		if (i && o && this._taskMessageQueue && a !== void 0 && (s = !1, c = (async () => {
			if (!await o.getTask(i, a)) throw new Q(J.InvalidParams, `Task not found: ${i}`);
			s = !0;
		})()), n === void 0) {
			let t = {
				jsonrpc: "2.0",
				id: e.id,
				error: {
					code: J.MethodNotFound,
					message: "Method not found"
				}
			};
			if (i && c) {
				let e = {
					type: "error",
					message: t,
					timestamp: Date.now()
				};
				c.then(() => this._enqueueTaskMessage(i, e, a), () => r?.send(t)).catch((e) => this._onerror(/* @__PURE__ */ Error(`Failed to send an error response: ${e}`)));
			} else i && this._taskMessageQueue ? this._enqueueTaskMessage(i, {
				type: "error",
				message: t,
				timestamp: Date.now()
			}, r?.sessionId).catch((e) => this._onerror(/* @__PURE__ */ Error(`Failed to enqueue error response: ${e}`))) : r?.send(t).catch((e) => this._onerror(/* @__PURE__ */ Error(`Failed to send an error response: ${e}`)));
			return;
		}
		let l = new AbortController();
		this._requestHandlerAbortControllers.set(e.id, l);
		let u = Za(e.params) ? e.params.task : void 0, d = this._taskStore ? this.requestTaskStore(e, r?.sessionId) : void 0, f = {
			signal: l.signal,
			sessionId: r?.sessionId,
			_meta: e.params?._meta,
			sendNotification: async (t) => {
				if (l.signal.aborted) return;
				let n = { relatedRequestId: e.id };
				i && (n.relatedTask = { taskId: i }), await this.notification(t, n);
			},
			sendRequest: async (t, n, r) => {
				if (l.signal.aborted) throw new Q(J.ConnectionClosed, "Request was cancelled");
				let a = {
					...r,
					relatedRequestId: e.id
				};
				i && !a.relatedTask && (a.relatedTask = { taskId: i });
				let o = a.relatedTask?.taskId ?? i;
				return o && d && await d.updateTaskStatus(o, "input_required"), await this.request(t, n, a);
			},
			authInfo: t?.authInfo,
			requestId: e.id,
			requestInfo: t?.requestInfo,
			taskId: i,
			taskStore: d,
			taskRequestedTtl: u?.ttl,
			closeSSEStream: t?.closeSSEStream,
			closeStandaloneSSEStream: t?.closeStandaloneSSEStream
		};
		(c ?? Promise.resolve()).then(() => {
			if (c && l.signal.aborted) throw new Q(J.ConnectionClosed, "Request was cancelled");
			u && this.assertTaskHandlerCapability(e.method);
		}).then(() => n(e, f)).then(async (t) => {
			if (l.signal.aborted) return;
			let n = {
				result: t,
				jsonrpc: "2.0",
				id: e.id
			};
			i && this._taskMessageQueue ? await this._enqueueTaskMessage(i, {
				type: "response",
				message: n,
				timestamp: Date.now()
			}, r?.sessionId) : await r?.send(n);
		}, async (t) => {
			if (l.signal.aborted) return;
			let n = {
				jsonrpc: "2.0",
				id: e.id,
				error: {
					code: Number.isSafeInteger(t.code) ? t.code : J.InternalError,
					message: t.message ?? "Internal error",
					...t.data !== void 0 && { data: t.data }
				}
			};
			i && this._taskMessageQueue && s ? await this._enqueueTaskMessage(i, {
				type: "error",
				message: n,
				timestamp: Date.now()
			}, r?.sessionId) : await r?.send(n);
		}).catch((e) => this._onerror(/* @__PURE__ */ Error(`Failed to send response: ${e}`))).finally(() => {
			this._requestHandlerAbortControllers.get(e.id) === l && this._requestHandlerAbortControllers.delete(e.id);
		});
	}
	_onprogress(e) {
		let { progressToken: t, ...n } = e.params, r = Number(t), i = this._progressHandlers.get(r);
		if (!i) {
			this._onerror(/* @__PURE__ */ Error(`Received a progress notification for an unknown token: ${JSON.stringify(e)}`));
			return;
		}
		let a = this._responseHandlers.get(r), o = this._timeoutInfo.get(r);
		if (o && a && o.resetTimeoutOnProgress) try {
			this._resetTimeout(r);
		} catch (e) {
			this._responseHandlers.delete(r), this._progressHandlers.delete(r), this._cleanupTimeout(r), a(e);
			return;
		}
		i(n);
	}
	_onresponse(e) {
		let t = Number(e.id), n = this._requestResolvers.get(t);
		if (n) {
			this._requestResolvers.delete(t), io(e) ? n(e) : n(new Q(e.error.code, e.error.message, e.error.data));
			return;
		}
		let r = this._responseHandlers.get(t);
		if (r === void 0) {
			this._onerror(/* @__PURE__ */ Error(`Received a response for an unknown message ID: ${JSON.stringify(e)}`));
			return;
		}
		this._responseHandlers.delete(t), this._cleanupTimeout(t);
		let i = !1;
		if (io(e) && e.result && typeof e.result == "object") {
			let n = e.result;
			if (n.task && typeof n.task == "object") {
				let e = n.task;
				typeof e.taskId == "string" && (i = !0, this._taskProgressTokens.set(e.taskId, t));
			}
		}
		i || this._progressHandlers.delete(t), io(e) ? r(e) : r(Q.fromError(e.error.code, e.error.message, e.error.data));
	}
	get transport() {
		return this._transport;
	}
	async close() {
		await this._transport?.close();
	}
	async *requestStream(e, t, n) {
		let { task: r } = n ?? {};
		if (!r) {
			try {
				yield {
					type: "result",
					result: await this.request(e, t, n)
				};
			} catch (e) {
				yield {
					type: "error",
					error: e instanceof Q ? e : new Q(J.InternalError, String(e))
				};
			}
			return;
		}
		let i;
		try {
			let r = await this.request(e, Mo, n);
			if (r.task) i = r.task.taskId, yield {
				type: "taskCreated",
				task: r.task
			};
			else throw new Q(J.InternalError, "Task creation did not return a task");
			for (;;) {
				let e = await this.getTask({ taskId: i }, n);
				if (yield {
					type: "taskStatus",
					task: e
				}, $(e.status)) {
					e.status === "completed" ? yield {
						type: "result",
						result: await this.getTaskResult({ taskId: i }, t, n)
					} : e.status === "failed" ? yield {
						type: "error",
						error: new Q(J.InternalError, `Task ${i} failed`)
					} : e.status === "cancelled" && (yield {
						type: "error",
						error: new Q(J.InternalError, `Task ${i} was cancelled`)
					});
					return;
				}
				if (e.status === "input_required") {
					yield {
						type: "result",
						result: await this.getTaskResult({ taskId: i }, t, n)
					};
					return;
				}
				let r = e.pollInterval ?? this._options?.defaultTaskPollInterval ?? 1e3;
				await new Promise((e) => setTimeout(e, r)), n?.signal?.throwIfAborted();
			}
		} catch (e) {
			yield {
				type: "error",
				error: e instanceof Q ? e : new Q(J.InternalError, String(e))
			};
		}
	}
	request(e, t, n) {
		let { relatedRequestId: r, resumptionToken: i, onresumptiontoken: a, task: o, relatedTask: s } = n ?? {};
		return new Promise((c, l) => {
			let u = (e) => {
				l(e);
			};
			if (!this._transport) {
				u(/* @__PURE__ */ Error("Not connected"));
				return;
			}
			if (this._options?.enforceStrictCapabilities === !0) try {
				this.assertCapabilityForMethod(e.method), o && this.assertTaskCapability(e.method);
			} catch (e) {
				u(e);
				return;
			}
			n?.signal?.throwIfAborted();
			let d = this._requestMessageId++, f = {
				...e,
				jsonrpc: "2.0",
				id: d
			};
			n?.onprogress && (this._progressHandlers.set(d, n.onprogress), f.params = {
				...e.params,
				_meta: {
					...e.params?._meta || {},
					progressToken: d
				}
			}), o && (f.params = {
				...f.params,
				task: o
			}), s && (f.params = {
				...f.params,
				_meta: {
					...f.params?._meta || {},
					[V]: s
				}
			});
			let p = (e) => {
				this._responseHandlers.delete(d), this._progressHandlers.delete(d), this._cleanupTimeout(d), this._transport?.send({
					jsonrpc: "2.0",
					method: "notifications/cancelled",
					params: {
						requestId: d,
						reason: String(e)
					}
				}, {
					relatedRequestId: r,
					resumptionToken: i,
					onresumptiontoken: a
				}).catch((e) => this._onerror(/* @__PURE__ */ Error(`Failed to send cancellation: ${e}`))), l(e instanceof Q ? e : new Q(J.RequestTimeout, String(e)));
			};
			this._responseHandlers.set(d, (e) => {
				if (!n?.signal?.aborted) {
					if (e instanceof Error) return l(e);
					try {
						let n = _c(t, e.result);
						n.success ? c(n.data) : l(n.error);
					} catch (e) {
						l(e);
					}
				}
			}), n?.signal?.addEventListener("abort", () => {
				p(n?.signal?.reason);
			});
			let m = n?.timeout ?? 6e4;
			this._setupTimeout(d, m, n?.maxTotalTimeout, () => p(Q.fromError(J.RequestTimeout, "Request timed out", { timeout: m })), n?.resetTimeoutOnProgress ?? !1);
			let h = s?.taskId;
			h ? (this._requestResolvers.set(d, (e) => {
				let t = this._responseHandlers.get(d);
				t ? t(e) : this._onerror(/* @__PURE__ */ Error(`Response handler missing for side-channeled request ${d}`));
			}), this._enqueueTaskMessage(h, {
				type: "request",
				message: f,
				timestamp: Date.now()
			}).catch((e) => {
				this._cleanupTimeout(d), l(e);
			})) : this._transport.send(f, {
				relatedRequestId: r,
				resumptionToken: i,
				onresumptiontoken: a
			}).catch((e) => {
				this._cleanupTimeout(d), l(e);
			});
		});
	}
	async getTask(e, t) {
		return this.request({
			method: "tasks/get",
			params: e
		}, Io, t);
	}
	async getTaskResult(e, t, n) {
		return this.request({
			method: "tasks/result",
			params: e
		}, t, n);
	}
	async listTasks(e, t) {
		return this.request({
			method: "tasks/list",
			params: e
		}, zo, t);
	}
	async cancelTask(e, t) {
		return this.request({
			method: "tasks/cancel",
			params: e
		}, Vo, t);
	}
	async notification(e, t) {
		if (!this._transport) throw Error("Not connected");
		this.assertNotificationCapability(e.method);
		let n = t?.relatedTask?.taskId;
		if (n) {
			let r = {
				...e,
				jsonrpc: "2.0",
				params: {
					...e.params,
					_meta: {
						...e.params?._meta || {},
						[V]: t.relatedTask
					}
				}
			};
			await this._enqueueTaskMessage(n, {
				type: "notification",
				message: r,
				timestamp: Date.now()
			});
			return;
		}
		if ((this._options?.debouncedNotificationMethods ?? []).includes(e.method) && !e.params && !t?.relatedRequestId && !t?.relatedTask) {
			if (this._pendingDebouncedNotifications.has(e.method)) return;
			this._pendingDebouncedNotifications.add(e.method), Promise.resolve().then(() => {
				if (this._pendingDebouncedNotifications.delete(e.method), !this._transport) return;
				let n = {
					...e,
					jsonrpc: "2.0"
				};
				t?.relatedTask && (n = {
					...n,
					params: {
						...n.params,
						_meta: {
							...n.params?._meta || {},
							[V]: t.relatedTask
						}
					}
				}), this._transport?.send(n, t).catch((e) => this._onerror(e));
			});
			return;
		}
		let r = {
			...e,
			jsonrpc: "2.0"
		};
		t?.relatedTask && (r = {
			...r,
			params: {
				...r.params,
				_meta: {
					...r.params?._meta || {},
					[V]: t.relatedTask
				}
			}
		}), await this._transport.send(r, t);
	}
	setRequestHandler(e, t) {
		let n = bc(e);
		this.assertRequestHandlerCapability(n), this._requestHandlers.set(n, (n, r) => {
			let i = xc(e, n);
			return Promise.resolve(t(i, r));
		});
	}
	removeRequestHandler(e) {
		this._requestHandlers.delete(e);
	}
	assertCanSetRequestHandler(e) {
		if (this._requestHandlers.has(e)) throw Error(`A request handler for ${e} already exists, which would be overridden`);
	}
	setNotificationHandler(e, t) {
		let n = bc(e);
		this._notificationHandlers.set(n, (n) => {
			let r = xc(e, n);
			return Promise.resolve(t(r));
		});
	}
	removeNotificationHandler(e) {
		this._notificationHandlers.delete(e);
	}
	_cleanupTaskProgressHandler(e) {
		let t = this._taskProgressTokens.get(e);
		t !== void 0 && (this._progressHandlers.delete(t), this._taskProgressTokens.delete(e));
	}
	async _enqueueTaskMessage(e, t, n) {
		if (!this._taskStore || !this._taskMessageQueue) throw Error("Cannot enqueue task message: taskStore and taskMessageQueue are not configured");
		let r = this._options?.maxTaskQueueSize;
		await this._taskMessageQueue.enqueue(e, t, n ?? this._transport?.sessionId, r);
	}
	async _clearTaskQueue(e, t) {
		if (this._taskMessageQueue) {
			let n = await this._taskMessageQueue.dequeueAll(e, t);
			for (let t of n) if (t.type === "request" && eo(t.message)) {
				let n = t.message.id, r = this._requestResolvers.get(n);
				r ? (r(new Q(J.InternalError, "Task cancelled or completed")), this._requestResolvers.delete(n)) : this._onerror(/* @__PURE__ */ Error(`Resolver missing for request ${n} during task ${e} cleanup`));
			}
		}
	}
	async _waitForTaskUpdate(e, t, n) {
		let r = this._options?.defaultTaskPollInterval ?? 1e3;
		try {
			let t = await this._taskStore?.getTask(e, n);
			t?.pollInterval && (r = t.pollInterval);
		} catch {}
		return new Promise((e, n) => {
			if (t.aborted) {
				n(new Q(J.InvalidRequest, "Request cancelled"));
				return;
			}
			let i = setTimeout(e, r);
			t.addEventListener("abort", () => {
				clearTimeout(i), n(new Q(J.InvalidRequest, "Request cancelled"));
			}, { once: !0 });
		});
	}
	requestTaskStore(e, t) {
		let n = this._taskStore;
		if (!n) throw Error("No task store configured");
		return {
			createTask: async (r) => {
				if (!e) throw Error("No request provided");
				return await n.createTask(r, e.id, {
					method: e.method,
					params: e.params
				}, t);
			},
			getTask: async (e) => {
				let r = await n.getTask(e, t);
				if (!r) throw new Q(J.InvalidParams, "Failed to retrieve task: Task not found");
				return r;
			},
			storeTaskResult: async (e, r, i) => {
				await n.storeTaskResult(e, r, i, t);
				let a = await n.getTask(e, t);
				if (a) {
					let t = Po.parse({
						method: "notifications/tasks/status",
						params: a
					});
					await this.notification(t), $(a.status) && this._cleanupTaskProgressHandler(e);
				}
			},
			getTaskResult: (e) => n.getTaskResult(e, t),
			updateTaskStatus: async (e, r, i) => {
				let a = await n.getTask(e, t);
				if (!a) throw new Q(J.InvalidParams, `Task "${e}" not found - it may have been cleaned up`);
				if ($(a.status)) throw new Q(J.InvalidParams, `Cannot update task "${e}" from terminal status "${a.status}" to "${r}". Terminal states (completed, failed, cancelled) cannot transition to other states.`);
				await n.updateTaskStatus(e, r, i, t);
				let o = await n.getTask(e, t);
				if (o) {
					let t = Po.parse({
						method: "notifications/tasks/status",
						params: o
					});
					await this.notification(t), $(o.status) && this._cleanupTaskProgressHandler(e);
				}
			},
			listTasks: (e) => n.listTasks(e, t)
		};
	}
};
// node_modules/@modelcontextprotocol/ext-apps/dist/src/app-bridge.js
((t) => typeof e < "u" ? e : typeof Proxy < "u" ? new Proxy(t, { get: (t, n) => (typeof e < "u" ? e : t)[n] }) : t)(function(t) {
	if (typeof e < "u") return e.apply(this, arguments);
	throw Error("Dynamic require of \"" + t + "\" is not supported");
});
var Cc = class extends Sc {
	_registeredMethods = /* @__PURE__ */ new Set();
	_eventSlots = /* @__PURE__ */ new Map();
	onEventDispatch(e, t) {}
	_ensureEventSlot(e) {
		let t = this._eventSlots.get(e);
		if (!t) {
			let n = this.eventSchemas[e];
			if (!n) throw Error(`Unknown event: ${String(e)}`);
			t = { listeners: [] }, this._eventSlots.set(e, t);
			let r = n.shape.method.value;
			this._registeredMethods.add(r);
			let i = t;
			super.setNotificationHandler(n, (t) => {
				let n = t.params;
				this.onEventDispatch(e, n), i.onHandler?.(n);
				for (let e of [...i.listeners]) e(n);
			});
		}
		return t;
	}
	setEventHandler(e, t) {
		let n = this._ensureEventSlot(e);
		n.onHandler && t && console.warn(`[MCP Apps] on${String(e)} handler replaced. Use addEventListener("${String(e)}", …) to add multiple listeners without replacing.`), n.onHandler = t;
	}
	getEventHandler(e) {
		return this._eventSlots.get(e)?.onHandler;
	}
	addEventListener(e, t) {
		this._ensureEventSlot(e).listeners.push(t);
	}
	removeEventListener(e, t) {
		let n = this._eventSlots.get(e);
		if (!n) return;
		let r = n.listeners.indexOf(t);
		r !== -1 && n.listeners.splice(r, 1);
	}
	setRequestHandler = (e, t) => {
		this._assertMethodNotRegistered(e, "setRequestHandler"), super.setRequestHandler(e, t);
	};
	setNotificationHandler = (e, t) => {
		this._assertMethodNotRegistered(e, "setNotificationHandler"), super.setNotificationHandler(e, t);
	};
	warnIfRequestHandlerReplaced(e, t, n) {
		t && n && console.warn(`[MCP Apps] ${e} handler replaced. Previous handler will no longer be called.`);
	}
	replaceRequestHandler = (e, t) => {
		let n = e.shape.method.value;
		this._registeredMethods.add(n), super.setRequestHandler(e, t);
	};
	_assertMethodNotRegistered(e, t) {
		let n = e.shape.method.value;
		if (this._registeredMethods.has(n)) throw Error(`Handler for "${n}" already registered (via ${t}). Use addEventListener() to attach multiple listeners, or the on* setter for replace semantics.`);
		this._registeredMethods.add(n);
	}
}, wc = "2026-01-26", Tc = I([z("light"), z("dark")]).describe("Color theme preference for the host environment."), Ec = I([
	z("inline"),
	z("fullscreen"),
	z("pip")
]).describe("Display mode for UI presentation."), Dc = L(I([
	z("--color-background-primary"),
	z("--color-background-secondary"),
	z("--color-background-tertiary"),
	z("--color-background-inverse"),
	z("--color-background-ghost"),
	z("--color-background-info"),
	z("--color-background-danger"),
	z("--color-background-success"),
	z("--color-background-warning"),
	z("--color-background-disabled"),
	z("--color-text-primary"),
	z("--color-text-secondary"),
	z("--color-text-tertiary"),
	z("--color-text-inverse"),
	z("--color-text-ghost"),
	z("--color-text-info"),
	z("--color-text-danger"),
	z("--color-text-success"),
	z("--color-text-warning"),
	z("--color-text-disabled"),
	z("--color-border-primary"),
	z("--color-border-secondary"),
	z("--color-border-tertiary"),
	z("--color-border-inverse"),
	z("--color-border-ghost"),
	z("--color-border-info"),
	z("--color-border-danger"),
	z("--color-border-success"),
	z("--color-border-warning"),
	z("--color-border-disabled"),
	z("--color-ring-primary"),
	z("--color-ring-secondary"),
	z("--color-ring-inverse"),
	z("--color-ring-info"),
	z("--color-ring-danger"),
	z("--color-ring-success"),
	z("--color-ring-warning"),
	z("--font-sans"),
	z("--font-mono"),
	z("--font-weight-normal"),
	z("--font-weight-medium"),
	z("--font-weight-semibold"),
	z("--font-weight-bold"),
	z("--font-text-xs-size"),
	z("--font-text-sm-size"),
	z("--font-text-md-size"),
	z("--font-text-lg-size"),
	z("--font-heading-xs-size"),
	z("--font-heading-sm-size"),
	z("--font-heading-md-size"),
	z("--font-heading-lg-size"),
	z("--font-heading-xl-size"),
	z("--font-heading-2xl-size"),
	z("--font-heading-3xl-size"),
	z("--font-text-xs-line-height"),
	z("--font-text-sm-line-height"),
	z("--font-text-md-line-height"),
	z("--font-text-lg-line-height"),
	z("--font-heading-xs-line-height"),
	z("--font-heading-sm-line-height"),
	z("--font-heading-md-line-height"),
	z("--font-heading-lg-line-height"),
	z("--font-heading-xl-line-height"),
	z("--font-heading-2xl-line-height"),
	z("--font-heading-3xl-line-height"),
	z("--border-radius-xs"),
	z("--border-radius-sm"),
	z("--border-radius-md"),
	z("--border-radius-lg"),
	z("--border-radius-xl"),
	z("--border-radius-full"),
	z("--border-width-regular"),
	z("--shadow-hairline"),
	z("--shadow-sm"),
	z("--shadow-md"),
	z("--shadow-lg")
]).describe("CSS variable keys available to MCP apps for theming.").describe("Style variables for theming MCP apps.\n\nIndividual style keys are optional - hosts may provide any subset of these values.\nValues are strings containing CSS values (colors, sizes, font stacks, etc.).\n\nNote: This type uses `Record<K, string | undefined>` rather than `Partial<Record<K, string>>`\nfor compatibility with Zod schema generation. Both are functionally equivalent for validation."), I([O(), ra()]).describe("Style variables for theming MCP apps.\n\nIndividual style keys are optional - hosts may provide any subset of these values.\nValues are strings containing CSS values (colors, sizes, font stacks, etc.).\n\nNote: This type uses `Record<K, string | undefined>` rather than `Partial<Record<K, string>>`\nfor compatibility with Zod schema generation. Both are functionally equivalent for validation.")).describe("Style variables for theming MCP apps.\n\nIndividual style keys are optional - hosts may provide any subset of these values.\nValues are strings containing CSS values (colors, sizes, font stacks, etc.).\n\nNote: This type uses `Record<K, string | undefined>` rather than `Partial<Record<K, string>>`\nfor compatibility with Zod schema generation. Both are functionally equivalent for validation."), Oc = P({
	method: z("ui/open-link"),
	params: P({ url: O().describe("URL to open in the host's browser") })
});
P({ isError: j().optional().describe("True if the host failed to open the URL (e.g., due to security policy).") }).passthrough(), P({ isError: j().optional().describe("True if the download failed (e.g., user cancelled or host denied).") }).passthrough(), P({ isError: j().optional().describe("True if the host rejected or failed to deliver the message.") }).passthrough();
var kc = P({
	method: z("ui/notifications/sandbox-proxy-ready"),
	params: P({})
}), Ac = P({
	connectDomains: N(O()).optional().describe("Origins for network requests (fetch/XHR/WebSocket).\n\n- Maps to CSP `connect-src` directive\n- Empty or omitted → no network connections (secure default)"),
	resourceDomains: N(O()).optional().describe("Origins for static resources (images, scripts, stylesheets, fonts, media).\n\n- Maps to CSP `img-src`, `script-src`, `style-src`, `font-src`, `media-src` directives\n- Wildcard subdomains supported: `https://*.example.com`\n- Empty or omitted → no network resources (secure default)"),
	frameDomains: N(O()).optional().describe("Origins for nested iframes.\n\n- Maps to CSP `frame-src` directive\n- Empty or omitted → no nested iframes allowed (`frame-src 'none'`)"),
	baseUriDomains: N(O()).optional().describe("Allowed base URIs for the document.\n\n- Maps to CSP `base-uri` directive\n- Empty or omitted → only same origin allowed (`base-uri 'self'`)")
}), jc = P({
	camera: P({}).optional().describe("Request camera access.\n\nMaps to Permission Policy `camera` feature."),
	microphone: P({}).optional().describe("Request microphone access.\n\nMaps to Permission Policy `microphone` feature."),
	geolocation: P({}).optional().describe("Request geolocation access.\n\nMaps to Permission Policy `geolocation` feature."),
	clipboardWrite: P({}).optional().describe("Request clipboard write access.\n\nMaps to Permission Policy `clipboard-write` feature.")
}), Mc = P({
	method: z("ui/notifications/size-changed"),
	params: P({
		width: A().optional().describe("New width in pixels."),
		height: A().optional().describe("New height in pixels.")
	})
});
P({
	method: z("ui/notifications/tool-input"),
	params: P({ arguments: L(O(), M().describe("Complete tool call arguments as key-value pairs.")).optional().describe("Complete tool call arguments as key-value pairs.") })
}), P({
	method: z("ui/notifications/tool-input-partial"),
	params: P({ arguments: L(O(), M().describe("Partial tool call arguments (incomplete, may change).")).optional().describe("Partial tool call arguments (incomplete, may change).") })
}), P({
	method: z("ui/notifications/tool-cancelled"),
	params: P({ reason: O().optional().describe("Optional reason for the cancellation (e.g., \"user action\", \"timeout\").") })
});
var Nc = P({ fonts: O().optional() }), Pc = P({
	variables: Dc.optional().describe("CSS variables for theming the app."),
	css: Nc.optional().describe("CSS blocks that apps can inject.")
});
P({
	method: z("ui/resource-teardown"),
	params: P({})
});
var Fc = L(O(), M()), Ic = P({
	text: P({}).optional().describe("Host supports text content blocks."),
	image: P({}).optional().describe("Host supports image content blocks."),
	audio: P({}).optional().describe("Host supports audio content blocks."),
	resource: P({}).optional().describe("Host supports resource content blocks."),
	resourceLink: P({}).optional().describe("Host supports resource link content blocks."),
	structuredContent: P({}).optional().describe("Host supports structured content.")
}), Lc = P({
	method: z("ui/notifications/request-teardown"),
	params: P({}).optional()
}), Rc = P({
	experimental: P({}).optional().describe("Experimental features (structure TBD)."),
	openLinks: P({}).optional().describe("Host supports opening external URLs."),
	downloadFile: P({}).optional().describe("Host supports file downloads via ui/download-file."),
	serverTools: P({ listChanged: j().optional().describe("Host supports tools/list_changed notifications.") }).optional().describe("Host can proxy tool calls to the MCP server."),
	serverResources: P({ listChanged: j().optional().describe("Host supports resources/list_changed notifications.") }).optional().describe("Host can proxy resource reads to the MCP server."),
	logging: P({}).optional().describe("Host accepts log messages."),
	sandbox: P({
		permissions: jc.optional().describe("Permissions granted by the host (camera, microphone, geolocation)."),
		csp: Ac.optional().describe("CSP domains approved by the host.")
	}).optional().describe("Sandbox configuration applied by the host."),
	updateModelContext: Ic.optional().describe("Host accepts context updates (ui/update-model-context) to be included in the model's context for future turns."),
	message: Ic.optional().describe("Host supports receiving content messages (ui/message) from the view."),
	sampling: P({ tools: P({}).optional().describe("Host supports tool use via `tools` and `toolChoice` parameters.") }).optional().describe("Host supports LLM sampling (sampling/createMessage) from the view.\nMirrors the MCP `ClientCapabilities.sampling` shape so hosts can pass it through.")
}), zc = P({
	experimental: P({}).optional().describe("Experimental features (structure TBD)."),
	tools: P({ listChanged: j().optional().describe("App supports tools/list_changed notifications.") }).optional().describe("App exposes MCP-style tools that the host can call."),
	availableDisplayModes: N(Ec).optional().describe("Display modes the app supports.")
}), Bc = P({
	method: z("ui/notifications/initialized"),
	params: P({}).optional()
});
P({
	csp: Ac.optional().describe("Content Security Policy configuration for UI resources."),
	permissions: jc.optional().describe("Sandbox permissions requested by the UI resource."),
	domain: O().optional().describe("Dedicated origin for view sandbox.\n\nUseful when views need stable, dedicated origins for OAuth callbacks, CORS policies, or API key allowlists.\n\n**Host-dependent:** The format and validation rules for this field are determined by each host. Servers MUST consult host-specific documentation for the expected domain format. Common patterns include:\n- Hash-based subdomains (e.g., `{hash}.claudemcpcontent.com`)\n- URL-derived subdomains (e.g., `www-example-com.oaiusercontent.com`)\n\nIf omitted, host uses default sandbox origin (typically per-conversation)."),
	prefersBorder: j().optional().describe("Visual boundary preference - true if view prefers a visible border.\n\nBoolean requesting whether a visible border and background is provided by the host. Specifying an explicit value for this is recommended because hosts' defaults may vary.\n\n- `true`: request visible border + background\n- `false`: request no visible border + background\n- omitted: host decides border")
});
var Vc = P({
	method: z("ui/request-display-mode"),
	params: P({ mode: Ec.describe("The display mode being requested.") })
});
P({ mode: Ec.describe("The display mode that was actually set. May differ from requested if not supported.") }).passthrough();
var Hc = I([z("model"), z("app")]).describe("Tool visibility scope - who can access the tool.");
P({
	resourceUri: O().optional(),
	visibility: N(Hc).optional().describe("Who can access this tool. Default: [\"model\", \"app\"]\n- \"model\": Tool visible to and callable by the agent\n- \"app\": Tool callable by the app from this server only"),
	csp: ca().optional(),
	permissions: ca().optional()
}), P({ mimeTypes: N(O()).optional().describe("Array of supported MIME types for UI resources.\nMust include `\"text/html;profile=mcp-app\"` for MCP Apps support.") });
var Uc = P({
	method: z("ui/download-file"),
	params: P({ contents: N(I([bs, xs])).describe("Resource contents to download — embedded (inline data) or linked (host fetches). Uses standard MCP resource types.") })
}), Wc = P({
	method: z("ui/message"),
	params: P({
		role: z("user").describe("Message role, currently only \"user\" is supported."),
		content: N(Ss).describe("Message content blocks (text, image, etc.).")
	})
});
P({
	method: z("ui/notifications/sandbox-resource-ready"),
	params: P({
		html: O().describe("HTML content to load into the inner iframe."),
		sandbox: O().optional().describe("Optional override for the inner iframe's sandbox attribute."),
		csp: Ac.optional().describe("CSP configuration from resource metadata."),
		permissions: jc.optional().describe("Sandbox permissions from resource metadata.")
	})
}), P({
	method: z("ui/notifications/tool-result"),
	params: Z.describe("Standard MCP tool execution result.")
});
var Gc = P({
	toolInfo: P({
		id: Qa.optional().describe("JSON-RPC id of the tools/call request."),
		tool: Os.describe("Tool definition including name, inputSchema, etc.")
	}).optional().describe("Metadata of the tool call that instantiated this App."),
	theme: Tc.optional().describe("Current color theme preference."),
	styles: Pc.optional().describe("Style configuration for theming the app."),
	displayMode: Ec.optional().describe("How the UI is currently displayed."),
	availableDisplayModes: N(Ec).optional().describe("Display modes the host supports."),
	containerDimensions: I([P({ height: A().describe("Fixed container height in pixels.") }), P({ maxHeight: I([A(), ra()]).optional().describe("Maximum container height in pixels.") })]).and(I([P({ width: A().describe("Fixed container width in pixels.") }), P({ maxWidth: I([A(), ra()]).optional().describe("Maximum container width in pixels.") })])).optional().describe("Container dimensions. Represents the dimensions of the iframe or other\ncontainer holding the app. Specify either width or maxWidth, and either height or maxHeight."),
	locale: O().optional().describe("User's language and region preference in BCP 47 format."),
	timeZone: O().optional().describe("User's timezone in IANA format."),
	userAgent: O().optional().describe("Host application identifier."),
	platform: I([
		z("web"),
		z("desktop"),
		z("mobile")
	]).optional().describe("Platform type for responsive design decisions."),
	deviceCapabilities: P({
		touch: j().optional().describe("Whether the device supports touch input."),
		hover: j().optional().describe("Whether the device supports hover interactions.")
	}).optional().describe("Device input capabilities."),
	safeAreaInsets: P({
		top: A().describe("Top safe area inset in pixels."),
		right: A().describe("Right safe area inset in pixels."),
		bottom: A().describe("Bottom safe area inset in pixels."),
		left: A().describe("Left safe area inset in pixels.")
	}).optional().describe("Mobile safe area boundaries in pixels.")
}).passthrough();
P({
	method: z("ui/notifications/host-context-changed"),
	params: Gc.describe("Partial context update containing only changed fields.")
});
var Kc = P({
	method: z("ui/update-model-context"),
	params: P({
		content: N(Ss).optional().describe("Context content blocks (text, image, etc.)."),
		structuredContent: L(O(), M().describe("Structured content for machine-readable context data.")).optional().describe("Structured content for machine-readable context data.")
	})
}), qc = P({
	method: z("ui/initialize"),
	params: P({
		appInfo: po.describe("App identification (name and version)."),
		appCapabilities: zc.describe("Features and capabilities this app provides."),
		protocolVersion: O().describe("Protocol version this app supports.")
	})
});
P({
	protocolVersion: O().describe("Negotiated protocol version string (e.g., \"2025-11-21\")."),
	hostInfo: po.describe("Host application identification and version."),
	hostCapabilities: Rc.describe("Features and capabilities provided by the host."),
	hostContext: Gc.describe("Rich context about the host environment.")
}).passthrough();
var Jc = [wc], Yc = class extends Cc {
	_client;
	_hostInfo;
	_capabilities;
	_appCapabilities;
	_hostContext = {};
	_appInfo;
	_initializedReceived = !1;
	_baseReplaceRequestHandler = this.replaceRequestHandler;
	replaceRequestHandler = (e, t) => {
		this._baseReplaceRequestHandler(e, (e, n) => (this._initializedReceived || console.warn(`[ext-apps] AppBridge received '${e.method}' before ui/notifications/initialized. The View is calling host methods before completing the handshake; it should await app.connect() first.`), t(e, n)));
	};
	eventSchemas = {
		sizechange: Mc,
		sandboxready: kc,
		initialized: Bc,
		requestteardown: Lc,
		loggingmessage: Rs
	};
	constructor(e, t, n, r) {
		super(r), this._client = e, this._hostInfo = t, this._capabilities = n, this.addEventListener("initialized", () => {
			this._initializedReceived = !0;
		}), this._hostContext = r?.hostContext || {}, this.setRequestHandler(qc, (e) => this._oninitialize(e)), this.setRequestHandler(Co, (e, t) => (this.onping?.(e.params, t), {})), this.replaceRequestHandler(Vc, (e) => ({ mode: this._hostContext.displayMode ?? "inline" }));
	}
	getAppCapabilities() {
		return this._appCapabilities;
	}
	getAppVersion() {
		return this._appInfo;
	}
	onping;
	get onsizechange() {
		return this.getEventHandler("sizechange");
	}
	set onsizechange(e) {
		this.setEventHandler("sizechange", e);
	}
	get onsandboxready() {
		return this.getEventHandler("sandboxready");
	}
	set onsandboxready(e) {
		this.setEventHandler("sandboxready", e);
	}
	get oninitialized() {
		return this.getEventHandler("initialized");
	}
	set oninitialized(e) {
		this.setEventHandler("initialized", e);
	}
	_onmessage;
	get onmessage() {
		return this._onmessage;
	}
	set onmessage(e) {
		this.warnIfRequestHandlerReplaced("onmessage", this._onmessage, e), this._onmessage = e, this.replaceRequestHandler(Wc, async (e, t) => {
			if (!this._onmessage) throw Error("No onmessage handler set");
			return this._onmessage(e.params, t);
		});
	}
	_onopenlink;
	get onopenlink() {
		return this._onopenlink;
	}
	set onopenlink(e) {
		this.warnIfRequestHandlerReplaced("onopenlink", this._onopenlink, e), this._onopenlink = e, this.replaceRequestHandler(Oc, async (e, t) => {
			if (!this._onopenlink) throw Error("No onopenlink handler set");
			return this._onopenlink(e.params, t);
		});
	}
	_ondownloadfile;
	get ondownloadfile() {
		return this._ondownloadfile;
	}
	set ondownloadfile(e) {
		this.warnIfRequestHandlerReplaced("ondownloadfile", this._ondownloadfile, e), this._ondownloadfile = e, this.replaceRequestHandler(Uc, async (e, t) => {
			if (!this._ondownloadfile) throw Error("No ondownloadfile handler set");
			return this._ondownloadfile(e.params, t);
		});
	}
	get onrequestteardown() {
		return this.getEventHandler("requestteardown");
	}
	set onrequestteardown(e) {
		this.setEventHandler("requestteardown", e);
	}
	_onrequestdisplaymode;
	get onrequestdisplaymode() {
		return this._onrequestdisplaymode;
	}
	set onrequestdisplaymode(e) {
		this.warnIfRequestHandlerReplaced("onrequestdisplaymode", this._onrequestdisplaymode, e), this._onrequestdisplaymode = e, this.replaceRequestHandler(Vc, async (e, t) => {
			if (!this._onrequestdisplaymode) throw Error("No onrequestdisplaymode handler set");
			return this._onrequestdisplaymode(e.params, t);
		});
	}
	get onloggingmessage() {
		return this.getEventHandler("loggingmessage");
	}
	set onloggingmessage(e) {
		this.setEventHandler("loggingmessage", e);
	}
	_onupdatemodelcontext;
	get onupdatemodelcontext() {
		return this._onupdatemodelcontext;
	}
	set onupdatemodelcontext(e) {
		this.warnIfRequestHandlerReplaced("onupdatemodelcontext", this._onupdatemodelcontext, e), this._onupdatemodelcontext = e, this.replaceRequestHandler(Kc, async (e, t) => {
			if (!this._onupdatemodelcontext) throw Error("No onupdatemodelcontext handler set");
			return this._onupdatemodelcontext(e.params, t);
		});
	}
	_oncalltool;
	get oncalltool() {
		return this._oncalltool;
	}
	set oncalltool(e) {
		this.warnIfRequestHandlerReplaced("oncalltool", this._oncalltool, e), this._oncalltool = e, this.replaceRequestHandler(Ms, async (e, t) => {
			if (!this._oncalltool) throw Error("No oncalltool handler set");
			return this._oncalltool(e.params, t);
		});
	}
	set oncreatesamplingmessage(e) {
		this.setRequestHandler(Ks, async (t, n) => e(t.params, n));
	}
	sendToolListChanged(e = {}) {
		return this.notification({
			method: "notifications/tools/list_changed",
			params: e
		});
	}
	_onlistresources;
	get onlistresources() {
		return this._onlistresources;
	}
	set onlistresources(e) {
		this.warnIfRequestHandlerReplaced("onlistresources", this._onlistresources, e), this._onlistresources = e, this.replaceRequestHandler(Yo, async (e, t) => {
			if (!this._onlistresources) throw Error("No onlistresources handler set");
			return this._onlistresources(e.params, t);
		});
	}
	_onlistresourcetemplates;
	get onlistresourcetemplates() {
		return this._onlistresourcetemplates;
	}
	set onlistresourcetemplates(e) {
		this.warnIfRequestHandlerReplaced("onlistresourcetemplates", this._onlistresourcetemplates, e), this._onlistresourcetemplates = e, this.replaceRequestHandler(Zo, async (e, t) => {
			if (!this._onlistresourcetemplates) throw Error("No onlistresourcetemplates handler set");
			return this._onlistresourcetemplates(e.params, t);
		});
	}
	_onreadresource;
	get onreadresource() {
		return this._onreadresource;
	}
	set onreadresource(e) {
		this.warnIfRequestHandlerReplaced("onreadresource", this._onreadresource, e), this._onreadresource = e, this.replaceRequestHandler(ts, async (e, t) => {
			if (!this._onreadresource) throw Error("No onreadresource handler set");
			return this._onreadresource(e.params, t);
		});
	}
	sendResourceListChanged(e = {}) {
		return this.notification({
			method: "notifications/resources/list_changed",
			params: e
		});
	}
	_onlistprompts;
	get onlistprompts() {
		return this._onlistprompts;
	}
	set onlistprompts(e) {
		this.warnIfRequestHandlerReplaced("onlistprompts", this._onlistprompts, e), this._onlistprompts = e, this.replaceRequestHandler(fs, async (e, t) => {
			if (!this._onlistprompts) throw Error("No onlistprompts handler set");
			return this._onlistprompts(e.params, t);
		});
	}
	sendPromptListChanged(e = {}) {
		return this.notification({
			method: "notifications/prompts/list_changed",
			params: e
		});
	}
	assertCapabilityForMethod(e) {}
	assertRequestHandlerCapability(e) {}
	assertNotificationCapability(e) {}
	assertTaskCapability(e) {
		throw Error("Tasks are not supported in MCP Apps");
	}
	assertTaskHandlerCapability(e) {
		throw Error("Task handlers are not supported in MCP Apps");
	}
	getCapabilities() {
		return this._capabilities;
	}
	async _oninitialize(e) {
		let t = e.params.protocolVersion;
		return this._appInfo !== void 0 && console.warn("[ext-apps] AppBridge received a second ui/initialize. The View may be double-mounting (e.g. React StrictMode in dev) without closing the previous App instance. Responding normally; the latest appInfo/appCapabilities replace the previous values."), this._appCapabilities = e.params.appCapabilities, this._appInfo = e.params.appInfo, {
			protocolVersion: Jc.includes(t) ? t : wc,
			hostCapabilities: this.getCapabilities(),
			hostInfo: this._hostInfo,
			hostContext: this._hostContext
		};
	}
	setHostContext(e) {
		let t = {}, n = !1;
		for (let r of Object.keys(e)) {
			let i = this._hostContext[r], a = e[r];
			Xc(i, a) || (t[r] = a, n = !0);
		}
		n && (this._hostContext = e, this.sendHostContextChange(t));
	}
	sendHostContextChange(e) {
		return this.notification({
			method: "ui/notifications/host-context-changed",
			params: e
		});
	}
	sendToolInput(e) {
		return this.notification({
			method: "ui/notifications/tool-input",
			params: e
		});
	}
	sendToolInputPartial(e) {
		return this.notification({
			method: "ui/notifications/tool-input-partial",
			params: e
		});
	}
	sendToolResult(e) {
		return this.notification({
			method: "ui/notifications/tool-result",
			params: e
		});
	}
	sendToolCancelled(e) {
		return this.notification({
			method: "ui/notifications/tool-cancelled",
			params: e
		});
	}
	sendSandboxResourceReady(e) {
		return this.notification({
			method: "ui/notifications/sandbox-resource-ready",
			params: e
		});
	}
	teardownResource(e, t) {
		return this.request({
			method: "ui/resource-teardown",
			params: e
		}, Fc, t);
	}
	sendResourceTeardown = this.teardownResource;
	callTool(e, t) {
		return this.request({
			method: "tools/call",
			params: e
		}, Z, t);
	}
	listTools(e, t) {
		return this.request({
			method: "tools/list",
			params: e
		}, As, t);
	}
	async connect(e) {
		if (this.transport) throw Error("AppBridge is already connected. Call close() before connecting again.");
		if (this._initializedReceived = !1, this._client) {
			let e = this._client.getServerCapabilities();
			if (!e) throw Error("Client server capabilities not available");
			e.tools && (this.oncalltool = async (e, t) => this._client.request({
				method: "tools/call",
				params: e
			}, Z, { signal: t.signal }), e.tools.listChanged && this._client.setNotificationHandler(Ns, (e) => this.sendToolListChanged(e.params))), e.resources && (this.onlistresources = async (e, t) => this._client.request({
				method: "resources/list",
				params: e
			}, Xo, { signal: t.signal }), this.onlistresourcetemplates = async (e, t) => this._client.request({
				method: "resources/templates/list",
				params: e
			}, Qo, { signal: t.signal }), this.onreadresource = async (e, t) => this._client.request({
				method: "resources/read",
				params: e
			}, ns, { signal: t.signal }), e.resources.listChanged && this._client.setNotificationHandler(rs, (e) => this.sendResourceListChanged(e.params))), e.prompts && (this.onlistprompts = async (e, t) => this._client.request({
				method: "prompts/list",
				params: e
			}, ps, { signal: t.signal }), e.prompts.listChanged && this._client.setNotificationHandler(Ts, (e) => this.sendPromptListChanged(e.params)));
		}
		return super.connect(e);
	}
};
function Xc(e, t) {
	return JSON.stringify(e) === JSON.stringify(t);
}
// svelte/features/apps/transport.ts
function Zc(e) {
	let t = so.safeParse(e);
	return t.success ? t.data : null;
}
function Qc(e, t, n) {
	return n && !!e.window && e.connected && e.opaque && t.origin === "null" && t.source === e.window;
}
function $c(e, t, n) {
	return Qc({
		window: e.contentWindow,
		connected: e.isConnected,
		opaque: e.sandbox.contains("allow-scripts") && !e.sandbox.contains("allow-same-origin")
	}, t, n());
}
var el = (e) => typeof e == "object" && !!e && !Array.isArray(e), tl = /* @__PURE__ */ new Set([
	"tools/list",
	"tools/call",
	"ui/open-link",
	"ui/message",
	"ui/update-model-context",
	"ui/request-display-mode",
	"ping"
]), nl = class {
	frame;
	current;
	legacy;
	onmessage;
	onclose;
	onerror;
	started = !1;
	closed = !1;
	legacyId = 0;
	constructor(e, t, n) {
		this.frame = e, this.current = t, this.legacy = n;
	}
	listener = (e) => {
		if (this.closed || !$c(this.frame, e, this.current)) return;
		let t = e.data;
		if (t && typeof t == "object" && "vbEmbed" in t && t.vbEmbed === 1) {
			"h" in t && typeof t.h == "number" && Number.isFinite(t.h) ? this.legacy?.({ height: t.h }) : "send" in t && typeof t.send == "string" && this.legacy?.({ text: t.send.slice(0, 4e3) });
			return;
		}
		let n = t;
		if (el(t) && t.jsonrpc === "2.0" && typeof t.method == "string") {
			let e = t.params;
			t.method === "ui/message" && el(e) && e.role === void 0 && (e = {
				...e,
				role: "user"
			}), n = {
				...t,
				...e === void 0 ? {} : { params: e },
				...t.id === void 0 && tl.has(t.method) ? { id: `legacy-${++this.legacyId}` } : {}
			};
		}
		let r = Zc(n);
		r && this.onmessage?.(r);
	};
	async start() {
		if (this.closed) throw Error("App transport disposed");
		this.started || (this.started = !0, window.addEventListener("message", this.listener));
	}
	async send(e) {
		if (this.closed || !this.current() || !this.frame.isConnected) throw Error("App is no longer active");
		this.frame.contentWindow?.postMessage(e, "*");
	}
	async close() {
		this.closed || (this.closed = !0, window.removeEventListener("message", this.listener), this.onclose?.());
	}
};
// svelte/features/apps/bridge.ts
function rl(e) {
	let r = !0, i = !1, a = 0, o = 0, s = () => r && e.current() && e.frame.isConnected, c = async (t, n) => {
		if (!s() || o >= 16) return !1;
		o++;
		try {
			return await e.ask(t, n) && s();
		} finally {
			o--;
		}
	}, l = async (n) => {
		if (!s()) return t("App is no longer active");
		if (a >= 16) return t("This app already has too many pending requests");
		a++;
		try {
			let r = await e.message(n.trim().slice(0, 4e3));
			return s() ? r : t("App is no longer active");
		} finally {
			a--;
		}
	}, u = new Yc(null, {
		name: "vibebook",
		version: "1"
	}, {
		openLinks: {},
		serverTools: {},
		logging: {},
		message: { text: {} },
		updateModelContext: {
			text: {},
			structuredContent: {}
		}
	}, { hostContext: e.context() }), d = new nl(e.frame, s, (t) => {
		"height" in t ? Number.isFinite(t.height) && e.resize?.(t.height) : l(t.text).catch(() => {});
	});
	return u.setRequestHandler(ks, async () => ({ tools: s() ? e.tools : [] })), u.oncalltool = async (n) => {
		if (!s()) return t("App is no longer active");
		if (a >= 16) return t("This app already has too many pending requests");
		a++;
		try {
			let r = await e.call(n.name, n.arguments || {});
			return s() ? Z.parse(r) : t("App is no longer active");
		} finally {
			a--;
		}
	}, u.onmessage = async (e) => {
		let t = e.content.filter((e) => e.type === "text").map((e) => e.text).join("\n");
		return t.trim() && (await l(t)).isError ? { isError: !0 } : {};
	}, u.onopenlink = async ({ url: t }) => {
		let r = n(t);
		return !r || !await c(e.t("abrir um link"), r) ? { isError: !0 } : (e.open(r), {});
	}, u.onupdatemodelcontext = async (t) => {
		if (!s()) return {};
		let n = t.content?.filter((e) => e.type === "text").map((e) => e.text).join("\n") || (t.structuredContent ? JSON.stringify(t.structuredContent) : "");
		if (n && e.contextText) {
			if (a >= 16) throw Error("This app already has too many pending requests");
			a++;
			try {
				if (await e.contextText(n.slice(0, 4e3)), !s()) return {};
			} finally {
				a--;
			}
		}
		return {};
	}, u.onrequestdisplaymode = async () => ({ mode: e.embed ? "inline" : "fullscreen" }), u.onsizechange = ({ height: t }) => {
		s() && typeof t == "number" && Number.isFinite(t) && e.resize?.(t);
	}, u.oninitialized = () => {
		if (i || !s()) return;
		i = !0;
		let t = e.first;
		t && (async () => {
			await u.sendToolInput({ arguments: {} });
			let e = await t;
			s() && await u.sendToolResult(e);
		})().catch(() => {});
	}, e.first?.catch(() => {}), {
		ready: u.connect(d),
		update() {
			s() && u.setHostContext(e.context());
		},
		dispose() {
			r && (r = !1, u.close().catch(() => {}));
		}
	};
}
var il = (e) => Z.parse(e);
function al(e, t) {
	let n = Os.safeParse(e);
	return n.success ? n.data : t;
}
export { al as appToolInfo, rl as createNativeAppBridge, il as remoteToolResult };
