import { $ as e, A as t, Ct as n, G as r, Gt as i, L as a, N as o, O as s, Pn as c, U as l, Z as u, c as d, et as f, k as p, p as m, q as h, qt as g, st as _, wt as v } from "./shared-Cn4mm4KY.js";
import { B as y, C as b, D as x, E as S, F as C, G as w, H as T, K as E, L as D, M as O, N as k, P as A, R as j, U as M, V as N, X as P, a as ee, d as te, f as F, i as ne, l as re, r as ie, s as ae, t as I, u as L, x as oe, z as R } from "./Card-CD0C77Sq.js";
import { $ as se, A as ce, B as le, F as ue, H as de, I as fe, J as pe, K as z, L as me, M as he, N as ge, O as _e, P as ve, Q as ye, R as be, S as xe, U as B, V as Se, W as Ce, X as V, Y as H, Z as we, _ as Te, a as Ee, b as De, c as Oe, et as ke, g as Ae, h as je, i as Me, j as Ne, k as Pe, l as Fe, n as Ie, o as Le, q as Re, r as ze, s as Be, t as Ve, tt as He, u as Ue, v as We, x as Ge, y as Ke, z as qe } from "./RadioGroup-CYa-Ao14.js";
// node_modules/svelte-toolbelt/dist/utils/on-mount-effect.svelte.js
function Je(e) {
	p(() => m(() => e()));
}
// node_modules/bits-ui/dist/bits/utilities/floating-layer/floating-root.svelte.js
var Ye = new Ce("Floating.Root"), Xe = new Ce("Floating.Root"), Ze = class e {
	static create(t = !1) {
		return t ? Xe.set(new e()) : Ye.set(new e());
	}
	anchorNode = V(null);
	customAnchorNode = V(null);
	triggerNode = V(null);
	constructor() {
		p(() => {
			this.customAnchorNode.current ? typeof this.customAnchorNode.current == "string" ? this.anchorNode.current = document.querySelector(this.customAnchorNode.current) : this.anchorNode.current = this.customAnchorNode.current : this.anchorNode.current = this.triggerNode.current;
		});
	}
};
// node_modules/bits-ui/dist/bits/utilities/floating-layer/components/floating-layer.svelte
function Qe(e, t) {
	v(t, !0);
	let r = L(t, "tooltip", 3, !1);
	Ze.create(m(() => r()));
	var i = T(), o = a(i);
	k(o, () => t.children ?? c), N(e, i), n();
}
// node_modules/bits-ui/dist/internal/floating-svelte/floating-utils.svelte.js
function $e(e) {
	return typeof e == "function" ? e() : e;
}
function et(e) {
	return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function tt(e, t) {
	let n = et(e);
	return Math.round(t * n) / n;
}
function nt(e) {
	return {
		[`--bits-${e}-content-transform-origin`]: "var(--bits-floating-transform-origin)",
		[`--bits-${e}-content-available-width`]: "var(--bits-floating-available-width)",
		[`--bits-${e}-content-available-height`]: "var(--bits-floating-available-height)",
		[`--bits-${e}-anchor-width`]: "var(--bits-floating-anchor-width)",
		[`--bits-${e}-anchor-height`]: "var(--bits-floating-anchor-height)"
	};
}
// node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs
var rt = [
	"top",
	"right",
	"bottom",
	"left"
], U = Math.min, W = Math.max, it = Math.round, at = Math.floor, G = (e) => ({
	x: e,
	y: e
}), ot = {
	left: "right",
	right: "left",
	bottom: "top",
	top: "bottom"
};
function st(e, t, n) {
	return W(e, U(t, n));
}
function K(e, t) {
	return typeof e == "function" ? e(t) : e;
}
function q(e) {
	return e.split("-")[0];
}
function ct(e) {
	return e.split("-")[1];
}
function lt(e) {
	return e === "x" ? "y" : "x";
}
function ut(e) {
	return e === "y" ? "height" : "width";
}
function J(e) {
	let t = e[0];
	return t === "t" || t === "b" ? "y" : "x";
}
function dt(e) {
	return lt(J(e));
}
function ft(e, t, n) {
	n === void 0 && (n = !1);
	let r = ct(e), i = dt(e), a = ut(i), o = i === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
	return t.reference[a] > t.floating[a] && (o = xt(o)), [o, xt(o)];
}
function pt(e) {
	let t = xt(e);
	return [
		mt(e),
		t,
		mt(t)
	];
}
function mt(e) {
	return e.includes("start") ? e.replace("start", "end") : e.replace("end", "start");
}
var ht = ["left", "right"], gt = ["right", "left"], _t = ["top", "bottom"], vt = ["bottom", "top"];
function yt(e, t, n) {
	switch (e) {
		case "top":
		case "bottom": return n ? t ? gt : ht : t ? ht : gt;
		case "left":
		case "right": return t ? _t : vt;
		default: return [];
	}
}
function bt(e, t, n, r) {
	let i = ct(e), a = yt(q(e), n === "start", r);
	return i && (a = a.map((e) => e + "-" + i), t && (a = a.concat(a.map(mt)))), a;
}
function xt(e) {
	let t = q(e);
	return ot[t] + e.slice(t.length);
}
function St(e) {
	return {
		top: e.top ?? 0,
		right: e.right ?? 0,
		bottom: e.bottom ?? 0,
		left: e.left ?? 0
	};
}
function Ct(e) {
	return typeof e == "number" ? {
		top: e,
		right: e,
		bottom: e,
		left: e
	} : St(e);
}
function wt(e) {
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
function Tt(e, t, n) {
	let { reference: r, floating: i } = e, a = J(t), o = dt(t), s = ut(o), c = q(t), l = a === "y", u = r.x + r.width / 2 - i.width / 2, d = r.y + r.height / 2 - i.height / 2, f = r[s] / 2 - i[s] / 2, p;
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
	let m = ct(t);
	return m && (p[o] += f * (m === "end" ? 1 : -1) * (n && l ? -1 : 1)), p;
}
async function Et(e, t) {
	t === void 0 && (t = {});
	let { x: n, y: r, platform: i, rects: a, elements: o, strategy: s } = e, { boundary: c = "clippingAncestors", rootBoundary: l = "viewport", elementContext: u = "floating", altBoundary: d = !1, padding: f = 0 } = K(t, e), p = Ct(f), m = o[d ? u === "floating" ? "reference" : "floating" : u], h = wt(await i.getClippingRect({
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
	}, y = wt(i.convertOffsetParentRelativeRectToViewportRelativeRect ? await i.convertOffsetParentRelativeRectToViewportRelativeRect({
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
var Dt = 50, Ot = async (e, t, n) => {
	let { placement: r = "bottom", strategy: i = "absolute", middleware: a = [], platform: o } = n, s = o.detectOverflow ? o : {
		...o,
		detectOverflow: Et
	}, c = await (o.isRTL == null ? void 0 : o.isRTL(t)), l = await o.getElementRects({
		reference: e,
		floating: t,
		strategy: i
	}), { x: u, y: d } = Tt(l, r, c), f = r, p = 0, m = {};
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
		}, x && p < Dt && (p++, typeof x == "object" && (x.placement && (f = x.placement), x.rects && (l = x.rects === !0 ? await o.getElementRects({
			reference: e,
			floating: t,
			strategy: i
		}) : x.rects), {x: u, y: d} = Tt(l, f, c)), n = -1);
	}
	return {
		x: u,
		y: d,
		placement: f,
		strategy: i,
		middlewareData: m
	};
}, kt = (e) => ({
	name: "arrow",
	options: e,
	async fn(t) {
		let { x: n, y: r, placement: i, rects: a, platform: o, elements: s, middlewareData: c } = t, { element: l, padding: u = 0 } = K(e, t) || {};
		if (l == null) return {};
		let d = Ct(u), f = {
			x: n,
			y: r
		}, p = dt(i), m = ut(p), h = await o.getDimensions(l), g = p === "y", _ = g ? "top" : "left", v = g ? "bottom" : "right", y = g ? "clientHeight" : "clientWidth", b = a.reference[m] + a.reference[p] - f[p] - a.floating[m], x = f[p] - a.reference[p], S = await (o.getOffsetParent == null ? void 0 : o.getOffsetParent(l)), C = S ? S[y] : 0;
		C && await (o.isElement == null ? void 0 : o.isElement(S)) || (C = s.floating[y] || a.floating[m]);
		let w = b / 2 - x / 2, T = C / 2 - h[m] / 2 - 1, E = U(d[_], T), D = U(d[v], T), O = C - h[m] - D, k = C / 2 - h[m] / 2 + w, A = st(E, k, O), j = !c.arrow && ct(i) != null && k !== A && a.reference[m] / 2 - (k < E ? E : D) - h[m] / 2 < 0, M = j ? k < E ? k - E : k - O : 0;
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
}), At = function(e) {
	return e === void 0 && (e = {}), {
		name: "flip",
		options: e,
		async fn(t) {
			var n;
			let { placement: r, middlewareData: i, rects: a, initialPlacement: o, platform: s, elements: c } = t, { mainAxis: l = !0, crossAxis: u = !0, fallbackPlacements: d, fallbackStrategy: f = "bestFit", fallbackAxisSideDirection: p = "none", flipAlignment: m = !0, ...h } = K(e, t);
			if ((n = i.arrow) != null && n.alignmentOffset) return {};
			let g = q(r), _ = J(o), v = q(o) === o, y = await (s.isRTL == null ? void 0 : s.isRTL(c.floating)), b = d || (v || !m ? [xt(o)] : pt(o)), x = p !== "none";
			!d && x && b.push(...bt(o, m, p, y));
			let S = [o, ...b], C = await s.detectOverflow(t, h), w = [], T = i.flip?.overflows || [];
			if (l && w.push(C[g]), u) {
				let e = ft(r, a, y);
				w.push(C[e[0]], C[e[1]]);
			}
			if (T = [...T, {
				placement: r,
				overflows: w
			}], !w.every((e) => e <= 0)) {
				let e = (i.flip?.index || 0) + 1, t = S[e];
				if (t && (u !== "alignment" || _ === J(t) || T.every((e) => J(e.placement) !== _ || e.overflows[0] > 0))) return {
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
								let t = J(e.placement);
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
function jt(e, t) {
	return {
		top: e.top - t.height,
		right: e.right - t.width,
		bottom: e.bottom - t.height,
		left: e.left - t.width
	};
}
function Mt(e) {
	return rt.some((t) => e[t] >= 0);
}
var Nt = function(e) {
	return e === void 0 && (e = {}), {
		name: "hide",
		options: e,
		async fn(t) {
			let { rects: n, platform: r } = t, { strategy: i = "referenceHidden", ...a } = K(e, t);
			switch (i) {
				case "referenceHidden": {
					let e = jt(await r.detectOverflow(t, {
						...a,
						elementContext: "reference"
					}), n.reference);
					return { data: {
						referenceHiddenOffsets: e,
						referenceHidden: Mt(e)
					} };
				}
				case "escaped": {
					let e = jt(await r.detectOverflow(t, {
						...a,
						altBoundary: !0
					}), n.floating);
					return { data: {
						escapedOffsets: e,
						escaped: Mt(e)
					} };
				}
				default: return {};
			}
		}
	};
}, Pt = /*#__PURE__*/ new Set(["left", "top"]);
async function Ft(e, t) {
	let { placement: n, platform: r, elements: i } = e, a = await (r.isRTL == null ? void 0 : r.isRTL(i.floating)), o = q(n), s = ct(n), c = J(n) === "y", l = Pt.has(o) ? -1 : 1, u = a && c ? -1 : 1, d = K(t, e), { mainAxis: f, crossAxis: p, alignmentAxis: m } = typeof d == "number" ? {
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
var It = function(e) {
	return e === void 0 && (e = 0), {
		name: "offset",
		options: e,
		async fn(t) {
			var n;
			let { x: r, y: i, placement: a, middlewareData: o } = t, s = await Ft(t, e);
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
}, Lt = function(e) {
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
			} }, ...l } = K(e, t), u = {
				x: n,
				y: r
			}, d = await a.detectOverflow(t, l), f = J(i), p = lt(f), m = u[p], h = u[f], g = (e, t) => st(t + d[e === "y" ? "top" : "left"], t, t - d[e === "y" ? "bottom" : "right"]);
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
}, Rt = function(e) {
	return e === void 0 && (e = {}), {
		options: e,
		fn(t) {
			let { x: n, y: r, placement: i, rects: a, middlewareData: o } = t, { offset: s = 0, mainAxis: c = !0, crossAxis: l = !0 } = K(e, t), u = {
				x: n,
				y: r
			}, d = J(i), f = lt(d), p = u[f], m = u[d], h = K(s, t), g = typeof h == "number" ? {
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
				let e = f === "y" ? "width" : "height", t = Pt.has(q(i)), n = a.reference[d] - a.floating[e] + (t && o.offset?.[d] || 0) + (t ? 0 : g.crossAxis), r = a.reference[d] + a.reference[e] + (t ? 0 : o.offset?.[d] || 0) - (t ? g.crossAxis : 0);
				m < n ? m = n : m > r && (m = r);
			}
			return {
				[f]: p,
				[d]: m
			};
		}
	};
}, zt = function(e) {
	return e === void 0 && (e = {}), {
		name: "size",
		options: e,
		async fn(t) {
			let { placement: n, rects: r, platform: i, elements: a } = t, { apply: o = () => {}, ...s } = K(e, t), c = await i.detectOverflow(t, s), l = q(n), u = ct(n), d = J(n) === "y", { width: f, height: p } = r.floating, m, h;
			l === "top" || l === "bottom" ? (m = l, h = u === (await (i.isRTL == null ? void 0 : i.isRTL(a.floating)) ? "start" : "end") ? "left" : "right") : (h = l, m = u === "end" ? "top" : "bottom");
			let g = p - c.top - c.bottom, _ = f - c.left - c.right, v = U(p - c[m], g), y = U(f - c[h], _), b = t.middlewareData.shift, x = !b, S = v, C = y;
			b != null && b.enabled.x && (C = _), b != null && b.enabled.y && (S = g), x && !u && (d ? C = f - 2 * W(c.left, c.right) : S = p - 2 * W(c.top, c.bottom)), await o({
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
function Bt() {
	return typeof window < "u";
}
function Vt(e) {
	return Ht(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function Y(e) {
	var t;
	return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function X(e) {
	return ((Ht(e) ? e.ownerDocument : e.document) || window.document)?.documentElement;
}
function Ht(e) {
	return Bt() ? e instanceof Node || e instanceof Y(e).Node : !1;
}
function Z(e) {
	return Bt() ? e instanceof Element || e instanceof Y(e).Element : !1;
}
function Q(e) {
	return Bt() ? e instanceof HTMLElement || e instanceof Y(e).HTMLElement : !1;
}
function Ut(e) {
	return !Bt() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof Y(e).ShadowRoot;
}
function Wt(e) {
	let { overflow: t, overflowX: n, overflowY: r, display: i } = $(e);
	return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && i !== "inline" && i !== "contents";
}
function Gt(e) {
	return /^(table|td|th)$/.test(Vt(e));
}
function Kt(e) {
	try {
		if (e.matches(":popover-open")) return !0;
	} catch {}
	try {
		return e.matches(":modal");
	} catch {
		return !1;
	}
}
var qt = /transform|translate|scale|rotate|perspective|filter/, Jt = /paint|layout|strict|content/, Yt = (e) => !!e && e !== "none", Xt;
function Zt(e) {
	let t = Z(e) ? $(e) : e;
	return Yt(t.transform) || Yt(t.translate) || Yt(t.scale) || Yt(t.rotate) || Yt(t.perspective) || !$t() && (Yt(t.backdropFilter) || Yt(t.filter)) || qt.test(t.willChange || "") || Jt.test(t.contain || "");
}
function Qt(e) {
	let t = nn(e);
	for (; Q(t) && !en(t);) {
		if (Zt(t)) return t;
		if (Kt(t)) return null;
		t = nn(t);
	}
	return null;
}
function $t() {
	return Xt ??= typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none"), Xt;
}
function en(e) {
	return /^(html|body|#document)$/.test(Vt(e));
}
function $(e) {
	return Y(e).getComputedStyle(e);
}
function tn(e) {
	return Z(e) ? {
		scrollLeft: e.scrollLeft,
		scrollTop: e.scrollTop
	} : {
		scrollLeft: e.scrollX,
		scrollTop: e.scrollY
	};
}
function nn(e) {
	if (Vt(e) === "html") return e;
	let t = e.assignedSlot || e.parentNode || Ut(e) && e.host || X(e);
	return Ut(t) ? t.host : t;
}
function rn(e) {
	let t = nn(e);
	return en(t) ? (e.ownerDocument || e).body : Q(t) && Wt(t) ? t : rn(t);
}
function an(e, t, n) {
	t === void 0 && (t = []), n === void 0 && (n = !0);
	let r = rn(e), i = r === e.ownerDocument?.body, a = Y(r);
	if (i) {
		let e = on(a);
		return t.concat(a, a.visualViewport || [], Wt(r) ? r : [], e && n ? an(e) : []);
	}
	return t.concat(r, an(r, [], n));
}
function on(e) {
	return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
// node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs
function sn(e) {
	let t = $(e), n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0, i = Q(e), a = i ? e.offsetWidth : n, o = i ? e.offsetHeight : r, s = it(n) !== a || it(r) !== o;
	return s && (n = a, r = o), {
		width: n,
		height: r,
		$: s
	};
}
function cn(e) {
	return Z(e) ? e : e.contextElement;
}
function ln(e) {
	let t = cn(e);
	if (!Q(t)) return G(1);
	let n = t.getBoundingClientRect(), { width: r, height: i, $: a } = sn(t), o = (a ? it(n.width) : n.width) / r, s = (a ? it(n.height) : n.height) / i;
	return o && Number.isFinite(o) || (o = 1), s && Number.isFinite(s) || (s = 1), {
		x: o,
		y: s
	};
}
var un = /*#__PURE__*/ G(0);
function dn(e) {
	let t = Y(e);
	return !$t() || !t.visualViewport ? un : {
		x: t.visualViewport.offsetLeft,
		y: t.visualViewport.offsetTop
	};
}
function fn(e, t, n) {
	return t === void 0 && (t = !1), !!n && t && n === Y(e);
}
function pn(e, t, n, r) {
	t === void 0 && (t = !1), n === void 0 && (n = !1);
	let i = e.getBoundingClientRect(), a = cn(e), o = G(1);
	t && (r ? Z(r) && (o = ln(r)) : o = ln(e));
	let s = fn(a, n, r) ? dn(a) : G(0), c = (i.left + s.x) / o.x, l = (i.top + s.y) / o.y, u = i.width / o.x, d = i.height / o.y;
	if (a && r) {
		let e = Y(a), t = Z(r) ? Y(r) : r, n = e, i = on(n);
		for (; i && t !== n;) {
			let e = ln(i), t = i.getBoundingClientRect(), r = $(i), a = t.left + (i.clientLeft + parseFloat(r.paddingLeft)) * e.x, o = t.top + (i.clientTop + parseFloat(r.paddingTop)) * e.y;
			c *= e.x, l *= e.y, u *= e.x, d *= e.y, c += a, l += o, n = Y(i), i = on(n);
		}
	}
	return wt({
		width: u,
		height: d,
		x: c,
		y: l
	});
}
function mn(e, t) {
	let n = tn(e).scrollLeft;
	return t ? t.left + n : pn(X(e)).left + n;
}
function hn(e, t) {
	let n = e.getBoundingClientRect();
	return {
		x: n.left + t.scrollLeft - mn(e, n),
		y: n.top + t.scrollTop
	};
}
function gn(e) {
	let { elements: t, rect: n, offsetParent: r, strategy: i } = e, a = i === "fixed", o = X(r), s = t ? Kt(t.floating) : !1;
	if (r === o || s && a) return n;
	let c = {
		scrollLeft: 0,
		scrollTop: 0
	}, l = G(1), u = G(0), d = Q(r);
	if ((d || !a) && ((Vt(r) !== "body" || Wt(o)) && (c = tn(r)), d)) {
		let e = pn(r);
		l = ln(r), u.x = e.x + r.clientLeft, u.y = e.y + r.clientTop;
	}
	let f = o && !d && !a ? hn(o, c) : G(0);
	return {
		width: n.width * l.x,
		height: n.height * l.y,
		x: n.x * l.x - c.scrollLeft * l.x + u.x + f.x,
		y: n.y * l.y - c.scrollTop * l.y + u.y + f.y
	};
}
function _n(e) {
	return e.getClientRects ? Array.from(e.getClientRects()) : [];
}
function vn(e) {
	let t = tn(e), n = e.ownerDocument.body, r = W(e.scrollWidth, e.clientWidth, n.scrollWidth, n.clientWidth), i = W(e.scrollHeight, e.clientHeight, n.scrollHeight, n.clientHeight), a = -t.scrollLeft + mn(e), o = -t.scrollTop;
	return $(n).direction === "rtl" && (a += W(e.clientWidth, n.clientWidth) - r), {
		width: r,
		height: i,
		x: a,
		y: o
	};
}
var yn = 25;
function bn(e, t, n) {
	n === void 0 && (n = "viewport");
	let r = n === "layoutViewport", i = Y(e), a = X(e), o = i.visualViewport, s = a.clientWidth, c = a.clientHeight, l = 0, u = 0;
	if (o) {
		let e = !$t() || t === "fixed";
		r ? e || (l = -o.offsetLeft, u = -o.offsetTop) : (s = o.width, c = o.height, e && (l = o.offsetLeft, u = o.offsetTop));
	}
	if (mn(a) <= 0) {
		let e = a.ownerDocument, t = e.body, n = getComputedStyle(t), r = e.compatMode === "CSS1Compat" && parseFloat(n.marginLeft) + parseFloat(n.marginRight) || 0, i = Math.abs(a.clientWidth - t.clientWidth - r), o = getComputedStyle(a).scrollbarGutter === "stable both-edges" ? i / 2 : i;
		o <= yn && (s -= o);
	}
	return {
		width: s,
		height: c,
		x: l,
		y: u
	};
}
function xn(e, t) {
	let n = pn(e, !0, t === "fixed"), r = n.top + e.clientTop, i = n.left + e.clientLeft, a = ln(e);
	return {
		width: e.clientWidth * a.x,
		height: e.clientHeight * a.y,
		x: i * a.x,
		y: r * a.y
	};
}
function Sn(e, t, n) {
	let r;
	if (t === "viewport" || t === "layoutViewport") r = bn(e, n, t);
	else if (t === "document") r = vn(X(e));
	else if (Z(t)) r = xn(t, n);
	else {
		let n = dn(e);
		r = {
			x: t.x - n.x,
			y: t.y - n.y,
			width: t.width,
			height: t.height
		};
	}
	return wt(r);
}
function Cn(e, t) {
	let n = t.get(e);
	if (n) return n;
	let r = an(e, [], !1).filter((e) => Z(e) && Vt(e) !== "body"), i = null, a = $(e).position === "fixed", o = a ? nn(e) : e;
	for (; Z(o) && !en(o);) {
		let e = $(o), t = Zt(o), n = i ? i.position : a ? "fixed" : "";
		!t && (n === "fixed" || n === "absolute" && e.position === "static") ? r = r.filter((e) => e !== o) : i = e, o = nn(o);
	}
	return t.set(e, r), r;
}
function wn(e) {
	let { element: t, boundary: n, rootBoundary: r, strategy: i } = e, a = [...n === "clippingAncestors" ? Kt(t) ? [] : Cn(t, this._c) : [].concat(n), r], o = Sn(t, a[0], i), s = o.top, c = o.right, l = o.bottom, u = o.left;
	for (let e = 1; e < a.length; e++) {
		let n = Sn(t, a[e], i);
		s = W(n.top, s), c = U(n.right, c), l = U(n.bottom, l), u = W(n.left, u);
	}
	return {
		width: c - u,
		height: l - s,
		x: u,
		y: s
	};
}
function Tn(e) {
	let { width: t, height: n } = sn(e);
	return {
		width: t,
		height: n
	};
}
function En(e, t, n) {
	let r = Q(t), i = X(t), a = n === "fixed", o = pn(e, !0, a, t), s = {
		scrollLeft: 0,
		scrollTop: 0
	}, c = G(0);
	if ((r || !a) && ((Vt(t) !== "body" || Wt(i)) && (s = tn(t)), r)) {
		let e = pn(t, !0, a, t);
		c.x = e.x + t.clientLeft, c.y = e.y + t.clientTop;
	}
	!r && i && (c.x = mn(i));
	let l = i && !r && !a ? hn(i, s) : G(0);
	return {
		x: o.left + s.scrollLeft - c.x - l.x,
		y: o.top + s.scrollTop - c.y - l.y,
		width: o.width,
		height: o.height
	};
}
function Dn(e) {
	return $(e).position === "static";
}
function On(e, t) {
	if (!Q(e) || $(e).position === "fixed") return null;
	if (t) return t(e);
	let n = e.offsetParent;
	return X(e) === n && (n = n.ownerDocument.body), n;
}
function kn(e, t) {
	let n = Y(e);
	if (Kt(e)) return n;
	if (!Q(e)) {
		let t = nn(e);
		for (; t && !en(t);) {
			if (Z(t) && !Dn(t)) return t;
			t = nn(t);
		}
		return n;
	}
	let r = On(e, t);
	for (; r && Gt(r) && Dn(r);) r = On(r, t);
	return r && en(r) && Dn(r) && !Zt(r) ? n : r || Qt(e) || n;
}
var An = async function(e) {
	let t = this.getOffsetParent || kn, n = this.getDimensions, r = await n(e.floating);
	return {
		reference: En(e.reference, await t(e.floating), e.strategy),
		floating: {
			x: 0,
			y: 0,
			width: r.width,
			height: r.height
		}
	};
};
function jn(e) {
	return $(e).direction === "rtl";
}
var Mn = {
	convertOffsetParentRelativeRectToViewportRelativeRect: gn,
	getDocumentElement: X,
	getClippingRect: wn,
	getOffsetParent: kn,
	getElementRects: An,
	getClientRects: _n,
	getDimensions: Tn,
	getScale: ln,
	isElement: Z,
	isRTL: jn
};
function Nn(e, t) {
	return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function Pn(e, t, n) {
	let r = null, i, a = X(e);
	function o() {
		var e;
		clearTimeout(i), (e = r) == null || e.disconnect(), r = null;
	}
	function s(n, c) {
		n === void 0 && (n = !1), c === void 0 && (c = 1), o();
		let l = e.getBoundingClientRect(), { left: u, top: d, width: f, height: p } = l;
		if (n || t(), !f || !p) return;
		let m = at(d), h = at(a.clientWidth - (u + f)), g = at(a.clientHeight - (d + p)), _ = at(u), v = {
			rootMargin: -m + "px " + -h + "px " + -g + "px " + -_ + "px",
			threshold: W(0, U(1, c)) || 1
		}, y = !0;
		function b(t) {
			let n = t[0].intersectionRatio;
			if (!Nn(l, e.getBoundingClientRect())) return s();
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
	let c = Y(e), l = () => s(n);
	return c.addEventListener("resize", l), s(!0), () => {
		c.removeEventListener("resize", l), o();
	};
}
function Fn(e, t, n, r) {
	r === void 0 && (r = {});
	let { ancestorScroll: i = !0, ancestorResize: a = !0, elementResize: o = typeof ResizeObserver == "function", layoutShift: s = typeof IntersectionObserver == "function", animationFrame: c = !1 } = r, l = cn(e), u = i || a ? [...l ? an(l) : [], ...t ? an(t) : []] : [];
	u.forEach((e) => {
		i && e.addEventListener("scroll", n), a && e.addEventListener("resize", n);
	});
	let d = l && s ? Pn(l, n, a) : null, f = -1, p = null;
	o && (p = new ResizeObserver((e) => {
		let [r] = e;
		r && r.target === l && p && t && (p.unobserve(t), cancelAnimationFrame(f), f = requestAnimationFrame(() => {
			var e;
			(e = p) == null || e.observe(t);
		})), n();
	}), l && !c && p.observe(l), t && p.observe(t));
	let m, h = c ? pn(e) : null;
	c && g();
	function g() {
		let t = pn(e);
		h && !Nn(h, t) && n(), h = t, m = requestAnimationFrame(g);
	}
	return n(), () => {
		var e;
		u.forEach((e) => {
			i && e.removeEventListener("scroll", n), a && e.removeEventListener("resize", n);
		}), d?.(), (e = p) == null || e.disconnect(), p = null, c && cancelAnimationFrame(m);
	};
}
var In = It, Ln = Lt, Rn = At, zn = zt, Bn = Nt, Vn = kt, Hn = Rt, Un = (e, t, n) => {
	let r = /* @__PURE__ */ new Map(), i = n ?? {}, a = {
		...Mn,
		...i.platform,
		_c: r
	};
	return Ot(e, t, {
		...i,
		platform: a
	});
};
// node_modules/bits-ui/dist/internal/floating-svelte/use-floating.svelte.js
function Wn(n) {
	let r = n.whileElementsMounted, i = _(() => $e(n.open) ?? !0), a = _(() => $e(n.middleware)), o = _(() => $e(n.transform) ?? !0), s = _(() => $e(n.placement) ?? "bottom"), c = _(() => $e(n.strategy) ?? "absolute"), l = _(() => $e(n.sideOffset) ?? 0), f = _(() => $e(n.alignOffset) ?? 0), m = n.reference, g;
	t(() => {
		g = {
			middleware: d(a),
			placement: d(s),
			strategy: d(c),
			open: d(i),
			sideOffset: d(l),
			alignOffset: d(f)
		};
	});
	let v = e(0), y = e(0), b = V(null), x = e(h(d(c))), S = e(h(d(s))), C = e(h({})), w = e(!1), T = !1, E = 0, D = !1, O = _(() => {
		let e = b.current ? tt(b.current, d(v)) : d(v), t = b.current ? tt(b.current, d(y)) : d(y);
		return d(o) ? {
			position: d(x),
			left: "0",
			top: "0",
			transform: `translate(${e}px, ${t}px)`,
			...b.current && et(b.current) >= 1.5 && { willChange: "transform" }
		} : {
			position: d(x),
			left: `${e}px`,
			top: `${t}px`
		};
	}), k;
	function A() {
		if (D || m.current === null || b.current === null) return;
		let e = m.current, t = b.current, n = ++E;
		Un(e, t, {
			middleware: g.middleware,
			placement: g.placement,
			strategy: g.strategy
		}).then((r) => {
			if (n === E && m.current === e && b.current === t) {
				if (Gn(e)) u(C, {
					...d(C),
					hide: {
						...d(C).hide,
						referenceHidden: !0
					}
				}, !0);
				else {
					if (!g.open && d(v) !== 0 && d(y) !== 0) {
						let e = Math.max(Math.abs(g.sideOffset), Math.abs(g.alignOffset), 15);
						if (r.x <= e && r.y <= e) return;
					}
					u(v, r.x, !0), u(y, r.y, !0), u(x, r.strategy, !0), u(S, r.placement, !0), u(C, r.middlewareData, !0), u(w, !0);
				}
			}
		});
	}
	function j() {
		typeof k == "function" && (k(), k = void 0), E++;
	}
	function M() {
		j(), r === void 0 ? (N(), A()) : d(i) && m.current !== null && b.current !== null && (N(), k = r(m.current, b.current, A));
	}
	function N() {
		return [
			d(a),
			d(s),
			d(c)
		];
	}
	function P() {
		!d(i) && b.current === null && u(w, !1);
	}
	function ee() {
		return [
			d(a),
			d(s),
			d(c),
			d(l),
			d(f),
			d(i)
		];
	}
	return p(() => {
		r === void 0 && d(i) && (N(), A());
	}), p(M), p(() => {
		r !== void 0 && (ee(), d(i) && d(w) ? T ? A() : T = !0 : T = !1);
	}), p(P), p(() => () => {
		D = !0, j();
	}), {
		floating: b,
		reference: m,
		get strategy() {
			return d(x);
		},
		get placement() {
			return d(S);
		},
		get middlewareData() {
			return d(C);
		},
		get isPositioned() {
			return d(w);
		},
		get floatingStyles() {
			return d(O);
		},
		get update() {
			return A;
		}
	};
}
function Gn(e) {
	return e instanceof Element ? !e.isConnected || e instanceof HTMLElement && e.hidden ? !0 : e.getClientRects().length === 0 : !1;
}
// node_modules/bits-ui/dist/bits/utilities/floating-layer/use-floating-layer.svelte.js
var Kn = {
	top: "bottom",
	right: "left",
	bottom: "top",
	left: "right"
}, qn = new Ce("Floating.Content"), Jn = class t {
	static create(e, n = !1) {
		return n ? qn.set(new t(e, Xe.get())) : qn.set(new t(e, Ye.get()));
	}
	opts;
	root;
	contentRef = V(null);
	wrapperRef = V(null);
	arrowRef = V(null);
	contentAttachment = me(this.contentRef);
	wrapperAttachment = me(this.wrapperRef);
	arrowAttachment = me(this.arrowRef);
	arrowId = V(Ae());
	#e = _(() => {
		if (typeof this.opts.style == "string") return pe(this.opts.style);
		if (!this.opts.style) return {};
	});
	#t = void 0;
	#n = new de(() => this.arrowRef.current ?? void 0);
	#r = _(() => this.#n?.width ?? 0);
	#i = _(() => this.#n?.height ?? 0);
	#a = _(() => this.opts.side?.current + (this.opts.align.current === "center" ? "" : `-${this.opts.align.current}`));
	#o = _(() => (Array.isArray(this.opts.collisionBoundary.current) ? this.opts.collisionBoundary.current : [this.opts.collisionBoundary.current]).filter(ge));
	#s = _(() => d(this.#o).length > 0);
	get hasExplicitBoundaries() {
		return d(this.#s);
	}
	set hasExplicitBoundaries(e) {
		u(this.#s, e);
	}
	#c = _(() => ({
		padding: this.opts.collisionPadding.current,
		boundary: d(this.#o),
		altBoundary: this.hasExplicitBoundaries
	}));
	get detectOverflowOptions() {
		return d(this.#c);
	}
	set detectOverflowOptions(e) {
		u(this.#c, e);
	}
	#l = e(void 0);
	#u = e(void 0);
	#d = e(void 0);
	#f = e(void 0);
	#p = _(() => [
		In({
			mainAxis: this.opts.sideOffset.current + d(this.#i),
			alignmentAxis: this.opts.alignOffset.current
		}),
		this.opts.avoidCollisions.current && Ln({
			mainAxis: !0,
			crossAxis: !1,
			limiter: this.opts.sticky.current === "partial" ? Hn() : void 0,
			...this.detectOverflowOptions
		}),
		this.opts.avoidCollisions.current && Rn({ ...this.detectOverflowOptions }),
		zn({
			...this.detectOverflowOptions,
			apply: ({ rects: e, availableWidth: t, availableHeight: n }) => {
				let { width: r, height: i } = e.reference;
				u(this.#l, t, !0), u(this.#u, n, !0), u(this.#d, r, !0), u(this.#f, i, !0);
			}
		}),
		this.arrowRef.current && Vn({
			element: this.arrowRef.current,
			padding: this.opts.arrowPadding.current
		}),
		Yn({
			arrowWidth: d(this.#r),
			arrowHeight: d(this.#i)
		}),
		this.opts.hideWhenDetached.current && Bn({
			strategy: "referenceHidden",
			...this.detectOverflowOptions
		}),
		this.opts.hideWhenDetached.current && !this.hasExplicitBoundaries && {
			...Bn({
				strategy: "referenceHidden",
				boundary: "clippingAncestors"
			}),
			name: "hideClipping"
		}
	].filter(Boolean));
	get middleware() {
		return d(this.#p);
	}
	set middleware(e) {
		u(this.#p, e);
	}
	floating;
	#m = _(() => Zn(this.floating.placement));
	get placedSide() {
		return d(this.#m);
	}
	set placedSide(e) {
		u(this.#m, e);
	}
	#h = _(() => Qn(this.floating.placement));
	get placedAlign() {
		return d(this.#h);
	}
	set placedAlign(e) {
		u(this.#h, e);
	}
	#g = _(() => this.floating.middlewareData.arrow?.x ?? 0);
	get arrowX() {
		return d(this.#g);
	}
	set arrowX(e) {
		u(this.#g, e);
	}
	#_ = _(() => this.floating.middlewareData.arrow?.y ?? 0);
	get arrowY() {
		return d(this.#_);
	}
	set arrowY(e) {
		u(this.#_, e);
	}
	#v = _(() => this.floating.middlewareData.arrow?.centerOffset !== 0);
	get cannotCenterArrow() {
		return d(this.#v);
	}
	set cannotCenterArrow(e) {
		u(this.#v, e);
	}
	#y = e("auto");
	get contentZIndex() {
		return d(this.#y);
	}
	set contentZIndex(e) {
		u(this.#y, e, !0);
	}
	#b = _(() => Kn[this.placedSide]);
	get arrowBaseSide() {
		return d(this.#b);
	}
	set arrowBaseSide(e) {
		u(this.#b, e);
	}
	#x = _(() => ({
		id: this.opts.wrapperId.current,
		"data-bits-floating-content-wrapper": "",
		style: {
			...this.floating.floatingStyles,
			transform: this.floating.isPositioned ? this.floating.floatingStyles.transform : "translate(0, -200%)",
			minWidth: "max-content",
			zIndex: this.contentZIndex,
			"--bits-floating-transform-origin": `${this.floating.middlewareData.transformOrigin?.x} ${this.floating.middlewareData.transformOrigin?.y}`,
			"--bits-floating-available-width": `${d(this.#l)}px`,
			"--bits-floating-available-height": `${d(this.#u)}px`,
			"--bits-floating-anchor-width": `${d(this.#d)}px`,
			"--bits-floating-anchor-height": `${d(this.#f)}px`,
			...(this.floating.middlewareData.hide?.referenceHidden || this.floating.middlewareData.hideClipping?.referenceHidden) && {
				visibility: "hidden",
				"pointer-events": "none"
			},
			...d(this.#e)
		},
		dir: this.opts.dir.current,
		...this.wrapperAttachment
	}));
	get wrapperProps() {
		return d(this.#x);
	}
	set wrapperProps(e) {
		u(this.#x, e);
	}
	#S = _(() => ({
		"data-side": this.placedSide,
		"data-align": this.placedAlign,
		style: Re({ ...d(this.#e) }),
		...this.contentAttachment
	}));
	get props() {
		return d(this.#S);
	}
	set props(e) {
		u(this.#S, e);
	}
	#C = _(() => ({
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
		return d(this.#C);
	}
	set arrowStyle(e) {
		u(this.#C, e);
	}
	constructor(e, t) {
		this.opts = e, this.root = t, this.#t = e.updatePositionStrategy, e.customAnchor && (this.root.customAnchorNode.current = e.customAnchor.current), B(() => e.customAnchor.current, (e) => {
			this.root.customAnchorNode.current = e;
		}), this.floating = Wn({
			strategy: () => this.opts.strategy.current,
			placement: () => d(this.#a),
			middleware: () => this.middleware,
			reference: this.root.anchorNode,
			whileElementsMounted: (...e) => Fn(...e, { animationFrame: this.#t?.current === "always" }),
			open: () => this.opts.enabled.current,
			sideOffset: () => this.opts.sideOffset.current,
			alignOffset: () => this.opts.alignOffset.current
		}), p(() => {
			this.floating.isPositioned && this.opts.onPlaced?.current();
		}), B([() => this.contentRef.current, () => this.opts.enabled.current], ([e, t]) => {
			if (!e || !t) return;
			let n = le(e), r = n.requestAnimationFrame(() => {
				if (this.contentRef.current !== e || !this.opts.enabled.current) return;
				let t = n.getComputedStyle(e).zIndex;
				t !== this.contentZIndex && (this.contentZIndex = t);
			});
			return () => {
				n.cancelAnimationFrame(r);
			};
		}), p(() => {
			this.floating.floating.current = this.wrapperRef.current;
		});
	}
};
function Yn(e) {
	return {
		name: "transformOrigin",
		options: e,
		fn(t) {
			let { placement: n, rects: r, middlewareData: i } = t, a = i.arrow?.centerOffset !== 0, o = a ? 0 : e.arrowWidth, s = a ? 0 : e.arrowHeight, [c, l] = Xn(n), u = {
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
function Xn(e) {
	let [t, n = "center"] = e.split("-");
	return [t, n];
}
function Zn(e) {
	return Xn(e)[0];
}
function Qn(e) {
	return Xn(e)[1];
}
// node_modules/bits-ui/dist/bits/utilities/floating-layer/components/floating-layer-content.svelte
function $n(e, t) {
	v(t, !0);
	let r = L(t, "side", 3, "bottom"), i = L(t, "sideOffset", 3, 0), o = L(t, "align", 3, "center"), s = L(t, "alignOffset", 3, 0), l = L(t, "arrowPadding", 3, 0), u = L(t, "avoidCollisions", 3, !0), f = L(t, "collisionBoundary", 19, () => []), p = L(t, "collisionPadding", 3, 0), h = L(t, "hideWhenDetached", 3, !1), g = L(t, "onPlaced", 3, () => {}), y = L(t, "sticky", 3, "partial"), b = L(t, "updatePositionStrategy", 3, "optimized"), x = L(t, "strategy", 3, "fixed"), S = L(t, "dir", 3, "ltr"), C = L(t, "style", 19, () => ({})), w = L(t, "wrapperId", 19, Ae), E = L(t, "customAnchor", 3, null), D = L(t, "tooltip", 3, !1), O = Jn.create({
		side: H(() => r()),
		sideOffset: H(() => i()),
		align: H(() => o()),
		alignOffset: H(() => s()),
		id: H(() => t.id),
		arrowPadding: H(() => l()),
		avoidCollisions: H(() => u()),
		collisionBoundary: H(() => f()),
		collisionPadding: H(() => p()),
		hideWhenDetached: H(() => h()),
		onPlaced: H(() => g()),
		sticky: H(() => y()),
		updatePositionStrategy: H(() => b()),
		strategy: H(() => x()),
		dir: H(() => S()),
		style: H(() => C()),
		enabled: H(() => t.enabled),
		wrapperId: H(() => w()),
		customAnchor: H(() => E())
	}, m(() => D())), A = _(() => z(O.wrapperProps, { style: { pointerEvents: "auto" } }));
	var j = T(), M = a(j);
	k(M, () => t.content ?? c, () => ({
		props: O.props,
		wrapperProps: d(A)
	})), N(e, j), n();
}
// node_modules/bits-ui/dist/bits/utilities/floating-layer/components/floating-layer-content-static.svelte
function er(e, t) {
	v(t, !0), re(() => {
		t.onPlaced?.();
	});
	var r = T(), i = a(r);
	k(i, () => t.content ?? c, () => ({
		props: {},
		wrapperProps: {}
	})), N(e, r), n();
}
// node_modules/bits-ui/dist/bits/utilities/popper-layer/popper-content.svelte
var tr = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"content",
	"isStatic",
	"onPlaced"
]);
function nr(e, t) {
	let n = L(t, "isStatic", 3, !1), r = te(t, tr);
	var i = T(), o = a(i), s = (e) => {
		er(e, {
			get content() {
				return t.content;
			},
			get onPlaced() {
				return t.onPlaced;
			}
		});
	}, c = (e) => {
		$n(e, F({
			get content() {
				return t.content;
			},
			get onPlaced() {
				return t.onPlaced;
			}
		}, () => r));
	};
	D(o, (e) => {
		n() ? e(s) : e(c, -1);
	}), N(e, i);
}
// node_modules/bits-ui/dist/bits/utilities/popper-layer/popper-layer-inner.svelte
var rr = /* @__PURE__ */ new Set(/* @__PURE__ */ "$$slots.$$events.$$legacy.popper.onEscapeKeydown.escapeKeydownBehavior.preventOverflowTextSelection.id.onPointerDown.onPointerUp.side.sideOffset.align.alignOffset.arrowPadding.avoidCollisions.collisionBoundary.collisionPadding.sticky.hideWhenDetached.updatePositionStrategy.strategy.dir.preventScroll.wrapperId.style.onPlaced.onInteractOutside.onCloseAutoFocus.onOpenAutoFocus.onFocusOutside.interactOutsideBehavior.loop.trapFocus.isValidEvent.customAnchor.isStatic.enabled.forceMount.ref.tooltip.contentPointerEvents".split(".")), ir = M("<!> <!>", 1);
function ar(e, t) {
	v(t, !0);
	let i = L(t, "interactOutsideBehavior", 3, "close"), o = L(t, "trapFocus", 3, !0), s = L(t, "isValidEvent", 3, () => !1), l = L(t, "customAnchor", 3, null), u = L(t, "isStatic", 3, !1), f = L(t, "tooltip", 3, !1), p = L(t, "contentPointerEvents", 3, "auto"), m = te(t, rr), h = _(() => t.preventScroll ?? !0), g = _(() => t.strategy ?? (d(h) ? "fixed" : "absolute"));
	nr(e, {
		get isStatic() {
			return u();
		},
		get id() {
			return t.id;
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
			return d(g);
		},
		get dir() {
			return t.dir;
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
			return l();
		},
		get enabled() {
			return t.enabled;
		},
		get tooltip() {
			return f();
		},
		content: (e, n) => {
			let l = () => (n?.()).props, u = () => (n?.()).wrapperProps;
			var f = ir(), g = a(f), v = (e) => {
				je(e, { get preventScroll() {
					return d(h);
				} });
			}, y = (e) => {
				je(e, { get preventScroll() {
					return d(h);
				} });
			};
			D(g, (e) => {
				t.forceMount && t.enabled ? e(v) : t.forceMount || e(y, 1);
			});
			var b = r(g, 2);
			We(b, {
				get onOpenAutoFocus() {
					return t.onOpenAutoFocus;
				},
				get onCloseAutoFocus() {
					return t.onCloseAutoFocus;
				},
				get loop() {
					return t.loop;
				},
				get enabled() {
					return t.enabled;
				},
				get trapFocus() {
					return o();
				},
				get forceMount() {
					return t.forceMount;
				},
				get ref() {
					return t.ref;
				},
				focusScope: (e, n) => {
					let r = () => (n?.()).props;
					Ke(e, {
						get onEscapeKeydown() {
							return t.onEscapeKeydown;
						},
						get escapeKeydownBehavior() {
							return t.escapeKeydownBehavior;
						},
						get enabled() {
							return t.enabled;
						},
						get ref() {
							return t.ref;
						},
						children: (e, n) => {
							De(e, {
								get id() {
									return t.id;
								},
								get onInteractOutside() {
									return t.onInteractOutside;
								},
								get onFocusOutside() {
									return t.onFocusOutside;
								},
								get interactOutsideBehavior() {
									return i();
								},
								get isValidEvent() {
									return s();
								},
								get enabled() {
									return t.enabled;
								},
								get ref() {
									return t.ref;
								},
								children: (e, n) => {
									let i = () => (n?.()).props;
									Te(e, {
										get id() {
											return t.id;
										},
										get preventOverflowTextSelection() {
											return t.preventOverflowTextSelection;
										},
										get onPointerDown() {
											return t.onPointerDown;
										},
										get onPointerUp() {
											return t.onPointerUp;
										},
										get enabled() {
											return t.enabled;
										},
										get ref() {
											return t.ref;
										},
										children: (e, n) => {
											var o = T(), s = a(o);
											{
												let e = _(() => ({
													props: z(m, l(), i(), r(), {
														id: t.id,
														style: { pointerEvents: p() }
													}),
													wrapperProps: u()
												}));
												k(s, () => t.popper ?? c, () => d(e));
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
	}), n();
}
// node_modules/bits-ui/dist/bits/utilities/popper-layer/popper-layer.svelte
var or = /* @__PURE__ */ new Set(/* @__PURE__ */ "$$slots.$$events.$$legacy.popper.open.onEscapeKeydown.escapeKeydownBehavior.preventOverflowTextSelection.id.onPointerDown.onPointerUp.side.sideOffset.align.alignOffset.arrowPadding.avoidCollisions.collisionBoundary.collisionPadding.sticky.hideWhenDetached.updatePositionStrategy.strategy.dir.preventScroll.wrapperId.style.onPlaced.onInteractOutside.onCloseAutoFocus.onOpenAutoFocus.onFocusOutside.interactOutsideBehavior.loop.trapFocus.isValidEvent.customAnchor.isStatic.ref.shouldRender".split("."));
function sr(e, t) {
	let n = L(t, "interactOutsideBehavior", 3, "close"), r = L(t, "trapFocus", 3, !0), i = L(t, "isValidEvent", 3, () => !1), o = L(t, "customAnchor", 3, null), s = L(t, "isStatic", 3, !1), c = te(t, or);
	var l = T(), u = a(l), d = (e) => {
		ar(e, F({
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
				return o();
			},
			get isStatic() {
				return s();
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
		}, () => c));
	};
	D(u, (e) => {
		t.shouldRender && e(d);
	}), N(e, l);
}
// node_modules/bits-ui/dist/bits/utilities/popper-layer/popper-layer-force-mount.svelte
var cr = /* @__PURE__ */ new Set(/* @__PURE__ */ "$$slots.$$events.$$legacy.popper.onEscapeKeydown.escapeKeydownBehavior.preventOverflowTextSelection.id.onPointerDown.onPointerUp.side.sideOffset.align.alignOffset.arrowPadding.avoidCollisions.collisionBoundary.collisionPadding.sticky.hideWhenDetached.updatePositionStrategy.strategy.dir.preventScroll.wrapperId.style.onPlaced.onInteractOutside.onCloseAutoFocus.onOpenAutoFocus.onFocusOutside.interactOutsideBehavior.loop.trapFocus.isValidEvent.customAnchor.isStatic.enabled".split("."));
function lr(e, t) {
	let n = L(t, "interactOutsideBehavior", 3, "close"), r = L(t, "trapFocus", 3, !0), i = L(t, "isValidEvent", 3, () => !1), a = L(t, "customAnchor", 3, null), o = L(t, "isStatic", 3, !1), s = te(t, cr);
	ar(e, F({
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
function ur(e, t) {
	let [n, r] = e, i = !1, a = t.length;
	for (let e = 0, o = a - 1; e < a; o = e++) {
		let [a, s] = t[e] ?? [0, 0], [c, l] = t[o] ?? [0, 0];
		s >= r != l >= r && n <= (c - a) * (r - s) / (l - s) + a && (i = !i);
	}
	return i;
}
function dr(e, t) {
	return e[0] >= t.left && e[0] <= t.right && e[1] >= t.top && e[1] <= t.bottom;
}
function fr(e, t) {
	let n = e.left + e.width / 2, r = e.top + e.height / 2, i = t.left + t.width / 2, a = t.top + t.height / 2, o = i - n, s = a - r;
	return Math.abs(o) > Math.abs(s) ? o > 0 ? "right" : "left" : s > 0 ? "bottom" : "top";
}
var pr = class {
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
		this.#n = typeof t == "number" && t > 0 ? t : null, B([
			e.triggerNode,
			e.contentNode,
			e.enabled
		], ([e, t, n]) => {
			if (!e || !t || !n) {
				this.#o = null, this.#m();
				return;
			}
			this.#o && this.#o !== e && this.#m(), this.#o = e;
			let r = qe(e);
			return [
				P(r, "pointermove", (n) => {
					this.#p([n.clientX, n.clientY], e, t);
				}),
				P(e, "pointerleave", (e) => {
					let n = e.relatedTarget;
					if (Ne(n) && t.contains(n)) return;
					let r = this.#e.ignoredTargets?.() ?? [];
					Ne(n) && r.some((e) => e === n || e.contains(n)) || (this.#a = Ne(n) && r.length > 0 ? r.filter((e) => n.contains(e)) : [], this.#r = [e.clientX, e.clientY], this.#i = "content", this.#u());
				}),
				P(e, "pointerenter", () => {
					this.#m();
				}),
				P(t, "pointerenter", () => {
					this.#m();
				}),
				P(t, "pointerleave", (t) => {
					let n = t.relatedTarget;
					Ne(n) && e.contains(n) || (this.#r = [t.clientX, t.clientY], this.#i = "trigger", this.#u());
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
		if (this.#i === "content" && dr(e, i) || this.#i === "trigger" && dr(e, r)) {
			this.#m();
			return;
		}
		if (this.#i === "content" && this.#a.length > 0) for (let t of this.#a) {
			let n = t.getBoundingClientRect();
			if (dr(e, n)) return;
			let i = fr(r, n), a = this.#h(r, n, i);
			if (a && ur(e, a)) return;
		}
		let a = fr(r, i), o = this.#h(r, i, a);
		if (o && ur(e, o)) return;
		let s = this.#i === "content" ? i : r;
		ur(e, this.#g(this.#r, s, a, this.#i)) || (this.#m(), this.#e.onPointerExit());
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
}, mr = class {
	#e;
	#t;
	#n = null;
	constructor(e, t) {
		this.#t = e, this.#e = t, this.stop = this.stop.bind(this), this.start = this.start.bind(this), Se(this.stop);
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
}, hr = ue({
	component: "tooltip",
	parts: ["content", "trigger"]
}), gr = new Ce("Tooltip.Provider"), _r = new Ce("Tooltip.Root"), vr = class {
	triggers = /* @__PURE__ */ new Map();
	#e = e(0);
	#t = e(null);
	get activeTriggerId() {
		return d(this.#t);
	}
	set activeTriggerId(e) {
		u(this.#t, e, !0);
	}
	#n = _(() => {
		d(this.#e);
		let e = this.activeTriggerId;
		return e === null ? null : this.triggers.get(e)?.node ?? null;
	});
	get activeTriggerNode() {
		return d(this.#n);
	}
	set activeTriggerNode(e) {
		u(this.#n, e);
	}
	#r = _(() => {
		d(this.#e);
		let e = this.activeTriggerId;
		return e === null ? null : this.triggers.get(e)?.payload ?? null;
	});
	get activePayload() {
		return d(this.#r);
	}
	set activePayload(e) {
		u(this.#r, e);
	}
	register = (e) => {
		this.triggers.set(e.id, e), e.id === this.activeTriggerId && f(this.#e);
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
}, yr = class t {
	static create(e) {
		return gr.set(new t(e));
	}
	opts;
	#e = e(!0);
	get isOpenDelayed() {
		return d(this.#e);
	}
	set isOpenDelayed(e) {
		u(this.#e, e, !0);
	}
	isPointerInTransit = V(!1);
	#t;
	#n = e(null);
	#r = !1;
	constructor(e) {
		this.opts = e, this.#t = new mr(() => {
			this.isOpenDelayed = !0;
		}, this.opts.skipDelayDuration.current), Je(() => P(window, "scroll", (e) => {
			let t = d(this.#n);
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
		d(this.#n) && d(this.#n) !== e && d(this.#n).handleClose(), this.#a(), this.isOpenDelayed = !1, u(this.#n, e, !0);
	};
	onClose = (e) => {
		d(this.#n) === e && (u(this.#n, null), this.#i());
	};
	isTooltipOpen = (e) => d(this.#n) === e;
}, br = class t {
	static create(e) {
		return _r.set(new t(e, gr.get()));
	}
	opts;
	provider;
	#e = _(() => this.opts.delayDuration.current ?? this.provider.opts.delayDuration.current);
	get delayDuration() {
		return d(this.#e);
	}
	set delayDuration(e) {
		u(this.#e, e);
	}
	#t = _(() => this.opts.disableHoverableContent.current ?? this.provider.opts.disableHoverableContent.current);
	get disableHoverableContent() {
		return d(this.#t);
	}
	set disableHoverableContent(e) {
		u(this.#t, e);
	}
	#n = _(() => this.opts.disableCloseOnTriggerClick.current ?? this.provider.opts.disableCloseOnTriggerClick.current);
	get disableCloseOnTriggerClick() {
		return d(this.#n);
	}
	set disableCloseOnTriggerClick(e) {
		u(this.#n, e);
	}
	#r = _(() => this.opts.disabled.current ?? this.provider.opts.disabled.current);
	get disabled() {
		return d(this.#r);
	}
	set disabled(e) {
		u(this.#r, e);
	}
	#i = _(() => this.opts.ignoreNonKeyboardFocus.current ?? this.provider.opts.ignoreNonKeyboardFocus.current);
	get ignoreNonKeyboardFocus() {
		return d(this.#i);
	}
	set ignoreNonKeyboardFocus(e) {
		u(this.#i, e);
	}
	registry;
	tether;
	#a = e(null);
	get contentNode() {
		return d(this.#a);
	}
	set contentNode(e) {
		u(this.#a, e, !0);
	}
	contentPresence;
	#o = e(!1);
	#s = e(!1);
	get openedViaFocus() {
		return d(this.#s);
	}
	set openedViaFocus(e) {
		u(this.#s, e, !0);
	}
	#c;
	#l = _(() => this.opts.open.current ? d(this.#o) ? "delayed-open" : "instant-open" : "closed");
	get stateAttr() {
		return d(this.#l);
	}
	set stateAttr(e) {
		u(this.#l, e);
	}
	constructor(e, t) {
		this.opts = e, this.provider = t, this.tether = e.tether.current?.state ?? null, this.registry = this.tether?.registry ?? new vr(), this.#c = new mr(() => {
			u(this.#o, !0), this.opts.open.current = !0;
		}, this.delayDuration ?? 0), this.tether && (this.tether.root = this, Je(() => () => {
			this.tether?.root === this && (this.tether.root = null);
		})), this.contentPresence = new ce({
			open: this.opts.open,
			ref: H(() => this.contentNode),
			onComplete: () => {
				this.opts.onOpenChangeComplete.current(this.opts.open.current);
			}
		}), B(() => this.delayDuration, () => {
			this.delayDuration !== void 0 && (this.#c = new mr(() => {
				u(this.#o, !0), this.opts.open.current = !0;
			}, this.delayDuration));
		}), B(() => this.opts.open.current, (e) => {
			e ? (this.ensureActiveTrigger(), this.provider.onOpen(this)) : (this.openedViaFocus = !1, this.provider.onClose(this));
		}, { lazy: !0 }), B(() => this.opts.triggerId.current, (e) => {
			e !== this.registry.activeTriggerId && this.registry.setActiveTrigger(e);
		}), B(() => this.registry.activeTriggerId, (e) => {
			this.opts.triggerId.current !== e && (this.opts.triggerId.current = e);
		});
	}
	handleOpen = () => {
		this.#c.stop(), u(this.#o, !1), this.ensureActiveTrigger(), this.opts.open.current = !0;
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
		e || t === 0 ? (u(this.#o, !1), this.opts.open.current = !0) : this.#c.start();
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
}, xr = class t {
	static create(e) {
		return e.tether.current ? new t(e, null, e.tether.current.state) : new t(e, _r.get(), null);
	}
	opts;
	root;
	tether;
	attachment;
	#e = V(!1);
	#t = null;
	#n = e(!1);
	domContext;
	#r = null;
	#i = !1;
	#a = null;
	constructor(e, t, n) {
		this.opts = e, this.root = t, this.tether = n, this.domContext = new be(e.ref), this.attachment = me(this.opts.ref, (e) => e ? this.#c(e) : this.#l()), B(() => this.opts.id.current, () => {
			this.#c(this.opts.ref.current);
		}), B(() => this.opts.payload.current, () => {
			this.#c(this.opts.ref.current);
		}), B(() => this.opts.disabled.current, () => {
			this.#c(this.opts.ref.current);
		}), Je(() => (this.#i = !0, this.#c(this.opts.ref.current), () => {
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
			t.provider.isPointerInTransit.current && (t.provider.isPointerInTransit.current = !1, t.onTriggerEnter(this.opts.id.current), u(this.#n, !0));
		}, 250)) : (t.onTriggerEnter(this.opts.id.current), u(this.#n, !0))));
	};
	#h = (e) => {
		let t = this.#o();
		t && (this.#s() ? t.opts.open.current && t.handleClose() : e.pointerType !== "touch" && (d(this.#n) || (this.#d(), t.provider.isPointerInTransit.current = !1, t.onTriggerEnter(this.opts.id.current), u(this.#n, !0))));
	};
	#g = (e) => {
		let t = this.#o();
		if (!t || this.#s()) return;
		if (this.#d(), !t.isActiveTrigger(this.opts.id.current)) {
			u(this.#n, !1);
			return;
		}
		let n = e.relatedTarget;
		if (Ne(n)) {
			for (let e of t.registry.triggers.values()) if (e.node === n) {
				if (t.provider.opts.skipDelayDuration.current > 0) {
					u(this.#n, !1);
					return;
				}
				t.handleClose(), u(this.#n, !1);
				return;
			}
		}
		t.onTriggerLeave(), u(this.#n, !1);
	};
	#_ = (e) => {
		let t = this.#o();
		t && (this.#e.current || this.#t !== "touch" && (this.#s() ? t.opts.open.current && t.handleClose() : (!t.ignoreNonKeyboardFocus || he(e.currentTarget)) && (t.setActiveTrigger(this.opts.id.current), t.openedViaFocus = !0, t.handleOpen(), t.provider.ignoreFocusScroll())));
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
	#b = _(() => {
		let e = this.#o(), t = !!(e?.opts.open.current && e.isActiveTrigger(this.opts.id.current)), n = this.#s();
		return {
			id: this.opts.id.current,
			"aria-describedby": t ? e?.contentNode?.id : void 0,
			"data-state": t ? e?.stateAttr : "closed",
			"data-disabled": ve(n),
			"data-delay-duration": `${e?.delayDuration ?? 0}`,
			[hr.trigger]: "",
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
		return d(this.#b);
	}
	set props(e) {
		u(this.#b, e);
	}
}, Sr = class e {
	static create(t) {
		return new e(t, _r.get());
	}
	opts;
	root;
	attachment;
	constructor(e, t) {
		this.opts = e, this.root = t, this.attachment = me(this.opts.ref, (e) => this.root.contentNode = e), new pr({
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
		Ge(e, this.root.triggerNode) && this.root.disableCloseOnTriggerClick ? e.preventDefault() : (this.opts.onInteractOutside.current(e), e.defaultPrevented || this.root.handleClose());
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
	#e = _(() => ({ open: this.root.opts.open.current }));
	get snippetProps() {
		return d(this.#e);
	}
	set snippetProps(e) {
		u(this.#e, e);
	}
	#t = _(() => ({
		id: this.opts.id.current,
		"data-state": this.root.stateAttr,
		"data-disabled": ve(this.root.disabled),
		...fe(this.root.contentPresence.transitionStatus),
		style: { outline: "none" },
		[hr.content]: "",
		...this.attachment
	}));
	get props() {
		return d(this.#t);
	}
	set props(e) {
		u(this.#t, e);
	}
	popperProps = {
		onInteractOutside: this.onInteractOutside,
		onEscapeKeydown: this.onEscapeKeydown,
		onOpenAutoFocus: this.onOpenAutoFocus,
		onCloseAutoFocus: this.onCloseAutoFocus
	};
};
// node_modules/bits-ui/dist/bits/tooltip/components/tooltip.svelte
function Cr(e, t) {
	v(t, !0);
	let r = L(t, "open", 15, !1), i = L(t, "triggerId", 15, null), o = L(t, "onOpenChange", 3, Pe), s = L(t, "onOpenChangeComplete", 3, Pe), l = br.create({
		open: H(() => r(), (e) => {
			r(e), o()(e);
		}),
		triggerId: H(() => i(), (e) => {
			i(e);
		}),
		delayDuration: H(() => t.delayDuration),
		disableCloseOnTriggerClick: H(() => t.disableCloseOnTriggerClick),
		disableHoverableContent: H(() => t.disableHoverableContent),
		ignoreNonKeyboardFocus: H(() => t.ignoreNonKeyboardFocus),
		disabled: H(() => t.disabled),
		onOpenChangeComplete: H(() => s()),
		tether: H(() => t.tether)
	});
	Qe(e, {
		tooltip: !0,
		children: (e, n) => {
			var r = T(), i = a(r);
			k(i, () => t.children ?? c, () => ({
				open: l.opts.open.current,
				triggerId: l.activeTriggerId,
				payload: l.activePayload
			})), N(e, r);
		},
		$$slots: { default: !0 }
	}), n();
}
// node_modules/bits-ui/dist/bits/tooltip/components/tooltip-content.svelte
var wr = /* @__PURE__ */ new Set([
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
]), Tr = M("<div><div><!></div></div>");
function Er(e, t) {
	let r = w();
	v(t, !0);
	let i = L(t, "id", 19, () => _e(r)), s = L(t, "ref", 15, null), l = L(t, "side", 3, "top"), u = L(t, "sideOffset", 3, 0), f = L(t, "align", 3, "center"), p = L(t, "avoidCollisions", 3, !0), m = L(t, "arrowPadding", 3, 0), h = L(t, "sticky", 3, "partial"), y = L(t, "hideWhenDetached", 3, !1), b = L(t, "collisionPadding", 3, 0), x = L(t, "onInteractOutside", 3, Pe), S = L(t, "onEscapeKeydown", 3, Pe), C = L(t, "forceMount", 3, !1), E = te(t, wr), O = Sr.create({
		id: H(() => i()),
		ref: H(() => s(), (e) => s(e)),
		onInteractOutside: H(() => x()),
		onEscapeKeydown: H(() => S())
	}), A = _(() => ({
		side: l(),
		sideOffset: u(),
		align: f(),
		avoidCollisions: p(),
		arrowPadding: m(),
		sticky: h(),
		hideWhenDetached: y(),
		collisionPadding: b(),
		strategy: t.strategy,
		customAnchor: t.customAnchor ?? O.root.triggerNode
	})), j = _(() => z(E, d(A), O.props));
	var M = T(), P = a(M), ee = (e) => {
		{
			let n = (e, n) => {
				let r = () => (n?.()).props, i = () => (n?.()).wrapperProps, s = _(() => z(i(), { style: { pointerEvents: O.root.disableHoverableContent ? "none" : void 0 } })), l = _(() => z(r(), { style: nt("tooltip") }, { style: t.style }));
				var u = T(), f = a(u), p = (e) => {
					var n = T(), r = a(n);
					{
						let e = _(() => ({
							props: d(l),
							wrapperProps: d(s),
							...O.snippetProps
						}));
						k(r, () => t.child, () => d(e));
					}
					N(e, n);
				}, m = (e) => {
					var n = Tr();
					oe(n, () => ({ ...d(s) }));
					var r = o(n);
					oe(r, () => ({ ...d(l) }));
					var i = o(r);
					k(i, () => t.children ?? c), g(r), g(n), N(e, n);
				};
				D(f, (e) => {
					t.child ? e(p) : e(m, -1);
				}), N(e, u);
			}, r = _(() => O.root.disableHoverableContent ? "none" : "auto");
			lr(e, F(() => d(j), () => O.popperProps, {
				get enabled() {
					return O.root.opts.open.current;
				},
				get id() {
					return i();
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
					return d(r);
				},
				popper: n,
				$$slots: { popper: !0 }
			}));
		}
	}, ne = (e) => {
		{
			let n = (e, n) => {
				let r = () => (n?.()).props, i = () => (n?.()).wrapperProps, s = _(() => z(i(), { style: { pointerEvents: O.root.disableHoverableContent ? "none" : void 0 } })), l = _(() => z(r(), { style: nt("tooltip") }, { style: t.style }));
				var u = T(), f = a(u), p = (e) => {
					var n = T(), r = a(n);
					{
						let e = _(() => ({
							props: d(l),
							wrapperProps: d(s),
							...O.snippetProps
						}));
						k(r, () => t.child, () => d(e));
					}
					N(e, n);
				}, m = (e) => {
					var n = Tr();
					oe(n, () => ({ ...d(s) }));
					var r = o(n);
					oe(r, () => ({ ...d(l) }));
					var i = o(r);
					k(i, () => t.children ?? c), g(r), g(n), N(e, n);
				};
				D(f, (e) => {
					t.child ? e(p) : e(m, -1);
				}), N(e, u);
			}, r = _(() => O.root.disableHoverableContent ? "none" : "auto");
			sr(e, F(() => d(j), () => O.popperProps, {
				get open() {
					return O.root.opts.open.current;
				},
				get id() {
					return i();
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
					return d(r);
				},
				popper: n,
				$$slots: { popper: !0 }
			}));
		}
	};
	D(P, (e) => {
		C() ? e(ee) : C() || e(ne, 1);
	}), N(e, M), n();
}
// node_modules/bits-ui/dist/bits/tooltip/components/tooltip-trigger.svelte
var Dr = /* @__PURE__ */ new Set([
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
]), Or = M("<button><!></button>");
function kr(e, t) {
	let r = w();
	v(t, !0);
	let i = L(t, "id", 19, () => _e(r)), s = L(t, "disabled", 3, !1), l = L(t, "type", 3, "button"), u = L(t, "tabindex", 3, 0), f = L(t, "ref", 15, null), p = te(t, Dr), m = xr.create({
		id: H(() => i()),
		disabled: H(() => s() ?? !1),
		tabindex: H(() => u() ?? 0),
		payload: H(() => t.payload),
		tether: H(() => t.tether),
		ref: H(() => f(), (e) => f(e))
	}), h = _(() => z(p, m.props, { type: l() }));
	var y = T(), b = a(y), x = (e) => {
		var n = T(), r = a(n);
		k(r, () => t.child, () => ({ props: d(h) })), N(e, n);
	}, S = (e) => {
		var n = Or();
		oe(n, () => ({ ...d(h) }));
		var r = o(n);
		k(r, () => t.children ?? c), g(n), N(e, n);
	};
	D(b, (e) => {
		t.child ? e(x) : e(S, -1);
	}), N(e, y), n();
}
// node_modules/bits-ui/dist/bits/tooltip/components/tooltip-provider.svelte
function Ar(e, t) {
	v(t, !0);
	let r = L(t, "delayDuration", 3, 700), i = L(t, "disableCloseOnTriggerClick", 3, !1), o = L(t, "disableHoverableContent", 3, !1), s = L(t, "disabled", 3, !1), l = L(t, "ignoreNonKeyboardFocus", 3, !1), u = L(t, "skipDelayDuration", 3, 300);
	yr.create({
		delayDuration: H(() => r()),
		disableCloseOnTriggerClick: H(() => i()),
		disableHoverableContent: H(() => o()),
		disabled: H(() => s()),
		ignoreNonKeyboardFocus: H(() => l()),
		skipDelayDuration: H(() => u())
	});
	var d = T(), f = a(d);
	k(f, () => t.children ?? c), N(e, d), n();
}
// svelte/lib/ui/Tooltip.svelte
var jr = M("<!> <!>", 1);
function Mr(e, t) {
	v(t, !0);
	var o = T(), c = a(o);
	O(c, () => Ar, (e, n) => {
		n(e, {
			delayDuration: 250,
			children: (e, n) => {
				var o = T(), c = a(o);
				O(c, () => Cr, (e, n) => {
					n(e, {
						children: (e, n) => {
							var o = jr(), c = a(o);
							{
								let e = _(() => ee({
									variant: "ghost",
									size: "icon"
								}));
								O(c, () => kr, (n, r) => {
									r(n, {
										type: "button",
										get "aria-label"() {
											return t.label;
										},
										get class() {
											return d(e);
										},
										children: (e, n) => {
											var r = T(), i = a(r);
											k(i, () => t.children), N(e, r);
										},
										$$slots: { default: !0 }
									});
								});
							}
							var l = r(c, 2);
							O(l, () => xe, (e, n) => {
								n(e, {
									children: (e, n) => {
										var r = T(), o = a(r);
										O(o, () => Er, (e, n) => {
											n(e, {
												"data-vb-native": !0,
												sideOffset: 6,
												class: "tw:z-50 tw:m-0 tw:box-border tw:max-w-xs tw:rounded-control tw:border tw:border-solid tw:border-border tw:bg-popover tw:px-3 tw:py-1.5 tw:font-sans tw:text-xs tw:leading-4 tw:text-popover-foreground tw:shadow-md",
												children: (e, n) => {
													i();
													var r = E();
													s(() => R(r, t.label)), N(e, r);
												},
												$$slots: { default: !0 }
											});
										}), N(e, r);
									},
									$$slots: { default: !0 }
								});
							}), N(e, o);
						},
						$$slots: { default: !0 }
					});
				}), N(e, o);
			},
			$$slots: { default: !0 }
		});
	}), N(e, o), n();
}
// svelte/lib/ui/Separator.svelte
var Nr = M("<div role=\"separator\"></div>");
function Pr(e, t) {
	v(t, !0);
	let r = L(t, "vertical", 3, !1);
	var i = Nr();
	s((e) => {
		b(i, "aria-orientation", r() ? "vertical" : "horizontal"), S(i, 1, e);
	}, [() => x(ae("tw:shrink-0 tw:bg-border", r() ? "tw:h-full tw:w-px" : "tw:h-px tw:w-full", t.class))]), N(e, i), n();
}
// svelte/lib/ui/Skeleton.svelte
var Fr = M("<div aria-hidden=\"true\"></div>");
function Ir(e, t) {
	v(t, !0);
	var r = Fr();
	s((e) => S(r, 1, e), [() => x(ae("tw:animate-pulse tw:rounded-control tw:bg-muted tw:motion-reduce:animate-none", t.class))]), N(e, r), n();
}
// svelte/lib/components/LoadingState.svelte
var Lr = M("<div role=\"status\" class=\"tw:inline-flex tw:items-center tw:gap-2 tw:font-sans tw:text-sm tw:text-muted-foreground\"><span aria-hidden=\"true\" class=\"tw:size-4 tw:animate-spin tw:rounded-full tw:border-2 tw:border-current tw:border-r-transparent tw:motion-reduce:animate-none\"></span> </div>");
function Rr(e, t) {
	var n = Lr(), i = r(o(n), 1, !0);
	g(n), s(() => R(i, t.label)), N(e, n);
}
// svelte/gallery/Gallery.svelte
var zr = M("<div class=\"tw:flex tw:flex-wrap tw:gap-2\"></div> <div class=\"tw:flex tw:flex-wrap tw:items-center tw:gap-2\"><!><!><!><!><!></div> <p class=\"tw:m-0 tw:text-xs tw:text-muted-foreground\"> </p>", 1), Br = M("<!> <!> <!> <!>", 1), Vr = M("<div class=\"tw:flex tw:items-center tw:gap-2\"><!><label for=\"gallery-checkbox\">Include archived rooms</label></div> <div class=\"tw:flex tw:items-center tw:gap-2\"><!><label for=\"gallery-switch\">Notifications</label></div> <!> <!> <output data-selection-state=\"\" class=\"tw:block tw:text-xs tw:text-muted-foreground\" aria-live=\"polite\"> </output>", 1), Hr = M("<!><!>", 1), Ur = M("<p class=\"tw:m-0 tw:text-muted-foreground\">The same dialog primitives support mobile and desktop layouts.</p> <!>", 1), Wr = M("<p class=\"tw:m-0 tw:rounded-control tw:border tw:border-border tw:p-3\"> </p>"), Gr = M("<div class=\"tw:flex tw:flex-wrap tw:gap-2\"><!> <!></div> <!>", 1), Kr = M("<div class=\"tw:flex tw:items-center tw:gap-3\"><!><!><!><span class=\"tw:text-muted-foreground\">Images and initials share one frame.</span></div> <!> <div class=\"tw:flex tw:flex-wrap tw:gap-2\"><!><!><!><!><!></div> <div class=\"tw:flex tw:items-center tw:gap-3\"><!> <div class=\"tw:flex-1 tw:space-y-2\"><!><!></div></div>", 1), qr = M("<!> <p class=\"tw:m-0 tw:text-sm tw:leading-5\">Body 400 · medium 500 · semibold 500 · bold 600. English and\n          Portuguese: Olá, colaboração, ações.</p> <p class=\"tw:m-0 tw:text-muted-foreground\">Muted text uses the Studio semantic role.</p> <pre class=\"tw:m-0 tw:overflow-auto tw:rounded-control tw:border tw:border-border tw:bg-muted tw:p-3 tw:font-mono tw:text-sm tw:leading-6\"><code>const room = \"fully typed\";</code></pre>", 1), Jr = M("<main data-vb-native=\"\" class=\"tw:m-0 tw:box-border tw:min-h-dvh tw:bg-background tw:px-4 tw:py-8 tw:font-sans tw:text-sm tw:font-normal tw:leading-5 tw:text-foreground tw:sm:px-8\" data-gallery=\"\"><div class=\"tw:mx-auto tw:max-w-6xl tw:space-y-6\"><header class=\"tw:flex tw:flex-wrap tw:items-start tw:justify-between tw:gap-4\"><div class=\"tw:space-y-2\"><a href=\"/app?ui=svelte\" class=\"tw:text-sm tw:text-link tw:underline-offset-4 tw:hover:underline\">vibebook</a> <h1 class=\"tw:m-0 tw:font-sans tw:text-2xl tw:font-semibold tw:leading-8 tw:tracking-tight\">Component gallery</h1> <p class=\"tw:m-0 tw:text-muted-foreground\">Shared primitives, Studio tokens, and one Tailwind entry.</p></div> <div class=\"tw:flex tw:items-center tw:gap-2\"><!><!></div></header> <div class=\"tw:grid tw:grid-cols-1 tw:gap-5 tw:md:grid-cols-2\"><!> <!> <!> <!> <!> <!> <!> <!></div> <p role=\"status\" class=\"tw:min-h-5 tw:text-sm tw:text-muted-foreground\"> </p></div></main>");
function Yr(t, f) {
	v(f, !0);
	let m = e("light"), h = e(""), y = e(""), b = e(!1), x = e(!1), S = e("room"), w = e("general"), T = e("all"), D = e(0), O = e("");
	p(() => {
		document.documentElement.dataset.theme = d(m);
	});
	let k = [
		"primary",
		"secondary",
		"outline",
		"ghost",
		"destructive",
		"link"
	];
	var j = Jr(), M = o(j), P = o(M), ee = r(o(P), 2), te = o(ee);
	{
		let e = _(() => d(m) === "light" ? "Use dark theme" : "Use light theme"), t = _(() => d(m) === "light" ? "moon" : "sun");
		ke(te, {
			get label() {
				return d(e);
			},
			get icon() {
				return d(t);
			},
			variant: "outline",
			onclick: () => u(m, d(m) === "light" ? "dark" : "light", !0)
		});
	}
	var re = r(te);
	we(re, {
		children: (e, t) => {
			i();
			var n = E();
			s(() => R(n, d(m))), N(e, n);
		},
		$$slots: { default: !0 }
	}), g(ee), g(P);
	var ae = r(P, 2), L = o(ae);
	I(L, {
		title: "Actions",
		description: "Variants share focus, disabled and loading behavior.",
		children: (e, t) => {
			var n = zr(), c = a(n);
			A(c, 21, () => k, C, (e, t) => {
				ne(e, {
					get variant() {
						return d(t);
					},
					onclick: () => {
						u(D, d(D) + 1), u(O, `${d(t)} activated`);
					},
					children: (e, n) => {
						i();
						var r = E();
						s(() => R(r, d(t))), N(e, r);
					},
					$$slots: { default: !0 }
				});
			}), g(c);
			var f = r(c, 2), p = o(f);
			ne(p, {
				disabled: !0,
				children: (e, t) => {
					i();
					var n = E("Disabled");
					N(e, n);
				},
				$$slots: { default: !0 }
			});
			var m = r(p);
			ne(m, {
				loading: !0,
				children: (e, t) => {
					i();
					var n = E("Saving");
					N(e, n);
				},
				$$slots: { default: !0 }
			});
			var h = r(m);
			ne(h, {
				size: "sm",
				variant: "outline",
				children: (e, t) => {
					i();
					var n = E("Small");
					N(e, n);
				},
				$$slots: { default: !0 }
			});
			var _ = r(h);
			ke(_, {
				label: "Add item",
				icon: "plus",
				onclick: () => u(D, d(D) + 1)
			}), Mr(r(_), {
				label: "Search rooms",
				children: (e, t) => {
					He(e, { name: "search" });
				},
				$$slots: { default: !0 }
			}), g(f);
			var v = r(f, 2), y = l(v);
			s(() => R(y, `Actions: ${d(D) ?? ""}`)), N(e, n);
		},
		$$slots: { default: !0 }
	});
	var oe = r(L, 2);
	I(oe, {
		title: "Fields",
		description: "Labels, hints and errors have explicit associations.",
		children: (e, t) => {
			var n = Br(), i = a(n);
			Fe(i, {
				id: "gallery-title",
				label: "Room name",
				hint: "Choose a name your team recognizes.",
				children: (e, t = c) => {
					ie(e, F(t, {
						placeholder: "Project room",
						get value() {
							return d(h);
						},
						set value(e) {
							u(h, e, !0);
						}
					}));
				},
				$$slots: { default: !0 }
			});
			var o = r(i, 2);
			Fe(o, {
				id: "gallery-email",
				label: "Email",
				error: "Enter a valid email address.",
				children: (e, t = c) => {
					ie(e, F(t, {
						type: "email",
						value: "invalid"
					}));
				},
				$$slots: { default: !0 }
			});
			var s = r(o, 2);
			Fe(s, {
				id: "gallery-notes",
				label: "Notes",
				children: (e, t = c) => {
					Be(e, F(t, {
						placeholder: "Write a note",
						get value() {
							return d(y);
						},
						set value(e) {
							u(y, e, !0);
						}
					}));
				},
				$$slots: { default: !0 }
			});
			var l = r(s, 2);
			Fe(l, {
				id: "gallery-disabled",
				label: "Unavailable",
				children: (e, t = c) => {
					ie(e, F(t, {
						disabled: !0,
						value: "Disabled input"
					}));
				},
				$$slots: { default: !0 }
			}), N(e, n);
		},
		$$slots: { default: !0 }
	});
	var ce = r(oe, 2);
	I(ce, {
		title: "Selection",
		description: "Keyboard controls use native semantics or Bits UI behavior.",
		children: (e, t) => {
			var n = Vr(), f = a(n), p = o(f);
			ye(p, {
				id: "gallery-checkbox",
				get checked() {
					return d(b);
				},
				set checked(e) {
					u(b, e, !0);
				}
			}), i(), g(f);
			var m = r(f, 2), h = o(m);
			Ie(h, {
				id: "gallery-switch",
				get checked() {
					return d(x);
				},
				set checked(e) {
					u(x, e, !0);
				}
			}), i(), g(m);
			var _ = r(m, 2);
			Ve(_, {
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
					return d(S);
				},
				set value(e) {
					u(S, e, !0);
				}
			});
			var v = r(_, 2);
			Fe(v, {
				id: "gallery-filter",
				label: "Show",
				children: (e, t = c) => {
					se(e, F(t, {
						items: [{
							value: "all",
							label: "All rooms"
						}, {
							value: "active",
							label: "Active rooms"
						}],
						get value() {
							return d(T);
						},
						set value(e) {
							u(T, e, !0);
						}
					}));
				},
				$$slots: { default: !0 }
			});
			var y = r(v, 2), C = l(y);
			s(() => R(C, `${d(S) ?? ""} · ${d(T) ?? ""}`)), N(e, n);
		},
		$$slots: { default: !0 }
	});
	var le = r(ce, 2);
	I(le, {
		title: "Overlays",
		description: "Focus trap, Escape dismissal and focus restoration are provided by Bits UI.",
		children: (e, t) => {
			var n = Gr(), f = a(n), p = o(f);
			Ue(p, {
				title: "Edit room",
				description: "Changes apply to the current room.",
				closeLabel: "Close dialog",
				trigger: (e) => {
					i();
					var t = E("Open dialog");
					N(e, t);
				},
				children: (e) => {
					var t = Hr(), n = a(t);
					Fe(n, {
						id: "dialog-name",
						label: "Name",
						children: (e, t = c) => {
							ie(e, F(t, {
								get value() {
									return d(h);
								},
								set value(e) {
									u(h, e, !0);
								}
							}));
						},
						$$slots: { default: !0 }
					});
					var o = r(n);
					ne(o, {
						onclick: () => u(O, "Dialog action completed"),
						children: (e, t) => {
							i();
							var n = E("Save name");
							N(e, n);
						},
						$$slots: { default: !0 }
					}), N(e, t);
				},
				$$slots: {
					trigger: !0,
					default: !0
				}
			});
			var m = r(p, 2);
			Ue(m, {
				title: "Room details",
				description: "A responsive sheet shares the dialog behavior.",
				closeLabel: "Close sheet",
				sheet: !0,
				trigger: (e) => {
					i();
					var t = E("Open sheet");
					N(e, t);
				},
				children: (e) => {
					var t = Ur(), n = r(a(t), 2);
					ie(n, {
						"aria-label": "Sheet note",
						placeholder: "Add a note"
					}), N(e, t);
				},
				$$slots: {
					trigger: !0,
					default: !0
				}
			}), g(f);
			var _ = r(f, 2);
			Me(_, {
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
					return d(w);
				},
				set value(e) {
					u(w, e, !0);
				},
				children: (e, t = c) => {
					var n = Wr(), r = l(n, !0);
					s(() => R(r, t() === "general" ? "General settings" : "Room members")), N(e, n);
				},
				$$slots: { default: !0 }
			}), N(e, n);
		},
		$$slots: { default: !0 }
	});
	var ue = r(le, 2);
	I(ue, {
		title: "Identity and feedback",
		children: (e, t) => {
			var n = Kr(), s = a(n), c = o(s);
			Ee(c, { name: "Gimenes" });
			var l = r(c);
			Ee(l, { name: "Guilherme Rodrigues" });
			var u = r(l);
			Ee(u, {
				name: "Sample user",
				src: "/favicon.svg"
			}), i(), g(s);
			var d = r(s, 2);
			Pr(d, {});
			var f = r(d, 2), p = o(f);
			we(p, {
				children: (e, t) => {
					i();
					var n = E("Default");
					N(e, n);
				},
				$$slots: { default: !0 }
			});
			var m = r(p);
			we(m, {
				variant: "primary",
				children: (e, t) => {
					i();
					var n = E("Selected");
					N(e, n);
				},
				$$slots: { default: !0 }
			});
			var h = r(m);
			we(h, {
				variant: "success",
				children: (e, t) => {
					i();
					var n = E("Complete");
					N(e, n);
				},
				$$slots: { default: !0 }
			});
			var _ = r(h);
			we(_, {
				variant: "warning",
				children: (e, t) => {
					i();
					var n = E("Waiting");
					N(e, n);
				},
				$$slots: { default: !0 }
			});
			var v = r(_);
			we(v, {
				variant: "destructive",
				children: (e, t) => {
					i();
					var n = E("Failed");
					N(e, n);
				},
				$$slots: { default: !0 }
			}), g(f);
			var y = r(f, 2), b = o(y);
			Ir(b, { class: "tw:size-9 tw:rounded-full" });
			var x = r(b, 2), S = o(x);
			Ir(S, { class: "tw:h-3 tw:w-3/4" }), Ir(r(S), { class: "tw:h-3 tw:w-1/2" }), g(x), g(y), N(e, n);
		},
		$$slots: { default: !0 }
	});
	var de = r(ue, 2);
	I(de, {
		title: "Empty states",
		children: (e, t) => {
			ze(e, {
				title: "Nothing waiting for you",
				description: "New requests and tasks in review will appear here.",
				children: (e, t) => {
					ne(e, {
						variant: "outline",
						onclick: () => u(O, "Empty state action completed"),
						children: (e, t) => {
							i();
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
	var fe = r(de, 2);
	I(fe, {
		title: "Status feedback",
		children: (e, t) => {
			var n = Hr(), i = a(n);
			Rr(i, { label: "Saving changes" });
			var o = r(i);
			Oe(o, {
				title: "Could not save changes",
				description: "Your draft is still available.",
				retryLabel: "Try again",
				onretry: () => u(O, "Retry requested")
			}), N(e, n);
		},
		$$slots: { default: !0 }
	});
	var pe = r(fe, 2);
	I(pe, {
		title: "Typography",
		class: "tw:md:col-span-2",
		children: (e, t) => {
			var n = qr(), r = a(n);
			Le(r, {
				level: 3,
				class: "tw:text-xl tw:leading-7 tw:tracking-tight",
				children: (e, t) => {
					i();
					var n = E("Inter variable — headings and UI");
					N(e, n);
				},
				$$slots: { default: !0 }
			}), i(6), N(e, n);
		},
		$$slots: { default: !0 }
	}), g(ae);
	var z = r(ae, 2), me = l(z, !0);
	g(M), g(j), s(() => R(me, d(O))), N(t, j), n();
}
// svelte/gallery/main.ts
function Xr(e) {
	let t = j(Yr, { target: e });
	return () => y(t);
}
export { Xr as mountGallery };
