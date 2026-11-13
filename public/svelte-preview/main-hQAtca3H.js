import { $ as e, $t as t, A as n, At as r, Bt as i, C as a, Ct as o, D as s, Dt as c, E as l, Et as u, F as d, Ft as f, Gt as p, Ht as m, I as h, It as g, Jt as _, Kt as v, L as y, Lt as b, M as x, Mt as S, N as C, Nt as w, O as T, Ot as E, P as ee, Pt as te, Qt as D, Rt as ne, S as O, St as re, T as k, Tt as A, Vt as ie, Wt as j, Xt as M, Zt as N, _ as ae, _t as oe, a as se, an as P, at as ce, b as le, c as ue, cn as F, ct as I, d as de, dn as fe, dt as pe, en as me, f as he, ft as ge, g as _e, gt as ve, h as L, ht as ye, i as be, in as xe, it as Se, j as Ce, jt as R, kt as we, l as Te, ln as z, lt as Ee, m as De, mt as Oe, n as ke, nn as B, nt as Ae, o as je, on as Me, ot as Ne, p as Pe, pt as Fe, qt as V, r as Ie, s as Le, sn as Re, st as ze, t as Be, tn as H, u as Ve, un as He, ut as Ue, v as We, wt as Ge, x as Ke, xt as U, y as qe, yt as Je, zt as W } from "./Textarea-D6v52bhz.js";
// \0rolldown/runtime.js
var Ye = Object.defineProperty, Xe = (e, t) => {
	let n = {};
	for (var r in e) Ye(n, r, {
		get: e[r],
		enumerable: !0
	});
	return t || Ye(n, Symbol.toStringTag, { value: "Module" }), n;
};
// svelte/View.svelte
function Ze(e, t) {
	let n = () => ge(t.values, "$values", r), [r, i] = pe();
	var a = g(), o = N(a);
	A(o, () => t.component, (e, t) => {
		t(e, Ue(n));
	}), f(e, a), i();
}
// shared/uiVariant.ts
function Qe(e, t, n) {
	let r = new URL(t), i = new URL(e, r);
	return i.origin !== r.origin || !/^\/(?:app|archived|login|b\/[a-z0-9]+)\/?$/.test(i.pathname) ? String(e) : (n === "svelte" ? i.searchParams.set("ui", "svelte") : i.searchParams.delete("ui"), i.pathname + i.search + i.hash);
}
// ../vibebook/node_modules/svelte-toolbelt/dist/utils/after-sleep.js
function $e(e, t) {
	return setTimeout(t, e);
}
// ../vibebook/node_modules/bits-ui/dist/bits/alert-dialog/components/alert-dialog.svelte
function et(e, t) {
	Re(t, !0);
	let n = I(t, "open", 15, !1), r = I(t, "onOpenChange", 3, y), i = I(t, "onOpenChangeComplete", 3, y);
	d.create({
		variant: Ae(() => "alert-dialog"),
		open: Ae(() => n(), (e) => {
			n(e), r()(e);
		}),
		onOpenChangeComplete: Ae(() => i())
	});
	var a = g(), o = N(a);
	u(o, () => t.children ?? He), f(e, a), Me();
}
// ../vibebook/node_modules/bits-ui/dist/bits/alert-dialog/components/alert-dialog-action.svelte
var tt = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"children",
	"child",
	"id",
	"ref"
]), nt = b("<button><!></button>");
function rt(t, n) {
	let r = ne();
	Re(n, !0);
	let i = I(n, "id", 19, () => h(r)), a = I(n, "ref", 15, null), o = Ee(n, tt), s = C.create({
		id: Ae(() => i()),
		ref: Ae(() => a(), (e) => a(e))
	}), c = P(() => e(o, s.props));
	var l = g(), d = N(l), p = (e) => {
		var t = g(), r = N(t);
		u(r, () => n.child, () => ({ props: j(c) })), f(e, t);
	}, m = (e) => {
		var t = nt();
		Je(t, () => ({ ...j(c) }));
		var r = M(t);
		u(r, () => n.children ?? He), z(t), f(e, t);
	};
	R(d, (e) => {
		n.child ? e(p) : e(m, -1);
	}), f(t, l), Me();
}
// ../vibebook/node_modules/bits-ui/dist/bits/alert-dialog/components/alert-dialog-cancel.svelte
var it = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"ref",
	"children",
	"child",
	"disabled"
]), at = b("<button><!></button>");
function ot(t, n) {
	let r = ne();
	Re(n, !0);
	let i = I(n, "id", 19, () => h(r)), a = I(n, "ref", 15, null), o = I(n, "disabled", 3, !1), s = Ee(n, it), c = x.create({
		id: Ae(() => i()),
		ref: Ae(() => a(), (e) => a(e)),
		disabled: Ae(() => !!o())
	}), l = P(() => e(s, c.props));
	var d = g(), p = N(d), m = (e) => {
		var t = g(), r = N(t);
		u(r, () => n.child, () => ({ props: j(l) })), f(e, t);
	}, _ = (e) => {
		var t = at();
		Je(t, () => ({ ...j(l) }));
		var r = M(t);
		u(r, () => n.children ?? He), z(t), f(e, t);
	};
	R(p, (e) => {
		n.child ? e(m) : e(_, -1);
	}), f(t, d), Me();
}
// ../vibebook/node_modules/bits-ui/dist/bits/alert-dialog/components/alert-dialog-content.svelte
var st = /* @__PURE__ */ new Set([
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
]), ct = b("<!> <!>", 1), lt = b("<!> <div><!></div>", 1);
function ut(n, r) {
	let i = ne();
	Re(r, !0);
	let o = I(r, "id", 19, () => h(i)), c = I(r, "ref", 15, null), d = I(r, "forceMount", 3, !1), p = I(r, "interactOutsideBehavior", 3, "ignore"), m = I(r, "onCloseAutoFocus", 3, y), _ = I(r, "onEscapeKeydown", 3, y), v = I(r, "onOpenAutoFocus", 3, y), b = I(r, "onInteractOutside", 3, y), x = I(r, "preventScroll", 3, !0), S = I(r, "preventOverflowTextSelection", 3, !0), C = I(r, "trapFocus", 3, !0), w = I(r, "restoreScrollDelay", 3, null), E = I(r, "preventBodyPointerEvents", 3, !0), te = Ee(r, st), D = ee.create({
		id: Ae(() => o()),
		ref: Ae(() => c(), (e) => c(e))
	}), O = () => E() || !D.root.overlayNode, re = P(() => e(te, D.props));
	var A = g(), ie = N(A), ae = (n) => {
		l(n, {
			get ref() {
				return D.opts.ref;
			},
			loop: !0,
			get trapFocus() {
				return C();
			},
			get enabled() {
				return D.root.opts.open.current;
			},
			get onCloseAutoFocus() {
				return m();
			},
			onOpenAutoFocus: (e) => {
				if (v()(e), e.defaultPrevented) return;
				e.preventDefault();
				let t = D.opts.ref.current;
				$e(0, () => {
					t?.isConnected && t.focus();
				});
			},
			focusScope: (n, i) => {
				let o = () => (i?.()).props;
				s(n, Ue(() => j(re), {
					get enabled() {
						return D.root.opts.open.current;
					},
					get ref() {
						return D.opts.ref;
					},
					onEscapeKeydown: (e) => {
						_()(e), e.defaultPrevented || D.root.handleClose();
					},
					children: (n, i) => {
						T(n, Ue(() => j(re), {
							get ref() {
								return D.opts.ref;
							},
							get enabled() {
								return D.root.opts.open.current;
							},
							get interactOutsideBehavior() {
								return p();
							},
							onInteractOutside: (e) => {
								b()(e), e.defaultPrevented || D.root.handleClose();
							},
							children: (n, i) => {
								k(n, Ue(() => j(re), {
									get preventOverflowTextSelection() {
										return S();
									},
									get ref() {
										return D.opts.ref;
									},
									get enabled() {
										return D.root.opts.open.current;
									},
									children: (n, i) => {
										var s = g(), c = N(s), l = (n) => {
											var i = ct(), s = N(i), c = (e) => {
												a(e, {
													get preventScroll() {
														return x();
													},
													get restoreScrollDelay() {
														return w();
													},
													blockPointer: O
												});
											};
											R(s, (e) => {
												D.root.opts.open.current && e(c);
											});
											var l = t(s, 2);
											{
												let t = P(() => ({
													props: e(j(re), o()),
													...D.snippetProps
												}));
												u(l, () => r.child, () => j(t));
											}
											f(n, i);
										}, d = (n) => {
											var i = lt(), s = N(i);
											a(s, {
												get preventScroll() {
													return x();
												},
												blockPointer: O
											});
											var c = t(s, 2);
											Je(c, (e) => ({ ...e }), [() => e(j(re), o())]);
											var l = M(c);
											u(l, () => r.children ?? He), z(c), f(n, i);
										};
										R(c, (e) => {
											r.child ? e(l) : e(d, -1);
										}), f(n, s);
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
	R(ie, (e) => {
		(D.shouldRender || d()) && e(ae);
	}), f(n, A), Me();
}
// svelte/Inbox.svelte
var dt = b("<span class=\"tw:grid tw:size-8 tw:shrink-0 tw:place-items-center tw:rounded-full tw:border tw:border-border tw:bg-muted\"><!></span>"), ft = b("<li class=\"tw:flex tw:items-start tw:gap-2 tw:py-1\"><a class=\"tw:flex tw:min-w-0 tw:flex-1 tw:gap-3 tw:rounded-control tw:p-2 tw:text-foreground tw:no-underline tw:outline-none tw:hover:bg-accent tw:focus-visible:ring-2 tw:focus-visible:ring-ring\"><!> <span class=\"tw:flex tw:min-w-0 tw:flex-1 tw:flex-col tw:gap-1 tw:text-sm tw:leading-5 tw:[overflow-wrap:anywhere]\"><span class=\"tw:line-clamp-3\"><strong class=\"tw:font-semibold\"> </strong> </span> <span class=\"tw:text-xs tw:leading-4 tw:text-muted-foreground\"> </span></span></a> <!></li>"), pt = b("<ul class=\"tw:m-0 tw:max-h-[60dvh] tw:min-h-0 tw:list-none tw:divide-y tw:divide-border tw:overflow-auto tw:overscroll-contain tw:p-0\"></ul>"), mt = b("<!> <!>", 1);
function ht(e, n) {
	Re(n, !0);
	let r = (e) => {
		var r = g(), i = N(r), a = (e) => {
			var r = pt();
			E(r, 21, () => j(d), (e) => m(e), (e, r) => {
				var i = ft(), a = M(i), o = M(a), c = (e) => {
					var t = dt(), n = M(t);
					le(n, { name: "check" }), z(t), f(e, t);
				}, l = P(() => h(j(r)) === "task"), d = (e) => {
					{
						let t = P(() => _(j(r))), i = P(() => n.avatarUrl?.(j(r).author));
						Se(e, {
							get name() {
								return j(t);
							},
							get src() {
								return j(i);
							}
						});
					}
				};
				R(o, (e) => {
					j(l) ? e(c) : e(d, -1);
				});
				var p = t(o, 2), g = M(p), v = M(g), x = D(v, !0), S = t(v);
				z(g);
				var C = t(g, 2), T = D(C);
				z(p), z(a);
				var E = t(a, 2), ee = (e) => {
					{
						let t = P(() => n.vb.t("Já resolvi (respondi em outro lugar, ou não é comigo)")), i = P(() => j(s) === m(j(r))), a = P(() => j(s) !== null);
						De(e, {
							icon: "check",
							get label() {
								return j(t);
							},
							class: "tw:mt-1",
							get loading() {
								return j(i);
							},
							get disabled() {
								return j(a);
							},
							onclick: () => b(j(r))
						});
					}
				}, te = P(() => j(r).ref.startsWith("m"));
				R(E, (e) => {
					j(te) && e(ee);
				}), z(i), V((e, t, n, i) => {
					U(a, "href", e), w(x, t), w(S, ` ${j(r).text ?? ""}`), w(T, `${j(u) ? `${j(r).room} › ` : ""}${n ?? ""} · ${i ?? ""}`);
				}, [
					() => y(j(r)),
					() => h(j(r)) === "task" ? n.vb.t("Tarefa sua esperando OK:") : h(j(r)) === "agent" ? n.vb.t("Seu agent espera você:") : `${_(j(r)).split(" ")[0]}:`,
					() => j(r).topic || n.vb.t("sala principal"),
					() => n.vb.ago(j(r).ts)
				]), ie("click", a, (e) => n.onopen(j(r), e)), f(e, i);
			}), z(r), f(e, r);
		}, o = (e) => {
			{
				let t = P(() => j(u) ? n.vb.t("Nada esperando você. ✓") : n.vb.t("Nada esperando você nesta sala. ✓"));
				he(e, { get title() {
					return j(t);
				} });
			}
		};
		R(i, (e) => {
			j(d).length ? e(a) : e(o, -1);
		}), f(e, r);
	}, i = I(n, "all", 3, !1), a = B(me(v(() => i() || !n.roomId ? "all" : "room"))), o = B(!0), s = B(null), c = B(""), l = P(() => n.waits.filter((e) => e.book_id === n.roomId)), u = P(() => j(a) === "all" || !n.roomId), d = P(() => j(u) ? n.waits : j(l)), p = P(() => [{
		value: "room",
		label: `${n.vb.t("Esta sala")} (${j(l).length})`
	}, {
		value: "all",
		label: `${n.vb.t("Todas")} (${n.waits.length})`
	}]), m = (e) => `${e.book_id}:${e.ref}`, h = (e) => e.ref.startsWith("t") ? "task" : /^[ab]/.test(e.ref) ? "agent" : "ask", _ = (e) => e.author_name || n.displayName?.(e.author) || e.author.split("@")[0];
	function y(e) {
		return Qe(`/b/${encodeURIComponent(e.book_id)}${e.thread === "main" ? "" : `?t=${encodeURIComponent(e.thread)}`}${/^[mab]/.test(e.ref) ? `#m${e.ref.slice(1)}` : ""}`, window.location.href, "svelte");
	}
	async function b(e) {
		H(s, m(e), !0), H(c, "");
		try {
			await n.onresolve(e);
		} catch {
			H(c, n.vb.t("Não deu pra resolver agora. Tente de novo."), !0);
		} finally {
			H(s, null);
		}
	}
	{
		let i = (e) => {
			var i = mt(), o = N(i), s = (e) => {
				de(e, {
					get title() {
						return j(c);
					},
					compact: !0
				});
			};
			R(o, (e) => {
				j(c) && e(s);
			});
			var l = t(o, 2), u = (e) => {
				{
					let t = (e) => {
						r(e);
					}, i = P(() => n.vb.t("Caixa de entrada"));
					Pe(e, {
						get items() {
							return j(p);
						},
						get label() {
							return j(i);
						},
						onValueChange: (e) => n.ontab?.(e === "all"),
						get value() {
							return j(a);
						},
						set value(e) {
							H(a, e, !0);
						},
						children: t,
						$$slots: { default: !0 }
					});
				}
			}, d = (e) => {
				r(e);
			};
			R(l, (e) => {
				n.roomId ? e(u) : e(d, -1);
			}), f(e, i);
		}, s = P(() => n.vb.t("Caixa de entrada")), l = P(() => n.vb.t("Fechar"));
		_e(e, {
			get title() {
				return j(s);
			},
			get closeLabel() {
				return j(l);
			},
			onOpenChange: (e) => {
				e || n.onclose();
			},
			get open() {
				return j(o);
			},
			set open(e) {
				H(o, e, !0);
			},
			children: i,
			$$slots: { default: !0 }
		});
	}
	Me();
}
i(["click"]);
// svelte/InboxMount.svelte
function gt(e, t) {
	let n = () => ge(t.waits, "$waits", r), [r, i] = pe();
	ht(e, Ue(() => t.props, { get waits() {
		return n();
	} })), i();
}
// svelte/lib/ui/Progress.svelte
var _t = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"value",
	"max",
	"label",
	"class"
]), vt = b("<progress> </progress>");
function yt(e, t) {
	Re(t, !0);
	let n = I(t, "max", 3, 100), r = Ee(t, _t), i = P(() => Number.isFinite(n()) && n() > 0 ? n() : 100), a = P(() => Number.isFinite(t.value) ? Math.min(j(i), Math.max(0, t.value)) : 0);
	var o = vt();
	Je(o, (e) => ({
		...r,
		max: j(i),
		value: j(a),
		"aria-label": t.label,
		class: e
	}), [() => ce("tw:h-1.5 tw:w-full tw:overflow-hidden tw:rounded-full tw:border-0 tw:bg-muted tw:appearance-none tw:[&::-webkit-progress-bar]:rounded-full tw:[&::-webkit-progress-bar]:bg-muted tw:[&::-webkit-progress-value]:rounded-full tw:[&::-webkit-progress-value]:bg-primary tw:[&::-moz-progress-bar]:rounded-full tw:[&::-moz-progress-bar]:bg-primary", t.class)]);
	var s = D(o);
	V(() => w(s, `${j(a) ?? ""}/${j(i) ?? ""}`)), f(e, o), Me();
}
// svelte/TaskList.svelte
var bt = b("<!> ", 1), xt = b("<div class=\"tw:min-w-0 tw:flex-1 tw:basis-32 tw:space-y-1\"><!> <!></div>"), St = b("<div role=\"group\"><!> <!> <!> <!> <!></div>"), Ct = b("<section data-vb-native=\"\" class=\"tw:m-0 tw:box-border tw:space-y-3 tw:rounded-surface tw:bg-background tw:p-3 tw:font-sans tw:text-sm tw:text-foreground\"><header class=\"tw:flex tw:items-center tw:gap-3\"><h3 class=\"tw:m-0 tw:font-sans tw:text-sm tw:font-semibold\"> </h3> <!> <!></header> <!> <!> <div class=\"tw:space-y-2\"></div> <form id=\"newTask\" class=\"tw:flex tw:items-center tw:gap-2\"><!> <!></form></section>"), wt = b("<form class=\"tw:grid tw:grid-cols-1 tw:gap-4\"><!> <!> <div class=\"tw:flex tw:flex-wrap tw:justify-end tw:gap-2\"><!><!></div></form>"), Tt = b("<!> <!>", 1);
function Et(e, n) {
	let r = ne();
	Re(n, !0);
	let i = I(n, "waits", 19, () => []), a = P(() => n.room.epics.find((e) => e.id === n.thread) ?? (n.thread === "main" && n.room.roomTasks?.length ? {
		id: "main",
		tasks: n.room.roomTasks,
		flags: []
	} : null)), s = (e) => i().some((t) => t.book_id === n.room.id && t.ref === `t${e.id}`), c = P(() => (j(a)?.tasks ?? []).map((e, t) => ({
		task: e,
		index: t
	})).sort((e, t) => (e.task.done ? 2 : +!s(e.task)) - (t.task.done ? 2 : +!s(t.task)) || e.index - t.index).map((e) => e.task)), l = P(() => j(a)?.tasks.filter((e) => e.done).length ?? 0), u = P(() => [{
		value: "",
		label: n.vb.t("sem dono")
	}, ...(n.room.members ?? []).map((e) => ({
		value: e,
		label: e === n.room.me ? n.vb.t("você") : n.vb.name(e)
	}))]), d = B(null), p = B(""), h = B(null), g = B(""), v = B(""), y = B(null), b = B(!1), x = B(""), S = B(null), C = P(() => j(a)?.tasks.find((e) => e.id === j(y)));
	_(() => {
		j(d) && j(h) && (j(h).focus(), j(h).select());
	}), _(() => {
		j(y) && !j(C) && O(), j(d) && !j(a)?.tasks.some((e) => e.id === j(d)) && H(d, null);
	});
	function T(e) {
		try {
			if (n.send(e)) return H(v, ""), !0;
		} catch {}
		return H(v, n.vb.t("Não deu pra enviar agora. Tente de novo."), !0), !1;
	}
	function ee(e, t = !0) {
		j(d) !== e.id || t && j(p).trim() && j(p) !== e.title && !T({
			t: "task.rename",
			id: e.id,
			title: j(p)
		}) || H(d, null);
	}
	function te(e) {
		H(y, e.id, !0), H(x, e.due ?? "", !0), H(b, !0);
	}
	function O() {
		H(b, !1), H(y, null), H(x, "");
	}
	var k = Tt(), A = N(k), ie = (e) => {
		var r = Ct(), i = M(r), _ = M(i), y = D(_, !0), x = t(_, 2);
		Le(x, {
			children: (e, t) => {
				F();
				var n = W();
				V(() => w(n, `${j(l) ?? ""}/${j(a).tasks.length ?? ""}`)), f(e, n);
			},
			$$slots: { default: !0 }
		});
		var S = t(x, 2);
		{
			let e = P(() => n.vb.t("Tarefas")), t = P(() => Math.max(1, j(a).tasks.length)), r = P(() => `${j(l)}/${j(a).tasks.length}`);
			yt(S, {
				get label() {
					return j(e);
				},
				get value() {
					return j(l);
				},
				get max() {
					return j(t);
				},
				get "aria-valuetext"() {
					return j(r);
				},
				class: "tw:ml-auto tw:max-w-24"
			});
		}
		z(i);
		var C = t(i, 2), ne = (e) => {
			{
				let n = P(() => `@vibe: ${j(a).flags.join(" · ")}`);
				Le(e, {
					variant: "warning",
					get title() {
						return j(n);
					},
					children: (e, n) => {
						var r = bt(), i = N(r);
						le(i, {
							name: "warning",
							class: "tw:size-3"
						});
						var o = t(i, 1, !0);
						V((e) => w(o, e), [() => j(a).flags.join(" · ")]), f(e, r);
					},
					$$slots: { default: !0 }
				});
			}
		};
		R(C, (e) => {
			j(a).flags?.length && e(ne);
		});
		var O = t(C, 2), k = (e) => {
			de(e, {
				get title() {
					return j(v);
				},
				compact: !0
			});
		};
		R(O, (e) => {
			j(v) && !j(b) && e(k);
		});
		var A = t(O, 2);
		E(A, 21, () => j(c), (e) => e.id, (e, r) => {
			var i = St(), a = M(i);
			{
				let e = P(() => n.vb.t("Feita"));
				ue(a, {
					get checked() {
						return j(r).done;
					},
					get "aria-label"() {
						return j(e);
					},
					onclick: (e) => {
						e.preventDefault(), T({
							t: "task.toggle",
							id: j(r).id
						});
					}
				});
			}
			var c = t(a, 2), l = (e) => {
				{
					let t = P(() => n.vb.t("Clique para editar"));
					Ve(e, {
						get "data-task-edit"() {
							return j(r).id;
						},
						get "aria-label"() {
							return j(t);
						},
						class: "tw:min-w-32 tw:flex-1",
						onblur: () => ee(j(r)),
						onkeydown: (e) => {
							e.key === "Enter" && (e.preventDefault(), ee(j(r))), e.key === "Escape" && (e.preventDefault(), ee(j(r), !1));
						},
						get ref() {
							return j(h);
						},
						set ref(e) {
							H(h, e, !0);
						},
						get value() {
							return j(p);
						},
						set value(e) {
							H(p, e, !0);
						}
					});
				}
			}, m = (e) => {
				var i = xt(), a = M(i);
				{
					let e = P(() => ce("tw:h-auto tw:w-full tw:justify-start tw:whitespace-normal tw:rounded-sm tw:p-0 tw:text-left tw:hover:bg-transparent tw:hover:underline", j(r).done && "tw:text-muted-foreground tw:line-through")), t = P(() => n.vb.t("Clique para editar"));
					L(a, {
						get "data-task-title"() {
							return j(r).id;
						},
						variant: "ghost",
						get class() {
							return j(e);
						},
						get title() {
							return j(t);
						},
						onclick: () => {
							H(d, j(r).id, !0), H(p, j(r).title, !0);
						},
						children: (e, t) => {
							F();
							var n = W();
							V(() => w(n, j(r).title)), f(e, n);
						},
						$$slots: { default: !0 }
					});
				}
				var o = t(a, 2), s = (e) => {
					{
						let n = P(() => `@vibe: ${j(r).flags.join(" · ")}`);
						Le(e, {
							variant: "warning",
							get title() {
								return j(n);
							},
							children: (e, n) => {
								var i = bt(), a = N(i);
								le(a, {
									name: "warning",
									class: "tw:size-3"
								});
								var o = t(a, 1, !0);
								V((e) => w(o, e), [() => j(r).flags.join(" · ")]), f(e, i);
							},
							$$slots: { default: !0 }
						});
					}
				};
				R(o, (e) => {
					j(r).flags?.length && e(s);
				}), z(i), f(e, i);
			};
			R(c, (e) => {
				j(d) === j(r).id ? e(l) : e(m, -1);
			});
			var g = t(c, 2);
			{
				let e = P(() => n.vb.t("Responsável")), t = P(() => j(r).owner ?? "");
				Te(g, {
					get "data-owner"() {
						return j(r).id;
					},
					get "aria-label"() {
						return j(e);
					},
					get value() {
						return j(t);
					},
					get items() {
						return j(u);
					},
					class: "tw:w-auto tw:max-w-40",
					onValueChange: (e) => T({
						t: "task.assign",
						id: j(r).id,
						owner: e
					})
				});
			}
			var _ = t(g, 2);
			{
				let e = P(() => n.vb.t("Prazo")), i = P(() => j(r).due ? `${n.vb.t("Prazo")}: ${j(r).due}` : n.vb.t("Prazo"));
				L(_, {
					get "data-due"() {
						return j(r).id;
					},
					variant: "ghost",
					size: "sm",
					get title() {
						return j(e);
					},
					get "aria-label"() {
						return j(i);
					},
					onclick: () => te(j(r)),
					children: (e, n) => {
						var i = bt(), a = N(i);
						le(a, {
							name: "calendar",
							class: "tw:size-3.5"
						});
						var o = t(a, 1, !0);
						V(() => w(o, j(r).due ?? "")), f(e, i);
					},
					$$slots: { default: !0 }
				});
			}
			var v = t(_, 2);
			{
				let e = P(() => n.vb.t("Apagar task"));
				De(v, {
					get "data-tdel"() {
						return j(r).id;
					},
					get label() {
						return j(e);
					},
					icon: "close",
					class: "tw:size-8",
					onclick: () => T({
						t: "task.del",
						id: j(r).id
					})
				});
			}
			z(i), V((e) => {
				U(i, "data-task", j(r).id), U(i, "aria-label", j(r).title), re(i, 1, e);
			}, [() => o(ce("tw:flex tw:flex-wrap tw:items-center tw:gap-2 tw:rounded-control tw:border tw:p-2", j(r).done ? "tw:border-transparent tw:bg-muted/40 tw:text-muted-foreground" : "tw:border-border tw:bg-card tw:text-card-foreground", !j(r).done && j(r).owner === n.room.me && "tw:border-ring/50", s(j(r)) && "tw:bg-warning/10"))]), f(e, i);
		}), z(A);
		var ie = t(A, 2), ae = M(ie);
		{
			let e = P(() => n.vb.t("nova task")), t = P(() => n.vb.t("nova task"));
			Ve(ae, {
				get "aria-label"() {
					return j(e);
				},
				get placeholder() {
					return j(t);
				},
				get value() {
					return j(g);
				},
				set value(e) {
					H(g, e, !0);
				}
			});
		}
		var oe = t(ae, 2);
		{
			let e = P(() => n.vb.t("Nova tarefa"));
			De(oe, {
				type: "submit",
				get label() {
					return j(e);
				},
				icon: "plus",
				variant: "outline"
			});
		}
		z(ie), z(r), V((e, t) => {
			U(r, "aria-label", e), w(y, t);
		}, [() => n.vb.t("Tarefas"), () => n.vb.t("Tarefas")]), m("submit", ie, (e) => {
			e.preventDefault(), j(g).trim() && T({
				t: "task.add",
				epic: n.thread,
				title: j(g)
			}) && H(g, "");
		}), f(e, r);
	};
	R(A, (e) => {
		j(a) && e(ie);
	});
	var ae = t(A, 2), oe = (e) => {
		{
			let i = P(() => n.vb.t("Prazo")), a = P(() => n.vb.t("Prazo (ex.: sex, qua 23h, 06/11). Vazio tira o prazo:")), o = P(() => n.vb.t("Fechar"));
			_e(e, {
				get title() {
					return j(i);
				},
				get description() {
					return j(a);
				},
				get closeLabel() {
					return j(o);
				},
				initialFocus: () => j(S),
				onOpenChange: (e) => {
					e || O();
				},
				get open() {
					return j(b);
				},
				set open(e) {
					H(b, e, !0);
				},
				children: (e, i) => {
					var a = wt(), o = M(a);
					{
						let e = (e, t = He) => {
							Ve(e, Ue(t, {
								get ref() {
									return j(S);
								},
								set ref(e) {
									H(S, e, !0);
								},
								get value() {
									return j(x);
								},
								set value(e) {
									H(x, e, !0);
								}
							}));
						}, t = P(() => `${r}-due`), i = P(() => n.vb.t("Prazo"));
						se(o, {
							get id() {
								return j(t);
							},
							get label() {
								return j(i);
							},
							children: e,
							$$slots: { default: !0 }
						});
					}
					var s = t(o, 2), c = (e) => {
						de(e, {
							get title() {
								return j(v);
							},
							compact: !0
						});
					};
					R(s, (e) => {
						j(v) && e(c);
					});
					var l = t(s, 2), u = M(l);
					L(u, {
						variant: "outline",
						onclick: O,
						children: (e, t) => {
							F();
							var r = W();
							V((e) => w(r, e), [() => n.vb.t("Cancelar")]), f(e, r);
						},
						$$slots: { default: !0 }
					});
					var d = t(u);
					L(d, {
						type: "submit",
						children: (e, t) => {
							F();
							var r = W();
							V((e) => w(r, e), [() => n.vb.t("Salvar")]), f(e, r);
						},
						$$slots: { default: !0 }
					}), z(l), z(a), m("submit", a, (e) => {
						e.preventDefault(), j(C) && T({
							t: "task.assign",
							id: j(C).id,
							due: j(x)
						}) && O();
					}), f(e, a);
				},
				$$slots: { default: !0 }
			});
		}
	};
	R(ae, (e) => {
		j(C) && e(oe);
	}), f(e, k), Me();
}
// svelte/Tasks.svelte
var Dt = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy"
]);
function Ot(e, t) {
	Re(t, !0);
	let n = Ee(t, Dt);
	var i = g(), a = N(i);
	r(a, () => JSON.stringify([t.room.id, t.thread]), (e) => {
		Et(e, Ue(() => n));
	}), f(e, i), Me();
}
// ../vibebook/node_modules/zod/v4/core/util.js
function kt(e) {
	let t = Object.values(e).filter((e) => typeof e == "number");
	return Object.entries(e).filter(([e, n]) => t.indexOf(+e) === -1).map(([e, t]) => t);
}
function At(e, t) {
	return typeof t == "bigint" ? t.toString() : t;
}
var jt = class {
	constructor(e) {
		this._getter = e, this._value = void 0;
	}
	get value() {
		let e = this._getter;
		return e !== void 0 && (this._value = e(), this._getter = void 0), this._value;
	}
};
function Mt(e) {
	return new jt(e);
}
function Nt(e) {
	return e == null;
}
function Pt(e) {
	let t = +!!e.startsWith("^"), n = e.endsWith("$") ? e.length - 1 : e.length;
	return e.slice(t, n);
}
function Ft(e, t, n) {
	Object.defineProperty(e, t, {
		value: n,
		writable: !0,
		enumerable: !0,
		configurable: !0
	});
}
function It(e) {
	let t = Object.getOwnPropertyDescriptor(e, "shape");
	return t?.get ? t.get.raw : t?.value;
}
function Lt(e) {
	return It(e._zod.def) ?? e._zod.def.shape;
}
function Rt(e, t, n) {
	Object.defineProperty(e, t, {
		get() {
			let e = n();
			return Ft(this, t, e), e;
		},
		enumerable: !0,
		configurable: !0
	});
}
function zt(e, t, n) {
	t in e ? Ft(e, t, n) : e[t] = n;
}
function Bt(e, t, n, r) {
	let i = Lt(t);
	for (let a of n) {
		let n = Object.getOwnPropertyDescriptor(i, a);
		n.enumerable && (n.get ? Rt(e, a, () => {
			let e = t._zod.def.shape[a];
			return r ? r(e, a) : e;
		}) : zt(e, a, r ? r(n.value, a) : n.value));
	}
}
function Vt(e, t) {
	for (let n of Reflect.ownKeys(t)) {
		let r = Object.getOwnPropertyDescriptor(t, n);
		r.enumerable && (r.get ? Rt(e, n, () => t[n]) : zt(e, n, r.value));
	}
}
function Ht(...e) {
	let t = {};
	for (let n of e) {
		let e = Object.getOwnPropertyDescriptors(n);
		Object.assign(t, e);
	}
	return Object.defineProperties({}, t);
}
var Ut = "captureStackTrace" in Error ? Error.captureStackTrace : (...e) => {};
function Wt(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function Gt(e) {
	if (Wt(e) === !1) return !1;
	let t = e.constructor;
	if (t === void 0 || typeof t != "function") return !0;
	let n = t.prototype;
	return Wt(n) !== !1 && Object.prototype.hasOwnProperty.call(n, "isPrototypeOf") !== !1;
}
var Kt = /* @__PURE__*/ new Set([
	"string",
	"number",
	"symbol"
]);
function qt(e) {
	return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function Jt(e, t, n) {
	let r = new e._zod.constr(t ?? e._zod.def);
	return (!t || n?.parent) && (r._zod.parent = e), r;
}
function Yt(e) {
	let t = e;
	if (!t) return {};
	if (typeof t == "string") return { error: () => t };
	if (t?.message !== void 0) {
		if (t?.error !== void 0) throw Error("Cannot specify both `message` and `error` params");
		t.error = t.message;
	}
	return delete t.message, typeof t.error == "string" ? {
		...t,
		error: () => t.error
	} : t;
}
function Xt(e) {
	return Object.keys(e).filter((t) => e[t]._zod.optin !== void 0 && e[t]._zod.optout === "optional");
}
function Zt(e, t) {
	if (!Gt(t)) throw Error("Invalid input to extend: expected a plain object");
	let n = e._zod.def.checks;
	if (n && n.length > 0) {
		let n = Lt(e);
		for (let e of Reflect.ownKeys(t)) if (Object.getOwnPropertyDescriptor(n, e) !== void 0) throw Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
	}
	return Jt(e, Ht(e._zod.def, { shape: Qt(e, t) }));
}
function Qt(e, t) {
	let n = {};
	return Bt(n, e, Reflect.ownKeys(Lt(e))), Vt(n, t), n;
}
function $t(e, t = 0) {
	if (e.aborted === !0) return !0;
	for (let n = t; n < e.issues.length; n++) if (e.issues[n]?.continue !== !0) return !0;
	return !1;
}
function en(e, t = 0) {
	if (e.aborted === !0) return !0;
	for (let n = t; n < e.issues.length; n++) if (e.issues[n]?.continue === !1) return !0;
	return !1;
}
function tn(e, t) {
	return t.map((t) => {
		var n;
		return (n = t).path ?? (n.path = []), t.path.unshift(e), t;
	});
}
function nn(e) {
	return typeof e == "string" ? e : e?.message;
}
function rn(e) {
	let t = [];
	for (let n of e ?? []) {
		let e = n._zod.def;
		if (!/_(length|size)$|_equals$/.test(e.check)) break;
		let r = e.maximum ?? e.length ?? e.size;
		r >= 0 && t.push([r, n]);
	}
	return t;
}
function an(e, t, n) {
	var r;
	for (let i = t; i < e.length; i++) (r = e[i]).schema ?? (r.schema = n);
}
function on(e, t, n) {
	var r;
	let i = e.inst?._zod?.traits;
	i?.has("$ZodType") && (i.has("$ZodCheck") ? (r = e).schema ?? (r.schema = e.inst) : e.schema = e.inst);
	let a = e.schema === e.inst ? void 0 : e.schema?._zod.def?.error, o = e.message ? e.message : nn(e.inst?._zod.def?.error?.(e)) ?? nn(a?.(e)) ?? nn(t?.error?.(e)) ?? nn(n.customError?.(e)) ?? nn(n.localeError?.(e)) ?? "Invalid input", s = {};
	for (let t of Object.keys(e)) t !== "inst" && t !== "schema" && t !== "continue" && t !== "input" && t !== "__proto__" && (s[t] = e[t]);
	return s.path ??= [], s.message = o, t?.reportInput && (s.input = e.input), s;
}
var sn = /[\uD800-\uDBFF]/;
function cn(e) {
	let t = e.length;
	if (!sn.test(e)) return t;
	let n = t;
	for (let r = 0; r < t - 1; r++) (e.charCodeAt(r) & 64512) == 55296 && (e.charCodeAt(r + 1) & 64512) == 56320 && (n--, r++);
	return n;
}
function ln(e) {
	return Array.isArray(e) ? "array" : typeof e == "string" ? "string" : "unknown";
}
function un(e, t) {
	for (let n in t) {
		let r = Object.getOwnPropertyDescriptor(t, n);
		r.get ? Object.defineProperty(e, n, {
			...r,
			enumerable: !1
		}) : pn(e, n, r.value);
	}
}
function dn(e, t, n, r = !0) {
	return Object.defineProperty(e, t, {
		configurable: !0,
		writable: !0,
		enumerable: r,
		value: n
	}), n;
}
function fn(e, t, n) {
	return dn(e, t, n, !1);
}
function pn(e, t, n) {
	Object.defineProperty(e, t, {
		configurable: !0,
		get() {
			return this == null ? n : dn(this, t, n.bind(this));
		},
		set(e) {
			dn(this, t, e);
		}
	});
}
function mn(e, t) {
	let n = Object.getPrototypeOf(e);
	return t in n ? void 0 : n;
}
var hn, gn = !1, _n = {
	configurable: !0,
	get() {
		gn = !0;
	}
};
function vn(e, t, n) {
	let r = Object.getPrototypeOf(e._zod);
	t in r && hn !== e._zod ? hn = void 0 : (hn = e._zod, Object.defineProperty(r, t, {
		configurable: !0,
		get() {
			Object.defineProperty(this, t, _n);
			let e = gn;
			gn = !1;
			try {
				let r = n(this);
				return gn ? delete this[t] : Object.defineProperty(this, t, {
					configurable: !0,
					writable: !0,
					value: r
				}), gn ||= e, r;
			} catch (n) {
				throw delete this[t], gn ||= e, n;
			}
		},
		set(e) {
			Object.defineProperty(this, t, {
				configurable: !0,
				writable: !0,
				value: e
			});
		}
	}));
}
function yn(e, t, n, r) {
	let i = mn(e, t);
	i && Object.defineProperty(i, t, {
		configurable: !0,
		get() {
			let e = {
				configurable: !0,
				writable: !0,
				enumerable: r,
				value: void 0
			};
			return Object.defineProperty(this, t, e), e.value = n(this), Object.defineProperty(this, t, e), e.value;
		},
		set(e) {
			Object.defineProperty(this, t, {
				configurable: !0,
				writable: !0,
				enumerable: r,
				value: e
			});
		}
	});
}
// ../vibebook/node_modules/zod/v4/core/core.js
var bn, xn = {
	value: void 0,
	enumerable: !1
}, Sn = "captureStackTrace" in Error ? Error : null;
function Cn(e) {
	let t = Sn;
	if (t) {
		let n = t.stackTraceLimit;
		if (typeof n == "number") {
			try {
				t.stackTraceLimit = 0;
			} catch {
				return Sn = null, new e();
			}
			try {
				return new e();
			} finally {
				t.stackTraceLimit = n;
			}
		}
	}
	return new e();
}
/* @__NO_SIDE_EFFECTS__ */
function G(e, t, n, r) {
	let i = {};
	function a(e) {
		this.def = e, this.constr = d, this.traits = /* @__PURE__ */ new Set();
	}
	a.prototype = i;
	let o = n, s = o && /* @__PURE__ */ new WeakSet();
	function c(n, r) {
		if (!n._zod) {
			xn.value = new a(r);
			try {
				Object.defineProperty(n, "_zod", xn);
			} finally {
				xn.value = void 0;
			}
		} else if (n._zod.traits.has(e)) return;
		if (n._zod.traits.add(e), t(n, r), s) {
			let e = Object.getPrototypeOf(n), t = n._zod.constr.prototype, r = e;
			for (; r && r !== t;) r = Object.getPrototypeOf(r);
			let i = r ?? e;
			s.has(i) || (s.add(i), un(i, o));
		}
		let i = d.prototype;
		for (let e in i) Object.prototype.hasOwnProperty.call(i, e) && (e in n || (n[e] = i[e].bind(n)));
	}
	let l = r?.Parent ?? Object;
	class u extends l {}
	Object.defineProperty(u, "name", { value: e });
	function d(e) {
		let t = r?.Parent ? Cn(u) : this;
		c(t, e);
		let n = t._zod.deferred;
		if (n) {
			for (let e of n) e();
			t._zod.deferred = void 0;
		}
		let i = globalThis.__zod_globalConfig?.postProcessor;
		return i && i(t), t;
	}
	return Object.defineProperty(d, "init", { value: c }), Object.defineProperty(d, Symbol.hasInstance, { value: (t) => r?.Parent && t instanceof r.Parent ? !0 : t?._zod?.traits?.has(e) }), Object.defineProperty(d, "name", { value: e }), d;
}
var wn = class extends Error {
	constructor() {
		super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
	}
};
(bn = globalThis).__zod_globalConfig ?? (bn.__zod_globalConfig = {});
var Tn = globalThis.__zod_globalConfig;
function En(e) {
	return e && Object.assign(Tn, e), Tn;
}
// ../vibebook/node_modules/zod/v4/core/errors.js
function Dn() {
	let e = this._zod;
	return e.message ??= JSON.stringify(e.def, At, 2), e.message;
}
function On(e) {
	this._zod.message = e;
}
var kn = {
	get: Dn,
	set: On,
	enumerable: !0,
	configurable: !0
}, An = {
	value: void 0,
	enumerable: !1
}, jn = /* @__PURE__ */ new WeakSet([Object.prototype, Error.prototype]), Mn = /* @__PURE__ */ G("$ZodError", (e, t) => {
	e.name = "$ZodError", An.value = t, Object.defineProperty(e, "issues", An), An.value = void 0, Object.defineProperty(e, "message", kn);
	let n = Object.getPrototypeOf(e);
	jn.has(n) || (jn.add(n), Object.defineProperty(n, "toString", {
		configurable: !0,
		enumerable: !1,
		get() {
			let e = () => this.message;
			return Object.defineProperty(this, "toString", {
				value: e,
				configurable: !0,
				writable: !0
			}), e;
		},
		set(e) {
			Object.defineProperty(this, "toString", {
				value: e,
				configurable: !0,
				writable: !0
			});
		}
	}));
}, void 0, { Parent: Error }), Nn = /* @__PURE__*/ ((e) => {
	let t = (n, r, i, a) => {
		let o = i ? {
			...i,
			async: !1
		} : { async: !1 }, s = n._zod.run({
			value: r,
			issues: []
		}, o);
		if (s instanceof Promise) throw new wn();
		if (s.issues.length) {
			let n = new ((a?.Err) ?? e)(s.issues.map((e) => on(e, o, En())));
			throw Ut(n, a?.callee ?? t), n;
		}
		return s.value;
	};
	return t;
})(Mn), Pn = /* @__PURE__*/ ((e) => {
	let t = async (n, r, i, a) => {
		let o = i ? {
			...i,
			async: !0
		} : { async: !0 }, s = n._zod.run({
			value: r,
			issues: []
		}, o);
		if (s instanceof Promise && (s = await s), s.issues.length) {
			let n = new ((a?.Err) ?? e)(s.issues.map((e) => on(e, o, En())));
			throw Ut(n, a?.callee ?? t), n;
		}
		return s.value;
	};
	return t;
})(Mn), Fn = /* @__PURE__*/ ((e) => (t, n, r) => {
	let i = r ? {
		...r,
		async: !1
	} : { async: !1 }, a = t._zod.run({
		value: n,
		issues: []
	}, i);
	if (a instanceof Promise) throw new wn();
	return a.issues.length ? In(e, a.issues, i) : {
		success: !0,
		data: a.value
	};
})(Mn);
function In(e, t, n) {
	let r;
	return {
		success: !1,
		get error() {
			return r || (r = new e(t.map((e) => on(e, n, En()))), t = void 0, n = void 0), r;
		},
		set error(e) {
			r = e, t = void 0, n = void 0;
		}
	};
}
var Ln = /* @__PURE__*/ ((e) => async (t, n, r) => {
	let i = r ? {
		...r,
		async: !0
	} : { async: !0 }, a = t._zod.run({
		value: n,
		issues: []
	}, i);
	return a instanceof Promise && (a = await a), a.issues.length ? In(e, a.issues, i) : {
		success: !0,
		data: a.value
	};
})(Mn), Rn = /^[\s\S]{0,}$/, zn = /^-?\d+(?:\.\d+)?$/, Bn = /^(?:true|false)$/i, Vn = /*@__PURE__*/ G("$ZodCheck", (e, t) => {
	var n;
	e._zod ??= {}, e._zod.def = t, (n = e._zod).onattach ?? (n.onattach = []);
}), Hn = (e) => {
	let t = e.value;
	return !Nt(t) && t.length !== void 0;
}, Un = /*@__PURE__*/ G("$ZodCheckMaxLength", (e, t) => {
	var n;
	Vn.init(e, t), (n = e._zod.def).when ?? (n.when = Hn), e._zod.check = (n) => {
		let r = n.value, i = r.length;
		if ((typeof r == "string" && i > t.maximum ? cn(r) : i) <= t.maximum) return;
		let a = ln(r);
		n.issues.push({
			origin: a,
			code: "too_big",
			maximum: t.maximum,
			inclusive: !0,
			input: r,
			inst: e,
			continue: !t.abort
		});
	};
}), Wn = /*@__PURE__*/ G("$ZodCheckMinLength", (e, t) => {
	var n;
	Vn.init(e, t), (n = e._zod.def).when ?? (n.when = Hn), e._zod.check = (n) => {
		let r = n.value, i = r.length;
		if ((typeof r == "string" && i >= t.minimum && i < t.minimum * 2 ? cn(r) : i) >= t.minimum) return;
		let a = ln(r);
		n.issues.push({
			origin: a,
			code: "too_small",
			minimum: t.minimum,
			inclusive: !0,
			input: r,
			inst: e,
			continue: !t.abort
		});
	};
}), Gn = /*@__PURE__*/ G("$ZodCheckStartsWith", (e, t) => {
	Vn.init(e, t);
	let n = RegExp(`^${qt(t.prefix)}.*`);
	t.pattern ??= n, e._zod.check = (n) => {
		n.value.startsWith(t.prefix) || n.issues.push({
			origin: "string",
			code: "invalid_format",
			format: "starts_with",
			prefix: t.prefix,
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
}), Kn = {
	major: 4,
	minor: 6,
	patch: 7
}, qn = /*@__PURE__*/ G("$ZodType", (e, t) => {
	var n;
	e ??= {}, e._zod.def = t, e._zod.bag = e._zod.bag || {}, e._zod.version = Kn;
	let r = e._zod.def.checks, i = e._zod.traits.has("$ZodCheck") ? [e, ...r ?? []] : r?.length ? [...r] : [];
	for (let t of i) for (let n of t._zod.onattach) n(e);
	if (i.length === 0) (n = e._zod).deferred ?? (n.deferred = []), e._zod.deferred?.push(() => {
		e._zod.run = e._zod.parse;
	});
	else {
		let t = (t, n, r) => {
			if (t.memo) return t;
			let i = $t(t), a;
			for (let o of n) {
				if (o._zod.def.when) {
					if (en(t) || !o._zod.def.when(t)) continue;
				} else if (i) continue;
				let n = t.issues.length, s = o._zod.check(t);
				if (s instanceof Promise && r?.async === !1) throw new wn();
				if (a || s instanceof Promise) a = (a ?? Promise.resolve()).then(async () => {
					await s, t.issues.length !== n && (an(t.issues, n, e), i ||= $t(t, n));
				});
				else {
					if (t.issues.length === n) continue;
					an(t.issues, n, e), i ||= $t(t, n);
				}
			}
			return a ? a.then(() => t) : t;
		}, n = (n, r, a) => {
			if ($t(n)) return n.aborted = !0, n;
			let o = t(r, i, a);
			if (o instanceof Promise) {
				if (a.async === !1) throw new wn();
				return o.then((t) => e._zod.parse(t, a));
			}
			return e._zod.parse(o, a);
		};
		e._zod.run = (r, a) => {
			if (a.skipChecks) return e._zod.parse(r, a);
			if (a.direction === "backward") {
				let t = e._zod.parse({
					value: r.value,
					issues: []
				}, {
					...a,
					skipChecks: !0
				});
				return t instanceof Promise ? t.then((e) => n(e, r, a)) : n(t, r, a);
			}
			let o = e._zod.parse(r, a);
			if (o instanceof Promise) {
				if (a.async === !1) throw new wn();
				return o.then((e) => t(e, i, a));
			}
			return t(o, i, a);
		};
	}
}, {
	get "~standard"() {
		return fn(this, "~standard", Xn(this));
	},
	set "~standard"(e) {
		dn(this, "~standard", e);
	}
}), Jn = (e, t) => e.issues.length ? { issues: e.issues.map((e) => on(e, t, En())) } : { value: e.value };
async function Yn(e, t) {
	let n = { async: !0 };
	return Jn(await e._zod.run({
		value: t,
		issues: []
	}, n), n);
}
function Xn(e) {
	return {
		validate: (t) => {
			let n = { async: !1 };
			try {
				let r = e._zod.run({
					value: t,
					issues: []
				}, n);
				if (!(r instanceof Promise)) return Jn(r, n);
			} catch {}
			return Yn(e, t);
		},
		vendor: "zod",
		version: 1
	};
}
var Zn = /*@__PURE__*/ G("$ZodString", (e, t) => {
	qn.init(e, t), e._zod.pattern = t.pattern ?? Rn, e._zod.parse = (n, r) => {
		if (t.coerce) try {
			n.value = String(n.value);
		} catch {}
		return typeof n.value == "string" || n.issues.push({
			expected: "string",
			code: "invalid_type",
			input: n.value,
			inst: e
		}), n;
	};
}), Qn = /*@__PURE__*/ G("$ZodNumber", (e, t) => {
	qn.init(e, t), e._zod.pattern = zn, e._zod.parse = (n, r) => {
		if (t.coerce) try {
			n.value = Number(n.value);
		} catch {}
		let i = n.value;
		if (typeof i == "number" && !Number.isNaN(i) && Number.isFinite(i)) return n;
		let a = typeof i == "number" ? Number.isNaN(i) ? "NaN" : Number.isFinite(i) ? void 0 : String(i) : void 0;
		return n.issues.push({
			expected: "number",
			code: "invalid_type",
			input: i,
			inst: e,
			...a ? { received: a } : {}
		}), n;
	};
}), $n = /*@__PURE__*/ G("$ZodBoolean", (e, t) => {
	qn.init(e, t), e._zod.pattern = Bn, e._zod.parse = (n, r) => {
		if (t.coerce) try {
			n.value = !!n.value;
		} catch {}
		let i = n.value;
		return typeof i == "boolean" || n.issues.push({
			expected: "boolean",
			code: "invalid_type",
			input: i,
			inst: e
		}), n;
	};
}), er = /*@__PURE__*/ G("$ZodNever", (e, t) => {
	qn.init(e, t), e._zod.parse = (t, n) => (t.issues.push({
		expected: "never",
		code: "invalid_type",
		input: t.value,
		inst: e
	}), t);
});
function tr(e, t) {
	let n = rn(e._zod.def.checks);
	if (!n.length) return;
	let r = Math.min(...n.map((e) => e[0])), i = e._zod.parse;
	e._zod.parse = (n, a) => {
		let o = t(n.value);
		if (o > r && !a?.skipChecks && a?.direction !== "backward") {
			for (let [t, r] of rn(e._zod.def.checks)) if (o > t && r._zod.def.when(n)) {
				let t = n.issues.length;
				return r._zod.check(n), n.issues[t].continue = !1, an(n.issues, t, e), n;
			}
		}
		return i(n, a);
	};
}
var nr = (e) => Array.isArray(e) ? e.length : -1;
function rr(e, t, n) {
	e.issues.length && t.issues.push(...tn(n, e.issues)), t.value[n] = e.value;
}
var ir = /*@__PURE__*/ G("$ZodArray", (e, t) => {
	qn.init(e, t);
	let n = Tn.memoizer;
	n?.attach(e), e._zod.parse = (r, i) => {
		let a = r.value;
		if (!Array.isArray(a)) return r.issues.push({
			expected: "array",
			code: "invalid_type",
			input: a,
			inst: e
		}), r;
		r.value = n ? n.alloc(e, r, Array(a.length), i) : Array(a.length);
		let o = [], s = i?.abortEarly;
		for (let e = 0; e < a.length; e++) {
			let n = a[e], c = t.element._zod.run({
				value: n,
				issues: []
			}, i);
			if (c instanceof Promise) o.push(c.then((t) => rr(t, r, e)));
			else if (rr(c, r, e), s && c.issues.length !== 0 && $t(c)) break;
		}
		return o.length ? Promise.all(o).then(() => r) : r;
	}, tr(e, nr);
});
function ar(e, t, n, r, i, a) {
	let o = n in r, s = a === "optional";
	if (o || !s || i !== "optional") {
		if (e.issues.length) {
			if (i !== void 0 && s && !o) return;
			t.issues.push(...tn(n, e.issues));
		}
		!o && i === void 0 ? e.issues.length || t.issues.push({
			code: "invalid_type",
			expected: "nonoptional",
			input: void 0,
			path: [n]
		}) : e.value === void 0 ? (o || i === "defaulted" && !s) && (t.value[n] = void 0) : t.value[n] = e.value;
	}
}
var or = [];
function sr(e) {
	let t = Object.keys(e.shape), n = Object.getOwnPropertySymbols(e.shape), r = n.length ? n : or, i = r.length ? [...t, ...r] : t;
	for (let t of i) if (!e.shape?.[t]?._zod?.traits?.has("$ZodType")) throw Error(`Invalid element at key "${String(t)}": expected a Zod schema`);
	let a = Xt(e.shape);
	return {
		...e,
		allKeys: i,
		symbolKeys: r,
		keySet: new Set(t),
		numKeys: t.length,
		optionalKeys: new Set(a)
	};
}
function cr(e, t, n, r, i, a, o) {
	let s = [], c = i.keySet, l = i.catchall._zod, u = l.def.type, d = l.optin, f = l.optout, p = 0;
	for (let i in t) {
		if (o && n.issues.length !== p) {
			if ($t(n, p)) break;
			p = n.issues.length;
		}
		if (c.has(i)) continue;
		if (i === "__proto__") {
			u === "never" && s.push(i);
			continue;
		}
		if (u === "never") {
			s.push(i);
			continue;
		}
		let a = l.run({
			value: t[i],
			issues: []
		}, r);
		a instanceof Promise ? e.push(a.then((e) => ar(e, n, i, t, d, f))) : ar(a, n, i, t, d, f);
	}
	return s.length && n.issues.push({
		code: "unrecognized_keys",
		keys: s,
		input: t,
		inst: a,
		continue: !0
	}), e.length ? Promise.all(e).then(() => n) : n;
}
var lr = /*@__PURE__*/ G("$ZodObject", (e, t) => {
	qn.init(e, t);
	let n = Object.getOwnPropertyDescriptor(t, "shape"), r = n?.get ? n.get.raw : t.shape ?? {};
	if (r) {
		let e = () => {
			let n = { ...r };
			return Object.defineProperty(t, "shape", { value: n }), e.raw = n, n;
		};
		e.raw = r, Object.defineProperty(t, "shape", { get: e });
	}
	let i = Mt(() => sr(t));
	vn(e, "propValues", (e) => {
		let t = e.def.shape, n = {};
		for (let e in t) {
			let r = t[e]._zod;
			if (r.values) {
				Object.prototype.hasOwnProperty.call(n, e) || Ft(n, e, /* @__PURE__ */ new Set());
				for (let t of r.values) n[e].add(t);
				r.optin !== void 0 && n[e].add(void 0);
			}
		}
		return n;
	});
	let a = Wt, o = t.catchall, s, c = Tn.memoizer;
	c?.attach(e), e._zod.parse = (t, n) => {
		s ??= i.value;
		let r = t.value;
		if (!a(r)) return t.issues.push({
			expected: "object",
			code: "invalid_type",
			input: r,
			inst: e
		}), t;
		t.value = c ? c.alloc(e, t, {}, n) : {};
		let l = [], u = s.shape, d = n?.abortEarly, f = t.issues.length;
		for (let e of s.allKeys) {
			if (d && t.issues.length !== f) {
				if ($t(t, f)) break;
				f = t.issues.length;
			}
			if (e === "__proto__") continue;
			let i = u[e], a = i._zod.optin, o = i._zod.optout, s = i._zod.run({
				value: r[e],
				issues: []
			}, n);
			s instanceof Promise ? l.push(s.then((n) => ar(n, t, e, r, a, o))) : ar(s, t, e, r, a, o);
		}
		return o ? cr(l, r, t, n, i.value, e, d === !0) : l.length ? Promise.all(l).then(() => t) : t;
	};
});
function ur(e, t, n, r) {
	for (let n of e) if (n.issues.length === 0) return t.value = n.value, t;
	let i = e.filter((e) => !$t(e));
	return i.length === 1 ? (t.value = i[0].value, i[0]) : (t.issues.push({
		code: "invalid_union",
		input: t.value,
		inst: n,
		errors: e.map((e) => e.issues.map((e) => on(e, r, En())))
	}), t);
}
var dr = /*@__PURE__*/ G("$ZodUnion", (e, t) => {
	qn.init(e, t), vn(e, "optin", (e) => e.def.options.some((e) => e._zod.optin === "defaulted") ? "defaulted" : e.def.options.some((e) => e._zod.optin !== void 0) ? "optional" : void 0), vn(e, "optout", (e) => e.def.options.some((e) => e._zod.optout === "optional") ? "optional" : void 0), vn(e, "values", (e) => {
		if (e.def.options.every((e) => e._zod.values)) return new Set(e.def.options.flatMap((e) => Array.from(e._zod.values)));
	}), vn(e, "pattern", (e) => {
		if (e.def.options.every((e) => e._zod.pattern)) {
			let t = e.def.options.map((e) => e._zod.pattern);
			return RegExp(`^(${t.map((e) => Pt(e.source)).join("|")})$`);
		}
	});
	let n = t.options.length === 1 ? t.options[0]._zod.run : null;
	e._zod.parse = (r, i) => {
		if (n) return n(r, i);
		let a = !1, o = [];
		for (let e of t.options) {
			let t = e._zod.run({
				value: r.value,
				issues: []
			}, i);
			if (t instanceof Promise) o.push(t), a = !0;
			else {
				if (t.issues.length === 0) return t;
				o.push(t);
			}
		}
		return a ? Promise.all(o).then((t) => ur(t, r, e, i)) : ur(o, r, e, i);
	};
});
function fr(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e.options) {
		let r = n._zod.propValues?.[e.discriminator];
		if (!r || r.size === 0) throw Error(`Invalid discriminated union option at index "${e.options.indexOf(n)}"`);
		for (let e of r) if (t.has(e)) {
			if (e !== void 0) throw Error(`Duplicate discriminator value "${String(e)}"`);
			t.set(e, null);
		} else t.set(e, n);
	}
	return t;
}
var pr = /*@__PURE__*/ G("$ZodDiscriminatedUnion", (e, t) => {
	t.inclusive = !1, dr.init(e, t);
	let n = e._zod.parse;
	vn(e, "propValues", (e) => {
		let t = {}, n = 0;
		for (let r of e.def.options) {
			let i = r._zod.propValues;
			if (!i || Object.keys(i).length === 0) throw Error(`Invalid discriminated union option at index "${e.def.options.indexOf(r)}"`);
			i[e.def.discriminator]?.has(void 0) && n++;
			for (let [e, n] of Object.entries(i)) {
				Object.prototype.hasOwnProperty.call(t, e) || Ft(t, e, /* @__PURE__ */ new Set());
				for (let r of n) t[e].add(r);
			}
		}
		return !e.def.unionFallback && n > 1 && t[e.def.discriminator]?.delete(void 0), t;
	}), t.options.forEach((e, n) => {
		let r = It(e._zod.def);
		if (r && !Object.prototype.hasOwnProperty.call(r, t.discriminator)) throw Error(`Invalid discriminated union option at index "${n}"`);
	});
	let r = Mt(() => fr(t));
	e._zod.parse = (i, a) => {
		let o = i.value;
		if (!Wt(o)) return i.issues.push({
			code: "invalid_type",
			expected: "object",
			input: o,
			inst: e
		}), i;
		let s = o?.[t.discriminator], c = r.value.get(s);
		return c && (s !== void 0 || a.direction !== "backward") ? c._zod.run(i, a) : t.unionFallback || a.direction === "backward" ? n(i, a) : (i.issues.push({
			code: "invalid_union",
			errors: [],
			note: "No matching discriminator",
			discriminator: t.discriminator,
			options: Array.from(r.value.keys()).filter((e) => r.value.get(e) !== null),
			input: o,
			path: [t.discriminator],
			inst: e
		}), i);
	};
}), mr = /*@__PURE__*/ G("$ZodRecord", (e, t) => {
	qn.init(e, t);
	let n = Tn.memoizer;
	n?.attach(e), e._zod.parse = (r, i) => {
		let a = r.value;
		if (!Gt(a)) return r.issues.push({
			expected: "record",
			code: "invalid_type",
			input: a,
			inst: e
		}), r;
		let o = [], s = t.keyType._zod.values;
		if (s && !t.partial) {
			r.value = n ? n.alloc(e, r, {}, i) : {};
			let c = /* @__PURE__ */ new Set();
			for (let n of s) if (typeof n == "string" || typeof n == "number" || typeof n == "symbol") {
				if (c.add(typeof n == "number" ? n.toString() : n), n === "__proto__") continue;
				let s = t.keyType._zod.run({
					value: n,
					issues: []
				}, i);
				if (s instanceof Promise) throw Error("Async schemas not supported in object keys currently");
				if (s.issues.length) {
					r.issues.push({
						code: "invalid_key",
						origin: "record",
						issues: s.issues.map((e) => on(e, i, En())),
						input: n,
						path: [n],
						inst: e
					});
					continue;
				}
				let l = s.value;
				if (l === "__proto__") continue;
				let u = t.valueType._zod.run({
					value: a[n],
					issues: []
				}, i);
				u instanceof Promise ? o.push(u.then((e) => {
					e.issues.length && r.issues.push(...tn(n, e.issues)), r.value[l] = e.value;
				})) : (u.issues.length && r.issues.push(...tn(n, u.issues)), r.value[l] = u.value);
			}
			let l;
			for (let e in a) if (!c.has(e)) {
				if (t.mode === "loose") {
					if (e === "__proto__") continue;
					r.value[e] = a[e];
				} else l ??= [], l.push(e);
			}
			l && l.length > 0 && r.issues.push({
				code: "unrecognized_keys",
				input: a,
				inst: e,
				keys: l,
				continue: !0
			});
		} else {
			r.value = n ? n.alloc(e, r, {}, i) : {};
			let c;
			for (let n of Reflect.ownKeys(a)) {
				if (n === "__proto__" || !Object.prototype.propertyIsEnumerable.call(a, n)) continue;
				let l = t.keyType._zod.run({
					value: n,
					issues: []
				}, i);
				if (l instanceof Promise) throw Error("Async schemas not supported in object keys currently");
				if (typeof n == "string" && zn.test(n) && l.issues.length) {
					let e = t.keyType._zod.run({
						value: Number(n),
						issues: []
					}, i);
					if (e instanceof Promise) throw Error("Async schemas not supported in object keys currently");
					e.issues.length === 0 && (l = e);
				}
				if (l.issues.length) {
					t.mode === "loose" ? r.value[n] = a[n] : s ? (c ??= [], c.push(n)) : r.issues.push({
						code: "invalid_key",
						origin: "record",
						issues: l.issues.map((e) => on(e, i, En())),
						input: n,
						path: [n],
						inst: e
					});
					continue;
				}
				let u = l.value;
				if (u === "__proto__") continue;
				let d = t.valueType._zod.run({
					value: a[n],
					issues: []
				}, i);
				d instanceof Promise ? o.push(d.then((e) => {
					e.issues.length && r.issues.push(...tn(n, e.issues)), r.value[u] = e.value;
				})) : (d.issues.length && r.issues.push(...tn(n, d.issues)), r.value[u] = d.value);
			}
			c && c.length > 0 && r.issues.push({
				code: "unrecognized_keys",
				input: a,
				inst: e,
				keys: c,
				continue: !0
			});
		}
		return o.length ? Promise.all(o).then(() => r) : r;
	};
}), hr = /*@__PURE__*/ G("$ZodEnum", (e, t) => {
	qn.init(e, t);
	let n = kt(t.entries), r = new Set(n);
	e._zod.values = r, vn(e, "pattern", (e) => {
		let t = kt(e.def.entries).filter((e) => Kt.has(typeof e));
		return RegExp(t.length ? `^(${t.map((e) => qt(e.toString())).join("|")})$` : "^[^\\s\\S]$");
	}), e._zod.parse = (t, i) => {
		let a = t.value;
		return r.has(a) || t.issues.push({
			code: "invalid_value",
			values: n,
			input: a,
			inst: e
		}), t;
	};
}), gr = /*@__PURE__*/ G("$ZodLiteral", (e, t) => {
	qn.init(e, t);
	let n = new Set(t.values);
	e._zod.values = n, vn(e, "pattern", (e) => {
		let t = e.def.values;
		return RegExp(t.length ? `^(${t.map((e) => typeof e == "string" ? qt(e) : e ? qt(e.toString()) : String(e)).join("|")})$` : "^[^\\s\\S]$");
	}), e._zod.parse = (r, i) => {
		let a = r.value;
		return n.has(a) || r.issues.push({
			code: "invalid_value",
			values: t.values,
			input: a,
			inst: e
		}), r;
	};
});
function _r(e, t) {
	return e.value = t.issues.length ? void 0 : t.value, e;
}
var vr = /*@__PURE__*/ G("$ZodOptional", (e, t) => {
	qn.init(e, t), vn(e, "optin", (e) => e.def.innerType._zod.optin === "defaulted" ? "defaulted" : "optional"), e._zod.optout = "optional", vn(e, "values", (e) => {
		let t = e.def.innerType._zod.values;
		return t ? /* @__PURE__ */ new Set([...t, void 0]) : void 0;
	}), vn(e, "pattern", (e) => {
		let t = e.def.innerType._zod.pattern;
		return t ? RegExp(`^(${Pt(t.source)})?$`) : void 0;
	}), e._zod.parse = (e, n) => {
		if (e.value === void 0) {
			if (t.innerType._zod.optin !== "defaulted") return e;
			let r = t.innerType._zod.run({
				value: e.value,
				issues: []
			}, n);
			return r instanceof Promise ? r.then((t) => _r(e, t)) : _r(e, r);
		}
		return t.innerType._zod.run(e, n);
	};
}), yr = /*@__PURE__*/ G("$ZodNullable", (e, t) => {
	qn.init(e, t), vn(e, "optin", (e) => e.def.innerType._zod.optin), vn(e, "optout", (e) => e.def.innerType._zod.optout), vn(e, "pattern", (e) => {
		let t = e.def.innerType._zod.pattern;
		return t ? RegExp(`^(${Pt(t.source)}|null)$`) : void 0;
	}), vn(e, "values", (e) => e.def.innerType._zod.values ? /* @__PURE__ */ new Set([...e.def.innerType._zod.values, null]) : void 0), e._zod.parse = (e, n) => e.value === null ? e : t.innerType._zod.run(e, n);
});
// ../vibebook/node_modules/zod/v4/core/api.js
function br(e) {
	return e.checks &&= [...e.checks], e;
}
// @__NO_SIDE_EFFECTS__
function xr(e, t) {
	return new e(br({
		type: "string",
		...Yt(t)
	}));
}
// @__NO_SIDE_EFFECTS__
function Sr(e, t) {
	return new e(br({
		type: "number",
		checks: [],
		...Yt(t)
	}));
}
// @__NO_SIDE_EFFECTS__
function Cr(e, t) {
	return new e({
		type: "boolean",
		...Yt(t)
	});
}
// @__NO_SIDE_EFFECTS__
function wr(e, t) {
	return new e({
		type: "never",
		...Yt(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Tr(e, t) {
	return new Un({
		check: "max_length",
		...Yt(t),
		maximum: e
	});
}
// @__NO_SIDE_EFFECTS__
function Er(e, t) {
	return new Wn({
		check: "min_length",
		...Yt(t),
		minimum: e
	});
}
// @__NO_SIDE_EFFECTS__
function Dr(e, t) {
	return new Gn({
		check: "string_format",
		format: "starts_with",
		...Yt(t),
		prefix: e
	});
}
// ../vibebook/node_modules/zod/v4/mini/schemas.js
var Or = /*@__PURE__*/ G("ZodMiniType", (e, t) => {
	if (!e._zod) throw Error("Uninitialized schema in ZodMiniType.");
	qn.init(e, t), e.def = t, e.type = t.type;
}, {
	get with() {
		return this.check;
	},
	set with(e) {
		dn(this, "with", e);
	},
	parse(e, t) {
		return Nn(this, e, t, { callee: this.parse });
	},
	parseAsync(e, t) {
		return Pn(this, e, t, { callee: this.parseAsync });
	},
	safeParse(e, t) {
		return Fn(this, e, t);
	},
	safeParseAsync(e, t) {
		return Ln(this, e, t);
	},
	check(...e) {
		let t = this.def;
		return this.clone({
			...t,
			checks: [...t.checks ?? [], ...e.map((e) => typeof e == "function" ? { _zod: {
				check: e,
				def: { check: "custom" },
				onattach: []
			} } : e)]
		}, { parent: !0 });
	},
	clone(e, t) {
		return Jt(this, e, t);
	},
	brand() {
		return this;
	},
	register(e, t) {
		return e.add(this, t), this;
	},
	apply(e, ...t) {
		return t.length === 0 ? e(this) : e(this, ...t);
	}
}), kr = /*@__PURE__*/ G("ZodMiniString", (e, t) => {
	Zn.init(e, t), Or.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function K(e) {
	return /* @__PURE__ */ xr(kr, e);
}
var Ar = /*@__PURE__*/ G("ZodMiniNumber", (e, t) => {
	Qn.init(e, t), Or.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function jr(e) {
	return /* @__PURE__ */ Sr(Ar, e);
}
var Mr = /*@__PURE__*/ G("ZodMiniBoolean", (e, t) => {
	$n.init(e, t), Or.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function Nr(e) {
	return /* @__PURE__ */ Cr(Mr, e);
}
var Pr = /*@__PURE__*/ G("ZodMiniNever", (e, t) => {
	er.init(e, t), Or.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function Fr(e) {
	return /* @__PURE__ */ wr(Pr, e);
}
var Ir = /*@__PURE__*/ G("ZodMiniArray", (e, t) => {
	ir.init(e, t), Or.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function q(e, t) {
	return new Ir({
		type: "array",
		element: e,
		...Yt(t)
	});
}
var Lr = /*@__PURE__*/ G("ZodMiniObject", (e, t) => {
	lr.init(e, t), Or.init(e, t), yn(e, "shape", (e) => e._zod.def.shape, !1);
});
// @__NO_SIDE_EFFECTS__
function J(e, t) {
	return new Lr({
		type: "object",
		shape: e ?? {},
		...Yt(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Rr(e, t) {
	return Zt(e, t);
}
var zr = /*@__PURE__*/ G("ZodMiniUnion", (e, t) => {
	dr.init(e, t), Or.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function Br(e, t) {
	return new zr({
		type: "union",
		options: e,
		...Yt(t)
	});
}
var Vr = /*@__PURE__*/ G("ZodMiniDiscriminatedUnion", (e, t) => {
	pr.init(e, t), Or.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function Hr(e, t, n) {
	return new Vr({
		type: "union",
		options: t,
		discriminator: e,
		...Yt(n)
	});
}
var Ur = /*@__PURE__*/ G("ZodMiniRecord", (e, t) => {
	mr.init(e, t), Or.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function Wr(e, t, n) {
	return !t || !t._zod ? new Ur({
		type: "record",
		keyType: /* @__PURE__ */ K(),
		valueType: e,
		...Yt(t)
	}) : new Ur({
		type: "record",
		keyType: e,
		valueType: t,
		...Yt(n)
	});
}
var Gr = /*@__PURE__*/ G("ZodMiniEnum", (e, t) => {
	hr.init(e, t), Or.init(e, t), e.options = [...e._zod.values];
});
// @__NO_SIDE_EFFECTS__
function Kr(e, t) {
	return new Gr({
		type: "enum",
		entries: Array.isArray(e) ? Object.fromEntries(e.map((e) => [e, e])) : e,
		...Yt(t)
	});
}
var qr = /*@__PURE__*/ G("ZodMiniLiteral", (e, t) => {
	gr.init(e, t), Or.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function Y(e, t) {
	return new qr({
		type: "literal",
		values: Array.isArray(e) ? e : [e],
		...Yt(t)
	});
}
var Jr = /*@__PURE__*/ G("ZodMiniOptional", (e, t) => {
	vr.init(e, t), Or.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function X(e) {
	return new Jr({
		type: "optional",
		innerType: e
	});
}
var Yr = /*@__PURE__*/ G("ZodMiniNullable", (e, t) => {
	yr.init(e, t), Or.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function Xr(e) {
	return new Yr({
		type: "nullable",
		innerType: e
	});
}
// shared/room.ts
var Z = /* @__PURE__ */ K(), Zr = /* @__PURE__ */ jr(), Qr = /* @__PURE__ */ Nr(), Q = (e) => /* @__PURE__ */ X(e), $r = (e) => /* @__PURE__ */ X(/* @__PURE__ */ Xr(e)), ei = /* @__PURE__ */ q(Z), ti = [
	"todo",
	"doing",
	"review",
	"done"
], ni = /* @__PURE__ */ J({
	title: Z,
	owner: Z,
	summary: $r(Z),
	folder: $r(Z)
}), ri = /* @__PURE__ */ J({
	title: Z,
	tasks: ei,
	why: Q(Z)
}), ii = /* @__PURE__ */ J({
	id: Zr,
	text: Z,
	who: Z,
	kind: Z,
	ts: Zr
}), ai = /* @__PURE__ */ J({
	id: Z,
	kind: Z,
	ref: Z,
	title: Q(Z),
	author: Q(Z),
	ts: Q(Zr)
}), oi = /* @__PURE__ */ J({
	id: Z,
	question: Z,
	options: ei,
	multi: Qr,
	closed: Qr,
	author: Z,
	votes: /* @__PURE__ */ q(ei)
}), si = /* @__PURE__ */ J({
	id: Z,
	title: Z,
	done: Qr,
	status: /* @__PURE__ */ Kr(ti),
	owner: $r(Z),
	due: $r(Z),
	flags: Q(ei),
	epic_id: Q(Z)
}), ci = /* @__PURE__ */ J({
	id: Z,
	title: Z,
	tasks: /* @__PURE__ */ q(si),
	archived: Q(Qr),
	owner: $r(Z),
	from_msg: $r(Zr),
	parent: $r(Z),
	kept: Q(Qr),
	files: Q(/* @__PURE__ */ q(/* @__PURE__ */ J({
		id: Z,
		name: Z,
		type: Z,
		n: Zr
	}))),
	flags: Q(ei),
	prod: $r(/* @__PURE__ */ J({
		stage: Z,
		note: Q(Z),
		at: Q(Zr)
	}))
}), li = /* @__PURE__ */ J({
	id: Z,
	name: Z,
	type: Z,
	size: Zr,
	author: Z,
	ts: Zr,
	embed: Q(Qr)
}), ui = /* @__PURE__ */ J({
	id: Zr,
	thread: Z,
	author: Z,
	ts: Zr,
	text: Z,
	kind: $r(Z),
	tag: $r(Z),
	via: $r(Z),
	reply_to: $r(Zr),
	choices: $r(Z),
	poll: $r(Z),
	card: $r(Z),
	quiet: Q(Qr),
	cut: Q(Qr),
	for_who: $r(Z),
	files: Q(/* @__PURE__ */ q(li))
}), di = /* @__PURE__ */ J({
	msg_id: Zr,
	agent: Q(Z),
	email: Z,
	who: Z,
	status: Z,
	ts: Zr,
	note: $r(Z)
}), fi = /* @__PURE__ */ J({
	id: Z,
	name: $r(Z),
	text: Z,
	owner: Z,
	enabled: Qr,
	error: $r(Z),
	every: $r(Z),
	cron: $r(Z),
	next_at: $r(Zr),
	thread: Q(Z),
	tz: Q(Z),
	file_id: $r(Z)
}), pi = /* @__PURE__ */ J({
	email: Z,
	name: $r(Z),
	ts: Zr
}), mi = /* @__PURE__ */ J({
	email: Z,
	who: Z,
	read: Zr,
	delivered: Zr,
	agent: Q(Z),
	ts: Q(Zr)
}), hi = /* @__PURE__ */ J({
	me: Z,
	book: ni,
	messages: /* @__PURE__ */ q(ui),
	epics: /* @__PURE__ */ q(ci),
	roomTasks: Q(/* @__PURE__ */ q(si)),
	members: ei,
	online: ei,
	names: Q(/* @__PURE__ */ Wr(Z, Z)),
	avatars: Q(/* @__PURE__ */ Wr(Z, Zr)),
	pending: Q(ei),
	requests: Q(/* @__PURE__ */ q(pi)),
	suggestions: /* @__PURE__ */ q(ri),
	files: Q(/* @__PURE__ */ q(li)),
	filesN: Q(Zr),
	filesAll: Q(Qr),
	reminders: Q(/* @__PURE__ */ q(fi)),
	acks: Q(/* @__PURE__ */ q(di)),
	receipts: Q(/* @__PURE__ */ q(mi)),
	counts: Q(/* @__PURE__ */ Wr(Z, Zr)),
	countsAt: Q(Zr),
	full: Q(ei),
	complete: Q(Qr),
	origins: Q(/* @__PURE__ */ q(ui)),
	docs: Q(/* @__PURE__ */ Wr(Z, Z)),
	doc: Q(Z),
	docNotes: Q(ei),
	decisions: Q(/* @__PURE__ */ q(ii)),
	pins: Q(/* @__PURE__ */ q(ai)),
	polls: Q(/* @__PURE__ */ Wr(Z, oi))
}), gi = {
	todo: "A fazer",
	doing: "Fazendo",
	review: "Esperando OK",
	done: "Feito"
}, _i = ti.map((e) => ({
	value: e,
	label: gi[e]
}));
function vi(e, t) {
	let n = t === "main" || t.startsWith("pre:") ? null : t, r = n ? e.epics.find((e) => e.id === n) : null, i = n ? r ? [r] : [] : e.epics.filter((e) => !e.archived), a = [...n ? [] : [{
		id: "main",
		title: e.book?.title || "vibebook",
		tasks: e.roomTasks ?? []
	}], ...i].map((e) => ({
		id: e.id,
		title: e.title,
		tasks: e.tasks.map((t) => ({
			...t,
			epicId: e.id,
			epicTitle: e.title
		}))
	}));
	return {
		scope: n,
		missingScope: !(!n || r),
		title: r?.title ?? null,
		groups: a,
		tasks: a.flatMap((e) => e.tasks),
		targets: a.map(({ id: e, title: t }) => ({
			id: e,
			title: t
		}))
	};
}
function yi() {
	try {
		return localStorage.getItem("vb.boardMode") === "list" ? "list" : "board";
	} catch {
		return "board";
	}
}
function bi(e, t) {
	return _i[_i.findIndex((t) => t.value === e) + t]?.value;
}
function xi(e) {
	return _i.some((t) => t.value === e);
}
// svelte/features/board/BoardPanel.svelte
var Si = b("<!> ", 1), Ci = b("<!><span> </span>", 1), wi = b("<span class=\"tw:inline-flex tw:items-center tw:gap-1\"><!> </span>"), Ti = b("<span data-board-drag=\"\" draggable=\"true\" aria-hidden=\"true\" class=\"tw:absolute tw:right-2 tw:top-2 tw:grid tw:size-7 tw:cursor-grab tw:place-items-center tw:rounded-md tw:text-muted-foreground tw:active:cursor-grabbing\"><!></span>"), Ei = b("<article><button type=\"button\" data-board-open=\"\"><span> </span> <!> <span class=\"tw:flex tw:flex-wrap tw:items-center tw:gap-2 tw:text-xs tw:text-muted-foreground\"><!> <!> <!></span></button> <!> <div><!> <!></div></article>"), Di = b("<p class=\"tw:m-0 tw:py-4 tw:text-xs tw:text-muted-foreground\"> </p>"), Oi = b("<section><h3 class=\"tw:m-0 tw:flex tw:items-center tw:justify-between tw:gap-2 tw:font-sans tw:text-sm tw:font-semibold tw:leading-5 tw:tracking-normal\"> <!></h3> <div class=\"tw:space-y-3\"></div></section>"), ki = b("<div class=\"tw:h-full tw:min-h-0 tw:min-w-0 tw:overflow-auto tw:pb-2\"><div class=\"tw:grid tw:grid-cols-[repeat(4,minmax(15rem,1fr))] tw:gap-3\"></div></div>"), Ai = b("<section class=\"tw:space-y-2\"><h3 class=\"tw:m-0 tw:flex tw:items-center tw:gap-2 tw:font-sans tw:text-sm tw:font-semibold tw:leading-5 tw:tracking-normal\"> <!></h3> <!></section>"), ji = b("<div class=\"tw:h-full tw:min-h-0 tw:space-y-5 tw:overflow-auto\"><!> <!></div>"), Mi = b("<div class=\"tw:min-w-32 tw:flex-1 tw:space-y-1\"><!> <!></div>"), Ni = b("<section data-vb-native=\"\" class=\"tw:m-0 tw:box-border tw:flex tw:min-h-0 tw:min-w-0 tw:flex-1 tw:flex-col tw:gap-3 tw:rounded-surface tw:bg-background tw:p-3 tw:font-sans tw:text-sm tw:text-foreground\"><p class=\"tw:m-0 tw:text-xs tw:text-muted-foreground\"> </p> <!> <p role=\"status\" aria-live=\"polite\" class=\"tw:sr-only\"> </p> <p class=\"tw:sr-only\"> </p> <!> <form class=\"tw:flex tw:shrink-0 tw:flex-wrap tw:items-end tw:gap-2\" data-board-add=\"\"><div class=\"tw:min-w-36 tw:flex-1 tw:space-y-1\"><!> <!></div> <!> <!></form></section>");
function Pi(e, n) {
	let r = ne();
	Re(n, !0);
	let i = (e, i = He, a = He, s = He) => {
		var c = Ei(), l = M(c), u = M(l), d = D(u, !0), p = t(u, 2), g = (e) => {
			{
				let n = P(() => `@vibe: ${i().flags.join(" · ")}`);
				Le(e, {
					variant: "warning",
					get title() {
						return j(n);
					},
					children: (e, n) => {
						var r = Si(), a = N(r);
						le(a, {
							name: "warning",
							class: "tw:size-3"
						});
						var o = t(a, 1, !0);
						V((e) => w(o, e), [() => i().flags.join(" · ")]), f(e, r);
					},
					$$slots: { default: !0 }
				});
			}
		};
		R(p, (e) => {
			i().flags?.length && e(g);
		});
		var _ = t(p, 2), v = M(_);
		Le(v, {
			children: (e, t) => {
				F();
				var n = W();
				V(() => w(n, i().epicTitle)), f(e, n);
			},
			$$slots: { default: !0 }
		});
		var b = t(v, 2), x = (e) => {
			var r = Ci(), a = N(r);
			{
				let e = P(() => n.vb.name(i().owner)), t = P(() => `/api/avatar/${encodeURIComponent(i().owner)}`);
				Se(a, {
					get name() {
						return j(e);
					},
					get src() {
						return j(t);
					},
					class: "tw:size-6"
				});
			}
			var o = t(a), s = D(o, !0);
			V((e) => w(s, e), [() => i().owner === n.room.me ? n.vb.t("você") : n.vb.name(i().owner)]), f(e, r);
		};
		R(b, (e) => {
			i().owner && e(x);
		});
		var S = t(b, 2), T = (e) => {
			var n = wi(), r = M(n);
			le(r, {
				name: "calendar",
				class: "tw:size-3"
			});
			var a = t(r, 1, !0);
			z(n), V(() => w(a, i().due)), f(e, n);
		};
		R(S, (e) => {
			i().due && e(T);
		}), z(_), z(l);
		var E = t(l, 2), ee = (e) => {
			var t = Ti(), r = M(t);
			le(r, { name: "grip" }), z(t), V((e) => U(t, "title", e), [() => n.vb.t("Arraste, ou use ← →. Clique pra abrir o épico.")]), f(e, t);
		};
		R(E, (e) => {
			s() || e(ee);
		});
		var te = t(E, 2), ne = M(te);
		{
			let e = P(() => `${r}-${a()}`);
			je(ne, {
				get for() {
					return j(e);
				},
				children: (e, t) => {
					F();
					var r = W();
					V((e) => w(r, e), [() => n.vb.t("Status")]), f(e, r);
				},
				$$slots: { default: !0 }
			});
		}
		var O = t(ne, 2);
		{
			let e = P(() => `${r}-${a()}`), t = P(() => `${n.vb.t("Status")}: ${i().title}`);
			Te(O, {
				get id() {
					return j(e);
				},
				get "aria-label"() {
					return j(t);
				},
				get value() {
					return i().status;
				},
				get items() {
					return j(C);
				},
				onValueChange: (e) => (xi(e) && se(i(), e, a()), !1)
			});
		}
		z(te), z(c), Ge(c, (e, t) => ae?.(e, t), a), V((e, t, n, a) => {
			U(c, "data-board-task", i().id), U(c, "data-status", i().status), U(c, "draggable", !s()), re(c, 1, e), U(l, "data-epic", i().epicId), U(l, "aria-describedby", `${r}-keys`), re(l, 1, t), re(u, 1, n), w(d, i().title), re(te, 1, a);
		}, [
			() => o(ce("tw:relative tw:min-w-0 tw:rounded-control tw:border tw:border-border tw:bg-card tw:text-card-foreground tw:shadow-xs", s() && "tw:flex tw:flex-wrap tw:items-center", j(y) === i().id && "tw:opacity-50", i().status !== "done" && i().owner === n.room.me && "tw:ring-1 tw:ring-ring/20")),
			() => o(ce("tw:block tw:w-full tw:min-w-0 tw:flex-1 tw:space-y-2 tw:rounded-control tw:border-0 tw:bg-transparent tw:p-3 tw:text-left tw:font-sans tw:text-sm tw:text-card-foreground tw:outline-none tw:hover:bg-accent tw:focus-visible:ring-2 tw:focus-visible:ring-ring", !s() && "tw:pr-10")),
			() => o(ce("tw:block tw:break-words tw:font-medium", i().status === "done" && "tw:line-through")),
			() => o(ce("tw:min-w-32 tw:space-y-1 tw:p-3", !s() && "tw:border-t tw:border-border"))
		]), m("dragstart", c, (e) => {
			e.target instanceof Element && e.target.closest("select") ? e.preventDefault() : (e.dataTransfer && (e.dataTransfer.setData("application/x-vibebook-task", i().id), e.dataTransfer.effectAllowed = "move", e.dataTransfer.setDragImage(e.currentTarget, 20, 20)), H(y, i().id, !0));
		}), m("dragend", c, () => {
			H(y, null), H(h, null);
		}), ie("click", l, () => n.onopen?.(i().epicId)), ie("keydown", l, (e) => fe(e, i(), a())), f(e, c);
	}, a = P(() => vi(n.room, n.thread)), s = B(me(yi())), c = B(""), l = B(null), u = B(""), d = B(""), h = B(null), y = B(null), b = B(me(v(() => j(a).targets.find((e) => e.id === j(a).scope) ?? j(a).targets.find((e) => e.id !== "main") ?? j(a).targets[0] ?? {
		id: n.thread,
		title: n.thread
	}))), x = P(() => j(a).targets.some((e) => e.id === j(b).id)), S = P(() => [...j(x) ? [] : [{
		value: j(b).id,
		label: j(b).title,
		disabled: !0
	}], ...j(a).targets.map((e) => ({
		value: e.id,
		label: e.title
	}))]), C = P(() => _i.map((e) => ({
		value: e.value,
		label: n.vb.t(e.label)
	}))), T = P(() => j(a).groups.map((e) => ({
		...e,
		tasks: e.tasks.filter((e) => e.status !== "done")
	})).filter((e) => e.tasks.length)), ee = P(() => j(a).tasks.filter((e) => e.owner === n.room.me && e.status !== "done")), te = /* @__PURE__ */ new Map(), O = 0, k = !1, A = B(null);
	Ne(() => {
		k = !0, O++, te.clear();
	});
	function ae(e, t) {
		return te.set(t, e), { destroy() {
			te.get(t) === e && te.delete(t);
		} };
	}
	function oe(e) {
		try {
			if (n.send(e)) return H(u, ""), !0;
		} catch {}
		return H(u, n.vb.t("Não deu pra enviar agora. Tente de novo."), !0), !1;
	}
	function se(e, t, n) {
		if (e.status === t) return !0;
		let r = document.activeElement, i = r instanceof HTMLElement && te.get(n)?.contains(r) ? r : null;
		return oe({
			t: "task.status",
			id: e.id,
			status: t
		}) ? (H(A, {
			id: e.id,
			status: t,
			generation: ++O,
			...i ? { focus: {
				key: n,
				node: i,
				selector: i.matches("select") ? "select" : "[data-board-open]"
			} } : {}
		}, !0), !0) : !1;
	}
	_(() => {
		let e = j(A);
		if (!e) return;
		let t = [...n.room.roomTasks ?? [], ...n.room.epics.flatMap((e) => e.tasks)].find((t) => t.id === e.id);
		t ? t.status === e.status && (H(A, null), H(d, `${t.title}: ${n.vb.t(_i.find((e) => e.value === t.status)?.label ?? t.status)}`), ue(e)) : (H(A, null), ue(e));
	});
	function ue(e) {
		let t = e.focus;
		!t || document.activeElement !== t.node && document.activeElement !== document.body || p().then(() => {
			if (k || e.generation !== O || document.activeElement !== t.node && document.activeElement !== document.body) return;
			let n = te.get(t.key)?.querySelector(t.selector) ?? j(l);
			n?.focus({ preventScroll: !0 }), n?.scrollIntoView({
				block: "nearest",
				inline: "nearest"
			});
		});
	}
	function I(e) {
		if (e === "board" || e === "list") {
			H(s, e, !0), O++, H(A, null);
			try {
				localStorage.setItem("vb.boardMode", e);
			} catch {}
		}
	}
	function fe(e, t, n) {
		let r = e.key === "ArrowRight" ? bi(t.status, 1) : e.key === "ArrowLeft" ? bi(t.status, -1) : void 0;
		r && (e.preventDefault(), se(t, r, n));
	}
	function pe(e, t) {
		e.preventDefault(), H(h, null);
		let n = e.dataTransfer?.getData("application/x-vibebook-task"), r = j(a).tasks.find((e) => e.id === n);
		H(y, null), r && se(r, t, `board:${r.id}`);
	}
	function ge(e) {
		e.preventDefault(), j(c).trim() && (j(x) ? oe({
			t: "task.add",
			epic: j(b).id,
			title: j(c).trim()
		}) && H(c, "") : H(u, n.vb.t("Escolha um épico."), !0));
	}
	var _e = Ni(), ve = M(_e), ye = D(ve, !0), be = t(ve, 2), xe = (e) => {
		{
			let t = P(() => j(a).missingScope ? n.vb.t("Épico não encontrado.") : j(x) ? j(u) : n.vb.t("Escolha um épico."));
			de(e, {
				get title() {
					return j(t);
				},
				compact: !0
			});
		}
	};
	R(be, (e) => {
		(j(a).missingScope || !j(x) || j(u)) && e(xe);
	});
	var Ce = t(be, 2), we = D(Ce, !0), Ee = t(Ce, 2), De = D(Ee, !0), Oe = t(Ee, 2);
	{
		let e = (e, r = He) => {
			var c = g(), l = N(c), u = (e) => {
				var s = g(), c = N(s), l = (e) => {
					var r = ki(), s = M(r);
					E(s, 21, () => _i, (e) => e.value, (e, r) => {
						let s = P(() => j(a).tasks.filter((e) => e.status === j(r).value));
						var c = Oi(), l = M(c), u = M(l, !0), d = t(u);
						Le(d, {
							children: (e, t) => {
								F();
								var n = W();
								V(() => w(n, j(s).length)), f(e, n);
							},
							$$slots: { default: !0 }
						}), z(l);
						var p = t(l, 2);
						E(p, 21, () => j(s), (e) => e.id, (e, t) => {
							i(e, () => j(t), () => `board:${j(t).id}`, () => !1);
						}, (e) => {
							var t = Di(), i = D(t, !0);
							V((e) => w(i, e), [() => n.vb.t(j(r).value === "todo" ? "Nada a fazer." : "Arraste um card pra cá.")]), f(e, t);
						}), z(p), z(c), V((e, t, n) => {
							U(c, "data-lane", j(r).value), U(c, "aria-label", e), re(c, 1, t), w(u, n);
						}, [
							() => n.vb.t(j(r).label),
							() => o(ce("tw:min-w-0 tw:space-y-3 tw:rounded-surface tw:border tw:border-border tw:bg-muted/40 tw:p-3", j(h) === j(r).value && "tw:ring-2 tw:ring-ring")),
							() => n.vb.t(j(r).label)
						]), m("dragover", c, (e) => {
							e.dataTransfer?.types.includes("application/x-vibebook-task") && (e.preventDefault(), H(h, j(r).value, !0));
						}), m("dragleave", c, () => {
							H(h, null);
						}), m("drop", c, (e) => pe(e, j(r).value)), f(e, c);
					}), z(s), z(r), f(e, r);
				}, u = (e) => {
					var r = ji(), a = M(r), o = (e) => {
						var r = Ai(), a = M(r), o = M(a, !0), s = t(o);
						Le(s, {
							variant: "warning",
							children: (e, t) => {
								F();
								var n = W();
								V(() => w(n, j(ee).length)), f(e, n);
							},
							$$slots: { default: !0 }
						}), z(a);
						var c = t(a, 2);
						E(c, 17, () => j(ee), (e) => e.id, (e, t) => {
							i(e, () => j(t), () => `mine:${j(t).id}`, () => !0);
						}), z(r), V((e, t) => {
							U(r, "aria-label", e), w(o, t);
						}, [() => n.vb.t("Esperando você"), () => n.vb.t("Esperando você")]), f(e, r);
					};
					R(a, (e) => {
						j(ee).length && e(o);
					});
					var s = t(a, 2);
					E(s, 17, () => j(T), (e) => e.id, (e, n) => {
						var r = Ai(), a = M(r), o = M(a, !0), s = t(o);
						Le(s, {
							children: (e, t) => {
								F();
								var r = W();
								V(() => w(r, j(n).tasks.length)), f(e, r);
							},
							$$slots: { default: !0 }
						}), z(a);
						var c = t(a, 2);
						E(c, 17, () => j(n).tasks, (e) => e.id, (e, t) => {
							i(e, () => j(t), () => `group:${j(t).id}`, () => !0);
						}), z(r), V(() => {
							U(r, "aria-label", j(n).title), w(o, j(n).title);
						}), f(e, r);
					}, (e) => {
						{
							let t = P(() => n.vb.t("Nenhuma tarefa aberta."));
							he(e, { get title() {
								return j(t);
							} });
						}
					}), z(r), f(e, r);
				};
				R(c, (e) => {
					r() === "board" ? e(l) : e(u, -1);
				}), f(e, s);
			};
			R(l, (e) => {
				r() === j(s) && e(u);
			}), f(e, c);
		}, r = P(() => n.vb.t("Quadro de tarefas")), c = P(() => [{
			value: "board",
			label: n.vb.t("Quadro")
		}, {
			value: "list",
			label: n.vb.t("Lista")
		}]);
		Pe(Oe, {
			class: "tw:flex-1 tw:overflow-hidden",
			get label() {
				return j(r);
			},
			get items() {
				return j(c);
			},
			get value() {
				return j(s);
			},
			onValueChange: I,
			children: e,
			$$slots: { default: !0 }
		});
	}
	var ke = t(Oe, 2), Ae = M(ke), Fe = M(Ae);
	{
		let e = P(() => `${r}-title`);
		je(Fe, {
			get for() {
				return j(e);
			},
			children: (e, t) => {
				F();
				var r = W();
				V((e) => w(r, e), [() => n.vb.t("Nova tarefa")]), f(e, r);
			},
			$$slots: { default: !0 }
		});
	}
	var Ie = t(Fe, 2);
	{
		let e = P(() => `${r}-title`), t = P(() => n.vb.t("nova tarefa"));
		Ve(Ie, {
			get id() {
				return j(e);
			},
			get placeholder() {
				return j(t);
			},
			get ref() {
				return j(l);
			},
			set ref(e) {
				H(l, e, !0);
			},
			get value() {
				return j(c);
			},
			set value(e) {
				H(c, e, !0);
			}
		});
	}
	z(Ae);
	var ze = t(Ae, 2), Be = (e) => {
		var i = Mi(), o = M(i);
		{
			let e = P(() => `${r}-epic`);
			je(o, {
				get for() {
					return j(e);
				},
				children: (e, t) => {
					F();
					var r = W();
					V((e) => w(r, e), [() => n.vb.t("Épico")]), f(e, r);
				},
				$$slots: { default: !0 }
			});
		}
		var s = t(o, 2);
		{
			let e = P(() => `${r}-epic`), t = P(() => !j(x));
			Te(s, {
				get id() {
					return j(e);
				},
				get "aria-invalid"() {
					return j(t);
				},
				get items() {
					return j(S);
				},
				get value() {
					return j(b).id;
				},
				onValueChange: (e) => {
					let t = j(a).targets.find((t) => t.id === e);
					if (!t) return !1;
					H(b, t, !0), H(u, "");
				}
			});
		}
		z(i), f(e, i);
	};
	R(ze, (e) => {
		j(a).scope || e(Be);
	});
	var Ue = t(ze, 2);
	{
		let e = P(() => !j(c).trim() || !j(x));
		L(Ue, {
			type: "submit",
			get disabled() {
				return j(e);
			},
			children: (e, r) => {
				var i = Si(), a = N(i);
				le(a, { name: "plus" });
				var o = t(a, 1, !0);
				V((e) => w(o, e), [() => n.vb.t("Nova tarefa")]), f(e, i);
			},
			$$slots: { default: !0 }
		});
	}
	z(ke), z(_e), V((e, t, n) => {
		U(_e, "data-board-scope", j(a).scope ?? "all"), U(_e, "aria-label", e), w(ye, t), w(we, j(d)), U(Ee, "id", `${r}-keys`), w(De, n);
	}, [
		() => n.vb.t("Quadro de tarefas"),
		() => j(a).title ?? (j(a).scope ? j(b).title : n.vb.t("Todos os épicos")),
		() => n.vb.t("Arraste, ou use ← →. Clique pra abrir o épico.")
	]), m("submit", ke, ge), f(e, _e), Me();
}
i(["click", "keydown"]);
// svelte/Board.svelte
var Fi = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy"
]);
function Ii(e, t) {
	Re(t, !0);
	let n = Ee(t, Fi);
	var i = g(), a = N(i);
	r(a, () => JSON.stringify([t.room.id, t.thread]), (e) => {
		Pi(e, Ue(() => n));
	}), f(e, i), Me();
}
// svelte/panels.ts
var Li = (e) => e.type.startsWith("image/") ? "img" : e.type.startsWith("audio/") ? "audio" : e.type === "text/html" ? "html" : e.type === "application/pdf" ? "pdf" : /\.md$/i.test(e.name) || e.type === "text/markdown" ? "md" : e.type === "text/plain" || e.type === "text/csv" ? "txt" : "other", Ri = (e) => e > 1e6 ? `${(e / 1e6).toFixed(1)} MB` : `${Math.max(1, Math.round(e / 1e3))} KB`, zi = [
	["all", "Tudo"],
	["img", "Imagens"],
	["md", "Markdown"],
	["txt", "Texto e CSV"],
	["html", "HTML"],
	["pdf", "PDF"],
	["audio", "Áudios"],
	["other", "Outros"]
];
function Bi(e, t, n) {
	let r = (e.files ?? []).map((e, t) => ({
		file: e,
		index: t
	})).sort((e, t) => t.file.ts - e.file.ts || e.index - t.index).map((e) => e.file), i = { all: r.length };
	for (let e of r) {
		let t = Li(e);
		i[t] = (i[t] ?? 0) + 1;
	}
	let a = i[t] ? t : "all", o = r.filter((e) => a === "all" || Li(e) === a), s = (e) => e.name.includes("/") ? e.name.slice(0, e.name.lastIndexOf("/")) : "", c = n && o.some((e) => s(e) === n || s(e).startsWith(n + "/")) ? n : "", l = c ? c + "/" : "", u = /* @__PURE__ */ new Map(), d = [];
	for (let e of o) {
		let t = s(e);
		if (t === c) d.push(e);
		else if (t.startsWith(l)) {
			let e = t.slice(l.length).split("/")[0];
			u.set(e, (u.get(e) ?? 0) + 1);
		}
	}
	let f = /* @__PURE__ */ new Map();
	if (c) for (let e of d) f.set(e.name, (f.get(e.name) ?? 0) + 1);
	return {
		counts: i,
		kind: a,
		dir: c,
		prefix: l,
		list: c ? d.filter((e, t) => d.findIndex((t) => t.name === e.name) === t) : d,
		versions: f,
		folders: [...u].sort(([e], [t]) => e.localeCompare(t))
	};
}
function Vi(e, t) {
	return e.files?.find((e) => e.id === t.id && e.name === t.name && e.type === t.type && e.ts === t.ts && e.size === t.size && e.author === t.author);
}
// svelte/Files.svelte
var Hi = b(" <small> </small>", 1), Ui = b("<div class=\"tw:flex tw:flex-wrap tw:gap-1\"></div>"), Wi = b("<div class=\"tw:flex tw:items-center tw:gap-2\"><!><!><b> </b></div>"), Gi = b("<!><b> </b><small> </small>", 1), Ki = b("<img class=\"tw:h-24 tw:w-full tw:rounded-md tw:object-contain\" loading=\"lazy\"/>"), qi = b("<!> <b class=\"tw:break-all\"> </b><small class=\"tw:text-muted-foreground\"> </small>", 1), Ji = b("<article class=\"tw:min-w-0 tw:rounded-lg tw:border tw:border-border tw:bg-card tw:p-3\"><!> <!></article>"), Yi = b("<p> </p>"), Xi = b("<!> <!> <div class=\"tw:grid tw:grid-cols-2 tw:gap-3 tw:sm:grid-cols-3\"><!> <!></div> <!>", 1), Zi = b("<p role=\"status\"> </p>"), Qi = b("<p role=\"alert\" class=\"tw:text-destructive\"> </p> <!>", 1), $i = b("<p role=\"alert\" class=\"tw:text-destructive\"> </p>"), ea = b("<section data-vb-native=\"files\" class=\"tw:flex tw:flex-col tw:gap-3 tw:p-3 tw:font-sans tw:text-sm tw:text-foreground\"><!> <!> <!> <!></section>");
function ta(e, n) {
	Re(n, !0);
	let r = () => ge(j(s), "$fileState", i), [i, a] = pe(), o = !1;
	ze(() => (o = !0, () => {
		o = !1;
	}));
	let s = P(() => n.session.state), c = P(() => Bi(n.room, r().kind, r().directory));
	_(() => {
		n.session.sync(n.room);
	});
	let l = (e) => e === "unconfirmed" ? n.vb.t("Ainda não recebi a confirmação. Confira antes de tentar de novo.") : e;
	function u(e, t, r = !1) {
		o && (n.session.select(e, t), r && n.onfolderchange());
	}
	var d = ea(), p = M(d), m = (e) => {
		var i = Xi(), a = N(i), s = (e) => {
			var r = Ui();
			E(r, 21, () => zi.filter(([e]) => j(c).counts[e]), we, (e, r) => {
				var i = P(() => fe(j(r), 2));
				let a = () => j(i)[0], o = () => j(i)[1];
				{
					let r = P(() => j(c).kind === a() ? "secondary" : "ghost"), i = P(() => j(c).kind === a());
					L(e, {
						get variant() {
							return j(r);
						},
						size: "sm",
						get "data-fkind"() {
							return a();
						},
						get "aria-pressed"() {
							return j(i);
						},
						onclick: () => u(a(), j(c).dir),
						children: (e, r) => {
							F();
							var i = Hi(), s = N(i), l = t(s), u = D(l, !0);
							V((e) => {
								w(s, `${e ?? ""} `), w(u, j(c).counts[a()]);
							}, [() => n.vb.t(o())]), f(e, i);
						},
						$$slots: { default: !0 }
					});
				}
			}), z(r), V((e) => U(r, "aria-label", e), [() => n.vb.t("Arquivos")]), f(e, r);
		};
		R(a, (e) => {
			j(c).counts.all > 1 && e(s);
		});
		var l = t(a, 2), d = (e) => {
			var r = Wi(), i = M(r);
			L(i, {
				variant: "ghost",
				size: "sm",
				onclick: () => u(j(c).kind, j(c).dir.includes("/") ? j(c).dir.slice(0, j(c).dir.lastIndexOf("/")) : "", !0),
				children: (e, t) => {
					F();
					var r = W();
					V((e) => w(r, `← ${e ?? ""}`), [() => n.vb.t("voltar")]), f(e, r);
				},
				$$slots: { default: !0 }
			});
			var a = t(i);
			le(a, { name: "folder" });
			var o = t(a), s = D(o);
			z(r), V(() => w(s, `${j(c).dir ?? ""}/`)), f(e, r);
		};
		R(l, (e) => {
			j(c).dir && e(d);
		});
		var p = t(l, 2), m = M(p);
		E(m, 17, () => j(c).folders, we, (e, r) => {
			var i = P(() => fe(j(r), 2));
			let a = () => j(i)[0], o = () => j(i)[1];
			{
				let r = P(() => j(c).prefix + a());
				L(e, {
					get "data-fdir"() {
						return j(r);
					},
					variant: "outline",
					class: "tw:h-auto tw:flex-col tw:items-start tw:whitespace-normal tw:p-3",
					onclick: () => u(j(c).kind, j(c).prefix + a(), !0),
					children: (e, r) => {
						var i = Gi(), s = N(i);
						le(s, {
							name: "folder",
							class: "tw:size-8"
						});
						var c = t(s), l = D(c), u = t(c), d = D(u, !0);
						V((e) => {
							w(l, `${a() ?? ""}/`), w(d, e);
						}, [() => o() === 1 ? n.vb.t("1 arquivo") : n.vb.t("{n} arquivos", { n: o() })]), f(e, i);
					},
					$$slots: { default: !0 }
				});
			}
		});
		var h = t(m, 2);
		E(h, 17, () => j(c).list, (e) => e.id, (e, i) => {
			let a = P(() => n.room.pins?.some((e) => e.kind === "file" && e.ref === j(i).id) ?? !1);
			var s = Ji(), l = M(s);
			L(l, {
				variant: "ghost",
				class: "tw:h-auto tw:w-full tw:min-w-0 tw:flex-col tw:items-start tw:gap-2 tw:whitespace-normal tw:p-0 tw:text-left",
				get title() {
					return j(i).name;
				},
				onclick: (e) => {
					o && e.currentTarget.isConnected && n.session.open(j(i), n.onopenfile);
				},
				children: (e, r) => {
					var a = qi(), o = N(a), s = (e) => {
						var t = Ki();
						V((e) => {
							U(t, "src", e), U(t, "alt", j(i).name);
						}, [() => `/api/books/${encodeURIComponent(n.room.id)}/files/${encodeURIComponent(j(i).id)}`]), f(e, t);
					}, l = P(() => j(i).type.startsWith("image/")), u = (e) => {
						le(e, {
							name: "file",
							class: "tw:size-8"
						});
					};
					R(o, (e) => {
						j(l) ? e(s) : e(u, -1);
					});
					var d = t(o, 2), p = D(d, !0), m = t(d), h = D(m);
					V((e, t, n, r) => {
						w(p, e), w(h, `${t ?? ""} · ${n ?? ""} · ${r ?? ""}`);
					}, [
						() => j(i).name.slice(j(c).prefix.length),
						() => n.vb.name(j(i).author),
						() => n.vb.ago(j(i).ts),
						() => (j(c).versions.get(j(i).name) ?? 0) > 1 ? n.vb.t("{n} versões", { n: j(c).versions.get(j(i).name) }) : Ri(j(i).size)
					]), f(e, a);
				},
				$$slots: { default: !0 }
			});
			var u = t(l, 2);
			{
				let e = P(() => n.vb.t(j(a) ? "Desafixar" : "Fixar na lateral")), t = P(() => !!r().pending), s = P(() => r().pending?.id === j(i).id);
				De(u, {
					icon: "pin",
					get label() {
						return j(e);
					},
					get "aria-pressed"() {
						return j(a);
					},
					get disabled() {
						return j(t);
					},
					get loading() {
						return j(s);
					},
					onclick: (e) => {
						o && e.currentTarget.isConnected && n.session.toggle(j(i), n.request);
					}
				});
			}
			z(s), V(() => U(s, "data-file-id", j(i).id)), f(e, s);
		}), z(p);
		var g = t(p, 2), _ = (e) => {
			var t = Yi(), r = D(t, !0);
			V((e) => w(r, e), [() => n.vb.t("Nada aqui.")]), f(e, t);
		};
		R(g, (e) => {
			!j(c).list.length && !j(c).folders.length && e(_);
		}), f(e, i);
	}, h = (e) => {
		var t = Yi(), r = D(t, !0);
		V((e) => w(r, e), [() => n.vb.t("Cole uma imagem no chat (Cmd+V), arraste um arquivo ou use o clipe. Tudo que for enviado neste vibebook fica aqui.")]), f(e, t);
	};
	R(p, (e) => {
		n.room.files?.length ? e(m) : !r().loading && !r().loadError && e(h, 1);
	});
	var g = t(p, 2), v = (e) => {
		var t = Zi(), r = D(t, !0);
		V((e) => w(r, e), [() => n.vb.t("Carregando…")]), f(e, t);
	};
	R(g, (e) => {
		r().loading && e(v);
	});
	var y = t(g, 2), b = (e) => {
		var i = Qi(), a = N(i), s = D(a, !0), c = t(a, 2);
		L(c, {
			variant: "outline",
			onclick: () => {
				o && n.session.load(n.request);
			},
			children: (e, t) => {
				F();
				var r = W();
				V((e) => w(r, e), [() => n.vb.t("Tentar novamente")]), f(e, r);
			},
			$$slots: { default: !0 }
		}), V((e) => w(s, e), [() => l(r().loadError)]), f(e, i);
	};
	R(y, (e) => {
		r().loadError && e(b);
	});
	var x = t(y, 2), S = (e) => {
		var t = $i(), n = D(t, !0);
		V((e) => w(n, e), [() => l(r().error)]), f(e, t);
	};
	R(x, (e) => {
		r().error && e(S);
	}), z(d), V((e) => U(d, "aria-label", e), [() => n.vb.t("Arquivos")]), f(e, d), Me(), a();
}
// svelte/features/decisions/model.ts
var na = {
	schedule: (e, t) => setTimeout(e, t),
	cancel: (e) => clearTimeout(e)
}, ra = 1e4, ia = (e) => e.slice().reverse();
function aa(e, t = na) {
	let n = ye({
		pending: {},
		issues: {}
	}), r = !0, i = [], a = /* @__PURE__ */ new Map();
	function o(e, r) {
		let i = a.get(e);
		i?.timer !== void 0 && t.cancel(i.timer), a.delete(e), n.update((t) => {
			let n = { ...t.pending }, i = { ...t.issues };
			return delete n[e], r ? i[e] = r : delete i[e], {
				pending: n,
				issues: i
			};
		});
	}
	return {
		state: n,
		sync(e) {
			if (r) {
				i = e;
				for (let e of a.keys()) i.some((t) => t.id === e) || o(e);
				for (let e of Object.keys(Oe(n).issues).map(Number)) i.some((t) => t.id === e) || o(e);
			}
		},
		async remove(s, c, l) {
			if (!r || s !== e || a.has(c) || !i.some((e) => e.id === c)) return;
			let u = Symbol();
			a.set(c, { token: u }), n.update((e) => {
				let t = { ...e.issues };
				return delete t[c], {
					pending: {
						...e.pending,
						[c]: !0
					},
					issues: t
				};
			});
			let d = () => r && a.get(c)?.token === u;
			try {
				let e = await l({
					t: "decision.del",
					id: c
				});
				if (!d()) return;
				if (!e.ok) {
					o(c, e.error);
					return;
				}
				let n = a.get(c);
				n.timer = t.schedule(() => {
					d() && o(c, "unconfirmed");
				}, ra);
			} catch (e) {
				d() && o(c, e instanceof Error ? e.message : "failed");
			}
		},
		dispose() {
			r = !1;
			for (let e of a.values()) e.timer !== void 0 && t.cancel(e.timer);
			a.clear();
		}
	};
}
// svelte/lib/ui/AlertDialog.svelte
var oa = b("<p role=\"alert\" class=\"tw:m-0 tw:text-sm tw:text-destructive\"> </p>"), sa = b("<!> <!> <!> <div class=\"tw:flex tw:flex-wrap tw:justify-end tw:gap-2\"><!> <!></div>", 1), ca = b("<!> <!>", 1);
function la(e, r) {
	Re(r, !0);
	let i = I(r, "open", 15, !1), a = I(r, "busy", 3, !1), o = I(r, "error", 3, ""), s = B(null);
	_(() => {
		if (i()) return We(() => {
			i(!1), r.onOpenChange?.(!1);
		});
	});
	var c = g(), l = N(c);
	A(l, () => et, (e, c) => {
		c(e, {
			get onOpenChange() {
				return r.onOpenChange;
			},
			get open() {
				return i();
			},
			set open(e) {
				i(e);
			},
			children: (e, i) => {
				var c = g(), l = N(c);
				A(l, () => n, (e, n) => {
					n(e, {
						children: (e, n) => {
							var i = ca(), c = N(i);
							A(c, () => O, (e, t) => {
								t(e, {
									"data-vb-native": !0,
									class: "tw:fixed tw:inset-0 tw:z-40 tw:m-0 tw:box-border tw:bg-scrim"
								});
							});
							var l = t(c, 2);
							A(l, () => ut, (e, n) => {
								n(e, {
									"data-vb-native": !0,
									preventScroll: !1,
									preventBodyPointerEvents: !1,
									preventOverflowTextSelection: !1,
									onOpenAutoFocus: (e) => {
										e.preventDefault(), j(s)?.focus();
									},
									onCloseAutoFocus: (e) => {
										let t = r.returnFocus?.();
										t?.isConnected && (e.preventDefault(), t.focus());
									},
									onEscapeKeydown: (e) => {
										a() && e.preventDefault();
									},
									class: "tw:fixed tw:left-1/2 tw:top-1/2 tw:z-50 tw:m-0 tw:box-border tw:flex tw:max-h-[90dvh] tw:w-[calc(100%-2rem)] tw:max-w-lg tw:-translate-x-1/2 tw:-translate-y-1/2 tw:flex-col tw:gap-4 tw:overflow-auto tw:rounded-surface tw:border tw:border-solid tw:border-border tw:bg-card tw:p-6 tw:font-sans tw:text-sm tw:text-card-foreground tw:shadow-lg tw:outline-none",
									children: (e, n) => {
										var i = sa(), c = N(i);
										A(c, () => Ce, (e, t) => {
											t(e, {
												class: "tw:m-0 tw:text-lg tw:font-semibold tw:leading-6 tw:tracking-tight",
												children: (e, t) => {
													F();
													var n = W();
													V(() => w(n, r.title)), f(e, n);
												},
												$$slots: { default: !0 }
											});
										});
										var l = t(c, 2), u = (e) => {
											var t = g(), n = N(t);
											A(n, () => Ke, (e, t) => {
												t(e, {
													class: "tw:m-0 tw:whitespace-pre-wrap tw:break-words tw:text-sm tw:text-muted-foreground",
													children: (e, t) => {
														F();
														var n = W();
														V(() => w(n, r.description)), f(e, n);
													},
													$$slots: { default: !0 }
												});
											}), f(e, t);
										};
										R(l, (e) => {
											r.description && e(u);
										});
										var d = t(l, 2), p = (e) => {
											var t = oa(), n = D(t, !0);
											V(() => w(n, o())), f(e, t);
										};
										R(d, (e) => {
											o() && e(p);
										});
										var m = t(d, 2), h = M(m);
										{
											let e = P(() => qe({ variant: "outline" }));
											A(h, () => ot, (t, n) => {
												n(t, {
													get disabled() {
														return a();
													},
													get class() {
														return j(e);
													},
													get ref() {
														return j(s);
													},
													set ref(e) {
														H(s, e, !0);
													},
													children: (e, t) => {
														F();
														var n = W();
														V(() => w(n, r.cancelLabel)), f(e, n);
													},
													$$slots: { default: !0 }
												});
											});
										}
										var _ = t(h, 2);
										{
											let e = P(() => a() || void 0), t = P(() => qe({ variant: "destructive" }));
											A(_, () => rt, (n, i) => {
												i(n, {
													get disabled() {
														return a();
													},
													get "aria-busy"() {
														return j(e);
													},
													onclick: (e) => {
														e.preventDefault(), r.onconfirm();
													},
													get class() {
														return j(t);
													},
													children: (e, t) => {
														F();
														var n = W();
														V(() => w(n, r.confirmLabel)), f(e, n);
													},
													$$slots: { default: !0 }
												});
											});
										}
										z(m), f(e, i);
									},
									$$slots: { default: !0 }
								});
							}), f(e, i);
						},
						$$slots: { default: !0 }
					});
				}), f(e, c);
			},
			$$slots: { default: !0 }
		});
	}), f(e, c), Me();
}
// svelte/features/decisions/DecisionsPanel.svelte
var ua = b("<p role=\"status\" class=\"tw:m-0 tw:text-xs tw:text-muted-foreground\"> </p>"), da = b("<p role=\"alert\" class=\"tw:m-0 tw:whitespace-pre-wrap tw:break-words tw:text-sm tw:text-destructive\"> </p>"), fa = b("<div class=\"tw:min-w-0 tw:flex-1 tw:space-y-2\"><p class=\"tw:m-0 tw:whitespace-pre-wrap tw:break-words tw:leading-6\"> </p> <div class=\"tw:flex tw:flex-wrap tw:items-center tw:gap-2 tw:text-xs tw:text-muted-foreground\"><!> <span class=\"tw:break-words\"> </span><time> </time></div> <!> <!></div> <!>", 1), pa = b("<article><!></article>"), ma = b("<section tabindex=\"-1\" data-vb-native=\"\" data-decisions-panel=\"\" class=\"tw:space-y-4 tw:p-4 tw:font-sans tw:text-sm tw:text-foreground\"><div class=\"tw:flex tw:items-center tw:gap-2\"><!> <!></div> <!></section> <!>", 1);
function ha(e, n) {
	Re(n, !0);
	let r = () => ge(s, "$view", i), [i, a] = pe(), o = v(() => aa(n.room.id)), s = o.state, c = P(() => n.room.decisions || []), l = P(() => ia(j(c))), u = B(null), d = B(!1), p = B(null), m = B(null), h = (e) => e ? ["offline", "disconnected"].includes(e) ? n.vb.t("sem conexão") : ["timeout", "unconfirmed"].includes(e) ? n.vb.t("Ainda não recebi a confirmação. Confira antes de tentar de novo.") : e : "";
	_(() => {
		o.sync(j(c)), j(u) && !j(c).some((e) => e.id === j(u).id) && (H(d, !1), H(u, null));
	}), Ne(() => o.dispose());
	var g = ma(), y = N(g), b = M(y), x = M(b);
	Ie(x, {
		children: (e, t) => {
			F();
			var r = W();
			V((e) => w(r, e), [() => n.vb.t("Decisões")]), f(e, r);
		},
		$$slots: { default: !0 }
	});
	var S = t(x, 2);
	Le(S, {
		children: (e, t) => {
			F();
			var n = W();
			V(() => w(n, j(c).length)), f(e, n);
		},
		$$slots: { default: !0 }
	}), z(b);
	var C = t(b, 2);
	E(C, 17, () => j(l), (e) => e.id, (e, i) => {
		var a = pa(), o = M(a);
		be(o, {
			class: "tw:flex tw:items-start tw:gap-3 tw:p-4",
			children: (e, a) => {
				var o = fa(), s = N(o), c = M(s), l = D(c, !0), m = t(c, 2), g = M(m);
				{
					let e = P(() => j(i).kind === "approval" ? "success" : "neutral");
					Le(g, {
						get variant() {
							return j(e);
						},
						children: (e, t) => {
							F();
							var r = W();
							V((e) => w(r, e), [() => j(i).kind === "approval" ? `✓ ${n.vb.t("aprovado")}` : n.vb.t("decidido")]), f(e, r);
						},
						$$slots: { default: !0 }
					});
				}
				var _ = t(g, 2), v = D(_, !0), y = t(_), b = D(y, !0);
				z(m);
				var x = t(m, 2), S = (e) => {
					var t = ua(), r = D(t, !0);
					V((e) => w(r, e), [() => n.vb.t("Aguardando confirmação…")]), f(e, t);
				};
				R(x, (e) => {
					r().pending[j(i).id] && e(S);
				});
				var C = t(x, 2), T = (e) => {
					var t = da(), n = D(t, !0);
					V((e) => w(n, e), [() => h(r().issues[j(i).id])]), f(e, t);
				};
				R(C, (e) => {
					r().issues[j(i).id] && e(T);
				}), z(s);
				var E = t(s, 2);
				{
					let e = P(() => n.vb.t("Apagar registro")), t = P(() => !!r().pending[j(i).id]);
					De(E, {
						get "data-ddel"() {
							return j(i).id;
						},
						get label() {
							return j(e);
						},
						icon: "close",
						get disabled() {
							return j(t);
						},
						onclick: (e) => {
							H(u, j(i), !0), H(p, e.currentTarget, !0), H(d, !0);
						}
					});
				}
				V((e, t) => {
					w(l, j(i).text), w(v, j(i).who), U(y, "datetime", e), w(b, t);
				}, [() => new Date(j(i).ts).toISOString(), () => n.vb.ago(j(i).ts)]), f(e, o);
			},
			$$slots: { default: !0 }
		}), z(a), V(() => U(a, "data-decision-id", j(i).id)), f(e, a);
	}, (e) => {
		{
			let t = P(() => n.vb.t("Decisões")), r = P(() => n.vb.t("O que a sala decidir e cada aprovação aparecem aqui. Os agents registram conforme a conversa anda."));
			he(e, {
				icon: "check",
				get title() {
					return j(t);
				},
				get description() {
					return j(r);
				}
			});
		}
	}), z(y), oe(y, (e) => H(m, e), () => j(m));
	var T = t(y, 2);
	{
		let e = P(() => n.vb.t("Apagar esse registro?")), t = P(() => j(u)?.text), i = P(() => n.vb.t("Apagar registro")), a = P(() => n.vb.t("Cancelar")), s = P(() => !!(j(u) && r().pending[j(u).id])), c = P(() => j(u) ? h(r().issues[j(u).id]) : "");
		la(T, {
			get title() {
				return j(e);
			},
			get description() {
				return j(t);
			},
			get confirmLabel() {
				return j(i);
			},
			get cancelLabel() {
				return j(a);
			},
			get busy() {
				return j(s);
			},
			get error() {
				return j(c);
			},
			onconfirm: () => {
				j(u) && o.remove(n.room.id, j(u).id, n.request);
			},
			returnFocus: () => j(p)?.isConnected ? j(p) : j(m),
			get open() {
				return j(d);
			},
			set open(e) {
				H(d, e, !0);
			}
		});
	}
	f(e, g), Me(), a();
}
// svelte/Decisions.svelte
function ga(e, t) {
	Re(t, !0);
	var n = g(), i = N(n);
	r(i, () => t.room.id, (e) => {
		ha(e, {
			get room() {
				return t.room;
			},
			get vb() {
				return t.vb;
			},
			get request() {
				return t.request;
			}
		});
	}), f(e, n), Me();
}
var _a = /* @__PURE__ */ Br([/* @__PURE__ */ J({
	ok: /* @__PURE__ */ Y(!0),
	id: /* @__PURE__ */ jr(),
	thread: /* @__PURE__ */ K()
}), /* @__PURE__ */ J({
	ok: /* @__PURE__ */ Y(!1),
	error: /* @__PURE__ */ K()
})]), va = /* @__PURE__ */ J({
	ok: /* @__PURE__ */ Nr(),
	name: /* @__PURE__ */ X(/* @__PURE__ */ K()),
	error: /* @__PURE__ */ X(/* @__PURE__ */ K()),
	every: /* @__PURE__ */ X(/* @__PURE__ */ Xr(/* @__PURE__ */ K())),
	cron: /* @__PURE__ */ X(/* @__PURE__ */ Xr(/* @__PURE__ */ K())),
	timezone: /* @__PURE__ */ X(/* @__PURE__ */ K()),
	next_at: /* @__PURE__ */ X(/* @__PURE__ */ K())
}), ya = /* @__PURE__ */ J({
	id: /* @__PURE__ */ K(),
	name: /* @__PURE__ */ K(),
	type: /* @__PURE__ */ K(),
	size: /* @__PURE__ */ jr(),
	author: /* @__PURE__ */ K(),
	ts: /* @__PURE__ */ jr(),
	embed: /* @__PURE__ */ X(/* @__PURE__ */ Nr())
}), ba = /* @__PURE__ */ Rr(ya, { reminder: /* @__PURE__ */ X(va) }), xa = /* @__PURE__ */ J({ error: /* @__PURE__ */ K() });
(/* @__PURE__ */ K()).check(/* @__PURE__ */ Dr("https://"), /* @__PURE__ */ Tr(1e3)), (/* @__PURE__ */ K()).check(/* @__PURE__ */ Er(1)), (/* @__PURE__ */ K()).check(/* @__PURE__ */ Er(1)), (/* @__PURE__ */ K()).check(/* @__PURE__ */ Er(1)), (/* @__PURE__ */ K()).check(/* @__PURE__ */ Dr("m"));
var Sa = /* @__PURE__ */ J({ ok: /* @__PURE__ */ Y(!0) }), Ca = /* @__PURE__ */ J({
	ok: /* @__PURE__ */ Y(!0),
	icon: /* @__PURE__ */ Xr(/* @__PURE__ */ jr())
}), wa = /* @__PURE__ */ K(), Ta = /* @__PURE__ */ jr(), Ea = /* @__PURE__ */ Hr("t", [
	/* @__PURE__ */ J({
		t: /* @__PURE__ */ Y("msg"),
		thread: /* @__PURE__ */ K(),
		text: /* @__PURE__ */ X(/* @__PURE__ */ K()),
		files: /* @__PURE__ */ X(/* @__PURE__ */ q(/* @__PURE__ */ K())),
		reply_to: /* @__PURE__ */ X(/* @__PURE__ */ Xr(Ta))
	}),
	/* @__PURE__ */ J({ t: /* @__PURE__ */ Y("files.get") }),
	/* @__PURE__ */ J({
		t: /* @__PURE__ */ Y("doc.get"),
		epic: /* @__PURE__ */ X(/* @__PURE__ */ Xr(/* @__PURE__ */ K()))
	}),
	/* @__PURE__ */ J({
		t: /* @__PURE__ */ Y("doc"),
		text: /* @__PURE__ */ K(),
		epic: /* @__PURE__ */ X(/* @__PURE__ */ Xr(/* @__PURE__ */ K()))
	}),
	/* @__PURE__ */ J({
		t: /* @__PURE__ */ Y("title"),
		title: /* @__PURE__ */ K()
	}),
	/* @__PURE__ */ J({
		t: /* @__PURE__ */ Y("epic"),
		title: /* @__PURE__ */ K()
	}),
	/* @__PURE__ */ J({
		t: /* @__PURE__ */ Y("epic.owner"),
		id: wa,
		owner: /* @__PURE__ */ K()
	}),
	/* @__PURE__ */ J({
		t: /* @__PURE__ */ Y("task.add"),
		epic: /* @__PURE__ */ K(),
		title: /* @__PURE__ */ K()
	}),
	/* @__PURE__ */ J({
		t: /* @__PURE__ */ Y("older"),
		thread: /* @__PURE__ */ K(),
		before: /* @__PURE__ */ X(Ta)
	}),
	/* @__PURE__ */ J({
		t: /* @__PURE__ */ Y("pin.add"),
		kind: /* @__PURE__ */ Kr([
			"link",
			"file",
			"app"
		]),
		ref: /* @__PURE__ */ K(),
		title: /* @__PURE__ */ X(/* @__PURE__ */ K())
	}),
	/* @__PURE__ */ J({
		t: /* @__PURE__ */ Y("pin.del"),
		id: wa
	}),
	/* @__PURE__ */ J({
		t: /* @__PURE__ */ Y("reminder.delete"),
		id: wa
	}),
	/* @__PURE__ */ J({
		t: /* @__PURE__ */ Y("ack.dismiss"),
		id: Ta
	}),
	/* @__PURE__ */ J({
		t: /* @__PURE__ */ Y("reminder.enable"),
		id: wa,
		on: /* @__PURE__ */ Nr()
	}),
	/* @__PURE__ */ J({
		t: /* @__PURE__ */ Y("task.toggle"),
		id: wa
	}),
	/* @__PURE__ */ J({
		t: /* @__PURE__ */ Y("task.status"),
		id: wa,
		status: /* @__PURE__ */ Kr(ti)
	}),
	/* @__PURE__ */ J({
		t: /* @__PURE__ */ Y("task.rename"),
		id: wa,
		title: /* @__PURE__ */ K()
	}),
	/* @__PURE__ */ J({
		t: /* @__PURE__ */ Y("task.del"),
		id: wa
	}),
	/* @__PURE__ */ J({
		t: /* @__PURE__ */ Y("task.assign"),
		id: wa,
		owner: /* @__PURE__ */ X(/* @__PURE__ */ K()),
		due: /* @__PURE__ */ X(/* @__PURE__ */ K())
	}),
	/* @__PURE__ */ J({
		t: /* @__PURE__ */ Y("decision.del"),
		id: Ta
	}),
	/* @__PURE__ */ J({
		t: /* @__PURE__ */ Y("epic.rename"),
		id: wa,
		title: /* @__PURE__ */ K()
	}),
	/* @__PURE__ */ J({
		t: /* @__PURE__ */ Y("epic.del"),
		id: wa
	}),
	/* @__PURE__ */ J({
		t: /* @__PURE__ */ Y("epic.archive"),
		id: wa,
		archived: /* @__PURE__ */ X(/* @__PURE__ */ Nr())
	}),
	/* @__PURE__ */ J({
		t: /* @__PURE__ */ Y("epic.order"),
		ids: /* @__PURE__ */ q(/* @__PURE__ */ K())
	}),
	/* @__PURE__ */ J({
		t: /* @__PURE__ */ Y("poll.create"),
		thread: /* @__PURE__ */ K(),
		question: /* @__PURE__ */ K(),
		options: /* @__PURE__ */ q(/* @__PURE__ */ K()),
		multi: /* @__PURE__ */ Nr()
	}),
	/* @__PURE__ */ J({
		t: /* @__PURE__ */ Y("vote"),
		id: wa,
		opt: Ta
	}),
	/* @__PURE__ */ J({
		t: /* @__PURE__ */ Y("poll.close"),
		id: wa
	}),
	/* @__PURE__ */ J({
		t: /* @__PURE__ */ Y("suggestion"),
		i: Ta,
		accept: /* @__PURE__ */ X(/* @__PURE__ */ Nr())
	})
]), Da = (/* @__PURE__ */ K()).check(/* @__PURE__ */ Er(1), /* @__PURE__ */ Tr(64)), Oa = /* @__PURE__ */ Br([/* @__PURE__ */ J({
	t: /* @__PURE__ */ Y("result"),
	cid: Da,
	ok: /* @__PURE__ */ Y(!0)
}), /* @__PURE__ */ J({
	t: /* @__PURE__ */ Y("result"),
	cid: Da,
	ok: /* @__PURE__ */ Y(!1),
	error: /* @__PURE__ */ K()
})]), ka = /* @__PURE__ */ K(), Aa = /* @__PURE__ */ jr(), ja = /* @__PURE__ */ q(ka), $ = (e, t) => /* @__PURE__ */ J({
	t: /* @__PURE__ */ Y(e),
	...t
}), Ma = $("doc", {
	text: ka,
	epic: /* @__PURE__ */ X(/* @__PURE__ */ Xr(ka)),
	stale: /* @__PURE__ */ X(/* @__PURE__ */ Y(!1)),
	fetched: /* @__PURE__ */ X(/* @__PURE__ */ Nr()),
	by: /* @__PURE__ */ X(ka)
}), Na = $("doc", {
	epic: ka,
	stale: /* @__PURE__ */ Y(!0),
	by: /* @__PURE__ */ X(ka),
	text: /* @__PURE__ */ X(/* @__PURE__ */ Fr()),
	fetched: /* @__PURE__ */ X(/* @__PURE__ */ Fr())
}), Pa = {
	state: /* @__PURE__ */ Rr(hi, { t: /* @__PURE__ */ Y("state") }),
	msg: $("msg", { m: ui }),
	moved: $("moved", {
		id: Aa,
		thread: ka
	}),
	delta: $("delta", {
		id: Aa,
		text: ka
	}),
	typing: $("typing", {
		id: Aa,
		mode: ka,
		note: /* @__PURE__ */ X(ka)
	}),
	closed: $("closed", {
		id: Aa,
		choices: ka
	}),
	epics: $("epics", {
		epics: /* @__PURE__ */ q(ci),
		roomTasks: /* @__PURE__ */ X(/* @__PURE__ */ q(si))
	}),
	epicsPatch: $("epicsPatch", {
		changed: /* @__PURE__ */ q(ci),
		order: ja,
		roomTasks: /* @__PURE__ */ X(/* @__PURE__ */ q(si))
	}),
	doc: /* @__PURE__ */ Br([Na, Ma]),
	docNotes: $("docNotes", { notes: ja }),
	meta: $("meta", {
		title: /* @__PURE__ */ X(ka),
		folder: /* @__PURE__ */ X(ka),
		summary: /* @__PURE__ */ X(ka)
	}),
	suggestions: $("suggestions", { suggestions: /* @__PURE__ */ q(ri) }),
	requests: $("requests", { requests: /* @__PURE__ */ q(pi) }),
	members: $("members", {
		members: ja,
		pending: /* @__PURE__ */ X(ja),
		requests: /* @__PURE__ */ X(/* @__PURE__ */ q(pi)),
		names: /* @__PURE__ */ X(/* @__PURE__ */ Wr(ka, ka)),
		avatars: /* @__PURE__ */ X(/* @__PURE__ */ Wr(ka, Aa))
	}),
	files: $("files", { files: /* @__PURE__ */ q(li) }),
	fileAdd: $("fileAdd", { file: li }),
	reminders: $("reminders", { reminders: /* @__PURE__ */ q(fi) }),
	decisions: $("decisions", { decisions: /* @__PURE__ */ q(ii) }),
	pins: $("pins", { pins: /* @__PURE__ */ q(ai) }),
	receipts: $("receipts", { receipts: /* @__PURE__ */ q(mi) }),
	older: $("older", {
		messages: /* @__PURE__ */ q(ui),
		thread: ka,
		more: /* @__PURE__ */ Nr()
	}),
	acks: $("acks", { acks: /* @__PURE__ */ q(di) }),
	ackRows: $("ackRows", { acks: /* @__PURE__ */ q(di) }),
	poll: $("poll", { poll: oi }),
	online: $("online", { online: ja }),
	conns: $("conns", {}),
	error: $("error", { error: /* @__PURE__ */ X(ka) }),
	blocked: $("blocked", {
		text: ka,
		reason: ka
	}),
	result: Oa
};
function Fa(e) {
	if (typeof e != "object" || !e || Array.isArray(e)) return !1;
	let t = e.t;
	return typeof t != "string" || !Object.hasOwn(Pa, t) ? !1 : Pa[t].safeParse(e).success;
}
// shared/validation.ts
var Ia = (e) => typeof e == "object" && !!e && !Array.isArray(e), La = Fa;
function Ra(e) {
	if (!Ia(e)) return e;
	let t = (e, t) => Ia(e) && (e[t] === 0 || e[t] === 1) ? {
		...e,
		[t]: e[t] === 1
	} : e, n = (e) => Array.isArray(e) ? e.map((e) => t(e, "done")) : e, r = (e) => Array.isArray(e) ? e.map((e) => Ia(e) ? {
		...e,
		tasks: n(e.tasks)
	} : e) : e, i = (e) => Array.isArray(e) ? e.map((e) => t(e, "enabled")) : e;
	return e.t === "state" || e.t === "epics" ? {
		...e,
		epics: r(e.epics),
		...e.roomTasks === void 0 ? {} : { roomTasks: n(e.roomTasks) },
		...e.reminders === void 0 ? {} : { reminders: i(e.reminders) }
	} : e.t === "epicsPatch" ? {
		...e,
		changed: r(e.changed),
		...e.roomTasks === void 0 ? {} : { roomTasks: n(e.roomTasks) }
	} : e.t === "reminders" ? {
		...e,
		reminders: i(e.reminders)
	} : e;
}
function za(e) {
	let t = Ra(JSON.parse(e));
	if (!La(t)) throw TypeError("Invalid room event");
	return t;
}
function Ba(e) {
	return Ea.safeParse(e).success;
}
// ../vibebook/node_modules/hono/dist/client/utils.js
var Va = (e, t) => (e = e.replace(/\/+$/, ""), e += "/", t = t.replace(/^\/+/, ""), e + t), Ha = (e, t) => {
	for (let [n, r] of Object.entries(t)) {
		let t = RegExp("/:" + n + "(?:{[^/]+})?\\??(?=/|$)");
		e = e.replace(t, () => r ? `/${r}` : "");
	}
	return e;
}, Ua = (e) => {
	let t = new URLSearchParams();
	for (let [n, r] of Object.entries(e)) if (r !== void 0) {
		if (Array.isArray(r)) for (let e of r) e !== void 0 && t.append(n, e);
		else t.set(n, r);
	}
	return t;
}, Wa = (e, t) => {
	switch (t) {
		case "ws": return e.replace(/^http/, "ws");
		case "http": return e.replace(/^ws/, "http");
	}
}, Ga = (e) => /^https?:\/\/[^\/]+?\/index(?=\?|$)/.test(e) ? e.replace(/\/index(?=\?|$)/, "/") : e.replace(/\/index(?=\?|$)/, "");
function Ka(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function qa(e, t) {
	if (!Ka(e) && !Ka(t)) return t;
	let n = { ...e };
	for (let e in t) {
		let r = t[e];
		n[e] = Ka(n[e]) && Ka(r) ? qa(n[e], r) : r;
	}
	return n;
}
// ../vibebook/node_modules/hono/dist/utils/cookie.js
var Ja = /^[\w!#$%&'*.^`|~+-]+$/, Ya = (e, t, n = {}) => {
	if (!Ja.test(e)) throw Error("Invalid cookie name");
	let r = `${e}=${t}`;
	if (e.startsWith("__Secure-") && !n.secure) throw Error("__Secure- Cookie must have Secure attributes");
	if (e.startsWith("__Host-")) {
		if (!n.secure) throw Error("__Host- Cookie must have Secure attributes");
		if (n.path !== "/") throw Error("__Host- Cookie must have Path attributes with \"/\"");
		if (n.domain) throw Error("__Host- Cookie must not have Domain attributes");
	}
	for (let e of [
		"domain",
		"path",
		"sameSite",
		"priority"
	]) if (n[e] && /[;\r\n]/.test(n[e])) throw Error(`${e} must not contain ";", "\\r", or "\\n"`);
	if (n && typeof n.maxAge == "number" && n.maxAge >= 0) {
		if (n.maxAge > 3456e4) throw Error("Cookies Max-Age SHOULD NOT be greater than 400 days (34560000 seconds) in duration.");
		r += `; Max-Age=${n.maxAge | 0}`;
	}
	if (n.domain && n.prefix !== "host" && (r += `; Domain=${n.domain}`), n.path && (r += `; Path=${n.path}`), n.expires) {
		if (n.expires.getTime() - Date.now() > 3456e7) throw Error("Cookies Expires SHOULD NOT be greater than 400 days (34560000 seconds) in the future.");
		r += `; Expires=${n.expires.toUTCString()}`;
	}
	if (n.httpOnly && (r += "; HttpOnly"), n.secure && (r += "; Secure"), n.sameSite && (r += `; SameSite=${n.sameSite.charAt(0).toUpperCase() + n.sameSite.slice(1)}`), n.priority && (r += `; Priority=${n.priority.charAt(0).toUpperCase() + n.priority.slice(1)}`), n.partitioned) {
		if (!n.secure) throw Error("Partitioned Cookie must have Secure attributes");
		r += "; Partitioned";
	}
	return r;
}, Xa = (e, t, n) => (t = encodeURIComponent(t), Ya(e, t, n)), Za = (e, t) => new Proxy(() => {}, {
	get(n, r) {
		if (typeof r == "string" && r !== "then") return Za(e, [...t, r]);
	},
	apply(n, r, i) {
		return e({
			path: t,
			args: i
		});
	}
}), Qa = (e, t) => {
	let n = t.toString();
	return n ? `${e}?${n}` : e;
}, $a = class {
	url;
	method;
	buildSearchParams;
	queryParams = void 0;
	pathParams = {};
	rBody;
	cType = void 0;
	constructor(e, t, n) {
		this.url = e, this.method = t, this.buildSearchParams = n.buildSearchParams;
	}
	fetch = async (e, t) => {
		if (e) {
			if (e.query && (this.queryParams = this.buildSearchParams(e.query)), e.form) {
				let t = new FormData();
				for (let [n, r] of Object.entries(e.form)) if (r !== void 0) {
					if (Array.isArray(r)) for (let e of r) e !== void 0 && t.append(n, e);
					else t.append(n, r);
				}
				this.rBody = t;
			}
			e.json !== void 0 && (this.rBody = JSON.stringify(e.json), this.cType = "application/json"), e.param && (this.pathParams = e.param);
		}
		let n = this.method.toUpperCase(), r = {
			...e?.header,
			...typeof t?.headers == "function" ? await t.headers() : t?.headers
		};
		if (e?.cookie) {
			let t = [];
			for (let [n, r] of Object.entries(e.cookie)) r !== void 0 && t.push(Xa(n, r));
			t.length > 0 && (r.Cookie = t.join("; "));
		}
		this.cType && (r["Content-Type"] = this.cType);
		let i = new Headers();
		for (let [e, t] of Object.entries(r)) t !== void 0 && i.set(e, t);
		let a = this.url;
		a = Ga(a), a = Ha(a, this.pathParams), this.queryParams && (a = Qa(a, this.queryParams)), n = this.method.toUpperCase();
		let o = n !== "GET" && n !== "HEAD";
		return (t?.fetch || fetch)(a, {
			body: o ? this.rBody : void 0,
			method: n,
			headers: i,
			...t?.init
		});
	};
}, eo = (e, t) => Za(function n(r) {
	let i = t?.buildSearchParams ?? Ua, a = [...r.path], o = a.slice(-3).reverse();
	if (o[0] === "toString") return o[1] === "name" ? o[2] || "" : n.toString();
	if (o[0] === "valueOf") return o[1] === "name" ? o[2] || "" : n;
	let s = "";
	if (/^\$/.test(o[0])) {
		let e = a.pop();
		e && (s = e.replace(/^\$/, ""));
	}
	let c = Va(e, a.join("/"));
	if (s === "url" || s === "path") {
		let t = Ga(c);
		return r.args[0] && (r.args[0].param && (t = Ha(t, r.args[0].param)), r.args[0].query && (t = Qa(t, i(r.args[0].query)))), s === "url" ? new URL(t) : t.slice(e.replace(/\/+$/, "").length).replace(/^\/?/, "/");
	}
	if (s === "ws") {
		let e = Ga(c), n = Wa(r.args[0]?.param ? Ha(e, r.args[0].param) : e, "ws"), a = new URL(n), o = r.args[0]?.query;
		return o && i(o).forEach((e, t) => {
			a.searchParams.append(t, e);
		}), ((...e) => t?.webSocket !== void 0 && typeof t.webSocket == "function" ? t.webSocket(...e) : new WebSocket(...e))(a.toString());
	}
	let l = new $a(c, s, { buildSearchParams: i });
	if (s) {
		t ??= {};
		let e = { ...r.args[1] }, n = t.headers, i = e.headers;
		n && i && (e.headers = async () => ({
			...typeof n == "function" ? await n() : n,
			...typeof i == "function" ? await i() : i
		}));
		let a = qa(t, e);
		return l.fetch(r.args[0], a);
	}
	return l;
}, []), to = (e = "/", t) => eo(e, t ? { fetch: t } : {});
// svelte/transport.ts
function no(e, t, n) {
	if (!Ba(t)) throw TypeError("Invalid room command");
	return !e || e.readyState !== 1 ? !1 : (e.send(JSON.stringify(n ? {
		...t,
		cid: n
	} : t)), !0);
}
function ro(e) {
	if (typeof e != "string") throw TypeError("Room events must be JSON text");
	return za(e);
}
async function io(e) {
	try {
		return await e.json();
	} catch (t) {
		throw e.ok ? t : Error(`HTTP ${e.status}`);
	}
}
function ao(e, t) {
	let n = xa.safeParse(t);
	return Error(n.success ? n.data.error : `HTTP ${e.status}`);
}
function oo(e, t = fetch) {
	let n = to("/", t).api.books[":id"], r = encodeURIComponent(e);
	return {
		async postMessage(e) {
			let t = await n.post.$post({
				param: { id: r },
				json: e
			}), i = await io(t);
			if (t.ok || t.status === 400) {
				let e = _a.safeParse(i);
				if (e.success) return e.data;
				if (t.ok) throw TypeError("Invalid post response");
			}
			throw ao(t, i);
		},
		async uploadFile(e) {
			let t = await n.files.$post({
				param: { id: r },
				header: {
					"content-type": e.type,
					"x-filename": encodeURIComponent(e.name)
				}
			}, { init: { body: e.body } }), i = await io(t);
			if (!t.ok) throw ao(t, i);
			let a = ba.safeParse(i);
			if (!a.success) throw TypeError(ya.safeParse(i).success ? "Invalid reminder response" : "Invalid upload response");
			return a.data;
		},
		async setIcon(e) {
			let t = await n.icon.$post({
				param: { id: r },
				header: { "content-type": e ? e.type : "application/json" }
			}, { init: { body: e ? e.body : "{}" } }), i = await io(t);
			if (!t.ok) throw ao(t, i);
			let a = Ca.safeParse(i);
			if (!a.success) throw TypeError("Invalid icon response");
			return a.data;
		}
	};
}
// svelte/features/reminders/session.ts
var so = {
	schedule: (e, t) => setTimeout(e, t),
	cancel: (e) => clearTimeout(e)
}, co = 1e4, lo = (e) => e.trim().replace(/\.md$/i, "").replace(/[\\/]/g, "-"), uo = /* @__PURE__ */ new Set();
function fo(e, t = so) {
	let n = ye({
		draft: null,
		saving: !1,
		issue: null,
		pending: {},
		rowIssues: {}
	}), r = !0, i = 0, a = 0, o = !1, s = [], c = /* @__PURE__ */ new Map(), l = (e) => {
		c.has(e) && t.cancel(c.get(e)), c.delete(e);
	}, u = (e, t) => t.kind === "delete" ? !s.some((t) => t.id === e) : s.some((n) => n.id === e && n.enabled === t.enabled), d = (e, t) => {
		l(e), n.update((n) => {
			let r = { ...n.pending }, i = { ...n.rowIssues };
			return delete r[e], t ? i[e] = t : delete i[e], {
				...n,
				pending: r,
				rowIssues: i
			};
		});
	};
	return {
		roomId: e,
		state: n,
		sync(e) {
			if (r) {
				s = e;
				for (let [e, t] of Object.entries(Oe(n).pending)) t.acknowledged && u(e, t) && d(e);
			}
		},
		open(e) {
			r && (a++, n.update((t) => ({
				...t,
				draft: { ...e },
				saving: o,
				issue: null
			})));
		},
		edit(e) {
			r && n.update((t) => t.draft ? {
				...t,
				draft: {
					...t.draft,
					...e
				},
				issue: null
			} : t);
		},
		cancel() {
			r && (a++, n.update((e) => ({
				...e,
				draft: null,
				saving: o,
				issue: null
			})));
		},
		async save(t) {
			let i = Oe(n);
			if (!r || !i.draft || o) return;
			let s = { ...i.draft }, c = a, l = lo(s.name);
			if (!l || !s.text.trim()) return;
			let u = JSON.stringify([e, l]);
			if (uo.has(u)) {
				n.update((e) => ({
					...e,
					issue: {
						kind: "upload",
						detail: "upload-in-progress"
					}
				}));
				return;
			}
			uo.add(u), o = !0, n.update((e) => ({
				...e,
				saving: !0,
				issue: null
			}));
			let d = () => r && c === a && !!Oe(n).draft;
			try {
				let e = await t({
					name: `reminders/${l}.md`,
					type: "text/markdown",
					body: s.text
				});
				if (!d()) return;
				if (!e.reminder) {
					n.update((e) => ({
						...e,
						issue: {
							kind: "upload",
							detail: "reminder-processing-unconfirmed"
						}
					}));
					return;
				}
				let r = e.reminder;
				n.update((e) => {
					if (!e.draft) return e;
					let t = lo(e.draft.name) === l, n = t ? {
						...e.draft,
						name: l,
						fixed: !0
					} : e.draft;
					return r.ok ? {
						...e,
						draft: t && e.draft.text === s.text ? null : n
					} : {
						...e,
						draft: n,
						issue: {
							kind: "upload",
							detail: r.error || "failed"
						}
					};
				});
			} catch (e) {
				d() && n.update((t) => ({
					...t,
					issue: {
						kind: "upload",
						detail: e instanceof Error ? e.message : "failed"
					}
				}));
			} finally {
				uo.delete(u), o = !1, r && n.update((e) => ({
					...e,
					saving: !1
				}));
			}
		},
		async mutate(e, a, o, s) {
			if (!r || Oe(n).pending[e]) return !1;
			let l = ++i, f = {
				sequence: l,
				kind: a,
				enabled: s,
				acknowledged: !1
			};
			n.update((t) => {
				let n = { ...t.rowIssues };
				return delete n[e], {
					...t,
					pending: {
						...t.pending,
						[e]: f
					},
					rowIssues: n
				};
			});
			let p;
			try {
				p = await o(a === "delete" ? {
					t: "reminder.delete",
					id: e
				} : {
					t: "reminder.enable",
					id: e,
					on: !!s
				});
			} catch (e) {
				p = {
					ok: !1,
					error: e instanceof Error ? e.message : "failed"
				};
			}
			return !r || Oe(n).pending[e]?.sequence !== l ? !1 : p.ok ? (f.acknowledged = !0, u(e, f) ? d(e) : (n.update((t) => ({
				...t,
				pending: {
					...t.pending,
					[e]: { ...f }
				}
			})), c.set(e, t.schedule(() => {
				r && Oe(n).pending[e]?.sequence === l && d(e, {
					kind: "unconfirmed",
					detail: "unconfirmed"
				});
			}, co))), !0) : (d(e, {
				kind: "command",
				detail: p.error
			}), !1);
		},
		dispose() {
			r = !1, a++;
			for (let e of [...c.keys()]) l(e);
		}
	};
}
// svelte/features/reminders/RemindersPanel.svelte
var po = b("<!> ", 1), mo = b("<p id=\"remErr\" role=\"alert\" class=\"tw:m-0 tw:whitespace-pre-wrap tw:text-sm tw:text-destructive\"> </p>"), ho = b("<form id=\"remForm\" class=\"tw:space-y-4\"><div class=\"tw:space-y-2\"><!><!></div> <div class=\"tw:space-y-2\"><!><!></div> <!> <div class=\"tw:flex tw:flex-wrap tw:justify-end tw:gap-2\"><!><!></div></form>"), go = b("<p role=\"status\" class=\"tw:m-0 tw:flex tw:items-start tw:gap-2 tw:whitespace-pre-wrap tw:text-sm tw:text-destructive\"><!> </p>"), _o = b("<p role=\"status\" class=\"tw:m-0 tw:text-xs tw:text-muted-foreground\"> </p>"), vo = b("<p role=\"alert\" class=\"tw:m-0 tw:whitespace-pre-wrap tw:text-sm tw:text-destructive\"> </p>"), yo = b("<div class=\"tw:flex tw:items-start tw:gap-2\"><button type=\"button\" class=\"tw:flex tw:min-w-0 tw:flex-1 tw:items-start tw:gap-2 tw:rounded-control tw:border-0 tw:bg-transparent tw:p-1 tw:text-left tw:font-sans tw:text-sm tw:text-foreground tw:outline-none tw:hover:bg-accent tw:focus-visible:ring-2 tw:focus-visible:ring-ring\"><!> <span class=\"tw:min-w-0 tw:space-y-1\"><span class=\"tw:block tw:break-words tw:font-medium\"> </span><span class=\"tw:block tw:text-xs tw:leading-5 tw:text-muted-foreground\"><!> </span></span></button></div> <!> <pre class=\"tw:m-0 tw:whitespace-pre-wrap tw:break-words tw:rounded-control tw:bg-muted tw:p-3 tw:font-mono tw:text-xs tw:leading-5\"> </pre> <div class=\"tw:flex tw:flex-wrap tw:items-center tw:justify-between tw:gap-2\"><!> <div class=\"tw:flex tw:flex-wrap tw:gap-2\"><!><!></div></div> <!> <!>", 1), bo = b("<p class=\"tw:m-0 tw:rounded-surface tw:border tw:border-dashed tw:border-border tw:p-6 tw:text-sm tw:leading-6 tw:text-muted-foreground\"> </p>"), xo = b("<section tabindex=\"-1\" data-vb-native=\"\" data-reminders-panel=\"\" class=\"tw:space-y-4 tw:p-4 tw:font-sans tw:text-sm tw:text-foreground\"><div class=\"tw:flex tw:flex-wrap tw:items-start tw:justify-between tw:gap-3\"><div class=\"tw:min-w-0 tw:flex-1 tw:space-y-1\"><!> <p class=\"tw:m-0 tw:max-w-prose tw:text-sm tw:leading-5 tw:text-muted-foreground\"> </p></div> <!></div> <!> <div class=\"tw:space-y-3\"></div></section> <!>", 1);
function So(e, n) {
	let r = ne();
	Re(n, !0);
	let i = () => ge(c, "$view", a), [a, o] = pe(), s = v(() => fo(n.room.id)), c = s.state, l = B(me([])), u = B(null), d = B(!1), p = B(null), h = B(null), y = B(null), b = B(null), x = P(() => n.room.reminders || []), S = P(() => n.vb.locale || "pt-BR"), C = (e) => new Date(e).toLocaleString(j(S), {
		weekday: "short",
		day: "numeric",
		month: "short",
		hour: "2-digit",
		minute: "2-digit"
	}), T = (e) => e ? e.detail === "upload-in-progress" ? n.vb.t("Um envio deste lembrete ainda está em andamento. Aguarde antes de salvar novamente.") : e.detail === "reminder-processing-unconfirmed" ? n.vb.t("Não recebi a confirmação do agendamento. Confira antes de tentar de novo.") : ["offline", "disconnected"].includes(e.detail) ? n.vb.t("sem conexão") : e.kind === "unconfirmed" || e.detail === "timeout" ? n.vb.t("Ainda não recebi a confirmação. Confira antes de tentar de novo.") : e.detail : "";
	_(() => {
		s.sync(j(x));
	}), Ne(() => s.dispose());
	function ee(e) {
		s.open(e), queueMicrotask(() => j(b)?.focus());
	}
	function te() {
		s.cancel(), queueMicrotask(() => j(y)?.focus());
	}
	function O(e) {
		H(l, j(l).includes(e) ? j(l).filter((t) => t !== e) : [...j(l), e], !0);
	}
	async function re() {
		let e = j(u);
		e && await s.mutate(e.id, "delete", n.request) && j(u)?.id === e.id && H(d, !1);
	}
	var k = xo(), A = N(k), ae = M(A), se = M(ae), ce = M(se);
	Ie(ce, {
		children: (e, t) => {
			F();
			var r = W();
			V((e) => w(r, e), [() => n.vb.t("Lembretes")]), f(e, r);
		},
		$$slots: { default: !0 }
	});
	var ue = t(ce, 2), I = D(ue, !0);
	z(se);
	var de = t(se, 2), fe = (e) => {
		L(e, {
			id: "remNew",
			onclick: () => ee({
				name: "",
				text: ""
			}),
			get ref() {
				return j(y);
			},
			set ref(e) {
				H(y, e, !0);
			},
			children: (e, r) => {
				var i = po(), a = N(i);
				le(a, { name: "plus" });
				var o = t(a, 1, !0);
				V((e) => w(o, e), [() => n.vb.t("Novo lembrete")]), f(e, i);
			},
			$$slots: { default: !0 }
		});
	};
	R(de, (e) => {
		i().draft || e(fe);
	}), z(ae);
	var he = t(ae, 2), _e = (e) => {
		be(e, {
			children: (e, a) => {
				var o = ho(), c = M(o), l = M(c);
				{
					let e = P(() => `${r}-name`);
					je(l, {
						get for() {
							return j(e);
						},
						children: (e, t) => {
							F();
							var r = W();
							V((e) => w(r, e), [() => n.vb.t("Nome")]), f(e, r);
						},
						$$slots: { default: !0 }
					});
				}
				var u = t(l);
				{
					let e = P(() => `${r}-name`), t = P(() => n.vb.t("nome, ex.: relatorio-diario"));
					Ve(u, {
						get id() {
							return j(e);
						},
						name: "name",
						maxlength: 60,
						required: !0,
						get readonly() {
							return i().draft.fixed;
						},
						get value() {
							return i().draft.name;
						},
						oninput: (e) => s.edit({ name: e.currentTarget.value }),
						get placeholder() {
							return j(t);
						}
					});
				}
				z(c);
				var d = t(c, 2), p = M(d);
				{
					let e = P(() => `${r}-text`);
					je(p, {
						get for() {
							return j(e);
						},
						children: (e, t) => {
							F();
							var r = W();
							V((e) => w(r, e), [() => n.vb.t("Texto do lembrete")]), f(e, r);
						},
						$$slots: { default: !0 }
					});
				}
				var h = t(p);
				{
					let e = P(() => `${r}-text`), t = P(() => n.vb.t("Diga quando e o quê. Ex.: Todo dia às 8h: puxe os números de ontem e poste aqui o que mudou."));
					Be(h, {
						get id() {
							return j(e);
						},
						name: "text",
						required: !0,
						get value() {
							return i().draft.text;
						},
						oninput: (e) => s.edit({ text: e.currentTarget.value }),
						get placeholder() {
							return j(t);
						},
						get ref() {
							return j(b);
						},
						set ref(e) {
							H(b, e, !0);
						}
					});
				}
				z(d);
				var g = t(d, 2), _ = (e) => {
					var t = mo(), n = D(t, !0);
					V((e) => w(n, e), [() => T(i().issue)]), f(e, t);
				};
				R(g, (e) => {
					i().issue && e(_);
				});
				var v = t(g, 2), y = M(v);
				L(y, {
					id: "remCancel",
					variant: "outline",
					onclick: te,
					children: (e, t) => {
						F();
						var r = W();
						V((e) => w(r, e), [() => n.vb.t("Cancelar")]), f(e, r);
					},
					$$slots: { default: !0 }
				});
				var x = t(y);
				L(x, {
					id: "remSave",
					type: "submit",
					get loading() {
						return i().saving;
					},
					children: (e, t) => {
						F();
						var r = W();
						V((e) => w(r, e), [() => n.vb.t("Salvar")]), f(e, r);
					},
					$$slots: { default: !0 }
				}), z(v), z(o), m("submit", o, (e) => {
					e.preventDefault(), s.save(oo(n.room.id).uploadFile);
				}), f(e, o);
			},
			$$slots: { default: !0 }
		});
	};
	R(he, (e) => {
		i().draft && e(_e);
	});
	var ve = t(he, 2);
	E(ve, 21, () => j(x), (e) => e.id, (e, a) => {
		let o = P(() => i().pending[j(a).id]), c = P(() => i().rowIssues[j(a).id]);
		be(e, {
			class: "tw:space-y-3 tw:p-4",
			children: (e, i) => {
				var p = yo(), m = N(p), g = M(m), _ = M(g);
				{
					let e = P(() => j(l).includes(j(a).id) ? "chevronDown" : "chevronRight");
					le(_, {
						get name() {
							return j(e);
						},
						class: "tw:mt-0.5"
					});
				}
				var v = t(_, 2), y = M(v), b = D(y, !0), x = t(y), S = M(x), E = (e) => {
					var t = W();
					V((e) => w(t, `${(j(a).every || j(a).cron || "") ?? ""}${e ?? ""} ·`), [() => j(a).enabled && j(a).next_at ? ` · ${n.vb.t("próximo {when}", { when: C(j(a).next_at) })}` : ""]), f(e, t);
				};
				R(S, (e) => {
					j(a).error || e(E);
				});
				var te = t(S, 1, !0);
				z(x), z(v), z(g), z(m);
				var ne = t(m, 2), re = (e) => {
					var n = go(), r = M(n);
					le(r, { name: "warning" });
					var i = t(r, 1, !0);
					z(n), V(() => w(i, j(a).error)), f(e, n);
				};
				R(ne, (e) => {
					j(a).error && e(re);
				});
				var k = t(ne, 2), A = D(k, !0), ae = t(k, 2), oe = M(ae);
				je(oe, {
					class: "tw:flex tw:items-center tw:gap-2",
					children: (e, r) => {
						var i = po(), c = N(i);
						{
							let e = P(() => !!j(a).error || !!j(o));
							ke(c, {
								controlled: !0,
								get "data-rem-on"() {
									return j(a).id;
								},
								get checked() {
									return j(a).enabled;
								},
								get disabled() {
									return j(e);
								},
								onCheckedChange: (e) => {
									s.mutate(j(a).id, "enable", n.request, e);
								}
							});
						}
						var l = t(c, 1, !0);
						V((e) => w(l, e), [() => n.vb.t("Ligado")]), f(e, i);
					},
					$$slots: { default: !0 }
				});
				var se = t(oe, 2), ce = M(se), ue = (e) => {
					L(e, {
						variant: "ghost",
						size: "sm",
						get "data-rem-edit"() {
							return j(a).id;
						},
						onclick: () => ee({
							name: j(a).name,
							text: j(a).text,
							fixed: !0
						}),
						children: (e, t) => {
							F();
							var r = W();
							V((e) => w(r, e), [() => n.vb.t("Editar")]), f(e, r);
						},
						$$slots: { default: !0 }
					});
				};
				R(ce, (e) => {
					j(a).name && e(ue);
				});
				var I = t(ce);
				{
					let e = P(() => !!j(o));
					L(I, {
						variant: "ghost",
						size: "sm",
						get "data-rem-del"() {
							return j(a).id;
						},
						get disabled() {
							return j(e);
						},
						onclick: (e) => {
							H(u, j(a), !0), H(h, e.currentTarget, !0), H(d, !0);
						},
						children: (e, t) => {
							F();
							var r = W();
							V((e) => w(r, e), [() => n.vb.t("Apagar lembrete")]), f(e, r);
						},
						$$slots: { default: !0 }
					});
				}
				z(se), z(ae);
				var de = t(ae, 2), fe = (e) => {
					var t = _o(), r = D(t, !0);
					V((e) => w(r, e), [() => n.vb.t("Aguardando confirmação…")]), f(e, t);
				};
				R(de, (e) => {
					j(o) && e(fe);
				});
				var pe = t(de, 2), me = (e) => {
					var t = vo(), n = D(t, !0);
					V((e) => w(n, e), [() => T(j(c))]), f(e, t);
				};
				R(pe, (e) => {
					j(c) && e(me);
				}), V((e, t, n) => {
					U(g, "data-rem-open", j(a).id), U(g, "aria-expanded", e), U(g, "aria-controls", `${r}-content-${j(a).id}`), w(b, j(a).name ? `${j(a).name}.md` : j(a).text), w(te, t), U(k, "hidden", n), U(k, "id", `${r}-content-${j(a).id}`), w(A, j(a).text);
				}, [
					() => j(l).includes(j(a).id),
					() => n.vb.t("de {who}", { who: n.vb.name(j(a).owner) }),
					() => !j(l).includes(j(a).id)
				]), ie("click", g, () => O(j(a).id)), f(e, p);
			},
			$$slots: { default: !0 }
		});
	}, (e) => {
		var t = g(), r = N(t), a = (e) => {
			var t = bo(), r = D(t, !0);
			V((e) => w(r, e), [() => n.vb.t("Nenhum lembrete ainda. Clique em Novo lembrete, ou peça pro seu agent: “todo dia às 8h, me manda o resumo do que mudou”.")]), f(e, t);
		};
		R(r, (e) => {
			i().draft || e(a);
		}), f(e, t);
	}), z(ve), z(A), oe(A, (e) => H(p, e), () => j(p));
	var ye = t(A, 2);
	{
		let e = P(() => n.vb.t("Apagar este lembrete?")), t = P(() => j(u)?.name ? `${j(u).name}.md` : j(u)?.text), r = P(() => n.vb.t("Apagar lembrete")), a = P(() => n.vb.t("Cancelar")), o = P(() => !!(j(u) && i().pending[j(u).id])), s = P(() => j(u) ? T(i().rowIssues[j(u).id]) : "");
		la(ye, {
			get title() {
				return j(e);
			},
			get description() {
				return j(t);
			},
			get confirmLabel() {
				return j(r);
			},
			get cancelLabel() {
				return j(a);
			},
			get busy() {
				return j(o);
			},
			get error() {
				return j(s);
			},
			onconfirm: () => {
				re();
			},
			returnFocus: () => j(h)?.isConnected ? j(h) : j(y) || j(p),
			get open() {
				return j(d);
			},
			set open(e) {
				H(d, e, !0);
			}
		});
	}
	V((e) => w(I, e), [() => n.vb.t("Quando o lembrete roda, o @vibe publica o texto aqui para seu agent.")]), f(e, k), Me(), o();
}
i(["click"]);
// svelte/Reminders.svelte
function Co(e, t) {
	Re(t, !0);
	var n = g(), i = N(n);
	r(i, () => t.room.id, (e) => {
		So(e, {
			get room() {
				return t.room;
			},
			get vb() {
				return t.vb;
			},
			get request() {
				return t.request;
			}
		});
	}), f(e, n), Me();
}
// svelte/features/people/model.ts
var wo = (e) => e.trim().toLowerCase();
function To(e, t) {
	return e.members.includes(t) && t !== e.book.owner && (!!e.pending?.includes(t) || e.me === e.book.owner);
}
function Eo(e, t, n) {
	return e.members.includes(e.me) ? t === "remove" ? !!To(e, n) : t === "resend" ? !!e.pending?.includes(n) : t === "approve" || t === "deny" ? !!e.requests?.some((e) => e.email === n) : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(n) && !e.members.includes(n) : !1;
}
function Do(e, t) {
	let n = e.members.filter((t) => t === e.me || e.online.includes(t));
	return {
		online: n,
		offline: e.members.filter((e) => !n.includes(e)),
		friends: t.filter((t) => !e.members.includes(t))
	};
}
function Oo(e, t, n, r) {
	let i = `${n}/b/${e.id}`;
	return `${r("Te convidei pro vibebook \"{title}\": {url}", {
		title: e.book.title,
		url: i
	})}\n\n${r("1. Entra com {email} (o convite chegou nesse email).", { email: t })}\n${r("2. Manda isto pro seu Claude Code:")}\n\nRead ${n}/llms.txt and set up vibebook for this project. Room: ${i}`;
}
// svelte/features/people/api.ts
function ko(e, t) {
	let n = to("/", t).api.books[":id"], r = encodeURIComponent(e);
	return async (e, t) => {
		let i = e === "remove" ? await n.members[":email"].$delete({ param: {
			id: r,
			email: encodeURIComponent(t)
		} }) : e === "approve" || e === "deny" ? await n.requests.$post({
			param: { id: r },
			json: {
				email: t,
				ok: e === "approve"
			}
		}) : await n.members.$post({
			param: { id: r },
			json: { email: t }
		}), a = await i.json().catch(() => null);
		if (!i.ok) {
			let e = xa.safeParse(a);
			throw Error(e.success ? e.data.error : `HTTP ${i.status}`);
		}
		if (!Sa.safeParse(a).success) throw Error("Invalid people response");
	};
}
// svelte/features/people/session.ts
var Ao = {
	schedule: (e, t) => setTimeout(e, t),
	cancel: (e) => clearTimeout(e)
}, jo = 2e4, Mo = 1e4;
function No(e, t = Ao) {
	let n = ye({
		draft: "",
		pending: {},
		issues: {},
		notices: {},
		clipboard: null
	}), r = !0, i = null, a = 0, o = /* @__PURE__ */ new Map(), s = (e, r) => {
		let i = o.get(e);
		i?.timer !== void 0 && t.cancel(i.timer), o.delete(e), n.update((t) => {
			let n = { ...t.pending }, i = { ...t.issues };
			return delete n[e], r ? i[e] = r : delete i[e], {
				...t,
				pending: n,
				issues: i
			};
		});
	}, c = (e, t) => !!i && (t === "remove" ? !i.members.includes(e) : t === "invite" ? i.members.includes(e) : t === "approve" ? i.members.includes(e) && !i.requests?.some((t) => t.email === e) : t !== "deny" || !i.requests?.some((t) => t.email === e));
	return {
		state: n,
		sync(t) {
			if (r && t.id === e) {
				i = t;
				for (let [e, n] of o) ((n.action === "remove" ? !t.members.includes(e) : (n.action === "approve" || n.action === "deny") && !t.requests?.some((t) => t.email === e)) || n.ack && c(e, n.action)) && s(e);
			}
		},
		edit(e) {
			r && n.update((t) => ({
				...t,
				draft: e
			}));
		},
		async copy(e, t) {
			if (!r) return;
			let i = ++a;
			try {
				await t(), r && i === a && n.update((t) => ({
					...t,
					clipboard: {
						email: e,
						status: "copied"
					}
				}));
			} catch {
				r && i === a && n.update((t) => ({
					...t,
					clipboard: {
						email: e,
						status: "failed"
					}
				}));
			}
		},
		async mutate(e, a, l) {
			let u = wo(a);
			if (!r || !i || o.has(u)) return !1;
			if (!Eo(i, e, u)) return e === "invite" && n.update((e) => ({
				...e,
				issues: {
					...e.issues,
					[u]: i.members.includes(u) ? "already-member" : "invalid-email"
				}
			})), !1;
			let d = Symbol(), f = Oe(n).draft;
			o.set(u, {
				token: d,
				action: e,
				ack: !1
			}), n.update((t) => {
				let n = { ...t.issues }, r = { ...t.notices };
				return delete n[u], delete r[u], {
					...t,
					pending: {
						...t.pending,
						[u]: e
					},
					issues: n,
					notices: r
				};
			});
			let p = () => r && o.get(u)?.token === d;
			o.get(u).timer = t.schedule(() => {
				p() && s(u, "unconfirmed");
			}, jo);
			try {
				await l(e, u);
			} catch (e) {
				return p() && s(u, e instanceof Error ? e.message : "failed"), !1;
			}
			if (!p()) return !1;
			let m = o.get(u);
			return m.timer !== void 0 && t.cancel(m.timer), m.ack = !0, n.update((t) => ({
				...t,
				draft: e === "invite" && wo(f) === u && t.draft === f ? "" : t.draft,
				notices: {
					...t.notices,
					[u]: e
				}
			})), c(u, e) ? s(u) : m.timer = t.schedule(() => {
				p() && s(u, "unconfirmed");
			}, Mo), !0;
		},
		dispose() {
			r = !1, a++;
			for (let e of o.values()) e.timer !== void 0 && t.cancel(e.timer);
			o.clear(), i = null;
		}
	};
}
// svelte/features/people/PeoplePanel.svelte
var Po = b("<!> <div class=\"tw:flex tw:flex-wrap tw:gap-1\"><!> <!></div>", 1), Fo = b("<div class=\"tw:space-y-2\"><div class=\"tw:flex tw:items-start tw:gap-2\"><!> <div class=\"tw:min-w-0 tw:flex-1 tw:space-y-1\"><p class=\"tw:m-0 tw:break-words tw:text-sm tw:font-medium\"> </p> <p class=\"tw:m-0 tw:break-all tw:text-xs tw:text-muted-foreground\"> </p> <!></div> <!></div> <!></div>"), Io = b("<div class=\"tw:flex tw:items-start tw:gap-2\"><!> <div class=\"tw:min-w-0 tw:flex-1 tw:space-y-1\"><p class=\"tw:m-0 tw:break-words tw:font-medium\"> </p> <p class=\"tw:m-0 tw:break-all tw:text-xs tw:text-muted-foreground\"> </p> <!></div> <!></div>"), Lo = b("<div class=\"tw:space-y-3\"><!> <!></div>"), Ro = b("<details class=\"tw:space-y-3\"><summary class=\"tw:cursor-pointer tw:rounded-control tw:p-1 tw:text-xs tw:text-muted-foreground tw:focus-visible:outline-2 tw:focus-visible:outline-ring\"> </summary> <div class=\"tw:space-y-3\"></div></details>"), zo = b("<!><span class=\"tw:min-w-0 tw:break-all\"> </span><span aria-hidden=\"true\">+</span>", 1), Bo = b("<details class=\"tw:space-y-2\"><summary class=\"tw:cursor-pointer tw:rounded-control tw:p-1 tw:text-xs tw:text-muted-foreground tw:focus-visible:outline-2 tw:focus-visible:outline-ring\"> </summary> <!></details>"), Vo = b("<option></option>"), Ho = b("<p role=\"status\" class=\"tw:m-0 tw:break-words tw:text-xs tw:text-muted-foreground\"> </p>"), Uo = b("<p role=\"alert\" class=\"tw:m-0 tw:whitespace-pre-wrap tw:break-words tw:text-xs tw:text-destructive\"> </p>"), Wo = b("<p class=\"tw:m-0 tw:break-words tw:text-xs tw:text-muted-foreground\"> </p>"), Go = b("<section tabindex=\"-1\" data-vb-native=\"\" data-people-panel=\"\" class=\"tw:space-y-4 tw:border-t tw:border-border tw:p-3 tw:font-sans tw:text-sm tw:text-foreground\"><!> <!> <!> <div class=\"tw:space-y-3\"></div> <!> <!> <form id=\"invite\" class=\"tw:space-y-2\"><!> <div class=\"tw:flex tw:items-center tw:gap-2\"><!><!></div> <datalist></datalist></form> <!> <!> <!> <!></section> <!>", 1);
function Ko(e, n) {
	let r = ne();
	Re(n, !0);
	let i = () => ge(h, "$view", a), [a, o] = pe(), s = (e, r = He) => {
		var a = Fo(), o = M(a), s = M(o);
		{
			let e = P(() => n.vb.name(r())), t = P(() => O(r()));
			Se(s, {
				get name() {
					return j(e);
				},
				get src() {
					return j(t);
				}
			});
		}
		var c = t(s, 2), l = M(c), m = D(l, !0), h = t(l, 2), g = D(h, !0), _ = t(h, 2), v = (e) => {
			var a = Po(), o = N(a);
			Le(o, {
				children: (e, t) => {
					F();
					var r = W();
					V((e) => w(r, e), [() => n.vb.t("pendente")]), f(e, r);
				},
				$$slots: { default: !0 }
			});
			var s = t(o, 2), c = M(s);
			{
				let e = P(() => n.vb.t("Copiar a mensagem de convite (link da sala + setup do agent) para mandar no WhatsApp"));
				L(c, {
					size: "sm",
					variant: "ghost",
					get "data-copyinv"() {
						return r();
					},
					get title() {
						return j(e);
					},
					onclick: () => re(r()),
					children: (e, t) => {
						F();
						var r = W();
						V((e) => w(r, e), [() => n.vb.t("copiar")]), f(e, r);
					},
					$$slots: { default: !0 }
				});
			}
			var l = t(c, 2);
			{
				let e = P(() => !!i().pending[r()]);
				L(l, {
					size: "sm",
					variant: "ghost",
					get "data-resend"() {
						return r();
					},
					get disabled() {
						return j(e);
					},
					onclick: () => {
						d.mutate("resend", r(), n.request || p);
					},
					children: (e, t) => {
						F();
						var r = W();
						V((e) => w(r, e), [() => n.vb.t("reenviar")]), f(e, r);
					},
					$$slots: { default: !0 }
				});
			}
			z(s), f(e, a);
		}, y = P(() => n.room.pending?.includes(r())), b = (e) => {
			{
				let t = P(() => n.room.online.includes(r()) || r() === n.room.me ? "success" : "neutral");
				Le(e, {
					get variant() {
						return j(t);
					},
					children: (e, t) => {
						F();
						var i = W();
						V((e) => w(i, e), [() => n.room.online.includes(r()) || r() === n.room.me ? n.vb.t("online") : n.vb.t("offline")]), f(e, i);
					},
					$$slots: { default: !0 }
				});
			}
		};
		R(_, (e) => {
			j(y) ? e(v) : e(b, -1);
		}), z(c);
		var x = t(c, 2), S = (e) => {
			{
				let t = P(() => n.room.pending?.includes(r()) ? n.vb.t("Cancelar convite") : n.vb.t("Remover {email}", { email: r() })), a = P(() => !!i().pending[r()]);
				De(e, {
					icon: "close",
					get "data-remove"() {
						return r();
					},
					get label() {
						return j(t);
					},
					get disabled() {
						return j(a);
					},
					onclick: (e) => A(r(), "remove", e.currentTarget)
				});
			}
		}, C = P(() => To(n.room, r()));
		R(x, (e) => {
			j(C) && e(S);
		}), z(o);
		var T = t(o, 2);
		u(T, () => n.agents ?? He, r), z(a), V((e) => {
			U(o, "data-person", r()), U(l, "title", r()), w(m, e), w(g, r());
		}, [() => n.room.names?.[r()] || n.vb.name(r())]), f(e, a);
	}, c = I(n, "friends", 19, () => []), l = I(n, "foldOpen", 19, () => ({
		off: !1,
		friends: null
	})), d = v(() => No(n.room.id)), p = v(() => ko(n.room.id)), h = d.state, y = P(() => Do(n.room, c())), b = B(!1), x = B(null), S = B(null), C = B(null), T = B(me(v(() => l().off))), ee = B(me(v(() => l().friends ?? n.room.members.length <= 1))), te = (e) => e === "invalid-email" ? n.vb.t("Email inválido.") : e === "already-member" ? n.vb.t("Esta pessoa já está na sala.") : e === "unconfirmed" ? n.vb.t("Ainda não recebi a confirmação. Confira antes de tentar de novo.") : e, O = (e) => n.vb.avatarUrl?.(e) || (n.room.avatars?.[e] ? `/api/avatar/${encodeURIComponent(e)}?v=${n.room.avatars[e]}` : void 0);
	_(() => {
		d.sync(n.room), j(x) && (j(x).action === "remove" ? !To(n.room, j(x).email) : !n.room.requests?.some((e) => e.email === j(x).email)) && (H(b, !1), H(x, null));
	}), Ne(() => d.dispose());
	function re(e) {
		let t = Oo(n.room, e, location.origin, n.vb.t);
		d.copy(e, () => navigator.clipboard?.writeText(t) ?? Promise.reject(/* @__PURE__ */ Error("clipboard unavailable")));
	}
	function k(e) {
		let t = wo(e);
		if (i().pending[t]) return;
		let r = n.room.pending?.includes(t) ? "resend" : "invite";
		Eo(n.room, r, t) && re(t), d.mutate(r, t, n.request || p);
	}
	function A(e, t, n) {
		H(x, {
			email: e,
			action: t
		}, !0), H(S, n, !0), H(b, !0);
	}
	async function ae() {
		let e = j(x);
		e && await d.mutate(e.action, e.email, n.request || p) && j(x) === e && !i().pending[e.email] && H(b, !1);
	}
	var se = Go(), ce = N(se), le = M(ce), ue = (e) => {
		var r = Lo(), a = M(r);
		Ie(a, {
			level: 3,
			class: "tw:text-sm tw:leading-5",
			children: (e, t) => {
				F();
				var r = W();
				V((e) => w(r, e), [() => n.vb.t("Pedindo pra entrar")]), f(e, r);
			},
			$$slots: { default: !0 }
		});
		var o = t(a, 2);
		E(o, 17, () => n.room.requests, (e) => e.email, (e, r) => {
			var a = Io(), o = M(a);
			{
				let e = P(() => j(r).name || j(r).email), t = P(() => O(j(r).email));
				Se(o, {
					get name() {
						return j(e);
					},
					get src() {
						return j(t);
					}
				});
			}
			var s = t(o, 2), c = M(s), l = D(c, !0), u = t(c, 2), m = D(u), h = t(u, 2);
			{
				let e = P(() => !!i().pending[j(r).email]);
				L(h, {
					size: "sm",
					variant: "outline",
					get "data-ask"() {
						return j(r).email;
					},
					"data-ok": "1",
					get disabled() {
						return j(e);
					},
					onclick: () => {
						d.mutate("approve", j(r).email, n.request || p);
					},
					children: (e, t) => {
						F();
						var r = W();
						V((e) => w(r, e), [() => n.vb.t("liberar")]), f(e, r);
					},
					$$slots: { default: !0 }
				});
			}
			z(s);
			var g = t(s, 2);
			{
				let e = P(() => n.vb.t("Recusar {email}", { email: j(r).email })), t = P(() => !!i().pending[j(r).email]);
				De(g, {
					icon: "close",
					get "data-ask"() {
						return j(r).email;
					},
					"data-ok": "",
					get label() {
						return j(e);
					},
					get disabled() {
						return j(t);
					},
					onclick: (e) => A(j(r).email, "deny", e.currentTarget)
				});
			}
			z(a), V((e) => {
				U(a, "data-access-request", j(r).email), w(l, j(r).name || j(r).email), w(m, `${j(r).email ?? ""} · ${e ?? ""}`);
			}, [() => n.vb.t("pediu {ago}", { ago: n.vb.ago(j(r).ts) })]), f(e, a);
		}), z(r), f(e, r);
	};
	R(le, (e) => {
		n.room.requests?.length && e(ue);
	});
	var de = t(le, 2);
	Ie(de, {
		level: 3,
		class: "tw:text-sm tw:leading-5",
		children: (e, t) => {
			F();
			var r = W();
			V((e) => w(r, e), [() => n.vb.t("Pessoas e agents")]), f(e, r);
		},
		$$slots: { default: !0 }
	});
	var he = t(de, 2);
	u(he, () => n.sandboxes ?? He);
	var _e = t(he, 2);
	E(_e, 20, () => j(y).online, (e) => e, (e, t) => {
		s(e, () => t);
	}), z(_e);
	var ye = t(_e, 2), be = (e) => {
		var r = Ro(), i = M(r), a = D(i, !0), o = t(i, 2);
		E(o, 20, () => j(y).offline, (e) => e, (e, t) => {
			s(e, () => t);
		}), z(o), z(r), V((e) => w(a, e), [() => n.vb.t("{n} offline", { n: j(y).offline.length })]), ie("click", i, () => n.onfoldchange?.("off", !j(T))), ve("open", "toggle", r, (e) => H(T, e), () => j(T)), f(e, r);
	};
	R(ye, (e) => {
		j(y).offline.length && e(be);
	});
	var xe = t(ye, 2), Ce = (e) => {
		var r = Bo(), a = M(r), o = D(a), s = t(a, 2);
		E(s, 16, () => j(y).friends, (e) => e, (e, r) => {
			{
				let a = P(() => !!i().pending[r]);
				L(e, {
					variant: "ghost",
					class: "tw:h-auto tw:w-full tw:justify-start tw:whitespace-normal tw:text-left",
					get "data-add"() {
						return r;
					},
					get disabled() {
						return j(a);
					},
					onclick: () => k(r),
					children: (e, i) => {
						var a = zo(), o = N(a);
						{
							let e = P(() => n.vb.name(r)), t = P(() => O(r));
							Se(o, {
								get name() {
									return j(e);
								},
								get src() {
									return j(t);
								}
							});
						}
						var s = t(o), c = D(s, !0);
						F(), V((e) => w(c, e), [() => n.vb.name(r)]), f(e, a);
					},
					$$slots: { default: !0 }
				});
			}
		}), z(r), V((e) => w(o, `${e ?? ""} · ${j(y).friends.length ?? ""}`), [() => n.vb.t("Seus amigos")]), ie("click", a, () => n.onfoldchange?.("friends", !j(ee))), ve("open", "toggle", r, (e) => H(ee, e), () => j(ee)), f(e, r);
	};
	R(xe, (e) => {
		j(y).friends.length && e(Ce);
	});
	var Te = t(xe, 2), Ee = M(Te);
	{
		let e = P(() => `${r}-email`);
		je(Ee, {
			get for() {
				return j(e);
			},
			children: (e, t) => {
				F();
				var r = W();
				V((e) => w(r, e), [() => n.vb.t("convidar por email")]), f(e, r);
			},
			$$slots: { default: !0 }
		});
	}
	var Oe = t(Ee, 2), ke = M(Oe);
	{
		let e = P(() => `${r}-email`), t = P(() => `${r}-friends`);
		Ve(ke, {
			get id() {
				return j(e);
			},
			type: "email",
			required: !0,
			get list() {
				return j(t);
			},
			autocomplete: "off",
			get value() {
				return i().draft;
			},
			oninput: (e) => d.edit(e.currentTarget.value)
		});
	}
	var Ae = t(ke);
	{
		let e = P(() => !!i().pending[wo(i().draft)]);
		L(Ae, {
			type: "submit",
			size: "sm",
			get disabled() {
				return j(e);
			},
			children: (e, t) => {
				F();
				var r = W();
				V((e) => w(r, e), [() => n.vb.t("Convidar")]), f(e, r);
			},
			$$slots: { default: !0 }
		});
	}
	z(Oe);
	var Pe = t(Oe, 2);
	E(Pe, 21, () => j(y).friends, we, (e, t) => {
		var n = Vo(), r = {};
		V(() => {
			r !== (r = j(t)) && (n.value = (n.__value = r) ?? "");
		}), f(e, n);
	}), z(Pe), z(Te);
	var Fe = t(Te, 2);
	E(Fe, 1, () => Object.entries(i().pending), we, (e, t) => {
		var r = P(() => fe(j(t), 1));
		let i = () => j(r)[0];
		var a = Ho(), o = D(a);
		V((e) => w(o, `${i() ?? ""} · ${e ?? ""}`), [() => n.vb.t("Aguardando confirmação…")]), f(e, a);
	});
	var ze = t(Fe, 2);
	E(ze, 1, () => Object.entries(i().issues), we, (e, t) => {
		var n = P(() => fe(j(t), 2));
		let r = () => j(n)[0], i = () => j(n)[1];
		var a = Uo(), o = D(a);
		V((e) => w(o, `${r() ?? ""} · ${e ?? ""}`), [() => te(i())]), f(e, a);
	});
	var Be = t(ze, 2);
	E(Be, 1, () => Object.entries(i().notices), we, (e, t) => {
		var r = P(() => fe(j(t), 2));
		let i = () => j(r)[0], a = () => j(r)[1];
		var o = g(), s = N(o), c = (e) => {
			var t = Ho(), r = D(t);
			V((e) => w(r, `${i() ?? ""} · ${e ?? ""} ✓`), [() => n.vb.t("enviado")]), f(e, t);
		};
		R(s, (e) => {
			(a() === "invite" || a() === "resend") && e(c);
		}), f(e, o);
	});
	var Ue = t(Be, 2), We = (e) => {
		var t = Wo(), r = D(t, !0);
		V((e) => {
			U(t, "role", i().clipboard.status === "failed" ? "alert" : "status"), w(r, e);
		}, [() => i().clipboard.status === "failed" ? n.vb.t("Não consegui copiar. Use \"copiar\" ao lado de {email} em Pessoas.", { email: i().clipboard.email }) : n.vb.t("Copiei a mensagem com o link da sala e o setup do agent para {name}: cola no WhatsApp.", { name: n.vb.name(i().clipboard.email) })]), f(e, t);
	};
	R(Ue, (e) => {
		i().clipboard && e(We);
	}), z(ce), oe(ce, (e) => H(C, e), () => j(C));
	var Ge = t(ce, 2);
	{
		let e = P(() => j(x)?.action === "deny" ? n.vb.t("Recusar o pedido de {email}?", { email: j(x).email }) : n.room.pending?.includes(j(x)?.email || "") ? n.vb.t("Cancelar o convite de {email}?", { email: j(x)?.email || "" }) : n.vb.t("Remover {email} deste vibebook?", { email: j(x)?.email || "" })), t = P(() => j(x)?.email), r = P(() => j(x)?.action === "deny" ? n.vb.t("Recusar") : n.vb.t("Remover do vibebook")), a = P(() => n.vb.t("Cancelar")), o = P(() => !!(j(x) && i().pending[j(x).email])), s = P(() => j(x) && i().issues[j(x).email] ? te(i().issues[j(x).email]) : "");
		la(Ge, {
			get title() {
				return j(e);
			},
			get description() {
				return j(t);
			},
			get confirmLabel() {
				return j(r);
			},
			get cancelLabel() {
				return j(a);
			},
			get busy() {
				return j(o);
			},
			get error() {
				return j(s);
			},
			onconfirm: () => {
				ae();
			},
			returnFocus: () => j(S)?.isConnected ? j(S) : j(C),
			get open() {
				return j(b);
			},
			set open(e) {
				H(b, e, !0);
			}
		});
	}
	V(() => U(Pe, "id", `${r}-friends`)), m("submit", Te, (e) => {
		e.preventDefault(), k(i().draft);
	}), f(e, se), Me(), o();
}
i(["click"]);
// svelte/People.svelte
var qo = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"room"
]);
function Jo(e, t) {
	Re(t, !0);
	let n = Ee(t, qo);
	var i = g(), a = N(i);
	r(a, () => t.room.id, (e) => {
		Ko(e, Ue({ get room() {
			return t.room;
		} }, () => n));
	}), f(e, i), Me();
}
// svelte/features/navigation/model.ts
function Yo(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e) t.has(n.id) || t.set(n.id, n);
	let n = /* @__PURE__ */ new Map();
	for (let e of t.values()) n.set(e.id, e.parent && e.parent !== e.id && t.has(e.parent) ? e.parent : null);
	let r = /* @__PURE__ */ new Set();
	for (let e of t.keys()) {
		let t = [], i = /* @__PURE__ */ new Map(), a = e;
		for (; a && !r.has(a);) {
			let e = i.get(a);
			if (e !== void 0) {
				for (let r of t.slice(e)) n.set(r, null);
				break;
			}
			i.set(a, t.length), t.push(a), a = n.get(a) ?? null;
		}
		for (let e of t) r.add(e);
	}
	let i = [], a = /* @__PURE__ */ new Map();
	for (let e of t.values()) {
		let t = n.get(e.id);
		if (!t) i.push(e);
		else {
			let n = a.get(t) ?? [];
			n.push(e), a.set(t, n);
		}
	}
	return {
		roots: i,
		byId: t,
		parents: n,
		children: a
	};
}
function Xo(e, t) {
	let n = [], r = e.parents.get(t);
	for (; r;) n.push(r), r = e.parents.get(r);
	return n;
}
function Zo(e, t, n = /* @__PURE__ */ new Set(), r = !1) {
	let i = /* @__PURE__ */ new Set();
	for (let t of n) {
		let n = e.parents.get(t);
		for (; n && !i.has(n);) i.add(n), n = e.parents.get(n);
	}
	let a = [], o = e.roots.map((e) => ({
		epic: e,
		depth: 0,
		hidden: !1
	})).reverse();
	for (; o.length;) {
		let n = o.pop(), s = e.children.get(n.epic.id) ?? [];
		if (a.push({
			...n,
			hasChildren: s.length > 0,
			busyBelow: i.has(n.epic.id)
		}), r || !t.has(n.epic.id)) for (let e = s.length - 1; e >= 0; e--) o.push({
			epic: s[e],
			depth: n.depth + 1,
			hidden: n.hidden || t.has(n.epic.id)
		});
	}
	return a;
}
function Qo(e, t) {
	let n = /* @__PURE__ */ new Map();
	for (let e of t) n.set(e.thread, Math.max(n.get(e.thread) ?? 0, e.id));
	return e.filter((e) => e.archived).map((e, t) => ({
		epic: e,
		index: t
	})).sort((e, t) => (n.get(t.epic.id) ?? 0) - (n.get(e.epic.id) ?? 0) || t.index - e.index).map(({ epic: e }) => e);
}
function $o(e, t, n, r) {
	if (t === n || new Set(e.map((e) => e.id)).size !== e.length) return null;
	let i = Yo(e.filter((e) => !e.archived));
	if (!i.byId.has(t) || !i.byId.has(n) || i.parents.get(t) !== i.parents.get(n)) return null;
	let a = e.map((e) => e.id).filter((e) => e !== t);
	return a.splice(a.indexOf(n) + +!!r, 0, t), a.every((t, n) => t === e[n]?.id) ? null : a;
}
// svelte/features/navigation/session.ts
function es() {
	try {
		return localStorage;
	} catch {
		return null;
	}
}
function ts(e, t) {
	try {
		let n = JSON.parse(t?.getItem(`vb.tree.${e}`) ?? "[]");
		if (Array.isArray(n) && n.every((e) => typeof e == "string")) return new Set(n);
	} catch {}
	return /* @__PURE__ */ new Set();
}
function ns(e, t) {
	try {
		e.storage?.setItem(`vb.tree.${e.roomId}`, JSON.stringify([...t]));
	} catch {}
}
function rs(e, t = !1, n = es()) {
	return {
		roomId: e,
		storage: n,
		state: ye({
			draft: "",
			closed: ts(e, n),
			openedFor: null,
			archived: t
		})
	};
}
function is(e, t, n) {
	let r = Oe(e.state);
	if (!t.byId.has(n) && n !== "main" && !n.startsWith("pre:") || r.openedFor === n) return;
	let i = new Set(r.closed);
	for (let e of Xo(t, n)) i.delete(e);
	ns(e, i), e.state.set({
		...r,
		closed: i,
		openedFor: n
	});
}
function as(e, t) {
	e.state.update((n) => {
		let r = new Set(n.closed);
		return r.has(t) ? r.delete(t) : r.add(t), ns(e, r), {
			...n,
			closed: r
		};
	});
}
function os(e, t, n, r = !1) {
	let i = e?.roomId === t.id ? e : rs(t.id, r);
	return is(i, Yo(t.epics), n), i;
}
// svelte/features/navigation/EpicTree.svelte
var ss = b("<span aria-hidden=\"true\" class=\"tw:w-8 tw:shrink-0\"></span>"), cs = b("<span class=\"tw:sr-only\"> </span>"), ls = b("<span role=\"img\" class=\"tw:text-primary\">✻</span>"), us = b("<span> </span>"), ds = b("<span class=\"tw:shrink-0 tw:text-xs tw:text-muted-foreground\"> </span>"), fs = b("<!> <span class=\"tw:min-w-0 tw:flex-1 tw:break-words\" data-epic-title=\"\"> <!></span> <!> <!> <!> <!>", 1), ps = b("<div class=\"tw:flex tw:flex-wrap tw:gap-2\"><!><!></div>"), ms = b("<li><div role=\"group\"><!> <!></div> <details class=\"tw:ml-8 tw:text-xs tw:text-muted-foreground\"><summary class=\"tw:cursor-pointer tw:rounded-control tw:px-2 tw:py-1 tw:focus-visible:outline-2 tw:focus-visible:outline-ring\"> </summary> <div class=\"tw:space-y-2 tw:p-2\"><!> <!> <!></div></details></li>"), hs = b(" <span class=\"tw:text-xs tw:text-muted-foreground\"> </span>", 1), gs = b("<form id=\"newEpic\" class=\"tw:space-y-2\"><!> <div class=\"tw:flex tw:gap-2\"><!><!></div></form> <!>", 1), _s = b("<ul class=\"tw:m-0 tw:list-none tw:space-y-1 tw:p-0\"></ul> <!>", 1), vs = b("<p role=\"alert\" class=\"tw:m-0 tw:text-sm tw:text-destructive\"> </p>"), ys = b("<section data-vb-native=\"\" class=\"tw:m-0 tw:box-border tw:space-y-3 tw:rounded-surface tw:bg-sidebar tw:p-3 tw:font-sans tw:text-sm tw:leading-5 tw:text-sidebar-foreground\"><!> <p role=\"status\" aria-live=\"polite\" class=\"tw:sr-only\"> </p> <!></section>");
function bs(e, n) {
	let r = ne();
	Re(n, !0);
	let i = () => ge(j(c), "$navigation", a), [a, s] = pe(), c = P(() => n.session.state), l = B(""), u = B(null), d = B(null), h = B(!1), y = B(null), b = !1, x = /* @__PURE__ */ new Map(), S = 0, C = B(null), T = B("");
	Ne(() => {
		b = !0, S++, x.clear();
	});
	let ee = [
		"tw:pl-0",
		"tw:pl-2",
		"tw:pl-4",
		"tw:pl-6",
		"tw:pl-8",
		"tw:pl-10",
		"tw:pl-12"
	], te = P(() => n.room.epics.filter((e) => !e.archived)), O = P(() => Qo(n.room.epics, n.room.messages)), k = P(() => i().archived && j(O).length > 0 ? "archived" : "active"), A = P(() => Yo(j(k) === "archived" ? j(O) : j(te))), ie = P(() => Yo(n.room.epics)), ae = P(() => new Set(n.room.epics.filter((e) => n.vb.epicBusy(e)).map((e) => e.id))), oe = P(() => Zo(j(A), i().closed, j(ae), !0)), se = P(() => new Map(j(oe).map((e, t) => [e.epic.id, `${r}-row-${t}`])));
	_(() => {
		is(n.session, j(ie), n.thread);
	});
	function le(e) {
		if (b) return;
		S++, H(C, null);
		let t = e === "archived";
		j(c).update((e) => ({
			...e,
			archived: t
		})), n.onarchchange(t), H(u, null), H(d, null), H(l, "");
	}
	function ue(e) {
		if (b || n.session.roomId !== n.room.id) return !1;
		H(l, "");
		try {
			if (n.send(e)) return !0;
		} catch {}
		return H(l, n.vb.t("Não deu pra enviar agora. Tente de novo."), !0), !1;
	}
	function I(e) {
		if (e.preventDefault(), b) return;
		let t = i().draft.trim();
		if (!t) return j(y)?.focus();
		ue({
			t: "epic",
			title: t
		}) && Fe(j(c), v(i).draft = "", v(i));
	}
	function de(e) {
		let t = j(A).parents.get(e);
		return t ? j(A).children.get(t) ?? [] : j(A).roots;
	}
	function fe(e, t) {
		let n = de(e);
		return n[n.findIndex((t) => t.id === e) + t];
	}
	function me(e, t, r) {
		let i = $o(n.room.epics, e, t, r);
		if (!i || b) return;
		H(C, null);
		let a = ++S, o = document.activeElement, s = o instanceof HTMLElement && x.get(e)?.contains(o) ? o : null;
		ue({
			t: "epic.order",
			ids: i
		}) && H(C, {
			ids: i,
			from: e,
			anchor: s,
			generation: a,
			thread: n.thread
		}, !0);
	}
	function he(e, t) {
		return x.set(t, e), { destroy() {
			x.get(t) === e && x.delete(t);
		} };
	}
	_(() => {
		let e = j(C);
		if (!e) return;
		if (e.thread !== n.thread || j(k) !== "active") {
			H(C, null), S++;
			return;
		}
		let t = n.room.epics.map((e) => e.id);
		if (!t.includes(e.from)) {
			H(C, null), _e(e);
			return;
		}
		let r = new Set(t), i = new Set(e.ids), a = e.ids.filter((e) => r.has(e)), o = t.filter((e) => i.has(e));
		o.length !== a.length || o.some((e, t) => e !== a[t]) || (H(C, null), H(T, n.vb.t("Ordem dos épicos atualizada."), !0), _e(e));
	});
	function _e(e) {
		let t = e.anchor;
		if (!t) return;
		let n = () => document.activeElement === document.body || document.activeElement === t;
		n() && p().then(() => {
			if (b || e.generation !== S || !n() || document.activeElement === t && !t.matches(":disabled")) return;
			let r = x.get(e.from);
			r?.hidden || (r?.querySelector("[data-epic-thread]") ?? j(y))?.focus({ preventScroll: !0 });
		});
	}
	function ve(e, t) {
		let n = fe(e, t);
		j(k) === "active" && n && me(e, n.id, t === 1);
	}
	function ye(e, t) {
		if (j(k) !== "active" || !e.dataTransfer) return e.preventDefault();
		e.dataTransfer.setData("text/vb-epic", t), e.dataTransfer.effectAllowed = "move", H(u, t, !0);
	}
	function be(e, t) {
		return j(k) === "active" && j(u) !== t && e.dataTransfer?.types.includes("text/vb-epic");
	}
	function xe(e, t) {
		if (!be(e, t)) return;
		e.preventDefault();
		let n = e.currentTarget instanceof HTMLElement ? e.currentTarget.getBoundingClientRect() : null;
		H(d, t, !0), H(h, !!n && e.clientY >= n.top + n.height / 2, !0);
	}
	function Ce(e, t) {
		let n = j(h);
		if (H(d, null), !be(e, t)) return;
		e.preventDefault();
		let r = e.dataTransfer?.getData("text/vb-epic");
		r && me(r, t, n), H(u, null);
	}
	var Ee = ys(), Oe = M(Ee);
	{
		let e = (e, a = He) => {
			var s = g(), l = N(s), p = (e) => {
				var s = _s(), l = N(s);
				E(l, 21, () => j(oe), (e) => e.epic.id, (e, r) => {
					let s = P(() => j(r).epic), c = P(() => i().closed.has(j(s).id)), l = P(() => j(A).byId.get(j(A).parents.get(j(s).id) ?? "")), p = P(() => n.vb.epicBusy(j(s)));
					var g = ms(), _ = M(g), v = M(_), y = (e) => {
						{
							let t = P(() => j(c) ? "chevronRight" : "chevronDown"), r = P(() => `${n.vb.t(j(c) ? "Abrir galho" : "Fechar galho")}: ${j(s).title}`), i = P(() => !j(c)), a = P(() => (j(A).children.get(j(s).id) ?? []).map((e) => j(se).get(e.id)).join(" "));
							De(e, {
								get icon() {
									return j(t);
								},
								get label() {
									return j(r);
								},
								get "aria-expanded"() {
									return j(i);
								},
								get "aria-controls"() {
									return j(a);
								},
								class: "tw:size-8 tw:p-1",
								onclick: () => as(n.session, j(s).id)
							});
						}
					}, b = (e) => {
						var t = ss();
						f(e, t);
					};
					R(v, (e) => {
						j(r).hasChildren ? e(y) : e(b, -1);
					});
					var x = t(v, 2);
					{
						let e = P(() => n.thread === j(s).id ? "page" : void 0);
						L(x, {
							variant: "ghost",
							class: "tw:h-auto tw:min-h-9 tw:min-w-0 tw:flex-1 tw:justify-start tw:gap-2 tw:whitespace-normal tw:px-1 tw:py-2 tw:text-left",
							get "data-epic-thread"() {
								return j(s).id;
							},
							get "aria-current"() {
								return j(e);
							},
							onclick: () => {
								n.thread === j(s).id && j(r).hasChildren ? as(n.session, j(s).id) : n.onopen(j(s).id);
							},
							children: (e, i) => {
								var a = fs(), o = N(a);
								{
									let e = P(() => j(s).owner ? n.vb.name(j(s).owner) : j(s).title), t = P(() => j(s).owner && n.room.avatars?.[j(s).owner] ? `/api/avatar/${encodeURIComponent(j(s).owner)}?v=${n.room.avatars[j(s).owner]}` : void 0);
									Se(o, {
										get name() {
											return j(e);
										},
										get src() {
											return j(t);
										},
										class: "tw:size-6 tw:text-xs"
									});
								}
								var u = t(o, 2), d = M(u, !0), m = t(d), h = (e) => {
									var t = cs(), r = D(t);
									V((e) => w(r, `· ${e ?? ""}`), [() => n.vb.t("Subépico de {title}", { title: j(l).title })]), f(e, t);
								};
								R(m, (e) => {
									j(l) && e(h);
								}), z(u);
								var g = t(u, 2), _ = (e) => {
									var t = ls();
									V((e) => U(t, "aria-label", e), [() => j(p) ? n.vb.t("{who} está trabalhando", { who: j(p) }) : n.vb.t("Trabalho em um subépico")]), f(e, t);
								};
								R(g, (e) => {
									(j(p) || j(c) && j(r).busyBelow) && e(_);
								});
								var v = t(g, 2), y = (e) => {
									Le(e, {
										variant: "warning",
										children: (e, t) => {
											F();
											var r = W();
											V((e) => w(r, e), [() => n.vb.waitCount(j(s).id)]), f(e, r);
										},
										$$slots: { default: !0 }
									});
								}, b = P(() => n.vb.waitCount(j(s).id));
								R(v, (e) => {
									j(b) && e(y);
								});
								var x = t(v, 2), S = (e) => {
									var t = us(), r = D(t, !0);
									V((e) => {
										U(t, "title", e), w(r, j(s).prod.stage === "verified" ? "✓✓" : "🚀");
									}, [() => n.vb.t(j(s).prod.stage === "verified" ? "Verificado em prod" : "No ar, falta verificar em prod")]), f(e, t);
								};
								R(x, (e) => {
									j(s).prod && e(S);
								});
								var C = t(x, 2), T = (e) => {
									var t = ds(), n = D(t);
									V((e) => w(n, `${e ?? ""}/${j(s).tasks.length ?? ""}`), [() => j(s).tasks.filter((e) => e.done).length]), f(e, t);
								};
								R(C, (e) => {
									j(s).tasks.length && e(T);
								}), V(() => w(d, j(s).title)), f(e, a);
							},
							$$slots: { default: !0 }
						});
					}
					z(_);
					var S = t(_, 2), C = M(S), T = D(C), E = t(C, 2), te = M(E);
					{
						let e = P(() => `${j(se).get(j(s).id)}-owner`);
						je(te, {
							get for() {
								return j(e);
							},
							children: (e, t) => {
								F();
								var r = W();
								V((e) => w(r, e), [() => n.vb.t("Dono do épico")]), f(e, r);
							},
							$$slots: { default: !0 }
						});
					}
					var ne = t(te, 2);
					{
						let e = P(() => `${j(se).get(j(s).id)}-owner`), t = P(() => `${n.vb.t("Dono do épico")}: ${j(s).title}`), r = P(() => j(s).owner ?? ""), i = P(() => [{
							value: "",
							label: n.vb.t("Sem dono")
						}, ...n.room.members.map((e) => ({
							value: e,
							label: n.vb.name(e)
						}))]);
						Te(ne, {
							get id() {
								return j(e);
							},
							get "aria-label"() {
								return j(t);
							},
							get value() {
								return j(r);
							},
							get items() {
								return j(i);
							},
							onValueChange: (e) => (ue({
								t: "epic.owner",
								id: j(s).id,
								owner: e
							}), !1)
						});
					}
					var O = t(ne, 2), k = (e) => {
						var r = ps(), i = M(r);
						{
							let e = P(() => !fe(j(s).id, -1)), t = P(() => `${n.vb.t("Mover para cima")}: ${j(s).title}`);
							L(i, {
								variant: "outline",
								size: "sm",
								get disabled() {
									return j(e);
								},
								get "aria-label"() {
									return j(t);
								},
								onclick: () => ve(j(s).id, -1),
								children: (e, t) => {
									F();
									var r = W();
									V((e) => w(r, e), [() => n.vb.t("Mover para cima")]), f(e, r);
								},
								$$slots: { default: !0 }
							});
						}
						var a = t(i);
						{
							let e = P(() => !fe(j(s).id, 1)), t = P(() => `${n.vb.t("Mover para baixo")}: ${j(s).title}`);
							L(a, {
								variant: "outline",
								size: "sm",
								get disabled() {
									return j(e);
								},
								get "aria-label"() {
									return j(t);
								},
								onclick: () => ve(j(s).id, 1),
								children: (e, t) => {
									F();
									var r = W();
									V((e) => w(r, e), [() => n.vb.t("Mover para baixo")]), f(e, r);
								},
								$$slots: { default: !0 }
							});
						}
						z(r), f(e, r);
					};
					R(O, (e) => {
						a() === "active" && e(k);
					}), z(E), z(S), z(g), Ge(g, (e, t) => he?.(e, t), () => j(s).id), V((e, t, n, i) => {
						U(g, "id", e), U(g, "hidden", j(r).hidden), U(g, "data-epic", j(s).id), U(g, "data-depth", j(r).depth), re(g, 1, t), U(_, "aria-label", j(s).title), U(_, "draggable", a() === "active"), re(_, 1, n), w(T, `${i ?? ""}: ${j(s).title ?? ""}`);
					}, [
						() => j(se).get(j(s).id),
						() => o(ee[Math.min(j(r).depth, ee.length - 1)]),
						() => o(ce("tw:flex tw:items-center tw:gap-1 tw:rounded-control tw:border tw:border-transparent", n.thread === j(s).id && "tw:bg-sidebar-accent tw:text-sidebar-accent-foreground", j(d) === j(s).id && (j(h) ? "tw:border-b-primary" : "tw:border-t-primary"), j(u) === j(s).id && "tw:opacity-50")),
						() => n.vb.t("Ações do épico")
					]), m("dragstart", _, (e) => ye(e, j(s).id)), m("dragend", _, () => {
						H(u, null), H(d, null);
					}), m("dragover", _, (e) => xe(e, j(s).id)), m("dragleave", _, () => {
						j(d) === j(s).id && H(d, null);
					}), m("drop", _, (e) => Ce(e, j(s).id)), f(e, g);
				}), z(l);
				var p = t(l, 2), g = (e) => {
					var a = gs(), o = N(a), s = M(o);
					{
						let e = P(() => `${r}-new`);
						je(s, {
							get for() {
								return j(e);
							},
							children: (e, t) => {
								F();
								var r = W();
								V((e) => w(r, e), [() => n.vb.t("Novo épico")]), f(e, r);
							},
							$$slots: { default: !0 }
						});
					}
					var l = t(s, 2), u = M(l), d = () => b ? "" : i().draft, p = (e) => {
						b || Fe(j(c), v(i).draft = e, v(i));
					};
					{
						let e = P(() => `${r}-new`), t = P(() => n.vb.t("Novo épico: escreva o título…"));
						Ve(u, {
							get id() {
								return j(e);
							},
							get value() {
								return d();
							},
							set value(e) {
								p(e);
							},
							get placeholder() {
								return j(t);
							},
							enterkeyhint: "done",
							get ref() {
								return j(y);
							},
							set ref(e) {
								H(y, e, !0);
							}
						});
					}
					var h = t(u);
					{
						let e = P(() => n.vb.t("Criar épico"));
						De(h, {
							type: "submit",
							icon: "plus",
							variant: "primary",
							get label() {
								return j(e);
							}
						});
					}
					z(l), z(o);
					var g = t(o, 2);
					E(g, 17, () => n.room.suggestions, we, (e, r, i) => {
						{
							let a = P(() => n.thread === `pre:${i}` ? "page" : void 0);
							L(e, {
								variant: "outline",
								class: "tw:h-auto tw:w-full tw:justify-start tw:whitespace-normal tw:border-dashed tw:text-left",
								get "aria-current"() {
									return j(a);
								},
								onclick: () => n.onopen(`pre:${i}`),
								children: (e, i) => {
									F();
									var a = hs(), o = N(a, !0), s = t(o), c = D(s, !0);
									V((e) => {
										w(o, j(r).title), w(c, e);
									}, [() => n.vb.t("sugestão do @vibe, clique para ver")]), f(e, a);
								},
								$$slots: { default: !0 }
							});
						}
					}), m("submit", o, I), f(e, a);
				};
				R(p, (e) => {
					a() === "active" && e(g);
				}), V((e) => U(l, "aria-label", e), [() => a() === "archived" ? n.vb.t("Arquivados") : n.vb.t("Épicos")]), f(e, s);
			};
			R(l, (e) => {
				a() === j(k) && e(p);
			}), f(e, s);
		}, a = P(() => [{
			value: "active",
			label: `${n.vb.t("Épicos")} · ${j(te).length}`
		}, {
			value: "archived",
			label: `${n.vb.t("Arquivados")} · ${j(O).length}`,
			disabled: j(O).length === 0
		}]), s = P(() => n.vb.t("Épicos"));
		Pe(Oe, {
			get items() {
				return j(a);
			},
			get label() {
				return j(s);
			},
			get value() {
				return j(k);
			},
			onValueChange: le,
			children: e,
			$$slots: { default: !0 }
		});
	}
	var ke = t(Oe, 2), Ae = D(ke, !0), Ie = t(ke, 2), ze = (e) => {
		var t = vs(), n = D(t, !0);
		V(() => w(n, j(l))), f(e, t);
	};
	R(Ie, (e) => {
		j(l) && e(ze);
	}), z(Ee), V((e) => {
		U(Ee, "aria-label", e), w(Ae, j(T));
	}, [() => n.vb.t("Épicos")]), f(e, Ee), Me(), s();
}
// svelte/features/pins/model.ts
function xs(e) {
	let t = e.trim();
	if (!t || t.length > 2e3 || /[\u0000-\u001f\u007f]/.test(t)) return null;
	try {
		let e = new URL(/^[a-z]+:\/\//i.test(t) ? t : `https://${t}`);
		return e.protocol === "http:" || e.protocol === "https:" ? e.href : null;
	} catch {
		return null;
	}
}
function Ss(e) {
	let t = /^(?:((?:[a-f0-9]{12}|room))\/)?([\w.-]{1,100})$/.exec(e);
	return t ? {
		connectionId: t[1] ?? "room",
		tool: t[2]
	} : null;
}
function Cs(e, t) {
	if (e.kind === "link") {
		let t = xs(e.ref);
		if (!t) return {
			kind: "unavailable",
			label: e.title || e.ref,
			reason: "Link inválido"
		};
		let n = new URL(t).hostname.replace(/^www\./, "");
		return {
			kind: "link",
			href: t,
			label: e.title || n,
			detail: n
		};
	}
	if (e.kind === "file") {
		let n = t.files?.find((t) => t.id === e.ref);
		return n ? {
			kind: "file",
			file: n,
			label: e.title || n.name,
			detail: "arquivo"
		} : t.filesAll ? {
			kind: "unavailable",
			label: e.title || e.ref,
			reason: "Arquivo indisponível"
		} : {
			kind: "file-unloaded",
			id: e.ref,
			label: e.title || e.ref
		};
	}
	if (e.kind === "app") {
		let n = Ss(e.ref), r = n?.connectionId === "room" && t.filesAll && !t.files?.some((e) => e.name === `apps/${n.tool}.html`);
		return n && !r ? {
			kind: "app",
			app: n,
			label: e.title || n.tool,
			detail: n.connectionId === "room" ? "app da sala" : "app"
		} : {
			kind: "unavailable",
			label: e.title || e.ref,
			reason: "App indisponível"
		};
	}
	return {
		kind: "unavailable",
		label: e.title || e.ref,
		reason: "Item indisponível"
	};
}
// svelte/features/pins/session.ts
var ws = () => ({
	url: "",
	title: ""
});
function Ts(e) {
	return {
		roomId: e,
		active: !0,
		pins: [],
		filesRequested: !1,
		sequence: 0,
		state: ye({
			adding: !1,
			draft: ws(),
			pending: null,
			issue: null,
			filesPending: !1,
			fileIssue: null
		})
	};
}
function Es(e) {
	e && (e.active = !1, e.sequence++);
}
function Ds(e) {
	e.active && e.state.update((e) => ({
		...e,
		adding: !0,
		issue: null
	}));
}
function Os(e, t) {
	e.active && e.state.update((e) => ({
		...e,
		draft: {
			...e.draft,
			...t
		},
		issue: null
	}));
}
function ks(e) {
	e.active && e.state.update((e) => ({
		...e,
		adding: !1,
		issue: null
	}));
}
function As(e, t) {
	return e.url === t.url && e.title === t.title;
}
function js(e, t, n) {
	return n.some((n) => n.kind === "link" && n.ref === e && (!t || n.title === t));
}
function Ms(e, t) {
	let n = e;
	n?.active && n.roomId === t.id || (Es(n), n = Ts(t.id)), n.pins = t.pins ?? [];
	let r = Oe(n.state), i = t.pins?.some((e) => e.kind === "file" && !t.files?.some((t) => t.id === e.ref));
	return (t.filesAll || !i) && (r.filesPending || r.fileIssue) && (r = {
		...r,
		filesPending: !1,
		fileIssue: null
	}, n.state.set(r)), n;
}
async function Ns(e, t, n, r, i) {
	if (!e.active || e.roomId !== t || Oe(e.state).pending) return;
	let a = ++e.sequence;
	e.state.update((e) => ({
		...e,
		pending: {
			sequence: a,
			command: r,
			draft: i
		},
		issue: null
	}));
	let o = () => e.active && e.sequence === a && Oe(e.state).pending?.sequence === a, s;
	try {
		s = await n(r);
	} catch {
		o() && e.state.update((e) => ({
			...e,
			pending: null,
			issue: { kind: "send-failed" }
		}));
		return;
	}
	if (!o()) return;
	let c = Oe(e.state);
	if (s.ok) {
		let t = r.t === "pin.add" && i && As(c.draft, i);
		e.state.set({
			...c,
			pending: null,
			issue: null,
			...t ? {
				adding: !1,
				draft: ws()
			} : {}
		});
		return;
	}
	let l = s.error === "offline" ? { kind: "offline" } : s.error === "timeout" || s.error === "disconnected" ? { kind: "unconfirmed" } : {
		kind: "rejected",
		detail: s.error
	};
	e.state.set({
		...c,
		pending: null,
		issue: l
	});
}
async function Ps(e, t, n) {
	if (!e.active || e.roomId !== t || Oe(e.state).pending) return;
	let r = Oe(e.state);
	if (!r.adding) return;
	let i = xs(r.draft.url);
	if (!i) {
		e.state.update((e) => ({
			...e,
			issue: { kind: "invalid-link" }
		}));
		return;
	}
	let a = r.draft.title.trim().slice(0, 80);
	if (js(i, a, e.pins)) e.state.set({
		...r,
		adding: !1,
		draft: ws(),
		issue: { kind: "already-pinned" }
	});
	else return Ns(e, t, n, {
		t: "pin.add",
		kind: "link",
		ref: i,
		title: a
	}, { ...r.draft });
}
async function Fs(e, t, n, r) {
	if (e.pins.some((e) => e.id === n)) return Ns(e, t, r, {
		t: "pin.del",
		id: n
	});
}
function Is(e, t, n, r = !1) {
	if (!e.active || e.roomId !== t.id || t.filesAll || !t.pins?.some((e) => e.kind === "file" && !t.files?.some((t) => t.id === e.ref)) || e.filesRequested && !r) return !1;
	e.filesRequested = !0, e.state.update((e) => ({
		...e,
		filesPending: !0,
		fileIssue: null
	}));
	try {
		if (n({ t: "files.get" })) return !0;
		e.state.update((e) => ({
			...e,
			filesPending: !1,
			fileIssue: "offline"
		}));
	} catch {
		e.state.update((e) => ({
			...e,
			filesPending: !1,
			fileIssue: "send-failed"
		}));
	}
	return !1;
}
// svelte/features/pins/PinnedItems.svelte
var Ls = b("<form class=\"tw:space-y-3 tw:rounded-surface tw:border tw:border-border tw:bg-card tw:p-3\"><div class=\"tw:space-y-1\"><!> <!></div> <div class=\"tw:space-y-1\"><!> <!></div> <div class=\"tw:flex tw:flex-wrap tw:justify-end tw:gap-2\"><!> <!></div></form>"), Rs = b("<p role=\"status\" class=\"tw:m-0 tw:font-sans tw:text-xs tw:leading-5 tw:text-muted-foreground\"> </p>"), zs = b("<a target=\"_blank\" rel=\"noopener noreferrer\" class=\"tw:flex tw:min-w-0 tw:flex-1 tw:items-center tw:gap-2 tw:rounded-control tw:px-2 tw:py-2 tw:font-sans tw:text-sm tw:text-foreground tw:no-underline tw:hover:bg-accent tw:focus-visible:outline-none tw:focus-visible:ring-2 tw:focus-visible:ring-ring\"><!><span class=\"tw:min-w-0\"><span class=\"tw:block tw:truncate\"> </span><span class=\"tw:block tw:truncate tw:text-xs tw:text-muted-foreground\"> </span></span></a>"), Bs = b("<!><span class=\"tw:min-w-0\"><span class=\"tw:block tw:truncate\"> </span><span class=\"tw:block tw:truncate tw:text-xs tw:font-normal tw:text-muted-foreground\"> </span></span>", 1), Vs = b("<div class=\"tw:flex tw:min-w-0 tw:flex-1 tw:items-start tw:gap-2 tw:px-2 tw:py-2 tw:font-sans tw:text-sm tw:text-muted-foreground\"><!><span class=\"tw:min-w-0\"><span class=\"tw:block tw:truncate\"> </span><span class=\"tw:block tw:text-xs\"> </span></span></div>"), Hs = b("<li class=\"tw:flex tw:items-start tw:gap-1\"><!> <!></li>"), Us = b("<ul class=\"tw:m-0 tw:list-none tw:space-y-1 tw:p-0\"></ul>"), Ws = b("<!> ", 1), Gs = b("<section class=\"tw:space-y-2 tw:border-t tw:border-border tw:bg-sidebar tw:px-3 tw:py-3 tw:font-sans tw:text-sm tw:text-sidebar-foreground\" data-native-pins=\"\" data-vb-native=\"\"><div class=\"tw:flex tw:items-center tw:justify-between tw:gap-2\"><h2 class=\"tw:m-0 tw:font-sans tw:text-xs tw:font-semibold tw:uppercase tw:tracking-wide tw:text-muted-foreground\"> </h2> <!></div> <!> <!> <!> <!> <!> <!></section>");
function Ks(e, n) {
	Re(n, !0);
	let r = () => ge(j(h), "$pinState", i), [i, a] = pe(), o = !1;
	Ne(() => {
		o = !0;
	});
	function s() {
		return !o && n.session.active && n.session.roomId === n.room.id;
	}
	function c(e) {
		s() && Os(n.session, e);
	}
	function l(e) {
		s() && e.key === "Escape" && (e.preventDefault(), e.stopPropagation(), ne());
	}
	function u() {
		s() && Is(n.session, n.room, n.send, !0);
	}
	function d(e) {
		s() && Fs(n.session, n.room.id, e, n.request);
	}
	let h = P(() => n.session.state), g = P(() => (n.room.pins ?? []).map((e) => ({
		pin: e,
		target: Cs(e, n.room)
	}))), v = P(() => j(g).some((e) => e.target.kind === "file-unloaded")), y = B(null), b = B(null), x = P(() => n.session.active && n.session.roomId === n.room.id), S = B(null), C = B(null), T = P(() => `pin-url-${n.room.id}`), ee = (e) => n.t({
		"invalid-link": "Use um link http ou https válido.",
		offline: "Sem conexão. Seu rascunho foi mantido.",
		"send-failed": "Não deu pra enviar agora. Tente de novo.",
		unconfirmed: "Ainda não recebi confirmação. Confira os fixados antes de tentar de novo.",
		"already-pinned": "Este link já está nos fixados.",
		rejected: "Não deu pra atualizar os fixados. Tente de novo."
	}[e.kind]);
	_(() => {
		if (o || !j(y)) return;
		if (j(b) !== n.session || !n.session.active || n.session.roomId !== n.room.id) {
			H(y, null), H(b, null);
			return;
		}
		let e = n.room.pins?.find((e) => e.id === j(y) && e.kind === "file");
		if (!e) {
			H(y, null), H(b, null);
			return;
		}
		let t = Cs(e, n.room);
		t.kind === "file" ? (H(y, null), H(b, null), n.onopenfile(t.file)) : n.room.filesAll && (H(y, null), H(b, null));
	});
	async function te() {
		if (!s()) return;
		let e = n.session;
		Ds(e), await p(), !o && n.session === e && e.active && e.roomId === n.room.id && j(S)?.isConnected && j(S).focus();
	}
	async function ne() {
		if (!s()) return;
		let e = n.session;
		ks(e), await p(), !o && n.session === e && e.active && e.roomId === n.room.id && j(C)?.isConnected && j(C).focus();
	}
	function O(e) {
		e.preventDefault(), s() && Ps(n.session, n.room.id, n.request);
	}
	function re(e) {
		if (!s()) return;
		let t = n.room.pins?.find((t) => t.id === e);
		if (!t) return;
		let i = Cs(t, n.room);
		i.kind === "file" && n.onopenfile(i.file), i.kind === "app" && n.onopenapp(i.app), i.kind === "file-unloaded" && (H(b, n.session), H(y, e, !0), Is(n.session, n.room, n.send, !r().filesPending));
	}
	var k = Gs(), A = M(k), ae = M(A), oe = D(ae, !0), se = t(ae, 2), ce = (e) => {
		{
			let t = P(() => n.t("Fixar um link")), r = P(() => !j(x));
			De(e, {
				get label() {
					return j(t);
				},
				icon: "plus",
				get disabled() {
					return j(r);
				},
				onclick: te,
				get ref() {
					return j(C);
				},
				set ref(e) {
					H(C, e, !0);
				}
			});
		}
	};
	R(se, (e) => {
		r().adding || e(ce);
	}), z(A);
	var ue = t(A, 2), I = (e) => {
		var i = Ls(), a = M(i), o = M(a);
		je(o, {
			get for() {
				return j(T);
			},
			children: (e, t) => {
				F();
				var r = W();
				V((e) => w(r, e), [() => n.t("Link pra fixar")]), f(e, r);
			},
			$$slots: { default: !0 }
		});
		var s = t(o, 2);
		{
			let e = P(() => n.t("Cole um link (site, repo, painel…)")), t = P(() => !j(x)), i = P(() => r().issue?.kind === "invalid-link" || void 0);
			Ve(s, {
				get id() {
					return j(T);
				},
				name: "url",
				get value() {
					return r().draft.url;
				},
				onkeydown: l,
				oninput: (e) => c({ url: e.currentTarget.value }),
				required: !0,
				maxlength: 2e3,
				autocomplete: "url",
				get placeholder() {
					return j(e);
				},
				get disabled() {
					return j(t);
				},
				get "aria-invalid"() {
					return j(i);
				},
				get ref() {
					return j(S);
				},
				set ref(e) {
					H(S, e, !0);
				}
			});
		}
		z(a);
		var u = t(a, 2), d = M(u);
		{
			let e = P(() => `${j(T)}-title`);
			je(d, {
				get for() {
					return j(e);
				},
				children: (e, t) => {
					F();
					var r = W();
					V((e) => w(r, e), [() => n.t("Nome (opcional)")]), f(e, r);
				},
				$$slots: { default: !0 }
			});
		}
		var p = t(d, 2);
		{
			let e = P(() => `${j(T)}-title`), t = P(() => !j(x));
			Ve(p, {
				get id() {
					return j(e);
				},
				name: "title",
				get value() {
					return r().draft.title;
				},
				onkeydown: l,
				oninput: (e) => c({ title: e.currentTarget.value }),
				maxlength: 80,
				get disabled() {
					return j(t);
				}
			});
		}
		z(u);
		var h = t(u, 2), g = M(h);
		{
			let e = P(() => !j(x));
			L(g, {
				variant: "ghost",
				size: "sm",
				get disabled() {
					return j(e);
				},
				onclick: ne,
				onkeydown: l,
				children: (e, t) => {
					F();
					var r = W();
					V((e) => w(r, e), [() => n.t("Cancelar")]), f(e, r);
				},
				$$slots: { default: !0 }
			});
		}
		var _ = t(g, 2);
		{
			let e = P(() => !j(x) || !!r().pending);
			L(_, {
				type: "submit",
				size: "sm",
				get disabled() {
					return j(e);
				},
				onkeydown: l,
				children: (e, t) => {
					F();
					var r = W();
					V((e) => w(r, e), [() => n.t("Fixar")]), f(e, r);
				},
				$$slots: { default: !0 }
			});
		}
		z(h), z(i), V((e) => U(i, "aria-label", e), [() => n.t("Fixar um link")]), m("submit", i, O), f(e, i);
	};
	R(ue, (e) => {
		r().adding && e(I);
	});
	var fe = t(ue, 2), me = (e) => {
		var t = Rs(), r = D(t, !0);
		V((e) => w(r, e), [() => n.t("Aguardando confirmação…")]), f(e, t);
	};
	R(fe, (e) => {
		r().pending && e(me);
	});
	var he = t(fe, 2), _e = (e) => {
		var t = Rs(), n = D(t, !0);
		V((e) => w(n, e), [() => ee(r().issue)]), f(e, t);
	}, ve = (e) => {
		{
			let t = P(() => ee(r().issue));
			de(e, {
				compact: !0,
				get title() {
					return j(t);
				},
				get description() {
					return r().issue.detail;
				}
			});
		}
	};
	R(he, (e) => {
		r().issue?.kind === "already-pinned" ? e(_e) : r().issue && e(ve, 1);
	});
	var ye = t(he, 2), be = (e) => {
		{
			let t = P(() => ee({ kind: r().fileIssue }));
			de(e, {
				compact: !0,
				get title() {
					return j(t);
				}
			});
		}
	};
	R(ye, (e) => {
		r().fileIssue && e(be);
	});
	var xe = t(ye, 2), Se = (e) => {
		{
			let t = P(() => !j(x));
			L(e, {
				variant: "ghost",
				size: "sm",
				get disabled() {
					return j(t);
				},
				onclick: u,
				children: (e, t) => {
					F();
					var r = W();
					V((e) => w(r, e), [() => n.t("Tentar carregar novamente")]), f(e, r);
				},
				$$slots: { default: !0 }
			});
		}
	};
	R(xe, (e) => {
		j(v) && (r().filesPending || r().fileIssue) && e(Se);
	});
	var Ce = t(xe, 2), we = (e) => {
		var i = Us();
		E(i, 21, () => j(g), ({ pin: e, target: t }) => e.id, (e, i) => {
			let a = () => j(i).pin, o = () => j(i).target;
			var c = Hs(), l = M(c), u = (e) => {
				var n = zs(), r = M(n);
				le(r, { name: "chevronRight" });
				var i = t(r), a = M(i), c = D(a, !0), l = t(a), u = D(l, !0);
				z(i), z(n), V(() => {
					U(n, "href", o().href), U(n, "title", o().href), w(c, o().label), w(u, o().detail);
				}), ie("click", n, (e) => {
					s() || e.preventDefault();
				}), f(e, n);
			}, p = (e) => {
				{
					let i = P(() => !j(x));
					L(e, {
						variant: "ghost",
						class: "tw:h-auto tw:min-w-0 tw:flex-1 tw:justify-start tw:whitespace-normal tw:px-2 tw:py-2 tw:text-left",
						get disabled() {
							return j(i);
						},
						onclick: () => re(a().id),
						children: (e, i) => {
							var a = Bs(), s = N(a);
							le(s, { name: "chevronRight" });
							var c = t(s), l = M(c), u = D(l, !0), d = t(l), p = D(d, !0);
							z(c), V((e) => {
								w(u, o().label), w(p, e);
							}, [() => o().kind === "file-unloaded" ? n.t(r().filesPending ? "Carregando arquivo…" : "Carregar arquivo") : n.t(o().detail)]), f(e, a);
						},
						$$slots: { default: !0 }
					});
				}
			}, m = (e) => {
				var r = Vs(), i = M(r);
				le(i, {
					name: "warning",
					class: "tw:mt-0.5"
				});
				var a = t(i), s = M(a), c = D(s, !0), l = t(s), u = D(l, !0);
				z(a), z(r), V((e) => {
					w(c, o().label), w(u, e);
				}, [() => n.t(o().reason)]), f(e, r);
			};
			R(l, (e) => {
				o().kind === "link" ? e(u) : o().kind === "file" || o().kind === "app" || o().kind === "file-unloaded" ? e(p, 1) : e(m, -1);
			});
			var h = t(l, 2);
			{
				let e = P(() => n.t("Desafixar {name}", { name: o().label })), t = P(() => !j(x) || !!r().pending);
				De(h, {
					icon: "close",
					get label() {
						return j(e);
					},
					get disabled() {
						return j(t);
					},
					onclick: () => d(a().id)
				});
			}
			z(c), V(() => U(c, "data-pin-id", a().id)), f(e, c);
		}), z(i), f(e, i);
	}, Te = (e) => {
		{
			let r = P(() => !j(x));
			L(e, {
				variant: "ghost",
				class: "tw:w-full tw:justify-start tw:whitespace-normal tw:text-left tw:text-muted-foreground",
				get disabled() {
					return j(r);
				},
				onclick: te,
				children: (e, r) => {
					var i = Ws(), a = N(i);
					le(a, { name: "plus" });
					var o = t(a, 1, !0);
					V((e) => w(o, e), [() => n.t("Fixar site, repo ou app")]), f(e, i);
				},
				$$slots: { default: !0 }
			});
		}
	};
	R(Ce, (e) => {
		j(g).length ? e(we) : r().adding || e(Te, 1);
	}), z(k), V((e) => {
		U(k, "aria-labelledby", `pins-title-${n.room.id}`), U(ae, "id", `pins-title-${n.room.id}`), w(oe, e);
	}, [() => n.t("Fixados")]), f(e, k), Me(), a();
}
i(["click"]);
// svelte/Sidebar.svelte
var qs = b("<button type=\"button\" class=\"iconBtn phOnly\" id=\"sideArch\"></button> <button type=\"button\" class=\"iconBtn phOnly\" id=\"sideDel\"></button>", 1), Js = b("<span class=\"rowEdit phOnly\" role=\"button\" tabindex=\"0\" id=\"sideRename\"><!> </span>"), Ys = b("<button type=\"button\" class=\"sheetGrab\"><i></i></button> <!> <div class=\"sideHead\"><div class=\"sideTop\"><a data-nav=\"\" href=\"/app\" class=\"muted\"><!> vibebooks</a> <!> <button type=\"button\" class=\"iconBtn\" id=\"railToggle\" aria-expanded=\"true\"></button></div></div> <div class=\"sec threadsSec\"><button type=\"button\" data-thread=\"main\"><!><span class=\"rt\"> </span> <!> <!><span class=\"n\"> </span></button> <!></div> <!>  <!>", 1);
function Xs(e, n) {
	Re(n, !0);
	let r = (e, t = He) => {
		var r = g(), i = N(r);
		c(i, () => n.vb.agentRows(t())), f(e, r);
	}, i = (e) => {
		var t = g(), r = N(t);
		c(r, () => n.vb.sbxRows()), f(e, t);
	}, a = I(n, "foldOpen", 23, () => ({
		off: !1,
		friends: null
	})), o = I(n, "friends", 19, () => []), s = (e) => n.room.counts ? (n.room.counts[e] ?? 0) + n.room.messages.filter((t) => t.thread === e && t.id > (n.room.countsAt ?? 0)).length : n.room.messages.filter((t) => t.thread === e).length, l = P(() => n.room.epics.find((e) => e.id === n.thread));
	var u = Ys(), d = N(u), p = t(d, 2);
	c(p, () => n.vb.roomStrip());
	var m = t(p, 2), h = M(m), _ = M(h), v = M(_);
	c(v, () => n.vb.icon("back")), F(), z(_);
	var y = t(_, 2), b = (e) => {
		var r = qs(), i = N(r);
		c(i, () => n.vb.icon(j(l).archived ? "undo" : "check", 18), !0), z(i);
		var a = t(i, 2);
		c(a, () => n.vb.icon("trash", 18), !0), z(a), V((e, t, n, r) => {
			U(i, "title", e), U(i, "aria-label", t), U(a, "title", n), U(a, "aria-label", r);
		}, [
			() => j(l).archived ? n.vb.t("Desarquivar épico") : n.vb.t("Arquivar épico (concluído)"),
			() => j(l).archived ? n.vb.t("Desarquivar épico") : n.vb.t("Arquivar épico"),
			() => n.vb.t("Apagar épico"),
			() => n.vb.t("Apagar épico")
		]), f(e, r);
	};
	R(y, (e) => {
		j(l) && e(b);
	});
	var x = t(y, 2);
	c(x, () => n.vb.icon("sidebar", 20), !0), z(x), z(h), z(m);
	var S = t(m, 2), C = M(S);
	let T;
	var E = M(C);
	c(E, () => n.vb.roomMark("ri roomIco"));
	var ee = t(E), te = D(ee, !0), ne = t(ee, 2), O = (e) => {
		var r = Js(), i = M(r);
		c(i, () => n.vb.icon("pencil", 13));
		var a = t(i);
		z(r), V((e, t) => {
			U(r, "title", e), w(a, ` ${t ?? ""}`);
		}, [() => n.vb.t("Renomear"), () => n.vb.t("editar")]), f(e, r);
	}, k = P(() => !n.thread.startsWith("pre:"));
	R(ne, (e) => {
		j(k) && e(O);
	});
	var A = t(ne, 2);
	c(A, () => n.vb.waitPill("main"));
	var ie = t(A), ae = D(ie, !0);
	z(C);
	var oe = t(C, 2);
	{
		let e = P(() => ({
			t: n.vb.t,
			name: n.vb.name,
			epicBusy: n.vb.epicBusy,
			waitCount: (e) => n.vb.waitsIn(e).length
		}));
		bs(oe, {
			get room() {
				return n.room;
			},
			get thread() {
				return n.thread;
			},
			get session() {
				return n.navigation;
			},
			get send() {
				return n.send;
			},
			get onopen() {
				return n.onopen;
			},
			get onarchchange() {
				return n.onarchchange;
			},
			get vb() {
				return j(e);
			}
		});
	}
	z(S);
	var se = t(S, 2);
	Ks(se, {
		get room() {
			return n.room;
		},
		get session() {
			return n.pins;
		},
		get send() {
			return n.send;
		},
		get request() {
			return n.request;
		},
		get onopenfile() {
			return n.onopenpinfile;
		},
		get onopenapp() {
			return n.onopenpinapp;
		},
		get t() {
			return n.vb.t;
		}
	});
	var ce = t(se, 2);
	{
		let e = P(() => ({
			t: n.vb.t,
			name: n.vb.name,
			ago: n.vb.ago,
			avatarUrl: n.vb.avatarUrl
		}));
		Jo(ce, {
			get room() {
				return n.room;
			},
			get friends() {
				return o();
			},
			get foldOpen() {
				return a();
			},
			get vb() {
				return j(e);
			},
			get agents() {
				return r;
			},
			get sandboxes() {
				return i;
			},
			onfoldchange: (e, t) => {
				a()[e] = t;
			}
		});
	}
	V((e, t, r, i, a, o, s) => {
		U(d, "aria-label", e), U(x, "title", t), U(x, "aria-label", r), T = re(C, 1, "thread", null, T, {
			sel: n.thread === "main",
			waiting: i
		}), U(C, "title", a), w(te, o), w(ae, s);
	}, [
		() => n.vb.t("Fechar"),
		() => n.vb.t("Recolher menu"),
		() => n.vb.t("Recolher menu"),
		() => n.vb.waitsIn("main").length > 0,
		() => `${n.vb.bookTitle()}${n.room.book?.summary ? ` · ${n.room.book.summary}` : ""}`,
		() => n.vb.bookTitle(),
		() => s("main")
	]), f(e, u), Me();
}
// svelte/Message.svelte
var Zs = b("<span class=\"gut\"> </span>"), Qs = b(" <span class=\"agentTag\">agent</span>", 1), $s = b("<span class=\"doneTag\"> </span>"), ec = b("<div><!> <!> <span class=\"mact\"><button type=\"button\" class=\"rbtn\"><!> </button> <button type=\"button\" class=\"rbtn\"><!> </button> <button type=\"button\" class=\"rbtn\"><!> </button></span> <div class=\"body\"><!> <div class=\"who\"><!> <!> <span class=\"hhmm\"> </span></div> <div class=\"txt\"></div> <!> <!> <!> <!> <!></div></div>");
function tc(e, n) {
	Re(n, !0);
	let r = I(n, "origin", 3, !1), i = P(() => n.vb.continues(n.previous, n.message)), a = P(() => n.message.tag === "reminder" ? n.vb.remHtml(n.message, r()) : n.message.tag === "issue" ? n.vb.issueHtml(n.message) : n.vb.isNotice(n.message) ? n.vb.noticeHtml(n.message) : null), o = P(() => r() && j(a) ? j(a).replace(/\sid="m\d+"/, "") : j(a)), s = P(() => !n.message.text && n.typing ? `<span class="typing">${n.vb.esc(n.vb.typingNote?.(n.message.id) || n.vb.t("pensando ({mode})", { mode: n.vb.typingLabel?.(n.typing) ?? n.typing }))}…</span>` : n.message.author === "ai" ? n.message.text ? n.vb.mentions(n.vb.md(n.message.text)) : n.message.poll ? "" : `<span class="typing">${n.vb.t("pensando…")}</span>` : n.message.text ? n.vb.mentions(n.message.kind === "agent" ? n.vb.md(n.message.text) : n.vb.linkify(n.vb.esc(n.message.text))) : ""), l = P(() => n.vb.dateTime?.(n.message.ts) ?? new Date(n.message.ts).toLocaleString());
	var u = g(), d = N(u), p = (e) => {
		var t = g(), n = N(t);
		c(n, () => j(o)), f(e, t);
	}, m = (e) => {
		var a = ec();
		let o;
		var u = M(a);
		c(u, () => n.message.kind === "agent" ? n.vb.agentAvatar(n.message.author, n.message.via) : n.vb.avatar(n.message.author));
		var d = t(u, 2), p = (e) => {
			var t = Zs(), r = D(t, !0);
			V((e) => {
				U(t, "title", j(l)), w(r, e);
			}, [() => n.vb.hhmm(n.message.ts)]), f(e, t);
		};
		R(d, (e) => {
			j(i) && e(p);
		});
		var m = t(d, 2), h = M(m), _ = M(h);
		c(_, () => n.vb.icon("copy", 14));
		var v = t(_);
		z(h);
		var y = t(h, 2), b = M(y);
		c(b, () => n.vb.icon("link", 14));
		var x = t(b);
		z(y);
		var S = t(y, 2), C = M(S);
		c(C, () => n.vb.icon("reply", 14));
		var T = t(C);
		z(S), z(m);
		var E = t(m, 2), ee = M(E), te = (e) => {
			var t = g(), r = N(t);
			c(r, () => n.vb.quoteHtml(n.message.reply_to)), f(e, t);
		};
		R(ee, (e) => {
			n.message.reply_to && e(te);
		});
		var ne = t(ee, 2), O = M(ne), k = (e) => {
			var r = Qs(), i = N(r), a = t(i);
			V((e, t) => {
				w(i, `${e ?? ""} `), U(a, "title", t);
			}, [() => n.vb.t("{via} de {who}", {
				via: n.message.via || "agent",
				who: n.vb.name(n.message.author)
			}), () => n.vb.t("Escrito pelo agent dessa pessoa, em nome dela")]), f(e, r);
		}, A = (e) => {
			var t = W();
			V((e) => w(t, e), [() => n.vb.name(n.message.author)]), f(e, t);
		};
		R(O, (e) => {
			n.message.kind === "agent" ? e(k) : e(A, -1);
		});
		var ie = t(O, 2), ae = (e) => {
			var t = $s(), r = D(t);
			V((e, n) => {
				U(t, "title", e), w(r, `✓ ${n ?? ""}`);
			}, [() => n.vb.t("Reporta algo entregue"), () => n.vb.t("entregue")]), f(e, t);
		};
		R(ie, (e) => {
			n.message.tag === "done" && e(ae);
		});
		var oe = t(ie), se = t(oe), P = D(se, !0);
		z(ne);
		var ce = t(ne, 2);
		c(ce, () => j(s), !0), z(ce);
		var le = t(ce, 2);
		c(le, () => n.vb.attHtml(n.message.files));
		var ue = t(le, 2), F = (e) => {
			var t = g(), r = N(t);
			c(r, () => n.vb.cardHtml(n.message)), f(e, t);
		};
		R(ue, (e) => {
			n.message.card && e(F);
		});
		var I = t(ue, 2), de = (e) => {
			var t = g(), r = N(t);
			c(r, () => n.vb.choiceHtml(n.message)), f(e, t);
		};
		R(I, (e) => {
			n.message.choices && e(de);
		});
		var fe = t(I, 2), pe = (e) => {
			var t = g(), r = N(t);
			c(r, () => n.vb.pollHtml(n.message.poll)), f(e, t);
		};
		R(fe, (e) => {
			n.message.poll && e(pe);
		});
		var me = t(fe, 2), he = (e) => {
			var t = g(), r = N(t);
			c(r, () => n.vb.threadCards(n.message.id)), f(e, t);
		};
		R(me, (e) => {
			r() || e(he);
		}), z(E), z(a), V((e, t, c, u, d, f, p, m, g, _, b, C) => {
			o = re(a, 1, "msg", null, o, {
				ai: n.message.author === "ai",
				agent: n.message.author !== "ai" && n.message.kind === "agent",
				done: n.message.tag === "done",
				cont: j(i),
				waitMsg: e
			}), U(a, "id", r() ? void 0 : `m${n.message.id}`), U(h, "data-copymsg", n.message.id), U(h, "title", t), U(h, "aria-label", c), w(v, ` ${u ?? ""}`), U(y, "data-copylink", n.message.id), U(y, "title", d), U(y, "aria-label", f), w(x, ` ${p ?? ""}`), U(S, "data-reply", n.message.id), U(S, "title", m), U(S, "aria-label", g), w(T, ` ${_ ?? ""}`), w(oe, ` · ${b ?? ""}`), U(se, "title", j(l)), w(P, C), U(ce, "hidden", !j(s));
		}, [
			() => n.vb.waiting(n.message.id),
			() => n.vb.t("Copiar"),
			() => n.vb.t("Copiar o texto desta mensagem"),
			() => n.vb.t("Copiar"),
			() => n.vb.t("Copiar link"),
			() => n.vb.t("Copiar o link desta mensagem"),
			() => n.vb.t("Copiar link"),
			() => n.vb.t("Responder"),
			() => n.vb.t("Responder a esta mensagem"),
			() => n.vb.t("Responder"),
			() => n.vb.ago(n.message.ts),
			() => n.vb.hhmm(n.message.ts)
		]), f(e, a);
	};
	R(d, (e) => {
		j(o) === null ? e(m, -1) : e(p);
	}), f(e, u), Me();
}
// svelte/Chat.svelte
var nc = b("<div class=\"older\"><button type=\"button\" class=\"ghost\" id=\"olderBtn\"> </button></div>"), rc = b("<div class=\"origin\"><!> <div class=\"replies\"><span> </span><button type=\"button\" class=\"ghost\"> <!></button></div></div>"), ic = b("<div><!></div>"), ac = b("<!> <!> <!>", 1);
function oc(e, n) {
	Re(n, !0);
	let i = I(n, "more", 3, !1), a = I(n, "origin", 3, null), o = I(n, "replyCount", 3, 0);
	var s = g(), l = N(s);
	r(l, () => n.room.id + ":" + n.thread, (e) => {
		var r = ac(), s = N(r), l = (e) => {
			var t = nc(), r = M(t), i = D(r, !0);
			z(t), V((e) => w(i, e), [() => n.vb.t("Carregar mensagens anteriores")]), ie("click", r, function(...e) {
				n.onloadolder?.apply(this, e);
			}), f(e, t);
		};
		R(s, (e) => {
			n.list.length && i() && e(l);
		});
		var u = t(s, 2), d = (e) => {
			var r = rc(), i = M(r);
			tc(i, {
				get message() {
					return a();
				},
				origin: !0,
				get typing() {
					return n.room.typing[a().id];
				},
				get vb() {
					return n.vb;
				}
			});
			var s = t(i, 2), l = M(s), u = D(l, !0), d = t(l), p = M(d), m = t(p);
			c(m, () => n.vb.icon("reply", 13)), z(d), z(s), z(r), V((e, t) => {
				w(u, e), U(d, "data-gomain", a().id), w(p, `${t ?? ""} `);
			}, [() => o() === 1 ? n.vb.t("1 resposta") : n.vb.t("{n} respostas", { n: o() }), () => n.vb.t("ver na sala principal")]), f(e, r);
		};
		R(u, (e) => {
			a() && e(d);
		});
		var p = t(u, 2), m = (e) => {
			var t = g(), r = N(t);
			E(r, 19, () => n.list, (e) => e.id, (e, t, r) => {
				{
					let i = P(() => j(r) ? n.list[j(r) - 1] : n.previous);
					tc(e, {
						get message() {
							return j(t);
						},
						get previous() {
							return j(i);
						},
						get typing() {
							return n.room.typing[j(t).id];
						},
						get vb() {
							return n.vb;
						}
					});
				}
			}), f(e, t);
		}, h = (e) => {
			var t = ic();
			let r;
			var i = M(t), o = (e) => {
				var t = g(), r = N(t);
				c(r, () => n.vb.t("Comece a conversa. Os agents ligados nesta sala leem e respondem; o seu age com o seu OK. Ex.: <i>organiza o projeto em épicos: site novo, aluguéis e domínio</i>.")), f(e, t);
			}, s = (e) => {
				var t = W();
				V((e) => w(t, e), [() => n.vb.t("Discussão deste épico. Os agents leem as tarefas, o doc e a sala principal.")]), f(e, t);
			};
			R(i, (e) => {
				n.thread === "main" ? e(o) : e(s, -1);
			}), z(t), V(() => r = re(t, 1, "empty", null, r, { afterOrigin: !!a() })), f(e, t);
		};
		R(p, (e) => {
			n.list.length ? e(m) : e(h, -1);
		}), f(e, r);
	}), f(e, s), Me();
}
i(["click"]);
// svelte/roomStore.ts
function sc(e, t, n) {
	if (t.t === "state") return {
		...t,
		id: n,
		typing: {}
	};
	if (!e || e.id !== n) return e;
	let r = e, i = (e, t) => r.messages.map((n) => n.id === e ? {
		...n,
		...t
	} : n);
	switch (t.t) {
		case "msg": return {
			...r,
			messages: r.messages.some((e) => e.id === t.m.id) ? r.messages : [...r.messages, t.m]
		};
		case "moved": return {
			...r,
			messages: i(t.id, { thread: t.thread })
		};
		case "closed": return {
			...r,
			messages: i(t.id, { choices: t.choices })
		};
		case "delta": {
			let e = { ...r.typing };
			return delete e[t.id], {
				...r,
				messages: i(t.id, { text: t.text }),
				typing: e
			};
		}
		case "typing": return {
			...r,
			typing: {
				...r.typing,
				[t.id]: t.mode
			}
		};
		case "epics": return {
			...r,
			epics: t.epics,
			roomTasks: t.roomTasks ?? r.roomTasks
		};
		case "epicsPatch": {
			let e = new Map(r.epics.map((e) => [e.id, e]));
			return t.changed.forEach((t) => e.set(t.id, t)), t.order.some((t) => !e.has(t)) ? r : {
				...r,
				epics: t.order.map((t) => e.get(t)),
				roomTasks: t.roomTasks ?? r.roomTasks
			};
		}
		case "docNotes": return {
			...r,
			docNotes: t.notes
		};
		case "doc": {
			let e = { ...r.docs };
			return t.stale ? (t.epic && delete e[t.epic], {
				...r,
				docs: e
			}) : t.epic ? {
				...r,
				docs: {
					...e,
					[t.epic]: t.text ?? ""
				}
			} : {
				...r,
				doc: t.text ?? ""
			};
		}
		case "meta": return {
			...r,
			book: {
				...r.book,
				...t.title ? { title: t.title } : {},
				...t.folder ? { folder: t.folder } : {},
				...t.summary ? { summary: t.summary } : {}
			}
		};
		case "suggestions": return {
			...r,
			suggestions: t.suggestions
		};
		case "requests": return {
			...r,
			requests: t.requests
		};
		case "members": return {
			...r,
			members: t.members,
			pending: t.pending,
			requests: t.requests ?? r.requests,
			names: t.names ?? r.names,
			avatars: t.avatars ?? r.avatars
		};
		case "files": return {
			...r,
			files: t.files,
			filesN: t.files.length,
			filesAll: !0
		};
		case "fileAdd": return {
			...r,
			files: [t.file, ...(r.files ?? []).filter((e) => e.id !== t.file.id)],
			filesN: (r.filesN ?? r.files?.length ?? 0) + +!(r.files ?? []).some((e) => e.id === t.file.id)
		};
		case "reminders": return {
			...r,
			reminders: t.reminders
		};
		case "decisions": return {
			...r,
			decisions: t.decisions
		};
		case "pins": return {
			...r,
			pins: t.pins
		};
		case "receipts": return {
			...r,
			receipts: t.receipts
		};
		case "older": {
			let e = new Map(r.messages.map((e) => [e.id, e]));
			return t.messages.forEach((t) => {
				e.has(t.id) || e.set(t.id, t);
			}), {
				...r,
				messages: [...e.values()].sort((e, t) => e.id - t.id)
			};
		}
		case "acks": return {
			...r,
			acks: t.acks
		};
		case "ackRows": {
			let e = (e) => `${e.msg_id}|${e.agent ?? e.email}`, n = new Set(t.acks.map(e));
			return {
				...r,
				acks: [...t.acks, ...(r.acks ?? []).filter((t) => !n.has(e(t)))]
			};
		}
		case "poll": return {
			...r,
			polls: {
				...r.polls,
				[t.poll.id]: t.poll
			}
		};
		case "online": return {
			...r,
			online: t.online
		};
		default: return r;
	}
}
function cc() {
	let e = ye(null);
	return {
		subscribe: e.subscribe,
		get: () => Oe(e),
		replace: e.set,
		apply(t, n) {
			return e.update((e) => sc(e, t, n)), Oe(e);
		}
	};
}
// svelte/main.ts
var lc = /* @__PURE__ */ Xe({
	createRoomStore: () => cc,
	dismissDialogs: () => ae,
	mountInbox: () => fc,
	mountView: () => dc
}), uc = {
	tasks: Ot,
	board: Ii,
	files: ta,
	reminders: Co,
	decisions: ga,
	sidebar: Xs,
	chat: oc
};
function dc(e, t, n) {
	let r = ye(n), i = uc[e], a = xe(() => S(Ze, {
		target: t,
		props: {
			component: i,
			values: r
		}
	}));
	return {
		update(e) {
			xe(() => r.set(e));
		},
		destroy() {
			xe(() => {
				te(a);
			});
		}
	};
}
function fc(e, t) {
	let { waits: n, ...r } = t, i = ye(n), a = xe(() => S(gt, {
		target: e,
		props: {
			props: r,
			waits: i
		}
	}));
	return Object.assign(() => xe(() => {
		te(a);
	}), { updateWaits(e) {
		xe(() => i.set(e));
	} });
}
export { Es as a, os as c, no as d, Vi as f, cc as i, oo as l, fc as n, Is as o, Qe as p, dc as r, Ms as s, lc as t, ro as u };
