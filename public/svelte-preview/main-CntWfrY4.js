import { $ as e, $t as t, At as n, B as r, Bt as i, C as a, D as o, Dt as s, E as c, F as l, Ft as u, G as d, Gt as f, H as p, Ht as m, I as h, It as g, J as _, Jt as v, K as y, Kt as b, L as x, Lt as S, Mt as C, Nt as w, O as T, Ot as E, Pt as D, Q as O, Qt as k, R as A, Rt as j, S as ee, St as te, T as ne, Tt as M, U as re, Ut as N, V as ie, W as ae, X as P, Xt as F, Y as oe, Yt as I, Z as se, Zt as ce, _t as le, an as L, bt as ue, c as de, cn as R, ct as fe, d as pe, en as z, et as me, f as he, h as ge, i as _e, in as B, it as ve, jt as ye, k as be, l as xe, ln as V, lt as H, m as Se, n as Ce, nn as we, nt as U, o as Te, on as W, ot as Ee, p as De, q as Oe, qt as G, r as ke, rt as Ae, s as je, sn as K, st as q, t as Me, tn as J, tt as Y, u as Ne, v as Pe, vt as Fe, w as Ie, wt as Le, xt as Re, y as ze, yt as Be, z as Ve, zt as He } from "./Textarea-DI8Lmf_T.js";
// ../vibebook/node_modules/svelte-toolbelt/dist/utils/on-mount-effect.svelte.js
function Ue(e) {
	G(() => f(() => e()));
}
// ../vibebook/node_modules/bits-ui/dist/bits/utilities/floating-layer/floating-root.svelte.js
var We = new se("Floating.Root"), Ge = new se("Floating.Root"), Ke = class e {
	static create(t = !1) {
		return t ? Ge.set(new e()) : We.set(new e());
	}
	anchorNode = U(null);
	customAnchorNode = U(null);
	triggerNode = U(null);
	constructor() {
		G(() => {
			this.customAnchorNode.current ? typeof this.customAnchorNode.current == "string" ? this.anchorNode.current = document.querySelector(this.customAnchorNode.current) : this.anchorNode.current = this.customAnchorNode.current : this.anchorNode.current = this.triggerNode.current;
		});
	}
};
// ../vibebook/node_modules/bits-ui/dist/bits/utilities/floating-layer/components/floating-layer.svelte
function qe(e, t) {
	W(t, !0);
	let n = q(t, "tooltip", 3, !1);
	Ke.create(f(() => n()));
	var r = u(), i = F(r);
	M(i, () => t.children ?? V), D(e, r), L();
}
// ../vibebook/node_modules/bits-ui/dist/internal/floating-svelte/floating-utils.svelte.js
function Je(e) {
	return typeof e == "function" ? e() : e;
}
function Ye(e) {
	return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function Xe(e, t) {
	let n = Ye(e);
	return Math.round(t * n) / n;
}
function Ze(e) {
	return {
		[`--bits-${e}-content-transform-origin`]: "var(--bits-floating-transform-origin)",
		[`--bits-${e}-content-available-width`]: "var(--bits-floating-available-width)",
		[`--bits-${e}-content-available-height`]: "var(--bits-floating-available-height)",
		[`--bits-${e}-anchor-width`]: "var(--bits-floating-anchor-width)",
		[`--bits-${e}-anchor-height`]: "var(--bits-floating-anchor-height)"
	};
}
// ../vibebook/node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs
var Qe = [
	"top",
	"right",
	"bottom",
	"left"
], $e = Math.min, et = Math.max, tt = Math.round, nt = Math.floor, rt = (e) => ({
	x: e,
	y: e
}), it = {
	left: "right",
	right: "left",
	bottom: "top",
	top: "bottom"
};
function at(e, t, n) {
	return et(e, $e(t, n));
}
function ot(e, t) {
	return typeof e == "function" ? e(t) : e;
}
function st(e) {
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
function X(e) {
	let t = e[0];
	return t === "t" || t === "b" ? "y" : "x";
}
function dt(e) {
	return lt(X(e));
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
	let i = ct(e), a = yt(st(e), n === "start", r);
	return i && (a = a.map((e) => e + "-" + i), t && (a = a.concat(a.map(mt)))), a;
}
function xt(e) {
	let t = st(e);
	return it[t] + e.slice(t.length);
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
// ../vibebook/node_modules/@floating-ui/core/dist/floating-ui.core.mjs
function Tt(e, t, n) {
	let { reference: r, floating: i } = e, a = X(t), o = dt(t), s = ut(o), c = st(t), l = a === "y", u = r.x + r.width / 2 - i.width / 2, d = r.y + r.height / 2 - i.height / 2, f = r[s] / 2 - i[s] / 2, p;
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
	let { x: n, y: r, platform: i, rects: a, elements: o, strategy: s } = e, { boundary: c = "clippingAncestors", rootBoundary: l = "viewport", elementContext: u = "floating", altBoundary: d = !1, padding: f = 0 } = ot(t, e), p = Ct(f), m = o[d ? u === "floating" ? "reference" : "floating" : u], h = wt(await i.getClippingRect({
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
		let { x: n, y: r, placement: i, rects: a, platform: o, elements: s, middlewareData: c } = t, { element: l, padding: u = 0 } = ot(e, t) || {};
		if (l == null) return {};
		let d = Ct(u), f = {
			x: n,
			y: r
		}, p = dt(i), m = ut(p), h = await o.getDimensions(l), g = p === "y", _ = g ? "top" : "left", v = g ? "bottom" : "right", y = g ? "clientHeight" : "clientWidth", b = a.reference[m] + a.reference[p] - f[p] - a.floating[m], x = f[p] - a.reference[p], S = await (o.getOffsetParent == null ? void 0 : o.getOffsetParent(l)), C = S ? S[y] : 0;
		C && await (o.isElement == null ? void 0 : o.isElement(S)) || (C = s.floating[y] || a.floating[m]);
		let w = b / 2 - x / 2, T = C / 2 - h[m] / 2 - 1, E = $e(d[_], T), D = $e(d[v], T), O = C - h[m] - D, k = C / 2 - h[m] / 2 + w, A = at(E, k, O), j = !c.arrow && ct(i) != null && k !== A && a.reference[m] / 2 - (k < E ? E : D) - h[m] / 2 < 0, ee = j ? k < E ? k - E : k - O : 0;
		return {
			[p]: f[p] + ee,
			data: {
				[p]: A,
				centerOffset: k - A - ee,
				...j && { alignmentOffset: ee }
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
			let { placement: r, middlewareData: i, rects: a, initialPlacement: o, platform: s, elements: c } = t, { mainAxis: l = !0, crossAxis: u = !0, fallbackPlacements: d, fallbackStrategy: f = "bestFit", fallbackAxisSideDirection: p = "none", flipAlignment: m = !0, ...h } = ot(e, t);
			if ((n = i.arrow) != null && n.alignmentOffset) return {};
			let g = st(r), _ = X(o), v = st(o) === o, y = await (s.isRTL == null ? void 0 : s.isRTL(c.floating)), b = d || (v || !m ? [xt(o)] : pt(o)), x = p !== "none";
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
function jt(e, t) {
	return {
		top: e.top - t.height,
		right: e.right - t.width,
		bottom: e.bottom - t.height,
		left: e.left - t.width
	};
}
function Mt(e) {
	return Qe.some((t) => e[t] >= 0);
}
var Nt = function(e) {
	return e === void 0 && (e = {}), {
		name: "hide",
		options: e,
		async fn(t) {
			let { rects: n, platform: r } = t, { strategy: i = "referenceHidden", ...a } = ot(e, t);
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
	let { placement: n, platform: r, elements: i } = e, a = await (r.isRTL == null ? void 0 : r.isRTL(i.floating)), o = st(n), s = ct(n), c = X(n) === "y", l = Pt.has(o) ? -1 : 1, u = a && c ? -1 : 1, d = ot(t, e), { mainAxis: f, crossAxis: p, alignmentAxis: m } = typeof d == "number" ? {
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
			} }, ...l } = ot(e, t), u = {
				x: n,
				y: r
			}, d = await a.detectOverflow(t, l), f = X(i), p = lt(f), m = u[p], h = u[f], g = (e, t) => at(t + d[e === "y" ? "top" : "left"], t, t - d[e === "y" ? "bottom" : "right"]);
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
			let { x: n, y: r, placement: i, rects: a, middlewareData: o } = t, { offset: s = 0, mainAxis: c = !0, crossAxis: l = !0 } = ot(e, t), u = {
				x: n,
				y: r
			}, d = X(i), f = lt(d), p = u[f], m = u[d], h = ot(s, t), g = typeof h == "number" ? {
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
				let e = f === "y" ? "width" : "height", t = Pt.has(st(i)), n = a.reference[d] - a.floating[e] + (t && o.offset?.[d] || 0) + (t ? 0 : g.crossAxis), r = a.reference[d] + a.reference[e] + (t ? 0 : o.offset?.[d] || 0) - (t ? g.crossAxis : 0);
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
			let { placement: n, rects: r, platform: i, elements: a } = t, { apply: o = () => {}, ...s } = ot(e, t), c = await i.detectOverflow(t, s), l = st(n), u = ct(n), d = X(n) === "y", { width: f, height: p } = r.floating, m, h;
			l === "top" || l === "bottom" ? (m = l, h = u === (await (i.isRTL == null ? void 0 : i.isRTL(a.floating)) ? "start" : "end") ? "left" : "right") : (h = l, m = u === "end" ? "top" : "bottom");
			let g = p - c.top - c.bottom, _ = f - c.left - c.right, v = $e(p - c[m], g), y = $e(f - c[h], _), b = t.middlewareData.shift, x = !b, S = v, C = y;
			b != null && b.enabled.x && (C = _), b != null && b.enabled.y && (S = g), x && !u && (d ? C = f - 2 * et(c.left, c.right) : S = p - 2 * et(c.top, c.bottom)), await o({
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
function Bt() {
	return typeof window < "u";
}
function Vt(e) {
	return Ut(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function Z(e) {
	var t;
	return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function Ht(e) {
	return ((Ut(e) ? e.ownerDocument : e.document) || window.document)?.documentElement;
}
function Ut(e) {
	return Bt() ? e instanceof Node || e instanceof Z(e).Node : !1;
}
function Q(e) {
	return Bt() ? e instanceof Element || e instanceof Z(e).Element : !1;
}
function Wt(e) {
	return Bt() ? e instanceof HTMLElement || e instanceof Z(e).HTMLElement : !1;
}
function Gt(e) {
	return !Bt() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof Z(e).ShadowRoot;
}
function Kt(e) {
	let { overflow: t, overflowX: n, overflowY: r, display: i } = $(e);
	return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && i !== "inline" && i !== "contents";
}
function qt(e) {
	return /^(table|td|th)$/.test(Vt(e));
}
function Jt(e) {
	try {
		if (e.matches(":popover-open")) return !0;
	} catch {}
	try {
		return e.matches(":modal");
	} catch {
		return !1;
	}
}
var Yt = /transform|translate|scale|rotate|perspective|filter/, Xt = /paint|layout|strict|content/, Zt = (e) => !!e && e !== "none", Qt;
function $t(e) {
	let t = Q(e) ? $(e) : e;
	return Zt(t.transform) || Zt(t.translate) || Zt(t.scale) || Zt(t.rotate) || Zt(t.perspective) || !tn() && (Zt(t.backdropFilter) || Zt(t.filter)) || Yt.test(t.willChange || "") || Xt.test(t.contain || "");
}
function en(e) {
	let t = an(e);
	for (; Wt(t) && !nn(t);) {
		if ($t(t)) return t;
		if (Jt(t)) return null;
		t = an(t);
	}
	return null;
}
function tn() {
	return Qt ??= typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none"), Qt;
}
function nn(e) {
	return /^(html|body|#document)$/.test(Vt(e));
}
function $(e) {
	return Z(e).getComputedStyle(e);
}
function rn(e) {
	return Q(e) ? {
		scrollLeft: e.scrollLeft,
		scrollTop: e.scrollTop
	} : {
		scrollLeft: e.scrollX,
		scrollTop: e.scrollY
	};
}
function an(e) {
	if (Vt(e) === "html") return e;
	let t = e.assignedSlot || e.parentNode || Gt(e) && e.host || Ht(e);
	return Gt(t) ? t.host : t;
}
function on(e) {
	let t = an(e);
	return nn(t) ? (e.ownerDocument || e).body : Wt(t) && Kt(t) ? t : on(t);
}
function sn(e, t, n) {
	t === void 0 && (t = []), n === void 0 && (n = !0);
	let r = on(e), i = r === e.ownerDocument?.body, a = Z(r);
	if (i) {
		let e = cn(a);
		return t.concat(a, a.visualViewport || [], Kt(r) ? r : [], e && n ? sn(e) : []);
	}
	return t.concat(r, sn(r, [], n));
}
function cn(e) {
	return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
// ../vibebook/node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs
function ln(e) {
	let t = $(e), n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0, i = Wt(e), a = i ? e.offsetWidth : n, o = i ? e.offsetHeight : r, s = tt(n) !== a || tt(r) !== o;
	return s && (n = a, r = o), {
		width: n,
		height: r,
		$: s
	};
}
function un(e) {
	return Q(e) ? e : e.contextElement;
}
function dn(e) {
	let t = un(e);
	if (!Wt(t)) return rt(1);
	let n = t.getBoundingClientRect(), { width: r, height: i, $: a } = ln(t), o = (a ? tt(n.width) : n.width) / r, s = (a ? tt(n.height) : n.height) / i;
	return o && Number.isFinite(o) || (o = 1), s && Number.isFinite(s) || (s = 1), {
		x: o,
		y: s
	};
}
var fn = /*#__PURE__*/ rt(0);
function pn(e) {
	let t = Z(e);
	return !tn() || !t.visualViewport ? fn : {
		x: t.visualViewport.offsetLeft,
		y: t.visualViewport.offsetTop
	};
}
function mn(e, t, n) {
	return t === void 0 && (t = !1), !!n && t && n === Z(e);
}
function hn(e, t, n, r) {
	t === void 0 && (t = !1), n === void 0 && (n = !1);
	let i = e.getBoundingClientRect(), a = un(e), o = rt(1);
	t && (r ? Q(r) && (o = dn(r)) : o = dn(e));
	let s = mn(a, n, r) ? pn(a) : rt(0), c = (i.left + s.x) / o.x, l = (i.top + s.y) / o.y, u = i.width / o.x, d = i.height / o.y;
	if (a && r) {
		let e = Z(a), t = Q(r) ? Z(r) : r, n = e, i = cn(n);
		for (; i && t !== n;) {
			let e = dn(i), t = i.getBoundingClientRect(), r = $(i), a = t.left + (i.clientLeft + parseFloat(r.paddingLeft)) * e.x, o = t.top + (i.clientTop + parseFloat(r.paddingTop)) * e.y;
			c *= e.x, l *= e.y, u *= e.x, d *= e.y, c += a, l += o, n = Z(i), i = cn(n);
		}
	}
	return wt({
		width: u,
		height: d,
		x: c,
		y: l
	});
}
function gn(e, t) {
	let n = rn(e).scrollLeft;
	return t ? t.left + n : hn(Ht(e)).left + n;
}
function _n(e, t) {
	let n = e.getBoundingClientRect();
	return {
		x: n.left + t.scrollLeft - gn(e, n),
		y: n.top + t.scrollTop
	};
}
function vn(e) {
	let { elements: t, rect: n, offsetParent: r, strategy: i } = e, a = i === "fixed", o = Ht(r), s = t ? Jt(t.floating) : !1;
	if (r === o || s && a) return n;
	let c = {
		scrollLeft: 0,
		scrollTop: 0
	}, l = rt(1), u = rt(0), d = Wt(r);
	if ((d || !a) && ((Vt(r) !== "body" || Kt(o)) && (c = rn(r)), d)) {
		let e = hn(r);
		l = dn(r), u.x = e.x + r.clientLeft, u.y = e.y + r.clientTop;
	}
	let f = o && !d && !a ? _n(o, c) : rt(0);
	return {
		width: n.width * l.x,
		height: n.height * l.y,
		x: n.x * l.x - c.scrollLeft * l.x + u.x + f.x,
		y: n.y * l.y - c.scrollTop * l.y + u.y + f.y
	};
}
function yn(e) {
	return e.getClientRects ? Array.from(e.getClientRects()) : [];
}
function bn(e) {
	let t = rn(e), n = e.ownerDocument.body, r = et(e.scrollWidth, e.clientWidth, n.scrollWidth, n.clientWidth), i = et(e.scrollHeight, e.clientHeight, n.scrollHeight, n.clientHeight), a = -t.scrollLeft + gn(e), o = -t.scrollTop;
	return $(n).direction === "rtl" && (a += et(e.clientWidth, n.clientWidth) - r), {
		width: r,
		height: i,
		x: a,
		y: o
	};
}
var xn = 25;
function Sn(e, t, n) {
	n === void 0 && (n = "viewport");
	let r = n === "layoutViewport", i = Z(e), a = Ht(e), o = i.visualViewport, s = a.clientWidth, c = a.clientHeight, l = 0, u = 0;
	if (o) {
		let e = !tn() || t === "fixed";
		r ? e || (l = -o.offsetLeft, u = -o.offsetTop) : (s = o.width, c = o.height, e && (l = o.offsetLeft, u = o.offsetTop));
	}
	if (gn(a) <= 0) {
		let e = a.ownerDocument, t = e.body, n = getComputedStyle(t), r = e.compatMode === "CSS1Compat" && parseFloat(n.marginLeft) + parseFloat(n.marginRight) || 0, i = Math.abs(a.clientWidth - t.clientWidth - r), o = getComputedStyle(a).scrollbarGutter === "stable both-edges" ? i / 2 : i;
		o <= xn && (s -= o);
	}
	return {
		width: s,
		height: c,
		x: l,
		y: u
	};
}
function Cn(e, t) {
	let n = hn(e, !0, t === "fixed"), r = n.top + e.clientTop, i = n.left + e.clientLeft, a = dn(e);
	return {
		width: e.clientWidth * a.x,
		height: e.clientHeight * a.y,
		x: i * a.x,
		y: r * a.y
	};
}
function wn(e, t, n) {
	let r;
	if (t === "viewport" || t === "layoutViewport") r = Sn(e, n, t);
	else if (t === "document") r = bn(Ht(e));
	else if (Q(t)) r = Cn(t, n);
	else {
		let n = pn(e);
		r = {
			x: t.x - n.x,
			y: t.y - n.y,
			width: t.width,
			height: t.height
		};
	}
	return wt(r);
}
function Tn(e, t) {
	let n = t.get(e);
	if (n) return n;
	let r = sn(e, [], !1).filter((e) => Q(e) && Vt(e) !== "body"), i = null, a = $(e).position === "fixed", o = a ? an(e) : e;
	for (; Q(o) && !nn(o);) {
		let e = $(o), t = $t(o), n = i ? i.position : a ? "fixed" : "";
		!t && (n === "fixed" || n === "absolute" && e.position === "static") ? r = r.filter((e) => e !== o) : i = e, o = an(o);
	}
	return t.set(e, r), r;
}
function En(e) {
	let { element: t, boundary: n, rootBoundary: r, strategy: i } = e, a = [...n === "clippingAncestors" ? Jt(t) ? [] : Tn(t, this._c) : [].concat(n), r], o = wn(t, a[0], i), s = o.top, c = o.right, l = o.bottom, u = o.left;
	for (let e = 1; e < a.length; e++) {
		let n = wn(t, a[e], i);
		s = et(n.top, s), c = $e(n.right, c), l = $e(n.bottom, l), u = et(n.left, u);
	}
	return {
		width: c - u,
		height: l - s,
		x: u,
		y: s
	};
}
function Dn(e) {
	let { width: t, height: n } = ln(e);
	return {
		width: t,
		height: n
	};
}
function On(e, t, n) {
	let r = Wt(t), i = Ht(t), a = n === "fixed", o = hn(e, !0, a, t), s = {
		scrollLeft: 0,
		scrollTop: 0
	}, c = rt(0);
	if ((r || !a) && ((Vt(t) !== "body" || Kt(i)) && (s = rn(t)), r)) {
		let e = hn(t, !0, a, t);
		c.x = e.x + t.clientLeft, c.y = e.y + t.clientTop;
	}
	!r && i && (c.x = gn(i));
	let l = i && !r && !a ? _n(i, s) : rt(0);
	return {
		x: o.left + s.scrollLeft - c.x - l.x,
		y: o.top + s.scrollTop - c.y - l.y,
		width: o.width,
		height: o.height
	};
}
function kn(e) {
	return $(e).position === "static";
}
function An(e, t) {
	if (!Wt(e) || $(e).position === "fixed") return null;
	if (t) return t(e);
	let n = e.offsetParent;
	return Ht(e) === n && (n = n.ownerDocument.body), n;
}
function jn(e, t) {
	let n = Z(e);
	if (Jt(e)) return n;
	if (!Wt(e)) {
		let t = an(e);
		for (; t && !nn(t);) {
			if (Q(t) && !kn(t)) return t;
			t = an(t);
		}
		return n;
	}
	let r = An(e, t);
	for (; r && qt(r) && kn(r);) r = An(r, t);
	return r && nn(r) && kn(r) && !$t(r) ? n : r || en(e) || n;
}
var Mn = async function(e) {
	let t = this.getOffsetParent || jn, n = this.getDimensions, r = await n(e.floating);
	return {
		reference: On(e.reference, await t(e.floating), e.strategy),
		floating: {
			x: 0,
			y: 0,
			width: r.width,
			height: r.height
		}
	};
};
function Nn(e) {
	return $(e).direction === "rtl";
}
var Pn = {
	convertOffsetParentRelativeRectToViewportRelativeRect: vn,
	getDocumentElement: Ht,
	getClippingRect: En,
	getOffsetParent: jn,
	getElementRects: Mn,
	getClientRects: yn,
	getDimensions: Dn,
	getScale: dn,
	isElement: Q,
	isRTL: Nn
};
function Fn(e, t) {
	return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function In(e, t, n) {
	let r = null, i, a = Ht(e);
	function o() {
		var e;
		clearTimeout(i), (e = r) == null || e.disconnect(), r = null;
	}
	function s(n, c) {
		n === void 0 && (n = !1), c === void 0 && (c = 1), o();
		let l = e.getBoundingClientRect(), { left: u, top: d, width: f, height: p } = l;
		if (n || t(), !f || !p) return;
		let m = nt(d), h = nt(a.clientWidth - (u + f)), g = nt(a.clientHeight - (d + p)), _ = nt(u), v = {
			rootMargin: -m + "px " + -h + "px " + -g + "px " + -_ + "px",
			threshold: et(0, $e(1, c)) || 1
		}, y = !0;
		function b(t) {
			let n = t[0].intersectionRatio;
			if (!Fn(l, e.getBoundingClientRect())) return s();
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
function Ln(e, t, n, r) {
	r === void 0 && (r = {});
	let { ancestorScroll: i = !0, ancestorResize: a = !0, elementResize: o = typeof ResizeObserver == "function", layoutShift: s = typeof IntersectionObserver == "function", animationFrame: c = !1 } = r, l = un(e), u = i || a ? [...l ? sn(l) : [], ...t ? sn(t) : []] : [];
	u.forEach((e) => {
		i && e.addEventListener("scroll", n), a && e.addEventListener("resize", n);
	});
	let d = l && s ? In(l, n, a) : null, f = -1, p = null;
	o && (p = new ResizeObserver((e) => {
		let [r] = e;
		r && r.target === l && p && t && (p.unobserve(t), cancelAnimationFrame(f), f = requestAnimationFrame(() => {
			var e;
			(e = p) == null || e.observe(t);
		})), n();
	}), l && !c && p.observe(l), t && p.observe(t));
	let m, h = c ? hn(e) : null;
	c && g();
	function g() {
		let t = hn(e);
		h && !Fn(h, t) && n(), h = t, m = requestAnimationFrame(g);
	}
	return n(), () => {
		var e;
		u.forEach((e) => {
			i && e.removeEventListener("scroll", n), a && e.removeEventListener("resize", n);
		}), d?.(), (e = p) == null || e.disconnect(), p = null, c && cancelAnimationFrame(m);
	};
}
var Rn = It, zn = Lt, Bn = At, Vn = zt, Hn = Nt, Un = kt, Wn = Rt, Gn = (e, t, n) => {
	let r = /* @__PURE__ */ new Map(), i = n ?? {}, a = {
		...Pn,
		...i.platform,
		_c: r
	};
	return Ot(e, t, {
		...i,
		platform: a
	});
};
// ../vibebook/node_modules/bits-ui/dist/internal/floating-svelte/use-floating.svelte.js
function Kn(e) {
	let n = e.whileElementsMounted, r = B(() => Je(e.open) ?? !0), i = B(() => Je(e.middleware)), a = B(() => Je(e.transform) ?? !0), o = B(() => Je(e.placement) ?? "bottom"), s = B(() => Je(e.strategy) ?? "absolute"), c = B(() => Je(e.sideOffset) ?? 0), l = B(() => Je(e.alignOffset) ?? 0), u = e.reference, d;
	v(() => {
		d = {
			middleware: N(i),
			placement: N(o),
			strategy: N(s),
			open: N(r),
			sideOffset: N(c),
			alignOffset: N(l)
		};
	});
	let f = J(0), p = J(0), m = U(null), h = J(t(N(s))), g = J(t(N(o))), _ = J(t({})), y = J(!1), b = !1, x = 0, S = !1, C = B(() => {
		let e = m.current ? Xe(m.current, N(f)) : N(f), t = m.current ? Xe(m.current, N(p)) : N(p);
		return N(a) ? {
			position: N(h),
			left: "0",
			top: "0",
			transform: `translate(${e}px, ${t}px)`,
			...m.current && Ye(m.current) >= 1.5 && { willChange: "transform" }
		} : {
			position: N(h),
			left: `${e}px`,
			top: `${t}px`
		};
	}), w;
	function T() {
		if (S || u.current === null || m.current === null) return;
		let e = u.current, t = m.current, n = ++x;
		Gn(e, t, {
			middleware: d.middleware,
			placement: d.placement,
			strategy: d.strategy
		}).then((r) => {
			if (n === x && u.current === e && m.current === t) {
				if (qn(e)) z(_, {
					...N(_),
					hide: {
						...N(_).hide,
						referenceHidden: !0
					}
				}, !0);
				else {
					if (!d.open && N(f) !== 0 && N(p) !== 0) {
						let e = Math.max(Math.abs(d.sideOffset), Math.abs(d.alignOffset), 15);
						if (r.x <= e && r.y <= e) return;
					}
					z(f, r.x, !0), z(p, r.y, !0), z(h, r.strategy, !0), z(g, r.placement, !0), z(_, r.middlewareData, !0), z(y, !0);
				}
			}
		});
	}
	function E() {
		typeof w == "function" && (w(), w = void 0), x++;
	}
	function D() {
		E(), n === void 0 ? (O(), T()) : N(r) && u.current !== null && m.current !== null && (O(), w = n(u.current, m.current, T));
	}
	function O() {
		return [
			N(i),
			N(o),
			N(s)
		];
	}
	function k() {
		!N(r) && m.current === null && z(y, !1);
	}
	function A() {
		return [
			N(i),
			N(o),
			N(s),
			N(c),
			N(l),
			N(r)
		];
	}
	return G(() => {
		n === void 0 && N(r) && (O(), T());
	}), G(D), G(() => {
		n !== void 0 && (A(), N(r) && N(y) ? b ? T() : b = !0 : b = !1);
	}), G(k), G(() => () => {
		S = !0, E();
	}), {
		floating: m,
		reference: u,
		get strategy() {
			return N(h);
		},
		get placement() {
			return N(g);
		},
		get middlewareData() {
			return N(_);
		},
		get isPositioned() {
			return N(y);
		},
		get floatingStyles() {
			return N(C);
		},
		get update() {
			return T;
		}
	};
}
function qn(e) {
	return e instanceof Element ? !e.isConnected || e instanceof HTMLElement && e.hidden ? !0 : e.getClientRects().length === 0 : !1;
}
// ../vibebook/node_modules/bits-ui/dist/bits/utilities/floating-layer/use-floating-layer.svelte.js
var Jn = {
	top: "bottom",
	right: "left",
	bottom: "top",
	left: "right"
}, Yn = new se("Floating.Content"), Xn = class t {
	static create(e, n = !1) {
		return n ? Yn.set(new t(e, Ge.get())) : Yn.set(new t(e, We.get()));
	}
	opts;
	root;
	contentRef = U(null);
	wrapperRef = U(null);
	arrowRef = U(null);
	contentAttachment = ae(this.contentRef);
	wrapperAttachment = ae(this.wrapperRef);
	arrowAttachment = ae(this.arrowRef);
	arrowId = U(a());
	#e = B(() => {
		if (typeof this.opts.style == "string") return me(this.opts.style);
		if (!this.opts.style) return {};
	});
	#t = void 0;
	#n = new oe(() => this.arrowRef.current ?? void 0);
	#r = B(() => this.#n?.width ?? 0);
	#i = B(() => this.#n?.height ?? 0);
	#a = B(() => this.opts.side?.current + (this.opts.align.current === "center" ? "" : `-${this.opts.align.current}`));
	#o = B(() => (Array.isArray(this.opts.collisionBoundary.current) ? this.opts.collisionBoundary.current : [this.opts.collisionBoundary.current]).filter(r));
	#s = B(() => N(this.#o).length > 0);
	get hasExplicitBoundaries() {
		return N(this.#s);
	}
	set hasExplicitBoundaries(e) {
		z(this.#s, e);
	}
	#c = B(() => ({
		padding: this.opts.collisionPadding.current,
		boundary: N(this.#o),
		altBoundary: this.hasExplicitBoundaries
	}));
	get detectOverflowOptions() {
		return N(this.#c);
	}
	set detectOverflowOptions(e) {
		z(this.#c, e);
	}
	#l = J(void 0);
	#u = J(void 0);
	#d = J(void 0);
	#f = J(void 0);
	#p = B(() => [
		Rn({
			mainAxis: this.opts.sideOffset.current + N(this.#i),
			alignmentAxis: this.opts.alignOffset.current
		}),
		this.opts.avoidCollisions.current && zn({
			mainAxis: !0,
			crossAxis: !1,
			limiter: this.opts.sticky.current === "partial" ? Wn() : void 0,
			...this.detectOverflowOptions
		}),
		this.opts.avoidCollisions.current && Bn({ ...this.detectOverflowOptions }),
		Vn({
			...this.detectOverflowOptions,
			apply: ({ rects: e, availableWidth: t, availableHeight: n }) => {
				let { width: r, height: i } = e.reference;
				z(this.#l, t, !0), z(this.#u, n, !0), z(this.#d, r, !0), z(this.#f, i, !0);
			}
		}),
		this.arrowRef.current && Un({
			element: this.arrowRef.current,
			padding: this.opts.arrowPadding.current
		}),
		Zn({
			arrowWidth: N(this.#r),
			arrowHeight: N(this.#i)
		}),
		this.opts.hideWhenDetached.current && Hn({
			strategy: "referenceHidden",
			...this.detectOverflowOptions
		}),
		this.opts.hideWhenDetached.current && !this.hasExplicitBoundaries && {
			...Hn({
				strategy: "referenceHidden",
				boundary: "clippingAncestors"
			}),
			name: "hideClipping"
		}
	].filter(Boolean));
	get middleware() {
		return N(this.#p);
	}
	set middleware(e) {
		z(this.#p, e);
	}
	floating;
	#m = B(() => $n(this.floating.placement));
	get placedSide() {
		return N(this.#m);
	}
	set placedSide(e) {
		z(this.#m, e);
	}
	#h = B(() => er(this.floating.placement));
	get placedAlign() {
		return N(this.#h);
	}
	set placedAlign(e) {
		z(this.#h, e);
	}
	#g = B(() => this.floating.middlewareData.arrow?.x ?? 0);
	get arrowX() {
		return N(this.#g);
	}
	set arrowX(e) {
		z(this.#g, e);
	}
	#_ = B(() => this.floating.middlewareData.arrow?.y ?? 0);
	get arrowY() {
		return N(this.#_);
	}
	set arrowY(e) {
		z(this.#_, e);
	}
	#v = B(() => this.floating.middlewareData.arrow?.centerOffset !== 0);
	get cannotCenterArrow() {
		return N(this.#v);
	}
	set cannotCenterArrow(e) {
		z(this.#v, e);
	}
	#y = J("auto");
	get contentZIndex() {
		return N(this.#y);
	}
	set contentZIndex(e) {
		z(this.#y, e, !0);
	}
	#b = B(() => Jn[this.placedSide]);
	get arrowBaseSide() {
		return N(this.#b);
	}
	set arrowBaseSide(e) {
		z(this.#b, e);
	}
	#x = B(() => ({
		id: this.opts.wrapperId.current,
		"data-bits-floating-content-wrapper": "",
		style: {
			...this.floating.floatingStyles,
			transform: this.floating.isPositioned ? this.floating.floatingStyles.transform : "translate(0, -200%)",
			minWidth: "max-content",
			zIndex: this.contentZIndex,
			"--bits-floating-transform-origin": `${this.floating.middlewareData.transformOrigin?.x} ${this.floating.middlewareData.transformOrigin?.y}`,
			"--bits-floating-available-width": `${N(this.#l)}px`,
			"--bits-floating-available-height": `${N(this.#u)}px`,
			"--bits-floating-anchor-width": `${N(this.#d)}px`,
			"--bits-floating-anchor-height": `${N(this.#f)}px`,
			...(this.floating.middlewareData.hide?.referenceHidden || this.floating.middlewareData.hideClipping?.referenceHidden) && {
				visibility: "hidden",
				"pointer-events": "none"
			},
			...N(this.#e)
		},
		dir: this.opts.dir.current,
		...this.wrapperAttachment
	}));
	get wrapperProps() {
		return N(this.#x);
	}
	set wrapperProps(e) {
		z(this.#x, e);
	}
	#S = B(() => ({
		"data-side": this.placedSide,
		"data-align": this.placedAlign,
		style: e({ ...N(this.#e) }),
		...this.contentAttachment
	}));
	get props() {
		return N(this.#S);
	}
	set props(e) {
		z(this.#S, e);
	}
	#C = B(() => ({
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
		return N(this.#C);
	}
	set arrowStyle(e) {
		z(this.#C, e);
	}
	constructor(e, t) {
		this.opts = e, this.root = t, this.#t = e.updatePositionStrategy, e.customAnchor && (this.root.customAnchorNode.current = e.customAnchor.current), P(() => e.customAnchor.current, (e) => {
			this.root.customAnchorNode.current = e;
		}), this.floating = Kn({
			strategy: () => this.opts.strategy.current,
			placement: () => N(this.#a),
			middleware: () => this.middleware,
			reference: this.root.anchorNode,
			whileElementsMounted: (...e) => Ln(...e, { animationFrame: this.#t?.current === "always" }),
			open: () => this.opts.enabled.current,
			sideOffset: () => this.opts.sideOffset.current,
			alignOffset: () => this.opts.alignOffset.current
		}), G(() => {
			this.floating.isPositioned && this.opts.onPlaced?.current();
		}), P([() => this.contentRef.current, () => this.opts.enabled.current], ([e, t]) => {
			if (!e || !t) return;
			let n = Oe(e), r = n.requestAnimationFrame(() => {
				if (this.contentRef.current !== e || !this.opts.enabled.current) return;
				let t = n.getComputedStyle(e).zIndex;
				t !== this.contentZIndex && (this.contentZIndex = t);
			});
			return () => {
				n.cancelAnimationFrame(r);
			};
		}), G(() => {
			this.floating.floating.current = this.wrapperRef.current;
		});
	}
};
function Zn(e) {
	return {
		name: "transformOrigin",
		options: e,
		fn(t) {
			let { placement: n, rects: r, middlewareData: i } = t, a = i.arrow?.centerOffset !== 0, o = a ? 0 : e.arrowWidth, s = a ? 0 : e.arrowHeight, [c, l] = Qn(n), u = {
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
function Qn(e) {
	let [t, n = "center"] = e.split("-");
	return [t, n];
}
function $n(e) {
	return Qn(e)[0];
}
function er(e) {
	return Qn(e)[1];
}
// ../vibebook/node_modules/bits-ui/dist/bits/utilities/floating-layer/components/floating-layer-content.svelte
function tr(e, t) {
	W(t, !0);
	let n = q(t, "side", 3, "bottom"), r = q(t, "sideOffset", 3, 0), i = q(t, "align", 3, "center"), o = q(t, "alignOffset", 3, 0), s = q(t, "arrowPadding", 3, 0), c = q(t, "avoidCollisions", 3, !0), l = q(t, "collisionBoundary", 19, () => []), d = q(t, "collisionPadding", 3, 0), p = q(t, "hideWhenDetached", 3, !1), m = q(t, "onPlaced", 3, () => {}), h = q(t, "sticky", 3, "partial"), g = q(t, "updatePositionStrategy", 3, "optimized"), _ = q(t, "strategy", 3, "fixed"), v = q(t, "dir", 3, "ltr"), y = q(t, "style", 19, () => ({})), b = q(t, "wrapperId", 19, a), x = q(t, "customAnchor", 3, null), S = q(t, "tooltip", 3, !1), C = Xn.create({
		side: Y(() => n()),
		sideOffset: Y(() => r()),
		align: Y(() => i()),
		alignOffset: Y(() => o()),
		id: Y(() => t.id),
		arrowPadding: Y(() => s()),
		avoidCollisions: Y(() => c()),
		collisionBoundary: Y(() => l()),
		collisionPadding: Y(() => d()),
		hideWhenDetached: Y(() => p()),
		onPlaced: Y(() => m()),
		sticky: Y(() => h()),
		updatePositionStrategy: Y(() => g()),
		strategy: Y(() => _()),
		dir: Y(() => v()),
		style: Y(() => y()),
		enabled: Y(() => t.enabled),
		wrapperId: Y(() => b()),
		customAnchor: Y(() => x())
	}, f(() => S())), w = B(() => O(C.wrapperProps, { style: { pointerEvents: "auto" } }));
	var T = u(), E = F(T);
	M(E, () => t.content ?? V, () => ({
		props: C.props,
		wrapperProps: N(w)
	})), D(e, T), L();
}
// ../vibebook/node_modules/bits-ui/dist/bits/utilities/floating-layer/components/floating-layer-content-static.svelte
function nr(e, t) {
	W(t, !0), Ee(() => {
		t.onPlaced?.();
	});
	var n = u(), r = F(n);
	M(r, () => t.content ?? V, () => ({
		props: {},
		wrapperProps: {}
	})), D(e, n), L();
}
// ../vibebook/node_modules/bits-ui/dist/bits/utilities/popper-layer/popper-content.svelte
var rr = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"content",
	"isStatic",
	"onPlaced"
]);
function ir(e, t) {
	let r = q(t, "isStatic", 3, !1), i = fe(t, rr);
	var a = u(), o = F(a), s = (e) => {
		nr(e, {
			get content() {
				return t.content;
			},
			get onPlaced() {
				return t.onPlaced;
			}
		});
	}, c = (e) => {
		tr(e, H({
			get content() {
				return t.content;
			},
			get onPlaced() {
				return t.onPlaced;
			}
		}, () => i));
	};
	n(o, (e) => {
		r() ? e(s) : e(c, -1);
	}), D(e, a);
}
// ../vibebook/node_modules/bits-ui/dist/bits/utilities/popper-layer/popper-layer-inner.svelte
var ar = /* @__PURE__ */ new Set(/* @__PURE__ */ "$$slots.$$events.$$legacy.popper.onEscapeKeydown.escapeKeydownBehavior.preventOverflowTextSelection.id.onPointerDown.onPointerUp.side.sideOffset.align.alignOffset.arrowPadding.avoidCollisions.collisionBoundary.collisionPadding.sticky.hideWhenDetached.updatePositionStrategy.strategy.dir.preventScroll.wrapperId.style.onPlaced.onInteractOutside.onCloseAutoFocus.onOpenAutoFocus.onFocusOutside.interactOutsideBehavior.loop.trapFocus.isValidEvent.customAnchor.isStatic.enabled.forceMount.ref.tooltip.contentPointerEvents".split(".")), or = g("<!> <!>", 1);
function sr(e, t) {
	W(t, !0);
	let r = q(t, "interactOutsideBehavior", 3, "close"), i = q(t, "trapFocus", 3, !0), a = q(t, "isValidEvent", 3, () => !1), s = q(t, "customAnchor", 3, null), l = q(t, "isStatic", 3, !1), d = q(t, "tooltip", 3, !1), f = q(t, "contentPointerEvents", 3, "auto"), p = fe(t, ar), m = B(() => t.preventScroll ?? !0), h = B(() => t.strategy ?? (N(m) ? "fixed" : "absolute"));
	ir(e, {
		get isStatic() {
			return l();
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
			return N(h);
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
			return d();
		},
		content: (e, s) => {
			let l = () => (s?.()).props, d = () => (s?.()).wrapperProps;
			var h = or(), g = F(h), _ = (e) => {
				ee(e, { get preventScroll() {
					return N(m);
				} });
			}, v = (e) => {
				ee(e, { get preventScroll() {
					return N(m);
				} });
			};
			n(g, (e) => {
				t.forceMount && t.enabled ? e(_) : t.forceMount || e(v, 1);
			});
			var y = k(g, 2);
			ne(y, {
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
					return i();
				},
				get forceMount() {
					return t.forceMount;
				},
				get ref() {
					return t.ref;
				},
				focusScope: (e, n) => {
					let i = () => (n?.()).props;
					c(e, {
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
							o(e, {
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
									return r();
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
									Ie(e, {
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
											var a = u(), o = F(a);
											{
												let e = B(() => ({
													props: O(p, l(), r(), i(), {
														id: t.id,
														style: { pointerEvents: f() }
													}),
													wrapperProps: d()
												}));
												M(o, () => t.popper ?? V, () => N(e));
											}
											D(e, a);
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
			}), D(e, h);
		},
		$$slots: { content: !0 }
	}), L();
}
// ../vibebook/node_modules/bits-ui/dist/bits/utilities/popper-layer/popper-layer.svelte
var cr = /* @__PURE__ */ new Set(/* @__PURE__ */ "$$slots.$$events.$$legacy.popper.open.onEscapeKeydown.escapeKeydownBehavior.preventOverflowTextSelection.id.onPointerDown.onPointerUp.side.sideOffset.align.alignOffset.arrowPadding.avoidCollisions.collisionBoundary.collisionPadding.sticky.hideWhenDetached.updatePositionStrategy.strategy.dir.preventScroll.wrapperId.style.onPlaced.onInteractOutside.onCloseAutoFocus.onOpenAutoFocus.onFocusOutside.interactOutsideBehavior.loop.trapFocus.isValidEvent.customAnchor.isStatic.ref.shouldRender".split("."));
function lr(e, t) {
	let r = q(t, "interactOutsideBehavior", 3, "close"), i = q(t, "trapFocus", 3, !0), a = q(t, "isValidEvent", 3, () => !1), o = q(t, "customAnchor", 3, null), s = q(t, "isStatic", 3, !1), c = fe(t, cr);
	var l = u(), d = F(l), f = (e) => {
		sr(e, H({
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
				return r();
			},
			get loop() {
				return t.loop;
			},
			get trapFocus() {
				return i();
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
	n(d, (e) => {
		t.shouldRender && e(f);
	}), D(e, l);
}
// ../vibebook/node_modules/bits-ui/dist/bits/utilities/popper-layer/popper-layer-force-mount.svelte
var ur = /* @__PURE__ */ new Set(/* @__PURE__ */ "$$slots.$$events.$$legacy.popper.onEscapeKeydown.escapeKeydownBehavior.preventOverflowTextSelection.id.onPointerDown.onPointerUp.side.sideOffset.align.alignOffset.arrowPadding.avoidCollisions.collisionBoundary.collisionPadding.sticky.hideWhenDetached.updatePositionStrategy.strategy.dir.preventScroll.wrapperId.style.onPlaced.onInteractOutside.onCloseAutoFocus.onOpenAutoFocus.onFocusOutside.interactOutsideBehavior.loop.trapFocus.isValidEvent.customAnchor.isStatic.enabled".split("."));
function dr(e, t) {
	let n = q(t, "interactOutsideBehavior", 3, "close"), r = q(t, "trapFocus", 3, !0), i = q(t, "isValidEvent", 3, () => !1), a = q(t, "customAnchor", 3, null), o = q(t, "isStatic", 3, !1), s = fe(t, ur);
	sr(e, H({
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
function fr(e, t) {
	let [n, r] = e, i = !1, a = t.length;
	for (let e = 0, o = a - 1; e < a; o = e++) {
		let [a, s] = t[e] ?? [0, 0], [c, l] = t[o] ?? [0, 0];
		s >= r != l >= r && n <= (c - a) * (r - s) / (l - s) + a && (i = !i);
	}
	return i;
}
function pr(e, t) {
	return e[0] >= t.left && e[0] <= t.right && e[1] >= t.top && e[1] <= t.bottom;
}
function mr(e, t) {
	let n = e.left + e.width / 2, r = e.top + e.height / 2, i = t.left + t.width / 2, a = t.top + t.height / 2, o = i - n, s = a - r;
	return Math.abs(o) > Math.abs(s) ? o > 0 ? "right" : "left" : s > 0 ? "bottom" : "top";
}
var hr = class {
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
		this.#n = typeof t == "number" && t > 0 ? t : null, P([
			e.triggerNode,
			e.contentNode,
			e.enabled
		], ([e, t, n]) => {
			if (!e || !t || !n) {
				this.#o = null, this.#m();
				return;
			}
			this.#o && this.#o !== e && this.#m(), this.#o = e;
			let r = y(e);
			return [
				m(r, "pointermove", (n) => {
					this.#p([n.clientX, n.clientY], e, t);
				}),
				m(e, "pointerleave", (e) => {
					let n = e.relatedTarget;
					if (A(n) && t.contains(n)) return;
					let r = this.#e.ignoredTargets?.() ?? [];
					A(n) && r.some((e) => e === n || e.contains(n)) || (this.#a = A(n) && r.length > 0 ? r.filter((e) => n.contains(e)) : [], this.#r = [e.clientX, e.clientY], this.#i = "content", this.#u());
				}),
				m(e, "pointerenter", () => {
					this.#m();
				}),
				m(t, "pointerenter", () => {
					this.#m();
				}),
				m(t, "pointerleave", (t) => {
					let n = t.relatedTarget;
					A(n) && e.contains(n) || (this.#r = [t.clientX, t.clientY], this.#i = "trigger", this.#u());
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
		if (this.#i === "content" && pr(e, i) || this.#i === "trigger" && pr(e, r)) {
			this.#m();
			return;
		}
		if (this.#i === "content" && this.#a.length > 0) for (let t of this.#a) {
			let n = t.getBoundingClientRect();
			if (pr(e, n)) return;
			let i = mr(r, n), a = this.#h(r, n, i);
			if (a && fr(e, a)) return;
		}
		let a = mr(r, i), o = this.#h(r, i, a);
		if (o && fr(e, o)) return;
		let s = this.#i === "content" ? i : r;
		fr(e, this.#g(this.#r, s, a, this.#i)) || (this.#m(), this.#e.onPointerExit());
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
}, gr = class {
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
}, _r = p({
	component: "tooltip",
	parts: ["content", "trigger"]
}), vr = new se("Tooltip.Provider"), yr = new se("Tooltip.Root"), br = class {
	triggers = /* @__PURE__ */ new Map();
	#e = J(0);
	#t = J(null);
	get activeTriggerId() {
		return N(this.#t);
	}
	set activeTriggerId(e) {
		z(this.#t, e, !0);
	}
	#n = B(() => {
		N(this.#e);
		let e = this.activeTriggerId;
		return e === null ? null : this.triggers.get(e)?.node ?? null;
	});
	get activeTriggerNode() {
		return N(this.#n);
	}
	set activeTriggerNode(e) {
		z(this.#n, e);
	}
	#r = B(() => {
		N(this.#e);
		let e = this.activeTriggerId;
		return e === null ? null : this.triggers.get(e)?.payload ?? null;
	});
	get activePayload() {
		return N(this.#r);
	}
	set activePayload(e) {
		z(this.#r, e);
	}
	register = (e) => {
		this.triggers.set(e.id, e), e.id === this.activeTriggerId && we(this.#e);
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
}, xr = class e {
	static create(t) {
		return vr.set(new e(t));
	}
	opts;
	#e = J(!0);
	get isOpenDelayed() {
		return N(this.#e);
	}
	set isOpenDelayed(e) {
		z(this.#e, e, !0);
	}
	isPointerInTransit = U(!1);
	#t;
	#n = J(null);
	#r = !1;
	constructor(e) {
		this.opts = e, this.#t = new gr(() => {
			this.isOpenDelayed = !0;
		}, this.opts.skipDelayDuration.current), Ue(() => m(window, "scroll", (e) => {
			let t = N(this.#n);
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
		N(this.#n) && N(this.#n) !== e && N(this.#n).handleClose(), this.#a(), this.isOpenDelayed = !1, z(this.#n, e, !0);
	};
	onClose = (e) => {
		N(this.#n) === e && (z(this.#n, null), this.#i());
	};
	isTooltipOpen = (e) => N(this.#n) === e;
}, Sr = class e {
	static create(t) {
		return yr.set(new e(t, vr.get()));
	}
	opts;
	provider;
	#e = B(() => this.opts.delayDuration.current ?? this.provider.opts.delayDuration.current);
	get delayDuration() {
		return N(this.#e);
	}
	set delayDuration(e) {
		z(this.#e, e);
	}
	#t = B(() => this.opts.disableHoverableContent.current ?? this.provider.opts.disableHoverableContent.current);
	get disableHoverableContent() {
		return N(this.#t);
	}
	set disableHoverableContent(e) {
		z(this.#t, e);
	}
	#n = B(() => this.opts.disableCloseOnTriggerClick.current ?? this.provider.opts.disableCloseOnTriggerClick.current);
	get disableCloseOnTriggerClick() {
		return N(this.#n);
	}
	set disableCloseOnTriggerClick(e) {
		z(this.#n, e);
	}
	#r = B(() => this.opts.disabled.current ?? this.provider.opts.disabled.current);
	get disabled() {
		return N(this.#r);
	}
	set disabled(e) {
		z(this.#r, e);
	}
	#i = B(() => this.opts.ignoreNonKeyboardFocus.current ?? this.provider.opts.ignoreNonKeyboardFocus.current);
	get ignoreNonKeyboardFocus() {
		return N(this.#i);
	}
	set ignoreNonKeyboardFocus(e) {
		z(this.#i, e);
	}
	registry;
	tether;
	#a = J(null);
	get contentNode() {
		return N(this.#a);
	}
	set contentNode(e) {
		z(this.#a, e, !0);
	}
	contentPresence;
	#o = J(!1);
	#s = J(!1);
	get openedViaFocus() {
		return N(this.#s);
	}
	set openedViaFocus(e) {
		z(this.#s, e, !0);
	}
	#c;
	#l = B(() => this.opts.open.current ? N(this.#o) ? "delayed-open" : "instant-open" : "closed");
	get stateAttr() {
		return N(this.#l);
	}
	set stateAttr(e) {
		z(this.#l, e);
	}
	constructor(e, t) {
		this.opts = e, this.provider = t, this.tether = e.tether.current?.state ?? null, this.registry = this.tether?.registry ?? new br(), this.#c = new gr(() => {
			z(this.#o, !0), this.opts.open.current = !0;
		}, this.delayDuration ?? 0), this.tether && (this.tether.root = this, Ue(() => () => {
			this.tether?.root === this && (this.tether.root = null);
		})), this.contentPresence = new x({
			open: this.opts.open,
			ref: Y(() => this.contentNode),
			onComplete: () => {
				this.opts.onOpenChangeComplete.current(this.opts.open.current);
			}
		}), P(() => this.delayDuration, () => {
			this.delayDuration !== void 0 && (this.#c = new gr(() => {
				z(this.#o, !0), this.opts.open.current = !0;
			}, this.delayDuration));
		}), P(() => this.opts.open.current, (e) => {
			e ? (this.ensureActiveTrigger(), this.provider.onOpen(this)) : (this.openedViaFocus = !1, this.provider.onClose(this));
		}, { lazy: !0 }), P(() => this.opts.triggerId.current, (e) => {
			e !== this.registry.activeTriggerId && this.registry.setActiveTrigger(e);
		}), P(() => this.registry.activeTriggerId, (e) => {
			this.opts.triggerId.current !== e && (this.opts.triggerId.current = e);
		});
	}
	handleOpen = () => {
		this.#c.stop(), z(this.#o, !1), this.ensureActiveTrigger(), this.opts.open.current = !0;
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
		e || t === 0 ? (z(this.#o, !1), this.opts.open.current = !0) : this.#c.start();
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
}, Cr = class e {
	static create(t) {
		return t.tether.current ? new e(t, null, t.tether.current.state) : new e(t, yr.get(), null);
	}
	opts;
	root;
	tether;
	attachment;
	#e = U(!1);
	#t = null;
	#n = J(!1);
	domContext;
	#r = null;
	#i = !1;
	#a = null;
	constructor(e, t, n) {
		this.opts = e, this.root = t, this.tether = n, this.domContext = new d(e.ref), this.attachment = ae(this.opts.ref, (e) => e ? this.#c(e) : this.#l()), P(() => this.opts.id.current, () => {
			this.#c(this.opts.ref.current);
		}), P(() => this.opts.payload.current, () => {
			this.#c(this.opts.ref.current);
		}), P(() => this.opts.disabled.current, () => {
			this.#c(this.opts.ref.current);
		}), Ue(() => (this.#i = !0, this.#c(this.opts.ref.current), () => {
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
			t.provider.isPointerInTransit.current && (t.provider.isPointerInTransit.current = !1, t.onTriggerEnter(this.opts.id.current), z(this.#n, !0));
		}, 250)) : (t.onTriggerEnter(this.opts.id.current), z(this.#n, !0))));
	};
	#h = (e) => {
		let t = this.#o();
		t && (this.#s() ? t.opts.open.current && t.handleClose() : e.pointerType !== "touch" && (N(this.#n) || (this.#d(), t.provider.isPointerInTransit.current = !1, t.onTriggerEnter(this.opts.id.current), z(this.#n, !0))));
	};
	#g = (e) => {
		let t = this.#o();
		if (!t || this.#s()) return;
		if (this.#d(), !t.isActiveTrigger(this.opts.id.current)) {
			z(this.#n, !1);
			return;
		}
		let n = e.relatedTarget;
		if (A(n)) {
			for (let e of t.registry.triggers.values()) if (e.node === n) {
				if (t.provider.opts.skipDelayDuration.current > 0) {
					z(this.#n, !1);
					return;
				}
				t.handleClose(), z(this.#n, !1);
				return;
			}
		}
		t.onTriggerLeave(), z(this.#n, !1);
	};
	#_ = (e) => {
		let t = this.#o();
		t && (this.#e.current || this.#t !== "touch" && (this.#s() ? t.opts.open.current && t.handleClose() : (!t.ignoreNonKeyboardFocus || Ve(e.currentTarget)) && (t.setActiveTrigger(this.opts.id.current), t.openedViaFocus = !0, t.handleOpen(), t.provider.ignoreFocusScroll())));
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
	#b = B(() => {
		let e = this.#o(), t = !!(e?.opts.open.current && e.isActiveTrigger(this.opts.id.current)), n = this.#s();
		return {
			id: this.opts.id.current,
			"aria-describedby": t ? e?.contentNode?.id : void 0,
			"data-state": t ? e?.stateAttr : "closed",
			"data-disabled": ie(n),
			"data-delay-duration": `${e?.delayDuration ?? 0}`,
			[_r.trigger]: "",
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
		return N(this.#b);
	}
	set props(e) {
		z(this.#b, e);
	}
}, wr = class e {
	static create(t) {
		return new e(t, yr.get());
	}
	opts;
	root;
	attachment;
	constructor(e, t) {
		this.opts = e, this.root = t, this.attachment = ae(this.opts.ref, (e) => this.root.contentNode = e), new hr({
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
		T(e, this.root.triggerNode) && this.root.disableCloseOnTriggerClick ? e.preventDefault() : (this.opts.onInteractOutside.current(e), e.defaultPrevented || this.root.handleClose());
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
	#e = B(() => ({ open: this.root.opts.open.current }));
	get snippetProps() {
		return N(this.#e);
	}
	set snippetProps(e) {
		z(this.#e, e);
	}
	#t = B(() => ({
		id: this.opts.id.current,
		"data-state": this.root.stateAttr,
		"data-disabled": ie(this.root.disabled),
		...re(this.root.contentPresence.transitionStatus),
		style: { outline: "none" },
		[_r.content]: "",
		...this.attachment
	}));
	get props() {
		return N(this.#t);
	}
	set props(e) {
		z(this.#t, e);
	}
	popperProps = {
		onInteractOutside: this.onInteractOutside,
		onEscapeKeydown: this.onEscapeKeydown,
		onOpenAutoFocus: this.onOpenAutoFocus,
		onCloseAutoFocus: this.onCloseAutoFocus
	};
};
// ../vibebook/node_modules/bits-ui/dist/bits/tooltip/components/tooltip.svelte
function Tr(e, t) {
	W(t, !0);
	let n = q(t, "open", 15, !1), r = q(t, "triggerId", 15, null), i = q(t, "onOpenChange", 3, h), a = q(t, "onOpenChangeComplete", 3, h), o = Sr.create({
		open: Y(() => n(), (e) => {
			n(e), i()(e);
		}),
		triggerId: Y(() => r(), (e) => {
			r(e);
		}),
		delayDuration: Y(() => t.delayDuration),
		disableCloseOnTriggerClick: Y(() => t.disableCloseOnTriggerClick),
		disableHoverableContent: Y(() => t.disableHoverableContent),
		ignoreNonKeyboardFocus: Y(() => t.ignoreNonKeyboardFocus),
		disabled: Y(() => t.disabled),
		onOpenChangeComplete: Y(() => a()),
		tether: Y(() => t.tether)
	});
	qe(e, {
		tooltip: !0,
		children: (e, n) => {
			var r = u(), i = F(r);
			M(i, () => t.children ?? V, () => ({
				open: o.opts.open.current,
				triggerId: o.activeTriggerId,
				payload: o.activePayload
			})), D(e, r);
		},
		$$slots: { default: !0 }
	}), L();
}
// ../vibebook/node_modules/bits-ui/dist/bits/tooltip/components/tooltip-content.svelte
var Er = /* @__PURE__ */ new Set([
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
]), Dr = g("<div><div><!></div></div>");
function Or(e, t) {
	let r = S();
	W(t, !0);
	let i = q(t, "id", 19, () => l(r)), a = q(t, "ref", 15, null), o = q(t, "side", 3, "top"), s = q(t, "sideOffset", 3, 0), c = q(t, "align", 3, "center"), d = q(t, "avoidCollisions", 3, !0), f = q(t, "arrowPadding", 3, 0), p = q(t, "sticky", 3, "partial"), m = q(t, "hideWhenDetached", 3, !1), g = q(t, "collisionPadding", 3, 0), _ = q(t, "onInteractOutside", 3, h), v = q(t, "onEscapeKeydown", 3, h), y = q(t, "forceMount", 3, !1), b = fe(t, Er), x = wr.create({
		id: Y(() => i()),
		ref: Y(() => a(), (e) => a(e)),
		onInteractOutside: Y(() => _()),
		onEscapeKeydown: Y(() => v())
	}), C = B(() => ({
		side: o(),
		sideOffset: s(),
		align: c(),
		avoidCollisions: d(),
		arrowPadding: f(),
		sticky: p(),
		hideWhenDetached: m(),
		collisionPadding: g(),
		strategy: t.strategy,
		customAnchor: t.customAnchor ?? x.root.triggerNode
	})), w = B(() => O(b, N(C), x.props));
	var T = u(), E = F(T), k = (e) => {
		{
			let r = (e, r) => {
				let i = () => (r?.()).props, a = () => (r?.()).wrapperProps, o = B(() => O(a(), { style: { pointerEvents: x.root.disableHoverableContent ? "none" : void 0 } })), s = B(() => O(i(), { style: Ze("tooltip") }, { style: t.style }));
				var c = u(), l = F(c), d = (e) => {
					var n = u(), r = F(n);
					{
						let e = B(() => ({
							props: N(s),
							wrapperProps: N(o),
							...x.snippetProps
						}));
						M(r, () => t.child, () => N(e));
					}
					D(e, n);
				}, f = (e) => {
					var n = Dr();
					Fe(n, () => ({ ...N(o) }));
					var r = I(n);
					Fe(r, () => ({ ...N(s) }));
					var i = I(r);
					M(i, () => t.children ?? V), R(r), R(n), D(e, n);
				};
				n(l, (e) => {
					t.child ? e(d) : e(f, -1);
				}), D(e, c);
			}, a = B(() => x.root.disableHoverableContent ? "none" : "auto");
			dr(e, H(() => N(w), () => x.popperProps, {
				get enabled() {
					return x.root.opts.open.current;
				},
				get id() {
					return i();
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
					return N(a);
				},
				popper: r,
				$$slots: { popper: !0 }
			}));
		}
	}, A = (e) => {
		{
			let r = (e, r) => {
				let i = () => (r?.()).props, a = () => (r?.()).wrapperProps, o = B(() => O(a(), { style: { pointerEvents: x.root.disableHoverableContent ? "none" : void 0 } })), s = B(() => O(i(), { style: Ze("tooltip") }, { style: t.style }));
				var c = u(), l = F(c), d = (e) => {
					var n = u(), r = F(n);
					{
						let e = B(() => ({
							props: N(s),
							wrapperProps: N(o),
							...x.snippetProps
						}));
						M(r, () => t.child, () => N(e));
					}
					D(e, n);
				}, f = (e) => {
					var n = Dr();
					Fe(n, () => ({ ...N(o) }));
					var r = I(n);
					Fe(r, () => ({ ...N(s) }));
					var i = I(r);
					M(i, () => t.children ?? V), R(r), R(n), D(e, n);
				};
				n(l, (e) => {
					t.child ? e(d) : e(f, -1);
				}), D(e, c);
			}, a = B(() => x.root.disableHoverableContent ? "none" : "auto");
			lr(e, H(() => N(w), () => x.popperProps, {
				get open() {
					return x.root.opts.open.current;
				},
				get id() {
					return i();
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
					return N(a);
				},
				popper: r,
				$$slots: { popper: !0 }
			}));
		}
	};
	n(E, (e) => {
		y() ? e(k) : y() || e(A, 1);
	}), D(e, T), L();
}
// ../vibebook/node_modules/bits-ui/dist/bits/tooltip/components/tooltip-trigger.svelte
var kr = /* @__PURE__ */ new Set([
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
]), Ar = g("<button><!></button>");
function jr(e, t) {
	let r = S();
	W(t, !0);
	let i = q(t, "id", 19, () => l(r)), a = q(t, "disabled", 3, !1), o = q(t, "type", 3, "button"), s = q(t, "tabindex", 3, 0), c = q(t, "ref", 15, null), d = fe(t, kr), f = Cr.create({
		id: Y(() => i()),
		disabled: Y(() => a() ?? !1),
		tabindex: Y(() => s() ?? 0),
		payload: Y(() => t.payload),
		tether: Y(() => t.tether),
		ref: Y(() => c(), (e) => c(e))
	}), p = B(() => O(d, f.props, { type: o() }));
	var m = u(), h = F(m), g = (e) => {
		var n = u(), r = F(n);
		M(r, () => t.child, () => ({ props: N(p) })), D(e, n);
	}, _ = (e) => {
		var n = Ar();
		Fe(n, () => ({ ...N(p) }));
		var r = I(n);
		M(r, () => t.children ?? V), R(n), D(e, n);
	};
	n(h, (e) => {
		t.child ? e(g) : e(_, -1);
	}), D(e, m), L();
}
// ../vibebook/node_modules/bits-ui/dist/bits/tooltip/components/tooltip-provider.svelte
function Mr(e, t) {
	W(t, !0);
	let n = q(t, "delayDuration", 3, 700), r = q(t, "disableCloseOnTriggerClick", 3, !1), i = q(t, "disableHoverableContent", 3, !1), a = q(t, "disabled", 3, !1), o = q(t, "ignoreNonKeyboardFocus", 3, !1), s = q(t, "skipDelayDuration", 3, 300);
	xr.create({
		delayDuration: Y(() => n()),
		disableCloseOnTriggerClick: Y(() => r()),
		disableHoverableContent: Y(() => i()),
		disabled: Y(() => a()),
		ignoreNonKeyboardFocus: Y(() => o()),
		skipDelayDuration: Y(() => s())
	});
	var c = u(), l = F(c);
	M(l, () => t.children ?? V), D(e, c), L();
}
// svelte/lib/ui/RadioGroup.svelte
var Nr = g("<span aria-hidden=\"true\" class=\"tw:pointer-events-none tw:absolute tw:inset-1 tw:rounded-full tw:bg-primary\"></span>"), Pr = g("<label class=\"tw:flex tw:items-center tw:gap-2\"><span class=\"tw:relative tw:inline-flex tw:size-4 tw:shrink-0\"><input type=\"radio\" class=\"tw:m-0 tw:size-4 tw:appearance-none tw:rounded-full tw:border tw:border-input tw:bg-card tw:p-0 tw:outline-none tw:checked:border-primary tw:focus-visible:ring-2 tw:focus-visible:ring-ring tw:focus-visible:ring-offset-2 tw:focus-visible:ring-offset-background tw:disabled:opacity-50\"/> <!></span> <span> </span></label>"), Fr = g("<div role=\"radiogroup\"></div>");
function Ir(e, t) {
	let r = S();
	W(t, !0);
	let a = [], o = q(t, "value", 15, ""), c = q(t, "name", 3, r), l = q(t, "disabled", 3, !1);
	var u = Fr();
	s(u, 21, () => t.items, (e) => e.value, (e, r) => {
		var s = Pr(), u = I(s), d = I(u);
		Be(d);
		var f, p = k(d, 2), m = (e) => {
			var t = Nr();
			D(e, t);
		};
		n(p, (e) => {
			o() === N(r).value && e(m);
		}), R(u);
		var h = k(u, 2), g = ce(h, !0);
		R(s), b(() => {
			ue(d, "name", c()), d.disabled = l() || N(r).disabled, f !== (f = N(r).value) && (d.value = (d.__value = f) ?? ""), C(g, N(r).label);
		}), i("change", d, () => t.onValueChange?.(N(r).value)), le(a, [], d, () => (N(r).value, o()), o), D(e, s);
	}), R(u), b((e) => {
		ue(u, "aria-label", t.label), Re(u, 1, e);
	}, [() => te(ve("tw:grid tw:grid-cols-1 tw:gap-2 tw:font-sans tw:text-sm tw:text-foreground", t.class))]), D(e, u), L();
}
He(["change"]);
// svelte/lib/ui/Tooltip.svelte
var Lr = g("<!> <!>", 1);
function Rr(e, t) {
	W(t, !0);
	var n = u(), r = F(n);
	Le(r, () => Mr, (e, n) => {
		n(e, {
			delayDuration: 250,
			children: (e, n) => {
				var r = u(), i = F(r);
				Le(i, () => Tr, (e, n) => {
					n(e, {
						children: (e, n) => {
							var r = Lr(), i = F(r);
							{
								let e = B(() => Pe({
									variant: "ghost",
									size: "icon"
								}));
								Le(i, () => jr, (n, r) => {
									r(n, {
										type: "button",
										get "aria-label"() {
											return t.label;
										},
										get class() {
											return N(e);
										},
										children: (e, n) => {
											var r = u(), i = F(r);
											M(i, () => t.children), D(e, r);
										},
										$$slots: { default: !0 }
									});
								});
							}
							var a = k(i, 2);
							Le(a, () => be, (e, n) => {
								n(e, {
									children: (e, n) => {
										var r = u(), i = F(r);
										Le(i, () => Or, (e, n) => {
											n(e, {
												"data-vb-native": !0,
												sideOffset: 6,
												class: "tw:z-50 tw:m-0 tw:box-border tw:max-w-xs tw:rounded-control tw:border tw:border-solid tw:border-border tw:bg-popover tw:px-3 tw:py-1.5 tw:font-sans tw:text-xs tw:leading-4 tw:text-popover-foreground tw:shadow-md",
												children: (e, n) => {
													K();
													var r = j();
													b(() => C(r, t.label)), D(e, r);
												},
												$$slots: { default: !0 }
											});
										}), D(e, r);
									},
									$$slots: { default: !0 }
								});
							}), D(e, r);
						},
						$$slots: { default: !0 }
					});
				}), D(e, r);
			},
			$$slots: { default: !0 }
		});
	}), D(e, n), L();
}
// svelte/lib/ui/Separator.svelte
var zr = g("<div role=\"separator\"></div>");
function Br(e, t) {
	W(t, !0);
	let n = q(t, "vertical", 3, !1);
	var r = zr();
	b((e) => {
		ue(r, "aria-orientation", n() ? "vertical" : "horizontal"), Re(r, 1, e);
	}, [() => te(ve("tw:shrink-0 tw:bg-border", n() ? "tw:h-full tw:w-px" : "tw:h-px tw:w-full", t.class))]), D(e, r), L();
}
// svelte/lib/ui/Skeleton.svelte
var Vr = g("<div aria-hidden=\"true\"></div>");
function Hr(e, t) {
	W(t, !0);
	var n = Vr();
	b((e) => Re(n, 1, e), [() => te(ve("tw:animate-pulse tw:rounded-control tw:bg-muted tw:motion-reduce:animate-none", t.class))]), D(e, n), L();
}
// svelte/lib/components/LoadingState.svelte
var Ur = g("<div role=\"status\" class=\"tw:inline-flex tw:items-center tw:gap-2 tw:font-sans tw:text-sm tw:text-muted-foreground\"><span aria-hidden=\"true\" class=\"tw:size-4 tw:animate-spin tw:rounded-full tw:border-2 tw:border-current tw:border-r-transparent tw:motion-reduce:animate-none\"></span> </div>");
function Wr(e, t) {
	var n = Ur(), r = k(I(n), 1, !0);
	R(n), b(() => C(r, t.label)), D(e, n);
}
// svelte/gallery/Gallery.svelte
var Gr = g("<div class=\"tw:flex tw:flex-wrap tw:gap-2\"></div> <div class=\"tw:flex tw:flex-wrap tw:items-center tw:gap-2\"><!><!><!><!><!></div> <p class=\"tw:m-0 tw:text-xs tw:text-muted-foreground\"> </p>", 1), Kr = g("<!> <!> <!> <!>", 1), qr = g("<div class=\"tw:flex tw:items-center tw:gap-2\"><!><label for=\"gallery-checkbox\">Include archived rooms</label></div> <div class=\"tw:flex tw:items-center tw:gap-2\"><!><label for=\"gallery-switch\">Notifications</label></div> <!> <!> <output data-selection-state=\"\" class=\"tw:block tw:text-xs tw:text-muted-foreground\" aria-live=\"polite\"> </output>", 1), Jr = g("<!><!>", 1), Yr = g("<p class=\"tw:m-0 tw:text-muted-foreground\">The same dialog primitives support mobile and desktop layouts.</p> <!>", 1), Xr = g("<p class=\"tw:m-0 tw:rounded-control tw:border tw:border-border tw:p-3\"> </p>"), Zr = g("<div class=\"tw:flex tw:flex-wrap tw:gap-2\"><!> <!></div> <!>", 1), Qr = g("<div class=\"tw:flex tw:items-center tw:gap-3\"><!><!><!><span class=\"tw:text-muted-foreground\">Images and initials share one frame.</span></div> <!> <div class=\"tw:flex tw:flex-wrap tw:gap-2\"><!><!><!><!><!></div> <div class=\"tw:flex tw:items-center tw:gap-3\"><!> <div class=\"tw:flex-1 tw:space-y-2\"><!><!></div></div>", 1), $r = g("<h3 class=\"tw:m-0 tw:font-sans tw:text-xl tw:font-semibold tw:leading-7 tw:tracking-tight\">Inter variable — headings and UI</h3> <p class=\"tw:m-0 tw:text-sm tw:leading-5\">Body 400 · medium 500 · semibold 500 · bold 600. English and\n          Portuguese: Olá, colaboração, ações.</p> <p class=\"tw:m-0 tw:text-muted-foreground\">Muted text uses the Studio semantic role.</p> <pre class=\"tw:m-0 tw:overflow-auto tw:rounded-control tw:border tw:border-border tw:bg-muted tw:p-3 tw:font-mono tw:text-sm tw:leading-6\"><code>const room = \"fully typed\";</code></pre>", 1), ei = g("<main data-vb-native=\"\" class=\"tw:m-0 tw:box-border tw:min-h-dvh tw:bg-background tw:px-4 tw:py-8 tw:font-sans tw:text-sm tw:font-normal tw:leading-5 tw:text-foreground tw:sm:px-8\" data-gallery=\"\"><div class=\"tw:mx-auto tw:max-w-6xl tw:space-y-6\"><header class=\"tw:flex tw:flex-wrap tw:items-start tw:justify-between tw:gap-4\"><div class=\"tw:space-y-2\"><a href=\"/app?ui=svelte\" class=\"tw:text-sm tw:text-link tw:underline-offset-4 tw:hover:underline\">vibebook</a> <h1 class=\"tw:m-0 tw:font-sans tw:text-2xl tw:font-semibold tw:leading-8 tw:tracking-tight\">Component gallery</h1> <p class=\"tw:m-0 tw:text-muted-foreground\">Shared primitives, Studio tokens, and one Tailwind entry.</p></div> <div class=\"tw:flex tw:items-center tw:gap-2\"><!><!></div></header> <div class=\"tw:grid tw:grid-cols-1 tw:gap-5 tw:md:grid-cols-2\"><!> <!> <!> <!> <!> <!> <!> <!></div> <p role=\"status\" class=\"tw:min-h-5 tw:text-sm tw:text-muted-foreground\"> </p></div></main>");
function ti(e, t) {
	W(t, !0);
	let n = J("light"), r = J(""), i = J(""), a = J(!1), o = J(!1), c = J("room"), l = J("general"), u = J("all"), d = J(0), f = J("");
	G(() => {
		document.documentElement.dataset.theme = N(n);
	});
	let p = [
		"primary",
		"secondary",
		"outline",
		"ghost",
		"destructive",
		"link"
	];
	var m = ei(), h = I(m), g = I(h), _ = k(I(g), 2), v = I(_);
	{
		let e = B(() => N(n) === "light" ? "Use dark theme" : "Use light theme"), t = B(() => N(n) === "light" ? "moon" : "sun");
		De(v, {
			get label() {
				return N(e);
			},
			get icon() {
				return N(t);
			},
			variant: "outline",
			onclick: () => z(n, N(n) === "light" ? "dark" : "light", !0)
		});
	}
	var y = k(v);
	Te(y, {
		children: (e, t) => {
			K();
			var r = j();
			b(() => C(r, N(n))), D(e, r);
		},
		$$slots: { default: !0 }
	}), R(_), R(g);
	var x = k(g, 2), S = I(x);
	ke(S, {
		title: "Actions",
		description: "Variants share focus, disabled and loading behavior.",
		children: (e, t) => {
			var n = Gr(), r = F(n);
			s(r, 21, () => p, E, (e, t) => {
				Se(e, {
					get variant() {
						return N(t);
					},
					onclick: () => {
						z(d, N(d) + 1), z(f, `${N(t)} activated`);
					},
					children: (e, n) => {
						K();
						var r = j();
						b(() => C(r, N(t))), D(e, r);
					},
					$$slots: { default: !0 }
				});
			}), R(r);
			var i = k(r, 2), a = I(i);
			Se(a, {
				disabled: !0,
				children: (e, t) => {
					K();
					var n = j("Disabled");
					D(e, n);
				},
				$$slots: { default: !0 }
			});
			var o = k(a);
			Se(o, {
				loading: !0,
				children: (e, t) => {
					K();
					var n = j("Saving");
					D(e, n);
				},
				$$slots: { default: !0 }
			});
			var c = k(o);
			Se(c, {
				size: "sm",
				variant: "outline",
				children: (e, t) => {
					K();
					var n = j("Small");
					D(e, n);
				},
				$$slots: { default: !0 }
			});
			var l = k(c);
			De(l, {
				label: "Add item",
				icon: "plus",
				onclick: () => z(d, N(d) + 1)
			}), Rr(k(l), {
				label: "Search rooms",
				children: (e, t) => {
					ze(e, { name: "search" });
				},
				$$slots: { default: !0 }
			}), R(i);
			var u = k(i, 2), m = ce(u);
			b(() => C(m, `Actions: ${N(d) ?? ""}`)), D(e, n);
		},
		$$slots: { default: !0 }
	});
	var w = k(S, 2);
	ke(w, {
		title: "Fields",
		description: "Labels, hints and errors have explicit associations.",
		children: (e, t) => {
			var n = Kr(), a = F(n);
			_e(a, {
				id: "gallery-title",
				label: "Room name",
				hint: "Choose a name your team recognizes.",
				children: (e, t = V) => {
					xe(e, H(t, {
						placeholder: "Project room",
						get value() {
							return N(r);
						},
						set value(e) {
							z(r, e, !0);
						}
					}));
				},
				$$slots: { default: !0 }
			});
			var o = k(a, 2);
			_e(o, {
				id: "gallery-email",
				label: "Email",
				error: "Enter a valid email address.",
				children: (e, t = V) => {
					xe(e, H(t, {
						type: "email",
						value: "invalid"
					}));
				},
				$$slots: { default: !0 }
			});
			var s = k(o, 2);
			_e(s, {
				id: "gallery-notes",
				label: "Notes",
				children: (e, t = V) => {
					Me(e, H(t, {
						placeholder: "Write a note",
						get value() {
							return N(i);
						},
						set value(e) {
							z(i, e, !0);
						}
					}));
				},
				$$slots: { default: !0 }
			});
			var c = k(s, 2);
			_e(c, {
				id: "gallery-disabled",
				label: "Unavailable",
				children: (e, t = V) => {
					xe(e, H(t, {
						disabled: !0,
						value: "Disabled input"
					}));
				},
				$$slots: { default: !0 }
			}), D(e, n);
		},
		$$slots: { default: !0 }
	});
	var T = k(w, 2);
	ke(T, {
		title: "Selection",
		description: "Keyboard controls use native semantics or Bits UI behavior.",
		children: (e, t) => {
			var n = qr(), r = F(n), i = I(r);
			je(i, {
				id: "gallery-checkbox",
				get checked() {
					return N(a);
				},
				set checked(e) {
					z(a, e, !0);
				}
			}), K(), R(r);
			var s = k(r, 2), l = I(s);
			Ce(l, {
				id: "gallery-switch",
				get checked() {
					return N(o);
				},
				set checked(e) {
					z(o, e, !0);
				}
			}), K(), R(s);
			var d = k(s, 2);
			Ir(d, {
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
					return N(c);
				},
				set value(e) {
					z(c, e, !0);
				}
			});
			var f = k(d, 2);
			_e(f, {
				id: "gallery-filter",
				label: "Show",
				children: (e, t = V) => {
					de(e, H(t, {
						items: [{
							value: "all",
							label: "All rooms"
						}, {
							value: "active",
							label: "Active rooms"
						}],
						get value() {
							return N(u);
						},
						set value(e) {
							z(u, e, !0);
						}
					}));
				},
				$$slots: { default: !0 }
			});
			var p = k(f, 2), m = ce(p);
			b(() => C(m, `${N(c) ?? ""} · ${N(u) ?? ""}`)), D(e, n);
		},
		$$slots: { default: !0 }
	});
	var O = k(T, 2);
	ke(O, {
		title: "Overlays",
		description: "Focus trap, Escape dismissal and focus restoration are provided by Bits UI.",
		children: (e, t) => {
			var n = Zr(), i = F(n), a = I(i);
			ge(a, {
				title: "Edit room",
				description: "Changes apply to the current room.",
				closeLabel: "Close dialog",
				trigger: (e) => {
					K();
					var t = j("Open dialog");
					D(e, t);
				},
				children: (e) => {
					var t = Jr(), n = F(t);
					_e(n, {
						id: "dialog-name",
						label: "Name",
						children: (e, t = V) => {
							xe(e, H(t, {
								get value() {
									return N(r);
								},
								set value(e) {
									z(r, e, !0);
								}
							}));
						},
						$$slots: { default: !0 }
					});
					var i = k(n);
					Se(i, {
						onclick: () => z(f, "Dialog action completed"),
						children: (e, t) => {
							K();
							var n = j("Save name");
							D(e, n);
						},
						$$slots: { default: !0 }
					}), D(e, t);
				},
				$$slots: {
					trigger: !0,
					default: !0
				}
			});
			var o = k(a, 2);
			ge(o, {
				title: "Room details",
				description: "A responsive sheet shares the dialog behavior.",
				closeLabel: "Close sheet",
				sheet: !0,
				trigger: (e) => {
					K();
					var t = j("Open sheet");
					D(e, t);
				},
				children: (e) => {
					var t = Yr(), n = k(F(t), 2);
					xe(n, {
						"aria-label": "Sheet note",
						placeholder: "Add a note"
					}), D(e, t);
				},
				$$slots: {
					trigger: !0,
					default: !0
				}
			}), R(i);
			var s = k(i, 2);
			he(s, {
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
					return N(l);
				},
				set value(e) {
					z(l, e, !0);
				},
				children: (e, t = V) => {
					var n = Xr(), r = ce(n, !0);
					b(() => C(r, t() === "general" ? "General settings" : "Room members")), D(e, n);
				},
				$$slots: { default: !0 }
			}), D(e, n);
		},
		$$slots: { default: !0 }
	});
	var A = k(O, 2);
	ke(A, {
		title: "Identity and feedback",
		children: (e, t) => {
			var n = Qr(), r = F(n), i = I(r);
			Ae(i, { name: "Gimenes" });
			var a = k(i);
			Ae(a, { name: "Guilherme Rodrigues" });
			var o = k(a);
			Ae(o, {
				name: "Sample user",
				src: "/favicon.svg"
			}), K(), R(r);
			var s = k(r, 2);
			Br(s, {});
			var c = k(s, 2), l = I(c);
			Te(l, {
				children: (e, t) => {
					K();
					var n = j("Default");
					D(e, n);
				},
				$$slots: { default: !0 }
			});
			var u = k(l);
			Te(u, {
				variant: "primary",
				children: (e, t) => {
					K();
					var n = j("Selected");
					D(e, n);
				},
				$$slots: { default: !0 }
			});
			var d = k(u);
			Te(d, {
				variant: "success",
				children: (e, t) => {
					K();
					var n = j("Complete");
					D(e, n);
				},
				$$slots: { default: !0 }
			});
			var f = k(d);
			Te(f, {
				variant: "warning",
				children: (e, t) => {
					K();
					var n = j("Waiting");
					D(e, n);
				},
				$$slots: { default: !0 }
			});
			var p = k(f);
			Te(p, {
				variant: "destructive",
				children: (e, t) => {
					K();
					var n = j("Failed");
					D(e, n);
				},
				$$slots: { default: !0 }
			}), R(c);
			var m = k(c, 2), h = I(m);
			Hr(h, { class: "tw:size-9 tw:rounded-full" });
			var g = k(h, 2), _ = I(g);
			Hr(_, { class: "tw:h-3 tw:w-3/4" }), Hr(k(_), { class: "tw:h-3 tw:w-1/2" }), R(g), R(m), D(e, n);
		},
		$$slots: { default: !0 }
	});
	var ee = k(A, 2);
	ke(ee, {
		title: "Empty states",
		children: (e, t) => {
			pe(e, {
				title: "Nothing waiting for you",
				description: "New requests and tasks in review will appear here.",
				children: (e, t) => {
					Se(e, {
						variant: "outline",
						onclick: () => z(f, "Empty state action completed"),
						children: (e, t) => {
							K();
							var n = j("Explore rooms");
							D(e, n);
						},
						$$slots: { default: !0 }
					});
				},
				$$slots: { default: !0 }
			});
		},
		$$slots: { default: !0 }
	});
	var te = k(ee, 2);
	ke(te, {
		title: "Status feedback",
		children: (e, t) => {
			var n = Jr(), r = F(n);
			Wr(r, { label: "Saving changes" });
			var i = k(r);
			Ne(i, {
				title: "Could not save changes",
				description: "Your draft is still available.",
				retryLabel: "Try again",
				onretry: () => z(f, "Retry requested")
			}), D(e, n);
		},
		$$slots: { default: !0 }
	});
	var ne = k(te, 2);
	ke(ne, {
		title: "Typography",
		class: "tw:md:col-span-2",
		children: (e, t) => {
			var n = $r();
			K(6), D(e, n);
		},
		$$slots: { default: !0 }
	}), R(x);
	var M = k(x, 2), re = ce(M, !0);
	R(h), R(m), b(() => C(re, N(f))), D(e, m), L();
}
// svelte/gallery/main.ts
function ni(e) {
	let t = ye(ti, { target: e });
	return () => w(t);
}
export { ni as mountGallery };
