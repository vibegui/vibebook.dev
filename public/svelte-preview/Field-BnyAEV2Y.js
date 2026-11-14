import { $ as e, A as t, Et as n, Fn as r, J as i, Jt as a, K as o, Kt as s, P as c, Q as l, R as u, S as d, Tt as f, W as p, Y as m, a as h, bt as g, ct as _, et as v, h as y, j as b, k as x, l as S, m as C, mt as w, p as T, r as E, wt as D, xt as O, yt as k } from "./index-client-B2aDKUZc.js";
import { B as A, C as j, D as M, E as N, F as ee, G as P, H as F, I as te, J as ne, K as I, L, M as R, N as z, O as re, P as ie, Q as ae, R as oe, S as se, T as ce, U as B, V, W as le, X as H, Y as ue, Z as de, _ as U, a as fe, b as pe, d as W, f as me, g as he, i as ge, j as _e, k as ve, m as ye, n as be, o as xe, p as Se, q as Ce, s as G, u as K, v as we, x as q, y as Te, z as J } from "./Card-DslCvQ-8.js";
// node_modules/svelte-toolbelt/dist/utils/is.js
function Ee(e) {
	return typeof e == "function";
}
function De(e) {
	return typeof e == "object" && !!e;
}
var Oe = [
	"string",
	"number",
	"bigint",
	"boolean"
];
function ke(e) {
	return e == null || Oe.includes(typeof e) ? !0 : Array.isArray(e) ? e.every((e) => ke(e)) : typeof e == "object" && Object.getPrototypeOf(e) === Object.prototype;
}
// node_modules/svelte-toolbelt/dist/box/box-extras.svelte.js
var Ae = Symbol("box"), je = Symbol("is-writable");
function Y(e, t) {
	let n = _(e);
	return t ? {
		[Ae]: !0,
		[je]: !0,
		get current() {
			return S(n);
		},
		set current(e) {
			t(e);
		}
	} : {
		[Ae]: !0,
		get current() {
			return e();
		}
	};
}
function Me(e) {
	return De(e) && Ae in e;
}
function Ne(e) {
	return Me(e) && je in e;
}
function Pe(e) {
	return Me(e) ? e : Ee(e) ? Y(e) : Le(e);
}
function Fe(e) {
	return Object.entries(e).reduce((e, [t, n]) => Me(n) ? (Ne(n) ? Object.defineProperty(e, t, {
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
function Ie(e) {
	return Ne(e) ? {
		[Ae]: !0,
		get current() {
			return e.current;
		}
	} : e;
}
function Le(e) {
	let t = v(i(e));
	return {
		[Ae]: !0,
		[je]: !0,
		get current() {
			return S(t);
		},
		set current(e) {
			l(t, e, !0);
		}
	};
}
// node_modules/svelte-toolbelt/dist/box/box.svelte.js
function Re(e) {
	let t = v(i(e));
	return {
		[Ae]: !0,
		[je]: !0,
		get current() {
			return S(t);
		},
		set current(e) {
			l(t, e, !0);
		}
	};
}
Re.from = Pe, Re.with = Y, Re.flatten = Fe, Re.readonly = Ie, Re.isBox = Me, Re.isWritableBox = Ne;
// node_modules/svelte-toolbelt/dist/utils/compose-handlers.js
function ze(...e) {
	return function(t) {
		for (let n of e) if (n) {
			if (t.defaultPrevented) return;
			typeof n == "function" ? n.call(this, t) : n.current?.call(this, t);
		}
	};
}
// node_modules/inline-style-parser/esm/index.mjs
var Be = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g, Ve = /\n/g, He = /^\s*/, Ue = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/, We = /^:\s*/, Ge = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/, Ke = /^[;\s]*/, qe = /^\s+|\s+$/g, Je = "\n", Ye = "/", Xe = "*", Ze = "", Qe = "comment", $e = "declaration";
function et(e, t) {
	if (typeof e != "string") throw TypeError("First argument must be a string");
	if (!e) return [];
	t ||= {};
	var n = 1, r = 1;
	function i(e) {
		var t = e.match(Ve);
		t && (n += t.length);
		var i = e.lastIndexOf(Je);
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
		c(He);
	}
	function u(e) {
		var t;
		for (e ||= []; t = d();) t !== !1 && e.push(t);
		return e;
	}
	function d() {
		var t = a();
		if (Ye == e.charAt(0) && Xe == e.charAt(1)) {
			for (var n = 2; Ze != e.charAt(n) && (Xe != e.charAt(n) || Ye != e.charAt(n + 1));) ++n;
			if (n += 2, Ze === e.charAt(n - 1)) return s("End of comment missing");
			var o = e.slice(2, n - 2);
			return r += 2, i(o), e = e.slice(n), r += 2, t({
				type: Qe,
				comment: o
			});
		}
	}
	function f() {
		var e = a(), t = c(Ue);
		if (t) {
			if (d(), !c(We)) return s("property missing ':'");
			var n = c(Ge), r = e({
				type: $e,
				property: tt(t[0].replace(Be, Ze)),
				value: n ? tt(n[0].replace(Be, Ze)) : Ze
			});
			return c(Ke), r;
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
function tt(e) {
	return e ? e.replace(qe, Ze) : Ze;
}
// node_modules/style-to-object/esm/index.mjs
function nt(e, t) {
	let n = null;
	if (!e || typeof e != "string") return n;
	let r = et(e), i = typeof t == "function";
	return r.forEach((e) => {
		if (e.type !== "declaration") return;
		let { property: r, value: a } = e;
		i ? t(r, a, e) : a && (n ||= {}, n[r] = a);
	}), n;
}
// node_modules/svelte-toolbelt/dist/utils/strings.js
var rt = /\d/, it = [
	"-",
	"_",
	"/",
	"."
];
function at(e = "") {
	if (!rt.test(e)) return e !== e.toLowerCase();
}
function ot(e) {
	let t = [], n = "", r, i;
	for (let a of e) {
		let e = it.includes(a);
		if (e === !0) {
			t.push(n), n = "", r = void 0;
			continue;
		}
		let o = at(a);
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
function st(e) {
	return e ? ot(e).map((e) => lt(e)).join("") : "";
}
function ct(e) {
	return ut(st(e || ""));
}
function lt(e) {
	return e ? e[0].toUpperCase() + e.slice(1) : "";
}
function ut(e) {
	return e ? e[0].toLowerCase() + e.slice(1) : "";
}
// node_modules/svelte-toolbelt/dist/utils/css-to-style-obj.js
var dt = 1e3, ft = /* @__PURE__ */ new Map();
function pt(e) {
	let t = ft.get(e);
	return t === void 0 && (t = e.startsWith("-moz-") || e.startsWith("-webkit-") || e.startsWith("-ms-") || e.startsWith("-o-") ? st(e) : e.startsWith("--") ? e : ct(e), ft.size >= dt && ft.clear(), ft.set(e, t)), t;
}
var mt = /["'\\{}]|\/\*/, ht = /^[-\w]+$/;
function gt(e) {
	if (mt.test(e)) return null;
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
				if (!ht.test(n) || !o) return null;
				t.push(n, o);
			}
			r = a + 1, i = -1;
		}
	}
	return t;
}
function _t(e, t) {
	let n = gt(t);
	if (n) for (let t = 0; t < n.length; t += 2) e[pt(n[t])] = n[t + 1];
	else nt(t, (t, n) => {
		e[pt(t)] = n;
	});
}
function vt(e) {
	if (!e) return {};
	let t = {};
	return _t(t, e), t;
}
// node_modules/svelte-toolbelt/dist/utils/execute-callbacks.js
function yt(...e) {
	return (...t) => {
		for (let n of e) typeof n == "function" && n(...t);
	};
}
// node_modules/svelte-toolbelt/dist/utils/style-to-css.js
function bt(e, t) {
	let n = RegExp(e, "g");
	return (e) => {
		if (typeof e != "string") throw TypeError(`expected an argument of type string, but got ${typeof e}`);
		return e.match(n) ? e.replace(n, t) : e;
	};
}
var xt = bt(/[A-Z]/, (e) => `-${e.toLowerCase()}`), St = /* @__PURE__ */ new Map();
function Ct(e) {
	let t = St.get(e);
	return t === void 0 && (t = xt(e), St.size >= 1e3 && St.clear(), St.set(e, t)), t;
}
function wt(e) {
	if (!e || typeof e != "object" || Array.isArray(e)) throw TypeError(`expected an argument of type object, but got ${typeof e}`);
	let t = "";
	for (let n of Object.keys(e)) {
		let r = e[n];
		r != null && r !== "" && (t += `${t ? "\n" : ""}${Ct(n)}: ${r};`);
	}
	return t;
}
// node_modules/svelte-toolbelt/dist/utils/style.js
function Tt(e = {}) {
	return wt(e).replace("\n", " ");
}
var Et = new Set(/* @__PURE__ */ "onabort.onanimationcancel.onanimationend.onanimationiteration.onanimationstart.onauxclick.onbeforeinput.onbeforetoggle.onblur.oncancel.oncanplay.oncanplaythrough.onchange.onclick.onclose.oncompositionend.oncompositionstart.oncompositionupdate.oncontextlost.oncontextmenu.oncontextrestored.oncopy.oncuechange.oncut.ondblclick.ondrag.ondragend.ondragenter.ondragleave.ondragover.ondragstart.ondrop.ondurationchange.onemptied.onended.onerror.onfocus.onfocusin.onfocusout.onformdata.ongotpointercapture.oninput.oninvalid.onkeydown.onkeypress.onkeyup.onload.onloadeddata.onloadedmetadata.onloadstart.onlostpointercapture.onmousedown.onmouseenter.onmouseleave.onmousemove.onmouseout.onmouseover.onmouseup.onpaste.onpause.onplay.onplaying.onpointercancel.onpointerdown.onpointerenter.onpointerleave.onpointermove.onpointerout.onpointerover.onpointerup.onprogress.onratechange.onreset.onresize.onscroll.onscrollend.onsecuritypolicyviolation.onseeked.onseeking.onselect.onselectionchange.onselectstart.onslotchange.onstalled.onsubmit.onsuspend.ontimeupdate.ontoggle.ontouchcancel.ontouchend.ontouchmove.ontouchstart.ontransitioncancel.ontransitionend.ontransitionrun.ontransitionstart.onvolumechange.onwaiting.onwebkitanimationend.onwebkitanimationiteration.onwebkitanimationstart.onwebkittransitionend.onwheel".split("."));
// node_modules/svelte-toolbelt/dist/utils/merge-props.js
function Dt(e) {
	return Et.has(e);
}
function X(...e) {
	let t = { ...e[0] };
	for (let n = 1; n < e.length; n++) {
		let r = e[n];
		if (r) {
			for (let e of Object.keys(r)) {
				let n = t[e], i = r[e], a = typeof n == "function", o = typeof i == "function";
				if (a && o && Dt(e)) t[e] = ze(n, i);
				else if (a && o) t[e] = yt(n, i);
				else if (e === "class") {
					let r = ke(n), a = ke(i);
					r && a ? t[e] = re(n, i) : r ? t[e] = re(n) : a && (t[e] = re(i));
				} else if (e === "style") {
					let r = typeof n == "object", a = typeof i == "object", o = typeof n == "string", s = typeof i == "string";
					if (r && a) t[e] = {
						...n,
						...i
					};
					else if (r && s) {
						let r = vt(i);
						t[e] = {
							...n,
							...r
						};
					} else if (o && a) t[e] = {
						...vt(n),
						...i
					};
					else if (o && s) {
						let r = vt(n), a = vt(i);
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
	return typeof t.style == "object" && (t.style = Tt(t.style).replaceAll("\n", " ")), t.hidden === !1 && (t.hidden = void 0, delete t.hidden), t.disabled === !1 && (t.disabled = void 0, delete t.disabled), t;
}
// node_modules/runed/dist/internal/configurable-globals.js
var Ot = typeof window < "u" ? window : void 0;
typeof window < "u" && window.document, typeof window < "u" && window.navigator, typeof window < "u" && window.location;
// node_modules/runed/dist/internal/utils/dom.js
function kt(e) {
	let t = e.activeElement;
	for (; t?.shadowRoot;) {
		let e = t.shadowRoot.activeElement;
		if (e === t) break;
		t = e;
	}
	return t;
}
// node_modules/svelte/src/reactivity/map.js
var At = class extends Map {
	#e = /* @__PURE__ */ new Map();
	#t = /* @__PURE__ */ v(0);
	#n = /* @__PURE__ */ v(0);
	#r = y || -1;
	constructor(e) {
		if (super(), e) {
			for (var [t, n] of e) super.set(t, n);
			this.#n.v = super.size;
		}
	}
	#i(t) {
		return y === this.#r ? /* @__PURE__ */ v(t) : e(t);
	}
	has(e) {
		var t = this.#e, n = t.get(e);
		if (n === void 0) {
			if (super.has(e)) n = this.#i(0), t.set(e, n);
			else return S(this.#t), !1;
		}
		return S(n), !0;
	}
	forEach(e, t) {
		this.#a(), super.forEach(e, t);
	}
	get(e) {
		var t = this.#e, n = t.get(e);
		if (n === void 0) {
			if (super.has(e)) n = this.#i(0), t.set(e, n);
			else {
				S(this.#t);
				return;
			}
		}
		return S(n), super.get(e);
	}
	getOrInsert(e, t) {
		return super.has(e) || this.set(e, t), this.get(e);
	}
	getOrInsertComputed(e, t) {
		return super.has(e) || this.set(e, t(e)), this.get(e);
	}
	set(e, t) {
		var n = this.#e, r = n.get(e), i = super.get(e), a = super.set(e, t), o = this.#t;
		if (r === void 0) r = this.#i(0), n.set(e, r), l(this.#n, super.size), m(o);
		else if (i !== t) {
			m(r);
			var s = o.reactions === null ? null : new Set(o.reactions);
			s !== null && r.reactions?.every((e) => s.has(e)) || m(o);
		}
		return a;
	}
	delete(e) {
		var t = this.#e, n = t.get(e), r = super.delete(e);
		return n !== void 0 && (t.delete(e), l(n, -1)), r && (l(this.#n, super.size), m(this.#t)), r;
	}
	clear() {
		if (super.size !== 0) {
			super.clear();
			var e = this.#e;
			l(this.#n, 0);
			for (var t of e.values()) l(t, -1);
			m(this.#t), e.clear();
		}
	}
	#a() {
		S(this.#t);
		var e = this.#e;
		if (this.#n.v !== e.size) {
			for (var t of super.keys()) if (!e.has(t)) {
				var n = this.#i(0);
				e.set(t, n);
			}
		}
		for ([, n] of this.#e) S(n);
	}
	keys() {
		return S(this.#t), super.keys();
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
		return S(this.#n), super.size;
	}
}, jt = class {
	#e;
	#t;
	constructor(e, t) {
		this.#e = e, this.#t = h(t);
	}
	get current() {
		return this.#t(), this.#e();
	}
}, Mt = /\(.+\)/, Nt = /* @__PURE__ */ new Set([
	"all",
	"print",
	"screen",
	"and",
	"or",
	"not",
	"only"
]), Pt = class extends jt {
	constructor(e, t) {
		let n = Mt.test(e) || e.split(/[\s,]+/).some((e) => Nt.has(e.trim())) ? e : `(${e})`, r = window.matchMedia(n);
		super(() => r.matches, (e) => H(r, "change", e));
	}
};
new class {
	#e;
	#t;
	constructor(e = {}) {
		let { window: t = Ot, document: n = t?.document } = e;
		t !== void 0 && (this.#e = n, this.#t = h((e) => {
			let n = H(t, "focusin", e), r = H(t, "focusout", e);
			return () => {
				n(), r();
			};
		}));
	}
	get current() {
		return this.#t?.(), this.#e ? kt(this.#e) : null;
	}
}();
// node_modules/runed/dist/internal/utils/is.js
function Ft(e) {
	return typeof e == "function";
}
// node_modules/runed/dist/utilities/context/context.js
var It = class {
	#e;
	#t;
	constructor(e) {
		this.#e = e, this.#t = Symbol(e);
	}
	get key() {
		return this.#t;
	}
	exists() {
		return O(this.#t);
	}
	get() {
		let e = g(this.#t);
		if (e === void 0) throw Error(`Context "${this.#e}" not found`);
		return e;
	}
	getOr(e) {
		let t = g(this.#t);
		return t === void 0 ? e : t;
	}
	set(e) {
		return n(this.#t, e);
	}
};
// node_modules/runed/dist/utilities/watch/watch.svelte.js
function Lt(e, n) {
	switch (e) {
		case "post":
			t(n);
			break;
		case "pre": b(n);
	}
}
function Rt(e, t, n, r = {}) {
	let { lazy: i = !1 } = r, a = !i, o = Array.isArray(e) ? [] : void 0;
	Lt(t, () => {
		let t = Array.isArray(e) ? e.map((e) => e()) : e();
		if (!a) {
			a = !0, o = t;
			return;
		}
		let r = C(() => n(t, o));
		return o = t, r;
	});
}
function Z(e, t, n) {
	Rt(e, "post", t, n);
}
function zt(e, t, n) {
	Rt(e, "pre", t, n);
}
Z.pre = zt;
// node_modules/runed/dist/internal/utils/get.js
function Bt(e) {
	return Ft(e) ? e() : e;
}
// node_modules/runed/dist/utilities/element-size/element-size.svelte.js
var Vt = class {
	#e = {
		width: 0,
		height: 0
	};
	#t = !1;
	#n;
	#r;
	#i;
	#a = _(() => (S(this.#s)?.(), this.getSize().width));
	#o = _(() => (S(this.#s)?.(), this.getSize().height));
	#s = _(() => {
		let e = Bt(this.#r);
		if (e) return h((t) => {
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
		this.#i = t.window ?? Ot, this.#n = t, this.#r = e, this.#e = {
			width: 0,
			height: 0
		};
	}
	calculateSize() {
		let e = Bt(this.#r);
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
		return S(this.#s)?.(), this.getSize();
	}
	get width() {
		return S(this.#a);
	}
	get height() {
		return S(this.#o);
	}
};
// node_modules/svelte-toolbelt/dist/utils/on-destroy-effect.svelte.js
function Ht(e) {
	t(() => () => {
		e();
	});
}
// node_modules/svelte-toolbelt/dist/utils/after-sleep.js
function Ut(e, t) {
	return setTimeout(t, e);
}
// node_modules/svelte-toolbelt/dist/utils/after-tick.js
function Wt(e) {
	T().then(e);
}
// node_modules/svelte-toolbelt/dist/utils/dom.js
var Gt = 1, Kt = 9, qt = 11;
function Jt(e) {
	return De(e) && e.nodeType === Gt && typeof e.nodeName == "string";
}
function Yt(e) {
	return De(e) && e.nodeType === Kt;
}
function Xt(e) {
	return De(e) && e.constructor?.name === "VisualViewport";
}
function Zt(e) {
	return De(e) && e.nodeType !== void 0;
}
function Qt(e) {
	return Zt(e) && e.nodeType === qt && "host" in e;
}
function $t(e, t) {
	if (!e || !t || !Jt(e) || !Jt(t)) return !1;
	let n = t.getRootNode?.();
	if (e === t || e.contains(t)) return !0;
	if (n && Qt(n)) {
		let n = t;
		for (; n;) {
			if (e === n) return !0;
			n = n.parentNode || n.host;
		}
	}
	return !1;
}
function en(e) {
	return Yt(e) ? e : Xt(e) ? e.document : e?.ownerDocument ?? document;
}
function tn(e) {
	return Qt(e) ? tn(e.host) : Yt(e) ? e.defaultView ?? window : Jt(e) ? e.ownerDocument?.defaultView ?? window : window;
}
function nn(e) {
	let t = e.activeElement;
	for (; t?.shadowRoot;) {
		let e = t.shadowRoot.activeElement;
		if (e === t) break;
		t = e;
	}
	return t;
}
// node_modules/svelte-toolbelt/dist/utils/dom-context.svelte.js
var rn = class {
	element;
	#e = _(() => this.element.current ? this.element.current.getRootNode() ?? document : document);
	get root() {
		return S(this.#e);
	}
	set root(e) {
		l(this.#e, e);
	}
	constructor(e) {
		this.element = typeof e == "function" ? Y(e) : e;
	}
	getDocument = () => en(this.root);
	getWindow = () => this.getDocument().defaultView ?? window;
	getActiveElement = () => nn(this.root);
	isActiveElement = (e) => e === this.getActiveElement();
	getElementById(e) {
		return this.root.getElementById(e);
	}
	querySelector = (e) => this.root ? this.root.querySelector(e) : null;
	querySelectorAll = (e) => this.root ? this.root.querySelectorAll(e) : [];
	setTimeout = (e, t) => this.getWindow().setTimeout(e, t);
	clearTimeout = (e) => this.getWindow().clearTimeout(e);
};
// node_modules/svelte-toolbelt/dist/utils/attach-ref.js
function an(e, t) {
	return { [ae()]: (n) => Me(e) ? (e.current = n, C(() => t?.(n)), () => {
		"isConnected" in n && n.isConnected || (e.current = null, t?.(null));
	}) : (e(n), C(() => t?.(n)), () => {
		"isConnected" in n && n.isConnected || (e(null), t?.(null));
	}) };
}
// node_modules/bits-ui/dist/internal/attrs.js
function on(e) {
	return e ? "true" : "false";
}
function sn(e) {
	return e ? "" : void 0;
}
function cn(e) {
	return e ? !0 : void 0;
}
function ln(e) {
	return e ? "open" : "closed";
}
function un(e) {
	return e === "starting" ? { "data-starting-style": "" } : e === "ending" ? { "data-ending-style": "" } : {};
}
var dn = class {
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
function fn(e) {
	let t = new dn(e);
	return {
		...t.attrs,
		selector: t.selector,
		getAttr: t.getAttr
	};
}
// node_modules/bits-ui/dist/internal/kbd-constants.js
var pn = "ArrowDown", mn = "ArrowLeft", hn = "ArrowRight", gn = "ArrowUp", _n = "Home", vn = "PageDown", yn = "PageUp";
// node_modules/bits-ui/dist/internal/locale.js
function bn(e) {
	return window.getComputedStyle(e).getPropertyValue("direction");
}
// node_modules/bits-ui/dist/internal/get-directional-keys.js
var xn = [
	pn,
	yn,
	_n
], Sn = [
	gn,
	vn,
	"End"
];
[...xn, ...Sn];
function Cn(e = "ltr", t = "horizontal") {
	return {
		horizontal: e === "rtl" ? mn : hn,
		vertical: pn
	}[t];
}
function wn(e = "ltr", t = "horizontal") {
	return {
		horizontal: e === "rtl" ? hn : mn,
		vertical: gn
	}[t];
}
function Tn(e = "ltr", t = "horizontal") {
	return ["ltr", "rtl"].includes(e) || (e = "ltr"), ["horizontal", "vertical"].includes(t) || (t = "horizontal"), {
		nextKey: Cn(e, t),
		prevKey: wn(e, t)
	};
}
// node_modules/bits-ui/dist/internal/is.js
var En = typeof document < "u", Dn = On();
function On() {
	return En && window?.navigator?.userAgent && (/iP(ad|hone|od)/.test(window.navigator.userAgent) || window?.navigator?.maxTouchPoints > 2 && /iPad|Macintosh/.test(window?.navigator.userAgent));
}
function kn(e) {
	return e instanceof HTMLElement;
}
function An(e) {
	return e instanceof Element;
}
function jn(e) {
	return e instanceof Element || e instanceof SVGElement;
}
function Mn(e) {
	return e.matches(":focus-visible");
}
function Nn(e) {
	return e !== null;
}
// node_modules/bits-ui/dist/internal/css-escape.js
function Pn(e) {
	if (typeof CSS < "u" && typeof CSS.escape == "function") return CSS.escape(e);
	let t = e.length, n = -1, r, i = "", a = e.charCodeAt(0);
	if (t === 1 && a === 45) return "\\" + e;
	for (; ++n < t;) r = e.charCodeAt(n), i += r === 0 ? "�" : r >= 1 && r <= 31 || r === 127 || n === 0 && r >= 48 && r <= 57 || n === 1 && r >= 48 && r <= 57 && a === 45 ? "\\" + r.toString(16) + " " : r >= 128 || r === 45 || r === 95 || r >= 48 && r <= 57 || r >= 65 && r <= 90 || r >= 97 && r <= 122 ? e.charAt(n) : "\\" + e.charAt(n);
	return i;
}
// node_modules/bits-ui/dist/internal/roving-focus-group.js
var Fn = class {
	#e;
	#t = Re(null);
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
		let a = i.indexOf(e), { nextKey: o, prevKey: s } = Tn(bn(r), this.#e.orientation.current), c = this.#e.loop.current, l = {
			[o]: a + 1,
			[s]: a - 1,
			[_n]: 0,
			End: i.length - 1
		};
		if (n) {
			let e = o === "ArrowDown" ? hn : pn, t = s === "ArrowUp" ? mn : gn;
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
		let t = this.#e.rootNode.current?.querySelector(`#${Pn(e)}`);
		t && kn(t) && t.focus();
	}
}, In = class {
	#e;
	#t = null;
	#n = null;
	#r = 0;
	constructor(e) {
		this.#e = e, Ht(() => this.#i());
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
		this.#e.afterTick.current ? Wt(n) : n();
	}
}, Ln = class {
	#e;
	#t;
	#n;
	#r = v(!1);
	#i = v(void 0);
	#a = !1;
	#o = null;
	constructor(e) {
		this.#e = e, l(this.#r, e.open.current, !0), this.#t = e.enabled ?? !0, this.#n = new In({
			ref: this.#e.ref,
			afterTick: this.#e.open
		}), Ht(() => this.#s()), Z(() => this.#e.open.current, (e) => {
			!this.#a && (this.#a = !0, e === S(this.#r)) || (this.#s(), !e && this.#e.shouldSkipExitAnimation?.() ? (l(this.#r, !1), l(this.#i, void 0), this.#e.onComplete?.()) : (e && l(this.#r, !0), l(this.#i, e ? "starting" : "ending", !0), e && (this.#o = window.requestAnimationFrame(() => {
				this.#o = null, this.#e.open.current && l(this.#i, void 0);
			})), this.#t ? this.#n.run(() => {
				e === this.#e.open.current && (this.#e.open.current || l(this.#r, !1), l(this.#i, void 0), this.#e.onComplete?.());
			}) : (e || l(this.#r, !1), l(this.#i, void 0), this.#e.onComplete?.())));
		});
	}
	get shouldRender() {
		return S(this.#r);
	}
	get transitionStatus() {
		return S(this.#i);
	}
	#s() {
		this.#o !== null && (window.cancelAnimationFrame(this.#o), this.#o = null);
	}
};
// node_modules/bits-ui/dist/internal/noop.js
function Q() {}
// node_modules/bits-ui/dist/internal/create-id.js
function $(e, t) {
	return t === void 0 ? `bits-${e}` : `bits-${e}-${t}`;
}
// node_modules/bits-ui/dist/bits/dialog/dialog.svelte.js
var Rn = fn({
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
}), zn = new It("Dialog.Root | AlertDialog.Root"), Bn = class e {
	static create(t) {
		let n = zn.getOr(null);
		return zn.set(new e(t, n));
	}
	opts;
	#e = v(null);
	get triggerNode() {
		return S(this.#e);
	}
	set triggerNode(e) {
		l(this.#e, e, !0);
	}
	#t = v(null);
	get contentNode() {
		return S(this.#t);
	}
	set contentNode(e) {
		l(this.#t, e, !0);
	}
	#n = v(null);
	get overlayNode() {
		return S(this.#n);
	}
	set overlayNode(e) {
		l(this.#n, e, !0);
	}
	#r = v(null);
	get descriptionNode() {
		return S(this.#r);
	}
	set descriptionNode(e) {
		l(this.#r, e, !0);
	}
	#i = v(void 0);
	get contentId() {
		return S(this.#i);
	}
	set contentId(e) {
		l(this.#i, e, !0);
	}
	#a = v(void 0);
	get titleId() {
		return S(this.#a);
	}
	set titleId(e) {
		l(this.#a, e, !0);
	}
	#o = v(void 0);
	get triggerId() {
		return S(this.#o);
	}
	set triggerId(e) {
		l(this.#o, e, !0);
	}
	#s = v(void 0);
	get descriptionId() {
		return S(this.#s);
	}
	set descriptionId(e) {
		l(this.#s, e, !0);
	}
	#c = v(null);
	get cancelNode() {
		return S(this.#c);
	}
	set cancelNode(e) {
		l(this.#c, e, !0);
	}
	#l = v(0);
	get nestedOpenCount() {
		return S(this.#l);
	}
	set nestedOpenCount(e) {
		l(this.#l, e, !0);
	}
	depth;
	parent;
	contentPresence;
	overlayPresence;
	constructor(e, t) {
		this.opts = e, this.parent = t, this.depth = t ? t.depth + 1 : 0, this.handleOpen = this.handleOpen.bind(this), this.handleClose = this.handleClose.bind(this), this.contentPresence = new Ln({
			ref: Y(() => this.contentNode),
			open: this.opts.open,
			enabled: !0,
			onComplete: () => {
				this.opts.onOpenChangeComplete.current(this.opts.open.current);
			}
		}), this.overlayPresence = new Ln({
			ref: Y(() => this.overlayNode),
			open: this.opts.open,
			enabled: !0
		}), Z(() => this.opts.open.current, (e) => {
			this.parent && (e ? this.parent.incrementNested() : this.parent.decrementNested());
		}, { lazy: !0 }), Ht(() => {
			this.opts.open.current && this.parent?.decrementNested();
		});
	}
	handleOpen() {
		this.opts.open.current || (this.opts.open.current = !0);
	}
	handleClose() {
		this.opts.open.current && (this.opts.open.current = !1);
	}
	getBitsAttr = (e) => Rn.getAttr(e, this.opts.variant.current);
	incrementNested() {
		this.nestedOpenCount++, this.parent?.incrementNested();
	}
	decrementNested() {
		this.nestedOpenCount !== 0 && (this.nestedOpenCount--, this.parent?.decrementNested());
	}
	#u = _(() => ({ "data-state": ln(this.opts.open.current) }));
	get sharedProps() {
		return S(this.#u);
	}
	set sharedProps(e) {
		l(this.#u, e);
	}
}, Vn = class e {
	static create(t) {
		return new e(t, zn.get());
	}
	opts;
	root;
	attachment;
	constructor(e, t) {
		this.opts = e, this.root = t, this.attachment = an(this.opts.ref, (e) => {
			this.root.triggerNode = e, this.root.triggerId = e?.id;
		}), this.onclick = this.onclick.bind(this), this.onkeydown = this.onkeydown.bind(this);
	}
	onclick(e) {
		this.opts.disabled.current || e.button > 0 || this.root.handleOpen();
	}
	onkeydown(e) {
		this.opts.disabled.current || (e.key === " " || e.key === "Enter") && (e.preventDefault(), this.root.handleOpen());
	}
	#e = _(() => ({
		id: this.opts.id.current,
		"aria-haspopup": "dialog",
		"aria-expanded": on(this.root.opts.open.current),
		"aria-controls": this.root.contentId,
		[this.root.getBitsAttr("trigger")]: "",
		onkeydown: this.onkeydown,
		onclick: this.onclick,
		disabled: this.opts.disabled.current ? !0 : void 0,
		...this.root.sharedProps,
		...this.attachment
	}));
	get props() {
		return S(this.#e);
	}
	set props(e) {
		l(this.#e, e);
	}
}, Hn = class e {
	static create(t) {
		return new e(t, zn.get());
	}
	opts;
	root;
	attachment;
	constructor(e, t) {
		this.opts = e, this.root = t, this.attachment = an(this.opts.ref), this.onclick = this.onclick.bind(this), this.onkeydown = this.onkeydown.bind(this);
	}
	onclick(e) {
		this.opts.disabled.current || e.button > 0 || this.root.handleClose();
	}
	onkeydown(e) {
		this.opts.disabled.current || (e.key === " " || e.key === "Enter") && (e.preventDefault(), this.root.handleClose());
	}
	#e = _(() => ({
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
		return S(this.#e);
	}
	set props(e) {
		l(this.#e, e);
	}
}, Un = class e {
	static create(t) {
		return new e(t, zn.get());
	}
	opts;
	root;
	attachment;
	constructor(e, t) {
		this.opts = e, this.root = t, this.attachment = an(this.opts.ref);
	}
	#e = _(() => ({
		id: this.opts.id.current,
		[this.root.getBitsAttr("action")]: "",
		...this.root.sharedProps,
		...this.attachment
	}));
	get props() {
		return S(this.#e);
	}
	set props(e) {
		l(this.#e, e);
	}
}, Wn = class e {
	static create(t) {
		return new e(t, zn.get());
	}
	opts;
	root;
	attachment;
	constructor(e, t) {
		this.opts = e, this.root = t, this.root.titleId = this.opts.id.current, this.attachment = an(this.opts.ref), Z.pre(() => this.opts.id.current, (e) => {
			this.root.titleId = e;
		});
	}
	#e = _(() => ({
		id: this.opts.id.current,
		role: "heading",
		"aria-level": this.opts.level.current,
		[this.root.getBitsAttr("title")]: "",
		...this.root.sharedProps,
		...this.attachment
	}));
	get props() {
		return S(this.#e);
	}
	set props(e) {
		l(this.#e, e);
	}
}, Gn = class e {
	static create(t) {
		return new e(t, zn.get());
	}
	opts;
	root;
	attachment;
	constructor(e, t) {
		this.opts = e, this.root = t, this.root.descriptionId = this.opts.id.current, this.attachment = an(this.opts.ref, (e) => {
			this.root.descriptionNode = e;
		}), Z.pre(() => this.opts.id.current, (e) => {
			this.root.descriptionId = e;
		});
	}
	#e = _(() => ({
		id: this.opts.id.current,
		[this.root.getBitsAttr("description")]: "",
		...this.root.sharedProps,
		...this.attachment
	}));
	get props() {
		return S(this.#e);
	}
	set props(e) {
		l(this.#e, e);
	}
}, Kn = class e {
	static create(t) {
		return new e(t, zn.get());
	}
	opts;
	root;
	attachment;
	constructor(e, t) {
		this.opts = e, this.root = t, this.attachment = an(this.opts.ref, (e) => {
			this.root.contentNode = e, this.root.contentId = e?.id;
		});
	}
	#e = _(() => ({ open: this.root.opts.open.current }));
	get snippetProps() {
		return S(this.#e);
	}
	set snippetProps(e) {
		l(this.#e, e);
	}
	#t = _(() => ({
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
		"data-nested-open": sn(this.root.nestedOpenCount > 0),
		"data-nested": sn(this.root.parent !== null),
		...un(this.root.contentPresence.transitionStatus),
		...this.root.sharedProps,
		...this.attachment
	}));
	get props() {
		return S(this.#t);
	}
	set props(e) {
		l(this.#t, e);
	}
	get shouldRender() {
		return this.root.contentPresence.shouldRender;
	}
}, qn = class e {
	static create(t) {
		return new e(t, zn.get());
	}
	opts;
	root;
	attachment;
	constructor(e, t) {
		this.opts = e, this.root = t, this.attachment = an(this.opts.ref, (e) => this.root.overlayNode = e);
	}
	#e = _(() => ({ open: this.root.opts.open.current }));
	get snippetProps() {
		return S(this.#e);
	}
	set snippetProps(e) {
		l(this.#e, e);
	}
	#t = _(() => ({
		id: this.opts.id.current,
		[this.root.getBitsAttr("overlay")]: "",
		style: {
			pointerEvents: "auto",
			"--bits-dialog-depth": this.root.depth,
			"--bits-dialog-nested-count": this.root.nestedOpenCount
		},
		"data-nested-open": sn(this.root.nestedOpenCount > 0),
		"data-nested": sn(this.root.parent !== null),
		...un(this.root.overlayPresence.transitionStatus),
		...this.root.sharedProps,
		...this.attachment
	}));
	get props() {
		return S(this.#t);
	}
	set props(e) {
		l(this.#t, e);
	}
	get shouldRender() {
		return this.root.overlayPresence.shouldRender;
	}
}, Jn = class e {
	static create(t) {
		return new e(t, zn.get());
	}
	opts;
	root;
	attachment;
	constructor(e, t) {
		this.opts = e, this.root = t, this.attachment = an(this.opts.ref, (e) => this.root.cancelNode = e), this.onclick = this.onclick.bind(this), this.onkeydown = this.onkeydown.bind(this);
	}
	onclick(e) {
		this.opts.disabled.current || e.button > 0 || this.root.handleClose();
	}
	onkeydown(e) {
		this.opts.disabled.current || (e.key === " " || e.key === "Enter") && (e.preventDefault(), this.root.handleClose());
	}
	#e = _(() => ({
		id: this.opts.id.current,
		[this.root.getBitsAttr("cancel")]: "",
		onclick: this.onclick,
		onkeydown: this.onkeydown,
		tabindex: 0,
		disabled: this.opts.disabled.current,
		...this.root.sharedProps,
		...this.attachment
	}));
	get props() {
		return S(this.#e);
	}
	set props(e) {
		l(this.#e, e);
	}
};
// node_modules/bits-ui/dist/bits/alert-dialog/components/alert-dialog.svelte
function Yn(e, t) {
	f(t, !0);
	let n = K(t, "open", 15, !1), i = K(t, "onOpenChange", 3, Q), a = K(t, "onOpenChangeComplete", 3, Q);
	Bn.create({
		variant: Y(() => "alert-dialog"),
		open: Y(() => n(), (e) => {
			n(e), i()(e);
		}),
		onOpenChangeComplete: Y(() => a())
	});
	var o = F(), s = u(o);
	z(s, () => t.children ?? r), V(e, o), D();
}
// node_modules/bits-ui/dist/bits/dialog/components/dialog-title.svelte
var Xn = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"ref",
	"child",
	"children",
	"level"
]), Zn = B("<div><!></div>");
function Qn(e, t) {
	let n = P();
	f(t, !0);
	let i = K(t, "id", 19, () => $(n)), o = K(t, "ref", 15, null), s = K(t, "level", 3, 2), l = W(t, Xn), d = Wn.create({
		id: Y(() => i()),
		level: Y(() => s()),
		ref: Y(() => o(), (e) => o(e))
	}), p = _(() => X(l, d.props));
	var m = F(), h = u(m), g = (e) => {
		var n = F(), r = u(n);
		z(r, () => t.child, () => ({ props: S(p) })), V(e, n);
	}, v = (e) => {
		var n = Zn();
		q(n, () => ({ ...S(p) }));
		var i = c(n);
		z(i, () => t.children ?? r), a(n), V(e, n);
	};
	L(h, (e) => {
		t.child ? e(g) : e(v, -1);
	}), V(e, m), D();
}
// node_modules/bits-ui/dist/bits/alert-dialog/components/alert-dialog-action.svelte
var $n = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"children",
	"child",
	"id",
	"ref"
]), er = B("<button><!></button>");
function tr(e, t) {
	let n = P();
	f(t, !0);
	let i = K(t, "id", 19, () => $(n)), o = K(t, "ref", 15, null), s = W(t, $n), l = Un.create({
		id: Y(() => i()),
		ref: Y(() => o(), (e) => o(e))
	}), d = _(() => X(s, l.props));
	var p = F(), m = u(p), h = (e) => {
		var n = F(), r = u(n);
		z(r, () => t.child, () => ({ props: S(d) })), V(e, n);
	}, g = (e) => {
		var n = er();
		q(n, () => ({ ...S(d) }));
		var i = c(n);
		z(i, () => t.children ?? r), a(n), V(e, n);
	};
	L(m, (e) => {
		t.child ? e(h) : e(g, -1);
	}), V(e, p), D();
}
// node_modules/bits-ui/dist/bits/alert-dialog/components/alert-dialog-cancel.svelte
var nr = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"ref",
	"children",
	"child",
	"disabled"
]), rr = B("<button><!></button>");
function ir(e, t) {
	let n = P();
	f(t, !0);
	let i = K(t, "id", 19, () => $(n)), o = K(t, "ref", 15, null), s = K(t, "disabled", 3, !1), l = W(t, nr), d = Jn.create({
		id: Y(() => i()),
		ref: Y(() => o(), (e) => o(e)),
		disabled: Y(() => !!s())
	}), p = _(() => X(l, d.props));
	var m = F(), h = u(m), g = (e) => {
		var n = F(), r = u(n);
		z(r, () => t.child, () => ({ props: S(p) })), V(e, n);
	}, v = (e) => {
		var n = rr();
		q(n, () => ({ ...S(p) }));
		var i = c(n);
		z(i, () => t.children ?? r), a(n), V(e, n);
	};
	L(h, (e) => {
		t.child ? e(g) : e(v, -1);
	}), V(e, m), D();
}
// node_modules/bits-ui/dist/bits/utilities/portal/portal-consumer.svelte
function ar(e, t) {
	var n = F(), i = u(n);
	te(i, () => t.children, (e) => {
		var n = F(), i = u(n);
		z(i, () => t.children ?? r), V(e, n);
	}), V(e, n);
}
// node_modules/bits-ui/dist/bits/utilities/config/bits-config.js
var or = new It("BitsConfig");
function sr() {
	let e = new cr(null, {});
	return or.getOr(e).opts;
}
var cr = class {
	opts;
	constructor(e, t) {
		let n = lr(e, t);
		this.opts = {
			defaultPortalTo: n((e) => e.defaultPortalTo),
			defaultLocale: n((e) => e.defaultLocale)
		};
	}
};
function lr(e, t) {
	return (n) => Y(() => {
		let r = n(t)?.current;
		if (r !== void 0) return r;
		if (e !== null) return n(e.opts)?.current;
	});
}
// node_modules/bits-ui/dist/bits/utilities/config/prop-resolvers.js
function ur(e, t) {
	return (n) => {
		let r = sr();
		return Y(() => {
			let i = n();
			if (i !== void 0) return i;
			let a = e(r).current;
			return a === void 0 ? t : a;
		});
	};
}
var dr = ur((e) => e.defaultPortalTo, "body");
// node_modules/bits-ui/dist/bits/utilities/portal/portal.svelte
function fr(e, t) {
	f(t, !0);
	let n = dr(() => t.to), i = k(), a = _(o);
	function o() {
		if (!En || t.disabled) return null;
		let e = null;
		return e = typeof n.current == "string" ? document.querySelector(n.current) : n.current, e;
	}
	let s;
	function c() {
		s &&= (A(s), null);
	}
	Z([() => S(a), () => t.disabled], ([e, n]) => {
		if (!e || n) c();
		else return s = oe(ar, {
			target: e,
			props: { children: t.children },
			context: i
		}), () => {
			c();
		};
	});
	var l = F(), d = u(l), p = (e) => {
		var n = F(), i = u(n);
		z(i, () => t.children ?? r), V(e, n);
	};
	L(d, (e) => {
		t.disabled && e(p);
	}), V(e, l), D();
}
// node_modules/bits-ui/dist/internal/events.js
var pr = /* @__PURE__ */ new WeakMap();
function mr(e, t = e.composedPath()) {
	pr.set(e, t);
}
function hr(e) {
	return pr.get(e) ?? e.composedPath();
}
function gr(e, t) {
	return t ? jn(e.target) && t.contains(e.target) || hr(e).includes(t) : !1;
}
function _r(e, t) {
	for (let n of hr(e)) if (jn(n) && n.matches(t)) return n;
	return jn(e.target) ? e.target.closest(t) : null;
}
function vr(e, t) {
	mr(t, hr(e));
}
// node_modules/bits-ui/dist/internal/debounce.js
function yr(e, t = 500) {
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
// node_modules/bits-ui/dist/internal/elements.js
function br(e, t) {
	return e === t || e.contains(t);
}
function xr(e) {
	return e?.ownerDocument ?? document;
}
// node_modules/bits-ui/dist/internal/dom.js
function Sr(e, t) {
	let { clientX: n, clientY: r } = e, i = t.getBoundingClientRect();
	return n < i.left || n > i.right || r < i.top || r > i.bottom;
}
// node_modules/bits-ui/dist/bits/menu/context-menu-attributes.js
var Cr = "data-context-menu-trigger", wr = "data-context-menu-content";
// node_modules/bits-ui/dist/bits/utilities/dismissible-layer/use-dismissable-layer.svelte.js
globalThis.bitsDismissableLayers ??= /* @__PURE__ */ new Map();
var Tr = class e {
	static create(t) {
		return new e(t);
	}
	opts;
	#e = Q;
	#t = () => !1;
	#n = null;
	#r = Le("close");
	#i = { pointerdown: !1 };
	#a = !1;
	#o = null;
	#s = !1;
	#c = void 0;
	#l = Q;
	#u = Q;
	#d = !1;
	constructor(e) {
		this.opts = e, b(() => {
			this.#r.current = e.interactOutsideBehavior.current, this.#e = e.onInteractOutside.current, this.#l = e.onFocusOutside.current, this.#t = e.isValidEvent.current, this.#n = e.ref.current;
		});
		let t = Q, n = null, r = () => {
			n = null, this.#x(), globalThis.bitsDismissableLayers.delete(this), this.#g.destroy(), this.#u(), t();
		};
		Z([() => this.opts.enabled.current, () => this.opts.ref.current], ([e, i]) => {
			let a = e ? i : null;
			n !== a && (r(), a && (n = a, this.#c = xr(a), globalThis.bitsDismissableLayers.set(this, this.#r), t = this.#p()));
		}), Ht(() => {
			this.#d = !0, r();
		});
	}
	#f = (e) => {
		e.defaultPrevented || this.#d || !this.#n || Wt(() => {
			this.#d || this.#n && !this.#b(e.target) && e.target && !this.#s && this.#l?.(e);
		});
	};
	#p() {
		let e = this.#c, t = (e) => {
			C(() => {
				this.#g.flush(), this.#_(e), this.#y(e);
			});
		}, n = (e) => {
			e.cancelBubble || e !== this.#o || (this.#v(e), e.pointerType === "touch" ? (this.#g.destroy(), this.#h(e)) : this.#g(e));
		};
		return e.addEventListener("pointerdown", t, !0), e.addEventListener("pointerdown", n), yt(() => e.removeEventListener("pointerdown", t, !0), () => e.removeEventListener("pointerdown", n), H(e, "focusin", this.#f));
	}
	#m = (e) => {
		let t = e;
		t.defaultPrevented && (t = kr(e)), this.#e(e);
	};
	#h = (e) => {
		if (!this.#n) {
			this.#u();
			return;
		}
		let t = this.#t(e, this.#n) || Or(e, this.#n);
		if (!this.#a || this.#S() || !t) {
			this.#u();
			return;
		}
		let n = e;
		if (n.defaultPrevented && (n = kr(n)), this.#r.current !== "close" && this.#r.current !== "defer-otherwise-close") this.#u();
		else if (e.pointerType === "touch") {
			this.#u();
			let e = null, t = Q, n = (e) => {
				t(), this.#m(e);
			};
			t = yt(H(this.#c, "click", n, { once: !0 }), H(this.#c, "click", (t) => {
				mr(t), e = setTimeout(() => n(t), 0);
			}, {
				once: !0,
				capture: !0
			}), () => {
				e !== null && clearTimeout(e), e = null;
			}), this.#u = t;
		} else this.#e(n);
	};
	#g = yr(this.#h, 10);
	#_ = (e) => {
		this.#i[e.type] = !0;
	};
	#v = (e) => {
		this.#i[e.type] = !1;
	};
	#y = (e) => {
		this.#o = e, mr(e), this.#n && (this.#a = Dr(this));
	};
	#b = (e) => this.#n ? br(this.#n, e) : !1;
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
function Er(e = [...globalThis.bitsDismissableLayers]) {
	return e.findLast(([e, { current: t }]) => t === "close" || t === "ignore");
}
function Dr(e) {
	let t = [...globalThis.bitsDismissableLayers], n = Er(t);
	if (n) return n[0] === e;
	let [r] = t[0];
	return r === e;
}
function Or(e, t) {
	let n = e.target;
	if (!jn(n)) return !1;
	let r = !!_r(e, `[${Cr}]`), i = !!t.closest(`[${wr}]`);
	return "button" in e && e.button > 0 && !r ? !1 : "button" in e && e.button === 0 && r && i ? !0 : r && i ? !1 : xr(n).documentElement.contains(n) && !gr(e, t) && Sr(e, t);
}
function kr(e) {
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
	return vr(e, a), a;
}
// node_modules/bits-ui/dist/bits/utilities/dismissible-layer/dismissible-layer.svelte
function Ar(e, t) {
	f(t, !0);
	let n = K(t, "interactOutsideBehavior", 3, "close"), i = K(t, "onInteractOutside", 3, Q), a = K(t, "onFocusOutside", 3, Q), o = K(t, "isValidEvent", 3, () => !1), s = Tr.create({
		id: Y(() => t.id),
		interactOutsideBehavior: Y(() => n()),
		onInteractOutside: Y(() => i()),
		enabled: Y(() => t.enabled),
		onFocusOutside: Y(() => a()),
		isValidEvent: Y(() => o()),
		ref: C(() => t.ref)
	});
	var c = F(), l = u(c);
	z(l, () => t.children ?? r, () => ({ props: s.props })), V(e, c), D();
}
// node_modules/bits-ui/dist/bits/utilities/escape-layer/use-escape-layer.svelte.js
globalThis.bitsEscapeLayers ??= /* @__PURE__ */ new Map();
var jr = class e {
	static create(t) {
		return new e(t);
	}
	opts;
	domContext;
	constructor(e) {
		this.opts = e, this.domContext = new rn(this.opts.ref);
		let t = Q;
		Z(() => e.enabled.current, (n) => (n && (globalThis.bitsEscapeLayers.set(this, e.escapeKeydownBehavior), t = this.#e()), () => {
			t(), globalThis.bitsEscapeLayers.delete(this);
		}));
	}
	#e = () => H(this.domContext.getDocument(), "keydown", this.#t, { passive: !1 });
	#t = (e) => {
		if (e.key !== "Escape" || !Mr(this)) return;
		let t = new KeyboardEvent(e.type, e);
		e.preventDefault();
		let n = this.opts.escapeKeydownBehavior.current;
		(n === "close" || n === "defer-otherwise-close") && this.opts.onEscapeKeydown.current(t);
	};
};
function Mr(e) {
	let t = [...globalThis.bitsEscapeLayers], n = t.findLast(([e, { current: t }]) => t === "close" || t === "ignore");
	if (n) return n[0] === e;
	let [r] = t[0];
	return r === e;
}
// node_modules/bits-ui/dist/bits/utilities/escape-layer/escape-layer.svelte
function Nr(e, t) {
	f(t, !0);
	let n = K(t, "escapeKeydownBehavior", 3, "close"), i = K(t, "onEscapeKeydown", 3, Q);
	jr.create({
		escapeKeydownBehavior: Y(() => n()),
		onEscapeKeydown: Y(() => i()),
		enabled: Y(() => t.enabled),
		ref: C(() => t.ref)
	});
	var a = F(), o = u(a);
	z(o, () => t.children ?? r), V(e, a), D();
}
// node_modules/bits-ui/dist/bits/utilities/focus-scope/focus-scope-manager.js
var Pr = class e {
	static instance;
	#e = Le([]);
	#t = /* @__PURE__ */ new WeakMap();
	#n = /* @__PURE__ */ new WeakMap();
	static getInstance() {
		return this.instance ||= new e(), this.instance;
	}
	register(e) {
		let t = this.getActive();
		t && t !== e && t.pause();
		let n = nn(document);
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
}, Fr = [
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
], Ir = /* #__PURE__ */ Fr.join(","), Lr = typeof Element > "u", Rr = Lr ? function() {} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector, zr = !Lr && Element.prototype.getRootNode ? function(e) {
	return e == null || e.getRootNode == null ? void 0 : e.getRootNode();
} : function(e) {
	return e?.ownerDocument;
}, Br = function(e, t) {
	t === void 0 && (t = !0);
	var n = e == null || e.getAttribute == null ? void 0 : e.getAttribute("inert");
	return n === "" || n === "true" || t && e && (typeof e.closest == "function" ? e.closest("[inert]") : Br(e.parentNode));
}, Vr = function(e) {
	var t, n = e == null || e.getAttribute == null || (t = e.getAttribute("contenteditable")) == null ? void 0 : t.toLowerCase();
	return n === "" || n === "true" || n === "plaintext-only";
}, Hr = function(e, t, n) {
	if (Br(e)) return [];
	var r = Array.prototype.slice.apply(e.querySelectorAll(Ir));
	return t && Rr.call(e, Ir) && r.unshift(e), r = r.filter(n), r;
}, Ur = function(e, t, n) {
	for (var r = [], i = Array.from(e); i.length;) {
		var a = i.shift();
		if (!Br(a, !1)) {
			if (a.tagName === "SLOT") {
				var o = a.assignedElements(), s = Ur(o.length ? o : a.children, !0, n);
				n.flatten ? r.push.apply(r, s) : r.push({
					scopeParent: a,
					candidates: s
				});
			} else {
				Rr.call(a, Ir) && n.filter(a) && (t || !e.includes(a)) && r.push(a);
				var c = a.shadowRoot || typeof n.getShadowRoot == "function" && n.getShadowRoot(a), l = !Br(c, !1) && (!n.shadowRootFilter || n.shadowRootFilter(a));
				if (c && l) {
					var u = Ur(c === !0 ? a.children : c.children, !0, n);
					n.flatten ? r.push.apply(r, u) : r.push({
						scopeParent: a,
						candidates: u
					});
				} else i.unshift.apply(i, a.children);
			}
		}
	}
	return r;
}, Wr = function(e) {
	return !isNaN(parseInt(e.getAttribute("tabindex"), 10));
}, Gr = function(e) {
	if (!e) throw Error("No node provided");
	return e.tabIndex < 0 && (/^(AUDIO|VIDEO|DETAILS)$/.test(e.tagName) || Vr(e)) && !Wr(e) ? 0 : e.tabIndex;
}, Kr = function(e, t) {
	var n = Gr(e);
	return n < 0 && t && !Wr(e) ? 0 : n;
}, qr = function(e, t) {
	return e.tabIndex === t.tabIndex ? e.documentOrder - t.documentOrder : e.tabIndex - t.tabIndex;
}, Jr = function(e) {
	return e.tagName === "INPUT";
}, Yr = function(e) {
	return Jr(e) && e.type === "hidden";
}, Xr = function(e) {
	return e.tagName === "DETAILS" && Array.prototype.slice.apply(e.children).some(function(e) {
		return e.tagName === "SUMMARY";
	});
}, Zr = function(e, t) {
	for (var n = 0; n < e.length; n++) if (e[n].checked && e[n].form === t) return e[n];
}, Qr = function(e) {
	if (!e.name) return !0;
	var t = e.form || zr(e), n = function(e) {
		return t.querySelectorAll("input[type=\"radio\"][name=\"" + e + "\"]");
	}, r;
	if (typeof window < "u" && window.CSS !== void 0 && typeof window.CSS.escape == "function") r = n(window.CSS.escape(e.name));
	else try {
		r = n(e.name);
	} catch (e) {
		return console.error("Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s", e.message), !1;
	}
	var i = Zr(r, e.form);
	return !i || i === e;
}, $r = function(e) {
	return Jr(e) && e.type === "radio";
}, ei = function(e) {
	return $r(e) && !Qr(e);
}, ti = function(e) {
	var t = e && zr(e), n = t?.host, r = !1;
	if (t && t !== e) {
		var i, a;
		for (r = !!((i = n) != null && (i = i.ownerDocument) != null && i.contains(n) || e != null && (a = e.ownerDocument) != null && a.contains(e)); !r && n;) {
			var o;
			t = zr(n), n = t?.host, r = !!((o = n) != null && (o = o.ownerDocument) != null && o.contains(n));
		}
	}
	return r;
}, ni = function(e) {
	var t = e.getBoundingClientRect(), n = t.width, r = t.height;
	return n === 0 && r === 0;
}, ri = function(e, t) {
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
	var a = Rr.call(e, "details>summary:first-of-type") ? e.parentElement : e;
	if (Rr.call(a, "details:not([open]) *")) return !0;
	if (!n || n === "full" || n === "full-native" || n === "legacy-full") {
		if (typeof r == "function") {
			for (var o = e; e;) {
				var s = e.parentElement, c = zr(e);
				if (s && !s.shadowRoot && r(s) === !0) return ni(e);
				e = e.assignedSlot ? e.assignedSlot : !s && c !== e.ownerDocument ? c.host : s;
			}
			e = o;
		}
		if (ti(e)) return !e.getClientRects().length;
		if (n !== "legacy-full") return !0;
	} else if (n === "non-zero-area") return ni(e);
	return !1;
}, ii = function(e) {
	if (/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(e.tagName)) for (var t = e.parentElement; t;) {
		if (t.tagName === "FIELDSET" && t.disabled) {
			for (var n = 0; n < t.children.length; n++) {
				var r = t.children.item(n);
				if (r.tagName === "LEGEND") return Rr.call(t, "fieldset[disabled] *") ? !0 : !r.contains(e);
			}
			return !0;
		}
		t = t.parentElement;
	}
	return !1;
}, ai = function(e, t) {
	return !(t.disabled || Yr(t) || ri(t, e) || Xr(t) || ii(t));
}, oi = function(e, t) {
	return !(ei(t) || Gr(t) < 0 || !ai(e, t));
}, si = function(e) {
	var t = parseInt(e.getAttribute("tabindex"), 10);
	return !!(isNaN(t) || t >= 0);
}, ci = function(e) {
	var t = [], n = [];
	return e.forEach(function(e, r) {
		var i = !!e.scopeParent, a = i ? e.scopeParent : e, o = Kr(a, i), s = i ? ci(e.candidates) : a;
		o === 0 ? i ? t.push.apply(t, s) : t.push(a) : n.push({
			documentOrder: r,
			tabIndex: o,
			item: e,
			isScope: i,
			content: s
		});
	}), n.sort(qr).reduce(function(e, t) {
		return t.isScope ? e.push.apply(e, t.content) : e.push(t.content), e;
	}, []).concat(t);
}, li = function(e, t) {
	return t ||= {}, ci(t.getShadowRoot ? Ur([e], t.includeContainer, {
		filter: oi.bind(null, t),
		flatten: !1,
		getShadowRoot: t.getShadowRoot,
		shadowRootFilter: si
	}) : Hr(e, t.includeContainer, oi.bind(null, t)));
}, ui = function(e, t) {
	return t ||= {}, t.getShadowRoot ? Ur([e], t.includeContainer, {
		filter: ai.bind(null, t),
		flatten: !0,
		getShadowRoot: t.getShadowRoot
	}) : Hr(e, t.includeContainer, ai.bind(null, t));
}, di = /* #__PURE__ */ Fr.concat("iframe:not([inert]):not([inert] *)").join(","), fi = function(e, t) {
	if (t ||= {}, !e) throw Error("No node provided");
	return Rr.call(e, di) !== !1 && ai(t, e);
};
// node_modules/bits-ui/dist/bits/utilities/focus-scope/focus-scope.svelte.js
function pi(e, t) {
	let n = t.getRootNode();
	for (; e;) {
		let t = e.getRootNode();
		if (t === n) return e;
		e = t !== e && "host" in t ? t.host : null;
	}
	return null;
}
var mi = class e {
	#e = !1;
	#t = null;
	#n = Pr.getInstance();
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
			if (!this.#t || this.#e || !this.#n.isActiveScope(this) || this.#t.contains(pi(nn(this.#t.ownerDocument), this.#t))) return;
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
		this.#r.push(H(t, "focusin", (t) => {
			if (this.#e || !this.#n.isActiveScope(this)) return;
			let n = pi(t.composedPath()[0], e);
			if (n !== null && e.contains(n)) this.#n.setFocusMemory(this, n);
			else {
				let n = this.#n.getFocusMemory(this);
				if (n && e.contains(n) && fi(n)) t.preventDefault(), n.focus({ preventScroll: !0 });
				else {
					let t = this.#u(), n = this.#d()[0];
					(t || n || e).focus({ preventScroll: !0 });
				}
			}
		}, { capture: !0 }), H(e, "keydown", (e) => {
			if (!this.#i.loop || this.#e || e.key !== "Tab" || !this.#n.isActiveScope(this)) return;
			let n = this.#l();
			if (n.length === 0) return;
			let r = n[0], i = n[n.length - 1];
			!e.shiftKey && nn(t) === i ? (e.preventDefault(), r.focus()) : e.shiftKey && nn(t) === r && (e.preventDefault(), i.focus());
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
		return this.#t ? li(this.#t, {
			includeContainer: !1,
			getShadowRoot: !0
		}) : [];
	}
	#u() {
		return this.#l()[0] || null;
	}
	#d() {
		return this.#t ? ui(this.#t, {
			includeContainer: !1,
			getShadowRoot: !0
		}) : [];
	}
	static use(t) {
		let n = null;
		return Z([() => t.ref.current, () => t.enabled.current], ([r, i]) => {
			r && i ? (n ||= new e(t), n.mount(r)) : n &&= (n.unmount(), null);
		}), Ht(() => {
			n?.unmount();
		}), { get props() {
			return { tabindex: -1 };
		} };
	}
};
// node_modules/bits-ui/dist/bits/utilities/focus-scope/focus-scope.svelte
function hi(e, t) {
	f(t, !0);
	let n = K(t, "enabled", 3, !1), i = K(t, "trapFocus", 3, !1), a = K(t, "loop", 3, !1), o = K(t, "onCloseAutoFocus", 3, Q), s = K(t, "onOpenAutoFocus", 3, Q), c = mi.use({
		enabled: Y(() => n()),
		trap: Y(() => i()),
		loop: C(() => a()),
		onCloseAutoFocus: Y(() => o()),
		onOpenAutoFocus: Y(() => s()),
		ref: C(() => t.ref)
	});
	var l = F(), d = u(l);
	z(d, () => t.focusScope ?? r, () => ({ props: c.props })), V(e, l), D();
}
// node_modules/bits-ui/dist/bits/utilities/text-selection-layer/use-text-selection-layer.svelte.js
var gi = () => {};
globalThis.bitsTextSelectionLayers ??= /* @__PURE__ */ new Map();
var _i = class e {
	static create(t) {
		return new e(t);
	}
	opts;
	domContext;
	#e = Q;
	#t = !1;
	#n = gi;
	#r = gi;
	constructor(e) {
		this.opts = e, this.domContext = new rn(e.ref);
		let t = Q;
		Z(() => [
			this.opts.enabled.current,
			this.opts.onPointerDown.current,
			this.opts.onPointerUp.current
		], ([e, n, r]) => (this.#t = e, this.#n = n, this.#r = r, e && (globalThis.bitsTextSelectionLayers.set(this, this.opts.enabled), t(), t = this.#i()), () => {
			this.#t = !1, t(), this.#s(), globalThis.bitsTextSelectionLayers.delete(this);
		}));
	}
	#i() {
		return yt(H(this.domContext.getDocument(), "pointerdown", this.#o), H(this.domContext.getDocument(), "pointerup", this.#a));
	}
	#a = (e) => {
		this.#s(), e.defaultPrevented || this.#r(e);
	};
	#o = (e) => {
		if (!this.#t) return;
		this.#s();
		let t = this.opts.ref.current, n = e.target;
		kn(t) && kn(n) && xi(this) && $t(t, n) && (this.#n(e), e.defaultPrevented || (this.#e = yi(t, this.domContext.getDocument().body)));
	};
	#s = () => {
		this.#e(), this.#e = Q;
	};
}, vi = (e) => e.style.userSelect || e.style.webkitUserSelect;
function yi(e, t) {
	let n = vi(t), r = vi(e);
	return bi(t, "none"), bi(e, "text"), () => {
		bi(t, n), bi(e, r);
	};
}
function bi(e, t) {
	e.style.userSelect = t, e.style.webkitUserSelect = t;
}
function xi(e) {
	let t = [...globalThis.bitsTextSelectionLayers];
	if (!t.length) return !1;
	let n = t.at(-1);
	return n ? n[0] === e : !1;
}
// node_modules/bits-ui/dist/bits/utilities/text-selection-layer/text-selection-layer.svelte
function Si(e, t) {
	f(t, !0);
	let n = K(t, "preventOverflowTextSelection", 3, !0), i = K(t, "onPointerDown", 3, Q), a = K(t, "onPointerUp", 3, Q);
	_i.create({
		id: Y(() => t.id),
		onPointerDown: Y(() => i()),
		onPointerUp: Y(() => a()),
		enabled: Y(() => t.enabled && n()),
		ref: C(() => t.ref)
	});
	var o = F(), s = u(o);
	z(s, () => t.children ?? r), V(e, o), D();
}
// node_modules/bits-ui/dist/internal/use-id.js
globalThis.bitsIdCounter ??= { current: 0 };
function Ci(e = "bits") {
	return globalThis.bitsIdCounter.current++, `${e}-${globalThis.bitsIdCounter.current}`;
}
// node_modules/bits-ui/dist/internal/shared-state.svelte.js
var wi = class {
	#e;
	#t = 0;
	#n = v();
	#r;
	constructor(e) {
		this.#e = e;
	}
	#i() {
		--this.#t, this.#r && this.#t <= 0 && (this.#r(), l(this.#n, void 0), this.#r = void 0);
	}
	get(...e) {
		return this.#t += 1, S(this.#n) === void 0 && (this.#r = d(() => {
			l(this.#n, this.#e(...e), !0);
		})), t(() => () => {
			this.#i();
		}), S(this.#n);
	}
}, Ti = new At(), Ei = /* @__PURE__ */ new Map(), Di = [
	"padding-right",
	"margin-right",
	"overflow",
	"overflow-x",
	"overflow-y",
	"pointer-events",
	"--scrollbar-width"
], Oi = null, ki = !1, Ai = /* @__PURE__ */ new Set(), ji = null, Mi = null, Ni = !1;
function Pi(e, t, n) {
	e.setProperty(t, n), Ai.add(t), t === "overflow" && (Ai.add("overflow-x"), Ai.add("overflow-y"));
}
var Fi = Y(() => {
	for (let e of Ti.values()) if (e) return !0;
	return !1;
}), Ii = Y(() => {
	for (let [e, t] of Ti) if (t && (Ei.get(e)?.() ?? !0)) return !0;
	return !1;
}), Li = null, Ri = new wi(() => {
	function e(e, t) {
		let n = Oi?.get(t);
		n?.value ? e.body.style.setProperty(t, n.value, n.priority) : e.body.style.removeProperty(t);
	}
	function t(t) {
		for (let n of Di) Ai.has(n) && e(t, n);
		!ki && t.body.style.length === 0 && t.body.removeAttribute("style"), Oi = null, Ai.clear(), Dn && ji?.();
	}
	function n(t) {
		Ai.delete("pointer-events") && e(t, "pointer-events");
	}
	function r() {
		Mi !== null && (window.clearTimeout(Mi), Mi = null);
	}
	function i(e, t) {
		r(), Ni = !0, Li = Date.now();
		let n = Li, i = () => {
			Mi = null, Li === n && (Bi(Ti) ? Ni = !1 : (Ni = !1, t()));
		}, a = e === null ? 24 : e;
		Mi = window.setTimeout(i, a);
	}
	function a() {
		if (Oi === null && Ti.size === 0 && !Ni) {
			ki = document.body.hasAttribute("style"), Oi = /* @__PURE__ */ new Map();
			for (let e of Di) Oi.set(e, {
				value: document.body.style.getPropertyValue(e),
				priority: document.body.style.getPropertyPriority(e)
			});
		}
	}
	return Z(() => Fi.current, () => {
		if (!Fi.current) return;
		a(), Ni = !1;
		let e = getComputedStyle(document.documentElement), t = getComputedStyle(document.body), n = e.scrollbarGutter?.includes("stable") || t.scrollbarGutter?.includes("stable"), r = window.innerWidth - document.documentElement.clientWidth, i = {
			padding: Number.parseInt(t.paddingRight ?? "0", 10) + r,
			margin: Number.parseInt(t.marginRight ?? "0", 10)
		};
		r > 0 && !n && (Pi(document.body.style, "padding-right", `${i.padding}px`), Pi(document.body.style, "margin-right", `${i.margin}px`), Pi(document.body.style, "--scrollbar-width", `${r}px`)), Pi(document.body.style, "overflow", "hidden"), Dn && (ji = H(document, "touchmove", (e) => {
			e.target === document.documentElement && (e.touches.length > 1 || e.preventDefault());
		}, { passive: !1 })), Wt(() => {
			Ii.current && Pi(document.body.style, "pointer-events", "none"), Pi(document.body.style, "overflow", "hidden");
		});
	}), Z(() => Ii.current, () => {
		Fi.current && Wt(() => {
			Fi.current && (Ii.current ? Pi(document.body.style, "pointer-events", "none") : n(document));
		});
	}, { lazy: !0 }), Ht(() => () => {
		ji?.();
	}), {
		get lockMap() {
			return Ti;
		},
		resetBodyStyle: t,
		restorePointerEvents: n,
		scheduleCleanupIfNoNewLocks: i,
		cancelPendingCleanup: r,
		ensureInitialStyleCaptured: a
	};
}), zi = class {
	#e = Ci();
	#t;
	#n = () => null;
	#r;
	locked;
	constructor(e, t = () => null, n = () => !0) {
		this.#t = e, this.#n = t, this.#r = Ri.get(), this.#r && (this.#r.cancelPendingCleanup(), this.#r.ensureInitialStyleCaptured(), Ei.set(this.#e, n), this.#r.lockMap.set(this.#e, this.#t ?? !1), this.locked = Y(() => this.#r.lockMap.get(this.#e) ?? !1, (e) => this.#r.lockMap.set(this.#e, e)), Ht(() => {
			if (this.#r.lockMap.delete(this.#e), Ei.delete(this.#e), Bi(this.#r.lockMap)) return;
			let e = this.#n(), t = document;
			this.#r.restorePointerEvents(t), this.#r.scheduleCleanupIfNoNewLocks(e, () => {
				this.#r.resetBodyStyle(t);
			});
		}));
	}
};
function Bi(e) {
	for (let [t, n] of e) if (n) return !0;
	return !1;
}
// node_modules/bits-ui/dist/bits/utilities/scroll-lock/scroll-lock.svelte
function Vi(e, t) {
	f(t, !0);
	let n = K(t, "preventScroll", 3, !0), r = K(t, "restoreScrollDelay", 3, null), i = K(t, "blockPointer", 3, () => !0);
	C(() => {
		n() && new zi(n(), () => r(), i());
	}), D();
}
// node_modules/bits-ui/dist/bits/alert-dialog/components/alert-dialog-content.svelte
var Hi = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"children",
	"child",
	"ref",
	"forceMount",
	"interactOutsideBehavior",
	"onCloseAutoFocus",
	"onEscapeKeydown",
	"onOpenAutoFocus",
	"onInteractOutside",
	"preventScroll",
	"preventOverflowTextSelection",
	"trapFocus",
	"restoreScrollDelay",
	"preventBodyPointerEvents"
]), Ui = B("<!> <!>", 1), Wi = B("<!> <div><!></div>", 1);
function Gi(e, t) {
	let n = P();
	f(t, !0);
	let i = K(t, "id", 19, () => $(n)), s = K(t, "ref", 15, null), l = K(t, "forceMount", 3, !1), d = K(t, "interactOutsideBehavior", 3, "ignore"), p = K(t, "onCloseAutoFocus", 3, Q), m = K(t, "onEscapeKeydown", 3, Q), h = K(t, "onOpenAutoFocus", 3, Q), g = K(t, "onInteractOutside", 3, Q), v = K(t, "preventScroll", 3, !0), y = K(t, "preventOverflowTextSelection", 3, !0), b = K(t, "trapFocus", 3, !0), x = K(t, "restoreScrollDelay", 3, null), C = K(t, "preventBodyPointerEvents", 3, !0), w = W(t, Hi), T = Kn.create({
		id: Y(() => i()),
		ref: Y(() => s(), (e) => s(e))
	}), E = () => C() || !T.root.overlayNode, O = _(() => X(w, T.props));
	var k = F(), A = u(k), j = (e) => {
		hi(e, {
			get ref() {
				return T.opts.ref;
			},
			loop: !0,
			get trapFocus() {
				return b();
			},
			get enabled() {
				return T.root.opts.open.current;
			},
			get onCloseAutoFocus() {
				return p();
			},
			onOpenAutoFocus: (e) => {
				if (h()(e), e.defaultPrevented) return;
				e.preventDefault();
				let t = T.opts.ref.current;
				Ut(0, () => {
					t?.isConnected && t.focus();
				});
			},
			focusScope: (e, n) => {
				let i = () => (n?.()).props;
				Nr(e, me(() => S(O), {
					get enabled() {
						return T.root.opts.open.current;
					},
					get ref() {
						return T.opts.ref;
					},
					onEscapeKeydown: (e) => {
						m()(e), e.defaultPrevented || T.root.handleClose();
					},
					children: (e, n) => {
						Ar(e, me(() => S(O), {
							get ref() {
								return T.opts.ref;
							},
							get enabled() {
								return T.root.opts.open.current;
							},
							get interactOutsideBehavior() {
								return d();
							},
							onInteractOutside: (e) => {
								g()(e), e.defaultPrevented || T.root.handleClose();
							},
							children: (e, n) => {
								Si(e, me(() => S(O), {
									get preventOverflowTextSelection() {
										return y();
									},
									get ref() {
										return T.opts.ref;
									},
									get enabled() {
										return T.root.opts.open.current;
									},
									children: (e, n) => {
										var s = F(), l = u(s), d = (e) => {
											var n = Ui(), r = u(n), a = (e) => {
												Vi(e, {
													get preventScroll() {
														return v();
													},
													get restoreScrollDelay() {
														return x();
													},
													blockPointer: E
												});
											};
											L(r, (e) => {
												T.root.opts.open.current && e(a);
											});
											var s = o(r, 2);
											{
												let e = _(() => ({
													props: X(S(O), i()),
													...T.snippetProps
												}));
												z(s, () => t.child, () => S(e));
											}
											V(e, n);
										}, f = (e) => {
											var n = Wi(), s = u(n);
											Vi(s, {
												get preventScroll() {
													return v();
												},
												blockPointer: E
											});
											var l = o(s, 2);
											q(l, (e) => ({ ...e }), [() => X(S(O), i())]);
											var d = c(l);
											z(d, () => t.children ?? r), a(l), V(e, n);
										};
										L(l, (e) => {
											t.child ? e(d) : e(f, -1);
										}), V(e, s);
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
	L(A, (e) => {
		(T.shouldRender || l()) && e(j);
	}), V(e, k), D();
}
// node_modules/bits-ui/dist/bits/dialog/components/dialog-overlay.svelte
var Ki = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"forceMount",
	"child",
	"children",
	"ref"
]), qi = B("<div><!></div>");
function Ji(e, t) {
	let n = P();
	f(t, !0);
	let i = K(t, "id", 19, () => $(n)), o = K(t, "forceMount", 3, !1), s = K(t, "ref", 15, null), l = W(t, Ki), d = qn.create({
		id: Y(() => i()),
		ref: Y(() => s(), (e) => s(e))
	}), p = _(() => X(l, d.props));
	var m = F(), h = u(m), g = (e) => {
		var n = F(), i = u(n), o = (e) => {
			var n = F(), r = u(n);
			{
				let e = _(() => ({
					props: X(S(p)),
					...d.snippetProps
				}));
				z(r, () => t.child, () => S(e));
			}
			V(e, n);
		}, s = (e) => {
			var n = qi();
			q(n, (e) => ({ ...e }), [() => X(S(p))]);
			var i = c(n);
			z(i, () => t.children ?? r, () => d.snippetProps), a(n), V(e, n);
		};
		L(i, (e) => {
			t.child ? e(o) : e(s, -1);
		}), V(e, n);
	};
	L(h, (e) => {
		(d.shouldRender || o()) && e(g);
	}), V(e, m), D();
}
// node_modules/bits-ui/dist/bits/dialog/components/dialog-trigger.svelte
var Yi = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"ref",
	"children",
	"child",
	"disabled"
]), Xi = B("<button><!></button>");
function Zi(e, t) {
	let n = P();
	f(t, !0);
	let i = K(t, "id", 19, () => $(n)), o = K(t, "ref", 15, null), s = K(t, "disabled", 3, !1), l = W(t, Yi), d = Vn.create({
		id: Y(() => i()),
		ref: Y(() => o(), (e) => o(e)),
		disabled: Y(() => !!s())
	}), p = _(() => X(l, d.props));
	var m = F(), h = u(m), g = (e) => {
		var n = F(), r = u(n);
		z(r, () => t.child, () => ({ props: S(p) })), V(e, n);
	}, v = (e) => {
		var n = Xi();
		q(n, () => ({ ...S(p) }));
		var i = c(n);
		z(i, () => t.children ?? r), a(n), V(e, n);
	};
	L(h, (e) => {
		t.child ? e(g) : e(v, -1);
	}), V(e, m), D();
}
// node_modules/bits-ui/dist/bits/dialog/components/dialog-description.svelte
var Qi = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"children",
	"child",
	"ref"
]), $i = B("<div><!></div>");
function ea(e, t) {
	let n = P();
	f(t, !0);
	let i = K(t, "id", 19, () => $(n)), o = K(t, "ref", 15, null), s = W(t, Qi), l = Gn.create({
		id: Y(() => i()),
		ref: Y(() => o(), (e) => o(e))
	}), d = _(() => X(s, l.props));
	var p = F(), m = u(p), h = (e) => {
		var n = F(), r = u(n);
		z(r, () => t.child, () => ({ props: S(d) })), V(e, n);
	}, g = (e) => {
		var n = $i();
		q(n, () => ({ ...S(d) }));
		var i = c(n);
		z(i, () => t.children ?? r), a(n), V(e, n);
	};
	L(m, (e) => {
		t.child ? e(h) : e(g, -1);
	}), V(e, p), D();
}
// node_modules/bits-ui/dist/bits/dialog/components/dialog.svelte
function ta(e, t) {
	f(t, !0);
	let n = K(t, "open", 15, !1), i = K(t, "onOpenChange", 3, Q), a = K(t, "onOpenChangeComplete", 3, Q);
	Bn.create({
		variant: Y(() => "dialog"),
		open: Y(() => n(), (e) => {
			n(e), i()(e);
		}),
		onOpenChangeComplete: Y(() => a())
	});
	var o = F(), s = u(o);
	z(s, () => t.children ?? r), V(e, o), D();
}
// node_modules/bits-ui/dist/bits/dialog/components/dialog-close.svelte
var na = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"children",
	"child",
	"id",
	"ref",
	"disabled"
]), ra = B("<button><!></button>");
function ia(e, t) {
	let n = P();
	f(t, !0);
	let i = K(t, "id", 19, () => $(n)), o = K(t, "ref", 15, null), s = K(t, "disabled", 3, !1), l = W(t, na), d = Hn.create({
		variant: Y(() => "close"),
		id: Y(() => i()),
		ref: Y(() => o(), (e) => o(e)),
		disabled: Y(() => !!s())
	}), p = _(() => X(l, d.props));
	var m = F(), h = u(m), g = (e) => {
		var n = F(), r = u(n);
		z(r, () => t.child, () => ({ props: S(p) })), V(e, n);
	}, v = (e) => {
		var n = ra();
		q(n, () => ({ ...S(p) }));
		var i = c(n);
		z(i, () => t.children ?? r), a(n), V(e, n);
	};
	L(h, (e) => {
		t.child ? e(g) : e(v, -1);
	}), V(e, m), D();
}
// node_modules/bits-ui/dist/bits/dialog/components/dialog-content.svelte
var aa = /* @__PURE__ */ new Set([
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
]), oa = B("<!> <!>", 1), sa = B("<!> <div><!></div>", 1);
function ca(e, t) {
	let n = P();
	f(t, !0);
	let i = K(t, "id", 19, () => $(n)), s = K(t, "ref", 15, null), l = K(t, "forceMount", 3, !1), d = K(t, "onCloseAutoFocus", 3, Q), p = K(t, "onOpenAutoFocus", 3, Q), m = K(t, "onEscapeKeydown", 3, Q), h = K(t, "onInteractOutside", 3, Q), g = K(t, "trapFocus", 3, !0), v = K(t, "preventScroll", 3, !0), y = K(t, "preventOverflowTextSelection", 3, !0), b = K(t, "restoreScrollDelay", 3, null), x = K(t, "preventBodyPointerEvents", 3, !0), C = W(t, aa), w = Kn.create({
		id: Y(() => i()),
		ref: Y(() => s(), (e) => s(e))
	}), T = () => x() || !w.root.overlayNode, E = _(() => X(C, w.props));
	var O = F(), k = u(O), A = (e) => {
		hi(e, {
			get ref() {
				return w.opts.ref;
			},
			loop: !0,
			get trapFocus() {
				return g();
			},
			get enabled() {
				return w.root.opts.open.current;
			},
			get onOpenAutoFocus() {
				return p();
			},
			get onCloseAutoFocus() {
				return d();
			},
			focusScope: (e, n) => {
				let i = () => (n?.()).props;
				Nr(e, me(() => S(E), {
					get enabled() {
						return w.root.opts.open.current;
					},
					get ref() {
						return w.opts.ref;
					},
					onEscapeKeydown: (e) => {
						m()(e), e.defaultPrevented || w.root.handleClose();
					},
					children: (e, n) => {
						Ar(e, me(() => S(E), {
							get ref() {
								return w.opts.ref;
							},
							get enabled() {
								return w.root.opts.open.current;
							},
							onInteractOutside: (e) => {
								h()(e), e.defaultPrevented || w.root.handleClose();
							},
							children: (e, n) => {
								Si(e, me(() => S(E), {
									get preventOverflowTextSelection() {
										return y();
									},
									get ref() {
										return w.opts.ref;
									},
									get enabled() {
										return w.root.opts.open.current;
									},
									children: (e, n) => {
										var s = F(), l = u(s), d = (e) => {
											var n = oa(), r = u(n), a = (e) => {
												Vi(e, {
													get preventScroll() {
														return v();
													},
													get restoreScrollDelay() {
														return b();
													},
													blockPointer: T
												});
											};
											L(r, (e) => {
												w.root.opts.open.current && e(a);
											});
											var s = o(r, 2);
											{
												let e = _(() => ({
													props: X(S(E), i()),
													...w.snippetProps
												}));
												z(s, () => t.child, () => S(e));
											}
											V(e, n);
										}, f = (e) => {
											var n = sa(), s = u(n);
											Vi(s, {
												get preventScroll() {
													return v();
												},
												blockPointer: T
											});
											var l = o(s, 2);
											q(l, (e) => ({ ...e }), [() => X(S(E), i())]);
											var d = c(l);
											z(d, () => t.children ?? r), a(l), V(e, n);
										};
										L(l, (e) => {
											t.child ? e(d) : e(f, -1);
										}), V(e, s);
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
	L(k, (e) => {
		(w.shouldRender || l()) && e(A);
	}), V(e, O), D();
}
// node_modules/bits-ui/dist/bits/tabs/tabs.svelte.js
var la = fn({
	component: "tabs",
	parts: [
		"root",
		"list",
		"trigger",
		"content"
	]
}), ua = new It("Tabs.Root"), da = class e {
	static create(t) {
		return ua.set(new e(t));
	}
	opts;
	attachment;
	rovingFocusGroup;
	#e = v(i([]));
	get triggerIds() {
		return S(this.#e);
	}
	set triggerIds(e) {
		l(this.#e, e, !0);
	}
	valueToTriggerId = new At();
	valueToContentId = new At();
	constructor(e) {
		this.opts = e, this.attachment = an(e.ref), this.rovingFocusGroup = new Fn({
			candidateAttr: la.trigger,
			rootAttr: la.root,
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
	#t = _(() => ({
		id: this.opts.id.current,
		"data-orientation": this.opts.orientation.current,
		[la.root]: "",
		...this.attachment
	}));
	get props() {
		return S(this.#t);
	}
	set props(e) {
		l(this.#t, e);
	}
}, fa = class e {
	static create(t) {
		return new e(t, ua.get());
	}
	opts;
	root;
	attachment;
	#e = _(() => this.root.opts.disabled.current);
	constructor(e, t) {
		this.opts = e, this.root = t, this.attachment = an(e.ref);
	}
	#t = _(() => ({
		id: this.opts.id.current,
		role: "tablist",
		"aria-orientation": this.root.opts.orientation.current,
		"data-orientation": this.root.opts.orientation.current,
		[la.list]: "",
		"data-disabled": sn(S(this.#e)),
		...this.attachment
	}));
	get props() {
		return S(this.#t);
	}
	set props(e) {
		l(this.#t, e);
	}
}, pa = class e {
	static create(t) {
		return new e(t, ua.get());
	}
	opts;
	root;
	attachment;
	#e = v(0);
	#t = _(() => this.root.opts.value.current === this.opts.value.current);
	#n = _(() => this.opts.disabled.current || this.root.opts.disabled.current);
	#r = _(() => this.root.valueToContentId.get(this.opts.value.current));
	constructor(e, n) {
		this.opts = e, this.root = n, this.attachment = an(e.ref), Z([() => this.opts.id.current, () => this.opts.value.current], ([e, t]) => this.root.registerTrigger(e, t)), t(() => {
			this.root.triggerIds.length, S(this.#t) || !this.root.opts.value.current ? l(this.#e, 0) : l(this.#e, -1);
		}), this.onfocus = this.onfocus.bind(this), this.onclick = this.onclick.bind(this), this.onkeydown = this.onkeydown.bind(this);
	}
	#i() {
		this.root.opts.value.current !== this.opts.value.current && this.root.setValue(this.opts.value.current);
	}
	onfocus(e) {
		this.root.opts.activationMode.current !== "automatic" || S(this.#n) || this.#i();
	}
	onclick(e) {
		S(this.#n) || this.#i();
	}
	onkeydown(e) {
		S(this.#n) || (e.key === " " || e.key === "Enter" ? (e.preventDefault(), this.#i()) : this.root.rovingFocusGroup.handleKeydown(this.opts.ref.current, e));
	}
	#a = _(() => ({
		id: this.opts.id.current,
		role: "tab",
		"data-state": ha(S(this.#t)),
		"data-value": this.opts.value.current,
		"data-orientation": this.root.opts.orientation.current,
		"data-disabled": sn(S(this.#n)),
		"aria-selected": on(S(this.#t)),
		"aria-controls": S(this.#r),
		[la.trigger]: "",
		disabled: cn(S(this.#n)),
		tabindex: S(this.#e),
		onclick: this.onclick,
		onfocus: this.onfocus,
		onkeydown: this.onkeydown,
		...this.attachment
	}));
	get props() {
		return S(this.#a);
	}
	set props(e) {
		l(this.#a, e);
	}
}, ma = class e {
	static create(t) {
		return new e(t, ua.get());
	}
	opts;
	root;
	attachment;
	#e = _(() => this.root.opts.value.current === this.opts.value.current);
	#t = _(() => this.root.valueToTriggerId.get(this.opts.value.current));
	constructor(e, t) {
		this.opts = e, this.root = t, this.attachment = an(e.ref), Z([() => this.opts.id.current, () => this.opts.value.current], ([e, t]) => this.root.registerContent(e, t));
	}
	#n = _(() => ({
		id: this.opts.id.current,
		role: "tabpanel",
		hidden: cn(!S(this.#e)),
		tabindex: this.opts.tabindex.current,
		"data-value": this.opts.value.current,
		"data-state": ha(S(this.#e)),
		"aria-labelledby": S(this.#t),
		"data-orientation": this.root.opts.orientation.current,
		[la.content]: "",
		...this.attachment
	}));
	get props() {
		return S(this.#n);
	}
	set props(e) {
		l(this.#n, e);
	}
};
function ha(e) {
	return e ? "active" : "inactive";
}
// node_modules/bits-ui/dist/bits/tabs/components/tabs.svelte
var ga = /* @__PURE__ */ new Set([
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
]), _a = B("<div><!></div>");
function va(e, t) {
	let n = P();
	f(t, !0);
	let i = K(t, "id", 19, () => $(n)), o = K(t, "ref", 15, null), s = K(t, "value", 15, ""), l = K(t, "onValueChange", 3, Q), d = K(t, "orientation", 3, "horizontal"), p = K(t, "loop", 3, !0), m = K(t, "activationMode", 3, "automatic"), h = K(t, "disabled", 3, !1), g = W(t, ga), v = da.create({
		id: Y(() => i()),
		value: Y(() => s(), (e) => {
			s(e), l()(e);
		}),
		orientation: Y(() => d()),
		loop: Y(() => p()),
		activationMode: Y(() => m()),
		disabled: Y(() => h()),
		ref: Y(() => o(), (e) => o(e))
	}), y = _(() => X(g, v.props));
	var b = F(), x = u(b), C = (e) => {
		var n = F(), r = u(n);
		z(r, () => t.child, () => ({ props: S(y) })), V(e, n);
	}, w = (e) => {
		var n = _a();
		q(n, () => ({ ...S(y) }));
		var i = c(n);
		z(i, () => t.children ?? r), a(n), V(e, n);
	};
	L(x, (e) => {
		t.child ? e(C) : e(w, -1);
	}), V(e, b), D();
}
// node_modules/bits-ui/dist/bits/tabs/components/tabs-content.svelte
var ya = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"children",
	"child",
	"id",
	"ref",
	"value",
	"tabindex"
]), ba = B("<div><!></div>");
function xa(e, t) {
	let n = P();
	f(t, !0);
	let i = K(t, "id", 19, () => $(n)), o = K(t, "ref", 15, null), s = K(t, "tabindex", 3, 0), l = W(t, ya), d = ma.create({
		value: Y(() => t.value),
		tabindex: Y(() => s() ?? 0),
		id: Y(() => i()),
		ref: Y(() => o(), (e) => o(e))
	}), p = _(() => X(l, d.props));
	var m = F(), h = u(m), g = (e) => {
		var n = F(), r = u(n);
		z(r, () => t.child, () => ({ props: S(p) })), V(e, n);
	}, v = (e) => {
		var n = ba();
		q(n, () => ({ ...S(p) }));
		var i = c(n);
		z(i, () => t.children ?? r), a(n), V(e, n);
	};
	L(h, (e) => {
		t.child ? e(g) : e(v, -1);
	}), V(e, m), D();
}
// node_modules/bits-ui/dist/bits/tabs/components/tabs-list.svelte
var Sa = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"child",
	"children",
	"id",
	"ref"
]), Ca = B("<div><!></div>");
function wa(e, t) {
	let n = P();
	f(t, !0);
	let i = K(t, "id", 19, () => $(n)), o = K(t, "ref", 15, null), s = W(t, Sa), l = fa.create({
		id: Y(() => i()),
		ref: Y(() => o(), (e) => o(e))
	}), d = _(() => X(s, l.props));
	var p = F(), m = u(p), h = (e) => {
		var n = F(), r = u(n);
		z(r, () => t.child, () => ({ props: S(d) })), V(e, n);
	}, g = (e) => {
		var n = Ca();
		q(n, () => ({ ...S(d) }));
		var i = c(n);
		z(i, () => t.children ?? r), a(n), V(e, n);
	};
	L(m, (e) => {
		t.child ? e(h) : e(g, -1);
	}), V(e, p), D();
}
// node_modules/bits-ui/dist/bits/tabs/components/tabs-trigger.svelte
var Ta = /* @__PURE__ */ new Set([
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
]), Ea = B("<button><!></button>");
function Da(e, t) {
	let n = P();
	f(t, !0);
	let i = K(t, "disabled", 3, !1), o = K(t, "id", 19, () => $(n)), s = K(t, "type", 3, "button"), l = K(t, "ref", 15, null), d = W(t, Ta), p = pa.create({
		id: Y(() => o()),
		disabled: Y(() => i() ?? !1),
		value: Y(() => t.value),
		ref: Y(() => l(), (e) => l(e))
	}), m = _(() => X(d, p.props, { type: s() }));
	var h = F(), g = u(h), v = (e) => {
		var n = F(), r = u(n);
		z(r, () => t.child, () => ({ props: S(m) })), V(e, n);
	}, y = (e) => {
		var n = Ea();
		q(n, () => ({ ...S(m) }));
		var i = c(n);
		z(i, () => t.children ?? r), a(n), V(e, n);
	};
	L(g, (e) => {
		t.child ? e(v) : e(y, -1);
	}), V(e, h), D();
}
// svelte/lib/ui/icons.ts
var Oa = {
	pencil: ["m16 3 5 5-12 12-6 1 1-6L16 3Z", "m14 5 5 5"],
	undo: ["M3 9h10a6 6 0 0 1 0 12h-3", "m3 9 5-5M3 9l5 5"],
	trash: ["M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7M14 10v7"],
	sidebar: ["M3 3h18v18H3Z", "M9 3v18"],
	board: ["M3 3h18v18H3Z", "M9 3v18M15 3v18"],
	mic: ["M9 3a3 3 0 0 1 6 0v8a3 3 0 0 1-6 0V3Z", "M5 10v2a7 7 0 0 0 14 0v-2M12 19v4m-4 0h8"],
	bell: ["M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9", "M10 21h4"],
	bellOff: [
		"m3 3 18 18",
		"M6 6a6 6 0 0 0 0 2c0 7-3 7-3 9h14",
		"M18 8a6 6 0 0 0-8-5",
		"M10 21h4"
	],
	smile: ["M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0", "M8 9h.01M16 9h.01M7 14a5 5 0 0 0 10 0"],
	expand: ["M8 3H3v5M16 3h5v5M21 16v5h-5M3 16v5h5"],
	external: ["M15 3h6v6M10 14 21 3M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5"],
	arrowRight: ["M5 12h14m-6-6 6 6-6 6"],
	chart: ["M4 3v18h17M8 17v-5m5 5V7m5 10V4"],
	trophy: ["M8 3h8v6a4 4 0 0 1-8 0V3ZM8 5H4v2a4 4 0 0 0 4 4m8-6h4v2a4 4 0 0 1-4 4M12 13v7m-4 1h8"],
	copy: ["M9 9h12v12H9z", "M5 15H3V3h12v2"],
	link: ["m10 13 4-4", "M8 16H6a4 4 0 0 1 0-8h4M14 8h4a4 4 0 0 1 0 8h-4"],
	reply: ["m9 10-5 5 5 5", "M4 15h10a6 6 0 0 0 0-12"],
	folder: ["M3 7V5a2 2 0 0 1 2-2h5l2 3h7a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z"],
	file: ["M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z", "M14 2v6h6"],
	pin: ["m16 3 5 5-4 1-3 5-4-4 5-3Z", "m10 14-7 7"],
	close: ["M18 6 6 18M6 6l12 12"],
	check: ["m20 6-11 11-5-5"],
	chevronDown: ["m6 9 6 6 6-6"],
	chevronRight: ["m9 6 6 6-6 6"],
	search: ["M21 21l-4.35-4.35", "M19 11a8 8 0 1 1-16 0 8 8 0 0 1 16 0"],
	plus: ["M12 5v14M5 12h14"],
	grip: ["M9 5h.01M9 12h.01M9 19h.01M15 5h.01M15 12h.01M15 19h.01"],
	calendar: ["M8 2v4M16 2v4M3 10h18", "M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2"],
	inbox: ["M22 12h-6l-2 3h-4l-2-3H2", "M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11"],
	warning: ["m10.3 3.9-8.5 14.2A2 2 0 0 0 3.5 21h17a2 2 0 0 0 1.7-2.9L13.7 3.9a2 2 0 0 0-3.4 0", "M12 9v4M12 17h.01"],
	sun: ["M12 3V1M12 23v-2M3 12H1M23 12h-2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4", "M17 12a5 5 0 1 1-10 0 5 5 0 0 1 10 0"],
	moon: ["M20.9 13A9 9 0 0 1 11 3.1 9 9 0 1 0 20.9 13"]
}, ka = le("<path></path>"), Aa = le("<svg aria-hidden=\"true\" focusable=\"false\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></svg>");
function ja(e, t) {
	f(t, !0);
	var n = Aa();
	ie(n, 21, () => Oa[t.name], ee, (e, t) => {
		var n = ka();
		x(() => j(n, "d", S(t))), V(e, n);
	}), a(n), x((e) => N(n, 0, e), [() => M(G("tw:size-4 tw:shrink-0", t.class))]), V(e, n), D();
}
// svelte/lib/ui/dialogController.ts
var Ma = /* @__PURE__ */ new Set();
function Na(e) {
	return Ma.add(e), () => {
		Ma.delete(e);
	};
}
// svelte/lib/ui/Dialog.svelte
var Pa = B("<div class=\"tw:flex tw:items-start tw:gap-3\"><div class=\"tw:min-w-0 tw:flex-1 tw:space-y-1\"><!> <!></div> <!></div> <!>", 1), Fa = B("<!> <!>", 1);
function Ia(e, n) {
	f(n, !0);
	let r = K(n, "open", 15, !1), i = K(n, "sheet", 3, !1), l = K(n, "fullScreen", 3, !1);
	t(() => {
		if (r()) return Na(() => {
			r(!1), n.onOpenChange?.(!1);
		});
	});
	var d = F(), p = u(d);
	R(p, () => ta, (e, t) => {
		t(e, {
			get onOpenChange() {
				return n.onOpenChange;
			},
			get open() {
				return r();
			},
			set open(e) {
				r(e);
			},
			children: (e, t) => {
				var r = Fa(), d = u(r), f = (e) => {
					var t = F(), r = u(t);
					{
						let e = _(() => fe({ variant: "outline" }));
						R(r, () => Zi, (t, r) => {
							r(t, {
								type: "button",
								get class() {
									return S(e);
								},
								children: (e, t) => {
									var r = F(), i = u(r);
									z(i, () => n.trigger), V(e, r);
								},
								$$slots: { default: !0 }
							});
						});
					}
					V(e, t);
				};
				L(d, (e) => {
					n.trigger && e(f);
				});
				var p = o(d, 2);
				R(p, () => fr, (e, t) => {
					t(e, {
						children: (e, t) => {
							var r = Fa(), d = u(r);
							R(d, () => Ji, (e, t) => {
								t(e, {
									"data-vb-native": !0,
									class: "tw:fixed tw:inset-0 tw:z-40 tw:m-0 tw:box-border tw:bg-scrim"
								});
							});
							var f = o(d, 2);
							{
								let e = _(() => G("tw:fixed tw:z-50 tw:m-0 tw:box-border tw:flex tw:max-h-[90dvh] tw:flex-col tw:gap-4 tw:overflow-auto tw:border tw:border-solid tw:border-border tw:bg-card tw:p-6 tw:font-sans tw:text-sm tw:text-card-foreground tw:shadow-lg tw:outline-none", l() ? "tw:inset-2 tw:max-h-none tw:rounded-surface" : i() ? "tw:inset-x-0 tw:bottom-0 tw:rounded-t-surface tw:sm:inset-y-0 tw:sm:left-auto tw:sm:right-0 tw:sm:max-h-none tw:sm:w-96 tw:sm:rounded-none" : "tw:left-1/2 tw:top-1/2 tw:w-[calc(100%-2rem)] tw:max-w-lg tw:-translate-x-1/2 tw:-translate-y-1/2 tw:rounded-surface"));
								R(f, () => ca, (t, r) => {
									r(t, {
										"data-vb-native": !0,
										onOpenAutoFocus: (e) => {
											let t = n.initialFocus?.();
											t && (e.preventDefault(), t.focus());
										},
										onCloseAutoFocus: (e) => {
											let t = n.returnFocus?.();
											t?.isConnected && (e.preventDefault(), t.focus());
										},
										preventScroll: !1,
										preventBodyPointerEvents: !1,
										preventOverflowTextSelection: !1,
										get class() {
											return S(e);
										},
										children: (e, t) => {
											var r = Pa(), i = u(r), l = c(i), d = c(l);
											R(d, () => Qn, (e, t) => {
												t(e, {
													class: "tw:m-0 tw:font-sans tw:text-lg tw:font-semibold tw:leading-6 tw:tracking-tight",
													children: (e, t) => {
														s();
														var r = I();
														x(() => J(r, n.title)), V(e, r);
													},
													$$slots: { default: !0 }
												});
											});
											var f = o(d, 2), p = (e) => {
												var t = F(), r = u(t);
												R(r, () => ea, (e, t) => {
													t(e, {
														class: "tw:m-0 tw:text-sm tw:leading-5 tw:text-muted-foreground",
														children: (e, t) => {
															s();
															var r = I();
															x(() => J(r, n.description)), V(e, r);
														},
														$$slots: { default: !0 }
													});
												}), V(e, t);
											};
											L(f, (e) => {
												n.description && e(p);
											}), a(l);
											var m = o(l, 2);
											{
												let e = _(() => fe({
													variant: "ghost",
													size: "icon"
												}));
												R(m, () => ia, (t, r) => {
													r(t, {
														type: "button",
														get "aria-label"() {
															return n.closeLabel;
														},
														get class() {
															return S(e);
														},
														children: (e, t) => {
															ja(e, { name: "close" });
														},
														$$slots: { default: !0 }
													});
												});
											}
											a(i);
											var h = o(i, 2);
											z(h, () => n.children), V(e, r);
										},
										$$slots: { default: !0 }
									});
								});
							}
							V(e, r);
						},
						$$slots: { default: !0 }
					});
				}), V(e, r);
			},
			$$slots: { default: !0 }
		});
	}), V(e, d), D();
}
// svelte/lib/ui/IconButton.svelte
var La = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"label",
	"icon",
	"title",
	"variant",
	"ref"
]);
function Ra(e, t) {
	f(t, !0);
	let n = K(t, "variant", 3, "ghost"), r = K(t, "ref", 15, null), i = W(t, La);
	{
		let a = _(() => t.title ?? t.label);
		ge(e, me(() => i, {
			get variant() {
				return n();
			},
			size: "icon",
			get "aria-label"() {
				return t.label;
			},
			get title() {
				return S(a);
			},
			get ref() {
				return r();
			},
			set ref(e) {
				r(e);
			},
			children: (e, n) => {
				ja(e, { get name() {
					return t.icon;
				} });
			},
			$$slots: { default: !0 }
		}));
	}
	D();
}
// svelte/lib/ui/Textarea.svelte
var za = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"value",
	"class",
	"ref"
]), Ba = B("<textarea></textarea>");
function Va(e, t) {
	f(t, !0);
	let n = K(t, "value", 15, ""), r = K(t, "ref", 15, null), i = W(t, za);
	var a = Ba();
	w(a), q(a, (e) => ({
		class: e,
		...i
	}), [() => G("tw:block tw:min-h-24 tw:w-full tw:min-w-0 tw:rounded-control tw:border tw:border-input tw:bg-studio-input-background tw:px-3 tw:py-2 tw:font-sans tw:text-sm tw:font-normal tw:leading-5 tw:tracking-normal tw:text-foreground tw:outline-none tw:placeholder:text-muted-foreground tw:focus-visible:border-ring tw:focus-visible:ring-2 tw:focus-visible:ring-ring/30 tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-destructive/30", t.class)]), U(a, (e) => r(e), () => r()), pe(a, n), V(e, a), D();
}
// svelte/lib/ui/Badge.svelte
var Ha = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"children",
	"variant",
	"class"
]), Ua = B("<span><!></span>");
function Wa(e, t) {
	f(t, !0);
	let n = xe({
		base: "tw:inline-flex tw:items-center tw:gap-1 tw:rounded-full tw:border tw:border-transparent tw:px-2 tw:py-0.5 tw:font-sans tw:text-xs tw:font-medium tw:leading-4",
		variants: { variant: {
			neutral: "tw:bg-muted tw:text-foreground",
			primary: "tw:bg-primary tw:text-primary-foreground",
			success: "tw:border-success/20 tw:bg-success/10 tw:text-foreground",
			warning: "tw:border-warning/20 tw:bg-warning/10 tw:text-foreground",
			destructive: "tw:border-destructive/20 tw:bg-destructive/10 tw:text-foreground"
		} },
		defaultVariants: { variant: "neutral" }
	}, { twMerge: !1 }), i = W(t, Ha);
	var o = Ua();
	q(o, (e) => ({
		...i,
		class: e
	}), [() => G(n({ variant: t.variant }), t.class)]);
	var s = c(o);
	z(s, () => t.children ?? r), a(o), V(e, o), D();
}
// svelte/lib/ui/Heading.svelte
var Ga = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"level",
	"children",
	"class"
]);
function Ka(e, t) {
	f(t, !0);
	let n = K(t, "level", 3, 2), r = W(t, Ga), i = _(() => `h${n()}`);
	var a = F(), o = u(a);
	_e(o, () => S(i), !1, (e, n) => {
		q(e, (e) => ({
			...r,
			class: e
		}), [() => G("tw:m-0 tw:font-sans tw:text-base tw:font-semibold tw:leading-6 tw:tracking-normal tw:[font-variation-settings:normal]", t.class)]);
		var i = F(), a = u(i);
		z(a, () => t.children), V(n, i);
	}), V(e, a), D();
}
// svelte/lib/ui/Avatar.svelte
var qa = B("<img alt=\"\" class=\"tw:size-full tw:object-cover\"/>"), Ja = B("<span aria-hidden=\"true\"><!></span>");
function Ya(e, n) {
	f(n, !0);
	let r = v(!1);
	t(() => {
		n.src, l(r, !1);
	});
	let i = _(() => n.name.trim().split(/[\s@._-]+/).filter(Boolean).slice(0, 2).map((e) => Array.from(e)[0]).join("").toLocaleUpperCase());
	var o = Ja(), s = c(o), u = (e) => {
		var t = qa();
		x(() => j(t, "src", n.src)), ue("error", t, () => {
			l(r, !0);
		}), de(t), V(e, t);
	}, d = (e) => {
		var t = I();
		x(() => J(t, S(i) || "?")), V(e, t);
	};
	L(s, (e) => {
		n.src && !S(r) ? e(u) : e(d, -1);
	}), a(o), x((e) => N(o, 1, e), [() => M(G("tw:inline-grid tw:size-8 tw:shrink-0 tw:place-items-center tw:overflow-hidden tw:rounded-full tw:border tw:border-border tw:bg-muted tw:font-sans tw:text-xs tw:font-medium tw:text-foreground", n.class))]), V(e, o), D();
}
// svelte/lib/ui/AlertDialog.svelte
var Xa = B("<p role=\"alert\" class=\"tw:m-0 tw:text-sm tw:text-destructive\"> </p>"), Za = B("<!> <!> <!> <div class=\"tw:flex tw:flex-wrap tw:justify-end tw:gap-2\"><!> <!></div>", 1), Qa = B("<!> <!>", 1);
function $a(e, n) {
	f(n, !0);
	let r = K(n, "open", 15, !1), i = K(n, "busy", 3, !1), d = K(n, "confirmDisabled", 3, !1), m = K(n, "error", 3, ""), h = v(null);
	t(() => {
		if (r()) return Na(() => {
			r(!1), n.onOpenChange?.(!1);
		});
	});
	var g = F(), y = u(g);
	R(y, () => Yn, (e, t) => {
		t(e, {
			get onOpenChange() {
				return n.onOpenChange;
			},
			get open() {
				return r();
			},
			set open(e) {
				r(e);
			},
			children: (e, t) => {
				var r = F(), f = u(r);
				R(f, () => fr, (e, t) => {
					t(e, {
						children: (e, t) => {
							var r = Qa(), f = u(r);
							R(f, () => Ji, (e, t) => {
								t(e, {
									"data-vb-native": !0,
									class: "tw:fixed tw:inset-0 tw:z-40 tw:m-0 tw:box-border tw:bg-scrim"
								});
							});
							var g = o(f, 2);
							R(g, () => Gi, (e, t) => {
								t(e, {
									"data-vb-native": !0,
									preventScroll: !1,
									preventBodyPointerEvents: !1,
									preventOverflowTextSelection: !1,
									onOpenAutoFocus: (e) => {
										e.preventDefault(), S(h)?.focus();
									},
									onCloseAutoFocus: (e) => {
										let t = n.returnFocus?.();
										t?.isConnected && (e.preventDefault(), t.focus());
									},
									onEscapeKeydown: (e) => {
										i() && e.preventDefault();
									},
									class: "tw:fixed tw:left-1/2 tw:top-1/2 tw:z-50 tw:m-0 tw:box-border tw:flex tw:max-h-[90dvh] tw:w-[calc(100%-2rem)] tw:max-w-lg tw:-translate-x-1/2 tw:-translate-y-1/2 tw:flex-col tw:gap-4 tw:overflow-auto tw:rounded-surface tw:border tw:border-solid tw:border-border tw:bg-card tw:p-6 tw:font-sans tw:text-sm tw:text-card-foreground tw:shadow-lg tw:outline-none",
									children: (e, t) => {
										var r = Za(), f = u(r);
										R(f, () => Qn, (e, t) => {
											t(e, {
												class: "tw:m-0 tw:text-lg tw:font-semibold tw:leading-6 tw:tracking-tight",
												children: (e, t) => {
													s();
													var r = I();
													x(() => J(r, n.title)), V(e, r);
												},
												$$slots: { default: !0 }
											});
										});
										var g = o(f, 2), v = (e) => {
											var t = F(), r = u(t);
											R(r, () => ea, (e, t) => {
												t(e, {
													class: "tw:m-0 tw:whitespace-pre-wrap tw:break-words tw:text-sm tw:text-muted-foreground",
													children: (e, t) => {
														s();
														var r = I();
														x(() => J(r, n.description)), V(e, r);
													},
													$$slots: { default: !0 }
												});
											}), V(e, t);
										};
										L(g, (e) => {
											n.description && e(v);
										});
										var y = o(g, 2), b = (e) => {
											var t = Xa(), n = p(t, !0);
											x(() => J(n, m())), V(e, t);
										};
										L(y, (e) => {
											m() && e(b);
										});
										var C = o(y, 2), w = c(C);
										{
											let e = _(() => fe({ variant: "outline" }));
											R(w, () => ir, (t, r) => {
												r(t, {
													get disabled() {
														return i();
													},
													get class() {
														return S(e);
													},
													get ref() {
														return S(h);
													},
													set ref(e) {
														l(h, e, !0);
													},
													children: (e, t) => {
														s();
														var r = I();
														x(() => J(r, n.cancelLabel)), V(e, r);
													},
													$$slots: { default: !0 }
												});
											});
										}
										var T = o(w, 2);
										{
											let e = _(() => i() || d()), t = _(() => i() || void 0), r = _(() => fe({ variant: "destructive" }));
											R(T, () => tr, (i, a) => {
												a(i, {
													get disabled() {
														return S(e);
													},
													get "aria-busy"() {
														return S(t);
													},
													onclick: (e) => {
														e.preventDefault(), n.onconfirm();
													},
													get class() {
														return S(r);
													},
													children: (e, t) => {
														s();
														var r = I();
														x(() => J(r, n.confirmLabel)), V(e, r);
													},
													$$slots: { default: !0 }
												});
											});
										}
										a(C), V(e, r);
									},
									$$slots: { default: !0 }
								});
							}), V(e, r);
						},
						$$slots: { default: !0 }
					});
				}), V(e, r);
			},
			$$slots: { default: !0 }
		});
	}), V(e, g), D();
}
// svelte/lib/ui/Checkbox.svelte
var eo = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"checked",
	"indeterminate",
	"class",
	"onchange",
	"onCheckedChange"
]), to = B("<span class=\"tw:h-0.5 tw:w-2 tw:bg-current\"></span>"), no = B("<span aria-hidden=\"true\" class=\"tw:pointer-events-none tw:absolute tw:inset-0 tw:grid tw:place-items-center tw:text-primary-foreground\"><!></span>"), ro = B("<span class=\"tw:relative tw:inline-flex tw:shrink-0 tw:align-middle\"><input/> <!></span>");
function io(e, t) {
	f(t, !0);
	let n = K(t, "checked", 15, !1), r = K(t, "indeterminate", 15, !1), i = W(t, eo);
	var s = ro(), l = c(s), u = (e) => {
		t.onchange?.(e), t.onCheckedChange?.(e.currentTarget.checked);
	};
	q(l, (e) => ({
		type: "checkbox",
		...i,
		onchange: u,
		class: e
	}), [() => G("tw:m-0 tw:size-4 tw:shrink-0 tw:appearance-none tw:rounded-sm tw:border tw:border-input tw:bg-card tw:p-0 tw:outline-none tw:checked:border-primary tw:checked:bg-primary tw:indeterminate:border-primary tw:indeterminate:bg-primary tw:focus-visible:ring-2 tw:focus-visible:ring-ring tw:focus-visible:ring-offset-2 tw:focus-visible:ring-offset-background tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:aria-invalid:border-destructive", t.class)], void 0, void 0, void 0, !0);
	var d = o(l, 2), p = (e) => {
		var t = no(), n = c(t), i = (e) => {
			var t = to();
			V(e, t);
		}, o = (e) => {
			ja(e, {
				name: "check",
				class: "tw:size-3"
			});
		};
		L(n, (e) => {
			r() ? e(i) : e(o, -1);
		}), a(t), V(e, t);
	};
	L(d, (e) => {
		(n() || r()) && e(p);
	}), a(s), we(l, n), he("indeterminate", "change", l, r, r), V(e, s), D();
}
// svelte/lib/ui/Tabs.svelte
var ao = B("<!> <!>", 1);
function oo(e, t) {
	f(t, !0);
	let n = K(t, "value", 15, "");
	var r = F(), i = u(r);
	{
		let e = _(() => G("tw:flex tw:min-h-0 tw:flex-col tw:gap-3 tw:font-sans tw:text-sm tw:text-foreground", t.class));
		R(i, () => va, (r, i) => {
			i(r, {
				get onValueChange() {
					return t.onValueChange;
				},
				get class() {
					return S(e);
				},
				get value() {
					return n();
				},
				set value(e) {
					n(e);
				},
				children: (e, n) => {
					var r = ao(), i = u(r);
					R(i, () => wa, (e, n) => {
						n(e, {
							get "aria-label"() {
								return t.label;
							},
							class: "tw:flex tw:shrink-0 tw:gap-1 tw:rounded-control tw:bg-muted tw:p-1",
							children: (e, n) => {
								var r = F(), i = u(r);
								ie(i, 17, () => t.items, (e) => e.value, (e, t) => {
									var n = F(), r = u(n);
									R(r, () => Da, (e, n) => {
										n(e, {
											type: "button",
											get value() {
												return S(t).value;
											},
											get disabled() {
												return S(t).disabled;
											},
											class: "tw:flex-1 tw:rounded-md tw:border tw:border-transparent tw:bg-transparent tw:px-3 tw:py-1.5 tw:text-sm tw:font-medium tw:leading-5 tw:text-muted-foreground tw:outline-none tw:transition-colors tw:hover:text-foreground tw:focus-visible:ring-2 tw:focus-visible:ring-ring tw:disabled:pointer-events-none tw:disabled:opacity-50 tw:data-[state=active]:bg-card tw:data-[state=active]:text-card-foreground tw:data-[state=active]:shadow-xs tw:motion-reduce:transition-none",
											children: (e, n) => {
												s();
												var r = I();
												x(() => J(r, S(t).label)), V(e, r);
											},
											$$slots: { default: !0 }
										});
									}), V(e, n);
								}), V(e, r);
							},
							$$slots: { default: !0 }
						});
					});
					var a = o(i, 2);
					ie(a, 17, () => t.items, (e) => e.value, (e, n) => {
						var r = F(), i = u(r);
						R(i, () => xa, (e, r) => {
							r(e, {
								get value() {
									return S(n).value;
								},
								class: "tw:min-h-0 tw:flex-1 tw:outline-none tw:focus-visible:ring-2 tw:focus-visible:ring-ring",
								children: (e, r) => {
									var i = F(), a = u(i);
									z(a, () => t.children, () => S(n).value), V(e, i);
								},
								$$slots: { default: !0 }
							});
						}), V(e, r);
					}), V(e, r);
				},
				$$slots: { default: !0 }
			});
		});
	}
	V(e, r), D();
}
// svelte/lib/components/EmptyState.svelte
var so = B("<p class=\"tw:m-0 tw:max-w-sm tw:leading-5 tw:text-muted-foreground\"> </p>"), co = B("<div class=\"tw:flex tw:flex-col tw:items-center tw:gap-3 tw:px-6 tw:py-10 tw:text-center tw:font-sans tw:text-sm tw:text-foreground\"><span class=\"tw:grid tw:size-10 tw:place-items-center tw:rounded-surface tw:border tw:border-border tw:bg-muted\"><!></span> <div class=\"tw:space-y-1\"><p class=\"tw:m-0 tw:font-medium\"> </p> <!></div> <!></div>");
function lo(e, t) {
	let n = K(t, "icon", 3, "inbox");
	var i = co(), s = c(i);
	ja(c(s), {
		get name() {
			return n();
		},
		class: "tw:size-5"
	}), a(s);
	var l = o(s, 2), u = c(l), d = p(u, !0), f = o(u, 2), m = (e) => {
		var n = so(), r = p(n, !0);
		x(() => J(r, t.description)), V(e, n);
	};
	L(f, (e) => {
		t.description && e(m);
	}), a(l);
	var h = o(l, 2);
	z(h, () => t.children ?? r), a(i), x(() => J(d, t.title)), V(e, i);
}
// svelte/lib/components/ErrorState.svelte
var uo = B("<p class=\"tw:m-0 tw:leading-5 tw:text-foreground\"> </p>"), fo = B("<div role=\"alert\"><!> <div class=\"tw:min-w-0 tw:flex-1 tw:space-y-1\"><p class=\"tw:m-0 tw:font-medium\"> </p> <!><!></div></div>");
function po(e, t) {
	f(t, !0);
	let n = K(t, "compact", 3, !1);
	var r = fo(), i = c(r);
	ja(i, {
		name: "warning",
		class: "tw:mt-0.5 tw:text-destructive"
	});
	var l = o(i, 2), u = c(l), d = p(u, !0), m = o(u, 2), h = (e) => {
		var n = uo(), r = p(n, !0);
		x(() => J(r, t.description)), V(e, n);
	};
	L(m, (e) => {
		t.description && e(h);
	});
	var g = o(m), _ = (e) => {
		ge(e, {
			variant: "outline",
			size: "sm",
			get onclick() {
				return t.onretry;
			},
			children: (e, n) => {
				s();
				var r = I();
				x(() => J(r, t.retryLabel)), V(e, r);
			},
			$$slots: { default: !0 }
		});
	};
	L(g, (e) => {
		t.onretry && t.retryLabel && e(_);
	}), a(l), a(r), x((e) => {
		N(r, 1, e), J(d, t.title);
	}, [() => M(G("tw:flex tw:items-start tw:gap-3 tw:rounded-control tw:border tw:border-destructive/20 tw:bg-destructive/10 tw:font-sans tw:text-sm tw:text-foreground", n() ? "tw:p-3" : "tw:p-5"))]), V(e, r), D();
}
// svelte/features/room-layout/browser.ts
function mo(e) {
	let t = null;
	try {
		t = e.localStorage;
	} catch {}
	return {
		href: () => e.location.href,
		state: () => e.history.state,
		history: e.history,
		storage: t,
		schedule: (t, n) => e.setTimeout(t, n),
		cancel: (t) => e.clearTimeout(t),
		enqueue: (t) => e.queueMicrotask(t)
	};
}
// svelte/features/room-layout/history.ts
var ho = (e) => {
	if (!e || typeof e != "object" || !("vbRoomSheet" in e)) return null;
	let t = e.vbRoomSheet;
	return !t || typeof t != "object" || !("token" in t) || !("sheet" in t) || typeof t.token != "string" || t.sheet !== "doc" && t.sheet !== "side" ? null : {
		token: t.token,
		sheet: t.sheet
	};
};
function go(e) {
	let t = e.browser, n = !0, r = null, i = null, a = null, o = null, s = 0, c = 0, l = !1, u = () => {
		let e = new URL(t.href());
		return e.pathname + e.search + e.hash;
	}, d = (e) => ho(t.state())?.token === e.token && u() === e.returnURL, f = () => {
		o !== null && t.cancel(o), o = null;
	}, p = (t) => {
		l = t, e.unconfirmed(t);
	}, m = (r) => {
		f(), i = null, p(!1);
		let o = a, s = c;
		a = null, r && o && t.enqueue(() => {
			n && e.current() && c === s && o();
		});
	}, h = () => {
		f(), o = t.schedule(() => {
			o = null, n && i && p(!0);
		}, 1500);
	};
	return {
		open(a) {
			n && e.current() && !i && (c++, r && d(r) ? (r = {
				...r,
				sheet: a
			}, t.history.replaceState({ vbRoomSheet: {
				token: r.token,
				sheet: a
			} }, "", u())) : (r = {
				token: `sheet-${++s}-${Math.random().toString(36).slice(2)}`,
				sheet: a,
				returnURL: u()
			}, t.history.pushState({ vbRoomSheet: {
				token: r.token,
				sheet: a
			} }, "", r.returnURL)), e.changed(a));
		},
		take() {
			if (!n || !e.current() || i) return !1;
			c++;
			let a = r && d(r);
			return a && (t.history.replaceState(null, "", u()), r = null), e.changed(null), !!a;
		},
		close() {
			n && e.current() && !i && (c++, r && d(r) && (i = r, h(), t.history.back()), e.changed(null));
		},
		retry() {
			if (n && e.current() && i && l) {
				if (d(i)) p(!1), h(), t.history.back();
				else {
					let e = u() === i.returnURL;
					m(e);
				}
			}
		},
		beforeNavigation() {
			n && (c++, a = null, r && d(r) && t.history.replaceState(null, "", u()), r = null, m(!1), e.changed(null));
		},
		deferNavigation(e) {
			return !n || !i ? !1 : (c++, a = e, !0);
		},
		consumePop() {
			if (!n) return !1;
			if (i) {
				let t = d(i);
				if (t && e.current()) return !0;
				let n = e.current() && !t && u() === i.returnURL;
				return e.changed(null), m(n), n;
			}
			let a = ho(t.state());
			return r && a?.token === r.token && u() === r.returnURL && e.current() ? (r = {
				...r,
				sheet: a.sheet
			}, e.changed(a.sheet), !0) : r ? (e.changed(null), e.current() && u() === r.returnURL) : !1;
		},
		dispose() {
			n = !1, c++, f(), r = i = a = null;
		}
	};
}
// svelte/features/room-layout/model.ts
var _o = 1e3, vo = (e, t, n) => Math.max(t, Math.min(n, e));
function yo(e, t) {
	return e === "side" || t.documentVisible && !t.boardFull;
}
function bo(e, t) {
	return Math.max(260, Math.round(e) - (t ? 68 : 272) - 320);
}
function xo(e, t, n) {
	return vo(Math.round(Number.isFinite(e) ? e : 380), 260, bo(t, n));
}
function So(e, t, n) {
	let r = bo(t, n);
	return r === 260 ? 0 : (xo(e, t, n) - 260) / (r - 260);
}
function Co(e) {
	let t = Number(e);
	return e !== null && e.trim() && t && Number.isFinite(t) ? Math.round(t) : 380;
}
function wo(e, t, n, r) {
	return !(r > 0) || Math.abs(n - t) < 6 ? e : e === 0 ? +(n - t > r / 4) : n - t < -r / 4 ? 0 : 1;
}
function To(e) {
	let t = vo(e, 0, 1);
	if (t === 0 || t === 1) return t;
	let n = (e, t, n) => 3 * (1 - e) ** 2 * e * t + 3 * (1 - e) * e ** 2 * n + e ** 3, r = 0, i = 1;
	for (let e = 0; e < 20; e++) {
		let e = (r + i) / 2;
		n(e, .32, 0) < t ? r = e : i = e;
	}
	return n((r + i) / 2, .72, 1);
}
// svelte/features/room-layout/playback.ts
function Eo(e, t, n) {
	let r = !0, i = 0, a = 0, o = null, s = 0, c = () => !r || !e.isConnected || typeof CSSAnimation > "u" ? null : e.getAnimations().find((n) => n instanceof CSSAnimation && n.animationName === t() && n.effect instanceof KeyframeEffect && n.effect.target === e) ?? null;
	function l() {
		i++, o !== null && cancelAnimationFrame(o), o = null;
	}
	function u(t) {
		if (o = null, !r || i !== t || !e.isConnected) return;
		let l = c();
		l ? (l.pause(), l.currentTime = a * _o) : performance.now() >= s ? n() : o = requestAnimationFrame(() => u(t));
	}
	return {
		set(t) {
			if (!r || !Number.isFinite(t)) return;
			a = vo(t, 0, 1);
			let n = c();
			n ? (l(), n.pause(), n.currentTime = a * _o) : o === null && e.isConnected && (s = performance.now() + 3e4, u(++i));
		},
		suspend: l,
		dispose() {
			r = !1, l();
		}
	};
}
// svelte/features/room-layout/geometry.ts
function Do(e) {
	let { cells: t, browser: n } = e, r = t.root.ownerDocument.defaultView;
	if (!r) throw Error("Missing room layout window");
	let i = r, a = i.matchMedia("(max-width: 900px)"), o = i.matchMedia("(prefers-reduced-motion: reduce)"), s = !0, c = t.root.clientWidth, l = 380, u = null, d = null, f = null, p = 0, m = 0, h = {
		doc: 0,
		side: 0
	}, g = null, _ = () => s && e.current() && t.root.isConnected, v = () => {
		_() && e.changed({ animationUnavailable: !0 });
	}, y = () => e.read().sidebarCollapsed ? "vb-room-document-width-rail" : "vb-room-document-width", b = (n) => n === "side" ? t.sidebar : e.read().pane === "board" ? t.board : t.document, x = Eo(t.viewport, () => "vb-room-viewport", v), S = Eo(t.scrim, () => "vb-room-scrim", v), C = Eo(t.sidebar, () => "vb-room-sheet", v), w = Eo(t.document, () => "vb-room-sheet", v), T = Eo(t.board, () => "vb-room-sheet", v), E = Eo(t.document, y, v), D = Eo(t.board, y, v), O = [
		x,
		S,
		C,
		w,
		T,
		E,
		D
	], k = null, A = null, j = /* @__PURE__ */ new Set(), M = (t) => t === "side" ? C : e.read().pane === "board" ? T : w, N = () => {
		p++, f !== null && i.cancelAnimationFrame(f), f = null;
	};
	function ee(e, t) {
		h[e] = vo(t, 0, 1), M(e).set(h[e]), S.set(h[e]);
	}
	function P(t) {
		u = t, e.changed({ presentedSheet: t });
	}
	function F(e, n) {
		N(), P(e);
		let r = h[e], a = i.performance.now(), s = p, c = () => {
			if (f = null, !_() || s !== p) return;
			let l = o.matches ? 1 : vo((i.performance.now() - a) / 300, 0, 1);
			if (ee(e, r + (n - r) * To(l)), l < 1) f = i.requestAnimationFrame(c);
			else if (!n) {
				P(null);
				let n = t.root.ownerDocument.activeElement;
				g?.isConnected && g.getClientRects().length && (n === t.root.ownerDocument.body || n && b(e).contains(n)) && !t.root.ownerDocument.querySelector("dialog[open], [data-dialog-content], [data-alert-dialog-content]") && g.focus({ preventScroll: !0 }), g = null;
			}
		};
		c();
	}
	function te() {
		let t = k;
		return k = null, i.removeEventListener("pointermove", ne), i.removeEventListener("pointerup", L), i.removeEventListener("pointercancel", R), t?.handle.hasPointerCapture(t.id) && t.handle.releasePointerCapture(t.id), s && e.changed({ draggingSheet: null }), t;
	}
	function ne(e) {
		k && e.pointerId === k.id && (!_() || !k.handle.isConnected || !a.matches ? te() : (k.last = e.clientY, !k.moving && Math.abs(k.last - k.start) < 6 || (k.moving || (k.handle.setPointerCapture(k.id), k.moving = !0), ee(k.sheet, k.initialProgress + (k.last - k.start) / k.height))));
	}
	function I(t, n) {
		if (!k || t.pointerId !== k.id) return;
		let r = te();
		if (!r || !_()) return;
		if (!r.moving) {
			r.initialSheet === null && F(r.sheet, 0);
			return;
		}
		z.set(r.handle, i.performance.now() + 400);
		let a = wo(+!r.opening, r.start, n ? r.last : t.clientY, r.height);
		e.settled(r.sheet, a === 1), e.read().sheet !== r.sheet && a === 0 && F(r.sheet, 0);
	}
	function L(e) {
		I(e, !1);
	}
	function R(e) {
		I(e, !0);
	}
	let z = /* @__PURE__ */ new WeakMap();
	function re() {
		let t = A;
		A = null, i.removeEventListener("pointermove", ae), i.removeEventListener("pointerup", oe), i.removeEventListener("pointercancel", oe), t?.input.hasPointerCapture(t.id) && t.input.releasePointerCapture(t.id), s && e.changed({ resizing: !1 });
	}
	function ie(t) {
		if (_() && Number.isFinite(t)) {
			l = xo(t, c, e.read().sidebarCollapsed);
			try {
				n.storage?.setItem("vb.docW", String(l));
			} catch {}
			se();
		}
	}
	function ae(e) {
		if (A?.id === e.pointerId) {
			if (!_() || !A.input.isConnected) {
				re();
				return;
			}
			ie(A.width + A.x - e.clientX);
		}
	}
	function oe(e) {
		A?.id === e.pointerId && re();
	}
	function se() {
		if (!_()) return;
		c = t.root.clientWidth;
		let n = e.read(), r = xo(l, c, n.sidebarCollapsed);
		e.changed({
			documentWidth: r,
			documentMaximum: bo(c, n.sidebarCollapsed)
		});
		let a = t.root.clientHeight, o = t.root.getBoundingClientRect(), s = i.visualViewport, u = s ? Math.min(a, Math.max(0, s.offsetTop + s.height - o.top)) : a;
		if (x.set(a > 0 ? u / a : 1), n.mobile) E.suspend(), D.suspend();
		else if (n.documentVisible && !(n.boardFull && n.pane === "board")) {
			let e = n.pane === "board" ? D : E;
			(n.pane === "board" ? E : D).suspend(), e.set(So(r, c, n.sidebarCollapsed));
		} else E.suspend(), D.suspend();
		n.mobile && i.scrollY && i.scrollTo(0, 0);
	}
	function ce(e) {
		if (!_()) return;
		u && !yo(u, e) && (N(), te(), w.suspend(), T.suspend(), S.suspend(), h.doc = 0, d = null, P(null)), k && (k.pane !== e.pane || k.initialSheet !== e.sheet || !e.mobile) && (te(), e.mobile && u && F(u, +(e.sheet === u)));
		let r = e.mobile && e.sheet && yo(e.sheet, e) ? e.sheet : null;
		if (!e.mobile) N(), re(), C.suspend(), w.suspend(), T.suspend(), S.suspend(), u && P(null), h.doc = h.side = 0, d = null;
		else if (!k && r !== d) {
			let e = u;
			if (d = r, r) {
				let n = t.root.ownerDocument.activeElement;
				!e && n instanceof HTMLElement && (n instanceof HTMLButtonElement || n instanceof HTMLAnchorElement) && !b(r).contains(n) && (g = n), e && e !== r && (h[e] = 0, M(e).set(0)), F(r, 1);
			} else e && F(e, 0);
		}
		let i = ++m;
		n.enqueue(() => {
			_() && i === m && (se(), u && e.mobile && !k && f === null && ee(u, h[u]));
		});
	}
	let B = new ResizeObserver(se);
	B.observe(t.root);
	let V = () => {
		_() && se();
	}, le = () => {
		_() && (e.mobile(a.matches), ce(e.read()));
	}, H = () => {
		_() && o.matches && u && F(u, +(e.read().sheet === u));
	}, ue = (n) => {
		let r = e.read().sheet;
		n.key === "Escape" && !n.defaultPrevented && _() && r && !t.root.ownerDocument.querySelector("dialog[open], [data-dialog-content], [data-alert-dialog-content]") && (n.preventDefault(), e.settled(r, !1));
	};
	i.visualViewport?.addEventListener("resize", V), i.visualViewport?.addEventListener("scroll", V), i.addEventListener("resize", V), a.addEventListener("change", le), o.addEventListener("change", H), t.root.ownerDocument.addEventListener("keydown", ue);
	try {
		l = Co(n.storage?.getItem("vb.docW") ?? null);
	} catch {}
	return e.mobile(a.matches), se(), {
		sync: ce,
		cancelGestures() {
			te(), re();
		},
		bindHandle(t, n, r) {
			let o = !0, s = (s) => {
				if (!o || !_() || !t.isConnected || !a.matches || k || s.button !== 0 || !s.isPrimary) return;
				let c = e.read();
				if ((r ? c.sheet !== null || c.boardFull : c.sheet !== n) || !r && !b(n).contains(t)) return;
				let l = b(n).getBoundingClientRect().height;
				l > 0 && (N(), z.delete(t), k = {
					id: s.pointerId,
					handle: t,
					sheet: n,
					opening: r,
					initialSheet: c.sheet,
					initialProgress: h[n],
					pane: c.pane,
					start: s.clientY,
					last: s.clientY,
					height: l,
					moving: !1
				}, P(n), e.changed({ draggingSheet: n }), i.addEventListener("pointermove", ne), i.addEventListener("pointerup", L), i.addEventListener("pointercancel", R));
			}, c = (e) => {
				(z.get(t) ?? 0) >= i.performance.now() && e.detail > 0 && (z.delete(t), e.preventDefault(), e.stopPropagation());
			};
			t.addEventListener("pointerdown", s), t.addEventListener("click", c, !0);
			let l = () => {
				o && (o = !1, k?.handle === t && te(), t.removeEventListener("pointerdown", s), t.removeEventListener("click", c, !0), j.delete(l));
			};
			return j.add(l), l;
		},
		bindWidthInput(t) {
			let n = !0, r = () => n && _() && t.isConnected && !a.matches && e.read().documentVisible && !(e.read().boardFull && e.read().pane === "board"), o = (n) => {
				r() && !a.matches && !A && n.button === 0 && n.isPrimary && (n.preventDefault(), t.focus({ preventScroll: !0 }), t.setPointerCapture(n.pointerId), A = {
					id: n.pointerId,
					input: t,
					x: n.clientX,
					width: e.read().documentWidth
				}, e.changed({ resizing: !0 }), i.addEventListener("pointermove", ae), i.addEventListener("pointerup", oe), i.addEventListener("pointercancel", oe));
			}, s = () => {
				r() && ie(t.valueAsNumber);
			}, c = () => {
				r() && ie(380);
			}, l = (t) => {
				!r() || t.key !== "ArrowLeft" && t.key !== "ArrowRight" || (t.preventDefault(), ie(e.read().documentWidth + (t.key === "ArrowLeft" ? 24 : -24)));
			};
			t.addEventListener("pointerdown", o), t.addEventListener("input", s), t.addEventListener("dblclick", c), t.addEventListener("keydown", l);
			let u = () => {
				n && (n = !1, A?.input === t && re(), t.removeEventListener("pointerdown", o), t.removeEventListener("input", s), t.removeEventListener("dblclick", c), t.removeEventListener("keydown", l), j.delete(u));
			};
			return j.add(u), u;
		},
		dispose() {
			if (s) {
				s = !1, m++, N(), te(), re(), B.disconnect();
				for (let e of [...j]) e();
				for (let e of O) e.dispose();
				i.visualViewport?.removeEventListener("resize", V), i.visualViewport?.removeEventListener("scroll", V), i.removeEventListener("resize", V), a.removeEventListener("change", le), o.removeEventListener("change", H), t.root.ownerDocument.removeEventListener("keydown", ue);
			}
		}
	};
}
// svelte/features/room-layout/controller.ts
function Oo(e) {
	let t = !0, n = 0, r = null;
	return {
		run(i) {
			if (!t || !e.current()) return;
			let a = ++n, o = !1, s = () => t && e.current() && a === n, c = () => {
				s() && !o && (o = !0, i());
			}, l = () => {
				s() && !o && (e.deferSheet(c) || c());
			};
			r?.gate.deferNavigation(l) || l();
		},
		setViewerGate(e) {
			if (!t) return () => {};
			n++;
			let i = { gate: e };
			return r = i, () => {
				r === i && (r = null, n++);
			};
		},
		invalidate() {
			n++;
		},
		dispose() {
			t = !1, n++, r = null;
		}
	};
}
function ko(e) {
	let t = e.browser ?? mo(window), n = e.scopeKey, r = !0, i = null, a = 0, o = {
		pane: "doc",
		sheet: null,
		boardFull: !1,
		documentVisible: !0,
		sidebarCollapsed: e.sidebarCollapsed ?? !1,
		mobile: !1,
		closingUnconfirmed: !1,
		presentedSheet: null,
		draggingSheet: null,
		documentWidth: 380,
		documentMaximum: 380,
		resizing: !1,
		active: !0,
		animationUnavailable: !1
	}, s = E(o), c = /* @__PURE__ */ new Map(), l = /* @__PURE__ */ new Map(), u = () => r && e.scopeKey === n && e.current(), d = (e) => {
		o = {
			...o,
			...e
		}, s.set(o);
	}, f = go({
		browser: t,
		current: u,
		changed(t) {
			if (!r) return;
			let n = o.sheet !== null && t === null;
			d({ sheet: t }), n && u() && e.onDocumentClosed(), i?.sync(o);
		},
		unconfirmed: (e) => {
			r && d({ closingUnconfirmed: e });
		}
	}), p = Oo({
		current: u,
		deferSheet: f.deferNavigation
	}), m = p.run, h = (t) => {
		let n = o.pane !== t;
		d({
			pane: t,
			documentVisible: !0
		}), i?.sync(o), n && u() && e.onPane?.(t);
	}, g = () => {
		a++;
		for (let e of c.values()) e.stop?.(), e.stop = null;
		for (let e of l.values()) e.stop?.(), e.stop = null;
		i?.dispose(), i = null;
	};
	return {
		state: s,
		read: () => o,
		setPane(e, t = {}) {
			m(() => {
				let n = t.toggle && o.mobile && o.sheet === "doc" && o.pane === e;
				(e === "board" || o.mobile && t.open) && d({ boardFull: !1 }), h(e), o.mobile && t.open && (n ? f.close() : f.open("doc"));
			});
		},
		toggleBoard() {
			m(() => {
				let e = !o.boardFull;
				d({
					boardFull: e,
					documentVisible: !e
				}), e && f.close(), i?.sync(o);
			});
		},
		toggleDocument() {
			m(() => {
				o.mobile ? o.sheet === "doc" ? f.close() : (d({
					documentVisible: !0,
					boardFull: !1
				}), f.open("doc")) : (d({ documentVisible: !o.documentVisible }), i?.sync(o));
			});
		},
		toggleSidebar() {
			m(() => {
				d({ sidebarCollapsed: !o.sidebarCollapsed }), i?.sync(o);
			});
		},
		openSheet(e) {
			m(() => {
				o.mobile && o.sheet !== e && (e === "doc" && d({
					documentVisible: !0,
					boardFull: !1
				}), f.open(e));
			});
		},
		closeSheet(e = !1) {
			m(() => {
				e ? f.take() : f.close();
			});
		},
		takeSheetEntry() {
			return u() ? (p.invalidate(), f.take()) : !1;
		},
		beforeNavigation() {
			p.invalidate(), f.beforeNavigation(), i?.cancelGestures();
		},
		consumePop: f.consumePop,
		deferNavigation: f.deferNavigation,
		retryHistory() {
			u() && f.retry();
		},
		setViewerGate(e) {
			return p.setViewerGate(e);
		},
		bindHandle(e, t, n) {
			if (!r) return () => {};
			c.get(e)?.stop?.();
			let a = {
				sheet: t,
				opening: n,
				stop: i?.bindHandle(e, t, n) ?? null
			};
			return c.set(e, a), () => {
				c.get(e) === a && (a.stop?.(), c.delete(e));
			};
		},
		bindWidthInput(e) {
			if (!r) return () => {};
			l.get(e)?.stop?.();
			let t = { stop: i?.bindWidthInput(e) ?? null };
			return l.set(e, t), () => {
				l.get(e) === t && (t.stop?.(), l.delete(e));
			};
		},
		mount(e) {
			if (!u()) return () => {};
			g();
			let n = a;
			i = Do({
				cells: e,
				current: u,
				browser: t,
				read: () => o,
				changed: (e) => {
					r && a === n && d(e);
				},
				settled: (e, t) => {
					u() && m(() => {
						t ? f.open(e) : f.close();
					});
				},
				mobile(e) {
					if (!u() || o.mobile === e) return;
					let t = o.mobile;
					d({ mobile: e }), !e && t && (f.beforeNavigation(), o.boardFull && (d({ boardFull: !1 }), h("board")));
				}
			});
			for (let [e, t] of c) t.stop = i.bindHandle(e, t.sheet, t.opening);
			for (let [e, t] of l) t.stop = i.bindWidthInput(e);
			return i.sync(o), () => {
				a === n && g();
			};
		},
		dispose() {
			r && (r = !1, p.dispose(), f.dispose(), g(), c.clear(), l.clear(), d({
				active: !1,
				sheet: null,
				presentedSheet: null,
				draggingSheet: null,
				closingUnconfirmed: !1,
				resizing: !1
			}));
		}
	};
}
// svelte/features/room-layout/RoomLayoutFrame.svelte
var Ao = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy"
]), jo = B("<div role=\"status\" class=\"tw:absolute tw:inset-x-4 tw:bottom-4 tw:z-50 tw:rounded-control tw:border tw:border-border tw:bg-popover tw:p-3 tw:text-popover-foreground\"><p> </p> <!></div>"), Mo = B("<p role=\"alert\" class=\"tw:absolute tw:inset-x-4 tw:bottom-4 tw:z-50 tw:rounded-control tw:bg-destructive tw:p-3 tw:text-destructive-foreground\"> </p>"), No = B("<div data-vb-native=\"\" data-native-room-layout=\"\" class=\"tw:relative tw:h-full tw:min-h-0 tw:w-full tw:min-w-0 tw:overflow-hidden tw:bg-background tw:font-sans tw:text-sm tw:text-foreground\"><div><aside data-room-sidebar=\"\"><div class=\"tw:min-h-0 tw:flex-1 tw:overflow-y-auto tw:overscroll-contain\"><!></div> <button type=\"button\"><span class=\"tw:h-1 tw:w-10 tw:rounded-full tw:bg-border\"></span></button></aside> <div data-room-header=\"\" class=\"tw:relative tw:z-30 tw:col-start-2 tw:row-start-1 tw:min-w-0 tw:bg-background tw:px-4 tw:pt-[max(0.75rem,env(safe-area-inset-top))] tw:pb-3\"><!></div> <div data-room-peek=\"\"><!></div> <div data-room-attention=\"\" class=\"tw:col-start-2 tw:row-start-3 tw:min-w-0\"><!></div> <div data-room-chat=\"\"><!></div> <div data-room-composer=\"\"><!></div> <div data-room-document-toolbar=\"\"><!></div> <section data-room-document=\"\"><div class=\"tw:flex tw:min-h-0 tw:flex-1 tw:flex-col tw:overflow-auto tw:overscroll-contain\"><!></div> <button type=\"button\"><span class=\"tw:h-1 tw:w-10 tw:rounded-full tw:bg-border\"></span></button></section> <div data-room-board=\"\"><div class=\"tw:flex tw:min-h-0 tw:flex-1 tw:flex-col tw:overflow-auto tw:overscroll-contain tw:p-4\"><!></div> <button type=\"button\"><span class=\"tw:h-1 tw:w-10 tw:rounded-full tw:bg-border\"></span></button></div> <input type=\"range\" min=\"260\" step=\"1\" data-room-width=\"\"/> <button type=\"button\" tabindex=\"-1\" data-room-scrim=\"\"></button></div> <!> <!></div>");
function Po(e, n) {
	f(n, !0);
	let i = () => ye(h, "$view", u), [u, d] = Se();
	W(n, Ao);
	let m = C(() => n.controller), h = m.state, g = v(void 0), y = v(void 0), b = v(void 0), w = v(void 0), T = v(void 0), E = v(void 0), O = v(void 0), k = v(void 0), A = v(void 0), ee = v(void 0), P = v(void 0), F = v(void 0), te = _(() => i().sidebarCollapsed ? "tw:animate-room-document-width-rail" : "tw:animate-room-document-width"), R = _(() => i().presentedSheet === "doc" || i().draggingSheet === "doc"), re = _(() => i().presentedSheet === "side" || i().draggingSheet === "side"), ie = _(() => !i().mobile || i().sheet === "doc" || i().draggingSheet === "doc"), ae = _(() => !i().mobile || i().sheet === "side" || i().draggingSheet === "side"), oe = _(() => i().documentVisible && !(i().boardFull && i().pane === "board")), B = _(() => i().mobile ? "tw:col-start-2 tw:row-start-3 tw:row-end-6 tw:z-20 tw:h-room-document-sheet tw:w-full tw:self-start tw:animate-room-sheet tw:rounded-b-surface tw:shadow-lg tw:has-[form:focus-within]:h-full tw:has-[[contenteditable=true]:focus]:h-full tw:has-[form:focus-within]:rounded-none" : ["tw:col-start-3 tw:row-start-2 tw:row-end-6 tw:h-full tw:border-l tw:border-border", S(te)]);
	function le(e, t) {
		return { destroy: m.bindHandle(e, t.sheet, t.opening) };
	}
	function H(e) {
		return { destroy: m.bindWidthInput(e) };
	}
	function ue(e) {
		e.currentTarget instanceof HTMLButtonElement && e.currentTarget.isConnected && !e.currentTarget.disabled && m.closeSheet();
	}
	t(() => {
		if (!S(g) || !S(y) || !S(b) || !S(w) || !S(T) || !S(E) || !S(O) || !S(k) || !S(A) || !S(ee) || !S(P) || !S(F)) return;
		let e = {
			root: S(g),
			viewport: S(y),
			sidebar: S(b),
			header: S(w),
			peek: S(T),
			attention: S(E),
			chat: S(O),
			composer: S(k),
			documentToolbar: S(A),
			document: S(ee),
			board: S(P),
			scrim: S(F)
		}, t = m.mount(e), r = C(() => n.onChatSurface?.(e.chat)), i = C(() => n.onCells?.(e));
		return () => {
			t(), typeof r == "function" && r(), typeof i == "function" && i();
		};
	});
	var de = No(), fe = c(de), pe = c(fe), me = c(pe), he = c(me);
	z(he, () => n.sidebar), a(me);
	var _e = o(me, 2);
	ve(_e, (e, t) => le?.(e, t), () => ({
		sheet: "side",
		opening: !1
	})), a(pe), U(pe, (e) => l(b, e), () => S(b));
	var be = o(pe, 2), xe = c(be);
	z(xe, () => n.header), a(be), U(be, (e) => l(w, e), () => S(w));
	var Ce = o(be, 2), G = c(Ce);
	z(G, () => n.peek), a(Ce), U(Ce, (e) => l(T, e), () => S(T)), ve(Ce, (e, t) => le?.(e, t), () => ({
		sheet: "doc",
		opening: !0
	}));
	var K = o(Ce, 2), we = c(K);
	z(we, () => n.attention ?? r), a(K), U(K, (e) => l(E, e), () => S(E));
	var q = o(K, 2), Te = c(q);
	z(Te, () => n.chat), a(q), U(q, (e) => l(O, e), () => S(O));
	var Ee = o(q, 2), De = c(Ee);
	z(De, () => n.composer), a(Ee), U(Ee, (e) => l(k, e), () => S(k));
	var Oe = o(Ee, 2), ke = c(Oe);
	z(ke, () => n.documentToolbar), a(Oe), U(Oe, (e) => l(A, e), () => S(A));
	var Ae = o(Oe, 2), je = c(Ae), Y = c(je);
	z(Y, () => n.document), a(je);
	var Me = o(je, 2);
	ve(Me, (e, t) => le?.(e, t), () => ({
		sheet: "doc",
		opening: !1
	})), a(Ae), U(Ae, (e) => l(ee, e), () => S(ee));
	var Ne = o(Ae, 2), Pe = c(Ne), Fe = c(Pe);
	z(Fe, () => n.board), a(Pe);
	var Ie = o(Pe, 2);
	ve(Ie, (e, t) => le?.(e, t), () => ({
		sheet: "doc",
		opening: !1
	})), a(Ne), U(Ne, (e) => l(P, e), () => S(P));
	var Le = o(Ne, 2);
	se(Le), ve(Le, (e) => H?.(e));
	var Re = o(Le, 2);
	U(Re, (e) => l(F, e), () => S(F)), a(fe), U(fe, (e) => l(y, e), () => S(y));
	var ze = o(fe, 2), Be = (e) => {
		var t = jo(), r = c(t), i = p(r, !0), l = o(r, 2);
		ge(l, {
			variant: "outline",
			onclick: () => m.retryHistory(),
			children: (e, t) => {
				s();
				var r = I();
				x(() => J(r, n.labels.historyRetry)), V(e, r);
			},
			$$slots: { default: !0 }
		}), a(t), x(() => J(i, n.labels.historyUnconfirmed)), V(e, t);
	};
	L(ze, (e) => {
		i().closingUnconfirmed && e(Be);
	});
	var Ve = o(ze, 2), He = (e) => {
		var t = Mo(), r = p(t, !0);
		x(() => J(r, n.labels.animationUnavailable)), V(e, t);
	};
	L(Ve, (e) => {
		i().animationUnavailable && e(He);
	}), a(de), U(de, (e) => l(g, e), () => S(g)), x(() => {
		j(de, "data-pane", i().pane), j(de, "data-sheet", i().sheet ?? void 0), j(de, "data-board-full", i().boardFull), N(fe, 1, M([
			"tw:relative tw:grid tw:w-full tw:min-w-0 tw:animate-room-viewport tw:grid-rows-[auto_auto_auto_minmax(0,1fr)_auto] tw:overflow-hidden tw:[container-type:size]",
			i().mobile ? "tw:grid-cols-[0_minmax(0,1fr)_0] tw:[&_input]:text-base tw:[&_textarea]:text-base tw:[&_select]:text-base" : "tw:grid-cols-[auto_minmax(0,1fr)_auto]",
			i().resizing && "tw:cursor-col-resize tw:select-none"
		])), pe.inert = !S(ae), N(pe, 1, M(["tw:flex tw:min-h-0 tw:min-w-0 tw:flex-col tw:bg-background", i().mobile ? ["tw:absolute tw:inset-x-0 tw:top-[12%] tw:z-50 tw:h-[88%] tw:w-full tw:animate-room-sheet tw:rounded-surface tw:shadow-lg", S(re) ? "tw:visible" : "tw:invisible"] : ["tw:col-start-1 tw:row-start-1 tw:row-end-6 tw:border-r tw:border-border", i().sidebarCollapsed ? "tw:w-room-sidebar-rail" : "tw:w-room-sidebar"]])), j(_e, "aria-label", n.labels.closeSidebar), _e.disabled = !i().active || i().sheet !== "side", N(_e, 1, M(i().mobile ? "tw:flex tw:shrink-0 tw:touch-none tw:items-center tw:justify-center tw:border-0 tw:bg-background tw:px-4 tw:pt-2 tw:pb-[max(0.75rem,env(safe-area-inset-bottom))]" : "tw:hidden")), be.inert = i().mobile && i().sheet === "side", Ce.inert = i().mobile && i().sheet === "side", N(Ce, 1, M(i().mobile && !i().boardFull ? "tw:relative tw:z-30 tw:col-start-2 tw:row-start-2 tw:min-w-0 tw:touch-none tw:border-b tw:border-border tw:bg-background" : "tw:hidden")), K.inert = i().mobile && !!i().sheet, q.inert = i().mobile && !!i().sheet, N(q, 1, M(i().boardFull ? "tw:hidden" : "tw:col-start-2 tw:row-start-4 tw:min-h-0 tw:min-w-0 tw:overflow-y-auto tw:overscroll-contain tw:px-4")), Ee.inert = i().mobile && !!i().sheet, N(Ee, 1, M(i().boardFull ? "tw:hidden" : "tw:col-start-2 tw:row-start-5 tw:min-w-0 tw:pb-[env(safe-area-inset-bottom)]")), N(Oe, 1, M(!i().mobile && S(oe) ? "tw:col-start-3 tw:row-start-1 tw:w-0 tw:min-w-full tw:border-l tw:border-border tw:bg-background" : "tw:hidden")), Ae.inert = !S(ie), N(Ae, 1, M([
			"tw:relative tw:min-h-0 tw:min-w-0 tw:flex-col tw:overflow-hidden tw:bg-background",
			S(oe) && i().pane !== "board" ? "tw:flex" : "tw:hidden",
			S(B),
			i().mobile && !S(R) ? "tw:invisible" : "tw:visible"
		])), j(Me, "aria-label", n.labels.closeDocument), Me.disabled = !i().active || i().sheet !== "doc" || i().pane === "board", N(Me, 1, M(i().mobile ? "tw:flex tw:h-6 tw:shrink-0 tw:touch-none tw:items-center tw:justify-center tw:border-0 tw:bg-background" : "tw:hidden")), Ne.inert = i().mobile && (i().sheet === "side" || !i().boardFull && !S(ie)), j(Ne, "data-placement", i().boardFull ? "full" : "pane"), N(Ne, 1, M([
			"tw:relative tw:min-h-0 tw:min-w-0 tw:flex-col tw:overflow-hidden tw:bg-background",
			i().boardFull ? "tw:col-start-2 tw:row-start-4 tw:row-end-6 tw:flex tw:h-full tw:w-full" : i().pane === "board" && S(oe) ? ["tw:flex", S(B)] : "tw:hidden",
			i().mobile && !i().boardFull && !S(R) ? "tw:invisible" : "tw:visible"
		])), j(Ie, "aria-label", n.labels.closeDocument), Ie.disabled = !i().active || i().sheet !== "doc" || i().pane !== "board", N(Ie, 1, M(i().mobile && !i().boardFull ? "tw:flex tw:h-6 tw:shrink-0 tw:touch-none tw:items-center tw:justify-center tw:border-0 tw:bg-background" : "tw:hidden")), j(Le, "max", i().documentMaximum), ce(Le, i().documentWidth), Le.disabled = !i().active, j(Le, "aria-label", n.labels.documentWidth), N(Le, 1, M(!i().mobile && S(oe) ? "tw:z-30 tw:col-start-3 tw:row-start-1 tw:row-end-6 tw:m-0 tw:h-full tw:w-3 tw:cursor-col-resize tw:touch-none tw:appearance-none tw:rounded-none tw:border-0 tw:bg-border tw:p-0 tw:outline-none tw:focus-visible:ring-2 tw:focus-visible:ring-ring" : "tw:hidden")), j(Re, "aria-label", n.labels.closeSheet), Re.disabled = !i().active || !i().sheet, N(Re, 1, M(i().mobile ? [
			"tw:col-start-2 tw:row-start-3 tw:row-end-6 tw:animate-room-scrim tw:border-0 tw:bg-scrim tw:p-0",
			i().presentedSheet === "side" ? "tw:absolute tw:inset-0 tw:z-40" : "tw:z-10",
			i().presentedSheet || i().draggingSheet ? "tw:visible" : "tw:invisible",
			i().sheet ? "tw:pointer-events-auto" : "tw:pointer-events-none"
		] : "tw:hidden"));
	}), ne("click", _e, ue), ne("click", Me, ue), ne("click", Ie, ue), ne("click", Re, ue), V(e, de), D(), d();
}
Ce(["click"]);
// svelte/features/room-layout/RoomLayout.svelte
var Fo = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy"
]);
function Io(e, t) {
	f(t, !0);
	let n = W(t, Fo);
	var r = F(), i = u(r);
	te(i, () => t.controller, (e) => {
		Po(e, me(() => n));
	}), V(e, r), D();
}
// svelte/lib/ui/Select.svelte
var Lo = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"value",
	"items",
	"class",
	"onchange",
	"onValueChange"
]), Ro = B("<option> </option>"), zo = B("<select></select>");
function Bo(e, t) {
	f(t, !0);
	let n = K(t, "value", 15, ""), r = W(t, Lo);
	var i = zo(), o = (e) => {
		let r = e.currentTarget.value;
		t.onValueChange?.(r) === !1 ? e.currentTarget.value = n() : n(r), t.onchange?.(e);
	};
	q(i, (e) => ({
		value: n(),
		...r,
		onchange: o,
		class: e
	}), [() => G("tw:h-9 tw:w-full tw:rounded-control tw:border tw:border-input tw:bg-studio-input-background tw:px-3 tw:py-2 tw:font-sans tw:text-sm tw:font-normal tw:leading-5 tw:text-foreground tw:outline-none tw:focus-visible:ring-2 tw:focus-visible:ring-ring/30 tw:disabled:opacity-50 tw:aria-invalid:border-destructive", t.class)]), ie(i, 21, () => t.items, (e) => e.value, (e, t) => {
		var n = Ro(), r = p(n, !0), i = {};
		x(() => {
			n.disabled = S(t).disabled, J(r, S(t).label), i !== (i = S(t).value) && (n.value = (n.__value = i) ?? "");
		}), V(e, n);
	}), a(i), V(e, i), D();
}
// svelte/lib/ui/RadioGroup.svelte
var Vo = B("<span aria-hidden=\"true\" class=\"tw:pointer-events-none tw:absolute tw:inset-1 tw:rounded-full tw:bg-primary\"></span>"), Ho = B("<label class=\"tw:flex tw:items-center tw:gap-2\"><span class=\"tw:relative tw:inline-flex tw:size-4 tw:shrink-0\"><input type=\"radio\" class=\"tw:m-0 tw:size-4 tw:appearance-none tw:rounded-full tw:border tw:border-input tw:bg-card tw:p-0 tw:outline-none tw:checked:border-primary tw:focus-visible:ring-2 tw:focus-visible:ring-ring tw:focus-visible:ring-offset-2 tw:focus-visible:ring-offset-background tw:disabled:opacity-50\"/> <!></span> <span> </span></label>"), Uo = B("<div role=\"radiogroup\"></div>");
function Wo(e, t) {
	let n = P();
	f(t, !0);
	let r = [], i = K(t, "value", 15, ""), s = K(t, "name", 3, n), l = K(t, "disabled", 3, !1);
	var u = Uo();
	ie(u, 21, () => t.items, (e) => e.value, (e, n) => {
		var u = Ho(), d = c(u), f = c(d);
		se(f);
		var m, h = o(f, 2), g = (e) => {
			var t = Vo();
			V(e, t);
		};
		L(h, (e) => {
			i() === S(n).value && e(g);
		}), a(d);
		var _ = o(d, 2), v = p(_, !0);
		a(u), x(() => {
			j(f, "name", s()), f.disabled = l() || S(n).disabled, m !== (m = S(n).value) && (f.value = (f.__value = m) ?? ""), J(v, S(n).label);
		}), ne("change", f, (e) => t.onValueChange?.(S(n).value, e)), Te(r, [], f, () => (S(n).value, i()), i), V(e, u);
	}), a(u), x((e) => {
		j(u, "aria-label", t.label), N(u, 1, e);
	}, [() => M(G("tw:grid tw:grid-cols-1 tw:gap-2 tw:font-sans tw:text-sm tw:text-foreground", t.class))]), V(e, u), D();
}
Ce(["change"]);
// svelte/lib/ui/Switch.svelte
var Go = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"checked",
	"controlled",
	"class",
	"onchange",
	"onCheckedChange"
]), Ko = B("<span class=\"tw:relative tw:inline-flex tw:shrink-0 tw:align-middle\"><input/> <span aria-hidden=\"true\"></span></span>");
function qo(e, t) {
	f(t, !0);
	let n = K(t, "checked", 15, !1), r = K(t, "controlled", 3, !1), i = W(t, Go);
	var s = Ko(), l = c(s), u = (e) => {
		let i = e.currentTarget.checked;
		r() && (e.currentTarget.checked = n()), t.onchange?.(e), t.onCheckedChange?.(i);
	};
	q(l, (e) => ({
		type: "checkbox",
		role: "switch",
		"aria-checked": n(),
		...i,
		onchange: u,
		class: e
	}), [() => G("tw:m-0 tw:h-5 tw:w-9 tw:appearance-none tw:rounded-full tw:border tw:border-transparent tw:bg-input tw:p-0 tw:outline-none tw:transition-colors tw:checked:bg-primary tw:focus-visible:ring-2 tw:focus-visible:ring-ring tw:focus-visible:ring-offset-2 tw:focus-visible:ring-offset-background tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:motion-reduce:transition-none", t.class)], void 0, void 0, void 0, !0);
	var d = o(l, 2);
	a(s), x((e) => N(d, 1, e), [() => M(G("tw:pointer-events-none tw:absolute tw:left-0.5 tw:top-0.5 tw:size-4 tw:rounded-full tw:bg-card tw:shadow-xs tw:transition-transform tw:motion-reduce:transition-none", n() ? "tw:translate-x-4" : "tw:translate-x-0"))]), we(l, () => n(), (e) => {
		r() || n(e);
	}), V(e, s), D();
}
// svelte/lib/components/Field.svelte
var Jo = B("<p> </p>"), Yo = B("<div class=\"tw:grid tw:grid-cols-1 tw:gap-1.5 tw:font-sans tw:text-sm tw:text-foreground\"><!> <!> <!></div>");
function Xo(e, t) {
	let n = _(() => t.error || t.hint ? `${t.id}-description` : void 0);
	var r = Yo(), i = c(r);
	be(i, {
		get for() {
			return t.id;
		},
		children: (e, n) => {
			s();
			var r = I();
			x(() => J(r, t.label)), V(e, r);
		},
		$$slots: { default: !0 }
	});
	var l = o(i, 2);
	z(l, () => t.children, () => ({
		id: t.id,
		"aria-describedby": S(n),
		"aria-invalid": !!t.error
	}));
	var u = o(l, 2), d = (e) => {
		var r = Jo(), i = p(r, !0);
		x(() => {
			j(r, "id", S(n)), j(r, "role", t.error ? "alert" : void 0), N(r, 1, M(t.error ? "tw:m-0 tw:text-xs tw:font-medium tw:leading-4 tw:text-foreground" : "tw:m-0 tw:text-xs tw:leading-4 tw:text-muted-foreground")), J(i, t.error || t.hint);
		}), V(e, r);
	};
	L(u, (e) => {
		(t.error || t.hint) && e(d);
	}), a(r), V(e, r);
}
export { Y as $, fr as A, un as B, Vi as C, Nr as D, hi as E, An as F, Ht as G, rn as H, Mn as I, It as J, Vt as K, Nn as L, $ as M, Q as N, Ar as O, Ln as P, vt as Q, sn as R, ea as S, Si as T, en as U, an as V, tn as W, X, Pt as Y, Tt as Z, Ra as _, Io as a, ca as b, po as c, io as d, Le as et, $a as f, Va as g, Wa as h, Bo as i, Qn as j, gr as k, lo as l, Ka as m, qo as n, ko as o, Ya as p, Z as q, Wo as r, mo as s, Xo as t, oo as u, Ia as v, Ci as w, ta as x, ja as y, fn as z };
