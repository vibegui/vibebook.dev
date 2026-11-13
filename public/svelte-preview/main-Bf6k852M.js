import { $t as e, A as t, At as n, B as r, Bt as i, C as a, Ct as o, D as s, Dt as c, E as l, Et as u, F as d, Ft as f, G as p, Gt as m, H as h, Ht as g, I as _, It as v, Jt as y, K as b, Kt as x, L as S, Lt as C, M as w, Mt as T, N as E, Nt as D, O, Ot as k, P as ee, Q as A, Qt as j, R as te, Rt as ne, S as re, St as M, T as ie, Tt as N, U as ae, Ut as oe, V as P, Vt as se, W as F, Wt as I, X as L, Xt as R, Y as ce, Yt as le, Z as ue, Zt as z, _ as de, _t as fe, a as pe, at as me, b as he, bt as B, c as ge, ct as _e, d as ve, dt as ye, en as V, f as be, ft as xe, g as Se, h as Ce, ht as H, i as we, it as Te, j as Ee, k as De, kt as Oe, l as ke, lt as Ae, m as je, mt as Me, o as Ne, ot as Pe, q as Fe, r as Ie, rt as Le, s as Re, st as ze, t as Be, u as Ve, v as He, vt as Ue, w as We, wt as U, x as Ge, xt as Ke, y as qe, z as W, zt as G } from "./Field-Dw4795OZ.js";
// node_modules/svelte-toolbelt/dist/utils/on-mount-effect.svelte.js
function Je(e) {
	C(() => f(() => e()));
}
// node_modules/bits-ui/dist/bits/utilities/floating-layer/floating-root.svelte.js
var Ye = new r("Floating.Root"), Xe = new r("Floating.Root"), Ze = class e {
	static create(t = !1) {
		return t ? Xe.set(new e()) : Ye.set(new e());
	}
	anchorNode = p(null);
	customAnchorNode = p(null);
	triggerNode = p(null);
	constructor() {
		C(() => {
			this.customAnchorNode.current ? typeof this.customAnchorNode.current == "string" ? this.anchorNode.current = document.querySelector(this.customAnchorNode.current) : this.anchorNode.current = this.customAnchorNode.current : this.anchorNode.current = this.triggerNode.current;
		});
	}
};
// node_modules/bits-ui/dist/bits/utilities/floating-layer/components/floating-layer.svelte
function Qe(e, t) {
	z(t, !0);
	let n = L(t, "tooltip", 3, !1);
	Ze.create(f(() => n()));
	var r = N(), a = i(r);
	H(a, () => t.children ?? V), U(e, r), R();
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
		let w = b / 2 - x / 2, T = C / 2 - h[m] / 2 - 1, E = it(d[_], T), D = it(d[v], T), O = C - h[m] - D, k = C / 2 - h[m] / 2 + w, ee = ct(E, k, O), A = !c.arrow && ut(i) != null && k !== ee && a.reference[m] / 2 - (k < E ? E : D) - h[m] / 2 < 0, j = A ? k < E ? k - E : k - O : 0;
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
// node_modules/bits-ui/dist/internal/floating-svelte/use-floating.svelte.js
function qn(e) {
	let t = e.whileElementsMounted, n = y(() => $e(e.open) ?? !0), r = y(() => $e(e.middleware)), i = y(() => $e(e.transform) ?? !0), a = y(() => $e(e.placement) ?? "bottom"), o = y(() => $e(e.strategy) ?? "absolute"), s = y(() => $e(e.sideOffset) ?? 0), c = y(() => $e(e.alignOffset) ?? 0), l = e.reference, u;
	ne(() => {
		u = {
			middleware: D(r),
			placement: D(a),
			strategy: D(o),
			open: D(n),
			sideOffset: D(s),
			alignOffset: D(c)
		};
	});
	let d = m(0), f = m(0), h = p(null), g = m(oe(D(o))), _ = m(oe(D(a))), v = m(oe({})), b = m(!1), x = !1, S = 0, w = !1, T = y(() => {
		let e = h.current ? tt(h.current, D(d)) : D(d), t = h.current ? tt(h.current, D(f)) : D(f);
		return D(i) ? {
			position: D(g),
			left: "0",
			top: "0",
			transform: `translate(${e}px, ${t}px)`,
			...h.current && et(h.current) >= 1.5 && { willChange: "transform" }
		} : {
			position: D(g),
			left: `${e}px`,
			top: `${t}px`
		};
	}), E;
	function O() {
		if (w || l.current === null || h.current === null) return;
		let e = l.current, t = h.current, n = ++S;
		Kn(e, t, {
			middleware: u.middleware,
			placement: u.placement,
			strategy: u.strategy
		}).then((r) => {
			if (n === S && l.current === e && h.current === t) {
				if (Jn(e)) I(v, {
					...D(v),
					hide: {
						...D(v).hide,
						referenceHidden: !0
					}
				}, !0);
				else {
					if (!u.open && D(d) !== 0 && D(f) !== 0) {
						let e = Math.max(Math.abs(u.sideOffset), Math.abs(u.alignOffset), 15);
						if (r.x <= e && r.y <= e) return;
					}
					I(d, r.x, !0), I(f, r.y, !0), I(g, r.strategy, !0), I(_, r.placement, !0), I(v, r.middlewareData, !0), I(b, !0);
				}
			}
		});
	}
	function k() {
		typeof E == "function" && (E(), E = void 0), S++;
	}
	function ee() {
		k(), t === void 0 ? (A(), O()) : D(n) && l.current !== null && h.current !== null && (A(), E = t(l.current, h.current, O));
	}
	function A() {
		return [
			D(r),
			D(a),
			D(o)
		];
	}
	function j() {
		!D(n) && h.current === null && I(b, !1);
	}
	function te() {
		return [
			D(r),
			D(a),
			D(o),
			D(s),
			D(c),
			D(n)
		];
	}
	return C(() => {
		t === void 0 && D(n) && (A(), O());
	}), C(ee), C(() => {
		t !== void 0 && (te(), D(n) && D(b) ? x ? O() : x = !0 : x = !1);
	}), C(j), C(() => () => {
		w = !0, k();
	}), {
		floating: h,
		reference: l,
		get strategy() {
			return D(g);
		},
		get placement() {
			return D(_);
		},
		get middlewareData() {
			return D(v);
		},
		get isPositioned() {
			return D(b);
		},
		get floatingStyles() {
			return D(T);
		},
		get update() {
			return O;
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
}, Xn = new r("Floating.Content"), Zn = class e {
	static create(t, n = !1) {
		return n ? Xn.set(new e(t, Xe.get())) : Xn.set(new e(t, Ye.get()));
	}
	opts;
	root;
	contentRef = p(null);
	wrapperRef = p(null);
	arrowRef = p(null);
	contentAttachment = E(this.contentRef);
	wrapperAttachment = E(this.wrapperRef);
	arrowAttachment = E(this.arrowRef);
	arrowId = p(de());
	#e = y(() => {
		if (typeof this.opts.style == "string") return ae(this.opts.style);
		if (!this.opts.style) return {};
	});
	#t = void 0;
	#n = new te(() => this.arrowRef.current ?? void 0);
	#r = y(() => this.#n?.width ?? 0);
	#i = y(() => this.#n?.height ?? 0);
	#a = y(() => this.opts.side?.current + (this.opts.align.current === "center" ? "" : `-${this.opts.align.current}`));
	#o = y(() => (Array.isArray(this.opts.collisionBoundary.current) ? this.opts.collisionBoundary.current : [this.opts.collisionBoundary.current]).filter(De));
	#s = y(() => D(this.#o).length > 0);
	get hasExplicitBoundaries() {
		return D(this.#s);
	}
	set hasExplicitBoundaries(e) {
		I(this.#s, e);
	}
	#c = y(() => ({
		padding: this.opts.collisionPadding.current,
		boundary: D(this.#o),
		altBoundary: this.hasExplicitBoundaries
	}));
	get detectOverflowOptions() {
		return D(this.#c);
	}
	set detectOverflowOptions(e) {
		I(this.#c, e);
	}
	#l = m(void 0);
	#u = m(void 0);
	#d = m(void 0);
	#f = m(void 0);
	#p = y(() => [
		zn({
			mainAxis: this.opts.sideOffset.current + D(this.#i),
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
			arrowWidth: D(this.#r),
			arrowHeight: D(this.#i)
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
		return D(this.#p);
	}
	set middleware(e) {
		I(this.#p, e);
	}
	floating;
	#m = y(() => er(this.floating.placement));
	get placedSide() {
		return D(this.#m);
	}
	set placedSide(e) {
		I(this.#m, e);
	}
	#h = y(() => tr(this.floating.placement));
	get placedAlign() {
		return D(this.#h);
	}
	set placedAlign(e) {
		I(this.#h, e);
	}
	#g = y(() => this.floating.middlewareData.arrow?.x ?? 0);
	get arrowX() {
		return D(this.#g);
	}
	set arrowX(e) {
		I(this.#g, e);
	}
	#_ = y(() => this.floating.middlewareData.arrow?.y ?? 0);
	get arrowY() {
		return D(this.#_);
	}
	set arrowY(e) {
		I(this.#_, e);
	}
	#v = y(() => this.floating.middlewareData.arrow?.centerOffset !== 0);
	get cannotCenterArrow() {
		return D(this.#v);
	}
	set cannotCenterArrow(e) {
		I(this.#v, e);
	}
	#y = m("auto");
	get contentZIndex() {
		return D(this.#y);
	}
	set contentZIndex(e) {
		I(this.#y, e, !0);
	}
	#b = y(() => Yn[this.placedSide]);
	get arrowBaseSide() {
		return D(this.#b);
	}
	set arrowBaseSide(e) {
		I(this.#b, e);
	}
	#x = y(() => ({
		id: this.opts.wrapperId.current,
		"data-bits-floating-content-wrapper": "",
		style: {
			...this.floating.floatingStyles,
			transform: this.floating.isPositioned ? this.floating.floatingStyles.transform : "translate(0, -200%)",
			minWidth: "max-content",
			zIndex: this.contentZIndex,
			"--bits-floating-transform-origin": `${this.floating.middlewareData.transformOrigin?.x} ${this.floating.middlewareData.transformOrigin?.y}`,
			"--bits-floating-available-width": `${D(this.#l)}px`,
			"--bits-floating-available-height": `${D(this.#u)}px`,
			"--bits-floating-anchor-width": `${D(this.#d)}px`,
			"--bits-floating-anchor-height": `${D(this.#f)}px`,
			...(this.floating.middlewareData.hide?.referenceHidden || this.floating.middlewareData.hideClipping?.referenceHidden) && {
				visibility: "hidden",
				"pointer-events": "none"
			},
			...D(this.#e)
		},
		dir: this.opts.dir.current,
		...this.wrapperAttachment
	}));
	get wrapperProps() {
		return D(this.#x);
	}
	set wrapperProps(e) {
		I(this.#x, e);
	}
	#S = y(() => ({
		"data-side": this.placedSide,
		"data-align": this.placedAlign,
		style: h({ ...D(this.#e) }),
		...this.contentAttachment
	}));
	get props() {
		return D(this.#S);
	}
	set props(e) {
		I(this.#S, e);
	}
	#C = y(() => ({
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
		return D(this.#C);
	}
	set arrowStyle(e) {
		I(this.#C, e);
	}
	constructor(e, t) {
		this.opts = e, this.root = t, this.#t = e.updatePositionStrategy, e.customAnchor && (this.root.customAnchorNode.current = e.customAnchor.current), W(() => e.customAnchor.current, (e) => {
			this.root.customAnchorNode.current = e;
		}), this.floating = qn({
			strategy: () => this.opts.strategy.current,
			placement: () => D(this.#a),
			middleware: () => this.middleware,
			reference: this.root.anchorNode,
			whileElementsMounted: (...e) => Rn(...e, { animationFrame: this.#t?.current === "always" }),
			open: () => this.opts.enabled.current,
			sideOffset: () => this.opts.sideOffset.current,
			alignOffset: () => this.opts.alignOffset.current
		}), C(() => {
			this.floating.isPositioned && this.opts.onPlaced?.current();
		}), W([() => this.contentRef.current, () => this.opts.enabled.current], ([e, t]) => {
			if (!e || !t) return;
			let n = _(e), r = n.requestAnimationFrame(() => {
				if (this.contentRef.current !== e || !this.opts.enabled.current) return;
				let t = n.getComputedStyle(e).zIndex;
				t !== this.contentZIndex && (this.contentZIndex = t);
			});
			return () => {
				n.cancelAnimationFrame(r);
			};
		}), C(() => {
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
	let n = L(t, "side", 3, "bottom"), r = L(t, "sideOffset", 3, 0), a = L(t, "align", 3, "center"), o = L(t, "alignOffset", 3, 0), s = L(t, "arrowPadding", 3, 0), c = L(t, "avoidCollisions", 3, !0), l = L(t, "collisionBoundary", 19, () => []), u = L(t, "collisionPadding", 3, 0), d = L(t, "hideWhenDetached", 3, !1), p = L(t, "onPlaced", 3, () => {}), m = L(t, "sticky", 3, "partial"), h = L(t, "updatePositionStrategy", 3, "optimized"), g = L(t, "strategy", 3, "fixed"), _ = L(t, "dir", 3, "ltr"), v = L(t, "style", 19, () => ({})), b = L(t, "wrapperId", 19, de), x = L(t, "customAnchor", 3, null), S = L(t, "tooltip", 3, !1), C = Zn.create({
		side: F(() => n()),
		sideOffset: F(() => r()),
		align: F(() => a()),
		alignOffset: F(() => o()),
		id: F(() => t.id),
		arrowPadding: F(() => s()),
		avoidCollisions: F(() => c()),
		collisionBoundary: F(() => l()),
		collisionPadding: F(() => u()),
		hideWhenDetached: F(() => d()),
		onPlaced: F(() => p()),
		sticky: F(() => m()),
		updatePositionStrategy: F(() => h()),
		strategy: F(() => g()),
		dir: F(() => _()),
		style: F(() => v()),
		enabled: F(() => t.enabled),
		wrapperId: F(() => b()),
		customAnchor: F(() => x())
	}, f(() => S())), w = y(() => P(C.wrapperProps, { style: { pointerEvents: "auto" } }));
	var T = N(), E = i(T);
	H(E, () => t.content ?? V, () => ({
		props: C.props,
		wrapperProps: D(w)
	})), U(e, T), R();
}
// node_modules/bits-ui/dist/bits/utilities/floating-layer/components/floating-layer-content-static.svelte
function rr(e, t) {
	z(t, !0), ce(() => {
		t.onPlaced?.();
	});
	var n = N(), r = i(n);
	H(r, () => t.content ?? V, () => ({
		props: {},
		wrapperProps: {}
	})), U(e, n), R();
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
	let n = L(t, "isStatic", 3, !1), r = ue(t, ir);
	var a = N(), o = i(a), s = (e) => {
		rr(e, {
			get content() {
				return t.content;
			},
			get onPlaced() {
				return t.onPlaced;
			}
		});
	}, c = (e) => {
		nr(e, A({
			get content() {
				return t.content;
			},
			get onPlaced() {
				return t.onPlaced;
			}
		}, () => r));
	};
	B(o, (e) => {
		n() ? e(s) : e(c, -1);
	}), U(e, a);
}
// node_modules/bits-ui/dist/bits/utilities/popper-layer/popper-layer-inner.svelte
var or = /* @__PURE__ */ new Set(/* @__PURE__ */ "$$slots.$$events.$$legacy.popper.onEscapeKeydown.escapeKeydownBehavior.preventOverflowTextSelection.id.onPointerDown.onPointerUp.side.sideOffset.align.alignOffset.arrowPadding.avoidCollisions.collisionBoundary.collisionPadding.sticky.hideWhenDetached.updatePositionStrategy.strategy.dir.preventScroll.wrapperId.style.onPlaced.onInteractOutside.onCloseAutoFocus.onOpenAutoFocus.onFocusOutside.interactOutsideBehavior.loop.trapFocus.isValidEvent.customAnchor.isStatic.enabled.forceMount.ref.tooltip.contentPointerEvents".split(".")), sr = u("<!> <!>", 1);
function cr(e, t) {
	z(t, !0);
	let n = L(t, "interactOutsideBehavior", 3, "close"), r = L(t, "trapFocus", 3, !0), a = L(t, "isValidEvent", 3, () => !1), o = L(t, "customAnchor", 3, null), s = L(t, "isStatic", 3, !1), c = L(t, "tooltip", 3, !1), l = L(t, "contentPointerEvents", 3, "auto"), u = ue(t, or), d = y(() => t.preventScroll ?? !0), f = y(() => t.strategy ?? (D(d) ? "fixed" : "absolute"));
	ar(e, {
		get isStatic() {
			return s();
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
			return D(f);
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
			return o();
		},
		get enabled() {
			return t.enabled;
		},
		get tooltip() {
			return c();
		},
		content: (e, o) => {
			let s = () => (o?.()).props, c = () => (o?.()).wrapperProps;
			var f = sr(), p = i(f), m = (e) => {
				Se(e, { get preventScroll() {
					return D(d);
				} });
			}, h = (e) => {
				Se(e, { get preventScroll() {
					return D(d);
				} });
			};
			B(p, (e) => {
				t.forceMount && t.enabled ? e(m) : t.forceMount || e(h, 1);
			});
			var _ = g(p, 2);
			qe(_, {
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
					let o = () => (r?.()).props;
					he(e, {
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
							Ge(e, {
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
									return a();
								},
								get enabled() {
									return t.enabled;
								},
								get ref() {
									return t.ref;
								},
								children: (e, n) => {
									let r = () => (n?.()).props;
									He(e, {
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
											var a = N(), d = i(a);
											{
												let e = y(() => ({
													props: P(u, s(), r(), o(), {
														id: t.id,
														style: { pointerEvents: l() }
													}),
													wrapperProps: c()
												}));
												H(d, () => t.popper ?? V, () => D(e));
											}
											U(e, a);
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
			}), U(e, f);
		},
		$$slots: { content: !0 }
	}), R();
}
// node_modules/bits-ui/dist/bits/utilities/popper-layer/popper-layer.svelte
var lr = /* @__PURE__ */ new Set(/* @__PURE__ */ "$$slots.$$events.$$legacy.popper.open.onEscapeKeydown.escapeKeydownBehavior.preventOverflowTextSelection.id.onPointerDown.onPointerUp.side.sideOffset.align.alignOffset.arrowPadding.avoidCollisions.collisionBoundary.collisionPadding.sticky.hideWhenDetached.updatePositionStrategy.strategy.dir.preventScroll.wrapperId.style.onPlaced.onInteractOutside.onCloseAutoFocus.onOpenAutoFocus.onFocusOutside.interactOutsideBehavior.loop.trapFocus.isValidEvent.customAnchor.isStatic.ref.shouldRender".split("."));
function ur(e, t) {
	let n = L(t, "interactOutsideBehavior", 3, "close"), r = L(t, "trapFocus", 3, !0), a = L(t, "isValidEvent", 3, () => !1), o = L(t, "customAnchor", 3, null), s = L(t, "isStatic", 3, !1), c = ue(t, lr);
	var l = N(), u = i(l), d = (e) => {
		cr(e, A({
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
	B(u, (e) => {
		t.shouldRender && e(d);
	}), U(e, l);
}
// node_modules/bits-ui/dist/bits/utilities/popper-layer/popper-layer-force-mount.svelte
var dr = /* @__PURE__ */ new Set(/* @__PURE__ */ "$$slots.$$events.$$legacy.popper.onEscapeKeydown.escapeKeydownBehavior.preventOverflowTextSelection.id.onPointerDown.onPointerUp.side.sideOffset.align.alignOffset.arrowPadding.avoidCollisions.collisionBoundary.collisionPadding.sticky.hideWhenDetached.updatePositionStrategy.strategy.dir.preventScroll.wrapperId.style.onPlaced.onInteractOutside.onCloseAutoFocus.onOpenAutoFocus.onFocusOutside.interactOutsideBehavior.loop.trapFocus.isValidEvent.customAnchor.isStatic.enabled".split("."));
function fr(e, t) {
	let n = L(t, "interactOutsideBehavior", 3, "close"), r = L(t, "trapFocus", 3, !0), i = L(t, "isValidEvent", 3, () => !1), a = L(t, "customAnchor", 3, null), o = L(t, "isStatic", 3, !1), s = ue(t, dr);
	cr(e, A({
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
		this.#n = typeof t == "number" && t > 0 ? t : null, W([
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
				T(r, "pointermove", (n) => {
					this.#p([n.clientX, n.clientY], e, t);
				}),
				T(e, "pointerleave", (e) => {
					let n = e.relatedTarget;
					if (s(n) && t.contains(n)) return;
					let r = this.#e.ignoredTargets?.() ?? [];
					s(n) && r.some((e) => e === n || e.contains(n)) || (this.#a = s(n) && r.length > 0 ? r.filter((e) => n.contains(e)) : [], this.#r = [e.clientX, e.clientY], this.#i = "content", this.#u());
				}),
				T(e, "pointerenter", () => {
					this.#m();
				}),
				T(t, "pointerenter", () => {
					this.#m();
				}),
				T(t, "pointerleave", (t) => {
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
		this.#t = e, this.#e = t, this.stop = this.stop.bind(this), this.start = this.start.bind(this), S(this.stop);
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
}, vr = Ee({
	component: "tooltip",
	parts: ["content", "trigger"]
}), yr = new r("Tooltip.Provider"), br = new r("Tooltip.Root"), xr = class {
	triggers = /* @__PURE__ */ new Map();
	#e = m(0);
	#t = m(null);
	get activeTriggerId() {
		return D(this.#t);
	}
	set activeTriggerId(e) {
		I(this.#t, e, !0);
	}
	#n = y(() => {
		D(this.#e);
		let e = this.activeTriggerId;
		return e === null ? null : this.triggers.get(e)?.node ?? null;
	});
	get activeTriggerNode() {
		return D(this.#n);
	}
	set activeTriggerNode(e) {
		I(this.#n, e);
	}
	#r = y(() => {
		D(this.#e);
		let e = this.activeTriggerId;
		return e === null ? null : this.triggers.get(e)?.payload ?? null;
	});
	get activePayload() {
		return D(this.#r);
	}
	set activePayload(e) {
		I(this.#r, e);
	}
	register = (e) => {
		this.triggers.set(e.id, e), e.id === this.activeTriggerId && x(this.#e);
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
		return D(this.#e);
	}
	set isOpenDelayed(e) {
		I(this.#e, e, !0);
	}
	isPointerInTransit = p(!1);
	#t;
	#n = m(null);
	#r = !1;
	constructor(e) {
		this.opts = e, this.#t = new _r(() => {
			this.isOpenDelayed = !0;
		}, this.opts.skipDelayDuration.current), Je(() => T(window, "scroll", (e) => {
			let t = D(this.#n);
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
		D(this.#n) && D(this.#n) !== e && D(this.#n).handleClose(), this.#a(), this.isOpenDelayed = !1, I(this.#n, e, !0);
	};
	onClose = (e) => {
		D(this.#n) === e && (I(this.#n, null), this.#i());
	};
	isTooltipOpen = (e) => D(this.#n) === e;
}, Cr = class e {
	static create(t) {
		return br.set(new e(t, yr.get()));
	}
	opts;
	provider;
	#e = y(() => this.opts.delayDuration.current ?? this.provider.opts.delayDuration.current);
	get delayDuration() {
		return D(this.#e);
	}
	set delayDuration(e) {
		I(this.#e, e);
	}
	#t = y(() => this.opts.disableHoverableContent.current ?? this.provider.opts.disableHoverableContent.current);
	get disableHoverableContent() {
		return D(this.#t);
	}
	set disableHoverableContent(e) {
		I(this.#t, e);
	}
	#n = y(() => this.opts.disableCloseOnTriggerClick.current ?? this.provider.opts.disableCloseOnTriggerClick.current);
	get disableCloseOnTriggerClick() {
		return D(this.#n);
	}
	set disableCloseOnTriggerClick(e) {
		I(this.#n, e);
	}
	#r = y(() => this.opts.disabled.current ?? this.provider.opts.disabled.current);
	get disabled() {
		return D(this.#r);
	}
	set disabled(e) {
		I(this.#r, e);
	}
	#i = y(() => this.opts.ignoreNonKeyboardFocus.current ?? this.provider.opts.ignoreNonKeyboardFocus.current);
	get ignoreNonKeyboardFocus() {
		return D(this.#i);
	}
	set ignoreNonKeyboardFocus(e) {
		I(this.#i, e);
	}
	registry;
	tether;
	#a = m(null);
	get contentNode() {
		return D(this.#a);
	}
	set contentNode(e) {
		I(this.#a, e, !0);
	}
	contentPresence;
	#o = m(!1);
	#s = m(!1);
	get openedViaFocus() {
		return D(this.#s);
	}
	set openedViaFocus(e) {
		I(this.#s, e, !0);
	}
	#c;
	#l = y(() => this.opts.open.current ? D(this.#o) ? "delayed-open" : "instant-open" : "closed");
	get stateAttr() {
		return D(this.#l);
	}
	set stateAttr(e) {
		I(this.#l, e);
	}
	constructor(e, t) {
		this.opts = e, this.provider = t, this.tether = e.tether.current?.state ?? null, this.registry = this.tether?.registry ?? new xr(), this.#c = new _r(() => {
			I(this.#o, !0), this.opts.open.current = !0;
		}, this.delayDuration ?? 0), this.tether && (this.tether.root = this, Je(() => () => {
			this.tether?.root === this && (this.tether.root = null);
		})), this.contentPresence = new l({
			open: this.opts.open,
			ref: F(() => this.contentNode),
			onComplete: () => {
				this.opts.onOpenChangeComplete.current(this.opts.open.current);
			}
		}), W(() => this.delayDuration, () => {
			this.delayDuration !== void 0 && (this.#c = new _r(() => {
				I(this.#o, !0), this.opts.open.current = !0;
			}, this.delayDuration));
		}), W(() => this.opts.open.current, (e) => {
			e ? (this.ensureActiveTrigger(), this.provider.onOpen(this)) : (this.openedViaFocus = !1, this.provider.onClose(this));
		}, { lazy: !0 }), W(() => this.opts.triggerId.current, (e) => {
			e !== this.registry.activeTriggerId && this.registry.setActiveTrigger(e);
		}), W(() => this.registry.activeTriggerId, (e) => {
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
	#e = p(!1);
	#t = null;
	#n = m(!1);
	domContext;
	#r = null;
	#i = !1;
	#a = null;
	constructor(e, t, n) {
		this.opts = e, this.root = t, this.tether = n, this.domContext = new ee(e.ref), this.attachment = E(this.opts.ref, (e) => e ? this.#c(e) : this.#l()), W(() => this.opts.id.current, () => {
			this.#c(this.opts.ref.current);
		}), W(() => this.opts.payload.current, () => {
			this.#c(this.opts.ref.current);
		}), W(() => this.opts.disabled.current, () => {
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
			t.provider.isPointerInTransit.current && (t.provider.isPointerInTransit.current = !1, t.onTriggerEnter(this.opts.id.current), I(this.#n, !0));
		}, 250)) : (t.onTriggerEnter(this.opts.id.current), I(this.#n, !0))));
	};
	#h = (e) => {
		let t = this.#o();
		t && (this.#s() ? t.opts.open.current && t.handleClose() : e.pointerType !== "touch" && (D(this.#n) || (this.#d(), t.provider.isPointerInTransit.current = !1, t.onTriggerEnter(this.opts.id.current), I(this.#n, !0))));
	};
	#g = (e) => {
		let t = this.#o();
		if (!t || this.#s()) return;
		if (this.#d(), !t.isActiveTrigger(this.opts.id.current)) {
			I(this.#n, !1);
			return;
		}
		let n = e.relatedTarget;
		if (s(n)) {
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
		t && (this.#e.current || this.#t !== "touch" && (this.#s() ? t.opts.open.current && t.handleClose() : (!t.ignoreNonKeyboardFocus || O(e.currentTarget)) && (t.setActiveTrigger(this.opts.id.current), t.openedViaFocus = !0, t.handleOpen(), t.provider.ignoreFocusScroll())));
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
	#b = y(() => {
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
		return D(this.#b);
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
		this.opts = e, this.root = t, this.attachment = E(this.opts.ref, (e) => this.root.contentNode = e), new gr({
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
		re(e, this.root.triggerNode) && this.root.disableCloseOnTriggerClick ? e.preventDefault() : (this.opts.onInteractOutside.current(e), e.defaultPrevented || this.root.handleClose());
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
	#e = y(() => ({ open: this.root.opts.open.current }));
	get snippetProps() {
		return D(this.#e);
	}
	set snippetProps(e) {
		I(this.#e, e);
	}
	#t = y(() => ({
		id: this.opts.id.current,
		"data-state": this.root.stateAttr,
		"data-disabled": t(this.root.disabled),
		...w(this.root.contentPresence.transitionStatus),
		style: { outline: "none" },
		[vr.content]: "",
		...this.attachment
	}));
	get props() {
		return D(this.#t);
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
	let n = L(t, "open", 15, !1), r = L(t, "triggerId", 15, null), a = L(t, "onOpenChange", 3, ie), o = L(t, "onOpenChangeComplete", 3, ie), s = Cr.create({
		open: F(() => n(), (e) => {
			n(e), a()(e);
		}),
		triggerId: F(() => r(), (e) => {
			r(e);
		}),
		delayDuration: F(() => t.delayDuration),
		disableCloseOnTriggerClick: F(() => t.disableCloseOnTriggerClick),
		disableHoverableContent: F(() => t.disableHoverableContent),
		ignoreNonKeyboardFocus: F(() => t.ignoreNonKeyboardFocus),
		disabled: F(() => t.disabled),
		onOpenChangeComplete: F(() => o()),
		tether: F(() => t.tether)
	});
	Qe(e, {
		tooltip: !0,
		children: (e, n) => {
			var r = N(), a = i(r);
			H(a, () => t.children ?? V, () => ({
				open: s.opts.open.current,
				triggerId: s.activeTriggerId,
				payload: s.activePayload
			})), U(e, r);
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
]), Or = u("<div><div><!></div></div>");
function kr(t, n) {
	let r = c();
	z(n, !0);
	let a = L(n, "id", 19, () => We(r)), o = L(n, "ref", 15, null), s = L(n, "side", 3, "top"), l = L(n, "sideOffset", 3, 0), u = L(n, "align", 3, "center"), d = L(n, "avoidCollisions", 3, !0), f = L(n, "arrowPadding", 3, 0), p = L(n, "sticky", 3, "partial"), m = L(n, "hideWhenDetached", 3, !1), h = L(n, "collisionPadding", 3, 0), g = L(n, "onInteractOutside", 3, ie), _ = L(n, "onEscapeKeydown", 3, ie), v = L(n, "forceMount", 3, !1), b = ue(n, Dr), x = Tr.create({
		id: F(() => a()),
		ref: F(() => o(), (e) => o(e)),
		onInteractOutside: F(() => g()),
		onEscapeKeydown: F(() => _())
	}), S = y(() => ({
		side: s(),
		sideOffset: l(),
		align: u(),
		avoidCollisions: d(),
		arrowPadding: f(),
		sticky: p(),
		hideWhenDetached: m(),
		collisionPadding: h(),
		strategy: n.strategy,
		customAnchor: n.customAnchor ?? x.root.triggerNode
	})), C = y(() => P(b, D(S), x.props));
	var w = N(), T = i(w), E = (t) => {
		{
			let r = (t, r) => {
				let a = () => (r?.()).props, o = () => (r?.()).wrapperProps, s = y(() => P(o(), { style: { pointerEvents: x.root.disableHoverableContent ? "none" : void 0 } })), c = y(() => P(a(), { style: nt("tooltip") }, { style: n.style }));
				var l = N(), u = i(l), d = (e) => {
					var t = N(), r = i(t);
					{
						let e = y(() => ({
							props: D(c),
							wrapperProps: D(s),
							...x.snippetProps
						}));
						H(r, () => n.child, () => D(e));
					}
					U(e, t);
				}, f = (t) => {
					var r = Or();
					ze(r, () => ({ ...D(s) }));
					var i = G(r);
					ze(i, () => ({ ...D(c) }));
					var a = G(i);
					H(a, () => n.children ?? V), e(i), e(r), U(t, r);
				};
				B(u, (e) => {
					n.child ? e(d) : e(f, -1);
				}), U(t, l);
			}, o = y(() => x.root.disableHoverableContent ? "none" : "auto");
			fr(t, A(() => D(C), () => x.popperProps, {
				get enabled() {
					return x.root.opts.open.current;
				},
				get id() {
					return a();
				},
				trapFocus: !1,
				loop: !1,
				preventScroll: !1,
				forceMount: !0,
				get ref() {
					return x.opts.ref;
				},
				tooltip: !0,
				get shouldRender() {
					return x.shouldRender;
				},
				get contentPointerEvents() {
					return D(o);
				},
				popper: r,
				$$slots: { popper: !0 }
			}));
		}
	}, O = (t) => {
		{
			let r = (t, r) => {
				let a = () => (r?.()).props, o = () => (r?.()).wrapperProps, s = y(() => P(o(), { style: { pointerEvents: x.root.disableHoverableContent ? "none" : void 0 } })), c = y(() => P(a(), { style: nt("tooltip") }, { style: n.style }));
				var l = N(), u = i(l), d = (e) => {
					var t = N(), r = i(t);
					{
						let e = y(() => ({
							props: D(c),
							wrapperProps: D(s),
							...x.snippetProps
						}));
						H(r, () => n.child, () => D(e));
					}
					U(e, t);
				}, f = (t) => {
					var r = Or();
					ze(r, () => ({ ...D(s) }));
					var i = G(r);
					ze(i, () => ({ ...D(c) }));
					var a = G(i);
					H(a, () => n.children ?? V), e(i), e(r), U(t, r);
				};
				B(u, (e) => {
					n.child ? e(d) : e(f, -1);
				}), U(t, l);
			}, o = y(() => x.root.disableHoverableContent ? "none" : "auto");
			ur(t, A(() => D(C), () => x.popperProps, {
				get open() {
					return x.root.opts.open.current;
				},
				get id() {
					return a();
				},
				trapFocus: !1,
				loop: !1,
				preventScroll: !1,
				forceMount: !1,
				get ref() {
					return x.opts.ref;
				},
				tooltip: !0,
				get shouldRender() {
					return x.shouldRender;
				},
				get contentPointerEvents() {
					return D(o);
				},
				popper: r,
				$$slots: { popper: !0 }
			}));
		}
	};
	B(T, (e) => {
		v() ? e(E) : v() || e(O, 1);
	}), U(t, w), R();
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
]), jr = u("<button><!></button>");
function Mr(t, n) {
	let r = c();
	z(n, !0);
	let a = L(n, "id", 19, () => We(r)), o = L(n, "disabled", 3, !1), s = L(n, "type", 3, "button"), l = L(n, "tabindex", 3, 0), u = L(n, "ref", 15, null), d = ue(n, Ar), f = wr.create({
		id: F(() => a()),
		disabled: F(() => o() ?? !1),
		tabindex: F(() => l() ?? 0),
		payload: F(() => n.payload),
		tether: F(() => n.tether),
		ref: F(() => u(), (e) => u(e))
	}), p = y(() => P(d, f.props, { type: s() }));
	var m = N(), h = i(m), g = (e) => {
		var t = N(), r = i(t);
		H(r, () => n.child, () => ({ props: D(p) })), U(e, t);
	}, _ = (t) => {
		var r = jr();
		ze(r, () => ({ ...D(p) }));
		var i = G(r);
		H(i, () => n.children ?? V), e(r), U(t, r);
	};
	B(h, (e) => {
		n.child ? e(g) : e(_, -1);
	}), U(t, m), R();
}
// node_modules/bits-ui/dist/bits/tooltip/components/tooltip-provider.svelte
function Nr(e, t) {
	z(t, !0);
	let n = L(t, "delayDuration", 3, 700), r = L(t, "disableCloseOnTriggerClick", 3, !1), a = L(t, "disableHoverableContent", 3, !1), o = L(t, "disabled", 3, !1), s = L(t, "ignoreNonKeyboardFocus", 3, !1), c = L(t, "skipDelayDuration", 3, 300);
	Sr.create({
		delayDuration: F(() => n()),
		disableCloseOnTriggerClick: F(() => r()),
		disableHoverableContent: F(() => a()),
		disabled: F(() => o()),
		ignoreNonKeyboardFocus: F(() => s()),
		skipDelayDuration: F(() => c())
	});
	var l = N(), u = i(l);
	H(u, () => t.children ?? V), U(e, l), R();
}
// svelte/lib/ui/Textarea.svelte
var Pr = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"value",
	"class",
	"ref"
]), Fr = u("<textarea></textarea>");
function Ir(e, t) {
	z(t, !0);
	let n = L(t, "value", 15, ""), r = L(t, "ref", 15, null), i = ue(t, Pr);
	var a = Fr();
	le(a), ze(a, (e) => ({
		class: e,
		...i
	}), [() => Fe("tw:min-h-24 tw:w-full tw:min-w-0 tw:rounded-control tw:border tw:border-input tw:bg-studio-input-background tw:px-3 tw:py-2 tw:font-sans tw:text-sm tw:font-normal tw:leading-5 tw:tracking-normal tw:text-foreground tw:outline-none tw:placeholder:text-muted-foreground tw:focus-visible:border-ring tw:focus-visible:ring-2 tw:focus-visible:ring-ring/30 tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-destructive/30", t.class)]), Le(a, (e) => r(e), () => r()), Pe(a, n), U(e, a), R();
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
]), Rr = u("<span class=\"tw:relative tw:inline-flex tw:shrink-0 tw:align-middle\"><input/> <span aria-hidden=\"true\"></span></span>");
function zr(t, n) {
	z(n, !0);
	let r = L(n, "checked", 15, !1), i = ue(n, Lr);
	var a = Rr(), o = G(a), s = (e) => {
		n.onchange?.(e), n.onCheckedChange?.(e.currentTarget.checked);
	};
	ze(o, (e) => ({
		type: "checkbox",
		role: "switch",
		"aria-checked": r(),
		...i,
		onchange: s,
		class: e
	}), [() => Fe("tw:m-0 tw:h-5 tw:w-9 tw:appearance-none tw:rounded-full tw:border tw:border-transparent tw:bg-input tw:p-0 tw:outline-none tw:transition-colors tw:checked:bg-primary tw:focus-visible:ring-2 tw:focus-visible:ring-ring tw:focus-visible:ring-offset-2 tw:focus-visible:ring-offset-background tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:motion-reduce:transition-none", n.class)], void 0, void 0, void 0, !0);
	var c = g(o, 2);
	e(a), v((e) => ye(c, 1, e), [() => xe(Fe("tw:pointer-events-none tw:absolute tw:left-0.5 tw:top-0.5 tw:size-4 tw:rounded-full tw:bg-card tw:shadow-xs tw:transition-transform tw:motion-reduce:transition-none", r() ? "tw:translate-x-4" : "tw:translate-x-0"))]), Te(o, r), U(t, a), R();
}
// svelte/lib/ui/RadioGroup.svelte
var Br = u("<span aria-hidden=\"true\" class=\"tw:pointer-events-none tw:absolute tw:inset-1 tw:rounded-full tw:bg-primary\"></span>"), Vr = u("<label class=\"tw:flex tw:items-center tw:gap-2\"><span class=\"tw:relative tw:inline-flex tw:size-4 tw:shrink-0\"><input type=\"radio\" class=\"tw:m-0 tw:size-4 tw:appearance-none tw:rounded-full tw:border tw:border-input tw:bg-card tw:p-0 tw:outline-none tw:checked:border-primary tw:focus-visible:ring-2 tw:focus-visible:ring-ring tw:focus-visible:ring-offset-2 tw:focus-visible:ring-offset-background tw:disabled:opacity-50\"/> <!></span> <span> </span></label>"), Hr = u("<div role=\"radiogroup\"></div>");
function Ur(t, r) {
	let i = c();
	z(r, !0);
	let a = [], o = L(r, "value", 15, ""), s = L(r, "name", 3, i), l = L(r, "disabled", 3, !1);
	var u = Hr();
	fe(u, 21, () => r.items, (e) => e.value, (t, i) => {
		var c = Vr(), u = G(c), d = G(u);
		_e(d);
		var f, p = g(d, 2), m = (e) => {
			var t = Br();
			U(e, t);
		};
		B(p, (e) => {
			o() === D(i).value && e(m);
		}), e(u);
		var h = g(u, 2), _ = se(h, !0);
		e(c), v(() => {
			Ae(d, "name", s()), d.disabled = l() || D(i).disabled, f !== (f = D(i).value) && (d.value = (d.__value = f) ?? ""), M(_, D(i).label);
		}), n("change", d, () => r.onValueChange?.(D(i).value)), me(a, [], d, () => (D(i).value, o()), o), U(t, c);
	}), e(u), v((e) => {
		Ae(u, "aria-label", r.label), ye(u, 1, e);
	}, [() => xe(Fe("tw:grid tw:grid-cols-1 tw:gap-2 tw:font-sans tw:text-sm tw:text-foreground", r.class))]), U(t, u), R();
}
Oe(["change"]);
// svelte/lib/ui/Tooltip.svelte
var Wr = u("<!> <!>", 1);
function Gr(e, t) {
	z(t, !0);
	var n = N(), r = i(n);
	Me(r, () => Nr, (e, n) => {
		n(e, {
			delayDuration: 250,
			children: (e, n) => {
				var r = N(), o = i(r);
				Me(o, () => Er, (e, n) => {
					n(e, {
						children: (e, n) => {
							var r = Wr(), o = i(r);
							{
								let e = y(() => je({
									variant: "ghost",
									size: "icon"
								}));
								Me(o, () => Mr, (n, r) => {
									r(n, {
										type: "button",
										get "aria-label"() {
											return t.label;
										},
										get class() {
											return D(e);
										},
										children: (e, n) => {
											var r = N(), a = i(r);
											H(a, () => t.children), U(e, r);
										},
										$$slots: { default: !0 }
									});
								});
							}
							var s = g(o, 2);
							Me(s, () => a, (e, n) => {
								n(e, {
									children: (e, n) => {
										var r = N(), a = i(r);
										Me(a, () => kr, (e, n) => {
											n(e, {
												"data-vb-native": !0,
												sideOffset: 6,
												class: "tw:z-50 tw:m-0 tw:box-border tw:max-w-xs tw:rounded-control tw:border tw:border-solid tw:border-border tw:bg-popover tw:px-3 tw:py-1.5 tw:font-sans tw:text-xs tw:leading-4 tw:text-popover-foreground tw:shadow-md",
												children: (e, n) => {
													j();
													var r = k();
													v(() => M(r, t.label)), U(e, r);
												},
												$$slots: { default: !0 }
											});
										}), U(e, r);
									},
									$$slots: { default: !0 }
								});
							}), U(e, r);
						},
						$$slots: { default: !0 }
					});
				}), U(e, r);
			},
			$$slots: { default: !0 }
		});
	}), U(e, n), R();
}
// svelte/lib/ui/Card.svelte
var Kr = u("<h2 class=\"tw:m-0 tw:font-sans tw:text-base tw:font-semibold tw:leading-6 tw:tracking-normal\"> </h2>"), qr = u("<p class=\"tw:m-0 tw:text-sm tw:leading-5 tw:text-muted-foreground\"> </p>"), Jr = u("<div class=\"tw:space-y-1\"><!><!></div>"), Yr = u("<section><!> <!></section>");
function Xr(t, n) {
	z(n, !0);
	var r = Yr(), i = G(r), a = (t) => {
		var r = Jr(), i = G(r), a = (e) => {
			var t = Kr(), r = se(t, !0);
			v(() => M(r, n.title)), U(e, t);
		};
		B(i, (e) => {
			n.title && e(a);
		});
		var o = g(i), s = (e) => {
			var t = qr(), r = se(t, !0);
			v(() => M(r, n.description)), U(e, t);
		};
		B(o, (e) => {
			n.description && e(s);
		}), e(r), U(t, r);
	};
	B(i, (e) => {
		(n.title || n.description) && e(a);
	});
	var o = g(i, 2);
	H(o, () => n.children), e(r), v((e) => ye(r, 1, e), [() => xe(Fe("tw:space-y-4 tw:rounded-surface tw:border tw:border-border tw:bg-card tw:p-5 tw:font-sans tw:text-sm tw:text-card-foreground tw:shadow-xs", n.class))]), U(t, r), R();
}
// svelte/lib/ui/Separator.svelte
var Zr = u("<div role=\"separator\"></div>");
function Qr(e, t) {
	z(t, !0);
	let n = L(t, "vertical", 3, !1);
	var r = Zr();
	v((e) => {
		Ae(r, "aria-orientation", n() ? "vertical" : "horizontal"), ye(r, 1, e);
	}, [() => xe(Fe("tw:shrink-0 tw:bg-border", n() ? "tw:h-full tw:w-px" : "tw:h-px tw:w-full", t.class))]), U(e, r), R();
}
// svelte/lib/ui/Skeleton.svelte
var $r = u("<div aria-hidden=\"true\"></div>");
function ei(e, t) {
	z(t, !0);
	var n = $r();
	v((e) => ye(n, 1, e), [() => xe(Fe("tw:animate-pulse tw:rounded-control tw:bg-muted tw:motion-reduce:animate-none", t.class))]), U(e, n), R();
}
// svelte/lib/components/LoadingState.svelte
var ti = u("<div role=\"status\" class=\"tw:inline-flex tw:items-center tw:gap-2 tw:font-sans tw:text-sm tw:text-muted-foreground\"><span aria-hidden=\"true\" class=\"tw:size-4 tw:animate-spin tw:rounded-full tw:border-2 tw:border-current tw:border-r-transparent tw:motion-reduce:animate-none\"></span> </div>");
function ni(t, n) {
	var r = ti(), i = g(G(r), 1, !0);
	e(r), v(() => M(i, n.label)), U(t, r);
}
// svelte/gallery/Gallery.svelte
var ri = u("<div class=\"tw:flex tw:flex-wrap tw:gap-2\"></div> <div class=\"tw:flex tw:flex-wrap tw:items-center tw:gap-2\"><!><!><!><!><!></div> <p class=\"tw:m-0 tw:text-xs tw:text-muted-foreground\"> </p>", 1), ii = u("<!> <!> <!> <!>", 1), ai = u("<div class=\"tw:flex tw:items-center tw:gap-2\"><!><label for=\"gallery-checkbox\">Include archived rooms</label></div> <div class=\"tw:flex tw:items-center tw:gap-2\"><!><label for=\"gallery-switch\">Notifications</label></div> <!> <!> <output data-selection-state=\"\" class=\"tw:block tw:text-xs tw:text-muted-foreground\" aria-live=\"polite\"> </output>", 1), oi = u("<!><!>", 1), si = u("<p class=\"tw:m-0 tw:text-muted-foreground\">The same dialog primitives support mobile and desktop layouts.</p> <!>", 1), ci = u("<p class=\"tw:m-0 tw:rounded-control tw:border tw:border-border tw:p-3\"> </p>"), li = u("<div class=\"tw:flex tw:flex-wrap tw:gap-2\"><!> <!></div> <!>", 1), ui = u("<div class=\"tw:flex tw:items-center tw:gap-3\"><!><!><!><span class=\"tw:text-muted-foreground\">Images and initials share one frame.</span></div> <!> <div class=\"tw:flex tw:flex-wrap tw:gap-2\"><!><!><!><!><!></div> <div class=\"tw:flex tw:items-center tw:gap-3\"><!> <div class=\"tw:flex-1 tw:space-y-2\"><!><!></div></div>", 1), di = u("<h3 class=\"tw:m-0 tw:font-sans tw:text-xl tw:font-semibold tw:leading-7 tw:tracking-tight\">Inter variable — headings and UI</h3> <p class=\"tw:m-0 tw:text-sm tw:leading-5\">Body 400 · medium 500 · semibold 500 · bold 600. English and\n          Portuguese: Olá, colaboração, ações.</p> <p class=\"tw:m-0 tw:text-muted-foreground\">Muted text uses the Studio semantic role.</p> <pre class=\"tw:m-0 tw:overflow-auto tw:rounded-control tw:border tw:border-border tw:bg-muted tw:p-3 tw:font-mono tw:text-sm tw:leading-6\"><code>const room = \"fully typed\";</code></pre>", 1), fi = u("<main data-vb-native=\"\" class=\"tw:m-0 tw:box-border tw:min-h-dvh tw:bg-background tw:px-4 tw:py-8 tw:font-sans tw:text-sm tw:font-normal tw:leading-5 tw:text-foreground tw:sm:px-8\" data-gallery=\"\"><div class=\"tw:mx-auto tw:max-w-6xl tw:space-y-6\"><header class=\"tw:flex tw:flex-wrap tw:items-start tw:justify-between tw:gap-4\"><div class=\"tw:space-y-2\"><a href=\"/app?ui=svelte\" class=\"tw:text-sm tw:text-link tw:underline-offset-4 tw:hover:underline\">vibebook</a> <h1 class=\"tw:m-0 tw:font-sans tw:text-2xl tw:font-semibold tw:leading-8 tw:tracking-tight\">Component gallery</h1> <p class=\"tw:m-0 tw:text-muted-foreground\">Shared primitives, Studio tokens, and one Tailwind entry.</p></div> <div class=\"tw:flex tw:items-center tw:gap-2\"><!><!></div></header> <div class=\"tw:grid tw:grid-cols-1 tw:gap-5 tw:md:grid-cols-2\"><!> <!> <!> <!> <!> <!> <!> <!></div> <p role=\"status\" class=\"tw:min-h-5 tw:text-sm tw:text-muted-foreground\"> </p></div></main>");
function pi(t, n) {
	z(n, !0);
	let r = m("light"), a = m(""), o = m(""), s = m(!1), c = m(!1), l = m("room"), u = m("general"), d = m("all"), f = m(0), p = m("");
	C(() => {
		document.documentElement.dataset.theme = D(r);
	});
	let h = [
		"primary",
		"secondary",
		"outline",
		"ghost",
		"destructive",
		"link"
	];
	var _ = fi(), x = G(_), S = G(x), w = g(G(S), 2), T = G(w);
	{
		let e = y(() => D(r) === "light" ? "Use dark theme" : "Use light theme"), t = y(() => D(r) === "light" ? "moon" : "sun");
		Ve(T, {
			get label() {
				return D(e);
			},
			get icon() {
				return D(t);
			},
			variant: "outline",
			onclick: () => I(r, D(r) === "light" ? "dark" : "light", !0)
		});
	}
	var E = g(T);
	Ie(E, {
		children: (e, t) => {
			j();
			var n = k();
			v(() => M(n, D(r))), U(e, n);
		},
		$$slots: { default: !0 }
	}), e(w), e(S);
	var O = g(S, 2), ee = G(O);
	Xr(ee, {
		title: "Actions",
		description: "Variants share focus, disabled and loading behavior.",
		children: (t, n) => {
			var r = ri(), a = i(r);
			fe(a, 21, () => h, Ue, (e, t) => {
				ve(e, {
					get variant() {
						return D(t);
					},
					onclick: () => {
						I(f, D(f) + 1), I(p, `${D(t)} activated`);
					},
					children: (e, n) => {
						j();
						var r = k();
						v(() => M(r, D(t))), U(e, r);
					},
					$$slots: { default: !0 }
				});
			}), e(a);
			var o = g(a, 2), s = G(o);
			ve(s, {
				disabled: !0,
				children: (e, t) => {
					j();
					var n = k("Disabled");
					U(e, n);
				},
				$$slots: { default: !0 }
			});
			var c = g(s);
			ve(c, {
				loading: !0,
				children: (e, t) => {
					j();
					var n = k("Saving");
					U(e, n);
				},
				$$slots: { default: !0 }
			});
			var l = g(c);
			ve(l, {
				size: "sm",
				variant: "outline",
				children: (e, t) => {
					j();
					var n = k("Small");
					U(e, n);
				},
				$$slots: { default: !0 }
			});
			var u = g(l);
			Ve(u, {
				label: "Add item",
				icon: "plus",
				onclick: () => I(f, D(f) + 1)
			}), Gr(g(u), {
				label: "Search rooms",
				children: (e, t) => {
					Ce(e, { name: "search" });
				},
				$$slots: { default: !0 }
			}), e(o);
			var d = g(o, 2), m = se(d);
			v(() => M(m, `Actions: ${D(f) ?? ""}`)), U(t, r);
		},
		$$slots: { default: !0 }
	});
	var te = g(ee, 2);
	Xr(te, {
		title: "Fields",
		description: "Labels, hints and errors have explicit associations.",
		children: (e, t) => {
			var n = ii(), r = i(n);
			Be(r, {
				id: "gallery-title",
				label: "Room name",
				hint: "Choose a name your team recognizes.",
				children: (e, t = V) => {
					Ne(e, A(t, {
						placeholder: "Project room",
						get value() {
							return D(a);
						},
						set value(e) {
							I(a, e, !0);
						}
					}));
				},
				$$slots: { default: !0 }
			});
			var s = g(r, 2);
			Be(s, {
				id: "gallery-email",
				label: "Email",
				error: "Enter a valid email address.",
				children: (e, t = V) => {
					Ne(e, A(t, {
						type: "email",
						value: "invalid"
					}));
				},
				$$slots: { default: !0 }
			});
			var c = g(s, 2);
			Be(c, {
				id: "gallery-notes",
				label: "Notes",
				children: (e, t = V) => {
					Ir(e, A(t, {
						placeholder: "Write a note",
						get value() {
							return D(o);
						},
						set value(e) {
							I(o, e, !0);
						}
					}));
				},
				$$slots: { default: !0 }
			});
			var l = g(c, 2);
			Be(l, {
				id: "gallery-disabled",
				label: "Unavailable",
				children: (e, t = V) => {
					Ne(e, A(t, {
						disabled: !0,
						value: "Disabled input"
					}));
				},
				$$slots: { default: !0 }
			}), U(e, n);
		},
		$$slots: { default: !0 }
	});
	var ne = g(te, 2);
	Xr(ne, {
		title: "Selection",
		description: "Keyboard controls use native semantics or Bits UI behavior.",
		children: (t, n) => {
			var r = ai(), a = i(r), o = G(a);
			we(o, {
				id: "gallery-checkbox",
				get checked() {
					return D(s);
				},
				set checked(e) {
					I(s, e, !0);
				}
			}), j(), e(a);
			var u = g(a, 2);
			zr(G(u), {
				id: "gallery-switch",
				get checked() {
					return D(c);
				},
				set checked(e) {
					I(c, e, !0);
				}
			}), j(), e(u);
			var f = g(u, 2);
			Ur(f, {
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
					return D(l);
				},
				set value(e) {
					I(l, e, !0);
				}
			});
			var p = g(f, 2);
			Be(p, {
				id: "gallery-filter",
				label: "Show",
				children: (e, t = V) => {
					pe(e, A(t, {
						items: [{
							value: "all",
							label: "All rooms"
						}, {
							value: "active",
							label: "Active rooms"
						}],
						get value() {
							return D(d);
						},
						set value(e) {
							I(d, e, !0);
						}
					}));
				},
				$$slots: { default: !0 }
			});
			var m = g(p, 2), h = se(m);
			v(() => M(h, `${D(l) ?? ""} · ${D(d) ?? ""}`)), U(t, r);
		},
		$$slots: { default: !0 }
	});
	var re = g(ne, 2);
	Xr(re, {
		title: "Overlays",
		description: "Focus trap, Escape dismissal and focus restoration are provided by Bits UI.",
		children: (t, n) => {
			var r = li(), o = i(r), s = G(o);
			be(s, {
				title: "Edit room",
				description: "Changes apply to the current room.",
				closeLabel: "Close dialog",
				trigger: (e) => {
					j();
					var t = k("Open dialog");
					U(e, t);
				},
				children: (e) => {
					var t = oi(), n = i(t);
					Be(n, {
						id: "dialog-name",
						label: "Name",
						children: (e, t = V) => {
							Ne(e, A(t, {
								get value() {
									return D(a);
								},
								set value(e) {
									I(a, e, !0);
								}
							}));
						},
						$$slots: { default: !0 }
					});
					var r = g(n);
					ve(r, {
						onclick: () => I(p, "Dialog action completed"),
						children: (e, t) => {
							j();
							var n = k("Save name");
							U(e, n);
						},
						$$slots: { default: !0 }
					}), U(e, t);
				},
				$$slots: {
					trigger: !0,
					default: !0
				}
			});
			var c = g(s, 2);
			be(c, {
				title: "Room details",
				description: "A responsive sheet shares the dialog behavior.",
				closeLabel: "Close sheet",
				sheet: !0,
				trigger: (e) => {
					j();
					var t = k("Open sheet");
					U(e, t);
				},
				children: (e) => {
					var t = si(), n = g(i(t), 2);
					Ne(n, {
						"aria-label": "Sheet note",
						placeholder: "Add a note"
					}), U(e, t);
				},
				$$slots: {
					trigger: !0,
					default: !0
				}
			}), e(o);
			var l = g(o, 2);
			ke(l, {
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
					return D(u);
				},
				set value(e) {
					I(u, e, !0);
				},
				children: (e, t = V) => {
					var n = ci(), r = se(n, !0);
					v(() => M(r, t() === "general" ? "General settings" : "Room members")), U(e, n);
				},
				$$slots: { default: !0 }
			}), U(t, r);
		},
		$$slots: { default: !0 }
	});
	var ie = g(re, 2);
	Xr(ie, {
		title: "Identity and feedback",
		children: (t, n) => {
			var r = ui(), a = i(r), o = G(a);
			b(o, { name: "Gimenes" });
			var s = g(o);
			b(s, { name: "Guilherme Rodrigues" });
			var c = g(s);
			b(c, {
				name: "Sample user",
				src: "/favicon.svg"
			}), j(), e(a);
			var l = g(a, 2);
			Qr(l, {});
			var u = g(l, 2), d = G(u);
			Ie(d, {
				children: (e, t) => {
					j();
					var n = k("Default");
					U(e, n);
				},
				$$slots: { default: !0 }
			});
			var f = g(d);
			Ie(f, {
				variant: "primary",
				children: (e, t) => {
					j();
					var n = k("Selected");
					U(e, n);
				},
				$$slots: { default: !0 }
			});
			var p = g(f);
			Ie(p, {
				variant: "success",
				children: (e, t) => {
					j();
					var n = k("Complete");
					U(e, n);
				},
				$$slots: { default: !0 }
			});
			var m = g(p);
			Ie(m, {
				variant: "warning",
				children: (e, t) => {
					j();
					var n = k("Waiting");
					U(e, n);
				},
				$$slots: { default: !0 }
			});
			var h = g(m);
			Ie(h, {
				variant: "destructive",
				children: (e, t) => {
					j();
					var n = k("Failed");
					U(e, n);
				},
				$$slots: { default: !0 }
			}), e(u);
			var _ = g(u, 2), v = G(_);
			ei(v, { class: "tw:size-9 tw:rounded-full" });
			var y = g(v, 2), x = G(y);
			ei(x, { class: "tw:h-3 tw:w-3/4" }), ei(g(x), { class: "tw:h-3 tw:w-1/2" }), e(y), e(_), U(t, r);
		},
		$$slots: { default: !0 }
	});
	var N = g(ie, 2);
	Xr(N, {
		title: "Empty states",
		children: (e, t) => {
			ge(e, {
				title: "Nothing waiting for you",
				description: "New requests and tasks in review will appear here.",
				children: (e, t) => {
					ve(e, {
						variant: "outline",
						onclick: () => I(p, "Empty state action completed"),
						children: (e, t) => {
							j();
							var n = k("Explore rooms");
							U(e, n);
						},
						$$slots: { default: !0 }
					});
				},
				$$slots: { default: !0 }
			});
		},
		$$slots: { default: !0 }
	});
	var ae = g(N, 2);
	Xr(ae, {
		title: "Status feedback",
		children: (e, t) => {
			var n = oi(), r = i(n);
			ni(r, { label: "Saving changes" });
			var a = g(r);
			Re(a, {
				title: "Could not save changes",
				description: "Your draft is still available.",
				retryLabel: "Try again",
				onretry: () => I(p, "Retry requested")
			}), U(e, n);
		},
		$$slots: { default: !0 }
	}), Xr(g(ae, 2), {
		title: "Typography",
		class: "tw:md:col-span-2",
		children: (e, t) => {
			var n = di();
			j(6), U(e, n);
		},
		$$slots: { default: !0 }
	}), e(O);
	var oe = g(O, 2), P = se(oe, !0);
	e(x), e(_), v(() => M(P, D(p))), U(t, _), R();
}
// svelte/gallery/main.ts
function mi(e) {
	let t = Ke(pi, { target: e });
	return () => o(t);
}
export { mi as mountGallery };
