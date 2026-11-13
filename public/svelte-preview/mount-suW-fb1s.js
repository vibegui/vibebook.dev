import { $ as e, Ct as t, G as n, Gt as r, L as i, M as a, N as o, O as s, U as c, Z as l, c as u, f as d, k as f, n as p, p as m, qt as h, st as g, t as _, v, wt as y } from "./shared-Cn4mm4KY.js";
import { A as b, C as x, D as S, E as C, H as w, I as T, J as E, K as D, L as O, N as k, R as A, S as j, T as M, U as N, V as P, Y as F, a as I, c as L, i as R, l as z, m as B, n as V, p as H, q as U, r as W, t as ee, u as G, z as K } from "./Card-CD0C77Sq.js";
import { f as q, h as te, m as J, o as ne, p as Y } from "./model-BLsF6N8q.js";
import { D as re, F as ie, P as ae, T as oe } from "./api-CwXbABNL.js";
// shared/nativeAuth.ts
var se = ae({
	page: oe([
		"login",
		"access",
		"consent",
		"file-access"
	]),
	lang: oe(["pt", "en"]),
	autoAccess: re(),
	consentFailure: ie(re())
}), ce = {
	login: "Entrar",
	welcome: "Seus vibebooks e seus amigos te esperando.",
	email: "Seu email",
	send: "Mandar código",
	check: "Confere seu email",
	sent: "Mandamos um código de 6 dígitos para {email}.",
	code: "Código",
	another: "usar outro email",
	google: "Continuar com Google",
	github: "Continuar com GitHub",
	or: "ou com email",
	retry: "Tentar novamente",
	loading: "Carregando…",
	waiting: "Aguardando…",
	network: "Algo deu errado. Tenta de novo.",
	timeout: "Ainda não recebi a confirmação. Confira antes de tentar de novo.",
	invalidEmail: "Email inválido.",
	invalidCode: "Digite o código de 6 dígitos.",
	googleError: "Não deu certo com o Google. Tenta com email.",
	githubError: "Não deu certo com o GitHub (precisa de um email principal verificado). Tenta com email.",
	missing: "Sala não encontrada",
	missingBody: "O link pode estar errado, ou a sala não existe mais.",
	open: "Abrir o vibebook",
	access: "Peça permissão para entrar no vibebook",
	closed: "Esta sala é fechada. Entre com seu email e peça acesso: quem está nela libera.",
	signinAsk: "Entrar e pedir acesso",
	signed: "Você entrou como {email}. Quem está na sala vê seu pedido e libera.",
	ask: "Pedir acesso",
	asked: "Pedido enviado.",
	askedBody: "Quando liberarem, você recebe um email com o link, e esta página abre a sala.",
	agent: "AI agent reading this? Read {origin}/llms.txt and follow it to set up vibebook, then join this room: {url}",
	connect: "Conectar {name} ao vibebook",
	as: "Conectado como {email}. Ele vai poder:",
	rooms: "Ver as salas em que você está, e só elas",
	read: "Ler as mensagens, o doc e as tarefas",
	post: "Postar nas salas em seu nome, marcado como “agent de você”",
	cant: "Ele não vê sua caixa de email, não convida ninguém sem você pedir e você desconecta quando quiser em vibebook.dev/app.",
	publisher: "Publicado por {domain}.",
	unverified: "Esse app se registrou sozinho: o nome não é verificado.",
	goes: "O acesso vai para {host}.",
	local: "Isso manda o acesso para um app no seu computador. Continue só se você acabou de pedir pra conectar.",
	scope: "Permissões solicitadas",
	allow: "Permitir",
	cancel: "Cancelar",
	other: "Não é você? Entrar com outro email",
	continueLogout: "Continuar e sair",
	logoutCleanup: "Não consegui confirmar a remoção das notificações deste aparelho. Você pode continuar e sair; a limpeza das notificações pode estar incompleta.",
	reviewAgain: "Recarregar para revisar um novo pedido",
	return: "Voltar ao aplicativo",
	consentError: "Não foi possível conectar este aplicativo.",
	consentFailed: "A conexão não foi concluída. Tente novamente para revisar um novo pedido, ou volte ao seu agent e conecte de novo.",
	configError: "Esta página não tem uma configuração válida. Recarregue ou tente abrir o link de novo."
}, le = {
	login: "Sign in",
	welcome: "Your vibebooks and friends are waiting for you.",
	email: "Your email",
	send: "Send code",
	check: "Check your email",
	sent: "We sent a 6-digit code to {email}.",
	code: "Code",
	another: "use another email",
	google: "Continue with Google",
	github: "Continue with GitHub",
	or: "or with email",
	retry: "Try again",
	loading: "Loading…",
	waiting: "Waiting…",
	network: "Something went wrong. Try again.",
	timeout: "We haven't received confirmation yet. Check before trying again.",
	invalidEmail: "Invalid email.",
	invalidCode: "Enter the 6-digit code.",
	googleError: "Google sign-in didn't work. Try email.",
	githubError: "GitHub sign-in didn't work (a verified primary email is required). Try email.",
	missing: "Room not found",
	missingBody: "The link may be wrong, or the room no longer exists.",
	open: "Open vibebook",
	access: "Ask to join this vibebook",
	closed: "This room is closed. Sign in with your email and ask to join: someone in it lets you in.",
	signinAsk: "Sign in and ask to join",
	signed: "You're signed in as {email}. People in the room see your request and let you in.",
	ask: "Ask to join",
	asked: "Request sent.",
	askedBody: "When they let you in, you get an email with the link, and this page opens the room.",
	agent: "AI agent reading this? Read {origin}/llms.txt and follow it to set up vibebook, then join this room: {url}",
	connect: "Connect {name} to vibebook",
	as: "Signed in as {email}. It will be able to:",
	rooms: "See the rooms you're in, and only those",
	read: "Read messages, the doc and tasks",
	post: "Post in rooms for you, labeled as “your agent”",
	cant: "It can't see your email inbox, won't invite anyone unless you ask, and you can disconnect it anytime at vibebook.dev/app.",
	publisher: "Published by {domain}.",
	unverified: "This app registered itself; its name is not verified.",
	goes: "Access goes to {host}.",
	local: "This sends access to an app on your computer. Continue only if you just asked to connect.",
	scope: "Requested permissions",
	allow: "Allow",
	cancel: "Cancel",
	other: "Not you? Sign in with another email",
	continueLogout: "Continue signing out",
	logoutCleanup: "Notification removal on this device is unconfirmed. You can continue signing out; notification cleanup may be incomplete.",
	reviewAgain: "Reload to review a new request",
	return: "Return to the app",
	consentError: "Couldn't connect this app.",
	consentFailed: "The connection was not completed. Retry to review a new request, or return to your agent and connect again.",
	configError: "This page has an invalid configuration. Reload or open the link again."
};
function X(e, t, n = {}) {
	return (e === "en" ? le[t] : ce[t]).replace(/\{(\w+)\}/g, (e, t) => n[t] ?? "");
}
function Z(e, t) {
	let n = {
		"consent-failed": "consentFailed",
		timeout: "timeout",
		network: "network",
		"invalid-email": "invalidEmail",
		"invalid-code": "invalidCode",
		google: "googleError",
		github: "githubError"
	};
	return Object.hasOwn(n, t) ? X(e, n[t]) : t;
}
// svelte/features/auth/AuthFrame.svelte
var ue = N("<a href=\"/\" class=\"tw:inline-flex tw:rounded-control tw:text-lg tw:font-semibold tw:text-foreground tw:no-underline tw:focus-visible:outline-2 tw:focus-visible:outline-ring\">vibebook</a> <h1 class=\"tw:m-0 tw:break-words tw:text-2xl tw:font-semibold tw:leading-8 tw:tracking-tight\"> </h1> <!>", 1), de = N("<main data-vb-native=\"auth\" class=\"tw:flex tw:min-h-dvh tw:items-center tw:justify-center tw:bg-background tw:p-4 tw:font-sans tw:text-sm tw:leading-6 tw:text-foreground\"><div class=\"tw:w-full tw:max-w-md\"><!></div></main>");
function Q(e, t) {
	var r = de();
	b("1mnnkta", (e) => {
		v(() => {
			a.title = `${t.title ?? ""} · vibebook`;
		});
	});
	var l = o(r), u = o(l);
	ee(u, {
		class: "tw:space-y-5 tw:p-6 tw:sm:p-8",
		children: (e, r) => {
			var a = ue(), o = n(i(a), 2), l = c(o, !0), u = n(o, 2);
			k(u, () => t.children), s(() => K(l, t.title)), P(e, a);
		},
		$$slots: { default: !0 }
	}), h(l), h(r), P(e, r);
}
// svelte/features/auth/navigation.ts
function $(e, t) {
	let n = "/app?ui=svelte";
	if (!e.startsWith("/") || e.startsWith("//") || /[\\\u0000-\u0020\u007f]/.test(e)) return n;
	let r = new URL(e, t);
	return r.origin !== new URL(t).origin || r.username || r.password ? n : /^\/api\/books\/[a-z0-9]+\/files\/[a-z0-9]+$/.test(r.pathname) ? r.pathname + r.search + r.hash : /^\/(?:app|archived|login|b\/[a-z0-9]+|authorize)$/.test(r.pathname) ? (r.searchParams.set("ui", "svelte"), r.pathname + r.search + r.hash) : n;
}
function fe(e) {
	if (!e) return null;
	try {
		let t = new URL(e);
		return ["http:", "https:"].includes(t.protocol) && !t.username && !t.password ? t.href : null;
	} catch {
		return null;
	}
}
// svelte/features/auth/session.ts
var pe = (e) => e instanceof Error ? e.message : "network";
function me(e, t, n, r, i = q) {
	let a = p({
		context: null,
		phase: "email",
		email: "",
		code: "",
		loading: !1,
		busy: !1,
		error: ""
	}), o = Y(i), s = (e) => a.update((t) => ({
		...t,
		loading: !1,
		busy: !1,
		error: pe(e)
	}));
	return {
		state: a,
		load() {
			if (!(!o.active() || _(a).loading || _(a).busy)) return a.update((e) => ({
				...e,
				loading: !0,
				error: ""
			})), o.run((n) => e.login(t, n), (e) => a.update((t) => ({
				...t,
				context: e,
				loading: !1,
				error: e.error ?? ""
			})), s);
		},
		email(e) {
			o.active() && a.update((t) => ({
				...t,
				email: e
			}));
		},
		code(e) {
			o.active() && a.update((t) => ({
				...t,
				code: e.replace(/\D/g, "").slice(0, 6)
			}));
		},
		back() {
			o.active() && (o.cancel(), a.update((e) => ({
				...e,
				phase: "email",
				code: "",
				busy: !1,
				error: ""
			})));
		},
		submit() {
			if (!o.active()) return;
			let t = _(a);
			if (!t.context || t.busy) return;
			let i = t.email.trim().toLowerCase();
			if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(i)) s(/* @__PURE__ */ Error("invalid-email"));
			else if (t.phase === "code" && !/^\d{6}$/.test(t.code)) s(/* @__PURE__ */ Error("invalid-code"));
			else return a.update((e) => ({
				...e,
				email: i,
				busy: !0,
				error: ""
			})), t.phase === "email" ? o.run((t) => e.start(i, t), () => a.update((e) => ({
				...e,
				phase: "code",
				code: "",
				busy: !1
			})), s) : o.run((r) => e.verify(i, t.code, $(t.context.next, n), r), (e) => {
				r($(e.next, n));
			}, s);
		},
		dispose() {
			o.dispose();
		}
	};
}
function he(e, t, n, r, i = q, a) {
	let o = p({
		context: null,
		loading: !1,
		busy: !1,
		error: "",
		signedOut: !1
	}), s = Y(i), c = !0, l = !1, u = null, d = () => {
		u !== null && i.cancel(u), u = null;
	}, f = a && /^#f[0-9a-f]{1,64}$/.test(a) ? `/b/${encodeURIComponent(t)}?ui=svelte${a}` : `/b/${encodeURIComponent(t)}?ui=svelte`, m = (e) => {
		let t = e instanceof J && e.status === 401;
		o.update((n) => ({
			...n,
			loading: !1,
			busy: !1,
			error: pe(e),
			signedOut: t
		})), !t && _(o).context?.state === "asked" && h();
	}, h = () => {
		d(), c && (u = i.schedule(() => {
			u = null, v();
		}, 15e3));
	};
	function g() {
		if (!(!c || _(o).loading || _(o).busy || _(o).context?.state !== "ask")) return o.update((e) => ({
			...e,
			busy: !0,
			error: ""
		})), s.run((n) => e.ask(t, n), () => {
			r(f);
		}, m);
	}
	function v() {
		if (!(!c || _(o).loading || _(o).busy)) return d(), o.update((e) => ({
			...e,
			loading: !0,
			error: ""
		})), s.run((n) => e.access(t, n), (e) => {
			o.update((t) => ({
				...t,
				context: e,
				loading: !1,
				signedOut: e.state === "out"
			})), e.state === "member" ? r(f) : e.state === "asked" ? h() : e.state === "ask" && n && !l && (l = !0, g());
		}, m);
	}
	return {
		state: o,
		load: v,
		ask: g,
		dispose() {
			c = !1, d(), s.dispose();
		}
	};
}
function ge(e, t, n = q, r = !1) {
	let i = p({
		context: null,
		loading: !1,
		error: r ? "consent-failed" : "",
		returnTo: null,
		signedOut: !1
	}), a = Y(n);
	return {
		state: i,
		load() {
			if (a.active() && !_(i).loading) return i.update((e) => ({
				...e,
				loading: !0,
				error: "",
				returnTo: null,
				signedOut: !1
			})), a.run((n) => e.consent(t, n), (e) => i.update((t) => ({
				...t,
				context: e,
				loading: !1,
				signedOut: !1
			})), (e) => i.update((t) => ({
				...t,
				loading: !1,
				error: pe(e),
				signedOut: e instanceof J && e.status === 401,
				returnTo: e instanceof J ? fe(e.returnTo) : null
			})));
		},
		dispose() {
			a.dispose();
		}
	};
}
// svelte/features/auth/LoginPage.svelte
var _e = N("<p role=\"status\" class=\"tw:m-0 tw:text-muted-foreground\"> </p>"), ve = N("<a> </a>"), ye = N("<p class=\"tw:m-0 tw:text-center tw:text-muted-foreground\"> </p>"), be = N("<p class=\"tw:m-0 tw:text-muted-foreground\"> </p> <div class=\"tw:flex tw:flex-col tw:gap-2\"><!> <!> <!></div>", 1), xe = N("<p class=\"tw:m-0 tw:break-words tw:text-muted-foreground\"> </p>"), Se = N("<!><!>", 1), Ce = N("<!> <form class=\"tw:space-y-3\"><!> <!> <!></form>", 1), we = N("<p role=\"alert\" class=\"tw:m-0 tw:whitespace-pre-wrap tw:break-words tw:text-destructive\"> </p>"), Te = N("<!> <!>", 1);
function Ee(a, p) {
	y(p, !0);
	let _ = () => B(T, "$view", v), [v, b] = H(), w = m(() => me(p.api, p.search, p.origin, p.navigate)), T = w.state, k = e(null), A = e(null), j = (e, t) => X(p.lang, e, t);
	z(() => (w.load(), () => w.dispose())), f(() => {
		let e = _().phase;
		_().context && d().then(() => {
			u(e === "email" ? k : A)?.focus();
		});
	});
	let M = g(() => $(_().context?.next ?? "/app", p.origin));
	{
		let e = g(() => _().phase === "email" ? j("login") : j("check"));
		Q(a, {
			get title() {
				return u(e);
			},
			children: (e, t) => {
				var a = Te(), d = i(a), f = (e) => {
					var t = _e(), n = c(t, !0);
					s((e) => K(n, e), [() => j("loading")]), P(e, t);
				}, m = (e) => {
					R(e, {
						onclick: () => w.load(),
						children: (e, t) => {
							r();
							var n = D();
							s((e) => K(n, e), [() => j("retry")]), P(e, n);
						},
						$$slots: { default: !0 }
					});
				}, g = (e) => {
					var t = Ce(), a = i(t), d = (e) => {
						var t = be(), r = i(t), a = c(r, !0), l = n(r, 2), d = o(l), f = (e) => {
							var t = ve(), n = c(t, !0);
							s((e, r, i) => {
								C(t, 1, e), x(t, "href", r), K(n, i);
							}, [
								() => S(I({ variant: "outline" })),
								() => `/auth/google/start?next=${encodeURIComponent(u(M))}`,
								() => j("google")
							]), E("click", t, (e) => {
								_().busy && e.preventDefault();
							}), P(e, t);
						};
						O(d, (e) => {
							_().context.providers.google && e(f);
						});
						var p = n(d, 2), m = (e) => {
							var t = ve(), n = c(t, !0);
							s((e, r, i) => {
								C(t, 1, e), x(t, "href", r), K(n, i);
							}, [
								() => S(I({ variant: "outline" })),
								() => `/auth/github/start?next=${encodeURIComponent(u(M))}`,
								() => j("github")
							]), E("click", t, (e) => {
								_().busy && e.preventDefault();
							}), P(e, t);
						};
						O(p, (e) => {
							_().context.providers.github && e(m);
						});
						var g = n(p, 2), v = (e) => {
							var t = ye(), n = c(t, !0);
							s((e) => K(n, e), [() => j("or")]), P(e, t);
						};
						O(g, (e) => {
							(_().context.providers.google || _().context.providers.github) && e(v);
						}), h(l), s((e) => K(a, e), [() => j("welcome")]), P(e, t);
					}, f = (e) => {
						var t = xe(), n = c(t, !0);
						s((e) => K(n, e), [() => j("sent", { email: _().email })]), P(e, t);
					};
					O(a, (e) => {
						_().phase === "email" ? e(d) : e(f, -1);
					});
					var p = n(a, 2), m = o(p), g = (e) => {
						var t = Se(), a = i(t);
						V(a, {
							for: "auth-email",
							children: (e, t) => {
								r();
								var n = D();
								s((e) => K(n, e), [() => j("email")]), P(e, n);
							},
							$$slots: { default: !0 }
						});
						var o = n(a);
						W(o, {
							id: "auth-email",
							type: "email",
							autocomplete: "email",
							required: !0,
							get disabled() {
								return _().busy;
							},
							get value() {
								return _().email;
							},
							oninput: (e) => w.email(e.currentTarget.value),
							get ref() {
								return u(k);
							},
							set ref(e) {
								l(k, e, !0);
							}
						}), P(e, t);
					}, v = (e) => {
						var t = Se(), a = i(t);
						V(a, {
							for: "auth-code",
							children: (e, t) => {
								r();
								var n = D();
								s((e) => K(n, e), [() => j("code")]), P(e, n);
							},
							$$slots: { default: !0 }
						});
						var o = n(a);
						W(o, {
							id: "auth-code",
							inputmode: "numeric",
							autocomplete: "one-time-code",
							maxlength: 6,
							pattern: "[0-9]6",
							required: !0,
							get disabled() {
								return _().busy;
							},
							get value() {
								return _().code;
							},
							oninput: (e) => {
								w.code(e.currentTarget.value), _().code.length === 6 && w.submit();
							},
							get ref() {
								return u(A);
							},
							set ref(e) {
								l(A, e, !0);
							}
						}), P(e, t);
					};
					O(m, (e) => {
						_().phase === "email" ? e(g) : e(v, -1);
					});
					var y = n(m, 2);
					R(y, {
						type: "submit",
						class: "tw:w-full",
						get loading() {
							return _().busy;
						},
						children: (e, t) => {
							r();
							var n = D();
							s((e) => K(n, e), [() => _().phase === "email" ? j("send") : j("login")]), P(e, n);
						},
						$$slots: { default: !0 }
					});
					var b = n(y, 2), T = (e) => {
						R(e, {
							variant: "ghost",
							onclick: () => w.back(),
							children: (e, t) => {
								r();
								var n = D();
								s((e) => K(n, e), [() => j("another")]), P(e, n);
							},
							$$slots: { default: !0 }
						});
					};
					O(b, (e) => {
						_().phase === "code" && e(T);
					}), h(p), s(() => x(p, "aria-busy", _().busy)), F("submit", p, (e) => {
						e.preventDefault(), w.submit();
					}), P(e, t);
				};
				O(d, (e) => {
					_().loading ? e(f) : _().context ? e(g, -1) : e(m, 1);
				});
				var v = n(d, 2), y = (e) => {
					var t = we(), n = c(t, !0);
					s((e) => K(n, e), [() => Z(p.lang, _().error)]), P(e, t);
				};
				O(v, (e) => {
					_().error && e(y);
				}), P(e, a);
			},
			$$slots: { default: !0 }
		});
	}
	t(), b();
}
U(["click"]);
// svelte/features/auth/AccessPage.svelte
var De = N("<p class=\"tw:m-0 tw:text-muted-foreground\"> </p>"), Oe = N("<p role=\"status\" class=\"tw:m-0 tw:text-muted-foreground\"> </p>"), ke = N("<p class=\"tw:m-0 tw:text-muted-foreground\"> </p> <a href=\"/app?ui=svelte\"> </a>", 1), Ae = N("<p class=\"tw:m-0 tw:text-muted-foreground\"> </p> <a> </a>", 1), je = N("<p class=\"tw:m-0 tw:break-words tw:text-muted-foreground\"> </p> <!>", 1), Me = N("<p role=\"status\" class=\"tw:m-0 tw:text-foreground\"> </p> <p class=\"tw:m-0 tw:text-muted-foreground\"> </p>", 1), Ne = N("<p role=\"alert\" class=\"tw:m-0 tw:break-words tw:text-destructive\"> </p> <!>", 1), Pe = N("<p class=\"tw:m-0 tw:break-words tw:text-xs tw:text-muted-foreground\"> </p>"), Fe = N("<!> <!> <!> <!>", 1);
function Ie(e, a) {
	y(a, !0);
	let o = () => B(p, "$view", l), [l, d] = H(), f = m(() => he(a.api, a.id, !a.fileId && a.auto, a.navigate, void 0, a.fileId ? `#f${a.fileId}` : void 0)), p = f.state, h = (e, t) => X(a.lang, e, t), _ = g(() => `/b/${encodeURIComponent(a.id)}?ui=svelte${a.fileId ? `#f${a.fileId}` : ""}`), v = g(() => `/login?ui=svelte&next=${encodeURIComponent(a.fileId ? u(_) : u(_) + "&pedir=1")}`);
	z(() => (f.load(), () => f.dispose()));
	{
		let t = g(() => o().context?.state === "missing" ? h("missing") : o().context?.title ?? h("access"));
		Q(e, {
			get title() {
				return u(t);
			},
			children: (e, t) => {
				var l = Fe(), d = i(l), p = (e) => {
					var t = De(), n = c(t, !0);
					s(() => K(n, a.lang === "en" ? "Only room members can open this file. Sign in or ask for room access." : "Só quem está na sala abre este arquivo. Entre ou peça acesso à sala.")), P(e, t);
				};
				O(d, (e) => {
					a.fileId && e(p);
				});
				var m = n(d, 2), g = (e) => {
					var t = Oe(), n = c(t, !0);
					s((e) => K(n, e), [() => h("loading")]), P(e, t);
				}, y = (e) => {
					var t = ke(), r = i(t), a = c(r, !0), o = n(r, 2), l = c(o, !0);
					s((e, t, n) => {
						K(a, e), C(o, 1, t), K(l, n);
					}, [
						() => h("missingBody"),
						() => S(I()),
						() => h("open")
					]), P(e, t);
				}, b = (e) => {
					var t = Ae(), r = i(t), a = c(r, !0), o = n(r, 2), l = c(o, !0);
					s((e, t, n) => {
						K(a, e), C(o, 1, t), x(o, "href", u(v)), K(l, n);
					}, [
						() => h("closed"),
						() => S(I()),
						() => h("signinAsk")
					]), P(e, t);
				}, w = (e) => {
					var t = je(), a = i(t), l = c(a, !0), u = n(a, 2);
					R(u, {
						get loading() {
							return o().busy;
						},
						onclick: () => f.ask(),
						children: (e, t) => {
							r();
							var n = D();
							s((e) => K(n, e), [() => h("ask")]), P(e, n);
						},
						$$slots: { default: !0 }
					}), s((e) => K(l, e), [() => h("signed", { email: o().context.email ?? "" })]), P(e, t);
				}, T = (e) => {
					var t = Me(), r = i(t), a = c(r), o = n(r, 2), l = c(o, !0);
					s((e, t) => {
						K(a, `✓ ${e ?? ""}`), K(l, t);
					}, [() => h("asked"), () => h("askedBody")]), P(e, t);
				};
				O(m, (e) => {
					o().loading && !o().context ? e(g) : o().context?.state === "missing" ? e(y, 1) : o().context?.state === "out" || o().signedOut ? e(b, 2) : o().context?.state === "ask" ? e(w, 3) : o().context?.state === "asked" && e(T, 4);
				});
				var E = n(m, 2), k = (e) => {
					var t = Ne(), l = i(t), u = c(l, !0), d = n(l, 2), p = (e) => {
						R(e, {
							variant: "outline",
							onclick: () => f.load(),
							children: (e, t) => {
								r();
								var n = D();
								s((e) => K(n, e), [() => h("retry")]), P(e, n);
							},
							$$slots: { default: !0 }
						});
					};
					O(d, (e) => {
						o().context?.state !== "ask" && e(p);
					}), s((e) => K(u, e), [() => Z(a.lang, o().error)]), P(e, t);
				};
				O(E, (e) => {
					o().error && e(k);
				});
				var A = n(E, 2), j = (e) => {
					var t = Pe(), n = c(t, !0);
					s((e) => K(n, e), [() => h("agent", {
						origin: a.origin,
						url: a.origin + u(_)
					})]), P(e, t);
				};
				O(A, (e) => {
					o().context && o().context.state !== "missing" && e(j);
				}), P(e, l);
			},
			$$slots: { default: !0 }
		});
	}
	t(), d();
}
// svelte/features/auth/AuthLogoutForm.svelte
var Le = N("<p role=\"alert\" class=\"tw:m-0 tw:break-words tw:text-destructive\"> </p> <a class=\"tw:text-link\"> </a>", 1), Re = N("<form method=\"post\" action=\"/auth/logout\"><input type=\"hidden\" name=\"next\"/> <!> <!></form>");
function ze(a, d) {
	y(d, !0);
	let f = G(d, "blocked", 3, !1), p = G(d, "cleanup", 3, async () => (await import("./logout-0bRFE7iQ.js")).cleanupCurrentDevicePush()), m = !0, _ = e("idle"), v = (e) => X(d.lang, e);
	L(() => {
		m = !1;
	});
	async function b(e) {
		let t = e.currentTarget;
		if (!m || !t.isConnected || u(_) === "idle" && f()) {
			e.preventDefault();
			return;
		}
		if (u(_) === "ready" || u(_) === "unconfirmed" || (e.preventDefault(), u(_) === "pending")) return;
		l(_, "pending"), d.onBegin();
		let n = !1;
		try {
			n = (await p()()).confirmed;
		} catch {}
		m && t.isConnected && (l(_, n ? "ready" : "unconfirmed", !0), n && t.requestSubmit());
	}
	var S = Re(), C = o(S);
	j(C);
	var w = n(C, 2);
	{
		let e = g(() => u(_) === "pending"), t = g(() => u(_) === "idle" && f());
		R(w, {
			variant: "link",
			type: "submit",
			get loading() {
				return u(e);
			},
			get disabled() {
				return u(t);
			},
			class: "tw:h-auto tw:whitespace-normal tw:p-0 tw:text-left",
			children: (e, t) => {
				r();
				var n = D();
				s((e) => K(n, e), [() => v(u(_) === "unconfirmed" ? "continueLogout" : "other")]), P(e, n);
			},
			$$slots: { default: !0 }
		});
	}
	var T = n(w, 2), E = (e) => {
		var t = Le(), r = i(t), a = c(r, !0), o = n(r, 2), l = c(o, !0);
		s((e, t) => {
			K(a, e), x(o, "href", d.next), K(l, t);
		}, [() => v("logoutCleanup"), () => v("reviewAgain")]), P(e, t);
	};
	O(T, (e) => {
		u(_) === "unconfirmed" && e(E);
	}), h(S), s(() => {
		x(S, "aria-busy", u(_) === "pending"), M(C, d.next);
	}), F("submit", S, b), P(a, S), t();
}
// svelte/features/auth/ConsentPage.svelte
var Be = N("<p role=\"status\" class=\"tw:m-0 tw:text-muted-foreground\"> </p>"), Ve = N("<p role=\"note\" class=\"tw:m-0 tw:rounded-control tw:border tw:border-warning tw:bg-warning/10 tw:p-3 tw:text-foreground\"> </p>"), He = N("<p class=\"tw:m-0 tw:break-words\"> </p> <ul class=\"tw:m-0 tw:list-disc tw:space-y-1 tw:pl-5\"><li> </li> <li> </li> <li> </li></ul> <p class=\"tw:m-0 tw:text-muted-foreground\"> </p> <p class=\"tw:m-0 tw:break-words tw:text-muted-foreground\"> </p> <p class=\"tw:m-0 tw:break-words tw:text-xs tw:text-muted-foreground\"> </p> <!> <form method=\"post\" class=\"tw:flex tw:flex-wrap tw:gap-2\"><input type=\"hidden\" name=\"handle\"/> <!> <!></form> <!> <!>", 1), Ue = N("<a> </a>"), We = N("<p role=\"alert\" class=\"tw:m-0 tw:break-words tw:text-destructive\"> </p> <!><!>", 1);
function Ge(a, d) {
	y(d, !0);
	let f = () => B(T, "$view", p), [p, _] = H(), v = G(d, "initialFailure", 3, !1), b = m(() => ge(d.api, d.search, void 0, v())), T = b.state, E = e(!1), k = e(!1), A = (e, t) => X(d.lang, e, t);
	z(() => (v() || b.load(), () => b.dispose()));
	{
		let e = g(() => f().context ? A("connect", { name: f().context.client_name }) : A("consentError"));
		Q(a, {
			get title() {
				return u(e);
			},
			children: (e, t) => {
				var a = w(), p = i(a), m = (e) => {
					var t = Be(), n = c(t, !0);
					s((e) => K(n, e), [() => A("loading")]), P(e, t);
				}, _ = (e) => {
					var t = He(), a = i(t), p = c(a, !0), m = n(a, 2), _ = o(m), v = c(_, !0), y = n(_, 2), b = c(y, !0), S = n(y, 2), C = c(S, !0);
					h(m);
					var w = n(m, 2), T = c(w, !0), N = n(w, 2), I = c(N), L = n(N, 2), z = c(L), B = n(L, 2), V = (e) => {
						var t = Ve(), n = c(t, !0);
						s((e) => K(n, e), [() => A("local")]), P(e, t);
					};
					O(B, (e) => {
						f().context.redirect_is_loopback && e(V);
					});
					var H = n(B, 2), U = o(H);
					j(U);
					var W = n(U, 2);
					{
						let e = g(() => u(E) || u(k));
						R(W, {
							type: "submit",
							name: "decision",
							value: "deny",
							variant: "outline",
							get "aria-disabled"() {
								return u(e);
							},
							children: (e, t) => {
								r();
								var n = D();
								s((e) => K(n, e), [() => A("cancel")]), P(e, n);
							},
							$$slots: { default: !0 }
						});
					}
					var ee = n(W, 2);
					{
						let e = g(() => u(E) || u(k));
						R(ee, {
							type: "submit",
							name: "decision",
							value: "approve",
							get "aria-disabled"() {
								return u(e);
							},
							children: (e, t) => {
								r();
								var n = D();
								s((e) => K(n, e), [() => A("allow")]), P(e, n);
							},
							$$slots: { default: !0 }
						});
					}
					h(H);
					var G = n(H, 2), q = (e) => {
						var t = Be(), n = c(t, !0);
						s((e) => K(n, e), [() => A("waiting")]), P(e, t);
					};
					O(G, (e) => {
						u(E) && e(q);
					});
					var te = n(G, 2);
					{
						let e = g(() => `/authorize${d.search}`);
						ze(te, {
							get next() {
								return u(e);
							},
							get lang() {
								return d.lang;
							},
							get blocked() {
								return u(E);
							},
							onBegin: () => {
								l(k, !0);
							}
						});
					}
					s((e, t, n, r, i, a, o, s, c) => {
						K(p, e), K(v, t), K(b, n), K(C, r), K(T, i), K(I, `${a ?? ""}
      ${o ?? ""}`), K(z, `${s ?? ""}: ${c ?? ""}`), x(H, "action", `/authorize${d.search}`), x(H, "aria-busy", u(E)), M(U, f().context.handle);
					}, [
						() => A("as", { email: f().context.email }),
						() => A("rooms"),
						() => A("read"),
						() => A("post"),
						() => A("cant"),
						() => f().context.client_domain ? A("publisher", { domain: f().context.client_domain }) : A("unverified"),
						() => A("goes", { host: f().context.redirect_host }),
						() => A("scope"),
						() => f().context.scope.join(", ")
					]), F("submit", H, (e) => {
						u(E) || u(k) ? e.preventDefault() : l(E, !0);
					}), P(e, t);
				}, v = (e) => {
					var t = We(), a = i(t), o = c(a, !0), l = n(a, 2), u = (e) => {
						var t = Ue(), n = c(t, !0);
						s((e, r, i) => {
							C(t, 1, e), x(t, "href", r), K(n, i);
						}, [
							() => S(I()),
							() => `/login?ui=svelte&next=${encodeURIComponent("/authorize" + d.search)}`,
							() => A("login")
						]), P(e, t);
					}, p = (e) => {
						R(e, {
							variant: "outline",
							onclick: () => b.load(),
							children: (e, t) => {
								r();
								var n = D();
								s((e) => K(n, e), [() => A("retry")]), P(e, n);
							},
							$$slots: { default: !0 }
						});
					};
					O(l, (e) => {
						f().signedOut ? e(u) : e(p, -1);
					});
					var m = n(l), h = (e) => {
						var t = Ue(), n = c(t, !0);
						s((e, r) => {
							C(t, 1, e), x(t, "href", f().returnTo), K(n, r);
						}, [() => S(I({ variant: "ghost" })), () => A("return")]), P(e, t);
					};
					O(m, (e) => {
						f().returnTo && e(h);
					}), s((e) => K(o, e), [() => Z(d.lang, f().error)]), P(e, t);
				};
				O(p, (e) => {
					f().loading ? e(m) : f().context ? e(_, 1) : e(v, -1);
				}), P(e, a);
			},
			$$slots: { default: !0 }
		});
	}
	t(), _();
}
// svelte/features/auth/AuthRoot.svelte
var Ke = N("<p role=\"alert\"> </p>"), qe = N("<p> </p>");
function Je(e, n) {
	y(n, !0);
	let r = G(n, "href", 19, () => location.href), a = G(n, "api", 19, te), o = G(n, "navigate", 3, (e) => location.assign(e)), l = g(() => new URL(r())), d = g(() => ne(u(l), u(l).origin)), f = g(() => u(l).pathname.match(/^\/b\/([a-z0-9]{6,40})\/?$/)?.[1]);
	var p = w(), m = i(p);
	T(m, () => n.metadata ? n.metadata.page + u(l).origin + u(l).pathname + u(l).search + u(l).hash + String(n.metadata.autoAccess) + String(n.metadata.consentFailure) : "invalid", (e) => {
		var t = w(), r = i(t), p = (e) => {
			Q(e, {
				title: "vibebook",
				children: (e, t) => {
					var n = Ke(), r = c(n, !0);
					s((e) => K(r, e), [() => X("en", "configError")]), P(e, n);
				},
				$$slots: { default: !0 }
			});
		}, m = (e) => {
			Ee(e, {
				get api() {
					return a();
				},
				get search() {
					return u(l).search;
				},
				get origin() {
					return u(l).origin;
				},
				get lang() {
					return n.metadata.lang;
				},
				get navigate() {
					return o();
				}
			});
		}, h = (e) => {
			var t = w(), r = i(t), d = (e) => {
				{
					let t = g(() => /^#f[0-9a-f]{1,64}$/.test(u(l).hash) ? u(l).hash.slice(2) : void 0);
					Ie(e, {
						get api() {
							return a();
						},
						get id() {
							return u(f);
						},
						get fileId() {
							return u(t);
						},
						get auto() {
							return n.metadata.autoAccess;
						},
						get origin() {
							return u(l).origin;
						},
						get lang() {
							return n.metadata.lang;
						},
						get navigate() {
							return o();
						}
					});
				}
			}, p = (e) => {
				{
					let t = g(() => X(n.metadata.lang, "missing"));
					Q(e, {
						get title() {
							return u(t);
						},
						children: (e, t) => {
							var r = qe(), i = c(r, !0);
							s((e) => K(i, e), [() => X(n.metadata.lang, "missingBody")]), P(e, r);
						},
						$$slots: { default: !0 }
					});
				}
			};
			O(r, (e) => {
				u(f) ? e(d) : e(p, -1);
			}), P(e, t);
		}, _ = (e) => {
			var t = w(), r = i(t), f = (e) => {
				Ie(e, {
					get api() {
						return a();
					},
					get id() {
						return u(d).roomId;
					},
					get fileId() {
						return u(d).id;
					},
					auto: !1,
					get origin() {
						return u(l).origin;
					},
					get lang() {
						return n.metadata.lang;
					},
					get navigate() {
						return o();
					}
				});
			}, p = (e) => {
				{
					let t = g(() => X(n.metadata.lang, "missing"));
					Q(e, {
						get title() {
							return u(t);
						},
						children: (e, t) => {
							var r = qe(), i = c(r, !0);
							s((e) => K(i, e), [() => X(n.metadata.lang, "missingBody")]), P(e, r);
						},
						$$slots: { default: !0 }
					});
				}
			};
			O(r, (e) => {
				u(d) ? e(f) : e(p, -1);
			}), P(e, t);
		}, v = (e) => {
			{
				let t = g(() => !!n.metadata.consentFailure);
				Ge(e, {
					get api() {
						return a();
					},
					get search() {
						return u(l).search;
					},
					get lang() {
						return n.metadata.lang;
					},
					get initialFailure() {
						return u(t);
					}
				});
			}
		};
		O(r, (e) => {
			n.metadata ? n.metadata.page === "login" ? e(m, 1) : n.metadata.page === "access" ? e(h, 2) : n.metadata.page === "file-access" ? e(_, 3) : e(v, -1) : e(p);
		}), P(e, t);
	}), P(e, p), t();
}
// svelte/features/auth/mount.ts
function Ye(e) {
	let t = e.querySelector("meta[name=\"vb-consent-failure\"]"), n = se.safeParse({
		...t ? { consentFailure: t.getAttribute("content") === "1" } : {},
		page: e.querySelector("meta[name=\"vb-page\"]")?.getAttribute("content"),
		lang: e.documentElement.lang.startsWith("en") ? "en" : "pt",
		autoAccess: e.querySelector("meta[name=\"vb-auto-access\"]")?.getAttribute("content") === "1"
	});
	return n.success ? n.data : null;
}
function Xe(e, t) {
	try {
		let n = (t ?? e.defaultView?.localStorage)?.getItem("vb.theme");
		(n === "light" || n === "dark") && (e.documentElement.dataset.theme = n);
	} catch {}
}
function Ze(e, t) {
	return Xe(t), A(Je, {
		target: e,
		props: { metadata: Ye(t) }
	});
}
export { Ze as mountAuthPage };
