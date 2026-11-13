import { $t as e, A as t, At as n, B as r, Bt as i, C as a, Ct as o, D as s, Dt as c, E as l, Et as u, F as d, G as f, Gt as p, H as m, Ht as h, I as g, It as _, K as v, Kt as y, L as b, Lt as x, M as S, N as C, Nt as w, O as T, Ot as E, P as D, Pt as O, Q as k, Qt as A, R as ee, Rt as j, S as te, St as ne, T as re, Tt as M, U as ie, Ut as N, V as P, Vt as F, W as I, Wt as ae, X as L, Xt as oe, Y as se, Yt as R, Z as ce, Zt as z, _ as le, a as ue, at as de, b as fe, c as pe, ct as me, d as he, en as B, f as ge, ft as _e, g as ve, gt as V, h as ye, ht as be, i as xe, it as Se, j as Ce, jt as we, k as Te, kt as H, l as Ee, lt as De, m as Oe, o as ke, ot as Ae, pt as je, q as Me, qt as Ne, r as Pe, s as Fe, st as Ie, t as Le, tn as U, u as Re, ut as ze, v as Be, vt as Ve, w as He, wt as Ue, x as We, xt as W, y as Ge, yt as Ke, z as G, zt as qe } from "./Field-CmLHjtbO.js";
// ../vibebook/node_modules/svelte-toolbelt/dist/utils/on-mount-effect.svelte.js
function Je(e) {
	j(() => _(() => e()));
}
// ../vibebook/node_modules/bits-ui/dist/bits/utilities/floating-layer/floating-root.svelte.js
var Ye = new r("Floating.Root"), Xe = new r("Floating.Root"), Ze = class e {
	static create(t = !1) {
		return t ? Xe.set(new e()) : Ye.set(new e());
	}
	anchorNode = f(null);
	customAnchorNode = f(null);
	triggerNode = f(null);
	constructor() {
		j(() => {
			this.customAnchorNode.current ? typeof this.customAnchorNode.current == "string" ? this.anchorNode.current = document.querySelector(this.customAnchorNode.current) : this.anchorNode.current = this.customAnchorNode.current : this.anchorNode.current = this.triggerNode.current;
		});
	}
};
// ../vibebook/node_modules/bits-ui/dist/bits/utilities/floating-layer/components/floating-layer.svelte
function Qe(e, t) {
	A(t, !0);
	let n = L(t, "tooltip", 3, !1);
	Ze.create(_(() => n()));
	var r = u(), i = F(r);
	V(i, () => t.children ?? U), M(e, r), z();
}
// ../vibebook/node_modules/bits-ui/dist/internal/floating-svelte/floating-utils.svelte.js
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
// ../vibebook/node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs
var rt = [
	"top",
	"right",
	"bottom",
	"left"
], it = Math.min, K = Math.max, at = Math.round, ot = Math.floor, q = (e) => ({
	x: e,
	y: e
}), st = {
	left: "right",
	right: "left",
	bottom: "top",
	top: "bottom"
};
function ct(e, t, n) {
	return K(e, it(t, n));
}
function J(e, t) {
	return typeof e == "function" ? e(t) : e;
}
function lt(e) {
	return e.split("-")[0];
}
function ut(e) {
	return e.split("-")[1];
}
function dt(e) {
	return e === "x" ? "y" : "x";
}
function ft(e) {
	return e === "y" ? "height" : "width";
}
function Y(e) {
	let t = e[0];
	return t === "t" || t === "b" ? "y" : "x";
}
function pt(e) {
	return dt(Y(e));
}
function mt(e, t, n) {
	n === void 0 && (n = !1);
	let r = ut(e), i = pt(e), a = ft(i), o = i === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
	return t.reference[a] > t.floating[a] && (o = Ct(o)), [o, Ct(o)];
}
function ht(e) {
	let t = Ct(e);
	return [
		gt(e),
		t,
		gt(t)
	];
}
function gt(e) {
	return e.includes("start") ? e.replace("start", "end") : e.replace("end", "start");
}
var _t = ["left", "right"], vt = ["right", "left"], yt = ["top", "bottom"], bt = ["bottom", "top"];
function xt(e, t, n) {
	switch (e) {
		case "top":
		case "bottom": return n ? t ? vt : _t : t ? _t : vt;
		case "left":
		case "right": return t ? yt : bt;
		default: return [];
	}
}
function St(e, t, n, r) {
	let i = ut(e), a = xt(lt(e), n === "start", r);
	return i && (a = a.map((e) => e + "-" + i), t && (a = a.concat(a.map(gt)))), a;
}
function Ct(e) {
	let t = lt(e);
	return st[t] + e.slice(t.length);
}
function wt(e) {
	return {
		top: e.top ?? 0,
		right: e.right ?? 0,
		bottom: e.bottom ?? 0,
		left: e.left ?? 0
	};
}
function Tt(e) {
	return typeof e == "number" ? {
		top: e,
		right: e,
		bottom: e,
		left: e
	} : wt(e);
}
function Et(e) {
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
function Dt(e, t, n) {
	let { reference: r, floating: i } = e, a = Y(t), o = pt(t), s = ft(o), c = lt(t), l = a === "y", u = r.x + r.width / 2 - i.width / 2, d = r.y + r.height / 2 - i.height / 2, f = r[s] / 2 - i[s] / 2, p;
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
	let m = ut(t);
	return m && (p[o] += f * (m === "end" ? 1 : -1) * (n && l ? -1 : 1)), p;
}
async function Ot(e, t) {
	t === void 0 && (t = {});
	let { x: n, y: r, platform: i, rects: a, elements: o, strategy: s } = e, { boundary: c = "clippingAncestors", rootBoundary: l = "viewport", elementContext: u = "floating", altBoundary: d = !1, padding: f = 0 } = J(t, e), p = Tt(f), m = o[d ? u === "floating" ? "reference" : "floating" : u], h = Et(await i.getClippingRect({
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
	}, y = Et(i.convertOffsetParentRelativeRectToViewportRelativeRect ? await i.convertOffsetParentRelativeRectToViewportRelativeRect({
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
var kt = 50, At = async (e, t, n) => {
	let { placement: r = "bottom", strategy: i = "absolute", middleware: a = [], platform: o } = n, s = o.detectOverflow ? o : {
		...o,
		detectOverflow: Ot
	}, c = await (o.isRTL == null ? void 0 : o.isRTL(t)), l = await o.getElementRects({
		reference: e,
		floating: t,
		strategy: i
	}), { x: u, y: d } = Dt(l, r, c), f = r, p = 0, m = {};
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
		}, x && p < kt && (p++, typeof x == "object" && (x.placement && (f = x.placement), x.rects && (l = x.rects === !0 ? await o.getElementRects({
			reference: e,
			floating: t,
			strategy: i
		}) : x.rects), {x: u, y: d} = Dt(l, f, c)), n = -1);
	}
	return {
		x: u,
		y: d,
		placement: f,
		strategy: i,
		middlewareData: m
	};
}, jt = (e) => ({
	name: "arrow",
	options: e,
	async fn(t) {
		let { x: n, y: r, placement: i, rects: a, platform: o, elements: s, middlewareData: c } = t, { element: l, padding: u = 0 } = J(e, t) || {};
		if (l == null) return {};
		let d = Tt(u), f = {
			x: n,
			y: r
		}, p = pt(i), m = ft(p), h = await o.getDimensions(l), g = p === "y", _ = g ? "top" : "left", v = g ? "bottom" : "right", y = g ? "clientHeight" : "clientWidth", b = a.reference[m] + a.reference[p] - f[p] - a.floating[m], x = f[p] - a.reference[p], S = await (o.getOffsetParent == null ? void 0 : o.getOffsetParent(l)), C = S ? S[y] : 0;
		C && await (o.isElement == null ? void 0 : o.isElement(S)) || (C = s.floating[y] || a.floating[m]);
		let w = b / 2 - x / 2, T = C / 2 - h[m] / 2 - 1, E = it(d[_], T), D = it(d[v], T), O = C - h[m] - D, k = C / 2 - h[m] / 2 + w, A = ct(E, k, O), ee = !c.arrow && ut(i) != null && k !== A && a.reference[m] / 2 - (k < E ? E : D) - h[m] / 2 < 0, j = ee ? k < E ? k - E : k - O : 0;
		return {
			[p]: f[p] + j,
			data: {
				[p]: A,
				centerOffset: k - A - j,
				...ee && { alignmentOffset: j }
			},
			reset: ee
		};
	}
}), Mt = function(e) {
	return e === void 0 && (e = {}), {
		name: "flip",
		options: e,
		async fn(t) {
			var n;
			let { placement: r, middlewareData: i, rects: a, initialPlacement: o, platform: s, elements: c } = t, { mainAxis: l = !0, crossAxis: u = !0, fallbackPlacements: d, fallbackStrategy: f = "bestFit", fallbackAxisSideDirection: p = "none", flipAlignment: m = !0, ...h } = J(e, t);
			if ((n = i.arrow) != null && n.alignmentOffset) return {};
			let g = lt(r), _ = Y(o), v = lt(o) === o, y = await (s.isRTL == null ? void 0 : s.isRTL(c.floating)), b = d || (v || !m ? [Ct(o)] : ht(o)), x = p !== "none";
			!d && x && b.push(...St(o, m, p, y));
			let S = [o, ...b], C = await s.detectOverflow(t, h), w = [], T = i.flip?.overflows || [];
			if (l && w.push(C[g]), u) {
				let e = mt(r, a, y);
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
function Nt(e, t) {
	return {
		top: e.top - t.height,
		right: e.right - t.width,
		bottom: e.bottom - t.height,
		left: e.left - t.width
	};
}
function Pt(e) {
	return rt.some((t) => e[t] >= 0);
}
var Ft = function(e) {
	return e === void 0 && (e = {}), {
		name: "hide",
		options: e,
		async fn(t) {
			let { rects: n, platform: r } = t, { strategy: i = "referenceHidden", ...a } = J(e, t);
			switch (i) {
				case "referenceHidden": {
					let e = Nt(await r.detectOverflow(t, {
						...a,
						elementContext: "reference"
					}), n.reference);
					return { data: {
						referenceHiddenOffsets: e,
						referenceHidden: Pt(e)
					} };
				}
				case "escaped": {
					let e = Nt(await r.detectOverflow(t, {
						...a,
						altBoundary: !0
					}), n.floating);
					return { data: {
						escapedOffsets: e,
						escaped: Pt(e)
					} };
				}
				default: return {};
			}
		}
	};
}, It = /*#__PURE__*/ new Set(["left", "top"]);
async function Lt(e, t) {
	let { placement: n, platform: r, elements: i } = e, a = await (r.isRTL == null ? void 0 : r.isRTL(i.floating)), o = lt(n), s = ut(n), c = Y(n) === "y", l = It.has(o) ? -1 : 1, u = a && c ? -1 : 1, d = J(t, e), { mainAxis: f, crossAxis: p, alignmentAxis: m } = typeof d == "number" ? {
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
var Rt = function(e) {
	return e === void 0 && (e = 0), {
		name: "offset",
		options: e,
		async fn(t) {
			var n;
			let { x: r, y: i, placement: a, middlewareData: o } = t, s = await Lt(t, e);
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
}, zt = function(e) {
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
			}, d = await a.detectOverflow(t, l), f = Y(i), p = dt(f), m = u[p], h = u[f], g = (e, t) => ct(t + d[e === "y" ? "top" : "left"], t, t - d[e === "y" ? "bottom" : "right"]);
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
}, Bt = function(e) {
	return e === void 0 && (e = {}), {
		options: e,
		fn(t) {
			let { x: n, y: r, placement: i, rects: a, middlewareData: o } = t, { offset: s = 0, mainAxis: c = !0, crossAxis: l = !0 } = J(e, t), u = {
				x: n,
				y: r
			}, d = Y(i), f = dt(d), p = u[f], m = u[d], h = J(s, t), g = typeof h == "number" ? {
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
				let e = f === "y" ? "width" : "height", t = It.has(lt(i)), n = a.reference[d] - a.floating[e] + (t && o.offset?.[d] || 0) + (t ? 0 : g.crossAxis), r = a.reference[d] + a.reference[e] + (t ? 0 : o.offset?.[d] || 0) - (t ? g.crossAxis : 0);
				m < n ? m = n : m > r && (m = r);
			}
			return {
				[f]: p,
				[d]: m
			};
		}
	};
}, Vt = function(e) {
	return e === void 0 && (e = {}), {
		name: "size",
		options: e,
		async fn(t) {
			let { placement: n, rects: r, platform: i, elements: a } = t, { apply: o = () => {}, ...s } = J(e, t), c = await i.detectOverflow(t, s), l = lt(n), u = ut(n), d = Y(n) === "y", { width: f, height: p } = r.floating, m, h;
			l === "top" || l === "bottom" ? (m = l, h = u === (await (i.isRTL == null ? void 0 : i.isRTL(a.floating)) ? "start" : "end") ? "left" : "right") : (h = l, m = u === "end" ? "top" : "bottom");
			let g = p - c.top - c.bottom, _ = f - c.left - c.right, v = it(p - c[m], g), y = it(f - c[h], _), b = t.middlewareData.shift, x = !b, S = v, C = y;
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
// ../vibebook/node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs
function Ht() {
	return typeof window < "u";
}
function Ut(e) {
	return Wt(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function X(e) {
	var t;
	return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function Z(e) {
	return ((Wt(e) ? e.ownerDocument : e.document) || window.document)?.documentElement;
}
function Wt(e) {
	return Ht() ? e instanceof Node || e instanceof X(e).Node : !1;
}
function Q(e) {
	return Ht() ? e instanceof Element || e instanceof X(e).Element : !1;
}
function Gt(e) {
	return Ht() ? e instanceof HTMLElement || e instanceof X(e).HTMLElement : !1;
}
function Kt(e) {
	return !Ht() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof X(e).ShadowRoot;
}
function qt(e) {
	let { overflow: t, overflowX: n, overflowY: r, display: i } = $(e);
	return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && i !== "inline" && i !== "contents";
}
function Jt(e) {
	return /^(table|td|th)$/.test(Ut(e));
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
	return /^(html|body|#document)$/.test(Ut(e));
}
function $(e) {
	return X(e).getComputedStyle(e);
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
	if (Ut(e) === "html") return e;
	let t = e.assignedSlot || e.parentNode || Kt(e) && e.host || Z(e);
	return Kt(t) ? t.host : t;
}
function sn(e) {
	let t = on(e);
	return rn(t) ? (e.ownerDocument || e).body : Gt(t) && qt(t) ? t : sn(t);
}
function cn(e, t, n) {
	t === void 0 && (t = []), n === void 0 && (n = !0);
	let r = sn(e), i = r === e.ownerDocument?.body, a = X(r);
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
	let t = $(e), n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0, i = Gt(e), a = i ? e.offsetWidth : n, o = i ? e.offsetHeight : r, s = at(n) !== a || at(r) !== o;
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
	if (!Gt(t)) return q(1);
	let n = t.getBoundingClientRect(), { width: r, height: i, $: a } = un(t), o = (a ? at(n.width) : n.width) / r, s = (a ? at(n.height) : n.height) / i;
	return o && Number.isFinite(o) || (o = 1), s && Number.isFinite(s) || (s = 1), {
		x: o,
		y: s
	};
}
var pn = /*#__PURE__*/ q(0);
function mn(e) {
	let t = X(e);
	return !nn() || !t.visualViewport ? pn : {
		x: t.visualViewport.offsetLeft,
		y: t.visualViewport.offsetTop
	};
}
function hn(e, t, n) {
	return t === void 0 && (t = !1), !!n && t && n === X(e);
}
function gn(e, t, n, r) {
	t === void 0 && (t = !1), n === void 0 && (n = !1);
	let i = e.getBoundingClientRect(), a = dn(e), o = q(1);
	t && (r ? Q(r) && (o = fn(r)) : o = fn(e));
	let s = hn(a, n, r) ? mn(a) : q(0), c = (i.left + s.x) / o.x, l = (i.top + s.y) / o.y, u = i.width / o.x, d = i.height / o.y;
	if (a && r) {
		let e = X(a), t = Q(r) ? X(r) : r, n = e, i = ln(n);
		for (; i && t !== n;) {
			let e = fn(i), t = i.getBoundingClientRect(), r = $(i), a = t.left + (i.clientLeft + parseFloat(r.paddingLeft)) * e.x, o = t.top + (i.clientTop + parseFloat(r.paddingTop)) * e.y;
			c *= e.x, l *= e.y, u *= e.x, d *= e.y, c += a, l += o, n = X(i), i = ln(n);
		}
	}
	return Et({
		width: u,
		height: d,
		x: c,
		y: l
	});
}
function _n(e, t) {
	let n = an(e).scrollLeft;
	return t ? t.left + n : gn(Z(e)).left + n;
}
function vn(e, t) {
	let n = e.getBoundingClientRect();
	return {
		x: n.left + t.scrollLeft - _n(e, n),
		y: n.top + t.scrollTop
	};
}
function yn(e) {
	let { elements: t, rect: n, offsetParent: r, strategy: i } = e, a = i === "fixed", o = Z(r), s = t ? Yt(t.floating) : !1;
	if (r === o || s && a) return n;
	let c = {
		scrollLeft: 0,
		scrollTop: 0
	}, l = q(1), u = q(0), d = Gt(r);
	if ((d || !a) && ((Ut(r) !== "body" || qt(o)) && (c = an(r)), d)) {
		let e = gn(r);
		l = fn(r), u.x = e.x + r.clientLeft, u.y = e.y + r.clientTop;
	}
	let f = o && !d && !a ? vn(o, c) : q(0);
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
	let t = an(e), n = e.ownerDocument.body, r = K(e.scrollWidth, e.clientWidth, n.scrollWidth, n.clientWidth), i = K(e.scrollHeight, e.clientHeight, n.scrollHeight, n.clientHeight), a = -t.scrollLeft + _n(e), o = -t.scrollTop;
	return $(n).direction === "rtl" && (a += K(e.clientWidth, n.clientWidth) - r), {
		width: r,
		height: i,
		x: a,
		y: o
	};
}
var Sn = 25;
function Cn(e, t, n) {
	n === void 0 && (n = "viewport");
	let r = n === "layoutViewport", i = X(e), a = Z(e), o = i.visualViewport, s = a.clientWidth, c = a.clientHeight, l = 0, u = 0;
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
	else if (t === "document") r = xn(Z(e));
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
	return Et(r);
}
function En(e, t) {
	let n = t.get(e);
	if (n) return n;
	let r = cn(e, [], !1).filter((e) => Q(e) && Ut(e) !== "body"), i = null, a = $(e).position === "fixed", o = a ? on(e) : e;
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
		s = K(n.top, s), c = it(n.right, c), l = it(n.bottom, l), u = K(n.left, u);
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
	let r = Gt(t), i = Z(t), a = n === "fixed", o = gn(e, !0, a, t), s = {
		scrollLeft: 0,
		scrollTop: 0
	}, c = q(0);
	if ((r || !a) && ((Ut(t) !== "body" || qt(i)) && (s = an(t)), r)) {
		let e = gn(t, !0, a, t);
		c.x = e.x + t.clientLeft, c.y = e.y + t.clientTop;
	}
	!r && i && (c.x = _n(i));
	let l = i && !r && !a ? vn(i, s) : q(0);
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
	return Z(e) === n && (n = n.ownerDocument.body), n;
}
function Mn(e, t) {
	let n = X(e);
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
	getDocumentElement: Z,
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
	let r = null, i, a = Z(e);
	function o() {
		var e;
		clearTimeout(i), (e = r) == null || e.disconnect(), r = null;
	}
	function s(n, c) {
		n === void 0 && (n = !1), c === void 0 && (c = 1), o();
		let l = e.getBoundingClientRect(), { left: u, top: d, width: f, height: p } = l;
		if (n || t(), !f || !p) return;
		let m = ot(d), h = ot(a.clientWidth - (u + f)), g = ot(a.clientHeight - (d + p)), _ = ot(u), v = {
			rootMargin: -m + "px " + -h + "px " + -g + "px " + -_ + "px",
			threshold: K(0, it(1, c)) || 1
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
	let c = X(e), l = () => s(n);
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
var zn = Rt, Bn = zt, Vn = Mt, Hn = Vt, Un = Ft, Wn = jt, Gn = Bt, Kn = (e, t, n) => {
	let r = /* @__PURE__ */ new Map(), i = n ?? {}, a = {
		...Fn,
		...i.platform,
		_c: r
	};
	return At(e, t, {
		...i,
		platform: a
	});
};
// ../vibebook/node_modules/bits-ui/dist/internal/floating-svelte/use-floating.svelte.js
function qn(e) {
	let t = e.whileElementsMounted, n = R(() => $e(e.open) ?? !0), r = R(() => $e(e.middleware)), i = R(() => $e(e.transform) ?? !0), a = R(() => $e(e.placement) ?? "bottom"), o = R(() => $e(e.strategy) ?? "absolute"), s = R(() => $e(e.sideOffset) ?? 0), c = R(() => $e(e.alignOffset) ?? 0), l = e.reference, u;
	qe(() => {
		u = {
			middleware: O(r),
			placement: O(a),
			strategy: O(o),
			open: O(n),
			sideOffset: O(s),
			alignOffset: O(c)
		};
	});
	let d = y(0), m = y(0), h = f(null), g = y(ae(O(o))), _ = y(ae(O(a))), v = y(ae({})), b = y(!1), x = !1, S = 0, C = !1, w = R(() => {
		let e = h.current ? tt(h.current, O(d)) : O(d), t = h.current ? tt(h.current, O(m)) : O(m);
		return O(i) ? {
			position: O(g),
			left: "0",
			top: "0",
			transform: `translate(${e}px, ${t}px)`,
			...h.current && et(h.current) >= 1.5 && { willChange: "transform" }
		} : {
			position: O(g),
			left: `${e}px`,
			top: `${t}px`
		};
	}), T;
	function E() {
		if (C || l.current === null || h.current === null) return;
		let e = l.current, t = h.current, n = ++S;
		Kn(e, t, {
			middleware: u.middleware,
			placement: u.placement,
			strategy: u.strategy
		}).then((r) => {
			if (n === S && l.current === e && h.current === t) {
				if (Jn(e)) p(v, {
					...O(v),
					hide: {
						...O(v).hide,
						referenceHidden: !0
					}
				}, !0);
				else {
					if (!u.open && O(d) !== 0 && O(m) !== 0) {
						let e = Math.max(Math.abs(u.sideOffset), Math.abs(u.alignOffset), 15);
						if (r.x <= e && r.y <= e) return;
					}
					p(d, r.x, !0), p(m, r.y, !0), p(g, r.strategy, !0), p(_, r.placement, !0), p(v, r.middlewareData, !0), p(b, !0);
				}
			}
		});
	}
	function D() {
		typeof T == "function" && (T(), T = void 0), S++;
	}
	function k() {
		D(), t === void 0 ? (A(), E()) : O(n) && l.current !== null && h.current !== null && (A(), T = t(l.current, h.current, E));
	}
	function A() {
		return [
			O(r),
			O(a),
			O(o)
		];
	}
	function ee() {
		!O(n) && h.current === null && p(b, !1);
	}
	function te() {
		return [
			O(r),
			O(a),
			O(o),
			O(s),
			O(c),
			O(n)
		];
	}
	return j(() => {
		t === void 0 && O(n) && (A(), E());
	}), j(k), j(() => {
		t !== void 0 && (te(), O(n) && O(b) ? x ? E() : x = !0 : x = !1);
	}), j(ee), j(() => () => {
		C = !0, D();
	}), {
		floating: h,
		reference: l,
		get strategy() {
			return O(g);
		},
		get placement() {
			return O(_);
		},
		get middlewareData() {
			return O(v);
		},
		get isPositioned() {
			return O(b);
		},
		get floatingStyles() {
			return O(w);
		},
		get update() {
			return E;
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
}, Xn = new r("Floating.Content"), Zn = class e {
	static create(t, n = !1) {
		return n ? Xn.set(new e(t, Xe.get())) : Xn.set(new e(t, Ye.get()));
	}
	opts;
	root;
	contentRef = f(null);
	wrapperRef = f(null);
	arrowRef = f(null);
	contentAttachment = C(this.contentRef);
	wrapperAttachment = C(this.wrapperRef);
	arrowAttachment = C(this.arrowRef);
	arrowId = f(le());
	#e = R(() => {
		if (typeof this.opts.style == "string") return ie(this.opts.style);
		if (!this.opts.style) return {};
	});
	#t = void 0;
	#n = new ee(() => this.arrowRef.current ?? void 0);
	#r = R(() => this.#n?.width ?? 0);
	#i = R(() => this.#n?.height ?? 0);
	#a = R(() => this.opts.side?.current + (this.opts.align.current === "center" ? "" : `-${this.opts.align.current}`));
	#o = R(() => (Array.isArray(this.opts.collisionBoundary.current) ? this.opts.collisionBoundary.current : [this.opts.collisionBoundary.current]).filter(Te));
	#s = R(() => O(this.#o).length > 0);
	get hasExplicitBoundaries() {
		return O(this.#s);
	}
	set hasExplicitBoundaries(e) {
		p(this.#s, e);
	}
	#c = R(() => ({
		padding: this.opts.collisionPadding.current,
		boundary: O(this.#o),
		altBoundary: this.hasExplicitBoundaries
	}));
	get detectOverflowOptions() {
		return O(this.#c);
	}
	set detectOverflowOptions(e) {
		p(this.#c, e);
	}
	#l = y(void 0);
	#u = y(void 0);
	#d = y(void 0);
	#f = y(void 0);
	#p = R(() => [
		zn({
			mainAxis: this.opts.sideOffset.current + O(this.#i),
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
				p(this.#l, t, !0), p(this.#u, n, !0), p(this.#d, r, !0), p(this.#f, i, !0);
			}
		}),
		this.arrowRef.current && Wn({
			element: this.arrowRef.current,
			padding: this.opts.arrowPadding.current
		}),
		Qn({
			arrowWidth: O(this.#r),
			arrowHeight: O(this.#i)
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
		return O(this.#p);
	}
	set middleware(e) {
		p(this.#p, e);
	}
	floating;
	#m = R(() => er(this.floating.placement));
	get placedSide() {
		return O(this.#m);
	}
	set placedSide(e) {
		p(this.#m, e);
	}
	#h = R(() => tr(this.floating.placement));
	get placedAlign() {
		return O(this.#h);
	}
	set placedAlign(e) {
		p(this.#h, e);
	}
	#g = R(() => this.floating.middlewareData.arrow?.x ?? 0);
	get arrowX() {
		return O(this.#g);
	}
	set arrowX(e) {
		p(this.#g, e);
	}
	#_ = R(() => this.floating.middlewareData.arrow?.y ?? 0);
	get arrowY() {
		return O(this.#_);
	}
	set arrowY(e) {
		p(this.#_, e);
	}
	#v = R(() => this.floating.middlewareData.arrow?.centerOffset !== 0);
	get cannotCenterArrow() {
		return O(this.#v);
	}
	set cannotCenterArrow(e) {
		p(this.#v, e);
	}
	#y = y("auto");
	get contentZIndex() {
		return O(this.#y);
	}
	set contentZIndex(e) {
		p(this.#y, e, !0);
	}
	#b = R(() => Yn[this.placedSide]);
	get arrowBaseSide() {
		return O(this.#b);
	}
	set arrowBaseSide(e) {
		p(this.#b, e);
	}
	#x = R(() => ({
		id: this.opts.wrapperId.current,
		"data-bits-floating-content-wrapper": "",
		style: {
			...this.floating.floatingStyles,
			transform: this.floating.isPositioned ? this.floating.floatingStyles.transform : "translate(0, -200%)",
			minWidth: "max-content",
			zIndex: this.contentZIndex,
			"--bits-floating-transform-origin": `${this.floating.middlewareData.transformOrigin?.x} ${this.floating.middlewareData.transformOrigin?.y}`,
			"--bits-floating-available-width": `${O(this.#l)}px`,
			"--bits-floating-available-height": `${O(this.#u)}px`,
			"--bits-floating-anchor-width": `${O(this.#d)}px`,
			"--bits-floating-anchor-height": `${O(this.#f)}px`,
			...(this.floating.middlewareData.hide?.referenceHidden || this.floating.middlewareData.hideClipping?.referenceHidden) && {
				visibility: "hidden",
				"pointer-events": "none"
			},
			...O(this.#e)
		},
		dir: this.opts.dir.current,
		...this.wrapperAttachment
	}));
	get wrapperProps() {
		return O(this.#x);
	}
	set wrapperProps(e) {
		p(this.#x, e);
	}
	#S = R(() => ({
		"data-side": this.placedSide,
		"data-align": this.placedAlign,
		style: m({ ...O(this.#e) }),
		...this.contentAttachment
	}));
	get props() {
		return O(this.#S);
	}
	set props(e) {
		p(this.#S, e);
	}
	#C = R(() => ({
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
		return O(this.#C);
	}
	set arrowStyle(e) {
		p(this.#C, e);
	}
	constructor(e, t) {
		this.opts = e, this.root = t, this.#t = e.updatePositionStrategy, e.customAnchor && (this.root.customAnchorNode.current = e.customAnchor.current), G(() => e.customAnchor.current, (e) => {
			this.root.customAnchorNode.current = e;
		}), this.floating = qn({
			strategy: () => this.opts.strategy.current,
			placement: () => O(this.#a),
			middleware: () => this.middleware,
			reference: this.root.anchorNode,
			whileElementsMounted: (...e) => Rn(...e, { animationFrame: this.#t?.current === "always" }),
			open: () => this.opts.enabled.current,
			sideOffset: () => this.opts.sideOffset.current,
			alignOffset: () => this.opts.alignOffset.current
		}), j(() => {
			this.floating.isPositioned && this.opts.onPlaced?.current();
		}), G([() => this.contentRef.current, () => this.opts.enabled.current], ([e, t]) => {
			if (!e || !t) return;
			let n = g(e), r = n.requestAnimationFrame(() => {
				if (this.contentRef.current !== e || !this.opts.enabled.current) return;
				let t = n.getComputedStyle(e).zIndex;
				t !== this.contentZIndex && (this.contentZIndex = t);
			});
			return () => {
				n.cancelAnimationFrame(r);
			};
		}), j(() => {
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
function nr(e, t) {
	A(t, !0);
	let n = L(t, "side", 3, "bottom"), r = L(t, "sideOffset", 3, 0), i = L(t, "align", 3, "center"), a = L(t, "alignOffset", 3, 0), o = L(t, "arrowPadding", 3, 0), s = L(t, "avoidCollisions", 3, !0), c = L(t, "collisionBoundary", 19, () => []), l = L(t, "collisionPadding", 3, 0), d = L(t, "hideWhenDetached", 3, !1), f = L(t, "onPlaced", 3, () => {}), p = L(t, "sticky", 3, "partial"), m = L(t, "updatePositionStrategy", 3, "optimized"), h = L(t, "strategy", 3, "fixed"), g = L(t, "dir", 3, "ltr"), v = L(t, "style", 19, () => ({})), y = L(t, "wrapperId", 19, le), b = L(t, "customAnchor", 3, null), x = L(t, "tooltip", 3, !1), S = Zn.create({
		side: I(() => n()),
		sideOffset: I(() => r()),
		align: I(() => i()),
		alignOffset: I(() => a()),
		id: I(() => t.id),
		arrowPadding: I(() => o()),
		avoidCollisions: I(() => s()),
		collisionBoundary: I(() => c()),
		collisionPadding: I(() => l()),
		hideWhenDetached: I(() => d()),
		onPlaced: I(() => f()),
		sticky: I(() => p()),
		updatePositionStrategy: I(() => m()),
		strategy: I(() => h()),
		dir: I(() => g()),
		style: I(() => v()),
		enabled: I(() => t.enabled),
		wrapperId: I(() => y()),
		customAnchor: I(() => b())
	}, _(() => x())), C = R(() => P(S.wrapperProps, { style: { pointerEvents: "auto" } }));
	var w = u(), T = F(w);
	V(T, () => t.content ?? U, () => ({
		props: S.props,
		wrapperProps: O(C)
	})), M(e, w), z();
}
// ../vibebook/node_modules/bits-ui/dist/bits/utilities/floating-layer/components/floating-layer-content-static.svelte
function rr(e, t) {
	A(t, !0), se(() => {
		t.onPlaced?.();
	});
	var n = u(), r = F(n);
	V(r, () => t.content ?? U, () => ({
		props: {},
		wrapperProps: {}
	})), M(e, n), z();
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
	let n = L(t, "isStatic", 3, !1), r = ce(t, ir);
	var i = u(), a = F(i), o = (e) => {
		rr(e, {
			get content() {
				return t.content;
			},
			get onPlaced() {
				return t.onPlaced;
			}
		});
	}, s = (e) => {
		nr(e, k({
			get content() {
				return t.content;
			},
			get onPlaced() {
				return t.onPlaced;
			}
		}, () => r));
	};
	W(a, (e) => {
		n() ? e(o) : e(s, -1);
	}), M(e, i);
}
// ../vibebook/node_modules/bits-ui/dist/bits/utilities/popper-layer/popper-layer-inner.svelte
var or = /* @__PURE__ */ new Set(/* @__PURE__ */ "$$slots.$$events.$$legacy.popper.onEscapeKeydown.escapeKeydownBehavior.preventOverflowTextSelection.id.onPointerDown.onPointerUp.side.sideOffset.align.alignOffset.arrowPadding.avoidCollisions.collisionBoundary.collisionPadding.sticky.hideWhenDetached.updatePositionStrategy.strategy.dir.preventScroll.wrapperId.style.onPlaced.onInteractOutside.onCloseAutoFocus.onOpenAutoFocus.onFocusOutside.interactOutsideBehavior.loop.trapFocus.isValidEvent.customAnchor.isStatic.enabled.forceMount.ref.tooltip.contentPointerEvents".split(".")), sr = c("<!> <!>", 1);
function cr(e, t) {
	A(t, !0);
	let n = L(t, "interactOutsideBehavior", 3, "close"), r = L(t, "trapFocus", 3, !0), i = L(t, "isValidEvent", 3, () => !1), a = L(t, "customAnchor", 3, null), o = L(t, "isStatic", 3, !1), s = L(t, "tooltip", 3, !1), c = L(t, "contentPointerEvents", 3, "auto"), l = ce(t, or), d = R(() => t.preventScroll ?? !0), f = R(() => t.strategy ?? (O(d) ? "fixed" : "absolute"));
	ar(e, {
		get isStatic() {
			return o();
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
			return O(f);
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
			return a();
		},
		get enabled() {
			return t.enabled;
		},
		get tooltip() {
			return s();
		},
		content: (e, a) => {
			let o = () => (a?.()).props, s = () => (a?.()).wrapperProps;
			var f = sr(), p = F(f), m = (e) => {
				ve(e, { get preventScroll() {
					return O(d);
				} });
			}, h = (e) => {
				ve(e, { get preventScroll() {
					return O(d);
				} });
			};
			W(p, (e) => {
				t.forceMount && t.enabled ? e(m) : t.forceMount || e(h, 1);
			});
			var g = N(p, 2);
			Ge(g, {
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
					return r();
				},
				get forceMount() {
					return t.forceMount;
				},
				get ref() {
					return t.ref;
				},
				focusScope: (e, r) => {
					let a = () => (r?.()).props;
					fe(e, {
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
						children: (e, r) => {
							We(e, {
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
									return n();
								},
								get isValidEvent() {
									return i();
								},
								get enabled() {
									return t.enabled;
								},
								get ref() {
									return t.ref;
								},
								children: (e, n) => {
									let r = () => (n?.()).props;
									Be(e, {
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
											var i = u(), d = F(i);
											{
												let e = R(() => ({
													props: P(l, o(), r(), a(), {
														id: t.id,
														style: { pointerEvents: c() }
													}),
													wrapperProps: s()
												}));
												V(d, () => t.popper ?? U, () => O(e));
											}
											M(e, i);
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
			}), M(e, f);
		},
		$$slots: { content: !0 }
	}), z();
}
// ../vibebook/node_modules/bits-ui/dist/bits/utilities/popper-layer/popper-layer.svelte
var lr = /* @__PURE__ */ new Set(/* @__PURE__ */ "$$slots.$$events.$$legacy.popper.open.onEscapeKeydown.escapeKeydownBehavior.preventOverflowTextSelection.id.onPointerDown.onPointerUp.side.sideOffset.align.alignOffset.arrowPadding.avoidCollisions.collisionBoundary.collisionPadding.sticky.hideWhenDetached.updatePositionStrategy.strategy.dir.preventScroll.wrapperId.style.onPlaced.onInteractOutside.onCloseAutoFocus.onOpenAutoFocus.onFocusOutside.interactOutsideBehavior.loop.trapFocus.isValidEvent.customAnchor.isStatic.ref.shouldRender".split("."));
function ur(e, t) {
	let n = L(t, "interactOutsideBehavior", 3, "close"), r = L(t, "trapFocus", 3, !0), i = L(t, "isValidEvent", 3, () => !1), a = L(t, "customAnchor", 3, null), o = L(t, "isStatic", 3, !1), s = ce(t, lr);
	var c = u(), l = F(c), d = (e) => {
		cr(e, k({
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
	W(l, (e) => {
		t.shouldRender && e(d);
	}), M(e, c);
}
// ../vibebook/node_modules/bits-ui/dist/bits/utilities/popper-layer/popper-layer-force-mount.svelte
var dr = /* @__PURE__ */ new Set(/* @__PURE__ */ "$$slots.$$events.$$legacy.popper.onEscapeKeydown.escapeKeydownBehavior.preventOverflowTextSelection.id.onPointerDown.onPointerUp.side.sideOffset.align.alignOffset.arrowPadding.avoidCollisions.collisionBoundary.collisionPadding.sticky.hideWhenDetached.updatePositionStrategy.strategy.dir.preventScroll.wrapperId.style.onPlaced.onInteractOutside.onCloseAutoFocus.onOpenAutoFocus.onFocusOutside.interactOutsideBehavior.loop.trapFocus.isValidEvent.customAnchor.isStatic.enabled".split("."));
function fr(e, t) {
	let n = L(t, "interactOutsideBehavior", 3, "close"), r = L(t, "trapFocus", 3, !0), i = L(t, "isValidEvent", 3, () => !1), a = L(t, "customAnchor", 3, null), o = L(t, "isStatic", 3, !1), s = ce(t, dr);
	cr(e, k({
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
			let r = d(e);
			return [
				w(r, "pointermove", (n) => {
					this.#p([n.clientX, n.clientY], e, t);
				}),
				w(e, "pointerleave", (e) => {
					let n = e.relatedTarget;
					if (s(n) && t.contains(n)) return;
					let r = this.#e.ignoredTargets?.() ?? [];
					s(n) && r.some((e) => e === n || e.contains(n)) || (this.#a = s(n) && r.length > 0 ? r.filter((e) => n.contains(e)) : [], this.#r = [e.clientX, e.clientY], this.#i = "content", this.#u());
				}),
				w(e, "pointerenter", () => {
					this.#m();
				}),
				w(t, "pointerenter", () => {
					this.#m();
				}),
				w(t, "pointerleave", (t) => {
					let n = t.relatedTarget;
					s(n) && e.contains(n) || (this.#r = [t.clientX, t.clientY], this.#i = "trigger", this.#u());
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
		this.#t = e, this.#e = t, this.stop = this.stop.bind(this), this.start = this.start.bind(this), b(this.stop);
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
}, vr = Ce({
	component: "tooltip",
	parts: ["content", "trigger"]
}), yr = new r("Tooltip.Provider"), br = new r("Tooltip.Root"), xr = class {
	triggers = /* @__PURE__ */ new Map();
	#e = y(0);
	#t = y(null);
	get activeTriggerId() {
		return O(this.#t);
	}
	set activeTriggerId(e) {
		p(this.#t, e, !0);
	}
	#n = R(() => {
		O(this.#e);
		let e = this.activeTriggerId;
		return e === null ? null : this.triggers.get(e)?.node ?? null;
	});
	get activeTriggerNode() {
		return O(this.#n);
	}
	set activeTriggerNode(e) {
		p(this.#n, e);
	}
	#r = R(() => {
		O(this.#e);
		let e = this.activeTriggerId;
		return e === null ? null : this.triggers.get(e)?.payload ?? null;
	});
	get activePayload() {
		return O(this.#r);
	}
	set activePayload(e) {
		p(this.#r, e);
	}
	register = (e) => {
		this.triggers.set(e.id, e), e.id === this.activeTriggerId && Ne(this.#e);
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
	#e = y(!0);
	get isOpenDelayed() {
		return O(this.#e);
	}
	set isOpenDelayed(e) {
		p(this.#e, e, !0);
	}
	isPointerInTransit = f(!1);
	#t;
	#n = y(null);
	#r = !1;
	constructor(e) {
		this.opts = e, this.#t = new _r(() => {
			this.isOpenDelayed = !0;
		}, this.opts.skipDelayDuration.current), Je(() => w(window, "scroll", (e) => {
			let t = O(this.#n);
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
		O(this.#n) && O(this.#n) !== e && O(this.#n).handleClose(), this.#a(), this.isOpenDelayed = !1, p(this.#n, e, !0);
	};
	onClose = (e) => {
		O(this.#n) === e && (p(this.#n, null), this.#i());
	};
	isTooltipOpen = (e) => O(this.#n) === e;
}, Cr = class e {
	static create(t) {
		return br.set(new e(t, yr.get()));
	}
	opts;
	provider;
	#e = R(() => this.opts.delayDuration.current ?? this.provider.opts.delayDuration.current);
	get delayDuration() {
		return O(this.#e);
	}
	set delayDuration(e) {
		p(this.#e, e);
	}
	#t = R(() => this.opts.disableHoverableContent.current ?? this.provider.opts.disableHoverableContent.current);
	get disableHoverableContent() {
		return O(this.#t);
	}
	set disableHoverableContent(e) {
		p(this.#t, e);
	}
	#n = R(() => this.opts.disableCloseOnTriggerClick.current ?? this.provider.opts.disableCloseOnTriggerClick.current);
	get disableCloseOnTriggerClick() {
		return O(this.#n);
	}
	set disableCloseOnTriggerClick(e) {
		p(this.#n, e);
	}
	#r = R(() => this.opts.disabled.current ?? this.provider.opts.disabled.current);
	get disabled() {
		return O(this.#r);
	}
	set disabled(e) {
		p(this.#r, e);
	}
	#i = R(() => this.opts.ignoreNonKeyboardFocus.current ?? this.provider.opts.ignoreNonKeyboardFocus.current);
	get ignoreNonKeyboardFocus() {
		return O(this.#i);
	}
	set ignoreNonKeyboardFocus(e) {
		p(this.#i, e);
	}
	registry;
	tether;
	#a = y(null);
	get contentNode() {
		return O(this.#a);
	}
	set contentNode(e) {
		p(this.#a, e, !0);
	}
	contentPresence;
	#o = y(!1);
	#s = y(!1);
	get openedViaFocus() {
		return O(this.#s);
	}
	set openedViaFocus(e) {
		p(this.#s, e, !0);
	}
	#c;
	#l = R(() => this.opts.open.current ? O(this.#o) ? "delayed-open" : "instant-open" : "closed");
	get stateAttr() {
		return O(this.#l);
	}
	set stateAttr(e) {
		p(this.#l, e);
	}
	constructor(e, t) {
		this.opts = e, this.provider = t, this.tether = e.tether.current?.state ?? null, this.registry = this.tether?.registry ?? new xr(), this.#c = new _r(() => {
			p(this.#o, !0), this.opts.open.current = !0;
		}, this.delayDuration ?? 0), this.tether && (this.tether.root = this, Je(() => () => {
			this.tether?.root === this && (this.tether.root = null);
		})), this.contentPresence = new l({
			open: this.opts.open,
			ref: I(() => this.contentNode),
			onComplete: () => {
				this.opts.onOpenChangeComplete.current(this.opts.open.current);
			}
		}), G(() => this.delayDuration, () => {
			this.delayDuration !== void 0 && (this.#c = new _r(() => {
				p(this.#o, !0), this.opts.open.current = !0;
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
		this.#c.stop(), p(this.#o, !1), this.ensureActiveTrigger(), this.opts.open.current = !0;
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
		e || t === 0 ? (p(this.#o, !1), this.opts.open.current = !0) : this.#c.start();
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
	#e = f(!1);
	#t = null;
	#n = y(!1);
	domContext;
	#r = null;
	#i = !1;
	#a = null;
	constructor(e, t, n) {
		this.opts = e, this.root = t, this.tether = n, this.domContext = new D(e.ref), this.attachment = C(this.opts.ref, (e) => e ? this.#c(e) : this.#l()), G(() => this.opts.id.current, () => {
			this.#c(this.opts.ref.current);
		}), G(() => this.opts.payload.current, () => {
			this.#c(this.opts.ref.current);
		}), G(() => this.opts.disabled.current, () => {
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
			t.provider.isPointerInTransit.current && (t.provider.isPointerInTransit.current = !1, t.onTriggerEnter(this.opts.id.current), p(this.#n, !0));
		}, 250)) : (t.onTriggerEnter(this.opts.id.current), p(this.#n, !0))));
	};
	#h = (e) => {
		let t = this.#o();
		t && (this.#s() ? t.opts.open.current && t.handleClose() : e.pointerType !== "touch" && (O(this.#n) || (this.#d(), t.provider.isPointerInTransit.current = !1, t.onTriggerEnter(this.opts.id.current), p(this.#n, !0))));
	};
	#g = (e) => {
		let t = this.#o();
		if (!t || this.#s()) return;
		if (this.#d(), !t.isActiveTrigger(this.opts.id.current)) {
			p(this.#n, !1);
			return;
		}
		let n = e.relatedTarget;
		if (s(n)) {
			for (let e of t.registry.triggers.values()) if (e.node === n) {
				if (t.provider.opts.skipDelayDuration.current > 0) {
					p(this.#n, !1);
					return;
				}
				t.handleClose(), p(this.#n, !1);
				return;
			}
		}
		t.onTriggerLeave(), p(this.#n, !1);
	};
	#_ = (e) => {
		let t = this.#o();
		t && (this.#e.current || this.#t !== "touch" && (this.#s() ? t.opts.open.current && t.handleClose() : (!t.ignoreNonKeyboardFocus || T(e.currentTarget)) && (t.setActiveTrigger(this.opts.id.current), t.openedViaFocus = !0, t.handleOpen(), t.provider.ignoreFocusScroll())));
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
	#b = R(() => {
		let e = this.#o(), n = !!(e?.opts.open.current && e.isActiveTrigger(this.opts.id.current)), r = this.#s();
		return {
			id: this.opts.id.current,
			"aria-describedby": n ? e?.contentNode?.id : void 0,
			"data-state": n ? e?.stateAttr : "closed",
			"data-disabled": t(r),
			"data-delay-duration": `${e?.delayDuration ?? 0}`,
			[vr.trigger]: "",
			tabindex: r ? void 0 : this.opts.tabindex.current,
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
		return O(this.#b);
	}
	set props(e) {
		p(this.#b, e);
	}
}, Tr = class e {
	static create(t) {
		return new e(t, br.get());
	}
	opts;
	root;
	attachment;
	constructor(e, t) {
		this.opts = e, this.root = t, this.attachment = C(this.opts.ref, (e) => this.root.contentNode = e), new gr({
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
		te(e, this.root.triggerNode) && this.root.disableCloseOnTriggerClick ? e.preventDefault() : (this.opts.onInteractOutside.current(e), e.defaultPrevented || this.root.handleClose());
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
	#e = R(() => ({ open: this.root.opts.open.current }));
	get snippetProps() {
		return O(this.#e);
	}
	set snippetProps(e) {
		p(this.#e, e);
	}
	#t = R(() => ({
		id: this.opts.id.current,
		"data-state": this.root.stateAttr,
		"data-disabled": t(this.root.disabled),
		...S(this.root.contentPresence.transitionStatus),
		style: { outline: "none" },
		[vr.content]: "",
		...this.attachment
	}));
	get props() {
		return O(this.#t);
	}
	set props(e) {
		p(this.#t, e);
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
	A(t, !0);
	let n = L(t, "open", 15, !1), r = L(t, "triggerId", 15, null), i = L(t, "onOpenChange", 3, re), a = L(t, "onOpenChangeComplete", 3, re), o = Cr.create({
		open: I(() => n(), (e) => {
			n(e), i()(e);
		}),
		triggerId: I(() => r(), (e) => {
			r(e);
		}),
		delayDuration: I(() => t.delayDuration),
		disableCloseOnTriggerClick: I(() => t.disableCloseOnTriggerClick),
		disableHoverableContent: I(() => t.disableHoverableContent),
		ignoreNonKeyboardFocus: I(() => t.ignoreNonKeyboardFocus),
		disabled: I(() => t.disabled),
		onOpenChangeComplete: I(() => a()),
		tether: I(() => t.tether)
	});
	Qe(e, {
		tooltip: !0,
		children: (e, n) => {
			var r = u(), i = F(r);
			V(i, () => t.children ?? U, () => ({
				open: o.opts.open.current,
				triggerId: o.activeTriggerId,
				payload: o.activePayload
			})), M(e, r);
		},
		$$slots: { default: !0 }
	}), z();
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
]), Or = c("<div><div><!></div></div>");
function kr(e, t) {
	let n = E();
	A(t, !0);
	let r = L(t, "id", 19, () => He(n)), a = L(t, "ref", 15, null), o = L(t, "side", 3, "top"), s = L(t, "sideOffset", 3, 0), c = L(t, "align", 3, "center"), l = L(t, "avoidCollisions", 3, !0), d = L(t, "arrowPadding", 3, 0), f = L(t, "sticky", 3, "partial"), p = L(t, "hideWhenDetached", 3, !1), m = L(t, "collisionPadding", 3, 0), h = L(t, "onInteractOutside", 3, re), g = L(t, "onEscapeKeydown", 3, re), _ = L(t, "forceMount", 3, !1), v = ce(t, Dr), y = Tr.create({
		id: I(() => r()),
		ref: I(() => a(), (e) => a(e)),
		onInteractOutside: I(() => h()),
		onEscapeKeydown: I(() => g())
	}), b = R(() => ({
		side: o(),
		sideOffset: s(),
		align: c(),
		avoidCollisions: l(),
		arrowPadding: d(),
		sticky: f(),
		hideWhenDetached: p(),
		collisionPadding: m(),
		strategy: t.strategy,
		customAnchor: t.customAnchor ?? y.root.triggerNode
	})), x = R(() => P(v, O(b), y.props));
	var S = u(), C = F(S), w = (e) => {
		{
			let n = (e, n) => {
				let r = () => (n?.()).props, a = () => (n?.()).wrapperProps, o = R(() => P(a(), { style: { pointerEvents: y.root.disableHoverableContent ? "none" : void 0 } })), s = R(() => P(r(), { style: nt("tooltip") }, { style: t.style }));
				var c = u(), l = F(c), d = (e) => {
					var n = u(), r = F(n);
					{
						let e = R(() => ({
							props: O(s),
							wrapperProps: O(o),
							...y.snippetProps
						}));
						V(r, () => t.child, () => O(e));
					}
					M(e, n);
				}, f = (e) => {
					var n = Or();
					me(n, () => ({ ...O(o) }));
					var r = i(n);
					me(r, () => ({ ...O(s) }));
					var a = i(r);
					V(a, () => t.children ?? U), B(r), B(n), M(e, n);
				};
				W(l, (e) => {
					t.child ? e(d) : e(f, -1);
				}), M(e, c);
			}, a = R(() => y.root.disableHoverableContent ? "none" : "auto");
			fr(e, k(() => O(x), () => y.popperProps, {
				get enabled() {
					return y.root.opts.open.current;
				},
				get id() {
					return r();
				},
				trapFocus: !1,
				loop: !1,
				preventScroll: !1,
				forceMount: !0,
				get ref() {
					return y.opts.ref;
				},
				tooltip: !0,
				get shouldRender() {
					return y.shouldRender;
				},
				get contentPointerEvents() {
					return O(a);
				},
				popper: n,
				$$slots: { popper: !0 }
			}));
		}
	}, T = (e) => {
		{
			let n = (e, n) => {
				let r = () => (n?.()).props, a = () => (n?.()).wrapperProps, o = R(() => P(a(), { style: { pointerEvents: y.root.disableHoverableContent ? "none" : void 0 } })), s = R(() => P(r(), { style: nt("tooltip") }, { style: t.style }));
				var c = u(), l = F(c), d = (e) => {
					var n = u(), r = F(n);
					{
						let e = R(() => ({
							props: O(s),
							wrapperProps: O(o),
							...y.snippetProps
						}));
						V(r, () => t.child, () => O(e));
					}
					M(e, n);
				}, f = (e) => {
					var n = Or();
					me(n, () => ({ ...O(o) }));
					var r = i(n);
					me(r, () => ({ ...O(s) }));
					var a = i(r);
					V(a, () => t.children ?? U), B(r), B(n), M(e, n);
				};
				W(l, (e) => {
					t.child ? e(d) : e(f, -1);
				}), M(e, c);
			}, a = R(() => y.root.disableHoverableContent ? "none" : "auto");
			ur(e, k(() => O(x), () => y.popperProps, {
				get open() {
					return y.root.opts.open.current;
				},
				get id() {
					return r();
				},
				trapFocus: !1,
				loop: !1,
				preventScroll: !1,
				forceMount: !1,
				get ref() {
					return y.opts.ref;
				},
				tooltip: !0,
				get shouldRender() {
					return y.shouldRender;
				},
				get contentPointerEvents() {
					return O(a);
				},
				popper: n,
				$$slots: { popper: !0 }
			}));
		}
	};
	W(C, (e) => {
		_() ? e(w) : _() || e(T, 1);
	}), M(e, S), z();
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
]), jr = c("<button><!></button>");
function Mr(e, t) {
	let n = E();
	A(t, !0);
	let r = L(t, "id", 19, () => He(n)), a = L(t, "disabled", 3, !1), o = L(t, "type", 3, "button"), s = L(t, "tabindex", 3, 0), c = L(t, "ref", 15, null), l = ce(t, Ar), d = wr.create({
		id: I(() => r()),
		disabled: I(() => a() ?? !1),
		tabindex: I(() => s() ?? 0),
		payload: I(() => t.payload),
		tether: I(() => t.tether),
		ref: I(() => c(), (e) => c(e))
	}), f = R(() => P(l, d.props, { type: o() }));
	var p = u(), m = F(p), h = (e) => {
		var n = u(), r = F(n);
		V(r, () => t.child, () => ({ props: O(f) })), M(e, n);
	}, g = (e) => {
		var n = jr();
		me(n, () => ({ ...O(f) }));
		var r = i(n);
		V(r, () => t.children ?? U), B(n), M(e, n);
	};
	W(m, (e) => {
		t.child ? e(h) : e(g, -1);
	}), M(e, p), z();
}
// ../vibebook/node_modules/bits-ui/dist/bits/tooltip/components/tooltip-provider.svelte
function Nr(e, t) {
	A(t, !0);
	let n = L(t, "delayDuration", 3, 700), r = L(t, "disableCloseOnTriggerClick", 3, !1), i = L(t, "disableHoverableContent", 3, !1), a = L(t, "disabled", 3, !1), o = L(t, "ignoreNonKeyboardFocus", 3, !1), s = L(t, "skipDelayDuration", 3, 300);
	Sr.create({
		delayDuration: I(() => n()),
		disableCloseOnTriggerClick: I(() => r()),
		disableHoverableContent: I(() => i()),
		disabled: I(() => a()),
		ignoreNonKeyboardFocus: I(() => o()),
		skipDelayDuration: I(() => s())
	});
	var c = u(), l = F(c);
	V(l, () => t.children ?? U), M(e, c), z();
}
// svelte/lib/ui/Textarea.svelte
var Pr = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"value",
	"class",
	"ref"
]), Fr = c("<textarea></textarea>");
function Ir(e, t) {
	A(t, !0);
	let n = L(t, "value", 15, ""), r = L(t, "ref", 15, null), i = ce(t, Pr);
	var a = Fr();
	oe(a), me(a, (e) => ({
		class: e,
		...i
	}), [() => Me("tw:min-h-24 tw:w-full tw:min-w-0 tw:rounded-control tw:border tw:border-input tw:bg-studio-input-background tw:px-3 tw:py-2 tw:font-sans tw:text-sm tw:font-normal tw:leading-5 tw:tracking-normal tw:text-foreground tw:outline-none tw:placeholder:text-muted-foreground tw:focus-visible:border-ring tw:focus-visible:ring-2 tw:focus-visible:ring-ring/30 tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-destructive/30", t.class)]), Se(a, (e) => r(e), () => r()), Ie(a, n), M(e, a), z();
}
// svelte/lib/ui/Switch.svelte
var Lr = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"checked",
	"class",
	"onchange",
	"onCheckedChange"
]), Rr = c("<span class=\"tw:relative tw:inline-flex tw:shrink-0 tw:align-middle\"><input/> <span aria-hidden=\"true\"></span></span>");
function zr(e, t) {
	A(t, !0);
	let n = L(t, "checked", 15, !1), r = ce(t, Lr);
	var a = Rr(), o = i(a), s = (e) => {
		t.onchange?.(e), t.onCheckedChange?.(e.currentTarget.checked);
	};
	me(o, (e) => ({
		type: "checkbox",
		role: "switch",
		"aria-checked": n(),
		...r,
		onchange: s,
		class: e
	}), [() => Me("tw:m-0 tw:h-5 tw:w-9 tw:appearance-none tw:rounded-full tw:border tw:border-transparent tw:bg-input tw:p-0 tw:outline-none tw:transition-colors tw:checked:bg-primary tw:focus-visible:ring-2 tw:focus-visible:ring-ring tw:focus-visible:ring-offset-2 tw:focus-visible:ring-offset-background tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:motion-reduce:transition-none", t.class)], void 0, void 0, void 0, !0);
	var c = N(o, 2);
	B(a), x((e) => _e(c, 1, e), [() => je(Me("tw:pointer-events-none tw:absolute tw:left-0.5 tw:top-0.5 tw:size-4 tw:rounded-full tw:bg-card tw:shadow-xs tw:transition-transform tw:motion-reduce:transition-none", n() ? "tw:translate-x-4" : "tw:translate-x-0"))]), de(o, n), M(e, a), z();
}
// svelte/lib/ui/RadioGroup.svelte
var Br = c("<span aria-hidden=\"true\" class=\"tw:pointer-events-none tw:absolute tw:inset-1 tw:rounded-full tw:bg-primary\"></span>"), Vr = c("<label class=\"tw:flex tw:items-center tw:gap-2\"><span class=\"tw:relative tw:inline-flex tw:size-4 tw:shrink-0\"><input type=\"radio\" class=\"tw:m-0 tw:size-4 tw:appearance-none tw:rounded-full tw:border tw:border-input tw:bg-card tw:p-0 tw:outline-none tw:checked:border-primary tw:focus-visible:ring-2 tw:focus-visible:ring-ring tw:focus-visible:ring-offset-2 tw:focus-visible:ring-offset-background tw:disabled:opacity-50\"/> <!></span> <span> </span></label>"), Hr = c("<div role=\"radiogroup\"></div>");
function Ur(e, t) {
	let n = E();
	A(t, !0);
	let r = [], a = L(t, "value", 15, ""), s = L(t, "name", 3, n), c = L(t, "disabled", 3, !1);
	var l = Hr();
	Ve(l, 21, () => t.items, (e) => e.value, (e, n) => {
		var l = Vr(), u = i(l), d = i(u);
		De(d);
		var f, p = N(d, 2), m = (e) => {
			var t = Br();
			M(e, t);
		};
		W(p, (e) => {
			a() === O(n).value && e(m);
		}), B(u);
		var g = N(u, 2), _ = h(g, !0);
		B(l), x(() => {
			ze(d, "name", s()), d.disabled = c() || O(n).disabled, f !== (f = O(n).value) && (d.value = (d.__value = f) ?? ""), o(_, O(n).label);
		}), we("change", d, () => t.onValueChange?.(O(n).value)), Ae(r, [], d, () => (O(n).value, a()), a), M(e, l);
	}), B(l), x((e) => {
		ze(l, "aria-label", t.label), _e(l, 1, e);
	}, [() => je(Me("tw:grid tw:grid-cols-1 tw:gap-2 tw:font-sans tw:text-sm tw:text-foreground", t.class))]), M(e, l), z();
}
n(["change"]);
// svelte/lib/ui/Tooltip.svelte
var Wr = c("<!> <!>", 1);
function Gr(t, n) {
	A(n, !0);
	var r = u(), i = F(r);
	be(i, () => Nr, (t, r) => {
		r(t, {
			delayDuration: 250,
			children: (t, r) => {
				var i = u(), s = F(i);
				be(s, () => Er, (t, r) => {
					r(t, {
						children: (t, r) => {
							var i = Wr(), s = F(i);
							{
								let e = R(() => Oe({
									variant: "ghost",
									size: "icon"
								}));
								be(s, () => Mr, (t, r) => {
									r(t, {
										type: "button",
										get "aria-label"() {
											return n.label;
										},
										get class() {
											return O(e);
										},
										children: (e, t) => {
											var r = u(), i = F(r);
											V(i, () => n.children), M(e, r);
										},
										$$slots: { default: !0 }
									});
								});
							}
							var c = N(s, 2);
							be(c, () => a, (t, r) => {
								r(t, {
									children: (t, r) => {
										var i = u(), a = F(i);
										be(a, () => kr, (t, r) => {
											r(t, {
												"data-vb-native": !0,
												sideOffset: 6,
												class: "tw:z-50 tw:m-0 tw:box-border tw:max-w-xs tw:rounded-control tw:border tw:border-solid tw:border-border tw:bg-popover tw:px-3 tw:py-1.5 tw:font-sans tw:text-xs tw:leading-4 tw:text-popover-foreground tw:shadow-md",
												children: (t, r) => {
													e();
													var i = H();
													x(() => o(i, n.label)), M(t, i);
												},
												$$slots: { default: !0 }
											});
										}), M(t, i);
									},
									$$slots: { default: !0 }
								});
							}), M(t, i);
						},
						$$slots: { default: !0 }
					});
				}), M(t, i);
			},
			$$slots: { default: !0 }
		});
	}), M(t, r), z();
}
// svelte/lib/ui/Card.svelte
var Kr = c("<h2 class=\"tw:m-0 tw:font-sans tw:text-base tw:font-semibold tw:leading-6 tw:tracking-normal\"> </h2>"), qr = c("<p class=\"tw:m-0 tw:text-sm tw:leading-5 tw:text-muted-foreground\"> </p>"), Jr = c("<div class=\"tw:space-y-1\"><!><!></div>"), Yr = c("<section><!> <!></section>");
function Xr(e, t) {
	A(t, !0);
	var n = Yr(), r = i(n), a = (e) => {
		var n = Jr(), r = i(n), a = (e) => {
			var n = Kr(), r = h(n, !0);
			x(() => o(r, t.title)), M(e, n);
		};
		W(r, (e) => {
			t.title && e(a);
		});
		var s = N(r), c = (e) => {
			var n = qr(), r = h(n, !0);
			x(() => o(r, t.description)), M(e, n);
		};
		W(s, (e) => {
			t.description && e(c);
		}), B(n), M(e, n);
	};
	W(r, (e) => {
		(t.title || t.description) && e(a);
	});
	var s = N(r, 2);
	V(s, () => t.children), B(n), x((e) => _e(n, 1, e), [() => je(Me("tw:space-y-4 tw:rounded-surface tw:border tw:border-border tw:bg-card tw:p-5 tw:font-sans tw:text-sm tw:text-card-foreground tw:shadow-xs", t.class))]), M(e, n), z();
}
// svelte/lib/ui/Separator.svelte
var Zr = c("<div role=\"separator\"></div>");
function Qr(e, t) {
	A(t, !0);
	let n = L(t, "vertical", 3, !1);
	var r = Zr();
	x((e) => {
		ze(r, "aria-orientation", n() ? "vertical" : "horizontal"), _e(r, 1, e);
	}, [() => je(Me("tw:shrink-0 tw:bg-border", n() ? "tw:h-full tw:w-px" : "tw:h-px tw:w-full", t.class))]), M(e, r), z();
}
// svelte/lib/ui/Skeleton.svelte
var $r = c("<div aria-hidden=\"true\"></div>");
function ei(e, t) {
	A(t, !0);
	var n = $r();
	x((e) => _e(n, 1, e), [() => je(Me("tw:animate-pulse tw:rounded-control tw:bg-muted tw:motion-reduce:animate-none", t.class))]), M(e, n), z();
}
// svelte/lib/components/LoadingState.svelte
var ti = c("<div role=\"status\" class=\"tw:inline-flex tw:items-center tw:gap-2 tw:font-sans tw:text-sm tw:text-muted-foreground\"><span aria-hidden=\"true\" class=\"tw:size-4 tw:animate-spin tw:rounded-full tw:border-2 tw:border-current tw:border-r-transparent tw:motion-reduce:animate-none\"></span> </div>");
function ni(e, t) {
	var n = ti(), r = N(i(n), 1, !0);
	B(n), x(() => o(r, t.label)), M(e, n);
}
// svelte/gallery/Gallery.svelte
var ri = c("<div class=\"tw:flex tw:flex-wrap tw:gap-2\"></div> <div class=\"tw:flex tw:flex-wrap tw:items-center tw:gap-2\"><!><!><!><!><!></div> <p class=\"tw:m-0 tw:text-xs tw:text-muted-foreground\"> </p>", 1), ii = c("<!> <!> <!> <!>", 1), ai = c("<div class=\"tw:flex tw:items-center tw:gap-2\"><!><label for=\"gallery-checkbox\">Include archived rooms</label></div> <div class=\"tw:flex tw:items-center tw:gap-2\"><!><label for=\"gallery-switch\">Notifications</label></div> <!> <!> <output data-selection-state=\"\" class=\"tw:block tw:text-xs tw:text-muted-foreground\" aria-live=\"polite\"> </output>", 1), oi = c("<!><!>", 1), si = c("<p class=\"tw:m-0 tw:text-muted-foreground\">The same dialog primitives support mobile and desktop layouts.</p> <!>", 1), ci = c("<p class=\"tw:m-0 tw:rounded-control tw:border tw:border-border tw:p-3\"> </p>"), li = c("<div class=\"tw:flex tw:flex-wrap tw:gap-2\"><!> <!></div> <!>", 1), ui = c("<div class=\"tw:flex tw:items-center tw:gap-3\"><!><!><!><span class=\"tw:text-muted-foreground\">Images and initials share one frame.</span></div> <!> <div class=\"tw:flex tw:flex-wrap tw:gap-2\"><!><!><!><!><!></div> <div class=\"tw:flex tw:items-center tw:gap-3\"><!> <div class=\"tw:flex-1 tw:space-y-2\"><!><!></div></div>", 1), di = c("<h3 class=\"tw:m-0 tw:font-sans tw:text-xl tw:font-semibold tw:leading-7 tw:tracking-tight\">Inter variable — headings and UI</h3> <p class=\"tw:m-0 tw:text-sm tw:leading-5\">Body 400 · medium 500 · semibold 500 · bold 600. English and\n          Portuguese: Olá, colaboração, ações.</p> <p class=\"tw:m-0 tw:text-muted-foreground\">Muted text uses the Studio semantic role.</p> <pre class=\"tw:m-0 tw:overflow-auto tw:rounded-control tw:border tw:border-border tw:bg-muted tw:p-3 tw:font-mono tw:text-sm tw:leading-6\"><code>const room = \"fully typed\";</code></pre>", 1), fi = c("<main data-vb-native=\"\" class=\"tw:m-0 tw:box-border tw:min-h-dvh tw:bg-background tw:px-4 tw:py-8 tw:font-sans tw:text-sm tw:font-normal tw:leading-5 tw:text-foreground tw:sm:px-8\" data-gallery=\"\"><div class=\"tw:mx-auto tw:max-w-6xl tw:space-y-6\"><header class=\"tw:flex tw:flex-wrap tw:items-start tw:justify-between tw:gap-4\"><div class=\"tw:space-y-2\"><a href=\"/app?ui=svelte\" class=\"tw:text-sm tw:text-link tw:underline-offset-4 tw:hover:underline\">vibebook</a> <h1 class=\"tw:m-0 tw:font-sans tw:text-2xl tw:font-semibold tw:leading-8 tw:tracking-tight\">Component gallery</h1> <p class=\"tw:m-0 tw:text-muted-foreground\">Shared primitives, Studio tokens, and one Tailwind entry.</p></div> <div class=\"tw:flex tw:items-center tw:gap-2\"><!><!></div></header> <div class=\"tw:grid tw:grid-cols-1 tw:gap-5 tw:md:grid-cols-2\"><!> <!> <!> <!> <!> <!> <!> <!></div> <p role=\"status\" class=\"tw:min-h-5 tw:text-sm tw:text-muted-foreground\"> </p></div></main>");
function pi(t, n) {
	A(n, !0);
	let r = y("light"), a = y(""), s = y(""), c = y(!1), l = y(!1), u = y("room"), d = y("general"), f = y("all"), m = y(0), g = y("");
	j(() => {
		document.documentElement.dataset.theme = O(r);
	});
	let _ = [
		"primary",
		"secondary",
		"outline",
		"ghost",
		"destructive",
		"link"
	];
	var b = fi(), S = i(b), C = i(S), w = N(i(C), 2), T = i(w);
	{
		let e = R(() => O(r) === "light" ? "Use dark theme" : "Use light theme"), t = R(() => O(r) === "light" ? "moon" : "sun");
		Re(T, {
			get label() {
				return O(e);
			},
			get icon() {
				return O(t);
			},
			variant: "outline",
			onclick: () => p(r, O(r) === "light" ? "dark" : "light", !0)
		});
	}
	var E = N(T);
	Pe(E, {
		children: (t, n) => {
			e();
			var i = H();
			x(() => o(i, O(r))), M(t, i);
		},
		$$slots: { default: !0 }
	}), B(w), B(C);
	var D = N(C, 2), ee = i(D);
	Xr(ee, {
		title: "Actions",
		description: "Variants share focus, disabled and loading behavior.",
		children: (t, n) => {
			var r = ri(), a = F(r);
			Ve(a, 21, () => _, Ke, (t, n) => {
				he(t, {
					get variant() {
						return O(n);
					},
					onclick: () => {
						p(m, O(m) + 1), p(g, `${O(n)} activated`);
					},
					children: (t, r) => {
						e();
						var i = H();
						x(() => o(i, O(n))), M(t, i);
					},
					$$slots: { default: !0 }
				});
			}), B(a);
			var s = N(a, 2), c = i(s);
			he(c, {
				disabled: !0,
				children: (t, n) => {
					e();
					var r = H("Disabled");
					M(t, r);
				},
				$$slots: { default: !0 }
			});
			var l = N(c);
			he(l, {
				loading: !0,
				children: (t, n) => {
					e();
					var r = H("Saving");
					M(t, r);
				},
				$$slots: { default: !0 }
			});
			var u = N(l);
			he(u, {
				size: "sm",
				variant: "outline",
				children: (t, n) => {
					e();
					var r = H("Small");
					M(t, r);
				},
				$$slots: { default: !0 }
			});
			var d = N(u);
			Re(d, {
				label: "Add item",
				icon: "plus",
				onclick: () => p(m, O(m) + 1)
			}), Gr(N(d), {
				label: "Search rooms",
				children: (e, t) => {
					ye(e, { name: "search" });
				},
				$$slots: { default: !0 }
			}), B(s);
			var f = N(s, 2), v = h(f);
			x(() => o(v, `Actions: ${O(m) ?? ""}`)), M(t, r);
		},
		$$slots: { default: !0 }
	});
	var te = N(ee, 2);
	Xr(te, {
		title: "Fields",
		description: "Labels, hints and errors have explicit associations.",
		children: (e, t) => {
			var n = ii(), r = F(n);
			Le(r, {
				id: "gallery-title",
				label: "Room name",
				hint: "Choose a name your team recognizes.",
				children: (e, t = U) => {
					ke(e, k(t, {
						placeholder: "Project room",
						get value() {
							return O(a);
						},
						set value(e) {
							p(a, e, !0);
						}
					}));
				},
				$$slots: { default: !0 }
			});
			var i = N(r, 2);
			Le(i, {
				id: "gallery-email",
				label: "Email",
				error: "Enter a valid email address.",
				children: (e, t = U) => {
					ke(e, k(t, {
						type: "email",
						value: "invalid"
					}));
				},
				$$slots: { default: !0 }
			});
			var o = N(i, 2);
			Le(o, {
				id: "gallery-notes",
				label: "Notes",
				children: (e, t = U) => {
					Ir(e, k(t, {
						placeholder: "Write a note",
						get value() {
							return O(s);
						},
						set value(e) {
							p(s, e, !0);
						}
					}));
				},
				$$slots: { default: !0 }
			});
			var c = N(o, 2);
			Le(c, {
				id: "gallery-disabled",
				label: "Unavailable",
				children: (e, t = U) => {
					ke(e, k(t, {
						disabled: !0,
						value: "Disabled input"
					}));
				},
				$$slots: { default: !0 }
			}), M(e, n);
		},
		$$slots: { default: !0 }
	});
	var ne = N(te, 2);
	Xr(ne, {
		title: "Selection",
		description: "Keyboard controls use native semantics or Bits UI behavior.",
		children: (t, n) => {
			var r = ai(), a = F(r), s = i(a);
			xe(s, {
				id: "gallery-checkbox",
				get checked() {
					return O(c);
				},
				set checked(e) {
					p(c, e, !0);
				}
			}), e(), B(a);
			var d = N(a, 2);
			zr(i(d), {
				id: "gallery-switch",
				get checked() {
					return O(l);
				},
				set checked(e) {
					p(l, e, !0);
				}
			}), e(), B(d);
			var m = N(d, 2);
			Ur(m, {
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
					return O(u);
				},
				set value(e) {
					p(u, e, !0);
				}
			});
			var g = N(m, 2);
			Le(g, {
				id: "gallery-filter",
				label: "Show",
				children: (e, t = U) => {
					ue(e, k(t, {
						items: [{
							value: "all",
							label: "All rooms"
						}, {
							value: "active",
							label: "Active rooms"
						}],
						get value() {
							return O(f);
						},
						set value(e) {
							p(f, e, !0);
						}
					}));
				},
				$$slots: { default: !0 }
			});
			var _ = N(g, 2), v = h(_);
			x(() => o(v, `${O(u) ?? ""} · ${O(f) ?? ""}`)), M(t, r);
		},
		$$slots: { default: !0 }
	});
	var re = N(ne, 2);
	Xr(re, {
		title: "Overlays",
		description: "Focus trap, Escape dismissal and focus restoration are provided by Bits UI.",
		children: (t, n) => {
			var r = li(), s = F(r), c = i(s);
			ge(c, {
				title: "Edit room",
				description: "Changes apply to the current room.",
				closeLabel: "Close dialog",
				trigger: (t) => {
					e();
					var n = H("Open dialog");
					M(t, n);
				},
				children: (t) => {
					var n = oi(), r = F(n);
					Le(r, {
						id: "dialog-name",
						label: "Name",
						children: (e, t = U) => {
							ke(e, k(t, {
								get value() {
									return O(a);
								},
								set value(e) {
									p(a, e, !0);
								}
							}));
						},
						$$slots: { default: !0 }
					});
					var i = N(r);
					he(i, {
						onclick: () => p(g, "Dialog action completed"),
						children: (t, n) => {
							e();
							var r = H("Save name");
							M(t, r);
						},
						$$slots: { default: !0 }
					}), M(t, n);
				},
				$$slots: {
					trigger: !0,
					default: !0
				}
			});
			var l = N(c, 2);
			ge(l, {
				title: "Room details",
				description: "A responsive sheet shares the dialog behavior.",
				closeLabel: "Close sheet",
				sheet: !0,
				trigger: (t) => {
					e();
					var n = H("Open sheet");
					M(t, n);
				},
				children: (e) => {
					var t = si(), n = N(F(t), 2);
					ke(n, {
						"aria-label": "Sheet note",
						placeholder: "Add a note"
					}), M(e, t);
				},
				$$slots: {
					trigger: !0,
					default: !0
				}
			}), B(s);
			var u = N(s, 2);
			Ee(u, {
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
					return O(d);
				},
				set value(e) {
					p(d, e, !0);
				},
				children: (e, t = U) => {
					var n = ci(), r = h(n, !0);
					x(() => o(r, t() === "general" ? "General settings" : "Room members")), M(e, n);
				},
				$$slots: { default: !0 }
			}), M(t, r);
		},
		$$slots: { default: !0 }
	});
	var ie = N(re, 2);
	Xr(ie, {
		title: "Identity and feedback",
		children: (t, n) => {
			var r = ui(), a = F(r), o = i(a);
			v(o, { name: "Gimenes" });
			var s = N(o);
			v(s, { name: "Guilherme Rodrigues" });
			var c = N(s);
			v(c, {
				name: "Sample user",
				src: "/favicon.svg"
			}), e(), B(a);
			var l = N(a, 2);
			Qr(l, {});
			var u = N(l, 2), d = i(u);
			Pe(d, {
				children: (t, n) => {
					e();
					var r = H("Default");
					M(t, r);
				},
				$$slots: { default: !0 }
			});
			var f = N(d);
			Pe(f, {
				variant: "primary",
				children: (t, n) => {
					e();
					var r = H("Selected");
					M(t, r);
				},
				$$slots: { default: !0 }
			});
			var p = N(f);
			Pe(p, {
				variant: "success",
				children: (t, n) => {
					e();
					var r = H("Complete");
					M(t, r);
				},
				$$slots: { default: !0 }
			});
			var m = N(p);
			Pe(m, {
				variant: "warning",
				children: (t, n) => {
					e();
					var r = H("Waiting");
					M(t, r);
				},
				$$slots: { default: !0 }
			});
			var h = N(m);
			Pe(h, {
				variant: "destructive",
				children: (t, n) => {
					e();
					var r = H("Failed");
					M(t, r);
				},
				$$slots: { default: !0 }
			}), B(u);
			var g = N(u, 2), _ = i(g);
			ei(_, { class: "tw:size-9 tw:rounded-full" });
			var y = N(_, 2), b = i(y);
			ei(b, { class: "tw:h-3 tw:w-3/4" }), ei(N(b), { class: "tw:h-3 tw:w-1/2" }), B(y), B(g), M(t, r);
		},
		$$slots: { default: !0 }
	});
	var P = N(ie, 2);
	Xr(P, {
		title: "Empty states",
		children: (t, n) => {
			pe(t, {
				title: "Nothing waiting for you",
				description: "New requests and tasks in review will appear here.",
				children: (t, n) => {
					he(t, {
						variant: "outline",
						onclick: () => p(g, "Empty state action completed"),
						children: (t, n) => {
							e();
							var r = H("Explore rooms");
							M(t, r);
						},
						$$slots: { default: !0 }
					});
				},
				$$slots: { default: !0 }
			});
		},
		$$slots: { default: !0 }
	});
	var I = N(P, 2);
	Xr(I, {
		title: "Status feedback",
		children: (e, t) => {
			var n = oi(), r = F(n);
			ni(r, { label: "Saving changes" });
			var i = N(r);
			Fe(i, {
				title: "Could not save changes",
				description: "Your draft is still available.",
				retryLabel: "Try again",
				onretry: () => p(g, "Retry requested")
			}), M(e, n);
		},
		$$slots: { default: !0 }
	}), Xr(N(I, 2), {
		title: "Typography",
		class: "tw:md:col-span-2",
		children: (t, n) => {
			var r = di();
			e(6), M(t, r);
		},
		$$slots: { default: !0 }
	}), B(D);
	var ae = N(D, 2), L = h(ae, !0);
	B(S), B(b), x(() => o(L, O(g))), M(t, b), z();
}
// svelte/gallery/main.ts
function mi(e) {
	let t = ne(pi, { target: e });
	return () => Ue(t);
}
export { mi as mountGallery };
