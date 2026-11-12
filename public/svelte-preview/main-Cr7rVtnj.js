// \0rolldown/runtime.js
var e = Object.defineProperty, t = (t, n) => {
	let r = {};
	for (var i in t) e(r, i, {
		get: t[i],
		enumerable: !0
	});
	return n || e(r, Symbol.toStringTag, { value: "Module" }), r;
}, n = Array.isArray, r = Array.prototype.indexOf, i = Array.prototype.includes, a = Array.from, o = Object.defineProperty, s = Object.getOwnPropertyDescriptor, c = Object.getOwnPropertyDescriptors, l = Object.prototype, u = Array.prototype, d = Object.getPrototypeOf, f = Object.isExtensible;
function p(e) {
	return typeof e == "function";
}
var m = () => {};
function h(e) {
	for (var t = 0; t < e.length; t++) e[t]();
}
function g() {
	var e, t;
	return {
		promise: new Promise((n, r) => {
			e = n, t = r;
		}),
		resolve: e,
		reject: t
	};
}
function _(e, t) {
	if (Array.isArray(e)) return e;
	if (t === void 0 || !(Symbol.iterator in e)) return Array.from(e);
	let n = [];
	for (let r of e) if (n.push(r), n.length === t) break;
	return n;
}
var v = 1024, y = 2048, b = 4096, x = 8192, S = 16384, C = 32768, w = 1 << 25, T = 65536, ee = 1 << 19, te = 1 << 20, ne = 1 << 25, re = 1 << 21, ie = 1 << 22, ae = 1 << 23, oe = Symbol("$state"), se = Symbol("component"), ce = Symbol("legacy props"), le = Symbol(""), ue = Symbol("attributes"), de = Symbol("class"), fe = Symbol("style"), pe = Symbol("text"), me = Symbol("form reset"), he = new class extends Error {
	name = "StaleReactionError";
	message = "The reaction that called `getAbortSignal()` was re-run or destroyed";
}(), ge = !!globalThis.document?.contentType && /* @__PURE__ */ globalThis.document.contentType.includes("xml"), _e = {}, ve = Symbol("uninitialized"), ye = "http://www.w3.org/1999/xhtml", be = "http://www.w3.org/2000/svg", xe = "http://www.w3.org/1998/Math/MathML";
function Se() {
	console.warn("https://svelte.dev/e/derived_inert");
}
function Ce(e) {
	console.warn("https://svelte.dev/e/hydration_mismatch");
}
function we() {
	console.warn("https://svelte.dev/e/select_multiple_invalid_value");
}
function Te() {
	console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
// node_modules/svelte/src/internal/client/dom/hydration.js
var E = !1;
function Ee(e) {
	E = e;
}
var D;
function De(e) {
	if (e === null) throw Ce(), _e;
	return D = e;
}
function Oe() {
	return De(/* @__PURE__ */ un(D));
}
function O(e) {
	if (E) {
		if (/* @__PURE__ */ un(D) !== null) throw Ce(), _e;
		D = e;
	}
}
function ke(e = 1) {
	if (E) {
		for (var t = e, n = D; t--;) n = /* @__PURE__ */ un(n);
		D = n;
	}
}
function Ae(e = !0) {
	for (var t = 0, n = D;;) {
		if (n.nodeType === 8) {
			var r = n.data;
			if (r === "]") {
				if (t === 0) return n;
				--t;
			} else (r === "[" || r === "[!" || r[0] === "[" && !isNaN(Number(r.slice(1)))) && (t += 1);
		}
		var i = /* @__PURE__ */ un(n);
		e && n.remove(), n = i;
	}
}
function je(e) {
	if (!e || e.nodeType !== 8) throw Ce(), _e;
	return e.data;
}
// node_modules/svelte/src/internal/client/reactivity/equality.js
function Me(e) {
	return e === this.v;
}
function Ne(e, t) {
	return e == e ? e !== t || typeof e == "object" && !!e || typeof e == "function" : t == t;
}
function Pe(e) {
	return !Ne(e, this.v);
}
// node_modules/svelte/src/internal/client/errors.js
function Fe() {
	throw Error("https://svelte.dev/e/async_derived_orphan");
}
function Ie(e, t, n) {
	throw Error("https://svelte.dev/e/each_key_duplicate");
}
function Le(e) {
	throw Error("https://svelte.dev/e/effect_in_teardown");
}
function Re() {
	throw Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function ze(e) {
	throw Error("https://svelte.dev/e/effect_orphan");
}
function Be() {
	throw Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function Ve(e) {
	throw Error("https://svelte.dev/e/props_invalid_value");
}
function He() {
	throw Error("https://svelte.dev/e/state_descriptors_fixed");
}
function Ue() {
	throw Error("https://svelte.dev/e/state_prototype_fixed");
}
function We() {
	throw Error("https://svelte.dev/e/state_unsafe_mutation");
}
function Ge() {
	throw Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
// node_modules/svelte/src/internal/client/context.js
var Ke = null;
function qe(e) {
	Ke = e;
}
function Je(e, t = !1, n) {
	Ke = {
		p: Ke,
		i: !1,
		c: null,
		e: null,
		s: e,
		x: null,
		r: z,
		l: null
	};
}
function Ye(e) {
	var t = Ke, n = t.e;
	if (n !== null) {
		t.e = null;
		for (var r of n) Cn(r);
	}
	return e !== void 0 && (t.x = e), t.i = !0, Ke = t.p, Xe(e);
}
function Xe(e = {}) {
	return o(e, se, { value: !0 }), e;
}
function Ze() {
	return !0;
}
// node_modules/svelte/src/internal/client/dom/task.js
var Qe = [];
function $e() {
	var e = Qe;
	Qe = [], h(e);
}
function et(e) {
	if (Qe.length === 0 && !Ot) {
		var t = Qe;
		queueMicrotask(() => {
			t === Qe && $e();
		});
	}
	Qe.push(e);
}
function tt() {
	for (; Qe.length > 0;) $e();
}
// node_modules/svelte/src/internal/client/reactivity/status.js
var nt = ~(y | b | v);
function rt(e, t) {
	e.f = e.f & nt | t;
}
function it(e) {
	e.f & 512 || e.deps === null ? rt(e, v) : rt(e, b);
}
// node_modules/svelte/src/internal/client/reactivity/utils.js
function at(e, t) {
	e.f & 2048 ? t.set(e, y) : e.f & 4096 && t.get(e) !== 2048 && t.set(e, b), rt(e, v);
}
// node_modules/svelte/src/internal/client/dom/elements/misc.js
function ot(e) {
	E && /* @__PURE__ */ ln(e) !== null && dn(e);
}
var st = !1;
function ct() {
	st || (st = !0, document.addEventListener("reset", (e) => {
		Promise.resolve().then(() => {
			if (!e.defaultPrevented) for (let t of e.target.elements) t[me]?.();
		});
	}, { capture: !0 }));
}
// node_modules/svelte/src/internal/client/dom/elements/bindings/shared.js
function lt(e) {
	var t = R, n = z;
	Gn(null), Kn(null);
	try {
		return e();
	} finally {
		Gn(t), Kn(n);
	}
}
function ut(e, t, n, r = n) {
	e.addEventListener(t, () => lt(n));
	let i = e[me];
	e[me] = i ? () => {
		i(), r(!0);
	} : () => r(!0), ct();
}
// node_modules/svelte/src/internal/client/reactivity/async.js
function dt(e, t, n, r) {
	let i = Ze() ? ht : vt;
	var a = e.filter((e) => !e.settled), o = t.map(i);
	if (n.length === 0 && a.length === 0) {
		r(o);
		return;
	}
	var s = z, c = ft(), l = a.length === 1 ? a[0].promise : a.length > 1 ? Promise.all(a.map((e) => e.promise)) : null;
	function u(e) {
		if (!(s.f & 16384)) {
			c();
			try {
				r([...o, ...e]);
			} catch (e) {
				gn(e, s);
			}
			pt();
		}
	}
	var d = mt();
	if (n.length === 0) {
		l.then(() => u([])).finally(d);
		return;
	}
	function f() {
		Promise.all(n.map((e) => /* @__PURE__ */ _t(e))).then(u).catch((e) => gn(e, s)).finally(d);
	}
	l ? l.then(() => {
		s.f & 16384 ? d() : (c(), f(), pt());
	}) : f();
}
function ft() {
	var e = z, t = R, n = Ke, r = A;
	return function(i = !0) {
		Kn(e), Gn(t), qe(n), i && !(e.f & 16384) && (r?.activate(), r?.apply());
	};
}
function pt(e = !0) {
	Kn(null), Gn(null), qe(null), e && A?.deactivate();
}
function mt() {
	var e = z, t = e.b, n = A, r = !!t?.is_rendered();
	return t?.update_pending_count(1, n), n.increment(r, e), () => {
		t?.update_pending_count(-1, n), n.decrement(r, e);
	};
}
/*#__NO_SIDE_EFFECTS__*/
function ht(e) {
	var t = 2 | y;
	return z !== null && (z.f |= ee), {
		ctx: Ke,
		deps: null,
		effects: null,
		equals: Me,
		f: t,
		fn: e,
		reactions: null,
		rv: 0,
		v: ve,
		wv: 0,
		parent: z,
		ac: null
	};
}
var gt = Symbol("obsolete");
/*#__NO_SIDE_EFFECTS__*/
function _t(e, t, n) {
	let r = z;
	r === null && Fe();
	var i = void 0, a = Gt(ve), o = !R, s = /* @__PURE__ */ new Set();
	return En(() => {
		var t = z, n = g();
		i = n.promise;
		try {
			Promise.resolve(e()).then(n.resolve, (e) => {
				e !== he && n.reject(e);
			}).finally(pt);
		} catch (e) {
			n.reject(e), pt();
		}
		var c = A;
		if (o) {
			if (t.f & 32768) var l = mt();
			if (r.b?.is_rendered()) c.async_deriveds.get(t)?.reject(gt);
			else for (let e of s.values()) e.reject(gt);
			s.add(n), c.async_deriveds.set(t, n);
		}
		let u = (e, t = void 0) => {
			l?.(), s.delete(n), t !== gt && (c.activate(), t ? (a.f |= ae, Yt(a, t)) : (a.f & 8388608 && (a.f ^= ae), Yt(a, e)), c.deactivate());
		};
		n.promise.then(u, (e) => u(null, e || "unknown"));
	}), xn(() => {
		for (let e of s) e.reject(gt);
	}), new Promise((e) => {
		function t(n) {
			function r() {
				n === i ? e(a) : t(i);
			}
			n.then(r, r);
		}
		t(i);
	});
}
/*#__NO_SIDE_EFFECTS__*/
function k(e) {
	let t = /* @__PURE__ */ ht(e);
	return Jn(t), t;
}
/*#__NO_SIDE_EFFECTS__*/
function vt(e) {
	let t = /* @__PURE__ */ ht(e);
	return t.equals = Pe, t;
}
function yt(e) {
	var t = e.effects;
	if (t !== null) {
		e.effects = null;
		for (var n = 0; n < t.length; n += 1) Nn(t[n]);
	}
}
function bt(e) {
	var t, n = z, r = e.parent;
	if (!Hn && r !== null && e.v !== ve && r.f & 24576) return Se(), e.v;
	Kn(r);
	try {
		yt(e), t = or(e);
	} finally {
		Kn(n);
	}
	return t;
}
function xt(e) {
	var t = bt(e);
	!e.equals(t) && (e.wv = rr(), (!A?.is_fork || e.deps === null) && (A === null ? e.v = t : (A.capture(e, t, !0), Tt?.capture(e, t, !0)), e.deps === null)) ? rt(e, v) : Hn || (Et === null ? it(e) : (bn() || A?.is_fork) && Et.set(e, t));
}
function St(e) {
	if (e.effects !== null) for (let t of e.effects) (t.teardown || t.ac) && (t.teardown?.(), t.ac !== null && lt(() => {
		t.ac.abort(he), t.ac = null;
	}), t.fn !== null && (t.teardown = m), lr(t, 0), jn(t));
}
function Ct(e) {
	if (e.effects !== null) for (let t of e.effects) t.teardown && t.fn !== null && ur(t);
}
// node_modules/svelte/src/internal/client/reactivity/batch.js
var wt = null, A = null, Tt = null, Et = null, Dt = null, Ot = !1, kt = !1, At = null, jt = null, Mt = 0, Nt = 1, Pt = class e {
	id = Nt++;
	started = !1;
	linked = !0;
	prev = null;
	next = null;
	async_deriveds = /* @__PURE__ */ new Map();
	current = /* @__PURE__ */ new Map();
	previous = /* @__PURE__ */ new Map();
	#e = /* @__PURE__ */ new Set();
	#t = /* @__PURE__ */ new Set();
	#n = 0;
	#r = /* @__PURE__ */ new Map();
	#i = null;
	#a = [];
	#o = [];
	#s = /* @__PURE__ */ new Map();
	#c = /* @__PURE__ */ new Map();
	#l = /* @__PURE__ */ new Set();
	is_fork = !1;
	#u = !1;
	constructor() {
		wt === null ? wt = this : (wt.next = this, this.prev = wt), wt = this;
	}
	#d() {
		if (this.is_fork) return !0;
		for (let e of this.#r.keys()) if (!this.#f(e)) return !0;
		return !1;
	}
	#f(e) {
		for (var t = e; t !== null; t = t.parent) if (this.#c.has(t)) return !0;
		return !1;
	}
	skip_effect(e) {
		this.#c.has(e) || this.#c.set(e, {
			d: [],
			m: []
		}), this.#l.delete(e);
	}
	unskip_effect(e, t = (e) => this.schedule(e)) {
		var n = this.#c.get(e);
		if (n) {
			this.#c.delete(e);
			for (var r of n.d) rt(r, y), t(r);
			for (r of n.m) rt(r, b), t(r);
		}
		this.#l.add(e);
	}
	#p() {
		var e = [];
		for (let i of this.#a) if (!(i.f & 16384 || !(i.f & 6144))) {
			for (var t = i, n = !1; t.parent !== null;) {
				t = t.parent;
				var r = t.f;
				if (r & 96) {
					if (!(r & 1024)) {
						n = !0;
						break;
					}
					t.f ^= v;
				}
			}
			n || e.push(t);
		}
		return this.#a = [], e;
	}
	#m() {
		this.started = !0;
		for (let [e, t] of this.#s) rt(e, t), this.schedule(e);
		this.apply();
		for (var t = At = [], n = [], r = jt = []; this.#a.length > 0;) {
			Mt++ > 1e3 && (this.#b(), It());
			for (let e of this.#p()) try {
				this.#h(e, t, n);
			} catch (t) {
				throw Vt(e), this.#d() || this.discard(), t;
			}
		}
		if (A = null, r.length > 0) {
			var i = e.ensure();
			for (let e of r) i.schedule(e);
		}
		if (At = null, jt = null, this.#d()) {
			this.#y(n), this.#y(t);
			for (let [e, t] of this.#c) Bt(e, t);
			r.length > 0 && A.#m();
			return;
		}
		let a = this.#g();
		if (a) this.#y(n), this.#y(t), a.#v(this);
		else {
			this.#s.clear();
			for (let e of this.#e) e(this);
			this.#e.clear(), Tt = this, Rt(n), Rt(t), Tt = null, this.#i?.resolve();
			var o = A;
			this.#n === 0 && (this.#a.length === 0 || o !== null) && this.#b(), o !== null && (Ut.clear(), o.#m());
		}
	}
	#h(e, t, n) {
		e.f ^= v;
		for (var r = e.first; r !== null;) {
			var i = r.f, a = !!(i & 96);
			if (!(a && i & 1024 || i & 8192 || this.#c.has(r)) && r.fn !== null) {
				a ? r.f ^= v : i & 4 ? t.push(r) : ir(r) && (i & 16 && this.add_dirty_reaction(r, b), ur(r));
				var o = r.first;
				if (o !== null) {
					r = o;
					continue;
				}
			}
			for (; r !== null;) {
				var s = r.next;
				if (s !== null) {
					r = s;
					break;
				}
				r = r.parent;
			}
		}
	}
	#g() {
		for (var e = this.prev; e !== null; e = e.prev) if (!e.is_fork && this.#_(e)) return e;
		return null;
	}
	#_(e) {
		for (let [t, [, n]] of this.current) if (!n && e.current.has(t)) return !0;
		return !1;
	}
	#v(e) {
		for (let [t, n] of e.current) !this.previous.has(t) && e.previous.has(t) && this.previous.set(t, e.previous.get(t)), this.current.set(t, n);
		for (let [t, n] of e.async_deriveds) {
			let e = this.async_deriveds.get(t);
			e && n.promise.then(e.resolve).catch(e.reject);
		}
		e.async_deriveds.clear(), this.transfer_reactions(e.#s);
		let t = (e) => {
			var n = e.reactions;
			if (n !== null && !(e.f & 2 && !(e.f & 6144))) for (let e of n) {
				var r = e.f;
				if (r & 2) t(e);
				else {
					var i = e;
					r & 4194320 && !this.async_deriveds.has(i) && (this.#s.delete(i), rt(i, y), this.schedule(i));
				}
			}
		};
		for (let e of this.current.keys()) t(e);
		this.oncommit(() => e.discard()), e.#b(), A = this, this.#m();
	}
	#y(e) {
		for (var t = 0; t < e.length; t += 1) at(e[t], this.#s);
	}
	capture(e, t, n = !1) {
		e.v !== ve && !this.previous.has(e) && this.previous.set(e, e.v), e.f & 8388608 || (this.current.set(e, [t, n]), Et?.set(e, t)), this.is_fork || (e.v = t);
	}
	activate() {
		A = this;
	}
	deactivate() {
		A = null, Et = null;
	}
	flush() {
		try {
			kt = !0, A = this, this.#m();
		} finally {
			Mt = 0, Dt = null, At = null, jt = null, kt = !1, A = null, Et = null, Ut.clear();
		}
	}
	discard() {
		for (let e of this.#t) e(this);
		this.#t.clear();
		for (let e of this.async_deriveds.values()) e.reject(gt);
		this.#b(), this.#i?.resolve();
	}
	register_created_effect(e) {
		this.#o.push(e);
	}
	increment(e, t) {
		if (this.#n += 1, e) {
			let e = this.#r.get(t) ?? 0;
			this.#r.set(t, e + 1);
		}
	}
	decrement(e, t) {
		if (--this.#n, e) {
			let e = this.#r.get(t) ?? 0;
			e === 1 ? this.#r.delete(t) : this.#r.set(t, e - 1);
		}
		this.#u || (this.#u = !0, et(() => {
			this.#u = !1, this.linked && this.flush();
		}));
	}
	transfer_reactions(e) {
		for (let [t, n] of e) this.add_dirty_reaction(t, n);
		e.clear();
	}
	add_dirty_reaction(e, t) {
		(t === 2048 || this.#s.get(e) !== 2048) && this.#s.set(e, t);
	}
	oncommit(e) {
		this.#e.add(e);
	}
	ondiscard(e) {
		this.#t.add(e);
	}
	settled() {
		return (this.#i ??= g()).promise;
	}
	static ensure() {
		if (A === null) {
			let t = A = new e();
			!kt && !Ot && et(() => {
				t.started || t.flush();
			});
		}
		return A;
	}
	apply() {
		Et = null;
	}
	schedule(e) {
		Dt = e, e.b?.is_pending && e.f & 16777228 && !(e.f & 32768) ? e.b.defer_effect(e) : this.#a.push(e);
	}
	#b() {
		if (this.linked) {
			var e = this.prev, t = this.next;
			e === null || (e.next = t), t === null ? wt = e : t.prev = e, this.linked = !1;
		}
	}
};
function Ft(e) {
	var t = Ot, n = Tt;
	Tt = null, Ot = !0;
	try {
		var r;
		for (e && (Ft(), r = e());;) {
			if (tt(), A === null) return r;
			A.flush();
		}
	} finally {
		Ot = t, Tt = n;
	}
}
function It() {
	try {
		Be();
	} catch (e) {
		gn(e, Dt);
	}
}
var Lt = null;
function Rt(e) {
	var t = e.length;
	if (t !== 0) {
		for (var n = 0; n < t;) {
			var r = e[n++];
			if (!(r.f & 24576) && ir(r) && (Lt = /* @__PURE__ */ new Set(), ur(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && Fn(r), Lt?.size > 0)) {
				Ut.clear();
				for (let e of Lt) {
					if (e.f & 24576) continue;
					let t = [e], n = e.parent;
					for (; n !== null;) Lt.has(n) && (Lt.delete(n), t.push(n)), n = n.parent;
					for (let e = t.length - 1; e >= 0; e--) {
						let n = t[e];
						n.f & 24576 || ur(n);
					}
				}
				Lt.clear();
			}
		}
		Lt = null;
	}
}
function zt(e) {
	A.schedule(e);
}
function Bt(e, t) {
	if (!(e.f & 32 && e.f & 1024)) {
		e.f & 2048 ? t.d.push(e) : e.f & 4096 && t.m.push(e), rt(e, v);
		for (var n = e.first; n !== null;) Bt(n, t), n = n.next;
	}
}
function Vt(e) {
	rt(e, v);
	for (var t = e.first; t !== null;) Vt(t), t = t.next;
}
// node_modules/svelte/src/internal/client/reactivity/sources.js
var Ht = /* @__PURE__ */ new Set(), Ut = /* @__PURE__ */ new Map(), Wt = !1;
function Gt(e, t) {
	return {
		f: 0,
		v: e,
		reactions: null,
		equals: Me,
		rv: 0,
		wv: 0
	};
}
/*#__NO_SIDE_EFFECTS__*/
function j(e, t) {
	let n = Gt(e, t);
	return Jn(n), n;
}
/*#__NO_SIDE_EFFECTS__*/
function Kt(e, t = !1, n = !0) {
	let r = Gt(e);
	return t || (r.equals = Pe), r;
}
function M(e, t, n = !1) {
	return R !== null && (!Wn || R.f & 131072) && Ze() && R.f & 4325394 && (qn === null || !qn.has(e)) && We(), Yt(e, n ? $t(t) : t, jt);
}
var qt = null, Jt = 0;
function Yt(e, t, n = null) {
	if (!e.equals(t)) {
		Hn ? Ut.set(e, t) : Ut.has(e) || Ut.set(e, e.v);
		var r = Pt.ensure();
		if (r.capture(e, t), e.f & 2) {
			let t = e;
			e.f & 2048 && bt(t), Et === null && it(t);
		}
		e.wv = rr(), qt = null, Jt = 0, Qt(e, y, n), qt = null, Ze() && z !== null && z.f & 1024 && !(z.f & 96) && (Zn === null ? Qn([e]) : Zn.push(e)), !r.is_fork && Ht.size > 0 && !Wt && Xt();
	}
	return t;
}
function Xt() {
	Wt = !1;
	for (let e of Ht) {
		e.f & 1024 && rt(e, b);
		let t;
		try {
			t = ir(e);
		} catch {
			t = !0;
		}
		t && ur(e);
	}
	Ht.clear();
}
function Zt(e) {
	M(e, e.v + 1);
}
function Qt(e, t, n) {
	var r = e.reactions;
	if (r !== null) {
		var i = Ze(), a = r.length;
		if (Jt += a, Jt > 1e5 && qt === null && (qt = /* @__PURE__ */ new Set()), qt !== null) {
			if (qt.has(e)) return;
			qt.add(e);
		}
		for (var o = 0; o < a; o++) {
			var s = r[o], c = s.f;
			if (i || s !== z) {
				var l = (c & y) === 0;
				if (l && rt(s, t), c & 131072) Ht.add(s);
				else if (c & 2) {
					var u = s;
					Et?.delete(u), Qt(u, b, n);
				} else if (l) {
					var d = s;
					c & 16 && Lt !== null && Lt.add(d), n === null ? zt(d) : n.push(d);
				}
			}
		}
	}
}
function $t(e) {
	if (typeof e != "object" || !e || oe in e || se in e) return e;
	let t = d(e);
	if (t !== l && t !== u) return e;
	var r = /* @__PURE__ */ new Map(), i = n(e), a = /* @__PURE__ */ j(0), o = null, c = tr, f = (e) => {
		if (tr === c) return e();
		var t = R, n = tr;
		Gn(null), nr(c);
		var r = e();
		return Gn(t), nr(n), r;
	};
	return i && r.set("length", /* @__PURE__ */ j(e.length, o)), new Proxy(e, {
		defineProperty(e, t, n) {
			"value" in n && n.configurable !== !1 && n.enumerable !== !1 && n.writable !== !1 || He();
			var i = r.get(t);
			return i === void 0 ? f(() => {
				var e = /* @__PURE__ */ j(n.value, o);
				return r.set(t, e), e;
			}) : M(i, n.value, !0), !0;
		},
		deleteProperty(e, t) {
			var n = r.get(t);
			if (n === void 0) {
				if (t in e) {
					let e = f(() => /* @__PURE__ */ j(ve, o));
					r.set(t, e), Zt(a);
				}
			} else M(n, ve), Zt(a);
			return !0;
		},
		get(t, n, i) {
			if (n === oe) return e;
			var a = r.get(n), c = n in t;
			if (a === void 0 && (!c || s(t, n)?.writable) && (a = f(() => /* @__PURE__ */ j($t(c ? t[n] : ve), o)), r.set(n, a)), a !== void 0) {
				var l = B(a);
				return l === ve ? void 0 : l;
			}
			return Reflect.get(t, n, i);
		},
		getOwnPropertyDescriptor(e, t) {
			this.has?.(e, t);
			var n = Reflect.getOwnPropertyDescriptor(e, t), i = r.get(t);
			if (i !== void 0) {
				var a = B(i);
				if (a === ve) return;
				if (n && "value" in n) n.value = a;
				else return {
					enumerable: !0,
					configurable: !0,
					value: a,
					writable: !0
				};
			}
			return n;
		},
		has(e, t) {
			if (t === oe) return !0;
			var n = r.get(t), i = n !== void 0 && n.v !== ve || Reflect.has(e, t);
			return (n !== void 0 || (z !== null || R !== null) && (!i || s(e, t)?.writable)) && (n === void 0 && (n = f(() => /* @__PURE__ */ j(i ? $t(e[t]) : ve, o)), r.set(t, n)), B(n) === ve) ? !1 : i;
		},
		set(e, t, n, c) {
			var l = r.get(t), u = t in e;
			if (i && t === "length") for (var d = n; d < l.v; d += 1) {
				var p = r.get(d + "");
				p === void 0 ? d in e && (p = f(() => /* @__PURE__ */ j(ve, o)), r.set(d + "", p)) : M(p, ve);
			}
			if (l === void 0) (!u || s(e, t)?.writable) && (l = f(() => /* @__PURE__ */ j(void 0, o)), M(l, $t(n)), r.set(t, l));
			else {
				u = l.v !== ve;
				var m = f(() => $t(n));
				M(l, m);
			}
			var h = Reflect.getOwnPropertyDescriptor(e, t);
			if (h?.set && h.set.call(c, n), !u) {
				if (i && typeof t == "string") {
					var g = r.get("length"), _ = Number(t);
					Number.isInteger(_) && _ >= g.v && M(g, _ + 1);
				}
				Zt(a);
			}
			return !0;
		},
		ownKeys(e) {
			B(a);
			var t = Reflect.ownKeys(e).filter((e) => {
				var t = r.get(e);
				return t === void 0 || t.v !== ve;
			});
			for (var [n, i] of r) i.v !== ve && !(n in e) && t.push(n);
			return t;
		},
		setPrototypeOf() {
			Ue();
		}
	});
}
function en(e) {
	try {
		if (typeof e == "object" && e && oe in e) return e[oe];
	} catch {}
	return e;
}
function tn(e, t) {
	return Object.is(en(e), en(t));
}
var nn, rn, an, on;
function sn() {
	if (nn === void 0) {
		nn = window, rn = /Firefox/.test(navigator.userAgent);
		var e = Element.prototype, t = Node.prototype, n = Text.prototype;
		an = s(t, "firstChild").get, on = s(t, "nextSibling").get, f(e) && (e[de] = void 0, e[ue] = null, e[fe] = void 0, e.__e = void 0), f(n) && (n[pe] = void 0);
	}
}
function cn(e = "") {
	return document.createTextNode(e);
}
/*@__NO_SIDE_EFFECTS__*/
function ln(e) {
	return an.call(e);
}
/*@__NO_SIDE_EFFECTS__*/
function un(e) {
	return on.call(e);
}
function N(e, t) {
	if (!E) return /* @__PURE__ */ ln(e);
	var n = /* @__PURE__ */ ln(D);
	if (n === null) n = D.appendChild(cn());
	else if (t && n.nodeType !== 3) {
		var r = cn();
		return n?.before(r), De(r), r;
	}
	return t && mn(n), De(n), n;
}
function P(e, t = !1) {
	if (!E) {
		var n = /* @__PURE__ */ ln(e);
		return n instanceof Comment && n.data === "" ? /* @__PURE__ */ un(n) : n;
	}
	if (t) {
		if (D?.nodeType !== 3) {
			var r = cn();
			return D?.before(r), De(r), r;
		}
		mn(D);
	}
	return D;
}
function F(e, t = !1) {
	if (!E) return /* @__PURE__ */ ln(e);
	var n = N(e, t);
	return O(e), n;
}
function I(e, t = 1, n = !1) {
	let r = E ? D : e;
	for (var i; t--;) i = r, r = /* @__PURE__ */ un(r);
	if (!E) return r;
	if (n) {
		if (r?.nodeType !== 3) {
			var a = cn();
			return r === null ? i?.after(a) : r.before(a), De(a), a;
		}
		mn(r);
	}
	return De(r), r;
}
function dn(e) {
	e.textContent = "";
}
function fn() {
	return !1;
}
function pn(e, t, n) {
	return t == null || t === "http://www.w3.org/1999/xhtml" ? n ? document.createElement(e, { is: n }) : document.createElement(e) : n ? document.createElementNS(t, e, { is: n }) : document.createElementNS(t, e);
}
function mn(e) {
	if (e.nodeValue.length < 65536) return;
	let t = e.nextSibling;
	for (; t !== null && t.nodeType === 3;) t.remove(), e.nodeValue += t.nodeValue, t = e.nextSibling;
}
function hn(e) {
	var t = z;
	if (t === null) return R.f |= ae, e;
	if (!(t.f & 32768) && !(t.f & 4)) throw e;
	gn(e, t);
}
function gn(e, t) {
	if (e === _e) throw e;
	if (!(t !== null && t.f & 16384)) {
		for (; t !== null;) {
			if (t.f & 128 && !(t.f & 33570816)) {
				if (!(t.f & 32768)) throw e;
				try {
					t.b.error(e);
					return;
				} catch (t) {
					e = t;
				}
			}
			t = t.parent;
		}
		throw e;
	}
}
// node_modules/svelte/src/internal/client/reactivity/effects.js
function _n(e) {
	z === null && (R === null && ze(e), Re()), Hn && Le(e);
}
function vn(e, t) {
	var n = t.last;
	n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function yn(e, t) {
	var n = z;
	n !== null && n.f & 8192 && (e |= x);
	var r = {
		ctx: Ke,
		deps: null,
		nodes: null,
		f: e | y | 512,
		first: null,
		fn: t,
		last: null,
		next: null,
		parent: n,
		b: n && n.b,
		prev: null,
		teardown: null,
		wv: 0,
		ac: null
	};
	A?.register_created_effect(r);
	var i = r;
	if (e & 4) At === null ? Pt.ensure().schedule(r) : At.push(r);
	else if (t !== null) {
		try {
			ur(r);
		} catch (e) {
			throw Nn(r), e;
		}
		i.deps === null && i.teardown === null && i.nodes === null && i.first === i.last && !(i.f & 524288) && (i = i.first, e & 16 && e & 65536 && i !== null && (i.f |= T));
	}
	if (i !== null && (i.parent = n, n !== null && vn(i, n), R !== null && R.f & 2 && !(e & 64))) {
		var a = R;
		(a.effects ??= []).push(i);
	}
	return r;
}
function bn() {
	return R !== null && !Wn;
}
function xn(e) {
	let t = yn(8, null);
	return rt(t, v), t.teardown = e, t;
}
function Sn(e) {
	_n("$effect");
	var t = z.f;
	if (!R && t & 32 && Ke !== null && !Ke.i) {
		var n = Ke;
		(n.e ??= []).push(e);
	} else return Cn(e);
}
function Cn(e) {
	return yn(4 | te, e);
}
function wn(e) {
	Pt.ensure();
	let t = yn(64 | ee, e);
	return (e = {}) => new Promise((n) => {
		e.outro ? In(t, () => {
			Nn(t), n(void 0);
		}) : (Nn(t), n(void 0));
	});
}
function Tn(e) {
	return yn(4, e);
}
function En(e) {
	return yn(ie | ee, e);
}
function Dn(e, t = 0) {
	return yn(8 | t, e);
}
function L(e, t = [], n = [], r = []) {
	dt(r, t, n, (t) => {
		yn(8, () => {
			e(...t.map(B));
		});
	});
}
function On(e, t = 0) {
	return yn(16 | t, e);
}
function kn(e) {
	return yn(32 | ee, e);
}
function An(e) {
	var t = e.teardown;
	if (t !== null) {
		let n = Hn, r = R;
		Un(!0), Gn(null);
		try {
			t.call(null);
		} catch (t) {
			gn(t, e.parent);
		} finally {
			Un(n), Gn(r);
		}
	}
}
function jn(e, t = !1) {
	var n = e.first;
	for (e.first = e.last = null; n !== null;) {
		let e = n.ac;
		e !== null && lt(() => {
			e.abort(he);
		});
		var r = n.next;
		n.f & 64 ? n.parent = null : Nn(n, t), n = r;
	}
}
function Mn(e) {
	for (var t = e.first; t !== null;) {
		var n = t.next;
		t.f & 32 || Nn(t), t = n;
	}
}
function Nn(e, t = !0) {
	var n = !1;
	(t || e.f & 262144) && e.nodes !== null && e.nodes.end !== null && (Pn(e.nodes.start, e.nodes.end), n = !0), e.f |= w, jn(e, t && !n), lr(e, 0);
	var r = e.nodes && e.nodes.t;
	if (r !== null) for (let e of r) e.stop();
	An(e), e.f ^= w, e.f |= S;
	var i = e.parent;
	i !== null && i.first !== null && Fn(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = e.b = null;
}
function Pn(e, t) {
	for (; e !== null;) {
		var n = e === t ? null : /* @__PURE__ */ un(e);
		e.remove(), e = n;
	}
}
function Fn(e) {
	var t = e.parent, n = e.prev, r = e.next;
	n !== null && (n.next = r), r !== null && (r.prev = n), t !== null && (t.first === e && (t.first = r), t.last === e && (t.last = n));
}
function In(e, t, n = !0) {
	var r = [];
	e.f |= 256, Ln(e, r, !0);
	var i = () => {
		n && Nn(e), t && t();
	}, a = r.length;
	if (a > 0) {
		var o = () => --a || i();
		for (var s of r) s.out(o);
	} else i();
}
function Ln(e, t, n) {
	if (!(e.f & 8192)) {
		e.f ^= x;
		var r = e.nodes && e.nodes.t;
		if (r !== null) for (let e of r) (e.is_global || n) && t.push(e);
		for (var i = e.first; i !== null;) {
			var a = i.next;
			if (!(i.f & 64)) {
				var o = !!(i.f & 65536) || !!(i.f & 32) && !!(e.f & 16);
				Ln(i, t, o ? n : !1);
			}
			i = a;
		}
	}
}
function Rn(e) {
	e.f &= -257, zn(e, !0);
}
function zn(e, t) {
	if (!(e.f & 256) && e.f & 8192) {
		e.f ^= x, e.f & 1024 || (rt(e, y), Pt.ensure().schedule(e));
		for (var n = e.first; n !== null;) {
			var r = n.next, i = !!(n.f & 65536) || !!(n.f & 32);
			zn(n, i ? t : !1), n = r;
		}
		var a = e.nodes && e.nodes.t;
		if (a !== null) for (let e of a) (e.is_global || t) && e.in();
	}
}
function Bn(e, t) {
	if (e.nodes) for (var n = e.nodes.start, r = e.nodes.end; n !== null;) {
		var i = n === r ? null : /* @__PURE__ */ un(n);
		t.append(n), n = i;
	}
}
// node_modules/svelte/src/internal/client/legacy.js
var Vn = null, Hn = !1;
function Un(e) {
	Hn = e;
}
var R = null, Wn = !1;
function Gn(e) {
	R = e;
}
var z = null;
function Kn(e) {
	z = e;
}
var qn = null;
function Jn(e) {
	R !== null && (R.f & 2097152 || R.f & 2) && (qn ??= /* @__PURE__ */ new Set()).add(e);
}
var Yn = null, Xn = 0, Zn = null;
function Qn(e) {
	Zn = e;
}
var $n = 1, er = 0, tr = er;
function nr(e) {
	tr = e;
}
function rr() {
	return ++$n;
}
function ir(e) {
	var t = e.f;
	if (t & 2048) return !0;
	if (t & 4096) {
		for (var n = e.deps, r = n.length, i = 0; i < r; i++) {
			var a = n[i];
			if (ir(a) && xt(a), a.wv > e.wv) return !0;
		}
		t & 512 && Et === null && rt(e, v);
	}
	return !1;
}
function ar(e, t, n = !0) {
	var r = e.reactions;
	if (r !== null && !(qn !== null && qn.has(e))) for (var i = 0; i < r.length; i++) {
		var a = r[i];
		a.f & 2 ? ar(a, t, !1) : t === a && (n ? rt(a, y) : a.f & 1024 && rt(a, b), zt(a));
	}
}
function or(e) {
	var t = Yn, n = Xn, r = Zn, i = R, a = qn, o = Ke, s = Wn, c = tr, l = e.f;
	Yn = null, Xn = 0, Zn = null, R = l & 96 ? null : e, qn = null, qe(e.ctx), Wn = !1, tr = ++er, e.ac !== null && (lt(() => {
		e.ac.abort(he);
	}), e.ac = null);
	try {
		e.f |= re;
		var u = e.fn, d = u();
		e.f |= C;
		var f = sr(e);
		if (Ze() && Zn !== null && !Wn && f !== null && !(e.f & 6146)) for (var p = 0; p < Zn.length; p++) ar(Zn[p], e);
		if (i !== null && i !== e) {
			if (er++, i.deps !== null) for (let e = 0; e < n; e += 1) i.deps[e].rv = er;
			if (t !== null) for (let e of t) e.rv = er;
			Zn !== null && (r === null ? r = Zn : r.push(...Zn));
		}
		return e.f & 8388608 && (e.f ^= ae), d;
	} catch (t) {
		return sr(e), hn(t);
	} finally {
		e.f ^= re, Yn = t, Xn = n, Zn = r, R = i, qn = a, qe(o), Wn = s, tr = c;
	}
}
function sr(e) {
	var t = e.deps, n = A?.is_fork;
	if (Yn !== null) {
		var r;
		if (n || lr(e, Xn), t !== null && Xn > 0) for (t.length = Xn + Yn.length, r = 0; r < Yn.length; r++) t[Xn + r] = Yn[r];
		else e.deps = t = Yn;
		if (bn() && e.f & 512) for (r = Xn; r < t.length; r++) (t[r].reactions ??= []).push(e);
	} else !n && t !== null && Xn < t.length && (lr(e, Xn), t.length = Xn);
	return t;
}
function cr(e, t) {
	let n = t.reactions;
	if (n !== null) {
		var a = r.call(n, e);
		if (a !== -1) {
			var o = n.length - 1;
			o === 0 ? n = t.reactions = null : (n[a] = n[o], n.pop());
		}
	}
	if (n === null && t.f & 2 && (Yn === null || !i.call(Yn, t))) {
		var s = t;
		s.f & 512 && (s.f ^= 512), s.v !== ve && it(s), s.ac !== null && lt(() => {
			s.ac.abort(he), s.ac = null, rt(s, y);
		}), St(s), lr(s, 0);
	}
}
function lr(e, t) {
	var n = e.deps;
	if (n !== null) for (var r = t; r < n.length; r++) cr(e, n[r]);
}
function ur(e) {
	var t = e.f;
	if (!(t & 16384)) {
		rt(e, v);
		var n = z;
		z = e;
		try {
			t & 16777232 ? Mn(e) : jn(e), An(e);
			var r = or(e);
			e.teardown = typeof r == "function" ? r : null, e.wv = $n;
		} finally {
			z = n;
		}
	}
}
async function dr() {
	await Promise.resolve(), Ft();
}
function B(e) {
	var t = !!(e.f & 2);
	if (Vn?.add(e), R !== null && !Wn && !(z !== null && z.f & 16384) && (qn === null || !qn.has(e))) {
		var n = R.deps;
		if (R.f & 2097152) e.rv < er && (e.rv = er, Yn === null && n !== null && n[Xn] === e ? Xn++ : Yn === null ? Yn = [e] : Yn.push(e));
		else {
			R.deps ??= [], i.call(R.deps, e) || R.deps.push(e);
			var r = e.reactions;
			r === null ? e.reactions = [R] : i.call(r, R) || r.push(R);
		}
	}
	if (Hn && Ut.has(e)) return Ut.get(e);
	if (t) {
		var a = e;
		if (Hn) {
			var o = a.v;
			return (!(a.f & 1024) && a.reactions !== null || pr(a)) && (o = bt(a)), Ut.set(a, o), o;
		}
		var s = !(a.f & 512) && !Wn && R !== null && !!(R.f & 512), c = (a.f & C) === 0;
		ir(a) && (s && (a.f |= 512), xt(a)), s && !c && (Ct(a), fr(a));
	}
	if (Et?.has(e)) return Et.get(e);
	if (e.f & 8388608) throw e.v;
	return e.v;
}
function fr(e) {
	if (e.f |= 512, e.deps !== null) for (let n of e.deps) {
		var t = n.reactions;
		t === null ? n.reactions = [e] : i.call(t, e) || t.push(e), n.f & 2 && !(n.f & 512) && (Ct(n), fr(n));
	}
}
function pr(e) {
	if (e.v === ve) return !0;
	if (e.deps === null) return !1;
	for (let t of e.deps) if (Ut.has(t) || t.f & 2 && pr(t)) return !0;
	return !1;
}
function mr(e) {
	var t = Wn;
	try {
		return Wn = !0, e();
	} finally {
		Wn = t;
	}
}
function hr(e) {
	if (!(typeof e != "object" || !e || e instanceof EventTarget)) {
		if (oe in e) gr(e);
		else if (!Array.isArray(e)) for (let t in e) {
			let n = e[t];
			typeof n == "object" && n && oe in n && gr(n);
		}
	}
}
function gr(e, t = /* @__PURE__ */ new Set()) {
	if (typeof e == "object" && e && !(e instanceof EventTarget) && !t.has(e)) {
		t.add(e), e instanceof Date && e.getTime();
		for (let n in e) try {
			gr(e[n], t);
		} catch {}
		let n = d(e);
		if (n !== Object.prototype && n !== Array.prototype && n !== Map.prototype && n !== Set.prototype && n !== Date.prototype) {
			let t = c(n);
			for (let n in t) {
				let r = t[n].get;
				if (r) try {
					r.call(e);
				} catch {}
			}
		}
	}
}
[.../* @__PURE__ */ "allowfullscreen.async.autofocus.autoplay.checked.controls.default.disabled.formnovalidate.indeterminate.inert.ismap.loop.multiple.muted.nomodule.novalidate.open.playsinline.readonly.required.reversed.seamless.selected.webkitdirectory.defer.disablepictureinpicture.disableremoteplayback".split(".")];
var _r = ["touchstart", "touchmove"];
function vr(e) {
	return _r.includes(e);
}
// node_modules/svelte/src/internal/client/dom/elements/events.js
var yr = Symbol("events"), br = /* @__PURE__ */ new Set(), xr = /* @__PURE__ */ new Set();
function Sr(e, t, n, r = {}) {
	function i(e) {
		if (r.capture || Dr.call(t, e), !e.cancelBubble) return lt(() => n?.call(this, e));
	}
	return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? (i.__removed = !1, et(() => {
		i.__removed || t.addEventListener(e, i, r);
	})) : t.addEventListener(e, i, r), i;
}
function Cr(e, t, n, r, i) {
	var a = {
		capture: r,
		passive: i
	}, o = Sr(e, t, n, a);
	(t === document.body || t === window || t === document || t instanceof HTMLMediaElement) && xn(() => {
		o.__removed = !0, t.removeEventListener(e, o, a);
	});
}
function V(e, t, n) {
	(t[yr] ??= {})[e] = n;
}
function wr(e) {
	for (var t = 0; t < e.length; t++) br.add(e[t]);
	for (var n of xr) n(e);
}
var Tr = null, Er = !1;
function Dr(e) {
	var t = this, n = t.ownerDocument, r = e.type, i = e.composedPath?.() || [], a = i[0] || e.target;
	Tr = e, Er || (Er = !0, setTimeout(() => {
		Er = !1, Tr = null;
	}));
	var s = 0, c = Tr === e && e[yr];
	if (c) {
		var l = i.indexOf(c);
		if (l !== -1 && (t === document || t === window)) {
			e[yr] = t;
			return;
		}
		var u = i.indexOf(t);
		if (u === -1) return;
		l <= u && (s = l);
	}
	if (a = i[s] || e.target, a !== t) {
		o(e, "currentTarget", {
			configurable: !0,
			get() {
				return a || n;
			}
		});
		var d = R, f = z;
		Gn(null), Kn(null);
		try {
			for (var p, m = []; a !== null && a !== t;) {
				try {
					var h = a[yr]?.[r];
					h == null || a.disabled && e.target !== a || h.call(a, e);
				} catch (e) {
					p ? m.push(e) : p = e;
				}
				if (e.cancelBubble) break;
				s++, a = s < i.length ? i[s] : null;
			}
			if (p) {
				for (let e of m) queueMicrotask(() => {
					throw e;
				});
				throw p;
			}
		} finally {
			e[yr] = t, delete e.currentTarget, Gn(d), Kn(f);
		}
	}
}
// node_modules/svelte/src/internal/client/dom/reconciler.js
var Or = globalThis?.window?.trustedTypes && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", { createHTML: (e) => e });
function kr(e) {
	return Or?.createHTML(e) ?? e;
}
function Ar(e) {
	var t = pn("template");
	return t.innerHTML = kr(e.replaceAll("<!>", "<!---->")), t.content;
}
// node_modules/svelte/src/internal/client/dom/template.js
function jr(e, t) {
	var n = z;
	n.nodes === null && (n.nodes = {
		start: e,
		end: t,
		a: null,
		t: null
	});
}
/*#__NO_SIDE_EFFECTS__*/
function H(e, t) {
	var n = !!(t & 1), r = !!(t & 2), i, a = !e.startsWith("<!>");
	return () => {
		if (E) return jr(D, null), D;
		i === void 0 && (i = Ar(a ? e : "<!>" + e), n || (i = /* @__PURE__ */ ln(i)));
		var t = r || rn ? document.importNode(i, !0) : i.cloneNode(!0);
		if (n) {
			var o = /* @__PURE__ */ ln(t), s = t.lastChild;
			jr(o, s);
		} else jr(t, t);
		return t;
	};
}
function Mr(e = "") {
	if (!E) {
		var t = cn(e + "");
		return jr(t, t), t;
	}
	var n = D;
	return n.nodeType === 3 ? mn(n) : (n.before(n = cn()), De(n)), jr(n, n), n;
}
function Nr() {
	if (E) return jr(D, null), D;
	var e = document.createDocumentFragment(), t = document.createComment(""), n = cn();
	return e.append(t, n), jr(t, n), e;
}
function U(e, t) {
	if (E) {
		var n = z;
		n.f & 32768 && n.nodes.end !== null || (n.nodes.end = D), Oe();
	} else e !== null && e.before(t);
}
// node_modules/svelte/src/reactivity/create-subscriber.js
function Pr(e) {
	let t = 0, n = Gt(0), r;
	return () => {
		bn() && (B(n), Dn(() => (t === 0 && (r = mr(() => e(() => Zt(n)))), t += 1, () => {
			et(() => {
				--t, t === 0 && (r?.(), r = void 0, Zt(n));
			});
		})));
	};
}
// node_modules/svelte/src/internal/client/dom/blocks/boundary.js
var Fr = T | ee;
function Ir(e, t, n, r) {
	new Lr(e, t, n, r);
}
var Lr = class {
	parent;
	is_pending = !1;
	transform_error;
	#e;
	#t = E ? D : null;
	#n;
	#r;
	#i;
	#a = null;
	#o = null;
	#s = null;
	#c = null;
	#l = 0;
	#u = 0;
	#d = !1;
	#f = /* @__PURE__ */ new Map();
	#p = null;
	#m = Pr(() => (this.#p = Gt(this.#l), () => {
		this.#p = null;
	}));
	constructor(e, t, n, r) {
		this.#e = e, this.#n = t, this.#r = (e) => {
			var t = z;
			t.b = this, t.f |= 128, n(e);
		}, this.parent = z.b, this.transform_error = r ?? this.parent?.transform_error ?? ((e) => e), this.#i = On(() => {
			if (E) {
				let e = je(this.#t);
				Oe();
				let t = e === "[!";
				if (e.startsWith("[?")) {
					let t = JSON.parse(e.slice(2));
					this.#g(t);
				} else t ? this.#y() : this.#h();
			} else this.#b();
		}, Fr), E && (this.#e = D);
	}
	#h() {
		try {
			this.#a = kn(() => this.#r(this.#e));
		} catch (e) {
			this.error(e);
		}
	}
	#g(e) {
		let t = this.#n.failed, { reset: n, invoke_onerror: r } = this.#_(e);
		et(r), t && (this.#s = kn(() => {
			t(this.#e, () => e, () => n);
		}));
	}
	#_(e) {
		var t = !1, n = !1;
		let r = () => {
			this.#v() || (t ? Te() : (t = !0, n && Ge(), this.#s !== null && In(this.#s, () => {
				this.#s = null;
			}), this.#S(() => {
				this.#b();
			})));
		};
		return {
			reset: r,
			invoke_onerror: () => {
				if (!this.#v()) try {
					n = !0, this.#n.onerror?.(e, r), n = !1;
				} catch (e) {
					gn(e, this.#i && this.#i.parent);
				}
			}
		};
	}
	#v() {
		return (this.#i.f & (S | w)) !== 0;
	}
	#y() {
		let e = this.#n.pending;
		e && (this.is_pending = !0, this.#o = kn(() => e(this.#e)), et(() => {
			if (!this.#v()) {
				var e = this.#c = document.createDocumentFragment(), t = cn(), n = !1;
				e.append(t), this.#a = this.#S(() => {
					try {
						return kn(() => this.#r(t));
					} catch (e) {
						try {
							this.error(e), n = !0;
						} catch (e) {
							gn(e, this.#i.parent);
						}
						return null;
					}
				}), this.#a === null ? (this.#c = null, n && this.#x(A)) : this.#u === 0 && (this.#e.before(e), this.#c = null, In(this.#o, () => {
					this.#o = null;
				}), this.#x(A));
			}
		}));
	}
	#b() {
		try {
			if (this.is_pending = this.has_pending_snippet(), this.#u = 0, this.#l = 0, this.#a = kn(() => {
				this.#r(this.#e);
			}), this.#u > 0) {
				var e = this.#c = document.createDocumentFragment();
				Bn(this.#a, e);
				let t = this.#n.pending;
				this.#o = kn(() => t(this.#e));
			} else this.#x(A);
		} catch (e) {
			this.error(e);
		}
	}
	#x(e) {
		this.is_pending = !1, e.transfer_reactions(this.#f);
	}
	defer_effect(e) {
		at(e, this.#f);
	}
	is_rendered() {
		return !this.is_pending && (!this.parent || this.parent.is_rendered());
	}
	has_pending_snippet() {
		return !!this.#n.pending;
	}
	#S(e) {
		var t = z, n = R, r = Ke;
		Kn(this.#i), Gn(this.#i), qe(this.#i.ctx);
		try {
			return Pt.ensure(), e();
		} finally {
			Kn(t), Gn(n), qe(r);
		}
	}
	#C(e, t) {
		this.has_pending_snippet() ? (this.#u += e, this.#u === 0 && (this.#x(t), this.#o && In(this.#o, () => {
			this.#o = null;
		}), this.#c &&= (this.#e.before(this.#c), null))) : this.parent && this.parent.#C(e, t);
	}
	update_pending_count(e, t) {
		this.#C(e, t), this.#l += e, !this.#p || this.#d || (this.#d = !0, et(() => {
			this.#d = !1, this.#p && Yt(this.#p, this.#l);
		}));
	}
	get_effect_pending() {
		return this.#m(), B(this.#p);
	}
	error(e) {
		if (e === _e || !this.#n.onerror && !this.#n.failed) throw e;
		A?.is_fork ? (this.#a && A.skip_effect(this.#a), this.#o && A.skip_effect(this.#o), this.#s && A.skip_effect(this.#s), A.oncommit(() => {
			this.#v() || this.#w(e);
		})) : this.#w(e);
	}
	#w(e) {
		this.#a &&= (Nn(this.#a), null), this.#o &&= (Nn(this.#o), null), this.#s &&= (Nn(this.#s), null), E && (De(this.#t), ke(), De(Ae()));
		let t = this.#n.failed, n = (e) => {
			if (this.#v()) return;
			let { reset: n, invoke_onerror: r } = this.#_(e);
			r(), t && !this.#v() && (this.#s = this.#S(() => {
				try {
					return kn(() => {
						var r = z;
						r.b = this, r.f |= 128, t(this.#e, () => e, () => n);
					});
				} catch (e) {
					return gn(e, this.#i.parent), null;
				}
			}));
		};
		et(() => {
			if (!this.#v()) {
				var t;
				try {
					t = this.transform_error(e);
				} catch (e) {
					gn(e, this.#i && this.#i.parent);
					return;
				}
				typeof t == "object" && t && typeof t.then == "function" ? t.then(n, (e) => gn(e, this.#i && this.#i.parent)) : n(t);
			}
		});
	}
};
function W(e, t) {
	var n = t == null ? "" : typeof t == "object" ? `${t}` : t;
	n !== (e[pe] ??= e.nodeValue) && (e[pe] = n, e.nodeValue = `${n}`);
}
function Rr(e, t) {
	return Br(e, t);
}
var zr = /* @__PURE__ */ new Map();
function Br(e, { target: t, anchor: n, props: r = {}, events: i, context: o, intro: s = !0, transformError: c }) {
	sn();
	var l = void 0, u = wn(() => {
		var s = n ?? t.appendChild(cn());
		Ir(s, { pending: () => {} }, (t) => {
			Je({});
			var n = Ke;
			if (o && (n.c = o), i && (r.$$events = i), E && jr(t, null), l = e(t, r) || Xe(), E && (z.nodes.end = D, D === null || D.nodeType !== 8 || D.data !== "]")) throw Ce(), _e;
			Ye();
		}, c);
		var u = /* @__PURE__ */ new Set(), d = (e) => {
			for (var n = 0; n < e.length; n++) {
				var r = e[n];
				if (!u.has(r)) {
					u.add(r);
					var i = vr(r);
					for (let e of [t, document]) {
						var a = zr.get(e);
						a === void 0 && (a = /* @__PURE__ */ new Map(), zr.set(e, a));
						var o = a.get(r);
						o === void 0 ? (e.addEventListener(r, Dr, { passive: i }), a.set(r, 1)) : a.set(r, o + 1);
					}
				}
			}
		};
		return d(a(br)), xr.add(d), () => {
			for (var e of u) for (let n of [t, document]) {
				var r = zr.get(n), i = r.get(e);
				--i == 0 ? (n.removeEventListener(e, Dr), r.delete(e), r.size === 0 && zr.delete(n)) : r.set(e, i);
			}
			xr.delete(d), s !== n && s.parentNode?.removeChild(s);
		};
	});
	return Vr.set(l, u), l;
}
var Vr = /* @__PURE__ */ new WeakMap();
function Hr(e, t) {
	let n = Vr.get(e);
	return n ? (Vr.delete(e), n(t)) : Promise.resolve();
}
// node_modules/svelte/src/internal/client/dom/blocks/branches.js
var Ur = class {
	anchor;
	#e = /* @__PURE__ */ new Map();
	#t = /* @__PURE__ */ new Map();
	#n = /* @__PURE__ */ new Map();
	#r = /* @__PURE__ */ new Set();
	#i = !0;
	constructor(e, t = !0) {
		this.anchor = e, this.#i = t;
	}
	#a = (e) => {
		if (this.#e.has(e)) {
			var t = this.#e.get(e), n = this.#t.get(t);
			if (n) Rn(n), this.#r.delete(t);
			else {
				var r = this.#n.get(t);
				r && (Rn(r.effect), this.#t.set(t, r.effect), this.#n.delete(t), r.fragment.lastChild.remove(), this.anchor.before(r.fragment), n = r.effect);
			}
			for (let [t, n] of this.#e) {
				if (this.#e.delete(t), t === e) break;
				let r = this.#n.get(n);
				r && (Nn(r.effect), this.#n.delete(n));
			}
			for (let [e, r] of this.#t) {
				if (e === t || this.#r.has(e)) continue;
				let i = () => {
					if (Array.from(this.#e.values()).includes(e)) {
						var t = document.createDocumentFragment();
						Bn(r, t), t.append(cn()), this.#n.set(e, {
							effect: r,
							fragment: t
						});
					} else Nn(r);
					this.#r.delete(e), this.#t.delete(e);
				};
				this.#i || !n ? (this.#r.add(e), In(r, i, !1)) : i();
			}
		}
	};
	#o = (e) => {
		this.#e.delete(e);
		let t = Array.from(this.#e.values());
		for (let [e, n] of this.#n) t.includes(e) || (Nn(n.effect), this.#n.delete(e));
	};
	ensure(e, t) {
		var n = A, r = fn();
		if (t && !this.#t.has(e) && !this.#n.has(e)) {
			if (r) {
				var i = document.createDocumentFragment(), a = cn();
				i.append(a), this.#n.set(e, {
					effect: kn(() => t(a)),
					fragment: i
				});
			} else this.#t.set(e, kn(() => t(this.anchor)));
		}
		if (this.#e.set(n, e), r) {
			for (let [t, r] of this.#t) t === e ? n.unskip_effect(r) : n.skip_effect(r);
			for (let [t, r] of this.#n) t === e ? n.unskip_effect(r.effect) : n.skip_effect(r.effect);
			n.oncommit(this.#a), n.ondiscard(this.#o);
		} else E && (this.anchor = D), this.#a(n);
	}
};
// node_modules/svelte/src/internal/client/dom/blocks/if.js
function G(e, t, n = !1) {
	var r;
	E && (r = D, Oe());
	var i = new Ur(e), a = n ? T : 0;
	function o(e, t) {
		if (E) {
			var n = je(r);
			if (e !== parseInt(n.substring(1))) {
				var a = Ae();
				De(a), i.anchor = a, Ee(!1), i.ensure(e, t), Ee(!0);
				return;
			}
		}
		i.ensure(e, t);
	}
	On(() => {
		var e = !1;
		t((t, n = 0) => {
			e = !0, o(n, t);
		}), e || o(-1, null);
	}, a);
}
// node_modules/svelte/src/internal/client/dom/blocks/key.js
var Wr = Symbol("NaN");
function Gr(e, t, n) {
	E && Oe();
	var r = new Ur(e), i = !Ze();
	On(() => {
		var e = t();
		e !== e && (e = Wr), i && typeof e == "object" && e && (e = {}), r.ensure(e, n);
	});
}
// node_modules/svelte/src/internal/client/dom/blocks/each.js
function Kr(e, t) {
	return t;
}
function qr(e, t, n) {
	for (var r = [], i = t.length, o, s = t.length, c = 0; c < i; c++) {
		let n = t[c];
		In(n, () => {
			if (o) {
				if (o.pending.delete(n), o.done.add(n), o.pending.size === 0) {
					var t = e.outrogroups;
					Jr(e, a(o.done)), t.delete(o), t.size === 0 && (e.outrogroups = null);
				}
			} else --s;
		}, !1);
	}
	if (s === 0) {
		var l = r.length === 0 && n !== null && e.pending.size === 0;
		if (l) {
			var u = n, d = u.parentNode;
			dn(d), d.append(u), e.items.clear();
		}
		Jr(e, t, !l);
	} else o = {
		pending: new Set(t),
		done: /* @__PURE__ */ new Set()
	}, (e.outrogroups ??= /* @__PURE__ */ new Set()).add(o);
}
function Jr(e, t, n = !0) {
	var r;
	if (e.pending.size > 0) {
		r = /* @__PURE__ */ new Set();
		for (let t of e.pending.values()) for (let n of t) r.add(e.items.get(n).e);
	}
	for (var i = 0; i < t.length; i++) {
		var a = t[i];
		r?.has(a) ? (a.f |= ne, Bn(a, document.createDocumentFragment())) : Nn(t[i], n);
	}
}
var Yr;
function Xr(e, t, r, i, o, s = null) {
	var c = e, l = /* @__PURE__ */ new Map();
	if (t & 4) {
		var u = e;
		c = E ? De(/* @__PURE__ */ ln(u)) : u.appendChild(cn());
	}
	E && Oe();
	var d = null, f = /* @__PURE__ */ vt(() => {
		var e = r();
		return n(e) ? e : e == null ? [] : a(e);
	}), p = /* @__PURE__ */ new Map(), m = !0;
	function h(e) {
		if (!(_.effect.f & 16384)) {
			_.pending.delete(e);
			var n = B(f);
			_.fallback = d, Qr(_, n, c, t, i), d !== null && (n.length === 0 ? d.f & 33554432 ? (d.f ^= ne, ei(d, null, c)) : Rn(d) : In(d, () => {
				d = null;
			}));
		}
	}
	function g(e) {
		_.pending.delete(e);
	}
	var _ = {
		effect: On(() => {
			var e = B(f), n = e.length;
			let a = !1;
			E && je(c) === "[!" != (n === 0) && (c = Ae(), De(c), Ee(!1), a = !0);
			for (var u = /* @__PURE__ */ new Set(), _ = A, v = fn(), y = 0; y < n; y += 1) {
				E && D.nodeType === 8 && D.data === "]" && (c = D, a = !0, Ee(!1));
				var b = e[y], x = i(b, y), S = m ? null : l.get(x);
				S ? (S.v && Yt(S.v, b), S.i && Yt(S.i, y), v && _.unskip_effect(S.e)) : (S = $r(l, m ? c : Yr ??= cn(), b, x, y, o, t, r), m || (S.e.f |= ne), l.set(x, S)), u.add(x);
			}
			if (n === 0 && s && !d && (m ? d = kn(() => s(c)) : (d = kn(() => s(Yr ??= cn())), d.f |= ne)), n > u.size && Ie("", "", ""), E && n > 0 && De(Ae()), !m) {
				if (p.set(_, u), v) {
					for (let [e, t] of l) u.has(e) || _.skip_effect(t.e);
					_.oncommit(h), _.ondiscard(g);
				} else h(_);
			}
			a && Ee(!0), B(f);
		}),
		flags: t,
		items: l,
		pending: p,
		outrogroups: null,
		fallback: d
	};
	m = !1, E && (c = D);
}
function Zr(e) {
	for (; e !== null && !(e.f & 32);) e = e.next;
	return e;
}
function Qr(e, t, n, r, i) {
	var o = !!(r & 8), s = t.length, c = e.items, l = Zr(e.effect.first), u, d = null, f, p = [], m = [], h, g, _, v;
	if (o) for (v = 0; v < s; v += 1) h = t[v], g = i(h, v), _ = c.get(g).e, _.f & 33554432 || (_.nodes?.a?.measure(), (f ??= /* @__PURE__ */ new Set()).add(_));
	for (v = 0; v < s; v += 1) {
		if (h = t[v], g = i(h, v), _ = c.get(g).e, e.outrogroups !== null) for (let t of e.outrogroups) t.pending.delete(_), t.done.delete(_);
		if (_.f & 8192 && (Rn(_), o && (_.nodes?.a?.unfix(), (f ??= /* @__PURE__ */ new Set()).delete(_))), _.f & 33554432) {
			if (_.f ^= ne, _ === l) ei(_, null, n);
			else {
				var y = d ? d.next : l;
				_ === e.effect.last && (e.effect.last = _.prev), _.prev && (_.prev.next = _.next), _.next && (_.next.prev = _.prev), ti(e, d, _), ti(e, _, y), ei(_, y, n), d = _, p = [], m = [], l = Zr(d.next);
				continue;
			}
		}
		if (_ !== l) {
			if (u !== void 0 && u.has(_)) {
				if (p.length < m.length) {
					var b = m[0], x;
					d = b.prev;
					var S = p[0], C = p[p.length - 1];
					for (x = 0; x < p.length; x += 1) ei(p[x], b, n);
					for (x = 0; x < m.length; x += 1) u.delete(m[x]);
					ti(e, S.prev, C.next), ti(e, d, S), ti(e, C, b), l = b, d = C, --v, p = [], m = [];
				} else u.delete(_), ei(_, l, n), ti(e, _.prev, _.next), ti(e, _, d === null ? e.effect.first : d.next), ti(e, d, _), d = _;
				continue;
			}
			for (p = [], m = []; l !== null && l !== _;) (u ??= /* @__PURE__ */ new Set()).add(l), m.push(l), l = Zr(l.next);
			if (l === null) continue;
		}
		_.f & 33554432 || p.push(_), d = _, l = Zr(_.next);
	}
	if (e.outrogroups !== null) {
		for (let t of e.outrogroups) t.pending.size === 0 && (Jr(e, a(t.done)), e.outrogroups?.delete(t));
		e.outrogroups.size === 0 && (e.outrogroups = null);
	}
	if (l !== null || u !== void 0) {
		var w = [];
		if (u !== void 0) for (_ of u) _.f & 8192 || w.push(_);
		for (; l !== null;) !(l.f & 8192) && l !== e.fallback && w.push(l), l = Zr(l.next);
		var T = w.length;
		if (T > 0) {
			var ee = r & 4 && s === 0 ? n : null;
			if (o) {
				for (v = 0; v < T; v += 1) w[v].nodes?.a?.measure();
				for (v = 0; v < T; v += 1) w[v].nodes?.a?.fix();
			}
			qr(e, w, ee);
		}
	}
	o && et(() => {
		if (f !== void 0) for (_ of f) _.nodes?.a?.apply();
	});
}
function $r(e, t, n, r, i, a, o, s) {
	var c = o & 1 ? o & 16 ? Gt(n) : /* @__PURE__ */ Kt(n, !1, !1) : null, l = o & 2 ? Gt(i) : null;
	return {
		v: c,
		i: l,
		e: kn(() => (a(t, c ?? n, l ?? i, s), () => {
			e.delete(r);
		}))
	};
}
function ei(e, t, n) {
	if (e.nodes) for (var r = e.nodes.start, i = e.nodes.end, a = t && !(t.f & 33554432) ? t.nodes.start : n; r !== null;) {
		var o = /* @__PURE__ */ un(r);
		if (a.before(r), r === i) return;
		r = o;
	}
}
function ti(e, t, n) {
	t === null ? e.effect.first = n : t.next = n, n === null ? e.effect.last = t : n.prev = t;
}
function K(e, t, n = !1, r = !1, i = !1, a = !1) {
	var o = e, s = "";
	if (n) {
		var c = e;
		E && (o = De(/* @__PURE__ */ ln(c)));
	}
	L(() => {
		var e = z;
		if (s === (s = t() ?? "")) E && Oe();
		else if (n && !E) e.nodes = null, c.innerHTML = s, s !== "" && jr(/* @__PURE__ */ ln(c), c.lastChild);
		else if (e.nodes !== null && (Pn(e.nodes.start, e.nodes.end), e.nodes = null), s !== "") {
			if (E) {
				for (var a = D.data, l = Oe(), u = l; l !== null && (l.nodeType !== 8 || l.data !== "");) u = l, l = /* @__PURE__ */ un(l);
				if (l === null) throw Ce(), _e;
				jr(D, u), o = De(l);
			} else {
				var d = pn(r ? "svg" : i ? "math" : "template", r ? be : i ? xe : void 0);
				d.innerHTML = s;
				var f = r || i ? d : d.content;
				if (jr(/* @__PURE__ */ ln(f), f.lastChild), r || i) for (; /* @__PURE__ */ ln(f);) o.before(/* @__PURE__ */ ln(f));
				else o.before(f);
			}
		}
	});
}
// node_modules/svelte/src/internal/client/dom/blocks/svelte-component.js
function ni(e, t, n) {
	var r;
	E && (r = D, Oe());
	var i = new Ur(e);
	On(() => {
		var e = t() ?? null;
		if (E && je(r) === "[" != (e !== null)) {
			var a = Ae();
			De(a), i.anchor = a, Ee(!1), i.ensure(e, e && ((t) => n(t, e))), Ee(!0);
		} else i.ensure(e, e && ((t) => n(t, e)));
	}, T);
}
// node_modules/svelte/src/internal/client/dom/elements/actions.js
function ri(e, t, n) {
	Tn(() => {
		var r = mr(() => t(e, n?.()) || {});
		if (n && r?.update) {
			var i = !1, a = {};
			Dn(() => {
				var e = n();
				hr(e), i && Ne(a, e) && (a = e, r.update(e));
			}), i = !0;
		}
		if (r?.destroy) return () => r.destroy();
	});
}
// node_modules/svelte/src/internal/shared/attributes.js
var ii = [..." 	\n\r\f\xA0\v﻿"];
function ai(e, t, n) {
	var r = e == null ? "" : "" + e;
	if (t && (r = r ? r + " " + t : t), n) {
		for (var i of Object.keys(n)) if (n[i]) r = r ? r + " " + i : i;
		else if (r.length) for (var a = i.length, o = 0; (o = r.indexOf(i, o)) >= 0;) {
			var s = o + a;
			(o === 0 || ii.includes(r[o - 1])) && (s === r.length || ii.includes(r[s])) ? r = (o === 0 ? "" : r.substring(0, o)) + r.substring(s + 1) : o = s;
		}
	}
	return r === "" ? null : r;
}
function oi(e, t = !1) {
	var n = t ? " !important;" : ";", r = "";
	for (var i of Object.keys(e)) {
		var a = e[i];
		a != null && a !== "" && (r += " " + i + ": " + a + n);
	}
	return r;
}
function si(e) {
	return e[0] !== "-" || e[1] !== "-" ? e.toLowerCase() : e;
}
function ci(e, t) {
	if (t) {
		var n = "", r, i;
		if (Array.isArray(t) ? (r = t[0], i = t[1]) : r = t, e) {
			e = String(e).replaceAll(/\/\*.*?\*\//g, "").trim();
			var a = !1, o = 0, s = !1, c = [];
			r && c.push(...Object.keys(r).map(si)), i && c.push(...Object.keys(i).map(si));
			var l = 0, u = -1;
			let t = e.length;
			for (var d = 0; d < t; d++) {
				var f = e[d];
				if (s ? f === "/" && e[d - 1] === "*" && (s = !1) : a ? a === f && (a = !1) : f === "/" && e[d + 1] === "*" ? s = !0 : f === "\"" || f === "'" ? a = f : f === "(" ? o++ : f === ")" && o--, !s && a === !1 && o === 0) {
					if (f === ":" && u === -1) u = d;
					else if (f === ";" || d === t - 1) {
						if (u !== -1) {
							var p = si(e.substring(l, u).trim());
							if (!c.includes(p)) {
								f !== ";" && d++;
								var m = e.substring(l, d).trim();
								n += " " + m + ";";
							}
						}
						l = d + 1, u = -1;
					}
				}
			}
		}
		return r && (n += oi(r)), i && (n += oi(i, !0)), n = n.trim(), n === "" ? null : n;
	}
	return e == null ? null : String(e);
}
// node_modules/svelte/src/internal/client/dom/elements/class.js
function q(e, t, n, r, i, a) {
	var o = e[de];
	if (E || o !== n || o === void 0) {
		var s = ai(n, r, a);
		E && s === e.getAttribute("class") || (s == null ? e.removeAttribute("class") : t ? e.className = s : e.setAttribute("class", s)), e[de] = n;
	} else if (a && i !== a) for (var c in a) {
		var l = !!a[c];
		(i == null || l !== !!i[c]) && e.classList.toggle(c, l);
	}
	return a;
}
// node_modules/svelte/src/internal/client/dom/elements/style.js
function li(e, t = {}, n, r) {
	for (var i in n) {
		var a = n[i];
		t[i] !== a && (n[i] == null ? e.style.removeProperty(i) : e.style.setProperty(i, a, r));
	}
}
function ui(e, t, n, r) {
	var i = e[fe];
	if (E || i !== t) {
		var a = ci(t, r);
		E && a === e.getAttribute("style") || (a == null ? e.removeAttribute("style") : e.style.cssText = a), e[fe] = t;
	} else r && (Array.isArray(r) ? (li(e, n?.[0], r[0]), li(e, n?.[1], r[1], "important")) : li(e, n, r));
	return r;
}
// node_modules/svelte/src/internal/client/dom/elements/bindings/select.js
function di(e, t) {
	t ? e.hasAttribute("selected") || e.setAttribute("selected", "") : e.removeAttribute("selected");
}
function fi(e, t) {
	var r = e.__defaultValue, i = e.multiple, a = i ? r ?? [] : null;
	if (!i || n(a)) {
		var o = e.selectedIndex, s = t && i ? new Set(e.selectedOptions) : null;
		for (var c of e.options) {
			var l = gi(c);
			di(c, i ? a.includes(l) : tn(l, r));
		}
		if (t) {
			if (s !== null) for (c of e.options) {
				var u = s.has(c);
				c.selected !== u && (c.selected = u);
			}
			else e.selectedIndex !== o && (e.selectedIndex = o);
		}
	}
}
function pi(e, t, r = !1) {
	if (e.multiple) {
		if (t == null) return;
		if (!n(t)) return we();
		for (var i of e.options) i.selected = t.includes(gi(i));
	} else {
		for (i of e.options) if (tn(gi(i), t)) {
			i.selected = !0;
			return;
		}
		r && t === void 0 || (e.selectedIndex = -1);
	}
}
function mi(e) {
	var t = new MutationObserver((t) => {
		t.every(_i) || ("__defaultValue" in e && fi(e, !1), "__value" in e && pi(e, e.__value));
	});
	t.observe(e, {
		childList: !0,
		subtree: !0,
		attributes: !0,
		attributeFilter: ["value"]
	}), xn(() => {
		t.disconnect();
	});
}
function hi(e, t, n = t) {
	var r = /* @__PURE__ */ new WeakSet(), i = !0;
	ut(e, "change", (t) => {
		var i = t ? "[selected]" : ":checked", a;
		if (e.multiple) a = [].map.call(e.querySelectorAll(i), gi);
		else {
			var o = e.querySelector(i) ?? e.querySelector("option:not([disabled])");
			a = o && gi(o);
		}
		n(a), e.__value = a, A !== null && r.add(A);
	}), Tn(() => {
		var a = t();
		if (e === document.activeElement) {
			var o = A;
			if (r.has(o)) return;
		}
		if (pi(e, a, i), i && a === void 0) {
			var s = e.querySelector(":checked");
			s !== null && (a = gi(s), n(a));
		}
		e.__value = a, i = !1;
	});
}
function gi(e) {
	return "__value" in e ? e.__value : e.value;
}
function _i(e) {
	if (e.target.closest("selectedcontent") !== null) return !0;
	if (e.type === "childList") {
		var t = [...e.addedNodes, ...e.removedNodes];
		return t.length > 0 && t.every((e) => e.nodeName === "SELECTEDCONTENT");
	}
	return !1;
}
// node_modules/svelte/src/internal/client/dom/elements/attributes.js
var vi = Symbol("is custom element"), yi = Symbol("is html"), bi = ge ? "link" : "LINK", xi = ge ? "progress" : "PROGRESS";
function Si(e) {
	if (E) {
		var t = !1, n = () => {
			if (!t) {
				if (t = !0, e.hasAttribute("value")) {
					var n = e.value;
					J(e, "value", null), e.value = n;
				}
				if (e.hasAttribute("checked")) {
					var r = e.checked;
					J(e, "checked", null), e.checked = r;
				}
			}
		};
		e[me] = n, et(n), ct();
	}
}
function Ci(e, t) {
	var n = Ti(e);
	n.value !== (n.value = t ?? void 0) && (e.value !== t || t === 0 && e.nodeName === xi) && (e.value = t ?? "");
}
function wi(e, t) {
	var n = Ti(e);
	n.checked !== (n.checked = t ?? void 0) && (e.checked = t);
}
function J(e, t, n, r) {
	var i = Ti(e);
	if (!(E && (i[t] = e.getAttribute(t), t === "src" || t === "srcset" || t === "href" && e.nodeName === bi))) {
		var a = i[t];
		a !== (i[t] = n) && (t === "loading" && (e[le] = n), n == null ? e.removeAttribute(t) : typeof n != "string" && Di(e).has(t) ? e[t] = n : (!E || typeof n != "number" && typeof n != "boolean" || a !== String(n)) && e.setAttribute(t, n));
	}
}
function Ti(e) {
	return e[ue] ??= {
		[vi]: e.nodeName.includes("-"),
		[yi]: e.namespaceURI === ye
	};
}
var Ei = /* @__PURE__ */ new Map();
function Di(e) {
	var t = e.getAttribute("is") || e.nodeName, n = Ei.get(t);
	if (n) return n;
	Ei.set(t, n = /* @__PURE__ */ new Set());
	for (var r, i = e, a = Element.prototype; a !== i;) {
		for (var o in r = c(i), r) r[o].set && o !== "innerHTML" && o !== "textContent" && o !== "innerText" && n.add(o);
		i = d(i);
	}
	return n;
}
// node_modules/svelte/src/internal/client/dom/elements/bindings/input.js
function Oi(e, t, n = t) {
	var r = /* @__PURE__ */ new WeakSet();
	ut(e, "input", async (i) => {
		var a = i ? e.defaultValue : e.value;
		if (a = ki(e) ? Ai(a) : a, n(a), A !== null && r.add(A), await dr(), a !== (a = t())) {
			var o = e.selectionStart, s = e.selectionEnd, c = e.value.length;
			if (e.value = a ?? "", s !== null) {
				var l = e.value.length;
				o === s && s === c && l > c ? (e.selectionStart = l, e.selectionEnd = l) : (e.selectionStart = o, e.selectionEnd = Math.min(s, l));
			}
		}
	}), (E && e.defaultValue !== e.value || mr(t) == null && e.value) && (n(ki(e) ? Ai(e.value) : e.value), A !== null && r.add(A)), Dn(() => {
		var n = t();
		if (e === document.activeElement) {
			var i = A;
			if (r.has(i)) return;
		}
		ki(e) && n === Ai(e.value) || (e.type !== "date" || n || e.value) && n !== e.value && (e.value = n ?? "");
	});
}
function ki(e) {
	var t = e.type;
	return t === "number" || t === "range";
}
function Ai(e) {
	return e === "" ? null : +e;
}
// node_modules/svelte/src/store/utils.js
function ji(e, t, n) {
	if (e == null) return t(void 0), n && n(void 0), m;
	let r = mr(() => e.subscribe(t, n));
	return r.unsubscribe ? () => r.unsubscribe() : r;
}
// node_modules/svelte/src/store/shared/index.js
var Mi = [];
function Ni(e, t = m) {
	let n = null, r = /* @__PURE__ */ new Set();
	function i(t) {
		if (Ne(e, t) && (e = t, n)) {
			let t = !Mi.length;
			for (let t of r) t[1](), Mi.push(t, e);
			if (t) {
				for (let e = 0; e < Mi.length; e += 2) Mi[e][0](Mi[e + 1]);
				Mi.length = 0;
			}
		}
	}
	function a(t) {
		i(t(e));
	}
	function o(o, s = m) {
		let c = [o, s];
		return r.add(c), r.size === 1 && (n = t(i, a) || m), o(e), () => {
			r.delete(c), r.size === 0 && n && (n(), n = null);
		};
	}
	return {
		set: i,
		update: a,
		subscribe: o
	};
}
function Pi(e) {
	let t;
	return ji(e, (e) => t = e)(), t;
}
// node_modules/svelte/src/internal/client/reactivity/store.js
var Fi = !1, Ii = Symbol("unmounted");
function Li(e, t, n) {
	let r = n[t] ??= {
		store: null,
		source: /* @__PURE__ */ Kt(void 0),
		unsubscribe: m
	};
	if (r.store !== e && !(Ii in n)) {
		if (r.unsubscribe(), r.store = e ?? null, e == null) r.source.v = void 0, r.unsubscribe = m;
		else {
			var i = !0;
			r.unsubscribe = ji(e, (e) => {
				i ? r.source.v = e : M(r.source, e);
			}), i = !1;
		}
	}
	return e && Ii in n ? Pi(e) : B(r.source);
}
function Ri() {
	let e = {};
	function t() {
		xn(() => {
			for (var t in e) e[t].unsubscribe();
			o(e, Ii, {
				enumerable: !1,
				value: !0
			});
		});
	}
	return [e, t];
}
function zi(e) {
	var t = Fi;
	try {
		return Fi = !1, [e(), Fi];
	} finally {
		Fi = t;
	}
}
// node_modules/svelte/src/internal/client/reactivity/props.js
var Bi = {
	get(e, t) {
		if (!e.exclude.has(t)) return e.props[t];
	},
	set(e, t) {
		return !1;
	},
	getOwnPropertyDescriptor(e, t) {
		if (!e.exclude.has(t) && t in e.props) return {
			enumerable: !0,
			configurable: !0,
			value: e.props[t]
		};
	},
	has(e, t) {
		return !e.exclude.has(t) && t in e.props;
	},
	ownKeys(e) {
		return Reflect.ownKeys(e.props).filter((t) => !e.exclude.has(t));
	}
};
/*#__NO_SIDE_EFFECTS__*/
function Vi(e, t, n) {
	return new Proxy({
		props: e,
		exclude: t
	}, Bi);
}
var Hi = {
	get(e, t) {
		let n = e.props.length;
		for (; n--;) {
			let r = e.props[n];
			if (p(r) && (r = r()), typeof r == "object" && r && t in r) return r[t];
		}
	},
	set(e, t, n) {
		let r = e.props.length;
		for (; r--;) {
			let i = e.props[r];
			p(i) && (i = i());
			let a = s(i, t);
			if (a && a.set) return a.set(n), !0;
		}
		return !1;
	},
	getOwnPropertyDescriptor(e, t) {
		let n = e.props.length;
		for (; n--;) {
			let r = e.props[n];
			if (p(r) && (r = r()), typeof r == "object" && r && t in r) {
				let e = s(r, t);
				return e && !e.configurable && (e.configurable = !0), e;
			}
		}
	},
	has(e, t) {
		if (t === oe || t === ce) return !1;
		for (let n of e.props) if (p(n) && (n = n()), n != null && t in n) return !0;
		return !1;
	},
	ownKeys(e) {
		let t = [];
		for (let n of e.props) if (p(n) && (n = n()), n) {
			for (let e in n) t.includes(e) || t.push(e);
			for (let e of Object.getOwnPropertySymbols(n)) t.includes(e) || t.push(e);
		}
		return t;
	}
};
function Ui(...e) {
	return new Proxy({ props: e }, Hi);
}
function Wi(e, t, n, r) {
	var i = !0, a = !!(n & 8), o = !!(n & 16), c = r, l = !0, u = void 0, d = () => o && i ? (u ??= /* @__PURE__ */ ht(r), B(u)) : (l && (l = !1, c = o ? mr(r) : r), c);
	let f;
	if (a) {
		var p = oe in e || ce in e;
		f = s(e, t)?.set ?? (p && t in e ? (n) => e[t] = n : void 0);
	}
	var m, h = !1;
	a ? [m, h] = zi(() => e[t]) : m = e[t], m === void 0 && r !== void 0 && (m = d(), f && (i && Ve(t), f(m)));
	var g = i ? () => {
		var n = e[t];
		return n === void 0 ? d() : (l = !0, n);
	} : () => {
		var n = e[t];
		return n !== void 0 && (c = void 0), n === void 0 ? c : n;
	};
	if (i && !(n & 4)) return g;
	if (f) {
		var _ = e.$$legacy;
		return (function(e, t) {
			return arguments.length > 0 ? ((!i || !t || _ || h) && f(t ? g() : e), e) : g();
		});
	}
	var v = !1, y = (n & 1 ? ht : vt)(() => (v = !1, g()));
	a && B(y);
	var b = z;
	return (function(e, t) {
		if (arguments.length > 0) {
			let n = t ? B(y) : i && a ? $t(e) : e;
			return M(y, n), v = !0, c !== void 0 && (c = n), e;
		}
		return Hn && v || b.f & 16384 ? y.v : B(y);
	});
}
// node_modules/svelte/src/internal/disclose-version.js
typeof window < "u" && ((window.__svelte ??= {}).v ??= /* @__PURE__ */ new Set()).add("5");
// svelte/View.svelte
function Gi(e, t) {
	let n = () => Li(t.values, "$values", r), [r, i] = Ri();
	var a = Nr();
	ni(P(a), () => t.component, (e, t) => {
		t(e, Ui(n));
	}), U(e, a), i();
}
// svelte/Inbox.svelte
var Ki = /* @__PURE__ */ H("<div class=\"ibTabs\" role=\"tablist\"><button type=\"button\"> <small> </small></button> <button type=\"button\"> <small> </small></button></div>"), qi = /* @__PURE__ */ H("<b> </b>"), Ji = /* @__PURE__ */ H("<button class=\"ghost\"></button>"), Yi = /* @__PURE__ */ H("<li><a><span></span> <span class=\"wt\"><span><!> </span> <small> </small></span></a> <!></li>"), Xi = /* @__PURE__ */ H("<ul></ul>"), Zi = /* @__PURE__ */ H("<p class=\"ibEmpty\"> </p>"), Qi = /* @__PURE__ */ H("<header><h2> </h2> <button class=\"ghost\"></button></header> <!> <!>", 1);
function $i(e, t) {
	Je(t, !0);
	let n = Wi(t, "all", 3, !1), r = /* @__PURE__ */ j($t(mr(() => n()))), i = (e) => {
		M(r, e, !0), t.ontab?.(e);
	}, a = /* @__PURE__ */ k(() => t.roomId ? t.waits.filter((e) => e.book_id === t.roomId) : []), o = /* @__PURE__ */ k(() => B(r) || !t.roomId), s = /* @__PURE__ */ k(() => B(o) ? t.waits : B(a)), c = (e) => (e.author_name || e.author.split("@")[0]).split(" ")[0], l = (e) => e.ref.startsWith("t") ? "task" : /^[ab]/.test(e.ref) ? "agent" : "ask", u = (e) => `/b/${e.book_id}${e.thread === "main" ? "" : `?t=${encodeURIComponent(e.thread)}`}${/^[mab]/.test(e.ref) ? `#m${e.ref.slice(1)}` : ""}`, d = (e) => e.length > 220 ? `${e.slice(0, 218)}…` : e;
	var f = Qi(), p = P(f), m = N(p), h = F(m, !0), g = I(m, 2);
	K(g, () => t.vb.icon("x", 18), !0), O(g), O(p);
	var _ = I(p, 2), v = (e) => {
		var n = Ki(), r = N(n);
		let s;
		var c = N(r), l = F(I(c), !0);
		O(r);
		var u = I(r, 2);
		let d;
		var f = N(u), p = F(I(f), !0);
		O(u), O(n), L((e, n) => {
			s = q(r, 1, "", null, s, { on: !B(o) }), W(c, `${e ?? ""} `), W(l, B(a).length), d = q(u, 1, "", null, d, { on: B(o) }), W(f, `${n ?? ""} `), W(p, t.waits.length);
		}, [() => t.vb.t("Esta sala"), () => t.vb.t("Todas")]), V("click", r, () => i(!1)), V("click", u, () => i(!0)), U(e, n);
	};
	G(_, (e) => {
		t.roomId && e(v);
	});
	var y = I(_, 2), b = (e) => {
		var n = Xi();
		Xr(n, 21, () => B(s), (e) => e.book_id + e.ref, (e, n) => {
			var r = Yi(), i = N(r), a = N(i);
			let s;
			K(a, () => l(B(n)) === "task" ? t.vb.icon("check", 16) : t.vb.avatar(B(n).author), !0), O(a);
			var f = I(a, 2), p = N(f), m = N(p), h = (e) => {
				var n = qi(), r = F(n, !0);
				L((e) => W(r, e), [() => t.vb.t("Tarefa sua esperando OK:")]), U(e, n);
			}, g = /* @__PURE__ */ k(() => l(B(n)) === "task"), _ = (e) => {
				var n = qi(), r = F(n, !0);
				L((e) => W(r, e), [() => t.vb.t("Seu agent espera você:")]), U(e, n);
			}, v = /* @__PURE__ */ k(() => l(B(n)) === "agent"), y = (e) => {
				var t = qi(), r = F(t);
				L((e) => W(r, `${e ?? ""}:`), [() => c(B(n))]), U(e, t);
			};
			G(m, (e) => {
				B(g) ? e(h) : B(v) ? e(_, 1) : e(y, -1);
			});
			var b = I(m);
			O(p);
			var x = F(I(p, 2));
			O(f), O(i);
			var S = I(i, 2), C = (e) => {
				var r = Ji();
				K(r, () => t.vb.icon("check"), !0), O(r), L((e, t) => {
					J(r, "title", e), J(r, "aria-label", t);
				}, [() => t.vb.t("Já resolvi (respondi em outro lugar, ou não é comigo)"), () => t.vb.t("Já resolvi (respondi em outro lugar, ou não é comigo)")]), V("click", r, () => t.onresolve(B(n))), U(e, r);
			}, w = /* @__PURE__ */ k(() => B(n).ref.startsWith("m"));
			G(S, (e) => {
				B(w) && e(C);
			}), O(r), L((e, t, r, c, l) => {
				J(i, "href", e), s = q(a, 1, "wIc", null, s, { task: t }), W(b, ` ${r ?? ""}`), W(x, `${B(o) ? `${B(n).room} › ` : ""}${c ?? ""} · ${l ?? ""}`);
			}, [
				() => u(B(n)),
				() => l(B(n)) === "task",
				() => d(B(n).text),
				() => B(n).topic || t.vb.t("sala principal"),
				() => t.vb.ago(B(n).ts)
			]), V("click", i, (e) => t.onopen(B(n), e)), U(e, r);
		}), O(n), U(e, n);
	}, x = (e) => {
		var n = Zi(), r = F(n, !0);
		L((e) => W(r, e), [() => B(o) ? t.vb.t("Nada esperando você. ✓") : t.vb.t("Nada esperando você nesta sala. ✓")]), U(e, n);
	};
	G(y, (e) => {
		B(s).length ? e(b) : e(x, -1);
	}), L((e, t) => {
		W(h, e), J(g, "aria-label", t);
	}, [() => t.vb.t("Caixa de entrada"), () => t.vb.t("Fechar")]), V("click", g, function(...e) {
		t.onclose?.apply(this, e);
	}), U(e, f), Ye();
}
wr(["click"]);
// svelte/TaskList.svelte
function ea(e) {
	e.focus(), e.select();
}
var ta = /* @__PURE__ */ H("<span class=\"vnote\"><!> </span>"), na = /* @__PURE__ */ H("<input class=\"tedit\"/>"), ra = /* @__PURE__ */ H("<span class=\"tt\" role=\"button\" tabindex=\"0\"> <!></span>"), ia = /* @__PURE__ */ H("<option> </option>"), aa = /* @__PURE__ */ H("<div><input type=\"checkbox\"/> <!> <select><option> </option><!></select> <button type=\"button\"><!> </button> <button class=\"ghost x\"></button></div>"), oa = /* @__PURE__ */ H("<div class=\"thead\"><b> </b><small> </small><i><span></span></i></div> <!> <!> <form class=\"row\" id=\"newTask\" style=\"margin-top:6px\"><input/><button></button></form>", 1);
function sa(e, t) {
	Je(t, !0);
	let n = Wi(t, "waits", 19, () => []), r = /* @__PURE__ */ k(() => t.room.epics.find((e) => e.id === t.thread) || (t.thread === "main" && t.room.roomTasks?.length ? {
		id: "main",
		tasks: t.room.roomTasks,
		flags: []
	} : null)), i = (e) => n().some((n) => n.book_id === t.room.id && n.ref === `t${e.id}`), a = /* @__PURE__ */ k(() => (B(r)?.tasks || []).map((e, t) => ({
		tk: e,
		i: t
	})).sort((e, t) => (e.tk.done ? 2 : +!i(e.tk)) - (t.tk.done ? 2 : +!i(t.tk)) || e.i - t.i).map((e) => e.tk)), o = /* @__PURE__ */ k(() => B(r)?.tasks.filter((e) => e.done).length || 0), s = /* @__PURE__ */ j(null), c = /* @__PURE__ */ j(""), l = /* @__PURE__ */ j("");
	function u(e, n = !0) {
		B(s) === e.id && (M(s, null), n && B(c).trim() && B(c) !== e.title && t.send({
			t: "task.rename",
			id: e.id,
			title: B(c)
		}));
	}
	function d(e) {
		let n = prompt(t.vb.t("Prazo (ex.: sex, qua 23h, 06/11). Vazio tira o prazo:"), e.due || "");
		n !== null && t.send({
			t: "task.assign",
			id: e.id,
			due: n
		});
	}
	var f = Nr(), p = P(f), m = (e) => {
		var n = oa(), f = P(n), p = N(f), m = F(p, !0), h = I(p), g = F(h), _ = I(h), v = N(_);
		let y;
		O(_), O(f);
		var b = I(f, 2), x = (e) => {
			var n = ta(), i = N(n);
			K(i, () => t.vb.icon("alert", 12));
			var a = I(i);
			O(n), L((e, t) => {
				J(n, "title", e), W(a, ` ${t ?? ""}`);
			}, [() => `@vibe: ${B(r).flags.join(" · ")}`, () => B(r).flags.join(" · ")]), U(e, n);
		};
		G(b, (e) => {
			B(r).flags?.length && e(x);
		});
		var S = I(b, 2);
		Xr(S, 17, () => B(a), (e) => e.id, (e, n) => {
			var r = aa();
			let a;
			var o = N(r);
			Si(o);
			var l = I(o, 2), f = (e) => {
				var t = na();
				Si(t), Tn(() => Oi(t, () => B(c), (e) => M(c, e))), ri(t, (e) => ea?.(e)), Cr("blur", t, () => u(B(n))), V("keydown", t, (e) => {
					e.key === "Enter" && u(B(n)), e.key === "Escape" && u(B(n), !1);
				}), U(e, t);
			}, p = (e) => {
				var r = ra(), i = N(r, !0), a = I(i), o = (e) => {
					var r = ta(), i = N(r);
					K(i, () => t.vb.icon("alert", 12));
					var a = I(i);
					O(r), L((e, t) => {
						J(r, "title", e), W(a, ` ${t ?? ""}`);
					}, [() => `@vibe: ${B(n).flags.join(" · ")}`, () => B(n).flags.join(" · ")]), U(e, r);
				};
				G(a, (e) => {
					B(n).flags?.length && e(o);
				}), O(r), L((e) => {
					J(r, "title", e), W(i, B(n).title);
				}, [() => t.vb.t("Clique para editar")]), V("click", r, () => {
					M(s, B(n).id, !0), M(c, B(n).title, !0);
				}), V("keydown", r, (e) => {
					e.key === "Enter" && (M(s, B(n).id, !0), M(c, B(n).title, !0));
				}), U(e, r);
			};
			G(l, (e) => {
				B(s) === B(n).id ? e(f) : e(p, -1);
			});
			var m = I(l, 2);
			let h;
			var g = N(m), _ = F(g, !0);
			g.value = g.__value = "", Xr(I(g), 17, () => t.room.members || [], Kr, (e, n) => {
				var r = ia(), i = F(r, !0), a = {};
				L((e) => {
					W(i, e), a !== (a = B(n)) && (r.value = (r.__value = a) ?? "");
				}, [() => B(n) === t.room.me ? t.vb.t("você") : t.vb.name(B(n))]), U(e, r);
			}), O(m);
			var v;
			mi(m);
			var y = I(m, 2);
			let b;
			var x = N(y);
			K(x, () => t.vb.icon("calendar", 13));
			var S = I(x, 1, !0);
			O(y);
			var C = I(y, 2);
			K(C, () => t.vb.icon("x"), !0), O(C), O(r), L((e, i, s, c, l, u, d) => {
				a = q(r, 1, "task", null, a, {
					done: B(n).done,
					mine: !B(n).done && B(n).owner === t.room.me,
					waitTask: e
				}), J(r, "data-task", B(n).id), wi(o, B(n).done), J(o, "aria-label", i), h = q(m, 1, "towner", null, h, { set: !!B(n).owner }), J(m, "data-owner", B(n).id), J(m, "aria-label", s), W(_, c), v !== (v = B(n).owner || "") && (m.value = (m.__value = v) ?? "", pi(m, v)), b = q(y, 1, "due", null, b, { set: !!B(n).due }), J(y, "data-due", B(n).id), J(y, "title", l), W(S, B(n).due ? ` ${B(n).due}` : ""), J(C, "data-tdel", B(n).id), J(C, "aria-label", u), J(C, "title", d);
			}, [
				() => i(B(n)),
				() => t.vb.t("Feita"),
				() => t.vb.t("Responsável"),
				() => t.vb.t("sem dono"),
				() => t.vb.t("Prazo"),
				() => t.vb.t("Apagar task"),
				() => t.vb.t("Apagar task")
			]), V("change", o, () => t.send({
				t: "task.toggle",
				id: B(n).id
			})), V("change", m, (e) => t.send({
				t: "task.assign",
				id: B(n).id,
				owner: e.currentTarget.value
			})), V("click", y, () => d(B(n))), V("click", C, () => t.send({
				t: "task.del",
				id: B(n).id
			})), U(e, r);
		});
		var C = I(S, 2), w = N(C);
		Si(w);
		var T = I(w);
		K(T, () => t.vb.icon("plus"), !0), O(T), O(C), L((e, t, n, i) => {
			W(m, e), W(g, `${B(o) ?? ""}/${B(r).tasks.length ?? ""}`), y = ui(v, "", y, { width: t }), J(w, "placeholder", n), J(T, "aria-label", i);
		}, [
			() => t.vb.t("Tarefas"),
			() => `${B(r).tasks.length ? Math.round(B(o) / B(r).tasks.length * 100) : 0}%`,
			() => t.vb.t("nova task"),
			() => t.vb.t("Nova tarefa")
		]), Cr("submit", C, (e) => {
			e.preventDefault(), B(l).trim() && t.send({
				t: "task.add",
				epic: t.thread,
				title: B(l)
			}), M(l, "");
		}), Oi(w, () => B(l), (e) => M(l, e)), U(e, n);
	};
	G(p, (e) => {
		B(r) && e(m);
	}), U(e, f), Ye();
}
wr([
	"change",
	"keydown",
	"click"
]);
// svelte/Tasks.svelte
var ca = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy"
]);
function la(e, t) {
	Je(t, !0);
	let n = /* @__PURE__ */ Vi(t, ca);
	var r = Nr();
	Gr(P(r), () => JSON.stringify([t.room.id, t.thread]), (e) => {
		sa(e, Ui(() => n));
	}), U(e, r), Ye();
}
// svelte/panels.ts
var ua = (e) => String(e ?? "").replace(/[&<>"']/g, (e) => ({
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	"\"": "&quot;",
	"'": "&#39;"
})[e]), da = (e) => e.type.startsWith("image/") ? "img" : e.type.startsWith("audio/") ? "audio" : e.type === "text/html" ? "html" : e.type === "application/pdf" ? "pdf" : /\.md$/i.test(e.name) || e.type === "text/markdown" ? "md" : e.type === "text/plain" || e.type === "text/csv" ? "txt" : "other", fa = (e) => e > 1e6 ? `${(e / 1e6).toFixed(1)} MB` : `${Math.max(1, Math.round(e / 1e3))} KB`, pa = /* @__PURE__ */ H("<button type=\"button\"><span class=\"kt\"> </span><!><span> </span></button>"), ma = /* @__PURE__ */ H("<section><h3 class=\"mine\"> </h3> <!></section>"), ha = /* @__PURE__ */ H("<section><h3><span class=\"ri\"> </span> </h3> <!></section>"), ga = /* @__PURE__ */ H("<div class=\"empty\"> </div>"), _a = /* @__PURE__ */ H("<div class=\"klist\"><!><!></div>"), va = /* @__PURE__ */ H("<span class=\"vnote\"><!> </span>"), ya = /* @__PURE__ */ H("<!><span> </span>", 1), ba = /* @__PURE__ */ H("<span><!> </span>"), xa = /* @__PURE__ */ H("<div draggable=\"true\" tabindex=\"0\" role=\"button\"><div class=\"kt\"></div> <!> <div class=\"km\"><span class=\"kep\"> </span><!><!></div></div>"), Sa = /* @__PURE__ */ H("<div class=\"kempty\"> </div>"), Ca = /* @__PURE__ */ H("<input type=\"hidden\" name=\"epic\"/>"), wa = /* @__PURE__ */ H("<option> </option>"), Ta = /* @__PURE__ */ H("<select name=\"epic\"></select>"), Ea = /* @__PURE__ */ H("<form class=\"kadd\"><input/><button></button><!></form>"), Da = /* @__PURE__ */ H("<section><h3> <span> </span></h3> <div class=\"cards\"></div> <!></section>"), Oa = /* @__PURE__ */ H("<div class=\"lanes\"></div>"), ka = /* @__PURE__ */ H("<div class=\"kbar\"><span class=\"seg\"><button type=\"button\" data-mode=\"board\"><!> </button><button type=\"button\" data-mode=\"list\"> </button></span><small class=\"kScope\"> </small></div> <!>", 1);
function Aa(e, t) {
	Je(t, !0);
	let n = (e, n = m) => {
		var r = pa();
		let i;
		var a = N(r), o = F(a, !0), s = I(a), c = (e) => {
			var r = Nr();
			K(P(r), () => t.vb.avatar(n().owner)), U(e, r);
		};
		G(s, (e) => {
			n().owner && e(c);
		});
		var l = I(s), u = F(l, !0);
		O(r), L((e) => {
			i = q(r, 1, "krow", null, i, { done: n().status === "done" }), J(r, "data-k", n().id), J(r, "data-epic", n().epic.id), W(o, n().title), q(l, 1, `kst ${n().status}`), W(u, e);
		}, [() => t.vb.t(p[n().status] || n().status)]), V("click", r, () => t.onopen?.(n().epic.id)), U(e, r);
	}, r = [
		["todo", "A fazer"],
		["doing", "Fazendo"],
		["review", "Esperando OK"],
		["done", "Feito"]
	], i = /* @__PURE__ */ j($t((() => {
		try {
			return localStorage.getItem("vb.boardMode") || "board";
		} catch {
			return "board";
		}
	})())), a = /* @__PURE__ */ j(""), o = /* @__PURE__ */ j(""), s = /* @__PURE__ */ j(null), c = /* @__PURE__ */ k(() => t.thread !== "main" && !t.thread.startsWith("pre:") && t.room.epics.some((e) => e.id === t.thread) ? t.thread : null), l = /* @__PURE__ */ k(() => t.room.epics.filter((e) => B(c) ? e.id === B(c) : !e.archived)), u = /* @__PURE__ */ k(() => B(l).flatMap((e) => e.tasks.map((t) => ({
		...t,
		epic: e
	})))), d = /* @__PURE__ */ k(() => [...B(c) ? [] : [{
		id: "main",
		title: t.room.book?.title || "vibebook",
		tasks: t.room.roomTasks || []
	}], ...B(l)].map((e) => ({
		e,
		list: e.tasks.filter((e) => e.status !== "done").map((t) => ({
			...t,
			epic: e
		}))
	})).filter((e) => e.list.length)), f = /* @__PURE__ */ k(() => B(d).flatMap((e) => e.list.filter((e) => e.owner === t.room.me))), p = {
		todo: "a fazer",
		doing: "fazendo",
		review: "esperando OK",
		done: "feito"
	}, h = (e, n) => t.send({
		t: "task.status",
		id: e,
		status: n
	});
	function g(e) {
		M(i, e, !0);
		try {
			localStorage.setItem("vb.boardMode", e);
		} catch {}
	}
	function v(e, t) {
		e.dataTransfer?.setData("text/plain", t), e.currentTarget.classList.add("dragging");
	}
	function y(e, t) {
		e.preventDefault(), M(s, null);
		let n = e.dataTransfer?.getData("text/plain");
		n && h(n, t);
	}
	function b(e, n) {
		let i = r.findIndex(([e]) => e === n.status);
		e.key === "ArrowRight" && i < r.length - 1 && (e.preventDefault(), h(n.id, r[i + 1][0])), e.key === "ArrowLeft" && i > 0 && (e.preventDefault(), h(n.id, r[i - 1][0])), e.key === "Enter" && t.onopen?.(n.epic.id);
	}
	var x = Nr(), S = P(x), C = (e) => {
		var l = ka(), p = P(l), m = N(p), h = N(m);
		let x;
		var S = N(h);
		K(S, () => t.vb.icon("board", 14));
		var C = I(S);
		O(h);
		var w = I(h);
		let T;
		var ee = F(w, !0);
		O(m);
		var te = F(I(m), !0);
		O(p);
		var ne = I(p, 2), re = (e) => {
			var r = _a(), i = N(r), a = (e) => {
				var r = ma(), i = N(r), a = F(i);
				Xr(I(i, 2), 17, () => B(f), (e) => e.id, (e, t) => {
					n(e, () => B(t));
				}), O(r), L((e) => W(a, `⏳ ${e ?? ""} · ${B(f).length ?? ""}`), [() => t.vb.t("Esperando você")]), U(e, r);
			};
			G(i, (e) => {
				B(f).length && e(a);
			}), Xr(I(i), 17, () => B(d), (e) => e.e.id, (e, r) => {
				var i = ha(), a = N(i), o = N(a);
				let s;
				var c = F(o, !0), l = I(o);
				O(a), Xr(I(a, 2), 17, () => B(r).list, (e) => e.id, (e, t) => {
					n(e, () => B(t));
				}), O(i), L((e, t) => {
					s = ui(o, "", s, { background: e }), W(c, t), W(l, `${B(r).e.title ?? ""} · ${B(r).list.length ?? ""}`);
				}, [() => t.vb.color(B(r).e.title), () => t.vb.initials(B(r).e.title)]), U(e, i);
			}, (e) => {
				var n = ga(), r = F(n, !0);
				L((e) => W(r, e), [() => t.vb.t("Nenhuma tarefa aberta.")]), U(e, n);
			}), O(r), U(e, r);
		}, ie = (e) => {
			var n = Oa();
			Xr(n, 21, () => r, Kr, (e, n) => {
				var r = /* @__PURE__ */ k(() => _(B(n), 2));
				let i = () => B(r)[0], l = () => B(r)[1], d = /* @__PURE__ */ k(() => B(u).filter((e) => e.status === i()));
				var f = Da();
				let p;
				var m = N(f), h = N(m, !0), g = F(I(h), !0);
				O(m);
				var x = I(m, 2);
				Xr(x, 21, () => B(d), (e) => e.id, (e, n) => {
					var r = xa();
					let i;
					var a = N(r);
					K(a, () => t.vb.mentions?.(ua(B(n).title)) ?? ua(B(n).title), !0), O(a);
					var o = I(a, 2), s = (e) => {
						var r = va(), i = N(r);
						K(i, () => t.vb.icon("alert", 12));
						var a = I(i);
						O(r), L((e, t) => {
							J(r, "title", e), W(a, ` ${t ?? ""}`);
						}, [() => `@vibe: ${B(n).flags.join(" · ")}`, () => B(n).flags.join(" · ")]), U(e, r);
					};
					G(o, (e) => {
						B(n).flags?.length && e(s);
					});
					var c = I(o, 2), l = N(c);
					let u;
					var d = F(l, !0), f = I(l), p = (e) => {
						var r = ya(), i = P(r);
						K(i, () => t.vb.avatar(B(n).owner));
						var a = F(I(i), !0);
						L((e) => W(a, e), [() => B(n).owner === t.room.me ? t.vb.t("você") : t.vb.name(B(n).owner)]), U(e, r);
					};
					G(f, (e) => {
						B(n).owner && e(p);
					});
					var m = I(f), h = (e) => {
						var r = ba(), i = N(r);
						K(i, () => t.vb.icon("calendar", 12));
						var a = I(i);
						O(r), L(() => W(a, ` ${B(n).due ?? ""}`)), U(e, r);
					};
					G(m, (e) => {
						B(n).due && e(h);
					}), O(c), O(r), L((e, a) => {
						i = q(r, 1, "kcard", null, i, {
							done: B(n).status === "done",
							mine: B(n).status !== "done" && B(n).owner === t.room.me
						}), J(r, "data-k", B(n).id), J(r, "data-status", B(n).status), J(r, "data-epic", B(n).epic.id), J(r, "title", e), u = ui(l, "", u, { background: a }), W(d, B(n).epic.title);
					}, [() => t.vb.t("Arraste, ou use ← →. Clique pra abrir o épico."), () => t.vb.color(B(n).epic.title)]), Cr("dragstart", r, (e) => v(e, B(n).id)), Cr("dragend", r, (e) => e.currentTarget.classList.remove("dragging")), V("click", r, () => t.onopen?.(B(n).epic.id)), V("keydown", r, (e) => b(e, B(n))), U(e, r);
				}, (e) => {
					var n = Sa(), r = F(n, !0);
					L((e) => W(r, e), [() => t.vb.t(i() === "todo" ? "Nada a fazer." : "Arraste um card pra cá.")]), U(e, n);
				}), O(x);
				var S = I(x, 2), C = (e) => {
					var n = Ea(), r = N(n);
					Si(r);
					var i = I(r);
					K(i, () => t.vb.icon("plus"), !0), O(i);
					var s = I(i), l = (e) => {
						var t = Ca();
						Si(t), L(() => Ci(t, B(c))), U(e, t);
					}, u = (e) => {
						var n = Ta();
						Xr(n, 21, () => t.room.epics, Kr, (e, t) => {
							var n = wa(), r = F(n, !0), i = {};
							L(() => {
								W(r, B(t).title), i !== (i = B(t).id) && (n.value = (n.__value = i) ?? "");
							}), U(e, n);
						}), O(n), mi(n), L((e) => J(n, "aria-label", e), [() => t.vb.t("Épico")]), hi(n, () => B(o), (e) => M(o, e)), U(e, n);
					};
					G(s, (e) => {
						B(c) ? e(l) : e(u, -1);
					}), O(n), L((e, t, n) => {
						J(r, "placeholder", e), J(r, "aria-label", t), J(i, "aria-label", n);
					}, [
						() => t.vb.t("nova tarefa"),
						() => t.vb.t("Nova tarefa"),
						() => t.vb.t("Nova tarefa")
					]), Cr("submit", n, (e) => {
						e.preventDefault();
						let n = B(c) || B(o) || t.room.epics[0]?.id;
						B(a).trim() && n && t.send({
							t: "task.add",
							epic: n,
							title: B(a).trim()
						}), M(a, "");
					}), Oi(r, () => B(a), (e) => M(a, e)), U(e, n);
				};
				G(S, (e) => {
					i() === "todo" && e(C);
				}), O(f), L((e, t) => {
					p = q(f, 1, "lane", null, p, { over: B(s) === i() }), J(f, "data-lane", i()), J(f, "aria-label", e), W(h, t), W(g, B(d).length);
				}, [() => t.vb.t(l()), () => t.vb.t(l())]), Cr("dragover", f, (e) => {
					e.preventDefault(), M(s, i(), !0);
				}), Cr("dragleave", f, () => M(s, null)), Cr("drop", f, (e) => y(e, i())), U(e, f);
			}), O(n), U(e, n);
		};
		G(ne, (e) => {
			B(i) === "list" ? e(re) : e(ie, -1);
		}), L((e, t, n) => {
			x = q(h, 1, "", null, x, { on: B(i) === "board" }), W(C, ` ${e ?? ""}`), T = q(w, 1, "", null, T, { on: B(i) === "list" }), W(ee, t), W(te, n);
		}, [
			() => t.vb.t("Quadro"),
			() => t.vb.t("Lista"),
			() => B(c) ? t.room.epics.find((e) => e.id === B(c))?.title : t.vb.t("Todos os épicos")
		]), V("click", h, () => g("board")), V("click", w, () => g("list")), U(e, l);
	}, w = (e) => {
		var n = ga(), r = F(n, !0);
		L((e) => W(r, e), [() => t.vb.t("Ainda não tem épico nem tarefa. Crie um épico na barra ao lado, ou peça pro seu agent organizar o projeto em épicos e tarefas.")]), U(e, n);
	};
	G(S, (e) => {
		t.room.epics.length ? e(C) : e(w, -1);
	}), U(e, x), Ye();
}
wr(["click", "keydown"]);
// svelte/Files.svelte
var ja = /* @__PURE__ */ H("<button type=\"button\"> <small> </small></button>"), Ma = /* @__PURE__ */ H("<div class=\"ftabs\"></div>"), Na = /* @__PURE__ */ H("<div class=\"fcrumb\"><button type=\"button\" class=\"ghost\"> </button><b><!> </b></div>"), Pa = /* @__PURE__ */ H("<button type=\"button\" class=\"ftile fdir\"><div class=\"thumb\"></div> <b> </b><small> </small></button>"), Fa = /* @__PURE__ */ H("<img loading=\"lazy\"/>"), Ia = /* @__PURE__ */ H("<a class=\"ftile\" target=\"_blank\" rel=\"noopener\"><div class=\"thumb\"><!></div> <b> </b><small> </small> <button type=\"button\" data-pin-kind=\"file\"></button></a>"), La = /* @__PURE__ */ H("<div class=\"empty\"> </div>"), Ra = /* @__PURE__ */ H("<!> <!> <div class=\"fgrid\"><!> <!></div> <!>", 1);
function za(e, t) {
	Je(t, !0);
	let n = [
		["all", "Tudo"],
		["img", "Imagens"],
		["md", "Markdown"],
		["txt", "Texto e CSV"],
		["html", "HTML"],
		["pdf", "PDF"],
		["audio", "Áudios"],
		["other", "Outros"]
	], r = /* @__PURE__ */ j("all"), i = /* @__PURE__ */ j(""), a = /* @__PURE__ */ k(() => t.room.files || []), o = /* @__PURE__ */ k(() => {
		let e = { all: B(a).length };
		for (let t of B(a)) {
			let n = da(t);
			e[n] = (e[n] || 0) + 1;
		}
		return e;
	}), s = /* @__PURE__ */ k(() => B(o)[B(r)] ? B(r) : "all"), c = /* @__PURE__ */ k(() => B(a).filter((e) => B(s) === "all" || da(e) === B(s))), l = (e) => e.name.includes("/") ? e.name.slice(0, e.name.lastIndexOf("/")) : "", u = /* @__PURE__ */ k(() => B(i) && B(c).some((e) => l(e) === B(i) || l(e).startsWith(B(i) + "/")) ? B(i) : ""), d = /* @__PURE__ */ k(() => B(u) ? B(u) + "/" : "");
	Sn(() => {
		B(o)[B(r)] || M(r, "all"), B(i) && B(u) !== B(i) && M(i, "");
	});
	function f(e, t) {
		M(i, t, !0);
		let n = e.currentTarget.closest("#filesPane");
		n && (n.scrollTop = 0);
	}
	let p = /* @__PURE__ */ k(() => {
		let e = /* @__PURE__ */ new Map(), t = [];
		for (let n of B(c)) {
			let r = l(n);
			if (r === B(u)) t.push(n);
			else if (r.startsWith(B(d))) {
				let t = r.slice(B(d).length).split("/")[0];
				e.set(t, (e.get(t) || 0) + 1);
			}
		}
		let n = {};
		if (B(u)) for (let e of t) n[e.name] = (n[e.name] || 0) + 1;
		return {
			dirs: [...e].sort((e, t) => e[0].localeCompare(t[0])),
			list: B(u) ? t.filter((e, n) => t.findIndex((t) => t.name === e.name) === n) : t,
			versions: n
		};
	}), m = (e) => `/api/books/${t.room.id}/files/${e.id}`, h = (e) => t.room.pins?.find((t) => t.kind === "file" && t.ref === e.id);
	function g(e, n) {
		e.preventDefault(), e.stopPropagation();
		let r = h(n);
		t.send(r ? {
			t: "pin.del",
			id: r.id
		} : {
			t: "pin.add",
			kind: "file",
			ref: n.id
		});
	}
	var v = Nr(), y = P(v), b = (e) => {
		var i = Ra(), a = P(i), c = (e) => {
			var i = Ma();
			Xr(i, 21, () => n.filter(([e]) => B(o)[e]), Kr, (e, n) => {
				var i = /* @__PURE__ */ k(() => _(B(n), 2));
				let a = () => B(i)[0], c = () => B(i)[1];
				var l = ja();
				let u;
				var d = N(l), f = F(I(d), !0);
				O(l), L((e) => {
					u = q(l, 1, "ftab", null, u, { on: a() === B(s) }), J(l, "data-fkind", a()), W(d, `${e ?? ""} `), W(f, B(o)[a()]);
				}, [() => t.vb.t(c())]), V("click", l, () => M(r, a(), !0)), U(e, l);
			}), O(i), U(e, i);
		};
		G(a, (e) => {
			B(o).all > 1 && e(c);
		});
		var l = I(a, 2), v = (e) => {
			var n = Na(), r = N(n), i = F(r), a = I(r), o = N(a);
			K(o, () => t.vb.icon("folder", 14));
			var s = I(o);
			O(a), O(n), L((e, t) => {
				J(r, "data-fdir", e), W(i, `← ${t ?? ""}`), W(s, ` ${B(u) ?? ""}/`);
			}, [() => B(u).includes("/") ? B(u).slice(0, B(u).lastIndexOf("/")) : "", () => t.vb.t("voltar")]), V("click", r, (e) => f(e, B(u).includes("/") ? B(u).slice(0, B(u).lastIndexOf("/")) : "")), U(e, n);
		};
		G(l, (e) => {
			B(u) && e(v);
		});
		var y = I(l, 2), b = N(y);
		Xr(b, 17, () => B(p).dirs, Kr, (e, n) => {
			var r = /* @__PURE__ */ k(() => _(B(n), 2));
			let i = () => B(r)[0], a = () => B(r)[1];
			var o = Pa(), s = N(o);
			K(s, () => t.vb.icon("folder", 34), !0), O(s);
			var c = I(s, 2), l = F(c), u = F(I(c), !0);
			O(o), L((e) => {
				J(o, "data-fdir", B(d) + i()), W(l, `${i() ?? ""}/`), W(u, e);
			}, [() => a() === 1 ? t.vb.t("1 arquivo") : t.vb.t("{n} arquivos", { n: a() })]), V("click", o, (e) => f(e, B(d) + i())), U(e, o);
		}), Xr(I(b, 2), 17, () => B(p).list, (e) => e.id, (e, n) => {
			var r = Ia(), i = N(r), a = N(i), o = (e) => {
				var t = Fa();
				L((e) => {
					J(t, "src", e), J(t, "alt", B(n).name);
				}, [() => m(B(n))]), U(e, t);
			}, s = /* @__PURE__ */ k(() => B(n).type.startsWith("image/")), c = (e) => {
				var r = Nr();
				K(P(r), () => t.vb.icon(B(n).type === "text/html" ? "globe" : B(n).type.startsWith("audio/") ? "mic" : "file", 30)), U(e, r);
			};
			G(a, (e) => {
				B(s) ? e(o) : e(c, -1);
			}), O(i);
			var l = I(i, 2), u = F(l, !0), f = I(l), _ = F(f), v = I(f, 2);
			let y;
			K(v, () => t.vb.icon("pin", 14), !0), O(v), O(r), L((e, t, i, a, o, s, c, l, d, f) => {
				J(r, "href", e), J(r, "title", B(n).name), J(r, "data-view", t), J(r, "data-name", B(n).name), W(u, i), W(_, `${a ?? ""} · ${o ?? ""} · ${s ?? ""}`), y = q(v, 1, "ghost pinBtn", null, y, { on: c }), J(v, "data-pin-ref", B(n).id), J(v, "title", l), J(v, "aria-label", d), J(v, "aria-pressed", f);
			}, [
				() => m(B(n)),
				() => B(n).type.startsWith("image/") ? "img" : "frame",
				() => B(n).name.slice(B(d).length),
				() => t.vb.name(B(n).author),
				() => t.vb.ago(B(n).ts),
				() => B(p).versions[B(n).name] > 1 ? t.vb.t("{n} versões", { n: B(p).versions[B(n).name] }) : fa(B(n).size),
				() => !!h(B(n)),
				() => t.vb.t(h(B(n)) ? "Desafixar" : "Fixar na lateral"),
				() => t.vb.t(h(B(n)) ? "Desafixar" : "Fixar na lateral"),
				() => !!h(B(n))
			]), V("click", v, (e) => g(e, B(n))), U(e, r);
		}), O(y);
		var x = I(y, 2), S = (e) => {
			var n = La(), r = F(n, !0);
			L((e) => W(r, e), [() => t.vb.t("Nada aqui.")]), U(e, n);
		};
		G(x, (e) => {
			!B(p).list.length && !B(p).dirs.length && e(S);
		}), U(e, i);
	}, x = (e) => {
		var n = La(), r = F(n, !0);
		L((e) => W(r, e), [() => t.vb.t("Cole uma imagem no chat (Cmd+V), arraste um arquivo ou use o clipe. Tudo que for enviado neste vibebook fica aqui.")]), U(e, n);
	};
	G(y, (e) => {
		B(a).length ? e(b) : e(x, -1);
	}), U(e, v), Ye();
}
wr(["click"]);
// node_modules/zod/v4/core/util.js
function Ba(e, t) {
	return typeof t == "bigint" ? t.toString() : t;
}
var Va = class {
	constructor(e) {
		this._getter = e, this._value = void 0;
	}
	get value() {
		let e = this._getter;
		return e !== void 0 && (this._value = e(), this._getter = void 0), this._value;
	}
};
function Ha(e) {
	return new Va(e);
}
function Ua(e) {
	let t = +!!e.startsWith("^"), n = e.endsWith("$") ? e.length - 1 : e.length;
	return e.slice(t, n);
}
function Wa(e, t, n) {
	Object.defineProperty(e, t, {
		value: n,
		writable: !0,
		enumerable: !0,
		configurable: !0
	});
}
function Ga(e) {
	let t = Object.getOwnPropertyDescriptor(e, "shape");
	return t?.get ? t.get.raw : t?.value;
}
function Ka(e) {
	return Ga(e._zod.def) ?? e._zod.def.shape;
}
function qa(e, t, n) {
	Object.defineProperty(e, t, {
		get() {
			let e = n();
			return Wa(this, t, e), e;
		},
		enumerable: !0,
		configurable: !0
	});
}
function Ja(e, t, n) {
	t in e ? Wa(e, t, n) : e[t] = n;
}
function Ya(e, t, n, r) {
	let i = Ka(t);
	for (let a of n) {
		let n = Object.getOwnPropertyDescriptor(i, a);
		n.enumerable && (n.get ? qa(e, a, () => {
			let e = t._zod.def.shape[a];
			return r ? r(e, a) : e;
		}) : Ja(e, a, r ? r(n.value, a) : n.value));
	}
}
function Xa(e, t) {
	for (let n of Reflect.ownKeys(t)) {
		let r = Object.getOwnPropertyDescriptor(t, n);
		r.enumerable && (r.get ? qa(e, n, () => t[n]) : Ja(e, n, r.value));
	}
}
function Za(...e) {
	let t = {};
	for (let n of e) {
		let e = Object.getOwnPropertyDescriptors(n);
		Object.assign(t, e);
	}
	return Object.defineProperties({}, t);
}
var Qa = "captureStackTrace" in Error ? Error.captureStackTrace : (...e) => {};
function $a(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function eo(e) {
	if ($a(e) === !1) return !1;
	let t = e.constructor;
	if (t === void 0 || typeof t != "function") return !0;
	let n = t.prototype;
	return $a(n) !== !1 && Object.prototype.hasOwnProperty.call(n, "isPrototypeOf") !== !1;
}
function to(e) {
	return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function no(e, t, n) {
	let r = new e._zod.constr(t ?? e._zod.def);
	return (!t || n?.parent) && (r._zod.parent = e), r;
}
function ro(e) {
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
function io(e) {
	return Object.keys(e).filter((t) => e[t]._zod.optin !== void 0 && e[t]._zod.optout === "optional");
}
function ao(e, t) {
	if (!eo(t)) throw Error("Invalid input to extend: expected a plain object");
	let n = e._zod.def.checks;
	if (n && n.length > 0) {
		let n = Ka(e);
		for (let e of Reflect.ownKeys(t)) if (Object.getOwnPropertyDescriptor(n, e) !== void 0) throw Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
	}
	return no(e, Za(e._zod.def, { shape: oo(e, t) }));
}
function oo(e, t) {
	let n = {};
	return Ya(n, e, Reflect.ownKeys(Ka(e))), Xa(n, t), n;
}
function so(e, t = 0) {
	if (e.aborted === !0) return !0;
	for (let n = t; n < e.issues.length; n++) if (e.issues[n]?.continue !== !0) return !0;
	return !1;
}
function co(e, t = 0) {
	if (e.aborted === !0) return !0;
	for (let n = t; n < e.issues.length; n++) if (e.issues[n]?.continue === !1) return !0;
	return !1;
}
function lo(e, t) {
	return t.map((t) => {
		var n;
		return (n = t).path ?? (n.path = []), t.path.unshift(e), t;
	});
}
function uo(e) {
	return typeof e == "string" ? e : e?.message;
}
function fo(e, t, n) {
	var r;
	for (let i = t; i < e.length; i++) (r = e[i]).schema ?? (r.schema = n);
}
function po(e, t, n) {
	var r;
	let i = e.inst?._zod?.traits;
	i?.has("$ZodType") && (i.has("$ZodCheck") ? (r = e).schema ?? (r.schema = e.inst) : e.schema = e.inst);
	let a = e.schema === e.inst ? void 0 : e.schema?._zod.def?.error, o = e.message ? e.message : uo(e.inst?._zod.def?.error?.(e)) ?? uo(a?.(e)) ?? uo(t?.error?.(e)) ?? uo(n.customError?.(e)) ?? uo(n.localeError?.(e)) ?? "Invalid input", s = {};
	for (let t of Object.keys(e)) t !== "inst" && t !== "schema" && t !== "continue" && t !== "input" && t !== "__proto__" && (s[t] = e[t]);
	return s.path ??= [], s.message = o, t?.reportInput && (s.input = e.input), s;
}
function mo(e, t) {
	for (let n in t) {
		let r = Object.getOwnPropertyDescriptor(t, n);
		r.get ? Object.defineProperty(e, n, {
			...r,
			enumerable: !1
		}) : _o(e, n, r.value);
	}
}
function ho(e, t, n, r = !0) {
	return Object.defineProperty(e, t, {
		configurable: !0,
		writable: !0,
		enumerable: r,
		value: n
	}), n;
}
function go(e, t, n) {
	return ho(e, t, n, !1);
}
function _o(e, t, n) {
	Object.defineProperty(e, t, {
		configurable: !0,
		get() {
			return this == null ? n : ho(this, t, n.bind(this));
		},
		set(e) {
			ho(this, t, e);
		}
	});
}
function vo(e, t) {
	let n = Object.getPrototypeOf(e);
	return t in n ? void 0 : n;
}
var yo, bo = !1, xo = {
	configurable: !0,
	get() {
		bo = !0;
	}
};
function So(e, t, n) {
	let r = Object.getPrototypeOf(e._zod);
	t in r && yo !== e._zod ? yo = void 0 : (yo = e._zod, Object.defineProperty(r, t, {
		configurable: !0,
		get() {
			Object.defineProperty(this, t, xo);
			let e = bo;
			bo = !1;
			try {
				let r = n(this);
				return bo ? delete this[t] : Object.defineProperty(this, t, {
					configurable: !0,
					writable: !0,
					value: r
				}), bo ||= e, r;
			} catch (n) {
				throw delete this[t], bo ||= e, n;
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
function Co(e, t, n, r) {
	let i = vo(e, t);
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
var wo, To = {
	value: void 0,
	enumerable: !1
}, Eo = "captureStackTrace" in Error ? Error : null;
function Do(e) {
	let t = Eo;
	if (t) {
		let n = t.stackTraceLimit;
		if (typeof n == "number") {
			try {
				t.stackTraceLimit = 0;
			} catch {
				return Eo = null, new e();
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
function Oo(e, t, n, r) {
	let i = {};
	function a(e) {
		this.def = e, this.constr = d, this.traits = /* @__PURE__ */ new Set();
	}
	a.prototype = i;
	let o = n, s = o && /* @__PURE__ */ new WeakSet();
	function c(n, r) {
		if (!n._zod) {
			To.value = new a(r);
			try {
				Object.defineProperty(n, "_zod", To);
			} finally {
				To.value = void 0;
			}
		} else if (n._zod.traits.has(e)) return;
		if (n._zod.traits.add(e), t(n, r), s) {
			let e = Object.getPrototypeOf(n), t = n._zod.constr.prototype, r = e;
			for (; r && r !== t;) r = Object.getPrototypeOf(r);
			let i = r ?? e;
			s.has(i) || (s.add(i), mo(i, o));
		}
		let i = d.prototype;
		for (let e in i) Object.prototype.hasOwnProperty.call(i, e) && (e in n || (n[e] = i[e].bind(n)));
	}
	let l = r?.Parent ?? Object;
	class u extends l {}
	Object.defineProperty(u, "name", { value: e });
	function d(e) {
		let t = r?.Parent ? Do(u) : this;
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
var ko = class extends Error {
	constructor() {
		super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
	}
};
(wo = globalThis).__zod_globalConfig ?? (wo.__zod_globalConfig = {});
var Ao = globalThis.__zod_globalConfig;
function jo(e) {
	return e && Object.assign(Ao, e), Ao;
}
// node_modules/zod/v4/core/errors.js
function Mo() {
	let e = this._zod;
	return e.message ??= JSON.stringify(e.def, Ba, 2), e.message;
}
function No(e) {
	this._zod.message = e;
}
var Po = {
	get: Mo,
	set: No,
	enumerable: !0,
	configurable: !0
}, Fo = {
	value: void 0,
	enumerable: !1
}, Io = /* @__PURE__ */ new WeakSet([Object.prototype, Error.prototype]), Lo = /* @__PURE__ */ Oo("$ZodError", (e, t) => {
	e.name = "$ZodError", Fo.value = t, Object.defineProperty(e, "issues", Fo), Fo.value = void 0, Object.defineProperty(e, "message", Po);
	let n = Object.getPrototypeOf(e);
	Io.has(n) || (Io.add(n), Object.defineProperty(n, "toString", {
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
}, void 0, { Parent: Error }), Ro = /* @__PURE__*/ ((e) => {
	let t = (n, r, i, a) => {
		let o = i ? {
			...i,
			async: !1
		} : { async: !1 }, s = n._zod.run({
			value: r,
			issues: []
		}, o);
		if (s instanceof Promise) throw new ko();
		if (s.issues.length) {
			let n = new ((a?.Err) ?? e)(s.issues.map((e) => po(e, o, jo())));
			throw Qa(n, a?.callee ?? t), n;
		}
		return s.value;
	};
	return t;
})(Lo), zo = /* @__PURE__*/ ((e) => {
	let t = async (n, r, i, a) => {
		let o = i ? {
			...i,
			async: !0
		} : { async: !0 }, s = n._zod.run({
			value: r,
			issues: []
		}, o);
		if (s instanceof Promise && (s = await s), s.issues.length) {
			let n = new ((a?.Err) ?? e)(s.issues.map((e) => po(e, o, jo())));
			throw Qa(n, a?.callee ?? t), n;
		}
		return s.value;
	};
	return t;
})(Lo), Bo = /* @__PURE__*/ ((e) => (t, n, r) => {
	let i = r ? {
		...r,
		async: !1
	} : { async: !1 }, a = t._zod.run({
		value: n,
		issues: []
	}, i);
	if (a instanceof Promise) throw new ko();
	return a.issues.length ? Vo(e, a.issues, i) : {
		success: !0,
		data: a.value
	};
})(Lo);
function Vo(e, t, n) {
	let r;
	return {
		success: !1,
		get error() {
			return r || (r = new e(t.map((e) => po(e, n, jo()))), t = void 0, n = void 0), r;
		},
		set error(e) {
			r = e, t = void 0, n = void 0;
		}
	};
}
var Ho = /* @__PURE__*/ ((e) => async (t, n, r) => {
	let i = r ? {
		...r,
		async: !0
	} : { async: !0 }, a = t._zod.run({
		value: n,
		issues: []
	}, i);
	return a instanceof Promise && (a = await a), a.issues.length ? Vo(e, a.issues, i) : {
		success: !0,
		data: a.value
	};
})(Lo), Uo = /^[\s\S]{0,}$/, Wo = /^-?\d+(?:\.\d+)?$/, Go = /^(?:true|false)$/i, Ko = {
	major: 4,
	minor: 6,
	patch: 7
}, qo = /*@__PURE__*/ Oo("$ZodType", (e, t) => {
	var n;
	e ??= {}, e._zod.def = t, e._zod.bag = e._zod.bag || {}, e._zod.version = Ko;
	let r = e._zod.def.checks, i = e._zod.traits.has("$ZodCheck") ? [e, ...r ?? []] : r?.length ? [...r] : [];
	for (let t of i) for (let n of t._zod.onattach) n(e);
	if (i.length === 0) (n = e._zod).deferred ?? (n.deferred = []), e._zod.deferred?.push(() => {
		e._zod.run = e._zod.parse;
	});
	else {
		let t = (t, n, r) => {
			if (t.memo) return t;
			let i = so(t), a;
			for (let o of n) {
				if (o._zod.def.when) {
					if (co(t) || !o._zod.def.when(t)) continue;
				} else if (i) continue;
				let n = t.issues.length, s = o._zod.check(t);
				if (s instanceof Promise && r?.async === !1) throw new ko();
				if (a || s instanceof Promise) a = (a ?? Promise.resolve()).then(async () => {
					await s, t.issues.length !== n && (fo(t.issues, n, e), i ||= so(t, n));
				});
				else {
					if (t.issues.length === n) continue;
					fo(t.issues, n, e), i ||= so(t, n);
				}
			}
			return a ? a.then(() => t) : t;
		}, n = (n, r, a) => {
			if (so(n)) return n.aborted = !0, n;
			let o = t(r, i, a);
			if (o instanceof Promise) {
				if (a.async === !1) throw new ko();
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
				if (a.async === !1) throw new ko();
				return o.then((e) => t(e, i, a));
			}
			return t(o, i, a);
		};
	}
}, {
	get "~standard"() {
		return go(this, "~standard", Xo(this));
	},
	set "~standard"(e) {
		ho(this, "~standard", e);
	}
}), Jo = (e, t) => e.issues.length ? { issues: e.issues.map((e) => po(e, t, jo())) } : { value: e.value };
async function Yo(e, t) {
	let n = { async: !0 };
	return Jo(await e._zod.run({
		value: t,
		issues: []
	}, n), n);
}
function Xo(e) {
	return {
		validate: (t) => {
			let n = { async: !1 };
			try {
				let r = e._zod.run({
					value: t,
					issues: []
				}, n);
				if (!(r instanceof Promise)) return Jo(r, n);
			} catch {}
			return Yo(e, t);
		},
		vendor: "zod",
		version: 1
	};
}
var Zo = /*@__PURE__*/ Oo("$ZodString", (e, t) => {
	qo.init(e, t), e._zod.pattern = t.pattern ?? Uo, e._zod.parse = (n, r) => {
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
}), Qo = /*@__PURE__*/ Oo("$ZodNumber", (e, t) => {
	qo.init(e, t), e._zod.pattern = Wo, e._zod.parse = (n, r) => {
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
}), $o = /*@__PURE__*/ Oo("$ZodBoolean", (e, t) => {
	qo.init(e, t), e._zod.pattern = Go, e._zod.parse = (n, r) => {
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
});
function es(e, t, n, r, i, a) {
	let o = n in r, s = a === "optional";
	if (o || !s || i !== "optional") {
		if (e.issues.length) {
			if (i !== void 0 && s && !o) return;
			t.issues.push(...lo(n, e.issues));
		}
		!o && i === void 0 ? e.issues.length || t.issues.push({
			code: "invalid_type",
			expected: "nonoptional",
			input: void 0,
			path: [n]
		}) : e.value === void 0 ? (o || i === "defaulted" && !s) && (t.value[n] = void 0) : t.value[n] = e.value;
	}
}
var ts = [];
function ns(e) {
	let t = Object.keys(e.shape), n = Object.getOwnPropertySymbols(e.shape), r = n.length ? n : ts, i = r.length ? [...t, ...r] : t;
	for (let t of i) if (!e.shape?.[t]?._zod?.traits?.has("$ZodType")) throw Error(`Invalid element at key "${String(t)}": expected a Zod schema`);
	let a = io(e.shape);
	return {
		...e,
		allKeys: i,
		symbolKeys: r,
		keySet: new Set(t),
		numKeys: t.length,
		optionalKeys: new Set(a)
	};
}
function rs(e, t, n, r, i, a, o) {
	let s = [], c = i.keySet, l = i.catchall._zod, u = l.def.type, d = l.optin, f = l.optout, p = 0;
	for (let i in t) {
		if (o && n.issues.length !== p) {
			if (so(n, p)) break;
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
		a instanceof Promise ? e.push(a.then((e) => es(e, n, i, t, d, f))) : es(a, n, i, t, d, f);
	}
	return s.length && n.issues.push({
		code: "unrecognized_keys",
		keys: s,
		input: t,
		inst: a,
		continue: !0
	}), e.length ? Promise.all(e).then(() => n) : n;
}
var is = /*@__PURE__*/ Oo("$ZodObject", (e, t) => {
	qo.init(e, t);
	let n = Object.getOwnPropertyDescriptor(t, "shape"), r = n?.get ? n.get.raw : t.shape ?? {};
	if (r) {
		let e = () => {
			let n = { ...r };
			return Object.defineProperty(t, "shape", { value: n }), e.raw = n, n;
		};
		e.raw = r, Object.defineProperty(t, "shape", { get: e });
	}
	let i = Ha(() => ns(t));
	So(e, "propValues", (e) => {
		let t = e.def.shape, n = {};
		for (let e in t) {
			let r = t[e]._zod;
			if (r.values) {
				Object.prototype.hasOwnProperty.call(n, e) || Wa(n, e, /* @__PURE__ */ new Set());
				for (let t of r.values) n[e].add(t);
				r.optin !== void 0 && n[e].add(void 0);
			}
		}
		return n;
	});
	let a = $a, o = t.catchall, s, c = Ao.memoizer;
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
				if (so(t, f)) break;
				f = t.issues.length;
			}
			if (e === "__proto__") continue;
			let i = u[e], a = i._zod.optin, o = i._zod.optout, s = i._zod.run({
				value: r[e],
				issues: []
			}, n);
			s instanceof Promise ? l.push(s.then((n) => es(n, t, e, r, a, o))) : es(s, t, e, r, a, o);
		}
		return o ? rs(l, r, t, n, i.value, e, d === !0) : l.length ? Promise.all(l).then(() => t) : t;
	};
});
function as(e, t, n, r) {
	for (let n of e) if (n.issues.length === 0) return t.value = n.value, t;
	let i = e.filter((e) => !so(e));
	return i.length === 1 ? (t.value = i[0].value, i[0]) : (t.issues.push({
		code: "invalid_union",
		input: t.value,
		inst: n,
		errors: e.map((e) => e.issues.map((e) => po(e, r, jo())))
	}), t);
}
var os = /*@__PURE__*/ Oo("$ZodUnion", (e, t) => {
	qo.init(e, t), So(e, "optin", (e) => e.def.options.some((e) => e._zod.optin === "defaulted") ? "defaulted" : e.def.options.some((e) => e._zod.optin !== void 0) ? "optional" : void 0), So(e, "optout", (e) => e.def.options.some((e) => e._zod.optout === "optional") ? "optional" : void 0), So(e, "values", (e) => {
		if (e.def.options.every((e) => e._zod.values)) return new Set(e.def.options.flatMap((e) => Array.from(e._zod.values)));
	}), So(e, "pattern", (e) => {
		if (e.def.options.every((e) => e._zod.pattern)) {
			let t = e.def.options.map((e) => e._zod.pattern);
			return RegExp(`^(${t.map((e) => Ua(e.source)).join("|")})$`);
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
		return a ? Promise.all(o).then((t) => as(t, r, e, i)) : as(o, r, e, i);
	};
}), ss = /*@__PURE__*/ Oo("$ZodLiteral", (e, t) => {
	qo.init(e, t);
	let n = new Set(t.values);
	e._zod.values = n, So(e, "pattern", (e) => {
		let t = e.def.values;
		return RegExp(t.length ? `^(${t.map((e) => typeof e == "string" ? to(e) : e ? to(e.toString()) : String(e)).join("|")})$` : "^[^\\s\\S]$");
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
function cs(e, t) {
	return e.value = t.issues.length ? void 0 : t.value, e;
}
var ls = /*@__PURE__*/ Oo("$ZodOptional", (e, t) => {
	qo.init(e, t), So(e, "optin", (e) => e.def.innerType._zod.optin === "defaulted" ? "defaulted" : "optional"), e._zod.optout = "optional", So(e, "values", (e) => {
		let t = e.def.innerType._zod.values;
		return t ? /* @__PURE__ */ new Set([...t, void 0]) : void 0;
	}), So(e, "pattern", (e) => {
		let t = e.def.innerType._zod.pattern;
		return t ? RegExp(`^(${Ua(t.source)})?$`) : void 0;
	}), e._zod.parse = (e, n) => {
		if (e.value === void 0) {
			if (t.innerType._zod.optin !== "defaulted") return e;
			let r = t.innerType._zod.run({
				value: e.value,
				issues: []
			}, n);
			return r instanceof Promise ? r.then((t) => cs(e, t)) : cs(e, r);
		}
		return t.innerType._zod.run(e, n);
	};
}), us = /*@__PURE__*/ Oo("$ZodNullable", (e, t) => {
	qo.init(e, t), So(e, "optin", (e) => e.def.innerType._zod.optin), So(e, "optout", (e) => e.def.innerType._zod.optout), So(e, "pattern", (e) => {
		let t = e.def.innerType._zod.pattern;
		return t ? RegExp(`^(${Ua(t.source)}|null)$`) : void 0;
	}), So(e, "values", (e) => e.def.innerType._zod.values ? /* @__PURE__ */ new Set([...e.def.innerType._zod.values, null]) : void 0), e._zod.parse = (e, n) => e.value === null ? e : t.innerType._zod.run(e, n);
});
// node_modules/zod/v4/core/api.js
function ds(e) {
	return e.checks &&= [...e.checks], e;
}
// @__NO_SIDE_EFFECTS__
function fs(e, t) {
	return new e(ds({
		type: "string",
		...ro(t)
	}));
}
// @__NO_SIDE_EFFECTS__
function ps(e, t) {
	return new e(ds({
		type: "number",
		checks: [],
		...ro(t)
	}));
}
// @__NO_SIDE_EFFECTS__
function ms(e, t) {
	return new e({
		type: "boolean",
		...ro(t)
	});
}
// node_modules/zod/v4/mini/schemas.js
var hs = /*@__PURE__*/ Oo("ZodMiniType", (e, t) => {
	if (!e._zod) throw Error("Uninitialized schema in ZodMiniType.");
	qo.init(e, t), e.def = t, e.type = t.type;
}, {
	get with() {
		return this.check;
	},
	set with(e) {
		ho(this, "with", e);
	},
	parse(e, t) {
		return Ro(this, e, t, { callee: this.parse });
	},
	parseAsync(e, t) {
		return zo(this, e, t, { callee: this.parseAsync });
	},
	safeParse(e, t) {
		return Bo(this, e, t);
	},
	safeParseAsync(e, t) {
		return Ho(this, e, t);
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
		return no(this, e, t);
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
}), gs = /*@__PURE__*/ Oo("ZodMiniString", (e, t) => {
	Zo.init(e, t), hs.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function _s(e) {
	return /* @__PURE__ */ fs(gs, e);
}
var vs = /*@__PURE__*/ Oo("ZodMiniNumber", (e, t) => {
	Qo.init(e, t), hs.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function ys(e) {
	return /* @__PURE__ */ ps(vs, e);
}
var bs = /*@__PURE__*/ Oo("ZodMiniBoolean", (e, t) => {
	$o.init(e, t), hs.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function xs(e) {
	return /* @__PURE__ */ ms(bs, e);
}
var Ss = /*@__PURE__*/ Oo("ZodMiniObject", (e, t) => {
	is.init(e, t), hs.init(e, t), Co(e, "shape", (e) => e._zod.def.shape, !1);
});
// @__NO_SIDE_EFFECTS__
function Cs(e, t) {
	return new Ss({
		type: "object",
		shape: e ?? {},
		...ro(t)
	});
}
// @__NO_SIDE_EFFECTS__
function ws(e, t) {
	return ao(e, t);
}
var Ts = /*@__PURE__*/ Oo("ZodMiniUnion", (e, t) => {
	os.init(e, t), hs.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function Es(e, t) {
	return new Ts({
		type: "union",
		options: e,
		...ro(t)
	});
}
var Ds = /*@__PURE__*/ Oo("ZodMiniLiteral", (e, t) => {
	ss.init(e, t), hs.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function Os(e, t) {
	return new Ds({
		type: "literal",
		values: Array.isArray(e) ? e : [e],
		...ro(t)
	});
}
var ks = /*@__PURE__*/ Oo("ZodMiniOptional", (e, t) => {
	ls.init(e, t), hs.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function As(e) {
	return new ks({
		type: "optional",
		innerType: e
	});
}
var js = /*@__PURE__*/ Oo("ZodMiniNullable", (e, t) => {
	us.init(e, t), hs.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function Ms(e) {
	return new js({
		type: "nullable",
		innerType: e
	});
}
var Ns = /* @__PURE__ */ Es([/* @__PURE__ */ Cs({
	ok: /* @__PURE__ */ Os(!0),
	id: /* @__PURE__ */ ys(),
	thread: /* @__PURE__ */ _s()
}), /* @__PURE__ */ Cs({
	ok: /* @__PURE__ */ Os(!1),
	error: /* @__PURE__ */ _s()
})]), Ps = /* @__PURE__ */ Cs({
	ok: /* @__PURE__ */ xs(),
	name: /* @__PURE__ */ As(/* @__PURE__ */ _s()),
	error: /* @__PURE__ */ As(/* @__PURE__ */ _s()),
	every: /* @__PURE__ */ As(/* @__PURE__ */ Ms(/* @__PURE__ */ _s())),
	cron: /* @__PURE__ */ As(/* @__PURE__ */ Ms(/* @__PURE__ */ _s())),
	timezone: /* @__PURE__ */ As(/* @__PURE__ */ _s()),
	next_at: /* @__PURE__ */ As(/* @__PURE__ */ _s())
}), Fs = /* @__PURE__ */ Cs({
	id: /* @__PURE__ */ _s(),
	name: /* @__PURE__ */ _s(),
	type: /* @__PURE__ */ _s(),
	size: /* @__PURE__ */ ys(),
	author: /* @__PURE__ */ _s(),
	ts: /* @__PURE__ */ ys(),
	embed: /* @__PURE__ */ As(/* @__PURE__ */ xs())
}), Is = /* @__PURE__ */ ws(Fs, { reminder: /* @__PURE__ */ As(Ps) }), Ls = /* @__PURE__ */ Cs({ error: /* @__PURE__ */ _s() }), Rs = [
	"todo",
	"doing",
	"review",
	"done"
], zs = (e) => typeof e == "object" && !!e && !Array.isArray(e), Y = (e) => typeof e == "string", X = (e) => typeof e == "number" && Number.isFinite(e), Bs = (e) => typeof e == "boolean", Z = (e) => (t) => t === null || e(t), Q = (e) => (t) => Array.isArray(t) && t.every(e), Vs = (e) => (t) => zs(t) && Object.values(t).every(e), Hs = Q(Y), Us = (...e) => (t) => typeof t == "string" && e.includes(t), Ws = Us(...Rs), $ = (e, t = {}) => (n) => zs(n) && Object.entries(e).every(([e, t]) => t(n[e])) && Object.entries(t).every(([e, t]) => n[e] === void 0 || t(n[e])), Gs = (e) => $({
	id: Y,
	name: Y,
	type: Y,
	size: X,
	author: Y,
	ts: X
}, { embed: Bs })(e), Ks = $({
	id: Y,
	title: Y,
	done: Bs,
	status: Ws
}, {
	owner: Z(Y),
	due: Z(Y),
	flags: Hs,
	epic_id: Y
}), qs = (e) => Ks(e), Js = $({
	id: Y,
	title: Y,
	tasks: Q(qs)
}, {
	archived: Bs,
	kept: Bs,
	owner: Z(Y),
	from_msg: Z(X),
	parent: Z(Y),
	flags: Hs,
	prod: Z($({ stage: Y }, {
		at: X,
		note: Y
	})),
	files: Q($({
		id: Y,
		name: Y,
		type: Y,
		n: X
	}))
}), Ys = (e) => Js(e), Xs = $({
	id: X,
	thread: Y,
	author: Y,
	ts: X,
	text: Y
}, {
	kind: Z(Y),
	tag: Z(Y),
	via: Z(Y),
	reply_to: Z(X),
	choices: Z(Y),
	poll: Z(Y),
	card: Z(Y),
	files: Q(Gs),
	quiet: Bs,
	cut: Bs,
	for_who: Z(Y)
}), Zs = (e) => Xs(e), Qs = $({
	msg_id: X,
	email: Y,
	who: Y,
	status: Y,
	ts: X
}, {
	agent: Y,
	note: Z(Y)
}), $s = (e) => Qs(e), ec = $({
	id: Y,
	text: Y,
	owner: Y,
	enabled: Bs
}, {
	name: Z(Y),
	error: Z(Y),
	every: Z(Y),
	cron: Z(Y),
	next_at: Z(X),
	thread: Y,
	tz: Y,
	file_id: Z(Y)
}), tc = (e) => ec(e), nc = $({
	title: Y,
	owner: Y
}, {
	summary: Z(Y),
	folder: Z(Y)
}), rc = (e) => nc(e), ic = $({
	title: Y,
	tasks: Hs
}, { why: Y }), ac = (e) => ic(e), oc = $({
	id: X,
	text: Y,
	who: Y,
	kind: Y,
	ts: X
}), sc = (e) => oc(e), cc = $({
	id: Y,
	kind: Y,
	ref: Y
}, {
	title: Y,
	author: Y,
	ts: X
}), lc = (e) => cc(e), uc = $({
	id: Y,
	question: Y,
	options: Hs,
	multi: Bs,
	closed: Bs,
	author: Y,
	votes: Q(Hs)
}), dc = (e) => uc(e), fc = $({
	email: Y,
	ts: X
}, { name: Z(Y) }), pc = $({
	email: Y,
	who: Y,
	read: X,
	delivered: X
}, {
	agent: Y,
	ts: X
}), mc = $({ text: Y }, {
	epic: Z(Y),
	stale: (e) => e === !1,
	fetched: Bs,
	by: Y
}), hc = $({
	epic: Y,
	stale: (e) => e === !0
}, { by: Y }), gc = {
	state: $({
		me: Y,
		book: rc,
		messages: Q(Zs),
		epics: Q(Ys),
		members: Hs,
		online: Hs,
		suggestions: Q(ac)
	}, {
		roomTasks: Q(qs),
		names: Vs(Y),
		avatars: Vs(X),
		pending: Hs,
		requests: Q(fc),
		files: Q(Gs),
		filesN: X,
		filesAll: Bs,
		reminders: Q(tc),
		acks: Q($s),
		receipts: Q(pc),
		counts: Vs(X),
		countsAt: X,
		full: Hs,
		complete: Bs,
		origins: Q(Zs),
		docs: Vs(Y),
		doc: Y,
		docNotes: Hs,
		decisions: Q(sc),
		pins: Q(lc),
		polls: Vs(dc)
	}),
	msg: $({ m: Zs }),
	moved: $({
		id: X,
		thread: Y
	}),
	delta: $({
		id: X,
		text: Y
	}),
	typing: $({
		id: X,
		mode: Y
	}, { note: Y }),
	closed: $({
		id: X,
		choices: Y
	}),
	epics: $({ epics: Q(Ys) }, { roomTasks: Q(qs) }),
	epicsPatch: $({
		changed: Q(Ys),
		order: Hs
	}, { roomTasks: Q(qs) }),
	doc: (e) => zs(e) && (e.stale === !0 ? hc(e) && e.text === void 0 && e.fetched === void 0 : mc(e)),
	docNotes: $({ notes: Hs }),
	meta: $({}, {
		title: Y,
		folder: Y,
		summary: Y
	}),
	suggestions: $({ suggestions: Q(ac) }),
	requests: $({ requests: Q(fc) }),
	members: $({ members: Hs }, {
		pending: Hs,
		requests: Q(fc),
		names: Vs(Y),
		avatars: Vs(X)
	}),
	files: $({ files: Q(Gs) }),
	fileAdd: $({ file: Gs }),
	reminders: $({ reminders: Q(tc) }),
	decisions: $({ decisions: Q(sc) }),
	pins: $({ pins: Q(lc) }),
	receipts: $({ receipts: Q(pc) }),
	older: $({
		messages: Q(Zs),
		thread: Y,
		more: Bs
	}),
	acks: $({ acks: Q($s) }),
	ackRows: $({ acks: Q($s) }),
	poll: $({ poll: dc }),
	online: $({ online: Hs }),
	conns: $({}),
	error: $({}, { error: Y }),
	blocked: $({
		text: Y,
		reason: Y
	})
};
function _c(e) {
	return !zs(e) || typeof e.t != "string" || !Object.hasOwn(gc, e.t) ? !1 : gc[e.t](e);
}
function vc(e) {
	if (!zs(e)) return e;
	let t = (e, t) => zs(e) && (e[t] === 0 || e[t] === 1) ? {
		...e,
		[t]: e[t] === 1
	} : e, n = (e) => Array.isArray(e) ? e.map((e) => t(e, "done")) : e, r = (e) => Array.isArray(e) ? e.map((e) => zs(e) ? {
		...e,
		tasks: n(e.tasks)
	} : e) : e, i = (e) => Array.isArray(e) ? e.map((e) => t(e, "enabled")) : e;
	return e.t === "state" || e.t === "epics" ? {
		...e,
		epics: r(e.epics),
		...e.roomTasks === void 0 ? {} : { roomTasks: n(e.roomTasks) },
		...e.reminders === void 0 ? {} : { reminders: i(e.reminders) }
	} : e.t === "epicsPatch" ? {
		...e,
		changed: r(e.changed),
		...e.roomTasks === void 0 ? {} : { roomTasks: n(e.roomTasks) }
	} : e.t === "reminders" ? {
		...e,
		reminders: i(e.reminders)
	} : e;
}
function yc(e) {
	let t = vc(JSON.parse(e));
	if (!_c(t)) throw TypeError("Invalid room event");
	return t;
}
var bc = {
	msg: $({ thread: Y }, {
		text: Y,
		files: Hs,
		reply_to: Z(X)
	}),
	"files.get": $({}),
	"doc.get": $({}, { epic: Z(Y) }),
	doc: $({ text: Y }, { epic: Z(Y) }),
	title: $({ title: Y }),
	epic: $({ title: Y }),
	"epic.owner": $({
		id: Y,
		owner: Y
	}),
	"task.add": $({
		epic: Y,
		title: Y
	}),
	older: $({ thread: Y }, { before: X }),
	"pin.add": $({
		kind: Us("link", "file", "app"),
		ref: Y
	}, { title: Y }),
	"pin.del": $({ id: Y }),
	"reminder.delete": $({ id: Y }),
	"ack.dismiss": $({ id: X }),
	"reminder.enable": $({
		id: Y,
		on: Bs
	}),
	"task.toggle": $({ id: Y }),
	"task.status": $({
		id: Y,
		status: Ws
	}),
	"task.rename": $({
		id: Y,
		title: Y
	}),
	"task.del": $({ id: Y }),
	"task.assign": $({ id: Y }, {
		owner: Y,
		due: Y
	}),
	"decision.del": $({ id: X }),
	"epic.rename": $({
		id: Y,
		title: Y
	}),
	"epic.del": $({ id: Y }),
	"epic.archive": $({ id: Y }, { archived: Bs }),
	"epic.order": $({ ids: Hs }),
	"poll.create": $({
		thread: Y,
		question: Y,
		options: Hs,
		multi: Bs
	}),
	vote: $({
		id: Y,
		opt: X
	}),
	"poll.close": $({ id: Y }),
	suggestion: $({ i: X }, { accept: Bs })
};
function xc(e) {
	return !zs(e) || typeof e.t != "string" || !Object.hasOwn(bc, e.t) ? !1 : bc[e.t](e);
}
// node_modules/hono/dist/client/utils.js
var Sc = (e, t) => (e = e.replace(/\/+$/, ""), e += "/", t = t.replace(/^\/+/, ""), e + t), Cc = (e, t) => {
	for (let [n, r] of Object.entries(t)) {
		let t = RegExp("/:" + n + "(?:{[^/]+})?\\??(?=/|$)");
		e = e.replace(t, () => r ? `/${r}` : "");
	}
	return e;
}, wc = (e) => {
	let t = new URLSearchParams();
	for (let [n, r] of Object.entries(e)) if (r !== void 0) {
		if (Array.isArray(r)) for (let e of r) e !== void 0 && t.append(n, e);
		else t.set(n, r);
	}
	return t;
}, Tc = (e, t) => {
	switch (t) {
		case "ws": return e.replace(/^http/, "ws");
		case "http": return e.replace(/^ws/, "http");
	}
}, Ec = (e) => /^https?:\/\/[^\/]+?\/index(?=\?|$)/.test(e) ? e.replace(/\/index(?=\?|$)/, "/") : e.replace(/\/index(?=\?|$)/, "");
function Dc(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function Oc(e, t) {
	if (!Dc(e) && !Dc(t)) return t;
	let n = { ...e };
	for (let e in t) {
		let r = t[e];
		n[e] = Dc(n[e]) && Dc(r) ? Oc(n[e], r) : r;
	}
	return n;
}
// node_modules/hono/dist/utils/cookie.js
var kc = /^[\w!#$%&'*.^`|~+-]+$/, Ac = (e, t, n = {}) => {
	if (!kc.test(e)) throw Error("Invalid cookie name");
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
}, jc = (e, t, n) => (t = encodeURIComponent(t), Ac(e, t, n)), Mc = (e, t) => new Proxy(() => {}, {
	get(n, r) {
		if (typeof r == "string" && r !== "then") return Mc(e, [...t, r]);
	},
	apply(n, r, i) {
		return e({
			path: t,
			args: i
		});
	}
}), Nc = (e, t) => {
	let n = t.toString();
	return n ? `${e}?${n}` : e;
}, Pc = class {
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
			for (let [n, r] of Object.entries(e.cookie)) r !== void 0 && t.push(jc(n, r));
			t.length > 0 && (r.Cookie = t.join("; "));
		}
		this.cType && (r["Content-Type"] = this.cType);
		let i = new Headers();
		for (let [e, t] of Object.entries(r)) t !== void 0 && i.set(e, t);
		let a = this.url;
		a = Ec(a), a = Cc(a, this.pathParams), this.queryParams && (a = Nc(a, this.queryParams)), n = this.method.toUpperCase();
		let o = n !== "GET" && n !== "HEAD";
		return (t?.fetch || fetch)(a, {
			body: o ? this.rBody : void 0,
			method: n,
			headers: i,
			...t?.init
		});
	};
}, Fc = (e, t) => Mc(function n(r) {
	let i = t?.buildSearchParams ?? wc, a = [...r.path], o = a.slice(-3).reverse();
	if (o[0] === "toString") return o[1] === "name" ? o[2] || "" : n.toString();
	if (o[0] === "valueOf") return o[1] === "name" ? o[2] || "" : n;
	let s = "";
	if (/^\$/.test(o[0])) {
		let e = a.pop();
		e && (s = e.replace(/^\$/, ""));
	}
	let c = Sc(e, a.join("/"));
	if (s === "url" || s === "path") {
		let t = Ec(c);
		return r.args[0] && (r.args[0].param && (t = Cc(t, r.args[0].param)), r.args[0].query && (t = Nc(t, i(r.args[0].query)))), s === "url" ? new URL(t) : t.slice(e.replace(/\/+$/, "").length).replace(/^\/?/, "/");
	}
	if (s === "ws") {
		let e = Ec(c), n = Tc(r.args[0]?.param ? Cc(e, r.args[0].param) : e, "ws"), a = new URL(n), o = r.args[0]?.query;
		return o && i(o).forEach((e, t) => {
			a.searchParams.append(t, e);
		}), ((...e) => t?.webSocket !== void 0 && typeof t.webSocket == "function" ? t.webSocket(...e) : new WebSocket(...e))(a.toString());
	}
	let l = new Pc(c, s, { buildSearchParams: i });
	if (s) {
		t ??= {};
		let e = { ...r.args[1] }, n = t.headers, i = e.headers;
		n && i && (e.headers = async () => ({
			...typeof n == "function" ? await n() : n,
			...typeof i == "function" ? await i() : i
		}));
		let a = Oc(t, e);
		return l.fetch(r.args[0], a);
	}
	return l;
}, []), Ic = (e = "/", t) => Fc(e, t ? { fetch: t } : {});
// svelte/transport.ts
function Lc(e, t) {
	if (!xc(t)) throw TypeError("Invalid room command");
	return !e || e.readyState !== 1 ? !1 : (e.send(JSON.stringify(t)), !0);
}
function Rc(e) {
	if (typeof e != "string") throw TypeError("Room events must be JSON text");
	return yc(e);
}
async function zc(e) {
	try {
		return await e.json();
	} catch (t) {
		throw e.ok ? t : Error(`HTTP ${e.status}`);
	}
}
function Bc(e, t) {
	let n = Ls.safeParse(t);
	return Error(n.success ? n.data.error : `HTTP ${e.status}`);
}
function Vc(e, t = fetch) {
	let n = Ic("/", t).api.books[":id"], r = encodeURIComponent(e);
	return {
		async postMessage(e) {
			let t = await n.post.$post({
				param: { id: r },
				json: e
			}), i = await zc(t);
			if (t.ok || t.status === 400) {
				let e = Ns.safeParse(i);
				if (e.success) return e.data;
				if (t.ok) throw TypeError("Invalid post response");
			}
			throw Bc(t, i);
		},
		async uploadFile(e) {
			let t = await n.files.$post({
				param: { id: r },
				header: {
					"content-type": e.type,
					"x-filename": encodeURIComponent(e.name)
				}
			}, { init: { body: e.body } }), i = await zc(t);
			if (!t.ok) throw Bc(t, i);
			let a = Is.safeParse(i);
			if (!a.success) throw TypeError(Fs.safeParse(i).success ? "Invalid reminder response" : "Invalid upload response");
			return a.data;
		}
	};
}
// svelte/Reminders.svelte
var Hc = /* @__PURE__ */ H("<button class=\"primary\" id=\"remNew\"><!> </button>"), Uc = /* @__PURE__ */ H("<form class=\"remForm\" id=\"remForm\"><input name=\"name\" maxlength=\"60\" required=\"\"/> <textarea name=\"text\" required=\"\"></textarea> <div class=\"row\"><span class=\"err\" id=\"remErr\"> </span><button type=\"button\" class=\"ghost\" id=\"remCancel\"> </button><button class=\"primary\" id=\"remSave\"> </button></div></form>"), Wc = /* @__PURE__ */ H("<span class=\"err\"> </span>"), Gc = /* @__PURE__ */ H("<pre class=\"remText\"> </pre>"), Kc = /* @__PURE__ */ H("<button class=\"ghost\"></button>"), qc = /* @__PURE__ */ H("<div><div class=\"remBody\" role=\"button\" tabindex=\"0\"><b><!> </b> <small><!> </small> <!><!></div> <!> <label class=\"sw\"><input type=\"checkbox\"/> </label> <button class=\"ghost\"></button></div>"), Jc = /* @__PURE__ */ H("<div class=\"empty\"> </div>"), Yc = /* @__PURE__ */ H("<div class=\"remHead\"><p></p> <!></div> <!> <!> <!>", 1);
function Xc(e, t) {
	Je(t, !0);
	let n = /* @__PURE__ */ j(null), r = /* @__PURE__ */ j(""), i = /* @__PURE__ */ j(!1), a = /* @__PURE__ */ j($t([])), o = /* @__PURE__ */ k(() => t.room.reminders || []), s = /* @__PURE__ */ k(() => t.vb.locale || (document.documentElement.lang === "en" ? "en-US" : "pt-BR")), c = (e) => new Date(e).toLocaleString(B(s), {
		weekday: "short",
		day: "numeric",
		month: "short",
		hour: "2-digit",
		minute: "2-digit"
	});
	function l(e) {
		M(n, e, !0), M(r, "");
	}
	function u(e) {
		M(a, B(a).includes(e.id) ? B(a).filter((t) => t !== e.id) : [...B(a), e.id], !0);
	}
	async function d(e) {
		if (e.preventDefault(), !B(n) || B(i)) return;
		let a = { ...B(n) }, o = a.name.trim().replace(/\.md$/i, "").replace(/[\\/]/g, "-");
		M(i, !0), M(r, "");
		try {
			let e = await Vc(t.room.id).uploadFile({
				name: `reminders/${o}.md`,
				type: "text/markdown",
				body: a.text
			});
			if (e.reminder && !e.reminder.ok) {
				M(r, `⚠ ${e.reminder.error || t.vb.t("falhou")}`), M(n, {
					...a,
					name: o,
					fixed: !0
				}, !0);
				return;
			}
			M(n, null);
		} catch (e) {
			M(r, e instanceof Error ? e.message : t.vb.t("sem conexão"), !0);
		} finally {
			M(i, !1);
		}
	}
	var f = Yc(), p = P(f), m = N(p);
	K(m, () => t.vb.t("Cada lembrete é um arquivo <code>reminders/&lt;nome&gt;.md</code>: o texto diz quando rodar e o que fazer. Na hora, o @vibe posta o texto aqui e o agent de quem salvou faz."), !0), O(m);
	var h = I(m, 2), g = (e) => {
		var n = Hc(), r = N(n);
		K(r, () => t.vb.icon("plus", 14));
		var i = I(r);
		O(n), L((e) => W(i, ` ${e ?? ""}`), [() => t.vb.t("Novo lembrete")]), V("click", n, () => l({
			name: "",
			text: ""
		})), U(e, n);
	};
	G(h, (e) => {
		B(n) || e(g);
	}), O(p);
	var _ = I(p, 2), v = (e) => {
		var a = Uc(), o = N(a);
		Si(o);
		var s = I(o, 2);
		ot(s);
		var c = I(s, 2), l = N(c), u = F(l, !0), f = I(l), p = F(f, !0), m = I(f), h = F(m, !0);
		O(c), O(a), L((e, t, a, c) => {
			J(o, "placeholder", e), o.readOnly = B(n).fixed, J(s, "placeholder", t), W(u, B(r)), W(p, a), m.disabled = B(i), W(h, c);
		}, [
			() => t.vb.t("nome, ex.: relatorio-diario"),
			() => t.vb.t("Diga quando e o quê. Ex.: Todo dia às 8h: puxe os números de ontem e poste aqui o que mudou."),
			() => t.vb.t("Cancelar"),
			() => t.vb.t("Salvar")
		]), Cr("submit", a, d), Oi(o, () => B(n).name, (e) => B(n).name = e), Oi(s, () => B(n).text, (e) => B(n).text = e), V("click", f, () => M(n, null)), U(e, a);
	};
	G(_, (e) => {
		B(n) && e(v);
	});
	var y = I(_, 2);
	Xr(y, 17, () => B(o), (e) => e.id, (e, n) => {
		var r = qc();
		let i;
		var o = N(r), s = N(o), d = N(s);
		K(d, () => t.vb.icon(B(a).includes(B(n).id) ? "chevronDown" : "chevronRight", 13));
		var f = I(d);
		O(s);
		var p = I(s, 2), m = N(p), h = (e) => {
			var r = Mr();
			L((e) => W(r, `${(B(n).every || B(n).cron || "") ?? ""}${e ?? ""} ·`), [() => B(n).enabled && B(n).next_at ? ` · ${t.vb.t("próximo {when}", { when: c(B(n).next_at) })}` : ""]), U(e, r);
		};
		G(m, (e) => {
			B(n).error || e(h);
		});
		var g = I(m, 1, !0);
		O(p);
		var _ = I(p, 2), v = (e) => {
			var t = Wc(), r = F(t);
			L(() => W(r, `⚠ ${B(n).error ?? ""}`)), U(e, t);
		};
		G(_, (e) => {
			B(n).error && e(v);
		});
		var y = I(_), b = (e) => {
			var t = Gc(), r = F(t, !0);
			L(() => W(r, B(n).text)), U(e, t);
		}, x = /* @__PURE__ */ k(() => B(a).includes(B(n).id));
		G(y, (e) => {
			B(x) && e(b);
		}), O(o);
		var S = I(o, 2), C = (e) => {
			var r = Kc();
			K(r, () => t.vb.icon("pencil", 14), !0), O(r), L((e, t) => {
				J(r, "data-rem-edit", B(n).id), J(r, "title", e), J(r, "aria-label", t);
			}, [() => t.vb.t("Editar"), () => t.vb.t("Editar")]), V("click", r, () => l({
				name: B(n).name,
				text: B(n).text,
				fixed: !0
			})), U(e, r);
		};
		G(S, (e) => {
			B(n).name && e(C);
		});
		var w = I(S, 2), T = N(w);
		Si(T);
		var ee = I(T, 1, !0);
		O(w);
		var te = I(w, 2);
		K(te, () => t.vb.icon("x"), !0), O(te), O(r), L((e, t, a, s, c, l, u) => {
			i = q(r, 1, "rem", null, i, {
				bad: !!B(n).error,
				off: !B(n).enabled,
				open: e
			}), J(o, "data-rem-open", B(n).id), J(o, "title", t), W(f, ` ${(B(n).name ? `${B(n).name}.md` : B(n).text) ?? ""}`), W(g, a), J(w, "title", s), J(T, "data-rem-on", B(n).id), wi(T, B(n).enabled), T.disabled = !!B(n).error, W(ee, c), J(te, "data-rem-del", B(n).id), J(te, "title", l), J(te, "aria-label", u);
		}, [
			() => B(a).includes(B(n).id),
			() => t.vb.t(B(a).includes(B(n).id) ? "Esconder o texto" : "Ver o texto"),
			() => t.vb.t("de {who}", { who: t.vb.name(B(n).owner) }),
			() => t.vb.t("Ligado"),
			() => t.vb.t("ligado"),
			() => t.vb.t("Apagar lembrete"),
			() => t.vb.t("Apagar lembrete")
		]), V("click", o, (e) => {
			e.target.closest(".remText") || u(B(n));
		}), V("keydown", o, (e) => {
			e.key === "Enter" && u(B(n));
		}), V("change", T, (e) => t.send({
			t: "reminder.enable",
			id: B(n).id,
			on: e.currentTarget.checked
		})), V("click", te, () => {
			confirm(t.vb.t("Apagar este lembrete?")) && t.send({
				t: "reminder.delete",
				id: B(n).id
			});
		}), U(e, r);
	});
	var b = I(y, 2), x = (e) => {
		var n = Jc(), r = F(n, !0);
		L((e) => W(r, e), [() => t.vb.t("Nenhum lembrete ainda. Clique em Novo lembrete, ou peça pro seu agent: “todo dia às 8h, me manda o resumo do que mudou”.")]), U(e, n);
	};
	G(b, (e) => {
		!B(o).length && !B(n) && e(x);
	}), U(e, f), Ye();
}
wr([
	"click",
	"keydown",
	"change"
]);
// svelte/Sidebar.svelte
var Zc = /* @__PURE__ */ H("<span class=\"claudeSpin\">✻</span>"), Qc = /* @__PURE__ */ H("<button type=\"button\"><!><span class=\"rt\"> </span> <!> <!><!> <span class=\"n\"> </span></button>"), $c = /* @__PURE__ */ H("<div class=\"fnCol\"><span class=\"fnRow\"><span class=\"fn\"> </span><span class=\"pendTag\"> </span></span> <small class=\"memActs\"><button type=\"button\" class=\"ghost resend\"> </button> · <button type=\"button\" class=\"ghost resend\"> </button></small></div>"), el = /* @__PURE__ */ H("<span class=\"fn\"> </span>"), tl = /* @__PURE__ */ H("<div class=\"fnCol\"><span class=\"fn\"> </span><small class=\"memActs\"> </small></div>"), nl = /* @__PURE__ */ H("<button type=\"button\" class=\"ghost x\"></button>"), rl = /* @__PURE__ */ H("<div class=\"member\"><!> <!> <!></div> <!>", 1), il = /* @__PURE__ */ H("<button type=\"button\" class=\"iconBtn phOnly\" id=\"sideArch\"></button> <button type=\"button\" class=\"iconBtn phOnly\" id=\"sideDel\"></button>", 1), al = /* @__PURE__ */ H("<span class=\"rowEdit phOnly\" role=\"button\" tabindex=\"0\" id=\"sideRename\"><!> </span>"), ol = /* @__PURE__ */ H("<div class=\"epTabs\" role=\"tablist\"><button type=\"button\" role=\"tab\" data-arch=\"\"> <b> </b></button> <button type=\"button\" role=\"tab\" data-arch=\"1\"> <b> </b></button></div>"), sl = /* @__PURE__ */ H("<button type=\"button\"><span class=\"ri\"> </span><span class=\"rt\"> </span><span class=\"n\"> </span></button>"), cl = /* @__PURE__ */ H("<form id=\"newEpic\" class=\"newRoom\"><input enterkeyhint=\"done\"/><button class=\"ri\"></button></form> <!>", 1), ll = /* @__PURE__ */ H("<div class=\"member reqRow\"><!> <div class=\"fnCol\"><span class=\"fn\"> </span><small class=\"memActs\"> <button type=\"button\" class=\"ghost resend okAsk\" data-ok=\"1\"> </button></small></div> <button type=\"button\" class=\"ghost x\" data-ok=\"\"></button></div>"), ul = /* @__PURE__ */ H("<div class=\"asks\"><h4> </h4> <!></div>"), dl = /* @__PURE__ */ H("<details class=\"memMore\" data-fold=\"off\"><summary> </summary><!></details>"), fl = /* @__PURE__ */ H("<button type=\"button\" class=\"friendAdd\"><!><span class=\"fn\"> </span><b></b></button>"), pl = /* @__PURE__ */ H("<details class=\"memMore\" data-fold=\"friends\"><summary> </summary> <!></details>"), ml = /* @__PURE__ */ H("<option></option>"), hl = /* @__PURE__ */ H("<button type=\"button\" class=\"sheetGrab\"><i></i></button> <!> <div class=\"sideHead\"><div class=\"sideTop\"><a data-nav=\"\" href=\"/app\" class=\"muted\"><!> vibebooks</a> <!> <button type=\"button\" class=\"iconBtn\" id=\"railToggle\" aria-expanded=\"true\"></button></div></div> <div class=\"sec threadsSec\"><button type=\"button\" data-thread=\"main\"><!><span class=\"rt\"> </span> <!> <!><span class=\"n\"> </span></button> <!> <div><!> <!></div></div> <!> <div class=\"sec\"><!> <h4> </h4> <!> <!> <!> <!> <form class=\"row\" id=\"invite\" style=\"margin-top:8px\"><input type=\"email\" required=\"\" list=\"friendList\" autocomplete=\"off\"/><button></button></form> <datalist id=\"friendList\"></datalist></div>", 1);
function gl(e, t) {
	Je(t, !0);
	let n = (e, n = m) => {
		let r = /* @__PURE__ */ k(() => n().tasks.filter((e) => e.done).length), i = /* @__PURE__ */ k(() => t.vb.epicBusy(n()));
		var a = Qc();
		let o;
		var s = N(a);
		K(s, () => t.vb.epicIco(n(), !0));
		var c = I(s), l = F(c, !0), u = I(c, 2), d = (e) => {
			var n = Zc();
			L((e) => J(n, "aria-label", e), [() => t.vb.t("{who} está trabalhando", { who: B(i) })]), U(e, n);
		};
		G(u, (e) => {
			B(i) && e(d);
		});
		var f = I(u, 2);
		K(f, () => t.vb.waitPill(n().id));
		var p = I(f);
		K(p, () => t.vb.prodMark(n()));
		var h = F(I(p, 2), !0);
		O(a), L((e, s) => {
			o = q(a, 1, "thread", null, o, {
				sel: t.thread === n().id,
				archived: !!n().archived,
				busy: !!B(i),
				waiting: e
			}), J(a, "data-thread", n().id), J(a, "title", s), W(l, n().title), W(h, n().tasks.length ? `${B(r)}/${n().tasks.length}` : "");
		}, [() => t.vb.waitsIn(n().id).length > 0, () => `${n().title} · ${B(r)}/${n().tasks.length} tasks${n().archived ? ` · ${t.vb.t("arquivado")}` : ""}${B(i) ? ` · ${t.vb.t("{who} está trabalhando aqui", { who: B(i) })}` : ""}`]), U(e, a);
	}, r = (e, n = m) => {
		var r = rl(), i = P(r), a = N(i);
		K(a, () => t.vb.avatar(n(), t.room.online.includes(n())));
		var o = I(a, 2), s = (e) => {
			var r = $c(), i = N(r), a = N(i), o = F(a, !0), s = I(a), c = F(s, !0);
			O(i);
			var l = I(i, 2), u = N(l), d = F(u, !0), f = I(u, 2), p = F(f, !0);
			O(l), O(r), L((e, t, r, i, l, m, h) => {
				J(a, "title", n()), W(o, e), J(s, "title", t), W(c, r), J(u, "data-copyinv", n()), J(u, "title", i), W(d, l), J(f, "data-resend", n()), J(f, "title", m), W(p, h);
			}, [
				() => t.room.names?.[n()] || n().split("@")[0],
				() => t.vb.t("Convidada(o), ainda não entrou"),
				() => t.vb.t("pendente"),
				() => t.vb.t("Copiar a mensagem de convite (link da sala + setup do agent) para mandar no WhatsApp"),
				() => t.vb.t("copiar"),
				() => t.vb.t("Convidada(o), ainda não entrou"),
				() => t.vb.t("reenviar")
			]), U(e, r);
		}, c = /* @__PURE__ */ k(() => t.room.pending?.includes(n())), l = (e) => {
			var r = el(), i = F(r, !0);
			L(() => {
				J(r, "title", n()), W(i, t.room.names[n()]);
			}), U(e, r);
		}, u = (e) => {
			var t = tl(), r = N(t), i = F(r, !0), a = F(I(r));
			O(t), L((e, t) => {
				J(r, "title", n()), W(i, e), W(a, `@${t ?? ""}`);
			}, [() => n().split("@")[0], () => n().split("@")[1] ?? ""]), U(e, t);
		};
		G(o, (e) => {
			B(c) ? e(s) : t.room.names?.[n()] ? e(l, 1) : e(u, -1);
		});
		var d = I(o, 2), f = (e) => {
			var r = nl();
			K(r, () => t.vb.icon("x"), !0), O(r), L((e, t) => {
				J(r, "data-remove", n()), J(r, "aria-label", e), J(r, "title", t);
			}, [() => t.vb.t("Remover {email}", { email: n() }), () => t.room.pending?.includes(n()) ? t.vb.t("Cancelar convite") : t.vb.t("Remover do vibebook")]), U(e, r);
		}, p = /* @__PURE__ */ k(() => n() !== t.room.book?.owner && (t.room.pending?.includes(n()) || t.room.me === t.room.book?.owner));
		G(d, (e) => {
			B(p) && e(f);
		}), O(i), K(I(i, 2), () => t.vb.agentRows(n())), U(e, r);
	}, i = Wi(t, "archOpen", 3, !1), a = Wi(t, "foldOpen", 19, () => ({
		off: !1,
		friends: null
	})), o = Wi(t, "friends", 19, () => []), s = (e) => t.room.counts ? (t.room.counts[e] ?? 0) + t.room.messages.filter((n) => n.thread === e && n.id > (t.room.countsAt ?? 0)).length : t.room.messages.filter((t) => t.thread === e).length, c = (e) => t.room.messages.reduce((t, n) => n.thread === e.id && n.id > t ? n.id : t, 0), l = /* @__PURE__ */ k(() => t.room.epics.find((e) => e.id === t.thread)), u = /* @__PURE__ */ k(() => t.room.epics.filter((e) => !e.archived)), d = /* @__PURE__ */ k(() => t.room.epics.filter((e) => e.archived).map((e, t) => ({
		epic: e,
		last: c(e),
		i: t
	})).sort((e, t) => t.last - e.last || t.i - e.i).map(({ epic: e }) => e)), f = /* @__PURE__ */ k(() => i() && B(d).length > 0), p = /* @__PURE__ */ k(() => t.room.members.filter((e) => e === t.room.me || t.room.online.includes(e))), h = /* @__PURE__ */ k(() => t.room.members.filter((e) => !B(p).includes(e))), g = /* @__PURE__ */ k(() => o().filter((e) => !t.room.members.includes(e)));
	var _ = hl(), v = P(_), y = I(v, 2);
	K(y, () => t.vb.roomStrip());
	var b = I(y, 2), x = N(b), S = N(x);
	K(N(S), () => t.vb.icon("back")), ke(), O(S);
	var C = I(S, 2), w = (e) => {
		var n = il(), r = P(n);
		K(r, () => t.vb.icon(B(l).archived ? "undo" : "check", 18), !0), O(r);
		var i = I(r, 2);
		K(i, () => t.vb.icon("trash", 18), !0), O(i), L((e, t, n, a) => {
			J(r, "title", e), J(r, "aria-label", t), J(i, "title", n), J(i, "aria-label", a);
		}, [
			() => B(l).archived ? t.vb.t("Desarquivar épico") : t.vb.t("Arquivar épico (concluído)"),
			() => B(l).archived ? t.vb.t("Desarquivar épico") : t.vb.t("Arquivar épico"),
			() => t.vb.t("Apagar épico"),
			() => t.vb.t("Apagar épico")
		]), U(e, n);
	};
	G(C, (e) => {
		B(l) && e(w);
	});
	var T = I(C, 2);
	K(T, () => t.vb.icon("sidebar", 20), !0), O(T), O(x), O(b);
	var ee = I(b, 2), te = N(ee);
	let ne;
	var re = N(te);
	K(re, () => t.vb.roomMark("ri roomIco"));
	var ie = I(re), ae = F(ie, !0), oe = I(ie, 2), se = (e) => {
		var n = al(), r = N(n);
		K(r, () => t.vb.icon("pencil", 13));
		var i = I(r);
		O(n), L((e, t) => {
			J(n, "title", e), W(i, ` ${t ?? ""}`);
		}, [() => t.vb.t("Renomear"), () => t.vb.t("editar")]), U(e, n);
	}, ce = /* @__PURE__ */ k(() => !t.thread.startsWith("pre:"));
	G(oe, (e) => {
		B(ce) && e(se);
	});
	var le = I(oe, 2);
	K(le, () => t.vb.waitPill("main"));
	var ue = F(I(le), !0);
	O(te);
	var de = I(te, 2), fe = (e) => {
		var n = ol(), r = N(n);
		let i;
		var a = N(r), o = F(I(a), !0);
		O(r);
		var s = I(r, 2);
		let c;
		var l = N(s), p = F(I(l), !0);
		O(s), O(n), L((e, t) => {
			J(r, "aria-selected", !B(f)), i = q(r, 1, "", null, i, { on: !B(f) }), W(a, `${e ?? ""} `), W(o, B(u).length), J(s, "aria-selected", B(f)), c = q(s, 1, "", null, c, { on: B(f) }), W(l, `${t ?? ""} `), W(p, B(d).length);
		}, [() => t.vb.t("Épicos"), () => t.vb.t("Arquivados")]), U(e, n);
	};
	G(de, (e) => {
		B(d).length && e(fe);
	});
	var pe = I(de, 2);
	let me;
	var he = N(pe);
	Xr(he, 17, () => B(f) ? B(d) : B(u), (e) => e.id, (e, t) => {
		n(e, () => B(t));
	});
	var ge = I(he, 2), _e = (e) => {
		var n = cl(), r = P(n), i = N(r), a = I(i);
		K(a, () => t.vb.icon("plus"), !0), O(a), O(r), Xr(I(r, 2), 17, () => t.room.suggestions, Kr, (e, n, r) => {
			var i = sl();
			let a;
			J(i, "data-thread", `pre:${r}`);
			var o = N(i), s = F(o, !0), c = I(o), l = F(c, !0), u = F(I(c), !0);
			O(i), L((e, o) => {
				a = q(i, 1, "thread pre", null, a, { sel: t.thread === `pre:${r}` }), J(i, "title", e), W(s, o), W(l, B(n).title), W(u, B(n).tasks.length || "");
			}, [() => `${B(n).title} · ${t.vb.t("sugestão do @vibe, clique para ver")}`, () => t.vb.initials(B(n).title)]), U(e, i);
		}), L((e, t, n) => {
			J(i, "placeholder", e), J(i, "aria-label", t), J(a, "aria-label", n);
		}, [
			() => t.vb.t("Novo épico: escreva o título…"),
			() => t.vb.t("Novo épico"),
			() => t.vb.t("Criar épico")
		]), U(e, n);
	};
	G(ge, (e) => {
		B(f) || e(_e);
	}), O(pe), O(ee);
	var ve = I(ee, 2);
	K(ve, () => t.vb.pinsSec());
	var ye = I(ve, 2), be = N(ye), xe = (e) => {
		var n = ul(), r = N(n), i = F(r, !0);
		Xr(I(r, 2), 17, () => t.room.requests, (e) => e.email, (e, n) => {
			var r = ll(), i = N(r);
			K(i, () => t.vb.avatar(B(n).email));
			var a = I(i, 2), o = N(a), s = F(o, !0), c = I(o), l = N(c), u = I(l), d = F(u, !0);
			O(c), O(a);
			var f = I(a, 2);
			K(f, () => t.vb.icon("x"), !0), O(f), O(r), L((e, t, r, i, a, c, p) => {
				J(o, "title", e), W(s, t), W(l, `${r ?? ""} · `), J(u, "data-ask", B(n).email), J(u, "title", i), W(d, a), J(f, "data-ask", B(n).email), J(f, "aria-label", c), J(f, "title", p);
			}, [
				() => `${B(n).email} · ${t.vb.t("pediu {ago}", { ago: t.vb.ago(B(n).ts) })}`,
				() => B(n).name || B(n).email.split("@")[0],
				() => t.vb.t("pediu {ago}", { ago: t.vb.ago(B(n).ts) }),
				() => t.vb.t("Liberar: entra na sala e recebe o link por email"),
				() => t.vb.t("liberar"),
				() => t.vb.t("Recusar {email}", { email: B(n).email }),
				() => t.vb.t("Recusar")
			]), U(e, r);
		}), O(n), L((e) => W(i, e), [() => t.vb.t("Pedindo pra entrar")]), U(e, n);
	};
	G(be, (e) => {
		t.room.requests?.length && e(xe);
	});
	var Se = I(be, 2), Ce = F(Se, !0), we = I(Se, 2);
	K(we, () => t.vb.sbxRows());
	var Te = I(we, 2);
	Xr(Te, 16, () => B(p), (e) => e, (e, t) => {
		r(e, () => t);
	});
	var E = I(Te, 2), Ee = (e) => {
		var n = dl(), i = N(n), o = F(i, !0);
		Xr(I(i), 16, () => B(h), (e) => e, (e, t) => {
			r(e, () => t);
		}), O(n), L((e) => {
			n.open = a().off, W(o, e);
		}, [() => t.vb.t("{n} offline", { n: B(h).length })]), U(e, n);
	};
	G(E, (e) => {
		B(h).length && e(Ee);
	});
	var D = I(E, 2), De = (e) => {
		var n = pl(), r = N(n), i = F(r);
		Xr(I(r, 2), 16, () => B(g), (e) => e, (e, n) => {
			var r = fl(), i = N(r);
			K(i, () => t.vb.avatar(n));
			var a = I(i), o = F(a, !0), s = I(a);
			K(s, () => t.vb.icon("plus"), !0), O(s), O(r), L((e, t) => {
				J(r, "data-add", n), J(r, "title", e), W(o, t);
			}, [() => t.vb.t("Adicionar {email}", { email: n }), () => t.vb.name(n)]), U(e, r);
		}), O(n), L((e) => {
			n.open = a().friends ?? t.room.members.length <= 1, W(i, `${e ?? ""} · ${B(g).length ?? ""}`);
		}, [() => t.vb.t("Seus amigos")]), U(e, n);
	};
	G(D, (e) => {
		B(g).length && e(De);
	});
	var Oe = I(D, 2), Ae = N(Oe), je = I(Ae);
	K(je, () => t.vb.icon("plus"), !0), O(je), O(Oe);
	var Me = I(Oe, 2);
	Xr(Me, 21, () => B(g), Kr, (e, t) => {
		var n = ml(), r = {};
		L(() => {
			r !== (r = B(t)) && (n.value = (n.__value = r) ?? "");
		}), U(e, n);
	}), O(Me), O(ye), L((e, n, r, i, a, o, s, c, l, u) => {
		J(v, "aria-label", e), J(T, "title", n), J(T, "aria-label", r), ne = q(te, 1, "thread", null, ne, {
			sel: t.thread === "main",
			waiting: i
		}), J(te, "title", a), W(ae, o), W(ue, s), me = q(pe, 1, "epList", null, me, { arch: B(f) }), W(Ce, c), J(Ae, "placeholder", l), J(je, "aria-label", u);
	}, [
		() => t.vb.t("Fechar"),
		() => t.vb.t("Recolher menu"),
		() => t.vb.t("Recolher menu"),
		() => t.vb.waitsIn("main").length > 0,
		() => `${t.vb.bookTitle()}${t.room.book?.summary ? ` · ${t.room.book.summary}` : ""}`,
		() => t.vb.bookTitle(),
		() => s("main"),
		() => t.vb.t("Pessoas e agents"),
		() => t.vb.t("convidar por email"),
		() => t.vb.t("convidar por email")
	]), U(e, _), Ye();
}
// svelte/Message.svelte
var _l = /* @__PURE__ */ H("<span class=\"gut\"> </span>"), vl = /* @__PURE__ */ H(" <span class=\"agentTag\">agent</span>", 1), yl = /* @__PURE__ */ H("<span class=\"doneTag\"> </span>"), bl = /* @__PURE__ */ H("<div><!> <!> <span class=\"mact\"><button type=\"button\" class=\"rbtn\"><!> </button> <button type=\"button\" class=\"rbtn\"><!> </button> <button type=\"button\" class=\"rbtn\"><!> </button></span> <div class=\"body\"><!> <div class=\"who\"><!> <!> <span class=\"hhmm\"> </span></div> <div class=\"txt\"></div> <!> <!> <!> <!> <!></div></div>");
function xl(e, t) {
	Je(t, !0);
	let n = Wi(t, "origin", 3, !1), r = /* @__PURE__ */ k(() => t.vb.continues(t.previous, t.message)), i = /* @__PURE__ */ k(() => t.message.tag === "reminder" ? t.vb.remHtml(t.message, n()) : t.message.tag === "issue" ? t.vb.issueHtml(t.message) : t.vb.isNotice(t.message) ? t.vb.noticeHtml(t.message) : null), a = /* @__PURE__ */ k(() => n() && B(i) ? B(i).replace(/\sid="m\d+"/, "") : B(i)), o = /* @__PURE__ */ k(() => !t.message.text && t.typing ? `<span class="typing">${t.vb.esc(t.vb.typingNote?.(t.message.id) || t.vb.t("pensando ({mode})", { mode: t.vb.typingLabel?.(t.typing) ?? t.typing }))}…</span>` : t.message.author === "ai" ? t.message.text ? t.vb.mentions(t.vb.md(t.message.text)) : t.message.poll ? "" : `<span class="typing">${t.vb.t("pensando…")}</span>` : t.message.text ? t.vb.mentions(t.message.kind === "agent" ? t.vb.md(t.message.text) : t.vb.linkify(t.vb.esc(t.message.text))) : ""), s = /* @__PURE__ */ k(() => t.vb.dateTime?.(t.message.ts) ?? new Date(t.message.ts).toLocaleString());
	var c = Nr(), l = P(c), u = (e) => {
		var t = Nr();
		K(P(t), () => B(a)), U(e, t);
	}, d = (e) => {
		var i = bl();
		let a;
		var c = N(i);
		K(c, () => t.message.kind === "agent" ? t.vb.agentAvatar(t.message.author, t.message.via) : t.vb.avatar(t.message.author));
		var l = I(c, 2), u = (e) => {
			var n = _l(), r = F(n, !0);
			L((e) => {
				J(n, "title", B(s)), W(r, e);
			}, [() => t.vb.hhmm(t.message.ts)]), U(e, n);
		};
		G(l, (e) => {
			B(r) && e(u);
		});
		var d = I(l, 2), f = N(d), p = N(f);
		K(p, () => t.vb.icon("copy", 14));
		var m = I(p);
		O(f);
		var h = I(f, 2), g = N(h);
		K(g, () => t.vb.icon("link", 14));
		var _ = I(g);
		O(h);
		var v = I(h, 2), y = N(v);
		K(y, () => t.vb.icon("reply", 14));
		var b = I(y);
		O(v), O(d);
		var x = I(d, 2), S = N(x), C = (e) => {
			var n = Nr();
			K(P(n), () => t.vb.quoteHtml(t.message.reply_to)), U(e, n);
		};
		G(S, (e) => {
			t.message.reply_to && e(C);
		});
		var w = I(S, 2), T = N(w), ee = (e) => {
			var n = vl(), r = P(n), i = I(r);
			L((e, t) => {
				W(r, `${e ?? ""} `), J(i, "title", t);
			}, [() => t.vb.t("{via} de {who}", {
				via: t.message.via || "agent",
				who: t.vb.name(t.message.author)
			}), () => t.vb.t("Escrito pelo agent dessa pessoa, em nome dela")]), U(e, n);
		}, te = (e) => {
			var n = Mr();
			L((e) => W(n, e), [() => t.vb.name(t.message.author)]), U(e, n);
		};
		G(T, (e) => {
			t.message.kind === "agent" ? e(ee) : e(te, -1);
		});
		var ne = I(T, 2), re = (e) => {
			var n = yl(), r = F(n);
			L((e, t) => {
				J(n, "title", e), W(r, `✓ ${t ?? ""}`);
			}, [() => t.vb.t("Reporta algo entregue"), () => t.vb.t("entregue")]), U(e, n);
		};
		G(ne, (e) => {
			t.message.tag === "done" && e(re);
		});
		var ie = I(ne), ae = I(ie), oe = F(ae, !0);
		O(w);
		var se = I(w, 2);
		K(se, () => B(o), !0), O(se);
		var ce = I(se, 2);
		K(ce, () => t.vb.attHtml(t.message.files));
		var le = I(ce, 2), ue = (e) => {
			var n = Nr();
			K(P(n), () => t.vb.cardHtml(t.message)), U(e, n);
		};
		G(le, (e) => {
			t.message.card && e(ue);
		});
		var de = I(le, 2), fe = (e) => {
			var n = Nr();
			K(P(n), () => t.vb.choiceHtml(t.message)), U(e, n);
		};
		G(de, (e) => {
			t.message.choices && e(fe);
		});
		var pe = I(de, 2), me = (e) => {
			var n = Nr();
			K(P(n), () => t.vb.pollHtml(t.message.poll)), U(e, n);
		};
		G(pe, (e) => {
			t.message.poll && e(me);
		});
		var he = I(pe, 2), ge = (e) => {
			var n = Nr();
			K(P(n), () => t.vb.threadCards(t.message.id)), U(e, n);
		};
		G(he, (e) => {
			n() || e(ge);
		}), O(x), O(i), L((e, c, l, u, d, p, g, y, x, S, C, w) => {
			a = q(i, 1, "msg", null, a, {
				ai: t.message.author === "ai",
				agent: t.message.author !== "ai" && t.message.kind === "agent",
				done: t.message.tag === "done",
				cont: B(r),
				waitMsg: e
			}), J(i, "id", n() ? void 0 : `m${t.message.id}`), J(f, "data-copymsg", t.message.id), J(f, "title", c), J(f, "aria-label", l), W(m, ` ${u ?? ""}`), J(h, "data-copylink", t.message.id), J(h, "title", d), J(h, "aria-label", p), W(_, ` ${g ?? ""}`), J(v, "data-reply", t.message.id), J(v, "title", y), J(v, "aria-label", x), W(b, ` ${S ?? ""}`), W(ie, ` · ${C ?? ""}`), J(ae, "title", B(s)), W(oe, w), J(se, "hidden", !B(o));
		}, [
			() => t.vb.waiting(t.message.id),
			() => t.vb.t("Copiar"),
			() => t.vb.t("Copiar o texto desta mensagem"),
			() => t.vb.t("Copiar"),
			() => t.vb.t("Copiar link"),
			() => t.vb.t("Copiar o link desta mensagem"),
			() => t.vb.t("Copiar link"),
			() => t.vb.t("Responder"),
			() => t.vb.t("Responder a esta mensagem"),
			() => t.vb.t("Responder"),
			() => t.vb.ago(t.message.ts),
			() => t.vb.hhmm(t.message.ts)
		]), U(e, i);
	};
	G(l, (e) => {
		B(a) === null ? e(d, -1) : e(u);
	}), U(e, c), Ye();
}
// svelte/Chat.svelte
var Sl = /* @__PURE__ */ H("<div class=\"older\"><button type=\"button\" class=\"ghost\" id=\"olderBtn\"> </button></div>"), Cl = /* @__PURE__ */ H("<div class=\"origin\"><!> <div class=\"replies\"><span> </span><button type=\"button\" class=\"ghost\"> <!></button></div></div>"), wl = /* @__PURE__ */ H("<div><!></div>"), Tl = /* @__PURE__ */ H("<!> <!> <!>", 1);
function El(e, t) {
	Je(t, !0);
	let n = Wi(t, "more", 3, !1), r = Wi(t, "origin", 3, null), i = Wi(t, "replyCount", 3, 0);
	var a = Nr();
	Gr(P(a), () => t.room.id + ":" + t.thread, (e) => {
		var a = Tl(), o = P(a), s = (e) => {
			var n = Sl(), r = N(n), i = F(r, !0);
			O(n), L((e) => W(i, e), [() => t.vb.t("Carregar mensagens anteriores")]), V("click", r, function(...e) {
				t.onloadolder?.apply(this, e);
			}), U(e, n);
		};
		G(o, (e) => {
			t.list.length && n() && e(s);
		});
		var c = I(o, 2), l = (e) => {
			var n = Cl(), a = N(n);
			xl(a, {
				get message() {
					return r();
				},
				origin: !0,
				get typing() {
					return t.room.typing[r().id];
				},
				get vb() {
					return t.vb;
				}
			});
			var o = I(a, 2), s = N(o), c = F(s, !0), l = I(s), u = N(l);
			K(I(u), () => t.vb.icon("reply", 13)), O(l), O(o), O(n), L((e, t) => {
				W(c, e), J(l, "data-gomain", r().id), W(u, `${t ?? ""} `);
			}, [() => i() === 1 ? t.vb.t("1 resposta") : t.vb.t("{n} respostas", { n: i() }), () => t.vb.t("ver na sala principal")]), U(e, n);
		};
		G(c, (e) => {
			r() && e(l);
		});
		var u = I(c, 2), d = (e) => {
			var n = Nr();
			Xr(P(n), 19, () => t.list, (e) => e.id, (e, n, r) => {
				{
					let i = /* @__PURE__ */ k(() => B(r) ? t.list[B(r) - 1] : t.previous);
					xl(e, {
						get message() {
							return B(n);
						},
						get previous() {
							return B(i);
						},
						get typing() {
							return t.room.typing[B(n).id];
						},
						get vb() {
							return t.vb;
						}
					});
				}
			}), U(e, n);
		}, f = (e) => {
			var n = wl();
			let i;
			var a = N(n), o = (e) => {
				var n = Nr();
				K(P(n), () => t.vb.t("Comece a conversa. Os agents ligados nesta sala leem e respondem; o seu age com o seu OK. Ex.: <i>organiza o projeto em épicos: site novo, aluguéis e domínio</i>.")), U(e, n);
			}, s = (e) => {
				var n = Mr();
				L((e) => W(n, e), [() => t.vb.t("Discussão deste épico. Os agents leem as tarefas, o doc e a sala principal.")]), U(e, n);
			};
			G(a, (e) => {
				t.thread === "main" ? e(o) : e(s, -1);
			}), O(n), L(() => i = q(n, 1, "empty", null, i, { afterOrigin: !!r() })), U(e, n);
		};
		G(u, (e) => {
			t.list.length ? e(d) : e(f, -1);
		}), U(e, a);
	}), U(e, a), Ye();
}
wr(["click"]);
// svelte/roomStore.ts
function Dl(e, t, n) {
	if (t.t === "state") return {
		...t,
		id: n,
		typing: {}
	};
	if (!e || e.id !== n) return e;
	let r = e, i = (e, t) => r.messages.map((n) => n.id === e ? {
		...n,
		...t
	} : n);
	switch (t.t) {
		case "msg": return {
			...r,
			messages: r.messages.some((e) => e.id === t.m.id) ? r.messages : [...r.messages, t.m]
		};
		case "moved": return {
			...r,
			messages: i(t.id, { thread: t.thread })
		};
		case "closed": return {
			...r,
			messages: i(t.id, { choices: t.choices })
		};
		case "delta": {
			let e = { ...r.typing };
			return delete e[t.id], {
				...r,
				messages: i(t.id, { text: t.text }),
				typing: e
			};
		}
		case "typing": return {
			...r,
			typing: {
				...r.typing,
				[t.id]: t.mode
			}
		};
		case "epics": return {
			...r,
			epics: t.epics,
			roomTasks: t.roomTasks ?? r.roomTasks
		};
		case "epicsPatch": {
			let e = new Map(r.epics.map((e) => [e.id, e]));
			return t.changed.forEach((t) => e.set(t.id, t)), t.order.some((t) => !e.has(t)) ? r : {
				...r,
				epics: t.order.map((t) => e.get(t)),
				roomTasks: t.roomTasks ?? r.roomTasks
			};
		}
		case "docNotes": return {
			...r,
			docNotes: t.notes
		};
		case "doc": {
			let e = { ...r.docs };
			return t.stale ? (t.epic && delete e[t.epic], {
				...r,
				docs: e
			}) : t.epic ? {
				...r,
				docs: {
					...e,
					[t.epic]: t.text ?? ""
				}
			} : {
				...r,
				doc: t.text ?? ""
			};
		}
		case "meta": return {
			...r,
			book: {
				...r.book,
				...t.title ? { title: t.title } : {},
				...t.folder ? { folder: t.folder } : {},
				...t.summary ? { summary: t.summary } : {}
			}
		};
		case "suggestions": return {
			...r,
			suggestions: t.suggestions
		};
		case "requests": return {
			...r,
			requests: t.requests
		};
		case "members": return {
			...r,
			members: t.members,
			pending: t.pending,
			requests: t.requests ?? r.requests,
			names: t.names ?? r.names,
			avatars: t.avatars ?? r.avatars
		};
		case "files": return {
			...r,
			files: t.files,
			filesN: t.files.length,
			filesAll: !0
		};
		case "fileAdd": return {
			...r,
			files: [t.file, ...(r.files ?? []).filter((e) => e.id !== t.file.id)],
			filesN: (r.filesN ?? r.files?.length ?? 0) + +!(r.files ?? []).some((e) => e.id === t.file.id)
		};
		case "reminders": return {
			...r,
			reminders: t.reminders
		};
		case "decisions": return {
			...r,
			decisions: t.decisions
		};
		case "pins": return {
			...r,
			pins: t.pins
		};
		case "receipts": return {
			...r,
			receipts: t.receipts
		};
		case "older": {
			let e = new Map(r.messages.map((e) => [e.id, e]));
			return t.messages.forEach((t) => {
				e.has(t.id) || e.set(t.id, t);
			}), {
				...r,
				messages: [...e.values()].sort((e, t) => e.id - t.id)
			};
		}
		case "acks": return {
			...r,
			acks: t.acks
		};
		case "ackRows": {
			let e = (e) => `${e.msg_id}|${e.agent ?? e.email}`, n = new Set(t.acks.map(e));
			return {
				...r,
				acks: [...t.acks, ...(r.acks ?? []).filter((t) => !n.has(e(t)))]
			};
		}
		case "poll": return {
			...r,
			polls: {
				...r.polls,
				[t.poll.id]: t.poll
			}
		};
		case "online": return {
			...r,
			online: t.online
		};
		default: return r;
	}
}
function Ol() {
	let e = Ni(null);
	return {
		subscribe: e.subscribe,
		get: () => Pi(e),
		replace: e.set,
		apply(t, n) {
			return e.update((e) => Dl(e, t, n)), Pi(e);
		}
	};
}
// svelte/main.ts
var kl = /* @__PURE__ */ t({
	createRoomStore: () => Ol,
	mountInbox: () => Ml,
	mountView: () => jl
}), Al = {
	tasks: la,
	board: Aa,
	files: za,
	reminders: Xc,
	sidebar: gl,
	chat: El
};
function jl(e, t, n) {
	let r = Ni(n), i = Al[e], a = Ft(() => Rr(Gi, {
		target: t,
		props: {
			component: i,
			values: r
		}
	}));
	return {
		update(e) {
			Ft(() => r.set(e));
		},
		destroy() {
			Ft(() => {
				Hr(a);
			});
		}
	};
}
function Ml(e, t) {
	let n = Ft(() => Rr($i, {
		target: e,
		props: t
	}));
	return () => Hr(n);
}
export { Vc as a, Ol as i, Ml as n, Rc as o, jl as r, Lc as s, kl as t };
