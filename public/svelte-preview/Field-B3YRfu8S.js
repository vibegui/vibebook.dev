// ../vibebook/node_modules/svelte/src/internal/shared/utils.js
var e = Array.isArray, t = Array.prototype.indexOf, n = Array.prototype.includes, r = Array.from, i = Object.defineProperty, a = Object.getOwnPropertyDescriptor, o = Object.getOwnPropertyDescriptors, s = Object.prototype, c = Array.prototype, l = Object.getPrototypeOf, u = Object.isExtensible;
function d(e) {
	return typeof e == "function";
}
var f = () => {};
function p(e) {
	for (var t = 0; t < e.length; t++) e[t]();
}
function m() {
	var e, t;
	return {
		promise: new Promise((n, r) => {
			e = n, t = r;
		}),
		resolve: e,
		reject: t
	};
}
function h(e, t) {
	if (Array.isArray(e)) return e;
	if (t === void 0 || !(Symbol.iterator in e)) return Array.from(e);
	let n = [];
	for (let r of e) if (n.push(r), n.length === t) break;
	return n;
}
// ../vibebook/node_modules/svelte/src/internal/client/constants.js
var g = 1 << 24, _ = 1024, v = 2048, y = 4096, b = 8192, x = 16384, S = 32768, ee = 1 << 25, C = 65536, w = 1 << 19, te = 1 << 20, ne = 1 << 25, re = 1 << 21, ie = 1 << 22, ae = 1 << 23, oe = Symbol("$state"), se = Symbol("component"), ce = Symbol("legacy props"), le = Symbol(""), ue = Symbol("attributes"), T = Symbol("class"), de = Symbol("style"), fe = Symbol("text"), pe = Symbol("form reset"), me = new class extends Error {
	name = "StaleReactionError";
	message = "The reaction that called `getAbortSignal()` was re-run or destroyed";
}(), he = !!globalThis.document?.contentType && /* @__PURE__ */ globalThis.document.contentType.includes("xml"), E = {}, D = Symbol("uninitialized"), ge = "http://www.w3.org/1999/xhtml", O = "http://www.w3.org/2000/svg", _e = "http://www.w3.org/1998/Math/MathML", ve = "@attach";
function ye() {
	console.warn("https://svelte.dev/e/derived_inert");
}
function be(e) {
	console.warn("https://svelte.dev/e/hydration_mismatch");
}
function xe() {
	console.warn("https://svelte.dev/e/select_multiple_invalid_value");
}
function Se() {
	console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
// ../vibebook/node_modules/svelte/src/internal/client/dom/hydration.js
var k = !1;
function Ce(e) {
	k = e;
}
var A;
function we(e) {
	if (e === null) throw be(), E;
	return A = e;
}
function Te() {
	return we(/* @__PURE__ */ pn(A));
}
function j(e) {
	if (k) {
		if (/* @__PURE__ */ pn(A) !== null) throw be(), E;
		A = e;
	}
}
function Ee(e = 1) {
	if (k) {
		for (var t = e, n = A; t--;) n = /* @__PURE__ */ pn(n);
		A = n;
	}
}
function De(e = !0) {
	for (var t = 0, n = A;;) {
		if (n.nodeType === 8) {
			var r = n.data;
			if (r === "]") {
				if (t === 0) return n;
				--t;
			} else (r === "[" || r === "[!" || r[0] === "[" && !isNaN(Number(r.slice(1)))) && (t += 1);
		}
		var i = /* @__PURE__ */ pn(n);
		e && n.remove(), n = i;
	}
}
function Oe(e) {
	if (!e || e.nodeType !== 8) throw be(), E;
	return e.data;
}
// ../vibebook/node_modules/svelte/src/internal/client/reactivity/equality.js
function ke(e) {
	return e === this.v;
}
function Ae(e, t) {
	return e == e ? e !== t || typeof e == "object" && !!e || typeof e == "function" : t == t;
}
function je(e) {
	return !Ae(e, this.v);
}
function Me(e) {
	throw Error("https://svelte.dev/e/lifecycle_outside_component");
}
// ../vibebook/node_modules/svelte/src/internal/client/errors.js
function Ne() {
	throw Error("https://svelte.dev/e/async_derived_orphan");
}
function Pe(e, t, n) {
	throw Error("https://svelte.dev/e/each_key_duplicate");
}
function Fe(e) {
	throw Error("https://svelte.dev/e/effect_in_teardown");
}
function Ie() {
	throw Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function Le(e) {
	throw Error("https://svelte.dev/e/effect_orphan");
}
function Re() {
	throw Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function ze(e) {
	throw Error("https://svelte.dev/e/props_invalid_value");
}
function Be() {
	throw Error("https://svelte.dev/e/state_descriptors_fixed");
}
function Ve() {
	throw Error("https://svelte.dev/e/state_prototype_fixed");
}
function He() {
	throw Error("https://svelte.dev/e/state_unsafe_mutation");
}
function Ue() {
	throw Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
// ../vibebook/node_modules/svelte/src/internal/shared/context.js
function We(e) {
	let t = e.p;
	for (; t !== null && t.c === null;) t = t.p;
	return t?.c ?? null;
}
function Ge(e, t) {
	return e === null && Me(t), e.c ??= new Map(We(e) || void 0);
}
// ../vibebook/node_modules/svelte/src/internal/client/context.js
var Ke = null;
function qe(e) {
	Ke = e;
}
function Je(e) {
	return Ge(Ke, "getContext").get(e);
}
function Ye(e, t) {
	return Ge(Ke, "setContext").set(e, t), t;
}
function Xe(e) {
	return Ge(Ke, "hasContext").has(e);
}
function Ze() {
	return Ge(Ke, "getAllContexts");
}
function M(e, t = !1, n) {
	Ke = {
		p: Ke,
		i: !1,
		c: null,
		e: null,
		s: e,
		x: null,
		r: H,
		l: null
	};
}
function N(e) {
	var t = Ke, n = t.e;
	if (n !== null) {
		t.e = null;
		for (var r of n) On(r);
	}
	return e !== void 0 && (t.x = e), t.i = !0, Ke = t.p, Qe(e);
}
function Qe(e = {}) {
	return i(e, se, { value: !0 }), e;
}
function $e() {
	return !0;
}
// ../vibebook/node_modules/svelte/src/internal/client/dom/task.js
var et = [];
function tt() {
	var e = et;
	et = [], p(e);
}
function nt(e) {
	if (et.length === 0 && !At) {
		var t = et;
		queueMicrotask(() => {
			t === et && tt();
		});
	}
	et.push(e);
}
function rt() {
	for (; et.length > 0;) tt();
}
// ../vibebook/node_modules/svelte/src/internal/client/reactivity/status.js
var it = ~(v | y | _);
function P(e, t) {
	e.f = e.f & it | t;
}
function at(e) {
	e.f & 512 || e.deps === null ? P(e, _) : P(e, y);
}
// ../vibebook/node_modules/svelte/src/internal/client/reactivity/utils.js
function ot(e, t) {
	e.f & 2048 ? t.set(e, v) : e.f & 4096 && t.get(e) !== 2048 && t.set(e, y), P(e, _);
}
// ../vibebook/node_modules/svelte/src/internal/client/dom/elements/misc.js
function st(e, t) {
	if (t) {
		let t = document.body;
		e.autofocus = !0, nt(() => {
			document.activeElement === t && e.focus();
		});
	}
}
function ct(e) {
	k && /* @__PURE__ */ fn(e) !== null && gn(e);
}
var lt = !1;
function ut() {
	lt || (lt = !0, document.addEventListener("reset", (e) => {
		Promise.resolve().then(() => {
			if (!e.defaultPrevented) for (let t of e.target.elements) t[pe]?.();
		});
	}, { capture: !0 }));
}
// ../vibebook/node_modules/svelte/src/internal/client/dom/elements/bindings/shared.js
function dt(e) {
	var t = V, n = H;
	er(null), tr(null);
	try {
		return e();
	} finally {
		er(t), tr(n);
	}
}
function ft(e, t, n, r = n) {
	e.addEventListener(t, () => dt(n));
	let i = e[pe];
	e[pe] = i ? () => {
		i(), r(!0);
	} : () => r(!0), ut();
}
// ../vibebook/node_modules/svelte/src/internal/client/reactivity/async.js
function pt(e, t, n, r) {
	let i = $e() ? _t : bt;
	var a = e.filter((e) => !e.settled), o = t.map(i);
	if (n.length === 0 && a.length === 0) {
		r(o);
		return;
	}
	var s = H, c = mt(), l = a.length === 1 ? a[0].promise : a.length > 1 ? Promise.all(a.map((e) => e.promise)) : null;
	function u(e) {
		if (!(s.f & 16384)) {
			c();
			try {
				r([...o, ...e]);
			} catch (e) {
				xn(e, s);
			}
			ht();
		}
	}
	var d = gt();
	if (n.length === 0) {
		l.then(() => u([])).finally(d);
		return;
	}
	function f() {
		Promise.all(n.map((e) => /* @__PURE__ */ yt(e))).then(u).catch((e) => xn(e, s)).finally(d);
	}
	l ? l.then(() => {
		s.f & 16384 ? d() : (c(), f(), ht());
	}) : f();
}
function mt() {
	var e = H, t = V, n = Ke, r = I;
	return function(i = !0) {
		tr(e), er(t), qe(n), i && !(e.f & 16384) && (r?.activate(), r?.apply());
	};
}
function ht(e = !0) {
	tr(null), er(null), qe(null), e && I?.deactivate();
}
function gt() {
	var e = H, t = e.b, n = I, r = !!t?.is_rendered();
	return t?.update_pending_count(1, n), n.increment(r, e), () => {
		t?.update_pending_count(-1, n), n.decrement(r, e);
	};
}
/*#__NO_SIDE_EFFECTS__*/
function _t(e) {
	var t = 2 | v;
	return H !== null && (H.f |= w), {
		ctx: Ke,
		deps: null,
		effects: null,
		equals: ke,
		f: t,
		fn: e,
		reactions: null,
		rv: 0,
		v: D,
		wv: 0,
		parent: H,
		ac: null
	};
}
var vt = Symbol("obsolete");
/*#__NO_SIDE_EFFECTS__*/
function yt(e, t, n) {
	let r = H;
	r === null && Ne();
	var i = void 0, a = qt(D), o = !V, s = /* @__PURE__ */ new Set();
	return Nn(() => {
		var t = H, n = m();
		i = n.promise;
		try {
			Promise.resolve(e()).then(n.resolve, (e) => {
				e !== me && n.reject(e);
			}).finally(ht);
		} catch (e) {
			n.reject(e), ht();
		}
		var c = I;
		if (o) {
			if (t.f & 32768) var l = gt();
			if (r.b?.is_rendered()) c.async_deriveds.get(t)?.reject(vt);
			else for (let e of s.values()) e.reject(vt);
			s.add(n), c.async_deriveds.set(t, n);
		}
		let u = (e, t = void 0) => {
			l?.(), s.delete(n), t !== vt && (c.activate(), t ? (a.f |= ae, Zt(a, t)) : (a.f & 8388608 && (a.f ^= ae), Zt(a, e)), c.deactivate());
		};
		n.promise.then(u, (e) => u(null, e || "unknown"));
	}), En(() => {
		for (let e of s) e.reject(vt);
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
function F(e) {
	let t = /* @__PURE__ */ _t(e);
	return rr(t), t;
}
/*#__NO_SIDE_EFFECTS__*/
function bt(e) {
	let t = /* @__PURE__ */ _t(e);
	return t.equals = je, t;
}
function xt(e) {
	var t = e.effects;
	if (t !== null) {
		e.effects = null;
		for (var n = 0; n < t.length; n += 1) Hn(t[n]);
	}
}
function St(e) {
	var t, n = H, r = e.parent;
	if (!Zn && r !== null && e.v !== D && r.f & 24576) return ye(), e.v;
	tr(r);
	try {
		xt(e), t = hr(e);
	} finally {
		tr(n);
	}
	return t;
}
function Ct(e) {
	var t = St(e);
	!e.equals(t) && (e.wv = fr(), (!I?.is_fork || e.deps === null) && (I === null ? e.v = t : (I.capture(e, t, !0), Dt?.capture(e, t, !0)), e.deps === null)) ? P(e, _) : Zn || (Ot === null ? at(e) : (Tn() || I?.is_fork) && Ot.set(e, t));
}
function wt(e) {
	if (e.effects !== null) for (let t of e.effects) (t.teardown || t.ac) && (t.teardown?.(), t.ac !== null && dt(() => {
		t.ac.abort(me), t.ac = null;
	}), t.fn !== null && (t.teardown = f), vr(t, 0), Bn(t));
}
function Tt(e) {
	if (e.effects !== null) for (let t of e.effects) t.teardown && t.fn !== null && yr(t);
}
// ../vibebook/node_modules/svelte/src/internal/client/reactivity/batch.js
var Et = null, I = null, Dt = null, Ot = null, kt = null, At = !1, jt = !1, Mt = null, Nt = null, Pt = 0, Ft = 1, It = class e {
	id = Ft++;
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
		Et === null ? Et = this : (Et.next = this, this.prev = Et), Et = this;
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
			for (var r of n.d) P(r, v), t(r);
			for (r of n.m) P(r, y), t(r);
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
					t.f ^= _;
				}
			}
			n || e.push(t);
		}
		return this.#a = [], e;
	}
	#m() {
		this.started = !0;
		for (let [e, t] of this.#s) P(e, t), this.schedule(e);
		this.apply();
		for (var t = Mt = [], n = [], r = Nt = []; this.#a.length > 0;) {
			Pt++ > 1e3 && (this.#b(), Rt());
			for (let e of this.#p()) try {
				this.#h(e, t, n);
			} catch (t) {
				throw Ut(e), this.#d() || this.discard(), t;
			}
		}
		if (I = null, r.length > 0) {
			var i = e.ensure();
			for (let e of r) i.schedule(e);
		}
		if (Mt = null, Nt = null, this.#d()) {
			this.#y(n), this.#y(t);
			for (let [e, t] of this.#c) Ht(e, t);
			r.length > 0 && I.#m();
			return;
		}
		let a = this.#g();
		if (a) this.#y(n), this.#y(t), a.#v(this);
		else {
			this.#s.clear();
			for (let e of this.#e) e(this);
			this.#e.clear(), Dt = this, Bt(n), Bt(t), Dt = null, this.#i?.resolve();
			var o = I;
			this.#n === 0 && (this.#a.length === 0 || o !== null) && this.#b(), o !== null && (Gt.clear(), o.#m());
		}
	}
	#h(e, t, n) {
		e.f ^= _;
		for (var r = e.first; r !== null;) {
			var i = r.f, a = !!(i & 96);
			if (!(a && i & 1024 || i & 8192 || this.#c.has(r)) && r.fn !== null) {
				a ? r.f ^= _ : i & 4 ? t.push(r) : pr(r) && (i & 16 && this.add_dirty_reaction(r, y), yr(r));
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
					r & 4194320 && !this.async_deriveds.has(i) && (this.#s.delete(i), P(i, v), this.schedule(i));
				}
			}
		};
		for (let e of this.current.keys()) t(e);
		this.oncommit(() => e.discard()), e.#b(), I = this, this.#m();
	}
	#y(e) {
		for (var t = 0; t < e.length; t += 1) ot(e[t], this.#s);
	}
	capture(e, t, n = !1) {
		e.v !== D && !this.previous.has(e) && this.previous.set(e, e.v), e.f & 8388608 || (this.current.set(e, [t, n]), Ot?.set(e, t)), this.is_fork || (e.v = t);
	}
	activate() {
		I = this;
	}
	deactivate() {
		I = null, Ot = null;
	}
	flush() {
		try {
			jt = !0, I = this, this.#m();
		} finally {
			Pt = 0, kt = null, Mt = null, Nt = null, jt = !1, I = null, Ot = null, Gt.clear();
		}
	}
	discard() {
		for (let e of this.#t) e(this);
		this.#t.clear();
		for (let e of this.async_deriveds.values()) e.reject(vt);
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
		this.#u || (this.#u = !0, nt(() => {
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
		return (this.#i ??= m()).promise;
	}
	static ensure() {
		if (I === null) {
			let t = I = new e();
			!jt && !At && nt(() => {
				t.started || t.flush();
			});
		}
		return I;
	}
	apply() {
		Ot = null;
	}
	schedule(e) {
		kt = e, e.b?.is_pending && e.f & 16777228 && !(e.f & 32768) ? e.b.defer_effect(e) : this.#a.push(e);
	}
	#b() {
		if (this.linked) {
			var e = this.prev, t = this.next;
			e === null || (e.next = t), t === null ? Et = e : t.prev = e, this.linked = !1;
		}
	}
};
function Lt(e) {
	var t = At, n = Dt;
	Dt = null, At = !0;
	try {
		var r;
		for (e && (Lt(), r = e());;) {
			if (rt(), I === null) return r;
			I.flush();
		}
	} finally {
		At = t, Dt = n;
	}
}
function Rt() {
	try {
		Re();
	} catch (e) {
		xn(e, kt);
	}
}
var zt = null;
function Bt(e) {
	var t = e.length;
	if (t !== 0) {
		for (var n = 0; n < t;) {
			var r = e[n++];
			if (!(r.f & 24576) && pr(r) && (zt = /* @__PURE__ */ new Set(), yr(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && Wn(r), zt?.size > 0)) {
				Gt.clear();
				for (let e of zt) {
					if (e.f & 24576) continue;
					let t = [e], n = e.parent;
					for (; n !== null;) zt.has(n) && (zt.delete(n), t.push(n)), n = n.parent;
					for (let e = t.length - 1; e >= 0; e--) {
						let n = t[e];
						n.f & 24576 || yr(n);
					}
				}
				zt.clear();
			}
		}
		zt = null;
	}
}
function Vt(e) {
	I.schedule(e);
}
function Ht(e, t) {
	if (!(e.f & 32 && e.f & 1024)) {
		e.f & 2048 ? t.d.push(e) : e.f & 4096 && t.m.push(e), P(e, _);
		for (var n = e.first; n !== null;) Ht(n, t), n = n.next;
	}
}
function Ut(e) {
	P(e, _);
	for (var t = e.first; t !== null;) Ut(t), t = t.next;
}
// ../vibebook/node_modules/svelte/src/internal/client/reactivity/sources.js
var Wt = /* @__PURE__ */ new Set(), Gt = /* @__PURE__ */ new Map(), Kt = !1;
function qt(e, t) {
	return {
		f: 0,
		v: e,
		reactions: null,
		equals: ke,
		rv: 0,
		wv: 0
	};
}
/*#__NO_SIDE_EFFECTS__*/
function L(e, t) {
	let n = qt(e, t);
	return rr(n), n;
}
/*#__NO_SIDE_EFFECTS__*/
function Jt(e, t = !1, n = !0) {
	let r = qt(e);
	return t || (r.equals = je), r;
}
function R(e, t, n = !1) {
	return V !== null && (!$n || V.f & 131072) && $e() && V.f & 4325394 && (nr === null || !nr.has(e)) && He(), Zt(e, n ? nn(t) : t, Nt);
}
var Yt = null, Xt = 0;
function Zt(e, t, n = null) {
	if (!e.equals(t)) {
		Zn ? Gt.set(e, t) : Gt.has(e) || Gt.set(e, e.v);
		var r = It.ensure();
		if (r.capture(e, t), e.f & 2) {
			let t = e;
			e.f & 2048 && St(t), Ot === null && at(t);
		}
		e.wv = fr(), Yt = null, Xt = 0, tn(e, v, n), Yt = null, $e() && H !== null && H.f & 1024 && !(H.f & 96) && (or === null ? sr([e]) : or.push(e)), !r.is_fork && Wt.size > 0 && !Kt && Qt();
	}
	return t;
}
function Qt() {
	Kt = !1;
	for (let e of Wt) {
		e.f & 1024 && P(e, y);
		let t;
		try {
			t = pr(e);
		} catch {
			t = !0;
		}
		t && yr(e);
	}
	Wt.clear();
}
function $t(e, t = 1) {
	var n = U(e), r = t === 1 ? n++ : n--;
	return R(e, n), r;
}
function en(e) {
	R(e, e.v + 1);
}
function tn(e, t, n) {
	var r = e.reactions;
	if (r !== null) {
		var i = $e(), a = r.length;
		if (Xt += a, Xt > 1e5 && Yt === null && (Yt = /* @__PURE__ */ new Set()), Yt !== null) {
			if (Yt.has(e)) return;
			Yt.add(e);
		}
		for (var o = 0; o < a; o++) {
			var s = r[o], c = s.f;
			if (i || s !== H) {
				var l = (c & v) === 0;
				if (l && P(s, t), c & 131072) Wt.add(s);
				else if (c & 2) {
					var u = s;
					Ot?.delete(u), tn(u, y, n);
				} else if (l) {
					var d = s;
					c & 16 && zt !== null && zt.add(d), n === null ? Vt(d) : n.push(d);
				}
			}
		}
	}
}
function nn(t) {
	if (typeof t != "object" || !t || oe in t || se in t) return t;
	let n = l(t);
	if (n !== s && n !== c) return t;
	var r = /* @__PURE__ */ new Map(), i = e(t), o = /* @__PURE__ */ L(0), u = null, d = ur, f = (e) => {
		if (ur === d) return e();
		var t = V, n = ur;
		er(null), dr(d);
		var r = e();
		return er(t), dr(n), r;
	};
	return i && r.set("length", /* @__PURE__ */ L(t.length, u)), new Proxy(t, {
		defineProperty(e, t, n) {
			"value" in n && n.configurable !== !1 && n.enumerable !== !1 && n.writable !== !1 || Be();
			var i = r.get(t);
			return i === void 0 ? f(() => {
				var e = /* @__PURE__ */ L(n.value, u);
				return r.set(t, e), e;
			}) : R(i, n.value, !0), !0;
		},
		deleteProperty(e, t) {
			var n = r.get(t);
			if (n === void 0) {
				if (t in e) {
					let e = f(() => /* @__PURE__ */ L(D, u));
					r.set(t, e), en(o);
				}
			} else R(n, D), en(o);
			return !0;
		},
		get(e, n, i) {
			if (n === oe) return t;
			var o = r.get(n), s = n in e;
			if (o === void 0 && (!s || a(e, n)?.writable) && (o = f(() => /* @__PURE__ */ L(nn(s ? e[n] : D), u)), r.set(n, o)), o !== void 0) {
				var c = U(o);
				return c === D ? void 0 : c;
			}
			return Reflect.get(e, n, i);
		},
		getOwnPropertyDescriptor(e, t) {
			this.has?.(e, t);
			var n = Reflect.getOwnPropertyDescriptor(e, t), i = r.get(t);
			if (i !== void 0) {
				var a = U(i);
				if (a === D) return;
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
			var n = r.get(t), i = n !== void 0 && n.v !== D || Reflect.has(e, t);
			return (n !== void 0 || (H !== null || V !== null) && (!i || a(e, t)?.writable)) && (n === void 0 && (n = f(() => /* @__PURE__ */ L(i ? nn(e[t]) : D, u)), r.set(t, n)), U(n) === D) ? !1 : i;
		},
		set(e, t, n, s) {
			var c = r.get(t), l = t in e;
			if (i && t === "length") for (var d = n; d < c.v; d += 1) {
				var p = r.get(d + "");
				p === void 0 ? d in e && (p = f(() => /* @__PURE__ */ L(D, u)), r.set(d + "", p)) : R(p, D);
			}
			if (c === void 0) (!l || a(e, t)?.writable) && (c = f(() => /* @__PURE__ */ L(void 0, u)), R(c, nn(n)), r.set(t, c));
			else {
				l = c.v !== D;
				var m = f(() => nn(n));
				R(c, m);
			}
			var h = Reflect.getOwnPropertyDescriptor(e, t);
			if (h?.set && h.set.call(s, n), !l) {
				if (i && typeof t == "string") {
					var g = r.get("length"), _ = Number(t);
					Number.isInteger(_) && _ >= g.v && R(g, _ + 1);
				}
				en(o);
			}
			return !0;
		},
		ownKeys(e) {
			U(o);
			var t = Reflect.ownKeys(e).filter((e) => {
				var t = r.get(e);
				return t === void 0 || t.v !== D;
			});
			for (var [n, i] of r) i.v !== D && !(n in e) && t.push(n);
			return t;
		},
		setPrototypeOf() {
			Ve();
		}
	});
}
function rn(e) {
	try {
		if (typeof e == "object" && e && oe in e) return e[oe];
	} catch {}
	return e;
}
function an(e, t) {
	return Object.is(rn(e), rn(t));
}
var on, sn, cn, ln;
function un() {
	if (on === void 0) {
		on = window, sn = /Firefox/.test(navigator.userAgent);
		var e = Element.prototype, t = Node.prototype, n = Text.prototype;
		cn = a(t, "firstChild").get, ln = a(t, "nextSibling").get, u(e) && (e[T] = void 0, e[ue] = null, e[de] = void 0, e.__e = void 0), u(n) && (n[fe] = void 0);
	}
}
function dn(e = "") {
	return document.createTextNode(e);
}
/*@__NO_SIDE_EFFECTS__*/
function fn(e) {
	return cn.call(e);
}
/*@__NO_SIDE_EFFECTS__*/
function pn(e) {
	return ln.call(e);
}
function z(e, t) {
	if (!k) return /* @__PURE__ */ fn(e);
	var n = /* @__PURE__ */ fn(A);
	if (n === null) n = A.appendChild(dn());
	else if (t && n.nodeType !== 3) {
		var r = dn();
		return n?.before(r), we(r), r;
	}
	return t && yn(n), we(n), n;
}
function B(e, t = !1) {
	if (!k) {
		var n = /* @__PURE__ */ fn(e);
		return n instanceof Comment && n.data === "" ? /* @__PURE__ */ pn(n) : n;
	}
	if (t) {
		if (A?.nodeType !== 3) {
			var r = dn();
			return A?.before(r), we(r), r;
		}
		yn(A);
	}
	return A;
}
function mn(e, t = !1) {
	if (!k) return /* @__PURE__ */ fn(e);
	var n = z(e, t);
	return j(e), n;
}
function hn(e, t = 1, n = !1) {
	let r = k ? A : e;
	for (var i; t--;) i = r, r = /* @__PURE__ */ pn(r);
	if (!k) return r;
	if (n) {
		if (r?.nodeType !== 3) {
			var a = dn();
			return r === null ? i?.after(a) : r.before(a), we(a), a;
		}
		yn(r);
	}
	return we(r), r;
}
function gn(e) {
	e.textContent = "";
}
function _n() {
	return !1;
}
function vn(e, t, n) {
	return t == null || t === "http://www.w3.org/1999/xhtml" ? n ? document.createElement(e, { is: n }) : document.createElement(e) : n ? document.createElementNS(t, e, { is: n }) : document.createElementNS(t, e);
}
function yn(e) {
	if (e.nodeValue.length < 65536) return;
	let t = e.nextSibling;
	for (; t !== null && t.nodeType === 3;) t.remove(), e.nodeValue += t.nodeValue, t = e.nextSibling;
}
function bn(e) {
	var t = H;
	if (t === null) return V.f |= ae, e;
	if (!(t.f & 32768) && !(t.f & 4)) throw e;
	xn(e, t);
}
function xn(e, t) {
	if (e === E) throw e;
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
// ../vibebook/node_modules/svelte/src/internal/client/reactivity/effects.js
function Sn(e) {
	H === null && (V === null && Le(e), Ie()), Zn && Fe(e);
}
function Cn(e, t) {
	var n = t.last;
	n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function wn(e, t) {
	var n = H;
	n !== null && n.f & 8192 && (e |= b);
	var r = {
		ctx: Ke,
		deps: null,
		nodes: null,
		f: e | v | 512,
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
	I?.register_created_effect(r);
	var i = r;
	if (e & 4) Mt === null ? It.ensure().schedule(r) : Mt.push(r);
	else if (t !== null) {
		try {
			yr(r);
		} catch (e) {
			throw Hn(r), e;
		}
		i.deps === null && i.teardown === null && i.nodes === null && i.first === i.last && !(i.f & 524288) && (i = i.first, e & 16 && e & 65536 && i !== null && (i.f |= C));
	}
	if (i !== null && (i.parent = n, n !== null && Cn(i, n), V !== null && V.f & 2 && !(e & 64))) {
		var a = V;
		(a.effects ??= []).push(i);
	}
	return r;
}
function Tn() {
	return V !== null && !$n;
}
function En(e) {
	let t = wn(8, null);
	return P(t, _), t.teardown = e, t;
}
function Dn(e) {
	Sn("$effect");
	var t = H.f;
	if (!V && t & 32 && Ke !== null && !Ke.i) {
		var n = Ke;
		(n.e ??= []).push(e);
	} else return On(e);
}
function On(e) {
	return wn(4 | te, e);
}
function kn(e) {
	return Sn("$effect.pre"), wn(8 | te, e);
}
function An(e) {
	It.ensure();
	let t = wn(64 | w, e);
	return () => {
		Hn(t);
	};
}
function jn(e) {
	It.ensure();
	let t = wn(64 | w, e);
	return (e = {}) => new Promise((n) => {
		e.outro ? Gn(t, () => {
			Hn(t), n(void 0);
		}) : (Hn(t), n(void 0));
	});
}
function Mn(e) {
	return wn(4, e);
}
function Nn(e) {
	return wn(ie | w, e);
}
function Pn(e, t = 0) {
	return wn(8 | t, e);
}
function Fn(e, t = [], n = [], r = []) {
	pt(r, t, n, (t) => {
		wn(8, () => {
			e(...t.map(U));
		});
	});
}
function In(e, t = 0) {
	return wn(16 | t, e);
}
function Ln(e, t = 0) {
	return wn(g | t, e);
}
function Rn(e) {
	return wn(32 | w, e);
}
function zn(e) {
	var t = e.teardown;
	if (t !== null) {
		let n = Zn, r = V;
		Qn(!0), er(null);
		try {
			t.call(null);
		} catch (t) {
			xn(t, e.parent);
		} finally {
			Qn(n), er(r);
		}
	}
}
function Bn(e, t = !1) {
	var n = e.first;
	for (e.first = e.last = null; n !== null;) {
		let e = n.ac;
		e !== null && dt(() => {
			e.abort(me);
		});
		var r = n.next;
		n.f & 64 ? n.parent = null : Hn(n, t), n = r;
	}
}
function Vn(e) {
	for (var t = e.first; t !== null;) {
		var n = t.next;
		t.f & 32 || Hn(t), t = n;
	}
}
function Hn(e, t = !0) {
	var n = !1;
	(t || e.f & 262144) && e.nodes !== null && e.nodes.end !== null && (Un(e.nodes.start, e.nodes.end), n = !0), e.f |= ee, Bn(e, t && !n), vr(e, 0);
	var r = e.nodes && e.nodes.t;
	if (r !== null) for (let e of r) e.stop();
	zn(e), e.f ^= ee, e.f |= x;
	var i = e.parent;
	i !== null && i.first !== null && Wn(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = e.b = null;
}
function Un(e, t) {
	for (; e !== null;) {
		var n = e === t ? null : /* @__PURE__ */ pn(e);
		e.remove(), e = n;
	}
}
function Wn(e) {
	var t = e.parent, n = e.prev, r = e.next;
	n !== null && (n.next = r), r !== null && (r.prev = n), t !== null && (t.first === e && (t.first = r), t.last === e && (t.last = n));
}
function Gn(e, t, n = !0) {
	var r = [];
	e.f |= 256, Kn(e, r, !0);
	var i = () => {
		n && Hn(e), t && t();
	}, a = r.length;
	if (a > 0) {
		var o = () => --a || i();
		for (var s of r) s.out(o);
	} else i();
}
function Kn(e, t, n) {
	if (!(e.f & 8192)) {
		e.f ^= b;
		var r = e.nodes && e.nodes.t;
		if (r !== null) for (let e of r) (e.is_global || n) && t.push(e);
		for (var i = e.first; i !== null;) {
			var a = i.next;
			if (!(i.f & 64)) {
				var o = !!(i.f & 65536) || !!(i.f & 32) && !!(e.f & 16);
				Kn(i, t, o ? n : !1);
			}
			i = a;
		}
	}
}
function qn(e) {
	e.f &= -257, Jn(e, !0);
}
function Jn(e, t) {
	if (!(e.f & 256) && e.f & 8192) {
		e.f ^= b, e.f & 1024 || (P(e, v), It.ensure().schedule(e));
		for (var n = e.first; n !== null;) {
			var r = n.next, i = !!(n.f & 65536) || !!(n.f & 32);
			Jn(n, i ? t : !1), n = r;
		}
		var a = e.nodes && e.nodes.t;
		if (a !== null) for (let e of a) (e.is_global || t) && e.in();
	}
}
function Yn(e, t) {
	if (e.nodes) for (var n = e.nodes.start, r = e.nodes.end; n !== null;) {
		var i = n === r ? null : /* @__PURE__ */ pn(n);
		t.append(n), n = i;
	}
}
// ../vibebook/node_modules/svelte/src/internal/client/legacy.js
var Xn = null, Zn = !1;
function Qn(e) {
	Zn = e;
}
var V = null, $n = !1;
function er(e) {
	V = e;
}
var H = null;
function tr(e) {
	H = e;
}
var nr = null;
function rr(e) {
	V !== null && (V.f & 2097152 || V.f & 2) && (nr ??= /* @__PURE__ */ new Set()).add(e);
}
var ir = null, ar = 0, or = null;
function sr(e) {
	or = e;
}
var cr = 1, lr = 0, ur = lr;
function dr(e) {
	ur = e;
}
function fr() {
	return ++cr;
}
function pr(e) {
	var t = e.f;
	if (t & 2048) return !0;
	if (t & 4096) {
		for (var n = e.deps, r = n.length, i = 0; i < r; i++) {
			var a = n[i];
			if (pr(a) && Ct(a), a.wv > e.wv) return !0;
		}
		t & 512 && Ot === null && P(e, _);
	}
	return !1;
}
function mr(e, t, n = !0) {
	var r = e.reactions;
	if (r !== null && !(nr !== null && nr.has(e))) for (var i = 0; i < r.length; i++) {
		var a = r[i];
		a.f & 2 ? mr(a, t, !1) : t === a && (n ? P(a, v) : a.f & 1024 && P(a, y), Vt(a));
	}
}
function hr(e) {
	var t = ir, n = ar, r = or, i = V, a = nr, o = Ke, s = $n, c = ur, l = e.f;
	ir = null, ar = 0, or = null, V = l & 96 ? null : e, nr = null, qe(e.ctx), $n = !1, ur = ++lr, e.ac !== null && (dt(() => {
		e.ac.abort(me);
	}), e.ac = null);
	try {
		e.f |= re;
		var u = e.fn, d = u();
		e.f |= S;
		var f = gr(e);
		if ($e() && or !== null && !$n && f !== null && !(e.f & 6146)) for (var p = 0; p < or.length; p++) mr(or[p], e);
		if (i !== null && i !== e) {
			if (lr++, i.deps !== null) for (let e = 0; e < n; e += 1) i.deps[e].rv = lr;
			if (t !== null) for (let e of t) e.rv = lr;
			or !== null && (r === null ? r = or : r.push(...or));
		}
		return e.f & 8388608 && (e.f ^= ae), d;
	} catch (t) {
		return gr(e), bn(t);
	} finally {
		e.f ^= re, ir = t, ar = n, or = r, V = i, nr = a, qe(o), $n = s, ur = c;
	}
}
function gr(e) {
	var t = e.deps, n = I?.is_fork;
	if (ir !== null) {
		var r;
		if (n || vr(e, ar), t !== null && ar > 0) for (t.length = ar + ir.length, r = 0; r < ir.length; r++) t[ar + r] = ir[r];
		else e.deps = t = ir;
		if (Tn() && e.f & 512) for (r = ar; r < t.length; r++) (t[r].reactions ??= []).push(e);
	} else !n && t !== null && ar < t.length && (vr(e, ar), t.length = ar);
	return t;
}
function _r(e, r) {
	let i = r.reactions;
	if (i !== null) {
		var a = t.call(i, e);
		if (a !== -1) {
			var o = i.length - 1;
			o === 0 ? i = r.reactions = null : (i[a] = i[o], i.pop());
		}
	}
	if (i === null && r.f & 2 && (ir === null || !n.call(ir, r))) {
		var s = r;
		s.f & 512 && (s.f ^= 512), s.v !== D && at(s), s.ac !== null && dt(() => {
			s.ac.abort(me), s.ac = null, P(s, v);
		}), wt(s), vr(s, 0);
	}
}
function vr(e, t) {
	var n = e.deps;
	if (n !== null) for (var r = t; r < n.length; r++) _r(e, n[r]);
}
function yr(e) {
	var t = e.f;
	if (!(t & 16384)) {
		P(e, _);
		var n = H;
		H = e;
		try {
			t & 16777232 ? Vn(e) : Bn(e), zn(e);
			var r = hr(e);
			e.teardown = typeof r == "function" ? r : null, e.wv = cr;
		} finally {
			H = n;
		}
	}
}
async function br() {
	await Promise.resolve(), Lt();
}
function U(e) {
	var t = !!(e.f & 2);
	if (Xn?.add(e), V !== null && !$n && !(H !== null && H.f & 16384) && (nr === null || !nr.has(e))) {
		var r = V.deps;
		if (V.f & 2097152) e.rv < lr && (e.rv = lr, ir === null && r !== null && r[ar] === e ? ar++ : ir === null ? ir = [e] : ir.push(e));
		else {
			V.deps ??= [], n.call(V.deps, e) || V.deps.push(e);
			var i = e.reactions;
			i === null ? e.reactions = [V] : n.call(i, V) || i.push(V);
		}
	}
	if (Zn && Gt.has(e)) return Gt.get(e);
	if (t) {
		var a = e;
		if (Zn) {
			var o = a.v;
			return (!(a.f & 1024) && a.reactions !== null || Sr(a)) && (o = St(a)), Gt.set(a, o), o;
		}
		var s = !(a.f & 512) && !$n && V !== null && !!(V.f & 512), c = (a.f & S) === 0;
		pr(a) && (s && (a.f |= 512), Ct(a)), s && !c && (Tt(a), xr(a));
	}
	if (Ot?.has(e)) return Ot.get(e);
	if (e.f & 8388608) throw e.v;
	return e.v;
}
function xr(e) {
	if (e.f |= 512, e.deps !== null) for (let r of e.deps) {
		var t = r.reactions;
		t === null ? r.reactions = [e] : n.call(t, e) || t.push(e), r.f & 2 && !(r.f & 512) && (Tt(r), xr(r));
	}
}
function Sr(e) {
	if (e.v === D) return !0;
	if (e.deps === null) return !1;
	for (let t of e.deps) if (Gt.has(t) || t.f & 2 && Sr(t)) return !0;
	return !1;
}
function Cr(e) {
	var t = $n;
	try {
		return $n = !0, e();
	} finally {
		$n = t;
	}
}
function wr(e) {
	if (!(typeof e != "object" || !e || e instanceof EventTarget)) {
		if (oe in e) Tr(e);
		else if (!Array.isArray(e)) for (let t in e) {
			let n = e[t];
			typeof n == "object" && n && oe in n && Tr(n);
		}
	}
}
function Tr(e, t = /* @__PURE__ */ new Set()) {
	if (typeof e == "object" && e && !(e instanceof EventTarget) && !t.has(e)) {
		t.add(e), e instanceof Date && e.getTime();
		for (let n in e) try {
			Tr(e[n], t);
		} catch {}
		let n = l(e);
		if (n !== Object.prototype && n !== Array.prototype && n !== Map.prototype && n !== Set.prototype && n !== Date.prototype) {
			let t = o(n);
			for (let n in t) {
				let r = t[n].get;
				if (r) try {
					r.call(e);
				} catch {}
			}
		}
	}
}
// ../vibebook/node_modules/svelte/src/attachments/index.js
function Er() {
	return Symbol(ve);
}
function Dr(e) {
	return e.endsWith("capture") && e !== "gotpointercapture" && e !== "lostpointercapture";
}
var Or = [
	"beforeinput",
	"click",
	"change",
	"dblclick",
	"contextmenu",
	"focusin",
	"focusout",
	"input",
	"keydown",
	"keyup",
	"mousedown",
	"mousemove",
	"mouseout",
	"mouseover",
	"mouseup",
	"pointerdown",
	"pointermove",
	"pointerout",
	"pointerover",
	"pointerup",
	"touchend",
	"touchmove",
	"touchstart"
];
function kr(e) {
	return Or.includes(e);
}
var Ar = /* @__PURE__ */ "allowfullscreen.async.autofocus.autoplay.checked.controls.default.disabled.formnovalidate.indeterminate.inert.ismap.loop.multiple.muted.nomodule.novalidate.open.playsinline.readonly.required.reversed.seamless.selected.webkitdirectory.defer.disablepictureinpicture.disableremoteplayback".split("."), jr = {
	formnovalidate: "formNoValidate",
	ismap: "isMap",
	nomodule: "noModule",
	playsinline: "playsInline",
	readonly: "readOnly",
	defaultvalue: "defaultValue",
	defaultchecked: "defaultChecked",
	srcobject: "srcObject",
	novalidate: "noValidate",
	allowfullscreen: "allowFullscreen",
	disablepictureinpicture: "disablePictureInPicture",
	disableremoteplayback: "disableRemotePlayback"
};
function Mr(e) {
	return e = e.toLowerCase(), jr[e] ?? e;
}
[...Ar];
var Nr = ["touchstart", "touchmove"];
function Pr(e) {
	return Nr.includes(e);
}
// ../vibebook/node_modules/svelte/src/internal/client/dom/elements/events.js
var Fr = Symbol("events"), Ir = /* @__PURE__ */ new Set(), Lr = /* @__PURE__ */ new Set();
function Rr(e) {
	if (!k) return;
	e.removeAttribute("onload"), e.removeAttribute("onerror");
	let t = e.__e;
	t !== void 0 && (e.__e = void 0, queueMicrotask(() => {
		e.isConnected && e.dispatchEvent(t);
	}));
}
function zr(e, t, n, r = {}) {
	function i(e) {
		if (r.capture || Kr.call(t, e), !e.cancelBubble) return dt(() => n?.call(this, e));
	}
	return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? (i.__removed = !1, nt(() => {
		i.__removed || t.addEventListener(e, i, r);
	})) : t.addEventListener(e, i, r), i;
}
function Br(e, t, n, r = {}) {
	var i = zr(t, e, n, r);
	return () => {
		i.__removed = !0, e.removeEventListener(t, i, r);
	};
}
function Vr(e, t, n, r, i) {
	var a = {
		capture: r,
		passive: i
	}, o = zr(e, t, n, a);
	(t === document.body || t === window || t === document || t instanceof HTMLMediaElement) && En(() => {
		o.__removed = !0, t.removeEventListener(e, o, a);
	});
}
function Hr(e, t, n) {
	(t[Fr] ??= {})[e] = n;
}
function Ur(e) {
	for (var t = 0; t < e.length; t++) Ir.add(e[t]);
	for (var n of Lr) n(e);
}
var Wr = null, Gr = !1;
function Kr(e) {
	var t = this, n = t.ownerDocument, r = e.type, a = e.composedPath?.() || [], o = a[0] || e.target;
	Wr = e, Gr || (Gr = !0, setTimeout(() => {
		Gr = !1, Wr = null;
	}));
	var s = 0, c = Wr === e && e[Fr];
	if (c) {
		var l = a.indexOf(c);
		if (l !== -1 && (t === document || t === window)) {
			e[Fr] = t;
			return;
		}
		var u = a.indexOf(t);
		if (u === -1) return;
		l <= u && (s = l);
	}
	if (o = a[s] || e.target, o !== t) {
		i(e, "currentTarget", {
			configurable: !0,
			get() {
				return o || n;
			}
		});
		var d = V, f = H;
		er(null), tr(null);
		try {
			for (var p, m = []; o !== null && o !== t;) {
				try {
					var h = o[Fr]?.[r];
					h == null || o.disabled && e.target !== o || h.call(o, e);
				} catch (e) {
					p ? m.push(e) : p = e;
				}
				if (e.cancelBubble) break;
				s++, o = s < a.length ? a[s] : null;
			}
			if (p) {
				for (let e of m) queueMicrotask(() => {
					throw e;
				});
				throw p;
			}
		} finally {
			e[Fr] = t, delete e.currentTarget, er(d), tr(f);
		}
	}
}
// ../vibebook/node_modules/svelte/src/internal/client/dom/reconciler.js
var qr = globalThis?.window?.trustedTypes && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", { createHTML: (e) => e });
function Jr(e) {
	return qr?.createHTML(e) ?? e;
}
function Yr(e) {
	var t = vn("template");
	return t.innerHTML = Jr(e.replaceAll("<!>", "<!---->")), t.content;
}
// ../vibebook/node_modules/svelte/src/internal/client/dom/template.js
function Xr(e, t) {
	var n = H;
	n.nodes === null && (n.nodes = {
		start: e,
		end: t,
		a: null,
		t: null
	});
}
/*#__NO_SIDE_EFFECTS__*/
function W(e, t) {
	var n = !!(t & 1), r = !!(t & 2), i, a = !e.startsWith("<!>");
	return () => {
		if (k) return Xr(A, null), A;
		i === void 0 && (i = Yr(a ? e : "<!>" + e), n || (i = /* @__PURE__ */ fn(i)));
		var t = r || sn ? document.importNode(i, !0) : i.cloneNode(!0);
		if (n) {
			var o = /* @__PURE__ */ fn(t), s = t.lastChild;
			Xr(o, s);
		} else Xr(t, t);
		return t;
	};
}
/*#__NO_SIDE_EFFECTS__*/
function Zr(e, t, n = "svg") {
	var r = !e.startsWith("<!>"), i = !!(t & 1), a = `<${n}>${r ? e : "<!>" + e}</${n}>`, o;
	return () => {
		if (k) return Xr(A, null), A;
		if (!o) {
			var e = /* @__PURE__ */ fn(Yr(a));
			if (i) for (o = document.createDocumentFragment(); /* @__PURE__ */ fn(e);) o.appendChild(/* @__PURE__ */ fn(e));
			else o = /* @__PURE__ */ fn(e);
		}
		var t = o.cloneNode(!0);
		if (i) {
			var n = /* @__PURE__ */ fn(t), r = t.lastChild;
			Xr(n, r);
		} else Xr(t, t);
		return t;
	};
}
/*#__NO_SIDE_EFFECTS__*/
function Qr(e, t) {
	return /* @__PURE__ */ Zr(e, t, "svg");
}
function $r(e = "") {
	if (!k) {
		var t = dn(e + "");
		return Xr(t, t), t;
	}
	var n = A;
	return n.nodeType === 3 ? yn(n) : (n.before(n = dn()), we(n)), Xr(n, n), n;
}
function G() {
	if (k) return Xr(A, null), A;
	var e = document.createDocumentFragment(), t = document.createComment(""), n = dn();
	return e.append(t, n), Xr(t, n), e;
}
function K(e, t) {
	if (k) {
		var n = H;
		n.f & 32768 && n.nodes.end !== null || (n.nodes.end = A), Te();
	} else e !== null && e.before(t);
}
function ei() {
	if (k && A && A.nodeType === 8 && A.textContent?.startsWith("$")) {
		let e = A.textContent.substring(1);
		return Te(), e;
	}
	return (window.__svelte ??= {}).uid ??= 1, `c${window.__svelte.uid++}`;
}
// ../vibebook/node_modules/svelte/src/reactivity/create-subscriber.js
function ti(e) {
	let t = 0, n = qt(0), r;
	return () => {
		Tn() && (U(n), Pn(() => (t === 0 && (r = Cr(() => e(() => en(n)))), t += 1, () => {
			nt(() => {
				--t, t === 0 && (r?.(), r = void 0, en(n));
			});
		})));
	};
}
// ../vibebook/node_modules/svelte/src/internal/client/dom/blocks/boundary.js
var ni = C | w;
function ri(e, t, n, r) {
	new ii(e, t, n, r);
}
var ii = class {
	parent;
	is_pending = !1;
	transform_error;
	#e;
	#t = k ? A : null;
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
	#m = ti(() => (this.#p = qt(this.#l), () => {
		this.#p = null;
	}));
	constructor(e, t, n, r) {
		this.#e = e, this.#n = t, this.#r = (e) => {
			var t = H;
			t.b = this, t.f |= 128, n(e);
		}, this.parent = H.b, this.transform_error = r ?? this.parent?.transform_error ?? ((e) => e), this.#i = In(() => {
			if (k) {
				let e = Oe(this.#t);
				Te();
				let t = e === "[!";
				if (e.startsWith("[?")) {
					let t = JSON.parse(e.slice(2));
					this.#g(t);
				} else t ? this.#y() : this.#h();
			} else this.#b();
		}, ni), k && (this.#e = A);
	}
	#h() {
		try {
			this.#a = Rn(() => this.#r(this.#e));
		} catch (e) {
			this.error(e);
		}
	}
	#g(e) {
		let t = this.#n.failed, { reset: n, invoke_onerror: r } = this.#_(e);
		nt(r), t && (this.#s = Rn(() => {
			t(this.#e, () => e, () => n);
		}));
	}
	#_(e) {
		var t = !1, n = !1;
		let r = () => {
			this.#v() || (t ? Se() : (t = !0, n && Ue(), this.#s !== null && Gn(this.#s, () => {
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
					xn(e, this.#i && this.#i.parent);
				}
			}
		};
	}
	#v() {
		return (this.#i.f & (x | ee)) !== 0;
	}
	#y() {
		let e = this.#n.pending;
		e && (this.is_pending = !0, this.#o = Rn(() => e(this.#e)), nt(() => {
			if (!this.#v()) {
				var e = this.#c = document.createDocumentFragment(), t = dn(), n = !1;
				e.append(t), this.#a = this.#S(() => {
					try {
						return Rn(() => this.#r(t));
					} catch (e) {
						try {
							this.error(e), n = !0;
						} catch (e) {
							xn(e, this.#i.parent);
						}
						return null;
					}
				}), this.#a === null ? (this.#c = null, n && this.#x(I)) : this.#u === 0 && (this.#e.before(e), this.#c = null, Gn(this.#o, () => {
					this.#o = null;
				}), this.#x(I));
			}
		}));
	}
	#b() {
		try {
			if (this.is_pending = this.has_pending_snippet(), this.#u = 0, this.#l = 0, this.#a = Rn(() => {
				this.#r(this.#e);
			}), this.#u > 0) {
				var e = this.#c = document.createDocumentFragment();
				Yn(this.#a, e);
				let t = this.#n.pending;
				this.#o = Rn(() => t(this.#e));
			} else this.#x(I);
		} catch (e) {
			this.error(e);
		}
	}
	#x(e) {
		this.is_pending = !1, e.transfer_reactions(this.#f);
	}
	defer_effect(e) {
		ot(e, this.#f);
	}
	is_rendered() {
		return !this.is_pending && (!this.parent || this.parent.is_rendered());
	}
	has_pending_snippet() {
		return !!this.#n.pending;
	}
	#S(e) {
		var t = H, n = V, r = Ke;
		tr(this.#i), er(this.#i), qe(this.#i.ctx);
		try {
			return It.ensure(), e();
		} finally {
			tr(t), er(n), qe(r);
		}
	}
	#C(e, t) {
		this.has_pending_snippet() ? (this.#u += e, this.#u === 0 && (this.#x(t), this.#o && Gn(this.#o, () => {
			this.#o = null;
		}), this.#c &&= (this.#e.before(this.#c), null))) : this.parent && this.parent.#C(e, t);
	}
	update_pending_count(e, t) {
		this.#C(e, t), this.#l += e, !this.#p || this.#d || (this.#d = !0, nt(() => {
			this.#d = !1, this.#p && Zt(this.#p, this.#l);
		}));
	}
	get_effect_pending() {
		return this.#m(), U(this.#p);
	}
	error(e) {
		if (e === E || !this.#n.onerror && !this.#n.failed) throw e;
		I?.is_fork ? (this.#a && I.skip_effect(this.#a), this.#o && I.skip_effect(this.#o), this.#s && I.skip_effect(this.#s), I.oncommit(() => {
			this.#v() || this.#w(e);
		})) : this.#w(e);
	}
	#w(e) {
		this.#a &&= (Hn(this.#a), null), this.#o &&= (Hn(this.#o), null), this.#s &&= (Hn(this.#s), null), k && (we(this.#t), Ee(), we(De()));
		let t = this.#n.failed, n = (e) => {
			if (this.#v()) return;
			let { reset: n, invoke_onerror: r } = this.#_(e);
			r(), t && !this.#v() && (this.#s = this.#S(() => {
				try {
					return Rn(() => {
						var r = H;
						r.b = this, r.f |= 128, t(this.#e, () => e, () => n);
					});
				} catch (e) {
					return xn(e, this.#i.parent), null;
				}
			}));
		};
		nt(() => {
			if (!this.#v()) {
				var t;
				try {
					t = this.transform_error(e);
				} catch (e) {
					xn(e, this.#i && this.#i.parent);
					return;
				}
				typeof t == "object" && t && typeof t.then == "function" ? t.then(n, (e) => xn(e, this.#i && this.#i.parent)) : n(t);
			}
		});
	}
};
function ai(e, t) {
	var n = t == null ? "" : typeof t == "object" ? `${t}` : t;
	n !== (e[fe] ??= e.nodeValue) && (e[fe] = n, e.nodeValue = `${n}`);
}
function oi(e, t) {
	return ci(e, t);
}
var si = /* @__PURE__ */ new Map();
function ci(e, { target: t, anchor: n, props: i = {}, events: a, context: o, intro: s = !0, transformError: c }) {
	un();
	var l = void 0, u = jn(() => {
		var s = n ?? t.appendChild(dn());
		ri(s, { pending: () => {} }, (t) => {
			M({});
			var n = Ke;
			if (o && (n.c = o), a && (i.$$events = a), k && Xr(t, null), l = e(t, i) || Qe(), k && (H.nodes.end = A, A === null || A.nodeType !== 8 || A.data !== "]")) throw be(), E;
			N();
		}, c);
		var u = /* @__PURE__ */ new Set(), d = (e) => {
			for (var n = 0; n < e.length; n++) {
				var r = e[n];
				if (!u.has(r)) {
					u.add(r);
					var i = Pr(r);
					for (let e of [t, document]) {
						var a = si.get(e);
						a === void 0 && (a = /* @__PURE__ */ new Map(), si.set(e, a));
						var o = a.get(r);
						o === void 0 ? (e.addEventListener(r, Kr, { passive: i }), a.set(r, 1)) : a.set(r, o + 1);
					}
				}
			}
		};
		return d(r(Ir)), Lr.add(d), () => {
			for (var e of u) for (let n of [t, document]) {
				var r = si.get(n), i = r.get(e);
				--i == 0 ? (n.removeEventListener(e, Kr), r.delete(e), r.size === 0 && si.delete(n)) : r.set(e, i);
			}
			Lr.delete(d), s !== n && s.parentNode?.removeChild(s);
		};
	});
	return li.set(l, u), l;
}
var li = /* @__PURE__ */ new WeakMap();
function ui(e, t) {
	let n = li.get(e);
	return n ? (li.delete(e), n(t)) : Promise.resolve();
}
// ../vibebook/node_modules/svelte/src/internal/client/dom/blocks/branches.js
var di = class {
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
			if (n) qn(n), this.#r.delete(t);
			else {
				var r = this.#n.get(t);
				r && (qn(r.effect), this.#t.set(t, r.effect), this.#n.delete(t), r.fragment.lastChild.remove(), this.anchor.before(r.fragment), n = r.effect);
			}
			for (let [t, n] of this.#e) {
				if (this.#e.delete(t), t === e) break;
				let r = this.#n.get(n);
				r && (Hn(r.effect), this.#n.delete(n));
			}
			for (let [e, r] of this.#t) {
				if (e === t || this.#r.has(e)) continue;
				let i = () => {
					if (Array.from(this.#e.values()).includes(e)) {
						var t = document.createDocumentFragment();
						Yn(r, t), t.append(dn()), this.#n.set(e, {
							effect: r,
							fragment: t
						});
					} else Hn(r);
					this.#r.delete(e), this.#t.delete(e);
				};
				this.#i || !n ? (this.#r.add(e), Gn(r, i, !1)) : i();
			}
		}
	};
	#o = (e) => {
		this.#e.delete(e);
		let t = Array.from(this.#e.values());
		for (let [e, n] of this.#n) t.includes(e) || (Hn(n.effect), this.#n.delete(e));
	};
	ensure(e, t) {
		var n = I, r = _n();
		if (t && !this.#t.has(e) && !this.#n.has(e)) {
			if (r) {
				var i = document.createDocumentFragment(), a = dn();
				i.append(a), this.#n.set(e, {
					effect: Rn(() => t(a)),
					fragment: i
				});
			} else this.#t.set(e, Rn(() => t(this.anchor)));
		}
		if (this.#e.set(n, e), r) {
			for (let [t, r] of this.#t) t === e ? n.unskip_effect(r) : n.skip_effect(r);
			for (let [t, r] of this.#n) t === e ? n.unskip_effect(r.effect) : n.skip_effect(r.effect);
			n.oncommit(this.#a), n.ondiscard(this.#o);
		} else k && (this.anchor = A), this.#a(n);
	}
};
// ../vibebook/node_modules/svelte/src/internal/client/dom/blocks/if.js
function q(e, t, n = !1) {
	var r;
	k && (r = A, Te());
	var i = new di(e), a = n ? C : 0;
	function o(e, t) {
		if (k) {
			var n = Oe(r);
			if (e !== parseInt(n.substring(1))) {
				var a = De();
				we(a), i.anchor = a, Ce(!1), i.ensure(e, t), Ce(!0);
				return;
			}
		}
		i.ensure(e, t);
	}
	In(() => {
		var e = !1;
		t((t, n = 0) => {
			e = !0, o(n, t);
		}), e || o(-1, null);
	}, a);
}
// ../vibebook/node_modules/svelte/src/internal/client/dom/blocks/key.js
var fi = Symbol("NaN");
function pi(e, t, n) {
	k && Te();
	var r = new di(e), i = !$e();
	In(() => {
		var e = t();
		e !== e && (e = fi), i && typeof e == "object" && e && (e = {}), r.ensure(e, n);
	});
}
// ../vibebook/node_modules/svelte/src/internal/client/dom/blocks/each.js
function mi(e, t) {
	return t;
}
function hi(e, t, n) {
	for (var i = [], a = t.length, o, s = t.length, c = 0; c < a; c++) {
		let n = t[c];
		Gn(n, () => {
			if (o) {
				if (o.pending.delete(n), o.done.add(n), o.pending.size === 0) {
					var t = e.outrogroups;
					gi(e, r(o.done)), t.delete(o), t.size === 0 && (e.outrogroups = null);
				}
			} else --s;
		}, !1);
	}
	if (s === 0) {
		var l = i.length === 0 && n !== null && e.pending.size === 0;
		if (l) {
			var u = n, d = u.parentNode;
			gn(d), d.append(u), e.items.clear();
		}
		gi(e, t, !l);
	} else o = {
		pending: new Set(t),
		done: /* @__PURE__ */ new Set()
	}, (e.outrogroups ??= /* @__PURE__ */ new Set()).add(o);
}
function gi(e, t, n = !0) {
	var r;
	if (e.pending.size > 0) {
		r = /* @__PURE__ */ new Set();
		for (let t of e.pending.values()) for (let n of t) r.add(e.items.get(n).e);
	}
	for (var i = 0; i < t.length; i++) {
		var a = t[i];
		r?.has(a) ? (a.f |= ne, Yn(a, document.createDocumentFragment())) : Hn(t[i], n);
	}
}
var _i;
function vi(t, n, i, a, o, s = null) {
	var c = t, l = /* @__PURE__ */ new Map();
	if (n & 4) {
		var u = t;
		c = k ? we(/* @__PURE__ */ fn(u)) : u.appendChild(dn());
	}
	k && Te();
	var d = null, f = /* @__PURE__ */ bt(() => {
		var t = i();
		return e(t) ? t : t == null ? [] : r(t);
	}), p = /* @__PURE__ */ new Map(), m = !0;
	function h(e) {
		if (!(_.effect.f & 16384)) {
			_.pending.delete(e);
			var t = U(f);
			_.fallback = d, bi(_, t, c, n, a), d !== null && (t.length === 0 ? d.f & 33554432 ? (d.f ^= ne, Si(d, null, c)) : qn(d) : Gn(d, () => {
				d = null;
			}));
		}
	}
	function g(e) {
		_.pending.delete(e);
	}
	var _ = {
		effect: In(() => {
			var e = U(f), t = e.length;
			let r = !1;
			k && Oe(c) === "[!" != (t === 0) && (c = De(), we(c), Ce(!1), r = !0);
			for (var u = /* @__PURE__ */ new Set(), _ = I, v = _n(), y = 0; y < t; y += 1) {
				k && A.nodeType === 8 && A.data === "]" && (c = A, r = !0, Ce(!1));
				var b = e[y], x = a(b, y), S = m ? null : l.get(x);
				S ? (S.v && Zt(S.v, b), S.i && Zt(S.i, y), v && _.unskip_effect(S.e)) : (S = xi(l, m ? c : _i ??= dn(), b, x, y, o, n, i), m || (S.e.f |= ne), l.set(x, S)), u.add(x);
			}
			if (t === 0 && s && !d && (m ? d = Rn(() => s(c)) : (d = Rn(() => s(_i ??= dn())), d.f |= ne)), t > u.size && Pe("", "", ""), k && t > 0 && we(De()), !m) {
				if (p.set(_, u), v) {
					for (let [e, t] of l) u.has(e) || _.skip_effect(t.e);
					_.oncommit(h), _.ondiscard(g);
				} else h(_);
			}
			r && Ce(!0), U(f);
		}),
		flags: n,
		items: l,
		pending: p,
		outrogroups: null,
		fallback: d
	};
	m = !1, k && (c = A);
}
function yi(e) {
	for (; e !== null && !(e.f & 32);) e = e.next;
	return e;
}
function bi(e, t, n, i, a) {
	var o = !!(i & 8), s = t.length, c = e.items, l = yi(e.effect.first), u, d = null, f, p = [], m = [], h, g, _, v;
	if (o) for (v = 0; v < s; v += 1) h = t[v], g = a(h, v), _ = c.get(g).e, _.f & 33554432 || (_.nodes?.a?.measure(), (f ??= /* @__PURE__ */ new Set()).add(_));
	for (v = 0; v < s; v += 1) {
		if (h = t[v], g = a(h, v), _ = c.get(g).e, e.outrogroups !== null) for (let t of e.outrogroups) t.pending.delete(_), t.done.delete(_);
		if (_.f & 8192 && (qn(_), o && (_.nodes?.a?.unfix(), (f ??= /* @__PURE__ */ new Set()).delete(_))), _.f & 33554432) {
			if (_.f ^= ne, _ === l) Si(_, null, n);
			else {
				var y = d ? d.next : l;
				_ === e.effect.last && (e.effect.last = _.prev), _.prev && (_.prev.next = _.next), _.next && (_.next.prev = _.prev), Ci(e, d, _), Ci(e, _, y), Si(_, y, n), d = _, p = [], m = [], l = yi(d.next);
				continue;
			}
		}
		if (_ !== l) {
			if (u !== void 0 && u.has(_)) {
				if (p.length < m.length) {
					var b = m[0], x;
					d = b.prev;
					var S = p[0], ee = p[p.length - 1];
					for (x = 0; x < p.length; x += 1) Si(p[x], b, n);
					for (x = 0; x < m.length; x += 1) u.delete(m[x]);
					Ci(e, S.prev, ee.next), Ci(e, d, S), Ci(e, ee, b), l = b, d = ee, --v, p = [], m = [];
				} else u.delete(_), Si(_, l, n), Ci(e, _.prev, _.next), Ci(e, _, d === null ? e.effect.first : d.next), Ci(e, d, _), d = _;
				continue;
			}
			for (p = [], m = []; l !== null && l !== _;) (u ??= /* @__PURE__ */ new Set()).add(l), m.push(l), l = yi(l.next);
			if (l === null) continue;
		}
		_.f & 33554432 || p.push(_), d = _, l = yi(_.next);
	}
	if (e.outrogroups !== null) {
		for (let t of e.outrogroups) t.pending.size === 0 && (gi(e, r(t.done)), e.outrogroups?.delete(t));
		e.outrogroups.size === 0 && (e.outrogroups = null);
	}
	if (l !== null || u !== void 0) {
		var C = [];
		if (u !== void 0) for (_ of u) _.f & 8192 || C.push(_);
		for (; l !== null;) !(l.f & 8192) && l !== e.fallback && C.push(l), l = yi(l.next);
		var w = C.length;
		if (w > 0) {
			var te = i & 4 && s === 0 ? n : null;
			if (o) {
				for (v = 0; v < w; v += 1) C[v].nodes?.a?.measure();
				for (v = 0; v < w; v += 1) C[v].nodes?.a?.fix();
			}
			hi(e, C, te);
		}
	}
	o && nt(() => {
		if (f !== void 0) for (_ of f) _.nodes?.a?.apply();
	});
}
function xi(e, t, n, r, i, a, o, s) {
	var c = o & 1 ? o & 16 ? qt(n) : /* @__PURE__ */ Jt(n, !1, !1) : null, l = o & 2 ? qt(i) : null;
	return {
		v: c,
		i: l,
		e: Rn(() => (a(t, c ?? n, l ?? i, s), () => {
			e.delete(r);
		}))
	};
}
function Si(e, t, n) {
	if (e.nodes) for (var r = e.nodes.start, i = e.nodes.end, a = t && !(t.f & 33554432) ? t.nodes.start : n; r !== null;) {
		var o = /* @__PURE__ */ pn(r);
		if (a.before(r), r === i) return;
		r = o;
	}
}
function Ci(e, t, n) {
	t === null ? e.effect.first = n : t.next = n, n === null ? e.effect.last = t : n.prev = t;
}
function wi(e, t, n = !1, r = !1, i = !1, a = !1) {
	var o = e, s = "";
	if (n) {
		var c = e;
		k && (o = we(/* @__PURE__ */ fn(c)));
	}
	Fn(() => {
		var e = H;
		if (s === (s = t() ?? "")) k && Te();
		else if (n && !k) e.nodes = null, c.innerHTML = s, s !== "" && Xr(/* @__PURE__ */ fn(c), c.lastChild);
		else if (e.nodes !== null && (Un(e.nodes.start, e.nodes.end), e.nodes = null), s !== "") {
			if (k) {
				for (var a = A.data, l = Te(), u = l; l !== null && (l.nodeType !== 8 || l.data !== "");) u = l, l = /* @__PURE__ */ pn(l);
				if (l === null) throw be(), E;
				Xr(A, u), o = we(l);
			} else {
				var d = vn(r ? "svg" : i ? "math" : "template", r ? O : i ? _e : void 0);
				d.innerHTML = s;
				var f = r || i ? d : d.content;
				if (Xr(/* @__PURE__ */ fn(f), f.lastChild), r || i) for (; /* @__PURE__ */ fn(f);) o.before(/* @__PURE__ */ fn(f));
				else o.before(f);
			}
		}
	});
}
// ../vibebook/node_modules/svelte/src/internal/client/dom/blocks/snippet.js
function J(e, t, ...n) {
	var r = new di(e);
	In(() => {
		let e = t() ?? null;
		r.ensure(e, e && ((t) => e(t, ...n)));
	}, C);
}
// ../vibebook/node_modules/svelte/src/internal/client/dom/blocks/svelte-component.js
function Ti(e, t, n) {
	var r;
	k && (r = A, Te());
	var i = new di(e);
	In(() => {
		var e = t() ?? null;
		if (k && Oe(r) === "[" != (e !== null)) {
			var a = De();
			we(a), i.anchor = a, Ce(!1), i.ensure(e, e && ((t) => n(t, e))), Ce(!0);
		} else i.ensure(e, e && ((t) => n(t, e)));
	}, C);
}
// ../vibebook/node_modules/svelte/src/internal/client/dom/elements/actions.js
function Ei(e, t, n) {
	Mn(() => {
		var r = Cr(() => t(e, n?.()) || {});
		if (n && r?.update) {
			var i = !1, a = {};
			Pn(() => {
				var e = n();
				wr(e), i && Ae(a, e) && (a = e, r.update(e));
			}), i = !0;
		}
		if (r?.destroy) return () => r.destroy();
	});
}
// ../vibebook/node_modules/svelte/src/internal/client/dom/elements/attachments.js
function Di(e, t) {
	var n = void 0, r;
	Ln(() => {
		n !== (n = t()) && (r &&= (Hn(r), null), n && (r = Rn(() => {
			Mn(() => n(e));
		})));
	});
}
// ../vibebook/node_modules/clsx/dist/clsx.mjs
function Oi(e) {
	var t, n, r = "";
	if (typeof e == "string" || typeof e == "number") r += e;
	else if (typeof e == "object") {
		if (Array.isArray(e)) {
			var i = e.length;
			for (t = 0; t < i; t++) e[t] && (n = Oi(e[t])) && (r && (r += " "), r += n);
		} else for (n in e) e[n] && (r && (r += " "), r += n);
	}
	return r;
}
function ki() {
	for (var e, t, n = 0, r = "", i = arguments.length; n < i; n++) (e = arguments[n]) && (t = Oi(e)) && (r && (r += " "), r += t);
	return r;
}
// ../vibebook/node_modules/svelte/src/internal/shared/attributes.js
function Ai(e) {
	return typeof e == "object" ? ki(e) : e ?? "";
}
var ji = [..." 	\n\r\f\xA0\v﻿"];
function Mi(e, t, n) {
	var r = e == null ? "" : "" + e;
	if (t && (r = r ? r + " " + t : t), n) {
		for (var i of Object.keys(n)) if (n[i]) r = r ? r + " " + i : i;
		else if (r.length) for (var a = i.length, o = 0; (o = r.indexOf(i, o)) >= 0;) {
			var s = o + a;
			(o === 0 || ji.includes(r[o - 1])) && (s === r.length || ji.includes(r[s])) ? r = (o === 0 ? "" : r.substring(0, o)) + r.substring(s + 1) : o = s;
		}
	}
	return r === "" ? null : r;
}
function Ni(e, t = !1) {
	var n = t ? " !important;" : ";", r = "";
	for (var i of Object.keys(e)) {
		var a = e[i];
		a != null && a !== "" && (r += " " + i + ": " + a + n);
	}
	return r;
}
function Pi(e) {
	return e[0] !== "-" || e[1] !== "-" ? e.toLowerCase() : e;
}
function Fi(e, t) {
	if (t) {
		var n = "", r, i;
		if (Array.isArray(t) ? (r = t[0], i = t[1]) : r = t, e) {
			e = String(e).replaceAll(/\/\*.*?\*\//g, "").trim();
			var a = !1, o = 0, s = !1, c = [];
			r && c.push(...Object.keys(r).map(Pi)), i && c.push(...Object.keys(i).map(Pi));
			var l = 0, u = -1;
			let t = e.length;
			for (var d = 0; d < t; d++) {
				var f = e[d];
				if (s ? f === "/" && e[d - 1] === "*" && (s = !1) : a ? a === f && (a = !1) : f === "/" && e[d + 1] === "*" ? s = !0 : f === "\"" || f === "'" ? a = f : f === "(" ? o++ : f === ")" && o--, !s && a === !1 && o === 0) {
					if (f === ":" && u === -1) u = d;
					else if (f === ";" || d === t - 1) {
						if (u !== -1) {
							var p = Pi(e.substring(l, u).trim());
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
		return r && (n += Ni(r)), i && (n += Ni(i, !0)), n = n.trim(), n === "" ? null : n;
	}
	return e == null ? null : String(e);
}
// ../vibebook/node_modules/svelte/src/internal/client/dom/elements/class.js
function Ii(e, t, n, r, i, a) {
	var o = e[T];
	if (k || o !== n || o === void 0) {
		var s = Mi(n, r, a);
		k && s === e.getAttribute("class") || (s == null ? e.removeAttribute("class") : t ? e.className = s : e.setAttribute("class", s)), e[T] = n;
	} else if (a && i !== a) for (var c in a) {
		var l = !!a[c];
		(i == null || l !== !!i[c]) && e.classList.toggle(c, l);
	}
	return a;
}
// ../vibebook/node_modules/svelte/src/internal/client/dom/elements/style.js
function Li(e, t = {}, n, r) {
	for (var i in n) {
		var a = n[i];
		t[i] !== a && (n[i] == null ? e.style.removeProperty(i) : e.style.setProperty(i, a, r));
	}
}
function Ri(e, t, n, r) {
	var i = e[de];
	if (k || i !== t) {
		var a = Fi(t, r);
		k && a === e.getAttribute("style") || (a == null ? e.removeAttribute("style") : e.style.cssText = a), e[de] = t;
	} else r && (Array.isArray(r) ? (Li(e, n?.[0], r[0]), Li(e, n?.[1], r[1], "important")) : Li(e, n, r));
	return r;
}
// ../vibebook/node_modules/svelte/src/internal/client/dom/elements/bindings/select.js
function zi(e, t) {
	t ? e.hasAttribute("selected") || e.setAttribute("selected", "") : e.removeAttribute("selected");
}
function Bi(e, t) {
	var n = !("__defaultValue" in e);
	(n || e.__defaultValue !== t) && (e.__defaultValue = t, Vi(e, !n || "__value" in e));
}
function Vi(t, n) {
	var r = t.__defaultValue, i = t.multiple, a = i ? r ?? [] : null;
	if (!i || e(a)) {
		var o = t.selectedIndex, s = n && i ? new Set(t.selectedOptions) : null;
		for (var c of t.options) {
			var l = Wi(c);
			zi(c, i ? a.includes(l) : an(l, r));
		}
		if (n) {
			if (s !== null) for (c of t.options) {
				var u = s.has(c);
				c.selected !== u && (c.selected = u);
			}
			else t.selectedIndex !== o && (t.selectedIndex = o);
		}
	}
}
function Hi(t, n, r = !1) {
	if (t.multiple) {
		if (n == null) return;
		if (!e(n)) return xe();
		for (var i of t.options) i.selected = n.includes(Wi(i));
	} else {
		for (i of t.options) if (an(Wi(i), n)) {
			i.selected = !0;
			return;
		}
		r && n === void 0 || (t.selectedIndex = -1);
	}
}
function Ui(e) {
	var t = new MutationObserver((t) => {
		t.every(Gi) || ("__defaultValue" in e && Vi(e, !1), "__value" in e && Hi(e, e.__value));
	});
	t.observe(e, {
		childList: !0,
		subtree: !0,
		attributes: !0,
		attributeFilter: ["value"]
	}), En(() => {
		t.disconnect();
	});
}
function Wi(e) {
	return "__value" in e ? e.__value : e.value;
}
function Gi(e) {
	if (e.target.closest("selectedcontent") !== null) return !0;
	if (e.type === "childList") {
		var t = [...e.addedNodes, ...e.removedNodes];
		return t.length > 0 && t.every((e) => e.nodeName === "SELECTEDCONTENT");
	}
	return !1;
}
// ../vibebook/node_modules/svelte/src/internal/client/dom/elements/attributes.js
var Ki = Symbol("class"), qi = Symbol("style"), Ji = Symbol("is custom element"), Yi = Symbol("is html"), Xi = he ? "link" : "LINK", Zi = he ? "input" : "INPUT", Qi = he ? "option" : "OPTION", $i = he ? "select" : "SELECT", ea = he ? "progress" : "PROGRESS";
function ta(e) {
	if (k) {
		var t = !1, n = () => {
			if (!t) {
				if (t = !0, e.hasAttribute("value")) {
					var n = e.value;
					ra(e, "value", null), e.value = n;
				}
				if (e.hasAttribute("checked")) {
					var r = e.checked;
					ra(e, "checked", null), e.checked = r;
				}
			}
		};
		e[pe] = n, nt(n), ut();
	}
}
function na(e, t) {
	var n = oa(e);
	n.checked !== (n.checked = t ?? void 0) && (e.checked = t);
}
function ra(e, t, n, r) {
	var i = oa(e);
	if (!(k && (i[t] = e.getAttribute(t), t === "src" || t === "srcset" || t === "href" && e.nodeName === Xi))) {
		var a = i[t];
		a !== (i[t] = n) && (t === "loading" && (e[le] = n), n == null ? e.removeAttribute(t) : typeof n != "string" && ca(e).has(t) ? e[t] = n : (!k || typeof n != "number" && typeof n != "boolean" || a !== String(n)) && e.setAttribute(t, n));
	}
}
function ia(e, t, n, r, i = !1, a = !1) {
	k && i && e.nodeName === Zi && ("defaultValue" in n || "defaultChecked" in n || ta(e));
	var o = oa(e), s = o[Ji], c = !o[Yi];
	let l = k && s;
	l && Ce(!1);
	var u = t || {}, d = e.nodeName === Qi, f = e.nodeName === $i;
	try {
		for (var p in t) !(p in n) && p[0] + p[1] !== "$$" && (n[p] = null);
		n.class ? n.class = Ai(n.class) : (r || n[Ki]) && (n.class = null), n[qi] && (n.style ??= null);
		var m = ca(e);
		if (e.nodeName === Zi && "type" in n && ("value" in n || "__value" in n)) {
			var h = n.type;
			(h !== u.type || h === void 0 && e.hasAttribute("type")) && (u.type = h, ra(e, "type", h, a));
		}
		for (let i in n) {
			let l = n[i];
			if (d && i === "value" && l == null) e.value = e.__value = "", u[i] = l;
			else if (i === "class") Ii(e, e.namespaceURI === "http://www.w3.org/1999/xhtml", l, r, t?.[Ki], n[Ki]), u[i] = l, u[Ki] = n[Ki];
			else if (i === "style") Ri(e, l, t?.[qi], n[qi]), u[i] = l, u[qi] = n[qi];
			else {
				var g = u[i];
				if (l !== g || l === void 0 && e.hasAttribute(i)) {
					u[i] = l;
					var _ = i[0] + i[1];
					if (_ !== "$$") {
						if (_ === "on") {
							let t = {}, n = "$$" + i, r = i.slice(2);
							var v = kr(r);
							if (Dr(r) && (r = r.slice(0, -7), t.capture = !0), !v && g) {
								if (l != null) continue;
								e.removeEventListener(r, u[n], t), u[n] = null;
							}
							if (v) Hr(r, e, l), Ur([r]);
							else if (l != null) {
								function a(e) {
									u[i].call(this, e);
								}
								u[n] = zr(r, e, a, t);
							}
						} else if (i === "style") ra(e, i, l);
						else if (i === "autofocus") st(e, !!l);
						else if (!s && (i === "__value" || i === "value" && l != null)) e.__value = l, (g == null || e.value !== l || l === 0 && e.nodeName === ea) && (e.value = l);
						else if (i === "selected" && d) zi(e, l);
						else {
							var y = i;
							c || (y = Mr(y));
							var b = y === "defaultValue" || y === "defaultChecked";
							if (f && y === "defaultValue") continue;
							if (l == null && !s && !b) {
								if (o[i] = null, y === "value" || y === "checked") {
									let n = e, r = t === void 0;
									if (y === "value") {
										let e = n.defaultValue;
										n.removeAttribute(y), n.defaultValue = e, n.value = n.__value = r ? e : null;
									} else {
										let e = n.defaultChecked;
										n.removeAttribute(y), n.defaultChecked = e, n.checked = r ? e : !1;
									}
								} else e.removeAttribute(i);
							} else b || (s || typeof l != "string") && m.has(y) ? (e[y] = l, y in o && (o[y] = D)) : typeof l != "function" && ra(e, y, l, a);
						}
					}
				}
			}
		}
	} finally {
		l && Ce(!0);
	}
	return u;
}
function aa(e, t, n = [], r = [], i = [], a, o = !1, s = !1) {
	pt(i, n, r, (n) => {
		var r = void 0, i = {}, c = e.nodeName === $i, l = !1;
		if (Ln(() => {
			var u = t(...n.map(U)), d = ia(e, r, u, a, o, s);
			if (l && c) {
				var f = e;
				"defaultValue" in u && Bi(f, u.defaultValue), "value" in u && Hi(f, u.value);
			}
			for (let e of Object.getOwnPropertySymbols(i)) u[e] || Hn(i[e]);
			for (let t of Object.getOwnPropertySymbols(u)) {
				var p = u[t];
				t.description !== "@attach" || r && p === r[t] || (i[t] && Hn(i[t]), i[t] = Rn(() => Di(e, () => p))), d[t] = p;
			}
			r = d;
		}), c) {
			var u = e;
			Mn(() => {
				var e = r;
				"defaultValue" in e && Bi(u, e.defaultValue), Hi(u, e.value, !0), Ui(u);
			});
		}
		l = !0;
	});
}
function oa(e) {
	return e[ue] ??= {
		[Ji]: e.nodeName.includes("-"),
		[Yi]: e.namespaceURI === ge
	};
}
var sa = /* @__PURE__ */ new Map();
function ca(e) {
	var t = e.getAttribute("is") || e.nodeName, n = sa.get(t);
	if (n) return n;
	sa.set(t, n = /* @__PURE__ */ new Set());
	for (var r, i = e, a = Element.prototype; a !== i;) {
		for (var s in r = o(i), r) r[s].set && s !== "innerHTML" && s !== "textContent" && s !== "innerText" && n.add(s);
		i = l(i);
	}
	return n;
}
// ../vibebook/node_modules/svelte/src/internal/client/dom/elements/bindings/input.js
function la(e, t, n = t) {
	var r = /* @__PURE__ */ new WeakSet();
	ft(e, "input", async (i) => {
		var a = i ? e.defaultValue : e.value;
		if (a = ma(e) ? ha(a) : a, n(a), I !== null && r.add(I), await br(), a !== (a = t())) {
			var o = e.selectionStart, s = e.selectionEnd, c = e.value.length;
			if (e.value = a ?? "", s !== null) {
				var l = e.value.length;
				o === s && s === c && l > c ? (e.selectionStart = l, e.selectionEnd = l) : (e.selectionStart = o, e.selectionEnd = Math.min(s, l));
			}
		}
	}), (k && e.defaultValue !== e.value || Cr(t) == null && e.value) && (n(ma(e) ? ha(e.value) : e.value), I !== null && r.add(I)), Pn(() => {
		var n = t();
		if (e === document.activeElement) {
			var i = I;
			if (r.has(i)) return;
		}
		ma(e) && n === ha(e.value) || (e.type !== "date" || n || e.value) && n !== e.value && (e.value = n ?? "");
	});
}
var ua = /* @__PURE__ */ new Set();
function da(e, t, n, r, i = r) {
	var a = n.getAttribute("type") === "checkbox", o = e;
	let s = !1;
	if (t !== null) for (var c of t) o = o[c] ??= [];
	o.push(n), ft(n, "change", () => {
		var e = n.__value;
		a && (e = pa(o, e, n.checked)), i(e);
	}, () => i(a ? [] : null)), Pn(() => {
		var e = r();
		k && n.defaultChecked !== n.checked ? s = !0 : a ? (e ||= [], n.checked = e.includes(n.__value)) : n.checked = an(n.__value, e);
	}), En(() => {
		var e = o.indexOf(n);
		e !== -1 && o.splice(e, 1);
	}), ua.has(o) || (ua.add(o), nt(() => {
		o.sort((e, t) => e.compareDocumentPosition(t) === 4 ? -1 : 1), ua.delete(o);
	})), nt(() => {
		if (s) {
			var e = a ? pa(o, e, n.checked) : o.find((e) => e.checked)?.__value;
			i(e);
		}
	});
}
function fa(e, t, n = t) {
	ft(e, "change", (t) => {
		n(t ? e.defaultChecked : e.checked);
	}), (k && e.defaultChecked !== e.checked || Cr(t) == null) && n(e.checked), Pn(() => {
		e.checked = !!t();
	});
}
function pa(e, t, n) {
	for (var r = /* @__PURE__ */ new Set(), i = 0; i < e.length; i += 1) e[i].checked && r.add(e[i].__value);
	return n || r.delete(t), Array.from(r);
}
function ma(e) {
	var t = e.type;
	return t === "number" || t === "range";
}
function ha(e) {
	return e === "" ? null : +e;
}
// ../vibebook/node_modules/svelte/src/internal/client/dom/elements/bindings/this.js
function ga(e, t) {
	return e === t || e?.[oe] === t;
}
function _a(e = Qe(), t, n, r) {
	var i = Ke.r, a = H;
	return Mn(() => {
		var o, s;
		return Pn(() => {
			o = s, s = r?.() || [], Cr(() => {
				ga(n(...s), e) || (t(e, ...s), o && ga(n(...o), e) && t(null, ...o));
			});
		}), () => {
			let r = a;
			for (; r !== i && r.parent !== null && r.parent.f & 33554432;) r = r.parent;
			let o = () => {
				s && ga(n(...s), e) && t(null, ...s);
			}, c = r.teardown;
			r.teardown = () => {
				o(), c?.();
			};
		};
	}), e;
}
// ../vibebook/node_modules/svelte/src/internal/client/dom/elements/bindings/universal.js
function va(e, t, n, r, i) {
	var a = () => {
		r(n[e]);
	};
	n.addEventListener(t, a), i ? Pn(() => {
		n[e] = i();
	}) : a(), (n === document.body || n === window || n === document) && En(() => {
		n.removeEventListener(t, a);
	});
}
// ../vibebook/node_modules/svelte/src/store/utils.js
function ya(e, t, n) {
	if (e == null) return t(void 0), n && n(void 0), f;
	let r = Cr(() => e.subscribe(t, n));
	return r.unsubscribe ? () => r.unsubscribe() : r;
}
// ../vibebook/node_modules/svelte/src/store/shared/index.js
var ba = [];
function xa(e, t = f) {
	let n = null, r = /* @__PURE__ */ new Set();
	function i(t) {
		if (Ae(e, t) && (e = t, n)) {
			let t = !ba.length;
			for (let t of r) t[1](), ba.push(t, e);
			if (t) {
				for (let e = 0; e < ba.length; e += 2) ba[e][0](ba[e + 1]);
				ba.length = 0;
			}
		}
	}
	function a(t) {
		i(t(e));
	}
	function o(o, s = f) {
		let c = [o, s];
		return r.add(c), r.size === 1 && (n = t(i, a) || f), o(e), () => {
			r.delete(c), r.size === 0 && n && (n(), n = null);
		};
	}
	return {
		set: i,
		update: a,
		subscribe: o
	};
}
function Sa(e) {
	let t;
	return ya(e, (e) => t = e)(), t;
}
// ../vibebook/node_modules/svelte/src/internal/client/reactivity/store.js
var Ca = !1, wa = Symbol("unmounted");
function Ta(e, t, n) {
	let r = n[t] ??= {
		store: null,
		source: /* @__PURE__ */ Jt(void 0),
		unsubscribe: f
	};
	if (r.store !== e && !(wa in n)) {
		if (r.unsubscribe(), r.store = e ?? null, e == null) r.source.v = void 0, r.unsubscribe = f;
		else {
			var i = !0;
			r.unsubscribe = ya(e, (e) => {
				i ? r.source.v = e : R(r.source, e);
			}), i = !1;
		}
	}
	return e && wa in n ? Sa(e) : U(r.source);
}
function Ea() {
	let e = {};
	function t() {
		En(() => {
			for (var t in e) e[t].unsubscribe();
			i(e, wa, {
				enumerable: !1,
				value: !0
			});
		});
	}
	return [e, t];
}
function Da(e) {
	var t = Ca;
	try {
		return Ca = !1, [e(), Ca];
	} finally {
		Ca = t;
	}
}
// ../vibebook/node_modules/svelte/src/internal/client/reactivity/props.js
var Oa = {
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
function ka(e, t, n) {
	return new Proxy({
		props: e,
		exclude: t
	}, Oa);
}
var Aa = {
	get(e, t) {
		let n = e.props.length;
		for (; n--;) {
			let r = e.props[n];
			if (d(r) && (r = r()), typeof r == "object" && r && t in r) return r[t];
		}
	},
	set(e, t, n) {
		let r = e.props.length;
		for (; r--;) {
			let i = e.props[r];
			d(i) && (i = i());
			let o = a(i, t);
			if (o && o.set) return o.set(n), !0;
		}
		return !1;
	},
	getOwnPropertyDescriptor(e, t) {
		let n = e.props.length;
		for (; n--;) {
			let r = e.props[n];
			if (d(r) && (r = r()), typeof r == "object" && r && t in r) {
				let e = a(r, t);
				return e && !e.configurable && (e.configurable = !0), e;
			}
		}
	},
	has(e, t) {
		if (t === oe || t === ce) return !1;
		for (let n of e.props) if (d(n) && (n = n()), n != null && t in n) return !0;
		return !1;
	},
	ownKeys(e) {
		let t = [];
		for (let n of e.props) if (d(n) && (n = n()), n) {
			for (let e in n) t.includes(e) || t.push(e);
			for (let e of Object.getOwnPropertySymbols(n)) t.includes(e) || t.push(e);
		}
		return t;
	}
};
function ja(...e) {
	return new Proxy({ props: e }, Aa);
}
function Y(e, t, n, r) {
	var i = !0, o = !!(n & 8), s = !!(n & 16), c = r, l = !0, u = void 0, d = () => s && i ? (u ??= /* @__PURE__ */ _t(r), U(u)) : (l && (l = !1, c = s ? Cr(r) : r), c);
	let f;
	if (o) {
		var p = oe in e || ce in e;
		f = a(e, t)?.set ?? (p && t in e ? (n) => e[t] = n : void 0);
	}
	var m, h = !1;
	o ? [m, h] = Da(() => e[t]) : m = e[t], m === void 0 && r !== void 0 && (m = d(), f && (i && ze(t), f(m)));
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
	var v = !1, y = (n & 1 ? _t : bt)(() => (v = !1, g()));
	o && U(y);
	var b = H;
	return (function(e, t) {
		if (arguments.length > 0) {
			let n = t ? U(y) : i && o ? nn(e) : e;
			return R(y, n), v = !0, c !== void 0 && (c = n), e;
		}
		return Zn && v || b.f & 16384 ? y.v : U(y);
	});
}
function Ma(e) {
	Ke === null && Me("onMount"), Dn(() => {
		let t = Cr(e);
		if (typeof t == "function") return t;
	});
}
function Na(e) {
	Ke === null && Me("onDestroy"), Ma(() => () => Cr(e));
}
// ../vibebook/node_modules/svelte/src/internal/disclose-version.js
typeof window < "u" && ((window.__svelte ??= {}).v ??= /* @__PURE__ */ new Set()).add("5");
// ../vibebook/node_modules/tailwind-merge/dist/bundle-mjs.mjs
var Pa = (e, t) => {
	let n = Array(e.length + t.length);
	for (let t = 0; t < e.length; t++) n[t] = e[t];
	for (let r = 0; r < t.length; r++) n[e.length + r] = t[r];
	return n;
}, Fa = (e, t) => ({
	classGroupId: e,
	validator: t
}), Ia = (e = /* @__PURE__ */ new Map(), t = null, n) => ({
	nextPart: e,
	validators: t,
	classGroupId: n
}), La = "-", Ra = [], za = "arbitrary..", Ba = (e) => {
	let t = Ua(e), { conflictingClassGroups: n, conflictingClassGroupModifiers: r } = e;
	return {
		getClassGroupId: (e) => {
			if (e.startsWith("[") && e.endsWith("]")) return Ha(e);
			let n = e.split(La);
			return Va(n, +(n[0] === "" && n.length > 1), t);
		},
		getConflictingClassGroupIds: (e, t) => {
			if (t) {
				let t = r[e], i = n[e];
				return t ? i ? Pa(i, t) : t : i || Ra;
			}
			return n[e] || Ra;
		}
	};
}, Va = (e, t, n) => {
	if (e.length - t === 0) return n.classGroupId;
	let r = e[t], i = n.nextPart.get(r);
	if (i) {
		let n = Va(e, t + 1, i);
		if (n) return n;
	}
	let a = n.validators;
	if (a === null) return;
	let o = t === 0 ? e.join(La) : e.slice(t).join(La), s = a.length;
	for (let e = 0; e < s; e++) {
		let t = a[e];
		if (t.validator(o)) return t.classGroupId;
	}
}, Ha = (e) => e.slice(1, -1).indexOf(":") === -1 ? void 0 : (() => {
	let t = e.slice(1, -1), n = t.indexOf(":"), r = t.slice(0, n);
	return r ? za + r : void 0;
})(), Ua = (e) => {
	let { theme: t, classGroups: n } = e;
	return Wa(n, t);
}, Wa = (e, t) => {
	let n = Ia();
	for (let r in e) {
		let i = e[r];
		Ga(i, n, r, t);
	}
	return n;
}, Ga = (e, t, n, r) => {
	let i = e.length;
	for (let a = 0; a < i; a++) {
		let i = e[a];
		Ka(i, t, n, r);
	}
}, Ka = (e, t, n, r) => {
	typeof e == "string" ? qa(e, t, n) : typeof e == "function" ? Ja(e, t, n, r) : Ya(e, t, n, r);
}, qa = (e, t, n) => {
	let r = e === "" ? t : Xa(t, e);
	r.classGroupId = n;
}, Ja = (e, t, n, r) => {
	Za(e) ? Ga(e(r), t, n, r) : (t.validators === null && (t.validators = []), t.validators.push(Fa(n, e)));
}, Ya = (e, t, n, r) => {
	let i = Object.entries(e), a = i.length;
	for (let e = 0; e < a; e++) {
		let [a, o] = i[e];
		Ga(o, Xa(t, a), n, r);
	}
}, Xa = (e, t) => {
	let n = e, r = t.split(La), i = r.length;
	for (let e = 0; e < i; e++) {
		let t = r[e], i = n.nextPart.get(t);
		i || (i = Ia(), n.nextPart.set(t, i)), n = i;
	}
	return n;
}, Za = (e) => "isThemeGetter" in e && e.isThemeGetter === !0, Qa = (e) => {
	if (e < 1) return {
		get: () => void 0,
		set: () => {}
	};
	let t = 0, n = Object.create(null), r = Object.create(null), i = (i, a) => {
		n[i] = a, t++, t > e && (t = 0, r = n, n = Object.create(null));
	};
	return {
		get(e) {
			let t = n[e];
			if (t !== void 0) return t;
			if ((t = r[e]) !== void 0) return i(e, t), t;
		},
		set(e, t) {
			e in n ? n[e] = t : i(e, t);
		}
	};
}, $a = "!", eo = ":", to = [], no = (e, t, n, r, i) => ({
	modifiers: e,
	hasImportantModifier: t,
	baseClassName: n,
	maybePostfixModifierPosition: r,
	isExternal: i
}), ro = (e) => {
	let { prefix: t, experimentalParseClassName: n } = e, r = (e) => {
		let t = [], n = 0, r = 0, i = 0, a, o = e.length;
		for (let s = 0; s < o; s++) {
			let o = e[s];
			if (n === 0 && r === 0) {
				if (o === eo) {
					t.push(e.slice(i, s)), i = s + 1;
					continue;
				}
				if (o === "/") {
					a = s;
					continue;
				}
			}
			o === "[" ? n++ : o === "]" ? n-- : o === "(" ? r++ : o === ")" && r--;
		}
		let s = t.length === 0 ? e : e.slice(i), c = s, l = !1;
		s.endsWith($a) ? (c = s.slice(0, -1), l = !0) : s.startsWith($a) && (c = s.slice(1), l = !0);
		let u = a && a > i ? a - i : void 0;
		return no(t, l, c, u);
	};
	if (t) {
		let e = t + eo, n = r;
		r = (t) => t.startsWith(e) ? n(t.slice(e.length)) : no(to, !1, t, void 0, !0);
	}
	if (n) {
		let e = r;
		r = (t) => n({
			className: t,
			parseClassName: e
		});
	}
	return r;
}, io = (e) => {
	let t = /* @__PURE__ */ new Map();
	return e.orderSensitiveModifiers.forEach((e, n) => {
		t.set(e, 1e6 + n);
	}), (e) => {
		let n = [], r = [];
		for (let i = 0; i < e.length; i++) {
			let a = e[i], o = a[0] === "[", s = t.has(a);
			o || s ? (r.length > 0 && (r.sort(), n.push(...r), r = []), n.push(a)) : r.push(a);
		}
		return r.length > 0 && (r.sort(), n.push(...r)), n;
	};
}, ao = (e) => ({
	cache: Qa(e.cacheSize),
	parseClassName: ro(e),
	sortModifiers: io(e),
	postfixLookupClassGroupIds: oo(e),
	...Ba(e)
}), oo = (e) => {
	let t = Object.create(null), n = e.postfixLookupClassGroups;
	if (n) for (let e = 0; e < n.length; e++) t[n[e]] = !0;
	return t;
}, so = /\s+/, co = (e, t) => {
	let { parseClassName: n, getClassGroupId: r, getConflictingClassGroupIds: i, sortModifiers: a, postfixLookupClassGroupIds: o } = t, s = [], c = e.trim().split(so), l = "";
	for (let e = c.length - 1; e >= 0; --e) {
		let t = c[e], { isExternal: u, modifiers: d, hasImportantModifier: f, baseClassName: p, maybePostfixModifierPosition: m } = n(t);
		if (u) {
			l = t + (l.length > 0 ? " " + l : l);
			continue;
		}
		let h = !!m, g;
		if (h) {
			g = r(p.substring(0, m));
			let e = g && o[g] ? r(p) : void 0;
			e && e !== g && (g = e, h = !1);
		} else g = r(p);
		if (!g) {
			if (!h || (g = r(p), !g)) {
				l = t + (l.length > 0 ? " " + l : l);
				continue;
			}
			h = !1;
		}
		let _ = d.length === 0 ? "" : d.length === 1 ? d[0] : a(d).join(":"), v = f ? _ + $a : _, y = v + g;
		if (s.indexOf(y) > -1) continue;
		s.push(y);
		let b = i(g, h);
		for (let e = 0; e < b.length; ++e) {
			let t = b[e];
			s.push(v + t);
		}
		l = t + (l.length > 0 ? " " + l : l);
	}
	return l;
}, lo = (...e) => {
	let t = 0, n, r, i = "";
	for (; t < e.length;) (n = e[t++]) && (r = uo(n)) && (i && (i += " "), i += r);
	return i;
}, uo = (e) => {
	if (typeof e == "string") return e;
	let t, n = "";
	for (let r = 0; r < e.length; r++) e[r] && (t = uo(e[r])) && (n && (n += " "), n += t);
	return n;
}, fo = (e, ...t) => {
	let n, r, i, a, o = (o) => (n = ao(t.reduce((e, t) => t(e), e())), r = n.cache.get, i = n.cache.set, a = s, s(o)), s = (e) => {
		let t = r(e);
		if (t) return t;
		let a = co(e, n);
		return i(e, a), a;
	};
	return a = o, (...e) => a(lo(...e));
}, po = [], mo = (e) => {
	let t = (t) => t[e] || po;
	return t.isThemeGetter = !0, t.themeKey = e, t;
}, ho = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, go = /^\((?:(\w[\w-]*):)?(.+)\)$/i, _o = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/, vo = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, yo = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, bo = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix|color|light-dark)\(.+\)$/, xo = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, So = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, Co = (e) => _o.test(e), X = (e) => !!e && !Number.isNaN(Number(e)), wo = (e) => !!e && Number.isInteger(Number(e)), To = (e) => e.endsWith("%") && X(e.slice(0, -1)), Eo = (e) => vo.test(e), Do = () => !0, Oo = (e) => yo.test(e) && !bo.test(e), ko = () => !1, Ao = (e) => xo.test(e), jo = (e) => So.test(e), Mo = (e) => !Z(e) && !Q(e), No = (e) => e.startsWith("@container") && (e[10] === "/" && e[11] !== void 0 || e[11] === "s" && e[16] !== void 0 && e.startsWith("-size/", 10) || e[11] === "n" && e[18] !== void 0 && e.startsWith("-normal/", 10)), Po = (e) => Yo(e, $o, ko), Z = (e) => ho.test(e), Fo = (e) => Yo(e, es, Oo), Io = (e) => Yo(e, ts, X), Lo = (e) => Yo(e, rs, Do), Ro = (e) => Yo(e, ns, ko), zo = (e) => Yo(e, Zo, ko), Bo = (e) => Yo(e, Qo, jo), Vo = (e) => Yo(e, is, Ao), Q = (e) => go.test(e), Ho = (e) => Xo(e, es), Uo = (e) => Xo(e, ns), Wo = (e) => Xo(e, Zo), Go = (e) => Xo(e, $o), Ko = (e) => Xo(e, Qo), qo = (e) => Xo(e, is, !0), Jo = (e) => Xo(e, rs, !0), Yo = (e, t, n) => {
	let r = ho.exec(e);
	return r ? r[1] ? t(r[1]) : n(r[2]) : !1;
}, Xo = (e, t, n = !1) => {
	let r = go.exec(e);
	return r ? r[1] ? t(r[1]) : n : !1;
}, Zo = (e) => e === "position" || e === "percentage", Qo = (e) => e === "image" || e === "url", $o = (e) => e === "length" || e === "size" || e === "bg-size", es = (e) => e === "length", ts = (e) => e === "number", ns = (e) => e === "family-name", rs = (e) => e === "number" || e === "weight", is = (e) => e === "shadow", as = () => {
	let e = mo("color"), t = mo("font"), n = mo("text"), r = mo("font-weight"), i = mo("tracking"), a = mo("leading"), o = mo("breakpoint"), s = mo("container"), c = mo("spacing"), l = mo("radius"), u = mo("shadow"), d = mo("inset-shadow"), f = mo("text-shadow"), p = mo("drop-shadow"), m = mo("blur"), h = mo("perspective"), g = mo("aspect"), _ = mo("ease"), v = mo("animate"), y = () => [
		"auto",
		"avoid",
		"all",
		"avoid-page",
		"page",
		"left",
		"right",
		"column"
	], b = () => [
		"center",
		"top",
		"bottom",
		"left",
		"right",
		"top-left",
		"left-top",
		"top-right",
		"right-top",
		"bottom-right",
		"right-bottom",
		"bottom-left",
		"left-bottom"
	], x = () => [
		...b(),
		Q,
		Z
	], S = () => [
		"auto",
		"hidden",
		"clip",
		"visible",
		"scroll"
	], ee = () => [
		"auto",
		"contain",
		"none"
	], C = () => [
		Q,
		Z,
		c
	], w = () => [
		Co,
		"full",
		"auto",
		...C()
	], te = () => [
		wo,
		"none",
		"subgrid",
		Q,
		Z
	], ne = () => [
		"auto",
		{ span: [
			"full",
			wo,
			Q,
			Z
		] },
		wo,
		Q,
		Z
	], re = () => [
		wo,
		"auto",
		Q,
		Z
	], ie = () => [
		"auto",
		"min",
		"max",
		"fr",
		Q,
		Z
	], ae = () => [
		"start",
		"end",
		"center",
		"between",
		"around",
		"evenly",
		"stretch",
		"baseline",
		"center-safe",
		"end-safe"
	], oe = () => [
		"start",
		"end",
		"center",
		"stretch",
		"center-safe",
		"end-safe"
	], se = () => ["auto", ...C()], ce = () => [
		Co,
		"auto",
		"full",
		"dvw",
		"dvh",
		"lvw",
		"lvh",
		"svw",
		"svh",
		"min",
		"max",
		"fit",
		...C()
	], le = () => [
		s,
		Co,
		"screen",
		"full",
		"dvw",
		"lvw",
		"svw",
		"min",
		"max",
		"fit",
		...C()
	], ue = () => [
		Co,
		"screen",
		"full",
		"lh",
		"dvh",
		"lvh",
		"svh",
		"min",
		"max",
		"fit",
		...C()
	], T = () => [
		e,
		Q,
		Z
	], de = () => [
		...b(),
		Wo,
		zo,
		{ position: [Q, Z] }
	], fe = () => ["no-repeat", { repeat: [
		"",
		"x",
		"y",
		"space",
		"round"
	] }], pe = () => [
		"auto",
		"cover",
		"contain",
		Go,
		Po,
		{ size: [Q, Z] }
	], me = () => [
		To,
		Ho,
		Fo
	], he = () => [
		"",
		"none",
		"full",
		l,
		Q,
		Z
	], E = () => [
		"",
		X,
		Ho,
		Fo
	], D = () => [
		"solid",
		"dashed",
		"dotted",
		"double"
	], ge = () => [
		"normal",
		"multiply",
		"screen",
		"overlay",
		"darken",
		"lighten",
		"color-dodge",
		"color-burn",
		"hard-light",
		"soft-light",
		"difference",
		"exclusion",
		"hue",
		"saturation",
		"color",
		"luminosity"
	], O = () => [
		X,
		To,
		Wo,
		zo
	], _e = () => [
		"",
		"none",
		m,
		Q,
		Z
	], ve = () => [
		"none",
		X,
		Q,
		Z
	], ye = () => [
		"none",
		X,
		Q,
		Z
	], be = () => [
		X,
		Q,
		Z
	], xe = () => [
		Co,
		"full",
		...C()
	];
	return {
		cacheSize: 500,
		theme: {
			animate: [
				"spin",
				"ping",
				"pulse",
				"bounce"
			],
			aspect: ["video"],
			blur: [Eo],
			breakpoint: [Eo],
			color: [Do],
			container: [Eo],
			"drop-shadow": [Eo],
			ease: [
				"in",
				"out",
				"in-out"
			],
			font: [Mo],
			"font-weight": [
				"thin",
				"extralight",
				"light",
				"normal",
				"medium",
				"semibold",
				"bold",
				"extrabold",
				"black"
			],
			"inset-shadow": [Eo],
			leading: [
				"none",
				"tight",
				"snug",
				"normal",
				"relaxed",
				"loose"
			],
			perspective: [
				"dramatic",
				"near",
				"normal",
				"midrange",
				"distant",
				"none"
			],
			radius: [Eo],
			shadow: [Eo],
			spacing: ["px", X],
			text: [Eo],
			"text-shadow": [Eo],
			tracking: [
				"tighter",
				"tight",
				"normal",
				"wide",
				"wider",
				"widest"
			]
		},
		classGroups: {
			aspect: [{ aspect: [
				"auto",
				"square",
				Co,
				Z,
				Q,
				g
			] }],
			container: ["container"],
			"container-type": [{ "@container": [
				"",
				"normal",
				"size",
				Q,
				Z
			] }],
			"container-named": [No],
			columns: [{ columns: [
				X,
				"auto",
				Z,
				Q,
				s
			] }],
			"break-after": [{ "break-after": y() }],
			"break-before": [{ "break-before": y() }],
			"break-inside": [{ "break-inside": [
				"auto",
				"avoid",
				"avoid-page",
				"avoid-column"
			] }],
			"box-decoration": [{ "box-decoration": ["slice", "clone"] }],
			box: [{ box: ["border", "content"] }],
			display: [
				"block",
				"inline-block",
				"inline",
				"flex",
				"inline-flex",
				"table",
				"inline-table",
				"table-caption",
				"table-cell",
				"table-column",
				"table-column-group",
				"table-footer-group",
				"table-header-group",
				"table-row-group",
				"table-row",
				"flow-root",
				"grid",
				"inline-grid",
				"contents",
				"list-item",
				"hidden"
			],
			sr: ["sr-only", "not-sr-only"],
			float: [{ float: [
				"right",
				"left",
				"none",
				"start",
				"end"
			] }],
			clear: [{ clear: [
				"left",
				"right",
				"both",
				"none",
				"start",
				"end"
			] }],
			isolation: ["isolate", "isolation-auto"],
			"object-fit": [{ object: [
				"contain",
				"cover",
				"fill",
				"none",
				"scale-down"
			] }],
			"object-position": [{ object: x() }],
			overflow: [{ overflow: S() }],
			"overflow-x": [{ "overflow-x": S() }],
			"overflow-y": [{ "overflow-y": S() }],
			overscroll: [{ overscroll: ee() }],
			"overscroll-x": [{ "overscroll-x": ee() }],
			"overscroll-y": [{ "overscroll-y": ee() }],
			position: [
				"static",
				"fixed",
				"absolute",
				"relative",
				"sticky"
			],
			inset: [{ inset: w() }],
			"inset-x": [{ "inset-x": w() }],
			"inset-y": [{ "inset-y": w() }],
			start: [{
				"inset-s": w(),
				start: w()
			}],
			end: [{
				"inset-e": w(),
				end: w()
			}],
			"inset-bs": [{ "inset-bs": w() }],
			"inset-be": [{ "inset-be": w() }],
			top: [{ top: w() }],
			right: [{ right: w() }],
			bottom: [{ bottom: w() }],
			left: [{ left: w() }],
			visibility: [
				"visible",
				"invisible",
				"collapse"
			],
			z: [{ z: [
				wo,
				"auto",
				Q,
				Z
			] }],
			basis: [{ basis: [
				Co,
				"full",
				"auto",
				s,
				...C()
			] }],
			"flex-direction": [{ flex: [
				"row",
				"row-reverse",
				"col",
				"col-reverse"
			] }],
			"flex-wrap": [{ flex: [
				"nowrap",
				"wrap",
				"wrap-reverse"
			] }],
			flex: [{ flex: [
				X,
				Co,
				"auto",
				"initial",
				"none",
				Z
			] }],
			grow: [{ grow: [
				"",
				X,
				Q,
				Z
			] }],
			shrink: [{ shrink: [
				"",
				X,
				Q,
				Z
			] }],
			order: [{ order: [
				wo,
				"first",
				"last",
				"none",
				Q,
				Z
			] }],
			"grid-cols": [{ "grid-cols": te() }],
			"col-start-end": [{ col: ne() }],
			"col-start": [{ "col-start": re() }],
			"col-end": [{ "col-end": re() }],
			"grid-rows": [{ "grid-rows": te() }],
			"row-start-end": [{ row: ne() }],
			"row-start": [{ "row-start": re() }],
			"row-end": [{ "row-end": re() }],
			"grid-flow": [{ "grid-flow": [
				"row",
				"col",
				"dense",
				"row-dense",
				"col-dense"
			] }],
			"auto-cols": [{ "auto-cols": ie() }],
			"auto-rows": [{ "auto-rows": ie() }],
			gap: [{ gap: C() }],
			"gap-x": [{ "gap-x": C() }],
			"gap-y": [{ "gap-y": C() }],
			"justify-content": [{ justify: [...ae(), "normal"] }],
			"justify-items": [{ "justify-items": [...oe(), "normal"] }],
			"justify-self": [{ "justify-self": ["auto", ...oe()] }],
			"align-content": [{ content: ["normal", ...ae()] }],
			"align-items": [{ items: [...oe(), { baseline: ["", "last"] }] }],
			"align-self": [{ self: [
				"auto",
				...oe(),
				{ baseline: ["", "last"] }
			] }],
			"place-content": [{ "place-content": ae() }],
			"place-items": [{ "place-items": [...oe(), "baseline"] }],
			"place-self": [{ "place-self": ["auto", ...oe()] }],
			p: [{ p: C() }],
			px: [{ px: C() }],
			py: [{ py: C() }],
			ps: [{ ps: C() }],
			pe: [{ pe: C() }],
			pbs: [{ pbs: C() }],
			pbe: [{ pbe: C() }],
			pt: [{ pt: C() }],
			pr: [{ pr: C() }],
			pb: [{ pb: C() }],
			pl: [{ pl: C() }],
			m: [{ m: se() }],
			mx: [{ mx: se() }],
			my: [{ my: se() }],
			ms: [{ ms: se() }],
			me: [{ me: se() }],
			mbs: [{ mbs: se() }],
			mbe: [{ mbe: se() }],
			mt: [{ mt: se() }],
			mr: [{ mr: se() }],
			mb: [{ mb: se() }],
			ml: [{ ml: se() }],
			"space-x": [{ "space-x": C() }],
			"space-x-reverse": ["space-x-reverse"],
			"space-y": [{ "space-y": C() }],
			"space-y-reverse": ["space-y-reverse"],
			size: [{ size: ce() }],
			"inline-size": [{ inline: ["auto", ...le()] }],
			"min-inline-size": [{ "min-inline": ["auto", ...le()] }],
			"max-inline-size": [{ "max-inline": ["none", ...le()] }],
			"block-size": [{ block: ["auto", ...ue()] }],
			"min-block-size": [{ "min-block": ["auto", ...ue()] }],
			"max-block-size": [{ "max-block": ["none", ...ue()] }],
			w: [{ w: [
				s,
				"screen",
				...ce()
			] }],
			"min-w": [{ "min-w": [
				s,
				"screen",
				"none",
				...ce()
			] }],
			"max-w": [{ "max-w": [
				s,
				"screen",
				"none",
				"prose",
				{ screen: [o] },
				...ce()
			] }],
			h: [{ h: [
				"screen",
				"lh",
				...ce()
			] }],
			"min-h": [{ "min-h": [
				"screen",
				"lh",
				"none",
				...ce()
			] }],
			"max-h": [{ "max-h": [
				"screen",
				"lh",
				"none",
				...ce()
			] }],
			"font-size": [{ text: [
				"base",
				n,
				Ho,
				Fo
			] }],
			"font-smoothing": ["antialiased", "subpixel-antialiased"],
			"font-style": ["italic", "not-italic"],
			"font-weight": [{ font: [
				r,
				Jo,
				Lo
			] }],
			"font-stretch": [{ "font-stretch": [
				"ultra-condensed",
				"extra-condensed",
				"condensed",
				"semi-condensed",
				"normal",
				"semi-expanded",
				"expanded",
				"extra-expanded",
				"ultra-expanded",
				To,
				Z
			] }],
			"font-family": [{ font: [
				Uo,
				Ro,
				t
			] }],
			"font-features": [{ "font-features": [Z] }],
			"fvn-normal": ["normal-nums"],
			"fvn-ordinal": ["ordinal"],
			"fvn-slashed-zero": ["slashed-zero"],
			"fvn-figure": ["lining-nums", "oldstyle-nums"],
			"fvn-spacing": ["proportional-nums", "tabular-nums"],
			"fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
			tracking: [{ tracking: [
				i,
				Q,
				Z
			] }],
			"line-clamp": [{ "line-clamp": [
				X,
				"none",
				Q,
				Io
			] }],
			leading: [{ leading: [
				"none",
				a,
				...C()
			] }],
			"list-image": [{ "list-image": [
				"none",
				Q,
				Z
			] }],
			"list-style-position": [{ list: ["inside", "outside"] }],
			"list-style-type": [{ list: [
				"disc",
				"decimal",
				"none",
				Q,
				Z
			] }],
			"text-alignment": [{ text: [
				"left",
				"center",
				"right",
				"justify",
				"start",
				"end"
			] }],
			"placeholder-color": [{ placeholder: T() }],
			"text-color": [{ text: T() }],
			"text-decoration": [
				"underline",
				"overline",
				"line-through",
				"no-underline"
			],
			"text-decoration-style": [{ decoration: [...D(), "wavy"] }],
			"text-decoration-thickness": [{ decoration: [
				X,
				"from-font",
				"auto",
				Q,
				Fo
			] }],
			"text-decoration-color": [{ decoration: T() }],
			"underline-offset": [{ "underline-offset": [
				X,
				"auto",
				Q,
				Z
			] }],
			"text-transform": [
				"uppercase",
				"lowercase",
				"capitalize",
				"normal-case"
			],
			"text-overflow": [
				"truncate",
				"text-ellipsis",
				"text-clip"
			],
			"text-wrap": [{ text: [
				"wrap",
				"nowrap",
				"balance",
				"pretty"
			] }],
			indent: [{ indent: C() }],
			"tab-size": [{ tab: [
				wo,
				Q,
				Z
			] }],
			"vertical-align": [{ align: [
				"baseline",
				"top",
				"middle",
				"bottom",
				"text-top",
				"text-bottom",
				"sub",
				"super",
				Q,
				Z
			] }],
			whitespace: [{ whitespace: [
				"normal",
				"nowrap",
				"pre",
				"pre-line",
				"pre-wrap",
				"break-spaces"
			] }],
			break: [{ break: [
				"normal",
				"words",
				"all",
				"keep"
			] }],
			wrap: [{ wrap: [
				"break-word",
				"anywhere",
				"normal"
			] }],
			hyphens: [{ hyphens: [
				"none",
				"manual",
				"auto"
			] }],
			content: [{ content: [
				"none",
				Q,
				Z
			] }],
			"bg-attachment": [{ bg: [
				"fixed",
				"local",
				"scroll"
			] }],
			"bg-clip": [{ "bg-clip": [
				"border",
				"padding",
				"content",
				"text"
			] }],
			"bg-origin": [{ "bg-origin": [
				"border",
				"padding",
				"content"
			] }],
			"bg-position": [{ bg: de() }],
			"bg-repeat": [{ bg: fe() }],
			"bg-size": [{ bg: pe() }],
			"bg-image": [{ bg: [
				"none",
				{
					linear: [
						{ to: [
							"t",
							"tr",
							"r",
							"br",
							"b",
							"bl",
							"l",
							"tl"
						] },
						wo,
						Q,
						Z
					],
					radial: [
						"",
						Q,
						Z
					],
					conic: [
						"",
						wo,
						Q,
						Z
					]
				},
				Ko,
				Bo
			] }],
			"bg-color": [{ bg: T() }],
			"gradient-from-pos": [{ from: me() }],
			"gradient-via-pos": [{ via: me() }],
			"gradient-to-pos": [{ to: me() }],
			"gradient-from": [{ from: T() }],
			"gradient-via": [{ via: T() }],
			"gradient-to": [{ to: T() }],
			rounded: [{ rounded: he() }],
			"rounded-s": [{ "rounded-s": he() }],
			"rounded-e": [{ "rounded-e": he() }],
			"rounded-t": [{ "rounded-t": he() }],
			"rounded-r": [{ "rounded-r": he() }],
			"rounded-b": [{ "rounded-b": he() }],
			"rounded-l": [{ "rounded-l": he() }],
			"rounded-ss": [{ "rounded-ss": he() }],
			"rounded-se": [{ "rounded-se": he() }],
			"rounded-ee": [{ "rounded-ee": he() }],
			"rounded-es": [{ "rounded-es": he() }],
			"rounded-tl": [{ "rounded-tl": he() }],
			"rounded-tr": [{ "rounded-tr": he() }],
			"rounded-br": [{ "rounded-br": he() }],
			"rounded-bl": [{ "rounded-bl": he() }],
			"border-w": [{ border: E() }],
			"border-w-x": [{ "border-x": E() }],
			"border-w-y": [{ "border-y": E() }],
			"border-w-s": [{ "border-s": E() }],
			"border-w-e": [{ "border-e": E() }],
			"border-w-bs": [{ "border-bs": E() }],
			"border-w-be": [{ "border-be": E() }],
			"border-w-t": [{ "border-t": E() }],
			"border-w-r": [{ "border-r": E() }],
			"border-w-b": [{ "border-b": E() }],
			"border-w-l": [{ "border-l": E() }],
			"divide-x": [{ "divide-x": E() }],
			"divide-x-reverse": ["divide-x-reverse"],
			"divide-y": [{ "divide-y": E() }],
			"divide-y-reverse": ["divide-y-reverse"],
			"border-style": [{ border: [
				...D(),
				"hidden",
				"none"
			] }],
			"divide-style": [{ divide: [
				...D(),
				"hidden",
				"none"
			] }],
			"border-color": [{ border: T() }],
			"border-color-x": [{ "border-x": T() }],
			"border-color-y": [{ "border-y": T() }],
			"border-color-s": [{ "border-s": T() }],
			"border-color-e": [{ "border-e": T() }],
			"border-color-bs": [{ "border-bs": T() }],
			"border-color-be": [{ "border-be": T() }],
			"border-color-t": [{ "border-t": T() }],
			"border-color-r": [{ "border-r": T() }],
			"border-color-b": [{ "border-b": T() }],
			"border-color-l": [{ "border-l": T() }],
			"divide-color": [{ divide: T() }],
			"outline-style": [{ outline: [
				...D(),
				"none",
				"hidden"
			] }],
			"outline-offset": [{ "outline-offset": [
				X,
				Q,
				Z
			] }],
			"outline-w": [{ outline: [
				"",
				X,
				Ho,
				Fo
			] }],
			"outline-color": [{ outline: T() }],
			shadow: [{ shadow: [
				"",
				"inner",
				"none",
				u,
				qo,
				Vo
			] }],
			"shadow-color": [{ shadow: T() }],
			"inset-shadow": [{ "inset-shadow": [
				"none",
				d,
				qo,
				Vo
			] }],
			"inset-shadow-color": [{ "inset-shadow": T() }],
			"ring-w": [{ ring: E() }],
			"ring-w-inset": ["ring-inset"],
			"ring-color": [{ ring: T() }],
			"ring-offset-w": [{ "ring-offset": [X, Fo] }],
			"ring-offset-color": [{ "ring-offset": T() }],
			"inset-ring-w": [{ "inset-ring": E() }],
			"inset-ring-color": [{ "inset-ring": T() }],
			"text-shadow": [{ "text-shadow": [
				"none",
				f,
				qo,
				Vo
			] }],
			"text-shadow-color": [{ "text-shadow": T() }],
			opacity: [{ opacity: [
				X,
				Q,
				Z
			] }],
			"mix-blend": [{ "mix-blend": [
				...ge(),
				"plus-darker",
				"plus-lighter"
			] }],
			"bg-blend": [{ "bg-blend": ge() }],
			"mask-clip": [{ "mask-clip": [
				"border",
				"padding",
				"content",
				"fill",
				"stroke",
				"view"
			] }, "mask-no-clip"],
			"mask-composite": [{ mask: [
				"add",
				"subtract",
				"intersect",
				"exclude"
			] }],
			"mask-image-linear-pos": [{ "mask-linear": [X] }],
			"mask-image-linear-from-pos": [{ "mask-linear-from": O() }],
			"mask-image-linear-to-pos": [{ "mask-linear-to": O() }],
			"mask-image-linear-from-color": [{ "mask-linear-from": T() }],
			"mask-image-linear-to-color": [{ "mask-linear-to": T() }],
			"mask-image-t-from-pos": [{ "mask-t-from": O() }],
			"mask-image-t-to-pos": [{ "mask-t-to": O() }],
			"mask-image-t-from-color": [{ "mask-t-from": T() }],
			"mask-image-t-to-color": [{ "mask-t-to": T() }],
			"mask-image-r-from-pos": [{ "mask-r-from": O() }],
			"mask-image-r-to-pos": [{ "mask-r-to": O() }],
			"mask-image-r-from-color": [{ "mask-r-from": T() }],
			"mask-image-r-to-color": [{ "mask-r-to": T() }],
			"mask-image-b-from-pos": [{ "mask-b-from": O() }],
			"mask-image-b-to-pos": [{ "mask-b-to": O() }],
			"mask-image-b-from-color": [{ "mask-b-from": T() }],
			"mask-image-b-to-color": [{ "mask-b-to": T() }],
			"mask-image-l-from-pos": [{ "mask-l-from": O() }],
			"mask-image-l-to-pos": [{ "mask-l-to": O() }],
			"mask-image-l-from-color": [{ "mask-l-from": T() }],
			"mask-image-l-to-color": [{ "mask-l-to": T() }],
			"mask-image-x-from-pos": [{ "mask-x-from": O() }],
			"mask-image-x-to-pos": [{ "mask-x-to": O() }],
			"mask-image-x-from-color": [{ "mask-x-from": T() }],
			"mask-image-x-to-color": [{ "mask-x-to": T() }],
			"mask-image-y-from-pos": [{ "mask-y-from": O() }],
			"mask-image-y-to-pos": [{ "mask-y-to": O() }],
			"mask-image-y-from-color": [{ "mask-y-from": T() }],
			"mask-image-y-to-color": [{ "mask-y-to": T() }],
			"mask-image-radial": [{ "mask-radial": [Q, Z] }],
			"mask-image-radial-from-pos": [{ "mask-radial-from": O() }],
			"mask-image-radial-to-pos": [{ "mask-radial-to": O() }],
			"mask-image-radial-from-color": [{ "mask-radial-from": T() }],
			"mask-image-radial-to-color": [{ "mask-radial-to": T() }],
			"mask-image-radial-shape": [{ "mask-radial": ["circle", "ellipse"] }],
			"mask-image-radial-size": [{ "mask-radial": [{
				closest: ["side", "corner"],
				farthest: ["side", "corner"]
			}] }],
			"mask-image-radial-pos": [{ "mask-radial-at": b() }],
			"mask-image-conic-pos": [{ "mask-conic": [X] }],
			"mask-image-conic-from-pos": [{ "mask-conic-from": O() }],
			"mask-image-conic-to-pos": [{ "mask-conic-to": O() }],
			"mask-image-conic-from-color": [{ "mask-conic-from": T() }],
			"mask-image-conic-to-color": [{ "mask-conic-to": T() }],
			"mask-mode": [{ mask: [
				"alpha",
				"luminance",
				"match"
			] }],
			"mask-origin": [{ "mask-origin": [
				"border",
				"padding",
				"content",
				"fill",
				"stroke",
				"view"
			] }],
			"mask-position": [{ mask: de() }],
			"mask-repeat": [{ mask: fe() }],
			"mask-size": [{ mask: pe() }],
			"mask-type": [{ "mask-type": ["alpha", "luminance"] }],
			"mask-image": [{ mask: [
				"none",
				Q,
				Z
			] }],
			filter: [{ filter: [
				"",
				"none",
				Q,
				Z
			] }],
			blur: [{ blur: _e() }],
			brightness: [{ brightness: [
				X,
				Q,
				Z
			] }],
			contrast: [{ contrast: [
				X,
				Q,
				Z
			] }],
			"drop-shadow": [{ "drop-shadow": [
				"",
				"none",
				p,
				qo,
				Vo
			] }],
			"drop-shadow-color": [{ "drop-shadow": T() }],
			grayscale: [{ grayscale: [
				"",
				X,
				Q,
				Z
			] }],
			"hue-rotate": [{ "hue-rotate": [
				X,
				Q,
				Z
			] }],
			invert: [{ invert: [
				"",
				X,
				Q,
				Z
			] }],
			saturate: [{ saturate: [
				X,
				Q,
				Z
			] }],
			sepia: [{ sepia: [
				"",
				X,
				Q,
				Z
			] }],
			"backdrop-filter": [{ "backdrop-filter": [
				"",
				"none",
				Q,
				Z
			] }],
			"backdrop-blur": [{ "backdrop-blur": _e() }],
			"backdrop-brightness": [{ "backdrop-brightness": [
				X,
				Q,
				Z
			] }],
			"backdrop-contrast": [{ "backdrop-contrast": [
				X,
				Q,
				Z
			] }],
			"backdrop-grayscale": [{ "backdrop-grayscale": [
				"",
				X,
				Q,
				Z
			] }],
			"backdrop-hue-rotate": [{ "backdrop-hue-rotate": [
				X,
				Q,
				Z
			] }],
			"backdrop-invert": [{ "backdrop-invert": [
				"",
				X,
				Q,
				Z
			] }],
			"backdrop-opacity": [{ "backdrop-opacity": [
				X,
				Q,
				Z
			] }],
			"backdrop-saturate": [{ "backdrop-saturate": [
				X,
				Q,
				Z
			] }],
			"backdrop-sepia": [{ "backdrop-sepia": [
				"",
				X,
				Q,
				Z
			] }],
			"border-collapse": [{ border: ["collapse", "separate"] }],
			"border-spacing": [{ "border-spacing": C() }],
			"border-spacing-x": [{ "border-spacing-x": C() }],
			"border-spacing-y": [{ "border-spacing-y": C() }],
			"table-layout": [{ table: ["auto", "fixed"] }],
			caption: [{ caption: ["top", "bottom"] }],
			transition: [{ transition: [
				"",
				"all",
				"colors",
				"opacity",
				"shadow",
				"transform",
				"none",
				Q,
				Z
			] }],
			"transition-behavior": [{ transition: ["normal", "discrete"] }],
			duration: [{ duration: [
				X,
				"initial",
				Q,
				Z
			] }],
			ease: [{ ease: [
				"linear",
				"initial",
				_,
				Q,
				Z
			] }],
			delay: [{ delay: [
				X,
				Q,
				Z
			] }],
			animate: [{ animate: [
				"none",
				v,
				Q,
				Z
			] }],
			backface: [{ backface: ["hidden", "visible"] }],
			perspective: [{ perspective: [
				h,
				Q,
				Z
			] }],
			"perspective-origin": [{ "perspective-origin": x() }],
			rotate: [{ rotate: ve() }],
			"rotate-x": [{ "rotate-x": ve() }],
			"rotate-y": [{ "rotate-y": ve() }],
			"rotate-z": [{ "rotate-z": ve() }],
			scale: [{ scale: ye() }],
			"scale-x": [{ "scale-x": ye() }],
			"scale-y": [{ "scale-y": ye() }],
			"scale-z": [{ "scale-z": ye() }],
			"scale-3d": ["scale-3d"],
			skew: [{ skew: be() }],
			"skew-x": [{ "skew-x": be() }],
			"skew-y": [{ "skew-y": be() }],
			transform: [{ transform: [
				Q,
				Z,
				"",
				"none",
				"gpu",
				"cpu"
			] }],
			"transform-origin": [{ origin: x() }],
			"transform-style": [{ transform: ["3d", "flat"] }],
			translate: [{ translate: xe() }],
			"translate-x": [{ "translate-x": xe() }],
			"translate-y": [{ "translate-y": xe() }],
			"translate-z": [{ "translate-z": xe() }],
			"translate-none": ["translate-none"],
			zoom: [{ zoom: [
				wo,
				Q,
				Z
			] }],
			accent: [{ accent: T() }],
			appearance: [{ appearance: ["none", "auto"] }],
			"caret-color": [{ caret: T() }],
			"color-scheme": [{ scheme: [
				"normal",
				"dark",
				"light",
				"light-dark",
				"only-dark",
				"only-light"
			] }],
			cursor: [{ cursor: [
				"auto",
				"default",
				"pointer",
				"wait",
				"text",
				"move",
				"help",
				"not-allowed",
				"none",
				"context-menu",
				"progress",
				"cell",
				"crosshair",
				"vertical-text",
				"alias",
				"copy",
				"no-drop",
				"grab",
				"grabbing",
				"all-scroll",
				"col-resize",
				"row-resize",
				"n-resize",
				"e-resize",
				"s-resize",
				"w-resize",
				"ne-resize",
				"nw-resize",
				"se-resize",
				"sw-resize",
				"ew-resize",
				"ns-resize",
				"nesw-resize",
				"nwse-resize",
				"zoom-in",
				"zoom-out",
				Q,
				Z
			] }],
			"field-sizing": [{ "field-sizing": ["fixed", "content"] }],
			"pointer-events": [{ "pointer-events": ["auto", "none"] }],
			resize: [{ resize: [
				"none",
				"",
				"y",
				"x"
			] }],
			"scroll-behavior": [{ scroll: ["auto", "smooth"] }],
			"scrollbar-thumb-color": [{ "scrollbar-thumb": T() }],
			"scrollbar-track-color": [{ "scrollbar-track": T() }],
			"scrollbar-gutter": [{ "scrollbar-gutter": [
				"auto",
				"stable",
				"both"
			] }],
			"scrollbar-w": [{ scrollbar: [
				"auto",
				"thin",
				"none"
			] }],
			"scroll-m": [{ "scroll-m": C() }],
			"scroll-mx": [{ "scroll-mx": C() }],
			"scroll-my": [{ "scroll-my": C() }],
			"scroll-ms": [{ "scroll-ms": C() }],
			"scroll-me": [{ "scroll-me": C() }],
			"scroll-mbs": [{ "scroll-mbs": C() }],
			"scroll-mbe": [{ "scroll-mbe": C() }],
			"scroll-mt": [{ "scroll-mt": C() }],
			"scroll-mr": [{ "scroll-mr": C() }],
			"scroll-mb": [{ "scroll-mb": C() }],
			"scroll-ml": [{ "scroll-ml": C() }],
			"scroll-p": [{ "scroll-p": C() }],
			"scroll-px": [{ "scroll-px": C() }],
			"scroll-py": [{ "scroll-py": C() }],
			"scroll-ps": [{ "scroll-ps": C() }],
			"scroll-pe": [{ "scroll-pe": C() }],
			"scroll-pbs": [{ "scroll-pbs": C() }],
			"scroll-pbe": [{ "scroll-pbe": C() }],
			"scroll-pt": [{ "scroll-pt": C() }],
			"scroll-pr": [{ "scroll-pr": C() }],
			"scroll-pb": [{ "scroll-pb": C() }],
			"scroll-pl": [{ "scroll-pl": C() }],
			"snap-align": [{ snap: [
				"start",
				"end",
				"center",
				"align-none"
			] }],
			"snap-stop": [{ snap: ["normal", "always"] }],
			"snap-type": [{ snap: [
				"none",
				"x",
				"y",
				"both"
			] }],
			"snap-strictness": [{ snap: ["mandatory", "proximity"] }],
			touch: [{ touch: [
				"auto",
				"none",
				"manipulation"
			] }],
			"touch-x": [{ "touch-pan": [
				"x",
				"left",
				"right"
			] }],
			"touch-y": [{ "touch-pan": [
				"y",
				"up",
				"down"
			] }],
			"touch-pz": ["touch-pinch-zoom"],
			select: [{ select: [
				"none",
				"text",
				"all",
				"auto"
			] }],
			"will-change": [{ "will-change": [
				"auto",
				"scroll",
				"contents",
				"transform",
				Q,
				Z
			] }],
			fill: [{ fill: ["none", ...T()] }],
			"stroke-w": [{ stroke: [
				X,
				Ho,
				Fo,
				Io
			] }],
			stroke: [{ stroke: ["none", ...T()] }],
			"forced-color-adjust": [{ "forced-color-adjust": ["auto", "none"] }]
		},
		conflictingClassGroups: {
			"container-named": ["container-type"],
			overflow: ["overflow-x", "overflow-y"],
			overscroll: ["overscroll-x", "overscroll-y"],
			inset: [
				"inset-x",
				"inset-y",
				"inset-bs",
				"inset-be",
				"start",
				"end",
				"top",
				"right",
				"bottom",
				"left"
			],
			"inset-x": [
				"start",
				"end",
				"right",
				"left"
			],
			"inset-y": [
				"inset-bs",
				"inset-be",
				"top",
				"bottom"
			],
			flex: [
				"basis",
				"grow",
				"shrink"
			],
			gap: ["gap-x", "gap-y"],
			p: [
				"px",
				"py",
				"ps",
				"pe",
				"pbs",
				"pbe",
				"pt",
				"pr",
				"pb",
				"pl"
			],
			px: [
				"ps",
				"pe",
				"pr",
				"pl"
			],
			py: [
				"pbs",
				"pbe",
				"pt",
				"pb"
			],
			m: [
				"mx",
				"my",
				"ms",
				"me",
				"mbs",
				"mbe",
				"mt",
				"mr",
				"mb",
				"ml"
			],
			mx: [
				"ms",
				"me",
				"mr",
				"ml"
			],
			my: [
				"mbs",
				"mbe",
				"mt",
				"mb"
			],
			size: ["w", "h"],
			"font-size": ["leading"],
			"fvn-normal": [
				"fvn-ordinal",
				"fvn-slashed-zero",
				"fvn-figure",
				"fvn-spacing",
				"fvn-fraction"
			],
			"fvn-ordinal": ["fvn-normal"],
			"fvn-slashed-zero": ["fvn-normal"],
			"fvn-figure": ["fvn-normal"],
			"fvn-spacing": ["fvn-normal"],
			"fvn-fraction": ["fvn-normal"],
			"line-clamp": ["display", "overflow"],
			rounded: [
				"rounded-s",
				"rounded-e",
				"rounded-t",
				"rounded-r",
				"rounded-b",
				"rounded-l",
				"rounded-ss",
				"rounded-se",
				"rounded-ee",
				"rounded-es",
				"rounded-tl",
				"rounded-tr",
				"rounded-br",
				"rounded-bl"
			],
			"rounded-s": ["rounded-ss", "rounded-es"],
			"rounded-e": ["rounded-se", "rounded-ee"],
			"rounded-t": ["rounded-tl", "rounded-tr"],
			"rounded-r": ["rounded-tr", "rounded-br"],
			"rounded-b": ["rounded-br", "rounded-bl"],
			"rounded-l": ["rounded-tl", "rounded-bl"],
			"border-spacing": ["border-spacing-x", "border-spacing-y"],
			"border-w": [
				"border-w-x",
				"border-w-y",
				"border-w-s",
				"border-w-e",
				"border-w-bs",
				"border-w-be",
				"border-w-t",
				"border-w-r",
				"border-w-b",
				"border-w-l"
			],
			"border-w-x": [
				"border-w-s",
				"border-w-e",
				"border-w-r",
				"border-w-l"
			],
			"border-w-y": [
				"border-w-bs",
				"border-w-be",
				"border-w-t",
				"border-w-b"
			],
			"border-color": [
				"border-color-x",
				"border-color-y",
				"border-color-s",
				"border-color-e",
				"border-color-bs",
				"border-color-be",
				"border-color-t",
				"border-color-r",
				"border-color-b",
				"border-color-l"
			],
			"border-color-x": [
				"border-color-s",
				"border-color-e",
				"border-color-r",
				"border-color-l"
			],
			"border-color-y": [
				"border-color-bs",
				"border-color-be",
				"border-color-t",
				"border-color-b"
			],
			translate: [
				"translate-x",
				"translate-y",
				"translate-none"
			],
			"translate-none": [
				"translate",
				"translate-x",
				"translate-y",
				"translate-z"
			],
			"scroll-m": [
				"scroll-mx",
				"scroll-my",
				"scroll-ms",
				"scroll-me",
				"scroll-mbs",
				"scroll-mbe",
				"scroll-mt",
				"scroll-mr",
				"scroll-mb",
				"scroll-ml"
			],
			"scroll-mx": [
				"scroll-ms",
				"scroll-me",
				"scroll-mr",
				"scroll-ml"
			],
			"scroll-my": [
				"scroll-mbs",
				"scroll-mbe",
				"scroll-mt",
				"scroll-mb"
			],
			"scroll-p": [
				"scroll-px",
				"scroll-py",
				"scroll-ps",
				"scroll-pe",
				"scroll-pbs",
				"scroll-pbe",
				"scroll-pt",
				"scroll-pr",
				"scroll-pb",
				"scroll-pl"
			],
			"scroll-px": [
				"scroll-ps",
				"scroll-pe",
				"scroll-pr",
				"scroll-pl"
			],
			"scroll-py": [
				"scroll-pbs",
				"scroll-pbe",
				"scroll-pt",
				"scroll-pb"
			],
			touch: [
				"touch-x",
				"touch-y",
				"touch-pz"
			],
			"touch-x": ["touch"],
			"touch-y": ["touch"],
			"touch-pz": ["touch"]
		},
		conflictingClassGroupModifiers: { "font-size": ["leading"] },
		postfixLookupClassGroups: ["container-type"],
		orderSensitiveModifiers: [
			"*",
			"**",
			"after",
			"backdrop",
			"before",
			"details-content",
			"file",
			"first-letter",
			"first-line",
			"marker",
			"placeholder",
			"selection"
		]
	};
}, os = (e, { cacheSize: t, prefix: n, experimentalParseClassName: r, extend: i = {}, override: a = {} }) => (ss(e, "cacheSize", t), ss(e, "prefix", n), ss(e, "experimentalParseClassName", r), cs(e.theme, a.theme), cs(e.classGroups, a.classGroups), cs(e.conflictingClassGroups, a.conflictingClassGroups), cs(e.conflictingClassGroupModifiers, a.conflictingClassGroupModifiers), ss(e, "postfixLookupClassGroups", a.postfixLookupClassGroups), ss(e, "orderSensitiveModifiers", a.orderSensitiveModifiers), ls(e.theme, i.theme), ls(e.classGroups, i.classGroups), ls(e.conflictingClassGroups, i.conflictingClassGroups), ls(e.conflictingClassGroupModifiers, i.conflictingClassGroupModifiers), us(e, i, "postfixLookupClassGroups"), us(e, i, "orderSensitiveModifiers"), e), ss = (e, t, n) => {
	n !== void 0 && (e[t] = n);
}, cs = (e, t) => {
	if (t) for (let n in t) ss(e, n, t[n]);
}, ls = (e, t) => {
	if (t) for (let n in t) us(e, t, n);
}, us = (e, t, n) => {
	let r = t[n];
	r !== void 0 && (e[n] = e[n] ? e[n].concat(r) : r);
}, ds = ((e, ...t) => typeof e == "function" ? fo(as, e, ...t) : fo(() => os(as(), e), ...t))({
	prefix: "tw",
	extend: { theme: {
		radius: [
			"button",
			"control",
			"surface"
		],
		shadow: [
			"edge",
			"edge-raised",
			"soft",
			"lift"
		]
	} }
});
function fs(...e) {
	return ds(ki(e));
}
// svelte/lib/ui/Avatar.svelte
var ps = /* @__PURE__ */ W("<img alt=\"\" class=\"tw:size-full tw:object-cover\"/>"), ms = /* @__PURE__ */ W("<span aria-hidden=\"true\"><!></span>");
function hs(e, t) {
	M(t, !0);
	let n = /* @__PURE__ */ L(!1);
	Dn(() => {
		t.src, R(n, !1);
	});
	let r = /* @__PURE__ */ F(() => t.name.trim().split(/[\s@._-]+/).filter(Boolean).slice(0, 2).map((e) => Array.from(e)[0]).join("").toLocaleUpperCase());
	var i = ms(), a = z(i), o = (e) => {
		var r = ps();
		Fn(() => ra(r, "src", t.src)), Vr("error", r, () => {
			R(n, !0);
		}), Rr(r), K(e, r);
	}, s = (e) => {
		var t = $r();
		Fn(() => ai(t, U(r) || "?")), K(e, t);
	};
	q(a, (e) => {
		t.src && !U(n) ? e(o) : e(s, -1);
	}), j(i), Fn((e) => Ii(i, 1, e), [() => Ai(fs("tw:inline-grid tw:size-8 tw:shrink-0 tw:place-items-center tw:overflow-hidden tw:rounded-full tw:border tw:border-border tw:bg-muted tw:font-sans tw:text-xs tw:font-medium tw:text-foreground", t.class))]), K(e, i), N();
}
// ../vibebook/node_modules/svelte-toolbelt/dist/utils/is.js
function gs(e) {
	return typeof e == "function";
}
function _s(e) {
	return typeof e == "object" && !!e;
}
var vs = [
	"string",
	"number",
	"bigint",
	"boolean"
];
function ys(e) {
	return e == null || vs.includes(typeof e) ? !0 : Array.isArray(e) ? e.every((e) => ys(e)) : typeof e == "object" && Object.getPrototypeOf(e) === Object.prototype;
}
// ../vibebook/node_modules/svelte-toolbelt/dist/box/box-extras.svelte.js
var bs = Symbol("box"), xs = Symbol("is-writable");
function $(e, t) {
	let n = /* @__PURE__ */ F(e);
	return t ? {
		[bs]: !0,
		[xs]: !0,
		get current() {
			return U(n);
		},
		set current(e) {
			t(e);
		}
	} : {
		[bs]: !0,
		get current() {
			return e();
		}
	};
}
function Ss(e) {
	return _s(e) && bs in e;
}
function Cs(e) {
	return Ss(e) && xs in e;
}
function ws(e) {
	return Ss(e) ? e : gs(e) ? $(e) : Ds(e);
}
function Ts(e) {
	return Object.entries(e).reduce((e, [t, n]) => Ss(n) ? (Cs(n) ? Object.defineProperty(e, t, {
		get() {
			return n.current;
		},
		set(e) {
			n.current = e;
		}
	}) : Object.defineProperty(e, t, { get() {
		return n.current;
	} }), e) : Object.assign(e, { [t]: n }), {});
}
function Es(e) {
	return Cs(e) ? {
		[bs]: !0,
		get current() {
			return e.current;
		}
	} : e;
}
function Ds(e) {
	let t = /* @__PURE__ */ L(nn(e));
	return {
		[bs]: !0,
		[xs]: !0,
		get current() {
			return U(t);
		},
		set current(e) {
			R(t, e, !0);
		}
	};
}
// ../vibebook/node_modules/svelte-toolbelt/dist/box/box.svelte.js
function Os(e) {
	let t = /* @__PURE__ */ L(nn(e));
	return {
		[bs]: !0,
		[xs]: !0,
		get current() {
			return U(t);
		},
		set current(e) {
			R(t, e, !0);
		}
	};
}
Os.from = ws, Os.with = $, Os.flatten = Ts, Os.readonly = Es, Os.isBox = Ss, Os.isWritableBox = Cs;
// ../vibebook/node_modules/svelte-toolbelt/dist/utils/compose-handlers.js
function ks(...e) {
	return function(t) {
		for (let n of e) if (n) {
			if (t.defaultPrevented) return;
			typeof n == "function" ? n.call(this, t) : n.current?.call(this, t);
		}
	};
}
// ../vibebook/node_modules/inline-style-parser/esm/index.mjs
var As = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g, js = /\n/g, Ms = /^\s*/, Ns = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/, Ps = /^:\s*/, Fs = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/, Is = /^[;\s]*/, Ls = /^\s+|\s+$/g, Rs = "\n", zs = "/", Bs = "*", Vs = "", Hs = "comment", Us = "declaration";
function Ws(e, t) {
	if (typeof e != "string") throw TypeError("First argument must be a string");
	if (!e) return [];
	t ||= {};
	var n = 1, r = 1;
	function i(e) {
		var t = e.match(js);
		t && (n += t.length);
		var i = e.lastIndexOf(Rs);
		r = ~i ? e.length - i : r + e.length;
	}
	function a() {
		var e = {
			line: n,
			column: r
		};
		return function(t) {
			return t.position = new o(e), l(), t;
		};
	}
	function o(e) {
		this.start = e, this.end = {
			line: n,
			column: r
		}, this.source = t.source;
	}
	o.prototype.content = e;
	function s(i) {
		var a = /* @__PURE__ */ Error(t.source + ":" + n + ":" + r + ": " + i);
		if (a.reason = i, a.filename = t.source, a.line = n, a.column = r, a.source = e, !t.silent) throw a;
	}
	function c(t) {
		var n = t.exec(e);
		if (n) {
			var r = n[0];
			return i(r), e = e.slice(r.length), n;
		}
	}
	function l() {
		c(Ms);
	}
	function u(e) {
		var t;
		for (e ||= []; t = d();) t !== !1 && e.push(t);
		return e;
	}
	function d() {
		var t = a();
		if (zs == e.charAt(0) && Bs == e.charAt(1)) {
			for (var n = 2; Vs != e.charAt(n) && (Bs != e.charAt(n) || zs != e.charAt(n + 1));) ++n;
			if (n += 2, Vs === e.charAt(n - 1)) return s("End of comment missing");
			var o = e.slice(2, n - 2);
			return r += 2, i(o), e = e.slice(n), r += 2, t({
				type: Hs,
				comment: o
			});
		}
	}
	function f() {
		var e = a(), t = c(Ns);
		if (t) {
			if (d(), !c(Ps)) return s("property missing ':'");
			var n = c(Fs), r = e({
				type: Us,
				property: Gs(t[0].replace(As, Vs)),
				value: n ? Gs(n[0].replace(As, Vs)) : Vs
			});
			return c(Is), r;
		}
	}
	function p() {
		var e = [];
		u(e);
		for (var t; t = f();) t !== !1 && (e.push(t), u(e));
		return e;
	}
	return l(), p();
}
function Gs(e) {
	return e ? e.replace(Ls, Vs) : Vs;
}
// ../vibebook/node_modules/style-to-object/esm/index.mjs
function Ks(e, t) {
	let n = null;
	if (!e || typeof e != "string") return n;
	let r = Ws(e), i = typeof t == "function";
	return r.forEach((e) => {
		if (e.type !== "declaration") return;
		let { property: r, value: a } = e;
		i ? t(r, a, e) : a && (n ||= {}, n[r] = a);
	}), n;
}
// ../vibebook/node_modules/svelte-toolbelt/dist/utils/strings.js
var qs = /\d/, Js = [
	"-",
	"_",
	"/",
	"."
];
function Ys(e = "") {
	if (!qs.test(e)) return e !== e.toLowerCase();
}
function Xs(e) {
	let t = [], n = "", r, i;
	for (let a of e) {
		let e = Js.includes(a);
		if (e === !0) {
			t.push(n), n = "", r = void 0;
			continue;
		}
		let o = Ys(a);
		if (i === !1) {
			if (r === !1 && o === !0) {
				t.push(n), n = a, r = o;
				continue;
			}
			if (r === !0 && o === !1 && n.length > 1) {
				let e = n.at(-1);
				t.push(n.slice(0, Math.max(0, n.length - 1))), n = e + a, r = o;
				continue;
			}
		}
		n += a, r = o, i = e;
	}
	return t.push(n), t;
}
function Zs(e) {
	return e ? Xs(e).map((e) => $s(e)).join("") : "";
}
function Qs(e) {
	return ec(Zs(e || ""));
}
function $s(e) {
	return e ? e[0].toUpperCase() + e.slice(1) : "";
}
function ec(e) {
	return e ? e[0].toLowerCase() + e.slice(1) : "";
}
// ../vibebook/node_modules/svelte-toolbelt/dist/utils/css-to-style-obj.js
var tc = 1e3, nc = /* @__PURE__ */ new Map();
function rc(e) {
	let t = nc.get(e);
	return t === void 0 && (t = e.startsWith("-moz-") || e.startsWith("-webkit-") || e.startsWith("-ms-") || e.startsWith("-o-") ? Zs(e) : e.startsWith("--") ? e : Qs(e), nc.size >= tc && nc.clear(), nc.set(e, t)), t;
}
var ic = /["'\\{}]|\/\*/, ac = /^[-\w]+$/;
function oc(e) {
	if (ic.test(e)) return null;
	let t = [], n = 0, r = 0, i = -1;
	for (let a = 0; a <= e.length; a++) {
		let o = a < e.length ? e.charCodeAt(a) : 59;
		if (o === 40) n++;
		else if (o === 41) {
			if (--n < 0) return null;
		} else if (o === 58) i < 0 && (i = a);
		else if (o === 59) {
			if (n !== 0) return null;
			let o = e.slice(r, a);
			if (i < 0) {
				if (o.trim() || t.length === 0) return null;
			} else {
				let n = e.slice(r, i).trim(), o = e.slice(i + 1, a).trim();
				if (!ac.test(n) || !o) return null;
				t.push(n, o);
			}
			r = a + 1, i = -1;
		}
	}
	return t;
}
function sc(e, t) {
	let n = oc(t);
	if (n) for (let t = 0; t < n.length; t += 2) e[rc(n[t])] = n[t + 1];
	else Ks(t, (t, n) => {
		e[rc(t)] = n;
	});
}
function cc(e) {
	if (!e) return {};
	let t = {};
	return sc(t, e), t;
}
// ../vibebook/node_modules/svelte-toolbelt/dist/utils/execute-callbacks.js
function lc(...e) {
	return (...t) => {
		for (let n of e) typeof n == "function" && n(...t);
	};
}
// ../vibebook/node_modules/svelte-toolbelt/dist/utils/style-to-css.js
function uc(e, t) {
	let n = RegExp(e, "g");
	return (e) => {
		if (typeof e != "string") throw TypeError(`expected an argument of type string, but got ${typeof e}`);
		return e.match(n) ? e.replace(n, t) : e;
	};
}
var dc = uc(/[A-Z]/, (e) => `-${e.toLowerCase()}`), fc = /* @__PURE__ */ new Map();
function pc(e) {
	let t = fc.get(e);
	return t === void 0 && (t = dc(e), fc.size >= 1e3 && fc.clear(), fc.set(e, t)), t;
}
function mc(e) {
	if (!e || typeof e != "object" || Array.isArray(e)) throw TypeError(`expected an argument of type object, but got ${typeof e}`);
	let t = "";
	for (let n of Object.keys(e)) {
		let r = e[n];
		r != null && r !== "" && (t += `${t ? "\n" : ""}${pc(n)}: ${r};`);
	}
	return t;
}
// ../vibebook/node_modules/svelte-toolbelt/dist/utils/style.js
function hc(e = {}) {
	return mc(e).replace("\n", " ");
}
var gc = new Set(/* @__PURE__ */ "onabort.onanimationcancel.onanimationend.onanimationiteration.onanimationstart.onauxclick.onbeforeinput.onbeforetoggle.onblur.oncancel.oncanplay.oncanplaythrough.onchange.onclick.onclose.oncompositionend.oncompositionstart.oncompositionupdate.oncontextlost.oncontextmenu.oncontextrestored.oncopy.oncuechange.oncut.ondblclick.ondrag.ondragend.ondragenter.ondragleave.ondragover.ondragstart.ondrop.ondurationchange.onemptied.onended.onerror.onfocus.onfocusin.onfocusout.onformdata.ongotpointercapture.oninput.oninvalid.onkeydown.onkeypress.onkeyup.onload.onloadeddata.onloadedmetadata.onloadstart.onlostpointercapture.onmousedown.onmouseenter.onmouseleave.onmousemove.onmouseout.onmouseover.onmouseup.onpaste.onpause.onplay.onplaying.onpointercancel.onpointerdown.onpointerenter.onpointerleave.onpointermove.onpointerout.onpointerover.onpointerup.onprogress.onratechange.onreset.onresize.onscroll.onscrollend.onsecuritypolicyviolation.onseeked.onseeking.onselect.onselectionchange.onselectstart.onslotchange.onstalled.onsubmit.onsuspend.ontimeupdate.ontoggle.ontouchcancel.ontouchend.ontouchmove.ontouchstart.ontransitioncancel.ontransitionend.ontransitionrun.ontransitionstart.onvolumechange.onwaiting.onwebkitanimationend.onwebkitanimationiteration.onwebkitanimationstart.onwebkittransitionend.onwheel".split("."));
// ../vibebook/node_modules/svelte-toolbelt/dist/utils/merge-props.js
function _c(e) {
	return gc.has(e);
}
function vc(...e) {
	let t = { ...e[0] };
	for (let n = 1; n < e.length; n++) {
		let r = e[n];
		if (r) {
			for (let e of Object.keys(r)) {
				let n = t[e], i = r[e], a = typeof n == "function", o = typeof i == "function";
				if (a && o && _c(e)) t[e] = ks(n, i);
				else if (a && o) t[e] = lc(n, i);
				else if (e === "class") {
					let r = ys(n), a = ys(i);
					r && a ? t[e] = ki(n, i) : r ? t[e] = ki(n) : a && (t[e] = ki(i));
				} else if (e === "style") {
					let r = typeof n == "object", a = typeof i == "object", o = typeof n == "string", s = typeof i == "string";
					if (r && a) t[e] = {
						...n,
						...i
					};
					else if (r && s) {
						let r = cc(i);
						t[e] = {
							...n,
							...r
						};
					} else if (o && a) t[e] = {
						...cc(n),
						...i
					};
					else if (o && s) {
						let r = cc(n), a = cc(i);
						t[e] = {
							...r,
							...a
						};
					} else r ? t[e] = n : a ? t[e] = i : o ? t[e] = n : s && (t[e] = i);
				} else t[e] = i === void 0 ? n : i;
			}
			for (let e of Object.getOwnPropertySymbols(r)) {
				let n = t[e], i = r[e];
				t[e] = i === void 0 ? n : i;
			}
		}
	}
	return typeof t.style == "object" && (t.style = hc(t.style).replaceAll("\n", " ")), t.hidden === !1 && (t.hidden = void 0, delete t.hidden), t.disabled === !1 && (t.disabled = void 0, delete t.disabled), t;
}
// ../vibebook/node_modules/runed/dist/internal/configurable-globals.js
var yc = typeof window < "u" ? window : void 0;
typeof window < "u" && window.document, typeof window < "u" && window.navigator, typeof window < "u" && window.location;
// ../vibebook/node_modules/runed/dist/internal/utils/dom.js
function bc(e) {
	let t = e.activeElement;
	for (; t?.shadowRoot;) {
		let e = t.shadowRoot.activeElement;
		if (e === t) break;
		t = e;
	}
	return t;
}
// ../vibebook/node_modules/svelte/src/reactivity/map.js
var xc = class extends Map {
	#e = /* @__PURE__ */ new Map();
	#t = /* @__PURE__ */ L(0);
	#n = /* @__PURE__ */ L(0);
	#r = ur || -1;
	constructor(e) {
		if (super(), e) {
			for (var [t, n] of e) super.set(t, n);
			this.#n.v = super.size;
		}
	}
	#i(e) {
		return ur === this.#r ? /* @__PURE__ */ L(e) : qt(e);
	}
	has(e) {
		var t = this.#e, n = t.get(e);
		if (n === void 0) {
			if (super.has(e)) n = this.#i(0), t.set(e, n);
			else return U(this.#t), !1;
		}
		return U(n), !0;
	}
	forEach(e, t) {
		this.#a(), super.forEach(e, t);
	}
	get(e) {
		var t = this.#e, n = t.get(e);
		if (n === void 0) {
			if (super.has(e)) n = this.#i(0), t.set(e, n);
			else {
				U(this.#t);
				return;
			}
		}
		return U(n), super.get(e);
	}
	getOrInsert(e, t) {
		return super.has(e) || this.set(e, t), this.get(e);
	}
	getOrInsertComputed(e, t) {
		return super.has(e) || this.set(e, t(e)), this.get(e);
	}
	set(e, t) {
		var n = this.#e, r = n.get(e), i = super.get(e), a = super.set(e, t), o = this.#t;
		if (r === void 0) r = this.#i(0), n.set(e, r), R(this.#n, super.size), en(o);
		else if (i !== t) {
			en(r);
			var s = o.reactions === null ? null : new Set(o.reactions);
			s !== null && r.reactions?.every((e) => s.has(e)) || en(o);
		}
		return a;
	}
	delete(e) {
		var t = this.#e, n = t.get(e), r = super.delete(e);
		return n !== void 0 && (t.delete(e), R(n, -1)), r && (R(this.#n, super.size), en(this.#t)), r;
	}
	clear() {
		if (super.size !== 0) {
			super.clear();
			var e = this.#e;
			R(this.#n, 0);
			for (var t of e.values()) R(t, -1);
			en(this.#t), e.clear();
		}
	}
	#a() {
		U(this.#t);
		var e = this.#e;
		if (this.#n.v !== e.size) {
			for (var t of super.keys()) if (!e.has(t)) {
				var n = this.#i(0);
				e.set(t, n);
			}
		}
		for ([, n] of this.#e) U(n);
	}
	keys() {
		return U(this.#t), super.keys();
	}
	values() {
		return this.#a(), super.values();
	}
	entries() {
		return this.#a(), super.entries();
	}
	[Symbol.iterator]() {
		return this.entries();
	}
	get size() {
		return U(this.#n), super.size;
	}
};
new class {
	#e;
	#t;
	constructor(e = {}) {
		let { window: t = yc, document: n = t?.document } = e;
		t !== void 0 && (this.#e = n, this.#t = ti((e) => {
			let n = Br(t, "focusin", e), r = Br(t, "focusout", e);
			return () => {
				n(), r();
			};
		}));
	}
	get current() {
		return this.#t?.(), this.#e ? bc(this.#e) : null;
	}
}();
// ../vibebook/node_modules/runed/dist/internal/utils/is.js
function Sc(e) {
	return typeof e == "function";
}
// ../vibebook/node_modules/runed/dist/utilities/context/context.js
var Cc = class {
	#e;
	#t;
	constructor(e) {
		this.#e = e, this.#t = Symbol(e);
	}
	get key() {
		return this.#t;
	}
	exists() {
		return Xe(this.#t);
	}
	get() {
		let e = Je(this.#t);
		if (e === void 0) throw Error(`Context "${this.#e}" not found`);
		return e;
	}
	getOr(e) {
		let t = Je(this.#t);
		return t === void 0 ? e : t;
	}
	set(e) {
		return Ye(this.#t, e);
	}
};
// ../vibebook/node_modules/runed/dist/utilities/watch/watch.svelte.js
function wc(e, t) {
	switch (e) {
		case "post":
			Dn(t);
			break;
		case "pre": kn(t);
	}
}
function Tc(e, t, n, r = {}) {
	let { lazy: i = !1 } = r, a = !i, o = Array.isArray(e) ? [] : void 0;
	wc(t, () => {
		let t = Array.isArray(e) ? e.map((e) => e()) : e();
		if (!a) {
			a = !0, o = t;
			return;
		}
		let r = Cr(() => n(t, o));
		return o = t, r;
	});
}
function Ec(e, t, n) {
	Tc(e, "post", t, n);
}
function Dc(e, t, n) {
	Tc(e, "pre", t, n);
}
Ec.pre = Dc;
// ../vibebook/node_modules/runed/dist/internal/utils/get.js
function Oc(e) {
	return Sc(e) ? e() : e;
}
// ../vibebook/node_modules/runed/dist/utilities/element-size/element-size.svelte.js
var kc = class {
	#e = {
		width: 0,
		height: 0
	};
	#t = !1;
	#n;
	#r;
	#i;
	#a = /* @__PURE__ */ F(() => (U(this.#s)?.(), this.getSize().width));
	#o = /* @__PURE__ */ F(() => (U(this.#s)?.(), this.getSize().height));
	#s = /* @__PURE__ */ F(() => {
		let e = Oc(this.#r);
		if (e) return ti((t) => {
			if (!this.#i) return;
			let n = new this.#i.ResizeObserver((e) => {
				this.#t = !0;
				for (let t of e) {
					let e = this.#n.box === "content-box" ? t.contentBoxSize : t.borderBoxSize, n = Array.isArray(e) ? e : [e];
					this.#e.width = n.reduce((e, t) => Math.max(e, t.inlineSize), 0), this.#e.height = n.reduce((e, t) => Math.max(e, t.blockSize), 0);
				}
				t();
			});
			return n.observe(e), () => {
				this.#t = !1, n.disconnect();
			};
		});
	});
	constructor(e, t = { box: "border-box" }) {
		this.#i = t.window ?? yc, this.#n = t, this.#r = e, this.#e = {
			width: 0,
			height: 0
		};
	}
	calculateSize() {
		let e = Oc(this.#r);
		if (!e || !this.#i) return;
		let t = e.offsetWidth, n = e.offsetHeight;
		if (this.#n.box === "border-box") return {
			width: t,
			height: n
		};
		let r = this.#i.getComputedStyle(e), i = parseFloat(r.paddingLeft) + parseFloat(r.paddingRight), a = parseFloat(r.paddingTop) + parseFloat(r.paddingBottom), o = parseFloat(r.borderLeftWidth) + parseFloat(r.borderRightWidth), s = parseFloat(r.borderTopWidth) + parseFloat(r.borderBottomWidth);
		return {
			width: t - i - o,
			height: n - a - s
		};
	}
	getSize() {
		return this.#t ? this.#e : this.calculateSize() ?? this.#e;
	}
	get current() {
		return U(this.#s)?.(), this.getSize();
	}
	get width() {
		return U(this.#a);
	}
	get height() {
		return U(this.#o);
	}
};
// ../vibebook/node_modules/svelte-toolbelt/dist/utils/on-destroy-effect.svelte.js
function Ac(e) {
	Dn(() => () => {
		e();
	});
}
// ../vibebook/node_modules/svelte-toolbelt/dist/utils/after-tick.js
function jc(e) {
	br().then(e);
}
// ../vibebook/node_modules/svelte-toolbelt/dist/utils/dom.js
var Mc = 1, Nc = 9, Pc = 11;
function Fc(e) {
	return _s(e) && e.nodeType === Mc && typeof e.nodeName == "string";
}
function Ic(e) {
	return _s(e) && e.nodeType === Nc;
}
function Lc(e) {
	return _s(e) && e.constructor?.name === "VisualViewport";
}
function Rc(e) {
	return _s(e) && e.nodeType !== void 0;
}
function zc(e) {
	return Rc(e) && e.nodeType === Pc && "host" in e;
}
function Bc(e, t) {
	if (!e || !t || !Fc(e) || !Fc(t)) return !1;
	let n = t.getRootNode?.();
	if (e === t || e.contains(t)) return !0;
	if (n && zc(n)) {
		let n = t;
		for (; n;) {
			if (e === n) return !0;
			n = n.parentNode || n.host;
		}
	}
	return !1;
}
function Vc(e) {
	return Ic(e) ? e : Lc(e) ? e.document : e?.ownerDocument ?? document;
}
function Hc(e) {
	return zc(e) ? Hc(e.host) : Ic(e) ? e.defaultView ?? window : Fc(e) ? e.ownerDocument?.defaultView ?? window : window;
}
function Uc(e) {
	let t = e.activeElement;
	for (; t?.shadowRoot;) {
		let e = t.shadowRoot.activeElement;
		if (e === t) break;
		t = e;
	}
	return t;
}
// ../vibebook/node_modules/svelte-toolbelt/dist/utils/dom-context.svelte.js
var Wc = class {
	element;
	#e = /* @__PURE__ */ F(() => this.element.current ? this.element.current.getRootNode() ?? document : document);
	get root() {
		return U(this.#e);
	}
	set root(e) {
		R(this.#e, e);
	}
	constructor(e) {
		this.element = typeof e == "function" ? $(e) : e;
	}
	getDocument = () => Vc(this.root);
	getWindow = () => this.getDocument().defaultView ?? window;
	getActiveElement = () => Uc(this.root);
	isActiveElement = (e) => e === this.getActiveElement();
	getElementById(e) {
		return this.root.getElementById(e);
	}
	querySelector = (e) => this.root ? this.root.querySelector(e) : null;
	querySelectorAll = (e) => this.root ? this.root.querySelectorAll(e) : [];
	setTimeout = (e, t) => this.getWindow().setTimeout(e, t);
	clearTimeout = (e) => this.getWindow().clearTimeout(e);
};
// ../vibebook/node_modules/svelte-toolbelt/dist/utils/attach-ref.js
function Gc(e, t) {
	return { [Er()]: (n) => Ss(e) ? (e.current = n, Cr(() => t?.(n)), () => {
		"isConnected" in n && n.isConnected || (e.current = null, t?.(null));
	}) : (e(n), Cr(() => t?.(n)), () => {
		"isConnected" in n && n.isConnected || (e(null), t?.(null));
	}) };
}
// ../vibebook/node_modules/bits-ui/dist/internal/attrs.js
function Kc(e) {
	return e ? "true" : "false";
}
function qc(e) {
	return e ? "" : void 0;
}
function Jc(e) {
	return e ? !0 : void 0;
}
function Yc(e) {
	return e ? "open" : "closed";
}
function Xc(e) {
	return e === "starting" ? { "data-starting-style": "" } : e === "ending" ? { "data-ending-style": "" } : {};
}
var Zc = class {
	#e;
	#t;
	attrs;
	constructor(e) {
		this.#e = e.getVariant ? e.getVariant() : null, this.#t = this.#e ? `data-${this.#e}-` : `data-${e.component}-`, this.getAttr = this.getAttr.bind(this), this.selector = this.selector.bind(this), this.attrs = Object.fromEntries(e.parts.map((e) => [e, this.getAttr(e)]));
	}
	getAttr(e, t) {
		return t ? `data-${t}-${e}` : `${this.#t}${e}`;
	}
	selector(e, t) {
		return `[${this.getAttr(e, t)}]`;
	}
};
function Qc(e) {
	let t = new Zc(e);
	return {
		...t.attrs,
		selector: t.selector,
		getAttr: t.getAttr
	};
}
// ../vibebook/node_modules/bits-ui/dist/internal/kbd-constants.js
var $c = "ArrowDown", el = "ArrowLeft", tl = "ArrowRight", nl = "ArrowUp", rl = "Home", il = "PageDown", al = "PageUp";
// ../vibebook/node_modules/bits-ui/dist/internal/locale.js
function ol(e) {
	return window.getComputedStyle(e).getPropertyValue("direction");
}
// ../vibebook/node_modules/bits-ui/dist/internal/get-directional-keys.js
var sl = [
	$c,
	al,
	rl
], cl = [
	nl,
	il,
	"End"
];
[...sl, ...cl];
function ll(e = "ltr", t = "horizontal") {
	return {
		horizontal: e === "rtl" ? el : tl,
		vertical: $c
	}[t];
}
function ul(e = "ltr", t = "horizontal") {
	return {
		horizontal: e === "rtl" ? tl : el,
		vertical: nl
	}[t];
}
function dl(e = "ltr", t = "horizontal") {
	return ["ltr", "rtl"].includes(e) || (e = "ltr"), ["horizontal", "vertical"].includes(t) || (t = "horizontal"), {
		nextKey: ll(e, t),
		prevKey: ul(e, t)
	};
}
// ../vibebook/node_modules/bits-ui/dist/internal/is.js
var fl = typeof document < "u", pl = ml();
function ml() {
	return fl && window?.navigator?.userAgent && (/iP(ad|hone|od)/.test(window.navigator.userAgent) || window?.navigator?.maxTouchPoints > 2 && /iPad|Macintosh/.test(window?.navigator.userAgent));
}
function hl(e) {
	return e instanceof HTMLElement;
}
function gl(e) {
	return e instanceof Element;
}
function _l(e) {
	return e instanceof Element || e instanceof SVGElement;
}
function vl(e) {
	return e.matches(":focus-visible");
}
function yl(e) {
	return e !== null;
}
// ../vibebook/node_modules/bits-ui/dist/internal/css-escape.js
function bl(e) {
	if (typeof CSS < "u" && typeof CSS.escape == "function") return CSS.escape(e);
	let t = e.length, n = -1, r, i = "", a = e.charCodeAt(0);
	if (t === 1 && a === 45) return "\\" + e;
	for (; ++n < t;) r = e.charCodeAt(n), i += r === 0 ? "�" : r >= 1 && r <= 31 || r === 127 || n === 0 && r >= 48 && r <= 57 || n === 1 && r >= 48 && r <= 57 && a === 45 ? "\\" + r.toString(16) + " " : r >= 128 || r === 45 || r === 95 || r >= 48 && r <= 57 || r >= 65 && r <= 90 || r >= 97 && r <= 122 ? e.charAt(n) : "\\" + e.charAt(n);
	return i;
}
// ../vibebook/node_modules/bits-ui/dist/internal/roving-focus-group.js
var xl = class {
	#e;
	#t = Os(null);
	constructor(e) {
		this.#e = e;
	}
	getCandidateNodes() {
		if (!this.#e.rootNode.current) return [];
		if (this.#e.candidateSelector) {
			let e = Array.from(this.#e.rootNode.current.querySelectorAll(this.#e.candidateSelector));
			return this.#n(this.#e.rootNode.current, e);
		}
		if (this.#e.candidateAttr) {
			let e = Array.from(this.#e.rootNode.current.querySelectorAll(`[${this.#e.candidateAttr}]:not([data-disabled])`));
			return this.#n(this.#e.rootNode.current, e);
		}
		return [];
	}
	#n(e, t) {
		let n = this.#e.rootAttr;
		if (!n) return t;
		let r = `[${n}]`;
		return t.filter((t) => t.closest(r) === e);
	}
	focusFirstCandidate() {
		let e = this.getCandidateNodes();
		e.length && e[0]?.focus();
	}
	handleKeydown(e, t, n = !1) {
		let r = this.#e.rootNode.current;
		if (!r || !e) return;
		let i = this.getCandidateNodes();
		if (!i.length) return;
		let a = i.indexOf(e), { nextKey: o, prevKey: s } = dl(ol(r), this.#e.orientation.current), c = this.#e.loop.current, l = {
			[o]: a + 1,
			[s]: a - 1,
			[rl]: 0,
			End: i.length - 1
		};
		if (n) {
			let e = o === "ArrowDown" ? tl : $c, t = s === "ArrowUp" ? el : nl;
			l[e] = a + 1, l[t] = a - 1;
		}
		let u = l[t.key];
		if (u === void 0) return;
		t.preventDefault(), u < 0 && c ? u = i.length - 1 : u === i.length && c && (u = 0);
		let d = i[u];
		if (d) return d.focus(), this.#t.current = d.id, this.#e.onCandidateFocus?.(d), d;
	}
	getTabIndex(e) {
		let t = this.getCandidateNodes(), n = this.#t.current !== null;
		return e && !n && t[0] === e ? (this.#t.current = e.id, 0) : e?.id === this.#t.current ? 0 : -1;
	}
	setCurrentTabStopId(e) {
		this.#t.current = e;
	}
	focusCurrentTabStop() {
		let e = this.#t.current;
		if (!e) return;
		let t = this.#e.rootNode.current?.querySelector(`#${bl(e)}`);
		t && hl(t) && t.focus();
	}
}, Sl = class {
	#e;
	#t = null;
	#n = null;
	#r = 0;
	constructor(e) {
		this.#e = e, Ac(() => this.#i());
	}
	#i() {
		this.#t !== null && (window.cancelAnimationFrame(this.#t), this.#t = null), this.#n?.disconnect(), this.#n = null, this.#r++;
	}
	run(e) {
		this.#i();
		let t = this.#r, n = () => {
			t === this.#r && this.#a(e);
		}, r = () => {
			if (t !== this.#r) return;
			let i = this.#e.ref.current;
			if (!i) return;
			if (typeof i.getAnimations != "function") {
				this.#a(e);
				return;
			}
			let a = i.getAnimations();
			a.length === 0 ? n() : Promise.all(a.map((e) => e.finished)).then(() => {
				n();
			}).catch(() => {
				t === this.#r && (i.getAnimations().some((e) => e.pending || e.playState !== "finished") ? r() : n());
			});
		}, i = () => {
			this.#t = window.requestAnimationFrame(() => {
				this.#t = null, r();
			});
		};
		this.#e.afterTick.current ? this.#t = window.requestAnimationFrame(() => {
			this.#t = null;
			let e = "data-starting-style", n = this.#e.ref.current;
			n && (n.hasAttribute(e) ? (this.#n = new MutationObserver(() => {
				t === this.#r && (n.hasAttribute(e) || (this.#n?.disconnect(), this.#n = null, i()));
			}), this.#n.observe(n, {
				attributes: !0,
				attributeFilter: [e]
			})) : i());
		}) : i();
	}
	#a(e) {
		let t = this.#r, n = () => {
			t === this.#r && e();
		};
		this.#e.afterTick.current ? jc(n) : n();
	}
}, Cl = class {
	#e;
	#t;
	#n;
	#r = /* @__PURE__ */ L(!1);
	#i = /* @__PURE__ */ L(void 0);
	#a = !1;
	#o = null;
	constructor(e) {
		this.#e = e, R(this.#r, e.open.current, !0), this.#t = e.enabled ?? !0, this.#n = new Sl({
			ref: this.#e.ref,
			afterTick: this.#e.open
		}), Ac(() => this.#s()), Ec(() => this.#e.open.current, (e) => {
			!this.#a && (this.#a = !0, e === U(this.#r)) || (this.#s(), !e && this.#e.shouldSkipExitAnimation?.() ? (R(this.#r, !1), R(this.#i, void 0), this.#e.onComplete?.()) : (e && R(this.#r, !0), R(this.#i, e ? "starting" : "ending", !0), e && (this.#o = window.requestAnimationFrame(() => {
				this.#o = null, this.#e.open.current && R(this.#i, void 0);
			})), this.#t ? this.#n.run(() => {
				e === this.#e.open.current && (this.#e.open.current || R(this.#r, !1), R(this.#i, void 0), this.#e.onComplete?.());
			}) : (e || R(this.#r, !1), R(this.#i, void 0), this.#e.onComplete?.())));
		});
	}
	get shouldRender() {
		return U(this.#r);
	}
	get transitionStatus() {
		return U(this.#i);
	}
	#s() {
		this.#o !== null && (window.cancelAnimationFrame(this.#o), this.#o = null);
	}
};
// ../vibebook/node_modules/bits-ui/dist/internal/noop.js
function wl() {}
// ../vibebook/node_modules/bits-ui/dist/internal/create-id.js
function Tl(e, t) {
	return t === void 0 ? `bits-${e}` : `bits-${e}-${t}`;
}
// ../vibebook/node_modules/bits-ui/dist/bits/dialog/dialog.svelte.js
var El = Qc({
	component: "dialog",
	parts: [
		"content",
		"trigger",
		"overlay",
		"title",
		"description",
		"close",
		"cancel",
		"action"
	]
}), Dl = new Cc("Dialog.Root | AlertDialog.Root"), Ol = class e {
	static create(t) {
		let n = Dl.getOr(null);
		return Dl.set(new e(t, n));
	}
	opts;
	#e = /* @__PURE__ */ L(null);
	get triggerNode() {
		return U(this.#e);
	}
	set triggerNode(e) {
		R(this.#e, e, !0);
	}
	#t = /* @__PURE__ */ L(null);
	get contentNode() {
		return U(this.#t);
	}
	set contentNode(e) {
		R(this.#t, e, !0);
	}
	#n = /* @__PURE__ */ L(null);
	get overlayNode() {
		return U(this.#n);
	}
	set overlayNode(e) {
		R(this.#n, e, !0);
	}
	#r = /* @__PURE__ */ L(null);
	get descriptionNode() {
		return U(this.#r);
	}
	set descriptionNode(e) {
		R(this.#r, e, !0);
	}
	#i = /* @__PURE__ */ L(void 0);
	get contentId() {
		return U(this.#i);
	}
	set contentId(e) {
		R(this.#i, e, !0);
	}
	#a = /* @__PURE__ */ L(void 0);
	get titleId() {
		return U(this.#a);
	}
	set titleId(e) {
		R(this.#a, e, !0);
	}
	#o = /* @__PURE__ */ L(void 0);
	get triggerId() {
		return U(this.#o);
	}
	set triggerId(e) {
		R(this.#o, e, !0);
	}
	#s = /* @__PURE__ */ L(void 0);
	get descriptionId() {
		return U(this.#s);
	}
	set descriptionId(e) {
		R(this.#s, e, !0);
	}
	#c = /* @__PURE__ */ L(null);
	get cancelNode() {
		return U(this.#c);
	}
	set cancelNode(e) {
		R(this.#c, e, !0);
	}
	#l = /* @__PURE__ */ L(0);
	get nestedOpenCount() {
		return U(this.#l);
	}
	set nestedOpenCount(e) {
		R(this.#l, e, !0);
	}
	depth;
	parent;
	contentPresence;
	overlayPresence;
	constructor(e, t) {
		this.opts = e, this.parent = t, this.depth = t ? t.depth + 1 : 0, this.handleOpen = this.handleOpen.bind(this), this.handleClose = this.handleClose.bind(this), this.contentPresence = new Cl({
			ref: $(() => this.contentNode),
			open: this.opts.open,
			enabled: !0,
			onComplete: () => {
				this.opts.onOpenChangeComplete.current(this.opts.open.current);
			}
		}), this.overlayPresence = new Cl({
			ref: $(() => this.overlayNode),
			open: this.opts.open,
			enabled: !0
		}), Ec(() => this.opts.open.current, (e) => {
			this.parent && (e ? this.parent.incrementNested() : this.parent.decrementNested());
		}, { lazy: !0 }), Ac(() => {
			this.opts.open.current && this.parent?.decrementNested();
		});
	}
	handleOpen() {
		this.opts.open.current || (this.opts.open.current = !0);
	}
	handleClose() {
		this.opts.open.current && (this.opts.open.current = !1);
	}
	getBitsAttr = (e) => El.getAttr(e, this.opts.variant.current);
	incrementNested() {
		this.nestedOpenCount++, this.parent?.incrementNested();
	}
	decrementNested() {
		this.nestedOpenCount !== 0 && (this.nestedOpenCount--, this.parent?.decrementNested());
	}
	#u = /* @__PURE__ */ F(() => ({ "data-state": Yc(this.opts.open.current) }));
	get sharedProps() {
		return U(this.#u);
	}
	set sharedProps(e) {
		R(this.#u, e);
	}
}, kl = class e {
	static create(t) {
		return new e(t, Dl.get());
	}
	opts;
	root;
	attachment;
	constructor(e, t) {
		this.opts = e, this.root = t, this.attachment = Gc(this.opts.ref, (e) => {
			this.root.triggerNode = e, this.root.triggerId = e?.id;
		}), this.onclick = this.onclick.bind(this), this.onkeydown = this.onkeydown.bind(this);
	}
	onclick(e) {
		this.opts.disabled.current || e.button > 0 || this.root.handleOpen();
	}
	onkeydown(e) {
		this.opts.disabled.current || (e.key === " " || e.key === "Enter") && (e.preventDefault(), this.root.handleOpen());
	}
	#e = /* @__PURE__ */ F(() => ({
		id: this.opts.id.current,
		"aria-haspopup": "dialog",
		"aria-expanded": Kc(this.root.opts.open.current),
		"aria-controls": this.root.contentId,
		[this.root.getBitsAttr("trigger")]: "",
		onkeydown: this.onkeydown,
		onclick: this.onclick,
		disabled: this.opts.disabled.current ? !0 : void 0,
		...this.root.sharedProps,
		...this.attachment
	}));
	get props() {
		return U(this.#e);
	}
	set props(e) {
		R(this.#e, e);
	}
}, Al = class e {
	static create(t) {
		return new e(t, Dl.get());
	}
	opts;
	root;
	attachment;
	constructor(e, t) {
		this.opts = e, this.root = t, this.attachment = Gc(this.opts.ref), this.onclick = this.onclick.bind(this), this.onkeydown = this.onkeydown.bind(this);
	}
	onclick(e) {
		this.opts.disabled.current || e.button > 0 || this.root.handleClose();
	}
	onkeydown(e) {
		this.opts.disabled.current || (e.key === " " || e.key === "Enter") && (e.preventDefault(), this.root.handleClose());
	}
	#e = /* @__PURE__ */ F(() => ({
		id: this.opts.id.current,
		[this.root.getBitsAttr(this.opts.variant.current)]: "",
		onclick: this.onclick,
		onkeydown: this.onkeydown,
		disabled: this.opts.disabled.current ? !0 : void 0,
		tabindex: 0,
		...this.root.sharedProps,
		...this.attachment
	}));
	get props() {
		return U(this.#e);
	}
	set props(e) {
		R(this.#e, e);
	}
}, jl = class e {
	static create(t) {
		return new e(t, Dl.get());
	}
	opts;
	root;
	attachment;
	constructor(e, t) {
		this.opts = e, this.root = t, this.root.titleId = this.opts.id.current, this.attachment = Gc(this.opts.ref), Ec.pre(() => this.opts.id.current, (e) => {
			this.root.titleId = e;
		});
	}
	#e = /* @__PURE__ */ F(() => ({
		id: this.opts.id.current,
		role: "heading",
		"aria-level": this.opts.level.current,
		[this.root.getBitsAttr("title")]: "",
		...this.root.sharedProps,
		...this.attachment
	}));
	get props() {
		return U(this.#e);
	}
	set props(e) {
		R(this.#e, e);
	}
}, Ml = class e {
	static create(t) {
		return new e(t, Dl.get());
	}
	opts;
	root;
	attachment;
	constructor(e, t) {
		this.opts = e, this.root = t, this.root.descriptionId = this.opts.id.current, this.attachment = Gc(this.opts.ref, (e) => {
			this.root.descriptionNode = e;
		}), Ec.pre(() => this.opts.id.current, (e) => {
			this.root.descriptionId = e;
		});
	}
	#e = /* @__PURE__ */ F(() => ({
		id: this.opts.id.current,
		[this.root.getBitsAttr("description")]: "",
		...this.root.sharedProps,
		...this.attachment
	}));
	get props() {
		return U(this.#e);
	}
	set props(e) {
		R(this.#e, e);
	}
}, Nl = class e {
	static create(t) {
		return new e(t, Dl.get());
	}
	opts;
	root;
	attachment;
	constructor(e, t) {
		this.opts = e, this.root = t, this.attachment = Gc(this.opts.ref, (e) => {
			this.root.contentNode = e, this.root.contentId = e?.id;
		});
	}
	#e = /* @__PURE__ */ F(() => ({ open: this.root.opts.open.current }));
	get snippetProps() {
		return U(this.#e);
	}
	set snippetProps(e) {
		R(this.#e, e);
	}
	#t = /* @__PURE__ */ F(() => ({
		id: this.opts.id.current,
		role: this.root.opts.variant.current === "alert-dialog" ? "alertdialog" : "dialog",
		"aria-modal": "true",
		"aria-describedby": this.root.descriptionId,
		"aria-labelledby": this.root.titleId,
		[this.root.getBitsAttr("content")]: "",
		style: {
			pointerEvents: "auto",
			outline: this.root.opts.variant.current === "alert-dialog" ? "none" : void 0,
			"--bits-dialog-depth": this.root.depth,
			"--bits-dialog-nested-count": this.root.nestedOpenCount,
			contain: "layout style"
		},
		tabindex: this.root.opts.variant.current === "alert-dialog" ? -1 : void 0,
		"data-nested-open": qc(this.root.nestedOpenCount > 0),
		"data-nested": qc(this.root.parent !== null),
		...Xc(this.root.contentPresence.transitionStatus),
		...this.root.sharedProps,
		...this.attachment
	}));
	get props() {
		return U(this.#t);
	}
	set props(e) {
		R(this.#t, e);
	}
	get shouldRender() {
		return this.root.contentPresence.shouldRender;
	}
}, Pl = class e {
	static create(t) {
		return new e(t, Dl.get());
	}
	opts;
	root;
	attachment;
	constructor(e, t) {
		this.opts = e, this.root = t, this.attachment = Gc(this.opts.ref, (e) => this.root.overlayNode = e);
	}
	#e = /* @__PURE__ */ F(() => ({ open: this.root.opts.open.current }));
	get snippetProps() {
		return U(this.#e);
	}
	set snippetProps(e) {
		R(this.#e, e);
	}
	#t = /* @__PURE__ */ F(() => ({
		id: this.opts.id.current,
		[this.root.getBitsAttr("overlay")]: "",
		style: {
			pointerEvents: "auto",
			"--bits-dialog-depth": this.root.depth,
			"--bits-dialog-nested-count": this.root.nestedOpenCount
		},
		"data-nested-open": qc(this.root.nestedOpenCount > 0),
		"data-nested": qc(this.root.parent !== null),
		...Xc(this.root.overlayPresence.transitionStatus),
		...this.root.sharedProps,
		...this.attachment
	}));
	get props() {
		return U(this.#t);
	}
	set props(e) {
		R(this.#t, e);
	}
	get shouldRender() {
		return this.root.overlayPresence.shouldRender;
	}
}, Fl = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"ref",
	"child",
	"children",
	"level"
]), Il = /* @__PURE__ */ W("<div><!></div>");
function Ll(e, t) {
	let n = ei();
	M(t, !0);
	let r = Y(t, "id", 19, () => Tl(n)), i = Y(t, "ref", 15, null), a = Y(t, "level", 3, 2), o = /* @__PURE__ */ ka(t, Fl), s = jl.create({
		id: $(() => r()),
		level: $(() => a()),
		ref: $(() => i(), (e) => i(e))
	}), c = /* @__PURE__ */ F(() => vc(o, s.props));
	var l = G(), u = B(l), d = (e) => {
		var n = G();
		J(B(n), () => t.child, () => ({ props: U(c) })), K(e, n);
	}, p = (e) => {
		var n = Il();
		aa(n, () => ({ ...U(c) })), J(z(n), () => t.children ?? f), j(n), K(e, n);
	};
	q(u, (e) => {
		t.child ? e(d) : e(p, -1);
	}), K(e, l), N();
}
// ../vibebook/node_modules/bits-ui/dist/bits/utilities/portal/portal-consumer.svelte
function Rl(e, t) {
	var n = G();
	pi(B(n), () => t.children, (e) => {
		var n = G();
		J(B(n), () => t.children ?? f), K(e, n);
	}), K(e, n);
}
// ../vibebook/node_modules/bits-ui/dist/bits/utilities/config/bits-config.js
var zl = new Cc("BitsConfig");
function Bl() {
	let e = new Vl(null, {});
	return zl.getOr(e).opts;
}
var Vl = class {
	opts;
	constructor(e, t) {
		let n = Hl(e, t);
		this.opts = {
			defaultPortalTo: n((e) => e.defaultPortalTo),
			defaultLocale: n((e) => e.defaultLocale)
		};
	}
};
function Hl(e, t) {
	return (n) => $(() => {
		let r = n(t)?.current;
		if (r !== void 0) return r;
		if (e !== null) return n(e.opts)?.current;
	});
}
// ../vibebook/node_modules/bits-ui/dist/bits/utilities/config/prop-resolvers.js
function Ul(e, t) {
	return (n) => {
		let r = Bl();
		return $(() => {
			let i = n();
			if (i !== void 0) return i;
			let a = e(r).current;
			return a === void 0 ? t : a;
		});
	};
}
var Wl = Ul((e) => e.defaultPortalTo, "body");
// ../vibebook/node_modules/bits-ui/dist/bits/utilities/portal/portal.svelte
function Gl(e, t) {
	M(t, !0);
	let n = Wl(() => t.to), r = Ze(), i = /* @__PURE__ */ F(a);
	function a() {
		if (!fl || t.disabled) return null;
		let e = null;
		return e = typeof n.current == "string" ? document.querySelector(n.current) : n.current, e;
	}
	let o;
	function s() {
		o &&= (ui(o), null);
	}
	Ec([() => U(i), () => t.disabled], ([e, n]) => {
		if (!e || n) s();
		else return o = oi(Rl, {
			target: e,
			props: { children: t.children },
			context: r
		}), () => {
			s();
		};
	});
	var c = G(), l = B(c), u = (e) => {
		var n = G();
		J(B(n), () => t.children ?? f), K(e, n);
	};
	q(l, (e) => {
		t.disabled && e(u);
	}), K(e, c), N();
}
// ../vibebook/node_modules/bits-ui/dist/internal/events.js
var Kl = /* @__PURE__ */ new WeakMap();
function ql(e, t = e.composedPath()) {
	Kl.set(e, t);
}
function Jl(e) {
	return Kl.get(e) ?? e.composedPath();
}
function Yl(e, t) {
	return t ? _l(e.target) && t.contains(e.target) || Jl(e).includes(t) : !1;
}
function Xl(e, t) {
	for (let n of Jl(e)) if (_l(n) && n.matches(t)) return n;
	return _l(e.target) ? e.target.closest(t) : null;
}
function Zl(e, t) {
	ql(t, Jl(e));
}
// ../vibebook/node_modules/bits-ui/dist/internal/debounce.js
function Ql(e, t = 500) {
	let n = null, r = null, i = (...e) => {
		i.destroy(), r = e, n = setTimeout(i.flush, t);
	};
	return i.flush = () => {
		if (r === null) return;
		let t = r;
		i.destroy(), e(...t);
	}, i.destroy = () => {
		n !== null && (clearTimeout(n), n = null), r = null;
	}, i;
}
// ../vibebook/node_modules/bits-ui/dist/internal/elements.js
function $l(e, t) {
	return e === t || e.contains(t);
}
function eu(e) {
	return e?.ownerDocument ?? document;
}
// ../vibebook/node_modules/bits-ui/dist/internal/dom.js
function tu(e, t) {
	let { clientX: n, clientY: r } = e, i = t.getBoundingClientRect();
	return n < i.left || n > i.right || r < i.top || r > i.bottom;
}
// ../vibebook/node_modules/bits-ui/dist/bits/menu/context-menu-attributes.js
var nu = "data-context-menu-trigger", ru = "data-context-menu-content";
// ../vibebook/node_modules/bits-ui/dist/bits/utilities/dismissible-layer/use-dismissable-layer.svelte.js
globalThis.bitsDismissableLayers ??= /* @__PURE__ */ new Map();
var iu = class e {
	static create(t) {
		return new e(t);
	}
	opts;
	#e = wl;
	#t = () => !1;
	#n = null;
	#r = Ds("close");
	#i = { pointerdown: !1 };
	#a = !1;
	#o = null;
	#s = !1;
	#c = void 0;
	#l = wl;
	#u = wl;
	#d = !1;
	constructor(e) {
		this.opts = e, kn(() => {
			this.#r.current = e.interactOutsideBehavior.current, this.#e = e.onInteractOutside.current, this.#l = e.onFocusOutside.current, this.#t = e.isValidEvent.current, this.#n = e.ref.current;
		});
		let t = wl, n = null, r = () => {
			n = null, this.#x(), globalThis.bitsDismissableLayers.delete(this), this.#g.destroy(), this.#u(), t();
		};
		Ec([() => this.opts.enabled.current, () => this.opts.ref.current], ([e, i]) => {
			let a = e ? i : null;
			n !== a && (r(), a && (n = a, this.#c = eu(a), globalThis.bitsDismissableLayers.set(this, this.#r), t = this.#p()));
		}), Ac(() => {
			this.#d = !0, r();
		});
	}
	#f = (e) => {
		e.defaultPrevented || this.#d || !this.#n || jc(() => {
			this.#d || this.#n && !this.#b(e.target) && e.target && !this.#s && this.#l?.(e);
		});
	};
	#p() {
		let e = this.#c, t = (e) => {
			Cr(() => {
				this.#g.flush(), this.#_(e), this.#y(e);
			});
		}, n = (e) => {
			e.cancelBubble || e !== this.#o || (this.#v(e), e.pointerType === "touch" ? (this.#g.destroy(), this.#h(e)) : this.#g(e));
		};
		return e.addEventListener("pointerdown", t, !0), e.addEventListener("pointerdown", n), lc(() => e.removeEventListener("pointerdown", t, !0), () => e.removeEventListener("pointerdown", n), Br(e, "focusin", this.#f));
	}
	#m = (e) => {
		let t = e;
		t.defaultPrevented && (t = cu(e)), this.#e(e);
	};
	#h = (e) => {
		if (!this.#n) {
			this.#u();
			return;
		}
		let t = this.#t(e, this.#n) || su(e, this.#n);
		if (!this.#a || this.#S() || !t) {
			this.#u();
			return;
		}
		let n = e;
		if (n.defaultPrevented && (n = cu(n)), this.#r.current !== "close" && this.#r.current !== "defer-otherwise-close") this.#u();
		else if (e.pointerType === "touch") {
			this.#u();
			let e = null, t = wl, n = (e) => {
				t(), this.#m(e);
			};
			t = lc(Br(this.#c, "click", n, { once: !0 }), Br(this.#c, "click", (t) => {
				ql(t), e = setTimeout(() => n(t), 0);
			}, {
				once: !0,
				capture: !0
			}), () => {
				e !== null && clearTimeout(e), e = null;
			}), this.#u = t;
		} else this.#e(n);
	};
	#g = Ql(this.#h, 10);
	#_ = (e) => {
		this.#i[e.type] = !0;
	};
	#v = (e) => {
		this.#i[e.type] = !1;
	};
	#y = (e) => {
		this.#o = e, ql(e), this.#n && (this.#a = ou(this));
	};
	#b = (e) => this.#n ? $l(this.#n, e) : !1;
	#x = () => {
		for (let e in this.#i) this.#i[e] = !1;
		this.#a = !1, this.#o = null;
	};
	#S() {
		return Object.values(this.#i).some(Boolean);
	}
	#C = () => {
		this.#s = !0;
	};
	#w = () => {
		this.#s = !1;
	};
	props = {
		onfocuscapture: this.#C,
		onblurcapture: this.#w
	};
};
function au(e = [...globalThis.bitsDismissableLayers]) {
	return e.findLast(([e, { current: t }]) => t === "close" || t === "ignore");
}
function ou(e) {
	let t = [...globalThis.bitsDismissableLayers], n = au(t);
	if (n) return n[0] === e;
	let [r] = t[0];
	return r === e;
}
function su(e, t) {
	let n = e.target;
	if (!_l(n)) return !1;
	let r = !!Xl(e, `[${nu}]`), i = !!t.closest(`[${ru}]`);
	return "button" in e && e.button > 0 && !r ? !1 : "button" in e && e.button === 0 && r && i ? !0 : r && i ? !1 : eu(n).documentElement.contains(n) && !Yl(e, t) && tu(e, t);
}
function cu(e) {
	let t = e.currentTarget, n = e.target, r;
	r = e instanceof PointerEvent ? new PointerEvent(e.type, e) : new PointerEvent("pointerdown", e);
	let i = !1, a = new Proxy(r, { get: (r, a) => {
		if (a === "currentTarget") return t;
		if (a === "target") return n;
		if (a === "preventDefault") return () => {
			i = !0, typeof r.preventDefault == "function" && r.preventDefault();
		};
		if (a === "defaultPrevented") return i;
		if (a in r) {
			let e = r[a];
			return typeof e == "function" ? e.bind(r) : e;
		}
		let o = e[a];
		return typeof o == "function" ? o.bind(e) : o;
	} });
	return Zl(e, a), a;
}
// ../vibebook/node_modules/bits-ui/dist/bits/utilities/dismissible-layer/dismissible-layer.svelte
function lu(e, t) {
	M(t, !0);
	let n = Y(t, "interactOutsideBehavior", 3, "close"), r = Y(t, "onInteractOutside", 3, wl), i = Y(t, "onFocusOutside", 3, wl), a = Y(t, "isValidEvent", 3, () => !1), o = iu.create({
		id: $(() => t.id),
		interactOutsideBehavior: $(() => n()),
		onInteractOutside: $(() => r()),
		enabled: $(() => t.enabled),
		onFocusOutside: $(() => i()),
		isValidEvent: $(() => a()),
		ref: Cr(() => t.ref)
	});
	var s = G();
	J(B(s), () => t.children ?? f, () => ({ props: o.props })), K(e, s), N();
}
// ../vibebook/node_modules/bits-ui/dist/bits/utilities/escape-layer/use-escape-layer.svelte.js
globalThis.bitsEscapeLayers ??= /* @__PURE__ */ new Map();
var uu = class e {
	static create(t) {
		return new e(t);
	}
	opts;
	domContext;
	constructor(e) {
		this.opts = e, this.domContext = new Wc(this.opts.ref);
		let t = wl;
		Ec(() => e.enabled.current, (n) => (n && (globalThis.bitsEscapeLayers.set(this, e.escapeKeydownBehavior), t = this.#e()), () => {
			t(), globalThis.bitsEscapeLayers.delete(this);
		}));
	}
	#e = () => Br(this.domContext.getDocument(), "keydown", this.#t, { passive: !1 });
	#t = (e) => {
		if (e.key !== "Escape" || !du(this)) return;
		let t = new KeyboardEvent(e.type, e);
		e.preventDefault();
		let n = this.opts.escapeKeydownBehavior.current;
		(n === "close" || n === "defer-otherwise-close") && this.opts.onEscapeKeydown.current(t);
	};
};
function du(e) {
	let t = [...globalThis.bitsEscapeLayers], n = t.findLast(([e, { current: t }]) => t === "close" || t === "ignore");
	if (n) return n[0] === e;
	let [r] = t[0];
	return r === e;
}
// ../vibebook/node_modules/bits-ui/dist/bits/utilities/escape-layer/escape-layer.svelte
function fu(e, t) {
	M(t, !0);
	let n = Y(t, "escapeKeydownBehavior", 3, "close"), r = Y(t, "onEscapeKeydown", 3, wl);
	uu.create({
		escapeKeydownBehavior: $(() => n()),
		onEscapeKeydown: $(() => r()),
		enabled: $(() => t.enabled),
		ref: Cr(() => t.ref)
	});
	var i = G();
	J(B(i), () => t.children ?? f), K(e, i), N();
}
// ../vibebook/node_modules/bits-ui/dist/bits/utilities/focus-scope/focus-scope-manager.js
var pu = class e {
	static instance;
	#e = Ds([]);
	#t = /* @__PURE__ */ new WeakMap();
	#n = /* @__PURE__ */ new WeakMap();
	static getInstance() {
		return this.instance ||= new e(), this.instance;
	}
	register(e) {
		let t = this.getActive();
		t && t !== e && t.pause();
		let n = Uc(document);
		n && n !== document.body && this.#n.set(e, n), this.#e.current = this.#e.current.filter((t) => t !== e), this.#e.current.unshift(e), e.resume();
	}
	unregister(e) {
		this.#e.current = this.#e.current.filter((t) => t !== e);
		let t = this.getActive();
		t && t.resume();
	}
	getActive() {
		return this.#e.current[0];
	}
	setFocusMemory(e, t) {
		this.#t.set(e, t);
	}
	getFocusMemory(e) {
		return this.#t.get(e);
	}
	isActiveScope(e) {
		return this.getActive() === e;
	}
	setPreFocusMemory(e, t) {
		this.#n.set(e, t);
	}
	getPreFocusMemory(e) {
		return this.#n.get(e);
	}
	clearPreFocusMemory(e) {
		this.#n.delete(e);
	}
}, mu = [
	"input:not([inert]):not([inert] *)",
	"select:not([inert]):not([inert] *)",
	"textarea:not([inert]):not([inert] *)",
	"a[href]:not([inert]):not([inert] *)",
	"area[href]:not([inert]):not([inert] *)",
	"button:not([inert]):not([inert] *)",
	"[tabindex]:not(slot):not([inert]):not([inert] *)",
	"audio[controls]:not([inert]):not([inert] *)",
	"video[controls]:not([inert]):not([inert] *)",
	"[contenteditable]:not([contenteditable=\"false\"]):not([inert]):not([inert] *)",
	"details>summary:first-of-type:not([inert]):not([inert] *)",
	"details:not([inert]):not([inert] *)"
], hu = /* #__PURE__ */ mu.join(","), gu = typeof Element > "u", _u = gu ? function() {} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector, vu = !gu && Element.prototype.getRootNode ? function(e) {
	return e == null || e.getRootNode == null ? void 0 : e.getRootNode();
} : function(e) {
	return e?.ownerDocument;
}, yu = function(e, t) {
	t === void 0 && (t = !0);
	var n = e == null || e.getAttribute == null ? void 0 : e.getAttribute("inert");
	return n === "" || n === "true" || t && e && (typeof e.closest == "function" ? e.closest("[inert]") : yu(e.parentNode));
}, bu = function(e) {
	var t, n = e == null || e.getAttribute == null || (t = e.getAttribute("contenteditable")) == null ? void 0 : t.toLowerCase();
	return n === "" || n === "true" || n === "plaintext-only";
}, xu = function(e, t, n) {
	if (yu(e)) return [];
	var r = Array.prototype.slice.apply(e.querySelectorAll(hu));
	return t && _u.call(e, hu) && r.unshift(e), r = r.filter(n), r;
}, Su = function(e, t, n) {
	for (var r = [], i = Array.from(e); i.length;) {
		var a = i.shift();
		if (!yu(a, !1)) {
			if (a.tagName === "SLOT") {
				var o = a.assignedElements(), s = Su(o.length ? o : a.children, !0, n);
				n.flatten ? r.push.apply(r, s) : r.push({
					scopeParent: a,
					candidates: s
				});
			} else {
				_u.call(a, hu) && n.filter(a) && (t || !e.includes(a)) && r.push(a);
				var c = a.shadowRoot || typeof n.getShadowRoot == "function" && n.getShadowRoot(a), l = !yu(c, !1) && (!n.shadowRootFilter || n.shadowRootFilter(a));
				if (c && l) {
					var u = Su(c === !0 ? a.children : c.children, !0, n);
					n.flatten ? r.push.apply(r, u) : r.push({
						scopeParent: a,
						candidates: u
					});
				} else i.unshift.apply(i, a.children);
			}
		}
	}
	return r;
}, Cu = function(e) {
	return !isNaN(parseInt(e.getAttribute("tabindex"), 10));
}, wu = function(e) {
	if (!e) throw Error("No node provided");
	return e.tabIndex < 0 && (/^(AUDIO|VIDEO|DETAILS)$/.test(e.tagName) || bu(e)) && !Cu(e) ? 0 : e.tabIndex;
}, Tu = function(e, t) {
	var n = wu(e);
	return n < 0 && t && !Cu(e) ? 0 : n;
}, Eu = function(e, t) {
	return e.tabIndex === t.tabIndex ? e.documentOrder - t.documentOrder : e.tabIndex - t.tabIndex;
}, Du = function(e) {
	return e.tagName === "INPUT";
}, Ou = function(e) {
	return Du(e) && e.type === "hidden";
}, ku = function(e) {
	return e.tagName === "DETAILS" && Array.prototype.slice.apply(e.children).some(function(e) {
		return e.tagName === "SUMMARY";
	});
}, Au = function(e, t) {
	for (var n = 0; n < e.length; n++) if (e[n].checked && e[n].form === t) return e[n];
}, ju = function(e) {
	if (!e.name) return !0;
	var t = e.form || vu(e), n = function(e) {
		return t.querySelectorAll("input[type=\"radio\"][name=\"" + e + "\"]");
	}, r;
	if (typeof window < "u" && window.CSS !== void 0 && typeof window.CSS.escape == "function") r = n(window.CSS.escape(e.name));
	else try {
		r = n(e.name);
	} catch (e) {
		return console.error("Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s", e.message), !1;
	}
	var i = Au(r, e.form);
	return !i || i === e;
}, Mu = function(e) {
	return Du(e) && e.type === "radio";
}, Nu = function(e) {
	return Mu(e) && !ju(e);
}, Pu = function(e) {
	var t = e && vu(e), n = t?.host, r = !1;
	if (t && t !== e) {
		var i, a;
		for (r = !!((i = n) != null && (i = i.ownerDocument) != null && i.contains(n) || e != null && (a = e.ownerDocument) != null && a.contains(e)); !r && n;) {
			var o;
			t = vu(n), n = t?.host, r = !!((o = n) != null && (o = o.ownerDocument) != null && o.contains(n));
		}
	}
	return r;
}, Fu = function(e) {
	var t = e.getBoundingClientRect(), n = t.width, r = t.height;
	return n === 0 && r === 0;
}, Iu = function(e, t) {
	var n = t.displayCheck, r = t.getShadowRoot;
	if (n === "full-native" && "checkVisibility" in e) return !e.checkVisibility({
		checkOpacity: !1,
		opacityProperty: !1,
		contentVisibilityAuto: !0,
		visibilityProperty: !0,
		checkVisibilityCSS: !0
	});
	var i = getComputedStyle(e).visibility;
	if (i === "hidden" || i === "collapse") return !0;
	var a = _u.call(e, "details>summary:first-of-type") ? e.parentElement : e;
	if (_u.call(a, "details:not([open]) *")) return !0;
	if (!n || n === "full" || n === "full-native" || n === "legacy-full") {
		if (typeof r == "function") {
			for (var o = e; e;) {
				var s = e.parentElement, c = vu(e);
				if (s && !s.shadowRoot && r(s) === !0) return Fu(e);
				e = e.assignedSlot ? e.assignedSlot : !s && c !== e.ownerDocument ? c.host : s;
			}
			e = o;
		}
		if (Pu(e)) return !e.getClientRects().length;
		if (n !== "legacy-full") return !0;
	} else if (n === "non-zero-area") return Fu(e);
	return !1;
}, Lu = function(e) {
	if (/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(e.tagName)) for (var t = e.parentElement; t;) {
		if (t.tagName === "FIELDSET" && t.disabled) {
			for (var n = 0; n < t.children.length; n++) {
				var r = t.children.item(n);
				if (r.tagName === "LEGEND") return _u.call(t, "fieldset[disabled] *") ? !0 : !r.contains(e);
			}
			return !0;
		}
		t = t.parentElement;
	}
	return !1;
}, Ru = function(e, t) {
	return !(t.disabled || Ou(t) || Iu(t, e) || ku(t) || Lu(t));
}, zu = function(e, t) {
	return !(Nu(t) || wu(t) < 0 || !Ru(e, t));
}, Bu = function(e) {
	var t = parseInt(e.getAttribute("tabindex"), 10);
	return !!(isNaN(t) || t >= 0);
}, Vu = function(e) {
	var t = [], n = [];
	return e.forEach(function(e, r) {
		var i = !!e.scopeParent, a = i ? e.scopeParent : e, o = Tu(a, i), s = i ? Vu(e.candidates) : a;
		o === 0 ? i ? t.push.apply(t, s) : t.push(a) : n.push({
			documentOrder: r,
			tabIndex: o,
			item: e,
			isScope: i,
			content: s
		});
	}), n.sort(Eu).reduce(function(e, t) {
		return t.isScope ? e.push.apply(e, t.content) : e.push(t.content), e;
	}, []).concat(t);
}, Hu = function(e, t) {
	return t ||= {}, Vu(t.getShadowRoot ? Su([e], t.includeContainer, {
		filter: zu.bind(null, t),
		flatten: !1,
		getShadowRoot: t.getShadowRoot,
		shadowRootFilter: Bu
	}) : xu(e, t.includeContainer, zu.bind(null, t)));
}, Uu = function(e, t) {
	return t ||= {}, t.getShadowRoot ? Su([e], t.includeContainer, {
		filter: Ru.bind(null, t),
		flatten: !0,
		getShadowRoot: t.getShadowRoot
	}) : xu(e, t.includeContainer, Ru.bind(null, t));
}, Wu = /* #__PURE__ */ mu.concat("iframe:not([inert]):not([inert] *)").join(","), Gu = function(e, t) {
	if (t ||= {}, !e) throw Error("No node provided");
	return _u.call(e, Wu) !== !1 && Ru(t, e);
};
// ../vibebook/node_modules/bits-ui/dist/bits/utilities/focus-scope/focus-scope.svelte.js
function Ku(e, t) {
	let n = t.getRootNode();
	for (; e;) {
		let t = e.getRootNode();
		if (t === n) return e;
		e = t !== e && "host" in t ? t.host : null;
	}
	return null;
}
var qu = class e {
	#e = !1;
	#t = null;
	#n = pu.getInstance();
	#r = [];
	#i;
	constructor(e) {
		this.#i = e;
	}
	get paused() {
		return this.#e;
	}
	pause() {
		this.#e = !0;
	}
	resume() {
		this.#e = !1;
	}
	#a() {
		for (let e of this.#r) e();
		this.#r = [];
	}
	mount(e) {
		this.#t !== e && (this.#t && this.unmount(), this.#t = e, this.#n.register(this), this.#c(), this.#o());
	}
	unmount() {
		this.#t &&= (this.#a(), this.#s(), this.#n.unregister(this), this.#n.clearPreFocusMemory(this), null);
	}
	#o() {
		if (!this.#t) return;
		let e = new CustomEvent("focusScope.onOpenAutoFocus", {
			bubbles: !1,
			cancelable: !0
		});
		this.#i.onOpenAutoFocus.current(e), e.defaultPrevented || requestAnimationFrame(() => {
			if (!this.#t || this.#e || !this.#n.isActiveScope(this) || this.#t.contains(Ku(Uc(this.#t.ownerDocument), this.#t))) return;
			let e = this.#u();
			e ? (e.focus({ preventScroll: !0 }), this.#n.setFocusMemory(this, e)) : this.#t.focus({ preventScroll: !0 });
		});
	}
	#s() {
		let e = new CustomEvent("focusScope.onCloseAutoFocus", {
			bubbles: !1,
			cancelable: !0
		});
		if (this.#i.onCloseAutoFocus.current?.(e), !e.defaultPrevented) {
			let e = this.#n.getPreFocusMemory(this);
			if (e && e.isConnected) try {
				e.focus({ preventScroll: !0 });
			} catch {
				document.body.focus();
			}
		}
	}
	#c() {
		if (!this.#t || !this.#i.trap.current) return;
		let e = this.#t, t = e.ownerDocument;
		this.#r.push(Br(t, "focusin", (t) => {
			if (this.#e || !this.#n.isActiveScope(this)) return;
			let n = Ku(t.composedPath()[0], e);
			if (n !== null && e.contains(n)) this.#n.setFocusMemory(this, n);
			else {
				let n = this.#n.getFocusMemory(this);
				if (n && e.contains(n) && Gu(n)) t.preventDefault(), n.focus({ preventScroll: !0 });
				else {
					let t = this.#u(), n = this.#d()[0];
					(t || n || e).focus({ preventScroll: !0 });
				}
			}
		}, { capture: !0 }), Br(e, "keydown", (e) => {
			if (!this.#i.loop || this.#e || e.key !== "Tab" || !this.#n.isActiveScope(this)) return;
			let n = this.#l();
			if (n.length === 0) return;
			let r = n[0], i = n[n.length - 1];
			!e.shiftKey && Uc(t) === i ? (e.preventDefault(), r.focus()) : e.shiftKey && Uc(t) === r && (e.preventDefault(), i.focus());
		}));
		let n = new MutationObserver(() => {
			let t = this.#n.getFocusMemory(this);
			if (t && !e.contains(t)) {
				let t = this.#u(), n = this.#d()[0], r = t || n;
				r ? (r.focus({ preventScroll: !0 }), this.#n.setFocusMemory(this, r)) : e.focus({ preventScroll: !0 });
			}
		});
		n.observe(e, {
			childList: !0,
			subtree: !0
		}), this.#r.push(() => n.disconnect());
	}
	#l() {
		return this.#t ? Hu(this.#t, {
			includeContainer: !1,
			getShadowRoot: !0
		}) : [];
	}
	#u() {
		return this.#l()[0] || null;
	}
	#d() {
		return this.#t ? Uu(this.#t, {
			includeContainer: !1,
			getShadowRoot: !0
		}) : [];
	}
	static use(t) {
		let n = null;
		return Ec([() => t.ref.current, () => t.enabled.current], ([r, i]) => {
			r && i ? (n ||= new e(t), n.mount(r)) : n &&= (n.unmount(), null);
		}), Ac(() => {
			n?.unmount();
		}), { get props() {
			return { tabindex: -1 };
		} };
	}
};
// ../vibebook/node_modules/bits-ui/dist/bits/utilities/focus-scope/focus-scope.svelte
function Ju(e, t) {
	M(t, !0);
	let n = Y(t, "enabled", 3, !1), r = Y(t, "trapFocus", 3, !1), i = Y(t, "loop", 3, !1), a = Y(t, "onCloseAutoFocus", 3, wl), o = Y(t, "onOpenAutoFocus", 3, wl), s = qu.use({
		enabled: $(() => n()),
		trap: $(() => r()),
		loop: Cr(() => i()),
		onCloseAutoFocus: $(() => a()),
		onOpenAutoFocus: $(() => o()),
		ref: Cr(() => t.ref)
	});
	var c = G();
	J(B(c), () => t.focusScope ?? f, () => ({ props: s.props })), K(e, c), N();
}
// ../vibebook/node_modules/bits-ui/dist/bits/utilities/text-selection-layer/use-text-selection-layer.svelte.js
var Yu = () => {};
globalThis.bitsTextSelectionLayers ??= /* @__PURE__ */ new Map();
var Xu = class e {
	static create(t) {
		return new e(t);
	}
	opts;
	domContext;
	#e = wl;
	#t = !1;
	#n = Yu;
	#r = Yu;
	constructor(e) {
		this.opts = e, this.domContext = new Wc(e.ref);
		let t = wl;
		Ec(() => [
			this.opts.enabled.current,
			this.opts.onPointerDown.current,
			this.opts.onPointerUp.current
		], ([e, n, r]) => (this.#t = e, this.#n = n, this.#r = r, e && (globalThis.bitsTextSelectionLayers.set(this, this.opts.enabled), t(), t = this.#i()), () => {
			this.#t = !1, t(), this.#s(), globalThis.bitsTextSelectionLayers.delete(this);
		}));
	}
	#i() {
		return lc(Br(this.domContext.getDocument(), "pointerdown", this.#o), Br(this.domContext.getDocument(), "pointerup", this.#a));
	}
	#a = (e) => {
		this.#s(), e.defaultPrevented || this.#r(e);
	};
	#o = (e) => {
		if (!this.#t) return;
		this.#s();
		let t = this.opts.ref.current, n = e.target;
		hl(t) && hl(n) && ed(this) && Bc(t, n) && (this.#n(e), e.defaultPrevented || (this.#e = Qu(t, this.domContext.getDocument().body)));
	};
	#s = () => {
		this.#e(), this.#e = wl;
	};
}, Zu = (e) => e.style.userSelect || e.style.webkitUserSelect;
function Qu(e, t) {
	let n = Zu(t), r = Zu(e);
	return $u(t, "none"), $u(e, "text"), () => {
		$u(t, n), $u(e, r);
	};
}
function $u(e, t) {
	e.style.userSelect = t, e.style.webkitUserSelect = t;
}
function ed(e) {
	let t = [...globalThis.bitsTextSelectionLayers];
	if (!t.length) return !1;
	let n = t.at(-1);
	return n ? n[0] === e : !1;
}
// ../vibebook/node_modules/bits-ui/dist/bits/utilities/text-selection-layer/text-selection-layer.svelte
function td(e, t) {
	M(t, !0);
	let n = Y(t, "preventOverflowTextSelection", 3, !0), r = Y(t, "onPointerDown", 3, wl), i = Y(t, "onPointerUp", 3, wl);
	Xu.create({
		id: $(() => t.id),
		onPointerDown: $(() => r()),
		onPointerUp: $(() => i()),
		enabled: $(() => t.enabled && n()),
		ref: Cr(() => t.ref)
	});
	var a = G();
	J(B(a), () => t.children ?? f), K(e, a), N();
}
// ../vibebook/node_modules/bits-ui/dist/internal/use-id.js
globalThis.bitsIdCounter ??= { current: 0 };
function nd(e = "bits") {
	return globalThis.bitsIdCounter.current++, `${e}-${globalThis.bitsIdCounter.current}`;
}
// ../vibebook/node_modules/bits-ui/dist/internal/shared-state.svelte.js
var rd = class {
	#e;
	#t = 0;
	#n = /* @__PURE__ */ L();
	#r;
	constructor(e) {
		this.#e = e;
	}
	#i() {
		--this.#t, this.#r && this.#t <= 0 && (this.#r(), R(this.#n, void 0), this.#r = void 0);
	}
	get(...e) {
		return this.#t += 1, U(this.#n) === void 0 && (this.#r = An(() => {
			R(this.#n, this.#e(...e), !0);
		})), Dn(() => () => {
			this.#i();
		}), U(this.#n);
	}
}, id = new xc(), ad = /* @__PURE__ */ new Map(), od = [
	"padding-right",
	"margin-right",
	"overflow",
	"overflow-x",
	"overflow-y",
	"pointer-events",
	"--scrollbar-width"
], sd = null, cd = !1, ld = /* @__PURE__ */ new Set(), ud = null, dd = null, fd = !1;
function pd(e, t, n) {
	e.setProperty(t, n), ld.add(t), t === "overflow" && (ld.add("overflow-x"), ld.add("overflow-y"));
}
var md = $(() => {
	for (let e of id.values()) if (e) return !0;
	return !1;
}), hd = $(() => {
	for (let [e, t] of id) if (t && (ad.get(e)?.() ?? !0)) return !0;
	return !1;
}), gd = null, _d = new rd(() => {
	function e(e, t) {
		let n = sd?.get(t);
		n?.value ? e.body.style.setProperty(t, n.value, n.priority) : e.body.style.removeProperty(t);
	}
	function t(t) {
		for (let n of od) ld.has(n) && e(t, n);
		!cd && t.body.style.length === 0 && t.body.removeAttribute("style"), sd = null, ld.clear(), pl && ud?.();
	}
	function n(t) {
		ld.delete("pointer-events") && e(t, "pointer-events");
	}
	function r() {
		dd !== null && (window.clearTimeout(dd), dd = null);
	}
	function i(e, t) {
		r(), fd = !0, gd = Date.now();
		let n = gd, i = () => {
			dd = null, gd === n && (yd(id) ? fd = !1 : (fd = !1, t()));
		}, a = e === null ? 24 : e;
		dd = window.setTimeout(i, a);
	}
	function a() {
		if (sd === null && id.size === 0 && !fd) {
			cd = document.body.hasAttribute("style"), sd = /* @__PURE__ */ new Map();
			for (let e of od) sd.set(e, {
				value: document.body.style.getPropertyValue(e),
				priority: document.body.style.getPropertyPriority(e)
			});
		}
	}
	return Ec(() => md.current, () => {
		if (!md.current) return;
		a(), fd = !1;
		let e = getComputedStyle(document.documentElement), t = getComputedStyle(document.body), n = e.scrollbarGutter?.includes("stable") || t.scrollbarGutter?.includes("stable"), r = window.innerWidth - document.documentElement.clientWidth, i = {
			padding: Number.parseInt(t.paddingRight ?? "0", 10) + r,
			margin: Number.parseInt(t.marginRight ?? "0", 10)
		};
		r > 0 && !n && (pd(document.body.style, "padding-right", `${i.padding}px`), pd(document.body.style, "margin-right", `${i.margin}px`), pd(document.body.style, "--scrollbar-width", `${r}px`)), pd(document.body.style, "overflow", "hidden"), pl && (ud = Br(document, "touchmove", (e) => {
			e.target === document.documentElement && (e.touches.length > 1 || e.preventDefault());
		}, { passive: !1 })), jc(() => {
			hd.current && pd(document.body.style, "pointer-events", "none"), pd(document.body.style, "overflow", "hidden");
		});
	}), Ec(() => hd.current, () => {
		md.current && jc(() => {
			md.current && (hd.current ? pd(document.body.style, "pointer-events", "none") : n(document));
		});
	}, { lazy: !0 }), Ac(() => () => {
		ud?.();
	}), {
		get lockMap() {
			return id;
		},
		resetBodyStyle: t,
		restorePointerEvents: n,
		scheduleCleanupIfNoNewLocks: i,
		cancelPendingCleanup: r,
		ensureInitialStyleCaptured: a
	};
}), vd = class {
	#e = nd();
	#t;
	#n = () => null;
	#r;
	locked;
	constructor(e, t = () => null, n = () => !0) {
		this.#t = e, this.#n = t, this.#r = _d.get(), this.#r && (this.#r.cancelPendingCleanup(), this.#r.ensureInitialStyleCaptured(), ad.set(this.#e, n), this.#r.lockMap.set(this.#e, this.#t ?? !1), this.locked = $(() => this.#r.lockMap.get(this.#e) ?? !1, (e) => this.#r.lockMap.set(this.#e, e)), Ac(() => {
			if (this.#r.lockMap.delete(this.#e), ad.delete(this.#e), yd(this.#r.lockMap)) return;
			let e = this.#n(), t = document;
			this.#r.restorePointerEvents(t), this.#r.scheduleCleanupIfNoNewLocks(e, () => {
				this.#r.resetBodyStyle(t);
			});
		}));
	}
};
function yd(e) {
	for (let [t, n] of e) if (n) return !0;
	return !1;
}
// ../vibebook/node_modules/bits-ui/dist/bits/utilities/scroll-lock/scroll-lock.svelte
function bd(e, t) {
	M(t, !0);
	let n = Y(t, "preventScroll", 3, !0), r = Y(t, "restoreScrollDelay", 3, null), i = Y(t, "blockPointer", 3, () => !0);
	Cr(() => {
		n() && new vd(n(), () => r(), i());
	}), N();
}
// ../vibebook/node_modules/bits-ui/dist/bits/dialog/components/dialog-overlay.svelte
var xd = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"forceMount",
	"child",
	"children",
	"ref"
]), Sd = /* @__PURE__ */ W("<div><!></div>");
function Cd(e, t) {
	let n = ei();
	M(t, !0);
	let r = Y(t, "id", 19, () => Tl(n)), i = Y(t, "forceMount", 3, !1), a = Y(t, "ref", 15, null), o = /* @__PURE__ */ ka(t, xd), s = Pl.create({
		id: $(() => r()),
		ref: $(() => a(), (e) => a(e))
	}), c = /* @__PURE__ */ F(() => vc(o, s.props));
	var l = G(), u = B(l), d = (e) => {
		var n = G(), r = B(n), i = (e) => {
			var n = G(), r = B(n);
			{
				let e = /* @__PURE__ */ F(() => ({
					props: vc(U(c)),
					...s.snippetProps
				}));
				J(r, () => t.child, () => U(e));
			}
			K(e, n);
		}, a = (e) => {
			var n = Sd();
			aa(n, (e) => ({ ...e }), [() => vc(U(c))]), J(z(n), () => t.children ?? f, () => s.snippetProps), j(n), K(e, n);
		};
		q(r, (e) => {
			t.child ? e(i) : e(a, -1);
		}), K(e, n);
	};
	q(u, (e) => {
		(s.shouldRender || i()) && e(d);
	}), K(e, l), N();
}
// ../vibebook/node_modules/bits-ui/dist/bits/dialog/components/dialog-trigger.svelte
var wd = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"ref",
	"children",
	"child",
	"disabled"
]), Td = /* @__PURE__ */ W("<button><!></button>");
function Ed(e, t) {
	let n = ei();
	M(t, !0);
	let r = Y(t, "id", 19, () => Tl(n)), i = Y(t, "ref", 15, null), a = Y(t, "disabled", 3, !1), o = /* @__PURE__ */ ka(t, wd), s = kl.create({
		id: $(() => r()),
		ref: $(() => i(), (e) => i(e)),
		disabled: $(() => !!a())
	}), c = /* @__PURE__ */ F(() => vc(o, s.props));
	var l = G(), u = B(l), d = (e) => {
		var n = G();
		J(B(n), () => t.child, () => ({ props: U(c) })), K(e, n);
	}, p = (e) => {
		var n = Td();
		aa(n, () => ({ ...U(c) })), J(z(n), () => t.children ?? f), j(n), K(e, n);
	};
	q(u, (e) => {
		t.child ? e(d) : e(p, -1);
	}), K(e, l), N();
}
// ../vibebook/node_modules/bits-ui/dist/bits/dialog/components/dialog-description.svelte
var Dd = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"children",
	"child",
	"ref"
]), Od = /* @__PURE__ */ W("<div><!></div>");
function kd(e, t) {
	let n = ei();
	M(t, !0);
	let r = Y(t, "id", 19, () => Tl(n)), i = Y(t, "ref", 15, null), a = /* @__PURE__ */ ka(t, Dd), o = Ml.create({
		id: $(() => r()),
		ref: $(() => i(), (e) => i(e))
	}), s = /* @__PURE__ */ F(() => vc(a, o.props));
	var c = G(), l = B(c), u = (e) => {
		var n = G();
		J(B(n), () => t.child, () => ({ props: U(s) })), K(e, n);
	}, d = (e) => {
		var n = Od();
		aa(n, () => ({ ...U(s) })), J(z(n), () => t.children ?? f), j(n), K(e, n);
	};
	q(l, (e) => {
		t.child ? e(u) : e(d, -1);
	}), K(e, c), N();
}
// ../vibebook/node_modules/bits-ui/dist/bits/dialog/components/dialog.svelte
function Ad(e, t) {
	M(t, !0);
	let n = Y(t, "open", 15, !1), r = Y(t, "onOpenChange", 3, wl), i = Y(t, "onOpenChangeComplete", 3, wl);
	Ol.create({
		variant: $(() => "dialog"),
		open: $(() => n(), (e) => {
			n(e), r()(e);
		}),
		onOpenChangeComplete: $(() => i())
	});
	var a = G();
	J(B(a), () => t.children ?? f), K(e, a), N();
}
// ../vibebook/node_modules/bits-ui/dist/bits/dialog/components/dialog-close.svelte
var jd = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"children",
	"child",
	"id",
	"ref",
	"disabled"
]), Md = /* @__PURE__ */ W("<button><!></button>");
function Nd(e, t) {
	let n = ei();
	M(t, !0);
	let r = Y(t, "id", 19, () => Tl(n)), i = Y(t, "ref", 15, null), a = Y(t, "disabled", 3, !1), o = /* @__PURE__ */ ka(t, jd), s = Al.create({
		variant: $(() => "close"),
		id: $(() => r()),
		ref: $(() => i(), (e) => i(e)),
		disabled: $(() => !!a())
	}), c = /* @__PURE__ */ F(() => vc(o, s.props));
	var l = G(), u = B(l), d = (e) => {
		var n = G();
		J(B(n), () => t.child, () => ({ props: U(c) })), K(e, n);
	}, p = (e) => {
		var n = Md();
		aa(n, () => ({ ...U(c) })), J(z(n), () => t.children ?? f), j(n), K(e, n);
	};
	q(u, (e) => {
		t.child ? e(d) : e(p, -1);
	}), K(e, l), N();
}
// ../vibebook/node_modules/bits-ui/dist/bits/dialog/components/dialog-content.svelte
var Pd = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"children",
	"child",
	"ref",
	"forceMount",
	"onCloseAutoFocus",
	"onOpenAutoFocus",
	"onEscapeKeydown",
	"onInteractOutside",
	"trapFocus",
	"preventScroll",
	"preventOverflowTextSelection",
	"restoreScrollDelay",
	"preventBodyPointerEvents"
]), Fd = /* @__PURE__ */ W("<!> <!>", 1), Id = /* @__PURE__ */ W("<!> <div><!></div>", 1);
function Ld(e, t) {
	let n = ei();
	M(t, !0);
	let r = Y(t, "id", 19, () => Tl(n)), i = Y(t, "ref", 15, null), a = Y(t, "forceMount", 3, !1), o = Y(t, "onCloseAutoFocus", 3, wl), s = Y(t, "onOpenAutoFocus", 3, wl), c = Y(t, "onEscapeKeydown", 3, wl), l = Y(t, "onInteractOutside", 3, wl), u = Y(t, "trapFocus", 3, !0), d = Y(t, "preventScroll", 3, !0), p = Y(t, "preventOverflowTextSelection", 3, !0), m = Y(t, "restoreScrollDelay", 3, null), h = Y(t, "preventBodyPointerEvents", 3, !0), g = /* @__PURE__ */ ka(t, Pd), _ = Nl.create({
		id: $(() => r()),
		ref: $(() => i(), (e) => i(e))
	}), v = () => h() || !_.root.overlayNode, y = /* @__PURE__ */ F(() => vc(g, _.props));
	var b = G(), x = B(b), S = (e) => {
		Ju(e, {
			get ref() {
				return _.opts.ref;
			},
			loop: !0,
			get trapFocus() {
				return u();
			},
			get enabled() {
				return _.root.opts.open.current;
			},
			get onOpenAutoFocus() {
				return s();
			},
			get onCloseAutoFocus() {
				return o();
			},
			focusScope: (e, n) => {
				let r = () => (n?.()).props;
				fu(e, ja(() => U(y), {
					get enabled() {
						return _.root.opts.open.current;
					},
					get ref() {
						return _.opts.ref;
					},
					onEscapeKeydown: (e) => {
						c()(e), e.defaultPrevented || _.root.handleClose();
					},
					children: (e, n) => {
						lu(e, ja(() => U(y), {
							get ref() {
								return _.opts.ref;
							},
							get enabled() {
								return _.root.opts.open.current;
							},
							onInteractOutside: (e) => {
								l()(e), e.defaultPrevented || _.root.handleClose();
							},
							children: (e, n) => {
								td(e, ja(() => U(y), {
									get preventOverflowTextSelection() {
										return p();
									},
									get ref() {
										return _.opts.ref;
									},
									get enabled() {
										return _.root.opts.open.current;
									},
									children: (e, n) => {
										var i = G(), a = B(i), o = (e) => {
											var n = Fd(), i = B(n), a = (e) => {
												bd(e, {
													get preventScroll() {
														return d();
													},
													get restoreScrollDelay() {
														return m();
													},
													blockPointer: v
												});
											};
											q(i, (e) => {
												_.root.opts.open.current && e(a);
											});
											var o = hn(i, 2);
											{
												let e = /* @__PURE__ */ F(() => ({
													props: vc(U(y), r()),
													..._.snippetProps
												}));
												J(o, () => t.child, () => U(e));
											}
											K(e, n);
										}, s = (e) => {
											var n = Id(), i = B(n);
											bd(i, {
												get preventScroll() {
													return d();
												},
												blockPointer: v
											});
											var a = hn(i, 2);
											aa(a, (e) => ({ ...e }), [() => vc(U(y), r())]), J(z(a), () => t.children ?? f), j(a), K(e, n);
										};
										q(a, (e) => {
											t.child ? e(o) : e(s, -1);
										}), K(e, i);
									},
									$$slots: { default: !0 }
								}));
							},
							$$slots: { default: !0 }
						}));
					},
					$$slots: { default: !0 }
				}));
			},
			$$slots: { focusScope: !0 }
		});
	};
	q(x, (e) => {
		(_.shouldRender || a()) && e(S);
	}), K(e, b), N();
}
// ../vibebook/node_modules/bits-ui/dist/bits/tabs/tabs.svelte.js
var Rd = Qc({
	component: "tabs",
	parts: [
		"root",
		"list",
		"trigger",
		"content"
	]
}), zd = new Cc("Tabs.Root"), Bd = class e {
	static create(t) {
		return zd.set(new e(t));
	}
	opts;
	attachment;
	rovingFocusGroup;
	#e = /* @__PURE__ */ L(nn([]));
	get triggerIds() {
		return U(this.#e);
	}
	set triggerIds(e) {
		R(this.#e, e, !0);
	}
	valueToTriggerId = new xc();
	valueToContentId = new xc();
	constructor(e) {
		this.opts = e, this.attachment = Gc(e.ref), this.rovingFocusGroup = new xl({
			candidateAttr: Rd.trigger,
			rootAttr: Rd.root,
			rootNode: this.opts.ref,
			loop: this.opts.loop,
			orientation: this.opts.orientation
		});
	}
	registerTrigger(e, t) {
		return this.triggerIds.push(e), this.valueToTriggerId.set(t, e), () => {
			this.triggerIds = this.triggerIds.filter((t) => t !== e), this.valueToTriggerId.delete(t);
		};
	}
	registerContent(e, t) {
		return this.valueToContentId.set(t, e), () => {
			this.valueToContentId.delete(t);
		};
	}
	setValue(e) {
		this.opts.value.current = e;
	}
	#t = /* @__PURE__ */ F(() => ({
		id: this.opts.id.current,
		"data-orientation": this.opts.orientation.current,
		[Rd.root]: "",
		...this.attachment
	}));
	get props() {
		return U(this.#t);
	}
	set props(e) {
		R(this.#t, e);
	}
}, Vd = class e {
	static create(t) {
		return new e(t, zd.get());
	}
	opts;
	root;
	attachment;
	#e = /* @__PURE__ */ F(() => this.root.opts.disabled.current);
	constructor(e, t) {
		this.opts = e, this.root = t, this.attachment = Gc(e.ref);
	}
	#t = /* @__PURE__ */ F(() => ({
		id: this.opts.id.current,
		role: "tablist",
		"aria-orientation": this.root.opts.orientation.current,
		"data-orientation": this.root.opts.orientation.current,
		[Rd.list]: "",
		"data-disabled": qc(U(this.#e)),
		...this.attachment
	}));
	get props() {
		return U(this.#t);
	}
	set props(e) {
		R(this.#t, e);
	}
}, Hd = class e {
	static create(t) {
		return new e(t, zd.get());
	}
	opts;
	root;
	attachment;
	#e = /* @__PURE__ */ L(0);
	#t = /* @__PURE__ */ F(() => this.root.opts.value.current === this.opts.value.current);
	#n = /* @__PURE__ */ F(() => this.opts.disabled.current || this.root.opts.disabled.current);
	#r = /* @__PURE__ */ F(() => this.root.valueToContentId.get(this.opts.value.current));
	constructor(e, t) {
		this.opts = e, this.root = t, this.attachment = Gc(e.ref), Ec([() => this.opts.id.current, () => this.opts.value.current], ([e, t]) => this.root.registerTrigger(e, t)), Dn(() => {
			this.root.triggerIds.length, U(this.#t) || !this.root.opts.value.current ? R(this.#e, 0) : R(this.#e, -1);
		}), this.onfocus = this.onfocus.bind(this), this.onclick = this.onclick.bind(this), this.onkeydown = this.onkeydown.bind(this);
	}
	#i() {
		this.root.opts.value.current !== this.opts.value.current && this.root.setValue(this.opts.value.current);
	}
	onfocus(e) {
		this.root.opts.activationMode.current !== "automatic" || U(this.#n) || this.#i();
	}
	onclick(e) {
		U(this.#n) || this.#i();
	}
	onkeydown(e) {
		U(this.#n) || (e.key === " " || e.key === "Enter" ? (e.preventDefault(), this.#i()) : this.root.rovingFocusGroup.handleKeydown(this.opts.ref.current, e));
	}
	#a = /* @__PURE__ */ F(() => ({
		id: this.opts.id.current,
		role: "tab",
		"data-state": Wd(U(this.#t)),
		"data-value": this.opts.value.current,
		"data-orientation": this.root.opts.orientation.current,
		"data-disabled": qc(U(this.#n)),
		"aria-selected": Kc(U(this.#t)),
		"aria-controls": U(this.#r),
		[Rd.trigger]: "",
		disabled: Jc(U(this.#n)),
		tabindex: U(this.#e),
		onclick: this.onclick,
		onfocus: this.onfocus,
		onkeydown: this.onkeydown,
		...this.attachment
	}));
	get props() {
		return U(this.#a);
	}
	set props(e) {
		R(this.#a, e);
	}
}, Ud = class e {
	static create(t) {
		return new e(t, zd.get());
	}
	opts;
	root;
	attachment;
	#e = /* @__PURE__ */ F(() => this.root.opts.value.current === this.opts.value.current);
	#t = /* @__PURE__ */ F(() => this.root.valueToTriggerId.get(this.opts.value.current));
	constructor(e, t) {
		this.opts = e, this.root = t, this.attachment = Gc(e.ref), Ec([() => this.opts.id.current, () => this.opts.value.current], ([e, t]) => this.root.registerContent(e, t));
	}
	#n = /* @__PURE__ */ F(() => ({
		id: this.opts.id.current,
		role: "tabpanel",
		hidden: Jc(!U(this.#e)),
		tabindex: this.opts.tabindex.current,
		"data-value": this.opts.value.current,
		"data-state": Wd(U(this.#e)),
		"aria-labelledby": U(this.#t),
		"data-orientation": this.root.opts.orientation.current,
		[Rd.content]: "",
		...this.attachment
	}));
	get props() {
		return U(this.#n);
	}
	set props(e) {
		R(this.#n, e);
	}
};
function Wd(e) {
	return e ? "active" : "inactive";
}
// ../vibebook/node_modules/bits-ui/dist/bits/tabs/components/tabs.svelte
var Gd = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"ref",
	"value",
	"onValueChange",
	"orientation",
	"loop",
	"activationMode",
	"disabled",
	"children",
	"child"
]), Kd = /* @__PURE__ */ W("<div><!></div>");
function qd(e, t) {
	let n = ei();
	M(t, !0);
	let r = Y(t, "id", 19, () => Tl(n)), i = Y(t, "ref", 15, null), a = Y(t, "value", 15, ""), o = Y(t, "onValueChange", 3, wl), s = Y(t, "orientation", 3, "horizontal"), c = Y(t, "loop", 3, !0), l = Y(t, "activationMode", 3, "automatic"), u = Y(t, "disabled", 3, !1), d = /* @__PURE__ */ ka(t, Gd), p = Bd.create({
		id: $(() => r()),
		value: $(() => a(), (e) => {
			a(e), o()(e);
		}),
		orientation: $(() => s()),
		loop: $(() => c()),
		activationMode: $(() => l()),
		disabled: $(() => u()),
		ref: $(() => i(), (e) => i(e))
	}), m = /* @__PURE__ */ F(() => vc(d, p.props));
	var h = G(), g = B(h), _ = (e) => {
		var n = G();
		J(B(n), () => t.child, () => ({ props: U(m) })), K(e, n);
	}, v = (e) => {
		var n = Kd();
		aa(n, () => ({ ...U(m) })), J(z(n), () => t.children ?? f), j(n), K(e, n);
	};
	q(g, (e) => {
		t.child ? e(_) : e(v, -1);
	}), K(e, h), N();
}
// ../vibebook/node_modules/bits-ui/dist/bits/tabs/components/tabs-content.svelte
var Jd = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"children",
	"child",
	"id",
	"ref",
	"value",
	"tabindex"
]), Yd = /* @__PURE__ */ W("<div><!></div>");
function Xd(e, t) {
	let n = ei();
	M(t, !0);
	let r = Y(t, "id", 19, () => Tl(n)), i = Y(t, "ref", 15, null), a = Y(t, "tabindex", 3, 0), o = /* @__PURE__ */ ka(t, Jd), s = Ud.create({
		value: $(() => t.value),
		tabindex: $(() => a() ?? 0),
		id: $(() => r()),
		ref: $(() => i(), (e) => i(e))
	}), c = /* @__PURE__ */ F(() => vc(o, s.props));
	var l = G(), u = B(l), d = (e) => {
		var n = G();
		J(B(n), () => t.child, () => ({ props: U(c) })), K(e, n);
	}, p = (e) => {
		var n = Yd();
		aa(n, () => ({ ...U(c) })), J(z(n), () => t.children ?? f), j(n), K(e, n);
	};
	q(u, (e) => {
		t.child ? e(d) : e(p, -1);
	}), K(e, l), N();
}
// ../vibebook/node_modules/bits-ui/dist/bits/tabs/components/tabs-list.svelte
var Zd = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"child",
	"children",
	"id",
	"ref"
]), Qd = /* @__PURE__ */ W("<div><!></div>");
function $d(e, t) {
	let n = ei();
	M(t, !0);
	let r = Y(t, "id", 19, () => Tl(n)), i = Y(t, "ref", 15, null), a = /* @__PURE__ */ ka(t, Zd), o = Vd.create({
		id: $(() => r()),
		ref: $(() => i(), (e) => i(e))
	}), s = /* @__PURE__ */ F(() => vc(a, o.props));
	var c = G(), l = B(c), u = (e) => {
		var n = G();
		J(B(n), () => t.child, () => ({ props: U(s) })), K(e, n);
	}, d = (e) => {
		var n = Qd();
		aa(n, () => ({ ...U(s) })), J(z(n), () => t.children ?? f), j(n), K(e, n);
	};
	q(l, (e) => {
		t.child ? e(u) : e(d, -1);
	}), K(e, c), N();
}
// ../vibebook/node_modules/bits-ui/dist/bits/tabs/components/tabs-trigger.svelte
var ef = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"child",
	"children",
	"disabled",
	"id",
	"type",
	"value",
	"ref"
]), tf = /* @__PURE__ */ W("<button><!></button>");
function nf(e, t) {
	let n = ei();
	M(t, !0);
	let r = Y(t, "disabled", 3, !1), i = Y(t, "id", 19, () => Tl(n)), a = Y(t, "type", 3, "button"), o = Y(t, "ref", 15, null), s = /* @__PURE__ */ ka(t, ef), c = Hd.create({
		id: $(() => i()),
		disabled: $(() => r() ?? !1),
		value: $(() => t.value),
		ref: $(() => o(), (e) => o(e))
	}), l = /* @__PURE__ */ F(() => vc(s, c.props, { type: a() }));
	var u = G(), d = B(u), p = (e) => {
		var n = G();
		J(B(n), () => t.child, () => ({ props: U(l) })), K(e, n);
	}, m = (e) => {
		var n = tf();
		aa(n, () => ({ ...U(l) })), J(z(n), () => t.children ?? f), j(n), K(e, n);
	};
	q(d, (e) => {
		t.child ? e(p) : e(m, -1);
	}), K(e, u), N();
}
// svelte/lib/ui/icons.ts
var rf = {
	close: ["M18 6 6 18M6 6l12 12"],
	check: ["m20 6-11 11-5-5"],
	chevronDown: ["m6 9 6 6 6-6"],
	chevronRight: ["m9 6 6 6-6 6"],
	search: ["M21 21l-4.35-4.35", "M19 11a8 8 0 1 1-16 0 8 8 0 0 1 16 0"],
	plus: ["M12 5v14M5 12h14"],
	calendar: ["M8 2v4M16 2v4M3 10h18", "M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2"],
	inbox: ["M22 12h-6l-2 3h-4l-2-3H2", "M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11"],
	warning: ["m10.3 3.9-8.5 14.2A2 2 0 0 0 3.5 21h17a2 2 0 0 0 1.7-2.9L13.7 3.9a2 2 0 0 0-3.4 0", "M12 9v4M12 17h.01"],
	sun: ["M12 3V1M12 23v-2M3 12H1M23 12h-2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4", "M17 12a5 5 0 1 1-10 0 5 5 0 0 1 10 0"],
	moon: ["M20.9 13A9 9 0 0 1 11 3.1 9 9 0 1 0 20.9 13"]
}, af = /* @__PURE__ */ Qr("<path></path>"), of = /* @__PURE__ */ Qr("<svg aria-hidden=\"true\" focusable=\"false\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></svg>");
function sf(e, t) {
	M(t, !0);
	var n = of();
	vi(n, 21, () => rf[t.name], mi, (e, t) => {
		var n = af();
		Fn(() => ra(n, "d", U(t))), K(e, n);
	}), j(n), Fn((e) => Ii(n, 0, e), [() => Ai(fs("tw:size-4 tw:shrink-0", t.class))]), K(e, n), N();
}
// ../vibebook/node_modules/tailwind-variants/dist/chunk-K5X3OHSH.js
var cf = Array.isArray, lf = (e) => {
	if (!e && e !== 0 && e !== 0n) return "";
	if (typeof e == "string") return e;
	if (typeof e == "number") return e === e ? "" + e : "";
	if (typeof e == "bigint") return "" + e;
	let t = "";
	if (cf(e)) {
		let n = e.length;
		for (let r = 0; r < n; r++) {
			let n = e[r];
			if (!n && n !== 0 && n !== 0n) continue;
			let i = typeof n == "string" ? n : lf(n);
			i && (t && (t += " "), t += i);
		}
		return t;
	}
	if (typeof e == "object") for (let n in e) e[n] && (t && (t += " "), t += n);
	return t;
}, uf = /\s+/g, df = Array.isArray, ff = (e) => typeof e != "string" || !e ? e : e.replace(uf, " ").trim(), pf = / {2}|[\t-\r\u00a0]/, mf = (e) => {
	let t = e.length;
	return t === 0 ? !1 : e.charCodeAt(0) === 32 || e.charCodeAt(t - 1) === 32 || pf.test(e);
}, hf = (e) => mf(e) ? ff(e) : e, gf = function() {
	let e = arguments.length, t = "", n = 0;
	for (; n < e; n++) {
		let e = arguments[n];
		if (e || e === 0 || e === 0n) {
			if (typeof e != "string") break;
			t && (t += " "), t += e;
		}
	}
	for (; n < e; n++) {
		let e = arguments[n];
		if (!e && e !== 0 && e !== 0n) continue;
		let r = typeof e == "string" ? e : lf(e);
		r && (t && (t += " "), t += r);
	}
	return t ? mf(t) ? ff(t) : t : "";
}, _f = (e) => e === !1 ? "false" : e === !0 ? "true" : e === 0 ? "0" : e, vf = (e) => {
	if (!e || typeof e != "object") return !0;
	for (let t in e) return !1;
	return !0;
}, yf = (e, t) => {
	let n = e;
	for (let e in t) if (Object.hasOwn(t, e)) {
		let r = t[e];
		n[e] = e in n ? gf(n[e], r) : r;
	}
	return e;
}, bf = (e, t) => {
	for (let n = 0; n < e.length; n++) {
		let r = e[n];
		df(r) ? bf(r, t) : r && t.push(r);
	}
}, xf = (...e) => {
	let t = [];
	return bf(e, t), t;
}, Sf = (e) => typeof e == "object" && !!e && !df(e), Cf = (e, t) => {
	let n = e, r = t, i = {};
	for (let e in n) {
		let t = n[e];
		if (e in r) {
			let n = r[e];
			i[e] = df(t) || df(n) ? xf(n, t) : Sf(t) && Sf(n) ? Cf(t, n) : Sf(t) && typeof n == "string" ? Cf(t, { base: n }) : typeof t == "string" && Sf(n) ? Cf({ base: t }, n) : n + " " + t;
		} else i[e] = t;
	}
	for (let e in r) e in n || (i[e] = r[e]);
	return i;
}, wf = {
	twMerge: !0,
	twMergeConfig: {}
}, Tf = 256, Ef = /* @__PURE__ */ Symbol("tv-cache-miss"), Df = (e) => e?.class != null && e.class !== "" || e?.className != null && e.className !== "", Of = /* @__PURE__ */ Symbol("tv-non-finite"), kf = (e, t) => {
	if (typeof t == "number" && !Number.isFinite(t)) throw Of;
	return t;
}, Af = (e) => {
	if (e === void 0) return "";
	if (e === null) return "null";
	let t = typeof e;
	if (t === "string") return e;
	if (t === "boolean") return e ? "true" : "false";
	if (t === "number" || t === "bigint") return String(e);
	if (t === "object") try {
		return JSON.stringify(e, kf);
	} catch {
		return null;
	}
	return null;
}, jf = 0, Mf = 1, Nf = 2, Pf = 0, Ff = 1, If = 2, Lf = 3, Rf = 0, zf = 1, Bf = 2, Vf = (e) => {
	let t = Object.getPrototypeOf(e);
	return t === Object.prototype || t === null;
}, Hf = (e) => typeof e == "number" && !Number.isFinite(e), Uf = (e, t, n) => {
	try {
		return e.kinds[t] = Lf, e.tokens[t] = JSON.stringify(n, kf), !0;
	} catch {
		return !1;
	}
}, Wf = (e, t, n) => {
	if (typeof n != "object" || !n) return e.kinds[t] = Pf, e.tokens[t] = n, !0;
	if (Array.isArray(n)) {
		for (let r = 0; r < n.length; r++) {
			let i = n[r];
			if (typeof i == "object" && i) return Uf(e, t, n);
			if (Hf(i)) return !1;
		}
		return e.kinds[t] = Ff, e.tokens[t] = n.slice(), !0;
	}
	if (Vf(n)) {
		let r = [];
		for (let i in n) {
			let a = n[i];
			if (Hf(a)) return !1;
			if (typeof a == "object" && a) return Uf(e, t, n);
			if (typeof a == "bigint") return !1;
			r.push(i, a);
		}
		return e.kinds[t] = If, e.tokens[t] = r, !0;
	}
	return Uf(e, t, n);
}, Gf = (e, t, n) => {
	if (e === Pf) return Object.is(t, n) ? Rf : zf;
	if (typeof n != "object" || !n) return zf;
	if (e === Ff) {
		let e = t;
		if (!Array.isArray(n) || n.length !== e.length) return zf;
		for (let t = 0; t < e.length; t++) if (!Object.is(e[t], n[t])) return zf;
		return Rf;
	}
	if (e === If) {
		if (Array.isArray(n) || !Vf(n)) return zf;
		let e = t, r = 0;
		for (let t in n) {
			if (r >= e.length || e[r] !== t || !Object.is(e[r + 1], n[t])) return zf;
			r += 2;
		}
		return r === e.length ? Rf : zf;
	}
	try {
		return JSON.stringify(n, kf) === t ? Rf : zf;
	} catch {
		return Bf;
	}
}, Kf = (e) => Array.isArray(e) ? e : void 0, qf = (e, t, n) => {
	let r = Kf(n);
	e.kinds[t] = r === void 0 ? Pf : Ff, e.tokens[t] = r === void 0 ? void 0 : r.slice();
}, Jf = (e, t, n) => {
	let r = 0;
	for (let n = 0; n < t.length; n++) {
		let { conditionKeys: i, source: a } = t[n];
		for (let t = 0; t < i.length; t++) if (!Wf(e, r++, a[i[t]])) return !1;
		if (!Wf(e, r++, a.class) || !Wf(e, r++, a.className)) return !1;
	}
	for (let t = 0; t < n.length; t++) {
		let { conditionKeys: i, source: a } = n[t];
		for (let t = 0; t < i.length; t++) if (!Wf(e, r++, a[i[t]])) return !1;
		if (qf(e, r++, a.slots), !Wf(e, r++, a.class) || !Wf(e, r++, a.className)) return !1;
	}
	return e.kinds.length = r, e.tokens.length = r, !0;
}, Yf = ({ kinds: e, tokens: t }, n, r) => {
	let i = e.length, a = 0, o;
	for (let r = 0; r < n.length; r++) {
		let { conditionKeys: s, source: c } = n[r];
		if (a + s.length + 2 > i) return zf;
		for (let n = 0; n < s.length; n++, a++) if (o = Gf(e[a], t[a], c[s[n]]), o !== Rf) return o;
		if (o = Gf(e[a], t[a], c.class), o !== Rf || (a++, o = Gf(e[a], t[a], c.className), o !== Rf)) return o;
		a++;
	}
	for (let n = 0; n < r.length; n++) {
		let { conditionKeys: s, source: c } = r[n];
		if (a + s.length + 3 > i) return zf;
		for (let n = 0; n < s.length; n++, a++) if (o = Gf(e[a], t[a], c[s[n]]), o !== Rf) return o;
		if (o = Gf(e[a], t[a], Kf(c.slots)), o !== Rf || (a++, o = Gf(e[a], t[a], c.class), o !== Rf) || (a++, o = Gf(e[a], t[a], c.className), o !== Rf)) return o;
		a++;
	}
	return a === i ? Rf : zf;
}, Xf = () => {
	let e = null;
	return (t, n) => {
		if (e !== null) {
			let r = Yf(e, t, n);
			if (r === Rf) return jf;
			if (r === Bf) return e = null, Nf;
		}
		let r = {
			kinds: [],
			tokens: []
		};
		return Jf(r, t, n) ? (e = r, Mf) : (e = null, Nf);
	};
}, Zf = /* @__PURE__ */ Symbol("tv-uncacheable"), Qf = () => ({
	children: /* @__PURE__ */ new Map(),
	hasLeaf: !1,
	leaf: void 0
}), $f = (e, t, n, r) => {
	let i = t[e];
	return n && n[e] !== void 0 && (i = n[e]), r && r[e] !== void 0 && (i = r[e]), i;
}, ep = (e, t, n) => {
	let r = e.children.get(t);
	if (!r) {
		if (!n) return;
		r = Qf(), e.children.set(t, r);
	}
	return r;
}, tp = (e, t = Tf) => {
	let n = Qf(), r = null, i = 0, a = /* @__PURE__ */ Object.create(null);
	for (let t = 0; t < e.length; t++) a[e[t]] = 1;
	let o = (e, t, n) => {
		let r = null, i = null;
		for (let t in e) t === "class" || t === "className" || a[t] || ((i ??= /* @__PURE__ */ Object.create(null))[t] = 1, (r ??= []).push(t));
		if (t) for (let e in t) e === "class" || e === "className" || a[e] || i?.[e] || t[e] === void 0 || ((i ??= /* @__PURE__ */ Object.create(null))[e] = 1, (r ??= []).push(e));
		if (n) for (let e in n) e === "class" || e === "className" || a[e] || i?.[e] || n[e] === void 0 || ((i ??= /* @__PURE__ */ Object.create(null))[e] = 1, (r ??= []).push(e));
		return r && r.length > 1 && r.sort(), r;
	}, s = (t, n, r, i, a, o) => {
		let s = t;
		for (let t = 0; t < e.length; t++) {
			let a = Af($f(e[t], n, r, i));
			if (a === null) return Zf;
			if (s = ep(s, a, o), !s) return;
		}
		if (a) for (let e = 0; e < a.length; e++) {
			let t = a[e], c = Af($f(t, n, r, i));
			if (c === null) return Zf;
			if (s = ep(s, t + "\0" + c, o), !s) return;
		}
		return s;
	};
	return {
		get(e, t, a) {
			let c = o(e, t, a), l = s(n, e, t, a, c, !1);
			if (l === Zf) return Zf;
			if (l && l.hasLeaf) return l.leaf;
			if (r) {
				let o = s(r, e, t, a, c, !1);
				if (o === Zf) return Zf;
				if (o && o.hasLeaf) {
					let r = s(n, e, t, a, c, !0);
					return r !== Zf && r && (r.hasLeaf || i++, r.hasLeaf = !0, r.leaf = o.leaf), o.leaf;
				}
			}
			return Ef;
		},
		set(e, a, c, l) {
			i >= t && (r = n, n = Qf(), i = 0);
			let u = o(e, a, c), d = s(n, e, a, c, u, !0);
			d !== Zf && d && (d.hasLeaf || i++, d.hasLeaf = !0, d.leaf = l);
		},
		clear() {
			n = Qf(), r = null, i = 0;
		}
	};
}, np = (e) => (t, n) => Df(n) ? e.override(t, n.class, n.className) : t, rp = () => ({
	base: void 0,
	variants: {},
	defaultVariants: {},
	slots: {},
	compoundVariants: [],
	compoundSlots: []
}), ip = (e) => ({
	base: e.base,
	variants: e.variants ?? {},
	defaultVariants: e.defaultVariants ?? {},
	slots: e.slots ?? {},
	compoundVariants: e.compoundVariants ?? [],
	compoundSlots: e.compoundSlots ?? []
}), ap = (e, t) => {
	let n = e.base != null || t.base != null ? gf(e.base, t.base) : void 0, r = vf(t.variants) ? e.variants : vf(e.variants) ? t.variants : Cf(t.variants, e.variants), i = vf(t.defaultVariants) ? e.defaultVariants : {
		...e.defaultVariants,
		...t.defaultVariants
	}, a = vf(e.slots), o = vf(t.slots), s;
	s = a && o ? {} : a ? e.base == null ? { ...t.slots } : yf({ base: e.base }, { ...t.slots }) : o ? t.base == null ? { ...e.slots } : yf({ ...e.slots }, { base: t.base }) : yf({ ...e.slots }, t.slots);
	let c = vf(t.compoundVariants) ? e.compoundVariants : vf(e.compoundVariants) ? t.compoundVariants : xf(e.compoundVariants, t.compoundVariants), l = vf(t.compoundSlots) ? e.compoundSlots : vf(e.compoundSlots) ? t.compoundSlots : xf(e.compoundSlots, t.compoundSlots);
	return {
		base: n,
		variants: r,
		defaultVariants: i,
		slots: s,
		compoundVariants: c,
		compoundSlots: l
	};
}, op = (e) => {
	let t = rp();
	for (let n = 0; n < e.length; n++) t = ap(t, ip(e[n]));
	return t;
}, sp = (e) => e ? hf(lf(e)) : "", cp = (e) => {
	let t = sp(e.class), n = sp(e.className);
	return t ? n ? t + " " + n : t : n;
}, lp = (e, t, n) => {
	if (!n) return;
	let r = e[t];
	e[t] = r ? r + " " + n : n;
}, up = (e) => {
	let t = {}, n = [e.class, e.className];
	for (let e = 0; e < n.length; e++) {
		let r = n[e];
		if (typeof r == "string" || Array.isArray(r)) lp(t, "base", sp(r));
		else if (r && typeof r == "object") for (let e in r) lp(t, e, sp(r[e]));
	}
	return t;
}, dp = (e, t) => {
	let n = [];
	for (let r = 0; r < t.length; r++) {
		let i = t[r], a = e[i];
		n.push({
			key: i,
			values: a,
			isEmpty: vf(a),
			normalizedFrom: null,
			normalized: null
		});
	}
	return n;
}, fp = (e, t, n, r) => {
	let i;
	if (!r || typeof n == "string" || Array.isArray(n)) i = sp(n);
	else if (n && typeof n == "object") {
		let e = {};
		for (let t in n) {
			let r = sp(n[t]);
			r && (e[t] = r);
		}
		i = e;
	} else i = "";
	return (e.normalizedFrom ??= {})[t] = n, (e.normalized ??= {})[t] = i, i;
}, pp = (e, t) => {
	for (let t = 0; t < e.length; t++) e[t].classes = null, e[t].slotClasses = null;
	for (let e = 0; e < t.length; e++) t[e].classes = null;
}, mp = (e) => {
	if (!Array.isArray(e) || e.length === 0) return [];
	let t = [];
	for (let n = 0; n < e.length; n++) {
		let r = e[n], i = [];
		for (let e in r) e !== "class" && e !== "className" && i.push(e);
		t.push({
			conditionKeys: i,
			source: r,
			classes: null,
			slotClasses: null
		});
	}
	return t;
}, hp = (e) => {
	if (!Array.isArray(e) || e.length === 0) return [];
	let t = [];
	for (let n = 0; n < e.length; n++) {
		let r = e[n], i = [];
		for (let e in r) e !== "slots" && e !== "class" && e !== "className" && i.push(e);
		t.push({
			conditionKeys: i,
			source: r,
			classes: null
		});
	}
	return t;
}, gp = (e) => {
	let t = {};
	for (let n = 0; n < e.length; n++) {
		let r = e[n], i = r.source.slots;
		if (Array.isArray(i)) for (let e = 0; e < i.length; e++) {
			let n = i[e];
			t[n] || (t[n] = []), t[n].push(r);
		}
	}
	return t;
}, _p = (e, t) => {
	let { extend: n = null, base: r, slots: i, variants: a = {}, compoundVariants: o = [], compoundSlots: s = [], defaultVariants: c = {} } = e, l = i !== void 0, u = l ? i : {}, d = n, f = null;
	if (Array.isArray(d)) {
		let e = d.filter(Boolean);
		e.length === 1 ? f = e[0] : e.length > 1 && (f = op(e));
	} else d != null && (f = d);
	let p = {
		...wf,
		...t
	}, m = f?.base ? gf(f.base, r) : r, h = f?.variants && !vf(f.variants) ? Cf(a, f.variants) : a, g = f?.defaultVariants && !vf(f.defaultVariants) ? {
		...f.defaultVariants,
		...c
	} : c, _ = !f?.slots || vf(f.slots), v = l ? _ && f?.base ? gf(r, f.base) : typeof r == "string" || r == null ? r : gf(r) : void 0, y = l ? {
		base: v,
		...u
	} : {}, b = _ ? y : yf({ ...f?.slots }, vf(y) ? { base: r } : y), x = !f?.compoundVariants || vf(f.compoundVariants) ? o : xf(f?.compoundVariants, o), S = !f?.compoundSlots || vf(f.compoundSlots) ? s : xf(f?.compoundSlots, s), ee = Object.keys(h);
	return {
		config: p,
		extend: d,
		base: m,
		variants: h,
		defaultVariants: g,
		slots: b,
		compoundVariants: x,
		compoundSlots: S,
		compiledVariants: null,
		compiledCompoundVariants: null,
		compiledCompoundSlots: null,
		compiledCompoundSlotsBySlot: null,
		deferredError: x && !Array.isArray(x) ? /* @__PURE__ */ TypeError(`The "compoundVariants" prop must be an array. Received: ${typeof x}`) : S && !Array.isArray(S) ? /* @__PURE__ */ TypeError(`The "compoundSlots" prop must be an array. Received: ${typeof S}`) : null,
		mode: l || !_ ? "slots" : ee.length === 0 ? "plain" : "variants",
		slotKeys: null,
		variantKeys: ee
	};
}, vp = (e) => (e.compiledVariants === null && (e.compiledVariants = dp(e.variants, e.variantKeys), e.compiledCompoundVariants = mp(e.compoundVariants), e.compiledCompoundSlots = hp(e.compoundSlots), e.compiledCompoundSlotsBySlot = gp(e.compiledCompoundSlots), e.slotKeys = Object.keys(e.slots)), e), yp = [], bp = [], xp = (e, t, n, r) => {
	let i = t[e];
	return n && n[e] !== void 0 && (i = n[e]), r && r[e] !== void 0 && (i = r[e]), i;
}, Sp = (e) => e == null || e === !1, Cp = (e, t) => {
	if (!Array.isArray(e)) return e === t || Sp(e) && Sp(t);
	for (let n = 0; n < e.length; n++) {
		let r = e[n];
		if (r === t || Sp(r) && Sp(t)) return !0;
	}
	return !1;
}, wp = (e, t) => `${_f(e[t]) || "false"}`, Tp = (e, t, n, r, i) => {
	if (e.isEmpty) return "";
	let a = r?.[e.key] ?? n?.[e.key];
	if (a === null) return "";
	let o = _f(a);
	if (typeof o == "object") return "";
	let s = t?.[e.key], c = (o ?? _f(s)) || "false", l = e.values[c];
	if (!l) return "";
	if (typeof l == "string") return l;
	let u = e.normalizedFrom;
	return u !== null && u[c] === l ? e.normalized[c] : fp(e, c, l, i);
}, Ep = (e, t) => typeof e == "string" ? t === "base" ? e : "" : e[t] ?? "", Dp = (e, t, n, r) => {
	let { conditionKeys: i, source: a } = e;
	for (let e = 0; e < i.length; e++) {
		let o = i[e];
		if (!Cp(a[o], xp(o, t, n, r))) return !1;
	}
	return !0;
}, Op = (e, t, n, r, i, a) => {
	for (let o = 0; o < n.length; o++) {
		let s = n[o], c = Tp(s, r, i, void 0, !1);
		c && (e[t++] = c, a && (a[s.key] = c));
	}
	return t;
}, kp = (e, t, n, r, i, a, o, s) => {
	for (let c = 0; c < r.length; c++) {
		let l = r[c], u = Ep(Tp(l, i, a, o, !0), n);
		u && (e[t++] = u, s && (s[l.key] = u));
	}
	return t;
}, Ap = (e, t, n, r, i) => {
	for (let a = 0; a < n.length; a++) {
		let o = n[a], s = o.classes;
		s !== "" && Dp(o, r, i) && (s === null && (s = o.classes = cp(o.source)), s && (e[t++] = s));
	}
	return t;
}, jp = (e, t, n, r, i, a, o) => {
	for (let s = 0; s < r.length; s++) {
		let c = r[s], l = c.slotClasses;
		if (l !== null && !l[n] || !Dp(c, i, a, o)) continue;
		l === null && (l = c.slotClasses = up(c.source));
		let u = l[n];
		u && (e[t++] = u);
	}
	return t;
}, Mp = (e, t, n, r, i, a) => {
	for (let o = 0; o < n.length; o++) {
		let s = n[o], c = s.classes;
		c !== "" && Dp(s, r, i, a) && (c === null && (c = s.classes = cp(s.source)), c && (e[t++] = c));
	}
	return t;
}, Np = 0, Pp = 1, Fp = 2, Ip = (e, t) => {
	let n = /* @__PURE__ */ Object.create(null);
	for (let t = 0; t < e.length; t++) {
		let r = e[t].conditionKeys;
		for (let e = 0; e < r.length; e++) n[r[e]] = 1;
	}
	for (let e = 0; e < t.length; e++) {
		let r = t[e].conditionKeys;
		for (let e = 0; e < r.length; e++) n[r[e]] = 1;
	}
	return n;
}, Lp = (e, t, n, r) => {
	let i = Pp;
	for (let a in e) {
		let o = e[a];
		if (a === "class" || a === "className") {
			o != null && o !== "" && (i = Fp);
			continue;
		}
		if (o === void 0) continue;
		if (t[a] === void 0) {
			if (r()[a]) return Np;
			continue;
		}
		let s = n[a];
		if (o === s) continue;
		if (o === null) return Np;
		let c = typeof o;
		if (c === typeof s && (c === "string" || c === "boolean") && o !== "" && s !== "") return Np;
		let l = _f(o);
		if (typeof l == "object" || `${l || "false"}` !== wp(n, a)) return Np;
	}
	return i;
}, Rp = () => ({
	defaults: [],
	optionKeys: [],
	options: []
}), zp = (e, t, n) => {
	for (let r = 0; r < e.length; r++) {
		let i = e[r], a = wp(t, i.key);
		n.defaults[r] = t[i.key], n.optionKeys[r] = a, n.options[r] = i.isEmpty ? void 0 : i.values[a];
	}
}, Bp = (e, t, n) => {
	for (let r = 0; r < e.length; r++) {
		let i = e[r];
		if (t[i.key] !== n.defaults[r] || !i.isEmpty && i.values[n.optionKeys[r]] !== n.options[r]) return !1;
	}
	return !0;
}, Vp = (e, t) => {
	let { base: n, deferredError: r } = e, i = Ef, a = np(t);
	return ((e) => {
		if (r) throw r;
		if (i === Ef) {
			let e = sp(n);
			bp[0] = e, i = t.parts(bp, +!!e);
		}
		return a(i, e);
	});
}, Hp = (e, t) => {
	let { base: n, defaultVariants: r, deferredError: i, variantKeys: a, variants: o } = e, s = e.compiledCompoundVariants, c = e.compiledVariants, l = yp, u = "", d = !1, f = null, p = null, m = null, h = np(t), g = 1, _ = null, v = null, y = () => {
		(c === null || s === null) && (vp(e), c = e.compiledVariants, s = e.compiledCompoundVariants, l = e.compiledCompoundSlots ?? yp, u = sp(n), d = s.length > 0 || l.length > 0);
	}, b = () => f ??= Ip(s, l), x = (e) => {
		let n = bp, i = 0;
		return u && (n[i++] = u), i = Op(n, i, c, r, e), s.length > 0 && (i = Ap(n, i, s, r, e)), t.parts(n, i);
	}, S = () => {
		let e = (m ??= Xf())(s, l);
		return e === jf || (pp(s, l), e !== Nf && (p = null, _ = null, !0));
	}, ee = () => (_ !== null && Bp(c, r, v) || (_ = x(void 0), zp(c, r, v ??= Rp())), _);
	return ((e) => {
		if (i) throw i;
		y();
		let t = e == null ? Pp : Lp(e, o, r, b);
		if (t !== Np) {
			let n;
			return d ? g > 0 ? (g = 0, n = x(e)) : n = S() ? ee() : x(e) : (g = 0, n = ee()), t === Fp ? h(n, e) : n;
		}
		let n;
		if (g > 0) g--, n = x(e);
		else if (d && !S()) n = x(e);
		else {
			p ??= tp(a);
			let t = p.get(r, e);
			t === Zf ? n = x(e) : t === Ef ? (n = x(e), p.set(r, e, void 0, n)) : n = t;
		}
		return h(n, e);
	});
}, Up = (e, t) => {
	let { defaultVariants: n, deferredError: r, slots: i, variantKeys: a, variants: o } = e, s = null, c = null, l = null, u = null, d = null, f = !1, p = null, m = null, h = null, g = null, _ = 1, v = null, y = null, b = null, x = () => {
		if (u !== null) return;
		(e.compiledVariants === null || e.compiledCompoundVariants === null || e.compiledCompoundSlots === null || e.compiledCompoundSlotsBySlot === null || e.slotKeys === null) && vp(e), s = e.compiledVariants, c = e.compiledCompoundVariants, l = e.compiledCompoundSlots;
		let r = e.compiledCompoundSlotsBySlot;
		u = e.slotKeys, f = c.length > 0 || l.length > 0, m = np(t);
		let a = Array(u.length);
		for (let e = 0; e < u.length; e++) {
			let o = u[e], l = r[o] ?? yp, d, p = "";
			a[e] = (e, r) => {
				let a = bp, u = 0, m = i[o];
				return m !== d && (d = m, p = sp(m)), p && (a[u++] = p), u = kp(a, u, o, s, n, e, r), f && (u = jp(a, u, o, c, n, e, r), u = Mp(a, u, l, n, e, r)), t.parts(a, u);
			};
		}
		d = a;
	}, S = (e) => {
		let t = u, n = d, r = m, i = {};
		for (let a = 0; a < t.length; a++) {
			let o = n[a], s = o(e, void 0);
			i[t[a]] = (t) => {
				if (t == null) return s;
				let n = !1;
				for (let e in t) if (e !== "class" && e !== "className" && t[e] !== void 0) {
					n = !0;
					break;
				}
				return r(n ? o(e, t) : s, t);
			};
		}
		return i;
	}, ee = () => {
		let e = (g ??= Xf())(c, l);
		return e === jf || (pp(c, l), e !== Nf && (h = null, v = null, !0));
	}, C = () => p ??= Ip(c, l), w = () => {
		if (!Bp(s, n, y)) return !1;
		let e = u, t = b;
		for (let n = 0; n < e.length; n++) if (i[e[n]] !== t[n]) return !1;
		return !0;
	}, te = () => {
		if (v === null || !w()) {
			v = S(void 0), zp(s, n, y ??= Rp());
			let e = u, t = b ??= [];
			for (let n = 0; n < e.length; n++) t[n] = i[e[n]];
		}
		return v;
	};
	return ((e) => {
		if (r) throw r;
		if (x(), (e == null ? Pp : Lp(e, o, n, C)) !== Np) return f ? _ > 0 ? (_ = 0, S(e)) : ee() ? te() : S(e) : (_ = 0, te());
		if (_ > 0) return _--, S(e);
		if (f && !ee()) return S(e);
		h ??= tp(a);
		let t = h.get(n, e);
		if (t === Zf) return S(e);
		if (t !== Ef) return t;
		let i = S(e);
		return h.set(n, e, void 0, i), i;
	});
}, Wp = (e, t) => {
	if (e.mode === "plain") return Vp(e, t);
	let n;
	return ((r) => (n ??= e.mode === "slots" ? Up(e, t) : Hp(e, t), n(r)));
}, Gp = (e, t) => {
	let n = {
		...e,
		...t
	};
	return e.twMergeConfig && t.twMergeConfig && (n.twMergeConfig = {
		...e.twMergeConfig,
		...t.twMergeConfig
	}), n;
}, Kp = (e, t) => {
	e.variantKeys = t.variantKeys, e.extend = t.extend, e.base = t.base, e.slots = t.slots, e.variants = t.variants, e.defaultVariants = t.defaultVariants, e.compoundSlots = t.compoundSlots, e.compoundVariants = t.compoundVariants;
}, qp = (e, t) => {
	let n = (n, r) => {
		let i = _p(n, r), a = Wp(i, e(i.config));
		return Kp(a, i), t ? t(a, i, Kp) : a;
	};
	return {
		tv: n,
		createTV: (e) => (t, r) => n(t, r && e ? Gp(e, r) : r ?? e)
	};
}, Jp = "line" in /* @__PURE__ */ Error(), Yp = -1, Xp = -1, Zp = (e, t, n) => {
	let r = 2166136261;
	for (let i = t; i < n; i++) r = Math.imul(r ^ e.charCodeAt(i), 16777619);
	return r;
}, Qp = (e, t, n) => {
	let r = n - t, i = Math.imul(r, 2654435761) ^ e.charCodeAt(t);
	if (r > 3) {
		let a = r >> 2, o = r >> 1;
		i = Math.imul(i ^ e.charCodeAt(t + 1) << 8 ^ e.charCodeAt(t + 2) << 16 ^ e.charCodeAt(t + a), 2246822507), i = Math.imul(i ^ e.charCodeAt(t + o) << 8 ^ e.charCodeAt(t + o + a) << 16 ^ e.charCodeAt(n - 3), 3266489909), i ^= e.charCodeAt(n - 2) << 8 ^ e.charCodeAt(n - 1) << 16;
		for (let r = t + 3, a = n - 4; r < t + 8 && r < a; r++, a--) i = Math.imul(i ^ e.charCodeAt(r) ^ e.charCodeAt(a) << 8, 16777619);
	}
	return i ^ i >>> 15;
}, $p = (e, t, n = {}) => {
	let { GROUP_COUNT: r, edgeStart: i, labelStart: a, labelText: o, edgeTarget: s, nodeGroup: c, nodeVlist: l, vlistPat: u, vlistOps: d, vlistRef: f, vlistGroup: p, litAnchor: m, litGroup: h, litPool: g, poolOffsets: _, poolText: v, adjGid: y, adjStart: b, adjTgt: x, patGid: S, patTgt: ee, postfixLookupGroups: C, customValidatorNames: w, orderSensitiveModifiers: te } = e, ne = new Int32Array(r).fill(-1);
	for (let e = 0; e < y.length; e++) ne[y[e]] = e;
	let re = 0;
	for (let e = 0; e + 1 < b.length; e++) {
		let t = b[e + 1] - b[e];
		t > re && (re = t);
	}
	let ie = 32;
	for (; ie < 2 * (1 + re + S.length);) ie <<= 1;
	let ae = new Int32Array(f.length + 1);
	for (let e = 0; e < f.length; e++) ae[e + 1] = ae[e] + u[f[e] + 1] - u[f[e]];
	let oe = new Uint8Array(r);
	for (let e = 0; e < C.length; e++) oe[C[e]] = 1;
	let se = i.length - 1, ce = new Uint8Array(se), le = 0, ue = !0;
	for (let e = 0; e < m.length; e++) {
		ce[m[e]] = 1;
		let t = _[g[e] * 2 + 1];
		t > le && (le = t);
		let n = v.charCodeAt(_[g[e] * 2]);
		(n === 91 || n === 40) && (ue = !1);
	}
	let T = 1;
	for (; T < m.length * 2;) T <<= 1;
	let de = new Int32Array(T).fill(-1);
	for (let e = 0; e < m.length; e++) {
		let t = _[g[e] * 2], n = (Zp(v, t, t + _[g[e] * 2 + 1]) ^ Math.imul(m[e], 2654435761) | 0) & T - 1;
		for (; de[n] !== -1;) n = n + 1 & T - 1;
		de[n] = e;
	}
	let fe = (e, t, n, r) => {
		let i = (Zp(t, n, r) ^ Math.imul(e, 2654435761) | 0) & T - 1, a = r - n;
		for (;;) {
			let r = de[i];
			if (r === -1) return -1;
			if (m[r] === e && _[g[r] * 2 + 1] === a) {
				let e = _[g[r] * 2], i = !0;
				for (let r = 0; r < a; r++) if (v.charCodeAt(e + r) !== t.charCodeAt(n + r)) {
					i = !1;
					break;
				}
				if (i) return h[r];
			}
			i = i + 1 & T - 1;
		}
	}, pe = n.cacheSize ?? 8192, me = n.prefix ?? e.prefix ?? "", he = me === "" ? "" : me + ":", E = he.length, D = (w ?? []).map((e) => {
		let n = t && t[e];
		if (!n) throw Error("cn: missing validator " + e);
		return n;
	}), ge = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, O = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, _e = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, ve = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, ye = 0, be = -1, xe = -1, Se = -1, k = -1, Ce = (e) => e >= 97 && e <= 122 || e >= 65 && e <= 90 || e >= 48 && e <= 57 || e === 95, A = (e) => /\s/.test(String.fromCharCode(e)), we = (e, t, n) => {
		if (ye = 0, be = -1, n - t < 3) return;
		let r = e.charCodeAt(t), i = e.charCodeAt(n - 1);
		if (r === 91 && i === 93) ye = 1;
		else if (r === 40 && i === 41) ye = 2;
		else return;
		Se = t + 1, k = n - 1;
		let a = t + 1;
		if (Ce(e.charCodeAt(a))) {
			for (a++; a < n - 1;) {
				let t = e.charCodeAt(a);
				if (!Ce(t) && t !== 45) break;
				a++;
			}
			a < n - 2 && e.charCodeAt(a) === 58 && (be = t + 1, xe = a, Se = a + 1);
		}
	}, Te = (e, t, n, r) => {
		if (n - t !== r.length) return !1;
		for (let n = 0; n < r.length; n++) if (e.charCodeAt(t + n) !== r.charCodeAt(n)) return !1;
		return !0;
	}, j = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/, Ee = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, De = (e) => !!e && !Number.isNaN(Number(e)), Oe = (e, t, n) => {
		if (n - t < 11 || !Te(e, t, t + 10, "@container")) return !1;
		if (e.charCodeAt(t + 10) === 47) return n - t >= 12;
		let r = e.charCodeAt(t + 11);
		return r === 115 && n - t >= 17 && Te(e, t + 10, t + 16, "-size/") || r === 110 && n - t >= 19 && Te(e, t + 10, t + 18, "-normal/");
	}, ke = [
		1,
		1,
		1,
		1,
		1,
		1,
		1,
		1,
		2,
		2,
		2,
		2,
		2,
		2,
		2
	], Ae = "length|number|number weight|family-name|position percentage|length size bg-size|image url|shadow|length|family-name|position percentage|length size bg-size|image url|shadow|number weight".split("|").map((e) => e.split(" ")), je = [
		2,
		3,
		3,
		6,
		0,
		0,
		4,
		5,
		0,
		0,
		0,
		0,
		0,
		1,
		1
	], Me = (e, t, n, r) => {
		if (e >= 10) {
			if (e >= 25) return D[e - 25](t.slice(n, r));
			let i = e - 10;
			if (ye !== ke[i]) return !1;
			if (be >= 0) {
				for (let e of Ae[i]) if (Te(t, be, xe, e)) return !0;
				return !1;
			}
			switch (je[i]) {
				case 0: return !1;
				case 1: return !0;
				case 2: {
					let e = t.slice(Se, k);
					return ge.test(e) && !O.test(e);
				}
				case 3: return De(t.slice(Se, k));
				case 4: return ve.test(t.slice(Se, k));
				case 5: return _e.test(t.slice(Se, k));
				default: return !De(t.slice(Se, k));
			}
		}
		switch (e) {
			case 0: return !0;
			case 1: return ye === 0;
			case 2: return ye === 1;
			case 3: return ye === 2;
			case 4: return j.test(t.slice(n, r));
			case 5: return De(t.slice(n, r));
			case 6: {
				let e = t.slice(n, r);
				return !!e && Number.isInteger(Number(e));
			}
			case 7: return r > n && t.charCodeAt(r - 1) === 37 && De(t.slice(n, r - 1));
			case 8: return Ee.test(t.slice(n, r));
			default: return Oe(t, n, r);
		}
	}, Ne = new Set(typeof te == "string" ? te.split(" ") : te), Pe = (e, t, n, r, i, a) => {
		let o = Zp(t, n, r) ^ (i ? 2654435769 : 0), s = e.get(o);
		if (s !== void 0) outer: for (let e = 0; e < s.length; e++) {
			let a = s[e];
			if (a.imp === i && a.k.length === r - n) {
				for (let e = 0; e < a.k.length; e++) if (a.k.charCodeAt(e) !== t.charCodeAt(n + e)) continue outer;
				return a.id;
			}
		}
		else e.set(o, s = []);
		let c = t.slice(n, r), l = a(c);
		return s.push({
			k: c,
			imp: i,
			id: l
		}), l;
	}, Fe = /* @__PURE__ */ new Map(), Ie = /* @__PURE__ */ new Map(), Le = 2, Re = 4096, ze = (e, t) => {
		let n = [], r = 0, i = 0, a = 0;
		for (let t = 0; t < e.length; t++) {
			let o = e.charCodeAt(t);
			r === 0 && i === 0 && o === 58 ? (n.push(e.slice(a, t)), a = t + 1) : o === 91 ? r++ : o === 93 ? r-- : o === 40 ? i++ : o === 41 && i--;
		}
		n.push(e.slice(a));
		let o = n[0];
		if (n.length > 1) {
			let e = [], t = [];
			for (let r of n) r.charCodeAt(0) === 91 || Ne.has(r) ? (t.length && (e.push(...t.sort()), t = []), e.push(r)) : t.push(r);
			t.length && e.push(...t.sort()), o = e.join(":");
		}
		let s = t ? o + " !" : o, c = Ie.get(s);
		return c === void 0 && Ie.set(s, c = Le++), c;
	}, Be = /* @__PURE__ */ new Map(), Ve = r, He = r + 4096, Ue = () => Ve++, We = 2097152, Ge = 8192, Ke = new Int32Array(Ge), qe = Array(Ge).fill(null), Je = new Int32Array(Ge), Ye = new Int32Array(Ge), Xe = new Uint8Array(Ge), Ze = 0, M = (e, t, n, r, i, a, o, s) => {
		let c = e;
		if (qe[e] !== null) {
			if (qe[e | 1] === null) c = e | 1;
			else if (!(Ze++ & 3)) c = e | Ze >> 2 & 1;
			else return;
		}
		qe[c] = t.slice(n, r), Ke[c] = i, Je[c] = a, Ye[c] = o, Xe[c] = s;
	}, N = () => qe.fill(null), Qe = 256, $e = [
		new Int32Array(Qe),
		new Int32Array(Qe),
		new Int32Array(Qe),
		new Int32Array(Qe)
	], [et, tt, nt, rt] = $e, it = new Uint8Array(Qe), P = new Uint8Array(Qe), at = () => {
		Qe *= 2, $e = $e.map((e) => {
			let t = new Int32Array(Qe);
			return t.set(e), t;
		}), [et, tt, nt, rt] = $e;
		let e = new Uint8Array(Qe);
		e.set(it), it = e, P = new Uint8Array(Qe);
	}, ot = 64, st = new Int32Array(ot), ct = new Int32Array(ot), lt = new Int32Array(r), ut = 2048, dt = 21, ft = new Float64Array(ut), pt = new Int32Array(ut), mt = 0, ht = (e, t) => {
		if (e === 0 && t < r) return lt[t] === mt ? 1 : (lt[t] = mt, 0);
		let n = e * 2097152 + t + 1, i = Math.imul(n, 2654435761) >>> dt;
		for (; pt[i] === mt;) {
			if (ft[i] === n) return 1;
			i = i + 1 & ut - 1;
		}
		return ft[i] = n, pt[i] = mt, 0;
	}, gt = (e, t, n, r, i) => {
		if (n - t >= 2 && e.charCodeAt(t) === 91 && e.charCodeAt(n - 1) === 93) {
			let r = -1;
			for (let i = t + 1; i < n - 1; i++) if (e.charCodeAt(i) === 58) {
				r = i;
				break;
			}
			return r === -1 || r === t + 1 ? Yp : Pe(Be, e, t + 1, r, 0, Ue);
		}
		if (r >= 0 && c[r] >= 0) return c[r];
		for (let t = i - 1; t >= 0; t--) {
			let r = ct[t];
			if (r > n) continue;
			let i = st[t], a = n - r;
			if (ce[i] === 1 && a > 0 && a <= le) {
				let t = e.charCodeAt(r);
				if (ue === !1 || t !== 91 && t !== 40) {
					let t = fe(i, e, r, n);
					if (t >= 0) return t;
				}
			}
			let o = l[i];
			if (o < 0) continue;
			let s = f[o], c = u[s], m = u[s + 1];
			if (c === m) continue;
			we(e, r, n);
			let h = ae[o] - c;
			for (let t = c; t < m; t++) if (Me(d[t], e, r, n)) return p[h + t];
		}
		return Yp;
	}, _t = (e) => {
		let t = e.length, n = 0, c = 0, u = !1;
		(Le > Re || Fe.size > Re) && (Fe = /* @__PURE__ */ new Map(), Ie = /* @__PURE__ */ new Map(), Le = 2, N()), Ve > He && (Be = /* @__PURE__ */ new Map(), Ve = r, N());
		let d = 0;
		for (; d < t;) {
			let f = e.charCodeAt(d);
			if (f === 32 || f >= 9 && f <= 13 || f >= 160 && A(f)) {
				f !== 32 && (u = !0), d++;
				continue;
			}
			let p = d, m = 0;
			for (; d < t;) {
				if (f = e.charCodeAt(d), f <= 32) {
					if (f === 32) break;
					if (f >= 9 && f <= 13) {
						u = !0;
						break;
					}
				} else if (f >= 160 && A(f)) {
					u = !0;
					break;
				}
				m = Math.imul(m ^ f, 16777619), d++;
			}
			let h = d, g = h - p;
			n === Qe && at();
			let _ = n++;
			et[_] = p, tt[_] = h, c += g, m ^= Math.imul(g, 2654435761);
			let v = m ^ m >>> 15, y = v & 8190;
			{
				let t = -1;
				if (Ke[y] === v && qe[y] !== null && qe[y].length === g ? t = y : Ke[y | 1] === v && qe[y | 1] !== null && qe[y | 1].length === g && (t = y | 1), t >= 0) {
					let n = qe[t], r = !0;
					for (let t = 0; t < g; t++) if (n.charCodeAt(t) !== e.charCodeAt(p + t)) {
						r = !1;
						break;
					}
					if (r) {
						nt[_] = Je[t], rt[_] = Ye[t], it[_] = Xe[t];
						continue;
					}
				}
			}
			let b = p;
			if (E !== 0) {
				if (h - p <= E || !e.startsWith(he, p)) {
					nt[_] = Yp, M(y, e, p, h, v, Yp, 0, 0);
					continue;
				}
				b = p + E;
			}
			let x = 0, S = 0, ee = -1, C = -1;
			for (let t = b; t < h; t++) {
				let n = e.charCodeAt(t);
				if (x === 0 && S === 0) {
					if (n === 58) {
						ee = t;
						continue;
					}
					if (n === 47) {
						C = t;
						continue;
					}
				}
				n === 91 ? x++ : n === 93 ? x-- : n === 40 ? S++ : n === 41 && S--;
			}
			let w = ee >= b ? ee + 1 : b, te = w, ne = h, re = !1, ie = 0;
			ne > te && e.charCodeAt(ne - 1) === 33 ? (re = !0, ne--) : ne > te && e.charCodeAt(te) === 33 && (re = !0, te++, ie = 1);
			let ae = -1;
			C > w && (ae = C + ie, ae >= ne && (ae = -1));
			let se = te;
			ne - te > 1 && e.charCodeAt(te) === 45 && (se = te + 1);
			let le = 0, ue = 0, T = 0, de = -1, fe = 0;
			(l[0] >= 0 || ce[0] === 1) && (st[0] = 0, ct[0] = se, fe = 1);
			let pe = Xp, me = 0;
			for (let t = se; t < ne; t++) if (t === ae && (pe = ue < T ? Xp : le, me = fe), le !== Xp) {
				let n = e.charCodeAt(t), r = -1;
				if (ue < T) o.charCodeAt(ue) === n ? (ue++, ue === T && (r = le = de)) : le = Xp;
				else {
					let e = i[le], t = i[le + 1], c = Xp;
					for (let i = e; i < t; i++) {
						let e = a[i];
						if (o.charCodeAt(e) === n) {
							a[i + 1] - e === 1 ? r = c = s[i] : (ue = e + 1, T = a[i + 1], de = s[i], c = le);
							break;
						}
					}
					le = c;
				}
				if (r >= 0 && (l[r] >= 0 || ce[r] === 1) && t + 1 < ne && e.charCodeAt(t + 1) === 45) {
					if (fe === ot) {
						ot *= 2;
						let e = new Int32Array(ot);
						e.set(st), st = e;
						let t = new Int32Array(ot);
						t.set(ct), ct = t;
					}
					st[fe] = r, ct[fe] = t + 2, fe++;
				}
			}
			ae === ne && (pe = ue < T ? Xp : le, me = fe);
			let D = ue < T ? Xp : le, ge, O = !1;
			if (ae >= 0) {
				if (O = !0, ge = gt(e, te, ae, pe, me), ge !== Yp && ge < r && oe[ge]) {
					let t = gt(e, te, ne, D, fe);
					t !== Yp && t !== ge && (ge = t, O = !1);
				} else ge === Yp && (ge = gt(e, te, ne, D, fe), O = !1);
			} else ge = gt(e, te, ne, D, fe);
			let _e = 0, ve = 0;
			ge === Yp ? nt[_] = Yp : (ve = +!!O, _e = b >= ee ? +!!re : Pe(Fe, e, b, ee, +!!re, (e) => ze(e, re)), nt[_] = ge, it[_] = ve, rt[_] = _e), M(y, e, p, h, v, ge, _e, ve);
		}
		if (n === 0) return "";
		if (n === 1) return et[0] === 0 && tt[0] === t ? e : e.slice(et[0], tt[0]);
		if (n * ie > ut) {
			for (; n * ie > ut;) ut <<= 1, dt--;
			ft = new Float64Array(ut), pt = new Int32Array(ut);
		}
		if (Le >= We || Ve >= We) throw Error("cn: too many distinct classes in one merge");
		mt = mt + 1 | 0, mt === 0 && (lt.fill(0), pt.fill(0), mt = 1);
		let f = !1;
		for (let e = n - 1; e >= 0; e--) {
			let t = nt[e];
			if (t === Yp) {
				P[e] = 1;
				continue;
			}
			let n = rt[e];
			if (ht(n, t) === 1) P[e] = 0, f = !0;
			else if (P[e] = 1, t < r) {
				let r = ne[t];
				if (r >= 0) for (let e = b[r]; e < b[r + 1]; e++) ht(n, x[e]);
				if (it[e] & 1) for (let e = 0; e < S.length; e++) S[e] === t && ht(n, ee[e]);
			}
		}
		if (!f && !u && t === c + n - 1) return e;
		let p = "", m = 0;
		for (; m < n;) {
			if (!P[m]) {
				m++;
				continue;
			}
			let t = et[m], r = tt[m], i = m + 1;
			for (; i < n && P[i] && et[i] === r + 1 && e.charCodeAt(r) === 32;) r = tt[i], i++;
			p.length > 0 && (p += " "), p += e.slice(t, r), m = i;
		}
		return p;
	}, vt = 16384, yt = new Int32Array(vt * 2), F = 0, bt = 1, xt = /* @__PURE__ */ Object.create(null), St = /* @__PURE__ */ Object.create(null), Ct = /* @__PURE__ */ new Map(), wt = /* @__PURE__ */ new Map(), Tt = 0, Et = 0, I = () => {
		F ^= vt, bt = bt + 1 | 0, Et = 0;
	}, Dt = (e) => {
		let t = xt[e];
		if (t !== void 0) return t;
		let n = Qp(e, 0, e.length), r = (n & 16383) + F, i = yt[r] === (n ^ bt) || yt[r ^ vt] === (n ^ bt - 1);
		return i && (t = St[e], t !== void 0) ? (xt[e] = t, t) : (t = _t(e), i ? (xt[e] = t, ++Tt > pe && (Tt = 0, St = xt, xt = /* @__PURE__ */ Object.create(null), I())) : (yt[r] = n ^ bt, ++Et > vt && I()), t);
	}, Ot = (e) => {
		let t = Ct.get(e);
		if (t !== void 0) return t;
		let n = Qp(e, 0, e.length), r = (n & 16383) + F, i = yt[r] === (n ^ bt) || yt[r ^ vt] === (n ^ bt - 1);
		return i && (t = wt.get(e), t !== void 0) ? (Ct.set(e, t), t) : (t = _t(e), i ? (Ct.set(e, t), ++Tt > pe && (Tt = 0, wt = Ct, Ct = /* @__PURE__ */ new Map(), I())) : (yt[r] = n ^ bt, ++Et > vt && I()), t);
	}, kt = (e) => {
		let t = Qp(e, 0, e.length), n = (t & 16383) + F;
		return yt[n] === (t ^ bt) || yt[n ^ vt] === (t ^ bt - 1) || (yt[n] = t ^ bt, ++Et > vt && I(), !1);
	}, At = pe === 0 ? _t : Jp ? (e) => {
		let t = Ct.get(e);
		return t === void 0 ? Ot(e) : t;
	} : Dt;
	return {
		merge: function() {
			return arguments.length === 1 && typeof arguments[0] == "string" ? At(arguments[0]) : At(nm.apply(null, arguments));
		},
		mergeString: At,
		seenBefore: pe === 0 ? () => !1 : kt,
		mergeUncached: _t
	};
}, em = (e, t) => {
	if (!e) return "";
	if (typeof e == "string") return e;
	let n = "";
	if (typeof e.length == "number" && (!t || Array.isArray(e))) {
		let r = e;
		for (let e = 0; e < r.length; e++) {
			let i = r[e];
			if (!i) continue;
			let a = typeof i == "string" ? i : em(i, t);
			a && (n && (n += " "), n += a);
		}
		return n;
	}
	if (t) {
		if (typeof e == "number") return "" + e;
		if (typeof e == "object") for (let t in e) e[t] && (n && (n += " "), n += t);
	}
	return n;
}, tm = (e, t) => {
	let n = "";
	for (let r = 0; r < e.length; r++) {
		let i = e[r];
		if (!i) continue;
		let a = typeof i == "string" ? i : em(i, t);
		a && (n && (n += " "), n += a);
	}
	return n;
}, nm = function() {
	return tm(arguments, !1);
}, rm = 256, im = 16, am = 1024, om = 4096, sm = (e, t) => {
	let n = t === void 0 ? () => !0 : t.seenBefore, r = t === void 0 ? e : t.mergeUncached, i = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map(), o = 0, s = null, c = null, l = [], u = [], d = 0, f = (t, n, r) => {
		c === null && (c = Array(om).fill(""), l = Array(om).fill(""), u = Array(om).fill(""));
		let i = Qp(t, 0, t.length) & om - 2;
		if (c[i] === t && l[i] === n) return u[i];
		if (c[i | 1] === t && l[i | 1] === n) return u[i | 1];
		let a = e(r ? n + " " + t : t), o = c[i] === "" ? i : i | (c[i | 1] === "" ? 1 : d++ & 1);
		return c[o] = t, l[o] = n, u[o] = a, a;
	}, p = (e, t, n, r) => {
		let i = 0;
		if (t) {
			if (t !== e.a0) return !1;
			i = 1;
		}
		if (n) {
			if (n !== (i === 0 ? e.a0 : e.a1)) return !1;
			i++;
		}
		if (r) {
			if (r !== (i === 0 ? e.a0 : i === 1 ? e.a1 : e.a2)) return !1;
			i++;
		}
		return i === e.t;
	}, m = (e, t) => {
		let n = e.a, r = 0;
		for (let e = 0; e < t.length; e++) {
			let i = t[e];
			if (i) {
				if (i !== n[r]) return !1;
				r++;
			}
		}
		return r === e.t;
	}, h = (t, c) => {
		let l = t.length, u = s === null ? null : s.n;
		if (!c) {
			if (u !== null && m(u, t)) return s = u, u.r;
			if (s !== null && s !== u && m(s, t)) return s.r;
		}
		let d = "", p = -1, h = 0, g = !1;
		for (let e = 0; e < l; e++) {
			let n = t[e];
			if (n) {
				if (typeof n != "string") {
					if (n = t[e] = em(n, !0), !n) continue;
					g = !0;
				}
				p < 0 && (d = n, p = e), h++;
			}
		}
		if (h === 0) return "";
		if (h === 1) return e(d);
		if (g) {
			if (u !== null && m(u, t)) return s = u, u.r;
			if (s !== null && s !== u && m(s, t)) return s.r;
		}
		let _ = i.get(d);
		_ === void 0 && (_ = a.get(d), _ !== void 0 && i.set(d, _));
		let v = null;
		if (_ !== void 0) {
			if (_.skip > 0) {
				_.skip--, s = null;
				let e = d;
				for (let n = p + 1; n < l; n++) {
					let r = t[n];
					r && (e += " " + r);
				}
				return f(e, "", !1);
			}
			let e = _.e;
			outer: for (let n = 0; n < e.length; n++) {
				let r = e[n];
				if (r.t !== h) continue;
				let i = r.a, a = 1;
				for (let e = p + 1; e < l; e++) {
					let n = t[e];
					if (n && n !== i[a++]) continue outer;
				}
				v = r;
				break;
			}
			v !== null && (_.miss = 0);
		}
		if (v === null) {
			let s = d, c = [d];
			for (let e = p + 1; e < l; e++) {
				let n = t[e];
				n && (s += " " + n, c.push(n));
			}
			if (!n(s)) return r(s);
			v = {
				r: e(s),
				t: c.length,
				a0: c[0],
				a1: c[1],
				a2: c[2] ?? "",
				a: c,
				n: null
			}, _ === void 0 ? i.set(d, _ = {
				e: [],
				miss: 0,
				skip: 0,
				at: 0
			}) : ++_.miss > im && (_.miss = im, _.skip = am, _.e.length = 0, _.at = 0);
			let u = _.e;
			u.length < rm ? u.push(v) : (u[_.at] = v, _.at = _.at + 1 & rm - 1), ++o > 1e3 && (o = 0, a = i, i = /* @__PURE__ */ new Map());
		}
		return s !== null && s !== v && (s.n = v), s = v, v.r;
	}, g = (t) => Array.isArray(t) ? h(t.slice(), !1) : t === 0 || t === 0n ? "0" : e(em(t, !0));
	return function(t, n, r) {
		let a = arguments.length;
		if ((a | 1) == 3) {
			let e = s;
			if (e !== null) {
				let i = e.n;
				if (i !== null && p(i, t, n, r)) return s = i, i.r;
				if (e !== i && p(e, t, n, r)) return e.r;
			}
			if (a === 2 && typeof n == "string" && n !== "") {
				let e = i.get(t);
				if (e !== void 0 && e.skip > 0) return e.skip--, s = null, f(n, t, !0);
			}
			return h([
				t,
				n,
				r
			], !0);
		}
		if (a === 1) return typeof t == "string" ? e(t) : g(t);
		let o = s;
		if (o !== null) {
			let e = o.n;
			if (e !== null) {
				let t = e.a, n = 0, r = !0;
				for (let e = 0; e < a; e++) {
					let i = arguments[e];
					if (i) {
						if (i !== t[n]) {
							r = !1;
							break;
						}
						n++;
					}
				}
				if (r && n === e.t) return s = e, e.r;
			}
			if (o !== e) {
				let e = o.a, t = 0, n = !0;
				for (let r = 0; r < a; r++) {
					let i = arguments[r];
					if (i) {
						if (i !== e[t]) {
							n = !1;
							break;
						}
						t++;
					}
				}
				if (n && t === o.t) return o.r;
			}
		}
		let c = [];
		for (let e = 0; e < a; e++) c.push(arguments[e]);
		return h(c, !0);
	};
}, cm = 48, lm = (e, t = 0) => {
	let n = new Int32Array(e.length);
	for (let r = 0; r < e.length; r++) n[r] = e.charCodeAt(r) - cm - t;
	return n;
}, um = (e) => {
	let t = new Int32Array(e.length + 1);
	for (let n = 0; n < e.length; n++) t[n + 1] = t[n] + e[n];
	return t;
}, dm = (e) => {
	let t = new Int32Array(e.length), n = 0;
	for (let r = 0; r < e.length; r++) {
		let i = e.charCodeAt(r) - cm;
		n += i >>> 1 ^ -(i & 1), t[r] = n;
	}
	return t;
}, fm = 384, pm = [], mm = um(lm("E0500002005282000000002000150000020021820000011200000003022202000300004200120000200420001200021200301200010400162000010000220021010:2192001200220012000220012000200200200400010200040000000000400200108200110100000022010313000162002000020020012020080213000228200000000082000000000120002000120020020040101020300130001001010")), hm = um(lm(":11111111211111119311546544411119731869:671397415686432441111111111161114151214313433415:78311132233313187211117221449443411141111151152226611131111112212518142224214215421421542142424242516171151615616347111111111197911327451111111111111111111113134714133513411111311111111111111111111112444411111342312715245411117:3")), gm = "@containerabcdefghinlmoprstunderlineviawzccentlignnimatespectuto-colsrowsaglorightnessckdrop-sisbcontrastfiltergrayscalehue-rotateinvertopacityslurrightnessaturateepia-coniclinearpositionradialsizeockurrderttom-belrstxyespacing-xyaretoursorlnt-umnsendspantartainentrasteividerop-shadowurationcorationlay-xyasendillexontromlter-featuresstretchapr-xyayscaleidow-colsrowsue-rotatedentlinesetvert-beringsxyeshadoweiadingftnest-clamp-imageabein-lrstxyskx--b-coniclpositionrsizet-x-y-fromto-fromto-inearfromto-fromto-adialfromto-fromtofromtofromtofromtoblockhinlinew-screenesblockhinlinewbjectpacityrutlinederigin-offsetbelrstxyesrspective-originaceholderioghtng-offsettateundedw-xyz-belrstlreseslr-endspantartaturatecepiahizekewpace-taleroll-xyz-barmpbelrstxyesbelrstxyes-thumbrackadowrink-xyxyartrokeabextora-shadowpckingnsformitionlate-xyz-offsetill-changeoom", _m = (() => {
	let e = mm.length - 1, t = new Int32Array(e);
	for (let n = e - 1; n >= 0; n--) {
		let e = 1, r = n + 1;
		for (let i = mm[n]; i < mm[n + 1]; i++) e += t[r], r += t[r];
		t[n] = e;
	}
	let n = new Int32Array(mm[e]), r = 0;
	for (let i = 0; i < e; i++) {
		let e = i + 1;
		for (let a = mm[i]; a < mm[i + 1]; a++) n[r++] = e, e += t[e];
	}
	return n;
})(), vm = lm("02000000000000900<=0?000B000F00F00ŏI0J0LNPRTVX0000]_a00000000000000000000000rst0000000zŏ00000000000ŏ0000000ŏ00000000000000000000000000000000000000000000000000000000000000Ë000000000000000000000Þ000000000000000000ð0000000ø0ùúûüýþÿĀāĂăĄąĆ000000000000000000000000000000000000000000ħ0ĨĪ00000000000000000000ļĽ00000Ŭ000000", 1), ym = um(lm("1233333593464636351265367151576")), bm = lm("93203242332583253248325D>E?F@03263243255B:032523853:0325B:8GA032542H<C=12727B:0324325853;D>E?3257D>03258432585:0325B:;0328B:032"), xm = lm("012113445661666666789111:5;;;;;;;;444;;;:62999<1161=62>>?61:21@ABCD4446996:64E:::;:?::64:F114GHHIHHHHIHH1HH1HH1HHHHHH::EJK4444::EJ4444441691;644444114244444:;L6666555555555555555999666664444444444444444444444226?6:66644M9N?D:111::::6DJ199"), Sm = dm("020200202020020020020020020020200200200200200200200002020202001003040106000200200200200200200200200200200200200200200200200200200200200200200200200200200200020020020020020020002020200202002002002002002002002002002020002002020020200220200200200200200200200200200200020020020000200020002000200200200020020020002000200200200020020202002020202000200200020022000200200020020002002000200220002002000200W0Z00020020002002020002002000200g0j0002002000200200020020002002000200200020020002000200002000002002002002002000200020000200002002002002002002002020020020200200200200200200200200202020020020020020020020020002002002020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020002002002002002002000200200200200200200200200200020202020002000200020002002002002000020200200"), Cm = (() => {
	let e = (/* @__PURE__ */ new Int32Array(319)).fill(-1), t = dm("02422242:222222242224222242442222222422222244442242226224222426222422442462222422622222222626222462242622422622422424242422222222422222222242422222222222222222622442224222222222222224424442262222222222222222222226224222424242422224422422422222"), n = dm("02222222222222222222202222222222222222222222221422222222222222222222222222222222222Y\\222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222221422222222222222222222222222222222222222Ŀł222222222222222222");
	for (let r = 0; r < t.length; r++) e[t[r]] = n[r];
	return e;
})(), wm = "container |break-after- all auto avoid avoid-page column left page right|break-before- all auto avoid avoid-page column left page right|break-inside-a uto void void-column void-page|box-decoration- clone slice|box- border content| contents flow-root hidden table table-caption table-cell table-column table-column-group table-footer-group table-header-group table-row table-row-group| not-sr-only sr-only|float- end left none right start|clear- both end left none right start|isolat e ion-auto|overflow- auto clip hidden scroll visible|overflow-x- auto clip hidden scroll visible|overflow-y- auto clip hidden scroll visible|overscroll- auto contain none|overscroll-x- auto contain none|overscroll-y- auto contain none| absolute fixed relative static sticky| collapse invisible visible|justify- around baseline between center center-safe end end-safe evenly normal start stretch|justify-items- center center-safe end end-safe normal start stretch|justify-self- auto center center-safe end end-safe start stretch|items- baseline baseline-last center center-safe end end-safe start stretch|self- auto baseline baseline-last center center-safe end end-safe start stretch|place-content- around baseline between center center-safe end end-safe evenly start stretch|place-items- baseline center center-safe end end-safe start stretch|place-self- auto center center-safe end end-safe start stretch| antialiased subpixel-antialiased| italic not-italic|normal-nums |ordinal |slashed-zero | lining-nums oldstyle-nums| proportional-nums tabular-nums| diagonal-fractions stacked-fractions| no-underline overline| capitalize lowercase normal-case uppercase|truncate |whitespace- break-spaces normal nowrap pre pre-line pre-wrap|break- all keep normal words|wrap- anywhere break-word normal|hyphens- auto manual none|mix-blend- color color-burn color-dodge darken difference exclusion hard-light hue lighten luminosity multiply normal overlay plus-darker plus-lighter saturation screen soft-light|table- auto fixed|caption- bottom top|backface- hidden visible|appearance- auto none|scheme- dark light light-dark normal only-dark only-light|field-sizing- content fixed|pointer-events- auto none|resize  -none -x -y|snap- align-none center end start|snap- always normal|snap- both none x y|snap- mandatory proximity|touch- auto manipulation none|touch-pan- left right x|touch-pan- down up y|touch-pinch-zoom |select- all auto none text|forced-color-adjust- auto none| normal size| baseline bottom middle sub super text-bottom text-top top| bounce none ping pulse spin| auto square video| auto fr max min px|none | auto full px| fixed local scroll|clip- border content padding text|origin- border content padding| bottom bottom-left bottom-right center left left-bottom left-top right right-bottom right-top top top-left top-right| no-repeat repeat repeat-round repeat-space repeat-x repeat-y| auto contain cover| gradient-to-b gradient-to-bl gradient-to-br gradient-to-l gradient-to-r gradient-to-t gradient-to-tl gradient-to-tr none|blend- color color-burn color-dodge darken difference exclusion hard-light hue lighten luminosity multiply normal overlay saturation screen soft-light|to- b bl br l r t tl tr| auto dvh fit full lh lvh max min px screen svh| dashed dotted double hidden none solid| collapse separate|px |auto |full | content none strict| inline-size size|layout |paint |style | around baseline between center center-safe end end-safe evenly normal start stretch| alias all-scroll auto cell col-resize context-menu copy crosshair default e-resize ew-resize grab grabbing help move n-resize ne-resize nesw-resize no-drop none not-allowed ns-resize nw-resize nwse-resize pointer progress row-resize s-resize se-resize sw-resize text vertical-text w-resize wait zoom-in zoom-out| dashed dotted double solid wavy| auto from-font|reverse |initial | in in-out initial linear out| col col-reverse row row-reverse| nowrap wrap wrap-reverse| auto initial none| black bold extrabold extralight light medium normal semibold thin| condensed expanded extra-condensed extra-expanded normal semi-condensed semi-expanded ultra-condensed ultra-expanded|flow- col col-dense dense row row-dense| none subgrid| auto dvh dvw fit full lh lvh lvw max min px screen svh svw| block flex grid table| auto dvw fit full lvw max min px screen svw| loose none normal px relaxed snug tight|through |item | inside outside| decimal disc none| auto px| clip-border clip-content clip-fill clip-padding clip-stroke clip-view no-clip| add exclude intersect subtract| alpha luminance match|origin- border content fill padding stroke view|type- alpha luminance| circle ellipse| closest-corner closest-side farthest-corner farthest-side|at- bottom bottom-left bottom-right center left left-bottom left-top right right-bottom right-top top top-left top-right| dvh fit full lh lvh max min none px screen svh| auto dvh dvw fit full lh lvh lvw max min none px screen svh svw| dvw fit full lvw max min none px screen svw| auto dvh dvw fit full lvh lvw max min none prose px svh svw| auto dvh dvw fit full lvh lvw max min none px screen svh svw| contain cover fill none scale-down| first last none| distant dramatic midrange near none normal|inset | full none|3d | auto smooth|gutter- auto both stable| auto none thin| inner none| auto dvh dvw fit full lvh lvw max min px svh svw|base | center end justify left right start| clip ellipsis| balance nowrap pretty wrap| normal tight tighter wide wider widest| cpu gpu none| 3d flat| all colors none opacity shadow transform| discrete normal| full px| auto dvh dvw fit full lvh lvw max min px screen svh svw| auto contents scroll transform".split("|").map((e) => {
	let t = e.split(" "), n = t.shift();
	for (let e = 0; e < t.length; e++) t[e] = n + t[e];
	return t;
}), Tm = dm("0000000000000000000000000000000000000000000000000000000000000262242:6@200000006:240B428:4422400002046044222426220026642642462026224222824220022400000000\\00N222422242222222224062242222222422226264222422222222222222442804222422222222222222222222220<4<0204260002444020204224422"), Em = dm("ɠ222222222222222222222222222222222222222222222222222222222222˕4222226>ʶ22ʷʺʷ2ʸʷ42ʴ2ʓ22>621422ɶ222ɹɼɷɺɷɺ22ɱ42222ɨ2ɧ26622ɘɓ244ƸƵ222]d24242ǖǓƚÄȫ2263ȨȥȨ2222222ǣ222222222222222222ǂƽ2ƾƵ2222222422222ƜƑ22222222222222222222144Ŧţ22Ţş222222222222222222222ĸ2ı68ĦģĦɡŰ4Ġ«®ĝ822ĔđĔ2ē2222622"), Dm = dm("02222222222222222222222222222222222222222222222222222222222222222202022222222222EH2200IL021042222Y\\222IL0cf2e10j2222U00X202[^2y0000120|{~22:22|22222222222G000qOVI00000}2>40000B00000I¨©000¬00000000000000021M®­00°000000000000000000000222HGHa1º222¿2À2222ÉÌ000­°2±"), Om = /* @__PURE__ */ new Int32Array(995), km = /* @__PURE__ */ new Int32Array(995), Am = /* @__PURE__ */ new Int32Array(995), jm = "", Mm = /* @__PURE__ */ new Int32Array(1038);
{
	let e = /* @__PURE__ */ new Map(), t = 0, n = 0;
	for (let r = 0; r < Tm.length; r++) for (let i of wm[Dm[r]]) {
		let a = e.get(i);
		a === void 0 && (a = t++, e.set(i, a), Mm[a * 2] = jm.length, Mm[a * 2 + 1] = i.length, jm += i), Om[n] = Tm[r], km[n] = Em[r], Am[n] = a, n++;
	}
}
var Nm = dm("0b2N:222@R>F@286¦2@H2D266226FB22B2>BD\\6N22222Z222D222p"), Pm = um(lm("1::24444432:442:44:44>222222:44:4421322511111311111114")), Fm = dm("24A;33N=C@H4A;33N=C@<27;83:;8393NQ:3NQʰ222ˉºŴŽ2R2=18cƴÅŇ=cĞÛC1ƈǝȈ:ħ25=11D3A@4=<1;1DEr25;11B3?<6;:371BCn9@7=<8192>2E121@9@EHE@9>2T25511<398454131<=V25511<398454131<=ƧNž2Đå242L222290000f22500ɛ000ǘ222"), Im = lm("ĳ"), Lm = lm(""), Rm = lm("1"), zm = {
	GROUP_COUNT: fm,
	customValidatorNames: pm,
	edgeStart: mm,
	labelStart: hm,
	labelText: gm,
	edgeTarget: _m,
	nodeGroup: vm,
	nodeVlist: Cm,
	vlistPat: ym,
	vlistOps: bm,
	vlistRef: xm,
	vlistGroup: Sm,
	litAnchor: Om,
	litGroup: km,
	litPool: Am,
	poolOffsets: Mm,
	poolText: jm,
	adjGid: Nm,
	adjStart: Pm,
	adjTgt: Fm,
	patGid: Im,
	patTgt: Lm,
	postfixLookupGroups: Rm,
	orderSensitiveModifiers: "* ** after backdrop before details-content file first-letter first-line marker placeholder selection"
}, Bm = 8192, Vm = /* @__PURE__ */ $p(zm, void 0, { cacheSize: Bm }), Hm = /* @__PURE__ */ sm(Vm.mergeString, Vm);
Vm.merge;
var Um = (e) => e, Wm = [], Gm = {
	reset() {
		for (let e = 0; e < Wm.length; e++) Wm[e]();
	},
	onReset(e) {
		Wm.push(e);
	}
}, Km = (e) => {
	if (e.indexOf(" ") !== -1) return !1;
	for (let t = 0; t < e.length; t++) {
		let n = e.charCodeAt(t);
		if (n >= 9 && n <= 13) return !1;
	}
	return !0;
}, qm = 1024, Jm = 256, Ym = 1e3, Xm = (e) => typeof e == "string" ? e : e == null ? "" : lf(e), Zm = (e, t, n) => e ? t ? n ? `${e} ${t} ${n}` : `${e} ${t}` : n ? `${e} ${n}` : e : t ? n ? `${t} ${n}` : t : n, Qm = ((e, t, n) => {
	let { mergeString: r, mergeUncached: i, seenBefore: a } = e, o = n > 0, s = /* @__PURE__ */ new Map(), c = /* @__PURE__ */ new Map(), l = 0, u = (e, t) => {
		if (t === 0) return "";
		let n = e[0];
		if (t === 1) return Km(n) ? n : o && a(n) ? r(n) : i(n);
		if (!o) {
			let r = n;
			for (let n = 1; n < t; n++) r += ` ${e[n]}`;
			return i(r);
		}
		let u = s.get(n);
		if (u === void 0 && (u = c.get(n), u !== void 0 && s.set(n, u)), u !== void 0) outer: for (let n = 0; n < u.length; n++) {
			let r = u[n], i = r.a;
			if (i.length === t) {
				for (let n = 1; n < t; n++) if (e[n] !== i[n]) continue outer;
				return r.r;
			}
		}
		let d = n;
		for (let n = 1; n < t; n++) d += ` ${e[n]}`;
		if (!a(d)) return i(d);
		let f = r(d);
		return u === void 0 && s.set(n, u = []), u.length >= Jm && u.shift(), u.push({
			a: e.slice(0, t),
			r: f
		}), ++l > Ym && (l = 0, c = s, s = /* @__PURE__ */ new Map()), f;
	}, d = /* @__PURE__ */ new Map(), f = /* @__PURE__ */ new Map(), p = 0, m = "", h = "", g = "", _ = "";
	return {
		engine: e,
		cn: t,
		adapter: {
			parts: u,
			override: (e, t, n) => {
				let s = Xm(t), c = Xm(n);
				if (!s && !c) return e;
				if (!o) return i(Zm(e, s, c));
				if (e === m && s === h && c === g) return _;
				let l = s ? c ? `${s}\0${c}` : s : c, u = d.get(e);
				u === void 0 && (u = f.get(e), u !== void 0 && d.set(e, u));
				let v = u === void 0 ? void 0 : u.get(l);
				if (v === void 0) {
					let t = Zm(e, s, c);
					if (!a(t)) return i(t);
					v = r(t), u === void 0 && d.set(e, u = /* @__PURE__ */ new Map()), u.set(l, v), ++p > qm && (p = 0, f = d, d = /* @__PURE__ */ new Map());
				}
				return m = e, h = s, g = c, _ = v, v;
			}
		},
		reset() {
			s = /* @__PURE__ */ new Map(), c = /* @__PURE__ */ new Map(), l = 0, d = /* @__PURE__ */ new Map(), f = /* @__PURE__ */ new Map(), p = 0, m = "", h = "", g = "", _ = "";
		}
	};
})(Vm, Hm, Bm);
Gm.onReset(() => {
	Qm.reset();
});
var $m = (e) => {
	let t = e.twMergeConfig;
	return t != null && !vf(t);
}, eh = () => /* @__PURE__ */ TypeError("[tailwind-variants] `twMergeConfig` is only supported by the `tailwind-variants/config` entry. Import `tv`, `createTV`, or `cnMerge` from there, or inject a merge function with `twMerge`."), th = (e, t) => {
	if (t === 0) return "";
	let n = e[0];
	for (let r = 1; r < t; r++) n += ` ${e[r]}`;
	return n;
}, nh = {
	parts: th,
	override: (e, t, n) => gf(e, t, n)
}, rh = (e) => {
	let t = (t) => t ? e(t) : "";
	return {
		parts: (e, n) => t(th(e, n)),
		override: (e, n, r) => t(gf(e, n, r))
	};
}, ih = (e) => e.twMerge === !1 ? nh : typeof e.twMerge == "function" ? rh(e.twMerge) : $m(e) ? null : Qm.adapter, ah = qp((e) => {
	let t = ih(e);
	if (t === null) throw eh();
	return t;
}, Um), oh = ah.tv;
ah.createTV;
// svelte/lib/ui/button.ts
var sh = oh({
	base: "tw:inline-flex tw:shrink-0 tw:items-center tw:justify-center tw:gap-2 tw:whitespace-nowrap tw:rounded-button tw:border tw:border-transparent tw:font-sans tw:text-sm tw:font-medium tw:leading-5 tw:tracking-normal tw:outline-none tw:transition-colors tw:focus-visible:ring-2 tw:focus-visible:ring-ring tw:focus-visible:ring-offset-2 tw:focus-visible:ring-offset-background tw:disabled:pointer-events-none tw:disabled:opacity-50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-destructive/30 tw:motion-reduce:transition-none tw:[&_svg]:shrink-0",
	variants: {
		variant: {
			primary: "tw:bg-primary tw:text-primary-foreground tw:hover:bg-primary-hover",
			secondary: "tw:bg-secondary tw:text-secondary-foreground tw:hover:bg-secondary-hover",
			outline: "tw:border-input tw:bg-card tw:text-card-foreground tw:hover:bg-accent",
			ghost: "tw:bg-transparent tw:text-foreground tw:hover:bg-accent",
			destructive: "tw:border-destructive tw:bg-card tw:text-card-foreground tw:hover:bg-destructive/10",
			link: "tw:bg-transparent tw:text-link tw:underline-offset-4 tw:hover:underline"
		},
		size: {
			sm: "tw:h-8 tw:px-3 tw:py-1.5",
			md: "tw:h-9 tw:px-4 tw:py-2",
			lg: "tw:h-11 tw:px-5 tw:py-3",
			icon: "tw:size-9 tw:p-2"
		}
	},
	defaultVariants: {
		variant: "primary",
		size: "md"
	}
}, { twMerge: !1 }), ch = (e = {}) => fs(sh(e)), lh = /* @__PURE__ */ new Set();
function uh(e) {
	return lh.add(e), () => {
		lh.delete(e);
	};
}
function dh() {
	Lt(() => {
		for (let e of [...lh]) e();
	});
}
// svelte/lib/ui/Dialog.svelte
var fh = /* @__PURE__ */ W("<div class=\"tw:flex tw:items-start tw:gap-3\"><div class=\"tw:min-w-0 tw:flex-1 tw:space-y-1\"><!> <!></div> <!></div> <!>", 1), ph = /* @__PURE__ */ W("<!> <!>", 1);
function mh(e, t) {
	M(t, !0);
	let n = Y(t, "open", 15, !1), r = Y(t, "sheet", 3, !1);
	Dn(() => {
		if (n()) return uh(() => {
			n(!1), t.onOpenChange?.(!1);
		});
	});
	var i = G();
	Ti(B(i), () => Ad, (e, i) => {
		i(e, {
			get onOpenChange() {
				return t.onOpenChange;
			},
			get open() {
				return n();
			},
			set open(e) {
				n(e);
			},
			children: (e, n) => {
				var i = ph(), a = B(i), o = (e) => {
					var n = G(), r = B(n);
					{
						let e = /* @__PURE__ */ F(() => ch({ variant: "outline" }));
						Ti(r, () => Ed, (n, r) => {
							r(n, {
								type: "button",
								get class() {
									return U(e);
								},
								children: (e, n) => {
									var r = G();
									J(B(r), () => t.trigger), K(e, r);
								},
								$$slots: { default: !0 }
							});
						});
					}
					K(e, n);
				};
				q(a, (e) => {
					t.trigger && e(o);
				}), Ti(hn(a, 2), () => Gl, (e, n) => {
					n(e, {
						children: (e, n) => {
							var i = ph(), a = B(i);
							Ti(a, () => Cd, (e, t) => {
								t(e, {
									"data-vb-native": !0,
									class: "tw:fixed tw:inset-0 tw:z-40 tw:m-0 tw:box-border tw:bg-scrim"
								});
							});
							var o = hn(a, 2);
							{
								let e = /* @__PURE__ */ F(() => fs("tw:fixed tw:z-50 tw:m-0 tw:box-border tw:flex tw:max-h-[90dvh] tw:flex-col tw:gap-4 tw:overflow-auto tw:border tw:border-solid tw:border-border tw:bg-card tw:p-6 tw:font-sans tw:text-sm tw:text-card-foreground tw:shadow-lg tw:outline-none", r() ? "tw:inset-x-0 tw:bottom-0 tw:rounded-t-surface tw:sm:inset-y-0 tw:sm:left-auto tw:sm:right-0 tw:sm:max-h-none tw:sm:w-96 tw:sm:rounded-none" : "tw:left-1/2 tw:top-1/2 tw:w-[calc(100%-2rem)] tw:max-w-lg tw:-translate-x-1/2 tw:-translate-y-1/2 tw:rounded-surface"));
								Ti(o, () => Ld, (n, r) => {
									r(n, {
										"data-vb-native": !0,
										onOpenAutoFocus: (e) => {
											let n = t.initialFocus?.();
											n && (e.preventDefault(), n.focus());
										},
										preventScroll: !1,
										preventBodyPointerEvents: !1,
										preventOverflowTextSelection: !1,
										get class() {
											return U(e);
										},
										children: (e, n) => {
											var r = fh(), i = B(r), a = z(i), o = z(a);
											Ti(o, () => Ll, (e, n) => {
												n(e, {
													class: "tw:m-0 tw:font-sans tw:text-lg tw:font-semibold tw:leading-6 tw:tracking-tight",
													children: (e, n) => {
														Ee();
														var r = $r();
														Fn(() => ai(r, t.title)), K(e, r);
													},
													$$slots: { default: !0 }
												});
											});
											var s = hn(o, 2), c = (e) => {
												var n = G();
												Ti(B(n), () => kd, (e, n) => {
													n(e, {
														class: "tw:m-0 tw:text-sm tw:leading-5 tw:text-muted-foreground",
														children: (e, n) => {
															Ee();
															var r = $r();
															Fn(() => ai(r, t.description)), K(e, r);
														},
														$$slots: { default: !0 }
													});
												}), K(e, n);
											};
											q(s, (e) => {
												t.description && e(c);
											}), j(a);
											var l = hn(a, 2);
											{
												let e = /* @__PURE__ */ F(() => ch({
													variant: "ghost",
													size: "icon"
												}));
												Ti(l, () => Nd, (n, r) => {
													r(n, {
														type: "button",
														get "aria-label"() {
															return t.closeLabel;
														},
														get class() {
															return U(e);
														},
														children: (e, t) => {
															sf(e, { name: "close" });
														},
														$$slots: { default: !0 }
													});
												});
											}
											j(i), J(hn(i, 2), () => t.children), K(e, r);
										},
										$$slots: { default: !0 }
									});
								});
							}
							K(e, i);
						},
						$$slots: { default: !0 }
					});
				}), K(e, i);
			},
			$$slots: { default: !0 }
		});
	}), K(e, i), N();
}
// svelte/lib/ui/Button.svelte
var hh = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"children",
	"variant",
	"size",
	"class",
	"loading",
	"disabled",
	"type",
	"ref"
]), gh = /* @__PURE__ */ W("<span aria-hidden=\"true\" class=\"tw:size-4 tw:animate-spin tw:rounded-full tw:border-2 tw:border-current tw:border-r-transparent tw:motion-reduce:animate-none\"></span>"), _h = /* @__PURE__ */ W("<button><!> <!></button>");
function vh(e, t) {
	M(t, !0);
	let n = Y(t, "loading", 3, !1), r = Y(t, "disabled", 3, !1), i = Y(t, "type", 3, "button"), a = Y(t, "ref", 15, null), o = /* @__PURE__ */ ka(t, hh);
	var s = _h();
	aa(s, (e) => ({
		type: i(),
		disabled: r() || n(),
		"aria-busy": n() || void 0,
		class: e,
		...o
	}), [() => fs(ch({
		variant: t.variant,
		size: t.size
	}), t.class)]);
	var c = z(s), l = (e) => {
		K(e, gh());
	};
	q(c, (e) => {
		n() && e(l);
	}), J(hn(c, 2), () => t.children ?? f), j(s), _a(s, (e) => a(e), () => a()), K(e, s), N();
}
// svelte/lib/ui/IconButton.svelte
var yh = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"label",
	"icon",
	"variant"
]);
function bh(e, t) {
	let n = Y(t, "variant", 3, "ghost"), r = /* @__PURE__ */ ka(t, yh);
	vh(e, ja(() => r, {
		get variant() {
			return n();
		},
		size: "icon",
		get "aria-label"() {
			return t.label;
		},
		get title() {
			return t.label;
		},
		children: (e, n) => {
			sf(e, { get name() {
				return t.icon;
			} });
		},
		$$slots: { default: !0 }
	}));
}
// svelte/lib/ui/Tabs.svelte
var xh = /* @__PURE__ */ W("<!> <!>", 1);
function Sh(e, t) {
	M(t, !0);
	let n = Y(t, "value", 15, "");
	var r = G(), i = B(r);
	{
		let e = /* @__PURE__ */ F(() => fs("tw:flex tw:min-h-0 tw:flex-col tw:gap-3 tw:font-sans tw:text-sm tw:text-foreground", t.class));
		Ti(i, () => qd, (r, i) => {
			i(r, {
				get onValueChange() {
					return t.onValueChange;
				},
				get class() {
					return U(e);
				},
				get value() {
					return n();
				},
				set value(e) {
					n(e);
				},
				children: (e, n) => {
					var r = xh(), i = B(r);
					Ti(i, () => $d, (e, n) => {
						n(e, {
							get "aria-label"() {
								return t.label;
							},
							class: "tw:flex tw:shrink-0 tw:gap-1 tw:rounded-control tw:bg-muted tw:p-1",
							children: (e, n) => {
								var r = G();
								vi(B(r), 17, () => t.items, (e) => e.value, (e, t) => {
									var n = G();
									Ti(B(n), () => nf, (e, n) => {
										n(e, {
											type: "button",
											get value() {
												return U(t).value;
											},
											get disabled() {
												return U(t).disabled;
											},
											class: "tw:flex-1 tw:rounded-md tw:border tw:border-transparent tw:bg-transparent tw:px-3 tw:py-1.5 tw:text-sm tw:font-medium tw:leading-5 tw:text-muted-foreground tw:outline-none tw:transition-colors tw:hover:text-foreground tw:focus-visible:ring-2 tw:focus-visible:ring-ring tw:disabled:pointer-events-none tw:disabled:opacity-50 tw:data-[state=active]:bg-card tw:data-[state=active]:text-card-foreground tw:data-[state=active]:shadow-xs tw:motion-reduce:transition-none",
											children: (e, n) => {
												Ee();
												var r = $r();
												Fn(() => ai(r, U(t).label)), K(e, r);
											},
											$$slots: { default: !0 }
										});
									}), K(e, n);
								}), K(e, r);
							},
							$$slots: { default: !0 }
						});
					}), vi(hn(i, 2), 17, () => t.items, (e) => e.value, (e, n) => {
						var r = G();
						Ti(B(r), () => Xd, (e, r) => {
							r(e, {
								get value() {
									return U(n).value;
								},
								class: "tw:min-h-0 tw:flex-1 tw:outline-none tw:focus-visible:ring-2 tw:focus-visible:ring-ring",
								children: (e, r) => {
									var i = G();
									J(B(i), () => t.children, () => U(n).value), K(e, i);
								},
								$$slots: { default: !0 }
							});
						}), K(e, r);
					}), K(e, r);
				},
				$$slots: { default: !0 }
			});
		});
	}
	K(e, r), N();
}
// svelte/lib/components/EmptyState.svelte
var Ch = /* @__PURE__ */ W("<p class=\"tw:m-0 tw:max-w-sm tw:leading-5 tw:text-muted-foreground\"> </p>"), wh = /* @__PURE__ */ W("<div class=\"tw:flex tw:flex-col tw:items-center tw:gap-3 tw:px-6 tw:py-10 tw:text-center tw:font-sans tw:text-sm tw:text-foreground\"><span class=\"tw:grid tw:size-10 tw:place-items-center tw:rounded-surface tw:border tw:border-border tw:bg-muted\"><!></span> <div class=\"tw:space-y-1\"><p class=\"tw:m-0 tw:font-medium\"> </p> <!></div> <!></div>");
function Th(e, t) {
	let n = Y(t, "icon", 3, "inbox");
	var r = wh(), i = z(r);
	sf(z(i), {
		get name() {
			return n();
		},
		class: "tw:size-5"
	}), j(i);
	var a = hn(i, 2), o = z(a), s = mn(o, !0), c = hn(o, 2), l = (e) => {
		var n = Ch(), r = mn(n, !0);
		Fn(() => ai(r, t.description)), K(e, n);
	};
	q(c, (e) => {
		t.description && e(l);
	}), j(a), J(hn(a, 2), () => t.children ?? f), j(r), Fn(() => ai(s, t.title)), K(e, r);
}
// svelte/lib/components/ErrorState.svelte
var Eh = /* @__PURE__ */ W("<p class=\"tw:m-0 tw:leading-5 tw:text-foreground\"> </p>"), Dh = /* @__PURE__ */ W("<div role=\"alert\"><!> <div class=\"tw:min-w-0 tw:flex-1 tw:space-y-1\"><p class=\"tw:m-0 tw:font-medium\"> </p> <!><!></div></div>");
function Oh(e, t) {
	M(t, !0);
	let n = Y(t, "compact", 3, !1);
	var r = Dh(), i = z(r);
	sf(i, {
		name: "warning",
		class: "tw:mt-0.5 tw:text-destructive"
	});
	var a = hn(i, 2), o = z(a), s = mn(o, !0), c = hn(o, 2), l = (e) => {
		var n = Eh(), r = mn(n, !0);
		Fn(() => ai(r, t.description)), K(e, n);
	};
	q(c, (e) => {
		t.description && e(l);
	});
	var u = hn(c), d = (e) => {
		vh(e, {
			variant: "outline",
			size: "sm",
			get onclick() {
				return t.onretry;
			},
			children: (e, n) => {
				Ee();
				var r = $r();
				Fn(() => ai(r, t.retryLabel)), K(e, r);
			},
			$$slots: { default: !0 }
		});
	};
	q(u, (e) => {
		t.onretry && t.retryLabel && e(d);
	}), j(a), j(r), Fn((e) => {
		Ii(r, 1, e), ai(s, t.title);
	}, [() => Ai(fs("tw:flex tw:items-start tw:gap-3 tw:rounded-control tw:border tw:border-destructive/20 tw:bg-destructive/10 tw:font-sans tw:text-sm tw:text-foreground", n() ? "tw:p-3" : "tw:p-5"))]), K(e, r), N();
}
// svelte/lib/ui/Input.svelte
var kh = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"value",
	"class",
	"ref"
]), Ah = /* @__PURE__ */ W("<input/>");
function jh(e, t) {
	M(t, !0);
	let n = Y(t, "value", 15, ""), r = Y(t, "ref", 15, null), i = /* @__PURE__ */ ka(t, kh);
	var a = Ah();
	aa(a, (e) => ({
		class: e,
		...i
	}), [() => fs("tw:h-9 tw:w-full tw:min-w-0 tw:rounded-control tw:border tw:border-input tw:bg-studio-input-background tw:px-3 tw:py-2 tw:font-sans tw:text-sm tw:font-normal tw:leading-5 tw:tracking-normal tw:text-foreground tw:outline-none tw:placeholder:text-muted-foreground tw:focus-visible:border-ring tw:focus-visible:ring-2 tw:focus-visible:ring-ring/30 tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-destructive/30", t.class)], void 0, void 0, void 0, !0), _a(a, (e) => r(e), () => r()), la(a, n), K(e, a), N();
}
// svelte/lib/ui/Select.svelte
var Mh = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"value",
	"items",
	"class",
	"onchange",
	"onValueChange"
]), Nh = /* @__PURE__ */ W("<option> </option>"), Ph = /* @__PURE__ */ W("<select></select>");
function Fh(e, t) {
	M(t, !0);
	let n = Y(t, "value", 15, ""), r = /* @__PURE__ */ ka(t, Mh);
	var i = Ph(), a = (e) => {
		let r = e.currentTarget.value;
		t.onValueChange?.(r) === !1 ? e.currentTarget.value = n() : n(r), t.onchange?.(e);
	};
	aa(i, (e) => ({
		value: n(),
		...r,
		onchange: a,
		class: e
	}), [() => fs("tw:h-9 tw:w-full tw:rounded-control tw:border tw:border-input tw:bg-studio-input-background tw:px-3 tw:py-2 tw:font-sans tw:text-sm tw:font-normal tw:leading-5 tw:text-foreground tw:outline-none tw:focus-visible:ring-2 tw:focus-visible:ring-ring/30 tw:disabled:opacity-50 tw:aria-invalid:border-destructive", t.class)]), vi(i, 21, () => t.items, (e) => e.value, (e, t) => {
		var n = Nh(), r = mn(n, !0), i = {};
		Fn(() => {
			n.disabled = U(t).disabled, ai(r, U(t).label), i !== (i = U(t).value) && (n.value = (n.__value = i) ?? "");
		}), K(e, n);
	}), j(i), K(e, i), N();
}
// svelte/lib/ui/Checkbox.svelte
var Ih = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"checked",
	"indeterminate",
	"class",
	"onchange",
	"onCheckedChange"
]), Lh = /* @__PURE__ */ W("<span class=\"tw:h-0.5 tw:w-2 tw:bg-current\"></span>"), Rh = /* @__PURE__ */ W("<span aria-hidden=\"true\" class=\"tw:pointer-events-none tw:absolute tw:inset-0 tw:grid tw:place-items-center tw:text-primary-foreground\"><!></span>"), zh = /* @__PURE__ */ W("<span class=\"tw:relative tw:inline-flex tw:shrink-0 tw:align-middle\"><input/> <!></span>");
function Bh(e, t) {
	M(t, !0);
	let n = Y(t, "checked", 15, !1), r = Y(t, "indeterminate", 15, !1), i = /* @__PURE__ */ ka(t, Ih);
	var a = zh(), o = z(a), s = (e) => {
		t.onchange?.(e), t.onCheckedChange?.(e.currentTarget.checked);
	};
	aa(o, (e) => ({
		type: "checkbox",
		...i,
		onchange: s,
		class: e
	}), [() => fs("tw:m-0 tw:size-4 tw:shrink-0 tw:appearance-none tw:rounded-sm tw:border tw:border-input tw:bg-card tw:p-0 tw:outline-none tw:checked:border-primary tw:checked:bg-primary tw:indeterminate:border-primary tw:indeterminate:bg-primary tw:focus-visible:ring-2 tw:focus-visible:ring-ring tw:focus-visible:ring-offset-2 tw:focus-visible:ring-offset-background tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:aria-invalid:border-destructive", t.class)], void 0, void 0, void 0, !0);
	var c = hn(o, 2), l = (e) => {
		var t = Rh(), n = z(t), i = (e) => {
			K(e, Lh());
		}, a = (e) => {
			sf(e, {
				name: "check",
				class: "tw:size-3"
			});
		};
		q(n, (e) => {
			r() ? e(i) : e(a, -1);
		}), j(t), K(e, t);
	};
	q(c, (e) => {
		(n() || r()) && e(l);
	}), j(a), fa(o, n), va("indeterminate", "change", o, r, r), K(e, a), N();
}
// svelte/lib/ui/Badge.svelte
var Vh = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"children",
	"variant",
	"class"
]), Hh = /* @__PURE__ */ W("<span><!></span>");
function Uh(e, t) {
	M(t, !0);
	let n = oh({
		base: "tw:inline-flex tw:items-center tw:gap-1 tw:rounded-full tw:border tw:border-transparent tw:px-2 tw:py-0.5 tw:font-sans tw:text-xs tw:font-medium tw:leading-4",
		variants: { variant: {
			neutral: "tw:bg-muted tw:text-foreground",
			primary: "tw:bg-primary tw:text-primary-foreground",
			success: "tw:border-success/20 tw:bg-success/10 tw:text-foreground",
			warning: "tw:border-warning/20 tw:bg-warning/10 tw:text-foreground",
			destructive: "tw:border-destructive/20 tw:bg-destructive/10 tw:text-foreground"
		} },
		defaultVariants: { variant: "neutral" }
	}, { twMerge: !1 }), r = /* @__PURE__ */ ka(t, Vh);
	var i = Hh();
	aa(i, (e) => ({
		...r,
		class: e
	}), [() => fs(n({ variant: t.variant }), t.class)]), J(z(i), () => t.children ?? f), j(i), K(e, i), N();
}
// svelte/lib/ui/Label.svelte
var Wh = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"children",
	"class"
]), Gh = /* @__PURE__ */ W("<label><!></label>");
function Kh(e, t) {
	M(t, !0);
	let n = /* @__PURE__ */ ka(t, Wh);
	var r = Gh();
	aa(r, (e) => ({
		class: e,
		...n
	}), [() => fs("tw:font-sans tw:text-sm tw:font-medium tw:leading-5 tw:text-foreground", t.class)]), J(z(r), () => t.children ?? f), j(r), K(e, r), N();
}
// svelte/lib/components/Field.svelte
var qh = /* @__PURE__ */ W("<p> </p>"), Jh = /* @__PURE__ */ W("<div class=\"tw:grid tw:grid-cols-1 tw:gap-1.5 tw:font-sans tw:text-sm tw:text-foreground\"><!> <!> <!></div>");
function Yh(e, t) {
	let n = /* @__PURE__ */ F(() => t.error || t.hint ? `${t.id}-description` : void 0);
	var r = Jh(), i = z(r);
	Kh(i, {
		get for() {
			return t.id;
		},
		children: (e, n) => {
			Ee();
			var r = $r();
			Fn(() => ai(r, t.label)), K(e, r);
		},
		$$slots: { default: !0 }
	});
	var a = hn(i, 2);
	J(a, () => t.children, () => ({
		id: t.id,
		"aria-describedby": U(n),
		"aria-invalid": !!t.error
	}));
	var o = hn(a, 2), s = (e) => {
		var r = qh(), i = mn(r, !0);
		Fn(() => {
			ra(r, "id", U(n)), ra(r, "role", t.error ? "alert" : void 0), Ii(r, 1, Ai(t.error ? "tw:m-0 tw:text-xs tw:font-medium tw:leading-4 tw:text-foreground" : "tw:m-0 tw:text-xs tw:leading-4 tw:text-muted-foreground")), ai(i, t.error || t.hint);
		}), K(e, r);
	};
	q(o, (e) => {
		(t.error || t.hint) && e(s);
	}), j(r), K(e, r);
}
export { Ea as $, j as $t, qc as A, Hr as At, Cc as B, B as Bt, Gl as C, ui as Ct, gl as D, ei as Dt, Cl as E, W as Et, Vc as F, Cr as Ft, Ds as G, L as Gt, hc as H, hn as Ht, Hc as I, Fn as It, Na as J, F as Jt, hs as K, $t as Kt, Ac as L, Dn as Lt, Xc as M, Br as Mt, Gc as N, U as Nt, vl as O, $r as Ot, Wc as P, br as Pt, ja as Q, Ee as Qt, kc as R, kn as Rt, Yl as S, ai as St, wl as T, G as Tt, cc as U, nn as Ut, vc as V, mn as Vt, $ as W, R as Wt, Y as X, N as Xt, Ma as Y, ct as Yt, ka as Z, M as Zt, nd as _, vi as _t, Fh as a, da as at, fu as b, q as bt, Th as c, ta as ct, vh as d, Ii as dt, f as en, Ta as et, mh as f, Ai as ft, bd as g, wi as gt, sf as h, J as ht, Bh as i, fa as it, Qc as j, Vr as jt, yl as k, Ur as kt, Sh as l, ra as lt, ch as m, Ti as mt, Kh as n, xa as nt, jh as o, la as ot, dh as p, Ei as pt, fs as q, Lt as qt, Uh as r, _a as rt, Oh as s, aa as st, Yh as t, h as tn, Sa as tt, bh as u, na as ut, td as v, mi as vt, Tl as w, K as wt, lu as x, oi as xt, Ju as y, pi as yt, Ec as z, z as zt };
