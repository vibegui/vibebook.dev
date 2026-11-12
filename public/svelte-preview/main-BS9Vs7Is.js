import { $ as e, $t as t, A as n, B as r, Bt as i, C as a, Ct as o, D as s, Dt as c, E as l, Et as u, F as d, Ft as f, G as p, Gt as m, H as h, Ht as g, I as _, It as v, Jt as y, L as b, Lt as x, M as S, Mt as C, N as w, Nt as T, O as E, Ot as D, P as O, Q as k, Qt as A, R as j, Rt as M, S as ee, St as te, T as ne, Tt as N, U as P, Ut as F, V as I, Vt as L, W as R, Wt as z, X as re, Xt as B, Yt as V, Z as ie, Zt as H, _ as ae, _t as oe, a as se, b as ce, bt as le, c as ue, d as de, dt as fe, et as pe, f as me, g as he, gt as ge, h as _e, i as ve, j as ye, jt as be, k as xe, kt as Se, l as Ce, m as we, mt as U, n as Te, nt as Ee, o as De, ot as Oe, p as ke, pt as Ae, qt as W, r as je, rt as Me, s as Ne, t as Pe, tt as G, u as Fe, ut as Ie, v as Le, w as Re, wt as K, x as ze, xt as q, y as Be, yt as J, z as Y, zt as X } from "./ErrorState-2N9Txw4c.js";
// node_modules/svelte-toolbelt/dist/utils/on-mount-effect.svelte.js
function Ve(e) {
	v(() => T(() => e()));
}
// node_modules/bits-ui/dist/bits/utilities/floating-layer/floating-root.svelte.js
var He = new O("Floating.Root"), Ue = new O("Floating.Root"), We = class e {
	static create(t = !1) {
		return t ? Ue.set(new e()) : He.set(new e());
	}
	anchorNode = Y(null);
	customAnchorNode = Y(null);
	triggerNode = Y(null);
	constructor() {
		v(() => {
			this.customAnchorNode.current ? typeof this.customAnchorNode.current == "string" ? this.anchorNode.current = document.querySelector(this.customAnchorNode.current) : this.anchorNode.current = this.customAnchorNode.current : this.anchorNode.current = this.triggerNode.current;
		});
	}
};
// node_modules/bits-ui/dist/bits/utilities/floating-layer/components/floating-layer.svelte
function Ge(e, n) {
	B(n, !0);
	let r = P(n, "tooltip", 3, !1);
	We.create(T(() => r()));
	var i = K(), a = X(i);
	U(a, () => n.children ?? t), o(e, i), V();
}
// node_modules/bits-ui/dist/internal/floating-svelte/floating-utils.svelte.js
function Ke(e) {
	return typeof e == "function" ? e() : e;
}
function qe(e) {
	return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function Je(e, t) {
	let n = qe(e);
	return Math.round(t * n) / n;
}
function Ye(e) {
	return {
		[`--bits-${e}-content-transform-origin`]: "var(--bits-floating-transform-origin)",
		[`--bits-${e}-content-available-width`]: "var(--bits-floating-available-width)",
		[`--bits-${e}-content-available-height`]: "var(--bits-floating-available-height)",
		[`--bits-${e}-anchor-width`]: "var(--bits-floating-anchor-width)",
		[`--bits-${e}-anchor-height`]: "var(--bits-floating-anchor-height)"
	};
}
// node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs
var Xe = [
	"top",
	"right",
	"bottom",
	"left"
], Ze = Math.min, Qe = Math.max, $e = Math.round, et = Math.floor, tt = (e) => ({
	x: e,
	y: e
}), nt = {
	left: "right",
	right: "left",
	bottom: "top",
	top: "bottom"
};
function rt(e, t, n) {
	return Qe(e, Ze(t, n));
}
function it(e, t) {
	return typeof e == "function" ? e(t) : e;
}
function at(e) {
	return e.split("-")[0];
}
function ot(e) {
	return e.split("-")[1];
}
function st(e) {
	return e === "x" ? "y" : "x";
}
function ct(e) {
	return e === "y" ? "height" : "width";
}
function Z(e) {
	let t = e[0];
	return t === "t" || t === "b" ? "y" : "x";
}
function lt(e) {
	return st(Z(e));
}
function ut(e, t, n) {
	n === void 0 && (n = !1);
	let r = ot(e), i = lt(e), a = ct(i), o = i === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
	return t.reference[a] > t.floating[a] && (o = yt(o)), [o, yt(o)];
}
function dt(e) {
	let t = yt(e);
	return [
		ft(e),
		t,
		ft(t)
	];
}
function ft(e) {
	return e.includes("start") ? e.replace("start", "end") : e.replace("end", "start");
}
var pt = ["left", "right"], mt = ["right", "left"], ht = ["top", "bottom"], gt = ["bottom", "top"];
function _t(e, t, n) {
	switch (e) {
		case "top":
		case "bottom": return n ? t ? mt : pt : t ? pt : mt;
		case "left":
		case "right": return t ? ht : gt;
		default: return [];
	}
}
function vt(e, t, n, r) {
	let i = ot(e), a = _t(at(e), n === "start", r);
	return i && (a = a.map((e) => e + "-" + i), t && (a = a.concat(a.map(ft)))), a;
}
function yt(e) {
	let t = at(e);
	return nt[t] + e.slice(t.length);
}
function bt(e) {
	return {
		top: e.top ?? 0,
		right: e.right ?? 0,
		bottom: e.bottom ?? 0,
		left: e.left ?? 0
	};
}
function xt(e) {
	return typeof e == "number" ? {
		top: e,
		right: e,
		bottom: e,
		left: e
	} : bt(e);
}
function St(e) {
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
function Ct(e, t, n) {
	let { reference: r, floating: i } = e, a = Z(t), o = lt(t), s = ct(o), c = at(t), l = a === "y", u = r.x + r.width / 2 - i.width / 2, d = r.y + r.height / 2 - i.height / 2, f = r[s] / 2 - i[s] / 2, p;
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
	let m = ot(t);
	return m && (p[o] += f * (m === "end" ? 1 : -1) * (n && l ? -1 : 1)), p;
}
async function wt(e, t) {
	t === void 0 && (t = {});
	let { x: n, y: r, platform: i, rects: a, elements: o, strategy: s } = e, { boundary: c = "clippingAncestors", rootBoundary: l = "viewport", elementContext: u = "floating", altBoundary: d = !1, padding: f = 0 } = it(t, e), p = xt(f), m = o[d ? u === "floating" ? "reference" : "floating" : u], h = St(await i.getClippingRect({
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
	}, y = St(i.convertOffsetParentRelativeRectToViewportRelativeRect ? await i.convertOffsetParentRelativeRectToViewportRelativeRect({
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
var Tt = 50, Et = async (e, t, n) => {
	let { placement: r = "bottom", strategy: i = "absolute", middleware: a = [], platform: o } = n, s = o.detectOverflow ? o : {
		...o,
		detectOverflow: wt
	}, c = await (o.isRTL == null ? void 0 : o.isRTL(t)), l = await o.getElementRects({
		reference: e,
		floating: t,
		strategy: i
	}), { x: u, y: d } = Ct(l, r, c), f = r, p = 0, m = {};
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
		}, x && p < Tt && (p++, typeof x == "object" && (x.placement && (f = x.placement), x.rects && (l = x.rects === !0 ? await o.getElementRects({
			reference: e,
			floating: t,
			strategy: i
		}) : x.rects), {x: u, y: d} = Ct(l, f, c)), n = -1);
	}
	return {
		x: u,
		y: d,
		placement: f,
		strategy: i,
		middlewareData: m
	};
}, Dt = (e) => ({
	name: "arrow",
	options: e,
	async fn(t) {
		let { x: n, y: r, placement: i, rects: a, platform: o, elements: s, middlewareData: c } = t, { element: l, padding: u = 0 } = it(e, t) || {};
		if (l == null) return {};
		let d = xt(u), f = {
			x: n,
			y: r
		}, p = lt(i), m = ct(p), h = await o.getDimensions(l), g = p === "y", _ = g ? "top" : "left", v = g ? "bottom" : "right", y = g ? "clientHeight" : "clientWidth", b = a.reference[m] + a.reference[p] - f[p] - a.floating[m], x = f[p] - a.reference[p], S = await (o.getOffsetParent == null ? void 0 : o.getOffsetParent(l)), C = S ? S[y] : 0;
		C && await (o.isElement == null ? void 0 : o.isElement(S)) || (C = s.floating[y] || a.floating[m]);
		let w = b / 2 - x / 2, T = C / 2 - h[m] / 2 - 1, E = Ze(d[_], T), D = Ze(d[v], T), O = C - h[m] - D, k = C / 2 - h[m] / 2 + w, A = rt(E, k, O), j = !c.arrow && ot(i) != null && k !== A && a.reference[m] / 2 - (k < E ? E : D) - h[m] / 2 < 0, M = j ? k < E ? k - E : k - O : 0;
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
}), Ot = function(e) {
	return e === void 0 && (e = {}), {
		name: "flip",
		options: e,
		async fn(t) {
			var n;
			let { placement: r, middlewareData: i, rects: a, initialPlacement: o, platform: s, elements: c } = t, { mainAxis: l = !0, crossAxis: u = !0, fallbackPlacements: d, fallbackStrategy: f = "bestFit", fallbackAxisSideDirection: p = "none", flipAlignment: m = !0, ...h } = it(e, t);
			if ((n = i.arrow) != null && n.alignmentOffset) return {};
			let g = at(r), _ = Z(o), v = at(o) === o, y = await (s.isRTL == null ? void 0 : s.isRTL(c.floating)), b = d || (v || !m ? [yt(o)] : dt(o)), x = p !== "none";
			!d && x && b.push(...vt(o, m, p, y));
			let S = [o, ...b], C = await s.detectOverflow(t, h), w = [], T = i.flip?.overflows || [];
			if (l && w.push(C[g]), u) {
				let e = ut(r, a, y);
				w.push(C[e[0]], C[e[1]]);
			}
			if (T = [...T, {
				placement: r,
				overflows: w
			}], !w.every((e) => e <= 0)) {
				let e = (i.flip?.index || 0) + 1, t = S[e];
				if (t && (u !== "alignment" || _ === Z(t) || T.every((e) => Z(e.placement) !== _ || e.overflows[0] > 0))) return {
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
								let t = Z(e.placement);
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
function kt(e, t) {
	return {
		top: e.top - t.height,
		right: e.right - t.width,
		bottom: e.bottom - t.height,
		left: e.left - t.width
	};
}
function At(e) {
	return Xe.some((t) => e[t] >= 0);
}
var jt = function(e) {
	return e === void 0 && (e = {}), {
		name: "hide",
		options: e,
		async fn(t) {
			let { rects: n, platform: r } = t, { strategy: i = "referenceHidden", ...a } = it(e, t);
			switch (i) {
				case "referenceHidden": {
					let e = kt(await r.detectOverflow(t, {
						...a,
						elementContext: "reference"
					}), n.reference);
					return { data: {
						referenceHiddenOffsets: e,
						referenceHidden: At(e)
					} };
				}
				case "escaped": {
					let e = kt(await r.detectOverflow(t, {
						...a,
						altBoundary: !0
					}), n.floating);
					return { data: {
						escapedOffsets: e,
						escaped: At(e)
					} };
				}
				default: return {};
			}
		}
	};
}, Mt = /*#__PURE__*/ new Set(["left", "top"]);
async function Nt(e, t) {
	let { placement: n, platform: r, elements: i } = e, a = await (r.isRTL == null ? void 0 : r.isRTL(i.floating)), o = at(n), s = ot(n), c = Z(n) === "y", l = Mt.has(o) ? -1 : 1, u = a && c ? -1 : 1, d = it(t, e), { mainAxis: f, crossAxis: p, alignmentAxis: m } = typeof d == "number" ? {
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
var Pt = function(e) {
	return e === void 0 && (e = 0), {
		name: "offset",
		options: e,
		async fn(t) {
			var n;
			let { x: r, y: i, placement: a, middlewareData: o } = t, s = await Nt(t, e);
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
}, Ft = function(e) {
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
			} }, ...l } = it(e, t), u = {
				x: n,
				y: r
			}, d = await a.detectOverflow(t, l), f = Z(i), p = st(f), m = u[p], h = u[f], g = (e, t) => rt(t + d[e === "y" ? "top" : "left"], t, t - d[e === "y" ? "bottom" : "right"]);
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
}, It = function(e) {
	return e === void 0 && (e = {}), {
		options: e,
		fn(t) {
			let { x: n, y: r, placement: i, rects: a, middlewareData: o } = t, { offset: s = 0, mainAxis: c = !0, crossAxis: l = !0 } = it(e, t), u = {
				x: n,
				y: r
			}, d = Z(i), f = st(d), p = u[f], m = u[d], h = it(s, t), g = typeof h == "number" ? {
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
				let e = f === "y" ? "width" : "height", t = Mt.has(at(i)), n = a.reference[d] - a.floating[e] + (t && o.offset?.[d] || 0) + (t ? 0 : g.crossAxis), r = a.reference[d] + a.reference[e] + (t ? 0 : o.offset?.[d] || 0) - (t ? g.crossAxis : 0);
				m < n ? m = n : m > r && (m = r);
			}
			return {
				[f]: p,
				[d]: m
			};
		}
	};
}, Lt = function(e) {
	return e === void 0 && (e = {}), {
		name: "size",
		options: e,
		async fn(t) {
			let { placement: n, rects: r, platform: i, elements: a } = t, { apply: o = () => {}, ...s } = it(e, t), c = await i.detectOverflow(t, s), l = at(n), u = ot(n), d = Z(n) === "y", { width: f, height: p } = r.floating, m, h;
			l === "top" || l === "bottom" ? (m = l, h = u === (await (i.isRTL == null ? void 0 : i.isRTL(a.floating)) ? "start" : "end") ? "left" : "right") : (h = l, m = u === "end" ? "top" : "bottom");
			let g = p - c.top - c.bottom, _ = f - c.left - c.right, v = Ze(p - c[m], g), y = Ze(f - c[h], _), b = t.middlewareData.shift, x = !b, S = v, C = y;
			b != null && b.enabled.x && (C = _), b != null && b.enabled.y && (S = g), x && !u && (d ? C = f - 2 * Qe(c.left, c.right) : S = p - 2 * Qe(c.top, c.bottom)), await o({
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
function Rt() {
	return typeof window < "u";
}
function zt(e) {
	return Vt(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function Q(e) {
	var t;
	return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function Bt(e) {
	return ((Vt(e) ? e.ownerDocument : e.document) || window.document)?.documentElement;
}
function Vt(e) {
	return Rt() ? e instanceof Node || e instanceof Q(e).Node : !1;
}
function $(e) {
	return Rt() ? e instanceof Element || e instanceof Q(e).Element : !1;
}
function Ht(e) {
	return Rt() ? e instanceof HTMLElement || e instanceof Q(e).HTMLElement : !1;
}
function Ut(e) {
	return !Rt() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof Q(e).ShadowRoot;
}
function Wt(e) {
	let { overflow: t, overflowX: n, overflowY: r, display: i } = tn(e);
	return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && i !== "inline" && i !== "contents";
}
function Gt(e) {
	return /^(table|td|th)$/.test(zt(e));
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
	let t = $(e) ? tn(e) : e;
	return Yt(t.transform) || Yt(t.translate) || Yt(t.scale) || Yt(t.rotate) || Yt(t.perspective) || !$t() && (Yt(t.backdropFilter) || Yt(t.filter)) || qt.test(t.willChange || "") || Jt.test(t.contain || "");
}
function Qt(e) {
	let t = rn(e);
	for (; Ht(t) && !en(t);) {
		if (Zt(t)) return t;
		if (Kt(t)) return null;
		t = rn(t);
	}
	return null;
}
function $t() {
	return Xt ??= typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none"), Xt;
}
function en(e) {
	return /^(html|body|#document)$/.test(zt(e));
}
function tn(e) {
	return Q(e).getComputedStyle(e);
}
function nn(e) {
	return $(e) ? {
		scrollLeft: e.scrollLeft,
		scrollTop: e.scrollTop
	} : {
		scrollLeft: e.scrollX,
		scrollTop: e.scrollY
	};
}
function rn(e) {
	if (zt(e) === "html") return e;
	let t = e.assignedSlot || e.parentNode || Ut(e) && e.host || Bt(e);
	return Ut(t) ? t.host : t;
}
function an(e) {
	let t = rn(e);
	return en(t) ? (e.ownerDocument || e).body : Ht(t) && Wt(t) ? t : an(t);
}
function on(e, t, n) {
	t === void 0 && (t = []), n === void 0 && (n = !0);
	let r = an(e), i = r === e.ownerDocument?.body, a = Q(r);
	if (i) {
		let e = sn(a);
		return t.concat(a, a.visualViewport || [], Wt(r) ? r : [], e && n ? on(e) : []);
	}
	return t.concat(r, on(r, [], n));
}
function sn(e) {
	return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
// node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs
function cn(e) {
	let t = tn(e), n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0, i = Ht(e), a = i ? e.offsetWidth : n, o = i ? e.offsetHeight : r, s = $e(n) !== a || $e(r) !== o;
	return s && (n = a, r = o), {
		width: n,
		height: r,
		$: s
	};
}
function ln(e) {
	return $(e) ? e : e.contextElement;
}
function un(e) {
	let t = ln(e);
	if (!Ht(t)) return tt(1);
	let n = t.getBoundingClientRect(), { width: r, height: i, $: a } = cn(t), o = (a ? $e(n.width) : n.width) / r, s = (a ? $e(n.height) : n.height) / i;
	return o && Number.isFinite(o) || (o = 1), s && Number.isFinite(s) || (s = 1), {
		x: o,
		y: s
	};
}
var dn = /*#__PURE__*/ tt(0);
function fn(e) {
	let t = Q(e);
	return !$t() || !t.visualViewport ? dn : {
		x: t.visualViewport.offsetLeft,
		y: t.visualViewport.offsetTop
	};
}
function pn(e, t, n) {
	return t === void 0 && (t = !1), !!n && t && n === Q(e);
}
function mn(e, t, n, r) {
	t === void 0 && (t = !1), n === void 0 && (n = !1);
	let i = e.getBoundingClientRect(), a = ln(e), o = tt(1);
	t && (r ? $(r) && (o = un(r)) : o = un(e));
	let s = pn(a, n, r) ? fn(a) : tt(0), c = (i.left + s.x) / o.x, l = (i.top + s.y) / o.y, u = i.width / o.x, d = i.height / o.y;
	if (a && r) {
		let e = Q(a), t = $(r) ? Q(r) : r, n = e, i = sn(n);
		for (; i && t !== n;) {
			let e = un(i), t = i.getBoundingClientRect(), r = tn(i), a = t.left + (i.clientLeft + parseFloat(r.paddingLeft)) * e.x, o = t.top + (i.clientTop + parseFloat(r.paddingTop)) * e.y;
			c *= e.x, l *= e.y, u *= e.x, d *= e.y, c += a, l += o, n = Q(i), i = sn(n);
		}
	}
	return St({
		width: u,
		height: d,
		x: c,
		y: l
	});
}
function hn(e, t) {
	let n = nn(e).scrollLeft;
	return t ? t.left + n : mn(Bt(e)).left + n;
}
function gn(e, t) {
	let n = e.getBoundingClientRect();
	return {
		x: n.left + t.scrollLeft - hn(e, n),
		y: n.top + t.scrollTop
	};
}
function _n(e) {
	let { elements: t, rect: n, offsetParent: r, strategy: i } = e, a = i === "fixed", o = Bt(r), s = t ? Kt(t.floating) : !1;
	if (r === o || s && a) return n;
	let c = {
		scrollLeft: 0,
		scrollTop: 0
	}, l = tt(1), u = tt(0), d = Ht(r);
	if ((d || !a) && ((zt(r) !== "body" || Wt(o)) && (c = nn(r)), d)) {
		let e = mn(r);
		l = un(r), u.x = e.x + r.clientLeft, u.y = e.y + r.clientTop;
	}
	let f = o && !d && !a ? gn(o, c) : tt(0);
	return {
		width: n.width * l.x,
		height: n.height * l.y,
		x: n.x * l.x - c.scrollLeft * l.x + u.x + f.x,
		y: n.y * l.y - c.scrollTop * l.y + u.y + f.y
	};
}
function vn(e) {
	return e.getClientRects ? Array.from(e.getClientRects()) : [];
}
function yn(e) {
	let t = nn(e), n = e.ownerDocument.body, r = Qe(e.scrollWidth, e.clientWidth, n.scrollWidth, n.clientWidth), i = Qe(e.scrollHeight, e.clientHeight, n.scrollHeight, n.clientHeight), a = -t.scrollLeft + hn(e), o = -t.scrollTop;
	return tn(n).direction === "rtl" && (a += Qe(e.clientWidth, n.clientWidth) - r), {
		width: r,
		height: i,
		x: a,
		y: o
	};
}
var bn = 25;
function xn(e, t, n) {
	n === void 0 && (n = "viewport");
	let r = n === "layoutViewport", i = Q(e), a = Bt(e), o = i.visualViewport, s = a.clientWidth, c = a.clientHeight, l = 0, u = 0;
	if (o) {
		let e = !$t() || t === "fixed";
		r ? e || (l = -o.offsetLeft, u = -o.offsetTop) : (s = o.width, c = o.height, e && (l = o.offsetLeft, u = o.offsetTop));
	}
	if (hn(a) <= 0) {
		let e = a.ownerDocument, t = e.body, n = getComputedStyle(t), r = e.compatMode === "CSS1Compat" && parseFloat(n.marginLeft) + parseFloat(n.marginRight) || 0, i = Math.abs(a.clientWidth - t.clientWidth - r), o = getComputedStyle(a).scrollbarGutter === "stable both-edges" ? i / 2 : i;
		o <= bn && (s -= o);
	}
	return {
		width: s,
		height: c,
		x: l,
		y: u
	};
}
function Sn(e, t) {
	let n = mn(e, !0, t === "fixed"), r = n.top + e.clientTop, i = n.left + e.clientLeft, a = un(e);
	return {
		width: e.clientWidth * a.x,
		height: e.clientHeight * a.y,
		x: i * a.x,
		y: r * a.y
	};
}
function Cn(e, t, n) {
	let r;
	if (t === "viewport" || t === "layoutViewport") r = xn(e, n, t);
	else if (t === "document") r = yn(Bt(e));
	else if ($(t)) r = Sn(t, n);
	else {
		let n = fn(e);
		r = {
			x: t.x - n.x,
			y: t.y - n.y,
			width: t.width,
			height: t.height
		};
	}
	return St(r);
}
function wn(e, t) {
	let n = t.get(e);
	if (n) return n;
	let r = on(e, [], !1).filter((e) => $(e) && zt(e) !== "body"), i = null, a = tn(e).position === "fixed", o = a ? rn(e) : e;
	for (; $(o) && !en(o);) {
		let e = tn(o), t = Zt(o), n = i ? i.position : a ? "fixed" : "";
		!t && (n === "fixed" || n === "absolute" && e.position === "static") ? r = r.filter((e) => e !== o) : i = e, o = rn(o);
	}
	return t.set(e, r), r;
}
function Tn(e) {
	let { element: t, boundary: n, rootBoundary: r, strategy: i } = e, a = [...n === "clippingAncestors" ? Kt(t) ? [] : wn(t, this._c) : [].concat(n), r], o = Cn(t, a[0], i), s = o.top, c = o.right, l = o.bottom, u = o.left;
	for (let e = 1; e < a.length; e++) {
		let n = Cn(t, a[e], i);
		s = Qe(n.top, s), c = Ze(n.right, c), l = Ze(n.bottom, l), u = Qe(n.left, u);
	}
	return {
		width: c - u,
		height: l - s,
		x: u,
		y: s
	};
}
function En(e) {
	let { width: t, height: n } = cn(e);
	return {
		width: t,
		height: n
	};
}
function Dn(e, t, n) {
	let r = Ht(t), i = Bt(t), a = n === "fixed", o = mn(e, !0, a, t), s = {
		scrollLeft: 0,
		scrollTop: 0
	}, c = tt(0);
	if ((r || !a) && ((zt(t) !== "body" || Wt(i)) && (s = nn(t)), r)) {
		let e = mn(t, !0, a, t);
		c.x = e.x + t.clientLeft, c.y = e.y + t.clientTop;
	}
	!r && i && (c.x = hn(i));
	let l = i && !r && !a ? gn(i, s) : tt(0);
	return {
		x: o.left + s.scrollLeft - c.x - l.x,
		y: o.top + s.scrollTop - c.y - l.y,
		width: o.width,
		height: o.height
	};
}
function On(e) {
	return tn(e).position === "static";
}
function kn(e, t) {
	if (!Ht(e) || tn(e).position === "fixed") return null;
	if (t) return t(e);
	let n = e.offsetParent;
	return Bt(e) === n && (n = n.ownerDocument.body), n;
}
function An(e, t) {
	let n = Q(e);
	if (Kt(e)) return n;
	if (!Ht(e)) {
		let t = rn(e);
		for (; t && !en(t);) {
			if ($(t) && !On(t)) return t;
			t = rn(t);
		}
		return n;
	}
	let r = kn(e, t);
	for (; r && Gt(r) && On(r);) r = kn(r, t);
	return r && en(r) && On(r) && !Zt(r) ? n : r || Qt(e) || n;
}
var jn = async function(e) {
	let t = this.getOffsetParent || An, n = this.getDimensions, r = await n(e.floating);
	return {
		reference: Dn(e.reference, await t(e.floating), e.strategy),
		floating: {
			x: 0,
			y: 0,
			width: r.width,
			height: r.height
		}
	};
};
function Mn(e) {
	return tn(e).direction === "rtl";
}
var Nn = {
	convertOffsetParentRelativeRectToViewportRelativeRect: _n,
	getDocumentElement: Bt,
	getClippingRect: Tn,
	getOffsetParent: An,
	getElementRects: jn,
	getClientRects: vn,
	getDimensions: En,
	getScale: un,
	isElement: $,
	isRTL: Mn
};
function Pn(e, t) {
	return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function Fn(e, t, n) {
	let r = null, i, a = Bt(e);
	function o() {
		var e;
		clearTimeout(i), (e = r) == null || e.disconnect(), r = null;
	}
	function s(n, c) {
		n === void 0 && (n = !1), c === void 0 && (c = 1), o();
		let l = e.getBoundingClientRect(), { left: u, top: d, width: f, height: p } = l;
		if (n || t(), !f || !p) return;
		let m = et(d), h = et(a.clientWidth - (u + f)), g = et(a.clientHeight - (d + p)), _ = et(u), v = {
			rootMargin: -m + "px " + -h + "px " + -g + "px " + -_ + "px",
			threshold: Qe(0, Ze(1, c)) || 1
		}, y = !0;
		function b(t) {
			let n = t[0].intersectionRatio;
			if (!Pn(l, e.getBoundingClientRect())) return s();
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
	let c = Q(e), l = () => s(n);
	return c.addEventListener("resize", l), s(!0), () => {
		c.removeEventListener("resize", l), o();
	};
}
function In(e, t, n, r) {
	r === void 0 && (r = {});
	let { ancestorScroll: i = !0, ancestorResize: a = !0, elementResize: o = typeof ResizeObserver == "function", layoutShift: s = typeof IntersectionObserver == "function", animationFrame: c = !1 } = r, l = ln(e), u = i || a ? [...l ? on(l) : [], ...t ? on(t) : []] : [];
	u.forEach((e) => {
		i && e.addEventListener("scroll", n), a && e.addEventListener("resize", n);
	});
	let d = l && s ? Fn(l, n, a) : null, f = -1, p = null;
	o && (p = new ResizeObserver((e) => {
		let [r] = e;
		r && r.target === l && p && t && (p.unobserve(t), cancelAnimationFrame(f), f = requestAnimationFrame(() => {
			var e;
			(e = p) == null || e.observe(t);
		})), n();
	}), l && !c && p.observe(l), t && p.observe(t));
	let m, h = c ? mn(e) : null;
	c && g();
	function g() {
		let t = mn(e);
		h && !Pn(h, t) && n(), h = t, m = requestAnimationFrame(g);
	}
	return n(), () => {
		var e;
		u.forEach((e) => {
			i && e.removeEventListener("scroll", n), a && e.removeEventListener("resize", n);
		}), d?.(), (e = p) == null || e.disconnect(), p = null, c && cancelAnimationFrame(m);
	};
}
var Ln = Pt, Rn = Ft, zn = Ot, Bn = Lt, Vn = jt, Hn = Dt, Un = It, Wn = (e, t, n) => {
	let r = /* @__PURE__ */ new Map(), i = n ?? {}, a = {
		...Nn,
		...i.platform,
		_c: r
	};
	return Et(e, t, {
		...i,
		platform: a
	});
};
// node_modules/bits-ui/dist/internal/floating-svelte/use-floating.svelte.js
function Gn(e) {
	let t = e.whileElementsMounted, n = W(() => Ke(e.open) ?? !0), r = W(() => Ke(e.middleware)), i = W(() => Ke(e.transform) ?? !0), a = W(() => Ke(e.placement) ?? "bottom"), o = W(() => Ke(e.strategy) ?? "absolute"), s = W(() => Ke(e.sideOffset) ?? 0), c = W(() => Ke(e.alignOffset) ?? 0), l = e.reference, u;
	x(() => {
		u = {
			middleware: C(r),
			placement: C(a),
			strategy: C(o),
			open: C(n),
			sideOffset: C(s),
			alignOffset: C(c)
		};
	});
	let d = z(0), f = z(0), p = Y(null), m = z(g(C(o))), h = z(g(C(a))), _ = z(g({})), y = z(!1), b = !1, S = 0, w = !1, T = W(() => {
		let e = p.current ? Je(p.current, C(d)) : C(d), t = p.current ? Je(p.current, C(f)) : C(f);
		return C(i) ? {
			position: C(m),
			left: "0",
			top: "0",
			transform: `translate(${e}px, ${t}px)`,
			...p.current && qe(p.current) >= 1.5 && { willChange: "transform" }
		} : {
			position: C(m),
			left: `${e}px`,
			top: `${t}px`
		};
	}), E;
	function D() {
		if (w || l.current === null || p.current === null) return;
		let e = l.current, t = p.current, n = ++S;
		Wn(e, t, {
			middleware: u.middleware,
			placement: u.placement,
			strategy: u.strategy
		}).then((r) => {
			if (n === S && l.current === e && p.current === t) {
				if (Kn(e)) F(_, {
					...C(_),
					hide: {
						...C(_).hide,
						referenceHidden: !0
					}
				}, !0);
				else {
					if (!u.open && C(d) !== 0 && C(f) !== 0) {
						let e = Math.max(Math.abs(u.sideOffset), Math.abs(u.alignOffset), 15);
						if (r.x <= e && r.y <= e) return;
					}
					F(d, r.x, !0), F(f, r.y, !0), F(m, r.strategy, !0), F(h, r.placement, !0), F(_, r.middlewareData, !0), F(y, !0);
				}
			}
		});
	}
	function O() {
		typeof E == "function" && (E(), E = void 0), S++;
	}
	function k() {
		O(), t === void 0 ? (A(), D()) : C(n) && l.current !== null && p.current !== null && (A(), E = t(l.current, p.current, D));
	}
	function A() {
		return [
			C(r),
			C(a),
			C(o)
		];
	}
	function j() {
		!C(n) && p.current === null && F(y, !1);
	}
	function M() {
		return [
			C(r),
			C(a),
			C(o),
			C(s),
			C(c),
			C(n)
		];
	}
	return v(() => {
		t === void 0 && C(n) && (A(), D());
	}), v(k), v(() => {
		t !== void 0 && (M(), C(n) && C(y) ? b ? D() : b = !0 : b = !1);
	}), v(j), v(() => () => {
		w = !0, O();
	}), {
		floating: p,
		reference: l,
		get strategy() {
			return C(m);
		},
		get placement() {
			return C(h);
		},
		get middlewareData() {
			return C(_);
		},
		get isPositioned() {
			return C(y);
		},
		get floatingStyles() {
			return C(T);
		},
		get update() {
			return D;
		}
	};
}
function Kn(e) {
	return e instanceof Element ? !e.isConnected || e instanceof HTMLElement && e.hidden ? !0 : e.getClientRects().length === 0 : !1;
}
// node_modules/bits-ui/dist/bits/utilities/floating-layer/use-floating-layer.svelte.js
var qn = {
	top: "bottom",
	right: "left",
	bottom: "top",
	left: "right"
}, Jn = new O("Floating.Content"), Yn = class e {
	static create(t, n = !1) {
		return n ? Jn.set(new e(t, Ue.get())) : Jn.set(new e(t, He.get()));
	}
	opts;
	root;
	contentRef = Y(null);
	wrapperRef = Y(null);
	arrowRef = Y(null);
	contentAttachment = s(this.contentRef);
	wrapperAttachment = s(this.wrapperRef);
	arrowAttachment = s(this.arrowRef);
	arrowId = Y(de());
	#e = W(() => {
		if (typeof this.opts.style == "string") return b(this.opts.style);
		if (!this.opts.style) return {};
	});
	#t = void 0;
	#n = new S(() => this.arrowRef.current ?? void 0);
	#r = W(() => this.#n?.width ?? 0);
	#i = W(() => this.#n?.height ?? 0);
	#a = W(() => this.opts.side?.current + (this.opts.align.current === "center" ? "" : `-${this.opts.align.current}`));
	#o = W(() => (Array.isArray(this.opts.collisionBoundary.current) ? this.opts.collisionBoundary.current : [this.opts.collisionBoundary.current]).filter(a));
	#s = W(() => C(this.#o).length > 0);
	get hasExplicitBoundaries() {
		return C(this.#s);
	}
	set hasExplicitBoundaries(e) {
		F(this.#s, e);
	}
	#c = W(() => ({
		padding: this.opts.collisionPadding.current,
		boundary: C(this.#o),
		altBoundary: this.hasExplicitBoundaries
	}));
	get detectOverflowOptions() {
		return C(this.#c);
	}
	set detectOverflowOptions(e) {
		F(this.#c, e);
	}
	#l = z(void 0);
	#u = z(void 0);
	#d = z(void 0);
	#f = z(void 0);
	#p = W(() => [
		Ln({
			mainAxis: this.opts.sideOffset.current + C(this.#i),
			alignmentAxis: this.opts.alignOffset.current
		}),
		this.opts.avoidCollisions.current && Rn({
			mainAxis: !0,
			crossAxis: !1,
			limiter: this.opts.sticky.current === "partial" ? Un() : void 0,
			...this.detectOverflowOptions
		}),
		this.opts.avoidCollisions.current && zn({ ...this.detectOverflowOptions }),
		Bn({
			...this.detectOverflowOptions,
			apply: ({ rects: e, availableWidth: t, availableHeight: n }) => {
				let { width: r, height: i } = e.reference;
				F(this.#l, t, !0), F(this.#u, n, !0), F(this.#d, r, !0), F(this.#f, i, !0);
			}
		}),
		this.arrowRef.current && Hn({
			element: this.arrowRef.current,
			padding: this.opts.arrowPadding.current
		}),
		Xn({
			arrowWidth: C(this.#r),
			arrowHeight: C(this.#i)
		}),
		this.opts.hideWhenDetached.current && Vn({
			strategy: "referenceHidden",
			...this.detectOverflowOptions
		}),
		this.opts.hideWhenDetached.current && !this.hasExplicitBoundaries && {
			...Vn({
				strategy: "referenceHidden",
				boundary: "clippingAncestors"
			}),
			name: "hideClipping"
		}
	].filter(Boolean));
	get middleware() {
		return C(this.#p);
	}
	set middleware(e) {
		F(this.#p, e);
	}
	floating;
	#m = W(() => Qn(this.floating.placement));
	get placedSide() {
		return C(this.#m);
	}
	set placedSide(e) {
		F(this.#m, e);
	}
	#h = W(() => $n(this.floating.placement));
	get placedAlign() {
		return C(this.#h);
	}
	set placedAlign(e) {
		F(this.#h, e);
	}
	#g = W(() => this.floating.middlewareData.arrow?.x ?? 0);
	get arrowX() {
		return C(this.#g);
	}
	set arrowX(e) {
		F(this.#g, e);
	}
	#_ = W(() => this.floating.middlewareData.arrow?.y ?? 0);
	get arrowY() {
		return C(this.#_);
	}
	set arrowY(e) {
		F(this.#_, e);
	}
	#v = W(() => this.floating.middlewareData.arrow?.centerOffset !== 0);
	get cannotCenterArrow() {
		return C(this.#v);
	}
	set cannotCenterArrow(e) {
		F(this.#v, e);
	}
	#y = z("auto");
	get contentZIndex() {
		return C(this.#y);
	}
	set contentZIndex(e) {
		F(this.#y, e, !0);
	}
	#b = W(() => qn[this.placedSide]);
	get arrowBaseSide() {
		return C(this.#b);
	}
	set arrowBaseSide(e) {
		F(this.#b, e);
	}
	#x = W(() => ({
		id: this.opts.wrapperId.current,
		"data-bits-floating-content-wrapper": "",
		style: {
			...this.floating.floatingStyles,
			transform: this.floating.isPositioned ? this.floating.floatingStyles.transform : "translate(0, -200%)",
			minWidth: "max-content",
			zIndex: this.contentZIndex,
			"--bits-floating-transform-origin": `${this.floating.middlewareData.transformOrigin?.x} ${this.floating.middlewareData.transformOrigin?.y}`,
			"--bits-floating-available-width": `${C(this.#l)}px`,
			"--bits-floating-available-height": `${C(this.#u)}px`,
			"--bits-floating-anchor-width": `${C(this.#d)}px`,
			"--bits-floating-anchor-height": `${C(this.#f)}px`,
			...(this.floating.middlewareData.hide?.referenceHidden || this.floating.middlewareData.hideClipping?.referenceHidden) && {
				visibility: "hidden",
				"pointer-events": "none"
			},
			...C(this.#e)
		},
		dir: this.opts.dir.current,
		...this.wrapperAttachment
	}));
	get wrapperProps() {
		return C(this.#x);
	}
	set wrapperProps(e) {
		F(this.#x, e);
	}
	#S = W(() => ({
		"data-side": this.placedSide,
		"data-align": this.placedAlign,
		style: _({ ...C(this.#e) }),
		...this.contentAttachment
	}));
	get props() {
		return C(this.#S);
	}
	set props(e) {
		F(this.#S, e);
	}
	#C = W(() => ({
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
		return C(this.#C);
	}
	set arrowStyle(e) {
		F(this.#C, e);
	}
	constructor(e, t) {
		this.opts = e, this.root = t, this.#t = e.updatePositionStrategy, e.customAnchor && (this.root.customAnchorNode.current = e.customAnchor.current), w(() => e.customAnchor.current, (e) => {
			this.root.customAnchorNode.current = e;
		}), this.floating = Gn({
			strategy: () => this.opts.strategy.current,
			placement: () => C(this.#a),
			middleware: () => this.middleware,
			reference: this.root.anchorNode,
			whileElementsMounted: (...e) => In(...e, { animationFrame: this.#t?.current === "always" }),
			open: () => this.opts.enabled.current,
			sideOffset: () => this.opts.sideOffset.current,
			alignOffset: () => this.opts.alignOffset.current
		}), v(() => {
			this.floating.isPositioned && this.opts.onPlaced?.current();
		}), w([() => this.contentRef.current, () => this.opts.enabled.current], ([e, t]) => {
			if (!e || !t) return;
			let r = n(e), i = r.requestAnimationFrame(() => {
				if (this.contentRef.current !== e || !this.opts.enabled.current) return;
				let t = r.getComputedStyle(e).zIndex;
				t !== this.contentZIndex && (this.contentZIndex = t);
			});
			return () => {
				r.cancelAnimationFrame(i);
			};
		}), v(() => {
			this.floating.floating.current = this.wrapperRef.current;
		});
	}
};
function Xn(e) {
	return {
		name: "transformOrigin",
		options: e,
		fn(t) {
			let { placement: n, rects: r, middlewareData: i } = t, a = i.arrow?.centerOffset !== 0, o = a ? 0 : e.arrowWidth, s = a ? 0 : e.arrowHeight, [c, l] = Zn(n), u = {
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
function Zn(e) {
	let [t, n = "center"] = e.split("-");
	return [t, n];
}
function Qn(e) {
	return Zn(e)[0];
}
function $n(e) {
	return Zn(e)[1];
}
// node_modules/bits-ui/dist/bits/utilities/floating-layer/components/floating-layer-content.svelte
function er(e, n) {
	B(n, !0);
	let r = P(n, "side", 3, "bottom"), i = P(n, "sideOffset", 3, 0), a = P(n, "align", 3, "center"), s = P(n, "alignOffset", 3, 0), c = P(n, "arrowPadding", 3, 0), l = P(n, "avoidCollisions", 3, !0), u = P(n, "collisionBoundary", 19, () => []), f = P(n, "collisionPadding", 3, 0), p = P(n, "hideWhenDetached", 3, !1), m = P(n, "onPlaced", 3, () => {}), h = P(n, "sticky", 3, "partial"), g = P(n, "updatePositionStrategy", 3, "optimized"), _ = P(n, "strategy", 3, "fixed"), v = P(n, "dir", 3, "ltr"), y = P(n, "style", 19, () => ({})), b = P(n, "wrapperId", 19, de), x = P(n, "customAnchor", 3, null), S = P(n, "tooltip", 3, !1), w = Yn.create({
		side: j(() => r()),
		sideOffset: j(() => i()),
		align: j(() => a()),
		alignOffset: j(() => s()),
		id: j(() => n.id),
		arrowPadding: j(() => c()),
		avoidCollisions: j(() => l()),
		collisionBoundary: j(() => u()),
		collisionPadding: j(() => f()),
		hideWhenDetached: j(() => p()),
		onPlaced: j(() => m()),
		sticky: j(() => h()),
		updatePositionStrategy: j(() => g()),
		strategy: j(() => _()),
		dir: j(() => v()),
		style: j(() => y()),
		enabled: j(() => n.enabled),
		wrapperId: j(() => b()),
		customAnchor: j(() => x())
	}, T(() => S())), E = W(() => d(w.wrapperProps, { style: { pointerEvents: "auto" } }));
	var D = K(), O = X(D);
	U(O, () => n.content ?? t, () => ({
		props: w.props,
		wrapperProps: C(E)
	})), o(e, D), V();
}
// node_modules/bits-ui/dist/bits/utilities/floating-layer/components/floating-layer-content-static.svelte
function tr(e, n) {
	B(n, !0), h(() => {
		n.onPlaced?.();
	});
	var r = K(), i = X(r);
	U(i, () => n.content ?? t, () => ({
		props: {},
		wrapperProps: {}
	})), o(e, r), V();
}
// node_modules/bits-ui/dist/bits/utilities/popper-layer/popper-content.svelte
var nr = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"content",
	"isStatic",
	"onPlaced"
]);
function rr(e, t) {
	let n = P(t, "isStatic", 3, !1), r = R(t, nr);
	var i = K(), a = X(i), s = (e) => {
		tr(e, {
			get content() {
				return t.content;
			},
			get onPlaced() {
				return t.onPlaced;
			}
		});
	}, c = (e) => {
		er(e, p({
			get content() {
				return t.content;
			},
			get onPlaced() {
				return t.onPlaced;
			}
		}, () => r));
	};
	J(a, (e) => {
		n() ? e(s) : e(c, -1);
	}), o(e, i);
}
// node_modules/bits-ui/dist/bits/utilities/popper-layer/popper-layer-inner.svelte
var ir = /* @__PURE__ */ new Set(/* @__PURE__ */ "$$slots.$$events.$$legacy.popper.onEscapeKeydown.escapeKeydownBehavior.preventOverflowTextSelection.id.onPointerDown.onPointerUp.side.sideOffset.align.alignOffset.arrowPadding.avoidCollisions.collisionBoundary.collisionPadding.sticky.hideWhenDetached.updatePositionStrategy.strategy.dir.preventScroll.wrapperId.style.onPlaced.onInteractOutside.onCloseAutoFocus.onOpenAutoFocus.onFocusOutside.interactOutsideBehavior.loop.trapFocus.isValidEvent.customAnchor.isStatic.enabled.forceMount.ref.tooltip.contentPointerEvents".split(".")), ar = N("<!> <!>", 1);
function or(e, n) {
	B(n, !0);
	let r = P(n, "interactOutsideBehavior", 3, "close"), i = P(n, "trapFocus", 3, !0), a = P(n, "isValidEvent", 3, () => !1), s = P(n, "customAnchor", 3, null), c = P(n, "isStatic", 3, !1), l = P(n, "tooltip", 3, !1), u = P(n, "contentPointerEvents", 3, "auto"), f = R(n, ir), p = W(() => n.preventScroll ?? !0), m = W(() => n.strategy ?? (C(p) ? "fixed" : "absolute"));
	rr(e, {
		get isStatic() {
			return c();
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
			return C(m);
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
			return l();
		},
		content: (e, s) => {
			let c = () => (s?.()).props, l = () => (s?.()).wrapperProps;
			var m = ar(), h = X(m), g = (e) => {
				Fe(e, { get preventScroll() {
					return C(p);
				} });
			}, _ = (e) => {
				Fe(e, { get preventScroll() {
					return C(p);
				} });
			};
			J(h, (e) => {
				n.forceMount && n.enabled ? e(g) : n.forceMount || e(_, 1);
			});
			var v = L(h, 2);
			ke(v, {
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
					return i();
				},
				get forceMount() {
					return n.forceMount;
				},
				get ref() {
					return n.ref;
				},
				focusScope: (e, i) => {
					let s = () => (i?.()).props;
					we(e, {
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
							_e(e, {
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
									return a();
								},
								get enabled() {
									return n.enabled;
								},
								get ref() {
									return n.ref;
								},
								children: (e, r) => {
									let i = () => (r?.()).props;
									me(e, {
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
											var a = K(), p = X(a);
											{
												let e = W(() => ({
													props: d(f, c(), i(), s(), {
														id: n.id,
														style: { pointerEvents: u() }
													}),
													wrapperProps: l()
												}));
												U(p, () => n.popper ?? t, () => C(e));
											}
											o(e, a);
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
			}), o(e, m);
		},
		$$slots: { content: !0 }
	}), V();
}
// node_modules/bits-ui/dist/bits/utilities/popper-layer/popper-layer.svelte
var sr = /* @__PURE__ */ new Set(/* @__PURE__ */ "$$slots.$$events.$$legacy.popper.open.onEscapeKeydown.escapeKeydownBehavior.preventOverflowTextSelection.id.onPointerDown.onPointerUp.side.sideOffset.align.alignOffset.arrowPadding.avoidCollisions.collisionBoundary.collisionPadding.sticky.hideWhenDetached.updatePositionStrategy.strategy.dir.preventScroll.wrapperId.style.onPlaced.onInteractOutside.onCloseAutoFocus.onOpenAutoFocus.onFocusOutside.interactOutsideBehavior.loop.trapFocus.isValidEvent.customAnchor.isStatic.ref.shouldRender".split("."));
function cr(e, t) {
	let n = P(t, "interactOutsideBehavior", 3, "close"), r = P(t, "trapFocus", 3, !0), i = P(t, "isValidEvent", 3, () => !1), a = P(t, "customAnchor", 3, null), s = P(t, "isStatic", 3, !1), c = R(t, sr);
	var l = K(), u = X(l), d = (e) => {
		or(e, p({
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
	J(u, (e) => {
		t.shouldRender && e(d);
	}), o(e, l);
}
// node_modules/bits-ui/dist/bits/utilities/popper-layer/popper-layer-force-mount.svelte
var lr = /* @__PURE__ */ new Set(/* @__PURE__ */ "$$slots.$$events.$$legacy.popper.onEscapeKeydown.escapeKeydownBehavior.preventOverflowTextSelection.id.onPointerDown.onPointerUp.side.sideOffset.align.alignOffset.arrowPadding.avoidCollisions.collisionBoundary.collisionPadding.sticky.hideWhenDetached.updatePositionStrategy.strategy.dir.preventScroll.wrapperId.style.onPlaced.onInteractOutside.onCloseAutoFocus.onOpenAutoFocus.onFocusOutside.interactOutsideBehavior.loop.trapFocus.isValidEvent.customAnchor.isStatic.enabled".split("."));
function ur(e, t) {
	let n = P(t, "interactOutsideBehavior", 3, "close"), r = P(t, "trapFocus", 3, !0), i = P(t, "isValidEvent", 3, () => !1), a = P(t, "customAnchor", 3, null), o = P(t, "isStatic", 3, !1), s = R(t, lr);
	or(e, p({
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
function dr(e, t) {
	let [n, r] = e, i = !1, a = t.length;
	for (let e = 0, o = a - 1; e < a; o = e++) {
		let [a, s] = t[e] ?? [0, 0], [c, l] = t[o] ?? [0, 0];
		s >= r != l >= r && n <= (c - a) * (r - s) / (l - s) + a && (i = !i);
	}
	return i;
}
function fr(e, t) {
	return e[0] >= t.left && e[0] <= t.right && e[1] >= t.top && e[1] <= t.bottom;
}
function pr(e, t) {
	let n = e.left + e.width / 2, r = e.top + e.height / 2, i = t.left + t.width / 2, a = t.top + t.height / 2, o = i - n, s = a - r;
	return Math.abs(o) > Math.abs(s) ? o > 0 ? "right" : "left" : s > 0 ? "bottom" : "top";
}
var mr = class {
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
		this.#n = typeof t == "number" && t > 0 ? t : null, w([
			e.triggerNode,
			e.contentNode,
			e.enabled
		], ([e, t, n]) => {
			if (!e || !t || !n) {
				this.#o = null, this.#m();
				return;
			}
			this.#o && this.#o !== e && this.#m(), this.#o = e;
			let r = xe(e);
			return [
				be(r, "pointermove", (n) => {
					this.#p([n.clientX, n.clientY], e, t);
				}),
				be(e, "pointerleave", (e) => {
					let n = e.relatedTarget;
					if (ze(n) && t.contains(n)) return;
					let r = this.#e.ignoredTargets?.() ?? [];
					ze(n) && r.some((e) => e === n || e.contains(n)) || (this.#a = ze(n) && r.length > 0 ? r.filter((e) => n.contains(e)) : [], this.#r = [e.clientX, e.clientY], this.#i = "content", this.#u());
				}),
				be(e, "pointerenter", () => {
					this.#m();
				}),
				be(t, "pointerenter", () => {
					this.#m();
				}),
				be(t, "pointerleave", (t) => {
					let n = t.relatedTarget;
					ze(n) && e.contains(n) || (this.#r = [t.clientX, t.clientY], this.#i = "trigger", this.#u());
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
		if (this.#i === "content" && fr(e, i) || this.#i === "trigger" && fr(e, r)) {
			this.#m();
			return;
		}
		if (this.#i === "content" && this.#a.length > 0) for (let t of this.#a) {
			let n = t.getBoundingClientRect();
			if (fr(e, n)) return;
			let i = pr(r, n), a = this.#h(r, n, i);
			if (a && dr(e, a)) return;
		}
		let a = pr(r, i), o = this.#h(r, i, a);
		if (o && dr(e, o)) return;
		let s = this.#i === "content" ? i : r;
		dr(e, this.#g(this.#r, s, a, this.#i)) || (this.#m(), this.#e.onPointerExit());
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
}, hr = class {
	#e;
	#t;
	#n = null;
	constructor(e, t) {
		this.#t = e, this.#e = t, this.stop = this.stop.bind(this), this.start = this.start.bind(this), ye(this.stop);
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
}, gr = ne({
	component: "tooltip",
	parts: ["content", "trigger"]
}), _r = new O("Tooltip.Provider"), vr = new O("Tooltip.Root"), yr = class {
	triggers = /* @__PURE__ */ new Map();
	#e = z(0);
	#t = z(null);
	get activeTriggerId() {
		return C(this.#t);
	}
	set activeTriggerId(e) {
		F(this.#t, e, !0);
	}
	#n = W(() => {
		C(this.#e);
		let e = this.activeTriggerId;
		return e === null ? null : this.triggers.get(e)?.node ?? null;
	});
	get activeTriggerNode() {
		return C(this.#n);
	}
	set activeTriggerNode(e) {
		F(this.#n, e);
	}
	#r = W(() => {
		C(this.#e);
		let e = this.activeTriggerId;
		return e === null ? null : this.triggers.get(e)?.payload ?? null;
	});
	get activePayload() {
		return C(this.#r);
	}
	set activePayload(e) {
		F(this.#r, e);
	}
	register = (e) => {
		this.triggers.set(e.id, e), e.id === this.activeTriggerId && m(this.#e);
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
}, br = class e {
	static create(t) {
		return _r.set(new e(t));
	}
	opts;
	#e = z(!0);
	get isOpenDelayed() {
		return C(this.#e);
	}
	set isOpenDelayed(e) {
		F(this.#e, e, !0);
	}
	isPointerInTransit = Y(!1);
	#t;
	#n = z(null);
	#r = !1;
	constructor(e) {
		this.opts = e, this.#t = new hr(() => {
			this.isOpenDelayed = !0;
		}, this.opts.skipDelayDuration.current), Ve(() => be(window, "scroll", (e) => {
			let t = C(this.#n);
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
		C(this.#n) && C(this.#n) !== e && C(this.#n).handleClose(), this.#a(), this.isOpenDelayed = !1, F(this.#n, e, !0);
	};
	onClose = (e) => {
		C(this.#n) === e && (F(this.#n, null), this.#i());
	};
	isTooltipOpen = (e) => C(this.#n) === e;
}, xr = class e {
	static create(t) {
		return vr.set(new e(t, _r.get()));
	}
	opts;
	provider;
	#e = W(() => this.opts.delayDuration.current ?? this.provider.opts.delayDuration.current);
	get delayDuration() {
		return C(this.#e);
	}
	set delayDuration(e) {
		F(this.#e, e);
	}
	#t = W(() => this.opts.disableHoverableContent.current ?? this.provider.opts.disableHoverableContent.current);
	get disableHoverableContent() {
		return C(this.#t);
	}
	set disableHoverableContent(e) {
		F(this.#t, e);
	}
	#n = W(() => this.opts.disableCloseOnTriggerClick.current ?? this.provider.opts.disableCloseOnTriggerClick.current);
	get disableCloseOnTriggerClick() {
		return C(this.#n);
	}
	set disableCloseOnTriggerClick(e) {
		F(this.#n, e);
	}
	#r = W(() => this.opts.disabled.current ?? this.provider.opts.disabled.current);
	get disabled() {
		return C(this.#r);
	}
	set disabled(e) {
		F(this.#r, e);
	}
	#i = W(() => this.opts.ignoreNonKeyboardFocus.current ?? this.provider.opts.ignoreNonKeyboardFocus.current);
	get ignoreNonKeyboardFocus() {
		return C(this.#i);
	}
	set ignoreNonKeyboardFocus(e) {
		F(this.#i, e);
	}
	registry;
	tether;
	#a = z(null);
	get contentNode() {
		return C(this.#a);
	}
	set contentNode(e) {
		F(this.#a, e, !0);
	}
	contentPresence;
	#o = z(!1);
	#s = z(!1);
	get openedViaFocus() {
		return C(this.#s);
	}
	set openedViaFocus(e) {
		F(this.#s, e, !0);
	}
	#c;
	#l = W(() => this.opts.open.current ? C(this.#o) ? "delayed-open" : "instant-open" : "closed");
	get stateAttr() {
		return C(this.#l);
	}
	set stateAttr(e) {
		F(this.#l, e);
	}
	constructor(e, t) {
		this.opts = e, this.provider = t, this.tether = e.tether.current?.state ?? null, this.registry = this.tether?.registry ?? new yr(), this.#c = new hr(() => {
			F(this.#o, !0), this.opts.open.current = !0;
		}, this.delayDuration ?? 0), this.tether && (this.tether.root = this, Ve(() => () => {
			this.tether?.root === this && (this.tether.root = null);
		})), this.contentPresence = new ce({
			open: this.opts.open,
			ref: j(() => this.contentNode),
			onComplete: () => {
				this.opts.onOpenChangeComplete.current(this.opts.open.current);
			}
		}), w(() => this.delayDuration, () => {
			this.delayDuration !== void 0 && (this.#c = new hr(() => {
				F(this.#o, !0), this.opts.open.current = !0;
			}, this.delayDuration));
		}), w(() => this.opts.open.current, (e) => {
			e ? (this.ensureActiveTrigger(), this.provider.onOpen(this)) : (this.openedViaFocus = !1, this.provider.onClose(this));
		}, { lazy: !0 }), w(() => this.opts.triggerId.current, (e) => {
			e !== this.registry.activeTriggerId && this.registry.setActiveTrigger(e);
		}), w(() => this.registry.activeTriggerId, (e) => {
			this.opts.triggerId.current !== e && (this.opts.triggerId.current = e);
		});
	}
	handleOpen = () => {
		this.#c.stop(), F(this.#o, !1), this.ensureActiveTrigger(), this.opts.open.current = !0;
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
		e || t === 0 ? (F(this.#o, !1), this.opts.open.current = !0) : this.#c.start();
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
}, Sr = class e {
	static create(t) {
		return t.tether.current ? new e(t, null, t.tether.current.state) : new e(t, vr.get(), null);
	}
	opts;
	root;
	tether;
	attachment;
	#e = Y(!1);
	#t = null;
	#n = z(!1);
	domContext;
	#r = null;
	#i = !1;
	#a = null;
	constructor(e, t, n) {
		this.opts = e, this.root = t, this.tether = n, this.domContext = new E(e.ref), this.attachment = s(this.opts.ref, (e) => e ? this.#c(e) : this.#l()), w(() => this.opts.id.current, () => {
			this.#c(this.opts.ref.current);
		}), w(() => this.opts.payload.current, () => {
			this.#c(this.opts.ref.current);
		}), w(() => this.opts.disabled.current, () => {
			this.#c(this.opts.ref.current);
		}), Ve(() => (this.#i = !0, this.#c(this.opts.ref.current), () => {
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
			t.provider.isPointerInTransit.current && (t.provider.isPointerInTransit.current = !1, t.onTriggerEnter(this.opts.id.current), F(this.#n, !0));
		}, 250)) : (t.onTriggerEnter(this.opts.id.current), F(this.#n, !0))));
	};
	#h = (e) => {
		let t = this.#o();
		t && (this.#s() ? t.opts.open.current && t.handleClose() : e.pointerType !== "touch" && (C(this.#n) || (this.#d(), t.provider.isPointerInTransit.current = !1, t.onTriggerEnter(this.opts.id.current), F(this.#n, !0))));
	};
	#g = (e) => {
		let t = this.#o();
		if (!t || this.#s()) return;
		if (this.#d(), !t.isActiveTrigger(this.opts.id.current)) {
			F(this.#n, !1);
			return;
		}
		let n = e.relatedTarget;
		if (ze(n)) {
			for (let e of t.registry.triggers.values()) if (e.node === n) {
				if (t.provider.opts.skipDelayDuration.current > 0) {
					F(this.#n, !1);
					return;
				}
				t.handleClose(), F(this.#n, !1);
				return;
			}
		}
		t.onTriggerLeave(), F(this.#n, !1);
	};
	#_ = (e) => {
		let t = this.#o();
		t && (this.#e.current || this.#t !== "touch" && (this.#s() ? t.opts.open.current && t.handleClose() : (!t.ignoreNonKeyboardFocus || ee(e.currentTarget)) && (t.setActiveTrigger(this.opts.id.current), t.openedViaFocus = !0, t.handleOpen(), t.provider.ignoreFocusScroll())));
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
	#b = W(() => {
		let e = this.#o(), t = !!(e?.opts.open.current && e.isActiveTrigger(this.opts.id.current)), n = this.#s();
		return {
			id: this.opts.id.current,
			"aria-describedby": t ? e?.contentNode?.id : void 0,
			"data-state": t ? e?.stateAttr : "closed",
			"data-disabled": Re(n),
			"data-delay-duration": `${e?.delayDuration ?? 0}`,
			[gr.trigger]: "",
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
		return C(this.#b);
	}
	set props(e) {
		F(this.#b, e);
	}
}, Cr = class e {
	static create(t) {
		return new e(t, vr.get());
	}
	opts;
	root;
	attachment;
	constructor(e, t) {
		this.opts = e, this.root = t, this.attachment = s(this.opts.ref, (e) => this.root.contentNode = e), new mr({
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
		he(e, this.root.triggerNode) && this.root.disableCloseOnTriggerClick ? e.preventDefault() : (this.opts.onInteractOutside.current(e), e.defaultPrevented || this.root.handleClose());
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
	#e = W(() => ({ open: this.root.opts.open.current }));
	get snippetProps() {
		return C(this.#e);
	}
	set snippetProps(e) {
		F(this.#e, e);
	}
	#t = W(() => ({
		id: this.opts.id.current,
		"data-state": this.root.stateAttr,
		"data-disabled": Re(this.root.disabled),
		...l(this.root.contentPresence.transitionStatus),
		style: { outline: "none" },
		[gr.content]: "",
		...this.attachment
	}));
	get props() {
		return C(this.#t);
	}
	set props(e) {
		F(this.#t, e);
	}
	popperProps = {
		onInteractOutside: this.onInteractOutside,
		onEscapeKeydown: this.onEscapeKeydown,
		onOpenAutoFocus: this.onOpenAutoFocus,
		onCloseAutoFocus: this.onCloseAutoFocus
	};
};
// node_modules/bits-ui/dist/bits/tooltip/components/tooltip.svelte
function wr(e, n) {
	B(n, !0);
	let r = P(n, "open", 15, !1), i = P(n, "triggerId", 15, null), a = P(n, "onOpenChange", 3, Be), s = P(n, "onOpenChangeComplete", 3, Be), c = xr.create({
		open: j(() => r(), (e) => {
			r(e), a()(e);
		}),
		triggerId: j(() => i(), (e) => {
			i(e);
		}),
		delayDuration: j(() => n.delayDuration),
		disableCloseOnTriggerClick: j(() => n.disableCloseOnTriggerClick),
		disableHoverableContent: j(() => n.disableHoverableContent),
		ignoreNonKeyboardFocus: j(() => n.ignoreNonKeyboardFocus),
		disabled: j(() => n.disabled),
		onOpenChangeComplete: j(() => s()),
		tether: j(() => n.tether)
	});
	Ge(e, {
		tooltip: !0,
		children: (e, r) => {
			var i = K(), a = X(i);
			U(a, () => n.children ?? t, () => ({
				open: c.opts.open.current,
				triggerId: c.activeTriggerId,
				payload: c.activePayload
			})), o(e, i);
		},
		$$slots: { default: !0 }
	}), V();
}
// node_modules/bits-ui/dist/bits/tooltip/components/tooltip-content.svelte
var Tr = /* @__PURE__ */ new Set([
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
]), Er = N("<div><div><!></div></div>");
function Dr(e, n) {
	let r = u();
	B(n, !0);
	let i = P(n, "id", 19, () => Le(r)), a = P(n, "ref", 15, null), s = P(n, "side", 3, "top"), c = P(n, "sideOffset", 3, 0), l = P(n, "align", 3, "center"), f = P(n, "avoidCollisions", 3, !0), m = P(n, "arrowPadding", 3, 0), h = P(n, "sticky", 3, "partial"), g = P(n, "hideWhenDetached", 3, !1), _ = P(n, "collisionPadding", 3, 0), v = P(n, "onInteractOutside", 3, Be), y = P(n, "onEscapeKeydown", 3, Be), b = P(n, "forceMount", 3, !1), x = R(n, Tr), S = Cr.create({
		id: j(() => i()),
		ref: j(() => a(), (e) => a(e)),
		onInteractOutside: j(() => v()),
		onEscapeKeydown: j(() => y())
	}), w = W(() => ({
		side: s(),
		sideOffset: c(),
		align: l(),
		avoidCollisions: f(),
		arrowPadding: m(),
		sticky: h(),
		hideWhenDetached: g(),
		collisionPadding: _(),
		strategy: n.strategy,
		customAnchor: n.customAnchor ?? S.root.triggerNode
	})), T = W(() => d(x, C(w), S.props));
	var E = K(), D = X(E), O = (e) => {
		{
			let r = (e, r) => {
				let i = () => (r?.()).props, a = () => (r?.()).wrapperProps, s = W(() => d(a(), { style: { pointerEvents: S.root.disableHoverableContent ? "none" : void 0 } })), c = W(() => d(i(), { style: Ye("tooltip") }, { style: n.style }));
				var l = K(), u = X(l), f = (e) => {
					var t = K(), r = X(t);
					{
						let e = W(() => ({
							props: C(c),
							wrapperProps: C(s),
							...S.snippetProps
						}));
						U(r, () => n.child, () => C(e));
					}
					o(e, t);
				}, p = (e) => {
					var r = Er();
					G(r, () => ({ ...C(s) }));
					var i = M(r);
					G(i, () => ({ ...C(c) }));
					var a = M(i);
					U(a, () => n.children ?? t), A(i), A(r), o(e, r);
				};
				J(u, (e) => {
					n.child ? e(f) : e(p, -1);
				}), o(e, l);
			}, a = W(() => S.root.disableHoverableContent ? "none" : "auto");
			ur(e, p(() => C(T), () => S.popperProps, {
				get enabled() {
					return S.root.opts.open.current;
				},
				get id() {
					return i();
				},
				trapFocus: !1,
				loop: !1,
				preventScroll: !1,
				forceMount: !0,
				get ref() {
					return S.opts.ref;
				},
				tooltip: !0,
				get shouldRender() {
					return S.shouldRender;
				},
				get contentPointerEvents() {
					return C(a);
				},
				popper: r,
				$$slots: { popper: !0 }
			}));
		}
	}, k = (e) => {
		{
			let r = (e, r) => {
				let i = () => (r?.()).props, a = () => (r?.()).wrapperProps, s = W(() => d(a(), { style: { pointerEvents: S.root.disableHoverableContent ? "none" : void 0 } })), c = W(() => d(i(), { style: Ye("tooltip") }, { style: n.style }));
				var l = K(), u = X(l), f = (e) => {
					var t = K(), r = X(t);
					{
						let e = W(() => ({
							props: C(c),
							wrapperProps: C(s),
							...S.snippetProps
						}));
						U(r, () => n.child, () => C(e));
					}
					o(e, t);
				}, p = (e) => {
					var r = Er();
					G(r, () => ({ ...C(s) }));
					var i = M(r);
					G(i, () => ({ ...C(c) }));
					var a = M(i);
					U(a, () => n.children ?? t), A(i), A(r), o(e, r);
				};
				J(u, (e) => {
					n.child ? e(f) : e(p, -1);
				}), o(e, l);
			}, a = W(() => S.root.disableHoverableContent ? "none" : "auto");
			cr(e, p(() => C(T), () => S.popperProps, {
				get open() {
					return S.root.opts.open.current;
				},
				get id() {
					return i();
				},
				trapFocus: !1,
				loop: !1,
				preventScroll: !1,
				forceMount: !1,
				get ref() {
					return S.opts.ref;
				},
				tooltip: !0,
				get shouldRender() {
					return S.shouldRender;
				},
				get contentPointerEvents() {
					return C(a);
				},
				popper: r,
				$$slots: { popper: !0 }
			}));
		}
	};
	J(D, (e) => {
		b() ? e(O) : b() || e(k, 1);
	}), o(e, E), V();
}
// node_modules/bits-ui/dist/bits/tooltip/components/tooltip-trigger.svelte
var Or = /* @__PURE__ */ new Set([
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
]), kr = N("<button><!></button>");
function Ar(e, n) {
	let r = u();
	B(n, !0);
	let i = P(n, "id", 19, () => Le(r)), a = P(n, "disabled", 3, !1), s = P(n, "type", 3, "button"), c = P(n, "tabindex", 3, 0), l = P(n, "ref", 15, null), f = R(n, Or), p = Sr.create({
		id: j(() => i()),
		disabled: j(() => a() ?? !1),
		tabindex: j(() => c() ?? 0),
		payload: j(() => n.payload),
		tether: j(() => n.tether),
		ref: j(() => l(), (e) => l(e))
	}), m = W(() => d(f, p.props, { type: s() }));
	var h = K(), g = X(h), _ = (e) => {
		var t = K(), r = X(t);
		U(r, () => n.child, () => ({ props: C(m) })), o(e, t);
	}, v = (e) => {
		var r = kr();
		G(r, () => ({ ...C(m) }));
		var i = M(r);
		U(i, () => n.children ?? t), A(r), o(e, r);
	};
	J(g, (e) => {
		n.child ? e(_) : e(v, -1);
	}), o(e, h), V();
}
// node_modules/bits-ui/dist/bits/tooltip/components/tooltip-provider.svelte
function jr(e, n) {
	B(n, !0);
	let r = P(n, "delayDuration", 3, 700), i = P(n, "disableCloseOnTriggerClick", 3, !1), a = P(n, "disableHoverableContent", 3, !1), s = P(n, "disabled", 3, !1), c = P(n, "ignoreNonKeyboardFocus", 3, !1), l = P(n, "skipDelayDuration", 3, 300);
	br.create({
		delayDuration: j(() => r()),
		disableCloseOnTriggerClick: j(() => i()),
		disableHoverableContent: j(() => a()),
		disabled: j(() => s()),
		ignoreNonKeyboardFocus: j(() => c()),
		skipDelayDuration: j(() => l())
	});
	var u = K(), d = X(u);
	U(d, () => n.children ?? t), o(e, u), V();
}
// svelte/lib/ui/Badge.svelte
var Mr = N("<span><!></span>");
function Nr(e, n) {
	B(n, !0);
	let r = ue({
		base: "tw:inline-flex tw:items-center tw:gap-1 tw:rounded-full tw:border tw:border-transparent tw:px-2 tw:py-0.5 tw:font-sans tw:text-xs tw:font-medium tw:leading-4",
		variants: { variant: {
			neutral: "tw:bg-muted tw:text-foreground",
			primary: "tw:bg-primary tw:text-primary-foreground",
			success: "tw:border-success/20 tw:bg-success/10 tw:text-foreground",
			warning: "tw:border-warning/20 tw:bg-warning/10 tw:text-foreground",
			destructive: "tw:border-destructive/20 tw:bg-destructive/10 tw:text-foreground"
		} },
		defaultVariants: { variant: "neutral" }
	}, { twMerge: !1 });
	var i = Mr(), a = M(i);
	U(a, () => n.children ?? t), A(i), f((e) => Ie(i, 1, e), [() => fe(I(r({ variant: n.variant }), n.class))]), o(e, i), V();
}
// svelte/lib/ui/Input.svelte
var Pr = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"value",
	"class",
	"ref"
]), Fr = N("<input/>");
function Ir(e, t) {
	B(t, !0);
	let n = P(t, "value", 15, ""), r = P(t, "ref", 15, null), i = R(t, Pr);
	var a = Fr();
	G(a, (e) => ({
		class: e,
		...i
	}), [() => I("tw:h-9 tw:w-full tw:min-w-0 tw:rounded-control tw:border tw:border-input tw:bg-studio-input-background tw:px-3 tw:py-2 tw:font-sans tw:text-sm tw:font-normal tw:leading-5 tw:tracking-normal tw:text-foreground tw:outline-none tw:placeholder:text-muted-foreground tw:focus-visible:border-ring tw:focus-visible:ring-2 tw:focus-visible:ring-ring/30 tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-destructive/30", t.class)], void 0, void 0, void 0, !0), ie(a, (e) => r(e), () => r()), pe(a, n), o(e, a), V();
}
// svelte/lib/ui/Textarea.svelte
var Lr = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"value",
	"class",
	"ref"
]), Rr = N("<textarea></textarea>");
function zr(e, t) {
	B(t, !0);
	let n = P(t, "value", 15, ""), r = P(t, "ref", 15, null), i = R(t, Lr);
	var a = Rr();
	y(a), G(a, (e) => ({
		class: e,
		...i
	}), [() => I("tw:min-h-24 tw:w-full tw:min-w-0 tw:rounded-control tw:border tw:border-input tw:bg-studio-input-background tw:px-3 tw:py-2 tw:font-sans tw:text-sm tw:font-normal tw:leading-5 tw:tracking-normal tw:text-foreground tw:outline-none tw:placeholder:text-muted-foreground tw:focus-visible:border-ring tw:focus-visible:ring-2 tw:focus-visible:ring-ring/30 tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-destructive/30", t.class)]), ie(a, (e) => r(e), () => r()), pe(a, n), o(e, a), V();
}
// svelte/lib/ui/Checkbox.svelte
var Br = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"checked",
	"indeterminate",
	"class",
	"onchange",
	"onCheckedChange"
]), Vr = N("<span class=\"tw:h-0.5 tw:w-2 tw:bg-current\"></span>"), Hr = N("<span aria-hidden=\"true\" class=\"tw:pointer-events-none tw:absolute tw:inset-0 tw:grid tw:place-items-center tw:text-primary-foreground\"><!></span>"), Ur = N("<span class=\"tw:relative tw:inline-flex tw:shrink-0 tw:align-middle\"><input/> <!></span>");
function Wr(e, t) {
	B(t, !0);
	let n = P(t, "checked", 15, !1), r = P(t, "indeterminate", 15, !1), i = R(t, Br);
	var a = Ur(), s = M(a), c = (e) => {
		t.onchange?.(e), t.onCheckedChange?.(e.currentTarget.checked);
	};
	G(s, (e) => ({
		type: "checkbox",
		...i,
		onchange: c,
		class: e
	}), [() => I("tw:m-0 tw:size-4 tw:shrink-0 tw:appearance-none tw:rounded-sm tw:border tw:border-input tw:bg-card tw:p-0 tw:outline-none tw:checked:border-primary tw:checked:bg-primary tw:indeterminate:border-primary tw:indeterminate:bg-primary tw:focus-visible:ring-2 tw:focus-visible:ring-ring tw:focus-visible:ring-offset-2 tw:focus-visible:ring-offset-background tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:aria-invalid:border-destructive", t.class)], void 0, void 0, void 0, !0);
	var l = L(s, 2), u = (e) => {
		var t = Hr(), n = M(t), i = (e) => {
			var t = Vr();
			o(e, t);
		}, a = (e) => {
			Ce(e, {
				name: "check",
				class: "tw:size-3"
			});
		};
		J(n, (e) => {
			r() ? e(i) : e(a, -1);
		}), A(t), o(e, t);
	};
	J(l, (e) => {
		(n() || r()) && e(u);
	}), A(a), k(s, n), re("indeterminate", "change", s, r, r), o(e, a), V();
}
// svelte/lib/ui/Switch.svelte
var Gr = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"checked",
	"class",
	"onchange",
	"onCheckedChange"
]), Kr = N("<span class=\"tw:relative tw:inline-flex tw:shrink-0 tw:align-middle\"><input/> <span aria-hidden=\"true\"></span></span>");
function qr(e, t) {
	B(t, !0);
	let n = P(t, "checked", 15, !1), r = R(t, Gr);
	var i = Kr(), a = M(i), s = (e) => {
		t.onchange?.(e), t.onCheckedChange?.(e.currentTarget.checked);
	};
	G(a, (e) => ({
		type: "checkbox",
		role: "switch",
		"aria-checked": n(),
		...r,
		onchange: s,
		class: e
	}), [() => I("tw:m-0 tw:h-5 tw:w-9 tw:appearance-none tw:rounded-full tw:border tw:border-transparent tw:bg-input tw:p-0 tw:outline-none tw:transition-colors tw:checked:bg-primary tw:focus-visible:ring-2 tw:focus-visible:ring-ring tw:focus-visible:ring-offset-2 tw:focus-visible:ring-offset-background tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:motion-reduce:transition-none", t.class)], void 0, void 0, void 0, !0);
	var c = L(a, 2);
	A(i), f((e) => Ie(c, 1, e), [() => fe(I("tw:pointer-events-none tw:absolute tw:left-0.5 tw:top-0.5 tw:size-4 tw:rounded-full tw:bg-card tw:shadow-xs tw:transition-transform tw:motion-reduce:transition-none", n() ? "tw:translate-x-4" : "tw:translate-x-0"))]), k(a, n), o(e, i), V();
}
// svelte/lib/ui/RadioGroup.svelte
var Jr = N("<span aria-hidden=\"true\" class=\"tw:pointer-events-none tw:absolute tw:inset-1 tw:rounded-full tw:bg-primary\"></span>"), Yr = N("<label class=\"tw:flex tw:items-center tw:gap-2\"><span class=\"tw:relative tw:inline-flex tw:size-4 tw:shrink-0\"><input type=\"radio\" class=\"tw:m-0 tw:size-4 tw:appearance-none tw:rounded-full tw:border tw:border-input tw:bg-card tw:p-0 tw:outline-none tw:checked:border-primary tw:focus-visible:ring-2 tw:focus-visible:ring-ring tw:focus-visible:ring-offset-2 tw:focus-visible:ring-offset-background tw:disabled:opacity-50\"/> <!></span> <span> </span></label>"), Xr = N("<div role=\"radiogroup\"></div>");
function Zr(t, n) {
	let r = u();
	B(n, !0);
	let a = [], s = P(n, "value", 15, ""), c = P(n, "name", 3, r), l = P(n, "disabled", 3, !1);
	var d = Xr();
	ge(d, 21, () => n.items, (e) => e.value, (t, r) => {
		var u = Yr(), d = M(u), p = M(d);
		Ee(p);
		var m, h = L(p, 2), g = (e) => {
			var t = Jr();
			o(e, t);
		};
		J(h, (e) => {
			s() === C(r).value && e(g);
		}), A(d);
		var _ = L(d, 2), v = i(_, !0);
		A(u), f(() => {
			Me(p, "name", c()), p.disabled = l() || C(r).disabled, m !== (m = C(r).value) && (p.value = (p.__value = m) ?? ""), q(v, C(r).label);
		}), Se("change", p, () => n.onValueChange?.(C(r).value)), e(a, [], p, () => (C(r).value, s()), s), o(t, u);
	}), A(d), f((e) => {
		Me(d, "aria-label", n.label), Ie(d, 1, e);
	}, [() => fe(I("tw:grid tw:grid-cols-1 tw:gap-2 tw:font-sans tw:text-sm tw:text-foreground", n.class))]), o(t, d), V();
}
D(["change"]);
// svelte/lib/ui/Select.svelte
var Qr = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"value",
	"items",
	"class"
]), $r = N("<option> </option>"), ei = N("<select></select>");
function ti(e, t) {
	B(t, !0);
	let n = P(t, "value", 15, ""), r = R(t, Qr);
	var a = ei();
	G(a, (e) => ({
		...r,
		class: e
	}), [() => I("tw:h-9 tw:w-full tw:rounded-control tw:border tw:border-input tw:bg-studio-input-background tw:px-3 tw:py-2 tw:font-sans tw:text-sm tw:font-normal tw:leading-5 tw:text-foreground tw:outline-none tw:focus-visible:ring-2 tw:focus-visible:ring-ring/30 tw:disabled:opacity-50 tw:aria-invalid:border-destructive", t.class)]), ge(a, 21, () => t.items, (e) => e.value, (e, t) => {
		var n = $r(), r = i(n, !0), a = {};
		f(() => {
			n.disabled = C(t).disabled, q(r, C(t).label), a !== (a = C(t).value) && (n.value = (n.__value = a) ?? "");
		}), o(e, n);
	}), A(a), Oe(a, n), o(e, a), V();
}
// svelte/lib/ui/Tooltip.svelte
var ni = N("<!> <!>", 1);
function ri(e, t) {
	B(t, !0);
	var n = K(), r = X(n);
	Ae(r, () => jr, (e, n) => {
		n(e, {
			delayDuration: 250,
			children: (e, n) => {
				var r = K(), i = X(r);
				Ae(i, () => wr, (e, n) => {
					n(e, {
						children: (e, n) => {
							var r = ni(), i = X(r);
							{
								let e = W(() => Ne({
									variant: "ghost",
									size: "icon"
								}));
								Ae(i, () => Ar, (n, r) => {
									r(n, {
										type: "button",
										get "aria-label"() {
											return t.label;
										},
										get class() {
											return C(e);
										},
										children: (e, n) => {
											var r = K(), i = X(r);
											U(i, () => t.children), o(e, r);
										},
										$$slots: { default: !0 }
									});
								});
							}
							var a = L(i, 2);
							Ae(a, () => ae, (e, n) => {
								n(e, {
									children: (e, n) => {
										var r = K(), i = X(r);
										Ae(i, () => Dr, (e, n) => {
											n(e, {
												sideOffset: 6,
												class: "tw:z-50 tw:max-w-xs tw:rounded-control tw:border tw:border-border tw:bg-popover tw:px-3 tw:py-1.5 tw:font-sans tw:text-xs tw:leading-4 tw:text-popover-foreground tw:shadow-md",
												children: (e, n) => {
													H();
													var r = c();
													f(() => q(r, t.label)), o(e, r);
												},
												$$slots: { default: !0 }
											});
										}), o(e, r);
									},
									$$slots: { default: !0 }
								});
							}), o(e, r);
						},
						$$slots: { default: !0 }
					});
				}), o(e, r);
			},
			$$slots: { default: !0 }
		});
	}), o(e, n), V();
}
// svelte/lib/ui/Card.svelte
var ii = N("<h2 class=\"tw:m-0 tw:font-sans tw:text-base tw:font-semibold tw:leading-6 tw:tracking-normal\"> </h2>"), ai = N("<p class=\"tw:m-0 tw:text-sm tw:leading-5 tw:text-muted-foreground\"> </p>"), oi = N("<div class=\"tw:space-y-1\"><!><!></div>"), si = N("<section><!> <!></section>");
function ci(e, t) {
	B(t, !0);
	var n = si(), r = M(n), a = (e) => {
		var n = oi(), r = M(n), a = (e) => {
			var n = ii(), r = i(n, !0);
			f(() => q(r, t.title)), o(e, n);
		};
		J(r, (e) => {
			t.title && e(a);
		});
		var s = L(r), c = (e) => {
			var n = ai(), r = i(n, !0);
			f(() => q(r, t.description)), o(e, n);
		};
		J(s, (e) => {
			t.description && e(c);
		}), A(n), o(e, n);
	};
	J(r, (e) => {
		(t.title || t.description) && e(a);
	});
	var s = L(r, 2);
	U(s, () => t.children), A(n), f((e) => Ie(n, 1, e), [() => fe(I("tw:space-y-4 tw:rounded-surface tw:border tw:border-border tw:bg-card tw:p-5 tw:font-sans tw:text-sm tw:text-card-foreground tw:shadow-xs", t.class))]), o(e, n), V();
}
// svelte/lib/ui/Separator.svelte
var li = N("<div role=\"separator\"></div>");
function ui(e, t) {
	B(t, !0);
	let n = P(t, "vertical", 3, !1);
	var r = li();
	f((e) => {
		Me(r, "aria-orientation", n() ? "vertical" : "horizontal"), Ie(r, 1, e);
	}, [() => fe(I("tw:shrink-0 tw:bg-border", n() ? "tw:h-full tw:w-px" : "tw:h-px tw:w-full", t.class))]), o(e, r), V();
}
// svelte/lib/ui/Skeleton.svelte
var di = N("<div aria-hidden=\"true\"></div>");
function fi(e, t) {
	B(t, !0);
	var n = di();
	f((e) => Ie(n, 1, e), [() => fe(I("tw:animate-pulse tw:rounded-control tw:bg-muted tw:motion-reduce:animate-none", t.class))]), o(e, n), V();
}
// svelte/lib/ui/Label.svelte
var pi = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"children",
	"class"
]), mi = N("<label><!></label>");
function hi(e, n) {
	B(n, !0);
	let r = R(n, pi);
	var i = mi();
	G(i, (e) => ({
		class: e,
		...r
	}), [() => I("tw:font-sans tw:text-sm tw:font-medium tw:leading-5 tw:text-foreground", n.class)]);
	var a = M(i);
	U(a, () => n.children ?? t), A(i), o(e, i), V();
}
// svelte/lib/components/Field.svelte
var gi = N("<p> </p>"), _i = N("<div class=\"tw:grid tw:grid-cols-1 tw:gap-1.5 tw:font-sans tw:text-sm tw:text-foreground\"><!> <!> <!></div>");
function vi(e, t) {
	let n = W(() => t.error || t.hint ? `${t.id}-description` : void 0);
	var r = _i(), a = M(r);
	hi(a, {
		get for() {
			return t.id;
		},
		children: (e, n) => {
			H();
			var r = c();
			f(() => q(r, t.label)), o(e, r);
		},
		$$slots: { default: !0 }
	});
	var s = L(a, 2);
	U(s, () => t.children, () => ({
		id: t.id,
		"aria-describedby": C(n),
		"aria-invalid": !!t.error
	}));
	var l = L(s, 2), u = (e) => {
		var r = gi(), a = i(r, !0);
		f(() => {
			Me(r, "id", C(n)), Me(r, "role", t.error ? "alert" : void 0), Ie(r, 1, fe(t.error ? "tw:m-0 tw:text-xs tw:font-medium tw:leading-4 tw:text-foreground" : "tw:m-0 tw:text-xs tw:leading-4 tw:text-muted-foreground")), q(a, t.error || t.hint);
		}), o(e, r);
	};
	J(l, (e) => {
		(t.error || t.hint) && e(u);
	}), A(r), o(e, r);
}
// svelte/lib/components/LoadingState.svelte
var yi = N("<div role=\"status\" class=\"tw:inline-flex tw:items-center tw:gap-2 tw:font-sans tw:text-sm tw:text-muted-foreground\"><span aria-hidden=\"true\" class=\"tw:size-4 tw:animate-spin tw:rounded-full tw:border-2 tw:border-current tw:border-r-transparent tw:motion-reduce:animate-none\"></span> </div>");
function bi(e, t) {
	var n = yi(), r = L(M(n), 1, !0);
	A(n), f(() => q(r, t.label)), o(e, n);
}
// svelte/gallery/Gallery.svelte
var xi = N("<div class=\"tw:flex tw:flex-wrap tw:gap-2\"></div> <div class=\"tw:flex tw:flex-wrap tw:items-center tw:gap-2\"><!><!><!><!><!></div> <p class=\"tw:m-0 tw:text-xs tw:text-muted-foreground\"> </p>", 1), Si = N("<!> <!> <!> <!>", 1), Ci = N("<div class=\"tw:flex tw:items-center tw:gap-2\"><!><label for=\"gallery-checkbox\">Include archived rooms</label></div> <div class=\"tw:flex tw:items-center tw:gap-2\"><!><label for=\"gallery-switch\">Notifications</label></div> <!> <!>", 1), wi = N("<!><!>", 1), Ti = N("<p class=\"tw:m-0 tw:text-muted-foreground\">The same dialog primitives support mobile and desktop layouts.</p> <!>", 1), Ei = N("<p class=\"tw:m-0 tw:rounded-control tw:border tw:border-border tw:p-3\"> </p>"), Di = N("<div class=\"tw:flex tw:flex-wrap tw:gap-2\"><!> <!></div> <!>", 1), Oi = N("<div class=\"tw:flex tw:items-center tw:gap-3\"><!><!><!><span class=\"tw:text-muted-foreground\">Images and initials share one frame.</span></div> <!> <div class=\"tw:flex tw:flex-wrap tw:gap-2\"><!><!><!><!><!></div> <div class=\"tw:flex tw:items-center tw:gap-3\"><!> <div class=\"tw:flex-1 tw:space-y-2\"><!><!></div></div>", 1), ki = N("<h3 class=\"tw:m-0 tw:font-sans tw:text-xl tw:font-semibold tw:leading-7 tw:tracking-tight\">Inter variable — headings and UI</h3> <p class=\"tw:m-0 tw:text-sm tw:leading-5\">Body 400 · medium 500 · semibold 500 · bold 600. English and\n          Portuguese: Olá, colaboração, ações.</p> <p class=\"tw:m-0 tw:text-muted-foreground\">Muted text uses the Studio semantic role.</p> <pre class=\"tw:m-0 tw:overflow-auto tw:rounded-control tw:border tw:border-border tw:bg-muted tw:p-3 tw:font-mono tw:text-sm tw:leading-6\"><code>const room = \"fully typed\";</code></pre>", 1), Ai = N("<main class=\"tw:min-h-dvh tw:bg-background tw:px-4 tw:py-8 tw:font-sans tw:text-sm tw:font-normal tw:leading-5 tw:text-foreground tw:sm:px-8\" data-gallery=\"\"><div class=\"tw:mx-auto tw:max-w-6xl tw:space-y-6\"><header class=\"tw:flex tw:flex-wrap tw:items-start tw:justify-between tw:gap-4\"><div class=\"tw:space-y-2\"><a href=\"/app?ui=svelte\" class=\"tw:text-sm tw:text-link tw:underline-offset-4 tw:hover:underline\">vibebook</a> <h1 class=\"tw:m-0 tw:font-sans tw:text-2xl tw:font-semibold tw:leading-8 tw:tracking-tight\">Component gallery</h1> <p class=\"tw:m-0 tw:text-muted-foreground\">Shared primitives, Studio tokens, and one Tailwind entry.</p></div> <div class=\"tw:flex tw:items-center tw:gap-2\"><!><!></div></header> <div class=\"tw:grid tw:grid-cols-1 tw:gap-5 tw:md:grid-cols-2\"><!> <!> <!> <!> <!> <!> <!> <!></div> <p role=\"status\" class=\"tw:min-h-5 tw:text-sm tw:text-muted-foreground\"> </p></div></main>");
function ji(e, n) {
	B(n, !0);
	let a = z("light"), s = z(""), l = z(""), u = z(!1), d = z(!1), m = z("room"), h = z("general"), g = z("all"), _ = z(0), y = z("");
	v(() => {
		document.documentElement.dataset.theme = C(a);
	});
	let b = [
		"primary",
		"secondary",
		"outline",
		"ghost",
		"destructive",
		"link"
	];
	var x = Ai(), S = M(x), w = M(S), T = L(M(w), 2), E = M(T);
	{
		let e = W(() => C(a) === "light" ? "Use dark theme" : "Use light theme"), t = W(() => C(a) === "light" ? "moon" : "sun");
		ve(E, {
			get label() {
				return C(e);
			},
			get icon() {
				return C(t);
			},
			variant: "outline",
			onclick: () => F(a, C(a) === "light" ? "dark" : "light", !0)
		});
	}
	Nr(L(E), {
		children: (e, t) => {
			H();
			var n = c();
			f(() => q(n, C(a))), o(e, n);
		},
		$$slots: { default: !0 }
	}), A(T), A(w);
	var D = L(w, 2), O = M(D);
	ci(O, {
		title: "Actions",
		description: "Variants share focus, disabled and loading behavior.",
		children: (e, t) => {
			var n = xi(), r = X(n);
			ge(r, 21, () => b, oe, (e, t) => {
				se(e, {
					get variant() {
						return C(t);
					},
					onclick: () => {
						F(_, C(_) + 1), F(y, `${C(t)} activated`);
					},
					children: (e, n) => {
						H();
						var r = c();
						f(() => q(r, C(t))), o(e, r);
					},
					$$slots: { default: !0 }
				});
			}), A(r);
			var a = L(r, 2), s = M(a);
			se(s, {
				disabled: !0,
				children: (e, t) => {
					H();
					var n = c("Disabled");
					o(e, n);
				},
				$$slots: { default: !0 }
			});
			var l = L(s);
			se(l, {
				loading: !0,
				children: (e, t) => {
					H();
					var n = c("Saving");
					o(e, n);
				},
				$$slots: { default: !0 }
			});
			var u = L(l);
			se(u, {
				size: "sm",
				variant: "outline",
				children: (e, t) => {
					H();
					var n = c("Small");
					o(e, n);
				},
				$$slots: { default: !0 }
			});
			var d = L(u);
			ve(d, {
				label: "Add item",
				icon: "plus",
				onclick: () => F(_, C(_) + 1)
			}), ri(L(d), {
				label: "Search rooms",
				children: (e, t) => {
					Ce(e, { name: "search" });
				},
				$$slots: { default: !0 }
			}), A(a);
			var p = L(a, 2), m = i(p);
			f(() => q(m, `Actions: ${C(_) ?? ""}`)), o(e, n);
		},
		$$slots: { default: !0 }
	});
	var k = L(O, 2);
	ci(k, {
		title: "Fields",
		description: "Labels, hints and errors have explicit associations.",
		children: (e, n) => {
			var r = Si(), i = X(r);
			vi(i, {
				id: "gallery-title",
				label: "Room name",
				hint: "Choose a name your team recognizes.",
				children: (e, n = t) => {
					Ir(e, p(n, {
						placeholder: "Project room",
						get value() {
							return C(s);
						},
						set value(e) {
							F(s, e, !0);
						}
					}));
				},
				$$slots: { default: !0 }
			});
			var a = L(i, 2);
			vi(a, {
				id: "gallery-email",
				label: "Email",
				error: "Enter a valid email address.",
				children: (e, n = t) => {
					Ir(e, p(n, {
						type: "email",
						value: "invalid"
					}));
				},
				$$slots: { default: !0 }
			});
			var c = L(a, 2);
			vi(c, {
				id: "gallery-notes",
				label: "Notes",
				children: (e, n = t) => {
					zr(e, p(n, {
						placeholder: "Write a note",
						get value() {
							return C(l);
						},
						set value(e) {
							F(l, e, !0);
						}
					}));
				},
				$$slots: { default: !0 }
			}), vi(L(c, 2), {
				id: "gallery-disabled",
				label: "Unavailable",
				children: (e, n = t) => {
					Ir(e, p(n, {
						disabled: !0,
						value: "Disabled input"
					}));
				},
				$$slots: { default: !0 }
			}), o(e, r);
		},
		$$slots: { default: !0 }
	});
	var j = L(k, 2);
	ci(j, {
		title: "Selection",
		description: "Keyboard controls use native semantics or Bits UI behavior.",
		children: (e, n) => {
			var r = Ci(), i = X(r);
			Wr(M(i), {
				id: "gallery-checkbox",
				get checked() {
					return C(u);
				},
				set checked(e) {
					F(u, e, !0);
				}
			}), H(), A(i);
			var a = L(i, 2);
			qr(M(a), {
				id: "gallery-switch",
				get checked() {
					return C(d);
				},
				set checked(e) {
					F(d, e, !0);
				}
			}), H(), A(a);
			var s = L(a, 2);
			Zr(s, {
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
					return C(m);
				},
				set value(e) {
					F(m, e, !0);
				}
			}), vi(L(s, 2), {
				id: "gallery-filter",
				label: "Show",
				children: (e, n = t) => {
					ti(e, p(n, {
						items: [{
							value: "all",
							label: "All rooms"
						}, {
							value: "active",
							label: "Active rooms"
						}],
						get value() {
							return C(g);
						},
						set value(e) {
							F(g, e, !0);
						}
					}));
				},
				$$slots: { default: !0 }
			}), o(e, r);
		},
		$$slots: { default: !0 }
	});
	var ee = L(j, 2);
	ci(ee, {
		title: "Overlays",
		description: "Focus trap, Escape dismissal and focus restoration are provided by Bits UI.",
		children: (e, n) => {
			var r = Di(), a = X(r), l = M(a);
			De(l, {
				title: "Edit room",
				description: "Changes apply to the current room.",
				closeLabel: "Close dialog",
				trigger: (e) => {
					H();
					var t = c("Open dialog");
					o(e, t);
				},
				children: (e) => {
					var n = wi(), r = X(n);
					vi(r, {
						id: "dialog-name",
						label: "Name",
						children: (e, n = t) => {
							Ir(e, p(n, {
								get value() {
									return C(s);
								},
								set value(e) {
									F(s, e, !0);
								}
							}));
						},
						$$slots: { default: !0 }
					});
					var i = L(r);
					se(i, {
						onclick: () => F(y, "Dialog action completed"),
						children: (e, t) => {
							H();
							var n = c("Save name");
							o(e, n);
						},
						$$slots: { default: !0 }
					}), o(e, n);
				},
				$$slots: {
					trigger: !0,
					default: !0
				}
			});
			var u = L(l, 2);
			De(u, {
				title: "Room details",
				description: "A responsive sheet shares the dialog behavior.",
				closeLabel: "Close sheet",
				sheet: !0,
				trigger: (e) => {
					H();
					var t = c("Open sheet");
					o(e, t);
				},
				children: (e) => {
					var t = Ti();
					Ir(L(X(t), 2), {
						"aria-label": "Sheet note",
						placeholder: "Add a note"
					}), o(e, t);
				},
				$$slots: {
					trigger: !0,
					default: !0
				}
			}), A(a);
			var d = L(a, 2);
			je(d, {
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
					return C(h);
				},
				set value(e) {
					F(h, e, !0);
				},
				children: (e, n = t) => {
					var r = Ei(), a = i(r, !0);
					f(() => q(a, n() === "general" ? "General settings" : "Room members")), o(e, r);
				},
				$$slots: { default: !0 }
			}), o(e, r);
		},
		$$slots: { default: !0 }
	});
	var te = L(ee, 2);
	ci(te, {
		title: "Identity and feedback",
		children: (e, t) => {
			var n = Oi(), i = X(n), a = M(i);
			r(a, { name: "Gimenes" });
			var s = L(a);
			r(s, { name: "Guilherme Rodrigues" });
			var l = L(s);
			r(l, {
				name: "Sample user",
				src: "/favicon.svg"
			}), H(), A(i);
			var u = L(i, 2);
			ui(u, {});
			var d = L(u, 2), f = M(d);
			Nr(f, {
				children: (e, t) => {
					H();
					var n = c("Default");
					o(e, n);
				},
				$$slots: { default: !0 }
			});
			var p = L(f);
			Nr(p, {
				variant: "primary",
				children: (e, t) => {
					H();
					var n = c("Selected");
					o(e, n);
				},
				$$slots: { default: !0 }
			});
			var m = L(p);
			Nr(m, {
				variant: "success",
				children: (e, t) => {
					H();
					var n = c("Complete");
					o(e, n);
				},
				$$slots: { default: !0 }
			});
			var h = L(m);
			Nr(h, {
				variant: "warning",
				children: (e, t) => {
					H();
					var n = c("Waiting");
					o(e, n);
				},
				$$slots: { default: !0 }
			}), Nr(L(h), {
				variant: "destructive",
				children: (e, t) => {
					H();
					var n = c("Failed");
					o(e, n);
				},
				$$slots: { default: !0 }
			}), A(d);
			var g = L(d, 2), _ = M(g);
			fi(_, { class: "tw:size-9 tw:rounded-full" });
			var v = L(_, 2), y = M(v);
			fi(y, { class: "tw:h-3 tw:w-3/4" }), fi(L(y), { class: "tw:h-3 tw:w-1/2" }), A(v), A(g), o(e, n);
		},
		$$slots: { default: !0 }
	});
	var ne = L(te, 2);
	ci(ne, {
		title: "Empty states",
		children: (e, t) => {
			Te(e, {
				title: "Nothing waiting for you",
				description: "New requests and tasks in review will appear here.",
				children: (e, t) => {
					se(e, {
						variant: "outline",
						onclick: () => F(y, "Empty state action completed"),
						children: (e, t) => {
							H();
							var n = c("Explore rooms");
							o(e, n);
						},
						$$slots: { default: !0 }
					});
				},
				$$slots: { default: !0 }
			});
		},
		$$slots: { default: !0 }
	});
	var N = L(ne, 2);
	ci(N, {
		title: "Status feedback",
		children: (e, t) => {
			var n = wi(), r = X(n);
			bi(r, { label: "Saving changes" });
			var i = L(r);
			Pe(i, {
				title: "Could not save changes",
				description: "Your draft is still available.",
				retryLabel: "Try again",
				onretry: () => F(y, "Retry requested")
			}), o(e, n);
		},
		$$slots: { default: !0 }
	}), ci(L(N, 2), {
		title: "Typography",
		class: "tw:md:col-span-2",
		children: (e, t) => {
			var n = ki();
			H(6), o(e, n);
		},
		$$slots: { default: !0 }
	}), A(D);
	var P = L(D, 2), I = i(P, !0);
	A(S), A(x), f(() => q(I, C(y))), o(e, x), V();
}
// svelte/gallery/main.ts
function Mi(e) {
	let t = le(ji, { target: e });
	return () => te(t);
}
export { Mi as mountGallery };
