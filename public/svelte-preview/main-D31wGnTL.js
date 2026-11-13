import { $t as e, A as t, At as n, B as r, Bt as i, C as a, Ct as o, D as s, Dt as c, E as l, Et as u, F as d, Ft as f, G as p, Gt as m, H as h, Ht as g, I as _, It as v, J as y, Jt as b, K as x, Kt as S, L as C, Lt as w, M as T, N as E, Nt as D, O, Ot as k, P as ee, Pt as A, Qt as j, R as M, Rt as te, S as ne, St as re, T as ie, Tt as N, U as P, Ut as ae, V as oe, Vt as se, W as F, Wt as I, X as L, Xt as R, Y as ce, Yt as le, Zt as z, _ as ue, a as de, at as fe, b as pe, c as me, d as he, en as B, g as ge, gt as V, h as _e, ht as ve, i as ye, it as be, j as xe, jt as Se, k as Ce, kt as H, l as we, m as Te, mt as Ee, n as De, nt as Oe, o as ke, ot as Ae, p as je, pt as Me, q as Ne, r as Pe, rt as Fe, s as Ie, st as Le, t as Re, tt as ze, u as Be, v as Ve, vt as He, w as Ue, wt as We, x as Ge, xt as U, y as Ke, yt as qe, z as Je, zt as W } from "./Field-BcGmxIzD.js";
// node_modules/svelte-toolbelt/dist/utils/on-mount-effect.svelte.js
function Ye(e) {
	w(() => f(() => e()));
}
// node_modules/bits-ui/dist/bits/utilities/floating-layer/floating-root.svelte.js
var Xe = new Je("Floating.Root"), Ze = new Je("Floating.Root"), Qe = class e {
	static create(t = !1) {
		return t ? Ze.set(new e()) : Xe.set(new e());
	}
	anchorNode = F(null);
	customAnchorNode = F(null);
	triggerNode = F(null);
	constructor() {
		w(() => {
			this.customAnchorNode.current ? typeof this.customAnchorNode.current == "string" ? this.anchorNode.current = document.querySelector(this.customAnchorNode.current) : this.anchorNode.current = this.customAnchorNode.current : this.anchorNode.current = this.triggerNode.current;
		});
	}
};
// node_modules/bits-ui/dist/bits/utilities/floating-layer/components/floating-layer.svelte
function $e(e, t) {
	z(t, !0);
	let n = y(t, "tooltip", 3, !1);
	Qe.create(f(() => n()));
	var r = u(), a = i(r);
	V(a, () => t.children ?? B), N(e, r), R();
}
// node_modules/bits-ui/dist/internal/floating-svelte/floating-utils.svelte.js
function et(e) {
	return typeof e == "function" ? e() : e;
}
function tt(e) {
	return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function nt(e, t) {
	let n = tt(e);
	return Math.round(t * n) / n;
}
function rt(e) {
	return {
		[`--bits-${e}-content-transform-origin`]: "var(--bits-floating-transform-origin)",
		[`--bits-${e}-content-available-width`]: "var(--bits-floating-available-width)",
		[`--bits-${e}-content-available-height`]: "var(--bits-floating-available-height)",
		[`--bits-${e}-anchor-width`]: "var(--bits-floating-anchor-width)",
		[`--bits-${e}-anchor-height`]: "var(--bits-floating-anchor-height)"
	};
}
// node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs
var it = [
	"top",
	"right",
	"bottom",
	"left"
], G = Math.min, K = Math.max, at = Math.round, ot = Math.floor, q = (e) => ({
	x: e,
	y: e
}), st = {
	left: "right",
	right: "left",
	bottom: "top",
	top: "bottom"
};
function ct(e, t, n) {
	return K(e, G(t, n));
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
// node_modules/@floating-ui/core/dist/floating-ui.core.mjs
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
		let w = b / 2 - x / 2, T = C / 2 - h[m] / 2 - 1, E = G(d[_], T), D = G(d[v], T), O = C - h[m] - D, k = C / 2 - h[m] / 2 + w, ee = ct(E, k, O), A = !c.arrow && ut(i) != null && k !== ee && a.reference[m] / 2 - (k < E ? E : D) - h[m] / 2 < 0, j = A ? k < E ? k - E : k - O : 0;
		return {
			[p]: f[p] + j,
			data: {
				[p]: ee,
				centerOffset: k - ee - j,
				...A && { alignmentOffset: j }
			},
			reset: A
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
	return it.some((t) => e[t] >= 0);
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
			let g = p - c.top - c.bottom, _ = f - c.left - c.right, v = G(p - c[m], g), y = G(f - c[h], _), b = t.middlewareData.shift, x = !b, S = v, C = y;
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
// node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs
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
		s = K(n.top, s), c = G(n.right, c), l = G(n.bottom, l), u = K(n.left, u);
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
			threshold: K(0, G(1, c)) || 1
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
// node_modules/bits-ui/dist/internal/floating-svelte/use-floating.svelte.js
function qn(e) {
	let t = e.whileElementsMounted, n = b(() => et(e.open) ?? !0), r = b(() => et(e.middleware)), i = b(() => et(e.transform) ?? !0), a = b(() => et(e.placement) ?? "bottom"), o = b(() => et(e.strategy) ?? "absolute"), s = b(() => et(e.sideOffset) ?? 0), c = b(() => et(e.alignOffset) ?? 0), l = e.reference, u;
	te(() => {
		u = {
			middleware: A(r),
			placement: A(a),
			strategy: A(o),
			open: A(n),
			sideOffset: A(s),
			alignOffset: A(c)
		};
	});
	let d = m(0), f = m(0), p = F(null), h = m(ae(A(o))), g = m(ae(A(a))), _ = m(ae({})), v = m(!1), y = !1, x = 0, S = !1, C = b(() => {
		let e = p.current ? nt(p.current, A(d)) : A(d), t = p.current ? nt(p.current, A(f)) : A(f);
		return A(i) ? {
			position: A(h),
			left: "0",
			top: "0",
			transform: `translate(${e}px, ${t}px)`,
			...p.current && tt(p.current) >= 1.5 && { willChange: "transform" }
		} : {
			position: A(h),
			left: `${e}px`,
			top: `${t}px`
		};
	}), T;
	function E() {
		if (S || l.current === null || p.current === null) return;
		let e = l.current, t = p.current, n = ++x;
		Kn(e, t, {
			middleware: u.middleware,
			placement: u.placement,
			strategy: u.strategy
		}).then((r) => {
			if (n === x && l.current === e && p.current === t) {
				if (Jn(e)) I(_, {
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
					I(d, r.x, !0), I(f, r.y, !0), I(h, r.strategy, !0), I(g, r.placement, !0), I(_, r.middlewareData, !0), I(v, !0);
				}
			}
		});
	}
	function D() {
		typeof T == "function" && (T(), T = void 0), x++;
	}
	function O() {
		D(), t === void 0 ? (k(), E()) : A(n) && l.current !== null && p.current !== null && (k(), T = t(l.current, p.current, E));
	}
	function k() {
		return [
			A(r),
			A(a),
			A(o)
		];
	}
	function ee() {
		!A(n) && p.current === null && I(v, !1);
	}
	function j() {
		return [
			A(r),
			A(a),
			A(o),
			A(s),
			A(c),
			A(n)
		];
	}
	return w(() => {
		t === void 0 && A(n) && (k(), E());
	}), w(O), w(() => {
		t !== void 0 && (j(), A(n) && A(v) ? y ? E() : y = !0 : y = !1);
	}), w(ee), w(() => () => {
		S = !0, D();
	}), {
		floating: p,
		reference: l,
		get strategy() {
			return A(h);
		},
		get placement() {
			return A(g);
		},
		get middlewareData() {
			return A(_);
		},
		get isPositioned() {
			return A(v);
		},
		get floatingStyles() {
			return A(C);
		},
		get update() {
			return E;
		}
	};
}
function Jn(e) {
	return e instanceof Element ? !e.isConnected || e instanceof HTMLElement && e.hidden ? !0 : e.getClientRects().length === 0 : !1;
}
// node_modules/bits-ui/dist/bits/utilities/floating-layer/use-floating-layer.svelte.js
var Yn = {
	top: "bottom",
	right: "left",
	bottom: "top",
	left: "right"
}, Xn = new Je("Floating.Content"), Zn = class e {
	static create(t, n = !1) {
		return n ? Xn.set(new e(t, Ze.get())) : Xn.set(new e(t, Xe.get()));
	}
	opts;
	root;
	contentRef = F(null);
	wrapperRef = F(null);
	arrowRef = F(null);
	contentAttachment = T(this.contentRef);
	wrapperAttachment = T(this.wrapperRef);
	arrowAttachment = T(this.arrowRef);
	arrowId = F(ge());
	#e = b(() => {
		if (typeof this.opts.style == "string") return h(this.opts.style);
		if (!this.opts.style) return {};
	});
	#t = void 0;
	#n = new C(() => this.arrowRef.current ?? void 0);
	#r = b(() => this.#n?.width ?? 0);
	#i = b(() => this.#n?.height ?? 0);
	#a = b(() => this.opts.side?.current + (this.opts.align.current === "center" ? "" : `-${this.opts.align.current}`));
	#o = b(() => (Array.isArray(this.opts.collisionBoundary.current) ? this.opts.collisionBoundary.current : [this.opts.collisionBoundary.current]).filter(O));
	#s = b(() => A(this.#o).length > 0);
	get hasExplicitBoundaries() {
		return A(this.#s);
	}
	set hasExplicitBoundaries(e) {
		I(this.#s, e);
	}
	#c = b(() => ({
		padding: this.opts.collisionPadding.current,
		boundary: A(this.#o),
		altBoundary: this.hasExplicitBoundaries
	}));
	get detectOverflowOptions() {
		return A(this.#c);
	}
	set detectOverflowOptions(e) {
		I(this.#c, e);
	}
	#l = m(void 0);
	#u = m(void 0);
	#d = m(void 0);
	#f = m(void 0);
	#p = b(() => [
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
				I(this.#l, t, !0), I(this.#u, n, !0), I(this.#d, r, !0), I(this.#f, i, !0);
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
		I(this.#p, e);
	}
	floating;
	#m = b(() => er(this.floating.placement));
	get placedSide() {
		return A(this.#m);
	}
	set placedSide(e) {
		I(this.#m, e);
	}
	#h = b(() => tr(this.floating.placement));
	get placedAlign() {
		return A(this.#h);
	}
	set placedAlign(e) {
		I(this.#h, e);
	}
	#g = b(() => this.floating.middlewareData.arrow?.x ?? 0);
	get arrowX() {
		return A(this.#g);
	}
	set arrowX(e) {
		I(this.#g, e);
	}
	#_ = b(() => this.floating.middlewareData.arrow?.y ?? 0);
	get arrowY() {
		return A(this.#_);
	}
	set arrowY(e) {
		I(this.#_, e);
	}
	#v = b(() => this.floating.middlewareData.arrow?.centerOffset !== 0);
	get cannotCenterArrow() {
		return A(this.#v);
	}
	set cannotCenterArrow(e) {
		I(this.#v, e);
	}
	#y = m("auto");
	get contentZIndex() {
		return A(this.#y);
	}
	set contentZIndex(e) {
		I(this.#y, e, !0);
	}
	#b = b(() => Yn[this.placedSide]);
	get arrowBaseSide() {
		return A(this.#b);
	}
	set arrowBaseSide(e) {
		I(this.#b, e);
	}
	#x = b(() => ({
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
		I(this.#x, e);
	}
	#S = b(() => ({
		"data-side": this.placedSide,
		"data-align": this.placedAlign,
		style: oe({ ...A(this.#e) }),
		...this.contentAttachment
	}));
	get props() {
		return A(this.#S);
	}
	set props(e) {
		I(this.#S, e);
	}
	#C = b(() => ({
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
		I(this.#C, e);
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
		}), w(() => {
			this.floating.isPositioned && this.opts.onPlaced?.current();
		}), M([() => this.contentRef.current, () => this.opts.enabled.current], ([e, t]) => {
			if (!e || !t) return;
			let n = d(e), r = n.requestAnimationFrame(() => {
				if (this.contentRef.current !== e || !this.opts.enabled.current) return;
				let t = n.getComputedStyle(e).zIndex;
				t !== this.contentZIndex && (this.contentZIndex = t);
			});
			return () => {
				n.cancelAnimationFrame(r);
			};
		}), w(() => {
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
// node_modules/bits-ui/dist/bits/utilities/floating-layer/components/floating-layer-content.svelte
function nr(e, t) {
	z(t, !0);
	let n = y(t, "side", 3, "bottom"), a = y(t, "sideOffset", 3, 0), o = y(t, "align", 3, "center"), s = y(t, "alignOffset", 3, 0), c = y(t, "arrowPadding", 3, 0), l = y(t, "avoidCollisions", 3, !0), d = y(t, "collisionBoundary", 19, () => []), p = y(t, "collisionPadding", 3, 0), m = y(t, "hideWhenDetached", 3, !1), h = y(t, "onPlaced", 3, () => {}), g = y(t, "sticky", 3, "partial"), _ = y(t, "updatePositionStrategy", 3, "optimized"), v = y(t, "strategy", 3, "fixed"), x = y(t, "dir", 3, "ltr"), S = y(t, "style", 19, () => ({})), C = y(t, "wrapperId", 19, ge), w = y(t, "customAnchor", 3, null), T = y(t, "tooltip", 3, !1), E = Zn.create({
		side: P(() => n()),
		sideOffset: P(() => a()),
		align: P(() => o()),
		alignOffset: P(() => s()),
		id: P(() => t.id),
		arrowPadding: P(() => c()),
		avoidCollisions: P(() => l()),
		collisionBoundary: P(() => d()),
		collisionPadding: P(() => p()),
		hideWhenDetached: P(() => m()),
		onPlaced: P(() => h()),
		sticky: P(() => g()),
		updatePositionStrategy: P(() => _()),
		strategy: P(() => v()),
		dir: P(() => x()),
		style: P(() => S()),
		enabled: P(() => t.enabled),
		wrapperId: P(() => C()),
		customAnchor: P(() => w())
	}, f(() => T())), D = b(() => r(E.wrapperProps, { style: { pointerEvents: "auto" } }));
	var O = u(), k = i(O);
	V(k, () => t.content ?? B, () => ({
		props: E.props,
		wrapperProps: A(D)
	})), N(e, O), R();
}
// node_modules/bits-ui/dist/bits/utilities/floating-layer/components/floating-layer-content-static.svelte
function rr(e, t) {
	z(t, !0), Ne(() => {
		t.onPlaced?.();
	});
	var n = u(), r = i(n);
	V(r, () => t.content ?? B, () => ({
		props: {},
		wrapperProps: {}
	})), N(e, n), R();
}
// node_modules/bits-ui/dist/bits/utilities/popper-layer/popper-content.svelte
var ir = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"content",
	"isStatic",
	"onPlaced"
]);
function ar(e, t) {
	let n = y(t, "isStatic", 3, !1), r = ce(t, ir);
	var a = u(), o = i(a), s = (e) => {
		rr(e, {
			get content() {
				return t.content;
			},
			get onPlaced() {
				return t.onPlaced;
			}
		});
	}, c = (e) => {
		nr(e, L({
			get content() {
				return t.content;
			},
			get onPlaced() {
				return t.onPlaced;
			}
		}, () => r));
	};
	U(o, (e) => {
		n() ? e(s) : e(c, -1);
	}), N(e, a);
}
// node_modules/bits-ui/dist/bits/utilities/popper-layer/popper-layer-inner.svelte
var or = /* @__PURE__ */ new Set(/* @__PURE__ */ "$$slots.$$events.$$legacy.popper.onEscapeKeydown.escapeKeydownBehavior.preventOverflowTextSelection.id.onPointerDown.onPointerUp.side.sideOffset.align.alignOffset.arrowPadding.avoidCollisions.collisionBoundary.collisionPadding.sticky.hideWhenDetached.updatePositionStrategy.strategy.dir.preventScroll.wrapperId.style.onPlaced.onInteractOutside.onCloseAutoFocus.onOpenAutoFocus.onFocusOutside.interactOutsideBehavior.loop.trapFocus.isValidEvent.customAnchor.isStatic.enabled.forceMount.ref.tooltip.contentPointerEvents".split(".")), sr = c("<!> <!>", 1);
function cr(e, t) {
	z(t, !0);
	let n = y(t, "interactOutsideBehavior", 3, "close"), a = y(t, "trapFocus", 3, !0), o = y(t, "isValidEvent", 3, () => !1), s = y(t, "customAnchor", 3, null), c = y(t, "isStatic", 3, !1), l = y(t, "tooltip", 3, !1), d = y(t, "contentPointerEvents", 3, "auto"), f = ce(t, or), p = b(() => t.preventScroll ?? !0), m = b(() => t.strategy ?? (A(p) ? "fixed" : "absolute"));
	ar(e, {
		get isStatic() {
			return c();
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
			return A(m);
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
			return s();
		},
		get enabled() {
			return t.enabled;
		},
		get tooltip() {
			return l();
		},
		content: (e, s) => {
			let c = () => (s?.()).props, l = () => (s?.()).wrapperProps;
			var m = sr(), h = i(m), _ = (e) => {
				_e(e, { get preventScroll() {
					return A(p);
				} });
			}, v = (e) => {
				_e(e, { get preventScroll() {
					return A(p);
				} });
			};
			U(h, (e) => {
				t.forceMount && t.enabled ? e(_) : t.forceMount || e(v, 1);
			});
			var y = g(h, 2);
			Ve(y, {
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
					return a();
				},
				get forceMount() {
					return t.forceMount;
				},
				get ref() {
					return t.ref;
				},
				focusScope: (e, a) => {
					let s = () => (a?.()).props;
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
						children: (e, a) => {
							pe(e, {
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
									return o();
								},
								get enabled() {
									return t.enabled;
								},
								get ref() {
									return t.ref;
								},
								children: (e, n) => {
									let a = () => (n?.()).props;
									ue(e, {
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
											var o = u(), p = i(o);
											{
												let e = b(() => ({
													props: r(f, c(), a(), s(), {
														id: t.id,
														style: { pointerEvents: d() }
													}),
													wrapperProps: l()
												}));
												V(p, () => t.popper ?? B, () => A(e));
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
			}), N(e, m);
		},
		$$slots: { content: !0 }
	}), R();
}
// node_modules/bits-ui/dist/bits/utilities/popper-layer/popper-layer.svelte
var lr = /* @__PURE__ */ new Set(/* @__PURE__ */ "$$slots.$$events.$$legacy.popper.open.onEscapeKeydown.escapeKeydownBehavior.preventOverflowTextSelection.id.onPointerDown.onPointerUp.side.sideOffset.align.alignOffset.arrowPadding.avoidCollisions.collisionBoundary.collisionPadding.sticky.hideWhenDetached.updatePositionStrategy.strategy.dir.preventScroll.wrapperId.style.onPlaced.onInteractOutside.onCloseAutoFocus.onOpenAutoFocus.onFocusOutside.interactOutsideBehavior.loop.trapFocus.isValidEvent.customAnchor.isStatic.ref.shouldRender".split("."));
function ur(e, t) {
	let n = y(t, "interactOutsideBehavior", 3, "close"), r = y(t, "trapFocus", 3, !0), a = y(t, "isValidEvent", 3, () => !1), o = y(t, "customAnchor", 3, null), s = y(t, "isStatic", 3, !1), c = ce(t, lr);
	var l = u(), d = i(l), f = (e) => {
		cr(e, L({
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
				return a();
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
	U(d, (e) => {
		t.shouldRender && e(f);
	}), N(e, l);
}
// node_modules/bits-ui/dist/bits/utilities/popper-layer/popper-layer-force-mount.svelte
var dr = /* @__PURE__ */ new Set(/* @__PURE__ */ "$$slots.$$events.$$legacy.popper.onEscapeKeydown.escapeKeydownBehavior.preventOverflowTextSelection.id.onPointerDown.onPointerUp.side.sideOffset.align.alignOffset.arrowPadding.avoidCollisions.collisionBoundary.collisionPadding.sticky.hideWhenDetached.updatePositionStrategy.strategy.dir.preventScroll.wrapperId.style.onPlaced.onInteractOutside.onCloseAutoFocus.onOpenAutoFocus.onFocusOutside.interactOutsideBehavior.loop.trapFocus.isValidEvent.customAnchor.isStatic.enabled".split("."));
function fr(e, t) {
	let n = y(t, "interactOutsideBehavior", 3, "close"), r = y(t, "trapFocus", 3, !0), i = y(t, "isValidEvent", 3, () => !1), a = y(t, "customAnchor", 3, null), o = y(t, "isStatic", 3, !1), s = ce(t, dr);
	cr(e, L({
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
			let r = ee(e);
			return [
				D(r, "pointermove", (n) => {
					this.#p([n.clientX, n.clientY], e, t);
				}),
				D(e, "pointerleave", (e) => {
					let n = e.relatedTarget;
					if (l(n) && t.contains(n)) return;
					let r = this.#e.ignoredTargets?.() ?? [];
					l(n) && r.some((e) => e === n || e.contains(n)) || (this.#a = l(n) && r.length > 0 ? r.filter((e) => n.contains(e)) : [], this.#r = [e.clientX, e.clientY], this.#i = "content", this.#u());
				}),
				D(e, "pointerenter", () => {
					this.#m();
				}),
				D(t, "pointerenter", () => {
					this.#m();
				}),
				D(t, "pointerleave", (t) => {
					let n = t.relatedTarget;
					l(n) && e.contains(n) || (this.#r = [t.clientX, t.clientY], this.#i = "trigger", this.#u());
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
		this.#t = e, this.#e = t, this.stop = this.stop.bind(this), this.start = this.start.bind(this), _(this.stop);
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
}, vr = t({
	component: "tooltip",
	parts: ["content", "trigger"]
}), yr = new Je("Tooltip.Provider"), br = new Je("Tooltip.Root"), xr = class {
	triggers = /* @__PURE__ */ new Map();
	#e = m(0);
	#t = m(null);
	get activeTriggerId() {
		return A(this.#t);
	}
	set activeTriggerId(e) {
		I(this.#t, e, !0);
	}
	#n = b(() => {
		A(this.#e);
		let e = this.activeTriggerId;
		return e === null ? null : this.triggers.get(e)?.node ?? null;
	});
	get activeTriggerNode() {
		return A(this.#n);
	}
	set activeTriggerNode(e) {
		I(this.#n, e);
	}
	#r = b(() => {
		A(this.#e);
		let e = this.activeTriggerId;
		return e === null ? null : this.triggers.get(e)?.payload ?? null;
	});
	get activePayload() {
		return A(this.#r);
	}
	set activePayload(e) {
		I(this.#r, e);
	}
	register = (e) => {
		this.triggers.set(e.id, e), e.id === this.activeTriggerId && S(this.#e);
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
	#e = m(!0);
	get isOpenDelayed() {
		return A(this.#e);
	}
	set isOpenDelayed(e) {
		I(this.#e, e, !0);
	}
	isPointerInTransit = F(!1);
	#t;
	#n = m(null);
	#r = !1;
	constructor(e) {
		this.opts = e, this.#t = new _r(() => {
			this.isOpenDelayed = !0;
		}, this.opts.skipDelayDuration.current), Ye(() => D(window, "scroll", (e) => {
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
		A(this.#n) && A(this.#n) !== e && A(this.#n).handleClose(), this.#a(), this.isOpenDelayed = !1, I(this.#n, e, !0);
	};
	onClose = (e) => {
		A(this.#n) === e && (I(this.#n, null), this.#i());
	};
	isTooltipOpen = (e) => A(this.#n) === e;
}, Cr = class e {
	static create(t) {
		return br.set(new e(t, yr.get()));
	}
	opts;
	provider;
	#e = b(() => this.opts.delayDuration.current ?? this.provider.opts.delayDuration.current);
	get delayDuration() {
		return A(this.#e);
	}
	set delayDuration(e) {
		I(this.#e, e);
	}
	#t = b(() => this.opts.disableHoverableContent.current ?? this.provider.opts.disableHoverableContent.current);
	get disableHoverableContent() {
		return A(this.#t);
	}
	set disableHoverableContent(e) {
		I(this.#t, e);
	}
	#n = b(() => this.opts.disableCloseOnTriggerClick.current ?? this.provider.opts.disableCloseOnTriggerClick.current);
	get disableCloseOnTriggerClick() {
		return A(this.#n);
	}
	set disableCloseOnTriggerClick(e) {
		I(this.#n, e);
	}
	#r = b(() => this.opts.disabled.current ?? this.provider.opts.disabled.current);
	get disabled() {
		return A(this.#r);
	}
	set disabled(e) {
		I(this.#r, e);
	}
	#i = b(() => this.opts.ignoreNonKeyboardFocus.current ?? this.provider.opts.ignoreNonKeyboardFocus.current);
	get ignoreNonKeyboardFocus() {
		return A(this.#i);
	}
	set ignoreNonKeyboardFocus(e) {
		I(this.#i, e);
	}
	registry;
	tether;
	#a = m(null);
	get contentNode() {
		return A(this.#a);
	}
	set contentNode(e) {
		I(this.#a, e, !0);
	}
	contentPresence;
	#o = m(!1);
	#s = m(!1);
	get openedViaFocus() {
		return A(this.#s);
	}
	set openedViaFocus(e) {
		I(this.#s, e, !0);
	}
	#c;
	#l = b(() => this.opts.open.current ? A(this.#o) ? "delayed-open" : "instant-open" : "closed");
	get stateAttr() {
		return A(this.#l);
	}
	set stateAttr(e) {
		I(this.#l, e);
	}
	constructor(e, t) {
		this.opts = e, this.provider = t, this.tether = e.tether.current?.state ?? null, this.registry = this.tether?.registry ?? new xr(), this.#c = new _r(() => {
			I(this.#o, !0), this.opts.open.current = !0;
		}, this.delayDuration ?? 0), this.tether && (this.tether.root = this, Ye(() => () => {
			this.tether?.root === this && (this.tether.root = null);
		})), this.contentPresence = new ie({
			open: this.opts.open,
			ref: P(() => this.contentNode),
			onComplete: () => {
				this.opts.onOpenChangeComplete.current(this.opts.open.current);
			}
		}), M(() => this.delayDuration, () => {
			this.delayDuration !== void 0 && (this.#c = new _r(() => {
				I(this.#o, !0), this.opts.open.current = !0;
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
		this.#c.stop(), I(this.#o, !1), this.ensureActiveTrigger(), this.opts.open.current = !0;
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
		e || t === 0 ? (I(this.#o, !1), this.opts.open.current = !0) : this.#c.start();
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
	#e = F(!1);
	#t = null;
	#n = m(!1);
	domContext;
	#r = null;
	#i = !1;
	#a = null;
	constructor(e, t, n) {
		this.opts = e, this.root = t, this.tether = n, this.domContext = new E(e.ref), this.attachment = T(this.opts.ref, (e) => e ? this.#c(e) : this.#l()), M(() => this.opts.id.current, () => {
			this.#c(this.opts.ref.current);
		}), M(() => this.opts.payload.current, () => {
			this.#c(this.opts.ref.current);
		}), M(() => this.opts.disabled.current, () => {
			this.#c(this.opts.ref.current);
		}), Ye(() => (this.#i = !0, this.#c(this.opts.ref.current), () => {
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
			t.provider.isPointerInTransit.current && (t.provider.isPointerInTransit.current = !1, t.onTriggerEnter(this.opts.id.current), I(this.#n, !0));
		}, 250)) : (t.onTriggerEnter(this.opts.id.current), I(this.#n, !0))));
	};
	#h = (e) => {
		let t = this.#o();
		t && (this.#s() ? t.opts.open.current && t.handleClose() : e.pointerType !== "touch" && (A(this.#n) || (this.#d(), t.provider.isPointerInTransit.current = !1, t.onTriggerEnter(this.opts.id.current), I(this.#n, !0))));
	};
	#g = (e) => {
		let t = this.#o();
		if (!t || this.#s()) return;
		if (this.#d(), !t.isActiveTrigger(this.opts.id.current)) {
			I(this.#n, !1);
			return;
		}
		let n = e.relatedTarget;
		if (l(n)) {
			for (let e of t.registry.triggers.values()) if (e.node === n) {
				if (t.provider.opts.skipDelayDuration.current > 0) {
					I(this.#n, !1);
					return;
				}
				t.handleClose(), I(this.#n, !1);
				return;
			}
		}
		t.onTriggerLeave(), I(this.#n, !1);
	};
	#_ = (e) => {
		let t = this.#o();
		t && (this.#e.current || this.#t !== "touch" && (this.#s() ? t.opts.open.current && t.handleClose() : (!t.ignoreNonKeyboardFocus || s(e.currentTarget)) && (t.setActiveTrigger(this.opts.id.current), t.openedViaFocus = !0, t.handleOpen(), t.provider.ignoreFocusScroll())));
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
	#b = b(() => {
		let e = this.#o(), t = !!(e?.opts.open.current && e.isActiveTrigger(this.opts.id.current)), n = this.#s();
		return {
			id: this.opts.id.current,
			"aria-describedby": t ? e?.contentNode?.id : void 0,
			"data-state": t ? e?.stateAttr : "closed",
			"data-disabled": Ce(n),
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
		I(this.#b, e);
	}
}, Tr = class e {
	static create(t) {
		return new e(t, br.get());
	}
	opts;
	root;
	attachment;
	constructor(e, t) {
		this.opts = e, this.root = t, this.attachment = T(this.opts.ref, (e) => this.root.contentNode = e), new gr({
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
	#e = b(() => ({ open: this.root.opts.open.current }));
	get snippetProps() {
		return A(this.#e);
	}
	set snippetProps(e) {
		I(this.#e, e);
	}
	#t = b(() => ({
		id: this.opts.id.current,
		"data-state": this.root.stateAttr,
		"data-disabled": Ce(this.root.disabled),
		...xe(this.root.contentPresence.transitionStatus),
		style: { outline: "none" },
		[vr.content]: "",
		...this.attachment
	}));
	get props() {
		return A(this.#t);
	}
	set props(e) {
		I(this.#t, e);
	}
	popperProps = {
		onInteractOutside: this.onInteractOutside,
		onEscapeKeydown: this.onEscapeKeydown,
		onOpenAutoFocus: this.onOpenAutoFocus,
		onCloseAutoFocus: this.onCloseAutoFocus
	};
};
// node_modules/bits-ui/dist/bits/tooltip/components/tooltip.svelte
function Er(e, t) {
	z(t, !0);
	let n = y(t, "open", 15, !1), r = y(t, "triggerId", 15, null), a = y(t, "onOpenChange", 3, Ue), o = y(t, "onOpenChangeComplete", 3, Ue), s = Cr.create({
		open: P(() => n(), (e) => {
			n(e), a()(e);
		}),
		triggerId: P(() => r(), (e) => {
			r(e);
		}),
		delayDuration: P(() => t.delayDuration),
		disableCloseOnTriggerClick: P(() => t.disableCloseOnTriggerClick),
		disableHoverableContent: P(() => t.disableHoverableContent),
		ignoreNonKeyboardFocus: P(() => t.ignoreNonKeyboardFocus),
		disabled: P(() => t.disabled),
		onOpenChangeComplete: P(() => o()),
		tether: P(() => t.tether)
	});
	$e(e, {
		tooltip: !0,
		children: (e, n) => {
			var r = u(), a = i(r);
			V(a, () => t.children ?? B, () => ({
				open: s.opts.open.current,
				triggerId: s.activeTriggerId,
				payload: s.activePayload
			})), N(e, r);
		},
		$$slots: { default: !0 }
	}), R();
}
// node_modules/bits-ui/dist/bits/tooltip/components/tooltip-content.svelte
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
function kr(t, n) {
	let o = k();
	z(n, !0);
	let s = y(n, "id", 19, () => a(o)), c = y(n, "ref", 15, null), l = y(n, "side", 3, "top"), d = y(n, "sideOffset", 3, 0), f = y(n, "align", 3, "center"), p = y(n, "avoidCollisions", 3, !0), m = y(n, "arrowPadding", 3, 0), h = y(n, "sticky", 3, "partial"), g = y(n, "hideWhenDetached", 3, !1), _ = y(n, "collisionPadding", 3, 0), v = y(n, "onInteractOutside", 3, Ue), x = y(n, "onEscapeKeydown", 3, Ue), S = y(n, "forceMount", 3, !1), C = ce(n, Dr), w = Tr.create({
		id: P(() => s()),
		ref: P(() => c(), (e) => c(e)),
		onInteractOutside: P(() => v()),
		onEscapeKeydown: P(() => x())
	}), T = b(() => ({
		side: l(),
		sideOffset: d(),
		align: f(),
		avoidCollisions: p(),
		arrowPadding: m(),
		sticky: h(),
		hideWhenDetached: g(),
		collisionPadding: _(),
		strategy: n.strategy,
		customAnchor: n.customAnchor ?? w.root.triggerNode
	})), E = b(() => r(C, A(T), w.props));
	var D = u(), O = i(D), ee = (t) => {
		{
			let a = (t, a) => {
				let o = () => (a?.()).props, s = () => (a?.()).wrapperProps, c = b(() => r(s(), { style: { pointerEvents: w.root.disableHoverableContent ? "none" : void 0 } })), l = b(() => r(o(), { style: rt("tooltip") }, { style: n.style }));
				var d = u(), f = i(d), p = (e) => {
					var t = u(), r = i(t);
					{
						let e = b(() => ({
							props: A(l),
							wrapperProps: A(c),
							...w.snippetProps
						}));
						V(r, () => n.child, () => A(e));
					}
					N(e, t);
				}, m = (t) => {
					var r = Or();
					fe(r, () => ({ ...A(c) }));
					var i = W(r);
					fe(i, () => ({ ...A(l) }));
					var a = W(i);
					V(a, () => n.children ?? B), e(i), e(r), N(t, r);
				};
				U(f, (e) => {
					n.child ? e(p) : e(m, -1);
				}), N(t, d);
			}, o = b(() => w.root.disableHoverableContent ? "none" : "auto");
			fr(t, L(() => A(E), () => w.popperProps, {
				get enabled() {
					return w.root.opts.open.current;
				},
				get id() {
					return s();
				},
				trapFocus: !1,
				loop: !1,
				preventScroll: !1,
				forceMount: !0,
				get ref() {
					return w.opts.ref;
				},
				tooltip: !0,
				get shouldRender() {
					return w.shouldRender;
				},
				get contentPointerEvents() {
					return A(o);
				},
				popper: a,
				$$slots: { popper: !0 }
			}));
		}
	}, j = (t) => {
		{
			let a = (t, a) => {
				let o = () => (a?.()).props, s = () => (a?.()).wrapperProps, c = b(() => r(s(), { style: { pointerEvents: w.root.disableHoverableContent ? "none" : void 0 } })), l = b(() => r(o(), { style: rt("tooltip") }, { style: n.style }));
				var d = u(), f = i(d), p = (e) => {
					var t = u(), r = i(t);
					{
						let e = b(() => ({
							props: A(l),
							wrapperProps: A(c),
							...w.snippetProps
						}));
						V(r, () => n.child, () => A(e));
					}
					N(e, t);
				}, m = (t) => {
					var r = Or();
					fe(r, () => ({ ...A(c) }));
					var i = W(r);
					fe(i, () => ({ ...A(l) }));
					var a = W(i);
					V(a, () => n.children ?? B), e(i), e(r), N(t, r);
				};
				U(f, (e) => {
					n.child ? e(p) : e(m, -1);
				}), N(t, d);
			}, o = b(() => w.root.disableHoverableContent ? "none" : "auto");
			ur(t, L(() => A(E), () => w.popperProps, {
				get open() {
					return w.root.opts.open.current;
				},
				get id() {
					return s();
				},
				trapFocus: !1,
				loop: !1,
				preventScroll: !1,
				forceMount: !1,
				get ref() {
					return w.opts.ref;
				},
				tooltip: !0,
				get shouldRender() {
					return w.shouldRender;
				},
				get contentPointerEvents() {
					return A(o);
				},
				popper: a,
				$$slots: { popper: !0 }
			}));
		}
	};
	U(O, (e) => {
		S() ? e(ee) : S() || e(j, 1);
	}), N(t, D), R();
}
// node_modules/bits-ui/dist/bits/tooltip/components/tooltip-trigger.svelte
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
function Mr(t, n) {
	let o = k();
	z(n, !0);
	let s = y(n, "id", 19, () => a(o)), c = y(n, "disabled", 3, !1), l = y(n, "type", 3, "button"), d = y(n, "tabindex", 3, 0), f = y(n, "ref", 15, null), p = ce(n, Ar), m = wr.create({
		id: P(() => s()),
		disabled: P(() => c() ?? !1),
		tabindex: P(() => d() ?? 0),
		payload: P(() => n.payload),
		tether: P(() => n.tether),
		ref: P(() => f(), (e) => f(e))
	}), h = b(() => r(p, m.props, { type: l() }));
	var g = u(), _ = i(g), v = (e) => {
		var t = u(), r = i(t);
		V(r, () => n.child, () => ({ props: A(h) })), N(e, t);
	}, x = (t) => {
		var r = jr();
		fe(r, () => ({ ...A(h) }));
		var i = W(r);
		V(i, () => n.children ?? B), e(r), N(t, r);
	};
	U(_, (e) => {
		n.child ? e(v) : e(x, -1);
	}), N(t, g), R();
}
// node_modules/bits-ui/dist/bits/tooltip/components/tooltip-provider.svelte
function Nr(e, t) {
	z(t, !0);
	let n = y(t, "delayDuration", 3, 700), r = y(t, "disableCloseOnTriggerClick", 3, !1), a = y(t, "disableHoverableContent", 3, !1), o = y(t, "disabled", 3, !1), s = y(t, "ignoreNonKeyboardFocus", 3, !1), c = y(t, "skipDelayDuration", 3, 300);
	Sr.create({
		delayDuration: P(() => n()),
		disableCloseOnTriggerClick: P(() => r()),
		disableHoverableContent: P(() => a()),
		disabled: P(() => o()),
		ignoreNonKeyboardFocus: P(() => s()),
		skipDelayDuration: P(() => c())
	});
	var l = u(), d = i(l);
	V(d, () => t.children ?? B), N(e, l), R();
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
	z(t, !0);
	let n = y(t, "value", 15, ""), r = y(t, "ref", 15, null), i = ce(t, Pr);
	var a = Fr();
	le(a), fe(a, (e) => ({
		class: e,
		...i
	}), [() => x("tw:min-h-24 tw:w-full tw:min-w-0 tw:rounded-control tw:border tw:border-input tw:bg-studio-input-background tw:px-3 tw:py-2 tw:font-sans tw:text-sm tw:font-normal tw:leading-5 tw:tracking-normal tw:text-foreground tw:outline-none tw:placeholder:text-muted-foreground tw:focus-visible:border-ring tw:focus-visible:ring-2 tw:focus-visible:ring-ring/30 tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-destructive/30", t.class)]), ze(a, (e) => r(e), () => r()), be(a, n), N(e, a), R();
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
function zr(t, n) {
	z(n, !0);
	let r = y(n, "checked", 15, !1), i = ce(n, Lr);
	var a = Rr(), o = W(a), s = (e) => {
		n.onchange?.(e), n.onCheckedChange?.(e.currentTarget.checked);
	};
	fe(o, (e) => ({
		type: "checkbox",
		role: "switch",
		"aria-checked": r(),
		...i,
		onchange: s,
		class: e
	}), [() => x("tw:m-0 tw:h-5 tw:w-9 tw:appearance-none tw:rounded-full tw:border tw:border-transparent tw:bg-input tw:p-0 tw:outline-none tw:transition-colors tw:checked:bg-primary tw:focus-visible:ring-2 tw:focus-visible:ring-ring tw:focus-visible:ring-offset-2 tw:focus-visible:ring-offset-background tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:motion-reduce:transition-none", n.class)], void 0, void 0, void 0, !0);
	var c = g(o, 2);
	e(a), v((e) => Me(c, 1, e), [() => Ee(x("tw:pointer-events-none tw:absolute tw:left-0.5 tw:top-0.5 tw:size-4 tw:rounded-full tw:bg-card tw:shadow-xs tw:transition-transform tw:motion-reduce:transition-none", r() ? "tw:translate-x-4" : "tw:translate-x-0"))]), Oe(o, r), N(t, a), R();
}
// svelte/lib/ui/RadioGroup.svelte
var Br = c("<span aria-hidden=\"true\" class=\"tw:pointer-events-none tw:absolute tw:inset-1 tw:rounded-full tw:bg-primary\"></span>"), Vr = c("<label class=\"tw:flex tw:items-center tw:gap-2\"><span class=\"tw:relative tw:inline-flex tw:size-4 tw:shrink-0\"><input type=\"radio\" class=\"tw:m-0 tw:size-4 tw:appearance-none tw:rounded-full tw:border tw:border-input tw:bg-card tw:p-0 tw:outline-none tw:checked:border-primary tw:focus-visible:ring-2 tw:focus-visible:ring-ring tw:focus-visible:ring-offset-2 tw:focus-visible:ring-offset-background tw:disabled:opacity-50\"/> <!></span> <span> </span></label>"), Hr = c("<div role=\"radiogroup\"></div>");
function Ur(t, n) {
	let r = k();
	z(n, !0);
	let i = [], a = y(n, "value", 15, ""), s = y(n, "name", 3, r), c = y(n, "disabled", 3, !1);
	var l = Hr();
	He(l, 21, () => n.items, (e) => e.value, (t, r) => {
		var l = Vr(), u = W(l), d = W(u);
		Ae(d);
		var f, p = g(d, 2), m = (e) => {
			var t = Br();
			N(e, t);
		};
		U(p, (e) => {
			a() === A(r).value && e(m);
		}), e(u);
		var h = g(u, 2), _ = se(h, !0);
		e(l), v(() => {
			Le(d, "name", s()), d.disabled = c() || A(r).disabled, f !== (f = A(r).value) && (d.value = (d.__value = f) ?? ""), o(_, A(r).label);
		}), Se("change", d, () => n.onValueChange?.(A(r).value)), Fe(i, [], d, () => (A(r).value, a()), a), N(t, l);
	}), e(l), v((e) => {
		Le(l, "aria-label", n.label), Me(l, 1, e);
	}, [() => Ee(x("tw:grid tw:grid-cols-1 tw:gap-2 tw:font-sans tw:text-sm tw:text-foreground", n.class))]), N(t, l), R();
}
n(["change"]);
// svelte/lib/ui/Tooltip.svelte
var Wr = c("<!> <!>", 1);
function Gr(e, t) {
	z(t, !0);
	var n = u(), r = i(n);
	ve(r, () => Nr, (e, n) => {
		n(e, {
			delayDuration: 250,
			children: (e, n) => {
				var r = u(), a = i(r);
				ve(a, () => Er, (e, n) => {
					n(e, {
						children: (e, n) => {
							var r = Wr(), a = i(r);
							{
								let e = b(() => je({
									variant: "ghost",
									size: "icon"
								}));
								ve(a, () => Mr, (n, r) => {
									r(n, {
										type: "button",
										get "aria-label"() {
											return t.label;
										},
										get class() {
											return A(e);
										},
										children: (e, n) => {
											var r = u(), a = i(r);
											V(a, () => t.children), N(e, r);
										},
										$$slots: { default: !0 }
									});
								});
							}
							var s = g(a, 2);
							ve(s, () => ne, (e, n) => {
								n(e, {
									children: (e, n) => {
										var r = u(), a = i(r);
										ve(a, () => kr, (e, n) => {
											n(e, {
												"data-vb-native": !0,
												sideOffset: 6,
												class: "tw:z-50 tw:m-0 tw:box-border tw:max-w-xs tw:rounded-control tw:border tw:border-solid tw:border-border tw:bg-popover tw:px-3 tw:py-1.5 tw:font-sans tw:text-xs tw:leading-4 tw:text-popover-foreground tw:shadow-md",
												children: (e, n) => {
													j();
													var r = H();
													v(() => o(r, t.label)), N(e, r);
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
	}), N(e, n), R();
}
// svelte/lib/ui/Card.svelte
var Kr = c("<h2 class=\"tw:m-0 tw:font-sans tw:text-base tw:font-semibold tw:leading-6 tw:tracking-normal\"> </h2>"), qr = c("<p class=\"tw:m-0 tw:text-sm tw:leading-5 tw:text-muted-foreground\"> </p>"), Jr = c("<div class=\"tw:space-y-1\"><!><!></div>"), Yr = c("<section><!> <!></section>");
function Xr(t, n) {
	z(n, !0);
	var r = Yr(), i = W(r), a = (t) => {
		var r = Jr(), i = W(r), a = (e) => {
			var t = Kr(), r = se(t, !0);
			v(() => o(r, n.title)), N(e, t);
		};
		U(i, (e) => {
			n.title && e(a);
		});
		var s = g(i), c = (e) => {
			var t = qr(), r = se(t, !0);
			v(() => o(r, n.description)), N(e, t);
		};
		U(s, (e) => {
			n.description && e(c);
		}), e(r), N(t, r);
	};
	U(i, (e) => {
		(n.title || n.description) && e(a);
	});
	var s = g(i, 2);
	V(s, () => n.children), e(r), v((e) => Me(r, 1, e), [() => Ee(x("tw:space-y-4 tw:rounded-surface tw:border tw:border-border tw:bg-card tw:p-5 tw:font-sans tw:text-sm tw:text-card-foreground tw:shadow-xs", n.class))]), N(t, r), R();
}
// svelte/lib/ui/Separator.svelte
var Zr = c("<div role=\"separator\"></div>");
function Qr(e, t) {
	z(t, !0);
	let n = y(t, "vertical", 3, !1);
	var r = Zr();
	v((e) => {
		Le(r, "aria-orientation", n() ? "vertical" : "horizontal"), Me(r, 1, e);
	}, [() => Ee(x("tw:shrink-0 tw:bg-border", n() ? "tw:h-full tw:w-px" : "tw:h-px tw:w-full", t.class))]), N(e, r), R();
}
// svelte/lib/ui/Skeleton.svelte
var $r = c("<div aria-hidden=\"true\"></div>");
function ei(e, t) {
	z(t, !0);
	var n = $r();
	v((e) => Me(n, 1, e), [() => Ee(x("tw:animate-pulse tw:rounded-control tw:bg-muted tw:motion-reduce:animate-none", t.class))]), N(e, n), R();
}
// svelte/lib/components/LoadingState.svelte
var ti = c("<div role=\"status\" class=\"tw:inline-flex tw:items-center tw:gap-2 tw:font-sans tw:text-sm tw:text-muted-foreground\"><span aria-hidden=\"true\" class=\"tw:size-4 tw:animate-spin tw:rounded-full tw:border-2 tw:border-current tw:border-r-transparent tw:motion-reduce:animate-none\"></span> </div>");
function ni(t, n) {
	var r = ti(), i = g(W(r), 1, !0);
	e(r), v(() => o(i, n.label)), N(t, r);
}
// svelte/gallery/Gallery.svelte
var ri = c("<div class=\"tw:flex tw:flex-wrap tw:gap-2\"></div> <div class=\"tw:flex tw:flex-wrap tw:items-center tw:gap-2\"><!><!><!><!><!></div> <p class=\"tw:m-0 tw:text-xs tw:text-muted-foreground\"> </p>", 1), ii = c("<!> <!> <!> <!>", 1), ai = c("<div class=\"tw:flex tw:items-center tw:gap-2\"><!><label for=\"gallery-checkbox\">Include archived rooms</label></div> <div class=\"tw:flex tw:items-center tw:gap-2\"><!><label for=\"gallery-switch\">Notifications</label></div> <!> <!> <output data-selection-state=\"\" class=\"tw:block tw:text-xs tw:text-muted-foreground\" aria-live=\"polite\"> </output>", 1), oi = c("<!><!>", 1), si = c("<p class=\"tw:m-0 tw:text-muted-foreground\">The same dialog primitives support mobile and desktop layouts.</p> <!>", 1), ci = c("<p class=\"tw:m-0 tw:rounded-control tw:border tw:border-border tw:p-3\"> </p>"), li = c("<div class=\"tw:flex tw:flex-wrap tw:gap-2\"><!> <!></div> <!>", 1), ui = c("<div class=\"tw:flex tw:items-center tw:gap-3\"><!><!><!><span class=\"tw:text-muted-foreground\">Images and initials share one frame.</span></div> <!> <div class=\"tw:flex tw:flex-wrap tw:gap-2\"><!><!><!><!><!></div> <div class=\"tw:flex tw:items-center tw:gap-3\"><!> <div class=\"tw:flex-1 tw:space-y-2\"><!><!></div></div>", 1), di = c("<h3 class=\"tw:m-0 tw:font-sans tw:text-xl tw:font-semibold tw:leading-7 tw:tracking-tight\">Inter variable — headings and UI</h3> <p class=\"tw:m-0 tw:text-sm tw:leading-5\">Body 400 · medium 500 · semibold 500 · bold 600. English and\n          Portuguese: Olá, colaboração, ações.</p> <p class=\"tw:m-0 tw:text-muted-foreground\">Muted text uses the Studio semantic role.</p> <pre class=\"tw:m-0 tw:overflow-auto tw:rounded-control tw:border tw:border-border tw:bg-muted tw:p-3 tw:font-mono tw:text-sm tw:leading-6\"><code>const room = \"fully typed\";</code></pre>", 1), fi = c("<main data-vb-native=\"\" class=\"tw:m-0 tw:box-border tw:min-h-dvh tw:bg-background tw:px-4 tw:py-8 tw:font-sans tw:text-sm tw:font-normal tw:leading-5 tw:text-foreground tw:sm:px-8\" data-gallery=\"\"><div class=\"tw:mx-auto tw:max-w-6xl tw:space-y-6\"><header class=\"tw:flex tw:flex-wrap tw:items-start tw:justify-between tw:gap-4\"><div class=\"tw:space-y-2\"><a href=\"/app?ui=svelte\" class=\"tw:text-sm tw:text-link tw:underline-offset-4 tw:hover:underline\">vibebook</a> <h1 class=\"tw:m-0 tw:font-sans tw:text-2xl tw:font-semibold tw:leading-8 tw:tracking-tight\">Component gallery</h1> <p class=\"tw:m-0 tw:text-muted-foreground\">Shared primitives, Studio tokens, and one Tailwind entry.</p></div> <div class=\"tw:flex tw:items-center tw:gap-2\"><!><!></div></header> <div class=\"tw:grid tw:grid-cols-1 tw:gap-5 tw:md:grid-cols-2\"><!> <!> <!> <!> <!> <!> <!> <!></div> <p role=\"status\" class=\"tw:min-h-5 tw:text-sm tw:text-muted-foreground\"> </p></div></main>");
function pi(t, n) {
	z(n, !0);
	let r = m("light"), a = m(""), s = m(""), c = m(!1), l = m(!1), u = m("room"), d = m("general"), f = m("all"), h = m(0), _ = m("");
	w(() => {
		document.documentElement.dataset.theme = A(r);
	});
	let y = [
		"primary",
		"secondary",
		"outline",
		"ghost",
		"destructive",
		"link"
	];
	var x = fi(), S = W(x), C = W(S), T = g(W(C), 2), E = W(T);
	{
		let e = b(() => A(r) === "light" ? "Use dark theme" : "Use light theme"), t = b(() => A(r) === "light" ? "moon" : "sun");
		we(E, {
			get label() {
				return A(e);
			},
			get icon() {
				return A(t);
			},
			variant: "outline",
			onclick: () => I(r, A(r) === "light" ? "dark" : "light", !0)
		});
	}
	var D = g(E);
	De(D, {
		children: (e, t) => {
			j();
			var n = H();
			v(() => o(n, A(r))), N(e, n);
		},
		$$slots: { default: !0 }
	}), e(T), e(C);
	var O = g(C, 2), k = W(O);
	Xr(k, {
		title: "Actions",
		description: "Variants share focus, disabled and loading behavior.",
		children: (t, n) => {
			var r = ri(), a = i(r);
			He(a, 21, () => y, qe, (e, t) => {
				Be(e, {
					get variant() {
						return A(t);
					},
					onclick: () => {
						I(h, A(h) + 1), I(_, `${A(t)} activated`);
					},
					children: (e, n) => {
						j();
						var r = H();
						v(() => o(r, A(t))), N(e, r);
					},
					$$slots: { default: !0 }
				});
			}), e(a);
			var s = g(a, 2), c = W(s);
			Be(c, {
				disabled: !0,
				children: (e, t) => {
					j();
					var n = H("Disabled");
					N(e, n);
				},
				$$slots: { default: !0 }
			});
			var l = g(c);
			Be(l, {
				loading: !0,
				children: (e, t) => {
					j();
					var n = H("Saving");
					N(e, n);
				},
				$$slots: { default: !0 }
			});
			var u = g(l);
			Be(u, {
				size: "sm",
				variant: "outline",
				children: (e, t) => {
					j();
					var n = H("Small");
					N(e, n);
				},
				$$slots: { default: !0 }
			});
			var d = g(u);
			we(d, {
				label: "Add item",
				icon: "plus",
				onclick: () => I(h, A(h) + 1)
			}), Gr(g(d), {
				label: "Search rooms",
				children: (e, t) => {
					Te(e, { name: "search" });
				},
				$$slots: { default: !0 }
			}), e(s);
			var f = g(s, 2), p = se(f);
			v(() => o(p, `Actions: ${A(h) ?? ""}`)), N(t, r);
		},
		$$slots: { default: !0 }
	});
	var ee = g(k, 2);
	Xr(ee, {
		title: "Fields",
		description: "Labels, hints and errors have explicit associations.",
		children: (e, t) => {
			var n = ii(), r = i(n);
			Re(r, {
				id: "gallery-title",
				label: "Room name",
				hint: "Choose a name your team recognizes.",
				children: (e, t = B) => {
					de(e, L(t, {
						placeholder: "Project room",
						get value() {
							return A(a);
						},
						set value(e) {
							I(a, e, !0);
						}
					}));
				},
				$$slots: { default: !0 }
			});
			var o = g(r, 2);
			Re(o, {
				id: "gallery-email",
				label: "Email",
				error: "Enter a valid email address.",
				children: (e, t = B) => {
					de(e, L(t, {
						type: "email",
						value: "invalid"
					}));
				},
				$$slots: { default: !0 }
			});
			var c = g(o, 2);
			Re(c, {
				id: "gallery-notes",
				label: "Notes",
				children: (e, t = B) => {
					Ir(e, L(t, {
						placeholder: "Write a note",
						get value() {
							return A(s);
						},
						set value(e) {
							I(s, e, !0);
						}
					}));
				},
				$$slots: { default: !0 }
			});
			var l = g(c, 2);
			Re(l, {
				id: "gallery-disabled",
				label: "Unavailable",
				children: (e, t = B) => {
					de(e, L(t, {
						disabled: !0,
						value: "Disabled input"
					}));
				},
				$$slots: { default: !0 }
			}), N(e, n);
		},
		$$slots: { default: !0 }
	});
	var M = g(ee, 2);
	Xr(M, {
		title: "Selection",
		description: "Keyboard controls use native semantics or Bits UI behavior.",
		children: (t, n) => {
			var r = ai(), a = i(r), s = W(a);
			Pe(s, {
				id: "gallery-checkbox",
				get checked() {
					return A(c);
				},
				set checked(e) {
					I(c, e, !0);
				}
			}), j(), e(a);
			var d = g(a, 2);
			zr(W(d), {
				id: "gallery-switch",
				get checked() {
					return A(l);
				},
				set checked(e) {
					I(l, e, !0);
				}
			}), j(), e(d);
			var p = g(d, 2);
			Ur(p, {
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
					return A(u);
				},
				set value(e) {
					I(u, e, !0);
				}
			});
			var m = g(p, 2);
			Re(m, {
				id: "gallery-filter",
				label: "Show",
				children: (e, t = B) => {
					ye(e, L(t, {
						items: [{
							value: "all",
							label: "All rooms"
						}, {
							value: "active",
							label: "Active rooms"
						}],
						get value() {
							return A(f);
						},
						set value(e) {
							I(f, e, !0);
						}
					}));
				},
				$$slots: { default: !0 }
			});
			var h = g(m, 2), _ = se(h);
			v(() => o(_, `${A(u) ?? ""} · ${A(f) ?? ""}`)), N(t, r);
		},
		$$slots: { default: !0 }
	});
	var te = g(M, 2);
	Xr(te, {
		title: "Overlays",
		description: "Focus trap, Escape dismissal and focus restoration are provided by Bits UI.",
		children: (t, n) => {
			var r = li(), s = i(r), c = W(s);
			he(c, {
				title: "Edit room",
				description: "Changes apply to the current room.",
				closeLabel: "Close dialog",
				trigger: (e) => {
					j();
					var t = H("Open dialog");
					N(e, t);
				},
				children: (e) => {
					var t = oi(), n = i(t);
					Re(n, {
						id: "dialog-name",
						label: "Name",
						children: (e, t = B) => {
							de(e, L(t, {
								get value() {
									return A(a);
								},
								set value(e) {
									I(a, e, !0);
								}
							}));
						},
						$$slots: { default: !0 }
					});
					var r = g(n);
					Be(r, {
						onclick: () => I(_, "Dialog action completed"),
						children: (e, t) => {
							j();
							var n = H("Save name");
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
			var l = g(c, 2);
			he(l, {
				title: "Room details",
				description: "A responsive sheet shares the dialog behavior.",
				closeLabel: "Close sheet",
				sheet: !0,
				trigger: (e) => {
					j();
					var t = H("Open sheet");
					N(e, t);
				},
				children: (e) => {
					var t = si(), n = g(i(t), 2);
					de(n, {
						"aria-label": "Sheet note",
						placeholder: "Add a note"
					}), N(e, t);
				},
				$$slots: {
					trigger: !0,
					default: !0
				}
			}), e(s);
			var u = g(s, 2);
			me(u, {
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
					return A(d);
				},
				set value(e) {
					I(d, e, !0);
				},
				children: (e, t = B) => {
					var n = ci(), r = se(n, !0);
					v(() => o(r, t() === "general" ? "General settings" : "Room members")), N(e, n);
				},
				$$slots: { default: !0 }
			}), N(t, r);
		},
		$$slots: { default: !0 }
	});
	var ne = g(te, 2);
	Xr(ne, {
		title: "Identity and feedback",
		children: (t, n) => {
			var r = ui(), a = i(r), o = W(a);
			p(o, { name: "Gimenes" });
			var s = g(o);
			p(s, { name: "Guilherme Rodrigues" });
			var c = g(s);
			p(c, {
				name: "Sample user",
				src: "/favicon.svg"
			}), j(), e(a);
			var l = g(a, 2);
			Qr(l, {});
			var u = g(l, 2), d = W(u);
			De(d, {
				children: (e, t) => {
					j();
					var n = H("Default");
					N(e, n);
				},
				$$slots: { default: !0 }
			});
			var f = g(d);
			De(f, {
				variant: "primary",
				children: (e, t) => {
					j();
					var n = H("Selected");
					N(e, n);
				},
				$$slots: { default: !0 }
			});
			var m = g(f);
			De(m, {
				variant: "success",
				children: (e, t) => {
					j();
					var n = H("Complete");
					N(e, n);
				},
				$$slots: { default: !0 }
			});
			var h = g(m);
			De(h, {
				variant: "warning",
				children: (e, t) => {
					j();
					var n = H("Waiting");
					N(e, n);
				},
				$$slots: { default: !0 }
			});
			var _ = g(h);
			De(_, {
				variant: "destructive",
				children: (e, t) => {
					j();
					var n = H("Failed");
					N(e, n);
				},
				$$slots: { default: !0 }
			}), e(u);
			var v = g(u, 2), y = W(v);
			ei(y, { class: "tw:size-9 tw:rounded-full" });
			var b = g(y, 2), x = W(b);
			ei(x, { class: "tw:h-3 tw:w-3/4" }), ei(g(x), { class: "tw:h-3 tw:w-1/2" }), e(b), e(v), N(t, r);
		},
		$$slots: { default: !0 }
	});
	var re = g(ne, 2);
	Xr(re, {
		title: "Empty states",
		children: (e, t) => {
			Ie(e, {
				title: "Nothing waiting for you",
				description: "New requests and tasks in review will appear here.",
				children: (e, t) => {
					Be(e, {
						variant: "outline",
						onclick: () => I(_, "Empty state action completed"),
						children: (e, t) => {
							j();
							var n = H("Explore rooms");
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
	var ie = g(re, 2);
	Xr(ie, {
		title: "Status feedback",
		children: (e, t) => {
			var n = oi(), r = i(n);
			ni(r, { label: "Saving changes" });
			var a = g(r);
			ke(a, {
				title: "Could not save changes",
				description: "Your draft is still available.",
				retryLabel: "Try again",
				onretry: () => I(_, "Retry requested")
			}), N(e, n);
		},
		$$slots: { default: !0 }
	}), Xr(g(ie, 2), {
		title: "Typography",
		class: "tw:md:col-span-2",
		children: (e, t) => {
			var n = di();
			j(6), N(e, n);
		},
		$$slots: { default: !0 }
	}), e(O);
	var P = g(O, 2), ae = se(P, !0);
	e(S), e(x), v(() => o(ae, A(_))), N(t, x), R();
}
// svelte/gallery/main.ts
function mi(e) {
	let t = re(pi, { target: e });
	return () => We(t);
}
export { mi as mountGallery };
