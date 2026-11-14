import { B as e, D as t, F as n, L as r, U as i, V as a, W as o, a as s, g as c, i as l, j as u, n as d, o as f, s as p, z as m } from "./Button-Cx7HMFHY.js";
import { A as h, An as g, Et as _, F as v, Tt as y, Yt as b, j as x, lt as S, q as C, qt as w, u as T, z as E } from "./shared-qe__81Sz.js";
import { t as D } from "./Icon-Ch3wLUmI.js";
import { R as O, j as k, n as A, t as j } from "./create-id-nQNd5Mh2.js";
import { _ as M, c as N, d as P, f as F, g as I, h as L, i as R, l as z, n as B, o as V, r as H, s as U, t as W, v as G } from "./dialogController-COywv7ZD.js";
// node_modules/bits-ui/dist/bits/dialog/components/dialog-trigger.svelte
var K = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"ref",
	"children",
	"child",
	"disabled"
]), q = a("<button><!></button>");
function J(t, r) {
	let a = i();
	_(r, !0);
	let o = s(r, "id", 19, () => j(a)), l = s(r, "ref", 15, null), d = s(r, "disabled", 3, !1), p = f(r, K), h = G.create({
		id: O(() => o()),
		ref: O(() => l(), (e) => l(e)),
		disabled: O(() => !!d())
	}), x = S(() => k(p, h.props));
	var C = e(), w = E(C), D = (t) => {
		var i = e(), a = E(i);
		n(a, () => r.child, () => ({ props: T(x) })), m(t, i);
	}, A = (e) => {
		var t = q();
		c(t, () => ({ ...T(x) }));
		var i = v(t);
		n(i, () => r.children ?? g), b(t), m(e, t);
	};
	u(w, (e) => {
		r.child ? e(D) : e(A, -1);
	}), m(t, C), y();
}
// node_modules/bits-ui/dist/bits/dialog/components/dialog.svelte
function Y(t, r) {
	_(r, !0);
	let i = s(r, "open", 15, !1), a = s(r, "onOpenChange", 3, A), o = s(r, "onOpenChangeComplete", 3, A);
	M.create({
		variant: O(() => "dialog"),
		open: O(() => i(), (e) => {
			i(e), a()(e);
		}),
		onOpenChangeComplete: O(() => o())
	});
	var c = e(), l = E(c);
	n(l, () => r.children ?? g), m(t, c), y();
}
// node_modules/bits-ui/dist/bits/dialog/components/dialog-close.svelte
var X = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"children",
	"child",
	"id",
	"ref",
	"disabled"
]), Z = a("<button><!></button>");
function ee(t, r) {
	let a = i();
	_(r, !0);
	let o = s(r, "id", 19, () => j(a)), l = s(r, "ref", 15, null), d = s(r, "disabled", 3, !1), p = f(r, X), h = L.create({
		variant: O(() => "close"),
		id: O(() => o()),
		ref: O(() => l(), (e) => l(e)),
		disabled: O(() => !!d())
	}), x = S(() => k(p, h.props));
	var C = e(), w = E(C), D = (t) => {
		var i = e(), a = E(i);
		n(a, () => r.child, () => ({ props: T(x) })), m(t, i);
	}, A = (e) => {
		var t = Z();
		c(t, () => ({ ...T(x) }));
		var i = v(t);
		n(i, () => r.children ?? g), b(t), m(e, t);
	};
	u(w, (e) => {
		r.child ? e(D) : e(A, -1);
	}), m(t, C), y();
}
// node_modules/bits-ui/dist/bits/dialog/components/dialog-content.svelte
var te = /* @__PURE__ */ new Set([
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
]), ne = a("<!> <!>", 1), re = a("<!> <div><!></div>", 1);
function Q(t, r) {
	let a = i();
	_(r, !0);
	let o = s(r, "id", 19, () => j(a)), l = s(r, "ref", 15, null), d = s(r, "forceMount", 3, !1), h = s(r, "onCloseAutoFocus", 3, A), x = s(r, "onOpenAutoFocus", 3, A), w = s(r, "onEscapeKeydown", 3, A), D = s(r, "onInteractOutside", 3, A), M = s(r, "trapFocus", 3, !0), P = s(r, "preventScroll", 3, !0), F = s(r, "preventOverflowTextSelection", 3, !0), L = s(r, "restoreScrollDelay", 3, null), B = s(r, "preventBodyPointerEvents", 3, !0), H = f(r, te), W = I.create({
		id: O(() => o()),
		ref: O(() => l(), (e) => l(e))
	}), G = () => B() || !W.root.overlayNode, K = S(() => k(H, W.props));
	var q = e(), J = E(q), Y = (t) => {
		U(t, {
			get ref() {
				return W.opts.ref;
			},
			loop: !0,
			get trapFocus() {
				return M();
			},
			get enabled() {
				return W.root.opts.open.current;
			},
			get onOpenAutoFocus() {
				return x();
			},
			get onCloseAutoFocus() {
				return h();
			},
			focusScope: (t, i) => {
				let a = () => (i?.()).props;
				N(t, p(() => T(K), {
					get enabled() {
						return W.root.opts.open.current;
					},
					get ref() {
						return W.opts.ref;
					},
					onEscapeKeydown: (e) => {
						w()(e), e.defaultPrevented || W.root.handleClose();
					},
					children: (t, i) => {
						z(t, p(() => T(K), {
							get ref() {
								return W.opts.ref;
							},
							get enabled() {
								return W.root.opts.open.current;
							},
							onInteractOutside: (e) => {
								D()(e), e.defaultPrevented || W.root.handleClose();
							},
							children: (t, i) => {
								V(t, p(() => T(K), {
									get preventOverflowTextSelection() {
										return F();
									},
									get ref() {
										return W.opts.ref;
									},
									get enabled() {
										return W.root.opts.open.current;
									},
									children: (t, i) => {
										var o = e(), s = E(o), l = (e) => {
											var t = ne(), i = E(t), o = (e) => {
												R(e, {
													get preventScroll() {
														return P();
													},
													get restoreScrollDelay() {
														return L();
													},
													blockPointer: G
												});
											};
											u(i, (e) => {
												W.root.opts.open.current && e(o);
											});
											var s = C(i, 2);
											{
												let e = S(() => ({
													props: k(T(K), a()),
													...W.snippetProps
												}));
												n(s, () => r.child, () => T(e));
											}
											m(e, t);
										}, d = (e) => {
											var t = re(), i = E(t);
											R(i, {
												get preventScroll() {
													return P();
												},
												blockPointer: G
											});
											var o = C(i, 2);
											c(o, (e) => ({ ...e }), [() => k(T(K), a())]);
											var s = v(o);
											n(s, () => r.children ?? g), b(o), m(e, t);
										};
										u(s, (e) => {
											r.child ? e(l) : e(d, -1);
										}), m(t, o);
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
	u(J, (e) => {
		(W.shouldRender || d()) && e(Y);
	}), m(t, q), y();
}
// svelte/lib/ui/Dialog.svelte
var ie = a("<div class=\"tw:flex tw:items-start tw:gap-3\"><div class=\"tw:min-w-0 tw:flex-1 tw:space-y-1\"><!> <!></div> <!></div> <!>", 1), $ = a("<!> <!>", 1);
function ae(i, a) {
	_(a, !0);
	let c = s(a, "open", 15, !1), f = s(a, "sheet", 3, !1), p = s(a, "fullScreen", 3, !1);
	x(() => {
		if (c()) return W(() => {
			c(!1), a.onOpenChange?.(!1);
		});
	});
	var g = e(), O = E(g);
	t(O, () => Y, (i, s) => {
		s(i, {
			get onOpenChange() {
				return a.onOpenChange;
			},
			get open() {
				return c();
			},
			set open(e) {
				c(e);
			},
			children: (i, s) => {
				var c = $(), g = E(c), _ = (r) => {
					var i = e(), o = E(i);
					{
						let r = S(() => d({ variant: "outline" }));
						t(o, () => J, (t, i) => {
							i(t, {
								type: "button",
								get class() {
									return T(r);
								},
								children: (t, r) => {
									var i = e(), o = E(i);
									n(o, () => a.trigger), m(t, i);
								},
								$$slots: { default: !0 }
							});
						});
					}
					m(r, i);
				};
				u(g, (e) => {
					a.trigger && e(_);
				});
				var y = C(g, 2);
				t(y, () => P, (i, s) => {
					s(i, {
						children: (i, s) => {
							var c = $(), g = E(c);
							t(g, () => H, (e, t) => {
								t(e, {
									"data-vb-native": !0,
									class: "tw:fixed tw:inset-0 tw:z-40 tw:m-0 tw:box-border tw:bg-scrim"
								});
							});
							var _ = C(g, 2);
							{
								let i = S(() => l("tw:fixed tw:z-50 tw:m-0 tw:box-border tw:flex tw:max-h-[90dvh] tw:flex-col tw:gap-4 tw:overflow-auto tw:border tw:border-solid tw:border-border tw:bg-card tw:p-6 tw:font-sans tw:text-sm tw:text-card-foreground tw:shadow-lg tw:outline-none", p() ? "tw:inset-2 tw:max-h-none tw:rounded-surface" : f() ? "tw:inset-x-0 tw:bottom-0 tw:rounded-t-surface tw:sm:inset-y-0 tw:sm:left-auto tw:sm:right-0 tw:sm:max-h-none tw:sm:w-96 tw:sm:rounded-none" : "tw:left-1/2 tw:top-1/2 tw:w-[calc(100%-2rem)] tw:max-w-lg tw:-translate-x-1/2 tw:-translate-y-1/2 tw:rounded-surface"));
								t(_, () => Q, (s, c) => {
									c(s, {
										"data-vb-native": !0,
										onOpenAutoFocus: (e) => {
											let t = a.initialFocus?.();
											t && (e.preventDefault(), t.focus());
										},
										onCloseAutoFocus: (e) => {
											let t = a.returnFocus?.();
											t?.isConnected && (e.preventDefault(), t.focus());
										},
										preventScroll: !1,
										preventBodyPointerEvents: !1,
										preventOverflowTextSelection: !1,
										get class() {
											return T(i);
										},
										children: (i, s) => {
											var c = ie(), l = E(c), f = v(l), p = v(f);
											t(p, () => F, (e, t) => {
												t(e, {
													class: "tw:m-0 tw:font-sans tw:text-lg tw:font-semibold tw:leading-6 tw:tracking-tight",
													children: (e, t) => {
														w();
														var n = o();
														h(() => r(n, a.title)), m(e, n);
													},
													$$slots: { default: !0 }
												});
											});
											var g = C(p, 2), _ = (n) => {
												var i = e(), s = E(i);
												t(s, () => B, (e, t) => {
													t(e, {
														class: "tw:m-0 tw:text-sm tw:leading-5 tw:text-muted-foreground",
														children: (e, t) => {
															w();
															var n = o();
															h(() => r(n, a.description)), m(e, n);
														},
														$$slots: { default: !0 }
													});
												}), m(n, i);
											};
											u(g, (e) => {
												a.description && e(_);
											}), b(f);
											var y = C(f, 2);
											{
												let e = S(() => d({
													variant: "ghost",
													size: "icon"
												}));
												t(y, () => ee, (t, n) => {
													n(t, {
														type: "button",
														get "aria-label"() {
															return a.closeLabel;
														},
														get class() {
															return T(e);
														},
														children: (e, t) => {
															D(e, { name: "close" });
														},
														$$slots: { default: !0 }
													});
												});
											}
											b(l);
											var x = C(l, 2);
											n(x, () => a.children), m(i, c);
										},
										$$slots: { default: !0 }
									});
								});
							}
							m(i, c);
						},
						$$slots: { default: !0 }
					});
				}), m(i, c);
			},
			$$slots: { default: !0 }
		});
	}), m(i, g), y();
}
export { Q as n, Y as r, ae as t };
