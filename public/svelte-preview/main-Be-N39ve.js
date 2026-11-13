import { $ as e, $t as t, At as n, Bt as r, Ct as i, Dt as a, Et as o, Ft as s, Gt as c, Ht as l, It as u, J as d, Jt as f, K as p, Kt as m, Lt as h, Mt as g, Ot as _, Pt as v, Q as y, Qt as b, Rt as x, St as S, Tt as C, Ut as w, Vt as T, Wt as E, X as D, Xt as O, Yt as k, Z as A, Zt as j, _t as M, a as ee, bt as N, c as P, ct as F, d as te, dt as I, en as L, et as ne, f as re, ft as ie, h as ae, ht as oe, i as se, jt as R, kt as z, l as ce, lt as le, mt as ue, n as de, nn as fe, nt as pe, o as me, p as he, pt as ge, q as _e, r as ve, rt as ye, s as be, st as xe, t as Se, tn as Ce, tt as we, u as Te, ut as B, vt as Ee, wt as De, xt as V, yt as Oe } from "./Field-dpYXm9AU.js";
// \0rolldown/runtime.js
var ke = Object.defineProperty, Ae = (e, t) => {
	let n = {};
	for (var r in e) ke(n, r, {
		get: e[r],
		enumerable: !0
	});
	return t || ke(n, Symbol.toStringTag, { value: "Module" }), n;
};
// svelte/View.svelte
function je(t, n) {
	let r = () => ne(n.values, "$values", i), [i, a] = e();
	var s = o(), c = T(s);
	oe(c, () => n.component, (e, t) => {
		t(e, y(r));
	}), C(t, s), a();
}
// shared/uiVariant.ts
function Me(e, t, n) {
	let r = new URL(t), i = new URL(e, r);
	return i.origin !== r.origin || !/^\/(?:app|archived|login|b\/[a-z0-9]+)\/?$/.test(i.pathname) ? String(e) : (n === "svelte" ? i.searchParams.set("ui", "svelte") : i.searchParams.delete("ui"), i.pathname + i.search + i.hash);
}
// svelte/Inbox.svelte
var Ne = a("<span class=\"tw:grid tw:size-8 tw:shrink-0 tw:place-items-center tw:rounded-full tw:border tw:border-border tw:bg-muted\"><!></span>"), Pe = a("<li class=\"tw:flex tw:items-start tw:gap-2 tw:py-1\"><a class=\"tw:flex tw:min-w-0 tw:flex-1 tw:gap-3 tw:rounded-control tw:p-2 tw:text-foreground tw:no-underline tw:outline-none tw:hover:bg-accent tw:focus-visible:ring-2 tw:focus-visible:ring-ring\"><!> <span class=\"tw:flex tw:min-w-0 tw:flex-1 tw:flex-col tw:gap-1 tw:text-sm tw:leading-5 tw:[overflow-wrap:anywhere]\"><span class=\"tw:line-clamp-3\"><strong class=\"tw:font-semibold\"> </strong> </span> <span class=\"tw:text-xs tw:leading-4 tw:text-muted-foreground\"> </span></span></a> <!></li>"), Fe = a("<ul class=\"tw:m-0 tw:max-h-[60dvh] tw:min-h-0 tw:list-none tw:divide-y tw:divide-border tw:overflow-auto tw:overscroll-contain tw:p-0\"></ul>"), Ie = a("<!> <!>", 1);
function Le(e, t) {
	b(t, !0);
	let n = (e) => {
		var n = o(), a = T(n), s = (e) => {
			var n = Fe();
			Ee(n, 21, () => v(x), (e) => O(e), (e, n) => {
				var a = Pe(), o = r(a), s = r(o), c = (e) => {
					var t = Ne(), n = r(t);
					ae(n, { name: "check" }), L(t), C(e, t);
				}, u = k(() => A(v(n)) === "task"), d = (e) => {
					{
						let r = k(() => M(v(n))), i = k(() => t.avatarUrl?.(v(n).author));
						p(e, {
							get name() {
								return v(r);
							},
							get src() {
								return v(i);
							}
						});
					}
				};
				V(s, (e) => {
					v(u) ? e(c) : e(d, -1);
				});
				var m = w(s, 2), g = r(m), _ = r(g), b = l(_, !0), x = w(_);
				L(g);
				var S = w(g, 2), T = l(S);
				L(m), L(o);
				var E = w(o, 2), D = (e) => {
					{
						let r = k(() => t.vb.t("Já resolvi (respondi em outro lugar, ou não é comigo)")), i = k(() => v(f) === O(v(n))), a = k(() => v(f) !== null);
						Te(e, {
							icon: "check",
							get label() {
								return v(r);
							},
							class: "tw:mt-1",
							get loading() {
								return v(i);
							},
							get disabled() {
								return v(a);
							},
							onclick: () => N(v(n))
						});
					}
				}, j = k(() => v(n).ref.startsWith("m"));
				V(E, (e) => {
					v(j) && e(D);
				}), L(a), h((e, t, r, a) => {
					B(o, "href", e), i(b, t), i(x, ` ${v(n).text ?? ""}`), i(T, `${v(y) ? `${v(n).room} › ` : ""}${r ?? ""} · ${a ?? ""}`);
				}, [
					() => ee(v(n)),
					() => A(v(n)) === "task" ? t.vb.t("Tarefa sua esperando OK:") : A(v(n)) === "agent" ? t.vb.t("Seu agent espera você:") : `${M(v(n)).split(" ")[0]}:`,
					() => v(n).topic || t.vb.t("sala principal"),
					() => t.vb.ago(v(n).ts)
				]), R("click", o, (e) => t.onopen(v(n), e)), C(e, a);
			}), L(n), C(e, n);
		}, c = (e) => {
			{
				let n = k(() => v(y) ? t.vb.t("Nada esperando você. ✓") : t.vb.t("Nada esperando você nesta sala. ✓"));
				P(e, { get title() {
					return v(n);
				} });
			}
		};
		V(a, (e) => {
			v(x).length ? e(s) : e(c, -1);
		}), C(e, n);
	}, a = D(t, "all", 3, !1), s = m(E(u(() => a() || !t.roomId ? "all" : "room"))), d = m(!0), f = m(null), g = m(""), _ = k(() => t.waits.filter((e) => e.book_id === t.roomId)), y = k(() => v(s) === "all" || !t.roomId), x = k(() => v(y) ? t.waits : v(_)), S = k(() => [{
		value: "room",
		label: `${t.vb.t("Esta sala")} (${v(_).length})`
	}, {
		value: "all",
		label: `${t.vb.t("Todas")} (${t.waits.length})`
	}]), O = (e) => `${e.book_id}:${e.ref}`, A = (e) => e.ref.startsWith("t") ? "task" : /^[ab]/.test(e.ref) ? "agent" : "ask", M = (e) => e.author_name || t.displayName?.(e.author) || e.author.split("@")[0];
	function ee(e) {
		return Me(`/b/${encodeURIComponent(e.book_id)}${e.thread === "main" ? "" : `?t=${encodeURIComponent(e.thread)}`}${/^[mab]/.test(e.ref) ? `#m${e.ref.slice(1)}` : ""}`, window.location.href, "svelte");
	}
	async function N(e) {
		c(f, O(e), !0), c(g, "");
		try {
			await t.onresolve(e);
		} catch {
			c(g, t.vb.t("Não deu pra resolver agora. Tente de novo."), !0);
		} finally {
			c(f, null);
		}
	}
	{
		let r = (e) => {
			var r = Ie(), i = T(r), a = (e) => {
				be(e, {
					get title() {
						return v(g);
					},
					compact: !0
				});
			};
			V(i, (e) => {
				v(g) && e(a);
			});
			var o = w(i, 2), l = (e) => {
				{
					let r = (e) => {
						n(e);
					}, i = k(() => t.vb.t("Caixa de entrada"));
					ce(e, {
						get items() {
							return v(S);
						},
						get label() {
							return v(i);
						},
						onValueChange: (e) => t.ontab?.(e === "all"),
						get value() {
							return v(s);
						},
						set value(e) {
							c(s, e, !0);
						},
						children: r,
						$$slots: { default: !0 }
					});
				}
			}, u = (e) => {
				n(e);
			};
			V(o, (e) => {
				t.roomId ? e(l) : e(u, -1);
			}), C(e, r);
		}, i = k(() => t.vb.t("Caixa de entrada")), a = k(() => t.vb.t("Fechar"));
		re(e, {
			get title() {
				return v(i);
			},
			get closeLabel() {
				return v(a);
			},
			onOpenChange: (e) => {
				e || t.onclose();
			},
			get open() {
				return v(d);
			},
			set open(e) {
				c(d, e, !0);
			},
			children: r,
			$$slots: { default: !0 }
		});
	}
	j();
}
n(["click"]);
// svelte/InboxMount.svelte
function Re(t, n) {
	let r = () => ne(n.waits, "$waits", i), [i, a] = e();
	Le(t, y(() => n.props, { get waits() {
		return r();
	} })), a();
}
// svelte/lib/ui/Progress.svelte
var ze = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"value",
	"max",
	"label",
	"class"
]), Be = a("<progress> </progress>");
function Ve(e, t) {
	b(t, !0);
	let n = D(t, "max", 3, 100), r = A(t, ze), a = k(() => Number.isFinite(n()) && n() > 0 ? n() : 100), o = k(() => Number.isFinite(t.value) ? Math.min(v(a), Math.max(0, t.value)) : 0);
	var s = Be();
	F(s, (e) => ({
		...r,
		max: v(a),
		value: v(o),
		"aria-label": t.label,
		class: e
	}), [() => _e("tw:h-1.5 tw:w-full tw:overflow-hidden tw:rounded-full tw:border-0 tw:bg-muted tw:appearance-none tw:[&::-webkit-progress-bar]:rounded-full tw:[&::-webkit-progress-bar]:bg-muted tw:[&::-webkit-progress-value]:rounded-full tw:[&::-webkit-progress-value]:bg-primary tw:[&::-moz-progress-bar]:rounded-full tw:[&::-moz-progress-bar]:bg-primary", t.class)]);
	var c = l(s);
	h(() => i(c, `${v(o) ?? ""}/${v(a) ?? ""}`)), C(e, s), j();
}
// svelte/TaskList.svelte
var He = a("<!> ", 1), Ue = a("<div class=\"tw:min-w-0 tw:flex-1 tw:basis-32 tw:space-y-1\"><!> <!></div>"), We = a("<div role=\"group\"><!> <!> <!> <!> <!></div>"), Ge = a("<section data-vb-native=\"\" class=\"tw:m-0 tw:box-border tw:space-y-3 tw:rounded-surface tw:bg-background tw:p-3 tw:font-sans tw:text-sm tw:text-foreground\"><header class=\"tw:flex tw:items-center tw:gap-3\"><h3 class=\"tw:m-0 tw:font-sans tw:text-sm tw:font-semibold\"> </h3> <!> <!></header> <!> <!> <div class=\"tw:space-y-2\"></div> <form id=\"newTask\" class=\"tw:flex tw:items-center tw:gap-2\"><!> <!></form></section>"), Ke = a("<form class=\"tw:grid tw:grid-cols-1 tw:gap-4\"><!> <!> <div class=\"tw:flex tw:flex-wrap tw:justify-end tw:gap-2\"><!><!></div></form>"), qe = a("<!> <!>", 1);
function Je(e, n) {
	let a = _();
	b(n, !0);
	let o = D(n, "waits", 19, () => []), s = k(() => n.room.epics.find((e) => e.id === n.thread) ?? (n.thread === "main" && n.room.roomTasks?.length ? {
		id: "main",
		tasks: n.room.roomTasks,
		flags: []
	} : null)), u = (e) => o().some((t) => t.book_id === n.room.id && t.ref === `t${e.id}`), d = k(() => (v(s)?.tasks ?? []).map((e, t) => ({
		task: e,
		index: t
	})).sort((e, t) => (e.task.done ? 2 : +!u(e.task)) - (t.task.done ? 2 : +!u(t.task)) || e.index - t.index).map((e) => e.task)), f = k(() => v(s)?.tasks.filter((e) => e.done).length ?? 0), p = k(() => [{
		value: "",
		label: n.vb.t("sem dono")
	}, ...(n.room.members ?? []).map((e) => ({
		value: e,
		label: e === n.room.me ? n.vb.t("você") : n.vb.name(e)
	}))]), S = m(null), E = m(""), O = m(null), A = m(""), M = m(""), N = m(null), P = m(!1), F = m(""), I = m(null), ne = k(() => v(s)?.tasks.find((e) => e.id === v(N)));
	x(() => {
		v(S) && v(O) && (v(O).focus(), v(O).select());
	}), x(() => {
		v(N) && !v(ne) && le(), v(S) && !v(s)?.tasks.some((e) => e.id === v(S)) && c(S, null);
	});
	function oe(e) {
		try {
			if (n.send(e)) return c(M, ""), !0;
		} catch {}
		return c(M, n.vb.t("Não deu pra enviar agora. Tente de novo."), !0), !1;
	}
	function R(e, t = !0) {
		v(S) !== e.id || t && v(E).trim() && v(E) !== e.title && !oe({
			t: "task.rename",
			id: e.id,
			title: v(E)
		}) || c(S, null);
	}
	function ce(e) {
		c(N, e.id, !0), c(F, e.due ?? "", !0), c(P, !0);
	}
	function le() {
		c(P, !1), c(N, null), c(F, "");
	}
	var ue = qe(), de = T(ue), fe = (e) => {
		var a = Ge(), o = r(a), m = r(o), _ = l(m, !0), y = w(m, 2);
		ve(y, {
			children: (e, n) => {
				t();
				var r = z();
				h(() => i(r, `${v(f) ?? ""}/${v(s).tasks.length ?? ""}`)), C(e, r);
			},
			$$slots: { default: !0 }
		});
		var b = w(y, 2);
		{
			let e = k(() => n.vb.t("Tarefas")), t = k(() => Math.max(1, v(s).tasks.length)), r = k(() => `${v(f)}/${v(s).tasks.length}`);
			Ve(b, {
				get label() {
					return v(e);
				},
				get value() {
					return v(f);
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
		L(o);
		var x = w(o, 2), D = (e) => {
			{
				let t = k(() => `@vibe: ${v(s).flags.join(" · ")}`);
				ve(e, {
					variant: "warning",
					get title() {
						return v(t);
					},
					children: (e, t) => {
						var n = He(), r = T(n);
						ae(r, {
							name: "warning",
							class: "tw:size-3"
						});
						var a = w(r, 1, !0);
						h((e) => i(a, e), [() => v(s).flags.join(" · ")]), C(e, n);
					},
					$$slots: { default: !0 }
				});
			}
		};
		V(x, (e) => {
			v(s).flags?.length && e(D);
		});
		var j = w(x, 2), N = (e) => {
			be(e, {
				get title() {
					return v(M);
				},
				compact: !0
			});
		};
		V(j, (e) => {
			v(M) && !v(P) && e(N);
		});
		var F = w(j, 2);
		Ee(F, 21, () => v(d), (e) => e.id, (e, a) => {
			var o = We(), s = r(o);
			{
				let e = k(() => n.vb.t("Feita"));
				se(s, {
					get checked() {
						return v(a).done;
					},
					get "aria-label"() {
						return v(e);
					},
					onclick: (e) => {
						e.preventDefault(), oe({
							t: "task.toggle",
							id: v(a).id
						});
					}
				});
			}
			var l = w(s, 2), d = (e) => {
				{
					let t = k(() => n.vb.t("Clique para editar"));
					me(e, {
						get "data-task-edit"() {
							return v(a).id;
						},
						get "aria-label"() {
							return v(t);
						},
						class: "tw:min-w-32 tw:flex-1",
						onblur: () => R(v(a)),
						onkeydown: (e) => {
							e.key === "Enter" && (e.preventDefault(), R(v(a))), e.key === "Escape" && (e.preventDefault(), R(v(a), !1));
						},
						get ref() {
							return v(O);
						},
						set ref(e) {
							c(O, e, !0);
						},
						get value() {
							return v(E);
						},
						set value(e) {
							c(E, e, !0);
						}
					});
				}
			}, f = (e) => {
				var o = Ue(), s = r(o);
				{
					let e = k(() => _e("tw:h-auto tw:w-full tw:justify-start tw:whitespace-normal tw:rounded-sm tw:p-0 tw:text-left tw:hover:bg-transparent tw:hover:underline", v(a).done && "tw:text-muted-foreground tw:line-through")), r = k(() => n.vb.t("Clique para editar"));
					te(s, {
						get "data-task-title"() {
							return v(a).id;
						},
						variant: "ghost",
						get class() {
							return v(e);
						},
						get title() {
							return v(r);
						},
						onclick: () => {
							c(S, v(a).id, !0), c(E, v(a).title, !0);
						},
						children: (e, n) => {
							t();
							var r = z();
							h(() => i(r, v(a).title)), C(e, r);
						},
						$$slots: { default: !0 }
					});
				}
				var l = w(s, 2), u = (e) => {
					{
						let t = k(() => `@vibe: ${v(a).flags.join(" · ")}`);
						ve(e, {
							variant: "warning",
							get title() {
								return v(t);
							},
							children: (e, t) => {
								var n = He(), r = T(n);
								ae(r, {
									name: "warning",
									class: "tw:size-3"
								});
								var o = w(r, 1, !0);
								h((e) => i(o, e), [() => v(a).flags.join(" · ")]), C(e, n);
							},
							$$slots: { default: !0 }
						});
					}
				};
				V(l, (e) => {
					v(a).flags?.length && e(u);
				}), L(o), C(e, o);
			};
			V(l, (e) => {
				v(S) === v(a).id ? e(d) : e(f, -1);
			});
			var m = w(l, 2);
			{
				let e = k(() => n.vb.t("Responsável")), t = k(() => v(a).owner ?? "");
				ee(m, {
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
						return v(p);
					},
					class: "tw:w-auto tw:max-w-40",
					onValueChange: (e) => oe({
						t: "task.assign",
						id: v(a).id,
						owner: e
					})
				});
			}
			var g = w(m, 2);
			{
				let e = k(() => n.vb.t("Prazo")), t = k(() => v(a).due ? `${n.vb.t("Prazo")}: ${v(a).due}` : n.vb.t("Prazo"));
				te(g, {
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
					onclick: () => ce(v(a)),
					children: (e, t) => {
						var n = He(), r = T(n);
						ae(r, {
							name: "calendar",
							class: "tw:size-3.5"
						});
						var o = w(r, 1, !0);
						h(() => i(o, v(a).due ?? "")), C(e, n);
					},
					$$slots: { default: !0 }
				});
			}
			var _ = w(g, 2);
			{
				let e = k(() => n.vb.t("Apagar task"));
				Te(_, {
					get "data-tdel"() {
						return v(a).id;
					},
					get label() {
						return v(e);
					},
					icon: "close",
					class: "tw:size-8",
					onclick: () => oe({
						t: "task.del",
						id: v(a).id
					})
				});
			}
			L(o), h((e) => {
				B(o, "data-task", v(a).id), B(o, "aria-label", v(a).title), ie(o, 1, e);
			}, [() => ge(_e("tw:flex tw:flex-wrap tw:items-center tw:gap-2 tw:rounded-control tw:border tw:p-2", v(a).done ? "tw:border-transparent tw:bg-muted/40 tw:text-muted-foreground" : "tw:border-border tw:bg-card tw:text-card-foreground", !v(a).done && v(a).owner === n.room.me && "tw:border-ring/50", u(v(a)) && "tw:bg-warning/10"))]), C(e, o);
		}), L(F);
		var I = w(F, 2), ne = r(I);
		{
			let e = k(() => n.vb.t("nova task")), t = k(() => n.vb.t("nova task"));
			me(ne, {
				get "aria-label"() {
					return v(e);
				},
				get placeholder() {
					return v(t);
				},
				get value() {
					return v(A);
				},
				set value(e) {
					c(A, e, !0);
				}
			});
		}
		var re = w(ne, 2);
		{
			let e = k(() => n.vb.t("Nova tarefa"));
			Te(re, {
				type: "submit",
				get label() {
					return v(e);
				},
				icon: "plus",
				variant: "outline"
			});
		}
		L(I), L(a), h((e, t) => {
			B(a, "aria-label", e), i(_, t);
		}, [() => n.vb.t("Tarefas"), () => n.vb.t("Tarefas")]), g("submit", I, (e) => {
			e.preventDefault(), v(A).trim() && oe({
				t: "task.add",
				epic: n.thread,
				title: v(A)
			}) && c(A, "");
		}), C(e, a);
	};
	V(de, (e) => {
		v(s) && e(fe);
	});
	var pe = w(de, 2), he = (e) => {
		{
			let o = k(() => n.vb.t("Prazo")), s = k(() => n.vb.t("Prazo (ex.: sex, qua 23h, 06/11). Vazio tira o prazo:")), l = k(() => n.vb.t("Fechar"));
			re(e, {
				get title() {
					return v(o);
				},
				get description() {
					return v(s);
				},
				get closeLabel() {
					return v(l);
				},
				initialFocus: () => v(I),
				onOpenChange: (e) => {
					e || le();
				},
				get open() {
					return v(P);
				},
				set open(e) {
					c(P, e, !0);
				},
				children: (e, o) => {
					var s = Ke(), l = r(s);
					{
						let e = (e, t = Ce) => {
							me(e, y(t, {
								get ref() {
									return v(I);
								},
								set ref(e) {
									c(I, e, !0);
								},
								get value() {
									return v(F);
								},
								set value(e) {
									c(F, e, !0);
								}
							}));
						}, t = k(() => `${a}-due`), r = k(() => n.vb.t("Prazo"));
						Se(l, {
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
					var u = w(l, 2), d = (e) => {
						be(e, {
							get title() {
								return v(M);
							},
							compact: !0
						});
					};
					V(u, (e) => {
						v(M) && e(d);
					});
					var f = w(u, 2), p = r(f);
					te(p, {
						variant: "outline",
						onclick: le,
						children: (e, r) => {
							t();
							var a = z();
							h((e) => i(a, e), [() => n.vb.t("Cancelar")]), C(e, a);
						},
						$$slots: { default: !0 }
					});
					var m = w(p);
					te(m, {
						type: "submit",
						children: (e, r) => {
							t();
							var a = z();
							h((e) => i(a, e), [() => n.vb.t("Salvar")]), C(e, a);
						},
						$$slots: { default: !0 }
					}), L(f), L(s), g("submit", s, (e) => {
						e.preventDefault(), v(ne) && oe({
							t: "task.assign",
							id: v(ne).id,
							due: v(F)
						}) && le();
					}), C(e, s);
				},
				$$slots: { default: !0 }
			});
		}
	};
	V(pe, (e) => {
		v(ne) && e(he);
	}), C(e, ue), j();
}
// svelte/Tasks.svelte
var Ye = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy"
]);
function Xe(e, t) {
	b(t, !0);
	let n = A(t, Ye);
	var r = o(), i = T(r);
	N(i, () => JSON.stringify([t.room.id, t.thread]), (e) => {
		Je(e, y(() => n));
	}), C(e, r), j();
}
// node_modules/zod/v4/core/util.js
function Ze(e) {
	let t = Object.values(e).filter((e) => typeof e == "number");
	return Object.entries(e).filter(([e, n]) => t.indexOf(+e) === -1).map(([e, t]) => t);
}
function Qe(e, t) {
	return typeof t == "bigint" ? t.toString() : t;
}
var $e = class {
	constructor(e) {
		this._getter = e, this._value = void 0;
	}
	get value() {
		let e = this._getter;
		return e !== void 0 && (this._value = e(), this._getter = void 0), this._value;
	}
};
function et(e) {
	return new $e(e);
}
function tt(e) {
	return e == null;
}
function nt(e) {
	let t = +!!e.startsWith("^"), n = e.endsWith("$") ? e.length - 1 : e.length;
	return e.slice(t, n);
}
function rt(e, t, n) {
	Object.defineProperty(e, t, {
		value: n,
		writable: !0,
		enumerable: !0,
		configurable: !0
	});
}
function it(e) {
	let t = Object.getOwnPropertyDescriptor(e, "shape");
	return t?.get ? t.get.raw : t?.value;
}
function at(e) {
	return it(e._zod.def) ?? e._zod.def.shape;
}
function ot(e, t, n) {
	Object.defineProperty(e, t, {
		get() {
			let e = n();
			return rt(this, t, e), e;
		},
		enumerable: !0,
		configurable: !0
	});
}
function st(e, t, n) {
	t in e ? rt(e, t, n) : e[t] = n;
}
function ct(e, t, n, r) {
	let i = at(t);
	for (let a of n) {
		let n = Object.getOwnPropertyDescriptor(i, a);
		n.enumerable && (n.get ? ot(e, a, () => {
			let e = t._zod.def.shape[a];
			return r ? r(e, a) : e;
		}) : st(e, a, r ? r(n.value, a) : n.value));
	}
}
function lt(e, t) {
	for (let n of Reflect.ownKeys(t)) {
		let r = Object.getOwnPropertyDescriptor(t, n);
		r.enumerable && (r.get ? ot(e, n, () => t[n]) : st(e, n, r.value));
	}
}
function ut(...e) {
	let t = {};
	for (let n of e) {
		let e = Object.getOwnPropertyDescriptors(n);
		Object.assign(t, e);
	}
	return Object.defineProperties({}, t);
}
var dt = "captureStackTrace" in Error ? Error.captureStackTrace : (...e) => {};
function ft(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function pt(e) {
	if (ft(e) === !1) return !1;
	let t = e.constructor;
	if (t === void 0 || typeof t != "function") return !0;
	let n = t.prototype;
	return ft(n) !== !1 && Object.prototype.hasOwnProperty.call(n, "isPrototypeOf") !== !1;
}
var mt = /* @__PURE__*/ new Set([
	"string",
	"number",
	"symbol"
]);
function ht(e) {
	return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function gt(e, t, n) {
	let r = new e._zod.constr(t ?? e._zod.def);
	return (!t || n?.parent) && (r._zod.parent = e), r;
}
function _t(e) {
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
function vt(e) {
	return Object.keys(e).filter((t) => e[t]._zod.optin !== void 0 && e[t]._zod.optout === "optional");
}
function yt(e, t) {
	if (!pt(t)) throw Error("Invalid input to extend: expected a plain object");
	let n = e._zod.def.checks;
	if (n && n.length > 0) {
		let n = at(e);
		for (let e of Reflect.ownKeys(t)) if (Object.getOwnPropertyDescriptor(n, e) !== void 0) throw Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
	}
	return gt(e, ut(e._zod.def, { shape: bt(e, t) }));
}
function bt(e, t) {
	let n = {};
	return ct(n, e, Reflect.ownKeys(at(e))), lt(n, t), n;
}
function xt(e, t = 0) {
	if (e.aborted === !0) return !0;
	for (let n = t; n < e.issues.length; n++) if (e.issues[n]?.continue !== !0) return !0;
	return !1;
}
function St(e, t = 0) {
	if (e.aborted === !0) return !0;
	for (let n = t; n < e.issues.length; n++) if (e.issues[n]?.continue === !1) return !0;
	return !1;
}
function Ct(e, t) {
	return t.map((t) => {
		var n;
		return (n = t).path ?? (n.path = []), t.path.unshift(e), t;
	});
}
function wt(e) {
	return typeof e == "string" ? e : e?.message;
}
function Tt(e) {
	let t = [];
	for (let n of e ?? []) {
		let e = n._zod.def;
		if (!/_(length|size)$|_equals$/.test(e.check)) break;
		let r = e.maximum ?? e.length ?? e.size;
		r >= 0 && t.push([r, n]);
	}
	return t;
}
function Et(e, t, n) {
	var r;
	for (let i = t; i < e.length; i++) (r = e[i]).schema ?? (r.schema = n);
}
function Dt(e, t, n) {
	var r;
	let i = e.inst?._zod?.traits;
	i?.has("$ZodType") && (i.has("$ZodCheck") ? (r = e).schema ?? (r.schema = e.inst) : e.schema = e.inst);
	let a = e.schema === e.inst ? void 0 : e.schema?._zod.def?.error, o = e.message ? e.message : wt(e.inst?._zod.def?.error?.(e)) ?? wt(a?.(e)) ?? wt(t?.error?.(e)) ?? wt(n.customError?.(e)) ?? wt(n.localeError?.(e)) ?? "Invalid input", s = {};
	for (let t of Object.keys(e)) t !== "inst" && t !== "schema" && t !== "continue" && t !== "input" && t !== "__proto__" && (s[t] = e[t]);
	return s.path ??= [], s.message = o, t?.reportInput && (s.input = e.input), s;
}
var Ot = /[\uD800-\uDBFF]/;
function kt(e) {
	let t = e.length;
	if (!Ot.test(e)) return t;
	let n = t;
	for (let r = 0; r < t - 1; r++) (e.charCodeAt(r) & 64512) == 55296 && (e.charCodeAt(r + 1) & 64512) == 56320 && (n--, r++);
	return n;
}
function At(e) {
	return Array.isArray(e) ? "array" : typeof e == "string" ? "string" : "unknown";
}
function jt(e, t) {
	for (let n in t) {
		let r = Object.getOwnPropertyDescriptor(t, n);
		r.get ? Object.defineProperty(e, n, {
			...r,
			enumerable: !1
		}) : Pt(e, n, r.value);
	}
}
function Mt(e, t, n, r = !0) {
	return Object.defineProperty(e, t, {
		configurable: !0,
		writable: !0,
		enumerable: r,
		value: n
	}), n;
}
function Nt(e, t, n) {
	return Mt(e, t, n, !1);
}
function Pt(e, t, n) {
	Object.defineProperty(e, t, {
		configurable: !0,
		get() {
			return this == null ? n : Mt(this, t, n.bind(this));
		},
		set(e) {
			Mt(this, t, e);
		}
	});
}
function Ft(e, t) {
	let n = Object.getPrototypeOf(e);
	return t in n ? void 0 : n;
}
var It, Lt = !1, Rt = {
	configurable: !0,
	get() {
		Lt = !0;
	}
};
function zt(e, t, n) {
	let r = Object.getPrototypeOf(e._zod);
	t in r && It !== e._zod ? It = void 0 : (It = e._zod, Object.defineProperty(r, t, {
		configurable: !0,
		get() {
			Object.defineProperty(this, t, Rt);
			let e = Lt;
			Lt = !1;
			try {
				let r = n(this);
				return Lt ? delete this[t] : Object.defineProperty(this, t, {
					configurable: !0,
					writable: !0,
					value: r
				}), Lt ||= e, r;
			} catch (n) {
				throw delete this[t], Lt ||= e, n;
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
function Bt(e, t, n, r) {
	let i = Ft(e, t);
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
var Vt, Ht = {
	value: void 0,
	enumerable: !1
}, Ut = "captureStackTrace" in Error ? Error : null;
function Wt(e) {
	let t = Ut;
	if (t) {
		let n = t.stackTraceLimit;
		if (typeof n == "number") {
			try {
				t.stackTraceLimit = 0;
			} catch {
				return Ut = null, new e();
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
function H(e, t, n, r) {
	let i = {};
	function a(e) {
		this.def = e, this.constr = d, this.traits = /* @__PURE__ */ new Set();
	}
	a.prototype = i;
	let o = n, s = o && /* @__PURE__ */ new WeakSet();
	function c(n, r) {
		if (!n._zod) {
			Ht.value = new a(r);
			try {
				Object.defineProperty(n, "_zod", Ht);
			} finally {
				Ht.value = void 0;
			}
		} else if (n._zod.traits.has(e)) return;
		if (n._zod.traits.add(e), t(n, r), s) {
			let e = Object.getPrototypeOf(n), t = n._zod.constr.prototype, r = e;
			for (; r && r !== t;) r = Object.getPrototypeOf(r);
			let i = r ?? e;
			s.has(i) || (s.add(i), jt(i, o));
		}
		let i = d.prototype;
		for (let e in i) Object.prototype.hasOwnProperty.call(i, e) && (e in n || (n[e] = i[e].bind(n)));
	}
	let l = r?.Parent ?? Object;
	class u extends l {}
	Object.defineProperty(u, "name", { value: e });
	function d(e) {
		let t = r?.Parent ? Wt(u) : this;
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
var Gt = class extends Error {
	constructor() {
		super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
	}
};
(Vt = globalThis).__zod_globalConfig ?? (Vt.__zod_globalConfig = {});
var Kt = globalThis.__zod_globalConfig;
function qt(e) {
	return e && Object.assign(Kt, e), Kt;
}
// node_modules/zod/v4/core/errors.js
function Jt() {
	let e = this._zod;
	return e.message ??= JSON.stringify(e.def, Qe, 2), e.message;
}
function Yt(e) {
	this._zod.message = e;
}
var Xt = {
	get: Jt,
	set: Yt,
	enumerable: !0,
	configurable: !0
}, Zt = {
	value: void 0,
	enumerable: !1
}, Qt = /* @__PURE__ */ new WeakSet([Object.prototype, Error.prototype]), $t = /* @__PURE__ */ H("$ZodError", (e, t) => {
	e.name = "$ZodError", Zt.value = t, Object.defineProperty(e, "issues", Zt), Zt.value = void 0, Object.defineProperty(e, "message", Xt);
	let n = Object.getPrototypeOf(e);
	Qt.has(n) || (Qt.add(n), Object.defineProperty(n, "toString", {
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
}, void 0, { Parent: Error }), en = /* @__PURE__*/ ((e) => {
	let t = (n, r, i, a) => {
		let o = i ? {
			...i,
			async: !1
		} : { async: !1 }, s = n._zod.run({
			value: r,
			issues: []
		}, o);
		if (s instanceof Promise) throw new Gt();
		if (s.issues.length) {
			let n = new ((a?.Err) ?? e)(s.issues.map((e) => Dt(e, o, qt())));
			throw dt(n, a?.callee ?? t), n;
		}
		return s.value;
	};
	return t;
})($t), tn = /* @__PURE__*/ ((e) => {
	let t = async (n, r, i, a) => {
		let o = i ? {
			...i,
			async: !0
		} : { async: !0 }, s = n._zod.run({
			value: r,
			issues: []
		}, o);
		if (s instanceof Promise && (s = await s), s.issues.length) {
			let n = new ((a?.Err) ?? e)(s.issues.map((e) => Dt(e, o, qt())));
			throw dt(n, a?.callee ?? t), n;
		}
		return s.value;
	};
	return t;
})($t), nn = /* @__PURE__*/ ((e) => (t, n, r) => {
	let i = r ? {
		...r,
		async: !1
	} : { async: !1 }, a = t._zod.run({
		value: n,
		issues: []
	}, i);
	if (a instanceof Promise) throw new Gt();
	return a.issues.length ? rn(e, a.issues, i) : {
		success: !0,
		data: a.value
	};
})($t);
function rn(e, t, n) {
	let r;
	return {
		success: !1,
		get error() {
			return r || (r = new e(t.map((e) => Dt(e, n, qt()))), t = void 0, n = void 0), r;
		},
		set error(e) {
			r = e, t = void 0, n = void 0;
		}
	};
}
var an = /* @__PURE__*/ ((e) => async (t, n, r) => {
	let i = r ? {
		...r,
		async: !0
	} : { async: !0 }, a = t._zod.run({
		value: n,
		issues: []
	}, i);
	return a instanceof Promise && (a = await a), a.issues.length ? rn(e, a.issues, i) : {
		success: !0,
		data: a.value
	};
})($t), on = /^[\s\S]{0,}$/, sn = /^-?\d+(?:\.\d+)?$/, cn = /^(?:true|false)$/i, ln = /*@__PURE__*/ H("$ZodCheck", (e, t) => {
	var n;
	e._zod ??= {}, e._zod.def = t, (n = e._zod).onattach ?? (n.onattach = []);
}), un = (e) => {
	let t = e.value;
	return !tt(t) && t.length !== void 0;
}, dn = /*@__PURE__*/ H("$ZodCheckMaxLength", (e, t) => {
	var n;
	ln.init(e, t), (n = e._zod.def).when ?? (n.when = un), e._zod.check = (n) => {
		let r = n.value, i = r.length;
		if ((typeof r == "string" && i > t.maximum ? kt(r) : i) <= t.maximum) return;
		let a = At(r);
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
}), fn = /*@__PURE__*/ H("$ZodCheckMinLength", (e, t) => {
	var n;
	ln.init(e, t), (n = e._zod.def).when ?? (n.when = un), e._zod.check = (n) => {
		let r = n.value, i = r.length;
		if ((typeof r == "string" && i >= t.minimum && i < t.minimum * 2 ? kt(r) : i) >= t.minimum) return;
		let a = At(r);
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
}), pn = /*@__PURE__*/ H("$ZodCheckStartsWith", (e, t) => {
	ln.init(e, t);
	let n = RegExp(`^${ht(t.prefix)}.*`);
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
}), mn = {
	major: 4,
	minor: 6,
	patch: 7
}, hn = /*@__PURE__*/ H("$ZodType", (e, t) => {
	var n;
	e ??= {}, e._zod.def = t, e._zod.bag = e._zod.bag || {}, e._zod.version = mn;
	let r = e._zod.def.checks, i = e._zod.traits.has("$ZodCheck") ? [e, ...r ?? []] : r?.length ? [...r] : [];
	for (let t of i) for (let n of t._zod.onattach) n(e);
	if (i.length === 0) (n = e._zod).deferred ?? (n.deferred = []), e._zod.deferred?.push(() => {
		e._zod.run = e._zod.parse;
	});
	else {
		let t = (t, n, r) => {
			if (t.memo) return t;
			let i = xt(t), a;
			for (let o of n) {
				if (o._zod.def.when) {
					if (St(t) || !o._zod.def.when(t)) continue;
				} else if (i) continue;
				let n = t.issues.length, s = o._zod.check(t);
				if (s instanceof Promise && r?.async === !1) throw new Gt();
				if (a || s instanceof Promise) a = (a ?? Promise.resolve()).then(async () => {
					await s, t.issues.length !== n && (Et(t.issues, n, e), i ||= xt(t, n));
				});
				else {
					if (t.issues.length === n) continue;
					Et(t.issues, n, e), i ||= xt(t, n);
				}
			}
			return a ? a.then(() => t) : t;
		}, n = (n, r, a) => {
			if (xt(n)) return n.aborted = !0, n;
			let o = t(r, i, a);
			if (o instanceof Promise) {
				if (a.async === !1) throw new Gt();
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
				if (a.async === !1) throw new Gt();
				return o.then((e) => t(e, i, a));
			}
			return t(o, i, a);
		};
	}
}, {
	get "~standard"() {
		return Nt(this, "~standard", vn(this));
	},
	set "~standard"(e) {
		Mt(this, "~standard", e);
	}
}), gn = (e, t) => e.issues.length ? { issues: e.issues.map((e) => Dt(e, t, qt())) } : { value: e.value };
async function _n(e, t) {
	let n = { async: !0 };
	return gn(await e._zod.run({
		value: t,
		issues: []
	}, n), n);
}
function vn(e) {
	return {
		validate: (t) => {
			let n = { async: !1 };
			try {
				let r = e._zod.run({
					value: t,
					issues: []
				}, n);
				if (!(r instanceof Promise)) return gn(r, n);
			} catch {}
			return _n(e, t);
		},
		vendor: "zod",
		version: 1
	};
}
var yn = /*@__PURE__*/ H("$ZodString", (e, t) => {
	hn.init(e, t), e._zod.pattern = t.pattern ?? on, e._zod.parse = (n, r) => {
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
}), bn = /*@__PURE__*/ H("$ZodNumber", (e, t) => {
	hn.init(e, t), e._zod.pattern = sn, e._zod.parse = (n, r) => {
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
}), xn = /*@__PURE__*/ H("$ZodBoolean", (e, t) => {
	hn.init(e, t), e._zod.pattern = cn, e._zod.parse = (n, r) => {
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
}), Sn = /*@__PURE__*/ H("$ZodNever", (e, t) => {
	hn.init(e, t), e._zod.parse = (t, n) => (t.issues.push({
		expected: "never",
		code: "invalid_type",
		input: t.value,
		inst: e
	}), t);
});
function Cn(e, t) {
	let n = Tt(e._zod.def.checks);
	if (!n.length) return;
	let r = Math.min(...n.map((e) => e[0])), i = e._zod.parse;
	e._zod.parse = (n, a) => {
		let o = t(n.value);
		if (o > r && !a?.skipChecks && a?.direction !== "backward") {
			for (let [t, r] of Tt(e._zod.def.checks)) if (o > t && r._zod.def.when(n)) {
				let t = n.issues.length;
				return r._zod.check(n), n.issues[t].continue = !1, Et(n.issues, t, e), n;
			}
		}
		return i(n, a);
	};
}
var wn = (e) => Array.isArray(e) ? e.length : -1;
function Tn(e, t, n) {
	e.issues.length && t.issues.push(...Ct(n, e.issues)), t.value[n] = e.value;
}
var En = /*@__PURE__*/ H("$ZodArray", (e, t) => {
	hn.init(e, t);
	let n = Kt.memoizer;
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
			if (c instanceof Promise) o.push(c.then((t) => Tn(t, r, e)));
			else if (Tn(c, r, e), s && c.issues.length !== 0 && xt(c)) break;
		}
		return o.length ? Promise.all(o).then(() => r) : r;
	}, Cn(e, wn);
});
function Dn(e, t, n, r, i, a) {
	let o = n in r, s = a === "optional";
	if (o || !s || i !== "optional") {
		if (e.issues.length) {
			if (i !== void 0 && s && !o) return;
			t.issues.push(...Ct(n, e.issues));
		}
		!o && i === void 0 ? e.issues.length || t.issues.push({
			code: "invalid_type",
			expected: "nonoptional",
			input: void 0,
			path: [n]
		}) : e.value === void 0 ? (o || i === "defaulted" && !s) && (t.value[n] = void 0) : t.value[n] = e.value;
	}
}
var On = [];
function kn(e) {
	let t = Object.keys(e.shape), n = Object.getOwnPropertySymbols(e.shape), r = n.length ? n : On, i = r.length ? [...t, ...r] : t;
	for (let t of i) if (!e.shape?.[t]?._zod?.traits?.has("$ZodType")) throw Error(`Invalid element at key "${String(t)}": expected a Zod schema`);
	let a = vt(e.shape);
	return {
		...e,
		allKeys: i,
		symbolKeys: r,
		keySet: new Set(t),
		numKeys: t.length,
		optionalKeys: new Set(a)
	};
}
function An(e, t, n, r, i, a, o) {
	let s = [], c = i.keySet, l = i.catchall._zod, u = l.def.type, d = l.optin, f = l.optout, p = 0;
	for (let i in t) {
		if (o && n.issues.length !== p) {
			if (xt(n, p)) break;
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
		a instanceof Promise ? e.push(a.then((e) => Dn(e, n, i, t, d, f))) : Dn(a, n, i, t, d, f);
	}
	return s.length && n.issues.push({
		code: "unrecognized_keys",
		keys: s,
		input: t,
		inst: a,
		continue: !0
	}), e.length ? Promise.all(e).then(() => n) : n;
}
var jn = /*@__PURE__*/ H("$ZodObject", (e, t) => {
	hn.init(e, t);
	let n = Object.getOwnPropertyDescriptor(t, "shape"), r = n?.get ? n.get.raw : t.shape ?? {};
	if (r) {
		let e = () => {
			let n = { ...r };
			return Object.defineProperty(t, "shape", { value: n }), e.raw = n, n;
		};
		e.raw = r, Object.defineProperty(t, "shape", { get: e });
	}
	let i = et(() => kn(t));
	zt(e, "propValues", (e) => {
		let t = e.def.shape, n = {};
		for (let e in t) {
			let r = t[e]._zod;
			if (r.values) {
				Object.prototype.hasOwnProperty.call(n, e) || rt(n, e, /* @__PURE__ */ new Set());
				for (let t of r.values) n[e].add(t);
				r.optin !== void 0 && n[e].add(void 0);
			}
		}
		return n;
	});
	let a = ft, o = t.catchall, s, c = Kt.memoizer;
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
				if (xt(t, f)) break;
				f = t.issues.length;
			}
			if (e === "__proto__") continue;
			let i = u[e], a = i._zod.optin, o = i._zod.optout, s = i._zod.run({
				value: r[e],
				issues: []
			}, n);
			s instanceof Promise ? l.push(s.then((n) => Dn(n, t, e, r, a, o))) : Dn(s, t, e, r, a, o);
		}
		return o ? An(l, r, t, n, i.value, e, d === !0) : l.length ? Promise.all(l).then(() => t) : t;
	};
});
function Mn(e, t, n, r) {
	for (let n of e) if (n.issues.length === 0) return t.value = n.value, t;
	let i = e.filter((e) => !xt(e));
	return i.length === 1 ? (t.value = i[0].value, i[0]) : (t.issues.push({
		code: "invalid_union",
		input: t.value,
		inst: n,
		errors: e.map((e) => e.issues.map((e) => Dt(e, r, qt())))
	}), t);
}
var Nn = /*@__PURE__*/ H("$ZodUnion", (e, t) => {
	hn.init(e, t), zt(e, "optin", (e) => e.def.options.some((e) => e._zod.optin === "defaulted") ? "defaulted" : e.def.options.some((e) => e._zod.optin !== void 0) ? "optional" : void 0), zt(e, "optout", (e) => e.def.options.some((e) => e._zod.optout === "optional") ? "optional" : void 0), zt(e, "values", (e) => {
		if (e.def.options.every((e) => e._zod.values)) return new Set(e.def.options.flatMap((e) => Array.from(e._zod.values)));
	}), zt(e, "pattern", (e) => {
		if (e.def.options.every((e) => e._zod.pattern)) {
			let t = e.def.options.map((e) => e._zod.pattern);
			return RegExp(`^(${t.map((e) => nt(e.source)).join("|")})$`);
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
		return a ? Promise.all(o).then((t) => Mn(t, r, e, i)) : Mn(o, r, e, i);
	};
});
function Pn(e) {
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
var Fn = /*@__PURE__*/ H("$ZodDiscriminatedUnion", (e, t) => {
	t.inclusive = !1, Nn.init(e, t);
	let n = e._zod.parse;
	zt(e, "propValues", (e) => {
		let t = {}, n = 0;
		for (let r of e.def.options) {
			let i = r._zod.propValues;
			if (!i || Object.keys(i).length === 0) throw Error(`Invalid discriminated union option at index "${e.def.options.indexOf(r)}"`);
			i[e.def.discriminator]?.has(void 0) && n++;
			for (let [e, n] of Object.entries(i)) {
				Object.prototype.hasOwnProperty.call(t, e) || rt(t, e, /* @__PURE__ */ new Set());
				for (let r of n) t[e].add(r);
			}
		}
		return !e.def.unionFallback && n > 1 && t[e.def.discriminator]?.delete(void 0), t;
	}), t.options.forEach((e, n) => {
		let r = it(e._zod.def);
		if (r && !Object.prototype.hasOwnProperty.call(r, t.discriminator)) throw Error(`Invalid discriminated union option at index "${n}"`);
	});
	let r = et(() => Pn(t));
	e._zod.parse = (i, a) => {
		let o = i.value;
		if (!ft(o)) return i.issues.push({
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
}), In = /*@__PURE__*/ H("$ZodRecord", (e, t) => {
	hn.init(e, t);
	let n = Kt.memoizer;
	n?.attach(e), e._zod.parse = (r, i) => {
		let a = r.value;
		if (!pt(a)) return r.issues.push({
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
						issues: s.issues.map((e) => Dt(e, i, qt())),
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
					e.issues.length && r.issues.push(...Ct(n, e.issues)), r.value[l] = e.value;
				})) : (u.issues.length && r.issues.push(...Ct(n, u.issues)), r.value[l] = u.value);
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
				if (typeof n == "string" && sn.test(n) && l.issues.length) {
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
						issues: l.issues.map((e) => Dt(e, i, qt())),
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
					e.issues.length && r.issues.push(...Ct(n, e.issues)), r.value[u] = e.value;
				})) : (d.issues.length && r.issues.push(...Ct(n, d.issues)), r.value[u] = d.value);
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
}), Ln = /*@__PURE__*/ H("$ZodEnum", (e, t) => {
	hn.init(e, t);
	let n = Ze(t.entries), r = new Set(n);
	e._zod.values = r, zt(e, "pattern", (e) => {
		let t = Ze(e.def.entries).filter((e) => mt.has(typeof e));
		return RegExp(t.length ? `^(${t.map((e) => ht(e.toString())).join("|")})$` : "^[^\\s\\S]$");
	}), e._zod.parse = (t, i) => {
		let a = t.value;
		return r.has(a) || t.issues.push({
			code: "invalid_value",
			values: n,
			input: a,
			inst: e
		}), t;
	};
}), Rn = /*@__PURE__*/ H("$ZodLiteral", (e, t) => {
	hn.init(e, t);
	let n = new Set(t.values);
	e._zod.values = n, zt(e, "pattern", (e) => {
		let t = e.def.values;
		return RegExp(t.length ? `^(${t.map((e) => typeof e == "string" ? ht(e) : e ? ht(e.toString()) : String(e)).join("|")})$` : "^[^\\s\\S]$");
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
function zn(e, t) {
	return e.value = t.issues.length ? void 0 : t.value, e;
}
var Bn = /*@__PURE__*/ H("$ZodOptional", (e, t) => {
	hn.init(e, t), zt(e, "optin", (e) => e.def.innerType._zod.optin === "defaulted" ? "defaulted" : "optional"), e._zod.optout = "optional", zt(e, "values", (e) => {
		let t = e.def.innerType._zod.values;
		return t ? /* @__PURE__ */ new Set([...t, void 0]) : void 0;
	}), zt(e, "pattern", (e) => {
		let t = e.def.innerType._zod.pattern;
		return t ? RegExp(`^(${nt(t.source)})?$`) : void 0;
	}), e._zod.parse = (e, n) => {
		if (e.value === void 0) {
			if (t.innerType._zod.optin !== "defaulted") return e;
			let r = t.innerType._zod.run({
				value: e.value,
				issues: []
			}, n);
			return r instanceof Promise ? r.then((t) => zn(e, t)) : zn(e, r);
		}
		return t.innerType._zod.run(e, n);
	};
}), Vn = /*@__PURE__*/ H("$ZodNullable", (e, t) => {
	hn.init(e, t), zt(e, "optin", (e) => e.def.innerType._zod.optin), zt(e, "optout", (e) => e.def.innerType._zod.optout), zt(e, "pattern", (e) => {
		let t = e.def.innerType._zod.pattern;
		return t ? RegExp(`^(${nt(t.source)}|null)$`) : void 0;
	}), zt(e, "values", (e) => e.def.innerType._zod.values ? /* @__PURE__ */ new Set([...e.def.innerType._zod.values, null]) : void 0), e._zod.parse = (e, n) => e.value === null ? e : t.innerType._zod.run(e, n);
});
// node_modules/zod/v4/core/api.js
function Hn(e) {
	return e.checks &&= [...e.checks], e;
}
// @__NO_SIDE_EFFECTS__
function Un(e, t) {
	return new e(Hn({
		type: "string",
		..._t(t)
	}));
}
// @__NO_SIDE_EFFECTS__
function Wn(e, t) {
	return new e(Hn({
		type: "number",
		checks: [],
		..._t(t)
	}));
}
// @__NO_SIDE_EFFECTS__
function Gn(e, t) {
	return new e({
		type: "boolean",
		..._t(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Kn(e, t) {
	return new e({
		type: "never",
		..._t(t)
	});
}
// @__NO_SIDE_EFFECTS__
function qn(e, t) {
	return new dn({
		check: "max_length",
		..._t(t),
		maximum: e
	});
}
// @__NO_SIDE_EFFECTS__
function Jn(e, t) {
	return new fn({
		check: "min_length",
		..._t(t),
		minimum: e
	});
}
// @__NO_SIDE_EFFECTS__
function Yn(e, t) {
	return new pn({
		check: "string_format",
		format: "starts_with",
		..._t(t),
		prefix: e
	});
}
// node_modules/zod/v4/mini/schemas.js
var Xn = /*@__PURE__*/ H("ZodMiniType", (e, t) => {
	if (!e._zod) throw Error("Uninitialized schema in ZodMiniType.");
	hn.init(e, t), e.def = t, e.type = t.type;
}, {
	get with() {
		return this.check;
	},
	set with(e) {
		Mt(this, "with", e);
	},
	parse(e, t) {
		return en(this, e, t, { callee: this.parse });
	},
	parseAsync(e, t) {
		return tn(this, e, t, { callee: this.parseAsync });
	},
	safeParse(e, t) {
		return nn(this, e, t);
	},
	safeParseAsync(e, t) {
		return an(this, e, t);
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
		return gt(this, e, t);
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
}), Zn = /*@__PURE__*/ H("ZodMiniString", (e, t) => {
	yn.init(e, t), Xn.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function U(e) {
	return /* @__PURE__ */ Un(Zn, e);
}
var Qn = /*@__PURE__*/ H("ZodMiniNumber", (e, t) => {
	bn.init(e, t), Xn.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function $n(e) {
	return /* @__PURE__ */ Wn(Qn, e);
}
var er = /*@__PURE__*/ H("ZodMiniBoolean", (e, t) => {
	xn.init(e, t), Xn.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function tr(e) {
	return /* @__PURE__ */ Gn(er, e);
}
var nr = /*@__PURE__*/ H("ZodMiniNever", (e, t) => {
	Sn.init(e, t), Xn.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function rr(e) {
	return /* @__PURE__ */ Kn(nr, e);
}
var ir = /*@__PURE__*/ H("ZodMiniArray", (e, t) => {
	En.init(e, t), Xn.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function W(e, t) {
	return new ir({
		type: "array",
		element: e,
		..._t(t)
	});
}
var ar = /*@__PURE__*/ H("ZodMiniObject", (e, t) => {
	jn.init(e, t), Xn.init(e, t), Bt(e, "shape", (e) => e._zod.def.shape, !1);
});
// @__NO_SIDE_EFFECTS__
function G(e, t) {
	return new ar({
		type: "object",
		shape: e ?? {},
		..._t(t)
	});
}
// @__NO_SIDE_EFFECTS__
function or(e, t) {
	return yt(e, t);
}
var sr = /*@__PURE__*/ H("ZodMiniUnion", (e, t) => {
	Nn.init(e, t), Xn.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function cr(e, t) {
	return new sr({
		type: "union",
		options: e,
		..._t(t)
	});
}
var lr = /*@__PURE__*/ H("ZodMiniDiscriminatedUnion", (e, t) => {
	Fn.init(e, t), Xn.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function ur(e, t, n) {
	return new lr({
		type: "union",
		options: t,
		discriminator: e,
		..._t(n)
	});
}
var dr = /*@__PURE__*/ H("ZodMiniRecord", (e, t) => {
	In.init(e, t), Xn.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function fr(e, t, n) {
	return !t || !t._zod ? new dr({
		type: "record",
		keyType: /* @__PURE__ */ U(),
		valueType: e,
		..._t(t)
	}) : new dr({
		type: "record",
		keyType: e,
		valueType: t,
		..._t(n)
	});
}
var pr = /*@__PURE__*/ H("ZodMiniEnum", (e, t) => {
	Ln.init(e, t), Xn.init(e, t), e.options = [...e._zod.values];
});
// @__NO_SIDE_EFFECTS__
function mr(e, t) {
	return new pr({
		type: "enum",
		entries: Array.isArray(e) ? Object.fromEntries(e.map((e) => [e, e])) : e,
		..._t(t)
	});
}
var hr = /*@__PURE__*/ H("ZodMiniLiteral", (e, t) => {
	Rn.init(e, t), Xn.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function K(e, t) {
	return new hr({
		type: "literal",
		values: Array.isArray(e) ? e : [e],
		..._t(t)
	});
}
var gr = /*@__PURE__*/ H("ZodMiniOptional", (e, t) => {
	Bn.init(e, t), Xn.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function q(e) {
	return new gr({
		type: "optional",
		innerType: e
	});
}
var _r = /*@__PURE__*/ H("ZodMiniNullable", (e, t) => {
	Vn.init(e, t), Xn.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function vr(e) {
	return new _r({
		type: "nullable",
		innerType: e
	});
}
// shared/room.ts
var J = /* @__PURE__ */ U(), Y = /* @__PURE__ */ $n(), yr = /* @__PURE__ */ tr(), X = (e) => /* @__PURE__ */ q(e), Z = (e) => /* @__PURE__ */ q(/* @__PURE__ */ vr(e)), br = /* @__PURE__ */ W(J), xr = [
	"todo",
	"doing",
	"review",
	"done"
], Sr = /* @__PURE__ */ G({
	title: J,
	owner: J,
	summary: Z(J),
	folder: Z(J)
}), Cr = /* @__PURE__ */ G({
	title: J,
	tasks: br,
	why: X(J)
}), wr = /* @__PURE__ */ G({
	id: Y,
	text: J,
	who: J,
	kind: J,
	ts: Y
}), Tr = /* @__PURE__ */ G({
	id: J,
	kind: J,
	ref: J,
	title: X(J),
	author: X(J),
	ts: X(Y)
}), Er = /* @__PURE__ */ G({
	id: J,
	question: J,
	options: br,
	multi: yr,
	closed: yr,
	author: J,
	votes: /* @__PURE__ */ W(br)
}), Dr = /* @__PURE__ */ G({
	id: J,
	title: J,
	done: yr,
	status: /* @__PURE__ */ mr(xr),
	owner: Z(J),
	due: Z(J),
	flags: X(br),
	epic_id: X(J)
}), Or = /* @__PURE__ */ G({
	id: J,
	title: J,
	tasks: /* @__PURE__ */ W(Dr),
	archived: X(yr),
	owner: Z(J),
	from_msg: Z(Y),
	parent: Z(J),
	kept: X(yr),
	files: X(/* @__PURE__ */ W(/* @__PURE__ */ G({
		id: J,
		name: J,
		type: J,
		n: Y
	}))),
	flags: X(br),
	prod: Z(/* @__PURE__ */ G({
		stage: J,
		note: X(J),
		at: X(Y)
	}))
}), kr = /* @__PURE__ */ G({
	id: J,
	name: J,
	type: J,
	size: Y,
	author: J,
	ts: Y,
	embed: X(yr)
}), Ar = /* @__PURE__ */ G({
	id: Y,
	thread: J,
	author: J,
	ts: Y,
	text: J,
	kind: Z(J),
	tag: Z(J),
	via: Z(J),
	reply_to: Z(Y),
	choices: Z(J),
	poll: Z(J),
	card: Z(J),
	quiet: X(yr),
	cut: X(yr),
	for_who: Z(J),
	files: X(/* @__PURE__ */ W(kr))
}), jr = /* @__PURE__ */ G({
	msg_id: Y,
	agent: X(J),
	email: J,
	who: J,
	status: J,
	ts: Y,
	note: Z(J)
}), Mr = /* @__PURE__ */ G({
	id: J,
	name: Z(J),
	text: J,
	owner: J,
	enabled: yr,
	error: Z(J),
	every: Z(J),
	cron: Z(J),
	next_at: Z(Y),
	thread: X(J),
	tz: X(J),
	file_id: Z(J)
}), Nr = /* @__PURE__ */ G({
	email: J,
	name: Z(J),
	ts: Y
}), Pr = /* @__PURE__ */ G({
	email: J,
	who: J,
	read: Y,
	delivered: Y,
	agent: X(J),
	ts: X(Y)
}), Fr = /* @__PURE__ */ G({
	me: J,
	book: Sr,
	messages: /* @__PURE__ */ W(Ar),
	epics: /* @__PURE__ */ W(Or),
	roomTasks: X(/* @__PURE__ */ W(Dr)),
	members: br,
	online: br,
	names: X(/* @__PURE__ */ fr(J, J)),
	avatars: X(/* @__PURE__ */ fr(J, Y)),
	pending: X(br),
	requests: X(/* @__PURE__ */ W(Nr)),
	suggestions: /* @__PURE__ */ W(Cr),
	files: X(/* @__PURE__ */ W(kr)),
	filesN: X(Y),
	filesAll: X(yr),
	reminders: X(/* @__PURE__ */ W(Mr)),
	acks: X(/* @__PURE__ */ W(jr)),
	receipts: X(/* @__PURE__ */ W(Pr)),
	counts: X(/* @__PURE__ */ fr(J, Y)),
	countsAt: X(Y),
	full: X(br),
	complete: X(yr),
	origins: X(/* @__PURE__ */ W(Ar)),
	docs: X(/* @__PURE__ */ fr(J, J)),
	doc: X(J),
	docNotes: X(br),
	decisions: X(/* @__PURE__ */ W(wr)),
	pins: X(/* @__PURE__ */ W(Tr)),
	polls: X(/* @__PURE__ */ fr(J, Er))
}), Ir = {
	todo: "A fazer",
	doing: "Fazendo",
	review: "Esperando OK",
	done: "Feito"
}, Lr = xr.map((e) => ({
	value: e,
	label: Ir[e]
}));
function Rr(e, t) {
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
function zr() {
	try {
		return localStorage.getItem("vb.boardMode") === "list" ? "list" : "board";
	} catch {
		return "board";
	}
}
function Br(e, t) {
	return Lr[Lr.findIndex((t) => t.value === e) + t]?.value;
}
function Vr(e) {
	return Lr.some((t) => t.value === e);
}
// svelte/features/board/BoardPanel.svelte
var Hr = a("<!> ", 1), Ur = a("<!><span> </span>", 1), Wr = a("<span class=\"tw:inline-flex tw:items-center tw:gap-1\"><!> </span>"), Gr = a("<span data-board-drag=\"\" draggable=\"true\" aria-hidden=\"true\" class=\"tw:absolute tw:right-2 tw:top-2 tw:grid tw:size-7 tw:cursor-grab tw:place-items-center tw:rounded-md tw:text-muted-foreground tw:active:cursor-grabbing\"><!></span>"), Kr = a("<article><button type=\"button\" data-board-open=\"\"><span> </span> <!> <span class=\"tw:flex tw:flex-wrap tw:items-center tw:gap-2 tw:text-xs tw:text-muted-foreground\"><!> <!> <!></span></button> <!> <div><!> <!></div></article>"), qr = a("<p class=\"tw:m-0 tw:py-4 tw:text-xs tw:text-muted-foreground\"> </p>"), Jr = a("<section><h3 class=\"tw:m-0 tw:flex tw:items-center tw:justify-between tw:gap-2 tw:font-sans tw:text-sm tw:font-semibold tw:leading-5 tw:tracking-normal\"> <!></h3> <div class=\"tw:space-y-3\"></div></section>"), Yr = a("<div class=\"tw:h-full tw:min-h-0 tw:min-w-0 tw:overflow-auto tw:pb-2\"><div class=\"tw:grid tw:grid-cols-[repeat(4,minmax(15rem,1fr))] tw:gap-3\"></div></div>"), Xr = a("<section class=\"tw:space-y-2\"><h3 class=\"tw:m-0 tw:flex tw:items-center tw:gap-2 tw:font-sans tw:text-sm tw:font-semibold tw:leading-5 tw:tracking-normal\"> <!></h3> <!></section>"), Zr = a("<div class=\"tw:h-full tw:min-h-0 tw:space-y-5 tw:overflow-auto\"><!> <!></div>"), Qr = a("<div class=\"tw:min-w-32 tw:flex-1 tw:space-y-1\"><!> <!></div>"), $r = a("<section data-vb-native=\"\" class=\"tw:m-0 tw:box-border tw:flex tw:min-h-0 tw:min-w-0 tw:flex-1 tw:flex-col tw:gap-3 tw:rounded-surface tw:bg-background tw:p-3 tw:font-sans tw:text-sm tw:text-foreground\"><p class=\"tw:m-0 tw:text-xs tw:text-muted-foreground\"> </p> <!> <p role=\"status\" aria-live=\"polite\" class=\"tw:sr-only\"> </p> <p class=\"tw:sr-only\"> </p> <!> <form class=\"tw:flex tw:shrink-0 tw:flex-wrap tw:items-end tw:gap-2\" data-board-add=\"\"><div class=\"tw:min-w-36 tw:flex-1 tw:space-y-1\"><!> <!></div> <!> <!></form></section>");
function ei(e, n) {
	let a = _();
	b(n, !0);
	let f = (e, o = Ce, s = Ce, u = Ce) => {
		var d = Kr(), f = r(d), m = r(f), _ = l(m, !0), y = w(m, 2), b = (e) => {
			{
				let t = k(() => `@vibe: ${o().flags.join(" · ")}`);
				ve(e, {
					variant: "warning",
					get title() {
						return v(t);
					},
					children: (e, t) => {
						var n = Hr(), r = T(n);
						ae(r, {
							name: "warning",
							class: "tw:size-3"
						});
						var a = w(r, 1, !0);
						h((e) => i(a, e), [() => o().flags.join(" · ")]), C(e, n);
					},
					$$slots: { default: !0 }
				});
			}
		};
		V(y, (e) => {
			o().flags?.length && e(b);
		});
		var x = w(y, 2), S = r(x);
		ve(S, {
			children: (e, n) => {
				t();
				var r = z();
				h(() => i(r, o().epicTitle)), C(e, r);
			},
			$$slots: { default: !0 }
		});
		var E = w(S, 2), D = (e) => {
			var t = Ur(), r = T(t);
			{
				let e = k(() => n.vb.name(o().owner)), t = k(() => `/api/avatar/${encodeURIComponent(o().owner)}`);
				p(r, {
					get name() {
						return v(e);
					},
					get src() {
						return v(t);
					},
					class: "tw:size-6"
				});
			}
			var a = w(r), s = l(a, !0);
			h((e) => i(s, e), [() => o().owner === n.room.me ? n.vb.t("você") : n.vb.name(o().owner)]), C(e, t);
		};
		V(E, (e) => {
			o().owner && e(D);
		});
		var O = w(E, 2), A = (e) => {
			var t = Wr(), n = r(t);
			ae(n, {
				name: "calendar",
				class: "tw:size-3"
			});
			var a = w(n, 1, !0);
			L(t), h(() => i(a, o().due)), C(e, t);
		};
		V(O, (e) => {
			o().due && e(A);
		}), L(x), L(f);
		var j = w(f, 2), M = (e) => {
			var t = Gr(), i = r(t);
			ae(i, { name: "grip" }), L(t), h((e) => B(t, "title", e), [() => n.vb.t("Arraste, ou use ← →. Clique pra abrir o épico.")]), C(e, t);
		};
		V(j, (e) => {
			u() || e(M);
		});
		var P = w(j, 2), te = r(P);
		{
			let e = k(() => `${a}-${s()}`);
			de(te, {
				get for() {
					return v(e);
				},
				children: (e, r) => {
					t();
					var a = z();
					h((e) => i(a, e), [() => n.vb.t("Status")]), C(e, a);
				},
				$$slots: { default: !0 }
			});
		}
		var I = w(te, 2);
		{
			let e = k(() => `${a}-${s()}`), t = k(() => `${n.vb.t("Status")}: ${o().title}`);
			ee(I, {
				get id() {
					return v(e);
				},
				get "aria-label"() {
					return v(t);
				},
				get value() {
					return o().status;
				},
				get items() {
					return v(oe);
				},
				onValueChange: (e) => (Vr(e) && we(o(), e, s()), !1)
			});
		}
		L(P), L(d), ue(d, (e, t) => xe?.(e, t), s), h((e, t, n, r) => {
			B(d, "data-board-task", o().id), B(d, "data-status", o().status), B(d, "draggable", !u()), ie(d, 1, e), B(f, "data-epic", o().epicId), B(f, "aria-describedby", `${a}-keys`), ie(f, 1, t), ie(m, 1, n), i(_, o().title), ie(P, 1, r);
		}, [
			() => ge(_e("tw:relative tw:min-w-0 tw:rounded-control tw:border tw:border-border tw:bg-card tw:text-card-foreground tw:shadow-xs", u() && "tw:flex tw:flex-wrap tw:items-center", v(F) === o().id && "tw:opacity-50", o().status !== "done" && o().owner === n.room.me && "tw:ring-1 tw:ring-ring/20")),
			() => ge(_e("tw:block tw:w-full tw:min-w-0 tw:flex-1 tw:space-y-2 tw:rounded-control tw:border-0 tw:bg-transparent tw:p-3 tw:text-left tw:font-sans tw:text-sm tw:text-card-foreground tw:outline-none tw:hover:bg-accent tw:focus-visible:ring-2 tw:focus-visible:ring-ring", !u() && "tw:pr-10")),
			() => ge(_e("tw:block tw:break-words tw:font-medium", o().status === "done" && "tw:line-through")),
			() => ge(_e("tw:min-w-32 tw:space-y-1 tw:p-3", !u() && "tw:border-t tw:border-border"))
		]), g("dragstart", d, (e) => {
			e.target instanceof Element && e.target.closest("select") ? e.preventDefault() : (e.dataTransfer && (e.dataTransfer.setData("application/x-vibebook-task", o().id), e.dataTransfer.effectAllowed = "move", e.dataTransfer.setDragImage(e.currentTarget, 20, 20)), c(F, o().id, !0));
		}), g("dragend", d, () => {
			c(F, null), c(N, null);
		}), R("click", f, () => n.onopen?.(o().epicId)), R("keydown", f, (e) => Oe(e, o(), s())), C(e, d);
	}, y = k(() => Rr(n.room, n.thread)), S = m(E(zr())), D = m(""), O = m(null), A = m(""), M = m(""), N = m(null), F = m(null), I = m(E(u(() => v(y).targets.find((e) => e.id === v(y).scope) ?? v(y).targets.find((e) => e.id !== "main") ?? v(y).targets[0] ?? {
		id: n.thread,
		title: n.thread
	}))), ne = k(() => v(y).targets.some((e) => e.id === v(I).id)), re = k(() => [...v(ne) ? [] : [{
		value: v(I).id,
		label: v(I).title,
		disabled: !0
	}], ...v(y).targets.map((e) => ({
		value: e.id,
		label: e.title
	}))]), oe = k(() => Lr.map((e) => ({
		value: e.value,
		label: n.vb.t(e.label)
	}))), se = k(() => v(y).groups.map((e) => ({
		...e,
		tasks: e.tasks.filter((e) => e.status !== "done")
	})).filter((e) => e.tasks.length)), le = k(() => v(y).tasks.filter((e) => e.owner === n.room.me && e.status !== "done")), fe = /* @__PURE__ */ new Map(), pe = 0, he = !1, ye = m(null);
	d(() => {
		he = !0, pe++, fe.clear();
	});
	function xe(e, t) {
		return fe.set(t, e), { destroy() {
			fe.get(t) === e && fe.delete(t);
		} };
	}
	function Se(e) {
		try {
			if (n.send(e)) return c(A, ""), !0;
		} catch {}
		return c(A, n.vb.t("Não deu pra enviar agora. Tente de novo."), !0), !1;
	}
	function we(e, t, n) {
		if (e.status === t) return !0;
		let r = document.activeElement, i = r instanceof HTMLElement && fe.get(n)?.contains(r) ? r : null;
		return Se({
			t: "task.status",
			id: e.id,
			status: t
		}) ? (c(ye, {
			id: e.id,
			status: t,
			generation: ++pe,
			...i ? { focus: {
				key: n,
				node: i,
				selector: i.matches("select") ? "select" : "[data-board-open]"
			} } : {}
		}, !0), !0) : !1;
	}
	x(() => {
		let e = v(ye);
		if (!e) return;
		let t = [...n.room.roomTasks ?? [], ...n.room.epics.flatMap((e) => e.tasks)].find((t) => t.id === e.id);
		t ? t.status === e.status && (c(ye, null), c(M, `${t.title}: ${n.vb.t(Lr.find((e) => e.value === t.status)?.label ?? t.status)}`), Te(e)) : (c(ye, null), Te(e));
	});
	function Te(e) {
		let t = e.focus;
		!t || document.activeElement !== t.node && document.activeElement !== document.body || s().then(() => {
			if (he || e.generation !== pe || document.activeElement !== t.node && document.activeElement !== document.body) return;
			let n = fe.get(t.key)?.querySelector(t.selector) ?? v(O);
			n?.focus({ preventScroll: !0 }), n?.scrollIntoView({
				block: "nearest",
				inline: "nearest"
			});
		});
	}
	function De(e) {
		if (e === "board" || e === "list") {
			c(S, e, !0), pe++, c(ye, null);
			try {
				localStorage.setItem("vb.boardMode", e);
			} catch {}
		}
	}
	function Oe(e, t, n) {
		let r = e.key === "ArrowRight" ? Br(t.status, 1) : e.key === "ArrowLeft" ? Br(t.status, -1) : void 0;
		r && (e.preventDefault(), we(t, r, n));
	}
	function ke(e, t) {
		e.preventDefault(), c(N, null);
		let n = e.dataTransfer?.getData("application/x-vibebook-task"), r = v(y).tasks.find((e) => e.id === n);
		c(F, null), r && we(r, t, `board:${r.id}`);
	}
	function Ae(e) {
		e.preventDefault(), v(D).trim() && (v(ne) ? Se({
			t: "task.add",
			epic: v(I).id,
			title: v(D).trim()
		}) && c(D, "") : c(A, n.vb.t("Escolha um épico."), !0));
	}
	var je = $r(), Me = r(je), Ne = l(Me, !0), Pe = w(Me, 2), Fe = (e) => {
		{
			let t = k(() => v(y).missingScope ? n.vb.t("Épico não encontrado.") : v(ne) ? v(A) : n.vb.t("Escolha um épico."));
			be(e, {
				get title() {
					return v(t);
				},
				compact: !0
			});
		}
	};
	V(Pe, (e) => {
		(v(y).missingScope || !v(ne) || v(A)) && e(Fe);
	});
	var Ie = w(Pe, 2), Le = l(Ie, !0), Re = w(Ie, 2), ze = l(Re, !0), Be = w(Re, 2);
	{
		let e = (e, a = Ce) => {
			var s = o(), u = T(s), d = (e) => {
				var s = o(), u = T(s), d = (e) => {
					var a = Yr(), o = r(a);
					Ee(o, 21, () => Lr, (e) => e.value, (e, a) => {
						let o = k(() => v(y).tasks.filter((e) => e.status === v(a).value));
						var s = Jr(), u = r(s), d = r(u, !0), p = w(d);
						ve(p, {
							children: (e, n) => {
								t();
								var r = z();
								h(() => i(r, v(o).length)), C(e, r);
							},
							$$slots: { default: !0 }
						}), L(u);
						var m = w(u, 2);
						Ee(m, 21, () => v(o), (e) => e.id, (e, t) => {
							f(e, () => v(t), () => `board:${v(t).id}`, () => !1);
						}, (e) => {
							var t = qr(), r = l(t, !0);
							h((e) => i(r, e), [() => n.vb.t(v(a).value === "todo" ? "Nada a fazer." : "Arraste um card pra cá.")]), C(e, t);
						}), L(m), L(s), h((e, t, n) => {
							B(s, "data-lane", v(a).value), B(s, "aria-label", e), ie(s, 1, t), i(d, n);
						}, [
							() => n.vb.t(v(a).label),
							() => ge(_e("tw:min-w-0 tw:space-y-3 tw:rounded-surface tw:border tw:border-border tw:bg-muted/40 tw:p-3", v(N) === v(a).value && "tw:ring-2 tw:ring-ring")),
							() => n.vb.t(v(a).label)
						]), g("dragover", s, (e) => {
							e.dataTransfer?.types.includes("application/x-vibebook-task") && (e.preventDefault(), c(N, v(a).value, !0));
						}), g("dragleave", s, () => {
							c(N, null);
						}), g("drop", s, (e) => ke(e, v(a).value)), C(e, s);
					}), L(o), L(a), C(e, a);
				}, p = (e) => {
					var a = Zr(), o = r(a), s = (e) => {
						var a = Xr(), o = r(a), s = r(o, !0), c = w(s);
						ve(c, {
							variant: "warning",
							children: (e, n) => {
								t();
								var r = z();
								h(() => i(r, v(le).length)), C(e, r);
							},
							$$slots: { default: !0 }
						}), L(o);
						var l = w(o, 2);
						Ee(l, 17, () => v(le), (e) => e.id, (e, t) => {
							f(e, () => v(t), () => `mine:${v(t).id}`, () => !0);
						}), L(a), h((e, t) => {
							B(a, "aria-label", e), i(s, t);
						}, [() => n.vb.t("Esperando você"), () => n.vb.t("Esperando você")]), C(e, a);
					};
					V(o, (e) => {
						v(le).length && e(s);
					});
					var c = w(o, 2);
					Ee(c, 17, () => v(se), (e) => e.id, (e, n) => {
						var a = Xr(), o = r(a), s = r(o, !0), c = w(s);
						ve(c, {
							children: (e, r) => {
								t();
								var a = z();
								h(() => i(a, v(n).tasks.length)), C(e, a);
							},
							$$slots: { default: !0 }
						}), L(o);
						var l = w(o, 2);
						Ee(l, 17, () => v(n).tasks, (e) => e.id, (e, t) => {
							f(e, () => v(t), () => `group:${v(t).id}`, () => !0);
						}), L(a), h(() => {
							B(a, "aria-label", v(n).title), i(s, v(n).title);
						}), C(e, a);
					}, (e) => {
						{
							let t = k(() => n.vb.t("Nenhuma tarefa aberta."));
							P(e, { get title() {
								return v(t);
							} });
						}
					}), L(a), C(e, a);
				};
				V(u, (e) => {
					a() === "board" ? e(d) : e(p, -1);
				}), C(e, s);
			};
			V(u, (e) => {
				a() === v(S) && e(d);
			}), C(e, s);
		}, a = k(() => n.vb.t("Quadro de tarefas")), s = k(() => [{
			value: "board",
			label: n.vb.t("Quadro")
		}, {
			value: "list",
			label: n.vb.t("Lista")
		}]);
		ce(Be, {
			class: "tw:flex-1 tw:overflow-hidden",
			get label() {
				return v(a);
			},
			get items() {
				return v(s);
			},
			get value() {
				return v(S);
			},
			onValueChange: De,
			children: e,
			$$slots: { default: !0 }
		});
	}
	var Ve = w(Be, 2), He = r(Ve), Ue = r(He);
	{
		let e = k(() => `${a}-title`);
		de(Ue, {
			get for() {
				return v(e);
			},
			children: (e, r) => {
				t();
				var a = z();
				h((e) => i(a, e), [() => n.vb.t("Nova tarefa")]), C(e, a);
			},
			$$slots: { default: !0 }
		});
	}
	var We = w(Ue, 2);
	{
		let e = k(() => `${a}-title`), t = k(() => n.vb.t("nova tarefa"));
		me(We, {
			get id() {
				return v(e);
			},
			get placeholder() {
				return v(t);
			},
			get ref() {
				return v(O);
			},
			set ref(e) {
				c(O, e, !0);
			},
			get value() {
				return v(D);
			},
			set value(e) {
				c(D, e, !0);
			}
		});
	}
	L(He);
	var Ge = w(He, 2), Ke = (e) => {
		var o = Qr(), s = r(o);
		{
			let e = k(() => `${a}-epic`);
			de(s, {
				get for() {
					return v(e);
				},
				children: (e, r) => {
					t();
					var a = z();
					h((e) => i(a, e), [() => n.vb.t("Épico")]), C(e, a);
				},
				$$slots: { default: !0 }
			});
		}
		var l = w(s, 2);
		{
			let e = k(() => `${a}-epic`), t = k(() => !v(ne));
			ee(l, {
				get id() {
					return v(e);
				},
				get "aria-invalid"() {
					return v(t);
				},
				get items() {
					return v(re);
				},
				get value() {
					return v(I).id;
				},
				onValueChange: (e) => {
					let t = v(y).targets.find((t) => t.id === e);
					if (!t) return !1;
					c(I, t, !0), c(A, "");
				}
			});
		}
		L(o), C(e, o);
	};
	V(Ge, (e) => {
		v(y).scope || e(Ke);
	});
	var qe = w(Ge, 2);
	{
		let e = k(() => !v(D).trim() || !v(ne));
		te(qe, {
			type: "submit",
			get disabled() {
				return v(e);
			},
			children: (e, t) => {
				var r = Hr(), a = T(r);
				ae(a, { name: "plus" });
				var o = w(a, 1, !0);
				h((e) => i(o, e), [() => n.vb.t("Nova tarefa")]), C(e, r);
			},
			$$slots: { default: !0 }
		});
	}
	L(Ve), L(je), h((e, t, n) => {
		B(je, "data-board-scope", v(y).scope ?? "all"), B(je, "aria-label", e), i(Ne, t), i(Le, v(M)), B(Re, "id", `${a}-keys`), i(ze, n);
	}, [
		() => n.vb.t("Quadro de tarefas"),
		() => v(y).title ?? (v(y).scope ? v(I).title : n.vb.t("Todos os épicos")),
		() => n.vb.t("Arraste, ou use ← →. Clique pra abrir o épico.")
	]), g("submit", Ve, Ae), C(e, je), j();
}
n(["click", "keydown"]);
// svelte/Board.svelte
var ti = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy"
]);
function ni(e, t) {
	b(t, !0);
	let n = A(t, ti);
	var r = o(), i = T(r);
	N(i, () => JSON.stringify([t.room.id, t.thread]), (e) => {
		ei(e, y(() => n));
	}), C(e, r), j();
}
// svelte/panels.ts
var ri = (e) => e.type.startsWith("image/") ? "img" : e.type.startsWith("audio/") ? "audio" : e.type === "text/html" ? "html" : e.type === "application/pdf" ? "pdf" : /\.md$/i.test(e.name) || e.type === "text/markdown" ? "md" : e.type === "text/plain" || e.type === "text/csv" ? "txt" : "other", ii = (e) => e > 1e6 ? `${(e / 1e6).toFixed(1)} MB` : `${Math.max(1, Math.round(e / 1e3))} KB`, ai = a("<button type=\"button\"> <small> </small></button>"), oi = a("<div class=\"ftabs\"></div>"), si = a("<div class=\"fcrumb\"><button type=\"button\" class=\"ghost\"> </button><b><!> </b></div>"), ci = a("<button type=\"button\" class=\"ftile fdir\"><div class=\"thumb\"></div> <b> </b><small> </small></button>"), li = a("<img loading=\"lazy\"/>"), ui = a("<a class=\"ftile\" target=\"_blank\" rel=\"noopener\"><div class=\"thumb\"><!></div> <b> </b><small> </small> <button type=\"button\" data-pin-kind=\"file\"></button></a>"), di = a("<div class=\"empty\"> </div>"), fi = a("<!> <!> <div class=\"fgrid\"><!> <!></div> <!>", 1);
function pi(e, t) {
	b(t, !0);
	let n = [
		["all", "Tudo"],
		["img", "Imagens"],
		["md", "Markdown"],
		["txt", "Texto e CSV"],
		["html", "HTML"],
		["pdf", "PDF"],
		["audio", "Áudios"],
		["other", "Outros"]
	], a = m("all"), s = m(""), u = k(() => t.room.files || []), d = k(() => {
		let e = { all: v(u).length };
		for (let t of v(u)) {
			let n = ri(t);
			e[n] = (e[n] || 0) + 1;
		}
		return e;
	}), f = k(() => v(d)[v(a)] ? v(a) : "all"), p = k(() => v(u).filter((e) => v(f) === "all" || ri(e) === v(f))), g = (e) => e.name.includes("/") ? e.name.slice(0, e.name.lastIndexOf("/")) : "", _ = k(() => v(s) && v(p).some((e) => g(e) === v(s) || g(e).startsWith(v(s) + "/")) ? v(s) : ""), y = k(() => v(_) ? v(_) + "/" : "");
	x(() => {
		v(d)[v(a)] || c(a, "all"), v(s) && v(_) !== v(s) && c(s, "");
	});
	function S(e, t) {
		c(s, t, !0);
		let n = e.currentTarget.closest("#filesPane");
		n && (n.scrollTop = 0);
	}
	let E = k(() => {
		let e = /* @__PURE__ */ new Map(), t = [];
		for (let n of v(p)) {
			let r = g(n);
			if (r === v(_)) t.push(n);
			else if (r.startsWith(v(y))) {
				let t = r.slice(v(y).length).split("/")[0];
				e.set(t, (e.get(t) || 0) + 1);
			}
		}
		let n = {};
		if (v(_)) for (let e of t) n[e.name] = (n[e.name] || 0) + 1;
		return {
			dirs: [...e].sort((e, t) => e[0].localeCompare(t[0])),
			list: v(_) ? t.filter((e, n) => t.findIndex((t) => t.name === e.name) === n) : t,
			versions: n
		};
	}), D = (e) => `/api/books/${t.room.id}/files/${e.id}`, O = (e) => t.room.pins?.find((t) => t.kind === "file" && t.ref === e.id);
	function A(e, n) {
		e.preventDefault(), e.stopPropagation();
		let r = O(n);
		t.send(r ? {
			t: "pin.del",
			id: r.id
		} : {
			t: "pin.add",
			kind: "file",
			ref: n.id
		});
	}
	var ee = o(), N = T(ee), P = (e) => {
		var s = fi(), u = T(s), p = (e) => {
			var o = oi();
			Ee(o, 21, () => n.filter(([e]) => v(d)[e]), Oe, (e, n) => {
				var o = k(() => fe(v(n), 2));
				let s = () => v(o)[0], u = () => v(o)[1];
				var p = ai();
				let m;
				var g = r(p), _ = w(g), y = l(_, !0);
				L(p), h((e) => {
					m = ie(p, 1, "ftab", null, m, { on: s() === v(f) }), B(p, "data-fkind", s()), i(g, `${e ?? ""} `), i(y, v(d)[s()]);
				}, [() => t.vb.t(u())]), R("click", p, () => c(a, s(), !0)), C(e, p);
			}), L(o), C(e, o);
		};
		V(u, (e) => {
			v(d).all > 1 && e(p);
		});
		var m = w(u, 2), g = (e) => {
			var n = si(), a = r(n), o = l(a), s = w(a), c = r(s);
			M(c, () => t.vb.icon("folder", 14));
			var u = w(c);
			L(s), L(n), h((e, t) => {
				B(a, "data-fdir", e), i(o, `← ${t ?? ""}`), i(u, ` ${v(_) ?? ""}/`);
			}, [() => v(_).includes("/") ? v(_).slice(0, v(_).lastIndexOf("/")) : "", () => t.vb.t("voltar")]), R("click", a, (e) => S(e, v(_).includes("/") ? v(_).slice(0, v(_).lastIndexOf("/")) : "")), C(e, n);
		};
		V(m, (e) => {
			v(_) && e(g);
		});
		var b = w(m, 2), x = r(b);
		Ee(x, 17, () => v(E).dirs, Oe, (e, n) => {
			var a = k(() => fe(v(n), 2));
			let o = () => v(a)[0], s = () => v(a)[1];
			var c = ci(), u = r(c);
			M(u, () => t.vb.icon("folder", 34), !0), L(u);
			var d = w(u, 2), f = l(d), p = w(d), m = l(p, !0);
			L(c), h((e) => {
				B(c, "data-fdir", v(y) + o()), i(f, `${o() ?? ""}/`), i(m, e);
			}, [() => s() === 1 ? t.vb.t("1 arquivo") : t.vb.t("{n} arquivos", { n: s() })]), R("click", c, (e) => S(e, v(y) + o())), C(e, c);
		});
		var j = w(x, 2);
		Ee(j, 17, () => v(E).list, (e) => e.id, (e, n) => {
			var a = ui(), s = r(a), c = r(s), u = (e) => {
				var t = li();
				h((e) => {
					B(t, "src", e), B(t, "alt", v(n).name);
				}, [() => D(v(n))]), C(e, t);
			}, d = k(() => v(n).type.startsWith("image/")), f = (e) => {
				var r = o(), i = T(r);
				M(i, () => t.vb.icon(v(n).type === "text/html" ? "globe" : v(n).type.startsWith("audio/") ? "mic" : "file", 30)), C(e, r);
			};
			V(c, (e) => {
				v(d) ? e(u) : e(f, -1);
			}), L(s);
			var p = w(s, 2), m = l(p, !0), g = w(p), _ = l(g), b = w(g, 2);
			let x;
			M(b, () => t.vb.icon("pin", 14), !0), L(b), L(a), h((e, t, r, o, s, c, l, u, d, f) => {
				B(a, "href", e), B(a, "title", v(n).name), B(a, "data-view", t), B(a, "data-name", v(n).name), i(m, r), i(_, `${o ?? ""} · ${s ?? ""} · ${c ?? ""}`), x = ie(b, 1, "ghost pinBtn", null, x, { on: l }), B(b, "data-pin-ref", v(n).id), B(b, "title", u), B(b, "aria-label", d), B(b, "aria-pressed", f);
			}, [
				() => D(v(n)),
				() => v(n).type.startsWith("image/") ? "img" : "frame",
				() => v(n).name.slice(v(y).length),
				() => t.vb.name(v(n).author),
				() => t.vb.ago(v(n).ts),
				() => v(E).versions[v(n).name] > 1 ? t.vb.t("{n} versões", { n: v(E).versions[v(n).name] }) : ii(v(n).size),
				() => !!O(v(n)),
				() => t.vb.t(O(v(n)) ? "Desafixar" : "Fixar na lateral"),
				() => t.vb.t(O(v(n)) ? "Desafixar" : "Fixar na lateral"),
				() => !!O(v(n))
			]), R("click", b, (e) => A(e, v(n))), C(e, a);
		}), L(b);
		var ee = w(b, 2), N = (e) => {
			var n = di(), r = l(n, !0);
			h((e) => i(r, e), [() => t.vb.t("Nada aqui.")]), C(e, n);
		};
		V(ee, (e) => {
			!v(E).list.length && !v(E).dirs.length && e(N);
		}), C(e, s);
	}, F = (e) => {
		var n = di(), r = l(n, !0);
		h((e) => i(r, e), [() => t.vb.t("Cole uma imagem no chat (Cmd+V), arraste um arquivo ou use o clipe. Tudo que for enviado neste vibebook fica aqui.")]), C(e, n);
	};
	V(N, (e) => {
		v(u).length ? e(P) : e(F, -1);
	}), C(e, ee), j();
}
n(["click"]);
var mi = /* @__PURE__ */ cr([/* @__PURE__ */ G({
	ok: /* @__PURE__ */ K(!0),
	id: /* @__PURE__ */ $n(),
	thread: /* @__PURE__ */ U()
}), /* @__PURE__ */ G({
	ok: /* @__PURE__ */ K(!1),
	error: /* @__PURE__ */ U()
})]), hi = /* @__PURE__ */ G({
	ok: /* @__PURE__ */ tr(),
	name: /* @__PURE__ */ q(/* @__PURE__ */ U()),
	error: /* @__PURE__ */ q(/* @__PURE__ */ U()),
	every: /* @__PURE__ */ q(/* @__PURE__ */ vr(/* @__PURE__ */ U())),
	cron: /* @__PURE__ */ q(/* @__PURE__ */ vr(/* @__PURE__ */ U())),
	timezone: /* @__PURE__ */ q(/* @__PURE__ */ U()),
	next_at: /* @__PURE__ */ q(/* @__PURE__ */ U())
}), gi = /* @__PURE__ */ G({
	id: /* @__PURE__ */ U(),
	name: /* @__PURE__ */ U(),
	type: /* @__PURE__ */ U(),
	size: /* @__PURE__ */ $n(),
	author: /* @__PURE__ */ U(),
	ts: /* @__PURE__ */ $n(),
	embed: /* @__PURE__ */ q(/* @__PURE__ */ tr())
}), _i = /* @__PURE__ */ or(gi, { reminder: /* @__PURE__ */ q(hi) }), vi = /* @__PURE__ */ G({ error: /* @__PURE__ */ U() });
(/* @__PURE__ */ U()).check(/* @__PURE__ */ Yn("https://"), /* @__PURE__ */ qn(1e3)), (/* @__PURE__ */ U()).check(/* @__PURE__ */ Jn(1)), (/* @__PURE__ */ U()).check(/* @__PURE__ */ Jn(1)), (/* @__PURE__ */ U()).check(/* @__PURE__ */ Jn(1)), (/* @__PURE__ */ U()).check(/* @__PURE__ */ Yn("m"));
var yi = /* @__PURE__ */ G({
	ok: /* @__PURE__ */ K(!0),
	icon: /* @__PURE__ */ vr(/* @__PURE__ */ $n())
}), bi = /* @__PURE__ */ U(), xi = /* @__PURE__ */ $n(), Si = /* @__PURE__ */ ur("t", [
	/* @__PURE__ */ G({
		t: /* @__PURE__ */ K("msg"),
		thread: /* @__PURE__ */ U(),
		text: /* @__PURE__ */ q(/* @__PURE__ */ U()),
		files: /* @__PURE__ */ q(/* @__PURE__ */ W(/* @__PURE__ */ U())),
		reply_to: /* @__PURE__ */ q(/* @__PURE__ */ vr(xi))
	}),
	/* @__PURE__ */ G({ t: /* @__PURE__ */ K("files.get") }),
	/* @__PURE__ */ G({
		t: /* @__PURE__ */ K("doc.get"),
		epic: /* @__PURE__ */ q(/* @__PURE__ */ vr(/* @__PURE__ */ U()))
	}),
	/* @__PURE__ */ G({
		t: /* @__PURE__ */ K("doc"),
		text: /* @__PURE__ */ U(),
		epic: /* @__PURE__ */ q(/* @__PURE__ */ vr(/* @__PURE__ */ U()))
	}),
	/* @__PURE__ */ G({
		t: /* @__PURE__ */ K("title"),
		title: /* @__PURE__ */ U()
	}),
	/* @__PURE__ */ G({
		t: /* @__PURE__ */ K("epic"),
		title: /* @__PURE__ */ U()
	}),
	/* @__PURE__ */ G({
		t: /* @__PURE__ */ K("epic.owner"),
		id: bi,
		owner: /* @__PURE__ */ U()
	}),
	/* @__PURE__ */ G({
		t: /* @__PURE__ */ K("task.add"),
		epic: /* @__PURE__ */ U(),
		title: /* @__PURE__ */ U()
	}),
	/* @__PURE__ */ G({
		t: /* @__PURE__ */ K("older"),
		thread: /* @__PURE__ */ U(),
		before: /* @__PURE__ */ q(xi)
	}),
	/* @__PURE__ */ G({
		t: /* @__PURE__ */ K("pin.add"),
		kind: /* @__PURE__ */ mr([
			"link",
			"file",
			"app"
		]),
		ref: /* @__PURE__ */ U(),
		title: /* @__PURE__ */ q(/* @__PURE__ */ U())
	}),
	/* @__PURE__ */ G({
		t: /* @__PURE__ */ K("pin.del"),
		id: bi
	}),
	/* @__PURE__ */ G({
		t: /* @__PURE__ */ K("reminder.delete"),
		id: bi
	}),
	/* @__PURE__ */ G({
		t: /* @__PURE__ */ K("ack.dismiss"),
		id: xi
	}),
	/* @__PURE__ */ G({
		t: /* @__PURE__ */ K("reminder.enable"),
		id: bi,
		on: /* @__PURE__ */ tr()
	}),
	/* @__PURE__ */ G({
		t: /* @__PURE__ */ K("task.toggle"),
		id: bi
	}),
	/* @__PURE__ */ G({
		t: /* @__PURE__ */ K("task.status"),
		id: bi,
		status: /* @__PURE__ */ mr(xr)
	}),
	/* @__PURE__ */ G({
		t: /* @__PURE__ */ K("task.rename"),
		id: bi,
		title: /* @__PURE__ */ U()
	}),
	/* @__PURE__ */ G({
		t: /* @__PURE__ */ K("task.del"),
		id: bi
	}),
	/* @__PURE__ */ G({
		t: /* @__PURE__ */ K("task.assign"),
		id: bi,
		owner: /* @__PURE__ */ q(/* @__PURE__ */ U()),
		due: /* @__PURE__ */ q(/* @__PURE__ */ U())
	}),
	/* @__PURE__ */ G({
		t: /* @__PURE__ */ K("decision.del"),
		id: xi
	}),
	/* @__PURE__ */ G({
		t: /* @__PURE__ */ K("epic.rename"),
		id: bi,
		title: /* @__PURE__ */ U()
	}),
	/* @__PURE__ */ G({
		t: /* @__PURE__ */ K("epic.del"),
		id: bi
	}),
	/* @__PURE__ */ G({
		t: /* @__PURE__ */ K("epic.archive"),
		id: bi,
		archived: /* @__PURE__ */ q(/* @__PURE__ */ tr())
	}),
	/* @__PURE__ */ G({
		t: /* @__PURE__ */ K("epic.order"),
		ids: /* @__PURE__ */ W(/* @__PURE__ */ U())
	}),
	/* @__PURE__ */ G({
		t: /* @__PURE__ */ K("poll.create"),
		thread: /* @__PURE__ */ U(),
		question: /* @__PURE__ */ U(),
		options: /* @__PURE__ */ W(/* @__PURE__ */ U()),
		multi: /* @__PURE__ */ tr()
	}),
	/* @__PURE__ */ G({
		t: /* @__PURE__ */ K("vote"),
		id: bi,
		opt: xi
	}),
	/* @__PURE__ */ G({
		t: /* @__PURE__ */ K("poll.close"),
		id: bi
	}),
	/* @__PURE__ */ G({
		t: /* @__PURE__ */ K("suggestion"),
		i: xi,
		accept: /* @__PURE__ */ q(/* @__PURE__ */ tr())
	})
]), Ci = (/* @__PURE__ */ U()).check(/* @__PURE__ */ Jn(1), /* @__PURE__ */ qn(64)), wi = /* @__PURE__ */ cr([/* @__PURE__ */ G({
	t: /* @__PURE__ */ K("result"),
	cid: Ci,
	ok: /* @__PURE__ */ K(!0)
}), /* @__PURE__ */ G({
	t: /* @__PURE__ */ K("result"),
	cid: Ci,
	ok: /* @__PURE__ */ K(!1),
	error: /* @__PURE__ */ U()
})]), Q = /* @__PURE__ */ U(), Ti = /* @__PURE__ */ $n(), Ei = /* @__PURE__ */ W(Q), $ = (e, t) => /* @__PURE__ */ G({
	t: /* @__PURE__ */ K(e),
	...t
}), Di = $("doc", {
	text: Q,
	epic: /* @__PURE__ */ q(/* @__PURE__ */ vr(Q)),
	stale: /* @__PURE__ */ q(/* @__PURE__ */ K(!1)),
	fetched: /* @__PURE__ */ q(/* @__PURE__ */ tr()),
	by: /* @__PURE__ */ q(Q)
}), Oi = $("doc", {
	epic: Q,
	stale: /* @__PURE__ */ K(!0),
	by: /* @__PURE__ */ q(Q),
	text: /* @__PURE__ */ q(/* @__PURE__ */ rr()),
	fetched: /* @__PURE__ */ q(/* @__PURE__ */ rr())
}), ki = {
	state: /* @__PURE__ */ or(Fr, { t: /* @__PURE__ */ K("state") }),
	msg: $("msg", { m: Ar }),
	moved: $("moved", {
		id: Ti,
		thread: Q
	}),
	delta: $("delta", {
		id: Ti,
		text: Q
	}),
	typing: $("typing", {
		id: Ti,
		mode: Q,
		note: /* @__PURE__ */ q(Q)
	}),
	closed: $("closed", {
		id: Ti,
		choices: Q
	}),
	epics: $("epics", {
		epics: /* @__PURE__ */ W(Or),
		roomTasks: /* @__PURE__ */ q(/* @__PURE__ */ W(Dr))
	}),
	epicsPatch: $("epicsPatch", {
		changed: /* @__PURE__ */ W(Or),
		order: Ei,
		roomTasks: /* @__PURE__ */ q(/* @__PURE__ */ W(Dr))
	}),
	doc: /* @__PURE__ */ cr([Oi, Di]),
	docNotes: $("docNotes", { notes: Ei }),
	meta: $("meta", {
		title: /* @__PURE__ */ q(Q),
		folder: /* @__PURE__ */ q(Q),
		summary: /* @__PURE__ */ q(Q)
	}),
	suggestions: $("suggestions", { suggestions: /* @__PURE__ */ W(Cr) }),
	requests: $("requests", { requests: /* @__PURE__ */ W(Nr) }),
	members: $("members", {
		members: Ei,
		pending: /* @__PURE__ */ q(Ei),
		requests: /* @__PURE__ */ q(/* @__PURE__ */ W(Nr)),
		names: /* @__PURE__ */ q(/* @__PURE__ */ fr(Q, Q)),
		avatars: /* @__PURE__ */ q(/* @__PURE__ */ fr(Q, Ti))
	}),
	files: $("files", { files: /* @__PURE__ */ W(kr) }),
	fileAdd: $("fileAdd", { file: kr }),
	reminders: $("reminders", { reminders: /* @__PURE__ */ W(Mr) }),
	decisions: $("decisions", { decisions: /* @__PURE__ */ W(wr) }),
	pins: $("pins", { pins: /* @__PURE__ */ W(Tr) }),
	receipts: $("receipts", { receipts: /* @__PURE__ */ W(Pr) }),
	older: $("older", {
		messages: /* @__PURE__ */ W(Ar),
		thread: Q,
		more: /* @__PURE__ */ tr()
	}),
	acks: $("acks", { acks: /* @__PURE__ */ W(jr) }),
	ackRows: $("ackRows", { acks: /* @__PURE__ */ W(jr) }),
	poll: $("poll", { poll: Er }),
	online: $("online", { online: Ei }),
	conns: $("conns", {}),
	error: $("error", { error: /* @__PURE__ */ q(Q) }),
	blocked: $("blocked", {
		text: Q,
		reason: Q
	}),
	result: wi
};
function Ai(e) {
	if (typeof e != "object" || !e || Array.isArray(e)) return !1;
	let t = e.t;
	return typeof t != "string" || !Object.hasOwn(ki, t) ? !1 : ki[t].safeParse(e).success;
}
// shared/validation.ts
var ji = (e) => typeof e == "object" && !!e && !Array.isArray(e), Mi = Ai;
function Ni(e) {
	if (!ji(e)) return e;
	let t = (e, t) => ji(e) && (e[t] === 0 || e[t] === 1) ? {
		...e,
		[t]: e[t] === 1
	} : e, n = (e) => Array.isArray(e) ? e.map((e) => t(e, "done")) : e, r = (e) => Array.isArray(e) ? e.map((e) => ji(e) ? {
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
function Pi(e) {
	let t = Ni(JSON.parse(e));
	if (!Mi(t)) throw TypeError("Invalid room event");
	return t;
}
function Fi(e) {
	return Si.safeParse(e).success;
}
// node_modules/hono/dist/client/utils.js
var Ii = (e, t) => (e = e.replace(/\/+$/, ""), e += "/", t = t.replace(/^\/+/, ""), e + t), Li = (e, t) => {
	for (let [n, r] of Object.entries(t)) {
		let t = RegExp("/:" + n + "(?:{[^/]+})?\\??(?=/|$)");
		e = e.replace(t, () => r ? `/${r}` : "");
	}
	return e;
}, Ri = (e) => {
	let t = new URLSearchParams();
	for (let [n, r] of Object.entries(e)) if (r !== void 0) {
		if (Array.isArray(r)) for (let e of r) e !== void 0 && t.append(n, e);
		else t.set(n, r);
	}
	return t;
}, zi = (e, t) => {
	switch (t) {
		case "ws": return e.replace(/^http/, "ws");
		case "http": return e.replace(/^ws/, "http");
	}
}, Bi = (e) => /^https?:\/\/[^\/]+?\/index(?=\?|$)/.test(e) ? e.replace(/\/index(?=\?|$)/, "/") : e.replace(/\/index(?=\?|$)/, "");
function Vi(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function Hi(e, t) {
	if (!Vi(e) && !Vi(t)) return t;
	let n = { ...e };
	for (let e in t) {
		let r = t[e];
		n[e] = Vi(n[e]) && Vi(r) ? Hi(n[e], r) : r;
	}
	return n;
}
// node_modules/hono/dist/utils/cookie.js
var Ui = /^[\w!#$%&'*.^`|~+-]+$/, Wi = (e, t, n = {}) => {
	if (!Ui.test(e)) throw Error("Invalid cookie name");
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
}, Gi = (e, t, n) => (t = encodeURIComponent(t), Wi(e, t, n)), Ki = (e, t) => new Proxy(() => {}, {
	get(n, r) {
		if (typeof r == "string" && r !== "then") return Ki(e, [...t, r]);
	},
	apply(n, r, i) {
		return e({
			path: t,
			args: i
		});
	}
}), qi = (e, t) => {
	let n = t.toString();
	return n ? `${e}?${n}` : e;
}, Ji = class {
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
			for (let [n, r] of Object.entries(e.cookie)) r !== void 0 && t.push(Gi(n, r));
			t.length > 0 && (r.Cookie = t.join("; "));
		}
		this.cType && (r["Content-Type"] = this.cType);
		let i = new Headers();
		for (let [e, t] of Object.entries(r)) t !== void 0 && i.set(e, t);
		let a = this.url;
		a = Bi(a), a = Li(a, this.pathParams), this.queryParams && (a = qi(a, this.queryParams)), n = this.method.toUpperCase();
		let o = n !== "GET" && n !== "HEAD";
		return (t?.fetch || fetch)(a, {
			body: o ? this.rBody : void 0,
			method: n,
			headers: i,
			...t?.init
		});
	};
}, Yi = (e, t) => Ki(function n(r) {
	let i = t?.buildSearchParams ?? Ri, a = [...r.path], o = a.slice(-3).reverse();
	if (o[0] === "toString") return o[1] === "name" ? o[2] || "" : n.toString();
	if (o[0] === "valueOf") return o[1] === "name" ? o[2] || "" : n;
	let s = "";
	if (/^\$/.test(o[0])) {
		let e = a.pop();
		e && (s = e.replace(/^\$/, ""));
	}
	let c = Ii(e, a.join("/"));
	if (s === "url" || s === "path") {
		let t = Bi(c);
		return r.args[0] && (r.args[0].param && (t = Li(t, r.args[0].param)), r.args[0].query && (t = qi(t, i(r.args[0].query)))), s === "url" ? new URL(t) : t.slice(e.replace(/\/+$/, "").length).replace(/^\/?/, "/");
	}
	if (s === "ws") {
		let e = Bi(c), n = zi(r.args[0]?.param ? Li(e, r.args[0].param) : e, "ws"), a = new URL(n), o = r.args[0]?.query;
		return o && i(o).forEach((e, t) => {
			a.searchParams.append(t, e);
		}), ((...e) => t?.webSocket !== void 0 && typeof t.webSocket == "function" ? t.webSocket(...e) : new WebSocket(...e))(a.toString());
	}
	let l = new Ji(c, s, { buildSearchParams: i });
	if (s) {
		t ??= {};
		let e = { ...r.args[1] }, n = t.headers, i = e.headers;
		n && i && (e.headers = async () => ({
			...typeof n == "function" ? await n() : n,
			...typeof i == "function" ? await i() : i
		}));
		let a = Hi(t, e);
		return l.fetch(r.args[0], a);
	}
	return l;
}, []), Xi = (e = "/", t) => Yi(e, t ? { fetch: t } : {});
// svelte/transport.ts
function Zi(e, t, n) {
	if (!Fi(t)) throw TypeError("Invalid room command");
	return !e || e.readyState !== 1 ? !1 : (e.send(JSON.stringify(n ? {
		...t,
		cid: n
	} : t)), !0);
}
function Qi(e) {
	if (typeof e != "string") throw TypeError("Room events must be JSON text");
	return Pi(e);
}
async function $i(e) {
	try {
		return await e.json();
	} catch (t) {
		throw e.ok ? t : Error(`HTTP ${e.status}`);
	}
}
function ea(e, t) {
	let n = vi.safeParse(t);
	return Error(n.success ? n.data.error : `HTTP ${e.status}`);
}
function ta(e, t = fetch) {
	let n = Xi("/", t).api.books[":id"], r = encodeURIComponent(e);
	return {
		async postMessage(e) {
			let t = await n.post.$post({
				param: { id: r },
				json: e
			}), i = await $i(t);
			if (t.ok || t.status === 400) {
				let e = mi.safeParse(i);
				if (e.success) return e.data;
				if (t.ok) throw TypeError("Invalid post response");
			}
			throw ea(t, i);
		},
		async uploadFile(e) {
			let t = await n.files.$post({
				param: { id: r },
				header: {
					"content-type": e.type,
					"x-filename": encodeURIComponent(e.name)
				}
			}, { init: { body: e.body } }), i = await $i(t);
			if (!t.ok) throw ea(t, i);
			let a = _i.safeParse(i);
			if (!a.success) throw TypeError(gi.safeParse(i).success ? "Invalid reminder response" : "Invalid upload response");
			return a.data;
		},
		async setIcon(e) {
			let t = await n.icon.$post({
				param: { id: r },
				header: { "content-type": e ? e.type : "application/json" }
			}, { init: { body: e ? e.body : "{}" } }), i = await $i(t);
			if (!t.ok) throw ea(t, i);
			let a = yi.safeParse(i);
			if (!a.success) throw TypeError("Invalid icon response");
			return a.data;
		}
	};
}
// svelte/Reminders.svelte
var na = a("<button class=\"primary\" id=\"remNew\"><!> </button>"), ra = a("<form class=\"remForm\" id=\"remForm\"><input name=\"name\" maxlength=\"60\" required=\"\"/> <textarea name=\"text\" required=\"\"></textarea> <div class=\"row\"><span class=\"err\" id=\"remErr\"> </span><button type=\"button\" class=\"ghost\" id=\"remCancel\"> </button><button class=\"primary\" id=\"remSave\"> </button></div></form>"), ia = a("<span class=\"err\"> </span>"), aa = a("<pre class=\"remText\"> </pre>"), oa = a("<button class=\"ghost\"></button>"), sa = a("<div><div class=\"remBody\" role=\"button\" tabindex=\"0\"><b><!> </b> <small><!> </small> <!><!></div> <!> <label class=\"sw\"><input type=\"checkbox\"/> </label> <button class=\"ghost\"></button></div>"), ca = a("<div class=\"empty\"> </div>"), la = a("<div class=\"remHead\"><p></p> <!></div> <!> <!> <!>", 1);
function ua(e, t) {
	b(t, !0);
	let n = m(null), a = m(""), o = m(!1), s = m(E([])), u = k(() => t.room.reminders || []), d = k(() => t.vb.locale || (document.documentElement.lang === "en" ? "en-US" : "pt-BR")), f = (e) => new Date(e).toLocaleString(v(d), {
		weekday: "short",
		day: "numeric",
		month: "short",
		hour: "2-digit",
		minute: "2-digit"
	});
	function p(e) {
		c(n, e, !0), c(a, "");
	}
	function _(e) {
		c(s, v(s).includes(e.id) ? v(s).filter((t) => t !== e.id) : [...v(s), e.id], !0);
	}
	async function y(e) {
		if (e.preventDefault(), !v(n) || v(o)) return;
		let r = { ...v(n) }, i = r.name.trim().replace(/\.md$/i, "").replace(/[\\/]/g, "-");
		c(o, !0), c(a, "");
		try {
			let e = await ta(t.room.id).uploadFile({
				name: `reminders/${i}.md`,
				type: "text/markdown",
				body: r.text
			});
			if (e.reminder && !e.reminder.ok) {
				c(a, `⚠ ${e.reminder.error || t.vb.t("falhou")}`), c(n, {
					...r,
					name: i,
					fixed: !0
				}, !0);
				return;
			}
			c(n, null);
		} catch (e) {
			c(a, e instanceof Error ? e.message : t.vb.t("sem conexão"), !0);
		} finally {
			c(o, !1);
		}
	}
	var x = la(), S = T(x), D = r(S);
	M(D, () => t.vb.t("Cada lembrete é um arquivo <code>reminders/&lt;nome&gt;.md</code>: o texto diz quando rodar e o que fazer. Na hora, o @vibe posta o texto aqui e o agent de quem salvou faz."), !0), L(D);
	var A = w(D, 2), ee = (e) => {
		var n = na(), a = r(n);
		M(a, () => t.vb.icon("plus", 14));
		var o = w(a);
		L(n), h((e) => i(o, ` ${e ?? ""}`), [() => t.vb.t("Novo lembrete")]), R("click", n, () => p({
			name: "",
			text: ""
		})), C(e, n);
	};
	V(A, (e) => {
		v(n) || e(ee);
	}), L(S);
	var N = w(S, 2), P = (e) => {
		var s = ra(), u = r(s);
		le(u);
		var d = w(u, 2);
		O(d);
		var f = w(d, 2), p = r(f), m = l(p, !0), _ = w(p), b = l(_, !0), x = w(_), S = l(x, !0);
		L(f), L(s), h((e, t, r, s) => {
			B(u, "placeholder", e), u.readOnly = v(n).fixed, B(d, "placeholder", t), i(m, v(a)), i(b, r), x.disabled = v(o), i(S, s);
		}, [
			() => t.vb.t("nome, ex.: relatorio-diario"),
			() => t.vb.t("Diga quando e o quê. Ex.: Todo dia às 8h: puxe os números de ontem e poste aqui o que mudou."),
			() => t.vb.t("Cancelar"),
			() => t.vb.t("Salvar")
		]), g("submit", s, y), xe(u, () => v(n).name, (e) => v(n).name = e), xe(d, () => v(n).text, (e) => v(n).text = e), R("click", _, () => c(n, null)), C(e, s);
	};
	V(N, (e) => {
		v(n) && e(P);
	});
	var F = w(N, 2);
	Ee(F, 17, () => v(u), (e) => e.id, (e, n) => {
		var a = sa();
		let o;
		var c = r(a), u = r(c), d = r(u);
		M(d, () => t.vb.icon(v(s).includes(v(n).id) ? "chevronDown" : "chevronRight", 13));
		var m = w(d);
		L(u);
		var g = w(u, 2), y = r(g), b = (e) => {
			var r = z();
			h((e) => i(r, `${(v(n).every || v(n).cron || "") ?? ""}${e ?? ""} ·`), [() => v(n).enabled && v(n).next_at ? ` · ${t.vb.t("próximo {when}", { when: f(v(n).next_at) })}` : ""]), C(e, r);
		};
		V(y, (e) => {
			v(n).error || e(b);
		});
		var x = w(y, 1, !0);
		L(g);
		var S = w(g, 2), T = (e) => {
			var t = ia(), r = l(t);
			h(() => i(r, `⚠ ${v(n).error ?? ""}`)), C(e, t);
		};
		V(S, (e) => {
			v(n).error && e(T);
		});
		var E = w(S), D = (e) => {
			var t = aa(), r = l(t, !0);
			h(() => i(r, v(n).text)), C(e, t);
		}, O = k(() => v(s).includes(v(n).id));
		V(E, (e) => {
			v(O) && e(D);
		}), L(c);
		var A = w(c, 2), j = (e) => {
			var r = oa();
			M(r, () => t.vb.icon("pencil", 14), !0), L(r), h((e, t) => {
				B(r, "data-rem-edit", v(n).id), B(r, "title", e), B(r, "aria-label", t);
			}, [() => t.vb.t("Editar"), () => t.vb.t("Editar")]), R("click", r, () => p({
				name: v(n).name,
				text: v(n).text,
				fixed: !0
			})), C(e, r);
		};
		V(A, (e) => {
			v(n).name && e(j);
		});
		var ee = w(A, 2), N = r(ee);
		le(N);
		var P = w(N, 1, !0);
		L(ee);
		var F = w(ee, 2);
		M(F, () => t.vb.icon("x"), !0), L(F), L(a), h((e, t, r, s, l, u, d) => {
			o = ie(a, 1, "rem", null, o, {
				bad: !!v(n).error,
				off: !v(n).enabled,
				open: e
			}), B(c, "data-rem-open", v(n).id), B(c, "title", t), i(m, ` ${(v(n).name ? `${v(n).name}.md` : v(n).text) ?? ""}`), i(x, r), B(ee, "title", s), B(N, "data-rem-on", v(n).id), I(N, v(n).enabled), N.disabled = !!v(n).error, i(P, l), B(F, "data-rem-del", v(n).id), B(F, "title", u), B(F, "aria-label", d);
		}, [
			() => v(s).includes(v(n).id),
			() => t.vb.t(v(s).includes(v(n).id) ? "Esconder o texto" : "Ver o texto"),
			() => t.vb.t("de {who}", { who: t.vb.name(v(n).owner) }),
			() => t.vb.t("Ligado"),
			() => t.vb.t("ligado"),
			() => t.vb.t("Apagar lembrete"),
			() => t.vb.t("Apagar lembrete")
		]), R("click", c, (e) => {
			e.target.closest(".remText") || _(v(n));
		}), R("keydown", c, (e) => {
			e.key === "Enter" && _(v(n));
		}), R("change", N, (e) => t.send({
			t: "reminder.enable",
			id: v(n).id,
			on: e.currentTarget.checked
		})), R("click", F, () => {
			confirm(t.vb.t("Apagar este lembrete?")) && t.send({
				t: "reminder.delete",
				id: v(n).id
			});
		}), C(e, a);
	});
	var te = w(F, 2), ne = (e) => {
		var n = ca(), r = l(n, !0);
		h((e) => i(r, e), [() => t.vb.t("Nenhum lembrete ainda. Clique em Novo lembrete, ou peça pro seu agent: “todo dia às 8h, me manda o resumo do que mudou”.")]), C(e, n);
	};
	V(te, (e) => {
		!v(u).length && !v(n) && e(ne);
	}), C(e, x), j();
}
n([
	"click",
	"keydown",
	"change"
]);
// svelte/features/navigation/model.ts
function da(e) {
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
function fa(e, t) {
	let n = [], r = e.parents.get(t);
	for (; r;) n.push(r), r = e.parents.get(r);
	return n;
}
function pa(e, t, n = /* @__PURE__ */ new Set(), r = !1) {
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
function ma(e, t) {
	let n = /* @__PURE__ */ new Map();
	for (let e of t) n.set(e.thread, Math.max(n.get(e.thread) ?? 0, e.id));
	return e.filter((e) => e.archived).map((e, t) => ({
		epic: e,
		index: t
	})).sort((e, t) => (n.get(t.epic.id) ?? 0) - (n.get(e.epic.id) ?? 0) || t.index - e.index).map(({ epic: e }) => e);
}
function ha(e, t, n, r) {
	if (t === n || new Set(e.map((e) => e.id)).size !== e.length) return null;
	let i = da(e.filter((e) => !e.archived));
	if (!i.byId.has(t) || !i.byId.has(n) || i.parents.get(t) !== i.parents.get(n)) return null;
	let a = e.map((e) => e.id).filter((e) => e !== t);
	return a.splice(a.indexOf(n) + +!!r, 0, t), a.every((t, n) => t === e[n]?.id) ? null : a;
}
// svelte/features/navigation/session.ts
function ga() {
	try {
		return localStorage;
	} catch {
		return null;
	}
}
function _a(e, t) {
	try {
		let n = JSON.parse(t?.getItem(`vb.tree.${e}`) ?? "[]");
		if (Array.isArray(n) && n.every((e) => typeof e == "string")) return new Set(n);
	} catch {}
	return /* @__PURE__ */ new Set();
}
function va(e, t) {
	try {
		e.storage?.setItem(`vb.tree.${e.roomId}`, JSON.stringify([...t]));
	} catch {}
}
function ya(e, t = !1, n = ga()) {
	return {
		roomId: e,
		storage: n,
		state: ye({
			draft: "",
			closed: _a(e, n),
			openedFor: null,
			archived: t
		})
	};
}
function ba(e, t, n) {
	let r = pe(e.state);
	if (!t.byId.has(n) && n !== "main" && !n.startsWith("pre:") || r.openedFor === n) return;
	let i = new Set(r.closed);
	for (let e of fa(t, n)) i.delete(e);
	va(e, i), e.state.set({
		...r,
		closed: i,
		openedFor: n
	});
}
function xa(e, t) {
	e.state.update((n) => {
		let r = new Set(n.closed);
		return r.has(t) ? r.delete(t) : r.add(t), va(e, r), {
			...n,
			closed: r
		};
	});
}
function Sa(e, t, n, r = !1) {
	let i = e?.roomId === t.id ? e : ya(t.id, r);
	return ba(i, da(t.epics), n), i;
}
// svelte/features/navigation/EpicTree.svelte
var Ca = a("<span aria-hidden=\"true\" class=\"tw:w-8 tw:shrink-0\"></span>"), wa = a("<span class=\"tw:sr-only\"> </span>"), Ta = a("<span role=\"img\" class=\"tw:text-primary\">✻</span>"), Ea = a("<span> </span>"), Da = a("<span class=\"tw:shrink-0 tw:text-xs tw:text-muted-foreground\"> </span>"), Oa = a("<!> <span class=\"tw:min-w-0 tw:flex-1 tw:break-words\" data-epic-title=\"\"> <!></span> <!> <!> <!> <!>", 1), ka = a("<div class=\"tw:flex tw:flex-wrap tw:gap-2\"><!><!></div>"), Aa = a("<li><div role=\"group\"><!> <!></div> <details class=\"tw:ml-8 tw:text-xs tw:text-muted-foreground\"><summary class=\"tw:cursor-pointer tw:rounded-control tw:px-2 tw:py-1 tw:focus-visible:outline-2 tw:focus-visible:outline-ring\"> </summary> <div class=\"tw:space-y-2 tw:p-2\"><!> <!> <!></div></details></li>"), ja = a(" <span class=\"tw:text-xs tw:text-muted-foreground\"> </span>", 1), Ma = a("<form id=\"newEpic\" class=\"tw:space-y-2\"><!> <div class=\"tw:flex tw:gap-2\"><!><!></div></form> <!>", 1), Na = a("<ul class=\"tw:m-0 tw:list-none tw:space-y-1 tw:p-0\"></ul> <!>", 1), Pa = a("<p role=\"alert\" class=\"tw:m-0 tw:text-sm tw:text-destructive\"> </p>"), Fa = a("<section data-vb-native=\"\" class=\"tw:m-0 tw:box-border tw:space-y-3 tw:rounded-surface tw:bg-sidebar tw:p-3 tw:font-sans tw:text-sm tw:leading-5 tw:text-sidebar-foreground\"><!> <p role=\"status\" aria-live=\"polite\" class=\"tw:sr-only\"> </p> <!></section>");
function Ia(n, a) {
	let f = _();
	b(a, !0);
	let y = () => ne(v(D), "$navigation", S), [S, E] = e(), D = k(() => a.session.state), O = m(""), A = m(null), M = m(null), N = m(!1), P = m(null), F = !1, I = /* @__PURE__ */ new Map(), re = 0, ae = m(null), oe = m("");
	d(() => {
		F = !0, re++, I.clear();
	});
	let se = [
		"tw:pl-0",
		"tw:pl-2",
		"tw:pl-4",
		"tw:pl-6",
		"tw:pl-8",
		"tw:pl-10",
		"tw:pl-12"
	], R = k(() => a.room.epics.filter((e) => !e.archived)), le = k(() => ma(a.room.epics, a.room.messages)), fe = k(() => y().archived && v(le).length > 0 ? "archived" : "active"), pe = k(() => da(v(fe) === "archived" ? v(le) : v(R))), he = k(() => da(a.room.epics)), ye = k(() => new Set(a.room.epics.filter((e) => a.vb.epicBusy(e)).map((e) => e.id))), be = k(() => pa(v(pe), y().closed, v(ye), !0)), xe = k(() => new Map(v(be).map((e, t) => [e.epic.id, `${f}-row-${t}`])));
	x(() => {
		ba(a.session, v(he), a.thread);
	});
	function Se(e) {
		if (F) return;
		re++, c(ae, null);
		let t = e === "archived";
		v(D).update((e) => ({
			...e,
			archived: t
		})), a.onarchchange(t), c(A, null), c(M, null), c(O, "");
	}
	function De(e) {
		if (F || a.session.roomId !== a.room.id) return !1;
		c(O, "");
		try {
			if (a.send(e)) return !0;
		} catch {}
		return c(O, a.vb.t("Não deu pra enviar agora. Tente de novo."), !0), !1;
	}
	function ke(e) {
		if (e.preventDefault(), F) return;
		let t = y().draft.trim();
		if (!t) return v(P)?.focus();
		De({
			t: "epic",
			title: t
		}) && we(v(D), u(y).draft = "", u(y));
	}
	function Ae(e) {
		let t = v(pe).parents.get(e);
		return t ? v(pe).children.get(t) ?? [] : v(pe).roots;
	}
	function je(e, t) {
		let n = Ae(e);
		return n[n.findIndex((t) => t.id === e) + t];
	}
	function Me(e, t, n) {
		let r = ha(a.room.epics, e, t, n);
		if (!r || F) return;
		c(ae, null);
		let i = ++re, o = document.activeElement, s = o instanceof HTMLElement && I.get(e)?.contains(o) ? o : null;
		De({
			t: "epic.order",
			ids: r
		}) && c(ae, {
			ids: r,
			from: e,
			anchor: s,
			generation: i,
			thread: a.thread
		}, !0);
	}
	function Ne(e, t) {
		return I.set(t, e), { destroy() {
			I.get(t) === e && I.delete(t);
		} };
	}
	x(() => {
		let e = v(ae);
		if (!e) return;
		if (e.thread !== a.thread || v(fe) !== "active") {
			c(ae, null), re++;
			return;
		}
		let t = a.room.epics.map((e) => e.id);
		if (!t.includes(e.from)) {
			c(ae, null), Pe(e);
			return;
		}
		let n = new Set(t), r = new Set(e.ids), i = e.ids.filter((e) => n.has(e)), o = t.filter((e) => r.has(e));
		o.length !== i.length || o.some((e, t) => e !== i[t]) || (c(ae, null), c(oe, a.vb.t("Ordem dos épicos atualizada."), !0), Pe(e));
	});
	function Pe(e) {
		let t = e.anchor;
		if (!t) return;
		let n = () => document.activeElement === document.body || document.activeElement === t;
		n() && s().then(() => {
			if (F || e.generation !== re || !n() || document.activeElement === t && !t.matches(":disabled")) return;
			let r = I.get(e.from);
			r?.hidden || (r?.querySelector("[data-epic-thread]") ?? v(P))?.focus({ preventScroll: !0 });
		});
	}
	function Fe(e, t) {
		let n = je(e, t);
		v(fe) === "active" && n && Me(e, n.id, t === 1);
	}
	function Ie(e, t) {
		if (v(fe) !== "active" || !e.dataTransfer) return e.preventDefault();
		e.dataTransfer.setData("text/vb-epic", t), e.dataTransfer.effectAllowed = "move", c(A, t, !0);
	}
	function Le(e, t) {
		return v(fe) === "active" && v(A) !== t && e.dataTransfer?.types.includes("text/vb-epic");
	}
	function Re(e, t) {
		if (!Le(e, t)) return;
		e.preventDefault();
		let n = e.currentTarget instanceof HTMLElement ? e.currentTarget.getBoundingClientRect() : null;
		c(M, t, !0), c(N, !!n && e.clientY >= n.top + n.height / 2, !0);
	}
	function ze(e, t) {
		let n = v(N);
		if (c(M, null), !Le(e, t)) return;
		e.preventDefault();
		let r = e.dataTransfer?.getData("text/vb-epic");
		r && Me(r, t, n), c(A, null);
	}
	var Be = Fa(), Ve = r(Be);
	{
		let e = (e, n = Ce) => {
			var s = o(), d = T(s), m = (e) => {
				var o = Na(), s = T(o);
				Ee(s, 21, () => v(be), (e) => e.epic.id, (e, o) => {
					let s = k(() => v(o).epic), u = k(() => y().closed.has(v(s).id)), d = k(() => v(pe).byId.get(v(pe).parents.get(v(s).id) ?? "")), f = k(() => a.vb.epicBusy(v(s)));
					var m = Aa(), _ = r(m), b = r(_), x = (e) => {
						{
							let t = k(() => v(u) ? "chevronRight" : "chevronDown"), n = k(() => `${a.vb.t(v(u) ? "Abrir galho" : "Fechar galho")}: ${v(s).title}`), r = k(() => !v(u)), i = k(() => (v(pe).children.get(v(s).id) ?? []).map((e) => v(xe).get(e.id)).join(" "));
							Te(e, {
								get icon() {
									return v(t);
								},
								get label() {
									return v(n);
								},
								get "aria-expanded"() {
									return v(r);
								},
								get "aria-controls"() {
									return v(i);
								},
								class: "tw:size-8 tw:p-1",
								onclick: () => xa(a.session, v(s).id)
							});
						}
					}, S = (e) => {
						var t = Ca();
						C(e, t);
					};
					V(b, (e) => {
						v(o).hasChildren ? e(x) : e(S, -1);
					});
					var E = w(b, 2);
					{
						let e = k(() => a.thread === v(s).id ? "page" : void 0);
						te(E, {
							variant: "ghost",
							class: "tw:h-auto tw:min-h-9 tw:min-w-0 tw:flex-1 tw:justify-start tw:gap-2 tw:whitespace-normal tw:px-1 tw:py-2 tw:text-left",
							get "data-epic-thread"() {
								return v(s).id;
							},
							get "aria-current"() {
								return v(e);
							},
							onclick: () => {
								a.thread === v(s).id && v(o).hasChildren ? xa(a.session, v(s).id) : a.onopen(v(s).id);
							},
							children: (e, n) => {
								var c = Oa(), m = T(c);
								{
									let e = k(() => v(s).owner ? a.vb.name(v(s).owner) : v(s).title), t = k(() => v(s).owner && a.room.avatars?.[v(s).owner] ? `/api/avatar/${encodeURIComponent(v(s).owner)}?v=${a.room.avatars[v(s).owner]}` : void 0);
									p(m, {
										get name() {
											return v(e);
										},
										get src() {
											return v(t);
										},
										class: "tw:size-6 tw:text-xs"
									});
								}
								var g = w(m, 2), _ = r(g, !0), y = w(_), b = (e) => {
									var t = wa(), n = l(t);
									h((e) => i(n, `· ${e ?? ""}`), [() => a.vb.t("Subépico de {title}", { title: v(d).title })]), C(e, t);
								};
								V(y, (e) => {
									v(d) && e(b);
								}), L(g);
								var x = w(g, 2), S = (e) => {
									var t = Ta();
									h((e) => B(t, "aria-label", e), [() => v(f) ? a.vb.t("{who} está trabalhando", { who: v(f) }) : a.vb.t("Trabalho em um subépico")]), C(e, t);
								};
								V(x, (e) => {
									(v(f) || v(u) && v(o).busyBelow) && e(S);
								});
								var E = w(x, 2), D = (e) => {
									ve(e, {
										variant: "warning",
										children: (e, n) => {
											t();
											var r = z();
											h((e) => i(r, e), [() => a.vb.waitCount(v(s).id)]), C(e, r);
										},
										$$slots: { default: !0 }
									});
								}, O = k(() => a.vb.waitCount(v(s).id));
								V(E, (e) => {
									v(O) && e(D);
								});
								var A = w(E, 2), j = (e) => {
									var t = Ea(), n = l(t, !0);
									h((e) => {
										B(t, "title", e), i(n, v(s).prod.stage === "verified" ? "✓✓" : "🚀");
									}, [() => a.vb.t(v(s).prod.stage === "verified" ? "Verificado em prod" : "No ar, falta verificar em prod")]), C(e, t);
								};
								V(A, (e) => {
									v(s).prod && e(j);
								});
								var M = w(A, 2), ee = (e) => {
									var t = Da(), n = l(t);
									h((e) => i(n, `${e ?? ""}/${v(s).tasks.length ?? ""}`), [() => v(s).tasks.filter((e) => e.done).length]), C(e, t);
								};
								V(M, (e) => {
									v(s).tasks.length && e(ee);
								}), h(() => i(_, v(s).title)), C(e, c);
							},
							$$slots: { default: !0 }
						});
					}
					L(_);
					var D = w(_, 2), O = r(D), j = l(O), P = w(O, 2), F = r(P);
					{
						let e = k(() => `${v(xe).get(v(s).id)}-owner`);
						de(F, {
							get for() {
								return v(e);
							},
							children: (e, n) => {
								t();
								var r = z();
								h((e) => i(r, e), [() => a.vb.t("Dono do épico")]), C(e, r);
							},
							$$slots: { default: !0 }
						});
					}
					var I = w(F, 2);
					{
						let e = k(() => `${v(xe).get(v(s).id)}-owner`), t = k(() => `${a.vb.t("Dono do épico")}: ${v(s).title}`), n = k(() => v(s).owner ?? ""), r = k(() => [{
							value: "",
							label: a.vb.t("Sem dono")
						}, ...a.room.members.map((e) => ({
							value: e,
							label: a.vb.name(e)
						}))]);
						ee(I, {
							get id() {
								return v(e);
							},
							get "aria-label"() {
								return v(t);
							},
							get value() {
								return v(n);
							},
							get items() {
								return v(r);
							},
							onValueChange: (e) => (De({
								t: "epic.owner",
								id: v(s).id,
								owner: e
							}), !1)
						});
					}
					var ne = w(I, 2), re = (e) => {
						var n = ka(), o = r(n);
						{
							let e = k(() => !je(v(s).id, -1)), n = k(() => `${a.vb.t("Mover para cima")}: ${v(s).title}`);
							te(o, {
								variant: "outline",
								size: "sm",
								get disabled() {
									return v(e);
								},
								get "aria-label"() {
									return v(n);
								},
								onclick: () => Fe(v(s).id, -1),
								children: (e, n) => {
									t();
									var r = z();
									h((e) => i(r, e), [() => a.vb.t("Mover para cima")]), C(e, r);
								},
								$$slots: { default: !0 }
							});
						}
						var c = w(o);
						{
							let e = k(() => !je(v(s).id, 1)), n = k(() => `${a.vb.t("Mover para baixo")}: ${v(s).title}`);
							te(c, {
								variant: "outline",
								size: "sm",
								get disabled() {
									return v(e);
								},
								get "aria-label"() {
									return v(n);
								},
								onclick: () => Fe(v(s).id, 1),
								children: (e, n) => {
									t();
									var r = z();
									h((e) => i(r, e), [() => a.vb.t("Mover para baixo")]), C(e, r);
								},
								$$slots: { default: !0 }
							});
						}
						L(n), C(e, n);
					};
					V(ne, (e) => {
						n() === "active" && e(re);
					}), L(P), L(D), L(m), ue(m, (e, t) => Ne?.(e, t), () => v(s).id), h((e, t, r, a) => {
						B(m, "id", e), B(m, "hidden", v(o).hidden), B(m, "data-epic", v(s).id), B(m, "data-depth", v(o).depth), ie(m, 1, t), B(_, "aria-label", v(s).title), B(_, "draggable", n() === "active"), ie(_, 1, r), i(j, `${a ?? ""}: ${v(s).title ?? ""}`);
					}, [
						() => v(xe).get(v(s).id),
						() => ge(se[Math.min(v(o).depth, se.length - 1)]),
						() => ge(_e("tw:flex tw:items-center tw:gap-1 tw:rounded-control tw:border tw:border-transparent", a.thread === v(s).id && "tw:bg-sidebar-accent tw:text-sidebar-accent-foreground", v(M) === v(s).id && (v(N) ? "tw:border-b-primary" : "tw:border-t-primary"), v(A) === v(s).id && "tw:opacity-50")),
						() => a.vb.t("Ações do épico")
					]), g("dragstart", _, (e) => Ie(e, v(s).id)), g("dragend", _, () => {
						c(A, null), c(M, null);
					}), g("dragover", _, (e) => Re(e, v(s).id)), g("dragleave", _, () => {
						v(M) === v(s).id && c(M, null);
					}), g("drop", _, (e) => ze(e, v(s).id)), C(e, m);
				}), L(s);
				var d = w(s, 2), m = (e) => {
					var n = Ma(), o = T(n), s = r(o);
					{
						let e = k(() => `${f}-new`);
						de(s, {
							get for() {
								return v(e);
							},
							children: (e, n) => {
								t();
								var r = z();
								h((e) => i(r, e), [() => a.vb.t("Novo épico")]), C(e, r);
							},
							$$slots: { default: !0 }
						});
					}
					var d = w(s, 2), p = r(d), m = () => F ? "" : y().draft, _ = (e) => {
						F || we(v(D), u(y).draft = e, u(y));
					};
					{
						let e = k(() => `${f}-new`), t = k(() => a.vb.t("Novo épico: escreva o título…"));
						me(p, {
							get id() {
								return v(e);
							},
							get value() {
								return m();
							},
							set value(e) {
								_(e);
							},
							get placeholder() {
								return v(t);
							},
							enterkeyhint: "done",
							get ref() {
								return v(P);
							},
							set ref(e) {
								c(P, e, !0);
							}
						});
					}
					var b = w(p);
					{
						let e = k(() => a.vb.t("Criar épico"));
						Te(b, {
							type: "submit",
							icon: "plus",
							variant: "primary",
							get label() {
								return v(e);
							}
						});
					}
					L(d), L(o);
					var x = w(o, 2);
					Ee(x, 17, () => a.room.suggestions, Oe, (e, n, r) => {
						{
							let o = k(() => a.thread === `pre:${r}` ? "page" : void 0);
							te(e, {
								variant: "outline",
								class: "tw:h-auto tw:w-full tw:justify-start tw:whitespace-normal tw:border-dashed tw:text-left",
								get "aria-current"() {
									return v(o);
								},
								onclick: () => a.onopen(`pre:${r}`),
								children: (e, r) => {
									t();
									var o = ja(), s = T(o, !0), c = w(s), u = l(c, !0);
									h((e) => {
										i(s, v(n).title), i(u, e);
									}, [() => a.vb.t("sugestão do @vibe, clique para ver")]), C(e, o);
								},
								$$slots: { default: !0 }
							});
						}
					}), g("submit", o, ke), C(e, n);
				};
				V(d, (e) => {
					n() === "active" && e(m);
				}), h((e) => B(s, "aria-label", e), [() => n() === "archived" ? a.vb.t("Arquivados") : a.vb.t("Épicos")]), C(e, o);
			};
			V(d, (e) => {
				n() === v(fe) && e(m);
			}), C(e, s);
		}, n = k(() => [{
			value: "active",
			label: `${a.vb.t("Épicos")} · ${v(R).length}`
		}, {
			value: "archived",
			label: `${a.vb.t("Arquivados")} · ${v(le).length}`,
			disabled: v(le).length === 0
		}]), s = k(() => a.vb.t("Épicos"));
		ce(Ve, {
			get items() {
				return v(n);
			},
			get label() {
				return v(s);
			},
			get value() {
				return v(fe);
			},
			onValueChange: Se,
			children: e,
			$$slots: { default: !0 }
		});
	}
	var He = w(Ve, 2), Ue = l(He, !0), We = w(He, 2), Ge = (e) => {
		var t = Pa(), n = l(t, !0);
		h(() => i(n, v(O))), C(e, t);
	};
	V(We, (e) => {
		v(O) && e(Ge);
	}), L(Be), h((e) => {
		B(Be, "aria-label", e), i(Ue, v(oe));
	}, [() => a.vb.t("Épicos")]), C(n, Be), j(), E();
}
// svelte/Sidebar.svelte
var La = a("<div class=\"fnCol\"><span class=\"fnRow\"><span class=\"fn\"> </span><span class=\"pendTag\"> </span></span> <small class=\"memActs\"><button type=\"button\" class=\"ghost resend\"> </button> · <button type=\"button\" class=\"ghost resend\"> </button></small></div>"), Ra = a("<span class=\"fn\"> </span>"), za = a("<div class=\"fnCol\"><span class=\"fn\"> </span><small class=\"memActs\"> </small></div>"), Ba = a("<button type=\"button\" class=\"ghost x\"></button>"), Va = a("<div class=\"member\"><!> <!> <!></div> <!>", 1), Ha = a("<button type=\"button\" class=\"iconBtn phOnly\" id=\"sideArch\"></button> <button type=\"button\" class=\"iconBtn phOnly\" id=\"sideDel\"></button>", 1), Ua = a("<span class=\"rowEdit phOnly\" role=\"button\" tabindex=\"0\" id=\"sideRename\"><!> </span>"), Wa = a("<div class=\"member reqRow\"><!> <div class=\"fnCol\"><span class=\"fn\"> </span><small class=\"memActs\"> <button type=\"button\" class=\"ghost resend okAsk\" data-ok=\"1\"> </button></small></div> <button type=\"button\" class=\"ghost x\" data-ok=\"\"></button></div>"), Ga = a("<div class=\"asks\"><h4> </h4> <!></div>"), Ka = a("<details class=\"memMore\" data-fold=\"off\"><summary> </summary><!></details>"), qa = a("<button type=\"button\" class=\"friendAdd\"><!><span class=\"fn\"> </span><b></b></button>"), Ja = a("<details class=\"memMore\" data-fold=\"friends\"><summary> </summary> <!></details>"), Ya = a("<option></option>"), Xa = a("<button type=\"button\" class=\"sheetGrab\"><i></i></button> <!> <div class=\"sideHead\"><div class=\"sideTop\"><a data-nav=\"\" href=\"/app\" class=\"muted\"><!> vibebooks</a> <!> <button type=\"button\" class=\"iconBtn\" id=\"railToggle\" aria-expanded=\"true\"></button></div></div> <div class=\"sec threadsSec\"><button type=\"button\" data-thread=\"main\"><!><span class=\"rt\"> </span> <!> <!><span class=\"n\"> </span></button> <!></div> <!> <div class=\"sec\"><!> <h4> </h4> <!> <!> <!> <!> <form class=\"row\" id=\"invite\" style=\"margin-top:8px\"><input type=\"email\" required=\"\" list=\"friendList\" autocomplete=\"off\"/><button></button></form> <datalist id=\"friendList\"></datalist></div>", 1);
function Za(e, n) {
	b(n, !0);
	let a = (e, t = Ce) => {
		var a = Va(), o = T(a), s = r(o);
		M(s, () => n.vb.avatar(t(), n.room.online.includes(t())));
		var c = w(s, 2), u = (e) => {
			var a = La(), o = r(a), s = r(o), c = l(s, !0), u = w(s), d = l(u, !0);
			L(o);
			var f = w(o, 2), p = r(f), m = l(p, !0), g = w(p, 2), _ = l(g, !0);
			L(f), L(a), h((e, n, r, a, o, l, f) => {
				B(s, "title", t()), i(c, e), B(u, "title", n), i(d, r), B(p, "data-copyinv", t()), B(p, "title", a), i(m, o), B(g, "data-resend", t()), B(g, "title", l), i(_, f);
			}, [
				() => n.room.names?.[t()] || t().split("@")[0],
				() => n.vb.t("Convidada(o), ainda não entrou"),
				() => n.vb.t("pendente"),
				() => n.vb.t("Copiar a mensagem de convite (link da sala + setup do agent) para mandar no WhatsApp"),
				() => n.vb.t("copiar"),
				() => n.vb.t("Convidada(o), ainda não entrou"),
				() => n.vb.t("reenviar")
			]), C(e, a);
		}, d = k(() => n.room.pending?.includes(t())), f = (e) => {
			var r = Ra(), a = l(r, !0);
			h(() => {
				B(r, "title", t()), i(a, n.room.names[t()]);
			}), C(e, r);
		}, p = (e) => {
			var n = za(), a = r(n), o = l(a, !0), s = w(a), c = l(s);
			L(n), h((e, n) => {
				B(a, "title", t()), i(o, e), i(c, `@${n ?? ""}`);
			}, [() => t().split("@")[0], () => t().split("@")[1] ?? ""]), C(e, n);
		};
		V(c, (e) => {
			v(d) ? e(u) : n.room.names?.[t()] ? e(f, 1) : e(p, -1);
		});
		var m = w(c, 2), g = (e) => {
			var r = Ba();
			M(r, () => n.vb.icon("x"), !0), L(r), h((e, n) => {
				B(r, "data-remove", t()), B(r, "aria-label", e), B(r, "title", n);
			}, [() => n.vb.t("Remover {email}", { email: t() }), () => n.room.pending?.includes(t()) ? n.vb.t("Cancelar convite") : n.vb.t("Remover do vibebook")]), C(e, r);
		}, _ = k(() => t() !== n.room.book?.owner && (n.room.pending?.includes(t()) || n.room.me === n.room.book?.owner));
		V(m, (e) => {
			v(_) && e(g);
		}), L(o);
		var y = w(o, 2);
		M(y, () => n.vb.agentRows(t())), C(e, a);
	}, o = D(n, "foldOpen", 19, () => ({
		off: !1,
		friends: null
	})), s = D(n, "friends", 19, () => []), c = (e) => n.room.counts ? (n.room.counts[e] ?? 0) + n.room.messages.filter((t) => t.thread === e && t.id > (n.room.countsAt ?? 0)).length : n.room.messages.filter((t) => t.thread === e).length, u = k(() => n.room.epics.find((e) => e.id === n.thread)), d = k(() => n.room.members.filter((e) => e === n.room.me || n.room.online.includes(e))), f = k(() => n.room.members.filter((e) => !v(d).includes(e))), p = k(() => s().filter((e) => !n.room.members.includes(e)));
	var m = Xa(), g = T(m), _ = w(g, 2);
	M(_, () => n.vb.roomStrip());
	var y = w(_, 2), x = r(y), S = r(x), E = r(S);
	M(E, () => n.vb.icon("back")), t(), L(S);
	var O = w(S, 2), A = (e) => {
		var t = Ha(), r = T(t);
		M(r, () => n.vb.icon(v(u).archived ? "undo" : "check", 18), !0), L(r);
		var i = w(r, 2);
		M(i, () => n.vb.icon("trash", 18), !0), L(i), h((e, t, n, a) => {
			B(r, "title", e), B(r, "aria-label", t), B(i, "title", n), B(i, "aria-label", a);
		}, [
			() => v(u).archived ? n.vb.t("Desarquivar épico") : n.vb.t("Arquivar épico (concluído)"),
			() => v(u).archived ? n.vb.t("Desarquivar épico") : n.vb.t("Arquivar épico"),
			() => n.vb.t("Apagar épico"),
			() => n.vb.t("Apagar épico")
		]), C(e, t);
	};
	V(O, (e) => {
		v(u) && e(A);
	});
	var ee = w(O, 2);
	M(ee, () => n.vb.icon("sidebar", 20), !0), L(ee), L(x), L(y);
	var N = w(y, 2), P = r(N);
	let F;
	var te = r(P);
	M(te, () => n.vb.roomMark("ri roomIco"));
	var I = w(te), ne = l(I, !0), re = w(I, 2), ae = (e) => {
		var t = Ua(), a = r(t);
		M(a, () => n.vb.icon("pencil", 13));
		var o = w(a);
		L(t), h((e, n) => {
			B(t, "title", e), i(o, ` ${n ?? ""}`);
		}, [() => n.vb.t("Renomear"), () => n.vb.t("editar")]), C(e, t);
	}, oe = k(() => !n.thread.startsWith("pre:"));
	V(re, (e) => {
		v(oe) && e(ae);
	});
	var se = w(re, 2);
	M(se, () => n.vb.waitPill("main"));
	var R = w(se), z = l(R, !0);
	L(P);
	var ce = w(P, 2);
	{
		let e = k(() => ({
			t: n.vb.t,
			name: n.vb.name,
			epicBusy: n.vb.epicBusy,
			waitCount: (e) => n.vb.waitsIn(e).length
		}));
		Ia(ce, {
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
				return v(e);
			}
		});
	}
	L(N);
	var le = w(N, 2);
	M(le, () => n.vb.pinsSec());
	var ue = w(le, 2), de = r(ue), fe = (e) => {
		var t = Ga(), a = r(t), o = l(a, !0), s = w(a, 2);
		Ee(s, 17, () => n.room.requests, (e) => e.email, (e, t) => {
			var a = Wa(), o = r(a);
			M(o, () => n.vb.avatar(v(t).email));
			var s = w(o, 2), c = r(s), u = l(c, !0), d = w(c), f = r(d), p = w(f), m = l(p, !0);
			L(d), L(s);
			var g = w(s, 2);
			M(g, () => n.vb.icon("x"), !0), L(g), L(a), h((e, n, r, a, o, s, l) => {
				B(c, "title", e), i(u, n), i(f, `${r ?? ""} · `), B(p, "data-ask", v(t).email), B(p, "title", a), i(m, o), B(g, "data-ask", v(t).email), B(g, "aria-label", s), B(g, "title", l);
			}, [
				() => `${v(t).email} · ${n.vb.t("pediu {ago}", { ago: n.vb.ago(v(t).ts) })}`,
				() => v(t).name || v(t).email.split("@")[0],
				() => n.vb.t("pediu {ago}", { ago: n.vb.ago(v(t).ts) }),
				() => n.vb.t("Liberar: entra na sala e recebe o link por email"),
				() => n.vb.t("liberar"),
				() => n.vb.t("Recusar {email}", { email: v(t).email }),
				() => n.vb.t("Recusar")
			]), C(e, a);
		}), L(t), h((e) => i(o, e), [() => n.vb.t("Pedindo pra entrar")]), C(e, t);
	};
	V(de, (e) => {
		n.room.requests?.length && e(fe);
	});
	var pe = w(de, 2), me = l(pe, !0), he = w(pe, 2);
	M(he, () => n.vb.sbxRows());
	var ge = w(he, 2);
	Ee(ge, 16, () => v(d), (e) => e, (e, t) => {
		a(e, () => t);
	});
	var _e = w(ge, 2), ve = (e) => {
		var t = Ka(), s = r(t), c = l(s, !0), u = w(s);
		Ee(u, 16, () => v(f), (e) => e, (e, t) => {
			a(e, () => t);
		}), L(t), h((e) => {
			t.open = o().off, i(c, e);
		}, [() => n.vb.t("{n} offline", { n: v(f).length })]), C(e, t);
	};
	V(_e, (e) => {
		v(f).length && e(ve);
	});
	var ye = w(_e, 2), be = (e) => {
		var t = Ja(), a = r(t), s = l(a), c = w(a, 2);
		Ee(c, 16, () => v(p), (e) => e, (e, t) => {
			var a = qa(), o = r(a);
			M(o, () => n.vb.avatar(t));
			var s = w(o), c = l(s, !0), u = w(s);
			M(u, () => n.vb.icon("plus"), !0), L(u), L(a), h((e, n) => {
				B(a, "data-add", t), B(a, "title", e), i(c, n);
			}, [() => n.vb.t("Adicionar {email}", { email: t }), () => n.vb.name(t)]), C(e, a);
		}), L(t), h((e) => {
			t.open = o().friends ?? n.room.members.length <= 1, i(s, `${e ?? ""} · ${v(p).length ?? ""}`);
		}, [() => n.vb.t("Seus amigos")]), C(e, t);
	};
	V(ye, (e) => {
		v(p).length && e(be);
	});
	var xe = w(ye, 2), Se = r(xe), we = w(Se);
	M(we, () => n.vb.icon("plus"), !0), L(we), L(xe);
	var Te = w(xe, 2);
	Ee(Te, 21, () => v(p), Oe, (e, t) => {
		var n = Ya(), r = {};
		h(() => {
			r !== (r = v(t)) && (n.value = (n.__value = r) ?? "");
		}), C(e, n);
	}), L(Te), L(ue), h((e, t, r, a, o, s, c, l, u, d) => {
		B(g, "aria-label", e), B(ee, "title", t), B(ee, "aria-label", r), F = ie(P, 1, "thread", null, F, {
			sel: n.thread === "main",
			waiting: a
		}), B(P, "title", o), i(ne, s), i(z, c), i(me, l), B(Se, "placeholder", u), B(we, "aria-label", d);
	}, [
		() => n.vb.t("Fechar"),
		() => n.vb.t("Recolher menu"),
		() => n.vb.t("Recolher menu"),
		() => n.vb.waitsIn("main").length > 0,
		() => `${n.vb.bookTitle()}${n.room.book?.summary ? ` · ${n.room.book.summary}` : ""}`,
		() => n.vb.bookTitle(),
		() => c("main"),
		() => n.vb.t("Pessoas e agents"),
		() => n.vb.t("convidar por email"),
		() => n.vb.t("convidar por email")
	]), C(e, m), j();
}
// svelte/Message.svelte
var Qa = a("<span class=\"gut\"> </span>"), $a = a(" <span class=\"agentTag\">agent</span>", 1), eo = a("<span class=\"doneTag\"> </span>"), to = a("<div><!> <!> <span class=\"mact\"><button type=\"button\" class=\"rbtn\"><!> </button> <button type=\"button\" class=\"rbtn\"><!> </button> <button type=\"button\" class=\"rbtn\"><!> </button></span> <div class=\"body\"><!> <div class=\"who\"><!> <!> <span class=\"hhmm\"> </span></div> <div class=\"txt\"></div> <!> <!> <!> <!> <!></div></div>");
function no(e, t) {
	b(t, !0);
	let n = D(t, "origin", 3, !1), a = k(() => t.vb.continues(t.previous, t.message)), s = k(() => t.message.tag === "reminder" ? t.vb.remHtml(t.message, n()) : t.message.tag === "issue" ? t.vb.issueHtml(t.message) : t.vb.isNotice(t.message) ? t.vb.noticeHtml(t.message) : null), c = k(() => n() && v(s) ? v(s).replace(/\sid="m\d+"/, "") : v(s)), u = k(() => !t.message.text && t.typing ? `<span class="typing">${t.vb.esc(t.vb.typingNote?.(t.message.id) || t.vb.t("pensando ({mode})", { mode: t.vb.typingLabel?.(t.typing) ?? t.typing }))}…</span>` : t.message.author === "ai" ? t.message.text ? t.vb.mentions(t.vb.md(t.message.text)) : t.message.poll ? "" : `<span class="typing">${t.vb.t("pensando…")}</span>` : t.message.text ? t.vb.mentions(t.message.kind === "agent" ? t.vb.md(t.message.text) : t.vb.linkify(t.vb.esc(t.message.text))) : ""), d = k(() => t.vb.dateTime?.(t.message.ts) ?? new Date(t.message.ts).toLocaleString());
	var f = o(), p = T(f), m = (e) => {
		var t = o(), n = T(t);
		M(n, () => v(c)), C(e, t);
	}, g = (e) => {
		var s = to();
		let c;
		var f = r(s);
		M(f, () => t.message.kind === "agent" ? t.vb.agentAvatar(t.message.author, t.message.via) : t.vb.avatar(t.message.author));
		var p = w(f, 2), m = (e) => {
			var n = Qa(), r = l(n, !0);
			h((e) => {
				B(n, "title", v(d)), i(r, e);
			}, [() => t.vb.hhmm(t.message.ts)]), C(e, n);
		};
		V(p, (e) => {
			v(a) && e(m);
		});
		var g = w(p, 2), _ = r(g), y = r(_);
		M(y, () => t.vb.icon("copy", 14));
		var b = w(y);
		L(_);
		var x = w(_, 2), S = r(x);
		M(S, () => t.vb.icon("link", 14));
		var E = w(S);
		L(x);
		var D = w(x, 2), O = r(D);
		M(O, () => t.vb.icon("reply", 14));
		var k = w(O);
		L(D), L(g);
		var A = w(g, 2), j = r(A), ee = (e) => {
			var n = o(), r = T(n);
			M(r, () => t.vb.quoteHtml(t.message.reply_to)), C(e, n);
		};
		V(j, (e) => {
			t.message.reply_to && e(ee);
		});
		var N = w(j, 2), P = r(N), F = (e) => {
			var n = $a(), r = T(n), a = w(r);
			h((e, t) => {
				i(r, `${e ?? ""} `), B(a, "title", t);
			}, [() => t.vb.t("{via} de {who}", {
				via: t.message.via || "agent",
				who: t.vb.name(t.message.author)
			}), () => t.vb.t("Escrito pelo agent dessa pessoa, em nome dela")]), C(e, n);
		}, te = (e) => {
			var n = z();
			h((e) => i(n, e), [() => t.vb.name(t.message.author)]), C(e, n);
		};
		V(P, (e) => {
			t.message.kind === "agent" ? e(F) : e(te, -1);
		});
		var I = w(P, 2), ne = (e) => {
			var n = eo(), r = l(n);
			h((e, t) => {
				B(n, "title", e), i(r, `✓ ${t ?? ""}`);
			}, [() => t.vb.t("Reporta algo entregue"), () => t.vb.t("entregue")]), C(e, n);
		};
		V(I, (e) => {
			t.message.tag === "done" && e(ne);
		});
		var re = w(I), ae = w(re), oe = l(ae, !0);
		L(N);
		var se = w(N, 2);
		M(se, () => v(u), !0), L(se);
		var R = w(se, 2);
		M(R, () => t.vb.attHtml(t.message.files));
		var ce = w(R, 2), le = (e) => {
			var n = o(), r = T(n);
			M(r, () => t.vb.cardHtml(t.message)), C(e, n);
		};
		V(ce, (e) => {
			t.message.card && e(le);
		});
		var ue = w(ce, 2), de = (e) => {
			var n = o(), r = T(n);
			M(r, () => t.vb.choiceHtml(t.message)), C(e, n);
		};
		V(ue, (e) => {
			t.message.choices && e(de);
		});
		var fe = w(ue, 2), pe = (e) => {
			var n = o(), r = T(n);
			M(r, () => t.vb.pollHtml(t.message.poll)), C(e, n);
		};
		V(fe, (e) => {
			t.message.poll && e(pe);
		});
		var me = w(fe, 2), he = (e) => {
			var n = o(), r = T(n);
			M(r, () => t.vb.threadCards(t.message.id)), C(e, n);
		};
		V(me, (e) => {
			n() || e(he);
		}), L(A), L(s), h((e, r, o, l, f, p, m, h, g, y, S, C) => {
			c = ie(s, 1, "msg", null, c, {
				ai: t.message.author === "ai",
				agent: t.message.author !== "ai" && t.message.kind === "agent",
				done: t.message.tag === "done",
				cont: v(a),
				waitMsg: e
			}), B(s, "id", n() ? void 0 : `m${t.message.id}`), B(_, "data-copymsg", t.message.id), B(_, "title", r), B(_, "aria-label", o), i(b, ` ${l ?? ""}`), B(x, "data-copylink", t.message.id), B(x, "title", f), B(x, "aria-label", p), i(E, ` ${m ?? ""}`), B(D, "data-reply", t.message.id), B(D, "title", h), B(D, "aria-label", g), i(k, ` ${y ?? ""}`), i(re, ` · ${S ?? ""}`), B(ae, "title", v(d)), i(oe, C), B(se, "hidden", !v(u));
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
		]), C(e, s);
	};
	V(p, (e) => {
		v(c) === null ? e(g, -1) : e(m);
	}), C(e, f), j();
}
// svelte/Chat.svelte
var ro = a("<div class=\"older\"><button type=\"button\" class=\"ghost\" id=\"olderBtn\"> </button></div>"), io = a("<div class=\"origin\"><!> <div class=\"replies\"><span> </span><button type=\"button\" class=\"ghost\"> <!></button></div></div>"), ao = a("<div><!></div>"), oo = a("<!> <!> <!>", 1);
function so(e, t) {
	b(t, !0);
	let n = D(t, "more", 3, !1), a = D(t, "origin", 3, null), s = D(t, "replyCount", 3, 0);
	var c = o(), u = T(c);
	N(u, () => t.room.id + ":" + t.thread, (e) => {
		var c = oo(), u = T(c), d = (e) => {
			var n = ro(), a = r(n), o = l(a, !0);
			L(n), h((e) => i(o, e), [() => t.vb.t("Carregar mensagens anteriores")]), R("click", a, function(...e) {
				t.onloadolder?.apply(this, e);
			}), C(e, n);
		};
		V(u, (e) => {
			t.list.length && n() && e(d);
		});
		var f = w(u, 2), p = (e) => {
			var n = io(), o = r(n);
			no(o, {
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
			var c = w(o, 2), u = r(c), d = l(u, !0), f = w(u), p = r(f), m = w(p);
			M(m, () => t.vb.icon("reply", 13)), L(f), L(c), L(n), h((e, t) => {
				i(d, e), B(f, "data-gomain", a().id), i(p, `${t ?? ""} `);
			}, [() => s() === 1 ? t.vb.t("1 resposta") : t.vb.t("{n} respostas", { n: s() }), () => t.vb.t("ver na sala principal")]), C(e, n);
		};
		V(f, (e) => {
			a() && e(p);
		});
		var m = w(f, 2), g = (e) => {
			var n = o(), r = T(n);
			Ee(r, 19, () => t.list, (e) => e.id, (e, n, r) => {
				{
					let i = k(() => v(r) ? t.list[v(r) - 1] : t.previous);
					no(e, {
						get message() {
							return v(n);
						},
						get previous() {
							return v(i);
						},
						get typing() {
							return t.room.typing[v(n).id];
						},
						get vb() {
							return t.vb;
						}
					});
				}
			}), C(e, n);
		}, _ = (e) => {
			var n = ao();
			let s;
			var c = r(n), l = (e) => {
				var n = o(), r = T(n);
				M(r, () => t.vb.t("Comece a conversa. Os agents ligados nesta sala leem e respondem; o seu age com o seu OK. Ex.: <i>organiza o projeto em épicos: site novo, aluguéis e domínio</i>.")), C(e, n);
			}, u = (e) => {
				var n = z();
				h((e) => i(n, e), [() => t.vb.t("Discussão deste épico. Os agents leem as tarefas, o doc e a sala principal.")]), C(e, n);
			};
			V(c, (e) => {
				t.thread === "main" ? e(l) : e(u, -1);
			}), L(n), h(() => s = ie(n, 1, "empty", null, s, { afterOrigin: !!a() })), C(e, n);
		};
		V(m, (e) => {
			t.list.length ? e(g) : e(_, -1);
		}), C(e, c);
	}), C(e, c), j();
}
n(["click"]);
// svelte/roomStore.ts
function co(e, t, n) {
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
function lo() {
	let e = ye(null);
	return {
		subscribe: e.subscribe,
		get: () => pe(e),
		replace: e.set,
		apply(t, n) {
			return e.update((e) => co(e, t, n)), pe(e);
		}
	};
}
// svelte/main.ts
var uo = /* @__PURE__ */ Ae({
	createRoomStore: () => lo,
	dismissDialogs: () => he,
	mountInbox: () => mo,
	mountView: () => po
}), fo = {
	tasks: Xe,
	board: ni,
	files: pi,
	reminders: ua,
	sidebar: Za,
	chat: so
};
function po(e, t, n) {
	let r = ye(n), i = fo[e], a = f(() => S(je, {
		target: t,
		props: {
			component: i,
			values: r
		}
	}));
	return {
		update(e) {
			f(() => r.set(e));
		},
		destroy() {
			f(() => {
				De(a);
			});
		}
	};
}
function mo(e, t) {
	let { waits: n, ...r } = t, i = ye(n), a = f(() => S(Re, {
		target: e,
		props: {
			props: r,
			waits: i
		}
	}));
	return Object.assign(() => f(() => {
		De(a);
	}), { updateWaits(e) {
		f(() => i.set(e));
	} });
}
export { Sa as a, Zi as c, lo as i, Me as l, mo as n, ta as o, po as r, Qi as s, uo as t };
