// node_modules/svelte/src/internal/shared/utils.js
var e = Array.isArray, t = Array.prototype.indexOf, n = Array.prototype.includes, r = Array.from, i = Object.keys, a = Object.defineProperty, o = Object.getOwnPropertyDescriptor, s = Object.getOwnPropertyDescriptors, c = Object.prototype, l = Array.prototype, u = Object.getPrototypeOf, d = Object.isExtensible;
function f(e) {
	return typeof e == "function";
}
var p = () => {};
function ee(e) {
	for (var t = 0; t < e.length; t++) e[t]();
}
function te() {
	var e, t;
	return {
		promise: new Promise((n, r) => {
			e = n, t = r;
		}),
		resolve: e,
		reject: t
	};
}
function ne(e, t, n = !1) {
	return e === void 0 ? n ? t() : t : e;
}
function re(e, t) {
	if (Array.isArray(e)) return e;
	if (t === void 0 || !(Symbol.iterator in e)) return Array.from(e);
	let n = [];
	for (let r of e) if (n.push(r), n.length === t) break;
	return n;
}
// node_modules/svelte/src/internal/client/constants.js
var ie = 1 << 24, m = 1024, h = 2048, g = 4096, ae = 8192, oe = 16384, se = 32768, ce = 1 << 25, le = 65536, ue = 1 << 18, de = 1 << 19, fe = 1 << 20, pe = 1 << 25, me = 1 << 21, he = 1 << 22, ge = 1 << 23, _ = Symbol("$state"), _e = Symbol("component"), ve = Symbol("legacy props"), ye = Symbol(""), be = Symbol("proxy path"), xe = Symbol("attributes"), Se = Symbol("class"), Ce = Symbol("style"), we = Symbol("text"), Te = Symbol("form reset"), Ee = Symbol("hmr anchor"), De = new class extends Error {
	name = "StaleReactionError";
	message = "The reaction that called `getAbortSignal()` was re-run or destroyed";
}(), Oe = !!globalThis.document?.contentType && /* @__PURE__ */ globalThis.document.contentType.includes("xml"), ke = {}, v = Symbol("uninitialized"), Ae = Symbol("filename"), je = "http://www.w3.org/1999/xhtml", Me = "http://www.w3.org/2000/svg", Ne = "@attach";
function Pe() {
	console.warn("https://svelte.dev/e/derived_inert");
}
function Fe(e, t, n) {
	console.warn("https://svelte.dev/e/hydration_attribute_changed");
}
function Ie(e) {
	console.warn("https://svelte.dev/e/hydration_mismatch");
}
function Le() {
	console.warn("https://svelte.dev/e/lifecycle_double_unmount");
}
function Re() {
	console.warn("https://svelte.dev/e/select_multiple_invalid_value");
}
function ze() {
	console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
// node_modules/svelte/src/internal/client/dom/hydration.js
var y = !1;
function Be(e) {
	y = e;
}
var b;
function x(e) {
	if (e === null) throw Ie(), ke;
	return b = e;
}
function Ve() {
	return x(/* @__PURE__ */ L(b));
}
function He(e) {
	if (y) {
		if (/* @__PURE__ */ L(b) !== null) throw Ie(), ke;
		b = e;
	}
}
function Ue(e = 1) {
	if (y) {
		for (var t = e, n = b; t--;) n = /* @__PURE__ */ L(n);
		b = n;
	}
}
function We(e = !0) {
	for (var t = 0, n = b;;) {
		if (n.nodeType === 8) {
			var r = n.data;
			if (r === "]") {
				if (t === 0) return n;
				--t;
			} else (r === "[" || r === "[!" || r[0] === "[" && !isNaN(Number(r.slice(1)))) && (t += 1);
		}
		var i = /* @__PURE__ */ L(n);
		e && n.remove(), n = i;
	}
}
function Ge(e) {
	if (!e || e.nodeType !== 8) throw Ie(), ke;
	return e.data;
}
// node_modules/svelte/src/internal/client/reactivity/equality.js
function Ke(e) {
	return e === this.v;
}
function qe(e, t) {
	return e == e ? e !== t || typeof e == "object" && !!e || typeof e == "function" : t == t;
}
function Je(e) {
	return !qe(e, this.v);
}
function Ye(e) {
	throw Error("https://svelte.dev/e/lifecycle_outside_component");
}
// node_modules/svelte/src/internal/client/errors.js
function Xe() {
	throw Error("https://svelte.dev/e/async_derived_orphan");
}
function Ze() {
	throw Error("https://svelte.dev/e/bind_invalid_checkbox_value");
}
function Qe(e, t, n) {
	throw Error("https://svelte.dev/e/each_key_duplicate");
}
function $e(e, t, n) {
	throw Error("https://svelte.dev/e/each_key_volatile");
}
function et(e) {
	throw Error("https://svelte.dev/e/effect_in_teardown");
}
function tt() {
	throw Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function nt(e) {
	throw Error("https://svelte.dev/e/effect_orphan");
}
function rt() {
	throw Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function it() {
	throw Error("https://svelte.dev/e/hydration_failed");
}
function at() {
	throw Error("https://svelte.dev/e/invalid_snippet");
}
function ot(e) {
	throw Error("https://svelte.dev/e/props_invalid_value");
}
function st(e) {
	throw Error("https://svelte.dev/e/props_rest_readonly");
}
function ct(e) {
	throw Error("https://svelte.dev/e/rune_outside_svelte");
}
function lt() {
	throw Error("https://svelte.dev/e/state_descriptors_fixed");
}
function ut() {
	throw Error("https://svelte.dev/e/state_prototype_fixed");
}
function dt() {
	throw Error("https://svelte.dev/e/state_unsafe_mutation");
}
function ft() {
	throw Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
// node_modules/svelte/src/internal/flags/index.js
var pt = !1, mt = !1;
function ht(e, t) {
	return e.label = t, gt(e.v, t), e;
}
function gt(e, t) {
	return e?.[be]?.(t), e;
}
function _t(e) {
	return typeof e == "symbol" ? `Symbol(${e.description})` : typeof e == "function" ? "<function>" : typeof e == "object" && e ? "<object>" : String(e);
}
// node_modules/svelte/src/internal/shared/context.js
function vt(e) {
	let t = e.p;
	for (; t !== null && t.c === null;) t = t.p;
	return t?.c ?? null;
}
function yt(e, t) {
	return e === null && Ye(t), e.c ??= new Map(vt(e) || void 0);
}
// node_modules/svelte/src/internal/client/context.js
var S = null;
function bt(e) {
	S = e;
}
var xt = null;
function St(e) {
	return yt(S, "getContext").get(e);
}
function Ct(e, t) {
	return yt(S, "setContext").set(e, t), t;
}
function wt(e) {
	return yt(S, "hasContext").has(e);
}
function Tt() {
	return yt(S, "getAllContexts");
}
function Et(e, t = !1, n) {
	S = {
		p: S,
		i: !1,
		c: null,
		e: null,
		s: e,
		x: null,
		r: W,
		l: null
	};
}
function Dt(e) {
	var t = S, n = t.e;
	if (n !== null) {
		t.e = null;
		for (var r of n) Xn(r);
	}
	return e !== void 0 && (t.x = e), t.i = !0, S = t.p, Ot(e);
}
function Ot(e = {}) {
	return a(e, _e, { value: !0 }), e;
}
function kt() {
	return !0;
}
// node_modules/svelte/src/internal/client/dom/task.js
var C = [];
function At() {
	var e = C;
	C = [], ee(e);
}
function jt(e) {
	if (C.length === 0 && !an) {
		var t = C;
		queueMicrotask(() => {
			t === C && At();
		});
	}
	C.push(e);
}
function Mt() {
	for (; C.length > 0;) At();
}
// node_modules/svelte/src/internal/client/reactivity/status.js
var Nt = ~(h | g | m);
function w(e, t) {
	e.f = e.f & Nt | t;
}
function Pt(e) {
	e.f & 512 || e.deps === null ? w(e, m) : w(e, g);
}
// node_modules/svelte/src/internal/client/reactivity/utils.js
function Ft(e, t) {
	e.f & 2048 ? t.set(e, h) : e.f & 4096 && t.get(e) !== 2048 && t.set(e, g), w(e, m);
}
// node_modules/svelte/src/internal/client/dom/elements/misc.js
function It(e, t) {
	if (t) {
		let t = document.body;
		e.autofocus = !0, jt(() => {
			document.activeElement === t && e.focus();
		});
	}
}
function Lt(e) {
	y && /* @__PURE__ */ I(e) !== null && zn(e);
}
var Rt = !1;
function zt() {
	Rt || (Rt = !0, document.addEventListener("reset", (e) => {
		Promise.resolve().then(() => {
			if (!e.defaultPrevented) for (let t of e.target.elements) t[Te]?.();
		});
	}, { capture: !0 }));
}
// node_modules/svelte/src/internal/client/dom/elements/bindings/shared.js
function Bt(e) {
	var t = V, n = W;
	U(null), G(null);
	try {
		return e();
	} finally {
		U(t), G(n);
	}
}
function Vt(e, t, n, r = n) {
	e.addEventListener(t, () => Bt(n));
	let i = e[Te];
	e[Te] = i ? () => {
		i(), r(!0);
	} : () => r(!0), zt();
}
// node_modules/svelte/src/internal/client/reactivity/async.js
function Ht(e, t, n, r) {
	let i = kt() ? Kt : Xt;
	var a = e.filter((e) => !e.settled), o = t.map(i);
	if (n.length === 0 && a.length === 0) {
		r(o);
		return;
	}
	var s = W, c = Ut(), l = a.length === 1 ? a[0].promise : a.length > 1 ? Promise.all(a.map((e) => e.promise)) : null;
	function u(e) {
		if (!(s.f & 16384)) {
			c();
			try {
				r([...o, ...e]);
			} catch (e) {
				Wn(e, s);
			}
			Wt();
		}
	}
	var d = Gt();
	if (n.length === 0) {
		l.then(() => u([])).finally(d);
		return;
	}
	function f() {
		Promise.all(n.map((e) => /* @__PURE__ */ Jt(e))).then(u).catch((e) => Wn(e, s)).finally(d);
	}
	l ? l.then(() => {
		s.f & 16384 ? d() : (c(), f(), Wt());
	}) : f();
}
function Ut() {
	var e = W, t = V, n = S, r = T;
	return function(i = !0) {
		G(e), U(t), bt(n), i && !(e.f & 16384) && (r?.activate(), r?.apply());
	};
}
function Wt(e = !0) {
	G(null), U(null), bt(null), e && T?.deactivate();
}
function Gt() {
	var e = W, t = e.b, n = T, r = !!t?.is_rendered();
	return t?.update_pending_count(1, n), n.increment(r, e), () => {
		t?.update_pending_count(-1, n), n.decrement(r, e);
	};
}
/*#__NO_SIDE_EFFECTS__*/
function Kt(e) {
	var t = 2 | h;
	return W !== null && (W.f |= de), {
		ctx: S,
		deps: null,
		effects: null,
		equals: Ke,
		f: t,
		fn: e,
		reactions: null,
		rv: 0,
		v,
		wv: 0,
		parent: W,
		ac: null
	};
}
var qt = Symbol("obsolete");
/*#__NO_SIDE_EFFECTS__*/
function Jt(e, t, n) {
	let r = W;
	r === null && Xe();
	var i = void 0, a = yn(v), o = !V, s = /* @__PURE__ */ new Set();
	return tr(() => {
		var t = W, n = te();
		i = n.promise;
		try {
			Promise.resolve(e()).then(n.resolve, (e) => {
				e !== De && n.reject(e);
			}).finally(Wt);
		} catch (e) {
			n.reject(e), Wt();
		}
		var c = T;
		if (o) {
			if (t.f & 32768) var l = Gt();
			if (r.b?.is_rendered()) c.async_deriveds.get(t)?.reject(qt);
			else for (let e of s.values()) e.reject(qt);
			s.add(n), c.async_deriveds.set(t, n);
		}
		let u = (e, t = void 0) => {
			l?.(), s.delete(n), t !== qt && (c.activate(), t ? (a.f |= ge, Sn(a, t)) : (a.f & 8388608 && (a.f ^= ge), Sn(a, e)), c.deactivate());
		};
		n.promise.then(u, (e) => u(null, e || "unknown"));
	}), Jn(() => {
		for (let e of s) e.reject(qt);
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
function Yt(e) {
	let t = /* @__PURE__ */ Kt(e);
	return br(t), t;
}
/*#__NO_SIDE_EFFECTS__*/
function Xt(e) {
	let t = /* @__PURE__ */ Kt(e);
	return t.equals = Je, t;
}
function Zt(e) {
	var t = e.effects;
	if (t !== null) {
		e.effects = null;
		for (var n = 0; n < t.length; n += 1) z(t[n]);
	}
}
function Qt(e) {
	var t, n = W, r = e.parent;
	if (!B && r !== null && e.v !== v && r.f & 24576) return Pe(), e.v;
	G(r);
	try {
		Zt(e), t = Dr(e);
	} finally {
		G(n);
	}
	return t;
}
function $t(e) {
	var t = Qt(e);
	!e.equals(t) && (e.wv = wr(), (!T?.is_fork || e.deps === null) && (T === null ? e.v = t : (T.capture(e, t, !0), E?.capture(e, t, !0)), e.deps === null)) ? w(e, m) : B || (D === null ? Pt(e) : (qn() || T?.is_fork) && D.set(e, t));
}
function en(e) {
	if (e.effects !== null) for (let t of e.effects) (t.teardown || t.ac) && (t.teardown?.(), t.ac !== null && Bt(() => {
		t.ac.abort(De), t.ac = null;
	}), t.fn !== null && (t.teardown = p), Ar(t, 0), lr(t));
}
function tn(e) {
	if (e.effects !== null) for (let t of e.effects) t.teardown && t.fn !== null && jr(t);
}
// node_modules/svelte/src/internal/client/reactivity/batch.js
var nn = null, T = null, E = null, D = null, rn = null, an = !1, on = !1, sn = null, cn = null, ln = 0, un = 1, O = class e {
	id = un++;
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
		nn === null ? nn = this : (nn.next = this, this.prev = nn), nn = this;
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
			for (var r of n.d) w(r, h), t(r);
			for (r of n.m) w(r, g), t(r);
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
		for (let [e, t] of this.#s) w(e, t), this.schedule(e);
		this.apply();
		for (var t = sn = [], n = [], r = cn = []; this.#a.length > 0;) {
			ln++ > 1e3 && (this.#b(), fn());
			for (let e of this.#p()) try {
				this.#h(e, t, n);
			} catch (t) {
				throw gn(e), this.#d() || this.discard(), t;
			}
		}
		if (T = null, r.length > 0) {
			var i = e.ensure();
			for (let e of r) i.schedule(e);
		}
		if (sn = null, cn = null, this.#d()) {
			this.#y(n), this.#y(t);
			for (let [e, t] of this.#c) hn(e, t);
			r.length > 0 && T.#m();
			return;
		}
		let a = this.#g();
		if (a) this.#y(n), this.#y(t), a.#v(this);
		else {
			this.#s.clear();
			for (let e of this.#e) e(this);
			this.#e.clear(), E = this, pn(n), pn(t), E = null, this.#i?.resolve();
			var o = T;
			this.#n === 0 && (this.#a.length === 0 || o !== null) && this.#b(), o !== null && (A.clear(), o.#m());
		}
	}
	#h(e, t, n) {
		e.f ^= m;
		for (var r = e.first; r !== null;) {
			var i = r.f, a = !!(i & 96);
			if (!(a && i & 1024 || i & 8192 || this.#c.has(r)) && r.fn !== null) {
				a ? r.f ^= m : i & 4 ? t.push(r) : Tr(r) && (i & 16 && this.add_dirty_reaction(r, g), jr(r));
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
					r & 4194320 && !this.async_deriveds.has(i) && (this.#s.delete(i), w(i, h), this.schedule(i));
				}
			}
		};
		for (let e of this.current.keys()) t(e);
		this.oncommit(() => e.discard()), e.#b(), T = this, this.#m();
	}
	#y(e) {
		for (var t = 0; t < e.length; t += 1) Ft(e[t], this.#s);
	}
	capture(e, t, n = !1) {
		e.v !== v && !this.previous.has(e) && this.previous.set(e, e.v), e.f & 8388608 || (this.current.set(e, [t, n]), D?.set(e, t)), this.is_fork || (e.v = t);
	}
	activate() {
		T = this;
	}
	deactivate() {
		T = null, D = null;
	}
	flush() {
		try {
			on = !0, T = this, this.#m();
		} finally {
			ln = 0, rn = null, sn = null, cn = null, on = !1, T = null, D = null, A.clear();
		}
	}
	discard() {
		for (let e of this.#t) e(this);
		this.#t.clear();
		for (let e of this.async_deriveds.values()) e.reject(qt);
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
		this.#u || (this.#u = !0, jt(() => {
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
		return (this.#i ??= te()).promise;
	}
	static ensure() {
		if (T === null) {
			let t = T = new e();
			!on && !an && jt(() => {
				t.started || t.flush();
			});
		}
		return T;
	}
	apply() {
		D = null;
	}
	schedule(e) {
		rn = e, e.b?.is_pending && e.f & 16777228 && !(e.f & 32768) ? e.b.defer_effect(e) : this.#a.push(e);
	}
	#b() {
		if (this.linked) {
			var e = this.prev, t = this.next;
			e === null || (e.next = t), t === null ? nn = e : t.prev = e, this.linked = !1;
		}
	}
};
function dn(e) {
	var t = an, n = E;
	E = null, an = !0;
	try {
		var r;
		for (e && (dn(), r = e());;) {
			if (Mt(), T === null) return r;
			T.flush();
		}
	} finally {
		an = t, E = n;
	}
}
function fn() {
	try {
		rt();
	} catch (e) {
		Wn(e, rn);
	}
}
var k = null;
function pn(e) {
	var t = e.length;
	if (t !== 0) {
		for (var n = 0; n < t;) {
			var r = e[n++];
			if (!(r.f & 24576) && Tr(r) && (k = /* @__PURE__ */ new Set(), jr(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && fr(r), k?.size > 0)) {
				A.clear();
				for (let e of k) {
					if (e.f & 24576) continue;
					let t = [e], n = e.parent;
					for (; n !== null;) k.has(n) && (k.delete(n), t.push(n)), n = n.parent;
					for (let e = t.length - 1; e >= 0; e--) {
						let n = t[e];
						n.f & 24576 || jr(n);
					}
				}
				k.clear();
			}
		}
		k = null;
	}
}
function mn(e) {
	T.schedule(e);
}
function hn(e, t) {
	if (!(e.f & 32 && e.f & 1024)) {
		e.f & 2048 ? t.d.push(e) : e.f & 4096 && t.m.push(e), w(e, m);
		for (var n = e.first; n !== null;) hn(n, t), n = n.next;
	}
}
function gn(e) {
	w(e, m);
	for (var t = e.first; t !== null;) gn(t), t = t.next;
}
// node_modules/svelte/src/internal/client/reactivity/sources.js
var _n = /* @__PURE__ */ new Set(), A = /* @__PURE__ */ new Map(), vn = !1;
function yn(e, t) {
	return {
		f: 0,
		v: e,
		reactions: null,
		equals: Ke,
		rv: 0,
		wv: 0
	};
}
/*#__NO_SIDE_EFFECTS__*/
function j(e, t) {
	let n = yn(e, t);
	return br(n), n;
}
/*#__NO_SIDE_EFFECTS__*/
function bn(e, t = !1, n = !0) {
	let r = yn(e);
	return t || (r.equals = Je), r;
}
function M(e, t, n = !1) {
	return V !== null && (!H || V.f & 131072) && kt() && V.f & 4325394 && (K === null || !K.has(e)) && dt(), Sn(e, n ? F(t) : t, cn);
}
var N = null, xn = 0;
function Sn(e, t, n = null) {
	if (!e.equals(t)) {
		B ? A.set(e, t) : A.has(e) || A.set(e, e.v);
		var r = O.ensure();
		if (r.capture(e, t), e.f & 2) {
			let t = e;
			e.f & 2048 && Qt(t), D === null && Pt(t);
		}
		e.wv = wr(), N = null, xn = 0, Tn(e, h, n), N = null, kt() && W !== null && W.f & 1024 && !(W.f & 96) && (Y === null ? xr([e]) : Y.push(e)), !r.is_fork && _n.size > 0 && !vn && Cn();
	}
	return t;
}
function Cn() {
	vn = !1;
	for (let e of _n) {
		e.f & 1024 && w(e, g);
		let t;
		try {
			t = Tr(e);
		} catch {
			t = !0;
		}
		t && jr(e);
	}
	_n.clear();
}
function wn(e, t = 1) {
	var n = Q(e), r = t === 1 ? n++ : n--;
	return M(e, n), r;
}
function P(e) {
	M(e, e.v + 1);
}
function Tn(e, t, n) {
	var r = e.reactions;
	if (r !== null) {
		var i = kt(), a = r.length;
		if (xn += a, xn > 1e5 && N === null && (N = /* @__PURE__ */ new Set()), N !== null) {
			if (N.has(e)) return;
			N.add(e);
		}
		for (var o = 0; o < a; o++) {
			var s = r[o], c = s.f;
			if (i || s !== W) {
				var l = (c & h) === 0;
				if (l && w(s, t), c & 131072) _n.add(s);
				else if (c & 2) {
					var u = s;
					D?.delete(u), Tn(u, g, n);
				} else if (l) {
					var d = s;
					c & 16 && k !== null && k.add(d), n === null ? mn(d) : n.push(d);
				}
			}
		}
	}
}
function F(t) {
	if (typeof t != "object" || !t || _ in t || _e in t) return t;
	let n = u(t);
	if (n !== c && n !== l) return t;
	var r = /* @__PURE__ */ new Map(), i = e(t), a = /* @__PURE__ */ j(0), s = null, d = Z, f = (e) => {
		if (Z === d) return e();
		var t = V, n = Z;
		U(null), Cr(d);
		var r = e();
		return U(t), Cr(n), r;
	};
	return i && r.set("length", /* @__PURE__ */ j(t.length, s)), new Proxy(t, {
		defineProperty(e, t, n) {
			"value" in n && n.configurable !== !1 && n.enumerable !== !1 && n.writable !== !1 || lt();
			var i = r.get(t);
			return i === void 0 ? f(() => {
				var e = /* @__PURE__ */ j(n.value, s);
				return r.set(t, e), e;
			}) : M(i, n.value, !0), !0;
		},
		deleteProperty(e, t) {
			var n = r.get(t);
			if (n === void 0) {
				if (t in e) {
					let e = f(() => /* @__PURE__ */ j(v, s));
					r.set(t, e), P(a);
				}
			} else M(n, v), P(a);
			return !0;
		},
		get(e, n, i) {
			if (n === _) return t;
			var a = r.get(n), c = n in e;
			if (a === void 0 && (!c || o(e, n)?.writable) && (a = f(() => /* @__PURE__ */ j(F(c ? e[n] : v), s)), r.set(n, a)), a !== void 0) {
				var l = Q(a);
				return l === v ? void 0 : l;
			}
			return Reflect.get(e, n, i);
		},
		getOwnPropertyDescriptor(e, t) {
			this.has?.(e, t);
			var n = Reflect.getOwnPropertyDescriptor(e, t), i = r.get(t);
			if (i !== void 0) {
				var a = Q(i);
				if (a === v) return;
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
			if (t === _) return !0;
			var n = r.get(t), i = n !== void 0 && n.v !== v || Reflect.has(e, t);
			return (n !== void 0 || (W !== null || V !== null) && (!i || o(e, t)?.writable)) && (n === void 0 && (n = f(() => /* @__PURE__ */ j(i ? F(e[t]) : v, s)), r.set(t, n)), Q(n) === v) ? !1 : i;
		},
		set(e, t, n, c) {
			var l = r.get(t), u = t in e;
			if (i && t === "length") for (var d = n; d < l.v; d += 1) {
				var p = r.get(d + "");
				p === void 0 ? d in e && (p = f(() => /* @__PURE__ */ j(v, s)), r.set(d + "", p)) : M(p, v);
			}
			if (l === void 0) (!u || o(e, t)?.writable) && (l = f(() => /* @__PURE__ */ j(void 0, s)), M(l, F(n)), r.set(t, l));
			else {
				u = l.v !== v;
				var ee = f(() => F(n));
				M(l, ee);
			}
			var te = Reflect.getOwnPropertyDescriptor(e, t);
			if (te?.set && te.set.call(c, n), !u) {
				if (i && typeof t == "string") {
					var ne = r.get("length"), re = Number(t);
					Number.isInteger(re) && re >= ne.v && M(ne, re + 1);
				}
				P(a);
			}
			return !0;
		},
		ownKeys(e) {
			Q(a);
			var t = Reflect.ownKeys(e).filter((e) => {
				var t = r.get(e);
				return t === void 0 || t.v !== v;
			});
			for (var [n, i] of r) i.v !== v && !(n in e) && t.push(n);
			return t;
		},
		setPrototypeOf() {
			ut();
		}
	});
}
function En(e) {
	try {
		if (typeof e == "object" && e && _ in e) return e[_];
	} catch {}
	return e;
}
function Dn(e, t) {
	return Object.is(En(e), En(t));
}
var On, kn, An, jn, Mn;
function Nn() {
	if (On === void 0) {
		On = window, kn = document, An = /Firefox/.test(navigator.userAgent);
		var e = Element.prototype, t = Node.prototype, n = Text.prototype;
		jn = o(t, "firstChild").get, Mn = o(t, "nextSibling").get, d(e) && (e[Se] = void 0, e[xe] = null, e[Ce] = void 0, e.__e = void 0), d(n) && (n[we] = void 0);
	}
}
function Pn(e = "") {
	return document.createTextNode(e);
}
/*@__NO_SIDE_EFFECTS__*/
function I(e) {
	return jn.call(e);
}
/*@__NO_SIDE_EFFECTS__*/
function L(e) {
	return Mn.call(e);
}
function Fn(e, t) {
	if (!y) return /* @__PURE__ */ I(e);
	var n = /* @__PURE__ */ I(b);
	if (n === null) n = b.appendChild(Pn());
	else if (t && n.nodeType !== 3) {
		var r = Pn();
		return n?.before(r), x(r), r;
	}
	return t && Hn(n), x(n), n;
}
function In(e, t = !1) {
	if (!y) {
		var n = /* @__PURE__ */ I(e);
		return n instanceof Comment && n.data === "" ? /* @__PURE__ */ L(n) : n;
	}
	if (t) {
		if (b?.nodeType !== 3) {
			var r = Pn();
			return b?.before(r), x(r), r;
		}
		Hn(b);
	}
	return b;
}
function Ln(e, t = !1) {
	if (!y) return /* @__PURE__ */ I(e);
	var n = Fn(e, t);
	return He(e), n;
}
function Rn(e, t = 1, n = !1) {
	let r = y ? b : e;
	for (var i; t--;) i = r, r = /* @__PURE__ */ L(r);
	if (!y) return r;
	if (n) {
		if (r?.nodeType !== 3) {
			var a = Pn();
			return r === null ? i?.after(a) : r.before(a), x(a), a;
		}
		Hn(r);
	}
	return x(r), r;
}
function zn(e) {
	e.textContent = "";
}
function Bn() {
	return !1;
}
function Vn(e, t, n) {
	return t == null || t === "http://www.w3.org/1999/xhtml" ? n ? document.createElement(e, { is: n }) : document.createElement(e) : n ? document.createElementNS(t, e, { is: n }) : document.createElementNS(t, e);
}
function Hn(e) {
	if (e.nodeValue.length < 65536) return;
	let t = e.nextSibling;
	for (; t !== null && t.nodeType === 3;) t.remove(), e.nodeValue += t.nodeValue, t = e.nextSibling;
}
function Un(e) {
	var t = W;
	if (t === null) return V.f |= ge, e;
	if (!(t.f & 32768) && !(t.f & 4)) throw e;
	Wn(e, t);
}
function Wn(e, t) {
	if (e === ke) throw e;
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
function Gn(e) {
	W === null && (V === null && nt(e), tt()), B && et(e);
}
function Kn(e, t) {
	var n = t.last;
	n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function R(e, t) {
	var n = W;
	n !== null && n.f & 8192 && (e |= ae);
	var r = {
		ctx: S,
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
	T?.register_created_effect(r);
	var i = r;
	if (e & 4) sn === null ? O.ensure().schedule(r) : sn.push(r);
	else if (t !== null) {
		try {
			jr(r);
		} catch (e) {
			throw z(r), e;
		}
		i.deps === null && i.teardown === null && i.nodes === null && i.first === i.last && !(i.f & 524288) && (i = i.first, e & 16 && e & 65536 && i !== null && (i.f |= le));
	}
	if (i !== null && (i.parent = n, n !== null && Kn(i, n), V !== null && V.f & 2 && !(e & 64))) {
		var a = V;
		(a.effects ??= []).push(i);
	}
	return r;
}
function qn() {
	return V !== null && !H;
}
function Jn(e) {
	let t = R(8, null);
	return w(t, m), t.teardown = e, t;
}
function Yn(e) {
	Gn("$effect");
	var t = W.f;
	if (!V && t & 32 && S !== null && !S.i) {
		var n = S;
		(n.e ??= []).push(e);
	} else return Xn(e);
}
function Xn(e) {
	return R(4 | fe, e);
}
function Zn(e) {
	return Gn("$effect.pre"), R(8 | fe, e);
}
function Qn(e) {
	O.ensure();
	let t = R(64 | de, e);
	return () => {
		z(t);
	};
}
function $n(e) {
	O.ensure();
	let t = R(64 | de, e);
	return (e = {}) => new Promise((n) => {
		e.outro ? pr(t, () => {
			z(t), n(void 0);
		}) : (z(t), n(void 0));
	});
}
function er(e) {
	return R(4, e);
}
function tr(e) {
	return R(he | de, e);
}
function nr(e, t = 0) {
	return R(8 | t, e);
}
function rr(e, t = [], n = [], r = []) {
	Ht(r, t, n, (t) => {
		R(8, () => {
			e(...t.map(Q));
		});
	});
}
function ir(e, t = [], n = [], r = []) {
	Ht(r, t, n, (t) => {
		R(4, () => e(...t.map(Q)));
	});
}
function ar(e, t = 0) {
	return R(16 | t, e);
}
function or(e, t = 0) {
	return R(ie | t, e);
}
function sr(e) {
	return R(32 | de, e);
}
function cr(e) {
	var t = e.teardown;
	if (t !== null) {
		let n = B, r = V;
		yr(!0), U(null);
		try {
			t.call(null);
		} catch (t) {
			Wn(t, e.parent);
		} finally {
			yr(n), U(r);
		}
	}
}
function lr(e, t = !1) {
	var n = e.first;
	for (e.first = e.last = null; n !== null;) {
		let e = n.ac;
		e !== null && Bt(() => {
			e.abort(De);
		});
		var r = n.next;
		n.f & 64 ? n.parent = null : z(n, t), n = r;
	}
}
function ur(e) {
	for (var t = e.first; t !== null;) {
		var n = t.next;
		t.f & 32 || z(t), t = n;
	}
}
function z(e, t = !0) {
	var n = !1;
	(t || e.f & 262144) && e.nodes !== null && e.nodes.end !== null && (dr(e.nodes.start, e.nodes.end), n = !0), e.f |= ce, lr(e, t && !n), Ar(e, 0);
	var r = e.nodes && e.nodes.t;
	if (r !== null) for (let e of r) e.stop();
	cr(e), e.f ^= ce, e.f |= oe;
	var i = e.parent;
	i !== null && i.first !== null && fr(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = e.b = null;
}
function dr(e, t) {
	for (; e !== null;) {
		var n = e === t ? null : /* @__PURE__ */ L(e);
		e.remove(), e = n;
	}
}
function fr(e) {
	var t = e.parent, n = e.prev, r = e.next;
	n !== null && (n.next = r), r !== null && (r.prev = n), t !== null && (t.first === e && (t.first = r), t.last === e && (t.last = n));
}
function pr(e, t, n = !0) {
	var r = [];
	e.f |= 256, mr(e, r, !0);
	var i = () => {
		n && z(e), t && t();
	}, a = r.length;
	if (a > 0) {
		var o = () => --a || i();
		for (var s of r) s.out(o);
	} else i();
}
function mr(e, t, n) {
	if (!(e.f & 8192)) {
		e.f ^= ae;
		var r = e.nodes && e.nodes.t;
		if (r !== null) for (let e of r) (e.is_global || n) && t.push(e);
		for (var i = e.first; i !== null;) {
			var a = i.next;
			if (!(i.f & 64)) {
				var o = !!(i.f & 65536) || !!(i.f & 32) && !!(e.f & 16);
				mr(i, t, o ? n : !1);
			}
			i = a;
		}
	}
}
function hr(e) {
	e.f &= -257, gr(e, !0);
}
function gr(e, t) {
	if (!(e.f & 256) && e.f & 8192) {
		e.f ^= ae, e.f & 1024 || (w(e, h), O.ensure().schedule(e));
		for (var n = e.first; n !== null;) {
			var r = n.next, i = !!(n.f & 65536) || !!(n.f & 32);
			gr(n, i ? t : !1), n = r;
		}
		var a = e.nodes && e.nodes.t;
		if (a !== null) for (let e of a) (e.is_global || t) && e.in();
	}
}
function _r(e, t) {
	if (e.nodes) for (var n = e.nodes.start, r = e.nodes.end; n !== null;) {
		var i = n === r ? null : /* @__PURE__ */ L(n);
		t.append(n), n = i;
	}
}
// node_modules/svelte/src/internal/client/legacy.js
var vr = null, B = !1;
function yr(e) {
	B = e;
}
var V = null, H = !1;
function U(e) {
	V = e;
}
var W = null;
function G(e) {
	W = e;
}
var K = null;
function br(e) {
	V !== null && (V.f & 2097152 || V.f & 2) && (K ??= /* @__PURE__ */ new Set()).add(e);
}
var q = null, J = 0, Y = null;
function xr(e) {
	Y = e;
}
var Sr = 1, X = 0, Z = X;
function Cr(e) {
	Z = e;
}
function wr() {
	return ++Sr;
}
function Tr(e) {
	var t = e.f;
	if (t & 2048) return !0;
	if (t & 4096) {
		for (var n = e.deps, r = n.length, i = 0; i < r; i++) {
			var a = n[i];
			if (Tr(a) && $t(a), a.wv > e.wv) return !0;
		}
		t & 512 && D === null && w(e, m);
	}
	return !1;
}
function Er(e, t, n = !0) {
	var r = e.reactions;
	if (r !== null && !(K !== null && K.has(e))) for (var i = 0; i < r.length; i++) {
		var a = r[i];
		a.f & 2 ? Er(a, t, !1) : t === a && (n ? w(a, h) : a.f & 1024 && w(a, g), mn(a));
	}
}
function Dr(e) {
	var t = q, n = J, r = Y, i = V, a = K, o = S, s = H, c = Z, l = e.f;
	q = null, J = 0, Y = null, V = l & 96 ? null : e, K = null, bt(e.ctx), H = !1, Z = ++X, e.ac !== null && (Bt(() => {
		e.ac.abort(De);
	}), e.ac = null);
	try {
		e.f |= me;
		var u = e.fn, d = u();
		e.f |= se;
		var f = Or(e);
		if (kt() && Y !== null && !H && f !== null && !(e.f & 6146)) for (var p = 0; p < Y.length; p++) Er(Y[p], e);
		if (i !== null && i !== e) {
			if (X++, i.deps !== null) for (let e = 0; e < n; e += 1) i.deps[e].rv = X;
			if (t !== null) for (let e of t) e.rv = X;
			Y !== null && (r === null ? r = Y : r.push(...Y));
		}
		return e.f & 8388608 && (e.f ^= ge), d;
	} catch (t) {
		return Or(e), Un(t);
	} finally {
		e.f ^= me, q = t, J = n, Y = r, V = i, K = a, bt(o), H = s, Z = c;
	}
}
function Or(e) {
	var t = e.deps, n = T?.is_fork;
	if (q !== null) {
		var r;
		if (n || Ar(e, J), t !== null && J > 0) for (t.length = J + q.length, r = 0; r < q.length; r++) t[J + r] = q[r];
		else e.deps = t = q;
		if (qn() && e.f & 512) for (r = J; r < t.length; r++) (t[r].reactions ??= []).push(e);
	} else !n && t !== null && J < t.length && (Ar(e, J), t.length = J);
	return t;
}
function kr(e, r) {
	let i = r.reactions;
	if (i !== null) {
		var a = t.call(i, e);
		if (a !== -1) {
			var o = i.length - 1;
			o === 0 ? i = r.reactions = null : (i[a] = i[o], i.pop());
		}
	}
	if (i === null && r.f & 2 && (q === null || !n.call(q, r))) {
		var s = r;
		s.f & 512 && (s.f ^= 512), s.v !== v && Pt(s), s.ac !== null && Bt(() => {
			s.ac.abort(De), s.ac = null, w(s, h);
		}), en(s), Ar(s, 0);
	}
}
function Ar(e, t) {
	var n = e.deps;
	if (n !== null) for (var r = t; r < n.length; r++) kr(e, n[r]);
}
function jr(e) {
	var t = e.f;
	if (!(t & 16384)) {
		w(e, m);
		var n = W;
		W = e;
		try {
			t & 16777232 ? ur(e) : lr(e), cr(e);
			var r = Dr(e);
			e.teardown = typeof r == "function" ? r : null, e.wv = Sr;
		} finally {
			W = n;
		}
	}
}
async function Mr() {
	await Promise.resolve(), dn();
}
function Q(e) {
	var t = !!(e.f & 2);
	if (vr?.add(e), V !== null && !H && !(W !== null && W.f & 16384) && (K === null || !K.has(e))) {
		var r = V.deps;
		if (V.f & 2097152) e.rv < X && (e.rv = X, q === null && r !== null && r[J] === e ? J++ : q === null ? q = [e] : q.push(e));
		else {
			V.deps ??= [], n.call(V.deps, e) || V.deps.push(e);
			var i = e.reactions;
			i === null ? e.reactions = [V] : n.call(i, V) || i.push(V);
		}
	}
	if (B && A.has(e)) return A.get(e);
	if (t) {
		var a = e;
		if (B) {
			var o = a.v;
			return (!(a.f & 1024) && a.reactions !== null || Pr(a)) && (o = Qt(a)), A.set(a, o), o;
		}
		var s = !(a.f & 512) && !H && V !== null && !!(V.f & 512), c = (a.f & se) === 0;
		Tr(a) && (s && (a.f |= 512), $t(a)), s && !c && (tn(a), Nr(a));
	}
	if (D?.has(e)) return D.get(e);
	if (e.f & 8388608) throw e.v;
	return e.v;
}
function Nr(e) {
	if (e.f |= 512, e.deps !== null) for (let r of e.deps) {
		var t = r.reactions;
		t === null ? r.reactions = [e] : n.call(t, e) || t.push(e), r.f & 2 && !(r.f & 512) && (tn(r), Nr(r));
	}
}
function Pr(e) {
	if (e.v === v) return !0;
	if (e.deps === null) return !1;
	for (let t of e.deps) if (A.has(t) || t.f & 2 && Pr(t)) return !0;
	return !1;
}
function Fr(e) {
	var t = H;
	try {
		return H = !0, e();
	} finally {
		H = t;
	}
}
function Ir(e) {
	if (!(typeof e != "object" || !e || e instanceof EventTarget)) {
		if (_ in e) Lr(e);
		else if (!Array.isArray(e)) for (let t in e) {
			let n = e[t];
			typeof n == "object" && n && _ in n && Lr(n);
		}
	}
}
function Lr(e, t = /* @__PURE__ */ new Set()) {
	if (typeof e == "object" && e && !(e instanceof EventTarget) && !t.has(e)) {
		t.add(e), e instanceof Date && e.getTime();
		for (let n in e) try {
			Lr(e[n], t);
		} catch {}
		let n = u(e);
		if (n !== Object.prototype && n !== Array.prototype && n !== Map.prototype && n !== Set.prototype && n !== Date.prototype) {
			let t = s(n);
			for (let n in t) {
				let r = t[n].get;
				if (r) try {
					r.call(e);
				} catch {}
			}
		}
	}
}
// node_modules/svelte/src/reactivity/create-subscriber.js
function Rr(e) {
	let t = 0, n = yn(0), r;
	return () => {
		qn() && (Q(n), nr(() => (t === 0 && (r = Fr(() => e(() => P(n)))), t += 1, () => {
			jt(() => {
				--t, t === 0 && (r?.(), r = void 0, P(n));
			});
		})));
	};
}
// node_modules/svelte/src/store/utils.js
function zr(e, t, n) {
	if (e == null) return t(void 0), n && n(void 0), p;
	let r = Fr(() => e.subscribe(t, n));
	return r.unsubscribe ? () => r.unsubscribe() : r;
}
// node_modules/svelte/src/store/shared/index.js
var $ = [];
function Br(e, t = p) {
	let n = null, r = /* @__PURE__ */ new Set();
	function i(t) {
		if (qe(e, t) && (e = t, n)) {
			let t = !$.length;
			for (let t of r) t[1](), $.push(t, e);
			if (t) {
				for (let e = 0; e < $.length; e += 2) $[e][0]($[e + 1]);
				$.length = 0;
			}
		}
	}
	function a(t) {
		i(t(e));
	}
	function o(o, s = p) {
		let c = [o, s];
		return r.add(c), r.size === 1 && (n = t(i, a) || p), o(e), () => {
			r.delete(c), r.size === 0 && n && (n(), n = null);
		};
	}
	return {
		set: i,
		update: a,
		subscribe: o
	};
}
function Vr(e) {
	return { subscribe: e.subscribe.bind(e) };
}
function Hr(e) {
	let t;
	return zr(e, (e) => t = e)(), t;
}
export { yn as $, Ie as $t, Yn as A, o as An, pt as At, L as B, ft as Bt, or as C, se as Cn, Ot as Ct, hr as D, r as Dn, bt as Dt, nr as E, we as En, Ct as Et, zn as F, p as Fn, it as Ft, Bn as G, y as Gt, An as H, qe as Ht, Vn as I, i as In, at as It, F as J, He as Jt, Rn as K, Ue as Kt, Pn as L, re as Ln, ot as Lt, Wn as M, u as Mn, Ze as Mt, kn as N, e as Nn, Qe as Nt, Jn as O, a as On, _t as Ot, Fn as P, f as Pn, $e as Pt, M as Q, Fe as Qt, In as R, st as Rt, Qn as S, ye as Sn, kt as St, pr as T, Ce as Tn, Et as Tt, Hn as U, Ve as Ut, Nn as V, Ye as Vt, Ln as W, b as Wt, Sn as X, Be as Xt, P as Y, x as Yt, bn as Z, We as Zt, sr as _, ue as _n, S as _t, Rr as a, ke as an, E as at, z as b, Oe as bn, St as bt, Ir as c, v as cn, Yt as ct, G as d, oe as dn, Bt as dt, Le as en, j as et, U as f, ce as fn, zt as ft, ar as g, Te as gn, jt as gt, Z as h, le as hn, Ft as ht, zr as i, Ae as in, dn as it, Zn as j, s as jn, mt as jt, rr as k, ne as kn, ht as kt, Q as l, xe as ln, Ht as lt, Fr as m, de as mn, Lt as mt, Vr as n, ze as nn, O as nt, W as o, je as on, Kt as ot, Mr as p, pe as pn, It as pt, Dn as q, Ge as qt, Br as r, Ne as rn, T as rt, V as s, Me as sn, Xt as st, Hr as t, Re as tn, wn as tt, B as u, Se as un, Vt as ut, $n as v, Ee as vn, xt as vt, _r as w, _ as wn, Dt as wt, er as x, ve as xn, wt as xt, ir as y, ae as yn, Tt as yt, I as z, ct as zt };
