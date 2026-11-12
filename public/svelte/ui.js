// node_modules/svelte/src/internal/shared/utils.js
var e = Array.isArray, t = Array.prototype.indexOf, n = Array.prototype.includes, r = Array.from, i = Object.defineProperty, a = Object.getOwnPropertyDescriptor, o = Object.getOwnPropertyDescriptors, s = Object.prototype, c = Array.prototype, l = Object.getPrototypeOf, u = Object.isExtensible, d = () => {};
function f(e) {
	for (var t = 0; t < e.length; t++) e[t]();
}
function p() {
	var e, t;
	return {
		promise: new Promise((n, r) => {
			e = n, t = r;
		}),
		resolve: e,
		reject: t
	};
}
var m = 1024, h = 2048, g = 4096, _ = 8192, v = 16384, y = 32768, b = 1 << 25, x = 65536, S = 1 << 19, ee = 1 << 20, te = 1 << 25, ne = 1 << 21, re = 1 << 22, ie = 1 << 23, ae = Symbol("$state"), oe = Symbol("component"), se = Symbol("legacy props"), ce = Symbol(""), le = Symbol("attributes"), ue = Symbol("class"), de = Symbol("style"), fe = Symbol("text"), pe = new class extends Error {
	name = "StaleReactionError";
	message = "The reaction that called `getAbortSignal()` was re-run or destroyed";
}(), me = !!globalThis.document?.contentType && /* @__PURE__ */ globalThis.document.contentType.includes("xml"), he = {}, C = Symbol("uninitialized"), ge = "http://www.w3.org/1999/xhtml", _e = "http://www.w3.org/2000/svg", ve = "http://www.w3.org/1998/Math/MathML";
function ye() {
	console.warn("https://svelte.dev/e/derived_inert");
}
function be(e) {
	console.warn("https://svelte.dev/e/hydration_mismatch");
}
function xe() {
	console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
// node_modules/svelte/src/internal/client/dom/hydration.js
var w = !1;
function Se(e) {
	w = e;
}
var T;
function E(e) {
	if (e === null) throw be(), he;
	return T = e;
}
function Ce() {
	return E(/* @__PURE__ */ R(T));
}
function D(e) {
	if (w) {
		if (/* @__PURE__ */ R(T) !== null) throw be(), he;
		T = e;
	}
}
function we(e = 1) {
	if (w) {
		for (var t = e, n = T; t--;) n = /* @__PURE__ */ R(n);
		T = n;
	}
}
function Te(e = !0) {
	for (var t = 0, n = T;;) {
		if (n.nodeType === 8) {
			var r = n.data;
			if (r === "]") {
				if (t === 0) return n;
				--t;
			} else (r === "[" || r === "[!" || r[0] === "[" && !isNaN(Number(r.slice(1)))) && (t += 1);
		}
		var i = /* @__PURE__ */ R(n);
		e && n.remove(), n = i;
	}
}
function Ee(e) {
	if (!e || e.nodeType !== 8) throw be(), he;
	return e.data;
}
// node_modules/svelte/src/internal/client/reactivity/equality.js
function De(e) {
	return e === this.v;
}
function Oe(e, t) {
	return e == e ? e !== t || typeof e == "object" && !!e || typeof e == "function" : t == t;
}
function ke(e) {
	return !Oe(e, this.v);
}
// node_modules/svelte/src/internal/client/errors.js
function Ae() {
	throw Error("https://svelte.dev/e/async_derived_orphan");
}
function je(e, t, n) {
	throw Error("https://svelte.dev/e/each_key_duplicate");
}
function Me() {
	throw Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function Ne(e) {
	throw Error("https://svelte.dev/e/props_invalid_value");
}
function Pe() {
	throw Error("https://svelte.dev/e/state_descriptors_fixed");
}
function Fe() {
	throw Error("https://svelte.dev/e/state_prototype_fixed");
}
function Ie() {
	throw Error("https://svelte.dev/e/state_unsafe_mutation");
}
function Le() {
	throw Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
// node_modules/svelte/src/internal/client/context.js
var O = null;
function Re(e) {
	O = e;
}
function ze(e, t = !1, n) {
	O = {
		p: O,
		i: !1,
		c: null,
		e: null,
		s: e,
		x: null,
		r: K,
		l: null
	};
}
function Be(e) {
	var t = O, n = t.e;
	if (n !== null) {
		t.e = null;
		for (var r of n) $t(r);
	}
	return e !== void 0 && (t.x = e), t.i = !0, O = t.p, Ve(e);
}
function Ve(e = {}) {
	return i(e, oe, { value: !0 }), e;
}
function He() {
	return !0;
}
// node_modules/svelte/src/internal/client/dom/task.js
var Ue = [];
function We() {
	var e = Ue;
	Ue = [], f(e);
}
function Ge(e) {
	if (Ue.length === 0 && !pt) {
		var t = Ue;
		queueMicrotask(() => {
			t === Ue && We();
		});
	}
	Ue.push(e);
}
// node_modules/svelte/src/internal/client/reactivity/status.js
var Ke = ~(h | g | m);
function k(e, t) {
	e.f = e.f & Ke | t;
}
function qe(e) {
	e.f & 512 || e.deps === null ? k(e, m) : k(e, g);
}
// node_modules/svelte/src/internal/client/reactivity/utils.js
function Je(e, t) {
	e.f & 2048 ? t.set(e, h) : e.f & 4096 && t.get(e) !== 2048 && t.set(e, g), k(e, m);
}
// node_modules/svelte/src/internal/client/dom/elements/bindings/shared.js
function Ye(e) {
	var t = U, n = K;
	G(null), q(null);
	try {
		return e();
	} finally {
		G(t), q(n);
	}
}
// node_modules/svelte/src/internal/client/reactivity/async.js
function Xe(e, t, n, r) {
	let i = He() ? et : it;
	var a = e.filter((e) => !e.settled), o = t.map(i);
	if (n.length === 0 && a.length === 0) {
		r(o);
		return;
	}
	var s = K, c = Ze(), l = a.length === 1 ? a[0].promise : a.length > 1 ? Promise.all(a.map((e) => e.promise)) : null;
	function u(e) {
		if (!(s.f & 16384)) {
			c();
			try {
				r([...o, ...e]);
			} catch (e) {
				B(e, s);
			}
			Qe();
		}
	}
	var d = $e();
	if (n.length === 0) {
		l.then(() => u([])).finally(d);
		return;
	}
	function f() {
		Promise.all(n.map((e) => /* @__PURE__ */ nt(e))).then(u).catch((e) => B(e, s)).finally(d);
	}
	l ? l.then(() => {
		s.f & 16384 ? d() : (c(), f(), Qe());
	}) : f();
}
function Ze() {
	var e = K, t = U, n = O, r = A;
	return function(i = !0) {
		q(e), G(t), Re(n), i && !(e.f & 16384) && (r?.activate(), r?.apply());
	};
}
function Qe(e = !0) {
	q(null), G(null), Re(null), e && A?.deactivate();
}
function $e() {
	var e = K, t = e.b, n = A, r = !!t?.is_rendered();
	return t?.update_pending_count(1, n), n.increment(r, e), () => {
		t?.update_pending_count(-1, n), n.decrement(r, e);
	};
}
/*#__NO_SIDE_EFFECTS__*/
function et(e) {
	var t = 2 | h;
	return K !== null && (K.f |= S), {
		ctx: O,
		deps: null,
		effects: null,
		equals: De,
		f: t,
		fn: e,
		reactions: null,
		rv: 0,
		v: C,
		wv: 0,
		parent: K,
		ac: null
	};
}
var tt = Symbol("obsolete");
/*#__NO_SIDE_EFFECTS__*/
function nt(e, t, n) {
	let r = K;
	r === null && Ae();
	var i = void 0, a = Dt(C), o = !U, s = /* @__PURE__ */ new Set();
	return tn(() => {
		var t = K, n = p();
		i = n.promise;
		try {
			Promise.resolve(e()).then(n.resolve, (e) => {
				e !== pe && n.reject(e);
			}).finally(Qe);
		} catch (e) {
			n.reject(e), Qe();
		}
		var c = A;
		if (o) {
			if (t.f & 32768) var l = $e();
			if (r.b?.is_rendered()) c.async_deriveds.get(t)?.reject(tt);
			else for (let e of s.values()) e.reject(tt);
			s.add(n), c.async_deriveds.set(t, n);
		}
		let u = (e, t = void 0) => {
			l?.(), s.delete(n), t !== tt && (c.activate(), t ? (a.f |= ie, jt(a, t)) : (a.f & 8388608 && (a.f ^= ie), jt(a, e)), c.deactivate());
		};
		n.promise.then(u, (e) => u(null, e || "unknown"));
	}), Qt(() => {
		for (let e of s) e.reject(tt);
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
function rt(e) {
	let t = /* @__PURE__ */ et(e);
	return yn(t), t;
}
/*#__NO_SIDE_EFFECTS__*/
function it(e) {
	let t = /* @__PURE__ */ et(e);
	return t.equals = ke, t;
}
function at(e) {
	var t = e.effects;
	if (t !== null) {
		e.effects = null;
		for (var n = 0; n < t.length; n += 1) H(t[n]);
	}
}
function ot(e) {
	var t, n = K, r = e.parent;
	if (!_n && r !== null && e.v !== C && r.f & 24576) return ye(), e.v;
	q(r);
	try {
		at(e), t = On(e);
	} finally {
		q(n);
	}
	return t;
}
function st(e) {
	var t = ot(e);
	!e.equals(t) && (e.wv = Tn(), (!A?.is_fork || e.deps === null) && (A === null ? e.v = t : (A.capture(e, t, !0), dt?.capture(e, t, !0)), e.deps === null)) ? k(e, m) : _n || (j === null ? qe(e) : (Zt() || A?.is_fork) && j.set(e, t));
}
function ct(e) {
	if (e.effects !== null) for (let t of e.effects) (t.teardown || t.ac) && (t.teardown?.(), t.ac !== null && Ye(() => {
		t.ac.abort(pe), t.ac = null;
	}), t.fn !== null && (t.teardown = d), jn(t, 0), sn(t));
}
function lt(e) {
	if (e.effects !== null) for (let t of e.effects) t.teardown && t.fn !== null && Mn(t);
}
// node_modules/svelte/src/internal/client/reactivity/batch.js
var ut = null, A = null, dt = null, j = null, ft = null, pt = !1, mt = !1, ht = null, gt = null, _t = 0, vt = 1, yt = class e {
	id = vt++;
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
		ut === null ? ut = this : (ut.next = this, this.prev = ut), ut = this;
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
			for (var r of n.d) k(r, h), t(r);
			for (r of n.m) k(r, g), t(r);
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
					t.f ^= m;
				}
			}
			n || e.push(t);
		}
		return this.#a = [], e;
	}
	#m() {
		this.started = !0;
		for (let [e, t] of this.#s) k(e, t), this.schedule(e);
		this.apply();
		for (var t = ht = [], n = [], r = gt = []; this.#a.length > 0;) {
			_t++ > 1e3 && (this.#b(), bt());
			for (let e of this.#p()) try {
				this.#h(e, t, n);
			} catch (t) {
				throw wt(e), this.#d() || this.discard(), t;
			}
		}
		if (A = null, r.length > 0) {
			var i = e.ensure();
			for (let e of r) i.schedule(e);
		}
		if (ht = null, gt = null, this.#d()) {
			this.#y(n), this.#y(t);
			for (let [e, t] of this.#c) Ct(e, t);
			r.length > 0 && A.#m();
			return;
		}
		let a = this.#g();
		if (a) this.#y(n), this.#y(t), a.#v(this);
		else {
			this.#s.clear();
			for (let e of this.#e) e(this);
			this.#e.clear(), dt = this, xt(n), xt(t), dt = null, this.#i?.resolve();
			var o = A;
			this.#n === 0 && (this.#a.length === 0 || o !== null) && this.#b(), o !== null && (N.clear(), o.#m());
		}
	}
	#h(e, t, n) {
		e.f ^= m;
		for (var r = e.first; r !== null;) {
			var i = r.f, a = !!(i & 96);
			if (!(a && i & 1024 || i & 8192 || this.#c.has(r)) && r.fn !== null) {
				a ? r.f ^= m : i & 4 ? t.push(r) : En(r) && (i & 16 && this.add_dirty_reaction(r, g), Mn(r));
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
					r & 4194320 && !this.async_deriveds.has(i) && (this.#s.delete(i), k(i, h), this.schedule(i));
				}
			}
		};
		for (let e of this.current.keys()) t(e);
		this.oncommit(() => e.discard()), e.#b(), A = this, this.#m();
	}
	#y(e) {
		for (var t = 0; t < e.length; t += 1) Je(e[t], this.#s);
	}
	capture(e, t, n = !1) {
		e.v !== C && !this.previous.has(e) && this.previous.set(e, e.v), e.f & 8388608 || (this.current.set(e, [t, n]), j?.set(e, t)), this.is_fork || (e.v = t);
	}
	activate() {
		A = this;
	}
	deactivate() {
		A = null, j = null;
	}
	flush() {
		try {
			mt = !0, A = this, this.#m();
		} finally {
			_t = 0, ft = null, ht = null, gt = null, mt = !1, A = null, j = null, N.clear();
		}
	}
	discard() {
		for (let e of this.#t) e(this);
		this.#t.clear();
		for (let e of this.async_deriveds.values()) e.reject(tt);
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
		this.#u || (this.#u = !0, Ge(() => {
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
		return (this.#i ??= p()).promise;
	}
	static ensure() {
		if (A === null) {
			let t = A = new e();
			!mt && Ge(() => {
				t.started || t.flush();
			});
		}
		return A;
	}
	apply() {
		j = null;
	}
	schedule(e) {
		ft = e, e.b?.is_pending && e.f & 16777228 && !(e.f & 32768) ? e.b.defer_effect(e) : this.#a.push(e);
	}
	#b() {
		if (this.linked) {
			var e = this.prev, t = this.next;
			e === null || (e.next = t), t === null ? ut = e : t.prev = e, this.linked = !1;
		}
	}
};
function bt() {
	try {
		Me();
	} catch (e) {
		B(e, ft);
	}
}
var M = null;
function xt(e) {
	var t = e.length;
	if (t !== 0) {
		for (var n = 0; n < t;) {
			var r = e[n++];
			if (!(r.f & 24576) && En(r) && (M = /* @__PURE__ */ new Set(), Mn(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && un(r), M?.size > 0)) {
				N.clear();
				for (let e of M) {
					if (e.f & 24576) continue;
					let t = [e], n = e.parent;
					for (; n !== null;) M.has(n) && (M.delete(n), t.push(n)), n = n.parent;
					for (let e = t.length - 1; e >= 0; e--) {
						let n = t[e];
						n.f & 24576 || Mn(n);
					}
				}
				M.clear();
			}
		}
		M = null;
	}
}
function St(e) {
	A.schedule(e);
}
function Ct(e, t) {
	if (!(e.f & 32 && e.f & 1024)) {
		e.f & 2048 ? t.d.push(e) : e.f & 4096 && t.m.push(e), k(e, m);
		for (var n = e.first; n !== null;) Ct(n, t), n = n.next;
	}
}
function wt(e) {
	k(e, m);
	for (var t = e.first; t !== null;) wt(t), t = t.next;
}
// node_modules/svelte/src/internal/client/reactivity/sources.js
var Tt = /* @__PURE__ */ new Set(), N = /* @__PURE__ */ new Map(), Et = !1;
function Dt(e, t) {
	return {
		f: 0,
		v: e,
		reactions: null,
		equals: De,
		rv: 0,
		wv: 0
	};
}
/*#__NO_SIDE_EFFECTS__*/
function P(e, t) {
	let n = Dt(e, t);
	return yn(n), n;
}
/*#__NO_SIDE_EFFECTS__*/
function Ot(e, t = !1, n = !0) {
	let r = Dt(e);
	return t || (r.equals = ke), r;
}
function F(e, t, n = !1) {
	return U !== null && (!W || U.f & 131072) && He() && U.f & 4325394 && (J === null || !J.has(e)) && Ie(), jt(e, n ? Ft(t) : t, gt);
}
var kt = null, At = 0;
function jt(e, t, n = null) {
	if (!e.equals(t)) {
		_n ? N.set(e, t) : N.has(e) || N.set(e, e.v);
		var r = yt.ensure();
		if (r.capture(e, t), e.f & 2) {
			let t = e;
			e.f & 2048 && ot(t), j === null && qe(t);
		}
		e.wv = Tn(), kt = null, At = 0, Pt(e, h, n), kt = null, He() && K !== null && K.f & 1024 && !(K.f & 96) && (Z === null ? bn([e]) : Z.push(e)), !r.is_fork && Tt.size > 0 && !Et && Mt();
	}
	return t;
}
function Mt() {
	Et = !1;
	for (let e of Tt) {
		e.f & 1024 && k(e, g);
		let t;
		try {
			t = En(e);
		} catch {
			t = !0;
		}
		t && Mn(e);
	}
	Tt.clear();
}
function Nt(e) {
	F(e, e.v + 1);
}
function Pt(e, t, n) {
	var r = e.reactions;
	if (r !== null) {
		var i = He(), a = r.length;
		if (At += a, At > 1e5 && kt === null && (kt = /* @__PURE__ */ new Set()), kt !== null) {
			if (kt.has(e)) return;
			kt.add(e);
		}
		for (var o = 0; o < a; o++) {
			var s = r[o], c = s.f;
			if (i || s !== K) {
				var l = (c & h) === 0;
				if (l && k(s, t), c & 131072) Tt.add(s);
				else if (c & 2) {
					var u = s;
					j?.delete(u), Pt(u, g, n);
				} else if (l) {
					var d = s;
					c & 16 && M !== null && M.add(d), n === null ? St(d) : n.push(d);
				}
			}
		}
	}
}
function Ft(t) {
	if (typeof t != "object" || !t || ae in t || oe in t) return t;
	let n = l(t);
	if (n !== s && n !== c) return t;
	var r = /* @__PURE__ */ new Map(), i = e(t), o = /* @__PURE__ */ P(0), u = null, d = Cn, f = (e) => {
		if (Cn === d) return e();
		var t = U, n = Cn;
		G(null), wn(d);
		var r = e();
		return G(t), wn(n), r;
	};
	return i && r.set("length", /* @__PURE__ */ P(t.length, u)), new Proxy(t, {
		defineProperty(e, t, n) {
			"value" in n && n.configurable !== !1 && n.enumerable !== !1 && n.writable !== !1 || Pe();
			var i = r.get(t);
			return i === void 0 ? f(() => {
				var e = /* @__PURE__ */ P(n.value, u);
				return r.set(t, e), e;
			}) : F(i, n.value, !0), !0;
		},
		deleteProperty(e, t) {
			var n = r.get(t);
			if (n === void 0) {
				if (t in e) {
					let e = f(() => /* @__PURE__ */ P(C, u));
					r.set(t, e), Nt(o);
				}
			} else F(n, C), Nt(o);
			return !0;
		},
		get(e, n, i) {
			if (n === ae) return t;
			var o = r.get(n), s = n in e;
			if (o === void 0 && (!s || a(e, n)?.writable) && (o = f(() => /* @__PURE__ */ P(Ft(s ? e[n] : C), u)), r.set(n, o)), o !== void 0) {
				var c = Q(o);
				return c === C ? void 0 : c;
			}
			return Reflect.get(e, n, i);
		},
		getOwnPropertyDescriptor(e, t) {
			this.has?.(e, t);
			var n = Reflect.getOwnPropertyDescriptor(e, t), i = r.get(t);
			if (i !== void 0) {
				var a = Q(i);
				if (a === C) return;
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
			if (t === ae) return !0;
			var n = r.get(t), i = n !== void 0 && n.v !== C || Reflect.has(e, t);
			return (n !== void 0 || (K !== null || U !== null) && (!i || a(e, t)?.writable)) && (n === void 0 && (n = f(() => /* @__PURE__ */ P(i ? Ft(e[t]) : C, u)), r.set(t, n)), Q(n) === C) ? !1 : i;
		},
		set(e, t, n, s) {
			var c = r.get(t), l = t in e;
			if (i && t === "length") for (var d = n; d < c.v; d += 1) {
				var p = r.get(d + "");
				p === void 0 ? d in e && (p = f(() => /* @__PURE__ */ P(C, u)), r.set(d + "", p)) : F(p, C);
			}
			if (c === void 0) (!l || a(e, t)?.writable) && (c = f(() => /* @__PURE__ */ P(void 0, u)), F(c, Ft(n)), r.set(t, c));
			else {
				l = c.v !== C;
				var m = f(() => Ft(n));
				F(c, m);
			}
			var h = Reflect.getOwnPropertyDescriptor(e, t);
			if (h?.set && h.set.call(s, n), !l) {
				if (i && typeof t == "string") {
					var g = r.get("length"), _ = Number(t);
					Number.isInteger(_) && _ >= g.v && F(g, _ + 1);
				}
				Nt(o);
			}
			return !0;
		},
		ownKeys(e) {
			Q(o);
			var t = Reflect.ownKeys(e).filter((e) => {
				var t = r.get(e);
				return t === void 0 || t.v !== C;
			});
			for (var [n, i] of r) i.v !== C && !(n in e) && t.push(n);
			return t;
		},
		setPrototypeOf() {
			Fe();
		}
	});
}
var It, Lt, Rt, zt;
function Bt() {
	if (It === void 0) {
		It = window, Lt = /Firefox/.test(navigator.userAgent);
		var e = Element.prototype, t = Node.prototype, n = Text.prototype;
		Rt = a(t, "firstChild").get, zt = a(t, "nextSibling").get, u(e) && (e[ue] = void 0, e[le] = null, e[de] = void 0, e.__e = void 0), u(n) && (n[fe] = void 0);
	}
}
function I(e = "") {
	return document.createTextNode(e);
}
/*@__NO_SIDE_EFFECTS__*/
function L(e) {
	return Rt.call(e);
}
/*@__NO_SIDE_EFFECTS__*/
function R(e) {
	return zt.call(e);
}
function Vt(e, t) {
	if (!w) return /* @__PURE__ */ L(e);
	var n = /* @__PURE__ */ L(T);
	if (n === null) n = T.appendChild(I());
	else if (t && n.nodeType !== 3) {
		var r = I();
		return n?.before(r), E(r), r;
	}
	return t && qt(n), E(n), n;
}
function Ht(e, t = !1) {
	if (!w) {
		var n = /* @__PURE__ */ L(e);
		return n instanceof Comment && n.data === "" ? /* @__PURE__ */ R(n) : n;
	}
	if (t) {
		if (T?.nodeType !== 3) {
			var r = I();
			return T?.before(r), E(r), r;
		}
		qt(T);
	}
	return T;
}
function Ut(e, t = !1) {
	if (!w) return /* @__PURE__ */ L(e);
	var n = Vt(e, t);
	return D(e), n;
}
function z(e, t = 1, n = !1) {
	let r = w ? T : e;
	for (var i; t--;) i = r, r = /* @__PURE__ */ R(r);
	if (!w) return r;
	if (n) {
		if (r?.nodeType !== 3) {
			var a = I();
			return r === null ? i?.after(a) : r.before(a), E(a), a;
		}
		qt(r);
	}
	return E(r), r;
}
function Wt(e) {
	e.textContent = "";
}
function Gt() {
	return !1;
}
function Kt(e, t, n) {
	return t == null || t === "http://www.w3.org/1999/xhtml" ? n ? document.createElement(e, { is: n }) : document.createElement(e) : n ? document.createElementNS(t, e, { is: n }) : document.createElementNS(t, e);
}
function qt(e) {
	if (e.nodeValue.length < 65536) return;
	let t = e.nextSibling;
	for (; t !== null && t.nodeType === 3;) t.remove(), e.nodeValue += t.nodeValue, t = e.nextSibling;
}
function Jt(e) {
	var t = K;
	if (t === null) return U.f |= ie, e;
	if (!(t.f & 32768) && !(t.f & 4)) throw e;
	B(e, t);
}
function B(e, t) {
	if (e === he) throw e;
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
function Yt(e, t) {
	var n = t.last;
	n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function Xt(e, t) {
	var n = K;
	n !== null && n.f & 8192 && (e |= _);
	var r = {
		ctx: O,
		deps: null,
		nodes: null,
		f: e | h | 512,
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
	if (e & 4) ht === null ? yt.ensure().schedule(r) : ht.push(r);
	else if (t !== null) {
		try {
			Mn(r);
		} catch (e) {
			throw H(r), e;
		}
		i.deps === null && i.teardown === null && i.nodes === null && i.first === i.last && !(i.f & 524288) && (i = i.first, e & 16 && e & 65536 && i !== null && (i.f |= x));
	}
	if (i !== null && (i.parent = n, n !== null && Yt(i, n), U !== null && U.f & 2 && !(e & 64))) {
		var a = U;
		(a.effects ??= []).push(i);
	}
	return r;
}
function Zt() {
	return U !== null && !W;
}
function Qt(e) {
	let t = Xt(8, null);
	return k(t, m), t.teardown = e, t;
}
function $t(e) {
	return Xt(4 | ee, e);
}
function en(e) {
	yt.ensure();
	let t = Xt(64 | S, e);
	return (e = {}) => new Promise((n) => {
		e.outro ? dn(t, () => {
			H(t), n(void 0);
		}) : (H(t), n(void 0));
	});
}
function tn(e) {
	return Xt(re | S, e);
}
function nn(e, t = 0) {
	return Xt(8 | t, e);
}
function rn(e, t = [], n = [], r = []) {
	Xe(r, t, n, (t) => {
		Xt(8, () => {
			e(...t.map(Q));
		});
	});
}
function an(e, t = 0) {
	return Xt(16 | t, e);
}
function V(e) {
	return Xt(32 | S, e);
}
function on(e) {
	var t = e.teardown;
	if (t !== null) {
		let n = _n, r = U;
		vn(!0), G(null);
		try {
			t.call(null);
		} catch (t) {
			B(t, e.parent);
		} finally {
			vn(n), G(r);
		}
	}
}
function sn(e, t = !1) {
	var n = e.first;
	for (e.first = e.last = null; n !== null;) {
		let e = n.ac;
		e !== null && Ye(() => {
			e.abort(pe);
		});
		var r = n.next;
		n.f & 64 ? n.parent = null : H(n, t), n = r;
	}
}
function cn(e) {
	for (var t = e.first; t !== null;) {
		var n = t.next;
		t.f & 32 || H(t), t = n;
	}
}
function H(e, t = !0) {
	var n = !1;
	(t || e.f & 262144) && e.nodes !== null && e.nodes.end !== null && (ln(e.nodes.start, e.nodes.end), n = !0), e.f |= b, sn(e, t && !n), jn(e, 0);
	var r = e.nodes && e.nodes.t;
	if (r !== null) for (let e of r) e.stop();
	on(e), e.f ^= b, e.f |= v;
	var i = e.parent;
	i !== null && i.first !== null && un(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = e.b = null;
}
function ln(e, t) {
	for (; e !== null;) {
		var n = e === t ? null : /* @__PURE__ */ R(e);
		e.remove(), e = n;
	}
}
function un(e) {
	var t = e.parent, n = e.prev, r = e.next;
	n !== null && (n.next = r), r !== null && (r.prev = n), t !== null && (t.first === e && (t.first = r), t.last === e && (t.last = n));
}
function dn(e, t, n = !0) {
	var r = [];
	e.f |= 256, fn(e, r, !0);
	var i = () => {
		n && H(e), t && t();
	}, a = r.length;
	if (a > 0) {
		var o = () => --a || i();
		for (var s of r) s.out(o);
	} else i();
}
function fn(e, t, n) {
	if (!(e.f & 8192)) {
		e.f ^= _;
		var r = e.nodes && e.nodes.t;
		if (r !== null) for (let e of r) (e.is_global || n) && t.push(e);
		for (var i = e.first; i !== null;) {
			var a = i.next;
			if (!(i.f & 64)) {
				var o = !!(i.f & 65536) || !!(i.f & 32) && !!(e.f & 16);
				fn(i, t, o ? n : !1);
			}
			i = a;
		}
	}
}
function pn(e) {
	e.f &= -257, mn(e, !0);
}
function mn(e, t) {
	if (!(e.f & 256) && e.f & 8192) {
		e.f ^= _, e.f & 1024 || (k(e, h), yt.ensure().schedule(e));
		for (var n = e.first; n !== null;) {
			var r = n.next, i = !!(n.f & 65536) || !!(n.f & 32);
			mn(n, i ? t : !1), n = r;
		}
		var a = e.nodes && e.nodes.t;
		if (a !== null) for (let e of a) (e.is_global || t) && e.in();
	}
}
function hn(e, t) {
	if (e.nodes) for (var n = e.nodes.start, r = e.nodes.end; n !== null;) {
		var i = n === r ? null : /* @__PURE__ */ R(n);
		t.append(n), n = i;
	}
}
// node_modules/svelte/src/internal/client/legacy.js
var gn = null, _n = !1;
function vn(e) {
	_n = e;
}
var U = null, W = !1;
function G(e) {
	U = e;
}
var K = null;
function q(e) {
	K = e;
}
var J = null;
function yn(e) {
	U !== null && (U.f & 2097152 || U.f & 2) && (J ??= /* @__PURE__ */ new Set()).add(e);
}
var Y = null, X = 0, Z = null;
function bn(e) {
	Z = e;
}
var xn = 1, Sn = 0, Cn = Sn;
function wn(e) {
	Cn = e;
}
function Tn() {
	return ++xn;
}
function En(e) {
	var t = e.f;
	if (t & 2048) return !0;
	if (t & 4096) {
		for (var n = e.deps, r = n.length, i = 0; i < r; i++) {
			var a = n[i];
			if (En(a) && st(a), a.wv > e.wv) return !0;
		}
		t & 512 && j === null && k(e, m);
	}
	return !1;
}
function Dn(e, t, n = !0) {
	var r = e.reactions;
	if (r !== null && !(J !== null && J.has(e))) for (var i = 0; i < r.length; i++) {
		var a = r[i];
		a.f & 2 ? Dn(a, t, !1) : t === a && (n ? k(a, h) : a.f & 1024 && k(a, g), St(a));
	}
}
function On(e) {
	var t = Y, n = X, r = Z, i = U, a = J, o = O, s = W, c = Cn, l = e.f;
	Y = null, X = 0, Z = null, U = l & 96 ? null : e, J = null, Re(e.ctx), W = !1, Cn = ++Sn, e.ac !== null && (Ye(() => {
		e.ac.abort(pe);
	}), e.ac = null);
	try {
		e.f |= ne;
		var u = e.fn, d = u();
		e.f |= y;
		var f = kn(e);
		if (He() && Z !== null && !W && f !== null && !(e.f & 6146)) for (var p = 0; p < Z.length; p++) Dn(Z[p], e);
		if (i !== null && i !== e) {
			if (Sn++, i.deps !== null) for (let e = 0; e < n; e += 1) i.deps[e].rv = Sn;
			if (t !== null) for (let e of t) e.rv = Sn;
			Z !== null && (r === null ? r = Z : r.push(...Z));
		}
		return e.f & 8388608 && (e.f ^= ie), d;
	} catch (t) {
		return kn(e), Jt(t);
	} finally {
		e.f ^= ne, Y = t, X = n, Z = r, U = i, J = a, Re(o), W = s, Cn = c;
	}
}
function kn(e) {
	var t = e.deps, n = A?.is_fork;
	if (Y !== null) {
		var r;
		if (n || jn(e, X), t !== null && X > 0) for (t.length = X + Y.length, r = 0; r < Y.length; r++) t[X + r] = Y[r];
		else e.deps = t = Y;
		if (Zt() && e.f & 512) for (r = X; r < t.length; r++) (t[r].reactions ??= []).push(e);
	} else !n && t !== null && X < t.length && (jn(e, X), t.length = X);
	return t;
}
function An(e, r) {
	let i = r.reactions;
	if (i !== null) {
		var a = t.call(i, e);
		if (a !== -1) {
			var o = i.length - 1;
			o === 0 ? i = r.reactions = null : (i[a] = i[o], i.pop());
		}
	}
	if (i === null && r.f & 2 && (Y === null || !n.call(Y, r))) {
		var s = r;
		s.f & 512 && (s.f ^= 512), s.v !== C && qe(s), s.ac !== null && Ye(() => {
			s.ac.abort(pe), s.ac = null, k(s, h);
		}), ct(s), jn(s, 0);
	}
}
function jn(e, t) {
	var n = e.deps;
	if (n !== null) for (var r = t; r < n.length; r++) An(e, n[r]);
}
function Mn(e) {
	var t = e.f;
	if (!(t & 16384)) {
		k(e, m);
		var n = K;
		K = e;
		try {
			t & 16777232 ? cn(e) : sn(e), on(e);
			var r = On(e);
			e.teardown = typeof r == "function" ? r : null, e.wv = xn;
		} finally {
			K = n;
		}
	}
}
function Q(e) {
	var t = !!(e.f & 2);
	if (gn?.add(e), U !== null && !W && !(K !== null && K.f & 16384) && (J === null || !J.has(e))) {
		var r = U.deps;
		if (U.f & 2097152) e.rv < Sn && (e.rv = Sn, Y === null && r !== null && r[X] === e ? X++ : Y === null ? Y = [e] : Y.push(e));
		else {
			U.deps ??= [], n.call(U.deps, e) || U.deps.push(e);
			var i = e.reactions;
			i === null ? e.reactions = [U] : n.call(i, U) || i.push(U);
		}
	}
	if (_n && N.has(e)) return N.get(e);
	if (t) {
		var a = e;
		if (_n) {
			var o = a.v;
			return (!(a.f & 1024) && a.reactions !== null || Pn(a)) && (o = ot(a)), N.set(a, o), o;
		}
		var s = !(a.f & 512) && !W && U !== null && !!(U.f & 512), c = (a.f & y) === 0;
		En(a) && (s && (a.f |= 512), st(a)), s && !c && (lt(a), Nn(a));
	}
	if (j?.has(e)) return j.get(e);
	if (e.f & 8388608) throw e.v;
	return e.v;
}
function Nn(e) {
	if (e.f |= 512, e.deps !== null) for (let r of e.deps) {
		var t = r.reactions;
		t === null ? r.reactions = [e] : n.call(t, e) || t.push(e), r.f & 2 && !(r.f & 512) && (lt(r), Nn(r));
	}
}
function Pn(e) {
	if (e.v === C) return !0;
	if (e.deps === null) return !1;
	for (let t of e.deps) if (N.has(t) || t.f & 2 && Pn(t)) return !0;
	return !1;
}
function Fn(e) {
	var t = W;
	try {
		return W = !0, e();
	} finally {
		W = t;
	}
}
[.../* @__PURE__ */ "allowfullscreen.async.autofocus.autoplay.checked.controls.default.disabled.formnovalidate.indeterminate.inert.ismap.loop.multiple.muted.nomodule.novalidate.open.playsinline.readonly.required.reversed.seamless.selected.webkitdirectory.defer.disablepictureinpicture.disableremoteplayback".split(".")];
var In = ["touchstart", "touchmove"];
function Ln(e) {
	return In.includes(e);
}
// node_modules/svelte/src/internal/client/dom/elements/events.js
var Rn = Symbol("events"), zn = /* @__PURE__ */ new Set(), Bn = /* @__PURE__ */ new Set();
function Vn(e, t, n) {
	(t[Rn] ??= {})[e] = n;
}
function Hn(e) {
	for (var t = 0; t < e.length; t++) zn.add(e[t]);
	for (var n of Bn) n(e);
}
var Un = null, Wn = !1;
function Gn(e) {
	var t = this, n = t.ownerDocument, r = e.type, a = e.composedPath?.() || [], o = a[0] || e.target;
	Un = e, Wn || (Wn = !0, setTimeout(() => {
		Wn = !1, Un = null;
	}));
	var s = 0, c = Un === e && e[Rn];
	if (c) {
		var l = a.indexOf(c);
		if (l !== -1 && (t === document || t === window)) {
			e[Rn] = t;
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
		var d = U, f = K;
		G(null), q(null);
		try {
			for (var p, m = []; o !== null && o !== t;) {
				try {
					var h = o[Rn]?.[r];
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
			e[Rn] = t, delete e.currentTarget, G(d), q(f);
		}
	}
}
// node_modules/svelte/src/internal/client/dom/reconciler.js
var Kn = globalThis?.window?.trustedTypes && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", { createHTML: (e) => e });
function qn(e) {
	return Kn?.createHTML(e) ?? e;
}
function Jn(e) {
	var t = Kt("template");
	return t.innerHTML = qn(e.replaceAll("<!>", "<!---->")), t.content;
}
// node_modules/svelte/src/internal/client/dom/template.js
function Yn(e, t) {
	var n = K;
	n.nodes === null && (n.nodes = {
		start: e,
		end: t,
		a: null,
		t: null
	});
}
/*#__NO_SIDE_EFFECTS__*/
function Xn(e, t) {
	var n = !!(t & 1), r = !!(t & 2), i, a = !e.startsWith("<!>");
	return () => {
		if (w) return Yn(T, null), T;
		i === void 0 && (i = Jn(a ? e : "<!>" + e), n || (i = /* @__PURE__ */ L(i)));
		var t = r || Lt ? document.importNode(i, !0) : i.cloneNode(!0);
		if (n) {
			var o = /* @__PURE__ */ L(t), s = t.lastChild;
			Yn(o, s);
		} else Yn(t, t);
		return t;
	};
}
function Zn(e, t) {
	if (w) {
		var n = K;
		n.f & 32768 && n.nodes.end !== null || (n.nodes.end = T), Ce();
	} else e !== null && e.before(t);
}
// node_modules/svelte/src/reactivity/create-subscriber.js
function Qn(e) {
	let t = 0, n = Dt(0), r;
	return () => {
		Zt() && (Q(n), nn(() => (t === 0 && (r = Fn(() => e(() => Nt(n)))), t += 1, () => {
			Ge(() => {
				--t, t === 0 && (r?.(), r = void 0, Nt(n));
			});
		})));
	};
}
// node_modules/svelte/src/internal/client/dom/blocks/boundary.js
var $n = x | S;
function er(e, t, n, r) {
	new tr(e, t, n, r);
}
var tr = class {
	parent;
	is_pending = !1;
	transform_error;
	#e;
	#t = w ? T : null;
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
	#m = Qn(() => (this.#p = Dt(this.#l), () => {
		this.#p = null;
	}));
	constructor(e, t, n, r) {
		this.#e = e, this.#n = t, this.#r = (e) => {
			var t = K;
			t.b = this, t.f |= 128, n(e);
		}, this.parent = K.b, this.transform_error = r ?? this.parent?.transform_error ?? ((e) => e), this.#i = an(() => {
			if (w) {
				let e = Ee(this.#t);
				Ce();
				let t = e === "[!";
				if (e.startsWith("[?")) {
					let t = JSON.parse(e.slice(2));
					this.#g(t);
				} else t ? this.#y() : this.#h();
			} else this.#b();
		}, $n), w && (this.#e = T);
	}
	#h() {
		try {
			this.#a = V(() => this.#r(this.#e));
		} catch (e) {
			this.error(e);
		}
	}
	#g(e) {
		let t = this.#n.failed, { reset: n, invoke_onerror: r } = this.#_(e);
		Ge(r), t && (this.#s = V(() => {
			t(this.#e, () => e, () => n);
		}));
	}
	#_(e) {
		var t = !1, n = !1;
		let r = () => {
			this.#v() || (t ? xe() : (t = !0, n && Le(), this.#s !== null && dn(this.#s, () => {
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
					B(e, this.#i && this.#i.parent);
				}
			}
		};
	}
	#v() {
		return (this.#i.f & (v | b)) !== 0;
	}
	#y() {
		let e = this.#n.pending;
		e && (this.is_pending = !0, this.#o = V(() => e(this.#e)), Ge(() => {
			if (!this.#v()) {
				var e = this.#c = document.createDocumentFragment(), t = I(), n = !1;
				e.append(t), this.#a = this.#S(() => {
					try {
						return V(() => this.#r(t));
					} catch (e) {
						try {
							this.error(e), n = !0;
						} catch (e) {
							B(e, this.#i.parent);
						}
						return null;
					}
				}), this.#a === null ? (this.#c = null, n && this.#x(A)) : this.#u === 0 && (this.#e.before(e), this.#c = null, dn(this.#o, () => {
					this.#o = null;
				}), this.#x(A));
			}
		}));
	}
	#b() {
		try {
			if (this.is_pending = this.has_pending_snippet(), this.#u = 0, this.#l = 0, this.#a = V(() => {
				this.#r(this.#e);
			}), this.#u > 0) {
				var e = this.#c = document.createDocumentFragment();
				hn(this.#a, e);
				let t = this.#n.pending;
				this.#o = V(() => t(this.#e));
			} else this.#x(A);
		} catch (e) {
			this.error(e);
		}
	}
	#x(e) {
		this.is_pending = !1, e.transfer_reactions(this.#f);
	}
	defer_effect(e) {
		Je(e, this.#f);
	}
	is_rendered() {
		return !this.is_pending && (!this.parent || this.parent.is_rendered());
	}
	has_pending_snippet() {
		return !!this.#n.pending;
	}
	#S(e) {
		var t = K, n = U, r = O;
		q(this.#i), G(this.#i), Re(this.#i.ctx);
		try {
			return yt.ensure(), e();
		} finally {
			q(t), G(n), Re(r);
		}
	}
	#C(e, t) {
		this.has_pending_snippet() ? (this.#u += e, this.#u === 0 && (this.#x(t), this.#o && dn(this.#o, () => {
			this.#o = null;
		}), this.#c &&= (this.#e.before(this.#c), null))) : this.parent && this.parent.#C(e, t);
	}
	update_pending_count(e, t) {
		this.#C(e, t), this.#l += e, !this.#p || this.#d || (this.#d = !0, Ge(() => {
			this.#d = !1, this.#p && jt(this.#p, this.#l);
		}));
	}
	get_effect_pending() {
		return this.#m(), Q(this.#p);
	}
	error(e) {
		if (e === he || !this.#n.onerror && !this.#n.failed) throw e;
		A?.is_fork ? (this.#a && A.skip_effect(this.#a), this.#o && A.skip_effect(this.#o), this.#s && A.skip_effect(this.#s), A.oncommit(() => {
			this.#v() || this.#w(e);
		})) : this.#w(e);
	}
	#w(e) {
		this.#a &&= (H(this.#a), null), this.#o &&= (H(this.#o), null), this.#s &&= (H(this.#s), null), w && (E(this.#t), we(), E(Te()));
		let t = this.#n.failed, n = (e) => {
			if (this.#v()) return;
			let { reset: n, invoke_onerror: r } = this.#_(e);
			r(), t && !this.#v() && (this.#s = this.#S(() => {
				try {
					return V(() => {
						var r = K;
						r.b = this, r.f |= 128, t(this.#e, () => e, () => n);
					});
				} catch (e) {
					return B(e, this.#i.parent), null;
				}
			}));
		};
		Ge(() => {
			if (!this.#v()) {
				var t;
				try {
					t = this.transform_error(e);
				} catch (e) {
					B(e, this.#i && this.#i.parent);
					return;
				}
				typeof t == "object" && t && typeof t.then == "function" ? t.then(n, (e) => B(e, this.#i && this.#i.parent)) : n(t);
			}
		});
	}
};
function $(e, t) {
	var n = t == null ? "" : typeof t == "object" ? `${t}` : t;
	n !== (e[fe] ??= e.nodeValue) && (e[fe] = n, e.nodeValue = `${n}`);
}
function nr(e, t) {
	return ir(e, t);
}
var rr = /* @__PURE__ */ new Map();
function ir(e, { target: t, anchor: n, props: i = {}, events: a, context: o, intro: s = !0, transformError: c }) {
	Bt();
	var l = void 0, u = en(() => {
		var s = n ?? t.appendChild(I());
		er(s, { pending: () => {} }, (t) => {
			ze({});
			var n = O;
			if (o && (n.c = o), a && (i.$$events = a), w && Yn(t, null), l = e(t, i) || Ve(), w && (K.nodes.end = T, T === null || T.nodeType !== 8 || T.data !== "]")) throw be(), he;
			Be();
		}, c);
		var u = /* @__PURE__ */ new Set(), d = (e) => {
			for (var n = 0; n < e.length; n++) {
				var r = e[n];
				if (!u.has(r)) {
					u.add(r);
					var i = Ln(r);
					for (let e of [t, document]) {
						var a = rr.get(e);
						a === void 0 && (a = /* @__PURE__ */ new Map(), rr.set(e, a));
						var o = a.get(r);
						o === void 0 ? (e.addEventListener(r, Gn, { passive: i }), a.set(r, 1)) : a.set(r, o + 1);
					}
				}
			}
		};
		return d(r(zn)), Bn.add(d), () => {
			for (var e of u) for (let n of [t, document]) {
				var r = rr.get(n), i = r.get(e);
				--i == 0 ? (n.removeEventListener(e, Gn), r.delete(e), r.size === 0 && rr.delete(n)) : r.set(e, i);
			}
			Bn.delete(d), s !== n && s.parentNode?.removeChild(s);
		};
	});
	return ar.set(l, u), l;
}
var ar = /* @__PURE__ */ new WeakMap();
function or(e, t) {
	let n = ar.get(e);
	return n ? (ar.delete(e), n(t)) : Promise.resolve();
}
// node_modules/svelte/src/internal/client/dom/blocks/branches.js
var sr = class {
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
			if (n) pn(n), this.#r.delete(t);
			else {
				var r = this.#n.get(t);
				r && (pn(r.effect), this.#t.set(t, r.effect), this.#n.delete(t), r.fragment.lastChild.remove(), this.anchor.before(r.fragment), n = r.effect);
			}
			for (let [t, n] of this.#e) {
				if (this.#e.delete(t), t === e) break;
				let r = this.#n.get(n);
				r && (H(r.effect), this.#n.delete(n));
			}
			for (let [e, r] of this.#t) {
				if (e === t || this.#r.has(e)) continue;
				let i = () => {
					if (Array.from(this.#e.values()).includes(e)) {
						var t = document.createDocumentFragment();
						hn(r, t), t.append(I()), this.#n.set(e, {
							effect: r,
							fragment: t
						});
					} else H(r);
					this.#r.delete(e), this.#t.delete(e);
				};
				this.#i || !n ? (this.#r.add(e), dn(r, i, !1)) : i();
			}
		}
	};
	#o = (e) => {
		this.#e.delete(e);
		let t = Array.from(this.#e.values());
		for (let [e, n] of this.#n) t.includes(e) || (H(n.effect), this.#n.delete(e));
	};
	ensure(e, t) {
		var n = A, r = Gt();
		if (t && !this.#t.has(e) && !this.#n.has(e)) {
			if (r) {
				var i = document.createDocumentFragment(), a = I();
				i.append(a), this.#n.set(e, {
					effect: V(() => t(a)),
					fragment: i
				});
			} else this.#t.set(e, V(() => t(this.anchor)));
		}
		if (this.#e.set(n, e), r) {
			for (let [t, r] of this.#t) t === e ? n.unskip_effect(r) : n.skip_effect(r);
			for (let [t, r] of this.#n) t === e ? n.unskip_effect(r.effect) : n.skip_effect(r.effect);
			n.oncommit(this.#a), n.ondiscard(this.#o);
		} else w && (this.anchor = T), this.#a(n);
	}
};
// node_modules/svelte/src/internal/client/dom/blocks/if.js
function cr(e, t, n = !1) {
	var r;
	w && (r = T, Ce());
	var i = new sr(e), a = n ? x : 0;
	function o(e, t) {
		if (w) {
			var n = Ee(r);
			if (e !== parseInt(n.substring(1))) {
				var a = Te();
				E(a), i.anchor = a, Se(!1), i.ensure(e, t), Se(!0);
				return;
			}
		}
		i.ensure(e, t);
	}
	an(() => {
		var e = !1;
		t((t, n = 0) => {
			e = !0, o(n, t);
		}), e || o(-1, null);
	}, a);
}
// node_modules/svelte/src/internal/client/dom/blocks/each.js
function lr(e, t, n) {
	for (var i = [], a = t.length, o, s = t.length, c = 0; c < a; c++) {
		let n = t[c];
		dn(n, () => {
			if (o) {
				if (o.pending.delete(n), o.done.add(n), o.pending.size === 0) {
					var t = e.outrogroups;
					ur(e, r(o.done)), t.delete(o), t.size === 0 && (e.outrogroups = null);
				}
			} else --s;
		}, !1);
	}
	if (s === 0) {
		var l = i.length === 0 && n !== null && e.pending.size === 0;
		if (l) {
			var u = n, d = u.parentNode;
			Wt(d), d.append(u), e.items.clear();
		}
		ur(e, t, !l);
	} else o = {
		pending: new Set(t),
		done: /* @__PURE__ */ new Set()
	}, (e.outrogroups ??= /* @__PURE__ */ new Set()).add(o);
}
function ur(e, t, n = !0) {
	var r;
	if (e.pending.size > 0) {
		r = /* @__PURE__ */ new Set();
		for (let t of e.pending.values()) for (let n of t) r.add(e.items.get(n).e);
	}
	for (var i = 0; i < t.length; i++) {
		var a = t[i];
		r?.has(a) ? (a.f |= te, hn(a, document.createDocumentFragment())) : H(t[i], n);
	}
}
var dr;
function fr(t, n, i, a, o, s = null) {
	var c = t, l = /* @__PURE__ */ new Map();
	if (n & 4) {
		var u = t;
		c = w ? E(/* @__PURE__ */ L(u)) : u.appendChild(I());
	}
	w && Ce();
	var d = null, f = /* @__PURE__ */ it(() => {
		var t = i();
		return e(t) ? t : t == null ? [] : r(t);
	}), p = /* @__PURE__ */ new Map(), m = !0;
	function h(e) {
		if (!(_.effect.f & 16384)) {
			_.pending.delete(e);
			var t = Q(f);
			_.fallback = d, mr(_, t, c, n, a), d !== null && (t.length === 0 ? d.f & 33554432 ? (d.f ^= te, gr(d, null, c)) : pn(d) : dn(d, () => {
				d = null;
			}));
		}
	}
	function g(e) {
		_.pending.delete(e);
	}
	var _ = {
		effect: an(() => {
			var e = Q(f), t = e.length;
			let r = !1;
			w && Ee(c) === "[!" != (t === 0) && (c = Te(), E(c), Se(!1), r = !0);
			for (var u = /* @__PURE__ */ new Set(), _ = A, v = Gt(), y = 0; y < t; y += 1) {
				w && T.nodeType === 8 && T.data === "]" && (c = T, r = !0, Se(!1));
				var b = e[y], x = a(b, y), S = m ? null : l.get(x);
				S ? (S.v && jt(S.v, b), S.i && jt(S.i, y), v && _.unskip_effect(S.e)) : (S = hr(l, m ? c : dr ??= I(), b, x, y, o, n, i), m || (S.e.f |= te), l.set(x, S)), u.add(x);
			}
			if (t === 0 && s && !d && (m ? d = V(() => s(c)) : (d = V(() => s(dr ??= I())), d.f |= te)), t > u.size && je("", "", ""), w && t > 0 && E(Te()), !m) {
				if (p.set(_, u), v) {
					for (let [e, t] of l) u.has(e) || _.skip_effect(t.e);
					_.oncommit(h), _.ondiscard(g);
				} else h(_);
			}
			r && Se(!0), Q(f);
		}),
		flags: n,
		items: l,
		pending: p,
		outrogroups: null,
		fallback: d
	};
	m = !1, w && (c = T);
}
function pr(e) {
	for (; e !== null && !(e.f & 32);) e = e.next;
	return e;
}
function mr(e, t, n, i, a) {
	var o = !!(i & 8), s = t.length, c = e.items, l = pr(e.effect.first), u, d = null, f, p = [], m = [], h, g, _, v;
	if (o) for (v = 0; v < s; v += 1) h = t[v], g = a(h, v), _ = c.get(g).e, _.f & 33554432 || (_.nodes?.a?.measure(), (f ??= /* @__PURE__ */ new Set()).add(_));
	for (v = 0; v < s; v += 1) {
		if (h = t[v], g = a(h, v), _ = c.get(g).e, e.outrogroups !== null) for (let t of e.outrogroups) t.pending.delete(_), t.done.delete(_);
		if (_.f & 8192 && (pn(_), o && (_.nodes?.a?.unfix(), (f ??= /* @__PURE__ */ new Set()).delete(_))), _.f & 33554432) {
			if (_.f ^= te, _ === l) gr(_, null, n);
			else {
				var y = d ? d.next : l;
				_ === e.effect.last && (e.effect.last = _.prev), _.prev && (_.prev.next = _.next), _.next && (_.next.prev = _.prev), _r(e, d, _), _r(e, _, y), gr(_, y, n), d = _, p = [], m = [], l = pr(d.next);
				continue;
			}
		}
		if (_ !== l) {
			if (u !== void 0 && u.has(_)) {
				if (p.length < m.length) {
					var b = m[0], x;
					d = b.prev;
					var S = p[0], ee = p[p.length - 1];
					for (x = 0; x < p.length; x += 1) gr(p[x], b, n);
					for (x = 0; x < m.length; x += 1) u.delete(m[x]);
					_r(e, S.prev, ee.next), _r(e, d, S), _r(e, ee, b), l = b, d = ee, --v, p = [], m = [];
				} else u.delete(_), gr(_, l, n), _r(e, _.prev, _.next), _r(e, _, d === null ? e.effect.first : d.next), _r(e, d, _), d = _;
				continue;
			}
			for (p = [], m = []; l !== null && l !== _;) (u ??= /* @__PURE__ */ new Set()).add(l), m.push(l), l = pr(l.next);
			if (l === null) continue;
		}
		_.f & 33554432 || p.push(_), d = _, l = pr(_.next);
	}
	if (e.outrogroups !== null) {
		for (let t of e.outrogroups) t.pending.size === 0 && (ur(e, r(t.done)), e.outrogroups?.delete(t));
		e.outrogroups.size === 0 && (e.outrogroups = null);
	}
	if (l !== null || u !== void 0) {
		var ne = [];
		if (u !== void 0) for (_ of u) _.f & 8192 || ne.push(_);
		for (; l !== null;) !(l.f & 8192) && l !== e.fallback && ne.push(l), l = pr(l.next);
		var re = ne.length;
		if (re > 0) {
			var ie = i & 4 && s === 0 ? n : null;
			if (o) {
				for (v = 0; v < re; v += 1) ne[v].nodes?.a?.measure();
				for (v = 0; v < re; v += 1) ne[v].nodes?.a?.fix();
			}
			lr(e, ne, ie);
		}
	}
	o && Ge(() => {
		if (f !== void 0) for (_ of f) _.nodes?.a?.apply();
	});
}
function hr(e, t, n, r, i, a, o, s) {
	var c = o & 1 ? o & 16 ? Dt(n) : /* @__PURE__ */ Ot(n, !1, !1) : null, l = o & 2 ? Dt(i) : null;
	return {
		v: c,
		i: l,
		e: V(() => (a(t, c ?? n, l ?? i, s), () => {
			e.delete(r);
		}))
	};
}
function gr(e, t, n) {
	if (e.nodes) for (var r = e.nodes.start, i = e.nodes.end, a = t && !(t.f & 33554432) ? t.nodes.start : n; r !== null;) {
		var o = /* @__PURE__ */ R(r);
		if (a.before(r), r === i) return;
		r = o;
	}
}
function _r(e, t, n) {
	t === null ? e.effect.first = n : t.next = n, n === null ? e.effect.last = t : n.prev = t;
}
function vr(e, t, n = !1, r = !1, i = !1, a = !1) {
	var o = e, s = "";
	if (n) {
		var c = e;
		w && (o = E(/* @__PURE__ */ L(c)));
	}
	rn(() => {
		var e = K;
		if (s === (s = t() ?? "")) w && Ce();
		else if (n && !w) e.nodes = null, c.innerHTML = s, s !== "" && Yn(/* @__PURE__ */ L(c), c.lastChild);
		else if (e.nodes !== null && (ln(e.nodes.start, e.nodes.end), e.nodes = null), s !== "") {
			if (w) {
				for (var a = T.data, l = Ce(), u = l; l !== null && (l.nodeType !== 8 || l.data !== "");) u = l, l = /* @__PURE__ */ R(l);
				if (l === null) throw be(), he;
				Yn(T, u), o = E(l);
			} else {
				var d = Kt(r ? "svg" : i ? "math" : "template", r ? _e : i ? ve : void 0);
				d.innerHTML = s;
				var f = r || i ? d : d.content;
				if (Yn(/* @__PURE__ */ L(f), f.lastChild), r || i) for (; /* @__PURE__ */ L(f);) o.before(/* @__PURE__ */ L(f));
				else o.before(f);
			}
		}
	});
}
// node_modules/svelte/src/internal/shared/attributes.js
var yr = [..." 	\n\r\f\xA0\v﻿"];
function br(e, t, n) {
	var r = e == null ? "" : "" + e;
	if (t && (r = r ? r + " " + t : t), n) {
		for (var i of Object.keys(n)) if (n[i]) r = r ? r + " " + i : i;
		else if (r.length) for (var a = i.length, o = 0; (o = r.indexOf(i, o)) >= 0;) {
			var s = o + a;
			(o === 0 || yr.includes(r[o - 1])) && (s === r.length || yr.includes(r[s])) ? r = (o === 0 ? "" : r.substring(0, o)) + r.substring(s + 1) : o = s;
		}
	}
	return r === "" ? null : r;
}
// node_modules/svelte/src/internal/client/dom/elements/class.js
function xr(e, t, n, r, i, a) {
	var o = e[ue];
	if (w || o !== n || o === void 0) {
		var s = br(n, r, a);
		w && s === e.getAttribute("class") || (s == null ? e.removeAttribute("class") : t ? e.className = s : e.setAttribute("class", s)), e[ue] = n;
	} else if (a && i !== a) for (var c in a) {
		var l = !!a[c];
		(i == null || l !== !!i[c]) && e.classList.toggle(c, l);
	}
	return a;
}
// node_modules/svelte/src/internal/client/dom/elements/attributes.js
var Sr = Symbol("is custom element"), Cr = Symbol("is html"), wr = me ? "link" : "LINK";
function Tr(e, t, n, r) {
	var i = Er(e);
	if (!(w && (i[t] = e.getAttribute(t), t === "src" || t === "srcset" || t === "href" && e.nodeName === wr))) {
		var a = i[t];
		a !== (i[t] = n) && (t === "loading" && (e[ce] = n), n == null ? e.removeAttribute(t) : typeof n != "string" && Or(e).has(t) ? e[t] = n : (!w || typeof n != "number" && typeof n != "boolean" || a !== String(n)) && e.setAttribute(t, n));
	}
}
function Er(e) {
	return e[le] ??= {
		[Sr]: e.nodeName.includes("-"),
		[Cr]: e.namespaceURI === ge
	};
}
var Dr = /* @__PURE__ */ new Map();
function Or(e) {
	var t = e.getAttribute("is") || e.nodeName, n = Dr.get(t);
	if (n) return n;
	Dr.set(t, n = /* @__PURE__ */ new Set());
	for (var r, i = e, a = Element.prototype; a !== i;) {
		for (var s in r = o(i), r) r[s].set && s !== "innerHTML" && s !== "textContent" && s !== "innerText" && n.add(s);
		i = l(i);
	}
	return n;
}
// node_modules/svelte/src/internal/client/reactivity/store.js
var kr = !1;
function Ar(e) {
	var t = kr;
	try {
		return kr = !1, [e(), kr];
	} finally {
		kr = t;
	}
}
// node_modules/svelte/src/internal/client/reactivity/props.js
function jr(e, t, n, r) {
	var i = !0, o = !!(n & 8), s = !!(n & 16), c = r, l = !0, u = void 0, d = () => s && i ? (u ??= /* @__PURE__ */ et(r), Q(u)) : (l && (l = !1, c = s ? Fn(r) : r), c);
	let f;
	if (o) {
		var p = ae in e || se in e;
		f = a(e, t)?.set ?? (p && t in e ? (n) => e[t] = n : void 0);
	}
	var m, h = !1;
	o ? [m, h] = Ar(() => e[t]) : m = e[t], m === void 0 && r !== void 0 && (m = d(), f && (i && Ne(t), f(m)));
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
	var v = !1, y = (n & 1 ? et : it)(() => (v = !1, g()));
	o && Q(y);
	var b = K;
	return (function(e, t) {
		if (arguments.length > 0) {
			let n = t ? Q(y) : i && o ? Ft(e) : e;
			return F(y, n), v = !0, c !== void 0 && (c = n), e;
		}
		return _n && v || b.f & 16384 ? y.v : Q(y);
	});
}
// node_modules/svelte/src/internal/disclose-version.js
typeof window < "u" && ((window.__svelte ??= {}).v ??= /* @__PURE__ */ new Set()).add("5");
// svelte/Inbox.svelte
var Mr = /* @__PURE__ */ Xn("<div class=\"ibTabs\" role=\"tablist\"><button type=\"button\"> <small> </small></button> <button type=\"button\"> <small> </small></button></div>"), Nr = /* @__PURE__ */ Xn("<b> </b>"), Pr = /* @__PURE__ */ Xn("<button class=\"ghost\"></button>"), Fr = /* @__PURE__ */ Xn("<li><a><span></span> <span class=\"wt\"><span><!> </span> <small> </small></span></a> <!></li>"), Ir = /* @__PURE__ */ Xn("<ul></ul>"), Lr = /* @__PURE__ */ Xn("<p class=\"ibEmpty\"> </p>"), Rr = /* @__PURE__ */ Xn("<header><h2> </h2> <button class=\"ghost\"></button></header> <!> <!>", 1);
function zr(e, t) {
	ze(t, !0);
	let n = /* @__PURE__ */ P(Ft(jr(t, "all", 3, !1)())), r = (e) => {
		F(n, e, !0), t.ontab?.(e);
	}, i = /* @__PURE__ */ rt(() => t.roomId ? t.waits.filter((e) => e.book_id === t.roomId) : []), a = /* @__PURE__ */ rt(() => Q(n) || !t.roomId), o = /* @__PURE__ */ rt(() => Q(a) ? t.waits : Q(i)), s = (e) => (e.author_name || e.author.split("@")[0]).split(" ")[0], c = (e) => e.ref.startsWith("t") ? "task" : /^[ab]/.test(e.ref) ? "agent" : "ask", l = (e) => `/b/${e.book_id}${e.thread === "main" ? "" : `?t=${encodeURIComponent(e.thread)}`}${/^[mab]/.test(e.ref) ? `#m${e.ref.slice(1)}` : ""}`, u = (e) => e.length > 220 ? `${e.slice(0, 218)}…` : e;
	var d = Rr(), f = Ht(d), p = Vt(f), m = Ut(p, !0), h = z(p, 2);
	vr(h, () => t.vb.icon("x", 18), !0), D(h), D(f);
	var g = z(f, 2), _ = (e) => {
		var n = Mr(), o = Vt(n);
		let s;
		var c = Vt(o), l = Ut(z(c), !0);
		D(o);
		var u = z(o, 2);
		let d;
		var f = Vt(u), p = Ut(z(f), !0);
		D(u), D(n), rn((e, n) => {
			s = xr(o, 1, "", null, s, { on: !Q(a) }), $(c, `${e ?? ""} `), $(l, Q(i).length), d = xr(u, 1, "", null, d, { on: Q(a) }), $(f, `${n ?? ""} `), $(p, t.waits.length);
		}, [() => t.vb.t("Esta sala"), () => t.vb.t("Todas")]), Vn("click", o, () => r(!1)), Vn("click", u, () => r(!0)), Zn(e, n);
	};
	cr(g, (e) => {
		t.roomId && e(_);
	});
	var v = z(g, 2), y = (e) => {
		var n = Ir();
		fr(n, 21, () => Q(o), (e) => e.book_id + e.ref, (e, n) => {
			var r = Fr(), i = Vt(r), o = Vt(i);
			let d;
			vr(o, () => c(Q(n)) === "task" ? t.vb.icon("check", 16) : t.vb.avatar(Q(n).author), !0), D(o);
			var f = z(o, 2), p = Vt(f), m = Vt(p), h = (e) => {
				var n = Nr(), r = Ut(n, !0);
				rn((e) => $(r, e), [() => t.vb.t("Tarefa sua esperando OK:")]), Zn(e, n);
			}, g = /* @__PURE__ */ rt(() => c(Q(n)) === "task"), _ = (e) => {
				var n = Nr(), r = Ut(n, !0);
				rn((e) => $(r, e), [() => t.vb.t("Seu agent espera você:")]), Zn(e, n);
			}, v = /* @__PURE__ */ rt(() => c(Q(n)) === "agent"), y = (e) => {
				var t = Nr(), r = Ut(t);
				rn((e) => $(r, `${e ?? ""}:`), [() => s(Q(n))]), Zn(e, t);
			};
			cr(m, (e) => {
				Q(g) ? e(h) : Q(v) ? e(_, 1) : e(y, -1);
			});
			var b = z(m);
			D(p);
			var x = Ut(z(p, 2));
			D(f), D(i);
			var S = z(i, 2), ee = (e) => {
				var r = Pr();
				vr(r, () => t.vb.icon("check"), !0), D(r), rn((e, t) => {
					Tr(r, "title", e), Tr(r, "aria-label", t);
				}, [() => t.vb.t("Já resolvi (respondi em outro lugar, ou não é comigo)"), () => t.vb.t("Já resolvi (respondi em outro lugar, ou não é comigo)")]), Vn("click", r, () => t.onresolve(Q(n))), Zn(e, r);
			}, te = /* @__PURE__ */ rt(() => Q(n).ref.startsWith("m"));
			cr(S, (e) => {
				Q(te) && e(ee);
			}), D(r), rn((e, t, r, s, c) => {
				Tr(i, "href", e), d = xr(o, 1, "wIc", null, d, { task: t }), $(b, ` ${r ?? ""}`), $(x, `${Q(a) ? `${Q(n).room} › ` : ""}${s ?? ""} · ${c ?? ""}`);
			}, [
				() => l(Q(n)),
				() => c(Q(n)) === "task",
				() => u(Q(n).text),
				() => Q(n).topic || t.vb.t("sala principal"),
				() => t.vb.ago(Q(n).ts)
			]), Vn("click", i, (e) => t.onopen(Q(n), e)), Zn(e, r);
		}), D(n), Zn(e, n);
	}, b = (e) => {
		var n = Lr(), r = Ut(n, !0);
		rn((e) => $(r, e), [() => Q(a) ? t.vb.t("Nada esperando você. ✓") : t.vb.t("Nada esperando você nesta sala. ✓")]), Zn(e, n);
	};
	cr(v, (e) => {
		Q(o).length ? e(y) : e(b, -1);
	}), rn((e, t) => {
		$(m, e), Tr(h, "aria-label", t);
	}, [() => t.vb.t("Caixa de entrada"), () => t.vb.t("Fechar")]), Vn("click", h, function(...e) {
		t.onclose?.apply(this, e);
	}), Zn(e, d), Be();
}
Hn(["click"]);
// svelte/main.ts
function Br(e, t) {
	let n = nr(zr, {
		target: e,
		props: t
	});
	return () => or(n);
}
export { Br as mountInbox };
