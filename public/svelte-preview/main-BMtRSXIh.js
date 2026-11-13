import { $ as e, $t as t, At as n, Bt as r, Ct as i, Dt as a, Et as o, Ft as s, Gt as c, Ht as l, It as u, J as d, Jt as f, K as p, Lt as m, Nt as h, Ot as g, Pt as _, Q as v, Qt as y, St as b, Tt as x, Ut as S, Vt as C, Wt as w, X as T, Xt as E, Yt as D, Z as O, Zt as k, _t as A, a as j, bt as M, c as N, ct as P, d as F, dt as I, en as L, et as R, f as z, ft as ee, gt as B, h as te, i as ne, jt as re, kt as V, l as ie, lt as H, mt as ae, n as oe, nt as se, o as ce, ot as le, p as ue, pt as de, q as fe, qt as pe, r as me, s as he, st as ge, t as _e, tn as ve, tt as ye, u as be, ut as xe, vt as Se, wt as U, xt as Ce, yt as we, zt as W } from "./Field-7wvr8rLl.js";
// \0rolldown/runtime.js
var Te = Object.defineProperty, Ee = (e, t) => {
	let n = {};
	for (var r in e) Te(n, r, {
		get: e[r],
		enumerable: !0
	});
	return t || Te(n, Symbol.toStringTag, { value: "Module" }), n;
};
// svelte/View.svelte
function De(t, n) {
	let i = () => R(n.values, "$values", a), [a, o] = e();
	var s = x(), c = r(s);
	ae(c, () => n.component, (e, t) => {
		t(e, v(i));
	}), U(t, s), o();
}
// shared/uiVariant.ts
function Oe(e, t, n) {
	let r = new URL(t), i = new URL(e, r);
	return i.origin !== r.origin || !/^\/(?:app|archived|login|b\/[a-z0-9]+)\/?$/.test(i.pathname) ? String(e) : (n === "svelte" ? i.searchParams.set("ui", "svelte") : i.searchParams.delete("ui"), i.pathname + i.search + i.hash);
}
// svelte/Inbox.svelte
var ke = o("<span class=\"tw:grid tw:size-8 tw:shrink-0 tw:place-items-center tw:rounded-full tw:border tw:border-border tw:bg-muted\"><!></span>"), Ae = o("<li class=\"tw:flex tw:items-start tw:gap-2 tw:py-1\"><a class=\"tw:flex tw:min-w-0 tw:flex-1 tw:gap-3 tw:rounded-control tw:p-2 tw:text-foreground tw:no-underline tw:outline-none tw:hover:bg-accent tw:focus-visible:ring-2 tw:focus-visible:ring-ring\"><!> <span class=\"tw:flex tw:min-w-0 tw:flex-1 tw:flex-col tw:gap-1 tw:text-sm tw:leading-5 tw:[overflow-wrap:anywhere]\"><span class=\"tw:line-clamp-3\"><strong class=\"tw:font-semibold\"> </strong> </span> <span class=\"tw:text-xs tw:leading-4 tw:text-muted-foreground\"> </span></span></a> <!></li>"), je = o("<ul class=\"tw:m-0 tw:max-h-[60dvh] tw:min-h-0 tw:list-none tw:divide-y tw:divide-border tw:overflow-auto tw:overscroll-contain tw:p-0\"></ul>"), Me = o("<!> <!>", 1);
function Ne(e, i) {
	k(i, !0);
	let a = (e) => {
		var a = x(), o = r(a), s = (e) => {
			var r = je();
			A(r, 21, () => h(D), (e) => j(e), (e, r) => {
				var a = Ae(), o = W(a), s = W(o), c = (e) => {
					var n = ke(), r = W(n);
					te(r, { name: "check" }), t(n), U(e, n);
				}, d = f(() => P(h(r)) === "task"), m = (e) => {
					{
						let t = f(() => F(h(r))), n = f(() => i.avatarUrl?.(h(r).author));
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
				var _ = l(s, 2), v = W(_), x = W(v), S = C(x, !0), w = l(x);
				t(v);
				var T = l(v, 2), E = C(T);
				t(_), t(o);
				var D = l(o, 2), O = (e) => {
					{
						let t = f(() => i.vb.t("Já resolvi (respondi em outro lugar, ou não é comigo)")), n = f(() => h(g) === j(h(r))), a = f(() => h(g) !== null);
						be(e, {
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
							onclick: () => L(h(r))
						});
					}
				}, k = f(() => h(r).ref.startsWith("m"));
				M(D, (e) => {
					h(k) && e(O);
				}), t(a), u((e, t, n, i) => {
					H(o, "href", e), b(S, t), b(w, ` ${h(r).text ?? ""}`), b(E, `${h(y) ? `${h(r).room} › ` : ""}${n ?? ""} · ${i ?? ""}`);
				}, [
					() => I(h(r)),
					() => P(h(r)) === "task" ? i.vb.t("Tarefa sua esperando OK:") : P(h(r)) === "agent" ? i.vb.t("Seu agent espera você:") : `${F(h(r)).split(" ")[0]}:`,
					() => h(r).topic || i.vb.t("sala principal"),
					() => i.vb.ago(h(r).ts)
				]), n("click", o, (e) => i.onopen(h(r), e)), U(e, a);
			}), t(r), U(e, r);
		}, c = (e) => {
			{
				let t = f(() => h(y) ? i.vb.t("Nada esperando você. ✓") : i.vb.t("Nada esperando você nesta sala. ✓"));
				N(e, { get title() {
					return h(t);
				} });
			}
		};
		M(o, (e) => {
			h(D).length ? e(s) : e(c, -1);
		}), U(e, a);
	}, o = T(i, "all", 3, !1), d = c(S(s(() => o() || !i.roomId ? "all" : "room"))), m = c(!0), g = c(null), _ = c(""), v = f(() => i.waits.filter((e) => e.book_id === i.roomId)), y = f(() => h(d) === "all" || !i.roomId), D = f(() => h(y) ? i.waits : h(v)), O = f(() => [{
		value: "room",
		label: `${i.vb.t("Esta sala")} (${h(v).length})`
	}, {
		value: "all",
		label: `${i.vb.t("Todas")} (${i.waits.length})`
	}]), j = (e) => `${e.book_id}:${e.ref}`, P = (e) => e.ref.startsWith("t") ? "task" : /^[ab]/.test(e.ref) ? "agent" : "ask", F = (e) => e.author_name || i.displayName?.(e.author) || e.author.split("@")[0];
	function I(e) {
		return Oe(`/b/${encodeURIComponent(e.book_id)}${e.thread === "main" ? "" : `?t=${encodeURIComponent(e.thread)}`}${/^[mab]/.test(e.ref) ? `#m${e.ref.slice(1)}` : ""}`, window.location.href, "svelte");
	}
	async function L(e) {
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
			var t = Me(), n = r(t), o = (e) => {
				he(e, {
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
					ie(e, {
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
			}), U(e, t);
		}, n = f(() => i.vb.t("Caixa de entrada")), o = f(() => i.vb.t("Fechar"));
		z(e, {
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
V(["click"]);
// svelte/InboxMount.svelte
function Pe(t, n) {
	let r = () => R(n.waits, "$waits", i), [i, a] = e();
	Ne(t, v(() => n.props, { get waits() {
		return r();
	} })), a();
}
// svelte/lib/ui/Progress.svelte
var Fe = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"value",
	"max",
	"label",
	"class"
]), Ie = o("<progress> </progress>");
function Le(e, t) {
	k(t, !0);
	let n = T(t, "max", 3, 100), r = O(t, Fe), i = f(() => Number.isFinite(n()) && n() > 0 ? n() : 100), a = f(() => Number.isFinite(t.value) ? Math.min(h(i), Math.max(0, t.value)) : 0);
	var o = Ie();
	ge(o, (e) => ({
		...r,
		max: h(i),
		value: h(a),
		"aria-label": t.label,
		class: e
	}), [() => fe("tw:h-1.5 tw:w-full tw:overflow-hidden tw:rounded-full tw:border-0 tw:bg-muted tw:appearance-none tw:[&::-webkit-progress-bar]:rounded-full tw:[&::-webkit-progress-bar]:bg-muted tw:[&::-webkit-progress-value]:rounded-full tw:[&::-webkit-progress-value]:bg-primary tw:[&::-moz-progress-bar]:rounded-full tw:[&::-moz-progress-bar]:bg-primary", t.class)]);
	var s = C(o);
	u(() => b(s, `${h(a) ?? ""}/${h(i) ?? ""}`)), U(e, o), E();
}
// svelte/TaskList.svelte
var Re = o("<!> ", 1), ze = o("<div class=\"tw:min-w-0 tw:flex-1 tw:basis-32 tw:space-y-1\"><!> <!></div>"), Be = o("<div role=\"group\"><!> <!> <!> <!> <!></div>"), Ve = o("<section data-vb-native=\"\" class=\"tw:m-0 tw:box-border tw:space-y-3 tw:rounded-surface tw:bg-background tw:p-3 tw:font-sans tw:text-sm tw:text-foreground\"><header class=\"tw:flex tw:items-center tw:gap-3\"><h3 class=\"tw:m-0 tw:font-sans tw:text-sm tw:font-semibold\"> </h3> <!> <!></header> <!> <!> <div class=\"tw:space-y-2\"></div> <form id=\"newTask\" class=\"tw:flex tw:items-center tw:gap-2\"><!> <!></form></section>"), He = o("<form class=\"tw:grid tw:grid-cols-1 tw:gap-4\"><!> <!> <div class=\"tw:flex tw:flex-wrap tw:justify-end tw:gap-2\"><!><!></div></form>"), Ue = o("<!> <!>", 1);
function We(e, n) {
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
	}))]), S = c(null), D = c(""), O = c(null), N = c(""), P = c(""), R = c(null), B = c(!1), V = c(""), ie = c(null), ae = f(() => h(s)?.tasks.find((e) => e.id === h(R)));
	m(() => {
		h(S) && h(O) && (h(O).focus(), h(O).select());
	}), m(() => {
		h(R) && !h(ae) && ue(), h(S) && !h(s)?.tasks.some((e) => e.id === h(S)) && w(S, null);
	});
	function oe(e) {
		try {
			if (n.send(e)) return w(P, ""), !0;
		} catch {}
		return w(P, n.vb.t("Não deu pra enviar agora. Tente de novo."), !0), !1;
	}
	function se(e, t = !0) {
		h(S) !== e.id || t && h(D).trim() && h(D) !== e.title && !oe({
			t: "task.rename",
			id: e.id,
			title: h(D)
		}) || w(S, null);
	}
	function le(e) {
		w(R, e.id, !0), w(V, e.due ?? "", !0), w(B, !0);
	}
	function ue() {
		w(B, !1), w(R, null), w(V, "");
	}
	var de = Ue(), pe = r(de), ge = (e) => {
		var i = Ve(), a = W(i), o = W(a), c = C(o, !0), m = l(o, 2);
		me(m, {
			children: (e, t) => {
				y();
				var n = g();
				u(() => b(n, `${h(_) ?? ""}/${h(s).tasks.length ?? ""}`)), U(e, n);
			},
			$$slots: { default: !0 }
		});
		var v = l(m, 2);
		{
			let e = f(() => n.vb.t("Tarefas")), t = f(() => Math.max(1, h(s).tasks.length)), r = f(() => `${h(_)}/${h(s).tasks.length}`);
			Le(v, {
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
				me(e, {
					variant: "warning",
					get title() {
						return h(t);
					},
					children: (e, t) => {
						var n = Re(), i = r(n);
						te(i, {
							name: "warning",
							class: "tw:size-3"
						});
						var a = l(i, 1, !0);
						u((e) => b(a, e), [() => h(s).flags.join(" · ")]), U(e, n);
					},
					$$slots: { default: !0 }
				});
			}
		};
		M(T, (e) => {
			h(s).flags?.length && e(E);
		});
		var k = l(T, 2), L = (e) => {
			he(e, {
				get title() {
					return h(P);
				},
				compact: !0
			});
		};
		M(k, (e) => {
			h(P) && !h(B) && e(L);
		});
		var R = l(k, 2);
		A(R, 21, () => h(p), (e) => e.id, (e, i) => {
			var a = Be(), o = W(a);
			{
				let e = f(() => n.vb.t("Feita"));
				ne(o, {
					get checked() {
						return h(i).done;
					},
					get "aria-label"() {
						return h(e);
					},
					onclick: (e) => {
						e.preventDefault(), oe({
							t: "task.toggle",
							id: h(i).id
						});
					}
				});
			}
			var s = l(o, 2), c = (e) => {
				{
					let t = f(() => n.vb.t("Clique para editar"));
					ce(e, {
						get "data-task-edit"() {
							return h(i).id;
						},
						get "aria-label"() {
							return h(t);
						},
						class: "tw:min-w-32 tw:flex-1",
						onblur: () => se(h(i)),
						onkeydown: (e) => {
							e.key === "Enter" && (e.preventDefault(), se(h(i))), e.key === "Escape" && (e.preventDefault(), se(h(i), !1));
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
				var a = ze(), o = W(a);
				{
					let e = f(() => fe("tw:h-auto tw:w-full tw:justify-start tw:whitespace-normal tw:rounded-sm tw:p-0 tw:text-left tw:hover:bg-transparent tw:hover:underline", h(i).done && "tw:text-muted-foreground tw:line-through")), t = f(() => n.vb.t("Clique para editar"));
					F(o, {
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
							u(() => b(n, h(i).title)), U(e, n);
						},
						$$slots: { default: !0 }
					});
				}
				var s = l(o, 2), c = (e) => {
					{
						let t = f(() => `@vibe: ${h(i).flags.join(" · ")}`);
						me(e, {
							variant: "warning",
							get title() {
								return h(t);
							},
							children: (e, t) => {
								var n = Re(), a = r(n);
								te(a, {
									name: "warning",
									class: "tw:size-3"
								});
								var o = l(a, 1, !0);
								u((e) => b(o, e), [() => h(i).flags.join(" · ")]), U(e, n);
							},
							$$slots: { default: !0 }
						});
					}
				};
				M(s, (e) => {
					h(i).flags?.length && e(c);
				}), t(a), U(e, a);
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
					onValueChange: (e) => oe({
						t: "task.assign",
						id: h(i).id,
						owner: e
					})
				});
			}
			var _ = l(m, 2);
			{
				let e = f(() => n.vb.t("Prazo")), t = f(() => h(i).due ? `${n.vb.t("Prazo")}: ${h(i).due}` : n.vb.t("Prazo"));
				F(_, {
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
					onclick: () => le(h(i)),
					children: (e, t) => {
						var n = Re(), a = r(n);
						te(a, {
							name: "calendar",
							class: "tw:size-3.5"
						});
						var o = l(a, 1, !0);
						u(() => b(o, h(i).due ?? "")), U(e, n);
					},
					$$slots: { default: !0 }
				});
			}
			var v = l(_, 2);
			{
				let e = f(() => n.vb.t("Apagar task"));
				be(v, {
					get "data-tdel"() {
						return h(i).id;
					},
					get label() {
						return h(e);
					},
					icon: "close",
					class: "tw:size-8",
					onclick: () => oe({
						t: "task.del",
						id: h(i).id
					})
				});
			}
			t(a), u((e) => {
				H(a, "data-task", h(i).id), H(a, "aria-label", h(i).title), I(a, 1, e);
			}, [() => ee(fe("tw:flex tw:flex-wrap tw:items-center tw:gap-2 tw:rounded-control tw:border tw:p-2", h(i).done ? "tw:border-transparent tw:bg-muted/40 tw:text-muted-foreground" : "tw:border-border tw:bg-card tw:text-card-foreground", !h(i).done && h(i).owner === n.room.me && "tw:border-ring/50", d(h(i)) && "tw:bg-warning/10"))]), U(e, a);
		}), t(R);
		var z = l(R, 2), V = W(z);
		{
			let e = f(() => n.vb.t("nova task")), t = f(() => n.vb.t("nova task"));
			ce(V, {
				get "aria-label"() {
					return h(e);
				},
				get placeholder() {
					return h(t);
				},
				get value() {
					return h(N);
				},
				set value(e) {
					w(N, e, !0);
				}
			});
		}
		var ie = l(V, 2);
		{
			let e = f(() => n.vb.t("Nova tarefa"));
			be(ie, {
				type: "submit",
				get label() {
					return h(e);
				},
				icon: "plus",
				variant: "outline"
			});
		}
		t(z), t(i), u((e, t) => {
			H(i, "aria-label", e), b(c, t);
		}, [() => n.vb.t("Tarefas"), () => n.vb.t("Tarefas")]), re("submit", z, (e) => {
			e.preventDefault(), h(N).trim() && oe({
				t: "task.add",
				epic: n.thread,
				title: h(N)
			}) && w(N, "");
		}), U(e, i);
	};
	M(pe, (e) => {
		h(s) && e(ge);
	});
	var ve = l(pe, 2), ye = (e) => {
		{
			let r = f(() => n.vb.t("Prazo")), a = f(() => n.vb.t("Prazo (ex.: sex, qua 23h, 06/11). Vazio tira o prazo:")), o = f(() => n.vb.t("Fechar"));
			z(e, {
				get title() {
					return h(r);
				},
				get description() {
					return h(a);
				},
				get closeLabel() {
					return h(o);
				},
				initialFocus: () => h(ie),
				onOpenChange: (e) => {
					e || ue();
				},
				get open() {
					return h(B);
				},
				set open(e) {
					w(B, e, !0);
				},
				children: (e, r) => {
					var a = He(), o = W(a);
					{
						let e = (e, t = L) => {
							ce(e, v(t, {
								get ref() {
									return h(ie);
								},
								set ref(e) {
									w(ie, e, !0);
								},
								get value() {
									return h(V);
								},
								set value(e) {
									w(V, e, !0);
								}
							}));
						}, t = f(() => `${i}-due`), r = f(() => n.vb.t("Prazo"));
						_e(o, {
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
						he(e, {
							get title() {
								return h(P);
							},
							compact: !0
						});
					};
					M(s, (e) => {
						h(P) && e(c);
					});
					var d = l(s, 2), p = W(d);
					F(p, {
						variant: "outline",
						onclick: ue,
						children: (e, t) => {
							y();
							var r = g();
							u((e) => b(r, e), [() => n.vb.t("Cancelar")]), U(e, r);
						},
						$$slots: { default: !0 }
					});
					var m = l(p);
					F(m, {
						type: "submit",
						children: (e, t) => {
							y();
							var r = g();
							u((e) => b(r, e), [() => n.vb.t("Salvar")]), U(e, r);
						},
						$$slots: { default: !0 }
					}), t(d), t(a), re("submit", a, (e) => {
						e.preventDefault(), h(ae) && oe({
							t: "task.assign",
							id: h(ae).id,
							due: h(V)
						}) && ue();
					}), U(e, a);
				},
				$$slots: { default: !0 }
			});
		}
	};
	M(ve, (e) => {
		h(ae) && e(ye);
	}), U(e, de), E();
}
// svelte/Tasks.svelte
var Ge = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy"
]);
function Ke(e, t) {
	k(t, !0);
	let n = O(t, Ge);
	var i = x(), a = r(i);
	we(a, () => JSON.stringify([t.room.id, t.thread]), (e) => {
		We(e, v(() => n));
	}), U(e, i), E();
}
// shared/room.ts
var qe = [
	"todo",
	"doing",
	"review",
	"done"
], Je = {
	todo: "A fazer",
	doing: "Fazendo",
	review: "Esperando OK",
	done: "Feito"
}, Ye = qe.map((e) => ({
	value: e,
	label: Je[e]
}));
function Xe(e, t) {
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
function Ze() {
	try {
		return localStorage.getItem("vb.boardMode") === "list" ? "list" : "board";
	} catch {
		return "board";
	}
}
function Qe(e, t) {
	return Ye[Ye.findIndex((t) => t.value === e) + t]?.value;
}
function $e(e) {
	return Ye.some((t) => t.value === e);
}
// svelte/features/board/BoardPanel.svelte
var et = o("<!> ", 1), tt = o("<!><span> </span>", 1), nt = o("<span class=\"tw:inline-flex tw:items-center tw:gap-1\"><!> </span>"), rt = o("<span data-board-drag=\"\" draggable=\"true\" aria-hidden=\"true\" class=\"tw:absolute tw:right-2 tw:top-2 tw:grid tw:size-7 tw:cursor-grab tw:place-items-center tw:rounded-md tw:text-muted-foreground tw:active:cursor-grabbing\"><!></span>"), it = o("<article><button type=\"button\" data-board-open=\"\"><span> </span> <!> <span class=\"tw:flex tw:flex-wrap tw:items-center tw:gap-2 tw:text-xs tw:text-muted-foreground\"><!> <!> <!></span></button> <!> <div><!> <!></div></article>"), at = o("<p class=\"tw:m-0 tw:py-4 tw:text-xs tw:text-muted-foreground\"> </p>"), ot = o("<section><h3 class=\"tw:m-0 tw:flex tw:items-center tw:justify-between tw:gap-2 tw:font-sans tw:text-sm tw:font-semibold tw:leading-5 tw:tracking-normal\"> <!></h3> <div class=\"tw:space-y-3\"></div></section>"), st = o("<div class=\"tw:h-full tw:min-h-0 tw:min-w-0 tw:overflow-auto tw:pb-2\"><div class=\"tw:grid tw:grid-cols-[repeat(4,minmax(15rem,1fr))] tw:gap-3\"></div></div>"), ct = o("<section class=\"tw:space-y-2\"><h3 class=\"tw:m-0 tw:flex tw:items-center tw:gap-2 tw:font-sans tw:text-sm tw:font-semibold tw:leading-5 tw:tracking-normal\"> <!></h3> <!></section>"), lt = o("<div class=\"tw:h-full tw:min-h-0 tw:space-y-5 tw:overflow-auto\"><!> <!></div>"), ut = o("<div class=\"tw:min-w-32 tw:flex-1 tw:space-y-1\"><!> <!></div>"), dt = o("<section data-vb-native=\"\" class=\"tw:m-0 tw:box-border tw:flex tw:min-h-0 tw:min-w-0 tw:flex-1 tw:flex-col tw:gap-3 tw:rounded-surface tw:bg-background tw:p-3 tw:font-sans tw:text-sm tw:text-foreground\"><p class=\"tw:m-0 tw:text-xs tw:text-muted-foreground\"> </p> <!> <p role=\"status\" aria-live=\"polite\" class=\"tw:sr-only\"> </p> <p class=\"tw:sr-only\"> </p> <!> <form class=\"tw:flex tw:shrink-0 tw:flex-wrap tw:items-end tw:gap-2\" data-board-add=\"\"><div class=\"tw:min-w-36 tw:flex-1 tw:space-y-1\"><!> <!></div> <!> <!></form></section>");
function ft(e, i) {
	let o = a();
	k(i, !0);
	let v = (e, a = L, s = L, c = L) => {
		var d = it(), m = W(d), _ = W(m), v = C(_, !0), x = l(_, 2), S = (e) => {
			{
				let t = f(() => `@vibe: ${a().flags.join(" · ")}`);
				me(e, {
					variant: "warning",
					get title() {
						return h(t);
					},
					children: (e, t) => {
						var n = et(), i = r(n);
						te(i, {
							name: "warning",
							class: "tw:size-3"
						});
						var o = l(i, 1, !0);
						u((e) => b(o, e), [() => a().flags.join(" · ")]), U(e, n);
					},
					$$slots: { default: !0 }
				});
			}
		};
		M(x, (e) => {
			a().flags?.length && e(S);
		});
		var T = l(x, 2), E = W(T);
		me(E, {
			children: (e, t) => {
				y();
				var n = g();
				u(() => b(n, a().epicTitle)), U(e, n);
			},
			$$slots: { default: !0 }
		});
		var D = l(E, 2), O = (e) => {
			var t = tt(), n = r(t);
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
			u((e) => b(s, e), [() => a().owner === i.room.me ? i.vb.t("você") : i.vb.name(a().owner)]), U(e, t);
		};
		M(D, (e) => {
			a().owner && e(O);
		});
		var k = l(D, 2), A = (e) => {
			var n = nt(), r = W(n);
			te(r, {
				name: "calendar",
				class: "tw:size-3"
			});
			var i = l(r, 1, !0);
			t(n), u(() => b(i, a().due)), U(e, n);
		};
		M(k, (e) => {
			a().due && e(A);
		}), t(T), t(m);
		var N = l(m, 2), P = (e) => {
			var n = rt(), r = W(n);
			te(r, { name: "grip" }), t(n), u((e) => H(n, "title", e), [() => i.vb.t("Arraste, ou use ← →. Clique pra abrir o épico.")]), U(e, n);
		};
		M(N, (e) => {
			c() || e(P);
		});
		var F = l(N, 2), R = W(F);
		{
			let e = f(() => `${o}-${s()}`);
			oe(R, {
				get for() {
					return h(e);
				},
				children: (e, t) => {
					y();
					var n = g();
					u((e) => b(n, e), [() => i.vb.t("Status")]), U(e, n);
				},
				$$slots: { default: !0 }
			});
		}
		var z = l(R, 2);
		{
			let e = f(() => `${o}-${s()}`), t = f(() => `${i.vb.t("Status")}: ${a().title}`);
			j(z, {
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
					return h(le);
				},
				onValueChange: (e) => ($e(e) && Se(a(), e, s()), !1)
			});
		}
		t(F), t(d), de(d, (e, t) => be?.(e, t), s), u((e, t, n, r) => {
			H(d, "data-board-task", a().id), H(d, "data-status", a().status), H(d, "draggable", !c()), I(d, 1, e), H(m, "data-epic", a().epicId), H(m, "aria-describedby", `${o}-keys`), I(m, 1, t), I(_, 1, n), b(v, a().title), I(F, 1, r);
		}, [
			() => ee(fe("tw:relative tw:min-w-0 tw:rounded-control tw:border tw:border-border tw:bg-card tw:text-card-foreground tw:shadow-xs", c() && "tw:flex tw:flex-wrap tw:items-center", h(ne) === a().id && "tw:opacity-50", a().status !== "done" && a().owner === i.room.me && "tw:ring-1 tw:ring-ring/20")),
			() => ee(fe("tw:block tw:w-full tw:min-w-0 tw:flex-1 tw:space-y-2 tw:rounded-control tw:border-0 tw:bg-transparent tw:p-3 tw:text-left tw:font-sans tw:text-sm tw:text-card-foreground tw:outline-none tw:hover:bg-accent tw:focus-visible:ring-2 tw:focus-visible:ring-ring", !c() && "tw:pr-10")),
			() => ee(fe("tw:block tw:break-words tw:font-medium", a().status === "done" && "tw:line-through")),
			() => ee(fe("tw:min-w-32 tw:space-y-1 tw:p-3", !c() && "tw:border-t tw:border-border"))
		]), re("dragstart", d, (e) => {
			e.target instanceof Element && e.target.closest("select") ? e.preventDefault() : (e.dataTransfer && (e.dataTransfer.setData("application/x-vibebook-task", a().id), e.dataTransfer.effectAllowed = "move", e.dataTransfer.setDragImage(e.currentTarget, 20, 20)), w(ne, a().id, !0));
		}), re("dragend", d, () => {
			w(ne, null), w(B, null);
		}), n("click", m, () => i.onopen?.(a().epicId)), n("keydown", m, (e) => Te(e, a(), s())), U(e, d);
	}, T = f(() => Xe(i.room, i.thread)), D = c(S(Ze())), O = c(""), P = c(null), R = c(""), z = c(""), B = c(null), ne = c(null), V = c(S(s(() => h(T).targets.find((e) => e.id === h(T).scope) ?? h(T).targets.find((e) => e.id !== "main") ?? h(T).targets[0] ?? {
		id: i.thread,
		title: i.thread
	}))), ae = f(() => h(T).targets.some((e) => e.id === h(V).id)), se = f(() => [...h(ae) ? [] : [{
		value: h(V).id,
		label: h(V).title,
		disabled: !0
	}], ...h(T).targets.map((e) => ({
		value: e.id,
		label: e.title
	}))]), le = f(() => Ye.map((e) => ({
		value: e.value,
		label: i.vb.t(e.label)
	}))), ue = f(() => h(T).groups.map((e) => ({
		...e,
		tasks: e.tasks.filter((e) => e.status !== "done")
	})).filter((e) => e.tasks.length)), pe = f(() => h(T).tasks.filter((e) => e.owner === i.room.me && e.status !== "done")), ge = /* @__PURE__ */ new Map(), _e = 0, ve = !1, ye = c(null);
	d(() => {
		ve = !0, _e++, ge.clear();
	});
	function be(e, t) {
		return ge.set(t, e), { destroy() {
			ge.get(t) === e && ge.delete(t);
		} };
	}
	function xe(e) {
		try {
			if (i.send(e)) return w(R, ""), !0;
		} catch {}
		return w(R, i.vb.t("Não deu pra enviar agora. Tente de novo."), !0), !1;
	}
	function Se(e, t, n) {
		if (e.status === t) return !0;
		let r = document.activeElement, i = r instanceof HTMLElement && ge.get(n)?.contains(r) ? r : null;
		return xe({
			t: "task.status",
			id: e.id,
			status: t
		}) ? (w(ye, {
			id: e.id,
			status: t,
			generation: ++_e,
			...i ? { focus: {
				key: n,
				node: i,
				selector: i.matches("select") ? "select" : "[data-board-open]"
			} } : {}
		}, !0), !0) : !1;
	}
	m(() => {
		let e = h(ye);
		if (!e) return;
		let t = [...i.room.roomTasks ?? [], ...i.room.epics.flatMap((e) => e.tasks)].find((t) => t.id === e.id);
		t ? t.status === e.status && (w(ye, null), w(z, `${t.title}: ${i.vb.t(Ye.find((e) => e.value === t.status)?.label ?? t.status)}`), Ce(e)) : (w(ye, null), Ce(e));
	});
	function Ce(e) {
		let t = e.focus;
		!t || document.activeElement !== t.node && document.activeElement !== document.body || _().then(() => {
			if (ve || e.generation !== _e || document.activeElement !== t.node && document.activeElement !== document.body) return;
			let n = ge.get(t.key)?.querySelector(t.selector) ?? h(P);
			n?.focus({ preventScroll: !0 }), n?.scrollIntoView({
				block: "nearest",
				inline: "nearest"
			});
		});
	}
	function we(e) {
		if (e === "board" || e === "list") {
			w(D, e, !0), _e++, w(ye, null);
			try {
				localStorage.setItem("vb.boardMode", e);
			} catch {}
		}
	}
	function Te(e, t, n) {
		let r = e.key === "ArrowRight" ? Qe(t.status, 1) : e.key === "ArrowLeft" ? Qe(t.status, -1) : void 0;
		r && (e.preventDefault(), Se(t, r, n));
	}
	function Ee(e, t) {
		e.preventDefault(), w(B, null);
		let n = e.dataTransfer?.getData("application/x-vibebook-task"), r = h(T).tasks.find((e) => e.id === n);
		w(ne, null), r && Se(r, t, `board:${r.id}`);
	}
	function De(e) {
		e.preventDefault(), h(O).trim() && (h(ae) ? xe({
			t: "task.add",
			epic: h(V).id,
			title: h(O).trim()
		}) && w(O, "") : w(R, i.vb.t("Escolha um épico."), !0));
	}
	var Oe = dt(), ke = W(Oe), Ae = C(ke, !0), je = l(ke, 2), Me = (e) => {
		{
			let t = f(() => h(T).missingScope ? i.vb.t("Épico não encontrado.") : h(ae) ? h(R) : i.vb.t("Escolha um épico."));
			he(e, {
				get title() {
					return h(t);
				},
				compact: !0
			});
		}
	};
	M(je, (e) => {
		(h(T).missingScope || !h(ae) || h(R)) && e(Me);
	});
	var Ne = l(je, 2), Pe = C(Ne, !0), Fe = l(Ne, 2), Ie = C(Fe, !0), Le = l(Fe, 2);
	{
		let e = (e, n = L) => {
			var a = x(), o = r(a), s = (e) => {
				var a = x(), o = r(a), s = (e) => {
					var n = st(), r = W(n);
					A(r, 21, () => Ye, (e) => e.value, (e, n) => {
						let r = f(() => h(T).tasks.filter((e) => e.status === h(n).value));
						var a = ot(), o = W(a), s = W(o, !0), c = l(s);
						me(c, {
							children: (e, t) => {
								y();
								var n = g();
								u(() => b(n, h(r).length)), U(e, n);
							},
							$$slots: { default: !0 }
						}), t(o);
						var d = l(o, 2);
						A(d, 21, () => h(r), (e) => e.id, (e, t) => {
							v(e, () => h(t), () => `board:${h(t).id}`, () => !1);
						}, (e) => {
							var t = at(), r = C(t, !0);
							u((e) => b(r, e), [() => i.vb.t(h(n).value === "todo" ? "Nada a fazer." : "Arraste um card pra cá.")]), U(e, t);
						}), t(d), t(a), u((e, t, r) => {
							H(a, "data-lane", h(n).value), H(a, "aria-label", e), I(a, 1, t), b(s, r);
						}, [
							() => i.vb.t(h(n).label),
							() => ee(fe("tw:min-w-0 tw:space-y-3 tw:rounded-surface tw:border tw:border-border tw:bg-muted/40 tw:p-3", h(B) === h(n).value && "tw:ring-2 tw:ring-ring")),
							() => i.vb.t(h(n).label)
						]), re("dragover", a, (e) => {
							e.dataTransfer?.types.includes("application/x-vibebook-task") && (e.preventDefault(), w(B, h(n).value, !0));
						}), re("dragleave", a, () => {
							w(B, null);
						}), re("drop", a, (e) => Ee(e, h(n).value)), U(e, a);
					}), t(r), t(n), U(e, n);
				}, c = (e) => {
					var n = lt(), r = W(n), a = (e) => {
						var n = ct(), r = W(n), a = W(r, !0), o = l(a);
						me(o, {
							variant: "warning",
							children: (e, t) => {
								y();
								var n = g();
								u(() => b(n, h(pe).length)), U(e, n);
							},
							$$slots: { default: !0 }
						}), t(r);
						var s = l(r, 2);
						A(s, 17, () => h(pe), (e) => e.id, (e, t) => {
							v(e, () => h(t), () => `mine:${h(t).id}`, () => !0);
						}), t(n), u((e, t) => {
							H(n, "aria-label", e), b(a, t);
						}, [() => i.vb.t("Esperando você"), () => i.vb.t("Esperando você")]), U(e, n);
					};
					M(r, (e) => {
						h(pe).length && e(a);
					});
					var o = l(r, 2);
					A(o, 17, () => h(ue), (e) => e.id, (e, n) => {
						var r = ct(), i = W(r), a = W(i, !0), o = l(a);
						me(o, {
							children: (e, t) => {
								y();
								var r = g();
								u(() => b(r, h(n).tasks.length)), U(e, r);
							},
							$$slots: { default: !0 }
						}), t(i);
						var s = l(i, 2);
						A(s, 17, () => h(n).tasks, (e) => e.id, (e, t) => {
							v(e, () => h(t), () => `group:${h(t).id}`, () => !0);
						}), t(r), u(() => {
							H(r, "aria-label", h(n).title), b(a, h(n).title);
						}), U(e, r);
					}, (e) => {
						{
							let t = f(() => i.vb.t("Nenhuma tarefa aberta."));
							N(e, { get title() {
								return h(t);
							} });
						}
					}), t(n), U(e, n);
				};
				M(o, (e) => {
					n() === "board" ? e(s) : e(c, -1);
				}), U(e, a);
			};
			M(o, (e) => {
				n() === h(D) && e(s);
			}), U(e, a);
		}, n = f(() => i.vb.t("Quadro de tarefas")), a = f(() => [{
			value: "board",
			label: i.vb.t("Quadro")
		}, {
			value: "list",
			label: i.vb.t("Lista")
		}]);
		ie(Le, {
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
			onValueChange: we,
			children: e,
			$$slots: { default: !0 }
		});
	}
	var Re = l(Le, 2), ze = W(Re), Be = W(ze);
	{
		let e = f(() => `${o}-title`);
		oe(Be, {
			get for() {
				return h(e);
			},
			children: (e, t) => {
				y();
				var n = g();
				u((e) => b(n, e), [() => i.vb.t("Nova tarefa")]), U(e, n);
			},
			$$slots: { default: !0 }
		});
	}
	var Ve = l(Be, 2);
	{
		let e = f(() => `${o}-title`), t = f(() => i.vb.t("nova tarefa"));
		ce(Ve, {
			get id() {
				return h(e);
			},
			get placeholder() {
				return h(t);
			},
			get ref() {
				return h(P);
			},
			set ref(e) {
				w(P, e, !0);
			},
			get value() {
				return h(O);
			},
			set value(e) {
				w(O, e, !0);
			}
		});
	}
	t(ze);
	var He = l(ze, 2), Ue = (e) => {
		var n = ut(), r = W(n);
		{
			let e = f(() => `${o}-epic`);
			oe(r, {
				get for() {
					return h(e);
				},
				children: (e, t) => {
					y();
					var n = g();
					u((e) => b(n, e), [() => i.vb.t("Épico")]), U(e, n);
				},
				$$slots: { default: !0 }
			});
		}
		var a = l(r, 2);
		{
			let e = f(() => `${o}-epic`), t = f(() => !h(ae));
			j(a, {
				get id() {
					return h(e);
				},
				get "aria-invalid"() {
					return h(t);
				},
				get items() {
					return h(se);
				},
				get value() {
					return h(V).id;
				},
				onValueChange: (e) => {
					let t = h(T).targets.find((t) => t.id === e);
					if (!t) return !1;
					w(V, t, !0), w(R, "");
				}
			});
		}
		t(n), U(e, n);
	};
	M(He, (e) => {
		h(T).scope || e(Ue);
	});
	var We = l(He, 2);
	{
		let e = f(() => !h(O).trim() || !h(ae));
		F(We, {
			type: "submit",
			get disabled() {
				return h(e);
			},
			children: (e, t) => {
				var n = et(), a = r(n);
				te(a, { name: "plus" });
				var o = l(a, 1, !0);
				u((e) => b(o, e), [() => i.vb.t("Nova tarefa")]), U(e, n);
			},
			$$slots: { default: !0 }
		});
	}
	t(Re), t(Oe), u((e, t, n) => {
		H(Oe, "data-board-scope", h(T).scope ?? "all"), H(Oe, "aria-label", e), b(Ae, t), b(Pe, h(z)), H(Fe, "id", `${o}-keys`), b(Ie, n);
	}, [
		() => i.vb.t("Quadro de tarefas"),
		() => h(T).title ?? (h(T).scope ? h(V).title : i.vb.t("Todos os épicos")),
		() => i.vb.t("Arraste, ou use ← →. Clique pra abrir o épico.")
	]), re("submit", Re, De), U(e, Oe), E();
}
V(["click", "keydown"]);
// svelte/Board.svelte
var pt = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy"
]);
function mt(e, t) {
	k(t, !0);
	let n = O(t, pt);
	var i = x(), a = r(i);
	we(a, () => JSON.stringify([t.room.id, t.thread]), (e) => {
		ft(e, v(() => n));
	}), U(e, i), E();
}
// svelte/panels.ts
var ht = (e) => e.type.startsWith("image/") ? "img" : e.type.startsWith("audio/") ? "audio" : e.type === "text/html" ? "html" : e.type === "application/pdf" ? "pdf" : /\.md$/i.test(e.name) || e.type === "text/markdown" ? "md" : e.type === "text/plain" || e.type === "text/csv" ? "txt" : "other", gt = (e) => e > 1e6 ? `${(e / 1e6).toFixed(1)} MB` : `${Math.max(1, Math.round(e / 1e3))} KB`, _t = o("<button type=\"button\"> <small> </small></button>"), vt = o("<div class=\"ftabs\"></div>"), yt = o("<div class=\"fcrumb\"><button type=\"button\" class=\"ghost\"> </button><b><!> </b></div>"), bt = o("<button type=\"button\" class=\"ftile fdir\"><div class=\"thumb\"></div> <b> </b><small> </small></button>"), xt = o("<img loading=\"lazy\"/>"), St = o("<a class=\"ftile\" target=\"_blank\" rel=\"noopener\"><div class=\"thumb\"><!></div> <b> </b><small> </small> <button type=\"button\" data-pin-kind=\"file\"></button></a>"), Ct = o("<div class=\"empty\"> </div>"), wt = o("<!> <!> <div class=\"fgrid\"><!> <!></div> <!>", 1);
function Tt(e, i) {
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
			let n = ht(t);
			e[n] = (e[n] || 0) + 1;
		}
		return e;
	}), g = f(() => h(p)[h(o)] ? h(o) : "all"), _ = f(() => h(d).filter((e) => h(g) === "all" || ht(e) === h(g))), v = (e) => e.name.includes("/") ? e.name.slice(0, e.name.lastIndexOf("/")) : "", y = f(() => h(s) && h(_).some((e) => v(e) === h(s) || v(e).startsWith(h(s) + "/")) ? h(s) : ""), S = f(() => h(y) ? h(y) + "/" : "");
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
	function N(e, t) {
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
	var P = x(), F = r(P), L = (e) => {
		var s = wt(), c = r(s), d = (e) => {
			var r = vt();
			A(r, 21, () => a.filter(([e]) => h(p)[e]), Se, (e, r) => {
				var a = f(() => ve(h(r), 2));
				let s = () => h(a)[0], c = () => h(a)[1];
				var d = _t();
				let m;
				var _ = W(d), v = l(_), y = C(v, !0);
				t(d), u((e) => {
					m = I(d, 1, "ftab", null, m, { on: s() === h(g) }), H(d, "data-fkind", s()), b(_, `${e ?? ""} `), b(y, h(p)[s()]);
				}, [() => i.vb.t(c())]), n("click", d, () => w(o, s(), !0)), U(e, d);
			}), t(r), U(e, r);
		};
		M(c, (e) => {
			h(p).all > 1 && e(d);
		});
		var m = l(c, 2), _ = (e) => {
			var r = yt(), a = W(r), o = C(a), s = l(a), c = W(s);
			B(c, () => i.vb.icon("folder", 14));
			var d = l(c);
			t(s), t(r), u((e, t) => {
				H(a, "data-fdir", e), b(o, `← ${t ?? ""}`), b(d, ` ${h(y) ?? ""}/`);
			}, [() => h(y).includes("/") ? h(y).slice(0, h(y).lastIndexOf("/")) : "", () => i.vb.t("voltar")]), n("click", a, (e) => T(e, h(y).includes("/") ? h(y).slice(0, h(y).lastIndexOf("/")) : "")), U(e, r);
		};
		M(m, (e) => {
			h(y) && e(_);
		});
		var v = l(m, 2), E = W(v);
		A(E, 17, () => h(D).dirs, Se, (e, r) => {
			var a = f(() => ve(h(r), 2));
			let o = () => h(a)[0], s = () => h(a)[1];
			var c = bt(), d = W(c);
			B(d, () => i.vb.icon("folder", 34), !0), t(d);
			var p = l(d, 2), m = C(p), g = l(p), _ = C(g, !0);
			t(c), u((e) => {
				H(c, "data-fdir", h(S) + o()), b(m, `${o() ?? ""}/`), b(_, e);
			}, [() => s() === 1 ? i.vb.t("1 arquivo") : i.vb.t("{n} arquivos", { n: s() })]), n("click", c, (e) => T(e, h(S) + o())), U(e, c);
		});
		var k = l(E, 2);
		A(k, 17, () => h(D).list, (e) => e.id, (e, a) => {
			var o = St(), s = W(o), c = W(s), d = (e) => {
				var t = xt();
				u((e) => {
					H(t, "src", e), H(t, "alt", h(a).name);
				}, [() => O(h(a))]), U(e, t);
			}, p = f(() => h(a).type.startsWith("image/")), m = (e) => {
				var t = x(), n = r(t);
				B(n, () => i.vb.icon(h(a).type === "text/html" ? "globe" : h(a).type.startsWith("audio/") ? "mic" : "file", 30)), U(e, t);
			};
			M(c, (e) => {
				h(p) ? e(d) : e(m, -1);
			}), t(s);
			var g = l(s, 2), _ = C(g, !0), v = l(g), y = C(v), w = l(v, 2);
			let T;
			B(w, () => i.vb.icon("pin", 14), !0), t(w), t(o), u((e, t, n, r, i, s, c, l, u, d) => {
				H(o, "href", e), H(o, "title", h(a).name), H(o, "data-view", t), H(o, "data-name", h(a).name), b(_, n), b(y, `${r ?? ""} · ${i ?? ""} · ${s ?? ""}`), T = I(w, 1, "ghost pinBtn", null, T, { on: c }), H(w, "data-pin-ref", h(a).id), H(w, "title", l), H(w, "aria-label", u), H(w, "aria-pressed", d);
			}, [
				() => O(h(a)),
				() => h(a).type.startsWith("image/") ? "img" : "frame",
				() => h(a).name.slice(h(S).length),
				() => i.vb.name(h(a).author),
				() => i.vb.ago(h(a).ts),
				() => h(D).versions[h(a).name] > 1 ? i.vb.t("{n} versões", { n: h(D).versions[h(a).name] }) : gt(h(a).size),
				() => !!j(h(a)),
				() => i.vb.t(j(h(a)) ? "Desafixar" : "Fixar na lateral"),
				() => i.vb.t(j(h(a)) ? "Desafixar" : "Fixar na lateral"),
				() => !!j(h(a))
			]), n("click", w, (e) => N(e, h(a))), U(e, o);
		}), t(v);
		var P = l(v, 2), F = (e) => {
			var t = Ct(), n = C(t, !0);
			u((e) => b(n, e), [() => i.vb.t("Nada aqui.")]), U(e, t);
		};
		M(P, (e) => {
			!h(D).list.length && !h(D).dirs.length && e(F);
		}), U(e, s);
	}, R = (e) => {
		var t = Ct(), n = C(t, !0);
		u((e) => b(n, e), [() => i.vb.t("Cole uma imagem no chat (Cmd+V), arraste um arquivo ou use o clipe. Tudo que for enviado neste vibebook fica aqui.")]), U(e, t);
	};
	M(F, (e) => {
		h(d).length ? e(L) : e(R, -1);
	}), U(e, P), E();
}
V(["click"]);
// ../vibebook/node_modules/zod/v4/core/util.js
function Et(e, t) {
	return typeof t == "bigint" ? t.toString() : t;
}
var Dt = class {
	constructor(e) {
		this._getter = e, this._value = void 0;
	}
	get value() {
		let e = this._getter;
		return e !== void 0 && (this._value = e(), this._getter = void 0), this._value;
	}
};
function Ot(e) {
	return new Dt(e);
}
function kt(e) {
	return e == null;
}
function At(e) {
	let t = +!!e.startsWith("^"), n = e.endsWith("$") ? e.length - 1 : e.length;
	return e.slice(t, n);
}
function jt(e, t, n) {
	Object.defineProperty(e, t, {
		value: n,
		writable: !0,
		enumerable: !0,
		configurable: !0
	});
}
function Mt(e) {
	let t = Object.getOwnPropertyDescriptor(e, "shape");
	return t?.get ? t.get.raw : t?.value;
}
function Nt(e) {
	return Mt(e._zod.def) ?? e._zod.def.shape;
}
function Pt(e, t, n) {
	Object.defineProperty(e, t, {
		get() {
			let e = n();
			return jt(this, t, e), e;
		},
		enumerable: !0,
		configurable: !0
	});
}
function Ft(e, t, n) {
	t in e ? jt(e, t, n) : e[t] = n;
}
function It(e, t, n, r) {
	let i = Nt(t);
	for (let a of n) {
		let n = Object.getOwnPropertyDescriptor(i, a);
		n.enumerable && (n.get ? Pt(e, a, () => {
			let e = t._zod.def.shape[a];
			return r ? r(e, a) : e;
		}) : Ft(e, a, r ? r(n.value, a) : n.value));
	}
}
function Lt(e, t) {
	for (let n of Reflect.ownKeys(t)) {
		let r = Object.getOwnPropertyDescriptor(t, n);
		r.enumerable && (r.get ? Pt(e, n, () => t[n]) : Ft(e, n, r.value));
	}
}
function Rt(...e) {
	let t = {};
	for (let n of e) {
		let e = Object.getOwnPropertyDescriptors(n);
		Object.assign(t, e);
	}
	return Object.defineProperties({}, t);
}
var zt = "captureStackTrace" in Error ? Error.captureStackTrace : (...e) => {};
function Bt(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function Vt(e) {
	if (Bt(e) === !1) return !1;
	let t = e.constructor;
	if (t === void 0 || typeof t != "function") return !0;
	let n = t.prototype;
	return Bt(n) !== !1 && Object.prototype.hasOwnProperty.call(n, "isPrototypeOf") !== !1;
}
function Ht(e) {
	return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function Ut(e, t, n) {
	let r = new e._zod.constr(t ?? e._zod.def);
	return (!t || n?.parent) && (r._zod.parent = e), r;
}
function Wt(e) {
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
function Gt(e) {
	return Object.keys(e).filter((t) => e[t]._zod.optin !== void 0 && e[t]._zod.optout === "optional");
}
function Kt(e, t) {
	if (!Vt(t)) throw Error("Invalid input to extend: expected a plain object");
	let n = e._zod.def.checks;
	if (n && n.length > 0) {
		let n = Nt(e);
		for (let e of Reflect.ownKeys(t)) if (Object.getOwnPropertyDescriptor(n, e) !== void 0) throw Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
	}
	return Ut(e, Rt(e._zod.def, { shape: qt(e, t) }));
}
function qt(e, t) {
	let n = {};
	return It(n, e, Reflect.ownKeys(Nt(e))), Lt(n, t), n;
}
function Jt(e, t = 0) {
	if (e.aborted === !0) return !0;
	for (let n = t; n < e.issues.length; n++) if (e.issues[n]?.continue !== !0) return !0;
	return !1;
}
function Yt(e, t = 0) {
	if (e.aborted === !0) return !0;
	for (let n = t; n < e.issues.length; n++) if (e.issues[n]?.continue === !1) return !0;
	return !1;
}
function Xt(e, t) {
	return t.map((t) => {
		var n;
		return (n = t).path ?? (n.path = []), t.path.unshift(e), t;
	});
}
function Zt(e) {
	return typeof e == "string" ? e : e?.message;
}
function Qt(e, t, n) {
	var r;
	for (let i = t; i < e.length; i++) (r = e[i]).schema ?? (r.schema = n);
}
function $t(e, t, n) {
	var r;
	let i = e.inst?._zod?.traits;
	i?.has("$ZodType") && (i.has("$ZodCheck") ? (r = e).schema ?? (r.schema = e.inst) : e.schema = e.inst);
	let a = e.schema === e.inst ? void 0 : e.schema?._zod.def?.error, o = e.message ? e.message : Zt(e.inst?._zod.def?.error?.(e)) ?? Zt(a?.(e)) ?? Zt(t?.error?.(e)) ?? Zt(n.customError?.(e)) ?? Zt(n.localeError?.(e)) ?? "Invalid input", s = {};
	for (let t of Object.keys(e)) t !== "inst" && t !== "schema" && t !== "continue" && t !== "input" && t !== "__proto__" && (s[t] = e[t]);
	return s.path ??= [], s.message = o, t?.reportInput && (s.input = e.input), s;
}
var en = /[\uD800-\uDBFF]/;
function tn(e) {
	let t = e.length;
	if (!en.test(e)) return t;
	let n = t;
	for (let r = 0; r < t - 1; r++) (e.charCodeAt(r) & 64512) == 55296 && (e.charCodeAt(r + 1) & 64512) == 56320 && (n--, r++);
	return n;
}
function nn(e) {
	return Array.isArray(e) ? "array" : typeof e == "string" ? "string" : "unknown";
}
function rn(e, t) {
	for (let n in t) {
		let r = Object.getOwnPropertyDescriptor(t, n);
		r.get ? Object.defineProperty(e, n, {
			...r,
			enumerable: !1
		}) : sn(e, n, r.value);
	}
}
function an(e, t, n, r = !0) {
	return Object.defineProperty(e, t, {
		configurable: !0,
		writable: !0,
		enumerable: r,
		value: n
	}), n;
}
function on(e, t, n) {
	return an(e, t, n, !1);
}
function sn(e, t, n) {
	Object.defineProperty(e, t, {
		configurable: !0,
		get() {
			return this == null ? n : an(this, t, n.bind(this));
		},
		set(e) {
			an(this, t, e);
		}
	});
}
function cn(e, t) {
	let n = Object.getPrototypeOf(e);
	return t in n ? void 0 : n;
}
var ln, un = !1, dn = {
	configurable: !0,
	get() {
		un = !0;
	}
};
function fn(e, t, n) {
	let r = Object.getPrototypeOf(e._zod);
	t in r && ln !== e._zod ? ln = void 0 : (ln = e._zod, Object.defineProperty(r, t, {
		configurable: !0,
		get() {
			Object.defineProperty(this, t, dn);
			let e = un;
			un = !1;
			try {
				let r = n(this);
				return un ? delete this[t] : Object.defineProperty(this, t, {
					configurable: !0,
					writable: !0,
					value: r
				}), un ||= e, r;
			} catch (n) {
				throw delete this[t], un ||= e, n;
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
function pn(e, t, n, r) {
	let i = cn(e, t);
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
var mn, hn = {
	value: void 0,
	enumerable: !1
}, gn = "captureStackTrace" in Error ? Error : null;
function _n(e) {
	let t = gn;
	if (t) {
		let n = t.stackTraceLimit;
		if (typeof n == "number") {
			try {
				t.stackTraceLimit = 0;
			} catch {
				return gn = null, new e();
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
			hn.value = new a(r);
			try {
				Object.defineProperty(n, "_zod", hn);
			} finally {
				hn.value = void 0;
			}
		} else if (n._zod.traits.has(e)) return;
		if (n._zod.traits.add(e), t(n, r), s) {
			let e = Object.getPrototypeOf(n), t = n._zod.constr.prototype, r = e;
			for (; r && r !== t;) r = Object.getPrototypeOf(r);
			let i = r ?? e;
			s.has(i) || (s.add(i), rn(i, o));
		}
		let i = d.prototype;
		for (let e in i) Object.prototype.hasOwnProperty.call(i, e) && (e in n || (n[e] = i[e].bind(n)));
	}
	let l = r?.Parent ?? Object;
	class u extends l {}
	Object.defineProperty(u, "name", { value: e });
	function d(e) {
		let t = r?.Parent ? _n(u) : this;
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
var vn = class extends Error {
	constructor() {
		super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
	}
};
(mn = globalThis).__zod_globalConfig ?? (mn.__zod_globalConfig = {});
var yn = globalThis.__zod_globalConfig;
function bn(e) {
	return e && Object.assign(yn, e), yn;
}
// ../vibebook/node_modules/zod/v4/core/errors.js
function xn() {
	let e = this._zod;
	return e.message ??= JSON.stringify(e.def, Et, 2), e.message;
}
function Sn(e) {
	this._zod.message = e;
}
var Cn = {
	get: xn,
	set: Sn,
	enumerable: !0,
	configurable: !0
}, wn = {
	value: void 0,
	enumerable: !1
}, Tn = /* @__PURE__ */ new WeakSet([Object.prototype, Error.prototype]), En = /* @__PURE__ */ G("$ZodError", (e, t) => {
	e.name = "$ZodError", wn.value = t, Object.defineProperty(e, "issues", wn), wn.value = void 0, Object.defineProperty(e, "message", Cn);
	let n = Object.getPrototypeOf(e);
	Tn.has(n) || (Tn.add(n), Object.defineProperty(n, "toString", {
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
}, void 0, { Parent: Error }), Dn = /* @__PURE__*/ ((e) => {
	let t = (n, r, i, a) => {
		let o = i ? {
			...i,
			async: !1
		} : { async: !1 }, s = n._zod.run({
			value: r,
			issues: []
		}, o);
		if (s instanceof Promise) throw new vn();
		if (s.issues.length) {
			let n = new ((a?.Err) ?? e)(s.issues.map((e) => $t(e, o, bn())));
			throw zt(n, a?.callee ?? t), n;
		}
		return s.value;
	};
	return t;
})(En), On = /* @__PURE__*/ ((e) => {
	let t = async (n, r, i, a) => {
		let o = i ? {
			...i,
			async: !0
		} : { async: !0 }, s = n._zod.run({
			value: r,
			issues: []
		}, o);
		if (s instanceof Promise && (s = await s), s.issues.length) {
			let n = new ((a?.Err) ?? e)(s.issues.map((e) => $t(e, o, bn())));
			throw zt(n, a?.callee ?? t), n;
		}
		return s.value;
	};
	return t;
})(En), kn = /* @__PURE__*/ ((e) => (t, n, r) => {
	let i = r ? {
		...r,
		async: !1
	} : { async: !1 }, a = t._zod.run({
		value: n,
		issues: []
	}, i);
	if (a instanceof Promise) throw new vn();
	return a.issues.length ? An(e, a.issues, i) : {
		success: !0,
		data: a.value
	};
})(En);
function An(e, t, n) {
	let r;
	return {
		success: !1,
		get error() {
			return r || (r = new e(t.map((e) => $t(e, n, bn()))), t = void 0, n = void 0), r;
		},
		set error(e) {
			r = e, t = void 0, n = void 0;
		}
	};
}
var jn = /* @__PURE__*/ ((e) => async (t, n, r) => {
	let i = r ? {
		...r,
		async: !0
	} : { async: !0 }, a = t._zod.run({
		value: n,
		issues: []
	}, i);
	return a instanceof Promise && (a = await a), a.issues.length ? An(e, a.issues, i) : {
		success: !0,
		data: a.value
	};
})(En), Mn = /^[\s\S]{0,}$/, Nn = /^-?\d+(?:\.\d+)?$/, Pn = /^(?:true|false)$/i, Fn = /*@__PURE__*/ G("$ZodCheck", (e, t) => {
	var n;
	e._zod ??= {}, e._zod.def = t, (n = e._zod).onattach ?? (n.onattach = []);
}), In = (e) => {
	let t = e.value;
	return !kt(t) && t.length !== void 0;
}, Ln = /*@__PURE__*/ G("$ZodCheckMaxLength", (e, t) => {
	var n;
	Fn.init(e, t), (n = e._zod.def).when ?? (n.when = In), e._zod.check = (n) => {
		let r = n.value, i = r.length;
		if ((typeof r == "string" && i > t.maximum ? tn(r) : i) <= t.maximum) return;
		let a = nn(r);
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
}), Rn = /*@__PURE__*/ G("$ZodCheckMinLength", (e, t) => {
	var n;
	Fn.init(e, t), (n = e._zod.def).when ?? (n.when = In), e._zod.check = (n) => {
		let r = n.value, i = r.length;
		if ((typeof r == "string" && i >= t.minimum && i < t.minimum * 2 ? tn(r) : i) >= t.minimum) return;
		let a = nn(r);
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
}), zn = /*@__PURE__*/ G("$ZodCheckStartsWith", (e, t) => {
	Fn.init(e, t);
	let n = RegExp(`^${Ht(t.prefix)}.*`);
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
}), Bn = {
	major: 4,
	minor: 6,
	patch: 7
}, Vn = /*@__PURE__*/ G("$ZodType", (e, t) => {
	var n;
	e ??= {}, e._zod.def = t, e._zod.bag = e._zod.bag || {}, e._zod.version = Bn;
	let r = e._zod.def.checks, i = e._zod.traits.has("$ZodCheck") ? [e, ...r ?? []] : r?.length ? [...r] : [];
	for (let t of i) for (let n of t._zod.onattach) n(e);
	if (i.length === 0) (n = e._zod).deferred ?? (n.deferred = []), e._zod.deferred?.push(() => {
		e._zod.run = e._zod.parse;
	});
	else {
		let t = (t, n, r) => {
			if (t.memo) return t;
			let i = Jt(t), a;
			for (let o of n) {
				if (o._zod.def.when) {
					if (Yt(t) || !o._zod.def.when(t)) continue;
				} else if (i) continue;
				let n = t.issues.length, s = o._zod.check(t);
				if (s instanceof Promise && r?.async === !1) throw new vn();
				if (a || s instanceof Promise) a = (a ?? Promise.resolve()).then(async () => {
					await s, t.issues.length !== n && (Qt(t.issues, n, e), i ||= Jt(t, n));
				});
				else {
					if (t.issues.length === n) continue;
					Qt(t.issues, n, e), i ||= Jt(t, n);
				}
			}
			return a ? a.then(() => t) : t;
		}, n = (n, r, a) => {
			if (Jt(n)) return n.aborted = !0, n;
			let o = t(r, i, a);
			if (o instanceof Promise) {
				if (a.async === !1) throw new vn();
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
				if (a.async === !1) throw new vn();
				return o.then((e) => t(e, i, a));
			}
			return t(o, i, a);
		};
	}
}, {
	get "~standard"() {
		return on(this, "~standard", Wn(this));
	},
	set "~standard"(e) {
		an(this, "~standard", e);
	}
}), Hn = (e, t) => e.issues.length ? { issues: e.issues.map((e) => $t(e, t, bn())) } : { value: e.value };
async function Un(e, t) {
	let n = { async: !0 };
	return Hn(await e._zod.run({
		value: t,
		issues: []
	}, n), n);
}
function Wn(e) {
	return {
		validate: (t) => {
			let n = { async: !1 };
			try {
				let r = e._zod.run({
					value: t,
					issues: []
				}, n);
				if (!(r instanceof Promise)) return Hn(r, n);
			} catch {}
			return Un(e, t);
		},
		vendor: "zod",
		version: 1
	};
}
var Gn = /*@__PURE__*/ G("$ZodString", (e, t) => {
	Vn.init(e, t), e._zod.pattern = t.pattern ?? Mn, e._zod.parse = (n, r) => {
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
}), Kn = /*@__PURE__*/ G("$ZodNumber", (e, t) => {
	Vn.init(e, t), e._zod.pattern = Nn, e._zod.parse = (n, r) => {
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
}), qn = /*@__PURE__*/ G("$ZodBoolean", (e, t) => {
	Vn.init(e, t), e._zod.pattern = Pn, e._zod.parse = (n, r) => {
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
function Jn(e, t, n, r, i, a) {
	let o = n in r, s = a === "optional";
	if (o || !s || i !== "optional") {
		if (e.issues.length) {
			if (i !== void 0 && s && !o) return;
			t.issues.push(...Xt(n, e.issues));
		}
		!o && i === void 0 ? e.issues.length || t.issues.push({
			code: "invalid_type",
			expected: "nonoptional",
			input: void 0,
			path: [n]
		}) : e.value === void 0 ? (o || i === "defaulted" && !s) && (t.value[n] = void 0) : t.value[n] = e.value;
	}
}
var Yn = [];
function Xn(e) {
	let t = Object.keys(e.shape), n = Object.getOwnPropertySymbols(e.shape), r = n.length ? n : Yn, i = r.length ? [...t, ...r] : t;
	for (let t of i) if (!e.shape?.[t]?._zod?.traits?.has("$ZodType")) throw Error(`Invalid element at key "${String(t)}": expected a Zod schema`);
	let a = Gt(e.shape);
	return {
		...e,
		allKeys: i,
		symbolKeys: r,
		keySet: new Set(t),
		numKeys: t.length,
		optionalKeys: new Set(a)
	};
}
function Zn(e, t, n, r, i, a, o) {
	let s = [], c = i.keySet, l = i.catchall._zod, u = l.def.type, d = l.optin, f = l.optout, p = 0;
	for (let i in t) {
		if (o && n.issues.length !== p) {
			if (Jt(n, p)) break;
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
		a instanceof Promise ? e.push(a.then((e) => Jn(e, n, i, t, d, f))) : Jn(a, n, i, t, d, f);
	}
	return s.length && n.issues.push({
		code: "unrecognized_keys",
		keys: s,
		input: t,
		inst: a,
		continue: !0
	}), e.length ? Promise.all(e).then(() => n) : n;
}
var Qn = /*@__PURE__*/ G("$ZodObject", (e, t) => {
	Vn.init(e, t);
	let n = Object.getOwnPropertyDescriptor(t, "shape"), r = n?.get ? n.get.raw : t.shape ?? {};
	if (r) {
		let e = () => {
			let n = { ...r };
			return Object.defineProperty(t, "shape", { value: n }), e.raw = n, n;
		};
		e.raw = r, Object.defineProperty(t, "shape", { get: e });
	}
	let i = Ot(() => Xn(t));
	fn(e, "propValues", (e) => {
		let t = e.def.shape, n = {};
		for (let e in t) {
			let r = t[e]._zod;
			if (r.values) {
				Object.prototype.hasOwnProperty.call(n, e) || jt(n, e, /* @__PURE__ */ new Set());
				for (let t of r.values) n[e].add(t);
				r.optin !== void 0 && n[e].add(void 0);
			}
		}
		return n;
	});
	let a = Bt, o = t.catchall, s, c = yn.memoizer;
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
				if (Jt(t, f)) break;
				f = t.issues.length;
			}
			if (e === "__proto__") continue;
			let i = u[e], a = i._zod.optin, o = i._zod.optout, s = i._zod.run({
				value: r[e],
				issues: []
			}, n);
			s instanceof Promise ? l.push(s.then((n) => Jn(n, t, e, r, a, o))) : Jn(s, t, e, r, a, o);
		}
		return o ? Zn(l, r, t, n, i.value, e, d === !0) : l.length ? Promise.all(l).then(() => t) : t;
	};
});
function $n(e, t, n, r) {
	for (let n of e) if (n.issues.length === 0) return t.value = n.value, t;
	let i = e.filter((e) => !Jt(e));
	return i.length === 1 ? (t.value = i[0].value, i[0]) : (t.issues.push({
		code: "invalid_union",
		input: t.value,
		inst: n,
		errors: e.map((e) => e.issues.map((e) => $t(e, r, bn())))
	}), t);
}
var er = /*@__PURE__*/ G("$ZodUnion", (e, t) => {
	Vn.init(e, t), fn(e, "optin", (e) => e.def.options.some((e) => e._zod.optin === "defaulted") ? "defaulted" : e.def.options.some((e) => e._zod.optin !== void 0) ? "optional" : void 0), fn(e, "optout", (e) => e.def.options.some((e) => e._zod.optout === "optional") ? "optional" : void 0), fn(e, "values", (e) => {
		if (e.def.options.every((e) => e._zod.values)) return new Set(e.def.options.flatMap((e) => Array.from(e._zod.values)));
	}), fn(e, "pattern", (e) => {
		if (e.def.options.every((e) => e._zod.pattern)) {
			let t = e.def.options.map((e) => e._zod.pattern);
			return RegExp(`^(${t.map((e) => At(e.source)).join("|")})$`);
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
		return a ? Promise.all(o).then((t) => $n(t, r, e, i)) : $n(o, r, e, i);
	};
}), tr = /*@__PURE__*/ G("$ZodLiteral", (e, t) => {
	Vn.init(e, t);
	let n = new Set(t.values);
	e._zod.values = n, fn(e, "pattern", (e) => {
		let t = e.def.values;
		return RegExp(t.length ? `^(${t.map((e) => typeof e == "string" ? Ht(e) : e ? Ht(e.toString()) : String(e)).join("|")})$` : "^[^\\s\\S]$");
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
function nr(e, t) {
	return e.value = t.issues.length ? void 0 : t.value, e;
}
var rr = /*@__PURE__*/ G("$ZodOptional", (e, t) => {
	Vn.init(e, t), fn(e, "optin", (e) => e.def.innerType._zod.optin === "defaulted" ? "defaulted" : "optional"), e._zod.optout = "optional", fn(e, "values", (e) => {
		let t = e.def.innerType._zod.values;
		return t ? /* @__PURE__ */ new Set([...t, void 0]) : void 0;
	}), fn(e, "pattern", (e) => {
		let t = e.def.innerType._zod.pattern;
		return t ? RegExp(`^(${At(t.source)})?$`) : void 0;
	}), e._zod.parse = (e, n) => {
		if (e.value === void 0) {
			if (t.innerType._zod.optin !== "defaulted") return e;
			let r = t.innerType._zod.run({
				value: e.value,
				issues: []
			}, n);
			return r instanceof Promise ? r.then((t) => nr(e, t)) : nr(e, r);
		}
		return t.innerType._zod.run(e, n);
	};
}), ir = /*@__PURE__*/ G("$ZodNullable", (e, t) => {
	Vn.init(e, t), fn(e, "optin", (e) => e.def.innerType._zod.optin), fn(e, "optout", (e) => e.def.innerType._zod.optout), fn(e, "pattern", (e) => {
		let t = e.def.innerType._zod.pattern;
		return t ? RegExp(`^(${At(t.source)}|null)$`) : void 0;
	}), fn(e, "values", (e) => e.def.innerType._zod.values ? /* @__PURE__ */ new Set([...e.def.innerType._zod.values, null]) : void 0), e._zod.parse = (e, n) => e.value === null ? e : t.innerType._zod.run(e, n);
});
// ../vibebook/node_modules/zod/v4/core/api.js
function ar(e) {
	return e.checks &&= [...e.checks], e;
}
// @__NO_SIDE_EFFECTS__
function or(e, t) {
	return new e(ar({
		type: "string",
		...Wt(t)
	}));
}
// @__NO_SIDE_EFFECTS__
function sr(e, t) {
	return new e(ar({
		type: "number",
		checks: [],
		...Wt(t)
	}));
}
// @__NO_SIDE_EFFECTS__
function cr(e, t) {
	return new e({
		type: "boolean",
		...Wt(t)
	});
}
// @__NO_SIDE_EFFECTS__
function lr(e, t) {
	return new Ln({
		check: "max_length",
		...Wt(t),
		maximum: e
	});
}
// @__NO_SIDE_EFFECTS__
function ur(e, t) {
	return new Rn({
		check: "min_length",
		...Wt(t),
		minimum: e
	});
}
// @__NO_SIDE_EFFECTS__
function dr(e, t) {
	return new zn({
		check: "string_format",
		format: "starts_with",
		...Wt(t),
		prefix: e
	});
}
// ../vibebook/node_modules/zod/v4/mini/schemas.js
var fr = /*@__PURE__*/ G("ZodMiniType", (e, t) => {
	if (!e._zod) throw Error("Uninitialized schema in ZodMiniType.");
	Vn.init(e, t), e.def = t, e.type = t.type;
}, {
	get with() {
		return this.check;
	},
	set with(e) {
		an(this, "with", e);
	},
	parse(e, t) {
		return Dn(this, e, t, { callee: this.parse });
	},
	parseAsync(e, t) {
		return On(this, e, t, { callee: this.parseAsync });
	},
	safeParse(e, t) {
		return kn(this, e, t);
	},
	safeParseAsync(e, t) {
		return jn(this, e, t);
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
		return Ut(this, e, t);
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
}), pr = /*@__PURE__*/ G("ZodMiniString", (e, t) => {
	Gn.init(e, t), fr.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function K(e) {
	return /* @__PURE__ */ or(pr, e);
}
var mr = /*@__PURE__*/ G("ZodMiniNumber", (e, t) => {
	Kn.init(e, t), fr.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function hr(e) {
	return /* @__PURE__ */ sr(mr, e);
}
var gr = /*@__PURE__*/ G("ZodMiniBoolean", (e, t) => {
	qn.init(e, t), fr.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function _r(e) {
	return /* @__PURE__ */ cr(gr, e);
}
var vr = /*@__PURE__*/ G("ZodMiniObject", (e, t) => {
	Qn.init(e, t), fr.init(e, t), pn(e, "shape", (e) => e._zod.def.shape, !1);
});
// @__NO_SIDE_EFFECTS__
function yr(e, t) {
	return new vr({
		type: "object",
		shape: e ?? {},
		...Wt(t)
	});
}
// @__NO_SIDE_EFFECTS__
function br(e, t) {
	return Kt(e, t);
}
var xr = /*@__PURE__*/ G("ZodMiniUnion", (e, t) => {
	er.init(e, t), fr.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function Sr(e, t) {
	return new xr({
		type: "union",
		options: e,
		...Wt(t)
	});
}
var Cr = /*@__PURE__*/ G("ZodMiniLiteral", (e, t) => {
	tr.init(e, t), fr.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function wr(e, t) {
	return new Cr({
		type: "literal",
		values: Array.isArray(e) ? e : [e],
		...Wt(t)
	});
}
var Tr = /*@__PURE__*/ G("ZodMiniOptional", (e, t) => {
	rr.init(e, t), fr.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function Er(e) {
	return new Tr({
		type: "optional",
		innerType: e
	});
}
var Dr = /*@__PURE__*/ G("ZodMiniNullable", (e, t) => {
	ir.init(e, t), fr.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function Or(e) {
	return new Dr({
		type: "nullable",
		innerType: e
	});
}
var kr = /* @__PURE__ */ Sr([/* @__PURE__ */ yr({
	ok: /* @__PURE__ */ wr(!0),
	id: /* @__PURE__ */ hr(),
	thread: /* @__PURE__ */ K()
}), /* @__PURE__ */ yr({
	ok: /* @__PURE__ */ wr(!1),
	error: /* @__PURE__ */ K()
})]), Ar = /* @__PURE__ */ yr({
	ok: /* @__PURE__ */ _r(),
	name: /* @__PURE__ */ Er(/* @__PURE__ */ K()),
	error: /* @__PURE__ */ Er(/* @__PURE__ */ K()),
	every: /* @__PURE__ */ Er(/* @__PURE__ */ Or(/* @__PURE__ */ K())),
	cron: /* @__PURE__ */ Er(/* @__PURE__ */ Or(/* @__PURE__ */ K())),
	timezone: /* @__PURE__ */ Er(/* @__PURE__ */ K()),
	next_at: /* @__PURE__ */ Er(/* @__PURE__ */ K())
}), jr = /* @__PURE__ */ yr({
	id: /* @__PURE__ */ K(),
	name: /* @__PURE__ */ K(),
	type: /* @__PURE__ */ K(),
	size: /* @__PURE__ */ hr(),
	author: /* @__PURE__ */ K(),
	ts: /* @__PURE__ */ hr(),
	embed: /* @__PURE__ */ Er(/* @__PURE__ */ _r())
}), Mr = /* @__PURE__ */ br(jr, { reminder: /* @__PURE__ */ Er(Ar) }), Nr = /* @__PURE__ */ yr({ error: /* @__PURE__ */ K() });
(/* @__PURE__ */ K()).check(/* @__PURE__ */ dr("https://"), /* @__PURE__ */ lr(1e3)), (/* @__PURE__ */ K()).check(/* @__PURE__ */ ur(1)), (/* @__PURE__ */ K()).check(/* @__PURE__ */ ur(1)), (/* @__PURE__ */ K()).check(/* @__PURE__ */ ur(1)), (/* @__PURE__ */ K()).check(/* @__PURE__ */ dr("m"));
var Pr = (e) => typeof e == "object" && !!e && !Array.isArray(e), q = (e) => typeof e == "string", J = (e) => typeof e == "number" && Number.isFinite(e), Y = (e) => typeof e == "boolean", X = (e) => (t) => t === null || e(t), Z = (e) => (t) => Array.isArray(t) && t.every(e), Fr = (e) => (t) => Pr(t) && Object.values(t).every(e), Q = Z(q), Ir = (...e) => (t) => typeof t == "string" && e.includes(t), Lr = Ir(...qe), $ = (e, t = {}) => (n) => Pr(n) && Object.entries(e).every(([e, t]) => t(n[e])) && Object.entries(t).every(([e, t]) => n[e] === void 0 || t(n[e])), Rr = (e) => $({
	id: q,
	name: q,
	type: q,
	size: J,
	author: q,
	ts: J
}, { embed: Y })(e), zr = $({
	id: q,
	title: q,
	done: Y,
	status: Lr
}, {
	owner: X(q),
	due: X(q),
	flags: Q,
	epic_id: q
}), Br = (e) => zr(e), Vr = $({
	id: q,
	title: q,
	tasks: Z(Br)
}, {
	archived: Y,
	kept: Y,
	owner: X(q),
	from_msg: X(J),
	parent: X(q),
	flags: Q,
	prod: X($({ stage: q }, {
		at: J,
		note: q
	})),
	files: Z($({
		id: q,
		name: q,
		type: q,
		n: J
	}))
}), Hr = (e) => Vr(e), Ur = $({
	id: J,
	thread: q,
	author: q,
	ts: J,
	text: q
}, {
	kind: X(q),
	tag: X(q),
	via: X(q),
	reply_to: X(J),
	choices: X(q),
	poll: X(q),
	card: X(q),
	files: Z(Rr),
	quiet: Y,
	cut: Y,
	for_who: X(q)
}), Wr = (e) => Ur(e), Gr = $({
	msg_id: J,
	email: q,
	who: q,
	status: q,
	ts: J
}, {
	agent: q,
	note: X(q)
}), Kr = (e) => Gr(e), qr = $({
	id: q,
	text: q,
	owner: q,
	enabled: Y
}, {
	name: X(q),
	error: X(q),
	every: X(q),
	cron: X(q),
	next_at: X(J),
	thread: q,
	tz: q,
	file_id: X(q)
}), Jr = (e) => qr(e), Yr = $({
	title: q,
	owner: q
}, {
	summary: X(q),
	folder: X(q)
}), Xr = (e) => Yr(e), Zr = $({
	title: q,
	tasks: Q
}, { why: q }), Qr = (e) => Zr(e), $r = $({
	id: J,
	text: q,
	who: q,
	kind: q,
	ts: J
}), ei = (e) => $r(e), ti = $({
	id: q,
	kind: q,
	ref: q
}, {
	title: q,
	author: q,
	ts: J
}), ni = (e) => ti(e), ri = $({
	id: q,
	question: q,
	options: Q,
	multi: Y,
	closed: Y,
	author: q,
	votes: Z(Q)
}), ii = (e) => ri(e), ai = $({
	email: q,
	ts: J
}, { name: X(q) }), oi = $({
	email: q,
	who: q,
	read: J,
	delivered: J
}, {
	agent: q,
	ts: J
}), si = $({ text: q }, {
	epic: X(q),
	stale: (e) => e === !1,
	fetched: Y,
	by: q
}), ci = $({
	epic: q,
	stale: (e) => e === !0
}, { by: q }), li = {
	state: $({
		me: q,
		book: Xr,
		messages: Z(Wr),
		epics: Z(Hr),
		members: Q,
		online: Q,
		suggestions: Z(Qr)
	}, {
		roomTasks: Z(Br),
		names: Fr(q),
		avatars: Fr(J),
		pending: Q,
		requests: Z(ai),
		files: Z(Rr),
		filesN: J,
		filesAll: Y,
		reminders: Z(Jr),
		acks: Z(Kr),
		receipts: Z(oi),
		counts: Fr(J),
		countsAt: J,
		full: Q,
		complete: Y,
		origins: Z(Wr),
		docs: Fr(q),
		doc: q,
		docNotes: Q,
		decisions: Z(ei),
		pins: Z(ni),
		polls: Fr(ii)
	}),
	msg: $({ m: Wr }),
	moved: $({
		id: J,
		thread: q
	}),
	delta: $({
		id: J,
		text: q
	}),
	typing: $({
		id: J,
		mode: q
	}, { note: q }),
	closed: $({
		id: J,
		choices: q
	}),
	epics: $({ epics: Z(Hr) }, { roomTasks: Z(Br) }),
	epicsPatch: $({
		changed: Z(Hr),
		order: Q
	}, { roomTasks: Z(Br) }),
	doc: (e) => Pr(e) && (e.stale === !0 ? ci(e) && e.text === void 0 && e.fetched === void 0 : si(e)),
	docNotes: $({ notes: Q }),
	meta: $({}, {
		title: q,
		folder: q,
		summary: q
	}),
	suggestions: $({ suggestions: Z(Qr) }),
	requests: $({ requests: Z(ai) }),
	members: $({ members: Q }, {
		pending: Q,
		requests: Z(ai),
		names: Fr(q),
		avatars: Fr(J)
	}),
	files: $({ files: Z(Rr) }),
	fileAdd: $({ file: Rr }),
	reminders: $({ reminders: Z(Jr) }),
	decisions: $({ decisions: Z(ei) }),
	pins: $({ pins: Z(ni) }),
	receipts: $({ receipts: Z(oi) }),
	older: $({
		messages: Z(Wr),
		thread: q,
		more: Y
	}),
	acks: $({ acks: Z(Kr) }),
	ackRows: $({ acks: Z(Kr) }),
	poll: $({ poll: ii }),
	online: $({ online: Q }),
	conns: $({}),
	error: $({}, { error: q }),
	blocked: $({
		text: q,
		reason: q
	})
};
function ui(e) {
	return !Pr(e) || typeof e.t != "string" || !Object.hasOwn(li, e.t) ? !1 : li[e.t](e);
}
function di(e) {
	if (!Pr(e)) return e;
	let t = (e, t) => Pr(e) && (e[t] === 0 || e[t] === 1) ? {
		...e,
		[t]: e[t] === 1
	} : e, n = (e) => Array.isArray(e) ? e.map((e) => t(e, "done")) : e, r = (e) => Array.isArray(e) ? e.map((e) => Pr(e) ? {
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
function fi(e) {
	let t = di(JSON.parse(e));
	if (!ui(t)) throw TypeError("Invalid room event");
	return t;
}
var pi = {
	msg: $({ thread: q }, {
		text: q,
		files: Q,
		reply_to: X(J)
	}),
	"files.get": $({}),
	"doc.get": $({}, { epic: X(q) }),
	doc: $({ text: q }, { epic: X(q) }),
	title: $({ title: q }),
	epic: $({ title: q }),
	"epic.owner": $({
		id: q,
		owner: q
	}),
	"task.add": $({
		epic: q,
		title: q
	}),
	older: $({ thread: q }, { before: J }),
	"pin.add": $({
		kind: Ir("link", "file", "app"),
		ref: q
	}, { title: q }),
	"pin.del": $({ id: q }),
	"reminder.delete": $({ id: q }),
	"ack.dismiss": $({ id: J }),
	"reminder.enable": $({
		id: q,
		on: Y
	}),
	"task.toggle": $({ id: q }),
	"task.status": $({
		id: q,
		status: Lr
	}),
	"task.rename": $({
		id: q,
		title: q
	}),
	"task.del": $({ id: q }),
	"task.assign": $({ id: q }, {
		owner: q,
		due: q
	}),
	"decision.del": $({ id: J }),
	"epic.rename": $({
		id: q,
		title: q
	}),
	"epic.del": $({ id: q }),
	"epic.archive": $({ id: q }, { archived: Y }),
	"epic.order": $({ ids: Q }),
	"poll.create": $({
		thread: q,
		question: q,
		options: Q,
		multi: Y
	}),
	vote: $({
		id: q,
		opt: J
	}),
	"poll.close": $({ id: q }),
	suggestion: $({ i: J }, { accept: Y })
};
function mi(e) {
	return !Pr(e) || typeof e.t != "string" || !Object.hasOwn(pi, e.t) ? !1 : pi[e.t](e);
}
// ../vibebook/node_modules/hono/dist/client/utils.js
var hi = (e, t) => (e = e.replace(/\/+$/, ""), e += "/", t = t.replace(/^\/+/, ""), e + t), gi = (e, t) => {
	for (let [n, r] of Object.entries(t)) {
		let t = RegExp("/:" + n + "(?:{[^/]+})?\\??(?=/|$)");
		e = e.replace(t, () => r ? `/${r}` : "");
	}
	return e;
}, _i = (e) => {
	let t = new URLSearchParams();
	for (let [n, r] of Object.entries(e)) if (r !== void 0) {
		if (Array.isArray(r)) for (let e of r) e !== void 0 && t.append(n, e);
		else t.set(n, r);
	}
	return t;
}, vi = (e, t) => {
	switch (t) {
		case "ws": return e.replace(/^http/, "ws");
		case "http": return e.replace(/^ws/, "http");
	}
}, yi = (e) => /^https?:\/\/[^\/]+?\/index(?=\?|$)/.test(e) ? e.replace(/\/index(?=\?|$)/, "/") : e.replace(/\/index(?=\?|$)/, "");
function bi(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function xi(e, t) {
	if (!bi(e) && !bi(t)) return t;
	let n = { ...e };
	for (let e in t) {
		let r = t[e];
		n[e] = bi(n[e]) && bi(r) ? xi(n[e], r) : r;
	}
	return n;
}
// ../vibebook/node_modules/hono/dist/utils/cookie.js
var Si = /^[\w!#$%&'*.^`|~+-]+$/, Ci = (e, t, n = {}) => {
	if (!Si.test(e)) throw Error("Invalid cookie name");
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
}, wi = (e, t, n) => (t = encodeURIComponent(t), Ci(e, t, n)), Ti = (e, t) => new Proxy(() => {}, {
	get(n, r) {
		if (typeof r == "string" && r !== "then") return Ti(e, [...t, r]);
	},
	apply(n, r, i) {
		return e({
			path: t,
			args: i
		});
	}
}), Ei = (e, t) => {
	let n = t.toString();
	return n ? `${e}?${n}` : e;
}, Di = class {
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
			for (let [n, r] of Object.entries(e.cookie)) r !== void 0 && t.push(wi(n, r));
			t.length > 0 && (r.Cookie = t.join("; "));
		}
		this.cType && (r["Content-Type"] = this.cType);
		let i = new Headers();
		for (let [e, t] of Object.entries(r)) t !== void 0 && i.set(e, t);
		let a = this.url;
		a = yi(a), a = gi(a, this.pathParams), this.queryParams && (a = Ei(a, this.queryParams)), n = this.method.toUpperCase();
		let o = n !== "GET" && n !== "HEAD";
		return (t?.fetch || fetch)(a, {
			body: o ? this.rBody : void 0,
			method: n,
			headers: i,
			...t?.init
		});
	};
}, Oi = (e, t) => Ti(function n(r) {
	let i = t?.buildSearchParams ?? _i, a = [...r.path], o = a.slice(-3).reverse();
	if (o[0] === "toString") return o[1] === "name" ? o[2] || "" : n.toString();
	if (o[0] === "valueOf") return o[1] === "name" ? o[2] || "" : n;
	let s = "";
	if (/^\$/.test(o[0])) {
		let e = a.pop();
		e && (s = e.replace(/^\$/, ""));
	}
	let c = hi(e, a.join("/"));
	if (s === "url" || s === "path") {
		let t = yi(c);
		return r.args[0] && (r.args[0].param && (t = gi(t, r.args[0].param)), r.args[0].query && (t = Ei(t, i(r.args[0].query)))), s === "url" ? new URL(t) : t.slice(e.replace(/\/+$/, "").length).replace(/^\/?/, "/");
	}
	if (s === "ws") {
		let e = yi(c), n = vi(r.args[0]?.param ? gi(e, r.args[0].param) : e, "ws"), a = new URL(n), o = r.args[0]?.query;
		return o && i(o).forEach((e, t) => {
			a.searchParams.append(t, e);
		}), ((...e) => t?.webSocket !== void 0 && typeof t.webSocket == "function" ? t.webSocket(...e) : new WebSocket(...e))(a.toString());
	}
	let l = new Di(c, s, { buildSearchParams: i });
	if (s) {
		t ??= {};
		let e = { ...r.args[1] }, n = t.headers, i = e.headers;
		n && i && (e.headers = async () => ({
			...typeof n == "function" ? await n() : n,
			...typeof i == "function" ? await i() : i
		}));
		let a = xi(t, e);
		return l.fetch(r.args[0], a);
	}
	return l;
}, []), ki = (e = "/", t) => Oi(e, t ? { fetch: t } : {});
// svelte/transport.ts
function Ai(e, t) {
	if (!mi(t)) throw TypeError("Invalid room command");
	return !e || e.readyState !== 1 ? !1 : (e.send(JSON.stringify(t)), !0);
}
function ji(e) {
	if (typeof e != "string") throw TypeError("Room events must be JSON text");
	return fi(e);
}
async function Mi(e) {
	try {
		return await e.json();
	} catch (t) {
		throw e.ok ? t : Error(`HTTP ${e.status}`);
	}
}
function Ni(e, t) {
	let n = Nr.safeParse(t);
	return Error(n.success ? n.data.error : `HTTP ${e.status}`);
}
function Pi(e, t = fetch) {
	let n = ki("/", t).api.books[":id"], r = encodeURIComponent(e);
	return {
		async postMessage(e) {
			let t = await n.post.$post({
				param: { id: r },
				json: e
			}), i = await Mi(t);
			if (t.ok || t.status === 400) {
				let e = kr.safeParse(i);
				if (e.success) return e.data;
				if (t.ok) throw TypeError("Invalid post response");
			}
			throw Ni(t, i);
		},
		async uploadFile(e) {
			let t = await n.files.$post({
				param: { id: r },
				header: {
					"content-type": e.type,
					"x-filename": encodeURIComponent(e.name)
				}
			}, { init: { body: e.body } }), i = await Mi(t);
			if (!t.ok) throw Ni(t, i);
			let a = Mr.safeParse(i);
			if (!a.success) throw TypeError(jr.safeParse(i).success ? "Invalid reminder response" : "Invalid upload response");
			return a.data;
		}
	};
}
// svelte/Reminders.svelte
var Fi = o("<button class=\"primary\" id=\"remNew\"><!> </button>"), Ii = o("<form class=\"remForm\" id=\"remForm\"><input name=\"name\" maxlength=\"60\" required=\"\"/> <textarea name=\"text\" required=\"\"></textarea> <div class=\"row\"><span class=\"err\" id=\"remErr\"> </span><button type=\"button\" class=\"ghost\" id=\"remCancel\"> </button><button class=\"primary\" id=\"remSave\"> </button></div></form>"), Li = o("<span class=\"err\"> </span>"), Ri = o("<pre class=\"remText\"> </pre>"), zi = o("<button class=\"ghost\"></button>"), Bi = o("<div><div class=\"remBody\" role=\"button\" tabindex=\"0\"><b><!> </b> <small><!> </small> <!><!></div> <!> <label class=\"sw\"><input type=\"checkbox\"/> </label> <button class=\"ghost\"></button></div>"), Vi = o("<div class=\"empty\"> </div>"), Hi = o("<div class=\"remHead\"><p></p> <!></div> <!> <!> <!>", 1);
function Ui(e, i) {
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
			let e = await Pi(i.room.id).uploadFile({
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
	var T = Hi(), O = r(T), j = W(O);
	B(j, () => i.vb.t("Cada lembrete é um arquivo <code>reminders/&lt;nome&gt;.md</code>: o texto diz quando rodar e o que fazer. Na hora, o @vibe posta o texto aqui e o agent de quem salvou faz."), !0), t(j);
	var N = l(j, 2), F = (e) => {
		var r = Fi(), a = W(r);
		B(a, () => i.vb.icon("plus", 14));
		var o = l(a);
		t(r), u((e) => b(o, ` ${e ?? ""}`), [() => i.vb.t("Novo lembrete")]), n("click", r, () => v({
			name: "",
			text: ""
		})), U(e, r);
	};
	M(N, (e) => {
		h(a) || e(F);
	}), t(O);
	var L = l(O, 2), R = (e) => {
		var r = Ii(), c = W(r);
		P(c);
		var d = l(c, 2);
		D(d);
		var f = l(d, 2), p = W(f), m = C(p, !0), g = l(p), _ = C(g, !0), v = l(g), y = C(v, !0);
		t(f), t(r), u((e, t, n, r) => {
			H(c, "placeholder", e), c.readOnly = h(a).fixed, H(d, "placeholder", t), b(m, h(o)), b(_, n), v.disabled = h(s), b(y, r);
		}, [
			() => i.vb.t("nome, ex.: relatorio-diario"),
			() => i.vb.t("Diga quando e o quê. Ex.: Todo dia às 8h: puxe os números de ontem e poste aqui o que mudou."),
			() => i.vb.t("Cancelar"),
			() => i.vb.t("Salvar")
		]), re("submit", r, x), le(c, () => h(a).name, (e) => h(a).name = e), le(d, () => h(a).text, (e) => h(a).text = e), n("click", g, () => w(a, null)), U(e, r);
	};
	M(L, (e) => {
		h(a) && e(R);
	});
	var z = l(L, 2);
	A(z, 17, () => h(p), (e) => e.id, (e, r) => {
		var a = Bi();
		let o;
		var s = W(a), c = W(s), p = W(c);
		B(p, () => i.vb.icon(h(d).includes(h(r).id) ? "chevronDown" : "chevronRight", 13));
		var m = l(p);
		t(c);
		var x = l(c, 2), S = W(x), w = (e) => {
			var t = g();
			u((e) => b(t, `${(h(r).every || h(r).cron || "") ?? ""}${e ?? ""} ·`), [() => h(r).enabled && h(r).next_at ? ` · ${i.vb.t("próximo {when}", { when: _(h(r).next_at) })}` : ""]), U(e, t);
		};
		M(S, (e) => {
			h(r).error || e(w);
		});
		var T = l(S, 1, !0);
		t(x);
		var E = l(x, 2), D = (e) => {
			var t = Li(), n = C(t);
			u(() => b(n, `⚠ ${h(r).error ?? ""}`)), U(e, t);
		};
		M(E, (e) => {
			h(r).error && e(D);
		});
		var O = l(E), k = (e) => {
			var t = Ri(), n = C(t, !0);
			u(() => b(n, h(r).text)), U(e, t);
		}, A = f(() => h(d).includes(h(r).id));
		M(O, (e) => {
			h(A) && e(k);
		}), t(s);
		var j = l(s, 2), N = (e) => {
			var a = zi();
			B(a, () => i.vb.icon("pencil", 14), !0), t(a), u((e, t) => {
				H(a, "data-rem-edit", h(r).id), H(a, "title", e), H(a, "aria-label", t);
			}, [() => i.vb.t("Editar"), () => i.vb.t("Editar")]), n("click", a, () => v({
				name: h(r).name,
				text: h(r).text,
				fixed: !0
			})), U(e, a);
		};
		M(j, (e) => {
			h(r).name && e(N);
		});
		var F = l(j, 2), L = W(F);
		P(L);
		var R = l(L, 1, !0);
		t(F);
		var z = l(F, 2);
		B(z, () => i.vb.icon("x"), !0), t(z), t(a), u((e, t, n, i, c, l, u) => {
			o = I(a, 1, "rem", null, o, {
				bad: !!h(r).error,
				off: !h(r).enabled,
				open: e
			}), H(s, "data-rem-open", h(r).id), H(s, "title", t), b(m, ` ${(h(r).name ? `${h(r).name}.md` : h(r).text) ?? ""}`), b(T, n), H(F, "title", i), H(L, "data-rem-on", h(r).id), xe(L, h(r).enabled), L.disabled = !!h(r).error, b(R, c), H(z, "data-rem-del", h(r).id), H(z, "title", l), H(z, "aria-label", u);
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
		}), n("change", L, (e) => i.send({
			t: "reminder.enable",
			id: h(r).id,
			on: e.currentTarget.checked
		})), n("click", z, () => {
			confirm(i.vb.t("Apagar este lembrete?")) && i.send({
				t: "reminder.delete",
				id: h(r).id
			});
		}), U(e, a);
	});
	var ee = l(z, 2), te = (e) => {
		var t = Vi(), n = C(t, !0);
		u((e) => b(n, e), [() => i.vb.t("Nenhum lembrete ainda. Clique em Novo lembrete, ou peça pro seu agent: “todo dia às 8h, me manda o resumo do que mudou”.")]), U(e, t);
	};
	M(ee, (e) => {
		!h(p).length && !h(a) && e(te);
	}), U(e, T), E();
}
V([
	"click",
	"keydown",
	"change"
]);
// svelte/Sidebar.svelte
var Wi = o("<span class=\"claudeSpin\">✻</span>"), Gi = o("<button type=\"button\"><!><span class=\"rt\"> </span> <!> <!><!> <span class=\"n\"> </span></button>"), Ki = o("<div class=\"fnCol\"><span class=\"fnRow\"><span class=\"fn\"> </span><span class=\"pendTag\"> </span></span> <small class=\"memActs\"><button type=\"button\" class=\"ghost resend\"> </button> · <button type=\"button\" class=\"ghost resend\"> </button></small></div>"), qi = o("<span class=\"fn\"> </span>"), Ji = o("<div class=\"fnCol\"><span class=\"fn\"> </span><small class=\"memActs\"> </small></div>"), Yi = o("<button type=\"button\" class=\"ghost x\"></button>"), Xi = o("<div class=\"member\"><!> <!> <!></div> <!>", 1), Zi = o("<button type=\"button\" class=\"iconBtn phOnly\" id=\"sideArch\"></button> <button type=\"button\" class=\"iconBtn phOnly\" id=\"sideDel\"></button>", 1), Qi = o("<span class=\"rowEdit phOnly\" role=\"button\" tabindex=\"0\" id=\"sideRename\"><!> </span>"), $i = o("<div class=\"epTabs\" role=\"tablist\"><button type=\"button\" role=\"tab\" data-arch=\"\"> <b> </b></button> <button type=\"button\" role=\"tab\" data-arch=\"1\"> <b> </b></button></div>"), ea = o("<button type=\"button\"><span class=\"ri\"> </span><span class=\"rt\"> </span><span class=\"n\"> </span></button>"), ta = o("<form id=\"newEpic\" class=\"newRoom\"><input enterkeyhint=\"done\"/><button class=\"ri\"></button></form> <!>", 1), na = o("<div class=\"member reqRow\"><!> <div class=\"fnCol\"><span class=\"fn\"> </span><small class=\"memActs\"> <button type=\"button\" class=\"ghost resend okAsk\" data-ok=\"1\"> </button></small></div> <button type=\"button\" class=\"ghost x\" data-ok=\"\"></button></div>"), ra = o("<div class=\"asks\"><h4> </h4> <!></div>"), ia = o("<details class=\"memMore\" data-fold=\"off\"><summary> </summary><!></details>"), aa = o("<button type=\"button\" class=\"friendAdd\"><!><span class=\"fn\"> </span><b></b></button>"), oa = o("<details class=\"memMore\" data-fold=\"friends\"><summary> </summary> <!></details>"), sa = o("<option></option>"), ca = o("<button type=\"button\" class=\"sheetGrab\"><i></i></button> <!> <div class=\"sideHead\"><div class=\"sideTop\"><a data-nav=\"\" href=\"/app\" class=\"muted\"><!> vibebooks</a> <!> <button type=\"button\" class=\"iconBtn\" id=\"railToggle\" aria-expanded=\"true\"></button></div></div> <div class=\"sec threadsSec\"><button type=\"button\" data-thread=\"main\"><!><span class=\"rt\"> </span> <!> <!><span class=\"n\"> </span></button> <!> <div><!> <!></div></div> <!> <div class=\"sec\"><!> <h4> </h4> <!> <!> <!> <!> <form class=\"row\" id=\"invite\" style=\"margin-top:8px\"><input type=\"email\" required=\"\" list=\"friendList\" autocomplete=\"off\"/><button></button></form> <datalist id=\"friendList\"></datalist></div>", 1);
function la(e, n) {
	k(n, !0);
	let i = (e, r = L) => {
		let i = f(() => r().tasks.filter((e) => e.done).length), a = f(() => n.vb.epicBusy(r()));
		var o = Gi();
		let s;
		var c = W(o);
		B(c, () => n.vb.epicIco(r(), !0));
		var d = l(c), p = C(d, !0), m = l(d, 2), g = (e) => {
			var t = Wi();
			u((e) => H(t, "aria-label", e), [() => n.vb.t("{who} está trabalhando", { who: h(a) })]), U(e, t);
		};
		M(m, (e) => {
			h(a) && e(g);
		});
		var _ = l(m, 2);
		B(_, () => n.vb.waitPill(r().id));
		var v = l(_);
		B(v, () => n.vb.prodMark(r()));
		var y = l(v, 2), x = C(y, !0);
		t(o), u((e, t) => {
			s = I(o, 1, "thread", null, s, {
				sel: n.thread === r().id,
				archived: !!r().archived,
				busy: !!h(a),
				waiting: e
			}), H(o, "data-thread", r().id), H(o, "title", t), b(p, r().title), b(x, r().tasks.length ? `${h(i)}/${r().tasks.length}` : "");
		}, [() => n.vb.waitsIn(r().id).length > 0, () => `${r().title} · ${h(i)}/${r().tasks.length} tasks${r().archived ? ` · ${n.vb.t("arquivado")}` : ""}${h(a) ? ` · ${n.vb.t("{who} está trabalhando aqui", { who: h(a) })}` : ""}`]), U(e, o);
	}, a = (e, i = L) => {
		var a = Xi(), o = r(a), s = W(o);
		B(s, () => n.vb.avatar(i(), n.room.online.includes(i())));
		var c = l(s, 2), d = (e) => {
			var r = Ki(), a = W(r), o = W(a), s = C(o, !0), c = l(o), d = C(c, !0);
			t(a);
			var f = l(a, 2), p = W(f), m = C(p, !0), h = l(p, 2), g = C(h, !0);
			t(f), t(r), u((e, t, n, r, a, l, u) => {
				H(o, "title", i()), b(s, e), H(c, "title", t), b(d, n), H(p, "data-copyinv", i()), H(p, "title", r), b(m, a), H(h, "data-resend", i()), H(h, "title", l), b(g, u);
			}, [
				() => n.room.names?.[i()] || i().split("@")[0],
				() => n.vb.t("Convidada(o), ainda não entrou"),
				() => n.vb.t("pendente"),
				() => n.vb.t("Copiar a mensagem de convite (link da sala + setup do agent) para mandar no WhatsApp"),
				() => n.vb.t("copiar"),
				() => n.vb.t("Convidada(o), ainda não entrou"),
				() => n.vb.t("reenviar")
			]), U(e, r);
		}, p = f(() => n.room.pending?.includes(i())), m = (e) => {
			var t = qi(), r = C(t, !0);
			u(() => {
				H(t, "title", i()), b(r, n.room.names[i()]);
			}), U(e, t);
		}, g = (e) => {
			var n = Ji(), r = W(n), a = C(r, !0), o = l(r), s = C(o);
			t(n), u((e, t) => {
				H(r, "title", i()), b(a, e), b(s, `@${t ?? ""}`);
			}, [() => i().split("@")[0], () => i().split("@")[1] ?? ""]), U(e, n);
		};
		M(c, (e) => {
			h(p) ? e(d) : n.room.names?.[i()] ? e(m, 1) : e(g, -1);
		});
		var _ = l(c, 2), v = (e) => {
			var r = Yi();
			B(r, () => n.vb.icon("x"), !0), t(r), u((e, t) => {
				H(r, "data-remove", i()), H(r, "aria-label", e), H(r, "title", t);
			}, [() => n.vb.t("Remover {email}", { email: i() }), () => n.room.pending?.includes(i()) ? n.vb.t("Cancelar convite") : n.vb.t("Remover do vibebook")]), U(e, r);
		}, y = f(() => i() !== n.room.book?.owner && (n.room.pending?.includes(i()) || n.room.me === n.room.book?.owner));
		M(_, (e) => {
			h(y) && e(v);
		}), t(o);
		var x = l(o, 2);
		B(x, () => n.vb.agentRows(i())), U(e, a);
	}, o = T(n, "archOpen", 3, !1), s = T(n, "foldOpen", 19, () => ({
		off: !1,
		friends: null
	})), c = T(n, "friends", 19, () => []), d = (e) => n.room.counts ? (n.room.counts[e] ?? 0) + n.room.messages.filter((t) => t.thread === e && t.id > (n.room.countsAt ?? 0)).length : n.room.messages.filter((t) => t.thread === e).length, p = (e) => n.room.messages.reduce((t, n) => n.thread === e.id && n.id > t ? n.id : t, 0), m = f(() => n.room.epics.find((e) => e.id === n.thread)), g = f(() => n.room.epics.filter((e) => !e.archived)), _ = f(() => n.room.epics.filter((e) => e.archived).map((e, t) => ({
		epic: e,
		last: p(e),
		i: t
	})).sort((e, t) => t.last - e.last || t.i - e.i).map(({ epic: e }) => e)), v = f(() => o() && h(_).length > 0), x = f(() => n.room.members.filter((e) => e === n.room.me || n.room.online.includes(e))), S = f(() => n.room.members.filter((e) => !h(x).includes(e))), w = f(() => c().filter((e) => !n.room.members.includes(e)));
	var D = ca(), O = r(D), j = l(O, 2);
	B(j, () => n.vb.roomStrip());
	var N = l(j, 2), P = W(N), F = W(P), R = W(F);
	B(R, () => n.vb.icon("back")), y(), t(F);
	var z = l(F, 2), ee = (e) => {
		var i = Zi(), a = r(i);
		B(a, () => n.vb.icon(h(m).archived ? "undo" : "check", 18), !0), t(a);
		var o = l(a, 2);
		B(o, () => n.vb.icon("trash", 18), !0), t(o), u((e, t, n, r) => {
			H(a, "title", e), H(a, "aria-label", t), H(o, "title", n), H(o, "aria-label", r);
		}, [
			() => h(m).archived ? n.vb.t("Desarquivar épico") : n.vb.t("Arquivar épico (concluído)"),
			() => h(m).archived ? n.vb.t("Desarquivar épico") : n.vb.t("Arquivar épico"),
			() => n.vb.t("Apagar épico"),
			() => n.vb.t("Apagar épico")
		]), U(e, i);
	};
	M(z, (e) => {
		h(m) && e(ee);
	});
	var te = l(z, 2);
	B(te, () => n.vb.icon("sidebar", 20), !0), t(te), t(P), t(N);
	var ne = l(N, 2), re = W(ne);
	let V;
	var ie = W(re);
	B(ie, () => n.vb.roomMark("ri roomIco"));
	var ae = l(ie), oe = C(ae, !0), se = l(ae, 2), ce = (e) => {
		var r = Qi(), i = W(r);
		B(i, () => n.vb.icon("pencil", 13));
		var a = l(i);
		t(r), u((e, t) => {
			H(r, "title", e), b(a, ` ${t ?? ""}`);
		}, [() => n.vb.t("Renomear"), () => n.vb.t("editar")]), U(e, r);
	}, le = f(() => !n.thread.startsWith("pre:"));
	M(se, (e) => {
		h(le) && e(ce);
	});
	var ue = l(se, 2);
	B(ue, () => n.vb.waitPill("main"));
	var de = l(ue), fe = C(de, !0);
	t(re);
	var pe = l(re, 2), me = (e) => {
		var r = $i(), i = W(r);
		let a;
		var o = W(i), s = l(o), c = C(s, !0);
		t(i);
		var d = l(i, 2);
		let f;
		var p = W(d), m = l(p), y = C(m, !0);
		t(d), t(r), u((e, t) => {
			H(i, "aria-selected", !h(v)), a = I(i, 1, "", null, a, { on: !h(v) }), b(o, `${e ?? ""} `), b(c, h(g).length), H(d, "aria-selected", h(v)), f = I(d, 1, "", null, f, { on: h(v) }), b(p, `${t ?? ""} `), b(y, h(_).length);
		}, [() => n.vb.t("Épicos"), () => n.vb.t("Arquivados")]), U(e, r);
	};
	M(pe, (e) => {
		h(_).length && e(me);
	});
	var he = l(pe, 2);
	let ge;
	var _e = W(he);
	A(_e, 17, () => h(v) ? h(_) : h(g), (e) => e.id, (e, t) => {
		i(e, () => h(t));
	});
	var ve = l(_e, 2), ye = (e) => {
		var i = ta(), a = r(i), o = W(a), s = l(o);
		B(s, () => n.vb.icon("plus"), !0), t(s), t(a);
		var c = l(a, 2);
		A(c, 17, () => n.room.suggestions, Se, (e, r, i) => {
			var a = ea();
			let o;
			H(a, "data-thread", `pre:${i}`);
			var s = W(a), c = C(s, !0), d = l(s), f = C(d, !0), p = l(d), m = C(p, !0);
			t(a), u((e, t) => {
				o = I(a, 1, "thread pre", null, o, { sel: n.thread === `pre:${i}` }), H(a, "title", e), b(c, t), b(f, h(r).title), b(m, h(r).tasks.length || "");
			}, [() => `${h(r).title} · ${n.vb.t("sugestão do @vibe, clique para ver")}`, () => n.vb.initials(h(r).title)]), U(e, a);
		}), u((e, t, n) => {
			H(o, "placeholder", e), H(o, "aria-label", t), H(s, "aria-label", n);
		}, [
			() => n.vb.t("Novo épico: escreva o título…"),
			() => n.vb.t("Novo épico"),
			() => n.vb.t("Criar épico")
		]), U(e, i);
	};
	M(ve, (e) => {
		h(v) || e(ye);
	}), t(he), t(ne);
	var be = l(ne, 2);
	B(be, () => n.vb.pinsSec());
	var xe = l(be, 2), Ce = W(xe), we = (e) => {
		var r = ra(), i = W(r), a = C(i, !0), o = l(i, 2);
		A(o, 17, () => n.room.requests, (e) => e.email, (e, r) => {
			var i = na(), a = W(i);
			B(a, () => n.vb.avatar(h(r).email));
			var o = l(a, 2), s = W(o), c = C(s, !0), d = l(s), f = W(d), p = l(f), m = C(p, !0);
			t(d), t(o);
			var g = l(o, 2);
			B(g, () => n.vb.icon("x"), !0), t(g), t(i), u((e, t, n, i, a, o, l) => {
				H(s, "title", e), b(c, t), b(f, `${n ?? ""} · `), H(p, "data-ask", h(r).email), H(p, "title", i), b(m, a), H(g, "data-ask", h(r).email), H(g, "aria-label", o), H(g, "title", l);
			}, [
				() => `${h(r).email} · ${n.vb.t("pediu {ago}", { ago: n.vb.ago(h(r).ts) })}`,
				() => h(r).name || h(r).email.split("@")[0],
				() => n.vb.t("pediu {ago}", { ago: n.vb.ago(h(r).ts) }),
				() => n.vb.t("Liberar: entra na sala e recebe o link por email"),
				() => n.vb.t("liberar"),
				() => n.vb.t("Recusar {email}", { email: h(r).email }),
				() => n.vb.t("Recusar")
			]), U(e, i);
		}), t(r), u((e) => b(a, e), [() => n.vb.t("Pedindo pra entrar")]), U(e, r);
	};
	M(Ce, (e) => {
		n.room.requests?.length && e(we);
	});
	var Te = l(Ce, 2), Ee = C(Te, !0), De = l(Te, 2);
	B(De, () => n.vb.sbxRows());
	var Oe = l(De, 2);
	A(Oe, 16, () => h(x), (e) => e, (e, t) => {
		a(e, () => t);
	});
	var ke = l(Oe, 2), Ae = (e) => {
		var r = ia(), i = W(r), o = C(i, !0), c = l(i);
		A(c, 16, () => h(S), (e) => e, (e, t) => {
			a(e, () => t);
		}), t(r), u((e) => {
			r.open = s().off, b(o, e);
		}, [() => n.vb.t("{n} offline", { n: h(S).length })]), U(e, r);
	};
	M(ke, (e) => {
		h(S).length && e(Ae);
	});
	var je = l(ke, 2), Me = (e) => {
		var r = oa(), i = W(r), a = C(i), o = l(i, 2);
		A(o, 16, () => h(w), (e) => e, (e, r) => {
			var i = aa(), a = W(i);
			B(a, () => n.vb.avatar(r));
			var o = l(a), s = C(o, !0), c = l(o);
			B(c, () => n.vb.icon("plus"), !0), t(c), t(i), u((e, t) => {
				H(i, "data-add", r), H(i, "title", e), b(s, t);
			}, [() => n.vb.t("Adicionar {email}", { email: r }), () => n.vb.name(r)]), U(e, i);
		}), t(r), u((e) => {
			r.open = s().friends ?? n.room.members.length <= 1, b(a, `${e ?? ""} · ${h(w).length ?? ""}`);
		}, [() => n.vb.t("Seus amigos")]), U(e, r);
	};
	M(je, (e) => {
		h(w).length && e(Me);
	});
	var Ne = l(je, 2), Pe = W(Ne), Fe = l(Pe);
	B(Fe, () => n.vb.icon("plus"), !0), t(Fe), t(Ne);
	var Ie = l(Ne, 2);
	A(Ie, 21, () => h(w), Se, (e, t) => {
		var n = sa(), r = {};
		u(() => {
			r !== (r = h(t)) && (n.value = (n.__value = r) ?? "");
		}), U(e, n);
	}), t(Ie), t(xe), u((e, t, r, i, a, o, s, c, l, u) => {
		H(O, "aria-label", e), H(te, "title", t), H(te, "aria-label", r), V = I(re, 1, "thread", null, V, {
			sel: n.thread === "main",
			waiting: i
		}), H(re, "title", a), b(oe, o), b(fe, s), ge = I(he, 1, "epList", null, ge, { arch: h(v) }), b(Ee, c), H(Pe, "placeholder", l), H(Fe, "aria-label", u);
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
	]), U(e, D), E();
}
// svelte/Message.svelte
var ua = o("<span class=\"gut\"> </span>"), da = o(" <span class=\"agentTag\">agent</span>", 1), fa = o("<span class=\"doneTag\"> </span>"), pa = o("<div><!> <!> <span class=\"mact\"><button type=\"button\" class=\"rbtn\"><!> </button> <button type=\"button\" class=\"rbtn\"><!> </button> <button type=\"button\" class=\"rbtn\"><!> </button></span> <div class=\"body\"><!> <div class=\"who\"><!> <!> <span class=\"hhmm\"> </span></div> <div class=\"txt\"></div> <!> <!> <!> <!> <!></div></div>");
function ma(e, n) {
	k(n, !0);
	let i = T(n, "origin", 3, !1), a = f(() => n.vb.continues(n.previous, n.message)), o = f(() => n.message.tag === "reminder" ? n.vb.remHtml(n.message, i()) : n.message.tag === "issue" ? n.vb.issueHtml(n.message) : n.vb.isNotice(n.message) ? n.vb.noticeHtml(n.message) : null), s = f(() => i() && h(o) ? h(o).replace(/\sid="m\d+"/, "") : h(o)), c = f(() => !n.message.text && n.typing ? `<span class="typing">${n.vb.esc(n.vb.typingNote?.(n.message.id) || n.vb.t("pensando ({mode})", { mode: n.vb.typingLabel?.(n.typing) ?? n.typing }))}…</span>` : n.message.author === "ai" ? n.message.text ? n.vb.mentions(n.vb.md(n.message.text)) : n.message.poll ? "" : `<span class="typing">${n.vb.t("pensando…")}</span>` : n.message.text ? n.vb.mentions(n.message.kind === "agent" ? n.vb.md(n.message.text) : n.vb.linkify(n.vb.esc(n.message.text))) : ""), d = f(() => n.vb.dateTime?.(n.message.ts) ?? new Date(n.message.ts).toLocaleString());
	var p = x(), m = r(p), _ = (e) => {
		var t = x(), n = r(t);
		B(n, () => h(s)), U(e, t);
	}, v = (e) => {
		var o = pa();
		let s;
		var f = W(o);
		B(f, () => n.message.kind === "agent" ? n.vb.agentAvatar(n.message.author, n.message.via) : n.vb.avatar(n.message.author));
		var p = l(f, 2), m = (e) => {
			var t = ua(), r = C(t, !0);
			u((e) => {
				H(t, "title", h(d)), b(r, e);
			}, [() => n.vb.hhmm(n.message.ts)]), U(e, t);
		};
		M(p, (e) => {
			h(a) && e(m);
		});
		var _ = l(p, 2), v = W(_), y = W(v);
		B(y, () => n.vb.icon("copy", 14));
		var S = l(y);
		t(v);
		var w = l(v, 2), T = W(w);
		B(T, () => n.vb.icon("link", 14));
		var E = l(T);
		t(w);
		var D = l(w, 2), O = W(D);
		B(O, () => n.vb.icon("reply", 14));
		var k = l(O);
		t(D), t(_);
		var A = l(_, 2), j = W(A), N = (e) => {
			var t = x(), i = r(t);
			B(i, () => n.vb.quoteHtml(n.message.reply_to)), U(e, t);
		};
		M(j, (e) => {
			n.message.reply_to && e(N);
		});
		var P = l(j, 2), F = W(P), L = (e) => {
			var t = da(), i = r(t), a = l(i);
			u((e, t) => {
				b(i, `${e ?? ""} `), H(a, "title", t);
			}, [() => n.vb.t("{via} de {who}", {
				via: n.message.via || "agent",
				who: n.vb.name(n.message.author)
			}), () => n.vb.t("Escrito pelo agent dessa pessoa, em nome dela")]), U(e, t);
		}, R = (e) => {
			var t = g();
			u((e) => b(t, e), [() => n.vb.name(n.message.author)]), U(e, t);
		};
		M(F, (e) => {
			n.message.kind === "agent" ? e(L) : e(R, -1);
		});
		var z = l(F, 2), ee = (e) => {
			var t = fa(), r = C(t);
			u((e, n) => {
				H(t, "title", e), b(r, `✓ ${n ?? ""}`);
			}, [() => n.vb.t("Reporta algo entregue"), () => n.vb.t("entregue")]), U(e, t);
		};
		M(z, (e) => {
			n.message.tag === "done" && e(ee);
		});
		var te = l(z), ne = l(te), re = C(ne, !0);
		t(P);
		var V = l(P, 2);
		B(V, () => h(c), !0), t(V);
		var ie = l(V, 2);
		B(ie, () => n.vb.attHtml(n.message.files));
		var ae = l(ie, 2), oe = (e) => {
			var t = x(), i = r(t);
			B(i, () => n.vb.cardHtml(n.message)), U(e, t);
		};
		M(ae, (e) => {
			n.message.card && e(oe);
		});
		var se = l(ae, 2), ce = (e) => {
			var t = x(), i = r(t);
			B(i, () => n.vb.choiceHtml(n.message)), U(e, t);
		};
		M(se, (e) => {
			n.message.choices && e(ce);
		});
		var le = l(se, 2), ue = (e) => {
			var t = x(), i = r(t);
			B(i, () => n.vb.pollHtml(n.message.poll)), U(e, t);
		};
		M(le, (e) => {
			n.message.poll && e(ue);
		});
		var de = l(le, 2), fe = (e) => {
			var t = x(), i = r(t);
			B(i, () => n.vb.threadCards(n.message.id)), U(e, t);
		};
		M(de, (e) => {
			i() || e(fe);
		}), t(A), t(o), u((e, t, r, l, u, f, p, m, g, _, y, x) => {
			s = I(o, 1, "msg", null, s, {
				ai: n.message.author === "ai",
				agent: n.message.author !== "ai" && n.message.kind === "agent",
				done: n.message.tag === "done",
				cont: h(a),
				waitMsg: e
			}), H(o, "id", i() ? void 0 : `m${n.message.id}`), H(v, "data-copymsg", n.message.id), H(v, "title", t), H(v, "aria-label", r), b(S, ` ${l ?? ""}`), H(w, "data-copylink", n.message.id), H(w, "title", u), H(w, "aria-label", f), b(E, ` ${p ?? ""}`), H(D, "data-reply", n.message.id), H(D, "title", m), H(D, "aria-label", g), b(k, ` ${_ ?? ""}`), b(te, ` · ${y ?? ""}`), H(ne, "title", h(d)), b(re, x), H(V, "hidden", !h(c));
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
		]), U(e, o);
	};
	M(m, (e) => {
		h(s) === null ? e(v, -1) : e(_);
	}), U(e, p), E();
}
// svelte/Chat.svelte
var ha = o("<div class=\"older\"><button type=\"button\" class=\"ghost\" id=\"olderBtn\"> </button></div>"), ga = o("<div class=\"origin\"><!> <div class=\"replies\"><span> </span><button type=\"button\" class=\"ghost\"> <!></button></div></div>"), _a = o("<div><!></div>"), va = o("<!> <!> <!>", 1);
function ya(e, i) {
	k(i, !0);
	let a = T(i, "more", 3, !1), o = T(i, "origin", 3, null), s = T(i, "replyCount", 3, 0);
	var c = x(), d = r(c);
	we(d, () => i.room.id + ":" + i.thread, (e) => {
		var c = va(), d = r(c), p = (e) => {
			var r = ha(), a = W(r), o = C(a, !0);
			t(r), u((e) => b(o, e), [() => i.vb.t("Carregar mensagens anteriores")]), n("click", a, function(...e) {
				i.onloadolder?.apply(this, e);
			}), U(e, r);
		};
		M(d, (e) => {
			i.list.length && a() && e(p);
		});
		var m = l(d, 2), _ = (e) => {
			var n = ga(), r = W(n);
			ma(r, {
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
			var a = l(r, 2), c = W(a), d = C(c, !0), f = l(c), p = W(f), m = l(p);
			B(m, () => i.vb.icon("reply", 13)), t(f), t(a), t(n), u((e, t) => {
				b(d, e), H(f, "data-gomain", o().id), b(p, `${t ?? ""} `);
			}, [() => s() === 1 ? i.vb.t("1 resposta") : i.vb.t("{n} respostas", { n: s() }), () => i.vb.t("ver na sala principal")]), U(e, n);
		};
		M(m, (e) => {
			o() && e(_);
		});
		var v = l(m, 2), y = (e) => {
			var t = x(), n = r(t);
			A(n, 19, () => i.list, (e) => e.id, (e, t, n) => {
				{
					let r = f(() => h(n) ? i.list[h(n) - 1] : i.previous);
					ma(e, {
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
			}), U(e, t);
		}, S = (e) => {
			var n = _a();
			let a;
			var s = W(n), c = (e) => {
				var t = x(), n = r(t);
				B(n, () => i.vb.t("Comece a conversa. Os agents ligados nesta sala leem e respondem; o seu age com o seu OK. Ex.: <i>organiza o projeto em épicos: site novo, aluguéis e domínio</i>.")), U(e, t);
			}, l = (e) => {
				var t = g();
				u((e) => b(t, e), [() => i.vb.t("Discussão deste épico. Os agents leem as tarefas, o doc e a sala principal.")]), U(e, t);
			};
			M(s, (e) => {
				i.thread === "main" ? e(c) : e(l, -1);
			}), t(n), u(() => a = I(n, 1, "empty", null, a, { afterOrigin: !!o() })), U(e, n);
		};
		M(v, (e) => {
			i.list.length ? e(y) : e(S, -1);
		}), U(e, c);
	}), U(e, c), E();
}
V(["click"]);
// svelte/roomStore.ts
function ba(e, t, n) {
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
function xa() {
	let e = se(null);
	return {
		subscribe: e.subscribe,
		get: () => ye(e),
		replace: e.set,
		apply(t, n) {
			return e.update((e) => ba(e, t, n)), ye(e);
		}
	};
}
// svelte/main.ts
var Sa = /* @__PURE__ */ Ee({
	createRoomStore: () => xa,
	dismissDialogs: () => ue,
	mountInbox: () => Ta,
	mountView: () => wa
}), Ca = {
	tasks: Ke,
	board: mt,
	files: Tt,
	reminders: Ui,
	sidebar: la,
	chat: ya
};
function wa(e, t, n) {
	let r = se(n), a = Ca[e], o = pe(() => Ce(De, {
		target: t,
		props: {
			component: a,
			values: r
		}
	}));
	return {
		update(e) {
			pe(() => r.set(e));
		},
		destroy() {
			pe(() => {
				i(o);
			});
		}
	};
}
function Ta(e, t) {
	let { waits: n, ...r } = t, a = se(n), o = pe(() => Ce(Pe, {
		target: e,
		props: {
			props: r,
			waits: a
		}
	}));
	return Object.assign(() => pe(() => {
		i(o);
	}), { updateWaits(e) {
		pe(() => a.set(e));
	} });
}
export { Pi as a, Oe as c, xa as i, Ta as n, ji as o, wa as r, Ai as s, Sa as t };
