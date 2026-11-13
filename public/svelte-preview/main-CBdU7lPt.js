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
	return De(/* @__PURE__ */ dn(D));
}
function O(e) {
	if (E) {
		if (/* @__PURE__ */ dn(D) !== null) throw Ce(), _e;
		D = e;
	}
}
function ke(e = 1) {
	if (E) {
		for (var t = e, n = D; t--;) n = /* @__PURE__ */ dn(n);
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
		var i = /* @__PURE__ */ dn(n);
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
		r: R,
		l: null
	};
}
function Ye(e) {
	var t = Ke, n = t.e;
	if (n !== null) {
		t.e = null;
		for (var r of n) wn(r);
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
	E && /* @__PURE__ */ un(e) !== null && fn(e);
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
	var t = L, n = R;
	Kn(null), qn(null);
	try {
		return e();
	} finally {
		Kn(t), qn(n);
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
	var s = R, c = ft(), l = a.length === 1 ? a[0].promise : a.length > 1 ? Promise.all(a.map((e) => e.promise)) : null;
	function u(e) {
		if (!(s.f & 16384)) {
			c();
			try {
				r([...o, ...e]);
			} catch (e) {
				_n(e, s);
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
		Promise.all(n.map((e) => /* @__PURE__ */ _t(e))).then(u).catch((e) => _n(e, s)).finally(d);
	}
	l ? l.then(() => {
		s.f & 16384 ? d() : (c(), f(), pt());
	}) : f();
}
function ft() {
	var e = R, t = L, n = Ke, r = A;
	return function(i = !0) {
		qn(e), Kn(t), qe(n), i && !(e.f & 16384) && (r?.activate(), r?.apply());
	};
}
function pt(e = !0) {
	qn(null), Kn(null), qe(null), e && A?.deactivate();
}
function mt() {
	var e = R, t = e.b, n = A, r = !!t?.is_rendered();
	return t?.update_pending_count(1, n), n.increment(r, e), () => {
		t?.update_pending_count(-1, n), n.decrement(r, e);
	};
}
/*#__NO_SIDE_EFFECTS__*/
function ht(e) {
	var t = 2 | y;
	return R !== null && (R.f |= ee), {
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
		parent: R,
		ac: null
	};
}
var gt = Symbol("obsolete");
/*#__NO_SIDE_EFFECTS__*/
function _t(e, t, n) {
	let r = R;
	r === null && Fe();
	var i = void 0, a = Gt(ve), o = !L, s = /* @__PURE__ */ new Set();
	return Dn(() => {
		var t = R, n = g();
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
			l?.(), s.delete(n), t !== gt && (c.activate(), t ? (a.f |= ae, Xt(a, t)) : (a.f & 8388608 && (a.f ^= ae), Xt(a, e)), c.deactivate());
		};
		n.promise.then(u, (e) => u(null, e || "unknown"));
	}), Sn(() => {
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
	return Yn(t), t;
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
		for (var n = 0; n < t.length; n += 1) Pn(t[n]);
	}
}
function bt(e) {
	var t, n = R, r = e.parent;
	if (!Un && r !== null && e.v !== ve && r.f & 24576) return Se(), e.v;
	qn(r);
	try {
		yt(e), t = sr(e);
	} finally {
		qn(n);
	}
	return t;
}
function xt(e) {
	var t = bt(e);
	!e.equals(t) && (e.wv = ir(), (!A?.is_fork || e.deps === null) && (A === null ? e.v = t : (A.capture(e, t, !0), Tt?.capture(e, t, !0)), e.deps === null)) ? rt(e, v) : Un || (Et === null ? it(e) : (xn() || A?.is_fork) && Et.set(e, t));
}
function St(e) {
	if (e.effects !== null) for (let t of e.effects) (t.teardown || t.ac) && (t.teardown?.(), t.ac !== null && lt(() => {
		t.ac.abort(he), t.ac = null;
	}), t.fn !== null && (t.teardown = m), ur(t, 0), Mn(t));
}
function Ct(e) {
	if (e.effects !== null) for (let t of e.effects) t.teardown && t.fn !== null && dr(t);
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
				a ? r.f ^= v : i & 4 ? t.push(r) : ar(r) && (i & 16 && this.add_dirty_reaction(r, b), dr(r));
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
		_n(e, Dt);
	}
}
var Lt = null;
function Rt(e) {
	var t = e.length;
	if (t !== 0) {
		for (var n = 0; n < t;) {
			var r = e[n++];
			if (!(r.f & 24576) && ar(r) && (Lt = /* @__PURE__ */ new Set(), dr(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && In(r), Lt?.size > 0)) {
				Ut.clear();
				for (let e of Lt) {
					if (e.f & 24576) continue;
					let t = [e], n = e.parent;
					for (; n !== null;) Lt.has(n) && (Lt.delete(n), t.push(n)), n = n.parent;
					for (let e = t.length - 1; e >= 0; e--) {
						let n = t[e];
						n.f & 24576 || dr(n);
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
function Kt(e, t) {
	let n = Gt(e, t);
	return Yn(n), n;
}
/*#__NO_SIDE_EFFECTS__*/
function qt(e, t = !1, n = !0) {
	let r = Gt(e);
	return t || (r.equals = Pe), r;
}
function j(e, t, n = !1) {
	return L !== null && (!Gn || L.f & 131072) && Ze() && L.f & 4325394 && (Jn === null || !Jn.has(e)) && We(), Xt(e, n ? en(t) : t, jt);
}
var Jt = null, Yt = 0;
function Xt(e, t, n = null) {
	if (!e.equals(t)) {
		Un ? Ut.set(e, t) : Ut.has(e) || Ut.set(e, e.v);
		var r = Pt.ensure();
		if (r.capture(e, t), e.f & 2) {
			let t = e;
			e.f & 2048 && bt(t), Et === null && it(t);
		}
		e.wv = ir(), Jt = null, Yt = 0, $t(e, y, n), Jt = null, Ze() && R !== null && R.f & 1024 && !(R.f & 96) && (Qn === null ? $n([e]) : Qn.push(e)), !r.is_fork && Ht.size > 0 && !Wt && Zt();
	}
	return t;
}
function Zt() {
	Wt = !1;
	for (let e of Ht) {
		e.f & 1024 && rt(e, b);
		let t;
		try {
			t = ar(e);
		} catch {
			t = !0;
		}
		t && dr(e);
	}
	Ht.clear();
}
function Qt(e) {
	j(e, e.v + 1);
}
function $t(e, t, n) {
	var r = e.reactions;
	if (r !== null) {
		var i = Ze(), a = r.length;
		if (Yt += a, Yt > 1e5 && Jt === null && (Jt = /* @__PURE__ */ new Set()), Jt !== null) {
			if (Jt.has(e)) return;
			Jt.add(e);
		}
		for (var o = 0; o < a; o++) {
			var s = r[o], c = s.f;
			if (i || s !== R) {
				var l = (c & y) === 0;
				if (l && rt(s, t), c & 131072) Ht.add(s);
				else if (c & 2) {
					var u = s;
					Et?.delete(u), $t(u, b, n);
				} else if (l) {
					var d = s;
					c & 16 && Lt !== null && Lt.add(d), n === null ? zt(d) : n.push(d);
				}
			}
		}
	}
}
function en(e) {
	if (typeof e != "object" || !e || oe in e || se in e) return e;
	let t = d(e);
	if (t !== l && t !== u) return e;
	var r = /* @__PURE__ */ new Map(), i = n(e), a = /* @__PURE__ */ Kt(0), o = null, c = nr, f = (e) => {
		if (nr === c) return e();
		var t = L, n = nr;
		Kn(null), rr(c);
		var r = e();
		return Kn(t), rr(n), r;
	};
	return i && r.set("length", /* @__PURE__ */ Kt(e.length, o)), new Proxy(e, {
		defineProperty(e, t, n) {
			"value" in n && n.configurable !== !1 && n.enumerable !== !1 && n.writable !== !1 || He();
			var i = r.get(t);
			return i === void 0 ? f(() => {
				var e = /* @__PURE__ */ Kt(n.value, o);
				return r.set(t, e), e;
			}) : j(i, n.value, !0), !0;
		},
		deleteProperty(e, t) {
			var n = r.get(t);
			if (n === void 0) {
				if (t in e) {
					let e = f(() => /* @__PURE__ */ Kt(ve, o));
					r.set(t, e), Qt(a);
				}
			} else j(n, ve), Qt(a);
			return !0;
		},
		get(t, n, i) {
			if (n === oe) return e;
			var a = r.get(n), c = n in t;
			if (a === void 0 && (!c || s(t, n)?.writable) && (a = f(() => /* @__PURE__ */ Kt(en(c ? t[n] : ve), o)), r.set(n, a)), a !== void 0) {
				var l = z(a);
				return l === ve ? void 0 : l;
			}
			return Reflect.get(t, n, i);
		},
		getOwnPropertyDescriptor(e, t) {
			this.has?.(e, t);
			var n = Reflect.getOwnPropertyDescriptor(e, t), i = r.get(t);
			if (i !== void 0) {
				var a = z(i);
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
			return (n !== void 0 || (R !== null || L !== null) && (!i || s(e, t)?.writable)) && (n === void 0 && (n = f(() => /* @__PURE__ */ Kt(i ? en(e[t]) : ve, o)), r.set(t, n)), z(n) === ve) ? !1 : i;
		},
		set(e, t, n, c) {
			var l = r.get(t), u = t in e;
			if (i && t === "length") for (var d = n; d < l.v; d += 1) {
				var p = r.get(d + "");
				p === void 0 ? d in e && (p = f(() => /* @__PURE__ */ Kt(ve, o)), r.set(d + "", p)) : j(p, ve);
			}
			if (l === void 0) (!u || s(e, t)?.writable) && (l = f(() => /* @__PURE__ */ Kt(void 0, o)), j(l, en(n)), r.set(t, l));
			else {
				u = l.v !== ve;
				var m = f(() => en(n));
				j(l, m);
			}
			var h = Reflect.getOwnPropertyDescriptor(e, t);
			if (h?.set && h.set.call(c, n), !u) {
				if (i && typeof t == "string") {
					var g = r.get("length"), _ = Number(t);
					Number.isInteger(_) && _ >= g.v && j(g, _ + 1);
				}
				Qt(a);
			}
			return !0;
		},
		ownKeys(e) {
			z(a);
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
function tn(e) {
	try {
		if (typeof e == "object" && e && oe in e) return e[oe];
	} catch {}
	return e;
}
function nn(e, t) {
	return Object.is(tn(e), tn(t));
}
var rn, an, on, sn;
function cn() {
	if (rn === void 0) {
		rn = window, an = /Firefox/.test(navigator.userAgent);
		var e = Element.prototype, t = Node.prototype, n = Text.prototype;
		on = s(t, "firstChild").get, sn = s(t, "nextSibling").get, f(e) && (e[de] = void 0, e[ue] = null, e[fe] = void 0, e.__e = void 0), f(n) && (n[pe] = void 0);
	}
}
function ln(e = "") {
	return document.createTextNode(e);
}
/*@__NO_SIDE_EFFECTS__*/
function un(e) {
	return on.call(e);
}
/*@__NO_SIDE_EFFECTS__*/
function dn(e) {
	return sn.call(e);
}
function M(e, t) {
	if (!E) return /* @__PURE__ */ un(e);
	var n = /* @__PURE__ */ un(D);
	if (n === null) n = D.appendChild(ln());
	else if (t && n.nodeType !== 3) {
		var r = ln();
		return n?.before(r), De(r), r;
	}
	return t && hn(n), De(n), n;
}
function N(e, t = !1) {
	if (!E) {
		var n = /* @__PURE__ */ un(e);
		return n instanceof Comment && n.data === "" ? /* @__PURE__ */ dn(n) : n;
	}
	if (t) {
		if (D?.nodeType !== 3) {
			var r = ln();
			return D?.before(r), De(r), r;
		}
		hn(D);
	}
	return D;
}
function P(e, t = !1) {
	if (!E) return /* @__PURE__ */ un(e);
	var n = M(e, t);
	return O(e), n;
}
function F(e, t = 1, n = !1) {
	let r = E ? D : e;
	for (var i; t--;) i = r, r = /* @__PURE__ */ dn(r);
	if (!E) return r;
	if (n) {
		if (r?.nodeType !== 3) {
			var a = ln();
			return r === null ? i?.after(a) : r.before(a), De(a), a;
		}
		hn(r);
	}
	return De(r), r;
}
function fn(e) {
	e.textContent = "";
}
function pn() {
	return !1;
}
function mn(e, t, n) {
	return t == null || t === "http://www.w3.org/1999/xhtml" ? n ? document.createElement(e, { is: n }) : document.createElement(e) : n ? document.createElementNS(t, e, { is: n }) : document.createElementNS(t, e);
}
function hn(e) {
	if (e.nodeValue.length < 65536) return;
	let t = e.nextSibling;
	for (; t !== null && t.nodeType === 3;) t.remove(), e.nodeValue += t.nodeValue, t = e.nextSibling;
}
function gn(e) {
	var t = R;
	if (t === null) return L.f |= ae, e;
	if (!(t.f & 32768) && !(t.f & 4)) throw e;
	_n(e, t);
}
function _n(e, t) {
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
function vn(e) {
	R === null && (L === null && ze(e), Re()), Un && Le(e);
}
function yn(e, t) {
	var n = t.last;
	n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function bn(e, t) {
	var n = R;
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
			dr(r);
		} catch (e) {
			throw Pn(r), e;
		}
		i.deps === null && i.teardown === null && i.nodes === null && i.first === i.last && !(i.f & 524288) && (i = i.first, e & 16 && e & 65536 && i !== null && (i.f |= T));
	}
	if (i !== null && (i.parent = n, n !== null && yn(i, n), L !== null && L.f & 2 && !(e & 64))) {
		var a = L;
		(a.effects ??= []).push(i);
	}
	return r;
}
function xn() {
	return L !== null && !Gn;
}
function Sn(e) {
	let t = bn(8, null);
	return rt(t, v), t.teardown = e, t;
}
function Cn(e) {
	vn("$effect");
	var t = R.f;
	if (!L && t & 32 && Ke !== null && !Ke.i) {
		var n = Ke;
		(n.e ??= []).push(e);
	} else return wn(e);
}
function wn(e) {
	return bn(4 | te, e);
}
function Tn(e) {
	Pt.ensure();
	let t = bn(64 | ee, e);
	return (e = {}) => new Promise((n) => {
		e.outro ? Ln(t, () => {
			Pn(t), n(void 0);
		}) : (Pn(t), n(void 0));
	});
}
function En(e) {
	return bn(4, e);
}
function Dn(e) {
	return bn(ie | ee, e);
}
function On(e, t = 0) {
	return bn(8 | t, e);
}
function I(e, t = [], n = [], r = []) {
	dt(r, t, n, (t) => {
		bn(8, () => {
			e(...t.map(z));
		});
	});
}
function kn(e, t = 0) {
	return bn(16 | t, e);
}
function An(e) {
	return bn(32 | ee, e);
}
function jn(e) {
	var t = e.teardown;
	if (t !== null) {
		let n = Un, r = L;
		Wn(!0), Kn(null);
		try {
			t.call(null);
		} catch (t) {
			_n(t, e.parent);
		} finally {
			Wn(n), Kn(r);
		}
	}
}
function Mn(e, t = !1) {
	var n = e.first;
	for (e.first = e.last = null; n !== null;) {
		let e = n.ac;
		e !== null && lt(() => {
			e.abort(he);
		});
		var r = n.next;
		n.f & 64 ? n.parent = null : Pn(n, t), n = r;
	}
}
function Nn(e) {
	for (var t = e.first; t !== null;) {
		var n = t.next;
		t.f & 32 || Pn(t), t = n;
	}
}
function Pn(e, t = !0) {
	var n = !1;
	(t || e.f & 262144) && e.nodes !== null && e.nodes.end !== null && (Fn(e.nodes.start, e.nodes.end), n = !0), e.f |= w, Mn(e, t && !n), ur(e, 0);
	var r = e.nodes && e.nodes.t;
	if (r !== null) for (let e of r) e.stop();
	jn(e), e.f ^= w, e.f |= S;
	var i = e.parent;
	i !== null && i.first !== null && In(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = e.b = null;
}
function Fn(e, t) {
	for (; e !== null;) {
		var n = e === t ? null : /* @__PURE__ */ dn(e);
		e.remove(), e = n;
	}
}
function In(e) {
	var t = e.parent, n = e.prev, r = e.next;
	n !== null && (n.next = r), r !== null && (r.prev = n), t !== null && (t.first === e && (t.first = r), t.last === e && (t.last = n));
}
function Ln(e, t, n = !0) {
	var r = [];
	e.f |= 256, Rn(e, r, !0);
	var i = () => {
		n && Pn(e), t && t();
	}, a = r.length;
	if (a > 0) {
		var o = () => --a || i();
		for (var s of r) s.out(o);
	} else i();
}
function Rn(e, t, n) {
	if (!(e.f & 8192)) {
		e.f ^= x;
		var r = e.nodes && e.nodes.t;
		if (r !== null) for (let e of r) (e.is_global || n) && t.push(e);
		for (var i = e.first; i !== null;) {
			var a = i.next;
			if (!(i.f & 64)) {
				var o = !!(i.f & 65536) || !!(i.f & 32) && !!(e.f & 16);
				Rn(i, t, o ? n : !1);
			}
			i = a;
		}
	}
}
function zn(e) {
	e.f &= -257, Bn(e, !0);
}
function Bn(e, t) {
	if (!(e.f & 256) && e.f & 8192) {
		e.f ^= x, e.f & 1024 || (rt(e, y), Pt.ensure().schedule(e));
		for (var n = e.first; n !== null;) {
			var r = n.next, i = !!(n.f & 65536) || !!(n.f & 32);
			Bn(n, i ? t : !1), n = r;
		}
		var a = e.nodes && e.nodes.t;
		if (a !== null) for (let e of a) (e.is_global || t) && e.in();
	}
}
function Vn(e, t) {
	if (e.nodes) for (var n = e.nodes.start, r = e.nodes.end; n !== null;) {
		var i = n === r ? null : /* @__PURE__ */ dn(n);
		t.append(n), n = i;
	}
}
// node_modules/svelte/src/internal/client/legacy.js
var Hn = null, Un = !1;
function Wn(e) {
	Un = e;
}
var L = null, Gn = !1;
function Kn(e) {
	L = e;
}
var R = null;
function qn(e) {
	R = e;
}
var Jn = null;
function Yn(e) {
	L !== null && (L.f & 2097152 || L.f & 2) && (Jn ??= /* @__PURE__ */ new Set()).add(e);
}
var Xn = null, Zn = 0, Qn = null;
function $n(e) {
	Qn = e;
}
var er = 1, tr = 0, nr = tr;
function rr(e) {
	nr = e;
}
function ir() {
	return ++er;
}
function ar(e) {
	var t = e.f;
	if (t & 2048) return !0;
	if (t & 4096) {
		for (var n = e.deps, r = n.length, i = 0; i < r; i++) {
			var a = n[i];
			if (ar(a) && xt(a), a.wv > e.wv) return !0;
		}
		t & 512 && Et === null && rt(e, v);
	}
	return !1;
}
function or(e, t, n = !0) {
	var r = e.reactions;
	if (r !== null && !(Jn !== null && Jn.has(e))) for (var i = 0; i < r.length; i++) {
		var a = r[i];
		a.f & 2 ? or(a, t, !1) : t === a && (n ? rt(a, y) : a.f & 1024 && rt(a, b), zt(a));
	}
}
function sr(e) {
	var t = Xn, n = Zn, r = Qn, i = L, a = Jn, o = Ke, s = Gn, c = nr, l = e.f;
	Xn = null, Zn = 0, Qn = null, L = l & 96 ? null : e, Jn = null, qe(e.ctx), Gn = !1, nr = ++tr, e.ac !== null && (lt(() => {
		e.ac.abort(he);
	}), e.ac = null);
	try {
		e.f |= re;
		var u = e.fn, d = u();
		e.f |= C;
		var f = cr(e);
		if (Ze() && Qn !== null && !Gn && f !== null && !(e.f & 6146)) for (var p = 0; p < Qn.length; p++) or(Qn[p], e);
		if (i !== null && i !== e) {
			if (tr++, i.deps !== null) for (let e = 0; e < n; e += 1) i.deps[e].rv = tr;
			if (t !== null) for (let e of t) e.rv = tr;
			Qn !== null && (r === null ? r = Qn : r.push(...Qn));
		}
		return e.f & 8388608 && (e.f ^= ae), d;
	} catch (t) {
		return cr(e), gn(t);
	} finally {
		e.f ^= re, Xn = t, Zn = n, Qn = r, L = i, Jn = a, qe(o), Gn = s, nr = c;
	}
}
function cr(e) {
	var t = e.deps, n = A?.is_fork;
	if (Xn !== null) {
		var r;
		if (n || ur(e, Zn), t !== null && Zn > 0) for (t.length = Zn + Xn.length, r = 0; r < Xn.length; r++) t[Zn + r] = Xn[r];
		else e.deps = t = Xn;
		if (xn() && e.f & 512) for (r = Zn; r < t.length; r++) (t[r].reactions ??= []).push(e);
	} else !n && t !== null && Zn < t.length && (ur(e, Zn), t.length = Zn);
	return t;
}
function lr(e, t) {
	let n = t.reactions;
	if (n !== null) {
		var a = r.call(n, e);
		if (a !== -1) {
			var o = n.length - 1;
			o === 0 ? n = t.reactions = null : (n[a] = n[o], n.pop());
		}
	}
	if (n === null && t.f & 2 && (Xn === null || !i.call(Xn, t))) {
		var s = t;
		s.f & 512 && (s.f ^= 512), s.v !== ve && it(s), s.ac !== null && lt(() => {
			s.ac.abort(he), s.ac = null, rt(s, y);
		}), St(s), ur(s, 0);
	}
}
function ur(e, t) {
	var n = e.deps;
	if (n !== null) for (var r = t; r < n.length; r++) lr(e, n[r]);
}
function dr(e) {
	var t = e.f;
	if (!(t & 16384)) {
		rt(e, v);
		var n = R;
		R = e;
		try {
			t & 16777232 ? Nn(e) : Mn(e), jn(e);
			var r = sr(e);
			e.teardown = typeof r == "function" ? r : null, e.wv = er;
		} finally {
			R = n;
		}
	}
}
async function fr() {
	await Promise.resolve(), Ft();
}
function z(e) {
	var t = !!(e.f & 2);
	if (Hn?.add(e), L !== null && !Gn && !(R !== null && R.f & 16384) && (Jn === null || !Jn.has(e))) {
		var n = L.deps;
		if (L.f & 2097152) e.rv < tr && (e.rv = tr, Xn === null && n !== null && n[Zn] === e ? Zn++ : Xn === null ? Xn = [e] : Xn.push(e));
		else {
			L.deps ??= [], i.call(L.deps, e) || L.deps.push(e);
			var r = e.reactions;
			r === null ? e.reactions = [L] : i.call(r, L) || r.push(L);
		}
	}
	if (Un && Ut.has(e)) return Ut.get(e);
	if (t) {
		var a = e;
		if (Un) {
			var o = a.v;
			return (!(a.f & 1024) && a.reactions !== null || mr(a)) && (o = bt(a)), Ut.set(a, o), o;
		}
		var s = !(a.f & 512) && !Gn && L !== null && !!(L.f & 512), c = (a.f & C) === 0;
		ar(a) && (s && (a.f |= 512), xt(a)), s && !c && (Ct(a), pr(a));
	}
	if (Et?.has(e)) return Et.get(e);
	if (e.f & 8388608) throw e.v;
	return e.v;
}
function pr(e) {
	if (e.f |= 512, e.deps !== null) for (let n of e.deps) {
		var t = n.reactions;
		t === null ? n.reactions = [e] : i.call(t, e) || t.push(e), n.f & 2 && !(n.f & 512) && (Ct(n), pr(n));
	}
}
function mr(e) {
	if (e.v === ve) return !0;
	if (e.deps === null) return !1;
	for (let t of e.deps) if (Ut.has(t) || t.f & 2 && mr(t)) return !0;
	return !1;
}
function hr(e) {
	var t = Gn;
	try {
		return Gn = !0, e();
	} finally {
		Gn = t;
	}
}
function gr(e) {
	if (!(typeof e != "object" || !e || e instanceof EventTarget)) {
		if (oe in e) _r(e);
		else if (!Array.isArray(e)) for (let t in e) {
			let n = e[t];
			typeof n == "object" && n && oe in n && _r(n);
		}
	}
}
function _r(e, t = /* @__PURE__ */ new Set()) {
	if (typeof e == "object" && e && !(e instanceof EventTarget) && !t.has(e)) {
		t.add(e), e instanceof Date && e.getTime();
		for (let n in e) try {
			_r(e[n], t);
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
var vr = ["touchstart", "touchmove"];
function yr(e) {
	return vr.includes(e);
}
// node_modules/svelte/src/internal/client/dom/elements/events.js
var br = Symbol("events"), xr = /* @__PURE__ */ new Set(), Sr = /* @__PURE__ */ new Set();
function Cr(e, t, n, r = {}) {
	function i(e) {
		if (r.capture || Or.call(t, e), !e.cancelBubble) return lt(() => n?.call(this, e));
	}
	return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? (i.__removed = !1, et(() => {
		i.__removed || t.addEventListener(e, i, r);
	})) : t.addEventListener(e, i, r), i;
}
function wr(e, t, n, r, i) {
	var a = {
		capture: r,
		passive: i
	}, o = Cr(e, t, n, a);
	(t === document.body || t === window || t === document || t instanceof HTMLMediaElement) && Sn(() => {
		o.__removed = !0, t.removeEventListener(e, o, a);
	});
}
function B(e, t, n) {
	(t[br] ??= {})[e] = n;
}
function Tr(e) {
	for (var t = 0; t < e.length; t++) xr.add(e[t]);
	for (var n of Sr) n(e);
}
var Er = null, Dr = !1;
function Or(e) {
	var t = this, n = t.ownerDocument, r = e.type, i = e.composedPath?.() || [], a = i[0] || e.target;
	Er = e, Dr || (Dr = !0, setTimeout(() => {
		Dr = !1, Er = null;
	}));
	var s = 0, c = Er === e && e[br];
	if (c) {
		var l = i.indexOf(c);
		if (l !== -1 && (t === document || t === window)) {
			e[br] = t;
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
		var d = L, f = R;
		Kn(null), qn(null);
		try {
			for (var p, m = []; a !== null && a !== t;) {
				try {
					var h = a[br]?.[r];
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
			e[br] = t, delete e.currentTarget, Kn(d), qn(f);
		}
	}
}
// node_modules/svelte/src/internal/client/dom/reconciler.js
var kr = globalThis?.window?.trustedTypes && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", { createHTML: (e) => e });
function Ar(e) {
	return kr?.createHTML(e) ?? e;
}
function jr(e) {
	var t = mn("template");
	return t.innerHTML = Ar(e.replaceAll("<!>", "<!---->")), t.content;
}
// node_modules/svelte/src/internal/client/dom/template.js
function Mr(e, t) {
	var n = R;
	n.nodes === null && (n.nodes = {
		start: e,
		end: t,
		a: null,
		t: null
	});
}
/*#__NO_SIDE_EFFECTS__*/
function V(e, t) {
	var n = !!(t & 1), r = !!(t & 2), i, a = !e.startsWith("<!>");
	return () => {
		if (E) return Mr(D, null), D;
		i === void 0 && (i = jr(a ? e : "<!>" + e), n || (i = /* @__PURE__ */ un(i)));
		var t = r || an ? document.importNode(i, !0) : i.cloneNode(!0);
		if (n) {
			var o = /* @__PURE__ */ un(t), s = t.lastChild;
			Mr(o, s);
		} else Mr(t, t);
		return t;
	};
}
function Nr(e = "") {
	if (!E) {
		var t = ln(e + "");
		return Mr(t, t), t;
	}
	var n = D;
	return n.nodeType === 3 ? hn(n) : (n.before(n = ln()), De(n)), Mr(n, n), n;
}
function Pr() {
	if (E) return Mr(D, null), D;
	var e = document.createDocumentFragment(), t = document.createComment(""), n = ln();
	return e.append(t, n), Mr(t, n), e;
}
function H(e, t) {
	if (E) {
		var n = R;
		n.f & 32768 && n.nodes.end !== null || (n.nodes.end = D), Oe();
	} else e !== null && e.before(t);
}
// node_modules/svelte/src/reactivity/create-subscriber.js
function Fr(e) {
	let t = 0, n = Gt(0), r;
	return () => {
		xn() && (z(n), On(() => (t === 0 && (r = hr(() => e(() => Qt(n)))), t += 1, () => {
			et(() => {
				--t, t === 0 && (r?.(), r = void 0, Qt(n));
			});
		})));
	};
}
// node_modules/svelte/src/internal/client/dom/blocks/boundary.js
var Ir = T | ee;
function Lr(e, t, n, r) {
	new Rr(e, t, n, r);
}
var Rr = class {
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
	#m = Fr(() => (this.#p = Gt(this.#l), () => {
		this.#p = null;
	}));
	constructor(e, t, n, r) {
		this.#e = e, this.#n = t, this.#r = (e) => {
			var t = R;
			t.b = this, t.f |= 128, n(e);
		}, this.parent = R.b, this.transform_error = r ?? this.parent?.transform_error ?? ((e) => e), this.#i = kn(() => {
			if (E) {
				let e = je(this.#t);
				Oe();
				let t = e === "[!";
				if (e.startsWith("[?")) {
					let t = JSON.parse(e.slice(2));
					this.#g(t);
				} else t ? this.#y() : this.#h();
			} else this.#b();
		}, Ir), E && (this.#e = D);
	}
	#h() {
		try {
			this.#a = An(() => this.#r(this.#e));
		} catch (e) {
			this.error(e);
		}
	}
	#g(e) {
		let t = this.#n.failed, { reset: n, invoke_onerror: r } = this.#_(e);
		et(r), t && (this.#s = An(() => {
			t(this.#e, () => e, () => n);
		}));
	}
	#_(e) {
		var t = !1, n = !1;
		let r = () => {
			this.#v() || (t ? Te() : (t = !0, n && Ge(), this.#s !== null && Ln(this.#s, () => {
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
					_n(e, this.#i && this.#i.parent);
				}
			}
		};
	}
	#v() {
		return (this.#i.f & (S | w)) !== 0;
	}
	#y() {
		let e = this.#n.pending;
		e && (this.is_pending = !0, this.#o = An(() => e(this.#e)), et(() => {
			if (!this.#v()) {
				var e = this.#c = document.createDocumentFragment(), t = ln(), n = !1;
				e.append(t), this.#a = this.#S(() => {
					try {
						return An(() => this.#r(t));
					} catch (e) {
						try {
							this.error(e), n = !0;
						} catch (e) {
							_n(e, this.#i.parent);
						}
						return null;
					}
				}), this.#a === null ? (this.#c = null, n && this.#x(A)) : this.#u === 0 && (this.#e.before(e), this.#c = null, Ln(this.#o, () => {
					this.#o = null;
				}), this.#x(A));
			}
		}));
	}
	#b() {
		try {
			if (this.is_pending = this.has_pending_snippet(), this.#u = 0, this.#l = 0, this.#a = An(() => {
				this.#r(this.#e);
			}), this.#u > 0) {
				var e = this.#c = document.createDocumentFragment();
				Vn(this.#a, e);
				let t = this.#n.pending;
				this.#o = An(() => t(this.#e));
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
		var t = R, n = L, r = Ke;
		qn(this.#i), Kn(this.#i), qe(this.#i.ctx);
		try {
			return Pt.ensure(), e();
		} finally {
			qn(t), Kn(n), qe(r);
		}
	}
	#C(e, t) {
		this.has_pending_snippet() ? (this.#u += e, this.#u === 0 && (this.#x(t), this.#o && Ln(this.#o, () => {
			this.#o = null;
		}), this.#c &&= (this.#e.before(this.#c), null))) : this.parent && this.parent.#C(e, t);
	}
	update_pending_count(e, t) {
		this.#C(e, t), this.#l += e, !this.#p || this.#d || (this.#d = !0, et(() => {
			this.#d = !1, this.#p && Xt(this.#p, this.#l);
		}));
	}
	get_effect_pending() {
		return this.#m(), z(this.#p);
	}
	error(e) {
		if (e === _e || !this.#n.onerror && !this.#n.failed) throw e;
		A?.is_fork ? (this.#a && A.skip_effect(this.#a), this.#o && A.skip_effect(this.#o), this.#s && A.skip_effect(this.#s), A.oncommit(() => {
			this.#v() || this.#w(e);
		})) : this.#w(e);
	}
	#w(e) {
		this.#a &&= (Pn(this.#a), null), this.#o &&= (Pn(this.#o), null), this.#s &&= (Pn(this.#s), null), E && (De(this.#t), ke(), De(Ae()));
		let t = this.#n.failed, n = (e) => {
			if (this.#v()) return;
			let { reset: n, invoke_onerror: r } = this.#_(e);
			r(), t && !this.#v() && (this.#s = this.#S(() => {
				try {
					return An(() => {
						var r = R;
						r.b = this, r.f |= 128, t(this.#e, () => e, () => n);
					});
				} catch (e) {
					return _n(e, this.#i.parent), null;
				}
			}));
		};
		et(() => {
			if (!this.#v()) {
				var t;
				try {
					t = this.transform_error(e);
				} catch (e) {
					_n(e, this.#i && this.#i.parent);
					return;
				}
				typeof t == "object" && t && typeof t.then == "function" ? t.then(n, (e) => _n(e, this.#i && this.#i.parent)) : n(t);
			}
		});
	}
};
function U(e, t) {
	var n = t == null ? "" : typeof t == "object" ? `${t}` : t;
	n !== (e[pe] ??= e.nodeValue) && (e[pe] = n, e.nodeValue = `${n}`);
}
function zr(e, t) {
	return Vr(e, t);
}
var Br = /* @__PURE__ */ new Map();
function Vr(e, { target: t, anchor: n, props: r = {}, events: i, context: o, intro: s = !0, transformError: c }) {
	cn();
	var l = void 0, u = Tn(() => {
		var s = n ?? t.appendChild(ln());
		Lr(s, { pending: () => {} }, (t) => {
			Je({});
			var n = Ke;
			if (o && (n.c = o), i && (r.$$events = i), E && Mr(t, null), l = e(t, r) || Xe(), E && (R.nodes.end = D, D === null || D.nodeType !== 8 || D.data !== "]")) throw Ce(), _e;
			Ye();
		}, c);
		var u = /* @__PURE__ */ new Set(), d = (e) => {
			for (var n = 0; n < e.length; n++) {
				var r = e[n];
				if (!u.has(r)) {
					u.add(r);
					var i = yr(r);
					for (let e of [t, document]) {
						var a = Br.get(e);
						a === void 0 && (a = /* @__PURE__ */ new Map(), Br.set(e, a));
						var o = a.get(r);
						o === void 0 ? (e.addEventListener(r, Or, { passive: i }), a.set(r, 1)) : a.set(r, o + 1);
					}
				}
			}
		};
		return d(a(xr)), Sr.add(d), () => {
			for (var e of u) for (let n of [t, document]) {
				var r = Br.get(n), i = r.get(e);
				--i == 0 ? (n.removeEventListener(e, Or), r.delete(e), r.size === 0 && Br.delete(n)) : r.set(e, i);
			}
			Sr.delete(d), s !== n && s.parentNode?.removeChild(s);
		};
	});
	return Hr.set(l, u), l;
}
var Hr = /* @__PURE__ */ new WeakMap();
function Ur(e, t) {
	let n = Hr.get(e);
	return n ? (Hr.delete(e), n(t)) : Promise.resolve();
}
// node_modules/svelte/src/internal/client/dom/blocks/branches.js
var Wr = class {
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
			if (n) zn(n), this.#r.delete(t);
			else {
				var r = this.#n.get(t);
				r && (zn(r.effect), this.#t.set(t, r.effect), this.#n.delete(t), r.fragment.lastChild.remove(), this.anchor.before(r.fragment), n = r.effect);
			}
			for (let [t, n] of this.#e) {
				if (this.#e.delete(t), t === e) break;
				let r = this.#n.get(n);
				r && (Pn(r.effect), this.#n.delete(n));
			}
			for (let [e, r] of this.#t) {
				if (e === t || this.#r.has(e)) continue;
				let i = () => {
					if (Array.from(this.#e.values()).includes(e)) {
						var t = document.createDocumentFragment();
						Vn(r, t), t.append(ln()), this.#n.set(e, {
							effect: r,
							fragment: t
						});
					} else Pn(r);
					this.#r.delete(e), this.#t.delete(e);
				};
				this.#i || !n ? (this.#r.add(e), Ln(r, i, !1)) : i();
			}
		}
	};
	#o = (e) => {
		this.#e.delete(e);
		let t = Array.from(this.#e.values());
		for (let [e, n] of this.#n) t.includes(e) || (Pn(n.effect), this.#n.delete(e));
	};
	ensure(e, t) {
		var n = A, r = pn();
		if (t && !this.#t.has(e) && !this.#n.has(e)) {
			if (r) {
				var i = document.createDocumentFragment(), a = ln();
				i.append(a), this.#n.set(e, {
					effect: An(() => t(a)),
					fragment: i
				});
			} else this.#t.set(e, An(() => t(this.anchor)));
		}
		if (this.#e.set(n, e), r) {
			for (let [t, r] of this.#t) t === e ? n.unskip_effect(r) : n.skip_effect(r);
			for (let [t, r] of this.#n) t === e ? n.unskip_effect(r.effect) : n.skip_effect(r.effect);
			n.oncommit(this.#a), n.ondiscard(this.#o);
		} else E && (this.anchor = D), this.#a(n);
	}
};
// node_modules/svelte/src/internal/client/dom/blocks/if.js
function W(e, t, n = !1) {
	var r;
	E && (r = D, Oe());
	var i = new Wr(e), a = n ? T : 0;
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
	kn(() => {
		var e = !1;
		t((t, n = 0) => {
			e = !0, o(n, t);
		}), e || o(-1, null);
	}, a);
}
// node_modules/svelte/src/internal/client/dom/blocks/key.js
var Gr = Symbol("NaN");
function Kr(e, t, n) {
	E && Oe();
	var r = new Wr(e), i = !Ze();
	kn(() => {
		var e = t();
		e !== e && (e = Gr), i && typeof e == "object" && e && (e = {}), r.ensure(e, n);
	});
}
// node_modules/svelte/src/internal/client/dom/blocks/each.js
function qr(e, t) {
	return t;
}
function Jr(e, t, n) {
	for (var r = [], i = t.length, o, s = t.length, c = 0; c < i; c++) {
		let n = t[c];
		Ln(n, () => {
			if (o) {
				if (o.pending.delete(n), o.done.add(n), o.pending.size === 0) {
					var t = e.outrogroups;
					Yr(e, a(o.done)), t.delete(o), t.size === 0 && (e.outrogroups = null);
				}
			} else --s;
		}, !1);
	}
	if (s === 0) {
		var l = r.length === 0 && n !== null && e.pending.size === 0;
		if (l) {
			var u = n, d = u.parentNode;
			fn(d), d.append(u), e.items.clear();
		}
		Yr(e, t, !l);
	} else o = {
		pending: new Set(t),
		done: /* @__PURE__ */ new Set()
	}, (e.outrogroups ??= /* @__PURE__ */ new Set()).add(o);
}
function Yr(e, t, n = !0) {
	var r;
	if (e.pending.size > 0) {
		r = /* @__PURE__ */ new Set();
		for (let t of e.pending.values()) for (let n of t) r.add(e.items.get(n).e);
	}
	for (var i = 0; i < t.length; i++) {
		var a = t[i];
		r?.has(a) ? (a.f |= ne, Vn(a, document.createDocumentFragment())) : Pn(t[i], n);
	}
}
var Xr;
function Zr(e, t, r, i, o, s = null) {
	var c = e, l = /* @__PURE__ */ new Map();
	if (t & 4) {
		var u = e;
		c = E ? De(/* @__PURE__ */ un(u)) : u.appendChild(ln());
	}
	E && Oe();
	var d = null, f = /* @__PURE__ */ vt(() => {
		var e = r();
		return n(e) ? e : e == null ? [] : a(e);
	}), p = /* @__PURE__ */ new Map(), m = !0;
	function h(e) {
		if (!(_.effect.f & 16384)) {
			_.pending.delete(e);
			var n = z(f);
			_.fallback = d, $r(_, n, c, t, i), d !== null && (n.length === 0 ? d.f & 33554432 ? (d.f ^= ne, ti(d, null, c)) : zn(d) : Ln(d, () => {
				d = null;
			}));
		}
	}
	function g(e) {
		_.pending.delete(e);
	}
	var _ = {
		effect: kn(() => {
			var e = z(f), n = e.length;
			let a = !1;
			E && je(c) === "[!" != (n === 0) && (c = Ae(), De(c), Ee(!1), a = !0);
			for (var u = /* @__PURE__ */ new Set(), _ = A, v = pn(), y = 0; y < n; y += 1) {
				E && D.nodeType === 8 && D.data === "]" && (c = D, a = !0, Ee(!1));
				var b = e[y], x = i(b, y), S = m ? null : l.get(x);
				S ? (S.v && Xt(S.v, b), S.i && Xt(S.i, y), v && _.unskip_effect(S.e)) : (S = ei(l, m ? c : Xr ??= ln(), b, x, y, o, t, r), m || (S.e.f |= ne), l.set(x, S)), u.add(x);
			}
			if (n === 0 && s && !d && (m ? d = An(() => s(c)) : (d = An(() => s(Xr ??= ln())), d.f |= ne)), n > u.size && Ie("", "", ""), E && n > 0 && De(Ae()), !m) {
				if (p.set(_, u), v) {
					for (let [e, t] of l) u.has(e) || _.skip_effect(t.e);
					_.oncommit(h), _.ondiscard(g);
				} else h(_);
			}
			a && Ee(!0), z(f);
		}),
		flags: t,
		items: l,
		pending: p,
		outrogroups: null,
		fallback: d
	};
	m = !1, E && (c = D);
}
function Qr(e) {
	for (; e !== null && !(e.f & 32);) e = e.next;
	return e;
}
function $r(e, t, n, r, i) {
	var o = !!(r & 8), s = t.length, c = e.items, l = Qr(e.effect.first), u, d = null, f, p = [], m = [], h, g, _, v;
	if (o) for (v = 0; v < s; v += 1) h = t[v], g = i(h, v), _ = c.get(g).e, _.f & 33554432 || (_.nodes?.a?.measure(), (f ??= /* @__PURE__ */ new Set()).add(_));
	for (v = 0; v < s; v += 1) {
		if (h = t[v], g = i(h, v), _ = c.get(g).e, e.outrogroups !== null) for (let t of e.outrogroups) t.pending.delete(_), t.done.delete(_);
		if (_.f & 8192 && (zn(_), o && (_.nodes?.a?.unfix(), (f ??= /* @__PURE__ */ new Set()).delete(_))), _.f & 33554432) {
			if (_.f ^= ne, _ === l) ti(_, null, n);
			else {
				var y = d ? d.next : l;
				_ === e.effect.last && (e.effect.last = _.prev), _.prev && (_.prev.next = _.next), _.next && (_.next.prev = _.prev), ni(e, d, _), ni(e, _, y), ti(_, y, n), d = _, p = [], m = [], l = Qr(d.next);
				continue;
			}
		}
		if (_ !== l) {
			if (u !== void 0 && u.has(_)) {
				if (p.length < m.length) {
					var b = m[0], x;
					d = b.prev;
					var S = p[0], C = p[p.length - 1];
					for (x = 0; x < p.length; x += 1) ti(p[x], b, n);
					for (x = 0; x < m.length; x += 1) u.delete(m[x]);
					ni(e, S.prev, C.next), ni(e, d, S), ni(e, C, b), l = b, d = C, --v, p = [], m = [];
				} else u.delete(_), ti(_, l, n), ni(e, _.prev, _.next), ni(e, _, d === null ? e.effect.first : d.next), ni(e, d, _), d = _;
				continue;
			}
			for (p = [], m = []; l !== null && l !== _;) (u ??= /* @__PURE__ */ new Set()).add(l), m.push(l), l = Qr(l.next);
			if (l === null) continue;
		}
		_.f & 33554432 || p.push(_), d = _, l = Qr(_.next);
	}
	if (e.outrogroups !== null) {
		for (let t of e.outrogroups) t.pending.size === 0 && (Yr(e, a(t.done)), e.outrogroups?.delete(t));
		e.outrogroups.size === 0 && (e.outrogroups = null);
	}
	if (l !== null || u !== void 0) {
		var w = [];
		if (u !== void 0) for (_ of u) _.f & 8192 || w.push(_);
		for (; l !== null;) !(l.f & 8192) && l !== e.fallback && w.push(l), l = Qr(l.next);
		var T = w.length;
		if (T > 0) {
			var ee = r & 4 && s === 0 ? n : null;
			if (o) {
				for (v = 0; v < T; v += 1) w[v].nodes?.a?.measure();
				for (v = 0; v < T; v += 1) w[v].nodes?.a?.fix();
			}
			Jr(e, w, ee);
		}
	}
	o && et(() => {
		if (f !== void 0) for (_ of f) _.nodes?.a?.apply();
	});
}
function ei(e, t, n, r, i, a, o, s) {
	var c = o & 1 ? o & 16 ? Gt(n) : /* @__PURE__ */ qt(n, !1, !1) : null, l = o & 2 ? Gt(i) : null;
	return {
		v: c,
		i: l,
		e: An(() => (a(t, c ?? n, l ?? i, s), () => {
			e.delete(r);
		}))
	};
}
function ti(e, t, n) {
	if (e.nodes) for (var r = e.nodes.start, i = e.nodes.end, a = t && !(t.f & 33554432) ? t.nodes.start : n; r !== null;) {
		var o = /* @__PURE__ */ dn(r);
		if (a.before(r), r === i) return;
		r = o;
	}
}
function ni(e, t, n) {
	t === null ? e.effect.first = n : t.next = n, n === null ? e.effect.last = t : n.prev = t;
}
function G(e, t, n = !1, r = !1, i = !1, a = !1) {
	var o = e, s = "";
	if (n) {
		var c = e;
		E && (o = De(/* @__PURE__ */ un(c)));
	}
	I(() => {
		var e = R;
		if (s === (s = t() ?? "")) E && Oe();
		else if (n && !E) e.nodes = null, c.innerHTML = s, s !== "" && Mr(/* @__PURE__ */ un(c), c.lastChild);
		else if (e.nodes !== null && (Fn(e.nodes.start, e.nodes.end), e.nodes = null), s !== "") {
			if (E) {
				for (var a = D.data, l = Oe(), u = l; l !== null && (l.nodeType !== 8 || l.data !== "");) u = l, l = /* @__PURE__ */ dn(l);
				if (l === null) throw Ce(), _e;
				Mr(D, u), o = De(l);
			} else {
				var d = mn(r ? "svg" : i ? "math" : "template", r ? be : i ? xe : void 0);
				d.innerHTML = s;
				var f = r || i ? d : d.content;
				if (Mr(/* @__PURE__ */ un(f), f.lastChild), r || i) for (; /* @__PURE__ */ un(f);) o.before(/* @__PURE__ */ un(f));
				else o.before(f);
			}
		}
	});
}
// node_modules/svelte/src/internal/client/dom/blocks/svelte-component.js
function ri(e, t, n) {
	var r;
	E && (r = D, Oe());
	var i = new Wr(e);
	kn(() => {
		var e = t() ?? null;
		if (E && je(r) === "[" != (e !== null)) {
			var a = Ae();
			De(a), i.anchor = a, Ee(!1), i.ensure(e, e && ((t) => n(t, e))), Ee(!0);
		} else i.ensure(e, e && ((t) => n(t, e)));
	}, T);
}
// node_modules/svelte/src/internal/client/dom/elements/actions.js
function ii(e, t, n) {
	En(() => {
		var r = hr(() => t(e, n?.()) || {});
		if (n && r?.update) {
			var i = !1, a = {};
			On(() => {
				var e = n();
				gr(e), i && Ne(a, e) && (a = e, r.update(e));
			}), i = !0;
		}
		if (r?.destroy) return () => r.destroy();
	});
}
// node_modules/svelte/src/internal/shared/attributes.js
var ai = [..." 	\n\r\f\xA0\v﻿"];
function oi(e, t, n) {
	var r = e == null ? "" : "" + e;
	if (t && (r = r ? r + " " + t : t), n) {
		for (var i of Object.keys(n)) if (n[i]) r = r ? r + " " + i : i;
		else if (r.length) for (var a = i.length, o = 0; (o = r.indexOf(i, o)) >= 0;) {
			var s = o + a;
			(o === 0 || ai.includes(r[o - 1])) && (s === r.length || ai.includes(r[s])) ? r = (o === 0 ? "" : r.substring(0, o)) + r.substring(s + 1) : o = s;
		}
	}
	return r === "" ? null : r;
}
function si(e, t = !1) {
	var n = t ? " !important;" : ";", r = "";
	for (var i of Object.keys(e)) {
		var a = e[i];
		a != null && a !== "" && (r += " " + i + ": " + a + n);
	}
	return r;
}
function ci(e) {
	return e[0] !== "-" || e[1] !== "-" ? e.toLowerCase() : e;
}
function li(e, t) {
	if (t) {
		var n = "", r, i;
		if (Array.isArray(t) ? (r = t[0], i = t[1]) : r = t, e) {
			e = String(e).replaceAll(/\/\*.*?\*\//g, "").trim();
			var a = !1, o = 0, s = !1, c = [];
			r && c.push(...Object.keys(r).map(ci)), i && c.push(...Object.keys(i).map(ci));
			var l = 0, u = -1;
			let t = e.length;
			for (var d = 0; d < t; d++) {
				var f = e[d];
				if (s ? f === "/" && e[d - 1] === "*" && (s = !1) : a ? a === f && (a = !1) : f === "/" && e[d + 1] === "*" ? s = !0 : f === "\"" || f === "'" ? a = f : f === "(" ? o++ : f === ")" && o--, !s && a === !1 && o === 0) {
					if (f === ":" && u === -1) u = d;
					else if (f === ";" || d === t - 1) {
						if (u !== -1) {
							var p = ci(e.substring(l, u).trim());
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
		return r && (n += si(r)), i && (n += si(i, !0)), n = n.trim(), n === "" ? null : n;
	}
	return e == null ? null : String(e);
}
// node_modules/svelte/src/internal/client/dom/elements/class.js
function K(e, t, n, r, i, a) {
	var o = e[de];
	if (E || o !== n || o === void 0) {
		var s = oi(n, r, a);
		E && s === e.getAttribute("class") || (s == null ? e.removeAttribute("class") : t ? e.className = s : e.setAttribute("class", s)), e[de] = n;
	} else if (a && i !== a) for (var c in a) {
		var l = !!a[c];
		(i == null || l !== !!i[c]) && e.classList.toggle(c, l);
	}
	return a;
}
// node_modules/svelte/src/internal/client/dom/elements/style.js
function ui(e, t = {}, n, r) {
	for (var i in n) {
		var a = n[i];
		t[i] !== a && (n[i] == null ? e.style.removeProperty(i) : e.style.setProperty(i, a, r));
	}
}
function di(e, t, n, r) {
	var i = e[fe];
	if (E || i !== t) {
		var a = li(t, r);
		E && a === e.getAttribute("style") || (a == null ? e.removeAttribute("style") : e.style.cssText = a), e[fe] = t;
	} else r && (Array.isArray(r) ? (ui(e, n?.[0], r[0]), ui(e, n?.[1], r[1], "important")) : ui(e, n, r));
	return r;
}
// node_modules/svelte/src/internal/client/dom/elements/bindings/select.js
function fi(e, t) {
	t ? e.hasAttribute("selected") || e.setAttribute("selected", "") : e.removeAttribute("selected");
}
function pi(e, t) {
	var r = e.__defaultValue, i = e.multiple, a = i ? r ?? [] : null;
	if (!i || n(a)) {
		var o = e.selectedIndex, s = t && i ? new Set(e.selectedOptions) : null;
		for (var c of e.options) {
			var l = _i(c);
			fi(c, i ? a.includes(l) : nn(l, r));
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
function mi(e, t, r = !1) {
	if (e.multiple) {
		if (t == null) return;
		if (!n(t)) return we();
		for (var i of e.options) i.selected = t.includes(_i(i));
	} else {
		for (i of e.options) if (nn(_i(i), t)) {
			i.selected = !0;
			return;
		}
		r && t === void 0 || (e.selectedIndex = -1);
	}
}
function hi(e) {
	var t = new MutationObserver((t) => {
		t.every(vi) || ("__defaultValue" in e && pi(e, !1), "__value" in e && mi(e, e.__value));
	});
	t.observe(e, {
		childList: !0,
		subtree: !0,
		attributes: !0,
		attributeFilter: ["value"]
	}), Sn(() => {
		t.disconnect();
	});
}
function gi(e, t, n = t) {
	var r = /* @__PURE__ */ new WeakSet(), i = !0;
	ut(e, "change", (t) => {
		var i = t ? "[selected]" : ":checked", a;
		if (e.multiple) a = [].map.call(e.querySelectorAll(i), _i);
		else {
			var o = e.querySelector(i) ?? e.querySelector("option:not([disabled])");
			a = o && _i(o);
		}
		n(a), e.__value = a, A !== null && r.add(A);
	}), En(() => {
		var a = t();
		if (e === document.activeElement) {
			var o = A;
			if (r.has(o)) return;
		}
		if (mi(e, a, i), i && a === void 0) {
			var s = e.querySelector(":checked");
			s !== null && (a = _i(s), n(a));
		}
		e.__value = a, i = !1;
	});
}
function _i(e) {
	return "__value" in e ? e.__value : e.value;
}
function vi(e) {
	if (e.target.closest("selectedcontent") !== null) return !0;
	if (e.type === "childList") {
		var t = [...e.addedNodes, ...e.removedNodes];
		return t.length > 0 && t.every((e) => e.nodeName === "SELECTEDCONTENT");
	}
	return !1;
}
// node_modules/svelte/src/internal/client/dom/elements/attributes.js
var yi = Symbol("is custom element"), bi = Symbol("is html"), xi = ge ? "link" : "LINK", Si = ge ? "progress" : "PROGRESS";
function Ci(e) {
	if (E) {
		var t = !1, n = () => {
			if (!t) {
				if (t = !0, e.hasAttribute("value")) {
					var n = e.value;
					q(e, "value", null), e.value = n;
				}
				if (e.hasAttribute("checked")) {
					var r = e.checked;
					q(e, "checked", null), e.checked = r;
				}
			}
		};
		e[me] = n, et(n), ct();
	}
}
function wi(e, t) {
	var n = Ei(e);
	n.value !== (n.value = t ?? void 0) && (e.value !== t || t === 0 && e.nodeName === Si) && (e.value = t ?? "");
}
function Ti(e, t) {
	var n = Ei(e);
	n.checked !== (n.checked = t ?? void 0) && (e.checked = t);
}
function q(e, t, n, r) {
	var i = Ei(e);
	if (!(E && (i[t] = e.getAttribute(t), t === "src" || t === "srcset" || t === "href" && e.nodeName === xi))) {
		var a = i[t];
		a !== (i[t] = n) && (t === "loading" && (e[le] = n), n == null ? e.removeAttribute(t) : typeof n != "string" && Oi(e).has(t) ? e[t] = n : (!E || typeof n != "number" && typeof n != "boolean" || a !== String(n)) && e.setAttribute(t, n));
	}
}
function Ei(e) {
	return e[ue] ??= {
		[yi]: e.nodeName.includes("-"),
		[bi]: e.namespaceURI === ye
	};
}
var Di = /* @__PURE__ */ new Map();
function Oi(e) {
	var t = e.getAttribute("is") || e.nodeName, n = Di.get(t);
	if (n) return n;
	Di.set(t, n = /* @__PURE__ */ new Set());
	for (var r, i = e, a = Element.prototype; a !== i;) {
		for (var o in r = c(i), r) r[o].set && o !== "innerHTML" && o !== "textContent" && o !== "innerText" && n.add(o);
		i = d(i);
	}
	return n;
}
// node_modules/svelte/src/internal/client/dom/elements/bindings/input.js
function ki(e, t, n = t) {
	var r = /* @__PURE__ */ new WeakSet();
	ut(e, "input", async (i) => {
		var a = i ? e.defaultValue : e.value;
		if (a = Ai(e) ? ji(a) : a, n(a), A !== null && r.add(A), await fr(), a !== (a = t())) {
			var o = e.selectionStart, s = e.selectionEnd, c = e.value.length;
			if (e.value = a ?? "", s !== null) {
				var l = e.value.length;
				o === s && s === c && l > c ? (e.selectionStart = l, e.selectionEnd = l) : (e.selectionStart = o, e.selectionEnd = Math.min(s, l));
			}
		}
	}), (E && e.defaultValue !== e.value || hr(t) == null && e.value) && (n(Ai(e) ? ji(e.value) : e.value), A !== null && r.add(A)), On(() => {
		var n = t();
		if (e === document.activeElement) {
			var i = A;
			if (r.has(i)) return;
		}
		Ai(e) && n === ji(e.value) || (e.type !== "date" || n || e.value) && n !== e.value && (e.value = n ?? "");
	});
}
function Ai(e) {
	var t = e.type;
	return t === "number" || t === "range";
}
function ji(e) {
	return e === "" ? null : +e;
}
// node_modules/svelte/src/store/utils.js
function Mi(e, t, n) {
	if (e == null) return t(void 0), n && n(void 0), m;
	let r = hr(() => e.subscribe(t, n));
	return r.unsubscribe ? () => r.unsubscribe() : r;
}
// node_modules/svelte/src/store/shared/index.js
var Ni = [];
function Pi(e, t = m) {
	let n = null, r = /* @__PURE__ */ new Set();
	function i(t) {
		if (Ne(e, t) && (e = t, n)) {
			let t = !Ni.length;
			for (let t of r) t[1](), Ni.push(t, e);
			if (t) {
				for (let e = 0; e < Ni.length; e += 2) Ni[e][0](Ni[e + 1]);
				Ni.length = 0;
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
function Fi(e) {
	let t;
	return Mi(e, (e) => t = e)(), t;
}
// node_modules/svelte/src/internal/client/reactivity/store.js
var Ii = !1, Li = Symbol("unmounted");
function Ri(e, t, n) {
	let r = n[t] ??= {
		store: null,
		source: /* @__PURE__ */ qt(void 0),
		unsubscribe: m
	};
	if (r.store !== e && !(Li in n)) {
		if (r.unsubscribe(), r.store = e ?? null, e == null) r.source.v = void 0, r.unsubscribe = m;
		else {
			var i = !0;
			r.unsubscribe = Mi(e, (e) => {
				i ? r.source.v = e : j(r.source, e);
			}), i = !1;
		}
	}
	return e && Li in n ? Fi(e) : z(r.source);
}
function zi() {
	let e = {};
	function t() {
		Sn(() => {
			for (var t in e) e[t].unsubscribe();
			o(e, Li, {
				enumerable: !1,
				value: !0
			});
		});
	}
	return [e, t];
}
function Bi(e) {
	var t = Ii;
	try {
		return Ii = !1, [e(), Ii];
	} finally {
		Ii = t;
	}
}
// node_modules/svelte/src/internal/client/reactivity/props.js
var Vi = {
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
function Hi(e, t, n) {
	return new Proxy({
		props: e,
		exclude: t
	}, Vi);
}
var Ui = {
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
function Wi(...e) {
	return new Proxy({ props: e }, Ui);
}
function Gi(e, t, n, r) {
	var i = !0, a = !!(n & 8), o = !!(n & 16), c = r, l = !0, u = void 0, d = () => o && i ? (u ??= /* @__PURE__ */ ht(r), z(u)) : (l && (l = !1, c = o ? hr(r) : r), c);
	let f;
	if (a) {
		var p = oe in e || ce in e;
		f = s(e, t)?.set ?? (p && t in e ? (n) => e[t] = n : void 0);
	}
	var m, h = !1;
	a ? [m, h] = Bi(() => e[t]) : m = e[t], m === void 0 && r !== void 0 && (m = d(), f && (i && Ve(t), f(m)));
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
	a && z(y);
	var b = R;
	return (function(e, t) {
		if (arguments.length > 0) {
			let n = t ? z(y) : i && a ? en(e) : e;
			return j(y, n), v = !0, c !== void 0 && (c = n), e;
		}
		return Un && v || b.f & 16384 ? y.v : z(y);
	});
}
// node_modules/svelte/src/internal/disclose-version.js
typeof window < "u" && ((window.__svelte ??= {}).v ??= /* @__PURE__ */ new Set()).add("5");
// svelte/View.svelte
function Ki(e, t) {
	let n = () => Ri(t.values, "$values", r), [r, i] = zi();
	var a = Pr();
	ri(N(a), () => t.component, (e, t) => {
		t(e, Wi(n));
	}), H(e, a), i();
}
// svelte/Inbox.svelte
var qi = /* @__PURE__ */ V("<div class=\"ibTabs\" role=\"tablist\"><button type=\"button\"> <small> </small></button> <button type=\"button\"> <small> </small></button></div>"), Ji = /* @__PURE__ */ V("<b> </b>"), Yi = /* @__PURE__ */ V("<button class=\"ghost\"></button>"), Xi = /* @__PURE__ */ V("<li><a><span></span> <span class=\"wt\"><span><!> </span> <small> </small></span></a> <!></li>"), Zi = /* @__PURE__ */ V("<ul></ul>"), Qi = /* @__PURE__ */ V("<p class=\"ibEmpty\"> </p>"), $i = /* @__PURE__ */ V("<header><h2> </h2> <button class=\"ghost\"></button></header> <!> <!>", 1);
function ea(e, t) {
	Je(t, !0);
	let n = Gi(t, "all", 3, !1), r = /* @__PURE__ */ Kt(en(hr(() => n()))), i = (e) => {
		j(r, e, !0), t.ontab?.(e);
	}, a = /* @__PURE__ */ k(() => t.roomId ? t.waits.filter((e) => e.book_id === t.roomId) : []), o = /* @__PURE__ */ k(() => z(r) || !t.roomId), s = /* @__PURE__ */ k(() => z(o) ? t.waits : z(a)), c = (e) => (e.author_name || e.author.split("@")[0]).split(" ")[0], l = (e) => e.ref.startsWith("t") ? "task" : /^[ab]/.test(e.ref) ? "agent" : "ask", u = (e) => `/b/${e.book_id}${e.thread === "main" ? "" : `?t=${encodeURIComponent(e.thread)}`}${/^[mab]/.test(e.ref) ? `#m${e.ref.slice(1)}` : ""}`, d = (e) => e.length > 220 ? `${e.slice(0, 218)}…` : e;
	var f = $i(), p = N(f), m = M(p), h = P(m, !0), g = F(m, 2);
	G(g, () => t.vb.icon("x", 18), !0), O(g), O(p);
	var _ = F(p, 2), v = (e) => {
		var n = qi(), r = M(n);
		let s;
		var c = M(r), l = P(F(c), !0);
		O(r);
		var u = F(r, 2);
		let d;
		var f = M(u), p = P(F(f), !0);
		O(u), O(n), I((e, n) => {
			s = K(r, 1, "", null, s, { on: !z(o) }), U(c, `${e ?? ""} `), U(l, z(a).length), d = K(u, 1, "", null, d, { on: z(o) }), U(f, `${n ?? ""} `), U(p, t.waits.length);
		}, [() => t.vb.t("Esta sala"), () => t.vb.t("Todas")]), B("click", r, () => i(!1)), B("click", u, () => i(!0)), H(e, n);
	};
	W(_, (e) => {
		t.roomId && e(v);
	});
	var y = F(_, 2), b = (e) => {
		var n = Zi();
		Zr(n, 21, () => z(s), (e) => e.book_id + e.ref, (e, n) => {
			var r = Xi(), i = M(r), a = M(i);
			let s;
			G(a, () => l(z(n)) === "task" ? t.vb.icon("check", 16) : t.vb.avatar(z(n).author), !0), O(a);
			var f = F(a, 2), p = M(f), m = M(p), h = (e) => {
				var n = Ji(), r = P(n, !0);
				I((e) => U(r, e), [() => t.vb.t("Tarefa sua esperando OK:")]), H(e, n);
			}, g = /* @__PURE__ */ k(() => l(z(n)) === "task"), _ = (e) => {
				var n = Ji(), r = P(n, !0);
				I((e) => U(r, e), [() => t.vb.t("Seu agent espera você:")]), H(e, n);
			}, v = /* @__PURE__ */ k(() => l(z(n)) === "agent"), y = (e) => {
				var t = Ji(), r = P(t);
				I((e) => U(r, `${e ?? ""}:`), [() => c(z(n))]), H(e, t);
			};
			W(m, (e) => {
				z(g) ? e(h) : z(v) ? e(_, 1) : e(y, -1);
			});
			var b = F(m);
			O(p);
			var x = P(F(p, 2));
			O(f), O(i);
			var S = F(i, 2), C = (e) => {
				var r = Yi();
				G(r, () => t.vb.icon("check"), !0), O(r), I((e, t) => {
					q(r, "title", e), q(r, "aria-label", t);
				}, [() => t.vb.t("Já resolvi (respondi em outro lugar, ou não é comigo)"), () => t.vb.t("Já resolvi (respondi em outro lugar, ou não é comigo)")]), B("click", r, () => t.onresolve(z(n))), H(e, r);
			}, w = /* @__PURE__ */ k(() => z(n).ref.startsWith("m"));
			W(S, (e) => {
				z(w) && e(C);
			}), O(r), I((e, t, r, c, l) => {
				q(i, "href", e), s = K(a, 1, "wIc", null, s, { task: t }), U(b, ` ${r ?? ""}`), U(x, `${z(o) ? `${z(n).room} › ` : ""}${c ?? ""} · ${l ?? ""}`);
			}, [
				() => u(z(n)),
				() => l(z(n)) === "task",
				() => d(z(n).text),
				() => z(n).topic || t.vb.t("sala principal"),
				() => t.vb.ago(z(n).ts)
			]), B("click", i, (e) => t.onopen(z(n), e)), H(e, r);
		}), O(n), H(e, n);
	}, x = (e) => {
		var n = Qi(), r = P(n, !0);
		I((e) => U(r, e), [() => z(o) ? t.vb.t("Nada esperando você. ✓") : t.vb.t("Nada esperando você nesta sala. ✓")]), H(e, n);
	};
	W(y, (e) => {
		z(s).length ? e(b) : e(x, -1);
	}), I((e, t) => {
		U(h, e), q(g, "aria-label", t);
	}, [() => t.vb.t("Caixa de entrada"), () => t.vb.t("Fechar")]), B("click", g, function(...e) {
		t.onclose?.apply(this, e);
	}), H(e, f), Ye();
}
Tr(["click"]);
// svelte/TaskList.svelte
function ta(e) {
	e.focus(), e.select();
}
var na = /* @__PURE__ */ V("<span class=\"vnote\"><!> </span>"), ra = /* @__PURE__ */ V("<input class=\"tedit\"/>"), ia = /* @__PURE__ */ V("<span class=\"tt\" role=\"button\" tabindex=\"0\"> <!></span>"), aa = /* @__PURE__ */ V("<option> </option>"), oa = /* @__PURE__ */ V("<div><input type=\"checkbox\"/> <!> <select><option> </option><!></select> <button type=\"button\"><!> </button> <button class=\"ghost x\"></button></div>"), sa = /* @__PURE__ */ V("<div class=\"thead\"><b> </b><small> </small><i><span></span></i></div> <!> <!> <form class=\"row\" id=\"newTask\" style=\"margin-top:6px\"><input/><button></button></form>", 1);
function ca(e, t) {
	Je(t, !0);
	let n = Gi(t, "waits", 19, () => []), r = /* @__PURE__ */ k(() => t.room.epics.find((e) => e.id === t.thread) || (t.thread === "main" && t.room.roomTasks?.length ? {
		id: "main",
		tasks: t.room.roomTasks,
		flags: []
	} : null)), i = (e) => n().some((n) => n.book_id === t.room.id && n.ref === `t${e.id}`), a = /* @__PURE__ */ k(() => (z(r)?.tasks || []).map((e, t) => ({
		tk: e,
		i: t
	})).sort((e, t) => (e.tk.done ? 2 : +!i(e.tk)) - (t.tk.done ? 2 : +!i(t.tk)) || e.i - t.i).map((e) => e.tk)), o = /* @__PURE__ */ k(() => z(r)?.tasks.filter((e) => e.done).length || 0), s = /* @__PURE__ */ Kt(null), c = /* @__PURE__ */ Kt(""), l = /* @__PURE__ */ Kt("");
	function u(e, n = !0) {
		z(s) === e.id && (j(s, null), n && z(c).trim() && z(c) !== e.title && t.send({
			t: "task.rename",
			id: e.id,
			title: z(c)
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
	var f = Pr(), p = N(f), m = (e) => {
		var n = sa(), f = N(n), p = M(f), m = P(p, !0), h = F(p), g = P(h), _ = F(h), v = M(_);
		let y;
		O(_), O(f);
		var b = F(f, 2), x = (e) => {
			var n = na(), i = M(n);
			G(i, () => t.vb.icon("alert", 12));
			var a = F(i);
			O(n), I((e, t) => {
				q(n, "title", e), U(a, ` ${t ?? ""}`);
			}, [() => `@vibe: ${z(r).flags.join(" · ")}`, () => z(r).flags.join(" · ")]), H(e, n);
		};
		W(b, (e) => {
			z(r).flags?.length && e(x);
		});
		var S = F(b, 2);
		Zr(S, 17, () => z(a), (e) => e.id, (e, n) => {
			var r = oa();
			let a;
			var o = M(r);
			Ci(o);
			var l = F(o, 2), f = (e) => {
				var t = ra();
				Ci(t), En(() => ki(t, () => z(c), (e) => j(c, e))), ii(t, (e) => ta?.(e)), wr("blur", t, () => u(z(n))), B("keydown", t, (e) => {
					e.key === "Enter" && u(z(n)), e.key === "Escape" && u(z(n), !1);
				}), H(e, t);
			}, p = (e) => {
				var r = ia(), i = M(r, !0), a = F(i), o = (e) => {
					var r = na(), i = M(r);
					G(i, () => t.vb.icon("alert", 12));
					var a = F(i);
					O(r), I((e, t) => {
						q(r, "title", e), U(a, ` ${t ?? ""}`);
					}, [() => `@vibe: ${z(n).flags.join(" · ")}`, () => z(n).flags.join(" · ")]), H(e, r);
				};
				W(a, (e) => {
					z(n).flags?.length && e(o);
				}), O(r), I((e) => {
					q(r, "title", e), U(i, z(n).title);
				}, [() => t.vb.t("Clique para editar")]), B("click", r, () => {
					j(s, z(n).id, !0), j(c, z(n).title, !0);
				}), B("keydown", r, (e) => {
					e.key === "Enter" && (j(s, z(n).id, !0), j(c, z(n).title, !0));
				}), H(e, r);
			};
			W(l, (e) => {
				z(s) === z(n).id ? e(f) : e(p, -1);
			});
			var m = F(l, 2);
			let h;
			var g = M(m), _ = P(g, !0);
			g.value = g.__value = "", Zr(F(g), 17, () => t.room.members || [], qr, (e, n) => {
				var r = aa(), i = P(r, !0), a = {};
				I((e) => {
					U(i, e), a !== (a = z(n)) && (r.value = (r.__value = a) ?? "");
				}, [() => z(n) === t.room.me ? t.vb.t("você") : t.vb.name(z(n))]), H(e, r);
			}), O(m);
			var v;
			hi(m);
			var y = F(m, 2);
			let b;
			var x = M(y);
			G(x, () => t.vb.icon("calendar", 13));
			var S = F(x, 1, !0);
			O(y);
			var C = F(y, 2);
			G(C, () => t.vb.icon("x"), !0), O(C), O(r), I((e, i, s, c, l, u, d) => {
				a = K(r, 1, "task", null, a, {
					done: z(n).done,
					mine: !z(n).done && z(n).owner === t.room.me,
					waitTask: e
				}), q(r, "data-task", z(n).id), Ti(o, z(n).done), q(o, "aria-label", i), h = K(m, 1, "towner", null, h, { set: !!z(n).owner }), q(m, "data-owner", z(n).id), q(m, "aria-label", s), U(_, c), v !== (v = z(n).owner || "") && (m.value = (m.__value = v) ?? "", mi(m, v)), b = K(y, 1, "due", null, b, { set: !!z(n).due }), q(y, "data-due", z(n).id), q(y, "title", l), U(S, z(n).due ? ` ${z(n).due}` : ""), q(C, "data-tdel", z(n).id), q(C, "aria-label", u), q(C, "title", d);
			}, [
				() => i(z(n)),
				() => t.vb.t("Feita"),
				() => t.vb.t("Responsável"),
				() => t.vb.t("sem dono"),
				() => t.vb.t("Prazo"),
				() => t.vb.t("Apagar task"),
				() => t.vb.t("Apagar task")
			]), B("change", o, () => t.send({
				t: "task.toggle",
				id: z(n).id
			})), B("change", m, (e) => t.send({
				t: "task.assign",
				id: z(n).id,
				owner: e.currentTarget.value
			})), B("click", y, () => d(z(n))), B("click", C, () => t.send({
				t: "task.del",
				id: z(n).id
			})), H(e, r);
		});
		var C = F(S, 2), w = M(C);
		Ci(w);
		var T = F(w);
		G(T, () => t.vb.icon("plus"), !0), O(T), O(C), I((e, t, n, i) => {
			U(m, e), U(g, `${z(o) ?? ""}/${z(r).tasks.length ?? ""}`), y = di(v, "", y, { width: t }), q(w, "placeholder", n), q(T, "aria-label", i);
		}, [
			() => t.vb.t("Tarefas"),
			() => `${z(r).tasks.length ? Math.round(z(o) / z(r).tasks.length * 100) : 0}%`,
			() => t.vb.t("nova task"),
			() => t.vb.t("Nova tarefa")
		]), wr("submit", C, (e) => {
			e.preventDefault(), z(l).trim() && t.send({
				t: "task.add",
				epic: t.thread,
				title: z(l)
			}), j(l, "");
		}), ki(w, () => z(l), (e) => j(l, e)), H(e, n);
	};
	W(p, (e) => {
		z(r) && e(m);
	}), H(e, f), Ye();
}
Tr([
	"change",
	"keydown",
	"click"
]);
// svelte/Tasks.svelte
var la = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy"
]);
function ua(e, t) {
	Je(t, !0);
	let n = /* @__PURE__ */ Hi(t, la);
	var r = Pr();
	Kr(N(r), () => JSON.stringify([t.room.id, t.thread]), (e) => {
		ca(e, Wi(() => n));
	}), H(e, r), Ye();
}
// svelte/panels.ts
var da = (e) => String(e ?? "").replace(/[&<>"']/g, (e) => ({
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	"\"": "&quot;",
	"'": "&#39;"
})[e]), fa = (e) => e.type.startsWith("image/") ? "img" : e.type.startsWith("audio/") ? "audio" : e.type === "text/html" ? "html" : e.type === "application/pdf" ? "pdf" : /\.md$/i.test(e.name) || e.type === "text/markdown" ? "md" : e.type === "text/plain" || e.type === "text/csv" ? "txt" : "other", pa = (e) => e > 1e6 ? `${(e / 1e6).toFixed(1)} MB` : `${Math.max(1, Math.round(e / 1e3))} KB`, ma = /* @__PURE__ */ V("<button type=\"button\"><span class=\"kt\"> </span><!><span> </span></button>"), ha = /* @__PURE__ */ V("<section><h3 class=\"mine\"> </h3> <!></section>"), ga = /* @__PURE__ */ V("<section><h3><span class=\"ri\"> </span> </h3> <!></section>"), _a = /* @__PURE__ */ V("<div class=\"empty\"> </div>"), va = /* @__PURE__ */ V("<div class=\"klist\"><!><!></div>"), ya = /* @__PURE__ */ V("<span class=\"vnote\"><!> </span>"), ba = /* @__PURE__ */ V("<!><span> </span>", 1), xa = /* @__PURE__ */ V("<span><!> </span>"), Sa = /* @__PURE__ */ V("<div draggable=\"true\" tabindex=\"0\" role=\"button\"><div class=\"kt\"></div> <!> <div class=\"km\"><span class=\"kep\"> </span><!><!></div></div>"), Ca = /* @__PURE__ */ V("<div class=\"kempty\"> </div>"), wa = /* @__PURE__ */ V("<input type=\"hidden\" name=\"epic\"/>"), Ta = /* @__PURE__ */ V("<option> </option>"), Ea = /* @__PURE__ */ V("<select name=\"epic\"></select>"), Da = /* @__PURE__ */ V("<form class=\"kadd\"><input/><button></button><!></form>"), Oa = /* @__PURE__ */ V("<section><h3> <span> </span></h3> <div class=\"cards\"></div> <!></section>"), ka = /* @__PURE__ */ V("<div class=\"lanes\"></div>"), Aa = /* @__PURE__ */ V("<div class=\"kbar\"><span class=\"seg\"><button type=\"button\" data-mode=\"board\"><!> </button><button type=\"button\" data-mode=\"list\"> </button></span><small class=\"kScope\"> </small></div> <!>", 1);
function ja(e, t) {
	Je(t, !0);
	let n = (e, n = m) => {
		var r = ma();
		let i;
		var a = M(r), o = P(a, !0), s = F(a), c = (e) => {
			var r = Pr();
			G(N(r), () => t.vb.avatar(n().owner)), H(e, r);
		};
		W(s, (e) => {
			n().owner && e(c);
		});
		var l = F(s), u = P(l, !0);
		O(r), I((e) => {
			i = K(r, 1, "krow", null, i, { done: n().status === "done" }), q(r, "data-k", n().id), q(r, "data-epic", n().epic.id), U(o, n().title), K(l, 1, `kst ${n().status}`), U(u, e);
		}, [() => t.vb.t(p[n().status] || n().status)]), B("click", r, () => t.onopen?.(n().epic.id)), H(e, r);
	}, r = [
		["todo", "A fazer"],
		["doing", "Fazendo"],
		["review", "Esperando OK"],
		["done", "Feito"]
	], i = /* @__PURE__ */ Kt(en((() => {
		try {
			return localStorage.getItem("vb.boardMode") || "board";
		} catch {
			return "board";
		}
	})())), a = /* @__PURE__ */ Kt(""), o = /* @__PURE__ */ Kt(""), s = /* @__PURE__ */ Kt(null), c = /* @__PURE__ */ k(() => t.thread !== "main" && !t.thread.startsWith("pre:") && t.room.epics.some((e) => e.id === t.thread) ? t.thread : null), l = /* @__PURE__ */ k(() => t.room.epics.filter((e) => z(c) ? e.id === z(c) : !e.archived)), u = /* @__PURE__ */ k(() => z(l).flatMap((e) => e.tasks.map((t) => ({
		...t,
		epic: e
	})))), d = /* @__PURE__ */ k(() => [...z(c) ? [] : [{
		id: "main",
		title: t.room.book?.title || "vibebook",
		tasks: t.room.roomTasks || []
	}], ...z(l)].map((e) => ({
		e,
		list: e.tasks.filter((e) => e.status !== "done").map((t) => ({
			...t,
			epic: e
		}))
	})).filter((e) => e.list.length)), f = /* @__PURE__ */ k(() => z(d).flatMap((e) => e.list.filter((e) => e.owner === t.room.me))), p = {
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
		j(i, e, !0);
		try {
			localStorage.setItem("vb.boardMode", e);
		} catch {}
	}
	function v(e, t) {
		e.dataTransfer?.setData("text/plain", t), e.currentTarget.classList.add("dragging");
	}
	function y(e, t) {
		e.preventDefault(), j(s, null);
		let n = e.dataTransfer?.getData("text/plain");
		n && h(n, t);
	}
	function b(e, n) {
		let i = r.findIndex(([e]) => e === n.status);
		e.key === "ArrowRight" && i < r.length - 1 && (e.preventDefault(), h(n.id, r[i + 1][0])), e.key === "ArrowLeft" && i > 0 && (e.preventDefault(), h(n.id, r[i - 1][0])), e.key === "Enter" && t.onopen?.(n.epic.id);
	}
	var x = Pr(), S = N(x), C = (e) => {
		var l = Aa(), p = N(l), m = M(p), h = M(m);
		let x;
		var S = M(h);
		G(S, () => t.vb.icon("board", 14));
		var C = F(S);
		O(h);
		var w = F(h);
		let T;
		var ee = P(w, !0);
		O(m);
		var te = P(F(m), !0);
		O(p);
		var ne = F(p, 2), re = (e) => {
			var r = va(), i = M(r), a = (e) => {
				var r = ha(), i = M(r), a = P(i);
				Zr(F(i, 2), 17, () => z(f), (e) => e.id, (e, t) => {
					n(e, () => z(t));
				}), O(r), I((e) => U(a, `⏳ ${e ?? ""} · ${z(f).length ?? ""}`), [() => t.vb.t("Esperando você")]), H(e, r);
			};
			W(i, (e) => {
				z(f).length && e(a);
			}), Zr(F(i), 17, () => z(d), (e) => e.e.id, (e, r) => {
				var i = ga(), a = M(i), o = M(a);
				let s;
				var c = P(o, !0), l = F(o);
				O(a), Zr(F(a, 2), 17, () => z(r).list, (e) => e.id, (e, t) => {
					n(e, () => z(t));
				}), O(i), I((e, t) => {
					s = di(o, "", s, { background: e }), U(c, t), U(l, `${z(r).e.title ?? ""} · ${z(r).list.length ?? ""}`);
				}, [() => t.vb.color(z(r).e.title), () => t.vb.initials(z(r).e.title)]), H(e, i);
			}, (e) => {
				var n = _a(), r = P(n, !0);
				I((e) => U(r, e), [() => t.vb.t("Nenhuma tarefa aberta.")]), H(e, n);
			}), O(r), H(e, r);
		}, ie = (e) => {
			var n = ka();
			Zr(n, 21, () => r, qr, (e, n) => {
				var r = /* @__PURE__ */ k(() => _(z(n), 2));
				let i = () => z(r)[0], l = () => z(r)[1], d = /* @__PURE__ */ k(() => z(u).filter((e) => e.status === i()));
				var f = Oa();
				let p;
				var m = M(f), h = M(m, !0), g = P(F(h), !0);
				O(m);
				var x = F(m, 2);
				Zr(x, 21, () => z(d), (e) => e.id, (e, n) => {
					var r = Sa();
					let i;
					var a = M(r);
					G(a, () => t.vb.mentions?.(da(z(n).title)) ?? da(z(n).title), !0), O(a);
					var o = F(a, 2), s = (e) => {
						var r = ya(), i = M(r);
						G(i, () => t.vb.icon("alert", 12));
						var a = F(i);
						O(r), I((e, t) => {
							q(r, "title", e), U(a, ` ${t ?? ""}`);
						}, [() => `@vibe: ${z(n).flags.join(" · ")}`, () => z(n).flags.join(" · ")]), H(e, r);
					};
					W(o, (e) => {
						z(n).flags?.length && e(s);
					});
					var c = F(o, 2), l = M(c);
					let u;
					var d = P(l, !0), f = F(l), p = (e) => {
						var r = ba(), i = N(r);
						G(i, () => t.vb.avatar(z(n).owner));
						var a = P(F(i), !0);
						I((e) => U(a, e), [() => z(n).owner === t.room.me ? t.vb.t("você") : t.vb.name(z(n).owner)]), H(e, r);
					};
					W(f, (e) => {
						z(n).owner && e(p);
					});
					var m = F(f), h = (e) => {
						var r = xa(), i = M(r);
						G(i, () => t.vb.icon("calendar", 12));
						var a = F(i);
						O(r), I(() => U(a, ` ${z(n).due ?? ""}`)), H(e, r);
					};
					W(m, (e) => {
						z(n).due && e(h);
					}), O(c), O(r), I((e, a) => {
						i = K(r, 1, "kcard", null, i, {
							done: z(n).status === "done",
							mine: z(n).status !== "done" && z(n).owner === t.room.me
						}), q(r, "data-k", z(n).id), q(r, "data-status", z(n).status), q(r, "data-epic", z(n).epic.id), q(r, "title", e), u = di(l, "", u, { background: a }), U(d, z(n).epic.title);
					}, [() => t.vb.t("Arraste, ou use ← →. Clique pra abrir o épico."), () => t.vb.color(z(n).epic.title)]), wr("dragstart", r, (e) => v(e, z(n).id)), wr("dragend", r, (e) => e.currentTarget.classList.remove("dragging")), B("click", r, () => t.onopen?.(z(n).epic.id)), B("keydown", r, (e) => b(e, z(n))), H(e, r);
				}, (e) => {
					var n = Ca(), r = P(n, !0);
					I((e) => U(r, e), [() => t.vb.t(i() === "todo" ? "Nada a fazer." : "Arraste um card pra cá.")]), H(e, n);
				}), O(x);
				var S = F(x, 2), C = (e) => {
					var n = Da(), r = M(n);
					Ci(r);
					var i = F(r);
					G(i, () => t.vb.icon("plus"), !0), O(i);
					var s = F(i), l = (e) => {
						var t = wa();
						Ci(t), I(() => wi(t, z(c))), H(e, t);
					}, u = (e) => {
						var n = Ea();
						Zr(n, 21, () => t.room.epics, qr, (e, t) => {
							var n = Ta(), r = P(n, !0), i = {};
							I(() => {
								U(r, z(t).title), i !== (i = z(t).id) && (n.value = (n.__value = i) ?? "");
							}), H(e, n);
						}), O(n), hi(n), I((e) => q(n, "aria-label", e), [() => t.vb.t("Épico")]), gi(n, () => z(o), (e) => j(o, e)), H(e, n);
					};
					W(s, (e) => {
						z(c) ? e(l) : e(u, -1);
					}), O(n), I((e, t, n) => {
						q(r, "placeholder", e), q(r, "aria-label", t), q(i, "aria-label", n);
					}, [
						() => t.vb.t("nova tarefa"),
						() => t.vb.t("Nova tarefa"),
						() => t.vb.t("Nova tarefa")
					]), wr("submit", n, (e) => {
						e.preventDefault();
						let n = z(c) || z(o) || t.room.epics[0]?.id;
						z(a).trim() && n && t.send({
							t: "task.add",
							epic: n,
							title: z(a).trim()
						}), j(a, "");
					}), ki(r, () => z(a), (e) => j(a, e)), H(e, n);
				};
				W(S, (e) => {
					i() === "todo" && e(C);
				}), O(f), I((e, t) => {
					p = K(f, 1, "lane", null, p, { over: z(s) === i() }), q(f, "data-lane", i()), q(f, "aria-label", e), U(h, t), U(g, z(d).length);
				}, [() => t.vb.t(l()), () => t.vb.t(l())]), wr("dragover", f, (e) => {
					e.preventDefault(), j(s, i(), !0);
				}), wr("dragleave", f, () => j(s, null)), wr("drop", f, (e) => y(e, i())), H(e, f);
			}), O(n), H(e, n);
		};
		W(ne, (e) => {
			z(i) === "list" ? e(re) : e(ie, -1);
		}), I((e, t, n) => {
			x = K(h, 1, "", null, x, { on: z(i) === "board" }), U(C, ` ${e ?? ""}`), T = K(w, 1, "", null, T, { on: z(i) === "list" }), U(ee, t), U(te, n);
		}, [
			() => t.vb.t("Quadro"),
			() => t.vb.t("Lista"),
			() => z(c) ? t.room.epics.find((e) => e.id === z(c))?.title : t.vb.t("Todos os épicos")
		]), B("click", h, () => g("board")), B("click", w, () => g("list")), H(e, l);
	}, w = (e) => {
		var n = _a(), r = P(n, !0);
		I((e) => U(r, e), [() => t.vb.t("Ainda não tem épico nem tarefa. Crie um épico na barra ao lado, ou peça pro seu agent organizar o projeto em épicos e tarefas.")]), H(e, n);
	};
	W(S, (e) => {
		t.room.epics.length ? e(C) : e(w, -1);
	}), H(e, x), Ye();
}
Tr(["click", "keydown"]);
// svelte/Files.svelte
var Ma = /* @__PURE__ */ V("<button type=\"button\"> <small> </small></button>"), Na = /* @__PURE__ */ V("<div class=\"ftabs\"></div>"), Pa = /* @__PURE__ */ V("<div class=\"fcrumb\"><button type=\"button\" class=\"ghost\"> </button><b><!> </b></div>"), Fa = /* @__PURE__ */ V("<button type=\"button\" class=\"ftile fdir\"><div class=\"thumb\"></div> <b> </b><small> </small></button>"), Ia = /* @__PURE__ */ V("<img loading=\"lazy\"/>"), La = /* @__PURE__ */ V("<a class=\"ftile\" target=\"_blank\" rel=\"noopener\"><div class=\"thumb\"><!></div> <b> </b><small> </small> <button type=\"button\" data-pin-kind=\"file\"></button></a>"), Ra = /* @__PURE__ */ V("<div class=\"empty\"> </div>"), za = /* @__PURE__ */ V("<!> <!> <div class=\"fgrid\"><!> <!></div> <!>", 1);
function Ba(e, t) {
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
	], r = /* @__PURE__ */ Kt("all"), i = /* @__PURE__ */ Kt(""), a = /* @__PURE__ */ k(() => t.room.files || []), o = /* @__PURE__ */ k(() => {
		let e = { all: z(a).length };
		for (let t of z(a)) {
			let n = fa(t);
			e[n] = (e[n] || 0) + 1;
		}
		return e;
	}), s = /* @__PURE__ */ k(() => z(o)[z(r)] ? z(r) : "all"), c = /* @__PURE__ */ k(() => z(a).filter((e) => z(s) === "all" || fa(e) === z(s))), l = (e) => e.name.includes("/") ? e.name.slice(0, e.name.lastIndexOf("/")) : "", u = /* @__PURE__ */ k(() => z(i) && z(c).some((e) => l(e) === z(i) || l(e).startsWith(z(i) + "/")) ? z(i) : ""), d = /* @__PURE__ */ k(() => z(u) ? z(u) + "/" : "");
	Cn(() => {
		z(o)[z(r)] || j(r, "all"), z(i) && z(u) !== z(i) && j(i, "");
	});
	function f(e, t) {
		j(i, t, !0);
		let n = e.currentTarget.closest("#filesPane");
		n && (n.scrollTop = 0);
	}
	let p = /* @__PURE__ */ k(() => {
		let e = /* @__PURE__ */ new Map(), t = [];
		for (let n of z(c)) {
			let r = l(n);
			if (r === z(u)) t.push(n);
			else if (r.startsWith(z(d))) {
				let t = r.slice(z(d).length).split("/")[0];
				e.set(t, (e.get(t) || 0) + 1);
			}
		}
		let n = {};
		if (z(u)) for (let e of t) n[e.name] = (n[e.name] || 0) + 1;
		return {
			dirs: [...e].sort((e, t) => e[0].localeCompare(t[0])),
			list: z(u) ? t.filter((e, n) => t.findIndex((t) => t.name === e.name) === n) : t,
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
	var v = Pr(), y = N(v), b = (e) => {
		var i = za(), a = N(i), c = (e) => {
			var i = Na();
			Zr(i, 21, () => n.filter(([e]) => z(o)[e]), qr, (e, n) => {
				var i = /* @__PURE__ */ k(() => _(z(n), 2));
				let a = () => z(i)[0], c = () => z(i)[1];
				var l = Ma();
				let u;
				var d = M(l), f = P(F(d), !0);
				O(l), I((e) => {
					u = K(l, 1, "ftab", null, u, { on: a() === z(s) }), q(l, "data-fkind", a()), U(d, `${e ?? ""} `), U(f, z(o)[a()]);
				}, [() => t.vb.t(c())]), B("click", l, () => j(r, a(), !0)), H(e, l);
			}), O(i), H(e, i);
		};
		W(a, (e) => {
			z(o).all > 1 && e(c);
		});
		var l = F(a, 2), v = (e) => {
			var n = Pa(), r = M(n), i = P(r), a = F(r), o = M(a);
			G(o, () => t.vb.icon("folder", 14));
			var s = F(o);
			O(a), O(n), I((e, t) => {
				q(r, "data-fdir", e), U(i, `← ${t ?? ""}`), U(s, ` ${z(u) ?? ""}/`);
			}, [() => z(u).includes("/") ? z(u).slice(0, z(u).lastIndexOf("/")) : "", () => t.vb.t("voltar")]), B("click", r, (e) => f(e, z(u).includes("/") ? z(u).slice(0, z(u).lastIndexOf("/")) : "")), H(e, n);
		};
		W(l, (e) => {
			z(u) && e(v);
		});
		var y = F(l, 2), b = M(y);
		Zr(b, 17, () => z(p).dirs, qr, (e, n) => {
			var r = /* @__PURE__ */ k(() => _(z(n), 2));
			let i = () => z(r)[0], a = () => z(r)[1];
			var o = Fa(), s = M(o);
			G(s, () => t.vb.icon("folder", 34), !0), O(s);
			var c = F(s, 2), l = P(c), u = P(F(c), !0);
			O(o), I((e) => {
				q(o, "data-fdir", z(d) + i()), U(l, `${i() ?? ""}/`), U(u, e);
			}, [() => a() === 1 ? t.vb.t("1 arquivo") : t.vb.t("{n} arquivos", { n: a() })]), B("click", o, (e) => f(e, z(d) + i())), H(e, o);
		}), Zr(F(b, 2), 17, () => z(p).list, (e) => e.id, (e, n) => {
			var r = La(), i = M(r), a = M(i), o = (e) => {
				var t = Ia();
				I((e) => {
					q(t, "src", e), q(t, "alt", z(n).name);
				}, [() => m(z(n))]), H(e, t);
			}, s = /* @__PURE__ */ k(() => z(n).type.startsWith("image/")), c = (e) => {
				var r = Pr();
				G(N(r), () => t.vb.icon(z(n).type === "text/html" ? "globe" : z(n).type.startsWith("audio/") ? "mic" : "file", 30)), H(e, r);
			};
			W(a, (e) => {
				z(s) ? e(o) : e(c, -1);
			}), O(i);
			var l = F(i, 2), u = P(l, !0), f = F(l), _ = P(f), v = F(f, 2);
			let y;
			G(v, () => t.vb.icon("pin", 14), !0), O(v), O(r), I((e, t, i, a, o, s, c, l, d, f) => {
				q(r, "href", e), q(r, "title", z(n).name), q(r, "data-view", t), q(r, "data-name", z(n).name), U(u, i), U(_, `${a ?? ""} · ${o ?? ""} · ${s ?? ""}`), y = K(v, 1, "ghost pinBtn", null, y, { on: c }), q(v, "data-pin-ref", z(n).id), q(v, "title", l), q(v, "aria-label", d), q(v, "aria-pressed", f);
			}, [
				() => m(z(n)),
				() => z(n).type.startsWith("image/") ? "img" : "frame",
				() => z(n).name.slice(z(d).length),
				() => t.vb.name(z(n).author),
				() => t.vb.ago(z(n).ts),
				() => z(p).versions[z(n).name] > 1 ? t.vb.t("{n} versões", { n: z(p).versions[z(n).name] }) : pa(z(n).size),
				() => !!h(z(n)),
				() => t.vb.t(h(z(n)) ? "Desafixar" : "Fixar na lateral"),
				() => t.vb.t(h(z(n)) ? "Desafixar" : "Fixar na lateral"),
				() => !!h(z(n))
			]), B("click", v, (e) => g(e, z(n))), H(e, r);
		}), O(y);
		var x = F(y, 2), S = (e) => {
			var n = Ra(), r = P(n, !0);
			I((e) => U(r, e), [() => t.vb.t("Nada aqui.")]), H(e, n);
		};
		W(x, (e) => {
			!z(p).list.length && !z(p).dirs.length && e(S);
		}), H(e, i);
	}, x = (e) => {
		var n = Ra(), r = P(n, !0);
		I((e) => U(r, e), [() => t.vb.t("Cole uma imagem no chat (Cmd+V), arraste um arquivo ou use o clipe. Tudo que for enviado neste vibebook fica aqui.")]), H(e, n);
	};
	W(y, (e) => {
		z(a).length ? e(b) : e(x, -1);
	}), H(e, v), Ye();
}
Tr(["click"]);
// node_modules/zod/v4/core/util.js
function Va(e, t) {
	return typeof t == "bigint" ? t.toString() : t;
}
var Ha = class {
	constructor(e) {
		this._getter = e, this._value = void 0;
	}
	get value() {
		let e = this._getter;
		return e !== void 0 && (this._value = e(), this._getter = void 0), this._value;
	}
};
function Ua(e) {
	return new Ha(e);
}
function Wa(e) {
	return e == null;
}
function Ga(e) {
	let t = +!!e.startsWith("^"), n = e.endsWith("$") ? e.length - 1 : e.length;
	return e.slice(t, n);
}
function Ka(e, t, n) {
	Object.defineProperty(e, t, {
		value: n,
		writable: !0,
		enumerable: !0,
		configurable: !0
	});
}
function qa(e) {
	let t = Object.getOwnPropertyDescriptor(e, "shape");
	return t?.get ? t.get.raw : t?.value;
}
function Ja(e) {
	return qa(e._zod.def) ?? e._zod.def.shape;
}
function Ya(e, t, n) {
	Object.defineProperty(e, t, {
		get() {
			let e = n();
			return Ka(this, t, e), e;
		},
		enumerable: !0,
		configurable: !0
	});
}
function Xa(e, t, n) {
	t in e ? Ka(e, t, n) : e[t] = n;
}
function Za(e, t, n, r) {
	let i = Ja(t);
	for (let a of n) {
		let n = Object.getOwnPropertyDescriptor(i, a);
		n.enumerable && (n.get ? Ya(e, a, () => {
			let e = t._zod.def.shape[a];
			return r ? r(e, a) : e;
		}) : Xa(e, a, r ? r(n.value, a) : n.value));
	}
}
function Qa(e, t) {
	for (let n of Reflect.ownKeys(t)) {
		let r = Object.getOwnPropertyDescriptor(t, n);
		r.enumerable && (r.get ? Ya(e, n, () => t[n]) : Xa(e, n, r.value));
	}
}
function $a(...e) {
	let t = {};
	for (let n of e) {
		let e = Object.getOwnPropertyDescriptors(n);
		Object.assign(t, e);
	}
	return Object.defineProperties({}, t);
}
var eo = "captureStackTrace" in Error ? Error.captureStackTrace : (...e) => {};
function to(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function no(e) {
	if (to(e) === !1) return !1;
	let t = e.constructor;
	if (t === void 0 || typeof t != "function") return !0;
	let n = t.prototype;
	return to(n) !== !1 && Object.prototype.hasOwnProperty.call(n, "isPrototypeOf") !== !1;
}
function ro(e) {
	return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function io(e, t, n) {
	let r = new e._zod.constr(t ?? e._zod.def);
	return (!t || n?.parent) && (r._zod.parent = e), r;
}
function ao(e) {
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
function oo(e) {
	return Object.keys(e).filter((t) => e[t]._zod.optin !== void 0 && e[t]._zod.optout === "optional");
}
function so(e, t) {
	if (!no(t)) throw Error("Invalid input to extend: expected a plain object");
	let n = e._zod.def.checks;
	if (n && n.length > 0) {
		let n = Ja(e);
		for (let e of Reflect.ownKeys(t)) if (Object.getOwnPropertyDescriptor(n, e) !== void 0) throw Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
	}
	return io(e, $a(e._zod.def, { shape: co(e, t) }));
}
function co(e, t) {
	let n = {};
	return Za(n, e, Reflect.ownKeys(Ja(e))), Qa(n, t), n;
}
function lo(e, t = 0) {
	if (e.aborted === !0) return !0;
	for (let n = t; n < e.issues.length; n++) if (e.issues[n]?.continue !== !0) return !0;
	return !1;
}
function uo(e, t = 0) {
	if (e.aborted === !0) return !0;
	for (let n = t; n < e.issues.length; n++) if (e.issues[n]?.continue === !1) return !0;
	return !1;
}
function fo(e, t) {
	return t.map((t) => {
		var n;
		return (n = t).path ?? (n.path = []), t.path.unshift(e), t;
	});
}
function po(e) {
	return typeof e == "string" ? e : e?.message;
}
function mo(e, t, n) {
	var r;
	for (let i = t; i < e.length; i++) (r = e[i]).schema ?? (r.schema = n);
}
function ho(e, t, n) {
	var r;
	let i = e.inst?._zod?.traits;
	i?.has("$ZodType") && (i.has("$ZodCheck") ? (r = e).schema ?? (r.schema = e.inst) : e.schema = e.inst);
	let a = e.schema === e.inst ? void 0 : e.schema?._zod.def?.error, o = e.message ? e.message : po(e.inst?._zod.def?.error?.(e)) ?? po(a?.(e)) ?? po(t?.error?.(e)) ?? po(n.customError?.(e)) ?? po(n.localeError?.(e)) ?? "Invalid input", s = {};
	for (let t of Object.keys(e)) t !== "inst" && t !== "schema" && t !== "continue" && t !== "input" && t !== "__proto__" && (s[t] = e[t]);
	return s.path ??= [], s.message = o, t?.reportInput && (s.input = e.input), s;
}
var go = /[\uD800-\uDBFF]/;
function _o(e) {
	let t = e.length;
	if (!go.test(e)) return t;
	let n = t;
	for (let r = 0; r < t - 1; r++) (e.charCodeAt(r) & 64512) == 55296 && (e.charCodeAt(r + 1) & 64512) == 56320 && (n--, r++);
	return n;
}
function vo(e) {
	return Array.isArray(e) ? "array" : typeof e == "string" ? "string" : "unknown";
}
function yo(e, t) {
	for (let n in t) {
		let r = Object.getOwnPropertyDescriptor(t, n);
		r.get ? Object.defineProperty(e, n, {
			...r,
			enumerable: !1
		}) : So(e, n, r.value);
	}
}
function bo(e, t, n, r = !0) {
	return Object.defineProperty(e, t, {
		configurable: !0,
		writable: !0,
		enumerable: r,
		value: n
	}), n;
}
function xo(e, t, n) {
	return bo(e, t, n, !1);
}
function So(e, t, n) {
	Object.defineProperty(e, t, {
		configurable: !0,
		get() {
			return this == null ? n : bo(this, t, n.bind(this));
		},
		set(e) {
			bo(this, t, e);
		}
	});
}
function Co(e, t) {
	let n = Object.getPrototypeOf(e);
	return t in n ? void 0 : n;
}
var wo, To = !1, Eo = {
	configurable: !0,
	get() {
		To = !0;
	}
};
function Do(e, t, n) {
	let r = Object.getPrototypeOf(e._zod);
	t in r && wo !== e._zod ? wo = void 0 : (wo = e._zod, Object.defineProperty(r, t, {
		configurable: !0,
		get() {
			Object.defineProperty(this, t, Eo);
			let e = To;
			To = !1;
			try {
				let r = n(this);
				return To ? delete this[t] : Object.defineProperty(this, t, {
					configurable: !0,
					writable: !0,
					value: r
				}), To ||= e, r;
			} catch (n) {
				throw delete this[t], To ||= e, n;
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
function Oo(e, t, n, r) {
	let i = Co(e, t);
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
var ko, Ao = {
	value: void 0,
	enumerable: !1
}, jo = "captureStackTrace" in Error ? Error : null;
function Mo(e) {
	let t = jo;
	if (t) {
		let n = t.stackTraceLimit;
		if (typeof n == "number") {
			try {
				t.stackTraceLimit = 0;
			} catch {
				return jo = null, new e();
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
function J(e, t, n, r) {
	let i = {};
	function a(e) {
		this.def = e, this.constr = d, this.traits = /* @__PURE__ */ new Set();
	}
	a.prototype = i;
	let o = n, s = o && /* @__PURE__ */ new WeakSet();
	function c(n, r) {
		if (!n._zod) {
			Ao.value = new a(r);
			try {
				Object.defineProperty(n, "_zod", Ao);
			} finally {
				Ao.value = void 0;
			}
		} else if (n._zod.traits.has(e)) return;
		if (n._zod.traits.add(e), t(n, r), s) {
			let e = Object.getPrototypeOf(n), t = n._zod.constr.prototype, r = e;
			for (; r && r !== t;) r = Object.getPrototypeOf(r);
			let i = r ?? e;
			s.has(i) || (s.add(i), yo(i, o));
		}
		let i = d.prototype;
		for (let e in i) Object.prototype.hasOwnProperty.call(i, e) && (e in n || (n[e] = i[e].bind(n)));
	}
	let l = r?.Parent ?? Object;
	class u extends l {}
	Object.defineProperty(u, "name", { value: e });
	function d(e) {
		let t = r?.Parent ? Mo(u) : this;
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
var No = class extends Error {
	constructor() {
		super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
	}
};
(ko = globalThis).__zod_globalConfig ?? (ko.__zod_globalConfig = {});
var Po = globalThis.__zod_globalConfig;
function Fo(e) {
	return e && Object.assign(Po, e), Po;
}
// node_modules/zod/v4/core/errors.js
function Io() {
	let e = this._zod;
	return e.message ??= JSON.stringify(e.def, Va, 2), e.message;
}
function Lo(e) {
	this._zod.message = e;
}
var Ro = {
	get: Io,
	set: Lo,
	enumerable: !0,
	configurable: !0
}, zo = {
	value: void 0,
	enumerable: !1
}, Bo = /* @__PURE__ */ new WeakSet([Object.prototype, Error.prototype]), Vo = /* @__PURE__ */ J("$ZodError", (e, t) => {
	e.name = "$ZodError", zo.value = t, Object.defineProperty(e, "issues", zo), zo.value = void 0, Object.defineProperty(e, "message", Ro);
	let n = Object.getPrototypeOf(e);
	Bo.has(n) || (Bo.add(n), Object.defineProperty(n, "toString", {
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
}, void 0, { Parent: Error }), Ho = /* @__PURE__*/ ((e) => {
	let t = (n, r, i, a) => {
		let o = i ? {
			...i,
			async: !1
		} : { async: !1 }, s = n._zod.run({
			value: r,
			issues: []
		}, o);
		if (s instanceof Promise) throw new No();
		if (s.issues.length) {
			let n = new ((a?.Err) ?? e)(s.issues.map((e) => ho(e, o, Fo())));
			throw eo(n, a?.callee ?? t), n;
		}
		return s.value;
	};
	return t;
})(Vo), Uo = /* @__PURE__*/ ((e) => {
	let t = async (n, r, i, a) => {
		let o = i ? {
			...i,
			async: !0
		} : { async: !0 }, s = n._zod.run({
			value: r,
			issues: []
		}, o);
		if (s instanceof Promise && (s = await s), s.issues.length) {
			let n = new ((a?.Err) ?? e)(s.issues.map((e) => ho(e, o, Fo())));
			throw eo(n, a?.callee ?? t), n;
		}
		return s.value;
	};
	return t;
})(Vo), Wo = /* @__PURE__*/ ((e) => (t, n, r) => {
	let i = r ? {
		...r,
		async: !1
	} : { async: !1 }, a = t._zod.run({
		value: n,
		issues: []
	}, i);
	if (a instanceof Promise) throw new No();
	return a.issues.length ? Go(e, a.issues, i) : {
		success: !0,
		data: a.value
	};
})(Vo);
function Go(e, t, n) {
	let r;
	return {
		success: !1,
		get error() {
			return r || (r = new e(t.map((e) => ho(e, n, Fo()))), t = void 0, n = void 0), r;
		},
		set error(e) {
			r = e, t = void 0, n = void 0;
		}
	};
}
var Ko = /* @__PURE__*/ ((e) => async (t, n, r) => {
	let i = r ? {
		...r,
		async: !0
	} : { async: !0 }, a = t._zod.run({
		value: n,
		issues: []
	}, i);
	return a instanceof Promise && (a = await a), a.issues.length ? Go(e, a.issues, i) : {
		success: !0,
		data: a.value
	};
})(Vo), qo = /^[\s\S]{0,}$/, Jo = /^-?\d+(?:\.\d+)?$/, Yo = /^(?:true|false)$/i, Xo = /*@__PURE__*/ J("$ZodCheck", (e, t) => {
	var n;
	e._zod ??= {}, e._zod.def = t, (n = e._zod).onattach ?? (n.onattach = []);
}), Zo = (e) => {
	let t = e.value;
	return !Wa(t) && t.length !== void 0;
}, Qo = /*@__PURE__*/ J("$ZodCheckMaxLength", (e, t) => {
	var n;
	Xo.init(e, t), (n = e._zod.def).when ?? (n.when = Zo), e._zod.check = (n) => {
		let r = n.value, i = r.length;
		if ((typeof r == "string" && i > t.maximum ? _o(r) : i) <= t.maximum) return;
		let a = vo(r);
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
}), $o = /*@__PURE__*/ J("$ZodCheckMinLength", (e, t) => {
	var n;
	Xo.init(e, t), (n = e._zod.def).when ?? (n.when = Zo), e._zod.check = (n) => {
		let r = n.value, i = r.length;
		if ((typeof r == "string" && i >= t.minimum && i < t.minimum * 2 ? _o(r) : i) >= t.minimum) return;
		let a = vo(r);
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
}), es = /*@__PURE__*/ J("$ZodCheckStartsWith", (e, t) => {
	Xo.init(e, t);
	let n = RegExp(`^${ro(t.prefix)}.*`);
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
}), ts = {
	major: 4,
	minor: 6,
	patch: 7
}, ns = /*@__PURE__*/ J("$ZodType", (e, t) => {
	var n;
	e ??= {}, e._zod.def = t, e._zod.bag = e._zod.bag || {}, e._zod.version = ts;
	let r = e._zod.def.checks, i = e._zod.traits.has("$ZodCheck") ? [e, ...r ?? []] : r?.length ? [...r] : [];
	for (let t of i) for (let n of t._zod.onattach) n(e);
	if (i.length === 0) (n = e._zod).deferred ?? (n.deferred = []), e._zod.deferred?.push(() => {
		e._zod.run = e._zod.parse;
	});
	else {
		let t = (t, n, r) => {
			if (t.memo) return t;
			let i = lo(t), a;
			for (let o of n) {
				if (o._zod.def.when) {
					if (uo(t) || !o._zod.def.when(t)) continue;
				} else if (i) continue;
				let n = t.issues.length, s = o._zod.check(t);
				if (s instanceof Promise && r?.async === !1) throw new No();
				if (a || s instanceof Promise) a = (a ?? Promise.resolve()).then(async () => {
					await s, t.issues.length !== n && (mo(t.issues, n, e), i ||= lo(t, n));
				});
				else {
					if (t.issues.length === n) continue;
					mo(t.issues, n, e), i ||= lo(t, n);
				}
			}
			return a ? a.then(() => t) : t;
		}, n = (n, r, a) => {
			if (lo(n)) return n.aborted = !0, n;
			let o = t(r, i, a);
			if (o instanceof Promise) {
				if (a.async === !1) throw new No();
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
				if (a.async === !1) throw new No();
				return o.then((e) => t(e, i, a));
			}
			return t(o, i, a);
		};
	}
}, {
	get "~standard"() {
		return xo(this, "~standard", as(this));
	},
	set "~standard"(e) {
		bo(this, "~standard", e);
	}
}), rs = (e, t) => e.issues.length ? { issues: e.issues.map((e) => ho(e, t, Fo())) } : { value: e.value };
async function is(e, t) {
	let n = { async: !0 };
	return rs(await e._zod.run({
		value: t,
		issues: []
	}, n), n);
}
function as(e) {
	return {
		validate: (t) => {
			let n = { async: !1 };
			try {
				let r = e._zod.run({
					value: t,
					issues: []
				}, n);
				if (!(r instanceof Promise)) return rs(r, n);
			} catch {}
			return is(e, t);
		},
		vendor: "zod",
		version: 1
	};
}
var os = /*@__PURE__*/ J("$ZodString", (e, t) => {
	ns.init(e, t), e._zod.pattern = t.pattern ?? qo, e._zod.parse = (n, r) => {
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
}), ss = /*@__PURE__*/ J("$ZodNumber", (e, t) => {
	ns.init(e, t), e._zod.pattern = Jo, e._zod.parse = (n, r) => {
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
}), cs = /*@__PURE__*/ J("$ZodBoolean", (e, t) => {
	ns.init(e, t), e._zod.pattern = Yo, e._zod.parse = (n, r) => {
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
function ls(e, t, n, r, i, a) {
	let o = n in r, s = a === "optional";
	if (o || !s || i !== "optional") {
		if (e.issues.length) {
			if (i !== void 0 && s && !o) return;
			t.issues.push(...fo(n, e.issues));
		}
		!o && i === void 0 ? e.issues.length || t.issues.push({
			code: "invalid_type",
			expected: "nonoptional",
			input: void 0,
			path: [n]
		}) : e.value === void 0 ? (o || i === "defaulted" && !s) && (t.value[n] = void 0) : t.value[n] = e.value;
	}
}
var us = [];
function ds(e) {
	let t = Object.keys(e.shape), n = Object.getOwnPropertySymbols(e.shape), r = n.length ? n : us, i = r.length ? [...t, ...r] : t;
	for (let t of i) if (!e.shape?.[t]?._zod?.traits?.has("$ZodType")) throw Error(`Invalid element at key "${String(t)}": expected a Zod schema`);
	let a = oo(e.shape);
	return {
		...e,
		allKeys: i,
		symbolKeys: r,
		keySet: new Set(t),
		numKeys: t.length,
		optionalKeys: new Set(a)
	};
}
function fs(e, t, n, r, i, a, o) {
	let s = [], c = i.keySet, l = i.catchall._zod, u = l.def.type, d = l.optin, f = l.optout, p = 0;
	for (let i in t) {
		if (o && n.issues.length !== p) {
			if (lo(n, p)) break;
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
		a instanceof Promise ? e.push(a.then((e) => ls(e, n, i, t, d, f))) : ls(a, n, i, t, d, f);
	}
	return s.length && n.issues.push({
		code: "unrecognized_keys",
		keys: s,
		input: t,
		inst: a,
		continue: !0
	}), e.length ? Promise.all(e).then(() => n) : n;
}
var ps = /*@__PURE__*/ J("$ZodObject", (e, t) => {
	ns.init(e, t);
	let n = Object.getOwnPropertyDescriptor(t, "shape"), r = n?.get ? n.get.raw : t.shape ?? {};
	if (r) {
		let e = () => {
			let n = { ...r };
			return Object.defineProperty(t, "shape", { value: n }), e.raw = n, n;
		};
		e.raw = r, Object.defineProperty(t, "shape", { get: e });
	}
	let i = Ua(() => ds(t));
	Do(e, "propValues", (e) => {
		let t = e.def.shape, n = {};
		for (let e in t) {
			let r = t[e]._zod;
			if (r.values) {
				Object.prototype.hasOwnProperty.call(n, e) || Ka(n, e, /* @__PURE__ */ new Set());
				for (let t of r.values) n[e].add(t);
				r.optin !== void 0 && n[e].add(void 0);
			}
		}
		return n;
	});
	let a = to, o = t.catchall, s, c = Po.memoizer;
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
				if (lo(t, f)) break;
				f = t.issues.length;
			}
			if (e === "__proto__") continue;
			let i = u[e], a = i._zod.optin, o = i._zod.optout, s = i._zod.run({
				value: r[e],
				issues: []
			}, n);
			s instanceof Promise ? l.push(s.then((n) => ls(n, t, e, r, a, o))) : ls(s, t, e, r, a, o);
		}
		return o ? fs(l, r, t, n, i.value, e, d === !0) : l.length ? Promise.all(l).then(() => t) : t;
	};
});
function ms(e, t, n, r) {
	for (let n of e) if (n.issues.length === 0) return t.value = n.value, t;
	let i = e.filter((e) => !lo(e));
	return i.length === 1 ? (t.value = i[0].value, i[0]) : (t.issues.push({
		code: "invalid_union",
		input: t.value,
		inst: n,
		errors: e.map((e) => e.issues.map((e) => ho(e, r, Fo())))
	}), t);
}
var hs = /*@__PURE__*/ J("$ZodUnion", (e, t) => {
	ns.init(e, t), Do(e, "optin", (e) => e.def.options.some((e) => e._zod.optin === "defaulted") ? "defaulted" : e.def.options.some((e) => e._zod.optin !== void 0) ? "optional" : void 0), Do(e, "optout", (e) => e.def.options.some((e) => e._zod.optout === "optional") ? "optional" : void 0), Do(e, "values", (e) => {
		if (e.def.options.every((e) => e._zod.values)) return new Set(e.def.options.flatMap((e) => Array.from(e._zod.values)));
	}), Do(e, "pattern", (e) => {
		if (e.def.options.every((e) => e._zod.pattern)) {
			let t = e.def.options.map((e) => e._zod.pattern);
			return RegExp(`^(${t.map((e) => Ga(e.source)).join("|")})$`);
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
		return a ? Promise.all(o).then((t) => ms(t, r, e, i)) : ms(o, r, e, i);
	};
}), gs = /*@__PURE__*/ J("$ZodLiteral", (e, t) => {
	ns.init(e, t);
	let n = new Set(t.values);
	e._zod.values = n, Do(e, "pattern", (e) => {
		let t = e.def.values;
		return RegExp(t.length ? `^(${t.map((e) => typeof e == "string" ? ro(e) : e ? ro(e.toString()) : String(e)).join("|")})$` : "^[^\\s\\S]$");
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
function _s(e, t) {
	return e.value = t.issues.length ? void 0 : t.value, e;
}
var vs = /*@__PURE__*/ J("$ZodOptional", (e, t) => {
	ns.init(e, t), Do(e, "optin", (e) => e.def.innerType._zod.optin === "defaulted" ? "defaulted" : "optional"), e._zod.optout = "optional", Do(e, "values", (e) => {
		let t = e.def.innerType._zod.values;
		return t ? /* @__PURE__ */ new Set([...t, void 0]) : void 0;
	}), Do(e, "pattern", (e) => {
		let t = e.def.innerType._zod.pattern;
		return t ? RegExp(`^(${Ga(t.source)})?$`) : void 0;
	}), e._zod.parse = (e, n) => {
		if (e.value === void 0) {
			if (t.innerType._zod.optin !== "defaulted") return e;
			let r = t.innerType._zod.run({
				value: e.value,
				issues: []
			}, n);
			return r instanceof Promise ? r.then((t) => _s(e, t)) : _s(e, r);
		}
		return t.innerType._zod.run(e, n);
	};
}), ys = /*@__PURE__*/ J("$ZodNullable", (e, t) => {
	ns.init(e, t), Do(e, "optin", (e) => e.def.innerType._zod.optin), Do(e, "optout", (e) => e.def.innerType._zod.optout), Do(e, "pattern", (e) => {
		let t = e.def.innerType._zod.pattern;
		return t ? RegExp(`^(${Ga(t.source)}|null)$`) : void 0;
	}), Do(e, "values", (e) => e.def.innerType._zod.values ? /* @__PURE__ */ new Set([...e.def.innerType._zod.values, null]) : void 0), e._zod.parse = (e, n) => e.value === null ? e : t.innerType._zod.run(e, n);
});
// node_modules/zod/v4/core/api.js
function bs(e) {
	return e.checks &&= [...e.checks], e;
}
// @__NO_SIDE_EFFECTS__
function xs(e, t) {
	return new e(bs({
		type: "string",
		...ao(t)
	}));
}
// @__NO_SIDE_EFFECTS__
function Ss(e, t) {
	return new e(bs({
		type: "number",
		checks: [],
		...ao(t)
	}));
}
// @__NO_SIDE_EFFECTS__
function Cs(e, t) {
	return new e({
		type: "boolean",
		...ao(t)
	});
}
// @__NO_SIDE_EFFECTS__
function ws(e, t) {
	return new Qo({
		check: "max_length",
		...ao(t),
		maximum: e
	});
}
// @__NO_SIDE_EFFECTS__
function Ts(e, t) {
	return new $o({
		check: "min_length",
		...ao(t),
		minimum: e
	});
}
// @__NO_SIDE_EFFECTS__
function Es(e, t) {
	return new es({
		check: "string_format",
		format: "starts_with",
		...ao(t),
		prefix: e
	});
}
// node_modules/zod/v4/mini/schemas.js
var Ds = /*@__PURE__*/ J("ZodMiniType", (e, t) => {
	if (!e._zod) throw Error("Uninitialized schema in ZodMiniType.");
	ns.init(e, t), e.def = t, e.type = t.type;
}, {
	get with() {
		return this.check;
	},
	set with(e) {
		bo(this, "with", e);
	},
	parse(e, t) {
		return Ho(this, e, t, { callee: this.parse });
	},
	parseAsync(e, t) {
		return Uo(this, e, t, { callee: this.parseAsync });
	},
	safeParse(e, t) {
		return Wo(this, e, t);
	},
	safeParseAsync(e, t) {
		return Ko(this, e, t);
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
		return io(this, e, t);
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
}), Os = /*@__PURE__*/ J("ZodMiniString", (e, t) => {
	os.init(e, t), Ds.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function ks(e) {
	return /* @__PURE__ */ xs(Os, e);
}
var As = /*@__PURE__*/ J("ZodMiniNumber", (e, t) => {
	ss.init(e, t), Ds.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function js(e) {
	return /* @__PURE__ */ Ss(As, e);
}
var Ms = /*@__PURE__*/ J("ZodMiniBoolean", (e, t) => {
	cs.init(e, t), Ds.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function Ns(e) {
	return /* @__PURE__ */ Cs(Ms, e);
}
var Ps = /*@__PURE__*/ J("ZodMiniObject", (e, t) => {
	ps.init(e, t), Ds.init(e, t), Oo(e, "shape", (e) => e._zod.def.shape, !1);
});
// @__NO_SIDE_EFFECTS__
function Fs(e, t) {
	return new Ps({
		type: "object",
		shape: e ?? {},
		...ao(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Is(e, t) {
	return so(e, t);
}
var Ls = /*@__PURE__*/ J("ZodMiniUnion", (e, t) => {
	hs.init(e, t), Ds.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function Rs(e, t) {
	return new Ls({
		type: "union",
		options: e,
		...ao(t)
	});
}
var zs = /*@__PURE__*/ J("ZodMiniLiteral", (e, t) => {
	gs.init(e, t), Ds.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function Bs(e, t) {
	return new zs({
		type: "literal",
		values: Array.isArray(e) ? e : [e],
		...ao(t)
	});
}
var Vs = /*@__PURE__*/ J("ZodMiniOptional", (e, t) => {
	vs.init(e, t), Ds.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function Hs(e) {
	return new Vs({
		type: "optional",
		innerType: e
	});
}
var Us = /*@__PURE__*/ J("ZodMiniNullable", (e, t) => {
	ys.init(e, t), Ds.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function Ws(e) {
	return new Us({
		type: "nullable",
		innerType: e
	});
}
var Gs = /* @__PURE__ */ Rs([/* @__PURE__ */ Fs({
	ok: /* @__PURE__ */ Bs(!0),
	id: /* @__PURE__ */ js(),
	thread: /* @__PURE__ */ ks()
}), /* @__PURE__ */ Fs({
	ok: /* @__PURE__ */ Bs(!1),
	error: /* @__PURE__ */ ks()
})]), Ks = /* @__PURE__ */ Fs({
	ok: /* @__PURE__ */ Ns(),
	name: /* @__PURE__ */ Hs(/* @__PURE__ */ ks()),
	error: /* @__PURE__ */ Hs(/* @__PURE__ */ ks()),
	every: /* @__PURE__ */ Hs(/* @__PURE__ */ Ws(/* @__PURE__ */ ks())),
	cron: /* @__PURE__ */ Hs(/* @__PURE__ */ Ws(/* @__PURE__ */ ks())),
	timezone: /* @__PURE__ */ Hs(/* @__PURE__ */ ks()),
	next_at: /* @__PURE__ */ Hs(/* @__PURE__ */ ks())
}), qs = /* @__PURE__ */ Fs({
	id: /* @__PURE__ */ ks(),
	name: /* @__PURE__ */ ks(),
	type: /* @__PURE__ */ ks(),
	size: /* @__PURE__ */ js(),
	author: /* @__PURE__ */ ks(),
	ts: /* @__PURE__ */ js(),
	embed: /* @__PURE__ */ Hs(/* @__PURE__ */ Ns())
}), Js = /* @__PURE__ */ Is(qs, { reminder: /* @__PURE__ */ Hs(Ks) }), Ys = /* @__PURE__ */ Fs({ error: /* @__PURE__ */ ks() });
(/* @__PURE__ */ ks()).check(/* @__PURE__ */ Es("https://"), /* @__PURE__ */ ws(1e3)), (/* @__PURE__ */ ks()).check(/* @__PURE__ */ Ts(1)), (/* @__PURE__ */ ks()).check(/* @__PURE__ */ Ts(1)), (/* @__PURE__ */ ks()).check(/* @__PURE__ */ Ts(1)), (/* @__PURE__ */ ks()).check(/* @__PURE__ */ Es("m"));
var Xs = [
	"todo",
	"doing",
	"review",
	"done"
], Zs = (e) => typeof e == "object" && !!e && !Array.isArray(e), Y = (e) => typeof e == "string", X = (e) => typeof e == "number" && Number.isFinite(e), Qs = (e) => typeof e == "boolean", Z = (e) => (t) => t === null || e(t), Q = (e) => (t) => Array.isArray(t) && t.every(e), $s = (e) => (t) => Zs(t) && Object.values(t).every(e), ec = Q(Y), tc = (...e) => (t) => typeof t == "string" && e.includes(t), nc = tc(...Xs), $ = (e, t = {}) => (n) => Zs(n) && Object.entries(e).every(([e, t]) => t(n[e])) && Object.entries(t).every(([e, t]) => n[e] === void 0 || t(n[e])), rc = (e) => $({
	id: Y,
	name: Y,
	type: Y,
	size: X,
	author: Y,
	ts: X
}, { embed: Qs })(e), ic = $({
	id: Y,
	title: Y,
	done: Qs,
	status: nc
}, {
	owner: Z(Y),
	due: Z(Y),
	flags: ec,
	epic_id: Y
}), ac = (e) => ic(e), oc = $({
	id: Y,
	title: Y,
	tasks: Q(ac)
}, {
	archived: Qs,
	kept: Qs,
	owner: Z(Y),
	from_msg: Z(X),
	parent: Z(Y),
	flags: ec,
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
}), sc = (e) => oc(e), cc = $({
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
	files: Q(rc),
	quiet: Qs,
	cut: Qs,
	for_who: Z(Y)
}), lc = (e) => cc(e), uc = $({
	msg_id: X,
	email: Y,
	who: Y,
	status: Y,
	ts: X
}, {
	agent: Y,
	note: Z(Y)
}), dc = (e) => uc(e), fc = $({
	id: Y,
	text: Y,
	owner: Y,
	enabled: Qs
}, {
	name: Z(Y),
	error: Z(Y),
	every: Z(Y),
	cron: Z(Y),
	next_at: Z(X),
	thread: Y,
	tz: Y,
	file_id: Z(Y)
}), pc = (e) => fc(e), mc = $({
	title: Y,
	owner: Y
}, {
	summary: Z(Y),
	folder: Z(Y)
}), hc = (e) => mc(e), gc = $({
	title: Y,
	tasks: ec
}, { why: Y }), _c = (e) => gc(e), vc = $({
	id: X,
	text: Y,
	who: Y,
	kind: Y,
	ts: X
}), yc = (e) => vc(e), bc = $({
	id: Y,
	kind: Y,
	ref: Y
}, {
	title: Y,
	author: Y,
	ts: X
}), xc = (e) => bc(e), Sc = $({
	id: Y,
	question: Y,
	options: ec,
	multi: Qs,
	closed: Qs,
	author: Y,
	votes: Q(ec)
}), Cc = (e) => Sc(e), wc = $({
	email: Y,
	ts: X
}, { name: Z(Y) }), Tc = $({
	email: Y,
	who: Y,
	read: X,
	delivered: X
}, {
	agent: Y,
	ts: X
}), Ec = $({ text: Y }, {
	epic: Z(Y),
	stale: (e) => e === !1,
	fetched: Qs,
	by: Y
}), Dc = $({
	epic: Y,
	stale: (e) => e === !0
}, { by: Y }), Oc = {
	state: $({
		me: Y,
		book: hc,
		messages: Q(lc),
		epics: Q(sc),
		members: ec,
		online: ec,
		suggestions: Q(_c)
	}, {
		roomTasks: Q(ac),
		names: $s(Y),
		avatars: $s(X),
		pending: ec,
		requests: Q(wc),
		files: Q(rc),
		filesN: X,
		filesAll: Qs,
		reminders: Q(pc),
		acks: Q(dc),
		receipts: Q(Tc),
		counts: $s(X),
		countsAt: X,
		full: ec,
		complete: Qs,
		origins: Q(lc),
		docs: $s(Y),
		doc: Y,
		docNotes: ec,
		decisions: Q(yc),
		pins: Q(xc),
		polls: $s(Cc)
	}),
	msg: $({ m: lc }),
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
	epics: $({ epics: Q(sc) }, { roomTasks: Q(ac) }),
	epicsPatch: $({
		changed: Q(sc),
		order: ec
	}, { roomTasks: Q(ac) }),
	doc: (e) => Zs(e) && (e.stale === !0 ? Dc(e) && e.text === void 0 && e.fetched === void 0 : Ec(e)),
	docNotes: $({ notes: ec }),
	meta: $({}, {
		title: Y,
		folder: Y,
		summary: Y
	}),
	suggestions: $({ suggestions: Q(_c) }),
	requests: $({ requests: Q(wc) }),
	members: $({ members: ec }, {
		pending: ec,
		requests: Q(wc),
		names: $s(Y),
		avatars: $s(X)
	}),
	files: $({ files: Q(rc) }),
	fileAdd: $({ file: rc }),
	reminders: $({ reminders: Q(pc) }),
	decisions: $({ decisions: Q(yc) }),
	pins: $({ pins: Q(xc) }),
	receipts: $({ receipts: Q(Tc) }),
	older: $({
		messages: Q(lc),
		thread: Y,
		more: Qs
	}),
	acks: $({ acks: Q(dc) }),
	ackRows: $({ acks: Q(dc) }),
	poll: $({ poll: Cc }),
	online: $({ online: ec }),
	conns: $({}),
	error: $({}, { error: Y }),
	blocked: $({
		text: Y,
		reason: Y
	})
};
function kc(e) {
	return !Zs(e) || typeof e.t != "string" || !Object.hasOwn(Oc, e.t) ? !1 : Oc[e.t](e);
}
function Ac(e) {
	if (!Zs(e)) return e;
	let t = (e, t) => Zs(e) && (e[t] === 0 || e[t] === 1) ? {
		...e,
		[t]: e[t] === 1
	} : e, n = (e) => Array.isArray(e) ? e.map((e) => t(e, "done")) : e, r = (e) => Array.isArray(e) ? e.map((e) => Zs(e) ? {
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
function jc(e) {
	let t = Ac(JSON.parse(e));
	if (!kc(t)) throw TypeError("Invalid room event");
	return t;
}
var Mc = {
	msg: $({ thread: Y }, {
		text: Y,
		files: ec,
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
		kind: tc("link", "file", "app"),
		ref: Y
	}, { title: Y }),
	"pin.del": $({ id: Y }),
	"reminder.delete": $({ id: Y }),
	"ack.dismiss": $({ id: X }),
	"reminder.enable": $({
		id: Y,
		on: Qs
	}),
	"task.toggle": $({ id: Y }),
	"task.status": $({
		id: Y,
		status: nc
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
	"epic.archive": $({ id: Y }, { archived: Qs }),
	"epic.order": $({ ids: ec }),
	"poll.create": $({
		thread: Y,
		question: Y,
		options: ec,
		multi: Qs
	}),
	vote: $({
		id: Y,
		opt: X
	}),
	"poll.close": $({ id: Y }),
	suggestion: $({ i: X }, { accept: Qs })
};
function Nc(e) {
	return !Zs(e) || typeof e.t != "string" || !Object.hasOwn(Mc, e.t) ? !1 : Mc[e.t](e);
}
// node_modules/hono/dist/client/utils.js
var Pc = (e, t) => (e = e.replace(/\/+$/, ""), e += "/", t = t.replace(/^\/+/, ""), e + t), Fc = (e, t) => {
	for (let [n, r] of Object.entries(t)) {
		let t = RegExp("/:" + n + "(?:{[^/]+})?\\??(?=/|$)");
		e = e.replace(t, () => r ? `/${r}` : "");
	}
	return e;
}, Ic = (e) => {
	let t = new URLSearchParams();
	for (let [n, r] of Object.entries(e)) if (r !== void 0) {
		if (Array.isArray(r)) for (let e of r) e !== void 0 && t.append(n, e);
		else t.set(n, r);
	}
	return t;
}, Lc = (e, t) => {
	switch (t) {
		case "ws": return e.replace(/^http/, "ws");
		case "http": return e.replace(/^ws/, "http");
	}
}, Rc = (e) => /^https?:\/\/[^\/]+?\/index(?=\?|$)/.test(e) ? e.replace(/\/index(?=\?|$)/, "/") : e.replace(/\/index(?=\?|$)/, "");
function zc(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function Bc(e, t) {
	if (!zc(e) && !zc(t)) return t;
	let n = { ...e };
	for (let e in t) {
		let r = t[e];
		n[e] = zc(n[e]) && zc(r) ? Bc(n[e], r) : r;
	}
	return n;
}
// node_modules/hono/dist/utils/cookie.js
var Vc = /^[\w!#$%&'*.^`|~+-]+$/, Hc = (e, t, n = {}) => {
	if (!Vc.test(e)) throw Error("Invalid cookie name");
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
}, Uc = (e, t, n) => (t = encodeURIComponent(t), Hc(e, t, n)), Wc = (e, t) => new Proxy(() => {}, {
	get(n, r) {
		if (typeof r == "string" && r !== "then") return Wc(e, [...t, r]);
	},
	apply(n, r, i) {
		return e({
			path: t,
			args: i
		});
	}
}), Gc = (e, t) => {
	let n = t.toString();
	return n ? `${e}?${n}` : e;
}, Kc = class {
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
			for (let [n, r] of Object.entries(e.cookie)) r !== void 0 && t.push(Uc(n, r));
			t.length > 0 && (r.Cookie = t.join("; "));
		}
		this.cType && (r["Content-Type"] = this.cType);
		let i = new Headers();
		for (let [e, t] of Object.entries(r)) t !== void 0 && i.set(e, t);
		let a = this.url;
		a = Rc(a), a = Fc(a, this.pathParams), this.queryParams && (a = Gc(a, this.queryParams)), n = this.method.toUpperCase();
		let o = n !== "GET" && n !== "HEAD";
		return (t?.fetch || fetch)(a, {
			body: o ? this.rBody : void 0,
			method: n,
			headers: i,
			...t?.init
		});
	};
}, qc = (e, t) => Wc(function n(r) {
	let i = t?.buildSearchParams ?? Ic, a = [...r.path], o = a.slice(-3).reverse();
	if (o[0] === "toString") return o[1] === "name" ? o[2] || "" : n.toString();
	if (o[0] === "valueOf") return o[1] === "name" ? o[2] || "" : n;
	let s = "";
	if (/^\$/.test(o[0])) {
		let e = a.pop();
		e && (s = e.replace(/^\$/, ""));
	}
	let c = Pc(e, a.join("/"));
	if (s === "url" || s === "path") {
		let t = Rc(c);
		return r.args[0] && (r.args[0].param && (t = Fc(t, r.args[0].param)), r.args[0].query && (t = Gc(t, i(r.args[0].query)))), s === "url" ? new URL(t) : t.slice(e.replace(/\/+$/, "").length).replace(/^\/?/, "/");
	}
	if (s === "ws") {
		let e = Rc(c), n = Lc(r.args[0]?.param ? Fc(e, r.args[0].param) : e, "ws"), a = new URL(n), o = r.args[0]?.query;
		return o && i(o).forEach((e, t) => {
			a.searchParams.append(t, e);
		}), ((...e) => t?.webSocket !== void 0 && typeof t.webSocket == "function" ? t.webSocket(...e) : new WebSocket(...e))(a.toString());
	}
	let l = new Kc(c, s, { buildSearchParams: i });
	if (s) {
		t ??= {};
		let e = { ...r.args[1] }, n = t.headers, i = e.headers;
		n && i && (e.headers = async () => ({
			...typeof n == "function" ? await n() : n,
			...typeof i == "function" ? await i() : i
		}));
		let a = Bc(t, e);
		return l.fetch(r.args[0], a);
	}
	return l;
}, []), Jc = (e = "/", t) => qc(e, t ? { fetch: t } : {});
// svelte/transport.ts
function Yc(e, t) {
	if (!Nc(t)) throw TypeError("Invalid room command");
	return !e || e.readyState !== 1 ? !1 : (e.send(JSON.stringify(t)), !0);
}
function Xc(e) {
	if (typeof e != "string") throw TypeError("Room events must be JSON text");
	return jc(e);
}
async function Zc(e) {
	try {
		return await e.json();
	} catch (t) {
		throw e.ok ? t : Error(`HTTP ${e.status}`);
	}
}
function Qc(e, t) {
	let n = Ys.safeParse(t);
	return Error(n.success ? n.data.error : `HTTP ${e.status}`);
}
function $c(e, t = fetch) {
	let n = Jc("/", t).api.books[":id"], r = encodeURIComponent(e);
	return {
		async postMessage(e) {
			let t = await n.post.$post({
				param: { id: r },
				json: e
			}), i = await Zc(t);
			if (t.ok || t.status === 400) {
				let e = Gs.safeParse(i);
				if (e.success) return e.data;
				if (t.ok) throw TypeError("Invalid post response");
			}
			throw Qc(t, i);
		},
		async uploadFile(e) {
			let t = await n.files.$post({
				param: { id: r },
				header: {
					"content-type": e.type,
					"x-filename": encodeURIComponent(e.name)
				}
			}, { init: { body: e.body } }), i = await Zc(t);
			if (!t.ok) throw Qc(t, i);
			let a = Js.safeParse(i);
			if (!a.success) throw TypeError(qs.safeParse(i).success ? "Invalid reminder response" : "Invalid upload response");
			return a.data;
		}
	};
}
// svelte/Reminders.svelte
var el = /* @__PURE__ */ V("<button class=\"primary\" id=\"remNew\"><!> </button>"), tl = /* @__PURE__ */ V("<form class=\"remForm\" id=\"remForm\"><input name=\"name\" maxlength=\"60\" required=\"\"/> <textarea name=\"text\" required=\"\"></textarea> <div class=\"row\"><span class=\"err\" id=\"remErr\"> </span><button type=\"button\" class=\"ghost\" id=\"remCancel\"> </button><button class=\"primary\" id=\"remSave\"> </button></div></form>"), nl = /* @__PURE__ */ V("<span class=\"err\"> </span>"), rl = /* @__PURE__ */ V("<pre class=\"remText\"> </pre>"), il = /* @__PURE__ */ V("<button class=\"ghost\"></button>"), al = /* @__PURE__ */ V("<div><div class=\"remBody\" role=\"button\" tabindex=\"0\"><b><!> </b> <small><!> </small> <!><!></div> <!> <label class=\"sw\"><input type=\"checkbox\"/> </label> <button class=\"ghost\"></button></div>"), ol = /* @__PURE__ */ V("<div class=\"empty\"> </div>"), sl = /* @__PURE__ */ V("<div class=\"remHead\"><p></p> <!></div> <!> <!> <!>", 1);
function cl(e, t) {
	Je(t, !0);
	let n = /* @__PURE__ */ Kt(null), r = /* @__PURE__ */ Kt(""), i = /* @__PURE__ */ Kt(!1), a = /* @__PURE__ */ Kt(en([])), o = /* @__PURE__ */ k(() => t.room.reminders || []), s = /* @__PURE__ */ k(() => t.vb.locale || (document.documentElement.lang === "en" ? "en-US" : "pt-BR")), c = (e) => new Date(e).toLocaleString(z(s), {
		weekday: "short",
		day: "numeric",
		month: "short",
		hour: "2-digit",
		minute: "2-digit"
	});
	function l(e) {
		j(n, e, !0), j(r, "");
	}
	function u(e) {
		j(a, z(a).includes(e.id) ? z(a).filter((t) => t !== e.id) : [...z(a), e.id], !0);
	}
	async function d(e) {
		if (e.preventDefault(), !z(n) || z(i)) return;
		let a = { ...z(n) }, o = a.name.trim().replace(/\.md$/i, "").replace(/[\\/]/g, "-");
		j(i, !0), j(r, "");
		try {
			let e = await $c(t.room.id).uploadFile({
				name: `reminders/${o}.md`,
				type: "text/markdown",
				body: a.text
			});
			if (e.reminder && !e.reminder.ok) {
				j(r, `⚠ ${e.reminder.error || t.vb.t("falhou")}`), j(n, {
					...a,
					name: o,
					fixed: !0
				}, !0);
				return;
			}
			j(n, null);
		} catch (e) {
			j(r, e instanceof Error ? e.message : t.vb.t("sem conexão"), !0);
		} finally {
			j(i, !1);
		}
	}
	var f = sl(), p = N(f), m = M(p);
	G(m, () => t.vb.t("Cada lembrete é um arquivo <code>reminders/&lt;nome&gt;.md</code>: o texto diz quando rodar e o que fazer. Na hora, o @vibe posta o texto aqui e o agent de quem salvou faz."), !0), O(m);
	var h = F(m, 2), g = (e) => {
		var n = el(), r = M(n);
		G(r, () => t.vb.icon("plus", 14));
		var i = F(r);
		O(n), I((e) => U(i, ` ${e ?? ""}`), [() => t.vb.t("Novo lembrete")]), B("click", n, () => l({
			name: "",
			text: ""
		})), H(e, n);
	};
	W(h, (e) => {
		z(n) || e(g);
	}), O(p);
	var _ = F(p, 2), v = (e) => {
		var a = tl(), o = M(a);
		Ci(o);
		var s = F(o, 2);
		ot(s);
		var c = F(s, 2), l = M(c), u = P(l, !0), f = F(l), p = P(f, !0), m = F(f), h = P(m, !0);
		O(c), O(a), I((e, t, a, c) => {
			q(o, "placeholder", e), o.readOnly = z(n).fixed, q(s, "placeholder", t), U(u, z(r)), U(p, a), m.disabled = z(i), U(h, c);
		}, [
			() => t.vb.t("nome, ex.: relatorio-diario"),
			() => t.vb.t("Diga quando e o quê. Ex.: Todo dia às 8h: puxe os números de ontem e poste aqui o que mudou."),
			() => t.vb.t("Cancelar"),
			() => t.vb.t("Salvar")
		]), wr("submit", a, d), ki(o, () => z(n).name, (e) => z(n).name = e), ki(s, () => z(n).text, (e) => z(n).text = e), B("click", f, () => j(n, null)), H(e, a);
	};
	W(_, (e) => {
		z(n) && e(v);
	});
	var y = F(_, 2);
	Zr(y, 17, () => z(o), (e) => e.id, (e, n) => {
		var r = al();
		let i;
		var o = M(r), s = M(o), d = M(s);
		G(d, () => t.vb.icon(z(a).includes(z(n).id) ? "chevronDown" : "chevronRight", 13));
		var f = F(d);
		O(s);
		var p = F(s, 2), m = M(p), h = (e) => {
			var r = Nr();
			I((e) => U(r, `${(z(n).every || z(n).cron || "") ?? ""}${e ?? ""} ·`), [() => z(n).enabled && z(n).next_at ? ` · ${t.vb.t("próximo {when}", { when: c(z(n).next_at) })}` : ""]), H(e, r);
		};
		W(m, (e) => {
			z(n).error || e(h);
		});
		var g = F(m, 1, !0);
		O(p);
		var _ = F(p, 2), v = (e) => {
			var t = nl(), r = P(t);
			I(() => U(r, `⚠ ${z(n).error ?? ""}`)), H(e, t);
		};
		W(_, (e) => {
			z(n).error && e(v);
		});
		var y = F(_), b = (e) => {
			var t = rl(), r = P(t, !0);
			I(() => U(r, z(n).text)), H(e, t);
		}, x = /* @__PURE__ */ k(() => z(a).includes(z(n).id));
		W(y, (e) => {
			z(x) && e(b);
		}), O(o);
		var S = F(o, 2), C = (e) => {
			var r = il();
			G(r, () => t.vb.icon("pencil", 14), !0), O(r), I((e, t) => {
				q(r, "data-rem-edit", z(n).id), q(r, "title", e), q(r, "aria-label", t);
			}, [() => t.vb.t("Editar"), () => t.vb.t("Editar")]), B("click", r, () => l({
				name: z(n).name,
				text: z(n).text,
				fixed: !0
			})), H(e, r);
		};
		W(S, (e) => {
			z(n).name && e(C);
		});
		var w = F(S, 2), T = M(w);
		Ci(T);
		var ee = F(T, 1, !0);
		O(w);
		var te = F(w, 2);
		G(te, () => t.vb.icon("x"), !0), O(te), O(r), I((e, t, a, s, c, l, u) => {
			i = K(r, 1, "rem", null, i, {
				bad: !!z(n).error,
				off: !z(n).enabled,
				open: e
			}), q(o, "data-rem-open", z(n).id), q(o, "title", t), U(f, ` ${(z(n).name ? `${z(n).name}.md` : z(n).text) ?? ""}`), U(g, a), q(w, "title", s), q(T, "data-rem-on", z(n).id), Ti(T, z(n).enabled), T.disabled = !!z(n).error, U(ee, c), q(te, "data-rem-del", z(n).id), q(te, "title", l), q(te, "aria-label", u);
		}, [
			() => z(a).includes(z(n).id),
			() => t.vb.t(z(a).includes(z(n).id) ? "Esconder o texto" : "Ver o texto"),
			() => t.vb.t("de {who}", { who: t.vb.name(z(n).owner) }),
			() => t.vb.t("Ligado"),
			() => t.vb.t("ligado"),
			() => t.vb.t("Apagar lembrete"),
			() => t.vb.t("Apagar lembrete")
		]), B("click", o, (e) => {
			e.target.closest(".remText") || u(z(n));
		}), B("keydown", o, (e) => {
			e.key === "Enter" && u(z(n));
		}), B("change", T, (e) => t.send({
			t: "reminder.enable",
			id: z(n).id,
			on: e.currentTarget.checked
		})), B("click", te, () => {
			confirm(t.vb.t("Apagar este lembrete?")) && t.send({
				t: "reminder.delete",
				id: z(n).id
			});
		}), H(e, r);
	});
	var b = F(y, 2), x = (e) => {
		var n = ol(), r = P(n, !0);
		I((e) => U(r, e), [() => t.vb.t("Nenhum lembrete ainda. Clique em Novo lembrete, ou peça pro seu agent: “todo dia às 8h, me manda o resumo do que mudou”.")]), H(e, n);
	};
	W(b, (e) => {
		!z(o).length && !z(n) && e(x);
	}), H(e, f), Ye();
}
Tr([
	"click",
	"keydown",
	"change"
]);
// svelte/Sidebar.svelte
var ll = /* @__PURE__ */ V("<span class=\"claudeSpin\">✻</span>"), ul = /* @__PURE__ */ V("<button type=\"button\"><!><span class=\"rt\"> </span> <!> <!><!> <span class=\"n\"> </span></button>"), dl = /* @__PURE__ */ V("<div class=\"fnCol\"><span class=\"fnRow\"><span class=\"fn\"> </span><span class=\"pendTag\"> </span></span> <small class=\"memActs\"><button type=\"button\" class=\"ghost resend\"> </button> · <button type=\"button\" class=\"ghost resend\"> </button></small></div>"), fl = /* @__PURE__ */ V("<span class=\"fn\"> </span>"), pl = /* @__PURE__ */ V("<div class=\"fnCol\"><span class=\"fn\"> </span><small class=\"memActs\"> </small></div>"), ml = /* @__PURE__ */ V("<button type=\"button\" class=\"ghost x\"></button>"), hl = /* @__PURE__ */ V("<div class=\"member\"><!> <!> <!></div> <!>", 1), gl = /* @__PURE__ */ V("<button type=\"button\" class=\"iconBtn phOnly\" id=\"sideArch\"></button> <button type=\"button\" class=\"iconBtn phOnly\" id=\"sideDel\"></button>", 1), _l = /* @__PURE__ */ V("<span class=\"rowEdit phOnly\" role=\"button\" tabindex=\"0\" id=\"sideRename\"><!> </span>"), vl = /* @__PURE__ */ V("<div class=\"epTabs\" role=\"tablist\"><button type=\"button\" role=\"tab\" data-arch=\"\"> <b> </b></button> <button type=\"button\" role=\"tab\" data-arch=\"1\"> <b> </b></button></div>"), yl = /* @__PURE__ */ V("<button type=\"button\"><span class=\"ri\"> </span><span class=\"rt\"> </span><span class=\"n\"> </span></button>"), bl = /* @__PURE__ */ V("<form id=\"newEpic\" class=\"newRoom\"><input enterkeyhint=\"done\"/><button class=\"ri\"></button></form> <!>", 1), xl = /* @__PURE__ */ V("<div class=\"member reqRow\"><!> <div class=\"fnCol\"><span class=\"fn\"> </span><small class=\"memActs\"> <button type=\"button\" class=\"ghost resend okAsk\" data-ok=\"1\"> </button></small></div> <button type=\"button\" class=\"ghost x\" data-ok=\"\"></button></div>"), Sl = /* @__PURE__ */ V("<div class=\"asks\"><h4> </h4> <!></div>"), Cl = /* @__PURE__ */ V("<details class=\"memMore\" data-fold=\"off\"><summary> </summary><!></details>"), wl = /* @__PURE__ */ V("<button type=\"button\" class=\"friendAdd\"><!><span class=\"fn\"> </span><b></b></button>"), Tl = /* @__PURE__ */ V("<details class=\"memMore\" data-fold=\"friends\"><summary> </summary> <!></details>"), El = /* @__PURE__ */ V("<option></option>"), Dl = /* @__PURE__ */ V("<button type=\"button\" class=\"sheetGrab\"><i></i></button> <!> <div class=\"sideHead\"><div class=\"sideTop\"><a data-nav=\"\" href=\"/app\" class=\"muted\"><!> vibebooks</a> <!> <button type=\"button\" class=\"iconBtn\" id=\"railToggle\" aria-expanded=\"true\"></button></div></div> <div class=\"sec threadsSec\"><button type=\"button\" data-thread=\"main\"><!><span class=\"rt\"> </span> <!> <!><span class=\"n\"> </span></button> <!> <div><!> <!></div></div> <!> <div class=\"sec\"><!> <h4> </h4> <!> <!> <!> <!> <form class=\"row\" id=\"invite\" style=\"margin-top:8px\"><input type=\"email\" required=\"\" list=\"friendList\" autocomplete=\"off\"/><button></button></form> <datalist id=\"friendList\"></datalist></div>", 1);
function Ol(e, t) {
	Je(t, !0);
	let n = (e, n = m) => {
		let r = /* @__PURE__ */ k(() => n().tasks.filter((e) => e.done).length), i = /* @__PURE__ */ k(() => t.vb.epicBusy(n()));
		var a = ul();
		let o;
		var s = M(a);
		G(s, () => t.vb.epicIco(n(), !0));
		var c = F(s), l = P(c, !0), u = F(c, 2), d = (e) => {
			var n = ll();
			I((e) => q(n, "aria-label", e), [() => t.vb.t("{who} está trabalhando", { who: z(i) })]), H(e, n);
		};
		W(u, (e) => {
			z(i) && e(d);
		});
		var f = F(u, 2);
		G(f, () => t.vb.waitPill(n().id));
		var p = F(f);
		G(p, () => t.vb.prodMark(n()));
		var h = P(F(p, 2), !0);
		O(a), I((e, s) => {
			o = K(a, 1, "thread", null, o, {
				sel: t.thread === n().id,
				archived: !!n().archived,
				busy: !!z(i),
				waiting: e
			}), q(a, "data-thread", n().id), q(a, "title", s), U(l, n().title), U(h, n().tasks.length ? `${z(r)}/${n().tasks.length}` : "");
		}, [() => t.vb.waitsIn(n().id).length > 0, () => `${n().title} · ${z(r)}/${n().tasks.length} tasks${n().archived ? ` · ${t.vb.t("arquivado")}` : ""}${z(i) ? ` · ${t.vb.t("{who} está trabalhando aqui", { who: z(i) })}` : ""}`]), H(e, a);
	}, r = (e, n = m) => {
		var r = hl(), i = N(r), a = M(i);
		G(a, () => t.vb.avatar(n(), t.room.online.includes(n())));
		var o = F(a, 2), s = (e) => {
			var r = dl(), i = M(r), a = M(i), o = P(a, !0), s = F(a), c = P(s, !0);
			O(i);
			var l = F(i, 2), u = M(l), d = P(u, !0), f = F(u, 2), p = P(f, !0);
			O(l), O(r), I((e, t, r, i, l, m, h) => {
				q(a, "title", n()), U(o, e), q(s, "title", t), U(c, r), q(u, "data-copyinv", n()), q(u, "title", i), U(d, l), q(f, "data-resend", n()), q(f, "title", m), U(p, h);
			}, [
				() => t.room.names?.[n()] || n().split("@")[0],
				() => t.vb.t("Convidada(o), ainda não entrou"),
				() => t.vb.t("pendente"),
				() => t.vb.t("Copiar a mensagem de convite (link da sala + setup do agent) para mandar no WhatsApp"),
				() => t.vb.t("copiar"),
				() => t.vb.t("Convidada(o), ainda não entrou"),
				() => t.vb.t("reenviar")
			]), H(e, r);
		}, c = /* @__PURE__ */ k(() => t.room.pending?.includes(n())), l = (e) => {
			var r = fl(), i = P(r, !0);
			I(() => {
				q(r, "title", n()), U(i, t.room.names[n()]);
			}), H(e, r);
		}, u = (e) => {
			var t = pl(), r = M(t), i = P(r, !0), a = P(F(r));
			O(t), I((e, t) => {
				q(r, "title", n()), U(i, e), U(a, `@${t ?? ""}`);
			}, [() => n().split("@")[0], () => n().split("@")[1] ?? ""]), H(e, t);
		};
		W(o, (e) => {
			z(c) ? e(s) : t.room.names?.[n()] ? e(l, 1) : e(u, -1);
		});
		var d = F(o, 2), f = (e) => {
			var r = ml();
			G(r, () => t.vb.icon("x"), !0), O(r), I((e, t) => {
				q(r, "data-remove", n()), q(r, "aria-label", e), q(r, "title", t);
			}, [() => t.vb.t("Remover {email}", { email: n() }), () => t.room.pending?.includes(n()) ? t.vb.t("Cancelar convite") : t.vb.t("Remover do vibebook")]), H(e, r);
		}, p = /* @__PURE__ */ k(() => n() !== t.room.book?.owner && (t.room.pending?.includes(n()) || t.room.me === t.room.book?.owner));
		W(d, (e) => {
			z(p) && e(f);
		}), O(i), G(F(i, 2), () => t.vb.agentRows(n())), H(e, r);
	}, i = Gi(t, "archOpen", 3, !1), a = Gi(t, "foldOpen", 19, () => ({
		off: !1,
		friends: null
	})), o = Gi(t, "friends", 19, () => []), s = (e) => t.room.counts ? (t.room.counts[e] ?? 0) + t.room.messages.filter((n) => n.thread === e && n.id > (t.room.countsAt ?? 0)).length : t.room.messages.filter((t) => t.thread === e).length, c = (e) => t.room.messages.reduce((t, n) => n.thread === e.id && n.id > t ? n.id : t, 0), l = /* @__PURE__ */ k(() => t.room.epics.find((e) => e.id === t.thread)), u = /* @__PURE__ */ k(() => t.room.epics.filter((e) => !e.archived)), d = /* @__PURE__ */ k(() => t.room.epics.filter((e) => e.archived).map((e, t) => ({
		epic: e,
		last: c(e),
		i: t
	})).sort((e, t) => t.last - e.last || t.i - e.i).map(({ epic: e }) => e)), f = /* @__PURE__ */ k(() => i() && z(d).length > 0), p = /* @__PURE__ */ k(() => t.room.members.filter((e) => e === t.room.me || t.room.online.includes(e))), h = /* @__PURE__ */ k(() => t.room.members.filter((e) => !z(p).includes(e))), g = /* @__PURE__ */ k(() => o().filter((e) => !t.room.members.includes(e)));
	var _ = Dl(), v = N(_), y = F(v, 2);
	G(y, () => t.vb.roomStrip());
	var b = F(y, 2), x = M(b), S = M(x);
	G(M(S), () => t.vb.icon("back")), ke(), O(S);
	var C = F(S, 2), w = (e) => {
		var n = gl(), r = N(n);
		G(r, () => t.vb.icon(z(l).archived ? "undo" : "check", 18), !0), O(r);
		var i = F(r, 2);
		G(i, () => t.vb.icon("trash", 18), !0), O(i), I((e, t, n, a) => {
			q(r, "title", e), q(r, "aria-label", t), q(i, "title", n), q(i, "aria-label", a);
		}, [
			() => z(l).archived ? t.vb.t("Desarquivar épico") : t.vb.t("Arquivar épico (concluído)"),
			() => z(l).archived ? t.vb.t("Desarquivar épico") : t.vb.t("Arquivar épico"),
			() => t.vb.t("Apagar épico"),
			() => t.vb.t("Apagar épico")
		]), H(e, n);
	};
	W(C, (e) => {
		z(l) && e(w);
	});
	var T = F(C, 2);
	G(T, () => t.vb.icon("sidebar", 20), !0), O(T), O(x), O(b);
	var ee = F(b, 2), te = M(ee);
	let ne;
	var re = M(te);
	G(re, () => t.vb.roomMark("ri roomIco"));
	var ie = F(re), ae = P(ie, !0), oe = F(ie, 2), se = (e) => {
		var n = _l(), r = M(n);
		G(r, () => t.vb.icon("pencil", 13));
		var i = F(r);
		O(n), I((e, t) => {
			q(n, "title", e), U(i, ` ${t ?? ""}`);
		}, [() => t.vb.t("Renomear"), () => t.vb.t("editar")]), H(e, n);
	}, ce = /* @__PURE__ */ k(() => !t.thread.startsWith("pre:"));
	W(oe, (e) => {
		z(ce) && e(se);
	});
	var le = F(oe, 2);
	G(le, () => t.vb.waitPill("main"));
	var ue = P(F(le), !0);
	O(te);
	var de = F(te, 2), fe = (e) => {
		var n = vl(), r = M(n);
		let i;
		var a = M(r), o = P(F(a), !0);
		O(r);
		var s = F(r, 2);
		let c;
		var l = M(s), p = P(F(l), !0);
		O(s), O(n), I((e, t) => {
			q(r, "aria-selected", !z(f)), i = K(r, 1, "", null, i, { on: !z(f) }), U(a, `${e ?? ""} `), U(o, z(u).length), q(s, "aria-selected", z(f)), c = K(s, 1, "", null, c, { on: z(f) }), U(l, `${t ?? ""} `), U(p, z(d).length);
		}, [() => t.vb.t("Épicos"), () => t.vb.t("Arquivados")]), H(e, n);
	};
	W(de, (e) => {
		z(d).length && e(fe);
	});
	var pe = F(de, 2);
	let me;
	var he = M(pe);
	Zr(he, 17, () => z(f) ? z(d) : z(u), (e) => e.id, (e, t) => {
		n(e, () => z(t));
	});
	var ge = F(he, 2), _e = (e) => {
		var n = bl(), r = N(n), i = M(r), a = F(i);
		G(a, () => t.vb.icon("plus"), !0), O(a), O(r), Zr(F(r, 2), 17, () => t.room.suggestions, qr, (e, n, r) => {
			var i = yl();
			let a;
			q(i, "data-thread", `pre:${r}`);
			var o = M(i), s = P(o, !0), c = F(o), l = P(c, !0), u = P(F(c), !0);
			O(i), I((e, o) => {
				a = K(i, 1, "thread pre", null, a, { sel: t.thread === `pre:${r}` }), q(i, "title", e), U(s, o), U(l, z(n).title), U(u, z(n).tasks.length || "");
			}, [() => `${z(n).title} · ${t.vb.t("sugestão do @vibe, clique para ver")}`, () => t.vb.initials(z(n).title)]), H(e, i);
		}), I((e, t, n) => {
			q(i, "placeholder", e), q(i, "aria-label", t), q(a, "aria-label", n);
		}, [
			() => t.vb.t("Novo épico: escreva o título…"),
			() => t.vb.t("Novo épico"),
			() => t.vb.t("Criar épico")
		]), H(e, n);
	};
	W(ge, (e) => {
		z(f) || e(_e);
	}), O(pe), O(ee);
	var ve = F(ee, 2);
	G(ve, () => t.vb.pinsSec());
	var ye = F(ve, 2), be = M(ye), xe = (e) => {
		var n = Sl(), r = M(n), i = P(r, !0);
		Zr(F(r, 2), 17, () => t.room.requests, (e) => e.email, (e, n) => {
			var r = xl(), i = M(r);
			G(i, () => t.vb.avatar(z(n).email));
			var a = F(i, 2), o = M(a), s = P(o, !0), c = F(o), l = M(c), u = F(l), d = P(u, !0);
			O(c), O(a);
			var f = F(a, 2);
			G(f, () => t.vb.icon("x"), !0), O(f), O(r), I((e, t, r, i, a, c, p) => {
				q(o, "title", e), U(s, t), U(l, `${r ?? ""} · `), q(u, "data-ask", z(n).email), q(u, "title", i), U(d, a), q(f, "data-ask", z(n).email), q(f, "aria-label", c), q(f, "title", p);
			}, [
				() => `${z(n).email} · ${t.vb.t("pediu {ago}", { ago: t.vb.ago(z(n).ts) })}`,
				() => z(n).name || z(n).email.split("@")[0],
				() => t.vb.t("pediu {ago}", { ago: t.vb.ago(z(n).ts) }),
				() => t.vb.t("Liberar: entra na sala e recebe o link por email"),
				() => t.vb.t("liberar"),
				() => t.vb.t("Recusar {email}", { email: z(n).email }),
				() => t.vb.t("Recusar")
			]), H(e, r);
		}), O(n), I((e) => U(i, e), [() => t.vb.t("Pedindo pra entrar")]), H(e, n);
	};
	W(be, (e) => {
		t.room.requests?.length && e(xe);
	});
	var Se = F(be, 2), Ce = P(Se, !0), we = F(Se, 2);
	G(we, () => t.vb.sbxRows());
	var Te = F(we, 2);
	Zr(Te, 16, () => z(p), (e) => e, (e, t) => {
		r(e, () => t);
	});
	var E = F(Te, 2), Ee = (e) => {
		var n = Cl(), i = M(n), o = P(i, !0);
		Zr(F(i), 16, () => z(h), (e) => e, (e, t) => {
			r(e, () => t);
		}), O(n), I((e) => {
			n.open = a().off, U(o, e);
		}, [() => t.vb.t("{n} offline", { n: z(h).length })]), H(e, n);
	};
	W(E, (e) => {
		z(h).length && e(Ee);
	});
	var D = F(E, 2), De = (e) => {
		var n = Tl(), r = M(n), i = P(r);
		Zr(F(r, 2), 16, () => z(g), (e) => e, (e, n) => {
			var r = wl(), i = M(r);
			G(i, () => t.vb.avatar(n));
			var a = F(i), o = P(a, !0), s = F(a);
			G(s, () => t.vb.icon("plus"), !0), O(s), O(r), I((e, t) => {
				q(r, "data-add", n), q(r, "title", e), U(o, t);
			}, [() => t.vb.t("Adicionar {email}", { email: n }), () => t.vb.name(n)]), H(e, r);
		}), O(n), I((e) => {
			n.open = a().friends ?? t.room.members.length <= 1, U(i, `${e ?? ""} · ${z(g).length ?? ""}`);
		}, [() => t.vb.t("Seus amigos")]), H(e, n);
	};
	W(D, (e) => {
		z(g).length && e(De);
	});
	var Oe = F(D, 2), Ae = M(Oe), je = F(Ae);
	G(je, () => t.vb.icon("plus"), !0), O(je), O(Oe);
	var Me = F(Oe, 2);
	Zr(Me, 21, () => z(g), qr, (e, t) => {
		var n = El(), r = {};
		I(() => {
			r !== (r = z(t)) && (n.value = (n.__value = r) ?? "");
		}), H(e, n);
	}), O(Me), O(ye), I((e, n, r, i, a, o, s, c, l, u) => {
		q(v, "aria-label", e), q(T, "title", n), q(T, "aria-label", r), ne = K(te, 1, "thread", null, ne, {
			sel: t.thread === "main",
			waiting: i
		}), q(te, "title", a), U(ae, o), U(ue, s), me = K(pe, 1, "epList", null, me, { arch: z(f) }), U(Ce, c), q(Ae, "placeholder", l), q(je, "aria-label", u);
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
	]), H(e, _), Ye();
}
// svelte/Message.svelte
var kl = /* @__PURE__ */ V("<span class=\"gut\"> </span>"), Al = /* @__PURE__ */ V(" <span class=\"agentTag\">agent</span>", 1), jl = /* @__PURE__ */ V("<span class=\"doneTag\"> </span>"), Ml = /* @__PURE__ */ V("<div><!> <!> <span class=\"mact\"><button type=\"button\" class=\"rbtn\"><!> </button> <button type=\"button\" class=\"rbtn\"><!> </button> <button type=\"button\" class=\"rbtn\"><!> </button></span> <div class=\"body\"><!> <div class=\"who\"><!> <!> <span class=\"hhmm\"> </span></div> <div class=\"txt\"></div> <!> <!> <!> <!> <!></div></div>");
function Nl(e, t) {
	Je(t, !0);
	let n = Gi(t, "origin", 3, !1), r = /* @__PURE__ */ k(() => t.vb.continues(t.previous, t.message)), i = /* @__PURE__ */ k(() => t.message.tag === "reminder" ? t.vb.remHtml(t.message, n()) : t.message.tag === "issue" ? t.vb.issueHtml(t.message) : t.vb.isNotice(t.message) ? t.vb.noticeHtml(t.message) : null), a = /* @__PURE__ */ k(() => n() && z(i) ? z(i).replace(/\sid="m\d+"/, "") : z(i)), o = /* @__PURE__ */ k(() => !t.message.text && t.typing ? `<span class="typing">${t.vb.esc(t.vb.typingNote?.(t.message.id) || t.vb.t("pensando ({mode})", { mode: t.vb.typingLabel?.(t.typing) ?? t.typing }))}…</span>` : t.message.author === "ai" ? t.message.text ? t.vb.mentions(t.vb.md(t.message.text)) : t.message.poll ? "" : `<span class="typing">${t.vb.t("pensando…")}</span>` : t.message.text ? t.vb.mentions(t.message.kind === "agent" ? t.vb.md(t.message.text) : t.vb.linkify(t.vb.esc(t.message.text))) : ""), s = /* @__PURE__ */ k(() => t.vb.dateTime?.(t.message.ts) ?? new Date(t.message.ts).toLocaleString());
	var c = Pr(), l = N(c), u = (e) => {
		var t = Pr();
		G(N(t), () => z(a)), H(e, t);
	}, d = (e) => {
		var i = Ml();
		let a;
		var c = M(i);
		G(c, () => t.message.kind === "agent" ? t.vb.agentAvatar(t.message.author, t.message.via) : t.vb.avatar(t.message.author));
		var l = F(c, 2), u = (e) => {
			var n = kl(), r = P(n, !0);
			I((e) => {
				q(n, "title", z(s)), U(r, e);
			}, [() => t.vb.hhmm(t.message.ts)]), H(e, n);
		};
		W(l, (e) => {
			z(r) && e(u);
		});
		var d = F(l, 2), f = M(d), p = M(f);
		G(p, () => t.vb.icon("copy", 14));
		var m = F(p);
		O(f);
		var h = F(f, 2), g = M(h);
		G(g, () => t.vb.icon("link", 14));
		var _ = F(g);
		O(h);
		var v = F(h, 2), y = M(v);
		G(y, () => t.vb.icon("reply", 14));
		var b = F(y);
		O(v), O(d);
		var x = F(d, 2), S = M(x), C = (e) => {
			var n = Pr();
			G(N(n), () => t.vb.quoteHtml(t.message.reply_to)), H(e, n);
		};
		W(S, (e) => {
			t.message.reply_to && e(C);
		});
		var w = F(S, 2), T = M(w), ee = (e) => {
			var n = Al(), r = N(n), i = F(r);
			I((e, t) => {
				U(r, `${e ?? ""} `), q(i, "title", t);
			}, [() => t.vb.t("{via} de {who}", {
				via: t.message.via || "agent",
				who: t.vb.name(t.message.author)
			}), () => t.vb.t("Escrito pelo agent dessa pessoa, em nome dela")]), H(e, n);
		}, te = (e) => {
			var n = Nr();
			I((e) => U(n, e), [() => t.vb.name(t.message.author)]), H(e, n);
		};
		W(T, (e) => {
			t.message.kind === "agent" ? e(ee) : e(te, -1);
		});
		var ne = F(T, 2), re = (e) => {
			var n = jl(), r = P(n);
			I((e, t) => {
				q(n, "title", e), U(r, `✓ ${t ?? ""}`);
			}, [() => t.vb.t("Reporta algo entregue"), () => t.vb.t("entregue")]), H(e, n);
		};
		W(ne, (e) => {
			t.message.tag === "done" && e(re);
		});
		var ie = F(ne), ae = F(ie), oe = P(ae, !0);
		O(w);
		var se = F(w, 2);
		G(se, () => z(o), !0), O(se);
		var ce = F(se, 2);
		G(ce, () => t.vb.attHtml(t.message.files));
		var le = F(ce, 2), ue = (e) => {
			var n = Pr();
			G(N(n), () => t.vb.cardHtml(t.message)), H(e, n);
		};
		W(le, (e) => {
			t.message.card && e(ue);
		});
		var de = F(le, 2), fe = (e) => {
			var n = Pr();
			G(N(n), () => t.vb.choiceHtml(t.message)), H(e, n);
		};
		W(de, (e) => {
			t.message.choices && e(fe);
		});
		var pe = F(de, 2), me = (e) => {
			var n = Pr();
			G(N(n), () => t.vb.pollHtml(t.message.poll)), H(e, n);
		};
		W(pe, (e) => {
			t.message.poll && e(me);
		});
		var he = F(pe, 2), ge = (e) => {
			var n = Pr();
			G(N(n), () => t.vb.threadCards(t.message.id)), H(e, n);
		};
		W(he, (e) => {
			n() || e(ge);
		}), O(x), O(i), I((e, c, l, u, d, p, g, y, x, S, C, w) => {
			a = K(i, 1, "msg", null, a, {
				ai: t.message.author === "ai",
				agent: t.message.author !== "ai" && t.message.kind === "agent",
				done: t.message.tag === "done",
				cont: z(r),
				waitMsg: e
			}), q(i, "id", n() ? void 0 : `m${t.message.id}`), q(f, "data-copymsg", t.message.id), q(f, "title", c), q(f, "aria-label", l), U(m, ` ${u ?? ""}`), q(h, "data-copylink", t.message.id), q(h, "title", d), q(h, "aria-label", p), U(_, ` ${g ?? ""}`), q(v, "data-reply", t.message.id), q(v, "title", y), q(v, "aria-label", x), U(b, ` ${S ?? ""}`), U(ie, ` · ${C ?? ""}`), q(ae, "title", z(s)), U(oe, w), q(se, "hidden", !z(o));
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
		]), H(e, i);
	};
	W(l, (e) => {
		z(a) === null ? e(d, -1) : e(u);
	}), H(e, c), Ye();
}
// svelte/Chat.svelte
var Pl = /* @__PURE__ */ V("<div class=\"older\"><button type=\"button\" class=\"ghost\" id=\"olderBtn\"> </button></div>"), Fl = /* @__PURE__ */ V("<div class=\"origin\"><!> <div class=\"replies\"><span> </span><button type=\"button\" class=\"ghost\"> <!></button></div></div>"), Il = /* @__PURE__ */ V("<div><!></div>"), Ll = /* @__PURE__ */ V("<!> <!> <!>", 1);
function Rl(e, t) {
	Je(t, !0);
	let n = Gi(t, "more", 3, !1), r = Gi(t, "origin", 3, null), i = Gi(t, "replyCount", 3, 0);
	var a = Pr();
	Kr(N(a), () => t.room.id + ":" + t.thread, (e) => {
		var a = Ll(), o = N(a), s = (e) => {
			var n = Pl(), r = M(n), i = P(r, !0);
			O(n), I((e) => U(i, e), [() => t.vb.t("Carregar mensagens anteriores")]), B("click", r, function(...e) {
				t.onloadolder?.apply(this, e);
			}), H(e, n);
		};
		W(o, (e) => {
			t.list.length && n() && e(s);
		});
		var c = F(o, 2), l = (e) => {
			var n = Fl(), a = M(n);
			Nl(a, {
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
			var o = F(a, 2), s = M(o), c = P(s, !0), l = F(s), u = M(l);
			G(F(u), () => t.vb.icon("reply", 13)), O(l), O(o), O(n), I((e, t) => {
				U(c, e), q(l, "data-gomain", r().id), U(u, `${t ?? ""} `);
			}, [() => i() === 1 ? t.vb.t("1 resposta") : t.vb.t("{n} respostas", { n: i() }), () => t.vb.t("ver na sala principal")]), H(e, n);
		};
		W(c, (e) => {
			r() && e(l);
		});
		var u = F(c, 2), d = (e) => {
			var n = Pr();
			Zr(N(n), 19, () => t.list, (e) => e.id, (e, n, r) => {
				{
					let i = /* @__PURE__ */ k(() => z(r) ? t.list[z(r) - 1] : t.previous);
					Nl(e, {
						get message() {
							return z(n);
						},
						get previous() {
							return z(i);
						},
						get typing() {
							return t.room.typing[z(n).id];
						},
						get vb() {
							return t.vb;
						}
					});
				}
			}), H(e, n);
		}, f = (e) => {
			var n = Il();
			let i;
			var a = M(n), o = (e) => {
				var n = Pr();
				G(N(n), () => t.vb.t("Comece a conversa. Os agents ligados nesta sala leem e respondem; o seu age com o seu OK. Ex.: <i>organiza o projeto em épicos: site novo, aluguéis e domínio</i>.")), H(e, n);
			}, s = (e) => {
				var n = Nr();
				I((e) => U(n, e), [() => t.vb.t("Discussão deste épico. Os agents leem as tarefas, o doc e a sala principal.")]), H(e, n);
			};
			W(a, (e) => {
				t.thread === "main" ? e(o) : e(s, -1);
			}), O(n), I(() => i = K(n, 1, "empty", null, i, { afterOrigin: !!r() })), H(e, n);
		};
		W(u, (e) => {
			t.list.length ? e(d) : e(f, -1);
		}), H(e, a);
	}), H(e, a), Ye();
}
Tr(["click"]);
// svelte/roomStore.ts
function zl(e, t, n) {
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
function Bl() {
	let e = Pi(null);
	return {
		subscribe: e.subscribe,
		get: () => Fi(e),
		replace: e.set,
		apply(t, n) {
			return e.update((e) => zl(e, t, n)), Fi(e);
		}
	};
}
// svelte/main.ts
var Vl = /* @__PURE__ */ t({
	createRoomStore: () => Bl,
	mountInbox: () => Wl,
	mountView: () => Ul
}), Hl = {
	tasks: ua,
	board: ja,
	files: Ba,
	reminders: cl,
	sidebar: Ol,
	chat: Rl
};
function Ul(e, t, n) {
	let r = Pi(n), i = Hl[e], a = Ft(() => zr(Ki, {
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
				Ur(a);
			});
		}
	};
}
function Wl(e, t) {
	let n = Ft(() => zr(ea, {
		target: e,
		props: t
	}));
	return () => Ur(n);
}
export { $c as a, Bl as i, Wl as n, Xc as o, Ul as r, Yc as s, Vl as t };
