import { $ as e, $t as t, A as n, An as r, At as i, B as a, Bt as o, C as s, Ct as c, D as l, Dn as u, Dt as d, E as f, En as p, F as m, Fn as h, G as g, Gt as _, H as v, Ht as y, I as b, J as x, Jt as S, K as C, Kt as w, L as T, Lt as E, M as D, Mn as ee, Nn as te, Nt as O, O as k, On as A, P as j, Pn as M, Q as N, Sn as P, St as ne, T as F, Tn as re, Tt as ie, U as I, Ut as L, V as ae, Vt as R, W as z, Wt as B, X as oe, Xt as V, Yt as H, Z as se, Zt as ce, _ as U, _n as le, _t as ue, a as de, an as fe, at as pe, b as me, bn as he, c as ge, cn as _e, d as ve, dn as ye, dt as be, f as xe, fn as Se, ft as Ce, g as we, gn as Te, gt as Ee, hn as De, ht as Oe, i as ke, jn as Ae, jt as je, k as Me, l as W, ln as Ne, lt as Pe, m as Fe, mn as Ie, nn as Le, nt as Re, o as G, on as ze, ot as K, p as Be, pn as Ve, pt as He, q as Ue, qt as We, rn as Ge, rt as q, s as Ke, sn as qe, st as Je, t as Ye, tn as Xe, u as Ze, un as Qe, ut as $e, v as et, w as tt, wn as nt, wt as rt, x as it, xn as at, z as J } from "./index-client-B2aDKUZc.js";
// node_modules/svelte/src/attachments/index.js
function ot() {
	return Symbol(Ge);
}
// node_modules/svelte/src/utils.js
function st(e) {
	return e.endsWith("capture") && e !== "gotpointercapture" && e !== "lostpointercapture";
}
var ct = [
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
function lt(e) {
	return ct.includes(e);
}
var ut = /* @__PURE__ */ "allowfullscreen.async.autofocus.autoplay.checked.controls.default.disabled.formnovalidate.indeterminate.inert.ismap.loop.multiple.muted.nomodule.novalidate.open.playsinline.readonly.required.reversed.seamless.selected.webkitdirectory.defer.disablepictureinpicture.disableremoteplayback".split("."), dt = {
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
function ft(e) {
	return e = e.toLowerCase(), dt[e] ?? e;
}
[...ut];
var pt = ["touchstart", "touchmove"];
function mt(e) {
	return pt.includes(e);
}
var ht = [
	"textarea",
	"script",
	"style",
	"title"
];
function gt(e) {
	return ht.includes(e);
}
// node_modules/svelte/src/internal/client/dom/elements/events.js
var _t = Symbol("events"), vt = /* @__PURE__ */ new Set(), yt = /* @__PURE__ */ new Set();
function bt(e) {
	if (!_) return;
	e.removeAttribute("onload"), e.removeAttribute("onerror");
	let t = e.__e;
	t !== void 0 && (e.__e = void 0, queueMicrotask(() => {
		e.isConnected && e.dispatchEvent(t);
	}));
}
function xt(e, t, n, r = {}) {
	function i(e) {
		if (r.capture || Ot.call(t, e), !e.cancelBubble) return be(() => n?.call(this, e));
	}
	return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? (i.__removed = !1, Ee(() => {
		i.__removed || t.addEventListener(e, i, r);
	})) : t.addEventListener(e, i, r), i;
}
function St(e, t, n, r = {}) {
	var i = xt(t, e, n, r);
	return () => {
		i.__removed = !0, e.removeEventListener(t, i, r);
	};
}
function Ct(e, t, n, r, i) {
	var a = {
		capture: r,
		passive: i
	}, o = xt(e, t, n, a);
	(t === document.body || t === window || t === document || t instanceof HTMLMediaElement) && k(() => {
		o.__removed = !0, t.removeEventListener(e, o, a);
	});
}
function wt(e, t, n) {
	(t[_t] ??= {})[e] = n;
}
function Tt(e) {
	for (var t = 0; t < e.length; t++) vt.add(e[t]);
	for (var n of yt) n(e);
}
var Et = null, Dt = !1;
function Ot(e) {
	var t = this, n = t.ownerDocument, r = e.type, i = e.composedPath?.() || [], a = i[0] || e.target;
	Et = e, Dt || (Dt = !0, setTimeout(() => {
		Dt = !1, Et = null;
	}));
	var o = 0, s = Et === e && e[_t];
	if (s) {
		var c = i.indexOf(s);
		if (c !== -1 && (t === document || t === window)) {
			e[_t] = t;
			return;
		}
		var l = i.indexOf(t);
		if (l === -1) return;
		c <= l && (o = c);
	}
	if (a = i[o] || e.target, a !== t) {
		A(e, "currentTarget", {
			configurable: !0,
			get() {
				return a || n;
			}
		});
		var u = Ke, d = G;
		xe(null), ve(null);
		try {
			for (var f, p = []; a !== null && a !== t;) {
				try {
					var m = a[_t]?.[r];
					m == null || a.disabled && e.target !== a || m.call(a, e);
				} catch (e) {
					f ? p.push(e) : f = e;
				}
				if (e.cancelBubble) break;
				o++, a = o < i.length ? i[o] : null;
			}
			if (f) {
				for (let e of p) queueMicrotask(() => {
					throw e;
				});
				throw f;
			}
		} finally {
			e[_t] = t, delete e.currentTarget, xe(u), ve(d);
		}
	}
}
// node_modules/svelte/src/internal/client/dom/reconciler.js
var kt = globalThis?.window?.trustedTypes && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", { createHTML: (e) => e });
function At(e) {
	return kt?.createHTML(e) ?? e;
}
function jt(e) {
	var t = b("template");
	return t.innerHTML = At(e.replaceAll("<!>", "<!---->")), t.content;
}
// node_modules/svelte/src/internal/client/dom/template.js
function Mt(e, t) {
	var n = G;
	n.nodes === null && (n.nodes = {
		start: e,
		end: t,
		a: null,
		t: null
	});
}
/*#__NO_SIDE_EFFECTS__*/
function Nt(e, t) {
	var n = !!(t & 1), r = !!(t & 2), i, a = !e.startsWith("<!>");
	return () => {
		if (_) return Mt(B, null), B;
		i === void 0 && (i = jt(a ? e : "<!>" + e), n || (i = /* @__PURE__ */ J(i)));
		var t = r || v ? document.importNode(i, !0) : i.cloneNode(!0);
		if (n) {
			var o = /* @__PURE__ */ J(t), s = t.lastChild;
			Mt(o, s);
		} else Mt(t, t);
		return t;
	};
}
/*#__NO_SIDE_EFFECTS__*/
function Pt(e, t, n = "svg") {
	var r = !e.startsWith("<!>"), i = !!(t & 1), a = `<${n}>${r ? e : "<!>" + e}</${n}>`, o;
	return () => {
		if (_) return Mt(B, null), B;
		if (!o) {
			var e = jt(a), t = /* @__PURE__ */ J(e);
			if (i) for (o = document.createDocumentFragment(); /* @__PURE__ */ J(t);) o.appendChild(/* @__PURE__ */ J(t));
			else o = /* @__PURE__ */ J(t);
		}
		var n = o.cloneNode(!0);
		if (i) {
			var r = /* @__PURE__ */ J(n), s = n.lastChild;
			Mt(r, s);
		} else Mt(n, n);
		return n;
	};
}
/*#__NO_SIDE_EFFECTS__*/
function Ft(e, t) {
	return /* @__PURE__ */ Pt(e, t, "svg");
}
function It(e = "") {
	if (!_) {
		var t = T(e + "");
		return Mt(t, t), t;
	}
	var n = B;
	return n.nodeType === 3 ? I(n) : (n.before(n = T()), H(n)), Mt(n, n), n;
}
function Lt() {
	if (_) return Mt(B, null), B;
	var e = document.createDocumentFragment(), t = document.createComment(""), n = T();
	return e.append(t, n), Mt(t, n), e;
}
function Rt(e, t) {
	if (_) {
		var n = G;
		n.f & 32768 && n.nodes.end !== null || (n.nodes.end = B), L();
	} else e !== null && e.before(t);
}
function zt() {
	if (_ && B && B.nodeType === 8 && B.textContent?.startsWith("$")) {
		let e = B.textContent.substring(1);
		return L(), e;
	}
	return (window.__svelte ??= {}).uid ??= 1, `c${window.__svelte.uid++}`;
}
// node_modules/svelte/src/internal/client/dom/blocks/boundary.js
var Bt = De | Ie;
function Vt(e, t, n, r) {
	new Ht(e, t, n, r);
}
var Ht = class {
	parent;
	is_pending = !1;
	transform_error;
	#e;
	#t = _ ? B : null;
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
	#m = de(() => (this.#p = e(this.#l), () => {
		this.#p = null;
	}));
	constructor(e, t, n, r) {
		this.#e = e, this.#n = t, this.#r = (e) => {
			var t = G;
			t.b = this, t.f |= 128, n(e);
		}, this.parent = G.b, this.transform_error = r ?? this.parent?.transform_error ?? ((e) => e), this.#i = we(() => {
			if (_) {
				let e = We(this.#t);
				L();
				let t = e === "[!";
				if (e.startsWith("[?")) {
					let t = JSON.parse(e.slice(2));
					this.#g(t);
				} else t ? this.#y() : this.#h();
			} else this.#b();
		}, Bt), _ && (this.#e = B);
	}
	#h() {
		try {
			this.#a = U(() => this.#r(this.#e));
		} catch (e) {
			this.error(e);
		}
	}
	#g(e) {
		let t = this.#n.failed, { reset: n, invoke_onerror: r } = this.#_(e);
		Ee(r), t && (this.#s = U(() => {
			t(this.#e, () => e, () => n);
		}));
	}
	#_(e) {
		var t = !1, n = !1;
		let r = () => {
			this.#v() || (t ? Le() : (t = !0, n && o(), this.#s !== null && F(this.#s, () => {
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
					D(e, this.#i && this.#i.parent);
				}
			}
		};
	}
	#v() {
		return (this.#i.f & (ye | Se)) !== 0;
	}
	#y() {
		let e = this.#n.pending;
		e && (this.is_pending = !0, this.#o = U(() => e(this.#e)), Ee(() => {
			if (!this.#v()) {
				var e = this.#c = document.createDocumentFragment(), t = T(), n = !1;
				e.append(t), this.#a = this.#S(() => {
					try {
						return U(() => this.#r(t));
					} catch (e) {
						try {
							this.error(e), n = !0;
						} catch (e) {
							D(e, this.#i.parent);
						}
						return null;
					}
				}), this.#a === null ? (this.#c = null, n && this.#x(q)) : this.#u === 0 && (this.#e.before(e), this.#c = null, F(this.#o, () => {
					this.#o = null;
				}), this.#x(q));
			}
		}));
	}
	#b() {
		try {
			if (this.is_pending = this.has_pending_snippet(), this.#u = 0, this.#l = 0, this.#a = U(() => {
				this.#r(this.#e);
			}), this.#u > 0) {
				var e = this.#c = document.createDocumentFragment();
				tt(this.#a, e);
				let t = this.#n.pending;
				this.#o = U(() => t(this.#e));
			} else this.#x(q);
		} catch (e) {
			this.error(e);
		}
	}
	#x(e) {
		this.is_pending = !1, e.transfer_reactions(this.#f);
	}
	defer_effect(e) {
		Oe(e, this.#f);
	}
	is_rendered() {
		return !this.is_pending && (!this.parent || this.parent.is_rendered());
	}
	has_pending_snippet() {
		return !!this.#n.pending;
	}
	#S(e) {
		var t = G, n = Ke, r = ue;
		ve(this.#i), xe(this.#i), d(this.#i.ctx);
		try {
			return Re.ensure(), e();
		} finally {
			ve(t), xe(n), d(r);
		}
	}
	#C(e, t) {
		this.has_pending_snippet() ? (this.#u += e, this.#u === 0 && (this.#x(t), this.#o && F(this.#o, () => {
			this.#o = null;
		}), this.#c &&= (this.#e.before(this.#c), null))) : this.parent && this.parent.#C(e, t);
	}
	update_pending_count(e, t) {
		this.#C(e, t), this.#l += e, !this.#p || this.#d || (this.#d = !0, Ee(() => {
			this.#d = !1, this.#p && oe(this.#p, this.#l);
		}));
	}
	get_effect_pending() {
		return this.#m(), W(this.#p);
	}
	error(e) {
		if (e === fe || !this.#n.onerror && !this.#n.failed) throw e;
		q?.is_fork ? (this.#a && q.skip_effect(this.#a), this.#o && q.skip_effect(this.#o), this.#s && q.skip_effect(this.#s), q.oncommit(() => {
			this.#v() || this.#w(e);
		})) : this.#w(e);
	}
	#w(e) {
		this.#a &&= (me(this.#a), null), this.#o &&= (me(this.#o), null), this.#s &&= (me(this.#s), null), _ && (H(this.#t), w(), H(ce()));
		let t = this.#n.failed, n = (e) => {
			if (this.#v()) return;
			let { reset: n, invoke_onerror: r } = this.#_(e);
			r(), t && !this.#v() && (this.#s = this.#S(() => {
				try {
					return U(() => {
						var r = G;
						r.b = this, r.f |= 128, t(this.#e, () => e, () => n);
					});
				} catch (e) {
					return D(e, this.#i.parent), null;
				}
			}));
		};
		Ee(() => {
			if (!this.#v()) {
				var t;
				try {
					t = this.transform_error(e);
				} catch (e) {
					D(e, this.#i && this.#i.parent);
					return;
				}
				typeof t == "object" && t && typeof t.then == "function" ? t.then(n, (e) => D(e, this.#i && this.#i.parent)) : n(t);
			}
		});
	}
};
function Ut(e, t) {
	var n = t == null ? "" : typeof t == "object" ? `${t}` : t;
	n !== (e[p] ??= e.nodeValue) && (e[p] = n, e.nodeValue = `${n}`);
}
function Wt(e, t) {
	return Kt(e, t);
}
var Gt = /* @__PURE__ */ new Map();
function Kt(e, { target: n, anchor: r, props: i = {}, events: a, context: o, intro: s = !0, transformError: l }) {
	ae();
	var d = void 0, f = et(() => {
		var s = r ?? n.appendChild(T());
		Vt(s, { pending: () => {} }, (n) => {
			ie({});
			var r = ue;
			if (o && (r.c = o), a && (i.$$events = a), _ && Mt(n, null), d = e(n, i) || c(), _ && (G.nodes.end = B, B === null || B.nodeType !== 8 || B.data !== "]")) throw t(), fe;
			rt();
		}, l);
		var f = /* @__PURE__ */ new Set(), p = (e) => {
			for (var t = 0; t < e.length; t++) {
				var r = e[t];
				if (!f.has(r)) {
					f.add(r);
					var i = mt(r);
					for (let e of [n, document]) {
						var a = Gt.get(e);
						a === void 0 && (a = /* @__PURE__ */ new Map(), Gt.set(e, a));
						var o = a.get(r);
						o === void 0 ? (e.addEventListener(r, Ot, { passive: i }), a.set(r, 1)) : a.set(r, o + 1);
					}
				}
			}
		};
		return p(u(vt)), yt.add(p), () => {
			for (var e of f) for (let r of [n, document]) {
				var t = Gt.get(r), i = t.get(e);
				--i == 0 ? (r.removeEventListener(e, Ot), t.delete(e), t.size === 0 && Gt.delete(r)) : t.set(e, i);
			}
			yt.delete(p), s !== r && s.parentNode?.removeChild(s);
		};
	});
	return qt.set(d, f), d;
}
var qt = /* @__PURE__ */ new WeakMap();
function Jt(e, t) {
	let n = qt.get(e);
	return n ? (qt.delete(e), n(t)) : Promise.resolve();
}
// node_modules/svelte/src/internal/client/dom/blocks/branches.js
var Yt = class {
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
			if (n) l(n), this.#r.delete(t);
			else {
				var r = this.#n.get(t);
				r && (l(r.effect), this.#t.set(t, r.effect), this.#n.delete(t), r.fragment.lastChild.remove(), this.anchor.before(r.fragment), n = r.effect);
			}
			for (let [t, n] of this.#e) {
				if (this.#e.delete(t), t === e) break;
				let r = this.#n.get(n);
				r && (me(r.effect), this.#n.delete(n));
			}
			for (let [e, r] of this.#t) {
				if (e === t || this.#r.has(e)) continue;
				let i = () => {
					if (Array.from(this.#e.values()).includes(e)) {
						var t = document.createDocumentFragment();
						tt(r, t), t.append(T()), this.#n.set(e, {
							effect: r,
							fragment: t
						});
					} else me(r);
					this.#r.delete(e), this.#t.delete(e);
				};
				this.#i || !n ? (this.#r.add(e), F(r, i, !1)) : i();
			}
		}
	};
	#o = (e) => {
		this.#e.delete(e);
		let t = Array.from(this.#e.values());
		for (let [e, n] of this.#n) t.includes(e) || (me(n.effect), this.#n.delete(e));
	};
	ensure(e, t) {
		var n = q, r = g();
		if (t && !this.#t.has(e) && !this.#n.has(e)) {
			if (r) {
				var i = document.createDocumentFragment(), a = T();
				i.append(a), this.#n.set(e, {
					effect: U(() => t(a)),
					fragment: i
				});
			} else this.#t.set(e, U(() => t(this.anchor)));
		}
		if (this.#e.set(n, e), r) {
			for (let [t, r] of this.#t) t === e ? n.unskip_effect(r) : n.skip_effect(r);
			for (let [t, r] of this.#n) t === e ? n.unskip_effect(r.effect) : n.skip_effect(r.effect);
			n.oncommit(this.#a), n.ondiscard(this.#o);
		} else _ && (this.anchor = B), this.#a(n);
	}
};
// node_modules/svelte/src/internal/client/dom/blocks/if.js
function Xt(e, t, n = !1) {
	var r;
	_ && (r = B, L());
	var i = new Yt(e), a = n ? De : 0;
	function o(e, t) {
		if (_) {
			var n = We(r);
			if (e !== parseInt(n.substring(1))) {
				var a = ce();
				H(a), i.anchor = a, V(!1), i.ensure(e, t), V(!0);
				return;
			}
		}
		i.ensure(e, t);
	}
	we(() => {
		var e = !1;
		t((t, n = 0) => {
			e = !0, o(n, t);
		}), e || o(-1, null);
	}, a);
}
// node_modules/svelte/src/internal/client/dom/blocks/key.js
var Zt = Symbol("NaN");
function Qt(e, t, n) {
	_ && L();
	var r = new Yt(e), i = !ne();
	we(() => {
		var e = t();
		e !== e && (e = Zt), i && typeof e == "object" && e && (e = {}), r.ensure(e, n);
	});
}
// node_modules/svelte/src/internal/client/dom/blocks/each.js
function $t(e, t) {
	return t;
}
function en(e, t, n) {
	for (var r = [], i = t.length, a, o = t.length, s = 0; s < i; s++) {
		let n = t[s];
		F(n, () => {
			if (a) {
				if (a.pending.delete(n), a.done.add(n), a.pending.size === 0) {
					var t = e.outrogroups;
					tn(e, u(a.done)), t.delete(a), t.size === 0 && (e.outrogroups = null);
				}
			} else --o;
		}, !1);
	}
	if (o === 0) {
		var c = r.length === 0 && n !== null && e.pending.size === 0;
		if (c) {
			var l = n, d = l.parentNode;
			m(d), d.append(l), e.items.clear();
		}
		tn(e, t, !c);
	} else a = {
		pending: new Set(t),
		done: /* @__PURE__ */ new Set()
	}, (e.outrogroups ??= /* @__PURE__ */ new Set()).add(a);
}
function tn(e, t, n = !0) {
	var r;
	if (e.pending.size > 0) {
		r = /* @__PURE__ */ new Set();
		for (let t of e.pending.values()) for (let n of t) r.add(e.items.get(n).e);
	}
	for (var i = 0; i < t.length; i++) {
		var a = t[i];
		if (r?.has(a)) {
			a.f |= Ve;
			let e = document.createDocumentFragment();
			tt(a, e);
		} else me(t[i], n);
	}
}
var nn;
function rn(e, t, n, r, i, a = null) {
	var o = e, s = /* @__PURE__ */ new Map();
	if (t & 4) {
		var c = e;
		o = _ ? H(/* @__PURE__ */ J(c)) : c.appendChild(T());
	}
	_ && L();
	var d = null, f = /* @__PURE__ */ Je(() => {
		var e = n();
		return te(e) ? e : e == null ? [] : u(e);
	}), p = /* @__PURE__ */ new Map(), m = !0;
	function h(e) {
		if (!(y.effect.f & 16384)) {
			y.pending.delete(e);
			var n = W(f);
			y.fallback = d, on(y, n, o, t, r), d !== null && (n.length === 0 ? d.f & 33554432 ? (d.f ^= Ve, cn(d, null, o)) : l(d) : F(d, () => {
				d = null;
			}));
		}
	}
	function v(e) {
		y.pending.delete(e);
	}
	var y = {
		effect: we(() => {
			var e = W(f), c = e.length;
			let l = !1;
			_ && We(o) === "[!" != (c === 0) && (o = ce(), H(o), V(!1), l = !0);
			for (var u = /* @__PURE__ */ new Set(), y = q, b = g(), x = 0; x < c; x += 1) {
				_ && B.nodeType === 8 && B.data === "]" && (o = B, l = !0, V(!1));
				var S = e[x], C = r(S, x), w = m ? null : s.get(C);
				w ? (w.v && oe(w.v, S), w.i && oe(w.i, x), b && y.unskip_effect(w.e)) : (w = sn(s, m ? o : nn ??= T(), S, C, x, i, t, n), m || (w.e.f |= Ve), s.set(C, w)), u.add(C);
			}
			if (c === 0 && a && !d && (m ? d = U(() => a(o)) : (d = U(() => a(nn ??= T())), d.f |= Ve)), c > u.size && O("", "", ""), _ && c > 0 && H(ce()), !m) {
				if (p.set(y, u), b) {
					for (let [e, t] of s) u.has(e) || y.skip_effect(t.e);
					y.oncommit(h), y.ondiscard(v);
				} else h(y);
			}
			l && V(!0), W(f);
		}),
		flags: t,
		items: s,
		pending: p,
		outrogroups: null,
		fallback: d
	};
	m = !1, _ && (o = B);
}
function an(e) {
	for (; e !== null && !(e.f & 32);) e = e.next;
	return e;
}
function on(e, t, n, r, i) {
	var a = !!(r & 8), o = t.length, s = e.items, c = an(e.effect.first), d, f = null, p, m = [], h = [], g, _, v, y;
	if (a) for (y = 0; y < o; y += 1) g = t[y], _ = i(g, y), v = s.get(_).e, v.f & 33554432 || (v.nodes?.a?.measure(), (p ??= /* @__PURE__ */ new Set()).add(v));
	for (y = 0; y < o; y += 1) {
		if (g = t[y], _ = i(g, y), v = s.get(_).e, e.outrogroups !== null) for (let t of e.outrogroups) t.pending.delete(v), t.done.delete(v);
		if (v.f & 8192 && (l(v), a && (v.nodes?.a?.unfix(), (p ??= /* @__PURE__ */ new Set()).delete(v))), v.f & 33554432) {
			if (v.f ^= Ve, v === c) cn(v, null, n);
			else {
				var b = f ? f.next : c;
				v === e.effect.last && (e.effect.last = v.prev), v.prev && (v.prev.next = v.next), v.next && (v.next.prev = v.prev), ln(e, f, v), ln(e, v, b), cn(v, b, n), f = v, m = [], h = [], c = an(f.next);
				continue;
			}
		}
		if (v !== c) {
			if (d !== void 0 && d.has(v)) {
				if (m.length < h.length) {
					var x = h[0], S;
					f = x.prev;
					var C = m[0], w = m[m.length - 1];
					for (S = 0; S < m.length; S += 1) cn(m[S], x, n);
					for (S = 0; S < h.length; S += 1) d.delete(h[S]);
					ln(e, C.prev, w.next), ln(e, f, C), ln(e, w, x), c = x, f = w, --y, m = [], h = [];
				} else d.delete(v), cn(v, c, n), ln(e, v.prev, v.next), ln(e, v, f === null ? e.effect.first : f.next), ln(e, f, v), f = v;
				continue;
			}
			for (m = [], h = []; c !== null && c !== v;) (d ??= /* @__PURE__ */ new Set()).add(c), h.push(c), c = an(c.next);
			if (c === null) continue;
		}
		v.f & 33554432 || m.push(v), f = v, c = an(v.next);
	}
	if (e.outrogroups !== null) {
		for (let t of e.outrogroups) t.pending.size === 0 && (tn(e, u(t.done)), e.outrogroups?.delete(t));
		e.outrogroups.size === 0 && (e.outrogroups = null);
	}
	if (c !== null || d !== void 0) {
		var T = [];
		if (d !== void 0) for (v of d) v.f & 8192 || T.push(v);
		for (; c !== null;) !(c.f & 8192) && c !== e.fallback && T.push(c), c = an(c.next);
		var E = T.length;
		if (E > 0) {
			var D = r & 4 && o === 0 ? n : null;
			if (a) {
				for (y = 0; y < E; y += 1) T[y].nodes?.a?.measure();
				for (y = 0; y < E; y += 1) T[y].nodes?.a?.fix();
			}
			en(e, T, D);
		}
	}
	a && Ee(() => {
		if (p !== void 0) for (v of p) v.nodes?.a?.apply();
	});
}
function sn(t, n, r, i, a, o, s, c) {
	var l = s & 1 ? s & 16 ? e(r) : /* @__PURE__ */ se(r, !1, !1) : null, u = s & 2 ? e(a) : null;
	return {
		v: l,
		i: u,
		e: U(() => (o(n, l ?? r, u ?? a, c), () => {
			t.delete(i);
		}))
	};
}
function cn(e, t, n) {
	if (e.nodes) for (var r = e.nodes.start, i = e.nodes.end, o = t && !(t.f & 33554432) ? t.nodes.start : n; r !== null;) {
		var s = /* @__PURE__ */ a(r);
		if (o.before(r), r === i) return;
		r = s;
	}
}
function ln(e, t, n) {
	t === null ? e.effect.first = n : t.next = n, n === null ? e.effect.last = t : n.prev = t;
}
// node_modules/svelte/src/internal/client/dom/blocks/snippet.js
function un(e, t, ...n) {
	var r = new Yt(e);
	we(() => {
		let e = t() ?? null;
		r.ensure(e, e && ((t) => e(t, ...n)));
	}, De);
}
// node_modules/svelte/src/internal/client/dom/blocks/svelte-component.js
function dn(e, t, n) {
	var r;
	_ && (r = B, L());
	var i = new Yt(e);
	we(() => {
		var e = t() ?? null;
		if (_ && We(r) === "[" != (e !== null)) {
			var a = ce();
			H(a), i.anchor = a, V(!1), i.ensure(e, e && ((t) => n(t, e))), V(!0);
		} else i.ensure(e, e && ((t) => n(t, e)));
	}, De);
}
// node_modules/svelte/src/internal/client/dom/blocks/svelte-element.js
function fn(e, t, n, r, i, a) {
	let o = _;
	_ && L();
	var s = null;
	_ && B.nodeType === 1 && (s = B, L());
	var c = _ ? B : e, l = new Yt(c, !1);
	we(() => {
		let e = t() || null;
		var a = i ? i() : n || e === "svg" ? qe : void 0;
		if (e === null) l.ensure(null, null);
		else return l.ensure(e, (t) => {
			if (e) {
				var n = _;
				if (s = _ ? s : b(e, a), Mt(s, s), r) {
					var i = null;
					_ && gt(e) && s.append(i = document.createComment(""));
					var o = _ ? /* @__PURE__ */ J(s) : s.appendChild(T());
					_ && (o === null ? V(!1) : H(o)), r(s, o), i?.remove();
				}
				G.nodes.end = s, n || t.before(s);
			}
			_ && H(t);
		}), () => {};
	}, De), k(() => {}), o && (V(!0), H(c));
}
// node_modules/svelte/src/internal/client/dom/blocks/svelte-head.js
function pn(e, t) {
	let n = null, r = _;
	var i;
	if (_) {
		n = B;
		for (var o = /* @__PURE__ */ J(document.head); o !== null && (o.nodeType !== 8 || o.data !== e);) o = /* @__PURE__ */ a(o);
		if (o === null) V(!1);
		else {
			var s = /* @__PURE__ */ a(o);
			o.remove(), H(s);
		}
	}
	_ || (i = document.head.appendChild(T()));
	try {
		we(() => {
			var e = U(() => t(i));
			e.f |= le, _ || (e.nodes === null ? e.nodes = {
				start: i,
				end: i,
				a: null,
				t: null
			} : e.nodes.end = i);
		});
	} finally {
		r && (V(!0), H(n));
	}
}
// node_modules/svelte/src/internal/client/dom/elements/actions.js
function mn(e, t, n) {
	it(() => {
		var r = Fe(() => t(e, n?.()) || {});
		if (n && r?.update) {
			var i = !1, a = {};
			f(() => {
				var e = n();
				ge(e), i && y(a, e) && (a = e, r.update(e));
			}), i = !0;
		}
		if (r?.destroy) return () => r.destroy();
	});
}
// node_modules/svelte/src/internal/client/dom/elements/attachments.js
function hn(e, t) {
	var n = void 0, r;
	s(() => {
		n !== (n = t()) && (r &&= (me(r), null), n && (r = U(() => {
			it(() => n(e));
		})));
	});
}
// node_modules/clsx/dist/clsx.mjs
function gn(e) {
	var t, n, r = "";
	if (typeof e == "string" || typeof e == "number") r += e;
	else if (typeof e == "object") {
		if (Array.isArray(e)) {
			var i = e.length;
			for (t = 0; t < i; t++) e[t] && (n = gn(e[t])) && (r && (r += " "), r += n);
		} else for (n in e) e[n] && (r && (r += " "), r += n);
	}
	return r;
}
function _n() {
	for (var e, t, n = 0, r = "", i = arguments.length; n < i; n++) (e = arguments[n]) && (t = gn(e)) && (r && (r += " "), r += t);
	return r;
}
// node_modules/svelte/src/internal/shared/attributes.js
function vn(e) {
	return typeof e == "object" ? _n(e) : e ?? "";
}
var yn = [..." 	\n\r\f\xA0\v﻿"];
function bn(e, t, n) {
	var r = e == null ? "" : "" + e;
	if (t && (r = r ? r + " " + t : t), n) {
		for (var i of Object.keys(n)) if (n[i]) r = r ? r + " " + i : i;
		else if (r.length) for (var a = i.length, o = 0; (o = r.indexOf(i, o)) >= 0;) {
			var s = o + a;
			(o === 0 || yn.includes(r[o - 1])) && (s === r.length || yn.includes(r[s])) ? r = (o === 0 ? "" : r.substring(0, o)) + r.substring(s + 1) : o = s;
		}
	}
	return r === "" ? null : r;
}
function xn(e, t = !1) {
	var n = t ? " !important;" : ";", r = "";
	for (var i of Object.keys(e)) {
		var a = e[i];
		a != null && a !== "" && (r += " " + i + ": " + a + n);
	}
	return r;
}
function Sn(e) {
	return e[0] !== "-" || e[1] !== "-" ? e.toLowerCase() : e;
}
function Cn(e, t) {
	if (t) {
		var n = "", r, i;
		if (Array.isArray(t) ? (r = t[0], i = t[1]) : r = t, e) {
			e = String(e).replaceAll(/\/\*.*?\*\//g, "").trim();
			var a = !1, o = 0, s = !1, c = [];
			r && c.push(...Object.keys(r).map(Sn)), i && c.push(...Object.keys(i).map(Sn));
			var l = 0, u = -1;
			let t = e.length;
			for (var d = 0; d < t; d++) {
				var f = e[d];
				if (s ? f === "/" && e[d - 1] === "*" && (s = !1) : a ? a === f && (a = !1) : f === "/" && e[d + 1] === "*" ? s = !0 : f === "\"" || f === "'" ? a = f : f === "(" ? o++ : f === ")" && o--, !s && a === !1 && o === 0) {
					if (f === ":" && u === -1) u = d;
					else if (f === ";" || d === t - 1) {
						if (u !== -1) {
							var p = Sn(e.substring(l, u).trim());
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
		return r && (n += xn(r)), i && (n += xn(i, !0)), n = n.trim(), n === "" ? null : n;
	}
	return e == null ? null : String(e);
}
// node_modules/svelte/src/internal/client/dom/elements/class.js
function wn(e, t, n, r, i, a) {
	var o = e[Qe];
	if (_ || o !== n || o === void 0) {
		var s = bn(n, r, a);
		_ && s === e.getAttribute("class") || (s == null ? e.removeAttribute("class") : t ? e.className = s : e.setAttribute("class", s)), e[Qe] = n;
	} else if (a && i !== a) for (var c in a) {
		var l = !!a[c];
		(i == null || l !== !!i[c]) && e.classList.toggle(c, l);
	}
	return a;
}
// node_modules/svelte/src/internal/client/dom/elements/style.js
function Tn(e, t = {}, n, r) {
	for (var i in n) {
		var a = n[i];
		t[i] !== a && (n[i] == null ? e.style.removeProperty(i) : e.style.setProperty(i, a, r));
	}
}
function En(e, t, n, r) {
	var i = e[re];
	if (_ || i !== t) {
		var a = Cn(t, r);
		_ && a === e.getAttribute("style") || (a == null ? e.removeAttribute("style") : e.style.cssText = a), e[re] = t;
	} else r && (Array.isArray(r) ? (Tn(e, n?.[0], r[0]), Tn(e, n?.[1], r[1], "important")) : Tn(e, n, r));
	return r;
}
// node_modules/svelte/src/internal/client/dom/elements/bindings/select.js
function Dn(e, t) {
	t ? e.hasAttribute("selected") || e.setAttribute("selected", "") : e.removeAttribute("selected");
}
function On(e, t) {
	var n = !("__defaultValue" in e);
	(n || e.__defaultValue !== t) && (e.__defaultValue = t, kn(e, !n || "__value" in e));
}
function kn(e, t) {
	var n = e.__defaultValue, r = e.multiple, i = r ? n ?? [] : null;
	if (!r || te(i)) {
		var a = e.selectedIndex, o = t && r ? new Set(e.selectedOptions) : null;
		for (var s of e.options) {
			var c = Mn(s);
			Dn(s, r ? i.includes(c) : Ue(c, n));
		}
		if (t) {
			if (o !== null) for (s of e.options) {
				var l = o.has(s);
				s.selected !== l && (s.selected = l);
			}
			else e.selectedIndex !== a && (e.selectedIndex = a);
		}
	}
}
function An(e, t, n = !1) {
	if (e.multiple) {
		if (t == null) return;
		if (!te(t)) return Xe();
		for (var r of e.options) r.selected = t.includes(Mn(r));
	} else {
		for (r of e.options) {
			var i = Mn(r);
			if (Ue(i, t)) {
				r.selected = !0;
				return;
			}
		}
		n && t === void 0 || (e.selectedIndex = -1);
	}
}
function jn(e) {
	var t = new MutationObserver((t) => {
		t.every(Nn) || ("__defaultValue" in e && kn(e, !1), "__value" in e && An(e, e.__value));
	});
	t.observe(e, {
		childList: !0,
		subtree: !0,
		attributes: !0,
		attributeFilter: ["value"]
	}), k(() => {
		t.disconnect();
	});
}
function Mn(e) {
	return "__value" in e ? e.__value : e.value;
}
function Nn(e) {
	if (e.target.closest("selectedcontent") !== null) return !0;
	if (e.type === "childList") {
		var t = [...e.addedNodes, ...e.removedNodes];
		return t.length > 0 && t.every((e) => e.nodeName === "SELECTEDCONTENT");
	}
	return !1;
}
// node_modules/svelte/src/internal/client/dom/elements/attributes.js
var Pn = Symbol("class"), Fn = Symbol("style"), In = Symbol("is custom element"), Ln = Symbol("is html"), Rn = he ? "link" : "LINK", zn = he ? "input" : "INPUT", Bn = he ? "option" : "OPTION", Vn = he ? "select" : "SELECT", Hn = he ? "progress" : "PROGRESS";
function Un(e) {
	if (_) {
		var t = !1, n = () => {
			if (!t) {
				if (t = !0, e.hasAttribute("value")) {
					var n = e.value;
					Kn(e, "value", null), e.value = n;
				}
				if (e.hasAttribute("checked")) {
					var r = e.checked;
					Kn(e, "checked", null), e.checked = r;
				}
			}
		};
		e[Te] = n, Ee(n), Ce();
	}
}
function Wn(e, t) {
	var n = Yn(e);
	n.value !== (n.value = t ?? void 0) && (e.value !== t || t === 0 && e.nodeName === Hn) && (e.value = t ?? "");
}
function Gn(e, t) {
	var n = Yn(e);
	n.checked !== (n.checked = t ?? void 0) && (e.checked = t);
}
function Kn(e, t, n, r) {
	var i = Yn(e);
	if (!(_ && (i[t] = e.getAttribute(t), t === "src" || t === "srcset" || t === "href" && e.nodeName === Rn))) {
		var a = i[t];
		a !== (i[t] = n) && (t === "loading" && (e[P] = n), n == null ? e.removeAttribute(t) : typeof n != "string" && Zn(e).has(t) ? e[t] = n : (!_ || typeof n != "number" && typeof n != "boolean" || a !== String(n)) && e.setAttribute(t, n));
	}
}
function qn(e, t, n, r, i = !1, a = !1) {
	_ && i && e.nodeName === zn && ("defaultValue" in n || "defaultChecked" in n || Un(e));
	var o = Yn(e), s = o[In], c = !o[Ln];
	let l = _ && s;
	l && V(!1);
	var u = t || {}, d = e.nodeName === Bn, f = e.nodeName === Vn;
	try {
		for (var p in t) !(p in n) && p[0] + p[1] !== "$$" && (n[p] = null);
		n.class ? n.class = vn(n.class) : (r || n[Pn]) && (n.class = null), n[Fn] && (n.style ??= null);
		var m = Zn(e);
		if (e.nodeName === zn && "type" in n && ("value" in n || "__value" in n)) {
			var h = n.type;
			(h !== u.type || h === void 0 && e.hasAttribute("type")) && (u.type = h, Kn(e, "type", h, a));
		}
		for (let i in n) {
			let l = n[i];
			if (d && i === "value" && l == null) e.value = e.__value = "", u[i] = l;
			else if (i === "class") wn(e, e.namespaceURI === "http://www.w3.org/1999/xhtml", l, r, t?.[Pn], n[Pn]), u[i] = l, u[Pn] = n[Pn];
			else if (i === "style") En(e, l, t?.[Fn], n[Fn]), u[i] = l, u[Fn] = n[Fn];
			else {
				var g = u[i];
				if (l !== g || l === void 0 && e.hasAttribute(i)) {
					u[i] = l;
					var v = i[0] + i[1];
					if (v !== "$$") {
						if (v === "on") {
							let t = {}, n = "$$" + i, r = i.slice(2);
							var y = lt(r);
							if (st(r) && (r = r.slice(0, -7), t.capture = !0), !y && g) {
								if (l != null) continue;
								e.removeEventListener(r, u[n], t), u[n] = null;
							}
							if (y) wt(r, e, l), Tt([r]);
							else if (l != null) {
								function a(e) {
									u[i].call(this, e);
								}
								u[n] = xt(r, e, a, t);
							}
						} else if (i === "style") Kn(e, i, l);
						else if (i === "autofocus") He(e, !!l);
						else if (!s && (i === "__value" || i === "value" && l != null)) e.__value = l, (g == null || e.value !== l || l === 0 && e.nodeName === Hn) && (e.value = l);
						else if (i === "selected" && d) Dn(e, l);
						else {
							var b = i;
							c || (b = ft(b));
							var x = b === "defaultValue" || b === "defaultChecked";
							if (f && b === "defaultValue") continue;
							if (l == null && !s && !x) {
								if (o[i] = null, b === "value" || b === "checked") {
									let n = e, r = t === void 0;
									if (b === "value") {
										let e = n.defaultValue;
										n.removeAttribute(b), n.defaultValue = e, n.value = n.__value = r ? e : null;
									} else {
										let e = n.defaultChecked;
										n.removeAttribute(b), n.defaultChecked = e, n.checked = r ? e : !1;
									}
								} else e.removeAttribute(i);
							} else x || (s || typeof l != "string") && m.has(b) ? (e[b] = l, b in o && (o[b] = _e)) : typeof l != "function" && Kn(e, b, l, a);
						}
					}
				}
			}
		}
	} finally {
		l && V(!0);
	}
	return u;
}
function Jn(e, t, n = [], r = [], i = [], a, o = !1, c = !1) {
	Pe(i, n, r, (n) => {
		var r = void 0, i = {}, l = e.nodeName === Vn, u = !1;
		if (s(() => {
			var s = t(...n.map(W)), d = qn(e, r, s, a, o, c);
			if (u && l) {
				var f = e;
				"defaultValue" in s && On(f, s.defaultValue), "value" in s && An(f, s.value);
			}
			for (let e of Object.getOwnPropertySymbols(i)) s[e] || me(i[e]);
			for (let t of Object.getOwnPropertySymbols(s)) {
				var p = s[t];
				t.description !== "@attach" || r && p === r[t] || (i[t] && me(i[t]), i[t] = U(() => hn(e, () => p))), d[t] = p;
			}
			r = d;
		}), l) {
			var d = e;
			it(() => {
				var e = r;
				"defaultValue" in e && On(d, e.defaultValue), An(d, e.value, !0), jn(d);
			});
		}
		u = !0;
	});
}
function Yn(e) {
	return e[Ne] ??= {
		[In]: e.nodeName.includes("-"),
		[Ln]: e.namespaceURI === ze
	};
}
var Xn = /* @__PURE__ */ new Map();
function Zn(e) {
	var t = e.getAttribute("is") || e.nodeName, n = Xn.get(t);
	if (n) return n;
	Xn.set(t, n = /* @__PURE__ */ new Set());
	for (var r, i = e, a = Element.prototype; a !== i;) {
		for (var o in r = Ae(i), r) r[o].set && o !== "innerHTML" && o !== "textContent" && o !== "innerText" && n.add(o);
		i = ee(i);
	}
	return n;
}
// node_modules/svelte/src/internal/client/dom/elements/bindings/input.js
function Qn(e, t, n = t) {
	var r = /* @__PURE__ */ new WeakSet();
	$e(e, "input", async (i) => {
		var a = i ? e.defaultValue : e.value;
		if (a = rr(e) ? ir(a) : a, n(a), q !== null && r.add(q), await Be(), a !== (a = t())) {
			var o = e.selectionStart, s = e.selectionEnd, c = e.value.length;
			if (e.value = a ?? "", s !== null) {
				var l = e.value.length;
				o === s && s === c && l > c ? (e.selectionStart = l, e.selectionEnd = l) : (e.selectionStart = o, e.selectionEnd = Math.min(s, l));
			}
		}
	}), (_ && e.defaultValue !== e.value || Fe(t) == null && e.value) && (n(rr(e) ? ir(e.value) : e.value), q !== null && r.add(q)), f(() => {
		var n = t();
		if (e === document.activeElement) {
			var a = i ? pe : q;
			if (r.has(a)) return;
		}
		rr(e) && n === ir(e.value) || (e.type !== "date" || n || e.value) && n !== e.value && (e.value = n ?? "");
	});
}
var $n = /* @__PURE__ */ new Set();
function er(e, t, n, r, i = r) {
	var a = n.getAttribute("type") === "checkbox", o = e;
	let s = !1;
	if (t !== null) for (var c of t) o = o[c] ??= [];
	o.push(n), $e(n, "change", () => {
		var e = n.__value;
		a && (e = nr(o, e, n.checked)), i(e);
	}, () => i(a ? [] : null)), f(() => {
		var e = r();
		_ && n.defaultChecked !== n.checked ? s = !0 : a ? (e ||= [], n.checked = e.includes(n.__value)) : n.checked = Ue(n.__value, e);
	}), k(() => {
		var e = o.indexOf(n);
		e !== -1 && o.splice(e, 1);
	}), $n.has(o) || ($n.add(o), Ee(() => {
		o.sort((e, t) => e.compareDocumentPosition(t) === 4 ? -1 : 1), $n.delete(o);
	})), Ee(() => {
		if (s) {
			var e = a ? nr(o, e, n.checked) : o.find((e) => e.checked)?.__value;
			i(e);
		}
	});
}
function tr(e, t, n = t) {
	$e(e, "change", (t) => {
		n(t ? e.defaultChecked : e.checked);
	}), (_ && e.defaultChecked !== e.checked || Fe(t) == null) && n(e.checked), f(() => {
		e.checked = !!t();
	});
}
function nr(e, t, n) {
	for (var r = /* @__PURE__ */ new Set(), i = 0; i < e.length; i += 1) e[i].checked && r.add(e[i].__value);
	return n || r.delete(t), Array.from(r);
}
function rr(e) {
	var t = e.type;
	return t === "number" || t === "range";
}
function ir(e) {
	return e === "" ? null : +e;
}
// node_modules/svelte/src/internal/client/dom/elements/bindings/this.js
function ar(e, t) {
	return e === t || e?.[nt] === t;
}
function or(e = c(), t, n, r) {
	var i = ue.r, a = G;
	return it(() => {
		var o, s;
		return f(() => {
			o = s, s = r?.() || [], Fe(() => {
				ar(n(...s), e) || (t(e, ...s), o && ar(n(...o), e) && t(null, ...o));
			});
		}), () => {
			let r = a;
			for (; r !== i && r.parent !== null && r.parent.f & 33554432;) r = r.parent;
			let o = () => {
				s && ar(n(...s), e) && t(null, ...s);
			}, c = r.teardown;
			r.teardown = () => {
				o(), c?.();
			};
		};
	}), e;
}
// node_modules/svelte/src/internal/client/dom/elements/bindings/universal.js
function sr(e, t, n, r, i) {
	var a = () => {
		r(n[e]);
	};
	n.addEventListener(t, a), i ? f(() => {
		n[e] = i();
	}) : a(), (n === document.body || n === window || n === document) && k(() => {
		n.removeEventListener(t, a);
	});
}
// node_modules/svelte/src/internal/client/reactivity/store.js
var cr = !1, lr = Symbol("unmounted");
function ur(e, t, n) {
	let r = n[t] ??= {
		store: null,
		source: /* @__PURE__ */ se(void 0),
		unsubscribe: h
	};
	if (r.store !== e && !(lr in n)) {
		if (r.unsubscribe(), r.store = e ?? null, e == null) r.source.v = void 0, r.unsubscribe = h;
		else {
			var i = !0;
			r.unsubscribe = ke(e, (e) => {
				i ? r.source.v = e : N(r.source, e);
			}), i = !1;
		}
	}
	return e && lr in n ? Ye(e) : W(r.source);
}
function dr() {
	let e = {};
	function t() {
		k(() => {
			for (var t in e) e[t].unsubscribe();
			A(e, lr, {
				enumerable: !1,
				value: !0
			});
		});
	}
	return [e, t];
}
function fr(e, t) {
	try {
		e.set(t);
	} finally {}
}
function pr(e, t, n) {
	return fr(e, n), t;
}
function mr(e) {
	var t = cr;
	try {
		return cr = !1, [e(), cr];
	} finally {
		cr = t;
	}
}
// node_modules/svelte/src/internal/client/reactivity/props.js
var hr = {
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
function gr(e, t, n) {
	return new Proxy({
		props: e,
		exclude: t
	}, hr);
}
var _r = {
	get(e, t) {
		let n = e.props.length;
		for (; n--;) {
			let r = e.props[n];
			if (M(r) && (r = r()), typeof r == "object" && r && t in r) return r[t];
		}
	},
	set(e, t, n) {
		let i = e.props.length;
		for (; i--;) {
			let a = e.props[i];
			M(a) && (a = a());
			let o = r(a, t);
			if (o && o.set) return o.set(n), !0;
		}
		return !1;
	},
	getOwnPropertyDescriptor(e, t) {
		let n = e.props.length;
		for (; n--;) {
			let i = e.props[n];
			if (M(i) && (i = i()), typeof i == "object" && i && t in i) {
				let e = r(i, t);
				return e && !e.configurable && (e.configurable = !0), e;
			}
		}
	},
	has(e, t) {
		if (t === nt || t === at) return !1;
		for (let n of e.props) if (M(n) && (n = n()), n != null && t in n) return !0;
		return !1;
	},
	ownKeys(e) {
		let t = [];
		for (let n of e.props) if (M(n) && (n = n()), n) {
			for (let e in n) t.includes(e) || t.push(e);
			for (let e of Object.getOwnPropertySymbols(n)) t.includes(e) || t.push(e);
		}
		return t;
	}
};
function vr(...e) {
	return new Proxy({ props: e }, _r);
}
function yr(e, t, n, i) {
	var a = !je || !!(n & 2), o = !!(n & 8), s = !!(n & 16), c = i, l = !0, u = void 0, d = () => s && a ? (u ??= /* @__PURE__ */ K(i), W(u)) : (l && (l = !1, c = s ? Fe(i) : i), c);
	let f;
	if (o) {
		var p = nt in e || at in e;
		f = r(e, t)?.set ?? (p && t in e ? (n) => e[t] = n : void 0);
	}
	var m, h = !1;
	o ? [m, h] = mr(() => e[t]) : m = e[t], m === void 0 && i !== void 0 && (m = d(), f && (a && E(t), f(m)));
	var g = a ? () => {
		var n = e[t];
		return n === void 0 ? d() : (l = !0, n);
	} : () => {
		var n = e[t];
		return n !== void 0 && (c = void 0), n === void 0 ? c : n;
	};
	if (a && !(n & 4)) return g;
	if (f) {
		var _ = e.$$legacy;
		return (function(e, t) {
			return arguments.length > 0 ? ((!a || !t || _ || h) && f(t ? g() : e), e) : g();
		});
	}
	var v = !1, y = (n & 1 ? K : Je)(() => (v = !1, g()));
	o && W(y);
	var b = G;
	return (function(e, t) {
		if (arguments.length > 0) {
			let n = t ? W(y) : a && o ? x(e) : e;
			return N(y, n), v = !0, c !== void 0 && (c = n), e;
		}
		return Ze && v || b.f & 16384 ? y.v : W(y);
	});
}
function br(e) {
	ue === null && R("onMount"), je && ue.l !== null ? Sr(ue).m.push(e) : n(() => {
		let t = Fe(e);
		if (typeof t == "function") return t;
	});
}
function xr(e) {
	ue === null && R("onDestroy"), br(() => () => Fe(e));
}
function Sr(e) {
	var t = e.l;
	return t.u ??= {
		a: [],
		b: [],
		m: []
	};
}
// node_modules/svelte/src/internal/disclose-version.js
typeof window < "u" && ((window.__svelte ??= {}).v ??= /* @__PURE__ */ new Set()).add("5");
// node_modules/tailwind-merge/dist/bundle-mjs.mjs
var Cr = (e, t) => {
	let n = Array(e.length + t.length);
	for (let t = 0; t < e.length; t++) n[t] = e[t];
	for (let r = 0; r < t.length; r++) n[e.length + r] = t[r];
	return n;
}, wr = (e, t) => ({
	classGroupId: e,
	validator: t
}), Tr = (e = /* @__PURE__ */ new Map(), t = null, n) => ({
	nextPart: e,
	validators: t,
	classGroupId: n
}), Er = "-", Dr = [], Or = "arbitrary..", kr = (e) => {
	let t = Mr(e), { conflictingClassGroups: n, conflictingClassGroupModifiers: r } = e;
	return {
		getClassGroupId: (e) => {
			if (e.startsWith("[") && e.endsWith("]")) return jr(e);
			let n = e.split(Er);
			return Ar(n, +(n[0] === "" && n.length > 1), t);
		},
		getConflictingClassGroupIds: (e, t) => {
			if (t) {
				let t = r[e], i = n[e];
				return t ? i ? Cr(i, t) : t : i || Dr;
			}
			return n[e] || Dr;
		}
	};
}, Ar = (e, t, n) => {
	if (e.length - t === 0) return n.classGroupId;
	let r = e[t], i = n.nextPart.get(r);
	if (i) {
		let n = Ar(e, t + 1, i);
		if (n) return n;
	}
	let a = n.validators;
	if (a === null) return;
	let o = t === 0 ? e.join(Er) : e.slice(t).join(Er), s = a.length;
	for (let e = 0; e < s; e++) {
		let t = a[e];
		if (t.validator(o)) return t.classGroupId;
	}
}, jr = (e) => e.slice(1, -1).indexOf(":") === -1 ? void 0 : (() => {
	let t = e.slice(1, -1), n = t.indexOf(":"), r = t.slice(0, n);
	return r ? Or + r : void 0;
})(), Mr = (e) => {
	let { theme: t, classGroups: n } = e;
	return Nr(n, t);
}, Nr = (e, t) => {
	let n = Tr();
	for (let r in e) {
		let i = e[r];
		Pr(i, n, r, t);
	}
	return n;
}, Pr = (e, t, n, r) => {
	let i = e.length;
	for (let a = 0; a < i; a++) {
		let i = e[a];
		Fr(i, t, n, r);
	}
}, Fr = (e, t, n, r) => {
	typeof e == "string" ? Ir(e, t, n) : typeof e == "function" ? Lr(e, t, n, r) : Rr(e, t, n, r);
}, Ir = (e, t, n) => {
	let r = e === "" ? t : zr(t, e);
	r.classGroupId = n;
}, Lr = (e, t, n, r) => {
	Br(e) ? Pr(e(r), t, n, r) : (t.validators === null && (t.validators = []), t.validators.push(wr(n, e)));
}, Rr = (e, t, n, r) => {
	let i = Object.entries(e), a = i.length;
	for (let e = 0; e < a; e++) {
		let [a, o] = i[e];
		Pr(o, zr(t, a), n, r);
	}
}, zr = (e, t) => {
	let n = e, r = t.split(Er), i = r.length;
	for (let e = 0; e < i; e++) {
		let t = r[e], i = n.nextPart.get(t);
		i || (i = Tr(), n.nextPart.set(t, i)), n = i;
	}
	return n;
}, Br = (e) => "isThemeGetter" in e && e.isThemeGetter === !0, Vr = (e) => {
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
}, Hr = "!", Ur = ":", Wr = [], Gr = (e, t, n, r, i) => ({
	modifiers: e,
	hasImportantModifier: t,
	baseClassName: n,
	maybePostfixModifierPosition: r,
	isExternal: i
}), Kr = (e) => {
	let { prefix: t, experimentalParseClassName: n } = e, r = (e) => {
		let t = [], n = 0, r = 0, i = 0, a, o = e.length;
		for (let s = 0; s < o; s++) {
			let o = e[s];
			if (n === 0 && r === 0) {
				if (o === Ur) {
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
		s.endsWith(Hr) ? (c = s.slice(0, -1), l = !0) : s.startsWith(Hr) && (c = s.slice(1), l = !0);
		let u = a && a > i ? a - i : void 0;
		return Gr(t, l, c, u);
	};
	if (t) {
		let e = t + Ur, n = r;
		r = (t) => t.startsWith(e) ? n(t.slice(e.length)) : Gr(Wr, !1, t, void 0, !0);
	}
	if (n) {
		let e = r;
		r = (t) => n({
			className: t,
			parseClassName: e
		});
	}
	return r;
}, qr = (e) => {
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
}, Jr = (e) => ({
	cache: Vr(e.cacheSize),
	parseClassName: Kr(e),
	sortModifiers: qr(e),
	postfixLookupClassGroupIds: Yr(e),
	...kr(e)
}), Yr = (e) => {
	let t = Object.create(null), n = e.postfixLookupClassGroups;
	if (n) for (let e = 0; e < n.length; e++) t[n[e]] = !0;
	return t;
}, Xr = /\s+/, Zr = (e, t) => {
	let { parseClassName: n, getClassGroupId: r, getConflictingClassGroupIds: i, sortModifiers: a, postfixLookupClassGroupIds: o } = t, s = [], c = e.trim().split(Xr), l = "";
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
		let _ = d.length === 0 ? "" : d.length === 1 ? d[0] : a(d).join(":"), v = f ? _ + Hr : _, y = v + g;
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
}, Qr = (...e) => {
	let t = 0, n, r, i = "";
	for (; t < e.length;) (n = e[t++]) && (r = $r(n)) && (i && (i += " "), i += r);
	return i;
}, $r = (e) => {
	if (typeof e == "string") return e;
	let t, n = "";
	for (let r = 0; r < e.length; r++) e[r] && (t = $r(e[r])) && (n && (n += " "), n += t);
	return n;
}, ei = (e, ...t) => {
	let n, r, i, a, o = (o) => (n = Jr(t.reduce((e, t) => t(e), e())), r = n.cache.get, i = n.cache.set, a = s, s(o)), s = (e) => {
		let t = r(e);
		if (t) return t;
		let a = Zr(e, n);
		return i(e, a), a;
	};
	return a = o, (...e) => a(Qr(...e));
}, ti = [], Y = (e) => {
	let t = (t) => t[e] || ti;
	return t.isThemeGetter = !0, t.themeKey = e, t;
}, ni = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, ri = /^\((?:(\w[\w-]*):)?(.+)\)$/i, ii = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/, ai = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, oi = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, si = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix|color|light-dark)\(.+\)$/, ci = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, li = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, ui = (e) => ii.test(e), X = (e) => !!e && !Number.isNaN(Number(e)), di = (e) => !!e && Number.isInteger(Number(e)), fi = (e) => e.endsWith("%") && X(e.slice(0, -1)), pi = (e) => ai.test(e), mi = () => !0, hi = (e) => oi.test(e) && !si.test(e), gi = () => !1, _i = (e) => ci.test(e), vi = (e) => li.test(e), yi = (e) => !Z(e) && !Q(e), bi = (e) => e.startsWith("@container") && (e[10] === "/" && e[11] !== void 0 || e[11] === "s" && e[16] !== void 0 && e.startsWith("-size/", 10) || e[11] === "n" && e[18] !== void 0 && e.startsWith("-normal/", 10)), xi = (e) => Ii(e, Bi, gi), Z = (e) => ni.test(e), Si = (e) => Ii(e, Vi, hi), Ci = (e) => Ii(e, Hi, X), wi = (e) => Ii(e, Wi, mi), Ti = (e) => Ii(e, Ui, gi), Ei = (e) => Ii(e, Ri, gi), Di = (e) => Ii(e, zi, vi), Oi = (e) => Ii(e, Gi, _i), Q = (e) => ri.test(e), ki = (e) => Li(e, Vi), Ai = (e) => Li(e, Ui), ji = (e) => Li(e, Ri), Mi = (e) => Li(e, Bi), Ni = (e) => Li(e, zi), Pi = (e) => Li(e, Gi, !0), Fi = (e) => Li(e, Wi, !0), Ii = (e, t, n) => {
	let r = ni.exec(e);
	return r ? r[1] ? t(r[1]) : n(r[2]) : !1;
}, Li = (e, t, n = !1) => {
	let r = ri.exec(e);
	return r ? r[1] ? t(r[1]) : n : !1;
}, Ri = (e) => e === "position" || e === "percentage", zi = (e) => e === "image" || e === "url", Bi = (e) => e === "length" || e === "size" || e === "bg-size", Vi = (e) => e === "length", Hi = (e) => e === "number", Ui = (e) => e === "family-name", Wi = (e) => e === "number" || e === "weight", Gi = (e) => e === "shadow", Ki = () => {
	let e = Y("color"), t = Y("font"), n = Y("text"), r = Y("font-weight"), i = Y("tracking"), a = Y("leading"), o = Y("breakpoint"), s = Y("container"), c = Y("spacing"), l = Y("radius"), u = Y("shadow"), d = Y("inset-shadow"), f = Y("text-shadow"), p = Y("drop-shadow"), m = Y("blur"), h = Y("perspective"), g = Y("aspect"), _ = Y("ease"), v = Y("animate"), y = () => [
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
	], C = () => [
		"auto",
		"contain",
		"none"
	], w = () => [
		Q,
		Z,
		c
	], T = () => [
		ui,
		"full",
		"auto",
		...w()
	], E = () => [
		di,
		"none",
		"subgrid",
		Q,
		Z
	], D = () => [
		"auto",
		{ span: [
			"full",
			di,
			Q,
			Z
		] },
		di,
		Q,
		Z
	], ee = () => [
		di,
		"auto",
		Q,
		Z
	], te = () => [
		"auto",
		"min",
		"max",
		"fr",
		Q,
		Z
	], O = () => [
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
	], k = () => [
		"start",
		"end",
		"center",
		"stretch",
		"center-safe",
		"end-safe"
	], A = () => ["auto", ...w()], j = () => [
		ui,
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
		...w()
	], M = () => [
		s,
		ui,
		"screen",
		"full",
		"dvw",
		"lvw",
		"svw",
		"min",
		"max",
		"fit",
		...w()
	], N = () => [
		ui,
		"screen",
		"full",
		"lh",
		"dvh",
		"lvh",
		"svh",
		"min",
		"max",
		"fit",
		...w()
	], P = () => [
		e,
		Q,
		Z
	], ne = () => [
		...b(),
		ji,
		Ei,
		{ position: [Q, Z] }
	], F = () => ["no-repeat", { repeat: [
		"",
		"x",
		"y",
		"space",
		"round"
	] }], re = () => [
		"auto",
		"cover",
		"contain",
		Mi,
		xi,
		{ size: [Q, Z] }
	], ie = () => [
		fi,
		ki,
		Si
	], I = () => [
		"",
		"none",
		"full",
		l,
		Q,
		Z
	], L = () => [
		"",
		X,
		ki,
		Si
	], ae = () => [
		"solid",
		"dashed",
		"dotted",
		"double"
	], R = () => [
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
	], z = () => [
		X,
		fi,
		ji,
		Ei
	], B = () => [
		"",
		"none",
		m,
		Q,
		Z
	], oe = () => [
		"none",
		X,
		Q,
		Z
	], V = () => [
		"none",
		X,
		Q,
		Z
	], H = () => [
		X,
		Q,
		Z
	], se = () => [
		ui,
		"full",
		...w()
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
			blur: [pi],
			breakpoint: [pi],
			color: [mi],
			container: [pi],
			"drop-shadow": [pi],
			ease: [
				"in",
				"out",
				"in-out"
			],
			font: [yi],
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
			"inset-shadow": [pi],
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
			radius: [pi],
			shadow: [pi],
			spacing: ["px", X],
			text: [pi],
			"text-shadow": [pi],
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
				ui,
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
			"container-named": [bi],
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
			overscroll: [{ overscroll: C() }],
			"overscroll-x": [{ "overscroll-x": C() }],
			"overscroll-y": [{ "overscroll-y": C() }],
			position: [
				"static",
				"fixed",
				"absolute",
				"relative",
				"sticky"
			],
			inset: [{ inset: T() }],
			"inset-x": [{ "inset-x": T() }],
			"inset-y": [{ "inset-y": T() }],
			start: [{
				"inset-s": T(),
				start: T()
			}],
			end: [{
				"inset-e": T(),
				end: T()
			}],
			"inset-bs": [{ "inset-bs": T() }],
			"inset-be": [{ "inset-be": T() }],
			top: [{ top: T() }],
			right: [{ right: T() }],
			bottom: [{ bottom: T() }],
			left: [{ left: T() }],
			visibility: [
				"visible",
				"invisible",
				"collapse"
			],
			z: [{ z: [
				di,
				"auto",
				Q,
				Z
			] }],
			basis: [{ basis: [
				ui,
				"full",
				"auto",
				s,
				...w()
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
				ui,
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
				di,
				"first",
				"last",
				"none",
				Q,
				Z
			] }],
			"grid-cols": [{ "grid-cols": E() }],
			"col-start-end": [{ col: D() }],
			"col-start": [{ "col-start": ee() }],
			"col-end": [{ "col-end": ee() }],
			"grid-rows": [{ "grid-rows": E() }],
			"row-start-end": [{ row: D() }],
			"row-start": [{ "row-start": ee() }],
			"row-end": [{ "row-end": ee() }],
			"grid-flow": [{ "grid-flow": [
				"row",
				"col",
				"dense",
				"row-dense",
				"col-dense"
			] }],
			"auto-cols": [{ "auto-cols": te() }],
			"auto-rows": [{ "auto-rows": te() }],
			gap: [{ gap: w() }],
			"gap-x": [{ "gap-x": w() }],
			"gap-y": [{ "gap-y": w() }],
			"justify-content": [{ justify: [...O(), "normal"] }],
			"justify-items": [{ "justify-items": [...k(), "normal"] }],
			"justify-self": [{ "justify-self": ["auto", ...k()] }],
			"align-content": [{ content: ["normal", ...O()] }],
			"align-items": [{ items: [...k(), { baseline: ["", "last"] }] }],
			"align-self": [{ self: [
				"auto",
				...k(),
				{ baseline: ["", "last"] }
			] }],
			"place-content": [{ "place-content": O() }],
			"place-items": [{ "place-items": [...k(), "baseline"] }],
			"place-self": [{ "place-self": ["auto", ...k()] }],
			p: [{ p: w() }],
			px: [{ px: w() }],
			py: [{ py: w() }],
			ps: [{ ps: w() }],
			pe: [{ pe: w() }],
			pbs: [{ pbs: w() }],
			pbe: [{ pbe: w() }],
			pt: [{ pt: w() }],
			pr: [{ pr: w() }],
			pb: [{ pb: w() }],
			pl: [{ pl: w() }],
			m: [{ m: A() }],
			mx: [{ mx: A() }],
			my: [{ my: A() }],
			ms: [{ ms: A() }],
			me: [{ me: A() }],
			mbs: [{ mbs: A() }],
			mbe: [{ mbe: A() }],
			mt: [{ mt: A() }],
			mr: [{ mr: A() }],
			mb: [{ mb: A() }],
			ml: [{ ml: A() }],
			"space-x": [{ "space-x": w() }],
			"space-x-reverse": ["space-x-reverse"],
			"space-y": [{ "space-y": w() }],
			"space-y-reverse": ["space-y-reverse"],
			size: [{ size: j() }],
			"inline-size": [{ inline: ["auto", ...M()] }],
			"min-inline-size": [{ "min-inline": ["auto", ...M()] }],
			"max-inline-size": [{ "max-inline": ["none", ...M()] }],
			"block-size": [{ block: ["auto", ...N()] }],
			"min-block-size": [{ "min-block": ["auto", ...N()] }],
			"max-block-size": [{ "max-block": ["none", ...N()] }],
			w: [{ w: [
				s,
				"screen",
				...j()
			] }],
			"min-w": [{ "min-w": [
				s,
				"screen",
				"none",
				...j()
			] }],
			"max-w": [{ "max-w": [
				s,
				"screen",
				"none",
				"prose",
				{ screen: [o] },
				...j()
			] }],
			h: [{ h: [
				"screen",
				"lh",
				...j()
			] }],
			"min-h": [{ "min-h": [
				"screen",
				"lh",
				"none",
				...j()
			] }],
			"max-h": [{ "max-h": [
				"screen",
				"lh",
				"none",
				...j()
			] }],
			"font-size": [{ text: [
				"base",
				n,
				ki,
				Si
			] }],
			"font-smoothing": ["antialiased", "subpixel-antialiased"],
			"font-style": ["italic", "not-italic"],
			"font-weight": [{ font: [
				r,
				Fi,
				wi
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
				fi,
				Z
			] }],
			"font-family": [{ font: [
				Ai,
				Ti,
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
				Ci
			] }],
			leading: [{ leading: [
				"none",
				a,
				...w()
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
			"placeholder-color": [{ placeholder: P() }],
			"text-color": [{ text: P() }],
			"text-decoration": [
				"underline",
				"overline",
				"line-through",
				"no-underline"
			],
			"text-decoration-style": [{ decoration: [...ae(), "wavy"] }],
			"text-decoration-thickness": [{ decoration: [
				X,
				"from-font",
				"auto",
				Q,
				Si
			] }],
			"text-decoration-color": [{ decoration: P() }],
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
			indent: [{ indent: w() }],
			"tab-size": [{ tab: [
				di,
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
			"bg-position": [{ bg: ne() }],
			"bg-repeat": [{ bg: F() }],
			"bg-size": [{ bg: re() }],
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
						di,
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
						di,
						Q,
						Z
					]
				},
				Ni,
				Di
			] }],
			"bg-color": [{ bg: P() }],
			"gradient-from-pos": [{ from: ie() }],
			"gradient-via-pos": [{ via: ie() }],
			"gradient-to-pos": [{ to: ie() }],
			"gradient-from": [{ from: P() }],
			"gradient-via": [{ via: P() }],
			"gradient-to": [{ to: P() }],
			rounded: [{ rounded: I() }],
			"rounded-s": [{ "rounded-s": I() }],
			"rounded-e": [{ "rounded-e": I() }],
			"rounded-t": [{ "rounded-t": I() }],
			"rounded-r": [{ "rounded-r": I() }],
			"rounded-b": [{ "rounded-b": I() }],
			"rounded-l": [{ "rounded-l": I() }],
			"rounded-ss": [{ "rounded-ss": I() }],
			"rounded-se": [{ "rounded-se": I() }],
			"rounded-ee": [{ "rounded-ee": I() }],
			"rounded-es": [{ "rounded-es": I() }],
			"rounded-tl": [{ "rounded-tl": I() }],
			"rounded-tr": [{ "rounded-tr": I() }],
			"rounded-br": [{ "rounded-br": I() }],
			"rounded-bl": [{ "rounded-bl": I() }],
			"border-w": [{ border: L() }],
			"border-w-x": [{ "border-x": L() }],
			"border-w-y": [{ "border-y": L() }],
			"border-w-s": [{ "border-s": L() }],
			"border-w-e": [{ "border-e": L() }],
			"border-w-bs": [{ "border-bs": L() }],
			"border-w-be": [{ "border-be": L() }],
			"border-w-t": [{ "border-t": L() }],
			"border-w-r": [{ "border-r": L() }],
			"border-w-b": [{ "border-b": L() }],
			"border-w-l": [{ "border-l": L() }],
			"divide-x": [{ "divide-x": L() }],
			"divide-x-reverse": ["divide-x-reverse"],
			"divide-y": [{ "divide-y": L() }],
			"divide-y-reverse": ["divide-y-reverse"],
			"border-style": [{ border: [
				...ae(),
				"hidden",
				"none"
			] }],
			"divide-style": [{ divide: [
				...ae(),
				"hidden",
				"none"
			] }],
			"border-color": [{ border: P() }],
			"border-color-x": [{ "border-x": P() }],
			"border-color-y": [{ "border-y": P() }],
			"border-color-s": [{ "border-s": P() }],
			"border-color-e": [{ "border-e": P() }],
			"border-color-bs": [{ "border-bs": P() }],
			"border-color-be": [{ "border-be": P() }],
			"border-color-t": [{ "border-t": P() }],
			"border-color-r": [{ "border-r": P() }],
			"border-color-b": [{ "border-b": P() }],
			"border-color-l": [{ "border-l": P() }],
			"divide-color": [{ divide: P() }],
			"outline-style": [{ outline: [
				...ae(),
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
				ki,
				Si
			] }],
			"outline-color": [{ outline: P() }],
			shadow: [{ shadow: [
				"",
				"inner",
				"none",
				u,
				Pi,
				Oi
			] }],
			"shadow-color": [{ shadow: P() }],
			"inset-shadow": [{ "inset-shadow": [
				"none",
				d,
				Pi,
				Oi
			] }],
			"inset-shadow-color": [{ "inset-shadow": P() }],
			"ring-w": [{ ring: L() }],
			"ring-w-inset": ["ring-inset"],
			"ring-color": [{ ring: P() }],
			"ring-offset-w": [{ "ring-offset": [X, Si] }],
			"ring-offset-color": [{ "ring-offset": P() }],
			"inset-ring-w": [{ "inset-ring": L() }],
			"inset-ring-color": [{ "inset-ring": P() }],
			"text-shadow": [{ "text-shadow": [
				"none",
				f,
				Pi,
				Oi
			] }],
			"text-shadow-color": [{ "text-shadow": P() }],
			opacity: [{ opacity: [
				X,
				Q,
				Z
			] }],
			"mix-blend": [{ "mix-blend": [
				...R(),
				"plus-darker",
				"plus-lighter"
			] }],
			"bg-blend": [{ "bg-blend": R() }],
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
			"mask-image-linear-from-pos": [{ "mask-linear-from": z() }],
			"mask-image-linear-to-pos": [{ "mask-linear-to": z() }],
			"mask-image-linear-from-color": [{ "mask-linear-from": P() }],
			"mask-image-linear-to-color": [{ "mask-linear-to": P() }],
			"mask-image-t-from-pos": [{ "mask-t-from": z() }],
			"mask-image-t-to-pos": [{ "mask-t-to": z() }],
			"mask-image-t-from-color": [{ "mask-t-from": P() }],
			"mask-image-t-to-color": [{ "mask-t-to": P() }],
			"mask-image-r-from-pos": [{ "mask-r-from": z() }],
			"mask-image-r-to-pos": [{ "mask-r-to": z() }],
			"mask-image-r-from-color": [{ "mask-r-from": P() }],
			"mask-image-r-to-color": [{ "mask-r-to": P() }],
			"mask-image-b-from-pos": [{ "mask-b-from": z() }],
			"mask-image-b-to-pos": [{ "mask-b-to": z() }],
			"mask-image-b-from-color": [{ "mask-b-from": P() }],
			"mask-image-b-to-color": [{ "mask-b-to": P() }],
			"mask-image-l-from-pos": [{ "mask-l-from": z() }],
			"mask-image-l-to-pos": [{ "mask-l-to": z() }],
			"mask-image-l-from-color": [{ "mask-l-from": P() }],
			"mask-image-l-to-color": [{ "mask-l-to": P() }],
			"mask-image-x-from-pos": [{ "mask-x-from": z() }],
			"mask-image-x-to-pos": [{ "mask-x-to": z() }],
			"mask-image-x-from-color": [{ "mask-x-from": P() }],
			"mask-image-x-to-color": [{ "mask-x-to": P() }],
			"mask-image-y-from-pos": [{ "mask-y-from": z() }],
			"mask-image-y-to-pos": [{ "mask-y-to": z() }],
			"mask-image-y-from-color": [{ "mask-y-from": P() }],
			"mask-image-y-to-color": [{ "mask-y-to": P() }],
			"mask-image-radial": [{ "mask-radial": [Q, Z] }],
			"mask-image-radial-from-pos": [{ "mask-radial-from": z() }],
			"mask-image-radial-to-pos": [{ "mask-radial-to": z() }],
			"mask-image-radial-from-color": [{ "mask-radial-from": P() }],
			"mask-image-radial-to-color": [{ "mask-radial-to": P() }],
			"mask-image-radial-shape": [{ "mask-radial": ["circle", "ellipse"] }],
			"mask-image-radial-size": [{ "mask-radial": [{
				closest: ["side", "corner"],
				farthest: ["side", "corner"]
			}] }],
			"mask-image-radial-pos": [{ "mask-radial-at": b() }],
			"mask-image-conic-pos": [{ "mask-conic": [X] }],
			"mask-image-conic-from-pos": [{ "mask-conic-from": z() }],
			"mask-image-conic-to-pos": [{ "mask-conic-to": z() }],
			"mask-image-conic-from-color": [{ "mask-conic-from": P() }],
			"mask-image-conic-to-color": [{ "mask-conic-to": P() }],
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
			"mask-position": [{ mask: ne() }],
			"mask-repeat": [{ mask: F() }],
			"mask-size": [{ mask: re() }],
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
			blur: [{ blur: B() }],
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
				Pi,
				Oi
			] }],
			"drop-shadow-color": [{ "drop-shadow": P() }],
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
			"backdrop-blur": [{ "backdrop-blur": B() }],
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
			"border-spacing": [{ "border-spacing": w() }],
			"border-spacing-x": [{ "border-spacing-x": w() }],
			"border-spacing-y": [{ "border-spacing-y": w() }],
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
			rotate: [{ rotate: oe() }],
			"rotate-x": [{ "rotate-x": oe() }],
			"rotate-y": [{ "rotate-y": oe() }],
			"rotate-z": [{ "rotate-z": oe() }],
			scale: [{ scale: V() }],
			"scale-x": [{ "scale-x": V() }],
			"scale-y": [{ "scale-y": V() }],
			"scale-z": [{ "scale-z": V() }],
			"scale-3d": ["scale-3d"],
			skew: [{ skew: H() }],
			"skew-x": [{ "skew-x": H() }],
			"skew-y": [{ "skew-y": H() }],
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
			translate: [{ translate: se() }],
			"translate-x": [{ "translate-x": se() }],
			"translate-y": [{ "translate-y": se() }],
			"translate-z": [{ "translate-z": se() }],
			"translate-none": ["translate-none"],
			zoom: [{ zoom: [
				di,
				Q,
				Z
			] }],
			accent: [{ accent: P() }],
			appearance: [{ appearance: ["none", "auto"] }],
			"caret-color": [{ caret: P() }],
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
			"scrollbar-thumb-color": [{ "scrollbar-thumb": P() }],
			"scrollbar-track-color": [{ "scrollbar-track": P() }],
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
			"scroll-m": [{ "scroll-m": w() }],
			"scroll-mx": [{ "scroll-mx": w() }],
			"scroll-my": [{ "scroll-my": w() }],
			"scroll-ms": [{ "scroll-ms": w() }],
			"scroll-me": [{ "scroll-me": w() }],
			"scroll-mbs": [{ "scroll-mbs": w() }],
			"scroll-mbe": [{ "scroll-mbe": w() }],
			"scroll-mt": [{ "scroll-mt": w() }],
			"scroll-mr": [{ "scroll-mr": w() }],
			"scroll-mb": [{ "scroll-mb": w() }],
			"scroll-ml": [{ "scroll-ml": w() }],
			"scroll-p": [{ "scroll-p": w() }],
			"scroll-px": [{ "scroll-px": w() }],
			"scroll-py": [{ "scroll-py": w() }],
			"scroll-ps": [{ "scroll-ps": w() }],
			"scroll-pe": [{ "scroll-pe": w() }],
			"scroll-pbs": [{ "scroll-pbs": w() }],
			"scroll-pbe": [{ "scroll-pbe": w() }],
			"scroll-pt": [{ "scroll-pt": w() }],
			"scroll-pr": [{ "scroll-pr": w() }],
			"scroll-pb": [{ "scroll-pb": w() }],
			"scroll-pl": [{ "scroll-pl": w() }],
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
			fill: [{ fill: ["none", ...P()] }],
			"stroke-w": [{ stroke: [
				X,
				ki,
				Si,
				Ci
			] }],
			stroke: [{ stroke: ["none", ...P()] }],
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
}, qi = (e, { cacheSize: t, prefix: n, experimentalParseClassName: r, extend: i = {}, override: a = {} }) => (Ji(e, "cacheSize", t), Ji(e, "prefix", n), Ji(e, "experimentalParseClassName", r), Yi(e.theme, a.theme), Yi(e.classGroups, a.classGroups), Yi(e.conflictingClassGroups, a.conflictingClassGroups), Yi(e.conflictingClassGroupModifiers, a.conflictingClassGroupModifiers), Ji(e, "postfixLookupClassGroups", a.postfixLookupClassGroups), Ji(e, "orderSensitiveModifiers", a.orderSensitiveModifiers), Xi(e.theme, i.theme), Xi(e.classGroups, i.classGroups), Xi(e.conflictingClassGroups, i.conflictingClassGroups), Xi(e.conflictingClassGroupModifiers, i.conflictingClassGroupModifiers), Zi(e, i, "postfixLookupClassGroups"), Zi(e, i, "orderSensitiveModifiers"), e), Ji = (e, t, n) => {
	n !== void 0 && (e[t] = n);
}, Yi = (e, t) => {
	if (t) for (let n in t) Ji(e, n, t[n]);
}, Xi = (e, t) => {
	if (t) for (let n in t) Zi(e, t, n);
}, Zi = (e, t, n) => {
	let r = t[n];
	r !== void 0 && (e[n] = e[n] ? e[n].concat(r) : r);
}, Qi = ((e, ...t) => typeof e == "function" ? ei(Ki, e, ...t) : ei(() => qi(Ki(), e), ...t))({
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
function $i(...e) {
	return Qi(_n(e));
}
// node_modules/tailwind-variants/dist/chunk-K5X3OHSH.js
var ea = Array.isArray, ta = (e) => {
	if (!e && e !== 0 && e !== 0n) return "";
	if (typeof e == "string") return e;
	if (typeof e == "number") return e === e ? "" + e : "";
	if (typeof e == "bigint") return "" + e;
	let t = "";
	if (ea(e)) {
		let n = e.length;
		for (let r = 0; r < n; r++) {
			let n = e[r];
			if (!n && n !== 0 && n !== 0n) continue;
			let i = typeof n == "string" ? n : ta(n);
			i && (t && (t += " "), t += i);
		}
		return t;
	}
	if (typeof e == "object") for (let n in e) e[n] && (t && (t += " "), t += n);
	return t;
}, na = /\s+/g, ra = Array.isArray, ia = (e) => typeof e != "string" || !e ? e : e.replace(na, " ").trim(), aa = / {2}|[\t-\r\u00a0]/, oa = (e) => {
	let t = e.length;
	return t === 0 ? !1 : e.charCodeAt(0) === 32 || e.charCodeAt(t - 1) === 32 || aa.test(e);
}, sa = (e) => oa(e) ? ia(e) : e, ca = function() {
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
		let r = typeof e == "string" ? e : ta(e);
		r && (t && (t += " "), t += r);
	}
	return t ? oa(t) ? ia(t) : t : "";
}, la = (e) => e === !1 ? "false" : e === !0 ? "true" : e === 0 ? "0" : e, $ = (e) => {
	if (!e || typeof e != "object") return !0;
	for (let t in e) return !1;
	return !0;
}, ua = (e, t) => {
	let n = e;
	for (let e in t) if (Object.hasOwn(t, e)) {
		let r = t[e];
		n[e] = e in n ? ca(n[e], r) : r;
	}
	return e;
}, da = (e, t) => {
	for (let n = 0; n < e.length; n++) {
		let r = e[n];
		ra(r) ? da(r, t) : r && t.push(r);
	}
}, fa = (...e) => {
	let t = [];
	return da(e, t), t;
}, pa = (e) => typeof e == "object" && !!e && !ra(e), ma = (e, t) => {
	let n = e, r = t, i = {};
	for (let e in n) {
		let t = n[e];
		if (e in r) {
			let n = r[e];
			i[e] = ra(t) || ra(n) ? fa(n, t) : pa(t) && pa(n) ? ma(t, n) : pa(t) && typeof n == "string" ? ma(t, { base: n }) : typeof t == "string" && pa(n) ? ma({ base: t }, n) : n + " " + t;
		} else i[e] = t;
	}
	for (let e in r) e in n || (i[e] = r[e]);
	return i;
}, ha = {
	twMerge: !0,
	twMergeConfig: {}
}, ga = 256, _a = /* @__PURE__ */ Symbol("tv-cache-miss"), va = (e) => e?.class != null && e.class !== "" || e?.className != null && e.className !== "", ya = /* @__PURE__ */ Symbol("tv-non-finite"), ba = (e, t) => {
	if (typeof t == "number" && !Number.isFinite(t)) throw ya;
	return t;
}, xa = (e) => {
	if (e === void 0) return "";
	if (e === null) return "null";
	let t = typeof e;
	if (t === "string") return e;
	if (t === "boolean") return e ? "true" : "false";
	if (t === "number" || t === "bigint") return String(e);
	if (t === "object") try {
		return JSON.stringify(e, ba);
	} catch {
		return null;
	}
	return null;
}, Sa = 0, Ca = 1, wa = 2, Ta = 0, Ea = 1, Da = 2, Oa = 3, ka = 0, Aa = 1, ja = 2, Ma = (e) => {
	let t = Object.getPrototypeOf(e);
	return t === Object.prototype || t === null;
}, Na = (e) => typeof e == "number" && !Number.isFinite(e), Pa = (e, t, n) => {
	try {
		return e.kinds[t] = Oa, e.tokens[t] = JSON.stringify(n, ba), !0;
	} catch {
		return !1;
	}
}, Fa = (e, t, n) => {
	if (typeof n != "object" || !n) return e.kinds[t] = Ta, e.tokens[t] = n, !0;
	if (Array.isArray(n)) {
		for (let r = 0; r < n.length; r++) {
			let i = n[r];
			if (typeof i == "object" && i) return Pa(e, t, n);
			if (Na(i)) return !1;
		}
		return e.kinds[t] = Ea, e.tokens[t] = n.slice(), !0;
	}
	if (Ma(n)) {
		let r = [];
		for (let i in n) {
			let a = n[i];
			if (Na(a)) return !1;
			if (typeof a == "object" && a) return Pa(e, t, n);
			if (typeof a == "bigint") return !1;
			r.push(i, a);
		}
		return e.kinds[t] = Da, e.tokens[t] = r, !0;
	}
	return Pa(e, t, n);
}, Ia = (e, t, n) => {
	if (e === Ta) return Object.is(t, n) ? ka : Aa;
	if (typeof n != "object" || !n) return Aa;
	if (e === Ea) {
		let e = t;
		if (!Array.isArray(n) || n.length !== e.length) return Aa;
		for (let t = 0; t < e.length; t++) if (!Object.is(e[t], n[t])) return Aa;
		return ka;
	}
	if (e === Da) {
		if (Array.isArray(n) || !Ma(n)) return Aa;
		let e = t, r = 0;
		for (let t in n) {
			if (r >= e.length || e[r] !== t || !Object.is(e[r + 1], n[t])) return Aa;
			r += 2;
		}
		return r === e.length ? ka : Aa;
	}
	try {
		return JSON.stringify(n, ba) === t ? ka : Aa;
	} catch {
		return ja;
	}
}, La = (e) => Array.isArray(e) ? e : void 0, Ra = (e, t, n) => {
	let r = La(n);
	e.kinds[t] = r === void 0 ? Ta : Ea, e.tokens[t] = r === void 0 ? void 0 : r.slice();
}, za = (e, t, n) => {
	let r = 0;
	for (let n = 0; n < t.length; n++) {
		let { conditionKeys: i, source: a } = t[n];
		for (let t = 0; t < i.length; t++) if (!Fa(e, r++, a[i[t]])) return !1;
		if (!Fa(e, r++, a.class) || !Fa(e, r++, a.className)) return !1;
	}
	for (let t = 0; t < n.length; t++) {
		let { conditionKeys: i, source: a } = n[t];
		for (let t = 0; t < i.length; t++) if (!Fa(e, r++, a[i[t]])) return !1;
		if (Ra(e, r++, a.slots), !Fa(e, r++, a.class) || !Fa(e, r++, a.className)) return !1;
	}
	return e.kinds.length = r, e.tokens.length = r, !0;
}, Ba = ({ kinds: e, tokens: t }, n, r) => {
	let i = e.length, a = 0, o;
	for (let r = 0; r < n.length; r++) {
		let { conditionKeys: s, source: c } = n[r];
		if (a + s.length + 2 > i) return Aa;
		for (let n = 0; n < s.length; n++, a++) if (o = Ia(e[a], t[a], c[s[n]]), o !== ka) return o;
		if (o = Ia(e[a], t[a], c.class), o !== ka || (a++, o = Ia(e[a], t[a], c.className), o !== ka)) return o;
		a++;
	}
	for (let n = 0; n < r.length; n++) {
		let { conditionKeys: s, source: c } = r[n];
		if (a + s.length + 3 > i) return Aa;
		for (let n = 0; n < s.length; n++, a++) if (o = Ia(e[a], t[a], c[s[n]]), o !== ka) return o;
		if (o = Ia(e[a], t[a], La(c.slots)), o !== ka || (a++, o = Ia(e[a], t[a], c.class), o !== ka) || (a++, o = Ia(e[a], t[a], c.className), o !== ka)) return o;
		a++;
	}
	return a === i ? ka : Aa;
}, Va = () => {
	let e = null;
	return (t, n) => {
		if (e !== null) {
			let r = Ba(e, t, n);
			if (r === ka) return Sa;
			if (r === ja) return e = null, wa;
		}
		let r = {
			kinds: [],
			tokens: []
		};
		return za(r, t, n) ? (e = r, Ca) : (e = null, wa);
	};
}, Ha = /* @__PURE__ */ Symbol("tv-uncacheable"), Ua = () => ({
	children: /* @__PURE__ */ new Map(),
	hasLeaf: !1,
	leaf: void 0
}), Wa = (e, t, n, r) => {
	let i = t[e];
	return n && n[e] !== void 0 && (i = n[e]), r && r[e] !== void 0 && (i = r[e]), i;
}, Ga = (e, t, n) => {
	let r = e.children.get(t);
	if (!r) {
		if (!n) return;
		r = Ua(), e.children.set(t, r);
	}
	return r;
}, Ka = (e, t = ga) => {
	let n = Ua(), r = null, i = 0, a = /* @__PURE__ */ Object.create(null);
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
			let a = xa(Wa(e[t], n, r, i));
			if (a === null) return Ha;
			if (s = Ga(s, a, o), !s) return;
		}
		if (a) for (let e = 0; e < a.length; e++) {
			let t = a[e], c = xa(Wa(t, n, r, i));
			if (c === null) return Ha;
			if (s = Ga(s, t + "\0" + c, o), !s) return;
		}
		return s;
	};
	return {
		get(e, t, a) {
			let c = o(e, t, a), l = s(n, e, t, a, c, !1);
			if (l === Ha) return Ha;
			if (l && l.hasLeaf) return l.leaf;
			if (r) {
				let o = s(r, e, t, a, c, !1);
				if (o === Ha) return Ha;
				if (o && o.hasLeaf) {
					let r = s(n, e, t, a, c, !0);
					return r !== Ha && r && (r.hasLeaf || i++, r.hasLeaf = !0, r.leaf = o.leaf), o.leaf;
				}
			}
			return _a;
		},
		set(e, a, c, l) {
			i >= t && (r = n, n = Ua(), i = 0);
			let u = o(e, a, c), d = s(n, e, a, c, u, !0);
			d !== Ha && d && (d.hasLeaf || i++, d.hasLeaf = !0, d.leaf = l);
		},
		clear() {
			n = Ua(), r = null, i = 0;
		}
	};
}, qa = (e) => (t, n) => va(n) ? e.override(t, n.class, n.className) : t, Ja = () => ({
	base: void 0,
	variants: {},
	defaultVariants: {},
	slots: {},
	compoundVariants: [],
	compoundSlots: []
}), Ya = (e) => ({
	base: e.base,
	variants: e.variants ?? {},
	defaultVariants: e.defaultVariants ?? {},
	slots: e.slots ?? {},
	compoundVariants: e.compoundVariants ?? [],
	compoundSlots: e.compoundSlots ?? []
}), Xa = (e, t) => {
	let n = e.base != null || t.base != null ? ca(e.base, t.base) : void 0, r = $(t.variants) ? e.variants : $(e.variants) ? t.variants : ma(t.variants, e.variants), i = $(t.defaultVariants) ? e.defaultVariants : {
		...e.defaultVariants,
		...t.defaultVariants
	}, a = $(e.slots), o = $(t.slots), s;
	s = a && o ? {} : a ? e.base == null ? { ...t.slots } : ua({ base: e.base }, { ...t.slots }) : o ? t.base == null ? { ...e.slots } : ua({ ...e.slots }, { base: t.base }) : ua({ ...e.slots }, t.slots);
	let c = $(t.compoundVariants) ? e.compoundVariants : $(e.compoundVariants) ? t.compoundVariants : fa(e.compoundVariants, t.compoundVariants), l = $(t.compoundSlots) ? e.compoundSlots : $(e.compoundSlots) ? t.compoundSlots : fa(e.compoundSlots, t.compoundSlots);
	return {
		base: n,
		variants: r,
		defaultVariants: i,
		slots: s,
		compoundVariants: c,
		compoundSlots: l
	};
}, Za = (e) => {
	let t = Ja();
	for (let n = 0; n < e.length; n++) t = Xa(t, Ya(e[n]));
	return t;
}, Qa = (e) => e ? sa(ta(e)) : "", $a = (e) => {
	let t = Qa(e.class), n = Qa(e.className);
	return t ? n ? t + " " + n : t : n;
}, eo = (e, t, n) => {
	if (!n) return;
	let r = e[t];
	e[t] = r ? r + " " + n : n;
}, to = (e) => {
	let t = {}, n = [e.class, e.className];
	for (let e = 0; e < n.length; e++) {
		let r = n[e];
		if (typeof r == "string" || Array.isArray(r)) eo(t, "base", Qa(r));
		else if (r && typeof r == "object") for (let e in r) eo(t, e, Qa(r[e]));
	}
	return t;
}, no = (e, t) => {
	let n = [];
	for (let r = 0; r < t.length; r++) {
		let i = t[r], a = e[i];
		n.push({
			key: i,
			values: a,
			isEmpty: $(a),
			normalizedFrom: null,
			normalized: null
		});
	}
	return n;
}, ro = (e, t, n, r) => {
	let i;
	if (!r || typeof n == "string" || Array.isArray(n)) i = Qa(n);
	else if (n && typeof n == "object") {
		let e = {};
		for (let t in n) {
			let r = Qa(n[t]);
			r && (e[t] = r);
		}
		i = e;
	} else i = "";
	return (e.normalizedFrom ??= {})[t] = n, (e.normalized ??= {})[t] = i, i;
}, io = (e, t) => {
	for (let t = 0; t < e.length; t++) e[t].classes = null, e[t].slotClasses = null;
	for (let e = 0; e < t.length; e++) t[e].classes = null;
}, ao = (e) => {
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
}, oo = (e) => {
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
}, so = (e) => {
	let t = {};
	for (let n = 0; n < e.length; n++) {
		let r = e[n], i = r.source.slots;
		if (Array.isArray(i)) for (let e = 0; e < i.length; e++) {
			let n = i[e];
			t[n] || (t[n] = []), t[n].push(r);
		}
	}
	return t;
}, co = (e, t) => {
	let { extend: n = null, base: r, slots: i, variants: a = {}, compoundVariants: o = [], compoundSlots: s = [], defaultVariants: c = {} } = e, l = i !== void 0, u = l ? i : {}, d = n, f = null;
	if (Array.isArray(d)) {
		let e = d.filter(Boolean);
		e.length === 1 ? f = e[0] : e.length > 1 && (f = Za(e));
	} else d != null && (f = d);
	let p = {
		...ha,
		...t
	}, m = f?.base ? ca(f.base, r) : r, h = f?.variants && !$(f.variants) ? ma(a, f.variants) : a, g = f?.defaultVariants && !$(f.defaultVariants) ? {
		...f.defaultVariants,
		...c
	} : c, _ = !f?.slots || $(f.slots), v = l ? _ && f?.base ? ca(r, f.base) : typeof r == "string" || r == null ? r : ca(r) : void 0, y = l ? {
		base: v,
		...u
	} : {}, b = _ ? y : ua({ ...f?.slots }, $(y) ? { base: r } : y), x = !f?.compoundVariants || $(f.compoundVariants) ? o : fa(f?.compoundVariants, o), S = !f?.compoundSlots || $(f.compoundSlots) ? s : fa(f?.compoundSlots, s), C = Object.keys(h);
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
		mode: l || !_ ? "slots" : C.length === 0 ? "plain" : "variants",
		slotKeys: null,
		variantKeys: C
	};
}, lo = (e) => (e.compiledVariants === null && (e.compiledVariants = no(e.variants, e.variantKeys), e.compiledCompoundVariants = ao(e.compoundVariants), e.compiledCompoundSlots = oo(e.compoundSlots), e.compiledCompoundSlotsBySlot = so(e.compiledCompoundSlots), e.slotKeys = Object.keys(e.slots)), e), uo = [], fo = [], po = (e, t, n, r) => {
	let i = t[e];
	return n && n[e] !== void 0 && (i = n[e]), r && r[e] !== void 0 && (i = r[e]), i;
}, mo = (e) => e == null || e === !1, ho = (e, t) => {
	if (!Array.isArray(e)) return e === t || mo(e) && mo(t);
	for (let n = 0; n < e.length; n++) {
		let r = e[n];
		if (r === t || mo(r) && mo(t)) return !0;
	}
	return !1;
}, go = (e, t) => `${la(e[t]) || "false"}`, _o = (e, t, n, r, i) => {
	if (e.isEmpty) return "";
	let a = r?.[e.key] ?? n?.[e.key];
	if (a === null) return "";
	let o = la(a);
	if (typeof o == "object") return "";
	let s = t?.[e.key], c = (o ?? la(s)) || "false", l = e.values[c];
	if (!l) return "";
	if (typeof l == "string") return l;
	let u = e.normalizedFrom;
	return u !== null && u[c] === l ? e.normalized[c] : ro(e, c, l, i);
}, vo = (e, t) => typeof e == "string" ? t === "base" ? e : "" : e[t] ?? "", yo = (e, t, n, r) => {
	let { conditionKeys: i, source: a } = e;
	for (let e = 0; e < i.length; e++) {
		let o = i[e];
		if (!ho(a[o], po(o, t, n, r))) return !1;
	}
	return !0;
}, bo = (e, t, n, r, i, a) => {
	for (let o = 0; o < n.length; o++) {
		let s = n[o], c = _o(s, r, i, void 0, !1);
		c && (e[t++] = c, a && (a[s.key] = c));
	}
	return t;
}, xo = (e, t, n, r, i, a, o, s) => {
	for (let c = 0; c < r.length; c++) {
		let l = r[c], u = vo(_o(l, i, a, o, !0), n);
		u && (e[t++] = u, s && (s[l.key] = u));
	}
	return t;
}, So = (e, t, n, r, i) => {
	for (let a = 0; a < n.length; a++) {
		let o = n[a], s = o.classes;
		s !== "" && yo(o, r, i) && (s === null && (s = o.classes = $a(o.source)), s && (e[t++] = s));
	}
	return t;
}, Co = (e, t, n, r, i, a, o) => {
	for (let s = 0; s < r.length; s++) {
		let c = r[s], l = c.slotClasses;
		if (l !== null && !l[n] || !yo(c, i, a, o)) continue;
		l === null && (l = c.slotClasses = to(c.source));
		let u = l[n];
		u && (e[t++] = u);
	}
	return t;
}, wo = (e, t, n, r, i, a) => {
	for (let o = 0; o < n.length; o++) {
		let s = n[o], c = s.classes;
		c !== "" && yo(s, r, i, a) && (c === null && (c = s.classes = $a(s.source)), c && (e[t++] = c));
	}
	return t;
}, To = 0, Eo = 1, Do = 2, Oo = (e, t) => {
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
}, ko = (e, t, n, r) => {
	let i = Eo;
	for (let a in e) {
		let o = e[a];
		if (a === "class" || a === "className") {
			o != null && o !== "" && (i = Do);
			continue;
		}
		if (o === void 0) continue;
		if (t[a] === void 0) {
			if (r()[a]) return To;
			continue;
		}
		let s = n[a];
		if (o === s) continue;
		if (o === null) return To;
		let c = typeof o;
		if (c === typeof s && (c === "string" || c === "boolean") && o !== "" && s !== "") return To;
		let l = la(o);
		if (typeof l == "object" || `${l || "false"}` !== go(n, a)) return To;
	}
	return i;
}, Ao = () => ({
	defaults: [],
	optionKeys: [],
	options: []
}), jo = (e, t, n) => {
	for (let r = 0; r < e.length; r++) {
		let i = e[r], a = go(t, i.key);
		n.defaults[r] = t[i.key], n.optionKeys[r] = a, n.options[r] = i.isEmpty ? void 0 : i.values[a];
	}
}, Mo = (e, t, n) => {
	for (let r = 0; r < e.length; r++) {
		let i = e[r];
		if (t[i.key] !== n.defaults[r] || !i.isEmpty && i.values[n.optionKeys[r]] !== n.options[r]) return !1;
	}
	return !0;
}, No = (e, t) => {
	let { base: n, deferredError: r } = e, i = _a, a = qa(t);
	return ((e) => {
		if (r) throw r;
		if (i === _a) {
			let e = Qa(n);
			fo[0] = e, i = t.parts(fo, +!!e);
		}
		return a(i, e);
	});
}, Po = (e, t) => {
	let { base: n, defaultVariants: r, deferredError: i, variantKeys: a, variants: o } = e, s = e.compiledCompoundVariants, c = e.compiledVariants, l = uo, u = "", d = !1, f = null, p = null, m = null, h = qa(t), g = 1, _ = null, v = null, y = () => {
		(c === null || s === null) && (lo(e), c = e.compiledVariants, s = e.compiledCompoundVariants, l = e.compiledCompoundSlots ?? uo, u = Qa(n), d = s.length > 0 || l.length > 0);
	}, b = () => f ??= Oo(s, l), x = (e) => {
		let n = fo, i = 0;
		return u && (n[i++] = u), i = bo(n, i, c, r, e), s.length > 0 && (i = So(n, i, s, r, e)), t.parts(n, i);
	}, S = () => {
		let e = (m ??= Va())(s, l);
		return e === Sa || (io(s, l), e !== wa && (p = null, _ = null, !0));
	}, C = () => (_ !== null && Mo(c, r, v) || (_ = x(void 0), jo(c, r, v ??= Ao())), _);
	return ((e) => {
		if (i) throw i;
		y();
		let t = e == null ? Eo : ko(e, o, r, b);
		if (t !== To) {
			let n;
			return d ? g > 0 ? (g = 0, n = x(e)) : n = S() ? C() : x(e) : (g = 0, n = C()), t === Do ? h(n, e) : n;
		}
		let n;
		if (g > 0) g--, n = x(e);
		else if (d && !S()) n = x(e);
		else {
			p ??= Ka(a);
			let t = p.get(r, e);
			t === Ha ? n = x(e) : t === _a ? (n = x(e), p.set(r, e, void 0, n)) : n = t;
		}
		return h(n, e);
	});
}, Fo = (e, t) => {
	let { defaultVariants: n, deferredError: r, slots: i, variantKeys: a, variants: o } = e, s = null, c = null, l = null, u = null, d = null, f = !1, p = null, m = null, h = null, g = null, _ = 1, v = null, y = null, b = null, x = () => {
		if (u !== null) return;
		(e.compiledVariants === null || e.compiledCompoundVariants === null || e.compiledCompoundSlots === null || e.compiledCompoundSlotsBySlot === null || e.slotKeys === null) && lo(e), s = e.compiledVariants, c = e.compiledCompoundVariants, l = e.compiledCompoundSlots;
		let r = e.compiledCompoundSlotsBySlot;
		u = e.slotKeys, f = c.length > 0 || l.length > 0, m = qa(t);
		let a = Array(u.length);
		for (let e = 0; e < u.length; e++) {
			let o = u[e], l = r[o] ?? uo, d, p = "";
			a[e] = (e, r) => {
				let a = fo, u = 0, m = i[o];
				return m !== d && (d = m, p = Qa(m)), p && (a[u++] = p), u = xo(a, u, o, s, n, e, r), f && (u = Co(a, u, o, c, n, e, r), u = wo(a, u, l, n, e, r)), t.parts(a, u);
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
	}, C = () => {
		let e = (g ??= Va())(c, l);
		return e === Sa || (io(c, l), e !== wa && (h = null, v = null, !0));
	}, w = () => p ??= Oo(c, l), T = () => {
		if (!Mo(s, n, y)) return !1;
		let e = u, t = b;
		for (let n = 0; n < e.length; n++) if (i[e[n]] !== t[n]) return !1;
		return !0;
	}, E = () => {
		if (v === null || !T()) {
			v = S(void 0), jo(s, n, y ??= Ao());
			let e = u, t = b ??= [];
			for (let n = 0; n < e.length; n++) t[n] = i[e[n]];
		}
		return v;
	};
	return ((e) => {
		if (r) throw r;
		if (x(), (e == null ? Eo : ko(e, o, n, w)) !== To) return f ? _ > 0 ? (_ = 0, S(e)) : C() ? E() : S(e) : (_ = 0, E());
		if (_ > 0) return _--, S(e);
		if (f && !C()) return S(e);
		h ??= Ka(a);
		let t = h.get(n, e);
		if (t === Ha) return S(e);
		if (t !== _a) return t;
		let i = S(e);
		return h.set(n, e, void 0, i), i;
	});
}, Io = (e, t) => {
	if (e.mode === "plain") return No(e, t);
	let n;
	return ((r) => (n ??= e.mode === "slots" ? Fo(e, t) : Po(e, t), n(r)));
}, Lo = (e, t) => {
	let n = {
		...e,
		...t
	};
	return e.twMergeConfig && t.twMergeConfig && (n.twMergeConfig = {
		...e.twMergeConfig,
		...t.twMergeConfig
	}), n;
}, Ro = (e, t) => {
	e.variantKeys = t.variantKeys, e.extend = t.extend, e.base = t.base, e.slots = t.slots, e.variants = t.variants, e.defaultVariants = t.defaultVariants, e.compoundSlots = t.compoundSlots, e.compoundVariants = t.compoundVariants;
}, zo = (e, t) => {
	let n = (n, r) => {
		let i = co(n, r), a = Io(i, e(i.config));
		return Ro(a, i), t ? t(a, i, Ro) : a;
	};
	return {
		tv: n,
		createTV: (e) => (t, r) => n(t, r && e ? Lo(e, r) : r ?? e)
	};
}, Bo = "line" in /* @__PURE__ */ Error(), Vo = -1, Ho = -1, Uo = (e, t, n) => {
	let r = 2166136261;
	for (let i = t; i < n; i++) r = Math.imul(r ^ e.charCodeAt(i), 16777619);
	return r;
}, Wo = (e, t, n) => {
	let r = n - t, i = Math.imul(r, 2654435761) ^ e.charCodeAt(t);
	if (r > 3) {
		let a = r >> 2, o = r >> 1;
		i = Math.imul(i ^ e.charCodeAt(t + 1) << 8 ^ e.charCodeAt(t + 2) << 16 ^ e.charCodeAt(t + a), 2246822507), i = Math.imul(i ^ e.charCodeAt(t + o) << 8 ^ e.charCodeAt(t + o + a) << 16 ^ e.charCodeAt(n - 3), 3266489909), i ^= e.charCodeAt(n - 2) << 8 ^ e.charCodeAt(n - 1) << 16;
		for (let r = t + 3, a = n - 4; r < t + 8 && r < a; r++, a--) i = Math.imul(i ^ e.charCodeAt(r) ^ e.charCodeAt(a) << 8, 16777619);
	}
	return i ^ i >>> 15;
}, Go = (e, t, n = {}) => {
	let { GROUP_COUNT: r, edgeStart: i, labelStart: a, labelText: o, edgeTarget: s, nodeGroup: c, nodeVlist: l, vlistPat: u, vlistOps: d, vlistRef: f, vlistGroup: p, litAnchor: m, litGroup: h, litPool: g, poolOffsets: _, poolText: v, adjGid: y, adjStart: b, adjTgt: x, patGid: S, patTgt: C, postfixLookupGroups: w, customValidatorNames: T, orderSensitiveModifiers: E } = e, D = new Int32Array(r).fill(-1);
	for (let e = 0; e < y.length; e++) D[y[e]] = e;
	let ee = 0;
	for (let e = 0; e + 1 < b.length; e++) {
		let t = b[e + 1] - b[e];
		t > ee && (ee = t);
	}
	let te = 32;
	for (; te < 2 * (1 + ee + S.length);) te <<= 1;
	let O = new Int32Array(f.length + 1);
	for (let e = 0; e < f.length; e++) O[e + 1] = O[e] + u[f[e] + 1] - u[f[e]];
	let k = new Uint8Array(r);
	for (let e = 0; e < w.length; e++) k[w[e]] = 1;
	let A = i.length - 1, j = new Uint8Array(A), M = 0, N = !0;
	for (let e = 0; e < m.length; e++) {
		j[m[e]] = 1;
		let t = _[g[e] * 2 + 1];
		t > M && (M = t);
		let n = v.charCodeAt(_[g[e] * 2]);
		(n === 91 || n === 40) && (N = !1);
	}
	let P = 1;
	for (; P < m.length * 2;) P <<= 1;
	let ne = new Int32Array(P).fill(-1);
	for (let e = 0; e < m.length; e++) {
		let t = _[g[e] * 2], n = (Uo(v, t, t + _[g[e] * 2 + 1]) ^ Math.imul(m[e], 2654435761) | 0) & P - 1;
		for (; ne[n] !== -1;) n = n + 1 & P - 1;
		ne[n] = e;
	}
	let F = (e, t, n, r) => {
		let i = (Uo(t, n, r) ^ Math.imul(e, 2654435761) | 0) & P - 1, a = r - n;
		for (;;) {
			let r = ne[i];
			if (r === -1) return -1;
			if (m[r] === e && _[g[r] * 2 + 1] === a) {
				let e = _[g[r] * 2], i = !0;
				for (let r = 0; r < a; r++) if (v.charCodeAt(e + r) !== t.charCodeAt(n + r)) {
					i = !1;
					break;
				}
				if (i) return h[r];
			}
			i = i + 1 & P - 1;
		}
	}, re = n.cacheSize ?? 8192, ie = n.prefix ?? e.prefix ?? "", I = ie === "" ? "" : ie + ":", L = I.length, ae = (T ?? []).map((e) => {
		let n = t && t[e];
		if (!n) throw Error("cn: missing validator " + e);
		return n;
	}), R = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, z = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, B = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, oe = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, V = 0, H = -1, se = -1, ce = -1, U = -1, le = (e) => e >= 97 && e <= 122 || e >= 65 && e <= 90 || e >= 48 && e <= 57 || e === 95, ue = (e) => /\s/.test(String.fromCharCode(e)), de = (e, t, n) => {
		if (V = 0, H = -1, n - t < 3) return;
		let r = e.charCodeAt(t), i = e.charCodeAt(n - 1);
		if (r === 91 && i === 93) V = 1;
		else if (r === 40 && i === 41) V = 2;
		else return;
		ce = t + 1, U = n - 1;
		let a = t + 1;
		if (le(e.charCodeAt(a))) {
			for (a++; a < n - 1;) {
				let t = e.charCodeAt(a);
				if (!le(t) && t !== 45) break;
				a++;
			}
			a < n - 2 && e.charCodeAt(a) === 58 && (H = t + 1, se = a, ce = a + 1);
		}
	}, fe = (e, t, n, r) => {
		if (n - t !== r.length) return !1;
		for (let n = 0; n < r.length; n++) if (e.charCodeAt(t + n) !== r.charCodeAt(n)) return !1;
		return !0;
	}, pe = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/, me = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, he = (e) => !!e && !Number.isNaN(Number(e)), ge = (e, t, n) => {
		if (n - t < 11 || !fe(e, t, t + 10, "@container")) return !1;
		if (e.charCodeAt(t + 10) === 47) return n - t >= 12;
		let r = e.charCodeAt(t + 11);
		return r === 115 && n - t >= 17 && fe(e, t + 10, t + 16, "-size/") || r === 110 && n - t >= 19 && fe(e, t + 10, t + 18, "-normal/");
	}, _e = [
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
	], ve = "length|number|number weight|family-name|position percentage|length size bg-size|image url|shadow|length|family-name|position percentage|length size bg-size|image url|shadow|number weight".split("|").map((e) => e.split(" ")), ye = [
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
	], be = (e, t, n, r) => {
		if (e >= 10) {
			if (e >= 25) return ae[e - 25](t.slice(n, r));
			let i = e - 10;
			if (V !== _e[i]) return !1;
			if (H >= 0) {
				for (let e of ve[i]) if (fe(t, H, se, e)) return !0;
				return !1;
			}
			switch (ye[i]) {
				case 0: return !1;
				case 1: return !0;
				case 2: {
					let e = t.slice(ce, U);
					return R.test(e) && !z.test(e);
				}
				case 3: return he(t.slice(ce, U));
				case 4: return oe.test(t.slice(ce, U));
				case 5: return B.test(t.slice(ce, U));
				default: return !he(t.slice(ce, U));
			}
		}
		switch (e) {
			case 0: return !0;
			case 1: return V === 0;
			case 2: return V === 1;
			case 3: return V === 2;
			case 4: return pe.test(t.slice(n, r));
			case 5: return he(t.slice(n, r));
			case 6: {
				let e = t.slice(n, r);
				return !!e && Number.isInteger(Number(e));
			}
			case 7: return r > n && t.charCodeAt(r - 1) === 37 && he(t.slice(n, r - 1));
			case 8: return me.test(t.slice(n, r));
			default: return ge(t, n, r);
		}
	}, xe = new Set(typeof E == "string" ? E.split(" ") : E), Se = (e, t, n, r, i, a) => {
		let o = Uo(t, n, r) ^ (i ? 2654435769 : 0), s = e.get(o);
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
	}, Ce = /* @__PURE__ */ new Map(), we = /* @__PURE__ */ new Map(), Te = 2, Ee = 4096, De = (e, t) => {
		let n = [], r = 0, i = 0, a = 0;
		for (let t = 0; t < e.length; t++) {
			let o = e.charCodeAt(t);
			r === 0 && i === 0 && o === 58 ? (n.push(e.slice(a, t)), a = t + 1) : o === 91 ? r++ : o === 93 ? r-- : o === 40 ? i++ : o === 41 && i--;
		}
		n.push(e.slice(a));
		let o = n[0];
		if (n.length > 1) {
			let e = [], t = [];
			for (let r of n) r.charCodeAt(0) === 91 || xe.has(r) ? (t.length && (e.push(...t.sort()), t = []), e.push(r)) : t.push(r);
			t.length && e.push(...t.sort()), o = e.join(":");
		}
		let s = t ? o + " !" : o, c = we.get(s);
		return c === void 0 && we.set(s, c = Te++), c;
	}, Oe = /* @__PURE__ */ new Map(), ke = r, Ae = r + 4096, je = () => ke++, Me = 2097152, W = 8192, Ne = new Int32Array(W), Pe = Array(W).fill(null), Fe = new Int32Array(W), Ie = new Int32Array(W), Le = new Uint8Array(W), Re = 0, G = (e, t, n, r, i, a, o, s) => {
		let c = e;
		if (Pe[e] !== null) {
			if (Pe[e | 1] === null) c = e | 1;
			else if (!(Re++ & 3)) c = e | Re >> 2 & 1;
			else return;
		}
		Pe[c] = t.slice(n, r), Ne[c] = i, Fe[c] = a, Ie[c] = o, Le[c] = s;
	}, ze = () => Pe.fill(null), K = 256, Be = [
		new Int32Array(K),
		new Int32Array(K),
		new Int32Array(K),
		new Int32Array(K)
	], [Ve, He, Ue, We] = Be, Ge = new Uint8Array(K), q = new Uint8Array(K), Ke = () => {
		K *= 2, Be = Be.map((e) => {
			let t = new Int32Array(K);
			return t.set(e), t;
		}), [Ve, He, Ue, We] = Be;
		let e = new Uint8Array(K);
		e.set(Ge), Ge = e, q = new Uint8Array(K);
	}, qe = 64, Je = new Int32Array(qe), Ye = new Int32Array(qe), Xe = new Int32Array(r), Ze = 2048, Qe = 21, $e = new Float64Array(Ze), et = new Int32Array(Ze), tt = 0, nt = (e, t) => {
		if (e === 0 && t < r) return Xe[t] === tt ? 1 : (Xe[t] = tt, 0);
		let n = e * 2097152 + t + 1, i = Math.imul(n, 2654435761) >>> Qe;
		for (; et[i] === tt;) {
			if ($e[i] === n) return 1;
			i = i + 1 & Ze - 1;
		}
		return $e[i] = n, et[i] = tt, 0;
	}, rt = (e, t, n, r, i) => {
		if (n - t >= 2 && e.charCodeAt(t) === 91 && e.charCodeAt(n - 1) === 93) {
			let r = -1;
			for (let i = t + 1; i < n - 1; i++) if (e.charCodeAt(i) === 58) {
				r = i;
				break;
			}
			return r === -1 || r === t + 1 ? Vo : Se(Oe, e, t + 1, r, 0, je);
		}
		if (r >= 0 && c[r] >= 0) return c[r];
		for (let t = i - 1; t >= 0; t--) {
			let r = Ye[t];
			if (r > n) continue;
			let i = Je[t], a = n - r;
			if (j[i] === 1 && a > 0 && a <= M) {
				let t = e.charCodeAt(r);
				if (N === !1 || t !== 91 && t !== 40) {
					let t = F(i, e, r, n);
					if (t >= 0) return t;
				}
			}
			let o = l[i];
			if (o < 0) continue;
			let s = f[o], c = u[s], m = u[s + 1];
			if (c === m) continue;
			de(e, r, n);
			let h = O[o] - c;
			for (let t = c; t < m; t++) if (be(d[t], e, r, n)) return p[h + t];
		}
		return Vo;
	}, it = (e) => {
		let t = e.length, n = 0, c = 0, u = !1;
		(Te > Ee || Ce.size > Ee) && (Ce = /* @__PURE__ */ new Map(), we = /* @__PURE__ */ new Map(), Te = 2, ze()), ke > Ae && (Oe = /* @__PURE__ */ new Map(), ke = r, ze());
		let d = 0;
		for (; d < t;) {
			let f = e.charCodeAt(d);
			if (f === 32 || f >= 9 && f <= 13 || f >= 160 && ue(f)) {
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
				} else if (f >= 160 && ue(f)) {
					u = !0;
					break;
				}
				m = Math.imul(m ^ f, 16777619), d++;
			}
			let h = d, g = h - p;
			n === K && Ke();
			let _ = n++;
			Ve[_] = p, He[_] = h, c += g, m ^= Math.imul(g, 2654435761);
			let v = m ^ m >>> 15, y = v & 8190;
			{
				let t = -1;
				if (Ne[y] === v && Pe[y] !== null && Pe[y].length === g ? t = y : Ne[y | 1] === v && Pe[y | 1] !== null && Pe[y | 1].length === g && (t = y | 1), t >= 0) {
					let n = Pe[t], r = !0;
					for (let t = 0; t < g; t++) if (n.charCodeAt(t) !== e.charCodeAt(p + t)) {
						r = !1;
						break;
					}
					if (r) {
						Ue[_] = Fe[t], We[_] = Ie[t], Ge[_] = Le[t];
						continue;
					}
				}
			}
			let b = p;
			if (L !== 0) {
				if (h - p <= L || !e.startsWith(I, p)) {
					Ue[_] = Vo, G(y, e, p, h, v, Vo, 0, 0);
					continue;
				}
				b = p + L;
			}
			let x = 0, S = 0, C = -1, w = -1;
			for (let t = b; t < h; t++) {
				let n = e.charCodeAt(t);
				if (x === 0 && S === 0) {
					if (n === 58) {
						C = t;
						continue;
					}
					if (n === 47) {
						w = t;
						continue;
					}
				}
				n === 91 ? x++ : n === 93 ? x-- : n === 40 ? S++ : n === 41 && S--;
			}
			let T = C >= b ? C + 1 : b, E = T, D = h, ee = !1, te = 0;
			D > E && e.charCodeAt(D - 1) === 33 ? (ee = !0, D--) : D > E && e.charCodeAt(E) === 33 && (ee = !0, E++, te = 1);
			let O = -1;
			w > T && (O = w + te, O >= D && (O = -1));
			let A = E;
			D - E > 1 && e.charCodeAt(E) === 45 && (A = E + 1);
			let M = 0, N = 0, P = 0, ne = -1, F = 0;
			(l[0] >= 0 || j[0] === 1) && (Je[0] = 0, Ye[0] = A, F = 1);
			let re = Ho, ie = 0;
			for (let t = A; t < D; t++) if (t === O && (re = N < P ? Ho : M, ie = F), M !== Ho) {
				let n = e.charCodeAt(t), r = -1;
				if (N < P) o.charCodeAt(N) === n ? (N++, N === P && (r = M = ne)) : M = Ho;
				else {
					let e = i[M], t = i[M + 1], c = Ho;
					for (let i = e; i < t; i++) {
						let e = a[i];
						if (o.charCodeAt(e) === n) {
							a[i + 1] - e === 1 ? r = c = s[i] : (N = e + 1, P = a[i + 1], ne = s[i], c = M);
							break;
						}
					}
					M = c;
				}
				if (r >= 0 && (l[r] >= 0 || j[r] === 1) && t + 1 < D && e.charCodeAt(t + 1) === 45) {
					if (F === qe) {
						qe *= 2;
						let e = new Int32Array(qe);
						e.set(Je), Je = e;
						let t = new Int32Array(qe);
						t.set(Ye), Ye = t;
					}
					Je[F] = r, Ye[F] = t + 2, F++;
				}
			}
			O === D && (re = N < P ? Ho : M, ie = F);
			let ae = N < P ? Ho : M, R, z = !1;
			if (O >= 0) {
				if (z = !0, R = rt(e, E, O, re, ie), R !== Vo && R < r && k[R]) {
					let t = rt(e, E, D, ae, F);
					t !== Vo && t !== R && (R = t, z = !1);
				} else R === Vo && (R = rt(e, E, D, ae, F), z = !1);
			} else R = rt(e, E, D, ae, F);
			let B = 0, oe = 0;
			R === Vo ? Ue[_] = Vo : (oe = +!!z, B = b >= C ? +!!ee : Se(Ce, e, b, C, +!!ee, (e) => De(e, ee)), Ue[_] = R, Ge[_] = oe, We[_] = B), G(y, e, p, h, v, R, B, oe);
		}
		if (n === 0) return "";
		if (n === 1) return Ve[0] === 0 && He[0] === t ? e : e.slice(Ve[0], He[0]);
		if (n * te > Ze) {
			for (; n * te > Ze;) Ze <<= 1, Qe--;
			$e = new Float64Array(Ze), et = new Int32Array(Ze);
		}
		if (Te >= Me || ke >= Me) throw Error("cn: too many distinct classes in one merge");
		tt = tt + 1 | 0, tt === 0 && (Xe.fill(0), et.fill(0), tt = 1);
		let f = !1;
		for (let e = n - 1; e >= 0; e--) {
			let t = Ue[e];
			if (t === Vo) {
				q[e] = 1;
				continue;
			}
			let n = We[e];
			if (nt(n, t) === 1) q[e] = 0, f = !0;
			else if (q[e] = 1, t < r) {
				let r = D[t];
				if (r >= 0) for (let e = b[r]; e < b[r + 1]; e++) nt(n, x[e]);
				if (Ge[e] & 1) for (let e = 0; e < S.length; e++) S[e] === t && nt(n, C[e]);
			}
		}
		if (!f && !u && t === c + n - 1) return e;
		let p = "", m = 0;
		for (; m < n;) {
			if (!q[m]) {
				m++;
				continue;
			}
			let t = Ve[m], r = He[m], i = m + 1;
			for (; i < n && q[i] && Ve[i] === r + 1 && e.charCodeAt(r) === 32;) r = He[i], i++;
			p.length > 0 && (p += " "), p += e.slice(t, r), m = i;
		}
		return p;
	}, at = 16384, J = new Int32Array(at * 2), ot = 0, st = 1, ct = /* @__PURE__ */ Object.create(null), lt = /* @__PURE__ */ Object.create(null), ut = /* @__PURE__ */ new Map(), dt = /* @__PURE__ */ new Map(), ft = 0, pt = 0, mt = () => {
		ot ^= at, st = st + 1 | 0, pt = 0;
	}, ht = (e) => {
		let t = ct[e];
		if (t !== void 0) return t;
		let n = Wo(e, 0, e.length), r = (n & 16383) + ot, i = J[r] === (n ^ st) || J[r ^ at] === (n ^ st - 1);
		return i && (t = lt[e], t !== void 0) ? (ct[e] = t, t) : (t = it(e), i ? (ct[e] = t, ++ft > re && (ft = 0, lt = ct, ct = /* @__PURE__ */ Object.create(null), mt())) : (J[r] = n ^ st, ++pt > at && mt()), t);
	}, gt = (e) => {
		let t = ut.get(e);
		if (t !== void 0) return t;
		let n = Wo(e, 0, e.length), r = (n & 16383) + ot, i = J[r] === (n ^ st) || J[r ^ at] === (n ^ st - 1);
		return i && (t = dt.get(e), t !== void 0) ? (ut.set(e, t), t) : (t = it(e), i ? (ut.set(e, t), ++ft > re && (ft = 0, dt = ut, ut = /* @__PURE__ */ new Map(), mt())) : (J[r] = n ^ st, ++pt > at && mt()), t);
	}, _t = (e) => {
		let t = Wo(e, 0, e.length), n = (t & 16383) + ot;
		return J[n] === (t ^ st) || J[n ^ at] === (t ^ st - 1) || (J[n] = t ^ st, ++pt > at && mt(), !1);
	}, vt = re === 0 ? it : Bo ? (e) => {
		let t = ut.get(e);
		return t === void 0 ? gt(e) : t;
	} : ht;
	return {
		merge: function() {
			return arguments.length === 1 && typeof arguments[0] == "string" ? vt(arguments[0]) : vt(Jo.apply(null, arguments));
		},
		mergeString: vt,
		seenBefore: re === 0 ? () => !1 : _t,
		mergeUncached: it
	};
}, Ko = (e, t) => {
	if (!e) return "";
	if (typeof e == "string") return e;
	let n = "";
	if (typeof e.length == "number" && (!t || Array.isArray(e))) {
		let r = e;
		for (let e = 0; e < r.length; e++) {
			let i = r[e];
			if (!i) continue;
			let a = typeof i == "string" ? i : Ko(i, t);
			a && (n && (n += " "), n += a);
		}
		return n;
	}
	if (t) {
		if (typeof e == "number") return "" + e;
		if (typeof e == "object") for (let t in e) e[t] && (n && (n += " "), n += t);
	}
	return n;
}, qo = (e, t) => {
	let n = "";
	for (let r = 0; r < e.length; r++) {
		let i = e[r];
		if (!i) continue;
		let a = typeof i == "string" ? i : Ko(i, t);
		a && (n && (n += " "), n += a);
	}
	return n;
}, Jo = function() {
	return qo(arguments, !1);
}, Yo = 256, Xo = 16, Zo = 1024, Qo = 4096, $o = (e, t) => {
	let n = t === void 0 ? () => !0 : t.seenBefore, r = t === void 0 ? e : t.mergeUncached, i = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map(), o = 0, s = null, c = null, l = [], u = [], d = 0, f = (t, n, r) => {
		c === null && (c = Array(Qo).fill(""), l = Array(Qo).fill(""), u = Array(Qo).fill(""));
		let i = Wo(t, 0, t.length) & Qo - 2;
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
					if (n = t[e] = Ko(n, !0), !n) continue;
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
			}) : ++_.miss > Xo && (_.miss = Xo, _.skip = Zo, _.e.length = 0, _.at = 0);
			let u = _.e;
			u.length < Yo ? u.push(v) : (u[_.at] = v, _.at = _.at + 1 & Yo - 1), ++o > 1e3 && (o = 0, a = i, i = /* @__PURE__ */ new Map());
		}
		return s !== null && s !== v && (s.n = v), s = v, v.r;
	}, g = (t) => Array.isArray(t) ? h(t.slice(), !1) : t === 0 || t === 0n ? "0" : e(Ko(t, !0));
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
}, es = 48, ts = (e, t = 0) => {
	let n = new Int32Array(e.length);
	for (let r = 0; r < e.length; r++) n[r] = e.charCodeAt(r) - es - t;
	return n;
}, ns = (e) => {
	let t = new Int32Array(e.length + 1);
	for (let n = 0; n < e.length; n++) t[n + 1] = t[n] + e[n];
	return t;
}, rs = (e) => {
	let t = new Int32Array(e.length), n = 0;
	for (let r = 0; r < e.length; r++) {
		let i = e.charCodeAt(r) - es;
		n += i >>> 1 ^ -(i & 1), t[r] = n;
	}
	return t;
}, is = 384, as = [], os = ns(ts("E0500002005282000000002000150000020021820000011200000003022202000300004200120000200420001200021200301200010400162000010000220021010:2192001200220012000220012000200200200400010200040000000000400200108200110100000022010313000162002000020020012020080213000228200000000082000000000120002000120020020040101020300130001001010")), ss = ns(ts(":11111111211111119311546544411119731869:671397415686432441111111111161114151214313433415:78311132233313187211117221449443411141111151152226611131111112212518142224214215421421542142424242516171151615616347111111111197911327451111111111111111111113134714133513411111311111111111111111111112444411111342312715245411117:3")), cs = "@containerabcdefghinlmoprstunderlineviawzccentlignnimatespectuto-colsrowsaglorightnessckdrop-sisbcontrastfiltergrayscalehue-rotateinvertopacityslurrightnessaturateepia-coniclinearpositionradialsizeockurrderttom-belrstxyespacing-xyaretoursorlnt-umnsendspantartainentrasteividerop-shadowurationcorationlay-xyasendillexontromlter-featuresstretchapr-xyayscaleidow-colsrowsue-rotatedentlinesetvert-beringsxyeshadoweiadingftnest-clamp-imageabein-lrstxyskx--b-coniclpositionrsizet-x-y-fromto-fromto-inearfromto-fromto-adialfromto-fromtofromtofromtofromtoblockhinlinew-screenesblockhinlinewbjectpacityrutlinederigin-offsetbelrstxyesrspective-originaceholderioghtng-offsettateundedw-xyz-belrstlreseslr-endspantartaturatecepiahizekewpace-taleroll-xyz-barmpbelrstxyesbelrstxyes-thumbrackadowrink-xyxyartrokeabextora-shadowpckingnsformitionlate-xyz-offsetill-changeoom", ls = (() => {
	let e = os.length - 1, t = new Int32Array(e);
	for (let n = e - 1; n >= 0; n--) {
		let e = 1, r = n + 1;
		for (let i = os[n]; i < os[n + 1]; i++) e += t[r], r += t[r];
		t[n] = e;
	}
	let n = new Int32Array(os[e]), r = 0;
	for (let i = 0; i < e; i++) {
		let e = i + 1;
		for (let a = os[i]; a < os[i + 1]; a++) n[r++] = e, e += t[e];
	}
	return n;
})(), us = ts("02000000000000900<=0?000B000F00F00ŏI0J0LNPRTVX0000]_a00000000000000000000000rst0000000zŏ00000000000ŏ0000000ŏ00000000000000000000000000000000000000000000000000000000000000Ë000000000000000000000Þ000000000000000000ð0000000ø0ùúûüýþÿĀāĂăĄąĆ000000000000000000000000000000000000000000ħ0ĨĪ00000000000000000000ļĽ00000Ŭ000000", 1), ds = ns(ts("1233333593464636351265367151576")), fs = ts("93203242332583253248325D>E?F@03263243255B:032523853:0325B:8GA032542H<C=12727B:0324325853;D>E?3257D>03258432585:0325B:;0328B:032"), ps = ts("012113445661666666789111:5;;;;;;;;444;;;:62999<1161=62>>?61:21@ABCD4446996:64E:::;:?::64:F114GHHIHHHHIHH1HH1HH1HHHHHH::EJK4444::EJ4444441691;644444114244444:;L6666555555555555555999666664444444444444444444444226?6:66644M9N?D:111::::6DJ199"), ms = rs("020200202020020020020020020020200200200200200200200002020202001003040106000200200200200200200200200200200200200200200200200200200200200200200200200200200200020020020020020020002020200202002002002002002002002002002020002002020020200220200200200200200200200200200200020020020000200020002000200200200020020020002000200200200020020202002020202000200200020022000200200020020002002000200220002002000200W0Z00020020002002020002002000200g0j0002002000200200020020002002000200200020020002000200002000002002002002002000200020000200002002002002002002002020020020200200200200200200200200202020020020020020020020020002002002020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020002002002002002002000200200200200200200200200200020202020002000200020002002002002000020200200"), hs = (() => {
	let e = (/* @__PURE__ */ new Int32Array(319)).fill(-1), t = rs("02422242:222222242224222242442222222422222244442242226224222426222422442462222422622222222626222462242622422622422424242422222222422222222242422222222222222222622442224222222222222224424442262222222222222222222226224222424242422224422422422222"), n = rs("02222222222222222222202222222222222222222222221422222222222222222222222222222222222Y\\222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222221422222222222222222222222222222222222222Ŀł222222222222222222");
	for (let r = 0; r < t.length; r++) e[t[r]] = n[r];
	return e;
})(), gs = "container |break-after- all auto avoid avoid-page column left page right|break-before- all auto avoid avoid-page column left page right|break-inside-a uto void void-column void-page|box-decoration- clone slice|box- border content| contents flow-root hidden table table-caption table-cell table-column table-column-group table-footer-group table-header-group table-row table-row-group| not-sr-only sr-only|float- end left none right start|clear- both end left none right start|isolat e ion-auto|overflow- auto clip hidden scroll visible|overflow-x- auto clip hidden scroll visible|overflow-y- auto clip hidden scroll visible|overscroll- auto contain none|overscroll-x- auto contain none|overscroll-y- auto contain none| absolute fixed relative static sticky| collapse invisible visible|justify- around baseline between center center-safe end end-safe evenly normal start stretch|justify-items- center center-safe end end-safe normal start stretch|justify-self- auto center center-safe end end-safe start stretch|items- baseline baseline-last center center-safe end end-safe start stretch|self- auto baseline baseline-last center center-safe end end-safe start stretch|place-content- around baseline between center center-safe end end-safe evenly start stretch|place-items- baseline center center-safe end end-safe start stretch|place-self- auto center center-safe end end-safe start stretch| antialiased subpixel-antialiased| italic not-italic|normal-nums |ordinal |slashed-zero | lining-nums oldstyle-nums| proportional-nums tabular-nums| diagonal-fractions stacked-fractions| no-underline overline| capitalize lowercase normal-case uppercase|truncate |whitespace- break-spaces normal nowrap pre pre-line pre-wrap|break- all keep normal words|wrap- anywhere break-word normal|hyphens- auto manual none|mix-blend- color color-burn color-dodge darken difference exclusion hard-light hue lighten luminosity multiply normal overlay plus-darker plus-lighter saturation screen soft-light|table- auto fixed|caption- bottom top|backface- hidden visible|appearance- auto none|scheme- dark light light-dark normal only-dark only-light|field-sizing- content fixed|pointer-events- auto none|resize  -none -x -y|snap- align-none center end start|snap- always normal|snap- both none x y|snap- mandatory proximity|touch- auto manipulation none|touch-pan- left right x|touch-pan- down up y|touch-pinch-zoom |select- all auto none text|forced-color-adjust- auto none| normal size| baseline bottom middle sub super text-bottom text-top top| bounce none ping pulse spin| auto square video| auto fr max min px|none | auto full px| fixed local scroll|clip- border content padding text|origin- border content padding| bottom bottom-left bottom-right center left left-bottom left-top right right-bottom right-top top top-left top-right| no-repeat repeat repeat-round repeat-space repeat-x repeat-y| auto contain cover| gradient-to-b gradient-to-bl gradient-to-br gradient-to-l gradient-to-r gradient-to-t gradient-to-tl gradient-to-tr none|blend- color color-burn color-dodge darken difference exclusion hard-light hue lighten luminosity multiply normal overlay saturation screen soft-light|to- b bl br l r t tl tr| auto dvh fit full lh lvh max min px screen svh| dashed dotted double hidden none solid| collapse separate|px |auto |full | content none strict| inline-size size|layout |paint |style | around baseline between center center-safe end end-safe evenly normal start stretch| alias all-scroll auto cell col-resize context-menu copy crosshair default e-resize ew-resize grab grabbing help move n-resize ne-resize nesw-resize no-drop none not-allowed ns-resize nw-resize nwse-resize pointer progress row-resize s-resize se-resize sw-resize text vertical-text w-resize wait zoom-in zoom-out| dashed dotted double solid wavy| auto from-font|reverse |initial | in in-out initial linear out| col col-reverse row row-reverse| nowrap wrap wrap-reverse| auto initial none| black bold extrabold extralight light medium normal semibold thin| condensed expanded extra-condensed extra-expanded normal semi-condensed semi-expanded ultra-condensed ultra-expanded|flow- col col-dense dense row row-dense| none subgrid| auto dvh dvw fit full lh lvh lvw max min px screen svh svw| block flex grid table| auto dvw fit full lvw max min px screen svw| loose none normal px relaxed snug tight|through |item | inside outside| decimal disc none| auto px| clip-border clip-content clip-fill clip-padding clip-stroke clip-view no-clip| add exclude intersect subtract| alpha luminance match|origin- border content fill padding stroke view|type- alpha luminance| circle ellipse| closest-corner closest-side farthest-corner farthest-side|at- bottom bottom-left bottom-right center left left-bottom left-top right right-bottom right-top top top-left top-right| dvh fit full lh lvh max min none px screen svh| auto dvh dvw fit full lh lvh lvw max min none px screen svh svw| dvw fit full lvw max min none px screen svw| auto dvh dvw fit full lvh lvw max min none prose px svh svw| auto dvh dvw fit full lvh lvw max min none px screen svh svw| contain cover fill none scale-down| first last none| distant dramatic midrange near none normal|inset | full none|3d | auto smooth|gutter- auto both stable| auto none thin| inner none| auto dvh dvw fit full lvh lvw max min px svh svw|base | center end justify left right start| clip ellipsis| balance nowrap pretty wrap| normal tight tighter wide wider widest| cpu gpu none| 3d flat| all colors none opacity shadow transform| discrete normal| full px| auto dvh dvw fit full lvh lvw max min px screen svh svw| auto contents scroll transform".split("|").map((e) => {
	let t = e.split(" "), n = t.shift();
	for (let e = 0; e < t.length; e++) t[e] = n + t[e];
	return t;
}), _s = rs("0000000000000000000000000000000000000000000000000000000000000262242:6@200000006:240B428:4422400002046044222426220026642642462026224222824220022400000000\\00N222422242222222224062242222222422226264222422222222222222442804222422222222222222222222220<4<0204260002444020204224422"), vs = rs("ɠ222222222222222222222222222222222222222222222222222222222222˕4222226>ʶ22ʷʺʷ2ʸʷ42ʴ2ʓ22>621422ɶ222ɹɼɷɺɷɺ22ɱ42222ɨ2ɧ26622ɘɓ244ƸƵ222]d24242ǖǓƚÄȫ2263ȨȥȨ2222222ǣ222222222222222222ǂƽ2ƾƵ2222222422222ƜƑ22222222222222222222144Ŧţ22Ţş222222222222222222222ĸ2ı68ĦģĦɡŰ4Ġ«®ĝ822ĔđĔ2ē2222622"), ys = rs("02222222222222222222222222222222222222222222222222222222222222222202022222222222EH2200IL021042222Y\\222IL0cf2e10j2222U00X202[^2y0000120|{~22:22|22222222222G000qOVI00000}2>40000B00000I¨©000¬00000000000000021M®­00°000000000000000000000222HGHa1º222¿2À2222ÉÌ000­°2±"), bs = /* @__PURE__ */ new Int32Array(995), xs = /* @__PURE__ */ new Int32Array(995), Ss = /* @__PURE__ */ new Int32Array(995), Cs = "", ws = /* @__PURE__ */ new Int32Array(1038);
{
	let e = /* @__PURE__ */ new Map(), t = 0, n = 0;
	for (let r = 0; r < _s.length; r++) for (let i of gs[ys[r]]) {
		let a = e.get(i);
		a === void 0 && (a = t++, e.set(i, a), ws[a * 2] = Cs.length, ws[a * 2 + 1] = i.length, Cs += i), bs[n] = _s[r], xs[n] = vs[r], Ss[n] = a, n++;
	}
}
var Ts = rs("0b2N:222@R>F@286¦2@H2D266226FB22B2>BD\\6N22222Z222D222p"), Es = ns(ts("1::24444432:442:44:44>222222:44:4421322511111311111114")), Ds = rs("24A;33N=C@H4A;33N=C@<27;83:;8393NQ:3NQʰ222ˉºŴŽ2R2=18cƴÅŇ=cĞÛC1ƈǝȈ:ħ25=11D3A@4=<1;1DEr25;11B3?<6;:371BCn9@7=<8192>2E121@9@EHE@9>2T25511<398454131<=V25511<398454131<=ƧNž2Đå242L222290000f22500ɛ000ǘ222"), Os = ts("ĳ"), ks = ts(""), As = ts("1"), js = {
	GROUP_COUNT: is,
	customValidatorNames: as,
	edgeStart: os,
	labelStart: ss,
	labelText: cs,
	edgeTarget: ls,
	nodeGroup: us,
	nodeVlist: hs,
	vlistPat: ds,
	vlistOps: fs,
	vlistRef: ps,
	vlistGroup: ms,
	litAnchor: bs,
	litGroup: xs,
	litPool: Ss,
	poolOffsets: ws,
	poolText: Cs,
	adjGid: Ts,
	adjStart: Es,
	adjTgt: Ds,
	patGid: Os,
	patTgt: ks,
	postfixLookupGroups: As,
	orderSensitiveModifiers: "* ** after backdrop before details-content file first-letter first-line marker placeholder selection"
}, Ms = 8192, Ns = /* @__PURE__ */ Go(js, void 0, { cacheSize: Ms }), Ps = /* @__PURE__ */ $o(Ns.mergeString, Ns);
Ns.merge;
var Fs = (e) => e, Is = [], Ls = {
	reset() {
		for (let e = 0; e < Is.length; e++) Is[e]();
	},
	onReset(e) {
		Is.push(e);
	}
}, Rs = (e) => {
	if (e.indexOf(" ") !== -1) return !1;
	for (let t = 0; t < e.length; t++) {
		let n = e.charCodeAt(t);
		if (n >= 9 && n <= 13) return !1;
	}
	return !0;
}, zs = 1024, Bs = 256, Vs = 1e3, Hs = (e) => typeof e == "string" ? e : e == null ? "" : ta(e), Us = (e, t, n) => e ? t ? n ? `${e} ${t} ${n}` : `${e} ${t}` : n ? `${e} ${n}` : e : t ? n ? `${t} ${n}` : t : n, Ws = ((e, t, n) => {
	let { mergeString: r, mergeUncached: i, seenBefore: a } = e, o = n > 0, s = /* @__PURE__ */ new Map(), c = /* @__PURE__ */ new Map(), l = 0, u = (e, t) => {
		if (t === 0) return "";
		let n = e[0];
		if (t === 1) return Rs(n) ? n : o && a(n) ? r(n) : i(n);
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
		return u === void 0 && s.set(n, u = []), u.length >= Bs && u.shift(), u.push({
			a: e.slice(0, t),
			r: f
		}), ++l > Vs && (l = 0, c = s, s = /* @__PURE__ */ new Map()), f;
	}, d = /* @__PURE__ */ new Map(), f = /* @__PURE__ */ new Map(), p = 0, m = "", h = "", g = "", _ = "";
	return {
		engine: e,
		cn: t,
		adapter: {
			parts: u,
			override: (e, t, n) => {
				let s = Hs(t), c = Hs(n);
				if (!s && !c) return e;
				if (!o) return i(Us(e, s, c));
				if (e === m && s === h && c === g) return _;
				let l = s ? c ? `${s}\0${c}` : s : c, u = d.get(e);
				u === void 0 && (u = f.get(e), u !== void 0 && d.set(e, u));
				let v = u === void 0 ? void 0 : u.get(l);
				if (v === void 0) {
					let t = Us(e, s, c);
					if (!a(t)) return i(t);
					v = r(t), u === void 0 && d.set(e, u = /* @__PURE__ */ new Map()), u.set(l, v), ++p > zs && (p = 0, f = d, d = /* @__PURE__ */ new Map());
				}
				return m = e, h = s, g = c, _ = v, v;
			}
		},
		reset() {
			s = /* @__PURE__ */ new Map(), c = /* @__PURE__ */ new Map(), l = 0, d = /* @__PURE__ */ new Map(), f = /* @__PURE__ */ new Map(), p = 0, m = "", h = "", g = "", _ = "";
		}
	};
})(Ns, Ps, Ms);
Ls.onReset(() => {
	Ws.reset();
});
var Gs = (e) => {
	let t = e.twMergeConfig;
	return t != null && !$(t);
}, Ks = () => /* @__PURE__ */ TypeError("[tailwind-variants] `twMergeConfig` is only supported by the `tailwind-variants/config` entry. Import `tv`, `createTV`, or `cnMerge` from there, or inject a merge function with `twMerge`."), qs = (e, t) => {
	if (t === 0) return "";
	let n = e[0];
	for (let r = 1; r < t; r++) n += ` ${e[r]}`;
	return n;
}, Js = {
	parts: qs,
	override: (e, t, n) => ca(e, t, n)
}, Ys = (e) => {
	let t = (t) => t ? e(t) : "";
	return {
		parts: (e, n) => t(qs(e, n)),
		override: (e, n, r) => t(ca(e, n, r))
	};
}, Xs = (e) => e.twMerge === !1 ? Js : typeof e.twMerge == "function" ? Ys(e.twMerge) : Gs(e) ? null : Ws.adapter, Zs = zo((e) => {
	let t = Xs(e);
	if (t === null) throw Ks();
	return t;
}, Fs), Qs = Zs.tv;
Zs.createTV;
// svelte/lib/ui/button.ts
var $s = Qs({
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
}, { twMerge: !1 }), ec = (e = {}) => $i($s(e)), tc = /* @__PURE__ */ new Set([
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
]), nc = /* @__PURE__ */ Nt("<span aria-hidden=\"true\" class=\"tw:size-4 tw:animate-spin tw:rounded-full tw:border-2 tw:border-current tw:border-r-transparent tw:motion-reduce:animate-none\"></span>"), rc = /* @__PURE__ */ Nt("<button><!> <!></button>");
function ic(e, t) {
	ie(t, !0);
	let n = yr(t, "loading", 3, !1), r = yr(t, "disabled", 3, !1), i = yr(t, "type", 3, "button"), a = yr(t, "ref", 15, null), o = /* @__PURE__ */ gr(t, tc);
	var s = rc();
	Jn(s, (e) => ({
		type: i(),
		disabled: r() || n(),
		"aria-busy": n() || void 0,
		class: e,
		...o
	}), [() => $i(ec({
		variant: t.variant,
		size: t.size
	}), t.class)]);
	var c = j(s), l = (e) => {
		Rt(e, nc());
	};
	Xt(c, (e) => {
		n() && e(l);
	}), un(C(c, 2), () => t.children ?? h), S(s), or(s, (e) => a(e), () => a()), Rt(e, s), rt();
}
// svelte/lib/ui/Input.svelte
var ac = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"value",
	"class",
	"ref"
]), oc = /* @__PURE__ */ Nt("<input/>");
function sc(e, t) {
	ie(t, !0);
	let n = yr(t, "value", 15, ""), r = yr(t, "ref", 15, null), i = /* @__PURE__ */ gr(t, ac);
	var a = oc();
	Jn(a, (e) => ({
		class: e,
		...i
	}), [() => $i("tw:h-9 tw:w-full tw:min-w-0 tw:rounded-control tw:border tw:border-input tw:bg-studio-input-background tw:px-3 tw:py-2 tw:font-sans tw:text-sm tw:font-normal tw:leading-5 tw:tracking-normal tw:text-foreground tw:outline-none tw:placeholder:text-muted-foreground tw:focus-visible:border-ring tw:focus-visible:ring-2 tw:focus-visible:ring-ring/30 tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-destructive/30", t.class)], void 0, void 0, void 0, !0), or(a, (e) => r(e), () => r()), Qn(a, n), Rt(e, a), rt();
}
// svelte/lib/ui/Label.svelte
var cc = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"children",
	"class"
]), lc = /* @__PURE__ */ Nt("<label><!></label>");
function uc(e, t) {
	ie(t, !0);
	let n = /* @__PURE__ */ gr(t, cc);
	var r = lc();
	Jn(r, (e) => ({
		class: e,
		...n
	}), [() => $i("tw:font-sans tw:text-sm tw:font-medium tw:leading-5 tw:text-foreground", t.class)]), un(j(r), () => t.children ?? h), S(r), Rt(e, r), rt();
}
// svelte/lib/ui/Card.svelte
var dc = /* @__PURE__ */ Nt("<h2 class=\"tw:m-0 tw:font-sans tw:text-base tw:font-semibold tw:leading-6 tw:tracking-normal\"> </h2>"), fc = /* @__PURE__ */ Nt("<p class=\"tw:m-0 tw:text-sm tw:leading-5 tw:text-muted-foreground\"> </p>"), pc = /* @__PURE__ */ Nt("<div class=\"tw:space-y-1\"><!><!></div>"), mc = /* @__PURE__ */ Nt("<section><!> <!></section>");
function hc(e, t) {
	ie(t, !0);
	var n = mc(), r = j(n), i = (e) => {
		var n = pc(), r = j(n), i = (e) => {
			var n = dc(), r = z(n, !0);
			Me(() => Ut(r, t.title)), Rt(e, n);
		};
		Xt(r, (e) => {
			t.title && e(i);
		});
		var a = C(r), o = (e) => {
			var n = fc(), r = z(n, !0);
			Me(() => Ut(r, t.description)), Rt(e, n);
		};
		Xt(a, (e) => {
			t.description && e(o);
		}), S(n), Rt(e, n);
	};
	Xt(r, (e) => {
		(t.title || t.description) && e(i);
	}), un(C(r, 2), () => t.children), S(n), Me((e) => wn(n, 1, e), [() => vn($i("tw:space-y-4 tw:rounded-surface tw:border tw:border-border tw:bg-card tw:p-5 tw:font-sans tw:text-sm tw:text-card-foreground tw:shadow-xs", t.class))]), Rt(e, n), rt();
}
export { pn as A, Jt as B, Kn as C, vn as D, wn as E, $t as F, zt as G, Lt as H, Qt as I, wt as J, It as K, Xt as L, dn as M, un as N, _n as O, rn as P, ot as Q, Wt as R, Un as S, Wn as T, Nt as U, Rt as V, Ft as W, St as X, Ct as Y, bt as Z, or as _, ec as a, Qn as b, xr as c, gr as d, vr as f, sr as g, pr as h, ic as i, fn as j, mn as k, br as l, ur as m, uc as n, Qs as o, dr as p, Tt as q, sc as r, $i as s, hc as t, yr as u, tr as v, Gn as w, Jn as x, er as y, Ut as z };
