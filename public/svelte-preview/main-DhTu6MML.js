import { $t as e, A as t, At as n, Bt as r, Ct as i, D as a, Dt as o, E as s, Et as c, F as l, Ft as u, Gt as d, I as f, It as p, Kt as m, Lt as h, M as g, Mt as _, N as v, Nt as y, Ot as b, P as x, Pt as S, Q as C, Qt as w, Rt as T, S as E, St as D, T as O, Tt as k, Ut as A, Vt as ee, Wt as j, Xt as M, Yt as N, Zt as P, _ as te, a as ne, an as F, at as re, b as ie, bt as I, c as ae, cn as L, ct as R, d as oe, dt as se, en as z, f as ce, ft as le, g as ue, gt as de, h as fe, ht as pe, i as me, in as B, it as he, j as ge, jt as _e, k as ve, kt as ye, l as be, ln as xe, lt as Se, m as V, mt as Ce, n as we, o as Te, on as Ee, ot as De, p as Oe, pt as ke, qt as Ae, r as je, rn as Me, rt as Ne, s as Pe, sn as H, st as U, t as Fe, tn as W, tt as Ie, u as Le, un as Re, ut as ze, v as Be, vt as Ve, w as He, wt as Ue, x as We, xt as Ge, y as Ke, zt as qe } from "./Textarea-DI8Lmf_T.js";
// \0rolldown/runtime.js
var Je = Object.defineProperty, Ye = (e, t) => {
	let n = {};
	for (var r in e) Je(n, r, {
		get: e[r],
		enumerable: !0
	});
	return t || Je(n, Symbol.toStringTag, { value: "Module" }), n;
};
// svelte/View.svelte
function Xe(e, t) {
	let n = () => se(t.values, "$values", r), [r, i] = ze();
	var a = u(), o = M(a);
	Ue(o, () => t.component, (e, t) => {
		t(e, Se(n));
	}), S(e, a), i();
}
// shared/uiVariant.ts
function Ze(e, t, n) {
	let r = new URL(t), i = new URL(e, r);
	return i.origin !== r.origin || !/^\/(?:app|archived|login|b\/[a-z0-9]+)\/?$/.test(i.pathname) ? String(e) : (n === "svelte" ? i.searchParams.set("ui", "svelte") : i.searchParams.delete("ui"), i.pathname + i.search + i.hash);
}
// ../vibebook/node_modules/svelte-toolbelt/dist/utils/after-sleep.js
function Qe(e, t) {
	return setTimeout(t, e);
}
// ../vibebook/node_modules/bits-ui/dist/bits/alert-dialog/components/alert-dialog.svelte
function $e(e, t) {
	Ee(t, !0);
	let n = U(t, "open", 15, !1), r = U(t, "onOpenChange", 3, f), i = U(t, "onOpenChangeComplete", 3, f);
	x.create({
		variant: Ie(() => "alert-dialog"),
		open: Ie(() => n(), (e) => {
			n(e), r()(e);
		}),
		onOpenChangeComplete: Ie(() => i())
	});
	var a = u(), o = M(a);
	k(o, () => t.children ?? xe), S(e, a), F();
}
// ../vibebook/node_modules/bits-ui/dist/bits/alert-dialog/components/alert-dialog-action.svelte
var et = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"children",
	"child",
	"id",
	"ref"
]), tt = p("<button><!></button>");
function nt(e, t) {
	let r = h();
	Ee(t, !0);
	let i = U(t, "id", 19, () => l(r)), a = U(t, "ref", 15, null), o = R(t, et), s = g.create({
		id: Ie(() => i()),
		ref: Ie(() => a(), (e) => a(e))
	}), c = B(() => C(o, s.props));
	var d = u(), f = M(d), p = (e) => {
		var n = u(), r = M(n);
		k(r, () => t.child, () => ({ props: A(c) })), S(e, n);
	}, m = (e) => {
		var n = tt();
		Ve(n, () => ({ ...A(c) }));
		var r = N(n);
		k(r, () => t.children ?? xe), L(n), S(e, n);
	};
	n(f, (e) => {
		t.child ? e(p) : e(m, -1);
	}), S(e, d), F();
}
// ../vibebook/node_modules/bits-ui/dist/bits/alert-dialog/components/alert-dialog-cancel.svelte
var rt = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"ref",
	"children",
	"child",
	"disabled"
]), it = p("<button><!></button>");
function at(e, t) {
	let r = h();
	Ee(t, !0);
	let i = U(t, "id", 19, () => l(r)), a = U(t, "ref", 15, null), o = U(t, "disabled", 3, !1), s = R(t, rt), c = ge.create({
		id: Ie(() => i()),
		ref: Ie(() => a(), (e) => a(e)),
		disabled: Ie(() => !!o())
	}), d = B(() => C(s, c.props));
	var f = u(), p = M(f), m = (e) => {
		var n = u(), r = M(n);
		k(r, () => t.child, () => ({ props: A(d) })), S(e, n);
	}, g = (e) => {
		var n = it();
		Ve(n, () => ({ ...A(d) }));
		var r = N(n);
		k(r, () => t.children ?? xe), L(n), S(e, n);
	};
	n(p, (e) => {
		t.child ? e(m) : e(g, -1);
	}), S(e, f), F();
}
// ../vibebook/node_modules/bits-ui/dist/bits/alert-dialog/components/alert-dialog-content.svelte
var ot = /* @__PURE__ */ new Set([
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
]), st = p("<!> <!>", 1), ct = p("<!> <div><!></div>", 1);
function lt(e, t) {
	let r = h();
	Ee(t, !0);
	let i = U(t, "id", 19, () => l(r)), o = U(t, "ref", 15, null), c = U(t, "forceMount", 3, !1), d = U(t, "interactOutsideBehavior", 3, "ignore"), p = U(t, "onCloseAutoFocus", 3, f), m = U(t, "onEscapeKeydown", 3, f), g = U(t, "onOpenAutoFocus", 3, f), _ = U(t, "onInteractOutside", 3, f), y = U(t, "preventScroll", 3, !0), b = U(t, "preventOverflowTextSelection", 3, !0), x = U(t, "trapFocus", 3, !0), T = U(t, "restoreScrollDelay", 3, null), D = U(t, "preventBodyPointerEvents", 3, !0), ee = R(t, ot), j = v.create({
		id: Ie(() => i()),
		ref: Ie(() => o(), (e) => o(e))
	}), P = () => D() || !j.root.overlayNode, te = B(() => C(ee, j.props));
	var ne = u(), re = M(ne), ie = (e) => {
		O(e, {
			get ref() {
				return j.opts.ref;
			},
			loop: !0,
			get trapFocus() {
				return x();
			},
			get enabled() {
				return j.root.opts.open.current;
			},
			get onCloseAutoFocus() {
				return p();
			},
			onOpenAutoFocus: (e) => {
				if (g()(e), e.defaultPrevented) return;
				e.preventDefault();
				let t = j.opts.ref.current;
				Qe(0, () => {
					t?.isConnected && t.focus();
				});
			},
			focusScope: (e, r) => {
				let i = () => (r?.()).props;
				s(e, Se(() => A(te), {
					get enabled() {
						return j.root.opts.open.current;
					},
					get ref() {
						return j.opts.ref;
					},
					onEscapeKeydown: (e) => {
						m()(e), e.defaultPrevented || j.root.handleClose();
					},
					children: (e, r) => {
						a(e, Se(() => A(te), {
							get ref() {
								return j.opts.ref;
							},
							get enabled() {
								return j.root.opts.open.current;
							},
							get interactOutsideBehavior() {
								return d();
							},
							onInteractOutside: (e) => {
								_()(e), e.defaultPrevented || j.root.handleClose();
							},
							children: (e, r) => {
								He(e, Se(() => A(te), {
									get preventOverflowTextSelection() {
										return b();
									},
									get ref() {
										return j.opts.ref;
									},
									get enabled() {
										return j.root.opts.open.current;
									},
									children: (e, r) => {
										var a = u(), o = M(a), s = (e) => {
											var r = st(), a = M(r), o = (e) => {
												E(e, {
													get preventScroll() {
														return y();
													},
													get restoreScrollDelay() {
														return T();
													},
													blockPointer: P
												});
											};
											n(a, (e) => {
												j.root.opts.open.current && e(o);
											});
											var s = w(a, 2);
											{
												let e = B(() => ({
													props: C(A(te), i()),
													...j.snippetProps
												}));
												k(s, () => t.child, () => A(e));
											}
											S(e, r);
										}, c = (e) => {
											var n = ct(), r = M(n);
											E(r, {
												get preventScroll() {
													return y();
												},
												blockPointer: P
											});
											var a = w(r, 2);
											Ve(a, (e) => ({ ...e }), [() => C(A(te), i())]);
											var o = N(a);
											k(o, () => t.children ?? xe), L(a), S(e, n);
										};
										n(o, (e) => {
											t.child ? e(s) : e(c, -1);
										}), S(e, a);
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
	n(re, (e) => {
		(j.shouldRender || c()) && e(ie);
	}), S(e, ne), F();
}
// svelte/Inbox.svelte
var ut = p("<span class=\"tw:grid tw:size-8 tw:shrink-0 tw:place-items-center tw:rounded-full tw:border tw:border-border tw:bg-muted\"><!></span>"), dt = p("<li class=\"tw:flex tw:items-start tw:gap-2 tw:py-1\"><a class=\"tw:flex tw:min-w-0 tw:flex-1 tw:gap-3 tw:rounded-control tw:p-2 tw:text-foreground tw:no-underline tw:outline-none tw:hover:bg-accent tw:focus-visible:ring-2 tw:focus-visible:ring-ring\"><!> <span class=\"tw:flex tw:min-w-0 tw:flex-1 tw:flex-col tw:gap-1 tw:text-sm tw:leading-5 tw:[overflow-wrap:anywhere]\"><span class=\"tw:line-clamp-3\"><strong class=\"tw:font-semibold\"> </strong> </span> <span class=\"tw:text-xs tw:leading-4 tw:text-muted-foreground\"> </span></span></a> <!></li>"), ft = p("<ul class=\"tw:m-0 tw:max-h-[60dvh] tw:min-h-0 tw:list-none tw:divide-y tw:divide-border tw:overflow-auto tw:overscroll-contain tw:p-0\"></ul>"), pt = p("<!> <!>", 1);
function mt(t, i) {
	Ee(i, !0);
	let a = (e) => {
		var t = u(), a = M(t), s = (e) => {
			var t = ft();
			o(t, 21, () => A(v), (e) => b(e), (e, t) => {
				var a = dt(), o = N(a), s = N(o), c = (e) => {
					var t = ut(), n = N(t);
					Ke(n, { name: "check" }), L(t), S(e, t);
				}, l = B(() => x(A(t)) === "task"), u = (e) => {
					{
						let n = B(() => C(A(t))), r = B(() => i.avatarUrl?.(A(t).author));
						Ne(e, {
							get name() {
								return A(n);
							},
							get src() {
								return A(r);
							}
						});
					}
				};
				n(s, (e) => {
					A(l) ? e(c) : e(u, -1);
				});
				var d = w(s, 2), p = N(d), h = N(p), v = P(h, !0), y = w(h);
				L(p);
				var D = w(p, 2), O = P(D);
				L(d), L(o);
				var k = w(o, 2), ee = (e) => {
					{
						let n = B(() => i.vb.t("Já resolvi (respondi em outro lugar, ou não é comigo)")), r = B(() => A(f) === b(A(t))), a = B(() => A(f) !== null);
						Oe(e, {
							icon: "check",
							get label() {
								return A(n);
							},
							class: "tw:mt-1",
							get loading() {
								return A(r);
							},
							get disabled() {
								return A(a);
							},
							onclick: () => E(A(t))
						});
					}
				}, j = B(() => A(t).ref.startsWith("m"));
				n(k, (e) => {
					A(j) && e(ee);
				}), L(a), m((e, n, r, i) => {
					I(o, "href", e), _(v, n), _(y, ` ${A(t).text ?? ""}`), _(O, `${A(g) ? `${A(t).room} › ` : ""}${r ?? ""} · ${i ?? ""}`);
				}, [
					() => T(A(t)),
					() => x(A(t)) === "task" ? i.vb.t("Tarefa sua esperando OK:") : x(A(t)) === "agent" ? i.vb.t("Seu agent espera você:") : `${C(A(t)).split(" ")[0]}:`,
					() => A(t).topic || i.vb.t("sala principal"),
					() => i.vb.ago(A(t).ts)
				]), r("click", o, (e) => i.onopen(A(t), e)), S(e, a);
			}), L(t), S(e, t);
		}, c = (e) => {
			{
				let t = B(() => A(g) ? i.vb.t("Nada esperando você. ✓") : i.vb.t("Nada esperando você nesta sala. ✓"));
				oe(e, { get title() {
					return A(t);
				} });
			}
		};
		n(a, (e) => {
			A(v).length ? e(s) : e(c, -1);
		}), S(e, t);
	}, s = U(i, "all", 3, !1), c = W(e(d(() => s() || !i.roomId ? "all" : "room"))), l = W(!0), f = W(null), p = W(""), h = B(() => i.waits.filter((e) => e.book_id === i.roomId)), g = B(() => A(c) === "all" || !i.roomId), v = B(() => A(g) ? i.waits : A(h)), y = B(() => [{
		value: "room",
		label: `${i.vb.t("Esta sala")} (${A(h).length})`
	}, {
		value: "all",
		label: `${i.vb.t("Todas")} (${i.waits.length})`
	}]), b = (e) => `${e.book_id}:${e.ref}`, x = (e) => e.ref.startsWith("t") ? "task" : /^[ab]/.test(e.ref) ? "agent" : "ask", C = (e) => e.author_name || i.displayName?.(e.author) || e.author.split("@")[0];
	function T(e) {
		return Ze(`/b/${encodeURIComponent(e.book_id)}${e.thread === "main" ? "" : `?t=${encodeURIComponent(e.thread)}`}${/^[mab]/.test(e.ref) ? `#m${e.ref.slice(1)}` : ""}`, window.location.href, "svelte");
	}
	async function E(e) {
		z(f, b(e), !0), z(p, "");
		try {
			await i.onresolve(e);
		} catch {
			z(p, i.vb.t("Não deu pra resolver agora. Tente de novo."), !0);
		} finally {
			z(f, null);
		}
	}
	{
		let e = (e) => {
			var t = pt(), r = M(t), o = (e) => {
				Le(e, {
					get title() {
						return A(p);
					},
					compact: !0
				});
			};
			n(r, (e) => {
				A(p) && e(o);
			});
			var s = w(r, 2), l = (e) => {
				{
					let t = (e) => {
						a(e);
					}, n = B(() => i.vb.t("Caixa de entrada"));
					ce(e, {
						get items() {
							return A(y);
						},
						get label() {
							return A(n);
						},
						onValueChange: (e) => i.ontab?.(e === "all"),
						get value() {
							return A(c);
						},
						set value(e) {
							z(c, e, !0);
						},
						children: t,
						$$slots: { default: !0 }
					});
				}
			}, u = (e) => {
				a(e);
			};
			n(s, (e) => {
				i.roomId ? e(l) : e(u, -1);
			}), S(e, t);
		}, r = B(() => i.vb.t("Caixa de entrada")), o = B(() => i.vb.t("Fechar"));
		fe(t, {
			get title() {
				return A(r);
			},
			get closeLabel() {
				return A(o);
			},
			onOpenChange: (e) => {
				e || i.onclose();
			},
			get open() {
				return A(l);
			},
			set open(e) {
				z(l, e, !0);
			},
			children: e,
			$$slots: { default: !0 }
		});
	}
	F();
}
qe(["click"]);
// svelte/InboxMount.svelte
function ht(e, t) {
	let n = () => se(t.waits, "$waits", r), [r, i] = ze();
	mt(e, Se(() => t.props, { get waits() {
		return n();
	} })), i();
}
// svelte/lib/ui/Progress.svelte
var gt = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"value",
	"max",
	"label",
	"class"
]), _t = p("<progress> </progress>");
function vt(e, t) {
	Ee(t, !0);
	let n = U(t, "max", 3, 100), r = R(t, gt), i = B(() => Number.isFinite(n()) && n() > 0 ? n() : 100), a = B(() => Number.isFinite(t.value) ? Math.min(A(i), Math.max(0, t.value)) : 0);
	var o = _t();
	Ve(o, (e) => ({
		...r,
		max: A(i),
		value: A(a),
		"aria-label": t.label,
		class: e
	}), [() => he("tw:h-1.5 tw:w-full tw:overflow-hidden tw:rounded-full tw:border-0 tw:bg-muted tw:appearance-none tw:[&::-webkit-progress-bar]:rounded-full tw:[&::-webkit-progress-bar]:bg-muted tw:[&::-webkit-progress-value]:rounded-full tw:[&::-webkit-progress-value]:bg-primary tw:[&::-moz-progress-bar]:rounded-full tw:[&::-moz-progress-bar]:bg-primary", t.class)]);
	var s = P(o);
	m(() => _(s, `${A(a) ?? ""}/${A(i) ?? ""}`)), S(e, o), F();
}
// svelte/TaskList.svelte
var yt = p("<!> ", 1), bt = p("<div class=\"tw:min-w-0 tw:flex-1 tw:basis-32 tw:space-y-1\"><!> <!></div>"), xt = p("<div role=\"group\"><!> <!> <!> <!> <!></div>"), St = p("<section data-vb-native=\"\" class=\"tw:m-0 tw:box-border tw:space-y-3 tw:rounded-surface tw:bg-background tw:p-3 tw:font-sans tw:text-sm tw:text-foreground\"><header class=\"tw:flex tw:items-center tw:gap-3\"><h3 class=\"tw:m-0 tw:font-sans tw:text-sm tw:font-semibold\"> </h3> <!> <!></header> <!> <!> <div class=\"tw:space-y-2\"></div> <form id=\"newTask\" class=\"tw:flex tw:items-center tw:gap-2\"><!> <!></form></section>"), Ct = p("<form class=\"tw:grid tw:grid-cols-1 tw:gap-4\"><!> <!> <div class=\"tw:flex tw:flex-wrap tw:justify-end tw:gap-2\"><!><!></div></form>"), wt = p("<!> <!>", 1);
function Tt(e, t) {
	let r = h();
	Ee(t, !0);
	let i = U(t, "waits", 19, () => []), a = B(() => t.room.epics.find((e) => e.id === t.thread) ?? (t.thread === "main" && t.room.roomTasks?.length ? {
		id: "main",
		tasks: t.room.roomTasks,
		flags: []
	} : null)), s = (e) => i().some((n) => n.book_id === t.room.id && n.ref === `t${e.id}`), c = B(() => (A(a)?.tasks ?? []).map((e, t) => ({
		task: e,
		index: t
	})).sort((e, t) => (e.task.done ? 2 : +!s(e.task)) - (t.task.done ? 2 : +!s(t.task)) || e.index - t.index).map((e) => e.task)), l = B(() => A(a)?.tasks.filter((e) => e.done).length ?? 0), u = B(() => [{
		value: "",
		label: t.vb.t("sem dono")
	}, ...(t.room.members ?? []).map((e) => ({
		value: e,
		label: e === t.room.me ? t.vb.t("você") : t.vb.name(e)
	}))]), d = W(null), f = W(""), p = W(null), g = W(""), v = W(""), y = W(null), b = W(!1), x = W(""), C = W(null), E = B(() => A(a)?.tasks.find((e) => e.id === A(y)));
	Ae(() => {
		A(d) && A(p) && (A(p).focus(), A(p).select());
	}), Ae(() => {
		A(y) && !A(E) && te(), A(d) && !A(a)?.tasks.some((e) => e.id === A(d)) && z(d, null);
	});
	function O(e) {
		try {
			if (t.send(e)) return z(v, ""), !0;
		} catch {}
		return z(v, t.vb.t("Não deu pra enviar agora. Tente de novo."), !0), !1;
	}
	function k(e, t = !0) {
		A(d) !== e.id || t && A(f).trim() && A(f) !== e.title && !O({
			t: "task.rename",
			id: e.id,
			title: A(f)
		}) || z(d, null);
	}
	function j(e) {
		z(y, e.id, !0), z(x, e.due ?? "", !0), z(b, !0);
	}
	function te() {
		z(b, !1), z(y, null), z(x, "");
	}
	var ne = wt(), re = M(ne), ie = (e) => {
		var r = St(), i = N(r), h = N(i), y = P(h, !0), x = w(h, 2);
		Te(x, {
			children: (e, t) => {
				H();
				var n = T();
				m(() => _(n, `${A(l) ?? ""}/${A(a).tasks.length ?? ""}`)), S(e, n);
			},
			$$slots: { default: !0 }
		});
		var C = w(x, 2);
		{
			let e = B(() => t.vb.t("Tarefas")), n = B(() => Math.max(1, A(a).tasks.length)), r = B(() => `${A(l)}/${A(a).tasks.length}`);
			vt(C, {
				get label() {
					return A(e);
				},
				get value() {
					return A(l);
				},
				get max() {
					return A(n);
				},
				get "aria-valuetext"() {
					return A(r);
				},
				class: "tw:ml-auto tw:max-w-24"
			});
		}
		L(i);
		var E = w(i, 2), te = (e) => {
			{
				let t = B(() => `@vibe: ${A(a).flags.join(" · ")}`);
				Te(e, {
					variant: "warning",
					get title() {
						return A(t);
					},
					children: (e, t) => {
						var n = yt(), r = M(n);
						Ke(r, {
							name: "warning",
							class: "tw:size-3"
						});
						var i = w(r, 1, !0);
						m((e) => _(i, e), [() => A(a).flags.join(" · ")]), S(e, n);
					},
					$$slots: { default: !0 }
				});
			}
		};
		n(E, (e) => {
			A(a).flags?.length && e(te);
		});
		var ne = w(E, 2), F = (e) => {
			Le(e, {
				get title() {
					return A(v);
				},
				compact: !0
			});
		};
		n(ne, (e) => {
			A(v) && !A(b) && e(F);
		});
		var re = w(ne, 2);
		o(re, 21, () => A(c), (e) => e.id, (e, r) => {
			var i = xt(), a = N(i);
			{
				let e = B(() => t.vb.t("Feita"));
				Pe(a, {
					get checked() {
						return A(r).done;
					},
					get "aria-label"() {
						return A(e);
					},
					onclick: (e) => {
						e.preventDefault(), O({
							t: "task.toggle",
							id: A(r).id
						});
					}
				});
			}
			var o = w(a, 2), c = (e) => {
				{
					let n = B(() => t.vb.t("Clique para editar"));
					be(e, {
						get "data-task-edit"() {
							return A(r).id;
						},
						get "aria-label"() {
							return A(n);
						},
						class: "tw:min-w-32 tw:flex-1",
						onblur: () => k(A(r)),
						onkeydown: (e) => {
							e.key === "Enter" && (e.preventDefault(), k(A(r))), e.key === "Escape" && (e.preventDefault(), k(A(r), !1));
						},
						get ref() {
							return A(p);
						},
						set ref(e) {
							z(p, e, !0);
						},
						get value() {
							return A(f);
						},
						set value(e) {
							z(f, e, !0);
						}
					});
				}
			}, l = (e) => {
				var i = bt(), a = N(i);
				{
					let e = B(() => he("tw:h-auto tw:w-full tw:justify-start tw:whitespace-normal tw:rounded-sm tw:p-0 tw:text-left tw:hover:bg-transparent tw:hover:underline", A(r).done && "tw:text-muted-foreground tw:line-through")), n = B(() => t.vb.t("Clique para editar"));
					V(a, {
						get "data-task-title"() {
							return A(r).id;
						},
						variant: "ghost",
						get class() {
							return A(e);
						},
						get title() {
							return A(n);
						},
						onclick: () => {
							z(d, A(r).id, !0), z(f, A(r).title, !0);
						},
						children: (e, t) => {
							H();
							var n = T();
							m(() => _(n, A(r).title)), S(e, n);
						},
						$$slots: { default: !0 }
					});
				}
				var o = w(a, 2), s = (e) => {
					{
						let t = B(() => `@vibe: ${A(r).flags.join(" · ")}`);
						Te(e, {
							variant: "warning",
							get title() {
								return A(t);
							},
							children: (e, t) => {
								var n = yt(), i = M(n);
								Ke(i, {
									name: "warning",
									class: "tw:size-3"
								});
								var a = w(i, 1, !0);
								m((e) => _(a, e), [() => A(r).flags.join(" · ")]), S(e, n);
							},
							$$slots: { default: !0 }
						});
					}
				};
				n(o, (e) => {
					A(r).flags?.length && e(s);
				}), L(i), S(e, i);
			};
			n(o, (e) => {
				A(d) === A(r).id ? e(c) : e(l, -1);
			});
			var h = w(o, 2);
			{
				let e = B(() => t.vb.t("Responsável")), n = B(() => A(r).owner ?? "");
				ae(h, {
					get "data-owner"() {
						return A(r).id;
					},
					get "aria-label"() {
						return A(e);
					},
					get value() {
						return A(n);
					},
					get items() {
						return A(u);
					},
					class: "tw:w-auto tw:max-w-40",
					onValueChange: (e) => O({
						t: "task.assign",
						id: A(r).id,
						owner: e
					})
				});
			}
			var g = w(h, 2);
			{
				let e = B(() => t.vb.t("Prazo")), n = B(() => A(r).due ? `${t.vb.t("Prazo")}: ${A(r).due}` : t.vb.t("Prazo"));
				V(g, {
					get "data-due"() {
						return A(r).id;
					},
					variant: "ghost",
					size: "sm",
					get title() {
						return A(e);
					},
					get "aria-label"() {
						return A(n);
					},
					onclick: () => j(A(r)),
					children: (e, t) => {
						var n = yt(), i = M(n);
						Ke(i, {
							name: "calendar",
							class: "tw:size-3.5"
						});
						var a = w(i, 1, !0);
						m(() => _(a, A(r).due ?? "")), S(e, n);
					},
					$$slots: { default: !0 }
				});
			}
			var v = w(g, 2);
			{
				let e = B(() => t.vb.t("Apagar task"));
				Oe(v, {
					get "data-tdel"() {
						return A(r).id;
					},
					get label() {
						return A(e);
					},
					icon: "close",
					class: "tw:size-8",
					onclick: () => O({
						t: "task.del",
						id: A(r).id
					})
				});
			}
			L(i), m((e) => {
				I(i, "data-task", A(r).id), I(i, "aria-label", A(r).title), Ge(i, 1, e);
			}, [() => D(he("tw:flex tw:flex-wrap tw:items-center tw:gap-2 tw:rounded-control tw:border tw:p-2", A(r).done ? "tw:border-transparent tw:bg-muted/40 tw:text-muted-foreground" : "tw:border-border tw:bg-card tw:text-card-foreground", !A(r).done && A(r).owner === t.room.me && "tw:border-ring/50", s(A(r)) && "tw:bg-warning/10"))]), S(e, i);
		}), L(re);
		var ie = w(re, 2), R = N(ie);
		{
			let e = B(() => t.vb.t("nova task")), n = B(() => t.vb.t("nova task"));
			be(R, {
				get "aria-label"() {
					return A(e);
				},
				get placeholder() {
					return A(n);
				},
				get value() {
					return A(g);
				},
				set value(e) {
					z(g, e, !0);
				}
			});
		}
		var oe = w(R, 2);
		{
			let e = B(() => t.vb.t("Nova tarefa"));
			Oe(oe, {
				type: "submit",
				get label() {
					return A(e);
				},
				icon: "plus",
				variant: "outline"
			});
		}
		L(ie), L(r), m((e, t) => {
			I(r, "aria-label", e), _(y, t);
		}, [() => t.vb.t("Tarefas"), () => t.vb.t("Tarefas")]), ee("submit", ie, (e) => {
			e.preventDefault(), A(g).trim() && O({
				t: "task.add",
				epic: t.thread,
				title: A(g)
			}) && z(g, "");
		}), S(e, r);
	};
	n(re, (e) => {
		A(a) && e(ie);
	});
	var R = w(re, 2), oe = (e) => {
		{
			let i = B(() => t.vb.t("Prazo")), a = B(() => t.vb.t("Prazo (ex.: sex, qua 23h, 06/11). Vazio tira o prazo:")), o = B(() => t.vb.t("Fechar"));
			fe(e, {
				get title() {
					return A(i);
				},
				get description() {
					return A(a);
				},
				get closeLabel() {
					return A(o);
				},
				initialFocus: () => A(C),
				onOpenChange: (e) => {
					e || te();
				},
				get open() {
					return A(b);
				},
				set open(e) {
					z(b, e, !0);
				},
				children: (e, i) => {
					var a = Ct(), o = N(a);
					{
						let e = (e, t = xe) => {
							be(e, Se(t, {
								get ref() {
									return A(C);
								},
								set ref(e) {
									z(C, e, !0);
								},
								get value() {
									return A(x);
								},
								set value(e) {
									z(x, e, !0);
								}
							}));
						}, n = B(() => `${r}-due`), i = B(() => t.vb.t("Prazo"));
						me(o, {
							get id() {
								return A(n);
							},
							get label() {
								return A(i);
							},
							children: e,
							$$slots: { default: !0 }
						});
					}
					var s = w(o, 2), c = (e) => {
						Le(e, {
							get title() {
								return A(v);
							},
							compact: !0
						});
					};
					n(s, (e) => {
						A(v) && e(c);
					});
					var l = w(s, 2), u = N(l);
					V(u, {
						variant: "outline",
						onclick: te,
						children: (e, n) => {
							H();
							var r = T();
							m((e) => _(r, e), [() => t.vb.t("Cancelar")]), S(e, r);
						},
						$$slots: { default: !0 }
					});
					var d = w(u);
					V(d, {
						type: "submit",
						children: (e, n) => {
							H();
							var r = T();
							m((e) => _(r, e), [() => t.vb.t("Salvar")]), S(e, r);
						},
						$$slots: { default: !0 }
					}), L(l), L(a), ee("submit", a, (e) => {
						e.preventDefault(), A(E) && O({
							t: "task.assign",
							id: A(E).id,
							due: A(x)
						}) && te();
					}), S(e, a);
				},
				$$slots: { default: !0 }
			});
		}
	};
	n(R, (e) => {
		A(E) && e(oe);
	}), S(e, ne), F();
}
// svelte/Tasks.svelte
var Et = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy"
]);
function Dt(e, t) {
	Ee(t, !0);
	let n = R(t, Et);
	var r = u(), i = M(r);
	ye(i, () => JSON.stringify([t.room.id, t.thread]), (e) => {
		Tt(e, Se(() => n));
	}), S(e, r), F();
}
// ../vibebook/node_modules/zod/v4/core/util.js
function Ot(e) {
	let t = Object.values(e).filter((e) => typeof e == "number");
	return Object.entries(e).filter(([e, n]) => t.indexOf(+e) === -1).map(([e, t]) => t);
}
function kt(e, t) {
	return typeof t == "bigint" ? t.toString() : t;
}
var At = class {
	constructor(e) {
		this._getter = e, this._value = void 0;
	}
	get value() {
		let e = this._getter;
		return e !== void 0 && (this._value = e(), this._getter = void 0), this._value;
	}
};
function jt(e) {
	return new At(e);
}
function Mt(e) {
	return e == null;
}
function Nt(e) {
	let t = +!!e.startsWith("^"), n = e.endsWith("$") ? e.length - 1 : e.length;
	return e.slice(t, n);
}
function Pt(e, t, n) {
	Object.defineProperty(e, t, {
		value: n,
		writable: !0,
		enumerable: !0,
		configurable: !0
	});
}
function Ft(e) {
	let t = Object.getOwnPropertyDescriptor(e, "shape");
	return t?.get ? t.get.raw : t?.value;
}
function It(e) {
	return Ft(e._zod.def) ?? e._zod.def.shape;
}
function Lt(e, t, n) {
	Object.defineProperty(e, t, {
		get() {
			let e = n();
			return Pt(this, t, e), e;
		},
		enumerable: !0,
		configurable: !0
	});
}
function Rt(e, t, n) {
	t in e ? Pt(e, t, n) : e[t] = n;
}
function zt(e, t, n, r) {
	let i = It(t);
	for (let a of n) {
		let n = Object.getOwnPropertyDescriptor(i, a);
		n.enumerable && (n.get ? Lt(e, a, () => {
			let e = t._zod.def.shape[a];
			return r ? r(e, a) : e;
		}) : Rt(e, a, r ? r(n.value, a) : n.value));
	}
}
function Bt(e, t) {
	for (let n of Reflect.ownKeys(t)) {
		let r = Object.getOwnPropertyDescriptor(t, n);
		r.enumerable && (r.get ? Lt(e, n, () => t[n]) : Rt(e, n, r.value));
	}
}
function Vt(...e) {
	let t = {};
	for (let n of e) {
		let e = Object.getOwnPropertyDescriptors(n);
		Object.assign(t, e);
	}
	return Object.defineProperties({}, t);
}
var Ht = "captureStackTrace" in Error ? Error.captureStackTrace : (...e) => {};
function Ut(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function Wt(e) {
	if (Ut(e) === !1) return !1;
	let t = e.constructor;
	if (t === void 0 || typeof t != "function") return !0;
	let n = t.prototype;
	return Ut(n) !== !1 && Object.prototype.hasOwnProperty.call(n, "isPrototypeOf") !== !1;
}
var Gt = /* @__PURE__*/ new Set([
	"string",
	"number",
	"symbol"
]);
function Kt(e) {
	return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function qt(e, t, n) {
	let r = new e._zod.constr(t ?? e._zod.def);
	return (!t || n?.parent) && (r._zod.parent = e), r;
}
function Jt(e) {
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
function Yt(e) {
	return Object.keys(e).filter((t) => e[t]._zod.optin !== void 0 && e[t]._zod.optout === "optional");
}
function Xt(e, t) {
	if (!Wt(t)) throw Error("Invalid input to extend: expected a plain object");
	let n = e._zod.def.checks;
	if (n && n.length > 0) {
		let n = It(e);
		for (let e of Reflect.ownKeys(t)) if (Object.getOwnPropertyDescriptor(n, e) !== void 0) throw Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
	}
	return qt(e, Vt(e._zod.def, { shape: Zt(e, t) }));
}
function Zt(e, t) {
	let n = {};
	return zt(n, e, Reflect.ownKeys(It(e))), Bt(n, t), n;
}
function Qt(e, t = 0) {
	if (e.aborted === !0) return !0;
	for (let n = t; n < e.issues.length; n++) if (e.issues[n]?.continue !== !0) return !0;
	return !1;
}
function $t(e, t = 0) {
	if (e.aborted === !0) return !0;
	for (let n = t; n < e.issues.length; n++) if (e.issues[n]?.continue === !1) return !0;
	return !1;
}
function en(e, t) {
	return t.map((t) => {
		var n;
		return (n = t).path ?? (n.path = []), t.path.unshift(e), t;
	});
}
function tn(e) {
	return typeof e == "string" ? e : e?.message;
}
function nn(e) {
	let t = [];
	for (let n of e ?? []) {
		let e = n._zod.def;
		if (!/_(length|size)$|_equals$/.test(e.check)) break;
		let r = e.maximum ?? e.length ?? e.size;
		r >= 0 && t.push([r, n]);
	}
	return t;
}
function rn(e, t, n) {
	var r;
	for (let i = t; i < e.length; i++) (r = e[i]).schema ?? (r.schema = n);
}
function an(e, t, n) {
	var r;
	let i = e.inst?._zod?.traits;
	i?.has("$ZodType") && (i.has("$ZodCheck") ? (r = e).schema ?? (r.schema = e.inst) : e.schema = e.inst);
	let a = e.schema === e.inst ? void 0 : e.schema?._zod.def?.error, o = e.message ? e.message : tn(e.inst?._zod.def?.error?.(e)) ?? tn(a?.(e)) ?? tn(t?.error?.(e)) ?? tn(n.customError?.(e)) ?? tn(n.localeError?.(e)) ?? "Invalid input", s = {};
	for (let t of Object.keys(e)) t !== "inst" && t !== "schema" && t !== "continue" && t !== "input" && t !== "__proto__" && (s[t] = e[t]);
	return s.path ??= [], s.message = o, t?.reportInput && (s.input = e.input), s;
}
var on = /[\uD800-\uDBFF]/;
function sn(e) {
	let t = e.length;
	if (!on.test(e)) return t;
	let n = t;
	for (let r = 0; r < t - 1; r++) (e.charCodeAt(r) & 64512) == 55296 && (e.charCodeAt(r + 1) & 64512) == 56320 && (n--, r++);
	return n;
}
function cn(e) {
	return Array.isArray(e) ? "array" : typeof e == "string" ? "string" : "unknown";
}
function ln(e, t) {
	for (let n in t) {
		let r = Object.getOwnPropertyDescriptor(t, n);
		r.get ? Object.defineProperty(e, n, {
			...r,
			enumerable: !1
		}) : fn(e, n, r.value);
	}
}
function un(e, t, n, r = !0) {
	return Object.defineProperty(e, t, {
		configurable: !0,
		writable: !0,
		enumerable: r,
		value: n
	}), n;
}
function dn(e, t, n) {
	return un(e, t, n, !1);
}
function fn(e, t, n) {
	Object.defineProperty(e, t, {
		configurable: !0,
		get() {
			return this == null ? n : un(this, t, n.bind(this));
		},
		set(e) {
			un(this, t, e);
		}
	});
}
function pn(e, t) {
	let n = Object.getPrototypeOf(e);
	return t in n ? void 0 : n;
}
var mn, hn = !1, gn = {
	configurable: !0,
	get() {
		hn = !0;
	}
};
function _n(e, t, n) {
	let r = Object.getPrototypeOf(e._zod);
	t in r && mn !== e._zod ? mn = void 0 : (mn = e._zod, Object.defineProperty(r, t, {
		configurable: !0,
		get() {
			Object.defineProperty(this, t, gn);
			let e = hn;
			hn = !1;
			try {
				let r = n(this);
				return hn ? delete this[t] : Object.defineProperty(this, t, {
					configurable: !0,
					writable: !0,
					value: r
				}), hn ||= e, r;
			} catch (n) {
				throw delete this[t], hn ||= e, n;
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
function vn(e, t, n, r) {
	let i = pn(e, t);
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
var yn, bn = {
	value: void 0,
	enumerable: !1
}, xn = "captureStackTrace" in Error ? Error : null;
function Sn(e) {
	let t = xn;
	if (t) {
		let n = t.stackTraceLimit;
		if (typeof n == "number") {
			try {
				t.stackTraceLimit = 0;
			} catch {
				return xn = null, new e();
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
			bn.value = new a(r);
			try {
				Object.defineProperty(n, "_zod", bn);
			} finally {
				bn.value = void 0;
			}
		} else if (n._zod.traits.has(e)) return;
		if (n._zod.traits.add(e), t(n, r), s) {
			let e = Object.getPrototypeOf(n), t = n._zod.constr.prototype, r = e;
			for (; r && r !== t;) r = Object.getPrototypeOf(r);
			let i = r ?? e;
			s.has(i) || (s.add(i), ln(i, o));
		}
		let i = d.prototype;
		for (let e in i) Object.prototype.hasOwnProperty.call(i, e) && (e in n || (n[e] = i[e].bind(n)));
	}
	let l = r?.Parent ?? Object;
	class u extends l {}
	Object.defineProperty(u, "name", { value: e });
	function d(e) {
		let t = r?.Parent ? Sn(u) : this;
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
var Cn = class extends Error {
	constructor() {
		super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
	}
};
(yn = globalThis).__zod_globalConfig ?? (yn.__zod_globalConfig = {});
var wn = globalThis.__zod_globalConfig;
function Tn(e) {
	return e && Object.assign(wn, e), wn;
}
// ../vibebook/node_modules/zod/v4/core/errors.js
function En() {
	let e = this._zod;
	return e.message ??= JSON.stringify(e.def, kt, 2), e.message;
}
function Dn(e) {
	this._zod.message = e;
}
var On = {
	get: En,
	set: Dn,
	enumerable: !0,
	configurable: !0
}, kn = {
	value: void 0,
	enumerable: !1
}, An = /* @__PURE__ */ new WeakSet([Object.prototype, Error.prototype]), jn = /* @__PURE__ */ G("$ZodError", (e, t) => {
	e.name = "$ZodError", kn.value = t, Object.defineProperty(e, "issues", kn), kn.value = void 0, Object.defineProperty(e, "message", On);
	let n = Object.getPrototypeOf(e);
	An.has(n) || (An.add(n), Object.defineProperty(n, "toString", {
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
}, void 0, { Parent: Error }), Mn = /* @__PURE__*/ ((e) => {
	let t = (n, r, i, a) => {
		let o = i ? {
			...i,
			async: !1
		} : { async: !1 }, s = n._zod.run({
			value: r,
			issues: []
		}, o);
		if (s instanceof Promise) throw new Cn();
		if (s.issues.length) {
			let n = new ((a?.Err) ?? e)(s.issues.map((e) => an(e, o, Tn())));
			throw Ht(n, a?.callee ?? t), n;
		}
		return s.value;
	};
	return t;
})(jn), Nn = /* @__PURE__*/ ((e) => {
	let t = async (n, r, i, a) => {
		let o = i ? {
			...i,
			async: !0
		} : { async: !0 }, s = n._zod.run({
			value: r,
			issues: []
		}, o);
		if (s instanceof Promise && (s = await s), s.issues.length) {
			let n = new ((a?.Err) ?? e)(s.issues.map((e) => an(e, o, Tn())));
			throw Ht(n, a?.callee ?? t), n;
		}
		return s.value;
	};
	return t;
})(jn), Pn = /* @__PURE__*/ ((e) => (t, n, r) => {
	let i = r ? {
		...r,
		async: !1
	} : { async: !1 }, a = t._zod.run({
		value: n,
		issues: []
	}, i);
	if (a instanceof Promise) throw new Cn();
	return a.issues.length ? Fn(e, a.issues, i) : {
		success: !0,
		data: a.value
	};
})(jn);
function Fn(e, t, n) {
	let r;
	return {
		success: !1,
		get error() {
			return r || (r = new e(t.map((e) => an(e, n, Tn()))), t = void 0, n = void 0), r;
		},
		set error(e) {
			r = e, t = void 0, n = void 0;
		}
	};
}
var In = /* @__PURE__*/ ((e) => async (t, n, r) => {
	let i = r ? {
		...r,
		async: !0
	} : { async: !0 }, a = t._zod.run({
		value: n,
		issues: []
	}, i);
	return a instanceof Promise && (a = await a), a.issues.length ? Fn(e, a.issues, i) : {
		success: !0,
		data: a.value
	};
})(jn), Ln = /^[\s\S]{0,}$/, Rn = /^-?\d+(?:\.\d+)?$/, zn = /^(?:true|false)$/i, Bn = /*@__PURE__*/ G("$ZodCheck", (e, t) => {
	var n;
	e._zod ??= {}, e._zod.def = t, (n = e._zod).onattach ?? (n.onattach = []);
}), Vn = (e) => {
	let t = e.value;
	return !Mt(t) && t.length !== void 0;
}, Hn = /*@__PURE__*/ G("$ZodCheckMaxLength", (e, t) => {
	var n;
	Bn.init(e, t), (n = e._zod.def).when ?? (n.when = Vn), e._zod.check = (n) => {
		let r = n.value, i = r.length;
		if ((typeof r == "string" && i > t.maximum ? sn(r) : i) <= t.maximum) return;
		let a = cn(r);
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
}), Un = /*@__PURE__*/ G("$ZodCheckMinLength", (e, t) => {
	var n;
	Bn.init(e, t), (n = e._zod.def).when ?? (n.when = Vn), e._zod.check = (n) => {
		let r = n.value, i = r.length;
		if ((typeof r == "string" && i >= t.minimum && i < t.minimum * 2 ? sn(r) : i) >= t.minimum) return;
		let a = cn(r);
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
}), Wn = /*@__PURE__*/ G("$ZodCheckStartsWith", (e, t) => {
	Bn.init(e, t);
	let n = RegExp(`^${Kt(t.prefix)}.*`);
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
}), Gn = {
	major: 4,
	minor: 6,
	patch: 7
}, Kn = /*@__PURE__*/ G("$ZodType", (e, t) => {
	var n;
	e ??= {}, e._zod.def = t, e._zod.bag = e._zod.bag || {}, e._zod.version = Gn;
	let r = e._zod.def.checks, i = e._zod.traits.has("$ZodCheck") ? [e, ...r ?? []] : r?.length ? [...r] : [];
	for (let t of i) for (let n of t._zod.onattach) n(e);
	if (i.length === 0) (n = e._zod).deferred ?? (n.deferred = []), e._zod.deferred?.push(() => {
		e._zod.run = e._zod.parse;
	});
	else {
		let t = (t, n, r) => {
			if (t.memo) return t;
			let i = Qt(t), a;
			for (let o of n) {
				if (o._zod.def.when) {
					if ($t(t) || !o._zod.def.when(t)) continue;
				} else if (i) continue;
				let n = t.issues.length, s = o._zod.check(t);
				if (s instanceof Promise && r?.async === !1) throw new Cn();
				if (a || s instanceof Promise) a = (a ?? Promise.resolve()).then(async () => {
					await s, t.issues.length !== n && (rn(t.issues, n, e), i ||= Qt(t, n));
				});
				else {
					if (t.issues.length === n) continue;
					rn(t.issues, n, e), i ||= Qt(t, n);
				}
			}
			return a ? a.then(() => t) : t;
		}, n = (n, r, a) => {
			if (Qt(n)) return n.aborted = !0, n;
			let o = t(r, i, a);
			if (o instanceof Promise) {
				if (a.async === !1) throw new Cn();
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
				if (a.async === !1) throw new Cn();
				return o.then((e) => t(e, i, a));
			}
			return t(o, i, a);
		};
	}
}, {
	get "~standard"() {
		return dn(this, "~standard", Yn(this));
	},
	set "~standard"(e) {
		un(this, "~standard", e);
	}
}), qn = (e, t) => e.issues.length ? { issues: e.issues.map((e) => an(e, t, Tn())) } : { value: e.value };
async function Jn(e, t) {
	let n = { async: !0 };
	return qn(await e._zod.run({
		value: t,
		issues: []
	}, n), n);
}
function Yn(e) {
	return {
		validate: (t) => {
			let n = { async: !1 };
			try {
				let r = e._zod.run({
					value: t,
					issues: []
				}, n);
				if (!(r instanceof Promise)) return qn(r, n);
			} catch {}
			return Jn(e, t);
		},
		vendor: "zod",
		version: 1
	};
}
var Xn = /*@__PURE__*/ G("$ZodString", (e, t) => {
	Kn.init(e, t), e._zod.pattern = t.pattern ?? Ln, e._zod.parse = (n, r) => {
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
}), Zn = /*@__PURE__*/ G("$ZodNumber", (e, t) => {
	Kn.init(e, t), e._zod.pattern = Rn, e._zod.parse = (n, r) => {
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
}), Qn = /*@__PURE__*/ G("$ZodBoolean", (e, t) => {
	Kn.init(e, t), e._zod.pattern = zn, e._zod.parse = (n, r) => {
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
}), $n = /*@__PURE__*/ G("$ZodNever", (e, t) => {
	Kn.init(e, t), e._zod.parse = (t, n) => (t.issues.push({
		expected: "never",
		code: "invalid_type",
		input: t.value,
		inst: e
	}), t);
});
function er(e, t) {
	let n = nn(e._zod.def.checks);
	if (!n.length) return;
	let r = Math.min(...n.map((e) => e[0])), i = e._zod.parse;
	e._zod.parse = (n, a) => {
		let o = t(n.value);
		if (o > r && !a?.skipChecks && a?.direction !== "backward") {
			for (let [t, r] of nn(e._zod.def.checks)) if (o > t && r._zod.def.when(n)) {
				let t = n.issues.length;
				return r._zod.check(n), n.issues[t].continue = !1, rn(n.issues, t, e), n;
			}
		}
		return i(n, a);
	};
}
var tr = (e) => Array.isArray(e) ? e.length : -1;
function nr(e, t, n) {
	e.issues.length && t.issues.push(...en(n, e.issues)), t.value[n] = e.value;
}
var rr = /*@__PURE__*/ G("$ZodArray", (e, t) => {
	Kn.init(e, t);
	let n = wn.memoizer;
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
			if (c instanceof Promise) o.push(c.then((t) => nr(t, r, e)));
			else if (nr(c, r, e), s && c.issues.length !== 0 && Qt(c)) break;
		}
		return o.length ? Promise.all(o).then(() => r) : r;
	}, er(e, tr);
});
function ir(e, t, n, r, i, a) {
	let o = n in r, s = a === "optional";
	if (o || !s || i !== "optional") {
		if (e.issues.length) {
			if (i !== void 0 && s && !o) return;
			t.issues.push(...en(n, e.issues));
		}
		!o && i === void 0 ? e.issues.length || t.issues.push({
			code: "invalid_type",
			expected: "nonoptional",
			input: void 0,
			path: [n]
		}) : e.value === void 0 ? (o || i === "defaulted" && !s) && (t.value[n] = void 0) : t.value[n] = e.value;
	}
}
var ar = [];
function or(e) {
	let t = Object.keys(e.shape), n = Object.getOwnPropertySymbols(e.shape), r = n.length ? n : ar, i = r.length ? [...t, ...r] : t;
	for (let t of i) if (!e.shape?.[t]?._zod?.traits?.has("$ZodType")) throw Error(`Invalid element at key "${String(t)}": expected a Zod schema`);
	let a = Yt(e.shape);
	return {
		...e,
		allKeys: i,
		symbolKeys: r,
		keySet: new Set(t),
		numKeys: t.length,
		optionalKeys: new Set(a)
	};
}
function sr(e, t, n, r, i, a, o) {
	let s = [], c = i.keySet, l = i.catchall._zod, u = l.def.type, d = l.optin, f = l.optout, p = 0;
	for (let i in t) {
		if (o && n.issues.length !== p) {
			if (Qt(n, p)) break;
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
		a instanceof Promise ? e.push(a.then((e) => ir(e, n, i, t, d, f))) : ir(a, n, i, t, d, f);
	}
	return s.length && n.issues.push({
		code: "unrecognized_keys",
		keys: s,
		input: t,
		inst: a,
		continue: !0
	}), e.length ? Promise.all(e).then(() => n) : n;
}
var cr = /*@__PURE__*/ G("$ZodObject", (e, t) => {
	Kn.init(e, t);
	let n = Object.getOwnPropertyDescriptor(t, "shape"), r = n?.get ? n.get.raw : t.shape ?? {};
	if (r) {
		let e = () => {
			let n = { ...r };
			return Object.defineProperty(t, "shape", { value: n }), e.raw = n, n;
		};
		e.raw = r, Object.defineProperty(t, "shape", { get: e });
	}
	let i = jt(() => or(t));
	_n(e, "propValues", (e) => {
		let t = e.def.shape, n = {};
		for (let e in t) {
			let r = t[e]._zod;
			if (r.values) {
				Object.prototype.hasOwnProperty.call(n, e) || Pt(n, e, /* @__PURE__ */ new Set());
				for (let t of r.values) n[e].add(t);
				r.optin !== void 0 && n[e].add(void 0);
			}
		}
		return n;
	});
	let a = Ut, o = t.catchall, s, c = wn.memoizer;
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
				if (Qt(t, f)) break;
				f = t.issues.length;
			}
			if (e === "__proto__") continue;
			let i = u[e], a = i._zod.optin, o = i._zod.optout, s = i._zod.run({
				value: r[e],
				issues: []
			}, n);
			s instanceof Promise ? l.push(s.then((n) => ir(n, t, e, r, a, o))) : ir(s, t, e, r, a, o);
		}
		return o ? sr(l, r, t, n, i.value, e, d === !0) : l.length ? Promise.all(l).then(() => t) : t;
	};
});
function lr(e, t, n, r) {
	for (let n of e) if (n.issues.length === 0) return t.value = n.value, t;
	let i = e.filter((e) => !Qt(e));
	return i.length === 1 ? (t.value = i[0].value, i[0]) : (t.issues.push({
		code: "invalid_union",
		input: t.value,
		inst: n,
		errors: e.map((e) => e.issues.map((e) => an(e, r, Tn())))
	}), t);
}
var ur = /*@__PURE__*/ G("$ZodUnion", (e, t) => {
	Kn.init(e, t), _n(e, "optin", (e) => e.def.options.some((e) => e._zod.optin === "defaulted") ? "defaulted" : e.def.options.some((e) => e._zod.optin !== void 0) ? "optional" : void 0), _n(e, "optout", (e) => e.def.options.some((e) => e._zod.optout === "optional") ? "optional" : void 0), _n(e, "values", (e) => {
		if (e.def.options.every((e) => e._zod.values)) return new Set(e.def.options.flatMap((e) => Array.from(e._zod.values)));
	}), _n(e, "pattern", (e) => {
		if (e.def.options.every((e) => e._zod.pattern)) {
			let t = e.def.options.map((e) => e._zod.pattern);
			return RegExp(`^(${t.map((e) => Nt(e.source)).join("|")})$`);
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
		return a ? Promise.all(o).then((t) => lr(t, r, e, i)) : lr(o, r, e, i);
	};
});
function dr(e) {
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
var fr = /*@__PURE__*/ G("$ZodDiscriminatedUnion", (e, t) => {
	t.inclusive = !1, ur.init(e, t);
	let n = e._zod.parse;
	_n(e, "propValues", (e) => {
		let t = {}, n = 0;
		for (let r of e.def.options) {
			let i = r._zod.propValues;
			if (!i || Object.keys(i).length === 0) throw Error(`Invalid discriminated union option at index "${e.def.options.indexOf(r)}"`);
			i[e.def.discriminator]?.has(void 0) && n++;
			for (let [e, n] of Object.entries(i)) {
				Object.prototype.hasOwnProperty.call(t, e) || Pt(t, e, /* @__PURE__ */ new Set());
				for (let r of n) t[e].add(r);
			}
		}
		return !e.def.unionFallback && n > 1 && t[e.def.discriminator]?.delete(void 0), t;
	}), t.options.forEach((e, n) => {
		let r = Ft(e._zod.def);
		if (r && !Object.prototype.hasOwnProperty.call(r, t.discriminator)) throw Error(`Invalid discriminated union option at index "${n}"`);
	});
	let r = jt(() => dr(t));
	e._zod.parse = (i, a) => {
		let o = i.value;
		if (!Ut(o)) return i.issues.push({
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
}), pr = /*@__PURE__*/ G("$ZodRecord", (e, t) => {
	Kn.init(e, t);
	let n = wn.memoizer;
	n?.attach(e), e._zod.parse = (r, i) => {
		let a = r.value;
		if (!Wt(a)) return r.issues.push({
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
						issues: s.issues.map((e) => an(e, i, Tn())),
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
					e.issues.length && r.issues.push(...en(n, e.issues)), r.value[l] = e.value;
				})) : (u.issues.length && r.issues.push(...en(n, u.issues)), r.value[l] = u.value);
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
				if (typeof n == "string" && Rn.test(n) && l.issues.length) {
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
						issues: l.issues.map((e) => an(e, i, Tn())),
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
					e.issues.length && r.issues.push(...en(n, e.issues)), r.value[u] = e.value;
				})) : (d.issues.length && r.issues.push(...en(n, d.issues)), r.value[u] = d.value);
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
}), mr = /*@__PURE__*/ G("$ZodEnum", (e, t) => {
	Kn.init(e, t);
	let n = Ot(t.entries), r = new Set(n);
	e._zod.values = r, _n(e, "pattern", (e) => {
		let t = Ot(e.def.entries).filter((e) => Gt.has(typeof e));
		return RegExp(t.length ? `^(${t.map((e) => Kt(e.toString())).join("|")})$` : "^[^\\s\\S]$");
	}), e._zod.parse = (t, i) => {
		let a = t.value;
		return r.has(a) || t.issues.push({
			code: "invalid_value",
			values: n,
			input: a,
			inst: e
		}), t;
	};
}), hr = /*@__PURE__*/ G("$ZodLiteral", (e, t) => {
	Kn.init(e, t);
	let n = new Set(t.values);
	e._zod.values = n, _n(e, "pattern", (e) => {
		let t = e.def.values;
		return RegExp(t.length ? `^(${t.map((e) => typeof e == "string" ? Kt(e) : e ? Kt(e.toString()) : String(e)).join("|")})$` : "^[^\\s\\S]$");
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
function gr(e, t) {
	return e.value = t.issues.length ? void 0 : t.value, e;
}
var _r = /*@__PURE__*/ G("$ZodOptional", (e, t) => {
	Kn.init(e, t), _n(e, "optin", (e) => e.def.innerType._zod.optin === "defaulted" ? "defaulted" : "optional"), e._zod.optout = "optional", _n(e, "values", (e) => {
		let t = e.def.innerType._zod.values;
		return t ? /* @__PURE__ */ new Set([...t, void 0]) : void 0;
	}), _n(e, "pattern", (e) => {
		let t = e.def.innerType._zod.pattern;
		return t ? RegExp(`^(${Nt(t.source)})?$`) : void 0;
	}), e._zod.parse = (e, n) => {
		if (e.value === void 0) {
			if (t.innerType._zod.optin !== "defaulted") return e;
			let r = t.innerType._zod.run({
				value: e.value,
				issues: []
			}, n);
			return r instanceof Promise ? r.then((t) => gr(e, t)) : gr(e, r);
		}
		return t.innerType._zod.run(e, n);
	};
}), vr = /*@__PURE__*/ G("$ZodNullable", (e, t) => {
	Kn.init(e, t), _n(e, "optin", (e) => e.def.innerType._zod.optin), _n(e, "optout", (e) => e.def.innerType._zod.optout), _n(e, "pattern", (e) => {
		let t = e.def.innerType._zod.pattern;
		return t ? RegExp(`^(${Nt(t.source)}|null)$`) : void 0;
	}), _n(e, "values", (e) => e.def.innerType._zod.values ? /* @__PURE__ */ new Set([...e.def.innerType._zod.values, null]) : void 0), e._zod.parse = (e, n) => e.value === null ? e : t.innerType._zod.run(e, n);
});
// ../vibebook/node_modules/zod/v4/core/api.js
function yr(e) {
	return e.checks &&= [...e.checks], e;
}
// @__NO_SIDE_EFFECTS__
function br(e, t) {
	return new e(yr({
		type: "string",
		...Jt(t)
	}));
}
// @__NO_SIDE_EFFECTS__
function xr(e, t) {
	return new e(yr({
		type: "number",
		checks: [],
		...Jt(t)
	}));
}
// @__NO_SIDE_EFFECTS__
function Sr(e, t) {
	return new e({
		type: "boolean",
		...Jt(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Cr(e, t) {
	return new e({
		type: "never",
		...Jt(t)
	});
}
// @__NO_SIDE_EFFECTS__
function wr(e, t) {
	return new Hn({
		check: "max_length",
		...Jt(t),
		maximum: e
	});
}
// @__NO_SIDE_EFFECTS__
function Tr(e, t) {
	return new Un({
		check: "min_length",
		...Jt(t),
		minimum: e
	});
}
// @__NO_SIDE_EFFECTS__
function Er(e, t) {
	return new Wn({
		check: "string_format",
		format: "starts_with",
		...Jt(t),
		prefix: e
	});
}
// ../vibebook/node_modules/zod/v4/mini/schemas.js
var Dr = /*@__PURE__*/ G("ZodMiniType", (e, t) => {
	if (!e._zod) throw Error("Uninitialized schema in ZodMiniType.");
	Kn.init(e, t), e.def = t, e.type = t.type;
}, {
	get with() {
		return this.check;
	},
	set with(e) {
		un(this, "with", e);
	},
	parse(e, t) {
		return Mn(this, e, t, { callee: this.parse });
	},
	parseAsync(e, t) {
		return Nn(this, e, t, { callee: this.parseAsync });
	},
	safeParse(e, t) {
		return Pn(this, e, t);
	},
	safeParseAsync(e, t) {
		return In(this, e, t);
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
		return qt(this, e, t);
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
}), Or = /*@__PURE__*/ G("ZodMiniString", (e, t) => {
	Xn.init(e, t), Dr.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function K(e) {
	return /* @__PURE__ */ br(Or, e);
}
var kr = /*@__PURE__*/ G("ZodMiniNumber", (e, t) => {
	Zn.init(e, t), Dr.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function Ar(e) {
	return /* @__PURE__ */ xr(kr, e);
}
var jr = /*@__PURE__*/ G("ZodMiniBoolean", (e, t) => {
	Qn.init(e, t), Dr.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function Mr(e) {
	return /* @__PURE__ */ Sr(jr, e);
}
var Nr = /*@__PURE__*/ G("ZodMiniNever", (e, t) => {
	$n.init(e, t), Dr.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function Pr(e) {
	return /* @__PURE__ */ Cr(Nr, e);
}
var Fr = /*@__PURE__*/ G("ZodMiniArray", (e, t) => {
	rr.init(e, t), Dr.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function q(e, t) {
	return new Fr({
		type: "array",
		element: e,
		...Jt(t)
	});
}
var Ir = /*@__PURE__*/ G("ZodMiniObject", (e, t) => {
	cr.init(e, t), Dr.init(e, t), vn(e, "shape", (e) => e._zod.def.shape, !1);
});
// @__NO_SIDE_EFFECTS__
function J(e, t) {
	return new Ir({
		type: "object",
		shape: e ?? {},
		...Jt(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Lr(e, t) {
	return Xt(e, t);
}
var Rr = /*@__PURE__*/ G("ZodMiniUnion", (e, t) => {
	ur.init(e, t), Dr.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function zr(e, t) {
	return new Rr({
		type: "union",
		options: e,
		...Jt(t)
	});
}
var Br = /*@__PURE__*/ G("ZodMiniDiscriminatedUnion", (e, t) => {
	fr.init(e, t), Dr.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function Vr(e, t, n) {
	return new Br({
		type: "union",
		options: t,
		discriminator: e,
		...Jt(n)
	});
}
var Hr = /*@__PURE__*/ G("ZodMiniRecord", (e, t) => {
	pr.init(e, t), Dr.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function Ur(e, t, n) {
	return !t || !t._zod ? new Hr({
		type: "record",
		keyType: /* @__PURE__ */ K(),
		valueType: e,
		...Jt(t)
	}) : new Hr({
		type: "record",
		keyType: e,
		valueType: t,
		...Jt(n)
	});
}
var Wr = /*@__PURE__*/ G("ZodMiniEnum", (e, t) => {
	mr.init(e, t), Dr.init(e, t), e.options = [...e._zod.values];
});
// @__NO_SIDE_EFFECTS__
function Gr(e, t) {
	return new Wr({
		type: "enum",
		entries: Array.isArray(e) ? Object.fromEntries(e.map((e) => [e, e])) : e,
		...Jt(t)
	});
}
var Kr = /*@__PURE__*/ G("ZodMiniLiteral", (e, t) => {
	hr.init(e, t), Dr.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function Y(e, t) {
	return new Kr({
		type: "literal",
		values: Array.isArray(e) ? e : [e],
		...Jt(t)
	});
}
var qr = /*@__PURE__*/ G("ZodMiniOptional", (e, t) => {
	_r.init(e, t), Dr.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function X(e) {
	return new qr({
		type: "optional",
		innerType: e
	});
}
var Jr = /*@__PURE__*/ G("ZodMiniNullable", (e, t) => {
	vr.init(e, t), Dr.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function Yr(e) {
	return new Jr({
		type: "nullable",
		innerType: e
	});
}
// shared/room.ts
var Z = /* @__PURE__ */ K(), Xr = /* @__PURE__ */ Ar(), Zr = /* @__PURE__ */ Mr(), Q = (e) => /* @__PURE__ */ X(e), Qr = (e) => /* @__PURE__ */ X(/* @__PURE__ */ Yr(e)), $r = /* @__PURE__ */ q(Z), ei = [
	"todo",
	"doing",
	"review",
	"done"
], ti = /* @__PURE__ */ J({
	title: Z,
	owner: Z,
	summary: Qr(Z),
	folder: Qr(Z)
}), ni = /* @__PURE__ */ J({
	title: Z,
	tasks: $r,
	why: Q(Z)
}), ri = /* @__PURE__ */ J({
	id: Xr,
	text: Z,
	who: Z,
	kind: Z,
	ts: Xr
}), ii = /* @__PURE__ */ J({
	id: Z,
	kind: Z,
	ref: Z,
	title: Q(Z),
	author: Q(Z),
	ts: Q(Xr)
}), ai = /* @__PURE__ */ J({
	id: Z,
	question: Z,
	options: $r,
	multi: Zr,
	closed: Zr,
	author: Z,
	votes: /* @__PURE__ */ q($r)
}), oi = /* @__PURE__ */ J({
	id: Z,
	title: Z,
	done: Zr,
	status: /* @__PURE__ */ Gr(ei),
	owner: Qr(Z),
	due: Qr(Z),
	flags: Q($r),
	epic_id: Q(Z)
}), si = /* @__PURE__ */ J({
	id: Z,
	title: Z,
	tasks: /* @__PURE__ */ q(oi),
	archived: Q(Zr),
	owner: Qr(Z),
	from_msg: Qr(Xr),
	parent: Qr(Z),
	kept: Q(Zr),
	files: Q(/* @__PURE__ */ q(/* @__PURE__ */ J({
		id: Z,
		name: Z,
		type: Z,
		n: Xr
	}))),
	flags: Q($r),
	prod: Qr(/* @__PURE__ */ J({
		stage: Z,
		note: Q(Z),
		at: Q(Xr)
	}))
}), ci = /* @__PURE__ */ J({
	id: Z,
	name: Z,
	type: Z,
	size: Xr,
	author: Z,
	ts: Xr,
	embed: Q(Zr)
}), li = /* @__PURE__ */ J({
	id: Xr,
	thread: Z,
	author: Z,
	ts: Xr,
	text: Z,
	kind: Qr(Z),
	tag: Qr(Z),
	via: Qr(Z),
	reply_to: Qr(Xr),
	choices: Qr(Z),
	poll: Qr(Z),
	card: Qr(Z),
	quiet: Q(Zr),
	cut: Q(Zr),
	for_who: Qr(Z),
	files: Q(/* @__PURE__ */ q(ci))
}), ui = /* @__PURE__ */ J({
	msg_id: Xr,
	agent: Q(Z),
	email: Z,
	who: Z,
	status: Z,
	ts: Xr,
	note: Qr(Z)
}), di = /* @__PURE__ */ J({
	id: Z,
	name: Qr(Z),
	text: Z,
	owner: Z,
	enabled: Zr,
	error: Qr(Z),
	every: Qr(Z),
	cron: Qr(Z),
	next_at: Qr(Xr),
	thread: Q(Z),
	tz: Q(Z),
	file_id: Qr(Z)
}), fi = /* @__PURE__ */ J({
	email: Z,
	name: Qr(Z),
	ts: Xr
}), pi = /* @__PURE__ */ J({
	email: Z,
	who: Z,
	read: Xr,
	delivered: Xr,
	agent: Q(Z),
	ts: Q(Xr)
}), mi = /* @__PURE__ */ J({
	me: Z,
	book: ti,
	messages: /* @__PURE__ */ q(li),
	epics: /* @__PURE__ */ q(si),
	roomTasks: Q(/* @__PURE__ */ q(oi)),
	members: $r,
	online: $r,
	names: Q(/* @__PURE__ */ Ur(Z, Z)),
	avatars: Q(/* @__PURE__ */ Ur(Z, Xr)),
	pending: Q($r),
	requests: Q(/* @__PURE__ */ q(fi)),
	suggestions: /* @__PURE__ */ q(ni),
	files: Q(/* @__PURE__ */ q(ci)),
	filesN: Q(Xr),
	filesAll: Q(Zr),
	reminders: Q(/* @__PURE__ */ q(di)),
	acks: Q(/* @__PURE__ */ q(ui)),
	receipts: Q(/* @__PURE__ */ q(pi)),
	counts: Q(/* @__PURE__ */ Ur(Z, Xr)),
	countsAt: Q(Xr),
	full: Q($r),
	complete: Q(Zr),
	origins: Q(/* @__PURE__ */ q(li)),
	docs: Q(/* @__PURE__ */ Ur(Z, Z)),
	doc: Q(Z),
	docNotes: Q($r),
	decisions: Q(/* @__PURE__ */ q(ri)),
	pins: Q(/* @__PURE__ */ q(ii)),
	polls: Q(/* @__PURE__ */ Ur(Z, ai))
}), hi = {
	todo: "A fazer",
	doing: "Fazendo",
	review: "Esperando OK",
	done: "Feito"
}, gi = ei.map((e) => ({
	value: e,
	label: hi[e]
}));
function _i(e, t) {
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
function vi() {
	try {
		return localStorage.getItem("vb.boardMode") === "list" ? "list" : "board";
	} catch {
		return "board";
	}
}
function yi(e, t) {
	return gi[gi.findIndex((t) => t.value === e) + t]?.value;
}
function bi(e) {
	return gi.some((t) => t.value === e);
}
// svelte/features/board/BoardPanel.svelte
var xi = p("<!> ", 1), Si = p("<!><span> </span>", 1), Ci = p("<span class=\"tw:inline-flex tw:items-center tw:gap-1\"><!> </span>"), wi = p("<span data-board-drag=\"\" draggable=\"true\" aria-hidden=\"true\" class=\"tw:absolute tw:right-2 tw:top-2 tw:grid tw:size-7 tw:cursor-grab tw:place-items-center tw:rounded-md tw:text-muted-foreground tw:active:cursor-grabbing\"><!></span>"), Ti = p("<article><button type=\"button\" data-board-open=\"\"><span> </span> <!> <span class=\"tw:flex tw:flex-wrap tw:items-center tw:gap-2 tw:text-xs tw:text-muted-foreground\"><!> <!> <!></span></button> <!> <div><!> <!></div></article>"), Ei = p("<p class=\"tw:m-0 tw:py-4 tw:text-xs tw:text-muted-foreground\"> </p>"), Di = p("<section><h3 class=\"tw:m-0 tw:flex tw:items-center tw:justify-between tw:gap-2 tw:font-sans tw:text-sm tw:font-semibold tw:leading-5 tw:tracking-normal\"> <!></h3> <div class=\"tw:space-y-3\"></div></section>"), Oi = p("<div class=\"tw:h-full tw:min-h-0 tw:min-w-0 tw:overflow-auto tw:pb-2\"><div class=\"tw:grid tw:grid-cols-[repeat(4,minmax(15rem,1fr))] tw:gap-3\"></div></div>"), ki = p("<section class=\"tw:space-y-2\"><h3 class=\"tw:m-0 tw:flex tw:items-center tw:gap-2 tw:font-sans tw:text-sm tw:font-semibold tw:leading-5 tw:tracking-normal\"> <!></h3> <!></section>"), Ai = p("<div class=\"tw:h-full tw:min-h-0 tw:space-y-5 tw:overflow-auto\"><!> <!></div>"), ji = p("<div class=\"tw:min-w-32 tw:flex-1 tw:space-y-1\"><!> <!></div>"), Mi = p("<section data-vb-native=\"\" class=\"tw:m-0 tw:box-border tw:flex tw:min-h-0 tw:min-w-0 tw:flex-1 tw:flex-col tw:gap-3 tw:rounded-surface tw:bg-background tw:p-3 tw:font-sans tw:text-sm tw:text-foreground\"><p class=\"tw:m-0 tw:text-xs tw:text-muted-foreground\"> </p> <!> <p role=\"status\" aria-live=\"polite\" class=\"tw:sr-only\"> </p> <p class=\"tw:sr-only\"> </p> <!> <form class=\"tw:flex tw:shrink-0 tw:flex-wrap tw:items-end tw:gap-2\" data-board-add=\"\"><div class=\"tw:min-w-36 tw:flex-1 tw:space-y-1\"><!> <!></div> <!> <!></form></section>");
function Ni(t, a) {
	let s = h();
	Ee(a, !0);
	let c = (e, t = xe, o = xe, c = xe) => {
		var l = Ti(), u = N(l), d = N(u), f = P(d, !0), p = w(d, 2), h = (e) => {
			{
				let n = B(() => `@vibe: ${t().flags.join(" · ")}`);
				Te(e, {
					variant: "warning",
					get title() {
						return A(n);
					},
					children: (e, n) => {
						var r = xi(), i = M(r);
						Ke(i, {
							name: "warning",
							class: "tw:size-3"
						});
						var a = w(i, 1, !0);
						m((e) => _(a, e), [() => t().flags.join(" · ")]), S(e, r);
					},
					$$slots: { default: !0 }
				});
			}
		};
		n(p, (e) => {
			t().flags?.length && e(h);
		});
		var g = w(p, 2), v = N(g);
		Te(v, {
			children: (e, n) => {
				H();
				var r = T();
				m(() => _(r, t().epicTitle)), S(e, r);
			},
			$$slots: { default: !0 }
		});
		var y = w(v, 2), C = (e) => {
			var n = Si(), r = M(n);
			{
				let e = B(() => a.vb.name(t().owner)), n = B(() => `/api/avatar/${encodeURIComponent(t().owner)}`);
				Ne(r, {
					get name() {
						return A(e);
					},
					get src() {
						return A(n);
					},
					class: "tw:size-6"
				});
			}
			var i = w(r), o = P(i, !0);
			m((e) => _(o, e), [() => t().owner === a.room.me ? a.vb.t("você") : a.vb.name(t().owner)]), S(e, n);
		};
		n(y, (e) => {
			t().owner && e(C);
		});
		var E = w(y, 2), O = (e) => {
			var n = Ci(), r = N(n);
			Ke(r, {
				name: "calendar",
				class: "tw:size-3"
			});
			var i = w(r, 1, !0);
			L(n), m(() => _(i, t().due)), S(e, n);
		};
		n(E, (e) => {
			t().due && e(O);
		}), L(g), L(u);
		var j = w(u, 2), te = (e) => {
			var t = wi(), n = N(t);
			Ke(n, { name: "grip" }), L(t), m((e) => I(t, "title", e), [() => a.vb.t("Arraste, ou use ← →. Clique pra abrir o épico.")]), S(e, t);
		};
		n(j, (e) => {
			c() || e(te);
		});
		var F = w(j, 2), re = N(F);
		{
			let e = B(() => `${s}-${o()}`);
			ne(re, {
				get for() {
					return A(e);
				},
				children: (e, t) => {
					H();
					var n = T();
					m((e) => _(n, e), [() => a.vb.t("Status")]), S(e, n);
				},
				$$slots: { default: !0 }
			});
		}
		var ie = w(re, 2);
		{
			let e = B(() => `${s}-${o()}`), n = B(() => `${a.vb.t("Status")}: ${t().title}`);
			ae(ie, {
				get id() {
					return A(e);
				},
				get "aria-label"() {
					return A(n);
				},
				get value() {
					return t().status;
				},
				get items() {
					return A(k);
				},
				onValueChange: (e) => (bi(e) && pe(t(), e, o()), !1)
			});
		}
		L(F), L(l), i(l, (e, t) => de?.(e, t), o), m((e, n, r, i) => {
			I(l, "data-board-task", t().id), I(l, "data-status", t().status), I(l, "draggable", !c()), Ge(l, 1, e), I(u, "data-epic", t().epicId), I(u, "aria-describedby", `${s}-keys`), Ge(u, 1, n), Ge(d, 1, r), _(f, t().title), Ge(F, 1, i);
		}, [
			() => D(he("tw:relative tw:min-w-0 tw:rounded-control tw:border tw:border-border tw:bg-card tw:text-card-foreground tw:shadow-xs", c() && "tw:flex tw:flex-wrap tw:items-center", A(x) === t().id && "tw:opacity-50", t().status !== "done" && t().owner === a.room.me && "tw:ring-1 tw:ring-ring/20")),
			() => D(he("tw:block tw:w-full tw:min-w-0 tw:flex-1 tw:space-y-2 tw:rounded-control tw:border-0 tw:bg-transparent tw:p-3 tw:text-left tw:font-sans tw:text-sm tw:text-card-foreground tw:outline-none tw:hover:bg-accent tw:focus-visible:ring-2 tw:focus-visible:ring-ring", !c() && "tw:pr-10")),
			() => D(he("tw:block tw:break-words tw:font-medium", t().status === "done" && "tw:line-through")),
			() => D(he("tw:min-w-32 tw:space-y-1 tw:p-3", !c() && "tw:border-t tw:border-border"))
		]), ee("dragstart", l, (e) => {
			e.target instanceof Element && e.target.closest("select") ? e.preventDefault() : (e.dataTransfer && (e.dataTransfer.setData("application/x-vibebook-task", t().id), e.dataTransfer.effectAllowed = "move", e.dataTransfer.setDragImage(e.currentTarget, 20, 20)), z(x, t().id, !0));
		}), ee("dragend", l, () => {
			z(x, null), z(b, null);
		}), r("click", u, () => a.onopen?.(t().epicId)), r("keydown", u, (e) => _e(e, t(), o())), S(e, l);
	}, l = B(() => _i(a.room, a.thread)), f = W(e(vi())), p = W(""), g = W(null), v = W(""), y = W(""), b = W(null), x = W(null), C = W(e(d(() => A(l).targets.find((e) => e.id === A(l).scope) ?? A(l).targets.find((e) => e.id !== "main") ?? A(l).targets[0] ?? {
		id: a.thread,
		title: a.thread
	}))), E = B(() => A(l).targets.some((e) => e.id === A(C).id)), O = B(() => [...A(E) ? [] : [{
		value: A(C).id,
		label: A(C).title,
		disabled: !0
	}], ...A(l).targets.map((e) => ({
		value: e.id,
		label: e.title
	}))]), k = B(() => gi.map((e) => ({
		value: e.value,
		label: a.vb.t(e.label)
	}))), te = B(() => A(l).groups.map((e) => ({
		...e,
		tasks: e.tasks.filter((e) => e.status !== "done")
	})).filter((e) => e.tasks.length)), ie = B(() => A(l).tasks.filter((e) => e.owner === a.room.me && e.status !== "done")), R = /* @__PURE__ */ new Map(), se = 0, le = !1, ue = W(null);
	re(() => {
		le = !0, se++, R.clear();
	});
	function de(e, t) {
		return R.set(t, e), { destroy() {
			R.get(t) === e && R.delete(t);
		} };
	}
	function fe(e) {
		try {
			if (a.send(e)) return z(v, ""), !0;
		} catch {}
		return z(v, a.vb.t("Não deu pra enviar agora. Tente de novo."), !0), !1;
	}
	function pe(e, t, n) {
		if (e.status === t) return !0;
		let r = document.activeElement, i = r instanceof HTMLElement && R.get(n)?.contains(r) ? r : null;
		return fe({
			t: "task.status",
			id: e.id,
			status: t
		}) ? (z(ue, {
			id: e.id,
			status: t,
			generation: ++se,
			...i ? { focus: {
				key: n,
				node: i,
				selector: i.matches("select") ? "select" : "[data-board-open]"
			} } : {}
		}, !0), !0) : !1;
	}
	Ae(() => {
		let e = A(ue);
		if (!e) return;
		let t = [...a.room.roomTasks ?? [], ...a.room.epics.flatMap((e) => e.tasks)].find((t) => t.id === e.id);
		t ? t.status === e.status && (z(ue, null), z(y, `${t.title}: ${a.vb.t(gi.find((e) => e.value === t.status)?.label ?? t.status)}`), me(e)) : (z(ue, null), me(e));
	});
	function me(e) {
		let t = e.focus;
		!t || document.activeElement !== t.node && document.activeElement !== document.body || j().then(() => {
			if (le || e.generation !== se || document.activeElement !== t.node && document.activeElement !== document.body) return;
			let n = R.get(t.key)?.querySelector(t.selector) ?? A(g);
			n?.focus({ preventScroll: !0 }), n?.scrollIntoView({
				block: "nearest",
				inline: "nearest"
			});
		});
	}
	function ge(e) {
		if (e === "board" || e === "list") {
			z(f, e, !0), se++, z(ue, null);
			try {
				localStorage.setItem("vb.boardMode", e);
			} catch {}
		}
	}
	function _e(e, t, n) {
		let r = e.key === "ArrowRight" ? yi(t.status, 1) : e.key === "ArrowLeft" ? yi(t.status, -1) : void 0;
		r && (e.preventDefault(), pe(t, r, n));
	}
	function ve(e, t) {
		e.preventDefault(), z(b, null);
		let n = e.dataTransfer?.getData("application/x-vibebook-task"), r = A(l).tasks.find((e) => e.id === n);
		z(x, null), r && pe(r, t, `board:${r.id}`);
	}
	function ye(e) {
		e.preventDefault(), A(p).trim() && (A(E) ? fe({
			t: "task.add",
			epic: A(C).id,
			title: A(p).trim()
		}) && z(p, "") : z(v, a.vb.t("Escolha um épico."), !0));
	}
	var Se = Mi(), Ce = N(Se), we = P(Ce, !0), De = w(Ce, 2), Oe = (e) => {
		{
			let t = B(() => A(l).missingScope ? a.vb.t("Épico não encontrado.") : A(E) ? A(v) : a.vb.t("Escolha um épico."));
			Le(e, {
				get title() {
					return A(t);
				},
				compact: !0
			});
		}
	};
	n(De, (e) => {
		(A(l).missingScope || !A(E) || A(v)) && e(Oe);
	});
	var ke = w(De, 2), je = P(ke, !0), Me = w(ke, 2), Pe = P(Me, !0), U = w(Me, 2);
	{
		let e = (e, t = xe) => {
			var r = u(), i = M(r), s = (e) => {
				var r = u(), i = M(r), s = (e) => {
					var t = Oi(), n = N(t);
					o(n, 21, () => gi, (e) => e.value, (e, t) => {
						let n = B(() => A(l).tasks.filter((e) => e.status === A(t).value));
						var r = Di(), i = N(r), s = N(i, !0), u = w(s);
						Te(u, {
							children: (e, t) => {
								H();
								var r = T();
								m(() => _(r, A(n).length)), S(e, r);
							},
							$$slots: { default: !0 }
						}), L(i);
						var d = w(i, 2);
						o(d, 21, () => A(n), (e) => e.id, (e, t) => {
							c(e, () => A(t), () => `board:${A(t).id}`, () => !1);
						}, (e) => {
							var n = Ei(), r = P(n, !0);
							m((e) => _(r, e), [() => a.vb.t(A(t).value === "todo" ? "Nada a fazer." : "Arraste um card pra cá.")]), S(e, n);
						}), L(d), L(r), m((e, n, i) => {
							I(r, "data-lane", A(t).value), I(r, "aria-label", e), Ge(r, 1, n), _(s, i);
						}, [
							() => a.vb.t(A(t).label),
							() => D(he("tw:min-w-0 tw:space-y-3 tw:rounded-surface tw:border tw:border-border tw:bg-muted/40 tw:p-3", A(b) === A(t).value && "tw:ring-2 tw:ring-ring")),
							() => a.vb.t(A(t).label)
						]), ee("dragover", r, (e) => {
							e.dataTransfer?.types.includes("application/x-vibebook-task") && (e.preventDefault(), z(b, A(t).value, !0));
						}), ee("dragleave", r, () => {
							z(b, null);
						}), ee("drop", r, (e) => ve(e, A(t).value)), S(e, r);
					}), L(n), L(t), S(e, t);
				}, d = (e) => {
					var t = Ai(), r = N(t), i = (e) => {
						var t = ki(), n = N(t), r = N(n, !0), i = w(r);
						Te(i, {
							variant: "warning",
							children: (e, t) => {
								H();
								var n = T();
								m(() => _(n, A(ie).length)), S(e, n);
							},
							$$slots: { default: !0 }
						}), L(n);
						var s = w(n, 2);
						o(s, 17, () => A(ie), (e) => e.id, (e, t) => {
							c(e, () => A(t), () => `mine:${A(t).id}`, () => !0);
						}), L(t), m((e, n) => {
							I(t, "aria-label", e), _(r, n);
						}, [() => a.vb.t("Esperando você"), () => a.vb.t("Esperando você")]), S(e, t);
					};
					n(r, (e) => {
						A(ie).length && e(i);
					});
					var s = w(r, 2);
					o(s, 17, () => A(te), (e) => e.id, (e, t) => {
						var n = ki(), r = N(n), i = N(r, !0), a = w(i);
						Te(a, {
							children: (e, n) => {
								H();
								var r = T();
								m(() => _(r, A(t).tasks.length)), S(e, r);
							},
							$$slots: { default: !0 }
						}), L(r);
						var s = w(r, 2);
						o(s, 17, () => A(t).tasks, (e) => e.id, (e, t) => {
							c(e, () => A(t), () => `group:${A(t).id}`, () => !0);
						}), L(n), m(() => {
							I(n, "aria-label", A(t).title), _(i, A(t).title);
						}), S(e, n);
					}, (e) => {
						{
							let t = B(() => a.vb.t("Nenhuma tarefa aberta."));
							oe(e, { get title() {
								return A(t);
							} });
						}
					}), L(t), S(e, t);
				};
				n(i, (e) => {
					t() === "board" ? e(s) : e(d, -1);
				}), S(e, r);
			};
			n(i, (e) => {
				t() === A(f) && e(s);
			}), S(e, r);
		}, t = B(() => a.vb.t("Quadro de tarefas")), r = B(() => [{
			value: "board",
			label: a.vb.t("Quadro")
		}, {
			value: "list",
			label: a.vb.t("Lista")
		}]);
		ce(U, {
			class: "tw:flex-1 tw:overflow-hidden",
			get label() {
				return A(t);
			},
			get items() {
				return A(r);
			},
			get value() {
				return A(f);
			},
			onValueChange: ge,
			children: e,
			$$slots: { default: !0 }
		});
	}
	var Fe = w(U, 2), Ie = N(Fe), Re = N(Ie);
	{
		let e = B(() => `${s}-title`);
		ne(Re, {
			get for() {
				return A(e);
			},
			children: (e, t) => {
				H();
				var n = T();
				m((e) => _(n, e), [() => a.vb.t("Nova tarefa")]), S(e, n);
			},
			$$slots: { default: !0 }
		});
	}
	var ze = w(Re, 2);
	{
		let e = B(() => `${s}-title`), t = B(() => a.vb.t("nova tarefa"));
		be(ze, {
			get id() {
				return A(e);
			},
			get placeholder() {
				return A(t);
			},
			get ref() {
				return A(g);
			},
			set ref(e) {
				z(g, e, !0);
			},
			get value() {
				return A(p);
			},
			set value(e) {
				z(p, e, !0);
			}
		});
	}
	L(Ie);
	var Be = w(Ie, 2), Ve = (e) => {
		var t = ji(), n = N(t);
		{
			let e = B(() => `${s}-epic`);
			ne(n, {
				get for() {
					return A(e);
				},
				children: (e, t) => {
					H();
					var n = T();
					m((e) => _(n, e), [() => a.vb.t("Épico")]), S(e, n);
				},
				$$slots: { default: !0 }
			});
		}
		var r = w(n, 2);
		{
			let e = B(() => `${s}-epic`), t = B(() => !A(E));
			ae(r, {
				get id() {
					return A(e);
				},
				get "aria-invalid"() {
					return A(t);
				},
				get items() {
					return A(O);
				},
				get value() {
					return A(C).id;
				},
				onValueChange: (e) => {
					let t = A(l).targets.find((t) => t.id === e);
					if (!t) return !1;
					z(C, t, !0), z(v, "");
				}
			});
		}
		L(t), S(e, t);
	};
	n(Be, (e) => {
		A(l).scope || e(Ve);
	});
	var He = w(Be, 2);
	{
		let e = B(() => !A(p).trim() || !A(E));
		V(He, {
			type: "submit",
			get disabled() {
				return A(e);
			},
			children: (e, t) => {
				var n = xi(), r = M(n);
				Ke(r, { name: "plus" });
				var i = w(r, 1, !0);
				m((e) => _(i, e), [() => a.vb.t("Nova tarefa")]), S(e, n);
			},
			$$slots: { default: !0 }
		});
	}
	L(Fe), L(Se), m((e, t, n) => {
		I(Se, "data-board-scope", A(l).scope ?? "all"), I(Se, "aria-label", e), _(we, t), _(je, A(y)), I(Me, "id", `${s}-keys`), _(Pe, n);
	}, [
		() => a.vb.t("Quadro de tarefas"),
		() => A(l).title ?? (A(l).scope ? A(C).title : a.vb.t("Todos os épicos")),
		() => a.vb.t("Arraste, ou use ← →. Clique pra abrir o épico.")
	]), ee("submit", Fe, ye), S(t, Se), F();
}
qe(["click", "keydown"]);
// svelte/Board.svelte
var Pi = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy"
]);
function Fi(e, t) {
	Ee(t, !0);
	let n = R(t, Pi);
	var r = u(), i = M(r);
	ye(i, () => JSON.stringify([t.room.id, t.thread]), (e) => {
		Ni(e, Se(() => n));
	}), S(e, r), F();
}
// svelte/panels.ts
var Ii = (e) => e.type.startsWith("image/") ? "img" : e.type.startsWith("audio/") ? "audio" : e.type === "text/html" ? "html" : e.type === "application/pdf" ? "pdf" : /\.md$/i.test(e.name) || e.type === "text/markdown" ? "md" : e.type === "text/plain" || e.type === "text/csv" ? "txt" : "other", Li = (e) => e > 1e6 ? `${(e / 1e6).toFixed(1)} MB` : `${Math.max(1, Math.round(e / 1e3))} KB`, Ri = [
	["all", "Tudo"],
	["img", "Imagens"],
	["md", "Markdown"],
	["txt", "Texto e CSV"],
	["html", "HTML"],
	["pdf", "PDF"],
	["audio", "Áudios"],
	["other", "Outros"]
];
function zi(e, t, n) {
	let r = (e.files ?? []).map((e, t) => ({
		file: e,
		index: t
	})).sort((e, t) => t.file.ts - e.file.ts || e.index - t.index).map((e) => e.file), i = { all: r.length };
	for (let e of r) {
		let t = Ii(e);
		i[t] = (i[t] ?? 0) + 1;
	}
	let a = i[t] ? t : "all", o = r.filter((e) => a === "all" || Ii(e) === a), s = (e) => e.name.includes("/") ? e.name.slice(0, e.name.lastIndexOf("/")) : "", c = n && o.some((e) => s(e) === n || s(e).startsWith(n + "/")) ? n : "", l = c ? c + "/" : "", u = /* @__PURE__ */ new Map(), d = [];
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
function Bi(e, t) {
	return e.files?.find((e) => e.id === t.id && e.name === t.name && e.type === t.type && e.ts === t.ts && e.size === t.size && e.author === t.author);
}
// svelte/Files.svelte
var Vi = p(" <small> </small>", 1), Hi = p("<div class=\"tw:flex tw:flex-wrap tw:gap-1\"></div>"), Ui = p("<div class=\"tw:flex tw:items-center tw:gap-2\"><!><!><b> </b></div>"), Wi = p("<!><b> </b><small> </small>", 1), Gi = p("<img class=\"tw:h-24 tw:w-full tw:rounded-md tw:object-contain\" loading=\"lazy\"/>"), Ki = p("<!> <b class=\"tw:break-all\"> </b><small class=\"tw:text-muted-foreground\"> </small>", 1), qi = p("<article class=\"tw:min-w-0 tw:rounded-lg tw:border tw:border-border tw:bg-card tw:p-3\"><!> <!></article>"), Ji = p("<p> </p>"), Yi = p("<!> <!> <div class=\"tw:grid tw:grid-cols-2 tw:gap-3 tw:sm:grid-cols-3\"><!> <!></div> <!>", 1), Xi = p("<p role=\"status\"> </p>"), Zi = p("<p role=\"alert\" class=\"tw:text-destructive\"> </p> <!>", 1), Qi = p("<p role=\"alert\" class=\"tw:text-destructive\"> </p>"), $i = p("<section data-vb-native=\"files\" class=\"tw:flex tw:flex-col tw:gap-3 tw:p-3 tw:text-foreground\"><!> <!> <!> <!></section>");
function ea(e, t) {
	Ee(t, !0);
	let r = () => se(A(c), "$fileState", i), [i, a] = ze(), s = !1;
	De(() => (s = !0, () => {
		s = !1;
	}));
	let c = B(() => t.session.state), l = B(() => zi(t.room, r().kind, r().directory));
	Ae(() => {
		t.session.sync(t.room);
	});
	let u = (e) => e === "unconfirmed" ? t.vb.t("Ainda não recebi a confirmação. Confira antes de tentar de novo.") : e;
	function d(e, n, r = !1) {
		s && (t.session.select(e, n), r && t.onfolderchange());
	}
	var f = $i(), p = N(f), h = (e) => {
		var i = Yi(), a = M(i), c = (e) => {
			var n = Hi();
			o(n, 21, () => Ri.filter(([e]) => A(l).counts[e]), b, (e, n) => {
				var r = B(() => Re(A(n), 2));
				let i = () => A(r)[0], a = () => A(r)[1];
				{
					let n = B(() => A(l).kind === i() ? "secondary" : "ghost"), r = B(() => A(l).kind === i());
					V(e, {
						get variant() {
							return A(n);
						},
						size: "sm",
						get "data-fkind"() {
							return i();
						},
						get "aria-pressed"() {
							return A(r);
						},
						onclick: () => d(i(), A(l).dir),
						children: (e, n) => {
							H();
							var r = Vi(), o = M(r), s = w(o), c = P(s, !0);
							m((e) => {
								_(o, `${e ?? ""} `), _(c, A(l).counts[i()]);
							}, [() => t.vb.t(a())]), S(e, r);
						},
						$$slots: { default: !0 }
					});
				}
			}), L(n), m((e) => I(n, "aria-label", e), [() => t.vb.t("Arquivos")]), S(e, n);
		};
		n(a, (e) => {
			A(l).counts.all > 1 && e(c);
		});
		var u = w(a, 2), f = (e) => {
			var n = Ui(), r = N(n);
			V(r, {
				variant: "ghost",
				size: "sm",
				onclick: () => d(A(l).kind, A(l).dir.includes("/") ? A(l).dir.slice(0, A(l).dir.lastIndexOf("/")) : "", !0),
				children: (e, n) => {
					H();
					var r = T();
					m((e) => _(r, `← ${e ?? ""}`), [() => t.vb.t("voltar")]), S(e, r);
				},
				$$slots: { default: !0 }
			});
			var i = w(r);
			Ke(i, { name: "folder" });
			var a = w(i), o = P(a);
			L(n), m(() => _(o, `${A(l).dir ?? ""}/`)), S(e, n);
		};
		n(u, (e) => {
			A(l).dir && e(f);
		});
		var p = w(u, 2), h = N(p);
		o(h, 17, () => A(l).folders, b, (e, n) => {
			var r = B(() => Re(A(n), 2));
			let i = () => A(r)[0], a = () => A(r)[1];
			{
				let n = B(() => A(l).prefix + i());
				V(e, {
					get "data-fdir"() {
						return A(n);
					},
					variant: "outline",
					class: "tw:h-auto tw:flex-col tw:items-start tw:whitespace-normal tw:p-3",
					onclick: () => d(A(l).kind, A(l).prefix + i(), !0),
					children: (e, n) => {
						var r = Wi(), o = M(r);
						Ke(o, {
							name: "folder",
							class: "tw:size-8"
						});
						var s = w(o), c = P(s), l = w(s), u = P(l, !0);
						m((e) => {
							_(c, `${i() ?? ""}/`), _(u, e);
						}, [() => a() === 1 ? t.vb.t("1 arquivo") : t.vb.t("{n} arquivos", { n: a() })]), S(e, r);
					},
					$$slots: { default: !0 }
				});
			}
		});
		var g = w(h, 2);
		o(g, 17, () => A(l).list, (e) => e.id, (e, i) => {
			let a = B(() => t.room.pins?.some((e) => e.kind === "file" && e.ref === A(i).id) ?? !1);
			var o = qi(), c = N(o);
			V(c, {
				variant: "ghost",
				class: "tw:h-auto tw:w-full tw:min-w-0 tw:flex-col tw:items-start tw:gap-2 tw:whitespace-normal tw:p-0 tw:text-left",
				get title() {
					return A(i).name;
				},
				onclick: () => {
					s && t.session.open(A(i), t.onopenfile);
				},
				children: (e, r) => {
					var a = Ki(), o = M(a), s = (e) => {
						var n = Gi();
						m((e) => {
							I(n, "src", e), I(n, "alt", A(i).name);
						}, [() => `/api/books/${encodeURIComponent(t.room.id)}/files/${encodeURIComponent(A(i).id)}`]), S(e, n);
					}, c = B(() => A(i).type.startsWith("image/")), u = (e) => {
						Ke(e, {
							name: "file",
							class: "tw:size-8"
						});
					};
					n(o, (e) => {
						A(c) ? e(s) : e(u, -1);
					});
					var d = w(o, 2), f = P(d, !0), p = w(d), h = P(p);
					m((e, t, n, r) => {
						_(f, e), _(h, `${t ?? ""} · ${n ?? ""} · ${r ?? ""}`);
					}, [
						() => A(i).name.slice(A(l).prefix.length),
						() => t.vb.name(A(i).author),
						() => t.vb.ago(A(i).ts),
						() => (A(l).versions.get(A(i).name) ?? 0) > 1 ? t.vb.t("{n} versões", { n: A(l).versions.get(A(i).name) }) : Li(A(i).size)
					]), S(e, a);
				},
				$$slots: { default: !0 }
			});
			var u = w(c, 2);
			{
				let e = B(() => t.vb.t(A(a) ? "Desafixar" : "Fixar na lateral")), n = B(() => !!r().pending), o = B(() => r().pending?.id === A(i).id);
				Oe(u, {
					icon: "pin",
					get label() {
						return A(e);
					},
					get "aria-pressed"() {
						return A(a);
					},
					get disabled() {
						return A(n);
					},
					get loading() {
						return A(o);
					},
					onclick: () => {
						s && t.session.toggle(A(i), t.request);
					}
				});
			}
			L(o), m(() => I(o, "data-file-id", A(i).id)), S(e, o);
		}), L(p);
		var v = w(p, 2), y = (e) => {
			var n = Ji(), r = P(n, !0);
			m((e) => _(r, e), [() => t.vb.t("Nada aqui.")]), S(e, n);
		};
		n(v, (e) => {
			!A(l).list.length && !A(l).folders.length && e(y);
		}), S(e, i);
	}, g = (e) => {
		var n = Ji(), r = P(n, !0);
		m((e) => _(r, e), [() => t.vb.t("Cole uma imagem no chat (Cmd+V), arraste um arquivo ou use o clipe. Tudo que for enviado neste vibebook fica aqui.")]), S(e, n);
	};
	n(p, (e) => {
		t.room.files?.length ? e(h) : !r().loading && !r().loadError && e(g, 1);
	});
	var v = w(p, 2), y = (e) => {
		var n = Xi(), r = P(n, !0);
		m((e) => _(r, e), [() => t.vb.t("Carregando…")]), S(e, n);
	};
	n(v, (e) => {
		r().loading && e(y);
	});
	var x = w(v, 2), C = (e) => {
		var n = Zi(), i = M(n), a = P(i, !0), o = w(i, 2);
		V(o, {
			variant: "outline",
			onclick: () => {
				s && t.session.load(t.request);
			},
			children: (e, n) => {
				H();
				var r = T();
				m((e) => _(r, e), [() => t.vb.t("Tentar novamente")]), S(e, r);
			},
			$$slots: { default: !0 }
		}), m((e) => _(a, e), [() => u(r().loadError)]), S(e, n);
	};
	n(x, (e) => {
		r().loadError && e(C);
	});
	var E = w(x, 2), D = (e) => {
		var t = Qi(), n = P(t, !0);
		m((e) => _(n, e), [() => u(r().error)]), S(e, t);
	};
	n(E, (e) => {
		r().error && e(D);
	}), L(f), m((e) => I(f, "aria-label", e), [() => t.vb.t("Arquivos")]), S(e, f), F(), a();
}
// svelte/features/decisions/model.ts
var ta = {
	schedule: (e, t) => setTimeout(e, t),
	cancel: (e) => clearTimeout(e)
}, na = 1e4, ra = (e) => e.slice().reverse();
function ia(e, t = ta) {
	let n = Ce({
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
				for (let e of Object.keys(ke(n).issues).map(Number)) i.some((t) => t.id === e) || o(e);
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
				}, na);
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
var aa = p("<p role=\"alert\" class=\"tw:m-0 tw:text-sm tw:text-destructive\"> </p>"), oa = p("<!> <!> <!> <div class=\"tw:flex tw:flex-wrap tw:justify-end tw:gap-2\"><!> <!></div>", 1), sa = p("<!> <!>", 1);
function ca(e, r) {
	Ee(r, !0);
	let i = U(r, "open", 15, !1), a = U(r, "busy", 3, !1), o = U(r, "error", 3, ""), s = W(null);
	Ae(() => {
		if (i()) return te(() => {
			i(!1), r.onOpenChange?.(!1);
		});
	});
	var c = u(), l = M(c);
	Ue(l, () => $e, (e, c) => {
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
				var c = u(), l = M(c);
				Ue(l, () => ve, (e, i) => {
					i(e, {
						children: (e, i) => {
							var c = sa(), l = M(c);
							Ue(l, () => We, (e, t) => {
								t(e, {
									"data-vb-native": !0,
									class: "tw:fixed tw:inset-0 tw:z-40 tw:m-0 tw:box-border tw:bg-scrim"
								});
							});
							var d = w(l, 2);
							Ue(d, () => lt, (e, i) => {
								i(e, {
									"data-vb-native": !0,
									preventScroll: !1,
									preventBodyPointerEvents: !1,
									preventOverflowTextSelection: !1,
									onOpenAutoFocus: (e) => {
										e.preventDefault(), A(s)?.focus();
									},
									onCloseAutoFocus: (e) => {
										let t = r.returnFocus?.();
										t?.isConnected && (e.preventDefault(), t.focus());
									},
									onEscapeKeydown: (e) => {
										a() && e.preventDefault();
									},
									class: "tw:fixed tw:left-1/2 tw:top-1/2 tw:z-50 tw:m-0 tw:box-border tw:flex tw:max-h-[90dvh] tw:w-[calc(100%-2rem)] tw:max-w-lg tw:-translate-x-1/2 tw:-translate-y-1/2 tw:flex-col tw:gap-4 tw:overflow-auto tw:rounded-surface tw:border tw:border-solid tw:border-border tw:bg-card tw:p-6 tw:font-sans tw:text-sm tw:text-card-foreground tw:shadow-lg tw:outline-none",
									children: (e, i) => {
										var c = oa(), l = M(c);
										Ue(l, () => t, (e, t) => {
											t(e, {
												class: "tw:m-0 tw:text-lg tw:font-semibold tw:leading-6 tw:tracking-tight",
												children: (e, t) => {
													H();
													var n = T();
													m(() => _(n, r.title)), S(e, n);
												},
												$$slots: { default: !0 }
											});
										});
										var d = w(l, 2), f = (e) => {
											var t = u(), n = M(t);
											Ue(n, () => ie, (e, t) => {
												t(e, {
													class: "tw:m-0 tw:whitespace-pre-wrap tw:break-words tw:text-sm tw:text-muted-foreground",
													children: (e, t) => {
														H();
														var n = T();
														m(() => _(n, r.description)), S(e, n);
													},
													$$slots: { default: !0 }
												});
											}), S(e, t);
										};
										n(d, (e) => {
											r.description && e(f);
										});
										var p = w(d, 2), h = (e) => {
											var t = aa(), n = P(t, !0);
											m(() => _(n, o())), S(e, t);
										};
										n(p, (e) => {
											o() && e(h);
										});
										var g = w(p, 2), v = N(g);
										{
											let e = B(() => Be({ variant: "outline" }));
											Ue(v, () => at, (t, n) => {
												n(t, {
													get disabled() {
														return a();
													},
													get class() {
														return A(e);
													},
													get ref() {
														return A(s);
													},
													set ref(e) {
														z(s, e, !0);
													},
													children: (e, t) => {
														H();
														var n = T();
														m(() => _(n, r.cancelLabel)), S(e, n);
													},
													$$slots: { default: !0 }
												});
											});
										}
										var y = w(v, 2);
										{
											let e = B(() => a() || void 0), t = B(() => Be({ variant: "destructive" }));
											Ue(y, () => nt, (n, i) => {
												i(n, {
													get disabled() {
														return a();
													},
													get "aria-busy"() {
														return A(e);
													},
													onclick: (e) => {
														e.preventDefault(), r.onconfirm();
													},
													get class() {
														return A(t);
													},
													children: (e, t) => {
														H();
														var n = T();
														m(() => _(n, r.confirmLabel)), S(e, n);
													},
													$$slots: { default: !0 }
												});
											});
										}
										L(g), S(e, c);
									},
									$$slots: { default: !0 }
								});
							}), S(e, c);
						},
						$$slots: { default: !0 }
					});
				}), S(e, c);
			},
			$$slots: { default: !0 }
		});
	}), S(e, c), F();
}
// svelte/features/decisions/DecisionsPanel.svelte
var la = p("<p role=\"status\" class=\"tw:m-0 tw:text-xs tw:text-muted-foreground\"> </p>"), ua = p("<p role=\"alert\" class=\"tw:m-0 tw:whitespace-pre-wrap tw:break-words tw:text-sm tw:text-destructive\"> </p>"), da = p("<div class=\"tw:min-w-0 tw:flex-1 tw:space-y-2\"><p class=\"tw:m-0 tw:whitespace-pre-wrap tw:break-words tw:leading-6\"> </p> <div class=\"tw:flex tw:flex-wrap tw:items-center tw:gap-2 tw:text-xs tw:text-muted-foreground\"><!> <span class=\"tw:break-words\"> </span><time> </time></div> <!> <!></div> <!>", 1), fa = p("<article><!></article>"), pa = p("<section tabindex=\"-1\" data-vb-native=\"\" data-decisions-panel=\"\" class=\"tw:space-y-4 tw:p-4 tw:font-sans tw:text-sm tw:text-foreground\"><div class=\"tw:flex tw:items-center tw:gap-2\"><h2 class=\"tw:m-0 tw:text-base tw:font-semibold tw:leading-6\"> </h2> <!></div> <!></section> <!>", 1);
function ma(e, t) {
	Ee(t, !0);
	let r = () => se(c, "$view", i), [i, a] = ze(), s = d(() => ia(t.room.id)), c = s.state, l = B(() => t.room.decisions || []), u = B(() => ra(A(l))), f = W(null), p = W(!1), h = W(null), g = W(null), v = (e) => e ? ["offline", "disconnected"].includes(e) ? t.vb.t("sem conexão") : ["timeout", "unconfirmed"].includes(e) ? t.vb.t("Ainda não recebi a confirmação. Confira antes de tentar de novo.") : e : "";
	Ae(() => {
		s.sync(A(l)), A(f) && !A(l).some((e) => e.id === A(f).id) && (z(p, !1), z(f, null));
	}), re(() => s.dispose());
	var y = pa(), b = M(y), x = N(b), C = N(x), E = P(C, !0), D = w(C, 2);
	Te(D, {
		children: (e, t) => {
			H();
			var n = T();
			m(() => _(n, A(l).length)), S(e, n);
		},
		$$slots: { default: !0 }
	}), L(x);
	var O = w(x, 2);
	o(O, 17, () => A(u), (e) => e.id, (e, i) => {
		var a = fa(), o = N(a);
		je(o, {
			class: "tw:flex tw:items-start tw:gap-3 tw:p-4",
			children: (e, a) => {
				var o = da(), s = M(o), c = N(s), l = P(c, !0), u = w(c, 2), d = N(u);
				{
					let e = B(() => A(i).kind === "approval" ? "success" : "neutral");
					Te(d, {
						get variant() {
							return A(e);
						},
						children: (e, n) => {
							H();
							var r = T();
							m((e) => _(r, e), [() => A(i).kind === "approval" ? `✓ ${t.vb.t("aprovado")}` : t.vb.t("decidido")]), S(e, r);
						},
						$$slots: { default: !0 }
					});
				}
				var g = w(d, 2), y = P(g, !0), b = w(g), x = P(b, !0);
				L(u);
				var C = w(u, 2), E = (e) => {
					var n = la(), r = P(n, !0);
					m((e) => _(r, e), [() => t.vb.t("Aguardando confirmação…")]), S(e, n);
				};
				n(C, (e) => {
					r().pending[A(i).id] && e(E);
				});
				var D = w(C, 2), O = (e) => {
					var t = ua(), n = P(t, !0);
					m((e) => _(n, e), [() => v(r().issues[A(i).id])]), S(e, t);
				};
				n(D, (e) => {
					r().issues[A(i).id] && e(O);
				}), L(s);
				var k = w(s, 2);
				{
					let e = B(() => t.vb.t("Apagar registro")), n = B(() => !!r().pending[A(i).id]);
					Oe(k, {
						get "data-ddel"() {
							return A(i).id;
						},
						get label() {
							return A(e);
						},
						icon: "close",
						get disabled() {
							return A(n);
						},
						onclick: (e) => {
							z(f, A(i), !0), z(h, e.currentTarget, !0), z(p, !0);
						}
					});
				}
				m((e, t) => {
					_(l, A(i).text), _(y, A(i).who), I(b, "datetime", e), _(x, t);
				}, [() => new Date(A(i).ts).toISOString(), () => t.vb.ago(A(i).ts)]), S(e, o);
			},
			$$slots: { default: !0 }
		}), L(a), m(() => I(a, "data-decision-id", A(i).id)), S(e, a);
	}, (e) => {
		{
			let n = B(() => t.vb.t("Decisões")), r = B(() => t.vb.t("O que a sala decidir e cada aprovação aparecem aqui. Os agents registram conforme a conversa anda."));
			oe(e, {
				icon: "check",
				get title() {
					return A(n);
				},
				get description() {
					return A(r);
				}
			});
		}
	}), L(b), de(b, (e) => z(g, e), () => A(g));
	var k = w(b, 2);
	{
		let e = B(() => t.vb.t("Apagar esse registro?")), n = B(() => A(f)?.text), i = B(() => t.vb.t("Apagar registro")), a = B(() => t.vb.t("Cancelar")), o = B(() => !!(A(f) && r().pending[A(f).id])), c = B(() => A(f) ? v(r().issues[A(f).id]) : "");
		ca(k, {
			get title() {
				return A(e);
			},
			get description() {
				return A(n);
			},
			get confirmLabel() {
				return A(i);
			},
			get cancelLabel() {
				return A(a);
			},
			get busy() {
				return A(o);
			},
			get error() {
				return A(c);
			},
			onconfirm: () => {
				A(f) && s.remove(t.room.id, A(f).id, t.request);
			},
			returnFocus: () => A(h)?.isConnected ? A(h) : A(g),
			get open() {
				return A(p);
			},
			set open(e) {
				z(p, e, !0);
			}
		});
	}
	m((e) => _(E, e), [() => t.vb.t("Decisões")]), S(e, y), F(), a();
}
// svelte/Decisions.svelte
function ha(e, t) {
	Ee(t, !0);
	var n = u(), r = M(n);
	ye(r, () => t.room.id, (e) => {
		ma(e, {
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
	}), S(e, n), F();
}
var ga = /* @__PURE__ */ zr([/* @__PURE__ */ J({
	ok: /* @__PURE__ */ Y(!0),
	id: /* @__PURE__ */ Ar(),
	thread: /* @__PURE__ */ K()
}), /* @__PURE__ */ J({
	ok: /* @__PURE__ */ Y(!1),
	error: /* @__PURE__ */ K()
})]), _a = /* @__PURE__ */ J({
	ok: /* @__PURE__ */ Mr(),
	name: /* @__PURE__ */ X(/* @__PURE__ */ K()),
	error: /* @__PURE__ */ X(/* @__PURE__ */ K()),
	every: /* @__PURE__ */ X(/* @__PURE__ */ Yr(/* @__PURE__ */ K())),
	cron: /* @__PURE__ */ X(/* @__PURE__ */ Yr(/* @__PURE__ */ K())),
	timezone: /* @__PURE__ */ X(/* @__PURE__ */ K()),
	next_at: /* @__PURE__ */ X(/* @__PURE__ */ K())
}), va = /* @__PURE__ */ J({
	id: /* @__PURE__ */ K(),
	name: /* @__PURE__ */ K(),
	type: /* @__PURE__ */ K(),
	size: /* @__PURE__ */ Ar(),
	author: /* @__PURE__ */ K(),
	ts: /* @__PURE__ */ Ar(),
	embed: /* @__PURE__ */ X(/* @__PURE__ */ Mr())
}), ya = /* @__PURE__ */ Lr(va, { reminder: /* @__PURE__ */ X(_a) }), ba = /* @__PURE__ */ J({ error: /* @__PURE__ */ K() });
(/* @__PURE__ */ K()).check(/* @__PURE__ */ Er("https://"), /* @__PURE__ */ wr(1e3)), (/* @__PURE__ */ K()).check(/* @__PURE__ */ Tr(1)), (/* @__PURE__ */ K()).check(/* @__PURE__ */ Tr(1)), (/* @__PURE__ */ K()).check(/* @__PURE__ */ Tr(1)), (/* @__PURE__ */ K()).check(/* @__PURE__ */ Er("m"));
var xa = /* @__PURE__ */ J({ ok: /* @__PURE__ */ Y(!0) }), Sa = /* @__PURE__ */ J({
	ok: /* @__PURE__ */ Y(!0),
	icon: /* @__PURE__ */ Yr(/* @__PURE__ */ Ar())
}), Ca = /* @__PURE__ */ K(), wa = /* @__PURE__ */ Ar(), Ta = /* @__PURE__ */ Vr("t", [
	/* @__PURE__ */ J({
		t: /* @__PURE__ */ Y("msg"),
		thread: /* @__PURE__ */ K(),
		text: /* @__PURE__ */ X(/* @__PURE__ */ K()),
		files: /* @__PURE__ */ X(/* @__PURE__ */ q(/* @__PURE__ */ K())),
		reply_to: /* @__PURE__ */ X(/* @__PURE__ */ Yr(wa))
	}),
	/* @__PURE__ */ J({ t: /* @__PURE__ */ Y("files.get") }),
	/* @__PURE__ */ J({
		t: /* @__PURE__ */ Y("doc.get"),
		epic: /* @__PURE__ */ X(/* @__PURE__ */ Yr(/* @__PURE__ */ K()))
	}),
	/* @__PURE__ */ J({
		t: /* @__PURE__ */ Y("doc"),
		text: /* @__PURE__ */ K(),
		epic: /* @__PURE__ */ X(/* @__PURE__ */ Yr(/* @__PURE__ */ K()))
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
		id: Ca,
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
		before: /* @__PURE__ */ X(wa)
	}),
	/* @__PURE__ */ J({
		t: /* @__PURE__ */ Y("pin.add"),
		kind: /* @__PURE__ */ Gr([
			"link",
			"file",
			"app"
		]),
		ref: /* @__PURE__ */ K(),
		title: /* @__PURE__ */ X(/* @__PURE__ */ K())
	}),
	/* @__PURE__ */ J({
		t: /* @__PURE__ */ Y("pin.del"),
		id: Ca
	}),
	/* @__PURE__ */ J({
		t: /* @__PURE__ */ Y("reminder.delete"),
		id: Ca
	}),
	/* @__PURE__ */ J({
		t: /* @__PURE__ */ Y("ack.dismiss"),
		id: wa
	}),
	/* @__PURE__ */ J({
		t: /* @__PURE__ */ Y("reminder.enable"),
		id: Ca,
		on: /* @__PURE__ */ Mr()
	}),
	/* @__PURE__ */ J({
		t: /* @__PURE__ */ Y("task.toggle"),
		id: Ca
	}),
	/* @__PURE__ */ J({
		t: /* @__PURE__ */ Y("task.status"),
		id: Ca,
		status: /* @__PURE__ */ Gr(ei)
	}),
	/* @__PURE__ */ J({
		t: /* @__PURE__ */ Y("task.rename"),
		id: Ca,
		title: /* @__PURE__ */ K()
	}),
	/* @__PURE__ */ J({
		t: /* @__PURE__ */ Y("task.del"),
		id: Ca
	}),
	/* @__PURE__ */ J({
		t: /* @__PURE__ */ Y("task.assign"),
		id: Ca,
		owner: /* @__PURE__ */ X(/* @__PURE__ */ K()),
		due: /* @__PURE__ */ X(/* @__PURE__ */ K())
	}),
	/* @__PURE__ */ J({
		t: /* @__PURE__ */ Y("decision.del"),
		id: wa
	}),
	/* @__PURE__ */ J({
		t: /* @__PURE__ */ Y("epic.rename"),
		id: Ca,
		title: /* @__PURE__ */ K()
	}),
	/* @__PURE__ */ J({
		t: /* @__PURE__ */ Y("epic.del"),
		id: Ca
	}),
	/* @__PURE__ */ J({
		t: /* @__PURE__ */ Y("epic.archive"),
		id: Ca,
		archived: /* @__PURE__ */ X(/* @__PURE__ */ Mr())
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
		multi: /* @__PURE__ */ Mr()
	}),
	/* @__PURE__ */ J({
		t: /* @__PURE__ */ Y("vote"),
		id: Ca,
		opt: wa
	}),
	/* @__PURE__ */ J({
		t: /* @__PURE__ */ Y("poll.close"),
		id: Ca
	}),
	/* @__PURE__ */ J({
		t: /* @__PURE__ */ Y("suggestion"),
		i: wa,
		accept: /* @__PURE__ */ X(/* @__PURE__ */ Mr())
	})
]), Ea = (/* @__PURE__ */ K()).check(/* @__PURE__ */ Tr(1), /* @__PURE__ */ wr(64)), Da = /* @__PURE__ */ zr([/* @__PURE__ */ J({
	t: /* @__PURE__ */ Y("result"),
	cid: Ea,
	ok: /* @__PURE__ */ Y(!0)
}), /* @__PURE__ */ J({
	t: /* @__PURE__ */ Y("result"),
	cid: Ea,
	ok: /* @__PURE__ */ Y(!1),
	error: /* @__PURE__ */ K()
})]), Oa = /* @__PURE__ */ K(), ka = /* @__PURE__ */ Ar(), Aa = /* @__PURE__ */ q(Oa), $ = (e, t) => /* @__PURE__ */ J({
	t: /* @__PURE__ */ Y(e),
	...t
}), ja = $("doc", {
	text: Oa,
	epic: /* @__PURE__ */ X(/* @__PURE__ */ Yr(Oa)),
	stale: /* @__PURE__ */ X(/* @__PURE__ */ Y(!1)),
	fetched: /* @__PURE__ */ X(/* @__PURE__ */ Mr()),
	by: /* @__PURE__ */ X(Oa)
}), Ma = $("doc", {
	epic: Oa,
	stale: /* @__PURE__ */ Y(!0),
	by: /* @__PURE__ */ X(Oa),
	text: /* @__PURE__ */ X(/* @__PURE__ */ Pr()),
	fetched: /* @__PURE__ */ X(/* @__PURE__ */ Pr())
}), Na = {
	state: /* @__PURE__ */ Lr(mi, { t: /* @__PURE__ */ Y("state") }),
	msg: $("msg", { m: li }),
	moved: $("moved", {
		id: ka,
		thread: Oa
	}),
	delta: $("delta", {
		id: ka,
		text: Oa
	}),
	typing: $("typing", {
		id: ka,
		mode: Oa,
		note: /* @__PURE__ */ X(Oa)
	}),
	closed: $("closed", {
		id: ka,
		choices: Oa
	}),
	epics: $("epics", {
		epics: /* @__PURE__ */ q(si),
		roomTasks: /* @__PURE__ */ X(/* @__PURE__ */ q(oi))
	}),
	epicsPatch: $("epicsPatch", {
		changed: /* @__PURE__ */ q(si),
		order: Aa,
		roomTasks: /* @__PURE__ */ X(/* @__PURE__ */ q(oi))
	}),
	doc: /* @__PURE__ */ zr([Ma, ja]),
	docNotes: $("docNotes", { notes: Aa }),
	meta: $("meta", {
		title: /* @__PURE__ */ X(Oa),
		folder: /* @__PURE__ */ X(Oa),
		summary: /* @__PURE__ */ X(Oa)
	}),
	suggestions: $("suggestions", { suggestions: /* @__PURE__ */ q(ni) }),
	requests: $("requests", { requests: /* @__PURE__ */ q(fi) }),
	members: $("members", {
		members: Aa,
		pending: /* @__PURE__ */ X(Aa),
		requests: /* @__PURE__ */ X(/* @__PURE__ */ q(fi)),
		names: /* @__PURE__ */ X(/* @__PURE__ */ Ur(Oa, Oa)),
		avatars: /* @__PURE__ */ X(/* @__PURE__ */ Ur(Oa, ka))
	}),
	files: $("files", { files: /* @__PURE__ */ q(ci) }),
	fileAdd: $("fileAdd", { file: ci }),
	reminders: $("reminders", { reminders: /* @__PURE__ */ q(di) }),
	decisions: $("decisions", { decisions: /* @__PURE__ */ q(ri) }),
	pins: $("pins", { pins: /* @__PURE__ */ q(ii) }),
	receipts: $("receipts", { receipts: /* @__PURE__ */ q(pi) }),
	older: $("older", {
		messages: /* @__PURE__ */ q(li),
		thread: Oa,
		more: /* @__PURE__ */ Mr()
	}),
	acks: $("acks", { acks: /* @__PURE__ */ q(ui) }),
	ackRows: $("ackRows", { acks: /* @__PURE__ */ q(ui) }),
	poll: $("poll", { poll: ai }),
	online: $("online", { online: Aa }),
	conns: $("conns", {}),
	error: $("error", { error: /* @__PURE__ */ X(Oa) }),
	blocked: $("blocked", {
		text: Oa,
		reason: Oa
	}),
	result: Da
};
function Pa(e) {
	if (typeof e != "object" || !e || Array.isArray(e)) return !1;
	let t = e.t;
	return typeof t != "string" || !Object.hasOwn(Na, t) ? !1 : Na[t].safeParse(e).success;
}
// shared/validation.ts
var Fa = (e) => typeof e == "object" && !!e && !Array.isArray(e), Ia = Pa;
function La(e) {
	if (!Fa(e)) return e;
	let t = (e, t) => Fa(e) && (e[t] === 0 || e[t] === 1) ? {
		...e,
		[t]: e[t] === 1
	} : e, n = (e) => Array.isArray(e) ? e.map((e) => t(e, "done")) : e, r = (e) => Array.isArray(e) ? e.map((e) => Fa(e) ? {
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
function Ra(e) {
	let t = La(JSON.parse(e));
	if (!Ia(t)) throw TypeError("Invalid room event");
	return t;
}
function za(e) {
	return Ta.safeParse(e).success;
}
// ../vibebook/node_modules/hono/dist/client/utils.js
var Ba = (e, t) => (e = e.replace(/\/+$/, ""), e += "/", t = t.replace(/^\/+/, ""), e + t), Va = (e, t) => {
	for (let [n, r] of Object.entries(t)) {
		let t = RegExp("/:" + n + "(?:{[^/]+})?\\??(?=/|$)");
		e = e.replace(t, () => r ? `/${r}` : "");
	}
	return e;
}, Ha = (e) => {
	let t = new URLSearchParams();
	for (let [n, r] of Object.entries(e)) if (r !== void 0) {
		if (Array.isArray(r)) for (let e of r) e !== void 0 && t.append(n, e);
		else t.set(n, r);
	}
	return t;
}, Ua = (e, t) => {
	switch (t) {
		case "ws": return e.replace(/^http/, "ws");
		case "http": return e.replace(/^ws/, "http");
	}
}, Wa = (e) => /^https?:\/\/[^\/]+?\/index(?=\?|$)/.test(e) ? e.replace(/\/index(?=\?|$)/, "/") : e.replace(/\/index(?=\?|$)/, "");
function Ga(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function Ka(e, t) {
	if (!Ga(e) && !Ga(t)) return t;
	let n = { ...e };
	for (let e in t) {
		let r = t[e];
		n[e] = Ga(n[e]) && Ga(r) ? Ka(n[e], r) : r;
	}
	return n;
}
// ../vibebook/node_modules/hono/dist/utils/cookie.js
var qa = /^[\w!#$%&'*.^`|~+-]+$/, Ja = (e, t, n = {}) => {
	if (!qa.test(e)) throw Error("Invalid cookie name");
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
}, Ya = (e, t, n) => (t = encodeURIComponent(t), Ja(e, t, n)), Xa = (e, t) => new Proxy(() => {}, {
	get(n, r) {
		if (typeof r == "string" && r !== "then") return Xa(e, [...t, r]);
	},
	apply(n, r, i) {
		return e({
			path: t,
			args: i
		});
	}
}), Za = (e, t) => {
	let n = t.toString();
	return n ? `${e}?${n}` : e;
}, Qa = class {
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
			for (let [n, r] of Object.entries(e.cookie)) r !== void 0 && t.push(Ya(n, r));
			t.length > 0 && (r.Cookie = t.join("; "));
		}
		this.cType && (r["Content-Type"] = this.cType);
		let i = new Headers();
		for (let [e, t] of Object.entries(r)) t !== void 0 && i.set(e, t);
		let a = this.url;
		a = Wa(a), a = Va(a, this.pathParams), this.queryParams && (a = Za(a, this.queryParams)), n = this.method.toUpperCase();
		let o = n !== "GET" && n !== "HEAD";
		return (t?.fetch || fetch)(a, {
			body: o ? this.rBody : void 0,
			method: n,
			headers: i,
			...t?.init
		});
	};
}, $a = (e, t) => Xa(function n(r) {
	let i = t?.buildSearchParams ?? Ha, a = [...r.path], o = a.slice(-3).reverse();
	if (o[0] === "toString") return o[1] === "name" ? o[2] || "" : n.toString();
	if (o[0] === "valueOf") return o[1] === "name" ? o[2] || "" : n;
	let s = "";
	if (/^\$/.test(o[0])) {
		let e = a.pop();
		e && (s = e.replace(/^\$/, ""));
	}
	let c = Ba(e, a.join("/"));
	if (s === "url" || s === "path") {
		let t = Wa(c);
		return r.args[0] && (r.args[0].param && (t = Va(t, r.args[0].param)), r.args[0].query && (t = Za(t, i(r.args[0].query)))), s === "url" ? new URL(t) : t.slice(e.replace(/\/+$/, "").length).replace(/^\/?/, "/");
	}
	if (s === "ws") {
		let e = Wa(c), n = Ua(r.args[0]?.param ? Va(e, r.args[0].param) : e, "ws"), a = new URL(n), o = r.args[0]?.query;
		return o && i(o).forEach((e, t) => {
			a.searchParams.append(t, e);
		}), ((...e) => t?.webSocket !== void 0 && typeof t.webSocket == "function" ? t.webSocket(...e) : new WebSocket(...e))(a.toString());
	}
	let l = new Qa(c, s, { buildSearchParams: i });
	if (s) {
		t ??= {};
		let e = { ...r.args[1] }, n = t.headers, i = e.headers;
		n && i && (e.headers = async () => ({
			...typeof n == "function" ? await n() : n,
			...typeof i == "function" ? await i() : i
		}));
		let a = Ka(t, e);
		return l.fetch(r.args[0], a);
	}
	return l;
}, []), eo = (e = "/", t) => $a(e, t ? { fetch: t } : {});
// svelte/transport.ts
function to(e, t, n) {
	if (!za(t)) throw TypeError("Invalid room command");
	return !e || e.readyState !== 1 ? !1 : (e.send(JSON.stringify(n ? {
		...t,
		cid: n
	} : t)), !0);
}
function no(e) {
	if (typeof e != "string") throw TypeError("Room events must be JSON text");
	return Ra(e);
}
async function ro(e) {
	try {
		return await e.json();
	} catch (t) {
		throw e.ok ? t : Error(`HTTP ${e.status}`);
	}
}
function io(e, t) {
	let n = ba.safeParse(t);
	return Error(n.success ? n.data.error : `HTTP ${e.status}`);
}
function ao(e, t = fetch) {
	let n = eo("/", t).api.books[":id"], r = encodeURIComponent(e);
	return {
		async postMessage(e) {
			let t = await n.post.$post({
				param: { id: r },
				json: e
			}), i = await ro(t);
			if (t.ok || t.status === 400) {
				let e = ga.safeParse(i);
				if (e.success) return e.data;
				if (t.ok) throw TypeError("Invalid post response");
			}
			throw io(t, i);
		},
		async uploadFile(e) {
			let t = await n.files.$post({
				param: { id: r },
				header: {
					"content-type": e.type,
					"x-filename": encodeURIComponent(e.name)
				}
			}, { init: { body: e.body } }), i = await ro(t);
			if (!t.ok) throw io(t, i);
			let a = ya.safeParse(i);
			if (!a.success) throw TypeError(va.safeParse(i).success ? "Invalid reminder response" : "Invalid upload response");
			return a.data;
		},
		async setIcon(e) {
			let t = await n.icon.$post({
				param: { id: r },
				header: { "content-type": e ? e.type : "application/json" }
			}, { init: { body: e ? e.body : "{}" } }), i = await ro(t);
			if (!t.ok) throw io(t, i);
			let a = Sa.safeParse(i);
			if (!a.success) throw TypeError("Invalid icon response");
			return a.data;
		}
	};
}
// svelte/features/reminders/session.ts
var oo = {
	schedule: (e, t) => setTimeout(e, t),
	cancel: (e) => clearTimeout(e)
}, so = 1e4, co = (e) => e.trim().replace(/\.md$/i, "").replace(/[\\/]/g, "-"), lo = /* @__PURE__ */ new Set();
function uo(e, t = oo) {
	let n = Ce({
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
				for (let [e, t] of Object.entries(ke(n).pending)) t.acknowledged && u(e, t) && d(e);
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
			let i = ke(n);
			if (!r || !i.draft || o) return;
			let s = { ...i.draft }, c = a, l = co(s.name);
			if (!l || !s.text.trim()) return;
			let u = JSON.stringify([e, l]);
			if (lo.has(u)) {
				n.update((e) => ({
					...e,
					issue: {
						kind: "upload",
						detail: "upload-in-progress"
					}
				}));
				return;
			}
			lo.add(u), o = !0, n.update((e) => ({
				...e,
				saving: !0,
				issue: null
			}));
			let d = () => r && c === a && !!ke(n).draft;
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
					let t = co(e.draft.name) === l, n = t ? {
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
				lo.delete(u), o = !1, r && n.update((e) => ({
					...e,
					saving: !1
				}));
			}
		},
		async mutate(e, a, o, s) {
			if (!r || ke(n).pending[e]) return !1;
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
			return !r || ke(n).pending[e]?.sequence !== l ? !1 : p.ok ? (f.acknowledged = !0, u(e, f) ? d(e) : (n.update((t) => ({
				...t,
				pending: {
					...t.pending,
					[e]: { ...f }
				}
			})), c.set(e, t.schedule(() => {
				r && ke(n).pending[e]?.sequence === l && d(e, {
					kind: "unconfirmed",
					detail: "unconfirmed"
				});
			}, so))), !0) : (d(e, {
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
var fo = p("<!> ", 1), po = p("<p id=\"remErr\" role=\"alert\" class=\"tw:m-0 tw:whitespace-pre-wrap tw:text-sm tw:text-destructive\"> </p>"), mo = p("<form id=\"remForm\" class=\"tw:space-y-4\"><div class=\"tw:space-y-2\"><!><!></div> <div class=\"tw:space-y-2\"><!><!></div> <!> <div class=\"tw:flex tw:flex-wrap tw:justify-end tw:gap-2\"><!><!></div></form>"), ho = p("<p role=\"status\" class=\"tw:m-0 tw:flex tw:items-start tw:gap-2 tw:whitespace-pre-wrap tw:text-sm tw:text-destructive\"><!> </p>"), go = p("<p role=\"status\" class=\"tw:m-0 tw:text-xs tw:text-muted-foreground\"> </p>"), _o = p("<p role=\"alert\" class=\"tw:m-0 tw:whitespace-pre-wrap tw:text-sm tw:text-destructive\"> </p>"), vo = p("<div class=\"tw:flex tw:items-start tw:gap-2\"><button type=\"button\" class=\"tw:flex tw:min-w-0 tw:flex-1 tw:items-start tw:gap-2 tw:rounded-control tw:border-0 tw:bg-transparent tw:p-1 tw:text-left tw:font-sans tw:text-sm tw:text-foreground tw:outline-none tw:hover:bg-accent tw:focus-visible:ring-2 tw:focus-visible:ring-ring\"><!> <span class=\"tw:min-w-0 tw:space-y-1\"><span class=\"tw:block tw:break-words tw:font-medium\"> </span><span class=\"tw:block tw:text-xs tw:leading-5 tw:text-muted-foreground\"><!> </span></span></button></div> <!> <pre class=\"tw:m-0 tw:whitespace-pre-wrap tw:break-words tw:rounded-control tw:bg-muted tw:p-3 tw:font-mono tw:text-xs tw:leading-5\"> </pre> <div class=\"tw:flex tw:flex-wrap tw:items-center tw:justify-between tw:gap-2\"><!> <div class=\"tw:flex tw:flex-wrap tw:gap-2\"><!><!></div></div> <!> <!>", 1), yo = p("<p class=\"tw:m-0 tw:rounded-surface tw:border tw:border-dashed tw:border-border tw:p-6 tw:text-sm tw:leading-6 tw:text-muted-foreground\"> </p>"), bo = p("<section tabindex=\"-1\" data-vb-native=\"\" data-reminders-panel=\"\" class=\"tw:space-y-4 tw:p-4 tw:font-sans tw:text-sm tw:text-foreground\"><div class=\"tw:flex tw:flex-wrap tw:items-start tw:justify-between tw:gap-3\"><div class=\"tw:min-w-0 tw:flex-1 tw:space-y-1\"><h2 class=\"tw:m-0 tw:text-base tw:font-semibold tw:leading-6\"> </h2> <p class=\"tw:m-0 tw:max-w-prose tw:text-sm tw:leading-5 tw:text-muted-foreground\"> </p></div> <!></div> <!> <div class=\"tw:space-y-3\"></div></section> <!>", 1);
function xo(t, i) {
	let a = h();
	Ee(i, !0);
	let s = () => se(p, "$view", c), [c, l] = ze(), f = d(() => uo(i.room.id)), p = f.state, g = W(e([])), v = W(null), y = W(!1), b = W(null), x = W(null), C = W(null), E = W(null), D = B(() => i.room.reminders || []), O = B(() => i.vb.locale || "pt-BR"), k = (e) => new Date(e).toLocaleString(A(O), {
		weekday: "short",
		day: "numeric",
		month: "short",
		hour: "2-digit",
		minute: "2-digit"
	}), j = (e) => e ? e.detail === "upload-in-progress" ? i.vb.t("Um envio deste lembrete ainda está em andamento. Aguarde antes de salvar novamente.") : e.detail === "reminder-processing-unconfirmed" ? i.vb.t("Não recebi a confirmação do agendamento. Confira antes de tentar de novo.") : ["offline", "disconnected"].includes(e.detail) ? i.vb.t("sem conexão") : e.kind === "unconfirmed" || e.detail === "timeout" ? i.vb.t("Ainda não recebi a confirmação. Confira antes de tentar de novo.") : e.detail : "";
	Ae(() => {
		f.sync(A(D));
	}), re(() => f.dispose());
	function te(e) {
		f.open(e), queueMicrotask(() => A(E)?.focus());
	}
	function ie() {
		f.cancel(), queueMicrotask(() => A(C)?.focus());
	}
	function ae(e) {
		z(g, A(g).includes(e) ? A(g).filter((t) => t !== e) : [...A(g), e], !0);
	}
	async function R() {
		let e = A(v);
		e && await f.mutate(e.id, "delete", i.request) && A(v)?.id === e.id && z(y, !1);
	}
	var oe = bo(), ce = M(oe), le = N(ce), ue = N(le), fe = N(ue), pe = P(fe, !0), me = w(fe, 2), he = P(me, !0);
	L(ue);
	var ge = w(ue, 2), _e = (e) => {
		V(e, {
			id: "remNew",
			onclick: () => te({
				name: "",
				text: ""
			}),
			get ref() {
				return A(C);
			},
			set ref(e) {
				z(C, e, !0);
			},
			children: (e, t) => {
				var n = fo(), r = M(n);
				Ke(r, { name: "plus" });
				var a = w(r, 1, !0);
				m((e) => _(a, e), [() => i.vb.t("Novo lembrete")]), S(e, n);
			},
			$$slots: { default: !0 }
		});
	};
	n(ge, (e) => {
		s().draft || e(_e);
	}), L(le);
	var ve = w(le, 2), ye = (e) => {
		je(e, {
			children: (e, t) => {
				var r = mo(), o = N(r), c = N(o);
				{
					let e = B(() => `${a}-name`);
					ne(c, {
						get for() {
							return A(e);
						},
						children: (e, t) => {
							H();
							var n = T();
							m((e) => _(n, e), [() => i.vb.t("Nome")]), S(e, n);
						},
						$$slots: { default: !0 }
					});
				}
				var l = w(c);
				{
					let e = B(() => `${a}-name`), t = B(() => i.vb.t("nome, ex.: relatorio-diario"));
					be(l, {
						get id() {
							return A(e);
						},
						name: "name",
						maxlength: 60,
						required: !0,
						get readonly() {
							return s().draft.fixed;
						},
						get value() {
							return s().draft.name;
						},
						oninput: (e) => f.edit({ name: e.currentTarget.value }),
						get placeholder() {
							return A(t);
						}
					});
				}
				L(o);
				var u = w(o, 2), d = N(u);
				{
					let e = B(() => `${a}-text`);
					ne(d, {
						get for() {
							return A(e);
						},
						children: (e, t) => {
							H();
							var n = T();
							m((e) => _(n, e), [() => i.vb.t("Texto do lembrete")]), S(e, n);
						},
						$$slots: { default: !0 }
					});
				}
				var p = w(d);
				{
					let e = B(() => `${a}-text`), t = B(() => i.vb.t("Diga quando e o quê. Ex.: Todo dia às 8h: puxe os números de ontem e poste aqui o que mudou."));
					Fe(p, {
						get id() {
							return A(e);
						},
						name: "text",
						required: !0,
						get value() {
							return s().draft.text;
						},
						oninput: (e) => f.edit({ text: e.currentTarget.value }),
						get placeholder() {
							return A(t);
						},
						get ref() {
							return A(E);
						},
						set ref(e) {
							z(E, e, !0);
						}
					});
				}
				L(u);
				var h = w(u, 2), g = (e) => {
					var t = po(), n = P(t, !0);
					m((e) => _(n, e), [() => j(s().issue)]), S(e, t);
				};
				n(h, (e) => {
					s().issue && e(g);
				});
				var v = w(h, 2), y = N(v);
				V(y, {
					id: "remCancel",
					variant: "outline",
					onclick: ie,
					children: (e, t) => {
						H();
						var n = T();
						m((e) => _(n, e), [() => i.vb.t("Cancelar")]), S(e, n);
					},
					$$slots: { default: !0 }
				});
				var b = w(y);
				V(b, {
					id: "remSave",
					type: "submit",
					get loading() {
						return s().saving;
					},
					children: (e, t) => {
						H();
						var n = T();
						m((e) => _(n, e), [() => i.vb.t("Salvar")]), S(e, n);
					},
					$$slots: { default: !0 }
				}), L(v), L(r), ee("submit", r, (e) => {
					e.preventDefault(), f.save(ao(i.room.id).uploadFile);
				}), S(e, r);
			},
			$$slots: { default: !0 }
		});
	};
	n(ve, (e) => {
		s().draft && e(ye);
	});
	var xe = w(ve, 2);
	o(xe, 21, () => A(D), (e) => e.id, (e, t) => {
		let o = B(() => s().pending[A(t).id]), c = B(() => s().rowIssues[A(t).id]);
		je(e, {
			class: "tw:space-y-3 tw:p-4",
			children: (e, s) => {
				var l = vo(), u = M(l), d = N(u), p = N(d);
				{
					let e = B(() => A(g).includes(A(t).id) ? "chevronDown" : "chevronRight");
					Ke(p, {
						get name() {
							return A(e);
						},
						class: "tw:mt-0.5"
					});
				}
				var h = w(p, 2), b = N(h), C = P(b, !0), E = w(b), D = N(E), O = (e) => {
					var n = T();
					m((e) => _(n, `${(A(t).every || A(t).cron || "") ?? ""}${e ?? ""} ·`), [() => A(t).enabled && A(t).next_at ? ` · ${i.vb.t("próximo {when}", { when: k(A(t).next_at) })}` : ""]), S(e, n);
				};
				n(D, (e) => {
					A(t).error || e(O);
				});
				var ee = w(D, 1, !0);
				L(E), L(h), L(d), L(u);
				var F = w(u, 2), re = (e) => {
					var n = ho(), r = N(n);
					Ke(r, { name: "warning" });
					var i = w(r, 1, !0);
					L(n), m(() => _(i, A(t).error)), S(e, n);
				};
				n(F, (e) => {
					A(t).error && e(re);
				});
				var ie = w(F, 2), R = P(ie, !0), oe = w(ie, 2), se = N(oe);
				ne(se, {
					class: "tw:flex tw:items-center tw:gap-2",
					children: (e, n) => {
						var r = fo(), a = M(r);
						{
							let e = B(() => !!A(t).error || !!A(o));
							we(a, {
								controlled: !0,
								get "data-rem-on"() {
									return A(t).id;
								},
								get checked() {
									return A(t).enabled;
								},
								get disabled() {
									return A(e);
								},
								onCheckedChange: (e) => {
									f.mutate(A(t).id, "enable", i.request, e);
								}
							});
						}
						var s = w(a, 1, !0);
						m((e) => _(s, e), [() => i.vb.t("Ligado")]), S(e, r);
					},
					$$slots: { default: !0 }
				});
				var ce = w(se, 2), le = N(ce), ue = (e) => {
					V(e, {
						variant: "ghost",
						size: "sm",
						get "data-rem-edit"() {
							return A(t).id;
						},
						onclick: () => te({
							name: A(t).name,
							text: A(t).text,
							fixed: !0
						}),
						children: (e, t) => {
							H();
							var n = T();
							m((e) => _(n, e), [() => i.vb.t("Editar")]), S(e, n);
						},
						$$slots: { default: !0 }
					});
				};
				n(le, (e) => {
					A(t).name && e(ue);
				});
				var de = w(le);
				{
					let e = B(() => !!A(o));
					V(de, {
						variant: "ghost",
						size: "sm",
						get "data-rem-del"() {
							return A(t).id;
						},
						get disabled() {
							return A(e);
						},
						onclick: (e) => {
							z(v, A(t), !0), z(x, e.currentTarget, !0), z(y, !0);
						},
						children: (e, t) => {
							H();
							var n = T();
							m((e) => _(n, e), [() => i.vb.t("Apagar lembrete")]), S(e, n);
						},
						$$slots: { default: !0 }
					});
				}
				L(ce), L(oe);
				var fe = w(oe, 2), pe = (e) => {
					var t = go(), n = P(t, !0);
					m((e) => _(n, e), [() => i.vb.t("Aguardando confirmação…")]), S(e, t);
				};
				n(fe, (e) => {
					A(o) && e(pe);
				});
				var me = w(fe, 2), he = (e) => {
					var t = _o(), n = P(t, !0);
					m((e) => _(n, e), [() => j(A(c))]), S(e, t);
				};
				n(me, (e) => {
					A(c) && e(he);
				}), m((e, n, r) => {
					I(d, "data-rem-open", A(t).id), I(d, "aria-expanded", e), I(d, "aria-controls", `${a}-content-${A(t).id}`), _(C, A(t).name ? `${A(t).name}.md` : A(t).text), _(ee, n), I(ie, "hidden", r), I(ie, "id", `${a}-content-${A(t).id}`), _(R, A(t).text);
				}, [
					() => A(g).includes(A(t).id),
					() => i.vb.t("de {who}", { who: i.vb.name(A(t).owner) }),
					() => !A(g).includes(A(t).id)
				]), r("click", d, () => ae(A(t).id)), S(e, l);
			},
			$$slots: { default: !0 }
		});
	}, (e) => {
		var t = u(), r = M(t), a = (e) => {
			var t = yo(), n = P(t, !0);
			m((e) => _(n, e), [() => i.vb.t("Nenhum lembrete ainda. Clique em Novo lembrete, ou peça pro seu agent: “todo dia às 8h, me manda o resumo do que mudou”.")]), S(e, t);
		};
		n(r, (e) => {
			s().draft || e(a);
		}), S(e, t);
	}), L(xe), L(ce), de(ce, (e) => z(b, e), () => A(b));
	var Se = w(ce, 2);
	{
		let e = B(() => i.vb.t("Apagar este lembrete?")), t = B(() => A(v)?.name ? `${A(v).name}.md` : A(v)?.text), n = B(() => i.vb.t("Apagar lembrete")), r = B(() => i.vb.t("Cancelar")), a = B(() => !!(A(v) && s().pending[A(v).id])), o = B(() => A(v) ? j(s().rowIssues[A(v).id]) : "");
		ca(Se, {
			get title() {
				return A(e);
			},
			get description() {
				return A(t);
			},
			get confirmLabel() {
				return A(n);
			},
			get cancelLabel() {
				return A(r);
			},
			get busy() {
				return A(a);
			},
			get error() {
				return A(o);
			},
			onconfirm: () => {
				R();
			},
			returnFocus: () => A(x)?.isConnected ? A(x) : A(C) || A(b),
			get open() {
				return A(y);
			},
			set open(e) {
				z(y, e, !0);
			}
		});
	}
	m((e, t) => {
		_(pe, e), _(he, t);
	}, [() => i.vb.t("Lembretes"), () => i.vb.t("Quando o lembrete roda, o @vibe publica o texto aqui para seu agent.")]), S(t, oe), F(), l();
}
qe(["click"]);
// svelte/Reminders.svelte
function So(e, t) {
	Ee(t, !0);
	var n = u(), r = M(n);
	ye(r, () => t.room.id, (e) => {
		xo(e, {
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
	}), S(e, n), F();
}
// svelte/features/people/model.ts
var Co = (e) => e.trim().toLowerCase();
function wo(e, t) {
	return e.members.includes(t) && t !== e.book.owner && (!!e.pending?.includes(t) || e.me === e.book.owner);
}
function To(e, t, n) {
	return e.members.includes(e.me) ? t === "remove" ? !!wo(e, n) : t === "resend" ? !!e.pending?.includes(n) : t === "approve" || t === "deny" ? !!e.requests?.some((e) => e.email === n) : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(n) && !e.members.includes(n) : !1;
}
function Eo(e, t) {
	let n = e.members.filter((t) => t === e.me || e.online.includes(t));
	return {
		online: n,
		offline: e.members.filter((e) => !n.includes(e)),
		friends: t.filter((t) => !e.members.includes(t))
	};
}
function Do(e, t, n, r) {
	let i = `${n}/b/${e.id}`;
	return `${r("Te convidei pro vibebook \"{title}\": {url}", {
		title: e.book.title,
		url: i
	})}\n\n${r("1. Entra com {email} (o convite chegou nesse email).", { email: t })}\n${r("2. Manda isto pro seu Claude Code:")}\n\nRead ${n}/llms.txt and set up vibebook for this project. Room: ${i}`;
}
// svelte/features/people/api.ts
function Oo(e, t) {
	let n = eo("/", t).api.books[":id"], r = encodeURIComponent(e);
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
			let e = ba.safeParse(a);
			throw Error(e.success ? e.data.error : `HTTP ${i.status}`);
		}
		if (!xa.safeParse(a).success) throw Error("Invalid people response");
	};
}
// svelte/features/people/session.ts
var ko = {
	schedule: (e, t) => setTimeout(e, t),
	cancel: (e) => clearTimeout(e)
}, Ao = 2e4, jo = 1e4;
function Mo(e, t = ko) {
	let n = Ce({
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
			let u = Co(a);
			if (!r || !i || o.has(u)) return !1;
			if (!To(i, e, u)) return e === "invite" && n.update((e) => ({
				...e,
				issues: {
					...e.issues,
					[u]: i.members.includes(u) ? "already-member" : "invalid-email"
				}
			})), !1;
			let d = Symbol(), f = ke(n).draft;
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
			}, Ao);
			try {
				await l(e, u);
			} catch (e) {
				return p() && s(u, e instanceof Error ? e.message : "failed"), !1;
			}
			if (!p()) return !1;
			let m = o.get(u);
			return m.timer !== void 0 && t.cancel(m.timer), m.ack = !0, n.update((t) => ({
				...t,
				draft: e === "invite" && Co(f) === u && t.draft === f ? "" : t.draft,
				notices: {
					...t.notices,
					[u]: e
				}
			})), c(u, e) ? s(u) : m.timer = t.schedule(() => {
				p() && s(u, "unconfirmed");
			}, jo), !0;
		},
		dispose() {
			r = !1, a++;
			for (let e of o.values()) e.timer !== void 0 && t.cancel(e.timer);
			o.clear(), i = null;
		}
	};
}
// svelte/features/people/PeoplePanel.svelte
var No = p("<!> <div class=\"tw:flex tw:flex-wrap tw:gap-1\"><!> <!></div>", 1), Po = p("<div class=\"tw:space-y-2\"><div class=\"tw:flex tw:items-start tw:gap-2\"><!> <div class=\"tw:min-w-0 tw:flex-1 tw:space-y-1\"><p class=\"tw:m-0 tw:break-words tw:text-sm tw:font-medium\"> </p> <p class=\"tw:m-0 tw:break-all tw:text-xs tw:text-muted-foreground\"> </p> <!></div> <!></div> <!></div>"), Fo = p("<div class=\"tw:flex tw:items-start tw:gap-2\"><!> <div class=\"tw:min-w-0 tw:flex-1 tw:space-y-1\"><p class=\"tw:m-0 tw:break-words tw:font-medium\"> </p> <p class=\"tw:m-0 tw:break-all tw:text-xs tw:text-muted-foreground\"> </p> <!></div> <!></div>"), Io = p("<div class=\"tw:space-y-3\"><h3 class=\"tw:m-0 tw:text-sm tw:font-semibold\"> </h3> <!></div>"), Lo = p("<details class=\"tw:space-y-3\"><summary class=\"tw:cursor-pointer tw:rounded-control tw:p-1 tw:text-xs tw:text-muted-foreground tw:focus-visible:outline-2 tw:focus-visible:outline-ring\"> </summary> <div class=\"tw:space-y-3\"></div></details>"), Ro = p("<!><span class=\"tw:min-w-0 tw:break-all\"> </span><span aria-hidden=\"true\">+</span>", 1), zo = p("<details class=\"tw:space-y-2\"><summary class=\"tw:cursor-pointer tw:rounded-control tw:p-1 tw:text-xs tw:text-muted-foreground tw:focus-visible:outline-2 tw:focus-visible:outline-ring\"> </summary> <!></details>"), Bo = p("<option></option>"), Vo = p("<p role=\"status\" class=\"tw:m-0 tw:break-words tw:text-xs tw:text-muted-foreground\"> </p>"), Ho = p("<p role=\"alert\" class=\"tw:m-0 tw:whitespace-pre-wrap tw:break-words tw:text-xs tw:text-destructive\"> </p>"), Uo = p("<p class=\"tw:m-0 tw:break-words tw:text-xs tw:text-muted-foreground\"> </p>"), Wo = p("<section tabindex=\"-1\" data-vb-native=\"\" data-people-panel=\"\" class=\"tw:space-y-4 tw:border-t tw:border-border tw:p-3 tw:font-sans tw:text-sm tw:text-foreground\"><!> <h3 class=\"tw:m-0 tw:text-sm tw:font-semibold\"> </h3> <!> <div class=\"tw:space-y-3\"></div> <!> <!> <form id=\"invite\" class=\"tw:space-y-2\"><!> <div class=\"tw:flex tw:items-center tw:gap-2\"><!><!></div> <datalist></datalist></form> <!> <!> <!> <!></section> <!>", 1);
function Go(t, i) {
	let a = h();
	Ee(i, !0);
	let s = () => se(x, "$view", c), [c, l] = ze(), f = (e, t = xe) => {
		var r = Po(), a = N(r), o = N(a);
		{
			let e = B(() => i.vb.name(t())), n = B(() => R(t()));
			Ne(o, {
				get name() {
					return A(e);
				},
				get src() {
					return A(n);
				}
			});
		}
		var c = w(o, 2), l = N(c), u = P(l, !0), d = w(l, 2), f = P(d, !0), p = w(d, 2), h = (e) => {
			var n = No(), r = M(n);
			Te(r, {
				children: (e, t) => {
					H();
					var n = T();
					m((e) => _(n, e), [() => i.vb.t("pendente")]), S(e, n);
				},
				$$slots: { default: !0 }
			});
			var a = w(r, 2), o = N(a);
			{
				let e = B(() => i.vb.t("Copiar a mensagem de convite (link da sala + setup do agent) para mandar no WhatsApp"));
				V(o, {
					size: "sm",
					variant: "ghost",
					get "data-copyinv"() {
						return t();
					},
					get title() {
						return A(e);
					},
					onclick: () => oe(t()),
					children: (e, t) => {
						H();
						var n = T();
						m((e) => _(n, e), [() => i.vb.t("copiar")]), S(e, n);
					},
					$$slots: { default: !0 }
				});
			}
			var c = w(o, 2);
			{
				let e = B(() => !!s().pending[t()]);
				V(c, {
					size: "sm",
					variant: "ghost",
					get "data-resend"() {
						return t();
					},
					get disabled() {
						return A(e);
					},
					onclick: () => {
						v.mutate("resend", t(), i.request || y);
					},
					children: (e, t) => {
						H();
						var n = T();
						m((e) => _(n, e), [() => i.vb.t("reenviar")]), S(e, n);
					},
					$$slots: { default: !0 }
				});
			}
			L(a), S(e, n);
		}, g = B(() => i.room.pending?.includes(t())), b = (e) => {
			{
				let n = B(() => i.room.online.includes(t()) || t() === i.room.me ? "success" : "neutral");
				Te(e, {
					get variant() {
						return A(n);
					},
					children: (e, n) => {
						H();
						var r = T();
						m((e) => _(r, e), [() => i.room.online.includes(t()) || t() === i.room.me ? i.vb.t("online") : i.vb.t("offline")]), S(e, r);
					},
					$$slots: { default: !0 }
				});
			}
		};
		n(p, (e) => {
			A(g) ? e(h) : e(b, -1);
		}), L(c);
		var x = w(c, 2), C = (e) => {
			{
				let n = B(() => i.room.pending?.includes(t()) ? i.vb.t("Cancelar convite") : i.vb.t("Remover {email}", { email: t() })), r = B(() => !!s().pending[t()]);
				Oe(e, {
					icon: "close",
					get "data-remove"() {
						return t();
					},
					get label() {
						return A(n);
					},
					get disabled() {
						return A(r);
					},
					onclick: (e) => le(t(), "remove", e.currentTarget)
				});
			}
		}, E = B(() => wo(i.room, t()));
		n(x, (e) => {
			A(E) && e(C);
		}), L(a);
		var D = w(a, 2);
		k(D, () => i.agents ?? xe, t), L(r), m((e) => {
			I(a, "data-person", t()), I(l, "title", t()), _(u, e), _(f, t());
		}, [() => i.room.names?.[t()] || i.vb.name(t())]), S(e, r);
	}, p = U(i, "friends", 19, () => []), g = U(i, "foldOpen", 19, () => ({
		off: !1,
		friends: null
	})), v = d(() => Mo(i.room.id)), y = d(() => Oo(i.room.id)), x = v.state, C = B(() => Eo(i.room, p())), E = W(!1), D = W(null), O = W(null), j = W(null), te = W(e(d(() => g().off))), ie = W(e(d(() => g().friends ?? i.room.members.length <= 1))), ae = (e) => e === "invalid-email" ? i.vb.t("Email inválido.") : e === "already-member" ? i.vb.t("Esta pessoa já está na sala.") : e === "unconfirmed" ? i.vb.t("Ainda não recebi a confirmação. Confira antes de tentar de novo.") : e, R = (e) => i.vb.avatarUrl?.(e) || (i.room.avatars?.[e] ? `/api/avatar/${encodeURIComponent(e)}?v=${i.room.avatars[e]}` : void 0);
	Ae(() => {
		v.sync(i.room), A(D) && (A(D).action === "remove" ? !wo(i.room, A(D).email) : !i.room.requests?.some((e) => e.email === A(D).email)) && (z(E, !1), z(D, null));
	}), re(() => v.dispose());
	function oe(e) {
		let t = Do(i.room, e, location.origin, i.vb.t);
		v.copy(e, () => navigator.clipboard?.writeText(t) ?? Promise.reject(/* @__PURE__ */ Error("clipboard unavailable")));
	}
	function ce(e) {
		let t = Co(e);
		if (s().pending[t]) return;
		let n = i.room.pending?.includes(t) ? "resend" : "invite";
		To(i.room, n, t) && oe(t), v.mutate(n, t, i.request || y);
	}
	function le(e, t, n) {
		z(D, {
			email: e,
			action: t
		}, !0), z(O, n, !0), z(E, !0);
	}
	async function ue() {
		let e = A(D);
		e && await v.mutate(e.action, e.email, i.request || y) && A(D) === e && !s().pending[e.email] && z(E, !1);
	}
	var fe = Wo(), me = M(fe), he = N(me), ge = (e) => {
		var t = Io(), n = N(t), r = P(n, !0), a = w(n, 2);
		o(a, 17, () => i.room.requests, (e) => e.email, (e, t) => {
			var n = Fo(), r = N(n);
			{
				let e = B(() => A(t).name || A(t).email), n = B(() => R(A(t).email));
				Ne(r, {
					get name() {
						return A(e);
					},
					get src() {
						return A(n);
					}
				});
			}
			var a = w(r, 2), o = N(a), c = P(o, !0), l = w(o, 2), u = P(l), d = w(l, 2);
			{
				let e = B(() => !!s().pending[A(t).email]);
				V(d, {
					size: "sm",
					variant: "outline",
					get "data-ask"() {
						return A(t).email;
					},
					"data-ok": "1",
					get disabled() {
						return A(e);
					},
					onclick: () => {
						v.mutate("approve", A(t).email, i.request || y);
					},
					children: (e, t) => {
						H();
						var n = T();
						m((e) => _(n, e), [() => i.vb.t("liberar")]), S(e, n);
					},
					$$slots: { default: !0 }
				});
			}
			L(a);
			var f = w(a, 2);
			{
				let e = B(() => i.vb.t("Recusar {email}", { email: A(t).email })), n = B(() => !!s().pending[A(t).email]);
				Oe(f, {
					icon: "close",
					get "data-ask"() {
						return A(t).email;
					},
					"data-ok": "",
					get label() {
						return A(e);
					},
					get disabled() {
						return A(n);
					},
					onclick: (e) => le(A(t).email, "deny", e.currentTarget)
				});
			}
			L(n), m((e) => {
				I(n, "data-access-request", A(t).email), _(c, A(t).name || A(t).email), _(u, `${A(t).email ?? ""} · ${e ?? ""}`);
			}, [() => i.vb.t("pediu {ago}", { ago: i.vb.ago(A(t).ts) })]), S(e, n);
		}), L(t), m((e) => _(r, e), [() => i.vb.t("Pedindo pra entrar")]), S(e, t);
	};
	n(he, (e) => {
		i.room.requests?.length && e(ge);
	});
	var _e = w(he, 2), ve = P(_e, !0), ye = w(_e, 2);
	k(ye, () => i.sandboxes ?? xe);
	var Se = w(ye, 2);
	o(Se, 20, () => A(C).online, (e) => e, (e, t) => {
		f(e, () => t);
	}), L(Se);
	var Ce = w(Se, 2), we = (e) => {
		var t = Lo(), n = N(t), a = P(n, !0), s = w(n, 2);
		o(s, 20, () => A(C).offline, (e) => e, (e, t) => {
			f(e, () => t);
		}), L(s), L(t), m((e) => _(a, e), [() => i.vb.t("{n} offline", { n: A(C).offline.length })]), r("click", n, () => i.onfoldchange?.("off", !A(te))), pe("open", "toggle", t, (e) => z(te, e), () => A(te)), S(e, t);
	};
	n(Ce, (e) => {
		A(C).offline.length && e(we);
	});
	var De = w(Ce, 2), ke = (e) => {
		var t = zo(), n = N(t), a = P(n), c = w(n, 2);
		o(c, 16, () => A(C).friends, (e) => e, (e, t) => {
			{
				let n = B(() => !!s().pending[t]);
				V(e, {
					variant: "ghost",
					class: "tw:h-auto tw:w-full tw:justify-start tw:whitespace-normal tw:text-left",
					get "data-add"() {
						return t;
					},
					get disabled() {
						return A(n);
					},
					onclick: () => ce(t),
					children: (e, n) => {
						var r = Ro(), a = M(r);
						{
							let e = B(() => i.vb.name(t)), n = B(() => R(t));
							Ne(a, {
								get name() {
									return A(e);
								},
								get src() {
									return A(n);
								}
							});
						}
						var o = w(a), s = P(o, !0);
						H(), m((e) => _(s, e), [() => i.vb.name(t)]), S(e, r);
					},
					$$slots: { default: !0 }
				});
			}
		}), L(t), m((e) => _(a, `${e ?? ""} · ${A(C).friends.length ?? ""}`), [() => i.vb.t("Seus amigos")]), r("click", n, () => i.onfoldchange?.("friends", !A(ie))), pe("open", "toggle", t, (e) => z(ie, e), () => A(ie)), S(e, t);
	};
	n(De, (e) => {
		A(C).friends.length && e(ke);
	});
	var je = w(De, 2), Me = N(je);
	{
		let e = B(() => `${a}-email`);
		ne(Me, {
			get for() {
				return A(e);
			},
			children: (e, t) => {
				H();
				var n = T();
				m((e) => _(n, e), [() => i.vb.t("convidar por email")]), S(e, n);
			},
			$$slots: { default: !0 }
		});
	}
	var Pe = w(Me, 2), Fe = N(Pe);
	{
		let e = B(() => `${a}-email`), t = B(() => `${a}-friends`);
		be(Fe, {
			get id() {
				return A(e);
			},
			type: "email",
			required: !0,
			get list() {
				return A(t);
			},
			autocomplete: "off",
			get value() {
				return s().draft;
			},
			oninput: (e) => v.edit(e.currentTarget.value)
		});
	}
	var Ie = w(Fe);
	{
		let e = B(() => !!s().pending[Co(s().draft)]);
		V(Ie, {
			type: "submit",
			size: "sm",
			get disabled() {
				return A(e);
			},
			children: (e, t) => {
				H();
				var n = T();
				m((e) => _(n, e), [() => i.vb.t("Convidar")]), S(e, n);
			},
			$$slots: { default: !0 }
		});
	}
	L(Pe);
	var Le = w(Pe, 2);
	o(Le, 21, () => A(C).friends, b, (e, t) => {
		var n = Bo(), r = {};
		m(() => {
			r !== (r = A(t)) && (n.value = (n.__value = r) ?? "");
		}), S(e, n);
	}), L(Le), L(je);
	var Be = w(je, 2);
	o(Be, 1, () => Object.entries(s().pending), b, (e, t) => {
		var n = B(() => Re(A(t), 1));
		let r = () => A(n)[0];
		var a = Vo(), o = P(a);
		m((e) => _(o, `${r() ?? ""} · ${e ?? ""}`), [() => i.vb.t("Aguardando confirmação…")]), S(e, a);
	});
	var Ve = w(Be, 2);
	o(Ve, 1, () => Object.entries(s().issues), b, (e, t) => {
		var n = B(() => Re(A(t), 2));
		let r = () => A(n)[0], i = () => A(n)[1];
		var a = Ho(), o = P(a);
		m((e) => _(o, `${r() ?? ""} · ${e ?? ""}`), [() => ae(i())]), S(e, a);
	});
	var He = w(Ve, 2);
	o(He, 1, () => Object.entries(s().notices), b, (e, t) => {
		var r = B(() => Re(A(t), 2));
		let a = () => A(r)[0], o = () => A(r)[1];
		var s = u(), c = M(s), l = (e) => {
			var t = Vo(), n = P(t);
			m((e) => _(n, `${a() ?? ""} · ${e ?? ""} ✓`), [() => i.vb.t("enviado")]), S(e, t);
		};
		n(c, (e) => {
			(o() === "invite" || o() === "resend") && e(l);
		}), S(e, s);
	});
	var Ue = w(He, 2), We = (e) => {
		var t = Uo(), n = P(t, !0);
		m((e) => {
			I(t, "role", s().clipboard.status === "failed" ? "alert" : "status"), _(n, e);
		}, [() => s().clipboard.status === "failed" ? i.vb.t("Não consegui copiar. Use \"copiar\" ao lado de {email} em Pessoas.", { email: s().clipboard.email }) : i.vb.t("Copiei a mensagem com o link da sala e o setup do agent para {name}: cola no WhatsApp.", { name: i.vb.name(s().clipboard.email) })]), S(e, t);
	};
	n(Ue, (e) => {
		s().clipboard && e(We);
	}), L(me), de(me, (e) => z(j, e), () => A(j));
	var Ge = w(me, 2);
	{
		let e = B(() => A(D)?.action === "deny" ? i.vb.t("Recusar o pedido de {email}?", { email: A(D).email }) : i.room.pending?.includes(A(D)?.email || "") ? i.vb.t("Cancelar o convite de {email}?", { email: A(D)?.email || "" }) : i.vb.t("Remover {email} deste vibebook?", { email: A(D)?.email || "" })), t = B(() => A(D)?.email), n = B(() => A(D)?.action === "deny" ? i.vb.t("Recusar") : i.vb.t("Remover do vibebook")), r = B(() => i.vb.t("Cancelar")), a = B(() => !!(A(D) && s().pending[A(D).email])), o = B(() => A(D) && s().issues[A(D).email] ? ae(s().issues[A(D).email]) : "");
		ca(Ge, {
			get title() {
				return A(e);
			},
			get description() {
				return A(t);
			},
			get confirmLabel() {
				return A(n);
			},
			get cancelLabel() {
				return A(r);
			},
			get busy() {
				return A(a);
			},
			get error() {
				return A(o);
			},
			onconfirm: () => {
				ue();
			},
			returnFocus: () => A(O)?.isConnected ? A(O) : A(j),
			get open() {
				return A(E);
			},
			set open(e) {
				z(E, e, !0);
			}
		});
	}
	m((e) => {
		_(ve, e), I(Le, "id", `${a}-friends`);
	}, [() => i.vb.t("Pessoas e agents")]), ee("submit", je, (e) => {
		e.preventDefault(), ce(s().draft);
	}), S(t, fe), F(), l();
}
qe(["click"]);
// svelte/People.svelte
var Ko = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"room"
]);
function qo(e, t) {
	Ee(t, !0);
	let n = R(t, Ko);
	var r = u(), i = M(r);
	ye(i, () => t.room.id, (e) => {
		Go(e, Se({ get room() {
			return t.room;
		} }, () => n));
	}), S(e, r), F();
}
// svelte/features/navigation/model.ts
function Jo(e) {
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
function Yo(e, t) {
	let n = [], r = e.parents.get(t);
	for (; r;) n.push(r), r = e.parents.get(r);
	return n;
}
function Xo(e, t, n = /* @__PURE__ */ new Set(), r = !1) {
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
function Zo(e, t) {
	let n = /* @__PURE__ */ new Map();
	for (let e of t) n.set(e.thread, Math.max(n.get(e.thread) ?? 0, e.id));
	return e.filter((e) => e.archived).map((e, t) => ({
		epic: e,
		index: t
	})).sort((e, t) => (n.get(t.epic.id) ?? 0) - (n.get(e.epic.id) ?? 0) || t.index - e.index).map(({ epic: e }) => e);
}
function Qo(e, t, n, r) {
	if (t === n || new Set(e.map((e) => e.id)).size !== e.length) return null;
	let i = Jo(e.filter((e) => !e.archived));
	if (!i.byId.has(t) || !i.byId.has(n) || i.parents.get(t) !== i.parents.get(n)) return null;
	let a = e.map((e) => e.id).filter((e) => e !== t);
	return a.splice(a.indexOf(n) + +!!r, 0, t), a.every((t, n) => t === e[n]?.id) ? null : a;
}
// svelte/features/navigation/session.ts
function $o() {
	try {
		return localStorage;
	} catch {
		return null;
	}
}
function es(e, t) {
	try {
		let n = JSON.parse(t?.getItem(`vb.tree.${e}`) ?? "[]");
		if (Array.isArray(n) && n.every((e) => typeof e == "string")) return new Set(n);
	} catch {}
	return /* @__PURE__ */ new Set();
}
function ts(e, t) {
	try {
		e.storage?.setItem(`vb.tree.${e.roomId}`, JSON.stringify([...t]));
	} catch {}
}
function ns(e, t = !1, n = $o()) {
	return {
		roomId: e,
		storage: n,
		state: Ce({
			draft: "",
			closed: es(e, n),
			openedFor: null,
			archived: t
		})
	};
}
function rs(e, t, n) {
	let r = ke(e.state);
	if (!t.byId.has(n) && n !== "main" && !n.startsWith("pre:") || r.openedFor === n) return;
	let i = new Set(r.closed);
	for (let e of Yo(t, n)) i.delete(e);
	ts(e, i), e.state.set({
		...r,
		closed: i,
		openedFor: n
	});
}
function is(e, t) {
	e.state.update((n) => {
		let r = new Set(n.closed);
		return r.has(t) ? r.delete(t) : r.add(t), ts(e, r), {
			...n,
			closed: r
		};
	});
}
function as(e, t, n, r = !1) {
	let i = e?.roomId === t.id ? e : ns(t.id, r);
	return rs(i, Jo(t.epics), n), i;
}
// svelte/features/navigation/EpicTree.svelte
var os = p("<span aria-hidden=\"true\" class=\"tw:w-8 tw:shrink-0\"></span>"), ss = p("<span class=\"tw:sr-only\"> </span>"), cs = p("<span role=\"img\" class=\"tw:text-primary\">✻</span>"), ls = p("<span> </span>"), us = p("<span class=\"tw:shrink-0 tw:text-xs tw:text-muted-foreground\"> </span>"), ds = p("<!> <span class=\"tw:min-w-0 tw:flex-1 tw:break-words\" data-epic-title=\"\"> <!></span> <!> <!> <!> <!>", 1), fs = p("<div class=\"tw:flex tw:flex-wrap tw:gap-2\"><!><!></div>"), ps = p("<li><div role=\"group\"><!> <!></div> <details class=\"tw:ml-8 tw:text-xs tw:text-muted-foreground\"><summary class=\"tw:cursor-pointer tw:rounded-control tw:px-2 tw:py-1 tw:focus-visible:outline-2 tw:focus-visible:outline-ring\"> </summary> <div class=\"tw:space-y-2 tw:p-2\"><!> <!> <!></div></details></li>"), ms = p(" <span class=\"tw:text-xs tw:text-muted-foreground\"> </span>", 1), hs = p("<form id=\"newEpic\" class=\"tw:space-y-2\"><!> <div class=\"tw:flex tw:gap-2\"><!><!></div></form> <!>", 1), gs = p("<ul class=\"tw:m-0 tw:list-none tw:space-y-1 tw:p-0\"></ul> <!>", 1), _s = p("<p role=\"alert\" class=\"tw:m-0 tw:text-sm tw:text-destructive\"> </p>"), vs = p("<section data-vb-native=\"\" class=\"tw:m-0 tw:box-border tw:space-y-3 tw:rounded-surface tw:bg-sidebar tw:p-3 tw:font-sans tw:text-sm tw:leading-5 tw:text-sidebar-foreground\"><!> <p role=\"status\" aria-live=\"polite\" class=\"tw:sr-only\"> </p> <!></section>");
function ys(e, t) {
	let r = h();
	Ee(t, !0);
	let a = () => se(A(l), "$navigation", s), [s, c] = ze(), l = B(() => t.session.state), f = W(""), p = W(null), g = W(null), v = W(!1), y = W(null), x = !1, C = /* @__PURE__ */ new Map(), E = 0, O = W(null), k = W("");
	re(() => {
		x = !0, E++, C.clear();
	});
	let te = [
		"tw:pl-0",
		"tw:pl-2",
		"tw:pl-4",
		"tw:pl-6",
		"tw:pl-8",
		"tw:pl-10",
		"tw:pl-12"
	], ie = B(() => t.room.epics.filter((e) => !e.archived)), R = B(() => Zo(t.room.epics, t.room.messages)), oe = B(() => a().archived && A(R).length > 0 ? "archived" : "active"), ue = B(() => Jo(A(oe) === "archived" ? A(R) : A(ie))), de = B(() => Jo(t.room.epics)), fe = B(() => new Set(t.room.epics.filter((e) => t.vb.epicBusy(e)).map((e) => e.id))), pe = B(() => Xo(A(ue), a().closed, A(fe), !0)), me = B(() => new Map(A(pe).map((e, t) => [e.epic.id, `${r}-row-${t}`])));
	Ae(() => {
		rs(t.session, A(de), t.thread);
	});
	function ge(e) {
		if (x) return;
		E++, z(O, null);
		let n = e === "archived";
		A(l).update((e) => ({
			...e,
			archived: n
		})), t.onarchchange(n), z(p, null), z(g, null), z(f, "");
	}
	function _e(e) {
		if (x || t.session.roomId !== t.room.id) return !1;
		z(f, "");
		try {
			if (t.send(e)) return !0;
		} catch {}
		return z(f, t.vb.t("Não deu pra enviar agora. Tente de novo."), !0), !1;
	}
	function ve(e) {
		if (e.preventDefault(), x) return;
		let t = a().draft.trim();
		if (!t) return A(y)?.focus();
		_e({
			t: "epic",
			title: t
		}) && le(A(l), d(a).draft = "", d(a));
	}
	function ye(e) {
		let t = A(ue).parents.get(e);
		return t ? A(ue).children.get(t) ?? [] : A(ue).roots;
	}
	function Se(e, t) {
		let n = ye(e);
		return n[n.findIndex((t) => t.id === e) + t];
	}
	function Ce(e, n, r) {
		let i = Qo(t.room.epics, e, n, r);
		if (!i || x) return;
		z(O, null);
		let a = ++E, o = document.activeElement, s = o instanceof HTMLElement && C.get(e)?.contains(o) ? o : null;
		_e({
			t: "epic.order",
			ids: i
		}) && z(O, {
			ids: i,
			from: e,
			anchor: s,
			generation: a,
			thread: t.thread
		}, !0);
	}
	function we(e, t) {
		return C.set(t, e), { destroy() {
			C.get(t) === e && C.delete(t);
		} };
	}
	Ae(() => {
		let e = A(O);
		if (!e) return;
		if (e.thread !== t.thread || A(oe) !== "active") {
			z(O, null), E++;
			return;
		}
		let n = t.room.epics.map((e) => e.id);
		if (!n.includes(e.from)) {
			z(O, null), De(e);
			return;
		}
		let r = new Set(n), i = new Set(e.ids), a = e.ids.filter((e) => r.has(e)), o = n.filter((e) => i.has(e));
		o.length !== a.length || o.some((e, t) => e !== a[t]) || (z(O, null), z(k, t.vb.t("Ordem dos épicos atualizada."), !0), De(e));
	});
	function De(e) {
		let t = e.anchor;
		if (!t) return;
		let n = () => document.activeElement === document.body || document.activeElement === t;
		n() && j().then(() => {
			if (x || e.generation !== E || !n() || document.activeElement === t && !t.matches(":disabled")) return;
			let r = C.get(e.from);
			r?.hidden || (r?.querySelector("[data-epic-thread]") ?? A(y))?.focus({ preventScroll: !0 });
		});
	}
	function ke(e, t) {
		let n = Se(e, t);
		A(oe) === "active" && n && Ce(e, n.id, t === 1);
	}
	function je(e, t) {
		if (A(oe) !== "active" || !e.dataTransfer) return e.preventDefault();
		e.dataTransfer.setData("text/vb-epic", t), e.dataTransfer.effectAllowed = "move", z(p, t, !0);
	}
	function Me(e, t) {
		return A(oe) === "active" && A(p) !== t && e.dataTransfer?.types.includes("text/vb-epic");
	}
	function Pe(e, t) {
		if (!Me(e, t)) return;
		e.preventDefault();
		let n = e.currentTarget instanceof HTMLElement ? e.currentTarget.getBoundingClientRect() : null;
		z(g, t, !0), z(v, !!n && e.clientY >= n.top + n.height / 2, !0);
	}
	function U(e, t) {
		let n = A(v);
		if (z(g, null), !Me(e, t)) return;
		e.preventDefault();
		let r = e.dataTransfer?.getData("text/vb-epic");
		r && Ce(r, t, n), z(p, null);
	}
	var Fe = vs(), Ie = N(Fe);
	{
		let e = (e, s = xe) => {
			var c = u(), f = M(c), h = (e) => {
				var c = gs(), u = M(c);
				o(u, 21, () => A(pe), (e) => e.epic.id, (e, r) => {
					let o = B(() => A(r).epic), c = B(() => a().closed.has(A(o).id)), l = B(() => A(ue).byId.get(A(ue).parents.get(A(o).id) ?? "")), u = B(() => t.vb.epicBusy(A(o)));
					var d = ps(), f = N(d), h = N(f), y = (e) => {
						{
							let n = B(() => A(c) ? "chevronRight" : "chevronDown"), r = B(() => `${t.vb.t(A(c) ? "Abrir galho" : "Fechar galho")}: ${A(o).title}`), i = B(() => !A(c)), a = B(() => (A(ue).children.get(A(o).id) ?? []).map((e) => A(me).get(e.id)).join(" "));
							Oe(e, {
								get icon() {
									return A(n);
								},
								get label() {
									return A(r);
								},
								get "aria-expanded"() {
									return A(i);
								},
								get "aria-controls"() {
									return A(a);
								},
								class: "tw:size-8 tw:p-1",
								onclick: () => is(t.session, A(o).id)
							});
						}
					}, b = (e) => {
						var t = os();
						S(e, t);
					};
					n(h, (e) => {
						A(r).hasChildren ? e(y) : e(b, -1);
					});
					var x = w(h, 2);
					{
						let e = B(() => t.thread === A(o).id ? "page" : void 0);
						V(x, {
							variant: "ghost",
							class: "tw:h-auto tw:min-h-9 tw:min-w-0 tw:flex-1 tw:justify-start tw:gap-2 tw:whitespace-normal tw:px-1 tw:py-2 tw:text-left",
							get "data-epic-thread"() {
								return A(o).id;
							},
							get "aria-current"() {
								return A(e);
							},
							onclick: () => {
								t.thread === A(o).id && A(r).hasChildren ? is(t.session, A(o).id) : t.onopen(A(o).id);
							},
							children: (e, i) => {
								var a = ds(), s = M(a);
								{
									let e = B(() => A(o).owner ? t.vb.name(A(o).owner) : A(o).title), n = B(() => A(o).owner && t.room.avatars?.[A(o).owner] ? `/api/avatar/${encodeURIComponent(A(o).owner)}?v=${t.room.avatars[A(o).owner]}` : void 0);
									Ne(s, {
										get name() {
											return A(e);
										},
										get src() {
											return A(n);
										},
										class: "tw:size-6 tw:text-xs"
									});
								}
								var d = w(s, 2), f = N(d, !0), p = w(f), h = (e) => {
									var n = ss(), r = P(n);
									m((e) => _(r, `· ${e ?? ""}`), [() => t.vb.t("Subépico de {title}", { title: A(l).title })]), S(e, n);
								};
								n(p, (e) => {
									A(l) && e(h);
								}), L(d);
								var g = w(d, 2), v = (e) => {
									var n = cs();
									m((e) => I(n, "aria-label", e), [() => A(u) ? t.vb.t("{who} está trabalhando", { who: A(u) }) : t.vb.t("Trabalho em um subépico")]), S(e, n);
								};
								n(g, (e) => {
									(A(u) || A(c) && A(r).busyBelow) && e(v);
								});
								var y = w(g, 2), b = (e) => {
									Te(e, {
										variant: "warning",
										children: (e, n) => {
											H();
											var r = T();
											m((e) => _(r, e), [() => t.vb.waitCount(A(o).id)]), S(e, r);
										},
										$$slots: { default: !0 }
									});
								}, x = B(() => t.vb.waitCount(A(o).id));
								n(y, (e) => {
									A(x) && e(b);
								});
								var C = w(y, 2), E = (e) => {
									var n = ls(), r = P(n, !0);
									m((e) => {
										I(n, "title", e), _(r, A(o).prod.stage === "verified" ? "✓✓" : "🚀");
									}, [() => t.vb.t(A(o).prod.stage === "verified" ? "Verificado em prod" : "No ar, falta verificar em prod")]), S(e, n);
								};
								n(C, (e) => {
									A(o).prod && e(E);
								});
								var D = w(C, 2), O = (e) => {
									var t = us(), n = P(t);
									m((e) => _(n, `${e ?? ""}/${A(o).tasks.length ?? ""}`), [() => A(o).tasks.filter((e) => e.done).length]), S(e, t);
								};
								n(D, (e) => {
									A(o).tasks.length && e(O);
								}), m(() => _(f, A(o).title)), S(e, a);
							},
							$$slots: { default: !0 }
						});
					}
					L(f);
					var C = w(f, 2), E = N(C), O = P(E), k = w(E, 2), j = N(k);
					{
						let e = B(() => `${A(me).get(A(o).id)}-owner`);
						ne(j, {
							get for() {
								return A(e);
							},
							children: (e, n) => {
								H();
								var r = T();
								m((e) => _(r, e), [() => t.vb.t("Dono do épico")]), S(e, r);
							},
							$$slots: { default: !0 }
						});
					}
					var F = w(j, 2);
					{
						let e = B(() => `${A(me).get(A(o).id)}-owner`), n = B(() => `${t.vb.t("Dono do épico")}: ${A(o).title}`), r = B(() => A(o).owner ?? ""), i = B(() => [{
							value: "",
							label: t.vb.t("Sem dono")
						}, ...t.room.members.map((e) => ({
							value: e,
							label: t.vb.name(e)
						}))]);
						ae(F, {
							get id() {
								return A(e);
							},
							get "aria-label"() {
								return A(n);
							},
							get value() {
								return A(r);
							},
							get items() {
								return A(i);
							},
							onValueChange: (e) => (_e({
								t: "epic.owner",
								id: A(o).id,
								owner: e
							}), !1)
						});
					}
					var re = w(F, 2), ie = (e) => {
						var n = fs(), r = N(n);
						{
							let e = B(() => !Se(A(o).id, -1)), n = B(() => `${t.vb.t("Mover para cima")}: ${A(o).title}`);
							V(r, {
								variant: "outline",
								size: "sm",
								get disabled() {
									return A(e);
								},
								get "aria-label"() {
									return A(n);
								},
								onclick: () => ke(A(o).id, -1),
								children: (e, n) => {
									H();
									var r = T();
									m((e) => _(r, e), [() => t.vb.t("Mover para cima")]), S(e, r);
								},
								$$slots: { default: !0 }
							});
						}
						var i = w(r);
						{
							let e = B(() => !Se(A(o).id, 1)), n = B(() => `${t.vb.t("Mover para baixo")}: ${A(o).title}`);
							V(i, {
								variant: "outline",
								size: "sm",
								get disabled() {
									return A(e);
								},
								get "aria-label"() {
									return A(n);
								},
								onclick: () => ke(A(o).id, 1),
								children: (e, n) => {
									H();
									var r = T();
									m((e) => _(r, e), [() => t.vb.t("Mover para baixo")]), S(e, r);
								},
								$$slots: { default: !0 }
							});
						}
						L(n), S(e, n);
					};
					n(re, (e) => {
						s() === "active" && e(ie);
					}), L(k), L(C), L(d), i(d, (e, t) => we?.(e, t), () => A(o).id), m((e, t, n, i) => {
						I(d, "id", e), I(d, "hidden", A(r).hidden), I(d, "data-epic", A(o).id), I(d, "data-depth", A(r).depth), Ge(d, 1, t), I(f, "aria-label", A(o).title), I(f, "draggable", s() === "active"), Ge(f, 1, n), _(O, `${i ?? ""}: ${A(o).title ?? ""}`);
					}, [
						() => A(me).get(A(o).id),
						() => D(te[Math.min(A(r).depth, te.length - 1)]),
						() => D(he("tw:flex tw:items-center tw:gap-1 tw:rounded-control tw:border tw:border-transparent", t.thread === A(o).id && "tw:bg-sidebar-accent tw:text-sidebar-accent-foreground", A(g) === A(o).id && (A(v) ? "tw:border-b-primary" : "tw:border-t-primary"), A(p) === A(o).id && "tw:opacity-50")),
						() => t.vb.t("Ações do épico")
					]), ee("dragstart", f, (e) => je(e, A(o).id)), ee("dragend", f, () => {
						z(p, null), z(g, null);
					}), ee("dragover", f, (e) => Pe(e, A(o).id)), ee("dragleave", f, () => {
						A(g) === A(o).id && z(g, null);
					}), ee("drop", f, (e) => U(e, A(o).id)), S(e, d);
				}), L(u);
				var f = w(u, 2), h = (e) => {
					var n = hs(), i = M(n), s = N(i);
					{
						let e = B(() => `${r}-new`);
						ne(s, {
							get for() {
								return A(e);
							},
							children: (e, n) => {
								H();
								var r = T();
								m((e) => _(r, e), [() => t.vb.t("Novo épico")]), S(e, r);
							},
							$$slots: { default: !0 }
						});
					}
					var c = w(s, 2), u = N(c), f = () => x ? "" : a().draft, p = (e) => {
						x || le(A(l), d(a).draft = e, d(a));
					};
					{
						let e = B(() => `${r}-new`), n = B(() => t.vb.t("Novo épico: escreva o título…"));
						be(u, {
							get id() {
								return A(e);
							},
							get value() {
								return f();
							},
							set value(e) {
								p(e);
							},
							get placeholder() {
								return A(n);
							},
							enterkeyhint: "done",
							get ref() {
								return A(y);
							},
							set ref(e) {
								z(y, e, !0);
							}
						});
					}
					var h = w(u);
					{
						let e = B(() => t.vb.t("Criar épico"));
						Oe(h, {
							type: "submit",
							icon: "plus",
							variant: "primary",
							get label() {
								return A(e);
							}
						});
					}
					L(c), L(i);
					var g = w(i, 2);
					o(g, 17, () => t.room.suggestions, b, (e, n, r) => {
						{
							let i = B(() => t.thread === `pre:${r}` ? "page" : void 0);
							V(e, {
								variant: "outline",
								class: "tw:h-auto tw:w-full tw:justify-start tw:whitespace-normal tw:border-dashed tw:text-left",
								get "aria-current"() {
									return A(i);
								},
								onclick: () => t.onopen(`pre:${r}`),
								children: (e, r) => {
									H();
									var i = ms(), a = M(i, !0), o = w(a), s = P(o, !0);
									m((e) => {
										_(a, A(n).title), _(s, e);
									}, [() => t.vb.t("sugestão do @vibe, clique para ver")]), S(e, i);
								},
								$$slots: { default: !0 }
							});
						}
					}), ee("submit", i, ve), S(e, n);
				};
				n(f, (e) => {
					s() === "active" && e(h);
				}), m((e) => I(u, "aria-label", e), [() => s() === "archived" ? t.vb.t("Arquivados") : t.vb.t("Épicos")]), S(e, c);
			};
			n(f, (e) => {
				s() === A(oe) && e(h);
			}), S(e, c);
		}, s = B(() => [{
			value: "active",
			label: `${t.vb.t("Épicos")} · ${A(ie).length}`
		}, {
			value: "archived",
			label: `${t.vb.t("Arquivados")} · ${A(R).length}`,
			disabled: A(R).length === 0
		}]), c = B(() => t.vb.t("Épicos"));
		ce(Ie, {
			get items() {
				return A(s);
			},
			get label() {
				return A(c);
			},
			get value() {
				return A(oe);
			},
			onValueChange: ge,
			children: e,
			$$slots: { default: !0 }
		});
	}
	var Le = w(Ie, 2), Re = P(Le, !0), Be = w(Le, 2), Ve = (e) => {
		var t = _s(), n = P(t, !0);
		m(() => _(n, A(f))), S(e, t);
	};
	n(Be, (e) => {
		A(f) && e(Ve);
	}), L(Fe), m((e) => {
		I(Fe, "aria-label", e), _(Re, A(k));
	}, [() => t.vb.t("Épicos")]), S(e, Fe), F(), c();
}
// svelte/features/pins/model.ts
function bs(e) {
	let t = e.trim();
	if (!t || t.length > 2e3 || /[\u0000-\u001f\u007f]/.test(t)) return null;
	try {
		let e = new URL(/^[a-z]+:\/\//i.test(t) ? t : `https://${t}`);
		return e.protocol === "http:" || e.protocol === "https:" ? e.href : null;
	} catch {
		return null;
	}
}
function xs(e) {
	let t = /^(?:((?:[a-f0-9]{12}|room))\/)?([\w.-]{1,100})$/.exec(e);
	return t ? {
		connectionId: t[1] ?? "room",
		tool: t[2]
	} : null;
}
function Ss(e, t) {
	if (e.kind === "link") {
		let t = bs(e.ref);
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
		let n = xs(e.ref), r = n?.connectionId === "room" && t.filesAll && !t.files?.some((e) => e.name === `apps/${n.tool}.html`);
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
var Cs = () => ({
	url: "",
	title: ""
});
function ws(e) {
	return {
		roomId: e,
		active: !0,
		pins: [],
		filesRequested: !1,
		sequence: 0,
		state: Ce({
			adding: !1,
			draft: Cs(),
			pending: null,
			issue: null,
			filesPending: !1,
			fileIssue: null
		})
	};
}
function Ts(e) {
	e && (e.active = !1, e.sequence++);
}
function Es(e) {
	e.active && e.state.update((e) => ({
		...e,
		adding: !0,
		issue: null
	}));
}
function Ds(e, t) {
	e.active && e.state.update((e) => ({
		...e,
		draft: {
			...e.draft,
			...t
		},
		issue: null
	}));
}
function Os(e) {
	e.active && e.state.update((e) => ({
		...e,
		adding: !1,
		issue: null
	}));
}
function ks(e, t) {
	return e.url === t.url && e.title === t.title;
}
function As(e, t, n) {
	return n.some((n) => n.kind === "link" && n.ref === e && (!t || n.title === t));
}
function js(e, t) {
	let n = e;
	n?.active && n.roomId === t.id || (Ts(n), n = ws(t.id)), n.pins = t.pins ?? [];
	let r = ke(n.state), i = t.pins?.some((e) => e.kind === "file" && !t.files?.some((t) => t.id === e.ref));
	return (t.filesAll || !i) && (r.filesPending || r.fileIssue) && (r = {
		...r,
		filesPending: !1,
		fileIssue: null
	}, n.state.set(r)), n;
}
async function Ms(e, t, n, r, i) {
	if (!e.active || e.roomId !== t || ke(e.state).pending) return;
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
	let o = () => e.active && e.sequence === a && ke(e.state).pending?.sequence === a, s;
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
	let c = ke(e.state);
	if (s.ok) {
		let t = r.t === "pin.add" && i && ks(c.draft, i);
		e.state.set({
			...c,
			pending: null,
			issue: null,
			...t ? {
				adding: !1,
				draft: Cs()
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
async function Ns(e, t, n) {
	if (!e.active || e.roomId !== t || ke(e.state).pending) return;
	let r = ke(e.state);
	if (!r.adding) return;
	let i = bs(r.draft.url);
	if (!i) {
		e.state.update((e) => ({
			...e,
			issue: { kind: "invalid-link" }
		}));
		return;
	}
	let a = r.draft.title.trim().slice(0, 80);
	if (As(i, a, e.pins)) e.state.set({
		...r,
		adding: !1,
		draft: Cs(),
		issue: { kind: "already-pinned" }
	});
	else return Ms(e, t, n, {
		t: "pin.add",
		kind: "link",
		ref: i,
		title: a
	}, { ...r.draft });
}
async function Ps(e, t, n, r) {
	if (e.pins.some((e) => e.id === n)) return Ms(e, t, r, {
		t: "pin.del",
		id: n
	});
}
function Fs(e, t, n, r = !1) {
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
var Is = p("<form class=\"tw:space-y-3 tw:rounded-surface tw:border tw:border-border tw:bg-card tw:p-3\"><div class=\"tw:space-y-1\"><!> <!></div> <div class=\"tw:space-y-1\"><!> <!></div> <div class=\"tw:flex tw:flex-wrap tw:justify-end tw:gap-2\"><!> <!></div></form>"), Ls = p("<p role=\"status\" class=\"tw:m-0 tw:font-sans tw:text-xs tw:leading-5 tw:text-muted-foreground\"> </p>"), Rs = p("<a target=\"_blank\" rel=\"noopener noreferrer\" class=\"tw:flex tw:min-w-0 tw:flex-1 tw:items-center tw:gap-2 tw:rounded-control tw:px-2 tw:py-2 tw:font-sans tw:text-sm tw:text-foreground tw:no-underline tw:hover:bg-accent tw:focus-visible:outline-none tw:focus-visible:ring-2 tw:focus-visible:ring-ring\"><!><span class=\"tw:min-w-0\"><span class=\"tw:block tw:truncate\"> </span><span class=\"tw:block tw:truncate tw:text-xs tw:text-muted-foreground\"> </span></span></a>"), zs = p("<!><span class=\"tw:min-w-0\"><span class=\"tw:block tw:truncate\"> </span><span class=\"tw:block tw:truncate tw:text-xs tw:font-normal tw:text-muted-foreground\"> </span></span>", 1), Bs = p("<div class=\"tw:flex tw:min-w-0 tw:flex-1 tw:items-start tw:gap-2 tw:px-2 tw:py-2 tw:font-sans tw:text-sm tw:text-muted-foreground\"><!><span class=\"tw:min-w-0\"><span class=\"tw:block tw:truncate\"> </span><span class=\"tw:block tw:text-xs\"> </span></span></div>"), Vs = p("<li class=\"tw:flex tw:items-start tw:gap-1\"><!> <!></li>"), Hs = p("<ul class=\"tw:m-0 tw:list-none tw:space-y-1 tw:p-0\"></ul>"), Us = p("<!> ", 1), Ws = p("<section class=\"tw:space-y-2 tw:border-t tw:border-border tw:bg-sidebar tw:px-3 tw:py-3 tw:font-sans tw:text-sm tw:text-sidebar-foreground\" data-native-pins=\"\" data-vb-native=\"\"><div class=\"tw:flex tw:items-center tw:justify-between tw:gap-2\"><h2 class=\"tw:m-0 tw:font-sans tw:text-xs tw:font-semibold tw:uppercase tw:tracking-wide tw:text-muted-foreground\"> </h2> <!></div> <!> <!> <!> <!> <!> <!></section>");
function Gs(e, t) {
	Ee(t, !0);
	let i = () => se(A(h), "$pinState", a), [a, s] = ze(), c = !1;
	re(() => {
		c = !0;
	});
	function l() {
		return !c && t.session.active && t.session.roomId === t.room.id;
	}
	function u(e) {
		l() && Ds(t.session, e);
	}
	function d(e) {
		l() && e.key === "Escape" && (e.preventDefault(), e.stopPropagation(), te());
	}
	function f() {
		l() && Fs(t.session, t.room, t.send, !0);
	}
	function p(e) {
		l() && Ps(t.session, t.room.id, e, t.request);
	}
	let h = B(() => t.session.state), g = B(() => (t.room.pins ?? []).map((e) => ({
		pin: e,
		target: Ss(e, t.room)
	}))), v = B(() => A(g).some((e) => e.target.kind === "file-unloaded")), y = W(null), b = W(null), x = B(() => t.session.active && t.session.roomId === t.room.id), C = W(null), E = W(null), D = B(() => `pin-url-${t.room.id}`), O = (e) => t.t({
		"invalid-link": "Use um link http ou https válido.",
		offline: "Sem conexão. Seu rascunho foi mantido.",
		"send-failed": "Não deu pra enviar agora. Tente de novo.",
		unconfirmed: "Ainda não recebi confirmação. Confira os fixados antes de tentar de novo.",
		"already-pinned": "Este link já está nos fixados.",
		rejected: "Não deu pra atualizar os fixados. Tente de novo."
	}[e.kind]);
	Ae(() => {
		if (c || !A(y)) return;
		if (A(b) !== t.session || !t.session.active || t.session.roomId !== t.room.id) {
			z(y, null), z(b, null);
			return;
		}
		let e = t.room.pins?.find((e) => e.id === A(y) && e.kind === "file");
		if (!e) {
			z(y, null), z(b, null);
			return;
		}
		let n = Ss(e, t.room);
		n.kind === "file" ? (z(y, null), z(b, null), t.onopenfile(n.file)) : t.room.filesAll && (z(y, null), z(b, null));
	});
	async function k() {
		if (!l()) return;
		let e = t.session;
		Es(e), await j(), !c && t.session === e && e.active && e.roomId === t.room.id && A(C)?.isConnected && A(C).focus();
	}
	async function te() {
		if (!l()) return;
		let e = t.session;
		Os(e), await j(), !c && t.session === e && e.active && e.roomId === t.room.id && A(E)?.isConnected && A(E).focus();
	}
	function ie(e) {
		e.preventDefault(), l() && Ns(t.session, t.room.id, t.request);
	}
	function ae(e) {
		if (!l()) return;
		let n = t.room.pins?.find((t) => t.id === e);
		if (!n) return;
		let r = Ss(n, t.room);
		r.kind === "file" && t.onopenfile(r.file), r.kind === "app" && t.onopenapp(r.app), r.kind === "file-unloaded" && (z(b, t.session), z(y, e, !0), Fs(t.session, t.room, t.send, !i().filesPending));
	}
	var R = Ws(), oe = N(R), ce = N(oe), le = P(ce, !0), ue = w(ce, 2), de = (e) => {
		{
			let n = B(() => t.t("Fixar um link")), r = B(() => !A(x));
			Oe(e, {
				get label() {
					return A(n);
				},
				icon: "plus",
				get disabled() {
					return A(r);
				},
				onclick: k,
				get ref() {
					return A(E);
				},
				set ref(e) {
					z(E, e, !0);
				}
			});
		}
	};
	n(ue, (e) => {
		i().adding || e(de);
	}), L(oe);
	var fe = w(oe, 2), pe = (e) => {
		var n = Is(), r = N(n), a = N(r);
		ne(a, {
			get for() {
				return A(D);
			},
			children: (e, n) => {
				H();
				var r = T();
				m((e) => _(r, e), [() => t.t("Link pra fixar")]), S(e, r);
			},
			$$slots: { default: !0 }
		});
		var o = w(a, 2);
		{
			let e = B(() => t.t("Cole um link (site, repo, painel…)")), n = B(() => !A(x)), r = B(() => i().issue?.kind === "invalid-link" || void 0);
			be(o, {
				get id() {
					return A(D);
				},
				name: "url",
				get value() {
					return i().draft.url;
				},
				onkeydown: d,
				oninput: (e) => u({ url: e.currentTarget.value }),
				required: !0,
				maxlength: 2e3,
				autocomplete: "url",
				get placeholder() {
					return A(e);
				},
				get disabled() {
					return A(n);
				},
				get "aria-invalid"() {
					return A(r);
				},
				get ref() {
					return A(C);
				},
				set ref(e) {
					z(C, e, !0);
				}
			});
		}
		L(r);
		var s = w(r, 2), c = N(s);
		{
			let e = B(() => `${A(D)}-title`);
			ne(c, {
				get for() {
					return A(e);
				},
				children: (e, n) => {
					H();
					var r = T();
					m((e) => _(r, e), [() => t.t("Nome (opcional)")]), S(e, r);
				},
				$$slots: { default: !0 }
			});
		}
		var l = w(c, 2);
		{
			let e = B(() => `${A(D)}-title`), t = B(() => !A(x));
			be(l, {
				get id() {
					return A(e);
				},
				name: "title",
				get value() {
					return i().draft.title;
				},
				onkeydown: d,
				oninput: (e) => u({ title: e.currentTarget.value }),
				maxlength: 80,
				get disabled() {
					return A(t);
				}
			});
		}
		L(s);
		var f = w(s, 2), p = N(f);
		{
			let e = B(() => !A(x));
			V(p, {
				variant: "ghost",
				size: "sm",
				get disabled() {
					return A(e);
				},
				onclick: te,
				onkeydown: d,
				children: (e, n) => {
					H();
					var r = T();
					m((e) => _(r, e), [() => t.t("Cancelar")]), S(e, r);
				},
				$$slots: { default: !0 }
			});
		}
		var h = w(p, 2);
		{
			let e = B(() => !A(x) || !!i().pending);
			V(h, {
				type: "submit",
				size: "sm",
				get disabled() {
					return A(e);
				},
				onkeydown: d,
				children: (e, n) => {
					H();
					var r = T();
					m((e) => _(r, e), [() => t.t("Fixar")]), S(e, r);
				},
				$$slots: { default: !0 }
			});
		}
		L(f), L(n), m((e) => I(n, "aria-label", e), [() => t.t("Fixar um link")]), ee("submit", n, ie), S(e, n);
	};
	n(fe, (e) => {
		i().adding && e(pe);
	});
	var me = w(fe, 2), he = (e) => {
		var n = Ls(), r = P(n, !0);
		m((e) => _(r, e), [() => t.t("Aguardando confirmação…")]), S(e, n);
	};
	n(me, (e) => {
		i().pending && e(he);
	});
	var ge = w(me, 2), _e = (e) => {
		var t = Ls(), n = P(t, !0);
		m((e) => _(n, e), [() => O(i().issue)]), S(e, t);
	}, ve = (e) => {
		{
			let t = B(() => O(i().issue));
			Le(e, {
				compact: !0,
				get title() {
					return A(t);
				},
				get description() {
					return i().issue.detail;
				}
			});
		}
	};
	n(ge, (e) => {
		i().issue?.kind === "already-pinned" ? e(_e) : i().issue && e(ve, 1);
	});
	var ye = w(ge, 2), xe = (e) => {
		{
			let t = B(() => O({ kind: i().fileIssue }));
			Le(e, {
				compact: !0,
				get title() {
					return A(t);
				}
			});
		}
	};
	n(ye, (e) => {
		i().fileIssue && e(xe);
	});
	var Se = w(ye, 2), Ce = (e) => {
		{
			let n = B(() => !A(x));
			V(e, {
				variant: "ghost",
				size: "sm",
				get disabled() {
					return A(n);
				},
				onclick: f,
				children: (e, n) => {
					H();
					var r = T();
					m((e) => _(r, e), [() => t.t("Tentar carregar novamente")]), S(e, r);
				},
				$$slots: { default: !0 }
			});
		}
	};
	n(Se, (e) => {
		A(v) && (i().filesPending || i().fileIssue) && e(Ce);
	});
	var we = w(Se, 2), Te = (e) => {
		var a = Hs();
		o(a, 21, () => A(g), ({ pin: e, target: t }) => e.id, (e, a) => {
			let o = () => A(a).pin, s = () => A(a).target;
			var c = Vs(), u = N(c), d = (e) => {
				var t = Rs(), n = N(t);
				Ke(n, { name: "chevronRight" });
				var i = w(n), a = N(i), o = P(a, !0), c = w(a), u = P(c, !0);
				L(i), L(t), m(() => {
					I(t, "href", s().href), I(t, "title", s().href), _(o, s().label), _(u, s().detail);
				}), r("click", t, (e) => {
					l() || e.preventDefault();
				}), S(e, t);
			}, f = (e) => {
				{
					let n = B(() => !A(x));
					V(e, {
						variant: "ghost",
						class: "tw:h-auto tw:min-w-0 tw:flex-1 tw:justify-start tw:whitespace-normal tw:px-2 tw:py-2 tw:text-left",
						get disabled() {
							return A(n);
						},
						onclick: () => ae(o().id),
						children: (e, n) => {
							var r = zs(), a = M(r);
							Ke(a, { name: "chevronRight" });
							var o = w(a), c = N(o), l = P(c, !0), u = w(c), d = P(u, !0);
							L(o), m((e) => {
								_(l, s().label), _(d, e);
							}, [() => s().kind === "file-unloaded" ? t.t(i().filesPending ? "Carregando arquivo…" : "Carregar arquivo") : t.t(s().detail)]), S(e, r);
						},
						$$slots: { default: !0 }
					});
				}
			}, h = (e) => {
				var n = Bs(), r = N(n);
				Ke(r, {
					name: "warning",
					class: "tw:mt-0.5"
				});
				var i = w(r), a = N(i), o = P(a, !0), c = w(a), l = P(c, !0);
				L(i), L(n), m((e) => {
					_(o, s().label), _(l, e);
				}, [() => t.t(s().reason)]), S(e, n);
			};
			n(u, (e) => {
				s().kind === "link" ? e(d) : s().kind === "file" || s().kind === "app" || s().kind === "file-unloaded" ? e(f, 1) : e(h, -1);
			});
			var g = w(u, 2);
			{
				let e = B(() => t.t("Desafixar {name}", { name: s().label })), n = B(() => !A(x) || !!i().pending);
				Oe(g, {
					icon: "close",
					get label() {
						return A(e);
					},
					get disabled() {
						return A(n);
					},
					onclick: () => p(o().id)
				});
			}
			L(c), m(() => I(c, "data-pin-id", o().id)), S(e, c);
		}), L(a), S(e, a);
	}, De = (e) => {
		{
			let n = B(() => !A(x));
			V(e, {
				variant: "ghost",
				class: "tw:w-full tw:justify-start tw:whitespace-normal tw:text-left tw:text-muted-foreground",
				get disabled() {
					return A(n);
				},
				onclick: k,
				children: (e, n) => {
					var r = Us(), i = M(r);
					Ke(i, { name: "plus" });
					var a = w(i, 1, !0);
					m((e) => _(a, e), [() => t.t("Fixar site, repo ou app")]), S(e, r);
				},
				$$slots: { default: !0 }
			});
		}
	};
	n(we, (e) => {
		A(g).length ? e(Te) : i().adding || e(De, 1);
	}), L(R), m((e) => {
		I(R, "aria-labelledby", `pins-title-${t.room.id}`), I(ce, "id", `pins-title-${t.room.id}`), _(le, e);
	}, [() => t.t("Fixados")]), S(e, R), F(), s();
}
qe(["click"]);
// svelte/Sidebar.svelte
var Ks = p("<button type=\"button\" class=\"iconBtn phOnly\" id=\"sideArch\"></button> <button type=\"button\" class=\"iconBtn phOnly\" id=\"sideDel\"></button>", 1), qs = p("<span class=\"rowEdit phOnly\" role=\"button\" tabindex=\"0\" id=\"sideRename\"><!> </span>"), Js = p("<button type=\"button\" class=\"sheetGrab\"><i></i></button> <!> <div class=\"sideHead\"><div class=\"sideTop\"><a data-nav=\"\" href=\"/app\" class=\"muted\"><!> vibebooks</a> <!> <button type=\"button\" class=\"iconBtn\" id=\"railToggle\" aria-expanded=\"true\"></button></div></div> <div class=\"sec threadsSec\"><button type=\"button\" data-thread=\"main\"><!><span class=\"rt\"> </span> <!> <!><span class=\"n\"> </span></button> <!></div> <!>  <!>", 1);
function Ys(e, t) {
	Ee(t, !0);
	let r = (e, n = xe) => {
		var r = u(), i = M(r);
		c(i, () => t.vb.agentRows(n())), S(e, r);
	}, i = (e) => {
		var n = u(), r = M(n);
		c(r, () => t.vb.sbxRows()), S(e, n);
	}, a = U(t, "foldOpen", 23, () => ({
		off: !1,
		friends: null
	})), o = U(t, "friends", 19, () => []), s = (e) => t.room.counts ? (t.room.counts[e] ?? 0) + t.room.messages.filter((n) => n.thread === e && n.id > (t.room.countsAt ?? 0)).length : t.room.messages.filter((t) => t.thread === e).length, l = B(() => t.room.epics.find((e) => e.id === t.thread));
	var d = Js(), f = M(d), p = w(f, 2);
	c(p, () => t.vb.roomStrip());
	var h = w(p, 2), g = N(h), v = N(g), y = N(v);
	c(y, () => t.vb.icon("back")), H(), L(v);
	var b = w(v, 2), x = (e) => {
		var n = Ks(), r = M(n);
		c(r, () => t.vb.icon(A(l).archived ? "undo" : "check", 18), !0), L(r);
		var i = w(r, 2);
		c(i, () => t.vb.icon("trash", 18), !0), L(i), m((e, t, n, a) => {
			I(r, "title", e), I(r, "aria-label", t), I(i, "title", n), I(i, "aria-label", a);
		}, [
			() => A(l).archived ? t.vb.t("Desarquivar épico") : t.vb.t("Arquivar épico (concluído)"),
			() => A(l).archived ? t.vb.t("Desarquivar épico") : t.vb.t("Arquivar épico"),
			() => t.vb.t("Apagar épico"),
			() => t.vb.t("Apagar épico")
		]), S(e, n);
	};
	n(b, (e) => {
		A(l) && e(x);
	});
	var C = w(b, 2);
	c(C, () => t.vb.icon("sidebar", 20), !0), L(C), L(g), L(h);
	var T = w(h, 2), E = N(T);
	let D;
	var O = N(E);
	c(O, () => t.vb.roomMark("ri roomIco"));
	var k = w(O), ee = P(k, !0), j = w(k, 2), te = (e) => {
		var n = qs(), r = N(n);
		c(r, () => t.vb.icon("pencil", 13));
		var i = w(r);
		L(n), m((e, t) => {
			I(n, "title", e), _(i, ` ${t ?? ""}`);
		}, [() => t.vb.t("Renomear"), () => t.vb.t("editar")]), S(e, n);
	}, ne = B(() => !t.thread.startsWith("pre:"));
	n(j, (e) => {
		A(ne) && e(te);
	});
	var re = w(j, 2);
	c(re, () => t.vb.waitPill("main"));
	var ie = w(re), ae = P(ie, !0);
	L(E);
	var R = w(E, 2);
	{
		let e = B(() => ({
			t: t.vb.t,
			name: t.vb.name,
			epicBusy: t.vb.epicBusy,
			waitCount: (e) => t.vb.waitsIn(e).length
		}));
		ys(R, {
			get room() {
				return t.room;
			},
			get thread() {
				return t.thread;
			},
			get session() {
				return t.navigation;
			},
			get send() {
				return t.send;
			},
			get onopen() {
				return t.onopen;
			},
			get onarchchange() {
				return t.onarchchange;
			},
			get vb() {
				return A(e);
			}
		});
	}
	L(T);
	var oe = w(T, 2);
	Gs(oe, {
		get room() {
			return t.room;
		},
		get session() {
			return t.pins;
		},
		get send() {
			return t.send;
		},
		get request() {
			return t.request;
		},
		get onopenfile() {
			return t.onopenpinfile;
		},
		get onopenapp() {
			return t.onopenpinapp;
		},
		get t() {
			return t.vb.t;
		}
	});
	var se = w(oe, 2);
	{
		let e = B(() => ({
			t: t.vb.t,
			name: t.vb.name,
			ago: t.vb.ago,
			avatarUrl: t.vb.avatarUrl
		}));
		qo(se, {
			get room() {
				return t.room;
			},
			get friends() {
				return o();
			},
			get foldOpen() {
				return a();
			},
			get vb() {
				return A(e);
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
	m((e, n, r, i, a, o, s) => {
		I(f, "aria-label", e), I(C, "title", n), I(C, "aria-label", r), D = Ge(E, 1, "thread", null, D, {
			sel: t.thread === "main",
			waiting: i
		}), I(E, "title", a), _(ee, o), _(ae, s);
	}, [
		() => t.vb.t("Fechar"),
		() => t.vb.t("Recolher menu"),
		() => t.vb.t("Recolher menu"),
		() => t.vb.waitsIn("main").length > 0,
		() => `${t.vb.bookTitle()}${t.room.book?.summary ? ` · ${t.room.book.summary}` : ""}`,
		() => t.vb.bookTitle(),
		() => s("main")
	]), S(e, d), F();
}
// svelte/Message.svelte
var Xs = p("<span class=\"gut\"> </span>"), Zs = p(" <span class=\"agentTag\">agent</span>", 1), Qs = p("<span class=\"doneTag\"> </span>"), $s = p("<div><!> <!> <span class=\"mact\"><button type=\"button\" class=\"rbtn\"><!> </button> <button type=\"button\" class=\"rbtn\"><!> </button> <button type=\"button\" class=\"rbtn\"><!> </button></span> <div class=\"body\"><!> <div class=\"who\"><!> <!> <span class=\"hhmm\"> </span></div> <div class=\"txt\"></div> <!> <!> <!> <!> <!></div></div>");
function ec(e, t) {
	Ee(t, !0);
	let r = U(t, "origin", 3, !1), i = B(() => t.vb.continues(t.previous, t.message)), a = B(() => t.message.tag === "reminder" ? t.vb.remHtml(t.message, r()) : t.message.tag === "issue" ? t.vb.issueHtml(t.message) : t.vb.isNotice(t.message) ? t.vb.noticeHtml(t.message) : null), o = B(() => r() && A(a) ? A(a).replace(/\sid="m\d+"/, "") : A(a)), s = B(() => !t.message.text && t.typing ? `<span class="typing">${t.vb.esc(t.vb.typingNote?.(t.message.id) || t.vb.t("pensando ({mode})", { mode: t.vb.typingLabel?.(t.typing) ?? t.typing }))}…</span>` : t.message.author === "ai" ? t.message.text ? t.vb.mentions(t.vb.md(t.message.text)) : t.message.poll ? "" : `<span class="typing">${t.vb.t("pensando…")}</span>` : t.message.text ? t.vb.mentions(t.message.kind === "agent" ? t.vb.md(t.message.text) : t.vb.linkify(t.vb.esc(t.message.text))) : ""), l = B(() => t.vb.dateTime?.(t.message.ts) ?? new Date(t.message.ts).toLocaleString());
	var d = u(), f = M(d), p = (e) => {
		var t = u(), n = M(t);
		c(n, () => A(o)), S(e, t);
	}, h = (e) => {
		var a = $s();
		let o;
		var d = N(a);
		c(d, () => t.message.kind === "agent" ? t.vb.agentAvatar(t.message.author, t.message.via) : t.vb.avatar(t.message.author));
		var f = w(d, 2), p = (e) => {
			var n = Xs(), r = P(n, !0);
			m((e) => {
				I(n, "title", A(l)), _(r, e);
			}, [() => t.vb.hhmm(t.message.ts)]), S(e, n);
		};
		n(f, (e) => {
			A(i) && e(p);
		});
		var h = w(f, 2), g = N(h), v = N(g);
		c(v, () => t.vb.icon("copy", 14));
		var y = w(v);
		L(g);
		var b = w(g, 2), x = N(b);
		c(x, () => t.vb.icon("link", 14));
		var C = w(x);
		L(b);
		var E = w(b, 2), D = N(E);
		c(D, () => t.vb.icon("reply", 14));
		var O = w(D);
		L(E), L(h);
		var k = w(h, 2), ee = N(k), j = (e) => {
			var n = u(), r = M(n);
			c(r, () => t.vb.quoteHtml(t.message.reply_to)), S(e, n);
		};
		n(ee, (e) => {
			t.message.reply_to && e(j);
		});
		var te = w(ee, 2), ne = N(te), F = (e) => {
			var n = Zs(), r = M(n), i = w(r);
			m((e, t) => {
				_(r, `${e ?? ""} `), I(i, "title", t);
			}, [() => t.vb.t("{via} de {who}", {
				via: t.message.via || "agent",
				who: t.vb.name(t.message.author)
			}), () => t.vb.t("Escrito pelo agent dessa pessoa, em nome dela")]), S(e, n);
		}, re = (e) => {
			var n = T();
			m((e) => _(n, e), [() => t.vb.name(t.message.author)]), S(e, n);
		};
		n(ne, (e) => {
			t.message.kind === "agent" ? e(F) : e(re, -1);
		});
		var ie = w(ne, 2), ae = (e) => {
			var n = Qs(), r = P(n);
			m((e, t) => {
				I(n, "title", e), _(r, `✓ ${t ?? ""}`);
			}, [() => t.vb.t("Reporta algo entregue"), () => t.vb.t("entregue")]), S(e, n);
		};
		n(ie, (e) => {
			t.message.tag === "done" && e(ae);
		});
		var R = w(ie), oe = w(R), se = P(oe, !0);
		L(te);
		var z = w(te, 2);
		c(z, () => A(s), !0), L(z);
		var ce = w(z, 2);
		c(ce, () => t.vb.attHtml(t.message.files));
		var le = w(ce, 2), ue = (e) => {
			var n = u(), r = M(n);
			c(r, () => t.vb.cardHtml(t.message)), S(e, n);
		};
		n(le, (e) => {
			t.message.card && e(ue);
		});
		var de = w(le, 2), fe = (e) => {
			var n = u(), r = M(n);
			c(r, () => t.vb.choiceHtml(t.message)), S(e, n);
		};
		n(de, (e) => {
			t.message.choices && e(fe);
		});
		var pe = w(de, 2), me = (e) => {
			var n = u(), r = M(n);
			c(r, () => t.vb.pollHtml(t.message.poll)), S(e, n);
		};
		n(pe, (e) => {
			t.message.poll && e(me);
		});
		var B = w(pe, 2), he = (e) => {
			var n = u(), r = M(n);
			c(r, () => t.vb.threadCards(t.message.id)), S(e, n);
		};
		n(B, (e) => {
			r() || e(he);
		}), L(k), L(a), m((e, n, c, u, d, f, p, m, h, v, x, S) => {
			o = Ge(a, 1, "msg", null, o, {
				ai: t.message.author === "ai",
				agent: t.message.author !== "ai" && t.message.kind === "agent",
				done: t.message.tag === "done",
				cont: A(i),
				waitMsg: e
			}), I(a, "id", r() ? void 0 : `m${t.message.id}`), I(g, "data-copymsg", t.message.id), I(g, "title", n), I(g, "aria-label", c), _(y, ` ${u ?? ""}`), I(b, "data-copylink", t.message.id), I(b, "title", d), I(b, "aria-label", f), _(C, ` ${p ?? ""}`), I(E, "data-reply", t.message.id), I(E, "title", m), I(E, "aria-label", h), _(O, ` ${v ?? ""}`), _(R, ` · ${x ?? ""}`), I(oe, "title", A(l)), _(se, S), I(z, "hidden", !A(s));
		}, [
			() => t.vb.waiting(t.message.id),
			() => t.vb.t("Copiar"),
			() => t.vb.t("Copiar o texto desta mensagem"),
			() => t.vb.t("Copiar"),
			() => t.vb.t("Copiar link"),
			() => t.vb.t("Copiar o link desta mensagem"),
			() => t.vb.t("Copiar link"),
			() => t.vb.t("Responder"),
			() => t.vb.t("Responder a esta mensagem"),
			() => t.vb.t("Responder"),
			() => t.vb.ago(t.message.ts),
			() => t.vb.hhmm(t.message.ts)
		]), S(e, a);
	};
	n(f, (e) => {
		A(o) === null ? e(h, -1) : e(p);
	}), S(e, d), F();
}
// svelte/Chat.svelte
var tc = p("<div class=\"older\"><button type=\"button\" class=\"ghost\" id=\"olderBtn\"> </button></div>"), nc = p("<div class=\"origin\"><!> <div class=\"replies\"><span> </span><button type=\"button\" class=\"ghost\"> <!></button></div></div>"), rc = p("<div><!></div>"), ic = p("<!> <!> <!>", 1);
function ac(e, t) {
	Ee(t, !0);
	let i = U(t, "more", 3, !1), a = U(t, "origin", 3, null), s = U(t, "replyCount", 3, 0);
	var l = u(), d = M(l);
	ye(d, () => t.room.id + ":" + t.thread, (e) => {
		var l = ic(), d = M(l), f = (e) => {
			var n = tc(), i = N(n), a = P(i, !0);
			L(n), m((e) => _(a, e), [() => t.vb.t("Carregar mensagens anteriores")]), r("click", i, function(...e) {
				t.onloadolder?.apply(this, e);
			}), S(e, n);
		};
		n(d, (e) => {
			t.list.length && i() && e(f);
		});
		var p = w(d, 2), h = (e) => {
			var n = nc(), r = N(n);
			ec(r, {
				get message() {
					return a();
				},
				origin: !0,
				get typing() {
					return t.room.typing[a().id];
				},
				get vb() {
					return t.vb;
				}
			});
			var i = w(r, 2), o = N(i), l = P(o, !0), u = w(o), d = N(u), f = w(d);
			c(f, () => t.vb.icon("reply", 13)), L(u), L(i), L(n), m((e, t) => {
				_(l, e), I(u, "data-gomain", a().id), _(d, `${t ?? ""} `);
			}, [() => s() === 1 ? t.vb.t("1 resposta") : t.vb.t("{n} respostas", { n: s() }), () => t.vb.t("ver na sala principal")]), S(e, n);
		};
		n(p, (e) => {
			a() && e(h);
		});
		var g = w(p, 2), v = (e) => {
			var n = u(), r = M(n);
			o(r, 19, () => t.list, (e) => e.id, (e, n, r) => {
				{
					let i = B(() => A(r) ? t.list[A(r) - 1] : t.previous);
					ec(e, {
						get message() {
							return A(n);
						},
						get previous() {
							return A(i);
						},
						get typing() {
							return t.room.typing[A(n).id];
						},
						get vb() {
							return t.vb;
						}
					});
				}
			}), S(e, n);
		}, y = (e) => {
			var r = rc();
			let i;
			var o = N(r), s = (e) => {
				var n = u(), r = M(n);
				c(r, () => t.vb.t("Comece a conversa. Os agents ligados nesta sala leem e respondem; o seu age com o seu OK. Ex.: <i>organiza o projeto em épicos: site novo, aluguéis e domínio</i>.")), S(e, n);
			}, l = (e) => {
				var n = T();
				m((e) => _(n, e), [() => t.vb.t("Discussão deste épico. Os agents leem as tarefas, o doc e a sala principal.")]), S(e, n);
			};
			n(o, (e) => {
				t.thread === "main" ? e(s) : e(l, -1);
			}), L(r), m(() => i = Ge(r, 1, "empty", null, i, { afterOrigin: !!a() })), S(e, r);
		};
		n(g, (e) => {
			t.list.length ? e(v) : e(y, -1);
		}), S(e, l);
	}), S(e, l), F();
}
qe(["click"]);
// svelte/roomStore.ts
function oc(e, t, n) {
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
function sc() {
	let e = Ce(null);
	return {
		subscribe: e.subscribe,
		get: () => ke(e),
		replace: e.set,
		apply(t, n) {
			return e.update((e) => oc(e, t, n)), ke(e);
		}
	};
}
// svelte/main.ts
var cc = /* @__PURE__ */ Ye({
	createRoomStore: () => sc,
	dismissDialogs: () => ue,
	mountInbox: () => dc,
	mountView: () => uc
}), lc = {
	tasks: Dt,
	board: Fi,
	files: ea,
	reminders: So,
	decisions: ha,
	sidebar: Ys,
	chat: ac
};
function uc(e, t, n) {
	let r = Ce(n), i = lc[e], a = Me(() => _e(Xe, {
		target: t,
		props: {
			component: i,
			values: r
		}
	}));
	return {
		update(e) {
			Me(() => r.set(e));
		},
		destroy() {
			Me(() => {
				y(a);
			});
		}
	};
}
function dc(e, t) {
	let { waits: n, ...r } = t, i = Ce(n), a = Me(() => _e(ht, {
		target: e,
		props: {
			props: r,
			waits: i
		}
	}));
	return Object.assign(() => Me(() => {
		y(a);
	}), { updateWaits(e) {
		Me(() => i.set(e));
	} });
}
export { Ts as a, as as c, to as d, Bi as f, sc as i, ao as l, dc as n, Fs as o, Ze as p, uc as r, js as s, cc as t, no as u };
