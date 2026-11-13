import { $ as e, $t as t, At as n, Bt as r, Ct as i, Dt as a, Et as o, Ft as s, Gt as c, Ht as l, It as u, J as d, Jt as f, K as p, Kt as m, Lt as h, Mt as g, Ot as _, Pt as v, Q as y, Qt as b, Rt as x, St as S, Tt as C, Ut as w, Vt as T, Wt as E, X as D, Xt as O, Yt as k, Z as A, Zt as j, _t as M, a as ee, bt as N, c as P, ct as F, d as te, dt as I, en as L, et as R, f as ne, ft as re, h as ie, ht as ae, i as oe, jt as z, kt as B, l as se, lt as ce, mt as le, n as ue, nn as V, nt as de, o as fe, p as pe, pt as me, q as he, r as ge, rt as _e, s as ve, st as ye, t as be, tn as xe, tt as Se, u as Ce, ut as H, vt as U, wt as we, xt as W, yt as Te } from "./Field-dpYXm9AU.js";
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
	let r = () => R(n.values, "$values", i), [i, a] = e();
	var s = o(), c = T(s);
	ae(c, () => n.component, (e, t) => {
		t(e, y(r));
	}), C(t, s), a();
}
// shared/uiVariant.ts
function ke(e, t, n) {
	let r = new URL(t), i = new URL(e, r);
	return i.origin !== r.origin || !/^\/(?:app|archived|login|b\/[a-z0-9]+)\/?$/.test(i.pathname) ? String(e) : (n === "svelte" ? i.searchParams.set("ui", "svelte") : i.searchParams.delete("ui"), i.pathname + i.search + i.hash);
}
// svelte/Inbox.svelte
var Ae = a("<span class=\"tw:grid tw:size-8 tw:shrink-0 tw:place-items-center tw:rounded-full tw:border tw:border-border tw:bg-muted\"><!></span>"), je = a("<li class=\"tw:flex tw:items-start tw:gap-2 tw:py-1\"><a class=\"tw:flex tw:min-w-0 tw:flex-1 tw:gap-3 tw:rounded-control tw:p-2 tw:text-foreground tw:no-underline tw:outline-none tw:hover:bg-accent tw:focus-visible:ring-2 tw:focus-visible:ring-ring\"><!> <span class=\"tw:flex tw:min-w-0 tw:flex-1 tw:flex-col tw:gap-1 tw:text-sm tw:leading-5 tw:[overflow-wrap:anywhere]\"><span class=\"tw:line-clamp-3\"><strong class=\"tw:font-semibold\"> </strong> </span> <span class=\"tw:text-xs tw:leading-4 tw:text-muted-foreground\"> </span></span></a> <!></li>"), Me = a("<ul class=\"tw:m-0 tw:max-h-[60dvh] tw:min-h-0 tw:list-none tw:divide-y tw:divide-border tw:overflow-auto tw:overscroll-contain tw:p-0\"></ul>"), Ne = a("<!> <!>", 1);
function Pe(e, t) {
	b(t, !0);
	let n = (e) => {
		var n = o(), a = T(n), s = (e) => {
			var n = Me();
			U(n, 21, () => v(x), (e) => O(e), (e, n) => {
				var a = je(), o = r(a), s = r(o), c = (e) => {
					var t = Ae(), n = r(t);
					ie(n, { name: "check" }), L(t), C(e, t);
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
				W(s, (e) => {
					v(u) ? e(c) : e(d, -1);
				});
				var m = w(s, 2), g = r(m), _ = r(g), b = l(_, !0), x = w(_);
				L(g);
				var S = w(g, 2), T = l(S);
				L(m), L(o);
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
							onclick: () => N(v(n))
						});
					}
				}, j = k(() => v(n).ref.startsWith("m"));
				W(E, (e) => {
					v(j) && e(D);
				}), L(a), h((e, t, r, a) => {
					H(o, "href", e), i(b, t), i(x, ` ${v(n).text ?? ""}`), i(T, `${v(y) ? `${v(n).room} › ` : ""}${r ?? ""} · ${a ?? ""}`);
				}, [
					() => ee(v(n)),
					() => A(v(n)) === "task" ? t.vb.t("Tarefa sua esperando OK:") : A(v(n)) === "agent" ? t.vb.t("Seu agent espera você:") : `${M(v(n)).split(" ")[0]}:`,
					() => v(n).topic || t.vb.t("sala principal"),
					() => t.vb.ago(v(n).ts)
				]), z("click", o, (e) => t.onopen(v(n), e)), C(e, a);
			}), L(n), C(e, n);
		}, c = (e) => {
			{
				let n = k(() => v(y) ? t.vb.t("Nada esperando você. ✓") : t.vb.t("Nada esperando você nesta sala. ✓"));
				P(e, { get title() {
					return v(n);
				} });
			}
		};
		W(a, (e) => {
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
		return ke(`/b/${encodeURIComponent(e.book_id)}${e.thread === "main" ? "" : `?t=${encodeURIComponent(e.thread)}`}${/^[mab]/.test(e.ref) ? `#m${e.ref.slice(1)}` : ""}`, window.location.href, "svelte");
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
			var r = Ne(), i = T(r), a = (e) => {
				ve(e, {
					get title() {
						return v(g);
					},
					compact: !0
				});
			};
			W(i, (e) => {
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
			W(o, (e) => {
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
function Fe(t, n) {
	let r = () => R(n.waits, "$waits", i), [i, a] = e();
	Pe(t, y(() => n.props, { get waits() {
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
]), Le = a("<progress> </progress>");
function Re(e, t) {
	b(t, !0);
	let n = D(t, "max", 3, 100), r = A(t, Ie), a = k(() => Number.isFinite(n()) && n() > 0 ? n() : 100), o = k(() => Number.isFinite(t.value) ? Math.min(v(a), Math.max(0, t.value)) : 0);
	var s = Le();
	F(s, (e) => ({
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
var ze = a("<!> ", 1), Be = a("<div class=\"tw:min-w-0 tw:flex-1 tw:basis-32 tw:space-y-1\"><!> <!></div>"), Ve = a("<div role=\"group\"><!> <!> <!> <!> <!></div>"), He = a("<section data-vb-native=\"\" class=\"tw:m-0 tw:box-border tw:space-y-3 tw:rounded-surface tw:bg-background tw:p-3 tw:font-sans tw:text-sm tw:text-foreground\"><header class=\"tw:flex tw:items-center tw:gap-3\"><h3 class=\"tw:m-0 tw:font-sans tw:text-sm tw:font-semibold\"> </h3> <!> <!></header> <!> <!> <div class=\"tw:space-y-2\"></div> <form id=\"newTask\" class=\"tw:flex tw:items-center tw:gap-2\"><!> <!></form></section>"), Ue = a("<form class=\"tw:grid tw:grid-cols-1 tw:gap-4\"><!> <!> <div class=\"tw:flex tw:flex-wrap tw:justify-end tw:gap-2\"><!><!></div></form>"), We = a("<!> <!>", 1);
function Ge(e, n) {
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
	}))]), S = m(null), E = m(""), O = m(null), A = m(""), M = m(""), N = m(null), P = m(!1), F = m(""), I = m(null), R = k(() => v(s)?.tasks.find((e) => e.id === v(N)));
	x(() => {
		v(S) && v(O) && (v(O).focus(), v(O).select());
	}), x(() => {
		v(N) && !v(R) && ce(), v(S) && !v(s)?.tasks.some((e) => e.id === v(S)) && c(S, null);
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
		c(N, e.id, !0), c(F, e.due ?? "", !0), c(P, !0);
	}
	function ce() {
		c(P, !1), c(N, null), c(F, "");
	}
	var le = We(), ue = T(le), V = (e) => {
		var a = He(), o = r(a), m = r(o), _ = l(m, !0), y = w(m, 2);
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
			Re(b, {
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
				ge(e, {
					variant: "warning",
					get title() {
						return v(t);
					},
					children: (e, t) => {
						var n = ze(), r = T(n);
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
		W(x, (e) => {
			v(s).flags?.length && e(D);
		});
		var j = w(x, 2), N = (e) => {
			ve(e, {
				get title() {
					return v(M);
				},
				compact: !0
			});
		};
		W(j, (e) => {
			v(M) && !v(P) && e(N);
		});
		var F = w(j, 2);
		U(F, 21, () => v(d), (e) => e.id, (e, a) => {
			var o = Ve(), s = r(o);
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
				var o = Be(), s = r(o);
				{
					let e = k(() => he("tw:h-auto tw:w-full tw:justify-start tw:whitespace-normal tw:rounded-sm tw:p-0 tw:text-left tw:hover:bg-transparent tw:hover:underline", v(a).done && "tw:text-muted-foreground tw:line-through")), r = k(() => n.vb.t("Clique para editar"));
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
								var n = ze(), r = T(n);
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
				W(l, (e) => {
					v(a).flags?.length && e(u);
				}), L(o), C(e, o);
			};
			W(l, (e) => {
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
					onclick: () => se(v(a)),
					children: (e, t) => {
						var n = ze(), r = T(n);
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
			L(o), h((e) => {
				H(o, "data-task", v(a).id), H(o, "aria-label", v(a).title), re(o, 1, e);
			}, [() => me(he("tw:flex tw:flex-wrap tw:items-center tw:gap-2 tw:rounded-control tw:border tw:p-2", v(a).done ? "tw:border-transparent tw:bg-muted/40 tw:text-muted-foreground" : "tw:border-border tw:bg-card tw:text-card-foreground", !v(a).done && v(a).owner === n.room.me && "tw:border-ring/50", u(v(a)) && "tw:bg-warning/10"))]), C(e, o);
		}), L(F);
		var I = w(F, 2), R = r(I);
		{
			let e = k(() => n.vb.t("nova task")), t = k(() => n.vb.t("nova task"));
			fe(R, {
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
		var ne = w(R, 2);
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
		L(I), L(a), h((e, t) => {
			H(a, "aria-label", e), i(_, t);
		}, [() => n.vb.t("Tarefas"), () => n.vb.t("Tarefas")]), g("submit", I, (e) => {
			e.preventDefault(), v(A).trim() && ae({
				t: "task.add",
				epic: n.thread,
				title: v(A)
			}) && c(A, "");
		}), C(e, a);
	};
	W(ue, (e) => {
		v(s) && e(V);
	});
	var de = w(ue, 2), pe = (e) => {
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
				initialFocus: () => v(I),
				onOpenChange: (e) => {
					e || ce();
				},
				get open() {
					return v(P);
				},
				set open(e) {
					c(P, e, !0);
				},
				children: (e, o) => {
					var s = Ue(), l = r(s);
					{
						let e = (e, t = xe) => {
							fe(e, y(t, {
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
					W(u, (e) => {
						v(M) && e(d);
					});
					var f = w(u, 2), p = r(f);
					te(p, {
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
					te(m, {
						type: "submit",
						children: (e, r) => {
							t();
							var a = B();
							h((e) => i(a, e), [() => n.vb.t("Salvar")]), C(e, a);
						},
						$$slots: { default: !0 }
					}), L(f), L(s), g("submit", s, (e) => {
						e.preventDefault(), v(R) && ae({
							t: "task.assign",
							id: v(R).id,
							due: v(F)
						}) && ce();
					}), C(e, s);
				},
				$$slots: { default: !0 }
			});
		}
	};
	W(de, (e) => {
		v(R) && e(pe);
	}), C(e, le), j();
}
// svelte/Tasks.svelte
var Ke = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy"
]);
function qe(e, t) {
	b(t, !0);
	let n = A(t, Ke);
	var r = o(), i = T(r);
	N(i, () => JSON.stringify([t.room.id, t.thread]), (e) => {
		Ge(e, y(() => n));
	}), C(e, r), j();
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
var tt = a("<!> ", 1), nt = a("<!><span> </span>", 1), rt = a("<span class=\"tw:inline-flex tw:items-center tw:gap-1\"><!> </span>"), it = a("<span data-board-drag=\"\" draggable=\"true\" aria-hidden=\"true\" class=\"tw:absolute tw:right-2 tw:top-2 tw:grid tw:size-7 tw:cursor-grab tw:place-items-center tw:rounded-md tw:text-muted-foreground tw:active:cursor-grabbing\"><!></span>"), at = a("<article><button type=\"button\" data-board-open=\"\"><span> </span> <!> <span class=\"tw:flex tw:flex-wrap tw:items-center tw:gap-2 tw:text-xs tw:text-muted-foreground\"><!> <!> <!></span></button> <!> <div><!> <!></div></article>"), ot = a("<p class=\"tw:m-0 tw:py-4 tw:text-xs tw:text-muted-foreground\"> </p>"), st = a("<section><h3 class=\"tw:m-0 tw:flex tw:items-center tw:justify-between tw:gap-2 tw:font-sans tw:text-sm tw:font-semibold tw:leading-5 tw:tracking-normal\"> <!></h3> <div class=\"tw:space-y-3\"></div></section>"), ct = a("<div class=\"tw:h-full tw:min-h-0 tw:min-w-0 tw:overflow-auto tw:pb-2\"><div class=\"tw:grid tw:grid-cols-[repeat(4,minmax(15rem,1fr))] tw:gap-3\"></div></div>"), lt = a("<section class=\"tw:space-y-2\"><h3 class=\"tw:m-0 tw:flex tw:items-center tw:gap-2 tw:font-sans tw:text-sm tw:font-semibold tw:leading-5 tw:tracking-normal\"> <!></h3> <!></section>"), ut = a("<div class=\"tw:h-full tw:min-h-0 tw:space-y-5 tw:overflow-auto\"><!> <!></div>"), dt = a("<div class=\"tw:min-w-32 tw:flex-1 tw:space-y-1\"><!> <!></div>"), ft = a("<section data-vb-native=\"\" class=\"tw:m-0 tw:box-border tw:flex tw:min-h-0 tw:min-w-0 tw:flex-1 tw:flex-col tw:gap-3 tw:rounded-surface tw:bg-background tw:p-3 tw:font-sans tw:text-sm tw:text-foreground\"><p class=\"tw:m-0 tw:text-xs tw:text-muted-foreground\"> </p> <!> <p role=\"status\" aria-live=\"polite\" class=\"tw:sr-only\"> </p> <p class=\"tw:sr-only\"> </p> <!> <form class=\"tw:flex tw:shrink-0 tw:flex-wrap tw:items-end tw:gap-2\" data-board-add=\"\"><div class=\"tw:min-w-36 tw:flex-1 tw:space-y-1\"><!> <!></div> <!> <!></form></section>");
function pt(e, n) {
	let a = _();
	b(n, !0);
	let f = (e, o = xe, s = xe, u = xe) => {
		var d = at(), f = r(d), m = r(f), _ = l(m, !0), y = w(m, 2), b = (e) => {
			{
				let t = k(() => `@vibe: ${o().flags.join(" · ")}`);
				ge(e, {
					variant: "warning",
					get title() {
						return v(t);
					},
					children: (e, t) => {
						var n = tt(), r = T(n);
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
		W(y, (e) => {
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
			var t = nt(), r = T(t);
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
		W(E, (e) => {
			o().owner && e(D);
		});
		var O = w(E, 2), A = (e) => {
			var t = rt(), n = r(t);
			ie(n, {
				name: "calendar",
				class: "tw:size-3"
			});
			var a = w(n, 1, !0);
			L(t), h(() => i(a, o().due)), C(e, t);
		};
		W(O, (e) => {
			o().due && e(A);
		}), L(x), L(f);
		var j = w(f, 2), M = (e) => {
			var t = it(), i = r(t);
			ie(i, { name: "grip" }), L(t), h((e) => H(t, "title", e), [() => n.vb.t("Arraste, ou use ← →. Clique pra abrir o épico.")]), C(e, t);
		};
		W(j, (e) => {
			u() || e(M);
		});
		var P = w(j, 2), te = r(P);
		{
			let e = k(() => `${a}-${s()}`);
			ue(te, {
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
					return v(ae);
				},
				onValueChange: (e) => (et(e) && Se(o(), e, s()), !1)
			});
		}
		L(P), L(d), le(d, (e, t) => ye?.(e, t), s), h((e, t, n, r) => {
			H(d, "data-board-task", o().id), H(d, "data-status", o().status), H(d, "draggable", !u()), re(d, 1, e), H(f, "data-epic", o().epicId), H(f, "aria-describedby", `${a}-keys`), re(f, 1, t), re(m, 1, n), i(_, o().title), re(P, 1, r);
		}, [
			() => me(he("tw:relative tw:min-w-0 tw:rounded-control tw:border tw:border-border tw:bg-card tw:text-card-foreground tw:shadow-xs", u() && "tw:flex tw:flex-wrap tw:items-center", v(F) === o().id && "tw:opacity-50", o().status !== "done" && o().owner === n.room.me && "tw:ring-1 tw:ring-ring/20")),
			() => me(he("tw:block tw:w-full tw:min-w-0 tw:flex-1 tw:space-y-2 tw:rounded-control tw:border-0 tw:bg-transparent tw:p-3 tw:text-left tw:font-sans tw:text-sm tw:text-card-foreground tw:outline-none tw:hover:bg-accent tw:focus-visible:ring-2 tw:focus-visible:ring-ring", !u() && "tw:pr-10")),
			() => me(he("tw:block tw:break-words tw:font-medium", o().status === "done" && "tw:line-through")),
			() => me(he("tw:min-w-32 tw:space-y-1 tw:p-3", !u() && "tw:border-t tw:border-border"))
		]), g("dragstart", d, (e) => {
			e.target instanceof Element && e.target.closest("select") ? e.preventDefault() : (e.dataTransfer && (e.dataTransfer.setData("application/x-vibebook-task", o().id), e.dataTransfer.effectAllowed = "move", e.dataTransfer.setDragImage(e.currentTarget, 20, 20)), c(F, o().id, !0));
		}), g("dragend", d, () => {
			c(F, null), c(N, null);
		}), z("click", f, () => n.onopen?.(o().epicId)), z("keydown", f, (e) => Te(e, o(), s())), C(e, d);
	}, y = k(() => Ze(n.room, n.thread)), S = m(E(Qe())), D = m(""), O = m(null), A = m(""), M = m(""), N = m(null), F = m(null), I = m(E(u(() => v(y).targets.find((e) => e.id === v(y).scope) ?? v(y).targets.find((e) => e.id !== "main") ?? v(y).targets[0] ?? {
		id: n.thread,
		title: n.thread
	}))), R = k(() => v(y).targets.some((e) => e.id === v(I).id)), ne = k(() => [...v(R) ? [] : [{
		value: v(I).id,
		label: v(I).title,
		disabled: !0
	}], ...v(y).targets.map((e) => ({
		value: e.id,
		label: e.title
	}))]), ae = k(() => Xe.map((e) => ({
		value: e.value,
		label: n.vb.t(e.label)
	}))), oe = k(() => v(y).groups.map((e) => ({
		...e,
		tasks: e.tasks.filter((e) => e.status !== "done")
	})).filter((e) => e.tasks.length)), ce = k(() => v(y).tasks.filter((e) => e.owner === n.room.me && e.status !== "done")), V = /* @__PURE__ */ new Map(), de = 0, pe = !1, _e = m(null);
	d(() => {
		pe = !0, de++, V.clear();
	});
	function ye(e, t) {
		return V.set(t, e), { destroy() {
			V.get(t) === e && V.delete(t);
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
		let r = document.activeElement, i = r instanceof HTMLElement && V.get(n)?.contains(r) ? r : null;
		return be({
			t: "task.status",
			id: e.id,
			status: t
		}) ? (c(_e, {
			id: e.id,
			status: t,
			generation: ++de,
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
		t ? t.status === e.status && (c(_e, null), c(M, `${t.title}: ${n.vb.t(Xe.find((e) => e.value === t.status)?.label ?? t.status)}`), Ce(e)) : (c(_e, null), Ce(e));
	});
	function Ce(e) {
		let t = e.focus;
		!t || document.activeElement !== t.node && document.activeElement !== document.body || s().then(() => {
			if (pe || e.generation !== de || document.activeElement !== t.node && document.activeElement !== document.body) return;
			let n = V.get(t.key)?.querySelector(t.selector) ?? v(O);
			n?.focus({ preventScroll: !0 }), n?.scrollIntoView({
				block: "nearest",
				inline: "nearest"
			});
		});
	}
	function we(e) {
		if (e === "board" || e === "list") {
			c(S, e, !0), de++, c(_e, null);
			try {
				localStorage.setItem("vb.boardMode", e);
			} catch {}
		}
	}
	function Te(e, t, n) {
		let r = e.key === "ArrowRight" ? $e(t.status, 1) : e.key === "ArrowLeft" ? $e(t.status, -1) : void 0;
		r && (e.preventDefault(), Se(t, r, n));
	}
	function Ee(e, t) {
		e.preventDefault(), c(N, null);
		let n = e.dataTransfer?.getData("application/x-vibebook-task"), r = v(y).tasks.find((e) => e.id === n);
		c(F, null), r && Se(r, t, `board:${r.id}`);
	}
	function De(e) {
		e.preventDefault(), v(D).trim() && (v(R) ? be({
			t: "task.add",
			epic: v(I).id,
			title: v(D).trim()
		}) && c(D, "") : c(A, n.vb.t("Escolha um épico."), !0));
	}
	var Oe = ft(), ke = r(Oe), Ae = l(ke, !0), je = w(ke, 2), Me = (e) => {
		{
			let t = k(() => v(y).missingScope ? n.vb.t("Épico não encontrado.") : v(R) ? v(A) : n.vb.t("Escolha um épico."));
			ve(e, {
				get title() {
					return v(t);
				},
				compact: !0
			});
		}
	};
	W(je, (e) => {
		(v(y).missingScope || !v(R) || v(A)) && e(Me);
	});
	var Ne = w(je, 2), Pe = l(Ne, !0), Fe = w(Ne, 2), Ie = l(Fe, !0), Le = w(Fe, 2);
	{
		let e = (e, a = xe) => {
			var s = o(), u = T(s), d = (e) => {
				var s = o(), u = T(s), d = (e) => {
					var a = ct(), o = r(a);
					U(o, 21, () => Xe, (e) => e.value, (e, a) => {
						let o = k(() => v(y).tasks.filter((e) => e.status === v(a).value));
						var s = st(), u = r(s), d = r(u, !0), p = w(d);
						ge(p, {
							children: (e, n) => {
								t();
								var r = B();
								h(() => i(r, v(o).length)), C(e, r);
							},
							$$slots: { default: !0 }
						}), L(u);
						var m = w(u, 2);
						U(m, 21, () => v(o), (e) => e.id, (e, t) => {
							f(e, () => v(t), () => `board:${v(t).id}`, () => !1);
						}, (e) => {
							var t = ot(), r = l(t, !0);
							h((e) => i(r, e), [() => n.vb.t(v(a).value === "todo" ? "Nada a fazer." : "Arraste um card pra cá.")]), C(e, t);
						}), L(m), L(s), h((e, t, n) => {
							H(s, "data-lane", v(a).value), H(s, "aria-label", e), re(s, 1, t), i(d, n);
						}, [
							() => n.vb.t(v(a).label),
							() => me(he("tw:min-w-0 tw:space-y-3 tw:rounded-surface tw:border tw:border-border tw:bg-muted/40 tw:p-3", v(N) === v(a).value && "tw:ring-2 tw:ring-ring")),
							() => n.vb.t(v(a).label)
						]), g("dragover", s, (e) => {
							e.dataTransfer?.types.includes("application/x-vibebook-task") && (e.preventDefault(), c(N, v(a).value, !0));
						}), g("dragleave", s, () => {
							c(N, null);
						}), g("drop", s, (e) => Ee(e, v(a).value)), C(e, s);
					}), L(o), L(a), C(e, a);
				}, p = (e) => {
					var a = ut(), o = r(a), s = (e) => {
						var a = lt(), o = r(a), s = r(o, !0), c = w(s);
						ge(c, {
							variant: "warning",
							children: (e, n) => {
								t();
								var r = B();
								h(() => i(r, v(ce).length)), C(e, r);
							},
							$$slots: { default: !0 }
						}), L(o);
						var l = w(o, 2);
						U(l, 17, () => v(ce), (e) => e.id, (e, t) => {
							f(e, () => v(t), () => `mine:${v(t).id}`, () => !0);
						}), L(a), h((e, t) => {
							H(a, "aria-label", e), i(s, t);
						}, [() => n.vb.t("Esperando você"), () => n.vb.t("Esperando você")]), C(e, a);
					};
					W(o, (e) => {
						v(ce).length && e(s);
					});
					var c = w(o, 2);
					U(c, 17, () => v(oe), (e) => e.id, (e, n) => {
						var a = lt(), o = r(a), s = r(o, !0), c = w(s);
						ge(c, {
							children: (e, r) => {
								t();
								var a = B();
								h(() => i(a, v(n).tasks.length)), C(e, a);
							},
							$$slots: { default: !0 }
						}), L(o);
						var l = w(o, 2);
						U(l, 17, () => v(n).tasks, (e) => e.id, (e, t) => {
							f(e, () => v(t), () => `group:${v(t).id}`, () => !0);
						}), L(a), h(() => {
							H(a, "aria-label", v(n).title), i(s, v(n).title);
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
				W(u, (e) => {
					a() === "board" ? e(d) : e(p, -1);
				}), C(e, s);
			};
			W(u, (e) => {
				a() === v(S) && e(d);
			}), C(e, s);
		}, a = k(() => n.vb.t("Quadro de tarefas")), s = k(() => [{
			value: "board",
			label: n.vb.t("Quadro")
		}, {
			value: "list",
			label: n.vb.t("Lista")
		}]);
		se(Le, {
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
			onValueChange: we,
			children: e,
			$$slots: { default: !0 }
		});
	}
	var Re = w(Le, 2), ze = r(Re), Be = r(ze);
	{
		let e = k(() => `${a}-title`);
		ue(Be, {
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
	var Ve = w(Be, 2);
	{
		let e = k(() => `${a}-title`), t = k(() => n.vb.t("nova tarefa"));
		fe(Ve, {
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
	L(ze);
	var He = w(ze, 2), Ue = (e) => {
		var o = dt(), s = r(o);
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
			let e = k(() => `${a}-epic`), t = k(() => !v(R));
			ee(l, {
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
	W(He, (e) => {
		v(y).scope || e(Ue);
	});
	var We = w(He, 2);
	{
		let e = k(() => !v(D).trim() || !v(R));
		te(We, {
			type: "submit",
			get disabled() {
				return v(e);
			},
			children: (e, t) => {
				var r = tt(), a = T(r);
				ie(a, { name: "plus" });
				var o = w(a, 1, !0);
				h((e) => i(o, e), [() => n.vb.t("Nova tarefa")]), C(e, r);
			},
			$$slots: { default: !0 }
		});
	}
	L(Re), L(Oe), h((e, t, n) => {
		H(Oe, "data-board-scope", v(y).scope ?? "all"), H(Oe, "aria-label", e), i(Ae, t), i(Pe, v(M)), H(Fe, "id", `${a}-keys`), i(Ie, n);
	}, [
		() => n.vb.t("Quadro de tarefas"),
		() => v(y).title ?? (v(y).scope ? v(I).title : n.vb.t("Todos os épicos")),
		() => n.vb.t("Arraste, ou use ← →. Clique pra abrir o épico.")
	]), g("submit", Re, De), C(e, Oe), j();
}
n(["click", "keydown"]);
// svelte/Board.svelte
var mt = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy"
]);
function ht(e, t) {
	b(t, !0);
	let n = A(t, mt);
	var r = o(), i = T(r);
	N(i, () => JSON.stringify([t.room.id, t.thread]), (e) => {
		pt(e, y(() => n));
	}), C(e, r), j();
}
// svelte/panels.ts
var gt = (e) => e.type.startsWith("image/") ? "img" : e.type.startsWith("audio/") ? "audio" : e.type === "text/html" ? "html" : e.type === "application/pdf" ? "pdf" : /\.md$/i.test(e.name) || e.type === "text/markdown" ? "md" : e.type === "text/plain" || e.type === "text/csv" ? "txt" : "other", _t = (e) => e > 1e6 ? `${(e / 1e6).toFixed(1)} MB` : `${Math.max(1, Math.round(e / 1e3))} KB`, vt = a("<button type=\"button\"> <small> </small></button>"), yt = a("<div class=\"ftabs\"></div>"), bt = a("<div class=\"fcrumb\"><button type=\"button\" class=\"ghost\"> </button><b><!> </b></div>"), xt = a("<button type=\"button\" class=\"ftile fdir\"><div class=\"thumb\"></div> <b> </b><small> </small></button>"), St = a("<img loading=\"lazy\"/>"), Ct = a("<a class=\"ftile\" target=\"_blank\" rel=\"noopener\"><div class=\"thumb\"><!></div> <b> </b><small> </small> <button type=\"button\" data-pin-kind=\"file\"></button></a>"), wt = a("<div class=\"empty\"> </div>"), Tt = a("<!> <!> <div class=\"fgrid\"><!> <!></div> <!>", 1);
function Et(e, t) {
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
			let n = gt(t);
			e[n] = (e[n] || 0) + 1;
		}
		return e;
	}), f = k(() => v(d)[v(a)] ? v(a) : "all"), p = k(() => v(u).filter((e) => v(f) === "all" || gt(e) === v(f))), g = (e) => e.name.includes("/") ? e.name.slice(0, e.name.lastIndexOf("/")) : "", _ = k(() => v(s) && v(p).some((e) => g(e) === v(s) || g(e).startsWith(v(s) + "/")) ? v(s) : ""), y = k(() => v(_) ? v(_) + "/" : "");
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
		var s = Tt(), u = T(s), p = (e) => {
			var o = yt();
			U(o, 21, () => n.filter(([e]) => v(d)[e]), Te, (e, n) => {
				var o = k(() => V(v(n), 2));
				let s = () => v(o)[0], u = () => v(o)[1];
				var p = vt();
				let m;
				var g = r(p), _ = w(g), y = l(_, !0);
				L(p), h((e) => {
					m = re(p, 1, "ftab", null, m, { on: s() === v(f) }), H(p, "data-fkind", s()), i(g, `${e ?? ""} `), i(y, v(d)[s()]);
				}, [() => t.vb.t(u())]), z("click", p, () => c(a, s(), !0)), C(e, p);
			}), L(o), C(e, o);
		};
		W(u, (e) => {
			v(d).all > 1 && e(p);
		});
		var m = w(u, 2), g = (e) => {
			var n = bt(), a = r(n), o = l(a), s = w(a), c = r(s);
			M(c, () => t.vb.icon("folder", 14));
			var u = w(c);
			L(s), L(n), h((e, t) => {
				H(a, "data-fdir", e), i(o, `← ${t ?? ""}`), i(u, ` ${v(_) ?? ""}/`);
			}, [() => v(_).includes("/") ? v(_).slice(0, v(_).lastIndexOf("/")) : "", () => t.vb.t("voltar")]), z("click", a, (e) => S(e, v(_).includes("/") ? v(_).slice(0, v(_).lastIndexOf("/")) : "")), C(e, n);
		};
		W(m, (e) => {
			v(_) && e(g);
		});
		var b = w(m, 2), x = r(b);
		U(x, 17, () => v(E).dirs, Te, (e, n) => {
			var a = k(() => V(v(n), 2));
			let o = () => v(a)[0], s = () => v(a)[1];
			var c = xt(), u = r(c);
			M(u, () => t.vb.icon("folder", 34), !0), L(u);
			var d = w(u, 2), f = l(d), p = w(d), m = l(p, !0);
			L(c), h((e) => {
				H(c, "data-fdir", v(y) + o()), i(f, `${o() ?? ""}/`), i(m, e);
			}, [() => s() === 1 ? t.vb.t("1 arquivo") : t.vb.t("{n} arquivos", { n: s() })]), z("click", c, (e) => S(e, v(y) + o())), C(e, c);
		});
		var j = w(x, 2);
		U(j, 17, () => v(E).list, (e) => e.id, (e, n) => {
			var a = Ct(), s = r(a), c = r(s), u = (e) => {
				var t = St();
				h((e) => {
					H(t, "src", e), H(t, "alt", v(n).name);
				}, [() => D(v(n))]), C(e, t);
			}, d = k(() => v(n).type.startsWith("image/")), f = (e) => {
				var r = o(), i = T(r);
				M(i, () => t.vb.icon(v(n).type === "text/html" ? "globe" : v(n).type.startsWith("audio/") ? "mic" : "file", 30)), C(e, r);
			};
			W(c, (e) => {
				v(d) ? e(u) : e(f, -1);
			}), L(s);
			var p = w(s, 2), m = l(p, !0), g = w(p), _ = l(g), b = w(g, 2);
			let x;
			M(b, () => t.vb.icon("pin", 14), !0), L(b), L(a), h((e, t, r, o, s, c, l, u, d, f) => {
				H(a, "href", e), H(a, "title", v(n).name), H(a, "data-view", t), H(a, "data-name", v(n).name), i(m, r), i(_, `${o ?? ""} · ${s ?? ""} · ${c ?? ""}`), x = re(b, 1, "ghost pinBtn", null, x, { on: l }), H(b, "data-pin-ref", v(n).id), H(b, "title", u), H(b, "aria-label", d), H(b, "aria-pressed", f);
			}, [
				() => D(v(n)),
				() => v(n).type.startsWith("image/") ? "img" : "frame",
				() => v(n).name.slice(v(y).length),
				() => t.vb.name(v(n).author),
				() => t.vb.ago(v(n).ts),
				() => v(E).versions[v(n).name] > 1 ? t.vb.t("{n} versões", { n: v(E).versions[v(n).name] }) : _t(v(n).size),
				() => !!O(v(n)),
				() => t.vb.t(O(v(n)) ? "Desafixar" : "Fixar na lateral"),
				() => t.vb.t(O(v(n)) ? "Desafixar" : "Fixar na lateral"),
				() => !!O(v(n))
			]), z("click", b, (e) => A(e, v(n))), C(e, a);
		}), L(b);
		var ee = w(b, 2), N = (e) => {
			var n = wt(), r = l(n, !0);
			h((e) => i(r, e), [() => t.vb.t("Nada aqui.")]), C(e, n);
		};
		W(ee, (e) => {
			!v(E).list.length && !v(E).dirs.length && e(N);
		}), C(e, s);
	}, F = (e) => {
		var n = wt(), r = l(n, !0);
		h((e) => i(r, e), [() => t.vb.t("Cole uma imagem no chat (Cmd+V), arraste um arquivo ou use o clipe. Tudo que for enviado neste vibebook fica aqui.")]), C(e, n);
	};
	W(N, (e) => {
		v(u).length ? e(P) : e(F, -1);
	}), C(e, ee), j();
}
n(["click"]);
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
function G(e, t, n, r) {
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
}, kn = /* @__PURE__ */ new WeakSet([Object.prototype, Error.prototype]), An = /* @__PURE__ */ G("$ZodError", (e, t) => {
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
})(An), In = /^[\s\S]{0,}$/, Ln = /^-?\d+(?:\.\d+)?$/, Rn = /^(?:true|false)$/i, zn = /*@__PURE__*/ G("$ZodCheck", (e, t) => {
	var n;
	e._zod ??= {}, e._zod.def = t, (n = e._zod).onattach ?? (n.onattach = []);
}), Bn = (e) => {
	let t = e.value;
	return !jt(t) && t.length !== void 0;
}, Vn = /*@__PURE__*/ G("$ZodCheckMaxLength", (e, t) => {
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
}), Hn = /*@__PURE__*/ G("$ZodCheckMinLength", (e, t) => {
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
}), Un = /*@__PURE__*/ G("$ZodCheckStartsWith", (e, t) => {
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
}, Gn = /*@__PURE__*/ G("$ZodType", (e, t) => {
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
var Yn = /*@__PURE__*/ G("$ZodString", (e, t) => {
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
}), Xn = /*@__PURE__*/ G("$ZodNumber", (e, t) => {
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
}), Zn = /*@__PURE__*/ G("$ZodBoolean", (e, t) => {
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
var tr = /*@__PURE__*/ G("$ZodArray", (e, t) => {
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
var or = /*@__PURE__*/ G("$ZodObject", (e, t) => {
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
var cr = /*@__PURE__*/ G("$ZodUnion", (e, t) => {
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
var ur = /*@__PURE__*/ G("$ZodDiscriminatedUnion", (e, t) => {
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
}), dr = /*@__PURE__*/ G("$ZodEnum", (e, t) => {
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
}), fr = /*@__PURE__*/ G("$ZodLiteral", (e, t) => {
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
var mr = /*@__PURE__*/ G("$ZodOptional", (e, t) => {
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
}), hr = /*@__PURE__*/ G("$ZodNullable", (e, t) => {
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
var Cr = /*@__PURE__*/ G("ZodMiniType", (e, t) => {
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
}), wr = /*@__PURE__*/ G("ZodMiniString", (e, t) => {
	Yn.init(e, t), Cr.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function K(e) {
	return /* @__PURE__ */ _r(wr, e);
}
var Tr = /*@__PURE__*/ G("ZodMiniNumber", (e, t) => {
	Xn.init(e, t), Cr.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function Er(e) {
	return /* @__PURE__ */ vr(Tr, e);
}
var Dr = /*@__PURE__*/ G("ZodMiniBoolean", (e, t) => {
	Zn.init(e, t), Cr.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function Or(e) {
	return /* @__PURE__ */ yr(Dr, e);
}
var kr = /*@__PURE__*/ G("ZodMiniArray", (e, t) => {
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
var jr = /*@__PURE__*/ G("ZodMiniObject", (e, t) => {
	or.init(e, t), Cr.init(e, t), _n(e, "shape", (e) => e._zod.def.shape, !1);
});
// @__NO_SIDE_EFFECTS__
function q(e, t) {
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
var Nr = /*@__PURE__*/ G("ZodMiniUnion", (e, t) => {
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
var Fr = /*@__PURE__*/ G("ZodMiniDiscriminatedUnion", (e, t) => {
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
var Lr = /*@__PURE__*/ G("ZodMiniEnum", (e, t) => {
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
var zr = /*@__PURE__*/ G("ZodMiniLiteral", (e, t) => {
	fr.init(e, t), Cr.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function J(e, t) {
	return new zr({
		type: "literal",
		values: Array.isArray(e) ? e : [e],
		...qt(t)
	});
}
var Br = /*@__PURE__*/ G("ZodMiniOptional", (e, t) => {
	mr.init(e, t), Cr.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function Vr(e) {
	return new Br({
		type: "optional",
		innerType: e
	});
}
var Hr = /*@__PURE__*/ G("ZodMiniNullable", (e, t) => {
	hr.init(e, t), Cr.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function Ur(e) {
	return new Hr({
		type: "nullable",
		innerType: e
	});
}
var Wr = /* @__PURE__ */ Pr([/* @__PURE__ */ q({
	ok: /* @__PURE__ */ J(!0),
	id: /* @__PURE__ */ Er(),
	thread: /* @__PURE__ */ K()
}), /* @__PURE__ */ q({
	ok: /* @__PURE__ */ J(!1),
	error: /* @__PURE__ */ K()
})]), Gr = /* @__PURE__ */ q({
	ok: /* @__PURE__ */ Or(),
	name: /* @__PURE__ */ Vr(/* @__PURE__ */ K()),
	error: /* @__PURE__ */ Vr(/* @__PURE__ */ K()),
	every: /* @__PURE__ */ Vr(/* @__PURE__ */ Ur(/* @__PURE__ */ K())),
	cron: /* @__PURE__ */ Vr(/* @__PURE__ */ Ur(/* @__PURE__ */ K())),
	timezone: /* @__PURE__ */ Vr(/* @__PURE__ */ K()),
	next_at: /* @__PURE__ */ Vr(/* @__PURE__ */ K())
}), Kr = /* @__PURE__ */ q({
	id: /* @__PURE__ */ K(),
	name: /* @__PURE__ */ K(),
	type: /* @__PURE__ */ K(),
	size: /* @__PURE__ */ Er(),
	author: /* @__PURE__ */ K(),
	ts: /* @__PURE__ */ Er(),
	embed: /* @__PURE__ */ Vr(/* @__PURE__ */ Or())
}), qr = /* @__PURE__ */ Mr(Kr, { reminder: /* @__PURE__ */ Vr(Gr) }), Jr = /* @__PURE__ */ q({ error: /* @__PURE__ */ K() });
(/* @__PURE__ */ K()).check(/* @__PURE__ */ Sr("https://"), /* @__PURE__ */ br(1e3)), (/* @__PURE__ */ K()).check(/* @__PURE__ */ xr(1)), (/* @__PURE__ */ K()).check(/* @__PURE__ */ xr(1)), (/* @__PURE__ */ K()).check(/* @__PURE__ */ xr(1)), (/* @__PURE__ */ K()).check(/* @__PURE__ */ Sr("m"));
var Yr = /* @__PURE__ */ K(), Xr = /* @__PURE__ */ Er(), Zr = /* @__PURE__ */ Ir("t", [
	/* @__PURE__ */ q({
		t: /* @__PURE__ */ J("msg"),
		thread: /* @__PURE__ */ K(),
		text: /* @__PURE__ */ Vr(/* @__PURE__ */ K()),
		files: /* @__PURE__ */ Vr(/* @__PURE__ */ Ar(/* @__PURE__ */ K())),
		reply_to: /* @__PURE__ */ Vr(/* @__PURE__ */ Ur(Xr))
	}),
	/* @__PURE__ */ q({ t: /* @__PURE__ */ J("files.get") }),
	/* @__PURE__ */ q({
		t: /* @__PURE__ */ J("doc.get"),
		epic: /* @__PURE__ */ Vr(/* @__PURE__ */ Ur(/* @__PURE__ */ K()))
	}),
	/* @__PURE__ */ q({
		t: /* @__PURE__ */ J("doc"),
		text: /* @__PURE__ */ K(),
		epic: /* @__PURE__ */ Vr(/* @__PURE__ */ Ur(/* @__PURE__ */ K()))
	}),
	/* @__PURE__ */ q({
		t: /* @__PURE__ */ J("title"),
		title: /* @__PURE__ */ K()
	}),
	/* @__PURE__ */ q({
		t: /* @__PURE__ */ J("epic"),
		title: /* @__PURE__ */ K()
	}),
	/* @__PURE__ */ q({
		t: /* @__PURE__ */ J("epic.owner"),
		id: Yr,
		owner: /* @__PURE__ */ K()
	}),
	/* @__PURE__ */ q({
		t: /* @__PURE__ */ J("task.add"),
		epic: /* @__PURE__ */ K(),
		title: /* @__PURE__ */ K()
	}),
	/* @__PURE__ */ q({
		t: /* @__PURE__ */ J("older"),
		thread: /* @__PURE__ */ K(),
		before: /* @__PURE__ */ Vr(Xr)
	}),
	/* @__PURE__ */ q({
		t: /* @__PURE__ */ J("pin.add"),
		kind: /* @__PURE__ */ Rr([
			"link",
			"file",
			"app"
		]),
		ref: /* @__PURE__ */ K(),
		title: /* @__PURE__ */ Vr(/* @__PURE__ */ K())
	}),
	/* @__PURE__ */ q({
		t: /* @__PURE__ */ J("pin.del"),
		id: Yr
	}),
	/* @__PURE__ */ q({
		t: /* @__PURE__ */ J("reminder.delete"),
		id: Yr
	}),
	/* @__PURE__ */ q({
		t: /* @__PURE__ */ J("ack.dismiss"),
		id: Xr
	}),
	/* @__PURE__ */ q({
		t: /* @__PURE__ */ J("reminder.enable"),
		id: Yr,
		on: /* @__PURE__ */ Or()
	}),
	/* @__PURE__ */ q({
		t: /* @__PURE__ */ J("task.toggle"),
		id: Yr
	}),
	/* @__PURE__ */ q({
		t: /* @__PURE__ */ J("task.status"),
		id: Yr,
		status: /* @__PURE__ */ Rr(Je)
	}),
	/* @__PURE__ */ q({
		t: /* @__PURE__ */ J("task.rename"),
		id: Yr,
		title: /* @__PURE__ */ K()
	}),
	/* @__PURE__ */ q({
		t: /* @__PURE__ */ J("task.del"),
		id: Yr
	}),
	/* @__PURE__ */ q({
		t: /* @__PURE__ */ J("task.assign"),
		id: Yr,
		owner: /* @__PURE__ */ Vr(/* @__PURE__ */ K()),
		due: /* @__PURE__ */ Vr(/* @__PURE__ */ K())
	}),
	/* @__PURE__ */ q({
		t: /* @__PURE__ */ J("decision.del"),
		id: Xr
	}),
	/* @__PURE__ */ q({
		t: /* @__PURE__ */ J("epic.rename"),
		id: Yr,
		title: /* @__PURE__ */ K()
	}),
	/* @__PURE__ */ q({
		t: /* @__PURE__ */ J("epic.del"),
		id: Yr
	}),
	/* @__PURE__ */ q({
		t: /* @__PURE__ */ J("epic.archive"),
		id: Yr,
		archived: /* @__PURE__ */ Vr(/* @__PURE__ */ Or())
	}),
	/* @__PURE__ */ q({
		t: /* @__PURE__ */ J("epic.order"),
		ids: /* @__PURE__ */ Ar(/* @__PURE__ */ K())
	}),
	/* @__PURE__ */ q({
		t: /* @__PURE__ */ J("poll.create"),
		thread: /* @__PURE__ */ K(),
		question: /* @__PURE__ */ K(),
		options: /* @__PURE__ */ Ar(/* @__PURE__ */ K()),
		multi: /* @__PURE__ */ Or()
	}),
	/* @__PURE__ */ q({
		t: /* @__PURE__ */ J("vote"),
		id: Yr,
		opt: Xr
	}),
	/* @__PURE__ */ q({
		t: /* @__PURE__ */ J("poll.close"),
		id: Yr
	}),
	/* @__PURE__ */ q({
		t: /* @__PURE__ */ J("suggestion"),
		i: Xr,
		accept: /* @__PURE__ */ Vr(/* @__PURE__ */ Or())
	})
]), Qr = (/* @__PURE__ */ K()).check(/* @__PURE__ */ xr(1), /* @__PURE__ */ br(64)), $r = /* @__PURE__ */ Pr([/* @__PURE__ */ q({
	t: /* @__PURE__ */ J("result"),
	cid: Qr,
	ok: /* @__PURE__ */ J(!0)
}), /* @__PURE__ */ q({
	t: /* @__PURE__ */ J("result"),
	cid: Qr,
	ok: /* @__PURE__ */ J(!1),
	error: /* @__PURE__ */ K()
})]), ei = (e) => typeof e == "object" && !!e && !Array.isArray(e), Y = (e) => typeof e == "string", X = (e) => typeof e == "number" && Number.isFinite(e), ti = (e) => typeof e == "boolean", Z = (e) => (t) => t === null || e(t), Q = (e) => (t) => Array.isArray(t) && t.every(e), ni = (e) => (t) => ei(t) && Object.values(t).every(e), ri = Q(Y), ii = ((...e) => (t) => typeof t == "string" && e.includes(t))(...Je), $ = (e, t = {}) => (n) => ei(n) && Object.entries(e).every(([e, t]) => t(n[e])) && Object.entries(t).every(([e, t]) => n[e] === void 0 || t(n[e])), ai = (e) => $({
	id: Y,
	name: Y,
	type: Y,
	size: X,
	author: Y,
	ts: X
}, { embed: ti })(e), oi = $({
	id: Y,
	title: Y,
	done: ti,
	status: ii
}, {
	owner: Z(Y),
	due: Z(Y),
	flags: ri,
	epic_id: Y
}), si = (e) => oi(e), ci = $({
	id: Y,
	title: Y,
	tasks: Q(si)
}, {
	archived: ti,
	kept: ti,
	owner: Z(Y),
	from_msg: Z(X),
	parent: Z(Y),
	flags: ri,
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
}), li = (e) => ci(e), ui = $({
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
	files: Q(ai),
	quiet: ti,
	cut: ti,
	for_who: Z(Y)
}), di = (e) => ui(e), fi = $({
	msg_id: X,
	email: Y,
	who: Y,
	status: Y,
	ts: X
}, {
	agent: Y,
	note: Z(Y)
}), pi = (e) => fi(e), mi = $({
	id: Y,
	text: Y,
	owner: Y,
	enabled: ti
}, {
	name: Z(Y),
	error: Z(Y),
	every: Z(Y),
	cron: Z(Y),
	next_at: Z(X),
	thread: Y,
	tz: Y,
	file_id: Z(Y)
}), hi = (e) => mi(e), gi = $({
	title: Y,
	owner: Y
}, {
	summary: Z(Y),
	folder: Z(Y)
}), _i = (e) => gi(e), vi = $({
	title: Y,
	tasks: ri
}, { why: Y }), yi = (e) => vi(e), bi = $({
	id: X,
	text: Y,
	who: Y,
	kind: Y,
	ts: X
}), xi = (e) => bi(e), Si = $({
	id: Y,
	kind: Y,
	ref: Y
}, {
	title: Y,
	author: Y,
	ts: X
}), Ci = (e) => Si(e), wi = $({
	id: Y,
	question: Y,
	options: ri,
	multi: ti,
	closed: ti,
	author: Y,
	votes: Q(ri)
}), Ti = (e) => wi(e), Ei = $({
	email: Y,
	ts: X
}, { name: Z(Y) }), Di = $({
	email: Y,
	who: Y,
	read: X,
	delivered: X
}, {
	agent: Y,
	ts: X
}), Oi = $({ text: Y }, {
	epic: Z(Y),
	stale: (e) => e === !1,
	fetched: ti,
	by: Y
}), ki = $({
	epic: Y,
	stale: (e) => e === !0
}, { by: Y }), Ai = {
	state: $({
		me: Y,
		book: _i,
		messages: Q(di),
		epics: Q(li),
		members: ri,
		online: ri,
		suggestions: Q(yi)
	}, {
		roomTasks: Q(si),
		names: ni(Y),
		avatars: ni(X),
		pending: ri,
		requests: Q(Ei),
		files: Q(ai),
		filesN: X,
		filesAll: ti,
		reminders: Q(hi),
		acks: Q(pi),
		receipts: Q(Di),
		counts: ni(X),
		countsAt: X,
		full: ri,
		complete: ti,
		origins: Q(di),
		docs: ni(Y),
		doc: Y,
		docNotes: ri,
		decisions: Q(xi),
		pins: Q(Ci),
		polls: ni(Ti)
	}),
	msg: $({ m: di }),
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
	epics: $({ epics: Q(li) }, { roomTasks: Q(si) }),
	epicsPatch: $({
		changed: Q(li),
		order: ri
	}, { roomTasks: Q(si) }),
	doc: (e) => ei(e) && (e.stale === !0 ? ki(e) && e.text === void 0 && e.fetched === void 0 : Oi(e)),
	docNotes: $({ notes: ri }),
	meta: $({}, {
		title: Y,
		folder: Y,
		summary: Y
	}),
	suggestions: $({ suggestions: Q(yi) }),
	requests: $({ requests: Q(Ei) }),
	members: $({ members: ri }, {
		pending: ri,
		requests: Q(Ei),
		names: ni(Y),
		avatars: ni(X)
	}),
	files: $({ files: Q(ai) }),
	fileAdd: $({ file: ai }),
	reminders: $({ reminders: Q(hi) }),
	decisions: $({ decisions: Q(xi) }),
	pins: $({ pins: Q(Ci) }),
	receipts: $({ receipts: Q(Di) }),
	older: $({
		messages: Q(di),
		thread: Y,
		more: ti
	}),
	acks: $({ acks: Q(pi) }),
	ackRows: $({ acks: Q(pi) }),
	poll: $({ poll: Ti }),
	online: $({ online: ri }),
	conns: $({}),
	error: $({}, { error: Y }),
	blocked: $({
		text: Y,
		reason: Y
	}),
	result: (e) => $r.safeParse(e).success
};
function ji(e) {
	return !ei(e) || typeof e.t != "string" || !Object.hasOwn(Ai, e.t) ? !1 : Ai[e.t](e);
}
function Mi(e) {
	if (!ei(e)) return e;
	let t = (e, t) => ei(e) && (e[t] === 0 || e[t] === 1) ? {
		...e,
		[t]: e[t] === 1
	} : e, n = (e) => Array.isArray(e) ? e.map((e) => t(e, "done")) : e, r = (e) => Array.isArray(e) ? e.map((e) => ei(e) ? {
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
function Ni(e) {
	let t = Mi(JSON.parse(e));
	if (!ji(t)) throw TypeError("Invalid room event");
	return t;
}
function Pi(e) {
	return Zr.safeParse(e).success;
}
// node_modules/hono/dist/client/utils.js
var Fi = (e, t) => (e = e.replace(/\/+$/, ""), e += "/", t = t.replace(/^\/+/, ""), e + t), Ii = (e, t) => {
	for (let [n, r] of Object.entries(t)) {
		let t = RegExp("/:" + n + "(?:{[^/]+})?\\??(?=/|$)");
		e = e.replace(t, () => r ? `/${r}` : "");
	}
	return e;
}, Li = (e) => {
	let t = new URLSearchParams();
	for (let [n, r] of Object.entries(e)) if (r !== void 0) {
		if (Array.isArray(r)) for (let e of r) e !== void 0 && t.append(n, e);
		else t.set(n, r);
	}
	return t;
}, Ri = (e, t) => {
	switch (t) {
		case "ws": return e.replace(/^http/, "ws");
		case "http": return e.replace(/^ws/, "http");
	}
}, zi = (e) => /^https?:\/\/[^\/]+?\/index(?=\?|$)/.test(e) ? e.replace(/\/index(?=\?|$)/, "/") : e.replace(/\/index(?=\?|$)/, "");
function Bi(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function Vi(e, t) {
	if (!Bi(e) && !Bi(t)) return t;
	let n = { ...e };
	for (let e in t) {
		let r = t[e];
		n[e] = Bi(n[e]) && Bi(r) ? Vi(n[e], r) : r;
	}
	return n;
}
// node_modules/hono/dist/utils/cookie.js
var Hi = /^[\w!#$%&'*.^`|~+-]+$/, Ui = (e, t, n = {}) => {
	if (!Hi.test(e)) throw Error("Invalid cookie name");
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
}, Wi = (e, t, n) => (t = encodeURIComponent(t), Ui(e, t, n)), Gi = (e, t) => new Proxy(() => {}, {
	get(n, r) {
		if (typeof r == "string" && r !== "then") return Gi(e, [...t, r]);
	},
	apply(n, r, i) {
		return e({
			path: t,
			args: i
		});
	}
}), Ki = (e, t) => {
	let n = t.toString();
	return n ? `${e}?${n}` : e;
}, qi = class {
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
			for (let [n, r] of Object.entries(e.cookie)) r !== void 0 && t.push(Wi(n, r));
			t.length > 0 && (r.Cookie = t.join("; "));
		}
		this.cType && (r["Content-Type"] = this.cType);
		let i = new Headers();
		for (let [e, t] of Object.entries(r)) t !== void 0 && i.set(e, t);
		let a = this.url;
		a = zi(a), a = Ii(a, this.pathParams), this.queryParams && (a = Ki(a, this.queryParams)), n = this.method.toUpperCase();
		let o = n !== "GET" && n !== "HEAD";
		return (t?.fetch || fetch)(a, {
			body: o ? this.rBody : void 0,
			method: n,
			headers: i,
			...t?.init
		});
	};
}, Ji = (e, t) => Gi(function n(r) {
	let i = t?.buildSearchParams ?? Li, a = [...r.path], o = a.slice(-3).reverse();
	if (o[0] === "toString") return o[1] === "name" ? o[2] || "" : n.toString();
	if (o[0] === "valueOf") return o[1] === "name" ? o[2] || "" : n;
	let s = "";
	if (/^\$/.test(o[0])) {
		let e = a.pop();
		e && (s = e.replace(/^\$/, ""));
	}
	let c = Fi(e, a.join("/"));
	if (s === "url" || s === "path") {
		let t = zi(c);
		return r.args[0] && (r.args[0].param && (t = Ii(t, r.args[0].param)), r.args[0].query && (t = Ki(t, i(r.args[0].query)))), s === "url" ? new URL(t) : t.slice(e.replace(/\/+$/, "").length).replace(/^\/?/, "/");
	}
	if (s === "ws") {
		let e = zi(c), n = Ri(r.args[0]?.param ? Ii(e, r.args[0].param) : e, "ws"), a = new URL(n), o = r.args[0]?.query;
		return o && i(o).forEach((e, t) => {
			a.searchParams.append(t, e);
		}), ((...e) => t?.webSocket !== void 0 && typeof t.webSocket == "function" ? t.webSocket(...e) : new WebSocket(...e))(a.toString());
	}
	let l = new qi(c, s, { buildSearchParams: i });
	if (s) {
		t ??= {};
		let e = { ...r.args[1] }, n = t.headers, i = e.headers;
		n && i && (e.headers = async () => ({
			...typeof n == "function" ? await n() : n,
			...typeof i == "function" ? await i() : i
		}));
		let a = Vi(t, e);
		return l.fetch(r.args[0], a);
	}
	return l;
}, []), Yi = (e = "/", t) => Ji(e, t ? { fetch: t } : {});
// svelte/transport.ts
function Xi(e, t, n) {
	if (!Pi(t)) throw TypeError("Invalid room command");
	return !e || e.readyState !== 1 ? !1 : (e.send(JSON.stringify(n ? {
		...t,
		cid: n
	} : t)), !0);
}
function Zi(e) {
	if (typeof e != "string") throw TypeError("Room events must be JSON text");
	return Ni(e);
}
async function Qi(e) {
	try {
		return await e.json();
	} catch (t) {
		throw e.ok ? t : Error(`HTTP ${e.status}`);
	}
}
function $i(e, t) {
	let n = Jr.safeParse(t);
	return Error(n.success ? n.data.error : `HTTP ${e.status}`);
}
function ea(e, t = fetch) {
	let n = Yi("/", t).api.books[":id"], r = encodeURIComponent(e);
	return {
		async postMessage(e) {
			let t = await n.post.$post({
				param: { id: r },
				json: e
			}), i = await Qi(t);
			if (t.ok || t.status === 400) {
				let e = Wr.safeParse(i);
				if (e.success) return e.data;
				if (t.ok) throw TypeError("Invalid post response");
			}
			throw $i(t, i);
		},
		async uploadFile(e) {
			let t = await n.files.$post({
				param: { id: r },
				header: {
					"content-type": e.type,
					"x-filename": encodeURIComponent(e.name)
				}
			}, { init: { body: e.body } }), i = await Qi(t);
			if (!t.ok) throw $i(t, i);
			let a = qr.safeParse(i);
			if (!a.success) throw TypeError(Kr.safeParse(i).success ? "Invalid reminder response" : "Invalid upload response");
			return a.data;
		}
	};
}
// svelte/Reminders.svelte
var ta = a("<button class=\"primary\" id=\"remNew\"><!> </button>"), na = a("<form class=\"remForm\" id=\"remForm\"><input name=\"name\" maxlength=\"60\" required=\"\"/> <textarea name=\"text\" required=\"\"></textarea> <div class=\"row\"><span class=\"err\" id=\"remErr\"> </span><button type=\"button\" class=\"ghost\" id=\"remCancel\"> </button><button class=\"primary\" id=\"remSave\"> </button></div></form>"), ra = a("<span class=\"err\"> </span>"), ia = a("<pre class=\"remText\"> </pre>"), aa = a("<button class=\"ghost\"></button>"), oa = a("<div><div class=\"remBody\" role=\"button\" tabindex=\"0\"><b><!> </b> <small><!> </small> <!><!></div> <!> <label class=\"sw\"><input type=\"checkbox\"/> </label> <button class=\"ghost\"></button></div>"), sa = a("<div class=\"empty\"> </div>"), ca = a("<div class=\"remHead\"><p></p> <!></div> <!> <!> <!>", 1);
function la(e, t) {
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
			let e = await ea(t.room.id).uploadFile({
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
	var x = ca(), S = T(x), D = r(S);
	M(D, () => t.vb.t("Cada lembrete é um arquivo <code>reminders/&lt;nome&gt;.md</code>: o texto diz quando rodar e o que fazer. Na hora, o @vibe posta o texto aqui e o agent de quem salvou faz."), !0), L(D);
	var A = w(D, 2), ee = (e) => {
		var n = ta(), a = r(n);
		M(a, () => t.vb.icon("plus", 14));
		var o = w(a);
		L(n), h((e) => i(o, ` ${e ?? ""}`), [() => t.vb.t("Novo lembrete")]), z("click", n, () => p({
			name: "",
			text: ""
		})), C(e, n);
	};
	W(A, (e) => {
		v(n) || e(ee);
	}), L(S);
	var N = w(S, 2), P = (e) => {
		var s = na(), u = r(s);
		ce(u);
		var d = w(u, 2);
		O(d);
		var f = w(d, 2), p = r(f), m = l(p, !0), _ = w(p), b = l(_, !0), x = w(_), S = l(x, !0);
		L(f), L(s), h((e, t, r, s) => {
			H(u, "placeholder", e), u.readOnly = v(n).fixed, H(d, "placeholder", t), i(m, v(a)), i(b, r), x.disabled = v(o), i(S, s);
		}, [
			() => t.vb.t("nome, ex.: relatorio-diario"),
			() => t.vb.t("Diga quando e o quê. Ex.: Todo dia às 8h: puxe os números de ontem e poste aqui o que mudou."),
			() => t.vb.t("Cancelar"),
			() => t.vb.t("Salvar")
		]), g("submit", s, y), ye(u, () => v(n).name, (e) => v(n).name = e), ye(d, () => v(n).text, (e) => v(n).text = e), z("click", _, () => c(n, null)), C(e, s);
	};
	W(N, (e) => {
		v(n) && e(P);
	});
	var F = w(N, 2);
	U(F, 17, () => v(u), (e) => e.id, (e, n) => {
		var a = oa();
		let o;
		var c = r(a), u = r(c), d = r(u);
		M(d, () => t.vb.icon(v(s).includes(v(n).id) ? "chevronDown" : "chevronRight", 13));
		var m = w(d);
		L(u);
		var g = w(u, 2), y = r(g), b = (e) => {
			var r = B();
			h((e) => i(r, `${(v(n).every || v(n).cron || "") ?? ""}${e ?? ""} ·`), [() => v(n).enabled && v(n).next_at ? ` · ${t.vb.t("próximo {when}", { when: f(v(n).next_at) })}` : ""]), C(e, r);
		};
		W(y, (e) => {
			v(n).error || e(b);
		});
		var x = w(y, 1, !0);
		L(g);
		var S = w(g, 2), T = (e) => {
			var t = ra(), r = l(t);
			h(() => i(r, `⚠ ${v(n).error ?? ""}`)), C(e, t);
		};
		W(S, (e) => {
			v(n).error && e(T);
		});
		var E = w(S), D = (e) => {
			var t = ia(), r = l(t, !0);
			h(() => i(r, v(n).text)), C(e, t);
		}, O = k(() => v(s).includes(v(n).id));
		W(E, (e) => {
			v(O) && e(D);
		}), L(c);
		var A = w(c, 2), j = (e) => {
			var r = aa();
			M(r, () => t.vb.icon("pencil", 14), !0), L(r), h((e, t) => {
				H(r, "data-rem-edit", v(n).id), H(r, "title", e), H(r, "aria-label", t);
			}, [() => t.vb.t("Editar"), () => t.vb.t("Editar")]), z("click", r, () => p({
				name: v(n).name,
				text: v(n).text,
				fixed: !0
			})), C(e, r);
		};
		W(A, (e) => {
			v(n).name && e(j);
		});
		var ee = w(A, 2), N = r(ee);
		ce(N);
		var P = w(N, 1, !0);
		L(ee);
		var F = w(ee, 2);
		M(F, () => t.vb.icon("x"), !0), L(F), L(a), h((e, t, r, s, l, u, d) => {
			o = re(a, 1, "rem", null, o, {
				bad: !!v(n).error,
				off: !v(n).enabled,
				open: e
			}), H(c, "data-rem-open", v(n).id), H(c, "title", t), i(m, ` ${(v(n).name ? `${v(n).name}.md` : v(n).text) ?? ""}`), i(x, r), H(ee, "title", s), H(N, "data-rem-on", v(n).id), I(N, v(n).enabled), N.disabled = !!v(n).error, i(P, l), H(F, "data-rem-del", v(n).id), H(F, "title", u), H(F, "aria-label", d);
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
		}), z("change", N, (e) => t.send({
			t: "reminder.enable",
			id: v(n).id,
			on: e.currentTarget.checked
		})), z("click", F, () => {
			confirm(t.vb.t("Apagar este lembrete?")) && t.send({
				t: "reminder.delete",
				id: v(n).id
			});
		}), C(e, a);
	});
	var te = w(F, 2), R = (e) => {
		var n = sa(), r = l(n, !0);
		h((e) => i(r, e), [() => t.vb.t("Nenhum lembrete ainda. Clique em Novo lembrete, ou peça pro seu agent: “todo dia às 8h, me manda o resumo do que mudou”.")]), C(e, n);
	};
	W(te, (e) => {
		!v(u).length && !v(n) && e(R);
	}), C(e, x), j();
}
n([
	"click",
	"keydown",
	"change"
]);
// svelte/features/navigation/model.ts
function ua(e) {
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
function da(e, t) {
	let n = [], r = e.parents.get(t);
	for (; r;) n.push(r), r = e.parents.get(r);
	return n;
}
function fa(e, t, n = /* @__PURE__ */ new Set(), r = !1) {
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
function pa(e, t) {
	let n = /* @__PURE__ */ new Map();
	for (let e of t) n.set(e.thread, Math.max(n.get(e.thread) ?? 0, e.id));
	return e.filter((e) => e.archived).map((e, t) => ({
		epic: e,
		index: t
	})).sort((e, t) => (n.get(t.epic.id) ?? 0) - (n.get(e.epic.id) ?? 0) || t.index - e.index).map(({ epic: e }) => e);
}
function ma(e, t, n, r) {
	if (t === n || new Set(e.map((e) => e.id)).size !== e.length) return null;
	let i = ua(e.filter((e) => !e.archived));
	if (!i.byId.has(t) || !i.byId.has(n) || i.parents.get(t) !== i.parents.get(n)) return null;
	let a = e.map((e) => e.id).filter((e) => e !== t);
	return a.splice(a.indexOf(n) + +!!r, 0, t), a.every((t, n) => t === e[n]?.id) ? null : a;
}
// svelte/features/navigation/session.ts
function ha() {
	try {
		return localStorage;
	} catch {
		return null;
	}
}
function ga(e, t) {
	try {
		let n = JSON.parse(t?.getItem(`vb.tree.${e}`) ?? "[]");
		if (Array.isArray(n) && n.every((e) => typeof e == "string")) return new Set(n);
	} catch {}
	return /* @__PURE__ */ new Set();
}
function _a(e, t) {
	try {
		e.storage?.setItem(`vb.tree.${e.roomId}`, JSON.stringify([...t]));
	} catch {}
}
function va(e, t = !1, n = ha()) {
	return {
		roomId: e,
		storage: n,
		state: _e({
			draft: "",
			closed: ga(e, n),
			openedFor: null,
			archived: t
		})
	};
}
function ya(e, t, n) {
	let r = de(e.state);
	if (!t.byId.has(n) && n !== "main" && !n.startsWith("pre:") || r.openedFor === n) return;
	let i = new Set(r.closed);
	for (let e of da(t, n)) i.delete(e);
	_a(e, i), e.state.set({
		...r,
		closed: i,
		openedFor: n
	});
}
function ba(e, t) {
	e.state.update((n) => {
		let r = new Set(n.closed);
		return r.has(t) ? r.delete(t) : r.add(t), _a(e, r), {
			...n,
			closed: r
		};
	});
}
function xa(e, t, n, r = !1) {
	let i = e?.roomId === t.id ? e : va(t.id, r);
	return ya(i, ua(t.epics), n), i;
}
// svelte/features/navigation/EpicTree.svelte
var Sa = a("<span aria-hidden=\"true\" class=\"tw:w-8 tw:shrink-0\"></span>"), Ca = a("<span class=\"tw:sr-only\"> </span>"), wa = a("<span role=\"img\" class=\"tw:text-primary\">✻</span>"), Ta = a("<span> </span>"), Ea = a("<span class=\"tw:shrink-0 tw:text-xs tw:text-muted-foreground\"> </span>"), Da = a("<!> <span class=\"tw:min-w-0 tw:flex-1 tw:break-words\" data-epic-title=\"\"> <!></span> <!> <!> <!> <!>", 1), Oa = a("<div class=\"tw:flex tw:flex-wrap tw:gap-2\"><!><!></div>"), ka = a("<li><div role=\"group\"><!> <!></div> <details class=\"tw:ml-8 tw:text-xs tw:text-muted-foreground\"><summary class=\"tw:cursor-pointer tw:rounded-control tw:px-2 tw:py-1 tw:focus-visible:outline-2 tw:focus-visible:outline-ring\"> </summary> <div class=\"tw:space-y-2 tw:p-2\"><!> <!> <!></div></details></li>"), Aa = a(" <span class=\"tw:text-xs tw:text-muted-foreground\"> </span>", 1), ja = a("<form id=\"newEpic\" class=\"tw:space-y-2\"><!> <div class=\"tw:flex tw:gap-2\"><!><!></div></form> <!>", 1), Ma = a("<ul class=\"tw:m-0 tw:list-none tw:space-y-1 tw:p-0\"></ul> <!>", 1), Na = a("<p role=\"alert\" class=\"tw:m-0 tw:text-sm tw:text-destructive\"> </p>"), Pa = a("<section data-vb-native=\"\" class=\"tw:m-0 tw:box-border tw:space-y-3 tw:rounded-surface tw:bg-sidebar tw:p-3 tw:font-sans tw:text-sm tw:leading-5 tw:text-sidebar-foreground\"><!> <p role=\"status\" aria-live=\"polite\" class=\"tw:sr-only\"> </p> <!></section>");
function Fa(n, a) {
	let f = _();
	b(a, !0);
	let y = () => R(v(D), "$navigation", S), [S, E] = e(), D = k(() => a.session.state), O = m(""), A = m(null), M = m(null), N = m(!1), P = m(null), F = !1, I = /* @__PURE__ */ new Map(), ne = 0, ie = m(null), ae = m("");
	d(() => {
		F = !0, ne++, I.clear();
	});
	let oe = [
		"tw:pl-0",
		"tw:pl-2",
		"tw:pl-4",
		"tw:pl-6",
		"tw:pl-8",
		"tw:pl-10",
		"tw:pl-12"
	], z = k(() => a.room.epics.filter((e) => !e.archived)), ce = k(() => pa(a.room.epics, a.room.messages)), V = k(() => y().archived && v(ce).length > 0 ? "archived" : "active"), de = k(() => ua(v(V) === "archived" ? v(ce) : v(z))), pe = k(() => ua(a.room.epics)), _e = k(() => new Set(a.room.epics.filter((e) => a.vb.epicBusy(e)).map((e) => e.id))), ve = k(() => fa(v(de), y().closed, v(_e), !0)), ye = k(() => new Map(v(ve).map((e, t) => [e.epic.id, `${f}-row-${t}`])));
	x(() => {
		ya(a.session, v(pe), a.thread);
	});
	function be(e) {
		if (F) return;
		ne++, c(ie, null);
		let t = e === "archived";
		v(D).update((e) => ({
			...e,
			archived: t
		})), a.onarchchange(t), c(A, null), c(M, null), c(O, "");
	}
	function we(e) {
		if (F || a.session.roomId !== a.room.id) return !1;
		c(O, "");
		try {
			if (a.send(e)) return !0;
		} catch {}
		return c(O, a.vb.t("Não deu pra enviar agora. Tente de novo."), !0), !1;
	}
	function Ee(e) {
		if (e.preventDefault(), F) return;
		let t = y().draft.trim();
		if (!t) return v(P)?.focus();
		we({
			t: "epic",
			title: t
		}) && Se(v(D), u(y).draft = "", u(y));
	}
	function De(e) {
		let t = v(de).parents.get(e);
		return t ? v(de).children.get(t) ?? [] : v(de).roots;
	}
	function Oe(e, t) {
		let n = De(e);
		return n[n.findIndex((t) => t.id === e) + t];
	}
	function ke(e, t, n) {
		let r = ma(a.room.epics, e, t, n);
		if (!r || F) return;
		c(ie, null);
		let i = ++ne, o = document.activeElement, s = o instanceof HTMLElement && I.get(e)?.contains(o) ? o : null;
		we({
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
	function Ae(e, t) {
		return I.set(t, e), { destroy() {
			I.get(t) === e && I.delete(t);
		} };
	}
	x(() => {
		let e = v(ie);
		if (!e) return;
		if (e.thread !== a.thread || v(V) !== "active") {
			c(ie, null), ne++;
			return;
		}
		let t = a.room.epics.map((e) => e.id);
		if (!t.includes(e.from)) {
			c(ie, null), je(e);
			return;
		}
		let n = new Set(t), r = new Set(e.ids), i = e.ids.filter((e) => n.has(e)), o = t.filter((e) => r.has(e));
		o.length !== i.length || o.some((e, t) => e !== i[t]) || (c(ie, null), c(ae, a.vb.t("Ordem dos épicos atualizada."), !0), je(e));
	});
	function je(e) {
		let t = e.anchor;
		if (!t) return;
		let n = () => document.activeElement === document.body || document.activeElement === t;
		n() && s().then(() => {
			if (F || e.generation !== ne || !n() || document.activeElement === t && !t.matches(":disabled")) return;
			let r = I.get(e.from);
			r?.hidden || (r?.querySelector("[data-epic-thread]") ?? v(P))?.focus({ preventScroll: !0 });
		});
	}
	function Me(e, t) {
		let n = Oe(e, t);
		v(V) === "active" && n && ke(e, n.id, t === 1);
	}
	function Ne(e, t) {
		if (v(V) !== "active" || !e.dataTransfer) return e.preventDefault();
		e.dataTransfer.setData("text/vb-epic", t), e.dataTransfer.effectAllowed = "move", c(A, t, !0);
	}
	function Pe(e, t) {
		return v(V) === "active" && v(A) !== t && e.dataTransfer?.types.includes("text/vb-epic");
	}
	function Fe(e, t) {
		if (!Pe(e, t)) return;
		e.preventDefault();
		let n = e.currentTarget instanceof HTMLElement ? e.currentTarget.getBoundingClientRect() : null;
		c(M, t, !0), c(N, !!n && e.clientY >= n.top + n.height / 2, !0);
	}
	function Ie(e, t) {
		let n = v(N);
		if (c(M, null), !Pe(e, t)) return;
		e.preventDefault();
		let r = e.dataTransfer?.getData("text/vb-epic");
		r && ke(r, t, n), c(A, null);
	}
	var Le = Pa(), Re = r(Le);
	{
		let e = (e, n = xe) => {
			var s = o(), d = T(s), m = (e) => {
				var o = Ma(), s = T(o);
				U(s, 21, () => v(ve), (e) => e.epic.id, (e, o) => {
					let s = k(() => v(o).epic), u = k(() => y().closed.has(v(s).id)), d = k(() => v(de).byId.get(v(de).parents.get(v(s).id) ?? "")), f = k(() => a.vb.epicBusy(v(s)));
					var m = ka(), _ = r(m), b = r(_), x = (e) => {
						{
							let t = k(() => v(u) ? "chevronRight" : "chevronDown"), n = k(() => `${a.vb.t(v(u) ? "Abrir galho" : "Fechar galho")}: ${v(s).title}`), r = k(() => !v(u)), i = k(() => (v(de).children.get(v(s).id) ?? []).map((e) => v(ye).get(e.id)).join(" "));
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
								onclick: () => ba(a.session, v(s).id)
							});
						}
					}, S = (e) => {
						var t = Sa();
						C(e, t);
					};
					W(b, (e) => {
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
								a.thread === v(s).id && v(o).hasChildren ? ba(a.session, v(s).id) : a.onopen(v(s).id);
							},
							children: (e, n) => {
								var c = Da(), m = T(c);
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
									var t = Ca(), n = l(t);
									h((e) => i(n, `· ${e ?? ""}`), [() => a.vb.t("Subépico de {title}", { title: v(d).title })]), C(e, t);
								};
								W(y, (e) => {
									v(d) && e(b);
								}), L(g);
								var x = w(g, 2), S = (e) => {
									var t = wa();
									h((e) => H(t, "aria-label", e), [() => v(f) ? a.vb.t("{who} está trabalhando", { who: v(f) }) : a.vb.t("Trabalho em um subépico")]), C(e, t);
								};
								W(x, (e) => {
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
								W(E, (e) => {
									v(O) && e(D);
								});
								var A = w(E, 2), j = (e) => {
									var t = Ta(), n = l(t, !0);
									h((e) => {
										H(t, "title", e), i(n, v(s).prod.stage === "verified" ? "✓✓" : "🚀");
									}, [() => a.vb.t(v(s).prod.stage === "verified" ? "Verificado em prod" : "No ar, falta verificar em prod")]), C(e, t);
								};
								W(A, (e) => {
									v(s).prod && e(j);
								});
								var M = w(A, 2), ee = (e) => {
									var t = Ea(), n = l(t);
									h((e) => i(n, `${e ?? ""}/${v(s).tasks.length ?? ""}`), [() => v(s).tasks.filter((e) => e.done).length]), C(e, t);
								};
								W(M, (e) => {
									v(s).tasks.length && e(ee);
								}), h(() => i(_, v(s).title)), C(e, c);
							},
							$$slots: { default: !0 }
						});
					}
					L(_);
					var D = w(_, 2), O = r(D), j = l(O), P = w(O, 2), F = r(P);
					{
						let e = k(() => `${v(ye).get(v(s).id)}-owner`);
						ue(F, {
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
					var I = w(F, 2);
					{
						let e = k(() => `${v(ye).get(v(s).id)}-owner`), t = k(() => `${a.vb.t("Dono do épico")}: ${v(s).title}`), n = k(() => v(s).owner ?? ""), r = k(() => [{
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
							onValueChange: (e) => (we({
								t: "epic.owner",
								id: v(s).id,
								owner: e
							}), !1)
						});
					}
					var R = w(I, 2), ne = (e) => {
						var n = Oa(), o = r(n);
						{
							let e = k(() => !Oe(v(s).id, -1)), n = k(() => `${a.vb.t("Mover para cima")}: ${v(s).title}`);
							te(o, {
								variant: "outline",
								size: "sm",
								get disabled() {
									return v(e);
								},
								get "aria-label"() {
									return v(n);
								},
								onclick: () => Me(v(s).id, -1),
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
							let e = k(() => !Oe(v(s).id, 1)), n = k(() => `${a.vb.t("Mover para baixo")}: ${v(s).title}`);
							te(c, {
								variant: "outline",
								size: "sm",
								get disabled() {
									return v(e);
								},
								get "aria-label"() {
									return v(n);
								},
								onclick: () => Me(v(s).id, 1),
								children: (e, n) => {
									t();
									var r = B();
									h((e) => i(r, e), [() => a.vb.t("Mover para baixo")]), C(e, r);
								},
								$$slots: { default: !0 }
							});
						}
						L(n), C(e, n);
					};
					W(R, (e) => {
						n() === "active" && e(ne);
					}), L(P), L(D), L(m), le(m, (e, t) => Ae?.(e, t), () => v(s).id), h((e, t, r, a) => {
						H(m, "id", e), H(m, "hidden", v(o).hidden), H(m, "data-epic", v(s).id), H(m, "data-depth", v(o).depth), re(m, 1, t), H(_, "aria-label", v(s).title), H(_, "draggable", n() === "active"), re(_, 1, r), i(j, `${a ?? ""}: ${v(s).title ?? ""}`);
					}, [
						() => v(ye).get(v(s).id),
						() => me(oe[Math.min(v(o).depth, oe.length - 1)]),
						() => me(he("tw:flex tw:items-center tw:gap-1 tw:rounded-control tw:border tw:border-transparent", a.thread === v(s).id && "tw:bg-sidebar-accent tw:text-sidebar-accent-foreground", v(M) === v(s).id && (v(N) ? "tw:border-b-primary" : "tw:border-t-primary"), v(A) === v(s).id && "tw:opacity-50")),
						() => a.vb.t("Ações do épico")
					]), g("dragstart", _, (e) => Ne(e, v(s).id)), g("dragend", _, () => {
						c(A, null), c(M, null);
					}), g("dragover", _, (e) => Fe(e, v(s).id)), g("dragleave", _, () => {
						v(M) === v(s).id && c(M, null);
					}), g("drop", _, (e) => Ie(e, v(s).id)), C(e, m);
				}), L(s);
				var d = w(s, 2), m = (e) => {
					var n = ja(), o = T(n), s = r(o);
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
					var d = w(s, 2), p = r(d), m = () => F ? "" : y().draft, _ = (e) => {
						F || Se(v(D), u(y).draft = e, u(y));
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
						Ce(b, {
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
					U(x, 17, () => a.room.suggestions, Te, (e, n, r) => {
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
									var o = Aa(), s = T(o, !0), c = w(s), u = l(c, !0);
									h((e) => {
										i(s, v(n).title), i(u, e);
									}, [() => a.vb.t("sugestão do @vibe, clique para ver")]), C(e, o);
								},
								$$slots: { default: !0 }
							});
						}
					}), g("submit", o, Ee), C(e, n);
				};
				W(d, (e) => {
					n() === "active" && e(m);
				}), h((e) => H(s, "aria-label", e), [() => n() === "archived" ? a.vb.t("Arquivados") : a.vb.t("Épicos")]), C(e, o);
			};
			W(d, (e) => {
				n() === v(V) && e(m);
			}), C(e, s);
		}, n = k(() => [{
			value: "active",
			label: `${a.vb.t("Épicos")} · ${v(z).length}`
		}, {
			value: "archived",
			label: `${a.vb.t("Arquivados")} · ${v(ce).length}`,
			disabled: v(ce).length === 0
		}]), s = k(() => a.vb.t("Épicos"));
		se(Re, {
			get items() {
				return v(n);
			},
			get label() {
				return v(s);
			},
			get value() {
				return v(V);
			},
			onValueChange: be,
			children: e,
			$$slots: { default: !0 }
		});
	}
	var ze = w(Re, 2), Be = l(ze, !0), Ve = w(ze, 2), He = (e) => {
		var t = Na(), n = l(t, !0);
		h(() => i(n, v(O))), C(e, t);
	};
	W(Ve, (e) => {
		v(O) && e(He);
	}), L(Le), h((e) => {
		H(Le, "aria-label", e), i(Be, v(ae));
	}, [() => a.vb.t("Épicos")]), C(n, Le), j(), E();
}
// svelte/Sidebar.svelte
var Ia = a("<div class=\"fnCol\"><span class=\"fnRow\"><span class=\"fn\"> </span><span class=\"pendTag\"> </span></span> <small class=\"memActs\"><button type=\"button\" class=\"ghost resend\"> </button> · <button type=\"button\" class=\"ghost resend\"> </button></small></div>"), La = a("<span class=\"fn\"> </span>"), Ra = a("<div class=\"fnCol\"><span class=\"fn\"> </span><small class=\"memActs\"> </small></div>"), za = a("<button type=\"button\" class=\"ghost x\"></button>"), Ba = a("<div class=\"member\"><!> <!> <!></div> <!>", 1), Va = a("<button type=\"button\" class=\"iconBtn phOnly\" id=\"sideArch\"></button> <button type=\"button\" class=\"iconBtn phOnly\" id=\"sideDel\"></button>", 1), Ha = a("<span class=\"rowEdit phOnly\" role=\"button\" tabindex=\"0\" id=\"sideRename\"><!> </span>"), Ua = a("<div class=\"member reqRow\"><!> <div class=\"fnCol\"><span class=\"fn\"> </span><small class=\"memActs\"> <button type=\"button\" class=\"ghost resend okAsk\" data-ok=\"1\"> </button></small></div> <button type=\"button\" class=\"ghost x\" data-ok=\"\"></button></div>"), Wa = a("<div class=\"asks\"><h4> </h4> <!></div>"), Ga = a("<details class=\"memMore\" data-fold=\"off\"><summary> </summary><!></details>"), Ka = a("<button type=\"button\" class=\"friendAdd\"><!><span class=\"fn\"> </span><b></b></button>"), qa = a("<details class=\"memMore\" data-fold=\"friends\"><summary> </summary> <!></details>"), Ja = a("<option></option>"), Ya = a("<button type=\"button\" class=\"sheetGrab\"><i></i></button> <!> <div class=\"sideHead\"><div class=\"sideTop\"><a data-nav=\"\" href=\"/app\" class=\"muted\"><!> vibebooks</a> <!> <button type=\"button\" class=\"iconBtn\" id=\"railToggle\" aria-expanded=\"true\"></button></div></div> <div class=\"sec threadsSec\"><button type=\"button\" data-thread=\"main\"><!><span class=\"rt\"> </span> <!> <!><span class=\"n\"> </span></button> <!></div> <!> <div class=\"sec\"><!> <h4> </h4> <!> <!> <!> <!> <form class=\"row\" id=\"invite\" style=\"margin-top:8px\"><input type=\"email\" required=\"\" list=\"friendList\" autocomplete=\"off\"/><button></button></form> <datalist id=\"friendList\"></datalist></div>", 1);
function Xa(e, n) {
	b(n, !0);
	let a = (e, t = xe) => {
		var a = Ba(), o = T(a), s = r(o);
		M(s, () => n.vb.avatar(t(), n.room.online.includes(t())));
		var c = w(s, 2), u = (e) => {
			var a = Ia(), o = r(a), s = r(o), c = l(s, !0), u = w(s), d = l(u, !0);
			L(o);
			var f = w(o, 2), p = r(f), m = l(p, !0), g = w(p, 2), _ = l(g, !0);
			L(f), L(a), h((e, n, r, a, o, l, f) => {
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
			var r = La(), a = l(r, !0);
			h(() => {
				H(r, "title", t()), i(a, n.room.names[t()]);
			}), C(e, r);
		}, p = (e) => {
			var n = Ra(), a = r(n), o = l(a, !0), s = w(a), c = l(s);
			L(n), h((e, n) => {
				H(a, "title", t()), i(o, e), i(c, `@${n ?? ""}`);
			}, [() => t().split("@")[0], () => t().split("@")[1] ?? ""]), C(e, n);
		};
		W(c, (e) => {
			v(d) ? e(u) : n.room.names?.[t()] ? e(f, 1) : e(p, -1);
		});
		var m = w(c, 2), g = (e) => {
			var r = za();
			M(r, () => n.vb.icon("x"), !0), L(r), h((e, n) => {
				H(r, "data-remove", t()), H(r, "aria-label", e), H(r, "title", n);
			}, [() => n.vb.t("Remover {email}", { email: t() }), () => n.room.pending?.includes(t()) ? n.vb.t("Cancelar convite") : n.vb.t("Remover do vibebook")]), C(e, r);
		}, _ = k(() => t() !== n.room.book?.owner && (n.room.pending?.includes(t()) || n.room.me === n.room.book?.owner));
		W(m, (e) => {
			v(_) && e(g);
		}), L(o);
		var y = w(o, 2);
		M(y, () => n.vb.agentRows(t())), C(e, a);
	}, o = D(n, "foldOpen", 19, () => ({
		off: !1,
		friends: null
	})), s = D(n, "friends", 19, () => []), c = (e) => n.room.counts ? (n.room.counts[e] ?? 0) + n.room.messages.filter((t) => t.thread === e && t.id > (n.room.countsAt ?? 0)).length : n.room.messages.filter((t) => t.thread === e).length, u = k(() => n.room.epics.find((e) => e.id === n.thread)), d = k(() => n.room.members.filter((e) => e === n.room.me || n.room.online.includes(e))), f = k(() => n.room.members.filter((e) => !v(d).includes(e))), p = k(() => s().filter((e) => !n.room.members.includes(e)));
	var m = Ya(), g = T(m), _ = w(g, 2);
	M(_, () => n.vb.roomStrip());
	var y = w(_, 2), x = r(y), S = r(x), E = r(S);
	M(E, () => n.vb.icon("back")), t(), L(S);
	var O = w(S, 2), A = (e) => {
		var t = Va(), r = T(t);
		M(r, () => n.vb.icon(v(u).archived ? "undo" : "check", 18), !0), L(r);
		var i = w(r, 2);
		M(i, () => n.vb.icon("trash", 18), !0), L(i), h((e, t, n, a) => {
			H(r, "title", e), H(r, "aria-label", t), H(i, "title", n), H(i, "aria-label", a);
		}, [
			() => v(u).archived ? n.vb.t("Desarquivar épico") : n.vb.t("Arquivar épico (concluído)"),
			() => v(u).archived ? n.vb.t("Desarquivar épico") : n.vb.t("Arquivar épico"),
			() => n.vb.t("Apagar épico"),
			() => n.vb.t("Apagar épico")
		]), C(e, t);
	};
	W(O, (e) => {
		v(u) && e(A);
	});
	var ee = w(O, 2);
	M(ee, () => n.vb.icon("sidebar", 20), !0), L(ee), L(x), L(y);
	var N = w(y, 2), P = r(N);
	let F;
	var te = r(P);
	M(te, () => n.vb.roomMark("ri roomIco"));
	var I = w(te), R = l(I, !0), ne = w(I, 2), ie = (e) => {
		var t = Ha(), a = r(t);
		M(a, () => n.vb.icon("pencil", 13));
		var o = w(a);
		L(t), h((e, n) => {
			H(t, "title", e), i(o, ` ${n ?? ""}`);
		}, [() => n.vb.t("Renomear"), () => n.vb.t("editar")]), C(e, t);
	}, ae = k(() => !n.thread.startsWith("pre:"));
	W(ne, (e) => {
		v(ae) && e(ie);
	});
	var oe = w(ne, 2);
	M(oe, () => n.vb.waitPill("main"));
	var z = w(oe), B = l(z, !0);
	L(P);
	var se = w(P, 2);
	{
		let e = k(() => ({
			t: n.vb.t,
			name: n.vb.name,
			epicBusy: n.vb.epicBusy,
			waitCount: (e) => n.vb.waitsIn(e).length
		}));
		Fa(se, {
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
	var ce = w(N, 2);
	M(ce, () => n.vb.pinsSec());
	var le = w(ce, 2), ue = r(le), V = (e) => {
		var t = Wa(), a = r(t), o = l(a, !0), s = w(a, 2);
		U(s, 17, () => n.room.requests, (e) => e.email, (e, t) => {
			var a = Ua(), o = r(a);
			M(o, () => n.vb.avatar(v(t).email));
			var s = w(o, 2), c = r(s), u = l(c, !0), d = w(c), f = r(d), p = w(f), m = l(p, !0);
			L(d), L(s);
			var g = w(s, 2);
			M(g, () => n.vb.icon("x"), !0), L(g), L(a), h((e, n, r, a, o, s, l) => {
				H(c, "title", e), i(u, n), i(f, `${r ?? ""} · `), H(p, "data-ask", v(t).email), H(p, "title", a), i(m, o), H(g, "data-ask", v(t).email), H(g, "aria-label", s), H(g, "title", l);
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
	W(ue, (e) => {
		n.room.requests?.length && e(V);
	});
	var de = w(ue, 2), fe = l(de, !0), pe = w(de, 2);
	M(pe, () => n.vb.sbxRows());
	var me = w(pe, 2);
	U(me, 16, () => v(d), (e) => e, (e, t) => {
		a(e, () => t);
	});
	var he = w(me, 2), ge = (e) => {
		var t = Ga(), s = r(t), c = l(s, !0), u = w(s);
		U(u, 16, () => v(f), (e) => e, (e, t) => {
			a(e, () => t);
		}), L(t), h((e) => {
			t.open = o().off, i(c, e);
		}, [() => n.vb.t("{n} offline", { n: v(f).length })]), C(e, t);
	};
	W(he, (e) => {
		v(f).length && e(ge);
	});
	var _e = w(he, 2), ve = (e) => {
		var t = qa(), a = r(t), s = l(a), c = w(a, 2);
		U(c, 16, () => v(p), (e) => e, (e, t) => {
			var a = Ka(), o = r(a);
			M(o, () => n.vb.avatar(t));
			var s = w(o), c = l(s, !0), u = w(s);
			M(u, () => n.vb.icon("plus"), !0), L(u), L(a), h((e, n) => {
				H(a, "data-add", t), H(a, "title", e), i(c, n);
			}, [() => n.vb.t("Adicionar {email}", { email: t }), () => n.vb.name(t)]), C(e, a);
		}), L(t), h((e) => {
			t.open = o().friends ?? n.room.members.length <= 1, i(s, `${e ?? ""} · ${v(p).length ?? ""}`);
		}, [() => n.vb.t("Seus amigos")]), C(e, t);
	};
	W(_e, (e) => {
		v(p).length && e(ve);
	});
	var ye = w(_e, 2), be = r(ye), Se = w(be);
	M(Se, () => n.vb.icon("plus"), !0), L(Se), L(ye);
	var Ce = w(ye, 2);
	U(Ce, 21, () => v(p), Te, (e, t) => {
		var n = Ja(), r = {};
		h(() => {
			r !== (r = v(t)) && (n.value = (n.__value = r) ?? "");
		}), C(e, n);
	}), L(Ce), L(le), h((e, t, r, a, o, s, c, l, u, d) => {
		H(g, "aria-label", e), H(ee, "title", t), H(ee, "aria-label", r), F = re(P, 1, "thread", null, F, {
			sel: n.thread === "main",
			waiting: a
		}), H(P, "title", o), i(R, s), i(B, c), i(fe, l), H(be, "placeholder", u), H(Se, "aria-label", d);
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
var Za = a("<span class=\"gut\"> </span>"), Qa = a(" <span class=\"agentTag\">agent</span>", 1), $a = a("<span class=\"doneTag\"> </span>"), eo = a("<div><!> <!> <span class=\"mact\"><button type=\"button\" class=\"rbtn\"><!> </button> <button type=\"button\" class=\"rbtn\"><!> </button> <button type=\"button\" class=\"rbtn\"><!> </button></span> <div class=\"body\"><!> <div class=\"who\"><!> <!> <span class=\"hhmm\"> </span></div> <div class=\"txt\"></div> <!> <!> <!> <!> <!></div></div>");
function to(e, t) {
	b(t, !0);
	let n = D(t, "origin", 3, !1), a = k(() => t.vb.continues(t.previous, t.message)), s = k(() => t.message.tag === "reminder" ? t.vb.remHtml(t.message, n()) : t.message.tag === "issue" ? t.vb.issueHtml(t.message) : t.vb.isNotice(t.message) ? t.vb.noticeHtml(t.message) : null), c = k(() => n() && v(s) ? v(s).replace(/\sid="m\d+"/, "") : v(s)), u = k(() => !t.message.text && t.typing ? `<span class="typing">${t.vb.esc(t.vb.typingNote?.(t.message.id) || t.vb.t("pensando ({mode})", { mode: t.vb.typingLabel?.(t.typing) ?? t.typing }))}…</span>` : t.message.author === "ai" ? t.message.text ? t.vb.mentions(t.vb.md(t.message.text)) : t.message.poll ? "" : `<span class="typing">${t.vb.t("pensando…")}</span>` : t.message.text ? t.vb.mentions(t.message.kind === "agent" ? t.vb.md(t.message.text) : t.vb.linkify(t.vb.esc(t.message.text))) : ""), d = k(() => t.vb.dateTime?.(t.message.ts) ?? new Date(t.message.ts).toLocaleString());
	var f = o(), p = T(f), m = (e) => {
		var t = o(), n = T(t);
		M(n, () => v(c)), C(e, t);
	}, g = (e) => {
		var s = eo();
		let c;
		var f = r(s);
		M(f, () => t.message.kind === "agent" ? t.vb.agentAvatar(t.message.author, t.message.via) : t.vb.avatar(t.message.author));
		var p = w(f, 2), m = (e) => {
			var n = Za(), r = l(n, !0);
			h((e) => {
				H(n, "title", v(d)), i(r, e);
			}, [() => t.vb.hhmm(t.message.ts)]), C(e, n);
		};
		W(p, (e) => {
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
		W(j, (e) => {
			t.message.reply_to && e(ee);
		});
		var N = w(j, 2), P = r(N), F = (e) => {
			var n = Qa(), r = T(n), a = w(r);
			h((e, t) => {
				i(r, `${e ?? ""} `), H(a, "title", t);
			}, [() => t.vb.t("{via} de {who}", {
				via: t.message.via || "agent",
				who: t.vb.name(t.message.author)
			}), () => t.vb.t("Escrito pelo agent dessa pessoa, em nome dela")]), C(e, n);
		}, te = (e) => {
			var n = B();
			h((e) => i(n, e), [() => t.vb.name(t.message.author)]), C(e, n);
		};
		W(P, (e) => {
			t.message.kind === "agent" ? e(F) : e(te, -1);
		});
		var I = w(P, 2), R = (e) => {
			var n = $a(), r = l(n);
			h((e, t) => {
				H(n, "title", e), i(r, `✓ ${t ?? ""}`);
			}, [() => t.vb.t("Reporta algo entregue"), () => t.vb.t("entregue")]), C(e, n);
		};
		W(I, (e) => {
			t.message.tag === "done" && e(R);
		});
		var ne = w(I), ie = w(ne), ae = l(ie, !0);
		L(N);
		var oe = w(N, 2);
		M(oe, () => v(u), !0), L(oe);
		var z = w(oe, 2);
		M(z, () => t.vb.attHtml(t.message.files));
		var se = w(z, 2), ce = (e) => {
			var n = o(), r = T(n);
			M(r, () => t.vb.cardHtml(t.message)), C(e, n);
		};
		W(se, (e) => {
			t.message.card && e(ce);
		});
		var le = w(se, 2), ue = (e) => {
			var n = o(), r = T(n);
			M(r, () => t.vb.choiceHtml(t.message)), C(e, n);
		};
		W(le, (e) => {
			t.message.choices && e(ue);
		});
		var V = w(le, 2), de = (e) => {
			var n = o(), r = T(n);
			M(r, () => t.vb.pollHtml(t.message.poll)), C(e, n);
		};
		W(V, (e) => {
			t.message.poll && e(de);
		});
		var fe = w(V, 2), pe = (e) => {
			var n = o(), r = T(n);
			M(r, () => t.vb.threadCards(t.message.id)), C(e, n);
		};
		W(fe, (e) => {
			n() || e(pe);
		}), L(A), L(s), h((e, r, o, l, f, p, m, h, g, y, S, C) => {
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
	W(p, (e) => {
		v(c) === null ? e(g, -1) : e(m);
	}), C(e, f), j();
}
// svelte/Chat.svelte
var no = a("<div class=\"older\"><button type=\"button\" class=\"ghost\" id=\"olderBtn\"> </button></div>"), ro = a("<div class=\"origin\"><!> <div class=\"replies\"><span> </span><button type=\"button\" class=\"ghost\"> <!></button></div></div>"), io = a("<div><!></div>"), ao = a("<!> <!> <!>", 1);
function oo(e, t) {
	b(t, !0);
	let n = D(t, "more", 3, !1), a = D(t, "origin", 3, null), s = D(t, "replyCount", 3, 0);
	var c = o(), u = T(c);
	N(u, () => t.room.id + ":" + t.thread, (e) => {
		var c = ao(), u = T(c), d = (e) => {
			var n = no(), a = r(n), o = l(a, !0);
			L(n), h((e) => i(o, e), [() => t.vb.t("Carregar mensagens anteriores")]), z("click", a, function(...e) {
				t.onloadolder?.apply(this, e);
			}), C(e, n);
		};
		W(u, (e) => {
			t.list.length && n() && e(d);
		});
		var f = w(u, 2), p = (e) => {
			var n = ro(), o = r(n);
			to(o, {
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
				i(d, e), H(f, "data-gomain", a().id), i(p, `${t ?? ""} `);
			}, [() => s() === 1 ? t.vb.t("1 resposta") : t.vb.t("{n} respostas", { n: s() }), () => t.vb.t("ver na sala principal")]), C(e, n);
		};
		W(f, (e) => {
			a() && e(p);
		});
		var m = w(f, 2), g = (e) => {
			var n = o(), r = T(n);
			U(r, 19, () => t.list, (e) => e.id, (e, n, r) => {
				{
					let i = k(() => v(r) ? t.list[v(r) - 1] : t.previous);
					to(e, {
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
			var n = io();
			let s;
			var c = r(n), l = (e) => {
				var n = o(), r = T(n);
				M(r, () => t.vb.t("Comece a conversa. Os agents ligados nesta sala leem e respondem; o seu age com o seu OK. Ex.: <i>organiza o projeto em épicos: site novo, aluguéis e domínio</i>.")), C(e, n);
			}, u = (e) => {
				var n = B();
				h((e) => i(n, e), [() => t.vb.t("Discussão deste épico. Os agents leem as tarefas, o doc e a sala principal.")]), C(e, n);
			};
			W(c, (e) => {
				t.thread === "main" ? e(l) : e(u, -1);
			}), L(n), h(() => s = re(n, 1, "empty", null, s, { afterOrigin: !!a() })), C(e, n);
		};
		W(m, (e) => {
			t.list.length ? e(g) : e(_, -1);
		}), C(e, c);
	}), C(e, c), j();
}
n(["click"]);
// svelte/roomStore.ts
function so(e, t, n) {
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
function co() {
	let e = _e(null);
	return {
		subscribe: e.subscribe,
		get: () => de(e),
		replace: e.set,
		apply(t, n) {
			return e.update((e) => so(e, t, n)), de(e);
		}
	};
}
// svelte/main.ts
var lo = /* @__PURE__ */ De({
	createRoomStore: () => co,
	dismissDialogs: () => pe,
	mountInbox: () => po,
	mountView: () => fo
}), uo = {
	tasks: qe,
	board: ht,
	files: Et,
	reminders: la,
	sidebar: Xa,
	chat: oo
};
function fo(e, t, n) {
	let r = _e(n), i = uo[e], a = f(() => S(Oe, {
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
				we(a);
			});
		}
	};
}
function po(e, t) {
	let { waits: n, ...r } = t, i = _e(n), a = f(() => S(Fe, {
		target: e,
		props: {
			props: r,
			waits: i
		}
	}));
	return Object.assign(() => f(() => {
		we(a);
	}), { updateWaits(e) {
		f(() => i.set(e));
	} });
}
export { xa as a, Xi as c, co as i, ke as l, po as n, ea as o, fo as r, Zi as s, lo as t };
