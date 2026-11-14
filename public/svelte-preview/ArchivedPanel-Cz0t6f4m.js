import { G as e, K as t, L as n, N as r, O as i, P as a, S as o, T as s, V as c, W as l, c as u, j as d, l as f, n as p, t as m, v as ee, x as h, z as g } from "./Button-Cx7HMFHY.js";
import { A as _, Et as v, F as y, G as b, P as x, Tt as S, Yt as C, b as w, h as T, lt as E, q as D, qt as O, u as k, z as A } from "./shared-qe__81Sz.js";
import { t as j } from "./Card-CRyy0OGL.js";
import { t as M } from "./Heading-Dkd8XMpq.js";
import { t as N } from "./session-P9zWY430.js";
import { n as P, t as te } from "./copy-B66YGk9H.js";
import { m as F, u as I } from "./model-B78l00ZB.js";
// svelte/features/home/ArchivedPanel.svelte
var L = c("<p role=\"status\"> </p>"), R = c("<p class=\"tw:m-0 tw:break-words tw:text-muted-foreground\"> </p>"), z = c("<div class=\"tw:grid tw:h-24 tw:place-items-center tw:rounded-control tw:bg-muted tw:text-2xl tw:font-semibold\"> </div> <!><!> <p class=\"tw:m-0 tw:text-xs tw:text-muted-foreground\"> </p> <div class=\"tw:flex tw:flex-wrap tw:gap-2\"><a> </a><!></div>", 1), ne = c("<p> </p>"), re = c("<p role=\"alert\" class=\"tw:break-words tw:text-destructive\"> </p> <!>", 1), ie = c("<main data-vb-native=\"archived\" class=\"tw:min-h-dvh tw:bg-background tw:p-4 tw:font-sans tw:text-sm tw:leading-6 tw:text-foreground tw:sm:p-8\"><div class=\"tw:mx-auto tw:max-w-5xl tw:space-y-6\"><header class=\"tw:flex tw:flex-wrap tw:items-start tw:justify-between tw:gap-3\"><div><!> <p class=\"tw:m-0 tw:text-muted-foreground\"> </p></div> <a href=\"/app?ui=svelte\"> </a></header> <!> <div class=\"tw:grid tw:gap-4 tw:sm:grid-cols-2\"></div> <!> <!></div></main>");
function B(e, c) {
	v(c, !0);
	let B = () => f(U, "$view", ae), [ae, V] = u(), H = T(() => N(c.personal)), U = H.state, W = (e, t) => P(c.lang, e, t);
	r(() => H.dispose()), a(() => {
		let e = c.personal.peek(), t = c.personal.state.subscribe(({ me: t }) => {
			e && t && t !== e && H.load(), e = t;
		});
		return H.load(), () => {
			t(), H.dispose();
		};
	});
	var G = ie();
	s("1j7clo8", (e) => {
		w((e) => {
			x.title = `${e ?? ""} · vibebook`;
		}, [() => W("archive")]);
	});
	var K = y(G), q = y(K), J = y(q), Y = y(J);
	M(Y, {
		level: 1,
		class: "tw:m-0 tw:text-2xl tw:font-semibold",
		children: (e, t) => {
			O();
			var r = l();
			_((e) => n(r, e), [() => W("archive")]), g(e, r);
		},
		$$slots: { default: !0 }
	});
	var oe = D(Y, 2), se = b(oe, !0);
	C(J);
	var X = D(J, 2), ce = b(X, !0);
	C(q);
	var Z = D(q, 2), le = (e) => {
		var t = L(), r = b(t, !0);
		_((e) => n(r, e), [() => W(B().loaded ? "refreshing" : "loading")]), g(e, t);
	};
	d(Z, (e) => {
		B().loading && e(le);
	});
	var Q = D(Z, 2);
	i(Q, 5, () => B().books, (e) => e.id, (e, r) => {
		j(e, {
			class: "tw:space-y-3",
			children: (e, i) => {
				var a = z(), s = A(a), u = b(s, !0), f = D(s, 2);
				M(f, {
					level: 2,
					class: "tw:m-0 tw:break-words tw:text-lg tw:font-semibold",
					children: (e, t) => {
						O();
						var i = l();
						_(() => n(i, k(r).title)), g(e, i);
					},
					$$slots: { default: !0 }
				});
				var v = D(f), x = (e) => {
					var t = R(), i = b(t, !0);
					_(() => n(i, k(r).summary)), g(e, t);
				};
				d(v, (e) => {
					k(r).summary && e(x);
				});
				var S = D(v, 2), w = b(S, !0), T = D(S, 2), j = y(T), N = b(j, !0), P = D(j);
				{
					let e = E(() => B().pending === k(r).id), t = E(() => !!B().pending);
					m(P, {
						variant: "outline",
						get loading() {
							return k(e);
						},
						get disabled() {
							return k(t);
						},
						onclick: (e) => {
							e.currentTarget.isConnected && H.restore(k(r).id);
						},
						children: (e, t) => {
							O();
							var r = l();
							_((e) => n(r, e), [() => W("restore")]), g(e, r);
						},
						$$slots: { default: !0 }
					});
				}
				C(T), _((e, t, r, i, a) => {
					n(u, e), n(w, t), ee(j, "href", r), h(j, 1, i), n(N, a);
				}, [
					() => I(k(r).title),
					() => W("archivedAgo", { ago: c.ago(k(r).archived_at) }),
					() => F({ roomId: k(r).id }),
					() => o(p({ variant: "ghost" })),
					() => W("open")
				]), t("click", j, (e) => {
					e.ctrlKey || e.metaKey || e.shiftKey || e.altKey || (e.preventDefault(), e.currentTarget.isConnected && c.onnavigate({ roomId: k(r).id }));
				}), g(e, a);
			},
			$$slots: { default: !0 }
		});
	}), C(Q);
	var $ = D(Q, 2), ue = (e) => {
		var t = ne(), r = b(t, !0);
		_((e) => n(r, e), [() => W("noArchived")]), g(e, t);
	};
	d($, (e) => {
		B().loaded && !B().books.length && e(ue);
	});
	var de = D($, 2), fe = (e) => {
		var t = re(), r = A(t), i = b(r, !0), a = D(r, 2);
		m(a, {
			variant: "outline",
			get loading() {
				return B().loading;
			},
			onclick: (e) => {
				e.currentTarget.isConnected && H.load();
			},
			children: (e, t) => {
				O();
				var r = l();
				_((e) => n(r, e), [() => W("retry")]), g(e, r);
			},
			$$slots: { default: !0 }
		}), _((e) => n(i, e), [() => te(c.lang, B().error)]), g(e, t);
	};
	d(de, (e) => {
		B().error && e(fe);
	}), C(K), C(G), _((e, t, r) => {
		n(se, e), h(X, 1, t), n(ce, r);
	}, [
		() => W("archived"),
		() => o(p({ variant: "outline" })),
		() => W("back")
	]), t("click", X, (e) => {
		!e.currentTarget.isConnected || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey || (e.preventDefault(), c.onhome());
	}), g(e, G), S(), V();
}
e(["click"]);
export { B as default };
