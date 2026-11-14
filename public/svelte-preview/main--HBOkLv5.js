import { A as e, Fn as t, J as n, Jt as r, K as i, Kt as a, P as o, Q as s, R as c, Tt as l, W as u, ct as d, et as f, j as p, k as m, l as h, m as g, tt as _, wt as v } from "./index-client-B2aDKUZc.js";
import { B as y, C as b, D as x, E as S, F as C, G as w, H as T, K as E, L as D, M as O, N as k, P as A, R as j, U as M, V as N, X as P, Y as ee, a as te, c as ne, d as F, f as I, i as L, l as re, m as ie, p as ae, r as oe, s as se, t as R, u as z, x as B, z as V } from "./Card-DslCvQ-8.js";
import { $ as H, A as ce, B as le, C as ue, D as de, E as fe, F as pe, G as me, H as he, I as ge, J as _e, K as ve, L as ye, M as be, N as xe, O as Se, P as Ce, Q as we, R as Te, T as Ee, U as De, V as Oe, W as ke, X as U, Z as Ae, _ as je, a as Me, c as Ne, d as Pe, et as W, f as Fe, g as Ie, h as Le, i as Re, k as ze, l as Be, m as Ve, n as He, o as Ue, p as We, q as G, r as Ge, s as Ke, t as qe, u as Je, v as Ye, w as Xe, y as Ze, z as Qe } from "./Field-BnyAEV2Y.js";
// node_modules/svelte-toolbelt/dist/utils/on-mount-effect.svelte.js
function $e(t) {
	e(() => g(() => t()));
}
// node_modules/bits-ui/dist/bits/utilities/floating-layer/floating-root.svelte.js
var et = new _e("Floating.Root"), tt = new _e("Floating.Root"), nt = class t {
	static create(e = !1) {
		return e ? tt.set(new t()) : et.set(new t());
	}
	anchorNode = W(null);
	customAnchorNode = W(null);
	triggerNode = W(null);
	constructor() {
		e(() => {
			this.customAnchorNode.current ? typeof this.customAnchorNode.current == "string" ? this.anchorNode.current = document.querySelector(this.customAnchorNode.current) : this.anchorNode.current = this.customAnchorNode.current : this.anchorNode.current = this.triggerNode.current;
		});
	}
};
// node_modules/bits-ui/dist/bits/utilities/floating-layer/components/floating-layer.svelte
function rt(e, n) {
	l(n, !0);
	let r = z(n, "tooltip", 3, !1);
	nt.create(g(() => r()));
	var i = T(), a = c(i);
	k(a, () => n.children ?? t), N(e, i), v();
}
// node_modules/bits-ui/dist/internal/floating-svelte/floating-utils.svelte.js
function it(e) {
	return typeof e == "function" ? e() : e;
}
function at(e) {
	return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function ot(e, t) {
	let n = at(e);
	return Math.round(t * n) / n;
}
function st(e) {
	return {
		[`--bits-${e}-content-transform-origin`]: "var(--bits-floating-transform-origin)",
		[`--bits-${e}-content-available-width`]: "var(--bits-floating-available-width)",
		[`--bits-${e}-content-available-height`]: "var(--bits-floating-available-height)",
		[`--bits-${e}-anchor-width`]: "var(--bits-floating-anchor-width)",
		[`--bits-${e}-anchor-height`]: "var(--bits-floating-anchor-height)"
	};
}
// node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs
var ct = [
	"top",
	"right",
	"bottom",
	"left"
], lt = Math.min, K = Math.max, ut = Math.round, dt = Math.floor, q = (e) => ({
	x: e,
	y: e
}), ft = {
	left: "right",
	right: "left",
	bottom: "top",
	top: "bottom"
};
function pt(e, t, n) {
	return K(e, lt(t, n));
}
function J(e, t) {
	return typeof e == "function" ? e(t) : e;
}
function mt(e) {
	return e.split("-")[0];
}
function ht(e) {
	return e.split("-")[1];
}
function gt(e) {
	return e === "x" ? "y" : "x";
}
function _t(e) {
	return e === "y" ? "height" : "width";
}
function Y(e) {
	let t = e[0];
	return t === "t" || t === "b" ? "y" : "x";
}
function vt(e) {
	return gt(Y(e));
}
function yt(e, t, n) {
	n === void 0 && (n = !1);
	let r = ht(e), i = vt(e), a = _t(i), o = i === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
	return t.reference[a] > t.floating[a] && (o = Ot(o)), [o, Ot(o)];
}
function bt(e) {
	let t = Ot(e);
	return [
		xt(e),
		t,
		xt(t)
	];
}
function xt(e) {
	return e.includes("start") ? e.replace("start", "end") : e.replace("end", "start");
}
var St = ["left", "right"], Ct = ["right", "left"], wt = ["top", "bottom"], Tt = ["bottom", "top"];
function Et(e, t, n) {
	switch (e) {
		case "top":
		case "bottom": return n ? t ? Ct : St : t ? St : Ct;
		case "left":
		case "right": return t ? wt : Tt;
		default: return [];
	}
}
function Dt(e, t, n, r) {
	let i = ht(e), a = Et(mt(e), n === "start", r);
	return i && (a = a.map((e) => e + "-" + i), t && (a = a.concat(a.map(xt)))), a;
}
function Ot(e) {
	let t = mt(e);
	return ft[t] + e.slice(t.length);
}
function kt(e) {
	return {
		top: e.top ?? 0,
		right: e.right ?? 0,
		bottom: e.bottom ?? 0,
		left: e.left ?? 0
	};
}
function At(e) {
	return typeof e == "number" ? {
		top: e,
		right: e,
		bottom: e,
		left: e
	} : kt(e);
}
function jt(e) {
	let { x: t, y: n, width: r, height: i } = e;
	return {
		width: r,
		height: i,
		top: n,
		left: t,
		right: t + r,
		bottom: n + i,
		x: t,
		y: n
	};
}
// node_modules/@floating-ui/core/dist/floating-ui.core.mjs
function Mt(e, t, n) {
	let { reference: r, floating: i } = e, a = Y(t), o = vt(t), s = _t(o), c = mt(t), l = a === "y", u = r.x + r.width / 2 - i.width / 2, d = r.y + r.height / 2 - i.height / 2, f = r[s] / 2 - i[s] / 2, p;
	switch (c) {
		case "top":
			p = {
				x: u,
				y: r.y - i.height
			};
			break;
		case "bottom":
			p = {
				x: u,
				y: r.y + r.height
			};
			break;
		case "right":
			p = {
				x: r.x + r.width,
				y: d
			};
			break;
		case "left":
			p = {
				x: r.x - i.width,
				y: d
			};
			break;
		default: p = {
			x: r.x,
			y: r.y
		};
	}
	let m = ht(t);
	return m && (p[o] += f * (m === "end" ? 1 : -1) * (n && l ? -1 : 1)), p;
}
async function Nt(e, t) {
	t === void 0 && (t = {});
	let { x: n, y: r, platform: i, rects: a, elements: o, strategy: s } = e, { boundary: c = "clippingAncestors", rootBoundary: l = "viewport", elementContext: u = "floating", altBoundary: d = !1, padding: f = 0 } = J(t, e), p = At(f), m = o[d ? u === "floating" ? "reference" : "floating" : u], h = jt(await i.getClippingRect({
		element: await (i.isElement == null ? void 0 : i.isElement(m)) ?? !0 ? m : m.contextElement || await (i.getDocumentElement == null ? void 0 : i.getDocumentElement(o.floating)),
		boundary: c,
		rootBoundary: l,
		strategy: s
	})), g = u === "floating" ? {
		x: n,
		y: r,
		width: a.floating.width,
		height: a.floating.height
	} : a.reference, _ = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(o.floating)), v = await (i.isElement == null ? void 0 : i.isElement(_)) && await (i.getScale == null ? void 0 : i.getScale(_)) || {
		x: 1,
		y: 1
	}, y = jt(i.convertOffsetParentRelativeRectToViewportRelativeRect ? await i.convertOffsetParentRelativeRectToViewportRelativeRect({
		elements: o,
		rect: g,
		offsetParent: _,
		strategy: s
	}) : g);
	return {
		top: (h.top - y.top + p.top) / v.y,
		bottom: (y.bottom - h.bottom + p.bottom) / v.y,
		left: (h.left - y.left + p.left) / v.x,
		right: (y.right - h.right + p.right) / v.x
	};
}
var Pt = 50, Ft = async (e, t, n) => {
	let { placement: r = "bottom", strategy: i = "absolute", middleware: a = [], platform: o } = n, s = o.detectOverflow ? o : {
		...o,
		detectOverflow: Nt
	}, c = await (o.isRTL == null ? void 0 : o.isRTL(t)), l = await o.getElementRects({
		reference: e,
		floating: t,
		strategy: i
	}), { x: u, y: d } = Mt(l, r, c), f = r, p = 0, m = {};
	for (let n = 0; n < a.length; n++) {
		let h = a[n];
		if (!h) continue;
		let { name: g, fn: _ } = h, { x: v, y, data: b, reset: x } = await _({
			x: u,
			y: d,
			initialPlacement: r,
			placement: f,
			strategy: i,
			middlewareData: m,
			rects: l,
			platform: s,
			elements: {
				reference: e,
				floating: t
			}
		});
		u = v ?? u, d = y ?? d, m[g] = {
			...m[g],
			...b
		}, x && p < Pt && (p++, typeof x == "object" && (x.placement && (f = x.placement), x.rects && (l = x.rects === !0 ? await o.getElementRects({
			reference: e,
			floating: t,
			strategy: i
		}) : x.rects), {x: u, y: d} = Mt(l, f, c)), n = -1);
	}
	return {
		x: u,
		y: d,
		placement: f,
		strategy: i,
		middlewareData: m
	};
}, It = (e) => ({
	name: "arrow",
	options: e,
	async fn(t) {
		let { x: n, y: r, placement: i, rects: a, platform: o, elements: s, middlewareData: c } = t, { element: l, padding: u = 0 } = J(e, t) || {};
		if (l == null) return {};
		let d = At(u), f = {
			x: n,
			y: r
		}, p = vt(i), m = _t(p), h = await o.getDimensions(l), g = p === "y", _ = g ? "top" : "left", v = g ? "bottom" : "right", y = g ? "clientHeight" : "clientWidth", b = a.reference[m] + a.reference[p] - f[p] - a.floating[m], x = f[p] - a.reference[p], S = await (o.getOffsetParent == null ? void 0 : o.getOffsetParent(l)), C = S ? S[y] : 0;
		C && await (o.isElement == null ? void 0 : o.isElement(S)) || (C = s.floating[y] || a.floating[m]);
		let w = b / 2 - x / 2, T = C / 2 - h[m] / 2 - 1, E = lt(d[_], T), D = lt(d[v], T), O = C - h[m] - D, k = C / 2 - h[m] / 2 + w, A = pt(E, k, O), j = !c.arrow && ht(i) != null && k !== A && a.reference[m] / 2 - (k < E ? E : D) - h[m] / 2 < 0, M = j ? k < E ? k - E : k - O : 0;
		return {
			[p]: f[p] + M,
			data: {
				[p]: A,
				centerOffset: k - A - M,
				...j && { alignmentOffset: M }
			},
			reset: j
		};
	}
}), Lt = function(e) {
	return e === void 0 && (e = {}), {
		name: "flip",
		options: e,
		async fn(t) {
			var n;
			let { placement: r, middlewareData: i, rects: a, initialPlacement: o, platform: s, elements: c } = t, { mainAxis: l = !0, crossAxis: u = !0, fallbackPlacements: d, fallbackStrategy: f = "bestFit", fallbackAxisSideDirection: p = "none", flipAlignment: m = !0, ...h } = J(e, t);
			if ((n = i.arrow) != null && n.alignmentOffset) return {};
			let g = mt(r), _ = Y(o), v = mt(o) === o, y = await (s.isRTL == null ? void 0 : s.isRTL(c.floating)), b = d || (v || !m ? [Ot(o)] : bt(o)), x = p !== "none";
			!d && x && b.push(...Dt(o, m, p, y));
			let S = [o, ...b], C = await s.detectOverflow(t, h), w = [], T = i.flip?.overflows || [];
			if (l && w.push(C[g]), u) {
				let e = yt(r, a, y);
				w.push(C[e[0]], C[e[1]]);
			}
			if (T = [...T, {
				placement: r,
				overflows: w
			}], !w.every((e) => e <= 0)) {
				let e = (i.flip?.index || 0) + 1, t = S[e];
				if (t && (u !== "alignment" || _ === Y(t) || T.every((e) => Y(e.placement) !== _ || e.overflows[0] > 0))) return {
					data: {
						index: e,
						overflows: T
					},
					reset: { placement: t }
				};
				let n = T.filter((e) => e.overflows[0] <= 0).sort((e, t) => e.overflows[1] - t.overflows[1])[0]?.placement;
				if (!n) switch (f) {
					case "bestFit": {
						let e = T.filter((e) => {
							if (x) {
								let t = Y(e.placement);
								return t === _ || t === "y";
							}
							return !0;
						}).map((e) => [e.placement, e.overflows.filter((e) => e > 0).reduce((e, t) => e + t, 0)]).sort((e, t) => e[1] - t[1])[0]?.[0];
						e && (n = e);
						break;
					}
					case "initialPlacement": n = o;
				}
				if (r !== n) return { reset: { placement: n } };
			}
			return {};
		}
	};
};
function Rt(e, t) {
	return {
		top: e.top - t.height,
		right: e.right - t.width,
		bottom: e.bottom - t.height,
		left: e.left - t.width
	};
}
function zt(e) {
	return ct.some((t) => e[t] >= 0);
}
var Bt = function(e) {
	return e === void 0 && (e = {}), {
		name: "hide",
		options: e,
		async fn(t) {
			let { rects: n, platform: r } = t, { strategy: i = "referenceHidden", ...a } = J(e, t);
			switch (i) {
				case "referenceHidden": {
					let e = Rt(await r.detectOverflow(t, {
						...a,
						elementContext: "reference"
					}), n.reference);
					return { data: {
						referenceHiddenOffsets: e,
						referenceHidden: zt(e)
					} };
				}
				case "escaped": {
					let e = Rt(await r.detectOverflow(t, {
						...a,
						altBoundary: !0
					}), n.floating);
					return { data: {
						escapedOffsets: e,
						escaped: zt(e)
					} };
				}
				default: return {};
			}
		}
	};
}, Vt = /*#__PURE__*/ new Set(["left", "top"]);
async function Ht(e, t) {
	let { placement: n, platform: r, elements: i } = e, a = await (r.isRTL == null ? void 0 : r.isRTL(i.floating)), o = mt(n), s = ht(n), c = Y(n) === "y", l = Vt.has(o) ? -1 : 1, u = a && c ? -1 : 1, d = J(t, e), { mainAxis: f, crossAxis: p, alignmentAxis: m } = typeof d == "number" ? {
		mainAxis: d,
		crossAxis: 0,
		alignmentAxis: null
	} : {
		mainAxis: d.mainAxis || 0,
		crossAxis: d.crossAxis || 0,
		alignmentAxis: d.alignmentAxis
	};
	return s && typeof m == "number" && (p = s === "end" ? m * -1 : m), c ? {
		x: p * u,
		y: f * l
	} : {
		x: f * l,
		y: p * u
	};
}
var Ut = function(e) {
	return e === void 0 && (e = 0), {
		name: "offset",
		options: e,
		async fn(t) {
			var n;
			let { x: r, y: i, placement: a, middlewareData: o } = t, s = await Ht(t, e);
			return a === o.offset?.placement && (n = o.arrow) != null && n.alignmentOffset ? {} : {
				x: r + s.x,
				y: i + s.y,
				data: {
					...s,
					placement: a
				}
			};
		}
	};
}, Wt = function(e) {
	return e === void 0 && (e = {}), {
		name: "shift",
		options: e,
		async fn(t) {
			let { x: n, y: r, placement: i, platform: a } = t, { mainAxis: o = !0, crossAxis: s = !1, limiter: c = { fn: (e) => {
				let { x: t, y: n } = e;
				return {
					x: t,
					y: n
				};
			} }, ...l } = J(e, t), u = {
				x: n,
				y: r
			}, d = await a.detectOverflow(t, l), f = Y(i), p = gt(f), m = u[p], h = u[f], g = (e, t) => pt(t + d[e === "y" ? "top" : "left"], t, t - d[e === "y" ? "bottom" : "right"]);
			o && (m = g(p, m)), s && (h = g(f, h));
			let _ = c.fn({
				...t,
				[p]: m,
				[f]: h
			});
			return {
				..._,
				data: {
					x: _.x - n,
					y: _.y - r,
					enabled: {
						[p]: o,
						[f]: s
					}
				}
			};
		}
	};
}, Gt = function(e) {
	return e === void 0 && (e = {}), {
		options: e,
		fn(t) {
			let { x: n, y: r, placement: i, rects: a, middlewareData: o } = t, { offset: s = 0, mainAxis: c = !0, crossAxis: l = !0 } = J(e, t), u = {
				x: n,
				y: r
			}, d = Y(i), f = gt(d), p = u[f], m = u[d], h = J(s, t), g = typeof h == "number" ? {
				mainAxis: h,
				crossAxis: 0
			} : {
				mainAxis: h.mainAxis ?? 0,
				crossAxis: h.crossAxis ?? 0
			};
			if (c) {
				let e = f === "y" ? "height" : "width", t = a.reference[f] - a.floating[e] + g.mainAxis, n = a.reference[f] + a.reference[e] - g.mainAxis;
				p < t ? p = t : p > n && (p = n);
			}
			if (l) {
				let e = f === "y" ? "width" : "height", t = Vt.has(mt(i)), n = a.reference[d] - a.floating[e] + (t && o.offset?.[d] || 0) + (t ? 0 : g.crossAxis), r = a.reference[d] + a.reference[e] + (t ? 0 : o.offset?.[d] || 0) - (t ? g.crossAxis : 0);
				m < n ? m = n : m > r && (m = r);
			}
			return {
				[f]: p,
				[d]: m
			};
		}
	};
}, Kt = function(e) {
	return e === void 0 && (e = {}), {
		name: "size",
		options: e,
		async fn(t) {
			let { placement: n, rects: r, platform: i, elements: a } = t, { apply: o = () => {}, ...s } = J(e, t), c = await i.detectOverflow(t, s), l = mt(n), u = ht(n), d = Y(n) === "y", { width: f, height: p } = r.floating, m, h;
			l === "top" || l === "bottom" ? (m = l, h = u === (await (i.isRTL == null ? void 0 : i.isRTL(a.floating)) ? "start" : "end") ? "left" : "right") : (h = l, m = u === "end" ? "top" : "bottom");
			let g = p - c.top - c.bottom, _ = f - c.left - c.right, v = lt(p - c[m], g), y = lt(f - c[h], _), b = t.middlewareData.shift, x = !b, S = v, C = y;
			b != null && b.enabled.x && (C = _), b != null && b.enabled.y && (S = g), x && !u && (d ? C = f - 2 * K(c.left, c.right) : S = p - 2 * K(c.top, c.bottom)), await o({
				...t,
				availableWidth: C,
				availableHeight: S
			});
			let w = await i.getDimensions(a.floating);
			return f !== w.width || p !== w.height ? { reset: { rects: !0 } } : {};
		}
	};
};
// node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs
function qt() {
	return typeof window < "u";
}
function Jt(e) {
	return Yt(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function X(e) {
	var t;
	return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function Z(e) {
	return ((Yt(e) ? e.ownerDocument : e.document) || window.document)?.documentElement;
}
function Yt(e) {
	return qt() ? e instanceof Node || e instanceof X(e).Node : !1;
}
function Q(e) {
	return qt() ? e instanceof Element || e instanceof X(e).Element : !1;
}
function Xt(e) {
	return qt() ? e instanceof HTMLElement || e instanceof X(e).HTMLElement : !1;
}
function Zt(e) {
	return !qt() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof X(e).ShadowRoot;
}
function Qt(e) {
	let { overflow: t, overflowX: n, overflowY: r, display: i } = $(e);
	return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && i !== "inline" && i !== "contents";
}
function $t(e) {
	return /^(table|td|th)$/.test(Jt(e));
}
function en(e) {
	try {
		if (e.matches(":popover-open")) return !0;
	} catch {}
	try {
		return e.matches(":modal");
	} catch {
		return !1;
	}
}
var tn = /transform|translate|scale|rotate|perspective|filter/, nn = /paint|layout|strict|content/, rn = (e) => !!e && e !== "none", an;
function on(e) {
	let t = Q(e) ? $(e) : e;
	return rn(t.transform) || rn(t.translate) || rn(t.scale) || rn(t.rotate) || rn(t.perspective) || !cn() && (rn(t.backdropFilter) || rn(t.filter)) || tn.test(t.willChange || "") || nn.test(t.contain || "");
}
function sn(e) {
	let t = dn(e);
	for (; Xt(t) && !ln(t);) {
		if (on(t)) return t;
		if (en(t)) return null;
		t = dn(t);
	}
	return null;
}
function cn() {
	return an ??= typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none"), an;
}
function ln(e) {
	return /^(html|body|#document)$/.test(Jt(e));
}
function $(e) {
	return X(e).getComputedStyle(e);
}
function un(e) {
	return Q(e) ? {
		scrollLeft: e.scrollLeft,
		scrollTop: e.scrollTop
	} : {
		scrollLeft: e.scrollX,
		scrollTop: e.scrollY
	};
}
function dn(e) {
	if (Jt(e) === "html") return e;
	let t = e.assignedSlot || e.parentNode || Zt(e) && e.host || Z(e);
	return Zt(t) ? t.host : t;
}
function fn(e) {
	let t = dn(e);
	return ln(t) ? (e.ownerDocument || e).body : Xt(t) && Qt(t) ? t : fn(t);
}
function pn(e, t, n) {
	t === void 0 && (t = []), n === void 0 && (n = !0);
	let r = fn(e), i = r === e.ownerDocument?.body, a = X(r);
	if (i) {
		let e = mn(a);
		return t.concat(a, a.visualViewport || [], Qt(r) ? r : [], e && n ? pn(e) : []);
	}
	return t.concat(r, pn(r, [], n));
}
function mn(e) {
	return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
// node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs
function hn(e) {
	let t = $(e), n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0, i = Xt(e), a = i ? e.offsetWidth : n, o = i ? e.offsetHeight : r, s = ut(n) !== a || ut(r) !== o;
	return s && (n = a, r = o), {
		width: n,
		height: r,
		$: s
	};
}
function gn(e) {
	return Q(e) ? e : e.contextElement;
}
function _n(e) {
	let t = gn(e);
	if (!Xt(t)) return q(1);
	let n = t.getBoundingClientRect(), { width: r, height: i, $: a } = hn(t), o = (a ? ut(n.width) : n.width) / r, s = (a ? ut(n.height) : n.height) / i;
	return o && Number.isFinite(o) || (o = 1), s && Number.isFinite(s) || (s = 1), {
		x: o,
		y: s
	};
}
var vn = /*#__PURE__*/ q(0);
function yn(e) {
	let t = X(e);
	return !cn() || !t.visualViewport ? vn : {
		x: t.visualViewport.offsetLeft,
		y: t.visualViewport.offsetTop
	};
}
function bn(e, t, n) {
	return t === void 0 && (t = !1), !!n && t && n === X(e);
}
function xn(e, t, n, r) {
	t === void 0 && (t = !1), n === void 0 && (n = !1);
	let i = e.getBoundingClientRect(), a = gn(e), o = q(1);
	t && (r ? Q(r) && (o = _n(r)) : o = _n(e));
	let s = bn(a, n, r) ? yn(a) : q(0), c = (i.left + s.x) / o.x, l = (i.top + s.y) / o.y, u = i.width / o.x, d = i.height / o.y;
	if (a && r) {
		let e = X(a), t = Q(r) ? X(r) : r, n = e, i = mn(n);
		for (; i && t !== n;) {
			let e = _n(i), t = i.getBoundingClientRect(), r = $(i), a = t.left + (i.clientLeft + parseFloat(r.paddingLeft)) * e.x, o = t.top + (i.clientTop + parseFloat(r.paddingTop)) * e.y;
			c *= e.x, l *= e.y, u *= e.x, d *= e.y, c += a, l += o, n = X(i), i = mn(n);
		}
	}
	return jt({
		width: u,
		height: d,
		x: c,
		y: l
	});
}
function Sn(e, t) {
	let n = un(e).scrollLeft;
	return t ? t.left + n : xn(Z(e)).left + n;
}
function Cn(e, t) {
	let n = e.getBoundingClientRect();
	return {
		x: n.left + t.scrollLeft - Sn(e, n),
		y: n.top + t.scrollTop
	};
}
function wn(e) {
	let { elements: t, rect: n, offsetParent: r, strategy: i } = e, a = i === "fixed", o = Z(r), s = t ? en(t.floating) : !1;
	if (r === o || s && a) return n;
	let c = {
		scrollLeft: 0,
		scrollTop: 0
	}, l = q(1), u = q(0), d = Xt(r);
	if ((d || !a) && ((Jt(r) !== "body" || Qt(o)) && (c = un(r)), d)) {
		let e = xn(r);
		l = _n(r), u.x = e.x + r.clientLeft, u.y = e.y + r.clientTop;
	}
	let f = o && !d && !a ? Cn(o, c) : q(0);
	return {
		width: n.width * l.x,
		height: n.height * l.y,
		x: n.x * l.x - c.scrollLeft * l.x + u.x + f.x,
		y: n.y * l.y - c.scrollTop * l.y + u.y + f.y
	};
}
function Tn(e) {
	return e.getClientRects ? Array.from(e.getClientRects()) : [];
}
function En(e) {
	let t = un(e), n = e.ownerDocument.body, r = K(e.scrollWidth, e.clientWidth, n.scrollWidth, n.clientWidth), i = K(e.scrollHeight, e.clientHeight, n.scrollHeight, n.clientHeight), a = -t.scrollLeft + Sn(e), o = -t.scrollTop;
	return $(n).direction === "rtl" && (a += K(e.clientWidth, n.clientWidth) - r), {
		width: r,
		height: i,
		x: a,
		y: o
	};
}
var Dn = 25;
function On(e, t, n) {
	n === void 0 && (n = "viewport");
	let r = n === "layoutViewport", i = X(e), a = Z(e), o = i.visualViewport, s = a.clientWidth, c = a.clientHeight, l = 0, u = 0;
	if (o) {
		let e = !cn() || t === "fixed";
		r ? e || (l = -o.offsetLeft, u = -o.offsetTop) : (s = o.width, c = o.height, e && (l = o.offsetLeft, u = o.offsetTop));
	}
	if (Sn(a) <= 0) {
		let e = a.ownerDocument, t = e.body, n = getComputedStyle(t), r = e.compatMode === "CSS1Compat" && parseFloat(n.marginLeft) + parseFloat(n.marginRight) || 0, i = Math.abs(a.clientWidth - t.clientWidth - r), o = getComputedStyle(a).scrollbarGutter === "stable both-edges" ? i / 2 : i;
		o <= Dn && (s -= o);
	}
	return {
		width: s,
		height: c,
		x: l,
		y: u
	};
}
function kn(e, t) {
	let n = xn(e, !0, t === "fixed"), r = n.top + e.clientTop, i = n.left + e.clientLeft, a = _n(e);
	return {
		width: e.clientWidth * a.x,
		height: e.clientHeight * a.y,
		x: i * a.x,
		y: r * a.y
	};
}
function An(e, t, n) {
	let r;
	if (t === "viewport" || t === "layoutViewport") r = On(e, n, t);
	else if (t === "document") r = En(Z(e));
	else if (Q(t)) r = kn(t, n);
	else {
		let n = yn(e);
		r = {
			x: t.x - n.x,
			y: t.y - n.y,
			width: t.width,
			height: t.height
		};
	}
	return jt(r);
}
function jn(e, t) {
	let n = t.get(e);
	if (n) return n;
	let r = pn(e, [], !1).filter((e) => Q(e) && Jt(e) !== "body"), i = null, a = $(e).position === "fixed", o = a ? dn(e) : e;
	for (; Q(o) && !ln(o);) {
		let e = $(o), t = on(o), n = i ? i.position : a ? "fixed" : "";
		!t && (n === "fixed" || n === "absolute" && e.position === "static") ? r = r.filter((e) => e !== o) : i = e, o = dn(o);
	}
	return t.set(e, r), r;
}
function Mn(e) {
	let { element: t, boundary: n, rootBoundary: r, strategy: i } = e, a = [...n === "clippingAncestors" ? en(t) ? [] : jn(t, this._c) : [].concat(n), r], o = An(t, a[0], i), s = o.top, c = o.right, l = o.bottom, u = o.left;
	for (let e = 1; e < a.length; e++) {
		let n = An(t, a[e], i);
		s = K(n.top, s), c = lt(n.right, c), l = lt(n.bottom, l), u = K(n.left, u);
	}
	return {
		width: c - u,
		height: l - s,
		x: u,
		y: s
	};
}
function Nn(e) {
	let { width: t, height: n } = hn(e);
	return {
		width: t,
		height: n
	};
}
function Pn(e, t, n) {
	let r = Xt(t), i = Z(t), a = n === "fixed", o = xn(e, !0, a, t), s = {
		scrollLeft: 0,
		scrollTop: 0
	}, c = q(0);
	if ((r || !a) && ((Jt(t) !== "body" || Qt(i)) && (s = un(t)), r)) {
		let e = xn(t, !0, a, t);
		c.x = e.x + t.clientLeft, c.y = e.y + t.clientTop;
	}
	!r && i && (c.x = Sn(i));
	let l = i && !r && !a ? Cn(i, s) : q(0);
	return {
		x: o.left + s.scrollLeft - c.x - l.x,
		y: o.top + s.scrollTop - c.y - l.y,
		width: o.width,
		height: o.height
	};
}
function Fn(e) {
	return $(e).position === "static";
}
function In(e, t) {
	if (!Xt(e) || $(e).position === "fixed") return null;
	if (t) return t(e);
	let n = e.offsetParent;
	return Z(e) === n && (n = n.ownerDocument.body), n;
}
function Ln(e, t) {
	let n = X(e);
	if (en(e)) return n;
	if (!Xt(e)) {
		let t = dn(e);
		for (; t && !ln(t);) {
			if (Q(t) && !Fn(t)) return t;
			t = dn(t);
		}
		return n;
	}
	let r = In(e, t);
	for (; r && $t(r) && Fn(r);) r = In(r, t);
	return r && ln(r) && Fn(r) && !on(r) ? n : r || sn(e) || n;
}
var Rn = async function(e) {
	let t = this.getOffsetParent || Ln, n = this.getDimensions, r = await n(e.floating);
	return {
		reference: Pn(e.reference, await t(e.floating), e.strategy),
		floating: {
			x: 0,
			y: 0,
			width: r.width,
			height: r.height
		}
	};
};
function zn(e) {
	return $(e).direction === "rtl";
}
var Bn = {
	convertOffsetParentRelativeRectToViewportRelativeRect: wn,
	getDocumentElement: Z,
	getClippingRect: Mn,
	getOffsetParent: Ln,
	getElementRects: Rn,
	getClientRects: Tn,
	getDimensions: Nn,
	getScale: _n,
	isElement: Q,
	isRTL: zn
};
function Vn(e, t) {
	return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function Hn(e, t, n) {
	let r = null, i, a = Z(e);
	function o() {
		var e;
		clearTimeout(i), (e = r) == null || e.disconnect(), r = null;
	}
	function s(n, c) {
		n === void 0 && (n = !1), c === void 0 && (c = 1), o();
		let l = e.getBoundingClientRect(), { left: u, top: d, width: f, height: p } = l;
		if (n || t(), !f || !p) return;
		let m = dt(d), h = dt(a.clientWidth - (u + f)), g = dt(a.clientHeight - (d + p)), _ = dt(u), v = {
			rootMargin: -m + "px " + -h + "px " + -g + "px " + -_ + "px",
			threshold: K(0, lt(1, c)) || 1
		}, y = !0;
		function b(t) {
			let n = t[0].intersectionRatio;
			if (!Vn(l, e.getBoundingClientRect())) return s();
			if (n !== c) {
				if (!y) return s();
				n ? s(!1, n) : i = setTimeout(() => {
					s(!1, 1e-7);
				}, 1e3);
			}
			y = !1;
		}
		try {
			r = new IntersectionObserver(b, {
				...v,
				root: a.ownerDocument
			});
		} catch {
			r = new IntersectionObserver(b, v);
		}
		r.observe(e);
	}
	let c = X(e), l = () => s(n);
	return c.addEventListener("resize", l), s(!0), () => {
		c.removeEventListener("resize", l), o();
	};
}
function Un(e, t, n, r) {
	r === void 0 && (r = {});
	let { ancestorScroll: i = !0, ancestorResize: a = !0, elementResize: o = typeof ResizeObserver == "function", layoutShift: s = typeof IntersectionObserver == "function", animationFrame: c = !1 } = r, l = gn(e), u = i || a ? [...l ? pn(l) : [], ...t ? pn(t) : []] : [];
	u.forEach((e) => {
		i && e.addEventListener("scroll", n), a && e.addEventListener("resize", n);
	});
	let d = l && s ? Hn(l, n, a) : null, f = -1, p = null;
	o && (p = new ResizeObserver((e) => {
		let [r] = e;
		r && r.target === l && p && t && (p.unobserve(t), cancelAnimationFrame(f), f = requestAnimationFrame(() => {
			var e;
			(e = p) == null || e.observe(t);
		})), n();
	}), l && !c && p.observe(l), t && p.observe(t));
	let m, h = c ? xn(e) : null;
	c && g();
	function g() {
		let t = xn(e);
		h && !Vn(h, t) && n(), h = t, m = requestAnimationFrame(g);
	}
	return n(), () => {
		var e;
		u.forEach((e) => {
			i && e.removeEventListener("scroll", n), a && e.removeEventListener("resize", n);
		}), d?.(), (e = p) == null || e.disconnect(), p = null, c && cancelAnimationFrame(m);
	};
}
var Wn = Ut, Gn = Wt, Kn = Lt, qn = Kt, Jn = Bt, Yn = It, Xn = Gt, Zn = (e, t, n) => {
	let r = /* @__PURE__ */ new Map(), i = n ?? {}, a = {
		...Bn,
		...i.platform,
		_c: r
	};
	return Ft(e, t, {
		...i,
		platform: a
	});
};
// node_modules/bits-ui/dist/internal/floating-svelte/use-floating.svelte.js
function Qn(t) {
	let r = t.whileElementsMounted, i = d(() => it(t.open) ?? !0), a = d(() => it(t.middleware)), o = d(() => it(t.transform) ?? !0), c = d(() => it(t.placement) ?? "bottom"), l = d(() => it(t.strategy) ?? "absolute"), u = d(() => it(t.sideOffset) ?? 0), m = d(() => it(t.alignOffset) ?? 0), g = t.reference, _;
	p(() => {
		_ = {
			middleware: h(a),
			placement: h(c),
			strategy: h(l),
			open: h(i),
			sideOffset: h(u),
			alignOffset: h(m)
		};
	});
	let v = f(0), y = f(0), b = W(null), x = f(n(h(l))), S = f(n(h(c))), C = f(n({})), w = f(!1), T = !1, E = 0, D = !1, O = d(() => {
		let e = b.current ? ot(b.current, h(v)) : h(v), t = b.current ? ot(b.current, h(y)) : h(y);
		return h(o) ? {
			position: h(x),
			left: "0",
			top: "0",
			transform: `translate(${e}px, ${t}px)`,
			...b.current && at(b.current) >= 1.5 && { willChange: "transform" }
		} : {
			position: h(x),
			left: `${e}px`,
			top: `${t}px`
		};
	}), k;
	function A() {
		if (D || g.current === null || b.current === null) return;
		let e = g.current, t = b.current, n = ++E;
		Zn(e, t, {
			middleware: _.middleware,
			placement: _.placement,
			strategy: _.strategy
		}).then((r) => {
			if (n === E && g.current === e && b.current === t) {
				if ($n(e)) s(C, {
					...h(C),
					hide: {
						...h(C).hide,
						referenceHidden: !0
					}
				}, !0);
				else {
					if (!_.open && h(v) !== 0 && h(y) !== 0) {
						let e = Math.max(Math.abs(_.sideOffset), Math.abs(_.alignOffset), 15);
						if (r.x <= e && r.y <= e) return;
					}
					s(v, r.x, !0), s(y, r.y, !0), s(x, r.strategy, !0), s(S, r.placement, !0), s(C, r.middlewareData, !0), s(w, !0);
				}
			}
		});
	}
	function j() {
		typeof k == "function" && (k(), k = void 0), E++;
	}
	function M() {
		j(), r === void 0 ? (N(), A()) : h(i) && g.current !== null && b.current !== null && (N(), k = r(g.current, b.current, A));
	}
	function N() {
		return [
			h(a),
			h(c),
			h(l)
		];
	}
	function P() {
		!h(i) && b.current === null && s(w, !1);
	}
	function ee() {
		return [
			h(a),
			h(c),
			h(l),
			h(u),
			h(m),
			h(i)
		];
	}
	return e(() => {
		r === void 0 && h(i) && (N(), A());
	}), e(M), e(() => {
		r !== void 0 && (ee(), h(i) && h(w) ? T ? A() : T = !0 : T = !1);
	}), e(P), e(() => () => {
		D = !0, j();
	}), {
		floating: b,
		reference: g,
		get strategy() {
			return h(x);
		},
		get placement() {
			return h(S);
		},
		get middlewareData() {
			return h(C);
		},
		get isPositioned() {
			return h(w);
		},
		get floatingStyles() {
			return h(O);
		},
		get update() {
			return A;
		}
	};
}
function $n(e) {
	return e instanceof Element ? !e.isConnected || e instanceof HTMLElement && e.hidden ? !0 : e.getClientRects().length === 0 : !1;
}
// node_modules/bits-ui/dist/bits/utilities/floating-layer/use-floating-layer.svelte.js
var er = {
	top: "bottom",
	right: "left",
	bottom: "top",
	left: "right"
}, tr = new _e("Floating.Content"), nr = class t {
	static create(e, n = !1) {
		return n ? tr.set(new t(e, tt.get())) : tr.set(new t(e, et.get()));
	}
	opts;
	root;
	contentRef = W(null);
	wrapperRef = W(null);
	arrowRef = W(null);
	contentAttachment = Oe(this.contentRef);
	wrapperAttachment = Oe(this.wrapperRef);
	arrowAttachment = Oe(this.arrowRef);
	arrowId = W(Xe());
	#e = d(() => {
		if (typeof this.opts.style == "string") return we(this.opts.style);
		if (!this.opts.style) return {};
	});
	#t = void 0;
	#n = new ve(() => this.arrowRef.current ?? void 0);
	#r = d(() => this.#n?.width ?? 0);
	#i = d(() => this.#n?.height ?? 0);
	#a = d(() => this.opts.side?.current + (this.opts.align.current === "center" ? "" : `-${this.opts.align.current}`));
	#o = d(() => (Array.isArray(this.opts.collisionBoundary.current) ? this.opts.collisionBoundary.current : [this.opts.collisionBoundary.current]).filter(ye));
	#s = d(() => h(this.#o).length > 0);
	get hasExplicitBoundaries() {
		return h(this.#s);
	}
	set hasExplicitBoundaries(e) {
		s(this.#s, e);
	}
	#c = d(() => ({
		padding: this.opts.collisionPadding.current,
		boundary: h(this.#o),
		altBoundary: this.hasExplicitBoundaries
	}));
	get detectOverflowOptions() {
		return h(this.#c);
	}
	set detectOverflowOptions(e) {
		s(this.#c, e);
	}
	#l = f(void 0);
	#u = f(void 0);
	#d = f(void 0);
	#f = f(void 0);
	#p = d(() => [
		Wn({
			mainAxis: this.opts.sideOffset.current + h(this.#i),
			alignmentAxis: this.opts.alignOffset.current
		}),
		this.opts.avoidCollisions.current && Gn({
			mainAxis: !0,
			crossAxis: !1,
			limiter: this.opts.sticky.current === "partial" ? Xn() : void 0,
			...this.detectOverflowOptions
		}),
		this.opts.avoidCollisions.current && Kn({ ...this.detectOverflowOptions }),
		qn({
			...this.detectOverflowOptions,
			apply: ({ rects: e, availableWidth: t, availableHeight: n }) => {
				let { width: r, height: i } = e.reference;
				s(this.#l, t, !0), s(this.#u, n, !0), s(this.#d, r, !0), s(this.#f, i, !0);
			}
		}),
		this.arrowRef.current && Yn({
			element: this.arrowRef.current,
			padding: this.opts.arrowPadding.current
		}),
		rr({
			arrowWidth: h(this.#r),
			arrowHeight: h(this.#i)
		}),
		this.opts.hideWhenDetached.current && Jn({
			strategy: "referenceHidden",
			...this.detectOverflowOptions
		}),
		this.opts.hideWhenDetached.current && !this.hasExplicitBoundaries && {
			...Jn({
				strategy: "referenceHidden",
				boundary: "clippingAncestors"
			}),
			name: "hideClipping"
		}
	].filter(Boolean));
	get middleware() {
		return h(this.#p);
	}
	set middleware(e) {
		s(this.#p, e);
	}
	floating;
	#m = d(() => ar(this.floating.placement));
	get placedSide() {
		return h(this.#m);
	}
	set placedSide(e) {
		s(this.#m, e);
	}
	#h = d(() => or(this.floating.placement));
	get placedAlign() {
		return h(this.#h);
	}
	set placedAlign(e) {
		s(this.#h, e);
	}
	#g = d(() => this.floating.middlewareData.arrow?.x ?? 0);
	get arrowX() {
		return h(this.#g);
	}
	set arrowX(e) {
		s(this.#g, e);
	}
	#_ = d(() => this.floating.middlewareData.arrow?.y ?? 0);
	get arrowY() {
		return h(this.#_);
	}
	set arrowY(e) {
		s(this.#_, e);
	}
	#v = d(() => this.floating.middlewareData.arrow?.centerOffset !== 0);
	get cannotCenterArrow() {
		return h(this.#v);
	}
	set cannotCenterArrow(e) {
		s(this.#v, e);
	}
	#y = f("auto");
	get contentZIndex() {
		return h(this.#y);
	}
	set contentZIndex(e) {
		s(this.#y, e, !0);
	}
	#b = d(() => er[this.placedSide]);
	get arrowBaseSide() {
		return h(this.#b);
	}
	set arrowBaseSide(e) {
		s(this.#b, e);
	}
	#x = d(() => ({
		id: this.opts.wrapperId.current,
		"data-bits-floating-content-wrapper": "",
		style: {
			...this.floating.floatingStyles,
			transform: this.floating.isPositioned ? this.floating.floatingStyles.transform : "translate(0, -200%)",
			minWidth: "max-content",
			zIndex: this.contentZIndex,
			"--bits-floating-transform-origin": `${this.floating.middlewareData.transformOrigin?.x} ${this.floating.middlewareData.transformOrigin?.y}`,
			"--bits-floating-available-width": `${h(this.#l)}px`,
			"--bits-floating-available-height": `${h(this.#u)}px`,
			"--bits-floating-anchor-width": `${h(this.#d)}px`,
			"--bits-floating-anchor-height": `${h(this.#f)}px`,
			...(this.floating.middlewareData.hide?.referenceHidden || this.floating.middlewareData.hideClipping?.referenceHidden) && {
				visibility: "hidden",
				"pointer-events": "none"
			},
			...h(this.#e)
		},
		dir: this.opts.dir.current,
		...this.wrapperAttachment
	}));
	get wrapperProps() {
		return h(this.#x);
	}
	set wrapperProps(e) {
		s(this.#x, e);
	}
	#S = d(() => ({
		"data-side": this.placedSide,
		"data-align": this.placedAlign,
		style: Ae({ ...h(this.#e) }),
		...this.contentAttachment
	}));
	get props() {
		return h(this.#S);
	}
	set props(e) {
		s(this.#S, e);
	}
	#C = d(() => ({
		position: "absolute",
		left: this.arrowX ? `${this.arrowX}px` : void 0,
		top: this.arrowY ? `${this.arrowY}px` : void 0,
		[this.arrowBaseSide]: 0,
		"transform-origin": {
			top: "",
			right: "0 0",
			bottom: "center 0",
			left: "100% 0"
		}[this.placedSide],
		transform: {
			top: "translateY(100%)",
			right: "translateY(50%) rotate(90deg) translateX(-50%)",
			bottom: "rotate(180deg)",
			left: "translateY(50%) rotate(-90deg) translateX(50%)"
		}[this.placedSide],
		visibility: this.cannotCenterArrow ? "hidden" : void 0
	}));
	get arrowStyle() {
		return h(this.#C);
	}
	set arrowStyle(e) {
		s(this.#C, e);
	}
	constructor(t, n) {
		this.opts = t, this.root = n, this.#t = t.updatePositionStrategy, t.customAnchor && (this.root.customAnchorNode.current = t.customAnchor.current), G(() => t.customAnchor.current, (e) => {
			this.root.customAnchorNode.current = e;
		}), this.floating = Qn({
			strategy: () => this.opts.strategy.current,
			placement: () => h(this.#a),
			middleware: () => this.middleware,
			reference: this.root.anchorNode,
			whileElementsMounted: (...e) => Un(...e, { animationFrame: this.#t?.current === "always" }),
			open: () => this.opts.enabled.current,
			sideOffset: () => this.opts.sideOffset.current,
			alignOffset: () => this.opts.alignOffset.current
		}), e(() => {
			this.floating.isPositioned && this.opts.onPlaced?.current();
		}), G([() => this.contentRef.current, () => this.opts.enabled.current], ([e, t]) => {
			if (!e || !t) return;
			let n = ke(e), r = n.requestAnimationFrame(() => {
				if (this.contentRef.current !== e || !this.opts.enabled.current) return;
				let t = n.getComputedStyle(e).zIndex;
				t !== this.contentZIndex && (this.contentZIndex = t);
			});
			return () => {
				n.cancelAnimationFrame(r);
			};
		}), e(() => {
			this.floating.floating.current = this.wrapperRef.current;
		});
	}
};
function rr(e) {
	return {
		name: "transformOrigin",
		options: e,
		fn(t) {
			let { placement: n, rects: r, middlewareData: i } = t, a = i.arrow?.centerOffset !== 0, o = a ? 0 : e.arrowWidth, s = a ? 0 : e.arrowHeight, [c, l] = ir(n), u = {
				start: "0%",
				center: "50%",
				end: "100%"
			}[l], d = (i.arrow?.x ?? 0) + o / 2, f = (i.arrow?.y ?? 0) + s / 2, p = "", m = "";
			return c === "bottom" ? (p = a ? u : `${d}px`, m = `${-s}px`) : c === "top" ? (p = a ? u : `${d}px`, m = `${r.floating.height + s}px`) : c === "right" ? (p = `${-s}px`, m = a ? u : `${f}px`) : c === "left" && (p = `${r.floating.width + s}px`, m = a ? u : `${f}px`), { data: {
				x: p,
				y: m
			} };
		}
	};
}
function ir(e) {
	let [t, n = "center"] = e.split("-");
	return [t, n];
}
function ar(e) {
	return ir(e)[0];
}
function or(e) {
	return ir(e)[1];
}
// node_modules/bits-ui/dist/bits/utilities/floating-layer/components/floating-layer-content.svelte
function sr(e, n) {
	l(n, !0);
	let r = z(n, "side", 3, "bottom"), i = z(n, "sideOffset", 3, 0), a = z(n, "align", 3, "center"), o = z(n, "alignOffset", 3, 0), s = z(n, "arrowPadding", 3, 0), u = z(n, "avoidCollisions", 3, !0), f = z(n, "collisionBoundary", 19, () => []), p = z(n, "collisionPadding", 3, 0), m = z(n, "hideWhenDetached", 3, !1), _ = z(n, "onPlaced", 3, () => {}), y = z(n, "sticky", 3, "partial"), b = z(n, "updatePositionStrategy", 3, "optimized"), x = z(n, "strategy", 3, "fixed"), S = z(n, "dir", 3, "ltr"), C = z(n, "style", 19, () => ({})), w = z(n, "wrapperId", 19, Xe), E = z(n, "customAnchor", 3, null), D = z(n, "tooltip", 3, !1), O = nr.create({
		side: H(() => r()),
		sideOffset: H(() => i()),
		align: H(() => a()),
		alignOffset: H(() => o()),
		id: H(() => n.id),
		arrowPadding: H(() => s()),
		avoidCollisions: H(() => u()),
		collisionBoundary: H(() => f()),
		collisionPadding: H(() => p()),
		hideWhenDetached: H(() => m()),
		onPlaced: H(() => _()),
		sticky: H(() => y()),
		updatePositionStrategy: H(() => b()),
		strategy: H(() => x()),
		dir: H(() => S()),
		style: H(() => C()),
		enabled: H(() => n.enabled),
		wrapperId: H(() => w()),
		customAnchor: H(() => E())
	}, g(() => D())), A = d(() => U(O.wrapperProps, { style: { pointerEvents: "auto" } }));
	var j = T(), M = c(j);
	k(M, () => n.content ?? t, () => ({
		props: O.props,
		wrapperProps: h(A)
	})), N(e, j), v();
}
// node_modules/bits-ui/dist/bits/utilities/floating-layer/components/floating-layer-content-static.svelte
function cr(e, n) {
	l(n, !0), re(() => {
		n.onPlaced?.();
	});
	var r = T(), i = c(r);
	k(i, () => n.content ?? t, () => ({
		props: {},
		wrapperProps: {}
	})), N(e, r), v();
}
// node_modules/bits-ui/dist/bits/utilities/popper-layer/popper-content.svelte
var lr = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"content",
	"isStatic",
	"onPlaced"
]);
function ur(e, t) {
	let n = z(t, "isStatic", 3, !1), r = F(t, lr);
	var i = T(), a = c(i), o = (e) => {
		cr(e, {
			get content() {
				return t.content;
			},
			get onPlaced() {
				return t.onPlaced;
			}
		});
	}, s = (e) => {
		sr(e, I({
			get content() {
				return t.content;
			},
			get onPlaced() {
				return t.onPlaced;
			}
		}, () => r));
	};
	D(a, (e) => {
		n() ? e(o) : e(s, -1);
	}), N(e, i);
}
// node_modules/bits-ui/dist/bits/utilities/popper-layer/popper-layer-inner.svelte
var dr = /* @__PURE__ */ new Set(/* @__PURE__ */ "$$slots.$$events.$$legacy.popper.onEscapeKeydown.escapeKeydownBehavior.preventOverflowTextSelection.id.onPointerDown.onPointerUp.side.sideOffset.align.alignOffset.arrowPadding.avoidCollisions.collisionBoundary.collisionPadding.sticky.hideWhenDetached.updatePositionStrategy.strategy.dir.preventScroll.wrapperId.style.onPlaced.onInteractOutside.onCloseAutoFocus.onOpenAutoFocus.onFocusOutside.interactOutsideBehavior.loop.trapFocus.isValidEvent.customAnchor.isStatic.enabled.forceMount.ref.tooltip.contentPointerEvents".split(".")), fr = M("<!> <!>", 1);
function pr(e, n) {
	l(n, !0);
	let r = z(n, "interactOutsideBehavior", 3, "close"), a = z(n, "trapFocus", 3, !0), o = z(n, "isValidEvent", 3, () => !1), s = z(n, "customAnchor", 3, null), u = z(n, "isStatic", 3, !1), f = z(n, "tooltip", 3, !1), p = z(n, "contentPointerEvents", 3, "auto"), m = F(n, dr), g = d(() => n.preventScroll ?? !0), _ = d(() => n.strategy ?? (h(g) ? "fixed" : "absolute"));
	ur(e, {
		get isStatic() {
			return u();
		},
		get id() {
			return n.id;
		},
		get side() {
			return n.side;
		},
		get sideOffset() {
			return n.sideOffset;
		},
		get align() {
			return n.align;
		},
		get alignOffset() {
			return n.alignOffset;
		},
		get arrowPadding() {
			return n.arrowPadding;
		},
		get avoidCollisions() {
			return n.avoidCollisions;
		},
		get collisionBoundary() {
			return n.collisionBoundary;
		},
		get collisionPadding() {
			return n.collisionPadding;
		},
		get sticky() {
			return n.sticky;
		},
		get hideWhenDetached() {
			return n.hideWhenDetached;
		},
		get updatePositionStrategy() {
			return n.updatePositionStrategy;
		},
		get strategy() {
			return h(_);
		},
		get dir() {
			return n.dir;
		},
		get wrapperId() {
			return n.wrapperId;
		},
		get style() {
			return n.style;
		},
		get onPlaced() {
			return n.onPlaced;
		},
		get customAnchor() {
			return s();
		},
		get enabled() {
			return n.enabled;
		},
		get tooltip() {
			return f();
		},
		content: (e, s) => {
			let l = () => (s?.()).props, u = () => (s?.()).wrapperProps;
			var f = fr(), _ = c(f), v = (e) => {
				ue(e, { get preventScroll() {
					return h(g);
				} });
			}, y = (e) => {
				ue(e, { get preventScroll() {
					return h(g);
				} });
			};
			D(_, (e) => {
				n.forceMount && n.enabled ? e(v) : n.forceMount || e(y, 1);
			});
			var b = i(_, 2);
			fe(b, {
				get onOpenAutoFocus() {
					return n.onOpenAutoFocus;
				},
				get onCloseAutoFocus() {
					return n.onCloseAutoFocus;
				},
				get loop() {
					return n.loop;
				},
				get enabled() {
					return n.enabled;
				},
				get trapFocus() {
					return a();
				},
				get forceMount() {
					return n.forceMount;
				},
				get ref() {
					return n.ref;
				},
				focusScope: (e, i) => {
					let a = () => (i?.()).props;
					de(e, {
						get onEscapeKeydown() {
							return n.onEscapeKeydown;
						},
						get escapeKeydownBehavior() {
							return n.escapeKeydownBehavior;
						},
						get enabled() {
							return n.enabled;
						},
						get ref() {
							return n.ref;
						},
						children: (e, i) => {
							Se(e, {
								get id() {
									return n.id;
								},
								get onInteractOutside() {
									return n.onInteractOutside;
								},
								get onFocusOutside() {
									return n.onFocusOutside;
								},
								get interactOutsideBehavior() {
									return r();
								},
								get isValidEvent() {
									return o();
								},
								get enabled() {
									return n.enabled;
								},
								get ref() {
									return n.ref;
								},
								children: (e, r) => {
									let i = () => (r?.()).props;
									Ee(e, {
										get id() {
											return n.id;
										},
										get preventOverflowTextSelection() {
											return n.preventOverflowTextSelection;
										},
										get onPointerDown() {
											return n.onPointerDown;
										},
										get onPointerUp() {
											return n.onPointerUp;
										},
										get enabled() {
											return n.enabled;
										},
										get ref() {
											return n.ref;
										},
										children: (e, r) => {
											var o = T(), s = c(o);
											{
												let e = d(() => ({
													props: U(m, l(), i(), a(), {
														id: n.id,
														style: { pointerEvents: p() }
													}),
													wrapperProps: u()
												}));
												k(s, () => n.popper ?? t, () => h(e));
											}
											N(e, o);
										},
										$$slots: { default: !0 }
									});
								},
								$$slots: { default: !0 }
							});
						},
						$$slots: { default: !0 }
					});
				},
				$$slots: { focusScope: !0 }
			}), N(e, f);
		},
		$$slots: { content: !0 }
	}), v();
}
// node_modules/bits-ui/dist/bits/utilities/popper-layer/popper-layer.svelte
var mr = /* @__PURE__ */ new Set(/* @__PURE__ */ "$$slots.$$events.$$legacy.popper.open.onEscapeKeydown.escapeKeydownBehavior.preventOverflowTextSelection.id.onPointerDown.onPointerUp.side.sideOffset.align.alignOffset.arrowPadding.avoidCollisions.collisionBoundary.collisionPadding.sticky.hideWhenDetached.updatePositionStrategy.strategy.dir.preventScroll.wrapperId.style.onPlaced.onInteractOutside.onCloseAutoFocus.onOpenAutoFocus.onFocusOutside.interactOutsideBehavior.loop.trapFocus.isValidEvent.customAnchor.isStatic.ref.shouldRender".split("."));
function hr(e, t) {
	let n = z(t, "interactOutsideBehavior", 3, "close"), r = z(t, "trapFocus", 3, !0), i = z(t, "isValidEvent", 3, () => !1), a = z(t, "customAnchor", 3, null), o = z(t, "isStatic", 3, !1), s = F(t, mr);
	var l = T(), u = c(l), d = (e) => {
		pr(e, I({
			get popper() {
				return t.popper;
			},
			get onEscapeKeydown() {
				return t.onEscapeKeydown;
			},
			get escapeKeydownBehavior() {
				return t.escapeKeydownBehavior;
			},
			get preventOverflowTextSelection() {
				return t.preventOverflowTextSelection;
			},
			get id() {
				return t.id;
			},
			get onPointerDown() {
				return t.onPointerDown;
			},
			get onPointerUp() {
				return t.onPointerUp;
			},
			get side() {
				return t.side;
			},
			get sideOffset() {
				return t.sideOffset;
			},
			get align() {
				return t.align;
			},
			get alignOffset() {
				return t.alignOffset;
			},
			get arrowPadding() {
				return t.arrowPadding;
			},
			get avoidCollisions() {
				return t.avoidCollisions;
			},
			get collisionBoundary() {
				return t.collisionBoundary;
			},
			get collisionPadding() {
				return t.collisionPadding;
			},
			get sticky() {
				return t.sticky;
			},
			get hideWhenDetached() {
				return t.hideWhenDetached;
			},
			get updatePositionStrategy() {
				return t.updatePositionStrategy;
			},
			get strategy() {
				return t.strategy;
			},
			get dir() {
				return t.dir;
			},
			get preventScroll() {
				return t.preventScroll;
			},
			get wrapperId() {
				return t.wrapperId;
			},
			get style() {
				return t.style;
			},
			get onPlaced() {
				return t.onPlaced;
			},
			get customAnchor() {
				return a();
			},
			get isStatic() {
				return o();
			},
			get enabled() {
				return t.open;
			},
			get onInteractOutside() {
				return t.onInteractOutside;
			},
			get onCloseAutoFocus() {
				return t.onCloseAutoFocus;
			},
			get onOpenAutoFocus() {
				return t.onOpenAutoFocus;
			},
			get interactOutsideBehavior() {
				return n();
			},
			get loop() {
				return t.loop;
			},
			get trapFocus() {
				return r();
			},
			get isValidEvent() {
				return i();
			},
			get onFocusOutside() {
				return t.onFocusOutside;
			},
			forceMount: !1,
			get ref() {
				return t.ref;
			}
		}, () => s));
	};
	D(u, (e) => {
		t.shouldRender && e(d);
	}), N(e, l);
}
// node_modules/bits-ui/dist/bits/utilities/popper-layer/popper-layer-force-mount.svelte
var gr = /* @__PURE__ */ new Set(/* @__PURE__ */ "$$slots.$$events.$$legacy.popper.onEscapeKeydown.escapeKeydownBehavior.preventOverflowTextSelection.id.onPointerDown.onPointerUp.side.sideOffset.align.alignOffset.arrowPadding.avoidCollisions.collisionBoundary.collisionPadding.sticky.hideWhenDetached.updatePositionStrategy.strategy.dir.preventScroll.wrapperId.style.onPlaced.onInteractOutside.onCloseAutoFocus.onOpenAutoFocus.onFocusOutside.interactOutsideBehavior.loop.trapFocus.isValidEvent.customAnchor.isStatic.enabled".split("."));
function _r(e, t) {
	let n = z(t, "interactOutsideBehavior", 3, "close"), r = z(t, "trapFocus", 3, !0), i = z(t, "isValidEvent", 3, () => !1), a = z(t, "customAnchor", 3, null), o = z(t, "isStatic", 3, !1), s = F(t, gr);
	pr(e, I({
		get popper() {
			return t.popper;
		},
		get onEscapeKeydown() {
			return t.onEscapeKeydown;
		},
		get escapeKeydownBehavior() {
			return t.escapeKeydownBehavior;
		},
		get preventOverflowTextSelection() {
			return t.preventOverflowTextSelection;
		},
		get id() {
			return t.id;
		},
		get onPointerDown() {
			return t.onPointerDown;
		},
		get onPointerUp() {
			return t.onPointerUp;
		},
		get side() {
			return t.side;
		},
		get sideOffset() {
			return t.sideOffset;
		},
		get align() {
			return t.align;
		},
		get alignOffset() {
			return t.alignOffset;
		},
		get arrowPadding() {
			return t.arrowPadding;
		},
		get avoidCollisions() {
			return t.avoidCollisions;
		},
		get collisionBoundary() {
			return t.collisionBoundary;
		},
		get collisionPadding() {
			return t.collisionPadding;
		},
		get sticky() {
			return t.sticky;
		},
		get hideWhenDetached() {
			return t.hideWhenDetached;
		},
		get updatePositionStrategy() {
			return t.updatePositionStrategy;
		},
		get strategy() {
			return t.strategy;
		},
		get dir() {
			return t.dir;
		},
		get preventScroll() {
			return t.preventScroll;
		},
		get wrapperId() {
			return t.wrapperId;
		},
		get style() {
			return t.style;
		},
		get onPlaced() {
			return t.onPlaced;
		},
		get customAnchor() {
			return a();
		},
		get isStatic() {
			return o();
		},
		get enabled() {
			return t.enabled;
		},
		get onInteractOutside() {
			return t.onInteractOutside;
		},
		get onCloseAutoFocus() {
			return t.onCloseAutoFocus;
		},
		get onOpenAutoFocus() {
			return t.onOpenAutoFocus;
		},
		get interactOutsideBehavior() {
			return n();
		},
		get loop() {
			return t.loop;
		},
		get trapFocus() {
			return r();
		},
		get isValidEvent() {
			return i();
		},
		get onFocusOutside() {
			return t.onFocusOutside;
		}
	}, () => s, { forceMount: !0 }));
}
// node_modules/bits-ui/dist/internal/safe-polygon.svelte.js
function vr(e, t) {
	let [n, r] = e, i = !1, a = t.length;
	for (let e = 0, o = a - 1; e < a; o = e++) {
		let [a, s] = t[e] ?? [0, 0], [c, l] = t[o] ?? [0, 0];
		s >= r != l >= r && n <= (c - a) * (r - s) / (l - s) + a && (i = !i);
	}
	return i;
}
function yr(e, t) {
	return e[0] >= t.left && e[0] <= t.right && e[1] >= t.top && e[1] <= t.bottom;
}
function br(e, t) {
	let n = e.left + e.width / 2, r = e.top + e.height / 2, i = t.left + t.width / 2, a = t.top + t.height / 2, o = i - n, s = a - r;
	return Math.abs(o) > Math.abs(s) ? o > 0 ? "right" : "left" : s > 0 ? "bottom" : "top";
}
var xr = class {
	#e;
	#t;
	#n;
	#r = null;
	#i = null;
	#a = [];
	#o = null;
	#s = null;
	#c = null;
	#l() {
		this.#s !== null && (cancelAnimationFrame(this.#s), this.#s = null);
	}
	#u() {
		this.#l(), this.#s = requestAnimationFrame(() => {
			this.#s = null, this.#r && this.#i && (this.#m(), this.#e.onPointerExit());
		});
	}
	#d() {
		this.#c !== null && (clearTimeout(this.#c), this.#c = null);
	}
	#f() {
		this.#n !== null && (this.#d(), this.#c = window.setTimeout(() => {
			this.#c = null, this.#r && this.#i && (this.#m(), this.#e.onPointerExit());
		}, this.#n));
	}
	constructor(e) {
		this.#e = e, this.#t = e.buffer ?? 1;
		let t = e.transitIntentTimeout;
		this.#n = typeof t == "number" && t > 0 ? t : null, G([
			e.triggerNode,
			e.contentNode,
			e.enabled
		], ([e, t, n]) => {
			if (!e || !t || !n) {
				this.#o = null, this.#m();
				return;
			}
			this.#o && this.#o !== e && this.#m(), this.#o = e;
			let r = De(e);
			return [
				P(r, "pointermove", (n) => {
					this.#p([n.clientX, n.clientY], e, t);
				}),
				P(e, "pointerleave", (e) => {
					let n = e.relatedTarget;
					if (pe(n) && t.contains(n)) return;
					let r = this.#e.ignoredTargets?.() ?? [];
					pe(n) && r.some((e) => e === n || e.contains(n)) || (this.#a = pe(n) && r.length > 0 ? r.filter((e) => n.contains(e)) : [], this.#r = [e.clientX, e.clientY], this.#i = "content", this.#u());
				}),
				P(e, "pointerenter", () => {
					this.#m();
				}),
				P(t, "pointerenter", () => {
					this.#m();
				}),
				P(t, "pointerleave", (t) => {
					let n = t.relatedTarget;
					pe(n) && e.contains(n) || (this.#r = [t.clientX, t.clientY], this.#i = "trigger", this.#u());
				})
			].reduce((e, t) => () => {
				e(), t();
			}, () => {});
		});
	}
	#p(e, t, n) {
		if (!this.#r || !this.#i) return;
		this.#l(), this.#f();
		let r = t.getBoundingClientRect(), i = n.getBoundingClientRect();
		if (this.#i === "content" && yr(e, i) || this.#i === "trigger" && yr(e, r)) {
			this.#m();
			return;
		}
		if (this.#i === "content" && this.#a.length > 0) for (let t of this.#a) {
			let n = t.getBoundingClientRect();
			if (yr(e, n)) return;
			let i = br(r, n), a = this.#h(r, n, i);
			if (a && vr(e, a)) return;
		}
		let a = br(r, i), o = this.#h(r, i, a);
		if (o && vr(e, o)) return;
		let s = this.#i === "content" ? i : r;
		vr(e, this.#g(this.#r, s, a, this.#i)) || (this.#m(), this.#e.onPointerExit());
	}
	#m() {
		this.#r = null, this.#i = null, this.#a = [], this.#l(), this.#d();
	}
	#h(e, t, n) {
		let r = this.#t;
		switch (n) {
			case "top": return [
				[Math.min(e.left, t.left) - r, e.top],
				[Math.min(e.left, t.left) - r, t.bottom],
				[Math.max(e.right, t.right) + r, t.bottom],
				[Math.max(e.right, t.right) + r, e.top]
			];
			case "bottom": return [
				[Math.min(e.left, t.left) - r, e.bottom],
				[Math.min(e.left, t.left) - r, t.top],
				[Math.max(e.right, t.right) + r, t.top],
				[Math.max(e.right, t.right) + r, e.bottom]
			];
			case "left": return [
				[e.left, Math.min(e.top, t.top) - r],
				[t.right, Math.min(e.top, t.top) - r],
				[t.right, Math.max(e.bottom, t.bottom) + r],
				[e.left, Math.max(e.bottom, t.bottom) + r]
			];
			case "right": return [
				[e.right, Math.min(e.top, t.top) - r],
				[t.left, Math.min(e.top, t.top) - r],
				[t.left, Math.max(e.bottom, t.bottom) + r],
				[e.right, Math.max(e.bottom, t.bottom) + r]
			];
		}
	}
	#g(e, t, n, r) {
		let i = this.#t * 4, [a, o] = e;
		switch (r === "trigger" ? this.#_(n) : n) {
			case "top": return [
				[a - i, o + i],
				[a + i, o + i],
				[t.right + i, t.bottom],
				[t.right + i, t.top],
				[t.left - i, t.top],
				[t.left - i, t.bottom]
			];
			case "bottom": return [
				[a - i, o - i],
				[a + i, o - i],
				[t.right + i, t.top],
				[t.right + i, t.bottom],
				[t.left - i, t.bottom],
				[t.left - i, t.top]
			];
			case "left": return [
				[a + i, o - i],
				[a + i, o + i],
				[t.right, t.bottom + i],
				[t.left, t.bottom + i],
				[t.left, t.top - i],
				[t.right, t.top - i]
			];
			case "right": return [
				[a - i, o - i],
				[a - i, o + i],
				[t.left, t.bottom + i],
				[t.right, t.bottom + i],
				[t.right, t.top - i],
				[t.left, t.top - i]
			];
		}
	}
	#_(e) {
		switch (e) {
			case "top": return "bottom";
			case "bottom": return "top";
			case "left": return "right";
			case "right": return "left";
		}
	}
}, Sr = class {
	#e;
	#t;
	#n = null;
	constructor(e, t) {
		this.#t = e, this.#e = t, this.stop = this.stop.bind(this), this.start = this.start.bind(this), me(this.stop);
	}
	#r() {
		this.#n !== null && (window.clearTimeout(this.#n), this.#n = null);
	}
	stop() {
		this.#r();
	}
	start(...e) {
		this.#r(), this.#n = window.setTimeout(() => {
			this.#n = null, this.#t(...e);
		}, this.#e);
	}
}, Cr = Qe({
	component: "tooltip",
	parts: ["content", "trigger"]
}), wr = new _e("Tooltip.Provider"), Tr = new _e("Tooltip.Root"), Er = class {
	triggers = /* @__PURE__ */ new Map();
	#e = f(0);
	#t = f(null);
	get activeTriggerId() {
		return h(this.#t);
	}
	set activeTriggerId(e) {
		s(this.#t, e, !0);
	}
	#n = d(() => {
		h(this.#e);
		let e = this.activeTriggerId;
		return e === null ? null : this.triggers.get(e)?.node ?? null;
	});
	get activeTriggerNode() {
		return h(this.#n);
	}
	set activeTriggerNode(e) {
		s(this.#n, e);
	}
	#r = d(() => {
		h(this.#e);
		let e = this.activeTriggerId;
		return e === null ? null : this.triggers.get(e)?.payload ?? null;
	});
	get activePayload() {
		return h(this.#r);
	}
	set activePayload(e) {
		s(this.#r, e);
	}
	register = (e) => {
		this.triggers.set(e.id, e), e.id === this.activeTriggerId && _(this.#e);
	};
	update = this.register;
	unregister = (e) => {
		this.triggers.delete(e) && this.activeTriggerId === e && (this.activeTriggerId = null);
	};
	setActiveTrigger = (e) => {
		this.activeTriggerId = e === null ? null : this.triggers.has(e) ? e : null;
	};
	get = (e) => this.triggers.get(e);
	has = (e) => this.triggers.has(e);
	getFirstTriggerId = () => {
		let e = this.triggers.entries().next();
		return e.done ? null : e.value[0];
	};
}, Dr = class e {
	static create(t) {
		return wr.set(new e(t));
	}
	opts;
	#e = f(!0);
	get isOpenDelayed() {
		return h(this.#e);
	}
	set isOpenDelayed(e) {
		s(this.#e, e, !0);
	}
	isPointerInTransit = W(!1);
	#t;
	#n = f(null);
	#r = !1;
	constructor(e) {
		this.opts = e, this.#t = new Sr(() => {
			this.isOpenDelayed = !0;
		}, this.opts.skipDelayDuration.current), $e(() => P(window, "scroll", (e) => {
			let t = h(this.#n);
			if (!t || this.#r) return;
			let n = t.triggerNode;
			if (!n) return;
			let r = e.target;
			(r instanceof Element || r instanceof Document) && r.contains(n) && t.handleClose();
		}, {
			capture: !0,
			passive: !0
		}));
	}
	ignoreFocusScroll = () => {
		this.#r = !0, requestAnimationFrame(() => {
			this.#r = !1;
		});
	};
	#i = () => {
		this.opts.skipDelayDuration.current === 0 ? this.isOpenDelayed = !0 : this.#t.start();
	};
	#a = () => {
		this.#t.stop();
	};
	onOpen = (e) => {
		h(this.#n) && h(this.#n) !== e && h(this.#n).handleClose(), this.#a(), this.isOpenDelayed = !1, s(this.#n, e, !0);
	};
	onClose = (e) => {
		h(this.#n) === e && (s(this.#n, null), this.#i());
	};
	isTooltipOpen = (e) => h(this.#n) === e;
}, Or = class e {
	static create(t) {
		return Tr.set(new e(t, wr.get()));
	}
	opts;
	provider;
	#e = d(() => this.opts.delayDuration.current ?? this.provider.opts.delayDuration.current);
	get delayDuration() {
		return h(this.#e);
	}
	set delayDuration(e) {
		s(this.#e, e);
	}
	#t = d(() => this.opts.disableHoverableContent.current ?? this.provider.opts.disableHoverableContent.current);
	get disableHoverableContent() {
		return h(this.#t);
	}
	set disableHoverableContent(e) {
		s(this.#t, e);
	}
	#n = d(() => this.opts.disableCloseOnTriggerClick.current ?? this.provider.opts.disableCloseOnTriggerClick.current);
	get disableCloseOnTriggerClick() {
		return h(this.#n);
	}
	set disableCloseOnTriggerClick(e) {
		s(this.#n, e);
	}
	#r = d(() => this.opts.disabled.current ?? this.provider.opts.disabled.current);
	get disabled() {
		return h(this.#r);
	}
	set disabled(e) {
		s(this.#r, e);
	}
	#i = d(() => this.opts.ignoreNonKeyboardFocus.current ?? this.provider.opts.ignoreNonKeyboardFocus.current);
	get ignoreNonKeyboardFocus() {
		return h(this.#i);
	}
	set ignoreNonKeyboardFocus(e) {
		s(this.#i, e);
	}
	registry;
	tether;
	#a = f(null);
	get contentNode() {
		return h(this.#a);
	}
	set contentNode(e) {
		s(this.#a, e, !0);
	}
	contentPresence;
	#o = f(!1);
	#s = f(!1);
	get openedViaFocus() {
		return h(this.#s);
	}
	set openedViaFocus(e) {
		s(this.#s, e, !0);
	}
	#c;
	#l = d(() => this.opts.open.current ? h(this.#o) ? "delayed-open" : "instant-open" : "closed");
	get stateAttr() {
		return h(this.#l);
	}
	set stateAttr(e) {
		s(this.#l, e);
	}
	constructor(e, t) {
		this.opts = e, this.provider = t, this.tether = e.tether.current?.state ?? null, this.registry = this.tether?.registry ?? new Er(), this.#c = new Sr(() => {
			s(this.#o, !0), this.opts.open.current = !0;
		}, this.delayDuration ?? 0), this.tether && (this.tether.root = this, $e(() => () => {
			this.tether?.root === this && (this.tether.root = null);
		})), this.contentPresence = new Ce({
			open: this.opts.open,
			ref: H(() => this.contentNode),
			onComplete: () => {
				this.opts.onOpenChangeComplete.current(this.opts.open.current);
			}
		}), G(() => this.delayDuration, () => {
			this.delayDuration !== void 0 && (this.#c = new Sr(() => {
				s(this.#o, !0), this.opts.open.current = !0;
			}, this.delayDuration));
		}), G(() => this.opts.open.current, (e) => {
			e ? (this.ensureActiveTrigger(), this.provider.onOpen(this)) : (this.openedViaFocus = !1, this.provider.onClose(this));
		}, { lazy: !0 }), G(() => this.opts.triggerId.current, (e) => {
			e !== this.registry.activeTriggerId && this.registry.setActiveTrigger(e);
		}), G(() => this.registry.activeTriggerId, (e) => {
			this.opts.triggerId.current !== e && (this.opts.triggerId.current = e);
		});
	}
	handleOpen = () => {
		this.#c.stop(), s(this.#o, !1), this.ensureActiveTrigger(), this.opts.open.current = !0;
	};
	handleClose = () => {
		this.#c.stop(), this.opts.open.current = !1;
	};
	cancelPendingOpen = () => {
		this.#c.stop();
	};
	#u = () => {
		this.#c.stop();
		let e = !this.provider.isOpenDelayed, t = this.delayDuration ?? 0;
		e || t === 0 ? (s(this.#o, !1), this.opts.open.current = !0) : this.#c.start();
	};
	onTriggerEnter = (e) => {
		this.isActiveTrigger(e) || (this.openedViaFocus = !1), this.setActiveTrigger(e), this.#u();
	};
	onTriggerLeave = () => {
		this.disableHoverableContent && !this.openedViaFocus ? this.handleClose() : this.#c.stop();
	};
	ensureActiveTrigger = () => {
		if (this.registry.activeTriggerId !== null && this.registry.has(this.registry.activeTriggerId)) return;
		if (this.opts.triggerId.current !== null && this.registry.has(this.opts.triggerId.current)) {
			this.registry.setActiveTrigger(this.opts.triggerId.current);
			return;
		}
		let e = this.registry.getFirstTriggerId();
		this.registry.setActiveTrigger(e);
	};
	setActiveTrigger = (e) => {
		this.registry.setActiveTrigger(e);
	};
	registerTrigger = (e) => {
		this.registry.register(e), e.disabled && this.registry.activeTriggerId === e.id && this.opts.open.current && this.handleClose();
	};
	updateTrigger = (e) => {
		this.registry.update(e), e.disabled && this.registry.activeTriggerId === e.id && this.opts.open.current && this.handleClose();
	};
	unregisterTrigger = (e) => {
		let t = this.registry.activeTriggerId === e;
		this.registry.unregister(e), t && this.opts.open.current && this.handleClose();
	};
	isActiveTrigger = (e) => this.registry.activeTriggerId === e;
	get triggerNode() {
		return this.registry.activeTriggerNode;
	}
	get activePayload() {
		return this.registry.activePayload;
	}
	get activeTriggerId() {
		return this.registry.activeTriggerId;
	}
}, kr = class e {
	static create(t) {
		return t.tether.current ? new e(t, null, t.tether.current.state) : new e(t, Tr.get(), null);
	}
	opts;
	root;
	tether;
	attachment;
	#e = W(!1);
	#t = null;
	#n = f(!1);
	domContext;
	#r = null;
	#i = !1;
	#a = null;
	constructor(e, t, n) {
		this.opts = e, this.root = t, this.tether = n, this.domContext = new he(e.ref), this.attachment = Oe(this.opts.ref, (e) => e ? this.#c(e) : this.#l()), G(() => this.opts.id.current, () => {
			this.#c(this.opts.ref.current);
		}), G(() => this.opts.payload.current, () => {
			this.#c(this.opts.ref.current);
		}), G(() => this.opts.disabled.current, () => {
			this.#c(this.opts.ref.current);
		}), $e(() => (this.#i = !0, this.#c(this.opts.ref.current), () => {
			let e = this.#o(), t = this.#a?.id;
			t && (this.tether ? this.tether.registry.unregister(t) : e?.unregisterTrigger(t)), this.#a = null, this.#i = !1;
		}));
	}
	#o = () => this.tether?.root ?? this.root;
	#s = () => {
		let e = this.#o();
		return this.opts.disabled.current || !!e?.disabled;
	};
	#c = (e) => {
		this.#i && this.#u({
			id: this.opts.id.current,
			node: e,
			payload: this.opts.payload.current,
			disabled: this.opts.disabled.current
		});
	};
	#l = () => {
		this.#i && this.#a && this.#u({
			...this.#a,
			node: null
		});
	};
	#u = (e) => {
		let { id: t, disabled: n } = e, r = this.#a?.id;
		if (r && r !== t) {
			let e = this.#o();
			this.tether ? this.tether.registry.unregister(r) : e?.unregisterTrigger(r);
		}
		let i = this.#o();
		this.tether ? (this.tether.registry.has(t) ? this.tether.registry.update(e) : this.tether.registry.register(e), n && this.tether.registry.activeTriggerId === t && i?.opts.open.current && i.handleClose()) : i?.registry.has(t) ? i.updateTrigger(e) : i?.registerTrigger(e), this.#a = e;
	};
	#d = () => {
		this.#r !== null && (clearTimeout(this.#r), this.#r = null);
	};
	handlePointerUp = () => {
		this.#e.current = !1;
	};
	#f = () => {
		this.#s() || (this.#e.current = !1);
	};
	#p = (e) => {
		if (this.#s()) return;
		this.#t = e.pointerType;
		let t = this.#o();
		t && !t.disableCloseOnTriggerClick && (t.opts.open.current ? t.handleClose() : t.cancelPendingOpen()), this.#e.current = !0, this.domContext.getDocument().addEventListener("pointerup", () => {
			this.handlePointerUp();
		}, { once: !0 });
	};
	#m = (e) => {
		let t = this.#o();
		t && (this.#s() ? t.opts.open.current && t.handleClose() : e.pointerType !== "touch" && (t.provider.isPointerInTransit.current ? (this.#d(), this.#r = window.setTimeout(() => {
			t.provider.isPointerInTransit.current && (t.provider.isPointerInTransit.current = !1, t.onTriggerEnter(this.opts.id.current), s(this.#n, !0));
		}, 250)) : (t.onTriggerEnter(this.opts.id.current), s(this.#n, !0))));
	};
	#h = (e) => {
		let t = this.#o();
		t && (this.#s() ? t.opts.open.current && t.handleClose() : e.pointerType !== "touch" && (h(this.#n) || (this.#d(), t.provider.isPointerInTransit.current = !1, t.onTriggerEnter(this.opts.id.current), s(this.#n, !0))));
	};
	#g = (e) => {
		let t = this.#o();
		if (!t || this.#s()) return;
		if (this.#d(), !t.isActiveTrigger(this.opts.id.current)) {
			s(this.#n, !1);
			return;
		}
		let n = e.relatedTarget;
		if (pe(n)) {
			for (let e of t.registry.triggers.values()) if (e.node === n) {
				if (t.provider.opts.skipDelayDuration.current > 0) {
					s(this.#n, !1);
					return;
				}
				t.handleClose(), s(this.#n, !1);
				return;
			}
		}
		t.onTriggerLeave(), s(this.#n, !1);
	};
	#_ = (e) => {
		let t = this.#o();
		t && (this.#e.current || this.#t !== "touch" && (this.#s() ? t.opts.open.current && t.handleClose() : (!t.ignoreNonKeyboardFocus || ge(e.currentTarget)) && (t.setActiveTrigger(this.opts.id.current), t.openedViaFocus = !0, t.handleOpen(), t.provider.ignoreFocusScroll())));
	};
	#v = () => {
		this.#t = null;
		let e = this.#o();
		e && !this.#s() && e.handleClose();
	};
	#y = () => {
		let e = this.#o();
		!e || e.disableCloseOnTriggerClick || this.#s() || e.handleClose();
	};
	#b = d(() => {
		let e = this.#o(), t = !!(e?.opts.open.current && e.isActiveTrigger(this.opts.id.current)), n = this.#s();
		return {
			id: this.opts.id.current,
			"aria-describedby": t ? e?.contentNode?.id : void 0,
			"data-state": t ? e?.stateAttr : "closed",
			"data-disabled": Te(n),
			"data-delay-duration": `${e?.delayDuration ?? 0}`,
			[Cr.trigger]: "",
			tabindex: n ? void 0 : this.opts.tabindex.current,
			disabled: this.opts.disabled.current,
			onpointerup: this.#f,
			onpointerdown: this.#p,
			onpointerenter: this.#m,
			onpointermove: this.#h,
			onpointerleave: this.#g,
			onfocus: this.#_,
			onblur: this.#v,
			onclick: this.#y,
			...this.attachment
		};
	});
	get props() {
		return h(this.#b);
	}
	set props(e) {
		s(this.#b, e);
	}
}, Ar = class e {
	static create(t) {
		return new e(t, Tr.get());
	}
	opts;
	root;
	attachment;
	constructor(e, t) {
		this.opts = e, this.root = t, this.attachment = Oe(this.opts.ref, (e) => this.root.contentNode = e), new xr({
			triggerNode: () => this.root.triggerNode,
			contentNode: () => this.root.contentNode,
			enabled: () => this.root.opts.open.current && !this.root.disableHoverableContent && !this.root.openedViaFocus,
			transitIntentTimeout: 180,
			ignoredTargets: () => {
				if (this.root.provider.opts.skipDelayDuration.current === 0) return [];
				let e = [], t = this.root.triggerNode;
				for (let n of this.root.registry.triggers.values()) n.node && n.node !== t && e.push(n.node);
				return e;
			},
			onPointerExit: () => {
				this.root.provider.isTooltipOpen(this.root) && this.root.handleClose();
			}
		});
	}
	onInteractOutside = (e) => {
		ze(e, this.root.triggerNode) && this.root.disableCloseOnTriggerClick ? e.preventDefault() : (this.opts.onInteractOutside.current(e), e.defaultPrevented || this.root.handleClose());
	};
	onEscapeKeydown = (e) => {
		this.opts.onEscapeKeydown.current?.(e), e.defaultPrevented || this.root.handleClose();
	};
	onOpenAutoFocus = (e) => {
		e.preventDefault();
	};
	onCloseAutoFocus = (e) => {
		e.preventDefault();
	};
	get shouldRender() {
		return this.root.contentPresence.shouldRender;
	}
	#e = d(() => ({ open: this.root.opts.open.current }));
	get snippetProps() {
		return h(this.#e);
	}
	set snippetProps(e) {
		s(this.#e, e);
	}
	#t = d(() => ({
		id: this.opts.id.current,
		"data-state": this.root.stateAttr,
		"data-disabled": Te(this.root.disabled),
		...le(this.root.contentPresence.transitionStatus),
		style: { outline: "none" },
		[Cr.content]: "",
		...this.attachment
	}));
	get props() {
		return h(this.#t);
	}
	set props(e) {
		s(this.#t, e);
	}
	popperProps = {
		onInteractOutside: this.onInteractOutside,
		onEscapeKeydown: this.onEscapeKeydown,
		onOpenAutoFocus: this.onOpenAutoFocus,
		onCloseAutoFocus: this.onCloseAutoFocus
	};
};
// node_modules/bits-ui/dist/bits/tooltip/components/tooltip.svelte
function jr(e, n) {
	l(n, !0);
	let r = z(n, "open", 15, !1), i = z(n, "triggerId", 15, null), a = z(n, "onOpenChange", 3, xe), o = z(n, "onOpenChangeComplete", 3, xe), s = Or.create({
		open: H(() => r(), (e) => {
			r(e), a()(e);
		}),
		triggerId: H(() => i(), (e) => {
			i(e);
		}),
		delayDuration: H(() => n.delayDuration),
		disableCloseOnTriggerClick: H(() => n.disableCloseOnTriggerClick),
		disableHoverableContent: H(() => n.disableHoverableContent),
		ignoreNonKeyboardFocus: H(() => n.ignoreNonKeyboardFocus),
		disabled: H(() => n.disabled),
		onOpenChangeComplete: H(() => o()),
		tether: H(() => n.tether)
	});
	rt(e, {
		tooltip: !0,
		children: (e, r) => {
			var i = T(), a = c(i);
			k(a, () => n.children ?? t, () => ({
				open: s.opts.open.current,
				triggerId: s.activeTriggerId,
				payload: s.activePayload
			})), N(e, i);
		},
		$$slots: { default: !0 }
	}), v();
}
// node_modules/bits-ui/dist/bits/tooltip/components/tooltip-content.svelte
var Mr = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"children",
	"child",
	"id",
	"ref",
	"side",
	"sideOffset",
	"align",
	"avoidCollisions",
	"arrowPadding",
	"sticky",
	"strategy",
	"hideWhenDetached",
	"customAnchor",
	"collisionPadding",
	"onInteractOutside",
	"onEscapeKeydown",
	"forceMount",
	"style"
]), Nr = M("<div><div><!></div></div>");
function Pr(e, n) {
	let i = w();
	l(n, !0);
	let a = z(n, "id", 19, () => be(i)), s = z(n, "ref", 15, null), u = z(n, "side", 3, "top"), f = z(n, "sideOffset", 3, 0), p = z(n, "align", 3, "center"), m = z(n, "avoidCollisions", 3, !0), g = z(n, "arrowPadding", 3, 0), _ = z(n, "sticky", 3, "partial"), y = z(n, "hideWhenDetached", 3, !1), b = z(n, "collisionPadding", 3, 0), x = z(n, "onInteractOutside", 3, xe), S = z(n, "onEscapeKeydown", 3, xe), C = z(n, "forceMount", 3, !1), E = F(n, Mr), O = Ar.create({
		id: H(() => a()),
		ref: H(() => s(), (e) => s(e)),
		onInteractOutside: H(() => x()),
		onEscapeKeydown: H(() => S())
	}), A = d(() => ({
		side: u(),
		sideOffset: f(),
		align: p(),
		avoidCollisions: m(),
		arrowPadding: g(),
		sticky: _(),
		hideWhenDetached: y(),
		collisionPadding: b(),
		strategy: n.strategy,
		customAnchor: n.customAnchor ?? O.root.triggerNode
	})), j = d(() => U(E, h(A), O.props));
	var M = T(), P = c(M), ee = (e) => {
		{
			let i = (e, i) => {
				let a = () => (i?.()).props, s = () => (i?.()).wrapperProps, l = d(() => U(s(), { style: { pointerEvents: O.root.disableHoverableContent ? "none" : void 0 } })), u = d(() => U(a(), { style: st("tooltip") }, { style: n.style }));
				var f = T(), p = c(f), m = (e) => {
					var t = T(), r = c(t);
					{
						let e = d(() => ({
							props: h(u),
							wrapperProps: h(l),
							...O.snippetProps
						}));
						k(r, () => n.child, () => h(e));
					}
					N(e, t);
				}, g = (e) => {
					var i = Nr();
					B(i, () => ({ ...h(l) }));
					var a = o(i);
					B(a, () => ({ ...h(u) }));
					var s = o(a);
					k(s, () => n.children ?? t), r(a), r(i), N(e, i);
				};
				D(p, (e) => {
					n.child ? e(m) : e(g, -1);
				}), N(e, f);
			}, s = d(() => O.root.disableHoverableContent ? "none" : "auto");
			_r(e, I(() => h(j), () => O.popperProps, {
				get enabled() {
					return O.root.opts.open.current;
				},
				get id() {
					return a();
				},
				trapFocus: !1,
				loop: !1,
				preventScroll: !1,
				forceMount: !0,
				get ref() {
					return O.opts.ref;
				},
				tooltip: !0,
				get shouldRender() {
					return O.shouldRender;
				},
				get contentPointerEvents() {
					return h(s);
				},
				popper: i,
				$$slots: { popper: !0 }
			}));
		}
	}, te = (e) => {
		{
			let i = (e, i) => {
				let a = () => (i?.()).props, s = () => (i?.()).wrapperProps, l = d(() => U(s(), { style: { pointerEvents: O.root.disableHoverableContent ? "none" : void 0 } })), u = d(() => U(a(), { style: st("tooltip") }, { style: n.style }));
				var f = T(), p = c(f), m = (e) => {
					var t = T(), r = c(t);
					{
						let e = d(() => ({
							props: h(u),
							wrapperProps: h(l),
							...O.snippetProps
						}));
						k(r, () => n.child, () => h(e));
					}
					N(e, t);
				}, g = (e) => {
					var i = Nr();
					B(i, () => ({ ...h(l) }));
					var a = o(i);
					B(a, () => ({ ...h(u) }));
					var s = o(a);
					k(s, () => n.children ?? t), r(a), r(i), N(e, i);
				};
				D(p, (e) => {
					n.child ? e(m) : e(g, -1);
				}), N(e, f);
			}, s = d(() => O.root.disableHoverableContent ? "none" : "auto");
			hr(e, I(() => h(j), () => O.popperProps, {
				get open() {
					return O.root.opts.open.current;
				},
				get id() {
					return a();
				},
				trapFocus: !1,
				loop: !1,
				preventScroll: !1,
				forceMount: !1,
				get ref() {
					return O.opts.ref;
				},
				tooltip: !0,
				get shouldRender() {
					return O.shouldRender;
				},
				get contentPointerEvents() {
					return h(s);
				},
				popper: i,
				$$slots: { popper: !0 }
			}));
		}
	};
	D(P, (e) => {
		C() ? e(ee) : C() || e(te, 1);
	}), N(e, M), v();
}
// node_modules/bits-ui/dist/bits/tooltip/components/tooltip-trigger.svelte
var Fr = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"children",
	"child",
	"id",
	"disabled",
	"payload",
	"tether",
	"type",
	"tabindex",
	"ref"
]), Ir = M("<button><!></button>");
function Lr(e, n) {
	let i = w();
	l(n, !0);
	let a = z(n, "id", 19, () => be(i)), s = z(n, "disabled", 3, !1), u = z(n, "type", 3, "button"), f = z(n, "tabindex", 3, 0), p = z(n, "ref", 15, null), m = F(n, Fr), g = kr.create({
		id: H(() => a()),
		disabled: H(() => s() ?? !1),
		tabindex: H(() => f() ?? 0),
		payload: H(() => n.payload),
		tether: H(() => n.tether),
		ref: H(() => p(), (e) => p(e))
	}), _ = d(() => U(m, g.props, { type: u() }));
	var y = T(), b = c(y), x = (e) => {
		var t = T(), r = c(t);
		k(r, () => n.child, () => ({ props: h(_) })), N(e, t);
	}, S = (e) => {
		var i = Ir();
		B(i, () => ({ ...h(_) }));
		var a = o(i);
		k(a, () => n.children ?? t), r(i), N(e, i);
	};
	D(b, (e) => {
		n.child ? e(x) : e(S, -1);
	}), N(e, y), v();
}
// node_modules/bits-ui/dist/bits/tooltip/components/tooltip-provider.svelte
function Rr(e, n) {
	l(n, !0);
	let r = z(n, "delayDuration", 3, 700), i = z(n, "disableCloseOnTriggerClick", 3, !1), a = z(n, "disableHoverableContent", 3, !1), o = z(n, "disabled", 3, !1), s = z(n, "ignoreNonKeyboardFocus", 3, !1), u = z(n, "skipDelayDuration", 3, 300);
	Dr.create({
		delayDuration: H(() => r()),
		disableCloseOnTriggerClick: H(() => i()),
		disableHoverableContent: H(() => a()),
		disabled: H(() => o()),
		ignoreNonKeyboardFocus: H(() => s()),
		skipDelayDuration: H(() => u())
	});
	var d = T(), f = c(d);
	k(f, () => n.children ?? t), N(e, d), v();
}
// svelte/lib/ui/Tooltip.svelte
var zr = M("<!> <!>", 1);
function Br(e, t) {
	l(t, !0);
	var n = T(), r = c(n);
	O(r, () => Rr, (e, n) => {
		n(e, {
			delayDuration: 250,
			children: (e, n) => {
				var r = T(), o = c(r);
				O(o, () => jr, (e, n) => {
					n(e, {
						children: (e, n) => {
							var r = zr(), o = c(r);
							{
								let e = d(() => te({
									variant: "ghost",
									size: "icon"
								}));
								O(o, () => Lr, (n, r) => {
									r(n, {
										type: "button",
										get "aria-label"() {
											return t.label;
										},
										get class() {
											return h(e);
										},
										children: (e, n) => {
											var r = T(), i = c(r);
											k(i, () => t.children), N(e, r);
										},
										$$slots: { default: !0 }
									});
								});
							}
							var s = i(o, 2);
							O(s, () => ce, (e, n) => {
								n(e, {
									children: (e, n) => {
										var r = T(), i = c(r);
										O(i, () => Pr, (e, n) => {
											n(e, {
												"data-vb-native": !0,
												sideOffset: 6,
												class: "tw:z-50 tw:m-0 tw:box-border tw:max-w-xs tw:rounded-control tw:border tw:border-solid tw:border-border tw:bg-popover tw:px-3 tw:py-1.5 tw:font-sans tw:text-xs tw:leading-4 tw:text-popover-foreground tw:shadow-md",
												children: (e, n) => {
													a();
													var r = E();
													m(() => V(r, t.label)), N(e, r);
												},
												$$slots: { default: !0 }
											});
										}), N(e, r);
									},
									$$slots: { default: !0 }
								});
							}), N(e, r);
						},
						$$slots: { default: !0 }
					});
				}), N(e, r);
			},
			$$slots: { default: !0 }
		});
	}), N(e, n), v();
}
// svelte/lib/ui/Separator.svelte
var Vr = M("<div role=\"separator\"></div>");
function Hr(e, t) {
	l(t, !0);
	let n = z(t, "vertical", 3, !1);
	var r = Vr();
	m((e) => {
		b(r, "aria-orientation", n() ? "vertical" : "horizontal"), S(r, 1, e);
	}, [() => x(se("tw:shrink-0 tw:bg-border", n() ? "tw:h-full tw:w-px" : "tw:h-px tw:w-full", t.class))]), N(e, r), v();
}
// svelte/lib/ui/Skeleton.svelte
var Ur = M("<div aria-hidden=\"true\"></div>");
function Wr(e, t) {
	l(t, !0);
	var n = Ur();
	m((e) => S(n, 1, e), [() => x(se("tw:animate-pulse tw:rounded-control tw:bg-muted tw:motion-reduce:animate-none", t.class))]), N(e, n), v();
}
// svelte/lib/components/LoadingState.svelte
var Gr = M("<div role=\"status\" class=\"tw:inline-flex tw:items-center tw:gap-2 tw:font-sans tw:text-sm tw:text-muted-foreground\"><span aria-hidden=\"true\" class=\"tw:size-4 tw:animate-spin tw:rounded-full tw:border-2 tw:border-current tw:border-r-transparent tw:motion-reduce:animate-none\"></span> </div>");
function Kr(e, t) {
	var n = Gr(), a = i(o(n), 1, !0);
	r(n), m(() => V(a, t.label)), N(e, n);
}
// svelte/gallery/Gallery.svelte
var qr = M("<div class=\"tw:flex tw:flex-wrap tw:gap-2\"></div> <div class=\"tw:flex tw:flex-wrap tw:items-center tw:gap-2\"><!><!><!><!><!></div> <p class=\"tw:m-0 tw:text-xs tw:text-muted-foreground\"> </p>", 1), Jr = M("<!> <!> <!> <!>", 1), Yr = M("<div class=\"tw:flex tw:items-center tw:gap-2\"><!><label for=\"gallery-checkbox\">Include archived rooms</label></div> <div class=\"tw:flex tw:items-center tw:gap-2\"><!><label for=\"gallery-switch\">Notifications</label></div> <!> <!> <output data-selection-state=\"\" class=\"tw:block tw:text-xs tw:text-muted-foreground\" aria-live=\"polite\"> </output>", 1), Xr = M("<!><!>", 1), Zr = M("<p class=\"tw:m-0 tw:text-muted-foreground\">The same dialog primitives support mobile and desktop layouts.</p> <!>", 1), Qr = M("<p class=\"tw:m-0 tw:rounded-control tw:border tw:border-border tw:p-3\"> </p>"), $r = M("<div class=\"tw:flex tw:flex-wrap tw:gap-2\"><!> <!></div> <!>", 1), ei = M("<div class=\"tw:flex tw:items-center tw:gap-3\"><!><!><!><span class=\"tw:text-muted-foreground\">Images and initials share one frame.</span></div> <!> <div class=\"tw:flex tw:flex-wrap tw:gap-2\"><!><!><!><!><!></div> <div class=\"tw:flex tw:items-center tw:gap-3\"><!> <div class=\"tw:flex-1 tw:space-y-2\"><!><!></div></div>", 1), ti = M("<!> <p class=\"tw:m-0 tw:text-sm tw:leading-5\">Body 400 · medium 500 · semibold 500 · bold 600. English and\n          Portuguese: Olá, colaboração, ações.</p> <p class=\"tw:m-0 tw:text-muted-foreground\">Muted text uses the Studio semantic role.</p> <pre class=\"tw:m-0 tw:overflow-auto tw:rounded-control tw:border tw:border-border tw:bg-muted tw:p-3 tw:font-mono tw:text-sm tw:leading-6\"><code>const room = \"fully typed\";</code></pre>", 1), ni = M("<main data-vb-native=\"\" class=\"tw:m-0 tw:box-border tw:min-h-dvh tw:bg-background tw:px-4 tw:py-8 tw:font-sans tw:text-sm tw:font-normal tw:leading-5 tw:text-foreground tw:sm:px-8\" data-gallery=\"\"><div class=\"tw:mx-auto tw:max-w-6xl tw:space-y-6\"><header class=\"tw:flex tw:flex-wrap tw:items-start tw:justify-between tw:gap-4\"><div class=\"tw:space-y-2\"><a href=\"/app?ui=svelte\" class=\"tw:text-sm tw:text-link tw:underline-offset-4 tw:hover:underline\">vibebook</a> <h1 class=\"tw:m-0 tw:font-sans tw:text-2xl tw:font-semibold tw:leading-8 tw:tracking-tight\">Component gallery</h1> <p class=\"tw:m-0 tw:text-muted-foreground\">Shared primitives, Studio tokens, and one Tailwind entry.</p></div> <div class=\"tw:flex tw:items-center tw:gap-2\"><!><!></div></header> <div class=\"tw:grid tw:grid-cols-1 tw:gap-5 tw:md:grid-cols-2\"><!> <!> <!> <!> <!> <!> <!> <!></div> <p role=\"status\" class=\"tw:min-h-5 tw:text-sm tw:text-muted-foreground\"> </p></div></main>");
function ri(n, p) {
	l(p, !0);
	let g = f("light"), _ = f(""), y = f(""), b = f(!1), x = f(!1), S = f("room"), w = f("general"), T = f("all"), D = f(0), O = f("");
	e(() => {
		document.documentElement.dataset.theme = h(g);
	});
	let k = [
		"primary",
		"secondary",
		"outline",
		"ghost",
		"destructive",
		"link"
	];
	var j = ni(), M = o(j), P = o(M), ee = i(o(P), 2), te = o(ee);
	{
		let e = d(() => h(g) === "light" ? "Use dark theme" : "Use light theme"), t = d(() => h(g) === "light" ? "moon" : "sun");
		je(te, {
			get label() {
				return h(e);
			},
			get icon() {
				return h(t);
			},
			variant: "outline",
			onclick: () => s(g, h(g) === "light" ? "dark" : "light", !0)
		});
	}
	var ne = i(te);
	Le(ne, {
		children: (e, t) => {
			a();
			var n = E();
			m(() => V(n, h(g))), N(e, n);
		},
		$$slots: { default: !0 }
	}), r(ee), r(P);
	var F = i(P, 2), re = o(F);
	R(re, {
		title: "Actions",
		description: "Variants share focus, disabled and loading behavior.",
		children: (e, t) => {
			var n = qr(), l = c(n);
			A(l, 21, () => k, C, (e, t) => {
				L(e, {
					get variant() {
						return h(t);
					},
					onclick: () => {
						s(D, h(D) + 1), s(O, `${h(t)} activated`);
					},
					children: (e, n) => {
						a();
						var r = E();
						m(() => V(r, h(t))), N(e, r);
					},
					$$slots: { default: !0 }
				});
			}), r(l);
			var d = i(l, 2), f = o(d);
			L(f, {
				disabled: !0,
				children: (e, t) => {
					a();
					var n = E("Disabled");
					N(e, n);
				},
				$$slots: { default: !0 }
			});
			var p = i(f);
			L(p, {
				loading: !0,
				children: (e, t) => {
					a();
					var n = E("Saving");
					N(e, n);
				},
				$$slots: { default: !0 }
			});
			var g = i(p);
			L(g, {
				size: "sm",
				variant: "outline",
				children: (e, t) => {
					a();
					var n = E("Small");
					N(e, n);
				},
				$$slots: { default: !0 }
			});
			var _ = i(g);
			je(_, {
				label: "Add item",
				icon: "plus",
				onclick: () => s(D, h(D) + 1)
			}), Br(i(_), {
				label: "Search rooms",
				children: (e, t) => {
					Ze(e, { name: "search" });
				},
				$$slots: { default: !0 }
			}), r(d);
			var v = i(d, 2), y = u(v);
			m(() => V(y, `Actions: ${h(D) ?? ""}`)), N(e, n);
		},
		$$slots: { default: !0 }
	});
	var ie = i(re, 2);
	R(ie, {
		title: "Fields",
		description: "Labels, hints and errors have explicit associations.",
		children: (e, n) => {
			var r = Jr(), a = c(r);
			qe(a, {
				id: "gallery-title",
				label: "Room name",
				hint: "Choose a name your team recognizes.",
				children: (e, n = t) => {
					oe(e, I(n, {
						placeholder: "Project room",
						get value() {
							return h(_);
						},
						set value(e) {
							s(_, e, !0);
						}
					}));
				},
				$$slots: { default: !0 }
			});
			var o = i(a, 2);
			qe(o, {
				id: "gallery-email",
				label: "Email",
				error: "Enter a valid email address.",
				children: (e, n = t) => {
					oe(e, I(n, {
						type: "email",
						value: "invalid"
					}));
				},
				$$slots: { default: !0 }
			});
			var l = i(o, 2);
			qe(l, {
				id: "gallery-notes",
				label: "Notes",
				children: (e, n = t) => {
					Ie(e, I(n, {
						placeholder: "Write a note",
						get value() {
							return h(y);
						},
						set value(e) {
							s(y, e, !0);
						}
					}));
				},
				$$slots: { default: !0 }
			});
			var u = i(l, 2);
			qe(u, {
				id: "gallery-disabled",
				label: "Unavailable",
				children: (e, n = t) => {
					oe(e, I(n, {
						disabled: !0,
						value: "Disabled input"
					}));
				},
				$$slots: { default: !0 }
			}), N(e, r);
		},
		$$slots: { default: !0 }
	});
	var ae = i(ie, 2);
	R(ae, {
		title: "Selection",
		description: "Keyboard controls use native semantics or Bits UI behavior.",
		children: (e, n) => {
			var l = Yr(), d = c(l), f = o(d);
			Pe(f, {
				id: "gallery-checkbox",
				get checked() {
					return h(b);
				},
				set checked(e) {
					s(b, e, !0);
				}
			}), a(), r(d);
			var p = i(d, 2), g = o(p);
			He(g, {
				id: "gallery-switch",
				get checked() {
					return h(x);
				},
				set checked(e) {
					s(x, e, !0);
				}
			}), a(), r(p);
			var _ = i(p, 2);
			Ge(_, {
				label: "Room visibility",
				items: [
					{
						value: "room",
						label: "Room members"
					},
					{
						value: "personal",
						label: "Only me"
					},
					{
						value: "disabled",
						label: "Unavailable",
						disabled: !0
					}
				],
				get value() {
					return h(S);
				},
				set value(e) {
					s(S, e, !0);
				}
			});
			var v = i(_, 2);
			qe(v, {
				id: "gallery-filter",
				label: "Show",
				children: (e, n = t) => {
					Re(e, I(n, {
						items: [{
							value: "all",
							label: "All rooms"
						}, {
							value: "active",
							label: "Active rooms"
						}],
						get value() {
							return h(T);
						},
						set value(e) {
							s(T, e, !0);
						}
					}));
				},
				$$slots: { default: !0 }
			});
			var y = i(v, 2), C = u(y);
			m(() => V(C, `${h(S) ?? ""} · ${h(T) ?? ""}`)), N(e, l);
		},
		$$slots: { default: !0 }
	});
	var se = i(ae, 2);
	R(se, {
		title: "Overlays",
		description: "Focus trap, Escape dismissal and focus restoration are provided by Bits UI.",
		children: (e, n) => {
			var l = $r(), d = c(l), f = o(d);
			Ye(f, {
				title: "Edit room",
				description: "Changes apply to the current room.",
				closeLabel: "Close dialog",
				trigger: (e) => {
					a();
					var t = E("Open dialog");
					N(e, t);
				},
				children: (e) => {
					var n = Xr(), r = c(n);
					qe(r, {
						id: "dialog-name",
						label: "Name",
						children: (e, n = t) => {
							oe(e, I(n, {
								get value() {
									return h(_);
								},
								set value(e) {
									s(_, e, !0);
								}
							}));
						},
						$$slots: { default: !0 }
					});
					var o = i(r);
					L(o, {
						onclick: () => s(O, "Dialog action completed"),
						children: (e, t) => {
							a();
							var n = E("Save name");
							N(e, n);
						},
						$$slots: { default: !0 }
					}), N(e, n);
				},
				$$slots: {
					trigger: !0,
					default: !0
				}
			});
			var p = i(f, 2);
			Ye(p, {
				title: "Room details",
				description: "A responsive sheet shares the dialog behavior.",
				closeLabel: "Close sheet",
				sheet: !0,
				trigger: (e) => {
					a();
					var t = E("Open sheet");
					N(e, t);
				},
				children: (e) => {
					var t = Zr(), n = i(c(t), 2);
					oe(n, {
						"aria-label": "Sheet note",
						placeholder: "Add a note"
					}), N(e, t);
				},
				$$slots: {
					trigger: !0,
					default: !0
				}
			}), r(d);
			var g = i(d, 2);
			Je(g, {
				label: "Room settings",
				items: [
					{
						value: "general",
						label: "General"
					},
					{
						value: "members",
						label: "Members"
					},
					{
						value: "disabled",
						label: "Unavailable",
						disabled: !0
					}
				],
				get value() {
					return h(w);
				},
				set value(e) {
					s(w, e, !0);
				},
				children: (e, n = t) => {
					var r = Qr(), i = u(r, !0);
					m(() => V(i, n() === "general" ? "General settings" : "Room members")), N(e, r);
				},
				$$slots: { default: !0 }
			}), N(e, l);
		},
		$$slots: { default: !0 }
	});
	var z = i(se, 2);
	R(z, {
		title: "Identity and feedback",
		children: (e, t) => {
			var n = ei(), s = c(n), l = o(s);
			We(l, { name: "Gimenes" });
			var u = i(l);
			We(u, { name: "Guilherme Rodrigues" });
			var d = i(u);
			We(d, {
				name: "Sample user",
				src: "/favicon.svg"
			}), a(), r(s);
			var f = i(s, 2);
			Hr(f, {});
			var p = i(f, 2), m = o(p);
			Le(m, {
				children: (e, t) => {
					a();
					var n = E("Default");
					N(e, n);
				},
				$$slots: { default: !0 }
			});
			var h = i(m);
			Le(h, {
				variant: "primary",
				children: (e, t) => {
					a();
					var n = E("Selected");
					N(e, n);
				},
				$$slots: { default: !0 }
			});
			var g = i(h);
			Le(g, {
				variant: "success",
				children: (e, t) => {
					a();
					var n = E("Complete");
					N(e, n);
				},
				$$slots: { default: !0 }
			});
			var _ = i(g);
			Le(_, {
				variant: "warning",
				children: (e, t) => {
					a();
					var n = E("Waiting");
					N(e, n);
				},
				$$slots: { default: !0 }
			});
			var v = i(_);
			Le(v, {
				variant: "destructive",
				children: (e, t) => {
					a();
					var n = E("Failed");
					N(e, n);
				},
				$$slots: { default: !0 }
			}), r(p);
			var y = i(p, 2), b = o(y);
			Wr(b, { class: "tw:size-9 tw:rounded-full" });
			var x = i(b, 2), S = o(x);
			Wr(S, { class: "tw:h-3 tw:w-3/4" }), Wr(i(S), { class: "tw:h-3 tw:w-1/2" }), r(x), r(y), N(e, n);
		},
		$$slots: { default: !0 }
	});
	var B = i(z, 2);
	R(B, {
		title: "Empty states",
		children: (e, t) => {
			Be(e, {
				title: "Nothing waiting for you",
				description: "New requests and tasks in review will appear here.",
				children: (e, t) => {
					L(e, {
						variant: "outline",
						onclick: () => s(O, "Empty state action completed"),
						children: (e, t) => {
							a();
							var n = E("Explore rooms");
							N(e, n);
						},
						$$slots: { default: !0 }
					});
				},
				$$slots: { default: !0 }
			});
		},
		$$slots: { default: !0 }
	});
	var H = i(B, 2);
	R(H, {
		title: "Status feedback",
		children: (e, t) => {
			var n = Xr(), r = c(n);
			Kr(r, { label: "Saving changes" });
			var a = i(r);
			Ne(a, {
				title: "Could not save changes",
				description: "Your draft is still available.",
				retryLabel: "Try again",
				onretry: () => s(O, "Retry requested")
			}), N(e, n);
		},
		$$slots: { default: !0 }
	});
	var ce = i(H, 2);
	R(ce, {
		title: "Typography",
		class: "tw:md:col-span-2",
		children: (e, t) => {
			var n = ti(), r = c(n);
			Ve(r, {
				level: 3,
				class: "tw:text-xl tw:leading-7 tw:tracking-tight",
				children: (e, t) => {
					a();
					var n = E("Inter variable — headings and UI");
					N(e, n);
				},
				$$slots: { default: !0 }
			}), a(6), N(e, n);
		},
		$$slots: { default: !0 }
	}), r(F);
	var le = i(F, 2), ue = u(le, !0);
	r(M), r(j), m(() => V(ue, h(O))), N(n, j), v();
}
// svelte/gallery/RoomLayoutFixtureBoard.svelte
var ii = M("<section data-layout-fixture-board=\"\" class=\"tw:flex tw:min-h-0 tw:flex-1 tw:flex-col tw:gap-2\"><label for=\"layout-fixture-board-draft\">Retained Board draft</label> <!> <output data-layout-fixture-board-value=\"\"> </output></section>");
function ai(e, t) {
	l(t, !0);
	let n = f("");
	re(() => {
		t.mounted();
	});
	var a = ii(), c = i(o(a), 2);
	Ie(c, {
		id: "layout-fixture-board-draft",
		get value() {
			return h(n);
		},
		set value(e) {
			s(n, e, !0);
		}
	});
	var d = i(c, 2), p = u(d, !0);
	r(a), m(() => V(p, h(n))), N(e, a), v();
}
// svelte/gallery/RoomLayoutFixture.svelte
var oi = M("<nav aria-label=\"Fixture threads\" class=\"tw:space-y-3 tw:p-4\"><!><!></nav>"), si = M("<div class=\"tw:flex tw:gap-1 tw:p-2\"><!><!><span data-layout-open-drag=\"\" class=\"tw:ml-auto tw:flex tw:w-16 tw:items-center tw:justify-center\">Drag</span></div>"), ci = M("<p class=\"tw:px-4 tw:py-1\">Fixed attention row outside the message scroller</p>"), li = M("<p class=\"tw:py-2\"> </p>"), ui = M("<p>Neutral geometry fixture; no room, provider or backend data.</p> <!>", 1), di = M("<div class=\"tw:p-2\"><!></div>"), fi = M("<div class=\"tw:flex tw:gap-1 tw:p-2\"><!><!></div>"), pi = M("<form class=\"tw:flex tw:min-h-0 tw:flex-1 tw:flex-col tw:gap-2\"><label for=\"layout-doc-draft\">Document draft</label><!><!></form>"), mi = M("<p>Readonly fixture preview</p>"), hi = M("<div class=\"tw:flex tw:min-h-0 tw:flex-1 tw:flex-col tw:gap-2 tw:p-3\"><!><!></div>"), gi = M("<main data-vb-native=\"\" data-room-layout-fixture=\"\" class=\"tw:fixed tw:inset-0 tw:grid tw:grid-rows-[auto_minmax(0,1fr)] tw:overflow-hidden tw:bg-background tw:font-sans tw:text-sm tw:text-foreground\"><div class=\"tw:flex tw:flex-wrap tw:gap-1 tw:border-b tw:border-border tw:p-1\"><!><!> <!><!><!> <!><!><!> <!><!><!> <!> <!> <output data-layout-mounts=\"\"> </output><output data-layout-navigations=\"\"> </output><output data-layout-cancels=\"\"> </output><output data-layout-sheet=\"\"> </output></div> <div data-layout-fixture-room=\"\"><div class=\"tw:overflow-hidden tw:bg-muted\">Application rail fixture</div> <!></div></main> <!>", 1);
function _i(e, t) {
	l(t, !0);
	let n = () => ie(I, "$view", d), [d, p] = ae(), g = !0, y = f(!1), b = f(!1), w = f(0), T = f(0), O = f("preview"), k = f(""), j = f(0), M = f(!1), P = Ke(window), te = P.storage;
	P.storage = te ? {
		getItem: () => te.getItem("vb.room-layout-fixture.docW"),
		setItem: (e, t) => te.setItem("vb.room-layout-fixture.docW", t)
	} : null;
	let F = Ue({
		scopeKey: "public-layout-fixture",
		current: () => g,
		browser: P,
		onDocumentClosed: () => {
			s(O, "preview");
		}
	}), I = F.state, oe = {
		documentWidth: "Document width",
		closeDocument: "Close document",
		closeSidebar: "Close sidebar",
		closeSheet: "Close panel",
		historyUnconfirmed: "Panel Back is unconfirmed.",
		historyRetry: "Retry panel Back",
		animationUnavailable: "Declared stylesheet animation unavailable."
	};
	re(() => {
		let e = () => F.consumePop();
		return window.addEventListener("popstate", e), () => window.removeEventListener("popstate", e);
	}), ne(() => {
		g = !1, F.dispose();
	});
	function se() {
		F.closeSheet();
		let e = () => {
			if (!g) return;
			F.beforeNavigation(), _(T);
			let e = new URL(location.href);
			e.hash = "layout-deferred", history.pushState(null, "", e);
		};
		F.deferNavigation(e) || e();
	}
	function R() {
		let e = F.takeSheetEntry();
		F.beforeNavigation();
		let t = new URL(location.href);
		t.hash = "layout-picked", history[e ? "replaceState" : "pushState"](null, "", t);
	}
	var z = gi(), B = c(z), H = o(B), ce = o(H);
	L(ce, {
		size: "sm",
		onclick: () => F.openSheet("doc"),
		children: (e, t) => {
			a();
			var n = E("Open document");
			N(e, n);
		},
		$$slots: { default: !0 }
	});
	var le = i(ce);
	L(le, {
		size: "sm",
		onclick: () => F.openSheet("side"),
		children: (e, t) => {
			a();
			var n = E("Open sidebar");
			N(e, n);
		},
		$$slots: { default: !0 }
	});
	var ue = i(le, 2);
	L(ue, {
		size: "sm",
		onclick: () => F.setPane("doc", { open: !0 }),
		children: (e, t) => {
			a();
			var n = E("Document pane");
			N(e, n);
		},
		$$slots: { default: !0 }
	});
	var de = i(ue);
	L(de, {
		size: "sm",
		onclick: () => F.setPane("board", { open: !0 }),
		children: (e, t) => {
			a();
			var n = E("Board pane");
			N(e, n);
		},
		$$slots: { default: !0 }
	});
	var fe = i(de);
	L(fe, {
		size: "sm",
		onclick: () => F.toggleBoard(),
		children: (e, t) => {
			a();
			var n = E("Full Board");
			N(e, n);
		},
		$$slots: { default: !0 }
	});
	var pe = i(fe, 2);
	L(pe, {
		size: "sm",
		onclick: () => F.toggleSidebar(),
		children: (e, t) => {
			a();
			var n = E("Sidebar rail");
			N(e, n);
		},
		$$slots: { default: !0 }
	});
	var me = i(pe);
	L(me, {
		size: "sm",
		onclick: () => {
			s(y, !h(y));
		},
		children: (e, t) => {
			a();
			var n = E("Application rail");
			N(e, n);
		},
		$$slots: { default: !0 }
	});
	var he = i(me);
	L(he, {
		size: "sm",
		onclick: () => {
			s(b, !h(b));
		},
		children: (e, t) => {
			a();
			var n = E("Wrap header");
			N(e, n);
		},
		$$slots: { default: !0 }
	});
	var ge = i(he, 2);
	L(ge, {
		size: "sm",
		onclick: () => {
			s(O, "edit"), F.setPane("doc", { open: !0 });
		},
		children: (e, t) => {
			a();
			var n = E("Edit form");
			N(e, n);
		},
		$$slots: { default: !0 }
	});
	var _e = i(ge);
	L(_e, {
		size: "sm",
		onclick: se,
		children: (e, t) => {
			a();
			var n = E("Close then navigate");
			N(e, n);
		},
		$$slots: { default: !0 }
	});
	var ve = i(_e);
	L(ve, {
		size: "sm",
		onclick: R,
		children: (e, t) => {
			a();
			var n = E("Pick thread");
			N(e, n);
		},
		$$slots: { default: !0 }
	});
	var ye = i(ve, 2);
	L(ye, {
		size: "sm",
		onclick: () => {
			g = !1, F.dispose();
		},
		children: (e, t) => {
			a();
			var n = E("Dispose layout");
			N(e, n);
		},
		$$slots: { default: !0 }
	});
	var be = i(ye, 2);
	L(be, {
		size: "sm",
		onclick: () => {
			s(M, !0);
		},
		children: (e, t) => {
			a();
			var n = E("Open nested confirmation");
			N(e, n);
		},
		$$slots: { default: !0 }
	});
	var xe = i(be, 2), Se = u(xe, !0), Ce = i(xe), we = u(Ce, !0), Te = i(Ce), Ee = u(Te, !0), De = i(Te), Oe = u(De, !0);
	r(H);
	var ke = i(H, 2), U = i(o(ke), 2);
	Me(U, {
		get controller() {
			return F;
		},
		get labels() {
			return oe;
		},
		sidebar: (e) => {
			var t = oi(), n = o(t);
			Ve(n, {
				level: 2,
				children: (e, t) => {
					a();
					var n = E("Room sidebar");
					N(e, n);
				},
				$$slots: { default: !0 }
			});
			var s = i(n);
			L(s, {
				onclick: R,
				children: (e, t) => {
					a();
					var n = E("Choose fixture thread");
					N(e, n);
				},
				$$slots: { default: !0 }
			}), r(t), N(e, t);
		},
		header: (e) => {
			Ve(e, {
				level: 1,
				class: "tw:text-base",
				children: (e, t) => {
					a();
					var n = E();
					m((e) => V(n, e), [() => h(b) ? "Natural room header wraps across several lines without measuring header CSS properties. ".repeat(6) : "Natural room header"]), N(e, n);
				},
				$$slots: { default: !0 }
			});
		},
		peek: (e) => {
			var t = si(), n = o(t);
			L(n, {
				size: "sm",
				onclick: () => F.setPane("doc", {
					open: !0,
					toggle: !0
				}),
				children: (e, t) => {
					a();
					var n = E("Doc tab");
					N(e, n);
				},
				$$slots: { default: !0 }
			});
			var s = i(n);
			L(s, {
				size: "sm",
				onclick: () => F.setPane("board", {
					open: !0,
					toggle: !0
				}),
				children: (e, t) => {
					a();
					var n = E("Board tab");
					N(e, n);
				},
				$$slots: { default: !0 }
			}), a(), r(t), N(e, t);
		},
		attention: (e) => {
			var t = ci();
			N(e, t);
		},
		chat: (e) => {
			var t = ui(), n = i(c(t), 2);
			A(n, 16, () => Array.from({ length: 50 }, (e, t) => t), C, (e, t) => {
				var n = li(), r = u(n);
				m(() => V(r, `Scrollable fixture line ${t ?? ""}`)), N(e, n);
			}), N(e, t);
		},
		composer: (e) => {
			var t = di(), n = o(t);
			Ie(n, { "aria-label": "Fixture composer" }), r(t), N(e, t);
		},
		documentToolbar: (e) => {
			var t = fi(), n = o(t);
			L(n, {
				size: "sm",
				onclick: () => F.setPane("doc"),
				children: (e, t) => {
					a();
					var n = E("Desktop Doc");
					N(e, n);
				},
				$$slots: { default: !0 }
			});
			var s = i(n);
			L(s, {
				size: "sm",
				onclick: () => F.setPane("board"),
				children: (e, t) => {
					a();
					var n = E("Desktop Board");
					N(e, n);
				},
				$$slots: { default: !0 }
			}), r(t), N(e, t);
		},
		document: (e) => {
			var t = hi(), n = o(t);
			Ve(n, {
				level: 2,
				children: (e, t) => {
					a();
					var n = E("Document surface");
					N(e, n);
				},
				$$slots: { default: !0 }
			});
			var c = i(n), l = (e) => {
				var t = pi(), n = i(o(t));
				Ie(n, {
					id: "layout-doc-draft",
					class: "tw:min-h-0 tw:flex-1",
					get value() {
						return h(k);
					},
					set value(e) {
						s(k, e, !0);
					}
				});
				var c = i(n);
				L(c, {
					onclick: () => {
						_(j), s(O, "preview");
					},
					children: (e, t) => {
						a();
						var n = E("Cancel document form");
						N(e, n);
					},
					$$slots: { default: !0 }
				}), r(t), ee("submit", t, (e) => e.preventDefault()), N(e, t);
			}, u = (e) => {
				var t = mi();
				N(e, t);
			};
			D(c, (e) => {
				h(O) === "edit" ? e(l) : e(u, -1);
			}), r(t), N(e, t);
		},
		board: (e) => {
			ai(e, { mounted: () => {
				_(w);
			} });
		},
		$$slots: {
			sidebar: !0,
			header: !0,
			peek: !0,
			attention: !0,
			chat: !0,
			composer: !0,
			documentToolbar: !0,
			document: !0,
			board: !0
		}
	}), r(ke), r(B);
	var Ae = i(B, 2);
	Fe(Ae, {
		title: "Nested layout confirmation",
		description: "Public fixture; no mutation.",
		confirmLabel: "Confirm fixture",
		cancelLabel: "Cancel fixture",
		onconfirm: () => {
			s(M, !1);
		},
		get open() {
			return h(M);
		},
		set open(e) {
			s(M, e, !0);
		}
	}), m(() => {
		V(Se, h(w)), V(we, h(T)), V(Ee, h(j)), V(Oe, n().sheet ?? "closed"), S(ke, 1, x(h(y) ? "tw:grid tw:min-h-0 tw:grid-cols-[68px_minmax(0,1fr)]" : "tw:grid tw:min-h-0 tw:grid-cols-[0_minmax(0,1fr)]"));
	}), N(e, z), v(), p();
}
// svelte/gallery/main.ts
function vi(e) {
	let t = j(new URLSearchParams(location.search).get("probe") === "room-layout" ? _i : ri, { target: e });
	return () => y(t);
}
export { vi as mountGallery };
