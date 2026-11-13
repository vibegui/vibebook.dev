import { $ as e, $t as t, At as n, Bt as r, Ct as i, Dt as a, Et as o, Ft as s, Gt as c, Ht as l, It as u, J as d, Jt as f, K as p, Kt as m, Lt as h, Mt as g, Ot as _, Pt as v, Q as y, Qt as b, Rt as x, St as S, Tt as C, Ut as w, Vt as T, Wt as E, X as D, Xt as O, Yt as k, Z as A, Zt as j, _t as M, a as N, bt as P, c as F, ct as I, d as ee, dt as L, en as R, et as te, f as ne, ft as re, h as ie, ht as ae, i as oe, jt as z, kt as B, l as se, lt as ce, mt as le, n as ue, nn as de, nt as V, o as fe, p as pe, pt as me, q as he, r as ge, rt as _e, s as ve, st as ye, t as be, tn as xe, tt as Se, u as Ce, ut as H, vt as we, wt as Te, xt as U, yt as Ee } from "./Field-BhEsD9uL.js";
// \0rolldown/runtime.js
var De = Object.defineProperty, Oe = (e, t) => {
	let n = {};
	for (var r in e) De(n, r, {
		get: e[r],
		enumerable: !0
	});
	return t || De(n, Symbol.toStringTag, { value: "Module" }), n;
};
// svelte/View.svelte
function ke(t, n) {
	let r = () => te(n.values, "$values", i), [i, a] = e();
	var s = o(), c = T(s);
	ae(c, () => n.component, (e, t) => {
		t(e, y(r));
	}), C(t, s), a();
}
// shared/uiVariant.ts
function Ae(e, t, n) {
	let r = new URL(t), i = new URL(e, r);
	return i.origin !== r.origin || !/^\/(?:app|archived|login|b\/[a-z0-9]+)\/?$/.test(i.pathname) ? String(e) : (n === "svelte" ? i.searchParams.set("ui", "svelte") : i.searchParams.delete("ui"), i.pathname + i.search + i.hash);
}
// svelte/Inbox.svelte
var je = a("<span class=\"tw:grid tw:size-8 tw:shrink-0 tw:place-items-center tw:rounded-full tw:border tw:border-border tw:bg-muted\"><!></span>"), Me = a("<li class=\"tw:flex tw:items-start tw:gap-2 tw:py-1\"><a class=\"tw:flex tw:min-w-0 tw:flex-1 tw:gap-3 tw:rounded-control tw:p-2 tw:text-foreground tw:no-underline tw:outline-none tw:hover:bg-accent tw:focus-visible:ring-2 tw:focus-visible:ring-ring\"><!> <span class=\"tw:flex tw:min-w-0 tw:flex-1 tw:flex-col tw:gap-1 tw:text-sm tw:leading-5 tw:[overflow-wrap:anywhere]\"><span class=\"tw:line-clamp-3\"><strong class=\"tw:font-semibold\"> </strong> </span> <span class=\"tw:text-xs tw:leading-4 tw:text-muted-foreground\"> </span></span></a> <!></li>"), Ne = a("<ul class=\"tw:m-0 tw:max-h-[60dvh] tw:min-h-0 tw:list-none tw:divide-y tw:divide-border tw:overflow-auto tw:overscroll-contain tw:p-0\"></ul>"), Pe = a("<!> <!>", 1);
function Fe(e, t) {
	b(t, !0);
	let n = (e) => {
		var n = o(), a = T(n), s = (e) => {
			var n = Ne();
			we(n, 21, () => v(x), (e) => O(e), (e, n) => {
				var a = Me(), o = r(a), s = r(o), c = (e) => {
					var t = je(), n = r(t);
					ie(n, { name: "check" }), R(t), C(e, t);
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
				U(s, (e) => {
					v(u) ? e(c) : e(d, -1);
				});
				var m = w(s, 2), g = r(m), _ = r(g), b = l(_, !0), x = w(_);
				R(g);
				var S = w(g, 2), T = l(S);
				R(m), R(o);
				var E = w(o, 2), D = (e) => {
					{
						let r = k(() => t.vb.t("Já resolvi (respondi em outro lugar, ou não é comigo)")), i = k(() => v(f) === O(v(n))), a = k(() => v(f) !== null);
						Ce(e, {
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
							onclick: () => P(v(n))
						});
					}
				}, j = k(() => v(n).ref.startsWith("m"));
				U(E, (e) => {
					v(j) && e(D);
				}), R(a), h((e, t, r, a) => {
					H(o, "href", e), i(b, t), i(x, ` ${v(n).text ?? ""}`), i(T, `${v(y) ? `${v(n).room} › ` : ""}${r ?? ""} · ${a ?? ""}`);
				}, [
					() => N(v(n)),
					() => A(v(n)) === "task" ? t.vb.t("Tarefa sua esperando OK:") : A(v(n)) === "agent" ? t.vb.t("Seu agent espera você:") : `${M(v(n)).split(" ")[0]}:`,
					() => v(n).topic || t.vb.t("sala principal"),
					() => t.vb.ago(v(n).ts)
				]), z("click", o, (e) => t.onopen(v(n), e)), C(e, a);
			}), R(n), C(e, n);
		}, c = (e) => {
			{
				let n = k(() => v(y) ? t.vb.t("Nada esperando você. ✓") : t.vb.t("Nada esperando você nesta sala. ✓"));
				F(e, { get title() {
					return v(n);
				} });
			}
		};
		U(a, (e) => {
			v(x).length ? e(s) : e(c, -1);
		}), C(e, n);
	}, a = D(t, "all", 3, !1), s = m(E(u(() => a() || !t.roomId ? "all" : "room"))), d = m(!0), f = m(null), g = m(""), _ = k(() => t.waits.filter((e) => e.book_id === t.roomId)), y = k(() => v(s) === "all" || !t.roomId), x = k(() => v(y) ? t.waits : v(_)), S = k(() => [{
		value: "room",
		label: `${t.vb.t("Esta sala")} (${v(_).length})`
	}, {
		value: "all",
		label: `${t.vb.t("Todas")} (${t.waits.length})`
	}]), O = (e) => `${e.book_id}:${e.ref}`, A = (e) => e.ref.startsWith("t") ? "task" : /^[ab]/.test(e.ref) ? "agent" : "ask", M = (e) => e.author_name || t.displayName?.(e.author) || e.author.split("@")[0];
	function N(e) {
		return Ae(`/b/${encodeURIComponent(e.book_id)}${e.thread === "main" ? "" : `?t=${encodeURIComponent(e.thread)}`}${/^[mab]/.test(e.ref) ? `#m${e.ref.slice(1)}` : ""}`, window.location.href, "svelte");
	}
	async function P(e) {
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
			var r = Pe(), i = T(r), a = (e) => {
				ve(e, {
					get title() {
						return v(g);
					},
					compact: !0
				});
			};
			U(i, (e) => {
				v(g) && e(a);
			});
			var o = w(i, 2), l = (e) => {
				{
					let r = (e) => {
						n(e);
					}, i = k(() => t.vb.t("Caixa de entrada"));
					se(e, {
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
			U(o, (e) => {
				t.roomId ? e(l) : e(u, -1);
			}), C(e, r);
		}, i = k(() => t.vb.t("Caixa de entrada")), a = k(() => t.vb.t("Fechar"));
		ne(e, {
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
function Ie(t, n) {
	let r = () => te(n.waits, "$waits", i), [i, a] = e();
	Fe(t, y(() => n.props, { get waits() {
		return r();
	} })), a();
}
// svelte/lib/ui/Progress.svelte
var Le = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"value",
	"max",
	"label",
	"class"
]), Re = a("<progress> </progress>");
function ze(e, t) {
	b(t, !0);
	let n = D(t, "max", 3, 100), r = A(t, Le), a = k(() => Number.isFinite(n()) && n() > 0 ? n() : 100), o = k(() => Number.isFinite(t.value) ? Math.min(v(a), Math.max(0, t.value)) : 0);
	var s = Re();
	I(s, (e) => ({
		...r,
		max: v(a),
		value: v(o),
		"aria-label": t.label,
		class: e
	}), [() => he("tw:h-1.5 tw:w-full tw:overflow-hidden tw:rounded-full tw:border-0 tw:bg-muted tw:appearance-none tw:[&::-webkit-progress-bar]:rounded-full tw:[&::-webkit-progress-bar]:bg-muted tw:[&::-webkit-progress-value]:rounded-full tw:[&::-webkit-progress-value]:bg-primary tw:[&::-moz-progress-bar]:rounded-full tw:[&::-moz-progress-bar]:bg-primary", t.class)]);
	var c = l(s);
	h(() => i(c, `${v(o) ?? ""}/${v(a) ?? ""}`)), C(e, s), j();
}
// svelte/TaskList.svelte
var Be = a("<!> ", 1), Ve = a("<div class=\"tw:min-w-0 tw:flex-1 tw:basis-32 tw:space-y-1\"><!> <!></div>"), He = a("<div role=\"group\"><!> <!> <!> <!> <!></div>"), Ue = a("<section data-vb-native=\"\" class=\"tw:m-0 tw:box-border tw:space-y-3 tw:rounded-surface tw:bg-background tw:p-3 tw:font-sans tw:text-sm tw:text-foreground\"><header class=\"tw:flex tw:items-center tw:gap-3\"><h3 class=\"tw:m-0 tw:font-sans tw:text-sm tw:font-semibold\"> </h3> <!> <!></header> <!> <!> <div class=\"tw:space-y-2\"></div> <form id=\"newTask\" class=\"tw:flex tw:items-center tw:gap-2\"><!> <!></form></section>"), We = a("<form class=\"tw:grid tw:grid-cols-1 tw:gap-4\"><!> <!> <div class=\"tw:flex tw:flex-wrap tw:justify-end tw:gap-2\"><!><!></div></form>"), Ge = a("<!> <!>", 1);
function Ke(e, n) {
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
	}))]), S = m(null), E = m(""), O = m(null), A = m(""), M = m(""), P = m(null), F = m(!1), I = m(""), L = m(null), te = k(() => v(s)?.tasks.find((e) => e.id === v(P)));
	x(() => {
		v(S) && v(O) && (v(O).focus(), v(O).select());
	}), x(() => {
		v(P) && !v(te) && ce(), v(S) && !v(s)?.tasks.some((e) => e.id === v(S)) && c(S, null);
	});
	function ae(e) {
		try {
			if (n.send(e)) return c(M, ""), !0;
		} catch {}
		return c(M, n.vb.t("Não deu pra enviar agora. Tente de novo."), !0), !1;
	}
	function z(e, t = !0) {
		v(S) !== e.id || t && v(E).trim() && v(E) !== e.title && !ae({
			t: "task.rename",
			id: e.id,
			title: v(E)
		}) || c(S, null);
	}
	function se(e) {
		c(P, e.id, !0), c(I, e.due ?? "", !0), c(F, !0);
	}
	function ce() {
		c(F, !1), c(P, null), c(I, "");
	}
	var le = Ge(), ue = T(le), de = (e) => {
		var a = Ue(), o = r(a), m = r(o), _ = l(m, !0), y = w(m, 2);
		ge(y, {
			children: (e, n) => {
				t();
				var r = B();
				h(() => i(r, `${v(f) ?? ""}/${v(s).tasks.length ?? ""}`)), C(e, r);
			},
			$$slots: { default: !0 }
		});
		var b = w(y, 2);
		{
			let e = k(() => n.vb.t("Tarefas")), t = k(() => Math.max(1, v(s).tasks.length)), r = k(() => `${v(f)}/${v(s).tasks.length}`);
			ze(b, {
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
		R(o);
		var x = w(o, 2), D = (e) => {
			{
				let t = k(() => `@vibe: ${v(s).flags.join(" · ")}`);
				ge(e, {
					variant: "warning",
					get title() {
						return v(t);
					},
					children: (e, t) => {
						var n = Be(), r = T(n);
						ie(r, {
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
		U(x, (e) => {
			v(s).flags?.length && e(D);
		});
		var j = w(x, 2), P = (e) => {
			ve(e, {
				get title() {
					return v(M);
				},
				compact: !0
			});
		};
		U(j, (e) => {
			v(M) && !v(F) && e(P);
		});
		var I = w(j, 2);
		we(I, 21, () => v(d), (e) => e.id, (e, a) => {
			var o = He(), s = r(o);
			{
				let e = k(() => n.vb.t("Feita"));
				oe(s, {
					get checked() {
						return v(a).done;
					},
					get "aria-label"() {
						return v(e);
					},
					onclick: (e) => {
						e.preventDefault(), ae({
							t: "task.toggle",
							id: v(a).id
						});
					}
				});
			}
			var l = w(s, 2), d = (e) => {
				{
					let t = k(() => n.vb.t("Clique para editar"));
					fe(e, {
						get "data-task-edit"() {
							return v(a).id;
						},
						get "aria-label"() {
							return v(t);
						},
						class: "tw:min-w-32 tw:flex-1",
						onblur: () => z(v(a)),
						onkeydown: (e) => {
							e.key === "Enter" && (e.preventDefault(), z(v(a))), e.key === "Escape" && (e.preventDefault(), z(v(a), !1));
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
				var o = Ve(), s = r(o);
				{
					let e = k(() => he("tw:h-auto tw:w-full tw:justify-start tw:whitespace-normal tw:rounded-sm tw:p-0 tw:text-left tw:hover:bg-transparent tw:hover:underline", v(a).done && "tw:text-muted-foreground tw:line-through")), r = k(() => n.vb.t("Clique para editar"));
					ee(s, {
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
							var r = B();
							h(() => i(r, v(a).title)), C(e, r);
						},
						$$slots: { default: !0 }
					});
				}
				var l = w(s, 2), u = (e) => {
					{
						let t = k(() => `@vibe: ${v(a).flags.join(" · ")}`);
						ge(e, {
							variant: "warning",
							get title() {
								return v(t);
							},
							children: (e, t) => {
								var n = Be(), r = T(n);
								ie(r, {
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
				U(l, (e) => {
					v(a).flags?.length && e(u);
				}), R(o), C(e, o);
			};
			U(l, (e) => {
				v(S) === v(a).id ? e(d) : e(f, -1);
			});
			var m = w(l, 2);
			{
				let e = k(() => n.vb.t("Responsável")), t = k(() => v(a).owner ?? "");
				N(m, {
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
					onValueChange: (e) => ae({
						t: "task.assign",
						id: v(a).id,
						owner: e
					})
				});
			}
			var g = w(m, 2);
			{
				let e = k(() => n.vb.t("Prazo")), t = k(() => v(a).due ? `${n.vb.t("Prazo")}: ${v(a).due}` : n.vb.t("Prazo"));
				ee(g, {
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
					onclick: () => se(v(a)),
					children: (e, t) => {
						var n = Be(), r = T(n);
						ie(r, {
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
				Ce(_, {
					get "data-tdel"() {
						return v(a).id;
					},
					get label() {
						return v(e);
					},
					icon: "close",
					class: "tw:size-8",
					onclick: () => ae({
						t: "task.del",
						id: v(a).id
					})
				});
			}
			R(o), h((e) => {
				H(o, "data-task", v(a).id), H(o, "aria-label", v(a).title), re(o, 1, e);
			}, [() => me(he("tw:flex tw:flex-wrap tw:items-center tw:gap-2 tw:rounded-control tw:border tw:p-2", v(a).done ? "tw:border-transparent tw:bg-muted/40 tw:text-muted-foreground" : "tw:border-border tw:bg-card tw:text-card-foreground", !v(a).done && v(a).owner === n.room.me && "tw:border-ring/50", u(v(a)) && "tw:bg-warning/10"))]), C(e, o);
		}), R(I);
		var L = w(I, 2), te = r(L);
		{
			let e = k(() => n.vb.t("nova task")), t = k(() => n.vb.t("nova task"));
			fe(te, {
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
		var ne = w(te, 2);
		{
			let e = k(() => n.vb.t("Nova tarefa"));
			Ce(ne, {
				type: "submit",
				get label() {
					return v(e);
				},
				icon: "plus",
				variant: "outline"
			});
		}
		R(L), R(a), h((e, t) => {
			H(a, "aria-label", e), i(_, t);
		}, [() => n.vb.t("Tarefas"), () => n.vb.t("Tarefas")]), g("submit", L, (e) => {
			e.preventDefault(), v(A).trim() && ae({
				t: "task.add",
				epic: n.thread,
				title: v(A)
			}) && c(A, "");
		}), C(e, a);
	};
	U(ue, (e) => {
		v(s) && e(de);
	});
	var V = w(ue, 2), pe = (e) => {
		{
			let o = k(() => n.vb.t("Prazo")), s = k(() => n.vb.t("Prazo (ex.: sex, qua 23h, 06/11). Vazio tira o prazo:")), l = k(() => n.vb.t("Fechar"));
			ne(e, {
				get title() {
					return v(o);
				},
				get description() {
					return v(s);
				},
				get closeLabel() {
					return v(l);
				},
				initialFocus: () => v(L),
				onOpenChange: (e) => {
					e || ce();
				},
				get open() {
					return v(F);
				},
				set open(e) {
					c(F, e, !0);
				},
				children: (e, o) => {
					var s = We(), l = r(s);
					{
						let e = (e, t = xe) => {
							fe(e, y(t, {
								get ref() {
									return v(L);
								},
								set ref(e) {
									c(L, e, !0);
								},
								get value() {
									return v(I);
								},
								set value(e) {
									c(I, e, !0);
								}
							}));
						}, t = k(() => `${a}-due`), r = k(() => n.vb.t("Prazo"));
						be(l, {
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
						ve(e, {
							get title() {
								return v(M);
							},
							compact: !0
						});
					};
					U(u, (e) => {
						v(M) && e(d);
					});
					var f = w(u, 2), p = r(f);
					ee(p, {
						variant: "outline",
						onclick: ce,
						children: (e, r) => {
							t();
							var a = B();
							h((e) => i(a, e), [() => n.vb.t("Cancelar")]), C(e, a);
						},
						$$slots: { default: !0 }
					});
					var m = w(p);
					ee(m, {
						type: "submit",
						children: (e, r) => {
							t();
							var a = B();
							h((e) => i(a, e), [() => n.vb.t("Salvar")]), C(e, a);
						},
						$$slots: { default: !0 }
					}), R(f), R(s), g("submit", s, (e) => {
						e.preventDefault(), v(te) && ae({
							t: "task.assign",
							id: v(te).id,
							due: v(I)
						}) && ce();
					}), C(e, s);
				},
				$$slots: { default: !0 }
			});
		}
	};
	U(V, (e) => {
		v(te) && e(pe);
	}), C(e, le), j();
}
// svelte/Tasks.svelte
var qe = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy"
]);
function Je(e, t) {
	b(t, !0);
	let n = A(t, qe);
	var r = o(), i = T(r);
	P(i, () => JSON.stringify([t.room.id, t.thread]), (e) => {
		Ke(e, y(() => n));
	}), C(e, r), j();
}
// node_modules/zod/v4/core/util.js
function Ye(e) {
	let t = Object.values(e).filter((e) => typeof e == "number");
	return Object.entries(e).filter(([e, n]) => t.indexOf(+e) === -1).map(([e, t]) => t);
}
function Xe(e, t) {
	return typeof t == "bigint" ? t.toString() : t;
}
var Ze = class {
	constructor(e) {
		this._getter = e, this._value = void 0;
	}
	get value() {
		let e = this._getter;
		return e !== void 0 && (this._value = e(), this._getter = void 0), this._value;
	}
};
function Qe(e) {
	return new Ze(e);
}
function $e(e) {
	return e == null;
}
function et(e) {
	let t = +!!e.startsWith("^"), n = e.endsWith("$") ? e.length - 1 : e.length;
	return e.slice(t, n);
}
function tt(e, t, n) {
	Object.defineProperty(e, t, {
		value: n,
		writable: !0,
		enumerable: !0,
		configurable: !0
	});
}
function nt(e) {
	let t = Object.getOwnPropertyDescriptor(e, "shape");
	return t?.get ? t.get.raw : t?.value;
}
function rt(e) {
	return nt(e._zod.def) ?? e._zod.def.shape;
}
function it(e, t, n) {
	Object.defineProperty(e, t, {
		get() {
			let e = n();
			return tt(this, t, e), e;
		},
		enumerable: !0,
		configurable: !0
	});
}
function at(e, t, n) {
	t in e ? tt(e, t, n) : e[t] = n;
}
function ot(e, t, n, r) {
	let i = rt(t);
	for (let a of n) {
		let n = Object.getOwnPropertyDescriptor(i, a);
		n.enumerable && (n.get ? it(e, a, () => {
			let e = t._zod.def.shape[a];
			return r ? r(e, a) : e;
		}) : at(e, a, r ? r(n.value, a) : n.value));
	}
}
function st(e, t) {
	for (let n of Reflect.ownKeys(t)) {
		let r = Object.getOwnPropertyDescriptor(t, n);
		r.enumerable && (r.get ? it(e, n, () => t[n]) : at(e, n, r.value));
	}
}
function ct(...e) {
	let t = {};
	for (let n of e) {
		let e = Object.getOwnPropertyDescriptors(n);
		Object.assign(t, e);
	}
	return Object.defineProperties({}, t);
}
var lt = "captureStackTrace" in Error ? Error.captureStackTrace : (...e) => {};
function ut(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function dt(e) {
	if (ut(e) === !1) return !1;
	let t = e.constructor;
	if (t === void 0 || typeof t != "function") return !0;
	let n = t.prototype;
	return ut(n) !== !1 && Object.prototype.hasOwnProperty.call(n, "isPrototypeOf") !== !1;
}
var ft = /* @__PURE__*/ new Set([
	"string",
	"number",
	"symbol"
]);
function pt(e) {
	return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function mt(e, t, n) {
	let r = new e._zod.constr(t ?? e._zod.def);
	return (!t || n?.parent) && (r._zod.parent = e), r;
}
function ht(e) {
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
function gt(e) {
	return Object.keys(e).filter((t) => e[t]._zod.optin !== void 0 && e[t]._zod.optout === "optional");
}
function _t(e, t) {
	if (!dt(t)) throw Error("Invalid input to extend: expected a plain object");
	let n = e._zod.def.checks;
	if (n && n.length > 0) {
		let n = rt(e);
		for (let e of Reflect.ownKeys(t)) if (Object.getOwnPropertyDescriptor(n, e) !== void 0) throw Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
	}
	return mt(e, ct(e._zod.def, { shape: vt(e, t) }));
}
function vt(e, t) {
	let n = {};
	return ot(n, e, Reflect.ownKeys(rt(e))), st(n, t), n;
}
function yt(e, t = 0) {
	if (e.aborted === !0) return !0;
	for (let n = t; n < e.issues.length; n++) if (e.issues[n]?.continue !== !0) return !0;
	return !1;
}
function bt(e, t = 0) {
	if (e.aborted === !0) return !0;
	for (let n = t; n < e.issues.length; n++) if (e.issues[n]?.continue === !1) return !0;
	return !1;
}
function xt(e, t) {
	return t.map((t) => {
		var n;
		return (n = t).path ?? (n.path = []), t.path.unshift(e), t;
	});
}
function St(e) {
	return typeof e == "string" ? e : e?.message;
}
function Ct(e) {
	let t = [];
	for (let n of e ?? []) {
		let e = n._zod.def;
		if (!/_(length|size)$|_equals$/.test(e.check)) break;
		let r = e.maximum ?? e.length ?? e.size;
		r >= 0 && t.push([r, n]);
	}
	return t;
}
function wt(e, t, n) {
	var r;
	for (let i = t; i < e.length; i++) (r = e[i]).schema ?? (r.schema = n);
}
function Tt(e, t, n) {
	var r;
	let i = e.inst?._zod?.traits;
	i?.has("$ZodType") && (i.has("$ZodCheck") ? (r = e).schema ?? (r.schema = e.inst) : e.schema = e.inst);
	let a = e.schema === e.inst ? void 0 : e.schema?._zod.def?.error, o = e.message ? e.message : St(e.inst?._zod.def?.error?.(e)) ?? St(a?.(e)) ?? St(t?.error?.(e)) ?? St(n.customError?.(e)) ?? St(n.localeError?.(e)) ?? "Invalid input", s = {};
	for (let t of Object.keys(e)) t !== "inst" && t !== "schema" && t !== "continue" && t !== "input" && t !== "__proto__" && (s[t] = e[t]);
	return s.path ??= [], s.message = o, t?.reportInput && (s.input = e.input), s;
}
var Et = /[\uD800-\uDBFF]/;
function Dt(e) {
	let t = e.length;
	if (!Et.test(e)) return t;
	let n = t;
	for (let r = 0; r < t - 1; r++) (e.charCodeAt(r) & 64512) == 55296 && (e.charCodeAt(r + 1) & 64512) == 56320 && (n--, r++);
	return n;
}
function Ot(e) {
	return Array.isArray(e) ? "array" : typeof e == "string" ? "string" : "unknown";
}
function kt(e, t) {
	for (let n in t) {
		let r = Object.getOwnPropertyDescriptor(t, n);
		r.get ? Object.defineProperty(e, n, {
			...r,
			enumerable: !1
		}) : Mt(e, n, r.value);
	}
}
function At(e, t, n, r = !0) {
	return Object.defineProperty(e, t, {
		configurable: !0,
		writable: !0,
		enumerable: r,
		value: n
	}), n;
}
function jt(e, t, n) {
	return At(e, t, n, !1);
}
function Mt(e, t, n) {
	Object.defineProperty(e, t, {
		configurable: !0,
		get() {
			return this == null ? n : At(this, t, n.bind(this));
		},
		set(e) {
			At(this, t, e);
		}
	});
}
function Nt(e, t) {
	let n = Object.getPrototypeOf(e);
	return t in n ? void 0 : n;
}
var Pt, Ft = !1, It = {
	configurable: !0,
	get() {
		Ft = !0;
	}
};
function Lt(e, t, n) {
	let r = Object.getPrototypeOf(e._zod);
	t in r && Pt !== e._zod ? Pt = void 0 : (Pt = e._zod, Object.defineProperty(r, t, {
		configurable: !0,
		get() {
			Object.defineProperty(this, t, It);
			let e = Ft;
			Ft = !1;
			try {
				let r = n(this);
				return Ft ? delete this[t] : Object.defineProperty(this, t, {
					configurable: !0,
					writable: !0,
					value: r
				}), Ft ||= e, r;
			} catch (n) {
				throw delete this[t], Ft ||= e, n;
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
function Rt(e, t, n, r) {
	let i = Nt(e, t);
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
var zt, Bt = {
	value: void 0,
	enumerable: !1
}, Vt = "captureStackTrace" in Error ? Error : null;
function Ht(e) {
	let t = Vt;
	if (t) {
		let n = t.stackTraceLimit;
		if (typeof n == "number") {
			try {
				t.stackTraceLimit = 0;
			} catch {
				return Vt = null, new e();
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
			Bt.value = new a(r);
			try {
				Object.defineProperty(n, "_zod", Bt);
			} finally {
				Bt.value = void 0;
			}
		} else if (n._zod.traits.has(e)) return;
		if (n._zod.traits.add(e), t(n, r), s) {
			let e = Object.getPrototypeOf(n), t = n._zod.constr.prototype, r = e;
			for (; r && r !== t;) r = Object.getPrototypeOf(r);
			let i = r ?? e;
			s.has(i) || (s.add(i), kt(i, o));
		}
		let i = d.prototype;
		for (let e in i) Object.prototype.hasOwnProperty.call(i, e) && (e in n || (n[e] = i[e].bind(n)));
	}
	let l = r?.Parent ?? Object;
	class u extends l {}
	Object.defineProperty(u, "name", { value: e });
	function d(e) {
		let t = r?.Parent ? Ht(u) : this;
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
var Ut = class extends Error {
	constructor() {
		super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
	}
};
(zt = globalThis).__zod_globalConfig ?? (zt.__zod_globalConfig = {});
var Wt = globalThis.__zod_globalConfig;
function Gt(e) {
	return e && Object.assign(Wt, e), Wt;
}
// node_modules/zod/v4/core/errors.js
function Kt() {
	let e = this._zod;
	return e.message ??= JSON.stringify(e.def, Xe, 2), e.message;
}
function qt(e) {
	this._zod.message = e;
}
var Jt = {
	get: Kt,
	set: qt,
	enumerable: !0,
	configurable: !0
}, Yt = {
	value: void 0,
	enumerable: !1
}, Xt = /* @__PURE__ */ new WeakSet([Object.prototype, Error.prototype]), Zt = /* @__PURE__ */ W("$ZodError", (e, t) => {
	e.name = "$ZodError", Yt.value = t, Object.defineProperty(e, "issues", Yt), Yt.value = void 0, Object.defineProperty(e, "message", Jt);
	let n = Object.getPrototypeOf(e);
	Xt.has(n) || (Xt.add(n), Object.defineProperty(n, "toString", {
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
}, void 0, { Parent: Error }), Qt = /* @__PURE__*/ ((e) => {
	let t = (n, r, i, a) => {
		let o = i ? {
			...i,
			async: !1
		} : { async: !1 }, s = n._zod.run({
			value: r,
			issues: []
		}, o);
		if (s instanceof Promise) throw new Ut();
		if (s.issues.length) {
			let n = new ((a?.Err) ?? e)(s.issues.map((e) => Tt(e, o, Gt())));
			throw lt(n, a?.callee ?? t), n;
		}
		return s.value;
	};
	return t;
})(Zt), $t = /* @__PURE__*/ ((e) => {
	let t = async (n, r, i, a) => {
		let o = i ? {
			...i,
			async: !0
		} : { async: !0 }, s = n._zod.run({
			value: r,
			issues: []
		}, o);
		if (s instanceof Promise && (s = await s), s.issues.length) {
			let n = new ((a?.Err) ?? e)(s.issues.map((e) => Tt(e, o, Gt())));
			throw lt(n, a?.callee ?? t), n;
		}
		return s.value;
	};
	return t;
})(Zt), en = /* @__PURE__*/ ((e) => (t, n, r) => {
	let i = r ? {
		...r,
		async: !1
	} : { async: !1 }, a = t._zod.run({
		value: n,
		issues: []
	}, i);
	if (a instanceof Promise) throw new Ut();
	return a.issues.length ? tn(e, a.issues, i) : {
		success: !0,
		data: a.value
	};
})(Zt);
function tn(e, t, n) {
	let r;
	return {
		success: !1,
		get error() {
			return r || (r = new e(t.map((e) => Tt(e, n, Gt()))), t = void 0, n = void 0), r;
		},
		set error(e) {
			r = e, t = void 0, n = void 0;
		}
	};
}
var nn = /* @__PURE__*/ ((e) => async (t, n, r) => {
	let i = r ? {
		...r,
		async: !0
	} : { async: !0 }, a = t._zod.run({
		value: n,
		issues: []
	}, i);
	return a instanceof Promise && (a = await a), a.issues.length ? tn(e, a.issues, i) : {
		success: !0,
		data: a.value
	};
})(Zt), rn = /^[\s\S]{0,}$/, an = /^-?\d+(?:\.\d+)?$/, on = /^(?:true|false)$/i, sn = /*@__PURE__*/ W("$ZodCheck", (e, t) => {
	var n;
	e._zod ??= {}, e._zod.def = t, (n = e._zod).onattach ?? (n.onattach = []);
}), cn = (e) => {
	let t = e.value;
	return !$e(t) && t.length !== void 0;
}, ln = /*@__PURE__*/ W("$ZodCheckMaxLength", (e, t) => {
	var n;
	sn.init(e, t), (n = e._zod.def).when ?? (n.when = cn), e._zod.check = (n) => {
		let r = n.value, i = r.length;
		if ((typeof r == "string" && i > t.maximum ? Dt(r) : i) <= t.maximum) return;
		let a = Ot(r);
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
}), un = /*@__PURE__*/ W("$ZodCheckMinLength", (e, t) => {
	var n;
	sn.init(e, t), (n = e._zod.def).when ?? (n.when = cn), e._zod.check = (n) => {
		let r = n.value, i = r.length;
		if ((typeof r == "string" && i >= t.minimum && i < t.minimum * 2 ? Dt(r) : i) >= t.minimum) return;
		let a = Ot(r);
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
}), dn = /*@__PURE__*/ W("$ZodCheckStartsWith", (e, t) => {
	sn.init(e, t);
	let n = RegExp(`^${pt(t.prefix)}.*`);
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
}), fn = {
	major: 4,
	minor: 6,
	patch: 7
}, pn = /*@__PURE__*/ W("$ZodType", (e, t) => {
	var n;
	e ??= {}, e._zod.def = t, e._zod.bag = e._zod.bag || {}, e._zod.version = fn;
	let r = e._zod.def.checks, i = e._zod.traits.has("$ZodCheck") ? [e, ...r ?? []] : r?.length ? [...r] : [];
	for (let t of i) for (let n of t._zod.onattach) n(e);
	if (i.length === 0) (n = e._zod).deferred ?? (n.deferred = []), e._zod.deferred?.push(() => {
		e._zod.run = e._zod.parse;
	});
	else {
		let t = (t, n, r) => {
			if (t.memo) return t;
			let i = yt(t), a;
			for (let o of n) {
				if (o._zod.def.when) {
					if (bt(t) || !o._zod.def.when(t)) continue;
				} else if (i) continue;
				let n = t.issues.length, s = o._zod.check(t);
				if (s instanceof Promise && r?.async === !1) throw new Ut();
				if (a || s instanceof Promise) a = (a ?? Promise.resolve()).then(async () => {
					await s, t.issues.length !== n && (wt(t.issues, n, e), i ||= yt(t, n));
				});
				else {
					if (t.issues.length === n) continue;
					wt(t.issues, n, e), i ||= yt(t, n);
				}
			}
			return a ? a.then(() => t) : t;
		}, n = (n, r, a) => {
			if (yt(n)) return n.aborted = !0, n;
			let o = t(r, i, a);
			if (o instanceof Promise) {
				if (a.async === !1) throw new Ut();
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
				if (a.async === !1) throw new Ut();
				return o.then((e) => t(e, i, a));
			}
			return t(o, i, a);
		};
	}
}, {
	get "~standard"() {
		return jt(this, "~standard", gn(this));
	},
	set "~standard"(e) {
		At(this, "~standard", e);
	}
}), mn = (e, t) => e.issues.length ? { issues: e.issues.map((e) => Tt(e, t, Gt())) } : { value: e.value };
async function hn(e, t) {
	let n = { async: !0 };
	return mn(await e._zod.run({
		value: t,
		issues: []
	}, n), n);
}
function gn(e) {
	return {
		validate: (t) => {
			let n = { async: !1 };
			try {
				let r = e._zod.run({
					value: t,
					issues: []
				}, n);
				if (!(r instanceof Promise)) return mn(r, n);
			} catch {}
			return hn(e, t);
		},
		vendor: "zod",
		version: 1
	};
}
var _n = /*@__PURE__*/ W("$ZodString", (e, t) => {
	pn.init(e, t), e._zod.pattern = t.pattern ?? rn, e._zod.parse = (n, r) => {
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
}), vn = /*@__PURE__*/ W("$ZodNumber", (e, t) => {
	pn.init(e, t), e._zod.pattern = an, e._zod.parse = (n, r) => {
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
}), yn = /*@__PURE__*/ W("$ZodBoolean", (e, t) => {
	pn.init(e, t), e._zod.pattern = on, e._zod.parse = (n, r) => {
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
}), bn = /*@__PURE__*/ W("$ZodNever", (e, t) => {
	pn.init(e, t), e._zod.parse = (t, n) => (t.issues.push({
		expected: "never",
		code: "invalid_type",
		input: t.value,
		inst: e
	}), t);
});
function xn(e, t) {
	let n = Ct(e._zod.def.checks);
	if (!n.length) return;
	let r = Math.min(...n.map((e) => e[0])), i = e._zod.parse;
	e._zod.parse = (n, a) => {
		let o = t(n.value);
		if (o > r && !a?.skipChecks && a?.direction !== "backward") {
			for (let [t, r] of Ct(e._zod.def.checks)) if (o > t && r._zod.def.when(n)) {
				let t = n.issues.length;
				return r._zod.check(n), n.issues[t].continue = !1, wt(n.issues, t, e), n;
			}
		}
		return i(n, a);
	};
}
var Sn = (e) => Array.isArray(e) ? e.length : -1;
function Cn(e, t, n) {
	e.issues.length && t.issues.push(...xt(n, e.issues)), t.value[n] = e.value;
}
var wn = /*@__PURE__*/ W("$ZodArray", (e, t) => {
	pn.init(e, t);
	let n = Wt.memoizer;
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
			if (c instanceof Promise) o.push(c.then((t) => Cn(t, r, e)));
			else if (Cn(c, r, e), s && c.issues.length !== 0 && yt(c)) break;
		}
		return o.length ? Promise.all(o).then(() => r) : r;
	}, xn(e, Sn);
});
function Tn(e, t, n, r, i, a) {
	let o = n in r, s = a === "optional";
	if (o || !s || i !== "optional") {
		if (e.issues.length) {
			if (i !== void 0 && s && !o) return;
			t.issues.push(...xt(n, e.issues));
		}
		!o && i === void 0 ? e.issues.length || t.issues.push({
			code: "invalid_type",
			expected: "nonoptional",
			input: void 0,
			path: [n]
		}) : e.value === void 0 ? (o || i === "defaulted" && !s) && (t.value[n] = void 0) : t.value[n] = e.value;
	}
}
var En = [];
function Dn(e) {
	let t = Object.keys(e.shape), n = Object.getOwnPropertySymbols(e.shape), r = n.length ? n : En, i = r.length ? [...t, ...r] : t;
	for (let t of i) if (!e.shape?.[t]?._zod?.traits?.has("$ZodType")) throw Error(`Invalid element at key "${String(t)}": expected a Zod schema`);
	let a = gt(e.shape);
	return {
		...e,
		allKeys: i,
		symbolKeys: r,
		keySet: new Set(t),
		numKeys: t.length,
		optionalKeys: new Set(a)
	};
}
function On(e, t, n, r, i, a, o) {
	let s = [], c = i.keySet, l = i.catchall._zod, u = l.def.type, d = l.optin, f = l.optout, p = 0;
	for (let i in t) {
		if (o && n.issues.length !== p) {
			if (yt(n, p)) break;
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
		a instanceof Promise ? e.push(a.then((e) => Tn(e, n, i, t, d, f))) : Tn(a, n, i, t, d, f);
	}
	return s.length && n.issues.push({
		code: "unrecognized_keys",
		keys: s,
		input: t,
		inst: a,
		continue: !0
	}), e.length ? Promise.all(e).then(() => n) : n;
}
var kn = /*@__PURE__*/ W("$ZodObject", (e, t) => {
	pn.init(e, t);
	let n = Object.getOwnPropertyDescriptor(t, "shape"), r = n?.get ? n.get.raw : t.shape ?? {};
	if (r) {
		let e = () => {
			let n = { ...r };
			return Object.defineProperty(t, "shape", { value: n }), e.raw = n, n;
		};
		e.raw = r, Object.defineProperty(t, "shape", { get: e });
	}
	let i = Qe(() => Dn(t));
	Lt(e, "propValues", (e) => {
		let t = e.def.shape, n = {};
		for (let e in t) {
			let r = t[e]._zod;
			if (r.values) {
				Object.prototype.hasOwnProperty.call(n, e) || tt(n, e, /* @__PURE__ */ new Set());
				for (let t of r.values) n[e].add(t);
				r.optin !== void 0 && n[e].add(void 0);
			}
		}
		return n;
	});
	let a = ut, o = t.catchall, s, c = Wt.memoizer;
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
				if (yt(t, f)) break;
				f = t.issues.length;
			}
			if (e === "__proto__") continue;
			let i = u[e], a = i._zod.optin, o = i._zod.optout, s = i._zod.run({
				value: r[e],
				issues: []
			}, n);
			s instanceof Promise ? l.push(s.then((n) => Tn(n, t, e, r, a, o))) : Tn(s, t, e, r, a, o);
		}
		return o ? On(l, r, t, n, i.value, e, d === !0) : l.length ? Promise.all(l).then(() => t) : t;
	};
});
function An(e, t, n, r) {
	for (let n of e) if (n.issues.length === 0) return t.value = n.value, t;
	let i = e.filter((e) => !yt(e));
	return i.length === 1 ? (t.value = i[0].value, i[0]) : (t.issues.push({
		code: "invalid_union",
		input: t.value,
		inst: n,
		errors: e.map((e) => e.issues.map((e) => Tt(e, r, Gt())))
	}), t);
}
var jn = /*@__PURE__*/ W("$ZodUnion", (e, t) => {
	pn.init(e, t), Lt(e, "optin", (e) => e.def.options.some((e) => e._zod.optin === "defaulted") ? "defaulted" : e.def.options.some((e) => e._zod.optin !== void 0) ? "optional" : void 0), Lt(e, "optout", (e) => e.def.options.some((e) => e._zod.optout === "optional") ? "optional" : void 0), Lt(e, "values", (e) => {
		if (e.def.options.every((e) => e._zod.values)) return new Set(e.def.options.flatMap((e) => Array.from(e._zod.values)));
	}), Lt(e, "pattern", (e) => {
		if (e.def.options.every((e) => e._zod.pattern)) {
			let t = e.def.options.map((e) => e._zod.pattern);
			return RegExp(`^(${t.map((e) => et(e.source)).join("|")})$`);
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
		return a ? Promise.all(o).then((t) => An(t, r, e, i)) : An(o, r, e, i);
	};
});
function Mn(e) {
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
var Nn = /*@__PURE__*/ W("$ZodDiscriminatedUnion", (e, t) => {
	t.inclusive = !1, jn.init(e, t);
	let n = e._zod.parse;
	Lt(e, "propValues", (e) => {
		let t = {}, n = 0;
		for (let r of e.def.options) {
			let i = r._zod.propValues;
			if (!i || Object.keys(i).length === 0) throw Error(`Invalid discriminated union option at index "${e.def.options.indexOf(r)}"`);
			i[e.def.discriminator]?.has(void 0) && n++;
			for (let [e, n] of Object.entries(i)) {
				Object.prototype.hasOwnProperty.call(t, e) || tt(t, e, /* @__PURE__ */ new Set());
				for (let r of n) t[e].add(r);
			}
		}
		return !e.def.unionFallback && n > 1 && t[e.def.discriminator]?.delete(void 0), t;
	}), t.options.forEach((e, n) => {
		let r = nt(e._zod.def);
		if (r && !Object.prototype.hasOwnProperty.call(r, t.discriminator)) throw Error(`Invalid discriminated union option at index "${n}"`);
	});
	let r = Qe(() => Mn(t));
	e._zod.parse = (i, a) => {
		let o = i.value;
		if (!ut(o)) return i.issues.push({
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
}), Pn = /*@__PURE__*/ W("$ZodRecord", (e, t) => {
	pn.init(e, t);
	let n = Wt.memoizer;
	n?.attach(e), e._zod.parse = (r, i) => {
		let a = r.value;
		if (!dt(a)) return r.issues.push({
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
						issues: s.issues.map((e) => Tt(e, i, Gt())),
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
					e.issues.length && r.issues.push(...xt(n, e.issues)), r.value[l] = e.value;
				})) : (u.issues.length && r.issues.push(...xt(n, u.issues)), r.value[l] = u.value);
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
				if (typeof n == "string" && an.test(n) && l.issues.length) {
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
						issues: l.issues.map((e) => Tt(e, i, Gt())),
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
					e.issues.length && r.issues.push(...xt(n, e.issues)), r.value[u] = e.value;
				})) : (d.issues.length && r.issues.push(...xt(n, d.issues)), r.value[u] = d.value);
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
}), Fn = /*@__PURE__*/ W("$ZodEnum", (e, t) => {
	pn.init(e, t);
	let n = Ye(t.entries), r = new Set(n);
	e._zod.values = r, Lt(e, "pattern", (e) => {
		let t = Ye(e.def.entries).filter((e) => ft.has(typeof e));
		return RegExp(t.length ? `^(${t.map((e) => pt(e.toString())).join("|")})$` : "^[^\\s\\S]$");
	}), e._zod.parse = (t, i) => {
		let a = t.value;
		return r.has(a) || t.issues.push({
			code: "invalid_value",
			values: n,
			input: a,
			inst: e
		}), t;
	};
}), In = /*@__PURE__*/ W("$ZodLiteral", (e, t) => {
	pn.init(e, t);
	let n = new Set(t.values);
	e._zod.values = n, Lt(e, "pattern", (e) => {
		let t = e.def.values;
		return RegExp(t.length ? `^(${t.map((e) => typeof e == "string" ? pt(e) : e ? pt(e.toString()) : String(e)).join("|")})$` : "^[^\\s\\S]$");
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
function Ln(e, t) {
	return e.value = t.issues.length ? void 0 : t.value, e;
}
var Rn = /*@__PURE__*/ W("$ZodOptional", (e, t) => {
	pn.init(e, t), Lt(e, "optin", (e) => e.def.innerType._zod.optin === "defaulted" ? "defaulted" : "optional"), e._zod.optout = "optional", Lt(e, "values", (e) => {
		let t = e.def.innerType._zod.values;
		return t ? /* @__PURE__ */ new Set([...t, void 0]) : void 0;
	}), Lt(e, "pattern", (e) => {
		let t = e.def.innerType._zod.pattern;
		return t ? RegExp(`^(${et(t.source)})?$`) : void 0;
	}), e._zod.parse = (e, n) => {
		if (e.value === void 0) {
			if (t.innerType._zod.optin !== "defaulted") return e;
			let r = t.innerType._zod.run({
				value: e.value,
				issues: []
			}, n);
			return r instanceof Promise ? r.then((t) => Ln(e, t)) : Ln(e, r);
		}
		return t.innerType._zod.run(e, n);
	};
}), zn = /*@__PURE__*/ W("$ZodNullable", (e, t) => {
	pn.init(e, t), Lt(e, "optin", (e) => e.def.innerType._zod.optin), Lt(e, "optout", (e) => e.def.innerType._zod.optout), Lt(e, "pattern", (e) => {
		let t = e.def.innerType._zod.pattern;
		return t ? RegExp(`^(${et(t.source)}|null)$`) : void 0;
	}), Lt(e, "values", (e) => e.def.innerType._zod.values ? /* @__PURE__ */ new Set([...e.def.innerType._zod.values, null]) : void 0), e._zod.parse = (e, n) => e.value === null ? e : t.innerType._zod.run(e, n);
});
// node_modules/zod/v4/core/api.js
function Bn(e) {
	return e.checks &&= [...e.checks], e;
}
// @__NO_SIDE_EFFECTS__
function Vn(e, t) {
	return new e(Bn({
		type: "string",
		...ht(t)
	}));
}
// @__NO_SIDE_EFFECTS__
function Hn(e, t) {
	return new e(Bn({
		type: "number",
		checks: [],
		...ht(t)
	}));
}
// @__NO_SIDE_EFFECTS__
function Un(e, t) {
	return new e({
		type: "boolean",
		...ht(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Wn(e, t) {
	return new e({
		type: "never",
		...ht(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Gn(e, t) {
	return new ln({
		check: "max_length",
		...ht(t),
		maximum: e
	});
}
// @__NO_SIDE_EFFECTS__
function Kn(e, t) {
	return new un({
		check: "min_length",
		...ht(t),
		minimum: e
	});
}
// @__NO_SIDE_EFFECTS__
function qn(e, t) {
	return new dn({
		check: "string_format",
		format: "starts_with",
		...ht(t),
		prefix: e
	});
}
// node_modules/zod/v4/mini/schemas.js
var Jn = /*@__PURE__*/ W("ZodMiniType", (e, t) => {
	if (!e._zod) throw Error("Uninitialized schema in ZodMiniType.");
	pn.init(e, t), e.def = t, e.type = t.type;
}, {
	get with() {
		return this.check;
	},
	set with(e) {
		At(this, "with", e);
	},
	parse(e, t) {
		return Qt(this, e, t, { callee: this.parse });
	},
	parseAsync(e, t) {
		return $t(this, e, t, { callee: this.parseAsync });
	},
	safeParse(e, t) {
		return en(this, e, t);
	},
	safeParseAsync(e, t) {
		return nn(this, e, t);
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
		return mt(this, e, t);
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
}), Yn = /*@__PURE__*/ W("ZodMiniString", (e, t) => {
	_n.init(e, t), Jn.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function G(e) {
	return /* @__PURE__ */ Vn(Yn, e);
}
var Xn = /*@__PURE__*/ W("ZodMiniNumber", (e, t) => {
	vn.init(e, t), Jn.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function Zn(e) {
	return /* @__PURE__ */ Hn(Xn, e);
}
var Qn = /*@__PURE__*/ W("ZodMiniBoolean", (e, t) => {
	yn.init(e, t), Jn.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function $n(e) {
	return /* @__PURE__ */ Un(Qn, e);
}
var er = /*@__PURE__*/ W("ZodMiniNever", (e, t) => {
	bn.init(e, t), Jn.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function tr(e) {
	return /* @__PURE__ */ Wn(er, e);
}
var nr = /*@__PURE__*/ W("ZodMiniArray", (e, t) => {
	wn.init(e, t), Jn.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function K(e, t) {
	return new nr({
		type: "array",
		element: e,
		...ht(t)
	});
}
var rr = /*@__PURE__*/ W("ZodMiniObject", (e, t) => {
	kn.init(e, t), Jn.init(e, t), Rt(e, "shape", (e) => e._zod.def.shape, !1);
});
// @__NO_SIDE_EFFECTS__
function q(e, t) {
	return new rr({
		type: "object",
		shape: e ?? {},
		...ht(t)
	});
}
// @__NO_SIDE_EFFECTS__
function ir(e, t) {
	return _t(e, t);
}
var ar = /*@__PURE__*/ W("ZodMiniUnion", (e, t) => {
	jn.init(e, t), Jn.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function or(e, t) {
	return new ar({
		type: "union",
		options: e,
		...ht(t)
	});
}
var sr = /*@__PURE__*/ W("ZodMiniDiscriminatedUnion", (e, t) => {
	Nn.init(e, t), Jn.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function cr(e, t, n) {
	return new sr({
		type: "union",
		options: t,
		discriminator: e,
		...ht(n)
	});
}
var lr = /*@__PURE__*/ W("ZodMiniRecord", (e, t) => {
	Pn.init(e, t), Jn.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function ur(e, t, n) {
	return !t || !t._zod ? new lr({
		type: "record",
		keyType: /* @__PURE__ */ G(),
		valueType: e,
		...ht(t)
	}) : new lr({
		type: "record",
		keyType: e,
		valueType: t,
		...ht(n)
	});
}
var dr = /*@__PURE__*/ W("ZodMiniEnum", (e, t) => {
	Fn.init(e, t), Jn.init(e, t), e.options = [...e._zod.values];
});
// @__NO_SIDE_EFFECTS__
function fr(e, t) {
	return new dr({
		type: "enum",
		entries: Array.isArray(e) ? Object.fromEntries(e.map((e) => [e, e])) : e,
		...ht(t)
	});
}
var pr = /*@__PURE__*/ W("ZodMiniLiteral", (e, t) => {
	In.init(e, t), Jn.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function J(e, t) {
	return new pr({
		type: "literal",
		values: Array.isArray(e) ? e : [e],
		...ht(t)
	});
}
var mr = /*@__PURE__*/ W("ZodMiniOptional", (e, t) => {
	Rn.init(e, t), Jn.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function Y(e) {
	return new mr({
		type: "optional",
		innerType: e
	});
}
var hr = /*@__PURE__*/ W("ZodMiniNullable", (e, t) => {
	zn.init(e, t), Jn.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function gr(e) {
	return new hr({
		type: "nullable",
		innerType: e
	});
}
// shared/room.ts
var X = /* @__PURE__ */ G(), _r = /* @__PURE__ */ Zn(), vr = /* @__PURE__ */ $n(), Z = (e) => /* @__PURE__ */ Y(e), Q = (e) => /* @__PURE__ */ Y(/* @__PURE__ */ gr(e)), yr = /* @__PURE__ */ K(X), br = [
	"todo",
	"doing",
	"review",
	"done"
], xr = /* @__PURE__ */ q({
	title: X,
	owner: X,
	summary: Q(X),
	folder: Q(X)
}), Sr = /* @__PURE__ */ q({
	title: X,
	tasks: yr,
	why: Z(X)
}), Cr = /* @__PURE__ */ q({
	id: _r,
	text: X,
	who: X,
	kind: X,
	ts: _r
}), wr = /* @__PURE__ */ q({
	id: X,
	kind: X,
	ref: X,
	title: Z(X),
	author: Z(X),
	ts: Z(_r)
}), Tr = /* @__PURE__ */ q({
	id: X,
	question: X,
	options: yr,
	multi: vr,
	closed: vr,
	author: X,
	votes: /* @__PURE__ */ K(yr)
}), Er = /* @__PURE__ */ q({
	id: X,
	title: X,
	done: vr,
	status: /* @__PURE__ */ fr(br),
	owner: Q(X),
	due: Q(X),
	flags: Z(yr),
	epic_id: Z(X)
}), Dr = /* @__PURE__ */ q({
	id: X,
	title: X,
	tasks: /* @__PURE__ */ K(Er),
	archived: Z(vr),
	owner: Q(X),
	from_msg: Q(_r),
	parent: Q(X),
	kept: Z(vr),
	files: Z(/* @__PURE__ */ K(/* @__PURE__ */ q({
		id: X,
		name: X,
		type: X,
		n: _r
	}))),
	flags: Z(yr),
	prod: Q(/* @__PURE__ */ q({
		stage: X,
		note: Z(X),
		at: Z(_r)
	}))
}), Or = /* @__PURE__ */ q({
	id: X,
	name: X,
	type: X,
	size: _r,
	author: X,
	ts: _r,
	embed: Z(vr)
}), kr = /* @__PURE__ */ q({
	id: _r,
	thread: X,
	author: X,
	ts: _r,
	text: X,
	kind: Q(X),
	tag: Q(X),
	via: Q(X),
	reply_to: Q(_r),
	choices: Q(X),
	poll: Q(X),
	card: Q(X),
	quiet: Z(vr),
	cut: Z(vr),
	for_who: Q(X),
	files: Z(/* @__PURE__ */ K(Or))
}), Ar = /* @__PURE__ */ q({
	msg_id: _r,
	agent: Z(X),
	email: X,
	who: X,
	status: X,
	ts: _r,
	note: Q(X)
}), jr = /* @__PURE__ */ q({
	id: X,
	name: Q(X),
	text: X,
	owner: X,
	enabled: vr,
	error: Q(X),
	every: Q(X),
	cron: Q(X),
	next_at: Q(_r),
	thread: Z(X),
	tz: Z(X),
	file_id: Q(X)
}), Mr = /* @__PURE__ */ q({
	email: X,
	name: Q(X),
	ts: _r
}), Nr = /* @__PURE__ */ q({
	email: X,
	who: X,
	read: _r,
	delivered: _r,
	agent: Z(X),
	ts: Z(_r)
}), Pr = /* @__PURE__ */ q({
	me: X,
	book: xr,
	messages: /* @__PURE__ */ K(kr),
	epics: /* @__PURE__ */ K(Dr),
	roomTasks: Z(/* @__PURE__ */ K(Er)),
	members: yr,
	online: yr,
	names: Z(/* @__PURE__ */ ur(X, X)),
	avatars: Z(/* @__PURE__ */ ur(X, _r)),
	pending: Z(yr),
	requests: Z(/* @__PURE__ */ K(Mr)),
	suggestions: /* @__PURE__ */ K(Sr),
	files: Z(/* @__PURE__ */ K(Or)),
	filesN: Z(_r),
	filesAll: Z(vr),
	reminders: Z(/* @__PURE__ */ K(jr)),
	acks: Z(/* @__PURE__ */ K(Ar)),
	receipts: Z(/* @__PURE__ */ K(Nr)),
	counts: Z(/* @__PURE__ */ ur(X, _r)),
	countsAt: Z(_r),
	full: Z(yr),
	complete: Z(vr),
	origins: Z(/* @__PURE__ */ K(kr)),
	docs: Z(/* @__PURE__ */ ur(X, X)),
	doc: Z(X),
	docNotes: Z(yr),
	decisions: Z(/* @__PURE__ */ K(Cr)),
	pins: Z(/* @__PURE__ */ K(wr)),
	polls: Z(/* @__PURE__ */ ur(X, Tr))
}), Fr = {
	todo: "A fazer",
	doing: "Fazendo",
	review: "Esperando OK",
	done: "Feito"
}, Ir = br.map((e) => ({
	value: e,
	label: Fr[e]
}));
function Lr(e, t) {
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
function Rr() {
	try {
		return localStorage.getItem("vb.boardMode") === "list" ? "list" : "board";
	} catch {
		return "board";
	}
}
function zr(e, t) {
	return Ir[Ir.findIndex((t) => t.value === e) + t]?.value;
}
function Br(e) {
	return Ir.some((t) => t.value === e);
}
// svelte/features/board/BoardPanel.svelte
var Vr = a("<!> ", 1), Hr = a("<!><span> </span>", 1), Ur = a("<span class=\"tw:inline-flex tw:items-center tw:gap-1\"><!> </span>"), Wr = a("<span data-board-drag=\"\" draggable=\"true\" aria-hidden=\"true\" class=\"tw:absolute tw:right-2 tw:top-2 tw:grid tw:size-7 tw:cursor-grab tw:place-items-center tw:rounded-md tw:text-muted-foreground tw:active:cursor-grabbing\"><!></span>"), Gr = a("<article><button type=\"button\" data-board-open=\"\"><span> </span> <!> <span class=\"tw:flex tw:flex-wrap tw:items-center tw:gap-2 tw:text-xs tw:text-muted-foreground\"><!> <!> <!></span></button> <!> <div><!> <!></div></article>"), Kr = a("<p class=\"tw:m-0 tw:py-4 tw:text-xs tw:text-muted-foreground\"> </p>"), qr = a("<section><h3 class=\"tw:m-0 tw:flex tw:items-center tw:justify-between tw:gap-2 tw:font-sans tw:text-sm tw:font-semibold tw:leading-5 tw:tracking-normal\"> <!></h3> <div class=\"tw:space-y-3\"></div></section>"), Jr = a("<div class=\"tw:h-full tw:min-h-0 tw:min-w-0 tw:overflow-auto tw:pb-2\"><div class=\"tw:grid tw:grid-cols-[repeat(4,minmax(15rem,1fr))] tw:gap-3\"></div></div>"), Yr = a("<section class=\"tw:space-y-2\"><h3 class=\"tw:m-0 tw:flex tw:items-center tw:gap-2 tw:font-sans tw:text-sm tw:font-semibold tw:leading-5 tw:tracking-normal\"> <!></h3> <!></section>"), Xr = a("<div class=\"tw:h-full tw:min-h-0 tw:space-y-5 tw:overflow-auto\"><!> <!></div>"), Zr = a("<div class=\"tw:min-w-32 tw:flex-1 tw:space-y-1\"><!> <!></div>"), Qr = a("<section data-vb-native=\"\" class=\"tw:m-0 tw:box-border tw:flex tw:min-h-0 tw:min-w-0 tw:flex-1 tw:flex-col tw:gap-3 tw:rounded-surface tw:bg-background tw:p-3 tw:font-sans tw:text-sm tw:text-foreground\"><p class=\"tw:m-0 tw:text-xs tw:text-muted-foreground\"> </p> <!> <p role=\"status\" aria-live=\"polite\" class=\"tw:sr-only\"> </p> <p class=\"tw:sr-only\"> </p> <!> <form class=\"tw:flex tw:shrink-0 tw:flex-wrap tw:items-end tw:gap-2\" data-board-add=\"\"><div class=\"tw:min-w-36 tw:flex-1 tw:space-y-1\"><!> <!></div> <!> <!></form></section>");
function $r(e, n) {
	let a = _();
	b(n, !0);
	let f = (e, o = xe, s = xe, u = xe) => {
		var d = Gr(), f = r(d), m = r(f), _ = l(m, !0), y = w(m, 2), b = (e) => {
			{
				let t = k(() => `@vibe: ${o().flags.join(" · ")}`);
				ge(e, {
					variant: "warning",
					get title() {
						return v(t);
					},
					children: (e, t) => {
						var n = Vr(), r = T(n);
						ie(r, {
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
		U(y, (e) => {
			o().flags?.length && e(b);
		});
		var x = w(y, 2), S = r(x);
		ge(S, {
			children: (e, n) => {
				t();
				var r = B();
				h(() => i(r, o().epicTitle)), C(e, r);
			},
			$$slots: { default: !0 }
		});
		var E = w(S, 2), D = (e) => {
			var t = Hr(), r = T(t);
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
		U(E, (e) => {
			o().owner && e(D);
		});
		var O = w(E, 2), A = (e) => {
			var t = Ur(), n = r(t);
			ie(n, {
				name: "calendar",
				class: "tw:size-3"
			});
			var a = w(n, 1, !0);
			R(t), h(() => i(a, o().due)), C(e, t);
		};
		U(O, (e) => {
			o().due && e(A);
		}), R(x), R(f);
		var j = w(f, 2), M = (e) => {
			var t = Wr(), i = r(t);
			ie(i, { name: "grip" }), R(t), h((e) => H(t, "title", e), [() => n.vb.t("Arraste, ou use ← →. Clique pra abrir o épico.")]), C(e, t);
		};
		U(j, (e) => {
			u() || e(M);
		});
		var F = w(j, 2), ee = r(F);
		{
			let e = k(() => `${a}-${s()}`);
			ue(ee, {
				get for() {
					return v(e);
				},
				children: (e, r) => {
					t();
					var a = B();
					h((e) => i(a, e), [() => n.vb.t("Status")]), C(e, a);
				},
				$$slots: { default: !0 }
			});
		}
		var L = w(ee, 2);
		{
			let e = k(() => `${a}-${s()}`), t = k(() => `${n.vb.t("Status")}: ${o().title}`);
			N(L, {
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
					return v(ae);
				},
				onValueChange: (e) => (Br(e) && Se(o(), e, s()), !1)
			});
		}
		R(F), R(d), le(d, (e, t) => ye?.(e, t), s), h((e, t, n, r) => {
			H(d, "data-board-task", o().id), H(d, "data-status", o().status), H(d, "draggable", !u()), re(d, 1, e), H(f, "data-epic", o().epicId), H(f, "aria-describedby", `${a}-keys`), re(f, 1, t), re(m, 1, n), i(_, o().title), re(F, 1, r);
		}, [
			() => me(he("tw:relative tw:min-w-0 tw:rounded-control tw:border tw:border-border tw:bg-card tw:text-card-foreground tw:shadow-xs", u() && "tw:flex tw:flex-wrap tw:items-center", v(I) === o().id && "tw:opacity-50", o().status !== "done" && o().owner === n.room.me && "tw:ring-1 tw:ring-ring/20")),
			() => me(he("tw:block tw:w-full tw:min-w-0 tw:flex-1 tw:space-y-2 tw:rounded-control tw:border-0 tw:bg-transparent tw:p-3 tw:text-left tw:font-sans tw:text-sm tw:text-card-foreground tw:outline-none tw:hover:bg-accent tw:focus-visible:ring-2 tw:focus-visible:ring-ring", !u() && "tw:pr-10")),
			() => me(he("tw:block tw:break-words tw:font-medium", o().status === "done" && "tw:line-through")),
			() => me(he("tw:min-w-32 tw:space-y-1 tw:p-3", !u() && "tw:border-t tw:border-border"))
		]), g("dragstart", d, (e) => {
			e.target instanceof Element && e.target.closest("select") ? e.preventDefault() : (e.dataTransfer && (e.dataTransfer.setData("application/x-vibebook-task", o().id), e.dataTransfer.effectAllowed = "move", e.dataTransfer.setDragImage(e.currentTarget, 20, 20)), c(I, o().id, !0));
		}), g("dragend", d, () => {
			c(I, null), c(P, null);
		}), z("click", f, () => n.onopen?.(o().epicId)), z("keydown", f, (e) => Ee(e, o(), s())), C(e, d);
	}, y = k(() => Lr(n.room, n.thread)), S = m(E(Rr())), D = m(""), O = m(null), A = m(""), M = m(""), P = m(null), I = m(null), L = m(E(u(() => v(y).targets.find((e) => e.id === v(y).scope) ?? v(y).targets.find((e) => e.id !== "main") ?? v(y).targets[0] ?? {
		id: n.thread,
		title: n.thread
	}))), te = k(() => v(y).targets.some((e) => e.id === v(L).id)), ne = k(() => [...v(te) ? [] : [{
		value: v(L).id,
		label: v(L).title,
		disabled: !0
	}], ...v(y).targets.map((e) => ({
		value: e.id,
		label: e.title
	}))]), ae = k(() => Ir.map((e) => ({
		value: e.value,
		label: n.vb.t(e.label)
	}))), oe = k(() => v(y).groups.map((e) => ({
		...e,
		tasks: e.tasks.filter((e) => e.status !== "done")
	})).filter((e) => e.tasks.length)), ce = k(() => v(y).tasks.filter((e) => e.owner === n.room.me && e.status !== "done")), de = /* @__PURE__ */ new Map(), V = 0, pe = !1, _e = m(null);
	d(() => {
		pe = !0, V++, de.clear();
	});
	function ye(e, t) {
		return de.set(t, e), { destroy() {
			de.get(t) === e && de.delete(t);
		} };
	}
	function be(e) {
		try {
			if (n.send(e)) return c(A, ""), !0;
		} catch {}
		return c(A, n.vb.t("Não deu pra enviar agora. Tente de novo."), !0), !1;
	}
	function Se(e, t, n) {
		if (e.status === t) return !0;
		let r = document.activeElement, i = r instanceof HTMLElement && de.get(n)?.contains(r) ? r : null;
		return be({
			t: "task.status",
			id: e.id,
			status: t
		}) ? (c(_e, {
			id: e.id,
			status: t,
			generation: ++V,
			...i ? { focus: {
				key: n,
				node: i,
				selector: i.matches("select") ? "select" : "[data-board-open]"
			} } : {}
		}, !0), !0) : !1;
	}
	x(() => {
		let e = v(_e);
		if (!e) return;
		let t = [...n.room.roomTasks ?? [], ...n.room.epics.flatMap((e) => e.tasks)].find((t) => t.id === e.id);
		t ? t.status === e.status && (c(_e, null), c(M, `${t.title}: ${n.vb.t(Ir.find((e) => e.value === t.status)?.label ?? t.status)}`), Ce(e)) : (c(_e, null), Ce(e));
	});
	function Ce(e) {
		let t = e.focus;
		!t || document.activeElement !== t.node && document.activeElement !== document.body || s().then(() => {
			if (pe || e.generation !== V || document.activeElement !== t.node && document.activeElement !== document.body) return;
			let n = de.get(t.key)?.querySelector(t.selector) ?? v(O);
			n?.focus({ preventScroll: !0 }), n?.scrollIntoView({
				block: "nearest",
				inline: "nearest"
			});
		});
	}
	function Te(e) {
		if (e === "board" || e === "list") {
			c(S, e, !0), V++, c(_e, null);
			try {
				localStorage.setItem("vb.boardMode", e);
			} catch {}
		}
	}
	function Ee(e, t, n) {
		let r = e.key === "ArrowRight" ? zr(t.status, 1) : e.key === "ArrowLeft" ? zr(t.status, -1) : void 0;
		r && (e.preventDefault(), Se(t, r, n));
	}
	function De(e, t) {
		e.preventDefault(), c(P, null);
		let n = e.dataTransfer?.getData("application/x-vibebook-task"), r = v(y).tasks.find((e) => e.id === n);
		c(I, null), r && Se(r, t, `board:${r.id}`);
	}
	function Oe(e) {
		e.preventDefault(), v(D).trim() && (v(te) ? be({
			t: "task.add",
			epic: v(L).id,
			title: v(D).trim()
		}) && c(D, "") : c(A, n.vb.t("Escolha um épico."), !0));
	}
	var ke = Qr(), Ae = r(ke), je = l(Ae, !0), Me = w(Ae, 2), Ne = (e) => {
		{
			let t = k(() => v(y).missingScope ? n.vb.t("Épico não encontrado.") : v(te) ? v(A) : n.vb.t("Escolha um épico."));
			ve(e, {
				get title() {
					return v(t);
				},
				compact: !0
			});
		}
	};
	U(Me, (e) => {
		(v(y).missingScope || !v(te) || v(A)) && e(Ne);
	});
	var Pe = w(Me, 2), Fe = l(Pe, !0), Ie = w(Pe, 2), Le = l(Ie, !0), Re = w(Ie, 2);
	{
		let e = (e, a = xe) => {
			var s = o(), u = T(s), d = (e) => {
				var s = o(), u = T(s), d = (e) => {
					var a = Jr(), o = r(a);
					we(o, 21, () => Ir, (e) => e.value, (e, a) => {
						let o = k(() => v(y).tasks.filter((e) => e.status === v(a).value));
						var s = qr(), u = r(s), d = r(u, !0), p = w(d);
						ge(p, {
							children: (e, n) => {
								t();
								var r = B();
								h(() => i(r, v(o).length)), C(e, r);
							},
							$$slots: { default: !0 }
						}), R(u);
						var m = w(u, 2);
						we(m, 21, () => v(o), (e) => e.id, (e, t) => {
							f(e, () => v(t), () => `board:${v(t).id}`, () => !1);
						}, (e) => {
							var t = Kr(), r = l(t, !0);
							h((e) => i(r, e), [() => n.vb.t(v(a).value === "todo" ? "Nada a fazer." : "Arraste um card pra cá.")]), C(e, t);
						}), R(m), R(s), h((e, t, n) => {
							H(s, "data-lane", v(a).value), H(s, "aria-label", e), re(s, 1, t), i(d, n);
						}, [
							() => n.vb.t(v(a).label),
							() => me(he("tw:min-w-0 tw:space-y-3 tw:rounded-surface tw:border tw:border-border tw:bg-muted/40 tw:p-3", v(P) === v(a).value && "tw:ring-2 tw:ring-ring")),
							() => n.vb.t(v(a).label)
						]), g("dragover", s, (e) => {
							e.dataTransfer?.types.includes("application/x-vibebook-task") && (e.preventDefault(), c(P, v(a).value, !0));
						}), g("dragleave", s, () => {
							c(P, null);
						}), g("drop", s, (e) => De(e, v(a).value)), C(e, s);
					}), R(o), R(a), C(e, a);
				}, p = (e) => {
					var a = Xr(), o = r(a), s = (e) => {
						var a = Yr(), o = r(a), s = r(o, !0), c = w(s);
						ge(c, {
							variant: "warning",
							children: (e, n) => {
								t();
								var r = B();
								h(() => i(r, v(ce).length)), C(e, r);
							},
							$$slots: { default: !0 }
						}), R(o);
						var l = w(o, 2);
						we(l, 17, () => v(ce), (e) => e.id, (e, t) => {
							f(e, () => v(t), () => `mine:${v(t).id}`, () => !0);
						}), R(a), h((e, t) => {
							H(a, "aria-label", e), i(s, t);
						}, [() => n.vb.t("Esperando você"), () => n.vb.t("Esperando você")]), C(e, a);
					};
					U(o, (e) => {
						v(ce).length && e(s);
					});
					var c = w(o, 2);
					we(c, 17, () => v(oe), (e) => e.id, (e, n) => {
						var a = Yr(), o = r(a), s = r(o, !0), c = w(s);
						ge(c, {
							children: (e, r) => {
								t();
								var a = B();
								h(() => i(a, v(n).tasks.length)), C(e, a);
							},
							$$slots: { default: !0 }
						}), R(o);
						var l = w(o, 2);
						we(l, 17, () => v(n).tasks, (e) => e.id, (e, t) => {
							f(e, () => v(t), () => `group:${v(t).id}`, () => !0);
						}), R(a), h(() => {
							H(a, "aria-label", v(n).title), i(s, v(n).title);
						}), C(e, a);
					}, (e) => {
						{
							let t = k(() => n.vb.t("Nenhuma tarefa aberta."));
							F(e, { get title() {
								return v(t);
							} });
						}
					}), R(a), C(e, a);
				};
				U(u, (e) => {
					a() === "board" ? e(d) : e(p, -1);
				}), C(e, s);
			};
			U(u, (e) => {
				a() === v(S) && e(d);
			}), C(e, s);
		}, a = k(() => n.vb.t("Quadro de tarefas")), s = k(() => [{
			value: "board",
			label: n.vb.t("Quadro")
		}, {
			value: "list",
			label: n.vb.t("Lista")
		}]);
		se(Re, {
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
			onValueChange: Te,
			children: e,
			$$slots: { default: !0 }
		});
	}
	var ze = w(Re, 2), Be = r(ze), Ve = r(Be);
	{
		let e = k(() => `${a}-title`);
		ue(Ve, {
			get for() {
				return v(e);
			},
			children: (e, r) => {
				t();
				var a = B();
				h((e) => i(a, e), [() => n.vb.t("Nova tarefa")]), C(e, a);
			},
			$$slots: { default: !0 }
		});
	}
	var He = w(Ve, 2);
	{
		let e = k(() => `${a}-title`), t = k(() => n.vb.t("nova tarefa"));
		fe(He, {
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
	R(Be);
	var Ue = w(Be, 2), We = (e) => {
		var o = Zr(), s = r(o);
		{
			let e = k(() => `${a}-epic`);
			ue(s, {
				get for() {
					return v(e);
				},
				children: (e, r) => {
					t();
					var a = B();
					h((e) => i(a, e), [() => n.vb.t("Épico")]), C(e, a);
				},
				$$slots: { default: !0 }
			});
		}
		var l = w(s, 2);
		{
			let e = k(() => `${a}-epic`), t = k(() => !v(te));
			N(l, {
				get id() {
					return v(e);
				},
				get "aria-invalid"() {
					return v(t);
				},
				get items() {
					return v(ne);
				},
				get value() {
					return v(L).id;
				},
				onValueChange: (e) => {
					let t = v(y).targets.find((t) => t.id === e);
					if (!t) return !1;
					c(L, t, !0), c(A, "");
				}
			});
		}
		R(o), C(e, o);
	};
	U(Ue, (e) => {
		v(y).scope || e(We);
	});
	var Ge = w(Ue, 2);
	{
		let e = k(() => !v(D).trim() || !v(te));
		ee(Ge, {
			type: "submit",
			get disabled() {
				return v(e);
			},
			children: (e, t) => {
				var r = Vr(), a = T(r);
				ie(a, { name: "plus" });
				var o = w(a, 1, !0);
				h((e) => i(o, e), [() => n.vb.t("Nova tarefa")]), C(e, r);
			},
			$$slots: { default: !0 }
		});
	}
	R(ze), R(ke), h((e, t, n) => {
		H(ke, "data-board-scope", v(y).scope ?? "all"), H(ke, "aria-label", e), i(je, t), i(Fe, v(M)), H(Ie, "id", `${a}-keys`), i(Le, n);
	}, [
		() => n.vb.t("Quadro de tarefas"),
		() => v(y).title ?? (v(y).scope ? v(L).title : n.vb.t("Todos os épicos")),
		() => n.vb.t("Arraste, ou use ← →. Clique pra abrir o épico.")
	]), g("submit", ze, Oe), C(e, ke), j();
}
n(["click", "keydown"]);
// svelte/Board.svelte
var ei = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy"
]);
function ti(e, t) {
	b(t, !0);
	let n = A(t, ei);
	var r = o(), i = T(r);
	P(i, () => JSON.stringify([t.room.id, t.thread]), (e) => {
		$r(e, y(() => n));
	}), C(e, r), j();
}
// svelte/panels.ts
var ni = (e) => e.type.startsWith("image/") ? "img" : e.type.startsWith("audio/") ? "audio" : e.type === "text/html" ? "html" : e.type === "application/pdf" ? "pdf" : /\.md$/i.test(e.name) || e.type === "text/markdown" ? "md" : e.type === "text/plain" || e.type === "text/csv" ? "txt" : "other", ri = (e) => e > 1e6 ? `${(e / 1e6).toFixed(1)} MB` : `${Math.max(1, Math.round(e / 1e3))} KB`, ii = a("<button type=\"button\"> <small> </small></button>"), ai = a("<div class=\"ftabs\"></div>"), oi = a("<div class=\"fcrumb\"><button type=\"button\" class=\"ghost\"> </button><b><!> </b></div>"), si = a("<button type=\"button\" class=\"ftile fdir\"><div class=\"thumb\"></div> <b> </b><small> </small></button>"), ci = a("<img loading=\"lazy\"/>"), li = a("<a class=\"ftile\" target=\"_blank\" rel=\"noopener\"><div class=\"thumb\"><!></div> <b> </b><small> </small> <button type=\"button\" data-pin-kind=\"file\"></button></a>"), ui = a("<div class=\"empty\"> </div>"), di = a("<!> <!> <div class=\"fgrid\"><!> <!></div> <!>", 1);
function fi(e, t) {
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
			let n = ni(t);
			e[n] = (e[n] || 0) + 1;
		}
		return e;
	}), f = k(() => v(d)[v(a)] ? v(a) : "all"), p = k(() => v(u).filter((e) => v(f) === "all" || ni(e) === v(f))), g = (e) => e.name.includes("/") ? e.name.slice(0, e.name.lastIndexOf("/")) : "", _ = k(() => v(s) && v(p).some((e) => g(e) === v(s) || g(e).startsWith(v(s) + "/")) ? v(s) : ""), y = k(() => v(_) ? v(_) + "/" : "");
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
	var N = o(), P = T(N), F = (e) => {
		var s = di(), u = T(s), p = (e) => {
			var o = ai();
			we(o, 21, () => n.filter(([e]) => v(d)[e]), Ee, (e, n) => {
				var o = k(() => de(v(n), 2));
				let s = () => v(o)[0], u = () => v(o)[1];
				var p = ii();
				let m;
				var g = r(p), _ = w(g), y = l(_, !0);
				R(p), h((e) => {
					m = re(p, 1, "ftab", null, m, { on: s() === v(f) }), H(p, "data-fkind", s()), i(g, `${e ?? ""} `), i(y, v(d)[s()]);
				}, [() => t.vb.t(u())]), z("click", p, () => c(a, s(), !0)), C(e, p);
			}), R(o), C(e, o);
		};
		U(u, (e) => {
			v(d).all > 1 && e(p);
		});
		var m = w(u, 2), g = (e) => {
			var n = oi(), a = r(n), o = l(a), s = w(a), c = r(s);
			M(c, () => t.vb.icon("folder", 14));
			var u = w(c);
			R(s), R(n), h((e, t) => {
				H(a, "data-fdir", e), i(o, `← ${t ?? ""}`), i(u, ` ${v(_) ?? ""}/`);
			}, [() => v(_).includes("/") ? v(_).slice(0, v(_).lastIndexOf("/")) : "", () => t.vb.t("voltar")]), z("click", a, (e) => S(e, v(_).includes("/") ? v(_).slice(0, v(_).lastIndexOf("/")) : "")), C(e, n);
		};
		U(m, (e) => {
			v(_) && e(g);
		});
		var b = w(m, 2), x = r(b);
		we(x, 17, () => v(E).dirs, Ee, (e, n) => {
			var a = k(() => de(v(n), 2));
			let o = () => v(a)[0], s = () => v(a)[1];
			var c = si(), u = r(c);
			M(u, () => t.vb.icon("folder", 34), !0), R(u);
			var d = w(u, 2), f = l(d), p = w(d), m = l(p, !0);
			R(c), h((e) => {
				H(c, "data-fdir", v(y) + o()), i(f, `${o() ?? ""}/`), i(m, e);
			}, [() => s() === 1 ? t.vb.t("1 arquivo") : t.vb.t("{n} arquivos", { n: s() })]), z("click", c, (e) => S(e, v(y) + o())), C(e, c);
		});
		var j = w(x, 2);
		we(j, 17, () => v(E).list, (e) => e.id, (e, n) => {
			var a = li(), s = r(a), c = r(s), u = (e) => {
				var t = ci();
				h((e) => {
					H(t, "src", e), H(t, "alt", v(n).name);
				}, [() => D(v(n))]), C(e, t);
			}, d = k(() => v(n).type.startsWith("image/")), f = (e) => {
				var r = o(), i = T(r);
				M(i, () => t.vb.icon(v(n).type === "text/html" ? "globe" : v(n).type.startsWith("audio/") ? "mic" : "file", 30)), C(e, r);
			};
			U(c, (e) => {
				v(d) ? e(u) : e(f, -1);
			}), R(s);
			var p = w(s, 2), m = l(p, !0), g = w(p), _ = l(g), b = w(g, 2);
			let x;
			M(b, () => t.vb.icon("pin", 14), !0), R(b), R(a), h((e, t, r, o, s, c, l, u, d, f) => {
				H(a, "href", e), H(a, "title", v(n).name), H(a, "data-view", t), H(a, "data-name", v(n).name), i(m, r), i(_, `${o ?? ""} · ${s ?? ""} · ${c ?? ""}`), x = re(b, 1, "ghost pinBtn", null, x, { on: l }), H(b, "data-pin-ref", v(n).id), H(b, "title", u), H(b, "aria-label", d), H(b, "aria-pressed", f);
			}, [
				() => D(v(n)),
				() => v(n).type.startsWith("image/") ? "img" : "frame",
				() => v(n).name.slice(v(y).length),
				() => t.vb.name(v(n).author),
				() => t.vb.ago(v(n).ts),
				() => v(E).versions[v(n).name] > 1 ? t.vb.t("{n} versões", { n: v(E).versions[v(n).name] }) : ri(v(n).size),
				() => !!O(v(n)),
				() => t.vb.t(O(v(n)) ? "Desafixar" : "Fixar na lateral"),
				() => t.vb.t(O(v(n)) ? "Desafixar" : "Fixar na lateral"),
				() => !!O(v(n))
			]), z("click", b, (e) => A(e, v(n))), C(e, a);
		}), R(b);
		var N = w(b, 2), P = (e) => {
			var n = ui(), r = l(n, !0);
			h((e) => i(r, e), [() => t.vb.t("Nada aqui.")]), C(e, n);
		};
		U(N, (e) => {
			!v(E).list.length && !v(E).dirs.length && e(P);
		}), C(e, s);
	}, I = (e) => {
		var n = ui(), r = l(n, !0);
		h((e) => i(r, e), [() => t.vb.t("Cole uma imagem no chat (Cmd+V), arraste um arquivo ou use o clipe. Tudo que for enviado neste vibebook fica aqui.")]), C(e, n);
	};
	U(P, (e) => {
		v(u).length ? e(F) : e(I, -1);
	}), C(e, N), j();
}
n(["click"]);
var pi = /* @__PURE__ */ or([/* @__PURE__ */ q({
	ok: /* @__PURE__ */ J(!0),
	id: /* @__PURE__ */ Zn(),
	thread: /* @__PURE__ */ G()
}), /* @__PURE__ */ q({
	ok: /* @__PURE__ */ J(!1),
	error: /* @__PURE__ */ G()
})]), mi = /* @__PURE__ */ q({
	ok: /* @__PURE__ */ $n(),
	name: /* @__PURE__ */ Y(/* @__PURE__ */ G()),
	error: /* @__PURE__ */ Y(/* @__PURE__ */ G()),
	every: /* @__PURE__ */ Y(/* @__PURE__ */ gr(/* @__PURE__ */ G())),
	cron: /* @__PURE__ */ Y(/* @__PURE__ */ gr(/* @__PURE__ */ G())),
	timezone: /* @__PURE__ */ Y(/* @__PURE__ */ G()),
	next_at: /* @__PURE__ */ Y(/* @__PURE__ */ G())
}), hi = /* @__PURE__ */ q({
	id: /* @__PURE__ */ G(),
	name: /* @__PURE__ */ G(),
	type: /* @__PURE__ */ G(),
	size: /* @__PURE__ */ Zn(),
	author: /* @__PURE__ */ G(),
	ts: /* @__PURE__ */ Zn(),
	embed: /* @__PURE__ */ Y(/* @__PURE__ */ $n())
}), gi = /* @__PURE__ */ ir(hi, { reminder: /* @__PURE__ */ Y(mi) }), _i = /* @__PURE__ */ q({ error: /* @__PURE__ */ G() });
(/* @__PURE__ */ G()).check(/* @__PURE__ */ qn("https://"), /* @__PURE__ */ Gn(1e3)), (/* @__PURE__ */ G()).check(/* @__PURE__ */ Kn(1)), (/* @__PURE__ */ G()).check(/* @__PURE__ */ Kn(1)), (/* @__PURE__ */ G()).check(/* @__PURE__ */ Kn(1)), (/* @__PURE__ */ G()).check(/* @__PURE__ */ qn("m"));
var vi = /* @__PURE__ */ q({
	ok: /* @__PURE__ */ J(!0),
	icon: /* @__PURE__ */ gr(/* @__PURE__ */ Zn())
}), yi = /* @__PURE__ */ G(), bi = /* @__PURE__ */ Zn(), xi = /* @__PURE__ */ cr("t", [
	/* @__PURE__ */ q({
		t: /* @__PURE__ */ J("msg"),
		thread: /* @__PURE__ */ G(),
		text: /* @__PURE__ */ Y(/* @__PURE__ */ G()),
		files: /* @__PURE__ */ Y(/* @__PURE__ */ K(/* @__PURE__ */ G())),
		reply_to: /* @__PURE__ */ Y(/* @__PURE__ */ gr(bi))
	}),
	/* @__PURE__ */ q({ t: /* @__PURE__ */ J("files.get") }),
	/* @__PURE__ */ q({
		t: /* @__PURE__ */ J("doc.get"),
		epic: /* @__PURE__ */ Y(/* @__PURE__ */ gr(/* @__PURE__ */ G()))
	}),
	/* @__PURE__ */ q({
		t: /* @__PURE__ */ J("doc"),
		text: /* @__PURE__ */ G(),
		epic: /* @__PURE__ */ Y(/* @__PURE__ */ gr(/* @__PURE__ */ G()))
	}),
	/* @__PURE__ */ q({
		t: /* @__PURE__ */ J("title"),
		title: /* @__PURE__ */ G()
	}),
	/* @__PURE__ */ q({
		t: /* @__PURE__ */ J("epic"),
		title: /* @__PURE__ */ G()
	}),
	/* @__PURE__ */ q({
		t: /* @__PURE__ */ J("epic.owner"),
		id: yi,
		owner: /* @__PURE__ */ G()
	}),
	/* @__PURE__ */ q({
		t: /* @__PURE__ */ J("task.add"),
		epic: /* @__PURE__ */ G(),
		title: /* @__PURE__ */ G()
	}),
	/* @__PURE__ */ q({
		t: /* @__PURE__ */ J("older"),
		thread: /* @__PURE__ */ G(),
		before: /* @__PURE__ */ Y(bi)
	}),
	/* @__PURE__ */ q({
		t: /* @__PURE__ */ J("pin.add"),
		kind: /* @__PURE__ */ fr([
			"link",
			"file",
			"app"
		]),
		ref: /* @__PURE__ */ G(),
		title: /* @__PURE__ */ Y(/* @__PURE__ */ G())
	}),
	/* @__PURE__ */ q({
		t: /* @__PURE__ */ J("pin.del"),
		id: yi
	}),
	/* @__PURE__ */ q({
		t: /* @__PURE__ */ J("reminder.delete"),
		id: yi
	}),
	/* @__PURE__ */ q({
		t: /* @__PURE__ */ J("ack.dismiss"),
		id: bi
	}),
	/* @__PURE__ */ q({
		t: /* @__PURE__ */ J("reminder.enable"),
		id: yi,
		on: /* @__PURE__ */ $n()
	}),
	/* @__PURE__ */ q({
		t: /* @__PURE__ */ J("task.toggle"),
		id: yi
	}),
	/* @__PURE__ */ q({
		t: /* @__PURE__ */ J("task.status"),
		id: yi,
		status: /* @__PURE__ */ fr(br)
	}),
	/* @__PURE__ */ q({
		t: /* @__PURE__ */ J("task.rename"),
		id: yi,
		title: /* @__PURE__ */ G()
	}),
	/* @__PURE__ */ q({
		t: /* @__PURE__ */ J("task.del"),
		id: yi
	}),
	/* @__PURE__ */ q({
		t: /* @__PURE__ */ J("task.assign"),
		id: yi,
		owner: /* @__PURE__ */ Y(/* @__PURE__ */ G()),
		due: /* @__PURE__ */ Y(/* @__PURE__ */ G())
	}),
	/* @__PURE__ */ q({
		t: /* @__PURE__ */ J("decision.del"),
		id: bi
	}),
	/* @__PURE__ */ q({
		t: /* @__PURE__ */ J("epic.rename"),
		id: yi,
		title: /* @__PURE__ */ G()
	}),
	/* @__PURE__ */ q({
		t: /* @__PURE__ */ J("epic.del"),
		id: yi
	}),
	/* @__PURE__ */ q({
		t: /* @__PURE__ */ J("epic.archive"),
		id: yi,
		archived: /* @__PURE__ */ Y(/* @__PURE__ */ $n())
	}),
	/* @__PURE__ */ q({
		t: /* @__PURE__ */ J("epic.order"),
		ids: /* @__PURE__ */ K(/* @__PURE__ */ G())
	}),
	/* @__PURE__ */ q({
		t: /* @__PURE__ */ J("poll.create"),
		thread: /* @__PURE__ */ G(),
		question: /* @__PURE__ */ G(),
		options: /* @__PURE__ */ K(/* @__PURE__ */ G()),
		multi: /* @__PURE__ */ $n()
	}),
	/* @__PURE__ */ q({
		t: /* @__PURE__ */ J("vote"),
		id: yi,
		opt: bi
	}),
	/* @__PURE__ */ q({
		t: /* @__PURE__ */ J("poll.close"),
		id: yi
	}),
	/* @__PURE__ */ q({
		t: /* @__PURE__ */ J("suggestion"),
		i: bi,
		accept: /* @__PURE__ */ Y(/* @__PURE__ */ $n())
	})
]), Si = (/* @__PURE__ */ G()).check(/* @__PURE__ */ Kn(1), /* @__PURE__ */ Gn(64)), Ci = /* @__PURE__ */ or([/* @__PURE__ */ q({
	t: /* @__PURE__ */ J("result"),
	cid: Si,
	ok: /* @__PURE__ */ J(!0)
}), /* @__PURE__ */ q({
	t: /* @__PURE__ */ J("result"),
	cid: Si,
	ok: /* @__PURE__ */ J(!1),
	error: /* @__PURE__ */ G()
})]), wi = /* @__PURE__ */ G(), Ti = /* @__PURE__ */ Zn(), Ei = /* @__PURE__ */ K(wi), $ = (e, t) => /* @__PURE__ */ q({
	t: /* @__PURE__ */ J(e),
	...t
}), Di = $("doc", {
	text: wi,
	epic: /* @__PURE__ */ Y(/* @__PURE__ */ gr(wi)),
	stale: /* @__PURE__ */ Y(/* @__PURE__ */ J(!1)),
	fetched: /* @__PURE__ */ Y(/* @__PURE__ */ $n()),
	by: /* @__PURE__ */ Y(wi)
}), Oi = $("doc", {
	epic: wi,
	stale: /* @__PURE__ */ J(!0),
	by: /* @__PURE__ */ Y(wi),
	text: /* @__PURE__ */ Y(/* @__PURE__ */ tr()),
	fetched: /* @__PURE__ */ Y(/* @__PURE__ */ tr())
}), ki = {
	state: /* @__PURE__ */ ir(Pr, { t: /* @__PURE__ */ J("state") }),
	msg: $("msg", { m: kr }),
	moved: $("moved", {
		id: Ti,
		thread: wi
	}),
	delta: $("delta", {
		id: Ti,
		text: wi
	}),
	typing: $("typing", {
		id: Ti,
		mode: wi,
		note: /* @__PURE__ */ Y(wi)
	}),
	closed: $("closed", {
		id: Ti,
		choices: wi
	}),
	epics: $("epics", {
		epics: /* @__PURE__ */ K(Dr),
		roomTasks: /* @__PURE__ */ Y(/* @__PURE__ */ K(Er))
	}),
	epicsPatch: $("epicsPatch", {
		changed: /* @__PURE__ */ K(Dr),
		order: Ei,
		roomTasks: /* @__PURE__ */ Y(/* @__PURE__ */ K(Er))
	}),
	doc: /* @__PURE__ */ or([Oi, Di]),
	docNotes: $("docNotes", { notes: Ei }),
	meta: $("meta", {
		title: /* @__PURE__ */ Y(wi),
		folder: /* @__PURE__ */ Y(wi),
		summary: /* @__PURE__ */ Y(wi)
	}),
	suggestions: $("suggestions", { suggestions: /* @__PURE__ */ K(Sr) }),
	requests: $("requests", { requests: /* @__PURE__ */ K(Mr) }),
	members: $("members", {
		members: Ei,
		pending: /* @__PURE__ */ Y(Ei),
		requests: /* @__PURE__ */ Y(/* @__PURE__ */ K(Mr)),
		names: /* @__PURE__ */ Y(/* @__PURE__ */ ur(wi, wi)),
		avatars: /* @__PURE__ */ Y(/* @__PURE__ */ ur(wi, Ti))
	}),
	files: $("files", { files: /* @__PURE__ */ K(Or) }),
	fileAdd: $("fileAdd", { file: Or }),
	reminders: $("reminders", { reminders: /* @__PURE__ */ K(jr) }),
	decisions: $("decisions", { decisions: /* @__PURE__ */ K(Cr) }),
	pins: $("pins", { pins: /* @__PURE__ */ K(wr) }),
	receipts: $("receipts", { receipts: /* @__PURE__ */ K(Nr) }),
	older: $("older", {
		messages: /* @__PURE__ */ K(kr),
		thread: wi,
		more: /* @__PURE__ */ $n()
	}),
	acks: $("acks", { acks: /* @__PURE__ */ K(Ar) }),
	ackRows: $("ackRows", { acks: /* @__PURE__ */ K(Ar) }),
	poll: $("poll", { poll: Tr }),
	online: $("online", { online: Ei }),
	conns: $("conns", {}),
	error: $("error", { error: /* @__PURE__ */ Y(wi) }),
	blocked: $("blocked", {
		text: wi,
		reason: wi
	}),
	result: Ci
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
	return xi.safeParse(e).success;
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
	let n = _i.safeParse(t);
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
				let e = pi.safeParse(i);
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
			let a = gi.safeParse(i);
			if (!a.success) throw TypeError(hi.safeParse(i).success ? "Invalid reminder response" : "Invalid upload response");
			return a.data;
		},
		async setIcon(e) {
			let t = await n.icon.$post({
				param: { id: r },
				header: { "content-type": e ? e.type : "application/json" }
			}, { init: { body: e ? e.body : "{}" } }), i = await $i(t);
			if (!t.ok) throw ea(t, i);
			let a = vi.safeParse(i);
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
	M(D, () => t.vb.t("Cada lembrete é um arquivo <code>reminders/&lt;nome&gt;.md</code>: o texto diz quando rodar e o que fazer. Na hora, o @vibe posta o texto aqui e o agent de quem salvou faz."), !0), R(D);
	var A = w(D, 2), N = (e) => {
		var n = na(), a = r(n);
		M(a, () => t.vb.icon("plus", 14));
		var o = w(a);
		R(n), h((e) => i(o, ` ${e ?? ""}`), [() => t.vb.t("Novo lembrete")]), z("click", n, () => p({
			name: "",
			text: ""
		})), C(e, n);
	};
	U(A, (e) => {
		v(n) || e(N);
	}), R(S);
	var P = w(S, 2), F = (e) => {
		var s = ra(), u = r(s);
		ce(u);
		var d = w(u, 2);
		O(d);
		var f = w(d, 2), p = r(f), m = l(p, !0), _ = w(p), b = l(_, !0), x = w(_), S = l(x, !0);
		R(f), R(s), h((e, t, r, s) => {
			H(u, "placeholder", e), u.readOnly = v(n).fixed, H(d, "placeholder", t), i(m, v(a)), i(b, r), x.disabled = v(o), i(S, s);
		}, [
			() => t.vb.t("nome, ex.: relatorio-diario"),
			() => t.vb.t("Diga quando e o quê. Ex.: Todo dia às 8h: puxe os números de ontem e poste aqui o que mudou."),
			() => t.vb.t("Cancelar"),
			() => t.vb.t("Salvar")
		]), g("submit", s, y), ye(u, () => v(n).name, (e) => v(n).name = e), ye(d, () => v(n).text, (e) => v(n).text = e), z("click", _, () => c(n, null)), C(e, s);
	};
	U(P, (e) => {
		v(n) && e(F);
	});
	var I = w(P, 2);
	we(I, 17, () => v(u), (e) => e.id, (e, n) => {
		var a = sa();
		let o;
		var c = r(a), u = r(c), d = r(u);
		M(d, () => t.vb.icon(v(s).includes(v(n).id) ? "chevronDown" : "chevronRight", 13));
		var m = w(d);
		R(u);
		var g = w(u, 2), y = r(g), b = (e) => {
			var r = B();
			h((e) => i(r, `${(v(n).every || v(n).cron || "") ?? ""}${e ?? ""} ·`), [() => v(n).enabled && v(n).next_at ? ` · ${t.vb.t("próximo {when}", { when: f(v(n).next_at) })}` : ""]), C(e, r);
		};
		U(y, (e) => {
			v(n).error || e(b);
		});
		var x = w(y, 1, !0);
		R(g);
		var S = w(g, 2), T = (e) => {
			var t = ia(), r = l(t);
			h(() => i(r, `⚠ ${v(n).error ?? ""}`)), C(e, t);
		};
		U(S, (e) => {
			v(n).error && e(T);
		});
		var E = w(S), D = (e) => {
			var t = aa(), r = l(t, !0);
			h(() => i(r, v(n).text)), C(e, t);
		}, O = k(() => v(s).includes(v(n).id));
		U(E, (e) => {
			v(O) && e(D);
		}), R(c);
		var A = w(c, 2), j = (e) => {
			var r = oa();
			M(r, () => t.vb.icon("pencil", 14), !0), R(r), h((e, t) => {
				H(r, "data-rem-edit", v(n).id), H(r, "title", e), H(r, "aria-label", t);
			}, [() => t.vb.t("Editar"), () => t.vb.t("Editar")]), z("click", r, () => p({
				name: v(n).name,
				text: v(n).text,
				fixed: !0
			})), C(e, r);
		};
		U(A, (e) => {
			v(n).name && e(j);
		});
		var N = w(A, 2), P = r(N);
		ce(P);
		var F = w(P, 1, !0);
		R(N);
		var I = w(N, 2);
		M(I, () => t.vb.icon("x"), !0), R(I), R(a), h((e, t, r, s, l, u, d) => {
			o = re(a, 1, "rem", null, o, {
				bad: !!v(n).error,
				off: !v(n).enabled,
				open: e
			}), H(c, "data-rem-open", v(n).id), H(c, "title", t), i(m, ` ${(v(n).name ? `${v(n).name}.md` : v(n).text) ?? ""}`), i(x, r), H(N, "title", s), H(P, "data-rem-on", v(n).id), L(P, v(n).enabled), P.disabled = !!v(n).error, i(F, l), H(I, "data-rem-del", v(n).id), H(I, "title", u), H(I, "aria-label", d);
		}, [
			() => v(s).includes(v(n).id),
			() => t.vb.t(v(s).includes(v(n).id) ? "Esconder o texto" : "Ver o texto"),
			() => t.vb.t("de {who}", { who: t.vb.name(v(n).owner) }),
			() => t.vb.t("Ligado"),
			() => t.vb.t("ligado"),
			() => t.vb.t("Apagar lembrete"),
			() => t.vb.t("Apagar lembrete")
		]), z("click", c, (e) => {
			e.target.closest(".remText") || _(v(n));
		}), z("keydown", c, (e) => {
			e.key === "Enter" && _(v(n));
		}), z("change", P, (e) => t.send({
			t: "reminder.enable",
			id: v(n).id,
			on: e.currentTarget.checked
		})), z("click", I, () => {
			confirm(t.vb.t("Apagar este lembrete?")) && t.send({
				t: "reminder.delete",
				id: v(n).id
			});
		}), C(e, a);
	});
	var ee = w(I, 2), te = (e) => {
		var n = ca(), r = l(n, !0);
		h((e) => i(r, e), [() => t.vb.t("Nenhum lembrete ainda. Clique em Novo lembrete, ou peça pro seu agent: “todo dia às 8h, me manda o resumo do que mudou”.")]), C(e, n);
	};
	U(ee, (e) => {
		!v(u).length && !v(n) && e(te);
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
		state: _e({
			draft: "",
			closed: _a(e, n),
			openedFor: null,
			archived: t
		})
	};
}
function ba(e, t, n) {
	let r = V(e.state);
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
	let y = () => te(v(D), "$navigation", S), [S, E] = e(), D = k(() => a.session.state), O = m(""), A = m(null), M = m(null), P = m(!1), F = m(null), I = !1, L = /* @__PURE__ */ new Map(), ne = 0, ie = m(null), ae = m("");
	d(() => {
		I = !0, ne++, L.clear();
	});
	let oe = [
		"tw:pl-0",
		"tw:pl-2",
		"tw:pl-4",
		"tw:pl-6",
		"tw:pl-8",
		"tw:pl-10",
		"tw:pl-12"
	], z = k(() => a.room.epics.filter((e) => !e.archived)), ce = k(() => ma(a.room.epics, a.room.messages)), de = k(() => y().archived && v(ce).length > 0 ? "archived" : "active"), V = k(() => da(v(de) === "archived" ? v(ce) : v(z))), pe = k(() => da(a.room.epics)), _e = k(() => new Set(a.room.epics.filter((e) => a.vb.epicBusy(e)).map((e) => e.id))), ve = k(() => pa(v(V), y().closed, v(_e), !0)), ye = k(() => new Map(v(ve).map((e, t) => [e.epic.id, `${f}-row-${t}`])));
	x(() => {
		ba(a.session, v(pe), a.thread);
	});
	function be(e) {
		if (I) return;
		ne++, c(ie, null);
		let t = e === "archived";
		v(D).update((e) => ({
			...e,
			archived: t
		})), a.onarchchange(t), c(A, null), c(M, null), c(O, "");
	}
	function Te(e) {
		if (I || a.session.roomId !== a.room.id) return !1;
		c(O, "");
		try {
			if (a.send(e)) return !0;
		} catch {}
		return c(O, a.vb.t("Não deu pra enviar agora. Tente de novo."), !0), !1;
	}
	function De(e) {
		if (e.preventDefault(), I) return;
		let t = y().draft.trim();
		if (!t) return v(F)?.focus();
		Te({
			t: "epic",
			title: t
		}) && Se(v(D), u(y).draft = "", u(y));
	}
	function Oe(e) {
		let t = v(V).parents.get(e);
		return t ? v(V).children.get(t) ?? [] : v(V).roots;
	}
	function ke(e, t) {
		let n = Oe(e);
		return n[n.findIndex((t) => t.id === e) + t];
	}
	function Ae(e, t, n) {
		let r = ha(a.room.epics, e, t, n);
		if (!r || I) return;
		c(ie, null);
		let i = ++ne, o = document.activeElement, s = o instanceof HTMLElement && L.get(e)?.contains(o) ? o : null;
		Te({
			t: "epic.order",
			ids: r
		}) && c(ie, {
			ids: r,
			from: e,
			anchor: s,
			generation: i,
			thread: a.thread
		}, !0);
	}
	function je(e, t) {
		return L.set(t, e), { destroy() {
			L.get(t) === e && L.delete(t);
		} };
	}
	x(() => {
		let e = v(ie);
		if (!e) return;
		if (e.thread !== a.thread || v(de) !== "active") {
			c(ie, null), ne++;
			return;
		}
		let t = a.room.epics.map((e) => e.id);
		if (!t.includes(e.from)) {
			c(ie, null), Me(e);
			return;
		}
		let n = new Set(t), r = new Set(e.ids), i = e.ids.filter((e) => n.has(e)), o = t.filter((e) => r.has(e));
		o.length !== i.length || o.some((e, t) => e !== i[t]) || (c(ie, null), c(ae, a.vb.t("Ordem dos épicos atualizada."), !0), Me(e));
	});
	function Me(e) {
		let t = e.anchor;
		if (!t) return;
		let n = () => document.activeElement === document.body || document.activeElement === t;
		n() && s().then(() => {
			if (I || e.generation !== ne || !n() || document.activeElement === t && !t.matches(":disabled")) return;
			let r = L.get(e.from);
			r?.hidden || (r?.querySelector("[data-epic-thread]") ?? v(F))?.focus({ preventScroll: !0 });
		});
	}
	function Ne(e, t) {
		let n = ke(e, t);
		v(de) === "active" && n && Ae(e, n.id, t === 1);
	}
	function Pe(e, t) {
		if (v(de) !== "active" || !e.dataTransfer) return e.preventDefault();
		e.dataTransfer.setData("text/vb-epic", t), e.dataTransfer.effectAllowed = "move", c(A, t, !0);
	}
	function Fe(e, t) {
		return v(de) === "active" && v(A) !== t && e.dataTransfer?.types.includes("text/vb-epic");
	}
	function Ie(e, t) {
		if (!Fe(e, t)) return;
		e.preventDefault();
		let n = e.currentTarget instanceof HTMLElement ? e.currentTarget.getBoundingClientRect() : null;
		c(M, t, !0), c(P, !!n && e.clientY >= n.top + n.height / 2, !0);
	}
	function Le(e, t) {
		let n = v(P);
		if (c(M, null), !Fe(e, t)) return;
		e.preventDefault();
		let r = e.dataTransfer?.getData("text/vb-epic");
		r && Ae(r, t, n), c(A, null);
	}
	var Re = Fa(), ze = r(Re);
	{
		let e = (e, n = xe) => {
			var s = o(), d = T(s), m = (e) => {
				var o = Na(), s = T(o);
				we(s, 21, () => v(ve), (e) => e.epic.id, (e, o) => {
					let s = k(() => v(o).epic), u = k(() => y().closed.has(v(s).id)), d = k(() => v(V).byId.get(v(V).parents.get(v(s).id) ?? "")), f = k(() => a.vb.epicBusy(v(s)));
					var m = Aa(), _ = r(m), b = r(_), x = (e) => {
						{
							let t = k(() => v(u) ? "chevronRight" : "chevronDown"), n = k(() => `${a.vb.t(v(u) ? "Abrir galho" : "Fechar galho")}: ${v(s).title}`), r = k(() => !v(u)), i = k(() => (v(V).children.get(v(s).id) ?? []).map((e) => v(ye).get(e.id)).join(" "));
							Ce(e, {
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
					U(b, (e) => {
						v(o).hasChildren ? e(x) : e(S, -1);
					});
					var E = w(b, 2);
					{
						let e = k(() => a.thread === v(s).id ? "page" : void 0);
						ee(E, {
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
								U(y, (e) => {
									v(d) && e(b);
								}), R(g);
								var x = w(g, 2), S = (e) => {
									var t = Ta();
									h((e) => H(t, "aria-label", e), [() => v(f) ? a.vb.t("{who} está trabalhando", { who: v(f) }) : a.vb.t("Trabalho em um subépico")]), C(e, t);
								};
								U(x, (e) => {
									(v(f) || v(u) && v(o).busyBelow) && e(S);
								});
								var E = w(x, 2), D = (e) => {
									ge(e, {
										variant: "warning",
										children: (e, n) => {
											t();
											var r = B();
											h((e) => i(r, e), [() => a.vb.waitCount(v(s).id)]), C(e, r);
										},
										$$slots: { default: !0 }
									});
								}, O = k(() => a.vb.waitCount(v(s).id));
								U(E, (e) => {
									v(O) && e(D);
								});
								var A = w(E, 2), j = (e) => {
									var t = Ea(), n = l(t, !0);
									h((e) => {
										H(t, "title", e), i(n, v(s).prod.stage === "verified" ? "✓✓" : "🚀");
									}, [() => a.vb.t(v(s).prod.stage === "verified" ? "Verificado em prod" : "No ar, falta verificar em prod")]), C(e, t);
								};
								U(A, (e) => {
									v(s).prod && e(j);
								});
								var M = w(A, 2), N = (e) => {
									var t = Da(), n = l(t);
									h((e) => i(n, `${e ?? ""}/${v(s).tasks.length ?? ""}`), [() => v(s).tasks.filter((e) => e.done).length]), C(e, t);
								};
								U(M, (e) => {
									v(s).tasks.length && e(N);
								}), h(() => i(_, v(s).title)), C(e, c);
							},
							$$slots: { default: !0 }
						});
					}
					R(_);
					var D = w(_, 2), O = r(D), j = l(O), F = w(O, 2), I = r(F);
					{
						let e = k(() => `${v(ye).get(v(s).id)}-owner`);
						ue(I, {
							get for() {
								return v(e);
							},
							children: (e, n) => {
								t();
								var r = B();
								h((e) => i(r, e), [() => a.vb.t("Dono do épico")]), C(e, r);
							},
							$$slots: { default: !0 }
						});
					}
					var L = w(I, 2);
					{
						let e = k(() => `${v(ye).get(v(s).id)}-owner`), t = k(() => `${a.vb.t("Dono do épico")}: ${v(s).title}`), n = k(() => v(s).owner ?? ""), r = k(() => [{
							value: "",
							label: a.vb.t("Sem dono")
						}, ...a.room.members.map((e) => ({
							value: e,
							label: a.vb.name(e)
						}))]);
						N(L, {
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
							onValueChange: (e) => (Te({
								t: "epic.owner",
								id: v(s).id,
								owner: e
							}), !1)
						});
					}
					var te = w(L, 2), ne = (e) => {
						var n = ka(), o = r(n);
						{
							let e = k(() => !ke(v(s).id, -1)), n = k(() => `${a.vb.t("Mover para cima")}: ${v(s).title}`);
							ee(o, {
								variant: "outline",
								size: "sm",
								get disabled() {
									return v(e);
								},
								get "aria-label"() {
									return v(n);
								},
								onclick: () => Ne(v(s).id, -1),
								children: (e, n) => {
									t();
									var r = B();
									h((e) => i(r, e), [() => a.vb.t("Mover para cima")]), C(e, r);
								},
								$$slots: { default: !0 }
							});
						}
						var c = w(o);
						{
							let e = k(() => !ke(v(s).id, 1)), n = k(() => `${a.vb.t("Mover para baixo")}: ${v(s).title}`);
							ee(c, {
								variant: "outline",
								size: "sm",
								get disabled() {
									return v(e);
								},
								get "aria-label"() {
									return v(n);
								},
								onclick: () => Ne(v(s).id, 1),
								children: (e, n) => {
									t();
									var r = B();
									h((e) => i(r, e), [() => a.vb.t("Mover para baixo")]), C(e, r);
								},
								$$slots: { default: !0 }
							});
						}
						R(n), C(e, n);
					};
					U(te, (e) => {
						n() === "active" && e(ne);
					}), R(F), R(D), R(m), le(m, (e, t) => je?.(e, t), () => v(s).id), h((e, t, r, a) => {
						H(m, "id", e), H(m, "hidden", v(o).hidden), H(m, "data-epic", v(s).id), H(m, "data-depth", v(o).depth), re(m, 1, t), H(_, "aria-label", v(s).title), H(_, "draggable", n() === "active"), re(_, 1, r), i(j, `${a ?? ""}: ${v(s).title ?? ""}`);
					}, [
						() => v(ye).get(v(s).id),
						() => me(oe[Math.min(v(o).depth, oe.length - 1)]),
						() => me(he("tw:flex tw:items-center tw:gap-1 tw:rounded-control tw:border tw:border-transparent", a.thread === v(s).id && "tw:bg-sidebar-accent tw:text-sidebar-accent-foreground", v(M) === v(s).id && (v(P) ? "tw:border-b-primary" : "tw:border-t-primary"), v(A) === v(s).id && "tw:opacity-50")),
						() => a.vb.t("Ações do épico")
					]), g("dragstart", _, (e) => Pe(e, v(s).id)), g("dragend", _, () => {
						c(A, null), c(M, null);
					}), g("dragover", _, (e) => Ie(e, v(s).id)), g("dragleave", _, () => {
						v(M) === v(s).id && c(M, null);
					}), g("drop", _, (e) => Le(e, v(s).id)), C(e, m);
				}), R(s);
				var d = w(s, 2), m = (e) => {
					var n = Ma(), o = T(n), s = r(o);
					{
						let e = k(() => `${f}-new`);
						ue(s, {
							get for() {
								return v(e);
							},
							children: (e, n) => {
								t();
								var r = B();
								h((e) => i(r, e), [() => a.vb.t("Novo épico")]), C(e, r);
							},
							$$slots: { default: !0 }
						});
					}
					var d = w(s, 2), p = r(d), m = () => I ? "" : y().draft, _ = (e) => {
						I || Se(v(D), u(y).draft = e, u(y));
					};
					{
						let e = k(() => `${f}-new`), t = k(() => a.vb.t("Novo épico: escreva o título…"));
						fe(p, {
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
								return v(F);
							},
							set ref(e) {
								c(F, e, !0);
							}
						});
					}
					var b = w(p);
					{
						let e = k(() => a.vb.t("Criar épico"));
						Ce(b, {
							type: "submit",
							icon: "plus",
							variant: "primary",
							get label() {
								return v(e);
							}
						});
					}
					R(d), R(o);
					var x = w(o, 2);
					we(x, 17, () => a.room.suggestions, Ee, (e, n, r) => {
						{
							let o = k(() => a.thread === `pre:${r}` ? "page" : void 0);
							ee(e, {
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
					}), g("submit", o, De), C(e, n);
				};
				U(d, (e) => {
					n() === "active" && e(m);
				}), h((e) => H(s, "aria-label", e), [() => n() === "archived" ? a.vb.t("Arquivados") : a.vb.t("Épicos")]), C(e, o);
			};
			U(d, (e) => {
				n() === v(de) && e(m);
			}), C(e, s);
		}, n = k(() => [{
			value: "active",
			label: `${a.vb.t("Épicos")} · ${v(z).length}`
		}, {
			value: "archived",
			label: `${a.vb.t("Arquivados")} · ${v(ce).length}`,
			disabled: v(ce).length === 0
		}]), s = k(() => a.vb.t("Épicos"));
		se(ze, {
			get items() {
				return v(n);
			},
			get label() {
				return v(s);
			},
			get value() {
				return v(de);
			},
			onValueChange: be,
			children: e,
			$$slots: { default: !0 }
		});
	}
	var Be = w(ze, 2), Ve = l(Be, !0), He = w(Be, 2), Ue = (e) => {
		var t = Pa(), n = l(t, !0);
		h(() => i(n, v(O))), C(e, t);
	};
	U(He, (e) => {
		v(O) && e(Ue);
	}), R(Re), h((e) => {
		H(Re, "aria-label", e), i(Ve, v(ae));
	}, [() => a.vb.t("Épicos")]), C(n, Re), j(), E();
}
// svelte/features/pins/model.ts
function La(e) {
	let t = e.trim();
	if (!t || t.length > 2e3 || /[\u0000-\u001f\u007f]/.test(t)) return null;
	try {
		let e = new URL(/^[a-z]+:\/\//i.test(t) ? t : `https://${t}`);
		return e.protocol === "http:" || e.protocol === "https:" ? e.href : null;
	} catch {
		return null;
	}
}
function Ra(e) {
	let t = /^(?:((?:[a-f0-9]{12}|room))\/)?([\w.-]{1,100})$/.exec(e);
	return t ? {
		connectionId: t[1] ?? "room",
		tool: t[2]
	} : null;
}
function za(e, t) {
	if (e.kind === "link") {
		let t = La(e.ref);
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
		let n = Ra(e.ref), r = n?.connectionId === "room" && t.filesAll && !t.files?.some((e) => e.name === `apps/${n.tool}.html`);
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
var Ba = () => ({
	url: "",
	title: ""
});
function Va(e) {
	return {
		roomId: e,
		active: !0,
		pins: [],
		filesRequested: !1,
		sequence: 0,
		state: _e({
			adding: !1,
			draft: Ba(),
			pending: null,
			issue: null,
			filesPending: !1,
			fileIssue: null
		})
	};
}
function Ha(e) {
	e && (e.active = !1, e.sequence++);
}
function Ua(e) {
	e.active && e.state.update((e) => ({
		...e,
		adding: !0,
		issue: null
	}));
}
function Wa(e, t) {
	e.active && e.state.update((e) => ({
		...e,
		draft: {
			...e.draft,
			...t
		},
		issue: null
	}));
}
function Ga(e) {
	e.active && e.state.update((e) => ({
		...e,
		adding: !1,
		issue: null
	}));
}
function Ka(e, t) {
	return e.url === t.url && e.title === t.title;
}
function qa(e, t, n) {
	return n.some((n) => n.kind === "link" && n.ref === e && (!t || n.title === t));
}
function Ja(e, t) {
	let n = e;
	n?.active && n.roomId === t.id || (Ha(n), n = Va(t.id)), n.pins = t.pins ?? [];
	let r = V(n.state), i = t.pins?.some((e) => e.kind === "file" && !t.files?.some((t) => t.id === e.ref));
	return (t.filesAll || !i) && (r.filesPending || r.fileIssue) && (r = {
		...r,
		filesPending: !1,
		fileIssue: null
	}, n.state.set(r)), n;
}
async function Ya(e, t, n, r, i) {
	if (!e.active || e.roomId !== t || V(e.state).pending) return;
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
	let o = () => e.active && e.sequence === a && V(e.state).pending?.sequence === a, s;
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
	let c = V(e.state);
	if (s.ok) {
		let t = r.t === "pin.add" && i && Ka(c.draft, i);
		e.state.set({
			...c,
			pending: null,
			issue: null,
			...t ? {
				adding: !1,
				draft: Ba()
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
async function Xa(e, t, n) {
	if (!e.active || e.roomId !== t || V(e.state).pending) return;
	let r = V(e.state);
	if (!r.adding) return;
	let i = La(r.draft.url);
	if (!i) {
		e.state.update((e) => ({
			...e,
			issue: { kind: "invalid-link" }
		}));
		return;
	}
	let a = r.draft.title.trim().slice(0, 80);
	if (qa(i, a, e.pins)) e.state.set({
		...r,
		adding: !1,
		draft: Ba(),
		issue: { kind: "already-pinned" }
	});
	else return Ya(e, t, n, {
		t: "pin.add",
		kind: "link",
		ref: i,
		title: a
	}, { ...r.draft });
}
async function Za(e, t, n, r) {
	if (e.pins.some((e) => e.id === n)) return Ya(e, t, r, {
		t: "pin.del",
		id: n
	});
}
function Qa(e, t, n, r = !1) {
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
var $a = a("<form class=\"tw:space-y-3 tw:rounded-surface tw:border tw:border-border tw:bg-card tw:p-3\"><div class=\"tw:space-y-1\"><!> <!></div> <div class=\"tw:space-y-1\"><!> <!></div> <div class=\"tw:flex tw:flex-wrap tw:justify-end tw:gap-2\"><!> <!></div></form>"), eo = a("<p role=\"status\" class=\"tw:m-0 tw:font-sans tw:text-xs tw:leading-5 tw:text-muted-foreground\"> </p>"), to = a("<a target=\"_blank\" rel=\"noopener noreferrer\" class=\"tw:flex tw:min-w-0 tw:flex-1 tw:items-center tw:gap-2 tw:rounded-control tw:px-2 tw:py-2 tw:font-sans tw:text-sm tw:text-foreground tw:no-underline tw:hover:bg-accent tw:focus-visible:outline-none tw:focus-visible:ring-2 tw:focus-visible:ring-ring\"><!><span class=\"tw:min-w-0\"><span class=\"tw:block tw:truncate\"> </span><span class=\"tw:block tw:truncate tw:text-xs tw:text-muted-foreground\"> </span></span></a>"), no = a("<!><span class=\"tw:min-w-0\"><span class=\"tw:block tw:truncate\"> </span><span class=\"tw:block tw:truncate tw:text-xs tw:font-normal tw:text-muted-foreground\"> </span></span>", 1), ro = a("<div class=\"tw:flex tw:min-w-0 tw:flex-1 tw:items-start tw:gap-2 tw:px-2 tw:py-2 tw:font-sans tw:text-sm tw:text-muted-foreground\"><!><span class=\"tw:min-w-0\"><span class=\"tw:block tw:truncate\"> </span><span class=\"tw:block tw:text-xs\"> </span></span></div>"), io = a("<li class=\"tw:flex tw:items-start tw:gap-1\"><!> <!></li>"), ao = a("<ul class=\"tw:m-0 tw:list-none tw:space-y-1 tw:p-0\"></ul>"), oo = a("<!> ", 1), so = a("<section class=\"tw:space-y-2 tw:border-t tw:border-border tw:bg-sidebar tw:px-3 tw:py-3 tw:font-sans tw:text-sm tw:text-sidebar-foreground\" data-native-pins=\"\" data-vb-native=\"\"><div class=\"tw:flex tw:items-center tw:justify-between tw:gap-2\"><h2 class=\"tw:m-0 tw:font-sans tw:text-xs tw:font-semibold tw:uppercase tw:tracking-wide tw:text-muted-foreground\"> </h2> <!></div> <!> <!> <!> <!> <!> <!></section>");
function co(n, a) {
	b(a, !0);
	let o = () => te(v(O), "$pinState", u), [u, f] = e(), p = !1;
	d(() => {
		p = !0;
	});
	function _() {
		return !p && a.session.active && a.session.roomId === a.room.id;
	}
	function y(e) {
		_() && Wa(a.session, e);
	}
	function S(e) {
		_() && e.key === "Escape" && (e.preventDefault(), e.stopPropagation(), oe());
	}
	function E() {
		_() && Qa(a.session, a.room, a.send, !0);
	}
	function D(e) {
		_() && Za(a.session, a.room.id, e, a.request);
	}
	let O = k(() => a.session.state), A = k(() => (a.room.pins ?? []).map((e) => ({
		pin: e,
		target: za(e, a.room)
	}))), M = k(() => v(A).some((e) => e.target.kind === "file-unloaded")), N = m(null), P = m(null), F = k(() => a.session.active && a.session.roomId === a.room.id), I = m(null), L = m(null), ne = k(() => `pin-url-${a.room.id}`), re = (e) => a.t({
		"invalid-link": "Use um link http ou https válido.",
		offline: "Sem conexão. Seu rascunho foi mantido.",
		"send-failed": "Não deu pra enviar agora. Tente de novo.",
		unconfirmed: "Ainda não recebi confirmação. Confira os fixados antes de tentar de novo.",
		"already-pinned": "Este link já está nos fixados.",
		rejected: "Não deu pra atualizar os fixados. Tente de novo."
	}[e.kind]);
	x(() => {
		if (p || !v(N)) return;
		if (v(P) !== a.session || !a.session.active || a.session.roomId !== a.room.id) {
			c(N, null), c(P, null);
			return;
		}
		let e = a.room.pins?.find((e) => e.id === v(N) && e.kind === "file");
		if (!e) {
			c(N, null), c(P, null);
			return;
		}
		let t = za(e, a.room);
		t.kind === "file" ? (c(N, null), c(P, null), a.onopenfile(t.file)) : a.room.filesAll && (c(N, null), c(P, null));
	});
	async function ae() {
		if (!_()) return;
		let e = a.session;
		Ua(e), await s(), !p && a.session === e && e.active && e.roomId === a.room.id && v(I)?.isConnected && v(I).focus();
	}
	async function oe() {
		if (!_()) return;
		let e = a.session;
		Ga(e), await s(), !p && a.session === e && e.active && e.roomId === a.room.id && v(L)?.isConnected && v(L).focus();
	}
	function se(e) {
		e.preventDefault(), _() && Xa(a.session, a.room.id, a.request);
	}
	function ce(e) {
		if (!_()) return;
		let t = a.room.pins?.find((t) => t.id === e);
		if (!t) return;
		let n = za(t, a.room);
		n.kind === "file" && a.onopenfile(n.file), n.kind === "app" && a.onopenapp(n.app), n.kind === "file-unloaded" && (c(P, a.session), c(N, e, !0), Qa(a.session, a.room, a.send, !o().filesPending));
	}
	var le = so(), de = r(le), V = r(de), pe = l(V, !0), me = w(V, 2), he = (e) => {
		{
			let t = k(() => a.t("Fixar um link")), n = k(() => !v(F));
			Ce(e, {
				get label() {
					return v(t);
				},
				icon: "plus",
				get disabled() {
					return v(n);
				},
				onclick: ae,
				get ref() {
					return v(L);
				},
				set ref(e) {
					c(L, e, !0);
				}
			});
		}
	};
	U(me, (e) => {
		o().adding || e(he);
	}), R(de);
	var ge = w(de, 2), _e = (e) => {
		var n = $a(), s = r(n), l = r(s);
		ue(l, {
			get for() {
				return v(ne);
			},
			children: (e, n) => {
				t();
				var r = B();
				h((e) => i(r, e), [() => a.t("Link pra fixar")]), C(e, r);
			},
			$$slots: { default: !0 }
		});
		var u = w(l, 2);
		{
			let e = k(() => a.t("Cole um link (site, repo, painel…)")), t = k(() => !v(F)), n = k(() => o().issue?.kind === "invalid-link" || void 0);
			fe(u, {
				get id() {
					return v(ne);
				},
				name: "url",
				get value() {
					return o().draft.url;
				},
				onkeydown: S,
				oninput: (e) => y({ url: e.currentTarget.value }),
				required: !0,
				maxlength: 2e3,
				autocomplete: "url",
				get placeholder() {
					return v(e);
				},
				get disabled() {
					return v(t);
				},
				get "aria-invalid"() {
					return v(n);
				},
				get ref() {
					return v(I);
				},
				set ref(e) {
					c(I, e, !0);
				}
			});
		}
		R(s);
		var d = w(s, 2), f = r(d);
		{
			let e = k(() => `${v(ne)}-title`);
			ue(f, {
				get for() {
					return v(e);
				},
				children: (e, n) => {
					t();
					var r = B();
					h((e) => i(r, e), [() => a.t("Nome (opcional)")]), C(e, r);
				},
				$$slots: { default: !0 }
			});
		}
		var p = w(f, 2);
		{
			let e = k(() => `${v(ne)}-title`), t = k(() => !v(F));
			fe(p, {
				get id() {
					return v(e);
				},
				name: "title",
				get value() {
					return o().draft.title;
				},
				onkeydown: S,
				oninput: (e) => y({ title: e.currentTarget.value }),
				maxlength: 80,
				get disabled() {
					return v(t);
				}
			});
		}
		R(d);
		var m = w(d, 2), _ = r(m);
		{
			let e = k(() => !v(F));
			ee(_, {
				variant: "ghost",
				size: "sm",
				get disabled() {
					return v(e);
				},
				onclick: oe,
				onkeydown: S,
				children: (e, n) => {
					t();
					var r = B();
					h((e) => i(r, e), [() => a.t("Cancelar")]), C(e, r);
				},
				$$slots: { default: !0 }
			});
		}
		var b = w(_, 2);
		{
			let e = k(() => !v(F) || !!o().pending);
			ee(b, {
				type: "submit",
				size: "sm",
				get disabled() {
					return v(e);
				},
				onkeydown: S,
				children: (e, n) => {
					t();
					var r = B();
					h((e) => i(r, e), [() => a.t("Fixar")]), C(e, r);
				},
				$$slots: { default: !0 }
			});
		}
		R(m), R(n), h((e) => H(n, "aria-label", e), [() => a.t("Fixar um link")]), g("submit", n, se), C(e, n);
	};
	U(ge, (e) => {
		o().adding && e(_e);
	});
	var ye = w(ge, 2), be = (e) => {
		var t = eo(), n = l(t, !0);
		h((e) => i(n, e), [() => a.t("Aguardando confirmação…")]), C(e, t);
	};
	U(ye, (e) => {
		o().pending && e(be);
	});
	var xe = w(ye, 2), Se = (e) => {
		var t = eo(), n = l(t, !0);
		h((e) => i(n, e), [() => re(o().issue)]), C(e, t);
	}, Te = (e) => {
		{
			let t = k(() => re(o().issue));
			ve(e, {
				compact: !0,
				get title() {
					return v(t);
				},
				get description() {
					return o().issue.detail;
				}
			});
		}
	};
	U(xe, (e) => {
		o().issue?.kind === "already-pinned" ? e(Se) : o().issue && e(Te, 1);
	});
	var Ee = w(xe, 2), De = (e) => {
		{
			let t = k(() => re({ kind: o().fileIssue }));
			ve(e, {
				compact: !0,
				get title() {
					return v(t);
				}
			});
		}
	};
	U(Ee, (e) => {
		o().fileIssue && e(De);
	});
	var Oe = w(Ee, 2), ke = (e) => {
		{
			let n = k(() => !v(F));
			ee(e, {
				variant: "ghost",
				size: "sm",
				get disabled() {
					return v(n);
				},
				onclick: E,
				children: (e, n) => {
					t();
					var r = B();
					h((e) => i(r, e), [() => a.t("Tentar carregar novamente")]), C(e, r);
				},
				$$slots: { default: !0 }
			});
		}
	};
	U(Oe, (e) => {
		v(M) && (o().filesPending || o().fileIssue) && e(ke);
	});
	var Ae = w(Oe, 2), je = (e) => {
		var t = ao();
		we(t, 21, () => v(A), ({ pin: e, target: t }) => e.id, (e, t) => {
			let n = () => v(t).pin, s = () => v(t).target;
			var c = io(), u = r(c), d = (e) => {
				var t = to(), n = r(t);
				ie(n, { name: "chevronRight" });
				var a = w(n), o = r(a), c = l(o, !0), u = w(o), d = l(u, !0);
				R(a), R(t), h(() => {
					H(t, "href", s().href), H(t, "title", s().href), i(c, s().label), i(d, s().detail);
				}), z("click", t, (e) => {
					_() || e.preventDefault();
				}), C(e, t);
			}, f = (e) => {
				{
					let t = k(() => !v(F));
					ee(e, {
						variant: "ghost",
						class: "tw:h-auto tw:min-w-0 tw:flex-1 tw:justify-start tw:whitespace-normal tw:px-2 tw:py-2 tw:text-left",
						get disabled() {
							return v(t);
						},
						onclick: () => ce(n().id),
						children: (e, t) => {
							var n = no(), c = T(n);
							ie(c, { name: "chevronRight" });
							var u = w(c), d = r(u), f = l(d, !0), p = w(d), m = l(p, !0);
							R(u), h((e) => {
								i(f, s().label), i(m, e);
							}, [() => s().kind === "file-unloaded" ? a.t(o().filesPending ? "Carregando arquivo…" : "Carregar arquivo") : a.t(s().detail)]), C(e, n);
						},
						$$slots: { default: !0 }
					});
				}
			}, p = (e) => {
				var t = ro(), n = r(t);
				ie(n, {
					name: "warning",
					class: "tw:mt-0.5"
				});
				var o = w(n), c = r(o), u = l(c, !0), d = w(c), f = l(d, !0);
				R(o), R(t), h((e) => {
					i(u, s().label), i(f, e);
				}, [() => a.t(s().reason)]), C(e, t);
			};
			U(u, (e) => {
				s().kind === "link" ? e(d) : s().kind === "file" || s().kind === "app" || s().kind === "file-unloaded" ? e(f, 1) : e(p, -1);
			});
			var m = w(u, 2);
			{
				let e = k(() => a.t("Desafixar {name}", { name: s().label })), t = k(() => !v(F) || !!o().pending);
				Ce(m, {
					icon: "close",
					get label() {
						return v(e);
					},
					get disabled() {
						return v(t);
					},
					onclick: () => D(n().id)
				});
			}
			R(c), h(() => H(c, "data-pin-id", n().id)), C(e, c);
		}), R(t), C(e, t);
	}, Me = (e) => {
		{
			let t = k(() => !v(F));
			ee(e, {
				variant: "ghost",
				class: "tw:w-full tw:justify-start tw:whitespace-normal tw:text-left tw:text-muted-foreground",
				get disabled() {
					return v(t);
				},
				onclick: ae,
				children: (e, t) => {
					var n = oo(), r = T(n);
					ie(r, { name: "plus" });
					var o = w(r, 1, !0);
					h((e) => i(o, e), [() => a.t("Fixar site, repo ou app")]), C(e, n);
				},
				$$slots: { default: !0 }
			});
		}
	};
	U(Ae, (e) => {
		v(A).length ? e(je) : o().adding || e(Me, 1);
	}), R(le), h((e) => {
		H(le, "aria-labelledby", `pins-title-${a.room.id}`), H(V, "id", `pins-title-${a.room.id}`), i(pe, e);
	}, [() => a.t("Fixados")]), C(n, le), j(), f();
}
n(["click"]);
// svelte/Sidebar.svelte
var lo = a("<div class=\"fnCol\"><span class=\"fnRow\"><span class=\"fn\"> </span><span class=\"pendTag\"> </span></span> <small class=\"memActs\"><button type=\"button\" class=\"ghost resend\"> </button> · <button type=\"button\" class=\"ghost resend\"> </button></small></div>"), uo = a("<span class=\"fn\"> </span>"), fo = a("<div class=\"fnCol\"><span class=\"fn\"> </span><small class=\"memActs\"> </small></div>"), po = a("<button type=\"button\" class=\"ghost x\"></button>"), mo = a("<div class=\"member\"><!> <!> <!></div> <!>", 1), ho = a("<button type=\"button\" class=\"iconBtn phOnly\" id=\"sideArch\"></button> <button type=\"button\" class=\"iconBtn phOnly\" id=\"sideDel\"></button>", 1), go = a("<span class=\"rowEdit phOnly\" role=\"button\" tabindex=\"0\" id=\"sideRename\"><!> </span>"), _o = a("<div class=\"member reqRow\"><!> <div class=\"fnCol\"><span class=\"fn\"> </span><small class=\"memActs\"> <button type=\"button\" class=\"ghost resend okAsk\" data-ok=\"1\"> </button></small></div> <button type=\"button\" class=\"ghost x\" data-ok=\"\"></button></div>"), vo = a("<div class=\"asks\"><h4> </h4> <!></div>"), yo = a("<details class=\"memMore\" data-fold=\"off\"><summary> </summary><!></details>"), bo = a("<button type=\"button\" class=\"friendAdd\"><!><span class=\"fn\"> </span><b></b></button>"), xo = a("<details class=\"memMore\" data-fold=\"friends\"><summary> </summary> <!></details>"), So = a("<option></option>"), Co = a("<button type=\"button\" class=\"sheetGrab\"><i></i></button> <!> <div class=\"sideHead\"><div class=\"sideTop\"><a data-nav=\"\" href=\"/app\" class=\"muted\"><!> vibebooks</a> <!> <button type=\"button\" class=\"iconBtn\" id=\"railToggle\" aria-expanded=\"true\"></button></div></div> <div class=\"sec threadsSec\"><button type=\"button\" data-thread=\"main\"><!><span class=\"rt\"> </span> <!> <!><span class=\"n\"> </span></button> <!></div> <!> <div class=\"sec\"><!> <h4> </h4> <!> <!> <!> <!> <form class=\"row\" id=\"invite\" style=\"margin-top:8px\"><input type=\"email\" required=\"\" list=\"friendList\" autocomplete=\"off\"/><button></button></form> <datalist id=\"friendList\"></datalist></div>", 1);
function wo(e, n) {
	b(n, !0);
	let a = (e, t = xe) => {
		var a = mo(), o = T(a), s = r(o);
		M(s, () => n.vb.avatar(t(), n.room.online.includes(t())));
		var c = w(s, 2), u = (e) => {
			var a = lo(), o = r(a), s = r(o), c = l(s, !0), u = w(s), d = l(u, !0);
			R(o);
			var f = w(o, 2), p = r(f), m = l(p, !0), g = w(p, 2), _ = l(g, !0);
			R(f), R(a), h((e, n, r, a, o, l, f) => {
				H(s, "title", t()), i(c, e), H(u, "title", n), i(d, r), H(p, "data-copyinv", t()), H(p, "title", a), i(m, o), H(g, "data-resend", t()), H(g, "title", l), i(_, f);
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
			var r = uo(), a = l(r, !0);
			h(() => {
				H(r, "title", t()), i(a, n.room.names[t()]);
			}), C(e, r);
		}, p = (e) => {
			var n = fo(), a = r(n), o = l(a, !0), s = w(a), c = l(s);
			R(n), h((e, n) => {
				H(a, "title", t()), i(o, e), i(c, `@${n ?? ""}`);
			}, [() => t().split("@")[0], () => t().split("@")[1] ?? ""]), C(e, n);
		};
		U(c, (e) => {
			v(d) ? e(u) : n.room.names?.[t()] ? e(f, 1) : e(p, -1);
		});
		var m = w(c, 2), g = (e) => {
			var r = po();
			M(r, () => n.vb.icon("x"), !0), R(r), h((e, n) => {
				H(r, "data-remove", t()), H(r, "aria-label", e), H(r, "title", n);
			}, [() => n.vb.t("Remover {email}", { email: t() }), () => n.room.pending?.includes(t()) ? n.vb.t("Cancelar convite") : n.vb.t("Remover do vibebook")]), C(e, r);
		}, _ = k(() => t() !== n.room.book?.owner && (n.room.pending?.includes(t()) || n.room.me === n.room.book?.owner));
		U(m, (e) => {
			v(_) && e(g);
		}), R(o);
		var y = w(o, 2);
		M(y, () => n.vb.agentRows(t())), C(e, a);
	}, o = D(n, "foldOpen", 19, () => ({
		off: !1,
		friends: null
	})), s = D(n, "friends", 19, () => []), c = (e) => n.room.counts ? (n.room.counts[e] ?? 0) + n.room.messages.filter((t) => t.thread === e && t.id > (n.room.countsAt ?? 0)).length : n.room.messages.filter((t) => t.thread === e).length, u = k(() => n.room.epics.find((e) => e.id === n.thread)), d = k(() => n.room.members.filter((e) => e === n.room.me || n.room.online.includes(e))), f = k(() => n.room.members.filter((e) => !v(d).includes(e))), p = k(() => s().filter((e) => !n.room.members.includes(e)));
	var m = Co(), g = T(m), _ = w(g, 2);
	M(_, () => n.vb.roomStrip());
	var y = w(_, 2), x = r(y), S = r(x), E = r(S);
	M(E, () => n.vb.icon("back")), t(), R(S);
	var O = w(S, 2), A = (e) => {
		var t = ho(), r = T(t);
		M(r, () => n.vb.icon(v(u).archived ? "undo" : "check", 18), !0), R(r);
		var i = w(r, 2);
		M(i, () => n.vb.icon("trash", 18), !0), R(i), h((e, t, n, a) => {
			H(r, "title", e), H(r, "aria-label", t), H(i, "title", n), H(i, "aria-label", a);
		}, [
			() => v(u).archived ? n.vb.t("Desarquivar épico") : n.vb.t("Arquivar épico (concluído)"),
			() => v(u).archived ? n.vb.t("Desarquivar épico") : n.vb.t("Arquivar épico"),
			() => n.vb.t("Apagar épico"),
			() => n.vb.t("Apagar épico")
		]), C(e, t);
	};
	U(O, (e) => {
		v(u) && e(A);
	});
	var N = w(O, 2);
	M(N, () => n.vb.icon("sidebar", 20), !0), R(N), R(x), R(y);
	var P = w(y, 2), F = r(P);
	let I;
	var ee = r(F);
	M(ee, () => n.vb.roomMark("ri roomIco"));
	var L = w(ee), te = l(L, !0), ne = w(L, 2), ie = (e) => {
		var t = go(), a = r(t);
		M(a, () => n.vb.icon("pencil", 13));
		var o = w(a);
		R(t), h((e, n) => {
			H(t, "title", e), i(o, ` ${n ?? ""}`);
		}, [() => n.vb.t("Renomear"), () => n.vb.t("editar")]), C(e, t);
	}, ae = k(() => !n.thread.startsWith("pre:"));
	U(ne, (e) => {
		v(ae) && e(ie);
	});
	var oe = w(ne, 2);
	M(oe, () => n.vb.waitPill("main"));
	var z = w(oe), B = l(z, !0);
	R(F);
	var se = w(F, 2);
	{
		let e = k(() => ({
			t: n.vb.t,
			name: n.vb.name,
			epicBusy: n.vb.epicBusy,
			waitCount: (e) => n.vb.waitsIn(e).length
		}));
		Ia(se, {
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
	R(P);
	var ce = w(P, 2);
	co(ce, {
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
	var le = w(ce, 2), ue = r(le), de = (e) => {
		var t = vo(), a = r(t), o = l(a, !0), s = w(a, 2);
		we(s, 17, () => n.room.requests, (e) => e.email, (e, t, a, o) => {
			var s = _o(), c = r(s);
			M(c, () => n.vb.avatar(v(t).email));
			var u = w(c, 2), d = r(u), f = l(d, !0), p = w(d), m = r(p), g = w(m), _ = l(g, !0);
			R(p), R(u);
			var y = w(u, 2);
			M(y, () => n.vb.icon("x"), !0), R(y), R(s), h((e, n, r, a, o, s, c) => {
				H(d, "title", e), i(f, n), i(m, `${r ?? ""} · `), H(g, "data-ask", v(t).email), H(g, "title", a), i(_, o), H(y, "data-ask", v(t).email), H(y, "aria-label", s), H(y, "title", c);
			}, [
				() => `${v(t).email} · ${n.vb.t("pediu {ago}", { ago: n.vb.ago(v(t).ts) })}`,
				() => v(t).name || v(t).email.split("@")[0],
				() => n.vb.t("pediu {ago}", { ago: n.vb.ago(v(t).ts) }),
				() => n.vb.t("Liberar: entra na sala e recebe o link por email"),
				() => n.vb.t("liberar"),
				() => n.vb.t("Recusar {email}", { email: v(t).email }),
				() => n.vb.t("Recusar")
			]), C(e, s);
		}), R(t), h((e) => i(o, e), [() => n.vb.t("Pedindo pra entrar")]), C(e, t);
	};
	U(ue, (e) => {
		n.room.requests?.length && e(de);
	});
	var V = w(ue, 2), fe = l(V, !0), pe = w(V, 2);
	M(pe, () => n.vb.sbxRows());
	var me = w(pe, 2);
	we(me, 16, () => v(d), (e) => e, (e, t) => {
		a(e, () => t);
	});
	var he = w(me, 2), ge = (e) => {
		var t = yo(), s = r(t), c = l(s, !0), u = w(s);
		we(u, 16, () => v(f), (e) => e, (e, t) => {
			a(e, () => t);
		}), R(t), h((e) => {
			t.open = o().off, i(c, e);
		}, [() => n.vb.t("{n} offline", { n: v(f).length })]), C(e, t);
	};
	U(he, (e) => {
		v(f).length && e(ge);
	});
	var _e = w(he, 2), ve = (e) => {
		var t = xo(), a = r(t), s = l(a), c = w(a, 2);
		we(c, 16, () => v(p), (e) => e, (e, t) => {
			var a = bo(), o = r(a);
			M(o, () => n.vb.avatar(t));
			var s = w(o), c = l(s, !0), u = w(s);
			M(u, () => n.vb.icon("plus"), !0), R(u), R(a), h((e, n) => {
				H(a, "data-add", t), H(a, "title", e), i(c, n);
			}, [() => n.vb.t("Adicionar {email}", { email: t }), () => n.vb.name(t)]), C(e, a);
		}), R(t), h((e) => {
			t.open = o().friends ?? n.room.members.length <= 1, i(s, `${e ?? ""} · ${v(p).length ?? ""}`);
		}, [() => n.vb.t("Seus amigos")]), C(e, t);
	};
	U(_e, (e) => {
		v(p).length && e(ve);
	});
	var ye = w(_e, 2), be = r(ye), Se = w(be);
	M(Se, () => n.vb.icon("plus"), !0), R(Se), R(ye);
	var Ce = w(ye, 2);
	we(Ce, 21, () => v(p), Ee, (e, t) => {
		var n = So(), r = {};
		h(() => {
			r !== (r = v(t)) && (n.value = (n.__value = r) ?? "");
		}), C(e, n);
	}), R(Ce), R(le), h((e, t, r, a, o, s, c, l, u, d) => {
		H(g, "aria-label", e), H(N, "title", t), H(N, "aria-label", r), I = re(F, 1, "thread", null, I, {
			sel: n.thread === "main",
			waiting: a
		}), H(F, "title", o), i(te, s), i(B, c), i(fe, l), H(be, "placeholder", u), H(Se, "aria-label", d);
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
var To = a("<span class=\"gut\"> </span>"), Eo = a(" <span class=\"agentTag\">agent</span>", 1), Do = a("<span class=\"doneTag\"> </span>"), Oo = a("<div><!> <!> <span class=\"mact\"><button type=\"button\" class=\"rbtn\"><!> </button> <button type=\"button\" class=\"rbtn\"><!> </button> <button type=\"button\" class=\"rbtn\"><!> </button></span> <div class=\"body\"><!> <div class=\"who\"><!> <!> <span class=\"hhmm\"> </span></div> <div class=\"txt\"></div> <!> <!> <!> <!> <!></div></div>");
function ko(e, t) {
	b(t, !0);
	let n = D(t, "origin", 3, !1), a = k(() => t.vb.continues(t.previous, t.message)), s = k(() => t.message.tag === "reminder" ? t.vb.remHtml(t.message, n()) : t.message.tag === "issue" ? t.vb.issueHtml(t.message) : t.vb.isNotice(t.message) ? t.vb.noticeHtml(t.message) : null), c = k(() => n() && v(s) ? v(s).replace(/\sid="m\d+"/, "") : v(s)), u = k(() => !t.message.text && t.typing ? `<span class="typing">${t.vb.esc(t.vb.typingNote?.(t.message.id) || t.vb.t("pensando ({mode})", { mode: t.vb.typingLabel?.(t.typing) ?? t.typing }))}…</span>` : t.message.author === "ai" ? t.message.text ? t.vb.mentions(t.vb.md(t.message.text)) : t.message.poll ? "" : `<span class="typing">${t.vb.t("pensando…")}</span>` : t.message.text ? t.vb.mentions(t.message.kind === "agent" ? t.vb.md(t.message.text) : t.vb.linkify(t.vb.esc(t.message.text))) : ""), d = k(() => t.vb.dateTime?.(t.message.ts) ?? new Date(t.message.ts).toLocaleString());
	var f = o(), p = T(f), m = (e) => {
		var t = o(), n = T(t);
		M(n, () => v(c)), C(e, t);
	}, g = (e) => {
		var s = Oo();
		let c;
		var f = r(s);
		M(f, () => t.message.kind === "agent" ? t.vb.agentAvatar(t.message.author, t.message.via) : t.vb.avatar(t.message.author));
		var p = w(f, 2), m = (e) => {
			var n = To(), r = l(n, !0);
			h((e) => {
				H(n, "title", v(d)), i(r, e);
			}, [() => t.vb.hhmm(t.message.ts)]), C(e, n);
		};
		U(p, (e) => {
			v(a) && e(m);
		});
		var g = w(p, 2), _ = r(g), y = r(_);
		M(y, () => t.vb.icon("copy", 14));
		var b = w(y);
		R(_);
		var x = w(_, 2), S = r(x);
		M(S, () => t.vb.icon("link", 14));
		var E = w(S);
		R(x);
		var D = w(x, 2), O = r(D);
		M(O, () => t.vb.icon("reply", 14));
		var k = w(O);
		R(D), R(g);
		var A = w(g, 2), j = r(A), N = (e) => {
			var n = o(), r = T(n);
			M(r, () => t.vb.quoteHtml(t.message.reply_to)), C(e, n);
		};
		U(j, (e) => {
			t.message.reply_to && e(N);
		});
		var P = w(j, 2), F = r(P), I = (e) => {
			var n = Eo(), r = T(n), a = w(r);
			h((e, t) => {
				i(r, `${e ?? ""} `), H(a, "title", t);
			}, [() => t.vb.t("{via} de {who}", {
				via: t.message.via || "agent",
				who: t.vb.name(t.message.author)
			}), () => t.vb.t("Escrito pelo agent dessa pessoa, em nome dela")]), C(e, n);
		}, ee = (e) => {
			var n = B();
			h((e) => i(n, e), [() => t.vb.name(t.message.author)]), C(e, n);
		};
		U(F, (e) => {
			t.message.kind === "agent" ? e(I) : e(ee, -1);
		});
		var L = w(F, 2), te = (e) => {
			var n = Do(), r = l(n);
			h((e, t) => {
				H(n, "title", e), i(r, `✓ ${t ?? ""}`);
			}, [() => t.vb.t("Reporta algo entregue"), () => t.vb.t("entregue")]), C(e, n);
		};
		U(L, (e) => {
			t.message.tag === "done" && e(te);
		});
		var ne = w(L), ie = w(ne), ae = l(ie, !0);
		R(P);
		var oe = w(P, 2);
		M(oe, () => v(u), !0), R(oe);
		var z = w(oe, 2);
		M(z, () => t.vb.attHtml(t.message.files));
		var se = w(z, 2), ce = (e) => {
			var n = o(), r = T(n);
			M(r, () => t.vb.cardHtml(t.message)), C(e, n);
		};
		U(se, (e) => {
			t.message.card && e(ce);
		});
		var le = w(se, 2), ue = (e) => {
			var n = o(), r = T(n);
			M(r, () => t.vb.choiceHtml(t.message)), C(e, n);
		};
		U(le, (e) => {
			t.message.choices && e(ue);
		});
		var de = w(le, 2), V = (e) => {
			var n = o(), r = T(n);
			M(r, () => t.vb.pollHtml(t.message.poll)), C(e, n);
		};
		U(de, (e) => {
			t.message.poll && e(V);
		});
		var fe = w(de, 2), pe = (e) => {
			var n = o(), r = T(n);
			M(r, () => t.vb.threadCards(t.message.id)), C(e, n);
		};
		U(fe, (e) => {
			n() || e(pe);
		}), R(A), R(s), h((e, r, o, l, f, p, m, h, g, y, S, C) => {
			c = re(s, 1, "msg", null, c, {
				ai: t.message.author === "ai",
				agent: t.message.author !== "ai" && t.message.kind === "agent",
				done: t.message.tag === "done",
				cont: v(a),
				waitMsg: e
			}), H(s, "id", n() ? void 0 : `m${t.message.id}`), H(_, "data-copymsg", t.message.id), H(_, "title", r), H(_, "aria-label", o), i(b, ` ${l ?? ""}`), H(x, "data-copylink", t.message.id), H(x, "title", f), H(x, "aria-label", p), i(E, ` ${m ?? ""}`), H(D, "data-reply", t.message.id), H(D, "title", h), H(D, "aria-label", g), i(k, ` ${y ?? ""}`), i(ne, ` · ${S ?? ""}`), H(ie, "title", v(d)), i(ae, C), H(oe, "hidden", !v(u));
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
	U(p, (e) => {
		v(c) === null ? e(g, -1) : e(m);
	}), C(e, f), j();
}
// svelte/Chat.svelte
var Ao = a("<div class=\"older\"><button type=\"button\" class=\"ghost\" id=\"olderBtn\"> </button></div>"), jo = a("<div class=\"origin\"><!> <div class=\"replies\"><span> </span><button type=\"button\" class=\"ghost\"> <!></button></div></div>"), Mo = a("<div><!></div>"), No = a("<!> <!> <!>", 1);
function Po(e, t) {
	b(t, !0);
	let n = D(t, "more", 3, !1), a = D(t, "origin", 3, null), s = D(t, "replyCount", 3, 0);
	var c = o(), u = T(c);
	P(u, () => t.room.id + ":" + t.thread, (e) => {
		var c = No(), u = T(c), d = (e) => {
			var n = Ao(), a = r(n), o = l(a, !0);
			R(n), h((e) => i(o, e), [() => t.vb.t("Carregar mensagens anteriores")]), z("click", a, function(...e) {
				t.onloadolder?.apply(this, e);
			}), C(e, n);
		};
		U(u, (e) => {
			t.list.length && n() && e(d);
		});
		var f = w(u, 2), p = (e) => {
			var n = jo(), o = r(n);
			ko(o, {
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
			M(m, () => t.vb.icon("reply", 13)), R(f), R(c), R(n), h((e, t) => {
				i(d, e), H(f, "data-gomain", a().id), i(p, `${t ?? ""} `);
			}, [() => s() === 1 ? t.vb.t("1 resposta") : t.vb.t("{n} respostas", { n: s() }), () => t.vb.t("ver na sala principal")]), C(e, n);
		};
		U(f, (e) => {
			a() && e(p);
		});
		var m = w(f, 2), g = (e) => {
			var n = o(), r = T(n);
			we(r, 19, () => t.list, (e) => e.id, (e, n, r) => {
				{
					let i = k(() => v(r) ? t.list[v(r) - 1] : t.previous);
					ko(e, {
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
			var n = Mo();
			let s;
			var c = r(n), l = (e) => {
				var n = o(), r = T(n);
				M(r, () => t.vb.t("Comece a conversa. Os agents ligados nesta sala leem e respondem; o seu age com o seu OK. Ex.: <i>organiza o projeto em épicos: site novo, aluguéis e domínio</i>.")), C(e, n);
			}, u = (e) => {
				var n = B();
				h((e) => i(n, e), [() => t.vb.t("Discussão deste épico. Os agents leem as tarefas, o doc e a sala principal.")]), C(e, n);
			};
			U(c, (e) => {
				t.thread === "main" ? e(l) : e(u, -1);
			}), R(n), h(() => s = re(n, 1, "empty", null, s, { afterOrigin: !!a() })), C(e, n);
		};
		U(m, (e) => {
			t.list.length ? e(g) : e(_, -1);
		}), C(e, c);
	}), C(e, c), j();
}
n(["click"]);
// svelte/roomStore.ts
function Fo(e, t, n) {
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
function Io() {
	let e = _e(null);
	return {
		subscribe: e.subscribe,
		get: () => V(e),
		replace: e.set,
		apply(t, n) {
			return e.update((e) => Fo(e, t, n)), V(e);
		}
	};
}
// svelte/main.ts
var Lo = /* @__PURE__ */ Oe({
	createRoomStore: () => Io,
	dismissDialogs: () => pe,
	mountInbox: () => Bo,
	mountView: () => zo
}), Ro = {
	tasks: Je,
	board: ti,
	files: fi,
	reminders: ua,
	sidebar: wo,
	chat: Po
};
function zo(e, t, n) {
	let r = _e(n), i = Ro[e], a = f(() => S(ke, {
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
				Te(a);
			});
		}
	};
}
function Bo(e, t) {
	let { waits: n, ...r } = t, i = _e(n), a = f(() => S(Ie, {
		target: e,
		props: {
			props: r,
			waits: i
		}
	}));
	return Object.assign(() => f(() => {
		Te(a);
	}), { updateWaits(e) {
		f(() => i.set(e));
	} });
}
export { Ha as a, Sa as c, Zi as d, Ae as f, Io as i, ta as l, Bo as n, Qa as o, zo as r, Ja as s, Lo as t, Qi as u };
