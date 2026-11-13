import { $ as e, $t as t, A as n, B as r, Bt as i, C as a, Ct as o, D as s, E as c, Et as l, Ft as u, G as d, H as f, I as p, It as m, J as h, Jt as g, K as _, Kt as v, L as y, Lt as b, Mt as x, Nt as S, O as C, Ot as w, Pt as T, Q as E, Qt as D, R as ee, Rt as O, St as te, T as ne, Tt as k, U as re, Ut as ie, V as ae, Vt as oe, W as se, Wt as A, X as ce, Xt as j, Y as le, Yt as ue, Z as M, Zt as N, a as de, an as P, at as fe, b as pe, bt as me, c as he, cn as F, ct as I, d as ge, en as _e, et as ve, f as ye, g as be, h as xe, i as Se, it as Ce, jt as we, k as Te, kt as Ee, l as De, ln as L, lt as Oe, m as ke, n as Ae, nn as R, nt as z, on as B, p as je, q as Me, qt as V, r as Ne, rn as Pe, rt as H, s as Fe, sn as U, st as Ie, t as Le, tn as W, tt as Re, u as ze, un as G, ut as K, vt as Be, w as Ve, xt as He, y as Ue, yt as We, z as Ge, zt as q } from "./Textarea-CA87UhdX.js";
// ../vibebook/node_modules/svelte-toolbelt/dist/utils/on-mount-effect.svelte.js
function Ke(e) {
	g(() => v(() => e()));
}
// ../vibebook/node_modules/bits-ui/dist/bits/utilities/floating-layer/floating-root.svelte.js
var qe = new E("Floating.Root"), Je = new E("Floating.Root"), Ye = class e {
	static create(t = !1) {
		return t ? Je.set(new e()) : qe.set(new e());
	}
	anchorNode = H(null);
	customAnchorNode = H(null);
	triggerNode = H(null);
	constructor() {
		g(() => {
			this.customAnchorNode.current ? typeof this.customAnchorNode.current == "string" ? this.anchorNode.current = document.querySelector(this.customAnchorNode.current) : this.anchorNode.current = this.customAnchorNode.current : this.anchorNode.current = this.triggerNode.current;
		});
	}
};
// ../vibebook/node_modules/bits-ui/dist/bits/utilities/floating-layer/components/floating-layer.svelte
function Xe(e, t) {
	U(t, !0);
	let n = I(t, "tooltip", 3, !1);
	Ye.create(v(() => n()));
	var r = m(), i = N(r);
	l(i, () => t.children ?? G), u(e, r), B();
}
// ../vibebook/node_modules/bits-ui/dist/internal/floating-svelte/floating-utils.svelte.js
function Ze(e) {
	return typeof e == "function" ? e() : e;
}
function Qe(e) {
	return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function $e(e, t) {
	let n = Qe(e);
	return Math.round(t * n) / n;
}
function et(e) {
	return {
		[`--bits-${e}-content-transform-origin`]: "var(--bits-floating-transform-origin)",
		[`--bits-${e}-content-available-width`]: "var(--bits-floating-available-width)",
		[`--bits-${e}-content-available-height`]: "var(--bits-floating-available-height)",
		[`--bits-${e}-anchor-width`]: "var(--bits-floating-anchor-width)",
		[`--bits-${e}-anchor-height`]: "var(--bits-floating-anchor-height)"
	};
}
// ../vibebook/node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs
var tt = [
	"top",
	"right",
	"bottom",
	"left"
], nt = Math.min, J = Math.max, rt = Math.round, it = Math.floor, Y = (e) => ({
	x: e,
	y: e
}), at = {
	left: "right",
	right: "left",
	bottom: "top",
	top: "bottom"
};
function ot(e, t, n) {
	return J(e, nt(t, n));
}
function st(e, t) {
	return typeof e == "function" ? e(t) : e;
}
function ct(e) {
	return e.split("-")[0];
}
function lt(e) {
	return e.split("-")[1];
}
function ut(e) {
	return e === "x" ? "y" : "x";
}
function dt(e) {
	return e === "y" ? "height" : "width";
}
function X(e) {
	let t = e[0];
	return t === "t" || t === "b" ? "y" : "x";
}
function ft(e) {
	return ut(X(e));
}
function pt(e, t, n) {
	n === void 0 && (n = !1);
	let r = lt(e), i = ft(e), a = dt(i), o = i === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
	return t.reference[a] > t.floating[a] && (o = St(o)), [o, St(o)];
}
function mt(e) {
	let t = St(e);
	return [
		ht(e),
		t,
		ht(t)
	];
}
function ht(e) {
	return e.includes("start") ? e.replace("start", "end") : e.replace("end", "start");
}
var gt = ["left", "right"], _t = ["right", "left"], vt = ["top", "bottom"], yt = ["bottom", "top"];
function bt(e, t, n) {
	switch (e) {
		case "top":
		case "bottom": return n ? t ? _t : gt : t ? gt : _t;
		case "left":
		case "right": return t ? vt : yt;
		default: return [];
	}
}
function xt(e, t, n, r) {
	let i = lt(e), a = bt(ct(e), n === "start", r);
	return i && (a = a.map((e) => e + "-" + i), t && (a = a.concat(a.map(ht)))), a;
}
function St(e) {
	let t = ct(e);
	return at[t] + e.slice(t.length);
}
function Ct(e) {
	return {
		top: e.top ?? 0,
		right: e.right ?? 0,
		bottom: e.bottom ?? 0,
		left: e.left ?? 0
	};
}
function wt(e) {
	return typeof e == "number" ? {
		top: e,
		right: e,
		bottom: e,
		left: e
	} : Ct(e);
}
function Tt(e) {
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
// ../vibebook/node_modules/@floating-ui/core/dist/floating-ui.core.mjs
function Et(e, t, n) {
	let { reference: r, floating: i } = e, a = X(t), o = ft(t), s = dt(o), c = ct(t), l = a === "y", u = r.x + r.width / 2 - i.width / 2, d = r.y + r.height / 2 - i.height / 2, f = r[s] / 2 - i[s] / 2, p;
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
	let m = lt(t);
	return m && (p[o] += f * (m === "end" ? 1 : -1) * (n && l ? -1 : 1)), p;
}
async function Dt(e, t) {
	t === void 0 && (t = {});
	let { x: n, y: r, platform: i, rects: a, elements: o, strategy: s } = e, { boundary: c = "clippingAncestors", rootBoundary: l = "viewport", elementContext: u = "floating", altBoundary: d = !1, padding: f = 0 } = st(t, e), p = wt(f), m = o[d ? u === "floating" ? "reference" : "floating" : u], h = Tt(await i.getClippingRect({
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
	}, y = Tt(i.convertOffsetParentRelativeRectToViewportRelativeRect ? await i.convertOffsetParentRelativeRectToViewportRelativeRect({
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
var Ot = 50, kt = async (e, t, n) => {
	let { placement: r = "bottom", strategy: i = "absolute", middleware: a = [], platform: o } = n, s = o.detectOverflow ? o : {
		...o,
		detectOverflow: Dt
	}, c = await (o.isRTL == null ? void 0 : o.isRTL(t)), l = await o.getElementRects({
		reference: e,
		floating: t,
		strategy: i
	}), { x: u, y: d } = Et(l, r, c), f = r, p = 0, m = {};
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
		}, x && p < Ot && (p++, typeof x == "object" && (x.placement && (f = x.placement), x.rects && (l = x.rects === !0 ? await o.getElementRects({
			reference: e,
			floating: t,
			strategy: i
		}) : x.rects), {x: u, y: d} = Et(l, f, c)), n = -1);
	}
	return {
		x: u,
		y: d,
		placement: f,
		strategy: i,
		middlewareData: m
	};
}, At = (e) => ({
	name: "arrow",
	options: e,
	async fn(t) {
		let { x: n, y: r, placement: i, rects: a, platform: o, elements: s, middlewareData: c } = t, { element: l, padding: u = 0 } = st(e, t) || {};
		if (l == null) return {};
		let d = wt(u), f = {
			x: n,
			y: r
		}, p = ft(i), m = dt(p), h = await o.getDimensions(l), g = p === "y", _ = g ? "top" : "left", v = g ? "bottom" : "right", y = g ? "clientHeight" : "clientWidth", b = a.reference[m] + a.reference[p] - f[p] - a.floating[m], x = f[p] - a.reference[p], S = await (o.getOffsetParent == null ? void 0 : o.getOffsetParent(l)), C = S ? S[y] : 0;
		C && await (o.isElement == null ? void 0 : o.isElement(S)) || (C = s.floating[y] || a.floating[m]);
		let w = b / 2 - x / 2, T = C / 2 - h[m] / 2 - 1, E = nt(d[_], T), D = nt(d[v], T), ee = C - h[m] - D, O = C / 2 - h[m] / 2 + w, te = ot(E, O, ee), ne = !c.arrow && lt(i) != null && O !== te && a.reference[m] / 2 - (O < E ? E : D) - h[m] / 2 < 0, k = ne ? O < E ? O - E : O - ee : 0;
		return {
			[p]: f[p] + k,
			data: {
				[p]: te,
				centerOffset: O - te - k,
				...ne && { alignmentOffset: k }
			},
			reset: ne
		};
	}
}), jt = function(e) {
	return e === void 0 && (e = {}), {
		name: "flip",
		options: e,
		async fn(t) {
			var n;
			let { placement: r, middlewareData: i, rects: a, initialPlacement: o, platform: s, elements: c } = t, { mainAxis: l = !0, crossAxis: u = !0, fallbackPlacements: d, fallbackStrategy: f = "bestFit", fallbackAxisSideDirection: p = "none", flipAlignment: m = !0, ...h } = st(e, t);
			if ((n = i.arrow) != null && n.alignmentOffset) return {};
			let g = ct(r), _ = X(o), v = ct(o) === o, y = await (s.isRTL == null ? void 0 : s.isRTL(c.floating)), b = d || (v || !m ? [St(o)] : mt(o)), x = p !== "none";
			!d && x && b.push(...xt(o, m, p, y));
			let S = [o, ...b], C = await s.detectOverflow(t, h), w = [], T = i.flip?.overflows || [];
			if (l && w.push(C[g]), u) {
				let e = pt(r, a, y);
				w.push(C[e[0]], C[e[1]]);
			}
			if (T = [...T, {
				placement: r,
				overflows: w
			}], !w.every((e) => e <= 0)) {
				let e = (i.flip?.index || 0) + 1, t = S[e];
				if (t && (u !== "alignment" || _ === X(t) || T.every((e) => X(e.placement) !== _ || e.overflows[0] > 0))) return {
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
								let t = X(e.placement);
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
function Mt(e, t) {
	return {
		top: e.top - t.height,
		right: e.right - t.width,
		bottom: e.bottom - t.height,
		left: e.left - t.width
	};
}
function Nt(e) {
	return tt.some((t) => e[t] >= 0);
}
var Pt = function(e) {
	return e === void 0 && (e = {}), {
		name: "hide",
		options: e,
		async fn(t) {
			let { rects: n, platform: r } = t, { strategy: i = "referenceHidden", ...a } = st(e, t);
			switch (i) {
				case "referenceHidden": {
					let e = Mt(await r.detectOverflow(t, {
						...a,
						elementContext: "reference"
					}), n.reference);
					return { data: {
						referenceHiddenOffsets: e,
						referenceHidden: Nt(e)
					} };
				}
				case "escaped": {
					let e = Mt(await r.detectOverflow(t, {
						...a,
						altBoundary: !0
					}), n.floating);
					return { data: {
						escapedOffsets: e,
						escaped: Nt(e)
					} };
				}
				default: return {};
			}
		}
	};
}, Ft = /*#__PURE__*/ new Set(["left", "top"]);
async function It(e, t) {
	let { placement: n, platform: r, elements: i } = e, a = await (r.isRTL == null ? void 0 : r.isRTL(i.floating)), o = ct(n), s = lt(n), c = X(n) === "y", l = Ft.has(o) ? -1 : 1, u = a && c ? -1 : 1, d = st(t, e), { mainAxis: f, crossAxis: p, alignmentAxis: m } = typeof d == "number" ? {
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
var Lt = function(e) {
	return e === void 0 && (e = 0), {
		name: "offset",
		options: e,
		async fn(t) {
			var n;
			let { x: r, y: i, placement: a, middlewareData: o } = t, s = await It(t, e);
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
}, Rt = function(e) {
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
			} }, ...l } = st(e, t), u = {
				x: n,
				y: r
			}, d = await a.detectOverflow(t, l), f = X(i), p = ut(f), m = u[p], h = u[f], g = (e, t) => ot(t + d[e === "y" ? "top" : "left"], t, t - d[e === "y" ? "bottom" : "right"]);
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
}, zt = function(e) {
	return e === void 0 && (e = {}), {
		options: e,
		fn(t) {
			let { x: n, y: r, placement: i, rects: a, middlewareData: o } = t, { offset: s = 0, mainAxis: c = !0, crossAxis: l = !0 } = st(e, t), u = {
				x: n,
				y: r
			}, d = X(i), f = ut(d), p = u[f], m = u[d], h = st(s, t), g = typeof h == "number" ? {
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
				let e = f === "y" ? "width" : "height", t = Ft.has(ct(i)), n = a.reference[d] - a.floating[e] + (t && o.offset?.[d] || 0) + (t ? 0 : g.crossAxis), r = a.reference[d] + a.reference[e] + (t ? 0 : o.offset?.[d] || 0) - (t ? g.crossAxis : 0);
				m < n ? m = n : m > r && (m = r);
			}
			return {
				[f]: p,
				[d]: m
			};
		}
	};
}, Bt = function(e) {
	return e === void 0 && (e = {}), {
		name: "size",
		options: e,
		async fn(t) {
			let { placement: n, rects: r, platform: i, elements: a } = t, { apply: o = () => {}, ...s } = st(e, t), c = await i.detectOverflow(t, s), l = ct(n), u = lt(n), d = X(n) === "y", { width: f, height: p } = r.floating, m, h;
			l === "top" || l === "bottom" ? (m = l, h = u === (await (i.isRTL == null ? void 0 : i.isRTL(a.floating)) ? "start" : "end") ? "left" : "right") : (h = l, m = u === "end" ? "top" : "bottom");
			let g = p - c.top - c.bottom, _ = f - c.left - c.right, v = nt(p - c[m], g), y = nt(f - c[h], _), b = t.middlewareData.shift, x = !b, S = v, C = y;
			b != null && b.enabled.x && (C = _), b != null && b.enabled.y && (S = g), x && !u && (d ? C = f - 2 * J(c.left, c.right) : S = p - 2 * J(c.top, c.bottom)), await o({
				...t,
				availableWidth: C,
				availableHeight: S
			});
			let w = await i.getDimensions(a.floating);
			return f !== w.width || p !== w.height ? { reset: { rects: !0 } } : {};
		}
	};
};
// ../vibebook/node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs
function Vt() {
	return typeof window < "u";
}
function Ht(e) {
	return Wt(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function Z(e) {
	var t;
	return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function Ut(e) {
	return ((Wt(e) ? e.ownerDocument : e.document) || window.document)?.documentElement;
}
function Wt(e) {
	return Vt() ? e instanceof Node || e instanceof Z(e).Node : !1;
}
function Q(e) {
	return Vt() ? e instanceof Element || e instanceof Z(e).Element : !1;
}
function Gt(e) {
	return Vt() ? e instanceof HTMLElement || e instanceof Z(e).HTMLElement : !1;
}
function Kt(e) {
	return !Vt() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof Z(e).ShadowRoot;
}
function qt(e) {
	let { overflow: t, overflowX: n, overflowY: r, display: i } = $(e);
	return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && i !== "inline" && i !== "contents";
}
function Jt(e) {
	return /^(table|td|th)$/.test(Ht(e));
}
function Yt(e) {
	try {
		if (e.matches(":popover-open")) return !0;
	} catch {}
	try {
		return e.matches(":modal");
	} catch {
		return !1;
	}
}
var Xt = /transform|translate|scale|rotate|perspective|filter/, Zt = /paint|layout|strict|content/, Qt = (e) => !!e && e !== "none", $t;
function en(e) {
	let t = Q(e) ? $(e) : e;
	return Qt(t.transform) || Qt(t.translate) || Qt(t.scale) || Qt(t.rotate) || Qt(t.perspective) || !nn() && (Qt(t.backdropFilter) || Qt(t.filter)) || Xt.test(t.willChange || "") || Zt.test(t.contain || "");
}
function tn(e) {
	let t = on(e);
	for (; Gt(t) && !rn(t);) {
		if (en(t)) return t;
		if (Yt(t)) return null;
		t = on(t);
	}
	return null;
}
function nn() {
	return $t ??= typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none"), $t;
}
function rn(e) {
	return /^(html|body|#document)$/.test(Ht(e));
}
function $(e) {
	return Z(e).getComputedStyle(e);
}
function an(e) {
	return Q(e) ? {
		scrollLeft: e.scrollLeft,
		scrollTop: e.scrollTop
	} : {
		scrollLeft: e.scrollX,
		scrollTop: e.scrollY
	};
}
function on(e) {
	if (Ht(e) === "html") return e;
	let t = e.assignedSlot || e.parentNode || Kt(e) && e.host || Ut(e);
	return Kt(t) ? t.host : t;
}
function sn(e) {
	let t = on(e);
	return rn(t) ? (e.ownerDocument || e).body : Gt(t) && qt(t) ? t : sn(t);
}
function cn(e, t, n) {
	t === void 0 && (t = []), n === void 0 && (n = !0);
	let r = sn(e), i = r === e.ownerDocument?.body, a = Z(r);
	if (i) {
		let e = ln(a);
		return t.concat(a, a.visualViewport || [], qt(r) ? r : [], e && n ? cn(e) : []);
	}
	return t.concat(r, cn(r, [], n));
}
function ln(e) {
	return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
// ../vibebook/node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs
function un(e) {
	let t = $(e), n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0, i = Gt(e), a = i ? e.offsetWidth : n, o = i ? e.offsetHeight : r, s = rt(n) !== a || rt(r) !== o;
	return s && (n = a, r = o), {
		width: n,
		height: r,
		$: s
	};
}
function dn(e) {
	return Q(e) ? e : e.contextElement;
}
function fn(e) {
	let t = dn(e);
	if (!Gt(t)) return Y(1);
	let n = t.getBoundingClientRect(), { width: r, height: i, $: a } = un(t), o = (a ? rt(n.width) : n.width) / r, s = (a ? rt(n.height) : n.height) / i;
	return o && Number.isFinite(o) || (o = 1), s && Number.isFinite(s) || (s = 1), {
		x: o,
		y: s
	};
}
var pn = /*#__PURE__*/ Y(0);
function mn(e) {
	let t = Z(e);
	return !nn() || !t.visualViewport ? pn : {
		x: t.visualViewport.offsetLeft,
		y: t.visualViewport.offsetTop
	};
}
function hn(e, t, n) {
	return t === void 0 && (t = !1), !!n && t && n === Z(e);
}
function gn(e, t, n, r) {
	t === void 0 && (t = !1), n === void 0 && (n = !1);
	let i = e.getBoundingClientRect(), a = dn(e), o = Y(1);
	t && (r ? Q(r) && (o = fn(r)) : o = fn(e));
	let s = hn(a, n, r) ? mn(a) : Y(0), c = (i.left + s.x) / o.x, l = (i.top + s.y) / o.y, u = i.width / o.x, d = i.height / o.y;
	if (a && r) {
		let e = Z(a), t = Q(r) ? Z(r) : r, n = e, i = ln(n);
		for (; i && t !== n;) {
			let e = fn(i), t = i.getBoundingClientRect(), r = $(i), a = t.left + (i.clientLeft + parseFloat(r.paddingLeft)) * e.x, o = t.top + (i.clientTop + parseFloat(r.paddingTop)) * e.y;
			c *= e.x, l *= e.y, u *= e.x, d *= e.y, c += a, l += o, n = Z(i), i = ln(n);
		}
	}
	return Tt({
		width: u,
		height: d,
		x: c,
		y: l
	});
}
function _n(e, t) {
	let n = an(e).scrollLeft;
	return t ? t.left + n : gn(Ut(e)).left + n;
}
function vn(e, t) {
	let n = e.getBoundingClientRect();
	return {
		x: n.left + t.scrollLeft - _n(e, n),
		y: n.top + t.scrollTop
	};
}
function yn(e) {
	let { elements: t, rect: n, offsetParent: r, strategy: i } = e, a = i === "fixed", o = Ut(r), s = t ? Yt(t.floating) : !1;
	if (r === o || s && a) return n;
	let c = {
		scrollLeft: 0,
		scrollTop: 0
	}, l = Y(1), u = Y(0), d = Gt(r);
	if ((d || !a) && ((Ht(r) !== "body" || qt(o)) && (c = an(r)), d)) {
		let e = gn(r);
		l = fn(r), u.x = e.x + r.clientLeft, u.y = e.y + r.clientTop;
	}
	let f = o && !d && !a ? vn(o, c) : Y(0);
	return {
		width: n.width * l.x,
		height: n.height * l.y,
		x: n.x * l.x - c.scrollLeft * l.x + u.x + f.x,
		y: n.y * l.y - c.scrollTop * l.y + u.y + f.y
	};
}
function bn(e) {
	return e.getClientRects ? Array.from(e.getClientRects()) : [];
}
function xn(e) {
	let t = an(e), n = e.ownerDocument.body, r = J(e.scrollWidth, e.clientWidth, n.scrollWidth, n.clientWidth), i = J(e.scrollHeight, e.clientHeight, n.scrollHeight, n.clientHeight), a = -t.scrollLeft + _n(e), o = -t.scrollTop;
	return $(n).direction === "rtl" && (a += J(e.clientWidth, n.clientWidth) - r), {
		width: r,
		height: i,
		x: a,
		y: o
	};
}
var Sn = 25;
function Cn(e, t, n) {
	n === void 0 && (n = "viewport");
	let r = n === "layoutViewport", i = Z(e), a = Ut(e), o = i.visualViewport, s = a.clientWidth, c = a.clientHeight, l = 0, u = 0;
	if (o) {
		let e = !nn() || t === "fixed";
		r ? e || (l = -o.offsetLeft, u = -o.offsetTop) : (s = o.width, c = o.height, e && (l = o.offsetLeft, u = o.offsetTop));
	}
	if (_n(a) <= 0) {
		let e = a.ownerDocument, t = e.body, n = getComputedStyle(t), r = e.compatMode === "CSS1Compat" && parseFloat(n.marginLeft) + parseFloat(n.marginRight) || 0, i = Math.abs(a.clientWidth - t.clientWidth - r), o = getComputedStyle(a).scrollbarGutter === "stable both-edges" ? i / 2 : i;
		o <= Sn && (s -= o);
	}
	return {
		width: s,
		height: c,
		x: l,
		y: u
	};
}
function wn(e, t) {
	let n = gn(e, !0, t === "fixed"), r = n.top + e.clientTop, i = n.left + e.clientLeft, a = fn(e);
	return {
		width: e.clientWidth * a.x,
		height: e.clientHeight * a.y,
		x: i * a.x,
		y: r * a.y
	};
}
function Tn(e, t, n) {
	let r;
	if (t === "viewport" || t === "layoutViewport") r = Cn(e, n, t);
	else if (t === "document") r = xn(Ut(e));
	else if (Q(t)) r = wn(t, n);
	else {
		let n = mn(e);
		r = {
			x: t.x - n.x,
			y: t.y - n.y,
			width: t.width,
			height: t.height
		};
	}
	return Tt(r);
}
function En(e, t) {
	let n = t.get(e);
	if (n) return n;
	let r = cn(e, [], !1).filter((e) => Q(e) && Ht(e) !== "body"), i = null, a = $(e).position === "fixed", o = a ? on(e) : e;
	for (; Q(o) && !rn(o);) {
		let e = $(o), t = en(o), n = i ? i.position : a ? "fixed" : "";
		!t && (n === "fixed" || n === "absolute" && e.position === "static") ? r = r.filter((e) => e !== o) : i = e, o = on(o);
	}
	return t.set(e, r), r;
}
function Dn(e) {
	let { element: t, boundary: n, rootBoundary: r, strategy: i } = e, a = [...n === "clippingAncestors" ? Yt(t) ? [] : En(t, this._c) : [].concat(n), r], o = Tn(t, a[0], i), s = o.top, c = o.right, l = o.bottom, u = o.left;
	for (let e = 1; e < a.length; e++) {
		let n = Tn(t, a[e], i);
		s = J(n.top, s), c = nt(n.right, c), l = nt(n.bottom, l), u = J(n.left, u);
	}
	return {
		width: c - u,
		height: l - s,
		x: u,
		y: s
	};
}
function On(e) {
	let { width: t, height: n } = un(e);
	return {
		width: t,
		height: n
	};
}
function kn(e, t, n) {
	let r = Gt(t), i = Ut(t), a = n === "fixed", o = gn(e, !0, a, t), s = {
		scrollLeft: 0,
		scrollTop: 0
	}, c = Y(0);
	if ((r || !a) && ((Ht(t) !== "body" || qt(i)) && (s = an(t)), r)) {
		let e = gn(t, !0, a, t);
		c.x = e.x + t.clientLeft, c.y = e.y + t.clientTop;
	}
	!r && i && (c.x = _n(i));
	let l = i && !r && !a ? vn(i, s) : Y(0);
	return {
		x: o.left + s.scrollLeft - c.x - l.x,
		y: o.top + s.scrollTop - c.y - l.y,
		width: o.width,
		height: o.height
	};
}
function An(e) {
	return $(e).position === "static";
}
function jn(e, t) {
	if (!Gt(e) || $(e).position === "fixed") return null;
	if (t) return t(e);
	let n = e.offsetParent;
	return Ut(e) === n && (n = n.ownerDocument.body), n;
}
function Mn(e, t) {
	let n = Z(e);
	if (Yt(e)) return n;
	if (!Gt(e)) {
		let t = on(e);
		for (; t && !rn(t);) {
			if (Q(t) && !An(t)) return t;
			t = on(t);
		}
		return n;
	}
	let r = jn(e, t);
	for (; r && Jt(r) && An(r);) r = jn(r, t);
	return r && rn(r) && An(r) && !en(r) ? n : r || tn(e) || n;
}
var Nn = async function(e) {
	let t = this.getOffsetParent || Mn, n = this.getDimensions, r = await n(e.floating);
	return {
		reference: kn(e.reference, await t(e.floating), e.strategy),
		floating: {
			x: 0,
			y: 0,
			width: r.width,
			height: r.height
		}
	};
};
function Pn(e) {
	return $(e).direction === "rtl";
}
var Fn = {
	convertOffsetParentRelativeRectToViewportRelativeRect: yn,
	getDocumentElement: Ut,
	getClippingRect: Dn,
	getOffsetParent: Mn,
	getElementRects: Nn,
	getClientRects: bn,
	getDimensions: On,
	getScale: fn,
	isElement: Q,
	isRTL: Pn
};
function In(e, t) {
	return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function Ln(e, t, n) {
	let r = null, i, a = Ut(e);
	function o() {
		var e;
		clearTimeout(i), (e = r) == null || e.disconnect(), r = null;
	}
	function s(n, c) {
		n === void 0 && (n = !1), c === void 0 && (c = 1), o();
		let l = e.getBoundingClientRect(), { left: u, top: d, width: f, height: p } = l;
		if (n || t(), !f || !p) return;
		let m = it(d), h = it(a.clientWidth - (u + f)), g = it(a.clientHeight - (d + p)), _ = it(u), v = {
			rootMargin: -m + "px " + -h + "px " + -g + "px " + -_ + "px",
			threshold: J(0, nt(1, c)) || 1
		}, y = !0;
		function b(t) {
			let n = t[0].intersectionRatio;
			if (!In(l, e.getBoundingClientRect())) return s();
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
	let c = Z(e), l = () => s(n);
	return c.addEventListener("resize", l), s(!0), () => {
		c.removeEventListener("resize", l), o();
	};
}
function Rn(e, t, n, r) {
	r === void 0 && (r = {});
	let { ancestorScroll: i = !0, ancestorResize: a = !0, elementResize: o = typeof ResizeObserver == "function", layoutShift: s = typeof IntersectionObserver == "function", animationFrame: c = !1 } = r, l = dn(e), u = i || a ? [...l ? cn(l) : [], ...t ? cn(t) : []] : [];
	u.forEach((e) => {
		i && e.addEventListener("scroll", n), a && e.addEventListener("resize", n);
	});
	let d = l && s ? Ln(l, n, a) : null, f = -1, p = null;
	o && (p = new ResizeObserver((e) => {
		let [r] = e;
		r && r.target === l && p && t && (p.unobserve(t), cancelAnimationFrame(f), f = requestAnimationFrame(() => {
			var e;
			(e = p) == null || e.observe(t);
		})), n();
	}), l && !c && p.observe(l), t && p.observe(t));
	let m, h = c ? gn(e) : null;
	c && g();
	function g() {
		let t = gn(e);
		h && !In(h, t) && n(), h = t, m = requestAnimationFrame(g);
	}
	return n(), () => {
		var e;
		u.forEach((e) => {
			i && e.removeEventListener("scroll", n), a && e.removeEventListener("resize", n);
		}), d?.(), (e = p) == null || e.disconnect(), p = null, c && cancelAnimationFrame(m);
	};
}
var zn = Lt, Bn = Rt, Vn = jt, Hn = Bt, Un = Pt, Wn = At, Gn = zt, Kn = (e, t, n) => {
	let r = /* @__PURE__ */ new Map(), i = n ?? {}, a = {
		...Fn,
		...i.platform,
		_c: r
	};
	return kt(e, t, {
		...i,
		platform: a
	});
};
// ../vibebook/node_modules/bits-ui/dist/internal/floating-svelte/use-floating.svelte.js
function qn(e) {
	let t = e.whileElementsMounted, n = P(() => Ze(e.open) ?? !0), r = P(() => Ze(e.middleware)), i = P(() => Ze(e.transform) ?? !0), a = P(() => Ze(e.placement) ?? "bottom"), o = P(() => Ze(e.strategy) ?? "absolute"), s = P(() => Ze(e.sideOffset) ?? 0), c = P(() => Ze(e.alignOffset) ?? 0), l = e.reference, u;
	ue(() => {
		u = {
			middleware: A(r),
			placement: A(a),
			strategy: A(o),
			open: A(n),
			sideOffset: A(s),
			alignOffset: A(c)
		};
	});
	let d = R(0), f = R(0), p = H(null), m = R(_e(A(o))), h = R(_e(A(a))), _ = R(_e({})), v = R(!1), y = !1, b = 0, x = !1, S = P(() => {
		let e = p.current ? $e(p.current, A(d)) : A(d), t = p.current ? $e(p.current, A(f)) : A(f);
		return A(i) ? {
			position: A(m),
			left: "0",
			top: "0",
			transform: `translate(${e}px, ${t}px)`,
			...p.current && Qe(p.current) >= 1.5 && { willChange: "transform" }
		} : {
			position: A(m),
			left: `${e}px`,
			top: `${t}px`
		};
	}), C;
	function w() {
		if (x || l.current === null || p.current === null) return;
		let e = l.current, t = p.current, n = ++b;
		Kn(e, t, {
			middleware: u.middleware,
			placement: u.placement,
			strategy: u.strategy
		}).then((r) => {
			if (n === b && l.current === e && p.current === t) {
				if (Jn(e)) W(_, {
					...A(_),
					hide: {
						...A(_).hide,
						referenceHidden: !0
					}
				}, !0);
				else {
					if (!u.open && A(d) !== 0 && A(f) !== 0) {
						let e = Math.max(Math.abs(u.sideOffset), Math.abs(u.alignOffset), 15);
						if (r.x <= e && r.y <= e) return;
					}
					W(d, r.x, !0), W(f, r.y, !0), W(m, r.strategy, !0), W(h, r.placement, !0), W(_, r.middlewareData, !0), W(v, !0);
				}
			}
		});
	}
	function T() {
		typeof C == "function" && (C(), C = void 0), b++;
	}
	function E() {
		T(), t === void 0 ? (D(), w()) : A(n) && l.current !== null && p.current !== null && (D(), C = t(l.current, p.current, w));
	}
	function D() {
		return [
			A(r),
			A(a),
			A(o)
		];
	}
	function ee() {
		!A(n) && p.current === null && W(v, !1);
	}
	function O() {
		return [
			A(r),
			A(a),
			A(o),
			A(s),
			A(c),
			A(n)
		];
	}
	return g(() => {
		t === void 0 && A(n) && (D(), w());
	}), g(E), g(() => {
		t !== void 0 && (O(), A(n) && A(v) ? y ? w() : y = !0 : y = !1);
	}), g(ee), g(() => () => {
		x = !0, T();
	}), {
		floating: p,
		reference: l,
		get strategy() {
			return A(m);
		},
		get placement() {
			return A(h);
		},
		get middlewareData() {
			return A(_);
		},
		get isPositioned() {
			return A(v);
		},
		get floatingStyles() {
			return A(S);
		},
		get update() {
			return w;
		}
	};
}
function Jn(e) {
	return e instanceof Element ? !e.isConnected || e instanceof HTMLElement && e.hidden ? !0 : e.getClientRects().length === 0 : !1;
}
// ../vibebook/node_modules/bits-ui/dist/bits/utilities/floating-layer/use-floating-layer.svelte.js
var Yn = {
	top: "bottom",
	right: "left",
	bottom: "top",
	left: "right"
}, Xn = new E("Floating.Content"), Zn = class e {
	static create(t, n = !1) {
		return n ? Xn.set(new e(t, Je.get())) : Xn.set(new e(t, qe.get()));
	}
	opts;
	root;
	contentRef = H(null);
	wrapperRef = H(null);
	arrowRef = H(null);
	contentAttachment = d(this.contentRef);
	wrapperAttachment = d(this.wrapperRef);
	arrowAttachment = d(this.arrowRef);
	arrowId = H(Ve());
	#e = P(() => {
		if (typeof this.opts.style == "string") return Re(this.opts.style);
		if (!this.opts.style) return {};
	});
	#t = void 0;
	#n = new ce(() => this.arrowRef.current ?? void 0);
	#r = P(() => this.#n?.width ?? 0);
	#i = P(() => this.#n?.height ?? 0);
	#a = P(() => this.opts.side?.current + (this.opts.align.current === "center" ? "" : `-${this.opts.align.current}`));
	#o = P(() => (Array.isArray(this.opts.collisionBoundary.current) ? this.opts.collisionBoundary.current : [this.opts.collisionBoundary.current]).filter(ae));
	#s = P(() => A(this.#o).length > 0);
	get hasExplicitBoundaries() {
		return A(this.#s);
	}
	set hasExplicitBoundaries(e) {
		W(this.#s, e);
	}
	#c = P(() => ({
		padding: this.opts.collisionPadding.current,
		boundary: A(this.#o),
		altBoundary: this.hasExplicitBoundaries
	}));
	get detectOverflowOptions() {
		return A(this.#c);
	}
	set detectOverflowOptions(e) {
		W(this.#c, e);
	}
	#l = R(void 0);
	#u = R(void 0);
	#d = R(void 0);
	#f = R(void 0);
	#p = P(() => [
		zn({
			mainAxis: this.opts.sideOffset.current + A(this.#i),
			alignmentAxis: this.opts.alignOffset.current
		}),
		this.opts.avoidCollisions.current && Bn({
			mainAxis: !0,
			crossAxis: !1,
			limiter: this.opts.sticky.current === "partial" ? Gn() : void 0,
			...this.detectOverflowOptions
		}),
		this.opts.avoidCollisions.current && Vn({ ...this.detectOverflowOptions }),
		Hn({
			...this.detectOverflowOptions,
			apply: ({ rects: e, availableWidth: t, availableHeight: n }) => {
				let { width: r, height: i } = e.reference;
				W(this.#l, t, !0), W(this.#u, n, !0), W(this.#d, r, !0), W(this.#f, i, !0);
			}
		}),
		this.arrowRef.current && Wn({
			element: this.arrowRef.current,
			padding: this.opts.arrowPadding.current
		}),
		Qn({
			arrowWidth: A(this.#r),
			arrowHeight: A(this.#i)
		}),
		this.opts.hideWhenDetached.current && Un({
			strategy: "referenceHidden",
			...this.detectOverflowOptions
		}),
		this.opts.hideWhenDetached.current && !this.hasExplicitBoundaries && {
			...Un({
				strategy: "referenceHidden",
				boundary: "clippingAncestors"
			}),
			name: "hideClipping"
		}
	].filter(Boolean));
	get middleware() {
		return A(this.#p);
	}
	set middleware(e) {
		W(this.#p, e);
	}
	floating;
	#m = P(() => er(this.floating.placement));
	get placedSide() {
		return A(this.#m);
	}
	set placedSide(e) {
		W(this.#m, e);
	}
	#h = P(() => tr(this.floating.placement));
	get placedAlign() {
		return A(this.#h);
	}
	set placedAlign(e) {
		W(this.#h, e);
	}
	#g = P(() => this.floating.middlewareData.arrow?.x ?? 0);
	get arrowX() {
		return A(this.#g);
	}
	set arrowX(e) {
		W(this.#g, e);
	}
	#_ = P(() => this.floating.middlewareData.arrow?.y ?? 0);
	get arrowY() {
		return A(this.#_);
	}
	set arrowY(e) {
		W(this.#_, e);
	}
	#v = P(() => this.floating.middlewareData.arrow?.centerOffset !== 0);
	get cannotCenterArrow() {
		return A(this.#v);
	}
	set cannotCenterArrow(e) {
		W(this.#v, e);
	}
	#y = R("auto");
	get contentZIndex() {
		return A(this.#y);
	}
	set contentZIndex(e) {
		W(this.#y, e, !0);
	}
	#b = P(() => Yn[this.placedSide]);
	get arrowBaseSide() {
		return A(this.#b);
	}
	set arrowBaseSide(e) {
		W(this.#b, e);
	}
	#x = P(() => ({
		id: this.opts.wrapperId.current,
		"data-bits-floating-content-wrapper": "",
		style: {
			...this.floating.floatingStyles,
			transform: this.floating.isPositioned ? this.floating.floatingStyles.transform : "translate(0, -200%)",
			minWidth: "max-content",
			zIndex: this.contentZIndex,
			"--bits-floating-transform-origin": `${this.floating.middlewareData.transformOrigin?.x} ${this.floating.middlewareData.transformOrigin?.y}`,
			"--bits-floating-available-width": `${A(this.#l)}px`,
			"--bits-floating-available-height": `${A(this.#u)}px`,
			"--bits-floating-anchor-width": `${A(this.#d)}px`,
			"--bits-floating-anchor-height": `${A(this.#f)}px`,
			...(this.floating.middlewareData.hide?.referenceHidden || this.floating.middlewareData.hideClipping?.referenceHidden) && {
				visibility: "hidden",
				"pointer-events": "none"
			},
			...A(this.#e)
		},
		dir: this.opts.dir.current,
		...this.wrapperAttachment
	}));
	get wrapperProps() {
		return A(this.#x);
	}
	set wrapperProps(e) {
		W(this.#x, e);
	}
	#S = P(() => ({
		"data-side": this.placedSide,
		"data-align": this.placedAlign,
		style: ve({ ...A(this.#e) }),
		...this.contentAttachment
	}));
	get props() {
		return A(this.#S);
	}
	set props(e) {
		W(this.#S, e);
	}
	#C = P(() => ({
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
		return A(this.#C);
	}
	set arrowStyle(e) {
		W(this.#C, e);
	}
	constructor(e, t) {
		this.opts = e, this.root = t, this.#t = e.updatePositionStrategy, e.customAnchor && (this.root.customAnchorNode.current = e.customAnchor.current), M(() => e.customAnchor.current, (e) => {
			this.root.customAnchorNode.current = e;
		}), this.floating = qn({
			strategy: () => this.opts.strategy.current,
			placement: () => A(this.#a),
			middleware: () => this.middleware,
			reference: this.root.anchorNode,
			whileElementsMounted: (...e) => Rn(...e, { animationFrame: this.#t?.current === "always" }),
			open: () => this.opts.enabled.current,
			sideOffset: () => this.opts.sideOffset.current,
			alignOffset: () => this.opts.alignOffset.current
		}), g(() => {
			this.floating.isPositioned && this.opts.onPlaced?.current();
		}), M([() => this.contentRef.current, () => this.opts.enabled.current], ([e, t]) => {
			if (!e || !t) return;
			let n = h(e), r = n.requestAnimationFrame(() => {
				if (this.contentRef.current !== e || !this.opts.enabled.current) return;
				let t = n.getComputedStyle(e).zIndex;
				t !== this.contentZIndex && (this.contentZIndex = t);
			});
			return () => {
				n.cancelAnimationFrame(r);
			};
		}), g(() => {
			this.floating.floating.current = this.wrapperRef.current;
		});
	}
};
function Qn(e) {
	return {
		name: "transformOrigin",
		options: e,
		fn(t) {
			let { placement: n, rects: r, middlewareData: i } = t, a = i.arrow?.centerOffset !== 0, o = a ? 0 : e.arrowWidth, s = a ? 0 : e.arrowHeight, [c, l] = $n(n), u = {
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
function $n(e) {
	let [t, n = "center"] = e.split("-");
	return [t, n];
}
function er(e) {
	return $n(e)[0];
}
function tr(e) {
	return $n(e)[1];
}
// ../vibebook/node_modules/bits-ui/dist/bits/utilities/floating-layer/components/floating-layer-content.svelte
function nr(t, n) {
	U(n, !0);
	let r = I(n, "side", 3, "bottom"), i = I(n, "sideOffset", 3, 0), a = I(n, "align", 3, "center"), o = I(n, "alignOffset", 3, 0), s = I(n, "arrowPadding", 3, 0), c = I(n, "avoidCollisions", 3, !0), d = I(n, "collisionBoundary", 19, () => []), f = I(n, "collisionPadding", 3, 0), p = I(n, "hideWhenDetached", 3, !1), h = I(n, "onPlaced", 3, () => {}), g = I(n, "sticky", 3, "partial"), _ = I(n, "updatePositionStrategy", 3, "optimized"), y = I(n, "strategy", 3, "fixed"), b = I(n, "dir", 3, "ltr"), x = I(n, "style", 19, () => ({})), S = I(n, "wrapperId", 19, Ve), C = I(n, "customAnchor", 3, null), w = I(n, "tooltip", 3, !1), T = Zn.create({
		side: z(() => r()),
		sideOffset: z(() => i()),
		align: z(() => a()),
		alignOffset: z(() => o()),
		id: z(() => n.id),
		arrowPadding: z(() => s()),
		avoidCollisions: z(() => c()),
		collisionBoundary: z(() => d()),
		collisionPadding: z(() => f()),
		hideWhenDetached: z(() => p()),
		onPlaced: z(() => h()),
		sticky: z(() => g()),
		updatePositionStrategy: z(() => _()),
		strategy: z(() => y()),
		dir: z(() => b()),
		style: z(() => x()),
		enabled: z(() => n.enabled),
		wrapperId: z(() => S()),
		customAnchor: z(() => C())
	}, v(() => w())), E = P(() => e(T.wrapperProps, { style: { pointerEvents: "auto" } }));
	var D = m(), ee = N(D);
	l(ee, () => n.content ?? G, () => ({
		props: T.props,
		wrapperProps: A(E)
	})), u(t, D), B();
}
// ../vibebook/node_modules/bits-ui/dist/bits/utilities/floating-layer/components/floating-layer-content-static.svelte
function rr(e, t) {
	U(t, !0), Ie(() => {
		t.onPlaced?.();
	});
	var n = m(), r = N(n);
	l(r, () => t.content ?? G, () => ({
		props: {},
		wrapperProps: {}
	})), u(e, n), B();
}
// ../vibebook/node_modules/bits-ui/dist/bits/utilities/popper-layer/popper-content.svelte
var ir = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"content",
	"isStatic",
	"onPlaced"
]);
function ar(e, t) {
	let n = I(t, "isStatic", 3, !1), r = Oe(t, ir);
	var i = m(), a = N(i), o = (e) => {
		rr(e, {
			get content() {
				return t.content;
			},
			get onPlaced() {
				return t.onPlaced;
			}
		});
	}, s = (e) => {
		nr(e, K({
			get content() {
				return t.content;
			},
			get onPlaced() {
				return t.onPlaced;
			}
		}, () => r));
	};
	we(a, (e) => {
		n() ? e(o) : e(s, -1);
	}), u(e, i);
}
// ../vibebook/node_modules/bits-ui/dist/bits/utilities/popper-layer/popper-layer-inner.svelte
var or = /* @__PURE__ */ new Set(/* @__PURE__ */ "$$slots.$$events.$$legacy.popper.onEscapeKeydown.escapeKeydownBehavior.preventOverflowTextSelection.id.onPointerDown.onPointerUp.side.sideOffset.align.alignOffset.arrowPadding.avoidCollisions.collisionBoundary.collisionPadding.sticky.hideWhenDetached.updatePositionStrategy.strategy.dir.preventScroll.wrapperId.style.onPlaced.onInteractOutside.onCloseAutoFocus.onOpenAutoFocus.onFocusOutside.interactOutsideBehavior.loop.trapFocus.isValidEvent.customAnchor.isStatic.enabled.forceMount.ref.tooltip.contentPointerEvents".split(".")), sr = b("<!> <!>", 1);
function cr(n, r) {
	U(r, !0);
	let i = I(r, "interactOutsideBehavior", 3, "close"), o = I(r, "trapFocus", 3, !0), d = I(r, "isValidEvent", 3, () => !1), f = I(r, "customAnchor", 3, null), p = I(r, "isStatic", 3, !1), h = I(r, "tooltip", 3, !1), g = I(r, "contentPointerEvents", 3, "auto"), _ = Oe(r, or), v = P(() => r.preventScroll ?? !0), y = P(() => r.strategy ?? (A(v) ? "fixed" : "absolute"));
	ar(n, {
		get isStatic() {
			return p();
		},
		get id() {
			return r.id;
		},
		get side() {
			return r.side;
		},
		get sideOffset() {
			return r.sideOffset;
		},
		get align() {
			return r.align;
		},
		get alignOffset() {
			return r.alignOffset;
		},
		get arrowPadding() {
			return r.arrowPadding;
		},
		get avoidCollisions() {
			return r.avoidCollisions;
		},
		get collisionBoundary() {
			return r.collisionBoundary;
		},
		get collisionPadding() {
			return r.collisionPadding;
		},
		get sticky() {
			return r.sticky;
		},
		get hideWhenDetached() {
			return r.hideWhenDetached;
		},
		get updatePositionStrategy() {
			return r.updatePositionStrategy;
		},
		get strategy() {
			return A(y);
		},
		get dir() {
			return r.dir;
		},
		get wrapperId() {
			return r.wrapperId;
		},
		get style() {
			return r.style;
		},
		get onPlaced() {
			return r.onPlaced;
		},
		get customAnchor() {
			return f();
		},
		get enabled() {
			return r.enabled;
		},
		get tooltip() {
			return h();
		},
		content: (n, f) => {
			let p = () => (f?.()).props, h = () => (f?.()).wrapperProps;
			var y = sr(), b = N(y), x = (e) => {
				a(e, { get preventScroll() {
					return A(v);
				} });
			}, S = (e) => {
				a(e, { get preventScroll() {
					return A(v);
				} });
			};
			we(b, (e) => {
				r.forceMount && r.enabled ? e(x) : r.forceMount || e(S, 1);
			});
			var w = t(b, 2);
			c(w, {
				get onOpenAutoFocus() {
					return r.onOpenAutoFocus;
				},
				get onCloseAutoFocus() {
					return r.onCloseAutoFocus;
				},
				get loop() {
					return r.loop;
				},
				get enabled() {
					return r.enabled;
				},
				get trapFocus() {
					return o();
				},
				get forceMount() {
					return r.forceMount;
				},
				get ref() {
					return r.ref;
				},
				focusScope: (t, n) => {
					let a = () => (n?.()).props;
					s(t, {
						get onEscapeKeydown() {
							return r.onEscapeKeydown;
						},
						get escapeKeydownBehavior() {
							return r.escapeKeydownBehavior;
						},
						get enabled() {
							return r.enabled;
						},
						get ref() {
							return r.ref;
						},
						children: (t, n) => {
							C(t, {
								get id() {
									return r.id;
								},
								get onInteractOutside() {
									return r.onInteractOutside;
								},
								get onFocusOutside() {
									return r.onFocusOutside;
								},
								get interactOutsideBehavior() {
									return i();
								},
								get isValidEvent() {
									return d();
								},
								get enabled() {
									return r.enabled;
								},
								get ref() {
									return r.ref;
								},
								children: (t, n) => {
									let i = () => (n?.()).props;
									ne(t, {
										get id() {
											return r.id;
										},
										get preventOverflowTextSelection() {
											return r.preventOverflowTextSelection;
										},
										get onPointerDown() {
											return r.onPointerDown;
										},
										get onPointerUp() {
											return r.onPointerUp;
										},
										get enabled() {
											return r.enabled;
										},
										get ref() {
											return r.ref;
										},
										children: (t, n) => {
											var o = m(), s = N(o);
											{
												let t = P(() => ({
													props: e(_, p(), i(), a(), {
														id: r.id,
														style: { pointerEvents: g() }
													}),
													wrapperProps: h()
												}));
												l(s, () => r.popper ?? G, () => A(t));
											}
											u(t, o);
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
			}), u(n, y);
		},
		$$slots: { content: !0 }
	}), B();
}
// ../vibebook/node_modules/bits-ui/dist/bits/utilities/popper-layer/popper-layer.svelte
var lr = /* @__PURE__ */ new Set(/* @__PURE__ */ "$$slots.$$events.$$legacy.popper.open.onEscapeKeydown.escapeKeydownBehavior.preventOverflowTextSelection.id.onPointerDown.onPointerUp.side.sideOffset.align.alignOffset.arrowPadding.avoidCollisions.collisionBoundary.collisionPadding.sticky.hideWhenDetached.updatePositionStrategy.strategy.dir.preventScroll.wrapperId.style.onPlaced.onInteractOutside.onCloseAutoFocus.onOpenAutoFocus.onFocusOutside.interactOutsideBehavior.loop.trapFocus.isValidEvent.customAnchor.isStatic.ref.shouldRender".split("."));
function ur(e, t) {
	let n = I(t, "interactOutsideBehavior", 3, "close"), r = I(t, "trapFocus", 3, !0), i = I(t, "isValidEvent", 3, () => !1), a = I(t, "customAnchor", 3, null), o = I(t, "isStatic", 3, !1), s = Oe(t, lr);
	var c = m(), l = N(c), d = (e) => {
		cr(e, K({
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
	we(l, (e) => {
		t.shouldRender && e(d);
	}), u(e, c);
}
// ../vibebook/node_modules/bits-ui/dist/bits/utilities/popper-layer/popper-layer-force-mount.svelte
var dr = /* @__PURE__ */ new Set(/* @__PURE__ */ "$$slots.$$events.$$legacy.popper.onEscapeKeydown.escapeKeydownBehavior.preventOverflowTextSelection.id.onPointerDown.onPointerUp.side.sideOffset.align.alignOffset.arrowPadding.avoidCollisions.collisionBoundary.collisionPadding.sticky.hideWhenDetached.updatePositionStrategy.strategy.dir.preventScroll.wrapperId.style.onPlaced.onInteractOutside.onCloseAutoFocus.onOpenAutoFocus.onFocusOutside.interactOutsideBehavior.loop.trapFocus.isValidEvent.customAnchor.isStatic.enabled".split("."));
function fr(e, t) {
	let n = I(t, "interactOutsideBehavior", 3, "close"), r = I(t, "trapFocus", 3, !0), i = I(t, "isValidEvent", 3, () => !1), a = I(t, "customAnchor", 3, null), o = I(t, "isStatic", 3, !1), s = Oe(t, dr);
	cr(e, K({
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
// ../vibebook/node_modules/bits-ui/dist/internal/safe-polygon.svelte.js
function pr(e, t) {
	let [n, r] = e, i = !1, a = t.length;
	for (let e = 0, o = a - 1; e < a; o = e++) {
		let [a, s] = t[e] ?? [0, 0], [c, l] = t[o] ?? [0, 0];
		s >= r != l >= r && n <= (c - a) * (r - s) / (l - s) + a && (i = !i);
	}
	return i;
}
function mr(e, t) {
	return e[0] >= t.left && e[0] <= t.right && e[1] >= t.top && e[1] <= t.bottom;
}
function hr(e, t) {
	let n = e.left + e.width / 2, r = e.top + e.height / 2, i = t.left + t.width / 2, a = t.top + t.height / 2, o = i - n, s = a - r;
	return Math.abs(o) > Math.abs(s) ? o > 0 ? "right" : "left" : s > 0 ? "bottom" : "top";
}
var gr = class {
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
		this.#n = typeof t == "number" && t > 0 ? t : null, M([
			e.triggerNode,
			e.contentNode,
			e.enabled
		], ([e, t, n]) => {
			if (!e || !t || !n) {
				this.#o = null, this.#m();
				return;
			}
			this.#o && this.#o !== e && this.#m(), this.#o = e;
			let r = Me(e);
			return [
				ie(r, "pointermove", (n) => {
					this.#p([n.clientX, n.clientY], e, t);
				}),
				ie(e, "pointerleave", (e) => {
					let n = e.relatedTarget;
					if (Ge(n) && t.contains(n)) return;
					let r = this.#e.ignoredTargets?.() ?? [];
					Ge(n) && r.some((e) => e === n || e.contains(n)) || (this.#a = Ge(n) && r.length > 0 ? r.filter((e) => n.contains(e)) : [], this.#r = [e.clientX, e.clientY], this.#i = "content", this.#u());
				}),
				ie(e, "pointerenter", () => {
					this.#m();
				}),
				ie(t, "pointerenter", () => {
					this.#m();
				}),
				ie(t, "pointerleave", (t) => {
					let n = t.relatedTarget;
					Ge(n) && e.contains(n) || (this.#r = [t.clientX, t.clientY], this.#i = "trigger", this.#u());
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
		if (this.#i === "content" && mr(e, i) || this.#i === "trigger" && mr(e, r)) {
			this.#m();
			return;
		}
		if (this.#i === "content" && this.#a.length > 0) for (let t of this.#a) {
			let n = t.getBoundingClientRect();
			if (mr(e, n)) return;
			let i = hr(r, n), a = this.#h(r, n, i);
			if (a && pr(e, a)) return;
		}
		let a = hr(r, i), o = this.#h(r, i, a);
		if (o && pr(e, o)) return;
		let s = this.#i === "content" ? i : r;
		pr(e, this.#g(this.#r, s, a, this.#i)) || (this.#m(), this.#e.onPointerExit());
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
}, _r = class {
	#e;
	#t;
	#n = null;
	constructor(e, t) {
		this.#t = e, this.#e = t, this.stop = this.stop.bind(this), this.start = this.start.bind(this), le(this.stop);
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
}, vr = re({
	component: "tooltip",
	parts: ["content", "trigger"]
}), yr = new E("Tooltip.Provider"), br = new E("Tooltip.Root"), xr = class {
	triggers = /* @__PURE__ */ new Map();
	#e = R(0);
	#t = R(null);
	get activeTriggerId() {
		return A(this.#t);
	}
	set activeTriggerId(e) {
		W(this.#t, e, !0);
	}
	#n = P(() => {
		A(this.#e);
		let e = this.activeTriggerId;
		return e === null ? null : this.triggers.get(e)?.node ?? null;
	});
	get activeTriggerNode() {
		return A(this.#n);
	}
	set activeTriggerNode(e) {
		W(this.#n, e);
	}
	#r = P(() => {
		A(this.#e);
		let e = this.activeTriggerId;
		return e === null ? null : this.triggers.get(e)?.payload ?? null;
	});
	get activePayload() {
		return A(this.#r);
	}
	set activePayload(e) {
		W(this.#r, e);
	}
	register = (e) => {
		this.triggers.set(e.id, e), e.id === this.activeTriggerId && Pe(this.#e);
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
}, Sr = class e {
	static create(t) {
		return yr.set(new e(t));
	}
	opts;
	#e = R(!0);
	get isOpenDelayed() {
		return A(this.#e);
	}
	set isOpenDelayed(e) {
		W(this.#e, e, !0);
	}
	isPointerInTransit = H(!1);
	#t;
	#n = R(null);
	#r = !1;
	constructor(e) {
		this.opts = e, this.#t = new _r(() => {
			this.isOpenDelayed = !0;
		}, this.opts.skipDelayDuration.current), Ke(() => ie(window, "scroll", (e) => {
			let t = A(this.#n);
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
		A(this.#n) && A(this.#n) !== e && A(this.#n).handleClose(), this.#a(), this.isOpenDelayed = !1, W(this.#n, e, !0);
	};
	onClose = (e) => {
		A(this.#n) === e && (W(this.#n, null), this.#i());
	};
	isTooltipOpen = (e) => A(this.#n) === e;
}, Cr = class e {
	static create(t) {
		return br.set(new e(t, yr.get()));
	}
	opts;
	provider;
	#e = P(() => this.opts.delayDuration.current ?? this.provider.opts.delayDuration.current);
	get delayDuration() {
		return A(this.#e);
	}
	set delayDuration(e) {
		W(this.#e, e);
	}
	#t = P(() => this.opts.disableHoverableContent.current ?? this.provider.opts.disableHoverableContent.current);
	get disableHoverableContent() {
		return A(this.#t);
	}
	set disableHoverableContent(e) {
		W(this.#t, e);
	}
	#n = P(() => this.opts.disableCloseOnTriggerClick.current ?? this.provider.opts.disableCloseOnTriggerClick.current);
	get disableCloseOnTriggerClick() {
		return A(this.#n);
	}
	set disableCloseOnTriggerClick(e) {
		W(this.#n, e);
	}
	#r = P(() => this.opts.disabled.current ?? this.provider.opts.disabled.current);
	get disabled() {
		return A(this.#r);
	}
	set disabled(e) {
		W(this.#r, e);
	}
	#i = P(() => this.opts.ignoreNonKeyboardFocus.current ?? this.provider.opts.ignoreNonKeyboardFocus.current);
	get ignoreNonKeyboardFocus() {
		return A(this.#i);
	}
	set ignoreNonKeyboardFocus(e) {
		W(this.#i, e);
	}
	registry;
	tether;
	#a = R(null);
	get contentNode() {
		return A(this.#a);
	}
	set contentNode(e) {
		W(this.#a, e, !0);
	}
	contentPresence;
	#o = R(!1);
	#s = R(!1);
	get openedViaFocus() {
		return A(this.#s);
	}
	set openedViaFocus(e) {
		W(this.#s, e, !0);
	}
	#c;
	#l = P(() => this.opts.open.current ? A(this.#o) ? "delayed-open" : "instant-open" : "closed");
	get stateAttr() {
		return A(this.#l);
	}
	set stateAttr(e) {
		W(this.#l, e);
	}
	constructor(e, t) {
		this.opts = e, this.provider = t, this.tether = e.tether.current?.state ?? null, this.registry = this.tether?.registry ?? new xr(), this.#c = new _r(() => {
			W(this.#o, !0), this.opts.open.current = !0;
		}, this.delayDuration ?? 0), this.tether && (this.tether.root = this, Ke(() => () => {
			this.tether?.root === this && (this.tether.root = null);
		})), this.contentPresence = new ee({
			open: this.opts.open,
			ref: z(() => this.contentNode),
			onComplete: () => {
				this.opts.onOpenChangeComplete.current(this.opts.open.current);
			}
		}), M(() => this.delayDuration, () => {
			this.delayDuration !== void 0 && (this.#c = new _r(() => {
				W(this.#o, !0), this.opts.open.current = !0;
			}, this.delayDuration));
		}), M(() => this.opts.open.current, (e) => {
			e ? (this.ensureActiveTrigger(), this.provider.onOpen(this)) : (this.openedViaFocus = !1, this.provider.onClose(this));
		}, { lazy: !0 }), M(() => this.opts.triggerId.current, (e) => {
			e !== this.registry.activeTriggerId && this.registry.setActiveTrigger(e);
		}), M(() => this.registry.activeTriggerId, (e) => {
			this.opts.triggerId.current !== e && (this.opts.triggerId.current = e);
		});
	}
	handleOpen = () => {
		this.#c.stop(), W(this.#o, !1), this.ensureActiveTrigger(), this.opts.open.current = !0;
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
		e || t === 0 ? (W(this.#o, !1), this.opts.open.current = !0) : this.#c.start();
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
}, wr = class e {
	static create(t) {
		return t.tether.current ? new e(t, null, t.tether.current.state) : new e(t, br.get(), null);
	}
	opts;
	root;
	tether;
	attachment;
	#e = H(!1);
	#t = null;
	#n = R(!1);
	domContext;
	#r = null;
	#i = !1;
	#a = null;
	constructor(e, t, n) {
		this.opts = e, this.root = t, this.tether = n, this.domContext = new _(e.ref), this.attachment = d(this.opts.ref, (e) => e ? this.#c(e) : this.#l()), M(() => this.opts.id.current, () => {
			this.#c(this.opts.ref.current);
		}), M(() => this.opts.payload.current, () => {
			this.#c(this.opts.ref.current);
		}), M(() => this.opts.disabled.current, () => {
			this.#c(this.opts.ref.current);
		}), Ke(() => (this.#i = !0, this.#c(this.opts.ref.current), () => {
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
			t.provider.isPointerInTransit.current && (t.provider.isPointerInTransit.current = !1, t.onTriggerEnter(this.opts.id.current), W(this.#n, !0));
		}, 250)) : (t.onTriggerEnter(this.opts.id.current), W(this.#n, !0))));
	};
	#h = (e) => {
		let t = this.#o();
		t && (this.#s() ? t.opts.open.current && t.handleClose() : e.pointerType !== "touch" && (A(this.#n) || (this.#d(), t.provider.isPointerInTransit.current = !1, t.onTriggerEnter(this.opts.id.current), W(this.#n, !0))));
	};
	#g = (e) => {
		let t = this.#o();
		if (!t || this.#s()) return;
		if (this.#d(), !t.isActiveTrigger(this.opts.id.current)) {
			W(this.#n, !1);
			return;
		}
		let n = e.relatedTarget;
		if (Ge(n)) {
			for (let e of t.registry.triggers.values()) if (e.node === n) {
				if (t.provider.opts.skipDelayDuration.current > 0) {
					W(this.#n, !1);
					return;
				}
				t.handleClose(), W(this.#n, !1);
				return;
			}
		}
		t.onTriggerLeave(), W(this.#n, !1);
	};
	#_ = (e) => {
		let t = this.#o();
		t && (this.#e.current || this.#t !== "touch" && (this.#s() ? t.opts.open.current && t.handleClose() : (!t.ignoreNonKeyboardFocus || r(e.currentTarget)) && (t.setActiveTrigger(this.opts.id.current), t.openedViaFocus = !0, t.handleOpen(), t.provider.ignoreFocusScroll())));
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
	#b = P(() => {
		let e = this.#o(), t = !!(e?.opts.open.current && e.isActiveTrigger(this.opts.id.current)), n = this.#s();
		return {
			id: this.opts.id.current,
			"aria-describedby": t ? e?.contentNode?.id : void 0,
			"data-state": t ? e?.stateAttr : "closed",
			"data-disabled": f(n),
			"data-delay-duration": `${e?.delayDuration ?? 0}`,
			[vr.trigger]: "",
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
		return A(this.#b);
	}
	set props(e) {
		W(this.#b, e);
	}
}, Tr = class e {
	static create(t) {
		return new e(t, br.get());
	}
	opts;
	root;
	attachment;
	constructor(e, t) {
		this.opts = e, this.root = t, this.attachment = d(this.opts.ref, (e) => this.root.contentNode = e), new gr({
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
		Te(e, this.root.triggerNode) && this.root.disableCloseOnTriggerClick ? e.preventDefault() : (this.opts.onInteractOutside.current(e), e.defaultPrevented || this.root.handleClose());
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
	#e = P(() => ({ open: this.root.opts.open.current }));
	get snippetProps() {
		return A(this.#e);
	}
	set snippetProps(e) {
		W(this.#e, e);
	}
	#t = P(() => ({
		id: this.opts.id.current,
		"data-state": this.root.stateAttr,
		"data-disabled": f(this.root.disabled),
		...se(this.root.contentPresence.transitionStatus),
		style: { outline: "none" },
		[vr.content]: "",
		...this.attachment
	}));
	get props() {
		return A(this.#t);
	}
	set props(e) {
		W(this.#t, e);
	}
	popperProps = {
		onInteractOutside: this.onInteractOutside,
		onEscapeKeydown: this.onEscapeKeydown,
		onOpenAutoFocus: this.onOpenAutoFocus,
		onCloseAutoFocus: this.onCloseAutoFocus
	};
};
// ../vibebook/node_modules/bits-ui/dist/bits/tooltip/components/tooltip.svelte
function Er(e, t) {
	U(t, !0);
	let n = I(t, "open", 15, !1), r = I(t, "triggerId", 15, null), i = I(t, "onOpenChange", 3, y), a = I(t, "onOpenChangeComplete", 3, y), o = Cr.create({
		open: z(() => n(), (e) => {
			n(e), i()(e);
		}),
		triggerId: z(() => r(), (e) => {
			r(e);
		}),
		delayDuration: z(() => t.delayDuration),
		disableCloseOnTriggerClick: z(() => t.disableCloseOnTriggerClick),
		disableHoverableContent: z(() => t.disableHoverableContent),
		ignoreNonKeyboardFocus: z(() => t.ignoreNonKeyboardFocus),
		disabled: z(() => t.disabled),
		onOpenChangeComplete: z(() => a()),
		tether: z(() => t.tether)
	});
	Xe(e, {
		tooltip: !0,
		children: (e, n) => {
			var r = m(), i = N(r);
			l(i, () => t.children ?? G, () => ({
				open: o.opts.open.current,
				triggerId: o.activeTriggerId,
				payload: o.activePayload
			})), u(e, r);
		},
		$$slots: { default: !0 }
	}), B();
}
// ../vibebook/node_modules/bits-ui/dist/bits/tooltip/components/tooltip-content.svelte
var Dr = /* @__PURE__ */ new Set([
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
]), Or = b("<div><div><!></div></div>");
function kr(t, n) {
	let r = O();
	U(n, !0);
	let i = I(n, "id", 19, () => p(r)), a = I(n, "ref", 15, null), o = I(n, "side", 3, "top"), s = I(n, "sideOffset", 3, 0), c = I(n, "align", 3, "center"), d = I(n, "avoidCollisions", 3, !0), f = I(n, "arrowPadding", 3, 0), h = I(n, "sticky", 3, "partial"), g = I(n, "hideWhenDetached", 3, !1), _ = I(n, "collisionPadding", 3, 0), v = I(n, "onInteractOutside", 3, y), b = I(n, "onEscapeKeydown", 3, y), x = I(n, "forceMount", 3, !1), S = Oe(n, Dr), C = Tr.create({
		id: z(() => i()),
		ref: z(() => a(), (e) => a(e)),
		onInteractOutside: z(() => v()),
		onEscapeKeydown: z(() => b())
	}), w = P(() => ({
		side: o(),
		sideOffset: s(),
		align: c(),
		avoidCollisions: d(),
		arrowPadding: f(),
		sticky: h(),
		hideWhenDetached: g(),
		collisionPadding: _(),
		strategy: n.strategy,
		customAnchor: n.customAnchor ?? C.root.triggerNode
	})), T = P(() => e(S, A(w), C.props));
	var E = m(), D = N(E), ee = (t) => {
		{
			let r = (t, r) => {
				let i = () => (r?.()).props, a = () => (r?.()).wrapperProps, o = P(() => e(a(), { style: { pointerEvents: C.root.disableHoverableContent ? "none" : void 0 } })), s = P(() => e(i(), { style: et("tooltip") }, { style: n.style }));
				var c = m(), d = N(c), f = (e) => {
					var t = m(), r = N(t);
					{
						let e = P(() => ({
							props: A(s),
							wrapperProps: A(o),
							...C.snippetProps
						}));
						l(r, () => n.child, () => A(e));
					}
					u(e, t);
				}, p = (e) => {
					var t = Or();
					We(t, () => ({ ...A(o) }));
					var r = j(t);
					We(r, () => ({ ...A(s) }));
					var i = j(r);
					l(i, () => n.children ?? G), L(r), L(t), u(e, t);
				};
				we(d, (e) => {
					n.child ? e(f) : e(p, -1);
				}), u(t, c);
			}, a = P(() => C.root.disableHoverableContent ? "none" : "auto");
			fr(t, K(() => A(T), () => C.popperProps, {
				get enabled() {
					return C.root.opts.open.current;
				},
				get id() {
					return i();
				},
				trapFocus: !1,
				loop: !1,
				preventScroll: !1,
				forceMount: !0,
				get ref() {
					return C.opts.ref;
				},
				tooltip: !0,
				get shouldRender() {
					return C.shouldRender;
				},
				get contentPointerEvents() {
					return A(a);
				},
				popper: r,
				$$slots: { popper: !0 }
			}));
		}
	}, te = (t) => {
		{
			let r = (t, r) => {
				let i = () => (r?.()).props, a = () => (r?.()).wrapperProps, o = P(() => e(a(), { style: { pointerEvents: C.root.disableHoverableContent ? "none" : void 0 } })), s = P(() => e(i(), { style: et("tooltip") }, { style: n.style }));
				var c = m(), d = N(c), f = (e) => {
					var t = m(), r = N(t);
					{
						let e = P(() => ({
							props: A(s),
							wrapperProps: A(o),
							...C.snippetProps
						}));
						l(r, () => n.child, () => A(e));
					}
					u(e, t);
				}, p = (e) => {
					var t = Or();
					We(t, () => ({ ...A(o) }));
					var r = j(t);
					We(r, () => ({ ...A(s) }));
					var i = j(r);
					l(i, () => n.children ?? G), L(r), L(t), u(e, t);
				};
				we(d, (e) => {
					n.child ? e(f) : e(p, -1);
				}), u(t, c);
			}, a = P(() => C.root.disableHoverableContent ? "none" : "auto");
			ur(t, K(() => A(T), () => C.popperProps, {
				get open() {
					return C.root.opts.open.current;
				},
				get id() {
					return i();
				},
				trapFocus: !1,
				loop: !1,
				preventScroll: !1,
				forceMount: !1,
				get ref() {
					return C.opts.ref;
				},
				tooltip: !0,
				get shouldRender() {
					return C.shouldRender;
				},
				get contentPointerEvents() {
					return A(a);
				},
				popper: r,
				$$slots: { popper: !0 }
			}));
		}
	};
	we(D, (e) => {
		x() ? e(ee) : x() || e(te, 1);
	}), u(t, E), B();
}
// ../vibebook/node_modules/bits-ui/dist/bits/tooltip/components/tooltip-trigger.svelte
var Ar = /* @__PURE__ */ new Set([
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
]), jr = b("<button><!></button>");
function Mr(t, n) {
	let r = O();
	U(n, !0);
	let i = I(n, "id", 19, () => p(r)), a = I(n, "disabled", 3, !1), o = I(n, "type", 3, "button"), s = I(n, "tabindex", 3, 0), c = I(n, "ref", 15, null), d = Oe(n, Ar), f = wr.create({
		id: z(() => i()),
		disabled: z(() => a() ?? !1),
		tabindex: z(() => s() ?? 0),
		payload: z(() => n.payload),
		tether: z(() => n.tether),
		ref: z(() => c(), (e) => c(e))
	}), h = P(() => e(d, f.props, { type: o() }));
	var g = m(), _ = N(g), v = (e) => {
		var t = m(), r = N(t);
		l(r, () => n.child, () => ({ props: A(h) })), u(e, t);
	}, y = (e) => {
		var t = jr();
		We(t, () => ({ ...A(h) }));
		var r = j(t);
		l(r, () => n.children ?? G), L(t), u(e, t);
	};
	we(_, (e) => {
		n.child ? e(v) : e(y, -1);
	}), u(t, g), B();
}
// ../vibebook/node_modules/bits-ui/dist/bits/tooltip/components/tooltip-provider.svelte
function Nr(e, t) {
	U(t, !0);
	let n = I(t, "delayDuration", 3, 700), r = I(t, "disableCloseOnTriggerClick", 3, !1), i = I(t, "disableHoverableContent", 3, !1), a = I(t, "disabled", 3, !1), o = I(t, "ignoreNonKeyboardFocus", 3, !1), s = I(t, "skipDelayDuration", 3, 300);
	Sr.create({
		delayDuration: z(() => n()),
		disableCloseOnTriggerClick: z(() => r()),
		disableHoverableContent: z(() => i()),
		disabled: z(() => a()),
		ignoreNonKeyboardFocus: z(() => o()),
		skipDelayDuration: z(() => s())
	});
	var c = m(), d = N(c);
	l(d, () => t.children ?? G), u(e, c), B();
}
// svelte/lib/ui/RadioGroup.svelte
var Pr = b("<span aria-hidden=\"true\" class=\"tw:pointer-events-none tw:absolute tw:inset-1 tw:rounded-full tw:bg-primary\"></span>"), Fr = b("<label class=\"tw:flex tw:items-center tw:gap-2\"><span class=\"tw:relative tw:inline-flex tw:size-4 tw:shrink-0\"><input type=\"radio\" class=\"tw:m-0 tw:size-4 tw:appearance-none tw:rounded-full tw:border tw:border-input tw:bg-card tw:p-0 tw:outline-none tw:checked:border-primary tw:focus-visible:ring-2 tw:focus-visible:ring-ring tw:focus-visible:ring-offset-2 tw:focus-visible:ring-offset-background tw:disabled:opacity-50\"/> <!></span> <span> </span></label>"), Ir = b("<div role=\"radiogroup\"></div>");
function Lr(e, n) {
	let r = O();
	U(n, !0);
	let i = [], a = I(n, "value", 15, ""), s = I(n, "name", 3, r), c = I(n, "disabled", 3, !1);
	var l = Ir();
	w(l, 21, () => n.items, (e) => e.value, (e, r) => {
		var o = Fr(), l = j(o), d = j(l);
		me(d);
		var f, p = t(d, 2), m = (e) => {
			var t = Pr();
			u(e, t);
		};
		we(p, (e) => {
			a() === A(r).value && e(m);
		}), L(l);
		var h = t(l, 2), g = D(h, !0);
		L(o), V(() => {
			He(d, "name", s()), d.disabled = c() || A(r).disabled, f !== (f = A(r).value) && (d.value = (d.__value = f) ?? ""), S(g, A(r).label);
		}), oe("change", d, () => n.onValueChange?.(A(r).value)), Be(i, [], d, () => (A(r).value, a()), a), u(e, o);
	}), L(l), V((e) => {
		He(l, "aria-label", n.label), te(l, 1, e);
	}, [() => o(fe("tw:grid tw:grid-cols-1 tw:gap-2 tw:font-sans tw:text-sm tw:text-foreground", n.class))]), u(e, l), B();
}
i(["change"]);
// svelte/lib/ui/Tooltip.svelte
var Rr = b("<!> <!>", 1);
function zr(e, r) {
	U(r, !0);
	var i = m(), a = N(i);
	k(a, () => Nr, (e, i) => {
		i(e, {
			delayDuration: 250,
			children: (e, i) => {
				var a = m(), o = N(a);
				k(o, () => Er, (e, i) => {
					i(e, {
						children: (e, i) => {
							var a = Rr(), o = N(a);
							{
								let e = P(() => Ue({
									variant: "ghost",
									size: "icon"
								}));
								k(o, () => Mr, (t, n) => {
									n(t, {
										type: "button",
										get "aria-label"() {
											return r.label;
										},
										get class() {
											return A(e);
										},
										children: (e, t) => {
											var n = m(), i = N(n);
											l(i, () => r.children), u(e, n);
										},
										$$slots: { default: !0 }
									});
								});
							}
							var s = t(o, 2);
							k(s, () => n, (e, t) => {
								t(e, {
									children: (e, t) => {
										var n = m(), i = N(n);
										k(i, () => kr, (e, t) => {
											t(e, {
												"data-vb-native": !0,
												sideOffset: 6,
												class: "tw:z-50 tw:m-0 tw:box-border tw:max-w-xs tw:rounded-control tw:border tw:border-solid tw:border-border tw:bg-popover tw:px-3 tw:py-1.5 tw:font-sans tw:text-xs tw:leading-4 tw:text-popover-foreground tw:shadow-md",
												children: (e, t) => {
													F();
													var n = q();
													V(() => S(n, r.label)), u(e, n);
												},
												$$slots: { default: !0 }
											});
										}), u(e, n);
									},
									$$slots: { default: !0 }
								});
							}), u(e, a);
						},
						$$slots: { default: !0 }
					});
				}), u(e, a);
			},
			$$slots: { default: !0 }
		});
	}), u(e, i), B();
}
// svelte/lib/ui/Separator.svelte
var Br = b("<div role=\"separator\"></div>");
function Vr(e, t) {
	U(t, !0);
	let n = I(t, "vertical", 3, !1);
	var r = Br();
	V((e) => {
		He(r, "aria-orientation", n() ? "vertical" : "horizontal"), te(r, 1, e);
	}, [() => o(fe("tw:shrink-0 tw:bg-border", n() ? "tw:h-full tw:w-px" : "tw:h-px tw:w-full", t.class))]), u(e, r), B();
}
// svelte/lib/ui/Skeleton.svelte
var Hr = b("<div aria-hidden=\"true\"></div>");
function Ur(e, t) {
	U(t, !0);
	var n = Hr();
	V((e) => te(n, 1, e), [() => o(fe("tw:animate-pulse tw:rounded-control tw:bg-muted tw:motion-reduce:animate-none", t.class))]), u(e, n), B();
}
// svelte/lib/components/LoadingState.svelte
var Wr = b("<div role=\"status\" class=\"tw:inline-flex tw:items-center tw:gap-2 tw:font-sans tw:text-sm tw:text-muted-foreground\"><span aria-hidden=\"true\" class=\"tw:size-4 tw:animate-spin tw:rounded-full tw:border-2 tw:border-current tw:border-r-transparent tw:motion-reduce:animate-none\"></span> </div>");
function Gr(e, n) {
	var r = Wr(), i = t(j(r), 1, !0);
	L(r), V(() => S(i, n.label)), u(e, r);
}
// svelte/gallery/Gallery.svelte
var Kr = b("<div class=\"tw:flex tw:flex-wrap tw:gap-2\"></div> <div class=\"tw:flex tw:flex-wrap tw:items-center tw:gap-2\"><!><!><!><!><!></div> <p class=\"tw:m-0 tw:text-xs tw:text-muted-foreground\"> </p>", 1), qr = b("<!> <!> <!> <!>", 1), Jr = b("<div class=\"tw:flex tw:items-center tw:gap-2\"><!><label for=\"gallery-checkbox\">Include archived rooms</label></div> <div class=\"tw:flex tw:items-center tw:gap-2\"><!><label for=\"gallery-switch\">Notifications</label></div> <!> <!> <output data-selection-state=\"\" class=\"tw:block tw:text-xs tw:text-muted-foreground\" aria-live=\"polite\"> </output>", 1), Yr = b("<!><!>", 1), Xr = b("<p class=\"tw:m-0 tw:text-muted-foreground\">The same dialog primitives support mobile and desktop layouts.</p> <!>", 1), Zr = b("<p class=\"tw:m-0 tw:rounded-control tw:border tw:border-border tw:p-3\"> </p>"), Qr = b("<div class=\"tw:flex tw:flex-wrap tw:gap-2\"><!> <!></div> <!>", 1), $r = b("<div class=\"tw:flex tw:items-center tw:gap-3\"><!><!><!><span class=\"tw:text-muted-foreground\">Images and initials share one frame.</span></div> <!> <div class=\"tw:flex tw:flex-wrap tw:gap-2\"><!><!><!><!><!></div> <div class=\"tw:flex tw:items-center tw:gap-3\"><!> <div class=\"tw:flex-1 tw:space-y-2\"><!><!></div></div>", 1), ei = b("<!> <p class=\"tw:m-0 tw:text-sm tw:leading-5\">Body 400 · medium 500 · semibold 500 · bold 600. English and\n          Portuguese: Olá, colaboração, ações.</p> <p class=\"tw:m-0 tw:text-muted-foreground\">Muted text uses the Studio semantic role.</p> <pre class=\"tw:m-0 tw:overflow-auto tw:rounded-control tw:border tw:border-border tw:bg-muted tw:p-3 tw:font-mono tw:text-sm tw:leading-6\"><code>const room = \"fully typed\";</code></pre>", 1), ti = b("<main data-vb-native=\"\" class=\"tw:m-0 tw:box-border tw:min-h-dvh tw:bg-background tw:px-4 tw:py-8 tw:font-sans tw:text-sm tw:font-normal tw:leading-5 tw:text-foreground tw:sm:px-8\" data-gallery=\"\"><div class=\"tw:mx-auto tw:max-w-6xl tw:space-y-6\"><header class=\"tw:flex tw:flex-wrap tw:items-start tw:justify-between tw:gap-4\"><div class=\"tw:space-y-2\"><a href=\"/app?ui=svelte\" class=\"tw:text-sm tw:text-link tw:underline-offset-4 tw:hover:underline\">vibebook</a> <h1 class=\"tw:m-0 tw:font-sans tw:text-2xl tw:font-semibold tw:leading-8 tw:tracking-tight\">Component gallery</h1> <p class=\"tw:m-0 tw:text-muted-foreground\">Shared primitives, Studio tokens, and one Tailwind entry.</p></div> <div class=\"tw:flex tw:items-center tw:gap-2\"><!><!></div></header> <div class=\"tw:grid tw:grid-cols-1 tw:gap-5 tw:md:grid-cols-2\"><!> <!> <!> <!> <!> <!> <!> <!></div> <p role=\"status\" class=\"tw:min-h-5 tw:text-sm tw:text-muted-foreground\"> </p></div></main>");
function ni(e, n) {
	U(n, !0);
	let r = R("light"), i = R(""), a = R(""), o = R(!1), s = R(!1), c = R("room"), l = R("general"), d = R("all"), f = R(0), p = R("");
	g(() => {
		document.documentElement.dataset.theme = A(r);
	});
	let m = [
		"primary",
		"secondary",
		"outline",
		"ghost",
		"destructive",
		"link"
	];
	var h = ti(), _ = j(h), v = j(_), y = t(j(v), 2), b = j(y);
	{
		let e = P(() => A(r) === "light" ? "Use dark theme" : "Use light theme"), t = P(() => A(r) === "light" ? "moon" : "sun");
		ke(b, {
			get label() {
				return A(e);
			},
			get icon() {
				return A(t);
			},
			variant: "outline",
			onclick: () => W(r, A(r) === "light" ? "dark" : "light", !0)
		});
	}
	var x = t(b);
	Fe(x, {
		children: (e, t) => {
			F();
			var n = q();
			V(() => S(n, A(r))), u(e, n);
		},
		$$slots: { default: !0 }
	}), L(y), L(v);
	var C = t(v, 2), T = j(C);
	Se(T, {
		title: "Actions",
		description: "Variants share focus, disabled and loading behavior.",
		children: (e, n) => {
			var r = Kr(), i = N(r);
			w(i, 21, () => m, Ee, (e, t) => {
				xe(e, {
					get variant() {
						return A(t);
					},
					onclick: () => {
						W(f, A(f) + 1), W(p, `${A(t)} activated`);
					},
					children: (e, n) => {
						F();
						var r = q();
						V(() => S(r, A(t))), u(e, r);
					},
					$$slots: { default: !0 }
				});
			}), L(i);
			var a = t(i, 2), o = j(a);
			xe(o, {
				disabled: !0,
				children: (e, t) => {
					F();
					var n = q("Disabled");
					u(e, n);
				},
				$$slots: { default: !0 }
			});
			var s = t(o);
			xe(s, {
				loading: !0,
				children: (e, t) => {
					F();
					var n = q("Saving");
					u(e, n);
				},
				$$slots: { default: !0 }
			});
			var c = t(s);
			xe(c, {
				size: "sm",
				variant: "outline",
				children: (e, t) => {
					F();
					var n = q("Small");
					u(e, n);
				},
				$$slots: { default: !0 }
			});
			var l = t(c);
			ke(l, {
				label: "Add item",
				icon: "plus",
				onclick: () => W(f, A(f) + 1)
			}), zr(t(l), {
				label: "Search rooms",
				children: (e, t) => {
					pe(e, { name: "search" });
				},
				$$slots: { default: !0 }
			}), L(a);
			var d = t(a, 2), h = D(d);
			V(() => S(h, `Actions: ${A(f) ?? ""}`)), u(e, r);
		},
		$$slots: { default: !0 }
	});
	var E = t(T, 2);
	Se(E, {
		title: "Fields",
		description: "Labels, hints and errors have explicit associations.",
		children: (e, n) => {
			var r = qr(), o = N(r);
			de(o, {
				id: "gallery-title",
				label: "Room name",
				hint: "Choose a name your team recognizes.",
				children: (e, t = G) => {
					ze(e, K(t, {
						placeholder: "Project room",
						get value() {
							return A(i);
						},
						set value(e) {
							W(i, e, !0);
						}
					}));
				},
				$$slots: { default: !0 }
			});
			var s = t(o, 2);
			de(s, {
				id: "gallery-email",
				label: "Email",
				error: "Enter a valid email address.",
				children: (e, t = G) => {
					ze(e, K(t, {
						type: "email",
						value: "invalid"
					}));
				},
				$$slots: { default: !0 }
			});
			var c = t(s, 2);
			de(c, {
				id: "gallery-notes",
				label: "Notes",
				children: (e, t = G) => {
					Le(e, K(t, {
						placeholder: "Write a note",
						get value() {
							return A(a);
						},
						set value(e) {
							W(a, e, !0);
						}
					}));
				},
				$$slots: { default: !0 }
			});
			var l = t(c, 2);
			de(l, {
				id: "gallery-disabled",
				label: "Unavailable",
				children: (e, t = G) => {
					ze(e, K(t, {
						disabled: !0,
						value: "Disabled input"
					}));
				},
				$$slots: { default: !0 }
			}), u(e, r);
		},
		$$slots: { default: !0 }
	});
	var ee = t(E, 2);
	Se(ee, {
		title: "Selection",
		description: "Keyboard controls use native semantics or Bits UI behavior.",
		children: (e, n) => {
			var r = Jr(), i = N(r), a = j(i);
			he(a, {
				id: "gallery-checkbox",
				get checked() {
					return A(o);
				},
				set checked(e) {
					W(o, e, !0);
				}
			}), F(), L(i);
			var l = t(i, 2), f = j(l);
			Ae(f, {
				id: "gallery-switch",
				get checked() {
					return A(s);
				},
				set checked(e) {
					W(s, e, !0);
				}
			}), F(), L(l);
			var p = t(l, 2);
			Lr(p, {
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
					return A(c);
				},
				set value(e) {
					W(c, e, !0);
				}
			});
			var m = t(p, 2);
			de(m, {
				id: "gallery-filter",
				label: "Show",
				children: (e, t = G) => {
					De(e, K(t, {
						items: [{
							value: "all",
							label: "All rooms"
						}, {
							value: "active",
							label: "Active rooms"
						}],
						get value() {
							return A(d);
						},
						set value(e) {
							W(d, e, !0);
						}
					}));
				},
				$$slots: { default: !0 }
			});
			var h = t(m, 2), g = D(h);
			V(() => S(g, `${A(c) ?? ""} · ${A(d) ?? ""}`)), u(e, r);
		},
		$$slots: { default: !0 }
	});
	var O = t(ee, 2);
	Se(O, {
		title: "Overlays",
		description: "Focus trap, Escape dismissal and focus restoration are provided by Bits UI.",
		children: (e, n) => {
			var r = Qr(), a = N(r), o = j(a);
			be(o, {
				title: "Edit room",
				description: "Changes apply to the current room.",
				closeLabel: "Close dialog",
				trigger: (e) => {
					F();
					var t = q("Open dialog");
					u(e, t);
				},
				children: (e) => {
					var n = Yr(), r = N(n);
					de(r, {
						id: "dialog-name",
						label: "Name",
						children: (e, t = G) => {
							ze(e, K(t, {
								get value() {
									return A(i);
								},
								set value(e) {
									W(i, e, !0);
								}
							}));
						},
						$$slots: { default: !0 }
					});
					var a = t(r);
					xe(a, {
						onclick: () => W(p, "Dialog action completed"),
						children: (e, t) => {
							F();
							var n = q("Save name");
							u(e, n);
						},
						$$slots: { default: !0 }
					}), u(e, n);
				},
				$$slots: {
					trigger: !0,
					default: !0
				}
			});
			var s = t(o, 2);
			be(s, {
				title: "Room details",
				description: "A responsive sheet shares the dialog behavior.",
				closeLabel: "Close sheet",
				sheet: !0,
				trigger: (e) => {
					F();
					var t = q("Open sheet");
					u(e, t);
				},
				children: (e) => {
					var n = Xr(), r = t(N(n), 2);
					ze(r, {
						"aria-label": "Sheet note",
						placeholder: "Add a note"
					}), u(e, n);
				},
				$$slots: {
					trigger: !0,
					default: !0
				}
			}), L(a);
			var c = t(a, 2);
			je(c, {
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
					return A(l);
				},
				set value(e) {
					W(l, e, !0);
				},
				children: (e, t = G) => {
					var n = Zr(), r = D(n, !0);
					V(() => S(r, t() === "general" ? "General settings" : "Room members")), u(e, n);
				},
				$$slots: { default: !0 }
			}), u(e, r);
		},
		$$slots: { default: !0 }
	});
	var te = t(O, 2);
	Se(te, {
		title: "Identity and feedback",
		children: (e, n) => {
			var r = $r(), i = N(r), a = j(i);
			Ce(a, { name: "Gimenes" });
			var o = t(a);
			Ce(o, { name: "Guilherme Rodrigues" });
			var s = t(o);
			Ce(s, {
				name: "Sample user",
				src: "/favicon.svg"
			}), F(), L(i);
			var c = t(i, 2);
			Vr(c, {});
			var l = t(c, 2), d = j(l);
			Fe(d, {
				children: (e, t) => {
					F();
					var n = q("Default");
					u(e, n);
				},
				$$slots: { default: !0 }
			});
			var f = t(d);
			Fe(f, {
				variant: "primary",
				children: (e, t) => {
					F();
					var n = q("Selected");
					u(e, n);
				},
				$$slots: { default: !0 }
			});
			var p = t(f);
			Fe(p, {
				variant: "success",
				children: (e, t) => {
					F();
					var n = q("Complete");
					u(e, n);
				},
				$$slots: { default: !0 }
			});
			var m = t(p);
			Fe(m, {
				variant: "warning",
				children: (e, t) => {
					F();
					var n = q("Waiting");
					u(e, n);
				},
				$$slots: { default: !0 }
			});
			var h = t(m);
			Fe(h, {
				variant: "destructive",
				children: (e, t) => {
					F();
					var n = q("Failed");
					u(e, n);
				},
				$$slots: { default: !0 }
			}), L(l);
			var g = t(l, 2), _ = j(g);
			Ur(_, { class: "tw:size-9 tw:rounded-full" });
			var v = t(_, 2), y = j(v);
			Ur(y, { class: "tw:h-3 tw:w-3/4" }), Ur(t(y), { class: "tw:h-3 tw:w-1/2" }), L(v), L(g), u(e, r);
		},
		$$slots: { default: !0 }
	});
	var ne = t(te, 2);
	Se(ne, {
		title: "Empty states",
		children: (e, t) => {
			ye(e, {
				title: "Nothing waiting for you",
				description: "New requests and tasks in review will appear here.",
				children: (e, t) => {
					xe(e, {
						variant: "outline",
						onclick: () => W(p, "Empty state action completed"),
						children: (e, t) => {
							F();
							var n = q("Explore rooms");
							u(e, n);
						},
						$$slots: { default: !0 }
					});
				},
				$$slots: { default: !0 }
			});
		},
		$$slots: { default: !0 }
	});
	var k = t(ne, 2);
	Se(k, {
		title: "Status feedback",
		children: (e, n) => {
			var r = Yr(), i = N(r);
			Gr(i, { label: "Saving changes" });
			var a = t(i);
			ge(a, {
				title: "Could not save changes",
				description: "Your draft is still available.",
				retryLabel: "Try again",
				onretry: () => W(p, "Retry requested")
			}), u(e, r);
		},
		$$slots: { default: !0 }
	});
	var re = t(k, 2);
	Se(re, {
		title: "Typography",
		class: "tw:md:col-span-2",
		children: (e, t) => {
			var n = ei(), r = N(n);
			Ne(r, {
				level: 3,
				class: "tw:text-xl tw:leading-7 tw:tracking-tight",
				children: (e, t) => {
					F();
					var n = q("Inter variable — headings and UI");
					u(e, n);
				},
				$$slots: { default: !0 }
			}), F(6), u(e, n);
		},
		$$slots: { default: !0 }
	}), L(C);
	var ie = t(C, 2), ae = D(ie, !0);
	L(_), L(h), V(() => S(ae, A(p))), u(e, h), B();
}
// svelte/gallery/main.ts
function ri(e) {
	let t = x(ni, { target: e });
	return () => T(t);
}
export { ri as mountGallery };
