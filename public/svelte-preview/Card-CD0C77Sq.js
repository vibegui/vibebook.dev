import { An as e, At as t, B as n, Bt as r, C as i, Cn as a, Ct as o, D as s, Dn as c, E as l, En as u, Et as d, F as f, G as p, Gt as m, H as h, Ht as g, I as _, It as v, Jt as y, K as b, Kt as x, Mn as S, Mt as C, N as w, Nn as T, O as E, P as D, Pn as O, Q as ee, Qt as k, R as A, S as j, St as M, T as N, Tn as P, U as F, Ut as I, V as L, Vt as te, W as ne, Wt as R, X as z, Xt as B, Y as V, Yt as H, Z as re, _ as ie, a as U, an as ae, at as oe, b as se, bn as ce, c as le, cn as ue, ct as de, d as fe, dn as pe, dt as me, en as he, f as ge, fn as _e, ft as ve, g as W, gn as ye, gt as be, h as xe, hn as Se, ht as Ce, i as we, in as Te, it as Ee, j as De, jn as Oe, k as ke, kn as Ae, kt as je, l as Me, ln as Ne, lt as Pe, mn as Fe, mt as Ie, nn as Le, nt as G, o as Re, on as ze, ot as K, p as Be, pn as Ve, q as He, qt as Ue, r as We, s as Ge, sn as Ke, t as qe, tn as Je, tt as Ye, u as Xe, un as Ze, ut as Qe, w as $e, wn as et, wt as tt, xn as nt, xt as rt, y as q, yn as it, z as at, zt as ot } from "./shared-Cn4mm4KY.js";
// node_modules/svelte/src/attachments/index.js
function st() {
	return Symbol(Le);
}
// node_modules/svelte/src/utils.js
function ct(e) {
	return e.endsWith("capture") && e !== "gotpointercapture" && e !== "lostpointercapture";
}
var lt = [
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
function ut(e) {
	return lt.includes(e);
}
var dt = /* @__PURE__ */ "allowfullscreen.async.autofocus.autoplay.checked.controls.default.disabled.formnovalidate.indeterminate.inert.ismap.loop.multiple.muted.nomodule.novalidate.open.playsinline.readonly.required.reversed.seamless.selected.webkitdirectory.defer.disablepictureinpicture.disableremoteplayback".split("."), ft = {
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
function pt(e) {
	return e = e.toLowerCase(), ft[e] ?? e;
}
[...dt];
var mt = ["touchstart", "touchmove"];
function ht(e) {
	return mt.includes(e);
}
var gt = [
	"textarea",
	"script",
	"style",
	"title"
];
function _t(e) {
	return gt.includes(e);
}
// node_modules/svelte/src/internal/client/dom/elements/events.js
var vt = Symbol("events"), yt = /* @__PURE__ */ new Set(), bt = /* @__PURE__ */ new Set();
function xt(e) {
	if (!R) return;
	e.removeAttribute("onload"), e.removeAttribute("onerror");
	let t = e.__e;
	t !== void 0 && (e.__e = void 0, queueMicrotask(() => {
		e.isConnected && e.dispatchEvent(t);
	}));
}
function St(e, t, n, r = {}) {
	function i(e) {
		if (r.capture || kt.call(t, e), !e.cancelBubble) return Qe(() => n?.call(this, e));
	}
	return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? (i.__removed = !1, Ce(() => {
		i.__removed || t.addEventListener(e, i, r);
	})) : t.addEventListener(e, i, r), i;
}
function Ct(e, t, n, r = {}) {
	var i = St(t, e, n, r);
	return () => {
		i.__removed = !0, e.removeEventListener(t, i, r);
	};
}
function wt(e, t, n, r, i) {
	var a = {
		capture: r,
		passive: i
	}, o = St(e, t, n, a);
	(t === document.body || t === window || t === document || t instanceof HTMLMediaElement) && s(() => {
		o.__removed = !0, t.removeEventListener(e, o, a);
	});
}
function Tt(e, t, n) {
	(t[vt] ??= {})[e] = n;
}
function Et(e) {
	for (var t = 0; t < e.length; t++) yt.add(e[t]);
	for (var n of bt) n(e);
}
var Dt = null, Ot = !1;
function kt(e) {
	var t = this, n = t.ownerDocument, r = e.type, i = e.composedPath?.() || [], a = i[0] || e.target;
	Dt = e, Ot || (Ot = !0, setTimeout(() => {
		Ot = !1, Dt = null;
	}));
	var o = 0, s = Dt === e && e[vt];
	if (s) {
		var l = i.indexOf(s);
		if (l !== -1 && (t === document || t === window)) {
			e[vt] = t;
			return;
		}
		var u = i.indexOf(t);
		if (u === -1) return;
		l <= u && (o = l);
	}
	if (a = i[o] || e.target, a !== t) {
		c(e, "currentTarget", {
			configurable: !0,
			get() {
				return a || n;
			}
		});
		var d = Re, f = U;
		fe(null), Xe(null);
		try {
			for (var p, m = []; a !== null && a !== t;) {
				try {
					var h = a[vt]?.[r];
					h == null || a.disabled && e.target !== a || h.call(a, e);
				} catch (e) {
					p ? m.push(e) : p = e;
				}
				if (e.cancelBubble) break;
				o++, a = o < i.length ? i[o] : null;
			}
			if (p) {
				for (let e of m) queueMicrotask(() => {
					throw e;
				});
				throw p;
			}
		} finally {
			e[vt] = t, delete e.currentTarget, fe(d), Xe(f);
		}
	}
}
// node_modules/svelte/src/internal/client/dom/reconciler.js
var At = globalThis?.window?.trustedTypes && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", { createHTML: (e) => e });
function jt(e) {
	return At?.createHTML(e) ?? e;
}
function Mt(e) {
	var t = f("template");
	return t.innerHTML = jt(e.replaceAll("<!>", "<!---->")), t.content;
}
// node_modules/svelte/src/internal/client/dom/template.js
function Nt(e, t) {
	var n = U;
	n.nodes === null && (n.nodes = {
		start: e,
		end: t,
		a: null,
		t: null
	});
}
/*#__NO_SIDE_EFFECTS__*/
function Pt(e, t) {
	var n = !!(t & 1), r = !!(t & 2), i, a = !e.startsWith("<!>");
	return () => {
		if (R) return Nt(I, null), I;
		i === void 0 && (i = Mt(a ? e : "<!>" + e), n || (i = /* @__PURE__ */ A(i)));
		var t = r || L ? document.importNode(i, !0) : i.cloneNode(!0);
		if (n) {
			var o = /* @__PURE__ */ A(t), s = t.lastChild;
			Nt(o, s);
		} else Nt(t, t);
		return t;
	};
}
/*#__NO_SIDE_EFFECTS__*/
function Ft(e, t, n = "svg") {
	var r = !e.startsWith("<!>"), i = !!(t & 1), a = `<${n}>${r ? e : "<!>" + e}</${n}>`, o;
	return () => {
		if (R) return Nt(I, null), I;
		if (!o) {
			var e = Mt(a), t = /* @__PURE__ */ A(e);
			if (i) for (o = document.createDocumentFragment(); /* @__PURE__ */ A(t);) o.appendChild(/* @__PURE__ */ A(t));
			else o = /* @__PURE__ */ A(t);
		}
		var n = o.cloneNode(!0);
		if (i) {
			var r = /* @__PURE__ */ A(n), s = n.lastChild;
			Nt(r, s);
		} else Nt(n, n);
		return n;
	};
}
/*#__NO_SIDE_EFFECTS__*/
function It(e, t) {
	return /* @__PURE__ */ Ft(e, t, "svg");
}
function Lt(e = "") {
	if (!R) {
		var t = _(e + "");
		return Nt(t, t), t;
	}
	var n = I;
	return n.nodeType === 3 ? h(n) : (n.before(n = _()), y(n)), Nt(n, n), n;
}
function Rt() {
	if (R) return Nt(I, null), I;
	var e = document.createDocumentFragment(), t = document.createComment(""), n = _();
	return e.append(t, n), Nt(t, n), e;
}
function zt(e, t) {
	if (R) {
		var n = U;
		n.f & 32768 && n.nodes.end !== null || (n.nodes.end = I), g();
	} else e !== null && e.before(t);
}
function Bt() {
	if (R && I && I.nodeType === 8 && I.textContent?.startsWith("$")) {
		let e = I.textContent.substring(1);
		return g(), e;
	}
	return (window.__svelte ??= {}).uid ??= 1, `c${window.__svelte.uid++}`;
}
// node_modules/svelte/src/internal/client/dom/blocks/boundary.js
var Vt = Fe | Ve;
function Ht(e, t, n, r) {
	new Ut(e, t, n, r);
}
var Ut = class {
	parent;
	is_pending = !1;
	transform_error;
	#e;
	#t = R ? I : null;
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
	#m = we(() => (this.#p = ee(this.#l), () => {
		this.#p = null;
	}));
	constructor(e, t, n, r) {
		this.#e = e, this.#n = t, this.#r = (e) => {
			var t = U;
			t.b = this, t.f |= 128, n(e);
		}, this.parent = U.b, this.transform_error = r ?? this.parent?.transform_error ?? ((e) => e), this.#i = xe(() => {
			if (R) {
				let e = x(this.#t);
				g();
				let t = e === "[!";
				if (e.startsWith("[?")) {
					let t = JSON.parse(e.slice(2));
					this.#g(t);
				} else t ? this.#y() : this.#h();
			} else this.#b();
		}, Vt), R && (this.#e = I);
	}
	#h() {
		try {
			this.#a = W(() => this.#r(this.#e));
		} catch (e) {
			this.error(e);
		}
	}
	#g(e) {
		let t = this.#n.failed, { reset: n, invoke_onerror: r } = this.#_(e);
		Ce(r), t && (this.#s = W(() => {
			t(this.#e, () => e, () => n);
		}));
	}
	#_(e) {
		var t = !1, n = !1;
		let r = () => {
			this.#v() || (t ? Je() : (t = !0, n && ot(), this.#s !== null && $e(this.#s, () => {
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
					De(e, this.#i && this.#i.parent);
				}
			}
		};
	}
	#v() {
		return (this.#i.f & (Ze | pe)) !== 0;
	}
	#y() {
		let e = this.#n.pending;
		e && (this.is_pending = !0, this.#o = W(() => e(this.#e)), Ce(() => {
			if (!this.#v()) {
				var e = this.#c = document.createDocumentFragment(), t = _(), n = !1;
				e.append(t), this.#a = this.#S(() => {
					try {
						return W(() => this.#r(t));
					} catch (e) {
						try {
							this.error(e), n = !0;
						} catch (e) {
							De(e, this.#i.parent);
						}
						return null;
					}
				}), this.#a === null ? (this.#c = null, n && this.#x(G)) : this.#u === 0 && (this.#e.before(e), this.#c = null, $e(this.#o, () => {
					this.#o = null;
				}), this.#x(G));
			}
		}));
	}
	#b() {
		try {
			if (this.is_pending = this.has_pending_snippet(), this.#u = 0, this.#l = 0, this.#a = W(() => {
				this.#r(this.#e);
			}), this.#u > 0) {
				var e = this.#c = document.createDocumentFragment();
				i(this.#a, e);
				let t = this.#n.pending;
				this.#o = W(() => t(this.#e));
			} else this.#x(G);
		} catch (e) {
			this.error(e);
		}
	}
	#x(e) {
		this.is_pending = !1, e.transfer_reactions(this.#f);
	}
	defer_effect(e) {
		Ie(e, this.#f);
	}
	is_rendered() {
		return !this.is_pending && (!this.parent || this.parent.is_rendered());
	}
	has_pending_snippet() {
		return !!this.#n.pending;
	}
	#S(e) {
		var t = U, n = Re, r = be;
		Xe(this.#i), fe(this.#i), d(this.#i.ctx);
		try {
			return Ye.ensure(), e();
		} finally {
			Xe(t), fe(n), d(r);
		}
	}
	#C(e, t) {
		this.has_pending_snippet() ? (this.#u += e, this.#u === 0 && (this.#x(t), this.#o && $e(this.#o, () => {
			this.#o = null;
		}), this.#c &&= (this.#e.before(this.#c), null))) : this.parent && this.parent.#C(e, t);
	}
	update_pending_count(e, t) {
		this.#C(e, t), this.#l += e, !this.#p || this.#d || (this.#d = !0, Ce(() => {
			this.#d = !1, this.#p && V(this.#p, this.#l);
		}));
	}
	get_effect_pending() {
		return this.#m(), le(this.#p);
	}
	error(e) {
		if (e === Te || !this.#n.onerror && !this.#n.failed) throw e;
		G?.is_fork ? (this.#a && G.skip_effect(this.#a), this.#o && G.skip_effect(this.#o), this.#s && G.skip_effect(this.#s), G.oncommit(() => {
			this.#v() || this.#w(e);
		})) : this.#w(e);
	}
	#w(e) {
		this.#a &&= (q(this.#a), null), this.#o &&= (q(this.#o), null), this.#s &&= (q(this.#s), null), R && (y(this.#t), m(), y(B()));
		let t = this.#n.failed, n = (e) => {
			if (this.#v()) return;
			let { reset: n, invoke_onerror: r } = this.#_(e);
			r(), t && !this.#v() && (this.#s = this.#S(() => {
				try {
					return W(() => {
						var r = U;
						r.b = this, r.f |= 128, t(this.#e, () => e, () => n);
					});
				} catch (e) {
					return De(e, this.#i.parent), null;
				}
			}));
		};
		Ce(() => {
			if (!this.#v()) {
				var t;
				try {
					t = this.transform_error(e);
				} catch (e) {
					De(e, this.#i && this.#i.parent);
					return;
				}
				typeof t == "object" && t && typeof t.then == "function" ? t.then(n, (e) => De(e, this.#i && this.#i.parent)) : n(t);
			}
		});
	}
};
function Wt(e, t) {
	var n = t == null ? "" : typeof t == "object" ? `${t}` : t;
	n !== (e[P] ??= e.nodeValue) && (e[P] = n, e.nodeValue = `${n}`);
}
function Gt(e, t) {
	return qt(e, t);
}
var Kt = /* @__PURE__ */ new Map();
function qt(e, { target: t, anchor: r, props: i = {}, events: a, context: s, intro: c = !0, transformError: l }) {
	n();
	var d = void 0, f = ie(() => {
		var n = r ?? t.appendChild(_());
		Ht(n, { pending: () => {} }, (t) => {
			tt({});
			var n = be;
			if (s && (n.c = s), a && (i.$$events = a), R && Nt(t, null), d = e(t, i) || M(), R && (U.nodes.end = I, I === null || I.nodeType !== 8 || I.data !== "]")) throw k(), Te;
			o();
		}, l);
		var c = /* @__PURE__ */ new Set(), f = (e) => {
			for (var n = 0; n < e.length; n++) {
				var r = e[n];
				if (!c.has(r)) {
					c.add(r);
					var i = ht(r);
					for (let e of [t, document]) {
						var a = Kt.get(e);
						a === void 0 && (a = /* @__PURE__ */ new Map(), Kt.set(e, a));
						var o = a.get(r);
						o === void 0 ? (e.addEventListener(r, kt, { passive: i }), a.set(r, 1)) : a.set(r, o + 1);
					}
				}
			}
		};
		return f(u(yt)), bt.add(f), () => {
			for (var e of c) for (let n of [t, document]) {
				var i = Kt.get(n), a = i.get(e);
				--a == 0 ? (n.removeEventListener(e, kt), i.delete(e), i.size === 0 && Kt.delete(n)) : i.set(e, a);
			}
			bt.delete(f), n !== r && n.parentNode?.removeChild(n);
		};
	});
	return Jt.set(d, f), d;
}
var Jt = /* @__PURE__ */ new WeakMap();
function Yt(e, t) {
	let n = Jt.get(e);
	return n ? (Jt.delete(e), n(t)) : Promise.resolve();
}
// node_modules/svelte/src/internal/client/dom/blocks/branches.js
var Xt = class {
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
				r && (q(r.effect), this.#n.delete(n));
			}
			for (let [e, r] of this.#t) {
				if (e === t || this.#r.has(e)) continue;
				let a = () => {
					if (Array.from(this.#e.values()).includes(e)) {
						var t = document.createDocumentFragment();
						i(r, t), t.append(_()), this.#n.set(e, {
							effect: r,
							fragment: t
						});
					} else q(r);
					this.#r.delete(e), this.#t.delete(e);
				};
				this.#i || !n ? (this.#r.add(e), $e(r, a, !1)) : a();
			}
		}
	};
	#o = (e) => {
		this.#e.delete(e);
		let t = Array.from(this.#e.values());
		for (let [e, n] of this.#n) t.includes(e) || (q(n.effect), this.#n.delete(e));
	};
	ensure(e, t) {
		var n = G, r = ne();
		if (t && !this.#t.has(e) && !this.#n.has(e)) {
			if (r) {
				var i = document.createDocumentFragment(), a = _();
				i.append(a), this.#n.set(e, {
					effect: W(() => t(a)),
					fragment: i
				});
			} else this.#t.set(e, W(() => t(this.anchor)));
		}
		if (this.#e.set(n, e), r) {
			for (let [t, r] of this.#t) t === e ? n.unskip_effect(r) : n.skip_effect(r);
			for (let [t, r] of this.#n) t === e ? n.unskip_effect(r.effect) : n.skip_effect(r.effect);
			n.oncommit(this.#a), n.ondiscard(this.#o);
		} else R && (this.anchor = I), this.#a(n);
	}
};
// node_modules/svelte/src/internal/client/dom/blocks/if.js
function Zt(e, t, n = !1) {
	var r;
	R && (r = I, g());
	var i = new Xt(e), a = n ? Fe : 0;
	function o(e, t) {
		if (R) {
			var n = x(r);
			if (e !== parseInt(n.substring(1))) {
				var a = B();
				y(a), i.anchor = a, H(!1), i.ensure(e, t), H(!0);
				return;
			}
		}
		i.ensure(e, t);
	}
	xe(() => {
		var e = !1;
		t((t, n = 0) => {
			e = !0, o(n, t);
		}), e || o(-1, null);
	}, a);
}
// node_modules/svelte/src/internal/client/dom/blocks/key.js
var Qt = Symbol("NaN");
function $t(e, t, n) {
	R && g();
	var r = new Xt(e), i = !rt();
	xe(() => {
		var e = t();
		e !== e && (e = Qt), i && typeof e == "object" && e && (e = {}), r.ensure(e, n);
	});
}
// node_modules/svelte/src/internal/client/dom/blocks/each.js
function en(e, t) {
	return t;
}
function tn(e, t, n) {
	for (var r = [], i = t.length, a, o = t.length, s = 0; s < i; s++) {
		let n = t[s];
		$e(n, () => {
			if (a) {
				if (a.pending.delete(n), a.done.add(n), a.pending.size === 0) {
					var t = e.outrogroups;
					nn(e, u(a.done)), t.delete(a), t.size === 0 && (e.outrogroups = null);
				}
			} else --o;
		}, !1);
	}
	if (o === 0) {
		var c = r.length === 0 && n !== null && e.pending.size === 0;
		if (c) {
			var l = n, d = l.parentNode;
			D(d), d.append(l), e.items.clear();
		}
		nn(e, t, !c);
	} else a = {
		pending: new Set(t),
		done: /* @__PURE__ */ new Set()
	}, (e.outrogroups ??= /* @__PURE__ */ new Set()).add(a);
}
function nn(e, t, n = !0) {
	var r;
	if (e.pending.size > 0) {
		r = /* @__PURE__ */ new Set();
		for (let t of e.pending.values()) for (let n of t) r.add(e.items.get(n).e);
	}
	for (var a = 0; a < t.length; a++) {
		var o = t[a];
		if (r?.has(o)) {
			o.f |= _e;
			let e = document.createDocumentFragment();
			i(o, e);
		} else q(t[a], n);
	}
}
var rn;
function an(e, t, n, r, i, a = null) {
	var o = e, s = /* @__PURE__ */ new Map();
	if (t & 4) {
		var c = e;
		o = R ? y(/* @__PURE__ */ A(c)) : c.appendChild(_());
	}
	R && g();
	var d = null, f = /* @__PURE__ */ K(() => {
		var e = n();
		return S(e) ? e : e == null ? [] : u(e);
	}), p = /* @__PURE__ */ new Map(), m = !0;
	function h(e) {
		if (!(b.effect.f & 16384)) {
			b.pending.delete(e);
			var n = le(f);
			b.fallback = d, sn(b, n, o, t, r), d !== null && (n.length === 0 ? d.f & 33554432 ? (d.f ^= _e, ln(d, null, o)) : l(d) : $e(d, () => {
				d = null;
			}));
		}
	}
	function v(e) {
		b.pending.delete(e);
	}
	var b = {
		effect: xe(() => {
			var e = le(f), c = e.length;
			let l = !1;
			R && x(o) === "[!" != (c === 0) && (o = B(), y(o), H(!1), l = !0);
			for (var u = /* @__PURE__ */ new Set(), g = G, b = ne(), S = 0; S < c; S += 1) {
				R && I.nodeType === 8 && I.data === "]" && (o = I, l = !0, H(!1));
				var w = e[S], T = r(w, S), E = m ? null : s.get(T);
				E ? (E.v && V(E.v, w), E.i && V(E.i, S), b && g.unskip_effect(E.e)) : (E = cn(s, m ? o : rn ??= _(), w, T, S, i, t, n), m || (E.e.f |= _e), s.set(T, E)), u.add(T);
			}
			if (c === 0 && a && !d && (m ? d = W(() => a(o)) : (d = W(() => a(rn ??= _())), d.f |= _e)), c > u.size && C("", "", ""), R && c > 0 && y(B()), !m) {
				if (p.set(g, u), b) {
					for (let [e, t] of s) u.has(e) || g.skip_effect(t.e);
					g.oncommit(h), g.ondiscard(v);
				} else h(g);
			}
			l && H(!0), le(f);
		}),
		flags: t,
		items: s,
		pending: p,
		outrogroups: null,
		fallback: d
	};
	m = !1, R && (o = I);
}
function on(e) {
	for (; e !== null && !(e.f & 32);) e = e.next;
	return e;
}
function sn(e, t, n, r, i) {
	var a = !!(r & 8), o = t.length, s = e.items, c = on(e.effect.first), d, f = null, p, m = [], h = [], g, _, v, y;
	if (a) for (y = 0; y < o; y += 1) g = t[y], _ = i(g, y), v = s.get(_).e, v.f & 33554432 || (v.nodes?.a?.measure(), (p ??= /* @__PURE__ */ new Set()).add(v));
	for (y = 0; y < o; y += 1) {
		if (g = t[y], _ = i(g, y), v = s.get(_).e, e.outrogroups !== null) for (let t of e.outrogroups) t.pending.delete(v), t.done.delete(v);
		if (v.f & 8192 && (l(v), a && (v.nodes?.a?.unfix(), (p ??= /* @__PURE__ */ new Set()).delete(v))), v.f & 33554432) {
			if (v.f ^= _e, v === c) ln(v, null, n);
			else {
				var b = f ? f.next : c;
				v === e.effect.last && (e.effect.last = v.prev), v.prev && (v.prev.next = v.next), v.next && (v.next.prev = v.prev), un(e, f, v), un(e, v, b), ln(v, b, n), f = v, m = [], h = [], c = on(f.next);
				continue;
			}
		}
		if (v !== c) {
			if (d !== void 0 && d.has(v)) {
				if (m.length < h.length) {
					var x = h[0], S;
					f = x.prev;
					var C = m[0], w = m[m.length - 1];
					for (S = 0; S < m.length; S += 1) ln(m[S], x, n);
					for (S = 0; S < h.length; S += 1) d.delete(h[S]);
					un(e, C.prev, w.next), un(e, f, C), un(e, w, x), c = x, f = w, --y, m = [], h = [];
				} else d.delete(v), ln(v, c, n), un(e, v.prev, v.next), un(e, v, f === null ? e.effect.first : f.next), un(e, f, v), f = v;
				continue;
			}
			for (m = [], h = []; c !== null && c !== v;) (d ??= /* @__PURE__ */ new Set()).add(c), h.push(c), c = on(c.next);
			if (c === null) continue;
		}
		v.f & 33554432 || m.push(v), f = v, c = on(v.next);
	}
	if (e.outrogroups !== null) {
		for (let t of e.outrogroups) t.pending.size === 0 && (nn(e, u(t.done)), e.outrogroups?.delete(t));
		e.outrogroups.size === 0 && (e.outrogroups = null);
	}
	if (c !== null || d !== void 0) {
		var T = [];
		if (d !== void 0) for (v of d) v.f & 8192 || T.push(v);
		for (; c !== null;) !(c.f & 8192) && c !== e.fallback && T.push(c), c = on(c.next);
		var E = T.length;
		if (E > 0) {
			var D = r & 4 && o === 0 ? n : null;
			if (a) {
				for (y = 0; y < E; y += 1) T[y].nodes?.a?.measure();
				for (y = 0; y < E; y += 1) T[y].nodes?.a?.fix();
			}
			tn(e, T, D);
		}
	}
	a && Ce(() => {
		if (p !== void 0) for (v of p) v.nodes?.a?.apply();
	});
}
function cn(e, t, n, r, i, a, o, s) {
	var c = o & 1 ? o & 16 ? ee(n) : /* @__PURE__ */ z(n, !1, !1) : null, l = o & 2 ? ee(i) : null;
	return {
		v: c,
		i: l,
		e: W(() => (a(t, c ?? n, l ?? i, s), () => {
			e.delete(r);
		}))
	};
}
function ln(e, t, n) {
	if (e.nodes) for (var r = e.nodes.start, i = e.nodes.end, a = t && !(t.f & 33554432) ? t.nodes.start : n; r !== null;) {
		var o = /* @__PURE__ */ at(r);
		if (a.before(r), r === i) return;
		r = o;
	}
}
function un(e, t, n) {
	t === null ? e.effect.first = n : t.next = n, n === null ? e.effect.last = t : n.prev = t;
}
// node_modules/svelte/src/internal/client/dom/blocks/snippet.js
function dn(e, t, ...n) {
	var r = new Xt(e);
	xe(() => {
		let e = t() ?? null;
		r.ensure(e, e && ((t) => e(t, ...n)));
	}, Fe);
}
// node_modules/svelte/src/internal/client/dom/blocks/svelte-component.js
function fn(e, t, n) {
	var r;
	R && (r = I, g());
	var i = new Xt(e);
	xe(() => {
		var e = t() ?? null;
		if (R && x(r) === "[" != (e !== null)) {
			var a = B();
			y(a), i.anchor = a, H(!1), i.ensure(e, e && ((t) => n(t, e))), H(!0);
		} else i.ensure(e, e && ((t) => n(t, e)));
	}, Fe);
}
// node_modules/svelte/src/internal/client/dom/blocks/svelte-element.js
function pn(e, t, n, r, i, a) {
	let o = R;
	R && g();
	var c = null;
	R && I.nodeType === 1 && (c = I, g());
	var l = R ? I : e, u = new Xt(l, !1);
	xe(() => {
		let e = t() || null;
		var a = i ? i() : n || e === "svg" ? ze : void 0;
		if (e === null) u.ensure(null, null);
		else return u.ensure(e, (t) => {
			if (e) {
				var n = R;
				if (c = R ? c : f(e, a), Nt(c, c), r) {
					var i = null;
					R && _t(e) && c.append(i = document.createComment(""));
					var o = R ? /* @__PURE__ */ A(c) : c.appendChild(_());
					R && (o === null ? H(!1) : y(o)), r(c, o), i?.remove();
				}
				U.nodes.end = c, n || t.before(c);
			}
			R && y(t);
		}), () => {};
	}, Fe), s(() => {}), o && (H(!0), y(l));
}
// node_modules/svelte/src/internal/client/dom/blocks/svelte-head.js
function mn(e, t) {
	let n = null, r = R;
	var i;
	if (R) {
		n = I;
		for (var a = /* @__PURE__ */ A(document.head); a !== null && (a.nodeType !== 8 || a.data !== e);) a = /* @__PURE__ */ at(a);
		if (a === null) H(!1);
		else {
			var o = /* @__PURE__ */ at(a);
			a.remove(), y(o);
		}
	}
	R || (i = document.head.appendChild(_()));
	try {
		xe(() => {
			var e = W(() => t(i));
			e.f |= ye, R || (e.nodes === null ? e.nodes = {
				start: i,
				end: i,
				a: null,
				t: null
			} : e.nodes.end = i);
		});
	} finally {
		r && (H(!0), y(n));
	}
}
// node_modules/svelte/src/internal/client/dom/elements/actions.js
function hn(e, t, n) {
	se(() => {
		var r = Be(() => t(e, n?.()) || {});
		if (n && r?.update) {
			var i = !1, a = {};
			N(() => {
				var e = n();
				Ge(e), i && te(a, e) && (a = e, r.update(e));
			}), i = !0;
		}
		if (r?.destroy) return () => r.destroy();
	});
}
// node_modules/svelte/src/internal/client/dom/elements/attachments.js
function gn(e, t) {
	var n = void 0, r;
	j(() => {
		n !== (n = t()) && (r &&= (q(r), null), n && (r = W(() => {
			se(() => n(e));
		})));
	});
}
// node_modules/clsx/dist/clsx.mjs
function _n(e) {
	var t, n, r = "";
	if (typeof e == "string" || typeof e == "number") r += e;
	else if (typeof e == "object") {
		if (Array.isArray(e)) {
			var i = e.length;
			for (t = 0; t < i; t++) e[t] && (n = _n(e[t])) && (r && (r += " "), r += n);
		} else for (n in e) e[n] && (r && (r += " "), r += n);
	}
	return r;
}
function vn() {
	for (var e, t, n = 0, r = "", i = arguments.length; n < i; n++) (e = arguments[n]) && (t = _n(e)) && (r && (r += " "), r += t);
	return r;
}
// node_modules/svelte/src/internal/shared/attributes.js
function yn(e) {
	return typeof e == "object" ? vn(e) : e ?? "";
}
var bn = [..." 	\n\r\f\xA0\v﻿"];
function xn(e, t, n) {
	var r = e == null ? "" : "" + e;
	if (t && (r = r ? r + " " + t : t), n) {
		for (var i of Object.keys(n)) if (n[i]) r = r ? r + " " + i : i;
		else if (r.length) for (var a = i.length, o = 0; (o = r.indexOf(i, o)) >= 0;) {
			var s = o + a;
			(o === 0 || bn.includes(r[o - 1])) && (s === r.length || bn.includes(r[s])) ? r = (o === 0 ? "" : r.substring(0, o)) + r.substring(s + 1) : o = s;
		}
	}
	return r === "" ? null : r;
}
function Sn(e, t = !1) {
	var n = t ? " !important;" : ";", r = "";
	for (var i of Object.keys(e)) {
		var a = e[i];
		a != null && a !== "" && (r += " " + i + ": " + a + n);
	}
	return r;
}
function Cn(e) {
	return e[0] !== "-" || e[1] !== "-" ? e.toLowerCase() : e;
}
function wn(e, t) {
	if (t) {
		var n = "", r, i;
		if (Array.isArray(t) ? (r = t[0], i = t[1]) : r = t, e) {
			e = String(e).replaceAll(/\/\*.*?\*\//g, "").trim();
			var a = !1, o = 0, s = !1, c = [];
			r && c.push(...Object.keys(r).map(Cn)), i && c.push(...Object.keys(i).map(Cn));
			var l = 0, u = -1;
			let t = e.length;
			for (var d = 0; d < t; d++) {
				var f = e[d];
				if (s ? f === "/" && e[d - 1] === "*" && (s = !1) : a ? a === f && (a = !1) : f === "/" && e[d + 1] === "*" ? s = !0 : f === "\"" || f === "'" ? a = f : f === "(" ? o++ : f === ")" && o--, !s && a === !1 && o === 0) {
					if (f === ":" && u === -1) u = d;
					else if (f === ";" || d === t - 1) {
						if (u !== -1) {
							var p = Cn(e.substring(l, u).trim());
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
		return r && (n += Sn(r)), i && (n += Sn(i, !0)), n = n.trim(), n === "" ? null : n;
	}
	return e == null ? null : String(e);
}
// node_modules/svelte/src/internal/client/dom/elements/class.js
function Tn(e, t, n, r, i, a) {
	var o = e[Ne];
	if (R || o !== n || o === void 0) {
		var s = xn(n, r, a);
		R && s === e.getAttribute("class") || (s == null ? e.removeAttribute("class") : t ? e.className = s : e.setAttribute("class", s)), e[Ne] = n;
	} else if (a && i !== a) for (var c in a) {
		var l = !!a[c];
		(i == null || l !== !!i[c]) && e.classList.toggle(c, l);
	}
	return a;
}
// node_modules/svelte/src/internal/client/dom/elements/style.js
function En(e, t = {}, n, r) {
	for (var i in n) {
		var a = n[i];
		t[i] !== a && (n[i] == null ? e.style.removeProperty(i) : e.style.setProperty(i, a, r));
	}
}
function Dn(e, t, n, r) {
	var i = e[et];
	if (R || i !== t) {
		var a = wn(t, r);
		R && a === e.getAttribute("style") || (a == null ? e.removeAttribute("style") : e.style.cssText = a), e[et] = t;
	} else r && (Array.isArray(r) ? (En(e, n?.[0], r[0]), En(e, n?.[1], r[1], "important")) : En(e, n, r));
	return r;
}
// node_modules/svelte/src/internal/client/dom/elements/bindings/select.js
function On(e, t) {
	t ? e.hasAttribute("selected") || e.setAttribute("selected", "") : e.removeAttribute("selected");
}
function kn(e, t) {
	var n = !("__defaultValue" in e);
	(n || e.__defaultValue !== t) && (e.__defaultValue = t, An(e, !n || "__value" in e));
}
function An(e, t) {
	var n = e.__defaultValue, r = e.multiple, i = r ? n ?? [] : null;
	if (!r || S(i)) {
		var a = e.selectedIndex, o = t && r ? new Set(e.selectedOptions) : null;
		for (var s of e.options) {
			var c = Nn(s);
			On(s, r ? i.includes(c) : b(c, n));
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
function jn(e, t, n = !1) {
	if (e.multiple) {
		if (t == null) return;
		if (!S(t)) return he();
		for (var r of e.options) r.selected = t.includes(Nn(r));
	} else {
		for (r of e.options) {
			var i = Nn(r);
			if (b(i, t)) {
				r.selected = !0;
				return;
			}
		}
		n && t === void 0 || (e.selectedIndex = -1);
	}
}
function Mn(e) {
	var t = new MutationObserver((t) => {
		t.every(Pn) || ("__defaultValue" in e && An(e, !1), "__value" in e && jn(e, e.__value));
	});
	t.observe(e, {
		childList: !0,
		subtree: !0,
		attributes: !0,
		attributeFilter: ["value"]
	}), s(() => {
		t.disconnect();
	});
}
function Nn(e) {
	return "__value" in e ? e.__value : e.value;
}
function Pn(e) {
	if (e.target.closest("selectedcontent") !== null) return !0;
	if (e.type === "childList") {
		var t = [...e.addedNodes, ...e.removedNodes];
		return t.length > 0 && t.every((e) => e.nodeName === "SELECTEDCONTENT");
	}
	return !1;
}
// node_modules/svelte/src/internal/client/dom/elements/attributes.js
var Fn = Symbol("class"), In = Symbol("style"), Ln = Symbol("is custom element"), Rn = Symbol("is html"), zn = it ? "link" : "LINK", Bn = it ? "input" : "INPUT", Vn = it ? "option" : "OPTION", Hn = it ? "select" : "SELECT", Un = it ? "progress" : "PROGRESS";
function Wn(e) {
	if (R) {
		var t = !1, n = () => {
			if (!t) {
				if (t = !0, e.hasAttribute("value")) {
					var n = e.value;
					qn(e, "value", null), e.value = n;
				}
				if (e.hasAttribute("checked")) {
					var r = e.checked;
					qn(e, "checked", null), e.checked = r;
				}
			}
		};
		e[Se] = n, Ce(n), me();
	}
}
function Gn(e, t) {
	var n = Xn(e);
	n.value !== (n.value = t ?? void 0) && (e.value !== t || t === 0 && e.nodeName === Un) && (e.value = t ?? "");
}
function Kn(e, t) {
	var n = Xn(e);
	n.checked !== (n.checked = t ?? void 0) && (e.checked = t);
}
function qn(e, t, n, r) {
	var i = Xn(e);
	if (!(R && (i[t] = e.getAttribute(t), t === "src" || t === "srcset" || t === "href" && e.nodeName === zn))) {
		var a = i[t];
		a !== (i[t] = n) && (t === "loading" && (e[nt] = n), n == null ? e.removeAttribute(t) : typeof n != "string" && Qn(e).has(t) ? e[t] = n : (!R || typeof n != "number" && typeof n != "boolean" || a !== String(n)) && e.setAttribute(t, n));
	}
}
function Jn(e, t, n, r, i = !1, a = !1) {
	R && i && e.nodeName === Bn && ("defaultValue" in n || "defaultChecked" in n || Wn(e));
	var o = Xn(e), s = o[Ln], c = !o[Rn];
	let l = R && s;
	l && H(!1);
	var u = t || {}, d = e.nodeName === Vn, f = e.nodeName === Hn;
	try {
		for (var p in t) !(p in n) && p[0] + p[1] !== "$$" && (n[p] = null);
		n.class ? n.class = yn(n.class) : (r || n[Fn]) && (n.class = null), n[In] && (n.style ??= null);
		var m = Qn(e);
		if (e.nodeName === Bn && "type" in n && ("value" in n || "__value" in n)) {
			var h = n.type;
			(h !== u.type || h === void 0 && e.hasAttribute("type")) && (u.type = h, qn(e, "type", h, a));
		}
		for (let i in n) {
			let l = n[i];
			if (d && i === "value" && l == null) e.value = e.__value = "", u[i] = l;
			else if (i === "class") Tn(e, e.namespaceURI === "http://www.w3.org/1999/xhtml", l, r, t?.[Fn], n[Fn]), u[i] = l, u[Fn] = n[Fn];
			else if (i === "style") Dn(e, l, t?.[In], n[In]), u[i] = l, u[In] = n[In];
			else {
				var g = u[i];
				if (l !== g || l === void 0 && e.hasAttribute(i)) {
					u[i] = l;
					var _ = i[0] + i[1];
					if (_ !== "$$") {
						if (_ === "on") {
							let t = {}, n = "$$" + i, r = i.slice(2);
							var v = ut(r);
							if (ct(r) && (r = r.slice(0, -7), t.capture = !0), !v && g) {
								if (l != null) continue;
								e.removeEventListener(r, u[n], t), u[n] = null;
							}
							if (v) Tt(r, e, l), Et([r]);
							else if (l != null) {
								function a(e) {
									u[i].call(this, e);
								}
								u[n] = St(r, e, a, t);
							}
						} else if (i === "style") qn(e, i, l);
						else if (i === "autofocus") ve(e, !!l);
						else if (!s && (i === "__value" || i === "value" && l != null)) e.__value = l, (g == null || e.value !== l || l === 0 && e.nodeName === Un) && (e.value = l);
						else if (i === "selected" && d) On(e, l);
						else {
							var y = i;
							c || (y = pt(y));
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
							} else b || (s || typeof l != "string") && m.has(y) ? (e[y] = l, y in o && (o[y] = Ke)) : typeof l != "function" && qn(e, y, l, a);
						}
					}
				}
			}
		}
	} finally {
		l && H(!0);
	}
	return u;
}
function Yn(e, t, n = [], r = [], i = [], a, o = !1, s = !1) {
	de(i, n, r, (n) => {
		var r = void 0, i = {}, c = e.nodeName === Hn, l = !1;
		if (j(() => {
			var u = t(...n.map(le)), d = Jn(e, r, u, a, o, s);
			if (l && c) {
				var f = e;
				"defaultValue" in u && kn(f, u.defaultValue), "value" in u && jn(f, u.value);
			}
			for (let e of Object.getOwnPropertySymbols(i)) u[e] || q(i[e]);
			for (let t of Object.getOwnPropertySymbols(u)) {
				var p = u[t];
				t.description !== "@attach" || r && p === r[t] || (i[t] && q(i[t]), i[t] = W(() => gn(e, () => p))), d[t] = p;
			}
			r = d;
		}), c) {
			var u = e;
			se(() => {
				var e = r;
				"defaultValue" in e && kn(u, e.defaultValue), jn(u, e.value, !0), Mn(u);
			});
		}
		l = !0;
	});
}
function Xn(e) {
	return e[ue] ??= {
		[Ln]: e.nodeName.includes("-"),
		[Rn]: e.namespaceURI === ae
	};
}
var Zn = /* @__PURE__ */ new Map();
function Qn(t) {
	var n = t.getAttribute("is") || t.nodeName, r = Zn.get(n);
	if (r) return r;
	Zn.set(n, r = /* @__PURE__ */ new Set());
	for (var i, a = t, o = Element.prototype; o !== a;) {
		for (var s in i = e(a), i) i[s].set && s !== "innerHTML" && s !== "textContent" && s !== "innerText" && r.add(s);
		a = Oe(a);
	}
	return r;
}
// node_modules/svelte/src/internal/client/dom/elements/bindings/input.js
function $n(e, t, n = t) {
	var r = /* @__PURE__ */ new WeakSet();
	Pe(e, "input", async (i) => {
		var a = i ? e.defaultValue : e.value;
		if (a = ir(e) ? ar(a) : a, n(a), G !== null && r.add(G), await ge(), a !== (a = t())) {
			var o = e.selectionStart, s = e.selectionEnd, c = e.value.length;
			if (e.value = a ?? "", s !== null) {
				var l = e.value.length;
				o === s && s === c && l > c ? (e.selectionStart = l, e.selectionEnd = l) : (e.selectionStart = o, e.selectionEnd = Math.min(s, l));
			}
		}
	}), (R && e.defaultValue !== e.value || Be(t) == null && e.value) && (n(ir(e) ? ar(e.value) : e.value), G !== null && r.add(G)), N(() => {
		var n = t();
		if (e === document.activeElement) {
			var i = je ? Ee : G;
			if (r.has(i)) return;
		}
		ir(e) && n === ar(e.value) || (e.type !== "date" || n || e.value) && n !== e.value && (e.value = n ?? "");
	});
}
var er = /* @__PURE__ */ new Set();
function tr(e, t, n, r, i = r) {
	var a = n.getAttribute("type") === "checkbox", o = e;
	let c = !1;
	if (t !== null) for (var l of t) o = o[l] ??= [];
	o.push(n), Pe(n, "change", () => {
		var e = n.__value;
		a && (e = rr(o, e, n.checked)), i(e);
	}, () => i(a ? [] : null)), N(() => {
		var e = r();
		R && n.defaultChecked !== n.checked ? c = !0 : a ? (e ||= [], n.checked = e.includes(n.__value)) : n.checked = b(n.__value, e);
	}), s(() => {
		var e = o.indexOf(n);
		e !== -1 && o.splice(e, 1);
	}), er.has(o) || (er.add(o), Ce(() => {
		o.sort((e, t) => e.compareDocumentPosition(t) === 4 ? -1 : 1), er.delete(o);
	})), Ce(() => {
		if (c) {
			var e = a ? rr(o, e, n.checked) : o.find((e) => e.checked)?.__value;
			i(e);
		}
	});
}
function nr(e, t, n = t) {
	Pe(e, "change", (t) => {
		n(t ? e.defaultChecked : e.checked);
	}), (R && e.defaultChecked !== e.checked || Be(t) == null) && n(e.checked), N(() => {
		e.checked = !!t();
	});
}
function rr(e, t, n) {
	for (var r = /* @__PURE__ */ new Set(), i = 0; i < e.length; i += 1) e[i].checked && r.add(e[i].__value);
	return n || r.delete(t), Array.from(r);
}
function ir(e) {
	var t = e.type;
	return t === "number" || t === "range";
}
function ar(e) {
	return e === "" ? null : +e;
}
// node_modules/svelte/src/internal/client/dom/elements/bindings/this.js
function or(e, t) {
	return e === t || e?.[a] === t;
}
function sr(e = M(), t, n, r) {
	var i = be.r, a = U;
	return se(() => {
		var o, s;
		return N(() => {
			o = s, s = r?.() || [], Be(() => {
				or(n(...s), e) || (t(e, ...s), o && or(n(...o), e) && t(null, ...o));
			});
		}), () => {
			let r = a;
			for (; r !== i && r.parent !== null && r.parent.f & 33554432;) r = r.parent;
			let o = () => {
				s && or(n(...s), e) && t(null, ...s);
			}, c = r.teardown;
			r.teardown = () => {
				o(), c?.();
			};
		};
	}), e;
}
// node_modules/svelte/src/internal/client/dom/elements/bindings/universal.js
function cr(e, t, n, r, i) {
	var a = () => {
		r(n[e]);
	};
	n.addEventListener(t, a), i ? N(() => {
		n[e] = i();
	}) : a(), (n === document.body || n === window || n === document) && s(() => {
		n.removeEventListener(t, a);
	});
}
// node_modules/svelte/src/internal/client/reactivity/store.js
var lr = !1, ur = Symbol("unmounted");
function dr(e, t, n) {
	let r = n[t] ??= {
		store: null,
		source: /* @__PURE__ */ z(void 0),
		unsubscribe: O
	};
	if (r.store !== e && !(ur in n)) {
		if (r.unsubscribe(), r.store = e ?? null, e == null) r.source.v = void 0, r.unsubscribe = O;
		else {
			var i = !0;
			r.unsubscribe = We(e, (e) => {
				i ? r.source.v = e : re(r.source, e);
			}), i = !1;
		}
	}
	return e && ur in n ? qe(e) : le(r.source);
}
function fr() {
	let e = {};
	function t() {
		s(() => {
			for (var t in e) e[t].unsubscribe();
			c(e, ur, {
				enumerable: !1,
				value: !0
			});
		});
	}
	return [e, t];
}
function pr(e, t) {
	try {
		e.set(t);
	} finally {}
}
function mr(e, t, n) {
	return pr(e, n), t;
}
function hr(e) {
	var t = lr;
	try {
		return lr = !1, [e(), lr];
	} finally {
		lr = t;
	}
}
// node_modules/svelte/src/internal/client/reactivity/props.js
var gr = {
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
function _r(e, t, n) {
	return new Proxy({
		props: e,
		exclude: t
	}, gr);
}
var vr = {
	get(e, t) {
		let n = e.props.length;
		for (; n--;) {
			let r = e.props[n];
			if (T(r) && (r = r()), typeof r == "object" && r && t in r) return r[t];
		}
	},
	set(e, t, n) {
		let r = e.props.length;
		for (; r--;) {
			let i = e.props[r];
			T(i) && (i = i());
			let a = Ae(i, t);
			if (a && a.set) return a.set(n), !0;
		}
		return !1;
	},
	getOwnPropertyDescriptor(e, t) {
		let n = e.props.length;
		for (; n--;) {
			let r = e.props[n];
			if (T(r) && (r = r()), typeof r == "object" && r && t in r) {
				let e = Ae(r, t);
				return e && !e.configurable && (e.configurable = !0), e;
			}
		}
	},
	has(e, t) {
		if (t === a || t === ce) return !1;
		for (let n of e.props) if (T(n) && (n = n()), n != null && t in n) return !0;
		return !1;
	},
	ownKeys(e) {
		let t = [];
		for (let n of e.props) if (T(n) && (n = n()), n) {
			for (let e in n) t.includes(e) || t.push(e);
			for (let e of Object.getOwnPropertySymbols(n)) t.includes(e) || t.push(e);
		}
		return t;
	}
};
function yr(...e) {
	return new Proxy({ props: e }, vr);
}
function br(e, n, r, i) {
	var o = !t || !!(r & 2), s = !!(r & 8), c = !!(r & 16), l = i, u = !0, d = void 0, f = () => c && o ? (d ??= /* @__PURE__ */ oe(i), le(d)) : (u && (u = !1, l = c ? Be(i) : i), l);
	let p;
	if (s) {
		var m = a in e || ce in e;
		p = Ae(e, n)?.set ?? (m && n in e ? (t) => e[n] = t : void 0);
	}
	var h, g = !1;
	s ? [h, g] = hr(() => e[n]) : h = e[n], h === void 0 && i !== void 0 && (h = f(), p && (o && v(n), p(h)));
	var _ = o ? () => {
		var t = e[n];
		return t === void 0 ? f() : (u = !0, t);
	} : () => {
		var t = e[n];
		return t !== void 0 && (l = void 0), t === void 0 ? l : t;
	};
	if (o && !(r & 4)) return _;
	if (p) {
		var y = e.$$legacy;
		return (function(e, t) {
			return arguments.length > 0 ? ((!o || !t || y || g) && p(t ? _() : e), e) : _();
		});
	}
	var b = !1, x = (r & 1 ? oe : K)(() => (b = !1, _()));
	s && le(x);
	var S = U;
	return (function(e, t) {
		if (arguments.length > 0) {
			let n = t ? le(x) : o && s ? He(e) : e;
			return re(x, n), b = !0, l !== void 0 && (l = n), e;
		}
		return Me && b || S.f & 16384 ? x.v : le(x);
	});
}
function xr(e) {
	be === null && r("onMount"), t && be.l !== null ? Cr(be).m.push(e) : ke(() => {
		let t = Be(e);
		if (typeof t == "function") return t;
	});
}
function Sr(e) {
	be === null && r("onDestroy"), xr(() => () => Be(e));
}
function Cr(e) {
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
var wr = (e, t) => {
	let n = Array(e.length + t.length);
	for (let t = 0; t < e.length; t++) n[t] = e[t];
	for (let r = 0; r < t.length; r++) n[e.length + r] = t[r];
	return n;
}, Tr = (e, t) => ({
	classGroupId: e,
	validator: t
}), Er = (e = /* @__PURE__ */ new Map(), t = null, n) => ({
	nextPart: e,
	validators: t,
	classGroupId: n
}), Dr = "-", Or = [], kr = "arbitrary..", Ar = (e) => {
	let t = Nr(e), { conflictingClassGroups: n, conflictingClassGroupModifiers: r } = e;
	return {
		getClassGroupId: (e) => {
			if (e.startsWith("[") && e.endsWith("]")) return Mr(e);
			let n = e.split(Dr);
			return jr(n, +(n[0] === "" && n.length > 1), t);
		},
		getConflictingClassGroupIds: (e, t) => {
			if (t) {
				let t = r[e], i = n[e];
				return t ? i ? wr(i, t) : t : i || Or;
			}
			return n[e] || Or;
		}
	};
}, jr = (e, t, n) => {
	if (e.length - t === 0) return n.classGroupId;
	let r = e[t], i = n.nextPart.get(r);
	if (i) {
		let n = jr(e, t + 1, i);
		if (n) return n;
	}
	let a = n.validators;
	if (a === null) return;
	let o = t === 0 ? e.join(Dr) : e.slice(t).join(Dr), s = a.length;
	for (let e = 0; e < s; e++) {
		let t = a[e];
		if (t.validator(o)) return t.classGroupId;
	}
}, Mr = (e) => e.slice(1, -1).indexOf(":") === -1 ? void 0 : (() => {
	let t = e.slice(1, -1), n = t.indexOf(":"), r = t.slice(0, n);
	return r ? kr + r : void 0;
})(), Nr = (e) => {
	let { theme: t, classGroups: n } = e;
	return Pr(n, t);
}, Pr = (e, t) => {
	let n = Er();
	for (let r in e) {
		let i = e[r];
		Fr(i, n, r, t);
	}
	return n;
}, Fr = (e, t, n, r) => {
	let i = e.length;
	for (let a = 0; a < i; a++) {
		let i = e[a];
		Ir(i, t, n, r);
	}
}, Ir = (e, t, n, r) => {
	typeof e == "string" ? Lr(e, t, n) : typeof e == "function" ? Rr(e, t, n, r) : zr(e, t, n, r);
}, Lr = (e, t, n) => {
	let r = e === "" ? t : Br(t, e);
	r.classGroupId = n;
}, Rr = (e, t, n, r) => {
	Vr(e) ? Fr(e(r), t, n, r) : (t.validators === null && (t.validators = []), t.validators.push(Tr(n, e)));
}, zr = (e, t, n, r) => {
	let i = Object.entries(e), a = i.length;
	for (let e = 0; e < a; e++) {
		let [a, o] = i[e];
		Fr(o, Br(t, a), n, r);
	}
}, Br = (e, t) => {
	let n = e, r = t.split(Dr), i = r.length;
	for (let e = 0; e < i; e++) {
		let t = r[e], i = n.nextPart.get(t);
		i || (i = Er(), n.nextPart.set(t, i)), n = i;
	}
	return n;
}, Vr = (e) => "isThemeGetter" in e && e.isThemeGetter === !0, Hr = (e) => {
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
}, Ur = "!", Wr = ":", Gr = [], Kr = (e, t, n, r, i) => ({
	modifiers: e,
	hasImportantModifier: t,
	baseClassName: n,
	maybePostfixModifierPosition: r,
	isExternal: i
}), qr = (e) => {
	let { prefix: t, experimentalParseClassName: n } = e, r = (e) => {
		let t = [], n = 0, r = 0, i = 0, a, o = e.length;
		for (let s = 0; s < o; s++) {
			let o = e[s];
			if (n === 0 && r === 0) {
				if (o === Wr) {
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
		s.endsWith(Ur) ? (c = s.slice(0, -1), l = !0) : s.startsWith(Ur) && (c = s.slice(1), l = !0);
		let u = a && a > i ? a - i : void 0;
		return Kr(t, l, c, u);
	};
	if (t) {
		let e = t + Wr, n = r;
		r = (t) => t.startsWith(e) ? n(t.slice(e.length)) : Kr(Gr, !1, t, void 0, !0);
	}
	if (n) {
		let e = r;
		r = (t) => n({
			className: t,
			parseClassName: e
		});
	}
	return r;
}, Jr = (e) => {
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
}, Yr = (e) => ({
	cache: Hr(e.cacheSize),
	parseClassName: qr(e),
	sortModifiers: Jr(e),
	postfixLookupClassGroupIds: Xr(e),
	...Ar(e)
}), Xr = (e) => {
	let t = Object.create(null), n = e.postfixLookupClassGroups;
	if (n) for (let e = 0; e < n.length; e++) t[n[e]] = !0;
	return t;
}, Zr = /\s+/, Qr = (e, t) => {
	let { parseClassName: n, getClassGroupId: r, getConflictingClassGroupIds: i, sortModifiers: a, postfixLookupClassGroupIds: o } = t, s = [], c = e.trim().split(Zr), l = "";
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
		let _ = d.length === 0 ? "" : d.length === 1 ? d[0] : a(d).join(":"), v = f ? _ + Ur : _, y = v + g;
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
}, $r = (...e) => {
	let t = 0, n, r, i = "";
	for (; t < e.length;) (n = e[t++]) && (r = ei(n)) && (i && (i += " "), i += r);
	return i;
}, ei = (e) => {
	if (typeof e == "string") return e;
	let t, n = "";
	for (let r = 0; r < e.length; r++) e[r] && (t = ei(e[r])) && (n && (n += " "), n += t);
	return n;
}, ti = (e, ...t) => {
	let n, r, i, a, o = (o) => (n = Yr(t.reduce((e, t) => t(e), e())), r = n.cache.get, i = n.cache.set, a = s, s(o)), s = (e) => {
		let t = r(e);
		if (t) return t;
		let a = Qr(e, n);
		return i(e, a), a;
	};
	return a = o, (...e) => a($r(...e));
}, ni = [], J = (e) => {
	let t = (t) => t[e] || ni;
	return t.isThemeGetter = !0, t.themeKey = e, t;
}, ri = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, ii = /^\((?:(\w[\w-]*):)?(.+)\)$/i, ai = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/, oi = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, si = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, ci = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix|color|light-dark)\(.+\)$/, li = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, ui = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, di = (e) => ai.test(e), Y = (e) => !!e && !Number.isNaN(Number(e)), fi = (e) => !!e && Number.isInteger(Number(e)), pi = (e) => e.endsWith("%") && Y(e.slice(0, -1)), mi = (e) => oi.test(e), hi = () => !0, gi = (e) => si.test(e) && !ci.test(e), _i = () => !1, vi = (e) => li.test(e), yi = (e) => ui.test(e), bi = (e) => !X(e) && !Z(e), xi = (e) => e.startsWith("@container") && (e[10] === "/" && e[11] !== void 0 || e[11] === "s" && e[16] !== void 0 && e.startsWith("-size/", 10) || e[11] === "n" && e[18] !== void 0 && e.startsWith("-normal/", 10)), Si = (e) => Li(e, Vi, _i), X = (e) => ri.test(e), Ci = (e) => Li(e, Hi, gi), wi = (e) => Li(e, Ui, Y), Ti = (e) => Li(e, Gi, hi), Ei = (e) => Li(e, Wi, _i), Di = (e) => Li(e, zi, _i), Oi = (e) => Li(e, Bi, yi), ki = (e) => Li(e, Ki, vi), Z = (e) => ii.test(e), Ai = (e) => Ri(e, Hi), ji = (e) => Ri(e, Wi), Mi = (e) => Ri(e, zi), Ni = (e) => Ri(e, Vi), Pi = (e) => Ri(e, Bi), Fi = (e) => Ri(e, Ki, !0), Ii = (e) => Ri(e, Gi, !0), Li = (e, t, n) => {
	let r = ri.exec(e);
	return r ? r[1] ? t(r[1]) : n(r[2]) : !1;
}, Ri = (e, t, n = !1) => {
	let r = ii.exec(e);
	return r ? r[1] ? t(r[1]) : n : !1;
}, zi = (e) => e === "position" || e === "percentage", Bi = (e) => e === "image" || e === "url", Vi = (e) => e === "length" || e === "size" || e === "bg-size", Hi = (e) => e === "length", Ui = (e) => e === "number", Wi = (e) => e === "family-name", Gi = (e) => e === "number" || e === "weight", Ki = (e) => e === "shadow", qi = () => {
	let e = J("color"), t = J("font"), n = J("text"), r = J("font-weight"), i = J("tracking"), a = J("leading"), o = J("breakpoint"), s = J("container"), c = J("spacing"), l = J("radius"), u = J("shadow"), d = J("inset-shadow"), f = J("text-shadow"), p = J("drop-shadow"), m = J("blur"), h = J("perspective"), g = J("aspect"), _ = J("ease"), v = J("animate"), y = () => [
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
		Z,
		X
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
		Z,
		X,
		c
	], T = () => [
		di,
		"full",
		"auto",
		...w()
	], E = () => [
		fi,
		"none",
		"subgrid",
		Z,
		X
	], D = () => [
		"auto",
		{ span: [
			"full",
			fi,
			Z,
			X
		] },
		fi,
		Z,
		X
	], O = () => [
		fi,
		"auto",
		Z,
		X
	], ee = () => [
		"auto",
		"min",
		"max",
		"fr",
		Z,
		X
	], k = () => [
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
	], A = () => [
		"start",
		"end",
		"center",
		"stretch",
		"center-safe",
		"end-safe"
	], j = () => ["auto", ...w()], M = () => [
		di,
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
	], N = () => [
		s,
		di,
		"screen",
		"full",
		"dvw",
		"lvw",
		"svw",
		"min",
		"max",
		"fit",
		...w()
	], P = () => [
		di,
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
	], F = () => [
		e,
		Z,
		X
	], I = () => [
		...b(),
		Mi,
		Di,
		{ position: [Z, X] }
	], L = () => ["no-repeat", { repeat: [
		"",
		"x",
		"y",
		"space",
		"round"
	] }], te = () => [
		"auto",
		"cover",
		"contain",
		Ni,
		Si,
		{ size: [Z, X] }
	], ne = () => [
		pi,
		Ai,
		Ci
	], R = () => [
		"",
		"none",
		"full",
		l,
		Z,
		X
	], z = () => [
		"",
		Y,
		Ai,
		Ci
	], B = () => [
		"solid",
		"dashed",
		"dotted",
		"double"
	], V = () => [
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
	], H = () => [
		Y,
		pi,
		Mi,
		Di
	], re = () => [
		"",
		"none",
		m,
		Z,
		X
	], ie = () => [
		"none",
		Y,
		Z,
		X
	], U = () => [
		"none",
		Y,
		Z,
		X
	], ae = () => [
		Y,
		Z,
		X
	], oe = () => [
		di,
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
			blur: [mi],
			breakpoint: [mi],
			color: [hi],
			container: [mi],
			"drop-shadow": [mi],
			ease: [
				"in",
				"out",
				"in-out"
			],
			font: [bi],
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
			"inset-shadow": [mi],
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
			radius: [mi],
			shadow: [mi],
			spacing: ["px", Y],
			text: [mi],
			"text-shadow": [mi],
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
				di,
				X,
				Z,
				g
			] }],
			container: ["container"],
			"container-type": [{ "@container": [
				"",
				"normal",
				"size",
				Z,
				X
			] }],
			"container-named": [xi],
			columns: [{ columns: [
				Y,
				"auto",
				X,
				Z,
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
				fi,
				"auto",
				Z,
				X
			] }],
			basis: [{ basis: [
				di,
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
				Y,
				di,
				"auto",
				"initial",
				"none",
				X
			] }],
			grow: [{ grow: [
				"",
				Y,
				Z,
				X
			] }],
			shrink: [{ shrink: [
				"",
				Y,
				Z,
				X
			] }],
			order: [{ order: [
				fi,
				"first",
				"last",
				"none",
				Z,
				X
			] }],
			"grid-cols": [{ "grid-cols": E() }],
			"col-start-end": [{ col: D() }],
			"col-start": [{ "col-start": O() }],
			"col-end": [{ "col-end": O() }],
			"grid-rows": [{ "grid-rows": E() }],
			"row-start-end": [{ row: D() }],
			"row-start": [{ "row-start": O() }],
			"row-end": [{ "row-end": O() }],
			"grid-flow": [{ "grid-flow": [
				"row",
				"col",
				"dense",
				"row-dense",
				"col-dense"
			] }],
			"auto-cols": [{ "auto-cols": ee() }],
			"auto-rows": [{ "auto-rows": ee() }],
			gap: [{ gap: w() }],
			"gap-x": [{ "gap-x": w() }],
			"gap-y": [{ "gap-y": w() }],
			"justify-content": [{ justify: [...k(), "normal"] }],
			"justify-items": [{ "justify-items": [...A(), "normal"] }],
			"justify-self": [{ "justify-self": ["auto", ...A()] }],
			"align-content": [{ content: ["normal", ...k()] }],
			"align-items": [{ items: [...A(), { baseline: ["", "last"] }] }],
			"align-self": [{ self: [
				"auto",
				...A(),
				{ baseline: ["", "last"] }
			] }],
			"place-content": [{ "place-content": k() }],
			"place-items": [{ "place-items": [...A(), "baseline"] }],
			"place-self": [{ "place-self": ["auto", ...A()] }],
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
			m: [{ m: j() }],
			mx: [{ mx: j() }],
			my: [{ my: j() }],
			ms: [{ ms: j() }],
			me: [{ me: j() }],
			mbs: [{ mbs: j() }],
			mbe: [{ mbe: j() }],
			mt: [{ mt: j() }],
			mr: [{ mr: j() }],
			mb: [{ mb: j() }],
			ml: [{ ml: j() }],
			"space-x": [{ "space-x": w() }],
			"space-x-reverse": ["space-x-reverse"],
			"space-y": [{ "space-y": w() }],
			"space-y-reverse": ["space-y-reverse"],
			size: [{ size: M() }],
			"inline-size": [{ inline: ["auto", ...N()] }],
			"min-inline-size": [{ "min-inline": ["auto", ...N()] }],
			"max-inline-size": [{ "max-inline": ["none", ...N()] }],
			"block-size": [{ block: ["auto", ...P()] }],
			"min-block-size": [{ "min-block": ["auto", ...P()] }],
			"max-block-size": [{ "max-block": ["none", ...P()] }],
			w: [{ w: [
				s,
				"screen",
				...M()
			] }],
			"min-w": [{ "min-w": [
				s,
				"screen",
				"none",
				...M()
			] }],
			"max-w": [{ "max-w": [
				s,
				"screen",
				"none",
				"prose",
				{ screen: [o] },
				...M()
			] }],
			h: [{ h: [
				"screen",
				"lh",
				...M()
			] }],
			"min-h": [{ "min-h": [
				"screen",
				"lh",
				"none",
				...M()
			] }],
			"max-h": [{ "max-h": [
				"screen",
				"lh",
				"none",
				...M()
			] }],
			"font-size": [{ text: [
				"base",
				n,
				Ai,
				Ci
			] }],
			"font-smoothing": ["antialiased", "subpixel-antialiased"],
			"font-style": ["italic", "not-italic"],
			"font-weight": [{ font: [
				r,
				Ii,
				Ti
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
				pi,
				X
			] }],
			"font-family": [{ font: [
				ji,
				Ei,
				t
			] }],
			"font-features": [{ "font-features": [X] }],
			"fvn-normal": ["normal-nums"],
			"fvn-ordinal": ["ordinal"],
			"fvn-slashed-zero": ["slashed-zero"],
			"fvn-figure": ["lining-nums", "oldstyle-nums"],
			"fvn-spacing": ["proportional-nums", "tabular-nums"],
			"fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
			tracking: [{ tracking: [
				i,
				Z,
				X
			] }],
			"line-clamp": [{ "line-clamp": [
				Y,
				"none",
				Z,
				wi
			] }],
			leading: [{ leading: [
				"none",
				a,
				...w()
			] }],
			"list-image": [{ "list-image": [
				"none",
				Z,
				X
			] }],
			"list-style-position": [{ list: ["inside", "outside"] }],
			"list-style-type": [{ list: [
				"disc",
				"decimal",
				"none",
				Z,
				X
			] }],
			"text-alignment": [{ text: [
				"left",
				"center",
				"right",
				"justify",
				"start",
				"end"
			] }],
			"placeholder-color": [{ placeholder: F() }],
			"text-color": [{ text: F() }],
			"text-decoration": [
				"underline",
				"overline",
				"line-through",
				"no-underline"
			],
			"text-decoration-style": [{ decoration: [...B(), "wavy"] }],
			"text-decoration-thickness": [{ decoration: [
				Y,
				"from-font",
				"auto",
				Z,
				Ci
			] }],
			"text-decoration-color": [{ decoration: F() }],
			"underline-offset": [{ "underline-offset": [
				Y,
				"auto",
				Z,
				X
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
				fi,
				Z,
				X
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
				Z,
				X
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
				Z,
				X
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
			"bg-position": [{ bg: I() }],
			"bg-repeat": [{ bg: L() }],
			"bg-size": [{ bg: te() }],
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
						fi,
						Z,
						X
					],
					radial: [
						"",
						Z,
						X
					],
					conic: [
						"",
						fi,
						Z,
						X
					]
				},
				Pi,
				Oi
			] }],
			"bg-color": [{ bg: F() }],
			"gradient-from-pos": [{ from: ne() }],
			"gradient-via-pos": [{ via: ne() }],
			"gradient-to-pos": [{ to: ne() }],
			"gradient-from": [{ from: F() }],
			"gradient-via": [{ via: F() }],
			"gradient-to": [{ to: F() }],
			rounded: [{ rounded: R() }],
			"rounded-s": [{ "rounded-s": R() }],
			"rounded-e": [{ "rounded-e": R() }],
			"rounded-t": [{ "rounded-t": R() }],
			"rounded-r": [{ "rounded-r": R() }],
			"rounded-b": [{ "rounded-b": R() }],
			"rounded-l": [{ "rounded-l": R() }],
			"rounded-ss": [{ "rounded-ss": R() }],
			"rounded-se": [{ "rounded-se": R() }],
			"rounded-ee": [{ "rounded-ee": R() }],
			"rounded-es": [{ "rounded-es": R() }],
			"rounded-tl": [{ "rounded-tl": R() }],
			"rounded-tr": [{ "rounded-tr": R() }],
			"rounded-br": [{ "rounded-br": R() }],
			"rounded-bl": [{ "rounded-bl": R() }],
			"border-w": [{ border: z() }],
			"border-w-x": [{ "border-x": z() }],
			"border-w-y": [{ "border-y": z() }],
			"border-w-s": [{ "border-s": z() }],
			"border-w-e": [{ "border-e": z() }],
			"border-w-bs": [{ "border-bs": z() }],
			"border-w-be": [{ "border-be": z() }],
			"border-w-t": [{ "border-t": z() }],
			"border-w-r": [{ "border-r": z() }],
			"border-w-b": [{ "border-b": z() }],
			"border-w-l": [{ "border-l": z() }],
			"divide-x": [{ "divide-x": z() }],
			"divide-x-reverse": ["divide-x-reverse"],
			"divide-y": [{ "divide-y": z() }],
			"divide-y-reverse": ["divide-y-reverse"],
			"border-style": [{ border: [
				...B(),
				"hidden",
				"none"
			] }],
			"divide-style": [{ divide: [
				...B(),
				"hidden",
				"none"
			] }],
			"border-color": [{ border: F() }],
			"border-color-x": [{ "border-x": F() }],
			"border-color-y": [{ "border-y": F() }],
			"border-color-s": [{ "border-s": F() }],
			"border-color-e": [{ "border-e": F() }],
			"border-color-bs": [{ "border-bs": F() }],
			"border-color-be": [{ "border-be": F() }],
			"border-color-t": [{ "border-t": F() }],
			"border-color-r": [{ "border-r": F() }],
			"border-color-b": [{ "border-b": F() }],
			"border-color-l": [{ "border-l": F() }],
			"divide-color": [{ divide: F() }],
			"outline-style": [{ outline: [
				...B(),
				"none",
				"hidden"
			] }],
			"outline-offset": [{ "outline-offset": [
				Y,
				Z,
				X
			] }],
			"outline-w": [{ outline: [
				"",
				Y,
				Ai,
				Ci
			] }],
			"outline-color": [{ outline: F() }],
			shadow: [{ shadow: [
				"",
				"inner",
				"none",
				u,
				Fi,
				ki
			] }],
			"shadow-color": [{ shadow: F() }],
			"inset-shadow": [{ "inset-shadow": [
				"none",
				d,
				Fi,
				ki
			] }],
			"inset-shadow-color": [{ "inset-shadow": F() }],
			"ring-w": [{ ring: z() }],
			"ring-w-inset": ["ring-inset"],
			"ring-color": [{ ring: F() }],
			"ring-offset-w": [{ "ring-offset": [Y, Ci] }],
			"ring-offset-color": [{ "ring-offset": F() }],
			"inset-ring-w": [{ "inset-ring": z() }],
			"inset-ring-color": [{ "inset-ring": F() }],
			"text-shadow": [{ "text-shadow": [
				"none",
				f,
				Fi,
				ki
			] }],
			"text-shadow-color": [{ "text-shadow": F() }],
			opacity: [{ opacity: [
				Y,
				Z,
				X
			] }],
			"mix-blend": [{ "mix-blend": [
				...V(),
				"plus-darker",
				"plus-lighter"
			] }],
			"bg-blend": [{ "bg-blend": V() }],
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
			"mask-image-linear-pos": [{ "mask-linear": [Y] }],
			"mask-image-linear-from-pos": [{ "mask-linear-from": H() }],
			"mask-image-linear-to-pos": [{ "mask-linear-to": H() }],
			"mask-image-linear-from-color": [{ "mask-linear-from": F() }],
			"mask-image-linear-to-color": [{ "mask-linear-to": F() }],
			"mask-image-t-from-pos": [{ "mask-t-from": H() }],
			"mask-image-t-to-pos": [{ "mask-t-to": H() }],
			"mask-image-t-from-color": [{ "mask-t-from": F() }],
			"mask-image-t-to-color": [{ "mask-t-to": F() }],
			"mask-image-r-from-pos": [{ "mask-r-from": H() }],
			"mask-image-r-to-pos": [{ "mask-r-to": H() }],
			"mask-image-r-from-color": [{ "mask-r-from": F() }],
			"mask-image-r-to-color": [{ "mask-r-to": F() }],
			"mask-image-b-from-pos": [{ "mask-b-from": H() }],
			"mask-image-b-to-pos": [{ "mask-b-to": H() }],
			"mask-image-b-from-color": [{ "mask-b-from": F() }],
			"mask-image-b-to-color": [{ "mask-b-to": F() }],
			"mask-image-l-from-pos": [{ "mask-l-from": H() }],
			"mask-image-l-to-pos": [{ "mask-l-to": H() }],
			"mask-image-l-from-color": [{ "mask-l-from": F() }],
			"mask-image-l-to-color": [{ "mask-l-to": F() }],
			"mask-image-x-from-pos": [{ "mask-x-from": H() }],
			"mask-image-x-to-pos": [{ "mask-x-to": H() }],
			"mask-image-x-from-color": [{ "mask-x-from": F() }],
			"mask-image-x-to-color": [{ "mask-x-to": F() }],
			"mask-image-y-from-pos": [{ "mask-y-from": H() }],
			"mask-image-y-to-pos": [{ "mask-y-to": H() }],
			"mask-image-y-from-color": [{ "mask-y-from": F() }],
			"mask-image-y-to-color": [{ "mask-y-to": F() }],
			"mask-image-radial": [{ "mask-radial": [Z, X] }],
			"mask-image-radial-from-pos": [{ "mask-radial-from": H() }],
			"mask-image-radial-to-pos": [{ "mask-radial-to": H() }],
			"mask-image-radial-from-color": [{ "mask-radial-from": F() }],
			"mask-image-radial-to-color": [{ "mask-radial-to": F() }],
			"mask-image-radial-shape": [{ "mask-radial": ["circle", "ellipse"] }],
			"mask-image-radial-size": [{ "mask-radial": [{
				closest: ["side", "corner"],
				farthest: ["side", "corner"]
			}] }],
			"mask-image-radial-pos": [{ "mask-radial-at": b() }],
			"mask-image-conic-pos": [{ "mask-conic": [Y] }],
			"mask-image-conic-from-pos": [{ "mask-conic-from": H() }],
			"mask-image-conic-to-pos": [{ "mask-conic-to": H() }],
			"mask-image-conic-from-color": [{ "mask-conic-from": F() }],
			"mask-image-conic-to-color": [{ "mask-conic-to": F() }],
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
			"mask-position": [{ mask: I() }],
			"mask-repeat": [{ mask: L() }],
			"mask-size": [{ mask: te() }],
			"mask-type": [{ "mask-type": ["alpha", "luminance"] }],
			"mask-image": [{ mask: [
				"none",
				Z,
				X
			] }],
			filter: [{ filter: [
				"",
				"none",
				Z,
				X
			] }],
			blur: [{ blur: re() }],
			brightness: [{ brightness: [
				Y,
				Z,
				X
			] }],
			contrast: [{ contrast: [
				Y,
				Z,
				X
			] }],
			"drop-shadow": [{ "drop-shadow": [
				"",
				"none",
				p,
				Fi,
				ki
			] }],
			"drop-shadow-color": [{ "drop-shadow": F() }],
			grayscale: [{ grayscale: [
				"",
				Y,
				Z,
				X
			] }],
			"hue-rotate": [{ "hue-rotate": [
				Y,
				Z,
				X
			] }],
			invert: [{ invert: [
				"",
				Y,
				Z,
				X
			] }],
			saturate: [{ saturate: [
				Y,
				Z,
				X
			] }],
			sepia: [{ sepia: [
				"",
				Y,
				Z,
				X
			] }],
			"backdrop-filter": [{ "backdrop-filter": [
				"",
				"none",
				Z,
				X
			] }],
			"backdrop-blur": [{ "backdrop-blur": re() }],
			"backdrop-brightness": [{ "backdrop-brightness": [
				Y,
				Z,
				X
			] }],
			"backdrop-contrast": [{ "backdrop-contrast": [
				Y,
				Z,
				X
			] }],
			"backdrop-grayscale": [{ "backdrop-grayscale": [
				"",
				Y,
				Z,
				X
			] }],
			"backdrop-hue-rotate": [{ "backdrop-hue-rotate": [
				Y,
				Z,
				X
			] }],
			"backdrop-invert": [{ "backdrop-invert": [
				"",
				Y,
				Z,
				X
			] }],
			"backdrop-opacity": [{ "backdrop-opacity": [
				Y,
				Z,
				X
			] }],
			"backdrop-saturate": [{ "backdrop-saturate": [
				Y,
				Z,
				X
			] }],
			"backdrop-sepia": [{ "backdrop-sepia": [
				"",
				Y,
				Z,
				X
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
				Z,
				X
			] }],
			"transition-behavior": [{ transition: ["normal", "discrete"] }],
			duration: [{ duration: [
				Y,
				"initial",
				Z,
				X
			] }],
			ease: [{ ease: [
				"linear",
				"initial",
				_,
				Z,
				X
			] }],
			delay: [{ delay: [
				Y,
				Z,
				X
			] }],
			animate: [{ animate: [
				"none",
				v,
				Z,
				X
			] }],
			backface: [{ backface: ["hidden", "visible"] }],
			perspective: [{ perspective: [
				h,
				Z,
				X
			] }],
			"perspective-origin": [{ "perspective-origin": x() }],
			rotate: [{ rotate: ie() }],
			"rotate-x": [{ "rotate-x": ie() }],
			"rotate-y": [{ "rotate-y": ie() }],
			"rotate-z": [{ "rotate-z": ie() }],
			scale: [{ scale: U() }],
			"scale-x": [{ "scale-x": U() }],
			"scale-y": [{ "scale-y": U() }],
			"scale-z": [{ "scale-z": U() }],
			"scale-3d": ["scale-3d"],
			skew: [{ skew: ae() }],
			"skew-x": [{ "skew-x": ae() }],
			"skew-y": [{ "skew-y": ae() }],
			transform: [{ transform: [
				Z,
				X,
				"",
				"none",
				"gpu",
				"cpu"
			] }],
			"transform-origin": [{ origin: x() }],
			"transform-style": [{ transform: ["3d", "flat"] }],
			translate: [{ translate: oe() }],
			"translate-x": [{ "translate-x": oe() }],
			"translate-y": [{ "translate-y": oe() }],
			"translate-z": [{ "translate-z": oe() }],
			"translate-none": ["translate-none"],
			zoom: [{ zoom: [
				fi,
				Z,
				X
			] }],
			accent: [{ accent: F() }],
			appearance: [{ appearance: ["none", "auto"] }],
			"caret-color": [{ caret: F() }],
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
				Z,
				X
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
			"scrollbar-thumb-color": [{ "scrollbar-thumb": F() }],
			"scrollbar-track-color": [{ "scrollbar-track": F() }],
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
				Z,
				X
			] }],
			fill: [{ fill: ["none", ...F()] }],
			"stroke-w": [{ stroke: [
				Y,
				Ai,
				Ci,
				wi
			] }],
			stroke: [{ stroke: ["none", ...F()] }],
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
}, Ji = (e, { cacheSize: t, prefix: n, experimentalParseClassName: r, extend: i = {}, override: a = {} }) => (Yi(e, "cacheSize", t), Yi(e, "prefix", n), Yi(e, "experimentalParseClassName", r), Xi(e.theme, a.theme), Xi(e.classGroups, a.classGroups), Xi(e.conflictingClassGroups, a.conflictingClassGroups), Xi(e.conflictingClassGroupModifiers, a.conflictingClassGroupModifiers), Yi(e, "postfixLookupClassGroups", a.postfixLookupClassGroups), Yi(e, "orderSensitiveModifiers", a.orderSensitiveModifiers), Zi(e.theme, i.theme), Zi(e.classGroups, i.classGroups), Zi(e.conflictingClassGroups, i.conflictingClassGroups), Zi(e.conflictingClassGroupModifiers, i.conflictingClassGroupModifiers), Qi(e, i, "postfixLookupClassGroups"), Qi(e, i, "orderSensitiveModifiers"), e), Yi = (e, t, n) => {
	n !== void 0 && (e[t] = n);
}, Xi = (e, t) => {
	if (t) for (let n in t) Yi(e, n, t[n]);
}, Zi = (e, t) => {
	if (t) for (let n in t) Qi(e, t, n);
}, Qi = (e, t, n) => {
	let r = t[n];
	r !== void 0 && (e[n] = e[n] ? e[n].concat(r) : r);
}, $i = ((e, ...t) => typeof e == "function" ? ti(qi, e, ...t) : ti(() => Ji(qi(), e), ...t))({
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
function ea(...e) {
	return $i(vn(e));
}
// node_modules/tailwind-variants/dist/chunk-K5X3OHSH.js
var ta = Array.isArray, na = (e) => {
	if (!e && e !== 0 && e !== 0n) return "";
	if (typeof e == "string") return e;
	if (typeof e == "number") return e === e ? "" + e : "";
	if (typeof e == "bigint") return "" + e;
	let t = "";
	if (ta(e)) {
		let n = e.length;
		for (let r = 0; r < n; r++) {
			let n = e[r];
			if (!n && n !== 0 && n !== 0n) continue;
			let i = typeof n == "string" ? n : na(n);
			i && (t && (t += " "), t += i);
		}
		return t;
	}
	if (typeof e == "object") for (let n in e) e[n] && (t && (t += " "), t += n);
	return t;
}, ra = /\s+/g, ia = Array.isArray, aa = (e) => typeof e != "string" || !e ? e : e.replace(ra, " ").trim(), oa = / {2}|[\t-\r\u00a0]/, sa = (e) => {
	let t = e.length;
	return t === 0 ? !1 : e.charCodeAt(0) === 32 || e.charCodeAt(t - 1) === 32 || oa.test(e);
}, ca = (e) => sa(e) ? aa(e) : e, la = function() {
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
		let r = typeof e == "string" ? e : na(e);
		r && (t && (t += " "), t += r);
	}
	return t ? sa(t) ? aa(t) : t : "";
}, ua = (e) => e === !1 ? "false" : e === !0 ? "true" : e === 0 ? "0" : e, Q = (e) => {
	if (!e || typeof e != "object") return !0;
	for (let t in e) return !1;
	return !0;
}, da = (e, t) => {
	let n = e;
	for (let e in t) if (Object.hasOwn(t, e)) {
		let r = t[e];
		n[e] = e in n ? la(n[e], r) : r;
	}
	return e;
}, fa = (e, t) => {
	for (let n = 0; n < e.length; n++) {
		let r = e[n];
		ia(r) ? fa(r, t) : r && t.push(r);
	}
}, pa = (...e) => {
	let t = [];
	return fa(e, t), t;
}, ma = (e) => typeof e == "object" && !!e && !ia(e), ha = (e, t) => {
	let n = e, r = t, i = {};
	for (let e in n) {
		let t = n[e];
		if (e in r) {
			let n = r[e];
			i[e] = ia(t) || ia(n) ? pa(n, t) : ma(t) && ma(n) ? ha(t, n) : ma(t) && typeof n == "string" ? ha(t, { base: n }) : typeof t == "string" && ma(n) ? ha({ base: t }, n) : n + " " + t;
		} else i[e] = t;
	}
	for (let e in r) e in n || (i[e] = r[e]);
	return i;
}, ga = {
	twMerge: !0,
	twMergeConfig: {}
}, _a = 256, va = /* @__PURE__ */ Symbol("tv-cache-miss"), ya = (e) => e?.class != null && e.class !== "" || e?.className != null && e.className !== "", ba = /* @__PURE__ */ Symbol("tv-non-finite"), xa = (e, t) => {
	if (typeof t == "number" && !Number.isFinite(t)) throw ba;
	return t;
}, Sa = (e) => {
	if (e === void 0) return "";
	if (e === null) return "null";
	let t = typeof e;
	if (t === "string") return e;
	if (t === "boolean") return e ? "true" : "false";
	if (t === "number" || t === "bigint") return String(e);
	if (t === "object") try {
		return JSON.stringify(e, xa);
	} catch {
		return null;
	}
	return null;
}, Ca = 0, wa = 1, Ta = 2, Ea = 0, Da = 1, Oa = 2, ka = 3, $ = 0, Aa = 1, ja = 2, Ma = (e) => {
	let t = Object.getPrototypeOf(e);
	return t === Object.prototype || t === null;
}, Na = (e) => typeof e == "number" && !Number.isFinite(e), Pa = (e, t, n) => {
	try {
		return e.kinds[t] = ka, e.tokens[t] = JSON.stringify(n, xa), !0;
	} catch {
		return !1;
	}
}, Fa = (e, t, n) => {
	if (typeof n != "object" || !n) return e.kinds[t] = Ea, e.tokens[t] = n, !0;
	if (Array.isArray(n)) {
		for (let r = 0; r < n.length; r++) {
			let i = n[r];
			if (typeof i == "object" && i) return Pa(e, t, n);
			if (Na(i)) return !1;
		}
		return e.kinds[t] = Da, e.tokens[t] = n.slice(), !0;
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
		return e.kinds[t] = Oa, e.tokens[t] = r, !0;
	}
	return Pa(e, t, n);
}, Ia = (e, t, n) => {
	if (e === Ea) return Object.is(t, n) ? $ : Aa;
	if (typeof n != "object" || !n) return Aa;
	if (e === Da) {
		let e = t;
		if (!Array.isArray(n) || n.length !== e.length) return Aa;
		for (let t = 0; t < e.length; t++) if (!Object.is(e[t], n[t])) return Aa;
		return $;
	}
	if (e === Oa) {
		if (Array.isArray(n) || !Ma(n)) return Aa;
		let e = t, r = 0;
		for (let t in n) {
			if (r >= e.length || e[r] !== t || !Object.is(e[r + 1], n[t])) return Aa;
			r += 2;
		}
		return r === e.length ? $ : Aa;
	}
	try {
		return JSON.stringify(n, xa) === t ? $ : Aa;
	} catch {
		return ja;
	}
}, La = (e) => Array.isArray(e) ? e : void 0, Ra = (e, t, n) => {
	let r = La(n);
	e.kinds[t] = r === void 0 ? Ea : Da, e.tokens[t] = r === void 0 ? void 0 : r.slice();
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
		for (let n = 0; n < s.length; n++, a++) if (o = Ia(e[a], t[a], c[s[n]]), o !== $) return o;
		if (o = Ia(e[a], t[a], c.class), o !== $ || (a++, o = Ia(e[a], t[a], c.className), o !== $)) return o;
		a++;
	}
	for (let n = 0; n < r.length; n++) {
		let { conditionKeys: s, source: c } = r[n];
		if (a + s.length + 3 > i) return Aa;
		for (let n = 0; n < s.length; n++, a++) if (o = Ia(e[a], t[a], c[s[n]]), o !== $) return o;
		if (o = Ia(e[a], t[a], La(c.slots)), o !== $ || (a++, o = Ia(e[a], t[a], c.class), o !== $) || (a++, o = Ia(e[a], t[a], c.className), o !== $)) return o;
		a++;
	}
	return a === i ? $ : Aa;
}, Va = () => {
	let e = null;
	return (t, n) => {
		if (e !== null) {
			let r = Ba(e, t, n);
			if (r === $) return Ca;
			if (r === ja) return e = null, Ta;
		}
		let r = {
			kinds: [],
			tokens: []
		};
		return za(r, t, n) ? (e = r, wa) : (e = null, Ta);
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
}, Ka = (e, t = _a) => {
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
			let a = Sa(Wa(e[t], n, r, i));
			if (a === null) return Ha;
			if (s = Ga(s, a, o), !s) return;
		}
		if (a) for (let e = 0; e < a.length; e++) {
			let t = a[e], c = Sa(Wa(t, n, r, i));
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
			return va;
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
}, qa = (e) => (t, n) => ya(n) ? e.override(t, n.class, n.className) : t, Ja = () => ({
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
	let n = e.base != null || t.base != null ? la(e.base, t.base) : void 0, r = Q(t.variants) ? e.variants : Q(e.variants) ? t.variants : ha(t.variants, e.variants), i = Q(t.defaultVariants) ? e.defaultVariants : {
		...e.defaultVariants,
		...t.defaultVariants
	}, a = Q(e.slots), o = Q(t.slots), s;
	s = a && o ? {} : a ? e.base == null ? { ...t.slots } : da({ base: e.base }, { ...t.slots }) : o ? t.base == null ? { ...e.slots } : da({ ...e.slots }, { base: t.base }) : da({ ...e.slots }, t.slots);
	let c = Q(t.compoundVariants) ? e.compoundVariants : Q(e.compoundVariants) ? t.compoundVariants : pa(e.compoundVariants, t.compoundVariants), l = Q(t.compoundSlots) ? e.compoundSlots : Q(e.compoundSlots) ? t.compoundSlots : pa(e.compoundSlots, t.compoundSlots);
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
}, Qa = (e) => e ? ca(na(e)) : "", $a = (e) => {
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
			isEmpty: Q(a),
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
		...ga,
		...t
	}, m = f?.base ? la(f.base, r) : r, h = f?.variants && !Q(f.variants) ? ha(a, f.variants) : a, g = f?.defaultVariants && !Q(f.defaultVariants) ? {
		...f.defaultVariants,
		...c
	} : c, _ = !f?.slots || Q(f.slots), v = l ? _ && f?.base ? la(r, f.base) : typeof r == "string" || r == null ? r : la(r) : void 0, y = l ? {
		base: v,
		...u
	} : {}, b = _ ? y : da({ ...f?.slots }, Q(y) ? { base: r } : y), x = !f?.compoundVariants || Q(f.compoundVariants) ? o : pa(f?.compoundVariants, o), S = !f?.compoundSlots || Q(f.compoundSlots) ? s : pa(f?.compoundSlots, s), C = Object.keys(h);
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
}, go = (e, t) => `${ua(e[t]) || "false"}`, _o = (e, t, n, r, i) => {
	if (e.isEmpty) return "";
	let a = r?.[e.key] ?? n?.[e.key];
	if (a === null) return "";
	let o = ua(a);
	if (typeof o == "object") return "";
	let s = t?.[e.key], c = (o ?? ua(s)) || "false", l = e.values[c];
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
		let l = ua(o);
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
	let { base: n, deferredError: r } = e, i = va, a = qa(t);
	return ((e) => {
		if (r) throw r;
		if (i === va) {
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
		return e === Ca || (io(s, l), e !== Ta && (p = null, _ = null, !0));
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
			t === Ha ? n = x(e) : t === va ? (n = x(e), p.set(r, e, void 0, n)) : n = t;
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
		return e === Ca || (io(c, l), e !== Ta && (h = null, v = null, !0));
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
		if (t !== va) return t;
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
	let O = 0;
	for (let e = 0; e + 1 < b.length; e++) {
		let t = b[e + 1] - b[e];
		t > O && (O = t);
	}
	let ee = 32;
	for (; ee < 2 * (1 + O + S.length);) ee <<= 1;
	let k = new Int32Array(f.length + 1);
	for (let e = 0; e < f.length; e++) k[e + 1] = k[e] + u[f[e] + 1] - u[f[e]];
	let A = new Uint8Array(r);
	for (let e = 0; e < w.length; e++) A[w[e]] = 1;
	let j = i.length - 1, M = new Uint8Array(j), N = 0, P = !0;
	for (let e = 0; e < m.length; e++) {
		M[m[e]] = 1;
		let t = _[g[e] * 2 + 1];
		t > N && (N = t);
		let n = v.charCodeAt(_[g[e] * 2]);
		(n === 91 || n === 40) && (P = !1);
	}
	let F = 1;
	for (; F < m.length * 2;) F <<= 1;
	let I = new Int32Array(F).fill(-1);
	for (let e = 0; e < m.length; e++) {
		let t = _[g[e] * 2], n = (Uo(v, t, t + _[g[e] * 2 + 1]) ^ Math.imul(m[e], 2654435761) | 0) & F - 1;
		for (; I[n] !== -1;) n = n + 1 & F - 1;
		I[n] = e;
	}
	let L = (e, t, n, r) => {
		let i = (Uo(t, n, r) ^ Math.imul(e, 2654435761) | 0) & F - 1, a = r - n;
		for (;;) {
			let r = I[i];
			if (r === -1) return -1;
			if (m[r] === e && _[g[r] * 2 + 1] === a) {
				let e = _[g[r] * 2], i = !0;
				for (let r = 0; r < a; r++) if (v.charCodeAt(e + r) !== t.charCodeAt(n + r)) {
					i = !1;
					break;
				}
				if (i) return h[r];
			}
			i = i + 1 & F - 1;
		}
	}, te = n.cacheSize ?? 8192, ne = n.prefix ?? e.prefix ?? "", R = ne === "" ? "" : ne + ":", z = R.length, B = (T ?? []).map((e) => {
		let n = t && t[e];
		if (!n) throw Error("cn: missing validator " + e);
		return n;
	}), V = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, H = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, re = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, ie = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, U = 0, ae = -1, oe = -1, se = -1, ce = -1, le = (e) => e >= 97 && e <= 122 || e >= 65 && e <= 90 || e >= 48 && e <= 57 || e === 95, ue = (e) => /\s/.test(String.fromCharCode(e)), de = (e, t, n) => {
		if (U = 0, ae = -1, n - t < 3) return;
		let r = e.charCodeAt(t), i = e.charCodeAt(n - 1);
		if (r === 91 && i === 93) U = 1;
		else if (r === 40 && i === 41) U = 2;
		else return;
		se = t + 1, ce = n - 1;
		let a = t + 1;
		if (le(e.charCodeAt(a))) {
			for (a++; a < n - 1;) {
				let t = e.charCodeAt(a);
				if (!le(t) && t !== 45) break;
				a++;
			}
			a < n - 2 && e.charCodeAt(a) === 58 && (ae = t + 1, oe = a, se = a + 1);
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
	], ve = "length|number|number weight|family-name|position percentage|length size bg-size|image url|shadow|length|family-name|position percentage|length size bg-size|image url|shadow|number weight".split("|").map((e) => e.split(" ")), W = [
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
	], ye = (e, t, n, r) => {
		if (e >= 10) {
			if (e >= 25) return B[e - 25](t.slice(n, r));
			let i = e - 10;
			if (U !== _e[i]) return !1;
			if (ae >= 0) {
				for (let e of ve[i]) if (fe(t, ae, oe, e)) return !0;
				return !1;
			}
			switch (W[i]) {
				case 0: return !1;
				case 1: return !0;
				case 2: {
					let e = t.slice(se, ce);
					return V.test(e) && !H.test(e);
				}
				case 3: return he(t.slice(se, ce));
				case 4: return ie.test(t.slice(se, ce));
				case 5: return re.test(t.slice(se, ce));
				default: return !he(t.slice(se, ce));
			}
		}
		switch (e) {
			case 0: return !0;
			case 1: return U === 0;
			case 2: return U === 1;
			case 3: return U === 2;
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
	}, be = new Set(typeof E == "string" ? E.split(" ") : E), xe = (e, t, n, r, i, a) => {
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
	}, Se = /* @__PURE__ */ new Map(), Ce = /* @__PURE__ */ new Map(), we = 2, Te = 4096, Ee = (e, t) => {
		let n = [], r = 0, i = 0, a = 0;
		for (let t = 0; t < e.length; t++) {
			let o = e.charCodeAt(t);
			r === 0 && i === 0 && o === 58 ? (n.push(e.slice(a, t)), a = t + 1) : o === 91 ? r++ : o === 93 ? r-- : o === 40 ? i++ : o === 41 && i--;
		}
		n.push(e.slice(a));
		let o = n[0];
		if (n.length > 1) {
			let e = [], t = [];
			for (let r of n) r.charCodeAt(0) === 91 || be.has(r) ? (t.length && (e.push(...t.sort()), t = []), e.push(r)) : t.push(r);
			t.length && e.push(...t.sort()), o = e.join(":");
		}
		let s = t ? o + " !" : o, c = Ce.get(s);
		return c === void 0 && Ce.set(s, c = we++), c;
	}, De = /* @__PURE__ */ new Map(), Oe = r, ke = r + 4096, Ae = () => Oe++, je = 2097152, Me = 8192, Ne = new Int32Array(Me), Pe = Array(Me).fill(null), Fe = new Int32Array(Me), Ie = new Int32Array(Me), Le = new Uint8Array(Me), G = 0, Re = (e, t, n, r, i, a, o, s) => {
		let c = e;
		if (Pe[e] !== null) {
			if (Pe[e | 1] === null) c = e | 1;
			else if (!(G++ & 3)) c = e | G >> 2 & 1;
			else return;
		}
		Pe[c] = t.slice(n, r), Ne[c] = i, Fe[c] = a, Ie[c] = o, Le[c] = s;
	}, ze = () => Pe.fill(null), K = 256, Be = [
		new Int32Array(K),
		new Int32Array(K),
		new Int32Array(K),
		new Int32Array(K)
	], [Ve, He, Ue, We] = Be, Ge = new Uint8Array(K), Ke = new Uint8Array(K), qe = () => {
		K *= 2, Be = Be.map((e) => {
			let t = new Int32Array(K);
			return t.set(e), t;
		}), [Ve, He, Ue, We] = Be;
		let e = new Uint8Array(K);
		e.set(Ge), Ge = e, Ke = new Uint8Array(K);
	}, Je = 64, Ye = new Int32Array(Je), Xe = new Int32Array(Je), Ze = new Int32Array(r), Qe = 2048, $e = 21, et = new Float64Array(Qe), tt = new Int32Array(Qe), nt = 0, rt = (e, t) => {
		if (e === 0 && t < r) return Ze[t] === nt ? 1 : (Ze[t] = nt, 0);
		let n = e * 2097152 + t + 1, i = Math.imul(n, 2654435761) >>> $e;
		for (; tt[i] === nt;) {
			if (et[i] === n) return 1;
			i = i + 1 & Qe - 1;
		}
		return et[i] = n, tt[i] = nt, 0;
	}, q = (e, t, n, r, i) => {
		if (n - t >= 2 && e.charCodeAt(t) === 91 && e.charCodeAt(n - 1) === 93) {
			let r = -1;
			for (let i = t + 1; i < n - 1; i++) if (e.charCodeAt(i) === 58) {
				r = i;
				break;
			}
			return r === -1 || r === t + 1 ? Vo : xe(De, e, t + 1, r, 0, Ae);
		}
		if (r >= 0 && c[r] >= 0) return c[r];
		for (let t = i - 1; t >= 0; t--) {
			let r = Xe[t];
			if (r > n) continue;
			let i = Ye[t], a = n - r;
			if (M[i] === 1 && a > 0 && a <= N) {
				let t = e.charCodeAt(r);
				if (P === !1 || t !== 91 && t !== 40) {
					let t = L(i, e, r, n);
					if (t >= 0) return t;
				}
			}
			let o = l[i];
			if (o < 0) continue;
			let s = f[o], c = u[s], m = u[s + 1];
			if (c === m) continue;
			de(e, r, n);
			let h = k[o] - c;
			for (let t = c; t < m; t++) if (ye(d[t], e, r, n)) return p[h + t];
		}
		return Vo;
	}, it = (e) => {
		let t = e.length, n = 0, c = 0, u = !1;
		(we > Te || Se.size > Te) && (Se = /* @__PURE__ */ new Map(), Ce = /* @__PURE__ */ new Map(), we = 2, ze()), Oe > ke && (De = /* @__PURE__ */ new Map(), Oe = r, ze());
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
			n === K && qe();
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
			if (z !== 0) {
				if (h - p <= z || !e.startsWith(R, p)) {
					Ue[_] = Vo, Re(y, e, p, h, v, Vo, 0, 0);
					continue;
				}
				b = p + z;
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
			let T = C >= b ? C + 1 : b, E = T, D = h, O = !1, ee = 0;
			D > E && e.charCodeAt(D - 1) === 33 ? (O = !0, D--) : D > E && e.charCodeAt(E) === 33 && (O = !0, E++, ee = 1);
			let k = -1;
			w > T && (k = w + ee, k >= D && (k = -1));
			let j = E;
			D - E > 1 && e.charCodeAt(E) === 45 && (j = E + 1);
			let N = 0, P = 0, F = 0, I = -1, L = 0;
			(l[0] >= 0 || M[0] === 1) && (Ye[0] = 0, Xe[0] = j, L = 1);
			let te = Ho, ne = 0;
			for (let t = j; t < D; t++) if (t === k && (te = P < F ? Ho : N, ne = L), N !== Ho) {
				let n = e.charCodeAt(t), r = -1;
				if (P < F) o.charCodeAt(P) === n ? (P++, P === F && (r = N = I)) : N = Ho;
				else {
					let e = i[N], t = i[N + 1], c = Ho;
					for (let i = e; i < t; i++) {
						let e = a[i];
						if (o.charCodeAt(e) === n) {
							a[i + 1] - e === 1 ? r = c = s[i] : (P = e + 1, F = a[i + 1], I = s[i], c = N);
							break;
						}
					}
					N = c;
				}
				if (r >= 0 && (l[r] >= 0 || M[r] === 1) && t + 1 < D && e.charCodeAt(t + 1) === 45) {
					if (L === Je) {
						Je *= 2;
						let e = new Int32Array(Je);
						e.set(Ye), Ye = e;
						let t = new Int32Array(Je);
						t.set(Xe), Xe = t;
					}
					Ye[L] = r, Xe[L] = t + 2, L++;
				}
			}
			k === D && (te = P < F ? Ho : N, ne = L);
			let B = P < F ? Ho : N, V, H = !1;
			if (k >= 0) {
				if (H = !0, V = q(e, E, k, te, ne), V !== Vo && V < r && A[V]) {
					let t = q(e, E, D, B, L);
					t !== Vo && t !== V && (V = t, H = !1);
				} else V === Vo && (V = q(e, E, D, B, L), H = !1);
			} else V = q(e, E, D, B, L);
			let re = 0, ie = 0;
			V === Vo ? Ue[_] = Vo : (ie = +!!H, re = b >= C ? +!!O : xe(Se, e, b, C, +!!O, (e) => Ee(e, O)), Ue[_] = V, Ge[_] = ie, We[_] = re), Re(y, e, p, h, v, V, re, ie);
		}
		if (n === 0) return "";
		if (n === 1) return Ve[0] === 0 && He[0] === t ? e : e.slice(Ve[0], He[0]);
		if (n * ee > Qe) {
			for (; n * ee > Qe;) Qe <<= 1, $e--;
			et = new Float64Array(Qe), tt = new Int32Array(Qe);
		}
		if (we >= je || Oe >= je) throw Error("cn: too many distinct classes in one merge");
		nt = nt + 1 | 0, nt === 0 && (Ze.fill(0), tt.fill(0), nt = 1);
		let f = !1;
		for (let e = n - 1; e >= 0; e--) {
			let t = Ue[e];
			if (t === Vo) {
				Ke[e] = 1;
				continue;
			}
			let n = We[e];
			if (rt(n, t) === 1) Ke[e] = 0, f = !0;
			else if (Ke[e] = 1, t < r) {
				let r = D[t];
				if (r >= 0) for (let e = b[r]; e < b[r + 1]; e++) rt(n, x[e]);
				if (Ge[e] & 1) for (let e = 0; e < S.length; e++) S[e] === t && rt(n, C[e]);
			}
		}
		if (!f && !u && t === c + n - 1) return e;
		let p = "", m = 0;
		for (; m < n;) {
			if (!Ke[m]) {
				m++;
				continue;
			}
			let t = Ve[m], r = He[m], i = m + 1;
			for (; i < n && Ke[i] && Ve[i] === r + 1 && e.charCodeAt(r) === 32;) r = He[i], i++;
			p.length > 0 && (p += " "), p += e.slice(t, r), m = i;
		}
		return p;
	}, at = 16384, ot = new Int32Array(at * 2), st = 0, ct = 1, lt = /* @__PURE__ */ Object.create(null), ut = /* @__PURE__ */ Object.create(null), dt = /* @__PURE__ */ new Map(), ft = /* @__PURE__ */ new Map(), pt = 0, mt = 0, ht = () => {
		st ^= at, ct = ct + 1 | 0, mt = 0;
	}, gt = (e) => {
		let t = lt[e];
		if (t !== void 0) return t;
		let n = Wo(e, 0, e.length), r = (n & 16383) + st, i = ot[r] === (n ^ ct) || ot[r ^ at] === (n ^ ct - 1);
		return i && (t = ut[e], t !== void 0) ? (lt[e] = t, t) : (t = it(e), i ? (lt[e] = t, ++pt > te && (pt = 0, ut = lt, lt = /* @__PURE__ */ Object.create(null), ht())) : (ot[r] = n ^ ct, ++mt > at && ht()), t);
	}, _t = (e) => {
		let t = dt.get(e);
		if (t !== void 0) return t;
		let n = Wo(e, 0, e.length), r = (n & 16383) + st, i = ot[r] === (n ^ ct) || ot[r ^ at] === (n ^ ct - 1);
		return i && (t = ft.get(e), t !== void 0) ? (dt.set(e, t), t) : (t = it(e), i ? (dt.set(e, t), ++pt > te && (pt = 0, ft = dt, dt = /* @__PURE__ */ new Map(), ht())) : (ot[r] = n ^ ct, ++mt > at && ht()), t);
	}, vt = (e) => {
		let t = Wo(e, 0, e.length), n = (t & 16383) + st;
		return ot[n] === (t ^ ct) || ot[n ^ at] === (t ^ ct - 1) || (ot[n] = t ^ ct, ++mt > at && ht(), !1);
	}, yt = te === 0 ? it : Bo ? (e) => {
		let t = dt.get(e);
		return t === void 0 ? _t(e) : t;
	} : gt;
	return {
		merge: function() {
			return arguments.length === 1 && typeof arguments[0] == "string" ? yt(arguments[0]) : yt(Jo.apply(null, arguments));
		},
		mergeString: yt,
		seenBefore: te === 0 ? () => !1 : vt,
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
}, zs = 1024, Bs = 256, Vs = 1e3, Hs = (e) => typeof e == "string" ? e : e == null ? "" : na(e), Us = (e, t, n) => e ? t ? n ? `${e} ${t} ${n}` : `${e} ${t}` : n ? `${e} ${n}` : e : t ? n ? `${t} ${n}` : t : n, Ws = ((e, t, n) => {
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
	return t != null && !Q(t);
}, Ks = () => /* @__PURE__ */ TypeError("[tailwind-variants] `twMergeConfig` is only supported by the `tailwind-variants/config` entry. Import `tv`, `createTV`, or `cnMerge` from there, or inject a merge function with `twMerge`."), qs = (e, t) => {
	if (t === 0) return "";
	let n = e[0];
	for (let r = 1; r < t; r++) n += ` ${e[r]}`;
	return n;
}, Js = {
	parts: qs,
	override: (e, t, n) => la(e, t, n)
}, Ys = (e) => {
	let t = (t) => t ? e(t) : "";
	return {
		parts: (e, n) => t(qs(e, n)),
		override: (e, n, r) => t(la(e, n, r))
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
}, { twMerge: !1 }), ec = (e = {}) => ea($s(e)), tc = /* @__PURE__ */ new Set([
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
]), nc = /* @__PURE__ */ Pt("<span aria-hidden=\"true\" class=\"tw:size-4 tw:animate-spin tw:rounded-full tw:border-2 tw:border-current tw:border-r-transparent tw:motion-reduce:animate-none\"></span>"), rc = /* @__PURE__ */ Pt("<button><!> <!></button>");
function ic(e, t) {
	tt(t, !0);
	let n = br(t, "loading", 3, !1), r = br(t, "disabled", 3, !1), i = br(t, "type", 3, "button"), a = br(t, "ref", 15, null), s = /* @__PURE__ */ _r(t, tc);
	var c = rc();
	Yn(c, (e) => ({
		type: i(),
		disabled: r() || n(),
		"aria-busy": n() || void 0,
		class: e,
		...s
	}), [() => ea(ec({
		variant: t.variant,
		size: t.size
	}), t.class)]);
	var l = w(c), u = (e) => {
		zt(e, nc());
	};
	Zt(l, (e) => {
		n() && e(u);
	}), dn(p(l, 2), () => t.children ?? O), Ue(c), sr(c, (e) => a(e), () => a()), zt(e, c), o();
}
// svelte/lib/ui/Input.svelte
var ac = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"value",
	"class",
	"ref"
]), oc = /* @__PURE__ */ Pt("<input/>");
function sc(e, t) {
	tt(t, !0);
	let n = br(t, "value", 15, ""), r = br(t, "ref", 15, null), i = /* @__PURE__ */ _r(t, ac);
	var a = oc();
	Yn(a, (e) => ({
		class: e,
		...i
	}), [() => ea("tw:h-9 tw:w-full tw:min-w-0 tw:rounded-control tw:border tw:border-input tw:bg-studio-input-background tw:px-3 tw:py-2 tw:font-sans tw:text-sm tw:font-normal tw:leading-5 tw:tracking-normal tw:text-foreground tw:outline-none tw:placeholder:text-muted-foreground tw:focus-visible:border-ring tw:focus-visible:ring-2 tw:focus-visible:ring-ring/30 tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-destructive/30", t.class)], void 0, void 0, void 0, !0), sr(a, (e) => r(e), () => r()), $n(a, n), zt(e, a), o();
}
// svelte/lib/ui/Label.svelte
var cc = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"children",
	"class"
]), lc = /* @__PURE__ */ Pt("<label><!></label>");
function uc(e, t) {
	tt(t, !0);
	let n = /* @__PURE__ */ _r(t, cc);
	var r = lc();
	Yn(r, (e) => ({
		class: e,
		...n
	}), [() => ea("tw:font-sans tw:text-sm tw:font-medium tw:leading-5 tw:text-foreground", t.class)]), dn(w(r), () => t.children ?? O), Ue(r), zt(e, r), o();
}
// svelte/lib/ui/Card.svelte
var dc = /* @__PURE__ */ Pt("<h2 class=\"tw:m-0 tw:font-sans tw:text-base tw:font-semibold tw:leading-6 tw:tracking-normal\"> </h2>"), fc = /* @__PURE__ */ Pt("<p class=\"tw:m-0 tw:text-sm tw:leading-5 tw:text-muted-foreground\"> </p>"), pc = /* @__PURE__ */ Pt("<div class=\"tw:space-y-1\"><!><!></div>"), mc = /* @__PURE__ */ Pt("<section><!> <!></section>");
function hc(e, t) {
	tt(t, !0);
	var n = mc(), r = w(n), i = (e) => {
		var n = pc(), r = w(n), i = (e) => {
			var n = dc(), r = F(n, !0);
			E(() => Wt(r, t.title)), zt(e, n);
		};
		Zt(r, (e) => {
			t.title && e(i);
		});
		var a = p(r), o = (e) => {
			var n = fc(), r = F(n, !0);
			E(() => Wt(r, t.description)), zt(e, n);
		};
		Zt(a, (e) => {
			t.description && e(o);
		}), Ue(n), zt(e, n);
	};
	Zt(r, (e) => {
		(t.title || t.description) && e(i);
	}), dn(p(r, 2), () => t.children), Ue(n), E((e) => Tn(n, 1, e), [() => yn(ea("tw:space-y-4 tw:rounded-surface tw:border tw:border-border tw:bg-card tw:p-5 tw:font-sans tw:text-sm tw:text-card-foreground tw:shadow-xs", t.class))]), zt(e, n), o();
}
export { mn as A, Yt as B, qn as C, yn as D, Tn as E, en as F, Bt as G, Rt as H, $t as I, Tt as J, Lt as K, Zt as L, fn as M, dn as N, vn as O, an as P, st as Q, Gt as R, Wn as S, Gn as T, Pt as U, zt as V, It as W, Ct as X, wt as Y, xt as Z, sr as _, ec as a, $n as b, Sr as c, _r as d, yr as f, cr as g, mr as h, ic as i, pn as j, hn as k, xr as l, dr as m, uc as n, Qs as o, fr as p, Et as q, sc as r, ea as s, hc as t, br as u, nr as v, Kn as w, Yn as x, tr as y, Wt as z };
