import { $ as e, $t as t, At as n, Bt as r, Ct as i, Dt as a, Et as o, Ft as s, Gt as c, Ht as l, It as u, J as d, Jt as f, K as p, Lt as m, Nt as h, Ot as g, Pt as _, Q as v, Qt as y, St as b, Tt as x, Ut as S, Vt as C, Wt as w, X as T, Xt as E, Yt as D, Z as O, Zt as k, _t as A, a as j, bt as M, c as ee, ct as N, d as P, dt as F, en as I, et as L, f as R, ft as te, gt as z, h as ne, i as re, jt as ie, kt as B, l as ae, lt as V, mt as oe, n as se, nt as ce, o as le, ot as ue, p as de, pt as fe, q as pe, qt as me, r as he, s as ge, st as _e, t as ve, tn as ye, tt as be, u as xe, ut as Se, vt as Ce, wt as H, xt as we, yt as Te, zt as U } from "./Field-Dw4795OZ.js";
// \0rolldown/runtime.js
var Ee = Object.defineProperty, De = (e, t) => {
	let n = {};
	for (var r in e) Ee(n, r, {
		get: e[r],
		enumerable: !0
	});
	return t || Ee(n, Symbol.toStringTag, { value: "Module" }), n;
};
// svelte/View.svelte
function Oe(t, n) {
	let i = () => L(n.values, "$values", a), [a, o] = e();
	var s = x(), c = r(s);
	oe(c, () => n.component, (e, t) => {
		t(e, v(i));
	}), H(t, s), o();
}
// shared/uiVariant.ts
function ke(e, t, n) {
	let r = new URL(t), i = new URL(e, r);
	return i.origin !== r.origin || !/^\/(?:app|archived|login|b\/[a-z0-9]+)\/?$/.test(i.pathname) ? String(e) : (n === "svelte" ? i.searchParams.set("ui", "svelte") : i.searchParams.delete("ui"), i.pathname + i.search + i.hash);
}
// svelte/Inbox.svelte
var Ae = o("<span class=\"tw:grid tw:size-8 tw:shrink-0 tw:place-items-center tw:rounded-full tw:border tw:border-border tw:bg-muted\"><!></span>"), je = o("<li class=\"tw:flex tw:items-start tw:gap-2 tw:py-1\"><a class=\"tw:flex tw:min-w-0 tw:flex-1 tw:gap-3 tw:rounded-control tw:p-2 tw:text-foreground tw:no-underline tw:outline-none tw:hover:bg-accent tw:focus-visible:ring-2 tw:focus-visible:ring-ring\"><!> <span class=\"tw:flex tw:min-w-0 tw:flex-1 tw:flex-col tw:gap-1 tw:text-sm tw:leading-5 tw:[overflow-wrap:anywhere]\"><span class=\"tw:line-clamp-3\"><strong class=\"tw:font-semibold\"> </strong> </span> <span class=\"tw:text-xs tw:leading-4 tw:text-muted-foreground\"> </span></span></a> <!></li>"), Me = o("<ul class=\"tw:m-0 tw:max-h-[60dvh] tw:min-h-0 tw:list-none tw:divide-y tw:divide-border tw:overflow-auto tw:overscroll-contain tw:p-0\"></ul>"), Ne = o("<!> <!>", 1);
function Pe(e, i) {
	k(i, !0);
	let a = (e) => {
		var a = x(), o = r(a), s = (e) => {
			var r = Me();
			A(r, 21, () => h(D), (e) => j(e), (e, r) => {
				var a = je(), o = U(a), s = U(o), c = (e) => {
					var n = Ae(), r = U(n);
					ne(r, { name: "check" }), t(n), H(e, n);
				}, d = f(() => N(h(r)) === "task"), m = (e) => {
					{
						let t = f(() => P(h(r))), n = f(() => i.avatarUrl?.(h(r).author));
						p(e, {
							get name() {
								return h(t);
							},
							get src() {
								return h(n);
							}
						});
					}
				};
				M(s, (e) => {
					h(d) ? e(c) : e(m, -1);
				});
				var _ = l(s, 2), v = U(_), x = U(v), S = C(x, !0), w = l(x);
				t(v);
				var T = l(v, 2), E = C(T);
				t(_), t(o);
				var D = l(o, 2), O = (e) => {
					{
						let t = f(() => i.vb.t("Já resolvi (respondi em outro lugar, ou não é comigo)")), n = f(() => h(g) === j(h(r))), a = f(() => h(g) !== null);
						xe(e, {
							icon: "check",
							get label() {
								return h(t);
							},
							class: "tw:mt-1",
							get loading() {
								return h(n);
							},
							get disabled() {
								return h(a);
							},
							onclick: () => I(h(r))
						});
					}
				}, k = f(() => h(r).ref.startsWith("m"));
				M(D, (e) => {
					h(k) && e(O);
				}), t(a), u((e, t, n, i) => {
					V(o, "href", e), b(S, t), b(w, ` ${h(r).text ?? ""}`), b(E, `${h(y) ? `${h(r).room} › ` : ""}${n ?? ""} · ${i ?? ""}`);
				}, [
					() => F(h(r)),
					() => N(h(r)) === "task" ? i.vb.t("Tarefa sua esperando OK:") : N(h(r)) === "agent" ? i.vb.t("Seu agent espera você:") : `${P(h(r)).split(" ")[0]}:`,
					() => h(r).topic || i.vb.t("sala principal"),
					() => i.vb.ago(h(r).ts)
				]), n("click", o, (e) => i.onopen(h(r), e)), H(e, a);
			}), t(r), H(e, r);
		}, c = (e) => {
			{
				let t = f(() => h(y) ? i.vb.t("Nada esperando você. ✓") : i.vb.t("Nada esperando você nesta sala. ✓"));
				ee(e, { get title() {
					return h(t);
				} });
			}
		};
		M(o, (e) => {
			h(D).length ? e(s) : e(c, -1);
		}), H(e, a);
	}, o = T(i, "all", 3, !1), d = c(S(s(() => o() || !i.roomId ? "all" : "room"))), m = c(!0), g = c(null), _ = c(""), v = f(() => i.waits.filter((e) => e.book_id === i.roomId)), y = f(() => h(d) === "all" || !i.roomId), D = f(() => h(y) ? i.waits : h(v)), O = f(() => [{
		value: "room",
		label: `${i.vb.t("Esta sala")} (${h(v).length})`
	}, {
		value: "all",
		label: `${i.vb.t("Todas")} (${i.waits.length})`
	}]), j = (e) => `${e.book_id}:${e.ref}`, N = (e) => e.ref.startsWith("t") ? "task" : /^[ab]/.test(e.ref) ? "agent" : "ask", P = (e) => e.author_name || i.displayName?.(e.author) || e.author.split("@")[0];
	function F(e) {
		return ke(`/b/${encodeURIComponent(e.book_id)}${e.thread === "main" ? "" : `?t=${encodeURIComponent(e.thread)}`}${/^[mab]/.test(e.ref) ? `#m${e.ref.slice(1)}` : ""}`, window.location.href, "svelte");
	}
	async function I(e) {
		w(g, j(e), !0), w(_, "");
		try {
			await i.onresolve(e);
		} catch {
			w(_, i.vb.t("Não deu pra resolver agora. Tente de novo."), !0);
		} finally {
			w(g, null);
		}
	}
	{
		let t = (e) => {
			var t = Ne(), n = r(t), o = (e) => {
				ge(e, {
					get title() {
						return h(_);
					},
					compact: !0
				});
			};
			M(n, (e) => {
				h(_) && e(o);
			});
			var s = l(n, 2), c = (e) => {
				{
					let t = (e) => {
						a(e);
					}, n = f(() => i.vb.t("Caixa de entrada"));
					ae(e, {
						get items() {
							return h(O);
						},
						get label() {
							return h(n);
						},
						onValueChange: (e) => i.ontab?.(e === "all"),
						get value() {
							return h(d);
						},
						set value(e) {
							w(d, e, !0);
						},
						children: t,
						$$slots: { default: !0 }
					});
				}
			}, u = (e) => {
				a(e);
			};
			M(s, (e) => {
				i.roomId ? e(c) : e(u, -1);
			}), H(e, t);
		}, n = f(() => i.vb.t("Caixa de entrada")), o = f(() => i.vb.t("Fechar"));
		R(e, {
			get title() {
				return h(n);
			},
			get closeLabel() {
				return h(o);
			},
			onOpenChange: (e) => {
				e || i.onclose();
			},
			get open() {
				return h(m);
			},
			set open(e) {
				w(m, e, !0);
			},
			children: t,
			$$slots: { default: !0 }
		});
	}
	E();
}
B(["click"]);
// svelte/InboxMount.svelte
function Fe(t, n) {
	let r = () => L(n.waits, "$waits", i), [i, a] = e();
	Pe(t, v(() => n.props, { get waits() {
		return r();
	} })), a();
}
// svelte/lib/ui/Progress.svelte
var Ie = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"value",
	"max",
	"label",
	"class"
]), Le = o("<progress> </progress>");
function Re(e, t) {
	k(t, !0);
	let n = T(t, "max", 3, 100), r = O(t, Ie), i = f(() => Number.isFinite(n()) && n() > 0 ? n() : 100), a = f(() => Number.isFinite(t.value) ? Math.min(h(i), Math.max(0, t.value)) : 0);
	var o = Le();
	_e(o, (e) => ({
		...r,
		max: h(i),
		value: h(a),
		"aria-label": t.label,
		class: e
	}), [() => pe("tw:h-1.5 tw:w-full tw:overflow-hidden tw:rounded-full tw:border-0 tw:bg-muted tw:appearance-none tw:[&::-webkit-progress-bar]:rounded-full tw:[&::-webkit-progress-bar]:bg-muted tw:[&::-webkit-progress-value]:rounded-full tw:[&::-webkit-progress-value]:bg-primary tw:[&::-moz-progress-bar]:rounded-full tw:[&::-moz-progress-bar]:bg-primary", t.class)]);
	var s = C(o);
	u(() => b(s, `${h(a) ?? ""}/${h(i) ?? ""}`)), H(e, o), E();
}
// svelte/TaskList.svelte
var ze = o("<!> ", 1), Be = o("<div class=\"tw:min-w-0 tw:flex-1 tw:basis-32 tw:space-y-1\"><!> <!></div>"), Ve = o("<div role=\"group\"><!> <!> <!> <!> <!></div>"), He = o("<section data-vb-native=\"\" class=\"tw:m-0 tw:box-border tw:space-y-3 tw:rounded-surface tw:bg-background tw:p-3 tw:font-sans tw:text-sm tw:text-foreground\"><header class=\"tw:flex tw:items-center tw:gap-3\"><h3 class=\"tw:m-0 tw:font-sans tw:text-sm tw:font-semibold\"> </h3> <!> <!></header> <!> <!> <div class=\"tw:space-y-2\"></div> <form id=\"newTask\" class=\"tw:flex tw:items-center tw:gap-2\"><!> <!></form></section>"), Ue = o("<form class=\"tw:grid tw:grid-cols-1 tw:gap-4\"><!> <!> <div class=\"tw:flex tw:flex-wrap tw:justify-end tw:gap-2\"><!><!></div></form>"), We = o("<!> <!>", 1);
function Ge(e, n) {
	let i = a();
	k(n, !0);
	let o = T(n, "waits", 19, () => []), s = f(() => n.room.epics.find((e) => e.id === n.thread) ?? (n.thread === "main" && n.room.roomTasks?.length ? {
		id: "main",
		tasks: n.room.roomTasks,
		flags: []
	} : null)), d = (e) => o().some((t) => t.book_id === n.room.id && t.ref === `t${e.id}`), p = f(() => (h(s)?.tasks ?? []).map((e, t) => ({
		task: e,
		index: t
	})).sort((e, t) => (e.task.done ? 2 : +!d(e.task)) - (t.task.done ? 2 : +!d(t.task)) || e.index - t.index).map((e) => e.task)), _ = f(() => h(s)?.tasks.filter((e) => e.done).length ?? 0), x = f(() => [{
		value: "",
		label: n.vb.t("sem dono")
	}, ...(n.room.members ?? []).map((e) => ({
		value: e,
		label: e === n.room.me ? n.vb.t("você") : n.vb.name(e)
	}))]), S = c(null), D = c(""), O = c(null), ee = c(""), N = c(""), L = c(null), z = c(!1), B = c(""), ae = c(null), oe = f(() => h(s)?.tasks.find((e) => e.id === h(L)));
	m(() => {
		h(S) && h(O) && (h(O).focus(), h(O).select());
	}), m(() => {
		h(L) && !h(oe) && de(), h(S) && !h(s)?.tasks.some((e) => e.id === h(S)) && w(S, null);
	});
	function se(e) {
		try {
			if (n.send(e)) return w(N, ""), !0;
		} catch {}
		return w(N, n.vb.t("Não deu pra enviar agora. Tente de novo."), !0), !1;
	}
	function ce(e, t = !0) {
		h(S) !== e.id || t && h(D).trim() && h(D) !== e.title && !se({
			t: "task.rename",
			id: e.id,
			title: h(D)
		}) || w(S, null);
	}
	function ue(e) {
		w(L, e.id, !0), w(B, e.due ?? "", !0), w(z, !0);
	}
	function de() {
		w(z, !1), w(L, null), w(B, "");
	}
	var fe = We(), me = r(fe), _e = (e) => {
		var i = He(), a = U(i), o = U(a), c = C(o, !0), m = l(o, 2);
		he(m, {
			children: (e, t) => {
				y();
				var n = g();
				u(() => b(n, `${h(_) ?? ""}/${h(s).tasks.length ?? ""}`)), H(e, n);
			},
			$$slots: { default: !0 }
		});
		var v = l(m, 2);
		{
			let e = f(() => n.vb.t("Tarefas")), t = f(() => Math.max(1, h(s).tasks.length)), r = f(() => `${h(_)}/${h(s).tasks.length}`);
			Re(v, {
				get label() {
					return h(e);
				},
				get value() {
					return h(_);
				},
				get max() {
					return h(t);
				},
				get "aria-valuetext"() {
					return h(r);
				},
				class: "tw:ml-auto tw:max-w-24"
			});
		}
		t(a);
		var T = l(a, 2), E = (e) => {
			{
				let t = f(() => `@vibe: ${h(s).flags.join(" · ")}`);
				he(e, {
					variant: "warning",
					get title() {
						return h(t);
					},
					children: (e, t) => {
						var n = ze(), i = r(n);
						ne(i, {
							name: "warning",
							class: "tw:size-3"
						});
						var a = l(i, 1, !0);
						u((e) => b(a, e), [() => h(s).flags.join(" · ")]), H(e, n);
					},
					$$slots: { default: !0 }
				});
			}
		};
		M(T, (e) => {
			h(s).flags?.length && e(E);
		});
		var k = l(T, 2), I = (e) => {
			ge(e, {
				get title() {
					return h(N);
				},
				compact: !0
			});
		};
		M(k, (e) => {
			h(N) && !h(z) && e(I);
		});
		var L = l(k, 2);
		A(L, 21, () => h(p), (e) => e.id, (e, i) => {
			var a = Ve(), o = U(a);
			{
				let e = f(() => n.vb.t("Feita"));
				re(o, {
					get checked() {
						return h(i).done;
					},
					get "aria-label"() {
						return h(e);
					},
					onclick: (e) => {
						e.preventDefault(), se({
							t: "task.toggle",
							id: h(i).id
						});
					}
				});
			}
			var s = l(o, 2), c = (e) => {
				{
					let t = f(() => n.vb.t("Clique para editar"));
					le(e, {
						get "data-task-edit"() {
							return h(i).id;
						},
						get "aria-label"() {
							return h(t);
						},
						class: "tw:min-w-32 tw:flex-1",
						onblur: () => ce(h(i)),
						onkeydown: (e) => {
							e.key === "Enter" && (e.preventDefault(), ce(h(i))), e.key === "Escape" && (e.preventDefault(), ce(h(i), !1));
						},
						get ref() {
							return h(O);
						},
						set ref(e) {
							w(O, e, !0);
						},
						get value() {
							return h(D);
						},
						set value(e) {
							w(D, e, !0);
						}
					});
				}
			}, p = (e) => {
				var a = Be(), o = U(a);
				{
					let e = f(() => pe("tw:h-auto tw:w-full tw:justify-start tw:whitespace-normal tw:rounded-sm tw:p-0 tw:text-left tw:hover:bg-transparent tw:hover:underline", h(i).done && "tw:text-muted-foreground tw:line-through")), t = f(() => n.vb.t("Clique para editar"));
					P(o, {
						get "data-task-title"() {
							return h(i).id;
						},
						variant: "ghost",
						get class() {
							return h(e);
						},
						get title() {
							return h(t);
						},
						onclick: () => {
							w(S, h(i).id, !0), w(D, h(i).title, !0);
						},
						children: (e, t) => {
							y();
							var n = g();
							u(() => b(n, h(i).title)), H(e, n);
						},
						$$slots: { default: !0 }
					});
				}
				var s = l(o, 2), c = (e) => {
					{
						let t = f(() => `@vibe: ${h(i).flags.join(" · ")}`);
						he(e, {
							variant: "warning",
							get title() {
								return h(t);
							},
							children: (e, t) => {
								var n = ze(), a = r(n);
								ne(a, {
									name: "warning",
									class: "tw:size-3"
								});
								var o = l(a, 1, !0);
								u((e) => b(o, e), [() => h(i).flags.join(" · ")]), H(e, n);
							},
							$$slots: { default: !0 }
						});
					}
				};
				M(s, (e) => {
					h(i).flags?.length && e(c);
				}), t(a), H(e, a);
			};
			M(s, (e) => {
				h(S) === h(i).id ? e(c) : e(p, -1);
			});
			var m = l(s, 2);
			{
				let e = f(() => n.vb.t("Responsável")), t = f(() => h(i).owner ?? "");
				j(m, {
					get "data-owner"() {
						return h(i).id;
					},
					get "aria-label"() {
						return h(e);
					},
					get value() {
						return h(t);
					},
					get items() {
						return h(x);
					},
					class: "tw:w-auto tw:max-w-40",
					onValueChange: (e) => se({
						t: "task.assign",
						id: h(i).id,
						owner: e
					})
				});
			}
			var _ = l(m, 2);
			{
				let e = f(() => n.vb.t("Prazo")), t = f(() => h(i).due ? `${n.vb.t("Prazo")}: ${h(i).due}` : n.vb.t("Prazo"));
				P(_, {
					get "data-due"() {
						return h(i).id;
					},
					variant: "ghost",
					size: "sm",
					get title() {
						return h(e);
					},
					get "aria-label"() {
						return h(t);
					},
					onclick: () => ue(h(i)),
					children: (e, t) => {
						var n = ze(), a = r(n);
						ne(a, {
							name: "calendar",
							class: "tw:size-3.5"
						});
						var o = l(a, 1, !0);
						u(() => b(o, h(i).due ?? "")), H(e, n);
					},
					$$slots: { default: !0 }
				});
			}
			var v = l(_, 2);
			{
				let e = f(() => n.vb.t("Apagar task"));
				xe(v, {
					get "data-tdel"() {
						return h(i).id;
					},
					get label() {
						return h(e);
					},
					icon: "close",
					class: "tw:size-8",
					onclick: () => se({
						t: "task.del",
						id: h(i).id
					})
				});
			}
			t(a), u((e) => {
				V(a, "data-task", h(i).id), V(a, "aria-label", h(i).title), F(a, 1, e);
			}, [() => te(pe("tw:flex tw:flex-wrap tw:items-center tw:gap-2 tw:rounded-control tw:border tw:p-2", h(i).done ? "tw:border-transparent tw:bg-muted/40 tw:text-muted-foreground" : "tw:border-border tw:bg-card tw:text-card-foreground", !h(i).done && h(i).owner === n.room.me && "tw:border-ring/50", d(h(i)) && "tw:bg-warning/10"))]), H(e, a);
		}), t(L);
		var R = l(L, 2), B = U(R);
		{
			let e = f(() => n.vb.t("nova task")), t = f(() => n.vb.t("nova task"));
			le(B, {
				get "aria-label"() {
					return h(e);
				},
				get placeholder() {
					return h(t);
				},
				get value() {
					return h(ee);
				},
				set value(e) {
					w(ee, e, !0);
				}
			});
		}
		var ae = l(B, 2);
		{
			let e = f(() => n.vb.t("Nova tarefa"));
			xe(ae, {
				type: "submit",
				get label() {
					return h(e);
				},
				icon: "plus",
				variant: "outline"
			});
		}
		t(R), t(i), u((e, t) => {
			V(i, "aria-label", e), b(c, t);
		}, [() => n.vb.t("Tarefas"), () => n.vb.t("Tarefas")]), ie("submit", R, (e) => {
			e.preventDefault(), h(ee).trim() && se({
				t: "task.add",
				epic: n.thread,
				title: h(ee)
			}) && w(ee, "");
		}), H(e, i);
	};
	M(me, (e) => {
		h(s) && e(_e);
	});
	var ye = l(me, 2), be = (e) => {
		{
			let r = f(() => n.vb.t("Prazo")), a = f(() => n.vb.t("Prazo (ex.: sex, qua 23h, 06/11). Vazio tira o prazo:")), o = f(() => n.vb.t("Fechar"));
			R(e, {
				get title() {
					return h(r);
				},
				get description() {
					return h(a);
				},
				get closeLabel() {
					return h(o);
				},
				initialFocus: () => h(ae),
				onOpenChange: (e) => {
					e || de();
				},
				get open() {
					return h(z);
				},
				set open(e) {
					w(z, e, !0);
				},
				children: (e, r) => {
					var a = Ue(), o = U(a);
					{
						let e = (e, t = I) => {
							le(e, v(t, {
								get ref() {
									return h(ae);
								},
								set ref(e) {
									w(ae, e, !0);
								},
								get value() {
									return h(B);
								},
								set value(e) {
									w(B, e, !0);
								}
							}));
						}, t = f(() => `${i}-due`), r = f(() => n.vb.t("Prazo"));
						ve(o, {
							get id() {
								return h(t);
							},
							get label() {
								return h(r);
							},
							children: e,
							$$slots: { default: !0 }
						});
					}
					var s = l(o, 2), c = (e) => {
						ge(e, {
							get title() {
								return h(N);
							},
							compact: !0
						});
					};
					M(s, (e) => {
						h(N) && e(c);
					});
					var d = l(s, 2), p = U(d);
					P(p, {
						variant: "outline",
						onclick: de,
						children: (e, t) => {
							y();
							var r = g();
							u((e) => b(r, e), [() => n.vb.t("Cancelar")]), H(e, r);
						},
						$$slots: { default: !0 }
					});
					var m = l(p);
					P(m, {
						type: "submit",
						children: (e, t) => {
							y();
							var r = g();
							u((e) => b(r, e), [() => n.vb.t("Salvar")]), H(e, r);
						},
						$$slots: { default: !0 }
					}), t(d), t(a), ie("submit", a, (e) => {
						e.preventDefault(), h(oe) && se({
							t: "task.assign",
							id: h(oe).id,
							due: h(B)
						}) && de();
					}), H(e, a);
				},
				$$slots: { default: !0 }
			});
		}
	};
	M(ye, (e) => {
		h(oe) && e(be);
	}), H(e, fe), E();
}
// svelte/Tasks.svelte
var Ke = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy"
]);
function qe(e, t) {
	k(t, !0);
	let n = O(t, Ke);
	var i = x(), a = r(i);
	Te(a, () => JSON.stringify([t.room.id, t.thread]), (e) => {
		Ge(e, v(() => n));
	}), H(e, i), E();
}
// shared/room.ts
var Je = [
	"todo",
	"doing",
	"review",
	"done"
], Ye = {
	todo: "A fazer",
	doing: "Fazendo",
	review: "Esperando OK",
	done: "Feito"
}, Xe = Je.map((e) => ({
	value: e,
	label: Ye[e]
}));
function Ze(e, t) {
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
function Qe() {
	try {
		return localStorage.getItem("vb.boardMode") === "list" ? "list" : "board";
	} catch {
		return "board";
	}
}
function $e(e, t) {
	return Xe[Xe.findIndex((t) => t.value === e) + t]?.value;
}
function et(e) {
	return Xe.some((t) => t.value === e);
}
// svelte/features/board/BoardPanel.svelte
var tt = o("<!> ", 1), nt = o("<!><span> </span>", 1), rt = o("<span class=\"tw:inline-flex tw:items-center tw:gap-1\"><!> </span>"), it = o("<span data-board-drag=\"\" draggable=\"true\" aria-hidden=\"true\" class=\"tw:absolute tw:right-2 tw:top-2 tw:grid tw:size-7 tw:cursor-grab tw:place-items-center tw:rounded-md tw:text-muted-foreground tw:active:cursor-grabbing\"><!></span>"), at = o("<article><button type=\"button\" data-board-open=\"\"><span> </span> <!> <span class=\"tw:flex tw:flex-wrap tw:items-center tw:gap-2 tw:text-xs tw:text-muted-foreground\"><!> <!> <!></span></button> <!> <div><!> <!></div></article>"), ot = o("<p class=\"tw:m-0 tw:py-4 tw:text-xs tw:text-muted-foreground\"> </p>"), st = o("<section><h3 class=\"tw:m-0 tw:flex tw:items-center tw:justify-between tw:gap-2 tw:font-sans tw:text-sm tw:font-semibold tw:leading-5 tw:tracking-normal\"> <!></h3> <div class=\"tw:space-y-3\"></div></section>"), ct = o("<div class=\"tw:h-full tw:min-h-0 tw:min-w-0 tw:overflow-auto tw:pb-2\"><div class=\"tw:grid tw:grid-cols-[repeat(4,minmax(15rem,1fr))] tw:gap-3\"></div></div>"), lt = o("<section class=\"tw:space-y-2\"><h3 class=\"tw:m-0 tw:flex tw:items-center tw:gap-2 tw:font-sans tw:text-sm tw:font-semibold tw:leading-5 tw:tracking-normal\"> <!></h3> <!></section>"), ut = o("<div class=\"tw:h-full tw:min-h-0 tw:space-y-5 tw:overflow-auto\"><!> <!></div>"), dt = o("<div class=\"tw:min-w-32 tw:flex-1 tw:space-y-1\"><!> <!></div>"), ft = o("<section data-vb-native=\"\" class=\"tw:m-0 tw:box-border tw:flex tw:min-h-0 tw:min-w-0 tw:flex-1 tw:flex-col tw:gap-3 tw:rounded-surface tw:bg-background tw:p-3 tw:font-sans tw:text-sm tw:text-foreground\"><p class=\"tw:m-0 tw:text-xs tw:text-muted-foreground\"> </p> <!> <p role=\"status\" aria-live=\"polite\" class=\"tw:sr-only\"> </p> <p class=\"tw:sr-only\"> </p> <!> <form class=\"tw:flex tw:shrink-0 tw:flex-wrap tw:items-end tw:gap-2\" data-board-add=\"\"><div class=\"tw:min-w-36 tw:flex-1 tw:space-y-1\"><!> <!></div> <!> <!></form></section>");
function pt(e, i) {
	let o = a();
	k(i, !0);
	let v = (e, a = I, s = I, c = I) => {
		var d = at(), m = U(d), _ = U(m), v = C(_, !0), x = l(_, 2), S = (e) => {
			{
				let t = f(() => `@vibe: ${a().flags.join(" · ")}`);
				he(e, {
					variant: "warning",
					get title() {
						return h(t);
					},
					children: (e, t) => {
						var n = tt(), i = r(n);
						ne(i, {
							name: "warning",
							class: "tw:size-3"
						});
						var o = l(i, 1, !0);
						u((e) => b(o, e), [() => a().flags.join(" · ")]), H(e, n);
					},
					$$slots: { default: !0 }
				});
			}
		};
		M(x, (e) => {
			a().flags?.length && e(S);
		});
		var T = l(x, 2), E = U(T);
		he(E, {
			children: (e, t) => {
				y();
				var n = g();
				u(() => b(n, a().epicTitle)), H(e, n);
			},
			$$slots: { default: !0 }
		});
		var D = l(E, 2), O = (e) => {
			var t = nt(), n = r(t);
			{
				let e = f(() => i.vb.name(a().owner)), t = f(() => `/api/avatar/${encodeURIComponent(a().owner)}`);
				p(n, {
					get name() {
						return h(e);
					},
					get src() {
						return h(t);
					},
					class: "tw:size-6"
				});
			}
			var o = l(n), s = C(o, !0);
			u((e) => b(s, e), [() => a().owner === i.room.me ? i.vb.t("você") : i.vb.name(a().owner)]), H(e, t);
		};
		M(D, (e) => {
			a().owner && e(O);
		});
		var k = l(D, 2), A = (e) => {
			var n = rt(), r = U(n);
			ne(r, {
				name: "calendar",
				class: "tw:size-3"
			});
			var i = l(r, 1, !0);
			t(n), u(() => b(i, a().due)), H(e, n);
		};
		M(k, (e) => {
			a().due && e(A);
		}), t(T), t(m);
		var ee = l(m, 2), N = (e) => {
			var n = it(), r = U(n);
			ne(r, { name: "grip" }), t(n), u((e) => V(n, "title", e), [() => i.vb.t("Arraste, ou use ← →. Clique pra abrir o épico.")]), H(e, n);
		};
		M(ee, (e) => {
			c() || e(N);
		});
		var P = l(ee, 2), L = U(P);
		{
			let e = f(() => `${o}-${s()}`);
			se(L, {
				get for() {
					return h(e);
				},
				children: (e, t) => {
					y();
					var n = g();
					u((e) => b(n, e), [() => i.vb.t("Status")]), H(e, n);
				},
				$$slots: { default: !0 }
			});
		}
		var R = l(L, 2);
		{
			let e = f(() => `${o}-${s()}`), t = f(() => `${i.vb.t("Status")}: ${a().title}`);
			j(R, {
				get id() {
					return h(e);
				},
				get "aria-label"() {
					return h(t);
				},
				get value() {
					return a().status;
				},
				get items() {
					return h(ue);
				},
				onValueChange: (e) => (et(e) && Ce(a(), e, s()), !1)
			});
		}
		t(P), t(d), fe(d, (e, t) => xe?.(e, t), s), u((e, t, n, r) => {
			V(d, "data-board-task", a().id), V(d, "data-status", a().status), V(d, "draggable", !c()), F(d, 1, e), V(m, "data-epic", a().epicId), V(m, "aria-describedby", `${o}-keys`), F(m, 1, t), F(_, 1, n), b(v, a().title), F(P, 1, r);
		}, [
			() => te(pe("tw:relative tw:min-w-0 tw:rounded-control tw:border tw:border-border tw:bg-card tw:text-card-foreground tw:shadow-xs", c() && "tw:flex tw:flex-wrap tw:items-center", h(re) === a().id && "tw:opacity-50", a().status !== "done" && a().owner === i.room.me && "tw:ring-1 tw:ring-ring/20")),
			() => te(pe("tw:block tw:w-full tw:min-w-0 tw:flex-1 tw:space-y-2 tw:rounded-control tw:border-0 tw:bg-transparent tw:p-3 tw:text-left tw:font-sans tw:text-sm tw:text-card-foreground tw:outline-none tw:hover:bg-accent tw:focus-visible:ring-2 tw:focus-visible:ring-ring", !c() && "tw:pr-10")),
			() => te(pe("tw:block tw:break-words tw:font-medium", a().status === "done" && "tw:line-through")),
			() => te(pe("tw:min-w-32 tw:space-y-1 tw:p-3", !c() && "tw:border-t tw:border-border"))
		]), ie("dragstart", d, (e) => {
			e.target instanceof Element && e.target.closest("select") ? e.preventDefault() : (e.dataTransfer && (e.dataTransfer.setData("application/x-vibebook-task", a().id), e.dataTransfer.effectAllowed = "move", e.dataTransfer.setDragImage(e.currentTarget, 20, 20)), w(re, a().id, !0));
		}), ie("dragend", d, () => {
			w(re, null), w(z, null);
		}), n("click", m, () => i.onopen?.(a().epicId)), n("keydown", m, (e) => Ee(e, a(), s())), H(e, d);
	}, T = f(() => Ze(i.room, i.thread)), D = c(S(Qe())), O = c(""), N = c(null), L = c(""), R = c(""), z = c(null), re = c(null), B = c(S(s(() => h(T).targets.find((e) => e.id === h(T).scope) ?? h(T).targets.find((e) => e.id !== "main") ?? h(T).targets[0] ?? {
		id: i.thread,
		title: i.thread
	}))), oe = f(() => h(T).targets.some((e) => e.id === h(B).id)), ce = f(() => [...h(oe) ? [] : [{
		value: h(B).id,
		label: h(B).title,
		disabled: !0
	}], ...h(T).targets.map((e) => ({
		value: e.id,
		label: e.title
	}))]), ue = f(() => Xe.map((e) => ({
		value: e.value,
		label: i.vb.t(e.label)
	}))), de = f(() => h(T).groups.map((e) => ({
		...e,
		tasks: e.tasks.filter((e) => e.status !== "done")
	})).filter((e) => e.tasks.length)), me = f(() => h(T).tasks.filter((e) => e.owner === i.room.me && e.status !== "done")), _e = /* @__PURE__ */ new Map(), ve = 0, ye = !1, be = c(null);
	d(() => {
		ye = !0, ve++, _e.clear();
	});
	function xe(e, t) {
		return _e.set(t, e), { destroy() {
			_e.get(t) === e && _e.delete(t);
		} };
	}
	function Se(e) {
		try {
			if (i.send(e)) return w(L, ""), !0;
		} catch {}
		return w(L, i.vb.t("Não deu pra enviar agora. Tente de novo."), !0), !1;
	}
	function Ce(e, t, n) {
		if (e.status === t) return !0;
		let r = document.activeElement, i = r instanceof HTMLElement && _e.get(n)?.contains(r) ? r : null;
		return Se({
			t: "task.status",
			id: e.id,
			status: t
		}) ? (w(be, {
			id: e.id,
			status: t,
			generation: ++ve,
			...i ? { focus: {
				key: n,
				node: i,
				selector: i.matches("select") ? "select" : "[data-board-open]"
			} } : {}
		}, !0), !0) : !1;
	}
	m(() => {
		let e = h(be);
		if (!e) return;
		let t = [...i.room.roomTasks ?? [], ...i.room.epics.flatMap((e) => e.tasks)].find((t) => t.id === e.id);
		t ? t.status === e.status && (w(be, null), w(R, `${t.title}: ${i.vb.t(Xe.find((e) => e.value === t.status)?.label ?? t.status)}`), we(e)) : (w(be, null), we(e));
	});
	function we(e) {
		let t = e.focus;
		!t || document.activeElement !== t.node && document.activeElement !== document.body || _().then(() => {
			if (ye || e.generation !== ve || document.activeElement !== t.node && document.activeElement !== document.body) return;
			let n = _e.get(t.key)?.querySelector(t.selector) ?? h(N);
			n?.focus({ preventScroll: !0 }), n?.scrollIntoView({
				block: "nearest",
				inline: "nearest"
			});
		});
	}
	function Te(e) {
		if (e === "board" || e === "list") {
			w(D, e, !0), ve++, w(be, null);
			try {
				localStorage.setItem("vb.boardMode", e);
			} catch {}
		}
	}
	function Ee(e, t, n) {
		let r = e.key === "ArrowRight" ? $e(t.status, 1) : e.key === "ArrowLeft" ? $e(t.status, -1) : void 0;
		r && (e.preventDefault(), Ce(t, r, n));
	}
	function De(e, t) {
		e.preventDefault(), w(z, null);
		let n = e.dataTransfer?.getData("application/x-vibebook-task"), r = h(T).tasks.find((e) => e.id === n);
		w(re, null), r && Ce(r, t, `board:${r.id}`);
	}
	function Oe(e) {
		e.preventDefault(), h(O).trim() && (h(oe) ? Se({
			t: "task.add",
			epic: h(B).id,
			title: h(O).trim()
		}) && w(O, "") : w(L, i.vb.t("Escolha um épico."), !0));
	}
	var ke = ft(), Ae = U(ke), je = C(Ae, !0), Me = l(Ae, 2), Ne = (e) => {
		{
			let t = f(() => h(T).missingScope ? i.vb.t("Épico não encontrado.") : h(oe) ? h(L) : i.vb.t("Escolha um épico."));
			ge(e, {
				get title() {
					return h(t);
				},
				compact: !0
			});
		}
	};
	M(Me, (e) => {
		(h(T).missingScope || !h(oe) || h(L)) && e(Ne);
	});
	var Pe = l(Me, 2), Fe = C(Pe, !0), Ie = l(Pe, 2), Le = C(Ie, !0), Re = l(Ie, 2);
	{
		let e = (e, n = I) => {
			var a = x(), o = r(a), s = (e) => {
				var a = x(), o = r(a), s = (e) => {
					var n = ct(), r = U(n);
					A(r, 21, () => Xe, (e) => e.value, (e, n) => {
						let r = f(() => h(T).tasks.filter((e) => e.status === h(n).value));
						var a = st(), o = U(a), s = U(o, !0), c = l(s);
						he(c, {
							children: (e, t) => {
								y();
								var n = g();
								u(() => b(n, h(r).length)), H(e, n);
							},
							$$slots: { default: !0 }
						}), t(o);
						var d = l(o, 2);
						A(d, 21, () => h(r), (e) => e.id, (e, t) => {
							v(e, () => h(t), () => `board:${h(t).id}`, () => !1);
						}, (e) => {
							var t = ot(), r = C(t, !0);
							u((e) => b(r, e), [() => i.vb.t(h(n).value === "todo" ? "Nada a fazer." : "Arraste um card pra cá.")]), H(e, t);
						}), t(d), t(a), u((e, t, r) => {
							V(a, "data-lane", h(n).value), V(a, "aria-label", e), F(a, 1, t), b(s, r);
						}, [
							() => i.vb.t(h(n).label),
							() => te(pe("tw:min-w-0 tw:space-y-3 tw:rounded-surface tw:border tw:border-border tw:bg-muted/40 tw:p-3", h(z) === h(n).value && "tw:ring-2 tw:ring-ring")),
							() => i.vb.t(h(n).label)
						]), ie("dragover", a, (e) => {
							e.dataTransfer?.types.includes("application/x-vibebook-task") && (e.preventDefault(), w(z, h(n).value, !0));
						}), ie("dragleave", a, () => {
							w(z, null);
						}), ie("drop", a, (e) => De(e, h(n).value)), H(e, a);
					}), t(r), t(n), H(e, n);
				}, c = (e) => {
					var n = ut(), r = U(n), a = (e) => {
						var n = lt(), r = U(n), a = U(r, !0), o = l(a);
						he(o, {
							variant: "warning",
							children: (e, t) => {
								y();
								var n = g();
								u(() => b(n, h(me).length)), H(e, n);
							},
							$$slots: { default: !0 }
						}), t(r);
						var s = l(r, 2);
						A(s, 17, () => h(me), (e) => e.id, (e, t) => {
							v(e, () => h(t), () => `mine:${h(t).id}`, () => !0);
						}), t(n), u((e, t) => {
							V(n, "aria-label", e), b(a, t);
						}, [() => i.vb.t("Esperando você"), () => i.vb.t("Esperando você")]), H(e, n);
					};
					M(r, (e) => {
						h(me).length && e(a);
					});
					var o = l(r, 2);
					A(o, 17, () => h(de), (e) => e.id, (e, n) => {
						var r = lt(), i = U(r), a = U(i, !0), o = l(a);
						he(o, {
							children: (e, t) => {
								y();
								var r = g();
								u(() => b(r, h(n).tasks.length)), H(e, r);
							},
							$$slots: { default: !0 }
						}), t(i);
						var s = l(i, 2);
						A(s, 17, () => h(n).tasks, (e) => e.id, (e, t) => {
							v(e, () => h(t), () => `group:${h(t).id}`, () => !0);
						}), t(r), u(() => {
							V(r, "aria-label", h(n).title), b(a, h(n).title);
						}), H(e, r);
					}, (e) => {
						{
							let t = f(() => i.vb.t("Nenhuma tarefa aberta."));
							ee(e, { get title() {
								return h(t);
							} });
						}
					}), t(n), H(e, n);
				};
				M(o, (e) => {
					n() === "board" ? e(s) : e(c, -1);
				}), H(e, a);
			};
			M(o, (e) => {
				n() === h(D) && e(s);
			}), H(e, a);
		}, n = f(() => i.vb.t("Quadro de tarefas")), a = f(() => [{
			value: "board",
			label: i.vb.t("Quadro")
		}, {
			value: "list",
			label: i.vb.t("Lista")
		}]);
		ae(Re, {
			class: "tw:flex-1 tw:overflow-hidden",
			get label() {
				return h(n);
			},
			get items() {
				return h(a);
			},
			get value() {
				return h(D);
			},
			onValueChange: Te,
			children: e,
			$$slots: { default: !0 }
		});
	}
	var ze = l(Re, 2), Be = U(ze), Ve = U(Be);
	{
		let e = f(() => `${o}-title`);
		se(Ve, {
			get for() {
				return h(e);
			},
			children: (e, t) => {
				y();
				var n = g();
				u((e) => b(n, e), [() => i.vb.t("Nova tarefa")]), H(e, n);
			},
			$$slots: { default: !0 }
		});
	}
	var He = l(Ve, 2);
	{
		let e = f(() => `${o}-title`), t = f(() => i.vb.t("nova tarefa"));
		le(He, {
			get id() {
				return h(e);
			},
			get placeholder() {
				return h(t);
			},
			get ref() {
				return h(N);
			},
			set ref(e) {
				w(N, e, !0);
			},
			get value() {
				return h(O);
			},
			set value(e) {
				w(O, e, !0);
			}
		});
	}
	t(Be);
	var Ue = l(Be, 2), We = (e) => {
		var n = dt(), r = U(n);
		{
			let e = f(() => `${o}-epic`);
			se(r, {
				get for() {
					return h(e);
				},
				children: (e, t) => {
					y();
					var n = g();
					u((e) => b(n, e), [() => i.vb.t("Épico")]), H(e, n);
				},
				$$slots: { default: !0 }
			});
		}
		var a = l(r, 2);
		{
			let e = f(() => `${o}-epic`), t = f(() => !h(oe));
			j(a, {
				get id() {
					return h(e);
				},
				get "aria-invalid"() {
					return h(t);
				},
				get items() {
					return h(ce);
				},
				get value() {
					return h(B).id;
				},
				onValueChange: (e) => {
					let t = h(T).targets.find((t) => t.id === e);
					if (!t) return !1;
					w(B, t, !0), w(L, "");
				}
			});
		}
		t(n), H(e, n);
	};
	M(Ue, (e) => {
		h(T).scope || e(We);
	});
	var Ge = l(Ue, 2);
	{
		let e = f(() => !h(O).trim() || !h(oe));
		P(Ge, {
			type: "submit",
			get disabled() {
				return h(e);
			},
			children: (e, t) => {
				var n = tt(), a = r(n);
				ne(a, { name: "plus" });
				var o = l(a, 1, !0);
				u((e) => b(o, e), [() => i.vb.t("Nova tarefa")]), H(e, n);
			},
			$$slots: { default: !0 }
		});
	}
	t(ze), t(ke), u((e, t, n) => {
		V(ke, "data-board-scope", h(T).scope ?? "all"), V(ke, "aria-label", e), b(je, t), b(Fe, h(R)), V(Ie, "id", `${o}-keys`), b(Le, n);
	}, [
		() => i.vb.t("Quadro de tarefas"),
		() => h(T).title ?? (h(T).scope ? h(B).title : i.vb.t("Todos os épicos")),
		() => i.vb.t("Arraste, ou use ← →. Clique pra abrir o épico.")
	]), ie("submit", ze, Oe), H(e, ke), E();
}
B(["click", "keydown"]);
// svelte/Board.svelte
var mt = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy"
]);
function ht(e, t) {
	k(t, !0);
	let n = O(t, mt);
	var i = x(), a = r(i);
	Te(a, () => JSON.stringify([t.room.id, t.thread]), (e) => {
		pt(e, v(() => n));
	}), H(e, i), E();
}
// svelte/panels.ts
var gt = (e) => e.type.startsWith("image/") ? "img" : e.type.startsWith("audio/") ? "audio" : e.type === "text/html" ? "html" : e.type === "application/pdf" ? "pdf" : /\.md$/i.test(e.name) || e.type === "text/markdown" ? "md" : e.type === "text/plain" || e.type === "text/csv" ? "txt" : "other", _t = (e) => e > 1e6 ? `${(e / 1e6).toFixed(1)} MB` : `${Math.max(1, Math.round(e / 1e3))} KB`, vt = o("<button type=\"button\"> <small> </small></button>"), yt = o("<div class=\"ftabs\"></div>"), bt = o("<div class=\"fcrumb\"><button type=\"button\" class=\"ghost\"> </button><b><!> </b></div>"), xt = o("<button type=\"button\" class=\"ftile fdir\"><div class=\"thumb\"></div> <b> </b><small> </small></button>"), St = o("<img loading=\"lazy\"/>"), Ct = o("<a class=\"ftile\" target=\"_blank\" rel=\"noopener\"><div class=\"thumb\"><!></div> <b> </b><small> </small> <button type=\"button\" data-pin-kind=\"file\"></button></a>"), wt = o("<div class=\"empty\"> </div>"), Tt = o("<!> <!> <div class=\"fgrid\"><!> <!></div> <!>", 1);
function Et(e, i) {
	k(i, !0);
	let a = [
		["all", "Tudo"],
		["img", "Imagens"],
		["md", "Markdown"],
		["txt", "Texto e CSV"],
		["html", "HTML"],
		["pdf", "PDF"],
		["audio", "Áudios"],
		["other", "Outros"]
	], o = c("all"), s = c(""), d = f(() => i.room.files || []), p = f(() => {
		let e = { all: h(d).length };
		for (let t of h(d)) {
			let n = gt(t);
			e[n] = (e[n] || 0) + 1;
		}
		return e;
	}), g = f(() => h(p)[h(o)] ? h(o) : "all"), _ = f(() => h(d).filter((e) => h(g) === "all" || gt(e) === h(g))), v = (e) => e.name.includes("/") ? e.name.slice(0, e.name.lastIndexOf("/")) : "", y = f(() => h(s) && h(_).some((e) => v(e) === h(s) || v(e).startsWith(h(s) + "/")) ? h(s) : ""), S = f(() => h(y) ? h(y) + "/" : "");
	m(() => {
		h(p)[h(o)] || w(o, "all"), h(s) && h(y) !== h(s) && w(s, "");
	});
	function T(e, t) {
		w(s, t, !0);
		let n = e.currentTarget.closest("#filesPane");
		n && (n.scrollTop = 0);
	}
	let D = f(() => {
		let e = /* @__PURE__ */ new Map(), t = [];
		for (let n of h(_)) {
			let r = v(n);
			if (r === h(y)) t.push(n);
			else if (r.startsWith(h(S))) {
				let t = r.slice(h(S).length).split("/")[0];
				e.set(t, (e.get(t) || 0) + 1);
			}
		}
		let n = {};
		if (h(y)) for (let e of t) n[e.name] = (n[e.name] || 0) + 1;
		return {
			dirs: [...e].sort((e, t) => e[0].localeCompare(t[0])),
			list: h(y) ? t.filter((e, n) => t.findIndex((t) => t.name === e.name) === n) : t,
			versions: n
		};
	}), O = (e) => `/api/books/${i.room.id}/files/${e.id}`, j = (e) => i.room.pins?.find((t) => t.kind === "file" && t.ref === e.id);
	function ee(e, t) {
		e.preventDefault(), e.stopPropagation();
		let n = j(t);
		i.send(n ? {
			t: "pin.del",
			id: n.id
		} : {
			t: "pin.add",
			kind: "file",
			ref: t.id
		});
	}
	var N = x(), P = r(N), I = (e) => {
		var s = Tt(), c = r(s), d = (e) => {
			var r = yt();
			A(r, 21, () => a.filter(([e]) => h(p)[e]), Ce, (e, r) => {
				var a = f(() => ye(h(r), 2));
				let s = () => h(a)[0], c = () => h(a)[1];
				var d = vt();
				let m;
				var _ = U(d), v = l(_), y = C(v, !0);
				t(d), u((e) => {
					m = F(d, 1, "ftab", null, m, { on: s() === h(g) }), V(d, "data-fkind", s()), b(_, `${e ?? ""} `), b(y, h(p)[s()]);
				}, [() => i.vb.t(c())]), n("click", d, () => w(o, s(), !0)), H(e, d);
			}), t(r), H(e, r);
		};
		M(c, (e) => {
			h(p).all > 1 && e(d);
		});
		var m = l(c, 2), _ = (e) => {
			var r = bt(), a = U(r), o = C(a), s = l(a), c = U(s);
			z(c, () => i.vb.icon("folder", 14));
			var d = l(c);
			t(s), t(r), u((e, t) => {
				V(a, "data-fdir", e), b(o, `← ${t ?? ""}`), b(d, ` ${h(y) ?? ""}/`);
			}, [() => h(y).includes("/") ? h(y).slice(0, h(y).lastIndexOf("/")) : "", () => i.vb.t("voltar")]), n("click", a, (e) => T(e, h(y).includes("/") ? h(y).slice(0, h(y).lastIndexOf("/")) : "")), H(e, r);
		};
		M(m, (e) => {
			h(y) && e(_);
		});
		var v = l(m, 2), E = U(v);
		A(E, 17, () => h(D).dirs, Ce, (e, r) => {
			var a = f(() => ye(h(r), 2));
			let o = () => h(a)[0], s = () => h(a)[1];
			var c = xt(), d = U(c);
			z(d, () => i.vb.icon("folder", 34), !0), t(d);
			var p = l(d, 2), m = C(p), g = l(p), _ = C(g, !0);
			t(c), u((e) => {
				V(c, "data-fdir", h(S) + o()), b(m, `${o() ?? ""}/`), b(_, e);
			}, [() => s() === 1 ? i.vb.t("1 arquivo") : i.vb.t("{n} arquivos", { n: s() })]), n("click", c, (e) => T(e, h(S) + o())), H(e, c);
		});
		var k = l(E, 2);
		A(k, 17, () => h(D).list, (e) => e.id, (e, a) => {
			var o = Ct(), s = U(o), c = U(s), d = (e) => {
				var t = St();
				u((e) => {
					V(t, "src", e), V(t, "alt", h(a).name);
				}, [() => O(h(a))]), H(e, t);
			}, p = f(() => h(a).type.startsWith("image/")), m = (e) => {
				var t = x(), n = r(t);
				z(n, () => i.vb.icon(h(a).type === "text/html" ? "globe" : h(a).type.startsWith("audio/") ? "mic" : "file", 30)), H(e, t);
			};
			M(c, (e) => {
				h(p) ? e(d) : e(m, -1);
			}), t(s);
			var g = l(s, 2), _ = C(g, !0), v = l(g), y = C(v), w = l(v, 2);
			let T;
			z(w, () => i.vb.icon("pin", 14), !0), t(w), t(o), u((e, t, n, r, i, s, c, l, u, d) => {
				V(o, "href", e), V(o, "title", h(a).name), V(o, "data-view", t), V(o, "data-name", h(a).name), b(_, n), b(y, `${r ?? ""} · ${i ?? ""} · ${s ?? ""}`), T = F(w, 1, "ghost pinBtn", null, T, { on: c }), V(w, "data-pin-ref", h(a).id), V(w, "title", l), V(w, "aria-label", u), V(w, "aria-pressed", d);
			}, [
				() => O(h(a)),
				() => h(a).type.startsWith("image/") ? "img" : "frame",
				() => h(a).name.slice(h(S).length),
				() => i.vb.name(h(a).author),
				() => i.vb.ago(h(a).ts),
				() => h(D).versions[h(a).name] > 1 ? i.vb.t("{n} versões", { n: h(D).versions[h(a).name] }) : _t(h(a).size),
				() => !!j(h(a)),
				() => i.vb.t(j(h(a)) ? "Desafixar" : "Fixar na lateral"),
				() => i.vb.t(j(h(a)) ? "Desafixar" : "Fixar na lateral"),
				() => !!j(h(a))
			]), n("click", w, (e) => ee(e, h(a))), H(e, o);
		}), t(v);
		var N = l(v, 2), P = (e) => {
			var t = wt(), n = C(t, !0);
			u((e) => b(n, e), [() => i.vb.t("Nada aqui.")]), H(e, t);
		};
		M(N, (e) => {
			!h(D).list.length && !h(D).dirs.length && e(P);
		}), H(e, s);
	}, L = (e) => {
		var t = wt(), n = C(t, !0);
		u((e) => b(n, e), [() => i.vb.t("Cole uma imagem no chat (Cmd+V), arraste um arquivo ou use o clipe. Tudo que for enviado neste vibebook fica aqui.")]), H(e, t);
	};
	M(P, (e) => {
		h(d).length ? e(I) : e(L, -1);
	}), H(e, N), E();
}
B(["click"]);
// node_modules/zod/v4/core/util.js
function Dt(e) {
	let t = Object.values(e).filter((e) => typeof e == "number");
	return Object.entries(e).filter(([e, n]) => t.indexOf(+e) === -1).map(([e, t]) => t);
}
function Ot(e, t) {
	return typeof t == "bigint" ? t.toString() : t;
}
var kt = class {
	constructor(e) {
		this._getter = e, this._value = void 0;
	}
	get value() {
		let e = this._getter;
		return e !== void 0 && (this._value = e(), this._getter = void 0), this._value;
	}
};
function At(e) {
	return new kt(e);
}
function jt(e) {
	return e == null;
}
function Mt(e) {
	let t = +!!e.startsWith("^"), n = e.endsWith("$") ? e.length - 1 : e.length;
	return e.slice(t, n);
}
function Nt(e, t, n) {
	Object.defineProperty(e, t, {
		value: n,
		writable: !0,
		enumerable: !0,
		configurable: !0
	});
}
function Pt(e) {
	let t = Object.getOwnPropertyDescriptor(e, "shape");
	return t?.get ? t.get.raw : t?.value;
}
function Ft(e) {
	return Pt(e._zod.def) ?? e._zod.def.shape;
}
function It(e, t, n) {
	Object.defineProperty(e, t, {
		get() {
			let e = n();
			return Nt(this, t, e), e;
		},
		enumerable: !0,
		configurable: !0
	});
}
function Lt(e, t, n) {
	t in e ? Nt(e, t, n) : e[t] = n;
}
function Rt(e, t, n, r) {
	let i = Ft(t);
	for (let a of n) {
		let n = Object.getOwnPropertyDescriptor(i, a);
		n.enumerable && (n.get ? It(e, a, () => {
			let e = t._zod.def.shape[a];
			return r ? r(e, a) : e;
		}) : Lt(e, a, r ? r(n.value, a) : n.value));
	}
}
function zt(e, t) {
	for (let n of Reflect.ownKeys(t)) {
		let r = Object.getOwnPropertyDescriptor(t, n);
		r.enumerable && (r.get ? It(e, n, () => t[n]) : Lt(e, n, r.value));
	}
}
function Bt(...e) {
	let t = {};
	for (let n of e) {
		let e = Object.getOwnPropertyDescriptors(n);
		Object.assign(t, e);
	}
	return Object.defineProperties({}, t);
}
var Vt = "captureStackTrace" in Error ? Error.captureStackTrace : (...e) => {};
function Ht(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function Ut(e) {
	if (Ht(e) === !1) return !1;
	let t = e.constructor;
	if (t === void 0 || typeof t != "function") return !0;
	let n = t.prototype;
	return Ht(n) !== !1 && Object.prototype.hasOwnProperty.call(n, "isPrototypeOf") !== !1;
}
var Wt = /* @__PURE__*/ new Set([
	"string",
	"number",
	"symbol"
]);
function Gt(e) {
	return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function Kt(e, t, n) {
	let r = new e._zod.constr(t ?? e._zod.def);
	return (!t || n?.parent) && (r._zod.parent = e), r;
}
function qt(e) {
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
function Jt(e) {
	return Object.keys(e).filter((t) => e[t]._zod.optin !== void 0 && e[t]._zod.optout === "optional");
}
function Yt(e, t) {
	if (!Ut(t)) throw Error("Invalid input to extend: expected a plain object");
	let n = e._zod.def.checks;
	if (n && n.length > 0) {
		let n = Ft(e);
		for (let e of Reflect.ownKeys(t)) if (Object.getOwnPropertyDescriptor(n, e) !== void 0) throw Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
	}
	return Kt(e, Bt(e._zod.def, { shape: Xt(e, t) }));
}
function Xt(e, t) {
	let n = {};
	return Rt(n, e, Reflect.ownKeys(Ft(e))), zt(n, t), n;
}
function Zt(e, t = 0) {
	if (e.aborted === !0) return !0;
	for (let n = t; n < e.issues.length; n++) if (e.issues[n]?.continue !== !0) return !0;
	return !1;
}
function Qt(e, t = 0) {
	if (e.aborted === !0) return !0;
	for (let n = t; n < e.issues.length; n++) if (e.issues[n]?.continue === !1) return !0;
	return !1;
}
function $t(e, t) {
	return t.map((t) => {
		var n;
		return (n = t).path ?? (n.path = []), t.path.unshift(e), t;
	});
}
function en(e) {
	return typeof e == "string" ? e : e?.message;
}
function tn(e) {
	let t = [];
	for (let n of e ?? []) {
		let e = n._zod.def;
		if (!/_(length|size)$|_equals$/.test(e.check)) break;
		let r = e.maximum ?? e.length ?? e.size;
		r >= 0 && t.push([r, n]);
	}
	return t;
}
function nn(e, t, n) {
	var r;
	for (let i = t; i < e.length; i++) (r = e[i]).schema ?? (r.schema = n);
}
function rn(e, t, n) {
	var r;
	let i = e.inst?._zod?.traits;
	i?.has("$ZodType") && (i.has("$ZodCheck") ? (r = e).schema ?? (r.schema = e.inst) : e.schema = e.inst);
	let a = e.schema === e.inst ? void 0 : e.schema?._zod.def?.error, o = e.message ? e.message : en(e.inst?._zod.def?.error?.(e)) ?? en(a?.(e)) ?? en(t?.error?.(e)) ?? en(n.customError?.(e)) ?? en(n.localeError?.(e)) ?? "Invalid input", s = {};
	for (let t of Object.keys(e)) t !== "inst" && t !== "schema" && t !== "continue" && t !== "input" && t !== "__proto__" && (s[t] = e[t]);
	return s.path ??= [], s.message = o, t?.reportInput && (s.input = e.input), s;
}
var an = /[\uD800-\uDBFF]/;
function on(e) {
	let t = e.length;
	if (!an.test(e)) return t;
	let n = t;
	for (let r = 0; r < t - 1; r++) (e.charCodeAt(r) & 64512) == 55296 && (e.charCodeAt(r + 1) & 64512) == 56320 && (n--, r++);
	return n;
}
function sn(e) {
	return Array.isArray(e) ? "array" : typeof e == "string" ? "string" : "unknown";
}
function cn(e, t) {
	for (let n in t) {
		let r = Object.getOwnPropertyDescriptor(t, n);
		r.get ? Object.defineProperty(e, n, {
			...r,
			enumerable: !1
		}) : dn(e, n, r.value);
	}
}
function ln(e, t, n, r = !0) {
	return Object.defineProperty(e, t, {
		configurable: !0,
		writable: !0,
		enumerable: r,
		value: n
	}), n;
}
function un(e, t, n) {
	return ln(e, t, n, !1);
}
function dn(e, t, n) {
	Object.defineProperty(e, t, {
		configurable: !0,
		get() {
			return this == null ? n : ln(this, t, n.bind(this));
		},
		set(e) {
			ln(this, t, e);
		}
	});
}
function fn(e, t) {
	let n = Object.getPrototypeOf(e);
	return t in n ? void 0 : n;
}
var pn, mn = !1, hn = {
	configurable: !0,
	get() {
		mn = !0;
	}
};
function gn(e, t, n) {
	let r = Object.getPrototypeOf(e._zod);
	t in r && pn !== e._zod ? pn = void 0 : (pn = e._zod, Object.defineProperty(r, t, {
		configurable: !0,
		get() {
			Object.defineProperty(this, t, hn);
			let e = mn;
			mn = !1;
			try {
				let r = n(this);
				return mn ? delete this[t] : Object.defineProperty(this, t, {
					configurable: !0,
					writable: !0,
					value: r
				}), mn ||= e, r;
			} catch (n) {
				throw delete this[t], mn ||= e, n;
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
function _n(e, t, n, r) {
	let i = fn(e, t);
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
// node_modules/zod/v4/core/core.js
var vn, yn = {
	value: void 0,
	enumerable: !1
}, bn = "captureStackTrace" in Error ? Error : null;
function xn(e) {
	let t = bn;
	if (t) {
		let n = t.stackTraceLimit;
		if (typeof n == "number") {
			try {
				t.stackTraceLimit = 0;
			} catch {
				return bn = null, new e();
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
function W(e, t, n, r) {
	let i = {};
	function a(e) {
		this.def = e, this.constr = d, this.traits = /* @__PURE__ */ new Set();
	}
	a.prototype = i;
	let o = n, s = o && /* @__PURE__ */ new WeakSet();
	function c(n, r) {
		if (!n._zod) {
			yn.value = new a(r);
			try {
				Object.defineProperty(n, "_zod", yn);
			} finally {
				yn.value = void 0;
			}
		} else if (n._zod.traits.has(e)) return;
		if (n._zod.traits.add(e), t(n, r), s) {
			let e = Object.getPrototypeOf(n), t = n._zod.constr.prototype, r = e;
			for (; r && r !== t;) r = Object.getPrototypeOf(r);
			let i = r ?? e;
			s.has(i) || (s.add(i), cn(i, o));
		}
		let i = d.prototype;
		for (let e in i) Object.prototype.hasOwnProperty.call(i, e) && (e in n || (n[e] = i[e].bind(n)));
	}
	let l = r?.Parent ?? Object;
	class u extends l {}
	Object.defineProperty(u, "name", { value: e });
	function d(e) {
		let t = r?.Parent ? xn(u) : this;
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
var Sn = class extends Error {
	constructor() {
		super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
	}
};
(vn = globalThis).__zod_globalConfig ?? (vn.__zod_globalConfig = {});
var Cn = globalThis.__zod_globalConfig;
function wn(e) {
	return e && Object.assign(Cn, e), Cn;
}
// node_modules/zod/v4/core/errors.js
function Tn() {
	let e = this._zod;
	return e.message ??= JSON.stringify(e.def, Ot, 2), e.message;
}
function En(e) {
	this._zod.message = e;
}
var Dn = {
	get: Tn,
	set: En,
	enumerable: !0,
	configurable: !0
}, On = {
	value: void 0,
	enumerable: !1
}, kn = /* @__PURE__ */ new WeakSet([Object.prototype, Error.prototype]), An = /* @__PURE__ */ W("$ZodError", (e, t) => {
	e.name = "$ZodError", On.value = t, Object.defineProperty(e, "issues", On), On.value = void 0, Object.defineProperty(e, "message", Dn);
	let n = Object.getPrototypeOf(e);
	kn.has(n) || (kn.add(n), Object.defineProperty(n, "toString", {
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
}, void 0, { Parent: Error }), jn = /* @__PURE__*/ ((e) => {
	let t = (n, r, i, a) => {
		let o = i ? {
			...i,
			async: !1
		} : { async: !1 }, s = n._zod.run({
			value: r,
			issues: []
		}, o);
		if (s instanceof Promise) throw new Sn();
		if (s.issues.length) {
			let n = new ((a?.Err) ?? e)(s.issues.map((e) => rn(e, o, wn())));
			throw Vt(n, a?.callee ?? t), n;
		}
		return s.value;
	};
	return t;
})(An), Mn = /* @__PURE__*/ ((e) => {
	let t = async (n, r, i, a) => {
		let o = i ? {
			...i,
			async: !0
		} : { async: !0 }, s = n._zod.run({
			value: r,
			issues: []
		}, o);
		if (s instanceof Promise && (s = await s), s.issues.length) {
			let n = new ((a?.Err) ?? e)(s.issues.map((e) => rn(e, o, wn())));
			throw Vt(n, a?.callee ?? t), n;
		}
		return s.value;
	};
	return t;
})(An), Nn = /* @__PURE__*/ ((e) => (t, n, r) => {
	let i = r ? {
		...r,
		async: !1
	} : { async: !1 }, a = t._zod.run({
		value: n,
		issues: []
	}, i);
	if (a instanceof Promise) throw new Sn();
	return a.issues.length ? Pn(e, a.issues, i) : {
		success: !0,
		data: a.value
	};
})(An);
function Pn(e, t, n) {
	let r;
	return {
		success: !1,
		get error() {
			return r || (r = new e(t.map((e) => rn(e, n, wn()))), t = void 0, n = void 0), r;
		},
		set error(e) {
			r = e, t = void 0, n = void 0;
		}
	};
}
var Fn = /* @__PURE__*/ ((e) => async (t, n, r) => {
	let i = r ? {
		...r,
		async: !0
	} : { async: !0 }, a = t._zod.run({
		value: n,
		issues: []
	}, i);
	return a instanceof Promise && (a = await a), a.issues.length ? Pn(e, a.issues, i) : {
		success: !0,
		data: a.value
	};
})(An), In = /^[\s\S]{0,}$/, Ln = /^-?\d+(?:\.\d+)?$/, Rn = /^(?:true|false)$/i, zn = /*@__PURE__*/ W("$ZodCheck", (e, t) => {
	var n;
	e._zod ??= {}, e._zod.def = t, (n = e._zod).onattach ?? (n.onattach = []);
}), Bn = (e) => {
	let t = e.value;
	return !jt(t) && t.length !== void 0;
}, Vn = /*@__PURE__*/ W("$ZodCheckMaxLength", (e, t) => {
	var n;
	zn.init(e, t), (n = e._zod.def).when ?? (n.when = Bn), e._zod.check = (n) => {
		let r = n.value, i = r.length;
		if ((typeof r == "string" && i > t.maximum ? on(r) : i) <= t.maximum) return;
		let a = sn(r);
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
}), Hn = /*@__PURE__*/ W("$ZodCheckMinLength", (e, t) => {
	var n;
	zn.init(e, t), (n = e._zod.def).when ?? (n.when = Bn), e._zod.check = (n) => {
		let r = n.value, i = r.length;
		if ((typeof r == "string" && i >= t.minimum && i < t.minimum * 2 ? on(r) : i) >= t.minimum) return;
		let a = sn(r);
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
}), Un = /*@__PURE__*/ W("$ZodCheckStartsWith", (e, t) => {
	zn.init(e, t);
	let n = RegExp(`^${Gt(t.prefix)}.*`);
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
}), Wn = {
	major: 4,
	minor: 6,
	patch: 7
}, Gn = /*@__PURE__*/ W("$ZodType", (e, t) => {
	var n;
	e ??= {}, e._zod.def = t, e._zod.bag = e._zod.bag || {}, e._zod.version = Wn;
	let r = e._zod.def.checks, i = e._zod.traits.has("$ZodCheck") ? [e, ...r ?? []] : r?.length ? [...r] : [];
	for (let t of i) for (let n of t._zod.onattach) n(e);
	if (i.length === 0) (n = e._zod).deferred ?? (n.deferred = []), e._zod.deferred?.push(() => {
		e._zod.run = e._zod.parse;
	});
	else {
		let t = (t, n, r) => {
			if (t.memo) return t;
			let i = Zt(t), a;
			for (let o of n) {
				if (o._zod.def.when) {
					if (Qt(t) || !o._zod.def.when(t)) continue;
				} else if (i) continue;
				let n = t.issues.length, s = o._zod.check(t);
				if (s instanceof Promise && r?.async === !1) throw new Sn();
				if (a || s instanceof Promise) a = (a ?? Promise.resolve()).then(async () => {
					await s, t.issues.length !== n && (nn(t.issues, n, e), i ||= Zt(t, n));
				});
				else {
					if (t.issues.length === n) continue;
					nn(t.issues, n, e), i ||= Zt(t, n);
				}
			}
			return a ? a.then(() => t) : t;
		}, n = (n, r, a) => {
			if (Zt(n)) return n.aborted = !0, n;
			let o = t(r, i, a);
			if (o instanceof Promise) {
				if (a.async === !1) throw new Sn();
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
				if (a.async === !1) throw new Sn();
				return o.then((e) => t(e, i, a));
			}
			return t(o, i, a);
		};
	}
}, {
	get "~standard"() {
		return un(this, "~standard", Jn(this));
	},
	set "~standard"(e) {
		ln(this, "~standard", e);
	}
}), Kn = (e, t) => e.issues.length ? { issues: e.issues.map((e) => rn(e, t, wn())) } : { value: e.value };
async function qn(e, t) {
	let n = { async: !0 };
	return Kn(await e._zod.run({
		value: t,
		issues: []
	}, n), n);
}
function Jn(e) {
	return {
		validate: (t) => {
			let n = { async: !1 };
			try {
				let r = e._zod.run({
					value: t,
					issues: []
				}, n);
				if (!(r instanceof Promise)) return Kn(r, n);
			} catch {}
			return qn(e, t);
		},
		vendor: "zod",
		version: 1
	};
}
var Yn = /*@__PURE__*/ W("$ZodString", (e, t) => {
	Gn.init(e, t), e._zod.pattern = t.pattern ?? In, e._zod.parse = (n, r) => {
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
}), Xn = /*@__PURE__*/ W("$ZodNumber", (e, t) => {
	Gn.init(e, t), e._zod.pattern = Ln, e._zod.parse = (n, r) => {
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
}), Zn = /*@__PURE__*/ W("$ZodBoolean", (e, t) => {
	Gn.init(e, t), e._zod.pattern = Rn, e._zod.parse = (n, r) => {
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
});
function Qn(e, t) {
	let n = tn(e._zod.def.checks);
	if (!n.length) return;
	let r = Math.min(...n.map((e) => e[0])), i = e._zod.parse;
	e._zod.parse = (n, a) => {
		let o = t(n.value);
		if (o > r && !a?.skipChecks && a?.direction !== "backward") {
			for (let [t, r] of tn(e._zod.def.checks)) if (o > t && r._zod.def.when(n)) {
				let t = n.issues.length;
				return r._zod.check(n), n.issues[t].continue = !1, nn(n.issues, t, e), n;
			}
		}
		return i(n, a);
	};
}
var $n = (e) => Array.isArray(e) ? e.length : -1;
function er(e, t, n) {
	e.issues.length && t.issues.push(...$t(n, e.issues)), t.value[n] = e.value;
}
var tr = /*@__PURE__*/ W("$ZodArray", (e, t) => {
	Gn.init(e, t);
	let n = Cn.memoizer;
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
			if (c instanceof Promise) o.push(c.then((t) => er(t, r, e)));
			else if (er(c, r, e), s && c.issues.length !== 0 && Zt(c)) break;
		}
		return o.length ? Promise.all(o).then(() => r) : r;
	}, Qn(e, $n);
});
function nr(e, t, n, r, i, a) {
	let o = n in r, s = a === "optional";
	if (o || !s || i !== "optional") {
		if (e.issues.length) {
			if (i !== void 0 && s && !o) return;
			t.issues.push(...$t(n, e.issues));
		}
		!o && i === void 0 ? e.issues.length || t.issues.push({
			code: "invalid_type",
			expected: "nonoptional",
			input: void 0,
			path: [n]
		}) : e.value === void 0 ? (o || i === "defaulted" && !s) && (t.value[n] = void 0) : t.value[n] = e.value;
	}
}
var rr = [];
function ir(e) {
	let t = Object.keys(e.shape), n = Object.getOwnPropertySymbols(e.shape), r = n.length ? n : rr, i = r.length ? [...t, ...r] : t;
	for (let t of i) if (!e.shape?.[t]?._zod?.traits?.has("$ZodType")) throw Error(`Invalid element at key "${String(t)}": expected a Zod schema`);
	let a = Jt(e.shape);
	return {
		...e,
		allKeys: i,
		symbolKeys: r,
		keySet: new Set(t),
		numKeys: t.length,
		optionalKeys: new Set(a)
	};
}
function ar(e, t, n, r, i, a, o) {
	let s = [], c = i.keySet, l = i.catchall._zod, u = l.def.type, d = l.optin, f = l.optout, p = 0;
	for (let i in t) {
		if (o && n.issues.length !== p) {
			if (Zt(n, p)) break;
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
		a instanceof Promise ? e.push(a.then((e) => nr(e, n, i, t, d, f))) : nr(a, n, i, t, d, f);
	}
	return s.length && n.issues.push({
		code: "unrecognized_keys",
		keys: s,
		input: t,
		inst: a,
		continue: !0
	}), e.length ? Promise.all(e).then(() => n) : n;
}
var or = /*@__PURE__*/ W("$ZodObject", (e, t) => {
	Gn.init(e, t);
	let n = Object.getOwnPropertyDescriptor(t, "shape"), r = n?.get ? n.get.raw : t.shape ?? {};
	if (r) {
		let e = () => {
			let n = { ...r };
			return Object.defineProperty(t, "shape", { value: n }), e.raw = n, n;
		};
		e.raw = r, Object.defineProperty(t, "shape", { get: e });
	}
	let i = At(() => ir(t));
	gn(e, "propValues", (e) => {
		let t = e.def.shape, n = {};
		for (let e in t) {
			let r = t[e]._zod;
			if (r.values) {
				Object.prototype.hasOwnProperty.call(n, e) || Nt(n, e, /* @__PURE__ */ new Set());
				for (let t of r.values) n[e].add(t);
				r.optin !== void 0 && n[e].add(void 0);
			}
		}
		return n;
	});
	let a = Ht, o = t.catchall, s, c = Cn.memoizer;
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
				if (Zt(t, f)) break;
				f = t.issues.length;
			}
			if (e === "__proto__") continue;
			let i = u[e], a = i._zod.optin, o = i._zod.optout, s = i._zod.run({
				value: r[e],
				issues: []
			}, n);
			s instanceof Promise ? l.push(s.then((n) => nr(n, t, e, r, a, o))) : nr(s, t, e, r, a, o);
		}
		return o ? ar(l, r, t, n, i.value, e, d === !0) : l.length ? Promise.all(l).then(() => t) : t;
	};
});
function sr(e, t, n, r) {
	for (let n of e) if (n.issues.length === 0) return t.value = n.value, t;
	let i = e.filter((e) => !Zt(e));
	return i.length === 1 ? (t.value = i[0].value, i[0]) : (t.issues.push({
		code: "invalid_union",
		input: t.value,
		inst: n,
		errors: e.map((e) => e.issues.map((e) => rn(e, r, wn())))
	}), t);
}
var cr = /*@__PURE__*/ W("$ZodUnion", (e, t) => {
	Gn.init(e, t), gn(e, "optin", (e) => e.def.options.some((e) => e._zod.optin === "defaulted") ? "defaulted" : e.def.options.some((e) => e._zod.optin !== void 0) ? "optional" : void 0), gn(e, "optout", (e) => e.def.options.some((e) => e._zod.optout === "optional") ? "optional" : void 0), gn(e, "values", (e) => {
		if (e.def.options.every((e) => e._zod.values)) return new Set(e.def.options.flatMap((e) => Array.from(e._zod.values)));
	}), gn(e, "pattern", (e) => {
		if (e.def.options.every((e) => e._zod.pattern)) {
			let t = e.def.options.map((e) => e._zod.pattern);
			return RegExp(`^(${t.map((e) => Mt(e.source)).join("|")})$`);
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
		return a ? Promise.all(o).then((t) => sr(t, r, e, i)) : sr(o, r, e, i);
	};
});
function lr(e) {
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
var ur = /*@__PURE__*/ W("$ZodDiscriminatedUnion", (e, t) => {
	t.inclusive = !1, cr.init(e, t);
	let n = e._zod.parse;
	gn(e, "propValues", (e) => {
		let t = {}, n = 0;
		for (let r of e.def.options) {
			let i = r._zod.propValues;
			if (!i || Object.keys(i).length === 0) throw Error(`Invalid discriminated union option at index "${e.def.options.indexOf(r)}"`);
			i[e.def.discriminator]?.has(void 0) && n++;
			for (let [e, n] of Object.entries(i)) {
				Object.prototype.hasOwnProperty.call(t, e) || Nt(t, e, /* @__PURE__ */ new Set());
				for (let r of n) t[e].add(r);
			}
		}
		return !e.def.unionFallback && n > 1 && t[e.def.discriminator]?.delete(void 0), t;
	}), t.options.forEach((e, n) => {
		let r = Pt(e._zod.def);
		if (r && !Object.prototype.hasOwnProperty.call(r, t.discriminator)) throw Error(`Invalid discriminated union option at index "${n}"`);
	});
	let r = At(() => lr(t));
	e._zod.parse = (i, a) => {
		let o = i.value;
		if (!Ht(o)) return i.issues.push({
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
}), dr = /*@__PURE__*/ W("$ZodEnum", (e, t) => {
	Gn.init(e, t);
	let n = Dt(t.entries), r = new Set(n);
	e._zod.values = r, gn(e, "pattern", (e) => {
		let t = Dt(e.def.entries).filter((e) => Wt.has(typeof e));
		return RegExp(t.length ? `^(${t.map((e) => Gt(e.toString())).join("|")})$` : "^[^\\s\\S]$");
	}), e._zod.parse = (t, i) => {
		let a = t.value;
		return r.has(a) || t.issues.push({
			code: "invalid_value",
			values: n,
			input: a,
			inst: e
		}), t;
	};
}), fr = /*@__PURE__*/ W("$ZodLiteral", (e, t) => {
	Gn.init(e, t);
	let n = new Set(t.values);
	e._zod.values = n, gn(e, "pattern", (e) => {
		let t = e.def.values;
		return RegExp(t.length ? `^(${t.map((e) => typeof e == "string" ? Gt(e) : e ? Gt(e.toString()) : String(e)).join("|")})$` : "^[^\\s\\S]$");
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
function pr(e, t) {
	return e.value = t.issues.length ? void 0 : t.value, e;
}
var mr = /*@__PURE__*/ W("$ZodOptional", (e, t) => {
	Gn.init(e, t), gn(e, "optin", (e) => e.def.innerType._zod.optin === "defaulted" ? "defaulted" : "optional"), e._zod.optout = "optional", gn(e, "values", (e) => {
		let t = e.def.innerType._zod.values;
		return t ? /* @__PURE__ */ new Set([...t, void 0]) : void 0;
	}), gn(e, "pattern", (e) => {
		let t = e.def.innerType._zod.pattern;
		return t ? RegExp(`^(${Mt(t.source)})?$`) : void 0;
	}), e._zod.parse = (e, n) => {
		if (e.value === void 0) {
			if (t.innerType._zod.optin !== "defaulted") return e;
			let r = t.innerType._zod.run({
				value: e.value,
				issues: []
			}, n);
			return r instanceof Promise ? r.then((t) => pr(e, t)) : pr(e, r);
		}
		return t.innerType._zod.run(e, n);
	};
}), hr = /*@__PURE__*/ W("$ZodNullable", (e, t) => {
	Gn.init(e, t), gn(e, "optin", (e) => e.def.innerType._zod.optin), gn(e, "optout", (e) => e.def.innerType._zod.optout), gn(e, "pattern", (e) => {
		let t = e.def.innerType._zod.pattern;
		return t ? RegExp(`^(${Mt(t.source)}|null)$`) : void 0;
	}), gn(e, "values", (e) => e.def.innerType._zod.values ? /* @__PURE__ */ new Set([...e.def.innerType._zod.values, null]) : void 0), e._zod.parse = (e, n) => e.value === null ? e : t.innerType._zod.run(e, n);
});
// node_modules/zod/v4/core/api.js
function gr(e) {
	return e.checks &&= [...e.checks], e;
}
// @__NO_SIDE_EFFECTS__
function _r(e, t) {
	return new e(gr({
		type: "string",
		...qt(t)
	}));
}
// @__NO_SIDE_EFFECTS__
function vr(e, t) {
	return new e(gr({
		type: "number",
		checks: [],
		...qt(t)
	}));
}
// @__NO_SIDE_EFFECTS__
function yr(e, t) {
	return new e({
		type: "boolean",
		...qt(t)
	});
}
// @__NO_SIDE_EFFECTS__
function br(e, t) {
	return new Vn({
		check: "max_length",
		...qt(t),
		maximum: e
	});
}
// @__NO_SIDE_EFFECTS__
function xr(e, t) {
	return new Hn({
		check: "min_length",
		...qt(t),
		minimum: e
	});
}
// @__NO_SIDE_EFFECTS__
function Sr(e, t) {
	return new Un({
		check: "string_format",
		format: "starts_with",
		...qt(t),
		prefix: e
	});
}
// node_modules/zod/v4/mini/schemas.js
var Cr = /*@__PURE__*/ W("ZodMiniType", (e, t) => {
	if (!e._zod) throw Error("Uninitialized schema in ZodMiniType.");
	Gn.init(e, t), e.def = t, e.type = t.type;
}, {
	get with() {
		return this.check;
	},
	set with(e) {
		ln(this, "with", e);
	},
	parse(e, t) {
		return jn(this, e, t, { callee: this.parse });
	},
	parseAsync(e, t) {
		return Mn(this, e, t, { callee: this.parseAsync });
	},
	safeParse(e, t) {
		return Nn(this, e, t);
	},
	safeParseAsync(e, t) {
		return Fn(this, e, t);
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
		return Kt(this, e, t);
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
}), wr = /*@__PURE__*/ W("ZodMiniString", (e, t) => {
	Yn.init(e, t), Cr.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function G(e) {
	return /* @__PURE__ */ _r(wr, e);
}
var Tr = /*@__PURE__*/ W("ZodMiniNumber", (e, t) => {
	Xn.init(e, t), Cr.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function Er(e) {
	return /* @__PURE__ */ vr(Tr, e);
}
var Dr = /*@__PURE__*/ W("ZodMiniBoolean", (e, t) => {
	Zn.init(e, t), Cr.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function Or(e) {
	return /* @__PURE__ */ yr(Dr, e);
}
var kr = /*@__PURE__*/ W("ZodMiniArray", (e, t) => {
	tr.init(e, t), Cr.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function Ar(e, t) {
	return new kr({
		type: "array",
		element: e,
		...qt(t)
	});
}
var jr = /*@__PURE__*/ W("ZodMiniObject", (e, t) => {
	or.init(e, t), Cr.init(e, t), _n(e, "shape", (e) => e._zod.def.shape, !1);
});
// @__NO_SIDE_EFFECTS__
function K(e, t) {
	return new jr({
		type: "object",
		shape: e ?? {},
		...qt(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Mr(e, t) {
	return Yt(e, t);
}
var Nr = /*@__PURE__*/ W("ZodMiniUnion", (e, t) => {
	cr.init(e, t), Cr.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function Pr(e, t) {
	return new Nr({
		type: "union",
		options: e,
		...qt(t)
	});
}
var Fr = /*@__PURE__*/ W("ZodMiniDiscriminatedUnion", (e, t) => {
	ur.init(e, t), Cr.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function Ir(e, t, n) {
	return new Fr({
		type: "union",
		options: t,
		discriminator: e,
		...qt(n)
	});
}
var Lr = /*@__PURE__*/ W("ZodMiniEnum", (e, t) => {
	dr.init(e, t), Cr.init(e, t), e.options = [...e._zod.values];
});
// @__NO_SIDE_EFFECTS__
function Rr(e, t) {
	return new Lr({
		type: "enum",
		entries: Array.isArray(e) ? Object.fromEntries(e.map((e) => [e, e])) : e,
		...qt(t)
	});
}
var zr = /*@__PURE__*/ W("ZodMiniLiteral", (e, t) => {
	fr.init(e, t), Cr.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function q(e, t) {
	return new zr({
		type: "literal",
		values: Array.isArray(e) ? e : [e],
		...qt(t)
	});
}
var Br = /*@__PURE__*/ W("ZodMiniOptional", (e, t) => {
	mr.init(e, t), Cr.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function J(e) {
	return new Br({
		type: "optional",
		innerType: e
	});
}
var Vr = /*@__PURE__*/ W("ZodMiniNullable", (e, t) => {
	hr.init(e, t), Cr.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function Hr(e) {
	return new Vr({
		type: "nullable",
		innerType: e
	});
}
var Ur = /* @__PURE__ */ Pr([/* @__PURE__ */ K({
	ok: /* @__PURE__ */ q(!0),
	id: /* @__PURE__ */ Er(),
	thread: /* @__PURE__ */ G()
}), /* @__PURE__ */ K({
	ok: /* @__PURE__ */ q(!1),
	error: /* @__PURE__ */ G()
})]), Wr = /* @__PURE__ */ K({
	ok: /* @__PURE__ */ Or(),
	name: /* @__PURE__ */ J(/* @__PURE__ */ G()),
	error: /* @__PURE__ */ J(/* @__PURE__ */ G()),
	every: /* @__PURE__ */ J(/* @__PURE__ */ Hr(/* @__PURE__ */ G())),
	cron: /* @__PURE__ */ J(/* @__PURE__ */ Hr(/* @__PURE__ */ G())),
	timezone: /* @__PURE__ */ J(/* @__PURE__ */ G()),
	next_at: /* @__PURE__ */ J(/* @__PURE__ */ G())
}), Gr = /* @__PURE__ */ K({
	id: /* @__PURE__ */ G(),
	name: /* @__PURE__ */ G(),
	type: /* @__PURE__ */ G(),
	size: /* @__PURE__ */ Er(),
	author: /* @__PURE__ */ G(),
	ts: /* @__PURE__ */ Er(),
	embed: /* @__PURE__ */ J(/* @__PURE__ */ Or())
}), Kr = /* @__PURE__ */ Mr(Gr, { reminder: /* @__PURE__ */ J(Wr) }), qr = /* @__PURE__ */ K({ error: /* @__PURE__ */ G() });
(/* @__PURE__ */ G()).check(/* @__PURE__ */ Sr("https://"), /* @__PURE__ */ br(1e3)), (/* @__PURE__ */ G()).check(/* @__PURE__ */ xr(1)), (/* @__PURE__ */ G()).check(/* @__PURE__ */ xr(1)), (/* @__PURE__ */ G()).check(/* @__PURE__ */ xr(1)), (/* @__PURE__ */ G()).check(/* @__PURE__ */ Sr("m"));
var Jr = /* @__PURE__ */ G(), Yr = /* @__PURE__ */ Er(), Xr = /* @__PURE__ */ Ir("t", [
	/* @__PURE__ */ K({
		t: /* @__PURE__ */ q("msg"),
		thread: /* @__PURE__ */ G(),
		text: /* @__PURE__ */ J(/* @__PURE__ */ G()),
		files: /* @__PURE__ */ J(/* @__PURE__ */ Ar(/* @__PURE__ */ G())),
		reply_to: /* @__PURE__ */ J(/* @__PURE__ */ Hr(Yr))
	}),
	/* @__PURE__ */ K({ t: /* @__PURE__ */ q("files.get") }),
	/* @__PURE__ */ K({
		t: /* @__PURE__ */ q("doc.get"),
		epic: /* @__PURE__ */ J(/* @__PURE__ */ Hr(/* @__PURE__ */ G()))
	}),
	/* @__PURE__ */ K({
		t: /* @__PURE__ */ q("doc"),
		text: /* @__PURE__ */ G(),
		epic: /* @__PURE__ */ J(/* @__PURE__ */ Hr(/* @__PURE__ */ G()))
	}),
	/* @__PURE__ */ K({
		t: /* @__PURE__ */ q("title"),
		title: /* @__PURE__ */ G()
	}),
	/* @__PURE__ */ K({
		t: /* @__PURE__ */ q("epic"),
		title: /* @__PURE__ */ G()
	}),
	/* @__PURE__ */ K({
		t: /* @__PURE__ */ q("epic.owner"),
		id: Jr,
		owner: /* @__PURE__ */ G()
	}),
	/* @__PURE__ */ K({
		t: /* @__PURE__ */ q("task.add"),
		epic: /* @__PURE__ */ G(),
		title: /* @__PURE__ */ G()
	}),
	/* @__PURE__ */ K({
		t: /* @__PURE__ */ q("older"),
		thread: /* @__PURE__ */ G(),
		before: /* @__PURE__ */ J(Yr)
	}),
	/* @__PURE__ */ K({
		t: /* @__PURE__ */ q("pin.add"),
		kind: /* @__PURE__ */ Rr([
			"link",
			"file",
			"app"
		]),
		ref: /* @__PURE__ */ G(),
		title: /* @__PURE__ */ J(/* @__PURE__ */ G())
	}),
	/* @__PURE__ */ K({
		t: /* @__PURE__ */ q("pin.del"),
		id: Jr
	}),
	/* @__PURE__ */ K({
		t: /* @__PURE__ */ q("reminder.delete"),
		id: Jr
	}),
	/* @__PURE__ */ K({
		t: /* @__PURE__ */ q("ack.dismiss"),
		id: Yr
	}),
	/* @__PURE__ */ K({
		t: /* @__PURE__ */ q("reminder.enable"),
		id: Jr,
		on: /* @__PURE__ */ Or()
	}),
	/* @__PURE__ */ K({
		t: /* @__PURE__ */ q("task.toggle"),
		id: Jr
	}),
	/* @__PURE__ */ K({
		t: /* @__PURE__ */ q("task.status"),
		id: Jr,
		status: /* @__PURE__ */ Rr(Je)
	}),
	/* @__PURE__ */ K({
		t: /* @__PURE__ */ q("task.rename"),
		id: Jr,
		title: /* @__PURE__ */ G()
	}),
	/* @__PURE__ */ K({
		t: /* @__PURE__ */ q("task.del"),
		id: Jr
	}),
	/* @__PURE__ */ K({
		t: /* @__PURE__ */ q("task.assign"),
		id: Jr,
		owner: /* @__PURE__ */ J(/* @__PURE__ */ G()),
		due: /* @__PURE__ */ J(/* @__PURE__ */ G())
	}),
	/* @__PURE__ */ K({
		t: /* @__PURE__ */ q("decision.del"),
		id: Yr
	}),
	/* @__PURE__ */ K({
		t: /* @__PURE__ */ q("epic.rename"),
		id: Jr,
		title: /* @__PURE__ */ G()
	}),
	/* @__PURE__ */ K({
		t: /* @__PURE__ */ q("epic.del"),
		id: Jr
	}),
	/* @__PURE__ */ K({
		t: /* @__PURE__ */ q("epic.archive"),
		id: Jr,
		archived: /* @__PURE__ */ J(/* @__PURE__ */ Or())
	}),
	/* @__PURE__ */ K({
		t: /* @__PURE__ */ q("epic.order"),
		ids: /* @__PURE__ */ Ar(/* @__PURE__ */ G())
	}),
	/* @__PURE__ */ K({
		t: /* @__PURE__ */ q("poll.create"),
		thread: /* @__PURE__ */ G(),
		question: /* @__PURE__ */ G(),
		options: /* @__PURE__ */ Ar(/* @__PURE__ */ G()),
		multi: /* @__PURE__ */ Or()
	}),
	/* @__PURE__ */ K({
		t: /* @__PURE__ */ q("vote"),
		id: Jr,
		opt: Yr
	}),
	/* @__PURE__ */ K({
		t: /* @__PURE__ */ q("poll.close"),
		id: Jr
	}),
	/* @__PURE__ */ K({
		t: /* @__PURE__ */ q("suggestion"),
		i: Yr,
		accept: /* @__PURE__ */ J(/* @__PURE__ */ Or())
	})
]), Zr = (/* @__PURE__ */ G()).check(/* @__PURE__ */ xr(1), /* @__PURE__ */ br(64)), Qr = /* @__PURE__ */ Pr([/* @__PURE__ */ K({
	t: /* @__PURE__ */ q("result"),
	cid: Zr,
	ok: /* @__PURE__ */ q(!0)
}), /* @__PURE__ */ K({
	t: /* @__PURE__ */ q("result"),
	cid: Zr,
	ok: /* @__PURE__ */ q(!1),
	error: /* @__PURE__ */ G()
})]), $r = (e) => typeof e == "object" && !!e && !Array.isArray(e), Y = (e) => typeof e == "string", X = (e) => typeof e == "number" && Number.isFinite(e), ei = (e) => typeof e == "boolean", Z = (e) => (t) => t === null || e(t), Q = (e) => (t) => Array.isArray(t) && t.every(e), ti = (e) => (t) => $r(t) && Object.values(t).every(e), ni = Q(Y), ri = ((...e) => (t) => typeof t == "string" && e.includes(t))(...Je), $ = (e, t = {}) => (n) => $r(n) && Object.entries(e).every(([e, t]) => t(n[e])) && Object.entries(t).every(([e, t]) => n[e] === void 0 || t(n[e])), ii = (e) => $({
	id: Y,
	name: Y,
	type: Y,
	size: X,
	author: Y,
	ts: X
}, { embed: ei })(e), ai = $({
	id: Y,
	title: Y,
	done: ei,
	status: ri
}, {
	owner: Z(Y),
	due: Z(Y),
	flags: ni,
	epic_id: Y
}), oi = (e) => ai(e), si = $({
	id: Y,
	title: Y,
	tasks: Q(oi)
}, {
	archived: ei,
	kept: ei,
	owner: Z(Y),
	from_msg: Z(X),
	parent: Z(Y),
	flags: ni,
	prod: Z($({ stage: Y }, {
		at: X,
		note: Y
	})),
	files: Q($({
		id: Y,
		name: Y,
		type: Y,
		n: X
	}))
}), ci = (e) => si(e), li = $({
	id: X,
	thread: Y,
	author: Y,
	ts: X,
	text: Y
}, {
	kind: Z(Y),
	tag: Z(Y),
	via: Z(Y),
	reply_to: Z(X),
	choices: Z(Y),
	poll: Z(Y),
	card: Z(Y),
	files: Q(ii),
	quiet: ei,
	cut: ei,
	for_who: Z(Y)
}), ui = (e) => li(e), di = $({
	msg_id: X,
	email: Y,
	who: Y,
	status: Y,
	ts: X
}, {
	agent: Y,
	note: Z(Y)
}), fi = (e) => di(e), pi = $({
	id: Y,
	text: Y,
	owner: Y,
	enabled: ei
}, {
	name: Z(Y),
	error: Z(Y),
	every: Z(Y),
	cron: Z(Y),
	next_at: Z(X),
	thread: Y,
	tz: Y,
	file_id: Z(Y)
}), mi = (e) => pi(e), hi = $({
	title: Y,
	owner: Y
}, {
	summary: Z(Y),
	folder: Z(Y)
}), gi = (e) => hi(e), _i = $({
	title: Y,
	tasks: ni
}, { why: Y }), vi = (e) => _i(e), yi = $({
	id: X,
	text: Y,
	who: Y,
	kind: Y,
	ts: X
}), bi = (e) => yi(e), xi = $({
	id: Y,
	kind: Y,
	ref: Y
}, {
	title: Y,
	author: Y,
	ts: X
}), Si = (e) => xi(e), Ci = $({
	id: Y,
	question: Y,
	options: ni,
	multi: ei,
	closed: ei,
	author: Y,
	votes: Q(ni)
}), wi = (e) => Ci(e), Ti = $({
	email: Y,
	ts: X
}, { name: Z(Y) }), Ei = $({
	email: Y,
	who: Y,
	read: X,
	delivered: X
}, {
	agent: Y,
	ts: X
}), Di = $({ text: Y }, {
	epic: Z(Y),
	stale: (e) => e === !1,
	fetched: ei,
	by: Y
}), Oi = $({
	epic: Y,
	stale: (e) => e === !0
}, { by: Y }), ki = {
	state: $({
		me: Y,
		book: gi,
		messages: Q(ui),
		epics: Q(ci),
		members: ni,
		online: ni,
		suggestions: Q(vi)
	}, {
		roomTasks: Q(oi),
		names: ti(Y),
		avatars: ti(X),
		pending: ni,
		requests: Q(Ti),
		files: Q(ii),
		filesN: X,
		filesAll: ei,
		reminders: Q(mi),
		acks: Q(fi),
		receipts: Q(Ei),
		counts: ti(X),
		countsAt: X,
		full: ni,
		complete: ei,
		origins: Q(ui),
		docs: ti(Y),
		doc: Y,
		docNotes: ni,
		decisions: Q(bi),
		pins: Q(Si),
		polls: ti(wi)
	}),
	msg: $({ m: ui }),
	moved: $({
		id: X,
		thread: Y
	}),
	delta: $({
		id: X,
		text: Y
	}),
	typing: $({
		id: X,
		mode: Y
	}, { note: Y }),
	closed: $({
		id: X,
		choices: Y
	}),
	epics: $({ epics: Q(ci) }, { roomTasks: Q(oi) }),
	epicsPatch: $({
		changed: Q(ci),
		order: ni
	}, { roomTasks: Q(oi) }),
	doc: (e) => $r(e) && (e.stale === !0 ? Oi(e) && e.text === void 0 && e.fetched === void 0 : Di(e)),
	docNotes: $({ notes: ni }),
	meta: $({}, {
		title: Y,
		folder: Y,
		summary: Y
	}),
	suggestions: $({ suggestions: Q(vi) }),
	requests: $({ requests: Q(Ti) }),
	members: $({ members: ni }, {
		pending: ni,
		requests: Q(Ti),
		names: ti(Y),
		avatars: ti(X)
	}),
	files: $({ files: Q(ii) }),
	fileAdd: $({ file: ii }),
	reminders: $({ reminders: Q(mi) }),
	decisions: $({ decisions: Q(bi) }),
	pins: $({ pins: Q(Si) }),
	receipts: $({ receipts: Q(Ei) }),
	older: $({
		messages: Q(ui),
		thread: Y,
		more: ei
	}),
	acks: $({ acks: Q(fi) }),
	ackRows: $({ acks: Q(fi) }),
	poll: $({ poll: wi }),
	online: $({ online: ni }),
	conns: $({}),
	error: $({}, { error: Y }),
	blocked: $({
		text: Y,
		reason: Y
	}),
	result: (e) => Qr.safeParse(e).success
};
function Ai(e) {
	return !$r(e) || typeof e.t != "string" || !Object.hasOwn(ki, e.t) ? !1 : ki[e.t](e);
}
function ji(e) {
	if (!$r(e)) return e;
	let t = (e, t) => $r(e) && (e[t] === 0 || e[t] === 1) ? {
		...e,
		[t]: e[t] === 1
	} : e, n = (e) => Array.isArray(e) ? e.map((e) => t(e, "done")) : e, r = (e) => Array.isArray(e) ? e.map((e) => $r(e) ? {
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
function Mi(e) {
	let t = ji(JSON.parse(e));
	if (!Ai(t)) throw TypeError("Invalid room event");
	return t;
}
function Ni(e) {
	return Xr.safeParse(e).success;
}
// node_modules/hono/dist/client/utils.js
var Pi = (e, t) => (e = e.replace(/\/+$/, ""), e += "/", t = t.replace(/^\/+/, ""), e + t), Fi = (e, t) => {
	for (let [n, r] of Object.entries(t)) {
		let t = RegExp("/:" + n + "(?:{[^/]+})?\\??(?=/|$)");
		e = e.replace(t, () => r ? `/${r}` : "");
	}
	return e;
}, Ii = (e) => {
	let t = new URLSearchParams();
	for (let [n, r] of Object.entries(e)) if (r !== void 0) {
		if (Array.isArray(r)) for (let e of r) e !== void 0 && t.append(n, e);
		else t.set(n, r);
	}
	return t;
}, Li = (e, t) => {
	switch (t) {
		case "ws": return e.replace(/^http/, "ws");
		case "http": return e.replace(/^ws/, "http");
	}
}, Ri = (e) => /^https?:\/\/[^\/]+?\/index(?=\?|$)/.test(e) ? e.replace(/\/index(?=\?|$)/, "/") : e.replace(/\/index(?=\?|$)/, "");
function zi(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function Bi(e, t) {
	if (!zi(e) && !zi(t)) return t;
	let n = { ...e };
	for (let e in t) {
		let r = t[e];
		n[e] = zi(n[e]) && zi(r) ? Bi(n[e], r) : r;
	}
	return n;
}
// node_modules/hono/dist/utils/cookie.js
var Vi = /^[\w!#$%&'*.^`|~+-]+$/, Hi = (e, t, n = {}) => {
	if (!Vi.test(e)) throw Error("Invalid cookie name");
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
}, Ui = (e, t, n) => (t = encodeURIComponent(t), Hi(e, t, n)), Wi = (e, t) => new Proxy(() => {}, {
	get(n, r) {
		if (typeof r == "string" && r !== "then") return Wi(e, [...t, r]);
	},
	apply(n, r, i) {
		return e({
			path: t,
			args: i
		});
	}
}), Gi = (e, t) => {
	let n = t.toString();
	return n ? `${e}?${n}` : e;
}, Ki = class {
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
			for (let [n, r] of Object.entries(e.cookie)) r !== void 0 && t.push(Ui(n, r));
			t.length > 0 && (r.Cookie = t.join("; "));
		}
		this.cType && (r["Content-Type"] = this.cType);
		let i = new Headers();
		for (let [e, t] of Object.entries(r)) t !== void 0 && i.set(e, t);
		let a = this.url;
		a = Ri(a), a = Fi(a, this.pathParams), this.queryParams && (a = Gi(a, this.queryParams)), n = this.method.toUpperCase();
		let o = n !== "GET" && n !== "HEAD";
		return (t?.fetch || fetch)(a, {
			body: o ? this.rBody : void 0,
			method: n,
			headers: i,
			...t?.init
		});
	};
}, qi = (e, t) => Wi(function n(r) {
	let i = t?.buildSearchParams ?? Ii, a = [...r.path], o = a.slice(-3).reverse();
	if (o[0] === "toString") return o[1] === "name" ? o[2] || "" : n.toString();
	if (o[0] === "valueOf") return o[1] === "name" ? o[2] || "" : n;
	let s = "";
	if (/^\$/.test(o[0])) {
		let e = a.pop();
		e && (s = e.replace(/^\$/, ""));
	}
	let c = Pi(e, a.join("/"));
	if (s === "url" || s === "path") {
		let t = Ri(c);
		return r.args[0] && (r.args[0].param && (t = Fi(t, r.args[0].param)), r.args[0].query && (t = Gi(t, i(r.args[0].query)))), s === "url" ? new URL(t) : t.slice(e.replace(/\/+$/, "").length).replace(/^\/?/, "/");
	}
	if (s === "ws") {
		let e = Ri(c), n = Li(r.args[0]?.param ? Fi(e, r.args[0].param) : e, "ws"), a = new URL(n), o = r.args[0]?.query;
		return o && i(o).forEach((e, t) => {
			a.searchParams.append(t, e);
		}), ((...e) => t?.webSocket !== void 0 && typeof t.webSocket == "function" ? t.webSocket(...e) : new WebSocket(...e))(a.toString());
	}
	let l = new Ki(c, s, { buildSearchParams: i });
	if (s) {
		t ??= {};
		let e = { ...r.args[1] }, n = t.headers, i = e.headers;
		n && i && (e.headers = async () => ({
			...typeof n == "function" ? await n() : n,
			...typeof i == "function" ? await i() : i
		}));
		let a = Bi(t, e);
		return l.fetch(r.args[0], a);
	}
	return l;
}, []), Ji = (e = "/", t) => qi(e, t ? { fetch: t } : {});
// svelte/transport.ts
function Yi(e, t, n) {
	if (!Ni(t)) throw TypeError("Invalid room command");
	return !e || e.readyState !== 1 ? !1 : (e.send(JSON.stringify(n ? {
		...t,
		cid: n
	} : t)), !0);
}
function Xi(e) {
	if (typeof e != "string") throw TypeError("Room events must be JSON text");
	return Mi(e);
}
async function Zi(e) {
	try {
		return await e.json();
	} catch (t) {
		throw e.ok ? t : Error(`HTTP ${e.status}`);
	}
}
function Qi(e, t) {
	let n = qr.safeParse(t);
	return Error(n.success ? n.data.error : `HTTP ${e.status}`);
}
function $i(e, t = fetch) {
	let n = Ji("/", t).api.books[":id"], r = encodeURIComponent(e);
	return {
		async postMessage(e) {
			let t = await n.post.$post({
				param: { id: r },
				json: e
			}), i = await Zi(t);
			if (t.ok || t.status === 400) {
				let e = Ur.safeParse(i);
				if (e.success) return e.data;
				if (t.ok) throw TypeError("Invalid post response");
			}
			throw Qi(t, i);
		},
		async uploadFile(e) {
			let t = await n.files.$post({
				param: { id: r },
				header: {
					"content-type": e.type,
					"x-filename": encodeURIComponent(e.name)
				}
			}, { init: { body: e.body } }), i = await Zi(t);
			if (!t.ok) throw Qi(t, i);
			let a = Kr.safeParse(i);
			if (!a.success) throw TypeError(Gr.safeParse(i).success ? "Invalid reminder response" : "Invalid upload response");
			return a.data;
		}
	};
}
// svelte/Reminders.svelte
var ea = o("<button class=\"primary\" id=\"remNew\"><!> </button>"), ta = o("<form class=\"remForm\" id=\"remForm\"><input name=\"name\" maxlength=\"60\" required=\"\"/> <textarea name=\"text\" required=\"\"></textarea> <div class=\"row\"><span class=\"err\" id=\"remErr\"> </span><button type=\"button\" class=\"ghost\" id=\"remCancel\"> </button><button class=\"primary\" id=\"remSave\"> </button></div></form>"), na = o("<span class=\"err\"> </span>"), ra = o("<pre class=\"remText\"> </pre>"), ia = o("<button class=\"ghost\"></button>"), aa = o("<div><div class=\"remBody\" role=\"button\" tabindex=\"0\"><b><!> </b> <small><!> </small> <!><!></div> <!> <label class=\"sw\"><input type=\"checkbox\"/> </label> <button class=\"ghost\"></button></div>"), oa = o("<div class=\"empty\"> </div>"), sa = o("<div class=\"remHead\"><p></p> <!></div> <!> <!> <!>", 1);
function ca(e, i) {
	k(i, !0);
	let a = c(null), o = c(""), s = c(!1), d = c(S([])), p = f(() => i.room.reminders || []), m = f(() => i.vb.locale || (document.documentElement.lang === "en" ? "en-US" : "pt-BR")), _ = (e) => new Date(e).toLocaleString(h(m), {
		weekday: "short",
		day: "numeric",
		month: "short",
		hour: "2-digit",
		minute: "2-digit"
	});
	function v(e) {
		w(a, e, !0), w(o, "");
	}
	function y(e) {
		w(d, h(d).includes(e.id) ? h(d).filter((t) => t !== e.id) : [...h(d), e.id], !0);
	}
	async function x(e) {
		if (e.preventDefault(), !h(a) || h(s)) return;
		let t = { ...h(a) }, n = t.name.trim().replace(/\.md$/i, "").replace(/[\\/]/g, "-");
		w(s, !0), w(o, "");
		try {
			let e = await $i(i.room.id).uploadFile({
				name: `reminders/${n}.md`,
				type: "text/markdown",
				body: t.text
			});
			if (e.reminder && !e.reminder.ok) {
				w(o, `⚠ ${e.reminder.error || i.vb.t("falhou")}`), w(a, {
					...t,
					name: n,
					fixed: !0
				}, !0);
				return;
			}
			w(a, null);
		} catch (e) {
			w(o, e instanceof Error ? e.message : i.vb.t("sem conexão"), !0);
		} finally {
			w(s, !1);
		}
	}
	var T = sa(), O = r(T), j = U(O);
	z(j, () => i.vb.t("Cada lembrete é um arquivo <code>reminders/&lt;nome&gt;.md</code>: o texto diz quando rodar e o que fazer. Na hora, o @vibe posta o texto aqui e o agent de quem salvou faz."), !0), t(j);
	var ee = l(j, 2), P = (e) => {
		var r = ea(), a = U(r);
		z(a, () => i.vb.icon("plus", 14));
		var o = l(a);
		t(r), u((e) => b(o, ` ${e ?? ""}`), [() => i.vb.t("Novo lembrete")]), n("click", r, () => v({
			name: "",
			text: ""
		})), H(e, r);
	};
	M(ee, (e) => {
		h(a) || e(P);
	}), t(O);
	var I = l(O, 2), L = (e) => {
		var r = ta(), c = U(r);
		N(c);
		var d = l(c, 2);
		D(d);
		var f = l(d, 2), p = U(f), m = C(p, !0), g = l(p), _ = C(g, !0), v = l(g), y = C(v, !0);
		t(f), t(r), u((e, t, n, r) => {
			V(c, "placeholder", e), c.readOnly = h(a).fixed, V(d, "placeholder", t), b(m, h(o)), b(_, n), v.disabled = h(s), b(y, r);
		}, [
			() => i.vb.t("nome, ex.: relatorio-diario"),
			() => i.vb.t("Diga quando e o quê. Ex.: Todo dia às 8h: puxe os números de ontem e poste aqui o que mudou."),
			() => i.vb.t("Cancelar"),
			() => i.vb.t("Salvar")
		]), ie("submit", r, x), ue(c, () => h(a).name, (e) => h(a).name = e), ue(d, () => h(a).text, (e) => h(a).text = e), n("click", g, () => w(a, null)), H(e, r);
	};
	M(I, (e) => {
		h(a) && e(L);
	});
	var R = l(I, 2);
	A(R, 17, () => h(p), (e) => e.id, (e, r) => {
		var a = aa();
		let o;
		var s = U(a), c = U(s), p = U(c);
		z(p, () => i.vb.icon(h(d).includes(h(r).id) ? "chevronDown" : "chevronRight", 13));
		var m = l(p);
		t(c);
		var x = l(c, 2), S = U(x), w = (e) => {
			var t = g();
			u((e) => b(t, `${(h(r).every || h(r).cron || "") ?? ""}${e ?? ""} ·`), [() => h(r).enabled && h(r).next_at ? ` · ${i.vb.t("próximo {when}", { when: _(h(r).next_at) })}` : ""]), H(e, t);
		};
		M(S, (e) => {
			h(r).error || e(w);
		});
		var T = l(S, 1, !0);
		t(x);
		var E = l(x, 2), D = (e) => {
			var t = na(), n = C(t);
			u(() => b(n, `⚠ ${h(r).error ?? ""}`)), H(e, t);
		};
		M(E, (e) => {
			h(r).error && e(D);
		});
		var O = l(E), k = (e) => {
			var t = ra(), n = C(t, !0);
			u(() => b(n, h(r).text)), H(e, t);
		}, A = f(() => h(d).includes(h(r).id));
		M(O, (e) => {
			h(A) && e(k);
		}), t(s);
		var j = l(s, 2), ee = (e) => {
			var a = ia();
			z(a, () => i.vb.icon("pencil", 14), !0), t(a), u((e, t) => {
				V(a, "data-rem-edit", h(r).id), V(a, "title", e), V(a, "aria-label", t);
			}, [() => i.vb.t("Editar"), () => i.vb.t("Editar")]), n("click", a, () => v({
				name: h(r).name,
				text: h(r).text,
				fixed: !0
			})), H(e, a);
		};
		M(j, (e) => {
			h(r).name && e(ee);
		});
		var P = l(j, 2), I = U(P);
		N(I);
		var L = l(I, 1, !0);
		t(P);
		var R = l(P, 2);
		z(R, () => i.vb.icon("x"), !0), t(R), t(a), u((e, t, n, i, c, l, u) => {
			o = F(a, 1, "rem", null, o, {
				bad: !!h(r).error,
				off: !h(r).enabled,
				open: e
			}), V(s, "data-rem-open", h(r).id), V(s, "title", t), b(m, ` ${(h(r).name ? `${h(r).name}.md` : h(r).text) ?? ""}`), b(T, n), V(P, "title", i), V(I, "data-rem-on", h(r).id), Se(I, h(r).enabled), I.disabled = !!h(r).error, b(L, c), V(R, "data-rem-del", h(r).id), V(R, "title", l), V(R, "aria-label", u);
		}, [
			() => h(d).includes(h(r).id),
			() => i.vb.t(h(d).includes(h(r).id) ? "Esconder o texto" : "Ver o texto"),
			() => i.vb.t("de {who}", { who: i.vb.name(h(r).owner) }),
			() => i.vb.t("Ligado"),
			() => i.vb.t("ligado"),
			() => i.vb.t("Apagar lembrete"),
			() => i.vb.t("Apagar lembrete")
		]), n("click", s, (e) => {
			e.target.closest(".remText") || y(h(r));
		}), n("keydown", s, (e) => {
			e.key === "Enter" && y(h(r));
		}), n("change", I, (e) => i.send({
			t: "reminder.enable",
			id: h(r).id,
			on: e.currentTarget.checked
		})), n("click", R, () => {
			confirm(i.vb.t("Apagar este lembrete?")) && i.send({
				t: "reminder.delete",
				id: h(r).id
			});
		}), H(e, a);
	});
	var te = l(R, 2), ne = (e) => {
		var t = oa(), n = C(t, !0);
		u((e) => b(n, e), [() => i.vb.t("Nenhum lembrete ainda. Clique em Novo lembrete, ou peça pro seu agent: “todo dia às 8h, me manda o resumo do que mudou”.")]), H(e, t);
	};
	M(te, (e) => {
		!h(p).length && !h(a) && e(ne);
	}), H(e, T), E();
}
B([
	"click",
	"keydown",
	"change"
]);
// svelte/Sidebar.svelte
var la = o("<span class=\"claudeSpin\">✻</span>"), ua = o("<button type=\"button\"><!><span class=\"rt\"> </span> <!> <!><!> <span class=\"n\"> </span></button>"), da = o("<div class=\"fnCol\"><span class=\"fnRow\"><span class=\"fn\"> </span><span class=\"pendTag\"> </span></span> <small class=\"memActs\"><button type=\"button\" class=\"ghost resend\"> </button> · <button type=\"button\" class=\"ghost resend\"> </button></small></div>"), fa = o("<span class=\"fn\"> </span>"), pa = o("<div class=\"fnCol\"><span class=\"fn\"> </span><small class=\"memActs\"> </small></div>"), ma = o("<button type=\"button\" class=\"ghost x\"></button>"), ha = o("<div class=\"member\"><!> <!> <!></div> <!>", 1), ga = o("<button type=\"button\" class=\"iconBtn phOnly\" id=\"sideArch\"></button> <button type=\"button\" class=\"iconBtn phOnly\" id=\"sideDel\"></button>", 1), _a = o("<span class=\"rowEdit phOnly\" role=\"button\" tabindex=\"0\" id=\"sideRename\"><!> </span>"), va = o("<div class=\"epTabs\" role=\"tablist\"><button type=\"button\" role=\"tab\" data-arch=\"\"> <b> </b></button> <button type=\"button\" role=\"tab\" data-arch=\"1\"> <b> </b></button></div>"), ya = o("<button type=\"button\"><span class=\"ri\"> </span><span class=\"rt\"> </span><span class=\"n\"> </span></button>"), ba = o("<form id=\"newEpic\" class=\"newRoom\"><input enterkeyhint=\"done\"/><button class=\"ri\"></button></form> <!>", 1), xa = o("<div class=\"member reqRow\"><!> <div class=\"fnCol\"><span class=\"fn\"> </span><small class=\"memActs\"> <button type=\"button\" class=\"ghost resend okAsk\" data-ok=\"1\"> </button></small></div> <button type=\"button\" class=\"ghost x\" data-ok=\"\"></button></div>"), Sa = o("<div class=\"asks\"><h4> </h4> <!></div>"), Ca = o("<details class=\"memMore\" data-fold=\"off\"><summary> </summary><!></details>"), wa = o("<button type=\"button\" class=\"friendAdd\"><!><span class=\"fn\"> </span><b></b></button>"), Ta = o("<details class=\"memMore\" data-fold=\"friends\"><summary> </summary> <!></details>"), Ea = o("<option></option>"), Da = o("<button type=\"button\" class=\"sheetGrab\"><i></i></button> <!> <div class=\"sideHead\"><div class=\"sideTop\"><a data-nav=\"\" href=\"/app\" class=\"muted\"><!> vibebooks</a> <!> <button type=\"button\" class=\"iconBtn\" id=\"railToggle\" aria-expanded=\"true\"></button></div></div> <div class=\"sec threadsSec\"><button type=\"button\" data-thread=\"main\"><!><span class=\"rt\"> </span> <!> <!><span class=\"n\"> </span></button> <!> <div><!> <!></div></div> <!> <div class=\"sec\"><!> <h4> </h4> <!> <!> <!> <!> <form class=\"row\" id=\"invite\" style=\"margin-top:8px\"><input type=\"email\" required=\"\" list=\"friendList\" autocomplete=\"off\"/><button></button></form> <datalist id=\"friendList\"></datalist></div>", 1);
function Oa(e, n) {
	k(n, !0);
	let i = (e, r = I) => {
		let i = f(() => r().tasks.filter((e) => e.done).length), a = f(() => n.vb.epicBusy(r()));
		var o = ua();
		let s;
		var c = U(o);
		z(c, () => n.vb.epicIco(r(), !0));
		var d = l(c), p = C(d, !0), m = l(d, 2), g = (e) => {
			var t = la();
			u((e) => V(t, "aria-label", e), [() => n.vb.t("{who} está trabalhando", { who: h(a) })]), H(e, t);
		};
		M(m, (e) => {
			h(a) && e(g);
		});
		var _ = l(m, 2);
		z(_, () => n.vb.waitPill(r().id));
		var v = l(_);
		z(v, () => n.vb.prodMark(r()));
		var y = l(v, 2), x = C(y, !0);
		t(o), u((e, t) => {
			s = F(o, 1, "thread", null, s, {
				sel: n.thread === r().id,
				archived: !!r().archived,
				busy: !!h(a),
				waiting: e
			}), V(o, "data-thread", r().id), V(o, "title", t), b(p, r().title), b(x, r().tasks.length ? `${h(i)}/${r().tasks.length}` : "");
		}, [() => n.vb.waitsIn(r().id).length > 0, () => `${r().title} · ${h(i)}/${r().tasks.length} tasks${r().archived ? ` · ${n.vb.t("arquivado")}` : ""}${h(a) ? ` · ${n.vb.t("{who} está trabalhando aqui", { who: h(a) })}` : ""}`]), H(e, o);
	}, a = (e, i = I) => {
		var a = ha(), o = r(a), s = U(o);
		z(s, () => n.vb.avatar(i(), n.room.online.includes(i())));
		var c = l(s, 2), d = (e) => {
			var r = da(), a = U(r), o = U(a), s = C(o, !0), c = l(o), d = C(c, !0);
			t(a);
			var f = l(a, 2), p = U(f), m = C(p, !0), h = l(p, 2), g = C(h, !0);
			t(f), t(r), u((e, t, n, r, a, l, u) => {
				V(o, "title", i()), b(s, e), V(c, "title", t), b(d, n), V(p, "data-copyinv", i()), V(p, "title", r), b(m, a), V(h, "data-resend", i()), V(h, "title", l), b(g, u);
			}, [
				() => n.room.names?.[i()] || i().split("@")[0],
				() => n.vb.t("Convidada(o), ainda não entrou"),
				() => n.vb.t("pendente"),
				() => n.vb.t("Copiar a mensagem de convite (link da sala + setup do agent) para mandar no WhatsApp"),
				() => n.vb.t("copiar"),
				() => n.vb.t("Convidada(o), ainda não entrou"),
				() => n.vb.t("reenviar")
			]), H(e, r);
		}, p = f(() => n.room.pending?.includes(i())), m = (e) => {
			var t = fa(), r = C(t, !0);
			u(() => {
				V(t, "title", i()), b(r, n.room.names[i()]);
			}), H(e, t);
		}, g = (e) => {
			var n = pa(), r = U(n), a = C(r, !0), o = l(r), s = C(o);
			t(n), u((e, t) => {
				V(r, "title", i()), b(a, e), b(s, `@${t ?? ""}`);
			}, [() => i().split("@")[0], () => i().split("@")[1] ?? ""]), H(e, n);
		};
		M(c, (e) => {
			h(p) ? e(d) : n.room.names?.[i()] ? e(m, 1) : e(g, -1);
		});
		var _ = l(c, 2), v = (e) => {
			var r = ma();
			z(r, () => n.vb.icon("x"), !0), t(r), u((e, t) => {
				V(r, "data-remove", i()), V(r, "aria-label", e), V(r, "title", t);
			}, [() => n.vb.t("Remover {email}", { email: i() }), () => n.room.pending?.includes(i()) ? n.vb.t("Cancelar convite") : n.vb.t("Remover do vibebook")]), H(e, r);
		}, y = f(() => i() !== n.room.book?.owner && (n.room.pending?.includes(i()) || n.room.me === n.room.book?.owner));
		M(_, (e) => {
			h(y) && e(v);
		}), t(o);
		var x = l(o, 2);
		z(x, () => n.vb.agentRows(i())), H(e, a);
	}, o = T(n, "archOpen", 3, !1), s = T(n, "foldOpen", 19, () => ({
		off: !1,
		friends: null
	})), c = T(n, "friends", 19, () => []), d = (e) => n.room.counts ? (n.room.counts[e] ?? 0) + n.room.messages.filter((t) => t.thread === e && t.id > (n.room.countsAt ?? 0)).length : n.room.messages.filter((t) => t.thread === e).length, p = (e) => n.room.messages.reduce((t, n) => n.thread === e.id && n.id > t ? n.id : t, 0), m = f(() => n.room.epics.find((e) => e.id === n.thread)), g = f(() => n.room.epics.filter((e) => !e.archived)), _ = f(() => n.room.epics.filter((e) => e.archived).map((e, t) => ({
		epic: e,
		last: p(e),
		i: t
	})).sort((e, t) => t.last - e.last || t.i - e.i).map(({ epic: e }) => e)), v = f(() => o() && h(_).length > 0), x = f(() => n.room.members.filter((e) => e === n.room.me || n.room.online.includes(e))), S = f(() => n.room.members.filter((e) => !h(x).includes(e))), w = f(() => c().filter((e) => !n.room.members.includes(e)));
	var D = Da(), O = r(D), j = l(O, 2);
	z(j, () => n.vb.roomStrip());
	var ee = l(j, 2), N = U(ee), P = U(N), L = U(P);
	z(L, () => n.vb.icon("back")), y(), t(P);
	var R = l(P, 2), te = (e) => {
		var i = ga(), a = r(i);
		z(a, () => n.vb.icon(h(m).archived ? "undo" : "check", 18), !0), t(a);
		var o = l(a, 2);
		z(o, () => n.vb.icon("trash", 18), !0), t(o), u((e, t, n, r) => {
			V(a, "title", e), V(a, "aria-label", t), V(o, "title", n), V(o, "aria-label", r);
		}, [
			() => h(m).archived ? n.vb.t("Desarquivar épico") : n.vb.t("Arquivar épico (concluído)"),
			() => h(m).archived ? n.vb.t("Desarquivar épico") : n.vb.t("Arquivar épico"),
			() => n.vb.t("Apagar épico"),
			() => n.vb.t("Apagar épico")
		]), H(e, i);
	};
	M(R, (e) => {
		h(m) && e(te);
	});
	var ne = l(R, 2);
	z(ne, () => n.vb.icon("sidebar", 20), !0), t(ne), t(N), t(ee);
	var re = l(ee, 2), ie = U(re);
	let B;
	var ae = U(ie);
	z(ae, () => n.vb.roomMark("ri roomIco"));
	var oe = l(ae), se = C(oe, !0), ce = l(oe, 2), le = (e) => {
		var r = _a(), i = U(r);
		z(i, () => n.vb.icon("pencil", 13));
		var a = l(i);
		t(r), u((e, t) => {
			V(r, "title", e), b(a, ` ${t ?? ""}`);
		}, [() => n.vb.t("Renomear"), () => n.vb.t("editar")]), H(e, r);
	}, ue = f(() => !n.thread.startsWith("pre:"));
	M(ce, (e) => {
		h(ue) && e(le);
	});
	var de = l(ce, 2);
	z(de, () => n.vb.waitPill("main"));
	var fe = l(de), pe = C(fe, !0);
	t(ie);
	var me = l(ie, 2), he = (e) => {
		var r = va(), i = U(r);
		let a;
		var o = U(i), s = l(o), c = C(s, !0);
		t(i);
		var d = l(i, 2);
		let f;
		var p = U(d), m = l(p), y = C(m, !0);
		t(d), t(r), u((e, t) => {
			V(i, "aria-selected", !h(v)), a = F(i, 1, "", null, a, { on: !h(v) }), b(o, `${e ?? ""} `), b(c, h(g).length), V(d, "aria-selected", h(v)), f = F(d, 1, "", null, f, { on: h(v) }), b(p, `${t ?? ""} `), b(y, h(_).length);
		}, [() => n.vb.t("Épicos"), () => n.vb.t("Arquivados")]), H(e, r);
	};
	M(me, (e) => {
		h(_).length && e(he);
	});
	var ge = l(me, 2);
	let _e;
	var ve = U(ge);
	A(ve, 17, () => h(v) ? h(_) : h(g), (e) => e.id, (e, t) => {
		i(e, () => h(t));
	});
	var ye = l(ve, 2), be = (e) => {
		var i = ba(), a = r(i), o = U(a), s = l(o);
		z(s, () => n.vb.icon("plus"), !0), t(s), t(a);
		var c = l(a, 2);
		A(c, 17, () => n.room.suggestions, Ce, (e, r, i) => {
			var a = ya();
			let o;
			V(a, "data-thread", `pre:${i}`);
			var s = U(a), c = C(s, !0), d = l(s), f = C(d, !0), p = l(d), m = C(p, !0);
			t(a), u((e, t) => {
				o = F(a, 1, "thread pre", null, o, { sel: n.thread === `pre:${i}` }), V(a, "title", e), b(c, t), b(f, h(r).title), b(m, h(r).tasks.length || "");
			}, [() => `${h(r).title} · ${n.vb.t("sugestão do @vibe, clique para ver")}`, () => n.vb.initials(h(r).title)]), H(e, a);
		}), u((e, t, n) => {
			V(o, "placeholder", e), V(o, "aria-label", t), V(s, "aria-label", n);
		}, [
			() => n.vb.t("Novo épico: escreva o título…"),
			() => n.vb.t("Novo épico"),
			() => n.vb.t("Criar épico")
		]), H(e, i);
	};
	M(ye, (e) => {
		h(v) || e(be);
	}), t(ge), t(re);
	var xe = l(re, 2);
	z(xe, () => n.vb.pinsSec());
	var Se = l(xe, 2), we = U(Se), Te = (e) => {
		var r = Sa(), i = U(r), a = C(i, !0), o = l(i, 2);
		A(o, 17, () => n.room.requests, (e) => e.email, (e, r) => {
			var i = xa(), a = U(i);
			z(a, () => n.vb.avatar(h(r).email));
			var o = l(a, 2), s = U(o), c = C(s, !0), d = l(s), f = U(d), p = l(f), m = C(p, !0);
			t(d), t(o);
			var g = l(o, 2);
			z(g, () => n.vb.icon("x"), !0), t(g), t(i), u((e, t, n, i, a, o, l) => {
				V(s, "title", e), b(c, t), b(f, `${n ?? ""} · `), V(p, "data-ask", h(r).email), V(p, "title", i), b(m, a), V(g, "data-ask", h(r).email), V(g, "aria-label", o), V(g, "title", l);
			}, [
				() => `${h(r).email} · ${n.vb.t("pediu {ago}", { ago: n.vb.ago(h(r).ts) })}`,
				() => h(r).name || h(r).email.split("@")[0],
				() => n.vb.t("pediu {ago}", { ago: n.vb.ago(h(r).ts) }),
				() => n.vb.t("Liberar: entra na sala e recebe o link por email"),
				() => n.vb.t("liberar"),
				() => n.vb.t("Recusar {email}", { email: h(r).email }),
				() => n.vb.t("Recusar")
			]), H(e, i);
		}), t(r), u((e) => b(a, e), [() => n.vb.t("Pedindo pra entrar")]), H(e, r);
	};
	M(we, (e) => {
		n.room.requests?.length && e(Te);
	});
	var Ee = l(we, 2), De = C(Ee, !0), Oe = l(Ee, 2);
	z(Oe, () => n.vb.sbxRows());
	var ke = l(Oe, 2);
	A(ke, 16, () => h(x), (e) => e, (e, t) => {
		a(e, () => t);
	});
	var Ae = l(ke, 2), je = (e) => {
		var r = Ca(), i = U(r), o = C(i, !0), c = l(i);
		A(c, 16, () => h(S), (e) => e, (e, t) => {
			a(e, () => t);
		}), t(r), u((e) => {
			r.open = s().off, b(o, e);
		}, [() => n.vb.t("{n} offline", { n: h(S).length })]), H(e, r);
	};
	M(Ae, (e) => {
		h(S).length && e(je);
	});
	var Me = l(Ae, 2), Ne = (e) => {
		var r = Ta(), i = U(r), a = C(i), o = l(i, 2);
		A(o, 16, () => h(w), (e) => e, (e, r) => {
			var i = wa(), a = U(i);
			z(a, () => n.vb.avatar(r));
			var o = l(a), s = C(o, !0), c = l(o);
			z(c, () => n.vb.icon("plus"), !0), t(c), t(i), u((e, t) => {
				V(i, "data-add", r), V(i, "title", e), b(s, t);
			}, [() => n.vb.t("Adicionar {email}", { email: r }), () => n.vb.name(r)]), H(e, i);
		}), t(r), u((e) => {
			r.open = s().friends ?? n.room.members.length <= 1, b(a, `${e ?? ""} · ${h(w).length ?? ""}`);
		}, [() => n.vb.t("Seus amigos")]), H(e, r);
	};
	M(Me, (e) => {
		h(w).length && e(Ne);
	});
	var Pe = l(Me, 2), Fe = U(Pe), Ie = l(Fe);
	z(Ie, () => n.vb.icon("plus"), !0), t(Ie), t(Pe);
	var Le = l(Pe, 2);
	A(Le, 21, () => h(w), Ce, (e, t) => {
		var n = Ea(), r = {};
		u(() => {
			r !== (r = h(t)) && (n.value = (n.__value = r) ?? "");
		}), H(e, n);
	}), t(Le), t(Se), u((e, t, r, i, a, o, s, c, l, u) => {
		V(O, "aria-label", e), V(ne, "title", t), V(ne, "aria-label", r), B = F(ie, 1, "thread", null, B, {
			sel: n.thread === "main",
			waiting: i
		}), V(ie, "title", a), b(se, o), b(pe, s), _e = F(ge, 1, "epList", null, _e, { arch: h(v) }), b(De, c), V(Fe, "placeholder", l), V(Ie, "aria-label", u);
	}, [
		() => n.vb.t("Fechar"),
		() => n.vb.t("Recolher menu"),
		() => n.vb.t("Recolher menu"),
		() => n.vb.waitsIn("main").length > 0,
		() => `${n.vb.bookTitle()}${n.room.book?.summary ? ` · ${n.room.book.summary}` : ""}`,
		() => n.vb.bookTitle(),
		() => d("main"),
		() => n.vb.t("Pessoas e agents"),
		() => n.vb.t("convidar por email"),
		() => n.vb.t("convidar por email")
	]), H(e, D), E();
}
// svelte/Message.svelte
var ka = o("<span class=\"gut\"> </span>"), Aa = o(" <span class=\"agentTag\">agent</span>", 1), ja = o("<span class=\"doneTag\"> </span>"), Ma = o("<div><!> <!> <span class=\"mact\"><button type=\"button\" class=\"rbtn\"><!> </button> <button type=\"button\" class=\"rbtn\"><!> </button> <button type=\"button\" class=\"rbtn\"><!> </button></span> <div class=\"body\"><!> <div class=\"who\"><!> <!> <span class=\"hhmm\"> </span></div> <div class=\"txt\"></div> <!> <!> <!> <!> <!></div></div>");
function Na(e, n) {
	k(n, !0);
	let i = T(n, "origin", 3, !1), a = f(() => n.vb.continues(n.previous, n.message)), o = f(() => n.message.tag === "reminder" ? n.vb.remHtml(n.message, i()) : n.message.tag === "issue" ? n.vb.issueHtml(n.message) : n.vb.isNotice(n.message) ? n.vb.noticeHtml(n.message) : null), s = f(() => i() && h(o) ? h(o).replace(/\sid="m\d+"/, "") : h(o)), c = f(() => !n.message.text && n.typing ? `<span class="typing">${n.vb.esc(n.vb.typingNote?.(n.message.id) || n.vb.t("pensando ({mode})", { mode: n.vb.typingLabel?.(n.typing) ?? n.typing }))}…</span>` : n.message.author === "ai" ? n.message.text ? n.vb.mentions(n.vb.md(n.message.text)) : n.message.poll ? "" : `<span class="typing">${n.vb.t("pensando…")}</span>` : n.message.text ? n.vb.mentions(n.message.kind === "agent" ? n.vb.md(n.message.text) : n.vb.linkify(n.vb.esc(n.message.text))) : ""), d = f(() => n.vb.dateTime?.(n.message.ts) ?? new Date(n.message.ts).toLocaleString());
	var p = x(), m = r(p), _ = (e) => {
		var t = x(), n = r(t);
		z(n, () => h(s)), H(e, t);
	}, v = (e) => {
		var o = Ma();
		let s;
		var f = U(o);
		z(f, () => n.message.kind === "agent" ? n.vb.agentAvatar(n.message.author, n.message.via) : n.vb.avatar(n.message.author));
		var p = l(f, 2), m = (e) => {
			var t = ka(), r = C(t, !0);
			u((e) => {
				V(t, "title", h(d)), b(r, e);
			}, [() => n.vb.hhmm(n.message.ts)]), H(e, t);
		};
		M(p, (e) => {
			h(a) && e(m);
		});
		var _ = l(p, 2), v = U(_), y = U(v);
		z(y, () => n.vb.icon("copy", 14));
		var S = l(y);
		t(v);
		var w = l(v, 2), T = U(w);
		z(T, () => n.vb.icon("link", 14));
		var E = l(T);
		t(w);
		var D = l(w, 2), O = U(D);
		z(O, () => n.vb.icon("reply", 14));
		var k = l(O);
		t(D), t(_);
		var A = l(_, 2), j = U(A), ee = (e) => {
			var t = x(), i = r(t);
			z(i, () => n.vb.quoteHtml(n.message.reply_to)), H(e, t);
		};
		M(j, (e) => {
			n.message.reply_to && e(ee);
		});
		var N = l(j, 2), P = U(N), I = (e) => {
			var t = Aa(), i = r(t), a = l(i);
			u((e, t) => {
				b(i, `${e ?? ""} `), V(a, "title", t);
			}, [() => n.vb.t("{via} de {who}", {
				via: n.message.via || "agent",
				who: n.vb.name(n.message.author)
			}), () => n.vb.t("Escrito pelo agent dessa pessoa, em nome dela")]), H(e, t);
		}, L = (e) => {
			var t = g();
			u((e) => b(t, e), [() => n.vb.name(n.message.author)]), H(e, t);
		};
		M(P, (e) => {
			n.message.kind === "agent" ? e(I) : e(L, -1);
		});
		var R = l(P, 2), te = (e) => {
			var t = ja(), r = C(t);
			u((e, n) => {
				V(t, "title", e), b(r, `✓ ${n ?? ""}`);
			}, [() => n.vb.t("Reporta algo entregue"), () => n.vb.t("entregue")]), H(e, t);
		};
		M(R, (e) => {
			n.message.tag === "done" && e(te);
		});
		var ne = l(R), re = l(ne), ie = C(re, !0);
		t(N);
		var B = l(N, 2);
		z(B, () => h(c), !0), t(B);
		var ae = l(B, 2);
		z(ae, () => n.vb.attHtml(n.message.files));
		var oe = l(ae, 2), se = (e) => {
			var t = x(), i = r(t);
			z(i, () => n.vb.cardHtml(n.message)), H(e, t);
		};
		M(oe, (e) => {
			n.message.card && e(se);
		});
		var ce = l(oe, 2), le = (e) => {
			var t = x(), i = r(t);
			z(i, () => n.vb.choiceHtml(n.message)), H(e, t);
		};
		M(ce, (e) => {
			n.message.choices && e(le);
		});
		var ue = l(ce, 2), de = (e) => {
			var t = x(), i = r(t);
			z(i, () => n.vb.pollHtml(n.message.poll)), H(e, t);
		};
		M(ue, (e) => {
			n.message.poll && e(de);
		});
		var fe = l(ue, 2), pe = (e) => {
			var t = x(), i = r(t);
			z(i, () => n.vb.threadCards(n.message.id)), H(e, t);
		};
		M(fe, (e) => {
			i() || e(pe);
		}), t(A), t(o), u((e, t, r, l, u, f, p, m, g, _, y, x) => {
			s = F(o, 1, "msg", null, s, {
				ai: n.message.author === "ai",
				agent: n.message.author !== "ai" && n.message.kind === "agent",
				done: n.message.tag === "done",
				cont: h(a),
				waitMsg: e
			}), V(o, "id", i() ? void 0 : `m${n.message.id}`), V(v, "data-copymsg", n.message.id), V(v, "title", t), V(v, "aria-label", r), b(S, ` ${l ?? ""}`), V(w, "data-copylink", n.message.id), V(w, "title", u), V(w, "aria-label", f), b(E, ` ${p ?? ""}`), V(D, "data-reply", n.message.id), V(D, "title", m), V(D, "aria-label", g), b(k, ` ${_ ?? ""}`), b(ne, ` · ${y ?? ""}`), V(re, "title", h(d)), b(ie, x), V(B, "hidden", !h(c));
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
		]), H(e, o);
	};
	M(m, (e) => {
		h(s) === null ? e(v, -1) : e(_);
	}), H(e, p), E();
}
// svelte/Chat.svelte
var Pa = o("<div class=\"older\"><button type=\"button\" class=\"ghost\" id=\"olderBtn\"> </button></div>"), Fa = o("<div class=\"origin\"><!> <div class=\"replies\"><span> </span><button type=\"button\" class=\"ghost\"> <!></button></div></div>"), Ia = o("<div><!></div>"), La = o("<!> <!> <!>", 1);
function Ra(e, i) {
	k(i, !0);
	let a = T(i, "more", 3, !1), o = T(i, "origin", 3, null), s = T(i, "replyCount", 3, 0);
	var c = x(), d = r(c);
	Te(d, () => i.room.id + ":" + i.thread, (e) => {
		var c = La(), d = r(c), p = (e) => {
			var r = Pa(), a = U(r), o = C(a, !0);
			t(r), u((e) => b(o, e), [() => i.vb.t("Carregar mensagens anteriores")]), n("click", a, function(...e) {
				i.onloadolder?.apply(this, e);
			}), H(e, r);
		};
		M(d, (e) => {
			i.list.length && a() && e(p);
		});
		var m = l(d, 2), _ = (e) => {
			var n = Fa(), r = U(n);
			Na(r, {
				get message() {
					return o();
				},
				origin: !0,
				get typing() {
					return i.room.typing[o().id];
				},
				get vb() {
					return i.vb;
				}
			});
			var a = l(r, 2), c = U(a), d = C(c, !0), f = l(c), p = U(f), m = l(p);
			z(m, () => i.vb.icon("reply", 13)), t(f), t(a), t(n), u((e, t) => {
				b(d, e), V(f, "data-gomain", o().id), b(p, `${t ?? ""} `);
			}, [() => s() === 1 ? i.vb.t("1 resposta") : i.vb.t("{n} respostas", { n: s() }), () => i.vb.t("ver na sala principal")]), H(e, n);
		};
		M(m, (e) => {
			o() && e(_);
		});
		var v = l(m, 2), y = (e) => {
			var t = x(), n = r(t);
			A(n, 19, () => i.list, (e) => e.id, (e, t, n) => {
				{
					let r = f(() => h(n) ? i.list[h(n) - 1] : i.previous);
					Na(e, {
						get message() {
							return h(t);
						},
						get previous() {
							return h(r);
						},
						get typing() {
							return i.room.typing[h(t).id];
						},
						get vb() {
							return i.vb;
						}
					});
				}
			}), H(e, t);
		}, S = (e) => {
			var n = Ia();
			let a;
			var s = U(n), c = (e) => {
				var t = x(), n = r(t);
				z(n, () => i.vb.t("Comece a conversa. Os agents ligados nesta sala leem e respondem; o seu age com o seu OK. Ex.: <i>organiza o projeto em épicos: site novo, aluguéis e domínio</i>.")), H(e, t);
			}, l = (e) => {
				var t = g();
				u((e) => b(t, e), [() => i.vb.t("Discussão deste épico. Os agents leem as tarefas, o doc e a sala principal.")]), H(e, t);
			};
			M(s, (e) => {
				i.thread === "main" ? e(c) : e(l, -1);
			}), t(n), u(() => a = F(n, 1, "empty", null, a, { afterOrigin: !!o() })), H(e, n);
		};
		M(v, (e) => {
			i.list.length ? e(y) : e(S, -1);
		}), H(e, c);
	}), H(e, c), E();
}
B(["click"]);
// svelte/roomStore.ts
function za(e, t, n) {
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
function Ba() {
	let e = ce(null);
	return {
		subscribe: e.subscribe,
		get: () => be(e),
		replace: e.set,
		apply(t, n) {
			return e.update((e) => za(e, t, n)), be(e);
		}
	};
}
// svelte/main.ts
var Va = /* @__PURE__ */ De({
	createRoomStore: () => Ba,
	dismissDialogs: () => de,
	mountInbox: () => Wa,
	mountView: () => Ua
}), Ha = {
	tasks: qe,
	board: ht,
	files: Et,
	reminders: ca,
	sidebar: Oa,
	chat: Ra
};
function Ua(e, t, n) {
	let r = ce(n), a = Ha[e], o = me(() => we(Oe, {
		target: t,
		props: {
			component: a,
			values: r
		}
	}));
	return {
		update(e) {
			me(() => r.set(e));
		},
		destroy() {
			me(() => {
				i(o);
			});
		}
	};
}
function Wa(e, t) {
	let { waits: n, ...r } = t, a = ce(n), o = me(() => we(Fe, {
		target: e,
		props: {
			props: r,
			waits: a
		}
	}));
	return Object.assign(() => me(() => {
		i(o);
	}), { updateWaits(e) {
		me(() => a.set(e));
	} });
}
export { $i as a, ke as c, Ba as i, Wa as n, Xi as o, Ua as r, Yi as s, Va as t };
