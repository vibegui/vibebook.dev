import { L as e, O as t, P as n, V as r, W as i, c as a, j as o, k as s, l as c, t as l, v as u, z as d } from "./Button-Cx7HMFHY.js";
import { A as f, Et as p, F as m, G as h, Mn as g, Tt as _, Yt as v, j as y, lt as b, q as x, qt as S, u as C, z as w } from "./shared-qe__81Sz.js";
import { t as T } from "./Icon-Ch3wLUmI.js";
import { t as ee } from "./IconButton-C3NNuUw1.js";
import { i as E, n as D, r as O } from "./model-DB-4wSKi.js";
// svelte/Files.svelte
var k = r(" <small> </small>", 1), A = r("<div class=\"tw:flex tw:flex-wrap tw:gap-1\"></div>"), te = r("<div class=\"tw:flex tw:items-center tw:gap-2\"><!><!><b> </b></div>"), j = r("<!><b> </b><small> </small>", 1), M = r("<img class=\"tw:h-24 tw:w-full tw:rounded-md tw:object-contain\" loading=\"lazy\"/>"), N = r("<!> <b class=\"tw:break-all\"> </b><small class=\"tw:text-muted-foreground\"> </small>", 1), P = r("<article class=\"tw:min-w-0 tw:rounded-lg tw:border tw:border-border tw:bg-card tw:p-3\"><!> <!></article>"), F = r("<p> </p>"), I = r("<!> <!> <div class=\"tw:grid tw:grid-cols-2 tw:gap-3 tw:sm:grid-cols-3\"><!> <!></div> <!>", 1), L = r("<p role=\"status\"> </p>"), R = r("<p role=\"alert\" class=\"tw:text-destructive\"> </p> <!>", 1), z = r("<p role=\"alert\" class=\"tw:text-destructive\"> </p>"), B = r("<section data-vb-native=\"files\" class=\"tw:flex tw:flex-col tw:gap-3 tw:p-3 tw:font-sans tw:text-sm tw:text-foreground\"><!> <!> <!> <!></section>");
function V(r, V) {
	p(V, !0);
	let H = () => c(C(K), "$fileState", U), [U, W] = a(), G = !1;
	n(() => (G = !0, () => {
		G = !1;
	}));
	let K = b(() => V.session.state), q = b(() => O(V.room, H().kind, H().directory));
	y(() => {
		V.session.sync(V.room);
	});
	let J = (e) => e === "unconfirmed" ? V.vb.t("Ainda não recebi a confirmação. Confira antes de tentar de novo.") : e;
	function Y(e, t, n = !1) {
		G && (V.session.select(e, t), n && V.onfolderchange());
	}
	var X = B(), Z = m(X), ne = (n) => {
		var r = I(), a = w(r), c = (n) => {
			var r = A();
			t(r, 21, () => D.filter(([e]) => C(q).counts[e]), s, (t, n) => {
				var r = b(() => g(C(n), 2));
				let i = () => C(r)[0], a = () => C(r)[1];
				{
					let n = b(() => C(q).kind === i() ? "secondary" : "ghost"), r = b(() => C(q).kind === i());
					l(t, {
						get variant() {
							return C(n);
						},
						size: "sm",
						get "data-fkind"() {
							return i();
						},
						get "aria-pressed"() {
							return C(r);
						},
						onclick: () => Y(i(), C(q).dir),
						children: (t, n) => {
							S();
							var r = k(), o = w(r), s = x(o), c = h(s, !0);
							f((t) => {
								e(o, `${t ?? ""} `), e(c, C(q).counts[i()]);
							}, [() => V.vb.t(a())]), d(t, r);
						},
						$$slots: { default: !0 }
					});
				}
			}), v(r), f((e) => u(r, "aria-label", e), [() => V.vb.t("Arquivos")]), d(n, r);
		};
		o(a, (e) => {
			C(q).counts.all > 1 && e(c);
		});
		var p = x(a, 2), _ = (t) => {
			var n = te(), r = m(n);
			l(r, {
				variant: "ghost",
				size: "sm",
				onclick: () => Y(C(q).kind, C(q).dir.includes("/") ? C(q).dir.slice(0, C(q).dir.lastIndexOf("/")) : "", !0),
				children: (t, n) => {
					S();
					var r = i();
					f((t) => e(r, `← ${t ?? ""}`), [() => V.vb.t("voltar")]), d(t, r);
				},
				$$slots: { default: !0 }
			});
			var a = x(r);
			T(a, { name: "folder" });
			var o = x(a), s = h(o);
			v(n), f(() => e(s, `${C(q).dir ?? ""}/`)), d(t, n);
		};
		o(p, (e) => {
			C(q).dir && e(_);
		});
		var y = x(p, 2), O = m(y);
		t(O, 17, () => C(q).folders, s, (t, n) => {
			var r = b(() => g(C(n), 2));
			let i = () => C(r)[0], a = () => C(r)[1];
			{
				let n = b(() => C(q).prefix + i());
				l(t, {
					get "data-fdir"() {
						return C(n);
					},
					variant: "outline",
					class: "tw:h-auto tw:flex-col tw:items-start tw:whitespace-normal tw:p-3",
					onclick: () => Y(C(q).kind, C(q).prefix + i(), !0),
					children: (t, n) => {
						var r = j(), o = w(r);
						T(o, {
							name: "folder",
							class: "tw:size-8"
						});
						var s = x(o), c = h(s), l = x(s), u = h(l, !0);
						f((t) => {
							e(c, `${i() ?? ""}/`), e(u, t);
						}, [() => a() === 1 ? V.vb.t("1 arquivo") : V.vb.t("{n} arquivos", { n: a() })]), d(t, r);
					},
					$$slots: { default: !0 }
				});
			}
		});
		var L = x(O, 2);
		t(L, 17, () => C(q).list, (e) => e.id, (t, n) => {
			let r = b(() => V.room.pins?.some((e) => e.kind === "file" && e.ref === C(n).id) ?? !1);
			var i = P(), a = m(i);
			l(a, {
				variant: "ghost",
				class: "tw:h-auto tw:w-full tw:min-w-0 tw:flex-col tw:items-start tw:gap-2 tw:whitespace-normal tw:p-0 tw:text-left",
				get title() {
					return C(n).name;
				},
				onclick: (e) => {
					G && e.currentTarget.isConnected && V.session.open(C(n), V.onopenfile);
				},
				children: (t, r) => {
					var i = N(), a = w(i), s = (e) => {
						var t = M();
						f((e) => {
							u(t, "src", e), u(t, "alt", C(n).name);
						}, [() => `/api/books/${encodeURIComponent(V.room.id)}/files/${encodeURIComponent(C(n).id)}`]), d(e, t);
					}, c = b(() => C(n).type.startsWith("image/")), l = (e) => {
						T(e, {
							name: "file",
							class: "tw:size-8"
						});
					};
					o(a, (e) => {
						C(c) ? e(s) : e(l, -1);
					});
					var p = x(a, 2), m = h(p, !0), g = x(p), _ = h(g);
					f((t, n, r, i) => {
						e(m, t), e(_, `${n ?? ""} · ${r ?? ""} · ${i ?? ""}`);
					}, [
						() => C(n).name.slice(C(q).prefix.length),
						() => V.vb.name(C(n).author),
						() => V.vb.ago(C(n).ts),
						() => (C(q).versions.get(C(n).name) ?? 0) > 1 ? V.vb.t("{n} versões", { n: C(q).versions.get(C(n).name) }) : E(C(n).size)
					]), d(t, i);
				},
				$$slots: { default: !0 }
			});
			var s = x(a, 2);
			{
				let e = b(() => V.vb.t(C(r) ? "Desafixar" : "Fixar na lateral")), t = b(() => !!H().pending), i = b(() => H().pending?.id === C(n).id);
				ee(s, {
					icon: "pin",
					get label() {
						return C(e);
					},
					get "aria-pressed"() {
						return C(r);
					},
					get disabled() {
						return C(t);
					},
					get loading() {
						return C(i);
					},
					onclick: (e) => {
						G && e.currentTarget.isConnected && V.session.toggle(C(n), V.request);
					}
				});
			}
			v(i), f(() => u(i, "data-file-id", C(n).id)), d(t, i);
		}), v(y);
		var R = x(y, 2), z = (t) => {
			var n = F(), r = h(n, !0);
			f((t) => e(r, t), [() => V.vb.t("Nada aqui.")]), d(t, n);
		};
		o(R, (e) => {
			!C(q).list.length && !C(q).folders.length && e(z);
		}), d(n, r);
	}, re = (t) => {
		var n = F(), r = h(n, !0);
		f((t) => e(r, t), [() => V.vb.t("Cole uma imagem no chat (Cmd+V), arraste um arquivo ou use o clipe. Tudo que for enviado neste vibebook fica aqui.")]), d(t, n);
	};
	o(Z, (e) => {
		V.room.files?.length ? e(ne) : !H().loading && !H().loadError && e(re, 1);
	});
	var Q = x(Z, 2), ie = (t) => {
		var n = L(), r = h(n, !0);
		f((t) => e(r, t), [() => V.vb.t("Carregando…")]), d(t, n);
	};
	o(Q, (e) => {
		H().loading && e(ie);
	});
	var $ = x(Q, 2), ae = (t) => {
		var n = R(), r = w(n), a = h(r, !0), o = x(r, 2);
		l(o, {
			variant: "outline",
			onclick: () => {
				G && V.session.load(V.request);
			},
			children: (t, n) => {
				S();
				var r = i();
				f((t) => e(r, t), [() => V.vb.t("Tentar novamente")]), d(t, r);
			},
			$$slots: { default: !0 }
		}), f((t) => e(a, t), [() => J(H().loadError)]), d(t, n);
	};
	o($, (e) => {
		H().loadError && e(ae);
	});
	var oe = x($, 2), se = (t) => {
		var n = z(), r = h(n, !0);
		f((t) => e(r, t), [() => J(H().error)]), d(t, n);
	};
	o(oe, (e) => {
		H().error && e(se);
	}), v(X), f((e) => u(X, "aria-label", e), [() => V.vb.t("Arquivos")]), d(r, X), _(), W();
}
export { V as default };
