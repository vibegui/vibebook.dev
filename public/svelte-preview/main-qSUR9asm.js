import { $t as e, At as t, B as n, Bt as r, Ct as i, Dt as a, Ft as o, G as s, Ht as c, It as l, J as u, Jt as d, K as f, Kt as p, Mt as m, Nt as h, Ot as g, Pt as _, Qt as v, Rt as y, St as b, Tt as x, U as S, Ut as C, Vt as w, W as T, Wt as E, Xt as D, Y as O, Yt as k, Zt as A, _t as ee, at as j, bt as M, ct as te, en as N, et as ne, ft as re, gt as P, ht as F, i as I, it as ie, kt as L, l as ae, lt as oe, n as se, nt as ce, o as le, ot as ue, pt as de, q as fe, qt as R, r as pe, rt as z, st as me, t as he, ut as B, vt as ge, wt as V, xt as H, yt as U, zt as W } from "./ErrorState-2N9Txw4c.js";
// \0rolldown/runtime.js
var _e = Object.defineProperty, ve = (e, t) => {
	let n = {};
	for (var r in e) _e(n, r, {
		get: e[r],
		enumerable: !0
	});
	return t || _e(n, Symbol.toStringTag, { value: "Module" }), n;
};
// svelte/View.svelte
function ye(e, t) {
	let n = () => fe(t.values, "$values", r), [r, a] = f();
	var o = V(), c = W(o);
	de(c, () => t.component, (e, t) => {
		t(e, s(n));
	}), i(e, o), a();
}
// shared/uiVariant.ts
function be(e, t, n) {
	let r = new URL(t), i = new URL(e, r);
	return i.origin !== r.origin || !/^\/(?:app|archived|login|b\/[a-z0-9]+)\/?$/.test(i.pathname) ? String(e) : (n === "svelte" ? i.searchParams.set("ui", "svelte") : i.searchParams.delete("ui"), i.pathname + i.search + i.hash);
}
// svelte/Inbox.svelte
var xe = x("<span class=\"tw:grid tw:size-8 tw:shrink-0 tw:place-items-center tw:rounded-full tw:border tw:border-border tw:bg-muted\"><!></span>"), Se = x("<li class=\"tw:flex tw:items-start tw:gap-2 tw:py-1\"><a class=\"tw:flex tw:min-w-0 tw:flex-1 tw:gap-3 tw:rounded-control tw:p-2 tw:text-foreground tw:no-underline tw:outline-none tw:hover:bg-accent tw:focus-visible:ring-2 tw:focus-visible:ring-ring\"><!> <span class=\"tw:flex tw:min-w-0 tw:flex-1 tw:flex-col tw:gap-1 tw:text-sm tw:leading-5 tw:[overflow-wrap:anywhere]\"><span class=\"tw:line-clamp-3\"><strong class=\"tw:font-semibold\"> </strong> </span> <span class=\"tw:text-xs tw:leading-4 tw:text-muted-foreground\"> </span></span></a> <!></li>"), Ce = x("<ul class=\"tw:m-0 tw:max-h-[60dvh] tw:min-h-0 tw:list-none tw:divide-y tw:divide-border tw:overflow-auto tw:overscroll-contain tw:p-0\"></ul>"), we = x("<!> <!>", 1);
function Te(e, t) {
	D(t, !0);
	let a = (e) => {
		var a = V(), s = W(a), c = (e) => {
			var a = Ce();
			P(a, 21, () => m(_), (e) => x(e), (e, a) => {
				var s = Se(), c = y(s), l = y(c), u = (e) => {
					var t = xe(), n = y(t);
					ae(n, { name: "check" }), v(t), i(e, t);
				}, f = R(() => T(m(a)) === "task"), p = (e) => {
					{
						let r = R(() => O(m(a))), i = R(() => t.avatarUrl?.(m(a).author));
						n(e, {
							get name() {
								return m(r);
							},
							get src() {
								return m(i);
							}
						});
					}
				};
				U(l, (e) => {
					m(f) ? e(u) : e(p, -1);
				});
				var h = w(l, 2), _ = y(h), b = y(_), S = r(b, !0), C = w(b);
				v(_);
				var E = w(_, 2), D = r(E);
				v(h), v(c);
				var k = w(c, 2), j = (e) => {
					{
						let n = R(() => t.vb.t("Já resolvi (respondi em outro lugar, ou não é comigo)")), r = R(() => m(d) === x(m(a))), i = R(() => m(d) !== null);
						I(e, {
							icon: "check",
							get label() {
								return m(n);
							},
							class: "tw:mt-1",
							get loading() {
								return m(r);
							},
							get disabled() {
								return m(i);
							},
							onclick: () => ee(m(a))
						});
					}
				}, M = R(() => m(a).ref.startsWith("m"));
				U(k, (e) => {
					m(M) && e(j);
				}), v(s), o((e, t, n, r) => {
					z(c, "href", e), H(S, t), H(C, ` ${m(a).text ?? ""}`), H(D, `${m(g) ? `${m(a).room} › ` : ""}${n ?? ""} · ${r ?? ""}`);
				}, [
					() => A(m(a)),
					() => T(m(a)) === "task" ? t.vb.t("Tarefa sua esperando OK:") : T(m(a)) === "agent" ? t.vb.t("Seu agent espera você:") : `${O(m(a)).split(" ")[0]}:`,
					() => m(a).topic || t.vb.t("sala principal"),
					() => t.vb.ago(m(a).ts)
				]), L("click", c, (e) => t.onopen(m(a), e)), i(e, s);
			}), v(a), i(e, a);
		}, l = (e) => {
			{
				let n = R(() => m(g) ? t.vb.t("Nada esperando você. ✓") : t.vb.t("Nada esperando você nesta sala. ✓"));
				se(e, { get title() {
					return m(n);
				} });
			}
		};
		U(s, (e) => {
			m(_).length ? e(c) : e(l, -1);
		}), i(e, a);
	}, s = S(t, "all", 3, !1), l = E(c(h(() => s() || !t.roomId ? "all" : "room"))), u = E(!0), d = E(null), f = E(""), p = R(() => t.waits.filter((e) => e.book_id === t.roomId)), g = R(() => m(l) === "all" || !t.roomId), _ = R(() => m(g) ? t.waits : m(p)), b = R(() => [{
		value: "room",
		label: `${t.vb.t("Esta sala")} (${m(p).length})`
	}, {
		value: "all",
		label: `${t.vb.t("Todas")} (${t.waits.length})`
	}]), x = (e) => `${e.book_id}:${e.ref}`, T = (e) => e.ref.startsWith("t") ? "task" : /^[ab]/.test(e.ref) ? "agent" : "ask", O = (e) => e.author_name || t.displayName?.(e.author) || e.author.split("@")[0];
	function A(e) {
		return be(`/b/${encodeURIComponent(e.book_id)}${e.thread === "main" ? "" : `?t=${encodeURIComponent(e.thread)}`}${/^[mab]/.test(e.ref) ? `#m${e.ref.slice(1)}` : ""}`, window.location.href, "svelte");
	}
	async function ee(e) {
		C(d, x(e), !0), C(f, "");
		try {
			await t.onresolve(e);
		} catch {
			C(f, t.vb.t("Não deu pra resolver agora. Tente de novo."), !0);
		} finally {
			C(d, null);
		}
	}
	{
		let n = (e) => {
			var n = we(), r = W(n), o = (e) => {
				he(e, {
					get title() {
						return m(f);
					},
					compact: !0
				});
			};
			U(r, (e) => {
				m(f) && e(o);
			});
			var s = w(r, 2), c = (e) => {
				{
					let n = (e) => {
						a(e);
					}, r = R(() => t.vb.t("Caixa de entrada"));
					pe(e, {
						get items() {
							return m(b);
						},
						get label() {
							return m(r);
						},
						onValueChange: (e) => t.ontab?.(e === "all"),
						get value() {
							return m(l);
						},
						set value(e) {
							C(l, e, !0);
						},
						children: n,
						$$slots: { default: !0 }
					});
				}
			}, u = (e) => {
				a(e);
			};
			U(s, (e) => {
				t.roomId ? e(c) : e(u, -1);
			}), i(e, n);
		}, r = R(() => t.vb.t("Caixa de entrada")), o = R(() => t.vb.t("Fechar"));
		le(e, {
			get title() {
				return m(r);
			},
			get closeLabel() {
				return m(o);
			},
			onOpenChange: (e) => {
				e || t.onclose();
			},
			get open() {
				return m(u);
			},
			set open(e) {
				C(u, e, !0);
			},
			children: n,
			$$slots: { default: !0 }
		});
	}
	k();
}
g(["click"]);
// svelte/InboxMount.svelte
function Ee(e, t) {
	let n = () => fe(t.waits, "$waits", r), [r, i] = f();
	Te(e, s(() => t.props, { get waits() {
		return n();
	} })), i();
}
// svelte/TaskList.svelte
function De(e) {
	e.focus(), e.select();
}
var Oe = x("<span class=\"vnote\"><!> </span>"), ke = x("<input class=\"tedit\"/>"), Ae = x("<span class=\"tt\" role=\"button\" tabindex=\"0\"> <!></span>"), je = x("<option> </option>"), Me = x("<div><input type=\"checkbox\"/> <!> <select><option> </option><!></select> <button type=\"button\"><!> </button> <button class=\"ghost x\"></button></div>"), Ne = x("<div class=\"thead\"><b> </b><small> </small><i><span></span></i></div> <!> <!> <form class=\"row\" id=\"newTask\" style=\"margin-top:6px\"><input/><button></button></form>", 1);
function Pe(e, n) {
	D(n, !0);
	let a = S(n, "waits", 19, () => []), s = R(() => n.room.epics.find((e) => e.id === n.thread) || (n.thread === "main" && n.room.roomTasks?.length ? {
		id: "main",
		tasks: n.room.roomTasks,
		flags: []
	} : null)), c = (e) => a().some((t) => t.book_id === n.room.id && t.ref === `t${e.id}`), l = R(() => (m(s)?.tasks || []).map((e, t) => ({
		tk: e,
		i: t
	})).sort((e, t) => (e.tk.done ? 2 : +!c(e.tk)) - (t.tk.done ? 2 : +!c(t.tk)) || e.i - t.i).map((e) => e.tk)), u = R(() => m(s)?.tasks.filter((e) => e.done).length || 0), d = E(null), f = E(""), p = E("");
	function h(e, t = !0) {
		m(d) === e.id && (C(d, null), t && m(f).trim() && m(f) !== e.title && n.send({
			t: "task.rename",
			id: e.id,
			title: m(f)
		}));
	}
	function g(e) {
		let t = prompt(n.vb.t("Prazo (ex.: sex, qua 23h, 06/11). Vazio tira o prazo:"), e.due || "");
		t !== null && n.send({
			t: "task.assign",
			id: e.id,
			due: t
		});
	}
	var b = V(), x = W(b), T = (e) => {
		var a = Ne(), b = W(a), x = y(b), S = r(x, !0), T = w(x), E = r(T), D = w(T), O = y(D);
		let k;
		v(D), v(b);
		var A = w(b, 2), j = (e) => {
			var t = Oe(), r = y(t);
			F(r, () => n.vb.icon("alert", 12));
			var a = w(r);
			v(t), o((e, n) => {
				z(t, "title", e), H(a, ` ${n ?? ""}`);
			}, [() => `@vibe: ${m(s).flags.join(" · ")}`, () => m(s).flags.join(" · ")]), i(e, t);
		};
		U(A, (e) => {
			m(s).flags?.length && e(j);
		});
		var M = w(A, 2);
		P(M, 17, () => m(l), (e) => e.id, (e, a) => {
			var s = Me();
			let l;
			var u = y(s);
			ce(u);
			var p = w(u, 2), b = (e) => {
				var n = ke();
				ce(n), _(() => ne(n, () => m(f), (e) => C(f, e))), re(n, (e) => De?.(e)), t("blur", n, () => h(m(a))), L("keydown", n, (e) => {
					e.key === "Enter" && h(m(a)), e.key === "Escape" && h(m(a), !1);
				}), i(e, n);
			}, x = (e) => {
				var t = Ae(), r = y(t, !0), s = w(r), c = (e) => {
					var t = Oe(), r = y(t);
					F(r, () => n.vb.icon("alert", 12));
					var s = w(r);
					v(t), o((e, n) => {
						z(t, "title", e), H(s, ` ${n ?? ""}`);
					}, [() => `@vibe: ${m(a).flags.join(" · ")}`, () => m(a).flags.join(" · ")]), i(e, t);
				};
				U(s, (e) => {
					m(a).flags?.length && e(c);
				}), v(t), o((e) => {
					z(t, "title", e), H(r, m(a).title);
				}, [() => n.vb.t("Clique para editar")]), L("click", t, () => {
					C(d, m(a).id, !0), C(f, m(a).title, !0);
				}), L("keydown", t, (e) => {
					e.key === "Enter" && (C(d, m(a).id, !0), C(f, m(a).title, !0));
				}), i(e, t);
			};
			U(p, (e) => {
				m(d) === m(a).id ? e(b) : e(x, -1);
			});
			var S = w(p, 2);
			let T;
			var E = y(S), D = r(E, !0);
			E.value = E.__value = "";
			var O = w(E);
			P(O, 17, () => n.room.members || [], ee, (e, t) => {
				var a = je(), s = r(a, !0), c = {};
				o((e) => {
					H(s, e), c !== (c = m(t)) && (a.value = (a.__value = c) ?? "");
				}, [() => m(t) === n.room.me ? n.vb.t("você") : n.vb.name(m(t))]), i(e, a);
			}), v(S);
			var k;
			me(S);
			var A = w(S, 2);
			let j;
			var M = y(A);
			F(M, () => n.vb.icon("calendar", 13));
			var N = w(M, 1, !0);
			v(A);
			var I = w(A, 2);
			F(I, () => n.vb.icon("x"), !0), v(I), v(s), o((e, t, r, i, o, c, d) => {
				l = B(s, 1, "task", null, l, {
					done: m(a).done,
					mine: !m(a).done && m(a).owner === n.room.me,
					waitTask: e
				}), z(s, "data-task", m(a).id), ie(u, m(a).done), z(u, "aria-label", t), T = B(S, 1, "towner", null, T, { set: !!m(a).owner }), z(S, "data-owner", m(a).id), z(S, "aria-label", r), H(D, i), k !== (k = m(a).owner || "") && (S.value = (S.__value = k) ?? "", te(S, k)), j = B(A, 1, "due", null, j, { set: !!m(a).due }), z(A, "data-due", m(a).id), z(A, "title", o), H(N, m(a).due ? ` ${m(a).due}` : ""), z(I, "data-tdel", m(a).id), z(I, "aria-label", c), z(I, "title", d);
			}, [
				() => c(m(a)),
				() => n.vb.t("Feita"),
				() => n.vb.t("Responsável"),
				() => n.vb.t("sem dono"),
				() => n.vb.t("Prazo"),
				() => n.vb.t("Apagar task"),
				() => n.vb.t("Apagar task")
			]), L("change", u, () => n.send({
				t: "task.toggle",
				id: m(a).id
			})), L("change", S, (e) => n.send({
				t: "task.assign",
				id: m(a).id,
				owner: e.currentTarget.value
			})), L("click", A, () => g(m(a))), L("click", I, () => n.send({
				t: "task.del",
				id: m(a).id
			})), i(e, s);
		});
		var N = w(M, 2), I = y(N);
		ce(I);
		var ae = w(I);
		F(ae, () => n.vb.icon("plus"), !0), v(ae), v(N), o((e, t, n, r) => {
			H(S, e), H(E, `${m(u) ?? ""}/${m(s).tasks.length ?? ""}`), k = oe(O, "", k, { width: t }), z(I, "placeholder", n), z(ae, "aria-label", r);
		}, [
			() => n.vb.t("Tarefas"),
			() => `${m(s).tasks.length ? Math.round(m(u) / m(s).tasks.length * 100) : 0}%`,
			() => n.vb.t("nova task"),
			() => n.vb.t("Nova tarefa")
		]), t("submit", N, (e) => {
			e.preventDefault(), m(p).trim() && n.send({
				t: "task.add",
				epic: n.thread,
				title: m(p)
			}), C(p, "");
		}), ne(I, () => m(p), (e) => C(p, e)), i(e, a);
	};
	U(x, (e) => {
		m(s) && e(T);
	}), i(e, b), k();
}
g([
	"change",
	"keydown",
	"click"
]);
// svelte/Tasks.svelte
var Fe = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy"
]);
function Ie(e, t) {
	D(t, !0);
	let n = T(t, Fe);
	var r = V(), a = W(r);
	ge(a, () => JSON.stringify([t.room.id, t.thread]), (e) => {
		Pe(e, s(() => n));
	}), i(e, r), k();
}
// svelte/panels.ts
var Le = (e) => String(e ?? "").replace(/[&<>"']/g, (e) => ({
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	"\"": "&quot;",
	"'": "&#39;"
})[e]), Re = (e) => e.type.startsWith("image/") ? "img" : e.type.startsWith("audio/") ? "audio" : e.type === "text/html" ? "html" : e.type === "application/pdf" ? "pdf" : /\.md$/i.test(e.name) || e.type === "text/markdown" ? "md" : e.type === "text/plain" || e.type === "text/csv" ? "txt" : "other", ze = (e) => e > 1e6 ? `${(e / 1e6).toFixed(1)} MB` : `${Math.max(1, Math.round(e / 1e3))} KB`, Be = x("<button type=\"button\"><span class=\"kt\"> </span><!><span> </span></button>"), Ve = x("<section><h3 class=\"mine\"> </h3> <!></section>"), He = x("<section><h3><span class=\"ri\"> </span> </h3> <!></section>"), Ue = x("<div class=\"empty\"> </div>"), We = x("<div class=\"klist\"><!><!></div>"), Ge = x("<span class=\"vnote\"><!> </span>"), Ke = x("<!><span> </span>", 1), qe = x("<span><!> </span>"), Je = x("<div draggable=\"true\" tabindex=\"0\" role=\"button\"><div class=\"kt\"></div> <!> <div class=\"km\"><span class=\"kep\"> </span><!><!></div></div>"), Ye = x("<div class=\"kempty\"> </div>"), Xe = x("<input type=\"hidden\" name=\"epic\"/>"), Ze = x("<option> </option>"), Qe = x("<select name=\"epic\"></select>"), $e = x("<form class=\"kadd\"><input/><button></button><!></form>"), et = x("<section><h3> <span> </span></h3> <div class=\"cards\"></div> <!></section>"), tt = x("<div class=\"lanes\"></div>"), nt = x("<div class=\"kbar\"><span class=\"seg\"><button type=\"button\" data-mode=\"board\"><!> </button><button type=\"button\" data-mode=\"list\"> </button></span><small class=\"kScope\"> </small></div> <!>", 1);
function rt(n, a) {
	D(a, !0);
	let s = (t, n = e) => {
		var s = Be();
		let c;
		var l = y(s), u = r(l, !0), d = w(l), f = (e) => {
			var t = V(), r = W(t);
			F(r, () => a.vb.avatar(n().owner)), i(e, t);
		};
		U(d, (e) => {
			n().owner && e(f);
		});
		var p = w(d), m = r(p, !0);
		v(s), o((e) => {
			c = B(s, 1, "krow", null, c, { done: n().status === "done" }), z(s, "data-k", n().id), z(s, "data-epic", n().epic.id), H(u, n().title), B(p, 1, `kst ${n().status}`), H(m, e);
		}, [() => a.vb.t(S[n().status] || n().status)]), L("click", s, () => a.onopen?.(n().epic.id)), i(t, s);
	}, l = [
		["todo", "A fazer"],
		["doing", "Fazendo"],
		["review", "Esperando OK"],
		["done", "Feito"]
	], u = E(c((() => {
		try {
			return localStorage.getItem("vb.boardMode") || "board";
		} catch {
			return "board";
		}
	})())), d = E(""), f = E(""), p = E(null), h = R(() => a.thread !== "main" && !a.thread.startsWith("pre:") && a.room.epics.some((e) => e.id === a.thread) ? a.thread : null), g = R(() => a.room.epics.filter((e) => m(h) ? e.id === m(h) : !e.archived)), _ = R(() => m(g).flatMap((e) => e.tasks.map((t) => ({
		...t,
		epic: e
	})))), b = R(() => [...m(h) ? [] : [{
		id: "main",
		title: a.room.book?.title || "vibebook",
		tasks: a.room.roomTasks || []
	}], ...m(g)].map((e) => ({
		e,
		list: e.tasks.filter((e) => e.status !== "done").map((t) => ({
			...t,
			epic: e
		}))
	})).filter((e) => e.list.length)), x = R(() => m(b).flatMap((e) => e.list.filter((e) => e.owner === a.room.me))), S = {
		todo: "a fazer",
		doing: "fazendo",
		review: "esperando OK",
		done: "feito"
	}, T = (e, t) => a.send({
		t: "task.status",
		id: e,
		status: t
	});
	function O(e) {
		C(u, e, !0);
		try {
			localStorage.setItem("vb.boardMode", e);
		} catch {}
	}
	function A(e, t) {
		e.dataTransfer?.setData("text/plain", t), e.currentTarget.classList.add("dragging");
	}
	function M(e, t) {
		e.preventDefault(), C(p, null);
		let n = e.dataTransfer?.getData("text/plain");
		n && T(n, t);
	}
	function te(e, t) {
		let n = l.findIndex(([e]) => e === t.status);
		e.key === "ArrowRight" && n < l.length - 1 && (e.preventDefault(), T(t.id, l[n + 1][0])), e.key === "ArrowLeft" && n > 0 && (e.preventDefault(), T(t.id, l[n - 1][0])), e.key === "Enter" && a.onopen?.(t.epic.id);
	}
	var re = V(), I = W(re), ie = (e) => {
		var n = nt(), c = W(n), g = y(c), S = y(g);
		let T;
		var E = y(S);
		F(E, () => a.vb.icon("board", 14));
		var D = w(E);
		v(S);
		var k = w(S);
		let re;
		var I = r(k, !0);
		v(g);
		var ie = w(g), ae = r(ie, !0);
		v(c);
		var se = w(c, 2), le = (e) => {
			var t = We(), n = y(t), c = (e) => {
				var t = Ve(), n = y(t), c = r(n), l = w(n, 2);
				P(l, 17, () => m(x), (e) => e.id, (e, t) => {
					s(e, () => m(t));
				}), v(t), o((e) => H(c, `⏳ ${e ?? ""} · ${m(x).length ?? ""}`), [() => a.vb.t("Esperando você")]), i(e, t);
			};
			U(n, (e) => {
				m(x).length && e(c);
			});
			var l = w(n);
			P(l, 17, () => m(b), (e) => e.e.id, (e, t) => {
				var n = He(), c = y(n), l = y(c);
				let u;
				var d = r(l, !0), f = w(l);
				v(c);
				var p = w(c, 2);
				P(p, 17, () => m(t).list, (e) => e.id, (e, t) => {
					s(e, () => m(t));
				}), v(n), o((e, n) => {
					u = oe(l, "", u, { background: e }), H(d, n), H(f, `${m(t).e.title ?? ""} · ${m(t).list.length ?? ""}`);
				}, [() => a.vb.color(m(t).e.title), () => a.vb.initials(m(t).e.title)]), i(e, n);
			}, (e) => {
				var t = Ue(), n = r(t, !0);
				o((e) => H(n, e), [() => a.vb.t("Nenhuma tarefa aberta.")]), i(e, t);
			}), v(t), i(e, t);
		}, de = (e) => {
			var n = tt();
			P(n, 21, () => l, ee, (e, n) => {
				var s = R(() => N(m(n), 2));
				let c = () => m(s)[0], l = () => m(s)[1], u = R(() => m(_).filter((e) => e.status === c()));
				var g = et();
				let b;
				var x = y(g), S = y(x, !0), T = w(S), E = r(T, !0);
				v(x);
				var D = w(x, 2);
				P(D, 21, () => m(u), (e) => e.id, (e, n) => {
					var s = Je();
					let c;
					var l = y(s);
					F(l, () => a.vb.mentions?.(Le(m(n).title)) ?? Le(m(n).title), !0), v(l);
					var u = w(l, 2), d = (e) => {
						var t = Ge(), r = y(t);
						F(r, () => a.vb.icon("alert", 12));
						var s = w(r);
						v(t), o((e, n) => {
							z(t, "title", e), H(s, ` ${n ?? ""}`);
						}, [() => `@vibe: ${m(n).flags.join(" · ")}`, () => m(n).flags.join(" · ")]), i(e, t);
					};
					U(u, (e) => {
						m(n).flags?.length && e(d);
					});
					var f = w(u, 2), p = y(f);
					let h;
					var g = r(p, !0), _ = w(p), b = (e) => {
						var t = Ke(), s = W(t);
						F(s, () => a.vb.avatar(m(n).owner));
						var c = w(s), l = r(c, !0);
						o((e) => H(l, e), [() => m(n).owner === a.room.me ? a.vb.t("você") : a.vb.name(m(n).owner)]), i(e, t);
					};
					U(_, (e) => {
						m(n).owner && e(b);
					});
					var x = w(_), S = (e) => {
						var t = qe(), r = y(t);
						F(r, () => a.vb.icon("calendar", 12));
						var s = w(r);
						v(t), o(() => H(s, ` ${m(n).due ?? ""}`)), i(e, t);
					};
					U(x, (e) => {
						m(n).due && e(S);
					}), v(f), v(s), o((e, t) => {
						c = B(s, 1, "kcard", null, c, {
							done: m(n).status === "done",
							mine: m(n).status !== "done" && m(n).owner === a.room.me
						}), z(s, "data-k", m(n).id), z(s, "data-status", m(n).status), z(s, "data-epic", m(n).epic.id), z(s, "title", e), h = oe(p, "", h, { background: t }), H(g, m(n).epic.title);
					}, [() => a.vb.t("Arraste, ou use ← →. Clique pra abrir o épico."), () => a.vb.color(m(n).epic.title)]), t("dragstart", s, (e) => A(e, m(n).id)), t("dragend", s, (e) => e.currentTarget.classList.remove("dragging")), L("click", s, () => a.onopen?.(m(n).epic.id)), L("keydown", s, (e) => te(e, m(n))), i(e, s);
				}, (e) => {
					var t = Ye(), n = r(t, !0);
					o((e) => H(n, e), [() => a.vb.t(c() === "todo" ? "Nada a fazer." : "Arraste um card pra cá.")]), i(e, t);
				}), v(D);
				var O = w(D, 2), k = (e) => {
					var n = $e(), s = y(n);
					ce(s);
					var c = w(s);
					F(c, () => a.vb.icon("plus"), !0), v(c);
					var l = w(c), u = (e) => {
						var t = Xe();
						ce(t), o(() => j(t, m(h))), i(e, t);
					}, p = (e) => {
						var t = Qe();
						P(t, 21, () => a.room.epics, ee, (e, t) => {
							var n = Ze(), a = r(n, !0), s = {};
							o(() => {
								H(a, m(t).title), s !== (s = m(t).id) && (n.value = (n.__value = s) ?? "");
							}), i(e, n);
						}), v(t), me(t), o((e) => z(t, "aria-label", e), [() => a.vb.t("Épico")]), ue(t, () => m(f), (e) => C(f, e)), i(e, t);
					};
					U(l, (e) => {
						m(h) ? e(u) : e(p, -1);
					}), v(n), o((e, t, n) => {
						z(s, "placeholder", e), z(s, "aria-label", t), z(c, "aria-label", n);
					}, [
						() => a.vb.t("nova tarefa"),
						() => a.vb.t("Nova tarefa"),
						() => a.vb.t("Nova tarefa")
					]), t("submit", n, (e) => {
						e.preventDefault();
						let t = m(h) || m(f) || a.room.epics[0]?.id;
						m(d).trim() && t && a.send({
							t: "task.add",
							epic: t,
							title: m(d).trim()
						}), C(d, "");
					}), ne(s, () => m(d), (e) => C(d, e)), i(e, n);
				};
				U(O, (e) => {
					c() === "todo" && e(k);
				}), v(g), o((e, t) => {
					b = B(g, 1, "lane", null, b, { over: m(p) === c() }), z(g, "data-lane", c()), z(g, "aria-label", e), H(S, t), H(E, m(u).length);
				}, [() => a.vb.t(l()), () => a.vb.t(l())]), t("dragover", g, (e) => {
					e.preventDefault(), C(p, c(), !0);
				}), t("dragleave", g, () => C(p, null)), t("drop", g, (e) => M(e, c())), i(e, g);
			}), v(n), i(e, n);
		};
		U(se, (e) => {
			m(u) === "list" ? e(le) : e(de, -1);
		}), o((e, t, n) => {
			T = B(S, 1, "", null, T, { on: m(u) === "board" }), H(D, ` ${e ?? ""}`), re = B(k, 1, "", null, re, { on: m(u) === "list" }), H(I, t), H(ae, n);
		}, [
			() => a.vb.t("Quadro"),
			() => a.vb.t("Lista"),
			() => m(h) ? a.room.epics.find((e) => e.id === m(h))?.title : a.vb.t("Todos os épicos")
		]), L("click", S, () => O("board")), L("click", k, () => O("list")), i(e, n);
	}, ae = (e) => {
		var t = Ue(), n = r(t, !0);
		o((e) => H(n, e), [() => a.vb.t("Ainda não tem épico nem tarefa. Crie um épico na barra ao lado, ou peça pro seu agent organizar o projeto em épicos e tarefas.")]), i(e, t);
	};
	U(I, (e) => {
		a.room.epics.length ? e(ie) : e(ae, -1);
	}), i(n, re), k();
}
g(["click", "keydown"]);
// svelte/Files.svelte
var it = x("<button type=\"button\"> <small> </small></button>"), at = x("<div class=\"ftabs\"></div>"), ot = x("<div class=\"fcrumb\"><button type=\"button\" class=\"ghost\"> </button><b><!> </b></div>"), st = x("<button type=\"button\" class=\"ftile fdir\"><div class=\"thumb\"></div> <b> </b><small> </small></button>"), ct = x("<img loading=\"lazy\"/>"), lt = x("<a class=\"ftile\" target=\"_blank\" rel=\"noopener\"><div class=\"thumb\"><!></div> <b> </b><small> </small> <button type=\"button\" data-pin-kind=\"file\"></button></a>"), ut = x("<div class=\"empty\"> </div>"), dt = x("<!> <!> <div class=\"fgrid\"><!> <!></div> <!>", 1);
function ft(e, t) {
	D(t, !0);
	let n = [
		["all", "Tudo"],
		["img", "Imagens"],
		["md", "Markdown"],
		["txt", "Texto e CSV"],
		["html", "HTML"],
		["pdf", "PDF"],
		["audio", "Áudios"],
		["other", "Outros"]
	], a = E("all"), s = E(""), c = R(() => t.room.files || []), u = R(() => {
		let e = { all: m(c).length };
		for (let t of m(c)) {
			let n = Re(t);
			e[n] = (e[n] || 0) + 1;
		}
		return e;
	}), d = R(() => m(u)[m(a)] ? m(a) : "all"), f = R(() => m(c).filter((e) => m(d) === "all" || Re(e) === m(d))), p = (e) => e.name.includes("/") ? e.name.slice(0, e.name.lastIndexOf("/")) : "", h = R(() => m(s) && m(f).some((e) => p(e) === m(s) || p(e).startsWith(m(s) + "/")) ? m(s) : ""), g = R(() => m(h) ? m(h) + "/" : "");
	l(() => {
		m(u)[m(a)] || C(a, "all"), m(s) && m(h) !== m(s) && C(s, "");
	});
	function _(e, t) {
		C(s, t, !0);
		let n = e.currentTarget.closest("#filesPane");
		n && (n.scrollTop = 0);
	}
	let b = R(() => {
		let e = /* @__PURE__ */ new Map(), t = [];
		for (let n of m(f)) {
			let r = p(n);
			if (r === m(h)) t.push(n);
			else if (r.startsWith(m(g))) {
				let t = r.slice(m(g).length).split("/")[0];
				e.set(t, (e.get(t) || 0) + 1);
			}
		}
		let n = {};
		if (m(h)) for (let e of t) n[e.name] = (n[e.name] || 0) + 1;
		return {
			dirs: [...e].sort((e, t) => e[0].localeCompare(t[0])),
			list: m(h) ? t.filter((e, n) => t.findIndex((t) => t.name === e.name) === n) : t,
			versions: n
		};
	}), x = (e) => `/api/books/${t.room.id}/files/${e.id}`, S = (e) => t.room.pins?.find((t) => t.kind === "file" && t.ref === e.id);
	function T(e, n) {
		e.preventDefault(), e.stopPropagation();
		let r = S(n);
		t.send(r ? {
			t: "pin.del",
			id: r.id
		} : {
			t: "pin.add",
			kind: "file",
			ref: n.id
		});
	}
	var O = V(), A = W(O), j = (e) => {
		var s = dt(), c = W(s), l = (e) => {
			var s = at();
			P(s, 21, () => n.filter(([e]) => m(u)[e]), ee, (e, n) => {
				var s = R(() => N(m(n), 2));
				let c = () => m(s)[0], l = () => m(s)[1];
				var f = it();
				let p;
				var h = y(f), g = w(h), _ = r(g, !0);
				v(f), o((e) => {
					p = B(f, 1, "ftab", null, p, { on: c() === m(d) }), z(f, "data-fkind", c()), H(h, `${e ?? ""} `), H(_, m(u)[c()]);
				}, [() => t.vb.t(l())]), L("click", f, () => C(a, c(), !0)), i(e, f);
			}), v(s), i(e, s);
		};
		U(c, (e) => {
			m(u).all > 1 && e(l);
		});
		var f = w(c, 2), p = (e) => {
			var n = ot(), a = y(n), s = r(a), c = w(a), l = y(c);
			F(l, () => t.vb.icon("folder", 14));
			var u = w(l);
			v(c), v(n), o((e, t) => {
				z(a, "data-fdir", e), H(s, `← ${t ?? ""}`), H(u, ` ${m(h) ?? ""}/`);
			}, [() => m(h).includes("/") ? m(h).slice(0, m(h).lastIndexOf("/")) : "", () => t.vb.t("voltar")]), L("click", a, (e) => _(e, m(h).includes("/") ? m(h).slice(0, m(h).lastIndexOf("/")) : "")), i(e, n);
		};
		U(f, (e) => {
			m(h) && e(p);
		});
		var E = w(f, 2), D = y(E);
		P(D, 17, () => m(b).dirs, ee, (e, n) => {
			var a = R(() => N(m(n), 2));
			let s = () => m(a)[0], c = () => m(a)[1];
			var l = st(), u = y(l);
			F(u, () => t.vb.icon("folder", 34), !0), v(u);
			var d = w(u, 2), f = r(d), p = w(d), h = r(p, !0);
			v(l), o((e) => {
				z(l, "data-fdir", m(g) + s()), H(f, `${s() ?? ""}/`), H(h, e);
			}, [() => c() === 1 ? t.vb.t("1 arquivo") : t.vb.t("{n} arquivos", { n: c() })]), L("click", l, (e) => _(e, m(g) + s())), i(e, l);
		});
		var O = w(D, 2);
		P(O, 17, () => m(b).list, (e) => e.id, (e, n) => {
			var a = lt(), s = y(a), c = y(s), l = (e) => {
				var t = ct();
				o((e) => {
					z(t, "src", e), z(t, "alt", m(n).name);
				}, [() => x(m(n))]), i(e, t);
			}, u = R(() => m(n).type.startsWith("image/")), d = (e) => {
				var r = V(), a = W(r);
				F(a, () => t.vb.icon(m(n).type === "text/html" ? "globe" : m(n).type.startsWith("audio/") ? "mic" : "file", 30)), i(e, r);
			};
			U(c, (e) => {
				m(u) ? e(l) : e(d, -1);
			}), v(s);
			var f = w(s, 2), p = r(f, !0), h = w(f), _ = r(h), C = w(h, 2);
			let E;
			F(C, () => t.vb.icon("pin", 14), !0), v(C), v(a), o((e, t, r, i, o, s, c, l, u, d) => {
				z(a, "href", e), z(a, "title", m(n).name), z(a, "data-view", t), z(a, "data-name", m(n).name), H(p, r), H(_, `${i ?? ""} · ${o ?? ""} · ${s ?? ""}`), E = B(C, 1, "ghost pinBtn", null, E, { on: c }), z(C, "data-pin-ref", m(n).id), z(C, "title", l), z(C, "aria-label", u), z(C, "aria-pressed", d);
			}, [
				() => x(m(n)),
				() => m(n).type.startsWith("image/") ? "img" : "frame",
				() => m(n).name.slice(m(g).length),
				() => t.vb.name(m(n).author),
				() => t.vb.ago(m(n).ts),
				() => m(b).versions[m(n).name] > 1 ? t.vb.t("{n} versões", { n: m(b).versions[m(n).name] }) : ze(m(n).size),
				() => !!S(m(n)),
				() => t.vb.t(S(m(n)) ? "Desafixar" : "Fixar na lateral"),
				() => t.vb.t(S(m(n)) ? "Desafixar" : "Fixar na lateral"),
				() => !!S(m(n))
			]), L("click", C, (e) => T(e, m(n))), i(e, a);
		}), v(E);
		var k = w(E, 2), A = (e) => {
			var n = ut(), a = r(n, !0);
			o((e) => H(a, e), [() => t.vb.t("Nada aqui.")]), i(e, n);
		};
		U(k, (e) => {
			!m(b).list.length && !m(b).dirs.length && e(A);
		}), i(e, s);
	}, M = (e) => {
		var n = ut(), a = r(n, !0);
		o((e) => H(a, e), [() => t.vb.t("Cole uma imagem no chat (Cmd+V), arraste um arquivo ou use o clipe. Tudo que for enviado neste vibebook fica aqui.")]), i(e, n);
	};
	U(A, (e) => {
		m(c).length ? e(j) : e(M, -1);
	}), i(e, O), k();
}
g(["click"]);
// node_modules/zod/v4/core/util.js
function pt(e, t) {
	return typeof t == "bigint" ? t.toString() : t;
}
var mt = class {
	constructor(e) {
		this._getter = e, this._value = void 0;
	}
	get value() {
		let e = this._getter;
		return e !== void 0 && (this._value = e(), this._getter = void 0), this._value;
	}
};
function ht(e) {
	return new mt(e);
}
function gt(e) {
	return e == null;
}
function _t(e) {
	let t = +!!e.startsWith("^"), n = e.endsWith("$") ? e.length - 1 : e.length;
	return e.slice(t, n);
}
function vt(e, t, n) {
	Object.defineProperty(e, t, {
		value: n,
		writable: !0,
		enumerable: !0,
		configurable: !0
	});
}
function yt(e) {
	let t = Object.getOwnPropertyDescriptor(e, "shape");
	return t?.get ? t.get.raw : t?.value;
}
function bt(e) {
	return yt(e._zod.def) ?? e._zod.def.shape;
}
function xt(e, t, n) {
	Object.defineProperty(e, t, {
		get() {
			let e = n();
			return vt(this, t, e), e;
		},
		enumerable: !0,
		configurable: !0
	});
}
function St(e, t, n) {
	t in e ? vt(e, t, n) : e[t] = n;
}
function Ct(e, t, n, r) {
	let i = bt(t);
	for (let a of n) {
		let n = Object.getOwnPropertyDescriptor(i, a);
		n.enumerable && (n.get ? xt(e, a, () => {
			let e = t._zod.def.shape[a];
			return r ? r(e, a) : e;
		}) : St(e, a, r ? r(n.value, a) : n.value));
	}
}
function wt(e, t) {
	for (let n of Reflect.ownKeys(t)) {
		let r = Object.getOwnPropertyDescriptor(t, n);
		r.enumerable && (r.get ? xt(e, n, () => t[n]) : St(e, n, r.value));
	}
}
function Tt(...e) {
	let t = {};
	for (let n of e) {
		let e = Object.getOwnPropertyDescriptors(n);
		Object.assign(t, e);
	}
	return Object.defineProperties({}, t);
}
var Et = "captureStackTrace" in Error ? Error.captureStackTrace : (...e) => {};
function Dt(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function Ot(e) {
	if (Dt(e) === !1) return !1;
	let t = e.constructor;
	if (t === void 0 || typeof t != "function") return !0;
	let n = t.prototype;
	return Dt(n) !== !1 && Object.prototype.hasOwnProperty.call(n, "isPrototypeOf") !== !1;
}
function kt(e) {
	return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function At(e, t, n) {
	let r = new e._zod.constr(t ?? e._zod.def);
	return (!t || n?.parent) && (r._zod.parent = e), r;
}
function jt(e) {
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
function Mt(e) {
	return Object.keys(e).filter((t) => e[t]._zod.optin !== void 0 && e[t]._zod.optout === "optional");
}
function Nt(e, t) {
	if (!Ot(t)) throw Error("Invalid input to extend: expected a plain object");
	let n = e._zod.def.checks;
	if (n && n.length > 0) {
		let n = bt(e);
		for (let e of Reflect.ownKeys(t)) if (Object.getOwnPropertyDescriptor(n, e) !== void 0) throw Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
	}
	return At(e, Tt(e._zod.def, { shape: Pt(e, t) }));
}
function Pt(e, t) {
	let n = {};
	return Ct(n, e, Reflect.ownKeys(bt(e))), wt(n, t), n;
}
function Ft(e, t = 0) {
	if (e.aborted === !0) return !0;
	for (let n = t; n < e.issues.length; n++) if (e.issues[n]?.continue !== !0) return !0;
	return !1;
}
function It(e, t = 0) {
	if (e.aborted === !0) return !0;
	for (let n = t; n < e.issues.length; n++) if (e.issues[n]?.continue === !1) return !0;
	return !1;
}
function Lt(e, t) {
	return t.map((t) => {
		var n;
		return (n = t).path ?? (n.path = []), t.path.unshift(e), t;
	});
}
function Rt(e) {
	return typeof e == "string" ? e : e?.message;
}
function zt(e, t, n) {
	var r;
	for (let i = t; i < e.length; i++) (r = e[i]).schema ?? (r.schema = n);
}
function Bt(e, t, n) {
	var r;
	let i = e.inst?._zod?.traits;
	i?.has("$ZodType") && (i.has("$ZodCheck") ? (r = e).schema ?? (r.schema = e.inst) : e.schema = e.inst);
	let a = e.schema === e.inst ? void 0 : e.schema?._zod.def?.error, o = e.message ? e.message : Rt(e.inst?._zod.def?.error?.(e)) ?? Rt(a?.(e)) ?? Rt(t?.error?.(e)) ?? Rt(n.customError?.(e)) ?? Rt(n.localeError?.(e)) ?? "Invalid input", s = {};
	for (let t of Object.keys(e)) t !== "inst" && t !== "schema" && t !== "continue" && t !== "input" && t !== "__proto__" && (s[t] = e[t]);
	return s.path ??= [], s.message = o, t?.reportInput && (s.input = e.input), s;
}
var Vt = /[\uD800-\uDBFF]/;
function Ht(e) {
	let t = e.length;
	if (!Vt.test(e)) return t;
	let n = t;
	for (let r = 0; r < t - 1; r++) (e.charCodeAt(r) & 64512) == 55296 && (e.charCodeAt(r + 1) & 64512) == 56320 && (n--, r++);
	return n;
}
function Ut(e) {
	return Array.isArray(e) ? "array" : typeof e == "string" ? "string" : "unknown";
}
function Wt(e, t) {
	for (let n in t) {
		let r = Object.getOwnPropertyDescriptor(t, n);
		r.get ? Object.defineProperty(e, n, {
			...r,
			enumerable: !1
		}) : qt(e, n, r.value);
	}
}
function Gt(e, t, n, r = !0) {
	return Object.defineProperty(e, t, {
		configurable: !0,
		writable: !0,
		enumerable: r,
		value: n
	}), n;
}
function Kt(e, t, n) {
	return Gt(e, t, n, !1);
}
function qt(e, t, n) {
	Object.defineProperty(e, t, {
		configurable: !0,
		get() {
			return this == null ? n : Gt(this, t, n.bind(this));
		},
		set(e) {
			Gt(this, t, e);
		}
	});
}
function Jt(e, t) {
	let n = Object.getPrototypeOf(e);
	return t in n ? void 0 : n;
}
var Yt, Xt = !1, Zt = {
	configurable: !0,
	get() {
		Xt = !0;
	}
};
function Qt(e, t, n) {
	let r = Object.getPrototypeOf(e._zod);
	t in r && Yt !== e._zod ? Yt = void 0 : (Yt = e._zod, Object.defineProperty(r, t, {
		configurable: !0,
		get() {
			Object.defineProperty(this, t, Zt);
			let e = Xt;
			Xt = !1;
			try {
				let r = n(this);
				return Xt ? delete this[t] : Object.defineProperty(this, t, {
					configurable: !0,
					writable: !0,
					value: r
				}), Xt ||= e, r;
			} catch (n) {
				throw delete this[t], Xt ||= e, n;
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
function $t(e, t, n, r) {
	let i = Jt(e, t);
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
var en, tn = {
	value: void 0,
	enumerable: !1
}, nn = "captureStackTrace" in Error ? Error : null;
function rn(e) {
	let t = nn;
	if (t) {
		let n = t.stackTraceLimit;
		if (typeof n == "number") {
			try {
				t.stackTraceLimit = 0;
			} catch {
				return nn = null, new e();
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
			tn.value = new a(r);
			try {
				Object.defineProperty(n, "_zod", tn);
			} finally {
				tn.value = void 0;
			}
		} else if (n._zod.traits.has(e)) return;
		if (n._zod.traits.add(e), t(n, r), s) {
			let e = Object.getPrototypeOf(n), t = n._zod.constr.prototype, r = e;
			for (; r && r !== t;) r = Object.getPrototypeOf(r);
			let i = r ?? e;
			s.has(i) || (s.add(i), Wt(i, o));
		}
		let i = d.prototype;
		for (let e in i) Object.prototype.hasOwnProperty.call(i, e) && (e in n || (n[e] = i[e].bind(n)));
	}
	let l = r?.Parent ?? Object;
	class u extends l {}
	Object.defineProperty(u, "name", { value: e });
	function d(e) {
		let t = r?.Parent ? rn(u) : this;
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
var an = class extends Error {
	constructor() {
		super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
	}
};
(en = globalThis).__zod_globalConfig ?? (en.__zod_globalConfig = {});
var on = globalThis.__zod_globalConfig;
function sn(e) {
	return e && Object.assign(on, e), on;
}
// node_modules/zod/v4/core/errors.js
function cn() {
	let e = this._zod;
	return e.message ??= JSON.stringify(e.def, pt, 2), e.message;
}
function ln(e) {
	this._zod.message = e;
}
var un = {
	get: cn,
	set: ln,
	enumerable: !0,
	configurable: !0
}, dn = {
	value: void 0,
	enumerable: !1
}, fn = /* @__PURE__ */ new WeakSet([Object.prototype, Error.prototype]), pn = /* @__PURE__ */ G("$ZodError", (e, t) => {
	e.name = "$ZodError", dn.value = t, Object.defineProperty(e, "issues", dn), dn.value = void 0, Object.defineProperty(e, "message", un);
	let n = Object.getPrototypeOf(e);
	fn.has(n) || (fn.add(n), Object.defineProperty(n, "toString", {
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
}, void 0, { Parent: Error }), mn = /* @__PURE__*/ ((e) => {
	let t = (n, r, i, a) => {
		let o = i ? {
			...i,
			async: !1
		} : { async: !1 }, s = n._zod.run({
			value: r,
			issues: []
		}, o);
		if (s instanceof Promise) throw new an();
		if (s.issues.length) {
			let n = new ((a?.Err) ?? e)(s.issues.map((e) => Bt(e, o, sn())));
			throw Et(n, a?.callee ?? t), n;
		}
		return s.value;
	};
	return t;
})(pn), hn = /* @__PURE__*/ ((e) => {
	let t = async (n, r, i, a) => {
		let o = i ? {
			...i,
			async: !0
		} : { async: !0 }, s = n._zod.run({
			value: r,
			issues: []
		}, o);
		if (s instanceof Promise && (s = await s), s.issues.length) {
			let n = new ((a?.Err) ?? e)(s.issues.map((e) => Bt(e, o, sn())));
			throw Et(n, a?.callee ?? t), n;
		}
		return s.value;
	};
	return t;
})(pn), gn = /* @__PURE__*/ ((e) => (t, n, r) => {
	let i = r ? {
		...r,
		async: !1
	} : { async: !1 }, a = t._zod.run({
		value: n,
		issues: []
	}, i);
	if (a instanceof Promise) throw new an();
	return a.issues.length ? _n(e, a.issues, i) : {
		success: !0,
		data: a.value
	};
})(pn);
function _n(e, t, n) {
	let r;
	return {
		success: !1,
		get error() {
			return r || (r = new e(t.map((e) => Bt(e, n, sn()))), t = void 0, n = void 0), r;
		},
		set error(e) {
			r = e, t = void 0, n = void 0;
		}
	};
}
var vn = /* @__PURE__*/ ((e) => async (t, n, r) => {
	let i = r ? {
		...r,
		async: !0
	} : { async: !0 }, a = t._zod.run({
		value: n,
		issues: []
	}, i);
	return a instanceof Promise && (a = await a), a.issues.length ? _n(e, a.issues, i) : {
		success: !0,
		data: a.value
	};
})(pn), yn = /^[\s\S]{0,}$/, bn = /^-?\d+(?:\.\d+)?$/, xn = /^(?:true|false)$/i, Sn = /*@__PURE__*/ G("$ZodCheck", (e, t) => {
	var n;
	e._zod ??= {}, e._zod.def = t, (n = e._zod).onattach ?? (n.onattach = []);
}), Cn = (e) => {
	let t = e.value;
	return !gt(t) && t.length !== void 0;
}, wn = /*@__PURE__*/ G("$ZodCheckMaxLength", (e, t) => {
	var n;
	Sn.init(e, t), (n = e._zod.def).when ?? (n.when = Cn), e._zod.check = (n) => {
		let r = n.value, i = r.length;
		if ((typeof r == "string" && i > t.maximum ? Ht(r) : i) <= t.maximum) return;
		let a = Ut(r);
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
}), Tn = /*@__PURE__*/ G("$ZodCheckMinLength", (e, t) => {
	var n;
	Sn.init(e, t), (n = e._zod.def).when ?? (n.when = Cn), e._zod.check = (n) => {
		let r = n.value, i = r.length;
		if ((typeof r == "string" && i >= t.minimum && i < t.minimum * 2 ? Ht(r) : i) >= t.minimum) return;
		let a = Ut(r);
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
}), En = /*@__PURE__*/ G("$ZodCheckStartsWith", (e, t) => {
	Sn.init(e, t);
	let n = RegExp(`^${kt(t.prefix)}.*`);
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
}), Dn = {
	major: 4,
	minor: 6,
	patch: 7
}, On = /*@__PURE__*/ G("$ZodType", (e, t) => {
	var n;
	e ??= {}, e._zod.def = t, e._zod.bag = e._zod.bag || {}, e._zod.version = Dn;
	let r = e._zod.def.checks, i = e._zod.traits.has("$ZodCheck") ? [e, ...r ?? []] : r?.length ? [...r] : [];
	for (let t of i) for (let n of t._zod.onattach) n(e);
	if (i.length === 0) (n = e._zod).deferred ?? (n.deferred = []), e._zod.deferred?.push(() => {
		e._zod.run = e._zod.parse;
	});
	else {
		let t = (t, n, r) => {
			if (t.memo) return t;
			let i = Ft(t), a;
			for (let o of n) {
				if (o._zod.def.when) {
					if (It(t) || !o._zod.def.when(t)) continue;
				} else if (i) continue;
				let n = t.issues.length, s = o._zod.check(t);
				if (s instanceof Promise && r?.async === !1) throw new an();
				if (a || s instanceof Promise) a = (a ?? Promise.resolve()).then(async () => {
					await s, t.issues.length !== n && (zt(t.issues, n, e), i ||= Ft(t, n));
				});
				else {
					if (t.issues.length === n) continue;
					zt(t.issues, n, e), i ||= Ft(t, n);
				}
			}
			return a ? a.then(() => t) : t;
		}, n = (n, r, a) => {
			if (Ft(n)) return n.aborted = !0, n;
			let o = t(r, i, a);
			if (o instanceof Promise) {
				if (a.async === !1) throw new an();
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
				if (a.async === !1) throw new an();
				return o.then((e) => t(e, i, a));
			}
			return t(o, i, a);
		};
	}
}, {
	get "~standard"() {
		return Kt(this, "~standard", jn(this));
	},
	set "~standard"(e) {
		Gt(this, "~standard", e);
	}
}), kn = (e, t) => e.issues.length ? { issues: e.issues.map((e) => Bt(e, t, sn())) } : { value: e.value };
async function An(e, t) {
	let n = { async: !0 };
	return kn(await e._zod.run({
		value: t,
		issues: []
	}, n), n);
}
function jn(e) {
	return {
		validate: (t) => {
			let n = { async: !1 };
			try {
				let r = e._zod.run({
					value: t,
					issues: []
				}, n);
				if (!(r instanceof Promise)) return kn(r, n);
			} catch {}
			return An(e, t);
		},
		vendor: "zod",
		version: 1
	};
}
var Mn = /*@__PURE__*/ G("$ZodString", (e, t) => {
	On.init(e, t), e._zod.pattern = t.pattern ?? yn, e._zod.parse = (n, r) => {
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
}), Nn = /*@__PURE__*/ G("$ZodNumber", (e, t) => {
	On.init(e, t), e._zod.pattern = bn, e._zod.parse = (n, r) => {
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
}), Pn = /*@__PURE__*/ G("$ZodBoolean", (e, t) => {
	On.init(e, t), e._zod.pattern = xn, e._zod.parse = (n, r) => {
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
function Fn(e, t, n, r, i, a) {
	let o = n in r, s = a === "optional";
	if (o || !s || i !== "optional") {
		if (e.issues.length) {
			if (i !== void 0 && s && !o) return;
			t.issues.push(...Lt(n, e.issues));
		}
		!o && i === void 0 ? e.issues.length || t.issues.push({
			code: "invalid_type",
			expected: "nonoptional",
			input: void 0,
			path: [n]
		}) : e.value === void 0 ? (o || i === "defaulted" && !s) && (t.value[n] = void 0) : t.value[n] = e.value;
	}
}
var In = [];
function Ln(e) {
	let t = Object.keys(e.shape), n = Object.getOwnPropertySymbols(e.shape), r = n.length ? n : In, i = r.length ? [...t, ...r] : t;
	for (let t of i) if (!e.shape?.[t]?._zod?.traits?.has("$ZodType")) throw Error(`Invalid element at key "${String(t)}": expected a Zod schema`);
	let a = Mt(e.shape);
	return {
		...e,
		allKeys: i,
		symbolKeys: r,
		keySet: new Set(t),
		numKeys: t.length,
		optionalKeys: new Set(a)
	};
}
function Rn(e, t, n, r, i, a, o) {
	let s = [], c = i.keySet, l = i.catchall._zod, u = l.def.type, d = l.optin, f = l.optout, p = 0;
	for (let i in t) {
		if (o && n.issues.length !== p) {
			if (Ft(n, p)) break;
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
		a instanceof Promise ? e.push(a.then((e) => Fn(e, n, i, t, d, f))) : Fn(a, n, i, t, d, f);
	}
	return s.length && n.issues.push({
		code: "unrecognized_keys",
		keys: s,
		input: t,
		inst: a,
		continue: !0
	}), e.length ? Promise.all(e).then(() => n) : n;
}
var zn = /*@__PURE__*/ G("$ZodObject", (e, t) => {
	On.init(e, t);
	let n = Object.getOwnPropertyDescriptor(t, "shape"), r = n?.get ? n.get.raw : t.shape ?? {};
	if (r) {
		let e = () => {
			let n = { ...r };
			return Object.defineProperty(t, "shape", { value: n }), e.raw = n, n;
		};
		e.raw = r, Object.defineProperty(t, "shape", { get: e });
	}
	let i = ht(() => Ln(t));
	Qt(e, "propValues", (e) => {
		let t = e.def.shape, n = {};
		for (let e in t) {
			let r = t[e]._zod;
			if (r.values) {
				Object.prototype.hasOwnProperty.call(n, e) || vt(n, e, /* @__PURE__ */ new Set());
				for (let t of r.values) n[e].add(t);
				r.optin !== void 0 && n[e].add(void 0);
			}
		}
		return n;
	});
	let a = Dt, o = t.catchall, s, c = on.memoizer;
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
				if (Ft(t, f)) break;
				f = t.issues.length;
			}
			if (e === "__proto__") continue;
			let i = u[e], a = i._zod.optin, o = i._zod.optout, s = i._zod.run({
				value: r[e],
				issues: []
			}, n);
			s instanceof Promise ? l.push(s.then((n) => Fn(n, t, e, r, a, o))) : Fn(s, t, e, r, a, o);
		}
		return o ? Rn(l, r, t, n, i.value, e, d === !0) : l.length ? Promise.all(l).then(() => t) : t;
	};
});
function Bn(e, t, n, r) {
	for (let n of e) if (n.issues.length === 0) return t.value = n.value, t;
	let i = e.filter((e) => !Ft(e));
	return i.length === 1 ? (t.value = i[0].value, i[0]) : (t.issues.push({
		code: "invalid_union",
		input: t.value,
		inst: n,
		errors: e.map((e) => e.issues.map((e) => Bt(e, r, sn())))
	}), t);
}
var Vn = /*@__PURE__*/ G("$ZodUnion", (e, t) => {
	On.init(e, t), Qt(e, "optin", (e) => e.def.options.some((e) => e._zod.optin === "defaulted") ? "defaulted" : e.def.options.some((e) => e._zod.optin !== void 0) ? "optional" : void 0), Qt(e, "optout", (e) => e.def.options.some((e) => e._zod.optout === "optional") ? "optional" : void 0), Qt(e, "values", (e) => {
		if (e.def.options.every((e) => e._zod.values)) return new Set(e.def.options.flatMap((e) => Array.from(e._zod.values)));
	}), Qt(e, "pattern", (e) => {
		if (e.def.options.every((e) => e._zod.pattern)) {
			let t = e.def.options.map((e) => e._zod.pattern);
			return RegExp(`^(${t.map((e) => _t(e.source)).join("|")})$`);
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
		return a ? Promise.all(o).then((t) => Bn(t, r, e, i)) : Bn(o, r, e, i);
	};
}), Hn = /*@__PURE__*/ G("$ZodLiteral", (e, t) => {
	On.init(e, t);
	let n = new Set(t.values);
	e._zod.values = n, Qt(e, "pattern", (e) => {
		let t = e.def.values;
		return RegExp(t.length ? `^(${t.map((e) => typeof e == "string" ? kt(e) : e ? kt(e.toString()) : String(e)).join("|")})$` : "^[^\\s\\S]$");
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
function Un(e, t) {
	return e.value = t.issues.length ? void 0 : t.value, e;
}
var Wn = /*@__PURE__*/ G("$ZodOptional", (e, t) => {
	On.init(e, t), Qt(e, "optin", (e) => e.def.innerType._zod.optin === "defaulted" ? "defaulted" : "optional"), e._zod.optout = "optional", Qt(e, "values", (e) => {
		let t = e.def.innerType._zod.values;
		return t ? /* @__PURE__ */ new Set([...t, void 0]) : void 0;
	}), Qt(e, "pattern", (e) => {
		let t = e.def.innerType._zod.pattern;
		return t ? RegExp(`^(${_t(t.source)})?$`) : void 0;
	}), e._zod.parse = (e, n) => {
		if (e.value === void 0) {
			if (t.innerType._zod.optin !== "defaulted") return e;
			let r = t.innerType._zod.run({
				value: e.value,
				issues: []
			}, n);
			return r instanceof Promise ? r.then((t) => Un(e, t)) : Un(e, r);
		}
		return t.innerType._zod.run(e, n);
	};
}), Gn = /*@__PURE__*/ G("$ZodNullable", (e, t) => {
	On.init(e, t), Qt(e, "optin", (e) => e.def.innerType._zod.optin), Qt(e, "optout", (e) => e.def.innerType._zod.optout), Qt(e, "pattern", (e) => {
		let t = e.def.innerType._zod.pattern;
		return t ? RegExp(`^(${_t(t.source)}|null)$`) : void 0;
	}), Qt(e, "values", (e) => e.def.innerType._zod.values ? /* @__PURE__ */ new Set([...e.def.innerType._zod.values, null]) : void 0), e._zod.parse = (e, n) => e.value === null ? e : t.innerType._zod.run(e, n);
});
// node_modules/zod/v4/core/api.js
function Kn(e) {
	return e.checks &&= [...e.checks], e;
}
// @__NO_SIDE_EFFECTS__
function qn(e, t) {
	return new e(Kn({
		type: "string",
		...jt(t)
	}));
}
// @__NO_SIDE_EFFECTS__
function Jn(e, t) {
	return new e(Kn({
		type: "number",
		checks: [],
		...jt(t)
	}));
}
// @__NO_SIDE_EFFECTS__
function Yn(e, t) {
	return new e({
		type: "boolean",
		...jt(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Xn(e, t) {
	return new wn({
		check: "max_length",
		...jt(t),
		maximum: e
	});
}
// @__NO_SIDE_EFFECTS__
function Zn(e, t) {
	return new Tn({
		check: "min_length",
		...jt(t),
		minimum: e
	});
}
// @__NO_SIDE_EFFECTS__
function Qn(e, t) {
	return new En({
		check: "string_format",
		format: "starts_with",
		...jt(t),
		prefix: e
	});
}
// node_modules/zod/v4/mini/schemas.js
var $n = /*@__PURE__*/ G("ZodMiniType", (e, t) => {
	if (!e._zod) throw Error("Uninitialized schema in ZodMiniType.");
	On.init(e, t), e.def = t, e.type = t.type;
}, {
	get with() {
		return this.check;
	},
	set with(e) {
		Gt(this, "with", e);
	},
	parse(e, t) {
		return mn(this, e, t, { callee: this.parse });
	},
	parseAsync(e, t) {
		return hn(this, e, t, { callee: this.parseAsync });
	},
	safeParse(e, t) {
		return gn(this, e, t);
	},
	safeParseAsync(e, t) {
		return vn(this, e, t);
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
		return At(this, e, t);
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
}), er = /*@__PURE__*/ G("ZodMiniString", (e, t) => {
	Mn.init(e, t), $n.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function K(e) {
	return /* @__PURE__ */ qn(er, e);
}
var tr = /*@__PURE__*/ G("ZodMiniNumber", (e, t) => {
	Nn.init(e, t), $n.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function nr(e) {
	return /* @__PURE__ */ Jn(tr, e);
}
var rr = /*@__PURE__*/ G("ZodMiniBoolean", (e, t) => {
	Pn.init(e, t), $n.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function ir(e) {
	return /* @__PURE__ */ Yn(rr, e);
}
var ar = /*@__PURE__*/ G("ZodMiniObject", (e, t) => {
	zn.init(e, t), $n.init(e, t), $t(e, "shape", (e) => e._zod.def.shape, !1);
});
// @__NO_SIDE_EFFECTS__
function or(e, t) {
	return new ar({
		type: "object",
		shape: e ?? {},
		...jt(t)
	});
}
// @__NO_SIDE_EFFECTS__
function sr(e, t) {
	return Nt(e, t);
}
var cr = /*@__PURE__*/ G("ZodMiniUnion", (e, t) => {
	Vn.init(e, t), $n.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function lr(e, t) {
	return new cr({
		type: "union",
		options: e,
		...jt(t)
	});
}
var ur = /*@__PURE__*/ G("ZodMiniLiteral", (e, t) => {
	Hn.init(e, t), $n.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function dr(e, t) {
	return new ur({
		type: "literal",
		values: Array.isArray(e) ? e : [e],
		...jt(t)
	});
}
var fr = /*@__PURE__*/ G("ZodMiniOptional", (e, t) => {
	Wn.init(e, t), $n.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function pr(e) {
	return new fr({
		type: "optional",
		innerType: e
	});
}
var mr = /*@__PURE__*/ G("ZodMiniNullable", (e, t) => {
	Gn.init(e, t), $n.init(e, t);
});
// @__NO_SIDE_EFFECTS__
function hr(e) {
	return new mr({
		type: "nullable",
		innerType: e
	});
}
var gr = /* @__PURE__ */ lr([/* @__PURE__ */ or({
	ok: /* @__PURE__ */ dr(!0),
	id: /* @__PURE__ */ nr(),
	thread: /* @__PURE__ */ K()
}), /* @__PURE__ */ or({
	ok: /* @__PURE__ */ dr(!1),
	error: /* @__PURE__ */ K()
})]), _r = /* @__PURE__ */ or({
	ok: /* @__PURE__ */ ir(),
	name: /* @__PURE__ */ pr(/* @__PURE__ */ K()),
	error: /* @__PURE__ */ pr(/* @__PURE__ */ K()),
	every: /* @__PURE__ */ pr(/* @__PURE__ */ hr(/* @__PURE__ */ K())),
	cron: /* @__PURE__ */ pr(/* @__PURE__ */ hr(/* @__PURE__ */ K())),
	timezone: /* @__PURE__ */ pr(/* @__PURE__ */ K()),
	next_at: /* @__PURE__ */ pr(/* @__PURE__ */ K())
}), vr = /* @__PURE__ */ or({
	id: /* @__PURE__ */ K(),
	name: /* @__PURE__ */ K(),
	type: /* @__PURE__ */ K(),
	size: /* @__PURE__ */ nr(),
	author: /* @__PURE__ */ K(),
	ts: /* @__PURE__ */ nr(),
	embed: /* @__PURE__ */ pr(/* @__PURE__ */ ir())
}), yr = /* @__PURE__ */ sr(vr, { reminder: /* @__PURE__ */ pr(_r) }), br = /* @__PURE__ */ or({ error: /* @__PURE__ */ K() });
(/* @__PURE__ */ K()).check(/* @__PURE__ */ Qn("https://"), /* @__PURE__ */ Xn(1e3)), (/* @__PURE__ */ K()).check(/* @__PURE__ */ Zn(1)), (/* @__PURE__ */ K()).check(/* @__PURE__ */ Zn(1)), (/* @__PURE__ */ K()).check(/* @__PURE__ */ Zn(1)), (/* @__PURE__ */ K()).check(/* @__PURE__ */ Qn("m"));
// shared/room.ts
var xr = [
	"todo",
	"doing",
	"review",
	"done"
], Sr = (e) => typeof e == "object" && !!e && !Array.isArray(e), q = (e) => typeof e == "string", J = (e) => typeof e == "number" && Number.isFinite(e), Y = (e) => typeof e == "boolean", X = (e) => (t) => t === null || e(t), Z = (e) => (t) => Array.isArray(t) && t.every(e), Cr = (e) => (t) => Sr(t) && Object.values(t).every(e), Q = Z(q), wr = (...e) => (t) => typeof t == "string" && e.includes(t), Tr = wr(...xr), $ = (e, t = {}) => (n) => Sr(n) && Object.entries(e).every(([e, t]) => t(n[e])) && Object.entries(t).every(([e, t]) => n[e] === void 0 || t(n[e])), Er = (e) => $({
	id: q,
	name: q,
	type: q,
	size: J,
	author: q,
	ts: J
}, { embed: Y })(e), Dr = $({
	id: q,
	title: q,
	done: Y,
	status: Tr
}, {
	owner: X(q),
	due: X(q),
	flags: Q,
	epic_id: q
}), Or = (e) => Dr(e), kr = $({
	id: q,
	title: q,
	tasks: Z(Or)
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
}), Ar = (e) => kr(e), jr = $({
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
	files: Z(Er),
	quiet: Y,
	cut: Y,
	for_who: X(q)
}), Mr = (e) => jr(e), Nr = $({
	msg_id: J,
	email: q,
	who: q,
	status: q,
	ts: J
}, {
	agent: q,
	note: X(q)
}), Pr = (e) => Nr(e), Fr = $({
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
}), Ir = (e) => Fr(e), Lr = $({
	title: q,
	owner: q
}, {
	summary: X(q),
	folder: X(q)
}), Rr = (e) => Lr(e), zr = $({
	title: q,
	tasks: Q
}, { why: q }), Br = (e) => zr(e), Vr = $({
	id: J,
	text: q,
	who: q,
	kind: q,
	ts: J
}), Hr = (e) => Vr(e), Ur = $({
	id: q,
	kind: q,
	ref: q
}, {
	title: q,
	author: q,
	ts: J
}), Wr = (e) => Ur(e), Gr = $({
	id: q,
	question: q,
	options: Q,
	multi: Y,
	closed: Y,
	author: q,
	votes: Z(Q)
}), Kr = (e) => Gr(e), qr = $({
	email: q,
	ts: J
}, { name: X(q) }), Jr = $({
	email: q,
	who: q,
	read: J,
	delivered: J
}, {
	agent: q,
	ts: J
}), Yr = $({ text: q }, {
	epic: X(q),
	stale: (e) => e === !1,
	fetched: Y,
	by: q
}), Xr = $({
	epic: q,
	stale: (e) => e === !0
}, { by: q }), Zr = {
	state: $({
		me: q,
		book: Rr,
		messages: Z(Mr),
		epics: Z(Ar),
		members: Q,
		online: Q,
		suggestions: Z(Br)
	}, {
		roomTasks: Z(Or),
		names: Cr(q),
		avatars: Cr(J),
		pending: Q,
		requests: Z(qr),
		files: Z(Er),
		filesN: J,
		filesAll: Y,
		reminders: Z(Ir),
		acks: Z(Pr),
		receipts: Z(Jr),
		counts: Cr(J),
		countsAt: J,
		full: Q,
		complete: Y,
		origins: Z(Mr),
		docs: Cr(q),
		doc: q,
		docNotes: Q,
		decisions: Z(Hr),
		pins: Z(Wr),
		polls: Cr(Kr)
	}),
	msg: $({ m: Mr }),
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
	epics: $({ epics: Z(Ar) }, { roomTasks: Z(Or) }),
	epicsPatch: $({
		changed: Z(Ar),
		order: Q
	}, { roomTasks: Z(Or) }),
	doc: (e) => Sr(e) && (e.stale === !0 ? Xr(e) && e.text === void 0 && e.fetched === void 0 : Yr(e)),
	docNotes: $({ notes: Q }),
	meta: $({}, {
		title: q,
		folder: q,
		summary: q
	}),
	suggestions: $({ suggestions: Z(Br) }),
	requests: $({ requests: Z(qr) }),
	members: $({ members: Q }, {
		pending: Q,
		requests: Z(qr),
		names: Cr(q),
		avatars: Cr(J)
	}),
	files: $({ files: Z(Er) }),
	fileAdd: $({ file: Er }),
	reminders: $({ reminders: Z(Ir) }),
	decisions: $({ decisions: Z(Hr) }),
	pins: $({ pins: Z(Wr) }),
	receipts: $({ receipts: Z(Jr) }),
	older: $({
		messages: Z(Mr),
		thread: q,
		more: Y
	}),
	acks: $({ acks: Z(Pr) }),
	ackRows: $({ acks: Z(Pr) }),
	poll: $({ poll: Kr }),
	online: $({ online: Q }),
	conns: $({}),
	error: $({}, { error: q }),
	blocked: $({
		text: q,
		reason: q
	})
};
function Qr(e) {
	return !Sr(e) || typeof e.t != "string" || !Object.hasOwn(Zr, e.t) ? !1 : Zr[e.t](e);
}
function $r(e) {
	if (!Sr(e)) return e;
	let t = (e, t) => Sr(e) && (e[t] === 0 || e[t] === 1) ? {
		...e,
		[t]: e[t] === 1
	} : e, n = (e) => Array.isArray(e) ? e.map((e) => t(e, "done")) : e, r = (e) => Array.isArray(e) ? e.map((e) => Sr(e) ? {
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
function ei(e) {
	let t = $r(JSON.parse(e));
	if (!Qr(t)) throw TypeError("Invalid room event");
	return t;
}
var ti = {
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
		kind: wr("link", "file", "app"),
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
		status: Tr
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
function ni(e) {
	return !Sr(e) || typeof e.t != "string" || !Object.hasOwn(ti, e.t) ? !1 : ti[e.t](e);
}
// node_modules/hono/dist/client/utils.js
var ri = (e, t) => (e = e.replace(/\/+$/, ""), e += "/", t = t.replace(/^\/+/, ""), e + t), ii = (e, t) => {
	for (let [n, r] of Object.entries(t)) {
		let t = RegExp("/:" + n + "(?:{[^/]+})?\\??(?=/|$)");
		e = e.replace(t, () => r ? `/${r}` : "");
	}
	return e;
}, ai = (e) => {
	let t = new URLSearchParams();
	for (let [n, r] of Object.entries(e)) if (r !== void 0) {
		if (Array.isArray(r)) for (let e of r) e !== void 0 && t.append(n, e);
		else t.set(n, r);
	}
	return t;
}, oi = (e, t) => {
	switch (t) {
		case "ws": return e.replace(/^http/, "ws");
		case "http": return e.replace(/^ws/, "http");
	}
}, si = (e) => /^https?:\/\/[^\/]+?\/index(?=\?|$)/.test(e) ? e.replace(/\/index(?=\?|$)/, "/") : e.replace(/\/index(?=\?|$)/, "");
function ci(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function li(e, t) {
	if (!ci(e) && !ci(t)) return t;
	let n = { ...e };
	for (let e in t) {
		let r = t[e];
		n[e] = ci(n[e]) && ci(r) ? li(n[e], r) : r;
	}
	return n;
}
// node_modules/hono/dist/utils/cookie.js
var ui = /^[\w!#$%&'*.^`|~+-]+$/, di = (e, t, n = {}) => {
	if (!ui.test(e)) throw Error("Invalid cookie name");
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
}, fi = (e, t, n) => (t = encodeURIComponent(t), di(e, t, n)), pi = (e, t) => new Proxy(() => {}, {
	get(n, r) {
		if (typeof r == "string" && r !== "then") return pi(e, [...t, r]);
	},
	apply(n, r, i) {
		return e({
			path: t,
			args: i
		});
	}
}), mi = (e, t) => {
	let n = t.toString();
	return n ? `${e}?${n}` : e;
}, hi = class {
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
			for (let [n, r] of Object.entries(e.cookie)) r !== void 0 && t.push(fi(n, r));
			t.length > 0 && (r.Cookie = t.join("; "));
		}
		this.cType && (r["Content-Type"] = this.cType);
		let i = new Headers();
		for (let [e, t] of Object.entries(r)) t !== void 0 && i.set(e, t);
		let a = this.url;
		a = si(a), a = ii(a, this.pathParams), this.queryParams && (a = mi(a, this.queryParams)), n = this.method.toUpperCase();
		let o = n !== "GET" && n !== "HEAD";
		return (t?.fetch || fetch)(a, {
			body: o ? this.rBody : void 0,
			method: n,
			headers: i,
			...t?.init
		});
	};
}, gi = (e, t) => pi(function n(r) {
	let i = t?.buildSearchParams ?? ai, a = [...r.path], o = a.slice(-3).reverse();
	if (o[0] === "toString") return o[1] === "name" ? o[2] || "" : n.toString();
	if (o[0] === "valueOf") return o[1] === "name" ? o[2] || "" : n;
	let s = "";
	if (/^\$/.test(o[0])) {
		let e = a.pop();
		e && (s = e.replace(/^\$/, ""));
	}
	let c = ri(e, a.join("/"));
	if (s === "url" || s === "path") {
		let t = si(c);
		return r.args[0] && (r.args[0].param && (t = ii(t, r.args[0].param)), r.args[0].query && (t = mi(t, i(r.args[0].query)))), s === "url" ? new URL(t) : t.slice(e.replace(/\/+$/, "").length).replace(/^\/?/, "/");
	}
	if (s === "ws") {
		let e = si(c), n = oi(r.args[0]?.param ? ii(e, r.args[0].param) : e, "ws"), a = new URL(n), o = r.args[0]?.query;
		return o && i(o).forEach((e, t) => {
			a.searchParams.append(t, e);
		}), ((...e) => t?.webSocket !== void 0 && typeof t.webSocket == "function" ? t.webSocket(...e) : new WebSocket(...e))(a.toString());
	}
	let l = new hi(c, s, { buildSearchParams: i });
	if (s) {
		t ??= {};
		let e = { ...r.args[1] }, n = t.headers, i = e.headers;
		n && i && (e.headers = async () => ({
			...typeof n == "function" ? await n() : n,
			...typeof i == "function" ? await i() : i
		}));
		let a = li(t, e);
		return l.fetch(r.args[0], a);
	}
	return l;
}, []), _i = (e = "/", t) => gi(e, t ? { fetch: t } : {});
// svelte/transport.ts
function vi(e, t) {
	if (!ni(t)) throw TypeError("Invalid room command");
	return !e || e.readyState !== 1 ? !1 : (e.send(JSON.stringify(t)), !0);
}
function yi(e) {
	if (typeof e != "string") throw TypeError("Room events must be JSON text");
	return ei(e);
}
async function bi(e) {
	try {
		return await e.json();
	} catch (t) {
		throw e.ok ? t : Error(`HTTP ${e.status}`);
	}
}
function xi(e, t) {
	let n = br.safeParse(t);
	return Error(n.success ? n.data.error : `HTTP ${e.status}`);
}
function Si(e, t = fetch) {
	let n = _i("/", t).api.books[":id"], r = encodeURIComponent(e);
	return {
		async postMessage(e) {
			let t = await n.post.$post({
				param: { id: r },
				json: e
			}), i = await bi(t);
			if (t.ok || t.status === 400) {
				let e = gr.safeParse(i);
				if (e.success) return e.data;
				if (t.ok) throw TypeError("Invalid post response");
			}
			throw xi(t, i);
		},
		async uploadFile(e) {
			let t = await n.files.$post({
				param: { id: r },
				header: {
					"content-type": e.type,
					"x-filename": encodeURIComponent(e.name)
				}
			}, { init: { body: e.body } }), i = await bi(t);
			if (!t.ok) throw xi(t, i);
			let a = yr.safeParse(i);
			if (!a.success) throw TypeError(vr.safeParse(i).success ? "Invalid reminder response" : "Invalid upload response");
			return a.data;
		}
	};
}
// svelte/Reminders.svelte
var Ci = x("<button class=\"primary\" id=\"remNew\"><!> </button>"), wi = x("<form class=\"remForm\" id=\"remForm\"><input name=\"name\" maxlength=\"60\" required=\"\"/> <textarea name=\"text\" required=\"\"></textarea> <div class=\"row\"><span class=\"err\" id=\"remErr\"> </span><button type=\"button\" class=\"ghost\" id=\"remCancel\"> </button><button class=\"primary\" id=\"remSave\"> </button></div></form>"), Ti = x("<span class=\"err\"> </span>"), Ei = x("<pre class=\"remText\"> </pre>"), Di = x("<button class=\"ghost\"></button>"), Oi = x("<div><div class=\"remBody\" role=\"button\" tabindex=\"0\"><b><!> </b> <small><!> </small> <!><!></div> <!> <label class=\"sw\"><input type=\"checkbox\"/> </label> <button class=\"ghost\"></button></div>"), ki = x("<div class=\"empty\"> </div>"), Ai = x("<div class=\"remHead\"><p></p> <!></div> <!> <!> <!>", 1);
function ji(e, n) {
	D(n, !0);
	let s = E(null), l = E(""), u = E(!1), f = E(c([])), p = R(() => n.room.reminders || []), h = R(() => n.vb.locale || (document.documentElement.lang === "en" ? "en-US" : "pt-BR")), g = (e) => new Date(e).toLocaleString(m(h), {
		weekday: "short",
		day: "numeric",
		month: "short",
		hour: "2-digit",
		minute: "2-digit"
	});
	function _(e) {
		C(s, e, !0), C(l, "");
	}
	function b(e) {
		C(f, m(f).includes(e.id) ? m(f).filter((t) => t !== e.id) : [...m(f), e.id], !0);
	}
	async function x(e) {
		if (e.preventDefault(), !m(s) || m(u)) return;
		let t = { ...m(s) }, r = t.name.trim().replace(/\.md$/i, "").replace(/[\\/]/g, "-");
		C(u, !0), C(l, "");
		try {
			let e = await Si(n.room.id).uploadFile({
				name: `reminders/${r}.md`,
				type: "text/markdown",
				body: t.text
			});
			if (e.reminder && !e.reminder.ok) {
				C(l, `⚠ ${e.reminder.error || n.vb.t("falhou")}`), C(s, {
					...t,
					name: r,
					fixed: !0
				}, !0);
				return;
			}
			C(s, null);
		} catch (e) {
			C(l, e instanceof Error ? e.message : n.vb.t("sem conexão"), !0);
		} finally {
			C(u, !1);
		}
	}
	var S = Ai(), T = W(S), O = y(T);
	F(O, () => n.vb.t("Cada lembrete é um arquivo <code>reminders/&lt;nome&gt;.md</code>: o texto diz quando rodar e o que fazer. Na hora, o @vibe posta o texto aqui e o agent de quem salvou faz."), !0), v(O);
	var A = w(O, 2), ee = (e) => {
		var t = Ci(), r = y(t);
		F(r, () => n.vb.icon("plus", 14));
		var a = w(r);
		v(t), o((e) => H(a, ` ${e ?? ""}`), [() => n.vb.t("Novo lembrete")]), L("click", t, () => _({
			name: "",
			text: ""
		})), i(e, t);
	};
	U(A, (e) => {
		m(s) || e(ee);
	}), v(T);
	var j = w(T, 2), M = (e) => {
		var a = wi(), c = y(a);
		ce(c);
		var f = w(c, 2);
		d(f);
		var p = w(f, 2), h = y(p), g = r(h, !0), _ = w(h), b = r(_, !0), S = w(_), T = r(S, !0);
		v(p), v(a), o((e, t, n, r) => {
			z(c, "placeholder", e), c.readOnly = m(s).fixed, z(f, "placeholder", t), H(g, m(l)), H(b, n), S.disabled = m(u), H(T, r);
		}, [
			() => n.vb.t("nome, ex.: relatorio-diario"),
			() => n.vb.t("Diga quando e o quê. Ex.: Todo dia às 8h: puxe os números de ontem e poste aqui o que mudou."),
			() => n.vb.t("Cancelar"),
			() => n.vb.t("Salvar")
		]), t("submit", a, x), ne(c, () => m(s).name, (e) => m(s).name = e), ne(f, () => m(s).text, (e) => m(s).text = e), L("click", _, () => C(s, null)), i(e, a);
	};
	U(j, (e) => {
		m(s) && e(M);
	});
	var te = w(j, 2);
	P(te, 17, () => m(p), (e) => e.id, (e, t) => {
		var s = Oi();
		let c;
		var l = y(s), u = y(l), d = y(u);
		F(d, () => n.vb.icon(m(f).includes(m(t).id) ? "chevronDown" : "chevronRight", 13));
		var p = w(d);
		v(u);
		var h = w(u, 2), x = y(h), S = (e) => {
			var r = a();
			o((e) => H(r, `${(m(t).every || m(t).cron || "") ?? ""}${e ?? ""} ·`), [() => m(t).enabled && m(t).next_at ? ` · ${n.vb.t("próximo {when}", { when: g(m(t).next_at) })}` : ""]), i(e, r);
		};
		U(x, (e) => {
			m(t).error || e(S);
		});
		var C = w(x, 1, !0);
		v(h);
		var T = w(h, 2), E = (e) => {
			var n = Ti(), a = r(n);
			o(() => H(a, `⚠ ${m(t).error ?? ""}`)), i(e, n);
		};
		U(T, (e) => {
			m(t).error && e(E);
		});
		var D = w(T), O = (e) => {
			var n = Ei(), a = r(n, !0);
			o(() => H(a, m(t).text)), i(e, n);
		}, k = R(() => m(f).includes(m(t).id));
		U(D, (e) => {
			m(k) && e(O);
		}), v(l);
		var A = w(l, 2), ee = (e) => {
			var r = Di();
			F(r, () => n.vb.icon("pencil", 14), !0), v(r), o((e, n) => {
				z(r, "data-rem-edit", m(t).id), z(r, "title", e), z(r, "aria-label", n);
			}, [() => n.vb.t("Editar"), () => n.vb.t("Editar")]), L("click", r, () => _({
				name: m(t).name,
				text: m(t).text,
				fixed: !0
			})), i(e, r);
		};
		U(A, (e) => {
			m(t).name && e(ee);
		});
		var j = w(A, 2), M = y(j);
		ce(M);
		var te = w(M, 1, !0);
		v(j);
		var N = w(j, 2);
		F(N, () => n.vb.icon("x"), !0), v(N), v(s), o((e, n, r, i, a, o, u) => {
			c = B(s, 1, "rem", null, c, {
				bad: !!m(t).error,
				off: !m(t).enabled,
				open: e
			}), z(l, "data-rem-open", m(t).id), z(l, "title", n), H(p, ` ${(m(t).name ? `${m(t).name}.md` : m(t).text) ?? ""}`), H(C, r), z(j, "title", i), z(M, "data-rem-on", m(t).id), ie(M, m(t).enabled), M.disabled = !!m(t).error, H(te, a), z(N, "data-rem-del", m(t).id), z(N, "title", o), z(N, "aria-label", u);
		}, [
			() => m(f).includes(m(t).id),
			() => n.vb.t(m(f).includes(m(t).id) ? "Esconder o texto" : "Ver o texto"),
			() => n.vb.t("de {who}", { who: n.vb.name(m(t).owner) }),
			() => n.vb.t("Ligado"),
			() => n.vb.t("ligado"),
			() => n.vb.t("Apagar lembrete"),
			() => n.vb.t("Apagar lembrete")
		]), L("click", l, (e) => {
			e.target.closest(".remText") || b(m(t));
		}), L("keydown", l, (e) => {
			e.key === "Enter" && b(m(t));
		}), L("change", M, (e) => n.send({
			t: "reminder.enable",
			id: m(t).id,
			on: e.currentTarget.checked
		})), L("click", N, () => {
			confirm(n.vb.t("Apagar este lembrete?")) && n.send({
				t: "reminder.delete",
				id: m(t).id
			});
		}), i(e, s);
	});
	var N = w(te, 2), re = (e) => {
		var t = ki(), a = r(t, !0);
		o((e) => H(a, e), [() => n.vb.t("Nenhum lembrete ainda. Clique em Novo lembrete, ou peça pro seu agent: “todo dia às 8h, me manda o resumo do que mudou”.")]), i(e, t);
	};
	U(N, (e) => {
		!m(p).length && !m(s) && e(re);
	}), i(e, S), k();
}
g([
	"click",
	"keydown",
	"change"
]);
// svelte/Sidebar.svelte
var Mi = x("<span class=\"claudeSpin\">✻</span>"), Ni = x("<button type=\"button\"><!><span class=\"rt\"> </span> <!> <!><!> <span class=\"n\"> </span></button>"), Pi = x("<div class=\"fnCol\"><span class=\"fnRow\"><span class=\"fn\"> </span><span class=\"pendTag\"> </span></span> <small class=\"memActs\"><button type=\"button\" class=\"ghost resend\"> </button> · <button type=\"button\" class=\"ghost resend\"> </button></small></div>"), Fi = x("<span class=\"fn\"> </span>"), Ii = x("<div class=\"fnCol\"><span class=\"fn\"> </span><small class=\"memActs\"> </small></div>"), Li = x("<button type=\"button\" class=\"ghost x\"></button>"), Ri = x("<div class=\"member\"><!> <!> <!></div> <!>", 1), zi = x("<button type=\"button\" class=\"iconBtn phOnly\" id=\"sideArch\"></button> <button type=\"button\" class=\"iconBtn phOnly\" id=\"sideDel\"></button>", 1), Bi = x("<span class=\"rowEdit phOnly\" role=\"button\" tabindex=\"0\" id=\"sideRename\"><!> </span>"), Vi = x("<div class=\"epTabs\" role=\"tablist\"><button type=\"button\" role=\"tab\" data-arch=\"\"> <b> </b></button> <button type=\"button\" role=\"tab\" data-arch=\"1\"> <b> </b></button></div>"), Hi = x("<button type=\"button\"><span class=\"ri\"> </span><span class=\"rt\"> </span><span class=\"n\"> </span></button>"), Ui = x("<form id=\"newEpic\" class=\"newRoom\"><input enterkeyhint=\"done\"/><button class=\"ri\"></button></form> <!>", 1), Wi = x("<div class=\"member reqRow\"><!> <div class=\"fnCol\"><span class=\"fn\"> </span><small class=\"memActs\"> <button type=\"button\" class=\"ghost resend okAsk\" data-ok=\"1\"> </button></small></div> <button type=\"button\" class=\"ghost x\" data-ok=\"\"></button></div>"), Gi = x("<div class=\"asks\"><h4> </h4> <!></div>"), Ki = x("<details class=\"memMore\" data-fold=\"off\"><summary> </summary><!></details>"), qi = x("<button type=\"button\" class=\"friendAdd\"><!><span class=\"fn\"> </span><b></b></button>"), Ji = x("<details class=\"memMore\" data-fold=\"friends\"><summary> </summary> <!></details>"), Yi = x("<option></option>"), Xi = x("<button type=\"button\" class=\"sheetGrab\"><i></i></button> <!> <div class=\"sideHead\"><div class=\"sideTop\"><a data-nav=\"\" href=\"/app\" class=\"muted\"><!> vibebooks</a> <!> <button type=\"button\" class=\"iconBtn\" id=\"railToggle\" aria-expanded=\"true\"></button></div></div> <div class=\"sec threadsSec\"><button type=\"button\" data-thread=\"main\"><!><span class=\"rt\"> </span> <!> <!><span class=\"n\"> </span></button> <!> <div><!> <!></div></div> <!> <div class=\"sec\"><!> <h4> </h4> <!> <!> <!> <!> <form class=\"row\" id=\"invite\" style=\"margin-top:8px\"><input type=\"email\" required=\"\" list=\"friendList\" autocomplete=\"off\"/><button></button></form> <datalist id=\"friendList\"></datalist></div>", 1);
function Zi(t, n) {
	D(n, !0);
	let a = (t, a = e) => {
		let s = R(() => a().tasks.filter((e) => e.done).length), c = R(() => n.vb.epicBusy(a()));
		var l = Ni();
		let u;
		var d = y(l);
		F(d, () => n.vb.epicIco(a(), !0));
		var f = w(d), p = r(f, !0), h = w(f, 2), g = (e) => {
			var t = Mi();
			o((e) => z(t, "aria-label", e), [() => n.vb.t("{who} está trabalhando", { who: m(c) })]), i(e, t);
		};
		U(h, (e) => {
			m(c) && e(g);
		});
		var _ = w(h, 2);
		F(_, () => n.vb.waitPill(a().id));
		var b = w(_);
		F(b, () => n.vb.prodMark(a()));
		var x = w(b, 2), S = r(x, !0);
		v(l), o((e, t) => {
			u = B(l, 1, "thread", null, u, {
				sel: n.thread === a().id,
				archived: !!a().archived,
				busy: !!m(c),
				waiting: e
			}), z(l, "data-thread", a().id), z(l, "title", t), H(p, a().title), H(S, a().tasks.length ? `${m(s)}/${a().tasks.length}` : "");
		}, [() => n.vb.waitsIn(a().id).length > 0, () => `${a().title} · ${m(s)}/${a().tasks.length} tasks${a().archived ? ` · ${n.vb.t("arquivado")}` : ""}${m(c) ? ` · ${n.vb.t("{who} está trabalhando aqui", { who: m(c) })}` : ""}`]), i(t, l);
	}, s = (t, a = e) => {
		var s = Ri(), c = W(s), l = y(c);
		F(l, () => n.vb.avatar(a(), n.room.online.includes(a())));
		var u = w(l, 2), d = (e) => {
			var t = Pi(), s = y(t), c = y(s), l = r(c, !0), u = w(c), d = r(u, !0);
			v(s);
			var f = w(s, 2), p = y(f), m = r(p, !0), h = w(p, 2), g = r(h, !0);
			v(f), v(t), o((e, t, n, r, i, o, s) => {
				z(c, "title", a()), H(l, e), z(u, "title", t), H(d, n), z(p, "data-copyinv", a()), z(p, "title", r), H(m, i), z(h, "data-resend", a()), z(h, "title", o), H(g, s);
			}, [
				() => n.room.names?.[a()] || a().split("@")[0],
				() => n.vb.t("Convidada(o), ainda não entrou"),
				() => n.vb.t("pendente"),
				() => n.vb.t("Copiar a mensagem de convite (link da sala + setup do agent) para mandar no WhatsApp"),
				() => n.vb.t("copiar"),
				() => n.vb.t("Convidada(o), ainda não entrou"),
				() => n.vb.t("reenviar")
			]), i(e, t);
		}, f = R(() => n.room.pending?.includes(a())), p = (e) => {
			var t = Fi(), s = r(t, !0);
			o(() => {
				z(t, "title", a()), H(s, n.room.names[a()]);
			}), i(e, t);
		}, h = (e) => {
			var t = Ii(), n = y(t), s = r(n, !0), c = w(n), l = r(c);
			v(t), o((e, t) => {
				z(n, "title", a()), H(s, e), H(l, `@${t ?? ""}`);
			}, [() => a().split("@")[0], () => a().split("@")[1] ?? ""]), i(e, t);
		};
		U(u, (e) => {
			m(f) ? e(d) : n.room.names?.[a()] ? e(p, 1) : e(h, -1);
		});
		var g = w(u, 2), _ = (e) => {
			var t = Li();
			F(t, () => n.vb.icon("x"), !0), v(t), o((e, n) => {
				z(t, "data-remove", a()), z(t, "aria-label", e), z(t, "title", n);
			}, [() => n.vb.t("Remover {email}", { email: a() }), () => n.room.pending?.includes(a()) ? n.vb.t("Cancelar convite") : n.vb.t("Remover do vibebook")]), i(e, t);
		}, b = R(() => a() !== n.room.book?.owner && (n.room.pending?.includes(a()) || n.room.me === n.room.book?.owner));
		U(g, (e) => {
			m(b) && e(_);
		}), v(c);
		var x = w(c, 2);
		F(x, () => n.vb.agentRows(a())), i(t, s);
	}, c = S(n, "archOpen", 3, !1), l = S(n, "foldOpen", 19, () => ({
		off: !1,
		friends: null
	})), u = S(n, "friends", 19, () => []), d = (e) => n.room.counts ? (n.room.counts[e] ?? 0) + n.room.messages.filter((t) => t.thread === e && t.id > (n.room.countsAt ?? 0)).length : n.room.messages.filter((t) => t.thread === e).length, f = (e) => n.room.messages.reduce((t, n) => n.thread === e.id && n.id > t ? n.id : t, 0), p = R(() => n.room.epics.find((e) => e.id === n.thread)), h = R(() => n.room.epics.filter((e) => !e.archived)), g = R(() => n.room.epics.filter((e) => e.archived).map((e, t) => ({
		epic: e,
		last: f(e),
		i: t
	})).sort((e, t) => t.last - e.last || t.i - e.i).map(({ epic: e }) => e)), _ = R(() => c() && m(g).length > 0), b = R(() => n.room.members.filter((e) => e === n.room.me || n.room.online.includes(e))), x = R(() => n.room.members.filter((e) => !m(b).includes(e))), C = R(() => u().filter((e) => !n.room.members.includes(e)));
	var T = Xi(), E = W(T), O = w(E, 2);
	F(O, () => n.vb.roomStrip());
	var j = w(O, 2), M = y(j), te = y(M), N = y(te);
	F(N, () => n.vb.icon("back")), A(), v(te);
	var ne = w(te, 2), re = (e) => {
		var t = zi(), r = W(t);
		F(r, () => n.vb.icon(m(p).archived ? "undo" : "check", 18), !0), v(r);
		var a = w(r, 2);
		F(a, () => n.vb.icon("trash", 18), !0), v(a), o((e, t, n, i) => {
			z(r, "title", e), z(r, "aria-label", t), z(a, "title", n), z(a, "aria-label", i);
		}, [
			() => m(p).archived ? n.vb.t("Desarquivar épico") : n.vb.t("Arquivar épico (concluído)"),
			() => m(p).archived ? n.vb.t("Desarquivar épico") : n.vb.t("Arquivar épico"),
			() => n.vb.t("Apagar épico"),
			() => n.vb.t("Apagar épico")
		]), i(e, t);
	};
	U(ne, (e) => {
		m(p) && e(re);
	});
	var I = w(ne, 2);
	F(I, () => n.vb.icon("sidebar", 20), !0), v(I), v(M), v(j);
	var ie = w(j, 2), L = y(ie);
	let ae;
	var oe = y(L);
	F(oe, () => n.vb.roomMark("ri roomIco"));
	var se = w(oe), ce = r(se, !0), le = w(se, 2), ue = (e) => {
		var t = Bi(), r = y(t);
		F(r, () => n.vb.icon("pencil", 13));
		var a = w(r);
		v(t), o((e, n) => {
			z(t, "title", e), H(a, ` ${n ?? ""}`);
		}, [() => n.vb.t("Renomear"), () => n.vb.t("editar")]), i(e, t);
	}, de = R(() => !n.thread.startsWith("pre:"));
	U(le, (e) => {
		m(de) && e(ue);
	});
	var fe = w(le, 2);
	F(fe, () => n.vb.waitPill("main"));
	var pe = w(fe), me = r(pe, !0);
	v(L);
	var he = w(L, 2), ge = (e) => {
		var t = Vi(), a = y(t);
		let s;
		var c = y(a), l = w(c), u = r(l, !0);
		v(a);
		var d = w(a, 2);
		let f;
		var p = y(d), b = w(p), x = r(b, !0);
		v(d), v(t), o((e, t) => {
			z(a, "aria-selected", !m(_)), s = B(a, 1, "", null, s, { on: !m(_) }), H(c, `${e ?? ""} `), H(u, m(h).length), z(d, "aria-selected", m(_)), f = B(d, 1, "", null, f, { on: m(_) }), H(p, `${t ?? ""} `), H(x, m(g).length);
		}, [() => n.vb.t("Épicos"), () => n.vb.t("Arquivados")]), i(e, t);
	};
	U(he, (e) => {
		m(g).length && e(ge);
	});
	var V = w(he, 2);
	let _e;
	var ve = y(V);
	P(ve, 17, () => m(_) ? m(g) : m(h), (e) => e.id, (e, t) => {
		a(e, () => m(t));
	});
	var ye = w(ve, 2), be = (e) => {
		var t = Ui(), a = W(t), s = y(a), c = w(s);
		F(c, () => n.vb.icon("plus"), !0), v(c), v(a);
		var l = w(a, 2);
		P(l, 17, () => n.room.suggestions, ee, (e, t, a) => {
			var s = Hi();
			let c;
			z(s, "data-thread", `pre:${a}`);
			var l = y(s), u = r(l, !0), d = w(l), f = r(d, !0), p = w(d), h = r(p, !0);
			v(s), o((e, r) => {
				c = B(s, 1, "thread pre", null, c, { sel: n.thread === `pre:${a}` }), z(s, "title", e), H(u, r), H(f, m(t).title), H(h, m(t).tasks.length || "");
			}, [() => `${m(t).title} · ${n.vb.t("sugestão do @vibe, clique para ver")}`, () => n.vb.initials(m(t).title)]), i(e, s);
		}), o((e, t, n) => {
			z(s, "placeholder", e), z(s, "aria-label", t), z(c, "aria-label", n);
		}, [
			() => n.vb.t("Novo épico: escreva o título…"),
			() => n.vb.t("Novo épico"),
			() => n.vb.t("Criar épico")
		]), i(e, t);
	};
	U(ye, (e) => {
		m(_) || e(be);
	}), v(V), v(ie);
	var xe = w(ie, 2);
	F(xe, () => n.vb.pinsSec());
	var Se = w(xe, 2), Ce = y(Se), we = (e) => {
		var t = Gi(), a = y(t), s = r(a, !0), c = w(a, 2);
		P(c, 17, () => n.room.requests, (e) => e.email, (e, t) => {
			var a = Wi(), s = y(a);
			F(s, () => n.vb.avatar(m(t).email));
			var c = w(s, 2), l = y(c), u = r(l, !0), d = w(l), f = y(d), p = w(f), h = r(p, !0);
			v(d), v(c);
			var g = w(c, 2);
			F(g, () => n.vb.icon("x"), !0), v(g), v(a), o((e, n, r, i, a, o, s) => {
				z(l, "title", e), H(u, n), H(f, `${r ?? ""} · `), z(p, "data-ask", m(t).email), z(p, "title", i), H(h, a), z(g, "data-ask", m(t).email), z(g, "aria-label", o), z(g, "title", s);
			}, [
				() => `${m(t).email} · ${n.vb.t("pediu {ago}", { ago: n.vb.ago(m(t).ts) })}`,
				() => m(t).name || m(t).email.split("@")[0],
				() => n.vb.t("pediu {ago}", { ago: n.vb.ago(m(t).ts) }),
				() => n.vb.t("Liberar: entra na sala e recebe o link por email"),
				() => n.vb.t("liberar"),
				() => n.vb.t("Recusar {email}", { email: m(t).email }),
				() => n.vb.t("Recusar")
			]), i(e, a);
		}), v(t), o((e) => H(s, e), [() => n.vb.t("Pedindo pra entrar")]), i(e, t);
	};
	U(Ce, (e) => {
		n.room.requests?.length && e(we);
	});
	var Te = w(Ce, 2), Ee = r(Te, !0), De = w(Te, 2);
	F(De, () => n.vb.sbxRows());
	var Oe = w(De, 2);
	P(Oe, 16, () => m(b), (e) => e, (e, t) => {
		s(e, () => t);
	});
	var ke = w(Oe, 2), Ae = (e) => {
		var t = Ki(), a = y(t), c = r(a, !0), u = w(a);
		P(u, 16, () => m(x), (e) => e, (e, t) => {
			s(e, () => t);
		}), v(t), o((e) => {
			t.open = l().off, H(c, e);
		}, [() => n.vb.t("{n} offline", { n: m(x).length })]), i(e, t);
	};
	U(ke, (e) => {
		m(x).length && e(Ae);
	});
	var je = w(ke, 2), Me = (e) => {
		var t = Ji(), a = y(t), s = r(a), c = w(a, 2);
		P(c, 16, () => m(C), (e) => e, (e, t) => {
			var a = qi(), s = y(a);
			F(s, () => n.vb.avatar(t));
			var c = w(s), l = r(c, !0), u = w(c);
			F(u, () => n.vb.icon("plus"), !0), v(u), v(a), o((e, n) => {
				z(a, "data-add", t), z(a, "title", e), H(l, n);
			}, [() => n.vb.t("Adicionar {email}", { email: t }), () => n.vb.name(t)]), i(e, a);
		}), v(t), o((e) => {
			t.open = l().friends ?? n.room.members.length <= 1, H(s, `${e ?? ""} · ${m(C).length ?? ""}`);
		}, [() => n.vb.t("Seus amigos")]), i(e, t);
	};
	U(je, (e) => {
		m(C).length && e(Me);
	});
	var Ne = w(je, 2), Pe = y(Ne), Fe = w(Pe);
	F(Fe, () => n.vb.icon("plus"), !0), v(Fe), v(Ne);
	var Ie = w(Ne, 2);
	P(Ie, 21, () => m(C), ee, (e, t) => {
		var n = Yi(), r = {};
		o(() => {
			r !== (r = m(t)) && (n.value = (n.__value = r) ?? "");
		}), i(e, n);
	}), v(Ie), v(Se), o((e, t, r, i, a, o, s, c, l, u) => {
		z(E, "aria-label", e), z(I, "title", t), z(I, "aria-label", r), ae = B(L, 1, "thread", null, ae, {
			sel: n.thread === "main",
			waiting: i
		}), z(L, "title", a), H(ce, o), H(me, s), _e = B(V, 1, "epList", null, _e, { arch: m(_) }), H(Ee, c), z(Pe, "placeholder", l), z(Fe, "aria-label", u);
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
	]), i(t, T), k();
}
// svelte/Message.svelte
var Qi = x("<span class=\"gut\"> </span>"), $i = x(" <span class=\"agentTag\">agent</span>", 1), ea = x("<span class=\"doneTag\"> </span>"), ta = x("<div><!> <!> <span class=\"mact\"><button type=\"button\" class=\"rbtn\"><!> </button> <button type=\"button\" class=\"rbtn\"><!> </button> <button type=\"button\" class=\"rbtn\"><!> </button></span> <div class=\"body\"><!> <div class=\"who\"><!> <!> <span class=\"hhmm\"> </span></div> <div class=\"txt\"></div> <!> <!> <!> <!> <!></div></div>");
function na(e, t) {
	D(t, !0);
	let n = S(t, "origin", 3, !1), s = R(() => t.vb.continues(t.previous, t.message)), c = R(() => t.message.tag === "reminder" ? t.vb.remHtml(t.message, n()) : t.message.tag === "issue" ? t.vb.issueHtml(t.message) : t.vb.isNotice(t.message) ? t.vb.noticeHtml(t.message) : null), l = R(() => n() && m(c) ? m(c).replace(/\sid="m\d+"/, "") : m(c)), u = R(() => !t.message.text && t.typing ? `<span class="typing">${t.vb.esc(t.vb.typingNote?.(t.message.id) || t.vb.t("pensando ({mode})", { mode: t.vb.typingLabel?.(t.typing) ?? t.typing }))}…</span>` : t.message.author === "ai" ? t.message.text ? t.vb.mentions(t.vb.md(t.message.text)) : t.message.poll ? "" : `<span class="typing">${t.vb.t("pensando…")}</span>` : t.message.text ? t.vb.mentions(t.message.kind === "agent" ? t.vb.md(t.message.text) : t.vb.linkify(t.vb.esc(t.message.text))) : ""), d = R(() => t.vb.dateTime?.(t.message.ts) ?? new Date(t.message.ts).toLocaleString());
	var f = V(), p = W(f), h = (e) => {
		var t = V(), n = W(t);
		F(n, () => m(l)), i(e, t);
	}, g = (e) => {
		var c = ta();
		let l;
		var f = y(c);
		F(f, () => t.message.kind === "agent" ? t.vb.agentAvatar(t.message.author, t.message.via) : t.vb.avatar(t.message.author));
		var p = w(f, 2), h = (e) => {
			var n = Qi(), a = r(n, !0);
			o((e) => {
				z(n, "title", m(d)), H(a, e);
			}, [() => t.vb.hhmm(t.message.ts)]), i(e, n);
		};
		U(p, (e) => {
			m(s) && e(h);
		});
		var g = w(p, 2), _ = y(g), b = y(_);
		F(b, () => t.vb.icon("copy", 14));
		var x = w(b);
		v(_);
		var S = w(_, 2), C = y(S);
		F(C, () => t.vb.icon("link", 14));
		var T = w(C);
		v(S);
		var E = w(S, 2), D = y(E);
		F(D, () => t.vb.icon("reply", 14));
		var O = w(D);
		v(E), v(g);
		var k = w(g, 2), A = y(k), ee = (e) => {
			var n = V(), r = W(n);
			F(r, () => t.vb.quoteHtml(t.message.reply_to)), i(e, n);
		};
		U(A, (e) => {
			t.message.reply_to && e(ee);
		});
		var j = w(A, 2), M = y(j), te = (e) => {
			var n = $i(), r = W(n), a = w(r);
			o((e, t) => {
				H(r, `${e ?? ""} `), z(a, "title", t);
			}, [() => t.vb.t("{via} de {who}", {
				via: t.message.via || "agent",
				who: t.vb.name(t.message.author)
			}), () => t.vb.t("Escrito pelo agent dessa pessoa, em nome dela")]), i(e, n);
		}, N = (e) => {
			var n = a();
			o((e) => H(n, e), [() => t.vb.name(t.message.author)]), i(e, n);
		};
		U(M, (e) => {
			t.message.kind === "agent" ? e(te) : e(N, -1);
		});
		var ne = w(M, 2), re = (e) => {
			var n = ea(), a = r(n);
			o((e, t) => {
				z(n, "title", e), H(a, `✓ ${t ?? ""}`);
			}, [() => t.vb.t("Reporta algo entregue"), () => t.vb.t("entregue")]), i(e, n);
		};
		U(ne, (e) => {
			t.message.tag === "done" && e(re);
		});
		var P = w(ne), I = w(P), ie = r(I, !0);
		v(j);
		var L = w(j, 2);
		F(L, () => m(u), !0), v(L);
		var ae = w(L, 2);
		F(ae, () => t.vb.attHtml(t.message.files));
		var oe = w(ae, 2), se = (e) => {
			var n = V(), r = W(n);
			F(r, () => t.vb.cardHtml(t.message)), i(e, n);
		};
		U(oe, (e) => {
			t.message.card && e(se);
		});
		var ce = w(oe, 2), le = (e) => {
			var n = V(), r = W(n);
			F(r, () => t.vb.choiceHtml(t.message)), i(e, n);
		};
		U(ce, (e) => {
			t.message.choices && e(le);
		});
		var ue = w(ce, 2), de = (e) => {
			var n = V(), r = W(n);
			F(r, () => t.vb.pollHtml(t.message.poll)), i(e, n);
		};
		U(ue, (e) => {
			t.message.poll && e(de);
		});
		var fe = w(ue, 2), R = (e) => {
			var n = V(), r = W(n);
			F(r, () => t.vb.threadCards(t.message.id)), i(e, n);
		};
		U(fe, (e) => {
			n() || e(R);
		}), v(k), v(c), o((e, r, i, a, o, f, p, h, g, v, y, b) => {
			l = B(c, 1, "msg", null, l, {
				ai: t.message.author === "ai",
				agent: t.message.author !== "ai" && t.message.kind === "agent",
				done: t.message.tag === "done",
				cont: m(s),
				waitMsg: e
			}), z(c, "id", n() ? void 0 : `m${t.message.id}`), z(_, "data-copymsg", t.message.id), z(_, "title", r), z(_, "aria-label", i), H(x, ` ${a ?? ""}`), z(S, "data-copylink", t.message.id), z(S, "title", o), z(S, "aria-label", f), H(T, ` ${p ?? ""}`), z(E, "data-reply", t.message.id), z(E, "title", h), z(E, "aria-label", g), H(O, ` ${v ?? ""}`), H(P, ` · ${y ?? ""}`), z(I, "title", m(d)), H(ie, b), z(L, "hidden", !m(u));
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
		]), i(e, c);
	};
	U(p, (e) => {
		m(l) === null ? e(g, -1) : e(h);
	}), i(e, f), k();
}
// svelte/Chat.svelte
var ra = x("<div class=\"older\"><button type=\"button\" class=\"ghost\" id=\"olderBtn\"> </button></div>"), ia = x("<div class=\"origin\"><!> <div class=\"replies\"><span> </span><button type=\"button\" class=\"ghost\"> <!></button></div></div>"), aa = x("<div><!></div>"), oa = x("<!> <!> <!>", 1);
function sa(e, t) {
	D(t, !0);
	let n = S(t, "more", 3, !1), s = S(t, "origin", 3, null), c = S(t, "replyCount", 3, 0);
	var l = V(), u = W(l);
	ge(u, () => t.room.id + ":" + t.thread, (e) => {
		var l = oa(), u = W(l), d = (e) => {
			var n = ra(), a = y(n), s = r(a, !0);
			v(n), o((e) => H(s, e), [() => t.vb.t("Carregar mensagens anteriores")]), L("click", a, function(...e) {
				t.onloadolder?.apply(this, e);
			}), i(e, n);
		};
		U(u, (e) => {
			t.list.length && n() && e(d);
		});
		var f = w(u, 2), p = (e) => {
			var n = ia(), a = y(n);
			na(a, {
				get message() {
					return s();
				},
				origin: !0,
				get typing() {
					return t.room.typing[s().id];
				},
				get vb() {
					return t.vb;
				}
			});
			var l = w(a, 2), u = y(l), d = r(u, !0), f = w(u), p = y(f), m = w(p);
			F(m, () => t.vb.icon("reply", 13)), v(f), v(l), v(n), o((e, t) => {
				H(d, e), z(f, "data-gomain", s().id), H(p, `${t ?? ""} `);
			}, [() => c() === 1 ? t.vb.t("1 resposta") : t.vb.t("{n} respostas", { n: c() }), () => t.vb.t("ver na sala principal")]), i(e, n);
		};
		U(f, (e) => {
			s() && e(p);
		});
		var h = w(f, 2), g = (e) => {
			var n = V(), r = W(n);
			P(r, 19, () => t.list, (e) => e.id, (e, n, r) => {
				{
					let i = R(() => m(r) ? t.list[m(r) - 1] : t.previous);
					na(e, {
						get message() {
							return m(n);
						},
						get previous() {
							return m(i);
						},
						get typing() {
							return t.room.typing[m(n).id];
						},
						get vb() {
							return t.vb;
						}
					});
				}
			}), i(e, n);
		}, _ = (e) => {
			var n = aa();
			let r;
			var c = y(n), l = (e) => {
				var n = V(), r = W(n);
				F(r, () => t.vb.t("Comece a conversa. Os agents ligados nesta sala leem e respondem; o seu age com o seu OK. Ex.: <i>organiza o projeto em épicos: site novo, aluguéis e domínio</i>.")), i(e, n);
			}, u = (e) => {
				var n = a();
				o((e) => H(n, e), [() => t.vb.t("Discussão deste épico. Os agents leem as tarefas, o doc e a sala principal.")]), i(e, n);
			};
			U(c, (e) => {
				t.thread === "main" ? e(l) : e(u, -1);
			}), v(n), o(() => r = B(n, 1, "empty", null, r, { afterOrigin: !!s() })), i(e, n);
		};
		U(h, (e) => {
			t.list.length ? e(g) : e(_, -1);
		}), i(e, l);
	}), i(e, l), k();
}
g(["click"]);
// svelte/roomStore.ts
function ca(e, t, n) {
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
function la() {
	let e = O(null);
	return {
		subscribe: e.subscribe,
		get: () => u(e),
		replace: e.set,
		apply(t, n) {
			return e.update((e) => ca(e, t, n)), u(e);
		}
	};
}
// svelte/main.ts
var ua = /* @__PURE__ */ ve({
	createRoomStore: () => la,
	mountInbox: () => pa,
	mountView: () => fa
}), da = {
	tasks: Ie,
	board: rt,
	files: ft,
	reminders: ji,
	sidebar: Zi,
	chat: sa
};
function fa(e, t, n) {
	let r = O(n), i = da[e], a = p(() => M(ye, {
		target: t,
		props: {
			component: i,
			values: r
		}
	}));
	return {
		update(e) {
			p(() => r.set(e));
		},
		destroy() {
			p(() => {
				b(a);
			});
		}
	};
}
function pa(e, t) {
	let { waits: n, ...r } = t, i = O(n), a = p(() => M(Ee, {
		target: e,
		props: {
			props: r,
			waits: i
		}
	}));
	return Object.assign(() => p(() => {
		b(a);
	}), { updateWaits(e) {
		p(() => i.set(e));
	} });
}
export { Si as a, be as c, la as i, pa as n, yi as o, fa as r, vi as s, ua as t };
