import { $ as e, $t as t, At as n, Bt as r, Ct as i, Dt as a, Et as o, Ft as s, G as c, Gt as l, Ht as u, It as d, J as f, Jt as p, K as m, Lt as h, Mt as g, Ot as _, Pt as v, Q as y, Qt as b, St as x, Tt as S, Ut as C, Vt as w, Wt as T, X as E, Xt as D, Y as O, Yt as k, Z as A, Zt as j, _t as M, a as N, at as P, bt as F, c as I, ct as L, d as ee, dt as te, en as ne, et as R, f as re, ft as ie, ht as ae, i as oe, it as se, jt as z, kt as ce, l as le, lt as ue, m as de, mt as fe, n as pe, o as me, ot as he, pt as B, qt as ge, r as _e, s as ve, st as V, t as ye, tn as be, u as xe, ut as Se, vt as H, wt as Ce, xt as U, yt as we, zt as W } from "./Field-CJgdBE5w.js";
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
function De(e, t) {
	let n = () => y(t.values, "$values", i), [i, a] = A();
	var s = o(), c = r(s);
	ae(c, () => t.component, (e, t) => {
		t(e, E(n));
	}), S(e, s), a();
}
// shared/uiVariant.ts
function Oe(e, t, n) {
	let r = new URL(t), i = new URL(e, r);
	return i.origin !== r.origin || !/^\/(?:app|archived|login|b\/[a-z0-9]+)\/?$/.test(i.pathname) ? String(e) : (n === "svelte" ? i.searchParams.set("ui", "svelte") : i.searchParams.delete("ui"), i.pathname + i.search + i.hash);
}
// svelte/Inbox.svelte
var ke = a("<span class=\"tw:grid tw:size-8 tw:shrink-0 tw:place-items-center tw:rounded-full tw:border tw:border-border tw:bg-muted\"><!></span>"), Ae = a("<li class=\"tw:flex tw:items-start tw:gap-2 tw:py-1\"><a class=\"tw:flex tw:min-w-0 tw:flex-1 tw:gap-3 tw:rounded-control tw:p-2 tw:text-foreground tw:no-underline tw:outline-none tw:hover:bg-accent tw:focus-visible:ring-2 tw:focus-visible:ring-ring\"><!> <span class=\"tw:flex tw:min-w-0 tw:flex-1 tw:flex-col tw:gap-1 tw:text-sm tw:leading-5 tw:[overflow-wrap:anywhere]\"><span class=\"tw:line-clamp-3\"><strong class=\"tw:font-semibold\"> </strong> </span> <span class=\"tw:text-xs tw:leading-4 tw:text-muted-foreground\"> </span></span></a> <!></li>"), je = a("<ul class=\"tw:m-0 tw:max-h-[60dvh] tw:min-h-0 tw:list-none tw:divide-y tw:divide-border tw:overflow-auto tw:overscroll-contain tw:p-0\"></ul>"), Me = a("<!> <!>", 1);
function Ne(e, n) {
	j(n, !0);
	let a = (e) => {
		var a = o(), s = r(a), l = (e) => {
			var r = je();
			H(r, 21, () => v(E), (e) => k(e), (e, r) => {
				var a = Ae(), o = W(a), s = W(o), l = (e) => {
					var n = ke(), r = W(n);
					de(r, { name: "check" }), t(n), S(e, n);
				}, f = p(() => A(v(r)) === "task"), m = (e) => {
					{
						let t = p(() => M(v(r))), i = p(() => n.avatarUrl?.(v(r).author));
						c(e, {
							get name() {
								return v(t);
							},
							get src() {
								return v(i);
							}
						});
					}
				};
				U(s, (e) => {
					v(f) ? e(l) : e(m, -1);
				});
				var h = u(s, 2), g = W(h), y = W(g), b = w(y, !0), C = u(y);
				t(g);
				var T = u(g, 2), E = w(T);
				t(h), t(o);
				var D = u(o, 2), O = (e) => {
					{
						let t = p(() => n.vb.t("Já resolvi (respondi em outro lugar, ou não é comigo)")), i = p(() => v(_) === k(v(r))), a = p(() => v(_) !== null);
						le(e, {
							icon: "check",
							get label() {
								return v(t);
							},
							class: "tw:mt-1",
							get loading() {
								return v(i);
							},
							get disabled() {
								return v(a);
							},
							onclick: () => P(v(r))
						});
					}
				}, j = p(() => v(r).ref.startsWith("m"));
				U(D, (e) => {
					v(j) && e(O);
				}), t(a), d((e, t, n, a) => {
					V(o, "href", e), i(b, t), i(C, ` ${v(r).text ?? ""}`), i(E, `${v(x) ? `${v(r).room} › ` : ""}${n ?? ""} · ${a ?? ""}`);
				}, [
					() => N(v(r)),
					() => A(v(r)) === "task" ? n.vb.t("Tarefa sua esperando OK:") : A(v(r)) === "agent" ? n.vb.t("Seu agent espera você:") : `${M(v(r)).split(" ")[0]}:`,
					() => v(r).topic || n.vb.t("sala principal"),
					() => n.vb.ago(v(r).ts)
				]), z("click", o, (e) => n.onopen(v(r), e)), S(e, a);
			}), t(r), S(e, r);
		}, f = (e) => {
			{
				let t = p(() => v(x) ? n.vb.t("Nada esperando você. ✓") : n.vb.t("Nada esperando você nesta sala. ✓"));
				ve(e, { get title() {
					return v(t);
				} });
			}
		};
		U(s, (e) => {
			v(E).length ? e(l) : e(f, -1);
		}), S(e, a);
	}, m = f(n, "all", 3, !1), h = l(C(s(() => m() || !n.roomId ? "all" : "room"))), g = l(!0), _ = l(null), y = l(""), b = p(() => n.waits.filter((e) => e.book_id === n.roomId)), x = p(() => v(h) === "all" || !n.roomId), E = p(() => v(x) ? n.waits : v(b)), O = p(() => [{
		value: "room",
		label: `${n.vb.t("Esta sala")} (${v(b).length})`
	}, {
		value: "all",
		label: `${n.vb.t("Todas")} (${n.waits.length})`
	}]), k = (e) => `${e.book_id}:${e.ref}`, A = (e) => e.ref.startsWith("t") ? "task" : /^[ab]/.test(e.ref) ? "agent" : "ask", M = (e) => e.author_name || n.displayName?.(e.author) || e.author.split("@")[0];
	function N(e) {
		return Oe(`/b/${encodeURIComponent(e.book_id)}${e.thread === "main" ? "" : `?t=${encodeURIComponent(e.thread)}`}${/^[mab]/.test(e.ref) ? `#m${e.ref.slice(1)}` : ""}`, window.location.href, "svelte");
	}
	async function P(e) {
		T(_, k(e), !0), T(y, "");
		try {
			await n.onresolve(e);
		} catch {
			T(y, n.vb.t("Não deu pra resolver agora. Tente de novo."), !0);
		} finally {
			T(_, null);
		}
	}
	{
		let t = (e) => {
			var t = Me(), i = r(t), o = (e) => {
				me(e, {
					get title() {
						return v(y);
					},
					compact: !0
				});
			};
			U(i, (e) => {
				v(y) && e(o);
			});
			var s = u(i, 2), c = (e) => {
				{
					let t = (e) => {
						a(e);
					}, r = p(() => n.vb.t("Caixa de entrada"));
					I(e, {
						get items() {
							return v(O);
						},
						get label() {
							return v(r);
						},
						onValueChange: (e) => n.ontab?.(e === "all"),
						get value() {
							return v(h);
						},
						set value(e) {
							T(h, e, !0);
						},
						children: t,
						$$slots: { default: !0 }
					});
				}
			}, l = (e) => {
				a(e);
			};
			U(s, (e) => {
				n.roomId ? e(c) : e(l, -1);
			}), S(e, t);
		}, i = p(() => n.vb.t("Caixa de entrada")), o = p(() => n.vb.t("Fechar"));
		ee(e, {
			get title() {
				return v(i);
			},
			get closeLabel() {
				return v(o);
			},
			onOpenChange: (e) => {
				e || n.onclose();
			},
			get open() {
				return v(g);
			},
			set open(e) {
				T(g, e, !0);
			},
			children: t,
			$$slots: { default: !0 }
		});
	}
	D();
}
n(["click"]);
// svelte/InboxMount.svelte
function Pe(e, t) {
	let n = () => y(t.waits, "$waits", r), [r, i] = A();
	Ne(e, E(() => t.props, { get waits() {
		return n();
	} })), i();
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
]), Ie = a("<progress> </progress>");
function Le(e, t) {
	j(t, !0);
	let n = f(t, "max", 3, 100), r = O(t, Fe), a = p(() => Number.isFinite(n()) && n() > 0 ? n() : 100), o = p(() => Number.isFinite(t.value) ? Math.min(v(a), Math.max(0, t.value)) : 0);
	var s = Ie();
	P(s, (e) => ({
		...r,
		max: v(a),
		value: v(o),
		"aria-label": t.label,
		class: e
	}), [() => m("tw:h-1.5 tw:w-full tw:overflow-hidden tw:rounded-full tw:border-0 tw:bg-muted tw:appearance-none tw:[&::-webkit-progress-bar]:rounded-full tw:[&::-webkit-progress-bar]:bg-muted tw:[&::-webkit-progress-value]:rounded-full tw:[&::-webkit-progress-value]:bg-primary tw:[&::-moz-progress-bar]:rounded-full tw:[&::-moz-progress-bar]:bg-primary", t.class)]);
	var c = w(s);
	d(() => i(c, `${v(o) ?? ""}/${v(a) ?? ""}`)), S(e, s), D();
}
// svelte/TaskList.svelte
var Re = a("<!> ", 1), ze = a("<div class=\"tw:min-w-0 tw:flex-1 tw:basis-32 tw:space-y-1\"><!> <!></div>"), Be = a("<div role=\"group\"><!> <!> <!> <!> <!></div>"), Ve = a("<section data-vb-native=\"\" class=\"tw:m-0 tw:box-border tw:space-y-3 tw:rounded-surface tw:bg-background tw:p-3 tw:font-sans tw:text-sm tw:text-foreground\"><header class=\"tw:flex tw:items-center tw:gap-3\"><h3 class=\"tw:m-0 tw:font-sans tw:text-sm tw:font-semibold\"> </h3> <!> <!></header> <!> <!> <div class=\"tw:space-y-2\"></div> <form id=\"newTask\" class=\"tw:flex tw:items-center tw:gap-2\"><!> <!></form></section>"), He = a("<form class=\"tw:grid tw:grid-cols-1 tw:gap-4\"><!> <!> <div class=\"tw:flex tw:flex-wrap tw:justify-end tw:gap-2\"><!><!></div></form>"), Ue = a("<!> <!>", 1);
function We(e, n) {
	let a = _();
	j(n, !0);
	let o = f(n, "waits", 19, () => []), s = p(() => n.room.epics.find((e) => e.id === n.thread) ?? (n.thread === "main" && n.room.roomTasks?.length ? {
		id: "main",
		tasks: n.room.roomTasks,
		flags: []
	} : null)), c = (e) => o().some((t) => t.book_id === n.room.id && t.ref === `t${e.id}`), y = p(() => (v(s)?.tasks ?? []).map((e, t) => ({
		task: e,
		index: t
	})).sort((e, t) => (e.task.done ? 2 : +!c(e.task)) - (t.task.done ? 2 : +!c(t.task)) || e.index - t.index).map((e) => e.task)), x = p(() => v(s)?.tasks.filter((e) => e.done).length ?? 0), C = p(() => [{
		value: "",
		label: n.vb.t("sem dono")
	}, ...(n.room.members ?? []).map((e) => ({
		value: e,
		label: e === n.room.me ? n.vb.t("você") : n.vb.name(e)
	}))]), O = l(null), k = l(""), A = l(null), M = l(""), P = l(""), F = l(null), I = l(!1), L = l(""), te = l(null), R = p(() => v(s)?.tasks.find((e) => e.id === v(F)));
	h(() => {
		v(O) && v(A) && (v(A).focus(), v(A).select());
	}), h(() => {
		v(F) && !v(R) && se(), v(O) && !v(s)?.tasks.some((e) => e.id === v(O)) && T(O, null);
	});
	function re(e) {
		try {
			if (n.send(e)) return T(P, ""), !0;
		} catch {}
		return T(P, n.vb.t("Não deu pra enviar agora. Tente de novo."), !0), !1;
	}
	function ie(e, t = !0) {
		v(O) !== e.id || t && v(k).trim() && v(k) !== e.title && !re({
			t: "task.rename",
			id: e.id,
			title: v(k)
		}) || T(O, null);
	}
	function ae(e) {
		T(F, e.id, !0), T(L, e.due ?? "", !0), T(I, !0);
	}
	function se() {
		T(I, !1), T(F, null), T(L, "");
	}
	var z = Ue(), ue = r(z), he = (e) => {
		var a = Ve(), o = W(a), l = W(o), f = w(l, !0), h = u(l, 2);
		pe(h, {
			children: (e, t) => {
				b();
				var n = ce();
				d(() => i(n, `${v(x) ?? ""}/${v(s).tasks.length ?? ""}`)), S(e, n);
			},
			$$slots: { default: !0 }
		});
		var _ = u(h, 2);
		{
			let e = p(() => n.vb.t("Tarefas")), t = p(() => Math.max(1, v(s).tasks.length)), r = p(() => `${v(x)}/${v(s).tasks.length}`);
			Le(_, {
				get label() {
					return v(e);
				},
				get value() {
					return v(x);
				},
				get max() {
					return v(t);
				},
				get "aria-valuetext"() {
					return v(r);
				},
				class: "tw:ml-auto tw:max-w-24"
			});
		}
		t(o);
		var E = u(o, 2), D = (e) => {
			{
				let t = p(() => `@vibe: ${v(s).flags.join(" · ")}`);
				pe(e, {
					variant: "warning",
					get title() {
						return v(t);
					},
					children: (e, t) => {
						var n = Re(), a = r(n);
						de(a, {
							name: "warning",
							class: "tw:size-3"
						});
						var o = u(a, 1, !0);
						d((e) => i(o, e), [() => v(s).flags.join(" · ")]), S(e, n);
					},
					$$slots: { default: !0 }
				});
			}
		};
		U(E, (e) => {
			v(s).flags?.length && e(D);
		});
		var j = u(E, 2), F = (e) => {
			me(e, {
				get title() {
					return v(P);
				},
				compact: !0
			});
		};
		U(j, (e) => {
			v(P) && !v(I) && e(F);
		});
		var L = u(j, 2);
		H(L, 21, () => v(y), (e) => e.id, (e, a) => {
			var o = Be(), s = W(o);
			{
				let e = p(() => n.vb.t("Feita"));
				_e(s, {
					get checked() {
						return v(a).done;
					},
					get "aria-label"() {
						return v(e);
					},
					onclick: (e) => {
						e.preventDefault(), re({
							t: "task.toggle",
							id: v(a).id
						});
					}
				});
			}
			var l = u(s, 2), f = (e) => {
				{
					let t = p(() => n.vb.t("Clique para editar"));
					N(e, {
						get "data-task-edit"() {
							return v(a).id;
						},
						get "aria-label"() {
							return v(t);
						},
						class: "tw:min-w-32 tw:flex-1",
						onblur: () => ie(v(a)),
						onkeydown: (e) => {
							e.key === "Enter" && (e.preventDefault(), ie(v(a))), e.key === "Escape" && (e.preventDefault(), ie(v(a), !1));
						},
						get ref() {
							return v(A);
						},
						set ref(e) {
							T(A, e, !0);
						},
						get value() {
							return v(k);
						},
						set value(e) {
							T(k, e, !0);
						}
					});
				}
			}, h = (e) => {
				var o = ze(), s = W(o);
				{
					let e = p(() => m("tw:h-auto tw:w-full tw:justify-start tw:whitespace-normal tw:rounded-sm tw:p-0 tw:text-left tw:hover:bg-transparent tw:hover:underline", v(a).done && "tw:text-muted-foreground tw:line-through")), t = p(() => n.vb.t("Clique para editar"));
					xe(s, {
						get "data-task-title"() {
							return v(a).id;
						},
						variant: "ghost",
						get class() {
							return v(e);
						},
						get title() {
							return v(t);
						},
						onclick: () => {
							T(O, v(a).id, !0), T(k, v(a).title, !0);
						},
						children: (e, t) => {
							b();
							var n = ce();
							d(() => i(n, v(a).title)), S(e, n);
						},
						$$slots: { default: !0 }
					});
				}
				var c = u(s, 2), l = (e) => {
					{
						let t = p(() => `@vibe: ${v(a).flags.join(" · ")}`);
						pe(e, {
							variant: "warning",
							get title() {
								return v(t);
							},
							children: (e, t) => {
								var n = Re(), o = r(n);
								de(o, {
									name: "warning",
									class: "tw:size-3"
								});
								var s = u(o, 1, !0);
								d((e) => i(s, e), [() => v(a).flags.join(" · ")]), S(e, n);
							},
							$$slots: { default: !0 }
						});
					}
				};
				U(c, (e) => {
					v(a).flags?.length && e(l);
				}), t(o), S(e, o);
			};
			U(l, (e) => {
				v(O) === v(a).id ? e(f) : e(h, -1);
			});
			var g = u(l, 2);
			{
				let e = p(() => n.vb.t("Responsável")), t = p(() => v(a).owner ?? "");
				oe(g, {
					get "data-owner"() {
						return v(a).id;
					},
					get "aria-label"() {
						return v(e);
					},
					get value() {
						return v(t);
					},
					get items() {
						return v(C);
					},
					class: "tw:w-auto tw:max-w-40",
					onValueChange: (e) => re({
						t: "task.assign",
						id: v(a).id,
						owner: e
					})
				});
			}
			var _ = u(g, 2);
			{
				let e = p(() => n.vb.t("Prazo")), t = p(() => v(a).due ? `${n.vb.t("Prazo")}: ${v(a).due}` : n.vb.t("Prazo"));
				xe(_, {
					get "data-due"() {
						return v(a).id;
					},
					variant: "ghost",
					size: "sm",
					get title() {
						return v(e);
					},
					get "aria-label"() {
						return v(t);
					},
					onclick: () => ae(v(a)),
					children: (e, t) => {
						var n = Re(), o = r(n);
						de(o, {
							name: "calendar",
							class: "tw:size-3.5"
						});
						var s = u(o, 1, !0);
						d(() => i(s, v(a).due ?? "")), S(e, n);
					},
					$$slots: { default: !0 }
				});
			}
			var y = u(_, 2);
			{
				let e = p(() => n.vb.t("Apagar task"));
				le(y, {
					get "data-tdel"() {
						return v(a).id;
					},
					get label() {
						return v(e);
					},
					icon: "close",
					class: "tw:size-8",
					onclick: () => re({
						t: "task.del",
						id: v(a).id
					})
				});
			}
			t(o), d((e) => {
				V(o, "data-task", v(a).id), V(o, "aria-label", v(a).title), B(o, 1, e);
			}, [() => fe(m("tw:flex tw:flex-wrap tw:items-center tw:gap-2 tw:rounded-control tw:border tw:p-2", v(a).done ? "tw:border-transparent tw:bg-muted/40 tw:text-muted-foreground" : "tw:border-border tw:bg-card tw:text-card-foreground", !v(a).done && v(a).owner === n.room.me && "tw:border-ring/50", c(v(a)) && "tw:bg-warning/10"))]), S(e, o);
		}), t(L);
		var ee = u(L, 2), te = W(ee);
		{
			let e = p(() => n.vb.t("nova task")), t = p(() => n.vb.t("nova task"));
			N(te, {
				get "aria-label"() {
					return v(e);
				},
				get placeholder() {
					return v(t);
				},
				get value() {
					return v(M);
				},
				set value(e) {
					T(M, e, !0);
				}
			});
		}
		var ne = u(te, 2);
		{
			let e = p(() => n.vb.t("Nova tarefa"));
			le(ne, {
				type: "submit",
				get label() {
					return v(e);
				},
				icon: "plus",
				variant: "outline"
			});
		}
		t(ee), t(a), d((e, t) => {
			V(a, "aria-label", e), i(f, t);
		}, [() => n.vb.t("Tarefas"), () => n.vb.t("Tarefas")]), g("submit", ee, (e) => {
			e.preventDefault(), v(M).trim() && re({
				t: "task.add",
				epic: n.thread,
				title: v(M)
			}) && T(M, "");
		}), S(e, a);
	};
	U(ue, (e) => {
		v(s) && e(he);
	});
	var ge = u(ue, 2), ve = (e) => {
		{
			let r = p(() => n.vb.t("Prazo")), o = p(() => n.vb.t("Prazo (ex.: sex, qua 23h, 06/11). Vazio tira o prazo:")), s = p(() => n.vb.t("Fechar"));
			ee(e, {
				get title() {
					return v(r);
				},
				get description() {
					return v(o);
				},
				get closeLabel() {
					return v(s);
				},
				initialFocus: () => v(te),
				onOpenChange: (e) => {
					e || se();
				},
				get open() {
					return v(I);
				},
				set open(e) {
					T(I, e, !0);
				},
				children: (e, r) => {
					var o = He(), s = W(o);
					{
						let e = (e, t = ne) => {
							N(e, E(t, {
								get ref() {
									return v(te);
								},
								set ref(e) {
									T(te, e, !0);
								},
								get value() {
									return v(L);
								},
								set value(e) {
									T(L, e, !0);
								}
							}));
						}, t = p(() => `${a}-due`), r = p(() => n.vb.t("Prazo"));
						ye(s, {
							get id() {
								return v(t);
							},
							get label() {
								return v(r);
							},
							children: e,
							$$slots: { default: !0 }
						});
					}
					var c = u(s, 2), l = (e) => {
						me(e, {
							get title() {
								return v(P);
							},
							compact: !0
						});
					};
					U(c, (e) => {
						v(P) && e(l);
					});
					var f = u(c, 2), m = W(f);
					xe(m, {
						variant: "outline",
						onclick: se,
						children: (e, t) => {
							b();
							var r = ce();
							d((e) => i(r, e), [() => n.vb.t("Cancelar")]), S(e, r);
						},
						$$slots: { default: !0 }
					});
					var h = u(m);
					xe(h, {
						type: "submit",
						children: (e, t) => {
							b();
							var r = ce();
							d((e) => i(r, e), [() => n.vb.t("Salvar")]), S(e, r);
						},
						$$slots: { default: !0 }
					}), t(f), t(o), g("submit", o, (e) => {
						e.preventDefault(), v(R) && re({
							t: "task.assign",
							id: v(R).id,
							due: v(L)
						}) && se();
					}), S(e, o);
				},
				$$slots: { default: !0 }
			});
		}
	};
	U(ge, (e) => {
		v(R) && e(ve);
	}), S(e, z), D();
}
// svelte/Tasks.svelte
var Ge = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy"
]);
function Ke(e, t) {
	j(t, !0);
	let n = O(t, Ge);
	var i = o(), a = r(i);
	F(a, () => JSON.stringify([t.room.id, t.thread]), (e) => {
		We(e, E(() => n));
	}), S(e, i), D();
}
// svelte/panels.ts
var qe = (e) => String(e ?? "").replace(/[&<>"']/g, (e) => ({
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	"\"": "&quot;",
	"'": "&#39;"
})[e]), Je = (e) => e.type.startsWith("image/") ? "img" : e.type.startsWith("audio/") ? "audio" : e.type === "text/html" ? "html" : e.type === "application/pdf" ? "pdf" : /\.md$/i.test(e.name) || e.type === "text/markdown" ? "md" : e.type === "text/plain" || e.type === "text/csv" ? "txt" : "other", Ye = (e) => e > 1e6 ? `${(e / 1e6).toFixed(1)} MB` : `${Math.max(1, Math.round(e / 1e3))} KB`, Xe = a("<button type=\"button\"><span class=\"kt\"> </span><!><span> </span></button>"), Ze = a("<section><h3 class=\"mine\"> </h3> <!></section>"), Qe = a("<section><h3><span class=\"ri\"> </span> </h3> <!></section>"), $e = a("<div class=\"empty\"> </div>"), et = a("<div class=\"klist\"><!><!></div>"), tt = a("<span class=\"vnote\"><!> </span>"), nt = a("<!><span> </span>", 1), rt = a("<span><!> </span>"), it = a("<div draggable=\"true\" tabindex=\"0\" role=\"button\"><div class=\"kt\"></div> <!> <div class=\"km\"><span class=\"kep\"> </span><!><!></div></div>"), at = a("<div class=\"kempty\"> </div>"), ot = a("<input type=\"hidden\" name=\"epic\"/>"), st = a("<option> </option>"), ct = a("<select name=\"epic\"></select>"), lt = a("<form class=\"kadd\"><input/><button></button><!></form>"), ut = a("<section><h3> <span> </span></h3> <div class=\"cards\"></div> <!></section>"), dt = a("<div class=\"lanes\"></div>"), ft = a("<div class=\"kbar\"><span class=\"seg\"><button type=\"button\" data-mode=\"board\"><!> </button><button type=\"button\" data-mode=\"list\"> </button></span><small class=\"kScope\"> </small></div> <!>", 1);
function pt(e, n) {
	j(n, !0);
	let a = (e, a = ne) => {
		var s = Xe();
		let c;
		var l = W(s), f = w(l, !0), p = u(l), m = (e) => {
			var t = o(), i = r(t);
			M(i, () => n.vb.avatar(a().owner)), S(e, t);
		};
		U(p, (e) => {
			a().owner && e(m);
		});
		var h = u(p), g = w(h, !0);
		t(s), d((e) => {
			c = B(s, 1, "krow", null, c, { done: a().status === "done" }), V(s, "data-k", a().id), V(s, "data-epic", a().epic.id), i(f, a().title), B(h, 1, `kst ${a().status}`), i(g, e);
		}, [() => n.vb.t(O[a().status] || a().status)]), z("click", s, () => n.onopen?.(a().epic.id)), S(e, s);
	}, s = [
		["todo", "A fazer"],
		["doing", "Fazendo"],
		["review", "Esperando OK"],
		["done", "Feito"]
	], c = l(C((() => {
		try {
			return localStorage.getItem("vb.boardMode") || "board";
		} catch {
			return "board";
		}
	})())), f = l(""), m = l(""), h = l(null), _ = p(() => n.thread !== "main" && !n.thread.startsWith("pre:") && n.room.epics.some((e) => e.id === n.thread) ? n.thread : null), y = p(() => n.room.epics.filter((e) => v(_) ? e.id === v(_) : !e.archived)), b = p(() => v(y).flatMap((e) => e.tasks.map((t) => ({
		...t,
		epic: e
	})))), x = p(() => [...v(_) ? [] : [{
		id: "main",
		title: n.room.book?.title || "vibebook",
		tasks: n.room.roomTasks || []
	}], ...v(y)].map((e) => ({
		e,
		list: e.tasks.filter((e) => e.status !== "done").map((t) => ({
			...t,
			epic: e
		}))
	})).filter((e) => e.list.length)), E = p(() => v(x).flatMap((e) => e.list.filter((e) => e.owner === n.room.me))), O = {
		todo: "a fazer",
		doing: "fazendo",
		review: "esperando OK",
		done: "feito"
	}, k = (e, t) => n.send({
		t: "task.status",
		id: e,
		status: t
	});
	function A(e) {
		T(c, e, !0);
		try {
			localStorage.setItem("vb.boardMode", e);
		} catch {}
	}
	function N(e, t) {
		e.dataTransfer?.setData("text/plain", t), e.currentTarget.classList.add("dragging");
	}
	function P(e, t) {
		e.preventDefault(), T(h, null);
		let n = e.dataTransfer?.getData("text/plain");
		n && k(n, t);
	}
	function F(e, t) {
		let r = s.findIndex(([e]) => e === t.status);
		e.key === "ArrowRight" && r < s.length - 1 && (e.preventDefault(), k(t.id, s[r + 1][0])), e.key === "ArrowLeft" && r > 0 && (e.preventDefault(), k(t.id, s[r - 1][0])), e.key === "Enter" && n.onopen?.(t.epic.id);
	}
	var I = o(), L = r(I), ee = (e) => {
		var o = ft(), l = r(o), y = W(l), C = W(y);
		let D;
		var O = W(C);
		M(O, () => n.vb.icon("board", 14));
		var k = u(O);
		t(C);
		var j = u(C);
		let I;
		var L = w(j, !0);
		t(y);
		var ee = u(y), ne = w(ee, !0);
		t(l);
		var R = u(l, 2), re = (e) => {
			var r = et(), o = W(r), s = (e) => {
				var r = Ze(), o = W(r), s = w(o), c = u(o, 2);
				H(c, 17, () => v(E), (e) => e.id, (e, t) => {
					a(e, () => v(t));
				}), t(r), d((e) => i(s, `⏳ ${e ?? ""} · ${v(E).length ?? ""}`), [() => n.vb.t("Esperando você")]), S(e, r);
			};
			U(o, (e) => {
				v(E).length && e(s);
			});
			var c = u(o);
			H(c, 17, () => v(x), (e) => e.e.id, (e, r) => {
				var o = Qe(), s = W(o), c = W(s);
				let l;
				var f = w(c, !0), p = u(c);
				t(s);
				var m = u(s, 2);
				H(m, 17, () => v(r).list, (e) => e.id, (e, t) => {
					a(e, () => v(t));
				}), t(o), d((e, t) => {
					l = ie(c, "", l, { background: e }), i(f, t), i(p, `${v(r).e.title ?? ""} · ${v(r).list.length ?? ""}`);
				}, [() => n.vb.color(v(r).e.title), () => n.vb.initials(v(r).e.title)]), S(e, o);
			}, (e) => {
				var t = $e(), r = w(t, !0);
				d((e) => i(r, e), [() => n.vb.t("Nenhuma tarefa aberta.")]), S(e, t);
			}), t(r), S(e, r);
		}, ae = (e) => {
			var a = dt();
			H(a, 21, () => s, we, (e, a) => {
				var o = p(() => be(v(a), 2));
				let s = () => v(o)[0], c = () => v(o)[1], l = p(() => v(b).filter((e) => e.status === s()));
				var y = ut();
				let x;
				var C = W(y), E = W(C, !0), D = u(E), O = w(D, !0);
				t(C);
				var k = u(C, 2);
				H(k, 21, () => v(l), (e) => e.id, (e, a) => {
					var o = it();
					let s;
					var c = W(o);
					M(c, () => n.vb.mentions?.(qe(v(a).title)) ?? qe(v(a).title), !0), t(c);
					var l = u(c, 2), f = (e) => {
						var r = tt(), o = W(r);
						M(o, () => n.vb.icon("alert", 12));
						var s = u(o);
						t(r), d((e, t) => {
							V(r, "title", e), i(s, ` ${t ?? ""}`);
						}, [() => `@vibe: ${v(a).flags.join(" · ")}`, () => v(a).flags.join(" · ")]), S(e, r);
					};
					U(l, (e) => {
						v(a).flags?.length && e(f);
					});
					var p = u(l, 2), m = W(p);
					let h;
					var _ = w(m, !0), y = u(m), b = (e) => {
						var t = nt(), o = r(t);
						M(o, () => n.vb.avatar(v(a).owner));
						var s = u(o), c = w(s, !0);
						d((e) => i(c, e), [() => v(a).owner === n.room.me ? n.vb.t("você") : n.vb.name(v(a).owner)]), S(e, t);
					};
					U(y, (e) => {
						v(a).owner && e(b);
					});
					var x = u(y), C = (e) => {
						var r = rt(), o = W(r);
						M(o, () => n.vb.icon("calendar", 12));
						var s = u(o);
						t(r), d(() => i(s, ` ${v(a).due ?? ""}`)), S(e, r);
					};
					U(x, (e) => {
						v(a).due && e(C);
					}), t(p), t(o), d((e, t) => {
						s = B(o, 1, "kcard", null, s, {
							done: v(a).status === "done",
							mine: v(a).status !== "done" && v(a).owner === n.room.me
						}), V(o, "data-k", v(a).id), V(o, "data-status", v(a).status), V(o, "data-epic", v(a).epic.id), V(o, "title", e), h = ie(m, "", h, { background: t }), i(_, v(a).epic.title);
					}, [() => n.vb.t("Arraste, ou use ← →. Clique pra abrir o épico."), () => n.vb.color(v(a).epic.title)]), g("dragstart", o, (e) => N(e, v(a).id)), g("dragend", o, (e) => e.currentTarget.classList.remove("dragging")), z("click", o, () => n.onopen?.(v(a).epic.id)), z("keydown", o, (e) => F(e, v(a))), S(e, o);
				}, (e) => {
					var t = at(), r = w(t, !0);
					d((e) => i(r, e), [() => n.vb.t(s() === "todo" ? "Nada a fazer." : "Arraste um card pra cá.")]), S(e, t);
				}), t(k);
				var A = u(k, 2), j = (e) => {
					var r = lt(), a = W(r);
					he(a);
					var o = u(a);
					M(o, () => n.vb.icon("plus"), !0), t(o);
					var s = u(o), c = (e) => {
						var t = ot();
						he(t), d(() => ue(t, v(_))), S(e, t);
					}, l = (e) => {
						var r = ct();
						H(r, 21, () => n.room.epics, we, (e, t) => {
							var n = st(), r = w(n, !0), a = {};
							d(() => {
								i(r, v(t).title), a !== (a = v(t).id) && (n.value = (n.__value = a) ?? "");
							}), S(e, n);
						}), t(r), te(r), d((e) => V(r, "aria-label", e), [() => n.vb.t("Épico")]), Se(r, () => v(m), (e) => T(m, e)), S(e, r);
					};
					U(s, (e) => {
						v(_) ? e(c) : e(l, -1);
					}), t(r), d((e, t, n) => {
						V(a, "placeholder", e), V(a, "aria-label", t), V(o, "aria-label", n);
					}, [
						() => n.vb.t("nova tarefa"),
						() => n.vb.t("Nova tarefa"),
						() => n.vb.t("Nova tarefa")
					]), g("submit", r, (e) => {
						e.preventDefault();
						let t = v(_) || v(m) || n.room.epics[0]?.id;
						v(f).trim() && t && n.send({
							t: "task.add",
							epic: t,
							title: v(f).trim()
						}), T(f, "");
					}), se(a, () => v(f), (e) => T(f, e)), S(e, r);
				};
				U(A, (e) => {
					s() === "todo" && e(j);
				}), t(y), d((e, t) => {
					x = B(y, 1, "lane", null, x, { over: v(h) === s() }), V(y, "data-lane", s()), V(y, "aria-label", e), i(E, t), i(O, v(l).length);
				}, [() => n.vb.t(c()), () => n.vb.t(c())]), g("dragover", y, (e) => {
					e.preventDefault(), T(h, s(), !0);
				}), g("dragleave", y, () => T(h, null)), g("drop", y, (e) => P(e, s())), S(e, y);
			}), t(a), S(e, a);
		};
		U(R, (e) => {
			v(c) === "list" ? e(re) : e(ae, -1);
		}), d((e, t, n) => {
			D = B(C, 1, "", null, D, { on: v(c) === "board" }), i(k, ` ${e ?? ""}`), I = B(j, 1, "", null, I, { on: v(c) === "list" }), i(L, t), i(ne, n);
		}, [
			() => n.vb.t("Quadro"),
			() => n.vb.t("Lista"),
			() => v(_) ? n.room.epics.find((e) => e.id === v(_))?.title : n.vb.t("Todos os épicos")
		]), z("click", C, () => A("board")), z("click", j, () => A("list")), S(e, o);
	}, R = (e) => {
		var t = $e(), r = w(t, !0);
		d((e) => i(r, e), [() => n.vb.t("Ainda não tem épico nem tarefa. Crie um épico na barra ao lado, ou peça pro seu agent organizar o projeto em épicos e tarefas.")]), S(e, t);
	};
	U(L, (e) => {
		n.room.epics.length ? e(ee) : e(R, -1);
	}), S(e, I), D();
}
n(["click", "keydown"]);
// svelte/Files.svelte
var mt = a("<button type=\"button\"> <small> </small></button>"), ht = a("<div class=\"ftabs\"></div>"), gt = a("<div class=\"fcrumb\"><button type=\"button\" class=\"ghost\"> </button><b><!> </b></div>"), _t = a("<button type=\"button\" class=\"ftile fdir\"><div class=\"thumb\"></div> <b> </b><small> </small></button>"), vt = a("<img loading=\"lazy\"/>"), yt = a("<a class=\"ftile\" target=\"_blank\" rel=\"noopener\"><div class=\"thumb\"><!></div> <b> </b><small> </small> <button type=\"button\" data-pin-kind=\"file\"></button></a>"), bt = a("<div class=\"empty\"> </div>"), xt = a("<!> <!> <div class=\"fgrid\"><!> <!></div> <!>", 1);
function St(e, n) {
	j(n, !0);
	let a = [
		["all", "Tudo"],
		["img", "Imagens"],
		["md", "Markdown"],
		["txt", "Texto e CSV"],
		["html", "HTML"],
		["pdf", "PDF"],
		["audio", "Áudios"],
		["other", "Outros"]
	], s = l("all"), c = l(""), f = p(() => n.room.files || []), m = p(() => {
		let e = { all: v(f).length };
		for (let t of v(f)) {
			let n = Je(t);
			e[n] = (e[n] || 0) + 1;
		}
		return e;
	}), g = p(() => v(m)[v(s)] ? v(s) : "all"), _ = p(() => v(f).filter((e) => v(g) === "all" || Je(e) === v(g))), y = (e) => e.name.includes("/") ? e.name.slice(0, e.name.lastIndexOf("/")) : "", b = p(() => v(c) && v(_).some((e) => y(e) === v(c) || y(e).startsWith(v(c) + "/")) ? v(c) : ""), x = p(() => v(b) ? v(b) + "/" : "");
	h(() => {
		v(m)[v(s)] || T(s, "all"), v(c) && v(b) !== v(c) && T(c, "");
	});
	function C(e, t) {
		T(c, t, !0);
		let n = e.currentTarget.closest("#filesPane");
		n && (n.scrollTop = 0);
	}
	let E = p(() => {
		let e = /* @__PURE__ */ new Map(), t = [];
		for (let n of v(_)) {
			let r = y(n);
			if (r === v(b)) t.push(n);
			else if (r.startsWith(v(x))) {
				let t = r.slice(v(x).length).split("/")[0];
				e.set(t, (e.get(t) || 0) + 1);
			}
		}
		let n = {};
		if (v(b)) for (let e of t) n[e.name] = (n[e.name] || 0) + 1;
		return {
			dirs: [...e].sort((e, t) => e[0].localeCompare(t[0])),
			list: v(b) ? t.filter((e, n) => t.findIndex((t) => t.name === e.name) === n) : t,
			versions: n
		};
	}), O = (e) => `/api/books/${n.room.id}/files/${e.id}`, k = (e) => n.room.pins?.find((t) => t.kind === "file" && t.ref === e.id);
	function A(e, t) {
		e.preventDefault(), e.stopPropagation();
		let r = k(t);
		n.send(r ? {
			t: "pin.del",
			id: r.id
		} : {
			t: "pin.add",
			kind: "file",
			ref: t.id
		});
	}
	var N = o(), P = r(N), F = (e) => {
		var c = xt(), l = r(c), f = (e) => {
			var r = ht();
			H(r, 21, () => a.filter(([e]) => v(m)[e]), we, (e, r) => {
				var a = p(() => be(v(r), 2));
				let o = () => v(a)[0], c = () => v(a)[1];
				var l = mt();
				let f;
				var h = W(l), _ = u(h), y = w(_, !0);
				t(l), d((e) => {
					f = B(l, 1, "ftab", null, f, { on: o() === v(g) }), V(l, "data-fkind", o()), i(h, `${e ?? ""} `), i(y, v(m)[o()]);
				}, [() => n.vb.t(c())]), z("click", l, () => T(s, o(), !0)), S(e, l);
			}), t(r), S(e, r);
		};
		U(l, (e) => {
			v(m).all > 1 && e(f);
		});
		var h = u(l, 2), _ = (e) => {
			var r = gt(), a = W(r), o = w(a), s = u(a), c = W(s);
			M(c, () => n.vb.icon("folder", 14));
			var l = u(c);
			t(s), t(r), d((e, t) => {
				V(a, "data-fdir", e), i(o, `← ${t ?? ""}`), i(l, ` ${v(b) ?? ""}/`);
			}, [() => v(b).includes("/") ? v(b).slice(0, v(b).lastIndexOf("/")) : "", () => n.vb.t("voltar")]), z("click", a, (e) => C(e, v(b).includes("/") ? v(b).slice(0, v(b).lastIndexOf("/")) : "")), S(e, r);
		};
		U(h, (e) => {
			v(b) && e(_);
		});
		var y = u(h, 2), D = W(y);
		H(D, 17, () => v(E).dirs, we, (e, r) => {
			var a = p(() => be(v(r), 2));
			let o = () => v(a)[0], s = () => v(a)[1];
			var c = _t(), l = W(c);
			M(l, () => n.vb.icon("folder", 34), !0), t(l);
			var f = u(l, 2), m = w(f), h = u(f), g = w(h, !0);
			t(c), d((e) => {
				V(c, "data-fdir", v(x) + o()), i(m, `${o() ?? ""}/`), i(g, e);
			}, [() => s() === 1 ? n.vb.t("1 arquivo") : n.vb.t("{n} arquivos", { n: s() })]), z("click", c, (e) => C(e, v(x) + o())), S(e, c);
		});
		var j = u(D, 2);
		H(j, 17, () => v(E).list, (e) => e.id, (e, a) => {
			var s = yt(), c = W(s), l = W(c), f = (e) => {
				var t = vt();
				d((e) => {
					V(t, "src", e), V(t, "alt", v(a).name);
				}, [() => O(v(a))]), S(e, t);
			}, m = p(() => v(a).type.startsWith("image/")), h = (e) => {
				var t = o(), i = r(t);
				M(i, () => n.vb.icon(v(a).type === "text/html" ? "globe" : v(a).type.startsWith("audio/") ? "mic" : "file", 30)), S(e, t);
			};
			U(l, (e) => {
				v(m) ? e(f) : e(h, -1);
			}), t(c);
			var g = u(c, 2), _ = w(g, !0), y = u(g), b = w(y), C = u(y, 2);
			let T;
			M(C, () => n.vb.icon("pin", 14), !0), t(C), t(s), d((e, t, n, r, o, c, l, u, d, f) => {
				V(s, "href", e), V(s, "title", v(a).name), V(s, "data-view", t), V(s, "data-name", v(a).name), i(_, n), i(b, `${r ?? ""} · ${o ?? ""} · ${c ?? ""}`), T = B(C, 1, "ghost pinBtn", null, T, { on: l }), V(C, "data-pin-ref", v(a).id), V(C, "title", u), V(C, "aria-label", d), V(C, "aria-pressed", f);
			}, [
				() => O(v(a)),
				() => v(a).type.startsWith("image/") ? "img" : "frame",
				() => v(a).name.slice(v(x).length),
				() => n.vb.name(v(a).author),
				() => n.vb.ago(v(a).ts),
				() => v(E).versions[v(a).name] > 1 ? n.vb.t("{n} versões", { n: v(E).versions[v(a).name] }) : Ye(v(a).size),
				() => !!k(v(a)),
				() => n.vb.t(k(v(a)) ? "Desafixar" : "Fixar na lateral"),
				() => n.vb.t(k(v(a)) ? "Desafixar" : "Fixar na lateral"),
				() => !!k(v(a))
			]), z("click", C, (e) => A(e, v(a))), S(e, s);
		}), t(y);
		var N = u(y, 2), P = (e) => {
			var t = bt(), r = w(t, !0);
			d((e) => i(r, e), [() => n.vb.t("Nada aqui.")]), S(e, t);
		};
		U(N, (e) => {
			!v(E).list.length && !v(E).dirs.length && e(P);
		}), S(e, c);
	}, I = (e) => {
		var t = bt(), r = w(t, !0);
		d((e) => i(r, e), [() => n.vb.t("Cole uma imagem no chat (Cmd+V), arraste um arquivo ou use o clipe. Tudo que for enviado neste vibebook fica aqui.")]), S(e, t);
	};
	U(P, (e) => {
		v(f).length ? e(F) : e(I, -1);
	}), S(e, N), D();
}
n(["click"]);
// ../vibebook-svelte/node_modules/zod/v4/core/util.js
function Ct(e, t) {
	return typeof t == "bigint" ? t.toString() : t;
}
var wt = class {
	constructor(e) {
		this._getter = e, this._value = void 0;
	}
	get value() {
		let e = this._getter;
		return e !== void 0 && (this._value = e(), this._getter = void 0), this._value;
	}
};
function Tt(e) {
	return new wt(e);
}
function Et(e) {
	return e == null;
}
function Dt(e) {
	let t = +!!e.startsWith("^"), n = e.endsWith("$") ? e.length - 1 : e.length;
	return e.slice(t, n);
}
function Ot(e, t, n) {
	Object.defineProperty(e, t, {
		value: n,
		writable: !0,
		enumerable: !0,
		configurable: !0
	});
}
function kt(e) {
	let t = Object.getOwnPropertyDescriptor(e, "shape");
	return t?.get ? t.get.raw : t?.value;
}
function At(e) {
	return kt(e._zod.def) ?? e._zod.def.shape;
}
function jt(e, t, n) {
	Object.defineProperty(e, t, {
		get() {
			let e = n();
			return Ot(this, t, e), e;
		},
		enumerable: !0,
		configurable: !0
	});
}
function Mt(e, t, n) {
	t in e ? Ot(e, t, n) : e[t] = n;
}
function Nt(e, t, n, r) {
	let i = At(t);
	for (let a of n) {
		let n = Object.getOwnPropertyDescriptor(i, a);
		n.enumerable && (n.get ? jt(e, a, () => {
			let e = t._zod.def.shape[a];
			return r ? r(e, a) : e;
		}) : Mt(e, a, r ? r(n.value, a) : n.value));
	}
}
function Pt(e, t) {
	for (let n of Reflect.ownKeys(t)) {
		let r = Object.getOwnPropertyDescriptor(t, n);
		r.enumerable && (r.get ? jt(e, n, () => t[n]) : Mt(e, n, r.value));
	}
}
function Ft(...e) {
	let t = {};
	for (let n of e) {
		let e = Object.getOwnPropertyDescriptors(n);
		Object.assign(t, e);
	}
	return Object.defineProperties({}, t);
}
var It = "captureStackTrace" in Error ? Error.captureStackTrace : (...e) => {};
function Lt(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function Rt(e) {
	if (Lt(e) === !1) return !1;
	let t = e.constructor;
	if (t === void 0 || typeof t != "function") return !0;
	let n = t.prototype;
	return Lt(n) !== !1 && Object.prototype.hasOwnProperty.call(n, "isPrototypeOf") !== !1;
}
function zt(e) {
	return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function Bt(e, t, n) {
	let r = new e._zod.constr(t ?? e._zod.def);
	return (!t || n?.parent) && (r._zod.parent = e), r;
}
function Vt(e) {
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
function Ht(e) {
	return Object.keys(e).filter((t) => e[t]._zod.optin !== void 0 && e[t]._zod.optout === "optional");
}
function Ut(e, t) {
	if (!Rt(t)) throw Error("Invalid input to extend: expected a plain object");
	let n = e._zod.def.checks;
	if (n && n.length > 0) {
		let n = At(e);
		for (let e of Reflect.ownKeys(t)) if (Object.getOwnPropertyDescriptor(n, e) !== void 0) throw Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
	}
	return Bt(e, Ft(e._zod.def, { shape: Wt(e, t) }));
}
function Wt(e, t) {
	let n = {};
	return Nt(n, e, Reflect.ownKeys(At(e))), Pt(n, t), n;
}
function Gt(e, t = 0) {
	if (e.aborted === !0) return !0;
	for (let n = t; n < e.issues.length; n++) if (e.issues[n]?.continue !== !0) return !0;
	return !1;
}
function Kt(e, t = 0) {
	if (e.aborted === !0) return !0;
	for (let n = t; n < e.issues.length; n++) if (e.issues[n]?.continue === !1) return !0;
	return !1;
}
function qt(e, t) {
	return t.map((t) => {
		var n;
		return (n = t).path ?? (n.path = []), t.path.unshift(e), t;
	});
}
function Jt(e) {
	return typeof e == "string" ? e : e?.message;
}
function Yt(e, t, n) {
	var r;
	for (let i = t; i < e.length; i++) (r = e[i]).schema ?? (r.schema = n);
}
function Xt(e, t, n) {
	var r;
	let i = e.inst?._zod?.traits;
	i?.has("$ZodType") && (i.has("$ZodCheck") ? (r = e).schema ?? (r.schema = e.inst) : e.schema = e.inst);
	let a = e.schema === e.inst ? void 0 : e.schema?._zod.def?.error, o = e.message ? e.message : Jt(e.inst?._zod.def?.error?.(e)) ?? Jt(a?.(e)) ?? Jt(t?.error?.(e)) ?? Jt(n.customError?.(e)) ?? Jt(n.localeError?.(e)) ?? "Invalid input", s = {};
	for (let t of Object.keys(e)) t !== "inst" && t !== "schema" && t !== "continue" && t !== "input" && t !== "__proto__" && (s[t] = e[t]);
	return s.path ??= [], s.message = o, t?.reportInput && (s.input = e.input), s;
}
var Zt = /[\uD800-\uDBFF]/;
function Qt(e) {
	let t = e.length;
	if (!Zt.test(e)) return t;
	let n = t;
	for (let r = 0; r < t - 1; r++) (e.charCodeAt(r) & 64512) == 55296 && (e.charCodeAt(r + 1) & 64512) == 56320 && (n--, r++);
	return n;
}
function $t(e) {
	return Array.isArray(e) ? "array" : typeof e == "string" ? "string" : "unknown";
}
function en(e, t) {
	for (let n in t) {
		let r = Object.getOwnPropertyDescriptor(t, n);
		r.get ? Object.defineProperty(e, n, {
			...r,
			enumerable: !1
		}) : rn(e, n, r.value);
	}
}
function tn(e, t, n, r = !0) {
	return Object.defineProperty(e, t, {
		configurable: !0,
		writable: !0,
		enumerable: r,
		value: n
	}), n;
}
function nn(e, t, n) {
	return tn(e, t, n, !1);
}
function rn(e, t, n) {
	Object.defineProperty(e, t, {
		configurable: !0,
		get() {
			return this == null ? n : tn(this, t, n.bind(this));
		},
		set(e) {
			tn(this, t, e);
		}
	});
}
function an(e, t) {
	let n = Object.getPrototypeOf(e);
	return t in n ? void 0 : n;
}
var on, sn = !1, cn = {
	configurable: !0,
	get() {
		sn = !0;
	}
};
function ln(e, t, n) {
	let r = Object.getPrototypeOf(e._zod);
	t in r && on !== e._zod ? on = void 0 : (on = e._zod, Object.defineProperty(r, t, {
		configurable: !0,
		get() {
			Object.defineProperty(this, t, cn);
			let e = sn;
			sn = !1;
			try {
				let r = n(this);
				return sn ? delete this[t] : Object.defineProperty(this, t, {
					configurable: !0,
					writable: !0,
					value: r
				}), sn ||= e, r;
			} catch (n) {
				throw delete this[t], sn ||= e, n;
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
function un(e, t, n, r) {
	let i = an(e, t);
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
// ../vibebook-svelte/node_modules/zod/v4/core/core.js
var dn, fn = {
	value: void 0,
	enumerable: !1
}, pn = "captureStackTrace" in Error ? Error : null;
function mn(e) {
	let t = pn;
	if (t) {
		let n = t.stackTraceLimit;
		if (typeof n == "number") {
			try {
				t.stackTraceLimit = 0;
			} catch {
				return pn = null, new e();
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
			fn.value = new a(r);
			try {
				Object.defineProperty(n, "_zod", fn);
			} finally {
				fn.value = void 0;
			}
		} else if (n._zod.traits.has(e)) return;
		if (n._zod.traits.add(e), t(n, r), s) {
			let e = Object.getPrototypeOf(n), t = n._zod.constr.prototype, r = e;
			for (; r && r !== t;) r = Object.getPrototypeOf(r);
			let i = r ?? e;
			s.has(i) || (s.add(i), en(i, o));
		}
		let i = d.prototype;
		for (let e in i) Object.prototype.hasOwnProperty.call(i, e) && (e in n || (n[e] = i[e].bind(n)));
	}
	let l = r?.Parent ?? Object;
	class u extends l {}
	Object.defineProperty(u, "name", { value: e });
	function d(e) {
		let t = r?.Parent ? mn(u) : this;
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
var hn = class extends Error {
	constructor() {
		super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
	}
};
(dn = globalThis).__zod_globalConfig ?? (dn.__zod_globalConfig = {});
var gn = globalThis.__zod_globalConfig;
function _n(e) {
	return e && Object.assign(gn, e), gn;
}
// ../vibebook-svelte/node_modules/zod/v4/core/errors.js
function vn() {
	let e = this._zod;
	return e.message ??= JSON.stringify(e.def, Ct, 2), e.message;
}
function yn(e) {
	this._zod.message = e;
}
var bn = {
	get: vn,
	set: yn,
	enumerable: !0,
	configurable: !0
}, xn = {
	value: void 0,
	enumerable: !1
}, Sn = /* @__PURE__ */ new WeakSet([Object.prototype, Error.prototype]), Cn = /* @__PURE__ */ G("$ZodError", (e, t) => {
	e.name = "$ZodError", xn.value = t, Object.defineProperty(e, "issues", xn), xn.value = void 0, Object.defineProperty(e, "message", bn);
	let n = Object.getPrototypeOf(e);
	Sn.has(n) || (Sn.add(n), Object.defineProperty(n, "toString", {
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
}, void 0, { Parent: Error }), wn = /* @__PURE__*/ ((e) => {
	let t = (n, r, i, a) => {
		let o = i ? {
			...i,
			async: !1
		} : { async: !1 }, s = n._zod.run({
			value: r,
			issues: []
		}, o);
		if (s instanceof Promise) throw new hn();
		if (s.issues.length) {
			let n = new ((a?.Err) ?? e)(s.issues.map((e) => Xt(e, o, _n())));
			throw It(n, a?.callee ?? t), n;
		}
		return s.value;
	};
	return t;
})(Cn), Tn = /* @__PURE__*/ ((e) => {
	let t = async (n, r, i, a) => {
		let o = i ? {
			...i,
			async: !0
		} : { async: !0 }, s = n._zod.run({
			value: r,
			issues: []
		}, o);
		if (s instanceof Promise && (s = await s), s.issues.length) {
			let n = new ((a?.Err) ?? e)(s.issues.map((e) => Xt(e, o, _n())));
			throw It(n, a?.callee ?? t), n;
		}
		return s.value;
	};
	return t;
})(Cn), En = /* @__PURE__*/ ((e) => (t, n, r) => {
	let i = r ? {
		...r,
		async: !1
	} : { async: !1 }, a = t._zod.run({
		value: n,
		issues: []
	}, i);
	if (a instanceof Promise) throw new hn();
	return a.issues.length ? Dn(e, a.issues, i) : {
		success: !0,
		data: a.value
	};
})(Cn);
function Dn(e, t, n) {
	let r;
	return {
		success: !1,
		get error() {
			return r || (r = new e(t.map((e) => Xt(e, n, _n()))), t = void 0, n = void 0), r;
		},
		set error(e) {
			r = e, t = void 0, n = void 0;
		}
	};
}
var On = /* @__PURE__*/ ((e) => async (t, n, r) => {
	let i = r ? {
		...r,
		async: !0
	} : { async: !0 }, a = t._zod.run({
		value: n,
		issues: []
	}, i);
	return a instanceof Promise && (a = await a), a.issues.length ? Dn(e, a.issues, i) : {
		success: !0,
		data: a.value
	};
})(Cn), kn = /^[\s\S]{0,}$/, An = /^-?\d+(?:\.\d+)?$/, jn = /^(?:true|false)$/i, Mn = /*@__PURE__*/ G("$ZodCheck", (e, t) => {
	var n;
	e._zod ??= {}, e._zod.def = t, (n = e._zod).onattach ?? (n.onattach = []);
}), Nn = (e) => {
	let t = e.value;
	return !Et(t) && t.length !== void 0;
}, Pn = /*@__PURE__*/ G("$ZodCheckMaxLength", (e, t) => {
	var n;
	Mn.init(e, t), (n = e._zod.def).when ?? (n.when = Nn), e._zod.check = (n) => {
		let r = n.value, i = r.length;
		if ((typeof r == "string" && i > t.maximum ? Qt(r) : i) <= t.maximum) return;
		let a = $t(r);
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
}), Fn = /*@__PURE__*/ G("$ZodCheckMinLength", (e, t) => {
	var n;
	Mn.init(e, t), (n = e._zod.def).when ?? (n.when = Nn), e._zod.check = (n) => {
		let r = n.value, i = r.length;
		if ((typeof r == "string" && i >= t.minimum && i < t.minimum * 2 ? Qt(r) : i) >= t.minimum) return;
		let a = $t(r);
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
}), In = /*@__PURE__*/ G("$ZodCheckStartsWith", (e, t) => {
	Mn.init(e, t);
	let n = RegExp(`^${zt(t.prefix)}.*`);
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
}), Ln = {
	major: 4,
	minor: 6,
	patch: 7
}, Rn = /*@__PURE__*/ G("$ZodType", (e, t) => {
	var n;
	e ??= {}, e._zod.def = t, e._zod.bag = e._zod.bag || {}, e._zod.version = Ln;
	let r = e._zod.def.checks, i = e._zod.traits.has("$ZodCheck") ? [e, ...r ?? []] : r?.length ? [...r] : [];
	for (let t of i) for (let n of t._zod.onattach) n(e);
	if (i.length === 0) (n = e._zod).deferred ?? (n.deferred = []), e._zod.deferred?.push(() => {
		e._zod.run = e._zod.parse;
	});
	else {
		let t = (t, n, r) => {
			if (t.memo) return t;
			let i = Gt(t), a;
			for (let o of n) {
				if (o._zod.def.when) {
					if (Kt(t) || !o._zod.def.when(t)) continue;
				} else if (i) continue;
				let n = t.issues.length, s = o._zod.check(t);
				if (s instanceof Promise && r?.async === !1) throw new hn();
				if (a || s instanceof Promise) a = (a ?? Promise.resolve()).then(async () => {
					await s, t.issues.length !== n && (Yt(t.issues, n, e), i ||= Gt(t, n));
				});
				else {
					if (t.issues.length === n) continue;
					Yt(t.issues, n, e), i ||= Gt(t, n);
				}
			}
			return a ? a.then(() => t) : t;
		}, n = (n, r, a) => {
			if (Gt(n)) return n.aborted = !0, n;
			let o = t(r, i, a);
			if (o instanceof Promise) {
				if (a.async === !1) throw new hn();
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
				if (a.async === !1) throw new hn();
				return o.then((e) => t(e, i, a));
			}
			return t(o, i, a);
		};
	}
}, {
	get "~standard"() {
		return nn(this, "~standard", Vn(this));
	},
	set "~standard"(e) {
		tn(this, "~standard", e);
	}
}), zn = (e, t) => e.issues.length ? { issues: e.issues.map((e) => Xt(e, t, _n())) } : { value: e.value };
async function Bn(e, t) {
	let n = { async: !0 };
	return zn(await e._zod.run({
		value: t,
		issues: []
	}, n), n);
}
function Vn(e) {
	return {
		validate: (t) => {
			let n = { async: !1 };
			try {
				let r = e._zod.run({
					value: t,
					issues: []
				}, n);
				if (!(r instanceof Promise)) return zn(r, n);
			} catch {}
			return Bn(e, t);
		},
		vendor: "zod",
		version: 1
	};
}
var Hn = /*@__PURE__*/ G("$ZodString", (e, t) => {
	Rn.init(e, t), e._zod.pattern = t.pattern ?? kn, e._zod.parse = (n, r) => {
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
}), Un = /*@__PURE__*/ G("$ZodNumber", (e, t) => {
	Rn.init(e, t), e._zod.pattern = An, e._zod.parse = (n, r) => {
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
}), Wn = /*@__PURE__*/ G("$ZodBoolean", (e, t) => {
	Rn.init(e, t), e._zod.pattern = jn, e._zod.parse = (n, r) => {
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
function Gn(e, t, n, r, i, a) {
	let o = n in r, s = a === "optional";
	if (o || !s || i !== "optional") {
		if (e.issues.length) {
			if (i !== void 0 && s && !o) return;
			t.issues.push(...qt(n, e.issues));
		}
		!o && i === void 0 ? e.issues.length || t.issues.push({
			code: "invalid_type",
			expected: "nonoptional",
			input: void 0,
			path: [n]
		}) : e.value === void 0 ? (o || i === "defaulted" && !s) && (t.value[n] = void 0) : t.value[n] = e.value;
	}
}
var Kn = [];
function qn(e) {
	let t = Object.keys(e.shape), n = Object.getOwnPropertySymbols(e.shape), r = n.length ? n : Kn, i = r.length ? [...t, ...r] : t;
	for (let t of i) if (!e.shape?.[t]?._zod?.traits?.has("$ZodType")) throw Error(`Invalid element at key "${String(t)}": expected a Zod schema`);
	let a = Ht(e.shape);
	return {
		...e,
		allKeys: i,
		symbolKeys: r,
		keySet: new Set(t),
		numKeys: t.length,
		optionalKeys: new Set(a)
	};
}
function Jn(e, t, n, r, i, a, o) {
	let s = [], c = i.keySet, l = i.catchall._zod, u = l.def.type, d = l.optin, f = l.optout, p = 0;
	for (let i in t) {
		if (o && n.issues.length !== p) {
			if (Gt(n, p)) break;
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
		a instanceof Promise ? e.push(a.then((e) => Gn(e, n, i, t, d, f))) : Gn(a, n, i, t, d, f);
	}
	return s.length && n.issues.push({
		code: "unrecognized_keys",
		keys: s,
		input: t,
		inst: a,
		continue: !0
	}), e.length ? Promise.all(e).then(() => n) : n;
}
var Yn = /*@__PURE__*/ G("$ZodObject", (e, t) => {
	Rn.init(e, t);
	let n = Object.getOwnPropertyDescriptor(t, "shape"), r = n?.get ? n.get.raw : t.shape ?? {};
	if (r) {
		let e = () => {
			let n = { ...r };
			return Object.defineProperty(t, "shape", { value: n }), e.raw = n, n;
		};
		e.raw = r, Object.defineProperty(t, "shape", { get: e });
	}
	let i = Tt(() => qn(t));
	ln(e, "propValues", (e) => {
		let t = e.def.shape, n = {};
		for (let e in t) {
			let r = t[e]._zod;
			if (r.values) {
				Object.prototype.hasOwnProperty.call(n, e) || Ot(n, e, /* @__PURE__ */ new Set());
				for (let t of r.values) n[e].add(t);
				r.optin !== void 0 && n[e].add(void 0);
			}
		}
		return n;
	});
	let a = Lt, o = t.catchall, s, c = gn.memoizer;
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
				if (Gt(t, f)) break;
				f = t.issues.length;
			}
			if (e === "__proto__") continue;
			let i = u[e], a = i._zod.optin, o = i._zod.optout, s = i._zod.run({
				value: r[e],
				issues: []
			}, n);
			s instanceof Promise ? l.push(s.then((n) => Gn(n, t, e, r, a, o))) : Gn(s, t, e, r, a, o);
		}
		return o ? Jn(l, r, t, n, i.value, e, d === !0) : l.length ? Promise.all(l).then(() => t) : t;
	};
});
function Xn(e, t, n, r) {
	for (let n of e) if (n.issues.length === 0) return t.value = n.value, t;
	let i = e.filter((e) => !Gt(e));
	return i.length === 1 ? (t.value = i[0].value, i[0]) : (t.issues.push({
		code: "invalid_union",
		input: t.value,
		inst: n,
		errors: e.map((e) => e.issues.map((e) => Xt(e, r, _n())))
	}), t);
}
var Zn = /*@__PURE__*/ G("$ZodUnion", (e, t) => {
	Rn.init(e, t), ln(e, "optin", (e) => e.def.options.some((e) => e._zod.optin === "defaulted") ? "defaulted" : e.def.options.some((e) => e._zod.optin !== void 0) ? "optional" : void 0), ln(e, "optout", (e) => e.def.options.some((e) => e._zod.optout === "optional") ? "optional" : void 0), ln(e, "values", (e) => {
		if (e.def.options.every((e) => e._zod.values)) return new Set(e.def.options.flatMap((e) => Array.from(e._zod.values)));
	}), ln(e, "pattern", (e) => {
		if (e.def.options.every((e) => e._zod.pattern)) {
			let t = e.def.options.map((e) => e._zod.pattern);
			return RegExp(`^(${t.map((e) => Dt(e.source)).join("|")})$`);
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
		return a ? Promise.all(o).then((t) => Xn(t, r, e, i)) : Xn(o, r, e, i);
	};
}), Qn = /*@__PURE__*/ G("$ZodLiteral", (e, t) => {
	Rn.init(e, t);
	let n = new Set(t.values);
	e._zod.values = n, ln(e, "pattern", (e) => {
		let t = e.def.values;
		return RegExp(t.length ? `^(${t.map((e) => typeof e == "string" ? zt(e) : e ? zt(e.toString()) : String(e)).join("|")})$` : "^[^\\s\\S]$");
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
function $n(e, t) {
	return e.value = t.issues.length ? void 0 : t.value, e;
}
var er = /*@__PURE__*/ G("$ZodOptional", (e, t) => {
	Rn.init(e, t), ln(e, "optin", (e) => e.def.innerType._zod.optin === "defaulted" ? "defaulted" : "optional"), e._zod.optout = "optional", ln(e, "values", (e) => {
		let t = e.def.innerType._zod.values;
		return t ? /* @__PURE__ */ new Set([...t, void 0]) : void 0;
	}), ln(e, "pattern", (e) => {
		let t = e.def.innerType._zod.pattern;
		return t ? RegExp(`^(${Dt(t.source)})?$`) : void 0;
	}), e._zod.parse = (e, n) => {
		if (e.value === void 0) {
			if (t.innerType._zod.optin !== "defaulted") return e;
			let r = t.innerType._zod.run({
				value: e.value,
				issues: []
			}, n);
			return r instanceof Promise ? r.then((t) => $n(e, t)) : $n(e, r);
		}
		return t.innerType._zod.run(e, n);
	};
}), tr = /*@__PURE__*/ G("$ZodNullable", (e, t) => {
	Rn.init(e, t), ln(e, "optin", (e) => e.def.innerType._zod.optin), ln(e, "optout", (e) => e.def.innerType._zod.optout), ln(e, "pattern", (e) => {
		let t = e.def.innerType._zod.pattern;
		return t ? RegExp(`^(${Dt(t.source)}|null)$`) : void 0;
	}), ln(e, "values", (e) => e.def.innerType._zod.values ? /* @__PURE__ */ new Set([...e.def.innerType._zod.values, null]) : void 0), e._zod.parse = (e, n) => e.value === null ? e : t.innerType._zod.run(e, n);
});
// ../vibebook-svelte/node_modules/zod/v4/core/api.js
function nr(e) {
	return e.checks &&= [...e.checks], e;
}
// @__NO_SIDE_EFFECTS__
function rr(e, t) {
	return new e(nr({
		type: "string",
		...Vt(t)
	}));
}
// @__NO_SIDE_EFFECTS__
function ir(e, t) {
	return new e(nr({
		type: "number",
		checks: [],
		...Vt(t)
	}));
}
// @__NO_SIDE_EFFECTS__
function ar(e, t) {
	return new e({
		type: "boolean",
		...Vt(t)
	});
}
// @__NO_SIDE_EFFECTS__
function or(e, t) {
	return new Pn({
		check: "max_length",
		...Vt(t),
		maximum: e
	});
}
// @__NO_SIDE_EFFECTS__
function sr(e, t) {
	return new Fn({
		check: "min_length",
		...Vt(t),
		minimum: e
	});
}
// @__NO_SIDE_EFFECTS__
function cr(e, t) {
	return new In({
		check: "string_format",
		format: "starts_with",
		...Vt(t),
		prefix: e
	});
}
// ../vibebook-svelte/node_modules/zod/v4/mini/schemas.js
var lr = /*@__PURE__*/ G("ZodMiniType", (e, t) => {
	if (!e._zod) throw Error("Uninitialized schema in ZodMiniType.");
	Rn.init(e, t), e.def = t, e.type = t.type;
}, {
	get with() {
		return this.check;
	},
	set with(e) {
		tn(this, "with", e);
	},
	parse(e, t) {
		return wn(this, e, t, { callee: this.parse });
	},
	parseAsync(e, t) {
		return Tn(this, e, t, { callee: this.parseAsync });
	},
	safeParse(e, t) {
		return En(this, e, t);
	},
	safeParseAsync(e, t) {
		return On(this, e, t);
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
		return Bt(this, e, t);
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
}), ur = /*@__PURE__*/ G("ZodMiniString", (e, t) => {
	Hn.init(e, t), lr.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function K(e) {
	return /* @__PURE__ */ rr(ur, e);
}
var dr = /*@__PURE__*/ G("ZodMiniNumber", (e, t) => {
	Un.init(e, t), lr.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function fr(e) {
	return /* @__PURE__ */ ir(dr, e);
}
var pr = /*@__PURE__*/ G("ZodMiniBoolean", (e, t) => {
	Wn.init(e, t), lr.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function mr(e) {
	return /* @__PURE__ */ ar(pr, e);
}
var hr = /*@__PURE__*/ G("ZodMiniObject", (e, t) => {
	Yn.init(e, t), lr.init(e, t), un(e, "shape", (e) => e._zod.def.shape, !1);
});
// @__NO_SIDE_EFFECTS__
function gr(e, t) {
	return new hr({
		type: "object",
		shape: e ?? {},
		...Vt(t)
	});
}
// @__NO_SIDE_EFFECTS__
function _r(e, t) {
	return Ut(e, t);
}
var vr = /*@__PURE__*/ G("ZodMiniUnion", (e, t) => {
	Zn.init(e, t), lr.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function yr(e, t) {
	return new vr({
		type: "union",
		options: e,
		...Vt(t)
	});
}
var br = /*@__PURE__*/ G("ZodMiniLiteral", (e, t) => {
	Qn.init(e, t), lr.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function xr(e, t) {
	return new br({
		type: "literal",
		values: Array.isArray(e) ? e : [e],
		...Vt(t)
	});
}
var Sr = /*@__PURE__*/ G("ZodMiniOptional", (e, t) => {
	er.init(e, t), lr.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function Cr(e) {
	return new Sr({
		type: "optional",
		innerType: e
	});
}
var wr = /*@__PURE__*/ G("ZodMiniNullable", (e, t) => {
	tr.init(e, t), lr.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function Tr(e) {
	return new wr({
		type: "nullable",
		innerType: e
	});
}
var Er = /* @__PURE__ */ yr([/* @__PURE__ */ gr({
	ok: /* @__PURE__ */ xr(!0),
	id: /* @__PURE__ */ fr(),
	thread: /* @__PURE__ */ K()
}), /* @__PURE__ */ gr({
	ok: /* @__PURE__ */ xr(!1),
	error: /* @__PURE__ */ K()
})]), Dr = /* @__PURE__ */ gr({
	ok: /* @__PURE__ */ mr(),
	name: /* @__PURE__ */ Cr(/* @__PURE__ */ K()),
	error: /* @__PURE__ */ Cr(/* @__PURE__ */ K()),
	every: /* @__PURE__ */ Cr(/* @__PURE__ */ Tr(/* @__PURE__ */ K())),
	cron: /* @__PURE__ */ Cr(/* @__PURE__ */ Tr(/* @__PURE__ */ K())),
	timezone: /* @__PURE__ */ Cr(/* @__PURE__ */ K()),
	next_at: /* @__PURE__ */ Cr(/* @__PURE__ */ K())
}), Or = /* @__PURE__ */ gr({
	id: /* @__PURE__ */ K(),
	name: /* @__PURE__ */ K(),
	type: /* @__PURE__ */ K(),
	size: /* @__PURE__ */ fr(),
	author: /* @__PURE__ */ K(),
	ts: /* @__PURE__ */ fr(),
	embed: /* @__PURE__ */ Cr(/* @__PURE__ */ mr())
}), kr = /* @__PURE__ */ _r(Or, { reminder: /* @__PURE__ */ Cr(Dr) }), Ar = /* @__PURE__ */ gr({ error: /* @__PURE__ */ K() });
(/* @__PURE__ */ K()).check(/* @__PURE__ */ cr("https://"), /* @__PURE__ */ or(1e3)), (/* @__PURE__ */ K()).check(/* @__PURE__ */ sr(1)), (/* @__PURE__ */ K()).check(/* @__PURE__ */ sr(1)), (/* @__PURE__ */ K()).check(/* @__PURE__ */ sr(1)), (/* @__PURE__ */ K()).check(/* @__PURE__ */ cr("m"));
// shared/room.ts
var jr = [
	"todo",
	"doing",
	"review",
	"done"
], Mr = (e) => typeof e == "object" && !!e && !Array.isArray(e), q = (e) => typeof e == "string", J = (e) => typeof e == "number" && Number.isFinite(e), Y = (e) => typeof e == "boolean", X = (e) => (t) => t === null || e(t), Z = (e) => (t) => Array.isArray(t) && t.every(e), Nr = (e) => (t) => Mr(t) && Object.values(t).every(e), Q = Z(q), Pr = (...e) => (t) => typeof t == "string" && e.includes(t), Fr = Pr(...jr), $ = (e, t = {}) => (n) => Mr(n) && Object.entries(e).every(([e, t]) => t(n[e])) && Object.entries(t).every(([e, t]) => n[e] === void 0 || t(n[e])), Ir = (e) => $({
	id: q,
	name: q,
	type: q,
	size: J,
	author: q,
	ts: J
}, { embed: Y })(e), Lr = $({
	id: q,
	title: q,
	done: Y,
	status: Fr
}, {
	owner: X(q),
	due: X(q),
	flags: Q,
	epic_id: q
}), Rr = (e) => Lr(e), zr = $({
	id: q,
	title: q,
	tasks: Z(Rr)
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
}), Br = (e) => zr(e), Vr = $({
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
	files: Z(Ir),
	quiet: Y,
	cut: Y,
	for_who: X(q)
}), Hr = (e) => Vr(e), Ur = $({
	msg_id: J,
	email: q,
	who: q,
	status: q,
	ts: J
}, {
	agent: q,
	note: X(q)
}), Wr = (e) => Ur(e), Gr = $({
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
}), Kr = (e) => Gr(e), qr = $({
	title: q,
	owner: q
}, {
	summary: X(q),
	folder: X(q)
}), Jr = (e) => qr(e), Yr = $({
	title: q,
	tasks: Q
}, { why: q }), Xr = (e) => Yr(e), Zr = $({
	id: J,
	text: q,
	who: q,
	kind: q,
	ts: J
}), Qr = (e) => Zr(e), $r = $({
	id: q,
	kind: q,
	ref: q
}, {
	title: q,
	author: q,
	ts: J
}), ei = (e) => $r(e), ti = $({
	id: q,
	question: q,
	options: Q,
	multi: Y,
	closed: Y,
	author: q,
	votes: Z(Q)
}), ni = (e) => ti(e), ri = $({
	email: q,
	ts: J
}, { name: X(q) }), ii = $({
	email: q,
	who: q,
	read: J,
	delivered: J
}, {
	agent: q,
	ts: J
}), ai = $({ text: q }, {
	epic: X(q),
	stale: (e) => e === !1,
	fetched: Y,
	by: q
}), oi = $({
	epic: q,
	stale: (e) => e === !0
}, { by: q }), si = {
	state: $({
		me: q,
		book: Jr,
		messages: Z(Hr),
		epics: Z(Br),
		members: Q,
		online: Q,
		suggestions: Z(Xr)
	}, {
		roomTasks: Z(Rr),
		names: Nr(q),
		avatars: Nr(J),
		pending: Q,
		requests: Z(ri),
		files: Z(Ir),
		filesN: J,
		filesAll: Y,
		reminders: Z(Kr),
		acks: Z(Wr),
		receipts: Z(ii),
		counts: Nr(J),
		countsAt: J,
		full: Q,
		complete: Y,
		origins: Z(Hr),
		docs: Nr(q),
		doc: q,
		docNotes: Q,
		decisions: Z(Qr),
		pins: Z(ei),
		polls: Nr(ni)
	}),
	msg: $({ m: Hr }),
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
	epics: $({ epics: Z(Br) }, { roomTasks: Z(Rr) }),
	epicsPatch: $({
		changed: Z(Br),
		order: Q
	}, { roomTasks: Z(Rr) }),
	doc: (e) => Mr(e) && (e.stale === !0 ? oi(e) && e.text === void 0 && e.fetched === void 0 : ai(e)),
	docNotes: $({ notes: Q }),
	meta: $({}, {
		title: q,
		folder: q,
		summary: q
	}),
	suggestions: $({ suggestions: Z(Xr) }),
	requests: $({ requests: Z(ri) }),
	members: $({ members: Q }, {
		pending: Q,
		requests: Z(ri),
		names: Nr(q),
		avatars: Nr(J)
	}),
	files: $({ files: Z(Ir) }),
	fileAdd: $({ file: Ir }),
	reminders: $({ reminders: Z(Kr) }),
	decisions: $({ decisions: Z(Qr) }),
	pins: $({ pins: Z(ei) }),
	receipts: $({ receipts: Z(ii) }),
	older: $({
		messages: Z(Hr),
		thread: q,
		more: Y
	}),
	acks: $({ acks: Z(Wr) }),
	ackRows: $({ acks: Z(Wr) }),
	poll: $({ poll: ni }),
	online: $({ online: Q }),
	conns: $({}),
	error: $({}, { error: q }),
	blocked: $({
		text: q,
		reason: q
	})
};
function ci(e) {
	return !Mr(e) || typeof e.t != "string" || !Object.hasOwn(si, e.t) ? !1 : si[e.t](e);
}
function li(e) {
	if (!Mr(e)) return e;
	let t = (e, t) => Mr(e) && (e[t] === 0 || e[t] === 1) ? {
		...e,
		[t]: e[t] === 1
	} : e, n = (e) => Array.isArray(e) ? e.map((e) => t(e, "done")) : e, r = (e) => Array.isArray(e) ? e.map((e) => Mr(e) ? {
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
function ui(e) {
	let t = li(JSON.parse(e));
	if (!ci(t)) throw TypeError("Invalid room event");
	return t;
}
var di = {
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
		kind: Pr("link", "file", "app"),
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
		status: Fr
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
function fi(e) {
	return !Mr(e) || typeof e.t != "string" || !Object.hasOwn(di, e.t) ? !1 : di[e.t](e);
}
// ../vibebook-svelte/node_modules/hono/dist/client/utils.js
var pi = (e, t) => (e = e.replace(/\/+$/, ""), e += "/", t = t.replace(/^\/+/, ""), e + t), mi = (e, t) => {
	for (let [n, r] of Object.entries(t)) {
		let t = RegExp("/:" + n + "(?:{[^/]+})?\\??(?=/|$)");
		e = e.replace(t, () => r ? `/${r}` : "");
	}
	return e;
}, hi = (e) => {
	let t = new URLSearchParams();
	for (let [n, r] of Object.entries(e)) if (r !== void 0) {
		if (Array.isArray(r)) for (let e of r) e !== void 0 && t.append(n, e);
		else t.set(n, r);
	}
	return t;
}, gi = (e, t) => {
	switch (t) {
		case "ws": return e.replace(/^http/, "ws");
		case "http": return e.replace(/^ws/, "http");
	}
}, _i = (e) => /^https?:\/\/[^\/]+?\/index(?=\?|$)/.test(e) ? e.replace(/\/index(?=\?|$)/, "/") : e.replace(/\/index(?=\?|$)/, "");
function vi(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function yi(e, t) {
	if (!vi(e) && !vi(t)) return t;
	let n = { ...e };
	for (let e in t) {
		let r = t[e];
		n[e] = vi(n[e]) && vi(r) ? yi(n[e], r) : r;
	}
	return n;
}
// ../vibebook-svelte/node_modules/hono/dist/utils/cookie.js
var bi = /^[\w!#$%&'*.^`|~+-]+$/, xi = (e, t, n = {}) => {
	if (!bi.test(e)) throw Error("Invalid cookie name");
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
}, Si = (e, t, n) => (t = encodeURIComponent(t), xi(e, t, n)), Ci = (e, t) => new Proxy(() => {}, {
	get(n, r) {
		if (typeof r == "string" && r !== "then") return Ci(e, [...t, r]);
	},
	apply(n, r, i) {
		return e({
			path: t,
			args: i
		});
	}
}), wi = (e, t) => {
	let n = t.toString();
	return n ? `${e}?${n}` : e;
}, Ti = class {
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
			for (let [n, r] of Object.entries(e.cookie)) r !== void 0 && t.push(Si(n, r));
			t.length > 0 && (r.Cookie = t.join("; "));
		}
		this.cType && (r["Content-Type"] = this.cType);
		let i = new Headers();
		for (let [e, t] of Object.entries(r)) t !== void 0 && i.set(e, t);
		let a = this.url;
		a = _i(a), a = mi(a, this.pathParams), this.queryParams && (a = wi(a, this.queryParams)), n = this.method.toUpperCase();
		let o = n !== "GET" && n !== "HEAD";
		return (t?.fetch || fetch)(a, {
			body: o ? this.rBody : void 0,
			method: n,
			headers: i,
			...t?.init
		});
	};
}, Ei = (e, t) => Ci(function n(r) {
	let i = t?.buildSearchParams ?? hi, a = [...r.path], o = a.slice(-3).reverse();
	if (o[0] === "toString") return o[1] === "name" ? o[2] || "" : n.toString();
	if (o[0] === "valueOf") return o[1] === "name" ? o[2] || "" : n;
	let s = "";
	if (/^\$/.test(o[0])) {
		let e = a.pop();
		e && (s = e.replace(/^\$/, ""));
	}
	let c = pi(e, a.join("/"));
	if (s === "url" || s === "path") {
		let t = _i(c);
		return r.args[0] && (r.args[0].param && (t = mi(t, r.args[0].param)), r.args[0].query && (t = wi(t, i(r.args[0].query)))), s === "url" ? new URL(t) : t.slice(e.replace(/\/+$/, "").length).replace(/^\/?/, "/");
	}
	if (s === "ws") {
		let e = _i(c), n = gi(r.args[0]?.param ? mi(e, r.args[0].param) : e, "ws"), a = new URL(n), o = r.args[0]?.query;
		return o && i(o).forEach((e, t) => {
			a.searchParams.append(t, e);
		}), ((...e) => t?.webSocket !== void 0 && typeof t.webSocket == "function" ? t.webSocket(...e) : new WebSocket(...e))(a.toString());
	}
	let l = new Ti(c, s, { buildSearchParams: i });
	if (s) {
		t ??= {};
		let e = { ...r.args[1] }, n = t.headers, i = e.headers;
		n && i && (e.headers = async () => ({
			...typeof n == "function" ? await n() : n,
			...typeof i == "function" ? await i() : i
		}));
		let a = yi(t, e);
		return l.fetch(r.args[0], a);
	}
	return l;
}, []), Di = (e = "/", t) => Ei(e, t ? { fetch: t } : {});
// svelte/transport.ts
function Oi(e, t) {
	if (!fi(t)) throw TypeError("Invalid room command");
	return !e || e.readyState !== 1 ? !1 : (e.send(JSON.stringify(t)), !0);
}
function ki(e) {
	if (typeof e != "string") throw TypeError("Room events must be JSON text");
	return ui(e);
}
async function Ai(e) {
	try {
		return await e.json();
	} catch (t) {
		throw e.ok ? t : Error(`HTTP ${e.status}`);
	}
}
function ji(e, t) {
	let n = Ar.safeParse(t);
	return Error(n.success ? n.data.error : `HTTP ${e.status}`);
}
function Mi(e, t = fetch) {
	let n = Di("/", t).api.books[":id"], r = encodeURIComponent(e);
	return {
		async postMessage(e) {
			let t = await n.post.$post({
				param: { id: r },
				json: e
			}), i = await Ai(t);
			if (t.ok || t.status === 400) {
				let e = Er.safeParse(i);
				if (e.success) return e.data;
				if (t.ok) throw TypeError("Invalid post response");
			}
			throw ji(t, i);
		},
		async uploadFile(e) {
			let t = await n.files.$post({
				param: { id: r },
				header: {
					"content-type": e.type,
					"x-filename": encodeURIComponent(e.name)
				}
			}, { init: { body: e.body } }), i = await Ai(t);
			if (!t.ok) throw ji(t, i);
			let a = kr.safeParse(i);
			if (!a.success) throw TypeError(Or.safeParse(i).success ? "Invalid reminder response" : "Invalid upload response");
			return a.data;
		}
	};
}
// svelte/Reminders.svelte
var Ni = a("<button class=\"primary\" id=\"remNew\"><!> </button>"), Pi = a("<form class=\"remForm\" id=\"remForm\"><input name=\"name\" maxlength=\"60\" required=\"\"/> <textarea name=\"text\" required=\"\"></textarea> <div class=\"row\"><span class=\"err\" id=\"remErr\"> </span><button type=\"button\" class=\"ghost\" id=\"remCancel\"> </button><button class=\"primary\" id=\"remSave\"> </button></div></form>"), Fi = a("<span class=\"err\"> </span>"), Ii = a("<pre class=\"remText\"> </pre>"), Li = a("<button class=\"ghost\"></button>"), Ri = a("<div><div class=\"remBody\" role=\"button\" tabindex=\"0\"><b><!> </b> <small><!> </small> <!><!></div> <!> <label class=\"sw\"><input type=\"checkbox\"/> </label> <button class=\"ghost\"></button></div>"), zi = a("<div class=\"empty\"> </div>"), Bi = a("<div class=\"remHead\"><p></p> <!></div> <!> <!> <!>", 1);
function Vi(e, n) {
	j(n, !0);
	let a = l(null), o = l(""), s = l(!1), c = l(C([])), f = p(() => n.room.reminders || []), m = p(() => n.vb.locale || (document.documentElement.lang === "en" ? "en-US" : "pt-BR")), h = (e) => new Date(e).toLocaleString(v(m), {
		weekday: "short",
		day: "numeric",
		month: "short",
		hour: "2-digit",
		minute: "2-digit"
	});
	function _(e) {
		T(a, e, !0), T(o, "");
	}
	function y(e) {
		T(c, v(c).includes(e.id) ? v(c).filter((t) => t !== e.id) : [...v(c), e.id], !0);
	}
	async function b(e) {
		if (e.preventDefault(), !v(a) || v(s)) return;
		let t = { ...v(a) }, r = t.name.trim().replace(/\.md$/i, "").replace(/[\\/]/g, "-");
		T(s, !0), T(o, "");
		try {
			let e = await Mi(n.room.id).uploadFile({
				name: `reminders/${r}.md`,
				type: "text/markdown",
				body: t.text
			});
			if (e.reminder && !e.reminder.ok) {
				T(o, `⚠ ${e.reminder.error || n.vb.t("falhou")}`), T(a, {
					...t,
					name: r,
					fixed: !0
				}, !0);
				return;
			}
			T(a, null);
		} catch (e) {
			T(o, e instanceof Error ? e.message : n.vb.t("sem conexão"), !0);
		} finally {
			T(s, !1);
		}
	}
	var x = Bi(), E = r(x), O = W(E);
	M(O, () => n.vb.t("Cada lembrete é um arquivo <code>reminders/&lt;nome&gt;.md</code>: o texto diz quando rodar e o que fazer. Na hora, o @vibe posta o texto aqui e o agent de quem salvou faz."), !0), t(O);
	var A = u(O, 2), N = (e) => {
		var r = Ni(), a = W(r);
		M(a, () => n.vb.icon("plus", 14));
		var o = u(a);
		t(r), d((e) => i(o, ` ${e ?? ""}`), [() => n.vb.t("Novo lembrete")]), z("click", r, () => _({
			name: "",
			text: ""
		})), S(e, r);
	};
	U(A, (e) => {
		v(a) || e(N);
	}), t(E);
	var P = u(E, 2), F = (e) => {
		var r = Pi(), c = W(r);
		he(c);
		var l = u(c, 2);
		k(l);
		var f = u(l, 2), p = W(f), m = w(p, !0), h = u(p), _ = w(h, !0), y = u(h), x = w(y, !0);
		t(f), t(r), d((e, t, n, r) => {
			V(c, "placeholder", e), c.readOnly = v(a).fixed, V(l, "placeholder", t), i(m, v(o)), i(_, n), y.disabled = v(s), i(x, r);
		}, [
			() => n.vb.t("nome, ex.: relatorio-diario"),
			() => n.vb.t("Diga quando e o quê. Ex.: Todo dia às 8h: puxe os números de ontem e poste aqui o que mudou."),
			() => n.vb.t("Cancelar"),
			() => n.vb.t("Salvar")
		]), g("submit", r, b), se(c, () => v(a).name, (e) => v(a).name = e), se(l, () => v(a).text, (e) => v(a).text = e), z("click", h, () => T(a, null)), S(e, r);
	};
	U(P, (e) => {
		v(a) && e(F);
	});
	var I = u(P, 2);
	H(I, 17, () => v(f), (e) => e.id, (e, r) => {
		var a = Ri();
		let o;
		var s = W(a), l = W(s), f = W(l);
		M(f, () => n.vb.icon(v(c).includes(v(r).id) ? "chevronDown" : "chevronRight", 13));
		var m = u(f);
		t(l);
		var g = u(l, 2), b = W(g), x = (e) => {
			var t = ce();
			d((e) => i(t, `${(v(r).every || v(r).cron || "") ?? ""}${e ?? ""} ·`), [() => v(r).enabled && v(r).next_at ? ` · ${n.vb.t("próximo {when}", { when: h(v(r).next_at) })}` : ""]), S(e, t);
		};
		U(b, (e) => {
			v(r).error || e(x);
		});
		var C = u(b, 1, !0);
		t(g);
		var T = u(g, 2), E = (e) => {
			var t = Fi(), n = w(t);
			d(() => i(n, `⚠ ${v(r).error ?? ""}`)), S(e, t);
		};
		U(T, (e) => {
			v(r).error && e(E);
		});
		var D = u(T), O = (e) => {
			var t = Ii(), n = w(t, !0);
			d(() => i(n, v(r).text)), S(e, t);
		}, k = p(() => v(c).includes(v(r).id));
		U(D, (e) => {
			v(k) && e(O);
		}), t(s);
		var A = u(s, 2), j = (e) => {
			var i = Li();
			M(i, () => n.vb.icon("pencil", 14), !0), t(i), d((e, t) => {
				V(i, "data-rem-edit", v(r).id), V(i, "title", e), V(i, "aria-label", t);
			}, [() => n.vb.t("Editar"), () => n.vb.t("Editar")]), z("click", i, () => _({
				name: v(r).name,
				text: v(r).text,
				fixed: !0
			})), S(e, i);
		};
		U(A, (e) => {
			v(r).name && e(j);
		});
		var N = u(A, 2), P = W(N);
		he(P);
		var F = u(P, 1, !0);
		t(N);
		var I = u(N, 2);
		M(I, () => n.vb.icon("x"), !0), t(I), t(a), d((e, t, n, c, l, u, d) => {
			o = B(a, 1, "rem", null, o, {
				bad: !!v(r).error,
				off: !v(r).enabled,
				open: e
			}), V(s, "data-rem-open", v(r).id), V(s, "title", t), i(m, ` ${(v(r).name ? `${v(r).name}.md` : v(r).text) ?? ""}`), i(C, n), V(N, "title", c), V(P, "data-rem-on", v(r).id), L(P, v(r).enabled), P.disabled = !!v(r).error, i(F, l), V(I, "data-rem-del", v(r).id), V(I, "title", u), V(I, "aria-label", d);
		}, [
			() => v(c).includes(v(r).id),
			() => n.vb.t(v(c).includes(v(r).id) ? "Esconder o texto" : "Ver o texto"),
			() => n.vb.t("de {who}", { who: n.vb.name(v(r).owner) }),
			() => n.vb.t("Ligado"),
			() => n.vb.t("ligado"),
			() => n.vb.t("Apagar lembrete"),
			() => n.vb.t("Apagar lembrete")
		]), z("click", s, (e) => {
			e.target.closest(".remText") || y(v(r));
		}), z("keydown", s, (e) => {
			e.key === "Enter" && y(v(r));
		}), z("change", P, (e) => n.send({
			t: "reminder.enable",
			id: v(r).id,
			on: e.currentTarget.checked
		})), z("click", I, () => {
			confirm(n.vb.t("Apagar este lembrete?")) && n.send({
				t: "reminder.delete",
				id: v(r).id
			});
		}), S(e, a);
	});
	var ee = u(I, 2), te = (e) => {
		var t = zi(), r = w(t, !0);
		d((e) => i(r, e), [() => n.vb.t("Nenhum lembrete ainda. Clique em Novo lembrete, ou peça pro seu agent: “todo dia às 8h, me manda o resumo do que mudou”.")]), S(e, t);
	};
	U(ee, (e) => {
		!v(f).length && !v(a) && e(te);
	}), S(e, x), D();
}
n([
	"click",
	"keydown",
	"change"
]);
// svelte/Sidebar.svelte
var Hi = a("<span class=\"claudeSpin\">✻</span>"), Ui = a("<button type=\"button\"><!><span class=\"rt\"> </span> <!> <!><!> <span class=\"n\"> </span></button>"), Wi = a("<div class=\"fnCol\"><span class=\"fnRow\"><span class=\"fn\"> </span><span class=\"pendTag\"> </span></span> <small class=\"memActs\"><button type=\"button\" class=\"ghost resend\"> </button> · <button type=\"button\" class=\"ghost resend\"> </button></small></div>"), Gi = a("<span class=\"fn\"> </span>"), Ki = a("<div class=\"fnCol\"><span class=\"fn\"> </span><small class=\"memActs\"> </small></div>"), qi = a("<button type=\"button\" class=\"ghost x\"></button>"), Ji = a("<div class=\"member\"><!> <!> <!></div> <!>", 1), Yi = a("<button type=\"button\" class=\"iconBtn phOnly\" id=\"sideArch\"></button> <button type=\"button\" class=\"iconBtn phOnly\" id=\"sideDel\"></button>", 1), Xi = a("<span class=\"rowEdit phOnly\" role=\"button\" tabindex=\"0\" id=\"sideRename\"><!> </span>"), Zi = a("<div class=\"epTabs\" role=\"tablist\"><button type=\"button\" role=\"tab\" data-arch=\"\"> <b> </b></button> <button type=\"button\" role=\"tab\" data-arch=\"1\"> <b> </b></button></div>"), Qi = a("<button type=\"button\"><span class=\"ri\"> </span><span class=\"rt\"> </span><span class=\"n\"> </span></button>"), $i = a("<form id=\"newEpic\" class=\"newRoom\"><input enterkeyhint=\"done\"/><button class=\"ri\"></button></form> <!>", 1), ea = a("<div class=\"member reqRow\"><!> <div class=\"fnCol\"><span class=\"fn\"> </span><small class=\"memActs\"> <button type=\"button\" class=\"ghost resend okAsk\" data-ok=\"1\"> </button></small></div> <button type=\"button\" class=\"ghost x\" data-ok=\"\"></button></div>"), ta = a("<div class=\"asks\"><h4> </h4> <!></div>"), na = a("<details class=\"memMore\" data-fold=\"off\"><summary> </summary><!></details>"), ra = a("<button type=\"button\" class=\"friendAdd\"><!><span class=\"fn\"> </span><b></b></button>"), ia = a("<details class=\"memMore\" data-fold=\"friends\"><summary> </summary> <!></details>"), aa = a("<option></option>"), oa = a("<button type=\"button\" class=\"sheetGrab\"><i></i></button> <!> <div class=\"sideHead\"><div class=\"sideTop\"><a data-nav=\"\" href=\"/app\" class=\"muted\"><!> vibebooks</a> <!> <button type=\"button\" class=\"iconBtn\" id=\"railToggle\" aria-expanded=\"true\"></button></div></div> <div class=\"sec threadsSec\"><button type=\"button\" data-thread=\"main\"><!><span class=\"rt\"> </span> <!> <!><span class=\"n\"> </span></button> <!> <div><!> <!></div></div> <!> <div class=\"sec\"><!> <h4> </h4> <!> <!> <!> <!> <form class=\"row\" id=\"invite\" style=\"margin-top:8px\"><input type=\"email\" required=\"\" list=\"friendList\" autocomplete=\"off\"/><button></button></form> <datalist id=\"friendList\"></datalist></div>", 1);
function sa(e, n) {
	j(n, !0);
	let a = (e, r = ne) => {
		let a = p(() => r().tasks.filter((e) => e.done).length), o = p(() => n.vb.epicBusy(r()));
		var s = Ui();
		let c;
		var l = W(s);
		M(l, () => n.vb.epicIco(r(), !0));
		var f = u(l), m = w(f, !0), h = u(f, 2), g = (e) => {
			var t = Hi();
			d((e) => V(t, "aria-label", e), [() => n.vb.t("{who} está trabalhando", { who: v(o) })]), S(e, t);
		};
		U(h, (e) => {
			v(o) && e(g);
		});
		var _ = u(h, 2);
		M(_, () => n.vb.waitPill(r().id));
		var y = u(_);
		M(y, () => n.vb.prodMark(r()));
		var b = u(y, 2), x = w(b, !0);
		t(s), d((e, t) => {
			c = B(s, 1, "thread", null, c, {
				sel: n.thread === r().id,
				archived: !!r().archived,
				busy: !!v(o),
				waiting: e
			}), V(s, "data-thread", r().id), V(s, "title", t), i(m, r().title), i(x, r().tasks.length ? `${v(a)}/${r().tasks.length}` : "");
		}, [() => n.vb.waitsIn(r().id).length > 0, () => `${r().title} · ${v(a)}/${r().tasks.length} tasks${r().archived ? ` · ${n.vb.t("arquivado")}` : ""}${v(o) ? ` · ${n.vb.t("{who} está trabalhando aqui", { who: v(o) })}` : ""}`]), S(e, s);
	}, o = (e, a = ne) => {
		var o = Ji(), s = r(o), c = W(s);
		M(c, () => n.vb.avatar(a(), n.room.online.includes(a())));
		var l = u(c, 2), f = (e) => {
			var r = Wi(), o = W(r), s = W(o), c = w(s, !0), l = u(s), f = w(l, !0);
			t(o);
			var p = u(o, 2), m = W(p), h = w(m, !0), g = u(m, 2), _ = w(g, !0);
			t(p), t(r), d((e, t, n, r, o, u, d) => {
				V(s, "title", a()), i(c, e), V(l, "title", t), i(f, n), V(m, "data-copyinv", a()), V(m, "title", r), i(h, o), V(g, "data-resend", a()), V(g, "title", u), i(_, d);
			}, [
				() => n.room.names?.[a()] || a().split("@")[0],
				() => n.vb.t("Convidada(o), ainda não entrou"),
				() => n.vb.t("pendente"),
				() => n.vb.t("Copiar a mensagem de convite (link da sala + setup do agent) para mandar no WhatsApp"),
				() => n.vb.t("copiar"),
				() => n.vb.t("Convidada(o), ainda não entrou"),
				() => n.vb.t("reenviar")
			]), S(e, r);
		}, m = p(() => n.room.pending?.includes(a())), h = (e) => {
			var t = Gi(), r = w(t, !0);
			d(() => {
				V(t, "title", a()), i(r, n.room.names[a()]);
			}), S(e, t);
		}, g = (e) => {
			var n = Ki(), r = W(n), o = w(r, !0), s = u(r), c = w(s);
			t(n), d((e, t) => {
				V(r, "title", a()), i(o, e), i(c, `@${t ?? ""}`);
			}, [() => a().split("@")[0], () => a().split("@")[1] ?? ""]), S(e, n);
		};
		U(l, (e) => {
			v(m) ? e(f) : n.room.names?.[a()] ? e(h, 1) : e(g, -1);
		});
		var _ = u(l, 2), y = (e) => {
			var r = qi();
			M(r, () => n.vb.icon("x"), !0), t(r), d((e, t) => {
				V(r, "data-remove", a()), V(r, "aria-label", e), V(r, "title", t);
			}, [() => n.vb.t("Remover {email}", { email: a() }), () => n.room.pending?.includes(a()) ? n.vb.t("Cancelar convite") : n.vb.t("Remover do vibebook")]), S(e, r);
		}, b = p(() => a() !== n.room.book?.owner && (n.room.pending?.includes(a()) || n.room.me === n.room.book?.owner));
		U(_, (e) => {
			v(b) && e(y);
		}), t(s);
		var x = u(s, 2);
		M(x, () => n.vb.agentRows(a())), S(e, o);
	}, s = f(n, "archOpen", 3, !1), c = f(n, "foldOpen", 19, () => ({
		off: !1,
		friends: null
	})), l = f(n, "friends", 19, () => []), m = (e) => n.room.counts ? (n.room.counts[e] ?? 0) + n.room.messages.filter((t) => t.thread === e && t.id > (n.room.countsAt ?? 0)).length : n.room.messages.filter((t) => t.thread === e).length, h = (e) => n.room.messages.reduce((t, n) => n.thread === e.id && n.id > t ? n.id : t, 0), g = p(() => n.room.epics.find((e) => e.id === n.thread)), _ = p(() => n.room.epics.filter((e) => !e.archived)), y = p(() => n.room.epics.filter((e) => e.archived).map((e, t) => ({
		epic: e,
		last: h(e),
		i: t
	})).sort((e, t) => t.last - e.last || t.i - e.i).map(({ epic: e }) => e)), x = p(() => s() && v(y).length > 0), C = p(() => n.room.members.filter((e) => e === n.room.me || n.room.online.includes(e))), T = p(() => n.room.members.filter((e) => !v(C).includes(e))), E = p(() => l().filter((e) => !n.room.members.includes(e)));
	var O = oa(), k = r(O), A = u(k, 2);
	M(A, () => n.vb.roomStrip());
	var N = u(A, 2), P = W(N), F = W(P), I = W(F);
	M(I, () => n.vb.icon("back")), b(), t(F);
	var L = u(F, 2), ee = (e) => {
		var i = Yi(), a = r(i);
		M(a, () => n.vb.icon(v(g).archived ? "undo" : "check", 18), !0), t(a);
		var o = u(a, 2);
		M(o, () => n.vb.icon("trash", 18), !0), t(o), d((e, t, n, r) => {
			V(a, "title", e), V(a, "aria-label", t), V(o, "title", n), V(o, "aria-label", r);
		}, [
			() => v(g).archived ? n.vb.t("Desarquivar épico") : n.vb.t("Arquivar épico (concluído)"),
			() => v(g).archived ? n.vb.t("Desarquivar épico") : n.vb.t("Arquivar épico"),
			() => n.vb.t("Apagar épico"),
			() => n.vb.t("Apagar épico")
		]), S(e, i);
	};
	U(L, (e) => {
		v(g) && e(ee);
	});
	var te = u(L, 2);
	M(te, () => n.vb.icon("sidebar", 20), !0), t(te), t(P), t(N);
	var R = u(N, 2), re = W(R);
	let ie;
	var ae = W(re);
	M(ae, () => n.vb.roomMark("ri roomIco"));
	var oe = u(ae), se = w(oe, !0), z = u(oe, 2), ce = (e) => {
		var r = Xi(), a = W(r);
		M(a, () => n.vb.icon("pencil", 13));
		var o = u(a);
		t(r), d((e, t) => {
			V(r, "title", e), i(o, ` ${t ?? ""}`);
		}, [() => n.vb.t("Renomear"), () => n.vb.t("editar")]), S(e, r);
	}, le = p(() => !n.thread.startsWith("pre:"));
	U(z, (e) => {
		v(le) && e(ce);
	});
	var ue = u(z, 2);
	M(ue, () => n.vb.waitPill("main"));
	var de = u(ue), fe = w(de, !0);
	t(re);
	var pe = u(re, 2), me = (e) => {
		var r = Zi(), a = W(r);
		let o;
		var s = W(a), c = u(s), l = w(c, !0);
		t(a);
		var f = u(a, 2);
		let p;
		var m = W(f), h = u(m), g = w(h, !0);
		t(f), t(r), d((e, t) => {
			V(a, "aria-selected", !v(x)), o = B(a, 1, "", null, o, { on: !v(x) }), i(s, `${e ?? ""} `), i(l, v(_).length), V(f, "aria-selected", v(x)), p = B(f, 1, "", null, p, { on: v(x) }), i(m, `${t ?? ""} `), i(g, v(y).length);
		}, [() => n.vb.t("Épicos"), () => n.vb.t("Arquivados")]), S(e, r);
	};
	U(pe, (e) => {
		v(y).length && e(me);
	});
	var he = u(pe, 2);
	let ge;
	var _e = W(he);
	H(_e, 17, () => v(x) ? v(y) : v(_), (e) => e.id, (e, t) => {
		a(e, () => v(t));
	});
	var ve = u(_e, 2), ye = (e) => {
		var a = $i(), o = r(a), s = W(o), c = u(s);
		M(c, () => n.vb.icon("plus"), !0), t(c), t(o);
		var l = u(o, 2);
		H(l, 17, () => n.room.suggestions, we, (e, r, a) => {
			var o = Qi();
			let s;
			V(o, "data-thread", `pre:${a}`);
			var c = W(o), l = w(c, !0), f = u(c), p = w(f, !0), m = u(f), h = w(m, !0);
			t(o), d((e, t) => {
				s = B(o, 1, "thread pre", null, s, { sel: n.thread === `pre:${a}` }), V(o, "title", e), i(l, t), i(p, v(r).title), i(h, v(r).tasks.length || "");
			}, [() => `${v(r).title} · ${n.vb.t("sugestão do @vibe, clique para ver")}`, () => n.vb.initials(v(r).title)]), S(e, o);
		}), d((e, t, n) => {
			V(s, "placeholder", e), V(s, "aria-label", t), V(c, "aria-label", n);
		}, [
			() => n.vb.t("Novo épico: escreva o título…"),
			() => n.vb.t("Novo épico"),
			() => n.vb.t("Criar épico")
		]), S(e, a);
	};
	U(ve, (e) => {
		v(x) || e(ye);
	}), t(he), t(R);
	var be = u(R, 2);
	M(be, () => n.vb.pinsSec());
	var xe = u(be, 2), Se = W(xe), Ce = (e) => {
		var r = ta(), a = W(r), o = w(a, !0), s = u(a, 2);
		H(s, 17, () => n.room.requests, (e) => e.email, (e, r) => {
			var a = ea(), o = W(a);
			M(o, () => n.vb.avatar(v(r).email));
			var s = u(o, 2), c = W(s), l = w(c, !0), f = u(c), p = W(f), m = u(p), h = w(m, !0);
			t(f), t(s);
			var g = u(s, 2);
			M(g, () => n.vb.icon("x"), !0), t(g), t(a), d((e, t, n, a, o, s, u) => {
				V(c, "title", e), i(l, t), i(p, `${n ?? ""} · `), V(m, "data-ask", v(r).email), V(m, "title", a), i(h, o), V(g, "data-ask", v(r).email), V(g, "aria-label", s), V(g, "title", u);
			}, [
				() => `${v(r).email} · ${n.vb.t("pediu {ago}", { ago: n.vb.ago(v(r).ts) })}`,
				() => v(r).name || v(r).email.split("@")[0],
				() => n.vb.t("pediu {ago}", { ago: n.vb.ago(v(r).ts) }),
				() => n.vb.t("Liberar: entra na sala e recebe o link por email"),
				() => n.vb.t("liberar"),
				() => n.vb.t("Recusar {email}", { email: v(r).email }),
				() => n.vb.t("Recusar")
			]), S(e, a);
		}), t(r), d((e) => i(o, e), [() => n.vb.t("Pedindo pra entrar")]), S(e, r);
	};
	U(Se, (e) => {
		n.room.requests?.length && e(Ce);
	});
	var Te = u(Se, 2), Ee = w(Te, !0), De = u(Te, 2);
	M(De, () => n.vb.sbxRows());
	var Oe = u(De, 2);
	H(Oe, 16, () => v(C), (e) => e, (e, t) => {
		o(e, () => t);
	});
	var ke = u(Oe, 2), Ae = (e) => {
		var r = na(), a = W(r), s = w(a, !0), l = u(a);
		H(l, 16, () => v(T), (e) => e, (e, t) => {
			o(e, () => t);
		}), t(r), d((e) => {
			r.open = c().off, i(s, e);
		}, [() => n.vb.t("{n} offline", { n: v(T).length })]), S(e, r);
	};
	U(ke, (e) => {
		v(T).length && e(Ae);
	});
	var je = u(ke, 2), Me = (e) => {
		var r = ia(), a = W(r), o = w(a), s = u(a, 2);
		H(s, 16, () => v(E), (e) => e, (e, r) => {
			var a = ra(), o = W(a);
			M(o, () => n.vb.avatar(r));
			var s = u(o), c = w(s, !0), l = u(s);
			M(l, () => n.vb.icon("plus"), !0), t(l), t(a), d((e, t) => {
				V(a, "data-add", r), V(a, "title", e), i(c, t);
			}, [() => n.vb.t("Adicionar {email}", { email: r }), () => n.vb.name(r)]), S(e, a);
		}), t(r), d((e) => {
			r.open = c().friends ?? n.room.members.length <= 1, i(o, `${e ?? ""} · ${v(E).length ?? ""}`);
		}, [() => n.vb.t("Seus amigos")]), S(e, r);
	};
	U(je, (e) => {
		v(E).length && e(Me);
	});
	var Ne = u(je, 2), Pe = W(Ne), Fe = u(Pe);
	M(Fe, () => n.vb.icon("plus"), !0), t(Fe), t(Ne);
	var Ie = u(Ne, 2);
	H(Ie, 21, () => v(E), we, (e, t) => {
		var n = aa(), r = {};
		d(() => {
			r !== (r = v(t)) && (n.value = (n.__value = r) ?? "");
		}), S(e, n);
	}), t(Ie), t(xe), d((e, t, r, a, o, s, c, l, u, d) => {
		V(k, "aria-label", e), V(te, "title", t), V(te, "aria-label", r), ie = B(re, 1, "thread", null, ie, {
			sel: n.thread === "main",
			waiting: a
		}), V(re, "title", o), i(se, s), i(fe, c), ge = B(he, 1, "epList", null, ge, { arch: v(x) }), i(Ee, l), V(Pe, "placeholder", u), V(Fe, "aria-label", d);
	}, [
		() => n.vb.t("Fechar"),
		() => n.vb.t("Recolher menu"),
		() => n.vb.t("Recolher menu"),
		() => n.vb.waitsIn("main").length > 0,
		() => `${n.vb.bookTitle()}${n.room.book?.summary ? ` · ${n.room.book.summary}` : ""}`,
		() => n.vb.bookTitle(),
		() => m("main"),
		() => n.vb.t("Pessoas e agents"),
		() => n.vb.t("convidar por email"),
		() => n.vb.t("convidar por email")
	]), S(e, O), D();
}
// svelte/Message.svelte
var ca = a("<span class=\"gut\"> </span>"), la = a(" <span class=\"agentTag\">agent</span>", 1), ua = a("<span class=\"doneTag\"> </span>"), da = a("<div><!> <!> <span class=\"mact\"><button type=\"button\" class=\"rbtn\"><!> </button> <button type=\"button\" class=\"rbtn\"><!> </button> <button type=\"button\" class=\"rbtn\"><!> </button></span> <div class=\"body\"><!> <div class=\"who\"><!> <!> <span class=\"hhmm\"> </span></div> <div class=\"txt\"></div> <!> <!> <!> <!> <!></div></div>");
function fa(e, n) {
	j(n, !0);
	let a = f(n, "origin", 3, !1), s = p(() => n.vb.continues(n.previous, n.message)), c = p(() => n.message.tag === "reminder" ? n.vb.remHtml(n.message, a()) : n.message.tag === "issue" ? n.vb.issueHtml(n.message) : n.vb.isNotice(n.message) ? n.vb.noticeHtml(n.message) : null), l = p(() => a() && v(c) ? v(c).replace(/\sid="m\d+"/, "") : v(c)), m = p(() => !n.message.text && n.typing ? `<span class="typing">${n.vb.esc(n.vb.typingNote?.(n.message.id) || n.vb.t("pensando ({mode})", { mode: n.vb.typingLabel?.(n.typing) ?? n.typing }))}…</span>` : n.message.author === "ai" ? n.message.text ? n.vb.mentions(n.vb.md(n.message.text)) : n.message.poll ? "" : `<span class="typing">${n.vb.t("pensando…")}</span>` : n.message.text ? n.vb.mentions(n.message.kind === "agent" ? n.vb.md(n.message.text) : n.vb.linkify(n.vb.esc(n.message.text))) : ""), h = p(() => n.vb.dateTime?.(n.message.ts) ?? new Date(n.message.ts).toLocaleString());
	var g = o(), _ = r(g), y = (e) => {
		var t = o(), n = r(t);
		M(n, () => v(l)), S(e, t);
	}, b = (e) => {
		var c = da();
		let l;
		var f = W(c);
		M(f, () => n.message.kind === "agent" ? n.vb.agentAvatar(n.message.author, n.message.via) : n.vb.avatar(n.message.author));
		var p = u(f, 2), g = (e) => {
			var t = ca(), r = w(t, !0);
			d((e) => {
				V(t, "title", v(h)), i(r, e);
			}, [() => n.vb.hhmm(n.message.ts)]), S(e, t);
		};
		U(p, (e) => {
			v(s) && e(g);
		});
		var _ = u(p, 2), y = W(_), b = W(y);
		M(b, () => n.vb.icon("copy", 14));
		var x = u(b);
		t(y);
		var C = u(y, 2), T = W(C);
		M(T, () => n.vb.icon("link", 14));
		var E = u(T);
		t(C);
		var D = u(C, 2), O = W(D);
		M(O, () => n.vb.icon("reply", 14));
		var k = u(O);
		t(D), t(_);
		var A = u(_, 2), j = W(A), N = (e) => {
			var t = o(), i = r(t);
			M(i, () => n.vb.quoteHtml(n.message.reply_to)), S(e, t);
		};
		U(j, (e) => {
			n.message.reply_to && e(N);
		});
		var P = u(j, 2), F = W(P), I = (e) => {
			var t = la(), a = r(t), o = u(a);
			d((e, t) => {
				i(a, `${e ?? ""} `), V(o, "title", t);
			}, [() => n.vb.t("{via} de {who}", {
				via: n.message.via || "agent",
				who: n.vb.name(n.message.author)
			}), () => n.vb.t("Escrito pelo agent dessa pessoa, em nome dela")]), S(e, t);
		}, L = (e) => {
			var t = ce();
			d((e) => i(t, e), [() => n.vb.name(n.message.author)]), S(e, t);
		};
		U(F, (e) => {
			n.message.kind === "agent" ? e(I) : e(L, -1);
		});
		var ee = u(F, 2), te = (e) => {
			var t = ua(), r = w(t);
			d((e, n) => {
				V(t, "title", e), i(r, `✓ ${n ?? ""}`);
			}, [() => n.vb.t("Reporta algo entregue"), () => n.vb.t("entregue")]), S(e, t);
		};
		U(ee, (e) => {
			n.message.tag === "done" && e(te);
		});
		var ne = u(ee), R = u(ne), re = w(R, !0);
		t(P);
		var ie = u(P, 2);
		M(ie, () => v(m), !0), t(ie);
		var ae = u(ie, 2);
		M(ae, () => n.vb.attHtml(n.message.files));
		var oe = u(ae, 2), se = (e) => {
			var t = o(), i = r(t);
			M(i, () => n.vb.cardHtml(n.message)), S(e, t);
		};
		U(oe, (e) => {
			n.message.card && e(se);
		});
		var z = u(oe, 2), le = (e) => {
			var t = o(), i = r(t);
			M(i, () => n.vb.choiceHtml(n.message)), S(e, t);
		};
		U(z, (e) => {
			n.message.choices && e(le);
		});
		var ue = u(z, 2), de = (e) => {
			var t = o(), i = r(t);
			M(i, () => n.vb.pollHtml(n.message.poll)), S(e, t);
		};
		U(ue, (e) => {
			n.message.poll && e(de);
		});
		var fe = u(ue, 2), pe = (e) => {
			var t = o(), i = r(t);
			M(i, () => n.vb.threadCards(n.message.id)), S(e, t);
		};
		U(fe, (e) => {
			a() || e(pe);
		}), t(A), t(c), d((e, t, r, o, u, d, f, p, g, _, b, S) => {
			l = B(c, 1, "msg", null, l, {
				ai: n.message.author === "ai",
				agent: n.message.author !== "ai" && n.message.kind === "agent",
				done: n.message.tag === "done",
				cont: v(s),
				waitMsg: e
			}), V(c, "id", a() ? void 0 : `m${n.message.id}`), V(y, "data-copymsg", n.message.id), V(y, "title", t), V(y, "aria-label", r), i(x, ` ${o ?? ""}`), V(C, "data-copylink", n.message.id), V(C, "title", u), V(C, "aria-label", d), i(E, ` ${f ?? ""}`), V(D, "data-reply", n.message.id), V(D, "title", p), V(D, "aria-label", g), i(k, ` ${_ ?? ""}`), i(ne, ` · ${b ?? ""}`), V(R, "title", v(h)), i(re, S), V(ie, "hidden", !v(m));
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
		]), S(e, c);
	};
	U(_, (e) => {
		v(l) === null ? e(b, -1) : e(y);
	}), S(e, g), D();
}
// svelte/Chat.svelte
var pa = a("<div class=\"older\"><button type=\"button\" class=\"ghost\" id=\"olderBtn\"> </button></div>"), ma = a("<div class=\"origin\"><!> <div class=\"replies\"><span> </span><button type=\"button\" class=\"ghost\"> <!></button></div></div>"), ha = a("<div><!></div>"), ga = a("<!> <!> <!>", 1);
function _a(e, n) {
	j(n, !0);
	let a = f(n, "more", 3, !1), s = f(n, "origin", 3, null), c = f(n, "replyCount", 3, 0);
	var l = o(), m = r(l);
	F(m, () => n.room.id + ":" + n.thread, (e) => {
		var l = ga(), f = r(l), m = (e) => {
			var r = pa(), a = W(r), o = w(a, !0);
			t(r), d((e) => i(o, e), [() => n.vb.t("Carregar mensagens anteriores")]), z("click", a, function(...e) {
				n.onloadolder?.apply(this, e);
			}), S(e, r);
		};
		U(f, (e) => {
			n.list.length && a() && e(m);
		});
		var h = u(f, 2), g = (e) => {
			var r = ma(), a = W(r);
			fa(a, {
				get message() {
					return s();
				},
				origin: !0,
				get typing() {
					return n.room.typing[s().id];
				},
				get vb() {
					return n.vb;
				}
			});
			var o = u(a, 2), l = W(o), f = w(l, !0), p = u(l), m = W(p), h = u(m);
			M(h, () => n.vb.icon("reply", 13)), t(p), t(o), t(r), d((e, t) => {
				i(f, e), V(p, "data-gomain", s().id), i(m, `${t ?? ""} `);
			}, [() => c() === 1 ? n.vb.t("1 resposta") : n.vb.t("{n} respostas", { n: c() }), () => n.vb.t("ver na sala principal")]), S(e, r);
		};
		U(h, (e) => {
			s() && e(g);
		});
		var _ = u(h, 2), y = (e) => {
			var t = o(), i = r(t);
			H(i, 19, () => n.list, (e) => e.id, (e, t, r) => {
				{
					let i = p(() => v(r) ? n.list[v(r) - 1] : n.previous);
					fa(e, {
						get message() {
							return v(t);
						},
						get previous() {
							return v(i);
						},
						get typing() {
							return n.room.typing[v(t).id];
						},
						get vb() {
							return n.vb;
						}
					});
				}
			}), S(e, t);
		}, b = (e) => {
			var a = ha();
			let c;
			var l = W(a), u = (e) => {
				var t = o(), i = r(t);
				M(i, () => n.vb.t("Comece a conversa. Os agents ligados nesta sala leem e respondem; o seu age com o seu OK. Ex.: <i>organiza o projeto em épicos: site novo, aluguéis e domínio</i>.")), S(e, t);
			}, f = (e) => {
				var t = ce();
				d((e) => i(t, e), [() => n.vb.t("Discussão deste épico. Os agents leem as tarefas, o doc e a sala principal.")]), S(e, t);
			};
			U(l, (e) => {
				n.thread === "main" ? e(u) : e(f, -1);
			}), t(a), d(() => c = B(a, 1, "empty", null, c, { afterOrigin: !!s() })), S(e, a);
		};
		U(_, (e) => {
			n.list.length ? e(y) : e(b, -1);
		}), S(e, l);
	}), S(e, l), D();
}
n(["click"]);
// svelte/roomStore.ts
function va(e, t, n) {
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
function ya() {
	let t = R(null);
	return {
		subscribe: t.subscribe,
		get: () => e(t),
		replace: t.set,
		apply(n, r) {
			return t.update((e) => va(e, n, r)), e(t);
		}
	};
}
// svelte/main.ts
var ba = /* @__PURE__ */ Ee({
	createRoomStore: () => ya,
	dismissDialogs: () => re,
	mountInbox: () => Ca,
	mountView: () => Sa
}), xa = {
	tasks: Ke,
	board: pt,
	files: St,
	reminders: Vi,
	sidebar: sa,
	chat: _a
};
function Sa(e, t, n) {
	let r = R(n), i = xa[e], a = ge(() => x(De, {
		target: t,
		props: {
			component: i,
			values: r
		}
	}));
	return {
		update(e) {
			ge(() => r.set(e));
		},
		destroy() {
			ge(() => {
				Ce(a);
			});
		}
	};
}
function Ca(e, t) {
	let { waits: n, ...r } = t, i = R(n), a = ge(() => x(Pe, {
		target: e,
		props: {
			props: r,
			waits: i
		}
	}));
	return Object.assign(() => ge(() => {
		Ce(a);
	}), { updateWaits(e) {
		ge(() => i.set(e));
	} });
}
export { Mi as a, Oe as c, ya as i, Ca as n, ki as o, Sa as r, Oi as s, ba as t };
