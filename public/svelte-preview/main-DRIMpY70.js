import { $ as e, Ct as t, G as n, Gt as r, In as i, L as a, M as o, N as s, O as c, On as l, Pn as u, U as d, Z as f, b as p, c as m, et as h, f as g, k as _, n as v, ot as y, p as b, q as x, qt as S, rt as C, st as w, t as T, v as E, wt as D } from "./shared-Cn4mm4KY.js";
import { A as O, B as k, C as A, D as j, E as M, F as N, G as ee, H as P, I as F, J as te, K as I, L, M as ne, N as re, P as R, R as ie, S as ae, U as z, V as B, W as oe, Y as se, Z as ce, _ as le, a as ue, c as de, d as fe, f as pe, g as me, h as he, i as V, j as ge, k as _e, l as ve, m as ye, n as be, p as xe, q as Se, r as Ce, s as we, t as Te, u as H, w as Ee, x as De, z as U } from "./Card-CD0C77Sq.js";
import { A as Oe, B as ke, C as Ae, D as je, E as Me, F as Ne, I as Pe, L as Fe, M as Ie, N as Le, O as Re, P as W, R as ze, T as Be, d as Ve, h as He, j as Ue, k as We, m as Ge, n as Ke, s as qe, w as Je, y as Ye, z as Xe } from "./api-CwXbABNL.js";
import { $ as Ze, C as Qe, D as $e, E as et, G as tt, K as nt, O as rt, Q as it, S as at, T as ot, Y as st, Z as ct, _ as lt, a as ut, b as dt, c as ft, d as pt, et as mt, f as ht, h as gt, i as _t, k as vt, l as yt, m as bt, n as xt, o as St, p as Ct, r as wt, s as Tt, t as Et, tt as Dt, u as Ot, v as kt, w as At, y as jt } from "./RadioGroup-CYa-Ao14.js";
import { a as Mt, c as Nt, d as Pt, f as Ft, h as It, i as Lt, l as Rt, n as zt, o as Bt, p as Vt, r as Ht, s as Ut, t as Wt, u as Gt } from "./model-BLsF6N8q.js";
import { i as Kt, n as qt, t as Jt } from "./model-D2eQTgrV.js";
import { a as Yt, i as Xt, n as Zt, o as Qt, r as $t, t as en } from "./registration-3E5PConC.js";
// \0rolldown/runtime.js
var tn = Object.defineProperty, nn = (e, t) => {
	let n = {};
	for (var r in e) tn(n, r, {
		get: e[r],
		enumerable: !0
	});
	return t || tn(n, Symbol.toStringTag, { value: "Module" }), n;
};
// svelte/View.svelte
function rn(e, t) {
	let n = () => ye(t.values, "$values", r), [r, i] = xe();
	var o = P(), s = a(o);
	ne(s, () => t.component, (e, t) => {
		t(e, pe(n));
	}), B(e, o), i();
}
// svelte/features/rich-text/allowlist.ts
var an = new Set("a abbr acronym address area article aside audio b bdi bdo big blink blockquote body br canvas caption center cite code col colgroup content data datalist dd decorator del details dfn dialog dir div dl dt element em fieldset figcaption figure font footer h1 h2 h3 h4 h5 h6 head header hgroup hr html i ins kbd label legend li main map mark marquee menu menuitem meter nav nobr ol optgroup option output p picture pre progress q rp rt ruby s samp section shadow small source spacer span strike strong sub summary sup table tbody td tfoot th thead time track tt u ul var video wbr".split(" ")), on = new Set("svg a altglyph altglyphdef altglyphitem animatecolor animatemotion animatetransform circle clippath defs desc ellipse filter font g glyph glyphref hkern image line lineargradient marker mask metadata mpath path pattern polygon polyline radialgradient rect stop switch symbol text textpath title tref tspan view vkern feblend fecolormatrix fecomponenttransfer fecomposite feconvolvematrix fediffuselighting fedisplacementmap fedistantlight fedropshadow feflood fefunca fefuncb fefuncg fefuncr fegaussianblur feimage femerge femergenode femorphology feoffset fepointlight fespecularlighting fespotlight fetile feturbulence".split(" ")), sn = new Set("math menclose merror mfenced mfrac mglyph mi mlabeledtr mmultiscripts mn mo mover mpadded mphantom mroot mrow ms mspace msqrt mstyle msub msup msubsup mtable mtd mtext mtr munder munderover mprescripts".split(" ")), cn = new Set("script style iframe object embed template noscript noembed noframes plaintext xmp foreignobject annotation-xml".split(" ")), ln = "http://www.w3.org/1999/xhtml", un = new Set("accept action align alt autocapitalize autocomplete autopictureinpicture autoplay background bgcolor border capture cellpadding cellspacing checked cite class clear color cols colspan controls controlslist coords crossorigin datetime decoding default dir disabled disablepictureinpicture disableremoteplayback download draggable enctype enterkeyhint face for headers height hidden high href hreflang id inputmode integrity ismap kind label lang list loading loop low max maxlength media method min minlength multiple muted name nonce noshade novalidate nowrap open optimum pattern placeholder playsinline popover popovertarget popovertargetaction poster preload pubdate radiogroup readonly rel required rev reversed role rows rowspan spellcheck scope selected shape size sizes span srclang start src srcset step style summary tabindex title translate type usemap valign value width wrap xmlns slot".split(" ")), dn = new Set("accent-height accumulate additive alignment-baseline ascent attributename attributetype azimuth basefrequency baseline-shift begin bias by class clip clippathunits clip-path clip-rule color color-interpolation color-interpolation-filters color-profile color-rendering cx cy d dx dy diffuseconstant direction display divisor dur edgemode elevation end fill fill-opacity fill-rule filter filterunits flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight fx fy g1 g2 glyph-name glyphref gradientunits gradienttransform height href id image-rendering in in2 k k1 k2 k3 k4 kerning keypoints keysplines keytimes lang lengthadjust letter-spacing kernelmatrix kernelunitlength lighting-color local marker-end marker-mid marker-start markerheight markerunits markerwidth maskcontentunits maskunits max mask media method mode min name numoctaves offset operator opacity order orient orientation origin overflow paint-order path pathlength patterncontentunits patterntransform patternunits points preservealpha preserveaspectratio primitiveunits r rx ry radius refx refy repeatcount repeatdur restart result rotate scale seed shape-rendering specularconstant specularexponent spreadmethod startoffset stddeviation stitchtiles stop-color stop-opacity stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke stroke-width style surfacescale systemlanguage tabindex targetx targety transform transform-origin text-anchor text-decoration text-rendering textlength type u1 u2 unicode values viewbox visibility version vert-adv-y vert-origin-x vert-origin-y width word-spacing wrap writing-mode xchannelselector ychannelselector x x1 x2 xmlns y y1 y2 z zoomandpan".split(" ")), fn = new Set("accent accentunder align bevelled close columnsalign columnlines columnspan denomalign depth dir display displaystyle encoding fence frame height href id largeop length linethickness lspace lquote mathbackground mathcolor mathsize mathvariant maxsize minsize movablelimits notation numalign open rowalign rowlines rowspacing rowspan rspace rquote scriptlevel scriptminsize scriptsizemultiplier selection separator separators stretchy subscriptshift supscriptshift symmetric voffset width xmlns".split(" ")), pn = new Set("open hidden reversed controls loop muted autoplay playsinline default".split(" ")), mn = new Set("clip-path filter mask marker-start marker-mid marker-end".split(" ")), hn = z("<span> </span>"), gn = oe("<svg aria-hidden=\"true\" viewBox=\"0 0 16 16\" fill=\"currentColor\" class=\"tw:size-4 tw:shrink-0\"><path d=\"M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z\"></path></svg><!>", 1), _n = z("<small class=\"tw:text-muted-foreground\"> </small>"), vn = z("<!><span class=\"tw:min-w-0 tw:break-words\"> </span><!>", 1), yn = z("<a><!></a>"), bn = z("<span aria-hidden=\"true\" class=\"tw:mr-1 tw:font-mono\"> </span>"), xn = z("<!><!>", 1);
function Sn(e, r) {
	D(r, !0);
	let i = (e, t = u) => {
		var o = P(), g = a(o);
		R(g, 17, t, N, (e, t) => {
			var o = P(), g = a(o), _ = (e) => {
				var n = I();
				c(() => U(n, m(t).text)), B(e, n);
			}, v = (e) => {
				var n = hn(), r = d(n, !0);
				c(() => {
					A(n, "data-rich-mention", m(t).who), A(n, "title", m(t).who === "ai" ? "@vibe" : m(t).who), M(n, 1, j(m(t).mine ? "tw:rounded-sm tw:bg-primary/15 tw:px-1 tw:font-semibold tw:text-foreground" : "tw:rounded-sm tw:bg-primary/10 tw:px-1 tw:text-foreground")), U(r, m(t).text);
				}), B(e, n);
			}, y = (e) => {
				var r = P(), o = a(r), l = (e) => {
					var n = P(), r = a(n);
					ge(r, () => "a", !1, (e, n) => {
						var r = (e) => {
							e.key === "Enter" && p(e, m(t));
						}, a = (e) => p(e, m(t));
						De(e, (e, n) => ({
							role: "link",
							tabindex: "0",
							onkeydown: r,
							xmlns: m(t).namespace,
							href: m(t).target.href,
							title: m(t).title,
							target: e,
							rel: n,
							onclick: a
						}), [() => h(m(t)) ? "_blank" : void 0, () => h(m(t)) ? "noopener noreferrer nofollow ugc" : void 0]), i(n, () => m(t).children);
					}, () => m(t).namespace), B(e, n);
				}, u = (e) => {
					var r = yn(), o = s(r), l = (e) => {
						var r = gn(), o = n(a(r)), s = (e) => {
							var n = I();
							c(() => U(n, m(t).target.label)), B(e, n);
						}, l = (e) => {
							i(e, () => m(t).children);
						};
						L(o, (e) => {
							m(t).target.label ? e(s) : e(l, -1);
						}), B(e, r);
					}, u = (e) => {
						var r = vn(), i = a(r);
						Dt(i, { name: "file" });
						var o = n(i), s = d(o, !0), l = n(o), u = (e) => {
							var n = _n(), r = d(n);
							c(() => U(r, `v${m(t).target.version ?? ""}`)), B(e, n);
						};
						L(l, (e) => {
							m(t).target.version && e(u);
						}), c(() => U(s, m(t).target.file.name)), B(e, r);
					}, f = (e) => {
						i(e, () => m(t).children);
					};
					L(o, (e) => {
						m(t).target.kind === "github" ? e(l) : m(t).target.kind === "file" ? e(u, 1) : e(f, -1);
					}), S(r), c((e, n) => {
						A(r, "href", m(t).target.href), A(r, "title", m(t).target.kind === "file" ? m(t).target.file.name : m(t).target.kind === "github" ? m(t).target.label || void 0 : m(t).title), A(r, "target", e), A(r, "rel", n), A(r, "data-rich-link", m(t).target.kind), M(r, 1, j(m(t).target.kind === "file" || m(t).target.kind === "github" ? "tw:inline-flex tw:max-w-full tw:items-center tw:gap-1 tw:rounded-full tw:border tw:border-border tw:bg-muted tw:px-2 tw:py-0.5 tw:align-middle tw:text-xs tw:font-medium tw:text-link tw:underline-offset-2 tw:hover:underline tw:focus-visible:outline-2 tw:focus-visible:outline-ring" : "tw:rounded-sm tw:text-link tw:underline-offset-2 tw:hover:underline tw:focus-visible:outline-2 tw:focus-visible:outline-ring"));
					}, [() => h(m(t)) ? "_blank" : void 0, () => h(m(t)) ? "noopener noreferrer nofollow ugc" : void 0]), te("click", r, (e) => p(e, m(t))), B(e, r);
				};
				L(o, (e) => {
					m(t).namespace === "http://www.w3.org/1999/xhtml" ? e(u, -1) : e(l);
				}), B(e, r);
			}, b = (e) => {
				var t = P(), n = a(t);
				re(n, () => r.taskSlot ?? u), B(e, t);
			}, x = (e) => {
				var n = P(), r = a(n);
				ge(r, () => m(t).tag, !1, (e, n) => {
					De(e, (e) => ({
						xmlns: m(t).namespace,
						...m(t).attrs,
						class: e
					}), [() => f(m(t).tag, m(t).namespace, m(t).attrs)]);
				}, () => m(t).namespace), B(e, n);
			}, C = w(() => m(t).namespace === "http://www.w3.org/1999/xhtml" && l.has(m(t).tag)), T = (e) => {
				var r = P(), o = a(r);
				ge(o, () => m(t).tag, !1, (e, r) => {
					De(e, (e) => ({
						xmlns: m(t).namespace,
						...m(t).attrs,
						"data-code-language": m(t).language,
						class: e
					}), [() => f(m(t).tag, m(t).namespace, m(t).attrs)]);
					var o = xn(), s = a(o), l = (e) => {
						var n = bn(), r = d(n, !0);
						c(() => U(r, m(t).task ? "☑" : "☐")), B(e, n);
					};
					L(s, (e) => {
						m(t).task !== void 0 && e(l);
					});
					var u = n(s);
					i(u, () => m(t).children), B(r, o);
				}, () => m(t).namespace), B(e, r);
			};
			L(g, (e) => {
				m(t).kind === "text" ? e(_) : m(t).kind === "mention" ? e(v, 1) : m(t).kind === "link" ? e(y, 2) : m(t).documentTaskSlot ? e(b, 3) : m(C) ? e(x, 4) : e(T, -1);
			}), B(e, o);
		}), B(e, o);
	}, o = !0;
	de(() => {
		o = !1;
	});
	let l = /* @__PURE__ */ new Set([
		"img",
		"area",
		"br",
		"col",
		"hr",
		"source",
		"track",
		"wbr"
	]);
	function f(e, t, n) {
		return t === "http://www.w3.org/1999/xhtml" ? /^h[1-6]$/.test(e) ? ["tw:my-3 tw:font-sans tw:font-semibold tw:tracking-normal tw:[font-variation-settings:normal] tw:[font-feature-settings:normal]", e === "h1" ? "tw:text-xl tw:leading-7" : e === "h2" ? "tw:text-lg tw:leading-6" : "tw:text-base tw:leading-6"] : e === "img" ? "tw:my-3 tw:max-h-[80vh] tw:max-w-full tw:rounded-control tw:object-contain" : e === "p" ? "tw:my-2 tw:font-sans tw:tracking-normal tw:leading-6" : e === "pre" ? "tw:my-3 tw:max-w-full tw:overflow-x-auto tw:whitespace-pre tw:rounded-control tw:bg-muted tw:p-3 tw:font-mono tw:text-xs tw:leading-5" : e === "code" || e === "kbd" || e === "samp" ? "tw:font-mono tw:text-xs" : e === "blockquote" ? "tw:my-3 tw:border-l-2 tw:border-border tw:pl-3 tw:text-muted-foreground" : e === "ul" ? "tw:my-2 tw:list-disc tw:space-y-1 tw:pl-5" : e === "ol" ? "tw:my-2 tw:list-decimal tw:space-y-1 tw:pl-5" : e === "table" ? "tw:my-3 tw:w-full tw:border-collapse tw:font-sans tw:text-sm" : e === "td" || e === "th" ? [
			"tw:border tw:border-border tw:px-3 tw:py-2 tw:align-top",
			n.align === "center" ? "tw:text-center" : n.align === "right" ? "tw:text-right" : "tw:text-left",
			e === "th" ? "tw:font-semibold" : ""
		] : e === "details" ? "tw:my-2 tw:rounded-control tw:border tw:border-border tw:p-3" : e === "summary" ? "tw:cursor-pointer tw:rounded-control tw:font-medium tw:focus-visible:outline-2 tw:focus-visible:outline-ring" : e === "hr" ? "tw:my-4 tw:border-border" : e === "strong" || e === "b" ? "tw:font-semibold" : e === "small" ? "tw:text-xs" : e === "audio" || e === "video" ? "tw:max-w-full" : "" : e === "svg" ? "tw:max-w-full" : "";
	}
	function p(e, t) {
		if (!o || !(e.currentTarget instanceof Element) || !e.currentTarget.isConnected) {
			e.preventDefault();
			return;
		}
		if ("button" in e && e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
		let n = t.target;
		n.kind === "message" ? (e.preventDefault(), e.stopPropagation(), r.actions.navigate(n.id)) : n.kind === "thread" || n.kind === "document" ? r.actions.navigateRich && (e.preventDefault(), e.stopPropagation(), r.actions.navigateRich({
			kind: n.kind,
			id: n.id
		})) : n.kind === "file" && (n.attachment ? (e.preventDefault(), e.stopPropagation(), r.actions.openFile(n.attachment)) : r.actions.openFileReference && (e.preventDefault(), e.stopPropagation(), r.actions.openFileReference(n.file)));
	}
	let h = (e) => e.target.kind === "github" || e.target.kind === "url" && e.target.external;
	i(e, () => r.nodes), t();
}
Se(["click"]);
// shared/emoji.ts
var Cn = {
	100: "💯",
	point_up: "☝️",
	point_up_2: "👆",
	point_down: "👇",
	point_left: "👈",
	point_right: "👉",
	"+1": "👍",
	thumbsup: "👍",
	"-1": "👎",
	thumbsdown: "👎",
	ok_hand: "👌",
	clap: "👏",
	pray: "🙏",
	raised_hands: "🙌",
	wave: "👋",
	muscle: "💪",
	eyes: "👀",
	fire: "🔥",
	rocket: "🚀",
	tada: "🎉",
	heart: "❤️",
	heart_eyes: "😍",
	smile: "😄",
	smiley: "😃",
	grin: "😁",
	joy: "😂",
	rofl: "🤣",
	laughing: "😆",
	sweat_smile: "😅",
	wink: "😉",
	blush: "😊",
	slightly_smiling_face: "🙂",
	upside_down_face: "🙃",
	thinking_face: "🤔",
	thinking: "🤔",
	neutral_face: "😐",
	expressionless: "😑",
	unamused: "😒",
	roll_eyes: "🙄",
	face_with_rolling_eyes: "🙄",
	grimacing: "😬",
	sweat: "😓",
	cry: "😢",
	sob: "😭",
	scream: "😱",
	rage: "😡",
	angry: "😠",
	sunglasses: "😎",
	nerd_face: "🤓",
	sleeping: "😴",
	exploding_head: "🤯",
	partying_face: "🥳",
	shrug: "🤷",
	facepalm: "🤦",
	white_check_mark: "✅",
	heavy_check_mark: "✔️",
	check: "✔️",
	x: "❌",
	warning: "⚠️",
	no_entry: "⛔",
	question: "❓",
	exclamation: "❗",
	bulb: "💡",
	memo: "📝",
	pushpin: "📌",
	link: "🔗",
	lock: "🔒",
	unlock: "🔓",
	key: "🔑",
	bug: "🐛",
	wrench: "🔧",
	hammer: "🔨",
	gear: "⚙️",
	zap: "⚡",
	star: "⭐",
	sparkles: "✨",
	boom: "💥",
	hourglass: "⌛",
	alarm_clock: "⏰",
	calendar: "📅",
	chart_with_upwards_trend: "📈",
	chart_with_downwards_trend: "📉",
	moneybag: "💰",
	money_with_wings: "💸",
	dart: "🎯",
	trophy: "🏆",
	coffee: "☕",
	beer: "🍺",
	pizza: "🍕",
	see_no_evil: "🙈",
	hugs: "🤗",
	hugging_face: "🤗",
	handshake: "🤝",
	crossed_fingers: "🤞",
	writing_hand: "✍️",
	skull: "💀",
	ghost: "👻",
	robot_face: "🤖",
	robot: "🤖",
	brain: "🧠",
	speech_balloon: "💬",
	mag: "🔍",
	computer: "💻",
	iphone: "📱",
	package: "📦",
	construction: "🚧",
	rotating_light: "🚨",
	sos: "🆘",
	green_heart: "💚",
	blue_heart: "💙",
	purple_heart: "💜",
	yellow_heart: "💛",
	broken_heart: "💔",
	dog: "🐶",
	cat: "🐱",
	sun: "☀️",
	rainbow: "🌈",
	rain: "🌧️",
	snowflake: "❄️",
	earth_americas: "🌎",
	brazil: "🇧🇷",
	"flag-br": "🇧🇷",
	checkered_flag: "🏁",
	arrow_up: "⬆️",
	arrow_down: "⬇️",
	arrow_right: "➡️",
	arrow_left: "⬅️",
	heavy_plus_sign: "➕",
	heavy_minus_sign: "➖",
	red_circle: "🔴",
	large_green_circle: "🟢",
	green_circle: "🟢",
	large_yellow_circle: "🟡",
	yellow_circle: "🟡",
	white_circle: "⚪",
	black_circle: "⚫"
}, wn = (e) => e.replace(/:([a-z0-9_+-]{1,40}):/g, (e, t) => Cn[t] ?? e);
// node_modules/marked/lib/marked.esm.js
function Tn() {
	return {
		async: !1,
		breaks: !1,
		extensions: null,
		gfm: !0,
		hooks: null,
		pedantic: !1,
		renderer: null,
		silent: !1,
		tokenizer: null,
		walkTokens: null
	};
}
var En = Tn();
function Dn(e) {
	En = e;
}
var On = /[&<>"']/, kn = new RegExp(On.source, "g"), An = /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/, jn = new RegExp(An.source, "g"), Mn = {
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	"\"": "&quot;",
	"'": "&#39;"
}, Nn = (e) => Mn[e];
function Pn(e, t) {
	if (t) {
		if (On.test(e)) return e.replace(kn, Nn);
	} else if (An.test(e)) return e.replace(jn, Nn);
	return e;
}
var Fn = /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi;
function In(e) {
	return e.replace(Fn, (e, t) => (t = t.toLowerCase(), t === "colon" ? ":" : t.charAt(0) === "#" ? t.charAt(1) === "x" ? String.fromCharCode(parseInt(t.substring(2), 16)) : String.fromCharCode(+t.substring(1)) : ""));
}
var Ln = /(^|[^\[])\^/g;
function Rn(e, t) {
	let n = typeof e == "string" ? e : e.source;
	t ||= "";
	let r = {
		replace: (e, t) => {
			let i = typeof t == "string" ? t : t.source;
			return i = i.replace(Ln, "$1"), n = n.replace(e, i), r;
		},
		getRegex: () => new RegExp(n, t)
	};
	return r;
}
function zn(e) {
	try {
		e = encodeURI(e).replace(/%25/g, "%");
	} catch {
		return null;
	}
	return e;
}
var Bn = { exec: () => null };
function Vn(e, t) {
	let n = e.replace(/\|/g, (e, t, n) => {
		let r = !1, i = t;
		for (; --i >= 0 && n[i] === "\\";) r = !r;
		return r ? "|" : " |";
	}).split(/ \|/), r = 0;
	if (n[0].trim() || n.shift(), n.length > 0 && !n[n.length - 1].trim() && n.pop(), t) {
		if (n.length > t) n.splice(t);
		else for (; n.length < t;) n.push("");
	}
	for (; r < n.length; r++) n[r] = n[r].trim().replace(/\\\|/g, "|");
	return n;
}
function Hn(e, t, n) {
	let r = e.length;
	if (r === 0) return "";
	let i = 0;
	for (; i < r;) {
		let a = e.charAt(r - i - 1);
		if (a === t && !n) i++;
		else if (a !== t && n) i++;
		else break;
	}
	return e.slice(0, r - i);
}
function Un(e, t) {
	if (e.indexOf(t[1]) === -1) return -1;
	let n = 0;
	for (let r = 0; r < e.length; r++) if (e[r] === "\\") r++;
	else if (e[r] === t[0]) n++;
	else if (e[r] === t[1] && (n--, n < 0)) return r;
	return -1;
}
function Wn(e, t, n, r) {
	let i = t.href, a = t.title ? Pn(t.title) : null, o = e[1].replace(/\\([\[\]])/g, "$1");
	if (e[0].charAt(0) !== "!") {
		r.state.inLink = !0;
		let e = {
			type: "link",
			raw: n,
			href: i,
			title: a,
			text: o,
			tokens: r.inlineTokens(o)
		};
		return r.state.inLink = !1, e;
	}
	return {
		type: "image",
		raw: n,
		href: i,
		title: a,
		text: Pn(o)
	};
}
function Gn(e, t) {
	let n = e.match(/^(\s+)(?:```)/);
	if (n === null) return t;
	let r = n[1];
	return t.split("\n").map((e) => {
		let t = e.match(/^\s+/);
		if (t === null) return e;
		let [n] = t;
		return n.length >= r.length ? e.slice(r.length) : e;
	}).join("\n");
}
var Kn = class {
	options;
	rules;
	lexer;
	constructor(e) {
		this.options = e || En;
	}
	space(e) {
		let t = this.rules.block.newline.exec(e);
		if (t && t[0].length > 0) return {
			type: "space",
			raw: t[0]
		};
	}
	code(e) {
		let t = this.rules.block.code.exec(e);
		if (t) {
			let e = t[0].replace(/^ {1,4}/gm, "");
			return {
				type: "code",
				raw: t[0],
				codeBlockStyle: "indented",
				text: this.options.pedantic ? e : Hn(e, "\n")
			};
		}
	}
	fences(e) {
		let t = this.rules.block.fences.exec(e);
		if (t) {
			let e = t[0], n = Gn(e, t[3] || "");
			return {
				type: "code",
				raw: e,
				lang: t[2] ? t[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : t[2],
				text: n
			};
		}
	}
	heading(e) {
		let t = this.rules.block.heading.exec(e);
		if (t) {
			let e = t[2].trim();
			if (/#$/.test(e)) {
				let t = Hn(e, "#");
				(this.options.pedantic || !t || / $/.test(t)) && (e = t.trim());
			}
			return {
				type: "heading",
				raw: t[0],
				depth: t[1].length,
				text: e,
				tokens: this.lexer.inline(e)
			};
		}
	}
	hr(e) {
		let t = this.rules.block.hr.exec(e);
		if (t) return {
			type: "hr",
			raw: t[0]
		};
	}
	blockquote(e) {
		let t = this.rules.block.blockquote.exec(e);
		if (t) {
			let e = t[0].replace(/\n {0,3}((?:=+|-+) *)(?=\n|$)/g, "\n    $1");
			e = Hn(e.replace(/^ *>[ \t]?/gm, ""), "\n");
			let n = this.lexer.state.top;
			this.lexer.state.top = !0;
			let r = this.lexer.blockTokens(e);
			return this.lexer.state.top = n, {
				type: "blockquote",
				raw: t[0],
				tokens: r,
				text: e
			};
		}
	}
	list(e) {
		let t = this.rules.block.list.exec(e);
		if (t) {
			let n = t[1].trim(), r = n.length > 1, i = {
				type: "list",
				raw: "",
				ordered: r,
				start: r ? +n.slice(0, -1) : "",
				loose: !1,
				items: []
			};
			n = r ? `\\d{1,9}\\${n.slice(-1)}` : `\\${n}`, this.options.pedantic && (n = r ? n : "[*+-]");
			let a = RegExp(`^( {0,3}${n})((?:[\t ][^\\n]*)?(?:\\n|$))`), o = "", s = "", c = !1;
			for (; e;) {
				let n = !1;
				if (!(t = a.exec(e)) || this.rules.block.hr.test(e)) break;
				o = t[0], e = e.substring(o.length);
				let r = t[2].split("\n", 1)[0].replace(/^\t+/, (e) => " ".repeat(3 * e.length)), l = e.split("\n", 1)[0], u = 0;
				this.options.pedantic ? (u = 2, s = r.trimStart()) : (u = t[2].search(/[^ ]/), u = u > 4 ? 1 : u, s = r.slice(u), u += t[1].length);
				let d = !1;
				if (!r && /^ *$/.test(l) && (o += l + "\n", e = e.substring(l.length + 1), n = !0), !n) {
					let t = RegExp(`^ {0,${Math.min(3, u - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ \t][^\\n]*)?(?:\\n|$))`), n = RegExp(`^ {0,${Math.min(3, u - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`), i = RegExp(`^ {0,${Math.min(3, u - 1)}}(?:\`\`\`|~~~)`), a = RegExp(`^ {0,${Math.min(3, u - 1)}}#`);
					for (; e;) {
						let c = e.split("\n", 1)[0];
						if (l = c, this.options.pedantic && (l = l.replace(/^ {1,4}(?=( {4})*[^ ])/g, "  ")), i.test(l) || a.test(l) || t.test(l) || n.test(e)) break;
						if (l.search(/[^ ]/) >= u || !l.trim()) s += "\n" + l.slice(u);
						else {
							if (d || r.search(/[^ ]/) >= 4 || i.test(r) || a.test(r) || n.test(r)) break;
							s += "\n" + l;
						}
						!d && !l.trim() && (d = !0), o += c + "\n", e = e.substring(c.length + 1), r = l.slice(u);
					}
				}
				i.loose || (c ? i.loose = !0 : /\n *\n *$/.test(o) && (c = !0));
				let f = null, p;
				this.options.gfm && (f = /^\[[ xX]\] /.exec(s), f && (p = f[0] !== "[ ] ", s = s.replace(/^\[[ xX]\] +/, ""))), i.items.push({
					type: "list_item",
					raw: o,
					task: !!f,
					checked: p,
					loose: !1,
					text: s,
					tokens: []
				}), i.raw += o;
			}
			i.items[i.items.length - 1].raw = o.trimEnd(), i.items[i.items.length - 1].text = s.trimEnd(), i.raw = i.raw.trimEnd();
			for (let e = 0; e < i.items.length; e++) if (this.lexer.state.top = !1, i.items[e].tokens = this.lexer.blockTokens(i.items[e].text, []), !i.loose) {
				let t = i.items[e].tokens.filter((e) => e.type === "space");
				i.loose = t.length > 0 && t.some((e) => /\n.*\n/.test(e.raw));
			}
			if (i.loose) for (let e = 0; e < i.items.length; e++) i.items[e].loose = !0;
			return i;
		}
	}
	html(e) {
		let t = this.rules.block.html.exec(e);
		if (t) return {
			type: "html",
			block: !0,
			raw: t[0],
			pre: t[1] === "pre" || t[1] === "script" || t[1] === "style",
			text: t[0]
		};
	}
	def(e) {
		let t = this.rules.block.def.exec(e);
		if (t) {
			let e = t[1].toLowerCase().replace(/\s+/g, " "), n = t[2] ? t[2].replace(/^<(.*)>$/, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "", r = t[3] ? t[3].substring(1, t[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : t[3];
			return {
				type: "def",
				tag: e,
				raw: t[0],
				href: n,
				title: r
			};
		}
	}
	table(e) {
		let t = this.rules.block.table.exec(e);
		if (!t || !/[:|]/.test(t[2])) return;
		let n = Vn(t[1]), r = t[2].replace(/^\||\| *$/g, "").split("|"), i = t[3] && t[3].trim() ? t[3].replace(/\n[ \t]*$/, "").split("\n") : [], a = {
			type: "table",
			raw: t[0],
			header: [],
			align: [],
			rows: []
		};
		if (n.length === r.length) {
			for (let e of r) /^ *-+: *$/.test(e) ? a.align.push("right") : /^ *:-+: *$/.test(e) ? a.align.push("center") : /^ *:-+ *$/.test(e) ? a.align.push("left") : a.align.push(null);
			for (let e of n) a.header.push({
				text: e,
				tokens: this.lexer.inline(e)
			});
			for (let e of i) a.rows.push(Vn(e, a.header.length).map((e) => ({
				text: e,
				tokens: this.lexer.inline(e)
			})));
			return a;
		}
	}
	lheading(e) {
		let t = this.rules.block.lheading.exec(e);
		if (t) return {
			type: "heading",
			raw: t[0],
			depth: t[2].charAt(0) === "=" ? 1 : 2,
			text: t[1],
			tokens: this.lexer.inline(t[1])
		};
	}
	paragraph(e) {
		let t = this.rules.block.paragraph.exec(e);
		if (t) {
			let e = t[1].charAt(t[1].length - 1) === "\n" ? t[1].slice(0, -1) : t[1];
			return {
				type: "paragraph",
				raw: t[0],
				text: e,
				tokens: this.lexer.inline(e)
			};
		}
	}
	text(e) {
		let t = this.rules.block.text.exec(e);
		if (t) return {
			type: "text",
			raw: t[0],
			text: t[0],
			tokens: this.lexer.inline(t[0])
		};
	}
	escape(e) {
		let t = this.rules.inline.escape.exec(e);
		if (t) return {
			type: "escape",
			raw: t[0],
			text: Pn(t[1])
		};
	}
	tag(e) {
		let t = this.rules.inline.tag.exec(e);
		if (t) return !this.lexer.state.inLink && /^<a /i.test(t[0]) ? this.lexer.state.inLink = !0 : this.lexer.state.inLink && /^<\/a>/i.test(t[0]) && (this.lexer.state.inLink = !1), !this.lexer.state.inRawBlock && /^<(pre|code|kbd|script)(\s|>)/i.test(t[0]) ? this.lexer.state.inRawBlock = !0 : this.lexer.state.inRawBlock && /^<\/(pre|code|kbd|script)(\s|>)/i.test(t[0]) && (this.lexer.state.inRawBlock = !1), {
			type: "html",
			raw: t[0],
			inLink: this.lexer.state.inLink,
			inRawBlock: this.lexer.state.inRawBlock,
			block: !1,
			text: t[0]
		};
	}
	link(e) {
		let t = this.rules.inline.link.exec(e);
		if (t) {
			let e = t[2].trim();
			if (!this.options.pedantic && /^</.test(e)) {
				if (!/>$/.test(e)) return;
				let t = Hn(e.slice(0, -1), "\\");
				if ((e.length - t.length) % 2 == 0) return;
			} else {
				let e = Un(t[2], "()");
				if (e > -1) {
					let n = (t[0].indexOf("!") === 0 ? 5 : 4) + t[1].length + e;
					t[2] = t[2].substring(0, e), t[0] = t[0].substring(0, n).trim(), t[3] = "";
				}
			}
			let n = t[2], r = "";
			if (this.options.pedantic) {
				let e = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(n);
				e && (n = e[1], r = e[3]);
			} else r = t[3] ? t[3].slice(1, -1) : "";
			return n = n.trim(), /^</.test(n) && (n = this.options.pedantic && !/>$/.test(e) ? n.slice(1) : n.slice(1, -1)), Wn(t, {
				href: n && n.replace(this.rules.inline.anyPunctuation, "$1"),
				title: r && r.replace(this.rules.inline.anyPunctuation, "$1")
			}, t[0], this.lexer);
		}
	}
	reflink(e, t) {
		let n;
		if ((n = this.rules.inline.reflink.exec(e)) || (n = this.rules.inline.nolink.exec(e))) {
			let e = t[(n[2] || n[1]).replace(/\s+/g, " ").toLowerCase()];
			if (!e) {
				let e = n[0].charAt(0);
				return {
					type: "text",
					raw: e,
					text: e
				};
			}
			return Wn(n, e, n[0], this.lexer);
		}
	}
	emStrong(e, t, n = "") {
		let r = this.rules.inline.emStrongLDelim.exec(e);
		if (r && !(r[3] && n.match(/[\p{L}\p{N}]/u)) && (!(r[1] || r[2]) || !n || this.rules.inline.punctuation.exec(n))) {
			let n = [...r[0]].length - 1, i, a, o = n, s = 0, c = r[0][0] === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
			for (c.lastIndex = 0, t = t.slice(-1 * e.length + n); (r = c.exec(t)) != null;) {
				if (i = r[1] || r[2] || r[3] || r[4] || r[5] || r[6], !i) continue;
				if (a = [...i].length, r[3] || r[4]) {
					o += a;
					continue;
				}
				if ((r[5] || r[6]) && n % 3 && !((n + a) % 3)) {
					s += a;
					continue;
				}
				if (o -= a, o > 0) continue;
				a = Math.min(a, a + o + s);
				let t = [...r[0]][0].length, c = e.slice(0, n + r.index + t + a);
				if (Math.min(n, a) % 2) {
					let e = c.slice(1, -1);
					return {
						type: "em",
						raw: c,
						text: e,
						tokens: this.lexer.inlineTokens(e)
					};
				}
				let l = c.slice(2, -2);
				return {
					type: "strong",
					raw: c,
					text: l,
					tokens: this.lexer.inlineTokens(l)
				};
			}
		}
	}
	codespan(e) {
		let t = this.rules.inline.code.exec(e);
		if (t) {
			let e = t[2].replace(/\n/g, " "), n = /[^ ]/.test(e), r = /^ /.test(e) && / $/.test(e);
			return n && r && (e = e.substring(1, e.length - 1)), e = Pn(e, !0), {
				type: "codespan",
				raw: t[0],
				text: e
			};
		}
	}
	br(e) {
		let t = this.rules.inline.br.exec(e);
		if (t) return {
			type: "br",
			raw: t[0]
		};
	}
	del(e) {
		let t = this.rules.inline.del.exec(e);
		if (t) return {
			type: "del",
			raw: t[0],
			text: t[2],
			tokens: this.lexer.inlineTokens(t[2])
		};
	}
	autolink(e) {
		let t = this.rules.inline.autolink.exec(e);
		if (t) {
			let e, n;
			return t[2] === "@" ? (e = Pn(t[1]), n = "mailto:" + e) : (e = Pn(t[1]), n = e), {
				type: "link",
				raw: t[0],
				text: e,
				href: n,
				tokens: [{
					type: "text",
					raw: e,
					text: e
				}]
			};
		}
	}
	url(e) {
		let t;
		if (t = this.rules.inline.url.exec(e)) {
			let e, n;
			if (t[2] === "@") e = Pn(t[0]), n = "mailto:" + e;
			else {
				let r;
				do
					r = t[0], t[0] = this.rules.inline._backpedal.exec(t[0])?.[0] ?? "";
				while (r !== t[0]);
				e = Pn(t[0]), n = t[1] === "www." ? "http://" + t[0] : t[0];
			}
			return {
				type: "link",
				raw: t[0],
				text: e,
				href: n,
				tokens: [{
					type: "text",
					raw: e,
					text: e
				}]
			};
		}
	}
	inlineText(e) {
		let t = this.rules.inline.text.exec(e);
		if (t) {
			let e;
			return e = this.lexer.state.inRawBlock ? t[0] : Pn(t[0]), {
				type: "text",
				raw: t[0],
				text: e
			};
		}
	}
}, qn = /^(?: *(?:\n|$))+/, Jn = /^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/, Yn = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/, Xn = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/, Zn = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/, Qn = /(?:[*+-]|\d{1,9}[.)])/, $n = Rn(/^(?!bull |blockCode|fences|blockquote|heading|html)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html))+?)\n {0,3}(=+|-+) *(?:\n+|$)/).replace(/bull/g, Qn).replace(/blockCode/g, / {4}/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).getRegex(), er = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/, tr = /^[^\n]+/, nr = /(?!\s*\])(?:\\.|[^\[\]\\])+/, rr = Rn(/^ {0,3}\[(label)\]: *(?:\n *)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/).replace("label", nr).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(), ir = Rn(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g, Qn).getRegex(), ar = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul", or = /<!--(?:-?>|[\s\S]*?(?:-->|$))/, sr = Rn("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))", "i").replace("comment", or).replace("tag", ar).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(), cr = Rn(er).replace("hr", Xn).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", ar).getRegex(), lr = {
	blockquote: Rn(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", cr).getRegex(),
	code: Jn,
	def: rr,
	fences: Yn,
	heading: Zn,
	hr: Xn,
	html: sr,
	lheading: $n,
	list: ir,
	newline: qn,
	paragraph: cr,
	table: Bn,
	text: tr
}, ur = Rn("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", Xn).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", " {4}[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", ar).getRegex(), dr = {
	...lr,
	table: ur,
	paragraph: Rn(er).replace("hr", Xn).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", ur).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", ar).getRegex()
}, fr = {
	...lr,
	html: Rn("^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:\"[^\"]*\"|'[^']*'|\\s[^'\"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))").replace("comment", or).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
	def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
	heading: /^(#{1,6})(.*)(?:\n+|$)/,
	fences: Bn,
	lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
	paragraph: Rn(er).replace("hr", Xn).replace("heading", " *#{1,6} *[^\n]").replace("lheading", $n).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex()
}, pr = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/, mr = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/, hr = /^( {2,}|\\)\n(?!\s*$)/, gr = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/, _r = "\\p{P}\\p{S}", vr = Rn(/^((?![*_])[\spunctuation])/, "u").replace(/punctuation/g, _r).getRegex(), yr = /\[[^[\]]*?\]\([^\(\)]*?\)|`[^`]*?`|<[^<>]*?>/g, br = Rn(/^(?:\*+(?:((?!\*)[punct])|[^\s*]))|^_+(?:((?!_)[punct])|([^\s_]))/, "u").replace(/punct/g, _r).getRegex(), xr = Rn("^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)[punct](\\*+)(?=[\\s]|$)|[^punct\\s](\\*+)(?!\\*)(?=[punct\\s]|$)|(?!\\*)[punct\\s](\\*+)(?=[^punct\\s])|[\\s](\\*+)(?!\\*)(?=[punct])|(?!\\*)[punct](\\*+)(?!\\*)(?=[punct])|[^punct\\s](\\*+)(?=[^punct\\s])", "gu").replace(/punct/g, _r).getRegex(), Sr = Rn("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)[punct](_+)(?=[\\s]|$)|[^punct\\s](_+)(?!_)(?=[punct\\s]|$)|(?!_)[punct\\s](_+)(?=[^punct\\s])|[\\s](_+)(?!_)(?=[punct])|(?!_)[punct](_+)(?!_)(?=[punct])", "gu").replace(/punct/g, _r).getRegex(), Cr = Rn(/\\([punct])/, "gu").replace(/punct/g, _r).getRegex(), wr = Rn(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(), Tr = Rn(or).replace("(?:-->|$)", "-->").getRegex(), Er = Rn("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", Tr).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(), Dr = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/, Or = Rn(/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/).replace("label", Dr).replace("href", /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(), kr = Rn(/^!?\[(label)\]\[(ref)\]/).replace("label", Dr).replace("ref", nr).getRegex(), Ar = Rn(/^!?\[(ref)\](?:\[\])?/).replace("ref", nr).getRegex(), jr = {
	_backpedal: Bn,
	anyPunctuation: Cr,
	autolink: wr,
	blockSkip: yr,
	br: hr,
	code: mr,
	del: Bn,
	emStrongLDelim: br,
	emStrongRDelimAst: xr,
	emStrongRDelimUnd: Sr,
	escape: pr,
	link: Or,
	nolink: Ar,
	punctuation: vr,
	reflink: kr,
	reflinkSearch: Rn("reflink|nolink(?!\\()", "g").replace("reflink", kr).replace("nolink", Ar).getRegex(),
	tag: Er,
	text: gr,
	url: Bn
}, Mr = {
	...jr,
	link: Rn(/^!?\[(label)\]\((.*?)\)/).replace("label", Dr).getRegex(),
	reflink: Rn(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", Dr).getRegex()
}, Nr = {
	...jr,
	escape: Rn(pr).replace("])", "~|])").getRegex(),
	url: Rn(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/, "i").replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),
	_backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
	del: /^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,
	text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/
}, Pr = {
	...Nr,
	br: Rn(hr).replace("{2,}", "*").getRegex(),
	text: Rn(Nr.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
}, Fr = {
	normal: lr,
	gfm: dr,
	pedantic: fr
}, Ir = {
	normal: jr,
	gfm: Nr,
	breaks: Pr,
	pedantic: Mr
}, Lr = class e {
	tokens;
	options;
	state;
	tokenizer;
	inlineQueue;
	constructor(e) {
		this.tokens = [], this.tokens.links = Object.create(null), this.options = e || En, this.options.tokenizer = this.options.tokenizer || new Kn(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = {
			inLink: !1,
			inRawBlock: !1,
			top: !0
		};
		let t = {
			block: Fr.normal,
			inline: Ir.normal
		};
		this.options.pedantic ? (t.block = Fr.pedantic, t.inline = Ir.pedantic) : this.options.gfm && (t.block = Fr.gfm, t.inline = this.options.breaks ? Ir.breaks : Ir.gfm), this.tokenizer.rules = t;
	}
	static get rules() {
		return {
			block: Fr,
			inline: Ir
		};
	}
	static lex(t, n) {
		return new e(n).lex(t);
	}
	static lexInline(t, n) {
		return new e(n).inlineTokens(t);
	}
	lex(e) {
		e = e.replace(/\r\n|\r/g, "\n"), this.blockTokens(e, this.tokens);
		for (let e = 0; e < this.inlineQueue.length; e++) {
			let t = this.inlineQueue[e];
			this.inlineTokens(t.src, t.tokens);
		}
		return this.inlineQueue = [], this.tokens;
	}
	blockTokens(e, t = []) {
		e = this.options.pedantic ? e.replace(/\t/g, "    ").replace(/^ +$/gm, "") : e.replace(/^( *)(\t+)/gm, (e, t, n) => t + "    ".repeat(n.length));
		let n, r, i, a;
		for (; e;) if (!(this.options.extensions && this.options.extensions.block && this.options.extensions.block.some((r) => (n = r.call({ lexer: this }, e, t)) ? (e = e.substring(n.raw.length), t.push(n), !0) : !1))) {
			if (n = this.tokenizer.space(e)) e = e.substring(n.raw.length), n.raw.length === 1 && t.length > 0 ? t[t.length - 1].raw += "\n" : t.push(n);
			else if (n = this.tokenizer.code(e)) e = e.substring(n.raw.length), r = t[t.length - 1], r && (r.type === "paragraph" || r.type === "text") ? (r.raw += "\n" + n.raw, r.text += "\n" + n.text, this.inlineQueue[this.inlineQueue.length - 1].src = r.text) : t.push(n);
			else if (n = this.tokenizer.fences(e)) e = e.substring(n.raw.length), t.push(n);
			else if (n = this.tokenizer.heading(e)) e = e.substring(n.raw.length), t.push(n);
			else if (n = this.tokenizer.hr(e)) e = e.substring(n.raw.length), t.push(n);
			else if (n = this.tokenizer.blockquote(e)) e = e.substring(n.raw.length), t.push(n);
			else if (n = this.tokenizer.list(e)) e = e.substring(n.raw.length), t.push(n);
			else if (n = this.tokenizer.html(e)) e = e.substring(n.raw.length), t.push(n);
			else if (n = this.tokenizer.def(e)) e = e.substring(n.raw.length), r = t[t.length - 1], r && (r.type === "paragraph" || r.type === "text") ? (r.raw += "\n" + n.raw, r.text += "\n" + n.raw, this.inlineQueue[this.inlineQueue.length - 1].src = r.text) : this.tokens.links[n.tag] || (this.tokens.links[n.tag] = {
				href: n.href,
				title: n.title
			});
			else if (n = this.tokenizer.table(e)) e = e.substring(n.raw.length), t.push(n);
			else if (n = this.tokenizer.lheading(e)) e = e.substring(n.raw.length), t.push(n);
			else {
				if (i = e, this.options.extensions && this.options.extensions.startBlock) {
					let t = Infinity, n = e.slice(1), r;
					this.options.extensions.startBlock.forEach((e) => {
						r = e.call({ lexer: this }, n), typeof r == "number" && r >= 0 && (t = Math.min(t, r));
					}), t < Infinity && t >= 0 && (i = e.substring(0, t + 1));
				}
				if (this.state.top && (n = this.tokenizer.paragraph(i))) r = t[t.length - 1], a && r.type === "paragraph" ? (r.raw += "\n" + n.raw, r.text += "\n" + n.text, this.inlineQueue.pop(), this.inlineQueue[this.inlineQueue.length - 1].src = r.text) : t.push(n), a = i.length !== e.length, e = e.substring(n.raw.length);
				else if (n = this.tokenizer.text(e)) e = e.substring(n.raw.length), r = t[t.length - 1], r && r.type === "text" ? (r.raw += "\n" + n.raw, r.text += "\n" + n.text, this.inlineQueue.pop(), this.inlineQueue[this.inlineQueue.length - 1].src = r.text) : t.push(n);
				else if (e) {
					let t = "Infinite loop on byte: " + e.charCodeAt(0);
					if (this.options.silent) {
						console.error(t);
						break;
					}
					throw Error(t);
				}
			}
		}
		return this.state.top = !0, t;
	}
	inline(e, t = []) {
		return this.inlineQueue.push({
			src: e,
			tokens: t
		}), t;
	}
	inlineTokens(e, t = []) {
		let n, r, i, a = e, o, s, c;
		if (this.tokens.links) {
			let e = Object.keys(this.tokens.links);
			if (e.length > 0) for (; (o = this.tokenizer.rules.inline.reflinkSearch.exec(a)) != null;) e.includes(o[0].slice(o[0].lastIndexOf("[") + 1, -1)) && (a = a.slice(0, o.index) + "[" + "a".repeat(o[0].length - 2) + "]" + a.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex));
		}
		for (; (o = this.tokenizer.rules.inline.blockSkip.exec(a)) != null;) a = a.slice(0, o.index) + "[" + "a".repeat(o[0].length - 2) + "]" + a.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
		for (; (o = this.tokenizer.rules.inline.anyPunctuation.exec(a)) != null;) a = a.slice(0, o.index) + "++" + a.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
		for (; e;) if (s || (c = ""), s = !1, !(this.options.extensions && this.options.extensions.inline && this.options.extensions.inline.some((r) => (n = r.call({ lexer: this }, e, t)) ? (e = e.substring(n.raw.length), t.push(n), !0) : !1))) {
			if (n = this.tokenizer.escape(e)) e = e.substring(n.raw.length), t.push(n);
			else if (n = this.tokenizer.tag(e)) e = e.substring(n.raw.length), r = t[t.length - 1], r && n.type === "text" && r.type === "text" ? (r.raw += n.raw, r.text += n.text) : t.push(n);
			else if (n = this.tokenizer.link(e)) e = e.substring(n.raw.length), t.push(n);
			else if (n = this.tokenizer.reflink(e, this.tokens.links)) e = e.substring(n.raw.length), r = t[t.length - 1], r && n.type === "text" && r.type === "text" ? (r.raw += n.raw, r.text += n.text) : t.push(n);
			else if (n = this.tokenizer.emStrong(e, a, c)) e = e.substring(n.raw.length), t.push(n);
			else if (n = this.tokenizer.codespan(e)) e = e.substring(n.raw.length), t.push(n);
			else if (n = this.tokenizer.br(e)) e = e.substring(n.raw.length), t.push(n);
			else if (n = this.tokenizer.del(e)) e = e.substring(n.raw.length), t.push(n);
			else if (n = this.tokenizer.autolink(e)) e = e.substring(n.raw.length), t.push(n);
			else if (!this.state.inLink && (n = this.tokenizer.url(e))) e = e.substring(n.raw.length), t.push(n);
			else {
				if (i = e, this.options.extensions && this.options.extensions.startInline) {
					let t = Infinity, n = e.slice(1), r;
					this.options.extensions.startInline.forEach((e) => {
						r = e.call({ lexer: this }, n), typeof r == "number" && r >= 0 && (t = Math.min(t, r));
					}), t < Infinity && t >= 0 && (i = e.substring(0, t + 1));
				}
				if (n = this.tokenizer.inlineText(i)) e = e.substring(n.raw.length), n.raw.slice(-1) !== "_" && (c = n.raw.slice(-1)), s = !0, r = t[t.length - 1], r && r.type === "text" ? (r.raw += n.raw, r.text += n.text) : t.push(n);
				else if (e) {
					let t = "Infinite loop on byte: " + e.charCodeAt(0);
					if (this.options.silent) {
						console.error(t);
						break;
					}
					throw Error(t);
				}
			}
		}
		return t;
	}
}, Rr = class {
	options;
	constructor(e) {
		this.options = e || En;
	}
	code(e, t, n) {
		let r = (t || "").match(/^\S*/)?.[0];
		return e = e.replace(/\n$/, "") + "\n", r ? "<pre><code class=\"language-" + Pn(r) + "\">" + (n ? e : Pn(e, !0)) + "</code></pre>\n" : "<pre><code>" + (n ? e : Pn(e, !0)) + "</code></pre>\n";
	}
	blockquote(e) {
		return `<blockquote>\n${e}</blockquote>\n`;
	}
	html(e, t) {
		return e;
	}
	heading(e, t, n) {
		return `<h${t}>${e}</h${t}>\n`;
	}
	hr() {
		return "<hr>\n";
	}
	list(e, t, n) {
		let r = t ? "ol" : "ul", i = t && n !== 1 ? " start=\"" + n + "\"" : "";
		return "<" + r + i + ">\n" + e + "</" + r + ">\n";
	}
	listitem(e, t, n) {
		return `<li>${e}</li>\n`;
	}
	checkbox(e) {
		return "<input " + (e ? "checked=\"\" " : "") + "disabled=\"\" type=\"checkbox\">";
	}
	paragraph(e) {
		return `<p>${e}</p>\n`;
	}
	table(e, t) {
		return t &&= `<tbody>${t}</tbody>`, "<table>\n<thead>\n" + e + "</thead>\n" + t + "</table>\n";
	}
	tablerow(e) {
		return `<tr>\n${e}</tr>\n`;
	}
	tablecell(e, t) {
		let n = t.header ? "th" : "td";
		return (t.align ? `<${n} align="${t.align}">` : `<${n}>`) + e + `</${n}>\n`;
	}
	strong(e) {
		return `<strong>${e}</strong>`;
	}
	em(e) {
		return `<em>${e}</em>`;
	}
	codespan(e) {
		return `<code>${e}</code>`;
	}
	br() {
		return "<br>";
	}
	del(e) {
		return `<del>${e}</del>`;
	}
	link(e, t, n) {
		let r = zn(e);
		if (r === null) return n;
		e = r;
		let i = "<a href=\"" + e + "\"";
		return t && (i += " title=\"" + t + "\""), i += ">" + n + "</a>", i;
	}
	image(e, t, n) {
		let r = zn(e);
		if (r === null) return n;
		e = r;
		let i = `<img src="${e}" alt="${n}"`;
		return t && (i += ` title="${t}"`), i += ">", i;
	}
	text(e) {
		return e;
	}
}, zr = class {
	strong(e) {
		return e;
	}
	em(e) {
		return e;
	}
	codespan(e) {
		return e;
	}
	del(e) {
		return e;
	}
	html(e) {
		return e;
	}
	text(e) {
		return e;
	}
	link(e, t, n) {
		return "" + n;
	}
	image(e, t, n) {
		return "" + n;
	}
	br() {
		return "";
	}
}, Br = class e {
	options;
	renderer;
	textRenderer;
	constructor(e) {
		this.options = e || En, this.options.renderer = this.options.renderer || new Rr(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.textRenderer = new zr();
	}
	static parse(t, n) {
		return new e(n).parse(t);
	}
	static parseInline(t, n) {
		return new e(n).parseInline(t);
	}
	parse(e, t = !0) {
		let n = "";
		for (let r = 0; r < e.length; r++) {
			let i = e[r];
			if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[i.type]) {
				let e = i, t = this.options.extensions.renderers[e.type].call({ parser: this }, e);
				if (t !== !1 || ![
					"space",
					"hr",
					"heading",
					"code",
					"table",
					"blockquote",
					"list",
					"html",
					"paragraph",
					"text"
				].includes(e.type)) {
					n += t || "";
					continue;
				}
			}
			switch (i.type) {
				case "space": continue;
				case "hr":
					n += this.renderer.hr();
					continue;
				case "heading": {
					let e = i;
					n += this.renderer.heading(this.parseInline(e.tokens), e.depth, In(this.parseInline(e.tokens, this.textRenderer)));
					continue;
				}
				case "code": {
					let e = i;
					n += this.renderer.code(e.text, e.lang, !!e.escaped);
					continue;
				}
				case "table": {
					let e = i, t = "", r = "";
					for (let t = 0; t < e.header.length; t++) r += this.renderer.tablecell(this.parseInline(e.header[t].tokens), {
						header: !0,
						align: e.align[t]
					});
					t += this.renderer.tablerow(r);
					let a = "";
					for (let t = 0; t < e.rows.length; t++) {
						let n = e.rows[t];
						r = "";
						for (let t = 0; t < n.length; t++) r += this.renderer.tablecell(this.parseInline(n[t].tokens), {
							header: !1,
							align: e.align[t]
						});
						a += this.renderer.tablerow(r);
					}
					n += this.renderer.table(t, a);
					continue;
				}
				case "blockquote": {
					let e = i, t = this.parse(e.tokens);
					n += this.renderer.blockquote(t);
					continue;
				}
				case "list": {
					let e = i, t = e.ordered, r = e.start, a = e.loose, o = "";
					for (let t = 0; t < e.items.length; t++) {
						let n = e.items[t], r = n.checked, i = n.task, s = "";
						if (n.task) {
							let e = this.renderer.checkbox(!!r);
							a ? n.tokens.length > 0 && n.tokens[0].type === "paragraph" ? (n.tokens[0].text = e + " " + n.tokens[0].text, n.tokens[0].tokens && n.tokens[0].tokens.length > 0 && n.tokens[0].tokens[0].type === "text" && (n.tokens[0].tokens[0].text = e + " " + n.tokens[0].tokens[0].text)) : n.tokens.unshift({
								type: "text",
								text: e + " "
							}) : s += e + " ";
						}
						s += this.parse(n.tokens, a), o += this.renderer.listitem(s, i, !!r);
					}
					n += this.renderer.list(o, t, r);
					continue;
				}
				case "html": {
					let e = i;
					n += this.renderer.html(e.text, e.block);
					continue;
				}
				case "paragraph": {
					let e = i;
					n += this.renderer.paragraph(this.parseInline(e.tokens));
					continue;
				}
				case "text": {
					let a = i, o = a.tokens ? this.parseInline(a.tokens) : a.text;
					for (; r + 1 < e.length && e[r + 1].type === "text";) a = e[++r], o += "\n" + (a.tokens ? this.parseInline(a.tokens) : a.text);
					n += t ? this.renderer.paragraph(o) : o;
					continue;
				}
				default: {
					let e = "Token with \"" + i.type + "\" type was not found.";
					if (this.options.silent) return console.error(e), "";
					throw Error(e);
				}
			}
		}
		return n;
	}
	parseInline(e, t) {
		t ||= this.renderer;
		let n = "";
		for (let r = 0; r < e.length; r++) {
			let i = e[r];
			if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[i.type]) {
				let e = this.options.extensions.renderers[i.type].call({ parser: this }, i);
				if (e !== !1 || ![
					"escape",
					"html",
					"link",
					"image",
					"strong",
					"em",
					"codespan",
					"br",
					"del",
					"text"
				].includes(i.type)) {
					n += e || "";
					continue;
				}
			}
			switch (i.type) {
				case "escape": {
					let e = i;
					n += t.text(e.text);
					break;
				}
				case "html": {
					let e = i;
					n += t.html(e.text);
					break;
				}
				case "link": {
					let e = i;
					n += t.link(e.href, e.title, this.parseInline(e.tokens, t));
					break;
				}
				case "image": {
					let e = i;
					n += t.image(e.href, e.title, e.text);
					break;
				}
				case "strong": {
					let e = i;
					n += t.strong(this.parseInline(e.tokens, t));
					break;
				}
				case "em": {
					let e = i;
					n += t.em(this.parseInline(e.tokens, t));
					break;
				}
				case "codespan": {
					let e = i;
					n += t.codespan(e.text);
					break;
				}
				case "br":
					n += t.br();
					break;
				case "del": {
					let e = i;
					n += t.del(this.parseInline(e.tokens, t));
					break;
				}
				case "text": {
					let e = i;
					n += t.text(e.text);
					break;
				}
				default: {
					let e = "Token with \"" + i.type + "\" type was not found.";
					if (this.options.silent) return console.error(e), "";
					throw Error(e);
				}
			}
		}
		return n;
	}
}, Vr = class {
	options;
	constructor(e) {
		this.options = e || En;
	}
	static passThroughHooks = /* @__PURE__ */ new Set([
		"preprocess",
		"postprocess",
		"processAllTokens"
	]);
	preprocess(e) {
		return e;
	}
	postprocess(e) {
		return e;
	}
	processAllTokens(e) {
		return e;
	}
}, Hr = new class {
	defaults = Tn();
	options = this.setOptions;
	parse = this.#e(Lr.lex, Br.parse);
	parseInline = this.#e(Lr.lexInline, Br.parseInline);
	Parser = Br;
	Renderer = Rr;
	TextRenderer = zr;
	Lexer = Lr;
	Tokenizer = Kn;
	Hooks = Vr;
	constructor(...e) {
		this.use(...e);
	}
	walkTokens(e, t) {
		let n = [];
		for (let r of e) switch (n = n.concat(t.call(this, r)), r.type) {
			case "table": {
				let e = r;
				for (let r of e.header) n = n.concat(this.walkTokens(r.tokens, t));
				for (let r of e.rows) for (let e of r) n = n.concat(this.walkTokens(e.tokens, t));
				break;
			}
			case "list": {
				let e = r;
				n = n.concat(this.walkTokens(e.items, t));
				break;
			}
			default: {
				let e = r;
				this.defaults.extensions?.childTokens?.[e.type] ? this.defaults.extensions.childTokens[e.type].forEach((r) => {
					let i = e[r].flat(Infinity);
					n = n.concat(this.walkTokens(i, t));
				}) : e.tokens && (n = n.concat(this.walkTokens(e.tokens, t)));
			}
		}
		return n;
	}
	use(...e) {
		let t = this.defaults.extensions || {
			renderers: {},
			childTokens: {}
		};
		return e.forEach((e) => {
			let n = { ...e };
			if (n.async = this.defaults.async || n.async || !1, e.extensions && (e.extensions.forEach((e) => {
				if (!e.name) throw Error("extension name required");
				if ("renderer" in e) {
					let n = t.renderers[e.name];
					n ? t.renderers[e.name] = function(...t) {
						let r = e.renderer.apply(this, t);
						return r === !1 && (r = n.apply(this, t)), r;
					} : t.renderers[e.name] = e.renderer;
				}
				if ("tokenizer" in e) {
					if (!e.level || e.level !== "block" && e.level !== "inline") throw Error("extension level must be 'block' or 'inline'");
					let n = t[e.level];
					n ? n.unshift(e.tokenizer) : t[e.level] = [e.tokenizer], e.start && (e.level === "block" ? t.startBlock ? t.startBlock.push(e.start) : t.startBlock = [e.start] : e.level === "inline" && (t.startInline ? t.startInline.push(e.start) : t.startInline = [e.start]));
				}
				"childTokens" in e && e.childTokens && (t.childTokens[e.name] = e.childTokens);
			}), n.extensions = t), e.renderer) {
				let t = this.defaults.renderer || new Rr(this.defaults);
				for (let n in e.renderer) {
					if (!(n in t)) throw Error(`renderer '${n}' does not exist`);
					if (n === "options") continue;
					let r = n, i = e.renderer[r], a = t[r];
					t[r] = (...e) => {
						let n = i.apply(t, e);
						return n === !1 && (n = a.apply(t, e)), n || "";
					};
				}
				n.renderer = t;
			}
			if (e.tokenizer) {
				let t = this.defaults.tokenizer || new Kn(this.defaults);
				for (let n in e.tokenizer) {
					if (!(n in t)) throw Error(`tokenizer '${n}' does not exist`);
					if ([
						"options",
						"rules",
						"lexer"
					].includes(n)) continue;
					let r = n, i = e.tokenizer[r], a = t[r];
					t[r] = (...e) => {
						let n = i.apply(t, e);
						return n === !1 && (n = a.apply(t, e)), n;
					};
				}
				n.tokenizer = t;
			}
			if (e.hooks) {
				let t = this.defaults.hooks || new Vr();
				for (let n in e.hooks) {
					if (!(n in t)) throw Error(`hook '${n}' does not exist`);
					if (n === "options") continue;
					let r = n, i = e.hooks[r], a = t[r];
					t[r] = Vr.passThroughHooks.has(n) ? (e) => {
						if (this.defaults.async) return Promise.resolve(i.call(t, e)).then((e) => a.call(t, e));
						let n = i.call(t, e);
						return a.call(t, n);
					} : (...e) => {
						let n = i.apply(t, e);
						return n === !1 && (n = a.apply(t, e)), n;
					};
				}
				n.hooks = t;
			}
			if (e.walkTokens) {
				let t = this.defaults.walkTokens, r = e.walkTokens;
				n.walkTokens = function(e) {
					let n = [];
					return n.push(r.call(this, e)), t && (n = n.concat(t.call(this, e))), n;
				};
			}
			this.defaults = {
				...this.defaults,
				...n
			};
		}), this;
	}
	setOptions(e) {
		return this.defaults = {
			...this.defaults,
			...e
		}, this;
	}
	lexer(e, t) {
		return Lr.lex(e, t ?? this.defaults);
	}
	parser(e, t) {
		return Br.parse(e, t ?? this.defaults);
	}
	#e(e, t) {
		return (n, r) => {
			let i = { ...r }, a = {
				...this.defaults,
				...i
			};
			this.defaults.async === !0 && i.async === !1 && (a.silent || console.warn("marked(): The async option was set to true by an extension. The async: false option sent to parse will be ignored."), a.async = !0);
			let o = this.#t(!!a.silent, !!a.async);
			if (n == null) return o(/* @__PURE__ */ Error("marked(): input parameter is undefined or null"));
			if (typeof n != "string") return o(/* @__PURE__ */ Error("marked(): input parameter is of type " + Object.prototype.toString.call(n) + ", string expected"));
			if (a.hooks && (a.hooks.options = a), a.async) return Promise.resolve(a.hooks ? a.hooks.preprocess(n) : n).then((t) => e(t, a)).then((e) => a.hooks ? a.hooks.processAllTokens(e) : e).then((e) => a.walkTokens ? Promise.all(this.walkTokens(e, a.walkTokens)).then(() => e) : e).then((e) => t(e, a)).then((e) => a.hooks ? a.hooks.postprocess(e) : e).catch(o);
			try {
				a.hooks && (n = a.hooks.preprocess(n));
				let r = e(n, a);
				a.hooks && (r = a.hooks.processAllTokens(r)), a.walkTokens && this.walkTokens(r, a.walkTokens);
				let i = t(r, a);
				return a.hooks && (i = a.hooks.postprocess(i)), i;
			} catch (e) {
				return o(e);
			}
		};
	}
	#t(e, t) {
		return (n) => {
			if (n.message += "\nPlease report this to https://github.com/markedjs/marked.", e) {
				let e = "<p>An error occurred:</p><pre>" + Pn(n.message + "", !0) + "</pre>";
				return t ? Promise.resolve(e) : e;
			}
			if (t) return Promise.reject(n);
			throw n;
		};
	}
}();
function Ur(e, t) {
	return Hr.parse(e, t);
}
Ur.options = Ur.setOptions = function(e) {
	return Hr.setOptions(e), Ur.defaults = Hr.defaults, Dn(Ur.defaults), Ur;
}, Ur.getDefaults = Tn, Ur.defaults = En, Ur.use = function(...e) {
	return Hr.use(...e), Ur.defaults = Hr.defaults, Dn(Ur.defaults), Ur;
}, Ur.walkTokens = function(e, t) {
	return Hr.walkTokens(e, t);
}, Ur.parseInline = Hr.parseInline, Ur.Parser = Br, Ur.parser = Br.parse, Ur.Renderer = Rr, Ur.TextRenderer = zr, Ur.Lexer = Lr, Ur.lexer = Lr.lex, Ur.Tokenizer = Kn, Ur.Hooks = Vr, Ur.parse = Ur, Ur.options, Ur.setOptions, Ur.use, Ur.walkTokens, Ur.parseInline, Br.parse, Lr.lex;
// node_modules/parse5/dist/common/unicode.js
var Wr = /* @__PURE__ */ new Set([
	65534,
	65535,
	131070,
	131071,
	196606,
	196607,
	262142,
	262143,
	327678,
	327679,
	393214,
	393215,
	458750,
	458751,
	524286,
	524287,
	589822,
	589823,
	655358,
	655359,
	720894,
	720895,
	786430,
	786431,
	851966,
	851967,
	917502,
	917503,
	983038,
	983039,
	1048574,
	1048575,
	1114110,
	1114111
]), G;
(function(e) {
	e[e.EOF = -1] = "EOF", e[e.NULL = 0] = "NULL", e[e.TABULATION = 9] = "TABULATION", e[e.CARRIAGE_RETURN = 13] = "CARRIAGE_RETURN", e[e.LINE_FEED = 10] = "LINE_FEED", e[e.FORM_FEED = 12] = "FORM_FEED", e[e.SPACE = 32] = "SPACE", e[e.EXCLAMATION_MARK = 33] = "EXCLAMATION_MARK", e[e.QUOTATION_MARK = 34] = "QUOTATION_MARK", e[e.AMPERSAND = 38] = "AMPERSAND", e[e.APOSTROPHE = 39] = "APOSTROPHE", e[e.HYPHEN_MINUS = 45] = "HYPHEN_MINUS", e[e.SOLIDUS = 47] = "SOLIDUS", e[e.DIGIT_0 = 48] = "DIGIT_0", e[e.DIGIT_9 = 57] = "DIGIT_9", e[e.SEMICOLON = 59] = "SEMICOLON", e[e.LESS_THAN_SIGN = 60] = "LESS_THAN_SIGN", e[e.EQUALS_SIGN = 61] = "EQUALS_SIGN", e[e.GREATER_THAN_SIGN = 62] = "GREATER_THAN_SIGN", e[e.QUESTION_MARK = 63] = "QUESTION_MARK", e[e.LATIN_CAPITAL_A = 65] = "LATIN_CAPITAL_A", e[e.LATIN_CAPITAL_Z = 90] = "LATIN_CAPITAL_Z", e[e.RIGHT_SQUARE_BRACKET = 93] = "RIGHT_SQUARE_BRACKET", e[e.GRAVE_ACCENT = 96] = "GRAVE_ACCENT", e[e.LATIN_SMALL_A = 97] = "LATIN_SMALL_A", e[e.LATIN_SMALL_Z = 122] = "LATIN_SMALL_Z";
})(G ||= {});
var Gr = {
	DASH_DASH: "--",
	CDATA_START: "[CDATA[",
	DOCTYPE: "doctype",
	SCRIPT: "script",
	PUBLIC: "public",
	SYSTEM: "system"
};
function Kr(e) {
	return e >= 55296 && e <= 57343;
}
function qr(e) {
	return e >= 56320 && e <= 57343;
}
function Jr(e, t) {
	return (e - 55296) * 1024 + 9216 + t;
}
function Yr(e) {
	return e !== 32 && e !== 10 && e !== 13 && e !== 9 && e !== 12 && e >= 1 && e <= 31 || e >= 127 && e <= 159;
}
function Xr(e) {
	return e >= 64976 && e <= 65007 || Wr.has(e);
}
// node_modules/parse5/dist/common/error-codes.js
var K;
(function(e) {
	e.controlCharacterInInputStream = "control-character-in-input-stream", e.noncharacterInInputStream = "noncharacter-in-input-stream", e.surrogateInInputStream = "surrogate-in-input-stream", e.nonVoidHtmlElementStartTagWithTrailingSolidus = "non-void-html-element-start-tag-with-trailing-solidus", e.endTagWithAttributes = "end-tag-with-attributes", e.endTagWithTrailingSolidus = "end-tag-with-trailing-solidus", e.unexpectedSolidusInTag = "unexpected-solidus-in-tag", e.unexpectedNullCharacter = "unexpected-null-character", e.unexpectedQuestionMarkInsteadOfTagName = "unexpected-question-mark-instead-of-tag-name", e.invalidFirstCharacterOfTagName = "invalid-first-character-of-tag-name", e.unexpectedEqualsSignBeforeAttributeName = "unexpected-equals-sign-before-attribute-name", e.missingEndTagName = "missing-end-tag-name", e.unexpectedCharacterInAttributeName = "unexpected-character-in-attribute-name", e.unknownNamedCharacterReference = "unknown-named-character-reference", e.missingSemicolonAfterCharacterReference = "missing-semicolon-after-character-reference", e.unexpectedCharacterAfterDoctypeSystemIdentifier = "unexpected-character-after-doctype-system-identifier", e.unexpectedCharacterInUnquotedAttributeValue = "unexpected-character-in-unquoted-attribute-value", e.eofBeforeTagName = "eof-before-tag-name", e.eofInTag = "eof-in-tag", e.missingAttributeValue = "missing-attribute-value", e.missingWhitespaceBetweenAttributes = "missing-whitespace-between-attributes", e.missingWhitespaceAfterDoctypePublicKeyword = "missing-whitespace-after-doctype-public-keyword", e.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers = "missing-whitespace-between-doctype-public-and-system-identifiers", e.missingWhitespaceAfterDoctypeSystemKeyword = "missing-whitespace-after-doctype-system-keyword", e.missingQuoteBeforeDoctypePublicIdentifier = "missing-quote-before-doctype-public-identifier", e.missingQuoteBeforeDoctypeSystemIdentifier = "missing-quote-before-doctype-system-identifier", e.missingDoctypePublicIdentifier = "missing-doctype-public-identifier", e.missingDoctypeSystemIdentifier = "missing-doctype-system-identifier", e.abruptDoctypePublicIdentifier = "abrupt-doctype-public-identifier", e.abruptDoctypeSystemIdentifier = "abrupt-doctype-system-identifier", e.cdataInHtmlContent = "cdata-in-html-content", e.incorrectlyOpenedComment = "incorrectly-opened-comment", e.eofInScriptHtmlCommentLikeText = "eof-in-script-html-comment-like-text", e.eofInDoctype = "eof-in-doctype", e.nestedComment = "nested-comment", e.abruptClosingOfEmptyComment = "abrupt-closing-of-empty-comment", e.eofInComment = "eof-in-comment", e.incorrectlyClosedComment = "incorrectly-closed-comment", e.eofInCdata = "eof-in-cdata", e.absenceOfDigitsInNumericCharacterReference = "absence-of-digits-in-numeric-character-reference", e.nullCharacterReference = "null-character-reference", e.surrogateCharacterReference = "surrogate-character-reference", e.characterReferenceOutsideUnicodeRange = "character-reference-outside-unicode-range", e.controlCharacterReference = "control-character-reference", e.noncharacterCharacterReference = "noncharacter-character-reference", e.missingWhitespaceBeforeDoctypeName = "missing-whitespace-before-doctype-name", e.missingDoctypeName = "missing-doctype-name", e.invalidCharacterSequenceAfterDoctypeName = "invalid-character-sequence-after-doctype-name", e.duplicateAttribute = "duplicate-attribute", e.nonConformingDoctype = "non-conforming-doctype", e.missingDoctype = "missing-doctype", e.misplacedDoctype = "misplaced-doctype", e.endTagWithoutMatchingOpenElement = "end-tag-without-matching-open-element", e.closingOfElementWithOpenChildElements = "closing-of-element-with-open-child-elements", e.disallowedContentInNoscriptInHead = "disallowed-content-in-noscript-in-head", e.openElementsLeftAfterEof = "open-elements-left-after-eof", e.abandonedHeadElementChild = "abandoned-head-element-child", e.misplacedStartTagForHeadElement = "misplaced-start-tag-for-head-element", e.nestedNoscriptInHead = "nested-noscript-in-head", e.eofInElementThatCanContainOnlyText = "eof-in-element-that-can-contain-only-text";
})(K ||= {});
// node_modules/parse5/dist/tokenizer/preprocessor.js
var Zr = 65536, Qr = class {
	constructor(e) {
		this.handler = e, this.html = "", this.pos = -1, this.lastGapPos = -2, this.gapStack = [], this.skipNextNewLine = !1, this.lastChunkWritten = !1, this.endOfChunkHit = !1, this.bufferWaterline = Zr, this.isEol = !1, this.lineStartPos = 0, this.droppedBufferSize = 0, this.line = 1, this.lastErrOffset = -1;
	}
	get col() {
		return this.pos - this.lineStartPos + Number(this.lastGapPos !== this.pos);
	}
	get codePointStart() {
		return this.pos - Number(this.lastGapPos === this.pos);
	}
	get offset() {
		return this.droppedBufferSize + this.codePointStart;
	}
	getError(e, t) {
		let { line: n, col: r, offset: i } = this, a = r + t, o = i + t;
		return {
			code: e,
			startLine: n,
			endLine: n,
			startCol: a,
			endCol: a,
			startOffset: o,
			endOffset: o
		};
	}
	_err(e) {
		this.handler.onParseError && this.lastErrOffset !== this.offset && (this.lastErrOffset = this.offset, this.handler.onParseError(this.getError(e, 0)));
	}
	_addGap() {
		this.gapStack.push(this.lastGapPos), this.lastGapPos = this.pos;
	}
	_processSurrogate(e) {
		if (this.pos !== this.html.length - 1) {
			let t = this.html.charCodeAt(this.pos + 1);
			if (!qr(e) && qr(t)) return this.pos++, this._addGap(), Jr(e, t);
		} else if (!this.lastChunkWritten) return this.endOfChunkHit = !0, G.EOF;
		return this._err(K.surrogateInInputStream), e;
	}
	willDropParsedChunk() {
		return this.pos > this.bufferWaterline;
	}
	dropParsedChunk(e = 0) {
		if (this.willDropParsedChunk()) {
			let t = this.offset - this.droppedBufferSize - e;
			this.html = this.html.substring(t), this.lineStartPos -= t, this.droppedBufferSize += t, this.pos -= t, this.lastGapPos = -2, this.gapStack.length = 0, this.pos > e && this._addGap();
		}
	}
	write(e, t) {
		this.html.length > 0 ? this.html += e : this.html = e, this.endOfChunkHit = !1, this.lastChunkWritten = t;
	}
	insertHtmlAtCurrentPos(e) {
		this.html = this.html.substring(0, this.pos + 1) + e + this.html.substring(this.pos + 1), this.endOfChunkHit = !1;
	}
	startsWith(e, t) {
		if (this.pos + e.length > this.html.length) return this.endOfChunkHit = !this.lastChunkWritten, !1;
		if (t) return this.html.startsWith(e, this.pos);
		for (let t = 0; t < e.length; t++) if ((this.html.charCodeAt(this.pos + t) | 32) !== e.charCodeAt(t)) return !1;
		return !0;
	}
	peek(e) {
		let t = this.pos + e;
		if (t >= this.html.length) return this.endOfChunkHit = !this.lastChunkWritten, G.EOF;
		let n = this.html.charCodeAt(t);
		return n === G.CARRIAGE_RETURN ? G.LINE_FEED : n;
	}
	advance() {
		if (this.pos++, this.isEol && (this.isEol = !1, this.line++, this.lineStartPos = this.pos), this.pos >= this.html.length) return this.endOfChunkHit = !this.lastChunkWritten, G.EOF;
		let e = this.html.charCodeAt(this.pos);
		return e === G.CARRIAGE_RETURN ? (this.isEol = !0, this.skipNextNewLine = !0, G.LINE_FEED) : e === G.LINE_FEED && (this.isEol = !0, this.skipNextNewLine) ? (this.line--, this.skipNextNewLine = !1, this._addGap(), this.advance()) : (this.skipNextNewLine = !1, Kr(e) && (e = this._processSurrogate(e)), this.handler.onParseError === null || e > 31 && e < 127 || e === G.LINE_FEED || e === G.CARRIAGE_RETURN || e > 159 && e < 64976 || this._checkForProblematicCharacters(e), e);
	}
	_checkForProblematicCharacters(e) {
		Yr(e) ? this._err(K.controlCharacterInInputStream) : Xr(e) && this._err(K.noncharacterInInputStream);
	}
	retreat(e) {
		for (this.pos -= e; this.pos < this.lastGapPos;) this.lastGapPos = this.gapStack.pop(), this.pos--;
		this.isEol = !1;
	}
}, $r;
(function(e) {
	e[e.CHARACTER = 0] = "CHARACTER", e[e.NULL_CHARACTER = 1] = "NULL_CHARACTER", e[e.WHITESPACE_CHARACTER = 2] = "WHITESPACE_CHARACTER", e[e.START_TAG = 3] = "START_TAG", e[e.END_TAG = 4] = "END_TAG", e[e.COMMENT = 5] = "COMMENT", e[e.DOCTYPE = 6] = "DOCTYPE", e[e.EOF = 7] = "EOF", e[e.HIBERNATION = 8] = "HIBERNATION";
})($r ||= {});
function ei(e, t) {
	for (let n = e.attrs.length - 1; n >= 0; n--) if (e.attrs[n].name === t) return e.attrs[n].value;
	return null;
}
// node_modules/parse5/node_modules/entities/dist/decode-codepoint.js
var ti = [
	8364,
	0,
	8218,
	402,
	8222,
	8230,
	8224,
	8225,
	710,
	8240,
	352,
	8249,
	338,
	0,
	381,
	0,
	0,
	8216,
	8217,
	8220,
	8221,
	8226,
	8211,
	8212,
	732,
	8482,
	353,
	8250,
	339,
	0,
	382,
	376
];
function ni(e) {
	return e === 0 || e >= 55296 && e <= 57343 || e > 1114111;
}
function ri(e) {
	return ni(e) ? 65533 : e >= 128 && e <= 159 && ti[e - 128] || e;
}
// node_modules/parse5/node_modules/entities/dist/generated/decode-data-html.js
var ii = ["Q=¨`p0AEligMPacutebrevecircyfrgravelphamacrndogonpfpplyFunctionringscrsigntildeumlBackslashrvwedcyecausernoullistafropfrevescrumpeqCHcyOPYacutepitalDifferentialDyleyscaronedilirconintdotedillanterDotfrhiircleDotMinusPlusTimeslockwiseContourIntegralseCurlyDoubleQuoteQuoteolonengruentinttourIntegralpfroductunterClockwiseContourIntegralrossscrupCapDDotrahdJcyScyZcyaggerrrshvcaronyeltafriacriticalAcuteDotubleAcuteGraveTildemondfferentialDopftDotEqualubleContourIntegralDotwnArrowLeftArrowRightArrowTeeongLeftArrowRightArrowRightArrowRightArrowTeeUpArrowDownArrowVerticalBarwnArrowBarUpArrowBreveLeftRightVectorTeeVectorVectorBarRightTeeVectorVectorBarTeeArrowarrowscrtrokENGTHacutecaronircydotfrgravelementmacrptySmallSquareVerySmallSquareogonpfpsilonqualTildeilibriumscrimtaumlxistsponentialEFcyfrilledSmallSquareVerySmallSquareopfrAlluriertrfscrGJcyTammadbrevecedilircydotfrgopfreaterEqualLessFullEqualGreaterLessSlantEqualTildescrtHARDcyacektcircfrilbertSpaceopfrizontalLinescrtrokumpDownHumpEqualIEcyJligOcyacutecircydotfrgravemacrginaryIpliesntegralrsectionvisibleCommaTimesogonpftascrtildeukcymlJcircyfropfscrercyukcyKHcyJcyappacedilyfropfscrLJcyTacutembdangplacetrfrrcaronedilyeftAngleBracketrrowBarRightArrowCeilingDoubleBracketwnTeeVectorVectorBarFloorRightArrowVectorTeeArrowVectorriangleBarEqualUpDownVectorTeeVectorVectorBarVectorBararrowrightarrowssEqualGreaterFullEqualGreaterLessSlantEqualTildefrleftarrowmidotongLeftArrowRightArrowRightArrowleftarrowrightarrowrightarrowpfwerLeftArrowRightArrowscrhtroktMapcyediumSpacellintrffrinusPlusopfscruNJcyacutecaronedilyegativeMediumSpaceThickSpacenSpaceVeryThinSpacestedGreaterGreaterLessLesswLinefroBreaknBreakingSpacepftCongruentupCapDoubleVerticalBarElementqualTildexistsGreaterEqualFullEqualGreaterLessSlantEqualTildeHumpDownHumpEqualLeftTriangleBarEqualssEqualGreaterLessSlantEqualTildeNestedGreaterGreaterLessLessPrecedesEqualSlantEqualReverseElementightTriangleBarEqualSquareSubsetEqualpersetEqualubsetEqualcceedsEqualSlantEqualTildepersetEqualTildeEqualFullEqualTildeVerticalBarscrtildeuOEligacutecircydblacfrgravemacregaicronopfpenCurlyDoubleQuoteQuoterscrlashtildemesumlverBarraceketParenthesisPartialDcyfrhiilusMinusoincareplanepfrecedesEqualSlantEqualTildeimeoductportionalscriQUOTfropfscrRBarrEGacutengrrtlcaronedilyeverseElementquilibriumUpEquilibriumfrhoightAngleBracketrrowBarLeftArrowCeilingDoubleBracketwnTeeVectorVectorBarFloorTeeArrowVectorriangleBarEqualUpDownVectorTeeVectorVectorBarVectorBararrowopfundImpliesrightarrowscrhuleDelayedSHCHcycyOFTcyacutecaronedilircyfrhortDownArrowLeftArrowRightArrowUpArrowigmamallCircleopfqrtuareIntersectionSubsetEqualpersetEqualUnionscrtarubsetEqualcceedsEqualSlantEqualTildehThatmpersetEqualsetTHORNRADESHcycyabucaronedilyfrhereforetaickSpacenSpaceildeEqualFullEqualTildeopfripleDotscrtrokUacuterrocirbrcyevecircydblacfrgravemacrnderBarraceketParenthesisionPlusogonpfpArrowBarDownArrowDownArrowEquilibriumTeeArrowarrowdownarrowperLeftArrowRightArrowsilonringscrtildeumlVDashbarcydashleerbarticalBarLineSeparatorTildeyThinSpacefropfscrvdashWcircedgefropfscrXfriopfscrYAcyIcyUcyacutecircyfropfscrumlZHcyacutecaronydoteroWidthSpacetafropfscraacutebrevecEdircuteyeligfrgravelefsymphphamacrlgpndanddslopevgelemsdaabcdefghrtvbdsphtzarrogonpfpEacireidosproxeqringscrtympeqtildeumlwconintintbNotackcongepsilonprimesimeqrveewedgebrktbrkcongydquoecausemptyvpsirnoutahweenfrigcapircupodotplustimessqcuptartriangledownupuplusveewedgekarowlacklozengesquaretriangledownleftrightnkk12434ocknequivotopfttomwtiexDLRlrHDUduULRlrVHLRhlrboxdLRlrhDUduminusplustimesuLRlrvHLRhlrprimerevevbarscremiimeolbhsubulletmpEeqcacutepandbrcupcapupdotsretoncapsronedilircupssmdotedilmptyvnterdotfrhcyeckmarkiirEceqlearrowleftrightdRSastcircdashefnintmidscirlubsuitoloneqmmatpfnlementxesngdotintpfrodysrrarrossscrubepetdotudarrlreprsclarrppbrcapcapupdotorsrarrmlyeqprecsuccveewedgerenvearrowleftrightveewedwconintintylctydArrHaraggerlethrrshvbkarowlaccaronydaggerrrotseqegltamptyvfishtrharlriamondsuitsegammasinvideontimesonxjcylcornropollarpfteqdotminusplussquareublebarwedgewnarrowdownarrowsharpoonleftrightrbkarowcornropscryoltroktdotrifuarrharwanglezcyigrarreDDototacutestercaronircolonydotefDotrgravesdotlinterslsdotmacrptysetvsp134ngspogonpfparsllussilonvqcircolonsimlantgtrlessualsestivDDvparslrDotarrscrdotimtahumlroxclistpectationonentialefallingdotseqcyemalefiligligligriligjliglatligtnsnofopfrallkvpartintrac123456823534584556878slownscrgElacutemmadpbrevecircydotelqqslantsccdotollesfrggimeljcylEajnEapproxeqqsimopfravescrimeltccirdotlParquestrapproxrrdoteqlessqlesslesssimvertneqqnEhArrairsplfmiltrdcyrcirwbarcirceartsuitlliprconfrksearowwarowoarrmthtokleftarrowrightarrowpfrbarscrlashtrokybullpheniacutecircyecyxclffrgraveiiintntnfinotajligmacrgelinepartthofpedncarefintieodottcalegersrcallarhkprodocygonpftaprodquestscrinEdotsvvtildeukcymljcircyfrmathopfscrercyukcykappavcedilyfrgreenhcyjcyopfscrlAarrrrtailBarrEgHaracuteemptyvgranmbdangdlepquorrbfsfshklpplsimtltailesbarrbrkracekkeslducaronedililubydcaquorrdharusharsheftarrowtailharpoondownupleftarrowsrightarrowsharpoonssquigarrowthreetimesgqqslantsccdotorgessapproxdoteqgtrqgtrgtrsimfishtloorrgEhardulblkjcylarrcornerhardtrimidotoustachenEapproxeqqsimoangrrbrkngleftarrowrightarrowmapstorightarrowoparrowleftrightparflustimeswastbarzengefparltrarrcornerhardmtrisaquocrhimegqbuortroktccirdothreeimeslarrquestrPariefurdsharuharvertneqqnEmDDotacrletesepstodownleftuprkercommaydasheasuredanglefrhoicrodastcirdotnusbdulcpdrnplusodelspfpscrtposultimapmapnGgtvLeftarrowrightarrowltvRightarrowVDashdashablacutengpEidosproxturalsbspumpecapronedilongdotupydasheArrarhkrowdotquivsearimxistsfrgEeqqslantssimtrhArrarrparisdvjcylArrEarrdreftarrowrightarrowqqslantsssimtriemidopftinEdotvabcnivabcparallelsltolintrcueeceqrArrarrcwightarrowtriesccueerhortmidparallelimeqmidparqsubepeubEeseteqqcceqpEeseteqqtglildelgrianglelefteqrightequmerospvDashHarrapdashgetinfinlArretrierArrtriesimwArrarhkrownearoSacutestcircydashblacivotsoldeligfcirrgonravethbarmintlarrcirrossinetmacregaicrondnusopfparerplusrarrderoffmigoforslopevscrlasholtildemesasumlvbarparallelsimltcyercntiodmilptenkfrhivmmatoneitchforkvlanckhkvusacirbcirdouemnsimtwomointintpfundrEapcueecapproxcurlyeqeqnapproxeqqsimsimimesnEapsimodfalarlinesurfptosimurelscriuncspqfrintopfprimescruaternionsintesteqotrAarrrrtailBarrHaraceutedicemptyvngdelequorrapbfscfshklpplsimtlwtailionalsbarrbrkracekkeslducaronedililubydcaldharquorshealinepartsctgfishtloorrhardulovightarrowtailharpoondownupleftarrowsharpoonsrightarrowssquigarrowthreetimesngsingdotseqlarrharmmoustachenmidoangrrbrkparflustimespargtpolintrarrsaquocrhqbuorthreeimesriefltriuluharxsacutebquocEaproncueedilircnEapsimpolintsimydotbeeArrarhkrowctmiswartminusnxtfrownharpchcyyortmidparallelyigmafvmdoteqgElEneplusrarrlarrmallsetminusshpeparslidletesoftcylbarpfpadesuitrqcapsupssubeseteqpesetequareffrarrscretmnmiletarftarfraightepsilonphinsubEdotedotmultnEeplusrarrseteqqneqqimubpccapproxcurlyeqeqnapproxeqqsimsimmngp123EdotsubedothsolublarrmultnEeplusseteqqneqqimubpwArrarhkrownwarzligtargetubrkcaronedilydotelrecfrhere4foretasymvickapproxsimnspkapsimornildemesbardntoeapbotcirforksaprimeradeiangledownlefteqqrighteqdoteminusplussbtimepeziumscryhcytrokwixtoheadleftarrowrightarrowuArrHaracuterrbrcyevecircydarrblacharfishtrgraveharlrblklcornerroptrimacrlogonpfparrowdownarrowharpoonleftrightlussihlonuparrowsrcornerropingtriscrtdotilderifuarrmlwanglevArrBarvDashangrtrepsilonkappanothingphiiroptorhosigmaubsetneqqpsetneqqthetariangleleftrightcydasheebareqlliprbartfrltrinsubpopfproprtriscrubnEepnEezigzagwcircedbargeqierpfropfpreathscrxcapircupdtrifrhArrarrilArrarrmapnisodotpflustimerArrarrscrqcupuplustriveewedgeyacuteycircyenfricyopfscrucymlzacutecaronydoteetrftafrhcyigrarropfscrwjnjC(D%D($(D'%$$ED($'$'$%$'%E$/D'$F%'D(D&#,%%&&$%$)%+%%$E$F$'$&$(#'D&$(%$&4%($(E'%&%($&$)%*$%$%$+)()')($:&5-($'($%*&&&/%%&)%@$'$F$%&&#%%)$&$&$&$(%%%&$(%$$%&%$E$2.&0,.(.(&'%.$F%$&&&(%6)&+*),---&*/1---)-.&)*+,).%*,&,*'('2+,+)1&'1,)2&'&*('($F%'#&D%D($(E&%$$&$ED($)$'%1(2$'%E$)$'((&+$&%%$%D&$(%-#&$E$3)2$F%'%+$&#'D$$'($$($(%&%$$&$E$$$F$./'*,***'*-*($F$$#)$'%$$'$%$.$&%/$&%'$.'(#'$'$&D(D'%$$&$%D($$%&&*%($%&('+%/,($'%E%%$&$($'E%#(%$$E$F$F%'$'#'$&$'$(%$$E$F$F#'D$$(%'%%%+%%$(%'%$$2(',&,-'*'0).+)1&'('-,)'&*(*)(*/&/('/),))/&')-&'('-%1','*'''-'($E$$%+$($/+-'-',+-'-%E%/(-$&%$%'$$#&$%$-%*$E$+$F$&$$#'$($(%'%$$5+-.)+0%5)+%($E$)%1%%%$&,'(&4&*''+H'(&*-(-L-J-'-M-(&O*H&/2F2((%*(***G*M*(&W,K&+.H.-&1'/3F3(&O2(.I4('H,(().H.-.H(I.(&(+(+,+(&.$FD($$#(D(D'%$$($ED($'%&%($F$6,($$$FE'D(&&D&$)('+&'.#+$%$E$%$$$+$/%%$$%)+(+-+(%&%(&*-%$F%$C'$E$&$F#(D%$(%%%%'%$(%'%$$$%/+-*0$%$%$3)'-&-,(*(0*.,)2&(((&+(+))*0&0((/*,*)0&().&(($&%-$-$&%$$-#)%%$($($$%'%'%&%$$E$0(,(-(*$'$-$F$&%')/))/(+)1()($F$&$%&&)(%)+(+-+(&(%$%$&(+(&&C($'$'%%$%%$$(%'%$$E$+&%%K&)$'(((,(($F$+$F%'C)%%''$'&&D'%$$($ED($'$*)',&(.%&('$'%E$)*&*,%,%.%&((%(%,%/(-%%'&$'$F$(D&#($&$%$'($$%%'&$'*+'+,+(&-$E$F$F$(#($'$E$F$F#F$$$F$F#'$&$&D($'%$$E$F$F$&#'$($(%$$&$0%%$%$&$FC)$($$%D%$E&E&%$D'$$%DD($)&%%&$'&%E$$%&&&$&(&$%$&$&%&&)%*$*$*$*$*$*$*$&%(%*$&&'$&'$'%E$$%$%'%$%%%%%')%D'$F%$%&(%D(D&$*%&#'$*'*'('&*%%'&&)%$&''$'%$$'$()$%(%&%'%%&$&'$E$('&'%&''''(&('&&/.%&(&&&($($.()(+0'0'0(&%%&'$&%%&$E&G%%$F%$&&%'%&'$'$'$&$'$'$'$'$&%'$'$'$&$'$'$'$'$'$'$&&&%'$'$'$&$'$'$'$'$&(&'&(&%'$'$'$&$'$'$'$'$'$'$$($'E'$F%&%%'$%%'$''$&'%%%'$'$($#)%$&&&(&&'%&&&D%&&%$'&&E'%&%&(%$&D'%(E%'($E$&%&('%$$%&$&$'%'..()%*$*&*'*'&$&(&&&'$'(&$'($)$%&($&$'%'))&%%'&&&%E&&F$'%$'%&$F%%'$&$'$$'$))$%&&%%')$%$&(&&'%&&&%&D%')$&+*'(&((F&&.-(%&%&$*%&$(#'$&$(%'%%%%'$$)%&$(%$$$%(&%%(D%%&%($(%D$''$$&'&*''$%$%(%&%$F&)*&&$&$(&&$(%E%$&%(&&(&'&)%/%*'-'..($*%'&&$F&$%%%'$'%%'$$'%&$)$&%)#(%%D(%'$(%%G$%'%$$&$$$'%D$$E'%$&&$$%)%$%$&&$'%&(&($%%'%($$%%%$'%E$&'%%&%%'&'$$(&'%&&**'%'&&&%(%%)$'%&$&%&%%$%E$D&%%$&%&%,&,#0$%$($(%&&&%D$'$G$&%&%&$&$F%'&$'$$*D(($H$($($($'%($G%($($'%'%($'%&%%&$F#%%$$(%&($%$$($'%$$&$$%$%$&$&(%$&%&&)$*$&D'%$E$$%$$'$&$$%$%$%$$%%%''%$&$'$%&$F$'$&%%'$'$D$%%&%%&%'%(%*'%&&&)((&'&&$K%E#'$(%%%'%'&$'&'$$&$'$()&%'%'$E$*&($'%'%.'-%E%'$F%'%'$(%'C)$$E&%$$&E&$%%DD($$%'&%%'%&$'$'&%''''&%%%%&$$%'%&(&%'%$&&&(''&(&'$&%&%E%%$'D($F%%'$'&'$($'$$$%'$'E%#(%$$E$'$F$F%'$'#(($$(%$$E$($&$&$F$F#(%%%'$'$$%$$&$(%)%'%'%%'$'%%$E&%%'$(%'%'%'%'%'&'%%$&&&$'D$'%&%'($&%'&)$$(%'&%%%%$$&%&($%(&(%%$$%*,''..%'-'-1$,+,-'-%$%$&$&(%$&%&&)$*$&D'%&*'&'()''&'&$(%'%D$$%$$''$($%&$&$$%&%)%'%&$(%')'$%%%''%$&$'$%&$'&%%&%.+-')'-%.,(%&&D&&%(%'&&%$&'&$$&'%$'%)%&($%$%&$(%E%$%%'$'$%%&%($%'D$%%&%%&%'%'%'%(%'&$'$'$$*&'$K%E#(D&%%&$'&%$&&)')')%%'$(%$$'$/$E$%D'%$&&&&F&%&($($)$$&%%$($(%E$$$F%'$$%)%&#F%D&D$,(-%D%D&D$-$(%'$'%'%E%$&D&E&%&'%&(%*$D&%F(D$&&&%'%&(F%%%$$'$$%&%''$(%%F%'%'&E%')$$E$E%$&$'D'H&D%&%$&$$'%&%&$$%$&$%$$&$'%D%&%%%$&*(-&$'D'H&D'$%&%$&%($$&$FE$&%(D(F(%)$)$&%(%)$)$$&'('E'D%(%$&&&D'$(E$'%&(D(D%,%&($$%&&&D&D%*)+%%'$($%&%&%((%%%'D'$'F*%,D&%(E&$'D'$'F*%,D$&E'%%%.0%,(1%$$%$&&&%$(%'%E%'%E&D%(%'&D&D'F%'&G%F$'%''$(%%'#%D(%%$&G$%$$'%'%%%%%'$'$'%D$&E'%$$'%$$&$'%&&'%&%$$'%&%(&$&&$F$&%&%&$$%&%$&%(%F$F$%'%%%(%$$&E'%%D(&&)%D&$'#&F$''&&'$&$$%$(&&&&&$&'$E$%&$%'%&$$%*%$$()$'%%%'''$'&'%($'$G%'&'&$$$*%EE&$$%$%%%&%$&$')'*'%'*(&(&'&%&($%%&%&&%%&(''''&$'%%&%'$F%$$(#F$&$F$($F$-'&%&(%E%#(%%%'$'$&$F&&%&%)%%'$'$'%E&%%'%'$(%'$'%'%'%'%'&'%'$%'&%('$'%&%'($&%'&)$$(%'&%%%%$$&%(%&($%%$&'&'''$%%E$$(%'%D$''$($%$&$$,-'(./%(-,+(.(-(-%%%-$'%&%$$()'$'$'&%%&%&&D&&%($&'%%)$'$(%E%$%%&%($$(%'%%'$'$''$)$$#)$'$$%$%%&&%&%$&&%&%%&%&&%)%&%$$&'$'$$'%''$(%E%%%%'%)'$%%$E&&$'%'&$%)(+E$$'($($%$&&&$'$&$'$&$'$&%&'&'$'$/&&%)%%&%%$&$'D$(%$&$'%%E$()&&$$'(D&%(D%&($(&+%'$($(&+%%$&&($&$$'$F%'%'%'$&'$%0+&&%$%&$&&&$'&&'&%'$&'&'&&)%+$)&,$'%'%($%%')'*'%'*(&(&'&%$%%%$F$F$F$&$&&'&&$'&&'(%&'&'&%'$&'&&)%+$)&,$'%'%($$'%''$(%%'D'#)%$$&$(%'%$$&$($E$(('&%(&($%,(&&&%&&&E&$'E&($)%($%%$&%$&&&&&D'&%%$($'%)+'+'/%+$+(0%&&&$&(&'&%&'%)$F&$%&%'$'%1*-#'$&D(%%$'&&D'%$$'%'%&$(%DD($''$%&$()%&&%&$'E$$'%E$)%,%.,(%&%%'$'&%+$()%&&%&%&$F$'%'%%'$$'E%$)#'$&'$$'$(%+&(&*&&'$'(&$'%&('K/D(J/D&('..($%$'$%&&&%%'%'&$$E$'$G'D$F$'$'$F%G(D&F(D$)#($(&%($%'$E$F$$$$%'$F#'%&%%$'$E$'%&$$$'%&$&$&$'%E&&%'$'%&$F%'$(%&$&$(C)&$$'%$D%$E$&$F$F$&E%#)$(%$$&$(%%$E$&$)$F$F$%%%0@0000H8H40H000047P00P@001000@0B0HP@:H9T8P000LB8d@800@I0<110000QQ8400P10030005940@410020000Q02000@0200000@P0101@8000440400000000808000000000@00000000P`0000000040400@0004<000000000008000030000000000P020T400020@0@00000000000000000000000000P0000000400400000400220080000100000000000000000P000000000000P000000@00402000000000@00000000000000000000040000000000000", "Æ&ÁĂÂА𝔄ÀΑĀ⩓Ą𝔸⁡Å𝒜≔ÃÄ∖⫧⌆Б∵ℬΒ𝔅𝔹˘ℬ≎Ч©Ć⋒ⅅℭČÇĈ∰Ċ¸·ℭΧ⊙⊖⊕⊗∲”’∷⩴≡∯∮ℂ∐∳⨯𝒞⋓≍ⅅ⤑ЂЅЏ‡↡⫤ĎД∇Δ𝔇´˙˝`˜⋄ⅆ𝔻¨⃜≐∯¨⇓⇐⇔⫤⟸⟺⟹⇒⊨⇑⇕∥↓⤓⇵̑⥐⥞↽⥖⥟⇁⥗⊤↧⇓𝒟ĐŊÐÉĚÊЭĖ𝔈È∈Ē◻▫Ę𝔼Ε⩵≂⇌ℰ⩳ΗË∃ⅇФ𝔉◼▪𝔽∀ℱℱЃ>ΓϜĞĢĜГĠ𝔊⋙𝔾≥⋛≧⪢≷⩾≳𝒢≫Ъˇ^Ĥℌℋℍ─ℋĦ≎≏ЕĲЁÍÎИİℑÌℑĪⅈ⇒∬∫⋂⁣⁢Į𝕀ΙℐĨІÏĴЙ𝔍𝕁𝒥ЈЄХЌΚĶК𝔎𝕂𝒦Љ<ĹΛ⟪ℒ↞ĽĻЛ⟨←⇤⇆⌈⟦⥡⇃⥙⌊↔⥎⊣↤⥚⊲⧏⊴⥑⥠↿⥘↼⥒⇐⇔⋚≦≶⪡⩽≲𝔏⋘⇚Ŀ⟵⟷⟶⟸⟺⟹𝕃↙↘ℒ↰Ł≪⤅М ℳ𝔐∓𝕄ℳΜЊŃŇŅН​​​​≫≪\n𝔑⁠\xA0ℕ⫬≢≭∦∉≠≂̸∄≯≱≧̸≫̸≹⩾̸≵≎̸≏̸⋪⧏̸⋬≮≰≸≪̸⩽̸≴⪢̸⪡̸⊀⪯̸⋠∌⋫⧐̸⋭⊏̸⋢⊐̸⋣⊂⃒⊈⊁⪰̸⋡≿̸⊃⃒⊉≁≄≇≉∤𝒩ÑΝŒÓÔОŐ𝔒ÒŌΩΟ𝕆“‘⩔𝒪ØÕ⨷Ö‾⏞⎴⏜∂П𝔓ΦΠ±ℌℙ⪻≺⪯≼≾″∏∷∝𝒫Ψ\"𝔔ℚ𝒬⤐®Ŕ⟫↠⤖ŘŖРℜ∋⇋⥯ℜΡ⟩→⇥⇄⌉⟧⥝⇂⥕⌋⊢↦⥛⊳⧐⊵⥏⥜↾⥔⇀⥓⇒ℝ⥰⇛ℛ↱⧴ЩШЬŚ⪼ŠŞŜС𝔖↓←→↑Σ∘𝕊√□⊓⊏⊑⊐⊒⊔𝒮⋆⋐⋐⊆≻⪰≽≿∋∑⋑⊃⊇⋑Þ™ЋЦ	ΤŤŢТ𝔗∴Θ   ∼≃≅≈𝕋⃛𝒯ŦÚ↟⥉ЎŬÛУŰ𝔘ÙŪ_⏟⎵⏝⋃⊎Ų𝕌↑⤒⇅↕⥮⊥↥⇑⇕↖↗ϒΥŮ𝒰ŨÜ⊫⫫В⊩⫦⋁‖‖∣|❘≀ 𝔙𝕍𝒱⊪Ŵ⋀𝔚𝕎𝒲𝔛Ξ𝕏𝒳ЯЇЮÝŶЫ𝔜𝕐𝒴ŸЖŹŽЗŻ​Ζℨℤ𝒵áă∾∾̳∿â´аæ⁡𝔞àℵℵαā⨿&∧⩕⩜⩘⩚∠⦤∠∡⦨⦩⦪⦫⦬⦭⦮⦯∟⊾⦝∢Å⍼ą𝕒≈⩰⩯≊≋'≈≊å𝒶*≈≍ãä∳⨑⫭≌϶‵∽⋍⊽⌅⌅⎵⎶≌б„∵∵⦰϶ℬβℶ≬𝔟⋂◯⋃⨀⨁⨂⨆★▽△⨄⋁⋀⤍⧫▪▴▾◂▸␣▒░▓█=⃥≡⃥⌐𝕓⊥⊥⋈╗╔╖╓═╦╩╤╧╝╚╜╙║╬╣╠╫╢╟⧉╕╒┐┌─╥╨┬┴⊟⊞⊠╛╘┘└│╪╡╞┼┤├‵˘¦𝒷⁏∽⋍\\⧅⟈••≎⪮≏≏ć∩⩄⩉⩋⩇⩀∩︀⁁ˇ⩍čçĉ⩌⩐ċ¸⦲¢·𝔠ч✓✓χ○⧃ˆ≗↺↻®Ⓢ⊛⊚⊝≗⨐⫯⧂♣♣:≔≔,@∁∘∁ℂ≅⩭∮𝕔∐©℗↵✗𝒸⫏⫑⫐⫒⋯⤸⤵⋞⋟↶⤽∪⩈⩆⩊⊍⩅∪︀↷⤼⋞⋟⋎⋏¤↶↷⋎⋏∲∱⌭⇓⥥†ℸ↓‐⊣⤏˝ďдⅆ‡⇊⩷°δ⦱⥿𝔡⇃⇂⋄⋄♦♦¨ϝ⋲÷÷⋇⋇ђ⌞⌍$𝕕˙≐≑∸∔⊡⌆↓⇊⇃⇂⤐⌟⌌𝒹ѕ⧶đ⋱▿▾⇵⥯⦦џ⟿⩷≑é⩮ě≖ê≕эėⅇ≒𝔢⪚è⪖⪘⪙⏧ℓ⪕⪗ē∅∅∅   ŋ ę𝕖⋕⧣⩱εεϵ≖≕≂⪖⪕=≟≡⩸⧥≓⥱ℯ≐≂ηðë€!∃ℰⅇ≒ф♀ﬃﬀﬄ𝔣ﬁfj♭ﬂ▱ƒ𝕗∀⋔⫙⨍½⅓¼⅕⅙⅛⅔⅖¾⅗⅜⅘⅚⅝⅞⁄⌢𝒻≧⪌ǵγϝ⪆ğĝгġ≥⋛≥≧⩾⩾⪩⪀⪂⪄⋛︀⪔𝔤≫⋙ℷѓ≷⪒⪥⪤≩⪊⪊⪈⪈≩⋧𝕘`ℊ≳⪎⪐>⪧⩺⋗⦕⩼⪆⥸⋗⋛⪌≷≳≩︀≩︀⇔ ½ℋъ↔⥈↭ℏĥ♥♥…⊹𝔥⤥⤦⇿∻↩↪𝕙―𝒽ℏħ⁃‐í⁣îие¡⇔𝔦ìⅈ⨌∭⧜℩ĳīℑℐℑı⊷Ƶ∈℅∞⧝ı∫⊺ℤ⊺⨗⨼ёį𝕚ι⨼¿𝒾∈⋹⋵⋴⋳∈⁢ĩіïĵй𝔧ȷ𝕛𝒿јєκϰķк𝔨ĸхќ𝕜𝓀⇚⇐⤛⤎≦⪋⥢ĺ⦴ℒλ⟨⦑⟨⪅«←⇤⤟⤝↩↫⤹⥳↢⪫⤙⪭⪭︀⤌❲{[⦋⦏⦍ľļ⌈{л⤶“„⥧⥋↲≤←↢↽↼⇇↔⇆⇋↭⋋⋚≤≦⩽⩽⪨⩿⪁⪃⋚︀⪓⪅⋖⋚⪋≶≲⥼⌊𝔩≶⪑↽↼⥪▄љ≪⇇⌞⥫◺ŀ⎰⎰≨⪉⪉⪇⪇≨⋦⟬⇽⟦⟵⟷⟼⟶↫↬⦅𝕝⨭⨴∗_◊◊⧫(⦓⇆⌟⇋⥭‎⊿‹𝓁↰≲⪍⪏[‘‚ł<⪦⩹⋖⋋⋉⥶⩻⦖◃⊴◂⥊⥦≨︀≨︀∺¯♂✠✠↦↦↧↤↥▮⨩м—∡𝔪℧µ∣*⫰·−⊟∸⨪⫛…∓⊧𝕞∓𝓂∾μ⊸⊸⋙̸≫⃒≫̸⇍⇎⋘̸≪⃒≪̸⇏⊯⊮∇ń∠⃒≉⩰̸≋̸ŉ≉♮♮ℕ\xA0≎̸≏̸⩃ňņ≇⩭̸⩂н–≠⇗⤤↗↗≐̸≢⤨≂̸∄∄𝔫≧̸≱≱≧̸⩾̸⩾̸≵≯≯⇎↮⫲∋⋼⋺∋њ⇍≦̸↚‥≰↚↮≰≦̸⩽̸⩽̸≮≴≮⋪⋬∤𝕟¬∉⋹̸⋵̸∉⋷⋶∌∌⋾⋽∦∦⫽⃥∂̸⨔⊀⋠⪯̸⊀⪯̸⇏↛⤳̸↝̸↛⋫⋭⊁⋡⪰̸𝓃∤∦≁≄≄∤∦⋢⋣⊄⫅̸⊈⊂⃒⊈⫅̸⊁⪰̸⊅⫆̸⊉⊃⃒⊉⫆̸≹ñ≸⋪⋬⋫⋭ν#№ ⊭⤄≍⃒⊬≥⃒>⃒⧞⤂≤⃒<⃒⊴⃒⤃⊵⃒∼⃒⇖⤣↖↖⤧Ⓢó⊛⊚ôо⊝ő⨸⊙⦼œ⦿𝔬˛ò⧁⦵Ω∮↺⦾⦻‾⧀ōωο⦶⊖𝕠⦷⦹⊕∨↻⩝ℴℴªº⊶⩖⩗⩛ℴø⊘õ⊗⨶ö⌽∥¶∥⫳⫽∂п%.‰⊥‱𝔭φϕℳ☎π⋔ϖℏℎℏ+⨣⊞⨢∔⨥⩲±⨦⨧±⨕𝕡£≺⪳⪷≼⪯≺⪷≼⪯⪹⪵⋨≾′ℙ⪵⪹⋨∏⌮⌒⌓∝∝≾⊰𝓅ψ 𝔮⨌𝕢⁗𝓆ℍ⨖?≟\"⇛⇒⤜⤏⥤∽̱ŕ√⦳⟩⦒⦥⟩»→⥵⇥⤠⤳⤞↪↬⥅⥴↣↝⤚∶ℚ⤍❳}]⦌⦎⦐řŗ⌉}р⤷⥩””↳ℜℛℜℝ▭®⥽⌋𝔯⇁⇀⥬ρϱ→↣⇁⇀⇄⇌⇉↝⋌˚≓⇄⇌‏⎱⎱⫮⟭⇾⟧⦆𝕣⨮⨵)⦔⨒⇉›𝓇↱]’’⋌⋊▹⊵▸⧎⥨℞ś‚≻⪴⪸š≽⪰şŝ⪶⪺⋩⨓≿с⋅⊡⩦⇘⤥↘↘§;⤩∖∖✶𝔰⌢♯щш∣∥­σςς∼⩪≃≃⪞⪠⪝⪟≆⨤⥲←∖⨳⧤∣⌣⪪⪬⪬︀ь/⧄⌿𝕤♠♠∥⊓⊓︀⊔⊔︀⊏⊑⊏⊑⊐⊒⊐⊒□□▪▪→𝓈∖⌣⋆☆★ϵϕ¯⊂⫅⪽⊆⫃⫁⫋⊊⪿⥹⊂⊆⫅⊊⫋⫇⫕⫓≻⪸≽⪰⪺⪶⋩≿∑♪⊃¹²³⫆⪾⫘⊇⫄⟉⫗⥻⫂⫌⊋⫀⊃⊇⫆⊋⫌⫈⫔⫖⇙⤦↙↙⤪ß⌖τ⎴ťţт⃛⌕𝔱∴∴θϑϑ≈∼ ≈∼þ˜×⊠⨱⨰∭⤨⊤⌶⫱𝕥⫚⤩‴™▵▿◃⊴≜▹⊵◬≜⨺⨹⧍⨻⏢𝓉цћŧ≬↞↠⇑⥣ú↑ўŭûу⇅ű⥮⥾𝔲ù↿↾▀⌜⌜⌏◸ū¨ų𝕦↑↕↿↾⊎υϒυ⇈⌝⌝⌎ů◹𝓊⋰ũ▵▴⇈ü⦧⇕⫨⫩⊨⦜ϵϰ∅ϕϖ∝↕ϱς⊊︀⫋︀⊋︀⫌︀ϑ⊲⊳в⊢∨⊻≚⋮||𝔳⊲⊂⃒⊃⃒𝕧∝⊳𝓋⫋︀⊊︀⫌︀⊋︀⦚ŵ⩟∧≙℘𝔴𝕨℘≀≀𝓌⋂◯⋃▽𝔵⟺⟷ξ⟸⟵⟼⋻⨀𝕩⨁⨂⟹⟶𝓍⨆⨄△⋁⋀ýяŷы¥𝔶ї𝕪𝓎юÿźžзżℨζ𝔷ж⇝𝕫𝓏‍‌"], ai = 2654435761, oi = 2246822507, si = 1024, ci = (() => {
	let e = /* @__PURE__ */ new Uint8Array(128);
	for (let t = 48; t <= 57; t++) e[t] = t - 47;
	for (let t = 65; t <= 90; t++) e[t] = t - 54;
	for (let t = 97; t <= 122; t++) e[t] = t - 60;
	return e;
})();
function li(e, t, n) {
	return e.charCodeAt(t) << 25 | e.charCodeAt(t + 1) << 18 | e.charCodeAt(t + n - 2) << 11 | ci[e.charCodeAt(t + n - 1)] << 5 | n;
}
function ui(e, t) {
	return (e * 3 << 3 ^ t) & 1023;
}
function di(e, t) {
	return (Math.imul(e, ai) >>> 16) * t >>> 16;
}
function fi(e, t) {
	return (Math.imul(e, oi) >>> 16) * t >>> 16;
}
function pi(e) {
	let [t, n] = e, r = t.charCodeAt(0) - 48 << 6 | t.charCodeAt(1) - 48, i = t.charCodeAt(2) - 48 << 6 | t.charCodeAt(3) - 48, a = t.charCodeAt(4) - 48 << 6 | t.charCodeAt(5) - 48, o = 6 + i, s = o + 2 * r, c = 2 * a, l = new Int32Array(c), u = new Uint16Array(c), d = new Uint16Array(c), f = new Uint32Array(si), p = /* @__PURE__ */ new Map(), m = [], h = "", g = 6, _ = 0;
	for (let e = 0; e < r; e++) {
		let n = t.charCodeAt(o + 2 * e) - 35, r = t.charCodeAt(o + 2 * e + 1) - 35, i = n & 31, c = i + (r & 31), v = (r >> 5) + 1;
		h = h.slice(0, i) + t.slice(g, g + c - i), g += c - i;
		let y = li(h, 0, c), b = 2 * (t.charCodeAt(s + Math.floor(e / 6)) - 48 & 1 << e % 6 ? fi : di)(y, a);
		if (l[b] !== 0 && (b += 1), l[b] = y, c > 4) {
			let e = h.slice(2, c - 2), t = p.get(e);
			if (t === void 0) {
				p.set(e, m.length), u[b] = m.length;
				for (let t = 0; t < e.length; t += 2) m.push(e.charCodeAt(t) | e.charCodeAt(t + 1) << 16);
			} else u[b] = t;
		}
		let x = ui(h.charCodeAt(0), h.charCodeAt(1));
		f[x] |= c <= 16 ? 1 << c - 2 : 32768, n & 32 && (f[x] |= 1 << c - 2 + 16), d[b] = _ << 2 | v - 1 | (n & 32) >> 4, _ += v;
	}
	return {
		keys: l,
		buckets: a,
		slotMidOff: u,
		slotValue: d,
		values: n,
		lengthBits: f,
		middles: new Uint32Array(m)
	};
}
// node_modules/parse5/node_modules/entities/dist/decode.js
var mi = 35, hi = 59, gi = 61, _i = 48, vi = 97, yi = 120, bi = 65, xi = 32;
function Si(e) {
	return e - _i >>> 0 <= 9;
}
function Ci(e) {
	return Si(e) || (e | xi) - vi >>> 0 <= 25;
}
function wi(e) {
	return e === gi || Ci(e);
}
var Ti;
(function(e) {
	e[e.Legacy = 0] = "Legacy", e[e.Strict = 1] = "Strict", e[e.Attribute = 2] = "Attribute";
})(Ti ||= {});
var Ei = /* #__PURE__ */ pi(ii), Di = Ei.keys, Oi = Ei.buckets, ki = Ei.slotMidOff, Ai = Ei.lengthBits, ji = Ei.middles, Mi = Ei.slotValue, Ni = Ei.values;
function Pi(e, t, n) {
	let r = e.charCodeAt(t), i = e.charCodeAt(t + 1), a = e.charCodeAt(t + n - 2), o = e.charCodeAt(t + n - 1);
	if ((r | i | a | o) > 127) return -1;
	let s = r << 25 | i << 18 | a << 11 | ci[o] << 5 | n, c = 2 * ((Math.imul(s, ai) >>> 16) * Oi >>> 16);
	for (let r = 0;; r++) {
		if (Di[c] === s && (n <= 4 || Fi(c, e, t, n))) return c;
		if (Di[c + 1] === s && (n <= 4 || Fi(c + 1, e, t, n))) return c + 1;
		if (r === 1) return -1;
		c = 2 * ((Math.imul(s, oi) >>> 16) * Oi >>> 16);
	}
}
function Fi(e, t, n, r) {
	let i = ki[e], a = n + 2, o = n + r - 2;
	for (; a + 1 < o;) {
		if ((t.charCodeAt(a) | t.charCodeAt(a + 1) << 16) !== ji[i++]) return !1;
		a += 2;
	}
	return a === o || t.charCodeAt(a) === (ji[i] & 65535);
}
var Ii = /* #__PURE__ */ (() => {
	let e = (/* @__PURE__ */ new Uint8Array(128)).fill(255);
	for (let t = 0; t < 10; t++) e[_i + t] = t;
	for (let t = 0; t < 6; t++) e[bi + t] = t + 10, e[vi + t] = t + 10;
	return e;
})();
function Li(e, t, n) {
	let r = Ai[ui(e.charCodeAt(t), e.charCodeAt(t + 1))] >>> 16 & 31;
	for (; r !== 0;) {
		let i = 31 - Math.clz32(r);
		if (r ^= 1 << i, i + 2 > n) continue;
		let a = Pi(e, t, i + 2);
		if (a >= 0 && Mi[a] & 2) return a << 3 | i + 2;
	}
	return -1;
}
function Ri(e, t, n) {
	let r = e.slice(t, t + 32).indexOf(";");
	if (r - 2 >>> 0 <= 29) {
		let n = Pi(e, t, r);
		if (n >= 0) return n << 6 | r + 1;
	}
	if (n !== Ti.Strict) {
		let r = Li(e, t, Math.min(31, e.length - t));
		if (r >= 0) {
			let i = r & 7;
			if (n !== Ti.Attribute || t + i >= e.length || !wi(e.charCodeAt(t + i))) return r >> 3 << 6 | i;
		}
	}
	return -1;
}
var zi = 0, Bi = 1, Vi = 2, Hi = 3, Ui = 4, Wi = class {
	emitCodePoint;
	errors;
	state = zi;
	consumed = 1;
	result = 0;
	decodeMode = Ti.Strict;
	replaceNumericCodePoint = ri;
	constructor(e, t) {
		this.emitCodePoint = e, this.errors = t;
	}
	stateNumericStart(e, t) {
		return t >= e.length ? -1 : (e.charCodeAt(t) | xi) === yi ? (this.state = Hi, this.consumed += 1, this.stateNumericHex(e, t + 1)) : (this.state = Vi, this.stateNumericDecimal(e, t));
	}
	stateNumericHex(e, t) {
		let n = e.length, { result: r, consumed: i } = this, a = t;
		for (; a < n;) {
			let t = e.charCodeAt(a), n = Ii[t];
			if (n <= 15) r = r * 16 + n;
			else return this.result = r, this.consumed = i, this.emitNumericEntity(t, 3);
			i += 1, a += 1;
		}
		return this.result = r, this.consumed = i, -1;
	}
	stateNumericDecimal(e, t) {
		let n = e.length, { result: r, consumed: i } = this, a = t;
		for (; a < n;) {
			let t = e.charCodeAt(a) - _i;
			if (t >>> 0 > 9) return this.result = r, this.consumed = i, this.emitNumericEntity(t + _i, 2);
			r = r * 10 + t, i += 1, a += 1;
		}
		return this.result = r, this.consumed = i, -1;
	}
	emitNumericEntity(e, t) {
		if (this.consumed <= t) return this.errors?.absenceOfDigitsInNumericCharacterReference(this.consumed), 0;
		if (e === hi) this.consumed += 1;
		else if (this.decodeMode === Ti.Strict) return 0;
		return this.emitCodePoint(this.replaceNumericCodePoint(this.result), this.consumed), this.errors && (e !== hi && this.errors.missingSemicolonAfterCharacterReference(), this.errors.validateNumericCharacterReference(this.result)), this.consumed;
	}
	startEntity(e) {
		this.decodeMode = e, this.state = zi, this.result = 0, this.consumed = 1;
	}
	write(e, t) {
		switch (this.state) {
			case zi: return e.charCodeAt(t) === mi ? (this.state = Bi, this.consumed += 1, this.stateNumericStart(e, t + 1)) : (this.state = Ui, this.stateNamedEntity(e, t));
			case Bi: return this.stateNumericStart(e, t);
			case Vi: return this.stateNumericDecimal(e, t);
			case Hi: return this.stateNumericHex(e, t);
			default: return this.stateNamedEntity(e, t);
		}
	}
	end() {
		switch (this.state) {
			case Ui: return this.endNamedEntity();
			case Vi: return this.emitNumericEntity(0, 2);
			case Hi: return this.emitNumericEntity(0, 3);
			case Bi: return this.errors?.absenceOfDigitsInNumericCharacterReference(this.consumed), 0;
			default: return 0;
		}
	}
}, Gi = class extends Wi {
	runLength = 0;
	nameBuffer = /* @__PURE__ */ new Uint8Array(32);
	emitSlot(e) {
		let t = Mi[e], n = t >> 2;
		this.emitCodePoint(Ni.charCodeAt(n), this.consumed), t & 1 && this.emitCodePoint(Ni.charCodeAt(n + 1), this.consumed);
	}
	startEntity(e) {
		super.startEntity(e), this.runLength = 0;
	}
	stateNamedEntity(e, t) {
		let n = e.length;
		if (this.runLength === 0 && t + 17 <= n) {
			let r = Ai[ui(e.charCodeAt(t), e.charCodeAt(t + 1))];
			if (r & 32768 && t + 32 <= n) {
				let n = Ri(e, t, this.decodeMode);
				if (n >= 0) {
					let r = n & 63;
					return this.consumed = r + 1, this.emitSlot(n >> 6), e.charCodeAt(t + r - 1) !== hi && this.errors?.missingSemicolonAfterCharacterReference(), this.consumed;
				}
				return 0;
			}
			let i = r & 32767;
			for (; i !== 0;) {
				let n = i & -i;
				i ^= n;
				let r = 33 - Math.clz32(n);
				if (e.charCodeAt(t + r) === hi) {
					let n = Pi(e, t, r);
					if (n >= 0) return this.consumed = r + 2, this.emitSlot(n), this.consumed;
				}
			}
			if (!(r & 32768)) {
				if (this.decodeMode !== Ti.Strict) {
					let n = Li(e, t, 31);
					if (n >= 0) {
						let r = n & 7, i = e.charCodeAt(t + r);
						return this.decodeMode === Ti.Attribute && wi(i) ? 0 : (this.consumed = r + 1, this.emitSlot(n >> 3), this.errors?.missingSemicolonAfterCharacterReference(), this.consumed);
					}
				}
				return 0;
			}
		}
		let r = t, { runLength: i } = this, a = -1, o = Math.min(n, t + 32 - i);
		for (; r < o;) {
			let t = e.charCodeAt(r);
			if (!Ci(t)) {
				a = t;
				break;
			}
			this.nameBuffer[i++] = t, r++;
		}
		if (a < 0 && i < 32) return this.runLength = i, -1;
		if (a === hi && i - 2 >>> 0 <= 29) {
			let e = Ki(this.nameBuffer, i);
			if (e >= 0) return this.consumed = i + 2, this.emitSlot(e), this.consumed;
		}
		if (this.decodeMode !== Ti.Strict && i >= 2) {
			let e = Ji(this.nameBuffer, i);
			if (e >= 0) {
				let t = e & 7, n = t < i ? this.nameBuffer[t] : a;
				return this.decodeMode === Ti.Attribute && wi(n) ? 0 : (this.consumed = t + 1, this.emitSlot(e >> 3), this.errors?.missingSemicolonAfterCharacterReference(), this.consumed);
			}
		}
		return 0;
	}
	endNamedEntity() {
		if (this.decodeMode === Ti.Strict || this.runLength < 2) return 0;
		let e = Ji(this.nameBuffer, this.runLength);
		return e < 0 || this.decodeMode === Ti.Attribute && (e & 7) < this.runLength ? 0 : (this.consumed = (e & 7) + 1, this.emitSlot(e >> 3), this.errors?.missingSemicolonAfterCharacterReference(), this.consumed);
	}
};
function Ki(e, t) {
	let n = e[0] << 25 | e[1] << 18 | e[t - 2] << 11 | ci[e[t - 1]] << 5 | t, r = 2 * ((Math.imul(n, ai) >>> 16) * Oi >>> 16);
	for (let i = 0;; i++) {
		if (Di[r] === n && (t <= 4 || qi(r, e, t))) return r;
		if (Di[r + 1] === n && (t <= 4 || qi(r + 1, e, t))) return r + 1;
		if (i === 1) return -1;
		r = 2 * ((Math.imul(n, oi) >>> 16) * Oi >>> 16);
	}
}
function qi(e, t, n) {
	let r = ki[e], i = 2, a = n - 2;
	for (; i + 1 < a;) {
		if ((t[i] | t[i + 1] << 16) !== ji[r++]) return !1;
		i += 2;
	}
	return i === a || t[i] === (ji[r] & 65535);
}
function Ji(e, t) {
	let n = Ai[ui(e[0], e[1])] >>> 16 & 31;
	for (; n !== 0;) {
		let r = 31 - Math.clz32(n);
		if (n ^= 1 << r, r + 2 > t) continue;
		let i = Ki(e, r + 2);
		if (i >= 0 && Mi[i] & 2) return i << 3 | r + 2;
	}
	return -1;
}
// node_modules/parse5/dist/common/html.js
var q;
(function(e) {
	e.HTML = "http://www.w3.org/1999/xhtml", e.MATHML = "http://www.w3.org/1998/Math/MathML", e.SVG = "http://www.w3.org/2000/svg", e.XLINK = "http://www.w3.org/1999/xlink", e.XML = "http://www.w3.org/XML/1998/namespace", e.XMLNS = "http://www.w3.org/2000/xmlns/";
})(q ||= {});
var Yi;
(function(e) {
	e.TYPE = "type", e.ACTION = "action", e.ENCODING = "encoding", e.PROMPT = "prompt", e.NAME = "name", e.COLOR = "color", e.FACE = "face", e.SIZE = "size";
})(Yi ||= {});
var Xi;
(function(e) {
	e.NO_QUIRKS = "no-quirks", e.QUIRKS = "quirks", e.LIMITED_QUIRKS = "limited-quirks";
})(Xi ||= {});
var J;
(function(e) {
	e.A = "a", e.ADDRESS = "address", e.ANNOTATION_XML = "annotation-xml", e.APPLET = "applet", e.AREA = "area", e.ARTICLE = "article", e.ASIDE = "aside", e.B = "b", e.BASE = "base", e.BASEFONT = "basefont", e.BGSOUND = "bgsound", e.BIG = "big", e.BLOCKQUOTE = "blockquote", e.BODY = "body", e.BR = "br", e.BUTTON = "button", e.CAPTION = "caption", e.CENTER = "center", e.CODE = "code", e.COL = "col", e.COLGROUP = "colgroup", e.DD = "dd", e.DESC = "desc", e.DETAILS = "details", e.DIALOG = "dialog", e.DIR = "dir", e.DIV = "div", e.DL = "dl", e.DT = "dt", e.EM = "em", e.EMBED = "embed", e.FIELDSET = "fieldset", e.FIGCAPTION = "figcaption", e.FIGURE = "figure", e.FONT = "font", e.FOOTER = "footer", e.FOREIGN_OBJECT = "foreignObject", e.FORM = "form", e.FRAME = "frame", e.FRAMESET = "frameset", e.H1 = "h1", e.H2 = "h2", e.H3 = "h3", e.H4 = "h4", e.H5 = "h5", e.H6 = "h6", e.HEAD = "head", e.HEADER = "header", e.HGROUP = "hgroup", e.HR = "hr", e.HTML = "html", e.I = "i", e.IMG = "img", e.IMAGE = "image", e.INPUT = "input", e.IFRAME = "iframe", e.KEYGEN = "keygen", e.LABEL = "label", e.LI = "li", e.LINK = "link", e.LISTING = "listing", e.MAIN = "main", e.MALIGNMARK = "malignmark", e.MARQUEE = "marquee", e.MATH = "math", e.MENU = "menu", e.META = "meta", e.MGLYPH = "mglyph", e.MI = "mi", e.MO = "mo", e.MN = "mn", e.MS = "ms", e.MTEXT = "mtext", e.NAV = "nav", e.NOBR = "nobr", e.NOFRAMES = "noframes", e.NOEMBED = "noembed", e.NOSCRIPT = "noscript", e.OBJECT = "object", e.OL = "ol", e.OPTGROUP = "optgroup", e.OPTION = "option", e.P = "p", e.PARAM = "param", e.PLAINTEXT = "plaintext", e.PRE = "pre", e.RB = "rb", e.RP = "rp", e.RT = "rt", e.RTC = "rtc", e.RUBY = "ruby", e.S = "s", e.SCRIPT = "script", e.SEARCH = "search", e.SECTION = "section", e.SELECT = "select", e.SOURCE = "source", e.SMALL = "small", e.SPAN = "span", e.STRIKE = "strike", e.STRONG = "strong", e.STYLE = "style", e.SUB = "sub", e.SUMMARY = "summary", e.SUP = "sup", e.TABLE = "table", e.TBODY = "tbody", e.TEMPLATE = "template", e.TEXTAREA = "textarea", e.TFOOT = "tfoot", e.TD = "td", e.TH = "th", e.THEAD = "thead", e.TITLE = "title", e.TR = "tr", e.TRACK = "track", e.TT = "tt", e.U = "u", e.UL = "ul", e.SVG = "svg", e.VAR = "var", e.WBR = "wbr", e.XMP = "xmp";
})(J ||= {});
var Y;
(function(e) {
	e[e.UNKNOWN = 0] = "UNKNOWN", e[e.A = 1] = "A", e[e.ADDRESS = 2] = "ADDRESS", e[e.ANNOTATION_XML = 3] = "ANNOTATION_XML", e[e.APPLET = 4] = "APPLET", e[e.AREA = 5] = "AREA", e[e.ARTICLE = 6] = "ARTICLE", e[e.ASIDE = 7] = "ASIDE", e[e.B = 8] = "B", e[e.BASE = 9] = "BASE", e[e.BASEFONT = 10] = "BASEFONT", e[e.BGSOUND = 11] = "BGSOUND", e[e.BIG = 12] = "BIG", e[e.BLOCKQUOTE = 13] = "BLOCKQUOTE", e[e.BODY = 14] = "BODY", e[e.BR = 15] = "BR", e[e.BUTTON = 16] = "BUTTON", e[e.CAPTION = 17] = "CAPTION", e[e.CENTER = 18] = "CENTER", e[e.CODE = 19] = "CODE", e[e.COL = 20] = "COL", e[e.COLGROUP = 21] = "COLGROUP", e[e.DD = 22] = "DD", e[e.DESC = 23] = "DESC", e[e.DETAILS = 24] = "DETAILS", e[e.DIALOG = 25] = "DIALOG", e[e.DIR = 26] = "DIR", e[e.DIV = 27] = "DIV", e[e.DL = 28] = "DL", e[e.DT = 29] = "DT", e[e.EM = 30] = "EM", e[e.EMBED = 31] = "EMBED", e[e.FIELDSET = 32] = "FIELDSET", e[e.FIGCAPTION = 33] = "FIGCAPTION", e[e.FIGURE = 34] = "FIGURE", e[e.FONT = 35] = "FONT", e[e.FOOTER = 36] = "FOOTER", e[e.FOREIGN_OBJECT = 37] = "FOREIGN_OBJECT", e[e.FORM = 38] = "FORM", e[e.FRAME = 39] = "FRAME", e[e.FRAMESET = 40] = "FRAMESET", e[e.H1 = 41] = "H1", e[e.H2 = 42] = "H2", e[e.H3 = 43] = "H3", e[e.H4 = 44] = "H4", e[e.H5 = 45] = "H5", e[e.H6 = 46] = "H6", e[e.HEAD = 47] = "HEAD", e[e.HEADER = 48] = "HEADER", e[e.HGROUP = 49] = "HGROUP", e[e.HR = 50] = "HR", e[e.HTML = 51] = "HTML", e[e.I = 52] = "I", e[e.IMG = 53] = "IMG", e[e.IMAGE = 54] = "IMAGE", e[e.INPUT = 55] = "INPUT", e[e.IFRAME = 56] = "IFRAME", e[e.KEYGEN = 57] = "KEYGEN", e[e.LABEL = 58] = "LABEL", e[e.LI = 59] = "LI", e[e.LINK = 60] = "LINK", e[e.LISTING = 61] = "LISTING", e[e.MAIN = 62] = "MAIN", e[e.MALIGNMARK = 63] = "MALIGNMARK", e[e.MARQUEE = 64] = "MARQUEE", e[e.MATH = 65] = "MATH", e[e.MENU = 66] = "MENU", e[e.META = 67] = "META", e[e.MGLYPH = 68] = "MGLYPH", e[e.MI = 69] = "MI", e[e.MO = 70] = "MO", e[e.MN = 71] = "MN", e[e.MS = 72] = "MS", e[e.MTEXT = 73] = "MTEXT", e[e.NAV = 74] = "NAV", e[e.NOBR = 75] = "NOBR", e[e.NOFRAMES = 76] = "NOFRAMES", e[e.NOEMBED = 77] = "NOEMBED", e[e.NOSCRIPT = 78] = "NOSCRIPT", e[e.OBJECT = 79] = "OBJECT", e[e.OL = 80] = "OL", e[e.OPTGROUP = 81] = "OPTGROUP", e[e.OPTION = 82] = "OPTION", e[e.P = 83] = "P", e[e.PARAM = 84] = "PARAM", e[e.PLAINTEXT = 85] = "PLAINTEXT", e[e.PRE = 86] = "PRE", e[e.RB = 87] = "RB", e[e.RP = 88] = "RP", e[e.RT = 89] = "RT", e[e.RTC = 90] = "RTC", e[e.RUBY = 91] = "RUBY", e[e.S = 92] = "S", e[e.SCRIPT = 93] = "SCRIPT", e[e.SEARCH = 94] = "SEARCH", e[e.SECTION = 95] = "SECTION", e[e.SELECT = 96] = "SELECT", e[e.SOURCE = 97] = "SOURCE", e[e.SMALL = 98] = "SMALL", e[e.SPAN = 99] = "SPAN", e[e.STRIKE = 100] = "STRIKE", e[e.STRONG = 101] = "STRONG", e[e.STYLE = 102] = "STYLE", e[e.SUB = 103] = "SUB", e[e.SUMMARY = 104] = "SUMMARY", e[e.SUP = 105] = "SUP", e[e.TABLE = 106] = "TABLE", e[e.TBODY = 107] = "TBODY", e[e.TEMPLATE = 108] = "TEMPLATE", e[e.TEXTAREA = 109] = "TEXTAREA", e[e.TFOOT = 110] = "TFOOT", e[e.TD = 111] = "TD", e[e.TH = 112] = "TH", e[e.THEAD = 113] = "THEAD", e[e.TITLE = 114] = "TITLE", e[e.TR = 115] = "TR", e[e.TRACK = 116] = "TRACK", e[e.TT = 117] = "TT", e[e.U = 118] = "U", e[e.UL = 119] = "UL", e[e.SVG = 120] = "SVG", e[e.VAR = 121] = "VAR", e[e.WBR = 122] = "WBR", e[e.XMP = 123] = "XMP";
})(Y ||= {});
var Zi = /* @__PURE__ */ new Map([
	[J.A, Y.A],
	[J.ADDRESS, Y.ADDRESS],
	[J.ANNOTATION_XML, Y.ANNOTATION_XML],
	[J.APPLET, Y.APPLET],
	[J.AREA, Y.AREA],
	[J.ARTICLE, Y.ARTICLE],
	[J.ASIDE, Y.ASIDE],
	[J.B, Y.B],
	[J.BASE, Y.BASE],
	[J.BASEFONT, Y.BASEFONT],
	[J.BGSOUND, Y.BGSOUND],
	[J.BIG, Y.BIG],
	[J.BLOCKQUOTE, Y.BLOCKQUOTE],
	[J.BODY, Y.BODY],
	[J.BR, Y.BR],
	[J.BUTTON, Y.BUTTON],
	[J.CAPTION, Y.CAPTION],
	[J.CENTER, Y.CENTER],
	[J.CODE, Y.CODE],
	[J.COL, Y.COL],
	[J.COLGROUP, Y.COLGROUP],
	[J.DD, Y.DD],
	[J.DESC, Y.DESC],
	[J.DETAILS, Y.DETAILS],
	[J.DIALOG, Y.DIALOG],
	[J.DIR, Y.DIR],
	[J.DIV, Y.DIV],
	[J.DL, Y.DL],
	[J.DT, Y.DT],
	[J.EM, Y.EM],
	[J.EMBED, Y.EMBED],
	[J.FIELDSET, Y.FIELDSET],
	[J.FIGCAPTION, Y.FIGCAPTION],
	[J.FIGURE, Y.FIGURE],
	[J.FONT, Y.FONT],
	[J.FOOTER, Y.FOOTER],
	[J.FOREIGN_OBJECT, Y.FOREIGN_OBJECT],
	[J.FORM, Y.FORM],
	[J.FRAME, Y.FRAME],
	[J.FRAMESET, Y.FRAMESET],
	[J.H1, Y.H1],
	[J.H2, Y.H2],
	[J.H3, Y.H3],
	[J.H4, Y.H4],
	[J.H5, Y.H5],
	[J.H6, Y.H6],
	[J.HEAD, Y.HEAD],
	[J.HEADER, Y.HEADER],
	[J.HGROUP, Y.HGROUP],
	[J.HR, Y.HR],
	[J.HTML, Y.HTML],
	[J.I, Y.I],
	[J.IMG, Y.IMG],
	[J.IMAGE, Y.IMAGE],
	[J.INPUT, Y.INPUT],
	[J.IFRAME, Y.IFRAME],
	[J.KEYGEN, Y.KEYGEN],
	[J.LABEL, Y.LABEL],
	[J.LI, Y.LI],
	[J.LINK, Y.LINK],
	[J.LISTING, Y.LISTING],
	[J.MAIN, Y.MAIN],
	[J.MALIGNMARK, Y.MALIGNMARK],
	[J.MARQUEE, Y.MARQUEE],
	[J.MATH, Y.MATH],
	[J.MENU, Y.MENU],
	[J.META, Y.META],
	[J.MGLYPH, Y.MGLYPH],
	[J.MI, Y.MI],
	[J.MO, Y.MO],
	[J.MN, Y.MN],
	[J.MS, Y.MS],
	[J.MTEXT, Y.MTEXT],
	[J.NAV, Y.NAV],
	[J.NOBR, Y.NOBR],
	[J.NOFRAMES, Y.NOFRAMES],
	[J.NOEMBED, Y.NOEMBED],
	[J.NOSCRIPT, Y.NOSCRIPT],
	[J.OBJECT, Y.OBJECT],
	[J.OL, Y.OL],
	[J.OPTGROUP, Y.OPTGROUP],
	[J.OPTION, Y.OPTION],
	[J.P, Y.P],
	[J.PARAM, Y.PARAM],
	[J.PLAINTEXT, Y.PLAINTEXT],
	[J.PRE, Y.PRE],
	[J.RB, Y.RB],
	[J.RP, Y.RP],
	[J.RT, Y.RT],
	[J.RTC, Y.RTC],
	[J.RUBY, Y.RUBY],
	[J.S, Y.S],
	[J.SCRIPT, Y.SCRIPT],
	[J.SEARCH, Y.SEARCH],
	[J.SECTION, Y.SECTION],
	[J.SELECT, Y.SELECT],
	[J.SOURCE, Y.SOURCE],
	[J.SMALL, Y.SMALL],
	[J.SPAN, Y.SPAN],
	[J.STRIKE, Y.STRIKE],
	[J.STRONG, Y.STRONG],
	[J.STYLE, Y.STYLE],
	[J.SUB, Y.SUB],
	[J.SUMMARY, Y.SUMMARY],
	[J.SUP, Y.SUP],
	[J.TABLE, Y.TABLE],
	[J.TBODY, Y.TBODY],
	[J.TEMPLATE, Y.TEMPLATE],
	[J.TEXTAREA, Y.TEXTAREA],
	[J.TFOOT, Y.TFOOT],
	[J.TD, Y.TD],
	[J.TH, Y.TH],
	[J.THEAD, Y.THEAD],
	[J.TITLE, Y.TITLE],
	[J.TR, Y.TR],
	[J.TRACK, Y.TRACK],
	[J.TT, Y.TT],
	[J.U, Y.U],
	[J.UL, Y.UL],
	[J.SVG, Y.SVG],
	[J.VAR, Y.VAR],
	[J.WBR, Y.WBR],
	[J.XMP, Y.XMP]
]);
function Qi(e) {
	return Zi.get(e) ?? Y.UNKNOWN;
}
var X = Y, $i = {
	[q.HTML]: /* @__PURE__ */ new Set([
		X.ADDRESS,
		X.APPLET,
		X.AREA,
		X.ARTICLE,
		X.ASIDE,
		X.BASE,
		X.BASEFONT,
		X.BGSOUND,
		X.BLOCKQUOTE,
		X.BODY,
		X.BR,
		X.BUTTON,
		X.CAPTION,
		X.CENTER,
		X.COL,
		X.COLGROUP,
		X.DD,
		X.DETAILS,
		X.DIR,
		X.DIV,
		X.DL,
		X.DT,
		X.EMBED,
		X.FIELDSET,
		X.FIGCAPTION,
		X.FIGURE,
		X.FOOTER,
		X.FORM,
		X.FRAME,
		X.FRAMESET,
		X.H1,
		X.H2,
		X.H3,
		X.H4,
		X.H5,
		X.H6,
		X.HEAD,
		X.HEADER,
		X.HGROUP,
		X.HR,
		X.HTML,
		X.IFRAME,
		X.IMG,
		X.INPUT,
		X.LI,
		X.LINK,
		X.LISTING,
		X.MAIN,
		X.MARQUEE,
		X.MENU,
		X.META,
		X.NAV,
		X.NOEMBED,
		X.NOFRAMES,
		X.NOSCRIPT,
		X.OBJECT,
		X.OL,
		X.P,
		X.PARAM,
		X.PLAINTEXT,
		X.PRE,
		X.SCRIPT,
		X.SECTION,
		X.SELECT,
		X.SOURCE,
		X.STYLE,
		X.SUMMARY,
		X.TABLE,
		X.TBODY,
		X.TD,
		X.TEMPLATE,
		X.TEXTAREA,
		X.TFOOT,
		X.TH,
		X.THEAD,
		X.TITLE,
		X.TR,
		X.TRACK,
		X.UL,
		X.WBR,
		X.XMP
	]),
	[q.MATHML]: /* @__PURE__ */ new Set([
		X.MI,
		X.MO,
		X.MN,
		X.MS,
		X.MTEXT,
		X.ANNOTATION_XML
	]),
	[q.SVG]: /* @__PURE__ */ new Set([
		X.TITLE,
		X.FOREIGN_OBJECT,
		X.DESC
	]),
	[q.XLINK]: /* @__PURE__ */ new Set(),
	[q.XML]: /* @__PURE__ */ new Set(),
	[q.XMLNS]: /* @__PURE__ */ new Set()
}, ea = /* @__PURE__ */ new Set([
	X.H1,
	X.H2,
	X.H3,
	X.H4,
	X.H5,
	X.H6
]);
J.STYLE, J.SCRIPT, J.XMP, J.IFRAME, J.NOEMBED, J.NOFRAMES, J.PLAINTEXT;
// node_modules/parse5/dist/tokenizer/index.js
var ta = 64, Z;
(function(e) {
	e[e.DATA = 0] = "DATA", e[e.RCDATA = 1] = "RCDATA", e[e.RAWTEXT = 2] = "RAWTEXT", e[e.SCRIPT_DATA = 3] = "SCRIPT_DATA", e[e.PLAINTEXT = 4] = "PLAINTEXT", e[e.TAG_OPEN = 5] = "TAG_OPEN", e[e.END_TAG_OPEN = 6] = "END_TAG_OPEN", e[e.TAG_NAME = 7] = "TAG_NAME", e[e.RCDATA_LESS_THAN_SIGN = 8] = "RCDATA_LESS_THAN_SIGN", e[e.RCDATA_END_TAG_OPEN = 9] = "RCDATA_END_TAG_OPEN", e[e.RCDATA_END_TAG_NAME = 10] = "RCDATA_END_TAG_NAME", e[e.RAWTEXT_LESS_THAN_SIGN = 11] = "RAWTEXT_LESS_THAN_SIGN", e[e.RAWTEXT_END_TAG_OPEN = 12] = "RAWTEXT_END_TAG_OPEN", e[e.RAWTEXT_END_TAG_NAME = 13] = "RAWTEXT_END_TAG_NAME", e[e.SCRIPT_DATA_LESS_THAN_SIGN = 14] = "SCRIPT_DATA_LESS_THAN_SIGN", e[e.SCRIPT_DATA_END_TAG_OPEN = 15] = "SCRIPT_DATA_END_TAG_OPEN", e[e.SCRIPT_DATA_END_TAG_NAME = 16] = "SCRIPT_DATA_END_TAG_NAME", e[e.SCRIPT_DATA_ESCAPE_START = 17] = "SCRIPT_DATA_ESCAPE_START", e[e.SCRIPT_DATA_ESCAPE_START_DASH = 18] = "SCRIPT_DATA_ESCAPE_START_DASH", e[e.SCRIPT_DATA_ESCAPED = 19] = "SCRIPT_DATA_ESCAPED", e[e.SCRIPT_DATA_ESCAPED_DASH = 20] = "SCRIPT_DATA_ESCAPED_DASH", e[e.SCRIPT_DATA_ESCAPED_DASH_DASH = 21] = "SCRIPT_DATA_ESCAPED_DASH_DASH", e[e.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN = 22] = "SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN", e[e.SCRIPT_DATA_ESCAPED_END_TAG_OPEN = 23] = "SCRIPT_DATA_ESCAPED_END_TAG_OPEN", e[e.SCRIPT_DATA_ESCAPED_END_TAG_NAME = 24] = "SCRIPT_DATA_ESCAPED_END_TAG_NAME", e[e.SCRIPT_DATA_DOUBLE_ESCAPE_START = 25] = "SCRIPT_DATA_DOUBLE_ESCAPE_START", e[e.SCRIPT_DATA_DOUBLE_ESCAPED = 26] = "SCRIPT_DATA_DOUBLE_ESCAPED", e[e.SCRIPT_DATA_DOUBLE_ESCAPED_DASH = 27] = "SCRIPT_DATA_DOUBLE_ESCAPED_DASH", e[e.SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH = 28] = "SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH", e[e.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN = 29] = "SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN", e[e.SCRIPT_DATA_DOUBLE_ESCAPE_END = 30] = "SCRIPT_DATA_DOUBLE_ESCAPE_END", e[e.BEFORE_ATTRIBUTE_NAME = 31] = "BEFORE_ATTRIBUTE_NAME", e[e.ATTRIBUTE_NAME = 32] = "ATTRIBUTE_NAME", e[e.AFTER_ATTRIBUTE_NAME = 33] = "AFTER_ATTRIBUTE_NAME", e[e.BEFORE_ATTRIBUTE_VALUE = 34] = "BEFORE_ATTRIBUTE_VALUE", e[e.ATTRIBUTE_VALUE_DOUBLE_QUOTED = 35] = "ATTRIBUTE_VALUE_DOUBLE_QUOTED", e[e.ATTRIBUTE_VALUE_SINGLE_QUOTED = 36] = "ATTRIBUTE_VALUE_SINGLE_QUOTED", e[e.ATTRIBUTE_VALUE_UNQUOTED = 37] = "ATTRIBUTE_VALUE_UNQUOTED", e[e.AFTER_ATTRIBUTE_VALUE_QUOTED = 38] = "AFTER_ATTRIBUTE_VALUE_QUOTED", e[e.SELF_CLOSING_START_TAG = 39] = "SELF_CLOSING_START_TAG", e[e.BOGUS_COMMENT = 40] = "BOGUS_COMMENT", e[e.MARKUP_DECLARATION_OPEN = 41] = "MARKUP_DECLARATION_OPEN", e[e.COMMENT_START = 42] = "COMMENT_START", e[e.COMMENT_START_DASH = 43] = "COMMENT_START_DASH", e[e.COMMENT = 44] = "COMMENT", e[e.COMMENT_LESS_THAN_SIGN = 45] = "COMMENT_LESS_THAN_SIGN", e[e.COMMENT_LESS_THAN_SIGN_BANG = 46] = "COMMENT_LESS_THAN_SIGN_BANG", e[e.COMMENT_LESS_THAN_SIGN_BANG_DASH = 47] = "COMMENT_LESS_THAN_SIGN_BANG_DASH", e[e.COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH = 48] = "COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH", e[e.COMMENT_END_DASH = 49] = "COMMENT_END_DASH", e[e.COMMENT_END = 50] = "COMMENT_END", e[e.COMMENT_END_BANG = 51] = "COMMENT_END_BANG", e[e.DOCTYPE = 52] = "DOCTYPE", e[e.BEFORE_DOCTYPE_NAME = 53] = "BEFORE_DOCTYPE_NAME", e[e.DOCTYPE_NAME = 54] = "DOCTYPE_NAME", e[e.AFTER_DOCTYPE_NAME = 55] = "AFTER_DOCTYPE_NAME", e[e.AFTER_DOCTYPE_PUBLIC_KEYWORD = 56] = "AFTER_DOCTYPE_PUBLIC_KEYWORD", e[e.BEFORE_DOCTYPE_PUBLIC_IDENTIFIER = 57] = "BEFORE_DOCTYPE_PUBLIC_IDENTIFIER", e[e.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED = 58] = "DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED", e[e.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED = 59] = "DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED", e[e.AFTER_DOCTYPE_PUBLIC_IDENTIFIER = 60] = "AFTER_DOCTYPE_PUBLIC_IDENTIFIER", e[e.BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS = 61] = "BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS", e[e.AFTER_DOCTYPE_SYSTEM_KEYWORD = 62] = "AFTER_DOCTYPE_SYSTEM_KEYWORD", e[e.BEFORE_DOCTYPE_SYSTEM_IDENTIFIER = 63] = "BEFORE_DOCTYPE_SYSTEM_IDENTIFIER", e[e.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED = 64] = "DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED", e[e.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED = 65] = "DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED", e[e.AFTER_DOCTYPE_SYSTEM_IDENTIFIER = 66] = "AFTER_DOCTYPE_SYSTEM_IDENTIFIER", e[e.BOGUS_DOCTYPE = 67] = "BOGUS_DOCTYPE", e[e.CDATA_SECTION = 68] = "CDATA_SECTION", e[e.CDATA_SECTION_BRACKET = 69] = "CDATA_SECTION_BRACKET", e[e.CDATA_SECTION_END = 70] = "CDATA_SECTION_END", e[e.CHARACTER_REFERENCE = 71] = "CHARACTER_REFERENCE", e[e.AMBIGUOUS_AMPERSAND = 72] = "AMBIGUOUS_AMPERSAND";
})(Z ||= {});
var na = {
	DATA: Z.DATA,
	RCDATA: Z.RCDATA,
	RAWTEXT: Z.RAWTEXT,
	SCRIPT_DATA: Z.SCRIPT_DATA,
	PLAINTEXT: Z.PLAINTEXT,
	CDATA_SECTION: Z.CDATA_SECTION
};
function ra(e) {
	return e >= G.DIGIT_0 && e <= G.DIGIT_9;
}
function ia(e) {
	return e >= G.LATIN_CAPITAL_A && e <= G.LATIN_CAPITAL_Z;
}
function aa(e) {
	return e >= G.LATIN_SMALL_A && e <= G.LATIN_SMALL_Z;
}
function oa(e) {
	return aa(e) || ia(e);
}
function sa(e) {
	return oa(e) || ra(e);
}
function ca(e) {
	return e + 32;
}
function la(e) {
	return e === G.SPACE || e === G.LINE_FEED || e === G.TABULATION || e === G.FORM_FEED || e === G.CARRIAGE_RETURN;
}
function ua(e) {
	return la(e) || e === G.SOLIDUS || e === G.GREATER_THAN_SIGN;
}
function da(e) {
	return e === G.NULL ? K.nullCharacterReference : e > 1114111 ? K.characterReferenceOutsideUnicodeRange : Kr(e) ? K.surrogateCharacterReference : Xr(e) ? K.noncharacterCharacterReference : Yr(e) || e === G.CARRIAGE_RETURN ? K.controlCharacterReference : null;
}
var fa = class {
	constructor(e, t) {
		this.options = e, this.handler = t, this.paused = !1, this.inLoop = !1, this.inForeignNode = !1, this.lastStartTagName = "", this.active = !1, this.state = Z.DATA, this.returnState = Z.DATA, this.entityStartPos = 0, this.consumedAfterSnapshot = -1, this.currentCharacterToken = null, this.currentToken = null, this.currentAttr = {
			name: "",
			value: ""
		}, this.currentAttrLocation = null, this.currentAttrNames = null, this.runStart = 0, this.runEnd = 0, this.preprocessor = new Qr(t), this.currentLocation = this.getCurrentLocation(-1), this.entityDecoder = new Gi((e, t) => {
			this.preprocessor.pos = this.entityStartPos + t - 1, this._isCharacterReferenceInAttribute() || this._ensureCharacterToken(la(e) ? $r.WHITESPACE_CHARACTER : e === G.NULL ? $r.NULL_CHARACTER : $r.CHARACTER), this._extendRunWith(String.fromCodePoint(e), 0), this.entityStartPos = this.preprocessor.pos - t + 1;
		}, t.onParseError ? {
			missingSemicolonAfterCharacterReference: () => {
				this._err(K.missingSemicolonAfterCharacterReference, 1);
			},
			absenceOfDigitsInNumericCharacterReference: (e) => {
				this._err(K.absenceOfDigitsInNumericCharacterReference, this.entityStartPos - this.preprocessor.pos + e);
			},
			validateNumericCharacterReference: (e) => {
				let t = da(e);
				t && this._err(t, 1);
			}
		} : void 0);
	}
	_err(e, t = 0) {
		var n, r;
		(r = (n = this.handler).onParseError) == null || r.call(n, this.preprocessor.getError(e, t));
	}
	getCurrentLocation(e) {
		return this.options.sourceCodeLocationInfo ? {
			startLine: this.preprocessor.line,
			startCol: this.preprocessor.col - e,
			startOffset: this.preprocessor.offset - e,
			endLine: -1,
			endCol: -1,
			endOffset: -1
		} : null;
	}
	_runParsingLoop() {
		if (!this.inLoop) {
			for (this.inLoop = !0; this.active && !this.paused;) {
				this.consumedAfterSnapshot = 0;
				let e = this._consume();
				this._ensureHibernation() || this._callState(e);
			}
			this.inLoop = !1;
		}
	}
	flushCharacters() {
		if (this.inLoop) throw Error("Cannot flush characters from a tokenizer callback");
		let e = this.currentCharacterToken?.location, t = null;
		e && (t = this.getCharacterTokenEndLocation(e), this.currentLocation = t), this.inLoop = !0;
		try {
			this._emitCurrentCharacterToken(t);
		} finally {
			this.inLoop = !1;
		}
		this._runParsingLoop();
	}
	getCharacterTokenEndLocation(e) {
		let t = this.getCharacterTokenEndOffset(), n = this.preprocessor.html.slice(e.startOffset - this.preprocessor.droppedBufferSize, t - this.preprocessor.droppedBufferSize), r = e.startLine, i = -1;
		for (let e = n.indexOf("\n"); e !== -1; e = n.indexOf("\n", e + 1)) r++, i = e;
		for (let e = n.indexOf("\r"); e !== -1; e = n.indexOf("\r", e + 1)) n.charCodeAt(e + 1) !== G.LINE_FEED && (r++, i = Math.max(i, e));
		return {
			startLine: r,
			startCol: i === -1 ? e.startCol + n.length : n.length - i,
			startOffset: t,
			endLine: -1,
			endCol: -1,
			endOffset: -1
		};
	}
	getCharacterTokenEndOffset() {
		let e = this.preprocessor.droppedBufferSize + this.preprocessor.pos + 1, t = this.currentToken?.location;
		switch (this.state) {
			case Z.TAG_OPEN:
			case Z.RCDATA_LESS_THAN_SIGN:
			case Z.RAWTEXT_LESS_THAN_SIGN:
			case Z.SCRIPT_DATA_LESS_THAN_SIGN:
			case Z.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN:
			case Z.CDATA_SECTION_BRACKET: return e - 1;
			case Z.END_TAG_OPEN:
			case Z.MARKUP_DECLARATION_OPEN:
			case Z.RCDATA_END_TAG_OPEN:
			case Z.RCDATA_END_TAG_NAME:
			case Z.RAWTEXT_END_TAG_OPEN:
			case Z.RAWTEXT_END_TAG_NAME:
			case Z.SCRIPT_DATA_END_TAG_OPEN:
			case Z.SCRIPT_DATA_END_TAG_NAME:
			case Z.SCRIPT_DATA_ESCAPED_END_TAG_OPEN:
			case Z.SCRIPT_DATA_ESCAPED_END_TAG_NAME:
			case Z.CDATA_SECTION_END: return e - 2;
			case Z.CHARACTER_REFERENCE: return this._isCharacterReferenceInAttribute() && t ? t.startOffset : this.preprocessor.droppedBufferSize + this.entityStartPos;
			case Z.DOCTYPE:
			case Z.BEFORE_DOCTYPE_NAME: return this.currentLocation.startOffset;
			default: return t && (this.state === Z.TAG_NAME || this.state >= Z.BEFORE_ATTRIBUTE_NAME && this.state <= Z.BOGUS_COMMENT || this.state >= Z.COMMENT_START && this.state <= Z.BOGUS_DOCTYPE) ? t.startOffset : e;
		}
	}
	pause() {
		this.paused = !0;
	}
	resume(e) {
		if (!this.paused) throw Error("Parser was already resumed");
		this.paused = !1, this.inLoop || (this._runParsingLoop(), this.paused || e?.());
	}
	write(e, t, n) {
		this.active = !0, this.preprocessor.write(e, t), this._runParsingLoop(), this.paused || n?.();
	}
	insertHtmlAtCurrentPos(e) {
		this.active = !0, this.preprocessor.insertHtmlAtCurrentPos(e), this._runParsingLoop();
	}
	flushCurrentCharacterToken() {
		if (this.paused || this.active || !this.currentCharacterToken || this.currentToken || this.state === Z.DOCTYPE || this.state === Z.BEFORE_DOCTYPE_NAME || !this.preprocessor.willDropParsedChunk()) return;
		let e = this.preprocessor.droppedBufferSize + this.preprocessor.pos + 1 - this.getCharacterTokenEndOffset();
		this.preprocessor.advance(), this.currentLocation = this.getCurrentLocation(e), this.preprocessor.retreat(1), this._emitCurrentCharacterToken(this.currentLocation), this._createCharacterToken($r.CHARACTER), this.preprocessor.dropParsedChunk(Math.max(e - 1, 0)), this.entityStartPos = this.preprocessor.pos + 1 - e;
	}
	_ensureHibernation() {
		return this.preprocessor.endOfChunkHit ? (this.preprocessor.retreat(this.consumedAfterSnapshot), this.consumedAfterSnapshot = 0, this.active = !1, !0) : !1;
	}
	_consume() {
		return this.consumedAfterSnapshot++, this.preprocessor.advance();
	}
	_advanceBy(e) {
		this.consumedAfterSnapshot += e;
		for (let t = 0; t < e; t++) this.preprocessor.advance();
	}
	_consumeSequenceIfMatch(e, t) {
		return this.preprocessor.startsWith(e, t) ? (this._advanceBy(e.length - 1), !0) : !1;
	}
	_createStartTagToken() {
		this._flushRun(""), this.currentToken = {
			type: $r.START_TAG,
			tagName: "",
			tagID: Y.UNKNOWN,
			selfClosing: !1,
			ackSelfClosing: !1,
			attrs: [],
			location: this.getCurrentLocation(1)
		};
	}
	_createEndTagToken() {
		this._flushRun(""), this.currentToken = {
			type: $r.END_TAG,
			tagName: "",
			tagID: Y.UNKNOWN,
			selfClosing: !1,
			ackSelfClosing: !1,
			attrs: [],
			location: this.getCurrentLocation(2)
		};
	}
	_createCommentToken(e) {
		this._flushRun(""), this.currentToken = {
			type: $r.COMMENT,
			data: "",
			location: this.getCurrentLocation(e)
		};
	}
	_createDoctypeToken(e) {
		this._flushRun(""), this.currentToken = {
			type: $r.DOCTYPE,
			name: e,
			forceQuirks: !1,
			publicId: null,
			systemId: null,
			location: this.currentLocation
		};
	}
	_createCharacterToken(e) {
		if (this.currentLocation) {
			let e = this.currentLocation.startOffset - this.preprocessor.droppedBufferSize;
			this.preprocessor.html[e] === "\n" && this.preprocessor.html[e - 1] === "\r" && this.currentLocation.startOffset++;
		}
		this.currentCharacterToken = {
			type: e,
			chars: "",
			location: this.currentLocation
		};
	}
	_createAttr(e) {
		this._flushRun(""), this.currentAttr = {
			name: e,
			value: ""
		}, this.currentAttrLocation = this.getCurrentLocation(0);
	}
	_leaveAttrName() {
		var e;
		let t = this.currentToken, { name: n } = this.currentAttr, r = this.currentAttrNames, i;
		if (r === null ? (i = ei(t, n) !== null, !i && t.attrs.length === ta && (this.currentAttrNames = new Set(t.attrs.map((e) => e.name)).add(n))) : (i = r.has(n), i || r.add(n)), i) this._err(K.duplicateAttribute);
		else if (t.attrs.push(this.currentAttr), t.location && this.currentAttrLocation) {
			let n = (e = t.location).attrs ?? (e.attrs = Object.create(null));
			n[this.currentAttr.name] = this.currentAttrLocation, this._leaveAttrValue();
		}
	}
	_leaveAttrValue() {
		this.currentAttrLocation && (this.currentAttrLocation.endLine = this.preprocessor.line, this.currentAttrLocation.endCol = this.preprocessor.col, this.currentAttrLocation.endOffset = this.preprocessor.offset);
	}
	_flushRun(e) {
		if (this.runEnd === this.runStart && e.length === 0) return;
		let t = this.preprocessor.html.slice(this.runStart, this.runEnd), n = (t.length < 13 ? t : ` ${t}`.slice(1)) + e, r = this.currentToken;
		this.runStart = this.runEnd, r === null ? this.currentCharacterToken.chars += n : r.type === $r.COMMENT ? r.data += n : this.currentAttr.value += n;
	}
	_extendRun(e) {
		let { preprocessor: t } = this;
		if (e === G.LINE_FEED && t.html.charCodeAt(t.pos) !== G.LINE_FEED) this._flushRun("\n"), this.runStart = t.pos + 1;
		else {
			let n = t.pos - Number(e > 65535);
			n !== this.runEnd && (this._flushRun(""), this.runStart = n);
		}
		this.runEnd = t.pos + 1;
	}
	_extendRunWith(e, t) {
		let { preprocessor: n } = this, r = n.codePointStart + 1 + t - e.length;
		r >= 0 && n.html.startsWith(e, r) ? r !== this.runEnd && (this._flushRun(""), this.runStart = r) : (this._flushRun(e), this.runStart = r + e.length), this.runEnd = r + e.length;
	}
	prepareToken(e) {
		this._emitCurrentCharacterToken(e.location), this.currentToken = null, e.location && (e.location.endLine = this.preprocessor.line, e.location.endCol = this.preprocessor.col + 1, e.location.endOffset = this.preprocessor.offset + 1), this.currentLocation = this.getCurrentLocation(-1);
	}
	emitCurrentTagToken() {
		let e = this.currentToken;
		this.currentAttrNames = null, this.prepareToken(e), e.tagID = Qi(e.tagName), e.type === $r.START_TAG ? (this.lastStartTagName = e.tagName, this.handler.onStartTag(e)) : (e.attrs.length > 0 && this._err(K.endTagWithAttributes), e.selfClosing && this._err(K.endTagWithTrailingSolidus), this.handler.onEndTag(e)), this.preprocessor.dropParsedChunk();
	}
	emitCurrentComment(e) {
		this.prepareToken(e), this.handler.onComment(e), this.preprocessor.dropParsedChunk();
	}
	emitCurrentDoctype(e) {
		this.prepareToken(e), this.handler.onDoctype(e), this.preprocessor.dropParsedChunk();
	}
	_emitCurrentCharacterToken(e) {
		if (this._flushRun(""), this.currentCharacterToken) {
			switch (e && this.currentCharacterToken.location && (this.currentCharacterToken.location.endLine = e.startLine, this.currentCharacterToken.location.endCol = e.startCol, this.currentCharacterToken.location.endOffset = e.startOffset), this.currentCharacterToken.type) {
				case $r.CHARACTER:
					this.handler.onCharacter(this.currentCharacterToken);
					break;
				case $r.NULL_CHARACTER:
					this.handler.onNullCharacter(this.currentCharacterToken);
					break;
				case $r.WHITESPACE_CHARACTER: this.handler.onWhitespaceCharacter(this.currentCharacterToken);
			}
			this.currentCharacterToken = null;
		}
	}
	_emitEOFToken() {
		let e = this.getCurrentLocation(0);
		e && (e.endLine = e.startLine, e.endCol = e.startCol, e.endOffset = e.startOffset), this._emitCurrentCharacterToken(this.currentToken?.location ?? e), this.handler.onEof({
			type: $r.EOF,
			location: e
		}), this.active = !1;
	}
	_ensureCharacterToken(e) {
		if (this.currentCharacterToken) {
			if (this.currentCharacterToken.type === e) return;
			this.currentLocation = this.getCurrentLocation(0), this._emitCurrentCharacterToken(this.currentLocation), this.preprocessor.dropParsedChunk();
		}
		this._createCharacterToken(e);
	}
	_emitCodePoint(e) {
		let t = la(e) ? $r.WHITESPACE_CHARACTER : e === G.NULL ? $r.NULL_CHARACTER : $r.CHARACTER, n = this.currentCharacterToken;
		(n === null || n.type !== t) && this._ensureCharacterToken(t), this._extendRun(e);
	}
	_emitChars(e, t = 0) {
		this.options.sourceCodeLocationInfo && t !== 0 && this.currentCharacterToken && this.currentCharacterToken.type !== $r.CHARACTER ? (this.currentLocation = this.getCurrentLocation(e.length - 1 - t), this._emitCurrentCharacterToken(this.currentLocation), this._createCharacterToken($r.CHARACTER)) : this._ensureCharacterToken($r.CHARACTER), this._extendRunWith(e, t);
	}
	_startCharacterReference() {
		this.returnState = this.state, this.state = Z.CHARACTER_REFERENCE, this.entityStartPos = this.preprocessor.pos, this.entityDecoder.startEntity(this._isCharacterReferenceInAttribute() ? Ti.Attribute : Ti.Legacy);
	}
	_isCharacterReferenceInAttribute() {
		return this.returnState === Z.ATTRIBUTE_VALUE_DOUBLE_QUOTED || this.returnState === Z.ATTRIBUTE_VALUE_SINGLE_QUOTED || this.returnState === Z.ATTRIBUTE_VALUE_UNQUOTED;
	}
	_flushCodePointConsumedAsCharacterReference(e) {
		this._isCharacterReferenceInAttribute() ? this._extendRun(e) : this._emitCodePoint(e);
	}
	_callState(e) {
		switch (this.state) {
			case Z.DATA:
				this._stateData(e);
				break;
			case Z.RCDATA:
				this._stateRcdata(e);
				break;
			case Z.RAWTEXT:
				this._stateRawtext(e);
				break;
			case Z.SCRIPT_DATA:
				this._stateScriptData(e);
				break;
			case Z.PLAINTEXT:
				this._statePlaintext(e);
				break;
			case Z.TAG_OPEN:
				this._stateTagOpen(e);
				break;
			case Z.END_TAG_OPEN:
				this._stateEndTagOpen(e);
				break;
			case Z.TAG_NAME:
				this._stateTagName(e);
				break;
			case Z.RCDATA_LESS_THAN_SIGN:
				this._stateRcdataLessThanSign(e);
				break;
			case Z.RCDATA_END_TAG_OPEN:
				this._stateRcdataEndTagOpen(e);
				break;
			case Z.RCDATA_END_TAG_NAME:
				this._stateRcdataEndTagName(e);
				break;
			case Z.RAWTEXT_LESS_THAN_SIGN:
				this._stateRawtextLessThanSign(e);
				break;
			case Z.RAWTEXT_END_TAG_OPEN:
				this._stateRawtextEndTagOpen(e);
				break;
			case Z.RAWTEXT_END_TAG_NAME:
				this._stateRawtextEndTagName(e);
				break;
			case Z.SCRIPT_DATA_LESS_THAN_SIGN:
				this._stateScriptDataLessThanSign(e);
				break;
			case Z.SCRIPT_DATA_END_TAG_OPEN:
				this._stateScriptDataEndTagOpen(e);
				break;
			case Z.SCRIPT_DATA_END_TAG_NAME:
				this._stateScriptDataEndTagName(e);
				break;
			case Z.SCRIPT_DATA_ESCAPE_START:
				this._stateScriptDataEscapeStart(e);
				break;
			case Z.SCRIPT_DATA_ESCAPE_START_DASH:
				this._stateScriptDataEscapeStartDash(e);
				break;
			case Z.SCRIPT_DATA_ESCAPED:
				this._stateScriptDataEscaped(e);
				break;
			case Z.SCRIPT_DATA_ESCAPED_DASH:
				this._stateScriptDataEscapedDash(e);
				break;
			case Z.SCRIPT_DATA_ESCAPED_DASH_DASH:
				this._stateScriptDataEscapedDashDash(e);
				break;
			case Z.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN:
				this._stateScriptDataEscapedLessThanSign(e);
				break;
			case Z.SCRIPT_DATA_ESCAPED_END_TAG_OPEN:
				this._stateScriptDataEscapedEndTagOpen(e);
				break;
			case Z.SCRIPT_DATA_ESCAPED_END_TAG_NAME:
				this._stateScriptDataEscapedEndTagName(e);
				break;
			case Z.SCRIPT_DATA_DOUBLE_ESCAPE_START:
				this._stateScriptDataDoubleEscapeStart(e);
				break;
			case Z.SCRIPT_DATA_DOUBLE_ESCAPED:
				this._stateScriptDataDoubleEscaped(e);
				break;
			case Z.SCRIPT_DATA_DOUBLE_ESCAPED_DASH:
				this._stateScriptDataDoubleEscapedDash(e);
				break;
			case Z.SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH:
				this._stateScriptDataDoubleEscapedDashDash(e);
				break;
			case Z.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN:
				this._stateScriptDataDoubleEscapedLessThanSign(e);
				break;
			case Z.SCRIPT_DATA_DOUBLE_ESCAPE_END:
				this._stateScriptDataDoubleEscapeEnd(e);
				break;
			case Z.BEFORE_ATTRIBUTE_NAME:
				this._stateBeforeAttributeName(e);
				break;
			case Z.ATTRIBUTE_NAME:
				this._stateAttributeName(e);
				break;
			case Z.AFTER_ATTRIBUTE_NAME:
				this._stateAfterAttributeName(e);
				break;
			case Z.BEFORE_ATTRIBUTE_VALUE:
				this._stateBeforeAttributeValue(e);
				break;
			case Z.ATTRIBUTE_VALUE_DOUBLE_QUOTED:
				this._stateAttributeValueDoubleQuoted(e);
				break;
			case Z.ATTRIBUTE_VALUE_SINGLE_QUOTED:
				this._stateAttributeValueSingleQuoted(e);
				break;
			case Z.ATTRIBUTE_VALUE_UNQUOTED:
				this._stateAttributeValueUnquoted(e);
				break;
			case Z.AFTER_ATTRIBUTE_VALUE_QUOTED:
				this._stateAfterAttributeValueQuoted(e);
				break;
			case Z.SELF_CLOSING_START_TAG:
				this._stateSelfClosingStartTag(e);
				break;
			case Z.BOGUS_COMMENT:
				this._stateBogusComment(e);
				break;
			case Z.MARKUP_DECLARATION_OPEN:
				this._stateMarkupDeclarationOpen(e);
				break;
			case Z.COMMENT_START:
				this._stateCommentStart(e);
				break;
			case Z.COMMENT_START_DASH:
				this._stateCommentStartDash(e);
				break;
			case Z.COMMENT:
				this._stateComment(e);
				break;
			case Z.COMMENT_LESS_THAN_SIGN:
				this._stateCommentLessThanSign(e);
				break;
			case Z.COMMENT_LESS_THAN_SIGN_BANG:
				this._stateCommentLessThanSignBang(e);
				break;
			case Z.COMMENT_LESS_THAN_SIGN_BANG_DASH:
				this._stateCommentLessThanSignBangDash(e);
				break;
			case Z.COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH:
				this._stateCommentLessThanSignBangDashDash(e);
				break;
			case Z.COMMENT_END_DASH:
				this._stateCommentEndDash(e);
				break;
			case Z.COMMENT_END:
				this._stateCommentEnd(e);
				break;
			case Z.COMMENT_END_BANG:
				this._stateCommentEndBang(e);
				break;
			case Z.DOCTYPE:
				this._stateDoctype(e);
				break;
			case Z.BEFORE_DOCTYPE_NAME:
				this._stateBeforeDoctypeName(e);
				break;
			case Z.DOCTYPE_NAME:
				this._stateDoctypeName(e);
				break;
			case Z.AFTER_DOCTYPE_NAME:
				this._stateAfterDoctypeName(e);
				break;
			case Z.AFTER_DOCTYPE_PUBLIC_KEYWORD:
				this._stateAfterDoctypePublicKeyword(e);
				break;
			case Z.BEFORE_DOCTYPE_PUBLIC_IDENTIFIER:
				this._stateBeforeDoctypePublicIdentifier(e);
				break;
			case Z.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED:
				this._stateDoctypePublicIdentifierDoubleQuoted(e);
				break;
			case Z.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED:
				this._stateDoctypePublicIdentifierSingleQuoted(e);
				break;
			case Z.AFTER_DOCTYPE_PUBLIC_IDENTIFIER:
				this._stateAfterDoctypePublicIdentifier(e);
				break;
			case Z.BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS:
				this._stateBetweenDoctypePublicAndSystemIdentifiers(e);
				break;
			case Z.AFTER_DOCTYPE_SYSTEM_KEYWORD:
				this._stateAfterDoctypeSystemKeyword(e);
				break;
			case Z.BEFORE_DOCTYPE_SYSTEM_IDENTIFIER:
				this._stateBeforeDoctypeSystemIdentifier(e);
				break;
			case Z.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED:
				this._stateDoctypeSystemIdentifierDoubleQuoted(e);
				break;
			case Z.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED:
				this._stateDoctypeSystemIdentifierSingleQuoted(e);
				break;
			case Z.AFTER_DOCTYPE_SYSTEM_IDENTIFIER:
				this._stateAfterDoctypeSystemIdentifier(e);
				break;
			case Z.BOGUS_DOCTYPE:
				this._stateBogusDoctype(e);
				break;
			case Z.CDATA_SECTION:
				this._stateCdataSection(e);
				break;
			case Z.CDATA_SECTION_BRACKET:
				this._stateCdataSectionBracket(e);
				break;
			case Z.CDATA_SECTION_END:
				this._stateCdataSectionEnd(e);
				break;
			case Z.CHARACTER_REFERENCE:
				this._stateCharacterReference();
				break;
			case Z.AMBIGUOUS_AMPERSAND:
				this._stateAmbiguousAmpersand(e);
				break;
			default: throw Error("Unknown state");
		}
	}
	_stateData(e) {
		switch (e) {
			case G.LESS_THAN_SIGN:
				this.state = Z.TAG_OPEN;
				break;
			case G.AMPERSAND:
				this._startCharacterReference();
				break;
			case G.NULL:
				this._err(K.unexpectedNullCharacter), this._emitCodePoint(e);
				break;
			case G.EOF:
				this._emitEOFToken();
				break;
			default: this._emitCodePoint(e);
		}
	}
	_stateRcdata(e) {
		switch (e) {
			case G.AMPERSAND:
				this._startCharacterReference();
				break;
			case G.LESS_THAN_SIGN:
				this.state = Z.RCDATA_LESS_THAN_SIGN;
				break;
			case G.NULL:
				this._err(K.unexpectedNullCharacter), this._emitChars("�");
				break;
			case G.EOF:
				this._emitEOFToken();
				break;
			default: this._emitCodePoint(e);
		}
	}
	_stateRawtext(e) {
		switch (e) {
			case G.LESS_THAN_SIGN:
				this.state = Z.RAWTEXT_LESS_THAN_SIGN;
				break;
			case G.NULL:
				this._err(K.unexpectedNullCharacter), this._emitChars("�");
				break;
			case G.EOF:
				this._emitEOFToken();
				break;
			default: this._emitCodePoint(e);
		}
	}
	_stateScriptData(e) {
		switch (e) {
			case G.LESS_THAN_SIGN:
				this.state = Z.SCRIPT_DATA_LESS_THAN_SIGN;
				break;
			case G.NULL:
				this._err(K.unexpectedNullCharacter), this._emitChars("�");
				break;
			case G.EOF:
				this._emitEOFToken();
				break;
			default: this._emitCodePoint(e);
		}
	}
	_statePlaintext(e) {
		switch (e) {
			case G.NULL:
				this._err(K.unexpectedNullCharacter), this._emitChars("�");
				break;
			case G.EOF:
				this._emitEOFToken();
				break;
			default: this._emitCodePoint(e);
		}
	}
	_stateTagOpen(e) {
		if (oa(e)) this._createStartTagToken(), this.state = Z.TAG_NAME, this._stateTagName(e);
		else switch (e) {
			case G.EXCLAMATION_MARK:
				this.state = Z.MARKUP_DECLARATION_OPEN;
				break;
			case G.SOLIDUS:
				this.state = Z.END_TAG_OPEN;
				break;
			case G.QUESTION_MARK:
				this._err(K.unexpectedQuestionMarkInsteadOfTagName), this._createCommentToken(1), this.state = Z.BOGUS_COMMENT, this._stateBogusComment(e);
				break;
			case G.EOF:
				this._err(K.eofBeforeTagName), this._emitChars("<", -1), this._emitEOFToken();
				break;
			default: this._err(K.invalidFirstCharacterOfTagName), this._emitChars("<", -1), this.state = Z.DATA, this._stateData(e);
		}
	}
	_stateEndTagOpen(e) {
		if (oa(e)) this._createEndTagToken(), this.state = Z.TAG_NAME, this._stateTagName(e);
		else switch (e) {
			case G.GREATER_THAN_SIGN:
				this._err(K.missingEndTagName), this.state = Z.DATA;
				break;
			case G.EOF:
				this._err(K.eofBeforeTagName), this._emitChars("</", -1), this._emitEOFToken();
				break;
			default: this._err(K.invalidFirstCharacterOfTagName), this._createCommentToken(2), this.state = Z.BOGUS_COMMENT, this._stateBogusComment(e);
		}
	}
	_stateTagName(e) {
		let t = this.currentToken;
		switch (e) {
			case G.SPACE:
			case G.LINE_FEED:
			case G.TABULATION:
			case G.FORM_FEED:
				this.state = Z.BEFORE_ATTRIBUTE_NAME;
				break;
			case G.SOLIDUS:
				this.state = Z.SELF_CLOSING_START_TAG;
				break;
			case G.GREATER_THAN_SIGN:
				this.state = Z.DATA, this.emitCurrentTagToken();
				break;
			case G.NULL:
				this._err(K.unexpectedNullCharacter), t.tagName += "�";
				break;
			case G.EOF:
				this._err(K.eofInTag), this._emitEOFToken();
				break;
			default: t.tagName += String.fromCodePoint(ia(e) ? ca(e) : e);
		}
	}
	_stateRcdataLessThanSign(e) {
		e === G.SOLIDUS ? this.state = Z.RCDATA_END_TAG_OPEN : (this._emitChars("<", -1), this.state = Z.RCDATA, this._stateRcdata(e));
	}
	_stateRcdataEndTagOpen(e) {
		oa(e) ? (this.state = Z.RCDATA_END_TAG_NAME, this._stateRcdataEndTagName(e)) : (this._emitChars("</", -1), this.state = Z.RCDATA, this._stateRcdata(e));
	}
	handleSpecialEndTag(e) {
		if (!this.preprocessor.startsWith(this.lastStartTagName, !1)) return !this._ensureHibernation();
		this._createEndTagToken();
		let t = this.currentToken;
		switch (t.tagName = this.lastStartTagName, this.preprocessor.peek(this.lastStartTagName.length)) {
			case G.SPACE:
			case G.LINE_FEED:
			case G.TABULATION:
			case G.FORM_FEED: return this._advanceBy(this.lastStartTagName.length), this.state = Z.BEFORE_ATTRIBUTE_NAME, !1;
			case G.SOLIDUS: return this._advanceBy(this.lastStartTagName.length), this.state = Z.SELF_CLOSING_START_TAG, !1;
			case G.GREATER_THAN_SIGN: return this._advanceBy(this.lastStartTagName.length), this.emitCurrentTagToken(), this.state = Z.DATA, !1;
			default: return this.currentToken = null, !this._ensureHibernation();
		}
	}
	_stateRcdataEndTagName(e) {
		this.handleSpecialEndTag(e) && (this._emitChars("</", -1), this.state = Z.RCDATA, this._stateRcdata(e));
	}
	_stateRawtextLessThanSign(e) {
		e === G.SOLIDUS ? this.state = Z.RAWTEXT_END_TAG_OPEN : (this._emitChars("<", -1), this.state = Z.RAWTEXT, this._stateRawtext(e));
	}
	_stateRawtextEndTagOpen(e) {
		oa(e) ? (this.state = Z.RAWTEXT_END_TAG_NAME, this._stateRawtextEndTagName(e)) : (this._emitChars("</", -1), this.state = Z.RAWTEXT, this._stateRawtext(e));
	}
	_stateRawtextEndTagName(e) {
		this.handleSpecialEndTag(e) && (this._emitChars("</", -1), this.state = Z.RAWTEXT, this._stateRawtext(e));
	}
	_stateScriptDataLessThanSign(e) {
		switch (e) {
			case G.SOLIDUS:
				this.state = Z.SCRIPT_DATA_END_TAG_OPEN;
				break;
			case G.EXCLAMATION_MARK:
				this.state = Z.SCRIPT_DATA_ESCAPE_START, this._emitChars("<!");
				break;
			default: this._emitChars("<", -1), this.state = Z.SCRIPT_DATA, this._stateScriptData(e);
		}
	}
	_stateScriptDataEndTagOpen(e) {
		oa(e) ? (this.state = Z.SCRIPT_DATA_END_TAG_NAME, this._stateScriptDataEndTagName(e)) : (this._emitChars("</", -1), this.state = Z.SCRIPT_DATA, this._stateScriptData(e));
	}
	_stateScriptDataEndTagName(e) {
		this.handleSpecialEndTag(e) && (this._emitChars("</", -1), this.state = Z.SCRIPT_DATA, this._stateScriptData(e));
	}
	_stateScriptDataEscapeStart(e) {
		e === G.HYPHEN_MINUS ? (this.state = Z.SCRIPT_DATA_ESCAPE_START_DASH, this._emitChars("-")) : (this.state = Z.SCRIPT_DATA, this._stateScriptData(e));
	}
	_stateScriptDataEscapeStartDash(e) {
		e === G.HYPHEN_MINUS ? (this.state = Z.SCRIPT_DATA_ESCAPED_DASH_DASH, this._emitChars("-")) : (this.state = Z.SCRIPT_DATA, this._stateScriptData(e));
	}
	_stateScriptDataEscaped(e) {
		switch (e) {
			case G.HYPHEN_MINUS:
				this.state = Z.SCRIPT_DATA_ESCAPED_DASH, this._emitChars("-");
				break;
			case G.LESS_THAN_SIGN:
				this.state = Z.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;
				break;
			case G.NULL:
				this._err(K.unexpectedNullCharacter), this._emitChars("�");
				break;
			case G.EOF:
				this._err(K.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
				break;
			default: this._emitCodePoint(e);
		}
	}
	_stateScriptDataEscapedDash(e) {
		switch (e) {
			case G.HYPHEN_MINUS:
				this.state = Z.SCRIPT_DATA_ESCAPED_DASH_DASH, this._emitChars("-");
				break;
			case G.LESS_THAN_SIGN:
				this.state = Z.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;
				break;
			case G.NULL:
				this._err(K.unexpectedNullCharacter), this.state = Z.SCRIPT_DATA_ESCAPED, this._emitChars("�");
				break;
			case G.EOF:
				this._err(K.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
				break;
			default: this.state = Z.SCRIPT_DATA_ESCAPED, this._emitCodePoint(e);
		}
	}
	_stateScriptDataEscapedDashDash(e) {
		switch (e) {
			case G.HYPHEN_MINUS:
				this._emitChars("-");
				break;
			case G.LESS_THAN_SIGN:
				this.state = Z.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;
				break;
			case G.GREATER_THAN_SIGN:
				this.state = Z.SCRIPT_DATA, this._emitChars(">");
				break;
			case G.NULL:
				this._err(K.unexpectedNullCharacter), this.state = Z.SCRIPT_DATA_ESCAPED, this._emitChars("�");
				break;
			case G.EOF:
				this._err(K.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
				break;
			default: this.state = Z.SCRIPT_DATA_ESCAPED, this._emitCodePoint(e);
		}
	}
	_stateScriptDataEscapedLessThanSign(e) {
		e === G.SOLIDUS ? this.state = Z.SCRIPT_DATA_ESCAPED_END_TAG_OPEN : oa(e) ? (this._emitChars("<", -1), this.state = Z.SCRIPT_DATA_DOUBLE_ESCAPE_START, this._stateScriptDataDoubleEscapeStart(e)) : (this._emitChars("<", -1), this.state = Z.SCRIPT_DATA_ESCAPED, this._stateScriptDataEscaped(e));
	}
	_stateScriptDataEscapedEndTagOpen(e) {
		oa(e) ? (this.state = Z.SCRIPT_DATA_ESCAPED_END_TAG_NAME, this._stateScriptDataEscapedEndTagName(e)) : (this._emitChars("</", -1), this.state = Z.SCRIPT_DATA_ESCAPED, this._stateScriptDataEscaped(e));
	}
	_stateScriptDataEscapedEndTagName(e) {
		this.handleSpecialEndTag(e) && (this._emitChars("</", -1), this.state = Z.SCRIPT_DATA_ESCAPED, this._stateScriptDataEscaped(e));
	}
	_stateScriptDataDoubleEscapeStart(e) {
		if (this.preprocessor.startsWith(Gr.SCRIPT, !1) && ua(this.preprocessor.peek(Gr.SCRIPT.length))) {
			this._emitCodePoint(e);
			for (let e = 0; e < Gr.SCRIPT.length; e++) this._emitCodePoint(this._consume());
			this.state = Z.SCRIPT_DATA_DOUBLE_ESCAPED;
		} else this._ensureHibernation() || (this.state = Z.SCRIPT_DATA_ESCAPED, this._stateScriptDataEscaped(e));
	}
	_stateScriptDataDoubleEscaped(e) {
		switch (e) {
			case G.HYPHEN_MINUS:
				this.state = Z.SCRIPT_DATA_DOUBLE_ESCAPED_DASH, this._emitChars("-");
				break;
			case G.LESS_THAN_SIGN:
				this.state = Z.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN, this._emitChars("<");
				break;
			case G.NULL:
				this._err(K.unexpectedNullCharacter), this._emitChars("�");
				break;
			case G.EOF:
				this._err(K.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
				break;
			default: this._emitCodePoint(e);
		}
	}
	_stateScriptDataDoubleEscapedDash(e) {
		switch (e) {
			case G.HYPHEN_MINUS:
				this.state = Z.SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH, this._emitChars("-");
				break;
			case G.LESS_THAN_SIGN:
				this.state = Z.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN, this._emitChars("<");
				break;
			case G.NULL:
				this._err(K.unexpectedNullCharacter), this.state = Z.SCRIPT_DATA_DOUBLE_ESCAPED, this._emitChars("�");
				break;
			case G.EOF:
				this._err(K.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
				break;
			default: this.state = Z.SCRIPT_DATA_DOUBLE_ESCAPED, this._emitCodePoint(e);
		}
	}
	_stateScriptDataDoubleEscapedDashDash(e) {
		switch (e) {
			case G.HYPHEN_MINUS:
				this._emitChars("-");
				break;
			case G.LESS_THAN_SIGN:
				this.state = Z.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN, this._emitChars("<");
				break;
			case G.GREATER_THAN_SIGN:
				this.state = Z.SCRIPT_DATA, this._emitChars(">");
				break;
			case G.NULL:
				this._err(K.unexpectedNullCharacter), this.state = Z.SCRIPT_DATA_DOUBLE_ESCAPED, this._emitChars("�");
				break;
			case G.EOF:
				this._err(K.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
				break;
			default: this.state = Z.SCRIPT_DATA_DOUBLE_ESCAPED, this._emitCodePoint(e);
		}
	}
	_stateScriptDataDoubleEscapedLessThanSign(e) {
		e === G.SOLIDUS ? (this.state = Z.SCRIPT_DATA_DOUBLE_ESCAPE_END, this._emitChars("/")) : (this.state = Z.SCRIPT_DATA_DOUBLE_ESCAPED, this._stateScriptDataDoubleEscaped(e));
	}
	_stateScriptDataDoubleEscapeEnd(e) {
		if (this.preprocessor.startsWith(Gr.SCRIPT, !1) && ua(this.preprocessor.peek(Gr.SCRIPT.length))) {
			this._emitCodePoint(e);
			for (let e = 0; e < Gr.SCRIPT.length; e++) this._emitCodePoint(this._consume());
			this.state = Z.SCRIPT_DATA_ESCAPED;
		} else this._ensureHibernation() || (this.state = Z.SCRIPT_DATA_DOUBLE_ESCAPED, this._stateScriptDataDoubleEscaped(e));
	}
	_stateBeforeAttributeName(e) {
		switch (e) {
			case G.SPACE:
			case G.LINE_FEED:
			case G.TABULATION:
			case G.FORM_FEED: break;
			case G.SOLIDUS:
			case G.GREATER_THAN_SIGN:
			case G.EOF:
				this.state = Z.AFTER_ATTRIBUTE_NAME, this._stateAfterAttributeName(e);
				break;
			case G.EQUALS_SIGN:
				this._err(K.unexpectedEqualsSignBeforeAttributeName), this._createAttr("="), this.state = Z.ATTRIBUTE_NAME;
				break;
			default: this._createAttr(""), this.state = Z.ATTRIBUTE_NAME, this._stateAttributeName(e);
		}
	}
	_stateAttributeName(e) {
		switch (e) {
			case G.SPACE:
			case G.LINE_FEED:
			case G.TABULATION:
			case G.FORM_FEED:
			case G.SOLIDUS:
			case G.GREATER_THAN_SIGN:
			case G.EOF:
				this._leaveAttrName(), this.state = Z.AFTER_ATTRIBUTE_NAME, this._stateAfterAttributeName(e);
				break;
			case G.EQUALS_SIGN:
				this._leaveAttrName(), this.state = Z.BEFORE_ATTRIBUTE_VALUE;
				break;
			case G.QUOTATION_MARK:
			case G.APOSTROPHE:
			case G.LESS_THAN_SIGN:
				this._err(K.unexpectedCharacterInAttributeName), this.currentAttr.name += String.fromCodePoint(e);
				break;
			case G.NULL:
				this._err(K.unexpectedNullCharacter), this.currentAttr.name += "�";
				break;
			default: this.currentAttr.name += String.fromCodePoint(ia(e) ? ca(e) : e);
		}
	}
	_stateAfterAttributeName(e) {
		switch (e) {
			case G.SPACE:
			case G.LINE_FEED:
			case G.TABULATION:
			case G.FORM_FEED: break;
			case G.SOLIDUS:
				this.state = Z.SELF_CLOSING_START_TAG;
				break;
			case G.EQUALS_SIGN:
				this.state = Z.BEFORE_ATTRIBUTE_VALUE;
				break;
			case G.GREATER_THAN_SIGN:
				this.state = Z.DATA, this.emitCurrentTagToken();
				break;
			case G.EOF:
				this._err(K.eofInTag), this._emitEOFToken();
				break;
			default: this._createAttr(""), this.state = Z.ATTRIBUTE_NAME, this._stateAttributeName(e);
		}
	}
	_stateBeforeAttributeValue(e) {
		switch (e) {
			case G.SPACE:
			case G.LINE_FEED:
			case G.TABULATION:
			case G.FORM_FEED: break;
			case G.QUOTATION_MARK:
				this.state = Z.ATTRIBUTE_VALUE_DOUBLE_QUOTED;
				break;
			case G.APOSTROPHE:
				this.state = Z.ATTRIBUTE_VALUE_SINGLE_QUOTED;
				break;
			case G.GREATER_THAN_SIGN:
				this._err(K.missingAttributeValue), this.state = Z.DATA, this.emitCurrentTagToken();
				break;
			default: this.state = Z.ATTRIBUTE_VALUE_UNQUOTED, this._stateAttributeValueUnquoted(e);
		}
	}
	_stateAttributeValueDoubleQuoted(e) {
		switch (e) {
			case G.QUOTATION_MARK:
				this.state = Z.AFTER_ATTRIBUTE_VALUE_QUOTED;
				break;
			case G.AMPERSAND:
				this._startCharacterReference();
				break;
			case G.NULL:
				this._err(K.unexpectedNullCharacter), this._extendRunWith("�", 0);
				break;
			case G.EOF:
				this._err(K.eofInTag), this._emitEOFToken();
				break;
			default: this._extendRun(e);
		}
	}
	_stateAttributeValueSingleQuoted(e) {
		switch (e) {
			case G.APOSTROPHE:
				this.state = Z.AFTER_ATTRIBUTE_VALUE_QUOTED;
				break;
			case G.AMPERSAND:
				this._startCharacterReference();
				break;
			case G.NULL:
				this._err(K.unexpectedNullCharacter), this._extendRunWith("�", 0);
				break;
			case G.EOF:
				this._err(K.eofInTag), this._emitEOFToken();
				break;
			default: this._extendRun(e);
		}
	}
	_stateAttributeValueUnquoted(e) {
		switch (e) {
			case G.SPACE:
			case G.LINE_FEED:
			case G.TABULATION:
			case G.FORM_FEED:
				this._leaveAttrValue(), this.state = Z.BEFORE_ATTRIBUTE_NAME;
				break;
			case G.AMPERSAND:
				this._startCharacterReference();
				break;
			case G.GREATER_THAN_SIGN:
				this._leaveAttrValue(), this.state = Z.DATA, this.emitCurrentTagToken();
				break;
			case G.NULL:
				this._err(K.unexpectedNullCharacter), this._extendRunWith("�", 0);
				break;
			case G.QUOTATION_MARK:
			case G.APOSTROPHE:
			case G.LESS_THAN_SIGN:
			case G.EQUALS_SIGN:
			case G.GRAVE_ACCENT:
				this._err(K.unexpectedCharacterInUnquotedAttributeValue), this._extendRun(e);
				break;
			case G.EOF:
				this._err(K.eofInTag), this._emitEOFToken();
				break;
			default: this._extendRun(e);
		}
	}
	_stateAfterAttributeValueQuoted(e) {
		switch (e) {
			case G.SPACE:
			case G.LINE_FEED:
			case G.TABULATION:
			case G.FORM_FEED:
				this._leaveAttrValue(), this.state = Z.BEFORE_ATTRIBUTE_NAME;
				break;
			case G.SOLIDUS:
				this._leaveAttrValue(), this.state = Z.SELF_CLOSING_START_TAG;
				break;
			case G.GREATER_THAN_SIGN:
				this._leaveAttrValue(), this.state = Z.DATA, this.emitCurrentTagToken();
				break;
			case G.EOF:
				this._err(K.eofInTag), this._emitEOFToken();
				break;
			default: this._err(K.missingWhitespaceBetweenAttributes), this._leaveAttrValue(), this.state = Z.BEFORE_ATTRIBUTE_NAME, this._stateBeforeAttributeName(e);
		}
	}
	_stateSelfClosingStartTag(e) {
		switch (e) {
			case G.GREATER_THAN_SIGN: {
				let e = this.currentToken;
				e.selfClosing = !0, this.state = Z.DATA, this.emitCurrentTagToken();
				break;
			}
			case G.EOF:
				this._err(K.eofInTag), this._emitEOFToken();
				break;
			default: this._err(K.unexpectedSolidusInTag), this.state = Z.BEFORE_ATTRIBUTE_NAME, this._stateBeforeAttributeName(e);
		}
	}
	_stateBogusComment(e) {
		let t = this.currentToken;
		switch (e) {
			case G.GREATER_THAN_SIGN:
				this.state = Z.DATA, this.emitCurrentComment(t);
				break;
			case G.EOF:
				this.emitCurrentComment(t), this._emitEOFToken();
				break;
			case G.NULL:
				this._err(K.unexpectedNullCharacter), this._extendRunWith("�", 0);
				break;
			default: this._extendRun(e);
		}
	}
	_stateMarkupDeclarationOpen(e) {
		this._consumeSequenceIfMatch(Gr.DASH_DASH, !0) ? (this._createCommentToken(Gr.DASH_DASH.length + 1), this.state = Z.COMMENT_START) : this._consumeSequenceIfMatch(Gr.DOCTYPE, !1) ? (this.currentLocation = this.getCurrentLocation(Gr.DOCTYPE.length + 1), this.state = Z.DOCTYPE) : this._consumeSequenceIfMatch(Gr.CDATA_START, !0) ? this.inForeignNode ? this.state = Z.CDATA_SECTION : (this._err(K.cdataInHtmlContent), this._createCommentToken(Gr.CDATA_START.length + 1), this.currentToken.data = "[CDATA[", this.state = Z.BOGUS_COMMENT) : this._ensureHibernation() || (this._err(K.incorrectlyOpenedComment), this._createCommentToken(2), this.state = Z.BOGUS_COMMENT, this._stateBogusComment(e));
	}
	_stateCommentStart(e) {
		switch (e) {
			case G.HYPHEN_MINUS:
				this.state = Z.COMMENT_START_DASH;
				break;
			case G.GREATER_THAN_SIGN: {
				this._err(K.abruptClosingOfEmptyComment), this.state = Z.DATA;
				let e = this.currentToken;
				this.emitCurrentComment(e);
				break;
			}
			default: this.state = Z.COMMENT, this._stateComment(e);
		}
	}
	_stateCommentStartDash(e) {
		let t = this.currentToken;
		switch (e) {
			case G.HYPHEN_MINUS:
				this.state = Z.COMMENT_END;
				break;
			case G.GREATER_THAN_SIGN:
				this._err(K.abruptClosingOfEmptyComment), this.state = Z.DATA, this.emitCurrentComment(t);
				break;
			case G.EOF:
				this._err(K.eofInComment), this.emitCurrentComment(t), this._emitEOFToken();
				break;
			default: this._extendRunWith("-", -1), this.state = Z.COMMENT, this._stateComment(e);
		}
	}
	_stateComment(e) {
		let t = this.currentToken;
		switch (e) {
			case G.HYPHEN_MINUS:
				this.state = Z.COMMENT_END_DASH;
				break;
			case G.LESS_THAN_SIGN:
				this._extendRunWith("<", 0), this.state = Z.COMMENT_LESS_THAN_SIGN;
				break;
			case G.NULL:
				this._err(K.unexpectedNullCharacter), this._extendRunWith("�", 0);
				break;
			case G.EOF:
				this._err(K.eofInComment), this.emitCurrentComment(t), this._emitEOFToken();
				break;
			default: this._extendRun(e);
		}
	}
	_stateCommentLessThanSign(e) {
		switch (e) {
			case G.EXCLAMATION_MARK:
				this._extendRunWith("!", 0), this.state = Z.COMMENT_LESS_THAN_SIGN_BANG;
				break;
			case G.LESS_THAN_SIGN:
				this._extendRunWith("<", 0);
				break;
			default: this.state = Z.COMMENT, this._stateComment(e);
		}
	}
	_stateCommentLessThanSignBang(e) {
		e === G.HYPHEN_MINUS ? this.state = Z.COMMENT_LESS_THAN_SIGN_BANG_DASH : (this.state = Z.COMMENT, this._stateComment(e));
	}
	_stateCommentLessThanSignBangDash(e) {
		e === G.HYPHEN_MINUS ? this.state = Z.COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH : (this.state = Z.COMMENT_END_DASH, this._stateCommentEndDash(e));
	}
	_stateCommentLessThanSignBangDashDash(e) {
		e !== G.GREATER_THAN_SIGN && e !== G.EOF && this._err(K.nestedComment), this.state = Z.COMMENT_END, this._stateCommentEnd(e);
	}
	_stateCommentEndDash(e) {
		let t = this.currentToken;
		switch (e) {
			case G.HYPHEN_MINUS:
				this.state = Z.COMMENT_END;
				break;
			case G.EOF:
				this._err(K.eofInComment), this.emitCurrentComment(t), this._emitEOFToken();
				break;
			default: this._extendRunWith("-", -1), this.state = Z.COMMENT, this._stateComment(e);
		}
	}
	_stateCommentEnd(e) {
		let t = this.currentToken;
		switch (e) {
			case G.GREATER_THAN_SIGN:
				this.state = Z.DATA, this.emitCurrentComment(t);
				break;
			case G.EXCLAMATION_MARK:
				this.state = Z.COMMENT_END_BANG;
				break;
			case G.HYPHEN_MINUS:
				this._extendRunWith("-", -2);
				break;
			case G.EOF:
				this._err(K.eofInComment), this.emitCurrentComment(t), this._emitEOFToken();
				break;
			default: this._extendRunWith("--", -1), this.state = Z.COMMENT, this._stateComment(e);
		}
	}
	_stateCommentEndBang(e) {
		let t = this.currentToken;
		switch (e) {
			case G.HYPHEN_MINUS:
				this._extendRunWith("--!", -1), this.state = Z.COMMENT_END_DASH;
				break;
			case G.GREATER_THAN_SIGN:
				this._err(K.incorrectlyClosedComment), this.state = Z.DATA, this.emitCurrentComment(t);
				break;
			case G.EOF:
				this._err(K.eofInComment), this.emitCurrentComment(t), this._emitEOFToken();
				break;
			default: this._extendRunWith("--!", -1), this.state = Z.COMMENT, this._stateComment(e);
		}
	}
	_stateDoctype(e) {
		switch (e) {
			case G.SPACE:
			case G.LINE_FEED:
			case G.TABULATION:
			case G.FORM_FEED:
				this.state = Z.BEFORE_DOCTYPE_NAME;
				break;
			case G.GREATER_THAN_SIGN:
				this.state = Z.BEFORE_DOCTYPE_NAME, this._stateBeforeDoctypeName(e);
				break;
			case G.EOF: {
				this._err(K.eofInDoctype), this._createDoctypeToken(null);
				let e = this.currentToken;
				e.forceQuirks = !0, this.emitCurrentDoctype(e), this._emitEOFToken();
				break;
			}
			default: this._err(K.missingWhitespaceBeforeDoctypeName), this.state = Z.BEFORE_DOCTYPE_NAME, this._stateBeforeDoctypeName(e);
		}
	}
	_stateBeforeDoctypeName(e) {
		if (ia(e)) this._createDoctypeToken(String.fromCharCode(ca(e))), this.state = Z.DOCTYPE_NAME;
		else switch (e) {
			case G.SPACE:
			case G.LINE_FEED:
			case G.TABULATION:
			case G.FORM_FEED: break;
			case G.NULL:
				this._err(K.unexpectedNullCharacter), this._createDoctypeToken("�"), this.state = Z.DOCTYPE_NAME;
				break;
			case G.GREATER_THAN_SIGN: {
				this._err(K.missingDoctypeName), this._createDoctypeToken(null);
				let e = this.currentToken;
				e.forceQuirks = !0, this.emitCurrentDoctype(e), this.state = Z.DATA;
				break;
			}
			case G.EOF: {
				this._err(K.eofInDoctype), this._createDoctypeToken(null);
				let e = this.currentToken;
				e.forceQuirks = !0, this.emitCurrentDoctype(e), this._emitEOFToken();
				break;
			}
			default: this._createDoctypeToken(String.fromCodePoint(e)), this.state = Z.DOCTYPE_NAME;
		}
	}
	_stateDoctypeName(e) {
		let t = this.currentToken;
		switch (e) {
			case G.SPACE:
			case G.LINE_FEED:
			case G.TABULATION:
			case G.FORM_FEED:
				this.state = Z.AFTER_DOCTYPE_NAME;
				break;
			case G.GREATER_THAN_SIGN:
				this.state = Z.DATA, this.emitCurrentDoctype(t);
				break;
			case G.NULL:
				this._err(K.unexpectedNullCharacter), t.name += "�";
				break;
			case G.EOF:
				this._err(K.eofInDoctype), t.forceQuirks = !0, this.emitCurrentDoctype(t), this._emitEOFToken();
				break;
			default: t.name += String.fromCodePoint(ia(e) ? ca(e) : e);
		}
	}
	_stateAfterDoctypeName(e) {
		let t = this.currentToken;
		switch (e) {
			case G.SPACE:
			case G.LINE_FEED:
			case G.TABULATION:
			case G.FORM_FEED: break;
			case G.GREATER_THAN_SIGN:
				this.state = Z.DATA, this.emitCurrentDoctype(t);
				break;
			case G.EOF:
				this._err(K.eofInDoctype), t.forceQuirks = !0, this.emitCurrentDoctype(t), this._emitEOFToken();
				break;
			default: this._consumeSequenceIfMatch(Gr.PUBLIC, !1) ? this.state = Z.AFTER_DOCTYPE_PUBLIC_KEYWORD : this._consumeSequenceIfMatch(Gr.SYSTEM, !1) ? this.state = Z.AFTER_DOCTYPE_SYSTEM_KEYWORD : this._ensureHibernation() || (this._err(K.invalidCharacterSequenceAfterDoctypeName), t.forceQuirks = !0, this.state = Z.BOGUS_DOCTYPE, this._stateBogusDoctype(e));
		}
	}
	_stateAfterDoctypePublicKeyword(e) {
		let t = this.currentToken;
		switch (e) {
			case G.SPACE:
			case G.LINE_FEED:
			case G.TABULATION:
			case G.FORM_FEED:
				this.state = Z.BEFORE_DOCTYPE_PUBLIC_IDENTIFIER;
				break;
			case G.QUOTATION_MARK:
				this._err(K.missingWhitespaceAfterDoctypePublicKeyword), t.publicId = "", this.state = Z.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED;
				break;
			case G.APOSTROPHE:
				this._err(K.missingWhitespaceAfterDoctypePublicKeyword), t.publicId = "", this.state = Z.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED;
				break;
			case G.GREATER_THAN_SIGN:
				this._err(K.missingDoctypePublicIdentifier), t.forceQuirks = !0, this.state = Z.DATA, this.emitCurrentDoctype(t);
				break;
			case G.EOF:
				this._err(K.eofInDoctype), t.forceQuirks = !0, this.emitCurrentDoctype(t), this._emitEOFToken();
				break;
			default: this._err(K.missingQuoteBeforeDoctypePublicIdentifier), t.forceQuirks = !0, this.state = Z.BOGUS_DOCTYPE, this._stateBogusDoctype(e);
		}
	}
	_stateBeforeDoctypePublicIdentifier(e) {
		let t = this.currentToken;
		switch (e) {
			case G.SPACE:
			case G.LINE_FEED:
			case G.TABULATION:
			case G.FORM_FEED: break;
			case G.QUOTATION_MARK:
				t.publicId = "", this.state = Z.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED;
				break;
			case G.APOSTROPHE:
				t.publicId = "", this.state = Z.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED;
				break;
			case G.GREATER_THAN_SIGN:
				this._err(K.missingDoctypePublicIdentifier), t.forceQuirks = !0, this.state = Z.DATA, this.emitCurrentDoctype(t);
				break;
			case G.EOF:
				this._err(K.eofInDoctype), t.forceQuirks = !0, this.emitCurrentDoctype(t), this._emitEOFToken();
				break;
			default: this._err(K.missingQuoteBeforeDoctypePublicIdentifier), t.forceQuirks = !0, this.state = Z.BOGUS_DOCTYPE, this._stateBogusDoctype(e);
		}
	}
	_stateDoctypePublicIdentifierDoubleQuoted(e) {
		let t = this.currentToken;
		switch (e) {
			case G.QUOTATION_MARK:
				this.state = Z.AFTER_DOCTYPE_PUBLIC_IDENTIFIER;
				break;
			case G.NULL:
				this._err(K.unexpectedNullCharacter), t.publicId += "�";
				break;
			case G.GREATER_THAN_SIGN:
				this._err(K.abruptDoctypePublicIdentifier), t.forceQuirks = !0, this.emitCurrentDoctype(t), this.state = Z.DATA;
				break;
			case G.EOF:
				this._err(K.eofInDoctype), t.forceQuirks = !0, this.emitCurrentDoctype(t), this._emitEOFToken();
				break;
			default: t.publicId += String.fromCodePoint(e);
		}
	}
	_stateDoctypePublicIdentifierSingleQuoted(e) {
		let t = this.currentToken;
		switch (e) {
			case G.APOSTROPHE:
				this.state = Z.AFTER_DOCTYPE_PUBLIC_IDENTIFIER;
				break;
			case G.NULL:
				this._err(K.unexpectedNullCharacter), t.publicId += "�";
				break;
			case G.GREATER_THAN_SIGN:
				this._err(K.abruptDoctypePublicIdentifier), t.forceQuirks = !0, this.emitCurrentDoctype(t), this.state = Z.DATA;
				break;
			case G.EOF:
				this._err(K.eofInDoctype), t.forceQuirks = !0, this.emitCurrentDoctype(t), this._emitEOFToken();
				break;
			default: t.publicId += String.fromCodePoint(e);
		}
	}
	_stateAfterDoctypePublicIdentifier(e) {
		let t = this.currentToken;
		switch (e) {
			case G.SPACE:
			case G.LINE_FEED:
			case G.TABULATION:
			case G.FORM_FEED:
				this.state = Z.BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS;
				break;
			case G.GREATER_THAN_SIGN:
				this.state = Z.DATA, this.emitCurrentDoctype(t);
				break;
			case G.QUOTATION_MARK:
				this._err(K.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers), t.systemId = "", this.state = Z.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
				break;
			case G.APOSTROPHE:
				this._err(K.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers), t.systemId = "", this.state = Z.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
				break;
			case G.EOF:
				this._err(K.eofInDoctype), t.forceQuirks = !0, this.emitCurrentDoctype(t), this._emitEOFToken();
				break;
			default: this._err(K.missingQuoteBeforeDoctypeSystemIdentifier), t.forceQuirks = !0, this.state = Z.BOGUS_DOCTYPE, this._stateBogusDoctype(e);
		}
	}
	_stateBetweenDoctypePublicAndSystemIdentifiers(e) {
		let t = this.currentToken;
		switch (e) {
			case G.SPACE:
			case G.LINE_FEED:
			case G.TABULATION:
			case G.FORM_FEED: break;
			case G.GREATER_THAN_SIGN:
				this.emitCurrentDoctype(t), this.state = Z.DATA;
				break;
			case G.QUOTATION_MARK:
				t.systemId = "", this.state = Z.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
				break;
			case G.APOSTROPHE:
				t.systemId = "", this.state = Z.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
				break;
			case G.EOF:
				this._err(K.eofInDoctype), t.forceQuirks = !0, this.emitCurrentDoctype(t), this._emitEOFToken();
				break;
			default: this._err(K.missingQuoteBeforeDoctypeSystemIdentifier), t.forceQuirks = !0, this.state = Z.BOGUS_DOCTYPE, this._stateBogusDoctype(e);
		}
	}
	_stateAfterDoctypeSystemKeyword(e) {
		let t = this.currentToken;
		switch (e) {
			case G.SPACE:
			case G.LINE_FEED:
			case G.TABULATION:
			case G.FORM_FEED:
				this.state = Z.BEFORE_DOCTYPE_SYSTEM_IDENTIFIER;
				break;
			case G.QUOTATION_MARK:
				this._err(K.missingWhitespaceAfterDoctypeSystemKeyword), t.systemId = "", this.state = Z.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
				break;
			case G.APOSTROPHE:
				this._err(K.missingWhitespaceAfterDoctypeSystemKeyword), t.systemId = "", this.state = Z.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
				break;
			case G.GREATER_THAN_SIGN:
				this._err(K.missingDoctypeSystemIdentifier), t.forceQuirks = !0, this.state = Z.DATA, this.emitCurrentDoctype(t);
				break;
			case G.EOF:
				this._err(K.eofInDoctype), t.forceQuirks = !0, this.emitCurrentDoctype(t), this._emitEOFToken();
				break;
			default: this._err(K.missingQuoteBeforeDoctypeSystemIdentifier), t.forceQuirks = !0, this.state = Z.BOGUS_DOCTYPE, this._stateBogusDoctype(e);
		}
	}
	_stateBeforeDoctypeSystemIdentifier(e) {
		let t = this.currentToken;
		switch (e) {
			case G.SPACE:
			case G.LINE_FEED:
			case G.TABULATION:
			case G.FORM_FEED: break;
			case G.QUOTATION_MARK:
				t.systemId = "", this.state = Z.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
				break;
			case G.APOSTROPHE:
				t.systemId = "", this.state = Z.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
				break;
			case G.GREATER_THAN_SIGN:
				this._err(K.missingDoctypeSystemIdentifier), t.forceQuirks = !0, this.state = Z.DATA, this.emitCurrentDoctype(t);
				break;
			case G.EOF:
				this._err(K.eofInDoctype), t.forceQuirks = !0, this.emitCurrentDoctype(t), this._emitEOFToken();
				break;
			default: this._err(K.missingQuoteBeforeDoctypeSystemIdentifier), t.forceQuirks = !0, this.state = Z.BOGUS_DOCTYPE, this._stateBogusDoctype(e);
		}
	}
	_stateDoctypeSystemIdentifierDoubleQuoted(e) {
		let t = this.currentToken;
		switch (e) {
			case G.QUOTATION_MARK:
				this.state = Z.AFTER_DOCTYPE_SYSTEM_IDENTIFIER;
				break;
			case G.NULL:
				this._err(K.unexpectedNullCharacter), t.systemId += "�";
				break;
			case G.GREATER_THAN_SIGN:
				this._err(K.abruptDoctypeSystemIdentifier), t.forceQuirks = !0, this.emitCurrentDoctype(t), this.state = Z.DATA;
				break;
			case G.EOF:
				this._err(K.eofInDoctype), t.forceQuirks = !0, this.emitCurrentDoctype(t), this._emitEOFToken();
				break;
			default: t.systemId += String.fromCodePoint(e);
		}
	}
	_stateDoctypeSystemIdentifierSingleQuoted(e) {
		let t = this.currentToken;
		switch (e) {
			case G.APOSTROPHE:
				this.state = Z.AFTER_DOCTYPE_SYSTEM_IDENTIFIER;
				break;
			case G.NULL:
				this._err(K.unexpectedNullCharacter), t.systemId += "�";
				break;
			case G.GREATER_THAN_SIGN:
				this._err(K.abruptDoctypeSystemIdentifier), t.forceQuirks = !0, this.emitCurrentDoctype(t), this.state = Z.DATA;
				break;
			case G.EOF:
				this._err(K.eofInDoctype), t.forceQuirks = !0, this.emitCurrentDoctype(t), this._emitEOFToken();
				break;
			default: t.systemId += String.fromCodePoint(e);
		}
	}
	_stateAfterDoctypeSystemIdentifier(e) {
		let t = this.currentToken;
		switch (e) {
			case G.SPACE:
			case G.LINE_FEED:
			case G.TABULATION:
			case G.FORM_FEED: break;
			case G.GREATER_THAN_SIGN:
				this.emitCurrentDoctype(t), this.state = Z.DATA;
				break;
			case G.EOF:
				this._err(K.eofInDoctype), t.forceQuirks = !0, this.emitCurrentDoctype(t), this._emitEOFToken();
				break;
			default: this._err(K.unexpectedCharacterAfterDoctypeSystemIdentifier), this.state = Z.BOGUS_DOCTYPE, this._stateBogusDoctype(e);
		}
	}
	_stateBogusDoctype(e) {
		let t = this.currentToken;
		switch (e) {
			case G.GREATER_THAN_SIGN:
				this.emitCurrentDoctype(t), this.state = Z.DATA;
				break;
			case G.NULL:
				this._err(K.unexpectedNullCharacter);
				break;
			case G.EOF: this.emitCurrentDoctype(t), this._emitEOFToken();
		}
	}
	_stateCdataSection(e) {
		switch (e) {
			case G.RIGHT_SQUARE_BRACKET:
				this.state = Z.CDATA_SECTION_BRACKET;
				break;
			case G.EOF:
				this._err(K.eofInCdata), this._emitEOFToken();
				break;
			default: this._emitCodePoint(e);
		}
	}
	_stateCdataSectionBracket(e) {
		e === G.RIGHT_SQUARE_BRACKET ? this.state = Z.CDATA_SECTION_END : (this._emitChars("]", -1), this.state = Z.CDATA_SECTION, this._stateCdataSection(e));
	}
	_stateCdataSectionEnd(e) {
		switch (e) {
			case G.GREATER_THAN_SIGN:
				this.state = Z.DATA;
				break;
			case G.RIGHT_SQUARE_BRACKET:
				this._emitChars("]", -2);
				break;
			default: this._emitChars("]]", -1), this.state = Z.CDATA_SECTION, this._stateCdataSection(e);
		}
	}
	_stateCharacterReference() {
		let e = this.entityDecoder.write(this.preprocessor.html, this.preprocessor.pos);
		if (e < 0) {
			if (this.preprocessor.lastChunkWritten) e = this.entityDecoder.end();
			else {
				this.active = !1, this.preprocessor.pos = this.preprocessor.html.length - 1, this.consumedAfterSnapshot = 0, this.preprocessor.endOfChunkHit = !0;
				return;
			}
		}
		e === 0 ? (this.preprocessor.pos = this.entityStartPos, this._flushCodePointConsumedAsCharacterReference(G.AMPERSAND), this.state = !this._isCharacterReferenceInAttribute() && sa(this.preprocessor.peek(1)) ? Z.AMBIGUOUS_AMPERSAND : this.returnState) : this.state = this.returnState;
	}
	_stateAmbiguousAmpersand(e) {
		sa(e) ? this._flushCodePointConsumedAsCharacterReference(e) : (e === G.SEMICOLON && this._err(K.unknownNamedCharacterReference), this.state = this.returnState, this._callState(e));
	}
}, pa = /* @__PURE__ */ new Set([
	Y.DD,
	Y.DT,
	Y.LI,
	Y.OPTGROUP,
	Y.OPTION,
	Y.P,
	Y.RB,
	Y.RP,
	Y.RT,
	Y.RTC
]), ma = /* @__PURE__ */ new Set([
	...pa,
	Y.CAPTION,
	Y.COLGROUP,
	Y.TBODY,
	Y.TD,
	Y.TFOOT,
	Y.TH,
	Y.THEAD,
	Y.TR
]), ha = 64, ga = 256, _a = 512, va = 768, ya = [
	Y.H1,
	Y.H2,
	Y.H3,
	Y.H4,
	Y.H5,
	Y.H6
], ba = [
	Y.TBODY,
	Y.TFOOT,
	Y.THEAD
], xa = [
	Y.TR,
	Y.TEMPLATE,
	Y.HTML
], Sa = [
	...ba,
	Y.TEMPLATE,
	Y.HTML
], Ca = [
	Y.TABLE,
	Y.TEMPLATE,
	Y.HTML
], wa = [Y.TD, Y.TH], Ta = 1, Ea = 2, Da = 4, Oa = 8, ka = 16, Aa = 32, ja = new Uint8Array(va);
for (let [e, t] of [
	[q.HTML, 0],
	[q.SVG, ga],
	[q.MATHML, _a]
]) for (let n of $i[e]) ja[t + n] = e === q.HTML && (n === Y.ADDRESS || n === Y.DIV || n === Y.P) ? Ta : 3;
for (let e of [
	Y.APPLET,
	Y.CAPTION,
	Y.HTML,
	Y.MARQUEE,
	Y.OBJECT,
	Y.TABLE,
	Y.TD,
	Y.TEMPLATE,
	Y.TH,
	ga + Y.DESC,
	ga + Y.FOREIGN_OBJECT,
	ga + Y.TITLE,
	_a + Y.ANNOTATION_XML,
	_a + Y.MI,
	_a + Y.MN,
	_a + Y.MO,
	_a + Y.MS,
	_a + Y.MTEXT
]) ja[e] |= 28;
ja[Y.OL] |= Oa, ja[Y.UL] |= Oa, ja[Y.BUTTON] |= ka, ja[Y.TABLE] |= Aa, ja[Y.HTML] |= Aa;
var Ma = new Uint8Array(va);
for (let e of [
	Y.A,
	Y.B,
	Y.BIG,
	Y.CODE,
	Y.EM,
	Y.FONT,
	Y.I,
	Y.NOBR,
	Y.S,
	Y.SMALL,
	Y.STRIKE,
	Y.STRONG,
	Y.TT,
	Y.U
]) Ma[e] = 1;
function Na(e, t) {
	if (t === Y.UNKNOWN) return -1;
	switch (e) {
		case q.HTML: return t;
		case q.SVG: return ga + t;
		case q.MATHML: return _a + t;
		default: return -1;
	}
}
var Pa = class {
	get currentTmplContentOrNode() {
		return this._isInTemplate() ? this.treeAdapter.getTemplateContent(this.current) : this.current;
	}
	constructor(e, t, n) {
		this.treeAdapter = t, this.handler = n, this.items = [], this.tagIDs = [], this.stackTop = -1, this.depth = 0, this.tmplCount = 0, this.currentTagId = Y.UNKNOWN, this.indexed = !1, this.below = [], this.above = [], this.keys = [], this.keyPrev = [], this.keyNext = [], this.keyTops = /* @__PURE__ */ new Int32Array(), this.specials = [], this.listItemBoundaries = [], this.scopeBoundaries = [], this.htmlSlots = [], this.formattingSlots = /* @__PURE__ */ new Map(), this.current = e;
	}
	_indexOf(e) {
		if (this.indexed) {
			let t = this.formattingSlots.get(e);
			if (t !== void 0) return t;
			if (Ma[Qi(this.treeAdapter.getTagName(e))]) return -1;
		}
		return this.items.lastIndexOf(e, this.stackTop);
	}
	slotBelow(e) {
		return this.indexed ? this.below[e] : e - 1;
	}
	slotAbove(e) {
		return this.indexed ? this.above[e] : e === this.stackTop ? -1 : e + 1;
	}
	_isInTemplate() {
		return this.currentTagId === Y.TEMPLATE && this.treeAdapter.getNamespaceURI(this.current) === q.HTML;
	}
	_updateCurrentElement() {
		this.current = this.items[this.stackTop], this.currentTagId = this.tagIDs[this.stackTop];
	}
	_nameKey(e, t, n) {
		let r = `${e} ${t}`, i = this.nameKeys?.get(r);
		if (i === void 0 && n && (this.nameKeys ??= /* @__PURE__ */ new Map(), i = va + this.nameKeys.size, this.nameKeys.set(r, i), i === this.keyTops.length)) {
			let e = new Int32Array(2 * i).fill(-1);
			e.set(this.keyTops), this.keyTops = e;
		}
		return i ?? -1;
	}
	_indexAll() {
		this.indexed = !0, this.keyTops = new Int32Array(va).fill(-1);
		for (let e = 0; e <= this.stackTop; e++) this._index(e, e - 1);
	}
	_index(e, t) {
		let n = this.items[e], r = this.tagIDs[e], i = this.treeAdapter.getNamespaceURI(n), a = Na(i, r);
		a === -1 && (a = this._nameKey(i, this.treeAdapter.getTagName(n), !0));
		let o = this.keyTops[a];
		this.keys[e] = a, this.keyPrev[e] = o, this.keyNext[e] = -1, o !== -1 && (this.keyNext[o] = e), this.keyTops[a] = e, this.above[e] = -1, this._link(e, t, i === q.HTML), Ma[r] && this.formattingSlots.set(n, e);
	}
	_link(e, t, n) {
		let r = this.keys[e], i = r < va ? ja[r] : 0;
		this.below[e] = t, t === -1 ? (this.specials[e] = i & Ta, this.listItemBoundaries[e] = (i & Ea) >> 1, this.scopeBoundaries[e] = (i & Da) >> 2, this.htmlSlots[e] = n ? e : -1) : (this.above[t] = e, this.specials[e] = this.specials[t] + (i & Ta), this.listItemBoundaries[e] = this.listItemBoundaries[t] + ((i & Ea) >> 1), this.scopeBoundaries[e] = this.scopeBoundaries[t] + ((i & Da) >> 2), this.htmlSlots[e] = n ? e : this.htmlSlots[t]);
	}
	_unindex(e) {
		let t = this.keys[e], n = this.keyPrev[e], r = this.keyNext[e];
		n !== -1 && (this.keyNext[n] = r), r === -1 ? this.keyTops[t] = n : this.keyPrev[r] = n, Ma[this.tagIDs[e]] && this.formattingSlots.delete(this.items[e]);
	}
	_move(e, t) {
		let n = this.items[e], r = this.keys[e], i = this.keyPrev[e], a = this.keyNext[e];
		this.items[t] = n, this.tagIDs[t] = this.tagIDs[e], this.keys[t] = r, this.keyPrev[t] = i, this.keyNext[t] = a, i !== -1 && (this.keyNext[i] = t), a === -1 ? this.keyTops[r] = t : this.keyPrev[a] = t, Ma[this.tagIDs[t]] && this.formattingSlots.set(n, t);
	}
	indexOfTopmost(e) {
		if (this.indexed) return this.keyTops[e];
		for (let t = this.stackTop; t >= 0; t--) if (this.tagIDs[t] === e && this.treeAdapter.getNamespaceURI(this.items[t]) === q.HTML) return t;
		return -1;
	}
	indexOfTopmostOf(e) {
		if (this.indexed) {
			let t = -1;
			for (let n of e) this.keyTops[n] > t && (t = this.keyTops[n]);
			return t;
		}
		for (let t = this.stackTop; t >= 0; t--) if (e.includes(this.tagIDs[t]) && this.treeAdapter.getNamespaceURI(this.items[t]) === q.HTML) return t;
		return -1;
	}
	indexOfTopmostByName(e, t) {
		if (this.indexed) {
			let n = Na(e, Qi(t));
			return n === -1 && (n = this._nameKey(e, t, !1)), n === -1 ? -1 : this.keyTops[n];
		}
		for (let n = this.stackTop; n >= 0; n--) {
			let r = this.items[n];
			if (this.treeAdapter.getTagName(r) === t && this.treeAdapter.getNamespaceURI(r) === e) return n;
		}
		return -1;
	}
	indexOfTopmostHtmlElement() {
		if (this.indexed) return this.stackTop === -1 ? -1 : this.htmlSlots[this.stackTop];
		let e = this.stackTop;
		for (; e >= 0 && this.treeAdapter.getNamespaceURI(this.items[e]) !== q.HTML;) e--;
		return e;
	}
	_hasAbove(e, t) {
		for (let n = this.stackTop; n > e; n--) {
			let e = Na(this.treeAdapter.getNamespaceURI(this.items[n]), this.tagIDs[n]);
			if (e !== -1 && ja[e] & t) return !0;
		}
		return !1;
	}
	hasSpecialElementAbove(e) {
		return this.indexed ? this.specials[this.stackTop] !== this.specials[e] : this._hasAbove(e, Ta);
	}
	hasListItemBoundaryAbove(e) {
		return this.indexed ? this.listItemBoundaries[this.stackTop] !== this.listItemBoundaries[e] : this._hasAbove(e, Ea);
	}
	push(e, t) {
		let n = this.stackTop;
		this.stackTop++, this.depth++, this.items[this.stackTop] = e, this.current = e, this.tagIDs[this.stackTop] = t, this.currentTagId = t, this.indexed ? this._index(this.stackTop, n) : this.depth === ha && this._indexAll(), this._isInTemplate() && this.tmplCount++, this.handler.onItemPush(e, t, !0);
	}
	_popCurrent() {
		this.tmplCount > 0 && this._isInTemplate() && this.tmplCount--, this.indexed ? (this._unindex(this.stackTop), this.stackTop = this.below[this.stackTop], this.stackTop !== -1 && (this.above[this.stackTop] = -1)) : this.stackTop--, this.depth--, this._updateCurrentElement();
	}
	pop() {
		let e = this.current;
		this._popCurrent(), this.handler.onItemPop(e, !0);
	}
	replace(e, t) {
		let n = this._indexOf(e);
		this.items[n] = t, this.indexed && Ma[this.tagIDs[n]] && (this.formattingSlots.delete(e), this.formattingSlots.set(t, n)), n === this.stackTop && (this.current = t);
	}
	replaceFormattingElement(e, t, n, r) {
		let i = this.items[e];
		if (!this.indexed) {
			this.items.splice(e, 1), this.tagIDs.splice(e, 1), this.handler.onItemPop(i, !1), this.items.splice(t, 0, n), this.tagIDs.splice(t, 0, r), t === this.stackTop && this._updateCurrentElement(), this.current && this.currentTagId !== void 0 && this.handler.onItemPush(this.current, this.currentTagId, t === this.stackTop);
			return;
		}
		let a = this.keys[e], o = this.below[e], s = this.above[t], c = [];
		for (let n = this.above[e]; n !== t; n = this.above[n]) c.push(n);
		let l = this.keyNext[e];
		this._unindex(e), this.items[e] = void 0, this.handler.onItemPop(i, !1);
		let u = t - 1;
		for (; c.length > 0 && c[c.length - 1] === u;) c.pop(), u--;
		for (let e = u + 1; e <= t; e++) this._move(e, e - 1);
		let d = l === -1 ? this.keyTops[a] : this.keyPrev[l];
		this.items[t] = n, this.tagIDs[t] = r, this.keys[t] = a, this.keyPrev[t] = d, this.keyNext[t] = l, d !== -1 && (this.keyNext[d] = t), l === -1 ? this.keyTops[a] = t : this.keyPrev[l] = t, Ma[r] && this.formattingSlots.set(n, t);
		let f = o;
		for (let e of c) this._link(e, f, !0), f = e;
		for (let e = u; e < t; e++) this._link(e, f, !0), f = e;
		this._link(t, f, !0), s === -1 && this._updateCurrentElement(), this.current && this.currentTagId !== void 0 && this.handler.onItemPush(this.current, this.currentTagId, s === -1);
	}
	popUntilTagNamePopped(e) {
		this.shortenToLength(Math.max(this.indexOfTopmost(e), 0));
	}
	shortenToLength(e) {
		for (; this.stackTop >= e;) {
			let t = this.current;
			this._popCurrent(), this.handler.onItemPop(t, this.stackTop < e);
		}
	}
	popUntilElementPopped(e) {
		let t = this._indexOf(e);
		this.shortenToLength(Math.max(t, 0));
	}
	popUntilNumberedHeaderPopped() {
		this.shortenToLength(Math.max(this.indexOfTopmostOf(ya), 0));
	}
	popUntilTableCellPopped() {
		this.shortenToLength(Math.max(this.indexOfTopmostOf(wa), 0));
	}
	popAllUpToHtmlElement() {
		this.tmplCount = 0, this.shortenToLength(1);
	}
	clearBackToTableContext() {
		this.shortenToLength(this.indexOfTopmostOf(Ca) + 1);
	}
	clearBackToTableBodyContext() {
		this.shortenToLength(this.indexOfTopmostOf(Sa) + 1);
	}
	clearBackToTableRowContext() {
		this.shortenToLength(this.indexOfTopmostOf(xa) + 1);
	}
	remove(e) {
		let t = this._indexOf(e);
		t !== -1 && this.removeAt(t);
	}
	removeAt(e) {
		if (e === this.stackTop) {
			this.pop();
			return;
		}
		let t = this.items[e];
		if (this.depth--, this.indexed) {
			let t = this.keys[e] < va ? ja[this.keys[e]] : 0, n = this.below[e], r = this.above[e];
			if (this._unindex(e), this.items[e] = void 0, this.below[r] = n, n !== -1 && (this.above[n] = r), t !== 0) for (let e = r; e !== -1; e = this.above[e]) this.specials[e] -= t & Ta, this.listItemBoundaries[e] -= (t & Ea) >> 1, this.scopeBoundaries[e] -= (t & Da) >> 2;
			let i = n === -1 ? -1 : this.htmlSlots[n];
			for (let t = r; t !== -1 && this.htmlSlots[t] === e; t = this.above[t]) this.htmlSlots[t] = i;
		} else this.items.splice(e, 1), this.tagIDs.splice(e, 1), this.stackTop--, this._updateCurrentElement();
		this.handler.onItemPop(t, !1);
	}
	tryPeekProperlyNestedBodyElement() {
		return this.stackTop >= 1 && this.tagIDs[1] === Y.BODY ? this.items[1] : null;
	}
	contains(e) {
		return this._indexOf(e) > -1;
	}
	getCommonAncestor(e) {
		let t = this._indexOf(e), n = t === -1 ? -1 : this.slotBelow(t);
		return n === -1 ? null : this.items[n];
	}
	isRootHtmlElementCurrent() {
		return this.stackTop === 0 && this.tagIDs[0] === Y.HTML;
	}
	_isInScope(e, t) {
		let n = -1;
		switch (t) {
			case Oa:
				n = Math.max(this.keyTops[Y.OL], this.keyTops[Y.UL]);
				break;
			case ka:
				n = this.keyTops[Y.BUTTON];
				break;
			case Aa: return n = Math.max(this.keyTops[Y.TABLE], this.keyTops[Y.HTML]), e === -1 ? n === -1 : e >= n;
		}
		return e === -1 ? n === -1 && (this.stackTop === -1 || this.scopeBoundaries[this.stackTop] === 0) : e >= n && this.scopeBoundaries[this.stackTop] === this.scopeBoundaries[e];
	}
	_scanScope(e, t, n, r) {
		for (let i = this.stackTop; i >= 0; i--) {
			let a = Na(this.treeAdapter.getNamespaceURI(this.items[i]), this.tagIDs[i]);
			if (a !== -1) {
				if ((t ? t.includes(a) : a === e) && (!r || this.items[i] === r)) return !0;
				if (ja[a] & n) return !1;
			}
		}
		return !0;
	}
	hasInScope(e, t) {
		return this.indexed ? this._isInScope(t ? this._indexOf(t) : this.keyTops[e], Da) : this._scanScope(e, null, Da, t);
	}
	hasInListItemScope(e) {
		return this.indexed ? this._isInScope(this.keyTops[e], Oa) : this._scanScope(e, null, Oa);
	}
	hasInButtonScope(e) {
		return this.indexed ? this._isInScope(this.keyTops[e], ka) : this._scanScope(e, null, ka);
	}
	hasNumberedHeaderInScope() {
		return this.indexed ? this._isInScope(this.indexOfTopmostOf(ya), Da) : this._scanScope(Y.UNKNOWN, ya, Da);
	}
	hasInTableScope(e) {
		return this.indexed ? this._isInScope(this.keyTops[e], Aa) : this._scanScope(e, null, Aa);
	}
	hasTableBodyContextInTableScope() {
		return this.indexed ? this._isInScope(this.indexOfTopmostOf(ba), Aa) : this._scanScope(Y.UNKNOWN, ba, Aa);
	}
	hasInSelectScope(e) {
		for (let t = this.stackTop; t >= 0; t = this.slotBelow(t)) if (this.treeAdapter.getNamespaceURI(this.items[t]) === q.HTML) switch (this.tagIDs[t]) {
			case e: return !0;
			case Y.OPTION:
			case Y.OPTGROUP: break;
			default: return !1;
		}
		return !0;
	}
	generateImpliedEndTags() {
		for (; this.currentTagId !== void 0 && pa.has(this.currentTagId) && this.treeAdapter.getNamespaceURI(this.current) === q.HTML;) this.pop();
	}
	generateImpliedEndTagsThoroughly() {
		for (; this.currentTagId !== void 0 && ma.has(this.currentTagId) && this.treeAdapter.getNamespaceURI(this.current) === q.HTML;) this.pop();
	}
	generateImpliedEndTagsWithExclusion(e) {
		for (; this.currentTagId !== void 0 && this.currentTagId !== e && ma.has(this.currentTagId) && this.treeAdapter.getNamespaceURI(this.current) === q.HTML;) this.pop();
	}
}, Fa = 3, Ia;
(function(e) {
	e[e.Marker = 0] = "Marker", e[e.Element = 1] = "Element";
})(Ia ||= {});
var La = class {
	constructor() {
		this.newest = null, this.bookmark = null, this.index = null, this.elementEntries = /* @__PURE__ */ new Map();
	}
	_insertElementEntry(e, t, n) {
		let r = n === null ? null : n.newer, i = {
			type: Ia.Element,
			element: e,
			token: t,
			older: n,
			newer: r,
			ark: null,
			olderSameTag: null,
			newerSameTag: null
		};
		return r === null ? this.newest = i : r.older = i, n !== null && (n.newer = i), this.index === null ? null : this._addToIndex(this.index, i);
	}
	_addToIndex(e, t) {
		let { tagName: n, attrs: r } = t.token, i = n + r.map(({ name: e, value: t }) => `\0${e}\0${t}`).sort().join(""), a = e.arks.get(i);
		a === void 0 && (a = {
			entries: [],
			key: i
		}, e.arks.set(i, a)), a.entries.push(t), t.ark = a, this.elementEntries.set(t.element, t);
		let o = e.tagNames.get(n);
		return o === void 0 && (o = { olderSameTag: null }, e.tagNames.set(n, o)), t.olderSameTag = o.olderSameTag, t.newerSameTag = o, o.olderSameTag !== null && (o.olderSameTag.newerSameTag = t), o.olderSameTag = t, a;
	}
	insertMarker() {
		if (this.index === null) for (let e = this.newest; e !== null && e.type === Ia.Element; e = e.older) this.elementEntries.set(e.element, e);
		let e = {
			type: Ia.Marker,
			older: this.newest,
			newer: null,
			outerIndex: this.index
		};
		this.newest !== null && (this.newest.newer = e), this.newest = e, this.index = null;
	}
	pushElement(e, t) {
		if (this.index === null) {
			let e = null, t = 0;
			for (let n = this.newest; n !== null && n.type === Ia.Element; n = n.older) e = n, t++;
			if (t >= Fa) {
				this.index = {
					arks: /* @__PURE__ */ new Map(),
					tagNames: /* @__PURE__ */ new Map()
				};
				for (let t = e; t !== null && t.type === Ia.Element; t = t.newer) this._addToIndex(this.index, t);
			}
		}
		let n = this._insertElementEntry(e, t, this.newest);
		n !== null && n.entries.length > Fa && this.removeEntry(n.entries[0]);
	}
	insertElementAfterBookmark(e, t) {
		let { bookmark: n } = this;
		this.bookmark = null, this._insertElementEntry(e, t, n);
	}
	removeEntry(e) {
		var t;
		if (!(e.newer === null ? this.newest !== e : e.newer.older !== e)) {
			if (this.elementEntries.delete(e.element), e.newer === null ? this.newest = e.older : e.newer.older = e.older, e.older !== null && (e.older.newer = e.newer), e.ark !== null) {
				let { entries: n, key: r } = e.ark;
				n.splice(n.indexOf(e), 1), n.length === 0 && ((t = this.index) == null || t.arks.delete(r));
			}
			e.newerSameTag !== null && (e.newerSameTag.olderSameTag = e.olderSameTag, e.olderSameTag !== null && (e.olderSameTag.newerSameTag = e.newerSameTag));
		}
	}
	replaceElement(e, t) {
		this.elementEntries.delete(e.element) && this.elementEntries.set(t, e), e.element = t;
	}
	clearToLastMarker() {
		let e = this.newest;
		for (; e !== null && e.type === Ia.Element; e = e.older) this.elementEntries.delete(e.element);
		this.newest = e === null ? null : e.older, this.index = e === null ? null : e.outerIndex, this.newest !== null && (this.newest.newer = null);
	}
	getElementEntryInScopeWithTagName(e) {
		if (this.index !== null) return this.index.tagNames.get(e)?.olderSameTag ?? null;
		for (let t = this.newest; t !== null && t.type === Ia.Element; t = t.older) if (t.token.tagName === e) return t;
		return null;
	}
	getElementEntry(e) {
		if (this.index === null) {
			for (let t = this.newest; t !== null && t.type === Ia.Element; t = t.older) if (t.element === e) return t;
		}
		return this.elementEntries.get(e);
	}
}, Ra = /* @__PURE__ */ new WeakMap(), za = {
	createDocument() {
		return {
			nodeName: "#document",
			mode: Xi.NO_QUIRKS,
			childNodes: []
		};
	},
	createDocumentFragment() {
		return {
			nodeName: "#document-fragment",
			childNodes: []
		};
	},
	createElement(e, t, n) {
		return {
			nodeName: e,
			tagName: e,
			attrs: n,
			namespaceURI: t,
			childNodes: [],
			parentNode: null
		};
	},
	createCommentNode(e) {
		return {
			nodeName: "#comment",
			data: e,
			parentNode: null
		};
	},
	createTextNode(e) {
		return {
			nodeName: "#text",
			value: e,
			parentNode: null
		};
	},
	appendChild(e, t) {
		e.childNodes.push(t), t.parentNode = e;
	},
	insertBefore(e, t, n) {
		let { childNodes: r } = e, i = r[r.length - 1] === n ? r.length - 1 : r.indexOf(n);
		r.splice(i, 0, t), t.parentNode = e;
	},
	setTemplateContent(e, t) {
		e.content = t;
	},
	getTemplateContent(e) {
		return e.content;
	},
	setDocumentType(e, t, n, r) {
		let i = e.childNodes.find((e) => e.nodeName === "#documentType");
		if (i) i.name = t, i.publicId = n, i.systemId = r;
		else {
			let i = {
				nodeName: "#documentType",
				name: t,
				publicId: n,
				systemId: r,
				parentNode: null
			};
			za.appendChild(e, i);
		}
	},
	setDocumentMode(e, t) {
		e.mode = t;
	},
	getDocumentMode(e) {
		return e.mode;
	},
	detachNode(e) {
		if (e.parentNode) {
			let { childNodes: t } = e.parentNode, n = t[t.length - 1] === e ? t.length - 1 : t.indexOf(e);
			t.splice(n, 1), e.parentNode = null;
		}
	},
	insertText(e, t) {
		if (e.childNodes.length > 0) {
			let n = e.childNodes[e.childNodes.length - 1];
			if (za.isTextNode(n)) {
				n.value += t;
				return;
			}
		}
		za.appendChild(e, za.createTextNode(t));
	},
	insertTextBefore(e, t, n) {
		let { childNodes: r } = e, i = r[(r[r.length - 1] === n ? r.length - 1 : r.indexOf(n)) - 1];
		i && za.isTextNode(i) ? i.value += t : za.insertBefore(e, za.createTextNode(t), n);
	},
	adoptAttributes(e, t) {
		if (t.length === 0 || t === e.attrs) return;
		let n = Ra.get(e.attrs), r = n?.size === e.attrs.length && t.every(({ name: t }) => {
			let r = n.get(t);
			return r === void 0 || e.attrs[r]?.name === t;
		}), i = r ? n : /* @__PURE__ */ new Map();
		if (!r) {
			for (let t = 0; t < e.attrs.length; t++) {
				let n = e.attrs[t];
				n !== void 0 && i.set(n.name, t);
			}
			Ra.set(e.attrs, i);
		}
		let a = e.attrs.length;
		for (let n = 0; n < t.length; n++) i.has(t[n].name) || e.attrs.push(t[n]);
		for (let t = a; t < e.attrs.length; t++) i.set(e.attrs[t].name, t);
		i.size !== e.attrs.length && Ra.delete(e.attrs);
	},
	getFirstChild(e) {
		return e.childNodes[0];
	},
	getChildNodes(e) {
		return e.childNodes;
	},
	getParentNode(e) {
		return e.parentNode;
	},
	getAttrList(e) {
		return e.attrs;
	},
	getTagName(e) {
		return e.tagName;
	},
	getNamespaceURI(e) {
		return e.namespaceURI;
	},
	getTextNodeContent(e) {
		return e.value;
	},
	getCommentNodeContent(e) {
		return e.data;
	},
	getDocumentTypeNodeName(e) {
		return e.name;
	},
	getDocumentTypeNodePublicId(e) {
		return e.publicId;
	},
	getDocumentTypeNodeSystemId(e) {
		return e.systemId;
	},
	isTextNode(e) {
		return e.nodeName === "#text";
	},
	isCommentNode(e) {
		return e.nodeName === "#comment";
	},
	isDocumentTypeNode(e) {
		return e.nodeName === "#documentType";
	},
	isElementNode(e) {
		return Object.prototype.hasOwnProperty.call(e, "tagName");
	},
	setNodeSourceCodeLocation(e, t) {
		e.sourceCodeLocation = t;
	},
	getNodeSourceCodeLocation(e) {
		return e.sourceCodeLocation;
	},
	updateNodeSourceCodeLocation(e, t) {
		e.sourceCodeLocation = {
			...e.sourceCodeLocation,
			...t
		};
	}
}, Ba = "html", Va = "about:legacy-compat", Ha = "http://www.ibm.com/data/dtd/v11/ibmxhtml1-transitional.dtd", Ua = /* @__PURE__ */ "+//silmaril//dtd html pro v0r11 19970101//,-//as//dtd html 3.0 aswedit + extensions//,-//advasoft ltd//dtd html 3.0 aswedit + extensions//,-//ietf//dtd html 2.0 level 1//,-//ietf//dtd html 2.0 level 2//,-//ietf//dtd html 2.0 strict level 1//,-//ietf//dtd html 2.0 strict level 2//,-//ietf//dtd html 2.0 strict//,-//ietf//dtd html 2.0//,-//ietf//dtd html 2.1e//,-//ietf//dtd html 3.0//,-//ietf//dtd html 3.2 final//,-//ietf//dtd html 3.2//,-//ietf//dtd html 3//,-//ietf//dtd html level 0//,-//ietf//dtd html level 1//,-//ietf//dtd html level 2//,-//ietf//dtd html level 3//,-//ietf//dtd html strict level 0//,-//ietf//dtd html strict level 1//,-//ietf//dtd html strict level 2//,-//ietf//dtd html strict level 3//,-//ietf//dtd html strict//,-//ietf//dtd html//,-//metrius//dtd metrius presentational//,-//microsoft//dtd internet explorer 2.0 html strict//,-//microsoft//dtd internet explorer 2.0 html//,-//microsoft//dtd internet explorer 2.0 tables//,-//microsoft//dtd internet explorer 3.0 html strict//,-//microsoft//dtd internet explorer 3.0 html//,-//microsoft//dtd internet explorer 3.0 tables//,-//netscape comm. corp.//dtd html//,-//netscape comm. corp.//dtd strict html//,-//o'reilly and associates//dtd html 2.0//,-//o'reilly and associates//dtd html extended 1.0//,-//o'reilly and associates//dtd html extended relaxed 1.0//,-//sq//dtd html 2.0 hotmetal + extensions//,-//softquad software//dtd hotmetal pro 6.0::19990601::extensions to html 4.0//,-//softquad//dtd hotmetal pro 4.0::19971010::extensions to html 4.0//,-//spyglass//dtd html 2.0 extended//,-//sun microsystems corp.//dtd hotjava html//,-//sun microsystems corp.//dtd hotjava strict html//,-//w3c//dtd html 3 1995-03-24//,-//w3c//dtd html 3.2 draft//,-//w3c//dtd html 3.2 final//,-//w3c//dtd html 3.2//,-//w3c//dtd html 3.2s draft//,-//w3c//dtd html 4.0 frameset//,-//w3c//dtd html 4.0 transitional//,-//w3c//dtd html experimental 19960712//,-//w3c//dtd html experimental 970421//,-//w3c//dtd w3 html//,-//w3o//dtd w3 html 3.0//,-//webtechs//dtd mozilla html 2.0//,-//webtechs//dtd mozilla html//".split(","), Wa = [
	...Ua,
	"-//w3c//dtd html 4.01 frameset//",
	"-//w3c//dtd html 4.01 transitional//"
], Ga = /* @__PURE__ */ new Set([
	"-//w3o//dtd w3 html strict 3.0//en//",
	"-/w3c/dtd html 4.0 transitional/en",
	"html"
]), Ka = ["-//w3c//dtd xhtml 1.0 frameset//", "-//w3c//dtd xhtml 1.0 transitional//"], qa = [
	...Ka,
	"-//w3c//dtd html 4.01 frameset//",
	"-//w3c//dtd html 4.01 transitional//"
];
function Ja(e, t) {
	return t.some((t) => e.startsWith(t));
}
function Ya(e) {
	return e.name === Ba && e.publicId === null && (e.systemId === null || e.systemId === Va);
}
function Xa(e) {
	if (e.name !== Ba) return Xi.QUIRKS;
	let { systemId: t } = e;
	if (t && t.toLowerCase() === Ha) return Xi.QUIRKS;
	let { publicId: n } = e;
	if (n !== null) {
		if (n = n.toLowerCase(), Ga.has(n)) return Xi.QUIRKS;
		let e = t === null ? Wa : Ua;
		if (Ja(n, e)) return Xi.QUIRKS;
		if (e = t === null ? Ka : qa, Ja(n, e)) return Xi.LIMITED_QUIRKS;
	}
	return Xi.NO_QUIRKS;
}
// node_modules/parse5/dist/common/foreign-content.js
var Za = {
	TEXT_HTML: "text/html",
	APPLICATION_XML: "application/xhtml+xml"
}, Qa = "definitionurl", $a = "definitionURL", eo = new Map((/* @__PURE__ */ "attributeName.attributeType.baseFrequency.baseProfile.calcMode.clipPathUnits.diffuseConstant.edgeMode.filterUnits.glyphRef.gradientTransform.gradientUnits.kernelMatrix.kernelUnitLength.keyPoints.keySplines.keyTimes.lengthAdjust.limitingConeAngle.markerHeight.markerUnits.markerWidth.maskContentUnits.maskUnits.numOctaves.pathLength.patternContentUnits.patternTransform.patternUnits.pointsAtX.pointsAtY.pointsAtZ.preserveAlpha.preserveAspectRatio.primitiveUnits.refX.refY.repeatCount.repeatDur.requiredExtensions.requiredFeatures.specularConstant.specularExponent.spreadMethod.startOffset.stdDeviation.stitchTiles.surfaceScale.systemLanguage.tableValues.targetX.targetY.textLength.viewBox.viewTarget.xChannelSelector.yChannelSelector.zoomAndPan".split(".")).map((e) => [e.toLowerCase(), e])), to = /* @__PURE__ */ new Map([
	["xlink:actuate", {
		prefix: "xlink",
		name: "actuate",
		namespace: q.XLINK
	}],
	["xlink:arcrole", {
		prefix: "xlink",
		name: "arcrole",
		namespace: q.XLINK
	}],
	["xlink:href", {
		prefix: "xlink",
		name: "href",
		namespace: q.XLINK
	}],
	["xlink:role", {
		prefix: "xlink",
		name: "role",
		namespace: q.XLINK
	}],
	["xlink:show", {
		prefix: "xlink",
		name: "show",
		namespace: q.XLINK
	}],
	["xlink:title", {
		prefix: "xlink",
		name: "title",
		namespace: q.XLINK
	}],
	["xlink:type", {
		prefix: "xlink",
		name: "type",
		namespace: q.XLINK
	}],
	["xml:lang", {
		prefix: "xml",
		name: "lang",
		namespace: q.XML
	}],
	["xml:space", {
		prefix: "xml",
		name: "space",
		namespace: q.XML
	}],
	["xmlns", {
		prefix: "",
		name: "xmlns",
		namespace: q.XMLNS
	}],
	["xmlns:xlink", {
		prefix: "xmlns",
		name: "xlink",
		namespace: q.XMLNS
	}]
]), no = new Map((/* @__PURE__ */ "altGlyph.altGlyphDef.altGlyphItem.animateColor.animateMotion.animateTransform.clipPath.feBlend.feColorMatrix.feComponentTransfer.feComposite.feConvolveMatrix.feDiffuseLighting.feDisplacementMap.feDistantLight.feFlood.feFuncA.feFuncB.feFuncG.feFuncR.feGaussianBlur.feImage.feMerge.feMergeNode.feMorphology.feOffset.fePointLight.feSpecularLighting.feSpotLight.feTile.feTurbulence.foreignObject.glyphRef.linearGradient.radialGradient.textPath".split(".")).map((e) => [e.toLowerCase(), e])), ro = /* @__PURE__ */ new Set([
	Y.B,
	Y.BIG,
	Y.BLOCKQUOTE,
	Y.BODY,
	Y.BR,
	Y.CENTER,
	Y.CODE,
	Y.DD,
	Y.DIV,
	Y.DL,
	Y.DT,
	Y.EM,
	Y.EMBED,
	Y.H1,
	Y.H2,
	Y.H3,
	Y.H4,
	Y.H5,
	Y.H6,
	Y.HEAD,
	Y.HR,
	Y.I,
	Y.IMG,
	Y.LI,
	Y.LISTING,
	Y.MENU,
	Y.META,
	Y.NOBR,
	Y.OL,
	Y.P,
	Y.PRE,
	Y.RUBY,
	Y.S,
	Y.SMALL,
	Y.SPAN,
	Y.STRONG,
	Y.STRIKE,
	Y.SUB,
	Y.SUP,
	Y.TABLE,
	Y.TT,
	Y.U,
	Y.UL,
	Y.VAR
]);
function io(e) {
	let t = e.tagID;
	return t === Y.FONT && e.attrs.some(({ name: e }) => e === Yi.COLOR || e === Yi.SIZE || e === Yi.FACE) || ro.has(t);
}
function ao(e) {
	for (let t = 0; t < e.attrs.length; t++) if (e.attrs[t].name === Qa) {
		e.attrs[t].name = $a;
		break;
	}
}
function oo(e) {
	for (let t = 0; t < e.attrs.length; t++) {
		let n = eo.get(e.attrs[t].name);
		n != null && (e.attrs[t].name = n);
	}
}
function so(e) {
	for (let t = 0; t < e.attrs.length; t++) {
		let n = to.get(e.attrs[t].name);
		n && (e.attrs[t].prefix = n.prefix, e.attrs[t].name = n.name, e.attrs[t].namespace = n.namespace);
	}
}
function co(e) {
	let t = no.get(e.tagName);
	t != null && (e.tagName = t, e.tagID = Qi(e.tagName));
}
function lo(e, t) {
	return t === q.MATHML && (e === Y.MI || e === Y.MO || e === Y.MN || e === Y.MS || e === Y.MTEXT);
}
function uo(e, t, n) {
	if (t === q.MATHML && e === Y.ANNOTATION_XML) {
		for (let e = 0; e < n.length; e++) if (n[e].name === Yi.ENCODING) {
			let t = n[e].value.toLowerCase();
			return t === Za.TEXT_HTML || t === Za.APPLICATION_XML;
		}
	}
	return t === q.SVG && (e === Y.FOREIGN_OBJECT || e === Y.DESC || e === Y.TITLE);
}
function fo(e, t, n, r) {
	return (!r || r === q.HTML) && uo(e, t, n) || (!r || r === q.MATHML) && lo(e, t);
}
// node_modules/parse5/dist/parser/index.js
var po = [
	Y.TR,
	Y.TBODY,
	Y.THEAD,
	Y.TFOOT,
	Y.CAPTION,
	Y.COLGROUP,
	Y.TABLE,
	Y.FRAMESET,
	Y.SELECT,
	Y.TEMPLATE,
	Y.TD,
	Y.TH,
	Y.HEAD,
	Y.BODY,
	Y.HTML
], mo = "hidden", ho = [], go = 8, _o = 3, Q;
(function(e) {
	e[e.INITIAL = 0] = "INITIAL", e[e.BEFORE_HTML = 1] = "BEFORE_HTML", e[e.BEFORE_HEAD = 2] = "BEFORE_HEAD", e[e.IN_HEAD = 3] = "IN_HEAD", e[e.IN_HEAD_NO_SCRIPT = 4] = "IN_HEAD_NO_SCRIPT", e[e.AFTER_HEAD = 5] = "AFTER_HEAD", e[e.IN_BODY = 6] = "IN_BODY", e[e.TEXT = 7] = "TEXT", e[e.IN_TABLE = 8] = "IN_TABLE", e[e.IN_TABLE_TEXT = 9] = "IN_TABLE_TEXT", e[e.IN_CAPTION = 10] = "IN_CAPTION", e[e.IN_COLUMN_GROUP = 11] = "IN_COLUMN_GROUP", e[e.IN_TABLE_BODY = 12] = "IN_TABLE_BODY", e[e.IN_ROW = 13] = "IN_ROW", e[e.IN_CELL = 14] = "IN_CELL", e[e.IN_SELECT = 15] = "IN_SELECT", e[e.IN_SELECT_IN_TABLE = 16] = "IN_SELECT_IN_TABLE", e[e.IN_TEMPLATE = 17] = "IN_TEMPLATE", e[e.AFTER_BODY = 18] = "AFTER_BODY", e[e.IN_FRAMESET = 19] = "IN_FRAMESET", e[e.AFTER_FRAMESET = 20] = "AFTER_FRAMESET", e[e.AFTER_AFTER_BODY = 21] = "AFTER_AFTER_BODY", e[e.AFTER_AFTER_FRAMESET = 22] = "AFTER_AFTER_FRAMESET";
})(Q ||= {});
var vo = {
	startLine: -1,
	startCol: -1,
	startOffset: -1,
	endLine: -1,
	endCol: -1,
	endOffset: -1
}, yo = /* @__PURE__ */ new Set([
	Y.TABLE,
	Y.TBODY,
	Y.TFOOT,
	Y.THEAD,
	Y.TR
]), bo = {
	scriptingEnabled: !0,
	sourceCodeLocationInfo: !1,
	treeAdapter: za,
	onParseError: null
}, xo = class {
	constructor(e, t, n = null, r = null) {
		this.fragmentContext = n, this.scriptHandler = r, this.currentToken = null, this.stopped = !1, this.insertionMode = Q.INITIAL, this.originalInsertionMode = Q.INITIAL, this.headElement = null, this.formElement = null, this.currentNotInHTML = !1, this.tmplInsertionModeStack = [], this.pendingCharacterTokens = [], this.hasNonWhitespacePendingCharacterToken = !1, this.framesetOk = !0, this.skipNextNewLine = !1, this.fosterParentingEnabled = !1, this.options = {
			...bo,
			...e
		}, this.treeAdapter = this.options.treeAdapter, this.onParseError = this.options.onParseError, this.onParseError && (this.options.sourceCodeLocationInfo = !0), this.document = t ?? this.treeAdapter.createDocument(), this.tokenizer = new fa(this.options, this), this.activeFormattingElements = new La(), this.fragmentContextID = n ? Qi(this.treeAdapter.getTagName(n)) : Y.UNKNOWN, this._setContextModes(n ?? this.document, this.fragmentContextID), this.openElements = new Pa(this.document, this.treeAdapter, this);
	}
	static parse(e, t) {
		let n = new this(t);
		return n.tokenizer.write(e, !0), n.document;
	}
	static getFragmentParser(e, t) {
		let n = {
			...bo,
			...t
		};
		e ??= n.treeAdapter.createElement(J.TEMPLATE, q.HTML, []);
		let r = n.treeAdapter.createElement("documentmock", q.HTML, []), i = new this(n, r, e);
		return i.fragmentContextID === Y.TEMPLATE && i.tmplInsertionModeStack.push(Q.IN_TEMPLATE), i._initTokenizerForFragmentParsing(), i._insertFakeRootElement(), i._resetInsertionMode(), i._findFormInFragmentContext(), i;
	}
	getFragment() {
		let e = this.treeAdapter.getFirstChild(this.document), t = this.treeAdapter.createDocumentFragment();
		return this._adoptNodes(e, t), t;
	}
	_err(e, t, n) {
		if (!this.onParseError) return;
		let r = e.location ?? vo, i = {
			code: t,
			startLine: r.startLine,
			startCol: r.startCol,
			startOffset: r.startOffset,
			endLine: n ? r.startLine : r.endLine,
			endCol: n ? r.startCol : r.endCol,
			endOffset: n ? r.startOffset : r.endOffset
		};
		this.onParseError(i);
	}
	onItemPush(e, t, n) {
		var r, i;
		(i = (r = this.treeAdapter).onItemPush) == null || i.call(r, e), n && this.openElements.stackTop > 0 && this._setContextModes(e, t);
	}
	onItemPop(e, t) {
		var n, r, i;
		if (this.options.sourceCodeLocationInfo && this._setEndLocation(e, this.currentToken), (r = (n = this.treeAdapter).onItemPop) == null || r.call(n, e, this.openElements.current), (i = this.annotationXmlIntegrationPoints) == null || i.delete(e), t) {
			let e, t;
			this.openElements.stackTop === 0 && this.fragmentContext ? (e = this.fragmentContext, t = this.fragmentContextID) : {current: e, currentTagId: t} = this.openElements, this._setContextModes(e, t);
		}
	}
	_setContextModes(e, t) {
		let n = e === this.document || e && this.treeAdapter.getNamespaceURI(e) === q.HTML;
		this.currentNotInHTML = !n, this.tokenizer.inForeignNode = !n && e !== void 0 && t !== void 0 && !this._isIntegrationPoint(t, e);
	}
	_switchToTextParsing(e, t) {
		this._insertElement(e, q.HTML), this.tokenizer.state = t, this.originalInsertionMode = this.insertionMode, this.insertionMode = Q.TEXT;
	}
	switchToPlaintextParsing() {
		this.insertionMode = Q.TEXT, this.originalInsertionMode = Q.IN_BODY, this.tokenizer.state = na.PLAINTEXT;
	}
	_getAdjustedCurrentElement() {
		return this.openElements.stackTop === 0 && this.fragmentContext ? this.fragmentContext : this.openElements.current;
	}
	_findFormInFragmentContext() {
		let e = this.fragmentContext;
		for (; e;) {
			if (this.treeAdapter.getTagName(e) === J.FORM && this.treeAdapter.getNamespaceURI(e) === q.HTML) {
				this.formElement = e;
				break;
			}
			e = this.treeAdapter.getParentNode(e);
		}
	}
	_initTokenizerForFragmentParsing() {
		if (this.fragmentContext && this.treeAdapter.getNamespaceURI(this.fragmentContext) === q.HTML) switch (this.fragmentContextID) {
			case Y.TITLE:
			case Y.TEXTAREA:
				this.tokenizer.state = na.RCDATA;
				break;
			case Y.STYLE:
			case Y.XMP:
			case Y.IFRAME:
			case Y.NOEMBED:
			case Y.NOFRAMES:
			case Y.NOSCRIPT:
				this.tokenizer.state = na.RAWTEXT;
				break;
			case Y.SCRIPT:
				this.tokenizer.state = na.SCRIPT_DATA;
				break;
			case Y.PLAINTEXT: this.tokenizer.state = na.PLAINTEXT;
		}
	}
	_setDocumentType(e) {
		let t = e.name || "", n = e.publicId || "", r = e.systemId || "";
		if (this.treeAdapter.setDocumentType(this.document, t, n, r), e.location) {
			let t = this.treeAdapter.getChildNodes(this.document).find((e) => this.treeAdapter.isDocumentTypeNode(e));
			t && this.treeAdapter.setNodeSourceCodeLocation(t, e.location);
		}
	}
	_attachElementToTree(e, t, n) {
		if (this.options.sourceCodeLocationInfo) {
			let n = t && {
				...t,
				startTag: t
			};
			this.treeAdapter.setNodeSourceCodeLocation(e, n);
		}
		n.beforeElement ? this.treeAdapter.insertBefore(n.parent, e, n.beforeElement) : this.treeAdapter.appendChild(n.parent, e);
	}
	_getInsertionLocation() {
		return this._shouldFosterParentOnInsertion() ? this._findFosterParentingLocation() : {
			parent: this.openElements.currentTmplContentOrNode ?? this.document,
			beforeElement: null
		};
	}
	_createElement(e, t, n, r) {
		var i, a;
		let o = this.treeAdapter.createElement(e, t, n);
		return (a = (i = this.treeAdapter).onElementCreated) == null || a.call(i, o, {
			intendedParent: r,
			formElement: this.formElement,
			isInTemplate: this.openElements.tmplCount > 0
		}), o;
	}
	_appendElement(e, t) {
		let n = this._getInsertionLocation(), r = this._createElement(e.tagName, t, e.attrs, n.parent);
		this._attachElementToTree(r, e.location, n);
	}
	_insertElement(e, t) {
		let n = this._getInsertionLocation(), r = this._createElement(e.tagName, t, e.attrs, n.parent);
		this._attachElementToTree(r, e.location, n), this.openElements.push(r, e.tagID);
	}
	_insertFakeElement(e, t) {
		let n = this._getInsertionLocation(), r = this._createElement(e, q.HTML, [], n.parent);
		this._attachElementToTree(r, null, n), this.openElements.push(r, t);
	}
	_insertTemplate(e) {
		let t = this._getInsertionLocation(), n = this._createElement(e.tagName, q.HTML, e.attrs, t.parent), r = this.treeAdapter.createDocumentFragment();
		this.treeAdapter.setTemplateContent(n, r), this._attachElementToTree(n, e.location, t), this.openElements.push(n, e.tagID), this.options.sourceCodeLocationInfo && this.treeAdapter.setNodeSourceCodeLocation(r, null);
	}
	_insertFakeRootElement() {
		let e = this._createElement(J.HTML, q.HTML, [], this.document);
		this.options.sourceCodeLocationInfo && this.treeAdapter.setNodeSourceCodeLocation(e, null), this.treeAdapter.appendChild(this.document, e), this.openElements.push(e, Y.HTML);
	}
	_appendCommentNode(e, t) {
		let n = this.treeAdapter.createCommentNode(e.data);
		this.treeAdapter.appendChild(t, n), this.options.sourceCodeLocationInfo && this.treeAdapter.setNodeSourceCodeLocation(n, e.location);
	}
	_insertCharacters(e) {
		let t, n;
		if (this._shouldFosterParentOnInsertion() ? ({parent: t, beforeElement: n} = this._findFosterParentingLocation(), n ? this.treeAdapter.insertTextBefore(t, e.chars, n) : this.treeAdapter.insertText(t, e.chars)) : (t = this.openElements.currentTmplContentOrNode, this.treeAdapter.insertText(t, e.chars)), !e.location) return;
		let r = this.treeAdapter.getChildNodes(t), i = r[(n ? r.lastIndexOf(n) : r.length) - 1];
		if (this.treeAdapter.getNodeSourceCodeLocation(i)) {
			let { endLine: t, endCol: n, endOffset: r } = e.location;
			this.treeAdapter.updateNodeSourceCodeLocation(i, {
				endLine: t,
				endCol: n,
				endOffset: r
			});
		} else this.options.sourceCodeLocationInfo && this.treeAdapter.setNodeSourceCodeLocation(i, e.location);
	}
	_adoptNodes(e, t) {
		let n = [...this.treeAdapter.getChildNodes(e)];
		for (let e = n.length - 1; e >= 0; e--) this.treeAdapter.detachNode(n[e]);
		for (let e of n) this.treeAdapter.appendChild(t, e);
	}
	_setEndLocation(e, t) {
		if (this.treeAdapter.getNodeSourceCodeLocation(e) && t.location) {
			let n = t.location, r = this.treeAdapter.getTagName(e), i = t.type === $r.END_TAG && r === t.tagName ? {
				endTag: { ...n },
				endLine: n.endLine,
				endCol: n.endCol,
				endOffset: n.endOffset
			} : {
				endLine: n.startLine,
				endCol: n.startCol,
				endOffset: n.startOffset
			};
			this.treeAdapter.updateNodeSourceCodeLocation(e, i);
		}
	}
	shouldProcessStartTagTokenInForeignContent(e) {
		if (!this.currentNotInHTML) return !1;
		let t, n;
		return this.openElements.stackTop === 0 && this.fragmentContext ? (t = this.fragmentContext, n = this.fragmentContextID) : {current: t, currentTagId: n} = this.openElements, e.tagID === Y.SVG && this.treeAdapter.getTagName(t) === J.ANNOTATION_XML && this.treeAdapter.getNamespaceURI(t) === q.MATHML ? !1 : this.tokenizer.inForeignNode || (e.tagID === Y.MGLYPH || e.tagID === Y.MALIGNMARK) && n !== void 0 && !this._isIntegrationPoint(n, t, q.HTML);
	}
	_processToken(e) {
		switch (e.type) {
			case $r.CHARACTER:
				this.onCharacter(e);
				break;
			case $r.NULL_CHARACTER:
				this.onNullCharacter(e);
				break;
			case $r.COMMENT:
				this.onComment(e);
				break;
			case $r.DOCTYPE:
				this.onDoctype(e);
				break;
			case $r.START_TAG:
				this._processStartTag(e);
				break;
			case $r.END_TAG:
				this.onEndTag(e);
				break;
			case $r.EOF:
				this.onEof(e);
				break;
			case $r.WHITESPACE_CHARACTER: this.onWhitespaceCharacter(e);
		}
	}
	_isIntegrationPoint(e, t, n) {
		let r = this.treeAdapter.getNamespaceURI(t);
		if (e === Y.ANNOTATION_XML && r === q.MATHML && n !== q.MATHML) {
			let n = this.annotationXmlIntegrationPoints ??= /* @__PURE__ */ new Map(), i = n.get(t);
			return i === void 0 && (i = fo(e, r, this.treeAdapter.getAttrList(t)), n.set(t, i)), i;
		}
		return fo(e, r, ho, n);
	}
	_reconstructActiveFormattingElements() {
		let e = null;
		for (let t = this.activeFormattingElements.newest; t !== null && t.type === Ia.Element && !this.openElements.contains(t.element); t = t.older) e = t;
		for (let t = e; t !== null && t.type === Ia.Element; t = t.newer) this._insertElement(t.token, this.treeAdapter.getNamespaceURI(t.element)), this.activeFormattingElements.replaceElement(t, this.openElements.current);
	}
	_closeTableCell() {
		this.openElements.generateImpliedEndTags(), this.openElements.popUntilTableCellPopped(), this.activeFormattingElements.clearToLastMarker(), this.insertionMode = Q.IN_ROW;
	}
	_closePElement() {
		this.openElements.generateImpliedEndTagsWithExclusion(Y.P), this.openElements.popUntilTagNamePopped(Y.P);
	}
	_resetInsertionMode() {
		let e = this.openElements.indexOfTopmostOf(po), t = e === 0 && this.fragmentContext ? this.fragmentContextID : this.openElements.tagIDs[e], n = e === 0 && this.fragmentContext ? this.fragmentContext : this.openElements.items[e];
		if (n !== void 0 && this.treeAdapter.getNamespaceURI(n) === q.HTML) switch (t) {
			case Y.TR:
				this.insertionMode = Q.IN_ROW;
				return;
			case Y.TBODY:
			case Y.THEAD:
			case Y.TFOOT:
				this.insertionMode = Q.IN_TABLE_BODY;
				return;
			case Y.CAPTION:
				this.insertionMode = Q.IN_CAPTION;
				return;
			case Y.COLGROUP:
				this.insertionMode = Q.IN_COLUMN_GROUP;
				return;
			case Y.TABLE:
				this.insertionMode = Q.IN_TABLE;
				return;
			case Y.BODY:
				this.insertionMode = Q.IN_BODY;
				return;
			case Y.FRAMESET:
				this.insertionMode = Q.IN_FRAMESET;
				return;
			case Y.SELECT:
				this._resetInsertionModeForSelect(e);
				return;
			case Y.TEMPLATE:
				this.insertionMode = this.tmplInsertionModeStack[this.tmplInsertionModeStack.length - 1];
				return;
			case Y.HTML:
				this.insertionMode = this.headElement ? Q.AFTER_HEAD : Q.BEFORE_HEAD;
				return;
			case Y.TD:
			case Y.TH:
				if (e > 0) {
					this.insertionMode = Q.IN_CELL;
					return;
				}
				break;
			case Y.HEAD: if (e > 0) {
				this.insertionMode = Q.IN_HEAD;
				return;
			}
		}
		this.insertionMode = Q.IN_BODY;
	}
	_resetInsertionModeForSelect(e) {
		if (e > 0) {
			let e = this.openElements.indexOfTopmost(Y.TABLE);
			if (e > 0 && e > this.openElements.indexOfTopmost(Y.TEMPLATE)) {
				this.insertionMode = Q.IN_SELECT_IN_TABLE;
				return;
			}
		}
		this.insertionMode = Q.IN_SELECT;
	}
	_isElementCausesFosterParenting(e) {
		return yo.has(e);
	}
	_shouldFosterParentOnInsertion() {
		return this.fosterParentingEnabled && this.openElements.currentTagId !== void 0 && this._isElementCausesFosterParenting(this.openElements.currentTagId);
	}
	_findFosterParentingLocation() {
		let { openElements: e } = this, t = e.indexOfTopmost(Y.TABLE), n = e.indexOfTopmost(Y.TEMPLATE);
		if (n > t) return {
			parent: this.treeAdapter.getTemplateContent(e.items[n]),
			beforeElement: null
		};
		if (t !== -1) {
			let n = e.items[t], r = this.treeAdapter.getParentNode(n);
			return r ? {
				parent: r,
				beforeElement: n
			} : {
				parent: e.items[e.slotBelow(t)],
				beforeElement: null
			};
		}
		return {
			parent: e.items[0],
			beforeElement: null
		};
	}
	_fosterParentElement(e) {
		let t = this._findFosterParentingLocation();
		t.beforeElement ? this.treeAdapter.insertBefore(t.parent, e, t.beforeElement) : this.treeAdapter.appendChild(t.parent, e);
	}
	_isSpecialElement(e, t) {
		return $i[this.treeAdapter.getNamespaceURI(e)].has(t);
	}
	onCharacter(e) {
		if (this.skipNextNewLine = !1, this.tokenizer.inForeignNode) zc(this, e);
		else switch (this.insertionMode) {
			case Q.INITIAL:
				Po(this, e);
				break;
			case Q.BEFORE_HTML:
				Lo(this, e);
				break;
			case Q.BEFORE_HEAD:
				Bo(this, e);
				break;
			case Q.IN_HEAD:
				Wo(this, e);
				break;
			case Q.IN_HEAD_NO_SCRIPT:
				qo(this, e);
				break;
			case Q.AFTER_HEAD:
				Xo(this, e);
				break;
			case Q.IN_BODY:
			case Q.IN_CAPTION:
			case Q.IN_CELL:
			case Q.IN_TEMPLATE:
				$o(this, e);
				break;
			case Q.TEXT:
			case Q.IN_SELECT:
			case Q.IN_SELECT_IN_TABLE:
				this._insertCharacters(e);
				break;
			case Q.IN_TABLE:
			case Q.IN_TABLE_BODY:
			case Q.IN_ROW:
				Js(this, e);
				break;
			case Q.IN_TABLE_TEXT:
				sc(this, e);
				break;
			case Q.IN_COLUMN_GROUP:
				mc(this, e);
				break;
			case Q.AFTER_BODY:
				Ac(this, e);
				break;
			case Q.AFTER_AFTER_BODY: Ic(this, e);
		}
	}
	onNullCharacter(e) {
		if (this.skipNextNewLine = !1, this.tokenizer.inForeignNode) Rc(this, e);
		else switch (this.insertionMode) {
			case Q.INITIAL:
				Po(this, e);
				break;
			case Q.BEFORE_HTML:
				Lo(this, e);
				break;
			case Q.BEFORE_HEAD:
				Bo(this, e);
				break;
			case Q.IN_HEAD:
				Wo(this, e);
				break;
			case Q.IN_HEAD_NO_SCRIPT:
				qo(this, e);
				break;
			case Q.AFTER_HEAD:
				Xo(this, e);
				break;
			case Q.TEXT:
				this._insertCharacters(e);
				break;
			case Q.IN_TABLE:
			case Q.IN_TABLE_BODY:
			case Q.IN_ROW:
				Js(this, e);
				break;
			case Q.IN_COLUMN_GROUP:
				mc(this, e);
				break;
			case Q.AFTER_BODY:
				Ac(this, e);
				break;
			case Q.AFTER_AFTER_BODY: Ic(this, e);
		}
	}
	onComment(e) {
		if (this.skipNextNewLine = !1, this.currentNotInHTML) ko(this, e);
		else switch (this.insertionMode) {
			case Q.INITIAL:
			case Q.BEFORE_HTML:
			case Q.BEFORE_HEAD:
			case Q.IN_HEAD:
			case Q.IN_HEAD_NO_SCRIPT:
			case Q.AFTER_HEAD:
			case Q.IN_BODY:
			case Q.IN_TABLE:
			case Q.IN_CAPTION:
			case Q.IN_COLUMN_GROUP:
			case Q.IN_TABLE_BODY:
			case Q.IN_ROW:
			case Q.IN_CELL:
			case Q.IN_SELECT:
			case Q.IN_SELECT_IN_TABLE:
			case Q.IN_TEMPLATE:
			case Q.IN_FRAMESET:
			case Q.AFTER_FRAMESET:
				ko(this, e);
				break;
			case Q.IN_TABLE_TEXT:
				cc(this, e);
				break;
			case Q.AFTER_BODY:
				Ao(this, e);
				break;
			case Q.AFTER_AFTER_BODY:
			case Q.AFTER_AFTER_FRAMESET: jo(this, e);
		}
	}
	onDoctype(e) {
		switch (this.skipNextNewLine = !1, this.insertionMode) {
			case Q.INITIAL:
				No(this, e);
				break;
			case Q.BEFORE_HEAD:
			case Q.IN_HEAD:
			case Q.IN_HEAD_NO_SCRIPT:
			case Q.AFTER_HEAD:
				this._err(e, K.misplacedDoctype);
				break;
			case Q.IN_TABLE_TEXT: cc(this, e);
		}
	}
	onStartTag(e) {
		this.skipNextNewLine = !1, this.currentToken = e, this._processStartTag(e), e.selfClosing && !e.ackSelfClosing && this._err(e, K.nonVoidHtmlElementStartTagWithTrailingSolidus);
	}
	_processStartTag(e) {
		this.shouldProcessStartTagTokenInForeignContent(e) ? Vc(this, e) : this._startTagOutsideForeignContent(e);
	}
	_startTagOutsideForeignContent(e) {
		switch (this.insertionMode) {
			case Q.INITIAL:
				Po(this, e);
				break;
			case Q.BEFORE_HTML:
				Fo(this, e);
				break;
			case Q.BEFORE_HEAD:
				Ro(this, e);
				break;
			case Q.IN_HEAD:
				Vo(this, e);
				break;
			case Q.IN_HEAD_NO_SCRIPT:
				Go(this, e);
				break;
			case Q.AFTER_HEAD:
				Jo(this, e);
				break;
			case Q.IN_BODY:
				Ms(this, e);
				break;
			case Q.IN_TABLE:
				rc(this, e);
				break;
			case Q.IN_TABLE_TEXT:
				cc(this, e);
				break;
			case Q.IN_CAPTION:
				uc(this, e);
				break;
			case Q.IN_COLUMN_GROUP:
				fc(this, e);
				break;
			case Q.IN_TABLE_BODY:
				hc(this, e);
				break;
			case Q.IN_ROW:
				_c(this, e);
				break;
			case Q.IN_CELL:
				yc(this, e);
				break;
			case Q.IN_SELECT:
				xc(this, e);
				break;
			case Q.IN_SELECT_IN_TABLE:
				Cc(this, e);
				break;
			case Q.IN_TEMPLATE:
				Tc(this, e);
				break;
			case Q.AFTER_BODY:
				Oc(this, e);
				break;
			case Q.IN_FRAMESET:
				jc(this, e);
				break;
			case Q.AFTER_FRAMESET:
				Nc(this, e);
				break;
			case Q.AFTER_AFTER_BODY:
				Fc(this, e);
				break;
			case Q.AFTER_AFTER_FRAMESET: Lc(this, e);
		}
	}
	onEndTag(e) {
		this.skipNextNewLine = !1, this.currentToken = e, this.currentNotInHTML ? Hc(this, e) : this._endTagOutsideForeignContent(e);
	}
	_endTagOutsideForeignContent(e) {
		switch (this.insertionMode) {
			case Q.INITIAL:
				Po(this, e);
				break;
			case Q.BEFORE_HTML:
				Io(this, e);
				break;
			case Q.BEFORE_HEAD:
				zo(this, e);
				break;
			case Q.IN_HEAD:
				Ho(this, e);
				break;
			case Q.IN_HEAD_NO_SCRIPT:
				Ko(this, e);
				break;
			case Q.AFTER_HEAD:
				Yo(this, e);
				break;
			case Q.IN_BODY:
				Ws(this, e);
				break;
			case Q.TEXT:
				Ks(this, e);
				break;
			case Q.IN_TABLE:
				ic(this, e);
				break;
			case Q.IN_TABLE_TEXT:
				cc(this, e);
				break;
			case Q.IN_CAPTION:
				dc(this, e);
				break;
			case Q.IN_COLUMN_GROUP:
				pc(this, e);
				break;
			case Q.IN_TABLE_BODY:
				gc(this, e);
				break;
			case Q.IN_ROW:
				vc(this, e);
				break;
			case Q.IN_CELL:
				bc(this, e);
				break;
			case Q.IN_SELECT:
				Sc(this, e);
				break;
			case Q.IN_SELECT_IN_TABLE:
				wc(this, e);
				break;
			case Q.IN_TEMPLATE:
				Ec(this, e);
				break;
			case Q.AFTER_BODY:
				kc(this, e);
				break;
			case Q.IN_FRAMESET:
				Mc(this, e);
				break;
			case Q.AFTER_FRAMESET:
				Pc(this, e);
				break;
			case Q.AFTER_AFTER_BODY: Ic(this, e);
		}
	}
	onEof(e) {
		switch (this.insertionMode) {
			case Q.INITIAL:
				Po(this, e);
				break;
			case Q.BEFORE_HTML:
				Lo(this, e);
				break;
			case Q.BEFORE_HEAD:
				Bo(this, e);
				break;
			case Q.IN_HEAD:
				Wo(this, e);
				break;
			case Q.IN_HEAD_NO_SCRIPT:
				qo(this, e);
				break;
			case Q.AFTER_HEAD:
				Xo(this, e);
				break;
			case Q.IN_BODY:
			case Q.IN_TABLE:
			case Q.IN_CAPTION:
			case Q.IN_COLUMN_GROUP:
			case Q.IN_TABLE_BODY:
			case Q.IN_ROW:
			case Q.IN_CELL:
			case Q.IN_SELECT:
			case Q.IN_SELECT_IN_TABLE:
				Gs(this, e);
				break;
			case Q.TEXT:
				qs(this, e);
				break;
			case Q.IN_TABLE_TEXT:
				cc(this, e);
				break;
			case Q.IN_TEMPLATE:
				Dc(this, e);
				break;
			case Q.AFTER_BODY:
			case Q.IN_FRAMESET:
			case Q.AFTER_FRAMESET:
			case Q.AFTER_AFTER_BODY:
			case Q.AFTER_AFTER_FRAMESET: Mo(this, e);
		}
	}
	onWhitespaceCharacter(e) {
		if (this.skipNextNewLine && (this.skipNextNewLine = !1, e.chars.charCodeAt(0) === G.LINE_FEED)) {
			if (e.chars.length === 1) return;
			e.chars = e.chars.substr(1);
		}
		if (this.tokenizer.inForeignNode) this._insertCharacters(e);
		else switch (this.insertionMode) {
			case Q.IN_HEAD:
			case Q.IN_HEAD_NO_SCRIPT:
			case Q.AFTER_HEAD:
			case Q.TEXT:
			case Q.IN_COLUMN_GROUP:
			case Q.IN_SELECT:
			case Q.IN_SELECT_IN_TABLE:
			case Q.IN_FRAMESET:
			case Q.AFTER_FRAMESET:
				this._insertCharacters(e);
				break;
			case Q.IN_BODY:
			case Q.IN_CAPTION:
			case Q.IN_CELL:
			case Q.IN_TEMPLATE:
			case Q.AFTER_BODY:
			case Q.AFTER_AFTER_BODY:
			case Q.AFTER_AFTER_FRAMESET:
				Qo(this, e);
				break;
			case Q.IN_TABLE:
			case Q.IN_TABLE_BODY:
			case Q.IN_ROW:
				Js(this, e);
				break;
			case Q.IN_TABLE_TEXT: oc(this, e);
		}
	}
};
function So(e, t) {
	let n = e.activeFormattingElements.getElementEntryInScopeWithTagName(t.tagName);
	return n ? e.openElements.contains(n.element) ? e.openElements.hasInScope(t.tagID, n.element) || (n = null) : (e.activeFormattingElements.removeEntry(n), n = null) : Us(e, t), n;
}
function Co(e, t) {
	let { openElements: n } = e, r = n._indexOf(t.element);
	for (let t = n.slotAbove(r); t !== -1; t = n.slotAbove(t)) if (e._isSpecialElement(n.items[t], n.tagIDs[t])) return t;
	return n.shortenToLength(r), e.activeFormattingElements.removeEntry(t), -1;
}
function wo(e, t, n) {
	let r = e.openElements.items[t], i = r, a = e.openElements.slotBelow(t), o = e.openElements.getCommonAncestor(n);
	for (let t = 0, s = a; e.openElements.items[s] !== n; t++, s = a) {
		let n = e.openElements.items[s];
		a = e.openElements.slotBelow(s);
		let c = e.activeFormattingElements.getElementEntry(n), l = c && t >= _o;
		!c || l ? (l && e.activeFormattingElements.removeEntry(c), e.openElements.removeAt(s)) : (n = To(e, c, o), i === r && (e.activeFormattingElements.bookmark = c), e.treeAdapter.detachNode(i), e.treeAdapter.appendChild(n, i), i = n);
	}
	return i;
}
function To(e, t, n) {
	let r = e.treeAdapter.getNamespaceURI(t.element), i = e._createElement(t.token.tagName, r, t.token.attrs, n);
	return e.openElements.replace(t.element, i), e.activeFormattingElements.replaceElement(t, i), i;
}
function Eo(e, t, n) {
	let r = Qi(e.treeAdapter.getTagName(t));
	if (e._isElementCausesFosterParenting(r)) e._fosterParentElement(n);
	else {
		let i = e.treeAdapter.getNamespaceURI(t);
		r === Y.TEMPLATE && i === q.HTML && (t = e.treeAdapter.getTemplateContent(t)), e.treeAdapter.appendChild(t, n);
	}
}
function Do(e, t, n) {
	let r = e.treeAdapter.getNamespaceURI(n.element), { token: i } = n, a = e._createElement(i.tagName, r, i.attrs, t);
	e._adoptNodes(t, a), e.treeAdapter.appendChild(t, a), e.activeFormattingElements.insertElementAfterBookmark(a, i), e.activeFormattingElements.removeEntry(n);
	let o = e.openElements._indexOf(n.element), s = e.openElements.slotAbove(o);
	for (; e.openElements.items[s] !== t;) s = e.openElements.slotAbove(s);
	e.openElements.replaceFormattingElement(o, s, a, i.tagID);
}
function Oo(e, t) {
	let { current: n, currentTagId: r } = e.openElements;
	if (r === t.tagID && e.treeAdapter.getNamespaceURI(n) === q.HTML && !e.activeFormattingElements.getElementEntry(n)) e.openElements.pop();
	else for (let n = 0; n < go; n++) {
		let n = So(e, t);
		if (!n) break;
		let r = Co(e, n);
		if (r === -1) break;
		let i = e.openElements.items[r];
		e.activeFormattingElements.bookmark = n;
		let a = wo(e, r, n.element), o = e.openElements.getCommonAncestor(n.element);
		e.treeAdapter.detachNode(a), o && Eo(e, o, a), Do(e, i, n);
	}
}
function ko(e, t) {
	e._appendCommentNode(t, e.openElements.currentTmplContentOrNode);
}
function Ao(e, t) {
	e._appendCommentNode(t, e.openElements.items[0]);
}
function jo(e, t) {
	e._appendCommentNode(t, e.document);
}
function Mo(e, t) {
	if (e.stopped = !0, t.location) {
		let n = e.fragmentContext ? 0 : 2;
		for (let r = e.openElements.stackTop; r >= n; r = e.openElements.slotBelow(r)) e._setEndLocation(e.openElements.items[r], t);
		if (!e.fragmentContext && e.openElements.stackTop >= 0) {
			let n = e.openElements.items[0], r = e.treeAdapter.getNodeSourceCodeLocation(n);
			if (r && !r.endTag && (e._setEndLocation(n, t), e.openElements.stackTop >= 1)) {
				let n = e.openElements.items[1], r = e.treeAdapter.getNodeSourceCodeLocation(n);
				r && !r.endTag && e._setEndLocation(n, t);
			}
		}
	}
}
function No(e, t) {
	e._setDocumentType(t);
	let n = t.forceQuirks ? Xi.QUIRKS : Xa(t);
	Ya(t) || e._err(t, K.nonConformingDoctype), e.treeAdapter.setDocumentMode(e.document, n), e.insertionMode = Q.BEFORE_HTML;
}
function Po(e, t) {
	e._err(t, K.missingDoctype, !0), e.treeAdapter.setDocumentMode(e.document, Xi.QUIRKS), e.insertionMode = Q.BEFORE_HTML, e._processToken(t);
}
function Fo(e, t) {
	t.tagID === Y.HTML ? (e._insertElement(t, q.HTML), e.insertionMode = Q.BEFORE_HEAD) : Lo(e, t);
}
function Io(e, t) {
	let n = t.tagID;
	(n === Y.HTML || n === Y.HEAD || n === Y.BODY || n === Y.BR) && Lo(e, t);
}
function Lo(e, t) {
	e._insertFakeRootElement(), e.insertionMode = Q.BEFORE_HEAD, e._processToken(t);
}
function Ro(e, t) {
	switch (t.tagID) {
		case Y.HTML:
			Ms(e, t);
			break;
		case Y.HEAD:
			e._insertElement(t, q.HTML), e.headElement = e.openElements.current, e.insertionMode = Q.IN_HEAD;
			break;
		default: Bo(e, t);
	}
}
function zo(e, t) {
	let n = t.tagID;
	n === Y.HEAD || n === Y.BODY || n === Y.HTML || n === Y.BR ? Bo(e, t) : e._err(t, K.endTagWithoutMatchingOpenElement);
}
function Bo(e, t) {
	e._insertFakeElement(J.HEAD, Y.HEAD), e.headElement = e.openElements.current, e.insertionMode = Q.IN_HEAD, e._processToken(t);
}
function Vo(e, t) {
	switch (t.tagID) {
		case Y.HTML:
			Ms(e, t);
			break;
		case Y.BASE:
		case Y.BASEFONT:
		case Y.BGSOUND:
		case Y.LINK:
		case Y.META:
			e._appendElement(t, q.HTML), t.ackSelfClosing = !0;
			break;
		case Y.TITLE:
			e._switchToTextParsing(t, na.RCDATA);
			break;
		case Y.NOSCRIPT:
			e.options.scriptingEnabled ? e._switchToTextParsing(t, na.RAWTEXT) : (e._insertElement(t, q.HTML), e.insertionMode = Q.IN_HEAD_NO_SCRIPT);
			break;
		case Y.NOFRAMES:
		case Y.STYLE:
			e._switchToTextParsing(t, na.RAWTEXT);
			break;
		case Y.SCRIPT:
			e._switchToTextParsing(t, na.SCRIPT_DATA);
			break;
		case Y.TEMPLATE:
			e._insertTemplate(t), e.activeFormattingElements.insertMarker(), e.framesetOk = !1, e.insertionMode = Q.IN_TEMPLATE, e.tmplInsertionModeStack.push(Q.IN_TEMPLATE);
			break;
		case Y.HEAD:
			e._err(t, K.misplacedStartTagForHeadElement);
			break;
		default: Wo(e, t);
	}
}
function Ho(e, t) {
	switch (t.tagID) {
		case Y.HEAD:
			e.openElements.pop(), e.insertionMode = Q.AFTER_HEAD;
			break;
		case Y.BODY:
		case Y.BR:
		case Y.HTML:
			Wo(e, t);
			break;
		case Y.TEMPLATE:
			Uo(e, t);
			break;
		default: e._err(t, K.endTagWithoutMatchingOpenElement);
	}
}
function Uo(e, t) {
	e.openElements.tmplCount > 0 ? (e.openElements.generateImpliedEndTagsThoroughly(), e.openElements.currentTagId !== Y.TEMPLATE && e._err(t, K.closingOfElementWithOpenChildElements), e.openElements.popUntilTagNamePopped(Y.TEMPLATE), e.activeFormattingElements.clearToLastMarker(), e.tmplInsertionModeStack.pop(), e._resetInsertionMode()) : e._err(t, K.endTagWithoutMatchingOpenElement);
}
function Wo(e, t) {
	e.openElements.pop(), e.insertionMode = Q.AFTER_HEAD, e._processToken(t);
}
function Go(e, t) {
	switch (t.tagID) {
		case Y.HTML:
			Ms(e, t);
			break;
		case Y.BASEFONT:
		case Y.BGSOUND:
		case Y.HEAD:
		case Y.LINK:
		case Y.META:
		case Y.NOFRAMES:
		case Y.STYLE:
			Vo(e, t);
			break;
		case Y.NOSCRIPT:
			e._err(t, K.nestedNoscriptInHead);
			break;
		default: qo(e, t);
	}
}
function Ko(e, t) {
	switch (t.tagID) {
		case Y.NOSCRIPT:
			e.openElements.pop(), e.insertionMode = Q.IN_HEAD;
			break;
		case Y.BR:
			qo(e, t);
			break;
		default: e._err(t, K.endTagWithoutMatchingOpenElement);
	}
}
function qo(e, t) {
	let n = t.type === $r.EOF ? K.openElementsLeftAfterEof : K.disallowedContentInNoscriptInHead;
	e._err(t, n), e.openElements.pop(), e.insertionMode = Q.IN_HEAD, e._processToken(t);
}
function Jo(e, t) {
	switch (t.tagID) {
		case Y.HTML:
			Ms(e, t);
			break;
		case Y.BODY:
			e._insertElement(t, q.HTML), e.framesetOk = !1, e.insertionMode = Q.IN_BODY;
			break;
		case Y.FRAMESET:
			e._insertElement(t, q.HTML), e.insertionMode = Q.IN_FRAMESET;
			break;
		case Y.BASE:
		case Y.BASEFONT:
		case Y.BGSOUND:
		case Y.LINK:
		case Y.META:
		case Y.NOFRAMES:
		case Y.SCRIPT:
		case Y.STYLE:
		case Y.TEMPLATE:
		case Y.TITLE:
			e._err(t, K.abandonedHeadElementChild), e.openElements.push(e.headElement, Y.HEAD), Vo(e, t), e.openElements.remove(e.headElement);
			break;
		case Y.HEAD:
			e._err(t, K.misplacedStartTagForHeadElement);
			break;
		default: Xo(e, t);
	}
}
function Yo(e, t) {
	switch (t.tagID) {
		case Y.BODY:
		case Y.HTML:
		case Y.BR:
			Xo(e, t);
			break;
		case Y.TEMPLATE:
			Uo(e, t);
			break;
		default: e._err(t, K.endTagWithoutMatchingOpenElement);
	}
}
function Xo(e, t) {
	e._insertFakeElement(J.BODY, Y.BODY), e.insertionMode = Q.IN_BODY, Zo(e, t);
}
function Zo(e, t) {
	switch (t.type) {
		case $r.CHARACTER:
			$o(e, t);
			break;
		case $r.WHITESPACE_CHARACTER:
			Qo(e, t);
			break;
		case $r.COMMENT:
			ko(e, t);
			break;
		case $r.START_TAG:
			Ms(e, t);
			break;
		case $r.END_TAG:
			Ws(e, t);
			break;
		case $r.EOF: Gs(e, t);
	}
}
function Qo(e, t) {
	e._reconstructActiveFormattingElements(), e._insertCharacters(t);
}
function $o(e, t) {
	e._reconstructActiveFormattingElements(), e._insertCharacters(t), e.framesetOk = !1;
}
function es(e, t) {
	e.openElements.tmplCount === 0 && e.treeAdapter.adoptAttributes(e.openElements.items[0], t.attrs);
}
function ts(e, t) {
	let n = e.openElements.tryPeekProperlyNestedBodyElement();
	n && e.openElements.tmplCount === 0 && (e.framesetOk = !1, e.treeAdapter.adoptAttributes(n, t.attrs));
}
function ns(e, t) {
	let n = e.openElements.tryPeekProperlyNestedBodyElement();
	e.framesetOk && n && (e.treeAdapter.detachNode(n), e.openElements.popAllUpToHtmlElement(), e._insertElement(t, q.HTML), e.insertionMode = Q.IN_FRAMESET);
}
function rs(e, t) {
	e.openElements.hasInButtonScope(Y.P) && e._closePElement(), e._insertElement(t, q.HTML);
}
function is(e, t) {
	e.openElements.hasInButtonScope(Y.P) && e._closePElement(), e.openElements.currentTagId !== void 0 && ea.has(e.openElements.currentTagId) && e.openElements.pop(), e._insertElement(t, q.HTML);
}
function as(e, t) {
	e.openElements.hasInButtonScope(Y.P) && e._closePElement(), e._insertElement(t, q.HTML), e.skipNextNewLine = !0, e.framesetOk = !1;
}
function os(e, t) {
	let n = e.openElements.tmplCount > 0;
	(!e.formElement || n) && (e.openElements.hasInButtonScope(Y.P) && e._closePElement(), e._insertElement(t, q.HTML), n || (e.formElement = e.openElements.current));
}
function ss(e, t) {
	e.framesetOk = !1;
	let n = t.tagID === Y.LI ? e.openElements.indexOfTopmost(Y.LI) : Math.max(e.openElements.indexOfTopmost(Y.DD), e.openElements.indexOfTopmost(Y.DT));
	if (n !== -1 && !e.openElements.hasListItemBoundaryAbove(n)) {
		let t = e.openElements.tagIDs[n];
		e.openElements.generateImpliedEndTagsWithExclusion(t), e.openElements.popUntilTagNamePopped(t);
	}
	e.openElements.hasInButtonScope(Y.P) && e._closePElement(), e._insertElement(t, q.HTML);
}
function cs(e, t) {
	e.openElements.hasInButtonScope(Y.P) && e._closePElement(), e._insertElement(t, q.HTML), e.tokenizer.state = na.PLAINTEXT;
}
function ls(e, t) {
	e.openElements.hasInScope(Y.BUTTON) && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilTagNamePopped(Y.BUTTON)), e._reconstructActiveFormattingElements(), e._insertElement(t, q.HTML), e.framesetOk = !1;
}
function us(e, t) {
	let n = e.activeFormattingElements.getElementEntryInScopeWithTagName(J.A);
	n && (Oo(e, t), e.openElements.remove(n.element), e.activeFormattingElements.removeEntry(n)), e._reconstructActiveFormattingElements(), e._insertElement(t, q.HTML), e.activeFormattingElements.pushElement(e.openElements.current, t);
}
function ds(e, t) {
	e._reconstructActiveFormattingElements(), e._insertElement(t, q.HTML), e.activeFormattingElements.pushElement(e.openElements.current, t);
}
function fs(e, t) {
	e._reconstructActiveFormattingElements(), e.openElements.hasInScope(Y.NOBR) && (Oo(e, t), e._reconstructActiveFormattingElements()), e._insertElement(t, q.HTML), e.activeFormattingElements.pushElement(e.openElements.current, t);
}
function ps(e, t) {
	e._reconstructActiveFormattingElements(), e._insertElement(t, q.HTML), e.activeFormattingElements.insertMarker(), e.framesetOk = !1;
}
function ms(e, t) {
	e.treeAdapter.getDocumentMode(e.document) !== Xi.QUIRKS && e.openElements.hasInButtonScope(Y.P) && e._closePElement(), e._insertElement(t, q.HTML), e.framesetOk = !1, e.insertionMode = Q.IN_TABLE;
}
function hs(e, t) {
	e._reconstructActiveFormattingElements(), e._appendElement(t, q.HTML), e.framesetOk = !1, t.ackSelfClosing = !0;
}
function gs(e) {
	let t = ei(e, Yi.TYPE);
	return t != null && t.toLowerCase() === mo;
}
function _s(e, t) {
	e._reconstructActiveFormattingElements(), e._appendElement(t, q.HTML), gs(t) || (e.framesetOk = !1), t.ackSelfClosing = !0;
}
function vs(e, t) {
	e._appendElement(t, q.HTML), t.ackSelfClosing = !0;
}
function ys(e, t) {
	e.openElements.hasInButtonScope(Y.P) && e._closePElement(), e._appendElement(t, q.HTML), e.framesetOk = !1, t.ackSelfClosing = !0;
}
function bs(e, t) {
	t.tagName = J.IMG, t.tagID = Y.IMG, hs(e, t);
}
function xs(e, t) {
	e._insertElement(t, q.HTML), e.skipNextNewLine = !0, e.tokenizer.state = na.RCDATA, e.originalInsertionMode = e.insertionMode, e.framesetOk = !1, e.insertionMode = Q.TEXT;
}
function Ss(e, t) {
	e.openElements.hasInButtonScope(Y.P) && e._closePElement(), e._reconstructActiveFormattingElements(), e.framesetOk = !1, e._switchToTextParsing(t, na.RAWTEXT);
}
function Cs(e, t) {
	e.framesetOk = !1, e._switchToTextParsing(t, na.RAWTEXT);
}
function ws(e, t) {
	e._switchToTextParsing(t, na.RAWTEXT);
}
function Ts(e, t) {
	e._reconstructActiveFormattingElements(), e._insertElement(t, q.HTML), e.framesetOk = !1, e.insertionMode = e.insertionMode === Q.IN_TABLE || e.insertionMode === Q.IN_CAPTION || e.insertionMode === Q.IN_TABLE_BODY || e.insertionMode === Q.IN_ROW || e.insertionMode === Q.IN_CELL ? Q.IN_SELECT_IN_TABLE : Q.IN_SELECT;
}
function Es(e, t) {
	e.openElements.currentTagId === Y.OPTION && e.openElements.pop(), e._reconstructActiveFormattingElements(), e._insertElement(t, q.HTML);
}
function Ds(e, t) {
	e.openElements.hasInScope(Y.RUBY) && e.openElements.generateImpliedEndTags(), e._insertElement(t, q.HTML);
}
function Os(e, t) {
	e.openElements.hasInScope(Y.RUBY) && e.openElements.generateImpliedEndTagsWithExclusion(Y.RTC), e._insertElement(t, q.HTML);
}
function ks(e, t) {
	e._reconstructActiveFormattingElements(), ao(t), so(t), t.selfClosing ? e._appendElement(t, q.MATHML) : e._insertElement(t, q.MATHML), t.ackSelfClosing = !0;
}
function As(e, t) {
	e._reconstructActiveFormattingElements(), oo(t), so(t), t.selfClosing ? e._appendElement(t, q.SVG) : e._insertElement(t, q.SVG), t.ackSelfClosing = !0;
}
function js(e, t) {
	e._reconstructActiveFormattingElements(), e._insertElement(t, q.HTML);
}
function Ms(e, t) {
	switch (t.tagID) {
		case Y.I:
		case Y.S:
		case Y.B:
		case Y.U:
		case Y.EM:
		case Y.TT:
		case Y.BIG:
		case Y.CODE:
		case Y.FONT:
		case Y.SMALL:
		case Y.STRIKE:
		case Y.STRONG:
			ds(e, t);
			break;
		case Y.A:
			us(e, t);
			break;
		case Y.H1:
		case Y.H2:
		case Y.H3:
		case Y.H4:
		case Y.H5:
		case Y.H6:
			is(e, t);
			break;
		case Y.P:
		case Y.DL:
		case Y.OL:
		case Y.UL:
		case Y.DIV:
		case Y.DIR:
		case Y.NAV:
		case Y.MAIN:
		case Y.MENU:
		case Y.ASIDE:
		case Y.CENTER:
		case Y.FIGURE:
		case Y.FOOTER:
		case Y.HEADER:
		case Y.HGROUP:
		case Y.DIALOG:
		case Y.DETAILS:
		case Y.ADDRESS:
		case Y.ARTICLE:
		case Y.SEARCH:
		case Y.SECTION:
		case Y.SUMMARY:
		case Y.FIELDSET:
		case Y.BLOCKQUOTE:
		case Y.FIGCAPTION:
			rs(e, t);
			break;
		case Y.LI:
		case Y.DD:
		case Y.DT:
			ss(e, t);
			break;
		case Y.BR:
		case Y.IMG:
		case Y.WBR:
		case Y.AREA:
		case Y.EMBED:
		case Y.KEYGEN:
			hs(e, t);
			break;
		case Y.HR:
			ys(e, t);
			break;
		case Y.RB:
		case Y.RTC:
			Ds(e, t);
			break;
		case Y.RT:
		case Y.RP:
			Os(e, t);
			break;
		case Y.PRE:
		case Y.LISTING:
			as(e, t);
			break;
		case Y.XMP:
			Ss(e, t);
			break;
		case Y.SVG:
			As(e, t);
			break;
		case Y.HTML:
			es(e, t);
			break;
		case Y.BASE:
		case Y.LINK:
		case Y.META:
		case Y.STYLE:
		case Y.TITLE:
		case Y.SCRIPT:
		case Y.BGSOUND:
		case Y.BASEFONT:
		case Y.TEMPLATE:
			Vo(e, t);
			break;
		case Y.BODY:
			ts(e, t);
			break;
		case Y.FORM:
			os(e, t);
			break;
		case Y.NOBR:
			fs(e, t);
			break;
		case Y.MATH:
			ks(e, t);
			break;
		case Y.TABLE:
			ms(e, t);
			break;
		case Y.INPUT:
			_s(e, t);
			break;
		case Y.PARAM:
		case Y.TRACK:
		case Y.SOURCE:
			vs(e, t);
			break;
		case Y.IMAGE:
			bs(e, t);
			break;
		case Y.BUTTON:
			ls(e, t);
			break;
		case Y.APPLET:
		case Y.OBJECT:
		case Y.MARQUEE:
			ps(e, t);
			break;
		case Y.IFRAME:
			Cs(e, t);
			break;
		case Y.SELECT:
			Ts(e, t);
			break;
		case Y.OPTION:
		case Y.OPTGROUP:
			Es(e, t);
			break;
		case Y.NOEMBED:
		case Y.NOFRAMES:
			ws(e, t);
			break;
		case Y.FRAMESET:
			ns(e, t);
			break;
		case Y.TEXTAREA:
			xs(e, t);
			break;
		case Y.NOSCRIPT:
			e.options.scriptingEnabled ? ws(e, t) : js(e, t);
			break;
		case Y.PLAINTEXT:
			cs(e, t);
			break;
		case Y.COL:
		case Y.TH:
		case Y.TD:
		case Y.TR:
		case Y.HEAD:
		case Y.FRAME:
		case Y.TBODY:
		case Y.TFOOT:
		case Y.THEAD:
		case Y.CAPTION:
		case Y.COLGROUP: break;
		default: js(e, t);
	}
}
function Ns(e, t) {
	if (e.openElements.hasInScope(Y.BODY) && (e.insertionMode = Q.AFTER_BODY, e.options.sourceCodeLocationInfo)) {
		let n = e.openElements.tryPeekProperlyNestedBodyElement();
		n && e._setEndLocation(n, t);
	}
}
function Ps(e, t) {
	e.openElements.hasInScope(Y.BODY) && (e.insertionMode = Q.AFTER_BODY, kc(e, t));
}
function Fs(e, t) {
	let n = t.tagID;
	e.openElements.hasInScope(n) && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilTagNamePopped(n));
}
function Is(e) {
	let t = e.openElements.tmplCount > 0, { formElement: n } = e;
	t || (e.formElement = null), (n || t) && e.openElements.hasInScope(Y.FORM) && (e.openElements.generateImpliedEndTags(), t ? e.openElements.popUntilTagNamePopped(Y.FORM) : n && e.openElements.remove(n));
}
function Ls(e) {
	e.openElements.hasInButtonScope(Y.P) || e._insertFakeElement(J.P, Y.P), e._closePElement();
}
function Rs(e) {
	e.openElements.hasInListItemScope(Y.LI) && (e.openElements.generateImpliedEndTagsWithExclusion(Y.LI), e.openElements.popUntilTagNamePopped(Y.LI));
}
function zs(e, t) {
	let n = t.tagID;
	e.openElements.hasInScope(n) && (e.openElements.generateImpliedEndTagsWithExclusion(n), e.openElements.popUntilTagNamePopped(n));
}
function Bs(e) {
	e.openElements.hasNumberedHeaderInScope() && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilNumberedHeaderPopped());
}
function Vs(e, t) {
	let n = t.tagID;
	e.openElements.hasInScope(n) && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilTagNamePopped(n), e.activeFormattingElements.clearToLastMarker());
}
function Hs(e) {
	e._reconstructActiveFormattingElements(), e._insertFakeElement(J.BR, Y.BR), e.openElements.pop(), e.framesetOk = !1;
}
function Us(e, t) {
	let n = t.tagID, r = n === Y.UNKNOWN ? e.openElements.indexOfTopmostByName(q.HTML, t.tagName) : e.openElements.indexOfTopmost(n);
	r > 0 && !e.openElements.hasSpecialElementAbove(r) && (e.openElements.generateImpliedEndTagsWithExclusion(n), e.openElements.stackTop >= r && e.openElements.shortenToLength(r));
}
function Ws(e, t) {
	switch (t.tagID) {
		case Y.A:
		case Y.B:
		case Y.I:
		case Y.S:
		case Y.U:
		case Y.EM:
		case Y.TT:
		case Y.BIG:
		case Y.CODE:
		case Y.FONT:
		case Y.NOBR:
		case Y.SMALL:
		case Y.STRIKE:
		case Y.STRONG:
			Oo(e, t);
			break;
		case Y.P:
			Ls(e);
			break;
		case Y.DL:
		case Y.UL:
		case Y.OL:
		case Y.DIR:
		case Y.DIV:
		case Y.NAV:
		case Y.PRE:
		case Y.MAIN:
		case Y.MENU:
		case Y.ASIDE:
		case Y.BUTTON:
		case Y.CENTER:
		case Y.FIGURE:
		case Y.FOOTER:
		case Y.HEADER:
		case Y.HGROUP:
		case Y.DIALOG:
		case Y.ADDRESS:
		case Y.ARTICLE:
		case Y.DETAILS:
		case Y.SEARCH:
		case Y.SECTION:
		case Y.SUMMARY:
		case Y.LISTING:
		case Y.FIELDSET:
		case Y.BLOCKQUOTE:
		case Y.FIGCAPTION:
			Fs(e, t);
			break;
		case Y.LI:
			Rs(e);
			break;
		case Y.DD:
		case Y.DT:
			zs(e, t);
			break;
		case Y.H1:
		case Y.H2:
		case Y.H3:
		case Y.H4:
		case Y.H5:
		case Y.H6:
			Bs(e);
			break;
		case Y.BR:
			Hs(e);
			break;
		case Y.BODY:
			Ns(e, t);
			break;
		case Y.HTML:
			Ps(e, t);
			break;
		case Y.FORM:
			Is(e);
			break;
		case Y.APPLET:
		case Y.OBJECT:
		case Y.MARQUEE:
			Vs(e, t);
			break;
		case Y.TEMPLATE:
			Uo(e, t);
			break;
		default: Us(e, t);
	}
}
function Gs(e, t) {
	e.tmplInsertionModeStack.length > 0 ? Dc(e, t) : Mo(e, t);
}
function Ks(e, t) {
	var n;
	t.tagID === Y.SCRIPT && ((n = e.scriptHandler) == null || n.call(e, e.openElements.current)), e.openElements.pop(), e.insertionMode = e.originalInsertionMode;
}
function qs(e, t) {
	e._err(t, K.eofInElementThatCanContainOnlyText), e.openElements.pop(), e.insertionMode = e.originalInsertionMode, e.onEof(t);
}
function Js(e, t) {
	if (e.openElements.currentTagId !== void 0 && yo.has(e.openElements.currentTagId)) switch (e.pendingCharacterTokens.length = 0, e.hasNonWhitespacePendingCharacterToken = !1, e.originalInsertionMode = e.insertionMode, e.insertionMode = Q.IN_TABLE_TEXT, t.type) {
		case $r.CHARACTER:
			sc(e, t);
			break;
		case $r.WHITESPACE_CHARACTER: oc(e, t);
	}
	else ac(e, t);
}
function Ys(e, t) {
	e.openElements.clearBackToTableContext(), e.activeFormattingElements.insertMarker(), e._insertElement(t, q.HTML), e.insertionMode = Q.IN_CAPTION;
}
function Xs(e, t) {
	e.openElements.clearBackToTableContext(), e._insertElement(t, q.HTML), e.insertionMode = Q.IN_COLUMN_GROUP;
}
function Zs(e, t) {
	e.openElements.clearBackToTableContext(), e._insertFakeElement(J.COLGROUP, Y.COLGROUP), e.insertionMode = Q.IN_COLUMN_GROUP, fc(e, t);
}
function Qs(e, t) {
	e.openElements.clearBackToTableContext(), e._insertElement(t, q.HTML), e.insertionMode = Q.IN_TABLE_BODY;
}
function $s(e, t) {
	e.openElements.clearBackToTableContext(), e._insertFakeElement(J.TBODY, Y.TBODY), e.insertionMode = Q.IN_TABLE_BODY, hc(e, t);
}
function ec(e, t) {
	e.openElements.hasInTableScope(Y.TABLE) && (e.openElements.popUntilTagNamePopped(Y.TABLE), e._resetInsertionMode(), e._processStartTag(t));
}
function tc(e, t) {
	gs(t) ? e._appendElement(t, q.HTML) : ac(e, t), t.ackSelfClosing = !0;
}
function nc(e, t) {
	!e.formElement && e.openElements.tmplCount === 0 && (e._insertElement(t, q.HTML), e.formElement = e.openElements.current, e.openElements.pop());
}
function rc(e, t) {
	switch (t.tagID) {
		case Y.TD:
		case Y.TH:
		case Y.TR:
			$s(e, t);
			break;
		case Y.STYLE:
		case Y.SCRIPT:
		case Y.TEMPLATE:
			Vo(e, t);
			break;
		case Y.COL:
			Zs(e, t);
			break;
		case Y.FORM:
			nc(e, t);
			break;
		case Y.TABLE:
			ec(e, t);
			break;
		case Y.TBODY:
		case Y.TFOOT:
		case Y.THEAD:
			Qs(e, t);
			break;
		case Y.INPUT:
			tc(e, t);
			break;
		case Y.CAPTION:
			Ys(e, t);
			break;
		case Y.COLGROUP:
			Xs(e, t);
			break;
		default: ac(e, t);
	}
}
function ic(e, t) {
	switch (t.tagID) {
		case Y.TABLE:
			e.openElements.hasInTableScope(Y.TABLE) && (e.openElements.popUntilTagNamePopped(Y.TABLE), e._resetInsertionMode());
			break;
		case Y.TEMPLATE:
			Uo(e, t);
			break;
		case Y.BODY:
		case Y.CAPTION:
		case Y.COL:
		case Y.COLGROUP:
		case Y.HTML:
		case Y.TBODY:
		case Y.TD:
		case Y.TFOOT:
		case Y.TH:
		case Y.THEAD:
		case Y.TR: break;
		default: ac(e, t);
	}
}
function ac(e, t) {
	let n = e.fosterParentingEnabled;
	e.fosterParentingEnabled = !0, Zo(e, t), e.fosterParentingEnabled = n;
}
function oc(e, t) {
	e.pendingCharacterTokens.push(t);
}
function sc(e, t) {
	e.pendingCharacterTokens.push(t), e.hasNonWhitespacePendingCharacterToken = !0;
}
function cc(e, t) {
	let n = 0;
	if (e.hasNonWhitespacePendingCharacterToken) for (; n < e.pendingCharacterTokens.length; n++) ac(e, e.pendingCharacterTokens[n]);
	else for (; n < e.pendingCharacterTokens.length; n++) e._insertCharacters(e.pendingCharacterTokens[n]);
	e.insertionMode = e.originalInsertionMode, e._processToken(t);
}
var lc = /* @__PURE__ */ new Set([
	Y.CAPTION,
	Y.COL,
	Y.COLGROUP,
	Y.TBODY,
	Y.TD,
	Y.TFOOT,
	Y.TH,
	Y.THEAD,
	Y.TR
]);
function uc(e, t) {
	let n = t.tagID;
	lc.has(n) ? e.openElements.hasInTableScope(Y.CAPTION) && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilTagNamePopped(Y.CAPTION), e.activeFormattingElements.clearToLastMarker(), e.insertionMode = Q.IN_TABLE, rc(e, t)) : Ms(e, t);
}
function dc(e, t) {
	let n = t.tagID;
	switch (n) {
		case Y.CAPTION:
		case Y.TABLE:
			e.openElements.hasInTableScope(Y.CAPTION) && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilTagNamePopped(Y.CAPTION), e.activeFormattingElements.clearToLastMarker(), e.insertionMode = Q.IN_TABLE, n === Y.TABLE && ic(e, t));
			break;
		case Y.BODY:
		case Y.COL:
		case Y.COLGROUP:
		case Y.HTML:
		case Y.TBODY:
		case Y.TD:
		case Y.TFOOT:
		case Y.TH:
		case Y.THEAD:
		case Y.TR: break;
		default: Ws(e, t);
	}
}
function fc(e, t) {
	switch (t.tagID) {
		case Y.HTML:
			Ms(e, t);
			break;
		case Y.COL:
			e._appendElement(t, q.HTML), t.ackSelfClosing = !0;
			break;
		case Y.TEMPLATE:
			Vo(e, t);
			break;
		default: mc(e, t);
	}
}
function pc(e, t) {
	switch (t.tagID) {
		case Y.COLGROUP:
			e.openElements.currentTagId === Y.COLGROUP && (e.openElements.pop(), e.insertionMode = Q.IN_TABLE);
			break;
		case Y.TEMPLATE:
			Uo(e, t);
			break;
		case Y.COL: break;
		default: mc(e, t);
	}
}
function mc(e, t) {
	e.openElements.currentTagId === Y.COLGROUP && (e.openElements.pop(), e.insertionMode = Q.IN_TABLE, e._processToken(t));
}
function hc(e, t) {
	switch (t.tagID) {
		case Y.TR:
			e.openElements.clearBackToTableBodyContext(), e._insertElement(t, q.HTML), e.insertionMode = Q.IN_ROW;
			break;
		case Y.TH:
		case Y.TD:
			e.openElements.clearBackToTableBodyContext(), e._insertFakeElement(J.TR, Y.TR), e.insertionMode = Q.IN_ROW, _c(e, t);
			break;
		case Y.CAPTION:
		case Y.COL:
		case Y.COLGROUP:
		case Y.TBODY:
		case Y.TFOOT:
		case Y.THEAD:
			e.openElements.hasTableBodyContextInTableScope() && (e.openElements.clearBackToTableBodyContext(), e.openElements.pop(), e.insertionMode = Q.IN_TABLE, rc(e, t));
			break;
		default: rc(e, t);
	}
}
function gc(e, t) {
	let n = t.tagID;
	switch (t.tagID) {
		case Y.TBODY:
		case Y.TFOOT:
		case Y.THEAD:
			e.openElements.hasInTableScope(n) && (e.openElements.clearBackToTableBodyContext(), e.openElements.pop(), e.insertionMode = Q.IN_TABLE);
			break;
		case Y.TABLE:
			e.openElements.hasTableBodyContextInTableScope() && (e.openElements.clearBackToTableBodyContext(), e.openElements.pop(), e.insertionMode = Q.IN_TABLE, ic(e, t));
			break;
		case Y.BODY:
		case Y.CAPTION:
		case Y.COL:
		case Y.COLGROUP:
		case Y.HTML:
		case Y.TD:
		case Y.TH:
		case Y.TR: break;
		default: ic(e, t);
	}
}
function _c(e, t) {
	switch (t.tagID) {
		case Y.TH:
		case Y.TD:
			e.openElements.clearBackToTableRowContext(), e._insertElement(t, q.HTML), e.insertionMode = Q.IN_CELL, e.activeFormattingElements.insertMarker();
			break;
		case Y.CAPTION:
		case Y.COL:
		case Y.COLGROUP:
		case Y.TBODY:
		case Y.TFOOT:
		case Y.THEAD:
		case Y.TR:
			e.openElements.hasInTableScope(Y.TR) && (e.openElements.clearBackToTableRowContext(), e.openElements.pop(), e.insertionMode = Q.IN_TABLE_BODY, hc(e, t));
			break;
		default: rc(e, t);
	}
}
function vc(e, t) {
	switch (t.tagID) {
		case Y.TR:
			e.openElements.hasInTableScope(Y.TR) && (e.openElements.clearBackToTableRowContext(), e.openElements.pop(), e.insertionMode = Q.IN_TABLE_BODY);
			break;
		case Y.TABLE:
			e.openElements.hasInTableScope(Y.TR) && (e.openElements.clearBackToTableRowContext(), e.openElements.pop(), e.insertionMode = Q.IN_TABLE_BODY, gc(e, t));
			break;
		case Y.TBODY:
		case Y.TFOOT:
		case Y.THEAD:
			(e.openElements.hasInTableScope(t.tagID) || e.openElements.hasInTableScope(Y.TR)) && (e.openElements.clearBackToTableRowContext(), e.openElements.pop(), e.insertionMode = Q.IN_TABLE_BODY, gc(e, t));
			break;
		case Y.BODY:
		case Y.CAPTION:
		case Y.COL:
		case Y.COLGROUP:
		case Y.HTML:
		case Y.TD:
		case Y.TH: break;
		default: ic(e, t);
	}
}
function yc(e, t) {
	let n = t.tagID;
	lc.has(n) ? (e.openElements.hasInTableScope(Y.TD) || e.openElements.hasInTableScope(Y.TH)) && (e._closeTableCell(), _c(e, t)) : Ms(e, t);
}
function bc(e, t) {
	let n = t.tagID;
	switch (n) {
		case Y.TD:
		case Y.TH:
			e.openElements.hasInTableScope(n) && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilTagNamePopped(n), e.activeFormattingElements.clearToLastMarker(), e.insertionMode = Q.IN_ROW);
			break;
		case Y.TABLE:
		case Y.TBODY:
		case Y.TFOOT:
		case Y.THEAD:
		case Y.TR:
			e.openElements.hasInTableScope(n) && (e._closeTableCell(), vc(e, t));
			break;
		case Y.BODY:
		case Y.CAPTION:
		case Y.COL:
		case Y.COLGROUP:
		case Y.HTML: break;
		default: Ws(e, t);
	}
}
function xc(e, t) {
	switch (t.tagID) {
		case Y.HTML:
			Ms(e, t);
			break;
		case Y.OPTION:
			e.openElements.currentTagId === Y.OPTION && e.openElements.pop(), e._insertElement(t, q.HTML);
			break;
		case Y.OPTGROUP:
			e.openElements.currentTagId === Y.OPTION && e.openElements.pop(), e.openElements.currentTagId === Y.OPTGROUP && e.openElements.pop(), e._insertElement(t, q.HTML);
			break;
		case Y.HR:
			e.openElements.currentTagId === Y.OPTION && e.openElements.pop(), e.openElements.currentTagId === Y.OPTGROUP && e.openElements.pop(), e._appendElement(t, q.HTML), t.ackSelfClosing = !0;
			break;
		case Y.INPUT:
		case Y.KEYGEN:
		case Y.TEXTAREA:
		case Y.SELECT:
			e.openElements.hasInSelectScope(Y.SELECT) && (e.openElements.popUntilTagNamePopped(Y.SELECT), e._resetInsertionMode(), t.tagID !== Y.SELECT && e._processStartTag(t));
			break;
		case Y.SCRIPT:
		case Y.TEMPLATE: Vo(e, t);
	}
}
function Sc(e, t) {
	switch (t.tagID) {
		case Y.OPTGROUP:
			e.openElements.stackTop > 0 && e.openElements.currentTagId === Y.OPTION && e.openElements.tagIDs[e.openElements.slotBelow(e.openElements.stackTop)] === Y.OPTGROUP && e.openElements.pop(), e.openElements.currentTagId === Y.OPTGROUP && e.openElements.pop();
			break;
		case Y.OPTION:
			e.openElements.currentTagId === Y.OPTION && e.openElements.pop();
			break;
		case Y.SELECT:
			e.openElements.hasInSelectScope(Y.SELECT) && (e.openElements.popUntilTagNamePopped(Y.SELECT), e._resetInsertionMode());
			break;
		case Y.TEMPLATE: Uo(e, t);
	}
}
function Cc(e, t) {
	let n = t.tagID;
	n === Y.CAPTION || n === Y.TABLE || n === Y.TBODY || n === Y.TFOOT || n === Y.THEAD || n === Y.TR || n === Y.TD || n === Y.TH ? (e.openElements.popUntilTagNamePopped(Y.SELECT), e._resetInsertionMode(), e._processStartTag(t)) : xc(e, t);
}
function wc(e, t) {
	let n = t.tagID;
	n === Y.CAPTION || n === Y.TABLE || n === Y.TBODY || n === Y.TFOOT || n === Y.THEAD || n === Y.TR || n === Y.TD || n === Y.TH ? e.openElements.hasInTableScope(n) && (e.openElements.popUntilTagNamePopped(Y.SELECT), e._resetInsertionMode(), e.onEndTag(t)) : Sc(e, t);
}
function Tc(e, t) {
	switch (t.tagID) {
		case Y.BASE:
		case Y.BASEFONT:
		case Y.BGSOUND:
		case Y.LINK:
		case Y.META:
		case Y.NOFRAMES:
		case Y.SCRIPT:
		case Y.STYLE:
		case Y.TEMPLATE:
		case Y.TITLE:
			Vo(e, t);
			break;
		case Y.CAPTION:
		case Y.COLGROUP:
		case Y.TBODY:
		case Y.TFOOT:
		case Y.THEAD:
			e.tmplInsertionModeStack[e.tmplInsertionModeStack.length - 1] = Q.IN_TABLE, e.insertionMode = Q.IN_TABLE, rc(e, t);
			break;
		case Y.COL:
			e.tmplInsertionModeStack[e.tmplInsertionModeStack.length - 1] = Q.IN_COLUMN_GROUP, e.insertionMode = Q.IN_COLUMN_GROUP, fc(e, t);
			break;
		case Y.TR:
			e.tmplInsertionModeStack[e.tmplInsertionModeStack.length - 1] = Q.IN_TABLE_BODY, e.insertionMode = Q.IN_TABLE_BODY, hc(e, t);
			break;
		case Y.TD:
		case Y.TH:
			e.tmplInsertionModeStack[e.tmplInsertionModeStack.length - 1] = Q.IN_ROW, e.insertionMode = Q.IN_ROW, _c(e, t);
			break;
		default: e.tmplInsertionModeStack[e.tmplInsertionModeStack.length - 1] = Q.IN_BODY, e.insertionMode = Q.IN_BODY, Ms(e, t);
	}
}
function Ec(e, t) {
	t.tagID === Y.TEMPLATE && Uo(e, t);
}
function Dc(e, t) {
	if (e.openElements.tmplCount > 0) {
		do
			e.openElements.popUntilTagNamePopped(Y.TEMPLATE), e.activeFormattingElements.clearToLastMarker(), e.tmplInsertionModeStack.pop();
		while (e.openElements.tmplCount > 0);
		e._resetInsertionMode(), e.onEof(t);
	} else Mo(e, t);
}
function Oc(e, t) {
	t.tagID === Y.HTML ? Ms(e, t) : Ac(e, t);
}
function kc(e, t) {
	if (t.tagID === Y.HTML) {
		if (e.fragmentContext || (e.insertionMode = Q.AFTER_AFTER_BODY), e.options.sourceCodeLocationInfo && e.openElements.tagIDs[0] === Y.HTML) {
			e._setEndLocation(e.openElements.items[0], t);
			let n = e.openElements.items[1];
			n && !e.treeAdapter.getNodeSourceCodeLocation(n)?.endTag && e._setEndLocation(n, t);
		}
	} else Ac(e, t);
}
function Ac(e, t) {
	e.insertionMode = Q.IN_BODY, Zo(e, t);
}
function jc(e, t) {
	switch (t.tagID) {
		case Y.HTML:
			Ms(e, t);
			break;
		case Y.FRAMESET:
			e._insertElement(t, q.HTML);
			break;
		case Y.FRAME:
			e._appendElement(t, q.HTML), t.ackSelfClosing = !0;
			break;
		case Y.NOFRAMES: Vo(e, t);
	}
}
function Mc(e, t) {
	t.tagID === Y.FRAMESET && !e.openElements.isRootHtmlElementCurrent() && (e.openElements.pop(), !e.fragmentContext && e.openElements.currentTagId !== Y.FRAMESET && (e.insertionMode = Q.AFTER_FRAMESET));
}
function Nc(e, t) {
	switch (t.tagID) {
		case Y.HTML:
			Ms(e, t);
			break;
		case Y.NOFRAMES: Vo(e, t);
	}
}
function Pc(e, t) {
	t.tagID === Y.HTML && (e.insertionMode = Q.AFTER_AFTER_FRAMESET);
}
function Fc(e, t) {
	t.tagID === Y.HTML ? Ms(e, t) : Ic(e, t);
}
function Ic(e, t) {
	e.insertionMode = Q.IN_BODY, Zo(e, t);
}
function Lc(e, t) {
	switch (t.tagID) {
		case Y.HTML:
			Ms(e, t);
			break;
		case Y.NOFRAMES: Vo(e, t);
	}
}
function Rc(e, t) {
	t.chars = "�", e._insertCharacters(t);
}
function zc(e, t) {
	e._insertCharacters(t), e.framesetOk = !1;
}
function Bc(e) {
	for (; e.treeAdapter.getNamespaceURI(e.openElements.current) !== q.HTML && e.openElements.currentTagId !== void 0 && !e._isIntegrationPoint(e.openElements.currentTagId, e.openElements.current);) e.openElements.pop();
}
function Vc(e, t) {
	if (io(t)) Bc(e), e._startTagOutsideForeignContent(t);
	else {
		let n = e._getAdjustedCurrentElement(), r = e.treeAdapter.getNamespaceURI(n);
		r === q.MATHML ? ao(t) : r === q.SVG && (co(t), oo(t)), so(t), t.selfClosing ? e._appendElement(t, r) : e._insertElement(t, r), t.ackSelfClosing = !0;
	}
}
function Hc(e, t) {
	if (t.tagID === Y.P || t.tagID === Y.BR) {
		Bc(e), e._endTagOutsideForeignContent(t);
		return;
	}
	if (e.openElements.stackTop === 0) return;
	let { tagName: n } = t, r = no.get(n), i = e.fragmentContext ? e.treeAdapter.getNamespaceURI(e.fragmentContext) : q.HTML, a = Math.max(e.openElements.indexOfTopmostByName(q.SVG, n), e.openElements.indexOfTopmostByName(q.MATHML, n), r === void 0 ? -1 : e.openElements.indexOfTopmostByName(q.SVG, r), i === q.HTML || i === q.SVG || i === q.MATHML ? -1 : e.openElements.indexOfTopmostByName(i, n));
	a > e.openElements.indexOfTopmostHtmlElement() ? (t.tagName = e.treeAdapter.getTagName(e.openElements.items[a]), e.openElements.shortenToLength(a)) : e._endTagOutsideForeignContent(t);
}
J.AREA, J.BASE, J.BASEFONT, J.BGSOUND, J.BR, J.COL, J.EMBED, J.FRAME, J.HR, J.IMG, J.INPUT, J.KEYGEN, J.LINK, J.META, J.PARAM, J.SOURCE, J.TRACK, J.WBR;
// node_modules/entities/dist/esm/decode-codepoint.js
var Uc = /* @__PURE__ */ new Map([
	[0, 65533],
	[128, 8364],
	[130, 8218],
	[131, 402],
	[132, 8222],
	[133, 8230],
	[134, 8224],
	[135, 8225],
	[136, 710],
	[137, 8240],
	[138, 352],
	[139, 8249],
	[140, 338],
	[142, 381],
	[145, 8216],
	[146, 8217],
	[147, 8220],
	[148, 8221],
	[149, 8226],
	[150, 8211],
	[151, 8212],
	[152, 732],
	[153, 8482],
	[154, 353],
	[155, 8250],
	[156, 339],
	[158, 382],
	[159, 376]
]), Wc = String.fromCodePoint ?? ((e) => {
	let t = "";
	return e > 65535 && (e -= 65536, t += String.fromCharCode(e >>> 10 & 1023 | 55296), e = 56320 | e & 1023), t += String.fromCharCode(e), t;
});
function Gc(e) {
	return e >= 55296 && e <= 57343 || e > 1114111 ? 65533 : Uc.get(e) ?? e;
}
// node_modules/entities/dist/esm/internal/decode-shared.js
function Kc(e) {
	let t = typeof atob == "function" ? atob(e) : typeof Buffer.from == "function" ? Buffer.from(e, "base64").toString("binary") : new Buffer(e, "base64").toString("binary"), n = t.length & -2, r = new Uint16Array(n / 2);
	for (let e = 0, i = 0; e < n; e += 2) {
		let n = t.charCodeAt(e), a = t.charCodeAt(e + 1);
		r[i++] = n | a << 8;
	}
	return r;
}
// node_modules/entities/dist/esm/generated/decode-data-html.js
var qc = /* #__PURE__ */ Kc("QR08ALkAAgH6AYsDNQR2BO0EPgXZBQEGLAbdBxMISQrvCmQLfQurDKQNLw4fD4YPpA+6D/IPAAAAAAAAAAAAAAAAKhBMEY8TmxUWF2EYLBkxGuAa3RsJHDscWR8YIC8jSCSIJcMl6ie3Ku8rEC0CLjoupS7kLgAIRU1hYmNmZ2xtbm9wcnN0dVQAWgBeAGUAaQBzAHcAfgCBAIQAhwCSAJoAoACsALMAbABpAGcAO4DGAMZAUAA7gCYAJkBjAHUAdABlADuAwQDBQHIiZXZlAAJhAAFpeW0AcgByAGMAO4DCAMJAEGRyAADgNdgE3XIAYQB2AGUAO4DAAMBA8CFoYZFj4SFjcgBhZAAAoFMqAAFncIsAjgBvAG4ABGFmAADgNdg43fAlbHlGdW5jdGlvbgCgYSBpAG4AZwA7gMUAxUAAAWNzpACoAHIAAOA12Jzc6SFnbgCgVCJpAGwAZABlADuAwwDDQG0AbAA7gMQAxEAABGFjZWZvcnN1xQDYANoA7QDxAPYA+QD8AAABY3LJAM8AayNzbGFzaAAAoBYidgHTANUAAKDnKmUAZAAAoAYjeQARZIABY3J0AOAA5QDrAGEidXNlAACgNSLuI291bGxpcwCgLCFhAJJjcgAA4DXYBd1wAGYAAOA12Dnd5SF2ZdhiYwDyAOoAbSJwZXEAAKBOIgAHSE9hY2RlZmhpbG9yc3UXARoBHwE6AVIBVQFiAWQBZgGCAakB6QHtAfIBYwB5ACdkUABZADuAqQCpQIABY3B5ACUBKAE1AfUhdGUGYWmg0iJ0KGFsRGlmZmVyZW50aWFsRAAAoEUhbCJleXMAAKAtIQACYWVpb0EBRAFKAU0B8iFvbgxhZABpAGwAO4DHAMdAcgBjAAhhbiJpbnQAAKAwIm8AdAAKYQABZG5ZAV0BaSJsbGEAuGB0I2VyRG90ALdg8gA5AWkAp2NyImNsZQAAAkRNUFRwAXQBeQF9AW8AdAAAoJkiaSJudXMAAKCWIuwhdXMAoJUiaSJtZXMAAKCXIm8AAAFjc4cBlAFrKndpc2VDb250b3VySW50ZWdyYWwAAKAyImUjQ3VybHkAAAFEUZwBpAFvJXVibGVRdW90ZQAAoB0gdSJvdGUAAKAZIAACbG5wdbABtgHNAdgBbwBuAGWgNyIAoHQqgAFnaXQAvAHBAcUB8iJ1ZW50AKBhIm4AdAAAoC8i7yV1ckludGVncmFsAKAuIgABZnLRAdMBAKACIe8iZHVjdACgECJuLnRlckNsb2Nrd2lzZUNvbnRvdXJJbnRlZ3JhbAAAoDMi7yFzcwCgLypjAHIAAOA12J7ccABDoNMiYQBwAACgTSKABURKU1phY2VmaW9zAAsCEgIVAhgCGwIsAjQCOQI9AnMCfwNvoEUh9CJyYWhkAKARKWMAeQACZGMAeQAFZGMAeQAPZIABZ3JzACECJQIoAuchZXIAoCEgcgAAoKEhaAB2AACg5CoAAWF5MAIzAvIhb24OYRRkbAB0oAciYQCUY3IAAOA12AfdAAFhZkECawIAAWNtRQJnAvIjaXRpY2FsAAJBREdUUAJUAl8CYwJjInV0ZQC0YG8AdAFZAloC2WJiJGxlQWN1dGUA3WJyImF2ZQBgYGkibGRlANxi7yFuZACgxCJmJWVyZW50aWFsRAAAoEYhcAR9AgAAAAAAAIECjgIAABoDZgAA4DXYO91EoagAhQKJAm8AdAAAoNwgcSJ1YWwAAKBQIuIhbGUAA0NETFJVVpkCqAK1Au8C/wIRA28AbgB0AG8AdQByAEkAbgB0AGUAZwByAGEA7ADEAW8AdAKvAgAAAACwAqhgbiNBcnJvdwAAoNMhAAFlb7kC0AJmAHQAgAFBUlQAwQLGAs0CciJyb3cAAKDQIekkZ2h0QXJyb3cAoNQhZQDlACsCbgBnAAABTFLWAugC5SFmdAABQVLcAuECciJyb3cAAKD4J+kkZ2h0QXJyb3cAoPon6SRnaHRBcnJvdwCg+SdpImdodAAAAUFU9gL7AnIicm93AACg0iFlAGUAAKCoInAAQQIGAwAAAAALA3Iicm93AACg0SFvJHduQXJyb3cAAKDVIWUlcnRpY2FsQmFyAACgJSJuAAADQUJMUlRhJAM2AzoDWgNxA3oDciJyb3cAAKGTIUJVLAMwA2EAcgAAoBMpcCNBcnJvdwAAoPUhciJldmUAEWPlIWZ00gJDAwAASwMAAFIDaSVnaHRWZWN0b3IAAKBQKWUkZVZlY3RvcgAAoF4p5SJjdG9yQqC9IWEAcgAAoFYpaSJnaHQA1AFiAwAAaQNlJGVWZWN0b3IAAKBfKeUiY3RvckKgwSFhAHIAAKBXKWUAZQBBoKQiciJyb3cAAKCnIXIAcgBvAPcAtAIAAWN0gwOHA3IAAOA12J/c8iFvaxBhAAhOVGFjZGZnbG1vcHFzdHV4owOlA6kDsAO/A8IDxgPNA9ID8gP9AwEEFAQeBCAEJQRHAEphSAA7gNAA0EBjAHUAdABlADuAyQDJQIABYWl5ALYDuQO+A/Ihb24aYXIAYwA7gMoAykAtZG8AdAAWYXIAAOA12AjdcgBhAHYAZQA7gMgAyEDlIm1lbnQAoAgiAAFhcNYD2QNjAHIAEmF0AHkAUwLhAwAAAADpA20lYWxsU3F1YXJlAACg+yVlJ3J5U21hbGxTcXVhcmUAAKCrJQABZ3D2A/kDbwBuABhhZgAA4DXYPN3zImlsb26VY3UAAAFhaQYEDgRsAFSgdSppImxkZQAAoEIi7CNpYnJpdW0AoMwhAAFjaRgEGwRyAACgMCFtAACgcyphAJdjbQBsADuAywDLQAABaXApBC0E8yF0cwCgAyLvJG5lbnRpYWxFAKBHIYACY2Zpb3MAPQQ/BEMEXQRyBHkAJGRyAADgNdgJ3WwibGVkAFMCTAQAAAAAVARtJWFsbFNxdWFyZQAAoPwlZSdyeVNtYWxsU3F1YXJlAACgqiVwA2UEAABpBAAAAABtBGYAAOA12D3dwSFsbACgACLyI2llcnRyZgCgMSFjAPIAcQQABkpUYWJjZGZnb3JzdIgEiwSOBJMElwSkBKcEqwStBLIE5QTqBGMAeQADZDuAPgA+QO0hbWFkoJMD3GNyImV2ZQAeYYABZWl5AJ0EoASjBOQhaWwiYXIAYwAcYRNkbwB0ACBhcgAA4DXYCt0AoNkicABmAADgNdg+3eUiYXRlcgADRUZHTFNUvwTIBM8E1QTZBOAEcSJ1YWwATKBlIuUhc3MAoNsidSRsbEVxdWFsAACgZyJyI2VhdGVyAACgoirlIXNzAKB3IuwkYW50RXF1YWwAoH4qaSJsZGUAAKBzImMAcgAA4DXYotwAoGsiAARBYWNmaW9zdfkE/QQFBQgFCwUTBSIFKwVSIkRjeQAqZAABY3QBBQQFZQBrAMdiXmDpIXJjJGFyAACgDCFsJWJlcnRTcGFjZQAAoAsh8AEYBQAAGwVmAACgDSHpJXpvbnRhbExpbmUAoAAlAAFjdCYFKAXyABIF8iFvayZhbQBwAEQBMQU5BW8AdwBuAEgAdQBtAPAAAAFxInVhbAAAoE8iAAdFSk9hY2RmZ21ub3N0dVMFVgVZBVwFYwVtBXAFcwV6BZAFtgXFBckFzQVjAHkAFWTsIWlnMmFjAHkAAWRjAHUAdABlADuAzQDNQAABaXlnBWwFcgBjADuAzgDOQBhkbwB0ADBhcgAAoBEhcgBhAHYAZQA7gMwAzEAAoREhYXB/BYsFAAFjZ4MFhQVyACphaSNuYXJ5SQAAoEghbABpAGUA8wD6AvQBlQUAAKUFZaAsIgABZ3KaBZ4F8iFhbACgKyLzI2VjdGlvbgCgwiJpI3NpYmxlAAABQ1SsBbEFbyJtbWEAAKBjIGkibWVzAACgYiCAAWdwdAC8Bb8FwwVvAG4ALmFmAADgNdhA3WEAmWNjAHIAAKAQIWkibGRlAChh6wHSBQAA1QVjAHkABmRsADuAzwDPQIACY2Zvc3UA4QXpBe0F8gX9BQABaXnlBegFcgBjADRhGWRyAADgNdgN3XAAZgAA4DXYQd3jAfcFAAD7BXIAAOA12KXc8iFjeQhk6yFjeQRkgANISmFjZm9zAAwGDwYSBhUGHQYhBiYGYwB5ACVkYwB5AAxk8CFwYZpjAAFleRkGHAbkIWlsNmEaZHIAAOA12A7dcABmAADgNdhC3WMAcgAA4DXYptyABUpUYWNlZmxtb3N0AD0GQAZDBl4GawZkB2gHcAd0B80H2gdjAHkACWQ7gDwAPECAAmNtbnByAEwGTwZSBlUGWwb1IXRlOWHiIWRhm2NnAACg6ifsI2FjZXRyZgCgEiFyAACgniGAAWFleQBkBmcGagbyIW9uPWHkIWlsO2EbZAABZnNvBjQHdAAABUFDREZSVFVWYXKABp4GpAbGBssG3AYDByEHwQIqBwABbnKEBowGZyVsZUJyYWNrZXQAAKDoJ/Ihb3cAoZAhQlKTBpcGYQByAACg5CHpJGdodEFycm93AKDGIWUjaWxpbmcAAKAII28A9QGqBgAAsgZiJWxlQnJhY2tldAAAoOYnbgDUAbcGAAC+BmUkZVZlY3RvcgAAoGEp5SJjdG9yQqDDIWEAcgAAoFkpbCJvb3IAAKAKI2kiZ2h0AAABQVbSBtcGciJyb3cAAKCUIeUiY3RvcgCgTikAAWVy4AbwBmUAAKGjIkFW5gbrBnIicm93AACgpCHlImN0b3IAoFopaSNhbmdsZQBCorIi+wYAAAAA/wZhAHIAAKDPKXEidWFsAACgtCJwAIABRFRWAAoHEQcYB+8kd25WZWN0b3IAoFEpZSRlVmVjdG9yAACgYCnlImN0b3JCoL8hYQByAACgWCnlImN0b3JCoLwhYQByAACgUilpAGcAaAB0AGEAcgByAG8A9wDMAnMAAANFRkdMU1Q/B0cHTgdUB1gHXwfxJXVhbEdyZWF0ZXIAoNoidSRsbEVxdWFsAACgZiJyI2VhdGVyAACgdiLlIXNzAKChKuwkYW50RXF1YWwAoH0qaSJsZGUAAKByInIAAOA12A/dZaDYIuYjdGFycm93AKDaIWkiZG90AD9hgAFucHcAege1B7kHZwAAAkxSbHKCB5QHmwerB+UhZnQAAUFSiAeNB3Iicm93AACg9SfpJGdodEFycm93AKD3J+kkZ2h0QXJyb3cAoPYn5SFmdAABYXLcAqEHaQBnAGgAdABhAHIAcgBvAPcA5wJpAGcAaAB0AGEAcgByAG8A9wDuAmYAAOA12EPdZQByAAABTFK/B8YHZSRmdEFycm93AACgmSHpJGdodEFycm93AKCYIYABY2h0ANMH1QfXB/IAWgYAoLAh8iFva0FhAKBqIgAEYWNlZmlvc3XpB+wH7gf/BwMICQgOCBEIcAAAoAUpeQAcZAABZGzyB/kHaSR1bVNwYWNlAACgXyBsI2ludHJmAACgMyFyAADgNdgQ3e4jdXNQbHVzAKATInAAZgAA4DXYRN1jAPIA/gecY4AESmFjZWZvc3R1ACEIJAgoCDUIgQiFCDsKQApHCmMAeQAKZGMidXRlAENhgAFhZXkALggxCDQI8iFvbkdh5CFpbEVhHWSAAWdzdwA7CGEIfQjhInRpdmWAAU1UVgBECEwIWQhlJWRpdW1TcGFjZQAAoAsgaABpAAABY25SCFMIawBTAHAAYQBjAOUASwhlAHIAeQBUAGgAaQDuAFQI9CFlZAABR0xnCHUIcgBlAGEAdABlAHIARwByAGUAYQB0AGUA8gDrBGUAcwBzAEwAZQBzAPMA2wdMImluZQAKYHIAAOA12BHdAAJCbnB0jAiRCJkInAhyImVhawAAoGAgwiZyZWFraW5nU3BhY2WgYGYAAKAVIUOq7CqzCMIIzQgAAOcIGwkAAAAAAAAtCQAAbwkAAIcJAACdCcAJGQoAADQKAAFvdbYIvAjuI2dydWVudACgYiJwIkNhcAAAoG0ibyh1YmxlVmVydGljYWxCYXIAAKAmIoABbHF4ANII1wjhCOUibWVudACgCSL1IWFsVKBgImkibGRlAADgQiI4A2kic3RzAACgBCJyI2VhdGVyAACjbyJFRkdMU1T1CPoIAgkJCQ0JFQlxInVhbAAAoHEidSRsbEVxdWFsAADgZyI4A3IjZWF0ZXIAAOBrIjgD5SFzcwCgeSLsJGFudEVxdWFsAOB+KjgDaSJsZGUAAKB1IvUhbXBEASAJJwnvI3duSHVtcADgTiI4A3EidWFsAADgTyI4A2UAAAFmczEJRgn0JFRyaWFuZ2xlQqLqIj0JAAAAAEIJYQByAADgzyk4A3EidWFsAACg7CJzAICibiJFR0xTVABRCVYJXAlhCWkJcSJ1YWwAAKBwInIjZWF0ZXIAAKB4IuUhc3MA4GoiOAPsJGFudEVxdWFsAOB9KjgDaSJsZGUAAKB0IuUic3RlZAABR0x1CX8J8iZlYXRlckdyZWF0ZXIA4KIqOAPlI3NzTGVzcwDgoSo4A/IjZWNlZGVzAKGAIkVTjwmVCXEidWFsAADgryo4A+wkYW50RXF1YWwAoOAiAAFlaaAJqQl2JmVyc2VFbGVtZW50AACgDCLnJWh0VHJpYW5nbGVCousitgkAAAAAuwlhAHIAAODQKTgDcSJ1YWwAAKDtIgABcXXDCeAJdSNhcmVTdQAAAWJwywnVCfMhZXRF4I8iOANxInVhbAAAoOIi5SJyc2V0ReCQIjgDcSJ1YWwAAKDjIoABYmNwAOYJ8AkNCvMhZXRF4IIi0iBxInVhbAAAoIgi4yJlZWRzgKGBIkVTVAD6CQAKBwpxInVhbAAA4LAqOAPsJGFudEVxdWFsAKDhImkibGRlAADgfyI4A+UicnNldEXggyLSIHEidWFsAACgiSJpImxkZQCAoUEiRUZUACIKJwouCnEidWFsAACgRCJ1JGxsRXF1YWwAAKBHImkibGRlAACgSSJlJXJ0aWNhbEJhcgAAoCQiYwByAADgNdip3GkAbABkAGUAO4DRANFAnWMAB0VhY2RmZ21vcHJzdHV2XgphCmgKcgp2CnoKgQqRCpYKqwqtCrsKyArNCuwhaWdSYWMAdQB0AGUAO4DTANNAAAFpeWwKcQpyAGMAO4DUANRAHmRiImxhYwBQYXIAAOA12BLdcgBhAHYAZQA7gNIA0kCAAWFlaQCHCooKjQpjAHIATGFnAGEAqWNjInJvbgCfY3AAZgAA4DXYRt3lI25DdXJseQABRFGeCqYKbyV1YmxlUXVvdGUAAKAcIHUib3RlAACgGCAAoFQqAAFjbLEKtQpyAADgNdiq3GEAcwBoADuA2ADYQGkAbAHACsUKZABlADuA1QDVQGUAcwAAoDcqbQBsADuA1gDWQGUAcgAAAUJQ0wrmCgABYXLXCtoKcgAAoD4gYQBjAAABZWvgCuIKAKDeI2UAdAAAoLQjYSVyZW50aGVzaXMAAKDcI4AEYWNmaGlsb3JzAP0KAwsFCwkLCwsMCxELIwtaC3IjdGlhbEQAAKACInkAH2RyAADgNdgT3WkApmOgY/Ujc01pbnVzsWAAAWlwFQsgC24AYwBhAHIAZQBwAGwAYQBuAOUACgVmAACgGSGAobsqZWlvACoLRQtJC+MiZWRlc4CheiJFU1QANAs5C0ALcSJ1YWwAAKCvKuwkYW50RXF1YWwAoHwiaSJsZGUAAKB+Im0AZQAAoDMgAAFkcE0LUQv1IWN0AKAPIm8jcnRpb24AYaA3ImwAAKAdIgABY2leC2ILcgAA4DXYq9yoYwACVWZvc2oLbwtzC3cLTwBUADuAIgAiQHIAAOA12BTdcABmAACgGiFjAHIAAOA12KzcAAZCRWFjZWZoaW9yc3WPC5MLlwupC7YL2AvbC90LhQyTDJoMowzhIXJyAKAQKUcAO4CuAK5AgAFjbnIAnQugC6ML9SF0ZVRhZwAAoOsncgB0oKAhbAAAoBYpgAFhZXkArwuyC7UL8iFvblhh5CFpbFZhIGR2oBwhZSJyc2UAAAFFVb8LzwsAAWxxwwvIC+UibWVudACgCyL1JGlsaWJyaXVtAKDLIXAmRXF1aWxpYnJpdW0AAKBvKXIAAKAcIW8AoWPnIWh0AARBQ0RGVFVWYewLCgwQDDIMNwxeDHwM9gIAAW5y8Av4C2clbGVCcmFja2V0AACg6SfyIW93AKGSIUJM/wsDDGEAcgAAoOUhZSRmdEFycm93AACgxCFlI2lsaW5nAACgCSNvAPUBFgwAAB4MYiVsZUJyYWNrZXQAAKDnJ24A1AEjDAAAKgxlJGVWZWN0b3IAAKBdKeUiY3RvckKgwiFhAHIAAKBVKWwib29yAACgCyMAAWVyOwxLDGUAAKGiIkFWQQxGDHIicm93AACgpiHlImN0b3IAoFspaSNhbmdsZQBCorMiVgwAAAAAWgxhAHIAAKDQKXEidWFsAACgtSJwAIABRFRWAGUMbAxzDO8kd25WZWN0b3IAoE8pZSRlVmVjdG9yAACgXCnlImN0b3JCoL4hYQByAACgVCnlImN0b3JCoMAhYQByAACgUykAAXB1iQyMDGYAAKAdIe4kZEltcGxpZXMAoHAp6SRnaHRhcnJvdwCg2yEAAWNongyhDHIAAKAbIQCgsSHsJGVEZWxheWVkAKD0KYAGSE9hY2ZoaW1vcXN0dQC/DMgMzAzQDOIM5gwKDQ0NFA0ZDU8NVA1YDQABQ2PDDMYMyCFjeSlkeQAoZEYiVGN5ACxkYyJ1dGUAWmEAorwqYWVpedgM2wzeDOEM8iFvbmBh5CFpbF5hcgBjAFxhIWRyAADgNdgW3e8hcnQAAkRMUlXvDPYM/QwEDW8kd25BcnJvdwAAoJMhZSRmdEFycm93AACgkCHpJGdodEFycm93AKCSIXAjQXJyb3cAAKCRIechbWGjY+EkbGxDaXJjbGUAoBgicABmAADgNdhK3XICHw0AAAAAIg10AACgGiLhIXJlgKGhJUlTVQAqDTINSg3uJXRlcnNlY3Rpb24AoJMidQAAAWJwNw1ADfMhZXRFoI8icSJ1YWwAAKCRIuUicnNldEWgkCJxInVhbAAAoJIibiJpb24AAKCUImMAcgAA4DXYrtxhAHIAAKDGIgACYmNtcF8Nag2ODZANc6DQImUAdABFoNAicSJ1YWwAAKCGIgABY2huDYkNZSJlZHMAgKF7IkVTVAB4DX0NhA1xInVhbAAAoLAq7CRhbnRFcXVhbACgfSJpImxkZQAAoH8iVABoAGEA9ADHCwCgESIAodEiZXOVDZ8NciJzZXQARaCDInEidWFsAACghyJlAHQAAKDRIoAFSFJTYWNmaGlvcnMAtQ27Db8NyA3ODdsN3w3+DRgOHQ4jDk8AUgBOADuA3gDeQMEhREUAoCIhAAFIY8MNxg1jAHkAC2R5ACZkAAFidcwNzQ0JYKRjgAFhZXkA1A3XDdoN8iFvbmRh5CFpbGJhImRyAADgNdgX3QABZWnjDe4N8gHoDQAA7Q3lImZvcmUAoDQiYQCYYwABY27yDfkNayNTcGFjZQAA4F8gCiDTInBhY2UAoAkg7CFkZYChPCJFRlQABw4MDhMOcSJ1YWwAAKBDInUkbGxFcXVhbAAAoEUiaSJsZGUAAKBIInAAZgAA4DXYS93pI3BsZURvdACg2yAAAWN0Jw4rDnIAAOA12K/c8iFva2Zh4QpFDlYOYA5qDgAAbg5yDgAAAAAAAAAAAAB5DnwOqA6zDgAADg8RDxYPGg8AAWNySA5ODnUAdABlADuA2gDaQHIAb6CfIeMhaXIAoEkpcgDjAVsOAABdDnkADmR2AGUAbGEAAWl5Yw5oDnIAYwA7gNsA20AjZGIibGFjAHBhcgAA4DXYGN1yAGEAdgBlADuA2QDZQOEhY3JqYQABZGl/Dp8OZQByAAABQlCFDpcOAAFhcokOiw5yAF9gYQBjAAABZWuRDpMOAKDfI2UAdAAAoLUjYSVyZW50aGVzaXMAAKDdI28AbgBQoMMi7CF1cwCgjiIAAWdwqw6uDm8AbgByYWYAAOA12EzdAARBREVUYWRwc78O0g7ZDuEOBQPqDvMOBw9yInJvdwDCoZEhyA4AAMwOYQByAACgEilvJHduQXJyb3cAAKDFIW8kd25BcnJvdwAAoJUhcSV1aWxpYnJpdW0AAKBuKWUAZQBBoKUiciJyb3cAAKClIW8AdwBuAGEAcgByAG8A9wAQA2UAcgAAAUxS+Q4AD2UkZnRBcnJvdwAAoJYh6SRnaHRBcnJvdwCglyFpAGyg0gNvAG4ApWPpIW5nbmFjAHIAAOA12LDcaSJsZGUAaGFtAGwAO4DcANxAgAREYmNkZWZvc3YALQ8xDzUPNw89D3IPdg97D4AP4SFzaACgqyJhAHIAAKDrKnkAEmThIXNobKCpIgCg5ioAAWVyQQ9DDwCgwSKAAWJ0eQBJD00Paw9hAHIAAKAWIGmgFiDjIWFsAAJCTFNUWA9cD18PZg9hAHIAAKAjIukhbmV8YGUkcGFyYXRvcgAAoFgnaSJsZGUAAKBAItQkaGluU3BhY2UAoAogcgAA4DXYGd1wAGYAAOA12E3dYwByAADgNdix3GQiYXNoAACgqiKAAmNlZm9zAI4PkQ+VD5kPng/pIXJjdGHkIWdlAKDAInIAAOA12BrdcABmAADgNdhO3WMAcgAA4DXYstwAAmZpb3OqD64Prw+0D3IAAOA12BvdnmNwAGYAAOA12E/dYwByAADgNdiz3IAEQUlVYWNmb3N1AMgPyw/OD9EP2A/gD+QP6Q/uD2MAeQAvZGMAeQAHZGMAeQAuZGMAdQB0AGUAO4DdAN1AAAFpedwP3w9yAGMAdmErZHIAAOA12BzdcABmAADgNdhQ3WMAcgAA4DXYtNxtAGwAeGEABEhhY2RlZm9z/g8BEAUQDRAQEB0QIBAkEGMAeQAWZGMidXRlAHlhAAFheQkQDBDyIW9ufWEXZG8AdAB7YfIBFRAAABwQbwBXAGkAZAB0AOgAVAhhAJZjcgAAoCghcABmAACgJCFjAHIAAOA12LXc4QtCEEkQTRAAAGcQbRByEAAAAAAAAAAAeRCKEJcQ8hD9EAAAGxEhETIROREAAD4RYwB1AHQAZQA7gOEA4UByImV2ZQADYYCiPiJFZGl1eQBWEFkQWxBgEGUQAOA+IjMDAKA/InIAYwA7gOIA4kB0AGUAO4C0ALRAMGRsAGkAZwA7gOYA5kByoGEgAOA12B7dcgBhAHYAZQA7gOAA4EAAAWVwfBCGEAABZnCAEIQQ8yF5bQCgNSHoAIMQaABhALFjAAFhcI0QWwAAAWNskRCTEHIAAWFnAACgPypkApwQAAAAALEQAKInImFkc3ajEKcQqRCuEG4AZAAAoFUqAKBcKmwib3BlAACgWCoAoFoqAKMgImVsbXJzersQvRDAEN0Q5RDtEACgpCllAACgICJzAGQAYaAhImEEzhDQENIQ1BDWENgQ2hDcEACgqCkAoKkpAKCqKQCgqykAoKwpAKCtKQCgrikAoK8pdAB2oB8iYgBkoL4iAKCdKQABcHTpEOwQaAAAoCIixWDhIXJyAKB8IwABZ3D1EPgQbwBuAAVhZgAA4DXYUt0Ao0giRWFlaW9wBxEJEQ0RDxESERQRAKBwKuMhaXIAoG8qAKBKImQAAKBLInMAJ2DyIW94ZaBIIvEADhFpAG4AZwA7gOUA5UCAAWN0eQAmESoRKxFyAADgNdi23CpgbQBwAGWgSCLxAPgBaQBsAGQAZQA7gOMA40BtAGwAO4DkAORAAAFjaUERRxFvAG4AaQBuAPQA6AFuAHQAAKARKgAITmFiY2RlZmlrbG5vcHJzdWQRaBGXEZ8RpxGrEdIR1hErEjASexKKEn0RThNbE3oTbwB0AACg7SoAAWNybBGJEWsAAAJjZXBzdBF4EX0RghHvIW5nAKBMInAjc2lsb24A9mNyImltZQAAoDUgaQBtAGWgPSJxAACgzSJ2AY0RkRFlAGUAAKC9ImUAZABnoAUjZQAAoAUjcgBrAHSgtSPiIXJrAKC2IwABb3mjEaYRbgDnAHcRMWTxIXVvAKAeIIACY21wcnQAtBG5Eb4RwRHFEeEhdXPloDUi5ABwInR5dgAAoLApcwDpAH0RbgBvAPUA6gCAAWFodwDLEcwRzhGyYwCgNiHlIWVuAKBsInIAAOA12B/dZwCAA2Nvc3R1dncA4xHyEQUSEhIhEiYSKRKAAWFpdQDpEesR7xHwAKMFcgBjAACg7yVwAACgwyKAAWRwdAD4EfwRABJvAHQAAKAAKuwhdXMAoAEqaSJtZXMAAKACKnECCxIAAAAADxLjIXVwAKAGKmEAcgAAoAUm8iNpYW5nbGUAAWR1GhIeEu8hd24AoL0lcAAAoLMlcCJsdXMAAKAEKmUA5QBCD+UAkg9hInJvdwAAoA0pgAFha28ANhJoEncSAAFjbjoSZRJrAIABbHN0AEESRxJNEm8jemVuZ2UAAKDrKXEAdQBhAHIA5QBcBPIjaWFuZ2xlgKG0JWRscgBYElwSYBLvIXduAKC+JeUhZnQAoMIlaSJnaHQAAKC4JWsAAKAjJLEBbRIAAHUSsgFxEgAAcxIAoJIlAKCRJTQAAKCTJWMAawAAoIglAAFlb38ShxJx4D0A5SD1IWl2AOBhIuUgdAAAoBAjAAJwdHd4kRKVEpsSnxJmAADgNdhT3XSgpSJvAG0AAKClIvQhaWUAoMgiAAZESFVWYmRobXB0dXayEsES0RLgEvcS+xIKExoTHxMjEygTNxMAAkxSbHK5ErsSvRK/EgCgVyUAoFQlAKBWJQCgUyUAolAlRFVkdckSyxLNEs8SAKBmJQCgaSUAoGQlAKBnJQACTFJsctgS2hLcEt4SAKBdJQCgWiUAoFwlAKBZJQCjUSVITFJobHLrEu0S7xLxEvMS9RIAoGwlAKBjJQCgYCUAoGslAKBiJQCgXyVvAHgAAKDJKQACTFJscgITBBMGEwgTAKBVJQCgUiUAoBAlAKAMJQCiACVEVWR1EhMUExYTGBMAoGUlAKBoJQCgLCUAoDQlaSJudXMAAKCfIuwhdXMAoJ4iaSJtZXMAAKCgIgACTFJsci8TMRMzEzUTAKBbJQCgWCUAoBglAKAUJQCjAiVITFJobHJCE0QTRhNIE0oTTBMAoGolAKBhJQCgXiUAoDwlAKAkJQCgHCUAAWV2UhNVE3YA5QD5AGIAYQByADuApgCmQAACY2Vpb2ITZhNqE24TcgAA4DXYt9xtAGkAAKBPIG0A5aA9IogRbAAAoVwAYmh0E3YTAKDFKfMhdWIAoMgnbAF+E4QTbABloCIgdAAAoCIgcAAAoU4iRWWJE4sTAKCuKvGgTyI8BeEMqRMAAN8TABQDFB8UAAAjFDQUAAAAAIUUAAAAAI0UAAAAANcU4xT3FPsUAACIFQAAlhWAAWNwcgCuE7ET1RP1IXRlB2GAoikiYWJjZHMAuxO/E8QTzhPSE24AZAAAoEQqciJjdXAAAKBJKgABYXXIE8sTcAAAoEsqcAAAoEcqbwB0AACgQCoA4CkiAP4AAWVv2RPcE3QAAKBBIO4ABAUAAmFlaXXlE+8T9RP4E/AB6hMAAO0TcwAAoE0qbwBuAA1hZABpAGwAO4DnAOdAcgBjAAlhcABzAHOgTCptAACgUCpvAHQAC2GAAWRtbgAIFA0UEhRpAGwAO4C4ALhAcCJ0eXYAAKCyKXQAAIGiADtlGBQZFKJAcgBkAG8A9ABiAXIAAOA12CDdgAFjZWkAKBQqFDIUeQBHZGMAawBtoBMn4SFyawCgEyfHY3IAAKPLJUVjZWZtcz8UQRRHFHcUfBSAFACgwykAocYCZWxGFEkUcQAAoFciZQBhAlAUAAAAAGAUciJyb3cAAAFsclYUWhTlIWZ0AKC6IWkiZ2h0AACguyGAAlJTYWNkAGgUaRRrFG8UcxSuYACgyCRzAHQAAKCbIukhcmMAoJoi4SFzaACgnSJuImludAAAoBAqaQBkAACg7yrjIWlyAKDCKfUhYnN1oGMmaQB0AACgYybsApMUmhS2FAAAwxRvAG4AZaA6APGgVCKrAG0CnxQAAAAAoxRhAHSgLABAYAChASJmbKcUqRTuABMNZQAAAW14rhSyFOUhbnQAoAEiZQDzANIB5wG6FAAAwBRkoEUibwB0AACgbSpuAPQAzAGAAWZyeQDIFMsUzhQA4DXYVN1vAOQA1wEAgakAO3MeAdMUcgAAoBchAAFhb9oU3hRyAHIAAKC1IXMAcwAAoBcnAAFjdeYU6hRyAADgNdi43AABYnDuFPIUZaDPKgCg0SploNAqAKDSKuQhb3QAoO8igANkZWxwcnZ3AAYVEBUbFSEVRBVlFYQV4SFycgABbHIMFQ4VAKA4KQCgNSlwAhYVAAAAABkVcgAAoN4iYwAAoN8i4SFycnCgtiEAoD0pgKIqImJjZG9zACsVMBU6FT4VQRVyImNhcAAAoEgqAAFhdTQVNxVwAACgRipwAACgSipvAHQAAKCNInIAAKBFKgDgKiIA/gACYWxydksVURVuFXMVcgByAG2gtyEAoDwpeQCAAWV2dwBYFWUVaRVxAHACXxUAAAAAYxVyAGUA4wAXFXUA4wAZFWUAZQAAoM4iZSJkZ2UAAKDPImUAbgA7gKQApEBlI2Fycm93AAABbHJ7FX8V5SFmdACgtiFpImdodAAAoLchZQDkAG0VAAFjaYsVkRVvAG4AaQBuAPQAkwFuAHQAAKAxImwiY3R5AACgLSOACUFIYWJjZGVmaGlqbG9yc3R1d3oAuBW7Fb8V1RXgFegV+RUKFhUWHxZUFlcWZRbFFtsW7xb7FgUXChdyAPIAtAJhAHIAAKBlKQACZ2xyc8YVyhXOFdAV5yFlcgCgICDlIXRoAKA4IfIA9QxoAHagECAAoKMiawHZFd4VYSJyb3cAAKAPKWEA4wBfAgABYXnkFecV8iFvbg9hNGQAoUYhYW/tFfQVAAFnciEC8RVyAACgyiF0InNlcQAAoHcqgAFnbG0A/xUCFgUWO4CwALBAdABhALRjcCJ0eXYAAKCxKQABaXIOFhIW8yFodACgfykA4DXYId1hAHIAAAFschsWHRYAoMMhAKDCIYACYWVnc3YAKBauAjYWOhY+Fm0AAKHEIm9zLhY0Fm4AZABzoMQi9SFpdACgZiZhIm1tYQDdY2kAbgAAoPIiAKH3AGlvQxZRFmQAZQAAgfcAO29KFksW90BuI3RpbWVzAACgxyJuAPgAUBZjAHkAUmRjAG8CXhYAAAAAYhZyAG4AAKAeI28AcAAAoA0jgAJscHR1dwBuFnEWdRaSFp4W7CFhciRgZgAA4DXYVd0AotkCZW1wc30WhBaJFo0WcQBkoFAibwB0AACgUSJpIm51cwAAoDgi7CF1cwCgFCLxInVhcmUAoKEiYgBsAGUAYgBhAHIAdwBlAGQAZwDlANcAbgCAAWFkaAClFqoWtBZyAHIAbwD3APUMbwB3AG4AYQByAHIAbwB3APMA8xVhI3Jwb29uAAABbHK8FsAWZQBmAPQAHBZpAGcAaAD0AB4WYgHJFs8WawBhAHIAbwD3AJILbwLUFgAAAADYFnIAbgAAoB8jbwBwAACgDCOAAWNvdADhFukW7BYAAXJ55RboFgDgNdi53FVkbAAAoPYp8iFvaxFhAAFkcvMW9xZvAHQAAKDxImkA5qC/JVsSAAFhaP8WAhdyAPIANQNhAPIA1wvhIm5nbGUAoKYpAAFjaQ4XEBd5AF9k5yJyYXJyAKD/JwAJRGFjZGVmZ2xtbm9wcXJzdHV4MRc4F0YXWxcyBF4XaRd5F40XrBe0F78X2RcVGCEYLRg1GEAYAAFEbzUXgRZvAPQA+BUAAWNzPBdCF3UAdABlADuA6QDpQPQhZXIAoG4qAAJhaW95TRdQF1YXWhfyIW9uG2FyAGOgViI7gOoA6kDsIW9uAKBVIk1kbwB0ABdhAAFEcmIXZhdvAHQAAKBSIgDgNdgi3XKhmipuF3QXYQB2AGUAO4DoAOhAZKCWKm8AdAAAoJgqgKGZKmlscwCAF4UXhxfuInRlcnMAoOcjAKATIWSglSpvAHQAAKCXKoABYXBzAJMXlheiF2MAcgATYXQAeQBzogUinxcAAAAAoRdlAHQAAKAFInAAMaADIDMBqRerFwCgBCAAoAUgAAFnc7AXsRdLYXAAAKACIAABZ3C4F7sXbwBuABlhZgAA4DXYVt2AAWFscwDFF8sXzxdyAHOg1SJsAACg4yl1AHMAAKBxKmkAAKG1A2x21RfYF28AbgC1Y/VjAAJjc3V24BfoF/0XEBgAAWlv5BdWF3IAYwAAoFYiaQLuFwAAAADwF+0ADQThIW50AAFnbPUX+Rd0AHIAAKCWKuUhc3MAoJUqgAFhZWkAAxgGGAoYbABzAD1gcwB0AACgXyJ2AESgYSJEAACgeCrwImFyc2wAoOUpAAFEYRkYHRhvAHQAAKBTInIAcgAAoHEpgAFjZGkAJxgqGO0XcgAAoC8hbwD0AIwCAAFhaDEYMhi3YzuA8ADwQAABbXI5GD0YbAA7gOsA60BvAACgrCCAAWNpcABGGEgYSxhsACFgcwD0ACwEAAFlb08YVxhjAHQAYQB0AGkAbwDuABoEbgBlAG4AdABpAGEAbADlADME4Ql1GAAAgRgAAIMYiBgAAAAAoRilGAAAqhgAALsYvhjRGAAA1xgnGWwAbABpAG4AZwBkAG8AdABzAGUA8QBlF3kARGRtImFsZQAAoEAmgAFpbHIAjRiRGJ0Y7CFpZwCgA/tpApcYAAAAAJoYZwAAoAD7aQBnAACgBPsA4DXYI93sIWlnAKAB++whaWcA4GYAagCAAWFsdACvGLIYthh0AACgbSZpAGcAAKAC+24AcwAAoLElbwBmAJJh8AHCGAAAxhhmAADgNdhX3QABYWvJGMwYbADsAGsEdqDUIgCg2SphI3J0aW50AACgDSoAAWFv2hgiGQABY3PeGB8ZsQPnGP0YBRkSGRUZAAAdGbID7xjyGPQY9xj5GAAA+xg7gL0AvUAAoFMhO4C8ALxAAKBVIQCgWSEAoFshswEBGQAAAxkAoFQhAKBWIbQCCxkOGQAAAAAQGTuAvgC+QACgVyEAoFwhNQAAoFghtgEZGQAAGxkAoFohAKBdITgAAKBeIWwAAKBEIHcAbgAAoCIjYwByAADgNdi73IAIRWFiY2RlZmdpamxub3JzdHYARhlKGVoZXhlmGWkZkhmWGZkZnRmgGa0ZxhnLGc8Z4BkjGmygZyIAoIwqgAFjbXAAUBlTGVgZ9SF0ZfVhbQBhAOSgswM6FgCghipyImV2ZQAfYQABaXliGWUZcgBjAB1hM2RvAHQAIWGAoWUibHFzAMYEcBl6GfGhZSLOBAAAdhlsAGEAbgD0AN8EgKF+KmNkbACBGYQZjBljAACgqSpvAHQAb6CAKmyggioAoIQqZeDbIgD+cwAAoJQqcgAA4DXYJN3noGsirATtIWVsAKA3IWMAeQBTZIChdyJFYWoApxmpGasZAKCSKgCgpSoAoKQqAAJFYWVztBm2Gb0ZwhkAoGkicABwoIoq8iFveACgiipxoIgq8aCIKrUZaQBtAACg5yJwAGYAAOA12FjdYQB2AOUAYwIAAWNp0xnWGXIAAKAKIW0AAKFzImVs3BneGQCgjioAoJAqAIM+ADtjZGxxco0E6xn0GfgZ/BkBGgABY2nvGfEZAKCnKnIAAKB6Km8AdAAAoNci0CFhcgCglSl1ImVzdAAAoHwqgAJhZGVscwAKGvQZFhrVBCAa8AEPGgAAFBpwAHIAbwD4AFkZcgAAoHgpcQAAAWxxxAQbGmwAZQBzAPMASRlpAO0A5AQAAWVuJxouGnIjdG5lcXEAAOBpIgD+xQAsGgAFQWFiY2Vma29zeUAaQxpmGmoabRqDGocalhrCGtMacgDyAMwCAAJpbG1yShpOGlAaVBpyAHMA8ABxD2YAvWBpAGwA9AASBQABZHJYGlsaYwB5AEpkAKGUIWN3YBpkGmkAcgAAoEgpAKCtIWEAcgAAoA8h6SFyYyVhgAFhbHIAcxp7Gn8a8iF0c3WgZSZpAHQAAKBlJuwhaXAAoCYg4yFvbgCguSJyAADgNdgl3XMAAAFld4wakRphInJvdwAAoCUpYSJyb3cAAKAmKYACYW1vcHIAnxqjGqcauhq+GnIAcgAAoP8h9CFodACgOyJrAAABbHKsGrMaZSRmdGFycm93AACgqSHpJGdodGFycm93AKCqIWYAAOA12Fnd4iFhcgCgFSCAAWNsdADIGswa0BpyAADgNdi93GEAcwDoAGka8iFvaydhAAFicNca2xr1IWxsAKBDIOghZW4AoBAg4Qr2GgAA/RoAAAgbExsaGwAAIRs7GwAAAAA+G2IbmRuVG6sbAACyG80b0htjAHUAdABlADuA7QDtQAChYyBpeQEbBhtyAGMAO4DuAO5AOGQAAWN4CxsNG3kANWRjAGwAO4ChAKFAAAFmcssCFhsA4DXYJt1yAGEAdgBlADuA7ADsQIChSCFpbm8AJxsyGzYbAAFpbisbLxtuAHQAAKAMKnQAAKAtIuYhaW4AoNwpdABhAACgKSHsIWlnM2GAAWFvcABDG1sbXhuAAWNndABJG0sbWRtyACthgAFlbHAAcQVRG1UbaQBuAOUAyAVhAHIA9AByBWgAMWFmAACgtyJlAGQAtWEAoggiY2ZvdGkbbRt1G3kb4SFyZQCgBSFpAG4AdKAeImkAZQAAoN0pZABvAPQAWxsAoisiY2VscIEbhRuPG5QbYQBsAACguiIAAWdyiRuNG2UAcgDzACMQ4wCCG2EicmhrAACgFyryIW9kAKA8KgACY2dwdJ8boRukG6gbeQBRZG8AbgAvYWYAAOA12FrdYQC5Y3UAZQBzAHQAO4C/AL9AAAFjabUbuRtyAADgNdi+3G4AAKIIIkVkc3bCG8QbyBvQAwCg+SJvAHQAAKD1Inag9CIAoPMiaaBiIOwhZGUpYesB1hsAANkbYwB5AFZkbAA7gO8A70AAA2NmbW9zdeYb7hvyG/Ub+hsFHAABaXnqG+0bcgBjADVhOWRyAADgNdgn3eEhdGg3YnAAZgAA4DXYW93jAf8bAAADHHIAAOA12L/c8iFjeVhk6yFjeVRkAARhY2ZnaGpvcxUcGhwiHCYcKhwtHDAcNRzwIXBhdqC6A/BjAAFleR4cIRzkIWlsN2E6ZHIAAOA12CjdciJlZW4AOGFjAHkARWRjAHkAXGRwAGYAAOA12FzdYwByAADgNdjA3IALQUJFSGFiY2RlZmdoamxtbm9wcnN0dXYAXhxtHHEcdRx5HN8cBx0dHTwd3B3tHfEdAR4EHh0eLB5FHrwewx7hHgkfPR9LH4ABYXJ0AGQcZxxpHHIA8gBvB/IAxQLhIWlsAKAbKeEhcnIAoA4pZ6BmIgCgiyphAHIAAKBiKWMJjRwAAJAcAACVHAAAAAAAAAAAAACZHJwcAACmHKgcrRwAANIc9SF0ZTph7SJwdHl2AKC0KXIAYQDuAFoG4iFkYbtjZwAAoegnZGyhHKMcAKCRKeUAiwYAoIUqdQBvADuAqwCrQHIAgKOQIWJmaGxwc3QAuhy/HMIcxBzHHMoczhxmoOQhcwAAoB8pcwAAoB0p6wCyGnAAAKCrIWwAAKA5KWkAbQAAoHMpbAAAoKIhAKGrKmFl1hzaHGkAbAAAoBkpc6CtKgDgrSoA/oABYWJyAOUc6RztHHIAcgAAoAwpcgBrAACgcicAAWFr8Rz4HGMAAAFla/Yc9xx7YFtgAAFlc/wc/hwAoIspbAAAAWR1Ax0FHQCgjykAoI0pAAJhZXV5Dh0RHRodHB3yIW9uPmEAAWRpFR0YHWkAbAA8YewAowbiAPccO2QAAmNxcnMkHScdLB05HWEAAKA2KXUAbwDyoBwgqhEAAWR1MB00HeghYXIAoGcpcyJoYXIAAKBLKWgAAKCyIQCiZCJmZ3FzRB1FB5Qdnh10AIACYWhscnQATh1WHWUdbB2NHXIicm93AHSgkCFhAOkAzxxhI3Jwb29uAAABZHVeHWId7yF3bgCgvSFwAACgvCHlJGZ0YXJyb3dzAKDHIWkiZ2h0AIABYWhzAHUdex2DHXIicm93APOglCGdBmEAcgBwAG8AbwBuAPMAzgtxAHUAaQBnAGEAcgByAG8A9wBlGugkcmVldGltZXMAoMsi8aFkIk0HAACaHWwAYQBuAPQAXgcAon0qY2Rnc6YdqR2xHbcdYwAAoKgqbwB0AG+gfypyoIEqAKCDKmXg2iIA/nMAAKCTKoACYWRlZ3MAwB3GHcod1h3ZHXAAcAByAG8A+ACmHG8AdAAAoNYicQAAAWdxzx3SHXQA8gBGB2cAdADyAHQcdADyAFMHaQDtAGMHgAFpbHIA4h3mHeod8yFodACgfClvAG8A8gDKBgDgNdgp3UWgdiIAoJEqYQH1Hf4dcgAAAWR1YB35HWygvCEAoGopbABrAACghCVjAHkAWWQAomoiYWNodAweDx4VHhkecgDyAGsdbwByAG4AZQDyAGAW4SFyZACgaylyAGkAAKD6JQABaW8hHiQe5CFvdEBh9SFzdGGgsCPjIWhlAKCwIwACRWFlczMeNR48HkEeAKBoInAAcKCJKvIhb3gAoIkqcaCHKvGghyo0HmkAbQAAoOYiAARhYm5vcHR3elIeXB5fHoUelh6mHqsetB4AAW5yVh5ZHmcAAKDsJ3IAAKD9IXIA6wCwBmcAgAFsbXIAZh52Hnse5SFmdAABYXKIB2weaQBnAGgAdABhAHIAcgBvAPcAkwfhInBzdG8AoPwnaQBnAGgAdABhAHIAcgBvAPcAmgdwI2Fycm93AAABbHKNHpEeZQBmAPQAxhxpImdodAAAoKwhgAFhZmwAnB6fHqIecgAAoIUpAOA12F3ddQBzAACgLSppIm1lcwAAoDQqYQGvHrMecwB0AACgFyLhAIoOZaHKJbkeRhLuIWdlAKDKJWEAcgBsoCgAdAAAoJMpgAJhY2htdADMHs8e1R7bHt0ecgDyAJ0GbwByAG4AZQDyANYWYQByAGSgyyEAoG0pAKAOIHIAaQAAoL8iAANhY2hpcXTrHu8e1QfzHv0eBh/xIXVvAKA5IHIAAOA12MHcbQDloXIi+h4AAPweAKCNKgCgjyoAAWJ19xwBH28AcqAYIACgGiDyIW9rQmEAhDwAO2NkaGlscXJCBhcfxh0gHyQfKB8sHzEfAAFjaRsfHR8AoKYqcgAAoHkqcgBlAOUAkx3tIWVzAKDJIuEhcnIAoHYpdSJlc3QAAKB7KgABUGk1HzkfYQByAACglillocMlAgdfEnIAAAFkdUIfRx9zImhhcgAAoEop6CFhcgCgZikAAWVuTx9WH3IjdG5lcXEAAOBoIgD+xQBUHwAHRGFjZGVmaGlsbm9wc3VuH3Ifoh+rH68ftx+7H74f5h/uH/MfBwj/HwsgxCFvdACgOiIAAmNscHJ5H30fiR+eH3IAO4CvAK9AAAFldIEfgx8AoEImZaAgJ3MAZQAAoCAnc6CmIXQAbwCAoaYhZGx1AJQfmB+cH28AdwDuAHkDZQBmAPQA6gbwAOkO6yFlcgCgriUAAW95ph+qH+0hbWEAoCkqPGThIXNoAKAUIOElc3VyZWRhbmdsZQCgISJyAADgNdgq3W8AAKAnIYABY2RuAMQfyR/bH3IAbwA7gLUAtUBhoiMi0B8AANMf1x9zAPQAKxFpAHIAAKDwKm8AdAA7gLcAt0B1AHMA4qESIh4TAADjH3WgOCIAoCoqYwHqH+0fcAAAoNsq8gB+GnAAbAB1APMACAgAAWRw9x/7H+UhbHMAoKciZgAA4DXYXt0AAWN0AyAHIHIAAOA12MLc8CFvcwCgPiJsobwDECAVIPQiaW1hcACguCJhAPAAEyAADEdMUlZhYmNkZWZnaGlqbG1vcHJzdHV2dzwgRyBmIG0geSCqILgg2iDeIBEhFSEyIUMhTSFQIZwhnyHSIQAiIyKLIrEivyIUIwABZ3RAIEMgAODZIjgD9uBrItIgBwmAAWVsdABNIF8gYiBmAHQAAAFhclMgWCByInJvdwAAoM0h6SRnaHRhcnJvdwCgziEA4NgiOAP24Goi0iBfCekkZ2h0YXJyb3cAoM8hAAFEZHEgdSDhIXNoAKCvIuEhc2gAoK4igAJiY25wdACCIIYgiSCNIKIgbABhAACgByL1IXRlRGFnAADgICLSIACiSSJFaW9wlSCYIJwgniAA4HAqOANkAADgSyI4A3MASWFyAG8A+AAyCnUAcgBhoG4mbADzoG4mmwjzAa8gAACzIHAAO4CgAKBAbQBwAOXgTiI4AyoJgAJhZW91eQDBIMogzSDWINkg8AHGIAAAyCAAoEMqbwBuAEhh5CFpbEZhbgBnAGSgRyJvAHQAAOBtKjgDcAAAoEIqPWThIXNoAKATIACjYCJBYWRxc3jpIO0g+SD+IAIhDCFyAHIAAKDXIXIAAAFocvIg9SBrAACgJClvoJch9wAGD28AdAAA4FAiOAN1AGkA9gC7CAABZWkGIQohYQByAACgKCntAN8I6SFzdPOgBCLlCHIAAOA12CvdAAJFZXN0/wgcISshLiHxoXEiIiEAABMJ8aFxIgAJAAAnIWwAYQBuAPQAEwlpAO0AGQlyoG8iAKBvIoABQWFwADghOyE/IXIA8gBeIHIAcgAAoK4hYQByAACg8ipzogsiSiEAAAAAxwtkoPwiAKD6ImMAeQBaZIADQUVhZGVzdABcIV8hYiFmIWkhkyGWIXIA8gBXIADgZiI4A3IAcgAAoJohcgAAoCUggKFwImZxcwBwIYQhjiF0AAABYXJ1IXohcgByAG8A9wBlIWkAZwBoAHQAYQByAHIAbwD3AD4h8aFwImAhAACKIWwAYQBuAPQAZwlz4H0qOAMAoG4iaQDtAG0JcqBuImkA5aDqIkUJaQDkADoKAAFwdKMhpyFmAADgNdhf3YCBrAA7aW4AriGvIcchrEBuAIChCSJFZHYAtyG6Ib8hAOD5IjgDbwB0AADg9SI4A+EB1gjEIcYhAKD3IgCg9iJpAHagDCLhAagJzyHRIQCg/iIAoP0igAFhb3IA2CHsIfEhcgCAoSYiYXN0AOAh5SHpIWwAbABlAOwAywhsAADg/SrlIADgAiI4A2wiaW50AACgFCrjoYAi9yEAAPohdQDlAJsJY+CvKjgDZaCAIvEAkwkAAkFhaXQHIgoiFyIeInIA8gBsIHIAcgAAoZshY3cRIhQiAOAzKTgDAOCdITgDZyRodGFycm93AACgmyFyAGkA5aDrIr4JgANjaGltcHF1AC8iPCJHIpwhTSJQIloigKGBImNlcgA2Iv0JOSJ1AOUABgoA4DXYw9zvIXJ0bQKdIQAAAABEImEAcgDhAOEhbQBloEEi8aBEIiYKYQDyAMsIcwB1AAABYnBWIlgi5QDUCeUA3wmAAWJjcABgInMieCKAoYQiRWVzAGci7glqIgDgxSo4A2UAdABl4IIi0iBxAPGgiCJoImMAZaCBIvEA/gmAoYUiRWVzAH8iFgqCIgDgxio4A2UAdABl4IMi0iBxAPGgiSKAIgACZ2lscpIilCKaIpwi7AAMCWwAZABlADuA8QDxQOcAWwlpI2FuZ2xlAAABbHKkIqoi5SFmdGWg6iLxAEUJaSJnaHQAZaDrIvEAvgltoL0DAKEjAGVzuCK8InIAbwAAoBYhcAAAoAcggARESGFkZ2lscnMAziLSItYi2iLeIugi7SICIw8j4SFzaACgrSLhIXJyAKAEKXAAAOBNItIg4SFzaACgrCIAAWV04iLlIgDgZSLSIADgPgDSIG4iZmluAACg3imAAUFldADzIvci+iJyAHIAAKACKQDgZCLSIHLgPADSIGkAZQAA4LQi0iAAAUF0BiMKI3IAcgAAoAMp8iFpZQDgtSLSIGkAbQAA4Dwi0iCAAUFhbgAaIx4jKiNyAHIAAKDWIXIAAAFociMjJiNrAACgIylvoJYh9wD/DuUhYXIAoCcpUxJqFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVCMAAF4jaSN/I4IjjSOeI8AUAAAAAKYjwCMAANoj3yMAAO8jHiQvJD8kRCQAAWNzVyNsFHUAdABlADuA8wDzQAABaXlhI2cjcgBjoJoiO4D0APRAPmSAAmFiaW9zAHEjdCN3I3EBeiNzAOgAdhTsIWFjUWF2AACgOCrvIWxkAKC8KewhaWdTYQABY3KFI4kjaQByAACgvykA4DXYLN1vA5QjAAAAAJYjAACcI24A22JhAHYAZQA7gPIA8kAAoMEpAAFibaEjjAphAHIAAKC1KQACYWNpdKwjryO6I70jcgDyAFkUAAFpcrMjtiNyAACgvinvIXNzAKC7KW4A5QDZCgCgwCmAAWFlaQDFI8gjyyNjAHIATWFnAGEAyWOAAWNkbgDRI9Qj1iPyIW9uv2MAoLYpdQDzAHgBcABmAADgNdhg3YABYWVsAOQj5yPrI3IAAKC3KXIAcAAAoLkpdQDzAHwBAKMoImFkaW9zdvkj/CMPJBMkFiQbJHIA8gBeFIChXSplZm0AAyQJJAwkcgBvoDQhZgAAoDQhO4CqAKpAO4C6ALpA5yFvZgCgtiJyAACgVipsIm9wZQAAoFcqAKBbKoABY2xvACMkJSQrJPIACCRhAHMAaAA7gPgA+EBsAACgmCJpAGwBMyQ4JGQAZQA7gPUA9UBlAHMAYaCXInMAAKA2Km0AbAA7gPYA9kDiIWFyAKA9I+EKXiQAAHokAAB8JJQkAACYJKkkAAAAALUkEQsAAPAkAAAAAAQleiUAAIMlcgCAoSUiYXN0AGUkbyQBCwCBtgA7bGokayS2QGwAZQDsABgDaQJ1JAAAAAB4JG0AAKDzKgCg/Sp5AD9kcgCAAmNpbXB0AIUkiCSLJJkSjyRuAHQAJWBvAGQALmBpAGwAAKAwIOUhbmsAoDEgcgAA4DXYLd2AAWltbwCdJKAkpCR2oMYD1WNtAGEA9AD+B24AZQAAoA4m9KHAA64kAAC0JGMjaGZvcmsAAKDUItZjAAFhdbgkxCRuAAABY2u9JMIkawBooA8hAKAOIfYAaRpzAACkKwBhYmNkZW1zdNMkIRPXJNsk4STjJOck6yTjIWlyAKAjKmkAcgAAoCIqAAFvdYsW3yQAoCUqAKByKm4AO4CxALFAaQBtAACgJip3AG8AAKAnKoABaXB1APUk+iT+JO4idGludACgFSpmAADgNdhh3W4AZAA7gKMAo0CApHoiRWFjZWlub3N1ABMlFSUYJRslTCVRJVklSSV1JQCgsypwAACgtyp1AOUAPwtjoK8qgKJ6ImFjZW5zACclLSU0JTYlSSVwAHAAcgBvAPgAFyV1AHIAbAB5AGUA8QA/C/EAOAuAAWFlcwA8JUElRSXwInByb3gAoLkqcQBxAACgtSppAG0AAKDoImkA7QBEC20AZQDzoDIgIguAAUVhcwBDJVclRSXwAEAlgAFkZnAATwtfJXElgAFhbHMAZSVpJW0l7CFhcgCgLiPpIW5lAKASI/UhcmYAoBMjdKAdIu8AWQvyIWVsAKCwIgABY2l9JYElcgAA4DXYxdzIY24iY3NwAACgCCAAA2Zpb3BzdZElKxuVJZolnyWkJXIAAOA12C7dcABmAADgNdhi3XIiaW1lAACgVyBjAHIAAOA12MbcgAFhZW8AqiW6JcAldAAAAWVpryW2JXIAbgBpAG8AbgDzABkFbgB0AACgFipzAHQAZaA/APEACRj0AG0LgApBQkhhYmNkZWZoaWxtbm9wcnN0dXgA4yXyJfYl+iVpJpAmpia9JtUm5ib4JlonaCdxJ3UnnietJ7EnyCfiJ+cngAFhcnQA6SXsJe4lcgDyAJkM8gD6AuEhaWwAoBwpYQByAPIA3BVhAHIAAKBkKYADY2RlbnFydAAGJhAmEyYYJiYmKyZaJgABZXUKJg0mAOA9IjEDdABlAFVhaQDjACAN7SJwdHl2AKCzKWcAgKHpJ2RlbAAgJiImJCYAoJIpAKClKeUA9wt1AG8AO4C7ALtAcgAApZIhYWJjZmhscHN0dz0mQCZFJkcmSiZMJk4mUSZVJlgmcAAAoHUpZqDlIXMAAKAgKQCgMylzAACgHinrALka8ACVHmwAAKBFKWkAbQAAoHQpbAAAoKMhAKCdIQABYWleJmImaQBsAACgGilvAG6gNiJhAGwA8wB2C4ABYWJyAG8mciZ2JnIA8gAvEnIAawAAoHMnAAFha3omgSZjAAABZWt/JoAmfWBdYAABZXOFJocmAKCMKWwAAAFkdYwmjiYAoI4pAKCQKQACYWV1eZcmmiajJqUm8iFvbllhAAFkaZ4moSZpAGwAV2HsAA8M4gCAJkBkAAJjbHFzrSawJrUmuiZhAACgNylkImhhcgAAoGkpdQBvAPKgHSCjAWgAAKCzIYABYWNnAMMm0iaUC2wAgKEcIWlwcwDLJs4migxuAOUAoAxhAHIA9ADaC3QAAKCtJYABaWxyANsm3ybjJvMhaHQAoH0pbwBvAPIANgwA4DXYL90AAWFv6ib1JnIAAAFkde8m8SYAoMEhbKDAIQCgbCl2oMED8WOAAWducwD+Jk4nUCdoAHQAAANhaGxyc3QKJxInISc1Jz0nRydyInJvdwB0oJIhYQDpAFYmYSNycG9vbgAAAWR1GiceJ28AdwDuAPAmcAAAoMAh5SFmdAABYWgnJy0ncgByAG8AdwDzAAkMYQByAHAAbwBvAG4A8wATBGklZ2h0YXJyb3dzAACgySFxAHUAaQBnAGEAcgByAG8A9wBZJugkcmVldGltZXMAoMwiZwDaYmkAbgBnAGQAbwB0AHMAZQDxABwYgAFhaG0AYCdjJ2YncgDyAAkMYQDyABMEAKAPIG8idXN0AGGgsSPjIWhlAKCxI+0haWQAoO4qAAJhYnB0fCeGJ4knmScAAW5ygCeDJ2cAAKDtJ3IAAKD+IXIA6wAcDIABYWZsAI8nkieVJ3IAAKCGKQDgNdhj3XUAcwAAoC4qaSJtZXMAAKA1KgABYXCiJ6gncgBnoCkAdAAAoJQp7yJsaW50AKASKmEAcgDyADwnAAJhY2hxuCe8J6EMwCfxIXVvAKA6IHIAAOA12MfcAAFidYAmxCdvAPKgGSCoAYABaGlyAM4n0ifWJ3IAZQDlAE0n7SFlcwCgyiJpAIChuSVlZmwAXAxjEt4n9CFyaQCgzinsInVoYXIAoGgpAKAeIWENBSgJKA0oSyhVKIYoAACLKLAoAAAAAOMo5ygAABApJCkxKW0pcSmHKaYpAACYKgAAAACxKmMidXRlAFthcQB1AO8ABR+ApHsiRWFjZWlucHN5ABwoHignKCooLygyKEEoRihJKACgtCrwASMoAAAlKACguCpvAG4AYWF1AOUAgw1koLAqaQBsAF9hcgBjAF1hgAFFYXMAOCg6KD0oAKC2KnAAAKC6KmkAbQAAoOki7yJsaW50AKATKmkA7QCIDUFkbwB0AGKixSKRFgAAAABTKACgZiqAA0FhY21zdHgAYChkKG8ocyh1KHkogihyAHIAAKDYIXIAAAFocmkoayjrAJAab6CYIfcAzAd0ADuApwCnQGkAO2D3IWFyAKApKW0AAAFpbn4ozQBuAHUA8wDOAHQAAKA2J3IA7+A12DDdIxkAAmFjb3mRKJUonSisKHIAcAAAoG8mAAFoeZkonChjAHkASWRIZHIAdABtAqUoAAAAAKgoaQDkAFsPYQByAGEA7ABsJDuArQCtQAABZ22zKLsobQBhAAChwwNmdroouijCY4CjPCJkZWdsbnByAMgozCjPKNMo1yjaKN4obwB0AACgairxoEMiCw5FoJ4qAKCgKkWgnSoAoJ8qZQAAoEYi7CF1cwCgJCrhIXJyAKByKWEAcgDyAPwMAAJhZWl07Sj8KAEpCCkAAWxz8Sj4KGwAcwBlAHQAbQDpAH8oaABwAACgMyrwImFyc2wAoOQpAAFkbFoPBSllAACgIyNloKoqc6CsKgDgrCoA/oABZmxwABUpGCkfKfQhY3lMZGKgLwBhoMQpcgAAoD8jZgAA4DXYZN1hAAABZHIoKRcDZQBzAHWgYCZpAHQAAKBgJoABY3N1ADYpRilhKQABYXU6KUApcABzoJMiAOCTIgD+cABzoJQiAOCUIgD+dQAAAWJwSylWKQChjyJlcz4NUCllAHQAZaCPIvEAPw0AoZAiZXNIDVspZQB0AGWgkCLxAEkNAKGhJWFmZilbBHIAZQFrKVwEAKChJWEAcgDyAAMNAAJjZW10dyl7KX8pgilyAADgNdjI3HQAbQDuAM4AaQDsAAYpYQByAOYAVw0AAWFyiimOKXIA5qAGJhESAAFhbpIpoylpImdodAAAAWVwmSmgKXAAcwBpAGwAbwDuANkXaADpAKAkcwCvYIACYmNtbnAArin8KY4NJSooKgCkgiJFZGVtbnByc7wpvinCKcgpzCnUKdgp3CkAoMUqbwB0AACgvSpkoIYibwB0AACgwyr1IWx0AKDBKgABRWXQKdIpAKDLKgCgiiLsIXVzAKC/KuEhcnIAoHkpgAFlaXUA4inxKfQpdAAAoYIiZW7oKewpcQDxoIYivSllAHEA8aCKItEpbQAAoMcqAAFicPgp+ikAoNUqAKDTKmMAgKJ7ImFjZW5zAAcqDSoUKhYqRihwAHAAcgBvAPgAIyh1AHIAbAB5AGUA8QCDDfEAfA2AAWFlcwAcKiIqPShwAHAAcgBvAPgAPChxAPEAOShnAACgaiYApoMiMTIzRWRlaGxtbnBzPCo/KkIqRSpHKlIqWCpjKmcqaypzKncqO4C5ALlAO4CyALJAO4CzALNAAKDGKgABb3NLKk4qdAAAoL4qdQBiAACg2CpkoIcibwB0AACgxCpzAAABb3VdKmAqbAAAoMknYgAAoNcq4SFycgCgeyn1IWx0AKDCKgABRWVvKnEqAKDMKgCgiyLsIXVzAKDAKoABZWl1AH0qjCqPKnQAAKGDImVugyqHKnEA8aCHIkYqZQBxAPGgiyJwKm0AAKDIKgABYnCTKpUqAKDUKgCg1iqAAUFhbgCdKqEqrCpyAHIAAKDZIXIAAAFocqYqqCrrAJUab6CZIfcAxQf3IWFyAKAqKWwAaQBnADuA3wDfQOELzyrZKtwq6SrsKvEqAAD1KjQrAAAAAAAAAAAAAEwrbCsAAHErvSsAAAAAAADRK3IC1CoAAAAA2CrnIWV0AKAWI8RjcgDrAOUKgAFhZXkA4SrkKucq8iFvbmVh5CFpbGNhQmRvAPQAIg5sInJlYwAAoBUjcgAA4DXYMd0AAmVpa2/7KhIrKCsuK/IBACsAAAkrZQAAATRm6g0EK28AcgDlAOsNYQBzorgDECsAAAAAEit5AG0A0WMAAWNuFislK2sAAAFhcxsrIStwAHAAcgBvAPgAFw5pAG0AAKA8InMA8AD9DQABYXMsKyEr8AAXDnIAbgA7gP4A/kDsATgrOyswG2QA5QBnAmUAcwCAgdcAO2JkAEMrRCtJK9dAYaCgInIAAKAxKgCgMCqAAWVwcwBRK1MraSvhAAkh4qKkIlsrXysAAAAAYytvAHQAAKA2I2kAcgAAoPEqb+A12GXdcgBrAACg2irhAHgociJpbWUAAKA0IIABYWlwAHYreSu3K2QA5QC+DYADYWRlbXBzdACFK6MrmiunK6wrsCuzK24iZ2xlAACitSVkbHFykCuUK5ornCvvIXduAKC/JeUhZnRloMMl8QACBwCgXCJpImdodABloLkl8QBdDG8AdAAAoOwlaSJudXMAAKA6KuwhdXMAoDkqYgAAoM0p6SFtZQCgOyrlInppdW0AoOIjgAFjaHQAwivKK80rAAFyecYrySsA4DXYydxGZGMAeQBbZPIhb2tnYQABaW/UK9creAD0ANERaCJlYWQAAAFsct4r5ytlAGYAdABhAHIAcgBvAPcAXQbpJGdodGFycm93AKCgIQAJQUhhYmNkZmdobG1vcHJzdHV3CiwNLBEsHSwnLDEsQCxLLFIsYix6LIQsjyzLLOgs7Sz/LAotcgDyAAkDYQByAACgYykAAWNyFSwbLHUAdABlADuA+gD6QPIACQ1yAOMBIywAACUseQBeZHYAZQBtYQABaXkrLDAscgBjADuA+wD7QENkgAFhYmgANyw6LD0scgDyANEO7CFhY3FhYQDyAOAOAAFpckQsSCzzIWh0AKB+KQDgNdgy3XIAYQB2AGUAO4D5APlAYQFWLF8scgAAAWxyWixcLACgvyEAoL4hbABrAACggCUAAWN0Zix2LG8CbCwAAAAAcyxyAG4AZaAcI3IAAKAcI28AcAAAoA8jcgBpAACg+CUAAWFsfiyBLGMAcgBrYTuAqACoQAABZ3CILIssbwBuAHNhZgAA4DXYZt0AA2FkaGxzdZksniynLLgsuyzFLHIAcgBvAPcACQ1vAHcAbgBhAHIAcgBvAPcA2A5hI3Jwb29uAAABbHKvLLMsZQBmAPQAWyxpAGcAaAD0AF0sdQDzAKYOaQAAocUDaGzBLMIs0mNvAG4AxWPwI2Fycm93cwCgyCGAAWNpdADRLOEs5CxvAtcsAAAAAN4scgBuAGWgHSNyAACgHSNvAHAAAKAOI24AZwBvYXIAaQAAoPklYwByAADgNdjK3IABZGlyAPMs9yz6LG8AdAAAoPAi7CFkZWlhaQBmoLUlAKC0JQABYW0DLQYtcgDyAMosbAA7gPwA/EDhIm5nbGUAoKcpgAdBQkRhY2RlZmxub3Byc3oAJy0qLTAtNC2bLZ0toS2/LcMtxy3TLdgt3C3gLfwtcgDyABADYQByAHag6CoAoOkqYQBzAOgA/gIAAW5yOC08LechcnQAoJwpgANla25wcnN0AJkpSC1NLVQtXi1iLYItYQBwAHAA4QAaHG8AdABoAGkAbgDnAKEXgAFoaXIAoSmzJFotbwBwAPQAdCVooJUh7wD4JgABaXVmLWotZwBtAOEAuygAAWJwbi14LXMjZXRuZXEAceCKIgD+AODLKgD+cyNldG5lcQBx4IsiAP4A4MwqAP4AAWhyhi2KLWUAdADhABIraSNhbmdsZQAAAWxyki2WLeUhZnQAoLIiaSJnaHQAAKCzInkAMmThIXNoAKCiIoABZWxyAKcttC24LWKiKCKuLQAAAACyLWEAcgAAoLsicQAAoFoi7CFpcACg7iIAAWJ0vC1eD2EA8gBfD3IAAOA12DPddAByAOkAlS1zAHUAAAFicM0t0C0A4IIi0iAA4IMi0iBwAGYAAOA12GfdcgBvAPAAWQt0AHIA6QCaLQABY3XkLegtcgAA4DXYy9wAAWJw7C30LW4AAAFFZXUt8S0A4IoiAP5uAAABRWV/LfktAOCLIgD+6SJnemFnAKCaKYADY2Vmb3BycwANLhAuJS4pLiMuLi40LukhcmN1YQABZGkULiEuAAFiZxguHC5hAHIAAKBfKmUAcaAnIgCgWSLlIXJwAKAYIXIAAOA12DTdcABmAADgNdho3WWgQCJhAHQA6ABqD2MAcgAA4DXYzNzjCuQRUC4AAFQuAABYLmIuAAAAAGMubS5wLnQuAAAAAIguki4AAJouJxIqEnQAcgDpAB0ScgAA4DXYNd0AAUFhWy5eLnIA8gDnAnIA8gCTB75jAAFBYWYuaS5yAPIA4AJyAPIAjAdhAPAAeh5pAHMAAKD7IoABZHB0APgReS6DLgABZmx9LoAuAOA12GnddQDzAP8RaQBtAOUABBIAAUFhiy6OLnIA8gDuAnIA8gCaBwABY3GVLgoScgAA4DXYzdwAAXB0nS6hLmwAdQDzACUScgDpACASAARhY2VmaW9zdbEuvC7ELsguzC7PLtQu2S5jAAABdXm2LrsudABlADuA/QD9QE9kAAFpecAuwy5yAGMAd2FLZG4AO4ClAKVAcgAA4DXYNt1jAHkAV2RwAGYAAOA12GrdYwByAADgNdjO3AABY23dLt8ueQBOZGwAO4D/AP9AAAVhY2RlZmhpb3N38y73Lv8uAi8MLxAvEy8YLx0vIi9jInV0ZQB6YQABYXn7Lv4u8iFvbn5hN2RvAHQAfGEAAWV0Bi8KL3QAcgDmAB8QYQC2Y3IAAOA12DfdYwB5ADZk5yJyYXJyAKDdIXAAZgAA4DXYa91jAHIAAOA12M/cAAFqbiYvKC8AoA0gagAAoAwg"), Jc;
(function(e) {
	e[e.VALUE_LENGTH = 49152] = "VALUE_LENGTH", e[e.FLAG13 = 8192] = "FLAG13", e[e.BRANCH_LENGTH = 8064] = "BRANCH_LENGTH", e[e.JUMP_TABLE = 127] = "JUMP_TABLE";
})(Jc ||= {});
// node_modules/entities/dist/esm/decode.js
var Yc;
(function(e) {
	e[e.NUM = 35] = "NUM", e[e.SEMI = 59] = "SEMI", e[e.EQUALS = 61] = "EQUALS", e[e.ZERO = 48] = "ZERO", e[e.NINE = 57] = "NINE", e[e.LOWER_A = 97] = "LOWER_A", e[e.LOWER_F = 102] = "LOWER_F", e[e.LOWER_X = 120] = "LOWER_X", e[e.LOWER_Z = 122] = "LOWER_Z", e[e.UPPER_A = 65] = "UPPER_A", e[e.UPPER_F = 70] = "UPPER_F", e[e.UPPER_Z = 90] = "UPPER_Z";
})(Yc ||= {});
var Xc = 32;
function Zc(e) {
	return e >= Yc.ZERO && e <= Yc.NINE;
}
function Qc(e) {
	return e >= Yc.UPPER_A && e <= Yc.UPPER_F || e >= Yc.LOWER_A && e <= Yc.LOWER_F;
}
function $c(e) {
	return e >= Yc.UPPER_A && e <= Yc.UPPER_Z || e >= Yc.LOWER_A && e <= Yc.LOWER_Z || Zc(e);
}
function el(e) {
	return e === Yc.EQUALS || $c(e);
}
var tl;
(function(e) {
	e[e.EntityStart = 0] = "EntityStart", e[e.NumericStart = 1] = "NumericStart", e[e.NumericDecimal = 2] = "NumericDecimal", e[e.NumericHex = 3] = "NumericHex", e[e.NamedEntity = 4] = "NamedEntity";
})(tl ||= {});
var nl;
(function(e) {
	e[e.Legacy = 0] = "Legacy", e[e.Strict = 1] = "Strict", e[e.Attribute = 2] = "Attribute";
})(nl ||= {});
var rl = class {
	constructor(e, t, n) {
		this.decodeTree = e, this.emitCodePoint = t, this.errors = n, this.state = tl.EntityStart, this.consumed = 1, this.result = 0, this.treeIndex = 0, this.excess = 1, this.decodeMode = nl.Strict, this.runConsumed = 0;
	}
	startEntity(e) {
		this.decodeMode = e, this.state = tl.EntityStart, this.result = 0, this.treeIndex = 0, this.excess = 1, this.consumed = 1, this.runConsumed = 0;
	}
	write(e, t) {
		switch (this.state) {
			case tl.EntityStart: return e.charCodeAt(t) === Yc.NUM ? (this.state = tl.NumericStart, this.consumed += 1, this.stateNumericStart(e, t + 1)) : (this.state = tl.NamedEntity, this.stateNamedEntity(e, t));
			case tl.NumericStart: return this.stateNumericStart(e, t);
			case tl.NumericDecimal: return this.stateNumericDecimal(e, t);
			case tl.NumericHex: return this.stateNumericHex(e, t);
			case tl.NamedEntity: return this.stateNamedEntity(e, t);
		}
	}
	stateNumericStart(e, t) {
		return t >= e.length ? -1 : (e.charCodeAt(t) | Xc) === Yc.LOWER_X ? (this.state = tl.NumericHex, this.consumed += 1, this.stateNumericHex(e, t + 1)) : (this.state = tl.NumericDecimal, this.stateNumericDecimal(e, t));
	}
	stateNumericHex(e, t) {
		for (; t < e.length;) {
			let n = e.charCodeAt(t);
			if (Zc(n) || Qc(n)) {
				let e = n <= Yc.NINE ? n - Yc.ZERO : (n | Xc) - Yc.LOWER_A + 10;
				this.result = this.result * 16 + e, this.consumed++, t++;
			} else return this.emitNumericEntity(n, 3);
		}
		return -1;
	}
	stateNumericDecimal(e, t) {
		for (; t < e.length;) {
			let n = e.charCodeAt(t);
			if (Zc(n)) this.result = this.result * 10 + (n - Yc.ZERO), this.consumed++, t++;
			else return this.emitNumericEntity(n, 2);
		}
		return -1;
	}
	emitNumericEntity(e, t) {
		var n;
		if (this.consumed <= t) return (n = this.errors) == null || n.absenceOfDigitsInNumericCharacterReference(this.consumed), 0;
		if (e === Yc.SEMI) this.consumed += 1;
		else if (this.decodeMode === nl.Strict) return 0;
		return this.emitCodePoint(Gc(this.result), this.consumed), this.errors && (e !== Yc.SEMI && this.errors.missingSemicolonAfterCharacterReference(), this.errors.validateNumericCharacterReference(this.result)), this.consumed;
	}
	stateNamedEntity(e, t) {
		let { decodeTree: n } = this, r = n[this.treeIndex], i = (r & Jc.VALUE_LENGTH) >> 14;
		for (; t < e.length;) {
			if (i === 0 && (r & Jc.FLAG13) !== 0) {
				let a = (r & Jc.BRANCH_LENGTH) >> 7;
				if (this.runConsumed === 0) {
					let n = r & Jc.JUMP_TABLE;
					if (e.charCodeAt(t) !== n) return this.result === 0 ? 0 : this.emitNotTerminatedNamedEntity();
					t++, this.excess++, this.runConsumed++;
				}
				for (; this.runConsumed < a;) {
					if (t >= e.length) return -1;
					let r = this.runConsumed - 1, i = n[this.treeIndex + 1 + (r >> 1)], a = r % 2 == 0 ? i & 255 : i >> 8 & 255;
					if (e.charCodeAt(t) !== a) return this.runConsumed = 0, this.result === 0 ? 0 : this.emitNotTerminatedNamedEntity();
					t++, this.excess++, this.runConsumed++;
				}
				this.runConsumed = 0, this.treeIndex += 1 + (a >> 1), r = n[this.treeIndex], i = (r & Jc.VALUE_LENGTH) >> 14;
			}
			if (t >= e.length) break;
			let a = e.charCodeAt(t);
			if (a === Yc.SEMI && i !== 0 && (r & Jc.FLAG13) !== 0) return this.emitNamedEntityData(this.treeIndex, i, this.consumed + this.excess);
			if (this.treeIndex = al(n, r, this.treeIndex + Math.max(1, i), a), this.treeIndex < 0) return this.result === 0 || this.decodeMode === nl.Attribute && (i === 0 || el(a)) ? 0 : this.emitNotTerminatedNamedEntity();
			if (r = n[this.treeIndex], i = (r & Jc.VALUE_LENGTH) >> 14, i !== 0) {
				if (a === Yc.SEMI) return this.emitNamedEntityData(this.treeIndex, i, this.consumed + this.excess);
				this.decodeMode !== nl.Strict && (r & Jc.FLAG13) === 0 && (this.result = this.treeIndex, this.consumed += this.excess, this.excess = 0);
			}
			t++, this.excess++;
		}
		return -1;
	}
	emitNotTerminatedNamedEntity() {
		var e;
		let { result: t, decodeTree: n } = this, r = (n[t] & Jc.VALUE_LENGTH) >> 14;
		return this.emitNamedEntityData(t, r, this.consumed), (e = this.errors) == null || e.missingSemicolonAfterCharacterReference(), this.consumed;
	}
	emitNamedEntityData(e, t, n) {
		let { decodeTree: r } = this;
		return this.emitCodePoint(t === 1 ? r[e] & ~(Jc.VALUE_LENGTH | Jc.FLAG13) : r[e + 1], n), t === 3 && this.emitCodePoint(r[e + 2], n), n;
	}
	end() {
		var e;
		switch (this.state) {
			case tl.NamedEntity: return this.result !== 0 && (this.decodeMode !== nl.Attribute || this.result === this.treeIndex) ? this.emitNotTerminatedNamedEntity() : 0;
			case tl.NumericDecimal: return this.emitNumericEntity(0, 2);
			case tl.NumericHex: return this.emitNumericEntity(0, 3);
			case tl.NumericStart: return (e = this.errors) == null || e.absenceOfDigitsInNumericCharacterReference(this.consumed), 0;
			case tl.EntityStart: return 0;
		}
	}
};
function il(e) {
	let t = "", n = new rl(e, (e) => t += Wc(e));
	return function(e, r) {
		let i = 0, a = 0;
		for (; (a = e.indexOf("&", a)) >= 0;) {
			t += e.slice(i, a), n.startEntity(r);
			let o = n.write(e, a + 1);
			if (o < 0) {
				i = a + n.end();
				break;
			}
			i = a + o, a = o === 0 ? i + 1 : i;
		}
		let o = t + e.slice(i);
		return t = "", o;
	};
}
function al(e, t, n, r) {
	let i = (t & Jc.BRANCH_LENGTH) >> 7, a = t & Jc.JUMP_TABLE;
	if (i === 0) return a !== 0 && r === a ? n : -1;
	if (a) {
		let t = r - a;
		return t < 0 || t >= i ? -1 : e[n + t] - 1;
	}
	let o = i + 1 >> 1, s = 0, c = i - 1;
	for (; s <= c;) {
		let t = s + c >>> 1, i = e[n + (t >> 1)] >> (t & 1) * 8 & 255;
		if (i < r) s = t + 1;
		else if (i > r) c = t - 1;
		else return e[n + o + t];
	}
	return -1;
}
var ol = /* #__PURE__ */ il(qc);
function sl(e, t = nl.Legacy) {
	return ol(e, t);
}
// svelte/features/rich-text/markdownTree.ts
function cl(e, t = !1) {
	let n = 0, r = 0, i, a = /* @__PURE__ */ new WeakMap(), o = {
		...za,
		createElement(...e) {
			if (++n > 4096) throw Error("Rich parser node limit");
			let t = za.createElement(...e);
			return i?.tag === e[0] && a.set(t, i.metadata), t;
		}
	}, s = xo.getFragmentParser(null, {
		treeAdapter: o,
		scriptingEnabled: !1
	}), c = () => s.tokenizer.flushCurrentCharacterToken();
	function l(e, t, n = [], r) {
		c(), i = r ? {
			tag: e,
			metadata: r
		} : void 0;
		let a = {
			type: t ? $r.START_TAG : $r.END_TAG,
			tagName: e,
			tagID: Qi(e),
			selfClosing: !1,
			ackSelfClosing: !1,
			attrs: n,
			location: null
		};
		t ? s.onStartTag(a) : s.onEndTag(a), i = void 0;
	}
	function u(e) {
		c();
		for (let t of e.split(/(\s+)/)) {
			if (!t) continue;
			let e = /^\s+$/.test(t), n = {
				type: e ? $r.WHITESPACE_CHARACTER : $r.CHARACTER,
				chars: t,
				location: null
			};
			e ? s.onWhitespaceCharacter(n) : s.onCharacter(n);
		}
	}
	let d = (e) => Object.entries(e).filter((e) => e[1] !== void 0).map(([e, t]) => ({
		name: e,
		value: String(t)
	})), f = (e, t, n = [], r) => {
		l(e, !0, n, r), p(t), l(e, !1);
	};
	function p(e, n = !1) {
		if (++r > 48) throw Error("Rich token depth limit");
		for (let r of e) {
			let e = r;
			switch (e.type) {
				case "space":
				case "def": break;
				case "html":
					s.tokenizer.write(e.text, !1), c();
					break;
				case "heading":
					f(`h${e.depth}`, e.tokens);
					break;
				case "paragraph":
					f("p", e.tokens);
					break;
				case "blockquote":
					f("blockquote", e.tokens);
					break;
				case "strong":
				case "em":
				case "del":
					f(e.type, e.tokens);
					break;
				case "escape":
					u(sl(e.text));
					break;
				case "text":
					"tokens" in e && e.tokens ? n ? f("p", e.tokens) : p(e.tokens) : u(sl(e.text));
					break;
				case "codespan":
					l("code", !0), u(sl(e.text)), l("code", !1);
					break;
				case "code":
					l("pre", !0), l("code", !0, [], { language: e.lang?.split(/\s+/)[0] }), u(e.text + "\n"), l("code", !1), l("pre", !1);
					break;
				case "br":
					l("br", !0);
					break;
				case "hr":
					l("hr", !0);
					break;
				case "image":
					t && l("img", !0, d({
						src: sl(e.href),
						alt: sl(e.text),
						title: e.title ? sl(e.title) : void 0
					}));
					break;
				case "link":
					f("a", e.tokens, d({
						href: sl(e.href),
						title: e.title ? sl(e.title) : void 0
					}));
					break;
				case "list":
					l(e.ordered ? "ol" : "ul", !0, e.ordered && e.start !== 1 ? d({ start: e.start }) : []);
					for (let t of e.items) l("li", !0, [], t.task ? { task: !!t.checked } : void 0), p(t.tokens, e.loose), l("li", !1);
					l(e.ordered ? "ol" : "ul", !1);
					break;
				case "list_item":
					p(e.tokens, e.loose);
					break;
				case "table":
					if (l("table", !0), l("thead", !0), l("tr", !0), e.header.forEach((t, n) => f("th", t.tokens, d({ align: e.align[n] || void 0 }))), l("tr", !1), l("thead", !1), e.rows.length) {
						l("tbody", !0);
						for (let t of e.rows) l("tr", !0), t.forEach((t, n) => f("td", t.tokens, d({ align: e.align[n] || void 0 }))), l("tr", !1);
						l("tbody", !1);
					}
					l("table", !1);
					break;
				default: u(r.raw);
			}
		}
		r--;
	}
	return p(Lr.lex(e, {
		gfm: !0,
		breaks: !0
	})), s.tokenizer.write("", !0), {
		fragment: s.getFragment(),
		metadata: a
	};
}
// svelte/features/rich-text/links.ts
var ll = new Set("http: https: ftp: ftps: mailto: tel: callto: sms: cid: xmpp:".split(" "));
function ul(e, t) {
	let n = sl(e).trim();
	try {
		let e = new URL(n, t);
		return ll.has(e.protocol) ? n : null;
	} catch {
		return null;
	}
}
function dl(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e.room.files || []) t.set(n.id, n);
	for (let n of [...e.room.messages, ...e.room.origins || []]) for (let e of n.files || []) t.has(e.id) || t.set(e.id, e);
	return [...t.values()];
}
function fl(e, t, n) {
	let r = new URL(n.pageUrl), i = new URL(e, r);
	if (i.origin !== r.origin) return null;
	let a = /^\/api\/books\/([0-9a-f]+)\/files\/([0-9a-f]+)$/.exec(i.pathname);
	if (!a || a[1] !== n.room.id) return null;
	let o = dl(n), s = o.find((e) => e.id === a[2]), c = s?.name || (t && !/^https?:\/\//.test(t) ? t : "arquivo"), l = s ? o.filter((e) => e.name === s.name).sort((e, t) => t.ts - e.ts) : [];
	return {
		kind: "file",
		href: `${i.pathname}${i.search}${i.hash}`,
		file: {
			roomId: a[1],
			id: a[2],
			name: c,
			type: s?.type
		},
		attachment: s,
		version: l.length > 1 ? l.length - l.findIndex((e) => e.id === a[2]) : void 0
	};
}
function pl(e, t, n, r = /* @__PURE__ */ new Map()) {
	let i = ul(e, n.pageUrl);
	if (i === null) return null;
	if (i.startsWith("#") && r.has(i.slice(1))) return {
		kind: "url",
		href: `#${r.get(i.slice(1))}`,
		external: !1
	};
	let a = /^#m(\d+)$/.exec(i);
	if (a && Number.isSafeInteger(Number(a[1])) && Number(a[1]) >= 0) return {
		kind: "message",
		id: Number(a[1]),
		href: i
	};
	let o = /^#e([\w-]+)$/.exec(i);
	if (o) return {
		kind: "thread",
		id: o[1],
		href: i
	};
	if (/^#doc[\w:-]*$/.test(i)) return {
		kind: "document",
		id: i.split(":")[1],
		href: i
	};
	let s = fl(i, t, n);
	if (s) return s;
	let c = /^https:\/\/github\.com\/([\w.-]+)\/([\w.-]+)(?:\/(pull|issues|commit)\/(\w+))?\/?(?:[?#].*)?$/.exec(i);
	if (c && !/^(orgs|settings|features|marketplace|sponsors|apps|topics)$/.test(c[1])) {
		let e = c[3] === "commit" ? `${c[1]}/${c[2]}@${c[4].slice(0, 7)}` : c[3] ? `${c[1]}/${c[2]} #${c[4]}` : `${c[1]}/${c[2]}`;
		return {
			kind: "github",
			href: i,
			label: !t || t === i || /^https?:\/\//.test(t) ? e : ""
		};
	}
	return {
		kind: "url",
		href: i,
		external: !0
	};
}
var ml = (e) => e.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9._-]/g, "");
function hl(e, t) {
	let n = ml(e);
	return n === "vibe" || n === "ai" ? "ai" : t.room.members.find((e) => {
		let r = e.split("@")[0];
		return [
			t.room.names?.[e]?.split(/\s+/)[0] || t.names?.[e]?.split(/\s+/)[0] || "",
			r.split(/[._+-]/)[0],
			r
		].map(ml).filter(Boolean).includes(n);
	}) || null;
}
// svelte/features/rich-text/project.ts
var gl = /https?:\/\/[^\s<]+[^\s<.,;:!?)"'\]]/g;
function _l(e) {
	return e.map((e) => e.kind === "text" || e.kind === "mention" ? e.text : e.children.map((e) => _l([e])).join("")).join("");
}
function vl(e, t) {
	let n = [], r = 0;
	for (let i of e.matchAll(/(^|[\s(])@([\p{L}\p{N}._-]+)/gu)) {
		let a = hl(i[2], t);
		if (!a) continue;
		let o = i.index + i[1].length;
		o > r && n.push({
			kind: "text",
			text: e.slice(r, o)
		}), n.push({
			kind: "mention",
			text: `@${i[2]}`,
			who: a,
			mine: a === t.room.me
		}), r = o + i[2].length + 1;
	}
	return r < e.length && n.push({
		kind: "text",
		text: e.slice(r)
	}), n;
}
function yl(e, t) {
	let n = [], r = 0;
	for (let i of e.matchAll(gl)) {
		let a = i[0], o = i.index;
		o > r && n.push(...vl(e.slice(r, o), t));
		let s = pl(a, a, t);
		n.push(s ? {
			kind: "link",
			target: s,
			namespace: ln,
			children: [{
				kind: "text",
				text: a
			}]
		} : {
			kind: "text",
			text: a
		}), r = o + a.length;
	}
	return r < e.length && n.push(...vl(e.slice(r), t)), n;
}
var bl = {
	source: 65536,
	nodes: 2048,
	depth: 48,
	svgNodes: 128
};
function xl(e) {
	let t = 0, n = "", r = 0;
	for (; t < e.length;) {
		let i = e.indexOf("\n", t), a = i < 0 ? e.length : i, o = e.slice(t, Math.min(a, t + 256)), s = /^ {0,3}(`{3,}|~{3,})/.exec(o)?.[1];
		if (!n && a - t > 16384) return !1;
		if (s) {
			if (n) s[0] === n && s.length >= r && (n = "");
			else {
				if (s[0] === "`" && e.slice(t, a).slice(e.slice(t, a).indexOf(s) + s.length).includes("`")) {
					t = a + 1;
					continue;
				}
				n = s[0], r = s.length;
			}
		} else if (!n && a - t > 16384) return !1;
		t = a + 1;
	}
	return !0;
}
function Sl(e, t, n) {
	if (e.length > (n === "document" ? 1e5 : n === "file-preview" ? 3e5 : bl.source) || t === "markdown" && !xl(e)) return {
		text: e,
		mode: t,
		literal: !0
	};
	let r = n === "document" ? e : wn(e);
	if (t !== "markdown") return {
		text: r,
		mode: t
	};
	try {
		let e = cl(r, n === "document"), i = 0, a = 0, o = [{
			node: e.fragment,
			depth: 0
		}];
		for (; o.length;) {
			let { node: e, depth: t } = o.pop();
			if (++i > bl.nodes || t > bl.depth) throw Error("Rich tree limit");
			if ("namespaceURI" in e && e.namespaceURI === "http://www.w3.org/2000/svg" && ++a > bl.svgNodes) throw Error("SVG limit");
			if ("childNodes" in e) for (let n of e.childNodes) o.push({
				node: n,
				depth: t + 1
			});
		}
		return {
			text: r,
			mode: t,
			tree: e
		};
	} catch {
		return {
			text: e,
			mode: t,
			literal: !0
		};
	}
}
function Cl(e, t, n) {
	return wl(Sl(e, t, n.policy), n);
}
function wl(e, t) {
	let { text: n, mode: r } = e;
	if (e.literal) return [{
		kind: "text",
		text: n
	}];
	if (r !== "markdown") {
		let e = r === "human" ? yl(n, t) : vl(n, t);
		return e.length > bl.nodes ? [{
			kind: "text",
			text: n
		}] : e;
	}
	let { fragment: i, metadata: a } = e.tree, o = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new WeakMap(), c = 0, l = `vb-rich-${t.idPrefix.replace(/[^a-z0-9_-]/gi, "-")}`;
	function u(e) {
		for (let t of e.childNodes) if ("tagName" in t) {
			let e = t.attrs.find((e) => e.name === "id")?.value;
			if (e) {
				let n = `${l}-${++c}`;
				s.set(t, n), o.has(e) || o.set(e, n);
			}
			"childNodes" in t && u(t);
		}
	}
	u(i);
	let d = (e) => {
		let t = /^\s*url\(\s*["']?#([^"')\s]+)["']?\s*\)\s*$/i.exec(e);
		return t && o.has(t[1]) ? `url(#${o.get(t[1])})` : null;
	};
	function f(e, n) {
		let r = {}, i = n === "http://www.w3.org/1999/xhtml" ? un : n === "http://www.w3.org/2000/svg" ? dn : fn, a = s.get(e);
		a && (r.id = a);
		for (let a of e.attrs) {
			let s = a.name.toLowerCase(), c = a.value;
			if (!(s === "style" || s === "id" || s === "class" || s.startsWith("on") || s.startsWith("data-") || [
				"xmlns",
				"is",
				"slot",
				"name",
				"role",
				"tabindex",
				"autofocus",
				"contenteditable",
				"form",
				"formaction",
				"action",
				"method",
				"enctype",
				"for",
				"list",
				"draggable",
				"nonce",
				"integrity",
				"srcset",
				"popovertarget",
				"popover"
			].includes(s))) {
				if ([
					"aria-label",
					"aria-description",
					"aria-hidden"
				].includes(s)) r[s] = c;
				else if ([
					"aria-labelledby",
					"aria-describedby",
					"headers"
				].includes(s)) {
					let e = c.split(/\s+/).map((e) => o.get(e)).filter(Boolean).join(" ");
					e && (r[s] = e);
				} else if ([
					"href",
					"src",
					"cite",
					"poster",
					"background",
					"usemap"
				].includes(s) || a.prefix === "xlink") {
					if (e.tagName.toLowerCase() === "a") continue;
					if (c.startsWith("#") && o.has(c.slice(1))) {
						r.href = `#${o.get(c.slice(1))}`;
						continue;
					}
					let i = ul(c, t.pageUrl);
					if (!i) continue;
					if (s === "cite") {
						r.cite = i;
						continue;
					}
					if (n === "http://www.w3.org/1998/Math/MathML" && e.tagName !== "mglyph" && s === "href") {
						r.href = i;
						continue;
					}
					if (n !== "http://www.w3.org/1999/xhtml" || s === "poster" || s === "background") {
						let e = fl(i, "", t);
						e?.attachment?.type.startsWith("image/") && (r[s === "src" ? "src" : s === "poster" ? "poster" : s === "background" ? "background" : "href"] = e.href);
						continue;
					}
					s === "src" && [
						"audio",
						"video",
						"source",
						"track"
					].includes(e.tagName) && (r.src = i);
				} else if (i.has(s) && !(c.length > 1024 || /[\\]|\/\*|\*\//.test(c))) {
					if (n === "http://www.w3.org/2000/svg") {
						let e = c.match(/[-+]?(?:\d*\.)?\d+(?:e[-+]?\d+)?/gi) || [];
						if (e.length > 81 || e.some((e) => !Number.isFinite(Number(e)) || Math.abs(Number(e)) > 4096) || s === "numoctaves" && Number(c) > 4) continue;
					}
					if (mn.has(s)) {
						let e = d(c);
						e && (r[a.name] = e);
					} else if (/url\s*\(/i.test(c)) {
						let e = d(c);
						e && (r[a.name] = e);
					} else /(?:javascript\s*:|vbscript\s*:|expression\s*\(|@import|data\s*:)/i.test(c) || (s !== "attributename" || /^(?:transform|fill|stroke|color|opacity)$/i.test(c)) && (s !== "begin" && s !== "end" || /^[\d.]+(?:ms|s)?$/.test(c)) && (r[a.name] = pn.has(s) ? !0 : c);
				}
			}
		}
		return r;
	}
	function p(e, n = ln, r = !1) {
		let i = [];
		for (let s of e) {
			if (s.nodeName === "#text" && "value" in s) {
				i.push(...n === "http://www.w3.org/1999/xhtml" ? vl(s.value, t) : [{
					kind: "text",
					text: s.value
				}]);
				continue;
			}
			if (!("tagName" in s)) continue;
			let e = s.tagName.toLowerCase(), c = s.namespaceURI;
			if (cn.has(e) || c !== "http://www.w3.org/1999/xhtml" && c !== "http://www.w3.org/2000/svg" && c !== "http://www.w3.org/1998/Math/MathML") continue;
			let l = c === "http://www.w3.org/1999/xhtml" ? an : c === "http://www.w3.org/2000/svg" ? on : sn;
			if (t.policy === "document" && c === "http://www.w3.org/1999/xhtml" && e === "img") {
				let e = s.attrs.find((e) => e.name === "src")?.value, n = e === void 0 ? null : ul(e, t.pageUrl);
				if (n) {
					let e = new URL(n, t.pageUrl);
					if ((e.protocol === "http:" || e.protocol === "https:") && !e.username && !e.password) {
						let t = {
							src: e.href,
							alt: (s.attrs.find((e) => e.name === "alt")?.value ?? "").slice(0, 1e3),
							referrerpolicy: "no-referrer",
							loading: "lazy",
							decoding: "async"
						}, n = s.attrs.find((e) => e.name === "title")?.value;
						n && (t.title = n.slice(0, 1e3)), i.push({
							kind: "element",
							tag: "img",
							namespace: ln,
							attrs: t,
							children: []
						});
					}
				}
				continue;
			}
			if (!l.has(e)) {
				c === "http://www.w3.org/1999/xhtml" && i.push(...p(s.childNodes, c, r));
				continue;
			}
			let u = p(s.childNodes, c, r || e === "code" || e === "pre");
			if (e === "a") {
				let e = s.attrs.find((e) => e.name === "href")?.value, n = e === void 0 ? null : pl(e, _l(u).trim(), t, o);
				n ? i.push({
					kind: "link",
					target: n,
					children: u,
					namespace: c,
					title: s.attrs.find((e) => e.name === "title")?.value
				}) : i.push(...u);
			} else i.push({
				kind: "element",
				tag: s.tagName,
				namespace: c,
				attrs: f(s, c),
				children: u,
				...a.get(s)
			});
		}
		return i;
	}
	let m = p(i.childNodes), h = 0, g = [...m];
	for (; g.length;) {
		let e = g.pop();
		if (++h > bl.nodes) return [{
			kind: "text",
			text: n
		}];
		"children" in e && g.push(...e.children);
	}
	return m;
}
// svelte/features/rich-text/session.ts
function Tl(e) {
	return JSON.stringify([
		e.policy,
		e.room.id,
		e.room.me,
		e.pageUrl,
		e.idPrefix,
		e.room.members.map((t) => [
			t,
			e.room.names?.[t],
			e.names?.[t]
		]),
		dl(e).map((e) => [
			e.id,
			e.name,
			e.type,
			e.ts,
			e.size,
			e.author
		])
	]);
}
function El() {
	let e = !0, t, n, r, i, a, o, s;
	return {
		render(c, l, u) {
			if (!e) return [{
				kind: "text",
				text: c
			}];
			let d = c !== t || l !== n || u.policy !== r;
			d && (o = Sl(c, l, u.policy), r = u.policy, t = c, n = l);
			let f = [
				u.policy,
				u.room.id,
				u.room.me,
				u.room.members,
				u.room.names,
				u.names,
				u.room.files,
				u.room.messages,
				u.room.origins,
				u.pageUrl,
				u.idPrefix
			], p = a && f.every((e, t) => e === a[t]) ? i : Tl(u);
			return a = f, (d || !s || p !== i) && (s = wl(o, u), i = p), s;
		},
		dispose() {
			e = !1, t = void 0, n = void 0, r = void 0, i = void 0, a = void 0, o = void 0, s = void 0;
		}
	};
}
// node_modules/svelte-toolbelt/dist/utils/after-sleep.js
function Dl(e, t) {
	return setTimeout(t, e);
}
// node_modules/bits-ui/dist/bits/alert-dialog/components/alert-dialog.svelte
function Ol(e, n) {
	D(n, !0);
	let r = H(n, "open", 15, !1), i = H(n, "onOpenChange", 3, vt), o = H(n, "onOpenChangeComplete", 3, vt);
	$e.create({
		variant: st(() => "alert-dialog"),
		open: st(() => r(), (e) => {
			r(e), i()(e);
		}),
		onOpenChangeComplete: st(() => o())
	});
	var s = P(), c = a(s);
	re(c, () => n.children ?? u), B(e, s), t();
}
// node_modules/bits-ui/dist/bits/alert-dialog/components/alert-dialog-action.svelte
var kl = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"children",
	"child",
	"id",
	"ref"
]), Al = z("<button><!></button>");
function jl(e, n) {
	let r = ee();
	D(n, !0);
	let i = H(n, "id", 19, () => rt(r)), o = H(n, "ref", 15, null), c = fe(n, kl), l = ot.create({
		id: st(() => i()),
		ref: st(() => o(), (e) => o(e))
	}), d = w(() => nt(c, l.props));
	var f = P(), p = a(f), h = (e) => {
		var t = P(), r = a(t);
		re(r, () => n.child, () => ({ props: m(d) })), B(e, t);
	}, g = (e) => {
		var t = Al();
		De(t, () => ({ ...m(d) }));
		var r = s(t);
		re(r, () => n.children ?? u), S(t), B(e, t);
	};
	L(p, (e) => {
		n.child ? e(h) : e(g, -1);
	}), B(e, f), t();
}
// node_modules/bits-ui/dist/bits/alert-dialog/components/alert-dialog-cancel.svelte
var Ml = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"ref",
	"children",
	"child",
	"disabled"
]), Nl = z("<button><!></button>");
function Pl(e, n) {
	let r = ee();
	D(n, !0);
	let i = H(n, "id", 19, () => rt(r)), o = H(n, "ref", 15, null), c = H(n, "disabled", 3, !1), l = fe(n, Ml), d = At.create({
		id: st(() => i()),
		ref: st(() => o(), (e) => o(e)),
		disabled: st(() => !!c())
	}), f = w(() => nt(l, d.props));
	var p = P(), h = a(p), g = (e) => {
		var t = P(), r = a(t);
		re(r, () => n.child, () => ({ props: m(f) })), B(e, t);
	}, _ = (e) => {
		var t = Nl();
		De(t, () => ({ ...m(f) }));
		var r = s(t);
		re(r, () => n.children ?? u), S(t), B(e, t);
	};
	L(h, (e) => {
		n.child ? e(g) : e(_, -1);
	}), B(e, p), t();
}
// node_modules/bits-ui/dist/bits/alert-dialog/components/alert-dialog-content.svelte
var Fl = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"children",
	"child",
	"ref",
	"forceMount",
	"interactOutsideBehavior",
	"onCloseAutoFocus",
	"onEscapeKeydown",
	"onOpenAutoFocus",
	"onInteractOutside",
	"preventScroll",
	"preventOverflowTextSelection",
	"trapFocus",
	"restoreScrollDelay",
	"preventBodyPointerEvents"
]), Il = z("<!> <!>", 1), Ll = z("<!> <div><!></div>", 1);
function Rl(e, r) {
	let i = ee();
	D(r, !0);
	let o = H(r, "id", 19, () => rt(i)), c = H(r, "ref", 15, null), l = H(r, "forceMount", 3, !1), d = H(r, "interactOutsideBehavior", 3, "ignore"), f = H(r, "onCloseAutoFocus", 3, vt), p = H(r, "onEscapeKeydown", 3, vt), h = H(r, "onOpenAutoFocus", 3, vt), g = H(r, "onInteractOutside", 3, vt), _ = H(r, "preventScroll", 3, !0), v = H(r, "preventOverflowTextSelection", 3, !0), y = H(r, "trapFocus", 3, !0), b = H(r, "restoreScrollDelay", 3, null), x = H(r, "preventBodyPointerEvents", 3, !0), C = fe(r, Fl), T = et.create({
		id: st(() => o()),
		ref: st(() => c(), (e) => c(e))
	}), E = () => x() || !T.root.overlayNode, O = w(() => nt(C, T.props));
	var k = P(), A = a(k), j = (e) => {
		kt(e, {
			get ref() {
				return T.opts.ref;
			},
			loop: !0,
			get trapFocus() {
				return y();
			},
			get enabled() {
				return T.root.opts.open.current;
			},
			get onCloseAutoFocus() {
				return f();
			},
			onOpenAutoFocus: (e) => {
				if (h()(e), e.defaultPrevented) return;
				e.preventDefault();
				let t = T.opts.ref.current;
				Dl(0, () => {
					t?.isConnected && t.focus();
				});
			},
			focusScope: (e, t) => {
				let i = () => (t?.()).props;
				jt(e, pe(() => m(O), {
					get enabled() {
						return T.root.opts.open.current;
					},
					get ref() {
						return T.opts.ref;
					},
					onEscapeKeydown: (e) => {
						p()(e), e.defaultPrevented || T.root.handleClose();
					},
					children: (e, t) => {
						dt(e, pe(() => m(O), {
							get ref() {
								return T.opts.ref;
							},
							get enabled() {
								return T.root.opts.open.current;
							},
							get interactOutsideBehavior() {
								return d();
							},
							onInteractOutside: (e) => {
								g()(e), e.defaultPrevented || T.root.handleClose();
							},
							children: (e, t) => {
								lt(e, pe(() => m(O), {
									get preventOverflowTextSelection() {
										return v();
									},
									get ref() {
										return T.opts.ref;
									},
									get enabled() {
										return T.root.opts.open.current;
									},
									children: (e, t) => {
										var o = P(), c = a(o), l = (e) => {
											var t = Il(), o = a(t), s = (e) => {
												gt(e, {
													get preventScroll() {
														return _();
													},
													get restoreScrollDelay() {
														return b();
													},
													blockPointer: E
												});
											};
											L(o, (e) => {
												T.root.opts.open.current && e(s);
											});
											var c = n(o, 2);
											{
												let e = w(() => ({
													props: nt(m(O), i()),
													...T.snippetProps
												}));
												re(c, () => r.child, () => m(e));
											}
											B(e, t);
										}, d = (e) => {
											var t = Ll(), o = a(t);
											gt(o, {
												get preventScroll() {
													return _();
												},
												blockPointer: E
											});
											var c = n(o, 2);
											De(c, (e) => ({ ...e }), [() => nt(m(O), i())]);
											var l = s(c);
											re(l, () => r.children ?? u), S(c), B(e, t);
										};
										L(c, (e) => {
											r.child ? e(l) : e(d, -1);
										}), B(e, o);
									},
									$$slots: { default: !0 }
								}));
							},
							$$slots: { default: !0 }
						}));
					},
					$$slots: { default: !0 }
				}));
			},
			$$slots: { focusScope: !0 }
		});
	};
	L(A, (e) => {
		(T.shouldRender || l()) && e(j);
	}), B(e, k), t();
}
// svelte/lib/ui/Progress.svelte
var zl = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"value",
	"max",
	"label",
	"class"
]), Bl = z("<progress> </progress>");
function Vl(e, n) {
	D(n, !0);
	let r = H(n, "max", 3, 100), i = fe(n, zl), a = w(() => Number.isFinite(r()) && r() > 0 ? r() : 100), o = w(() => Number.isFinite(n.value) ? Math.min(m(a), Math.max(0, n.value)) : 0);
	var s = Bl();
	De(s, (e) => ({
		...i,
		max: m(a),
		value: m(o),
		"aria-label": n.label,
		class: e
	}), [() => we("tw:h-1.5 tw:w-full tw:overflow-hidden tw:rounded-full tw:border-0 tw:bg-muted tw:appearance-none tw:[&::-webkit-progress-bar]:rounded-full tw:[&::-webkit-progress-bar]:bg-muted tw:[&::-webkit-progress-value]:rounded-full tw:[&::-webkit-progress-value]:bg-primary tw:[&::-moz-progress-bar]:rounded-full tw:[&::-moz-progress-bar]:bg-primary", n.class)]);
	var l = d(s);
	c(() => U(l, `${m(o) ?? ""}/${m(a) ?? ""}`)), B(e, s), t();
}
// svelte/TaskList.svelte
var Hl = z("<!> ", 1), Ul = z("<div class=\"tw:min-w-0 tw:flex-1 tw:basis-32 tw:space-y-1\"><!> <!></div>"), Wl = z("<div role=\"group\"><!> <!> <!> <!> <!></div>"), Gl = z("<section data-vb-native=\"\" class=\"tw:m-0 tw:box-border tw:space-y-3 tw:rounded-surface tw:bg-background tw:p-3 tw:font-sans tw:text-sm tw:text-foreground\"><header class=\"tw:flex tw:items-center tw:gap-3\"><h3 class=\"tw:m-0 tw:font-sans tw:text-sm tw:font-semibold\"> </h3> <!> <!></header> <!> <!> <div class=\"tw:space-y-2\"></div> <form id=\"newTask\" class=\"tw:flex tw:items-center tw:gap-2\"><!> <!></form></section>"), Kl = z("<form class=\"tw:grid tw:grid-cols-1 tw:gap-4\"><!> <!> <div class=\"tw:flex tw:flex-wrap tw:justify-end tw:gap-2\"><!><!></div></form>"), ql = z("<!> <!>", 1);
function Jl(i, o) {
	let l = ee();
	D(o, !0);
	let p = H(o, "waits", 19, () => []), h = w(() => o.room.epics.find((e) => e.id === o.thread) ?? (o.thread === "main" && o.room.roomTasks?.length ? {
		id: "main",
		tasks: o.room.roomTasks,
		flags: []
	} : null)), g = (e) => p().some((t) => t.book_id === o.room.id && t.ref === `t${e.id}`), v = w(() => (m(h)?.tasks ?? []).map((e, t) => ({
		task: e,
		index: t
	})).sort((e, t) => (e.task.done ? 2 : +!g(e.task)) - (t.task.done ? 2 : +!g(t.task)) || e.index - t.index).map((e) => e.task)), y = w(() => m(h)?.tasks.filter((e) => e.done).length ?? 0), b = w(() => [{
		value: "",
		label: o.vb.t("sem dono")
	}, ...(o.room.members ?? []).map((e) => ({
		value: e,
		label: e === o.room.me ? o.vb.t("você") : o.vb.name(e)
	}))]), x = e(null), C = e(""), T = e(null), E = e(""), O = e(""), k = e(null), N = e(!1), P = e(""), F = e(null), te = w(() => m(h)?.tasks.find((e) => e.id === m(k)));
	_(() => {
		m(x) && m(T) && (m(T).focus(), m(T).select());
	}), _(() => {
		m(k) && !m(te) && ae(), m(x) && !m(h)?.tasks.some((e) => e.id === m(x)) && f(x, null);
	});
	function ne(e) {
		try {
			if (o.send(e)) return f(O, ""), !0;
		} catch {}
		return f(O, o.vb.t("Não deu pra enviar agora. Tente de novo."), !0), !1;
	}
	function re(e, t = !0) {
		m(x) !== e.id || t && m(C).trim() && m(C) !== e.title && !ne({
			t: "task.rename",
			id: e.id,
			title: m(C)
		}) || f(x, null);
	}
	function ie(e) {
		f(k, e.id, !0), f(P, e.due ?? "", !0), f(N, !0);
	}
	function ae() {
		f(N, !1), f(k, null), f(P, "");
	}
	var z = ql(), oe = a(z), ce = (e) => {
		var t = Gl(), i = s(t), l = s(i), u = d(l, !0), p = n(l, 2);
		ct(p, {
			children: (e, t) => {
				r();
				var n = I();
				c(() => U(n, `${m(y) ?? ""}/${m(h).tasks.length ?? ""}`)), B(e, n);
			},
			$$slots: { default: !0 }
		});
		var _ = n(p, 2);
		{
			let e = w(() => o.vb.t("Tarefas")), t = w(() => Math.max(1, m(h).tasks.length)), n = w(() => `${m(y)}/${m(h).tasks.length}`);
			Vl(_, {
				get label() {
					return m(e);
				},
				get value() {
					return m(y);
				},
				get max() {
					return m(t);
				},
				get "aria-valuetext"() {
					return m(n);
				},
				class: "tw:ml-auto tw:max-w-24"
			});
		}
		S(i);
		var D = n(i, 2), k = (e) => {
			{
				let t = w(() => `@vibe: ${m(h).flags.join(" · ")}`);
				ct(e, {
					variant: "warning",
					get title() {
						return m(t);
					},
					children: (e, t) => {
						var r = Hl(), i = a(r);
						Dt(i, {
							name: "warning",
							class: "tw:size-3"
						});
						var o = n(i, 1, !0);
						c((e) => U(o, e), [() => m(h).flags.join(" · ")]), B(e, r);
					},
					$$slots: { default: !0 }
				});
			}
		};
		L(D, (e) => {
			m(h).flags?.length && e(k);
		});
		var ee = n(D, 2), P = (e) => {
			ft(e, {
				get title() {
					return m(O);
				},
				compact: !0
			});
		};
		L(ee, (e) => {
			m(O) && !m(N) && e(P);
		});
		var F = n(ee, 2);
		R(F, 21, () => m(v), (e) => e.id, (e, t) => {
			var i = Wl(), l = s(i);
			{
				let e = w(() => o.vb.t("Feita"));
				it(l, {
					get checked() {
						return m(t).done;
					},
					get "aria-label"() {
						return m(e);
					},
					onclick: (e) => {
						e.preventDefault(), ne({
							t: "task.toggle",
							id: m(t).id
						});
					}
				});
			}
			var u = n(l, 2), d = (e) => {
				{
					let n = w(() => o.vb.t("Clique para editar"));
					Ce(e, {
						get "data-task-edit"() {
							return m(t).id;
						},
						get "aria-label"() {
							return m(n);
						},
						class: "tw:min-w-32 tw:flex-1",
						onblur: () => re(m(t)),
						onkeydown: (e) => {
							e.key === "Enter" && (e.preventDefault(), re(m(t))), e.key === "Escape" && (e.preventDefault(), re(m(t), !1));
						},
						get ref() {
							return m(T);
						},
						set ref(e) {
							f(T, e, !0);
						},
						get value() {
							return m(C);
						},
						set value(e) {
							f(C, e, !0);
						}
					});
				}
			}, p = (e) => {
				var i = Ul(), l = s(i);
				{
					let e = w(() => we("tw:h-auto tw:w-full tw:justify-start tw:whitespace-normal tw:rounded-sm tw:p-0 tw:text-left tw:hover:bg-transparent tw:hover:underline", m(t).done && "tw:text-muted-foreground tw:line-through")), n = w(() => o.vb.t("Clique para editar"));
					V(l, {
						get "data-task-title"() {
							return m(t).id;
						},
						variant: "ghost",
						get class() {
							return m(e);
						},
						get title() {
							return m(n);
						},
						onclick: () => {
							f(x, m(t).id, !0), f(C, m(t).title, !0);
						},
						children: (e, n) => {
							r();
							var i = I();
							c(() => U(i, m(t).title)), B(e, i);
						},
						$$slots: { default: !0 }
					});
				}
				var u = n(l, 2), d = (e) => {
					{
						let r = w(() => `@vibe: ${m(t).flags.join(" · ")}`);
						ct(e, {
							variant: "warning",
							get title() {
								return m(r);
							},
							children: (e, r) => {
								var i = Hl(), o = a(i);
								Dt(o, {
									name: "warning",
									class: "tw:size-3"
								});
								var s = n(o, 1, !0);
								c((e) => U(s, e), [() => m(t).flags.join(" · ")]), B(e, i);
							},
							$$slots: { default: !0 }
						});
					}
				};
				L(u, (e) => {
					m(t).flags?.length && e(d);
				}), S(i), B(e, i);
			};
			L(u, (e) => {
				m(x) === m(t).id ? e(d) : e(p, -1);
			});
			var h = n(u, 2);
			{
				let e = w(() => o.vb.t("Responsável")), n = w(() => m(t).owner ?? "");
				Ze(h, {
					get "data-owner"() {
						return m(t).id;
					},
					get "aria-label"() {
						return m(e);
					},
					get value() {
						return m(n);
					},
					get items() {
						return m(b);
					},
					class: "tw:w-auto tw:max-w-40",
					onValueChange: (e) => ne({
						t: "task.assign",
						id: m(t).id,
						owner: e
					})
				});
			}
			var _ = n(h, 2);
			{
				let e = w(() => o.vb.t("Prazo")), r = w(() => m(t).due ? `${o.vb.t("Prazo")}: ${m(t).due}` : o.vb.t("Prazo"));
				V(_, {
					get "data-due"() {
						return m(t).id;
					},
					variant: "ghost",
					size: "sm",
					get title() {
						return m(e);
					},
					get "aria-label"() {
						return m(r);
					},
					onclick: () => ie(m(t)),
					children: (e, r) => {
						var i = Hl(), o = a(i);
						Dt(o, {
							name: "calendar",
							class: "tw:size-3.5"
						});
						var s = n(o, 1, !0);
						c(() => U(s, m(t).due ?? "")), B(e, i);
					},
					$$slots: { default: !0 }
				});
			}
			var v = n(_, 2);
			{
				let e = w(() => o.vb.t("Apagar task"));
				mt(v, {
					get "data-tdel"() {
						return m(t).id;
					},
					get label() {
						return m(e);
					},
					icon: "close",
					class: "tw:size-8",
					onclick: () => ne({
						t: "task.del",
						id: m(t).id
					})
				});
			}
			S(i), c((e) => {
				A(i, "data-task", m(t).id), A(i, "aria-label", m(t).title), M(i, 1, e);
			}, [() => j(we("tw:flex tw:flex-wrap tw:items-center tw:gap-2 tw:rounded-control tw:border tw:p-2", m(t).done ? "tw:border-transparent tw:bg-muted/40 tw:text-muted-foreground" : "tw:border-border tw:bg-card tw:text-card-foreground", !m(t).done && m(t).owner === o.room.me && "tw:border-ring/50", g(m(t)) && "tw:bg-warning/10"))]), B(e, i);
		}), S(F);
		var te = n(F, 2), ae = s(te);
		{
			let e = w(() => o.vb.t("nova task")), t = w(() => o.vb.t("nova task"));
			Ce(ae, {
				get "aria-label"() {
					return m(e);
				},
				get placeholder() {
					return m(t);
				},
				get value() {
					return m(E);
				},
				set value(e) {
					f(E, e, !0);
				}
			});
		}
		var z = n(ae, 2);
		{
			let e = w(() => o.vb.t("Nova tarefa"));
			mt(z, {
				type: "submit",
				get label() {
					return m(e);
				},
				icon: "plus",
				variant: "outline"
			});
		}
		S(te), S(t), c((e, n) => {
			A(t, "aria-label", e), U(u, n);
		}, [() => o.vb.t("Tarefas"), () => o.vb.t("Tarefas")]), se("submit", te, (e) => {
			e.preventDefault(), m(E).trim() && ne({
				t: "task.add",
				epic: o.thread,
				title: m(E)
			}) && f(E, "");
		}), B(e, t);
	};
	L(oe, (e) => {
		m(h) && e(ce);
	});
	var le = n(oe, 2), ue = (e) => {
		{
			let t = w(() => o.vb.t("Prazo")), i = w(() => o.vb.t("Prazo (ex.: sex, qua 23h, 06/11). Vazio tira o prazo:")), a = w(() => o.vb.t("Fechar"));
			Ot(e, {
				get title() {
					return m(t);
				},
				get description() {
					return m(i);
				},
				get closeLabel() {
					return m(a);
				},
				initialFocus: () => m(F),
				onOpenChange: (e) => {
					e || ae();
				},
				get open() {
					return m(N);
				},
				set open(e) {
					f(N, e, !0);
				},
				children: (e, t) => {
					var i = Kl(), a = s(i);
					{
						let e = (e, t = u) => {
							Ce(e, pe(t, {
								get ref() {
									return m(F);
								},
								set ref(e) {
									f(F, e, !0);
								},
								get value() {
									return m(P);
								},
								set value(e) {
									f(P, e, !0);
								}
							}));
						}, t = w(() => `${l}-due`), n = w(() => o.vb.t("Prazo"));
						yt(a, {
							get id() {
								return m(t);
							},
							get label() {
								return m(n);
							},
							children: e,
							$$slots: { default: !0 }
						});
					}
					var d = n(a, 2), p = (e) => {
						ft(e, {
							get title() {
								return m(O);
							},
							compact: !0
						});
					};
					L(d, (e) => {
						m(O) && e(p);
					});
					var h = n(d, 2), g = s(h);
					V(g, {
						variant: "outline",
						onclick: ae,
						children: (e, t) => {
							r();
							var n = I();
							c((e) => U(n, e), [() => o.vb.t("Cancelar")]), B(e, n);
						},
						$$slots: { default: !0 }
					});
					var _ = n(g);
					V(_, {
						type: "submit",
						children: (e, t) => {
							r();
							var n = I();
							c((e) => U(n, e), [() => o.vb.t("Salvar")]), B(e, n);
						},
						$$slots: { default: !0 }
					}), S(h), S(i), se("submit", i, (e) => {
						e.preventDefault(), m(te) && ne({
							t: "task.assign",
							id: m(te).id,
							due: m(P)
						}) && ae();
					}), B(e, i);
				},
				$$slots: { default: !0 }
			});
		}
	};
	L(le, (e) => {
		m(te) && e(ue);
	}), B(i, z), t();
}
// svelte/Tasks.svelte
var Yl = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy"
]);
function Xl(e, n) {
	D(n, !0);
	let r = fe(n, Yl);
	var i = P(), o = a(i);
	F(o, () => JSON.stringify([n.room.id, n.thread]), (e) => {
		Jl(e, pe(() => r));
	}), B(e, i), t();
}
// svelte/features/documents/mermaid.ts
var Zl = "https://cdn.jsdelivr.net/npm/pele@1.10.0/dist/pele.global.js", Ql = "sha384-zwGYZK+/MVuyfItMWj4MERk2omW/eWEDLBEwuzSJd289OrEFwsdwQe+EqwJacKaA";
function $l(e, t = setTimeout, n = clearTimeout) {
	let r;
	return () => {
		if (r) return r.promise;
		let i, a, o = new Promise((e, t) => {
			i = e, a = t;
		}), s = { promise: o };
		r = s;
		let c = !1, l, u = () => {}, d = () => {
			c = !0, l !== void 0 && n(l), l = void 0, u();
		}, f = () => {
			c || r !== s || (d(), r = void 0, a(Error("Diagram renderer unavailable")));
		}, p = (e) => {
			if (c || r !== s) return;
			if (typeof e != "object" || !e || !("render" in e) || typeof e.render != "function") {
				f();
				return;
			}
			let t = e.render;
			d(), i({ render: (n, r) => Reflect.apply(t, e, [n, r]) });
		};
		try {
			u = e(p, f), c ? u() : l = t(f, 3e4);
		} catch {
			f();
		}
		return o;
	};
}
var eu = $l((e, t) => {
	let n = document.createElement("script");
	return n.src = Zl, n.crossOrigin = "anonymous", n.integrity = Ql, n.onload = () => e(Reflect.get(window, "pele")), n.onerror = t, document.head.append(n), () => {
		n.onload = null, n.onerror = null, n.remove();
	};
}), tu = /* @__PURE__ */ new Set([
	"animate",
	"animatecolor",
	"animatemotion",
	"animatetransform",
	"set",
	"image",
	"feimage",
	"foreignobject",
	"script",
	"style"
]), nu = /* @__PURE__ */ new Set([
	"fill",
	"stroke",
	"color",
	"stop-color",
	"flood-color",
	"lighting-color",
	"font-family",
	"font-size",
	"font-weight",
	"font-style",
	"text-decoration"
]);
function ru(e, t) {
	if (e.length > 65536) throw Error("Diagram output limit");
	function n(e) {
		return e.flatMap((e) => e.kind === "text" ? [e] : e.kind === "element" && e.namespace !== "http://www.w3.org/2000/svg" && e.tag === "p" ? n(e.children) : e.kind !== "element" || e.namespace !== "http://www.w3.org/2000/svg" || tu.has(e.tag.toLowerCase()) ? [] : [{
			...e,
			attrs: Object.fromEntries(Object.entries(e.attrs).filter(([e]) => !nu.has(e.toLowerCase()) && !/^(?:href|src|on|data-)/i.test(e))),
			children: n(e.children)
		}]);
	}
	let r = n(Cl(e.trim(), "markdown", {
		...t,
		policy: "document"
	})).filter((e) => e.kind !== "text" || e.text.trim());
	if (r.length !== 1 || r[0].kind !== "element" || r[0].tag !== "svg") throw Error("Diagram output unavailable");
	return r;
}
async function iu(e, t, n, r = eu) {
	if (e.length > 16e3) throw Error("Diagram source limit");
	let i = (await r()).render(e, {
		idPrefix: `diagram-${t.idPrefix.replace(/[^a-z0-9_-]/gi, "-")}-`,
		fontFamily: "sans-serif",
		fontSize: 14,
		maxWidth: Math.max(160, Math.min(1600, n)),
		links: !1,
		images: !1
	});
	if (typeof i != "object" || !i || !("svg" in i) || typeof i.svg != "string") throw Error("Diagram output unavailable");
	return ru(i.svg, t);
}
// svelte/features/documents/Mermaid.svelte
var au = z("<p role=\"status\" class=\"tw:m-0 tw:text-muted-foreground\"> </p>"), ou = z("<p role=\"status\" class=\"tw:m-0 tw:text-muted-foreground\"> </p> <pre class=\"tw:overflow-auto tw:whitespace-pre-wrap tw:font-mono tw:text-xs\"> </pre>", 1), su = z("<figure class=\"tw:my-3 tw:overflow-x-auto tw:rounded-control tw:border tw:border-border tw:bg-card tw:p-4 tw:text-foreground tw:[&amp;_svg]:max-w-full tw:[&amp;_svg]:h-auto tw:[&amp;_path]:stroke-current tw:[&amp;_path]:fill-none tw:[&amp;_line]:stroke-current tw:[&amp;_rect]:stroke-current tw:[&amp;_rect]:fill-muted tw:[&amp;_polygon]:stroke-current tw:[&amp;_polygon]:fill-muted tw:[&amp;_text]:fill-current tw:[&amp;_text]:font-sans tw:[&amp;_text]:text-sm\"><!></figure>");
function cu(r, i) {
	let o = ee();
	D(i, !0);
	let l = e(void 0), u = e(x([])), p = e(!1), h = e(!0), g = e(0), v = 0, y = !0;
	de(() => {
		y = !1, ++v, f(u, [], !0);
	}), _(() => {
		let e = m(l);
		if (!e) return;
		let t = () => {
			let t = e.clientWidth;
			f(g, t > 0 ? Math.max(64, Math.floor(t / 64) * 64) : 0, !0);
		}, n = new ResizeObserver(t);
		return t(), n.observe(e), () => n.disconnect();
	});
	let C = w(() => JSON.stringify([
		i.source,
		i.context.room.id,
		i.context.room.me,
		i.context.pageUrl,
		i.context.idPrefix
	]));
	_(() => {
		m(C);
		let e = b(() => i.source), t = b(() => i.context), n = {
			...t,
			idPrefix: t.idPrefix + "-" + o
		}, r = m(l), a = m(g);
		if (!r || a === 0) return;
		let s = ++v;
		return f(h, !0), f(p, !1), iu(e, n, a - 32).then((e) => {
			y && s === v && (f(u, e, !0), f(h, !1));
		}).catch(() => {
			y && s === v && (f(u, [], !0), f(p, !0), f(h, !1));
		}), () => {
			++v;
		};
	});
	var T = su(), E = s(T), O = (e) => {
		var t = au(), n = d(t, !0);
		c(() => U(n, i.lang === "en" ? "Loading diagram…" : "Carregando diagrama…")), B(e, t);
	}, k = (e) => {
		var t = ou(), r = a(t), o = d(r, !0), s = n(r, 2), l = d(s, !0);
		c(() => {
			U(o, i.lang === "en" ? "Diagram could not be rendered. Its source is shown below." : "Não foi possível desenhar o diagrama. O código está abaixo."), U(l, i.source);
		}), B(e, t);
	}, j = (e) => {
		Sn(e, {
			get nodes() {
				return m(u);
			},
			get actions() {
				return i.actions;
			}
		});
	};
	L(E, (e) => {
		m(h) ? e(O) : m(p) ? e(k, 1) : e(j, -1);
	}), S(T), le(T, (e) => f(l, e), () => m(l)), c(() => A(T, "aria-label", i.lang === "en" ? "Diagram" : "Diagrama")), B(r, T), t();
}
// svelte/features/documents/preview.ts
var lu = (e) => e.map((e) => e.kind === "text" || e.kind === "mention" ? e.text : lu(e.children)).join("");
function uu(e, t) {
	if (!t) return e.map((e) => ({ node: e }));
	function n(e, t, r) {
		for (let i of e) {
			if (i.kind === "element" && i.tag === t && lu(i.children).trim().toLowerCase() === r) return i;
			if ("children" in i) {
				let e = n(i.children, t, r);
				if (e) return e;
			}
		}
	}
	let r = n(e, "h2", "tarefas"), i = r ?? n(e, "p", "[[tarefas]]");
	function a(e) {
		let t = [], n = !1;
		for (let o of e) o === i && o.kind === "element" ? (t.push({
			...o,
			documentTaskSlot: !0,
			children: []
		}), n = !!r) : n && (o.kind === "element" || o.kind === "link") && (n = !1, o.kind === "element" && o.tag === "ul") || t.push("children" in o ? {
			...o,
			children: a(o.children)
		} : o);
		return t;
	}
	if (i) return a(e).map((e) => e.kind === "element" && e.documentTaskSlot ? { tasks: !0 } : { node: e });
	let o = e.findIndex((e) => e.kind === "element" && e.tag === "p"), s = e.map((e) => ({ node: e }));
	return s.splice(o < 0 ? 0 : o + 1, 0, { tasks: !0 }), s;
}
function du(e) {
	if (e.kind !== "element" || e.tag !== "pre" || e.children.length !== 1) return null;
	let t = e.children[0];
	return t.kind === "element" && t.tag === "code" && t.language === "mermaid" ? lu(t.children) : null;
}
// svelte/features/documents/DocumentPreview.svelte
var fu = z("<section data-document-tasks=\"\" class=\"tw:my-3\"><!></section>"), pu = z("<p class=\"tw:m-0\"> </p>"), mu = z("<aside class=\"tw:mb-3 tw:space-y-1 tw:rounded-control tw:border tw:border-border tw:bg-muted tw:p-3 tw:text-sm tw:text-muted-foreground\"></aside>"), hu = z("<p class=\"tw:m-0 tw:text-muted-foreground\"> </p>"), gu = z("<p role=\"status\" class=\"tw:my-2 tw:text-xs tw:text-muted-foreground\"> </p>"), _u = z("<div><!></div>"), vu = z("<div data-document-preview=\"\" data-vb-native=\"\" class=\"tw:min-h-0 tw:min-w-0 tw:flex-1 tw:overflow-auto tw:p-4 tw:font-sans tw:text-foreground tw:break-words\"><!> <!> <!> <!></div>");
function yu(e, r) {
	let i = ee();
	D(r, !0);
	let o = (e) => {
		var t = fu(), n = s(t);
		{
			let e = w(() => r.epic ?? "main");
			Xl(n, pe(() => m(h), { get thread() {
				return m(e);
			} }));
		}
		S(t), B(e, t);
	}, l = b(() => ({
		account: r.props.room.me,
		roomId: r.props.room.id,
		epicId: r.epic
	})), u = !0;
	de(() => u = !1);
	let f = () => {
		let e = r.owner.target();
		return u && r.owner.authorized() && e?.account === l.account && e.roomId === l.roomId && e.epicId === l.epicId;
	}, p = {
		navigate: (e, t) => {
			f() && r.props.actions.navigate(e, t);
		},
		openFile: (e) => {
			f() && r.props.actions.openFile(e);
		},
		navigateRich: (e) => {
			f() && r.props.actions.navigateRich?.(e);
		},
		openFileReference: (e) => {
			f() && r.props.actions.openFileReference?.(e);
		}
	}, h = w(() => ({
		...r.props.taskProps,
		send: (e) => f() ? r.props.taskProps.send(e) : !1,
		request: (e) => f() ? r.props.taskProps.request(e) : Promise.resolve({
			ok: !1,
			error: "disconnected"
		})
	})), g = w(() => ({
		room: r.props.room,
		pageUrl: location.href,
		idPrefix: i,
		policy: "document"
	})), _ = El();
	de(() => _.dispose());
	let v = w(() => _.render(r.text, "markdown", m(g))), y = w(() => !!r.epic || r.props.thread === "main" && !!r.props.room.roomTasks?.length), x = w(() => m(v).length === 1 && m(v)[0].kind === "text"), C = w(() => uu(m(v), m(y)));
	var T = vu(), E = s(T), O = (e) => {
		var t = mu();
		R(t, 21, () => r.props.room.docNotes, N, (e, t) => {
			var n = pu(), r = d(n, !0);
			c(() => U(r, m(t))), B(e, n);
		}), S(t), c(() => A(t, "aria-label", r.props.lang === "en" ? "Document review" : "Revisão do documento")), B(e, t);
	};
	L(E, (e) => {
		!r.epic && r.props.room.docNotes?.length && e(O);
	});
	var k = n(E, 2), F = (e) => {
		var t = hu(), n = d(t, !0);
		c(() => U(n, r.props.lang === "en" ? "This document is empty. Choose Edit or ask your agent to summarize the decisions here." : "Documento vazio. Clique em Editar ou peça pro seu agent resumir as decisões aqui.")), B(e, t);
	}, te = w(() => !r.text.trim());
	L(k, (e) => {
		m(te) && e(F);
	});
	var I = n(k, 2), ne = (e) => {
		var t = gu(), n = d(t, !0);
		c(() => U(n, r.props.lang === "en" ? "Preview shown as plain text. The full document remains available to read, copy and edit." : "Prévia em texto simples. O documento completo continua disponível para ler, copiar e editar.")), B(e, t);
	}, re = w(() => m(x) && r.text.trim());
	L(I, (e) => {
		m(re) && e(ne);
	});
	var ie = n(I, 2);
	R(ie, 17, () => m(C), N, (e, t) => {
		var n = P(), i = a(n), l = (e) => {
			var t = fu(), n = s(t);
			{
				let e = w(() => r.epic ?? "main");
				Xl(n, pe(() => m(h), { get thread() {
					return m(e);
				} }));
			}
			S(t), B(e, t);
		}, u = (e) => {
			let n = w(() => du(m(t).node));
			var i = P(), l = a(i), u = (e) => {
				cu(e, {
					get source() {
						return m(n);
					},
					get context() {
						return m(g);
					},
					get actions() {
						return p;
					},
					get lang() {
						return r.props.lang;
					}
				});
			}, d = (e) => {
				var n = _u(), i = s(n);
				{
					let e = w(() => [m(t).node]);
					Sn(i, {
						get nodes() {
							return m(e);
						},
						get actions() {
							return r.props.actions;
						},
						get taskSlot() {
							return o;
						}
					});
				}
				S(n), c(() => M(n, 1, j(m(t).node.kind === "text" ? "tw:whitespace-pre-wrap tw:break-words" : "tw:min-w-0"))), B(e, n);
			};
			L(l, (e) => {
				m(n) === null ? e(d, -1) : e(u);
			}), B(e, i);
		};
		L(i, (e) => {
			"tasks" in m(t) ? e(l) : e(u, -1);
		}), B(e, n);
	}), S(T), B(e, T), t();
}
// svelte/features/documents/DocumentPanel.svelte
var bu = z("<nav class=\"tw:flex tw:flex-wrap tw:items-center tw:gap-1 tw:border-b tw:border-border tw:px-3 tw:py-2\"><!><span aria-hidden=\"true\">›</span><!></nav>"), xu = z("<details><summary class=\"tw:cursor-pointer tw:text-sm\"> </summary> <pre class=\"tw:max-h-64 tw:overflow-auto tw:whitespace-pre-wrap tw:font-mono tw:text-xs\"> </pre> <div class=\"tw:flex tw:gap-2\"><!><!></div></details>"), Su = z("<p aria-live=\"polite\" class=\"tw:m-0 tw:text-xs\"> </p>"), Cu = z("<aside role=\"status\" class=\"tw:space-y-2 tw:border-b tw:border-border tw:bg-muted tw:p-3\"><p class=\"tw:m-0 tw:text-sm\"> </p> <!><!></aside>"), wu = z("<p role=\"status\" class=\"tw:m-0 tw:p-3 tw:text-sm tw:text-muted-foreground\"> </p>"), Tu = z("<p role=\"alert\" class=\"tw:m-0 tw:p-3 tw:text-sm tw:text-destructive\"> </p>"), Eu = z("<p role=\"status\" class=\"tw:m-0 tw:text-xs\"> </p>"), Du = z("<aside role=\"status\" class=\"tw:space-y-2 tw:border-b tw:border-border tw:bg-muted tw:p-3\"><p class=\"tw:m-0 tw:text-sm\"> </p> <details><summary class=\"tw:cursor-pointer tw:text-sm\"> </summary> <pre class=\"tw:max-h-64 tw:overflow-auto tw:whitespace-pre-wrap tw:font-mono tw:text-xs\"> </pre></details> <div class=\"tw:flex tw:gap-2\"><!><!> <!></div> <!></aside>"), Ou = z("<p role=\"alert\" class=\"tw:m-0 tw:p-3 tw:text-sm tw:text-destructive\"> <!></p>"), ku = z("<div class=\"tw:min-h-0 tw:flex-1 tw:flex-col tw:[&amp;:not([hidden])]:flex\"><!></div>"), Au = z("<div class=\"tw:flex tw:min-h-0 tw:flex-1 tw:flex-col tw:p-3\"><p role=\"status\" class=\"tw:my-2 tw:text-sm tw:text-muted-foreground\"> </p> <!><!></div>"), ju = z("<p role=\"status\" aria-live=\"polite\" class=\"tw:m-0 tw:border-t tw:border-border tw:px-3 tw:py-2 tw:text-xs tw:text-muted-foreground\"> </p>"), Mu = z("<!> <!> <!> <footer class=\"tw:flex tw:justify-end tw:border-t tw:border-border tw:p-2\"><!></footer>", 1), Nu = z("<section data-native-document=\"\" data-vb-native=\"\" class=\"tw:min-h-0 tw:min-w-0 tw:flex-1 tw:flex-col tw:bg-background tw:font-sans tw:text-foreground tw:[&amp;:not([hidden])]:flex\"><!> <!> <!> <!> <!> <!> <!> <div data-document-editor=\"\" class=\"tw:min-h-0 tw:flex-1 tw:overflow-auto tw:[&amp;:not([hidden])]:flex tw:[&amp;_.cm-editor]:min-w-0 tw:[&amp;_.cm-editor]:flex-1 tw:[&amp;_.cm-editor]:bg-transparent tw:[&amp;_.cm-scroller]:overflow-auto tw:[&amp;_.cm-scroller]:p-4 tw:[&amp;_.cm-scroller]:font-mono tw:[&amp;_.cm-scroller]:text-base tw:[&amp;_.cm-scroller]:leading-6 tw:[&amp;_.cm-content]:caret-foreground tw:[&amp;_.cm-cursor]:border-l-2 tw:[&amp;_.cm-cursor]:border-foreground tw:[&amp;_.cm-dropCursor]:border-foreground tw:[&amp;_.cm-selectionBackground]:bg-accent! tw:[&amp;_.cm-ySelectionInfo]:rounded-sm tw:[&amp;_.cm-ySelectionInfo]:px-1 tw:[&amp;_.cm-ySelectionInfo]:font-sans! tw:[&amp;_.cm-ySelectionInfo]:text-xs! tw:[&amp;_.cm-ySelectionInfo]:font-medium! tw:[&amp;_.cm-ySelectionInfo]:leading-4!\"></div> <!></section>");
function Pu(i, o) {
	D(o, !0);
	let l = () => ye(h, "$view", u), [u, p] = xe(), h = b(() => o.owner.state), g = !0, v = e("");
	de(() => g = !1);
	async function y(e) {
		if (!g || !o.owner.ownsOrphan(e)) return;
		let t = JSON.stringify(o.owner.target());
		try {
			if (!navigator.clipboard) throw Error("Unavailable");
			await navigator.clipboard.writeText(e.text), g && o.owner.ownsOrphan(e) && JSON.stringify(o.owner.target()) === t && f(v, m(E) ? "Copied" : "Copiado", !0);
		} catch {
			g && o.owner.ownsOrphan(e) && JSON.stringify(o.owner.target()) === t && f(v, m(E) ? "Clipboard unavailable. Select the retained text to copy it." : "Área de transferência indisponível. Selecione o texto guardado para copiar.", !0);
		}
	}
	let x = w(() => (l().recovery, l().target, o.owner.recoveryToken()));
	function C(e) {
		let t = e.currentTarget;
		if (!(t instanceof HTMLElement)) return null;
		let n = t.dataset.documentRecoveryKey, r = Number(t.dataset.documentRecoveryRevision);
		return n && Number.isSafeInteger(r) ? {
			key: n,
			revision: r
		} : null;
	}
	async function T(e) {
		if (!j(e) || !g) return;
		let t = C(e), n = o.owner.recoveryText(t);
		if (n !== null) try {
			if (!navigator.clipboard) throw Error("Unavailable");
			await navigator.clipboard.writeText(n), g && o.owner.recoveryText(t) === n && f(v, m(E) ? "Copied" : "Copiado", !0);
		} catch {
			g && o.owner.recoveryText(t) === n && f(v, m(E) ? "Clipboard unavailable. Select the retained text to copy it." : "Área de transferência indisponível. Selecione o texto guardado para copiar.", !0);
		}
	}
	let E = w(() => o.props.lang === "en"), O = w(() => o.props.room.epics.find((e) => e.id === o.props.thread));
	_(() => {
		JSON.stringify(l().target), f(v, "");
	});
	let k = w(() => !l().denied && o.props.room.members.includes(o.props.room.me)), j = (e) => e.currentTarget instanceof HTMLElement && e.currentTarget.isConnected;
	function M(e) {
		return { destroy: o.owner.attach(e) };
	}
	var N = Nu(), ee = s(N), P = (e) => {
		var t = bu(), i = s(t);
		{
			let e = w(() => l().target?.epicId ? "ghost" : "secondary"), t = w(() => !l().target?.epicId);
			V(i, {
				size: "sm",
				get variant() {
					return m(e);
				},
				get "aria-pressed"() {
					return m(t);
				},
				onclick: (e) => {
					j(e) && o.owner.chooseRoom(!0);
				},
				children: (e, t) => {
					r();
					var n = I();
					c(() => U(n, o.props.room.book.title || "vibebook")), B(e, n);
				},
				$$slots: { default: !0 }
			});
		}
		var a = n(i, 2);
		{
			let e = w(() => l().target?.epicId ? "secondary" : "ghost"), t = w(() => !!l().target?.epicId);
			V(a, {
				size: "sm",
				get variant() {
					return m(e);
				},
				get "aria-pressed"() {
					return m(t);
				},
				onclick: (e) => {
					j(e) && o.owner.chooseRoom(!1);
				},
				children: (e, t) => {
					r();
					var n = I();
					c(() => U(n, m(O).title)), B(e, n);
				},
				$$slots: { default: !0 }
			});
		}
		S(t), c(() => A(t, "aria-label", m(E) ? "Document scope" : "Escopo do documento")), B(e, t);
	};
	L(ee, (e) => {
		m(O) && e(P);
	});
	var te = n(ee, 2), ne = (e) => {
		var t = Cu(), i = s(t), a = d(i, !0), u = n(i, 2);
		R(u, 1, () => l().orphaned, (e) => e.epicId, (e, t) => {
			var i = xu(), a = s(i), l = d(a, !0), u = n(a, 2), f = d(u, !0), p = n(u, 2), h = s(p);
			V(h, {
				variant: "outline",
				size: "sm",
				onclick: (e) => {
					j(e) && g && y(m(t));
				},
				children: (e, t) => {
					r();
					var n = I();
					c(() => U(n, m(E) ? "Copy retained text" : "Copiar texto guardado")), B(e, n);
				},
				$$slots: { default: !0 }
			});
			var _ = n(h);
			V(_, {
				variant: "outline",
				size: "sm",
				onclick: (e) => {
					j(e) && g && o.owner.discardOrphan(m(t));
				},
				children: (e, t) => {
					r();
					var n = I();
					c(() => U(n, m(E) ? "Discard" : "Descartar")), B(e, n);
				},
				$$slots: { default: !0 }
			}), S(p), S(i), c(() => {
				U(l, m(t).epicId), U(f, m(t).text);
			}), B(e, i);
		});
		var f = n(u), p = (e) => {
			var t = Su(), n = d(t, !0);
			c(() => U(n, m(v))), B(e, t);
		};
		L(f, (e) => {
			m(v) && e(p);
		}), S(t), c(() => U(a, m(E) ? "Retained edits belong to epics that no longer exist. They will never be sent to another document." : "Edições guardadas pertencem a épicos que não existem mais. Elas nunca serão enviadas para outro documento.")), B(e, t);
	};
	L(te, (e) => {
		l().orphaned.length && e(ne);
	});
	var re = n(te, 2), ie = (e) => {
		var t = wu(), n = d(t, !0);
		c(() => U(n, m(E) ? "Loading document…" : "Carregando documento…")), B(e, t);
	};
	L(re, (e) => {
		l().readPending && e(ie);
	});
	var ae = n(re, 2), z = (e) => {
		var t = Tu(), n = d(t, !0);
		c(() => U(n, m(E) ? "The last edit was not confirmed. Your text is retained; review it before retrying live editing." : "A última edição não foi confirmada. Seu texto está guardado; revise antes de tentar a edição ao vivo.")), B(e, t);
	};
	L(ae, (e) => {
		l().fallbackUnconfirmed && e(z);
	});
	var oe = n(ae, 2), se = (e) => {
		var t = Du(), i = s(t), a = d(i, !0), u = n(i, 2), f = s(u), p = d(f, !0), h = n(f, 2), g = d(h, !0);
		S(u);
		var _ = n(u, 2), y = s(_);
		{
			let e = w(() => m(x)?.key), t = w(() => m(x)?.revision), n = w(() => l().mode !== "edit" || !m(k) || !(l().status === "fallback" || l().status === "connected" && l().synced));
			V(y, {
				get "data-document-recovery-key"() {
					return m(e);
				},
				get "data-document-recovery-revision"() {
					return m(t);
				},
				size: "sm",
				get disabled() {
					return m(n);
				},
				onclick: (e) => {
					j(e) && o.owner.restore(C(e));
				},
				children: (e, t) => {
					r();
					var n = I();
					c(() => U(n, m(E) ? "Use retained text" : "Usar texto guardado")), B(e, n);
				},
				$$slots: { default: !0 }
			});
		}
		var b = n(y);
		{
			let e = w(() => m(x)?.key), t = w(() => m(x)?.revision);
			V(b, {
				variant: "outline",
				size: "sm",
				get "data-document-recovery-key"() {
					return m(e);
				},
				get "data-document-recovery-revision"() {
					return m(t);
				},
				onclick: (e) => {
					j(e) && o.owner.dismissRecovery(C(e));
				},
				children: (e, t) => {
					r();
					var n = I();
					c(() => U(n, m(E) ? "Discard retained text" : "Descartar texto guardado")), B(e, n);
				},
				$$slots: { default: !0 }
			});
		}
		var D = n(b, 2);
		{
			let e = w(() => m(x)?.key), t = w(() => m(x)?.revision);
			V(D, {
				size: "sm",
				variant: "outline",
				get "data-document-recovery-key"() {
					return m(e);
				},
				get "data-document-recovery-revision"() {
					return m(t);
				},
				onclick: (e) => {
					T(e);
				},
				children: (e, t) => {
					r();
					var n = I();
					c(() => U(n, m(E) ? "Copy retained text" : "Copiar texto guardado")), B(e, n);
				},
				$$slots: { default: !0 }
			});
		}
		S(_);
		var O = n(_, 2), A = (e) => {
			var t = Eu(), n = d(t, !0);
			c(() => U(n, m(v))), B(e, t);
		};
		L(O, (e) => {
			m(v) && e(A);
		}), S(t), c(() => {
			U(a, m(E) ? "An earlier local edit was not confirmed. Review it before replacing the current document." : "Uma edição local anterior não foi confirmada. Revise antes de substituir o documento atual."), U(p, m(E) ? "Review retained text" : "Revisar texto guardado"), U(g, l().recovery);
		}), B(e, t);
	};
	L(oe, (e) => {
		l().recovery !== null && e(se);
	});
	var ce = n(oe, 2), le = (e) => {
		var t = Ou(), i = s(t, !0), a = n(i);
		V(a, {
			variant: "outline",
			size: "sm",
			onclick: (e) => {
				j(e) && g && o.props.onAuthorize();
			},
			children: (e, t) => {
				r();
				var n = I();
				c(() => U(n, m(E) ? "Check access again" : "Verificar acesso novamente")), B(e, n);
			},
			$$slots: { default: !0 }
		}), S(t), c(() => U(i, l().checkingAccess ? m(E) ? "Checking document access…" : "Verificando acesso ao documento…" : m(E) ? "Document access must be checked again. Only your retained local text is available." : "O acesso ao documento precisa ser verificado novamente. Apenas seu texto local guardado está disponível.")), B(e, t);
	};
	L(ce, (e) => {
		l().denied && e(le);
	});
	var ue = n(ce, 2), fe = (e) => {
		var t = ku(), n = s(t);
		F(n, () => JSON.stringify([
			o.props.room.me,
			o.props.room.id,
			l().target?.epicId
		]), (e) => {
			{
				let t = w(() => l().target?.epicId ?? null);
				yu(e, {
					get owner() {
						return o.owner;
					},
					get text() {
						return l().text;
					},
					get epic() {
						return m(t);
					},
					get props() {
						return o.props;
					}
				});
			}
		}), S(t), c(() => A(t, "hidden", l().mode !== "preview")), B(e, t);
	};
	L(ue, (e) => {
		l().denied || e(fe);
	});
	var pe = n(ue, 2);
	_e(pe, (e) => M?.(e));
	var me = n(pe, 2), he = (e) => {
		var t = Mu(), i = a(t), u = (e) => {
			var t = Au(), i = s(t), a = d(i, !0), u = n(i, 2);
			{
				let e = w(() => m(E) ? "Document editor" : "Editor do documento"), t = w(() => !m(k));
				Tt(u, {
					get "aria-label"() {
						return m(e);
					},
					get value() {
						return l().text;
					},
					get disabled() {
						return m(t);
					},
					class: "tw:min-h-64 tw:flex-1 tw:resize-none tw:font-mono! tw:text-base! tw:leading-6! tw:p-4! tw:border! tw:border-input! tw:rounded-control! tw:bg-studio-input-background!",
					oninput: (e) => {
						j(e) && o.owner.input(e.currentTarget.value);
					}
				});
			}
			var f = n(u);
			V(f, {
				variant: "outline",
				size: "sm",
				onclick: (e) => {
					j(e) && o.owner.retry();
				},
				children: (e, t) => {
					r();
					var n = I();
					c(() => U(n, m(E) ? "Retry live editing" : "Tentar edição ao vivo")), B(e, n);
				},
				$$slots: { default: !0 }
			}), S(t), c(() => U(a, m(E) ? "Live editing could not start. Plain-text changes use the room connection and may conflict with other edits." : "A edição ao vivo não iniciou. Alterações em texto simples usam a conexão da sala e podem conflitar com outras edições.")), B(e, t);
		};
		L(i, (e) => {
			l().mode === "edit" && l().status === "fallback" && e(u);
		});
		var f = n(i, 2), p = (e) => {
			var t = ju(), n = d(t, !0);
			c(() => U(n, l().fallbackPending ? m(E) ? "Changes sent or queued locally; confirmation is pending." : "Alterações enviadas ou guardadas localmente; confirmação pendente." : l().status === "connected" && l().synced ? m(E) ? "Live connection synchronized. Server persistence is asynchronous." : "Conexão ao vivo sincronizada. A gravação no servidor é assíncrona." : l().status === "fallback" ? m(E) ? "Plain-text fallback" : "Edição em texto simples" : m(E) ? "Connecting or reconnecting; keep this page open for local edits." : "Conectando; mantenha a página aberta para suas edições locais.")), B(e, t);
		};
		L(f, (e) => {
			l().mode === "edit" && e(p);
		});
		var h = n(f, 2), g = (e) => {
			var t = Ou(), i = s(t, !0), a = n(i);
			V(a, {
				variant: "outline",
				size: "sm",
				onclick: (e) => {
					j(e) && o.owner.retry();
				},
				children: (e, t) => {
					r();
					var n = I();
					c(() => U(n, m(E) ? "Try again" : "Tentar novamente")), B(e, n);
				},
				$$slots: { default: !0 }
			}), S(t), c(() => U(i, m(E) ? "Document request could not be confirmed." : "Não foi possível confirmar o pedido do documento.")), B(e, t);
		};
		L(h, (e) => {
			l().error && l().status !== "fallback" && e(g);
		});
		var _ = n(h, 2), v = s(_);
		{
			let e = w(() => !m(k)), t = w(() => l().mode === "edit" ? "primary" : "outline"), n = w(() => l().mode === "edit");
			V(v, {
				get disabled() {
					return m(e);
				},
				get variant() {
					return m(t);
				},
				get "aria-pressed"() {
					return m(n);
				},
				onclick: (e) => {
					j(e) && o.owner.mode(l().mode === "edit" ? "preview" : "edit");
				},
				children: (e, t) => {
					r();
					var n = I();
					c(() => U(n, l().mode === "edit" ? m(E) ? "Done" : "Pronto" : m(E) ? "Edit" : "Editar")), B(e, n);
				},
				$$slots: { default: !0 }
			});
		}
		S(_), B(e, t);
	};
	L(me, (e) => {
		l().denied || e(he);
	}), S(N), c(() => {
		A(N, "hidden", o.props.pane !== "doc"), A(pe, "hidden", l().denied || l().mode !== "edit" || l().status === "fallback");
	}), B(i, N), t(), p();
}
// svelte/features/documents/DocumentToolbar.svelte
var Fu = z("<span class=\"tw:text-xs tw:text-muted-foreground\"> </span>"), Iu = z("<span></span>"), Lu = z("<span> </span><!><!>", 1), Ru = z("<div role=\"group\" class=\"tw:flex tw:gap-1\"><!><!></div>"), zu = z("<div data-vb-native=\"\" class=\"tw:flex tw:min-w-0 tw:items-center tw:gap-2 tw:border-b tw:border-border tw:bg-background tw:p-2 tw:font-sans tw:text-foreground\"><div class=\"tw:flex tw:min-w-0 tw:flex-1 tw:gap-1 tw:overflow-x-auto\"></div> <!></div>");
function Bu(e, i) {
	D(i, !0);
	let o = () => ye(_, "$view", l), [l, u] = xe(), f = H(i, "counts", 19, () => ({})), p = H(i, "agentTitle", 3, "Agents"), h = H(i, "agentState", 3, ""), g = H(i, "compact", 3, !1), _ = b(() => i.owner.state), v = w(() => i.lang === "en"), y = !0;
	de(() => y = !1);
	let x = w(() => [
		{
			id: "doc",
			label: "Doc"
		},
		{
			id: "board",
			label: m(v) ? "Board" : "Quadro"
		},
		{
			id: "files",
			label: m(v) ? "Files" : "Arquivos"
		},
		{
			id: "apps",
			label: "Apps"
		},
		{
			id: "decisions",
			label: m(v) ? "Decisions" : "Decisões"
		},
		{
			id: "reminders",
			label: m(v) ? "Reminders" : "Lembretes"
		},
		{
			id: "agents",
			label: "Agents"
		}
	]), C = w(() => i.room.epics.find((e) => e.id === o().target?.epicId)), T = w(() => m(C)?.tasks.length ? `${m(C).tasks.filter((e) => e.done).length}/${m(C).tasks.length}` : ""), E = w(() => o().text.match(/^#\s+(.+)$/m)?.[1].replace(/[*_`]/g, "").trim() || m(C)?.title || i.room.book.title), O = w(() => m(x).filter((e) => !g() || e.id !== "board"));
	function k(e, t) {
		e.stopPropagation(), y && e.currentTarget instanceof HTMLElement && e.currentTarget.isConnected && i.onPane(t);
	}
	function ee(e) {
		if (!y || !(e.currentTarget instanceof HTMLElement) || !e.currentTarget.isConnected) return;
		let t = [...e.currentTarget.querySelectorAll("button[data-document-pane]")], n = t.findIndex((e) => e === document.activeElement), r = n;
		if (e.key === "ArrowRight") r = (n + 1) % t.length;
		else if (e.key === "ArrowLeft") r = (n - 1 + t.length) % t.length;
		else if (e.key === "Home") r = 0;
		else if (e.key === "End") r = t.length - 1;
		else return;
		e.preventDefault(), t[r]?.focus(), t[r]?.click();
	}
	var P = zu(), F = s(P);
	R(F, 21, () => m(O), N, (e, t) => {
		{
			let r = w(() => i.pane === m(t).id ? "secondary" : "ghost"), s = w(() => o().denied && m(t).id !== "doc"), l = w(() => g() ? void 0 : "tab"), u = w(() => g() ? void 0 : i.pane === m(t).id), _ = w(() => g() ? i.pane === m(t).id : void 0), v = w(() => g() || i.pane === m(t).id ? 0 : -1), y = w(() => m(t).id === "agents" ? p() : m(t).id === "doc" ? m(E) : m(t).label);
			V(e, {
				size: "sm",
				get variant() {
					return m(r);
				},
				get disabled() {
					return m(s);
				},
				get role() {
					return m(l);
				},
				get "aria-selected"() {
					return m(u);
				},
				get "aria-pressed"() {
					return m(_);
				},
				get tabindex() {
					return m(v);
				},
				get "data-document-pane"() {
					return m(t).id;
				},
				get title() {
					return m(y);
				},
				onclick: (e) => k(e, m(t).id),
				children: (e, r) => {
					var i = Lu(), o = a(i), s = d(o, !0), l = n(o), u = (e) => {
						var t = Fu(), n = d(t, !0);
						c(() => U(n, m(T))), B(e, t);
					}, _ = (e) => {
						var n = Fu(), r = d(n, !0);
						c(() => U(r, f()[m(t).id])), B(e, n);
					};
					L(l, (e) => {
						g() && m(t).id === "doc" && m(T) ? e(u) : f()[m(t).id] && e(_, 1);
					});
					var v = n(l), y = (e) => {
						var t = Iu();
						c(() => {
							A(t, "aria-label", p()), M(t, 1, j(h() === "blocked" ? "tw:size-2 tw:rounded-full tw:bg-destructive" : h() === "busy" ? "tw:size-2 tw:rounded-full tw:bg-warning" : "tw:size-2 tw:rounded-full tw:bg-success"));
						}), B(e, t);
					};
					L(v, (e) => {
						m(t).id === "agents" && h() && e(y);
					}), c(() => U(s, m(t).label)), B(e, i);
				},
				$$slots: { default: !0 }
			});
		}
	}), S(F);
	var ne = n(F, 2), re = (e) => {
		var t = Ru(), a = s(t);
		{
			let e = w(() => o().mode === "preview" ? "secondary" : "ghost"), t = w(() => o().mode === "preview");
			V(a, {
				get variant() {
					return m(e);
				},
				size: "sm",
				get "aria-pressed"() {
					return m(t);
				},
				onclick: (e) => {
					y && e.currentTarget.isConnected && i.owner.mode("preview");
				},
				children: (e, t) => {
					r();
					var n = I();
					c(() => U(n, m(v) ? "Read" : "Ver")), B(e, n);
				},
				$$slots: { default: !0 }
			});
		}
		var l = n(a);
		{
			let e = w(() => o().mode === "edit" ? "secondary" : "ghost"), t = w(() => o().mode === "edit");
			V(l, {
				get variant() {
					return m(e);
				},
				size: "sm",
				get disabled() {
					return o().denied;
				},
				get "aria-pressed"() {
					return m(t);
				},
				onclick: (e) => {
					y && e.currentTarget.isConnected && i.owner.mode("edit");
				},
				children: (e, t) => {
					r();
					var n = I();
					c(() => U(n, m(v) ? "Edit" : "Editar")), B(e, n);
				},
				$$slots: { default: !0 }
			});
		}
		S(t), c(() => A(t, "aria-label", m(v) ? "Document mode" : "Modo do documento")), B(e, t);
	};
	L(ne, (e) => {
		!g() && i.pane === "doc" && e(re);
	}), S(P), c(() => {
		A(F, "role", g() ? "toolbar" : "tablist"), A(F, "aria-label", m(v) ? "Room panels" : "Painéis da sala");
	}), te("keydown", F, ee), B(e, P), t(), u();
}
Se(["keydown"]);
// svelte/features/documents/session.ts
function Vu() {
	let e, t = 0, n = /* @__PURE__ */ new Map(), r = (e, t) => JSON.stringify([e, t]), i = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map();
	return {
		account(t) {
			e !== t && (e = t, a.clear(), i.clear(), n.clear(), o.clear());
		},
		prove(e, t, i) {
			let a = r(e, t);
			return n.get(a) === i && (n.delete(a), !0);
		},
		denied: (e, t) => n.has(r(e, t)),
		deny(e, t, i) {
			let a = r(e, t);
			n.set(a, Math.max(n.get(a) ?? -1, i));
		},
		authorize(e, t) {
			let i = r(e.me, e.id), a = n.get(i);
			e.members.includes(e.me) && a !== void 0 && t > a && n.delete(i);
		},
		position: (e) => o.get(Kt(e)),
		setPosition(e, t) {
			o.set(Kt(e), t);
		},
		get: (e) => a.get(Kt(e)),
		set(e, n) {
			i.set(Kt(e), e), a.set(Kt(e), {
				...n,
				revision: ++t
			});
		},
		orphans(e) {
			return [...i].flatMap(([t, n]) => {
				let r = a.get(t);
				return r && n.account === e.me && n.roomId === e.id && n.epicId && !e.epics.some((e) => e.id === n.epicId) ? [{
					account: n.account,
					roomId: n.roomId,
					epicId: n.epicId,
					text: r.text,
					revision: r.revision
				}] : [];
			});
		},
		delete: (e) => a.delete(Kt(e)),
		clear() {
			e = void 0, a.clear(), i.clear(), n.clear(), o.clear();
		}
	};
}
function Hu(e) {
	let t = e.schedule ?? setTimeout, n = e.cancel ?? clearTimeout, r = "preview";
	try {
		e.readMode?.() === "edit" && (r = "edit");
	} catch {}
	let i = {
		target: null,
		text: "",
		mode: r,
		status: "idle",
		synced: !1,
		denied: !1,
		checkingAccess: !1,
		roomDocument: !1,
		recovery: null,
		error: !1,
		fallbackPending: !1,
		orphaned: [],
		readPending: !1,
		fallbackUnconfirmed: !1
	}, a = v(i), o = (e) => {
		i = {
			...i,
			...e
		}, a.set(i);
	}, s = !0, c, l = "main", u, d, f = 0, p, m, h, g, _, y = e.authorizationEpoch ?? 0, b = 0, x, S, C = 0, w = 0, T, E = /* @__PURE__ */ new Set();
	function D() {
		if (!i.target) return;
		d && e.drafts.setPosition(i.target, {
			selection: d.selection(),
			scroll: d.scroll()
		});
		let t = d?.text() ?? i.text;
		T !== void 0 && c && t !== qt(c, i.target) && e.drafts.set(i.target, {
			text: t,
			selection: d?.selection(),
			scroll: d?.scroll() ?? u?.scrollTop ?? 0
		});
	}
	function O() {
		++b, x !== void 0 && n(x), x = void 0, S?.abort(), S = void 0;
	}
	function k() {
		O(), i.checkingAccess && o({ checkingAccess: !1 }), ++f, ++w, m !== void 0 && n(m), m = void 0, h !== void 0 && n(h), h = void 0, _ !== void 0 && n(_), _ = void 0, D();
		let e = d;
		d = void 0, e?.destroy(), u?.replaceChildren();
	}
	function A() {
		++C, g !== void 0 && n(g), g = void 0;
	}
	function j() {
		if (!s || !c || !c.members.includes(c.me) || e.drafts.denied(c.me, c.id) || !i.target?.epicId) return;
		let n = Kt(i.target);
		if (!Object.hasOwn(c.docs ?? {}, i.target.epicId) && !E.has(n)) {
			E.add(n), A();
			let r = C, a = i.target.epicId;
			o({
				readPending: !0,
				error: !1
			}), g = t(() => {
				s && r === C && i.target && Kt(i.target) === n && (g = void 0, o({
					readPending: !1,
					error: !0
				}));
			}, 3e4), e.request({
				t: "doc.get",
				epic: a
			}).then((e) => {
				s && r === C && i.target && Kt(i.target) === n && (e.ok || (A(), o({
					readPending: !1,
					error: !0
				})));
			}).catch(() => {
				s && r === C && (A(), o({
					readPending: !1,
					error: !0
				}));
			});
		}
	}
	function M() {
		if (!s || !u || !c || !i.target || i.denied || i.mode !== "edit" || d || i.status === "loading" || i.status === "fallback") return;
		let r = i.target, a = ++f, l = u, m = !0;
		T = void 0, ++w, o({
			status: "loading",
			synced: !1,
			error: !1,
			fallbackPending: !1,
			fallbackUnconfirmed: !1,
			recovery: e.drafts.get(r)?.text ?? i.recovery
		}), h = t(() => {
			s && a === f && !d && i.status === "loading" && (h = void 0, ++f, p = void 0, o({
				status: "fallback",
				error: !0,
				synced: !1
			}));
		}, e.editorTimeoutMs ?? 3e4), (p ??= Promise.resolve().then(e.load ?? (() => import("./editor-BhkBY3D5.js")))).then((t) => {
			if (s && a === f && u === l && i.mode === "edit") {
				h !== void 0 && n(h), h = void 0;
				try {
					let n = t.mountEditor(l, {
						target: r,
						label: e.label ?? "Document editor",
						name: e.name(c),
						color: e.color(c),
						onDenied() {
							s && a === f && !i.denied && N.checkAccess();
						},
						onText(e, t) {
							s && a === f && !i.denied && (t && (T = e), o({ text: e }));
						},
						onStatus(e) {
							s && a === f && !i.denied && o({
								status: e,
								synced: e === "connected" && i.synced
							});
						},
						onSync(t) {
							if (s && a === f && !i.denied && (o({ synced: t }), t && d && m)) {
								m = !1;
								let t = e.drafts.position(r);
								t?.selection && d.setSelection(t.selection), t && d.setScroll(t.scroll);
							}
						}
					});
					if (!s || a !== f) {
						n.destroy();
						return;
					}
					if (d = n, i.synced && m) {
						m = !1;
						let t = e.drafts.position(r);
						t?.selection && d.setSelection(t.selection), t && d.setScroll(t.scroll);
					}
					d.focus();
				} catch {
					s && a === f && o(d ? { error: !0 } : {
						status: "fallback",
						error: !0,
						synced: !1
					});
				}
			}
		}).catch(() => {
			s && a === f && (h !== void 0 && n(h), h = void 0, p = void 0, o({
				status: "fallback",
				error: !0,
				synced: !1
			}));
		});
	}
	let N = {
		state: a,
		authorized: () => !!(s && c && c.members.includes(c.me) && !e.drafts.denied(c.me, c.id)),
		checkAccess() {
			if (!s || !c || !i.target || i.checkingAccess) return;
			if (!d) {
				N.revoke();
				return;
			}
			O(), D(), ++w, m !== void 0 && n(m), m = void 0, _ !== void 0 && n(_), _ = void 0, A();
			let r = i.target, a = b, u = y, p = d;
			e.drafts.deny(r.account, r.roomId, u), p.pause(), o({
				denied: !0,
				checkingAccess: !0,
				text: "",
				recovery: e.drafts.get(r)?.text ?? null,
				orphaned: [],
				synced: !1,
				readPending: !1,
				error: !1
			});
			let h = () => s && a === b && d === p && i.target && Kt(i.target) === Kt(r) && c?.me === r.account && c.id === r.roomId, g = () => {
				h() && (O(), ++f, ++w, d = void 0, p.destroy(), T = void 0, o({
					checkingAccess: !1,
					denied: !0,
					text: "",
					mode: "preview",
					status: "idle",
					synced: !1
				}));
			};
			S = new AbortController();
			let v = S.signal;
			x = t(g, 3e4);
			let C = e.access ?? ((e, t) => It((e, t) => fetch(e, {
				...t,
				cache: "no-store"
			})).access(e, t));
			Promise.resolve().then(() => h() ? C(r.roomId, v) : null).then(async (t) => {
				if (!h()) return;
				if (!t || t.state !== "member" || t.email !== r.account) {
					g();
					return;
				}
				let n = await e.request({
					t: "doc.get",
					epic: r.epicId ?? void 0
				});
				if (h()) {
					if (!n.ok || !e.drafts.prove(r.account, r.roomId, u)) g();
					else {
						O(), o({
							denied: !1,
							checkingAccess: !1,
							status: "connecting",
							text: p.text(),
							error: !1
						}), c && N.sync(c, l);
						try {
							p.resume(), p.focus();
						} catch {
							++f, ++w, d = void 0, e.drafts.deny(r.account, r.roomId, u), p.destroy(), o({
								denied: !0,
								checkingAccess: !1,
								text: "",
								mode: "preview",
								status: "idle"
							});
						}
					}
				}
			}).catch(g);
		},
		revoke(t = !0) {
			s && c && i.target && (k(), A(), t && e.drafts.deny(c.me, c.id, y), T = void 0, o({
				denied: !0,
				checkingAccess: !1,
				text: "",
				recovery: e.drafts.get(i.target)?.text ?? null,
				orphaned: [],
				mode: "preview",
				status: "idle",
				synced: !1,
				readPending: !1,
				error: !1,
				fallbackPending: !1,
				fallbackUnconfirmed: !1
			}));
		},
		roomDocument: () => i.roomDocument,
		target: () => i.target,
		invalidate(e) {
			c && E.delete(Kt({
				account: c.me,
				roomId: c.id,
				epicId: e
			}));
		},
		sync(t, r, a = !1, u = !1, f = e.authorizationEpoch ?? 0) {
			if (!s) return;
			let p = !!c && c.me !== t.me, m = p || l !== r ? !1 : i.roomDocument, h = Jt(t, r, m), g = !i.target || Kt(h) !== Kt(i.target);
			if (g && (k(), A()), p && (E.clear(), T = void 0), e.drafts.account(t.me), c = t, l = r, u && (f > y && i.checkingAccess && (k(), o({
				checkingAccess: !1,
				mode: "preview",
				status: "idle"
			})), e.drafts.authorize(t, f), y = Math.max(y, f)), !(i.checkingAccess && !g && t.members.includes(t.me))) {
				if (!t.members.includes(t.me) || e.drafts.denied(t.me, t.id)) g && (T = void 0, o({
					target: h,
					text: ""
				})), N.revoke(u && !t.members.includes(t.me));
				else {
					if (i.denied && o({ denied: !1 }), a && (E.clear(), A()), g) {
						T = void 0;
						let n = e.drafts.get(h);
						o({
							target: h,
							roomDocument: m,
							text: qt(t, h),
							recovery: n?.text ?? null,
							status: "idle",
							synced: !1,
							error: !1,
							fallbackPending: !1,
							readPending: !1,
							fallbackUnconfirmed: !1
						});
					} else !d && !i.fallbackPending && o({ text: qt(t, h) });
					(T !== void 0 && T === qt(t, h) || T === void 0 && e.drafts.get(h)?.text === qt(t, h)) && (e.drafts.delete(h), T = void 0, ++w, _ !== void 0 && n(_), _ = void 0, o({
						fallbackPending: !1,
						fallbackUnconfirmed: !1,
						recovery: null
					})), o({ orphaned: e.drafts.orphans(t) }), (!h.epicId || Object.hasOwn(t.docs ?? {}, h.epicId)) && (A(), i.readPending && o({ readPending: !1 }), i.status !== "fallback" && i.error && o({ error: !1 })), j(), M();
				}
			}
		},
		attach(e) {
			if (s) return u = e, M(), () => {
				s && u === e && (k(), u = void 0, o({
					status: "idle",
					synced: !1
				}));
			};
		},
		mode(t) {
			if (s && i.mode !== t && (t !== "edit" || N.authorized())) {
				t === "preview" && k(), o({
					mode: t,
					status: "idle",
					synced: !1,
					recovery: i.target ? e.drafts.get(i.target)?.text ?? i.recovery : i.recovery
				});
				try {
					e.writeMode?.(t);
				} catch {}
				e.onMode?.(t), t === "edit" && M();
			}
		},
		chooseRoom(e) {
			N.authorized() && c && (o({ roomDocument: e }), N.sync(c, l));
		},
		ownsOrphan(t) {
			if (!s || !c || t.account !== c.me || t.roomId !== c.id || c.epics.some((e) => e.id === t.epicId)) return !1;
			let n = e.drafts.get({
				account: t.account,
				roomId: t.roomId,
				epicId: t.epicId
			});
			return n?.revision === t.revision && n.text === t.text;
		},
		discardOrphan(t) {
			c && N.ownsOrphan(t) && (e.drafts.delete({
				account: t.account,
				roomId: t.roomId,
				epicId: t.epicId
			}), o({ orphaned: e.drafts.orphans(c) }));
		},
		input(r) {
			if (!s || i.status !== "fallback" || !i.target || !c || !N.authorized()) return;
			let a = i.target, l = f, d = ++w;
			T = r, o({
				text: r,
				fallbackPending: !0,
				fallbackUnconfirmed: !1
			}), _ !== void 0 && n(_), _ = void 0, e.drafts.set(a, {
				text: r,
				scroll: u?.scrollTop ?? 0
			}), m !== void 0 && n(m), m = t(() => {
				if (m = void 0, !s || l !== f || d !== w || !c || !i.target || Kt(a) !== Kt(i.target) || c.me !== a.account || c.id !== a.roomId || a.epicId && !c.epics.some((e) => e.id === a.epicId)) return;
				let n = () => s && l === f && d === w && i.target && Kt(a) === Kt(i.target) && i.fallbackPending;
				e.request({
					t: "doc",
					text: r,
					epic: a.epicId ?? void 0
				}).then((t) => {
					if (n()) {
						if (!t.ok) o({
							error: !0,
							fallbackUnconfirmed: !0
						});
						else return e.request({
							t: "doc.get",
							epic: a.epicId ?? void 0
						}).then((e) => {
							n() && !e.ok && o({
								error: !0,
								fallbackUnconfirmed: !0
							});
						});
					}
				}).catch(() => {
					n() && o({
						error: !0,
						fallbackUnconfirmed: !0
					});
				}), o({ fallbackPending: !0 }), _ = t(() => {
					s && l === f && d === w && (_ = void 0, i.fallbackPending && o({
						fallbackUnconfirmed: !0,
						error: !0
					}));
				}, 3e4);
			}, 400);
		},
		recoveryToken() {
			if (!s || !i.target || i.recovery === null) return null;
			let t = e.drafts.get(i.target);
			return t && t.text === i.recovery ? {
				key: Kt(i.target),
				revision: t.revision
			} : null;
		},
		recoveryText(t) {
			if (!s || !t || !i.target || i.recovery === null || Kt(i.target) !== t.key) return null;
			let n = e.drafts.get(i.target);
			return n?.revision === t.revision && n.text === i.recovery ? n.text : null;
		},
		restore(e) {
			let t = N.recoveryText(e);
			s && t !== null && i.target && N.authorized() && (!d || i.synced) && (o({ recovery: null }), T = t, d ? d.replace(t) : i.status === "fallback" ? N.input(t) : o({ recovery: t }));
		},
		dismissRecovery(t) {
			s && i.target && N.recoveryText(t) !== null && (e.drafts.delete(i.target), o({ recovery: null }));
		},
		retry() {
			N.authorized() && c && (i.target && E.delete(Kt(i.target)), j(), i.status === "fallback" && (k(), o({
				status: "idle",
				error: !1
			}), M()));
		},
		focus() {
			d?.focus();
		},
		dispose() {
			s && (k(), A(), s = !1, c = void 0, u = void 0, p = void 0, E.clear(), T = void 0, i = {
				...i,
				target: null,
				text: "",
				recovery: null,
				orphaned: []
			}, a.set(i));
		}
	};
	return N;
}
// svelte/features/pwa/copy.ts
var Uu = {
	settings: "Notifications",
	close: "Close",
	enable: "Enable browser notifications",
	mute: "Mute notifications and sound",
	retry: "Retry setup",
	test: "Send a test notification",
	sent: "Push services accepted {n} test notifications for your account. Delivery to this device is not confirmed.",
	permission: "Browser permission",
	denied: "Notifications are blocked. Allow them in this site's browser settings, then retry.",
	unsupported: "This browser does not offer notification permission here.",
	ios: "On iPhone or iPad, open this site in Safari, share it, choose Add to Home Screen, then open the installed app to enable notifications.",
	install: "Install vibebook on your phone",
	how: "How to install",
	installNow: "Install app",
	android: "Open the browser menu and choose Install app or Add to Home Screen. Open its icon and enable notifications.",
	benefits: "Receive alerts when someone mentions you or your agent asks for permission; open the app from your home screen.",
	waiting: "Waiting for confirmation. An in-flight subscription change has not been rolled back. Retry waits for it to settle.",
	failed: "Notification setup failed. Check browser permission and your connection, then retry.",
	unavailable: "Push notifications are not configured on this server.",
	storage: "This browser could not save the preference. It applies only to this tab.",
	help: "Notification and installation settings",
	on: "Notifications on: click to mute",
	off: "Notifications muted: click to turn on",
	working: "Updating notifications…",
	steps: "Installation steps"
}, Wu = {
	settings: "Notificações",
	close: "Fechar",
	enable: "Ativar notificações no navegador",
	mute: "Silenciar notificações e som",
	retry: "Tentar configurar de novo",
	test: "Enviar uma notificação de teste",
	sent: "Os serviços de push aceitaram {n} notificações de teste da sua conta. A entrega neste aparelho não está confirmada.",
	permission: "Permissão do navegador",
	denied: "Notificações bloqueadas. Permita nas configurações deste site no navegador e tente de novo.",
	unsupported: "Este navegador não oferece permissão para notificações aqui.",
	ios: "No iPhone ou iPad, abra este site no Safari, toque em Compartilhar, escolha Adicionar à Tela de Início e abra o app instalado para ativar notificações.",
	install: "Instale o vibebook no celular",
	how: "Como instalar",
	installNow: "Instalar o app",
	android: "Abra o menu do navegador e escolha Instalar app ou Adicionar à tela inicial. Abra pelo ícone e ative as notificações.",
	benefits: "Receba avisos quando alguém te marcar ou seu agent pedir permissão; abra o app pela tela inicial.",
	waiting: "Aguardando confirmação. Uma mudança de assinatura em andamento não foi desfeita. Tentar de novo espera ela terminar.",
	failed: "Não consegui configurar notificações. Confira a permissão e a conexão e tente de novo.",
	unavailable: "As notificações push não estão configuradas neste servidor.",
	storage: "O navegador não salvou a preferência. Ela vale só nesta aba.",
	help: "Configurações de notificações e instalação",
	on: "Notificações ligadas: clique para silenciar",
	off: "Notificações silenciadas: clique para ligar",
	working: "Atualizando notificações…",
	steps: "Passos para instalar"
}, Gu = (e, t, n) => (e.startsWith("en") ? Uu[t] : Wu[t]).replace("{n}", String(n ?? 0)), Ku = (e) => e.startsWith("en") ? "Notification cleanup on this device was not confirmed. Signing out will continue. Check this site's notification permission in browser settings if needed." : "A limpeza das notificações neste aparelho não foi confirmada. Você continuará saindo. Se precisar, confira a permissão de notificações deste site nas configurações do navegador.", qu = (e) => e.startsWith("en") ? "Sign-out was not confirmed. The app will reload to check your session before updating notification settings." : "A saída não foi confirmada. O app vai recarregar para conferir sua sessão antes de atualizar as configurações de notificações.", Ju = (e, t) => (e.startsWith("en") ? {
	default: "Not requested",
	granted: "Allowed",
	denied: "Blocked",
	unsupported: "Unavailable"
} : {
	default: "Não solicitada",
	granted: "Permitida",
	denied: "Bloqueada",
	unsupported: "Indisponível"
})[t], Yu = z("<p class=\"tw:m-0 tw:leading-6\"> </p>"), Xu = z("<p class=\"tw:m-0\"> </p>"), Zu = z("<p role=\"status\" class=\"tw:m-0\"> </p>"), Qu = z("<p role=\"alert\" class=\"tw:m-0 tw:text-destructive\"> </p>"), $u = z("<p role=\"alert\" class=\"tw:m-0\"> </p>"), ed = z("<p role=\"status\" class=\"tw:m-0 tw:text-muted-foreground\"> </p>"), td = z("<p class=\"tw:m-0\"> </p> <!> <label class=\"tw:flex tw:items-center tw:gap-2\"><input type=\"checkbox\"/> </label> <!> <!> <!> <!> <div class=\"tw:flex tw:flex-wrap tw:gap-2\"><!><!></div> <!> <details class=\"tw:space-y-2\"><summary class=\"tw:cursor-pointer tw:rounded-control tw:focus-visible:outline-2 tw:focus-visible:outline-ring\"> </summary> <p class=\"tw:m-0 tw:leading-6\"> </p></details>", 1), nd = z("<span data-vb-native=\"\" data-native-notifications=\"\" class=\"tw:inline-flex tw:items-center tw:gap-1 tw:font-sans tw:text-sm tw:text-foreground\"><!> <!></span> <!>", 1);
function rd(i, o) {
	D(o, !0);
	let l = () => ye(m(g), "$view", p), u = () => ye(m(_), "$push", p), [p, h] = xe(), g = w(() => o.owner.state), _ = w(() => o.owner.push), v = e(!1), y = !0;
	de(() => {
		y = !1;
	});
	let b = (e) => y && e.currentTarget instanceof Element && e.currentTarget.isConnected, x = (e, t) => Gu(o.lang, e, t), C = w(() => l().permission === "granted" ? x(l().muted ? "off" : "on") : x("enable"));
	var T = nd(), E = a(T), O = s(E);
	V(O, {
		variant: "ghost",
		size: "sm",
		get "aria-label"() {
			return m(C);
		},
		get title() {
			return m(C);
		},
		onclick: (e) => {
			y && e.currentTarget.isConnected && o.owner.bell().then((e) => {
				y && !e && f(v, !0);
			});
		},
		children: (e, t) => {
			{
				let t = w(() => l().muted ? "bellOff" : "bell");
				Dt(e, { get name() {
					return m(t);
				} });
			}
		},
		$$slots: { default: !0 }
	});
	var k = n(O, 2);
	{
		let e = w(() => x("help")), t = w(() => x("help"));
		V(k, {
			variant: "ghost",
			size: "sm",
			get "aria-label"() {
				return m(e);
			},
			get title() {
				return m(t);
			},
			onclick: (e) => {
				b(e) && (f(v, !0), o.owner.refresh());
			},
			children: (e, t) => {
				r();
				var n = I("⋯");
				B(e, n);
			},
			$$slots: { default: !0 }
		});
	}
	S(E);
	var A = n(E, 2);
	{
		let e = w(() => x("settings")), t = w(() => x("close"));
		Ot(A, {
			get title() {
				return m(e);
			},
			get closeLabel() {
				return m(t);
			},
			get open() {
				return m(v);
			},
			set open(e) {
				f(v, e, !0);
			},
			children: (e, t) => {
				var i = td(), f = a(i), p = d(f), h = n(f, 2), g = (e) => {
					var t = Yu(), n = d(t, !0);
					c((e) => U(n, e), [() => x("ios")]), B(e, t);
				}, _ = (e) => {
					var t = Yu(), n = d(t, !0);
					c((e) => U(n, e), [() => x("denied")]), B(e, t);
				}, v = (e) => {
					var t = Xu(), n = d(t, !0);
					c((e) => U(n, e), [() => x("unsupported")]), B(e, t);
				}, C = (e) => {
					V(e, {
						onclick: (e) => {
							y && e.currentTarget.isConnected && o.owner.bell();
						},
						children: (e, t) => {
							r();
							var n = I();
							c((e) => U(n, e), [() => x("enable")]), B(e, n);
						},
						$$slots: { default: !0 }
					});
				};
				L(h, (e) => {
					l().iosWeb ? e(g) : l().permission === "denied" ? e(_, 1) : l().permission === "unsupported" ? e(v, 2) : l().permission === "default" && e(C, 3);
				});
				var T = n(h, 2), E = s(T);
				ae(E);
				var D = n(E, 1, !0);
				S(T);
				var O = n(T, 2), k = (e) => {
					var t = Zu(), n = d(t, !0);
					c((e) => U(n, e), [() => x("working")]), B(e, t);
				};
				L(O, (e) => {
					u().status === "working" && e(k);
				});
				var A = n(O, 2), j = (e) => {
					var t = Zu(), n = d(t, !0);
					c((e) => U(n, e), [() => x("unavailable")]), B(e, t);
				};
				L(A, (e) => {
					u().status === "unavailable" && e(j);
				});
				var M = n(A, 2), N = (e) => {
					var t = Qu(), n = d(t, !0);
					c((e) => U(n, e), [() => x("waiting")]), B(e, t);
				}, ee = (e) => {
					var t = Qu(), n = d(t, !0);
					c((e) => U(n, e), [() => x("failed")]), B(e, t);
				};
				L(M, (e) => {
					u().status === "unconfirmed" ? e(N) : (u().error || l().error && l().error !== "storage") && e(ee, 1);
				});
				var P = n(M, 2), F = (e) => {
					var t = $u(), n = d(t, !0);
					c((e) => U(n, e), [() => x("storage")]), B(e, t);
				};
				L(P, (e) => {
					l().error === "storage" && e(F);
				});
				var ne = n(P, 2), re = s(ne);
				V(re, {
					variant: "outline",
					onclick: (e) => {
						b(e) && o.owner.retry();
					},
					children: (e, t) => {
						r();
						var n = I();
						c((e) => U(n, e), [() => x("retry")]), B(e, n);
					},
					$$slots: { default: !0 }
				});
				var R = n(re);
				{
					let e = w(() => l().permission !== "granted" || l().muted || u().status !== "on");
					V(R, {
						variant: "outline",
						get loading() {
							return l().testing;
						},
						get disabled() {
							return m(e);
						},
						onclick: (e) => {
							b(e) && o.owner.test();
						},
						children: (e, t) => {
							r();
							var n = I();
							c((e) => U(n, e), [() => x("test")]), B(e, n);
						},
						$$slots: { default: !0 }
					});
				}
				S(ne);
				var ie = n(ne, 2), z = (e) => {
					var t = ed(), n = d(t, !0);
					c((e) => U(n, e), [() => x("sent", l().sent)]), B(e, t);
				};
				L(ie, (e) => {
					l().sent !== null && e(z);
				});
				var oe = n(ie, 2), se = s(oe), ce = d(se, !0), le = n(se, 2), ue = d(le, !0);
				S(oe), c((e, t, n, r, i) => {
					U(p, `${e ?? ""}: ${t ?? ""}`), Ee(E, l().muted), U(D, n), U(ce, r), U(ue, i);
				}, [
					() => x("permission"),
					() => Ju(o.lang, l().permission),
					() => x("mute"),
					() => x("steps"),
					() => l().ios ? x("ios") : x("android")
				]), te("change", E, (e) => {
					b(e) && o.owner.mute(e.currentTarget.checked);
				}), B(e, i);
			},
			$$slots: { default: !0 }
		});
	}
	B(i, T), t(), h();
}
Se(["change"]);
// svelte/features/pwa/InstallCard.svelte
var id = z("<p role=\"status\" class=\"tw:m-0 tw:leading-6\"> </p>"), ad = z("<p role=\"alert\" class=\"tw:text-destructive\"> </p>"), od = z("<section data-vb-native=\"\" data-native-install=\"\" class=\"tw:mb-4 tw:space-y-3 tw:rounded-surface tw:border tw:border-border tw:bg-card tw:p-4 tw:font-sans tw:text-sm tw:text-foreground\"><div class=\"tw:flex tw:items-center tw:gap-3\"><img src=\"/icon-192.png\" alt=\"\" class=\"tw:size-10 tw:rounded-control\"/><!><!></div> <p class=\"tw:m-0 tw:text-muted-foreground\"> </p> <!> <!> <!></section>");
function sd(e, i) {
	D(i, !0);
	let o = () => ye(m(f), "$view", l), [l, u] = xe(), f = w(() => i.owner.state), p = !0;
	de(() => {
		p = !1;
	});
	let h = (e) => p && e.currentTarget instanceof Element && e.currentTarget.isConnected, g = (e) => Gu(i.lang, e);
	var _ = P(), v = a(_), y = (e) => {
		var t = od(), a = s(t), l = n(s(a));
		St(l, {
			class: "tw:flex-1 tw:text-lg",
			children: (e, t) => {
				r();
				var n = I();
				c((e) => U(n, e), [() => g("install")]), B(e, n);
			},
			$$slots: { default: !0 }
		});
		var u = n(l);
		{
			let e = w(() => g("close"));
			mt(u, {
				icon: "close",
				get label() {
					return m(e);
				},
				onclick: (e) => {
					h(e) && i.owner.dismissInstall();
				}
			});
		}
		S(a);
		var f = n(a, 2), p = d(f, !0), _ = n(f, 2), v = (e) => {
			V(e, {
				get loading() {
					return o().installBusy;
				},
				onclick: (e) => {
					h(e) && i.owner.install();
				},
				children: (e, t) => {
					r();
					var n = I();
					c((e) => U(n, e), [() => o().canInstall ? g("installNow") : g("how")]), B(e, n);
				},
				$$slots: { default: !0 }
			});
		};
		L(_, (e) => {
			(!o().ios || o().safari) && e(v);
		});
		var y = n(_, 2), b = (e) => {
			var t = id(), n = d(t, !0);
			c((e) => U(n, e), [() => o().ios ? g("ios") : g("android")]), B(e, t);
		};
		L(y, (e) => {
			(o().steps || o().ios && !o().safari) && e(b);
		});
		var x = n(y, 2), C = (e) => {
			var t = ad(), n = d(t, !0);
			c((e) => U(n, e), [() => g("failed")]), B(e, t);
		};
		L(x, (e) => {
			o().error === "install" && e(C);
		}), S(t), c((e) => U(p, e), [() => g("benefits")]), B(e, t);
	};
	L(v, (e) => {
		!o().standalone && !o().dismissed && o().coarse && e(y);
	}), B(e, _), t(), u();
}
// svelte/features/home/model.ts
var cd = (e) => [...e].sort((e, t) => (e.position ?? 1e9) - (t.position ?? 1e9) || (e.created_at ?? 0) - (t.created_at ?? 0)), ld = (e) => [...e].sort((e, t) => (t.opened_at ?? 0) - (e.opened_at ?? 0) || (t.updated_at ?? 0) - (e.updated_at ?? 0)), ud = (e, t = 0) => e.last_human_id > Math.max(e.read_id, t) ? "human" : e.last_agent_id > Math.max(e.read_id, t) ? "agent" : null;
function dd(e, t) {
	let n = e?.email === t ? e.avatar : e?.friends.find((e) => e.email === t)?.avatar;
	return n ? `/api/avatar/${encodeURIComponent(t)}?v=${n}` : void 0;
}
var fd = (e) => (e.members ?? "").split(",").filter(Boolean), pd = (e) => e.icon ? `/api/books/${encodeURIComponent(e.id)}/icon?v=${e.icon}` : void 0, md = (e) => ((e ?? "").trim().split(/\s+/).slice(0, 2).map((e) => Array.from(e)[0] ?? "").join("") || "v").toLocaleUpperCase(), hd = (e) => e.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase(), gd = (e, t) => cd(e).filter((e) => !t || hd(e.title ?? "").includes(hd(t)) || hd(e.folder ?? "").includes(hd(t))).slice(0, 12), _d = (e) => {
	if (e === void 0) return;
	let t = Number(e);
	return Number.isSafeInteger(t) && t > 0 ? t : void 0;
};
function vd(e) {
	let t = new URLSearchParams({ ui: "svelte" });
	return e.thread && e.thread !== "main" && t.set("t", e.thread), `/b/${encodeURIComponent(e.roomId)}?${t}${e.fileId ? "#f" + encodeURIComponent(e.fileId) : e.messageId ? "#m" + e.messageId : e.document ? "#doc" : ""}`;
}
function yd(e) {
	let t = /^[mab](\d+)$/.exec(e.ref)?.[1];
	return {
		roomId: e.book_id,
		thread: e.thread,
		messageId: _d(t)
	};
}
var bd = (e) => ({
	roomId: e.room_id,
	thread: e.thread,
	messageId: _d(e.id)
}), xd = (e) => ({
	roomId: e.room_id,
	thread: e.id
});
function Sd(e) {
	return [
		...e.pick ? [e.pick] : [],
		...e.alternatives,
		{
			book_id: null,
			epic_id: null,
			book_title: e.new_room_title,
			epic_title: null
		}
	];
}
var Cd = {
	blue: "tw:bg-primary/15 tw:text-primary",
	green: "tw:bg-success/15 tw:text-foreground",
	yellow: "tw:bg-warning/15 tw:text-foreground",
	orange: "tw:bg-warning/25 tw:text-foreground",
	pink: "tw:bg-destructive/15 tw:text-foreground",
	purple: "tw:bg-secondary tw:text-secondary-foreground",
	none: "tw:bg-muted tw:text-foreground"
}, wd = (e) => Cd[e.tint && Object.hasOwn(Cd, e.tint) ? e.tint : "none"];
// svelte/features/home/ownership.ts
function Td(e, t, n) {
	let r = Vt(t), i = T(e.state).identityRevision, a = !1, o = e.state.subscribe((e) => {
		!a && e.identityRevision !== i && (a = !0, r.dispose(), n());
	});
	return {
		...r,
		dispose() {
			o(), r.dispose();
		}
	};
}
// svelte/features/home/session.ts
var Ed = (e) => e instanceof Error ? e.message : "network", Dd = (e) => {
	if (!/^[a-z0-9]{6,40}$/.test(e)) throw Error("invalid-response");
	return e;
};
function Od(e, t, n = Ft) {
	let r = v({
		busy: "",
		error: "",
		result: null,
		selected: 0,
		source: ""
	}), i = Td(e, n, () => {
		r.set({
			busy: "",
			error: "",
			result: null,
			selected: 0,
			source: ""
		});
	}), a = (e) => r.update((t) => ({
		...t,
		busy: "",
		error: Ed(e)
	}));
	return {
		state: r,
		edit(t) {
			i.active() && (e.editAsk(t), T(r).busy === "route" && i.cancel(), r.update((e) => ({
				...e,
				busy: e.busy === "send" ? "send" : "",
				result: null,
				error: ""
			})));
		},
		suggest() {
			if (!i.active() || T(r).busy) return;
			let t = T(e.draft).ask.trim();
			if (t) return r.update((e) => ({
				...e,
				busy: "route",
				error: "",
				result: null,
				source: t
			})), i.run((n) => e.api.route(t, n), (e) => r.update((t) => ({
				...t,
				busy: "",
				result: e,
				selected: 0
			})), a);
		},
		select(e) {
			let t = T(r);
			i.active() && t.result && !t.busy && e >= 0 && e < Sd(t.result).length && r.update((t) => ({
				...t,
				selected: e
			}));
		},
		cancel() {
			i.active() && T(r).busy !== "send" && (i.cancel(), r.update((e) => ({
				...e,
				busy: "",
				result: null,
				error: ""
			})));
		},
		send() {
			let n = T(r), o = T(e.draft).ask.trim();
			if (!i.active() || n.busy || !n.result || o !== n.source) return;
			let s = Sd(n.result)[n.selected];
			if (s) {
				if (s.book_id && !T(e.state).me?.books.some((e) => e.id === s.book_id)) a(Error("unavailable"));
				else return r.update((e) => ({
					...e,
					busy: "send",
					error: ""
				})), i.run(async (t) => {
					if (!s.book_id) {
						let n = await e.api.startRoom(o, t);
						return {
							id: Dd(n.id),
							unknown: n.unknown,
							thread: void 0
						};
					}
					let n = await e.api.post(s.book_id, o, s.epic_id ?? "main");
					if (!n.ok) throw Error(n.error);
					return {
						id: Dd(s.book_id),
						unknown: [],
						thread: n.thread === "main" ? void 0 : n.thread
					};
				}, (n) => {
					T(e.draft).ask.trim() === o && e.editAsk(""), n.unknown.length && e.notice(n.id, n.unknown), t({
						roomId: n.id,
						thread: n.thread
					});
				}, a);
			}
		},
		dispose() {
			i.dispose();
		}
	};
}
function kd(e, t, n = Ft) {
	let r = v({
		open: !1,
		busy: !1,
		error: ""
	}), i = Vt(n), a = !0, o = T(e.state).identityRevision, s = e.state.subscribe((e) => {
		e.identityRevision !== o && (o = e.identityRevision, i.dispose(), r.set({
			open: !1,
			busy: !1,
			error: ""
		}));
	});
	return {
		state: r,
		open() {
			a && !T(r).open && (i.dispose(), i = Vt(n), r.set({
				open: !0,
				busy: !1,
				error: ""
			}));
		},
		edit(t) {
			T(r).open && e.editCreate(t);
		},
		close() {
			i.dispose(), r.update((e) => ({
				...e,
				open: !1,
				busy: !1
			}));
		},
		submit() {
			if (!i.active() || T(r).busy || !T(r).open) return;
			let n = T(e.draft).create.trim();
			if (!n) r.update((e) => ({
				...e,
				error: "empty"
			}));
			else return r.update((e) => ({
				...e,
				busy: !0,
				error: ""
			})), i.run((t) => e.api.startRoom(n, t), (i) => {
				let a = Dd(i.id);
				T(e.draft).create.trim() === n && e.editCreate(""), i.unknown.length && e.notice(a, i.unknown), r.set({
					open: !1,
					busy: !1,
					error: ""
				}), t({ roomId: a });
			}, (e) => r.update((t) => ({
				...t,
				busy: !1,
				error: Ed(e)
			})));
		},
		dispose() {
			s(), a = !1, i.dispose();
		}
	};
}
function Ad(e, t = Ft) {
	let n = v({
		books: [],
		loaded: !1,
		loading: !1,
		pending: null,
		error: ""
	}), r = Vt(t), i = Vt(t), a = !0, o = 0, s = [], c = () => {
		for (let e of s) t.cancel(e);
		s = [];
	}, l = T(e.state).identityRevision, u = e.state.subscribe((e) => {
		a && e.identityRevision !== l && (a = !1, o++, c(), r.dispose(), i.dispose(), n.set({
			books: [],
			loaded: !1,
			loading: !1,
			pending: null,
			error: ""
		}));
	}), d = (e) => n.update((t) => ({
		...t,
		loading: !1,
		error: Ed(e)
	}));
	function f(e) {
		let t = T(n).pending, r = !!t && !e.books.some((e) => e.id === t);
		r && (o++, c(), i.cancel()), n.update((t) => ({
			...t,
			books: e.books,
			loaded: !0,
			loading: !1,
			...r ? {
				pending: null,
				error: ""
			} : {}
		}));
	}
	async function p() {
		if (a) return r.cancel(), n.update((e) => ({
			...e,
			loading: !0,
			error: ""
		})), r.run((t) => e.api.archived(t), f, d);
	}
	return {
		state: n,
		load: p,
		restore(l) {
			if (!a || T(n).pending || !T(n).books.some((e) => e.id === l)) return;
			let u = ++o;
			return c(), n.update((e) => ({
				...e,
				pending: l,
				error: ""
			})), i.run((t) => e.api.archive(l, !1, t), () => {
				e.refresh();
				let i = async () => {
					a && u === o && (r.cancel(), await r.run((t) => e.api.archived(t), (e) => {
						a && u === o && f(e);
					}, () => {}));
				};
				i();
				for (let e of [
					1e3,
					3e3,
					6e3
				]) s.push(t.schedule(() => {
					i();
				}, e));
				s.push(t.schedule(() => {
					a && u === o && T(n).pending === l && (c(), n.update((e) => ({
						...e,
						pending: null,
						error: "unconfirmed"
					})));
				}, 1e4));
			}, (e) => n.update((t) => ({
				...t,
				pending: null,
				error: Ed(e)
			})));
		},
		dispose() {
			u(), a = !1, o++, c(), r.dispose(), i.dispose();
		}
	};
}
// svelte/features/home/copy.ts
var jd = {
	home: "Seus vibebooks",
	greeting: "Oi, {name}",
	rooms: "{n} vibebooks",
	friends: "Amigos",
	archive: "Arquivo",
	back: "Voltar",
	new: "Novo vibebook",
	newShort: "Novo",
	profile: "Seu perfil",
	settings: "Conta e configurações",
	agentSettings: "Seu agent",
	manageFriends: "Gerenciar amigos",
	theme: "Tema",
	language: "Idioma",
	search: "Ir para um vibebook",
	searchPlaceholder: "Buscar salas, conversas e arquivos…",
	searching: "Buscando nas conversas…",
	noMatches: "Nada com esse nome.",
	noConversations: "Nada nas conversas.",
	epics: "Épicos",
	conversations: "Nas conversas",
	partial: "Algumas salas não puderam ser consultadas. Tente de novo.",
	empty: "Nenhum vibebook ainda. Crie um, chame quem trabalha com você e conecte seu agent.",
	summary: "Ainda sem resumo. O @vibe escreve um quando a conversa andar.",
	ask: "O que você quer resolver?",
	askPlaceholder: "Um pedido, uma ideia, uma tarefa pra alguém… eu acho a sala e o épico certos.",
	find: "Achar a sala →",
	finding: "Procurando a sala certa…",
	send: "Enviar",
	sending: "Enviando…",
	cancel: "Cancelar",
	another: "Outro lugar:",
	newDestination: "Sala nova “{title}”",
	destination: "Mandar em {where}?",
	createDestination: "Criar “{title}”?",
	noDestination: "Nenhuma sala parece a certa. Criar “{title}”?",
	createLabel: "O que é e com quem?",
	createPlaceholder: "Ex.: viagem de avião pra SP com os dogs, eu e a Alexia",
	createHelp: "Vira o título da sala e a primeira mensagem. Quem você citar é convidado, e seu agent já liga na sala.",
	create: "Criar",
	creating: "Criando…",
	unknown: "Não achei {who} nos seus amigos: convide pelo email em Pessoas.",
	dismiss: "Fechar aviso",
	close: "Fechar",
	retry: "Tentar novamente",
	loading: "Carregando…",
	refreshing: "Atualizando…",
	network: "Não deu para concluir. Tente novamente.",
	unconfirmed: "Ainda não recebi a confirmação. Confira antes de tentar de novo.",
	emptyText: "Escreva o que é e com quem.",
	unavailable: "Essa sala não está mais disponível. Escolha outra sala.",
	invalidResponse: "O servidor retornou uma resposta inválida.",
	newHuman: "mensagens novas",
	newAgent: "agents escreveram",
	busy: "um agent está trabalhando aqui",
	cloud: "sandbox na nuvem rodando",
	waiting: "{n} esperando você",
	more: "+{n} mais",
	resolve: "Já resolvi (respondi em outro lugar, ou não é comigo)",
	taskWait: "sua tarefa esperando OK",
	asked: "{who} pediu",
	main: "sala principal",
	roomSettings: "Configurações de {title}",
	archiveTitle: "Arquivar “{title}”?",
	archiveHelp: "Sai da sua lista e do inbox do seu agent e vai pro Arquivo. Nada é apagado: quem mais está na sala continua vendo, e você restaura quando quiser.",
	archiveAction: "Arquivar",
	restore: "Restaurar",
	archived: "Salas que você arquivou. Elas continuam existindo pra quem está nelas.",
	noArchived: "Nada arquivado.",
	open: "Abrir",
	archivedAgo: "arquivada {ago}",
	tint: "Cor na sua lista",
	none: "Sem cor",
	blue: "Azul",
	green: "Verde",
	yellow: "Amarelo",
	orange: "Laranja",
	pink: "Rosa",
	purple: "Roxo",
	icon: "Trocar ícone",
	removeIcon: "Tirar ícone",
	moveUp: "Mover para cima",
	moveDown: "Mover para baixo",
	rename: "Renomear sala",
	name: "Nome da sala",
	save: "Salvar",
	addName: "Como seus amigos te chamam?",
	addPhoto: "Coloque sua foto",
	setup: "Conecte seu agent",
	setupHelp: "Cole isto no Claude Code, dentro da pasta do projeto. Ele instala, conecta e passa a acompanhar suas salas.",
	copy: "Copiar",
	copied: "Copiado",
	copyFailed: "Não consegui copiar. Selecione a instrução e copie.",
	connected: "Seu agent conectou.",
	accountError: "Usando os dados anteriores. Tente atualizar de novo.",
	menu: "Menu",
	update: "Nova versão do vibebook · toque pra atualizar"
}, Md = {
	home: "Your vibebooks",
	greeting: "Hi, {name}",
	rooms: "{n} vibebooks",
	friends: "Friends",
	archive: "Archive",
	back: "Back",
	new: "New vibebook",
	newShort: "New",
	profile: "Your profile",
	settings: "Account and settings",
	agentSettings: "Your agent",
	manageFriends: "Manage friends",
	theme: "Theme",
	language: "Language",
	search: "Go to a vibebook",
	searchPlaceholder: "Search rooms, conversations and files…",
	searching: "Searching conversations…",
	noMatches: "No rooms with that name.",
	noConversations: "Nothing in conversations.",
	epics: "Epics",
	conversations: "In conversations",
	partial: "Some rooms could not be searched. Try again.",
	empty: "No vibebooks yet. Create one, invite your team and connect your agent.",
	summary: "No summary yet. @vibe will write one when the conversation gets going.",
	ask: "What do you want to work on?",
	askPlaceholder: "A request, an idea, a task for someone… I will find the right room and epic.",
	find: "Find the room →",
	finding: "Finding the right room…",
	send: "Send",
	sending: "Sending…",
	cancel: "Cancel",
	another: "Another place:",
	newDestination: "New room “{title}”",
	destination: "Send to {where}?",
	createDestination: "Create “{title}”?",
	noDestination: "No room seems right. Create “{title}”?",
	createLabel: "What is it, and with whom?",
	createPlaceholder: "E.g. a flight to SP with the dogs, Alexia and me",
	createHelp: "Becomes the room title and first message. People you mention are invited, and your agent is enabled for the room.",
	create: "Create",
	creating: "Creating…",
	unknown: "Couldn't find {who} among your friends: invite them by email in People.",
	dismiss: "Dismiss notice",
	close: "Close",
	retry: "Try again",
	loading: "Loading…",
	refreshing: "Updating…",
	network: "Couldn't finish. Try again.",
	unconfirmed: "We haven't received confirmation yet. Check before trying again.",
	emptyText: "Write what it is and with whom.",
	unavailable: "That room is no longer available. Choose another room.",
	invalidResponse: "The server returned an invalid response.",
	newHuman: "new messages",
	newAgent: "agents posted",
	busy: "an agent is working here",
	cloud: "cloud sandbox running",
	waiting: "{n} waiting for you",
	more: "+{n} more",
	resolve: "Already handled (answered elsewhere, or not for me)",
	taskWait: "your task awaiting approval",
	asked: "{who} asked",
	main: "main room",
	roomSettings: "Settings for {title}",
	archiveTitle: "Archive “{title}”?",
	archiveHelp: "Leaves your list and your agent inbox and goes to Archive. Nothing is deleted: others in the room still see it, and you can restore it anytime.",
	archiveAction: "Archive",
	restore: "Restore",
	archived: "Rooms you archived. They still exist for their other members.",
	noArchived: "Nothing archived.",
	open: "Open",
	archivedAgo: "archived {ago}",
	tint: "Color in your list",
	none: "No color",
	blue: "Blue",
	green: "Green",
	yellow: "Yellow",
	orange: "Orange",
	pink: "Pink",
	purple: "Purple",
	icon: "Change icon",
	removeIcon: "Remove icon",
	moveUp: "Move up",
	moveDown: "Move down",
	rename: "Rename room",
	name: "Room name",
	save: "Save",
	addName: "What do your friends call you?",
	addPhoto: "Add your photo",
	setup: "Connect your agent",
	setupHelp: "Paste this into Claude Code inside the project folder. It installs, connects and starts following your rooms.",
	copy: "Copy",
	copied: "Copied",
	copyFailed: "Couldn't copy. Select the instruction and copy it.",
	connected: "Your agent connected.",
	accountError: "Showing earlier data. Try refreshing again.",
	menu: "Menu",
	update: "New vibebook version · tap to update"
}, Nd = (e, t, n = {}) => (e === "en" ? Md[t] : jd[t]).replace(/\{(\w+)\}/g, (e, t) => String(n[t] ?? ""));
function Pd(e, t) {
	let n = {
		network: "network",
		timeout: "unconfirmed",
		unconfirmed: "unconfirmed",
		empty: "emptyText",
		unavailable: "unavailable",
		"invalid-response": "invalidResponse"
	};
	return Object.hasOwn(n, t) ? Nd(e, n[t]) : t;
}
// svelte/features/home/RoomTile.svelte
var Fd = z("<img alt=\"\" loading=\"lazy\" class=\"tw:size-full tw:object-cover\"/>"), Id = z("<span role=\"img\">●</span>"), Ld = z("<span role=\"img\" class=\"tw:absolute tw:bottom-0 tw:left-1 tw:text-primary tw:motion-safe:animate-spin\">✻</span>"), Rd = z("<span role=\"img\" class=\"tw:absolute tw:bottom-0 tw:right-1 tw:text-warning\">☁</span>"), zd = z("<b class=\"tw:break-words tw:pr-8 tw:text-base tw:font-semibold\"> </b> <p class=\"tw:m-0 tw:line-clamp-3 tw:break-words tw:text-sm tw:text-muted-foreground\"> </p>", 1), Bd = z("<article><a><span><!> <!> <!> <!></span> <!> <!></a> <!></article>");
function Vd(e, i) {
	D(i, !0);
	let o = H(i, "seen", 3, 0), l = H(i, "waits", 3, 0), u = H(i, "compact", 3, !1), f = H(i, "selected", 3, !1), p = w(() => ud(i.room, o())), h = w(() => i.room.title ?? "vibebook"), g = (e, t) => Nd(i.lang, e, t), _ = w(() => [
		m(h),
		m(p) ? g(m(p) === "human" ? "newHuman" : "newAgent") : "",
		(i.room.busy_until ?? 0) > i.now ? g("busy") : "",
		i.room.sandboxes_running ? g("cloud") : "",
		l() ? g("waiting", { n: l() }) : ""
	].filter(Boolean).join(" · "));
	var v = Bd(), y = s(v), b = s(y), x = s(b), C = (e) => {
		var t = Fd();
		c((e) => A(t, "src", e), [() => pd(i.room)]), B(e, t);
	}, T = w(() => pd(i.room)), E = (e) => {
		var t = I();
		c((e) => U(t, e), [() => md(m(h))]), B(e, t);
	};
	L(x, (e) => {
		m(T) ? e(C) : e(E, -1);
	});
	var O = n(x, 2), k = (e) => {
		var t = Id();
		c((e) => {
			A(t, "aria-label", e), M(t, 1, j(m(p) === "human" ? "tw:absolute tw:right-1 tw:top-0 tw:text-primary" : "tw:absolute tw:right-1 tw:top-0 tw:text-warning"));
		}, [() => g(m(p) === "human" ? "newHuman" : "newAgent")]), B(e, t);
	};
	L(O, (e) => {
		m(p) && e(k);
	});
	var N = n(O, 2), ee = (e) => {
		var t = Ld();
		c((e) => A(t, "aria-label", e), [() => g("busy")]), B(e, t);
	};
	L(N, (e) => {
		(i.room.busy_until ?? 0) > i.now && e(ee);
	});
	var P = n(N, 2), F = (e) => {
		var t = Rd();
		c((e) => A(t, "aria-label", e), [() => g("cloud")]), B(e, t);
	};
	L(P, (e) => {
		i.room.sandboxes_running && e(F);
	}), S(b);
	var ne = n(b, 2), re = (e) => {
		var t = zd(), r = a(t), o = d(r, !0), s = n(r, 2), l = d(s, !0);
		c((e) => {
			U(o, m(h)), U(l, e);
		}, [() => i.room.summary || g("summary")]), B(e, t);
	};
	L(ne, (e) => {
		u() || e(re);
	});
	var R = n(ne, 2), ie = (e) => {
		{
			let t = w(() => u() ? "tw:absolute tw:-bottom-1 tw:-right-1" : "");
			ct(e, {
				get class() {
					return m(t);
				},
				children: (e, t) => {
					r();
					var n = I();
					c((e) => U(n, e), [() => u() ? l() : g("waiting", { n: l() })]), B(e, n);
				},
				$$slots: { default: !0 }
			});
		}
	};
	L(R, (e) => {
		l() && e(ie);
	}), S(y);
	var ae = n(y, 2), z = (e) => {
		{
			let t = w(() => g("roomSettings", { title: m(h) }));
			mt(e, {
				icon: "chevronDown",
				get label() {
					return m(t);
				},
				class: "tw:absolute tw:right-2 tw:top-2",
				onclick: (e) => {
					e.currentTarget.isConnected && i.onsettings?.(i.room.id, e.currentTarget);
				}
			});
		}
	};
	L(ae, (e) => {
		i.onsettings && !u() && e(z);
	}), S(v), c((e, t) => {
		A(v, "data-room-id", i.room.id), M(v, 1, j(u() ? "tw:relative tw:flex tw:items-center tw:justify-center" : "tw:relative tw:min-w-0 tw:rounded-surface tw:border tw:border-border tw:bg-card tw:p-4 tw:shadow-xs")), A(v, "draggable", !!i.ondragstart), A(y, "href", e), A(y, "aria-label", m(_)), A(y, "aria-current", f() ? "page" : void 0), M(y, 1, j(u() ? "tw:aria-[current=page]:ring-2 tw:aria-[current=page]:ring-primary tw:aria-[current=page]:ring-offset-2 tw:aria-[current=page]:ring-offset-background tw:relative tw:flex tw:size-12 tw:shrink-0 tw:items-center tw:justify-center tw:rounded-control tw:outline-none tw:focus-visible:ring-2 tw:focus-visible:ring-ring" : "tw:flex tw:min-w-0 tw:flex-col tw:gap-3 tw:rounded-control tw:text-foreground tw:no-underline tw:outline-none tw:focus-visible:ring-2 tw:focus-visible:ring-ring")), M(b, 1, t);
	}, [() => vd({ roomId: i.room.id }), () => j([
		u() ? "tw:size-11" : "tw:h-28 tw:w-full",
		"tw:relative tw:inline-grid tw:place-items-center tw:overflow-hidden tw:rounded-control tw:text-xl tw:font-semibold",
		wd(i.room)
	])]), se("dragstart", v, (e) => {
		e.currentTarget.isConnected && i.ondragstart?.(e);
	}), se("dragover", v, (e) => {
		e.currentTarget.isConnected && i.ondragover?.(e);
	}), se("dragleave", v, (e) => {
		e.currentTarget.isConnected && i.ondragleave?.(e);
	}), se("drop", v, (e) => {
		e.currentTarget.isConnected && i.ondrop?.(e);
	}), te("contextmenu", v, (e) => {
		e.currentTarget.isConnected && i.onsettings && (e.preventDefault(), i.onsettings(i.room.id, e.currentTarget.querySelector("a") ?? e.currentTarget));
	}), te("click", y, (e) => {
		!e.currentTarget.isConnected || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey || e.button !== 0 || (e.preventDefault(), i.onnavigate({ roomId: i.room.id }));
	}), B(e, v), t();
}
Se(["contextmenu", "click"]);
// svelte/features/home/WaitList.svelte
var Hd = z("<p role=\"alert\" class=\"tw:m-0 tw:break-words tw:text-destructive\"> </p>"), Ud = z("<li class=\"tw:flex tw:items-start tw:gap-2\"><!> <a class=\"tw:min-w-0 tw:flex-1 tw:rounded-control tw:text-sm tw:text-foreground tw:no-underline tw:outline-none tw:focus-visible:ring-2 tw:focus-visible:ring-ring\"><p class=\"tw:m-0 tw:line-clamp-3 tw:break-words\"> </p> <small class=\"tw:break-words tw:text-muted-foreground\"> </small></a> <!> <!></li>"), Wd = z("<ul class=\"tw:m-0 tw:list-none tw:space-y-3 tw:p-0\"></ul>");
function Gd(e, r) {
	D(r, !0);
	let i = () => ye(m(l), "$actions", a), [a, o] = xe(), l = w(() => r.rooms.state), u = (e, t) => Nd(r.lang, e, t);
	var f = Wd();
	R(f, 21, () => r.waits, (e) => e.book_id + ":" + e.ref, (e, t) => {
		let a = w(() => `wait:${m(t).book_id}:${m(t).ref}`);
		var o = Ud(), l = s(o);
		{
			let e = w(() => m(t).author_name || m(t).author), n = w(() => dd(r.people, m(t).author));
			ut(l, {
				get name() {
					return m(e);
				},
				get src() {
					return m(n);
				}
			});
		}
		var f = n(l, 2), p = s(f), h = d(p, !0), g = n(p, 2), _ = d(g);
		S(f);
		var v = n(f, 2), y = (e) => {
			{
				let n = w(() => u("resolve")), o = w(() => !!i().pending[m(a)]);
				mt(e, {
					icon: "check",
					get label() {
						return m(n);
					},
					get disabled() {
						return m(o);
					},
					onclick: (e) => {
						e.currentTarget.isConnected && r.rooms.resolve(m(t).book_id, m(t).ref);
					}
				});
			}
		}, b = w(() => m(t).ref.startsWith("m"));
		L(v, (e) => {
			m(b) && e(y);
		});
		var x = n(v, 2), C = (e) => {
			var t = Hd(), n = d(t, !0);
			c((e) => U(n, e), [() => Pd(r.lang, i().issues[m(a)])]), B(e, t);
		};
		L(x, (e) => {
			i().issues[m(a)] && e(C);
		}), S(o), c((e, n, r, i) => {
			A(o, "data-native-wait", m(t).ref), A(f, "href", e), U(h, m(t).text), U(_, `${n ?? ""} · ${r ?? ""} · ${i ?? ""}`);
		}, [
			() => vd(yd(m(t))),
			() => m(t).ref.startsWith("t") ? u("taskWait") : u("asked", { who: (m(t).author_name || m(t).author.split("@")[0] || "").split(" ")[0] ?? "" }),
			() => m(t).topic || u("main"),
			() => r.ago(m(t).ts)
		]), te("click", f, (e) => {
			e.ctrlKey || e.metaKey || e.shiftKey || e.altKey || (e.preventDefault(), e.currentTarget.isConnected && r.onnavigate(yd(m(t))));
		}), B(e, o);
	}), S(f), B(e, f), t(), o();
}
Se(["click"]);
// svelte/features/home/HomePanel.svelte
var Kd = z("<!> ", 1), qd = z("<p role=\"status\"> </p>"), Jd = z("<p class=\"tw:m-0 tw:flex-1\"> </p> <!>", 1), Yd = z("<p> </p>"), Xd = z("<!> <p class=\"tw:m-0 tw:text-muted-foreground\"> </p> <code class=\"tw:block tw:whitespace-pre-wrap tw:break-all tw:rounded-control tw:bg-muted tw:p-3 tw:font-mono tw:text-xs\"> </code><!><!><!>", 1), Zd = z("<p class=\"tw:m-0 tw:text-muted-foreground\"> </p>"), Qd = z("<p aria-live=\"polite\" class=\"tw:m-0 tw:break-words\"> </p> <!> <div class=\"tw:flex tw:flex-wrap tw:gap-2\"><!><!></div> <p class=\"tw:m-0 tw:text-muted-foreground\"> </p> <div class=\"tw:flex tw:flex-wrap tw:gap-2\"></div>", 1), $d = z("<p role=\"alert\" class=\"tw:m-0 tw:break-words tw:text-destructive\"> </p>"), ef = z("<details><summary class=\"tw:cursor-pointer tw:p-2\"> </summary><!></details>"), tf = z("<b class=\"tw:block tw:break-words tw:text-center\"> </b>"), nf = z("<div class=\"tw:rounded-control tw:border tw:border-border tw:bg-card tw:p-3\"><!><!></div>"), rf = z("<span><!></span>"), af = z("<div class=\"tw:flex tw:flex-wrap tw:items-center tw:gap-1\"><!><small class=\"tw:text-muted-foreground\"> </small></div>"), of = z("<div class=\"tw:min-w-0 tw:space-y-3\"><!><!><!><!></div>"), sf = z("<div class=\"tw:flex tw:items-center tw:gap-2\"><!><span class=\"tw:min-w-0 tw:break-words\"> </span></div>"), cf = z("<!><!><!>", 1), lf = z("<div class=\"tw:flex tw:flex-wrap tw:items-start tw:justify-between tw:gap-3\"><div><!> <p class=\"tw:m-0 tw:text-muted-foreground\"> <a href=\"/archived?ui=svelte\" class=\"tw:text-link\"> </a><!></p></div> <!></div> <!> <!> <form class=\"tw:space-y-3\"><!><!><!> <!> <!></form> <!> <div class=\"tw:grid tw:gap-6 tw:lg:grid-cols-[minmax(0,1fr)_18rem]\"><section class=\"tw:min-w-0\"><!> <div class=\"tw:grid tw:grid-cols-3 tw:gap-3 tw:min-[721px]:grid-cols-2\"></div></section> <aside class=\"tw:space-y-4\"><!><!></aside></div>", 1), uf = z("<p role=\"alert\" class=\"tw:m-0 tw:break-words tw:text-destructive\"> </p> <!>", 1), df = z("<main data-vb-native=\"home\" class=\"tw:min-h-dvh tw:bg-background tw:p-4 tw:font-sans tw:text-sm tw:leading-6 tw:text-foreground tw:sm:p-8\"><div class=\"tw:mx-auto tw:max-w-6xl tw:space-y-6\"><header class=\"tw:flex tw:flex-wrap tw:items-center tw:justify-between tw:gap-3\"><a href=\"/\" class=\"tw:text-lg tw:font-semibold tw:text-foreground tw:no-underline\">vibebook</a> <div class=\"tw:flex tw:flex-wrap tw:gap-2\"><!><!><!><!></div></header> <!> <!> <!> <!></div></main>");
function ff(i, l) {
	D(l, !0);
	let u = () => ye(j, "$view", y), h = () => ye(m(C), "$account", y), v = () => ye(m(T), "$draft", y), [y, x] = xe(), C = w(() => l.personal.state), T = w(() => l.personal.draft), E = new tt("(max-width:720px)"), k = b(() => Od(l.personal, l.onnavigate)), j = k.state, M = (e, t) => Nd(l.lang, e, t), ee = e(null), F = w(() => u().result);
	_(() => {
		m(F) && g().then(() => {
			m(ee)?.isConnected && m(ee).focus();
		});
	});
	let ne = !1, re, ie = e("");
	de(() => k.dispose()), ve(() => {
		ne = !0, l.personal.refresh();
		let e = () => {
			ne && (h().agents?.agents.length || l.personal.refreshAgents(), re = setTimeout(e, 15e3));
		};
		return e(), () => {
			ne = !1, clearTimeout(re), k.dispose();
		};
	});
	let ae = w(() => `Read ${location.origin}/llms.txt and set up vibebook for this project.`);
	async function z() {
		try {
			if (!navigator.clipboard) throw Error("unavailable");
			await navigator.clipboard.writeText(m(ae)), ne && f(ie, "copied");
		} catch {
			ne && f(ie, "copyFailed");
		}
	}
	var oe = df();
	O("vagv2z", (e) => {
		p(() => {
			o.title = "vibebook";
		});
	});
	var ce = s(oe), le = s(ce), ue = n(s(le), 2), fe = s(ue);
	rd(fe, {
		get owner() {
			return l.pwa;
		},
		get lang() {
			return l.lang;
		}
	});
	var pe = n(fe);
	V(pe, {
		variant: "outline",
		onclick: (e) => {
			e.currentTarget.isConnected && l.onsearch();
		},
		children: (e, t) => {
			r();
			var n = I();
			c((e) => U(n, e), [() => M("search")]), B(e, n);
		},
		$$slots: { default: !0 }
	});
	var me = n(pe);
	V(me, {
		variant: "ghost",
		onclick: (e) => {
			e.currentTarget.isConnected && l.onsettings("profile");
		},
		children: (e, t) => {
			var r = Kd(), i = a(r);
			{
				let e = w(() => h().me?.name || h().me?.email || "vibebook"), t = w(() => dd(h().me, h().me?.email ?? ""));
				ut(i, {
					get name() {
						return m(e);
					},
					get src() {
						return m(t);
					}
				});
			}
			var o = n(i, 1, !0);
			c((e) => U(o, e), [() => M("profile")]), B(e, r);
		},
		$$slots: { default: !0 }
	});
	var he = n(me);
	V(he, {
		variant: "ghost",
		onclick: (e) => {
			e.currentTarget.isConnected && l.onsettings("all");
		},
		children: (e, t) => {
			r();
			var n = I();
			c((e) => U(n, e), [() => M("settings")]), B(e, n);
		},
		$$slots: { default: !0 }
	}), S(ue), S(le);
	var ge = n(le, 2);
	sd(ge, {
		get owner() {
			return l.pwa;
		},
		get lang() {
			return l.lang;
		}
	});
	var _e = n(ge, 2), Se = (e) => {
		var t = P(), n = a(t), r = (e) => {
			var t = qd(), n = d(t, !0);
			c((e) => U(n, e), [() => M("loading")]), B(e, t);
		};
		L(n, (e) => {
			h().loading && e(r);
		}), B(e, t);
	}, Ce = (e) => {
		let t = w(() => h().me);
		var i = lf(), o = a(i), p = s(o), _ = s(p);
		St(_, {
			level: 1,
			class: "tw:m-0 tw:text-2xl tw:font-semibold tw:leading-8",
			children: (e, n) => {
				r();
				var i = I();
				c((e) => U(i, e), [() => m(t).name ? M("greeting", { name: m(t).name.split(" ")[0] ?? "" }) : M("home")]), B(e, i);
			},
			$$slots: { default: !0 }
		});
		var y = n(_, 2), b = s(y), x = n(b), C = d(x, !0), T = n(x), D = (e) => {
			var n = I();
			c((e) => U(n, `· ${e ?? ""}`), [() => M("waiting", { n: m(t).waits.length })]), B(e, n);
		};
		L(T, (e) => {
			m(t).waits.length && e(D);
		}), S(y), S(p);
		var O = n(p, 2);
		V(O, {
			onclick: (e) => {
				e.currentTarget.isConnected && l.onnew(e.currentTarget);
			},
			children: (e, t) => {
				r();
				var n = I();
				c((e) => U(n, e), [() => M("new")]), B(e, n);
			},
			$$slots: { default: !0 }
		}), S(o);
		var j = n(o, 2), F = (e) => {
			Te(e, {
				class: "tw:flex tw:flex-wrap tw:items-center tw:gap-3 tw:p-3",
				children: (e, i) => {
					var o = Jd(), s = a(o), u = d(s, !0), f = n(s, 2);
					V(f, {
						variant: "outline",
						onclick: (e) => {
							e.currentTarget.isConnected && l.onsettings("profile");
						},
						children: (e, t) => {
							r();
							var n = I();
							c((e) => U(n, e), [() => M("profile")]), B(e, n);
						},
						$$slots: { default: !0 }
					}), c((e) => U(u, e), [() => m(t).name ? M("addPhoto") : M("addName")]), B(e, o);
				},
				$$slots: { default: !0 }
			});
		};
		L(j, (e) => {
			m(t).name && m(t).avatar || e(F);
		});
		var ne = n(j, 2), re = (e) => {
			Te(e, {
				children: (e, t) => {
					var i = Xd(), o = a(i);
					St(o, {
						level: 2,
						class: "tw:m-0 tw:text-lg tw:font-semibold",
						children: (e, t) => {
							r();
							var n = I();
							c((e) => U(n, e), [() => M("setup")]), B(e, n);
						},
						$$slots: { default: !0 }
					});
					var s = n(o, 2), u = d(s, !0), f = n(s, 2), p = d(f, !0), h = n(f);
					V(h, {
						onclick: z,
						children: (e, t) => {
							r();
							var n = I();
							c((e) => U(n, e), [() => M("copy")]), B(e, n);
						},
						$$slots: { default: !0 }
					});
					var g = n(h), _ = (e) => {
						var t = Yd(), n = d(t, !0);
						c((e) => {
							A(t, "role", m(ie) === "copyFailed" ? "alert" : "status"), U(n, e);
						}, [() => M(m(ie) === "copyFailed" ? "copyFailed" : "copied")]), B(e, t);
					};
					L(g, (e) => {
						m(ie) && e(_);
					});
					var v = n(g);
					V(v, {
						variant: "ghost",
						onclick: (e) => {
							e.currentTarget.isConnected && l.onsettings("agents");
						},
						children: (e, t) => {
							r();
							var n = I();
							c((e) => U(n, e), [() => M("agentSettings")]), B(e, n);
						},
						$$slots: { default: !0 }
					}), c((e) => {
						U(u, e), U(p, m(ae));
					}, [() => M("setupHelp")]), B(e, i);
				},
				$$slots: { default: !0 }
			});
		};
		L(ne, (e) => {
			h().agents && !h().agents.agents.length && e(re);
		});
		var oe = n(ne, 2), ce = s(oe);
		be(ce, {
			for: "home-ask",
			children: (e, t) => {
				r();
				var n = I();
				c((e) => U(n, e), [() => M("ask")]), B(e, n);
			},
			$$slots: { default: !0 }
		});
		var le = n(ce);
		{
			let e = w(() => M("askPlaceholder")), t = w(() => u().busy === "send");
			Tt(le, {
				id: "home-ask",
				rows: 3,
				maxlength: 2e3,
				get placeholder() {
					return m(e);
				},
				get value() {
					return v().ask;
				},
				get disabled() {
					return m(t);
				},
				oninput: (e) => k.edit(e.currentTarget.value),
				onkeydown: (e) => {
					e.key === "Enter" && !e.shiftKey && !e.isComposing && (e.preventDefault(), k.suggest());
				}
			});
		}
		var ue = n(le);
		{
			let e = w(() => u().busy === "route"), t = w(() => u().busy === "send");
			V(ue, {
				type: "submit",
				get loading() {
					return m(e);
				},
				get disabled() {
					return m(t);
				},
				children: (e, t) => {
					r();
					var n = I();
					c((e) => U(n, e), [() => M("find")]), B(e, n);
				},
				$$slots: { default: !0 }
			});
		}
		var de = n(ue, 2), fe = (e) => {
			let t = w(() => Sd(u().result)), i = w(() => m(t)[u().selected]);
			Te(e, {
				class: "tw:space-y-3 tw:p-4",
				children: (e, o) => {
					var l = Qd(), p = a(l), h = d(p, !0), _ = n(p, 2), v = (e) => {
						var t = Zd(), n = d(t, !0);
						c(() => U(n, u().result.reason)), B(e, t);
					};
					L(_, (e) => {
						u().selected === 0 && u().result.pick && u().result.reason && e(v);
					});
					var y = n(_, 2), b = s(y);
					{
						let e = w(() => u().busy === "send");
						V(b, {
							get loading() {
								return m(e);
							},
							onclick: () => k.send(),
							get ref() {
								return m(ee);
							},
							set ref(e) {
								f(ee, e, !0);
							},
							children: (e, t) => {
								r();
								var n = I();
								c((e) => U(n, e), [() => M("send")]), B(e, n);
							},
							$$slots: { default: !0 }
						});
					}
					var x = n(b);
					{
						let e = w(() => u().busy === "send");
						V(x, {
							variant: "outline",
							get disabled() {
								return m(e);
							},
							onclick: () => k.cancel(),
							children: (e, t) => {
								r();
								var n = I();
								c((e) => U(n, e), [() => M("cancel")]), B(e, n);
							},
							$$slots: { default: !0 }
						});
					}
					S(y);
					var C = n(y, 2), T = d(C, !0), E = n(C, 2);
					R(E, 21, () => m(t), N, (e, t, n) => {
						var i = P(), o = a(i), s = (e) => {
							{
								let i = w(() => !!u().busy);
								V(e, {
									variant: "ghost",
									get disabled() {
										return m(i);
									},
									class: "tw:h-auto tw:whitespace-normal tw:text-left",
									onclick: () => {
										k.select(n), g().then(() => {
											m(ee)?.isConnected && m(ee).focus();
										});
									},
									children: (e, n) => {
										r();
										var i = I();
										c((e) => U(i, e), [() => m(t).book_id ? m(t).book_title + (m(t).epic_title ? " → " + m(t).epic_title : "") : M("newDestination", { title: m(t).book_title })]), B(e, i);
									},
									$$slots: { default: !0 }
								});
							}
						};
						L(o, (e) => {
							n !== u().selected && e(s);
						}), B(e, i);
					}), S(E), c((e, t) => {
						U(h, e), U(T, t);
					}, [() => m(i).book_id ? M("destination", { where: m(i).book_title + (m(i).epic_title ? " → " + m(i).epic_title : "") }) : M(u().result.pick ? "createDestination" : "noDestination", { title: m(i).book_title }), () => M("another")]), B(e, l);
				},
				$$slots: { default: !0 }
			});
		};
		L(de, (e) => {
			u().result && e(fe);
		});
		var pe = n(de, 2), me = (e) => {
			var t = $d(), n = d(t, !0);
			c((e) => U(n, e), [() => Pd(l.lang, u().error)]), B(e, t);
		};
		L(pe, (e) => {
			u().error && e(me);
		}), S(oe);
		var he = n(oe, 2), ge = (e) => {
			var r = ef(), i = s(r), a = d(i, !0);
			Gd(n(i), {
				get people() {
					return m(t);
				},
				get waits() {
					return m(t).waits;
				},
				get rooms() {
					return l.rooms;
				},
				get lang() {
					return l.lang;
				},
				get ago() {
					return l.ago;
				},
				get onnavigate() {
					return l.onnavigate;
				}
			}), S(r), c((e) => U(a, e), [() => M("waiting", { n: m(t).waits.length })]), B(e, r);
		};
		L(he, (e) => {
			E.current && m(t).waits.length && e(ge);
		});
		var _e = n(he, 2), ve = s(_e), ye = s(ve), xe = (e) => {
			var t = Yd(), n = d(t, !0);
			c((e) => U(n, e), [() => M("empty")]), B(e, t);
		};
		L(ye, (e) => {
			m(t).books.length || e(xe);
		});
		var Se = n(ye, 2);
		R(Se, 21, () => E.current ? ld(m(t).books) : cd(m(t).books), (e) => e.id, (e, r) => {
			let i = w(() => m(t).waits.filter((e) => e.book_id === m(r).id));
			var a = of(), o = s(a);
			{
				let e = w(() => h().seen[m(r).id] ?? 0), n = w(() => m(t).waits.filter((e) => e.book_id === m(r).id).length);
				Vd(o, {
					get room() {
						return m(r);
					},
					get lang() {
						return l.lang;
					},
					get compact() {
						return E.current;
					},
					get now() {
						return h().now;
					},
					get seen() {
						return m(e);
					},
					get waits() {
						return m(n);
					},
					get onnavigate() {
						return l.onnavigate;
					},
					get onsettings() {
						return l.onroomsettings;
					}
				});
			}
			var u = n(o), f = (e) => {
				var t = tf(), n = d(t, !0);
				c(() => U(n, m(r).title)), B(e, t);
			};
			L(u, (e) => {
				E.current && e(f);
			});
			var p = n(u), g = (e) => {
				var r = nf(), a = s(r);
				{
					let e = w(() => m(i).slice(0, 3));
					Gd(a, {
						get people() {
							return m(t);
						},
						get waits() {
							return m(e);
						},
						get rooms() {
							return l.rooms;
						},
						get lang() {
							return l.lang;
						},
						get ago() {
							return l.ago;
						},
						get onnavigate() {
							return l.onnavigate;
						}
					});
				}
				var o = n(a), u = (e) => {
					var r = ef(), a = s(r), o = d(a, !0), u = n(a);
					{
						let e = w(() => m(i).slice(3));
						Gd(u, {
							get people() {
								return m(t);
							},
							get waits() {
								return m(e);
							},
							get rooms() {
								return l.rooms;
							},
							get lang() {
								return l.lang;
							},
							get ago() {
								return l.ago;
							},
							get onnavigate() {
								return l.onnavigate;
							}
						});
					}
					S(r), c((e) => U(o, e), [() => M("more", { n: m(i).length - 3 })]), B(e, r);
				};
				L(o, (e) => {
					m(i).length > 3 && e(u);
				}), S(r), B(e, r);
			};
			L(p, (e) => {
				!E.current && m(i).length && e(g);
			});
			var _ = n(p), v = (e) => {
				var i = af(), a = s(i);
				R(a, 17, () => fd(m(r)).slice(0, 5), N, (e, n) => {
					var r = rf(), i = s(r);
					{
						let e = w(() => m(t).friends.find((e) => e.email === m(n))?.name || m(n)), r = w(() => dd(m(t), m(n)));
						ut(i, {
							get name() {
								return m(e);
							},
							get src() {
								return m(r);
							}
						});
					}
					S(r), c(() => A(r, "title", m(n))), B(e, r);
				});
				var o = n(a), u = d(o, !0);
				S(i), c((e) => U(u, e), [() => l.ago(m(r).updated_at ?? 0)]), B(e, i);
			};
			L(_, (e) => {
				E.current || e(v);
			}), S(a), B(e, a);
		}), S(Se), S(ve);
		var Ce = n(ve, 2), we = s(Ce);
		Te(we, {
			children: (e, i) => {
				var o = cf(), u = a(o);
				St(u, {
					level: 2,
					class: "tw:m-0 tw:text-lg tw:font-semibold",
					children: (e, n) => {
						r();
						var i = I();
						c((e) => U(i, `${e ?? ""} · ${m(t).friends.length ?? ""}`), [() => M("friends")]), B(e, i);
					},
					$$slots: { default: !0 }
				});
				var f = n(u);
				R(f, 17, () => m(t).friends, (e) => e.email, (e, r) => {
					var i = sf(), a = s(i);
					{
						let e = w(() => m(r).name || m(r).email), n = w(() => dd(m(t), m(r).email));
						ut(a, {
							get name() {
								return m(e);
							},
							get src() {
								return m(n);
							}
						});
					}
					var o = n(a), l = d(o, !0);
					S(i), c(() => U(l, m(r).name || m(r).email)), B(e, i);
				});
				var p = n(f);
				V(p, {
					variant: "outline",
					onclick: (e) => {
						e.currentTarget.isConnected && l.onsettings("friends");
					},
					children: (e, t) => {
						r();
						var n = I();
						c((e) => U(n, e), [() => M("manageFriends")]), B(e, n);
					},
					$$slots: { default: !0 }
				}), B(e, o);
			},
			$$slots: { default: !0 }
		});
		var H = n(we);
		V(H, {
			variant: "outline",
			onclick: (e) => {
				e.currentTarget.isConnected && l.onsettings("agents");
			},
			children: (e, t) => {
				r();
				var n = I();
				c((e) => U(n, e), [() => M("agentSettings")]), B(e, n);
			},
			$$slots: { default: !0 }
		}), S(Ce), S(_e), c((e, n, r, i) => {
			U(b, `${e ?? ""} · ${m(t).friends.length ?? ""}
            ${n ?? ""} · `), U(C, r), A(oe, "aria-busy", !!u().busy), A(ve, "aria-label", i);
		}, [
			() => M("rooms", { n: m(t).books.length }),
			() => M("friends"),
			() => M("archive"),
			() => M("home")
		]), te("click", x, (e) => {
			e.ctrlKey || e.metaKey || e.shiftKey || e.altKey || (e.preventDefault(), e.currentTarget.isConnected && l.onarchived());
		}), se("submit", oe, (e) => {
			e.preventDefault(), k.suggest();
		}), B(e, i);
	};
	L(_e, (e) => {
		h().me ? e(Ce, -1) : e(Se);
	});
	var we = n(_e, 2), H = (e) => {
		var t = qd(), n = d(t, !0);
		c((e) => U(n, e), [() => M("refreshing")]), B(e, t);
	};
	L(we, (e) => {
		h().loading && h().me && e(H);
	});
	var Ee = n(we, 2), De = (e) => {
		var t = uf(), i = a(t), o = d(i, !0), s = n(i, 2);
		V(s, {
			variant: "outline",
			get loading() {
				return h().loading;
			},
			onclick: (e) => {
				e.currentTarget.isConnected && l.personal.refresh();
			},
			children: (e, t) => {
				r();
				var n = I();
				c((e) => U(n, e), [() => M("retry")]), B(e, n);
			},
			$$slots: { default: !0 }
		}), c((e) => U(o, e), [() => Pd(l.lang, h().error)]), B(e, t);
	};
	L(Ee, (e) => {
		h().error && e(De);
	}), S(ce), S(oe), B(i, oe), t(), x();
}
Se(["click"]);
// svelte/features/home/ArchivedPanel.svelte
var pf = z("<p role=\"status\"> </p>"), mf = z("<p class=\"tw:m-0 tw:break-words tw:text-muted-foreground\"> </p>"), hf = z("<div class=\"tw:grid tw:h-24 tw:place-items-center tw:rounded-control tw:bg-muted tw:text-2xl tw:font-semibold\"> </div> <!><!> <p class=\"tw:m-0 tw:text-xs tw:text-muted-foreground\"> </p> <div class=\"tw:flex tw:flex-wrap tw:gap-2\"><a> </a><!></div>", 1), gf = z("<p> </p>"), _f = z("<p role=\"alert\" class=\"tw:break-words tw:text-destructive\"> </p> <!>", 1), vf = z("<main data-vb-native=\"archived\" class=\"tw:min-h-dvh tw:bg-background tw:p-4 tw:font-sans tw:text-sm tw:leading-6 tw:text-foreground tw:sm:p-8\"><div class=\"tw:mx-auto tw:max-w-5xl tw:space-y-6\"><header class=\"tw:flex tw:flex-wrap tw:items-start tw:justify-between tw:gap-3\"><div><!> <p class=\"tw:m-0 tw:text-muted-foreground\"> </p></div> <a href=\"/app?ui=svelte\"> </a></header> <!> <div class=\"tw:grid tw:gap-4 tw:sm:grid-cols-2\"></div> <!> <!></div></main>");
function yf(e, i) {
	D(i, !0);
	let l = () => ye(h, "$view", u), [u, f] = xe(), p = b(() => Ad(i.personal)), h = p.state, g = (e, t) => Nd(i.lang, e, t);
	de(() => p.dispose()), ve(() => {
		let e = i.personal.peek(), t = i.personal.state.subscribe(({ me: t }) => {
			e && t && t !== e && p.load(), e = t;
		});
		return p.load(), () => {
			t(), p.dispose();
		};
	});
	var _ = vf();
	O("1j7clo8", (e) => {
		E((e) => {
			o.title = `${e ?? ""} · vibebook`;
		}, [() => g("archive")]);
	});
	var v = s(_), y = s(v), x = s(y), C = s(x);
	St(C, {
		level: 1,
		class: "tw:m-0 tw:text-2xl tw:font-semibold",
		children: (e, t) => {
			r();
			var n = I();
			c((e) => U(n, e), [() => g("archive")]), B(e, n);
		},
		$$slots: { default: !0 }
	});
	var T = n(C, 2), k = d(T, !0);
	S(x);
	var N = n(x, 2), ee = d(N, !0);
	S(y);
	var P = n(y, 2), F = (e) => {
		var t = pf(), n = d(t, !0);
		c((e) => U(n, e), [() => g(l().loaded ? "refreshing" : "loading")]), B(e, t);
	};
	L(P, (e) => {
		l().loading && e(F);
	});
	var ne = n(P, 2);
	R(ne, 5, () => l().books, (e) => e.id, (e, t) => {
		Te(e, {
			class: "tw:space-y-3",
			children: (e, o) => {
				var u = hf(), f = a(u), h = d(f, !0), _ = n(f, 2);
				St(_, {
					level: 2,
					class: "tw:m-0 tw:break-words tw:text-lg tw:font-semibold",
					children: (e, n) => {
						r();
						var i = I();
						c(() => U(i, m(t).title)), B(e, i);
					},
					$$slots: { default: !0 }
				});
				var v = n(_), y = (e) => {
					var n = mf(), r = d(n, !0);
					c(() => U(r, m(t).summary)), B(e, n);
				};
				L(v, (e) => {
					m(t).summary && e(y);
				});
				var b = n(v, 2), x = d(b, !0), C = n(b, 2), T = s(C), E = d(T, !0), D = n(T);
				{
					let e = w(() => l().pending === m(t).id), n = w(() => !!l().pending);
					V(D, {
						variant: "outline",
						get loading() {
							return m(e);
						},
						get disabled() {
							return m(n);
						},
						onclick: (e) => {
							e.currentTarget.isConnected && p.restore(m(t).id);
						},
						children: (e, t) => {
							r();
							var n = I();
							c((e) => U(n, e), [() => g("restore")]), B(e, n);
						},
						$$slots: { default: !0 }
					});
				}
				S(C), c((e, t, n, r, i) => {
					U(h, e), U(x, t), A(T, "href", n), M(T, 1, r), U(E, i);
				}, [
					() => md(m(t).title),
					() => g("archivedAgo", { ago: i.ago(m(t).archived_at) }),
					() => vd({ roomId: m(t).id }),
					() => j(ue({ variant: "ghost" })),
					() => g("open")
				]), te("click", T, (e) => {
					e.ctrlKey || e.metaKey || e.shiftKey || e.altKey || (e.preventDefault(), e.currentTarget.isConnected && i.onnavigate({ roomId: m(t).id }));
				}), B(e, u);
			},
			$$slots: { default: !0 }
		});
	}), S(ne);
	var re = n(ne, 2), ie = (e) => {
		var t = gf(), n = d(t, !0);
		c((e) => U(n, e), [() => g("noArchived")]), B(e, t);
	};
	L(re, (e) => {
		l().loaded && !l().books.length && e(ie);
	});
	var ae = n(re, 2), z = (e) => {
		var t = _f(), o = a(t), s = d(o, !0), u = n(o, 2);
		V(u, {
			variant: "outline",
			get loading() {
				return l().loading;
			},
			onclick: (e) => {
				e.currentTarget.isConnected && p.load();
			},
			children: (e, t) => {
				r();
				var n = I();
				c((e) => U(n, e), [() => g("retry")]), B(e, n);
			},
			$$slots: { default: !0 }
		}), c((e) => U(s, e), [() => Pd(i.lang, l().error)]), B(e, t);
	};
	L(ae, (e) => {
		l().error && e(z);
	}), S(v), S(_), c((e, t, n) => {
		U(k, e), M(N, 1, t), U(ee, n);
	}, [
		() => g("archived"),
		() => j(ue({ variant: "outline" })),
		() => g("back")
	]), te("click", N, (e) => {
		!e.currentTarget.isConnected || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey || (e.preventDefault(), i.onhome());
	}), B(e, _), t(), f();
}
Se(["click"]);
// svelte/features/rooms/images.ts
async function bf(e) {
	let t = URL.createObjectURL(e);
	try {
		let e = await new Promise((e, n) => {
			let r = new Image();
			r.onload = () => e(r), r.onerror = () => n(Error("image unavailable")), r.src = t;
		}), n = document.createElement("canvas");
		n.width = n.height = 128;
		let r = n.getContext("2d");
		if (!r) throw Error("image unavailable");
		let i = Math.min(128 / e.naturalWidth, 128 / e.naturalHeight), a = e.naturalWidth * i, o = e.naturalHeight * i;
		return r.drawImage(e, (128 - a) / 2, (128 - o) / 2, a, o), await new Promise((e, t) => n.toBlob((n) => n ? e(n) : t(Error("image unavailable")), "image/png"));
	} finally {
		URL.revokeObjectURL(t);
	}
}
// svelte/features/app-navigation/AppNavigation.svelte
var xf = z("<div role=\"listitem\"><!></div>"), Sf = z("<a role=\"option\" tabindex=\"-1\"><b class=\"tw:block tw:break-words tw:text-sm tw:font-medium\"> </b><small class=\"tw:break-words tw:text-muted-foreground\"> </small></a>"), Cf = z("<p> </p>"), wf = z("<p role=\"status\"> </p>"), Tf = z("<p role=\"status\"> </p> <!>", 1), Ef = z("<p role=\"alert\" class=\"tw:break-words tw:text-destructive\"> </p> <!>", 1), Df = z("<!> <div id=\"native-room-results\" role=\"listbox\" class=\"tw:space-y-1\"></div> <!><!><!><!>", 1), Of = z("<p role=\"alert\" class=\"tw:break-words tw:text-destructive\"> </p>"), kf = z("<form class=\"tw:space-y-3\"><!><!> <div class=\"tw:flex tw:flex-wrap tw:gap-2\"><!><!></div> <!></form>"), Af = z("<fieldset class=\"tw:m-0 tw:space-y-2 tw:border-0 tw:p-0\"><legend> </legend> <div class=\"tw:flex tw:flex-wrap tw:gap-2\"></div></fieldset> <div class=\"tw:space-y-2\"><!><input id=\"native-room-icon\" type=\"file\" accept=\"image/png,image/jpeg,image/webp,image/gif,image/x-icon,.ico\" class=\"tw:block tw:w-full tw:rounded-control tw:border tw:border-input tw:p-2 tw:text-sm\"/><!></div> <div class=\"tw:flex tw:flex-wrap tw:gap-2\"><!><!><!><!></div> <!><!>", 1), jf = z("<div class=\"tw:flex tw:flex-wrap tw:gap-2\"><!><!></div> <!>", 1), Mf = z("<aside data-vb-native=\"home-notice\" role=\"status\" class=\"tw:fixed tw:bottom-4 tw:right-4 tw:z-30 tw:flex tw:max-w-[calc(100vw-2rem)] tw:items-start tw:gap-2 tw:rounded-surface tw:border tw:border-border tw:bg-card tw:p-4 tw:font-sans tw:text-sm tw:text-foreground tw:shadow-lg\"><p class=\"tw:m-0 tw:break-words\"> </p> <!></aside>"), Nf = z("<div data-vb-native=\"room-navigation\" class=\"tw:flex tw:h-full tw:min-h-0 tw:w-full tw:flex-col tw:items-center tw:gap-2 tw:bg-background tw:p-0 tw:font-sans tw:text-foreground\"><!> <div class=\"tw:flex tw:min-h-0 tw:flex-1 tw:flex-col tw:gap-2 tw:overflow-y-auto\" role=\"list\"></div> <!> <!> <!> <!></div> <!> <!> <!> <!> <!> <!> <!>", 1);
function Pf(i, o) {
	D(o, !0);
	let l = () => ye(m(E), "$nav", y), u = () => ye(m(C), "$personal", y), p = () => ye(m(k), "$search", y), h = () => ye(m(O), "$mutations", y), g = () => ye(m(ee), "$creator", y), v = () => ye(m(T), "$draft", y), [y, b] = xe(), x = H(o, "theme", 3, "auto"), C = w(() => o.controller.personal.state), T = w(() => o.controller.personal.draft), E = w(() => o.controller.state), O = w(() => o.controller.rooms.state), k = w(() => o.controller.search.state), ee = w(() => o.controller.creator.state), F = (e, t) => Nd(o.lang, e, t), ne = w(() => l().settingsId), re = w(() => u().me?.books.find((e) => e.id === l().settingsId)), ie = w(() => u().me?.books.find((e) => e.id === l().archiveId)), ae = w(() => u().me?.books.find((e) => e.id === l().renameId)), z = w(() => [
		...gd(u().me?.books ?? [], p().query).map((e) => ({
			key: "room:" + e.id,
			target: { roomId: e.id },
			title: e.title ?? "vibebook",
			detail: e.folder ?? ""
		})),
		...(p().result?.epics ?? []).map((e) => ({
			key: "epic:" + e.room_id + ":" + e.id,
			target: xd(e),
			title: e.title,
			detail: e.room + (e.archived ? " · " + F("archive") : "")
		})),
		...(p().result?.messages ?? []).map((e) => ({
			key: "msg:" + e.room_id + ":" + e.id,
			target: bd(e),
			title: e.snippet || e.files.map((e) => e.name).join(", "),
			detail: e.room + (e.topic ? " › " + e.topic : "")
		}))
	]), oe = e(null), ce = e(null), le = e(null), ue = e(null), fe = e(null), pe = !1, me = 0, he = e(!1), ge = e("");
	_(() => {
		m(ne), me++, f(he, !1), f(ge, "");
	}), _(() => {
		l().settingsId && !m(re) && o.controller.closeSettings(), l().archiveId && !m(ie) && o.controller.closeSettings(), l().renameId && !m(ae) && o.controller.closeSettings(), m(ae) && l().renameSubmitted && !h().pending[`rename:${m(ae).id}`] && !h().issues[`rename:${m(ae).id}`] && m(ae).title === l().renameDraft.trim() && o.controller.closeSettings();
	}), de(() => o.controller.pageLeft()), ve(() => {
		pe = !0;
		let e = (e) => {
			(e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k" && u().me && (e.preventDefault(), p().open ? o.controller.search.close() : (o.controller.creator.close(), o.controller.closeSettings(), o.controller.openSearch(document.activeElement instanceof HTMLElement ? document.activeElement : void 0)));
		};
		return document.addEventListener("keydown", e), () => {
			pe = !1, me++, o.controller.pageLeft(), document.removeEventListener("keydown", e);
		};
	});
	async function _e(e) {
		let t = e.currentTarget, n = t.files?.[0], r = l().settingsId;
		if (!pe || !t.isConnected || !n || !r) return;
		let i = ++me, a = u().identityRevision;
		f(he, !0), f(ge, "");
		try {
			let e = await bf(n);
			pe && i === me && a === u().identityRevision && t.isConnected && l().settingsId === r && await o.controller.rooms.icon(r, e);
		} catch (e) {
			pe && i === me && a === u().identityRevision && f(ge, e instanceof Error ? e.message : "network", !0);
		} finally {
			pe && i === me && a === u().identityRevision && f(he, !1);
		}
	}
	let Se = () => o.controller.returnFocus(m(oe));
	var we = Nf(), Te = a(we), Ee = s(Te);
	{
		let e = w(() => F("home"));
		mt(Ee, {
			icon: "inbox",
			get label() {
				return m(e);
			},
			onclick: (e) => {
				e.currentTarget.isConnected && o.controller.callbacks.home();
			},
			get ref() {
				return m(oe);
			},
			set ref(e) {
				f(oe, e, !0);
			}
		});
	}
	var De = n(Ee, 2);
	R(De, 5, () => cd(u().me?.books ?? []), (e) => e.id, (e, t) => {
		var n = xf(), r = s(n);
		{
			let e = w(() => l().roomId === m(t).id), n = w(() => u().seen[m(t).id] ?? 0), i = w(() => u().me?.waits.filter((e) => e.book_id === m(t).id).length ?? 0);
			Vd(r, {
				get room() {
					return m(t);
				},
				get lang() {
					return o.lang;
				},
				get now() {
					return u().now;
				},
				compact: !0,
				get selected() {
					return m(e);
				},
				get seen() {
					return m(n);
				},
				get waits() {
					return m(i);
				},
				get onnavigate() {
					return o.controller.callbacks.navigate;
				},
				onsettings: (e, t) => o.controller.openSettings(e, t),
				ondragstart: (e) => {
					e.dataTransfer?.setData("text/plain", m(t).id), e.dataTransfer && (e.dataTransfer.effectAllowed = "move");
				},
				ondragover: (e) => e.preventDefault(),
				ondrop: (e) => {
					e.preventDefault();
					let n = e.dataTransfer?.getData("text/plain");
					if (!n) return;
					let r = e.currentTarget;
					if (!(r instanceof HTMLElement)) return;
					let i = r.getBoundingClientRect();
					o.controller.drop(n, m(t).id, e.clientY > i.top + i.height / 2);
				}
			});
		}
		S(n), B(e, n);
	}), S(De);
	var Oe = n(De, 2);
	{
		let e = w(() => x() === "dark" ? "moon" : "sun"), t = w(() => F("theme"));
		mt(Oe, {
			get icon() {
				return m(e);
			},
			get label() {
				return m(t);
			},
			onclick: (e) => {
				e.currentTarget.isConnected && o.ontheme();
			}
		});
	}
	var ke = n(Oe, 2);
	{
		let e = w(() => F("language"));
		V(ke, {
			variant: "ghost",
			size: "sm",
			onclick: (e) => {
				e.currentTarget.isConnected && o.onlanguage(o.lang === "en" ? "pt" : "en");
			},
			get "aria-label"() {
				return m(e);
			},
			children: (e, t) => {
				r();
				var n = I();
				c(() => U(n, o.lang === "en" ? "PT" : "EN")), B(e, n);
			},
			$$slots: { default: !0 }
		});
	}
	var je = n(ke, 2);
	{
		let e = w(() => F("search"));
		mt(je, {
			icon: "search",
			get label() {
				return m(e);
			},
			onclick: (e) => {
				e.currentTarget.isConnected && o.controller.openSearch(e.currentTarget);
			}
		});
	}
	var Me = n(je, 2);
	{
		let e = w(() => F("new"));
		mt(Me, {
			icon: "plus",
			get label() {
				return m(e);
			},
			onclick: (e) => {
				e.currentTarget.isConnected && o.controller.openCreate(e.currentTarget);
			}
		});
	}
	S(Te);
	var Ne = n(Te, 2);
	{
		let e = w(() => F("search")), t = w(() => F("close"));
		Ot(Ne, {
			get open() {
				return p().open;
			},
			get title() {
				return m(e);
			},
			get closeLabel() {
				return m(t);
			},
			onOpenChange: (e) => {
				e || o.controller.search.close();
			},
			initialFocus: () => m(ce),
			returnFocus: Se,
			children: (e, t) => {
				var i = Df(), l = a(i);
				{
					let e = w(() => F("search")), t = w(() => m(z)[p().selected] ? `native-result-${p().selected}` : void 0), n = w(() => F("searchPlaceholder"));
					Ce(l, {
						role: "combobox",
						get "aria-label"() {
							return m(e);
						},
						"aria-autocomplete": "list",
						"aria-expanded": "true",
						"aria-controls": "native-room-results",
						get "aria-activedescendant"() {
							return m(t);
						},
						get placeholder() {
							return m(n);
						},
						get value() {
							return p().query;
						},
						oninput: (e) => {
							e.currentTarget.isConnected && o.controller.search.edit(e.currentTarget.value);
						},
						onkeydown: (e) => {
							e.currentTarget.isConnected && (e.key === "ArrowDown" || e.key === "ArrowUp" ? (e.preventDefault(), o.controller.search.move(e.key === "ArrowDown" ? 1 : -1)) : e.key === "Enter" && !e.isComposing && (e.preventDefault(), o.controller.search.activate()));
						},
						get ref() {
							return m(ce);
						},
						set ref(e) {
							f(ce, e, !0);
						}
					});
				}
				var u = n(l, 2);
				R(u, 23, () => m(z), (e) => e.key, (e, t, r) => {
					var i = Sf(), a = s(i), l = d(a, !0), u = n(a), f = d(u, !0);
					S(i), c((e) => {
						A(i, "href", e), A(i, "id", `native-result-${m(r)}`), A(i, "aria-selected", p().selected === m(r)), M(i, 1, j(p().selected === m(r) ? "tw:block tw:w-full tw:rounded-control tw:bg-accent tw:p-3 tw:text-left tw:text-foreground tw:no-underline" : "tw:block tw:w-full tw:rounded-control tw:bg-transparent tw:p-3 tw:text-left tw:text-foreground tw:no-underline tw:hover:bg-accent")), U(l, m(t).title), U(f, m(t).detail);
					}, [() => vd(m(t).target)]), te("click", i, (e) => {
						e.ctrlKey || e.metaKey || e.shiftKey || e.altKey || e.button !== 0 || (e.preventDefault(), e.currentTarget.isConnected && o.controller.search.activateTarget(m(t).target));
					}), B(e, i);
				}), S(u);
				var h = n(u, 2), g = (e) => {
					var t = Cf(), n = d(t, !0);
					c((e) => U(n, e), [() => F(p().query.trim().length >= 2 ? "noConversations" : "noMatches")]), B(e, t);
				};
				L(h, (e) => {
					!m(z).length && !p().loading && e(g);
				});
				var _ = n(h), v = (e) => {
					var t = wf(), n = d(t, !0);
					c((e) => U(n, e), [() => F("searching")]), B(e, t);
				};
				L(_, (e) => {
					p().loading && e(v);
				});
				var y = n(_), b = (e) => {
					var t = Tf(), i = a(t), s = d(i, !0), l = n(i, 2);
					V(l, {
						variant: "outline",
						onclick: (e) => {
							e.currentTarget.isConnected && o.controller.search.edit(p().query);
						},
						children: (e, t) => {
							r();
							var n = I();
							c((e) => U(n, e), [() => F("retry")]), B(e, n);
						},
						$$slots: { default: !0 }
					}), c((e) => U(s, e), [() => F("partial")]), B(e, t);
				};
				L(y, (e) => {
					p().result?.failed && e(b);
				});
				var x = n(y), C = (e) => {
					var t = Ef(), i = a(t), s = d(i, !0), l = n(i, 2);
					V(l, {
						variant: "outline",
						onclick: (e) => {
							e.currentTarget.isConnected && o.controller.search.edit(p().query);
						},
						children: (e, t) => {
							r();
							var n = I();
							c((e) => U(n, e), [() => F("retry")]), B(e, n);
						},
						$$slots: { default: !0 }
					}), c((e) => U(s, e), [() => Pd(o.lang, p().error)]), B(e, t);
				};
				L(x, (e) => {
					p().error && e(C);
				}), c((e) => A(u, "aria-label", e), [() => F("search")]), B(e, i);
			},
			$$slots: { default: !0 }
		});
	}
	var Pe = n(Ne, 2);
	{
		let e = w(() => F("new")), t = w(() => F("createHelp")), i = w(() => F("close"));
		Ot(Pe, {
			get open() {
				return g().open;
			},
			get title() {
				return m(e);
			},
			get description() {
				return m(t);
			},
			get closeLabel() {
				return m(i);
			},
			onOpenChange: (e) => {
				e || o.controller.creator.close();
			},
			initialFocus: () => m(le),
			returnFocus: Se,
			children: (e, t) => {
				var i = kf(), a = s(i);
				be(a, {
					for: "native-new-room",
					children: (e, t) => {
						r();
						var n = I();
						c((e) => U(n, e), [() => F("createLabel")]), B(e, n);
					},
					$$slots: { default: !0 }
				});
				var l = n(a);
				{
					let e = w(() => F("createPlaceholder"));
					Tt(l, {
						id: "native-new-room",
						rows: 4,
						get placeholder() {
							return m(e);
						},
						get value() {
							return v().create;
						},
						get disabled() {
							return g().busy;
						},
						oninput: (e) => {
							e.currentTarget.isConnected && o.controller.creator.edit(e.currentTarget.value);
						},
						onkeydown: (e) => {
							e.key === "Enter" && !e.shiftKey && !e.isComposing && (e.preventDefault(), o.controller.creator.submit());
						},
						get ref() {
							return m(le);
						},
						set ref(e) {
							f(le, e, !0);
						}
					});
				}
				var u = n(l, 2), p = s(u);
				V(p, {
					variant: "outline",
					onclick: (e) => {
						e.currentTarget.isConnected && o.controller.creator.close();
					},
					children: (e, t) => {
						r();
						var n = I();
						c((e) => U(n, e), [() => F("cancel")]), B(e, n);
					},
					$$slots: { default: !0 }
				});
				var h = n(p);
				V(h, {
					type: "submit",
					get loading() {
						return g().busy;
					},
					children: (e, t) => {
						r();
						var n = I();
						c((e) => U(n, e), [() => F(g().busy ? "creating" : "create")]), B(e, n);
					},
					$$slots: { default: !0 }
				}), S(u);
				var _ = n(u, 2), y = (e) => {
					var t = Of(), n = d(t, !0);
					c((e) => U(n, e), [() => Pd(o.lang, g().error)]), B(e, t);
				};
				L(_, (e) => {
					g().error && e(y);
				}), S(i), c(() => A(i, "aria-busy", g().busy)), se("submit", i, (e) => {
					e.preventDefault(), e.currentTarget.isConnected && o.controller.creator.submit();
				}), B(e, i);
			},
			$$slots: { default: !0 }
		});
	}
	var Fe = n(Pe, 2);
	{
		let e = w(() => !!m(re)), t = w(() => F("roomSettings", { title: m(re)?.title ?? "" })), i = w(() => F("close"));
		Ot(Fe, {
			get open() {
				return m(e);
			},
			get title() {
				return m(t);
			},
			get closeLabel() {
				return m(i);
			},
			onOpenChange: (e) => {
				e || o.controller.closeSettings();
			},
			returnFocus: Se,
			children: (e, t) => {
				var i = P(), u = a(i), f = (e) => {
					let t = w(() => m(re));
					var i = Af(), u = a(i), f = s(u), p = d(f, !0), g = n(f, 2);
					R(g, 21, () => [null, ...Ae], N, (e, n) => {
						{
							let i = w(() => m(t).tint === m(n) ? "secondary" : "outline"), a = w(() => m(t).tint === m(n)), s = w(() => !!h().pending[`tint:${m(t).id}`]);
							V(e, {
								size: "sm",
								get variant() {
									return m(i);
								},
								get "aria-pressed"() {
									return m(a);
								},
								get disabled() {
									return m(s);
								},
								onclick: (e) => {
									e.currentTarget.isConnected && o.controller.rooms.tint(m(t).id, m(n));
								},
								children: (e, t) => {
									r();
									var i = I();
									c((e) => U(i, e), [() => F(m(n) ?? "none")]), B(e, i);
								},
								$$slots: { default: !0 }
							});
						}
					}), S(g), S(u);
					var _ = n(u, 2), v = s(_);
					be(v, {
						for: "native-room-icon",
						children: (e, t) => {
							r();
							var n = I();
							c((e) => U(n, e), [() => F("icon")]), B(e, n);
						},
						$$slots: { default: !0 }
					});
					var y = n(v), b = n(y), x = (e) => {
						{
							let n = w(() => !!h().pending[`icon:${m(t).id}`]);
							V(e, {
								variant: "outline",
								get disabled() {
									return m(n);
								},
								onclick: (e) => {
									e.currentTarget.isConnected && o.controller.rooms.icon(m(t).id, null);
								},
								children: (e, t) => {
									r();
									var n = I();
									c((e) => U(n, e), [() => F("removeIcon")]), B(e, n);
								},
								$$slots: { default: !0 }
							});
						}
					};
					L(b, (e) => {
						m(t).icon && e(x);
					}), S(_);
					var C = n(_, 2), T = s(C);
					{
						let e = w(() => !!h().pending.order);
						V(T, {
							variant: "outline",
							get disabled() {
								return m(e);
							},
							onclick: (e) => {
								e.currentTarget.isConnected && o.controller.move(m(t).id, -1);
							},
							children: (e, t) => {
								r();
								var n = I();
								c((e) => U(n, e), [() => F("moveUp")]), B(e, n);
							},
							$$slots: { default: !0 }
						});
					}
					var E = n(T);
					{
						let e = w(() => !!h().pending.order);
						V(E, {
							variant: "outline",
							get disabled() {
								return m(e);
							},
							onclick: (e) => {
								e.currentTarget.isConnected && o.controller.move(m(t).id, 1);
							},
							children: (e, t) => {
								r();
								var n = I();
								c((e) => U(n, e), [() => F("moveDown")]), B(e, n);
							},
							$$slots: { default: !0 }
						});
					}
					var D = n(E), O = (e) => {
						V(e, {
							variant: "outline",
							onclick: (e) => {
								e.currentTarget.isConnected && o.controller.askRename(m(t).id);
							},
							children: (e, t) => {
								r();
								var n = I();
								c((e) => U(n, e), [() => F("rename")]), B(e, n);
							},
							$$slots: { default: !0 }
						});
					};
					L(D, (e) => {
						l().roomId === m(t).id && o.controller.callbacks.rename && e(O);
					});
					var k = n(D);
					V(k, {
						variant: "destructive",
						onclick: (e) => {
							e.currentTarget.isConnected && o.controller.askArchive(m(t).id);
						},
						children: (e, t) => {
							r();
							var n = I();
							c((e) => U(n, e), [() => F("archiveAction")]), B(e, n);
						},
						$$slots: { default: !0 }
					}), S(C);
					var A = n(C, 2);
					R(A, 17, () => [
						`tint:${m(t).id}`,
						`icon:${m(t).id}`,
						"order"
					], N, (e, t) => {
						var n = P(), r = a(n), i = (e) => {
							var n = Of(), r = d(n, !0);
							c((e) => U(r, e), [() => Pd(o.lang, h().issues[m(t)])]), B(e, n);
						};
						L(r, (e) => {
							h().issues[m(t)] && e(i);
						}), B(e, n);
					});
					var j = n(A), M = (e) => {
						var t = Of(), n = d(t, !0);
						c((e) => U(n, e), [() => Pd(o.lang, m(ge))]), B(e, t);
					};
					L(j, (e) => {
						m(ge) && e(M);
					}), c((e) => {
						U(p, e), y.disabled = m(he) || !!h().pending[`icon:${m(t).id}`];
					}, [() => F("tint")]), te("change", y, _e), B(e, i);
				};
				L(u, (e) => {
					m(re) && e(f);
				}), B(e, i);
			},
			$$slots: { default: !0 }
		});
	}
	var Ie = n(Fe, 2);
	{
		let e = w(() => !!m(ie)), t = w(() => F("archiveTitle", { title: m(ie)?.title ?? "" })), i = w(() => F("archiveHelp")), l = w(() => F("close"));
		Ot(Ie, {
			get open() {
				return m(e);
			},
			get title() {
				return m(t);
			},
			get description() {
				return m(i);
			},
			get closeLabel() {
				return m(l);
			},
			onOpenChange: (e) => {
				e || o.controller.closeSettings();
			},
			initialFocus: () => m(ue),
			returnFocus: Se,
			children: (e, t) => {
				var i = P(), l = a(i), u = (e) => {
					var t = jf(), i = a(t), l = s(i);
					V(l, {
						variant: "outline",
						onclick: (e) => {
							e.currentTarget.isConnected && o.controller.closeSettings();
						},
						get ref() {
							return m(ue);
						},
						set ref(e) {
							f(ue, e, !0);
						},
						children: (e, t) => {
							r();
							var n = I();
							c((e) => U(n, e), [() => F("cancel")]), B(e, n);
						},
						$$slots: { default: !0 }
					});
					var u = n(l);
					{
						let e = w(() => !!h().pending[`archive:${m(ie).id}`]);
						V(u, {
							variant: "destructive",
							get loading() {
								return m(e);
							},
							onclick: (e) => {
								e.currentTarget.isConnected && o.controller.confirmArchive();
							},
							children: (e, t) => {
								r();
								var n = I();
								c((e) => U(n, e), [() => F("archiveAction")]), B(e, n);
							},
							$$slots: { default: !0 }
						});
					}
					S(i);
					var p = n(i, 2), g = (e) => {
						var t = Of(), n = d(t, !0);
						c((e) => U(n, e), [() => Pd(o.lang, h().issues[`archive:${m(ie).id}`])]), B(e, t);
					};
					L(p, (e) => {
						h().issues[`archive:${m(ie).id}`] && e(g);
					}), B(e, t);
				};
				L(l, (e) => {
					m(ie) && e(u);
				}), B(e, i);
			},
			$$slots: { default: !0 }
		});
	}
	var Le = n(Ie, 2);
	{
		let e = w(() => !!m(ae)), t = w(() => F("rename")), i = w(() => F("close"));
		Ot(Le, {
			get open() {
				return m(e);
			},
			get title() {
				return m(t);
			},
			get closeLabel() {
				return m(i);
			},
			onOpenChange: (e) => {
				e || o.controller.closeSettings();
			},
			initialFocus: () => m(fe),
			returnFocus: Se,
			children: (e, t) => {
				var i = P(), u = a(i), p = (e) => {
					var t = kf(), i = s(t);
					be(i, {
						for: "native-room-name",
						children: (e, t) => {
							r();
							var n = I();
							c((e) => U(n, e), [() => F("name")]), B(e, n);
						},
						$$slots: { default: !0 }
					});
					var a = n(i);
					{
						let e = w(() => l().renameBusy || !!h().pending[`rename:${m(ae).id}`]);
						Ce(a, {
							id: "native-room-name",
							required: !0,
							maxlength: 120,
							get value() {
								return l().renameDraft;
							},
							oninput: (e) => {
								e.currentTarget.isConnected && o.controller.editRename(e.currentTarget.value);
							},
							get disabled() {
								return m(e);
							},
							get ref() {
								return m(fe);
							},
							set ref(e) {
								f(fe, e, !0);
							}
						});
					}
					var u = n(a, 2), p = s(u);
					V(p, {
						variant: "outline",
						onclick: (e) => {
							e.currentTarget.isConnected && o.controller.closeSettings();
						},
						children: (e, t) => {
							r();
							var n = I();
							c((e) => U(n, e), [() => F("cancel")]), B(e, n);
						},
						$$slots: { default: !0 }
					});
					var g = n(p);
					{
						let e = w(() => l().renameBusy || !!h().pending[`rename:${m(ae).id}`]);
						V(g, {
							type: "submit",
							get loading() {
								return m(e);
							},
							children: (e, t) => {
								r();
								var n = I();
								c((e) => U(n, e), [() => F("save")]), B(e, n);
							},
							$$slots: { default: !0 }
						});
					}
					S(u);
					var _ = n(u, 2), v = (e) => {
						var t = Of(), n = d(t, !0);
						c((e) => U(n, e), [() => Pd(o.lang, h().issues[`rename:${m(ae).id}`])]), B(e, t);
					};
					L(_, (e) => {
						h().issues[`rename:${m(ae).id}`] && e(v);
					}), S(t), se("submit", t, (e) => {
						e.preventDefault(), o.controller.rename();
					}), B(e, t);
				};
				L(u, (e) => {
					m(ae) && e(p);
				}), B(e, i);
			},
			$$slots: { default: !0 }
		});
	}
	var Re = n(Le, 2), W = (e) => {
		var t = Mf(), r = s(t), i = d(r, !0), a = n(r, 2);
		{
			let e = w(() => F("dismiss"));
			mt(a, {
				icon: "close",
				get label() {
					return m(e);
				},
				onclick: (e) => {
					e.currentTarget.isConnected && o.controller.personal.clearNotice();
				}
			});
		}
		S(t), c((e) => U(i, e), [() => F("unknown", { who: v().unknown.names.join(", ") })]), B(e, t);
	};
	L(Re, (e) => {
		v().unknown && v().unknown.roomId === l().roomId && e(W);
	});
	var ze = n(Re, 2), Be = (e) => {
		V(e, {
			"data-vb-native": "update",
			class: "tw:fixed tw:bottom-4 tw:left-1/2 tw:z-30 tw:max-w-[calc(100vw-2rem)] tw:-translate-x-1/2 tw:whitespace-normal tw:shadow-lg",
			onclick: (e) => {
				e.currentTarget.isConnected && location.reload();
			},
			children: (e, t) => {
				r();
				var n = I();
				c((e) => U(n, e), [() => F("update")]), B(e, n);
			},
			$$slots: { default: !0 }
		});
	};
	L(ze, (e) => {
		u().updateAvailable && e(Be);
	}), c((e) => A(De, "aria-label", e), [() => F("home")]), B(i, we), t(), b();
}
Se(["click", "change"]);
// shared/uiVariant.ts
function Ff(e, t, n) {
	let r = new URL(t), i = new URL(e, r);
	return i.origin !== r.origin || !/^\/(?:app|archived|login|b\/[a-z0-9]+)\/?$/.test(i.pathname) ? String(e) : (n === "svelte" ? i.searchParams.set("ui", "svelte") : i.searchParams.delete("ui"), i.pathname + i.search + i.hash);
}
// svelte/Inbox.svelte
var If = z("<span class=\"tw:grid tw:size-8 tw:shrink-0 tw:place-items-center tw:rounded-full tw:border tw:border-border tw:bg-muted\"><!></span>"), Lf = z("<li class=\"tw:flex tw:items-start tw:gap-2 tw:py-1\"><a class=\"tw:flex tw:min-w-0 tw:flex-1 tw:gap-3 tw:rounded-control tw:p-2 tw:text-foreground tw:no-underline tw:outline-none tw:hover:bg-accent tw:focus-visible:ring-2 tw:focus-visible:ring-ring\"><!> <span class=\"tw:flex tw:min-w-0 tw:flex-1 tw:flex-col tw:gap-1 tw:text-sm tw:leading-5 tw:[overflow-wrap:anywhere]\"><span class=\"tw:line-clamp-3\"><strong class=\"tw:font-semibold\"> </strong> </span> <span class=\"tw:text-xs tw:leading-4 tw:text-muted-foreground\"> </span></span></a> <!></li>"), Rf = z("<ul class=\"tw:m-0 tw:max-h-[60dvh] tw:min-h-0 tw:list-none tw:divide-y tw:divide-border tw:overflow-auto tw:overscroll-contain tw:p-0\"></ul>"), zf = z("<!> <!>", 1);
function Bf(r, i) {
	D(i, !0);
	let o = (e) => {
		var t = P(), r = a(t), o = (e) => {
			var t = Rf();
			R(t, 21, () => m(y), (e) => T(e), (e, t) => {
				var r = Lf(), a = s(r), o = s(a), l = (e) => {
					var t = If(), n = s(t);
					Dt(n, { name: "check" }), S(t), B(e, t);
				}, u = w(() => E(m(t)) === "task"), f = (e) => {
					{
						let n = w(() => O(m(t))), r = w(() => i.avatarUrl?.(m(t).author));
						ut(e, {
							get name() {
								return m(n);
							},
							get src() {
								return m(r);
							}
						});
					}
				};
				L(o, (e) => {
					m(u) ? e(l) : e(f, -1);
				});
				var p = n(o, 2), g = s(p), _ = s(g), y = d(_, !0), b = n(_);
				S(g);
				var x = n(g, 2), C = d(x);
				S(p), S(a);
				var D = n(a, 2), M = (e) => {
					{
						let n = w(() => i.vb.t("Já resolvi (respondi em outro lugar, ou não é comigo)")), r = w(() => m(h) === T(m(t))), a = w(() => m(h) !== null);
						mt(e, {
							icon: "check",
							get label() {
								return m(n);
							},
							class: "tw:mt-1",
							get loading() {
								return m(r);
							},
							get disabled() {
								return m(a);
							},
							onclick: () => j(m(t))
						});
					}
				}, N = w(() => m(t).ref.startsWith("m"));
				L(D, (e) => {
					m(N) && e(M);
				}), S(r), c((e, n, r, i) => {
					A(a, "href", e), U(y, n), U(b, ` ${m(t).text ?? ""}`), U(C, `${m(v) ? `${m(t).room} › ` : ""}${r ?? ""} · ${i ?? ""}`);
				}, [
					() => k(m(t)),
					() => E(m(t)) === "task" ? i.vb.t("Tarefa sua esperando OK:") : E(m(t)) === "agent" ? i.vb.t("Seu agent espera você:") : `${O(m(t)).split(" ")[0]}:`,
					() => m(t).topic || i.vb.t("sala principal"),
					() => i.vb.ago(m(t).ts)
				]), te("click", a, (e) => i.onopen(m(t), e)), B(e, r);
			}), S(t), B(e, t);
		}, l = (e) => {
			{
				let t = w(() => m(v) ? i.vb.t("Nada esperando você. ✓") : i.vb.t("Nada esperando você nesta sala. ✓"));
				wt(e, { get title() {
					return m(t);
				} });
			}
		};
		L(r, (e) => {
			m(y).length ? e(o) : e(l, -1);
		}), B(e, t);
	}, l = H(i, "all", 3, !1), u = e(x(b(() => l() || !i.roomId ? "all" : "room"))), p = e(!0), h = e(null), g = e(""), _ = w(() => i.waits.filter((e) => e.book_id === i.roomId)), v = w(() => m(u) === "all" || !i.roomId), y = w(() => m(v) ? i.waits : m(_)), C = w(() => [{
		value: "room",
		label: `${i.vb.t("Esta sala")} (${m(_).length})`
	}, {
		value: "all",
		label: `${i.vb.t("Todas")} (${i.waits.length})`
	}]), T = (e) => `${e.book_id}:${e.ref}`, E = (e) => e.ref.startsWith("t") ? "task" : /^[ab]/.test(e.ref) ? "agent" : "ask", O = (e) => e.author_name || i.displayName?.(e.author) || e.author.split("@")[0];
	function k(e) {
		return Ff(`/b/${encodeURIComponent(e.book_id)}${e.thread === "main" ? "" : `?t=${encodeURIComponent(e.thread)}`}${/^[mab]/.test(e.ref) ? `#m${e.ref.slice(1)}` : ""}`, window.location.href, "svelte");
	}
	async function j(e) {
		f(h, T(e), !0), f(g, "");
		try {
			await i.onresolve(e);
		} catch {
			f(g, i.vb.t("Não deu pra resolver agora. Tente de novo."), !0);
		} finally {
			f(h, null);
		}
	}
	{
		let e = (e) => {
			var t = zf(), r = a(t), s = (e) => {
				ft(e, {
					get title() {
						return m(g);
					},
					compact: !0
				});
			};
			L(r, (e) => {
				m(g) && e(s);
			});
			var c = n(r, 2), l = (e) => {
				{
					let t = (e) => {
						o(e);
					}, n = w(() => i.vb.t("Caixa de entrada"));
					_t(e, {
						get items() {
							return m(C);
						},
						get label() {
							return m(n);
						},
						onValueChange: (e) => i.ontab?.(e === "all"),
						get value() {
							return m(u);
						},
						set value(e) {
							f(u, e, !0);
						},
						children: t,
						$$slots: { default: !0 }
					});
				}
			}, d = (e) => {
				o(e);
			};
			L(c, (e) => {
				i.roomId ? e(l) : e(d, -1);
			}), B(e, t);
		}, t = w(() => i.vb.t("Caixa de entrada")), s = w(() => i.vb.t("Fechar"));
		Ot(r, {
			get title() {
				return m(t);
			},
			get closeLabel() {
				return m(s);
			},
			onOpenChange: (e) => {
				e || i.onclose();
			},
			get open() {
				return m(p);
			},
			set open(e) {
				f(p, e, !0);
			},
			children: e,
			$$slots: { default: !0 }
		});
	}
	t();
}
Se(["click"]);
// svelte/InboxMount.svelte
function Vf(e, t) {
	let n = () => ye(t.waits, "$waits", r), [r, i] = xe();
	Bf(e, pe(() => t.props, { get waits() {
		return n();
	} })), i();
}
// shared/room.ts
var $ = Fe(), Hf = Le(), Uf = je(), Wf = (e) => Ne(e), Gf = (e) => Ne(Ie(e)), Kf = Me($), qf = [
	"todo",
	"doing",
	"review",
	"done"
], Jf = W({
	title: $,
	owner: $,
	summary: Gf($),
	folder: Gf($)
}), Yf = W({
	title: $,
	tasks: Kf,
	why: Wf($)
}), Xf = W({
	id: Hf,
	text: $,
	who: $,
	kind: $,
	ts: Hf
}), Zf = W({
	id: $,
	kind: $,
	ref: $,
	title: Wf($),
	author: Wf($),
	ts: Wf(Hf)
}), Qf = W({
	id: $,
	question: $,
	options: Kf,
	multi: Uf,
	closed: Uf,
	author: $,
	votes: Me(Kf)
}), $f = W({
	id: $,
	title: $,
	done: Uf,
	status: Be(qf),
	owner: Gf($),
	due: Gf($),
	flags: Wf(Kf),
	epic_id: Wf($)
}), ep = W({
	id: $,
	title: $,
	tasks: Me($f),
	archived: Wf(Uf),
	owner: Gf($),
	from_msg: Gf(Hf),
	parent: Gf($),
	kept: Wf(Uf),
	files: Wf(Me(W({
		id: $,
		name: $,
		type: $,
		n: Hf
	}))),
	flags: Wf(Kf),
	prod: Gf(W({
		stage: $,
		note: Wf($),
		at: Wf(Hf)
	}))
}), tp = W({
	id: $,
	name: $,
	type: $,
	size: Hf,
	author: $,
	ts: Hf,
	embed: Wf(Uf)
}), np = W({
	id: Hf,
	thread: $,
	author: $,
	ts: Hf,
	text: $,
	kind: Gf($),
	tag: Gf($),
	via: Gf($),
	reply_to: Gf(Hf),
	choices: Gf($),
	poll: Gf($),
	card: Gf($),
	quiet: Wf(Uf),
	cut: Wf(Uf),
	for_who: Gf($),
	files: Wf(Me(tp))
}), rp = W({
	msg_id: Hf,
	agent: Wf($),
	email: $,
	who: $,
	status: $,
	ts: Hf,
	note: Gf($)
}), ip = W({
	id: $,
	name: Gf($),
	text: $,
	owner: $,
	enabled: Uf,
	error: Gf($),
	every: Gf($),
	cron: Gf($),
	next_at: Gf(Hf),
	thread: Wf($),
	tz: Wf($),
	file_id: Gf($)
}), ap = W({
	email: $,
	name: Gf($),
	ts: Hf
}), op = W({
	email: $,
	who: $,
	read: Hf,
	delivered: Hf,
	agent: Wf($),
	ts: Wf(Hf)
}), sp = W({
	me: $,
	book: Jf,
	messages: Me(np),
	epics: Me(ep),
	roomTasks: Wf(Me($f)),
	members: Kf,
	online: Kf,
	names: Wf(Pe($, $)),
	avatars: Wf(Pe($, Hf)),
	pending: Wf(Kf),
	requests: Wf(Me(ap)),
	suggestions: Me(Yf),
	files: Wf(Me(tp)),
	filesN: Wf(Hf),
	filesAll: Wf(Uf),
	reminders: Wf(Me(ip)),
	acks: Wf(Me(rp)),
	receipts: Wf(Me(op)),
	counts: Wf(Pe($, Hf)),
	countsAt: Wf(Hf),
	full: Wf(Kf),
	complete: Wf(Uf),
	origins: Wf(Me(np)),
	docs: Wf(Pe($, $)),
	doc: Wf($),
	docNotes: Wf(Kf),
	decisions: Wf(Me(Xf)),
	pins: Wf(Me(Zf)),
	polls: Wf(Pe($, Qf))
}), cp = {
	todo: "A fazer",
	doing: "Fazendo",
	review: "Esperando OK",
	done: "Feito"
}, lp = qf.map((e) => ({
	value: e,
	label: cp[e]
}));
function up(e, t) {
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
function dp() {
	try {
		return localStorage.getItem("vb.boardMode") === "list" ? "list" : "board";
	} catch {
		return "board";
	}
}
function fp(e, t) {
	return lp[lp.findIndex((t) => t.value === e) + t]?.value;
}
function pp(e) {
	return lp.some((t) => t.value === e);
}
// svelte/features/board/BoardPanel.svelte
var mp = z("<!> ", 1), hp = z("<!><span> </span>", 1), gp = z("<span class=\"tw:inline-flex tw:items-center tw:gap-1\"><!> </span>"), _p = z("<span data-board-drag=\"\" draggable=\"true\" aria-hidden=\"true\" class=\"tw:absolute tw:right-2 tw:top-2 tw:grid tw:size-7 tw:cursor-grab tw:place-items-center tw:rounded-md tw:text-muted-foreground tw:active:cursor-grabbing\"><!></span>"), vp = z("<article><button type=\"button\" data-board-open=\"\"><span> </span> <!> <span class=\"tw:flex tw:flex-wrap tw:items-center tw:gap-2 tw:text-xs tw:text-muted-foreground\"><!> <!> <!></span></button> <!> <div><!> <!></div></article>"), yp = z("<p class=\"tw:m-0 tw:py-4 tw:text-xs tw:text-muted-foreground\"> </p>"), bp = z("<section><h3 class=\"tw:m-0 tw:flex tw:items-center tw:justify-between tw:gap-2 tw:font-sans tw:text-sm tw:font-semibold tw:leading-5 tw:tracking-normal\"> <!></h3> <div class=\"tw:space-y-3\"></div></section>"), xp = z("<div class=\"tw:h-full tw:min-h-0 tw:min-w-0 tw:overflow-auto tw:pb-2\"><div class=\"tw:grid tw:grid-cols-[repeat(4,minmax(15rem,1fr))] tw:gap-3\"></div></div>"), Sp = z("<section class=\"tw:space-y-2\"><h3 class=\"tw:m-0 tw:flex tw:items-center tw:gap-2 tw:font-sans tw:text-sm tw:font-semibold tw:leading-5 tw:tracking-normal\"> <!></h3> <!></section>"), Cp = z("<div class=\"tw:h-full tw:min-h-0 tw:space-y-5 tw:overflow-auto\"><!> <!></div>"), wp = z("<div class=\"tw:min-w-32 tw:flex-1 tw:space-y-1\"><!> <!></div>"), Tp = z("<section data-vb-native=\"\" class=\"tw:m-0 tw:box-border tw:flex tw:min-h-0 tw:min-w-0 tw:flex-1 tw:flex-col tw:gap-3 tw:rounded-surface tw:bg-background tw:p-3 tw:font-sans tw:text-sm tw:text-foreground\"><p class=\"tw:m-0 tw:text-xs tw:text-muted-foreground\"> </p> <!> <p role=\"status\" aria-live=\"polite\" class=\"tw:sr-only\"> </p> <p class=\"tw:sr-only\"> </p> <!> <form class=\"tw:flex tw:shrink-0 tw:flex-wrap tw:items-end tw:gap-2\" data-board-add=\"\"><div class=\"tw:min-w-36 tw:flex-1 tw:space-y-1\"><!> <!></div> <!> <!></form></section>");
function Ep(i, o) {
	let l = ee();
	D(o, !0);
	let p = (e, t = u, i = u, p = u) => {
		var h = vp(), g = s(h), _ = s(g), v = d(_, !0), y = n(_, 2), b = (e) => {
			{
				let r = w(() => `@vibe: ${t().flags.join(" · ")}`);
				ct(e, {
					variant: "warning",
					get title() {
						return m(r);
					},
					children: (e, r) => {
						var i = mp(), o = a(i);
						Dt(o, {
							name: "warning",
							class: "tw:size-3"
						});
						var s = n(o, 1, !0);
						c((e) => U(s, e), [() => t().flags.join(" · ")]), B(e, i);
					},
					$$slots: { default: !0 }
				});
			}
		};
		L(y, (e) => {
			t().flags?.length && e(b);
		});
		var x = n(y, 2), C = s(x);
		ct(C, {
			children: (e, n) => {
				r();
				var i = I();
				c(() => U(i, t().epicTitle)), B(e, i);
			},
			$$slots: { default: !0 }
		});
		var T = n(C, 2), E = (e) => {
			var r = hp(), i = a(r);
			{
				let e = w(() => o.vb.name(t().owner)), n = w(() => `/api/avatar/${encodeURIComponent(t().owner)}`);
				ut(i, {
					get name() {
						return m(e);
					},
					get src() {
						return m(n);
					},
					class: "tw:size-6"
				});
			}
			var s = n(i), l = d(s, !0);
			c((e) => U(l, e), [() => t().owner === o.room.me ? o.vb.t("você") : o.vb.name(t().owner)]), B(e, r);
		};
		L(T, (e) => {
			t().owner && e(E);
		});
		var D = n(T, 2), N = (e) => {
			var r = gp(), i = s(r);
			Dt(i, {
				name: "calendar",
				class: "tw:size-3"
			});
			var a = n(i, 1, !0);
			S(r), c(() => U(a, t().due)), B(e, r);
		};
		L(D, (e) => {
			t().due && e(N);
		}), S(x), S(g);
		var ee = n(g, 2), P = (e) => {
			var t = _p(), n = s(t);
			Dt(n, { name: "grip" }), S(t), c((e) => A(t, "title", e), [() => o.vb.t("Arraste, ou use ← →. Clique pra abrir o épico.")]), B(e, t);
		};
		L(ee, (e) => {
			p() || e(P);
		});
		var F = n(ee, 2), ne = s(F);
		{
			let e = w(() => `${l}-${i()}`);
			be(ne, {
				get for() {
					return m(e);
				},
				children: (e, t) => {
					r();
					var n = I();
					c((e) => U(n, e), [() => o.vb.t("Status")]), B(e, n);
				},
				$$slots: { default: !0 }
			});
		}
		var R = n(ne, 2);
		{
			let e = w(() => `${l}-${i()}`), n = w(() => `${o.vb.t("Status")}: ${t().title}`);
			Ze(R, {
				get id() {
					return m(e);
				},
				get "aria-label"() {
					return m(n);
				},
				get value() {
					return t().status;
				},
				get items() {
					return m(re);
				},
				onValueChange: (e) => (pp(e) && pe(t(), e, i()), !1)
			});
		}
		S(F), S(h), _e(h, (e, t) => ue?.(e, t), i), c((e, n, r, i) => {
			A(h, "data-board-task", t().id), A(h, "data-status", t().status), A(h, "draggable", !p()), M(h, 1, e), A(g, "data-epic", t().epicId), A(g, "aria-describedby", `${l}-keys`), M(g, 1, n), M(_, 1, r), U(v, t().title), M(F, 1, i);
		}, [
			() => j(we("tw:relative tw:min-w-0 tw:rounded-control tw:border tw:border-border tw:bg-card tw:text-card-foreground tw:shadow-xs", p() && "tw:flex tw:flex-wrap tw:items-center", m(k) === t().id && "tw:opacity-50", t().status !== "done" && t().owner === o.room.me && "tw:ring-1 tw:ring-ring/20")),
			() => j(we("tw:block tw:w-full tw:min-w-0 tw:flex-1 tw:space-y-2 tw:rounded-control tw:border-0 tw:bg-transparent tw:p-3 tw:text-left tw:font-sans tw:text-sm tw:text-card-foreground tw:outline-none tw:hover:bg-accent tw:focus-visible:ring-2 tw:focus-visible:ring-ring", !p() && "tw:pr-10")),
			() => j(we("tw:block tw:break-words tw:font-medium", t().status === "done" && "tw:line-through")),
			() => j(we("tw:min-w-32 tw:space-y-1 tw:p-3", !p() && "tw:border-t tw:border-border"))
		]), se("dragstart", h, (e) => {
			e.target instanceof Element && e.target.closest("select") ? e.preventDefault() : (e.dataTransfer && (e.dataTransfer.setData("application/x-vibebook-task", t().id), e.dataTransfer.effectAllowed = "move", e.dataTransfer.setDragImage(e.currentTarget, 20, 20)), f(k, t().id, !0));
		}), se("dragend", h, () => {
			f(k, null), f(O, null);
		}), te("click", g, () => o.onopen?.(t().epicId)), te("keydown", g, (e) => ge(e, t(), i())), B(e, h);
	}, h = w(() => up(o.room, o.thread)), v = e(x(dp())), y = e(""), C = e(null), T = e(""), E = e(""), O = e(null), k = e(null), N = e(x(b(() => m(h).targets.find((e) => e.id === m(h).scope) ?? m(h).targets.find((e) => e.id !== "main") ?? m(h).targets[0] ?? {
		id: o.thread,
		title: o.thread
	}))), F = w(() => m(h).targets.some((e) => e.id === m(N).id)), ne = w(() => [...m(F) ? [] : [{
		value: m(N).id,
		label: m(N).title,
		disabled: !0
	}], ...m(h).targets.map((e) => ({
		value: e.id,
		label: e.title
	}))]), re = w(() => lp.map((e) => ({
		value: e.value,
		label: o.vb.t(e.label)
	}))), ie = w(() => m(h).groups.map((e) => ({
		...e,
		tasks: e.tasks.filter((e) => e.status !== "done")
	})).filter((e) => e.tasks.length)), ae = w(() => m(h).tasks.filter((e) => e.owner === o.room.me && e.status !== "done")), z = /* @__PURE__ */ new Map(), oe = 0, ce = !1, le = e(null);
	de(() => {
		ce = !0, oe++, z.clear();
	});
	function ue(e, t) {
		return z.set(t, e), { destroy() {
			z.get(t) === e && z.delete(t);
		} };
	}
	function fe(e) {
		try {
			if (o.send(e)) return f(T, ""), !0;
		} catch {}
		return f(T, o.vb.t("Não deu pra enviar agora. Tente de novo."), !0), !1;
	}
	function pe(e, t, n) {
		if (e.status === t) return !0;
		let r = document.activeElement, i = r instanceof HTMLElement && z.get(n)?.contains(r) ? r : null;
		return fe({
			t: "task.status",
			id: e.id,
			status: t
		}) ? (f(le, {
			id: e.id,
			status: t,
			generation: ++oe,
			...i ? { focus: {
				key: n,
				node: i,
				selector: i.matches("select") ? "select" : "[data-board-open]"
			} } : {}
		}, !0), !0) : !1;
	}
	_(() => {
		let e = m(le);
		if (!e) return;
		let t = [...o.room.roomTasks ?? [], ...o.room.epics.flatMap((e) => e.tasks)].find((t) => t.id === e.id);
		t ? t.status === e.status && (f(le, null), f(E, `${t.title}: ${o.vb.t(lp.find((e) => e.value === t.status)?.label ?? t.status)}`), me(e)) : (f(le, null), me(e));
	});
	function me(e) {
		let t = e.focus;
		!t || document.activeElement !== t.node && document.activeElement !== document.body || g().then(() => {
			if (ce || e.generation !== oe || document.activeElement !== t.node && document.activeElement !== document.body) return;
			let n = z.get(t.key)?.querySelector(t.selector) ?? m(C);
			n?.focus({ preventScroll: !0 }), n?.scrollIntoView({
				block: "nearest",
				inline: "nearest"
			});
		});
	}
	function he(e) {
		if (e === "board" || e === "list") {
			f(v, e, !0), oe++, f(le, null);
			try {
				localStorage.setItem("vb.boardMode", e);
			} catch {}
		}
	}
	function ge(e, t, n) {
		let r = e.key === "ArrowRight" ? fp(t.status, 1) : e.key === "ArrowLeft" ? fp(t.status, -1) : void 0;
		r && (e.preventDefault(), pe(t, r, n));
	}
	function ve(e, t) {
		e.preventDefault(), f(O, null);
		let n = e.dataTransfer?.getData("application/x-vibebook-task"), r = m(h).tasks.find((e) => e.id === n);
		f(k, null), r && pe(r, t, `board:${r.id}`);
	}
	function ye(e) {
		e.preventDefault(), m(y).trim() && (m(F) ? fe({
			t: "task.add",
			epic: m(N).id,
			title: m(y).trim()
		}) && f(y, "") : f(T, o.vb.t("Escolha um épico."), !0));
	}
	var xe = Tp(), Se = s(xe), Te = d(Se, !0), H = n(Se, 2), Ee = (e) => {
		{
			let t = w(() => m(h).missingScope ? o.vb.t("Épico não encontrado.") : m(F) ? m(T) : o.vb.t("Escolha um épico."));
			ft(e, {
				get title() {
					return m(t);
				},
				compact: !0
			});
		}
	};
	L(H, (e) => {
		(m(h).missingScope || !m(F) || m(T)) && e(Ee);
	});
	var De = n(H, 2), Oe = d(De, !0), ke = n(De, 2), Ae = d(ke, !0), je = n(ke, 2);
	{
		let e = (e, t = u) => {
			var i = P(), l = a(i), g = (e) => {
				var i = P(), l = a(i), u = (e) => {
					var t = xp(), i = s(t);
					R(i, 21, () => lp, (e) => e.value, (e, t) => {
						let i = w(() => m(h).tasks.filter((e) => e.status === m(t).value));
						var a = bp(), l = s(a), u = s(l, !0), g = n(u);
						ct(g, {
							children: (e, t) => {
								r();
								var n = I();
								c(() => U(n, m(i).length)), B(e, n);
							},
							$$slots: { default: !0 }
						}), S(l);
						var _ = n(l, 2);
						R(_, 21, () => m(i), (e) => e.id, (e, t) => {
							p(e, () => m(t), () => `board:${m(t).id}`, () => !1);
						}, (e) => {
							var n = yp(), r = d(n, !0);
							c((e) => U(r, e), [() => o.vb.t(m(t).value === "todo" ? "Nada a fazer." : "Arraste um card pra cá.")]), B(e, n);
						}), S(_), S(a), c((e, n, r) => {
							A(a, "data-lane", m(t).value), A(a, "aria-label", e), M(a, 1, n), U(u, r);
						}, [
							() => o.vb.t(m(t).label),
							() => j(we("tw:min-w-0 tw:space-y-3 tw:rounded-surface tw:border tw:border-border tw:bg-muted/40 tw:p-3", m(O) === m(t).value && "tw:ring-2 tw:ring-ring")),
							() => o.vb.t(m(t).label)
						]), se("dragover", a, (e) => {
							e.dataTransfer?.types.includes("application/x-vibebook-task") && (e.preventDefault(), f(O, m(t).value, !0));
						}), se("dragleave", a, () => {
							f(O, null);
						}), se("drop", a, (e) => ve(e, m(t).value)), B(e, a);
					}), S(i), S(t), B(e, t);
				}, g = (e) => {
					var t = Cp(), i = s(t), a = (e) => {
						var t = Sp(), i = s(t), a = s(i, !0), l = n(a);
						ct(l, {
							variant: "warning",
							children: (e, t) => {
								r();
								var n = I();
								c(() => U(n, m(ae).length)), B(e, n);
							},
							$$slots: { default: !0 }
						}), S(i);
						var u = n(i, 2);
						R(u, 17, () => m(ae), (e) => e.id, (e, t) => {
							p(e, () => m(t), () => `mine:${m(t).id}`, () => !0);
						}), S(t), c((e, n) => {
							A(t, "aria-label", e), U(a, n);
						}, [() => o.vb.t("Esperando você"), () => o.vb.t("Esperando você")]), B(e, t);
					};
					L(i, (e) => {
						m(ae).length && e(a);
					});
					var l = n(i, 2);
					R(l, 17, () => m(ie), (e) => e.id, (e, t) => {
						var i = Sp(), a = s(i), o = s(a, !0), l = n(o);
						ct(l, {
							children: (e, n) => {
								r();
								var i = I();
								c(() => U(i, m(t).tasks.length)), B(e, i);
							},
							$$slots: { default: !0 }
						}), S(a);
						var u = n(a, 2);
						R(u, 17, () => m(t).tasks, (e) => e.id, (e, t) => {
							p(e, () => m(t), () => `group:${m(t).id}`, () => !0);
						}), S(i), c(() => {
							A(i, "aria-label", m(t).title), U(o, m(t).title);
						}), B(e, i);
					}, (e) => {
						{
							let t = w(() => o.vb.t("Nenhuma tarefa aberta."));
							wt(e, { get title() {
								return m(t);
							} });
						}
					}), S(t), B(e, t);
				};
				L(l, (e) => {
					t() === "board" ? e(u) : e(g, -1);
				}), B(e, i);
			};
			L(l, (e) => {
				t() === m(v) && e(g);
			}), B(e, i);
		}, t = w(() => o.vb.t("Quadro de tarefas")), i = w(() => [{
			value: "board",
			label: o.vb.t("Quadro")
		}, {
			value: "list",
			label: o.vb.t("Lista")
		}]);
		_t(je, {
			class: "tw:flex-1 tw:overflow-hidden",
			get label() {
				return m(t);
			},
			get items() {
				return m(i);
			},
			get value() {
				return m(v);
			},
			onValueChange: he,
			children: e,
			$$slots: { default: !0 }
		});
	}
	var Me = n(je, 2), Ne = s(Me), Pe = s(Ne);
	{
		let e = w(() => `${l}-title`);
		be(Pe, {
			get for() {
				return m(e);
			},
			children: (e, t) => {
				r();
				var n = I();
				c((e) => U(n, e), [() => o.vb.t("Nova tarefa")]), B(e, n);
			},
			$$slots: { default: !0 }
		});
	}
	var Fe = n(Pe, 2);
	{
		let e = w(() => `${l}-title`), t = w(() => o.vb.t("nova tarefa"));
		Ce(Fe, {
			get id() {
				return m(e);
			},
			get placeholder() {
				return m(t);
			},
			get ref() {
				return m(C);
			},
			set ref(e) {
				f(C, e, !0);
			},
			get value() {
				return m(y);
			},
			set value(e) {
				f(y, e, !0);
			}
		});
	}
	S(Ne);
	var Ie = n(Ne, 2), Le = (e) => {
		var t = wp(), i = s(t);
		{
			let e = w(() => `${l}-epic`);
			be(i, {
				get for() {
					return m(e);
				},
				children: (e, t) => {
					r();
					var n = I();
					c((e) => U(n, e), [() => o.vb.t("Épico")]), B(e, n);
				},
				$$slots: { default: !0 }
			});
		}
		var a = n(i, 2);
		{
			let e = w(() => `${l}-epic`), t = w(() => !m(F));
			Ze(a, {
				get id() {
					return m(e);
				},
				get "aria-invalid"() {
					return m(t);
				},
				get items() {
					return m(ne);
				},
				get value() {
					return m(N).id;
				},
				onValueChange: (e) => {
					let t = m(h).targets.find((t) => t.id === e);
					if (!t) return !1;
					f(N, t, !0), f(T, "");
				}
			});
		}
		S(t), B(e, t);
	};
	L(Ie, (e) => {
		m(h).scope || e(Le);
	});
	var Re = n(Ie, 2);
	{
		let e = w(() => !m(y).trim() || !m(F));
		V(Re, {
			type: "submit",
			get disabled() {
				return m(e);
			},
			children: (e, t) => {
				var r = mp(), i = a(r);
				Dt(i, { name: "plus" });
				var s = n(i, 1, !0);
				c((e) => U(s, e), [() => o.vb.t("Nova tarefa")]), B(e, r);
			},
			$$slots: { default: !0 }
		});
	}
	S(Me), S(xe), c((e, t, n) => {
		A(xe, "data-board-scope", m(h).scope ?? "all"), A(xe, "aria-label", e), U(Te, t), U(Oe, m(E)), A(ke, "id", `${l}-keys`), U(Ae, n);
	}, [
		() => o.vb.t("Quadro de tarefas"),
		() => m(h).title ?? (m(h).scope ? m(N).title : o.vb.t("Todos os épicos")),
		() => o.vb.t("Arraste, ou use ← →. Clique pra abrir o épico.")
	]), se("submit", Me, ye), B(i, xe), t();
}
Se(["click", "keydown"]);
// svelte/Board.svelte
var Dp = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy"
]);
function Op(e, n) {
	D(n, !0);
	let r = fe(n, Dp);
	var i = P(), o = a(i);
	F(o, () => JSON.stringify([n.room.id, n.thread]), (e) => {
		Ep(e, pe(() => r));
	}), B(e, i), t();
}
// svelte/panels.ts
var kp = (e) => e.type.startsWith("image/") ? "img" : e.type.startsWith("audio/") ? "audio" : e.type === "text/html" ? "html" : e.type === "application/pdf" ? "pdf" : /\.md$/i.test(e.name) || e.type === "text/markdown" ? "md" : e.type === "text/plain" || e.type === "text/csv" ? "txt" : "other", Ap = (e) => e > 1e6 ? `${(e / 1e6).toFixed(1)} MB` : `${Math.max(1, Math.round(e / 1e3))} KB`, jp = [
	["all", "Tudo"],
	["img", "Imagens"],
	["md", "Markdown"],
	["txt", "Texto e CSV"],
	["html", "HTML"],
	["pdf", "PDF"],
	["audio", "Áudios"],
	["other", "Outros"]
];
function Mp(e, t, n) {
	let r = (e.files ?? []).map((e, t) => ({
		file: e,
		index: t
	})).sort((e, t) => t.file.ts - e.file.ts || e.index - t.index).map((e) => e.file), i = { all: r.length };
	for (let e of r) {
		let t = kp(e);
		i[t] = (i[t] ?? 0) + 1;
	}
	let a = i[t] ? t : "all", o = r.filter((e) => a === "all" || kp(e) === a), s = (e) => e.name.includes("/") ? e.name.slice(0, e.name.lastIndexOf("/")) : "", c = n && o.some((e) => s(e) === n || s(e).startsWith(n + "/")) ? n : "", l = c ? c + "/" : "", u = /* @__PURE__ */ new Map(), d = [];
	for (let e of o) {
		let t = s(e);
		if (t === c) d.push(e);
		else if (t.startsWith(l)) {
			let e = t.slice(l.length).split("/")[0];
			u.set(e, (u.get(e) ?? 0) + 1);
		}
	}
	let f = /* @__PURE__ */ new Map();
	if (c) for (let e of d) f.set(e.name, (f.get(e.name) ?? 0) + 1);
	return {
		counts: i,
		kind: a,
		dir: c,
		prefix: l,
		list: c ? d.filter((e, t) => d.findIndex((t) => t.name === e.name) === t) : d,
		versions: f,
		folders: [...u].sort(([e], [t]) => e.localeCompare(t))
	};
}
function Np(e, t) {
	return e.files?.find((e) => e.id === t.id && e.name === t.name && e.type === t.type && e.ts === t.ts && e.size === t.size && e.author === t.author);
}
// svelte/Files.svelte
var Pp = z(" <small> </small>", 1), Fp = z("<div class=\"tw:flex tw:flex-wrap tw:gap-1\"></div>"), Ip = z("<div class=\"tw:flex tw:items-center tw:gap-2\"><!><!><b> </b></div>"), Lp = z("<!><b> </b><small> </small>", 1), Rp = z("<img class=\"tw:h-24 tw:w-full tw:rounded-md tw:object-contain\" loading=\"lazy\"/>"), zp = z("<!> <b class=\"tw:break-all\"> </b><small class=\"tw:text-muted-foreground\"> </small>", 1), Bp = z("<article class=\"tw:min-w-0 tw:rounded-lg tw:border tw:border-border tw:bg-card tw:p-3\"><!> <!></article>"), Vp = z("<p> </p>"), Hp = z("<!> <!> <div class=\"tw:grid tw:grid-cols-2 tw:gap-3 tw:sm:grid-cols-3\"><!> <!></div> <!>", 1), Up = z("<p role=\"status\"> </p>"), Wp = z("<p role=\"alert\" class=\"tw:text-destructive\"> </p> <!>", 1), Gp = z("<p role=\"alert\" class=\"tw:text-destructive\"> </p>"), Kp = z("<section data-vb-native=\"files\" class=\"tw:flex tw:flex-col tw:gap-3 tw:p-3 tw:font-sans tw:text-sm tw:text-foreground\"><!> <!> <!> <!></section>");
function qp(e, o) {
	D(o, !0);
	let l = () => ye(m(h), "$fileState", u), [u, f] = xe(), p = !1;
	ve(() => (p = !0, () => {
		p = !1;
	}));
	let h = w(() => o.session.state), g = w(() => Mp(o.room, l().kind, l().directory));
	_(() => {
		o.session.sync(o.room);
	});
	let v = (e) => e === "unconfirmed" ? o.vb.t("Ainda não recebi a confirmação. Confira antes de tentar de novo.") : e;
	function y(e, t, n = !1) {
		p && (o.session.select(e, t), n && o.onfolderchange());
	}
	var b = Kp(), x = s(b), C = (e) => {
		var t = Hp(), u = a(t), f = (e) => {
			var t = Fp();
			R(t, 21, () => jp.filter(([e]) => m(g).counts[e]), N, (e, t) => {
				var s = w(() => i(m(t), 2));
				let l = () => m(s)[0], u = () => m(s)[1];
				{
					let t = w(() => m(g).kind === l() ? "secondary" : "ghost"), i = w(() => m(g).kind === l());
					V(e, {
						get variant() {
							return m(t);
						},
						size: "sm",
						get "data-fkind"() {
							return l();
						},
						get "aria-pressed"() {
							return m(i);
						},
						onclick: () => y(l(), m(g).dir),
						children: (e, t) => {
							r();
							var i = Pp(), s = a(i), f = n(s), p = d(f, !0);
							c((e) => {
								U(s, `${e ?? ""} `), U(p, m(g).counts[l()]);
							}, [() => o.vb.t(u())]), B(e, i);
						},
						$$slots: { default: !0 }
					});
				}
			}), S(t), c((e) => A(t, "aria-label", e), [() => o.vb.t("Arquivos")]), B(e, t);
		};
		L(u, (e) => {
			m(g).counts.all > 1 && e(f);
		});
		var h = n(u, 2), _ = (e) => {
			var t = Ip(), i = s(t);
			V(i, {
				variant: "ghost",
				size: "sm",
				onclick: () => y(m(g).kind, m(g).dir.includes("/") ? m(g).dir.slice(0, m(g).dir.lastIndexOf("/")) : "", !0),
				children: (e, t) => {
					r();
					var n = I();
					c((e) => U(n, `← ${e ?? ""}`), [() => o.vb.t("voltar")]), B(e, n);
				},
				$$slots: { default: !0 }
			});
			var a = n(i);
			Dt(a, { name: "folder" });
			var l = n(a), u = d(l);
			S(t), c(() => U(u, `${m(g).dir ?? ""}/`)), B(e, t);
		};
		L(h, (e) => {
			m(g).dir && e(_);
		});
		var v = n(h, 2), b = s(v);
		R(b, 17, () => m(g).folders, N, (e, t) => {
			var r = w(() => i(m(t), 2));
			let s = () => m(r)[0], l = () => m(r)[1];
			{
				let t = w(() => m(g).prefix + s());
				V(e, {
					get "data-fdir"() {
						return m(t);
					},
					variant: "outline",
					class: "tw:h-auto tw:flex-col tw:items-start tw:whitespace-normal tw:p-3",
					onclick: () => y(m(g).kind, m(g).prefix + s(), !0),
					children: (e, t) => {
						var r = Lp(), i = a(r);
						Dt(i, {
							name: "folder",
							class: "tw:size-8"
						});
						var u = n(i), f = d(u), p = n(u), m = d(p, !0);
						c((e) => {
							U(f, `${s() ?? ""}/`), U(m, e);
						}, [() => l() === 1 ? o.vb.t("1 arquivo") : o.vb.t("{n} arquivos", { n: l() })]), B(e, r);
					},
					$$slots: { default: !0 }
				});
			}
		});
		var x = n(b, 2);
		R(x, 17, () => m(g).list, (e) => e.id, (e, t) => {
			let r = w(() => o.room.pins?.some((e) => e.kind === "file" && e.ref === m(t).id) ?? !1);
			var i = Bp(), u = s(i);
			V(u, {
				variant: "ghost",
				class: "tw:h-auto tw:w-full tw:min-w-0 tw:flex-col tw:items-start tw:gap-2 tw:whitespace-normal tw:p-0 tw:text-left",
				get title() {
					return m(t).name;
				},
				onclick: (e) => {
					p && e.currentTarget.isConnected && o.session.open(m(t), o.onopenfile);
				},
				children: (e, r) => {
					var i = zp(), s = a(i), l = (e) => {
						var n = Rp();
						c((e) => {
							A(n, "src", e), A(n, "alt", m(t).name);
						}, [() => `/api/books/${encodeURIComponent(o.room.id)}/files/${encodeURIComponent(m(t).id)}`]), B(e, n);
					}, u = w(() => m(t).type.startsWith("image/")), f = (e) => {
						Dt(e, {
							name: "file",
							class: "tw:size-8"
						});
					};
					L(s, (e) => {
						m(u) ? e(l) : e(f, -1);
					});
					var p = n(s, 2), h = d(p, !0), _ = n(p), v = d(_);
					c((e, t, n, r) => {
						U(h, e), U(v, `${t ?? ""} · ${n ?? ""} · ${r ?? ""}`);
					}, [
						() => m(t).name.slice(m(g).prefix.length),
						() => o.vb.name(m(t).author),
						() => o.vb.ago(m(t).ts),
						() => (m(g).versions.get(m(t).name) ?? 0) > 1 ? o.vb.t("{n} versões", { n: m(g).versions.get(m(t).name) }) : Ap(m(t).size)
					]), B(e, i);
				},
				$$slots: { default: !0 }
			});
			var f = n(u, 2);
			{
				let e = w(() => o.vb.t(m(r) ? "Desafixar" : "Fixar na lateral")), n = w(() => !!l().pending), i = w(() => l().pending?.id === m(t).id);
				mt(f, {
					icon: "pin",
					get label() {
						return m(e);
					},
					get "aria-pressed"() {
						return m(r);
					},
					get disabled() {
						return m(n);
					},
					get loading() {
						return m(i);
					},
					onclick: (e) => {
						p && e.currentTarget.isConnected && o.session.toggle(m(t), o.request);
					}
				});
			}
			S(i), c(() => A(i, "data-file-id", m(t).id)), B(e, i);
		}), S(v);
		var C = n(v, 2), T = (e) => {
			var t = Vp(), n = d(t, !0);
			c((e) => U(n, e), [() => o.vb.t("Nada aqui.")]), B(e, t);
		};
		L(C, (e) => {
			!m(g).list.length && !m(g).folders.length && e(T);
		}), B(e, t);
	}, T = (e) => {
		var t = Vp(), n = d(t, !0);
		c((e) => U(n, e), [() => o.vb.t("Cole uma imagem no chat (Cmd+V), arraste um arquivo ou use o clipe. Tudo que for enviado neste vibebook fica aqui.")]), B(e, t);
	};
	L(x, (e) => {
		o.room.files?.length ? e(C) : !l().loading && !l().loadError && e(T, 1);
	});
	var E = n(x, 2), O = (e) => {
		var t = Up(), n = d(t, !0);
		c((e) => U(n, e), [() => o.vb.t("Carregando…")]), B(e, t);
	};
	L(E, (e) => {
		l().loading && e(O);
	});
	var k = n(E, 2), j = (e) => {
		var t = Wp(), i = a(t), s = d(i, !0), u = n(i, 2);
		V(u, {
			variant: "outline",
			onclick: () => {
				p && o.session.load(o.request);
			},
			children: (e, t) => {
				r();
				var n = I();
				c((e) => U(n, e), [() => o.vb.t("Tentar novamente")]), B(e, n);
			},
			$$slots: { default: !0 }
		}), c((e) => U(s, e), [() => v(l().loadError)]), B(e, t);
	};
	L(k, (e) => {
		l().loadError && e(j);
	});
	var M = n(k, 2), ee = (e) => {
		var t = Gp(), n = d(t, !0);
		c((e) => U(n, e), [() => v(l().error)]), B(e, t);
	};
	L(M, (e) => {
		l().error && e(ee);
	}), S(b), c((e) => A(b, "aria-label", e), [() => o.vb.t("Arquivos")]), B(e, b), t(), f();
}
// svelte/features/rich-text/RichContent.svelte
var Jp = z("<span data-rich-content=\"\" data-vb-native=\"\" class=\"tw:min-w-0 tw:break-words tw:font-sans tw:leading-6 tw:text-foreground\"><!></span>"), Yp = z("<div data-rich-content=\"\" data-vb-native=\"\"><!></div>");
function Xp(e, n) {
	let r = ee();
	D(n, !0);
	let i = H(n, "mode", 3, "markdown"), o = El();
	de(() => o.dispose());
	let l = w(() => o.render(n.text, i(), {
		room: n.room,
		policy: n.policy,
		names: n.names,
		pageUrl: n.pageUrl || location.href,
		idPrefix: r
	}));
	var u = P(), d = a(u), f = (e) => {
		var t = Jp();
		Sn(s(t), {
			get nodes() {
				return m(l);
			},
			get actions() {
				return n.actions;
			}
		}), S(t), B(e, t);
	}, p = (e) => {
		var t = Yp();
		Sn(s(t), {
			get nodes() {
				return m(l);
			},
			get actions() {
				return n.actions;
			}
		}), S(t), c(() => M(t, 1, j(i() === "human" || m(l).length === 1 && m(l)[0].kind === "text" ? "tw:min-w-0 tw:max-w-full tw:overflow-x-auto tw:whitespace-pre-wrap tw:break-words tw:font-sans tw:leading-6 tw:text-foreground" : "tw:min-w-0 tw:max-w-full tw:overflow-x-auto tw:break-words tw:font-sans tw:leading-6 tw:text-foreground"))), B(e, t);
	};
	L(d, (e) => {
		i() === "inline" ? e(f) : e(p, -1);
	}), B(e, u), t();
}
// svelte/features/file-viewer/ViewerMedia.svelte
var Zp = z("<img class=\"tw:mx-auto tw:block tw:max-h-[70dvh] tw:max-w-full tw:object-contain\"/>"), Qp = z("<audio controls=\"\" preload=\"metadata\" class=\"tw:mx-auto tw:block tw:w-full tw:max-w-xl\"></audio>"), $p = z("<iframe sandbox=\"allow-scripts\" referrerpolicy=\"no-referrer\" class=\"tw:block tw:h-[70dvh] tw:w-full tw:border-0 tw:bg-background\"></iframe>"), em = z("<iframe referrerpolicy=\"no-referrer\" class=\"tw:block tw:h-[70dvh] tw:w-full tw:border-0 tw:bg-background\"></iframe>");
function tm(n, r) {
	D(r, !0);
	let i = e(void 0), o = e(void 0), s = e(void 0);
	ve(() => {
		let e = !0, t = (t) => {
			e && r.content.kind === "html" && m(s)?.isConnected && t.source === m(s).contentWindow && typeof t.data == "object" && t.data !== null && "vbViewer" in t.data && t.data.vbViewer === "esc" && r.onclose();
		};
		return window.addEventListener("message", t), () => {
			e = !1, window.removeEventListener("message", t), m(o) && (m(o).pause(), m(o).removeAttribute("src"), m(o).load()), m(s) && (m(s).src = "about:blank"), m(i) && m(i).removeAttribute("src");
		};
	});
	var l = P(), u = a(l), d = (e) => {
		var t = Zp();
		le(t, (e) => f(i, e), () => m(i)), c(() => {
			A(t, "src", r.content.url), A(t, "alt", r.name);
		}), se("load", t, function(...e) {
			r.onready?.apply(this, e);
		}), se("error", t, function(...e) {
			r.onerror?.apply(this, e);
		}), ce(t), B(e, t);
	}, p = (e) => {
		var t = Qp();
		le(t, (e) => f(o, e), () => m(o)), c(() => {
			A(t, "src", r.content.url), A(t, "aria-label", r.name);
		}), se("loadedmetadata", t, function(...e) {
			r.onready?.apply(this, e);
		}), se("error", t, function(...e) {
			r.onerror?.apply(this, e);
		}), B(e, t);
	}, h = (e) => {
		var t = $p();
		le(t, (e) => f(s, e), () => m(s)), c(() => {
			A(t, "src", r.content.url), A(t, "title", r.name);
		}), se("load", t, function(...e) {
			r.onready?.apply(this, e);
		}), se("error", t, function(...e) {
			r.onerror?.apply(this, e);
		}), ce(t), B(e, t);
	}, g = (e) => {
		var t = em();
		le(t, (e) => f(s, e), () => m(s)), c(() => {
			A(t, "src", r.content.url), A(t, "title", r.name);
		}), se("load", t, function(...e) {
			r.onready?.apply(this, e);
		}), se("error", t, function(...e) {
			r.onerror?.apply(this, e);
		}), ce(t), B(e, t);
	};
	L(u, (e) => {
		r.content.kind === "image" ? e(d) : r.content.kind === "audio" ? e(p, 1) : r.content.kind === "html" ? e(h, 2) : r.content.kind === "pdf" && e(g, 3);
	}), B(n, l), t();
}
// svelte/features/file-viewer/copy.ts
function nm(e, t) {
	return e === "en" ? rm[t] : im[t];
}
var rm = {
	column: "Column",
	previous: "Previous rows",
	next: "Next rows",
	rows: "Rows",
	closing: "The browser has not confirmed closing this file. Navigation is waiting. Reload this page to recover.",
	reload: "Reload page",
	close: "Close file",
	loading: "Loading file…",
	retry: "Retry",
	external: "Open in a new tab",
	download: "Download / open file",
	version: "File version",
	history: "Loading version history…",
	historyError: "Version history is unconfirmed.",
	retryHistory: "Retry version history",
	truncated: "Preview shortened. Open the original file to read the rest.",
	unavailable: "This preview is unavailable.",
	missing: "This file is no longer available.",
	changed: "File metadata changed. Reopen the file from its current entry.",
	denied: "You need room access to open this file.",
	access: "Review file access",
	timeout: "The file did not finish loading. Retry when connected.",
	pin: "Pin this version",
	unpin: "Unpin this version",
	pinError: "The pin change is unconfirmed. Review the current pin before retrying."
}, im = {
	column: "Coluna",
	previous: "Linhas anteriores",
	next: "Próximas linhas",
	rows: "Linhas",
	closing: "O navegador não confirmou o fechamento deste arquivo. A navegação está aguardando. Recarregue a página para recuperar.",
	reload: "Recarregar página",
	close: "Fechar arquivo",
	loading: "Carregando arquivo…",
	retry: "Tentar de novo",
	external: "Abrir em outra aba",
	download: "Baixar / abrir arquivo",
	version: "Versão do arquivo",
	history: "Carregando histórico de versões…",
	historyError: "O histórico de versões não foi confirmado.",
	retryHistory: "Tentar carregar o histórico",
	truncated: "Prévia reduzida. Abra o arquivo original para ler o restante.",
	unavailable: "Esta prévia não está disponível.",
	missing: "Este arquivo não está mais disponível.",
	changed: "Os dados do arquivo mudaram. Abra o arquivo pela entrada atual.",
	denied: "Você precisa de acesso à sala para abrir este arquivo.",
	access: "Revisar acesso ao arquivo",
	timeout: "O arquivo não terminou de carregar. Tente de novo quando estiver conectado.",
	pin: "Fixar esta versão",
	unpin: "Desafixar esta versão",
	pinError: "A alteração não foi confirmada. Confira o pin atual antes de tentar de novo."
}, am = z("<label class=\"tw:flex tw:min-w-0 tw:flex-1 tw:items-center tw:gap-2 tw:text-sm\"> <!></label>"), om = z("<p role=\"status\" class=\"tw:m-0 tw:text-sm tw:text-muted-foreground\"> </p>"), sm = z("<div class=\"tw:flex tw:flex-wrap tw:items-center tw:gap-2\"><p role=\"alert\" class=\"tw:m-0 tw:text-sm tw:text-destructive\"> </p> <!></div>"), cm = z("<p role=\"alert\" class=\"tw:m-0 tw:text-sm tw:text-destructive\"> </p>"), lm = z("<p role=\"status\" class=\"tw:m-0 tw:text-muted-foreground\"> </p>"), um = z("<a> </a>"), dm = z("<p role=\"alert\" class=\"tw:m-0 tw:text-destructive\"> </p> <!>", 1), fm = z("<th scope=\"col\" class=\"tw:whitespace-pre-wrap tw:border tw:border-border tw:p-2 tw:font-semibold\"> </th>"), pm = z("<td class=\"tw:whitespace-pre-wrap tw:border tw:border-border tw:p-2\"> </td>"), mm = z("<tr></tr>"), hm = z("<div class=\"tw:max-w-full tw:overflow-auto\"><table class=\"tw:w-full tw:border-collapse tw:text-left tw:text-sm\"><thead><tr></tr></thead><tbody></tbody></table></div>"), gm = z("<pre class=\"tw:m-0 tw:max-w-full tw:overflow-auto tw:whitespace-pre-wrap tw:break-words tw:font-mono tw:text-sm\"> </pre>"), _m = z("<a target=\"_blank\" rel=\"noopener noreferrer\"> </a>"), vm = z("<nav class=\"tw:flex tw:flex-wrap tw:items-center tw:gap-2\"><!><span> </span><!></nav>"), ym = z("<!> <!> <!>", 1), bm = z("<div data-file-viewer=\"\" class=\"tw:flex tw:min-h-0 tw:flex-1 tw:flex-col tw:gap-4\"><div class=\"tw:flex tw:flex-wrap tw:items-center tw:gap-2\"><!> <!> <a target=\"_blank\" rel=\"noopener noreferrer\"> </a></div> <!> <!> <!> <!> <!></div>"), xm = z("<div data-vb-native=\"\" role=\"alert\" class=\"tw:fixed tw:inset-x-4 tw:top-4 tw:z-50 tw:flex tw:flex-wrap tw:items-center tw:gap-3 tw:rounded-surface tw:border tw:border-border tw:bg-card tw:p-4 tw:font-sans tw:text-sm tw:text-card-foreground tw:shadow-lg\"><p class=\"tw:m-0 tw:flex-1\"> </p> <!></div>"), Sm = z("<!> <!>", 1);
function Cm(i, o) {
	D(o, !0);
	let l = () => ye(y, "$view", u), [u, p] = xe(), g = H(o, "lang", 3, "pt"), v = H(o, "iosStandalone", 3, !1), y = b(() => o.controller.state), x = (e) => nm(g(), e), C = e(0), T = w(() => l().content?.kind === "csv" ? l().content.text ?? "" : null), E = w(() => m(T) === null ? {
		rows: [],
		truncated: !1
	} : zt(m(T))), O = w(() => Array.from({ length: m(E).rows.reduce((e, t) => Math.max(e, t.length), 0) }, (e, t) => m(E).rows[0]?.[t] ?? "")), k = w(() => m(E).rows.slice(m(C) * 19 + 1, (m(C) + 1) * 19 + 1));
	_(() => {
		l().content?.operation, f(C, 0);
	});
	let ee = w(() => l().room?.pins?.some((e) => e.kind === "file" && e.ref === l().target?.id)), te = w(() => {
		let e = l().content?.operation, t = () => e !== void 0 && o.controller.current(e), n = (e) => {
			t() && (o.controller.closeUser(), o.controller.deferNavigation(e) || e());
		};
		return {
			navigate: (e, t) => n(() => o.actions.navigate(e, t)),
			openFile: (e) => {
				t() && o.actions.openFile(e);
			},
			navigateRich: (e) => n(() => o.actions.navigateRich?.(e)),
			openFileReference: (e) => {
				t() && o.actions.openFileReference?.(e);
			}
		};
	});
	de(() => o.controller.closeNavigation());
	var ne = Sm(), re = a(ne);
	{
		let e = w(() => l().name || "File"), t = w(() => x("close"));
		Ot(re, {
			get open() {
				return l().open;
			},
			get title() {
				return m(e);
			},
			get closeLabel() {
				return m(t);
			},
			fullScreen: !0,
			returnFocus: () => o.controller.returnFocus(),
			onOpenChange: (e) => {
				e || o.controller.closeUser();
			},
			children: (e, t) => {
				var i = P(), u = a(i), p = (e) => {
					var t = bm(), i = s(t), u = s(i), p = (e) => {
						var t = am(), r = s(t), i = n(r);
						{
							let e = w(() => x("version")), t = w(() => l().versions.map((e, t) => ({
								value: e.id,
								label: `v${l().versions.length - t} · ${new Date(e.ts).toLocaleString(g() === "en" ? "en" : "pt-BR")}`
							})));
							Ze(i, {
								get "aria-label"() {
									return m(e);
								},
								get value() {
									return l().target.id;
								},
								get items() {
									return m(t);
								},
								onchange: (e) => {
									e.currentTarget.isConnected && o.controller.select(e.currentTarget.value);
								},
								class: "tw:min-w-0"
							});
						}
						S(t), c((e) => U(r, `${e ?? ""} `), [() => x("version")]), B(e, t);
					};
					L(u, (e) => {
						l().versions.length > 1 && e(p);
					});
					var _ = n(u, 2), y = (e) => {
						V(e, {
							variant: "outline",
							get disabled() {
								return l().pinPending;
							},
							onclick: (e) => {
								e.currentTarget.isConnected && o.controller.togglePin();
							},
							children: (e, t) => {
								r();
								var n = I();
								c((e) => U(n, e), [() => m(ee) ? x("unpin") : x("pin")]), B(e, n);
							},
							$$slots: { default: !0 }
						});
					};
					L(_, (e) => {
						l().file && e(y);
					});
					var b = n(_, 2), T = d(b, !0);
					S(i);
					var D = n(i, 2), ne = (e) => {
						var t = om(), n = d(t, !0);
						c((e) => U(n, e), [() => x("history")]), B(e, t);
					};
					L(D, (e) => {
						l().indexPending && e(ne);
					});
					var re = n(D, 2), ie = (e) => {
						var t = sm(), i = s(t), a = d(i, !0), l = n(i, 2);
						V(l, {
							variant: "outline",
							onclick: (e) => {
								e.currentTarget.isConnected && o.controller.retryIndex();
							},
							children: (e, t) => {
								r();
								var n = I();
								c((e) => U(n, e), [() => x("retryHistory")]), B(e, n);
							},
							$$slots: { default: !0 }
						}), S(t), c((e) => U(a, e), [() => x("historyError")]), B(e, t);
					};
					L(re, (e) => {
						l().indexError && e(ie);
					});
					var ae = n(re, 2), z = (e) => {
						var t = cm(), n = d(t, !0);
						c((e) => U(n, e), [() => x("pinError")]), B(e, t);
					};
					L(ae, (e) => {
						l().pinError && e(z);
					});
					var oe = n(ae, 2), se = (e) => {
						var t = lm(), n = d(t, !0);
						c((e) => U(n, e), [() => x("loading")]), B(e, t);
					};
					L(oe, (e) => {
						l().phase === "loading" && e(se);
					});
					var ce = n(oe, 2), le = (e) => {
						var t = dm(), i = a(t), s = d(i, !0), u = n(i, 2), f = (e) => {
							var t = um(), n = d(t, !0);
							c((e, r, i) => {
								A(t, "href", e), M(t, 1, r), U(n, i);
							}, [
								() => Ut(l().target),
								() => j(ue()),
								() => x("access")
							]), B(e, t);
						}, p = w(() => ["signed-out", "forbidden"].includes(l().error)), h = (e) => {
							V(e, {
								variant: "outline",
								onclick: (e) => {
									e.currentTarget.isConnected && o.controller.retry();
								},
								children: (e, t) => {
									r();
									var n = I();
									c((e) => U(n, e), [() => x("retry")]), B(e, n);
								},
								$$slots: { default: !0 }
							});
						}, g = w(() => !["missing", "metadata-changed"].includes(l().error));
						L(u, (e) => {
							m(p) ? e(f) : m(g) && e(h, 1);
						}), c((e) => U(s, e), [() => x(l().error === "missing" ? "missing" : l().error === "metadata-changed" ? "changed" : ["signed-out", "forbidden"].includes(l().error) ? "denied" : l().error === "read-timeout" ? "timeout" : "unavailable")]), B(e, t);
					}, de = (e) => {
						var t = ym(), i = a(t);
						F(i, () => l().content.operation, (e) => {
							var t = P(), r = a(t), i = (e) => {
								let t = w(() => l().content.operation);
								tm(e, {
									get content() {
										return l().content;
									},
									get name() {
										return l().name;
									},
									onready: () => o.controller.ready(m(t)),
									onerror: () => o.controller.mediaError(m(t)),
									onclose: () => {
										o.controller.current(m(t)) && o.controller.closeUser();
									}
								});
							}, u = w(() => [
								"image",
								"audio",
								"html",
								"pdf"
							].includes(l().content.kind)), f = (e) => {
								{
									let t = w(() => l().content.text ?? "");
									Xp(e, {
										get text() {
											return m(t);
										},
										get room() {
											return l().room;
										},
										get actions() {
											return m(te);
										},
										policy: "file-preview",
										pageUrl: location.href
									});
								}
							}, p = (e) => {
								var t = hm(), r = s(t), i = s(r), a = s(i);
								R(a, 21, () => m(O), N, (e, t, n) => {
									var r = fm(), i = d(r, !0);
									c((e) => {
										A(r, "aria-label", e), U(i, m(t));
									}, [() => m(t).trim() ? void 0 : `${x("column")} ${n + 1}`]), B(e, r);
								}), S(a), S(i);
								var o = n(i);
								R(o, 21, () => m(k), N, (e, t) => {
									var n = mm();
									R(n, 21, () => m(t), N, (e, t) => {
										var n = pm(), r = d(n, !0);
										c(() => U(r, m(t))), B(e, n);
									}), S(n), B(e, n);
								}), S(o), S(r), S(t), B(e, t);
							}, h = (e) => {
								var t = gm(), n = d(t, !0);
								c(() => U(n, l().content.text)), B(e, t);
							}, g = (e) => {
								var t = _m(), n = d(t, !0);
								c((e, r, i) => {
									A(t, "href", e), M(t, 1, r), U(n, i);
								}, [
									() => Ut(l().target),
									() => j(ue()),
									() => x("download")
								]), B(e, t);
							};
							L(r, (e) => {
								m(u) ? e(i) : l().content.kind === "markdown" && l().room && l().phase === "ready" ? e(f, 1) : l().content.kind === "csv" && l().phase === "ready" ? e(p, 2) : l().content.kind === "text" && l().phase === "ready" ? e(h, 3) : l().content.kind === "download" && e(g, 4);
							}), B(e, t);
						});
						var u = n(i, 2), p = (e) => {
							var t = vm(), i = s(t);
							{
								let e = w(() => m(C) === 0);
								V(i, {
									variant: "outline",
									get disabled() {
										return m(e);
									},
									onclick: (e) => {
										e.currentTarget.isConnected && f(C, Math.max(0, m(C) - 1), !0);
									},
									children: (e, t) => {
										r();
										var n = I();
										c((e) => U(n, e), [() => x("previous")]), B(e, n);
									},
									$$slots: { default: !0 }
								});
							}
							var a = n(i), o = d(a), l = n(a);
							{
								let e = w(() => (m(C) + 1) * 19 + 1 >= m(E).rows.length);
								V(l, {
									variant: "outline",
									get disabled() {
										return m(e);
									},
									onclick: (e) => {
										e.currentTarget.isConnected && h(C);
									},
									children: (e, t) => {
										r();
										var n = I();
										c((e) => U(n, e), [() => x("next")]), B(e, n);
									},
									$$slots: { default: !0 }
								});
							}
							S(t), c((e, n, r) => {
								A(t, "aria-label", e), U(o, `${n ?? ""}
              ${m(C) * 19 + 2}–${r ?? ""} /
              ${m(E).rows.length ?? ""}`);
							}, [
								() => x("rows"),
								() => x("rows"),
								() => Math.min((m(C) + 1) * 19 + 1, m(E).rows.length)
							]), B(e, t);
						};
						L(u, (e) => {
							l().content.kind === "csv" && m(E).rows.length > 20 && e(p);
						});
						var g = n(u, 2), _ = (e) => {
							var t = om(), n = d(t, !0);
							c((e) => U(n, e), [() => x("truncated")]), B(e, t);
						};
						L(g, (e) => {
							(l().content.truncated || l().content.kind === "csv" && m(E).truncated) && e(_);
						}), B(e, t);
					};
					L(ce, (e) => {
						l().phase === "error" ? e(le) : l().content && e(de, 1);
					}), S(t), c((e, n, r) => {
						A(t, "data-file-id", l().target.id), M(b, 1, e), A(b, "href", n), U(T, r);
					}, [
						() => j(ue({ variant: "outline" })),
						() => Ht(l().target, location.origin, v()),
						() => x("external")
					]), B(e, t);
				};
				L(u, (e) => {
					l().target && e(p);
				}), B(e, i);
			},
			$$slots: { default: !0 }
		});
	}
	var ie = n(re, 2), ae = (e) => {
		var t = xm(), i = s(t), a = d(i, !0), o = n(i, 2);
		V(o, {
			onclick: (e) => {
				e.currentTarget.isConnected && location.reload();
			},
			children: (e, t) => {
				r();
				var n = I();
				c((e) => U(n, e), [() => x("reload")]), B(e, n);
			},
			$$slots: { default: !0 }
		}), S(t), c((e) => U(a, e), [() => x("closing")]), B(e, t);
	};
	L(ie, (e) => {
		l().closingUnconfirmed && e(ae);
	}), B(i, ne), t(), p();
}
// svelte/features/file-viewer/ThreadFiles.svelte
var wm = z("<span class=\"tw:text-xs tw:text-muted-foreground\"> </span>"), Tm = z("<a target=\"_blank\" rel=\"noopener noreferrer\" class=\"tw:inline-flex tw:max-w-full tw:items-center tw:gap-1 tw:rounded-control tw:border tw:border-border tw:bg-card tw:px-2 tw:py-1 tw:text-foreground tw:no-underline tw:hover:bg-muted\"><!><span class=\"tw:truncate\"> </span><!></a>"), Em = z("<div data-vb-native=\"\" data-thread-files=\"\" class=\"tw:flex tw:flex-wrap tw:items-center tw:gap-2 tw:p-2 tw:font-sans tw:text-sm tw:text-foreground\"><span class=\"tw:flex tw:items-center tw:gap-1 tw:text-muted-foreground\"><!> </span><!></div>");
function Dm(e, r) {
	D(r, !0);
	let i = H(r, "lang", 3, "pt"), o = w(() => {
		let e = /* @__PURE__ */ new Map();
		if (r.thread === "main" || !r.room.epics.some((e) => e.id === r.thread)) return [];
		for (let t of [...r.room.messages, ...r.room.origins || []]) if (t.thread === r.thread) for (let n of t.files || []) {
			let t = e.get(n.name);
			t || (t = /* @__PURE__ */ new Map(), e.set(n.name, t)), t.set(n.id, n);
		}
		return [...e.values()].map((e) => {
			let t = [...e.values()].sort((e, t) => t.ts - e.ts);
			return {
				file: t[0],
				count: t.length
			};
		}).sort((e, t) => t.file.ts - e.file.ts).slice(0, 8);
	});
	var l = P(), u = a(l), f = (e) => {
		var t = Em(), a = s(t), l = s(a);
		Dt(l, { name: "file" });
		var u = n(l, 1, !0);
		S(a);
		var f = n(a);
		R(f, 17, () => m(o), ({ file: e, count: t }) => e.id, (e, t) => {
			let i = () => m(t).file, a = () => m(t).count;
			var o = Tm(), l = s(o);
			Dt(l, { name: "file" });
			var u = n(l), f = d(u, !0), p = n(u), h = (e) => {
				var t = wm(), n = d(t);
				c(() => U(n, `v${a() ?? ""}`)), B(e, t);
			};
			L(p, (e) => {
				a() > 1 && e(h);
			}), S(o), c((e) => {
				A(o, "href", e), A(o, "title", i().name), U(f, i().name);
			}, [() => Ut({
				roomId: r.room.id,
				id: i().id
			})]), te("click", o, (e) => {
				!e.currentTarget.isConnected || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0 || (e.preventDefault(), r.onopen(i(), e.currentTarget));
			}), B(e, o);
		}), S(t), c(() => U(u, i() === "en" ? "Files from this thread" : "Arquivos deste épico")), B(e, t);
	};
	L(u, (e) => {
		m(o).length && e(f);
	}), B(e, l), t();
}
Se(["click"]);
// svelte/features/file-viewer/api.ts
var Om = 12e5, km = 3e5, Am = W({
	type: Fe(),
	name: Ne(Fe()),
	size: Ne(Le())
}), jm = class extends Error {
	status;
	constructor(e, t) {
		super(t), this.status = e;
	}
};
function Mm(e) {
	let t = e.headers.get("content-disposition") ?? "", n = /filename\*=UTF-8''([^;]+)/i.exec(t)?.[1], r;
	try {
		n && (r = decodeURIComponent(n));
	} catch {}
	let i = /^bytes \d+-\d+\/(\d+)$/.exec(e.headers.get("content-range") ?? ""), a = e.headers.get("content-length"), o = i ? Number(i[1]) : a && e.status === 200 ? Number(a) : void 0;
	return Am.parse({
		type: e.headers.get("content-type") ?? "application/octet-stream",
		name: r,
		size: Number.isSafeInteger(o) && Number(o) >= 0 ? o : void 0
	});
}
function Nm(e) {
	if (!e.ok) throw new jm(e.status, e.status === 401 ? "signed-out" : e.status === 403 ? "forbidden" : e.status === 404 ? "missing" : "read-failed");
}
function Pm(e = fetch) {
	return {
		async probe(t, n) {
			let r = await e(Ut(t), {
				headers: {
					accept: "application/octet-stream",
					range: "bytes=0-0"
				},
				credentials: "same-origin",
				cache: "no-store",
				signal: n
			});
			try {
				if (Nm(r), r.status !== 200 && r.status !== 206 || r.status === 206 && !/^bytes 0-0\/[1-9]\d*$/.test(r.headers.get("content-range") ?? "")) throw new jm(r.status, "invalid-range");
				return Mm(r);
			} finally {
				await r.body?.cancel().catch(() => {});
			}
		},
		async text(t, n) {
			let r = await e(Ut(t), {
				headers: { accept: "text/plain" },
				credentials: "same-origin",
				cache: "no-store",
				signal: n
			});
			try {
				Nm(r);
			} catch (e) {
				throw await r.body?.cancel().catch(() => {}), e;
			}
			let i = Mm(r);
			if (!r.body) return {
				metadata: i,
				text: "",
				truncated: !1
			};
			let a = r.body.getReader(), o = new TextDecoder(), s = "", c = 0, l = !1;
			try {
				for (;;) {
					let e = await a.read();
					if (e.done) {
						s += o.decode();
						break;
					}
					let t = Om - c;
					if (e.value.byteLength > t) {
						s += o.decode(e.value.subarray(0, Math.max(0, t)), { stream: !0 }), l = !0;
						break;
					}
					if (c += e.value.byteLength, s += o.decode(e.value, { stream: !0 }), s.length > 3e5) {
						l = !0;
						break;
					}
					if (c === 12e5) {
						(await a.read()).done ? s += o.decode() : l = !0;
						break;
					}
				}
			} finally {
				await a.cancel().catch(() => {}), a.releaseLock();
			}
			return {
				metadata: i,
				text: s.slice(0, km),
				truncated: l || s.length > 3e5
			};
		}
	};
}
// svelte/features/file-viewer/history.ts
var Fm = {
	schedule: (e, t) => setTimeout(e, t),
	cancel: (e) => clearTimeout(e)
}, Im = W({
	token: Fe(),
	roomId: Fe(),
	id: Fe(),
	returnURL: Fe()
}), Lm = W({ vbFileViewer: Im });
function Rm(e) {
	let t = e.clock ?? Fm, n = e.enqueue ?? queueMicrotask, r = !0, i = null, a = null, o = null, s = null, c = 0, l = 0, u = (t, n) => {
		try {
			let r = new URL(e.href()), i = new URL(t, r);
			return i.origin === r.origin && RegExp(`^/b/${n}/?$`).test(i.pathname) ? i.pathname + i.search + i.hash : null;
		} catch {
			return null;
		}
	}, d = () => {
		let t = Lm.safeParse(e.state());
		if (!t.success) return null;
		let n = Wt.safeParse(t.data.vbFileViewer);
		return !n.success || !u(t.data.vbFileViewer.returnURL, n.data.roomId) || !u(e.href(), n.data.roomId) ? null : t.data.vbFileViewer;
	}, f = (t, n) => {
		let r = Wt.parse(t), i = new URL(Lt(r), e.href()), a = new URL(e.href());
		i.pathname = a.pathname, i.search = a.search, e.history[n ? "replaceState" : "pushState"]({ vbFileViewer: t }, "", i.pathname + i.search + i.hash);
	}, p = () => {
		o !== null && t.cancel(o), o = null;
	}, m = (e) => {
		p(), a = null;
		let t = s;
		s = null;
		let i = l;
		e && t && n(() => {
			r && l === i && t();
		});
	};
	return {
		incomingTarget() {
			let t = d(), n = Mt(e.href());
			return t && n?.roomId === t.roomId && n.id === t.id ? n : null;
		},
		open(t) {
			if (!r) return;
			l++;
			let n = Wt.parse(t), a = d(), o = new URL(e.href());
			if (i && a?.token === i.token) {
				i = {
					...i,
					...n
				}, f(i, !0);
				return;
			}
			if (a && a.roomId === n.roomId && o.hash === `#f${n.id}`) {
				i = {
					...a,
					...n
				};
				return;
			}
			/^#f[0-9a-f]+$/.test(o.hash) && (o.hash = "", e.history.replaceState(null, "", o.pathname + o.search));
			let s = u(o.pathname + o.search + o.hash, n.roomId);
			if (!s) throw Error("viewer-route-mismatch");
			i = {
				...n,
				token: `file-${++c}-${Math.random().toString(36).slice(2)}`,
				returnURL: s
			}, f(i, !1);
		},
		replace(e) {
			if (!r || !i) return;
			let t = Wt.parse(e);
			t.roomId === i.roomId && (i = {
				...i,
				...t
			}, d()?.token === i.token && f(i, !0));
		},
		closeUser() {
			if (!r || !i) return;
			let n = i;
			i = null, d()?.token === n.token && (a = n, e.history.back(), p(), o = t.schedule(() => {
				r && a?.token === n.token && (o = null, e.unconfirmed?.());
			}, 1500));
		},
		closeNavigation() {
			if (!r) return;
			l++;
			let t = i;
			i = null;
			let n = d();
			t && n?.token === t.token && e.history.replaceState(null, "", new URL(e.href()).pathname + new URL(e.href()).search + new URL(e.href()).hash);
		},
		deferNavigation(e) {
			return !r || !a ? !1 : (l++, s = e, !0);
		},
		consumePop() {
			if (!r) return "none";
			let t = a ?? i;
			if (!t) return "none";
			let n = new URL(e.href()), o = n.pathname + n.search + n.hash;
			i = null, e.closed();
			let s = o === t.returnURL;
			return a && m(s), s ? "handled" : "route";
		},
		reset() {
			l++, i = null, a = null, s = null, p();
		},
		dispose() {
			l++, r = !1, i = null, a = null, s = null, p();
		}
	};
}
// svelte/features/files/session.ts
var zm = 1e4, Bm = {
	schedule: (e, t) => setTimeout(e, t),
	cancel: (e) => clearTimeout(e)
};
function Vm(e, t = Bm) {
	let n = v({
		kind: "all",
		directory: "",
		pending: null,
		error: "",
		loading: !1,
		loadError: ""
	}), r = !0, i = null, a = 0, o = 0, s = null, c = null, l = () => {
		s !== null && t.cancel(s), s = null;
	}, u = () => {
		c !== null && t.cancel(c), c = null;
	}, d = () => {
		let e = T(n).pending;
		e?.ack && i && (e.pin ? i.pins?.some((t) => t.kind === "file" && t.ref === e.id) : !i.pins?.some((t) => t.id === e.pinId)) && (l(), n.update((e) => ({
			...e,
			pending: null
		})));
	};
	async function f(e, t) {
		try {
			return await e(t);
		} catch (e) {
			return {
				ok: !1,
				error: e instanceof Error ? e.message : String(e)
			};
		}
	}
	return {
		roomId: e,
		state: n,
		sync(t, a = !1) {
			r && t.id === e && (i = t, (a || t.filesAll && (T(n).loading || T(n).loadError)) && (u(), ++o, n.update((e) => ({
				...e,
				loading: !1,
				loadError: ""
			}))), d());
		},
		select(e, t) {
			r && n.update((n) => ({
				...n,
				kind: e,
				directory: t
			}));
		},
		open(e, t) {
			if (!r || !i) return !1;
			let n = Np(i, e);
			return n ? (t(n), !0) : !1;
		},
		async load(e) {
			if (!r || !i || i.filesAll || T(n).loading) return;
			let a = ++o;
			n.update((e) => ({
				...e,
				loading: !0,
				loadError: ""
			}));
			let s = await f(e, { t: "files.get" });
			r && a === o && (s.ok ? T(n).loading && (c = t.schedule(() => {
				r && a === o && (c = null, n.update((e) => ({
					...e,
					loading: !1,
					loadError: "unconfirmed"
				})));
			}, zm)) : n.update((e) => ({
				...e,
				loading: !1,
				loadError: s.error
			})));
		},
		async toggle(e, o) {
			if (!r || !i || T(n).pending) return;
			let c = Np(i, e);
			if (!c) return;
			let l = i.pins?.find((e) => e.kind === "file" && e.ref === c.id), u = ++a;
			n.update((e) => ({
				...e,
				pending: {
					id: c.id,
					pin: !l,
					pinId: l?.id,
					ack: !1
				},
				error: ""
			}));
			let p = await f(o, l ? {
				t: "pin.del",
				id: l.id
			} : {
				t: "pin.add",
				kind: "file",
				ref: c.id
			});
			r && u === a && (p.ok ? (n.update((e) => ({
				...e,
				pending: e.pending ? {
					...e.pending,
					ack: !0
				} : null
			})), d(), T(n).pending && (s = t.schedule(() => {
				r && u === a && T(n).pending && (s = null, n.update((e) => ({
					...e,
					pending: null,
					error: "unconfirmed"
				})));
			}, zm))) : n.update((e) => ({
				...e,
				pending: null,
				error: p.error
			})));
		},
		dispose() {
			r = !1, l(), u(), a++, o++, i = null;
		}
	};
}
// svelte/features/file-viewer/session.ts
var Hm = () => ({
	open: !1,
	room: null,
	target: null,
	file: void 0,
	name: "",
	versions: [],
	phase: "idle",
	error: "",
	content: null,
	indexPending: !1,
	indexError: "",
	pinPending: !1,
	pinError: "",
	closingUnconfirmed: !1
}), Um = (e) => e instanceof Error ? e.message : "read-failed";
function Wm(e) {
	let t = e.clock ?? Fm, n = e.api ?? Pm(), r = v(Hm()), i = !0, a = null, o, s = 0, c = 0, l = !1, u = null, d = null, f = null, p = null, m = null, h, g = () => {
		h?.(), h = void 0, m?.dispose(), m = null;
	}, _ = (e) => {
		e !== null && t.cancel(e);
	}, y = () => {
		s++, f?.abort(), f = null, _(d), d = null;
	}, b = () => {
		c++, _(u), u = null;
	}, x = () => {
		y(), b(), l = !1, r.set(Hm());
	}, S = Rm({
		...e,
		clock: t,
		closed: x,
		unconfirmed: () => {
			i && r.update((e) => ({
				...e,
				closingUnconfirmed: !0
			}));
		}
	}), C = (e) => i && a !== null && T(r).open && e === s && a.id === T(r).target?.roomId && a.me === T(r).room?.me;
	function w(e, t) {
		C(e) && (y(), r.update((e) => ({
			...e,
			phase: "error",
			error: t,
			content: null
		})));
	}
	function E() {
		let e = T(r);
		if (!e.open || !a || !e.target) return;
		let t = Rt(a).find((t) => t.id === e.target.id);
		if (t && e.target.metadata && !Gt(t, e.target.metadata)) {
			w(s, "metadata-changed");
			return;
		}
		if (a.filesAll && !t) {
			w(s, "missing");
			return;
		}
		let n = t ?? e.file, i = n?.name ?? e.name, o = n ? Nt(a, n.name) : [];
		n && !o.some((e) => e.id === n.id) && o.push(n), r.update((e) => ({
			...e,
			room: a,
			file: n,
			name: i,
			versions: o
		}));
	}
	function D(e = !1) {
		if (!i || !a || !o || !T(r).open || a.filesAll || l && !e) return;
		b(), l = !0;
		let n = c, s = {
			id: a.id,
			me: a.me
		}, d = o;
		r.update((e) => ({
			...e,
			indexPending: !0,
			indexError: ""
		}));
		let f = () => i && n === c && a?.id === s.id && a.me === s.me && T(r).open, p = () => {
			f() && (b(), l = !1, r.update((e) => ({
				...e,
				indexPending: !1,
				indexError: "index-unconfirmed"
			})));
		};
		u = t.schedule(p, 2e4), Promise.resolve().then(() => f() ? d({ t: "files.get" }) : {
			ok: !1,
			error: "disposed"
		}).then((e) => {
			f() && (a?.filesAll ? (b(), r.update((e) => ({
				...e,
				indexPending: !1,
				indexError: ""
			}))) : (_(u), e.ok ? u = t.schedule(p, 1e4) : (l = !1, r.update((t) => ({
				...t,
				indexPending: !1,
				indexError: e.error
			})))));
		}, (e) => {
			f() && (_(u), l = !1, r.update((t) => ({
				...t,
				indexPending: !1,
				indexError: Um(e)
			})));
		});
	}
	async function O() {
		let e = T(r);
		if (!i || !a || !e.open || !e.target) return;
		y();
		let o = s, c = Wt.parse(e.target);
		f = new AbortController();
		let l = f.signal;
		r.update((e) => ({
			...e,
			phase: "loading",
			error: "",
			content: null
		})), d = t.schedule(() => w(o, "read-timeout"), 2e4);
		try {
			let t = await n.probe(c, l);
			if (!C(o)) return;
			let i = T(r).file, a = i?.name ?? t.name ?? e.target.label ?? "file", s = Pt(t.type, a);
			if (i) {
				let e = Pt(i.type, i.name);
				if (t.size !== void 0 && t.size !== i.size || e !== s && (s !== "text" || e !== "markdown" && e !== "csv")) throw Error("metadata-changed");
			}
			let u = i ? Pt(i.type, i.name) : s;
			if (r.update((e) => ({
				...e,
				name: a,
				content: {
					kind: u,
					url: Ut(c, u === "html"),
					operation: o
				}
			})), u === "markdown" || u === "csv" || u === "text") {
				let e = await n.text(c, l);
				if (!C(o)) return;
				_(d), d = null, r.update((t) => ({
					...t,
					phase: "ready",
					content: {
						kind: u,
						url: Ut(c),
						text: e.text,
						truncated: e.truncated,
						operation: o
					}
				}));
			} else u === "download" && (_(d), d = null, r.update((e) => ({
				...e,
				phase: "ready"
			})));
		} catch (e) {
			C(o) && w(o, Um(e));
		}
	}
	function k(e, t) {
		if (!i || !a || a.id !== e.roomId || !a.members.includes(a.me) || !Wt.safeParse(e).success) return !1;
		if (S.deferNavigation(() => k(e, t))) return !0;
		let n = Rt(a).find((t) => t.id === e.id);
		if (a.filesAll && !n && e.metadata || e.metadata && (!n || !Gt(n, e.metadata))) return !1;
		T(r).open || (p = t?.isConnected ? t : null), y(), b(), l = !1, S.open(e);
		let o = m ? T(m.state) : null;
		return r.set({
			...Hm(),
			open: !0,
			room: a,
			target: e,
			file: n,
			name: n?.name ?? e.label ?? "file",
			pinPending: !!o?.pending,
			pinError: o?.error ?? ""
		}), E(), D(), T(r).phase !== "error" && O(), !0;
	}
	return {
		state: r,
		sync(e, n, s = !1) {
			i && (e.members.includes(e.me) ? (a && (a.id !== e.id || a.me !== e.me) && (x(), S.reset(), p = null, g()), a = e, o = n, m || (m = Vm(e.id, t), h = m.state.subscribe((e) => r.update((t) => ({
				...t,
				pinPending: !!e.pending,
				pinError: e.error
			})))), m.sync(e, s), s && (b(), l = !1, r.update((e) => ({
				...e,
				indexPending: !1,
				indexError: ""
			}))), e.filesAll && T(r).indexPending && (b(), r.update((e) => ({
				...e,
				indexPending: !1,
				indexError: ""
			}))), T(r).open && (E(), s && D())) : (x(), S.reset(), g(), a = null, o = void 0, p = null));
		},
		open: k,
		select(e) {
			let t = T(r);
			if (!t.open || !t.target || !t.versions.some((t) => t.id === e)) return;
			let n = t.versions.find((t) => t.id === e);
			k({
				roomId: t.target.roomId,
				id: e,
				metadata: n
			});
		},
		retry() {
			if (i && a && T(r).open) {
				E();
				let e = T(r), t = Rt(a).find((t) => t.id === e.target?.id);
				if (a.filesAll && !t || t && e.target?.metadata && !Gt(t, e.target.metadata)) return;
				O();
			}
		},
		retryIndex() {
			D(!0);
		},
		current: C,
		popOutcome: S.consumePop,
		restoreHistory(t) {
			let n = S.incomingTarget();
			return !t || !i || !a || !n || a.id !== t.roomId || a.me !== t.account || n.roomId !== t.roomId || (new URL(e.href()).searchParams.get("t") || "main") !== t.thread ? !1 : k(n);
		},
		togglePin() {
			let e = T(r);
			i && e.open && e.file && o && m && a && a.id === e.target?.roomId && m.toggle(e.file, o);
		},
		ready(e) {
			C(e) && (_(d), d = null, r.update((e) => ({
				...e,
				phase: "ready",
				error: ""
			})));
		},
		mediaError(e) {
			w(e, "preview-failed");
		},
		closeUser() {
			T(r).open && (x(), S.closeUser());
		},
		closeNavigation() {
			x(), S.closeNavigation();
		},
		consumePop: () => S.consumePop() === "handled",
		deferNavigation: S.deferNavigation,
		returnFocus() {
			return p?.isConnected ? p : null;
		},
		reset() {
			x(), S.reset(), g(), a = null, o = void 0, p = null;
		},
		dispose() {
			i = !1, x(), S.dispose(), g(), a = null, o = void 0, p = null;
		}
	};
}
// svelte/features/decisions/model.ts
var Gm = {
	schedule: (e, t) => setTimeout(e, t),
	cancel: (e) => clearTimeout(e)
}, Km = 1e4, qm = (e) => e.slice().reverse();
function Jm(e, t = Gm) {
	let n = v({
		pending: {},
		issues: {}
	}), r = !0, i = [], a = /* @__PURE__ */ new Map();
	function o(e, r) {
		let i = a.get(e);
		i?.timer !== void 0 && t.cancel(i.timer), a.delete(e), n.update((t) => {
			let n = { ...t.pending }, i = { ...t.issues };
			return delete n[e], r ? i[e] = r : delete i[e], {
				pending: n,
				issues: i
			};
		});
	}
	return {
		state: n,
		sync(e) {
			if (r) {
				i = e;
				for (let e of a.keys()) i.some((t) => t.id === e) || o(e);
				for (let e of Object.keys(T(n).issues).map(Number)) i.some((t) => t.id === e) || o(e);
			}
		},
		async remove(s, c, l) {
			if (!r || s !== e || a.has(c) || !i.some((e) => e.id === c)) return;
			let u = Symbol();
			a.set(c, { token: u }), n.update((e) => {
				let t = { ...e.issues };
				return delete t[c], {
					pending: {
						...e.pending,
						[c]: !0
					},
					issues: t
				};
			});
			let d = () => r && a.get(c)?.token === u;
			try {
				let e = await l({
					t: "decision.del",
					id: c
				});
				if (!d()) return;
				if (!e.ok) {
					o(c, e.error);
					return;
				}
				let n = a.get(c);
				n.timer = t.schedule(() => {
					d() && o(c, "unconfirmed");
				}, Km);
			} catch (e) {
				d() && o(c, e instanceof Error ? e.message : "failed");
			}
		},
		dispose() {
			r = !1;
			for (let e of a.values()) e.timer !== void 0 && t.cancel(e.timer);
			a.clear();
		}
	};
}
// svelte/lib/ui/AlertDialog.svelte
var Ym = z("<p role=\"alert\" class=\"tw:m-0 tw:text-sm tw:text-destructive\"> </p>"), Xm = z("<!> <!> <!> <div class=\"tw:flex tw:flex-wrap tw:justify-end tw:gap-2\"><!> <!></div>", 1), Zm = z("<!> <!>", 1);
function Qm(i, o) {
	D(o, !0);
	let l = H(o, "open", 15, !1), u = H(o, "busy", 3, !1), p = H(o, "confirmDisabled", 3, !1), h = H(o, "error", 3, ""), g = e(null);
	_(() => {
		if (l()) return ht(() => {
			l(!1), o.onOpenChange?.(!1);
		});
	});
	var v = P(), y = a(v);
	ne(y, () => Ol, (e, t) => {
		t(e, {
			get onOpenChange() {
				return o.onOpenChange;
			},
			get open() {
				return l();
			},
			set open(e) {
				l(e);
			},
			children: (e, t) => {
				var i = P(), l = a(i);
				ne(l, () => at, (e, t) => {
					t(e, {
						children: (e, t) => {
							var i = Zm(), l = a(i);
							ne(l, () => bt, (e, t) => {
								t(e, {
									"data-vb-native": !0,
									class: "tw:fixed tw:inset-0 tw:z-40 tw:m-0 tw:box-border tw:bg-scrim"
								});
							});
							var _ = n(l, 2);
							ne(_, () => Rl, (e, t) => {
								t(e, {
									"data-vb-native": !0,
									preventScroll: !1,
									preventBodyPointerEvents: !1,
									preventOverflowTextSelection: !1,
									onOpenAutoFocus: (e) => {
										e.preventDefault(), m(g)?.focus();
									},
									onCloseAutoFocus: (e) => {
										let t = o.returnFocus?.();
										t?.isConnected && (e.preventDefault(), t.focus());
									},
									onEscapeKeydown: (e) => {
										u() && e.preventDefault();
									},
									class: "tw:fixed tw:left-1/2 tw:top-1/2 tw:z-50 tw:m-0 tw:box-border tw:flex tw:max-h-[90dvh] tw:w-[calc(100%-2rem)] tw:max-w-lg tw:-translate-x-1/2 tw:-translate-y-1/2 tw:flex-col tw:gap-4 tw:overflow-auto tw:rounded-surface tw:border tw:border-solid tw:border-border tw:bg-card tw:p-6 tw:font-sans tw:text-sm tw:text-card-foreground tw:shadow-lg tw:outline-none",
									children: (e, t) => {
										var i = Xm(), l = a(i);
										ne(l, () => Qe, (e, t) => {
											t(e, {
												class: "tw:m-0 tw:text-lg tw:font-semibold tw:leading-6 tw:tracking-tight",
												children: (e, t) => {
													r();
													var n = I();
													c(() => U(n, o.title)), B(e, n);
												},
												$$slots: { default: !0 }
											});
										});
										var _ = n(l, 2), v = (e) => {
											var t = P(), n = a(t);
											ne(n, () => Ct, (e, t) => {
												t(e, {
													class: "tw:m-0 tw:whitespace-pre-wrap tw:break-words tw:text-sm tw:text-muted-foreground",
													children: (e, t) => {
														r();
														var n = I();
														c(() => U(n, o.description)), B(e, n);
													},
													$$slots: { default: !0 }
												});
											}), B(e, t);
										};
										L(_, (e) => {
											o.description && e(v);
										});
										var y = n(_, 2), b = (e) => {
											var t = Ym(), n = d(t, !0);
											c(() => U(n, h())), B(e, t);
										};
										L(y, (e) => {
											h() && e(b);
										});
										var x = n(y, 2), C = s(x);
										{
											let e = w(() => ue({ variant: "outline" }));
											ne(C, () => Pl, (t, n) => {
												n(t, {
													get disabled() {
														return u();
													},
													get class() {
														return m(e);
													},
													get ref() {
														return m(g);
													},
													set ref(e) {
														f(g, e, !0);
													},
													children: (e, t) => {
														r();
														var n = I();
														c(() => U(n, o.cancelLabel)), B(e, n);
													},
													$$slots: { default: !0 }
												});
											});
										}
										var T = n(C, 2);
										{
											let e = w(() => u() || p()), t = w(() => u() || void 0), n = w(() => ue({ variant: "destructive" }));
											ne(T, () => jl, (i, a) => {
												a(i, {
													get disabled() {
														return m(e);
													},
													get "aria-busy"() {
														return m(t);
													},
													onclick: (e) => {
														e.preventDefault(), o.onconfirm();
													},
													get class() {
														return m(n);
													},
													children: (e, t) => {
														r();
														var n = I();
														c(() => U(n, o.confirmLabel)), B(e, n);
													},
													$$slots: { default: !0 }
												});
											});
										}
										S(x), B(e, i);
									},
									$$slots: { default: !0 }
								});
							}), B(e, i);
						},
						$$slots: { default: !0 }
					});
				}), B(e, i);
			},
			$$slots: { default: !0 }
		});
	}), B(i, v), t();
}
// svelte/features/decisions/DecisionsPanel.svelte
var $m = z("<p role=\"status\" class=\"tw:m-0 tw:text-xs tw:text-muted-foreground\"> </p>"), eh = z("<p role=\"alert\" class=\"tw:m-0 tw:whitespace-pre-wrap tw:break-words tw:text-sm tw:text-destructive\"> </p>"), th = z("<div class=\"tw:min-w-0 tw:flex-1 tw:space-y-2\"><p class=\"tw:m-0 tw:whitespace-pre-wrap tw:break-words tw:leading-6\"> </p> <div class=\"tw:flex tw:flex-wrap tw:items-center tw:gap-2 tw:text-xs tw:text-muted-foreground\"><!> <span class=\"tw:break-words\"> </span><time> </time></div> <!> <!></div> <!>", 1), nh = z("<article><!></article>"), rh = z("<section tabindex=\"-1\" data-vb-native=\"\" data-decisions-panel=\"\" class=\"tw:space-y-4 tw:p-4 tw:font-sans tw:text-sm tw:text-foreground\"><div class=\"tw:flex tw:items-center tw:gap-2\"><!> <!></div> <!></section> <!>", 1);
function ih(i, o) {
	D(o, !0);
	let l = () => ye(g, "$view", u), [u, p] = xe(), h = b(() => Jm(o.room.id)), g = h.state, v = w(() => o.room.decisions || []), y = w(() => qm(m(v))), x = e(null), C = e(!1), T = e(null), E = e(null), O = (e) => e ? ["offline", "disconnected"].includes(e) ? o.vb.t("sem conexão") : ["timeout", "unconfirmed"].includes(e) ? o.vb.t("Ainda não recebi a confirmação. Confira antes de tentar de novo.") : e : "";
	_(() => {
		h.sync(m(v)), m(x) && !m(v).some((e) => e.id === m(x).id) && (f(C, !1), f(x, null));
	}), de(() => h.dispose());
	var k = rh(), j = a(k), M = s(j), N = s(M);
	St(N, {
		children: (e, t) => {
			r();
			var n = I();
			c((e) => U(n, e), [() => o.vb.t("Decisões")]), B(e, n);
		},
		$$slots: { default: !0 }
	});
	var ee = n(N, 2);
	ct(ee, {
		children: (e, t) => {
			r();
			var n = I();
			c(() => U(n, m(v).length)), B(e, n);
		},
		$$slots: { default: !0 }
	}), S(M);
	var P = n(M, 2);
	R(P, 17, () => m(y), (e) => e.id, (e, t) => {
		var i = nh(), u = s(i);
		Te(u, {
			class: "tw:flex tw:items-start tw:gap-3 tw:p-4",
			children: (e, i) => {
				var u = th(), p = a(u), h = s(p), g = d(h, !0), _ = n(h, 2), v = s(_);
				{
					let e = w(() => m(t).kind === "approval" ? "success" : "neutral");
					ct(v, {
						get variant() {
							return m(e);
						},
						children: (e, n) => {
							r();
							var i = I();
							c((e) => U(i, e), [() => m(t).kind === "approval" ? `✓ ${o.vb.t("aprovado")}` : o.vb.t("decidido")]), B(e, i);
						},
						$$slots: { default: !0 }
					});
				}
				var y = n(v, 2), b = d(y, !0), E = n(y), D = d(E, !0);
				S(_);
				var k = n(_, 2), j = (e) => {
					var t = $m(), n = d(t, !0);
					c((e) => U(n, e), [() => o.vb.t("Aguardando confirmação…")]), B(e, t);
				};
				L(k, (e) => {
					l().pending[m(t).id] && e(j);
				});
				var M = n(k, 2), N = (e) => {
					var n = eh(), r = d(n, !0);
					c((e) => U(r, e), [() => O(l().issues[m(t).id])]), B(e, n);
				};
				L(M, (e) => {
					l().issues[m(t).id] && e(N);
				}), S(p);
				var ee = n(p, 2);
				{
					let e = w(() => o.vb.t("Apagar registro")), n = w(() => !!l().pending[m(t).id]);
					mt(ee, {
						get "data-ddel"() {
							return m(t).id;
						},
						get label() {
							return m(e);
						},
						icon: "close",
						get disabled() {
							return m(n);
						},
						onclick: (e) => {
							f(x, m(t), !0), f(T, e.currentTarget, !0), f(C, !0);
						}
					});
				}
				c((e, n) => {
					U(g, m(t).text), U(b, m(t).who), A(E, "datetime", e), U(D, n);
				}, [() => new Date(m(t).ts).toISOString(), () => o.vb.ago(m(t).ts)]), B(e, u);
			},
			$$slots: { default: !0 }
		}), S(i), c(() => A(i, "data-decision-id", m(t).id)), B(e, i);
	}, (e) => {
		{
			let t = w(() => o.vb.t("Decisões")), n = w(() => o.vb.t("O que a sala decidir e cada aprovação aparecem aqui. Os agents registram conforme a conversa anda."));
			wt(e, {
				icon: "check",
				get title() {
					return m(t);
				},
				get description() {
					return m(n);
				}
			});
		}
	}), S(j), le(j, (e) => f(E, e), () => m(E));
	var F = n(j, 2);
	{
		let e = w(() => o.vb.t("Apagar esse registro?")), t = w(() => m(x)?.text), n = w(() => o.vb.t("Apagar registro")), r = w(() => o.vb.t("Cancelar")), i = w(() => !!(m(x) && l().pending[m(x).id])), a = w(() => m(x) ? O(l().issues[m(x).id]) : "");
		Qm(F, {
			get title() {
				return m(e);
			},
			get description() {
				return m(t);
			},
			get confirmLabel() {
				return m(n);
			},
			get cancelLabel() {
				return m(r);
			},
			get busy() {
				return m(i);
			},
			get error() {
				return m(a);
			},
			onconfirm: () => {
				m(x) && h.remove(o.room.id, m(x).id, o.request);
			},
			returnFocus: () => m(T)?.isConnected ? m(T) : m(E),
			get open() {
				return m(C);
			},
			set open(e) {
				f(C, e, !0);
			}
		});
	}
	B(i, k), t(), p();
}
// svelte/Decisions.svelte
function ah(e, n) {
	D(n, !0);
	var r = P(), i = a(r);
	F(i, () => n.room.id, (e) => {
		ih(e, {
			get room() {
				return n.room;
			},
			get vb() {
				return n.vb;
			},
			get request() {
				return n.request;
			}
		});
	}), B(e, r), t();
}
// shared/commands.ts
var oh = Fe(), sh = Le(), ch = Re("t", [
	W({
		t: Oe("msg"),
		thread: Fe(),
		text: Ne(Fe()),
		files: Ne(Me(Fe())),
		reply_to: Ne(Ie(sh))
	}),
	W({ t: Oe("files.get") }),
	W({
		t: Oe("doc.get"),
		epic: Ne(Ie(Fe()))
	}),
	W({
		t: Oe("doc"),
		text: Fe(),
		epic: Ne(Ie(Fe()))
	}),
	W({
		t: Oe("title"),
		title: Fe()
	}),
	W({
		t: Oe("epic"),
		title: Fe()
	}),
	W({
		t: Oe("epic.owner"),
		id: oh,
		owner: Fe()
	}),
	W({
		t: Oe("task.add"),
		epic: Fe(),
		title: Fe()
	}),
	W({
		t: Oe("older"),
		thread: Fe(),
		before: Ne(sh)
	}),
	W({
		t: Oe("pin.add"),
		kind: Be([
			"link",
			"file",
			"app"
		]),
		ref: Fe(),
		title: Ne(Fe())
	}),
	W({
		t: Oe("pin.del"),
		id: oh
	}),
	W({
		t: Oe("reminder.delete"),
		id: oh
	}),
	W({
		t: Oe("ack.dismiss"),
		id: sh
	}),
	W({
		t: Oe("reminder.enable"),
		id: oh,
		on: je()
	}),
	W({
		t: Oe("task.toggle"),
		id: oh
	}),
	W({
		t: Oe("task.status"),
		id: oh,
		status: Be(qf)
	}),
	W({
		t: Oe("task.rename"),
		id: oh,
		title: Fe()
	}),
	W({
		t: Oe("task.del"),
		id: oh
	}),
	W({
		t: Oe("task.assign"),
		id: oh,
		owner: Ne(Fe()),
		due: Ne(Fe())
	}),
	W({
		t: Oe("decision.del"),
		id: sh
	}),
	W({
		t: Oe("epic.rename"),
		id: oh,
		title: Fe()
	}),
	W({
		t: Oe("epic.del"),
		id: oh
	}),
	W({
		t: Oe("epic.archive"),
		id: oh,
		archived: Ne(je())
	}),
	W({
		t: Oe("epic.order"),
		ids: Me(Fe())
	}),
	W({
		t: Oe("poll.create"),
		thread: Fe(),
		question: Fe(),
		options: Me(Fe()),
		multi: je()
	}),
	W({
		t: Oe("vote"),
		id: oh,
		opt: sh
	}),
	W({
		t: Oe("poll.close"),
		id: oh
	}),
	W({
		t: Oe("suggestion"),
		i: sh,
		expected: Ne(Yf),
		accept: Ne(je())
	})
]), lh = Fe().check(ke(1), Xe(64)), uh = ze([W({
	t: Oe("result"),
	cid: lh,
	ok: Oe(!0)
}), W({
	t: Oe("result"),
	cid: lh,
	ok: Oe(!1),
	error: Fe()
})]), dh = Fe(), fh = Le(), ph = Me(dh), mh = (e, t) => W({
	t: Oe(e),
	...t
}), hh = mh("doc", {
	text: dh,
	epic: Ne(Ie(dh)),
	stale: Ne(Oe(!1)),
	fetched: Ne(je()),
	by: Ne(dh)
}), gh = mh("doc", {
	epic: dh,
	stale: Oe(!0),
	by: Ne(dh),
	text: Ne(Ue()),
	fetched: Ne(Ue())
}), _h = {
	state: We(sp, { t: Oe("state") }),
	msg: mh("msg", { m: np }),
	moved: mh("moved", {
		id: fh,
		thread: dh
	}),
	delta: mh("delta", {
		id: fh,
		text: dh
	}),
	typing: mh("typing", {
		id: fh,
		mode: dh,
		note: Ne(dh)
	}),
	closed: mh("closed", {
		id: fh,
		choices: dh
	}),
	epics: mh("epics", {
		epics: Me(ep),
		roomTasks: Ne(Me($f))
	}),
	epicsPatch: mh("epicsPatch", {
		changed: Me(ep),
		order: ph,
		roomTasks: Ne(Me($f))
	}),
	doc: ze([gh, hh]),
	docNotes: mh("docNotes", { notes: ph }),
	meta: mh("meta", {
		title: Ne(dh),
		folder: Ne(dh),
		summary: Ne(dh)
	}),
	suggestions: mh("suggestions", { suggestions: Me(Yf) }),
	requests: mh("requests", { requests: Me(ap) }),
	members: mh("members", {
		members: ph,
		pending: Ne(ph),
		requests: Ne(Me(ap)),
		names: Ne(Pe(dh, dh)),
		avatars: Ne(Pe(dh, fh))
	}),
	files: mh("files", { files: Me(tp) }),
	fileAdd: mh("fileAdd", { file: tp }),
	reminders: mh("reminders", { reminders: Me(ip) }),
	decisions: mh("decisions", { decisions: Me(Xf) }),
	pins: mh("pins", { pins: Me(Zf) }),
	receipts: mh("receipts", { receipts: Me(op) }),
	older: mh("older", {
		messages: Me(np),
		thread: dh,
		more: je()
	}),
	acks: mh("acks", { acks: Me(rp) }),
	ackRows: mh("ackRows", { acks: Me(rp) }),
	poll: mh("poll", { poll: Qf }),
	online: mh("online", { online: ph }),
	conns: mh("conns", {}),
	error: mh("error", { error: Ne(dh) }),
	blocked: mh("blocked", {
		text: dh,
		reason: dh
	}),
	result: uh
};
function vh(e) {
	if (typeof e != "object" || !e || Array.isArray(e)) return !1;
	let t = e.t;
	return typeof t != "string" || !Object.hasOwn(_h, t) ? !1 : _h[t].safeParse(e).success;
}
// shared/validation.ts
var yh = (e) => typeof e == "object" && !!e && !Array.isArray(e), bh = vh;
function xh(e) {
	if (!yh(e)) return e;
	let t = (e, t) => yh(e) && (e[t] === 0 || e[t] === 1) ? {
		...e,
		[t]: e[t] === 1
	} : e, n = (e) => Array.isArray(e) ? e.map((e) => t(e, "done")) : e, r = (e) => Array.isArray(e) ? e.map((e) => yh(e) ? {
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
function Sh(e) {
	let t = xh(JSON.parse(e));
	if (!bh(t)) throw TypeError("Invalid room event");
	return t;
}
function Ch(e) {
	return ch.safeParse(e).success;
}
// svelte/transport.ts
function wh(e, t, n) {
	if (!Ch(t)) throw TypeError("Invalid room command");
	return !e || e.readyState !== 1 ? !1 : (e.send(JSON.stringify(n ? {
		...t,
		cid: n
	} : t)), !0);
}
function Th(e) {
	if (typeof e != "string") throw TypeError("Room events must be JSON text");
	return Sh(e);
}
async function Eh(e) {
	try {
		return await e.json();
	} catch (t) {
		throw e.ok ? t : Error(`HTTP ${e.status}`);
	}
}
function Dh(e, t) {
	let n = Ve.safeParse(t);
	return Error(n.success ? n.data.error : `HTTP ${e.status}`);
}
function Oh(e, t = fetch) {
	let n = Ke("/", t).api.books[":id"], r = encodeURIComponent(e);
	return {
		async postMessage(e) {
			let t = await n.post.$post({
				param: { id: r },
				json: e
			}), i = await Eh(t);
			if (t.ok || t.status === 400) {
				let e = He.safeParse(i);
				if (e.success) return e.data;
				if (t.ok) throw TypeError("Invalid post response");
			}
			throw Dh(t, i);
		},
		async uploadFile(e) {
			let t = await n.files.$post({
				param: { id: r },
				header: {
					"content-type": e.type,
					"x-filename": encodeURIComponent(e.name)
				}
			}, { init: { body: e.body } }), i = await Eh(t);
			if (!t.ok) throw Dh(t, i);
			let a = Je.safeParse(i);
			if (!a.success) throw TypeError(qe.safeParse(i).success ? "Invalid reminder response" : "Invalid upload response");
			return a.data;
		},
		async setIcon(e) {
			let t = await n.icon.$post({
				param: { id: r },
				header: { "content-type": e ? e.type : "application/json" }
			}, { init: { body: e ? e.body : "{}" } }), i = await Eh(t);
			if (!t.ok) throw Dh(t, i);
			let a = Ye.safeParse(i);
			if (!a.success) throw TypeError("Invalid icon response");
			return a.data;
		}
	};
}
// svelte/features/reminders/session.ts
var kh = {
	schedule: (e, t) => setTimeout(e, t),
	cancel: (e) => clearTimeout(e)
}, Ah = 1e4, jh = (e) => e.trim().replace(/\.md$/i, "").replace(/[\\/]/g, "-"), Mh = /* @__PURE__ */ new Set();
function Nh(e, t = kh) {
	let n = v({
		draft: null,
		saving: !1,
		issue: null,
		pending: {},
		rowIssues: {}
	}), r = !0, i = 0, a = 0, o = !1, s = [], c = /* @__PURE__ */ new Map(), l = (e) => {
		c.has(e) && t.cancel(c.get(e)), c.delete(e);
	}, u = (e, t) => t.kind === "delete" ? !s.some((t) => t.id === e) : s.some((n) => n.id === e && n.enabled === t.enabled), d = (e, t) => {
		l(e), n.update((n) => {
			let r = { ...n.pending }, i = { ...n.rowIssues };
			return delete r[e], t ? i[e] = t : delete i[e], {
				...n,
				pending: r,
				rowIssues: i
			};
		});
	};
	return {
		roomId: e,
		state: n,
		sync(e) {
			if (r) {
				s = e;
				for (let [e, t] of Object.entries(T(n).pending)) t.acknowledged && u(e, t) && d(e);
			}
		},
		open(e) {
			r && (a++, n.update((t) => ({
				...t,
				draft: { ...e },
				saving: o,
				issue: null
			})));
		},
		edit(e) {
			r && n.update((t) => t.draft ? {
				...t,
				draft: {
					...t.draft,
					...e
				},
				issue: null
			} : t);
		},
		cancel() {
			r && (a++, n.update((e) => ({
				...e,
				draft: null,
				saving: o,
				issue: null
			})));
		},
		async save(t) {
			let i = T(n);
			if (!r || !i.draft || o) return;
			let s = { ...i.draft }, c = a, l = jh(s.name);
			if (!l || !s.text.trim()) return;
			let u = JSON.stringify([e, l]);
			if (Mh.has(u)) {
				n.update((e) => ({
					...e,
					issue: {
						kind: "upload",
						detail: "upload-in-progress"
					}
				}));
				return;
			}
			Mh.add(u), o = !0, n.update((e) => ({
				...e,
				saving: !0,
				issue: null
			}));
			let d = () => r && c === a && !!T(n).draft;
			try {
				let e = await t({
					name: `reminders/${l}.md`,
					type: "text/markdown",
					body: s.text
				});
				if (!d()) return;
				if (!e.reminder) {
					n.update((e) => ({
						...e,
						issue: {
							kind: "upload",
							detail: "reminder-processing-unconfirmed"
						}
					}));
					return;
				}
				let r = e.reminder;
				n.update((e) => {
					if (!e.draft) return e;
					let t = jh(e.draft.name) === l, n = t ? {
						...e.draft,
						name: l,
						fixed: !0
					} : e.draft;
					return r.ok ? {
						...e,
						draft: t && e.draft.text === s.text ? null : n
					} : {
						...e,
						draft: n,
						issue: {
							kind: "upload",
							detail: r.error || "failed"
						}
					};
				});
			} catch (e) {
				d() && n.update((t) => ({
					...t,
					issue: {
						kind: "upload",
						detail: e instanceof Error ? e.message : "failed"
					}
				}));
			} finally {
				Mh.delete(u), o = !1, r && n.update((e) => ({
					...e,
					saving: !1
				}));
			}
		},
		async mutate(e, a, o, s) {
			if (!r || T(n).pending[e]) return !1;
			let l = ++i, f = {
				sequence: l,
				kind: a,
				enabled: s,
				acknowledged: !1
			};
			n.update((t) => {
				let n = { ...t.rowIssues };
				return delete n[e], {
					...t,
					pending: {
						...t.pending,
						[e]: f
					},
					rowIssues: n
				};
			});
			let p;
			try {
				p = await o(a === "delete" ? {
					t: "reminder.delete",
					id: e
				} : {
					t: "reminder.enable",
					id: e,
					on: !!s
				});
			} catch (e) {
				p = {
					ok: !1,
					error: e instanceof Error ? e.message : "failed"
				};
			}
			return !r || T(n).pending[e]?.sequence !== l ? !1 : p.ok ? (f.acknowledged = !0, u(e, f) ? d(e) : (n.update((t) => ({
				...t,
				pending: {
					...t.pending,
					[e]: { ...f }
				}
			})), c.set(e, t.schedule(() => {
				r && T(n).pending[e]?.sequence === l && d(e, {
					kind: "unconfirmed",
					detail: "unconfirmed"
				});
			}, Ah))), !0) : (d(e, {
				kind: "command",
				detail: p.error
			}), !1);
		},
		dispose() {
			r = !1, a++;
			for (let e of [...c.keys()]) l(e);
		}
	};
}
// svelte/features/reminders/RemindersPanel.svelte
var Ph = z("<!> ", 1), Fh = z("<p id=\"remErr\" role=\"alert\" class=\"tw:m-0 tw:whitespace-pre-wrap tw:text-sm tw:text-destructive\"> </p>"), Ih = z("<form id=\"remForm\" class=\"tw:space-y-4\"><div class=\"tw:space-y-2\"><!><!></div> <div class=\"tw:space-y-2\"><!><!></div> <!> <div class=\"tw:flex tw:flex-wrap tw:justify-end tw:gap-2\"><!><!></div></form>"), Lh = z("<p role=\"status\" class=\"tw:m-0 tw:flex tw:items-start tw:gap-2 tw:whitespace-pre-wrap tw:text-sm tw:text-destructive\"><!> </p>"), Rh = z("<p role=\"status\" class=\"tw:m-0 tw:text-xs tw:text-muted-foreground\"> </p>"), zh = z("<p role=\"alert\" class=\"tw:m-0 tw:whitespace-pre-wrap tw:text-sm tw:text-destructive\"> </p>"), Bh = z("<div class=\"tw:flex tw:items-start tw:gap-2\"><button type=\"button\" class=\"tw:flex tw:min-w-0 tw:flex-1 tw:items-start tw:gap-2 tw:rounded-control tw:border-0 tw:bg-transparent tw:p-1 tw:text-left tw:font-sans tw:text-sm tw:text-foreground tw:outline-none tw:hover:bg-accent tw:focus-visible:ring-2 tw:focus-visible:ring-ring\"><!> <span class=\"tw:min-w-0 tw:space-y-1\"><span class=\"tw:block tw:break-words tw:font-medium\"> </span><span class=\"tw:block tw:text-xs tw:leading-5 tw:text-muted-foreground\"><!> </span></span></button></div> <!> <pre class=\"tw:m-0 tw:whitespace-pre-wrap tw:break-words tw:rounded-control tw:bg-muted tw:p-3 tw:font-mono tw:text-xs tw:leading-5\"> </pre> <div class=\"tw:flex tw:flex-wrap tw:items-center tw:justify-between tw:gap-2\"><!> <div class=\"tw:flex tw:flex-wrap tw:gap-2\"><!><!></div></div> <!> <!>", 1), Vh = z("<p class=\"tw:m-0 tw:rounded-surface tw:border tw:border-dashed tw:border-border tw:p-6 tw:text-sm tw:leading-6 tw:text-muted-foreground\"> </p>"), Hh = z("<section tabindex=\"-1\" data-vb-native=\"\" data-reminders-panel=\"\" class=\"tw:space-y-4 tw:p-4 tw:font-sans tw:text-sm tw:text-foreground\"><div class=\"tw:flex tw:flex-wrap tw:items-start tw:justify-between tw:gap-3\"><div class=\"tw:min-w-0 tw:flex-1 tw:space-y-1\"><!> <p class=\"tw:m-0 tw:max-w-prose tw:text-sm tw:leading-5 tw:text-muted-foreground\"> </p></div> <!></div> <!> <div class=\"tw:space-y-3\"></div></section> <!>", 1);
function Uh(i, o) {
	let l = ee();
	D(o, !0);
	let u = () => ye(v, "$view", p), [p, h] = xe(), g = b(() => Nh(o.room.id)), v = g.state, y = e(x([])), C = e(null), T = e(!1), E = e(null), O = e(null), k = e(null), j = e(null), M = w(() => o.room.reminders || []), N = w(() => o.vb.locale || "pt-BR"), F = (e) => new Date(e).toLocaleString(m(N), {
		weekday: "short",
		day: "numeric",
		month: "short",
		hour: "2-digit",
		minute: "2-digit"
	}), ne = (e) => e ? e.detail === "upload-in-progress" ? o.vb.t("Um envio deste lembrete ainda está em andamento. Aguarde antes de salvar novamente.") : e.detail === "reminder-processing-unconfirmed" ? o.vb.t("Não recebi a confirmação do agendamento. Confira antes de tentar de novo.") : ["offline", "disconnected"].includes(e.detail) ? o.vb.t("sem conexão") : e.kind === "unconfirmed" || e.detail === "timeout" ? o.vb.t("Ainda não recebi a confirmação. Confira antes de tentar de novo.") : e.detail : "";
	_(() => {
		g.sync(m(M));
	}), de(() => g.dispose());
	function re(e) {
		g.open(e), queueMicrotask(() => m(j)?.focus());
	}
	function ie() {
		g.cancel(), queueMicrotask(() => m(k)?.focus());
	}
	function ae(e) {
		f(y, m(y).includes(e) ? m(y).filter((t) => t !== e) : [...m(y), e], !0);
	}
	async function z() {
		let e = m(C);
		e && await g.mutate(e.id, "delete", o.request) && m(C)?.id === e.id && f(T, !1);
	}
	var oe = Hh(), ce = a(oe), ue = s(ce), fe = s(ue), pe = s(fe);
	St(pe, {
		children: (e, t) => {
			r();
			var n = I();
			c((e) => U(n, e), [() => o.vb.t("Lembretes")]), B(e, n);
		},
		$$slots: { default: !0 }
	});
	var me = n(pe, 2), he = d(me, !0);
	S(fe);
	var ge = n(fe, 2), _e = (e) => {
		V(e, {
			id: "remNew",
			onclick: () => re({
				name: "",
				text: ""
			}),
			get ref() {
				return m(k);
			},
			set ref(e) {
				f(k, e, !0);
			},
			children: (e, t) => {
				var r = Ph(), i = a(r);
				Dt(i, { name: "plus" });
				var s = n(i, 1, !0);
				c((e) => U(s, e), [() => o.vb.t("Novo lembrete")]), B(e, r);
			},
			$$slots: { default: !0 }
		});
	};
	L(ge, (e) => {
		u().draft || e(_e);
	}), S(ue);
	var ve = n(ue, 2), Se = (e) => {
		Te(e, {
			children: (e, t) => {
				var i = Ih(), a = s(i), p = s(a);
				{
					let e = w(() => `${l}-name`);
					be(p, {
						get for() {
							return m(e);
						},
						children: (e, t) => {
							r();
							var n = I();
							c((e) => U(n, e), [() => o.vb.t("Nome")]), B(e, n);
						},
						$$slots: { default: !0 }
					});
				}
				var h = n(p);
				{
					let e = w(() => `${l}-name`), t = w(() => o.vb.t("nome, ex.: relatorio-diario"));
					Ce(h, {
						get id() {
							return m(e);
						},
						name: "name",
						maxlength: 60,
						required: !0,
						get readonly() {
							return u().draft.fixed;
						},
						get value() {
							return u().draft.name;
						},
						oninput: (e) => g.edit({ name: e.currentTarget.value }),
						get placeholder() {
							return m(t);
						}
					});
				}
				S(a);
				var _ = n(a, 2), v = s(_);
				{
					let e = w(() => `${l}-text`);
					be(v, {
						get for() {
							return m(e);
						},
						children: (e, t) => {
							r();
							var n = I();
							c((e) => U(n, e), [() => o.vb.t("Texto do lembrete")]), B(e, n);
						},
						$$slots: { default: !0 }
					});
				}
				var y = n(v);
				{
					let e = w(() => `${l}-text`), t = w(() => o.vb.t("Diga quando e o quê. Ex.: Todo dia às 8h: puxe os números de ontem e poste aqui o que mudou."));
					Tt(y, {
						get id() {
							return m(e);
						},
						name: "text",
						required: !0,
						get value() {
							return u().draft.text;
						},
						oninput: (e) => g.edit({ text: e.currentTarget.value }),
						get placeholder() {
							return m(t);
						},
						get ref() {
							return m(j);
						},
						set ref(e) {
							f(j, e, !0);
						}
					});
				}
				S(_);
				var b = n(_, 2), x = (e) => {
					var t = Fh(), n = d(t, !0);
					c((e) => U(n, e), [() => ne(u().issue)]), B(e, t);
				};
				L(b, (e) => {
					u().issue && e(x);
				});
				var C = n(b, 2), T = s(C);
				V(T, {
					id: "remCancel",
					variant: "outline",
					onclick: ie,
					children: (e, t) => {
						r();
						var n = I();
						c((e) => U(n, e), [() => o.vb.t("Cancelar")]), B(e, n);
					},
					$$slots: { default: !0 }
				});
				var E = n(T);
				V(E, {
					id: "remSave",
					type: "submit",
					get loading() {
						return u().saving;
					},
					children: (e, t) => {
						r();
						var n = I();
						c((e) => U(n, e), [() => o.vb.t("Salvar")]), B(e, n);
					},
					$$slots: { default: !0 }
				}), S(C), S(i), se("submit", i, (e) => {
					e.preventDefault(), g.save(Oh(o.room.id).uploadFile);
				}), B(e, i);
			},
			$$slots: { default: !0 }
		});
	};
	L(ve, (e) => {
		u().draft && e(Se);
	});
	var we = n(ve, 2);
	R(we, 21, () => m(M), (e) => e.id, (e, t) => {
		let i = w(() => u().pending[m(t).id]), p = w(() => u().rowIssues[m(t).id]);
		Te(e, {
			class: "tw:space-y-3 tw:p-4",
			children: (e, u) => {
				var h = Bh(), _ = a(h), v = s(_), b = s(v);
				{
					let e = w(() => m(y).includes(m(t).id) ? "chevronDown" : "chevronRight");
					Dt(b, {
						get name() {
							return m(e);
						},
						class: "tw:mt-0.5"
					});
				}
				var x = n(b, 2), E = s(x), D = d(E, !0), k = n(E), j = s(k), M = (e) => {
					var n = I();
					c((e) => U(n, `${(m(t).every || m(t).cron || "") ?? ""}${e ?? ""} ·`), [() => m(t).enabled && m(t).next_at ? ` · ${o.vb.t("próximo {when}", { when: F(m(t).next_at) })}` : ""]), B(e, n);
				};
				L(j, (e) => {
					m(t).error || e(M);
				});
				var N = n(j, 1, !0);
				S(k), S(x), S(v), S(_);
				var ee = n(_, 2), P = (e) => {
					var r = Lh(), i = s(r);
					Dt(i, { name: "warning" });
					var a = n(i, 1, !0);
					S(r), c(() => U(a, m(t).error)), B(e, r);
				};
				L(ee, (e) => {
					m(t).error && e(P);
				});
				var R = n(ee, 2), ie = d(R, !0), z = n(R, 2), oe = s(z);
				be(oe, {
					class: "tw:flex tw:items-center tw:gap-2",
					children: (e, r) => {
						var s = Ph(), l = a(s);
						{
							let e = w(() => !!m(t).error || !!m(i));
							xt(l, {
								controlled: !0,
								get "data-rem-on"() {
									return m(t).id;
								},
								get checked() {
									return m(t).enabled;
								},
								get disabled() {
									return m(e);
								},
								onCheckedChange: (e) => {
									g.mutate(m(t).id, "enable", o.request, e);
								}
							});
						}
						var u = n(l, 1, !0);
						c((e) => U(u, e), [() => o.vb.t("Ligado")]), B(e, s);
					},
					$$slots: { default: !0 }
				});
				var se = n(oe, 2), ce = s(se), le = (e) => {
					V(e, {
						variant: "ghost",
						size: "sm",
						get "data-rem-edit"() {
							return m(t).id;
						},
						onclick: () => re({
							name: m(t).name,
							text: m(t).text,
							fixed: !0
						}),
						children: (e, t) => {
							r();
							var n = I();
							c((e) => U(n, e), [() => o.vb.t("Editar")]), B(e, n);
						},
						$$slots: { default: !0 }
					});
				};
				L(ce, (e) => {
					m(t).name && e(le);
				});
				var ue = n(ce);
				{
					let e = w(() => !!m(i));
					V(ue, {
						variant: "ghost",
						size: "sm",
						get "data-rem-del"() {
							return m(t).id;
						},
						get disabled() {
							return m(e);
						},
						onclick: (e) => {
							f(C, m(t), !0), f(O, e.currentTarget, !0), f(T, !0);
						},
						children: (e, t) => {
							r();
							var n = I();
							c((e) => U(n, e), [() => o.vb.t("Apagar lembrete")]), B(e, n);
						},
						$$slots: { default: !0 }
					});
				}
				S(se), S(z);
				var de = n(z, 2), fe = (e) => {
					var t = Rh(), n = d(t, !0);
					c((e) => U(n, e), [() => o.vb.t("Aguardando confirmação…")]), B(e, t);
				};
				L(de, (e) => {
					m(i) && e(fe);
				});
				var pe = n(de, 2), me = (e) => {
					var t = zh(), n = d(t, !0);
					c((e) => U(n, e), [() => ne(m(p))]), B(e, t);
				};
				L(pe, (e) => {
					m(p) && e(me);
				}), c((e, n, r) => {
					A(v, "data-rem-open", m(t).id), A(v, "aria-expanded", e), A(v, "aria-controls", `${l}-content-${m(t).id}`), U(D, m(t).name ? `${m(t).name}.md` : m(t).text), U(N, n), A(R, "hidden", r), A(R, "id", `${l}-content-${m(t).id}`), U(ie, m(t).text);
				}, [
					() => m(y).includes(m(t).id),
					() => o.vb.t("de {who}", { who: o.vb.name(m(t).owner) }),
					() => !m(y).includes(m(t).id)
				]), te("click", v, () => ae(m(t).id)), B(e, h);
			},
			$$slots: { default: !0 }
		});
	}, (e) => {
		var t = P(), n = a(t), r = (e) => {
			var t = Vh(), n = d(t, !0);
			c((e) => U(n, e), [() => o.vb.t("Nenhum lembrete ainda. Clique em Novo lembrete, ou peça pro seu agent: “todo dia às 8h, me manda o resumo do que mudou”.")]), B(e, t);
		};
		L(n, (e) => {
			u().draft || e(r);
		}), B(e, t);
	}), S(we), S(ce), le(ce, (e) => f(E, e), () => m(E));
	var H = n(ce, 2);
	{
		let e = w(() => o.vb.t("Apagar este lembrete?")), t = w(() => m(C)?.name ? `${m(C).name}.md` : m(C)?.text), n = w(() => o.vb.t("Apagar lembrete")), r = w(() => o.vb.t("Cancelar")), i = w(() => !!(m(C) && u().pending[m(C).id])), a = w(() => m(C) ? ne(u().rowIssues[m(C).id]) : "");
		Qm(H, {
			get title() {
				return m(e);
			},
			get description() {
				return m(t);
			},
			get confirmLabel() {
				return m(n);
			},
			get cancelLabel() {
				return m(r);
			},
			get busy() {
				return m(i);
			},
			get error() {
				return m(a);
			},
			onconfirm: () => {
				z();
			},
			returnFocus: () => m(O)?.isConnected ? m(O) : m(k) || m(E),
			get open() {
				return m(T);
			},
			set open(e) {
				f(T, e, !0);
			}
		});
	}
	c((e) => U(he, e), [() => o.vb.t("Quando o lembrete roda, o @vibe publica o texto aqui para seu agent.")]), B(i, oe), t(), h();
}
Se(["click"]);
// svelte/Reminders.svelte
function Wh(e, n) {
	D(n, !0);
	var r = P(), i = a(r);
	F(i, () => n.room.id, (e) => {
		Uh(e, {
			get room() {
				return n.room;
			},
			get vb() {
				return n.vb;
			},
			get request() {
				return n.request;
			}
		});
	}), B(e, r), t();
}
// svelte/features/app-navigation/RoomStrip.svelte
var Gh = z("<nav data-vb-native=\"room-strip\" class=\"tw:flex tw:items-center tw:justify-between tw:gap-2 tw:border-b tw:border-border tw:bg-background tw:p-2 tw:font-sans tw:text-sm tw:text-foreground tw:min-[901px]:hidden\"><!><!><!></nav>");
function Kh(e, i) {
	D(i, !0);
	let a = () => ye(m(d), "$personal", l), o = () => ye(m(f), "$nav", l), [l, u] = xe(), d = w(() => i.controller.personal.state), f = w(() => i.controller.state);
	var p = Gh(), h = s(p);
	V(h, {
		variant: "ghost",
		size: "sm",
		onclick: (e) => {
			e.currentTarget.isConnected && i.controller.callbacks.home();
		},
		children: (e, t) => {
			r();
			var n = I();
			c((e) => U(n, e), [() => Nd(i.lang, "home")]), B(e, n);
		},
		$$slots: { default: !0 }
	});
	var g = n(h);
	R(g, 1, () => ld(a().me?.books ?? []).slice(0, 3), (e) => e.id, (e, t) => {
		{
			let n = w(() => o().roomId === m(t).id), r = w(() => a().seen[m(t).id] ?? 0), s = w(() => a().me?.waits.filter((e) => e.book_id === m(t).id).length ?? 0);
			Vd(e, {
				get room() {
					return m(t);
				},
				get lang() {
					return i.lang;
				},
				compact: !0,
				get now() {
					return a().now;
				},
				get selected() {
					return m(n);
				},
				get seen() {
					return m(r);
				},
				get waits() {
					return m(s);
				},
				get onnavigate() {
					return i.controller.callbacks.navigate;
				},
				onsettings: (e, t) => i.controller.openSettings(e, t)
			});
		}
	});
	var _ = n(g);
	{
		let e = w(() => Nd(i.lang, "search"));
		mt(_, {
			icon: "search",
			get label() {
				return m(e);
			},
			onclick: (e) => {
				e.currentTarget.isConnected && i.controller.openSearch(e.currentTarget);
			}
		});
	}
	S(p), c((e) => A(p, "aria-label", e), [() => Nd(i.lang, "home")]), B(e, p), t(), u();
}
// svelte/features/people/model.ts
var qh = (e) => e.trim().toLowerCase();
function Jh(e, t) {
	return e.members.includes(t) && t !== e.book.owner && (!!e.pending?.includes(t) || e.me === e.book.owner);
}
function Yh(e, t, n) {
	return e.members.includes(e.me) ? t === "remove" ? !!Jh(e, n) : t === "resend" ? !!e.pending?.includes(n) : t === "approve" || t === "deny" ? !!e.requests?.some((e) => e.email === n) : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(n) && !e.members.includes(n) : !1;
}
function Xh(e, t) {
	let n = e.members.filter((t) => t === e.me || e.online.includes(t));
	return {
		online: n,
		offline: e.members.filter((e) => !n.includes(e)),
		friends: t.filter((t) => !e.members.includes(t))
	};
}
function Zh(e, t, n, r) {
	let i = `${n}/b/${e.id}`;
	return `${r("Te convidei pro vibebook \"{title}\": {url}", {
		title: e.book.title,
		url: i
	})}\n\n${r("1. Entra com {email} (o convite chegou nesse email).", { email: t })}\n${r("2. Manda isto pro seu Claude Code:")}\n\nRead ${n}/llms.txt and set up vibebook for this project. Room: ${i}`;
}
// svelte/features/people/api.ts
function Qh(e, t) {
	let n = Ke("/", t).api.books[":id"], r = encodeURIComponent(e);
	return async (e, t) => {
		let i = e === "remove" ? await n.members[":email"].$delete({ param: {
			id: r,
			email: encodeURIComponent(t)
		} }) : e === "approve" || e === "deny" ? await n.requests.$post({
			param: { id: r },
			json: {
				email: t,
				ok: e === "approve"
			}
		}) : await n.members.$post({
			param: { id: r },
			json: { email: t }
		}), a = await i.json().catch(() => null);
		if (!i.ok) {
			let e = Ve.safeParse(a);
			throw Error(e.success ? e.data.error : `HTTP ${i.status}`);
		}
		if (!Ge.safeParse(a).success) throw Error("Invalid people response");
	};
}
// svelte/features/people/session.ts
var $h = {
	schedule: (e, t) => setTimeout(e, t),
	cancel: (e) => clearTimeout(e)
}, eg = 2e4, tg = 1e4;
function ng(e, t = $h) {
	let n = v({
		draft: "",
		pending: {},
		issues: {},
		notices: {},
		clipboard: null
	}), r = !0, i = null, a = 0, o = /* @__PURE__ */ new Map(), s = (e, r) => {
		let i = o.get(e);
		i?.timer !== void 0 && t.cancel(i.timer), o.delete(e), n.update((t) => {
			let n = { ...t.pending }, i = { ...t.issues };
			return delete n[e], r ? i[e] = r : delete i[e], {
				...t,
				pending: n,
				issues: i
			};
		});
	}, c = (e) => {
		let t = o.get(e);
		t && (t.timer = void 0, n.update((t) => ({
			...t,
			issues: {
				...t.issues,
				[e]: "unconfirmed"
			}
		})));
	}, l = (e, t) => !!i && (t === "remove" ? !i.members.includes(e) : t === "invite" ? i.members.includes(e) : t === "approve" ? i.members.includes(e) && !i.requests?.some((t) => t.email === e) : t !== "deny" || !i.requests?.some((t) => t.email === e));
	return {
		state: n,
		sync(t) {
			if (r && t.id === e) {
				i = t;
				for (let [e, n] of o) ((n.action === "remove" ? !t.members.includes(e) : (n.action === "approve" || n.action === "deny") && !t.requests?.some((t) => t.email === e)) || n.ack && l(e, n.action)) && s(e);
			}
		},
		edit(e) {
			r && n.update((t) => ({
				...t,
				draft: e
			}));
		},
		async copy(e, t) {
			if (!r) return;
			let i = ++a;
			try {
				await t(), r && i === a && n.update((t) => ({
					...t,
					clipboard: {
						email: e,
						status: "copied"
					}
				}));
			} catch {
				r && i === a && n.update((t) => ({
					...t,
					clipboard: {
						email: e,
						status: "failed"
					}
				}));
			}
		},
		async mutate(e, a, u) {
			let d = qh(a);
			if (!r || !i || o.has(d)) return !1;
			if (!Yh(i, e, d)) return e === "invite" && n.update((e) => ({
				...e,
				issues: {
					...e.issues,
					[d]: i.members.includes(d) ? "already-member" : "invalid-email"
				}
			})), !1;
			let f = Symbol(), p = T(n).draft;
			o.set(d, {
				token: f,
				action: e,
				ack: !1
			}), n.update((t) => {
				let n = { ...t.issues }, r = { ...t.notices };
				return delete n[d], delete r[d], {
					...t,
					pending: {
						...t.pending,
						[d]: e
					},
					issues: n,
					notices: r
				};
			});
			let m = () => r && o.get(d)?.token === f;
			o.get(d).timer = t.schedule(() => {
				m() && !o.get(d).ack && c(d);
			}, eg);
			try {
				await u(e, d);
			} catch (e) {
				return m() && s(d, e instanceof Error ? e.message : "failed"), !1;
			}
			if (!m()) return !1;
			let h = o.get(d);
			return h.timer !== void 0 && t.cancel(h.timer), h.ack = !0, n.update((t) => ({
				...t,
				draft: e === "invite" && qh(p) === d && t.draft === p ? "" : t.draft,
				notices: {
					...t.notices,
					[d]: e
				}
			})), l(d, e) ? s(d) : h.timer = t.schedule(() => {
				m() && c(d);
			}, tg), !0;
		},
		dispose() {
			r = !1, a++;
			for (let e of o.values()) e.timer !== void 0 && t.cancel(e.timer);
			o.clear(), i = null;
		}
	};
}
// svelte/features/people/PeoplePanel.svelte
var rg = z("<!> <div class=\"tw:flex tw:flex-wrap tw:gap-1\"><!> <!></div>", 1), ig = z("<div class=\"tw:space-y-2\"><div class=\"tw:flex tw:items-start tw:gap-2\"><!> <div class=\"tw:min-w-0 tw:flex-1 tw:space-y-1\"><p class=\"tw:m-0 tw:break-words tw:text-sm tw:font-medium\"> </p> <p class=\"tw:m-0 tw:break-all tw:text-xs tw:text-muted-foreground\"> </p> <!></div> <!></div> <!></div>"), ag = z("<div class=\"tw:flex tw:items-start tw:gap-2\"><!> <div class=\"tw:min-w-0 tw:flex-1 tw:space-y-1\"><p class=\"tw:m-0 tw:break-words tw:font-medium\"> </p> <p class=\"tw:m-0 tw:break-all tw:text-xs tw:text-muted-foreground\"> </p> <!></div> <!></div>"), og = z("<div class=\"tw:space-y-3\"><!> <!></div>"), sg = z("<details class=\"tw:space-y-3\"><summary class=\"tw:cursor-pointer tw:rounded-control tw:p-1 tw:text-xs tw:text-muted-foreground tw:focus-visible:outline-2 tw:focus-visible:outline-ring\"> </summary> <div class=\"tw:space-y-3\"></div></details>"), cg = z("<!><span class=\"tw:min-w-0 tw:break-all\"> </span><span aria-hidden=\"true\">+</span>", 1), lg = z("<details class=\"tw:space-y-2\"><summary class=\"tw:cursor-pointer tw:rounded-control tw:p-1 tw:text-xs tw:text-muted-foreground tw:focus-visible:outline-2 tw:focus-visible:outline-ring\"> </summary> <!></details>"), ug = z("<option></option>"), dg = z("<p role=\"status\" class=\"tw:m-0 tw:break-words tw:text-xs tw:text-muted-foreground\"> </p>"), fg = z("<p role=\"alert\" class=\"tw:m-0 tw:whitespace-pre-wrap tw:break-words tw:text-xs tw:text-destructive\"> </p>"), pg = z("<p class=\"tw:m-0 tw:break-words tw:text-xs tw:text-muted-foreground\"> </p>"), mg = z("<section tabindex=\"-1\" data-vb-native=\"\" data-people-panel=\"\" class=\"tw:space-y-4 tw:border-t tw:border-border tw:p-3 tw:font-sans tw:text-sm tw:text-foreground\"><!> <!> <!> <div class=\"tw:space-y-3\"></div> <!> <!> <form id=\"invite\" class=\"tw:space-y-2\"><!> <div class=\"tw:flex tw:items-center tw:gap-2\"><!><!></div> <datalist></datalist></form> <!> <!> <!> <!></section> <!>", 1);
function hg(o, l) {
	let p = ee();
	D(l, !0);
	let h = () => ye(k, "$view", g), [g, v] = xe(), y = (e, t = u) => {
		var i = ig(), o = s(i), f = s(o);
		{
			let e = w(() => l.vb.name(t())), n = w(() => ce(t()));
			ut(f, {
				get name() {
					return m(e);
				},
				get src() {
					return m(n);
				}
			});
		}
		var p = n(f, 2), g = s(p), _ = d(g, !0), v = n(g, 2), y = d(v, !0), b = n(v, 2), x = (e) => {
			var i = rg(), o = a(i);
			ct(o, {
				children: (e, t) => {
					r();
					var n = I();
					c((e) => U(n, e), [() => l.vb.t("pendente")]), B(e, n);
				},
				$$slots: { default: !0 }
			});
			var u = n(o, 2), d = s(u);
			{
				let e = w(() => l.vb.t("Copiar a mensagem de convite (link da sala + setup do agent) para mandar no WhatsApp"));
				V(d, {
					size: "sm",
					variant: "ghost",
					get "data-copyinv"() {
						return t();
					},
					get title() {
						return m(e);
					},
					onclick: () => ue(t()),
					children: (e, t) => {
						r();
						var n = I();
						c((e) => U(n, e), [() => l.vb.t("copiar")]), B(e, n);
					},
					$$slots: { default: !0 }
				});
			}
			var f = n(d, 2);
			{
				let e = w(() => !!h().pending[t()]);
				V(f, {
					size: "sm",
					variant: "ghost",
					get "data-resend"() {
						return t();
					},
					get disabled() {
						return m(e);
					},
					onclick: () => {
						E.mutate("resend", t(), l.request || O);
					},
					children: (e, t) => {
						r();
						var n = I();
						c((e) => U(n, e), [() => l.vb.t("reenviar")]), B(e, n);
					},
					$$slots: { default: !0 }
				});
			}
			S(u), B(e, i);
		}, C = w(() => l.room.pending?.includes(t())), T = (e) => {
			{
				let n = w(() => l.room.online.includes(t()) || t() === l.room.me ? "success" : "neutral");
				ct(e, {
					get variant() {
						return m(n);
					},
					children: (e, n) => {
						r();
						var i = I();
						c((e) => U(i, e), [() => l.room.online.includes(t()) || t() === l.room.me ? l.vb.t("online") : l.vb.t("offline")]), B(e, i);
					},
					$$slots: { default: !0 }
				});
			}
		};
		L(b, (e) => {
			m(C) ? e(x) : e(T, -1);
		}), S(p);
		var D = n(p, 2), k = (e) => {
			{
				let n = w(() => l.room.pending?.includes(t()) ? l.vb.t("Cancelar convite") : l.vb.t("Remover {email}", { email: t() })), r = w(() => !!h().pending[t()]);
				mt(e, {
					icon: "close",
					get "data-remove"() {
						return t();
					},
					get label() {
						return m(n);
					},
					get disabled() {
						return m(r);
					},
					onclick: (e) => pe(t(), "remove", e.currentTarget)
				});
			}
		}, j = w(() => Jh(l.room, t()));
		L(D, (e) => {
			m(j) && e(k);
		}), S(o);
		var M = n(o, 2);
		re(M, () => l.agents ?? u, t), S(i), c((e) => {
			A(o, "data-person", t()), A(g, "title", t()), U(_, e), U(y, t());
		}, [() => l.room.names?.[t()] || l.vb.name(t())]), B(e, i);
	}, C = H(l, "friends", 19, () => []), T = H(l, "foldOpen", 19, () => ({
		off: !1,
		friends: null
	})), E = b(() => ng(l.room.id)), O = b(() => Qh(l.room.id)), k = E.state, j = w(() => Xh(l.room, C())), M = e(!1), F = e(null), ne = e(null), ie = e(null), ae = e(x(b(() => T().off))), z = e(x(b(() => T().friends ?? l.room.members.length <= 1))), oe = (e) => e === "invalid-email" ? l.vb.t("Email inválido.") : e === "already-member" ? l.vb.t("Esta pessoa já está na sala.") : e === "unconfirmed" ? l.vb.t("Ainda não recebi a confirmação. Confira antes de tentar de novo.") : e, ce = (e) => l.vb.avatarUrl?.(e) || (l.room.avatars?.[e] ? `/api/avatar/${encodeURIComponent(e)}?v=${l.room.avatars[e]}` : void 0);
	_(() => {
		E.sync(l.room), m(F) && (m(F).action === "remove" ? !Jh(l.room, m(F).email) : !l.room.requests?.some((e) => e.email === m(F).email)) && (f(M, !1), f(F, null));
	}), de(() => E.dispose());
	function ue(e) {
		let t = Zh(l.room, e, location.origin, l.vb.t);
		E.copy(e, () => navigator.clipboard?.writeText(t) ?? Promise.reject(/* @__PURE__ */ Error("clipboard unavailable")));
	}
	function fe(e) {
		let t = qh(e);
		if (h().pending[t]) return;
		let n = l.room.pending?.includes(t) ? "resend" : "invite";
		Yh(l.room, n, t) && ue(t), E.mutate(n, t, l.request || O);
	}
	function pe(e, t, n) {
		f(F, {
			email: e,
			action: t
		}, !0), f(ne, n, !0), f(M, !0);
	}
	async function he() {
		let e = m(F);
		e && await E.mutate(e.action, e.email, l.request || O) && m(F) === e && !h().pending[e.email] && f(M, !1);
	}
	var ge = mg(), _e = a(ge), ve = s(_e), Se = (e) => {
		var t = og(), i = s(t);
		St(i, {
			level: 3,
			class: "tw:text-sm tw:leading-5",
			children: (e, t) => {
				r();
				var n = I();
				c((e) => U(n, e), [() => l.vb.t("Pedindo pra entrar")]), B(e, n);
			},
			$$slots: { default: !0 }
		});
		var a = n(i, 2);
		R(a, 17, () => l.room.requests, (e) => e.email, (e, t) => {
			var i = ag(), a = s(i);
			{
				let e = w(() => m(t).name || m(t).email), n = w(() => ce(m(t).email));
				ut(a, {
					get name() {
						return m(e);
					},
					get src() {
						return m(n);
					}
				});
			}
			var o = n(a, 2), u = s(o), f = d(u, !0), p = n(u, 2), g = d(p), _ = n(p, 2);
			{
				let e = w(() => !!h().pending[m(t).email]);
				V(_, {
					size: "sm",
					variant: "outline",
					get "data-ask"() {
						return m(t).email;
					},
					"data-ok": "1",
					get disabled() {
						return m(e);
					},
					onclick: () => {
						E.mutate("approve", m(t).email, l.request || O);
					},
					children: (e, t) => {
						r();
						var n = I();
						c((e) => U(n, e), [() => l.vb.t("liberar")]), B(e, n);
					},
					$$slots: { default: !0 }
				});
			}
			S(o);
			var v = n(o, 2);
			{
				let e = w(() => l.vb.t("Recusar {email}", { email: m(t).email })), n = w(() => !!h().pending[m(t).email]);
				mt(v, {
					icon: "close",
					get "data-ask"() {
						return m(t).email;
					},
					"data-ok": "",
					get label() {
						return m(e);
					},
					get disabled() {
						return m(n);
					},
					onclick: (e) => pe(m(t).email, "deny", e.currentTarget)
				});
			}
			S(i), c((e) => {
				A(i, "data-access-request", m(t).email), U(f, m(t).name || m(t).email), U(g, `${m(t).email ?? ""} · ${e ?? ""}`);
			}, [() => l.vb.t("pediu {ago}", { ago: l.vb.ago(m(t).ts) })]), B(e, i);
		}), S(t), B(e, t);
	};
	L(ve, (e) => {
		l.room.requests?.length && e(Se);
	});
	var we = n(ve, 2);
	St(we, {
		level: 3,
		class: "tw:text-sm tw:leading-5",
		children: (e, t) => {
			r();
			var n = I();
			c((e) => U(n, e), [() => l.vb.t("Pessoas e agents")]), B(e, n);
		},
		$$slots: { default: !0 }
	});
	var Te = n(we, 2);
	re(Te, () => l.sandboxes ?? u);
	var Ee = n(Te, 2);
	R(Ee, 20, () => m(j).online, (e) => e, (e, t) => {
		y(e, () => t);
	}), S(Ee);
	var De = n(Ee, 2), Oe = (e) => {
		var t = sg(), r = s(t), i = d(r, !0), a = n(r, 2);
		R(a, 20, () => m(j).offline, (e) => e, (e, t) => {
			y(e, () => t);
		}), S(a), S(t), c((e) => U(i, e), [() => l.vb.t("{n} offline", { n: m(j).offline.length })]), te("click", r, () => l.onfoldchange?.("off", !m(ae))), me("open", "toggle", t, (e) => f(ae, e), () => m(ae)), B(e, t);
	};
	L(De, (e) => {
		m(j).offline.length && e(Oe);
	});
	var ke = n(De, 2), Ae = (e) => {
		var t = lg(), i = s(t), o = d(i), u = n(i, 2);
		R(u, 16, () => m(j).friends, (e) => e, (e, t) => {
			{
				let i = w(() => !!h().pending[t]);
				V(e, {
					variant: "ghost",
					class: "tw:h-auto tw:w-full tw:justify-start tw:whitespace-normal tw:text-left",
					get "data-add"() {
						return t;
					},
					get disabled() {
						return m(i);
					},
					onclick: () => fe(t),
					children: (e, i) => {
						var o = cg(), s = a(o);
						{
							let e = w(() => l.vb.name(t)), n = w(() => ce(t));
							ut(s, {
								get name() {
									return m(e);
								},
								get src() {
									return m(n);
								}
							});
						}
						var u = n(s), f = d(u, !0);
						r(), c((e) => U(f, e), [() => l.vb.name(t)]), B(e, o);
					},
					$$slots: { default: !0 }
				});
			}
		}), S(t), c((e) => U(o, `${e ?? ""} · ${m(j).friends.length ?? ""}`), [() => l.vb.t("Seus amigos")]), te("click", i, () => l.onfoldchange?.("friends", !m(z))), me("open", "toggle", t, (e) => f(z, e), () => m(z)), B(e, t);
	};
	L(ke, (e) => {
		m(j).friends.length && e(Ae);
	});
	var je = n(ke, 2), Me = s(je);
	{
		let e = w(() => `${p}-email`);
		be(Me, {
			get for() {
				return m(e);
			},
			children: (e, t) => {
				r();
				var n = I();
				c((e) => U(n, e), [() => l.vb.t("convidar por email")]), B(e, n);
			},
			$$slots: { default: !0 }
		});
	}
	var Ne = n(Me, 2), Pe = s(Ne);
	{
		let e = w(() => `${p}-email`), t = w(() => `${p}-friends`);
		Ce(Pe, {
			get id() {
				return m(e);
			},
			type: "email",
			required: !0,
			get list() {
				return m(t);
			},
			autocomplete: "off",
			get value() {
				return h().draft;
			},
			oninput: (e) => E.edit(e.currentTarget.value)
		});
	}
	var Fe = n(Pe);
	{
		let e = w(() => !!h().pending[qh(h().draft)]);
		V(Fe, {
			type: "submit",
			size: "sm",
			get disabled() {
				return m(e);
			},
			children: (e, t) => {
				r();
				var n = I();
				c((e) => U(n, e), [() => l.vb.t("Convidar")]), B(e, n);
			},
			$$slots: { default: !0 }
		});
	}
	S(Ne);
	var Ie = n(Ne, 2);
	R(Ie, 21, () => m(j).friends, N, (e, t) => {
		var n = ug(), r = {};
		c(() => {
			r !== (r = m(t)) && (n.value = (n.__value = r) ?? "");
		}), B(e, n);
	}), S(Ie), S(je);
	var Le = n(je, 2);
	R(Le, 1, () => Object.entries(h().pending), N, (e, t) => {
		var n = w(() => i(m(t), 1));
		let r = () => m(n)[0];
		var o = P(), s = a(o), u = (e) => {
			var t = dg(), n = d(t);
			c((e) => U(n, `${r() ?? ""} · ${e ?? ""}`), [() => l.vb.t("Aguardando confirmação…")]), B(e, t);
		};
		L(s, (e) => {
			h().issues[r()] !== "unconfirmed" && e(u);
		}), B(e, o);
	});
	var Re = n(Le, 2);
	R(Re, 1, () => Object.entries(h().issues), N, (e, t) => {
		var n = w(() => i(m(t), 2));
		let r = () => m(n)[0], a = () => m(n)[1];
		var o = fg(), s = d(o);
		c((e) => U(s, `${r() ?? ""} · ${e ?? ""}`), [() => oe(a())]), B(e, o);
	});
	var W = n(Re, 2);
	R(W, 1, () => Object.entries(h().notices), N, (e, t) => {
		var n = w(() => i(m(t), 2));
		let r = () => m(n)[0], o = () => m(n)[1];
		var s = P(), u = a(s), f = (e) => {
			var t = dg(), n = d(t);
			c((e) => U(n, `${r() ?? ""} · ${e ?? ""} ✓`), [() => l.vb.t("enviado")]), B(e, t);
		};
		L(u, (e) => {
			(o() === "invite" || o() === "resend") && e(f);
		}), B(e, s);
	});
	var ze = n(W, 2), Be = (e) => {
		var t = pg(), n = d(t, !0);
		c((e) => {
			A(t, "role", h().clipboard.status === "failed" ? "alert" : "status"), U(n, e);
		}, [() => h().clipboard.status === "failed" ? l.vb.t("Não consegui copiar. Use \"copiar\" ao lado de {email} em Pessoas.", { email: h().clipboard.email }) : l.vb.t("Copiei a mensagem com o link da sala e o setup do agent para {name}: cola no WhatsApp.", { name: l.vb.name(h().clipboard.email) })]), B(e, t);
	};
	L(ze, (e) => {
		h().clipboard && e(Be);
	}), S(_e), le(_e, (e) => f(ie, e), () => m(ie));
	var Ve = n(_e, 2);
	{
		let e = w(() => m(F)?.action === "deny" ? l.vb.t("Recusar o pedido de {email}?", { email: m(F).email }) : l.room.pending?.includes(m(F)?.email || "") ? l.vb.t("Cancelar o convite de {email}?", { email: m(F)?.email || "" }) : l.vb.t("Remover {email} deste vibebook?", { email: m(F)?.email || "" })), t = w(() => m(F)?.email), n = w(() => m(F)?.action === "deny" ? l.vb.t("Recusar") : l.vb.t("Remover do vibebook")), r = w(() => l.vb.t("Cancelar")), i = w(() => !!(m(F) && h().pending[m(F).email] && h().issues[m(F).email] !== "unconfirmed")), a = w(() => !!(m(F) && h().pending[m(F).email])), o = w(() => m(F) && h().issues[m(F).email] ? oe(h().issues[m(F).email]) : "");
		Qm(Ve, {
			get title() {
				return m(e);
			},
			get description() {
				return m(t);
			},
			get confirmLabel() {
				return m(n);
			},
			get cancelLabel() {
				return m(r);
			},
			get busy() {
				return m(i);
			},
			get confirmDisabled() {
				return m(a);
			},
			get error() {
				return m(o);
			},
			onconfirm: () => {
				he();
			},
			returnFocus: () => m(ne)?.isConnected ? m(ne) : m(ie),
			get open() {
				return m(M);
			},
			set open(e) {
				f(M, e, !0);
			}
		});
	}
	c(() => A(Ie, "id", `${p}-friends`)), se("submit", je, (e) => {
		e.preventDefault(), fe(h().draft);
	}), B(o, ge), t(), v();
}
Se(["click"]);
// svelte/People.svelte
var gg = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"room"
]);
function _g(e, n) {
	D(n, !0);
	let r = fe(n, gg);
	var i = P(), o = a(i);
	F(o, () => n.room.id, (e) => {
		hg(e, pe({ get room() {
			return n.room;
		} }, () => r));
	}), B(e, i), t();
}
// svelte/features/navigation/model.ts
function vg(e) {
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
function yg(e, t) {
	let n = [], r = e.parents.get(t);
	for (; r;) n.push(r), r = e.parents.get(r);
	return n;
}
function bg(e, t, n = /* @__PURE__ */ new Set(), r = !1) {
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
function xg(e, t) {
	let n = /* @__PURE__ */ new Map();
	for (let e of t) n.set(e.thread, Math.max(n.get(e.thread) ?? 0, e.id));
	return e.filter((e) => e.archived).map((e, t) => ({
		epic: e,
		index: t
	})).sort((e, t) => (n.get(t.epic.id) ?? 0) - (n.get(e.epic.id) ?? 0) || t.index - e.index).map(({ epic: e }) => e);
}
function Sg(e, t, n, r) {
	if (t === n || new Set(e.map((e) => e.id)).size !== e.length) return null;
	let i = vg(e.filter((e) => !e.archived));
	if (!i.byId.has(t) || !i.byId.has(n) || i.parents.get(t) !== i.parents.get(n)) return null;
	let a = e.map((e) => e.id).filter((e) => e !== t);
	return a.splice(a.indexOf(n) + +!!r, 0, t), a.every((t, n) => t === e[n]?.id) ? null : a;
}
// svelte/features/navigation/session.ts
function Cg() {
	try {
		return localStorage;
	} catch {
		return null;
	}
}
function wg(e, t) {
	try {
		let n = JSON.parse(t?.getItem(`vb.tree.${e}`) ?? "[]");
		if (Array.isArray(n) && n.every((e) => typeof e == "string")) return new Set(n);
	} catch {}
	return /* @__PURE__ */ new Set();
}
function Tg(e, t) {
	try {
		e.storage?.setItem(`vb.tree.${e.roomId}`, JSON.stringify([...t]));
	} catch {}
}
function Eg(e, t = !1, n = Cg()) {
	return {
		roomId: e,
		storage: n,
		state: v({
			draft: "",
			closed: wg(e, n),
			openedFor: null,
			archived: t
		})
	};
}
function Dg(e, t, n) {
	let r = T(e.state);
	if (!t.byId.has(n) && n !== "main" && !n.startsWith("pre:") || r.openedFor === n) return;
	let i = new Set(r.closed);
	for (let e of yg(t, n)) i.delete(e);
	Tg(e, i), e.state.set({
		...r,
		closed: i,
		openedFor: n
	});
}
function Og(e, t) {
	e.state.update((n) => {
		let r = new Set(n.closed);
		return r.has(t) ? r.delete(t) : r.add(t), Tg(e, r), {
			...n,
			closed: r
		};
	});
}
function kg(e, t, n, r = !1) {
	let i = e?.roomId === t.id ? e : Eg(t.id, r);
	return Dg(i, vg(t.epics), n), i;
}
// svelte/features/navigation/EpicTree.svelte
var Ag = z("<span aria-hidden=\"true\" class=\"tw:w-8 tw:shrink-0\"></span>"), jg = z("<span class=\"tw:sr-only\"> </span>"), Mg = z("<span role=\"img\" class=\"tw:text-primary\">✻</span>"), Ng = z("<span> </span>"), Pg = z("<span class=\"tw:shrink-0 tw:text-xs tw:text-muted-foreground\"> </span>"), Fg = z("<!> <span class=\"tw:min-w-0 tw:flex-1 tw:break-words\" data-epic-title=\"\"> <!></span> <!> <!> <!> <!>", 1), Ig = z("<div class=\"tw:flex tw:flex-wrap tw:gap-2\"><!><!></div>"), Lg = z("<li><div role=\"group\"><!> <!></div> <details class=\"tw:ml-8 tw:text-xs tw:text-muted-foreground\"><summary class=\"tw:cursor-pointer tw:rounded-control tw:px-2 tw:py-1 tw:focus-visible:outline-2 tw:focus-visible:outline-ring\"> </summary> <div class=\"tw:space-y-2 tw:p-2\"><!> <!> <!></div></details></li>"), Rg = z(" <span class=\"tw:text-xs tw:text-muted-foreground\"> </span>", 1), zg = z("<form id=\"newEpic\" class=\"tw:space-y-2\"><!> <div class=\"tw:flex tw:gap-2\"><!><!></div></form> <!>", 1), Bg = z("<ul class=\"tw:m-0 tw:list-none tw:space-y-1 tw:p-0\"></ul> <!>", 1), Vg = z("<p role=\"alert\" class=\"tw:m-0 tw:text-sm tw:text-destructive\"> </p>"), Hg = z("<section data-vb-native=\"\" class=\"tw:m-0 tw:box-border tw:space-y-3 tw:rounded-surface tw:bg-sidebar tw:p-3 tw:font-sans tw:text-sm tw:leading-5 tw:text-sidebar-foreground\"><!> <p role=\"status\" aria-live=\"polite\" class=\"tw:sr-only\"> </p> <!></section>");
function Ug(i, o) {
	let l = ee();
	D(o, !0);
	let p = () => ye(C, "$mutation", v), h = () => ye(m(x), "$navigation", v), [v, y] = xe(), x = w(() => o.session.state), C = b(() => o.mutations.state), E = w(() => p().phase === "pending" || p().phase === "unconfirmed"), O = e(""), k = e(null), F = e(null), te = e(!1), ne = e(null), re = !1, ie = /* @__PURE__ */ new Map(), ae = 0, z = e(null), oe = e("");
	de(() => {
		re = !0, ae++, ie.clear();
	});
	let ce = [
		"tw:pl-0",
		"tw:pl-2",
		"tw:pl-4",
		"tw:pl-6",
		"tw:pl-8",
		"tw:pl-10",
		"tw:pl-12"
	], le = w(() => o.room.epics.filter((e) => !e.archived)), ue = w(() => xg(o.room.epics, o.room.messages)), fe = w(() => h().archived && m(ue).length > 0 ? "archived" : "active"), pe = w(() => vg(m(fe) === "archived" ? m(ue) : m(le))), me = w(() => vg(o.room.epics)), ge = w(() => new Set(o.room.epics.filter((e) => o.vb.epicBusy(e)).map((e) => e.id))), ve = w(() => bg(m(pe), h().closed, m(ge), !0)), Se = w(() => new Map(m(ve).map((e, t) => [e.epic.id, `${l}-row-${t}`])));
	_(() => {
		Dg(o.session, m(me), o.thread);
	});
	function Te(e) {
		if (re) return;
		ae++, f(z, null);
		let t = e === "archived";
		m(x).update((e) => ({
			...e,
			archived: t
		})), o.onarchchange(t), f(k, null), f(F, null), f(O, "");
	}
	async function H(e) {
		return re || m(E) || o.session.roomId !== o.room.id ? !1 : (f(O, ""), await o.mutations.run(e));
	}
	async function Ee(e) {
		if (e.preventDefault(), re) return;
		let t = h().draft.trim(), n = h().draft, r = m(x);
		if (!t) return m(ne)?.focus();
		await H({
			t: "epic",
			title: t
		}) && T(r).draft === n && r.update((e) => ({
			...e,
			draft: ""
		}));
	}
	function De(e) {
		let t = m(pe).parents.get(e);
		return t ? m(pe).children.get(t) ?? [] : m(pe).roots;
	}
	function Oe(e, t) {
		let n = De(e);
		return n[n.findIndex((t) => t.id === e) + t];
	}
	async function ke(e, t, n) {
		let r = Sg(o.room.epics, e, t, n);
		if (!r || re) return;
		f(z, null);
		let i = ++ae, a = document.activeElement, s = a instanceof HTMLElement && ie.get(e)?.contains(a) ? a : null, c = o.thread;
		await H({
			t: "epic.order",
			ids: r
		}) && !re && ae === i && o.thread === c && f(z, {
			ids: r,
			from: e,
			anchor: s,
			generation: i,
			thread: o.thread
		}, !0);
	}
	function Ae(e, t) {
		return ie.set(t, e), { destroy() {
			ie.get(t) === e && ie.delete(t);
		} };
	}
	_(() => {
		let e = m(z);
		if (!e) return;
		if (e.thread !== o.thread || m(fe) !== "active") {
			f(z, null), ae++;
			return;
		}
		let t = o.room.epics.map((e) => e.id);
		if (!t.includes(e.from)) {
			f(z, null), je(e);
			return;
		}
		let n = new Set(t), r = new Set(e.ids), i = e.ids.filter((e) => n.has(e)), a = t.filter((e) => r.has(e));
		a.length !== i.length || a.some((e, t) => e !== i[t]) || (f(z, null), f(oe, o.vb.t("Ordem dos épicos atualizada."), !0), je(e));
	});
	function je(e) {
		let t = e.anchor;
		if (!t) return;
		let n = () => document.activeElement === document.body || document.activeElement === t;
		n() && g().then(() => {
			if (re || e.generation !== ae || !n() || document.activeElement === t && !t.matches(":disabled")) return;
			let r = ie.get(e.from);
			r?.hidden || (r?.querySelector("[data-epic-thread]") ?? m(ne))?.focus({ preventScroll: !0 });
		});
	}
	function Me(e, t) {
		let n = Oe(e, t);
		m(fe) === "active" && n && ke(e, n.id, t === 1);
	}
	function Ne(e, t) {
		if (m(E) || m(fe) !== "active" || !e.dataTransfer) return e.preventDefault();
		e.dataTransfer.setData("text/vb-epic", t), e.dataTransfer.effectAllowed = "move", f(k, t, !0);
	}
	function Pe(e, t) {
		return !m(E) && m(fe) === "active" && m(k) !== t && e.dataTransfer?.types.includes("text/vb-epic");
	}
	function Fe(e, t) {
		if (!Pe(e, t)) return;
		e.preventDefault();
		let n = e.currentTarget instanceof HTMLElement ? e.currentTarget.getBoundingClientRect() : null;
		f(F, t, !0), f(te, !!n && e.clientY >= n.top + n.height / 2, !0);
	}
	function Ie(e, t) {
		let n = m(te);
		if (f(F, null), !Pe(e, t)) return;
		e.preventDefault();
		let r = e.dataTransfer?.getData("text/vb-epic");
		r && ke(r, t, n), f(k, null);
	}
	var Le = Hg(), Re = s(Le);
	{
		let e = (e, t = u) => {
			var i = P(), p = a(i), g = (e) => {
				var i = Bg(), u = a(i);
				R(u, 21, () => m(ve), (e) => e.epic.id, (e, i) => {
					let l = w(() => m(i).epic), u = w(() => h().closed.has(m(l).id)), p = w(() => m(pe).byId.get(m(pe).parents.get(m(l).id) ?? "")), g = w(() => o.vb.epicBusy(m(l)));
					var _ = Lg(), v = s(_), y = s(v), b = (e) => {
						{
							let t = w(() => m(u) ? "chevronRight" : "chevronDown"), n = w(() => `${o.vb.t(m(u) ? "Abrir galho" : "Fechar galho")}: ${m(l).title}`), r = w(() => !m(u)), i = w(() => (m(pe).children.get(m(l).id) ?? []).map((e) => m(Se).get(e.id)).join(" "));
							mt(e, {
								get icon() {
									return m(t);
								},
								get label() {
									return m(n);
								},
								get "aria-expanded"() {
									return m(r);
								},
								get "aria-controls"() {
									return m(i);
								},
								class: "tw:size-8 tw:p-1",
								onclick: () => Og(o.session, m(l).id)
							});
						}
					}, x = (e) => {
						var t = Ag();
						B(e, t);
					};
					L(y, (e) => {
						m(i).hasChildren ? e(b) : e(x, -1);
					});
					var C = n(y, 2);
					{
						let e = w(() => o.thread === m(l).id ? "page" : void 0);
						V(C, {
							variant: "ghost",
							class: "tw:h-auto tw:min-h-9 tw:min-w-0 tw:flex-1 tw:justify-start tw:gap-2 tw:whitespace-normal tw:px-1 tw:py-2 tw:text-left",
							get "data-epic-thread"() {
								return m(l).id;
							},
							get "aria-current"() {
								return m(e);
							},
							onclick: () => {
								o.thread === m(l).id && m(i).hasChildren ? Og(o.session, m(l).id) : o.onopen(m(l).id);
							},
							children: (e, t) => {
								var f = Fg(), h = a(f);
								{
									let e = w(() => m(l).owner ? o.vb.name(m(l).owner) : m(l).title), t = w(() => m(l).owner && o.room.avatars?.[m(l).owner] ? `/api/avatar/${encodeURIComponent(m(l).owner)}?v=${o.room.avatars[m(l).owner]}` : void 0);
									ut(h, {
										get name() {
											return m(e);
										},
										get src() {
											return m(t);
										},
										class: "tw:size-6 tw:text-xs"
									});
								}
								var _ = n(h, 2), v = s(_, !0), y = n(v), b = (e) => {
									var t = jg(), n = d(t);
									c((e) => U(n, `· ${e ?? ""}`), [() => o.vb.t("Subépico de {title}", { title: m(p).title })]), B(e, t);
								};
								L(y, (e) => {
									m(p) && e(b);
								}), S(_);
								var x = n(_, 2), C = (e) => {
									var t = Mg();
									c((e) => A(t, "aria-label", e), [() => m(g) ? o.vb.t("{who} está trabalhando", { who: m(g) }) : o.vb.t("Trabalho em um subépico")]), B(e, t);
								};
								L(x, (e) => {
									(m(g) || m(u) && m(i).busyBelow) && e(C);
								});
								var T = n(x, 2), E = (e) => {
									ct(e, {
										variant: "warning",
										children: (e, t) => {
											r();
											var n = I();
											c((e) => U(n, e), [() => o.vb.waitCount(m(l).id)]), B(e, n);
										},
										$$slots: { default: !0 }
									});
								}, D = w(() => o.vb.waitCount(m(l).id));
								L(T, (e) => {
									m(D) && e(E);
								});
								var O = n(T, 2), k = (e) => {
									var t = Ng(), n = d(t, !0);
									c((e) => {
										A(t, "title", e), U(n, m(l).prod.stage === "verified" ? "✓✓" : "🚀");
									}, [() => o.vb.t(m(l).prod.stage === "verified" ? "Verificado em prod" : "No ar, falta verificar em prod")]), B(e, t);
								};
								L(O, (e) => {
									m(l).prod && e(k);
								});
								var j = n(O, 2), M = (e) => {
									var t = Pg(), n = d(t);
									c((e) => U(n, `${e ?? ""}/${m(l).tasks.length ?? ""}`), [() => m(l).tasks.filter((e) => e.done).length]), B(e, t);
								};
								L(j, (e) => {
									m(l).tasks.length && e(M);
								}), c(() => U(v, m(l).title)), B(e, f);
							},
							$$slots: { default: !0 }
						});
					}
					S(v);
					var T = n(v, 2), D = s(T), O = d(D), N = n(D, 2), ee = s(N);
					{
						let e = w(() => `${m(Se).get(m(l).id)}-owner`);
						be(ee, {
							get for() {
								return m(e);
							},
							children: (e, t) => {
								r();
								var n = I();
								c((e) => U(n, e), [() => o.vb.t("Dono do épico")]), B(e, n);
							},
							$$slots: { default: !0 }
						});
					}
					var P = n(ee, 2);
					{
						let e = w(() => `${m(Se).get(m(l).id)}-owner`), t = w(() => `${o.vb.t("Dono do épico")}: ${m(l).title}`), n = w(() => m(l).owner ?? ""), r = w(() => [{
							value: "",
							label: o.vb.t("Sem dono")
						}, ...o.room.members.map((e) => ({
							value: e,
							label: o.vb.name(e)
						}))]);
						Ze(P, {
							get disabled() {
								return m(E);
							},
							get id() {
								return m(e);
							},
							get "aria-label"() {
								return m(t);
							},
							get value() {
								return m(n);
							},
							get items() {
								return m(r);
							},
							onValueChange: (e) => (H({
								t: "epic.owner",
								id: m(l).id,
								owner: e
							}), !1)
						});
					}
					var ne = n(P, 2), re = (e) => {
						var t = Ig(), i = s(t);
						{
							let e = w(() => m(E) || !Oe(m(l).id, -1)), t = w(() => `${o.vb.t("Mover para cima")}: ${m(l).title}`);
							V(i, {
								variant: "outline",
								size: "sm",
								get disabled() {
									return m(e);
								},
								get "aria-label"() {
									return m(t);
								},
								onclick: () => Me(m(l).id, -1),
								children: (e, t) => {
									r();
									var n = I();
									c((e) => U(n, e), [() => o.vb.t("Mover para cima")]), B(e, n);
								},
								$$slots: { default: !0 }
							});
						}
						var a = n(i);
						{
							let e = w(() => m(E) || !Oe(m(l).id, 1)), t = w(() => `${o.vb.t("Mover para baixo")}: ${m(l).title}`);
							V(a, {
								variant: "outline",
								size: "sm",
								get disabled() {
									return m(e);
								},
								get "aria-label"() {
									return m(t);
								},
								onclick: () => Me(m(l).id, 1),
								children: (e, t) => {
									r();
									var n = I();
									c((e) => U(n, e), [() => o.vb.t("Mover para baixo")]), B(e, n);
								},
								$$slots: { default: !0 }
							});
						}
						S(t), B(e, t);
					};
					L(ne, (e) => {
						t() === "active" && e(re);
					}), S(N), S(T), S(_), _e(_, (e, t) => Ae?.(e, t), () => m(l).id), c((e, n, r, a) => {
						A(_, "id", e), A(_, "hidden", m(i).hidden), A(_, "data-epic", m(l).id), A(_, "data-depth", m(i).depth), M(_, 1, n), A(v, "aria-label", m(l).title), A(v, "draggable", !m(E) && t() === "active"), M(v, 1, r), U(O, `${a ?? ""}: ${m(l).title ?? ""}`);
					}, [
						() => m(Se).get(m(l).id),
						() => j(ce[Math.min(m(i).depth, ce.length - 1)]),
						() => j(we("tw:flex tw:items-center tw:gap-1 tw:rounded-control tw:border tw:border-transparent", o.thread === m(l).id && "tw:bg-sidebar-accent tw:text-sidebar-accent-foreground", m(F) === m(l).id && (m(te) ? "tw:border-b-primary" : "tw:border-t-primary"), m(k) === m(l).id && "tw:opacity-50")),
						() => o.vb.t("Ações do épico")
					]), se("dragstart", v, (e) => Ne(e, m(l).id)), se("dragend", v, () => {
						f(k, null), f(F, null);
					}), se("dragover", v, (e) => Fe(e, m(l).id)), se("dragleave", v, () => {
						m(F) === m(l).id && f(F, null);
					}), se("drop", v, (e) => Ie(e, m(l).id)), B(e, _);
				}), S(u);
				var p = n(u, 2), g = (e) => {
					var t = zg(), i = a(t), u = s(i);
					{
						let e = w(() => `${l}-new`);
						be(u, {
							get for() {
								return m(e);
							},
							children: (e, t) => {
								r();
								var n = I();
								c((e) => U(n, e), [() => o.vb.t("Novo épico")]), B(e, n);
							},
							$$slots: { default: !0 }
						});
					}
					var p = n(u, 2), g = s(p), _ = () => re ? "" : h().draft, v = (e) => {
						re || he(m(x), b(h).draft = e, b(h));
					};
					{
						let e = w(() => `${l}-new`), t = w(() => o.vb.t("Novo épico: escreva o título…"));
						Ce(g, {
							get id() {
								return m(e);
							},
							get value() {
								return _();
							},
							set value(e) {
								v(e);
							},
							get placeholder() {
								return m(t);
							},
							enterkeyhint: "done",
							get ref() {
								return m(ne);
							},
							set ref(e) {
								f(ne, e, !0);
							}
						});
					}
					var y = n(g);
					{
						let e = w(() => o.vb.t("Criar épico"));
						mt(y, {
							get disabled() {
								return m(E);
							},
							type: "submit",
							icon: "plus",
							variant: "primary",
							get label() {
								return m(e);
							}
						});
					}
					S(p), S(i);
					var C = n(i, 2);
					R(C, 17, () => o.room.suggestions, N, (e, t, i) => {
						{
							let s = w(() => o.thread === `pre:${i}` ? "page" : void 0);
							V(e, {
								variant: "outline",
								class: "tw:h-auto tw:w-full tw:justify-start tw:whitespace-normal tw:border-dashed tw:text-left",
								get "aria-current"() {
									return m(s);
								},
								onclick: () => o.onopen(`pre:${i}`),
								children: (e, i) => {
									r();
									var s = Rg(), l = a(s, !0), u = n(l), f = d(u, !0);
									c((e) => {
										U(l, m(t).title), U(f, e);
									}, [() => o.vb.t("sugestão do @vibe, clique para ver")]), B(e, s);
								},
								$$slots: { default: !0 }
							});
						}
					}), se("submit", i, Ee), B(e, t);
				};
				L(p, (e) => {
					t() === "active" && e(g);
				}), c((e) => A(u, "aria-label", e), [() => t() === "archived" ? o.vb.t("Arquivados") : o.vb.t("Épicos")]), B(e, i);
			};
			L(p, (e) => {
				t() === m(fe) && e(g);
			}), B(e, i);
		}, t = w(() => [{
			value: "active",
			label: `${o.vb.t("Épicos")} · ${m(le).length}`
		}, {
			value: "archived",
			label: `${o.vb.t("Arquivados")} · ${m(ue).length}`,
			disabled: m(ue).length === 0
		}]), i = w(() => o.vb.t("Épicos"));
		_t(Re, {
			get items() {
				return m(t);
			},
			get label() {
				return m(i);
			},
			get value() {
				return m(fe);
			},
			onValueChange: Te,
			children: e,
			$$slots: { default: !0 }
		});
	}
	var W = n(Re, 2), ze = d(W, !0), Be = n(W, 2), Ve = (e) => {
		var t = Vg(), n = d(t, !0);
		c(() => U(n, m(O))), B(e, t);
	};
	L(Be, (e) => {
		m(O) && e(Ve);
	}), S(Le), c((e) => {
		A(Le, "aria-label", e), U(ze, m(oe));
	}, [() => o.vb.t("Épicos")]), B(i, Le), t(), y();
}
// svelte/features/pins/model.ts
function Wg(e) {
	let t = e.trim();
	if (!t || t.length > 2e3 || /[\u0000-\u001f\u007f]/.test(t)) return null;
	try {
		let e = new URL(/^[a-z]+:\/\//i.test(t) ? t : `https://${t}`);
		return e.protocol === "http:" || e.protocol === "https:" ? e.href : null;
	} catch {
		return null;
	}
}
function Gg(e) {
	let t = /^(?:((?:[a-f0-9]{12}|room))\/)?([\w.-]{1,100})$/.exec(e);
	return t ? {
		connectionId: t[1] ?? "room",
		tool: t[2]
	} : null;
}
function Kg(e, t) {
	if (e.kind === "link") {
		let t = Wg(e.ref);
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
		let n = Gg(e.ref), r = n?.connectionId === "room" && t.filesAll && !t.files?.some((e) => e.name === `apps/${n.tool}.html`);
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
var qg = () => ({
	url: "",
	title: ""
});
function Jg(e) {
	return {
		roomId: e,
		active: !0,
		pins: [],
		filesRequested: !1,
		sequence: 0,
		state: v({
			adding: !1,
			draft: qg(),
			pending: null,
			issue: null,
			filesPending: !1,
			fileIssue: null
		})
	};
}
function Yg(e) {
	e && (e.active = !1, e.sequence++);
}
function Xg(e) {
	e.active && e.state.update((e) => ({
		...e,
		adding: !0,
		issue: null
	}));
}
function Zg(e, t) {
	e.active && e.state.update((e) => ({
		...e,
		draft: {
			...e.draft,
			...t
		},
		issue: null
	}));
}
function Qg(e) {
	e.active && e.state.update((e) => ({
		...e,
		adding: !1,
		issue: null
	}));
}
function $g(e, t) {
	return e.url === t.url && e.title === t.title;
}
function e_(e, t, n) {
	return n.some((n) => n.kind === "link" && n.ref === e && (!t || n.title === t));
}
function t_(e, t) {
	let n = e;
	n?.active && n.roomId === t.id || (Yg(n), n = Jg(t.id)), n.pins = t.pins ?? [];
	let r = T(n.state), i = t.pins?.some((e) => e.kind === "file" && !t.files?.some((t) => t.id === e.ref));
	return (t.filesAll || !i) && (r.filesPending || r.fileIssue) && (r = {
		...r,
		filesPending: !1,
		fileIssue: null
	}, n.state.set(r)), n;
}
async function n_(e, t, n, r, i) {
	if (!e.active || e.roomId !== t || T(e.state).pending) return;
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
	let o = () => e.active && e.sequence === a && T(e.state).pending?.sequence === a, s;
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
	let c = T(e.state);
	if (s.ok) {
		let t = r.t === "pin.add" && i && $g(c.draft, i);
		e.state.set({
			...c,
			pending: null,
			issue: null,
			...t ? {
				adding: !1,
				draft: qg()
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
async function r_(e, t, n) {
	if (!e.active || e.roomId !== t || T(e.state).pending) return;
	let r = T(e.state);
	if (!r.adding) return;
	let i = Wg(r.draft.url);
	if (!i) {
		e.state.update((e) => ({
			...e,
			issue: { kind: "invalid-link" }
		}));
		return;
	}
	let a = r.draft.title.trim().slice(0, 80);
	if (e_(i, a, e.pins)) e.state.set({
		...r,
		adding: !1,
		draft: qg(),
		issue: { kind: "already-pinned" }
	});
	else return n_(e, t, n, {
		t: "pin.add",
		kind: "link",
		ref: i,
		title: a
	}, { ...r.draft });
}
async function i_(e, t, n, r) {
	if (e.pins.some((e) => e.id === n)) return n_(e, t, r, {
		t: "pin.del",
		id: n
	});
}
function a_(e, t, n, r = !1) {
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
var o_ = z("<form class=\"tw:space-y-3 tw:rounded-surface tw:border tw:border-border tw:bg-card tw:p-3\"><div class=\"tw:space-y-1\"><!> <!></div> <div class=\"tw:space-y-1\"><!> <!></div> <div class=\"tw:flex tw:flex-wrap tw:justify-end tw:gap-2\"><!> <!></div></form>"), s_ = z("<p role=\"status\" class=\"tw:m-0 tw:font-sans tw:text-xs tw:leading-5 tw:text-muted-foreground\"> </p>"), c_ = z("<a target=\"_blank\" rel=\"noopener noreferrer\" class=\"tw:flex tw:min-w-0 tw:flex-1 tw:items-center tw:gap-2 tw:rounded-control tw:px-2 tw:py-2 tw:font-sans tw:text-sm tw:text-foreground tw:no-underline tw:hover:bg-accent tw:focus-visible:outline-none tw:focus-visible:ring-2 tw:focus-visible:ring-ring\"><!><span class=\"tw:min-w-0\"><span class=\"tw:block tw:truncate\"> </span><span class=\"tw:block tw:truncate tw:text-xs tw:text-muted-foreground\"> </span></span></a>"), l_ = z("<!><span class=\"tw:min-w-0\"><span class=\"tw:block tw:truncate\"> </span><span class=\"tw:block tw:truncate tw:text-xs tw:font-normal tw:text-muted-foreground\"> </span></span>", 1), u_ = z("<div class=\"tw:flex tw:min-w-0 tw:flex-1 tw:items-start tw:gap-2 tw:px-2 tw:py-2 tw:font-sans tw:text-sm tw:text-muted-foreground\"><!><span class=\"tw:min-w-0\"><span class=\"tw:block tw:truncate\"> </span><span class=\"tw:block tw:text-xs\"> </span></span></div>"), d_ = z("<li class=\"tw:flex tw:items-start tw:gap-1\"><!> <!></li>"), f_ = z("<ul class=\"tw:m-0 tw:list-none tw:space-y-1 tw:p-0\"></ul>"), p_ = z("<!> ", 1), m_ = z("<section class=\"tw:space-y-2 tw:border-t tw:border-border tw:bg-sidebar tw:px-3 tw:py-3 tw:font-sans tw:text-sm tw:text-sidebar-foreground\" data-native-pins=\"\" data-vb-native=\"\"><div class=\"tw:flex tw:items-center tw:justify-between tw:gap-2\"><h2 class=\"tw:m-0 tw:font-sans tw:text-xs tw:font-semibold tw:uppercase tw:tracking-wide tw:text-muted-foreground\"> </h2> <!></div> <!> <!> <!> <!> <!> <!></section>");
function h_(i, o) {
	D(o, !0);
	let l = () => ye(m(T), "$pinState", u), [u, p] = xe(), h = !1;
	de(() => {
		h = !0;
	});
	function v() {
		return !h && o.session.active && o.session.roomId === o.room.id;
	}
	function y(e) {
		v() && Zg(o.session, e);
	}
	function b(e) {
		v() && e.key === "Escape" && (e.preventDefault(), e.stopPropagation(), re());
	}
	function x() {
		v() && a_(o.session, o.room, o.send, !0);
	}
	function C(e) {
		v() && i_(o.session, o.room.id, e, o.request);
	}
	let T = w(() => o.session.state), E = w(() => (o.room.pins ?? []).map((e) => ({
		pin: e,
		target: Kg(e, o.room)
	}))), O = w(() => m(E).some((e) => e.target.kind === "file-unloaded")), k = e(null), j = e(null), M = w(() => o.session.active && o.session.roomId === o.room.id), N = e(null), ee = e(null), P = w(() => `pin-url-${o.room.id}`), F = (e) => o.t({
		"invalid-link": "Use um link http ou https válido.",
		offline: "Sem conexão. Seu rascunho foi mantido.",
		"send-failed": "Não deu pra enviar agora. Tente de novo.",
		unconfirmed: "Ainda não recebi confirmação. Confira os fixados antes de tentar de novo.",
		"already-pinned": "Este link já está nos fixados.",
		rejected: "Não deu pra atualizar os fixados. Tente de novo."
	}[e.kind]);
	_(() => {
		if (h || !m(k)) return;
		if (m(j) !== o.session || !o.session.active || o.session.roomId !== o.room.id) {
			f(k, null), f(j, null);
			return;
		}
		let e = o.room.pins?.find((e) => e.id === m(k) && e.kind === "file");
		if (!e) {
			f(k, null), f(j, null);
			return;
		}
		let t = Kg(e, o.room);
		t.kind === "file" ? (f(k, null), f(j, null), o.onopenfile(t.file)) : o.room.filesAll && (f(k, null), f(j, null));
	});
	async function ne() {
		if (!v()) return;
		let e = o.session;
		Xg(e), await g(), !h && o.session === e && e.active && e.roomId === o.room.id && m(N)?.isConnected && m(N).focus();
	}
	async function re() {
		if (!v()) return;
		let e = o.session;
		Qg(e), await g(), !h && o.session === e && e.active && e.roomId === o.room.id && m(ee)?.isConnected && m(ee).focus();
	}
	function ie(e) {
		e.preventDefault(), v() && r_(o.session, o.room.id, o.request);
	}
	function ae(e) {
		if (!v()) return;
		let t = o.room.pins?.find((t) => t.id === e);
		if (!t) return;
		let n = Kg(t, o.room);
		n.kind === "file" && o.onopenfile(n.file), n.kind === "app" && o.onopenapp(n.app), n.kind === "file-unloaded" && (f(j, o.session), f(k, e, !0), a_(o.session, o.room, o.send, !l().filesPending));
	}
	var z = m_(), oe = s(z), ce = s(oe), le = d(ce, !0), ue = n(ce, 2), fe = (e) => {
		{
			let t = w(() => o.t("Fixar um link")), n = w(() => !m(M));
			mt(e, {
				get label() {
					return m(t);
				},
				icon: "plus",
				get disabled() {
					return m(n);
				},
				onclick: ne,
				get ref() {
					return m(ee);
				},
				set ref(e) {
					f(ee, e, !0);
				}
			});
		}
	};
	L(ue, (e) => {
		l().adding || e(fe);
	}), S(oe);
	var pe = n(oe, 2), me = (e) => {
		var t = o_(), i = s(t), a = s(i);
		be(a, {
			get for() {
				return m(P);
			},
			children: (e, t) => {
				r();
				var n = I();
				c((e) => U(n, e), [() => o.t("Link pra fixar")]), B(e, n);
			},
			$$slots: { default: !0 }
		});
		var u = n(a, 2);
		{
			let e = w(() => o.t("Cole um link (site, repo, painel…)")), t = w(() => !m(M)), n = w(() => l().issue?.kind === "invalid-link" || void 0);
			Ce(u, {
				get id() {
					return m(P);
				},
				name: "url",
				get value() {
					return l().draft.url;
				},
				onkeydown: b,
				oninput: (e) => y({ url: e.currentTarget.value }),
				required: !0,
				maxlength: 2e3,
				autocomplete: "url",
				get placeholder() {
					return m(e);
				},
				get disabled() {
					return m(t);
				},
				get "aria-invalid"() {
					return m(n);
				},
				get ref() {
					return m(N);
				},
				set ref(e) {
					f(N, e, !0);
				}
			});
		}
		S(i);
		var d = n(i, 2), p = s(d);
		{
			let e = w(() => `${m(P)}-title`);
			be(p, {
				get for() {
					return m(e);
				},
				children: (e, t) => {
					r();
					var n = I();
					c((e) => U(n, e), [() => o.t("Nome (opcional)")]), B(e, n);
				},
				$$slots: { default: !0 }
			});
		}
		var h = n(p, 2);
		{
			let e = w(() => `${m(P)}-title`), t = w(() => !m(M));
			Ce(h, {
				get id() {
					return m(e);
				},
				name: "title",
				get value() {
					return l().draft.title;
				},
				onkeydown: b,
				oninput: (e) => y({ title: e.currentTarget.value }),
				maxlength: 80,
				get disabled() {
					return m(t);
				}
			});
		}
		S(d);
		var g = n(d, 2), _ = s(g);
		{
			let e = w(() => !m(M));
			V(_, {
				variant: "ghost",
				size: "sm",
				get disabled() {
					return m(e);
				},
				onclick: re,
				onkeydown: b,
				children: (e, t) => {
					r();
					var n = I();
					c((e) => U(n, e), [() => o.t("Cancelar")]), B(e, n);
				},
				$$slots: { default: !0 }
			});
		}
		var v = n(_, 2);
		{
			let e = w(() => !m(M) || !!l().pending);
			V(v, {
				type: "submit",
				size: "sm",
				get disabled() {
					return m(e);
				},
				onkeydown: b,
				children: (e, t) => {
					r();
					var n = I();
					c((e) => U(n, e), [() => o.t("Fixar")]), B(e, n);
				},
				$$slots: { default: !0 }
			});
		}
		S(g), S(t), c((e) => A(t, "aria-label", e), [() => o.t("Fixar um link")]), se("submit", t, ie), B(e, t);
	};
	L(pe, (e) => {
		l().adding && e(me);
	});
	var he = n(pe, 2), ge = (e) => {
		var t = s_(), n = d(t, !0);
		c((e) => U(n, e), [() => o.t("Aguardando confirmação…")]), B(e, t);
	};
	L(he, (e) => {
		l().pending && e(ge);
	});
	var _e = n(he, 2), ve = (e) => {
		var t = s_(), n = d(t, !0);
		c((e) => U(n, e), [() => F(l().issue)]), B(e, t);
	}, Se = (e) => {
		{
			let t = w(() => F(l().issue));
			ft(e, {
				compact: !0,
				get title() {
					return m(t);
				},
				get description() {
					return l().issue.detail;
				}
			});
		}
	};
	L(_e, (e) => {
		l().issue?.kind === "already-pinned" ? e(ve) : l().issue && e(Se, 1);
	});
	var we = n(_e, 2), Te = (e) => {
		{
			let t = w(() => F({ kind: l().fileIssue }));
			ft(e, {
				compact: !0,
				get title() {
					return m(t);
				}
			});
		}
	};
	L(we, (e) => {
		l().fileIssue && e(Te);
	});
	var H = n(we, 2), Ee = (e) => {
		{
			let t = w(() => !m(M));
			V(e, {
				variant: "ghost",
				size: "sm",
				get disabled() {
					return m(t);
				},
				onclick: x,
				children: (e, t) => {
					r();
					var n = I();
					c((e) => U(n, e), [() => o.t("Tentar carregar novamente")]), B(e, n);
				},
				$$slots: { default: !0 }
			});
		}
	};
	L(H, (e) => {
		m(O) && (l().filesPending || l().fileIssue) && e(Ee);
	});
	var De = n(H, 2), Oe = (e) => {
		var t = f_();
		R(t, 21, () => m(E), ({ pin: e, target: t }) => e.id, (e, t) => {
			let r = () => m(t).pin, i = () => m(t).target;
			var u = d_(), f = s(u), p = (e) => {
				var t = c_(), r = s(t);
				Dt(r, { name: "chevronRight" });
				var a = n(r), o = s(a), l = d(o, !0), u = n(o), f = d(u, !0);
				S(a), S(t), c(() => {
					A(t, "href", i().href), A(t, "title", i().href), U(l, i().label), U(f, i().detail);
				}), te("click", t, (e) => {
					v() || e.preventDefault();
				}), B(e, t);
			}, h = (e) => {
				{
					let t = w(() => !m(M));
					V(e, {
						variant: "ghost",
						class: "tw:h-auto tw:min-w-0 tw:flex-1 tw:justify-start tw:whitespace-normal tw:px-2 tw:py-2 tw:text-left",
						get disabled() {
							return m(t);
						},
						onclick: () => ae(r().id),
						children: (e, t) => {
							var r = l_(), u = a(r);
							Dt(u, { name: "chevronRight" });
							var f = n(u), p = s(f), m = d(p, !0), h = n(p), g = d(h, !0);
							S(f), c((e) => {
								U(m, i().label), U(g, e);
							}, [() => i().kind === "file-unloaded" ? o.t(l().filesPending ? "Carregando arquivo…" : "Carregar arquivo") : o.t(i().detail)]), B(e, r);
						},
						$$slots: { default: !0 }
					});
				}
			}, g = (e) => {
				var t = u_(), r = s(t);
				Dt(r, {
					name: "warning",
					class: "tw:mt-0.5"
				});
				var a = n(r), l = s(a), u = d(l, !0), f = n(l), p = d(f, !0);
				S(a), S(t), c((e) => {
					U(u, i().label), U(p, e);
				}, [() => o.t(i().reason)]), B(e, t);
			};
			L(f, (e) => {
				i().kind === "link" ? e(p) : i().kind === "file" || i().kind === "app" || i().kind === "file-unloaded" ? e(h, 1) : e(g, -1);
			});
			var _ = n(f, 2);
			{
				let e = w(() => o.t("Desafixar {name}", { name: i().label })), t = w(() => !m(M) || !!l().pending);
				mt(_, {
					icon: "close",
					get label() {
						return m(e);
					},
					get disabled() {
						return m(t);
					},
					onclick: () => C(r().id)
				});
			}
			S(u), c(() => A(u, "data-pin-id", r().id)), B(e, u);
		}), S(t), B(e, t);
	}, ke = (e) => {
		{
			let t = w(() => !m(M));
			V(e, {
				variant: "ghost",
				class: "tw:w-full tw:justify-start tw:whitespace-normal tw:text-left tw:text-muted-foreground",
				get disabled() {
					return m(t);
				},
				onclick: ne,
				children: (e, t) => {
					var r = p_(), i = a(r);
					Dt(i, { name: "plus" });
					var s = n(i, 1, !0);
					c((e) => U(s, e), [() => o.t("Fixar site, repo ou app")]), B(e, r);
				},
				$$slots: { default: !0 }
			});
		}
	};
	L(De, (e) => {
		m(E).length ? e(Oe) : l().adding || e(ke, 1);
	}), S(z), c((e) => {
		A(z, "aria-labelledby", `pins-title-${o.room.id}`), A(ce, "id", `pins-title-${o.room.id}`), U(le, e);
	}, [() => o.t("Fixados")]), B(i, z), t(), p();
}
Se(["click"]);
// svelte/features/room-sidebar/RoomMark.svelte
var g_ = z("<img alt=\"\" class=\"tw:size-full tw:object-cover\"/>"), __ = z("<span aria-hidden=\"true\"><!></span>");
function v_(n, r) {
	D(r, !0);
	let i = e(!1);
	_(() => {
		r.src, f(i, !1);
	});
	let a = w(() => r.tint === "blue" || r.tint === "green" || r.tint === "yellow" || r.tint === "orange" || r.tint === "pink" || r.tint === "purple" ? Cd[r.tint] : Cd.none);
	var o = __(), l = s(o), u = (e) => {
		var t = g_();
		c(() => A(t, "src", r.src)), se("error", t, () => {
			f(i, !0);
		}), ce(t), B(e, t);
	}, d = (e) => {
		var t = I();
		c((e) => U(t, e), [() => md(r.title)]), B(e, t);
	};
	L(l, (e) => {
		r.src && !m(i) ? e(u) : e(d, -1);
	}), S(o), c(() => M(o, 1, j(["tw:inline-grid tw:size-8 tw:shrink-0 tw:place-items-center tw:overflow-hidden tw:rounded-control tw:border tw:border-border tw:font-sans tw:text-xs tw:font-semibold tw:tracking-normal", m(a)]))), B(n, o), t();
}
// svelte/features/chat/model.ts
function y_(e, t) {
	for (let n = e.length - 1; n >= 0; n--) if (t(e[n])) return e[n];
}
var b_ = (e) => e.replace(/^claude-(opus|sonnet|haiku|fable)-(\d+)-(\d+)(?:-\d{8})?$/i, (e, t, n, r) => `Claude ${t[0].toUpperCase()}${t.slice(1)} ${n}.${r}`);
function x_(e) {
	return /codex|gpt|openai|\bo[1-9]\b/i.test(e || "") ? "◎" : /gemini/i.test(e || "") ? "✦" : /cursor/i.test(e || "") ? "▲" : /copilot/i.test(e || "") ? "◉" : "✻";
}
var S_ = (e, t) => !!e && e.author === t.author && (e.kind || null) === (t.kind || null) && (e.tag || null) === (t.tag || null) && t.ts - e.ts < 3e5 && !e.poll && !t.poll, C_ = (e) => e.author === "ai" && (e.tag === "notice" || e.tag === "done" || /^↩ (Reabri|I reopened)/.test(e.text)), w_ = (e) => e.tag === "reminder" ? "reminder" : e.tag === "issue" ? "issue" : C_(e) ? "notice" : "regular", T_ = (e) => e?.tag === "reminder" ? e.text.split("\n")[0] : e?.tag === "issue" ? "⚠issue" : null;
function E_(e) {
	let t = [];
	for (let n of e) {
		let e = T_(n), r = t.at(-1);
		e && r && T_(r) === e ? t[t.length - 1] = {
			...n,
			runs: [...r.runs || [r.ts], n.ts],
			group: [...r.group || [r], n]
		} : t.push(n);
	}
	return t;
}
var D_ = (e) => (e.text || e.files?.map((e) => e.name).join(", ") || (e.poll ? "votação" : "")).replace(/\*\*|`|^[#>]+ ?/gm, "").replace(/\s+/g, " ").trim().slice(0, 120);
function O_(e) {
	let [t, ...n] = e.text.split("\n\n"), r = t.replace(/^⏰\s*/, ""), i = r.match(/^\*\*(.+?)\*\*\s*(.*)$/);
	return {
		name: i?.[1],
		head: i?.[2] ?? r,
		body: n.join("\n\n"),
		runs: e.runs || [e.ts]
	};
}
function k_(e) {
	let [t, ...n] = e.text.split("\n\n");
	return {
		head: t.replace(/^⚠\s*/, ""),
		body: n.join("\n\n")
	};
}
function A_(e, t, n) {
	let r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Set(), a = (e) => {
		let t = r.get(e);
		return t || (t = {
			statuses: [],
			readers: []
		}, r.set(e, t)), t;
	}, o = /* @__PURE__ */ new Set();
	for (let t of [...e.acks || []].sort((e, t) => t.ts - e.ts)) {
		let r = `${t.msg_id}|${t.who}|${t.email}`;
		if (o.has(r) || (o.add(r), t.status === "dismissed")) continue;
		i.add(r);
		let s = [...new Set(e.epics.filter((e) => e.from_msg === t.msg_id && !e.archived).flatMap((e) => e.tasks.filter((e) => e.status !== "done" && e.owner).map((e) => e.owner)))], c = t.status === "blocked" ? "blocked" : t.status === "doing" && n - t.ts < 12e5 ? "doing" : t.status === "done" ? "done" : s.length ? "waiting" : "idle";
		a(t.msg_id).statuses.push({
			ack: t,
			kind: c,
			owners: s
		});
	}
	let s = e.messages.filter((e) => e.thread === t), c = /* @__PURE__ */ new Map();
	for (let t of e.receipts || []) {
		let e = `${t.who}|${t.email}`, n = c.get(e);
		c.set(e, n ? {
			...t,
			read: Math.max(n.read, t.read),
			delivered: Math.max(n.delivered, t.delivered)
		} : t);
	}
	for (let e of c.values()) {
		let t = y_(s, (t) => t.id <= Math.max(e.read, e.delivered) && (t.kind !== "agent" || t.author !== e.email));
		t && !i.has(`${t.id}|${e.who}|${e.email}`) && a(t.id).readers.push({
			receipt: e,
			read: e.read >= t.id
		});
	}
	for (let e of r.values()) e.readers.sort((e, t) => Number(t.read) - Number(e.read));
	return r;
}
function j_(e, t, n) {
	if (t.startsWith("pre:")) return [];
	let r = e.epics.find((e) => e.id === t);
	if (r?.archived) return [];
	let i = [...e.messages, ...(e.origins || []).filter((t) => !e.messages.some((e) => e.id === t.id))], a = new Set(e.epics.filter((e) => e.id !== r?.id).map((e) => e.from_msg)), o = new Set(i.filter((e) => e.thread === t && !a.has(e.id)).map((e) => e.id));
	r?.from_msg && o.add(r.from_msg);
	let s = /* @__PURE__ */ new Set(), c = [...e.acks || []].filter((e) => o.has(e.msg_id)).sort((e, t) => t.ts - e.ts).filter((e) => {
		let t = `${e.msg_id}|${e.who}|${e.email}`;
		return !s.has(t) && (s.add(t), !0);
	}), l = c.filter((e) => e.status !== "dismissed"), u = /* @__PURE__ */ new Set(), d = [];
	for (let e of l) {
		let t = `${e.who}|${e.email}`;
		e.status === "doing" && n - e.ts < 12e5 && !u.has(t) && l.find((t) => t.msg_id === e.msg_id && t.who === e.who && t.email === e.email) === e && (u.add(t), d.push({
			who: e.who,
			email: e.email
		}));
	}
	if (d.length || !r) return d;
	let f = l.find((e) => e.status === "doing" && n - e.ts < 12e5);
	if (f) return [{
		who: f.who,
		email: f.email
	}];
	if (c[0]?.status === "done" || c[0]?.status === "dismissed") return [];
	let p = y_(e.messages, (e) => e.thread === t && e.kind === "agent");
	return p && p.tag !== "done" && n - p.ts < 18e4 ? [{
		who: p.via || "Agent",
		email: p.author
	}] : [];
}
// shared/suggestions.ts
var M_ = (e) => JSON.stringify([
	e.title,
	e.why ?? null,
	e.tasks
]), N_ = (e) => JSON.stringify(e);
function P_(e, t) {
	if (/^pre:\d+$/.test(t)) return e.suggestions[Number(t.slice(4))];
}
function F_(e, t) {
	let n = e.messages.filter((e) => e.thread === t);
	return e.counts ? (e.counts[t] ?? 0) + n.filter((t) => t.id > (e.countsAt ?? 0)).length : n.length;
}
function I_(e, t) {
	let n = [t], r = /* @__PURE__ */ new Map();
	for (let t of e.epics) t.parent && r.set(t.parent, [...r.get(t.parent) ?? [], t.id]);
	for (let e = 0; e < n.length && n.length < 60; e++) for (let t of r.get(n[e]) ?? []) n.includes(t) || n.push(t);
	let i = /* @__PURE__ */ new Map();
	for (let t = e.messages.length - 1; t >= 0; t--) {
		let r = e.messages[t];
		if (n.includes(r.thread)) for (let e of r.files ?? []) {
			let t = i.get(e.name);
			t ? t.seen.add(e.id) : i.set(e.name, {
				file: {
					id: e.id,
					name: e.name,
					type: e.type,
					n: 1
				},
				seen: /* @__PURE__ */ new Set([e.id]),
				count: 0
			});
		}
	}
	for (let t of n) for (let n of e.epics.find((e) => e.id === t)?.files ?? []) {
		let e = i.get(n.name);
		e ? e.count = Math.max(e.count, n.n, e.seen.size) : i.set(n.name, {
			file: n,
			seen: /* @__PURE__ */ new Set([n.id]),
			count: n.n
		});
	}
	return [...i.values()].map(({ file: e, seen: t, count: n }) => ({
		...e,
		n: Math.max(n, t.size)
	}));
}
function L_(e, t) {
	let n = /* @__PURE__ */ new Set();
	return e.agents.filter((e) => e.email === t).sort((e, t) => Number(t.listening) - Number(e.listening)).filter((e) => {
		let t = b_(e.who) + e.repo;
		return !n.has(t) && (n.add(t), !0);
	}).slice(0, 3);
}
function R_(e, t) {
	return Number.isFinite(e) && Number.isFinite(t) && t > 0 ? Math.max(0, Math.min(100, Math.round(e / t * 100))) : 0;
}
function z_(e, t) {
	let n = e.state === "running" ? Math.max(0, t - (e.checked_at ?? t)) / 1e3 : 0, r = ((e.run_s ?? 0) + n) / 3600 * (e.rate ?? 0) + Math.max(0, t - (e.created_at ?? t)) / 36e5 * (e.disk_rate ?? 0);
	return Number.isFinite(r) ? r : 0;
}
// svelte/features/room-sidebar/MutationStatus.svelte
var B_ = z("<p role=\"status\" class=\"tw:m-0 tw:text-xs tw:text-muted-foreground\"> </p>"), V_ = z("<p role=\"alert\" class=\"tw:m-0 tw:text-sm tw:text-destructive\"> </p>"), H_ = z("<div role=\"status\" class=\"tw:space-y-2 tw:text-sm tw:text-muted-foreground\"><p class=\"tw:m-0\"> </p> <!></div>"), U_ = z("<!> <!> <!>", 1);
function W_(e, i) {
	D(i, !0);
	let o = () => ye(f, "$status", l), [l, u] = xe(), f = b(() => i.owner.state);
	var p = U_(), m = a(p), h = (e) => {
		var t = B_(), n = d(t, !0);
		c((e) => U(n, e), [() => i.t("Aguardando confirmação…")]), B(e, t);
	};
	L(m, (e) => {
		o().phase === "pending" && e(h);
	});
	var g = n(m, 2), _ = (e) => {
		var t = V_(), n = d(t);
		c((e) => U(n, `${e ?? ""}
    ${o().error ?? ""}`), [() => i.t("Não deu pra enviar agora. Tente de novo.")]), B(e, t);
	};
	L(g, (e) => {
		o().phase === "error" && e(_);
	});
	var v = n(g, 2), y = (e) => {
		var t = H_(), a = s(t), o = d(a, !0), l = n(a, 2);
		V(l, {
			variant: "outline",
			size: "sm",
			onclick: (e) => {
				e.currentTarget.isConnected && i.owner.review();
			},
			children: (e, t) => {
				r();
				var n = I();
				c((e) => U(n, e), [() => i.t("Conferi a sala")]), B(e, n);
			},
			$$slots: { default: !0 }
		}), S(t), c((e) => U(o, e), [() => i.t("Ainda sem confirmação. Confira a sala antes de enviar novamente.")]), B(e, t);
	};
	L(v, (e) => {
		o().phase === "unconfirmed" && e(y);
	}), B(e, p), t(), u();
}
// svelte/features/room-sidebar/ThreadHeader.svelte
var G_ = z("<span class=\"tw:text-xs tw:text-muted-foreground\"> </span>"), K_ = z("<!> <!> <!>", 1), q_ = z(" <!>", 1), J_ = z("<form class=\"tw:space-y-3\"><!><!></form>"), Y_ = z("<div data-vb-native=\"\" data-native-thread-header=\"\" class=\"tw:flex tw:min-w-0 tw:flex-1 tw:flex-wrap tw:items-center tw:gap-2 tw:font-sans tw:text-sm tw:tracking-normal tw:[font-variation-settings:normal] tw:text-foreground\"><!> <!> <!> <!> <!> <!></div> <!> <!>", 1);
function X_(i, o) {
	D(o, !0);
	let l = () => ye(h, "$status", u), [u, p] = xe(), h = b(() => o.owner.state), g = w(() => o.room.epics.find((e) => e.id === o.thread)), v = w(() => P_(o.room, o.thread)), y = w(() => m(v)?.title ?? m(g)?.title ?? o.room.book.title), x = w(() => l().phase === "pending" || l().phase === "unconfirmed"), C = e(!1), T = e(!1), E = e(""), O = e(""), k = e(""), A = !0;
	_(() => {
		m(k) && (!m(g) || m(g).id !== m(k) || (m(C) ? JSON.stringify([m(g).id, m(g).title]) : N_(m(g))) !== m(O)) && (f(C, !1), f(T, !1), f(k, ""));
	});
	function j(e) {
		A && !m(x) && m(g) && (f(k, m(g).id, !0), f(O, e === "rename" ? JSON.stringify([m(g).id, m(g).title]) : N_(m(g)), !0), f(E, m(g).title, !0), f(C, e === "rename"), f(T, e === "delete"));
	}
	function M() {
		return A && !!m(g) && m(g).id === m(k) && (m(C) ? JSON.stringify([m(g).id, m(g).title]) : N_(m(g))) === m(O) && o.room.members.includes(o.room.me);
	}
	async function N(e) {
		if (e.preventDefault(), !m(C) || !M() || m(x) || !m(E).trim()) return;
		let t = m(k);
		await o.owner.run({
			t: "epic.rename",
			id: m(k),
			title: m(E)
		}) && A && m(k) === t && f(C, !1);
	}
	async function ee() {
		if (!m(T) || !M() || m(x)) return;
		let e = m(k);
		await o.owner.run({
			t: "epic.del",
			id: m(k)
		}) && A && m(k) === e && f(T, !1);
	}
	de(() => {
		A = !1;
	});
	var P = Y_(), F = a(P), te = s(F), ne = (e) => {
		v_(e, {
			get title() {
				return m(y);
			},
			get src() {
				return o.roomIcon;
			},
			get tint() {
				return o.roomTint;
			}
		});
	}, re = (e) => {
		{
			let t = w(() => m(g)?.owner ? o.vb.avatarUrl?.(m(g).owner) : void 0);
			ut(e, {
				get name() {
					return m(y);
				},
				get src() {
					return m(t);
				}
			});
		}
	};
	L(te, (e) => {
		!m(g) && !m(v) ? e(ne) : e(re, -1);
	});
	var R = n(te, 2);
	St(R, {
		level: 2,
		class: "tw:min-w-0 tw:flex-1",
		children: (e, t) => {
			{
				let t = w(() => o.room.book.summary || m(y));
				V(e, {
					get id() {
						return o.titleId;
					},
					variant: "ghost",
					class: "tw:min-w-0 tw:flex-1 tw:justify-start tw:truncate tw:font-semibold tw:md:flex-none",
					get title() {
						return m(t);
					},
					onclick: (e) => {
						e.currentTarget.isConnected && (matchMedia("(max-width: 900px)").matches ? o.onopenside() : m(v) || (m(g) ? j("rename") : o.onrenameroom()));
					},
					children: (e, t) => {
						r();
						var n = I();
						c(() => U(n, m(y))), B(e, n);
					},
					$$slots: { default: !0 }
				});
			}
		},
		$$slots: { default: !0 }
	});
	var ie = n(R, 2);
	{
		let e = w(() => o.vb.t("Trocar de conversa"));
		mt(ie, {
			icon: "chevronDown",
			get label() {
				return m(e);
			},
			onclick: (e) => {
				e.currentTarget.isConnected && o.onopenside();
			}
		});
	}
	var ae = n(ie, 2), z = (e) => {
		var t = G_(), n = d(t);
		c((e) => U(n, `✦ ${e ?? ""}`), [() => o.vb.t("sugestão do @vibe")]), B(e, t);
	}, oe = (e) => {
		var t = G_(), n = d(t, !0);
		c(() => U(n, o.room.book.folder)), B(e, t);
	};
	L(ae, (e) => {
		m(v) ? e(z) : o.room.book.folder && !m(g) && e(oe, 1);
	});
	var ce = n(ae, 2), le = (e) => {
		var t = K_(), r = a(t);
		{
			let e = w(() => o.vb.t("Renomear"));
			mt(r, {
				icon: "pencil",
				get disabled() {
					return m(x);
				},
				get label() {
					return m(e);
				},
				onclick: () => j("rename")
			});
		}
		var i = n(r, 2);
		{
			let e = w(() => m(g).archived ? "undo" : "check"), t = w(() => o.vb.t(m(g).archived ? "Desarquivar épico" : "Arquivar épico"));
			mt(i, {
				get icon() {
					return m(e);
				},
				get disabled() {
					return m(x);
				},
				get label() {
					return m(t);
				},
				onclick: (e) => {
					A && e.currentTarget.isConnected && m(g) && o.owner.run({
						t: "epic.archive",
						id: m(g).id,
						archived: !m(g).archived
					});
				}
			});
		}
		var s = n(i, 2);
		{
			let e = w(() => o.vb.t("Apagar épico"));
			mt(s, {
				icon: "trash",
				get disabled() {
					return m(x);
				},
				get label() {
					return m(e);
				},
				onclick: () => j("delete")
			});
		}
		B(e, t);
	};
	L(ce, (e) => {
		m(g) && e(le);
	}), W_(n(ce, 2), {
		get owner() {
			return o.owner;
		},
		get t() {
			return o.vb.t;
		}
	}), S(F);
	var ue = n(F, 2);
	{
		let e = w(() => o.vb.t("Nome do épico:")), t = w(() => o.vb.t("Cancelar"));
		Ot(ue, {
			get title() {
				return m(e);
			},
			get closeLabel() {
				return m(t);
			},
			get open() {
				return m(C);
			},
			set open(e) {
				f(C, e, !0);
			},
			children: (e, t) => {
				var i = J_(), l = s(i);
				be(l, {
					children: (e, t) => {
						r();
						var i = q_(), s = a(i, !0), l = n(s);
						Ce(l, {
							maxlength: 200,
							get disabled() {
								return m(x);
							},
							required: !0,
							get value() {
								return m(E);
							},
							set value(e) {
								f(E, e, !0);
							}
						}), c((e) => U(s, e), [() => o.vb.t("Nome do épico:")]), B(e, i);
					},
					$$slots: { default: !0 }
				});
				var u = n(l);
				{
					let e = w(() => m(x) || !m(E).trim());
					V(u, {
						type: "submit",
						get disabled() {
							return m(e);
						},
						children: (e, t) => {
							r();
							var n = I();
							c((e) => U(n, e), [() => o.vb.t("Salvar")]), B(e, n);
						},
						$$slots: { default: !0 }
					});
				}
				S(i), se("submit", i, N), B(e, i);
			},
			$$slots: { default: !0 }
		});
	}
	var fe = n(ue, 2);
	{
		let e = w(() => o.vb.t("Apagar épico")), t = w(() => o.vb.t("Apagar o épico \"{title}\", as tasks e a discussão dele? Não dá pra desfazer.", { title: m(g)?.title ?? "" })), n = w(() => o.vb.t("Apagar")), r = w(() => o.vb.t("Cancelar")), i = w(() => l().phase === "pending"), a = w(() => m(x) || !M());
		Qm(fe, {
			get title() {
				return m(e);
			},
			get description() {
				return m(t);
			},
			get confirmLabel() {
				return m(n);
			},
			get cancelLabel() {
				return m(r);
			},
			get busy() {
				return m(i);
			},
			get confirmDisabled() {
				return m(a);
			},
			onconfirm: ee,
			get open() {
				return m(T);
			},
			set open(e) {
				f(T, e, !0);
			}
		});
	}
	B(i, P), t(), p();
}
// svelte/features/room-sidebar/AgentPresenceRows.svelte
var Z_ = z("<p class=\"tw:m-0\"> </p> <!>", 1), Q_ = z("<details class=\"tw:space-y-1\"><summary class=\"tw:cursor-pointer tw:rounded-control tw:focus-visible:outline-2 tw:focus-visible:outline-ring\"> </summary> <!> <!></details>"), $_ = z("<div data-agent-presence=\"\" class=\"tw:ml-5 tw:space-y-1 tw:rounded-control tw:px-2 tw:py-1 tw:text-xs tw:text-muted-foreground\"><div class=\"tw:flex tw:items-center tw:gap-2\"><span aria-hidden=\"true\"> </span><span class=\"tw:min-w-0 tw:flex-1 tw:truncate\"> </span><span> </span></div> <!></div>");
function ev(e, r) {
	D(r, !0);
	let i = H(r, "locale", 3, "pt-BR"), o = w(() => L_(r.presence, r.email)), l = (e) => e >= 80 ? "tw:[&::-webkit-progress-value]:bg-destructive! tw:[&::-moz-progress-bar]:bg-destructive!" : e >= 60 ? "tw:[&::-webkit-progress-value]:bg-warning! tw:[&::-moz-progress-bar]:bg-warning!" : "tw:[&::-webkit-progress-value]:bg-success! tw:[&::-moz-progress-bar]:bg-success!", u = (e) => e >= 1e6 ? `${+(e / 1e6).toFixed(1)}M` : `${Math.round(e / 1e3)}k`;
	var f = P(), p = a(f);
	R(p, 17, () => m(o), N, (e, t) => {
		var o = $_(), f = s(o), p = s(f), h = d(p, !0), g = n(p), _ = d(g), v = n(g), y = d(v, !0);
		S(f);
		var b = n(f, 2), x = (e) => {
			let o = w(() => m(t).context), f = w(() => R_(m(o).tokens, m(o).window));
			var p = Q_(), h = s(p), g = d(h), _ = n(h, 2);
			{
				let e = w(() => r.t("Contexto")), t = w(() => l(m(f)));
				Vl(_, {
					get value() {
						return m(f);
					},
					get label() {
						return m(e);
					},
					get class() {
						return m(t);
					}
				});
			}
			var v = n(_, 2);
			R(v, 16, () => ["five_hour", "seven_day"], N, (e, t) => {
				let s = w(() => t === "five_hour" ? m(o).limits?.five_hour : m(o).limits?.seven_day);
				var u = P(), f = a(u), p = (e) => {
					var o = Z_(), u = a(o), f = d(u), p = n(u, 2);
					{
						let e = w(() => l(m(s).p)), n = w(() => r.t(t === "five_hour" ? "Sessão de 5h" : "Semana"));
						Vl(p, {
							get value() {
								return m(s).p;
							},
							get class() {
								return m(e);
							},
							get label() {
								return m(n);
							}
						});
					}
					c((e, t, n) => U(f, `${e ?? ""}: ${m(s).p ?? ""}% · ${t ?? ""}
              ${n ?? ""}`), [
						() => r.t(t === "five_hour" ? "Sessão de 5h" : "Semana"),
						() => r.t("reseta"),
						() => (/* @__PURE__ */ new Date(m(s).r * 1e3)).toLocaleString(i())
					]), B(e, o);
				}, h = w(() => m(s) && m(s).r * 1e3 >= Date.now());
				L(f, (e) => {
					m(h) && e(p);
				}), B(e, u);
			}), S(p), c((e, t, n) => U(g, `${e ?? ""}: ${m(f) ?? ""}% · ${t ?? ""}/${n ?? ""}`), [
				() => r.t("Contexto"),
				() => u(m(o).tokens),
				() => u(m(o).window)
			]), B(e, p);
		};
		L(b, (e) => {
			m(t).context && e(x);
		}), S(o), c((e, n, r, i) => {
			A(o, "title", e), M(p, 1, j(m(t).listening ? "tw:text-success" : "tw:text-muted-foreground")), U(h, n), U(_, `${r ?? ""}${m(t).repo ? ` · ${m(t).repo}` : ""}`), U(y, i);
		}, [
			() => r.t("{via} de {who}", {
				via: b_(m(t).who),
				who: r.name(r.email)
			}),
			() => x_(m(t).who),
			() => b_(m(t).who).replace(/^Claude\s+/i, ""),
			() => m(t).listening ? r.t(m(t).all_rooms ? "ouvindo todas as salas agora" : "ouvindo") : m(t).seen_at === null ? "—" : r.ago(m(t).seen_at)
		]), B(e, o);
	}), B(e, f), t();
}
// svelte/features/room-sidebar/SandboxPresenceRows.svelte
var tv = z("<span aria-hidden=\"true\">☁</span><span class=\"tw:min-w-0 tw:flex-1\"><span class=\"tw:block tw:truncate\"> </span><small class=\"tw:block tw:text-xs tw:text-muted-foreground\"> </small></span><span class=\"tw:text-xs tw:text-muted-foreground\"> </span>", 1);
function nv(e, r) {
	D(r, !0);
	let i = H(r, "locale", 3, "pt-BR"), o = {
		running: "rodando",
		stopped: "parado",
		paused: "pausado",
		starting: "ligando",
		pausing: "pausando",
		deleted: "apagado no freestyle",
		unknown: "?",
		creating: "criando",
		error: "erro"
	};
	var l = P(), u = a(l);
	R(u, 17, () => r.presence.sandboxes, (e) => e.id, (e, t) => {
		V(e, {
			variant: "ghost",
			class: "tw:h-auto tw:w-full tw:justify-start tw:gap-2 tw:whitespace-normal tw:text-left",
			onclick: (e) => {
				e.currentTarget.isConnected && r.onopen();
			},
			children: (e, l) => {
				var u = tv(), f = n(a(u)), p = s(f), h = d(p, !0), g = n(p), _ = d(g);
				S(f);
				var v = n(f), y = d(v, !0);
				c((e, t, n, r) => {
					U(h, e), U(_, `${t ?? ""} · ${n ?? ""}`), U(y, r);
				}, [
					() => m(t).name || r.t("sandbox"),
					() => r.name(m(t).email).split(" ")[0],
					() => r.t(o[m(t).state || ""] || m(t).state || "?"),
					() => new Intl.NumberFormat(i(), {
						style: "currency",
						currency: "USD"
					}).format(z_(m(t), Date.now()))
				]), B(e, u);
			},
			$$slots: { default: !0 }
		});
	}), B(e, l), t();
}
// svelte/features/room-sidebar/session.ts
var rv = 1e4;
function iv(e, t, n = {
	schedule: (e, t) => setTimeout(e, t),
	cancel: (e) => clearTimeout(e)
}) {
	let r = v({
		phase: "idle",
		error: ""
	}), i = !0, a, o, s;
	function c() {
		s?.timer !== void 0 && n.cancel(s.timer), s?.resolve(!1), s = void 0;
	}
	let l = (e) => i && s === e;
	function u(e) {
		if (!a) return !1;
		let t = e.command;
		if (t.t === "suggestion") return !!e.suggestion && !a.suggestions.some((t) => M_(t) === M_(e.suggestion));
		if (t.t === "epic") return a.epics.some((n) => !e.baseline.has(n.id) && n.title === t.title.trim().slice(0, 200));
		if (t.t === "epic.order") {
			let e = new Set(t.ids), n = a.epics.filter((t) => e.has(t.id)).map((e) => e.id), r = new Set(n);
			return JSON.stringify(n) === JSON.stringify(t.ids.filter((e) => r.has(e)));
		}
		let n = a.epics.find((e) => e.id === t.id);
		return t.t === "epic.del" ? !n : n ? t.t === "epic.owner" ? (n.owner ?? "") === t.owner : t.t === "epic.rename" ? n.title === t.title.trim().slice(0, 200) : !!n.archived == (t.archived !== !1) : !1;
	}
	function d() {
		let e = s;
		e?.ack && u(e) && (e.timer !== void 0 && n.cancel(e.timer), s = void 0, r.set({
			phase: "idle",
			error: ""
		}), e.resolve(!0));
	}
	function f(e, t) {
		l(e) && (e.timer !== void 0 && n.cancel(e.timer), e.timer = void 0, r.set({
			phase: "unconfirmed",
			error: t
		}));
	}
	return {
		account: e,
		roomId: t,
		state: r,
		sync(n, l) {
			if (!i) return;
			if (n.id !== t || n.me !== e || !n.members.includes(e)) {
				c(), a = void 0, o = void 0, r.set({
					phase: "idle",
					error: ""
				});
				return;
			}
			a = n, o = l;
			let u = s?.command;
			u && "id" in u && u.t !== "epic.del" && !n.epics.some((e) => e.id === u.id) ? (c(), r.set({
				phase: "idle",
				error: ""
			})) : d();
		},
		suggestionIntent() {
			let e = s;
			return e?.command.t === "suggestion" && e.suggestion ? {
				index: e.command.i,
				accept: !!e.command.accept,
				identity: M_(e.suggestion)
			} : null;
		},
		run(e) {
			if (!i || !a || !o || s || e.t === "suggestion" && (!a.suggestions[e.i] || e.expected && M_(e.expected) !== M_(a.suggestions[e.i])) || "id" in e && !a.epics.some((t) => t.id === e.id)) return Promise.resolve(!1);
			let t = o;
			return new Promise((i) => {
				let o = {
					token: Symbol(),
					command: e,
					baseline: new Set(a.epics.map((e) => e.id)),
					suggestion: e.t === "suggestion" ? a.suggestions[e.i] : void 0,
					ack: !1,
					resolve: i
				};
				s = o, r.set({
					phase: "pending",
					error: ""
				}), o.timer = n.schedule(() => f(o, "timeout"), 2e4), Promise.resolve().then(() => l(o) ? e.t === "suggestion" && (!a?.suggestions[e.i] || M_(a.suggestions[e.i]) !== M_(o.suggestion)) ? {
					ok: !1,
					error: "changed"
				} : t(e.t === "suggestion" ? {
					...e,
					expected: o.suggestion
				} : e) : {
					ok: !1,
					error: "offline"
				}).then((e) => {
					l(o) && (e.ok ? (o.ack = !0, o.timer !== void 0 && n.cancel(o.timer), d(), l(o) && (o.timer = n.schedule(() => f(o, "unconfirmed"), rv))) : e.error === "offline" || e.error === "invalid command" || e.error === "changed" || e.error === "suggestion changed" || e.error === "unknown epic" ? (c(), r.set({
						phase: "error",
						error: e.error
					})) : f(o, e.error));
				}, (e) => f(o, e instanceof Error ? e.message : "failed"));
			});
		},
		review() {
			T(r).phase === "unconfirmed" && (c(), r.set({
				phase: "idle",
				error: ""
			}));
		},
		dispose() {
			i = !1, c(), a = void 0, o = void 0, r.set({
				phase: "idle",
				error: ""
			});
		}
	};
}
// svelte/Sidebar.svelte
var av = z("<!><!><!>", 1), ov = z("<span role=\"img\"><!></span>"), sv = z("<!> <a href=\"/app?ui=svelte\" data-nav=\"\" class=\"tw:rounded-control tw:p-2 tw:text-center tw:text-foreground tw:no-underline tw:hover:bg-muted\">←</a> <!> <!> <!> <!> <!>", 1), cv = z("<!><span class=\"tw:flex-1 tw:truncate\"> </span><!><span class=\"tw:text-xs tw:text-muted-foreground\"> </span>", 1), lv = z("<div class=\"tw:min-[901px]:hidden\"><!></div>"), uv = z("<button type=\"button\" class=\"tw:mx-auto tw:h-5 tw:w-12 tw:rounded-full tw:border-0 tw:bg-muted tw:min-[901px]:hidden\"></button> <!> <div class=\"tw:flex tw:items-center tw:gap-2\"><a href=\"/app?ui=svelte\" data-nav=\"\" class=\"tw:flex-1 tw:text-muted-foreground tw:no-underline tw:hover:text-foreground\">← vibebooks</a><!></div> <div class=\"tw:flex tw:items-center tw:gap-1\"><!><!></div> <!> <!> <!>  <!> <!>", 1), dv = z("<section data-vb-native=\"\" data-native-room-sidebar=\"\" class=\"tw:flex tw:min-h-0 tw:flex-col tw:gap-3 tw:p-2 tw:font-sans tw:text-sm tw:tracking-normal tw:[font-variation-settings:normal] tw:text-foreground\"><!></section>");
function fv(i, o) {
	D(o, !0);
	let l = H(o, "foldOpen", 23, () => ({
		off: !1,
		friends: null
	})), p = H(o, "friends", 19, () => []), h = H(o, "collapsed", 3, !1), v = H(o, "presence", 19, () => ({
		agents: [],
		sandboxes: []
	})), y = H(o, "ontogglerail", 3, () => {}), x = H(o, "onrenameroom", 3, () => {}), C = H(o, "onopenside", 3, () => {}), T = H(o, "onagents", 3, () => {}), E = b(() => !!o.mutations), O = b(() => o.mutations ?? iv(o.room.me, o.room.id)), k = !0, ee = e(null);
	function P(e) {
		if (!k) return;
		let t = o.room.me, n = o.room.id;
		o.navigation.state.update((e) => ({
			...e,
			archived: !1
		})), o.onarchchange(!1), y()(), g().then(() => {
			k && o.room.me === t && o.room.id === n && !h() && (document.activeElement === document.body || document.activeElement === e) && m(ee)?.querySelector("#newEpic input")?.focus();
		});
	}
	_(() => O.sync(o.room, o.request)), de(() => {
		k = !1, E || O.dispose();
	});
	function F(e) {
		k && o.onopen(e);
	}
	function ne(e) {
		return { destroy: o.mountSheetHandle?.(e) };
	}
	var re = dv(), ie = s(re), ae = (e) => {
		var t = sv(), i = a(t);
		{
			let e = w(() => o.vb.t("Abrir menu"));
			mt(i, {
				icon: "sidebar",
				get label() {
					return m(e);
				},
				"aria-expanded": "false",
				get onclick() {
					return y();
				}
			});
		}
		var l = n(i, 2), u = n(l, 2);
		R(u, 17, () => [{
			id: "main",
			title: o.room.book.title,
			tasks: [],
			owner: void 0
		}, ...o.room.epics.filter((e) => !e.archived || e.id === o.thread)], (e) => e.id, (e, t) => {
			{
				let i = w(() => o.thread === m(t).id ? "secondary" : "ghost"), s = w(() => o.thread === m(t).id ? "page" : void 0);
				V(e, {
					get variant() {
						return m(i);
					},
					class: "tw:h-auto tw:flex-col tw:gap-1 tw:p-1",
					get "aria-current"() {
						return m(s);
					},
					get title() {
						return m(t).title;
					},
					onclick: (e) => {
						e.currentTarget.isConnected && F(m(t).id);
					},
					children: (e, i) => {
						var s = av(), l = a(s), u = (e) => {
							v_(e, {
								get title() {
									return o.room.book.title;
								},
								get src() {
									return o.roomIcon;
								},
								get tint() {
									return o.roomTint;
								}
							});
						}, d = (e) => {
							{
								let n = w(() => m(t).owner ? o.vb.name(m(t).owner) : m(t).title), r = w(() => m(t).owner ? o.vb.avatarUrl?.(m(t).owner) : void 0);
								ut(e, {
									get name() {
										return m(n);
									},
									get src() {
										return m(r);
									}
								});
							}
						};
						L(l, (e) => {
							m(t).id === "main" ? e(u) : e(d, -1);
						});
						var f = n(l), p = (e) => {
							{
								let n = w(() => m(t).tasks.filter((e) => e.done).length), r = w(() => o.vb.t("Tarefas"));
								Vl(e, {
									get value() {
										return m(n);
									},
									get max() {
										return m(t).tasks.length;
									},
									get label() {
										return m(r);
									}
								});
							}
						};
						L(f, (e) => {
							m(t).tasks.length && e(p);
						});
						var h = n(f), g = (e) => {
							ct(e, {
								children: (e, n) => {
									r();
									var i = I();
									c((e) => U(i, e), [() => o.vb.waitsIn(m(t).id).length]), B(e, i);
								},
								$$slots: { default: !0 }
							});
						}, _ = w(() => o.vb.waitsIn(m(t).id).length);
						L(h, (e) => {
							m(_) && e(g);
						}), B(e, s);
					},
					$$slots: { default: !0 }
				});
			}
		});
		var d = n(u, 2);
		{
			let e = w(() => o.vb.t("Novo épico"));
			mt(d, {
				icon: "plus",
				get label() {
					return m(e);
				},
				onclick: (e) => P(e.currentTarget)
			});
		}
		var f = n(d, 2), p = (e) => {
			{
				let t = w(() => o.vb.t("{n} pedindo pra entrar", { n: o.room.requests.length }));
				V(e, {
					variant: "outline",
					get title() {
						return m(t);
					},
					get onclick() {
						return y();
					},
					children: (e, t) => {
						r();
						var n = I();
						c(() => U(n, `+${o.room.requests.length ?? ""}`)), B(e, n);
					},
					$$slots: { default: !0 }
				});
			}
		};
		L(f, (e) => {
			o.room.requests?.length && e(p);
		});
		var h = n(f, 2);
		R(h, 17, () => o.room.members.slice(0, 8), N, (e, t) => {
			var n = ov(), r = s(n);
			{
				let e = w(() => o.vb.name(m(t))), n = w(() => o.vb.avatarUrl?.(m(t)));
				ut(r, {
					get name() {
						return m(e);
					},
					get src() {
						return m(n);
					}
				});
			}
			S(n), c((e, t) => {
				A(n, "aria-label", e), M(n, 1, t);
			}, [() => `${o.vb.name(m(t))}${o.room.online.includes(m(t)) ? ` · ${o.vb.t("online")}` : ""}`, () => j(o.room.online.includes(m(t)) ? "tw:rounded-full tw:ring-2 tw:ring-success" : "tw:rounded-full")]), B(e, n);
		}), W_(n(h, 2), {
			get owner() {
				return O;
			},
			get t() {
				return o.vb.t;
			}
		}), c((e) => A(l, "aria-label", e), [() => o.vb.t("Seus vibebooks")]), B(e, t);
	}, z = (e) => {
		let t = (e, t = u) => {
			ev(e, {
				get presence() {
					return v();
				},
				get email() {
					return t();
				},
				get t() {
					return o.vb.t;
				},
				get name() {
					return o.vb.name;
				},
				get ago() {
					return o.vb.ago;
				},
				get locale() {
					return o.locale;
				}
			});
		}, i = (e) => {
			nv(e, {
				get presence() {
					return v();
				},
				get t() {
					return o.vb.t;
				},
				get name() {
					return o.vb.name;
				},
				get onopen() {
					return T();
				},
				get locale() {
					return o.locale;
				}
			});
		};
		var f = uv(), h = a(f);
		_e(h, (e) => ne?.(e));
		var g = n(h, 2), _ = (e) => {
			Kh(e, {
				get controller() {
					return o.appNavigation.controller;
				},
				get lang() {
					return o.appNavigation.lang;
				}
			});
		};
		L(g, (e) => {
			o.appNavigation && e(_);
		});
		var b = n(g, 2), E = n(s(b));
		{
			let e = w(() => o.vb.t("Recolher menu"));
			mt(E, {
				icon: "sidebar",
				get label() {
					return m(e);
				},
				"aria-expanded": "true",
				get onclick() {
					return y();
				}
			});
		}
		S(b);
		var D = n(b, 2), k = s(D);
		{
			let e = w(() => o.thread === "main" ? "secondary" : "ghost");
			V(k, {
				get variant() {
					return m(e);
				},
				class: "tw:min-w-0 tw:flex-1 tw:justify-start tw:gap-2",
				onclick: (e) => {
					e.currentTarget.isConnected && F("main");
				},
				children: (e, t) => {
					var i = cv(), s = a(i);
					v_(s, {
						get title() {
							return o.room.book.title;
						},
						get src() {
							return o.roomIcon;
						},
						get tint() {
							return o.roomTint;
						}
					});
					var l = n(s), u = d(l, !0), f = n(l), p = (e) => {
						ct(e, {
							children: (e, t) => {
								r();
								var n = I();
								c((e) => U(n, e), [() => o.vb.waitsIn("main").length]), B(e, n);
							},
							$$slots: { default: !0 }
						});
					}, h = w(() => o.vb.waitsIn("main").length);
					L(f, (e) => {
						m(h) && e(p);
					});
					var g = n(f), _ = d(g, !0);
					c((e) => {
						U(u, o.room.book.title), U(_, e);
					}, [() => F_(o.room, "main")]), B(e, i);
				},
				$$slots: { default: !0 }
			});
		}
		var j = n(k);
		{
			let e = w(() => o.vb.t("Renomear"));
			mt(j, {
				icon: "pencil",
				get label() {
					return m(e);
				},
				get onclick() {
					return x();
				}
			});
		}
		S(D);
		var M = n(D, 2), N = (e) => {
			var t = lv();
			X_(s(t), {
				get room() {
					return o.room;
				},
				get thread() {
					return o.thread;
				},
				get owner() {
					return O;
				},
				get vb() {
					return o.vb;
				},
				get roomIcon() {
					return o.roomIcon;
				},
				get roomTint() {
					return o.roomTint;
				},
				get onopenside() {
					return C();
				},
				get onrenameroom() {
					return x();
				}
			}), S(t), B(e, t);
		}, ee = w(() => o.thread !== "main" && !o.thread.startsWith("pre:"));
		L(M, (e) => {
			m(ee) && e(N);
		});
		var P = n(M, 2);
		{
			let e = w(() => ({
				t: o.vb.t,
				name: o.vb.name,
				epicBusy: o.vb.epicBusy,
				waitCount: (e) => o.vb.waitsIn(e).length
			}));
			Ug(P, {
				get room() {
					return o.room;
				},
				get thread() {
					return o.thread;
				},
				get session() {
					return o.navigation;
				},
				get mutations() {
					return O;
				},
				get onarchchange() {
					return o.onarchchange;
				},
				onopen: F,
				get vb() {
					return m(e);
				}
			});
		}
		var re = n(P, 2);
		h_(re, {
			get room() {
				return o.room;
			},
			get session() {
				return o.pins;
			},
			get send() {
				return o.send;
			},
			get request() {
				return o.request;
			},
			get onopenfile() {
				return o.onopenpinfile;
			},
			get onopenapp() {
				return o.onopenpinapp;
			},
			get t() {
				return o.vb.t;
			}
		});
		var R = n(re, 2);
		{
			let e = w(() => ({
				t: o.vb.t,
				name: o.vb.name,
				ago: o.vb.ago,
				avatarUrl: o.vb.avatarUrl
			}));
			_g(R, {
				get room() {
					return o.room;
				},
				get friends() {
					return p();
				},
				get foldOpen() {
					return l();
				},
				get vb() {
					return m(e);
				},
				get agents() {
					return t;
				},
				get sandboxes() {
					return i;
				},
				onfoldchange: (e, t) => {
					l()[e] = t;
				}
			});
		}
		W_(n(R, 2), {
			get owner() {
				return O;
			},
			get t() {
				return o.vb.t;
			}
		}), c((e) => A(h, "aria-label", e), [() => o.vb.t("Fechar")]), te("click", h, function(...e) {
			C()?.apply(this, e);
		}), B(e, f);
	};
	L(ie, (e) => {
		h() ? e(ae) : e(z, -1);
	}), S(re), le(re, (e) => f(ee, e), () => m(ee)), B(i, re), t();
}
Se(["click"]);
// svelte/features/room-sidebar/SuggestionPreview.svelte
var pv = z("<li> </li>"), mv = z("<!> <ul class=\"tw:m-0 tw:list-disc tw:space-y-1 tw:pl-5\"></ul>", 1), hv = z("<article data-vb-native=\"\" data-native-suggestion=\"\" class=\"tw:mx-auto tw:w-full tw:max-w-2xl tw:space-y-4 tw:p-6 tw:font-sans tw:text-sm tw:leading-6 tw:text-foreground\"><p class=\"tw:m-0 tw:text-xs tw:text-muted-foreground\"> </p> <!> <p class=\"tw:m-0\"> </p> <!> <div class=\"tw:flex tw:flex-wrap tw:gap-2\"><!><!></div> <p class=\"tw:m-0 tw:text-muted-foreground\"> </p> <!></article>");
function gv(e, i) {
	D(i, !0);
	let o = () => ye(f, "$status", l), [l, u] = xe(), f = b(() => i.owner.state), p = w(() => i.room.suggestions[i.index]), h = w(() => o().phase === "pending" || o().phase === "unconfirmed"), g = !0;
	function _(e, t) {
		if (!g || m(h) || !m(p) || !i.room.members.includes(i.room.me)) return;
		let n = M_(t);
		M_(i.room.suggestions[i.index]) === n && i.owner.run({
			t: "suggestion",
			i: i.index,
			accept: e,
			expected: t
		});
	}
	de(() => {
		g = !1;
	});
	var v = P(), y = a(v), x = (e) => {
		var t = P(), o = a(t);
		F(o, () => M_(m(p)), (e) => {
			let t = w(() => m(p));
			var o = hv(), l = s(o), u = d(l), f = n(l, 2);
			St(f, {
				level: 3,
				children: (e, t) => {
					r();
					var n = I();
					c(() => U(n, m(p).title)), B(e, n);
				},
				$$slots: { default: !0 }
			});
			var g = n(f, 2), v = d(g, !0), y = n(g, 2), b = (e) => {
				var t = mv(), o = a(t);
				St(o, {
					level: 4,
					children: (e, t) => {
						r();
						var n = I();
						c((e) => U(n, e), [() => i.vb.t("Tarefas propostas")]), B(e, n);
					},
					$$slots: { default: !0 }
				});
				var s = n(o, 2);
				R(s, 21, () => m(p).tasks, N, (e, t) => {
					var n = pv(), r = d(n, !0);
					c(() => U(r, m(t))), B(e, n);
				}), S(s), B(e, t);
			};
			L(y, (e) => {
				m(p).tasks.length && e(b);
			});
			var x = n(y, 2), C = s(x);
			V(C, {
				get disabled() {
					return m(h);
				},
				onclick: (e) => {
					e.currentTarget.isConnected && _(!0, m(t));
				},
				children: (e, t) => {
					r();
					var n = I();
					c((e) => U(n, e), [() => i.vb.t("Pedir pro meu agent")]), B(e, n);
				},
				$$slots: { default: !0 }
			});
			var T = n(C);
			V(T, {
				variant: "ghost",
				get disabled() {
					return m(h);
				},
				onclick: (e) => {
					e.currentTarget.isConnected && _(!1, m(t));
				},
				children: (e, t) => {
					r();
					var n = I();
					c((e) => U(n, e), [() => i.vb.t("Descartar")]), B(e, n);
				},
				$$slots: { default: !0 }
			}), S(x);
			var E = n(x, 2), D = d(E, !0);
			W_(n(E, 2), {
				get owner() {
					return i.owner;
				},
				get t() {
					return i.vb.t;
				}
			}), S(o), c((e, t, n) => {
				U(u, `✦ ${e ?? ""}`), U(v, t), U(D, n);
			}, [
				() => i.vb.t("O @vibe sugere um épico"),
				() => m(p).why || i.vb.t("Ele viu isso na conversa e acha que vale virar um épico, com as tarefas abaixo."),
				() => i.vb.t("Vira um pedido seu na sala: seu agent confere se ainda faz sentido, ajusta o doc e as tarefas e cria o épico.")
			]), B(e, o);
		}), B(e, t);
	};
	L(y, (e) => {
		m(p) && e(x);
	}), B(e, v), t(), u();
}
// shared/card.ts
var _v = Ne(Fe()), vv = Me(Fe()), yv = (e, t) => W({
	type: Oe(e),
	props: t,
	children: vv
}), bv = Re("type", [
	yv("Card", W({
		title: _v,
		subtitle: _v
	})),
	yv("Section", W({ title: _v })),
	yv("Text", W({
		content: Fe(),
		style: Be([
			"plain",
			"bold",
			"muted",
			"code"
		])
	})),
	yv("Fields", W({})),
	yv("Field", W({
		label: Fe(),
		value: Fe()
	})),
	yv("Table", W({
		headers: Me(Fe()),
		rows: Me(Me(Fe()))
	})),
	yv("Chart", W({
		title: _v,
		kind: Be(["line", "bar"]),
		data: Me(W({
			label: Fe(),
			value: Le()
		}))
	})),
	yv("Divider", W({})),
	yv("Image", W({
		url: Fe(),
		alt: _v
	})),
	yv("Actions", W({})),
	yv("Button", W({
		label: Fe(),
		value: _v,
		style: Ne(Be(["primary", "danger"]))
	})),
	yv("LinkButton", W({
		label: Fe(),
		url: Fe()
	}))
]), xv = W({
	root: Fe(),
	elements: Pe(Fe(), bv)
}), Sv = (e) => (t, n) => {
	if (t == null) return;
	if (typeof t != "string" && typeof t != "number") throw Error(`${n} must be text`);
	let r = String(t);
	if (r.length > e) throw Error(`${n} is longer than ${e} characters`);
	return r;
}, Cv = Sv(200), wv = Sv(2e3), Tv = (e, t) => {
	let n = Cv(e, t);
	if (!n || !/^https?:\/\/[^\s"'<>]+$/i.test(n)) throw Error(`${t} must be an http(s) URL`);
	return n;
}, Ev = {
	Card: {
		props: (e) => ({
			title: Cv(e.title, "Card.title"),
			subtitle: Cv(e.subtitle, "Card.subtitle")
		}),
		kids: "any"
	},
	Section: {
		props: (e) => ({ title: Cv(e.title, "Section.title") }),
		kids: "any"
	},
	Text: { props: (e) => {
		let t = wv(e.content ?? e.text, "Text.content");
		if (!t) throw Error("Text needs content");
		return {
			content: t,
			style: [
				"plain",
				"bold",
				"muted",
				"code"
			].includes(String(e.style)) ? String(e.style) : "plain"
		};
	} },
	Fields: {
		props: () => ({}),
		kids: ["Field"]
	},
	Field: { props: (e) => ({
		label: Cv(e.label, "Field.label") ?? "",
		value: wv(e.value, "Field.value") ?? ""
	}) },
	Table: { props: (e) => {
		let t = (Array.isArray(e.headers) ? e.headers : Array.isArray(e.columns) ? e.columns : []).slice(0, 10).map((e, t) => Cv(typeof e == "object" && e ? e.label : e, `Table.headers[${t}]`) ?? "");
		if (!Array.isArray(e.rows)) throw Error("Table needs rows (a list of lists)");
		if (e.rows.length > 50) throw Error("Table has more than 50 rows");
		return {
			headers: t,
			rows: e.rows.map((e, t) => {
				if (!Array.isArray(e)) throw Error(`Table.rows[${t}] must be a list`);
				return e.slice(0, 10).map((e, n) => Cv(e, `Table.rows[${t}][${n}]`) ?? "");
			})
		};
	} },
	Chart: { props: (e) => {
		let t = Array.isArray(e.data) ? e.data : [];
		if (!t.length || t.length > 30) throw Error("Chart needs 1-30 points in data: [{label, value}]");
		return {
			title: Cv(e.title, "Chart.title"),
			kind: e.kind === "line" || e.chartType === "line" ? "line" : "bar",
			data: t.map((e, t) => {
				let n = Number(e?.value);
				if (!Number.isFinite(n)) throw Error(`Chart.data[${t}].value must be a number`);
				return {
					label: Cv(e?.label, `Chart.data[${t}].label`) ?? "",
					value: n
				};
			})
		};
	} },
	Divider: { props: () => ({}) },
	Image: { props: (e, t) => {
		let n = (Cv(e.url ?? e.src, "Image.url") ?? "").match(/^(?:https?:\/\/[^/]+)?\/api\/books\/([a-z0-9]+)\/files\/([a-z0-9]+)$/);
		if (!n || n[1] !== t) throw Error("Image.url must be a file of this room (/api/books/<room>/files/<id>, e.g. from upload_file)");
		return {
			url: `/api/books/${n[1]}/files/${n[2]}`,
			alt: Cv(e.alt, "Image.alt")
		};
	} },
	Actions: {
		props: () => ({}),
		kids: ["Button", "LinkButton"]
	},
	Button: { props: (e) => {
		let t = Cv(e.label, "Button.label");
		if (!t) throw Error("Button needs a label");
		return {
			label: t,
			value: Cv(e.value, "Button.value"),
			style: e.style === "primary" || e.style === "danger" ? e.style : void 0
		};
	} },
	LinkButton: { props: (e) => ({
		label: Cv(e.label, "LinkButton.label") ?? "Abrir",
		url: /^#(m\d{1,9}|e[a-z0-9]{4,16}|doc(:[a-z0-9]{4,16})?|app:(room|[a-f0-9]{12})\/[\w.-]{1,100})$/.test(String(e.url ?? "")) ? String(e.url) : Tv(e.url, "LinkButton.url (http(s), or #m<message id>, #e<epic id>, #doc, #doc:<epic id>)")
	}) }
}, Dv = Object.keys(Ev);
function Ov(e, t) {
	let n = typeof e == "string" ? JSON.parse(e) : e;
	if (!n || typeof n != "object") throw Error("card must be an object: { root, elements }");
	let { root: r, elements: i } = n;
	if (typeof r != "string" || !i || typeof i != "object") throw Error("card must be { root: <id>, elements: { <id>: { type, props, children } } }");
	let a = i;
	if (Object.keys(a).length > 150) throw Error("card has more than 150 elements");
	let o = {}, s = (e, n, r) => {
		if (n > 8) throw Error("card is nested more than 8 levels");
		if (o[e]) throw Error(`element ${e} is used twice`);
		let i = a[e];
		if (!i) throw Error(`element ${e} is missing from elements`);
		let c = String(i.type), l = Ev[c];
		if (!l) throw Error(`unknown component ${c}; use one of ${Dv.join(", ")}`);
		if (r && r !== "any" && !r.includes(c)) throw Error(`${c} can't be inside this parent (allowed: ${r.join(", ")})`);
		let u = Object.fromEntries(Object.entries(l.props(i.props ?? {}, t)).filter(([, e]) => e !== void 0)), d = Array.isArray(i.children) ? i.children.map(String) : [];
		if (d.length && !l.kids) throw Error(`${c} takes no children`);
		o[e] = {
			type: c,
			props: u,
			children: d
		};
		for (let e of d) s(e, n + 1, l.kids);
	};
	if (s(r, 0), o[r].type !== "Card") throw Error("the root element must be a Card");
	return xv.parse({
		root: r,
		elements: o
	});
}
// svelte/features/chat/privacy.ts
var kv = (e) => e.kind === "agent" && /^\u23f8/.test(e.text || "") && /"options":\["Aprovar","Negar"\]/.test(e.choices || ""), Av = (e, t) => e.messages.find((e) => e.id === t) || e.origins?.find((e) => e.id === t), jv = (e, t) => t?.kind === "agent" && t.author !== e.me && /^(⏸ Seu Claude|❓ Seu Claude)/.test(t.text || "");
function Mv(e, t) {
	if (!t.reply_to || t.kind === "agent") return !1;
	let n = Av(e, t.reply_to);
	return !!n && kv(n) && n.author === t.author;
}
function Nv(e, t) {
	let n = t.reply_to == null ? void 0 : Av(e, t.reply_to);
	return !jv(e, t) && !jv(e, n) && !Mv(e, t);
}
var Pv = (e, t) => e.messages.filter((n) => n.thread === t && Nv(e, n));
// svelte/features/chat-interactive/model.ts
function Fv(e) {
	if (!e || e.length > 16384) return null;
	try {
		let t = JSON.parse(e);
		return !t || typeof t != "object" || !("options" in t) || !Array.isArray(t.options) || t.options.length < 2 || t.options.length > 8 || t.options.some((e) => typeof e != "string" || !e.trim() || e.length > 120) ? null : {
			options: t.options,
			multi: "multi" in t && t.multi === !0,
			closed: "closed" in t && !!t.closed
		};
	} catch {
		return null;
	}
}
function Iv(e, t) {
	if (!e || e.length > 1e6) return null;
	try {
		return Ov(e, t);
	} catch {
		return null;
	}
}
var Lv = (e, t) => e.messages.filter((e) => e.reply_to === t.id && e.author === t.author && e.kind !== "agent").sort((e, t) => e.id - t.id)[0], Rv = (e, t) => e.members.includes(e.me) && t.kind === "agent" && t.author === e.me && !Lv(e, t);
function zv(e, t) {
	let n = e.options.map((t, n) => e.votes[n]?.length || 0), r = n.reduce((e, t) => e + t, 0), i = Math.max(...n, 0);
	return {
		voters: new Set(e.votes.flat()).size,
		rows: e.options.map((a, o) => ({
			label: a,
			index: o,
			count: n[o],
			percent: r ? Math.round(100 * n[o] / r) : 0,
			mine: !!e.votes[o]?.includes(t),
			winner: e.closed && n[o] > 0 && n[o] === i,
			voters: (e.votes[o] || []).slice(0, 4)
		}))
	};
}
var Bv = (e, t) => e.members.includes(e.me) && !t.closed && (t.author === e.me || t.author === "ai");
function Vv(e) {
	let t = Math.max(...e.map((e) => Math.abs(e.value)), 1), n = e.map((e) => e.value / t), r = Math.min(...n, 0), i = 1 - r || 1;
	return {
		bars: e.map((e) => Math.round(Math.abs(e.value) / t * 100)),
		points: n.map((t, n) => `${(e.length > 1 ? n * 300 / (e.length - 1) : 0).toFixed(1)},${(90 - (t - r) / i * 90).toFixed(1)}`).join(" ")
	};
}
var Hv = (e) => JSON.stringify([
	e.id,
	e.author,
	e.question,
	e.options,
	e.multi
]), Uv = 2e3;
function Wv(e) {
	let t = Uv, n = /* @__PURE__ */ new Set();
	for (let [r, i] of Object.entries(e.elements)) {
		if (i.type !== "Table" && i.type !== "Chart") continue;
		let e = i.type === "Table" ? i.props.rows.reduce((e, t) => e + t.length * 2 + 2, 0) + i.props.headers.length * 2 + 4 : i.props.data.length * 8 + 8;
		e <= t && (n.add(r), t -= e);
	}
	return n;
}
// svelte/features/chat-interactive/CardChart.svelte
var Gv = z("<figcaption class=\"tw:whitespace-pre-wrap tw:text-sm tw:font-medium\"> </figcaption>"), Kv = z("<svg role=\"img\" viewBox=\"-4 -4 308 98\" preserveAspectRatio=\"none\" class=\"tw:h-24 tw:w-full tw:text-primary\"><polyline fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\" vector-effect=\"non-scaling-stroke\"></polyline></svg> <div class=\"tw:flex tw:justify-between tw:gap-2 tw:text-xs tw:text-muted-foreground\"><span> </span><span> </span></div>", 1), qv = z("<div class=\"tw:grid tw:grid-cols-[minmax(0,1fr)_minmax(0,2fr)_auto] tw:items-center tw:gap-2 tw:text-xs\"><span class=\"tw:whitespace-pre-wrap tw:break-words\"> </span><!><b> </b></div>"), Jv = z("<figure class=\"tw:m-0 tw:space-y-2\"><!><!></figure>"), Yv = z("<!> ", 1), Xv = z("<div data-native-card-chart=\"\" class=\"tw:space-y-2\"><!></div>");
function Zv(e, r) {
	D(r, !0);
	let i = (e) => {
		var t = Jv(), i = s(t), o = (e) => {
			var t = Gv(), n = d(t, !0);
			c(() => U(n, r.chart.title)), B(e, t);
		};
		L(i, (e) => {
			r.chart.title && e(o);
		});
		var l = n(i), f = (e) => {
			var t = Kv(), i = a(t), o = d(i), l = n(i, 2), f = s(l), p = d(f, !0), h = n(f), g = d(h, !0);
			S(l), c((e, t) => {
				A(i, "aria-label", e), A(o, "points", m(u).points), U(p, r.chart.data[0]?.label), U(g, t);
			}, [() => r.chart.title || r.vb.t("Gráfico"), () => r.chart.data.at(-1)?.label]), B(e, t);
		}, p = (e) => {
			var t = P(), i = a(t);
			R(i, 17, () => r.chart.data, N, (e, t, r) => {
				var i = qv(), a = s(i), o = d(a, !0), l = n(a);
				{
					let e = w(() => `${m(t).label}: ${m(t).value}`);
					Vl(l, {
						get value() {
							return m(u).bars[r];
						},
						get label() {
							return m(e);
						}
					});
				}
				var f = n(l), p = d(f, !0);
				S(i), c(() => {
					U(o, m(t).label), U(p, m(t).value);
				}), B(e, i);
			}), B(e, t);
		};
		L(l, (e) => {
			r.chart.kind === "line" ? e(f) : e(p, -1);
		}), S(t), B(e, t);
	}, o = H(r, "inline", 3, !0), l = H(r, "open", 3, !1), u = w(() => Vv(r.chart.data));
	var f = Xv(), p = s(f), h = (e) => {
		i(e);
	}, g = (e) => {
		{
			let t = (e) => {
				var t = Yv(), i = a(t);
				Dt(i, { name: "chart" });
				var o = n(i);
				c((e, t) => U(o, `${e ?? ""} ·
        ${t ?? ""}`), [() => r.chart.title || r.vb.t("Gráfico"), () => r.vb.t("Abrir em tela cheia")]), B(e, t);
			}, o = w(() => r.chart.title || r.vb.t("Gráfico")), s = w(() => r.vb.t("Fechar"));
			Ot(e, {
				get title() {
					return m(o);
				},
				get closeLabel() {
					return m(s);
				},
				fullScreen: !0,
				get open() {
					return l();
				},
				get onOpenChange() {
					return r.onOpenChange;
				},
				trigger: t,
				children: (e, t) => {
					i(e);
				},
				$$slots: {
					trigger: !0,
					default: !0
				}
			});
		}
	};
	L(p, (e) => {
		o() ? e(h) : e(g, -1);
	}), S(f), B(e, f), t();
}
// svelte/features/chat-interactive/CardTable.svelte
var Qv = z("<th class=\"tw:whitespace-pre-wrap tw:border tw:border-border tw:bg-muted tw:px-3 tw:py-2 tw:text-left tw:font-semibold\"> </th>"), $v = z("<thead><tr></tr></thead>"), ey = z("<td class=\"tw:whitespace-pre-wrap tw:border tw:border-border tw:px-3 tw:py-2 tw:align-top\"> </td>"), ty = z("<tr></tr>"), ny = z("<div class=\"tw:max-w-full tw:overflow-x-auto\"><table class=\"tw:w-full tw:border-collapse tw:font-sans tw:text-sm tw:text-foreground\"><!><tbody></tbody></table></div>"), ry = z("<!> ", 1), iy = z("<div data-native-card-table=\"\" class=\"tw:space-y-2\"><!> <!></div>");
function ay(e, r) {
	D(r, !0);
	let i = (e) => {
		var t = ny(), i = s(t), a = s(i), o = (e) => {
			var t = $v(), n = s(t);
			R(n, 21, () => r.headers, N, (e, t) => {
				var n = Qv(), r = d(n, !0);
				c(() => U(r, m(t))), B(e, n);
			}), S(n), S(t), B(e, t);
		};
		L(a, (e) => {
			r.headers.length && e(o);
		});
		var l = n(a);
		R(l, 21, () => r.rows, N, (e, t) => {
			var n = ty();
			R(n, 21, () => m(t), N, (e, t) => {
				var n = ey(), r = d(n, !0);
				c(() => U(r, m(t))), B(e, n);
			}), S(n), B(e, n);
		}), S(l), S(i), S(t), B(e, t);
	}, o = H(r, "inline", 3, !0), l = H(r, "open", 3, !1);
	var u = iy(), f = s(u);
	{
		let e = (e) => {
			var t = ry(), i = a(t);
			Dt(i, { name: "expand" });
			var o = n(i, 1, !0);
			c((e) => U(o, e), [() => r.vb.t("Abrir em tela cheia")]), B(e, t);
		}, t = w(() => r.vb.t("Fechar"));
		Ot(f, {
			get title() {
				return r.title;
			},
			get closeLabel() {
				return m(t);
			},
			fullScreen: !0,
			get open() {
				return l();
			},
			get onOpenChange() {
				return r.onOpenChange;
			},
			trigger: e,
			children: (e, t) => {
				i(e);
			},
			$$slots: {
				trigger: !0,
				default: !0
			}
		});
	}
	var p = n(f, 2), h = (e) => {
		i(e);
	};
	L(p, (e) => {
		o() && e(h);
	}), S(u), B(e, u), t();
}
// svelte/features/chat-interactive/session.ts
var oy = () => ({
	phase: "idle",
	error: ""
}), sy = {
	schedule: (e, t) => setTimeout(e, t),
	cancel: (e) => clearTimeout(e)
}, cy = 1e4;
function ly(e, t, n, r = sy, i = "card") {
	let a, o = !0, s, c, l, u, d = oy(), f = (e) => {
		d = e, n(e);
	};
	function p(e = oy()) {
		u?.timer !== void 0 && r.cancel(u.timer), u = void 0, f(e);
	}
	function m(e) {
		return JSON.stringify([
			e.thread,
			e.author,
			e.kind,
			i === "card" ? e.card : void 0,
			i === "permission" ? e.choices : void 0,
			i === "poll" ? e.poll : void 0,
			i === "permission" ? e.text : void 0
		]);
	}
	function h(e) {
		if (!s || !c) return !0;
		if (e.kind === "reply") return !!Lv(s, c) || i === "permission" && !!Fv(c.choices)?.closed;
		let t = c.poll ? s.polls?.[c.poll] : void 0;
		return !t || t.closed || e.kind === "vote" && !!t.votes[e.option]?.includes(s.me) === e.desired;
	}
	function g(n) {
		if (!o) return;
		if (a === void 0 && (a = n.me), n.id !== e || n.me !== a) {
			s = void 0, c = void 0, p();
			return;
		}
		s = n;
		let r = n.messages.find((e) => e.id === t) || n.origins?.find((e) => e.id === t), f = r === c ? l : r ? m(r) : void 0;
		if (f === l ? c = r : (l = f, c = r, p()), u && u.kind !== "reply") {
			let e = r?.poll ? n.polls?.[r.poll] : void 0;
			e && Hv(e) === u.identity || p();
		}
		u && h(u) && p(), r && n.members.includes(n.me) || p(), d.phase !== "idle" && r && (Lv(n, r) || i === "permission" && Fv(r.choices)?.closed || i === "poll" && r.poll && n.polls?.[r.poll]?.closed) && p();
	}
	async function _(e, t, n) {
		u = t, f({
			phase: "pending",
			error: ""
		});
		let i = () => o && u?.token === t.token;
		try {
			let a = await n(e);
			if (!i()) return;
			if (h(t)) {
				p();
				return;
			}
			if (!a.ok) {
				a.error === "timeout" || a.error === "disconnected" || a.error === "server error" ? f({
					phase: "unconfirmed",
					error: a.error
				}) : p({
					phase: "error",
					error: a.error
				});
				return;
			}
			t.timer = r.schedule(() => {
				i() && (t.timer = void 0, f({
					phase: "unconfirmed",
					error: "unconfirmed"
				}));
			}, cy);
		} catch (e) {
			i() && f({
				phase: "unconfirmed",
				error: e instanceof Error ? e.message : "failed"
			});
		}
	}
	return {
		sync: g,
		reply(e, n) {
			return !o || !s || !c || u || d.phase === "unconfirmed" || !Rv(s, c) || !e.trim() || !(i === "permission" && kv(c) && !Fv(c.choices)?.closed ? ["Aprovar", "Negar"] : i === "card" ? Object.values(Iv(c.card, s.id)?.elements || {}).flatMap((e) => e.type === "Button" ? [e.props.value || e.props.label] : []) : []).includes(e) ? Promise.resolve() : _({
				t: "msg",
				thread: c.thread,
				text: e,
				files: [],
				reply_to: t
			}, {
				token: Symbol(),
				kind: "reply"
			}, n);
		},
		vote(e, t) {
			let n = c?.poll ? s?.polls?.[c.poll] : void 0;
			return !o || !s || !c || u || !s.members.includes(s.me) || !n || n.closed || !Number.isInteger(e) || e < 0 || e >= n.options.length ? Promise.resolve() : _({
				t: "vote",
				id: n.id,
				opt: e
			}, {
				token: Symbol(),
				kind: "vote",
				identity: Hv(n),
				option: e,
				desired: !n.votes[e]?.includes(s.me)
			}, t);
		},
		close(e) {
			let t = c?.poll ? s?.polls?.[c.poll] : void 0;
			return !o || !s || !c || u || !t || !Bv(s, t) ? Promise.resolve() : _({
				t: "poll.close",
				id: t.id
			}, {
				token: Symbol(),
				kind: "close",
				identity: Hv(t)
			}, e);
		},
		dispose() {
			o = !1, u?.timer !== void 0 && r.cancel(u.timer), u = void 0, s = void 0, c = void 0, l = void 0;
		}
	};
}
// svelte/features/chat-interactive/CardView.svelte
var uy = z("<h5 class=\"tw:m-0 tw:whitespace-pre-wrap tw:font-sans tw:text-sm tw:font-semibold tw:tracking-normal tw:[font-variation-settings:normal]\"> </h5>"), dy = z("<section class=\"tw:space-y-2\"><!><!></section>"), fy = z("<p> </p>"), py = z("<dl class=\"tw:m-0 tw:grid tw:grid-cols-1 tw:gap-3 tw:sm:grid-cols-2\"></dl>"), my = z("<div class=\"tw:min-w-0\"><dt class=\"tw:whitespace-pre-wrap tw:text-xs tw:text-muted-foreground\"> </dt> <dd class=\"tw:m-0 tw:whitespace-pre-wrap tw:break-words tw:font-medium\"> </dd></div>"), hy = z("<hr class=\"tw:my-3 tw:border-border\"/>"), gy = z("<img loading=\"lazy\" class=\"tw:block tw:max-w-full tw:rounded-control tw:object-contain\"/>"), _y = z("<div class=\"tw:flex tw:flex-wrap tw:gap-2\"></div>"), vy = z("<span><!> </span>"), yy = z(" <!>", 1), by = z("<a target=\"_blank\" rel=\"noopener noreferrer\" class=\"tw:inline-flex tw:items-center tw:gap-1 tw:rounded-button tw:px-3 tw:py-1.5 tw:text-sm tw:text-link tw:hover:underline tw:focus-visible:outline-2 tw:focus-visible:outline-ring\"> <!></a>"), xy = z("<p class=\"tw:m-0 tw:text-xs tw:text-muted-foreground\"> </p>"), Sy = z("<div data-native-card=\"\" data-vb-native=\"\" class=\"tw:space-y-2 tw:font-sans tw:text-sm tw:text-foreground\"><!> <!></div>");
function Cy(i, o) {
	D(o, !0);
	let p = (e, t = u, i) => {
		let h = y(() => l(i?.(), () => o.card.root, !0));
		var g = P(), _ = a(g), b = (e) => {
			{
				let n = w(() => t().props.title ? t().props.subtitle : void 0);
				Te(e, {
					get title() {
						return t().props.title;
					},
					get description() {
						return m(n);
					},
					class: "tw:shadow-none tw:[&_h2]:whitespace-pre-wrap tw:[&_p]:whitespace-pre-wrap",
					children: (e, n) => {
						var r = P(), i = a(r);
						R(i, 17, () => t().children, N, (e, t, n, r) => {
							p(e, () => o.card.elements[m(t)], () => m(t));
						}), B(e, r);
					},
					$$slots: { default: !0 }
				});
			}
		}, x = (e) => {
			var r = dy(), i = s(r), a = (e) => {
				var n = uy(), r = d(n, !0);
				c(() => U(r, t().props.title)), B(e, n);
			};
			L(i, (e) => {
				t().props.title && e(a);
			});
			var l = n(i);
			R(l, 17, () => t().children, N, (e, t, n, r) => {
				p(e, () => o.card.elements[m(t)]);
			}), S(r), B(e, r);
		}, T = (e) => {
			var n = fy(), r = d(n, !0);
			c(() => {
				M(n, 1, j(["tw:m-0 tw:whitespace-pre-wrap tw:break-words tw:font-sans tw:leading-6", t().props.style === "bold" ? "tw:font-semibold" : t().props.style === "muted" ? "tw:text-muted-foreground" : t().props.style === "code" ? "tw:rounded-control tw:bg-muted tw:p-2 tw:font-mono tw:text-xs" : ""])), U(r, t().props.content);
			}), B(e, n);
		}, E = (e) => {
			var n = py();
			R(n, 21, () => t().children, N, (e, t, n, r) => {
				p(e, () => o.card.elements[m(t)]);
			}), S(n), B(e, n);
		}, D = (e) => {
			var r = my(), i = s(r), a = d(i, !0), o = n(i, 2), l = d(o, !0);
			S(r), c(() => {
				U(a, t().props.label), U(l, t().props.value);
			}), B(e, r);
		}, O = (e) => {
			{
				let n = w(() => m(C).has(m(h))), r = w(() => m(v) === m(h));
				ay(e, {
					get headers() {
						return t().props.headers;
					},
					get rows() {
						return t().props.rows;
					},
					get title() {
						return m(k);
					},
					get vb() {
						return o.vb;
					},
					get inline() {
						return m(n);
					},
					get open() {
						return m(r);
					},
					onOpenChange: (e) => f(v, e ? m(h) : null, !0)
				});
			}
		}, ie = (e) => {
			{
				let n = w(() => m(C).has(m(h))), r = w(() => m(v) === m(h));
				Zv(e, {
					get chart() {
						return t().props;
					},
					get vb() {
						return o.vb;
					},
					get inline() {
						return m(n);
					},
					get open() {
						return m(r);
					},
					onOpenChange: (e) => f(v, e ? m(h) : null, !0)
				});
			}
		}, ae = (e) => {
			var t = hy();
			B(e, t);
		}, z = (e) => {
			var n = gy();
			c(() => {
				A(n, "src", t().props.url), A(n, "alt", t().props.alt || "");
			}), B(e, n);
		}, oe = (e) => {
			var n = _y();
			R(n, 21, () => t().children, N, (e, t, n, r) => {
				p(e, () => o.card.elements[m(t)]);
			}), S(n), B(e, n);
		}, se = (e) => {
			let i = w(() => t().props.value || t().props.label);
			var o = P(), l = a(o), u = (e) => {
				{
					let n = w(() => t().props.style === "danger" ? "destructive" : t().props.style === "primary" ? "primary" : "outline");
					V(e, {
						get "data-native-card-answer"() {
							return m(i);
						},
						class: "tw:h-auto tw:min-h-8 tw:whitespace-pre-wrap tw:text-left",
						size: "sm",
						get variant() {
							return m(n);
						},
						get disabled() {
							return m(te);
						},
						onclick: (e) => ne(m(i), e),
						children: (e, n) => {
							r();
							var i = I();
							c(() => U(i, t().props.label)), B(e, i);
						},
						$$slots: { default: !0 }
					});
				}
			}, d = (e) => {
				var r = vy(), a = s(r), o = (e) => {
					Dt(e, { name: "check" });
				};
				L(a, (e) => {
					m(ee)?.text === m(i) && e(o);
				});
				var l = n(a, 1, !0);
				S(r), c(() => {
					A(r, "data-native-card-picked", m(ee)?.text === m(i) ? m(i) : void 0), M(r, 1, j(m(ee)?.text === m(i) ? "tw:inline-flex tw:items-center tw:gap-1 tw:whitespace-pre-wrap tw:rounded-button tw:border tw:border-primary tw:bg-primary/10 tw:px-3 tw:py-1.5 tw:text-sm" : "tw:inline-flex tw:items-center tw:whitespace-pre-wrap tw:rounded-button tw:border tw:border-border tw:px-3 tw:py-1.5 tw:text-sm tw:text-muted-foreground")), U(l, t().props.label);
				}), B(e, r);
			};
			L(l, (e) => {
				m(F) ? e(u) : e(d, -1);
			}), B(e, o);
		}, ce = (e) => {
			var i = P(), o = a(i), l = (e) => {
				V(e, {
					class: "tw:h-auto tw:min-h-8 tw:whitespace-pre-wrap tw:text-left",
					size: "sm",
					variant: "link",
					onclick: (e) => re(t().props.url, e),
					children: (e, i) => {
						r();
						var o = yy(), s = a(o, !0), l = n(s);
						Dt(l, { name: "arrowRight" }), c(() => U(s, t().props.label)), B(e, o);
					},
					$$slots: { default: !0 }
				});
			}, u = w(() => t().props.url.startsWith("#")), d = (e) => {
				var r = by(), i = s(r, !0), a = n(i);
				Dt(a, { name: "external" }), S(r), c(() => {
					A(r, "href", t().props.url), U(i, t().props.label);
				}), B(e, r);
			};
			L(o, (e) => {
				m(u) ? e(l) : e(d, -1);
			}), B(e, i);
		};
		L(_, (e) => {
			t().type === "Card" ? e(b) : t().type === "Section" ? e(x, 1) : t().type === "Text" ? e(T, 2) : t().type === "Fields" ? e(E, 3) : t().type === "Field" ? e(D, 4) : t().type === "Table" ? e(O, 5) : t().type === "Chart" ? e(ie, 6) : t().type === "Divider" ? e(ae, 7) : t().type === "Image" ? e(z, 8) : t().type === "Actions" ? e(oe, 9) : t().type === "Button" ? e(se, 10) : t().type === "LinkButton" && e(ce, 11);
		}), B(e, g);
	}, h = !0, g = e(x(oy())), v = e(null), C = w(() => Wv(o.card)), T = b(() => o.card);
	_(() => {
		let e = o.card;
		e !== T && b(() => {
			T = e, f(v, null);
		});
	});
	let E = b(() => ly(o.room.id, o.message.id, (e) => f(g, e, !0)));
	_(() => {
		let e = o.room;
		b(() => E.sync(e));
	}), de(() => {
		h = !1, E.dispose();
	});
	let O = w(() => o.card.elements[o.card.root]), k = w(() => m(O).type === "Card" && m(O).props.title || o.vb.t("Tabela")), ee = w(() => Lv(o.room, o.message)), F = w(() => Rv(o.room, o.message)), te = w(() => m(g).phase === "pending" || m(g).phase === "unconfirmed");
	function ne(e, t) {
		h && t.currentTarget instanceof HTMLElement && t.currentTarget.isConnected && m(F) && E.reply(e, o.actions.request);
	}
	function re(e, t) {
		if (!h || !(t.currentTarget instanceof HTMLElement) || !t.currentTarget.isConnected) return;
		let n = /^#m(\d+)$/.exec(e);
		if (n) {
			let e = Number(n[1]);
			Number.isSafeInteger(e) && o.actions.navigate(e);
		} else if (e.startsWith("#app:")) {
			let [t, n] = e.slice(5).split("/");
			o.actions.openApp?.({
				connection: t,
				tool: n
			});
		} else e.startsWith("#e") ? o.actions.navigateRich?.({
			kind: "thread",
			id: e.slice(2)
		}) : e.startsWith("#doc") && o.actions.navigateRich?.({
			kind: "document",
			id: e.split(":")[1]
		});
	}
	var ie = Sy(), ae = s(ie);
	p(ae, () => o.card.elements[o.card.root]);
	var z = n(ae, 2), oe = (e) => {
		var t = xy(), n = d(t, !0);
		c((e) => {
			A(t, "role", m(g).phase === "error" ? "alert" : "status"), U(n, e);
		}, [() => m(g).phase === "pending" ? o.vb.t("Enviando…") : m(g).phase === "unconfirmed" ? o.vb.t("Ainda sem confirmação. Confira a sala antes de enviar novamente.") : m(g).error]), B(e, t);
	};
	L(z, (e) => {
		m(g).phase !== "idle" && e(oe);
	}), S(ie), B(i, ie), t();
}
// svelte/features/chat-interactive/ChoicesView.svelte
var wy = z("<span> </span>"), Ty = z("<span class=\"tw:rounded-control tw:border tw:border-primary tw:bg-primary/10 tw:px-3 tw:py-2\"> </span>"), Ey = z("<div class=\"tw:flex tw:flex-wrap tw:gap-2\"><!><!></div>"), Dy = z("<label class=\"tw:flex tw:items-center tw:gap-2 tw:rounded-control tw:border tw:border-border tw:p-2\"><!><span> </span></label>"), Oy = z("<div role=\"group\" class=\"tw:grid tw:gap-2\"></div>"), ky = z("<!><small class=\"tw:block tw:text-muted-foreground\"> </small>", 1), Ay = z("<span class=\"tw:rounded-control tw:border tw:border-border tw:px-3 tw:py-2 tw:text-muted-foreground\"> </span>"), jy = z("<div class=\"tw:flex tw:flex-wrap tw:gap-2\"></div> <small class=\"tw:block tw:text-muted-foreground\"> </small>", 1), My = z("<div data-native-choices=\"\" data-vb-native=\"\" class=\"tw:space-y-2 tw:font-sans tw:text-sm tw:text-foreground\"><!></div>");
function Ny(r, i) {
	D(i, !0);
	let o = !0, l = e(x([])), u = e(""), p = b(() => i.message.choices);
	_(() => {
		let e = i.message.choices;
		e !== p && b(() => {
			p = e, f(l, [], !0), f(u, "");
		});
	}), de(() => {
		o = !1;
	});
	let h = w(() => Lv(i.room, i.message)), g = w(() => Rv(i.room, i.message) && !i.choices.closed), v = w(() => new Set(m(h)?.text.split(" · ") || []));
	function y(e, t = !0) {
		let n = i.room.messages.find((e) => e.id === i.message.id) || i.room.origins?.find((e) => e.id === i.message.id);
		if (!o || !n || n.choices !== i.message.choices || !Rv(i.room, n) || i.choices.closed) return;
		i.choices.multi ? f(l, t ? [...m(l).filter((t) => t !== e), e].sort((e, t) => e - t) : m(l).filter((t) => t !== e), !0) : f(l, [e], !0);
		let r = e === -1 && t ? "" : m(l).filter((e) => e >= 0).map((e) => i.choices.options[e]).join(" · ");
		i.actions.draftReply({
			messageId: i.message.id,
			thread: i.message.thread,
			text: r
		});
	}
	var C = My(), T = s(C), E = (e) => {
		var t = Ey(), r = s(t);
		R(r, 17, () => i.choices.options, N, (e, t) => {
			var n = wy(), r = d(n);
			c((e, i) => {
				M(n, 1, e), U(r, `${i ?? ""}${m(t) ?? ""}`);
			}, [() => j(m(v).has(m(t)) ? "tw:rounded-control tw:border tw:border-primary tw:bg-primary/10 tw:px-3 tw:py-2" : "tw:rounded-control tw:border tw:border-border tw:px-3 tw:py-2"), () => m(v).has(m(t)) ? "✓ " : ""]), B(e, n);
		});
		var a = n(r), o = (e) => {
			var t = Ty(), n = d(t);
			c((e) => U(n, `✓ ${e ?? ""}`), [() => i.vb.t("Outro")]), B(e, t);
		}, l = w(() => !i.choices.options.some((e) => m(v).has(e)));
		L(a, (e) => {
			m(l) && e(o);
		}), S(t), B(e, t);
	}, O = (e) => {
		var t = ky(), r = a(t), o = (e) => {
			var t = Oy();
			R(t, 21, () => [...i.choices.options, i.vb.t("Outro") + "…"], N, (e, t, r) => {
				let a = w(() => r === i.choices.options.length ? -1 : r);
				var o = Dy(), u = s(o);
				{
					let e = w(() => m(l).includes(m(a)));
					it(u, {
						get checked() {
							return m(e);
						},
						onchange: (e) => {
							e.currentTarget instanceof HTMLInputElement && e.currentTarget.isConnected && y(m(a), e.currentTarget.checked);
						}
					});
				}
				var f = n(u), p = d(f, !0);
				S(o), c(() => U(p, m(t))), B(e, o);
			}), S(t), c((e) => A(t, "aria-label", e), [() => i.vb.t("Escolha uma opção")]), B(e, t);
		}, p = (e) => {
			{
				let t = w(() => i.vb.t("Escolha uma opção")), n = w(() => [...i.choices.options.map((e, t) => ({
					label: e,
					value: String(t)
				})), {
					label: i.vb.t("Outro") + "…",
					value: "-1"
				}]);
				Et(e, {
					get label() {
						return m(t);
					},
					get items() {
						return m(n);
					},
					onValueChange: (e, t) => {
						t.currentTarget instanceof HTMLInputElement && t.currentTarget.isConnected && y(Number(e));
					},
					get value() {
						return m(u);
					},
					set value(e) {
						f(u, e, !0);
					}
				});
			}
		};
		L(r, (e) => {
			i.choices.multi ? e(o) : e(p, -1);
		});
		var h = n(r), g = d(h, !0);
		c((e) => U(g, e), [() => i.vb.t("escolha e envie pela caixa de mensagem")]), B(e, t);
	}, k = (e) => {
		var t = jy(), r = a(t);
		R(r, 21, () => i.choices.options, N, (e, t) => {
			var n = Ay(), r = d(n, !0);
			c(() => U(r, m(t))), B(e, n);
		}), S(r);
		var o = n(r, 2), s = d(o, !0);
		c((e) => U(s, e), [() => i.choices.closed ? i.vb.t("foi pro terminal") : i.vb.t("esperando {who}", { who: i.vb.name(i.message.author) })]), B(e, t);
	};
	L(T, (e) => {
		m(h) ? e(E) : m(g) ? e(O, 1) : e(k, -1);
	}), S(C), B(r, C), t();
}
// svelte/features/chat-interactive/PermissionAsk.svelte
var Py = z("<p role=\"status\" class=\"tw:m-0 tw:rounded-control tw:border tw:border-border tw:bg-muted tw:p-3\"> </p>"), Fy = z("<p class=\"tw:m-0 tw:text-muted-foreground\"> </p>"), Iy = z("<div class=\"tw:flex tw:flex-wrap tw:gap-2\"><!><!></div>"), Ly = z("<span class=\"tw:rounded-control tw:border tw:border-border tw:px-3 tw:py-2\"> </span>"), Ry = z("<div class=\"tw:flex tw:flex-wrap tw:gap-2\"></div> <small class=\"tw:text-muted-foreground\"> </small>", 1), zy = z("<p class=\"tw:m-0 tw:text-xs tw:text-muted-foreground\"> </p>"), By = z("<div data-native-permission=\"\" data-vb-native=\"\" class=\"tw:space-y-2 tw:font-sans tw:text-sm tw:text-foreground\"><!> <!></div> <!>", 1);
function Vy(i, o) {
	D(o, !0);
	let l = !0, u = e(x(oy())), p = e(null), h = e(null), g = e(void 0), v = w(() => JSON.stringify([
		o.message.thread,
		o.message.author,
		o.message.kind,
		o.message.text,
		o.message.choices
	])), y = b(() => ly(o.room.id, o.message.id, (e) => f(u, e, !0), void 0, "permission")), C = w(() => Lv(o.room, o.message)), T = w(() => !!m(C) && /^\s*aprov/i.test(m(C).text)), E = w(() => Rv(o.room, o.message) && !o.choices.closed);
	_(() => {
		let e = o.room;
		b(() => y.sync(e));
	}), _(() => {
		(!m(E) || m(u).phase === "unconfirmed" || m(g) !== void 0 && m(g) !== m(v)) && f(p, null);
	}), de(() => {
		l = !1, y.dispose();
	});
	function O(e, t) {
		l && m(E) && t.currentTarget instanceof HTMLElement && t.currentTarget.isConnected && (f(h, t.currentTarget, !0), f(g, m(v), !0), f(p, e, !0));
	}
	function k() {
		l && m(E) && m(p) && m(g) === m(v) && y.reply(m(p), o.actions.request);
	}
	var j = By(), M = a(j), ee = s(M), P = (e) => {
		var t = Py(), n = d(t);
		c((e, t) => U(n, `${e ?? ""} · ${t ?? ""}`), [() => m(T) ? "✓ " + o.vb.t("Aprovado por {who}", { who: o.vb.name(m(C).author) }) : "✕ " + o.vb.t("Negado por {who}", { who: o.vb.name(m(C).author) }), () => o.vb.hhmm(m(C).ts)]), B(e, t);
	}, F = (e) => {
		var t = Fy(), n = d(t, !0);
		c((e) => U(n, e), [() => o.vb.t("foi pro terminal")]), B(e, t);
	}, te = (e) => {
		var t = Iy(), i = s(t);
		{
			let e = w(() => m(u).phase === "pending" || m(u).phase === "unconfirmed");
			V(i, {
				"data-native-permission-value": "Aprovar",
				get disabled() {
					return m(e);
				},
				onclick: (e) => O("Aprovar", e),
				children: (e, t) => {
					r();
					var n = I();
					c((e) => U(n, e), [() => o.vb.t("Aprovar")]), B(e, n);
				},
				$$slots: { default: !0 }
			});
		}
		var a = n(i);
		{
			let e = w(() => m(u).phase === "pending" || m(u).phase === "unconfirmed");
			V(a, {
				"data-native-permission-value": "Negar",
				variant: "outline",
				get disabled() {
					return m(e);
				},
				onclick: (e) => O("Negar", e),
				children: (e, t) => {
					r();
					var n = I();
					c((e) => U(n, e), [() => o.vb.t("Negar")]), B(e, n);
				},
				$$slots: { default: !0 }
			});
		}
		S(t), B(e, t);
	}, ne = (e) => {
		var t = Ry(), r = a(t);
		R(r, 21, () => o.choices.options, N, (e, t) => {
			var n = Ly(), r = d(n, !0);
			c(() => U(r, m(t))), B(e, n);
		}), S(r);
		var i = n(r, 2), s = d(i, !0);
		c((e) => U(s, e), [() => o.vb.t("esperando {who}", { who: o.vb.name(o.message.author) })]), B(e, t);
	};
	L(ee, (e) => {
		m(C) ? e(P) : o.choices.closed ? e(F, 1) : m(E) ? e(te, 2) : e(ne, -1);
	});
	var re = n(ee, 2), ie = (e) => {
		var t = zy(), n = d(t, !0);
		c((e) => {
			A(t, "role", m(u).phase === "error" ? "alert" : "status"), U(n, e);
		}, [() => m(u).phase === "pending" ? o.vb.t("Enviando…") : m(u).phase === "unconfirmed" ? o.vb.t("Ainda sem confirmação. Confira a sala antes de enviar novamente.") : m(u).error]), B(e, t);
	};
	L(re, (e) => {
		m(u).phase !== "idle" && e(ie);
	}), S(M);
	var ae = n(M, 2);
	{
		let e = w(() => m(p) !== null && m(E) && m(g) === m(v)), t = w(() => m(p) === "Aprovar" ? o.vb.t("Aprovar este pedido?") : o.vb.t("Negar este pedido?")), n = w(() => o.vb.t("Confirmar")), r = w(() => o.vb.t("Cancelar")), i = w(() => m(u).phase === "pending"), a = w(() => m(u).phase === "error" ? m(u).error : "");
		Qm(ae, {
			get open() {
				return m(e);
			},
			get title() {
				return m(t);
			},
			get confirmLabel() {
				return m(n);
			},
			get cancelLabel() {
				return m(r);
			},
			get busy() {
				return m(i);
			},
			get error() {
				return m(a);
			},
			onconfirm: k,
			onOpenChange: (e) => {
				e || f(p, null);
			},
			returnFocus: () => m(h)
		});
	}
	B(i, j), t();
}
// svelte/features/chat-interactive/PollView.svelte
var Hy = z("<span><!></span>"), Uy = z("<!><span class=\"tw:min-w-0 tw:flex-1 tw:break-words\"> </span><span class=\"tw:flex tw:-space-x-2\"></span><span class=\"tw:shrink-0 tw:text-xs\"> </span>", 1), Wy = z("<div class=\"tw:space-y-1\"><!><!></div>"), Gy = z("· <!>", 1), Ky = z("<p class=\"tw:m-0 tw:text-xs tw:text-muted-foreground\"> </p>"), qy = z("<section data-vb-native=\"\" class=\"tw:space-y-3 tw:rounded-surface tw:border tw:border-border tw:bg-card tw:p-4 tw:font-sans tw:text-sm tw:text-card-foreground\"><h4 class=\"tw:m-0 tw:flex tw:items-start tw:gap-2 tw:font-sans tw:text-sm tw:font-semibold tw:tracking-normal tw:[font-variation-settings:normal]\"><!> </h4> <!> <p class=\"tw:m-0 tw:flex tw:flex-wrap tw:items-center tw:gap-1 tw:text-xs tw:text-muted-foreground\"> <!></p> <!></section> <!>", 1);
function Jy(i, o) {
	D(o, !0);
	let l = !0, u = e(x(oy())), p = e(!1), h = e(null), g = e(void 0), v = w(() => JSON.stringify([
		o.message.id,
		o.message.thread,
		o.message.poll,
		Hv(o.poll)
	])), y = b(() => ly(o.room.id, o.message.id, (e) => f(u, e, !0), void 0, "poll")), C = w(() => zv(o.poll, o.room.me)), T = w(() => Bv(o.room, o.poll)), E = w(() => !o.poll.closed && o.room.members.includes(o.room.me));
	_(() => {
		let e = o.room;
		b(() => y.sync(e));
	}), _(() => {
		(!m(T) || m(u).phase === "unconfirmed" || m(g) !== void 0 && m(g) !== m(v)) && f(p, !1);
	}), de(() => {
		l = !1, y.dispose();
	});
	function O(e, t) {
		l && t.currentTarget instanceof HTMLElement && t.currentTarget.isConnected && m(E) && y.vote(e, o.actions.request);
	}
	function k() {
		l && m(T) && m(p) && m(g) === m(v) && y.close(o.actions.request);
	}
	var j = qy(), M = a(j), ee = s(M), P = s(ee);
	Dt(P, { name: "chart" });
	var F = n(P, 1, !0);
	S(ee);
	var te = n(ee, 2);
	R(te, 17, () => m(C).rows, N, (e, t) => {
		var r = Wy(), i = s(r);
		{
			let e = w(() => m(t).mine ? "secondary" : "outline"), r = w(() => !m(E) || m(u).phase === "pending" || m(u).phase === "unconfirmed");
			V(i, {
				class: "tw:h-auto tw:w-full tw:justify-start tw:whitespace-normal tw:text-left",
				get "data-native-vote"() {
					return m(t).index;
				},
				get variant() {
					return m(e);
				},
				get disabled() {
					return m(r);
				},
				get "aria-pressed"() {
					return m(t).mine;
				},
				onclick: (e) => O(m(t).index, e),
				children: (e, r) => {
					var i = Uy(), l = a(i), u = (e) => {
						Dt(e, { name: "trophy" });
					}, f = (e) => {
						Dt(e, { name: "check" });
					};
					L(l, (e) => {
						m(t).winner ? e(u) : m(t).mine && e(f, 1);
					});
					var p = n(l), h = d(p, !0), g = n(p);
					R(g, 21, () => m(t).voters, N, (e, t) => {
						var n = Hy(), r = s(n);
						{
							let e = w(() => o.vb.name(m(t))), n = w(() => o.vb.avatarUrl?.(m(t)));
							ut(r, {
								get name() {
									return m(e);
								},
								get src() {
									return m(n);
								},
								class: "tw:size-6 tw:text-[10px]"
							});
						}
						S(n), c((e) => A(n, "title", e), [() => o.vb.name(m(t))]), B(e, n);
					}), S(g);
					var _ = n(g), v = d(_, !0);
					c(() => {
						U(h, m(t).label), U(v, m(t).count ? `${m(t).percent}%` : "");
					}), B(e, i);
				},
				$$slots: { default: !0 }
			});
		}
		var l = n(i);
		{
			let e = w(() => `${m(t).label}: ${m(t).count} (${m(t).percent}%)`);
			Vl(l, {
				get value() {
					return m(t).percent;
				},
				get label() {
					return m(e);
				}
			});
		}
		S(r), B(e, r);
	});
	var ne = n(te, 2), re = s(ne), ie = n(re), ae = (e) => {
		var t = I();
		c((e) => U(t, `· ${e ?? ""}`), [() => o.vb.t("encerrada")]), B(e, t);
	}, z = (e) => {
		var t = Gy(), i = n(a(t));
		{
			let e = w(() => m(u).phase === "pending" || m(u).phase === "unconfirmed");
			V(i, {
				size: "sm",
				variant: "link",
				"data-native-poll-close": !0,
				get disabled() {
					return m(e);
				},
				onclick: (e) => {
					l && m(T) && e.currentTarget.isConnected && (f(h, e.currentTarget, !0), f(g, m(v), !0), f(p, !0));
				},
				children: (e, t) => {
					r();
					var n = I();
					c((e) => U(n, e), [() => o.vb.t("encerrar")]), B(e, n);
				},
				$$slots: { default: !0 }
			});
		}
		B(e, t);
	};
	L(ie, (e) => {
		o.poll.closed ? e(ae) : m(T) && e(z, 1);
	}), S(ne);
	var oe = n(ne, 2), se = (e) => {
		var t = Ky(), n = d(t, !0);
		c((e) => {
			A(t, "role", m(u).phase === "error" ? "alert" : "status"), U(n, e);
		}, [() => m(u).phase === "pending" ? o.vb.t("Enviando…") : m(u).phase === "unconfirmed" ? o.vb.t("Ainda sem confirmação. Confira a sala antes de enviar novamente.") : m(u).error]), B(e, t);
	};
	L(oe, (e) => {
		m(u).phase !== "idle" && e(se);
	}), S(M);
	var ce = n(M, 2);
	{
		let e = w(() => m(p) && m(T) && m(g) === m(v)), t = w(() => o.vb.t("Encerrar a votação?")), n = w(() => o.vb.t("Confirmar")), r = w(() => o.vb.t("Cancelar")), i = w(() => m(u).phase === "pending"), a = w(() => m(u).phase === "error" ? m(u).error : "");
		Qm(ce, {
			get open() {
				return m(e);
			},
			get title() {
				return m(t);
			},
			get confirmLabel() {
				return m(n);
			},
			get cancelLabel() {
				return m(r);
			},
			get busy() {
				return m(i);
			},
			get error() {
				return m(a);
			},
			onconfirm: k,
			onOpenChange: (e) => {
				e || f(p, !1);
			},
			returnFocus: () => m(h)
		});
	}
	c((e, t) => {
		A(M, "data-native-poll", o.poll.id), U(F, o.poll.question), U(re, `${e ?? ""} · ${t ?? ""}`);
	}, [() => m(C).voters === 1 ? o.vb.t("1 pessoa votou") : o.vb.t("{n} pessoas votaram", { n: m(C).voters }), () => o.poll.multi ? o.vb.t("pode escolher várias") : o.vb.t("escolha uma")]), B(i, j), t();
}
// svelte/features/chat-interactive/InteractiveBody.svelte
var Yy = z("<pre data-native-card-fallback=\"\" class=\"tw:max-w-full tw:overflow-auto tw:whitespace-pre-wrap tw:break-words tw:font-mono tw:text-xs\"> </pre>"), Xy = z("<!> <!> <!>", 1);
function Zy(e, r) {
	D(r, !0);
	let i = w(() => r.message.card), o = w(() => r.message.choices), s = w(() => r.room.id), l = w(() => Iv(m(i), m(s))), u = w(() => Fv(m(o))), f = w(() => r.message.poll ? r.room.polls?.[r.message.poll] : void 0);
	var p = P(), h = a(p);
	F(h, () => `${r.room.id}:${r.room.me}:${r.message.id}:${r.message.thread}`, (e) => {
		var t = Xy(), o = a(t), s = (e) => {
			var t = Yy(), n = d(t, !0);
			c(() => U(n, m(i))), B(e, t);
		}, p = (e) => {
			Cy(e, {
				get card() {
					return m(l);
				},
				get message() {
					return r.message;
				},
				get room() {
					return r.room;
				},
				get actions() {
					return r.actions;
				},
				get vb() {
					return r.vb;
				}
			});
		};
		L(o, (e) => {
			m(i) && m(i).length > 1e6 ? e(s) : m(l) && e(p, 1);
		});
		var h = n(o, 2), g = (e) => {
			var t = P(), n = a(t), i = (e) => {
				Vy(e, {
					get choices() {
						return m(u);
					},
					get message() {
						return r.message;
					},
					get room() {
						return r.room;
					},
					get actions() {
						return r.actions;
					},
					get vb() {
						return r.vb;
					}
				});
			}, o = w(() => kv(r.message)), s = (e) => {
				Ny(e, {
					get choices() {
						return m(u);
					},
					get message() {
						return r.message;
					},
					get room() {
						return r.room;
					},
					get actions() {
						return r.actions;
					},
					get vb() {
						return r.vb;
					}
				});
			};
			L(n, (e) => {
				m(o) ? e(i) : e(s, -1);
			}), B(e, t);
		};
		L(h, (e) => {
			m(u) && e(g);
		});
		var _ = n(h, 2), v = (e) => {
			Jy(e, {
				get poll() {
					return m(f);
				},
				get message() {
					return r.message;
				},
				get room() {
					return r.room;
				},
				get actions() {
					return r.actions;
				},
				get vb() {
					return r.vb;
				}
			});
		};
		L(_, (e) => {
			m(f) && e(v);
		}), B(e, t);
	}), B(e, p), t();
}
// svelte/features/chat/clipboard.ts
async function Qy(e) {
	let t = document.createElement("textarea");
	t.value = e, t.readOnly = !0, t.className = "tw:fixed tw:left-0 tw:top-0 tw:opacity-0 tw:text-base";
	let n = document.activeElement;
	document.body.append(t), t.focus({ preventScroll: !0 }), t.setSelectionRange(0, e.length);
	let r = !1;
	try {
		r = document.execCommand("copy");
	} catch {} finally {
		t.remove(), n instanceof HTMLElement && n.isConnected && n.focus({ preventScroll: !0 });
	}
	if (!r) {
		if (!navigator.clipboard) throw Error("clipboard unavailable");
		await navigator.clipboard.writeText(e);
	}
}
// svelte/features/chat/MessageActions.svelte
var $y = z("<span role=\"status\" class=\"tw:text-xs tw:text-muted-foreground\"> </span>"), eb = z("<span role=\"alert\" class=\"tw:text-xs tw:text-destructive\"> </span><!>", 1), tb = z("<div data-message-actions=\"\" class=\"tw:flex tw:flex-wrap tw:items-center tw:gap-1\"><!> <!> <!> <!> <!></div>");
function nb(i, o) {
	D(o, !0);
	let l = H(o, "showLink", 3, !0), u = e(null), p = e(!1), h = e(!1), g = !0, _ = 0;
	de(() => {
		g = !1, _++;
	});
	async function v(e = !1) {
		if (!g) return;
		f(h, e, !0);
		let t = ++_;
		f(u, null), f(p, !1);
		let n = e ? `${location.origin}/b/${o.roomId}${o.message.thread && o.message.thread !== "main" ? `?t=${encodeURIComponent(o.message.thread)}` : ""}#m${o.message.id}` : o.message.text || o.message.files?.map((e) => e.name).join("\n") || "";
		if (!n) f(u, "empty");
		else try {
			await Qy(n), g && t === _ && (f(p, !0), navigator.vibrate?.(15));
		} catch {
			g && t === _ && f(u, "clipboard");
		}
	}
	var y = { copy: v }, b = tb(), x = s(b);
	{
		let e = w(() => o.vb.t("Copiar o texto desta mensagem"));
		mt(x, {
			icon: "copy",
			get label() {
				return m(e);
			},
			get "data-native-copy"() {
				return o.message.id;
			},
			onclick: () => {
				v();
			}
		});
	}
	var C = n(x, 2), T = (e) => {
		{
			let t = w(() => o.vb.t("Copiar o link desta mensagem"));
			mt(e, {
				icon: "link",
				get label() {
					return m(t);
				},
				get "data-native-copylink"() {
					return o.message.id;
				},
				onclick: () => {
					v(!0);
				}
			});
		}
	};
	L(C, (e) => {
		l() && e(T);
	});
	var E = n(C, 2);
	{
		let e = w(() => o.vb.t("Responder a esta mensagem"));
		mt(E, {
			icon: "reply",
			get label() {
				return m(e);
			},
			get "data-native-reply"() {
				return o.message.id;
			},
			onclick: () => {
				g && o.actions.reply(o.message.id);
			}
		});
	}
	var O = n(E, 2), k = (e) => {
		var t = $y(), n = d(t, !0);
		c((e) => U(n, e), [() => o.vb.t("Copiado")]), B(e, t);
	};
	L(O, (e) => {
		m(p) && e(k);
	});
	var A = n(O, 2), j = (e) => {
		var t = eb(), i = a(t), s = d(i, !0), l = n(i), f = (e) => {
			V(e, {
				variant: "outline",
				size: "sm",
				onclick: () => {
					v(m(h));
				},
				children: (e, t) => {
					r();
					var n = I();
					c((e) => U(n, e), [() => o.vb.t("Copiar")]), B(e, n);
				},
				$$slots: { default: !0 }
			});
		};
		L(l, (e) => {
			m(u) === "clipboard" && e(f);
		}), c((e) => U(s, e), [() => o.vb.t(m(u) === "empty" ? "Essa mensagem não tem texto pra copiar." : "O navegador pediu um toque pra copiar.")]), B(e, t);
	};
	return L(A, (e) => {
		m(u) && e(j);
	}), S(b), B(i, b), t(y);
}
// svelte/features/chat/MessageFooter.svelte
var rb = z("<span aria-hidden=\"true\" class=\"tw:inline-block tw:animate-spin tw:motion-reduce:animate-none\">✻</span> ", 1), ib = z("· <time> </time>", 1), ab = z("<span><!> <!></span>"), ob = z("<span><!><span aria-hidden=\"true\" class=\"tw:absolute tw:-right-1 tw:-bottom-1 tw:rounded-full tw:bg-card tw:px-0.5 tw:text-xs\"> </span></span>"), sb = z("<span> </span>"), cb = z("<!> <!><span aria-hidden=\"true\"> </span>", 1), lb = z("<div class=\"tw:flex tw:items-center tw:gap-2\"><!><span class=\"tw:min-w-0 tw:flex-1 tw:break-words\"> </span><span> </span></div>"), ub = z("<div role=\"tooltip\" class=\"tw:absolute tw:bottom-full tw:left-0 tw:z-20 tw:mb-2 tw:w-72 tw:max-w-[80vw] tw:space-y-2 tw:rounded-surface tw:border tw:border-border tw:bg-popover tw:p-3 tw:text-popover-foreground tw:shadow-md\"></div>"), db = z("<div role=\"group\" class=\"tw:relative\"><!> <!></div>"), fb = z("<div data-message-footer=\"\" class=\"tw:mt-2 tw:flex tw:flex-wrap tw:items-center tw:gap-2 tw:text-xs tw:text-muted-foreground\"><!> <!></div>");
function pb(r, i) {
	let o = ee();
	D(i, !0);
	let l = e(!1), u = e(!1), p = e(!1), h = e(!1), g = w(() => !m(h) && (m(l) || m(u) || m(p))), _ = w(() => i.footer.readers.filter((e) => e.read).length), v = w(() => m(_) === i.footer.readers.length ? i.vb.t("visto por {n}", { n: m(_) }) : i.vb.t("visto por {n} de {m}", {
		n: m(_),
		m: i.footer.readers.length
	})), y = (e, t) => i.vb.t("{via} de {who}", {
		via: b_(e),
		who: i.vb.name(t)
	});
	var b = fb(), x = s(b);
	R(x, 17, () => i.footer.statuses, (e) => `${e.ack.who}|${e.ack.email}`, (e, t) => {
		var r = ab(), o = s(r), l = (e) => {
			var n = I();
			c((e) => U(n, `⏸ ${e ?? ""}${m(t).ack.note ? `: ${m(t).ack.note}` : ""}`), [() => i.vb.t("{who} espera você no terminal", { who: y(m(t).ack.who, m(t).ack.email) })]), B(e, n);
		}, u = (e) => {
			var r = rb(), o = n(a(r));
			c((e) => U(o, ` ${e ?? ""}`), [() => i.vb.t("{who} está fazendo isso", { who: y(m(t).ack.who, m(t).ack.email) })]), B(e, r);
		}, f = (e) => {
			var n = I();
			c((e) => U(n, `✓ ${e ?? ""}`), [() => i.vb.t("{who} fez isso", { who: y(m(t).ack.who, m(t).ack.email) })]), B(e, n);
		}, p = (e) => {
			var n = I();
			c((e) => U(n, `⏳ ${e ?? ""}`), [() => i.vb.t("aguardando {who}", { who: m(t).owners.map(i.vb.name).join(", ") })]), B(e, n);
		}, h = (e) => {
			var n = I();
			c((e) => U(n, `– ${e ?? ""}`), [() => i.vb.t("{who} parou", { who: y(m(t).ack.who, m(t).ack.email) })]), B(e, n);
		};
		L(o, (e) => {
			m(t).kind === "blocked" ? e(l) : m(t).kind === "doing" ? e(u, 1) : m(t).kind === "done" ? e(f, 2) : m(t).kind === "waiting" ? e(p, 3) : e(h, -1);
		});
		var g = n(o, 2), _ = (e) => {
			var r = ib(), o = n(a(r)), s = d(o, !0);
			c((e, t) => {
				A(o, "title", e), U(s, t);
			}, [() => i.vb.dateTime?.(m(t).ack.ts), () => i.vb.ago(m(t).ack.ts)]), B(e, r);
		}, v = w(() => [
			"blocked",
			"doing",
			"idle"
		].includes(m(t).kind));
		L(g, (e) => {
			m(v) && e(_);
		}), S(r), c(() => {
			A(r, "data-ack-state", m(t).kind), M(r, 1, j(m(t).kind === "blocked" ? "tw:whitespace-pre-wrap tw:break-words tw:text-warning" : "tw:whitespace-pre-wrap tw:break-words"));
		}), B(e, r);
	});
	var C = n(x, 2), T = (e) => {
		var t = db(), r = s(t);
		{
			let e = w(() => `${o}-readers`), t = w(() => m(g) ? `${o}-readers` : void 0);
			V(r, {
				variant: "ghost",
				size: "sm",
				class: "tw:h-auto tw:gap-1 tw:px-1 tw:py-1",
				get "aria-label"() {
					return m(v);
				},
				get "aria-expanded"() {
					return m(g);
				},
				get "aria-controls"() {
					return m(e);
				},
				get "aria-describedby"() {
					return m(t);
				},
				onfocus: () => {
					f(p, !0), f(h, !1);
				},
				onblur: () => {
					f(p, !1), f(l, !1);
				},
				onclick: () => {
					f(l, !m(l)), f(h, !m(l));
				},
				onkeydown: (e) => {
					e.key === "Escape" && (f(h, !0), f(l, !1), e.stopPropagation());
				},
				children: (e, t) => {
					var r = cb(), o = a(r);
					R(o, 17, () => i.footer.readers.slice(0, 5), (e) => `${e.receipt.who}|${e.receipt.email}`, (e, t) => {
						var r = ob(), a = s(r);
						{
							let e = w(() => i.vb.name(m(t).receipt.email)), n = w(() => i.vb.avatarUrl?.(m(t).receipt.email));
							ut(a, {
								get name() {
									return m(e);
								},
								get src() {
									return m(n);
								},
								class: "tw:size-6"
							});
						}
						var o = n(a), l = d(o, !0);
						S(r), c((e) => {
							A(r, "data-reader-read", m(t).read), M(r, 1, j(m(t).read ? "tw:relative tw:inline-flex" : "tw:relative tw:inline-flex tw:opacity-50")), U(l, e);
						}, [() => x_(m(t).receipt.who)]), B(e, r);
					});
					var l = n(o, 2), u = (e) => {
						var t = sb(), n = d(t);
						c(() => U(n, `+${i.footer.readers.length - 5}`)), B(e, t);
					};
					L(l, (e) => {
						i.footer.readers.length > 5 && e(u);
					});
					var f = n(l), p = d(f, !0);
					c(() => U(p, m(_) ? "✓✓" : "✓")), B(e, r);
				},
				$$slots: { default: !0 }
			});
		}
		var b = n(r, 2), x = (e) => {
			var t = ub();
			R(t, 21, () => i.footer.readers, (e) => `${e.receipt.who}|${e.receipt.email}`, (e, t) => {
				var r = lb(), a = s(r);
				{
					let e = w(() => i.vb.name(m(t).receipt.email)), n = w(() => i.vb.avatarUrl?.(m(t).receipt.email));
					ut(a, {
						get name() {
							return m(e);
						},
						get src() {
							return m(n);
						},
						class: "tw:size-6"
					});
				}
				var o = n(a), l = d(o, !0), u = n(o), f = d(u, !0);
				S(r), c((e, t) => {
					U(l, e), U(f, t);
				}, [() => y(m(t).receipt.who, m(t).receipt.email), () => i.vb.t(m(t).read ? "leu" : "recebeu")]), B(e, r);
			}), S(t), c(() => A(t, "id", `${o}-readers`)), B(e, t);
		};
		L(b, (e) => {
			m(g) && e(x);
		}), S(t), c(() => A(t, "aria-label", m(v))), se("pointerenter", t, () => {
			f(u, !0), f(h, !1);
		}), se("pointerleave", t, () => {
			f(u, !1);
		}), B(e, t);
	};
	L(C, (e) => {
		i.footer.readers.length && e(T);
	}), S(b), B(r, b), t();
}
// svelte/features/chat/Embed.svelte
var mb = z("<p class=\"tw:m-0 tw:text-xs tw:text-muted-foreground\"> </p>"), hb = z("<div role=\"group\" class=\"tw:space-y-3 tw:rounded-surface tw:border tw:border-border tw:bg-card tw:p-3\"><p class=\"tw:m-0\"> </p> <q class=\"tw:block tw:break-words tw:text-xs tw:text-muted-foreground\"> </q> <div class=\"tw:flex tw:flex-wrap tw:gap-2\"><!><!></div></div>"), gb = z("<div data-chat-embed=\"\" class=\"tw:w-full tw:space-y-2\"><iframe sandbox=\"allow-scripts\" loading=\"lazy\" class=\"tw:w-full tw:rounded-control tw:border tw:border-border\"></iframe> <a class=\"tw:inline-flex tw:items-center tw:gap-1 tw:rounded-control tw:text-xs tw:text-link tw:focus-visible:outline-2 tw:focus-visible:outline-ring\"> </a> <!> <!></div>");
function _b(i, a) {
	D(a, !0);
	let o = e(null), l = e(320), u = e(!1), p = e(null), h = [], g = !0;
	function _() {
		let e = h[0];
		f(p, e ? {
			what: e.what,
			detail: e.detail
		} : null, !0);
	}
	function v(e) {
		h.shift()?.resolve(e), _();
	}
	function y(e, t) {
		return g ? new Promise((n) => {
			h.push({
				what: e,
				detail: t.slice(0, 600),
				resolve: n
			}), h.length === 1 && _();
		}) : Promise.resolve(!1);
	}
	ve(() => {
		let e = m(o) ? a.actions.mountEmbed?.(m(o), a.file, {
			ask: y,
			thread: a.messageThread,
			resize: (e) => {
				if (!g || !Number.isFinite(e)) return;
				let t = Math.min(420, Math.round(window.innerHeight * .55)), n = Math.max(Math.ceil(e) + 2, 40);
				f(l, Math.min(n, t), !0), f(u, n > t);
			}
		}) : void 0;
		return () => {
			g = !1, e?.();
			for (let e of h.splice(0)) e.resolve(!1);
		};
	});
	function b(e) {
		e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey || (e.preventDefault(), e.stopPropagation(), g && a.actions.openFile(a.file));
	}
	var x = gb(), C = s(x);
	le(C, (e) => f(o, e), () => m(o));
	var w = n(C, 2), T = d(w), E = n(w, 2), O = (e) => {
		var t = mb(), n = d(t, !0);
		c(() => U(n, a.file.name)), B(e, t);
	};
	L(E, (e) => {
		m(u) && e(O);
	});
	var k = n(E, 2), j = (e) => {
		var t = hb(), i = s(t), o = d(i, !0), l = n(i, 2), u = d(l, !0), f = n(l, 2), h = s(f);
		V(h, {
			size: "sm",
			onclick: () => v(!0),
			children: (e, t) => {
				r();
				var n = I();
				c((e) => U(n, e), [() => a.vb.t("Permitir")]), B(e, n);
			},
			$$slots: { default: !0 }
		});
		var g = n(h);
		V(g, {
			size: "sm",
			variant: "outline",
			onclick: () => v(!1),
			children: (e, t) => {
				r();
				var n = I();
				c((e) => U(n, e), [() => a.vb.t("Cancelar")]), B(e, n);
			},
			$$slots: { default: !0 }
		}), S(f), S(t), c((e, n) => {
			A(t, "aria-label", e), U(o, n), U(u, m(p).detail);
		}, [() => a.vb.t("Confirmar"), () => a.vb.t("Este app quer {what}, como você:", { what: m(p).what })]), B(e, t);
	};
	L(k, (e) => {
		m(p) && e(j);
	}), S(x), c((e) => {
		A(C, "src", a.url), A(C, "title", a.file.name), A(C, "height", m(l)), A(w, "href", a.url), U(T, `${e ?? ""} ↗`);
	}, [() => a.vb.t("Abrir em tela cheia")]), te("click", w, b), B(i, x), t();
}
Se(["click"]);
// svelte/features/chat/Attachments.svelte
var vb = z("<div class=\"tw:max-w-full tw:space-y-1\"><audio controls=\"\" preload=\"metadata\" class=\"tw:max-w-full\"></audio><a target=\"_blank\" rel=\"noopener\" class=\"tw:block tw:break-words tw:text-xs tw:text-link\"> </a></div>"), yb = z("<a data-message-image=\"\" target=\"_blank\" rel=\"noopener\" class=\"tw:block tw:min-w-[min(220px,100%)] tw:max-w-[min(320px,100%)] tw:rounded-control tw:focus-visible:outline-2 tw:focus-visible:outline-ring\"><img loading=\"lazy\" class=\"tw:box-border tw:block tw:max-h-[260px] tw:min-w-full tw:max-w-full tw:rounded-control tw:border tw:border-border tw:object-cover tw:object-top\"/></a>"), bb = z("<a target=\"_blank\" rel=\"noopener\" class=\"tw:inline-flex tw:max-w-full tw:items-center tw:gap-2 tw:rounded-control tw:border tw:border-border tw:bg-muted tw:px-3 tw:py-2 tw:text-sm tw:text-link tw:focus-visible:outline-2 tw:focus-visible:outline-ring\"><!><span class=\"tw:min-w-0 tw:break-words\"> </span><small class=\"tw:shrink-0 tw:text-muted-foreground\"> </small></a>"), xb = z("<div data-message-attachments=\"\" class=\"tw:mt-2 tw:flex tw:flex-wrap tw:gap-2\"></div>");
function Sb(e, r) {
	D(r, !0);
	let i = H(r, "files", 19, () => []), o = !0;
	de(() => {
		o = !1;
	});
	let l = (e) => `/api/books/${encodeURIComponent(r.roomId)}/files/${encodeURIComponent(e.id)}`;
	function u(e, t) {
		!o || !(e.currentTarget instanceof HTMLElement) || !e.currentTarget.isConnected ? e.preventDefault() : e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || (e.preventDefault(), e.stopPropagation(), r.actions.openFile(t));
	}
	var f = P(), p = a(f), h = (e) => {
		var t = xb();
		R(t, 21, i, (e) => e.id, (e, t) => {
			var i = P(), o = a(i), f = (e) => {
				{
					let n = w(() => l(m(t)));
					_b(e, {
						get url() {
							return m(n);
						},
						get file() {
							return m(t);
						},
						get messageThread() {
							return r.messageThread;
						},
						get actions() {
							return r.actions;
						},
						get vb() {
							return r.vb;
						}
					});
				}
			}, p = (e) => {
				var r = vb(), i = s(r), a = n(i), o = d(a);
				S(r), c((e, n, r) => {
					A(i, "src", e), A(a, "href", n), A(a, "download", m(t).name), U(o, `${m(t).name ?? ""} · ${r ?? ""}`);
				}, [
					() => l(m(t)),
					() => l(m(t)),
					() => Ap(m(t).size)
				]), B(e, r);
			}, h = w(() => m(t).type.startsWith("audio/")), g = (e) => {
				var n = yb(), r = d(n);
				c((e, i) => {
					A(n, "href", e), A(r, "src", i), A(r, "alt", m(t).name);
				}, [() => l(m(t)), () => l(m(t))]), te("click", n, (e) => u(e, m(t))), B(e, n);
			}, _ = w(() => m(t).type.startsWith("image/")), v = (e) => {
				var r = bb(), i = s(r);
				Dt(i, { name: "file" });
				var a = n(i), o = d(a, !0), f = n(a), p = d(f, !0);
				S(r), c((e, n) => {
					A(r, "href", e), U(o, m(t).name), U(p, n);
				}, [() => l(m(t)), () => Ap(m(t).size)]), te("click", r, (e) => u(e, m(t))), B(e, r);
			};
			L(o, (e) => {
				m(t).embed ? e(f) : m(h) ? e(p, 1) : m(_) ? e(g, 2) : e(v, -1);
			}), B(e, i);
		}), S(t), B(e, t);
	};
	L(p, (e) => {
		i().length && e(h);
	}), B(e, f), t();
}
Se(["click"]);
// svelte/features/room-sidebar/ThreadCards.svelte
var Cb = z("<!> <span class=\"tw:min-w-0 tw:flex-1\"><strong class=\"tw:block tw:font-semibold\"> </strong><small class=\"tw:block tw:text-xs tw:text-muted-foreground\"> </small></span><span aria-hidden=\"true\">→</span>", 1), wb = z("<small> </small>"), Tb = z("<a target=\"_blank\" rel=\"noopener noreferrer\" class=\"tw:inline-flex tw:max-w-full tw:items-center tw:gap-1 tw:rounded-control tw:border tw:border-border tw:px-2 tw:py-1 tw:text-xs tw:text-foreground tw:no-underline tw:hover:bg-muted\"><!><span class=\"tw:truncate\"> </span><!></a>"), Eb = z("<small class=\"tw:text-xs tw:text-muted-foreground\"> </small>"), Db = z("<div class=\"tw:flex tw:flex-wrap tw:gap-2 tw:py-2\"><!><!></div>"), Ob = z("<!> <!>", 1);
function kb(e, i) {
	D(i, !0);
	let o = w(() => i.room.epics), l = w(() => i.room.messages), u = w(() => i.room.counts), f = w(() => i.room.countsAt), p = w(() => m(o).filter((e) => e.from_msg === i.messageId).map((e) => {
		let t = m(l).filter((t) => t.thread === e.id);
		return {
			epic: e,
			files: I_({
				epics: m(o),
				messages: m(l)
			}, e.id),
			last: t[t.length - 1],
			count: F_({
				messages: m(l),
				counts: m(u),
				countsAt: m(f)
			}, e.id)
		};
	}));
	var h = P(), g = a(h);
	R(g, 17, () => m(p), ({ epic: e, files: t, last: n, count: r }) => e.id, (e, t) => {
		let o = () => m(t).epic, l = () => m(t).files, u = () => m(t).last, f = () => m(t).count;
		var p = Ob(), h = a(p);
		V(h, {
			variant: "outline",
			get "data-thread-card"() {
				return o().id;
			},
			class: "tw:mt-2 tw:h-auto tw:w-full tw:justify-start tw:gap-3 tw:whitespace-normal tw:p-3 tw:text-left",
			onclick: (e) => {
				e.currentTarget.isConnected && i.room.epics.some((e) => e.id === o().id) && i.actions.navigateRich?.({
					kind: "thread",
					id: o().id
				});
			},
			children: (e, t) => {
				var l = Cb(), p = a(l);
				{
					let e = w(() => o().owner ? i.vb.name(o().owner) : o().title), t = w(() => o().owner ? i.vb.avatarUrl?.(o().owner) : void 0);
					ut(p, {
						get name() {
							return m(e);
						},
						get src() {
							return m(t);
						}
					});
				}
				var h = n(p, 2), g = s(h), _ = d(g, !0), v = n(g), y = d(v);
				S(h), r(), c((e, t, n, r) => {
					U(_, o().title), U(y, `${e ?? ""}${t ?? ""}${n ?? ""}${r ?? ""}`);
				}, [
					() => o().archived ? `✓ ${i.vb.t("concluído")} · ` : "",
					() => o().tasks.length ? `${i.vb.t("{d}/{n} tarefas", {
						d: o().tasks.filter((e) => e.status === "done").length,
						n: o().tasks.length
					})} · ` : "",
					() => f() === 1 ? i.vb.t("1 resposta") : i.vb.t("{n} respostas", { n: f() }),
					() => u() ? ` · ${i.vb.ago(u().ts) === i.vb.t("agora") ? i.vb.t("agora") : i.vb.t("última há {ago}", { ago: i.vb.ago(u().ts) })}` : ""
				]), B(e, l);
			},
			$$slots: { default: !0 }
		});
		var g = n(h, 2), _ = (e) => {
			var t = Db(), r = s(t);
			R(r, 17, () => l().slice(0, 6), (e) => e.name, (e, t) => {
				var r = Tb(), a = s(r);
				Dt(a, { name: "file" });
				var o = n(a), l = d(o, !0), u = n(o), f = (e) => {
					var n = wb(), r = d(n);
					c(() => U(r, `v${m(t).n ?? ""}`)), B(e, n);
				};
				L(u, (e) => {
					m(t).n > 1 && e(f);
				}), S(r), c((e) => {
					A(r, "href", e), A(r, "title", m(t).name), U(l, m(t).name);
				}, [() => `/api/books/${encodeURIComponent(i.room.id)}/files/${encodeURIComponent(m(t).id)}?ui=svelte`]), te("click", r, (e) => {
					!e.currentTarget.isConnected || e.button !== 0 || e.metaKey || e.ctrlKey || e.altKey || e.shiftKey || !i.actions.openFileReference || (e.preventDefault(), i.actions.openFileReference({
						roomId: i.room.id,
						id: m(t).id,
						name: m(t).name
					}));
				}), B(e, r);
			});
			var a = n(r), o = (e) => {
				var t = Eb(), n = d(t);
				c(() => U(n, `+${l().length - 6}`)), B(e, t);
			};
			L(a, (e) => {
				l().length > 6 && e(o);
			}), S(t), B(e, t);
		};
		L(g, (e) => {
			l().length && e(_);
		}), B(e, p);
	}), B(e, h), t();
}
Se(["click"]);
// svelte/features/chat/swipe.ts
function Ab(e, t) {
	let n = !0, r = null, i = [
		"tw:translate-x-5",
		"tw:translate-x-10",
		"tw:translate-x-20",
		"tw:-translate-x-5",
		"tw:-translate-x-10",
		"tw:-translate-x-20"
	], a = () => {
		e.classList.remove(...i), e.removeAttribute("data-swipe");
	}, o = (e) => {
		r = null, a();
		let n = e.target;
		t.enabled !== !1 && n instanceof Element && !n.closest("pre,table,iframe,[data-chat-embed],button,a,input,textarea,select") && e.touches.length === 1 && (r = {
			x: e.touches[0].clientX,
			y: e.touches[0].clientY,
			dx: 0,
			locked: !1
		});
	}, s = (t) => {
		if (!r) return;
		if (t.touches.length !== 1) {
			r = null, a();
			return;
		}
		let n = t.touches[0].clientX - r.x, o = t.touches[0].clientY - r.y;
		if (!r.locked) {
			if (Math.abs(o) > 8 && Math.abs(o) >= Math.abs(n)) {
				r = null;
				return;
			}
			if (Math.abs(n) < 10 || Math.abs(n) <= Math.abs(o)) return;
			r.locked = !0;
		}
		t.preventDefault(), r.dx = n, a();
		let s = Math.abs(n) > 60 ? 2 : +(Math.abs(n) > 30);
		e.classList.add(i[s + (n < 0 ? 3 : 0)]), e.dataset.swipe = n > 60 ? "reply" : n < -60 ? "copy" : "tracking";
	}, c = () => {
		let e = r;
		r = null, a(), n && e && (e.dx > 60 ? t.reply() : e.dx < -60 && t.copy());
	}, l = () => {
		r = null, a();
	};
	return e.addEventListener("touchstart", o, { passive: !0 }), e.addEventListener("touchmove", s, { passive: !1 }), e.addEventListener("touchend", c), e.addEventListener("touchcancel", l), {
		update(e) {
			t = e;
		},
		destroy() {
			n = !1, l(), e.removeEventListener("touchstart", o), e.removeEventListener("touchmove", s), e.removeEventListener("touchend", c), e.removeEventListener("touchcancel", l);
		}
	};
}
// svelte/Message.svelte
var jb = z("<span aria-hidden=\"true\" class=\"tw:inline-grid tw:size-8 tw:place-items-center tw:rounded-full tw:bg-primary/10 tw:text-primary\">✦</span>"), Mb = z("<span aria-hidden=\"true\" class=\"tw:block tw:text-center tw:text-xs\"> </span>"), Nb = z("<!><!>", 1), Pb = z("<time class=\"tw:text-xs tw:text-muted-foreground\"> </time>"), Fb = z("<div class=\"tw:flex tw:flex-wrap tw:items-center tw:gap-2 tw:text-xs tw:text-muted-foreground\"><span class=\"tw:font-semibold tw:text-foreground\"> </span><!><!><time> </time></div>"), Ib = z("<span aria-hidden=\"true\">↩</span> ", 1), Lb = z("<p data-message-typing=\"\" role=\"status\" class=\"tw:m-0 tw:text-muted-foreground\"> </p>"), Rb = z("<!> <!> <!>", 1), zb = z("<b> </b>"), Bb = z("<p class=\"tw:m-0 tw:text-xs tw:text-muted-foreground\"> </p>"), Vb = z("<details class=\"tw:space-y-2\"><summary class=\"tw:cursor-pointer tw:rounded-control tw:leading-6 tw:focus-visible:outline-2 tw:focus-visible:outline-ring\">⏰ <!> <time> </time></summary><!><!></details>"), Hb = z("<div class=\"tw:space-y-2 tw:border-l-2 tw:border-border tw:pl-3\"><time class=\"tw:text-xs tw:text-muted-foreground\"> </time><!> <p class=\"tw:m-0 tw:whitespace-pre-wrap tw:break-words\"> </p> <!></div>"), Ub = z("<details class=\"tw:space-y-3\"><summary class=\"tw:cursor-pointer tw:rounded-control tw:leading-6 tw:focus-visible:outline-2 tw:focus-visible:outline-ring\">⚠ <b> </b> <time> </time></summary><!></details>"), Wb = z("<details class=\"tw:space-y-2\"><summary class=\"tw:cursor-pointer tw:rounded-control tw:leading-6 tw:focus-visible:outline-2 tw:focus-visible:outline-ring\">✦ <!> · <time> </time></summary><!></details>"), Gb = z("<article data-vb-native=\"\"><div class=\"tw:flex tw:items-start tw:gap-3\"><div class=\"tw:w-8 tw:shrink-0\"><!></div> <div data-message-body=\"\" class=\"tw:min-w-0 tw:flex-1 tw:space-y-2\"><!> <!> <!> <!> <!></div></div> <div class=\"tw:mt-1 tw:flex tw:justify-end tw:md:opacity-0 tw:md:group-hover:opacity-100 tw:md:group-focus-within:opacity-100\"><!></div></article>");
function Kb(i, o) {
	D(o, !0);
	let p = (e, t = u, n) => {
		let r = y(() => l(n?.(), "markdown"));
		Xp(e, {
			get text() {
				return t();
			},
			get mode() {
				return m(r);
			},
			get room() {
				return o.room;
			},
			get actions() {
				return o.actions;
			},
			get names() {
				return o.vb.knownNames;
			},
			get pageUrl() {
				return o.vb.pageUrl;
			}
		});
	}, h = H(o, "origin", 3, !1), g = e(void 0), v = !0;
	de(() => {
		v = !1;
	});
	let b = w(() => o.vb.waiting(o.message.id)), x = e(!1), C = e(!1);
	_(() => {
		if (!m(b)) {
			f(x, !1);
			return;
		}
		f(x, !0);
		let e = setTimeout(() => {
			f(x, !1);
		}, 1800);
		return () => clearTimeout(e);
	});
	function T(e) {
		let t, n = () => {
			t && clearTimeout(t), f(C, !0), t = setTimeout(() => {
				f(C, !1);
			}, 1800);
		};
		return e.addEventListener("vb:message-highlight", n), { destroy() {
			e.removeEventListener("vb:message-highlight", n), t && clearTimeout(t);
		} };
	}
	let E = w(() => S_(o.previous, o.message)), O = w(() => w_(o.message)), k = w(() => o.message.reply_to ? [...o.room.messages, ...o.room.origins || []].find((e) => e.id === o.message.reply_to) : void 0), N = w(() => o.vb.dateTime?.(o.message.ts) ?? new Date(o.message.ts).toLocaleString()), ee = w(() => o.message.group || [o.message]), F = w(() => O_(o.message)), te = (e) => e.author === "ai" ? "@vibe" : e.kind === "agent" ? o.vb.t("{via} de {who}", {
		via: e.via || "agent",
		who: o.vb.name(e.author)
	}) : o.vb.name(e.author), ne = (e) => new Date(e).toDateString() === (/* @__PURE__ */ new Date()).toDateString() ? o.vb.hhmm(e) : `${new Date(e).toLocaleDateString(o.vb.locale, {
		day: "numeric",
		month: "short"
	})} ${o.vb.hhmm(e)}`;
	var re = Gb(), ie = s(re), ae = s(ie), z = s(ae), oe = (e) => {
		var t = Nb(), r = a(t), i = (e) => {
			var t = jb();
			B(e, t);
		}, s = (e) => {
			{
				let t = w(() => te(o.message)), n = w(() => o.vb.avatarUrl?.(o.message.author));
				ut(e, {
					get name() {
						return m(t);
					},
					get src() {
						return m(n);
					}
				});
			}
		};
		L(r, (e) => {
			o.message.author === "ai" ? e(i) : e(s, -1);
		});
		var l = n(r), u = (e) => {
			var t = Mb(), n = d(t, !0);
			c((e) => U(n, e), [() => x_(o.message.via)]), B(e, t);
		};
		L(l, (e) => {
			o.message.kind === "agent" && e(u);
		}), B(e, t);
	}, se = (e) => {
		var t = Pb(), n = d(t, !0);
		c((e) => {
			A(t, "title", m(N)), U(n, e);
		}, [() => o.vb.hhmm(o.message.ts)]), B(e, t);
	};
	L(z, (e) => {
		m(E) ? e(se, -1) : e(oe);
	}), S(ae);
	var ce = n(ae, 2), ue = s(ce), fe = (e) => {
		var t = Fb(), i = s(t), a = d(i, !0), l = n(i), u = (e) => {
			{
				let t = w(() => o.vb.t("Escrito pelo agent dessa pessoa, em nome dela"));
				ct(e, {
					get title() {
						return m(t);
					},
					children: (e, t) => {
						r();
						var n = I("agent");
						B(e, n);
					},
					$$slots: { default: !0 }
				});
			}
		};
		L(l, (e) => {
			o.message.kind === "agent" && e(u);
		});
		var f = n(l), p = (e) => {
			ct(e, {
				variant: "success",
				children: (e, t) => {
					r();
					var n = I();
					c((e) => U(n, `✓ ${e ?? ""}`), [() => o.vb.t("entregue")]), B(e, n);
				},
				$$slots: { default: !0 }
			});
		};
		L(f, (e) => {
			o.message.tag === "done" && e(p);
		});
		var h = n(f), g = d(h);
		S(t), c((e, t, n) => {
			U(a, e), A(h, "title", m(N)), U(g, `${t ?? ""} · ${n ?? ""}`);
		}, [
			() => te(o.message),
			() => o.vb.ago(o.message.ts),
			() => o.vb.hhmm(o.message.ts)
		]), B(e, t);
	};
	L(ue, (e) => {
		m(E) || e(fe);
	});
	var pe = n(ue, 2), me = (e) => {
		{
			let t = w(() => o.vb.t("Ver a mensagem respondida"));
			V(e, {
				variant: "ghost",
				size: "sm",
				class: "tw:h-auto tw:max-w-full tw:justify-start tw:whitespace-normal tw:border-l-2 tw:border-border tw:text-left tw:text-muted-foreground",
				get "data-native-quote"() {
					return o.message.reply_to;
				},
				get title() {
					return m(t);
				},
				onclick: () => {
					v && o.actions.navigate(o.message.reply_to, m(k)?.thread);
				},
				children: (e, t) => {
					var r = Ib(), i = n(a(r), 1, !0);
					c((e) => U(i, e), [() => m(k) ? `${te(m(k))} · ${D_(m(k))}` : o.vb.t("mensagem anterior")]), B(e, r);
				},
				$$slots: { default: !0 }
			});
		}
	};
	L(pe, (e) => {
		o.message.reply_to && e(me);
	});
	var he = n(pe, 2), ge = (e) => {
		var t = Rb(), r = a(t), i = (e) => {
			var t = Lb(), n = d(t);
			c((e) => U(n, `${e ?? ""}${o.typing ? "…" : ""}`), [() => o.typing ? o.vb.typingNote?.(o.message.id) || o.vb.t("pensando ({mode})", { mode: o.vb.typingLabel?.(o.typing) ?? o.typing }) : o.vb.t("pensando…")]), B(e, t);
		}, s = (e) => {
			p(e, () => o.message.text, () => o.message.author === "ai" || o.message.kind === "agent" ? "markdown" : "human");
		};
		L(r, (e) => {
			!o.message.text && (o.typing || o.message.author === "ai" && !o.message.poll) ? e(i) : o.message.text && e(s, 1);
		});
		var l = n(r, 2);
		Sb(l, {
			get roomId() {
				return o.room.id;
			},
			get messageThread() {
				return o.message.thread;
			},
			get files() {
				return o.message.files;
			},
			get actions() {
				return o.actions;
			},
			get vb() {
				return o.vb;
			}
		});
		var u = n(l, 2), f = (e) => {
			Zy(e, {
				get message() {
					return o.message;
				},
				get room() {
					return o.room;
				},
				get actions() {
					return o.actions;
				},
				get vb() {
					return o.vb;
				}
			});
		};
		L(u, (e) => {
			(o.message.card || o.message.choices || o.message.poll) && e(f);
		}), B(e, t);
	}, ve = (e) => {
		var t = Vb(), r = s(t), i = n(s(r)), a = (e) => {
			var t = zb(), n = d(t, !0);
			c(() => U(n, m(F).name)), B(e, t);
		};
		L(i, (e) => {
			m(F).name && e(a);
		});
		var l = n(i), u = n(l), f = d(u, !0);
		S(r);
		var h = n(r), g = (e) => {
			p(e, () => m(F).body);
		};
		L(h, (e) => {
			m(F).body && e(g);
		});
		var _ = n(h), v = (e) => {
			var t = Bb(), n = d(t, !0);
			c((e) => U(n, e), [() => m(F).runs.map(ne).join(" · ")]), B(e, t);
		};
		L(_, (e) => {
			m(F).runs.length > 1 && e(v);
		}), S(t), c((e, t) => {
			U(l, `${m(F).head ?? ""} · ${e ?? ""}`), A(u, "title", m(N)), U(f, t);
		}, [() => m(F).runs.length > 1 ? `${o.vb.t("rodou {n}×", { n: m(F).runs.length })} · ` : "", () => ne(o.message.ts)]), B(e, t);
	}, ye = (e) => {
		var t = Ub(), r = s(t), i = n(s(r)), a = d(i, !0), l = n(i), u = n(l), f = d(u, !0);
		S(r);
		var h = n(r);
		R(h, 17, () => [...m(ee)].reverse(), (e) => e.id, (e, t) => {
			var r = Hb(), i = s(r), a = d(i, !0), l = n(i);
			{
				let e = w(() => k_(m(t)).head);
				p(l, () => m(e));
			}
			var u = n(l, 2), f = d(u, !0);
			nb(n(u, 2), {
				get message() {
					return m(t);
				},
				showLink: !1,
				get roomId() {
					return o.room.id;
				},
				get actions() {
					return o.actions;
				},
				get vb() {
					return o.vb;
				}
			}), S(r), c((e, t) => {
				U(a, e), U(f, t);
			}, [() => ne(m(t).ts), () => k_(m(t)).body]), B(e, r);
		}), S(t), c((e, t, n) => {
			U(a, e), U(l, ` ${t ?? ""} · `), A(u, "title", m(N)), U(f, n);
		}, [
			() => m(ee).length > 1 ? o.vb.t("{n} issues dos agents", { n: m(ee).length }) : o.vb.t("Issue de um agent"),
			() => k_(o.message).body.replace(/\s+/g, " ").slice(0, 140),
			() => ne(o.message.ts)
		]), B(e, t);
	}, be = (e) => {
		var t = Wb(), r = s(t), i = n(s(r));
		{
			let e = w(() => o.message.text.replace(/\*\*/g, "").replace(/\s+/g, " ").trim());
			p(i, () => m(e), () => "inline");
		}
		var a = n(i, 2), l = d(a, !0);
		S(r);
		var u = n(r);
		p(u, () => o.message.text), S(t), c((e) => {
			A(a, "title", m(N)), U(l, e);
		}, [() => ne(o.message.ts)]), B(e, t);
	};
	L(he, (e) => {
		m(O) === "regular" ? e(ge) : m(O) === "reminder" ? e(ve, 1) : m(O) === "issue" ? e(ye, 2) : e(be, -1);
	});
	var xe = n(he, 2), Se = (e) => {
		var t = P(), n = a(t);
		R(n, 17, () => m(O) === "reminder" ? m(ee) : [o.message], (e) => e.id, (e, t) => {
			kb(e, {
				get room() {
					return o.room;
				},
				get messageId() {
					return m(t).id;
				},
				get actions() {
					return o.actions;
				},
				get vb() {
					return o.vb;
				}
			});
		}), B(e, t);
	};
	L(xe, (e) => {
		!h() && m(O) !== "issue" && m(O) !== "notice" && e(Se);
	});
	var Ce = n(xe, 2), we = (e) => {
		pb(e, {
			get footer() {
				return o.footer;
			},
			get vb() {
				return o.vb;
			}
		});
	};
	L(Ce, (e) => {
		o.footer && !h() && e(we);
	}), S(ce), S(ie);
	var Te = n(ie, 2), Ee = s(Te);
	le(nb(Ee, {
		get message() {
			return o.message;
		},
		get roomId() {
			return o.room.id;
		},
		get actions() {
			return o.actions;
		},
		get vb() {
			return o.vb;
		}
	}), (e) => f(g, e, !0), () => m(g)), S(Te), S(re), _e(re, (e) => T?.(e)), _e(re, (e, t) => Ab?.(e, t), () => ({
		enabled: !h(),
		reply: () => {
			v && o.actions.reply(o.message.id);
		},
		copy: () => {
			m(g)?.copy();
		}
	})), c(() => {
		A(re, "id", h() ? void 0 : `m${o.message.id}`), A(re, "data-chat-message", o.message.id), A(re, "data-message-kind", m(O)), A(re, "data-waiting", m(b)), M(re, 1, j([
			m(E) ? "tw:group tw:relative tw:rounded-control tw:px-3 tw:py-1 tw:font-sans tw:text-sm tw:text-foreground" : "tw:group tw:relative tw:rounded-control tw:px-3 tw:py-3 tw:font-sans tw:text-sm tw:text-foreground",
			m(b) ? "tw:border-l-2 tw:border-warning tw:bg-warning/10" : "",
			m(x) ? "tw:animate-pulse tw:motion-reduce:animate-none" : "",
			m(C) ? "tw:ring-2 tw:ring-ring tw:bg-accent" : ""
		]));
	}), B(i, re), t();
}
// svelte/Chat.svelte
var qb = z("<div class=\"tw:flex tw:justify-center tw:p-3\"><!></div>"), Jb = z("<div data-chat-origin=\"\" class=\"tw:mx-3 tw:mb-4 tw:rounded-surface tw:border tw:border-border tw:bg-muted/30\"><!> <div class=\"tw:flex tw:flex-wrap tw:items-center tw:justify-between tw:gap-2 tw:border-t tw:border-border tw:px-3 tw:py-2 tw:text-xs tw:text-muted-foreground\"><span> </span><!></div></div>"), Yb = z("<p data-chat-empty=\"\" class=\"tw:m-0 tw:p-6 tw:text-center tw:leading-6 tw:text-muted-foreground\"> </p>"), Xb = z("<span class=\"tw:relative\"><!><span aria-hidden=\"true\" class=\"tw:absolute tw:-bottom-1 tw:-right-1 tw:rounded-full tw:bg-card tw:px-0.5 tw:text-xs\"> </span></span>"), Zb = z("<div data-chat-working=\"\" class=\"tw:mx-3 tw:mt-4 tw:flex tw:items-start tw:gap-3 tw:rounded-surface tw:border tw:border-border tw:bg-muted/30 tw:p-4\"><div class=\"tw:flex tw:shrink-0 tw:-space-x-2\"></div> <div class=\"tw:min-w-0 tw:flex-1 tw:space-y-1\"><p class=\"tw:m-0 tw:break-words tw:font-medium\"> </p> <p class=\"tw:m-0 tw:text-xs tw:text-muted-foreground\"> </p></div> <span aria-hidden=\"true\" class=\"tw:animate-spin tw:motion-reduce:animate-none\">✻</span></div>"), Qb = z("<div data-chat-end=\"\" class=\"tw:mx-3 tw:mt-4 tw:space-y-1 tw:rounded-surface tw:border tw:border-border tw:p-4\"><p class=\"tw:m-0 tw:font-medium\"> </p> <p class=\"tw:m-0 tw:text-xs tw:text-muted-foreground\"> </p></div>"), $b = z("<p class=\"tw:m-0 tw:whitespace-pre-wrap tw:break-words tw:text-xs tw:text-muted-foreground\"> </p>"), ex = z("<p class=\"tw:m-0 tw:text-xs tw:text-muted-foreground\"> </p>"), tx = z("<div data-chat-production=\"\" class=\"tw:mx-3 tw:mt-3 tw:space-y-1 tw:rounded-surface tw:border tw:border-border tw:p-4\"><p class=\"tw:m-0 tw:font-medium\"> </p> <!></div>"), nx = z("<section data-chat-timeline=\"\" data-vb-native=\"\" class=\"tw:space-y-1 tw:pb-4 tw:font-sans tw:text-sm tw:text-foreground\"><!> <!> <!> <!> <!> <!></section>");
function rx(i, o) {
	D(o, !0);
	let l = H(o, "more", 3, !1), u = H(o, "origin", 3, null), p = H(o, "replyCount", 3, 0), h = e(x(Date.now()));
	ve(() => {
		let e = setInterval(() => {
			f(h, Date.now(), !0);
		}, 3e4);
		return () => clearInterval(e);
	});
	let g = w(() => E_(o.list)), _ = w(() => A_(o.room, o.thread, m(h))), v = w(() => j_(o.room, o.thread, m(h))), y = w(() => o.room.epics.find((e) => e.id === o.thread));
	var b = P(), C = a(b);
	F(C, () => o.room.id + ":" + o.thread, (e) => {
		var t = nx(), i = s(t), f = (e) => {
			var t = qb(), n = s(t);
			V(n, {
				variant: "outline",
				size: "sm",
				id: "olderBtn",
				get onclick() {
					return o.onloadolder;
				},
				children: (e, t) => {
					r();
					var n = I();
					c((e) => U(n, e), [() => o.vb.t("Carregar mensagens anteriores")]), B(e, n);
				},
				$$slots: { default: !0 }
			}), S(t), B(e, t);
		};
		L(i, (e) => {
			o.list.length && l() && e(f);
		});
		var h = n(i, 2), b = (e) => {
			var t = Jb(), i = s(t);
			Kb(i, {
				get message() {
					return u();
				},
				origin: !0,
				get typing() {
					return o.room.typing[u().id];
				},
				get vb() {
					return o.vb;
				},
				get room() {
					return o.room;
				},
				get actions() {
					return o.actions;
				}
			});
			var a = n(i, 2), l = s(a), f = d(l, !0), m = n(l);
			V(m, {
				variant: "ghost",
				size: "sm",
				get "data-native-origin"() {
					return u().id;
				},
				onclick: () => o.actions.navigate(u().id, u().thread),
				children: (e, t) => {
					r();
					var n = I();
					c((e) => U(n, `${e ?? ""} ↩`), [() => o.vb.t("ver na sala principal")]), B(e, n);
				},
				$$slots: { default: !0 }
			}), S(a), S(t), c((e) => U(f, e), [() => p() === 1 ? o.vb.t("1 resposta") : o.vb.t("{n} respostas", { n: p() })]), B(e, t);
		};
		L(h, (e) => {
			u() && e(b);
		});
		var x = n(h, 2), C = (e) => {
			var t = P(), n = a(t);
			R(n, 19, () => m(g), (e) => e.id, (e, t, n) => {
				{
					let r = w(() => m(n) ? m(g)[m(n) - 1] : o.previous), i = w(() => m(_).get(m(t).id));
					Kb(e, {
						get message() {
							return m(t);
						},
						get previous() {
							return m(r);
						},
						get typing() {
							return o.room.typing[m(t).id];
						},
						get vb() {
							return o.vb;
						},
						get room() {
							return o.room;
						},
						get actions() {
							return o.actions;
						},
						get footer() {
							return m(i);
						}
					});
				}
			}), B(e, t);
		}, T = (e) => {
			var t = Yb(), n = d(t, !0);
			c((e) => U(n, e), [() => o.thread === "main" ? o.vb.t("Comece a conversa. Os agents ligados nesta sala leem e respondem; o seu age com o seu OK. Ex.: <i>organiza o projeto em épicos: site novo, aluguéis e domínio</i>.").replace(/<\/?i>/g, "") : o.vb.t("Discussão deste épico. Os agents leem as tarefas, o doc e a sala principal.")]), B(e, t);
		};
		L(x, (e) => {
			m(g).length ? e(C) : m(v).length || e(T, 1);
		});
		var E = n(x, 2), D = (e) => {
			var t = Zb(), i = s(t);
			R(i, 21, () => m(v).slice(0, 4), (e) => `${e.who}|${e.email}`, (e, t) => {
				var r = Xb(), i = s(r);
				{
					let e = w(() => o.vb.name(m(t).email)), n = w(() => o.vb.avatarUrl?.(m(t).email));
					ut(i, {
						get name() {
							return m(e);
						},
						get src() {
							return m(n);
						}
					});
				}
				var a = n(i), l = d(a, !0);
				S(r), c((e) => U(l, e), [() => x_(m(t).who)]), B(e, r);
			}), S(i);
			var a = n(i, 2), l = s(a), u = d(l), f = n(l, 2), p = d(f, !0);
			S(a), r(2), S(t), c((e, t, n) => {
				U(u, `${e ?? ""}
            ${t ?? ""}`), U(p, n);
			}, [
				() => m(v).map((e) => o.vb.t("{via} de {who}", {
					via: b_(e.who),
					who: o.vb.name(e.email)
				})).join(", "),
				() => o.vb.t(m(v).length === 1 ? "está trabalhando nisso" : "estão trabalhando nisso"),
				() => o.vb.t("O andamento e a entrega aparecem aqui nesta thread.")
			]), B(e, t);
		};
		L(E, (e) => {
			m(v).length && e(D);
		});
		var O = n(E, 2), k = (e) => {
			var t = Qb(), r = s(t), i = d(r), a = n(r, 2), l = d(a, !0);
			S(t), c((e, t) => {
				U(i, `✓ ${e ?? ""}`), U(l, t);
			}, [() => o.vb.t("Agent fez"), () => o.vb.t("Escreva aqui pra continuar: ele reabre.")]), B(e, t);
		};
		L(O, (e) => {
			m(y)?.archived && e(k);
		});
		var A = n(O, 2), j = (e) => {
			var t = tx(), r = s(t), i = d(r, !0), a = n(r, 2), l = (e) => {
				var t = $b(), n = d(t, !0);
				c(() => U(n, m(y).prod.note)), B(e, t);
			}, u = (e) => {
				var t = ex(), n = d(t, !0);
				c((e) => U(n, e), [() => o.vb.t("Falta o agent verificar em prod.")]), B(e, t);
			};
			L(a, (e) => {
				m(y).prod.stage === "verified" && m(y).prod.note ? e(l) : m(y).prod.stage !== "verified" && e(u, 1);
			}), S(t), c((e) => U(i, e), [() => m(y).prod.stage === "verified" ? `✓✓ ${o.vb.t("Verificado em prod")}` : `🚀 ${o.vb.t("No ar")}`]), B(e, t);
		};
		L(A, (e) => {
			m(y)?.prod && e(j);
		}), S(t), B(e, t);
	}), B(i, b), t();
}
// svelte/features/composer/speech.ts
function ix(e) {
	let t = Reflect.get(e, "SpeechRecognition") || Reflect.get(e, "webkitSpeechRecognition");
	if (typeof t == "function") return () => {
		let e = Reflect.construct(t, []);
		if (!ax(e)) throw TypeError("Unsupported speech interface");
		return e;
	};
}
function ax(e) {
	return typeof e == "object" && !!e && typeof Reflect.get(e, "start") == "function" && typeof Reflect.get(e, "stop") == "function" && typeof Reflect.get(e, "abort") == "function" && typeof Reflect.get(e, "lang") == "string" && typeof Reflect.get(e, "continuous") == "boolean" && typeof Reflect.get(e, "interimResults") == "boolean" && [
		"onresult",
		"onerror",
		"onend"
	].every((t) => {
		let n = Reflect.get(e, t);
		return n === null || typeof n == "function";
	});
}
function ox(e) {
	if (typeof e != "object" || !e || !("results" in e) || typeof e.results != "object" || !e.results) return;
	let t = Reflect.get(e.results, "length");
	if (typeof t != "number" || !Number.isInteger(t) || t < 0 || t > 512) return;
	let n = [], r = 0;
	for (let i = 0; i < t; i++) {
		let t = Reflect.get(e.results, String(i));
		if (typeof t != "object" || !t) return;
		let a = Reflect.get(t, "0");
		if (typeof a != "object" || !a) return;
		let o = Reflect.get(a, "transcript");
		if (typeof o != "string" || (r += o.length) > 65536) return;
		n.push(o);
	}
	return n.join("").trim();
}
var sx = {
	schedule: (e, t) => setTimeout(e, t),
	cancel: (e) => clearTimeout(e)
};
function cx(e) {
	let t = e.clock || sx, n = !0, r = 0, i, a, o = !1, s = !1, c = !1;
	function l() {
		a !== void 0 && t.cancel(a), a = void 0;
	}
	function u() {
		if (o = !1, l(), !n || !e.canStart()) return;
		let t = e.read();
		e.write(t.text.slice(0, t.start) + " " + t.text.slice(t.end), t.start + 1);
	}
	function d() {
		r++, l(), o = !1, s = !1, c = !1;
		let t = i;
		if (i = void 0, t) {
			t.onresult = t.onerror = t.onend = null;
			try {
				t.abort();
			} catch {}
		}
		e.recording(!1);
	}
	function f() {
		if (!n || i || !e.factory || !e.canStart()) return;
		let t = e.read(), a = ++r, o;
		try {
			o = e.factory();
		} catch {
			e.error("failed");
			return;
		}
		i = o, c = !1;
		let s = t.revision, l = () => n && i === o && r === a;
		o.lang = e.locale, o.continuous = !0, o.interimResults = !0, o.onresult = (n) => {
			if (!l()) return;
			if (!e.canStart() || e.read().revision !== s) {
				d();
				return;
			}
			let r = ox(n);
			if (r === void 0) {
				e.error("invalid-result"), d();
				return;
			}
			let i = t.text + (t.text && r && !/\s$/.test(t.text) ? " " : "") + r;
			e.read().text !== i && e.write(i, i.length), s = e.read().revision;
		}, o.onerror = (t) => {
			if (!l()) return;
			let n = typeof t == "object" && t && "error" in t && typeof t.error == "string" ? t.error : "failed";
			n === "not-allowed" || n === "service-not-allowed" ? e.error("not-allowed") : n !== "aborted" && n !== "no-speech" && e.error("failed"), d();
		}, o.onend = () => {
			l() && (o.onresult = o.onerror = o.onend = null, i = void 0, c = !1, e.recording(!1), e.canStart() && e.ended());
		}, e.error(""), e.recording(!0);
		try {
			o.start();
		} catch {
			if (l()) {
				o.onresult = o.onerror = o.onend = null, i = void 0;
				try {
					o.abort();
				} catch {}
				e.recording(!1), e.error("failed");
			}
		}
	}
	function p() {
		if (s = !1, i && !c) {
			c = !0;
			try {
				i.stop();
			} catch {
				d();
			}
		}
	}
	return {
		supported: !!e.factory,
		start: f,
		stop: p,
		cancel: d,
		keydown(r) {
			return !n || !e.factory || !e.canStart() ? !1 : r.key === " " ? r.ctrlKey || r.metaKey || r.altKey || r.isComposing ? !1 : (r.preventDefault(), r.repeat || (s = !1, o = !0, l(), a = t.schedule(() => {
				a = void 0, o = !1, s = !0, f();
			}, 350)), !0) : (o && u(), !1);
		},
		keyup(e) {
			e.key === " " && (s ? (s = !1, p()) : o && u());
		},
		dispose() {
			n = !1, d();
		}
	};
}
var lx = [
	"image/png",
	"image/jpeg",
	"image/webp",
	"image/gif",
	"application/pdf",
	"text/html",
	"text/markdown",
	"text/plain",
	"text/csv",
	"audio/mp4",
	"audio/x-m4a",
	"audio/m4a",
	"audio/mpeg",
	"audio/mp3",
	"audio/wav",
	"audio/x-wav",
	"audio/wave",
	"audio/aac",
	"audio/x-aac",
	"audio/ogg",
	"audio/webm",
	"audio/flac",
	"audio/x-flac"
], ux = 10485760, dx = 52428800, fx = (e) => e.startsWith("audio/") ? dx : ux, px = {
	m4a: "audio/x-m4a",
	mp3: "audio/mpeg",
	wav: "audio/wav",
	aac: "audio/aac",
	ogg: "audio/ogg",
	oga: "audio/ogg",
	opus: "audio/ogg",
	webm: "audio/webm",
	flac: "audio/flac"
}, mx = new Set(lx), hx = "image/png,image/jpeg,image/webp,image/gif,application/pdf,text/html,.html,.htm,text/markdown,.md,text/plain,.txt,text/csv,.csv,audio/*,.m4a,.mp3,.wav,.aac,.ogg,.opus,.webm,.flac", gx = (e) => e.split(";")[0].trim().toLowerCase();
function _x(e, t = Date.now()) {
	let n = e, r = (/\.(\w+)$/.exec(n.name)?.[1] || "").toLowerCase(), i = gx(n.type);
	!i && /\.html?$/i.test(n.name) && (i = "text/html"), !i && r === "md" && (i = "text/markdown"), r === "txt" && (i = "text/plain"), r === "csv" && (i = "text/csv"), px[r] && !i.startsWith("audio/") && (i = px[r]);
	let a = !n.name || n.name === "image.png" ? `print-${new Date(t).toISOString().slice(0, 16).replace(/[:T]/g, "-")}.png` : n.name;
	return (i !== n.type || a !== n.name) && (n = new File([n], a, { type: i })), n;
}
var vx = (e) => mx.has(gx(e.type)) ? e.size > fx(gx(e.type)) ? "size" : e.size === 0 ? "empty" : null : "type", yx = (e) => e.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9._-]/g, "");
function bx(e, t, n, r = {}, i = []) {
	let a = e.slice(0, t), o = /(^|\s)@([\p{L}\p{N}._-]*)$/u.exec(a);
	if (!o) return null;
	let s = yx(o[2]), c = n.members.filter((e) => e !== n.me).map((e) => {
		let t = e.split("@")[0], i = n.names?.[e] || r[e] || t, a = yx((n.names?.[e] || r[e] || "").split(/\s+/)[0]) || yx(t.split(/[._+-]/)[0]) || yx(t);
		return {
			email: e,
			handle: a,
			label: i === a ? e : i
		};
	});
	for (let e of i) e.email === n.me && typeof e.name == "string" && e.name.trim() && c.push({
		email: e.email,
		handle: e.name,
		label: "seu agent no sandbox"
	});
	return {
		start: a.length - o[2].length - 1,
		items: c.filter((e) => !s || e.handle.startsWith(s) || yx(e.label).includes(s)).slice(0, 8)
	};
}
function xx(e, t, n, r) {
	return {
		text: e.slice(0, t) + r + e.slice(n),
		caret: t + r.length
	};
}
function Sx(e) {
	let t = e.trim().toLowerCase().replace(/:/g, "");
	return [...new Map(Object.entries(Cn).map(([e, t]) => [t, e])).entries()].filter(([e]) => !t || Object.entries(Cn).some(([n, r]) => r === e && n.includes(t))).map(([e, t]) => ({
		emoji: e,
		name: t
	}));
}
var Cx = (e) => (e.text || e.files?.map((e) => e.name).join(", ") || (e.poll ? "votação" : "")).replace(/\*\*|`|^[#>]+ ?/gm, "").replace(/\s+/g, " ").trim().slice(0, 120);
function wx(e, t, n) {
	let r = n.fileIds.slice().sort().join(",");
	return e.messages.find((i) => i.id > n.baseline && i.author === e.me && i.kind !== "agent" && i.thread === t && i.text === n.text && (i.reply_to || void 0) === n.replyId && (i.files || []).map((e) => e.id).sort().join(",") === r);
}
var Tx = (e) => [e.messages, e.origins || []].reduce((e, t) => t.reduce((e, t) => Math.max(e, t.id), e), 0);
function Ex(e, t) {
	return e === "timeout" ? t("O upload não foi confirmado. Confira os arquivos antes de tentar novamente.") : e === "account-changed" ? t("A conta mudou; selecione o arquivo novamente.") : e === "forbidden" ? t("Você não tem acesso a esta sala.") : e === "offline" ? t("Sem conexão. Seu rascunho foi mantido.") : e === "text-limit" ? t("A mensagem pode ter no máximo 4000 caracteres.") : e === "attachments-limit" ? t("Anexe no máximo 10 arquivos por mensagem.") : e === "attachments-pending" ? t("Espere os anexos terminarem ou remova-os.") : e === "reply-missing" ? t("A mensagem não está mais disponível. Cancele a resposta para continuar.") : e === "draft-limit" ? t("Envie ou descarte um dos seus 64 rascunhos antes de abrir outro.") : e === "unknown thread" ? t("O tópico não está mais disponível. Seu rascunho foi mantido.") : e.startsWith("blocked:") ? t("Não enviei: parece {reason}. Segredo não entra na sala, nem pra você nem pros agents. Manda por um canal seguro.", { reason: e.slice(8).trim() }) : e.startsWith("file-type:") ? `${e.slice(11).trim()}: ${t("só imagens (png, jpg, webp, gif), PDF, HTML, Markdown, .txt, .csv e áudio.")}` : e.startsWith("file-size:") ? `${e.slice(10).trim()}: ${t("Arquivo maior que o limite: 10MB, ou 50MB para áudio.")}` : e.startsWith("file-empty:") ? `${e.slice(11).trim()}: ${t("Arquivo vazio.")}` : e;
}
// svelte/features/composer/OrphanDrafts.svelte
var Dx = z("<aside data-composer-orphans=\"\" class=\"tw:flex tw:flex-wrap tw:items-center tw:gap-2 tw:border-t tw:border-border tw:p-2 tw:text-sm tw:text-muted-foreground\"><span> </span> <!></aside>"), Ox = z("<p role=\"status\" class=\"tw:m-0 tw:text-sm tw:text-muted-foreground\"> </p>"), kx = z("<!> <!> <div class=\"tw:flex tw:justify-end tw:gap-2\"><!> <!></div>", 1), Ax = z("<!> <!>", 1);
function jx(i, o) {
	D(o, !0);
	let l = () => ye(h, "$changes", u), [u, p] = xe(), h = b(() => o.drafts.changes), g = e(null), v = e(!1), y = e(""), x = !0, C = 0, T = w(() => (l(), o.drafts.orphans(o.room))), E = w(() => m(g) && m(T).some((e) => e.scope === m(g)?.scope && e.state === m(g)?.state)), O = w(() => m(g) ? [
		`Thread: ${m(g).scope.thread}`,
		m(g).state.text,
		m(g).state.replyId ? `Reply: ${m(g).state.replyId}` : "",
		...m(g).state.attachments.map((e) => `${e.name} (${e.type}, ${e.size} bytes; ${e.phase})`),
		m(g).state.poll.question ? `Poll: ${m(g).state.poll.question}` : "",
		m(g).state.poll.multi ? o.vb.t("cada pessoa pode escolher várias") : "",
		...m(g).state.poll.options.filter(Boolean)
	].filter(Boolean).join("\n\n") : "");
	_(() => {
		m(g) && !m(E) && (f(v, !1), f(g, null), f(y, ""), C++);
	});
	async function k() {
		if (!x || !m(v) || !m(E) || !m(g)) return;
		let e = ++C, t = m(g);
		try {
			await navigator.clipboard.writeText(m(O)), x && e === C && m(g) === t && m(v) && m(E) && f(y, o.vb.t("Copiado"), !0);
		} catch {
			x && e === C && m(g) === t && m(v) && m(E) && f(y, o.vb.t("Não foi possível copiar. Selecione o texto abaixo e copie manualmente."), !0);
		}
	}
	function A() {
		x && m(v) && m(E) && m(g) && o.drafts.discardOrphan(m(g), o.room) && (f(v, !1), f(g, null), C++);
	}
	de(() => {
		x = !1, C++;
	});
	var j = Ax(), M = a(j), N = (e) => {
		var t = Dx(), i = s(t), a = d(i), l = n(i, 2);
		R(l, 17, () => m(T), (e) => e.scope.thread, (e, t) => {
			V(e, {
				variant: "outline",
				size: "sm",
				onclick: () => {
					f(g, m(t)), f(y, ""), f(v, !0), C++;
				},
				children: (e, n) => {
					r();
					var i = I();
					c((e) => U(i, `${e ?? ""}: ${m(t).scope.thread ?? ""}`), [() => o.vb.t("Revisar rascunho")]), B(e, i);
				},
				$$slots: { default: !0 }
			});
		}), S(t), c((e) => U(a, `${e ?? ""}: ${m(T).length ?? ""}`), [() => o.vb.t("Rascunhos de conversas removidas")]), B(e, t);
	};
	L(M, (e) => {
		m(T).length && e(N);
	});
	var ee = n(M, 2);
	{
		let e = w(() => o.vb.t("Revisar rascunho")), t = w(() => o.vb.t("Fechar")), i = w(() => o.vb.t("A conversa original não está disponível. Copie ou descarte este rascunho local. Nada será enviado ou movido. Descartar não desfaz um upload ou uma mensagem já enviada."));
		Ot(ee, {
			get title() {
				return m(e);
			},
			get closeLabel() {
				return m(t);
			},
			get description() {
				return m(i);
			},
			get open() {
				return m(v);
			},
			set open(e) {
				f(v, e, !0);
			},
			children: (e, t) => {
				var i = kx(), l = a(i);
				{
					let e = w(() => o.vb.t("Rascunho original"));
					Tt(l, {
						readonly: !0,
						get value() {
							return m(O);
						},
						get "aria-label"() {
							return m(e);
						},
						rows: 8
					});
				}
				var u = n(l, 2), f = (e) => {
					var t = Ox(), n = d(t, !0);
					c(() => U(n, m(y))), B(e, t);
				};
				L(u, (e) => {
					m(y) && e(f);
				});
				var p = n(u, 2), h = s(p);
				{
					let e = w(() => !m(E));
					V(h, {
						variant: "outline",
						get disabled() {
							return m(e);
						},
						onclick: k,
						children: (e, t) => {
							r();
							var n = I();
							c((e) => U(n, e), [() => o.vb.t("Copiar")]), B(e, n);
						},
						$$slots: { default: !0 }
					});
				}
				var g = n(h, 2);
				{
					let e = w(() => !m(E));
					V(g, {
						variant: "destructive",
						get disabled() {
							return m(e);
						},
						onclick: A,
						children: (e, t) => {
							r();
							var n = I();
							c((e) => U(n, e), [() => o.vb.t("Descartar rascunho")]), B(e, n);
						},
						$$slots: { default: !0 }
					});
				}
				S(p), B(e, i);
			},
			$$slots: { default: !0 }
		});
	}
	B(i, j), t(), p();
}
// svelte/features/composer/EmojiPicker.svelte
var Mx = z("<!> <div class=\"tw:grid tw:max-h-60 tw:grid-cols-[repeat(auto-fill,minmax(38px,1fr))] tw:gap-1 tw:overflow-y-auto\"></div>", 1);
function Nx(i, o) {
	D(o, !0);
	let s = H(o, "open", 15, !1), l = e(""), u = e(null), d = e(null), p = w(() => Sx(m(l)));
	_(() => {
		s() && f(l, "");
	});
	let h = !0;
	de(() => {
		h = !1;
	});
	function g(e) {
		h && s() && (o.onpick(e), s(!1));
	}
	{
		let e = w(() => o.vb.t("Emoji")), t = w(() => o.vb.t("Fechar"));
		Ot(i, {
			get title() {
				return m(e);
			},
			get closeLabel() {
				return m(t);
			},
			initialFocus: () => window.matchMedia("(pointer: coarse)").matches ? m(d)?.querySelector("button") || null : m(u),
			get open() {
				return s();
			},
			set open(e) {
				s(e);
			},
			children: (e, t) => {
				var i = Mx(), s = a(i);
				{
					let e = w(() => o.vb.t("Buscar emoji…")), t = w(() => o.vb.t("Buscar emoji…"));
					Ce(s, {
						type: "search",
						get "aria-label"() {
							return m(e);
						},
						get placeholder() {
							return m(t);
						},
						get value() {
							return m(l);
						},
						oninput: (e) => f(l, e.currentTarget.value, !0),
						onkeydown: (e) => {
							e.key === "Enter" && m(p).length && (e.preventDefault(), g(m(p)[0].emoji));
						},
						get ref() {
							return m(u);
						},
						set ref(e) {
							f(u, e, !0);
						}
					});
				}
				var h = n(s, 2);
				R(h, 21, () => m(p), (e) => e.emoji, (e, t) => {
					{
						let n = w(() => `:${m(t).name}:`), i = w(() => `:${m(t).name}:`);
						V(e, {
							variant: "ghost",
							class: "tw:text-xl",
							get title() {
								return m(n);
							},
							get "aria-label"() {
								return m(i);
							},
							onclick: () => g(m(t).emoji),
							children: (e, n) => {
								r();
								var i = I();
								c(() => U(i, m(t).emoji)), B(e, i);
							},
							$$slots: { default: !0 }
						});
					}
				}), S(h), le(h, (e) => f(d, e), () => m(d)), B(e, i);
			},
			$$slots: { default: !0 }
		});
	}
	t();
}
// svelte/features/composer/PollCreateDialog.svelte
var Px = z(" <!>", 1), Fx = z("<p role=\"alert\" class=\"tw:m-0 tw:text-sm tw:text-destructive\"> </p>"), Ix = z("<p class=\"tw:m-0 tw:text-xs tw:text-muted-foreground\"> </p> <!>", 1), Lx = z("<form class=\"tw:grid tw:gap-4\"><!> <div class=\"tw:grid tw:gap-2\"></div> <!> <label class=\"tw:flex tw:items-center tw:gap-2\"><!><span> </span></label> <!> <!> <div class=\"tw:flex tw:justify-end tw:gap-2\"><!><!></div></form>");
function Rx(i, o) {
	D(o, !0);
	let l = () => ye(x, "$draft", u), [u, p] = xe(), h = H(o, "open", 15, !1), g = !0, v = e(null);
	de(() => {
		g = !1;
	});
	function y(e) {
		return g && h() && !!m(v)?.isConnected && (!e || e.currentTarget instanceof HTMLElement && e.currentTarget.isConnected);
	}
	let x = b(() => o.entry.state), C = w(() => l().pollPhase === "pending" || l().pollPhase === "unconfirmed"), T = "";
	_(() => {
		let e = l().notice;
		b(() => {
			e !== T && (T = e, e === "poll-created" && h(!1));
		});
	});
	function E(e, t) {
		y() && o.entry.editPoll({ options: l().poll.options.map((n, r) => r === e ? t : n) });
	}
	{
		let e = w(() => o.vb.t("Nova votação")), t = w(() => o.vb.t("Fechar"));
		Ot(i, {
			get title() {
				return m(e);
			},
			get closeLabel() {
				return m(t);
			},
			get open() {
				return h();
			},
			set open(e) {
				h(e);
			},
			children: (e, t) => {
				var i = Lx(), u = s(i);
				be(u, {
					children: (e, t) => {
						r();
						var i = Px(), s = a(i, !0), u = n(s);
						Ce(u, {
							required: !0,
							get maxlength() {
								return 300;
							},
							get value() {
								return l().poll.question;
							},
							get disabled() {
								return m(C);
							},
							oninput: (e) => {
								y(e) && o.entry.editPoll({ question: e.currentTarget.value });
							}
						}), c((e) => U(s, e), [() => o.vb.t("Pergunta (ex.: Qual cruzeiro?)")]), B(e, i);
					},
					$$slots: { default: !0 }
				});
				var p = n(u, 2);
				R(p, 5, () => l().poll.options, N, (e, t, n) => {
					{
						let r = w(() => o.vb.t("Opção {n}", { n: n + 1 }));
						Ce(e, {
							get "aria-label"() {
								return m(r);
							},
							get maxlength() {
								return 200;
							},
							get value() {
								return m(t);
							},
							get disabled() {
								return m(C);
							},
							oninput: (e) => E(n, e.currentTarget.value)
						});
					}
				}), S(p);
				var g = n(p, 2);
				{
					let e = w(() => m(C) || l().poll.options.length >= 10);
					V(g, {
						variant: "link",
						get disabled() {
							return m(e);
						},
						onclick: (e) => {
							y(e) && o.entry.editPoll({ options: [...l().poll.options, ""] });
						},
						children: (e, t) => {
							r();
							var n = I();
							c((e) => U(n, `+ ${e ?? ""}`), [() => o.vb.t("opção")]), B(e, n);
						},
						$$slots: { default: !0 }
					});
				}
				var _ = n(g, 2), b = s(_);
				it(b, {
					get checked() {
						return l().poll.multi;
					},
					get disabled() {
						return m(C);
					},
					onchange: (e) => {
						y(e) && e.currentTarget instanceof HTMLInputElement && o.entry.editPoll({ multi: e.currentTarget.checked });
					}
				});
				var x = n(b), T = d(x, !0);
				S(_);
				var D = n(_, 2), O = (e) => {
					var t = Fx(), n = d(t, !0);
					c((e) => U(n, e), [() => l().pollError === "poll-invalid" ? o.vb.t("Coloque pelo menos 2 opções.") : l().pollPhase === "unconfirmed" ? o.vb.t("Ainda sem confirmação. Confira a sala antes de enviar novamente.") : l().pollError]), B(e, t);
				};
				L(D, (e) => {
					l().pollError && e(O);
				});
				var k = n(D, 2), A = (e) => {
					var t = Ix(), i = a(t), s = d(i, !0), l = n(i, 2);
					V(l, {
						variant: "outline",
						onclick: (e) => {
							y(e) && o.entry.reviewPoll();
						},
						children: (e, t) => {
							r();
							var n = I();
							c((e) => U(n, e), [() => o.vb.t("Conferi a sala; manter rascunho")]), B(e, n);
						},
						$$slots: { default: !0 }
					}), c((e) => U(s, e), [() => o.vb.t("Confira a votação na sala antes de tentar novamente.")]), B(e, t);
				};
				L(k, (e) => {
					l().pollPhase === "unconfirmed" && e(A);
				});
				var j = n(k, 2), M = s(j);
				V(M, {
					variant: "outline",
					onclick: () => h(!1),
					children: (e, t) => {
						r();
						var n = I();
						c((e) => U(n, e), [() => o.vb.t("Cancelar")]), B(e, n);
					},
					$$slots: { default: !0 }
				});
				var ee = n(M);
				{
					let e = w(() => l().pollPhase === "pending");
					V(ee, {
						type: "submit",
						get disabled() {
							return m(C);
						},
						get loading() {
							return m(e);
						},
						children: (e, t) => {
							r();
							var n = I();
							c((e) => U(n, e), [() => o.vb.t("Criar votação")]), B(e, n);
						},
						$$slots: { default: !0 }
					});
				}
				S(j), S(i), le(i, (e) => f(v, e), () => m(v)), c((e) => U(T, e), [() => o.vb.t("cada pessoa pode escolher várias")]), se("submit", i, (e) => {
					e.preventDefault(), y(e) && o.entry.createPoll();
				}), B(e, i);
			},
			$$slots: { default: !0 }
		});
	}
	t(), p();
}
// svelte/features/composer/NativeComposer.svelte
var zx = z("<div role=\"status\" class=\"tw:rounded-control tw:border-2 tw:border-dashed tw:border-primary tw:bg-primary/10 tw:p-4 tw:text-center\"> </div>"), Bx = z("<img class=\"tw:h-20 tw:w-full tw:rounded-sm tw:object-cover\"/>"), Vx = z("<div class=\"tw:relative tw:flex tw:w-32 tw:flex-col tw:gap-1 tw:rounded-control tw:border tw:border-border tw:bg-card tw:p-2\"><!><span class=\"tw:break-words tw:text-xs\"> </span><span role=\"status\" class=\"tw:text-xs tw:text-muted-foreground\"> </span><!><!></div>"), Hx = z("<div class=\"tw:flex tw:flex-wrap tw:gap-2\"></div>"), Ux = z("<b> </b><span class=\"tw:block tw:truncate\"> </span>", 1), Wx = z("<div data-composer-reply=\"\" class=\"tw:flex tw:items-center tw:gap-2 tw:rounded-control tw:border-l-2 tw:border-primary tw:bg-muted tw:p-2\"><!> <div class=\"tw:min-w-0 tw:flex-1 tw:text-xs\"><!></div> <!></div>"), Gx = z("<button type=\"button\" role=\"option\"><!><b> </b><small class=\"tw:text-muted-foreground\"> </small></button>"), Kx = z("<div role=\"listbox\" class=\"tw:absolute tw:bottom-full tw:left-3 tw:z-20 tw:max-h-64 tw:max-w-[calc(100%-1.5rem)] tw:overflow-auto tw:rounded-surface tw:border tw:border-border tw:bg-popover tw:p-1 tw:shadow-lg\"></div>"), qx = z(" <small> </small>", 1), Jx = z("<div role=\"menu\" tabindex=\"-1\" class=\"tw:absolute tw:bottom-full tw:left-0 tw:z-20 tw:mb-2 tw:grid tw:min-w-56 tw:gap-1 tw:rounded-surface tw:border tw:border-border tw:bg-popover tw:p-2 tw:shadow-lg\"><!><!><!></div>"), Yx = z("<p role=\"status\" class=\"tw:m-0 tw:text-xs tw:text-muted-foreground\"> <!></p> <div class=\"tw:flex tw:flex-wrap tw:gap-2\"><!><!></div>", 1), Xx = z("<p role=\"alert\" class=\"tw:m-0 tw:break-words tw:text-xs tw:text-destructive\"> </p>"), Zx = z("<p role=\"status\" class=\"tw:m-0 tw:text-xs tw:text-muted-foreground\"> </p>"), Qx = z("<p role=\"status\" data-composer-dictating=\"\" class=\"tw:m-0 tw:text-xs tw:text-destructive\"> </p>"), $x = z("<p role=\"status\" class=\"tw:m-0 tw:text-xs tw:text-destructive\"> </p>"), eS = z("<section data-native-composer=\"\" data-vb-native=\"\"><!> <!> <!> <!> <form class=\"tw:flex tw:items-end tw:gap-2\"><!> <!> <div class=\"tw:relative\"><!> <!></div> <input type=\"file\" class=\"tw:hidden\" multiple=\"\" hidden=\"\"/> <!> <!></form> <!> <!> <!> <!> <!> <!><!></section>");
function tS(i, o) {
	let l = ee();
	D(o, !0);
	let u = () => ye(C, "$draft", p), [p, h] = xe(), v = H(o, "agents", 19, () => []), y = H(o, "hidden", 3, !1), x = b(() => o.drafts.entry({
		account: o.room.me,
		roomId: o.room.id,
		thread: o.thread
	})), C = x.state, E = e(!1), O = e(""), k = !0, P = e(null), F = e(null), ne = e(null), re = e(null), ie = e(!1), ae = e(!1), z = e(!1), oe = e(!1), ce = e(0), ue = e(0), fe = e(0), pe = e(!1), me = cx({
		factory: b(() => o.speechFactory === void 0 ? ix(window) : o.speechFactory || void 0),
		locale: b(() => o.vb.locale || "pt-BR"),
		read: () => {
			let e = T(x.state);
			return {
				text: e.text,
				revision: e.revision,
				start: m(P)?.selectionStart ?? e.text.length,
				end: m(P)?.selectionEnd ?? e.text.length
			};
		},
		write: (e, t) => {
			je() && (x.edit(e), m(P) && (m(P).value = e, t !== void 0 && m(P).setSelectionRange(t, t)), Ne(), f(pe, !0));
		},
		canStart: () => je() && document.activeElement === m(P) && !m(Ee) && !document.querySelector("[role=\"dialog\"][data-state=\"open\"],[role=\"alertdialog\"][data-state=\"open\"],dialog[open]"),
		recording: (e) => {
			k && f(E, e, !0);
		},
		error: (e) => {
			k && f(O, e, !0);
		},
		ended: () => {
			Oe();
		}
	}), he = /* @__PURE__ */ new Map(), ge = w(() => u().error !== "draft-limit" && x.available() && o.room.members.includes(o.room.me) && (o.thread === "main" || o.room.epics.some((e) => e.id === o.thread))), _e = w(() => u().replyId ? [...o.room.messages, ...o.room.origins || []].find((e) => e.id === u().replyId && e.thread === o.thread && Nv(o.room, e)) : void 0), be = w(() => {
		if (!u().candidate) return;
		let e = Av(o.room, u().candidate);
		if (e && Nv(o.room, e)) return e.id;
		let t = e?.reply_to ? Av(o.room, e.reply_to) : void 0;
		return t && Nv(o.room, t) ? t.id : void 0;
	}), Se = w(() => !y() && !m(pe) ? bx(u().text, m(ce), o.room, o.vb.knownNames, v()) : null), Ce = w(() => m(Se)?.items || []), Te = w(() => m(Ce).length ? m(fe) % m(Ce).length : 0), Ee = w(() => u().phase === "pending" || u().phase === "unconfirmed");
	_(() => {
		y() && (me.cancel(), f(ie, !1), f(ae, !1), f(z, !1), f(pe, !0));
	}), _(() => {
		let e = o.room, t = o.request, n = o.upload;
		b(() => x.sync(e, t, n));
	}), _(() => {
		let e = u().attachments;
		b(() => {
			for (let [t, n] of he) e.some((e) => e.id === t && e.file === n.file) || (URL.revokeObjectURL(n.url), he.delete(t));
		});
	});
	function De(e) {
		if (e.meta && e.type.startsWith("image/")) return `/api/books/${encodeURIComponent(o.room.id)}/files/${encodeURIComponent(e.meta.id)}`;
		if (!e.file || !e.type.startsWith("image/")) return;
		let t = he.get(e.id);
		if (t?.file === e.file) return t.url;
		t && URL.revokeObjectURL(t.url);
		let n = URL.createObjectURL(e.file);
		return he.set(e.id, {
			file: e.file,
			url: n
		}), n;
	}
	async function Oe(e) {
		await g(), k && !y() && m(ge) && m(P)?.isConnected && (m(P).focus(), e !== void 0 && m(P).setSelectionRange(e, e), f(ce, m(P).selectionStart, !0), f(ue, m(P).selectionEnd, !0));
	}
	let ke = x.attachFocus(() => {
		Oe();
	});
	de(() => {
		k = !1, me.dispose(), clearTimeout(Ae), ke();
		for (let e of he.values()) URL.revokeObjectURL(e.url);
		he.clear();
	});
	let Ae;
	function je(e) {
		return k && !y() && m(ge) && !!m(ne)?.isConnected && (!e || e.currentTarget instanceof HTMLElement && e.currentTarget.isConnected);
	}
	function Me() {
		je() && (me.cancel(), x.submit());
	}
	function Ne() {
		m(P) && (f(ce, m(P).selectionStart, !0), f(ue, m(P).selectionEnd, !0));
	}
	function Pe(e) {
		if (!k || !m(ge) || y()) return;
		let t = xx(u().text, m(ce), m(ue), e);
		x.edit(t.text), f(pe, !0), Oe(t.caret);
	}
	function Fe(e) {
		let t = m(Ce)[e];
		if (!k || !m(ge) || !m(Se) || !t) return;
		let n = xx(u().text, m(Se).start, m(ce), `@${t.handle} `);
		x.edit(n.text), f(pe, !0), Oe(n.caret);
	}
	async function Ie(e = !1) {
		je() && (me.cancel(), Ne(), f(ie, !0), e && (await g(), je() && m(re)?.querySelector("button")?.focus()));
	}
	function Le(e) {
		if (je(e)) {
			if (e.key === "Escape") e.preventDefault(), e.stopPropagation(), f(ie, !1), m(ne)?.querySelector("[data-composer-more]")?.focus();
			else if ([
				"ArrowDown",
				"ArrowUp",
				"Home",
				"End"
			].includes(e.key)) {
				e.preventDefault();
				let t = [...m(re)?.querySelectorAll("button:not(:disabled)") || []];
				if (!t.length) return;
				let n = t.findIndex((e) => e === document.activeElement);
				t[e.key === "Home" ? 0 : e.key === "End" ? t.length - 1 : (n + (e.key === "ArrowDown" ? 1 : t.length - 1) + t.length) % t.length].focus();
			}
		}
	}
	function Re(e) {
		if (je(e)) {
			if (e.key === "Escape" && m(E)) e.preventDefault(), e.stopPropagation(), me.cancel();
			else if (!me.keydown(e)) {
				if (m(Ce).length) {
					if (e.key === "ArrowDown" || e.key === "ArrowUp") {
						e.preventDefault(), f(fe, (m(Te) + (e.key === "ArrowDown" ? 1 : m(Ce).length - 1)) % m(Ce).length);
						return;
					}
					if ((e.key === "Enter" || e.key === "Tab") && !e.isComposing) {
						e.preventDefault(), Fe(m(Te));
						return;
					}
					if (e.key === "Escape") {
						e.preventDefault(), e.stopPropagation(), f(pe, !0);
						return;
					}
				}
				e.key === "Escape" && u().replyId ? (e.preventDefault(), e.stopPropagation(), x.clearReply()) : e.key === "Enter" && !e.shiftKey && !e.isComposing && (e.preventDefault(), Me());
			}
		}
	}
	ve(() => {
		let e = m(ne)?.closest("main"), t = (t) => {
			let n = t.target, r = n instanceof HTMLElement && (n.isContentEditable || /^(INPUT|TEXTAREA)$/.test(n.tagName));
			if (y() || !k || !m(ge) || !m(P)?.isConnected || r && n !== m(P)) return;
			let i = document.activeElement;
			if ([...document.querySelectorAll("dialog[open],[role=\"dialog\"],[role=\"alertdialog\"]")].find((e) => e.dataset.state !== "closed" && !e.hidden && e.getAttribute("aria-hidden") !== "true") && n !== m(P) || n instanceof Node && n !== document.body && !e?.contains(n) || i instanceof HTMLElement && i !== document.body && !e?.contains(i) && n !== m(P)) return;
			let a = [...t.clipboardData?.files || []];
			a.length || (a = [...t.clipboardData?.items || []].filter((e) => e.kind === "file").flatMap((e) => {
				let t = e.getAsFile();
				return t ? [t] : [];
			})), a.length && (t.preventDefault(), x.addFiles(a), Oe());
		}, n = (e) => {
			k && !y() && m(ge) && e.dataTransfer?.types.includes("Files") && (e.preventDefault(), f(oe, !0));
		}, r = (t) => {
			t.relatedTarget instanceof Node && e?.contains(t.relatedTarget) || f(oe, !1);
		}, i = (e) => {
			if (!k || y() || !m(ge)) return;
			let t = [...e.dataTransfer?.files || []];
			t.length && (e.preventDefault(), x.addFiles(t), Oe()), f(oe, !1);
		}, a = (e) => {
			m(ie) && e.target instanceof Node && !m(re)?.contains(e.target) && !m(ne)?.querySelector("[data-composer-more]")?.contains(e.target) && f(ie, !1);
		}, o = () => me.cancel();
		return window.addEventListener("blur", o), document.addEventListener("paste", t), document.addEventListener("pointerdown", a), e?.addEventListener("dragover", n), e?.addEventListener("dragleave", r), e?.addEventListener("drop", i), () => {
			window.removeEventListener("blur", o), document.removeEventListener("paste", t), document.removeEventListener("pointerdown", a), e?.removeEventListener("dragover", n), e?.removeEventListener("dragleave", r), e?.removeEventListener("drop", i);
		};
	});
	var W = eS(), ze = s(W), Be = (e) => {
		var t = zx(), n = d(t, !0);
		c((e) => U(n, e), [() => o.vb.t("Anexar arquivo")]), B(e, t);
	};
	L(ze, (e) => {
		m(oe) && e(Be);
	});
	var Ve = n(ze, 2), He = (e) => {
		var t = Hx();
		R(t, 5, () => u().attachments, (e) => e.id, (e, t) => {
			let i = w(() => De(m(t)));
			var a = Vx(), l = s(a), u = (e) => {
				var n = Bx();
				c(() => {
					A(n, "src", m(i)), A(n, "alt", m(t).name);
				}), B(e, n);
			}, f = (e) => {
				Dt(e, { name: "file" });
			};
			L(l, (e) => {
				m(i) ? e(u) : e(f, -1);
			});
			var p = n(l), h = d(p, !0), g = n(p), _ = d(g, !0), v = n(g), y = (e) => {
				V(e, {
					size: "sm",
					variant: "outline",
					onclick: (e) => {
						je(e) && x.retryUpload(m(t).id);
					},
					children: (e, t) => {
						r();
						var n = I();
						c((e) => U(n, e), [() => o.vb.t("Tentar novamente")]), B(e, n);
					},
					$$slots: { default: !0 }
				});
			};
			L(v, (e) => {
				m(t).phase === "error" && e(y);
			});
			var b = n(v);
			{
				let e = w(() => o.vb.t("Remover anexo"));
				mt(b, {
					icon: "close",
					get label() {
						return m(e);
					},
					class: "tw:absolute tw:right-1 tw:top-1 tw:bg-card",
					onclick: (e) => {
						je(e) && x.removeFile(m(t).id);
					}
				});
			}
			S(a), c((e) => {
				A(a, "data-composer-attachment", m(t).id), U(h, m(t).name), U(_, e);
			}, [() => m(t).phase === "queued" || m(t).phase === "uploading" ? o.vb.t("Enviando…") : m(t).phase === "error" ? Ex(m(t).error || "failed", o.vb.t) : o.vb.t("Pronto")]), B(e, a);
		}), S(t), B(e, t);
	};
	L(Ve, (e) => {
		u().attachments.length && e(He);
	});
	var Ue = n(Ve, 2), We = (e) => {
		var t = Wx(), r = s(t);
		Dt(r, { name: "reply" });
		var i = n(r, 2), l = s(i), u = (e) => {
			var t = Ux(), r = a(t), i = d(r, !0), s = n(r), l = d(s, !0);
			c((e, t) => {
				U(i, e), U(l, t);
			}, [() => m(_e).author === "ai" ? "@vibe" : m(_e).kind === "agent" ? o.vb.t("{via} de {who}", {
				via: "Agent",
				who: o.vb.name(m(_e).author)
			}) : o.vb.name(m(_e).author), () => !m(_e).text && m(_e).poll ? o.vb.t("votação") : Cx(m(_e))]), B(e, t);
		}, f = (e) => {
			var t = I();
			c((e) => U(t, e), [() => o.vb.t("A mensagem não está mais disponível.")]), B(e, t);
		};
		L(l, (e) => {
			m(_e) ? e(u) : e(f, -1);
		}), S(i);
		var p = n(i, 2);
		{
			let e = w(() => o.vb.t("Cancelar resposta"));
			mt(p, {
				icon: "close",
				get label() {
					return m(e);
				},
				onclick: (e) => {
					je(e) && x.clearReply();
				}
			});
		}
		S(t), B(e, t);
	};
	L(Ue, (e) => {
		u().replyId && e(We);
	});
	var Ge = n(Ue, 2), Ke = (e) => {
		var t = Kx();
		R(t, 21, () => m(Ce), N, (e, t, r) => {
			var i = Gx(), a = s(i);
			{
				let e = w(() => o.vb.name(m(t).email)), n = w(() => o.vb.avatarUrl?.(m(t).email));
				ut(a, {
					get name() {
						return m(e);
					},
					get src() {
						return m(n);
					},
					class: "tw:size-6"
				});
			}
			var u = n(a), f = d(u), p = n(u), h = d(p, !0);
			S(i), c((e) => {
				A(i, "id", `${l}-mention-${r}`), A(i, "aria-selected", m(Te) === r), M(i, 1, j(m(Te) === r ? "tw:flex tw:w-full tw:items-center tw:gap-2 tw:rounded-control tw:bg-accent tw:p-2 tw:text-left" : "tw:flex tw:w-full tw:items-center tw:gap-2 tw:rounded-control tw:p-2 tw:text-left tw:hover:bg-accent")), U(f, `@${m(t).handle ?? ""}`), U(h, e);
			}, [() => o.vb.t(m(t).label)]), te("pointerdown", i, (e) => {
				e.preventDefault(), Fe(r);
			}), te("click", i, () => Fe(r)), B(e, i);
		}), S(t), c((e) => {
			A(t, "id", `${l}-mentions`), A(t, "aria-label", e);
		}, [() => o.vb.t("Mencionar")]), B(e, t);
	};
	L(Ge, (e) => {
		m(Ce).length && e(Ke);
	});
	var qe = n(Ge, 2), Je = s(qe);
	{
		let e = w(() => o.vb.t("Emoji")), t = w(() => !m(ge));
		mt(Je, {
			icon: "smile",
			get label() {
				return m(e);
			},
			get disabled() {
				return m(t);
			},
			onclick: (e) => {
				je(e) && (me.cancel(), Ne(), f(ae, !0));
			}
		});
	}
	var Ye = n(Je, 2), Xe = (e) => {
		{
			let t = w(() => o.vb.t("Ditar mensagem")), n = w(() => o.vb.t("Segure pra ditar (ou segure o espaço)")), r = w(() => m(E) ? "tw:touch-none tw:bg-destructive tw:text-destructive-foreground" : "tw:touch-none tw:text-muted-foreground"), i = w(() => !m(ge) || m(Ee));
			mt(e, {
				icon: "mic",
				get label() {
					return m(t);
				},
				get title() {
					return m(n);
				},
				get "aria-pressed"() {
					return m(E);
				},
				get class() {
					return m(r);
				},
				get disabled() {
					return m(i);
				},
				onpointerdown: (e) => {
					if (je(e)) {
						e.preventDefault();
						try {
							e.currentTarget.setPointerCapture?.(e.pointerId);
						} catch {}
						m(P)?.focus(), me.start();
					}
				},
				onpointerup: () => me.stop(),
				onpointercancel: () => me.stop(),
				onlostpointercapture: () => me.stop(),
				onclick: (e) => {
					e.detail === 0 && je(e) && (e.preventDefault(), m(P)?.focus(), m(E) ? me.stop() : me.start());
				}
			});
		}
	};
	L(Ye, (e) => {
		me.supported && e(Xe);
	});
	var Ze = n(Ye, 2), Qe = s(Ze);
	{
		let e = w(() => o.vb.t("Mais opções")), t = w(() => !m(ge));
		mt(Qe, {
			icon: "plus",
			get label() {
				return m(e);
			},
			"data-composer-more": !0,
			"aria-haspopup": "menu",
			get "aria-expanded"() {
				return m(ie);
			},
			get disabled() {
				return m(t);
			},
			onpointerdown: (e) => {
				document.activeElement === m(P) && e.preventDefault();
			},
			onkeydown: (e) => {
				e.key === "ArrowDown" && (e.preventDefault(), Ie(!0));
			},
			onclick: (e) => {
				je(e) && (m(ie) ? f(ie, !1) : Ie(e.detail === 0));
			}
		});
	}
	var $e = n(Qe, 2), et = (e) => {
		var t = Jx(), i = s(t);
		V(i, {
			variant: "ghost",
			role: "menuitem",
			onclick: (e) => {
				je(e) && (f(ie, !1), m(F)?.click());
			},
			children: (e, t) => {
				r();
				var i = qx(), s = a(i), l = n(s), u = d(l, !0);
				c((e, t) => {
					U(s, `${e ?? ""} `), U(u, t);
				}, [() => o.vb.t("Anexar arquivo"), () => o.vb.t("ou Cmd+V")]), B(e, i);
			},
			$$slots: { default: !0 }
		});
		var l = n(i);
		V(l, {
			variant: "ghost",
			role: "menuitem",
			onclick: (e) => {
				if (!je(e)) return;
				f(ie, !1);
				let t = u().text.slice(0, m(ce));
				Pe(t && !/\s$/.test(t) ? " @" : "@"), f(pe, !1);
			},
			children: (e, t) => {
				r();
				var n = I();
				c((e) => U(n, `${e ?? ""} @`), [() => o.vb.t("Mencionar alguém")]), B(e, n);
			},
			$$slots: { default: !0 }
		});
		var p = n(l);
		V(p, {
			variant: "ghost",
			role: "menuitem",
			onclick: (e) => {
				je(e) && (f(ie, !1), f(z, !0));
			},
			children: (e, t) => {
				r();
				var n = I();
				c((e) => U(n, e), [() => o.vb.t("Criar votação")]), B(e, n);
			},
			$$slots: { default: !0 }
		}), S(t), le(t, (e) => f(re, e), () => m(re)), te("keydown", t, Le), B(e, t);
	};
	L($e, (e) => {
		m(ie) && e(et);
	}), S(Ze);
	var tt = n(Ze, 2);
	le(tt, (e) => f(F, e), () => m(F));
	var nt = n(tt, 2);
	{
		let e = w(() => Math.min(6, u().text.split("\n").length)), t = w(() => o.vb.t("Mensagem…")), n = w(() => o.vb.t("Mensagem…")), r = w(() => !m(ge)), i = w(() => m(Ce).length ? `${l}-mentions` : void 0), a = w(() => m(Ce).length ? `${l}-mention-${m(Te)}` : void 0), s = w(() => we("tw:block tw:min-h-11 tw:max-h-40 tw:min-w-0 tw:flex-1 tw:resize-none tw:[field-sizing:content]", m(E) ? "tw:ring-2 tw:ring-destructive tw:focus-visible:ring-destructive" : ""));
		Tt(nt, {
			id: "input",
			get rows() {
				return m(e);
			},
			get "aria-label"() {
				return m(t);
			},
			get placeholder() {
				return m(n);
			},
			get value() {
				return u().text;
			},
			get disabled() {
				return m(r);
			},
			"aria-autocomplete": "list",
			get "aria-controls"() {
				return m(i);
			},
			get "aria-activedescendant"() {
				return m(a);
			},
			get class() {
				return m(s);
			},
			oninput: (e) => {
				je(e) && (me.cancel(), clearTimeout(Ae), x.edit(e.currentTarget.value), Ne(), f(fe, 0), f(pe, !1));
			},
			onselect: Ne,
			onclick: Ne,
			onkeyup: (e) => {
				me.keyup(e), Ne();
			},
			onkeydown: Re,
			onfocus: () => clearTimeout(Ae),
			onblur: () => {
				me.cancel(), Ae = setTimeout(() => {
					k && f(pe, !0);
				}, 100);
			},
			get ref() {
				return m(P);
			},
			set ref(e) {
				f(P, e, !0);
			}
		});
	}
	var rt = n(nt, 2);
	{
		let e = w(() => !m(ge) || m(Ee) || u().attachments.some((e) => e.phase === "queued" || e.phase === "uploading")), t = w(() => u().phase === "pending");
		V(rt, {
			type: "submit",
			"data-composer-send": !0,
			get disabled() {
				return m(e);
			},
			get loading() {
				return m(t);
			},
			onmousedown: (e) => e.preventDefault(),
			ontouchend: (e) => {
				!m(Ee) && m(ge) && (e.preventDefault(), Me());
			},
			children: (e, t) => {
				r();
				var n = I();
				c((e) => U(n, e), [() => o.vb.t("Enviar")]), B(e, n);
			},
			$$slots: { default: !0 }
		});
	}
	S(qe);
	var it = n(qe, 2), at = (e) => {
		var t = Yx(), i = a(t), l = s(i, !0), u = n(l), d = (e) => {
			V(e, {
				variant: "link",
				size: "sm",
				onclick: (e) => {
					je(e) && m(be) && o.navigate(m(be));
				},
				children: (e, t) => {
					r();
					var n = I();
					c((e) => U(n, e), [() => o.vb.t("Ver mensagem correspondente")]), B(e, n);
				},
				$$slots: { default: !0 }
			});
		};
		L(u, (e) => {
			m(be) && e(d);
		}), S(i);
		var f = n(i, 2), p = s(f);
		V(p, {
			size: "sm",
			variant: "outline",
			onclick: (e) => {
				je(e) && x.review(!0);
			},
			children: (e, t) => {
				r();
				var n = I();
				c((e) => U(n, e), [() => o.vb.t("Conferi a sala; manter rascunho")]), B(e, n);
			},
			$$slots: { default: !0 }
		});
		var h = n(p);
		V(h, {
			size: "sm",
			variant: "ghost",
			onclick: (e) => {
				je(e) && x.review(!1);
			},
			children: (e, t) => {
				r();
				var n = I();
				c((e) => U(n, e), [() => o.vb.t("Conferi a sala; descartar rascunho")]), B(e, n);
			},
			$$slots: { default: !0 }
		}), S(f), c((e) => U(l, e), [() => o.vb.t("Ainda sem confirmação. Confira a sala antes de enviar novamente.")]), B(e, t);
	}, ot = (e) => {
		var t = Xx(), n = d(t, !0);
		c((e) => U(n, e), [() => Ex(u().error, o.vb.t)]), B(e, t);
	};
	L(it, (e) => {
		u().phase === "unconfirmed" ? e(at) : u().error && e(ot, 1);
	});
	var st = n(it, 2), ct = (e) => {
		var t = Zx(), n = d(t, !0);
		c((e) => U(n, e), [() => u().notice === "sent" ? o.vb.t("Enviado") : u().notice === "sent-edited" ? o.vb.t("Enviado. Seu novo rascunho foi mantido.") : u().notice === "poll-created" ? o.vb.t("Votação criada") : u().notice === "reviewed-discarded" ? o.vb.t("Rascunho descartado") : o.vb.t("Rascunho mantido")]), B(e, t);
	};
	L(st, (e) => {
		u().notice && e(ct);
	});
	var lt = n(st, 2), dt = (e) => {
		var t = Qx(), n = d(t, !0);
		c((e) => U(n, e), [() => o.vb.t("Ouvindo… Escape para parar.")]), B(e, t);
	};
	L(lt, (e) => {
		m(E) && e(dt);
	});
	var ft = n(lt, 2), pt = (e) => {
		var t = $x(), n = d(t, !0);
		c((e) => U(n, e), [() => m(O) === "not-allowed" ? o.vb.t("O navegador não deixou usar o microfone.") : m(O) === "invalid-result" ? o.vb.t("O ditado foi interrompido. Seu rascunho foi mantido.") : o.vb.t("Não foi possível iniciar o ditado.")]), B(e, t);
	};
	L(ft, (e) => {
		m(O) && e(pt);
	});
	var ht = n(ft, 2);
	jx(ht, {
		get room() {
			return o.room;
		},
		get drafts() {
			return o.drafts;
		},
		get vb() {
			return o.vb;
		}
	});
	var gt = n(ht, 2);
	Nx(gt, {
		get vb() {
			return o.vb;
		},
		onpick: Pe,
		get open() {
			return m(ae);
		},
		set open(e) {
			f(ae, e, !0);
		}
	}), Rx(n(gt), {
		get entry() {
			return x;
		},
		get vb() {
			return o.vb;
		},
		get open() {
			return m(z);
		},
		set open(e) {
			f(z, e, !0);
		}
	}), S(W), le(W, (e) => f(ne, e), () => m(ne)), c(() => {
		A(W, "hidden", y()), M(W, 1, j(y() ? "tw:hidden" : "tw:relative tw:shrink-0 tw:space-y-2 tw:border-t tw:border-border tw:bg-background tw:p-3 tw:font-sans tw:text-sm tw:text-foreground tw:sm:px-6")), A(tt, "accept", hx);
	}), se("submit", qe, (e) => {
		e.preventDefault(), Me();
	}), te("change", tt, (e) => {
		je(e) && (x.addFiles([...e.currentTarget.files || []]), e.currentTarget.value = "");
	}), B(i, W), t(), h();
}
Se([
	"pointerdown",
	"click",
	"keydown",
	"change"
]);
// svelte/Composer.svelte
var nS = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy"
]);
function rS(e, n) {
	D(n, !0);
	let r = fe(n, nS);
	var i = P(), o = a(i);
	F(o, () => n.drafts, (e) => {
		var t = P(), i = a(t);
		F(i, () => `${n.room.me}:${n.room.id}:${n.thread}`, (e) => {
			tS(e, pe(() => r));
		}), B(e, t);
	}), B(e, i), t();
}
// svelte/features/composer/drafts.ts
var iS = () => ({
	question: "",
	options: [
		"",
		"",
		""
	],
	multi: !1,
	revision: 0
}), aS = () => ({
	text: "",
	attachments: [],
	revision: 0,
	phase: "idle",
	error: "",
	notice: "",
	poll: iS(),
	pollPhase: "idle",
	pollError: ""
}), oS = {
	schedule: (e, t) => setTimeout(e, t),
	cancel: (e) => clearTimeout(e)
}, sS = 1e4, cS = (e) => e === "offline" || e === "invalid command" || e === "empty message" || e === "unknown thread" || e.startsWith("blocked:");
function lS(e = oS) {
	let t = !0, n = 0, r = 0, i = 0, a = /* @__PURE__ */ new Map(), o = v(0), s = /* @__PURE__ */ new Map(), c = () => o.update((e) => e + 1), l = (e, t) => e.account === t.me && e.roomId === t.id && e.thread !== "main" && !t.epics.some((t) => t.id === e.thread), u = [], d = /* @__PURE__ */ new Set(), f = (e) => JSON.stringify([
		e.account,
		e.roomId,
		e.thread
	]);
	function p() {
		for (; t && i < 2 && u.length;) {
			let r = u.shift();
			if (r.epoch !== n) continue;
			let a = r.entry.item(r.id);
			if (!a?.file || a.phase !== "queued") continue;
			i++;
			let o = new AbortController();
			d.add(o), r.entry.uploading(r.id, o);
			let s, c = () => {};
			new Promise((i, l) => {
				c = () => {
					s !== void 0 && e.cancel(s), l(/* @__PURE__ */ Error("cancelled"));
				}, o.signal.addEventListener("abort", c, { once: !0 }), s = e.schedule(() => {
					t && r.epoch === n && r.entry.uploadError(r.id, "timeout"), o.abort();
				}, 2e4);
				try {
					r.upload({
						name: a.name,
						type: a.type,
						body: a.file
					}, o.signal).then(i, l);
				} catch (e) {
					l(e);
				}
			}).then((e) => {
				t && r.epoch === n && !o.signal.aborted && r.entry.uploaded(r.id, e);
			}).catch((e) => {
				t && r.epoch === n && !o.signal.aborted && r.entry.uploadError(r.id, e instanceof Error ? e.message : "failed");
			}).finally(() => {
				s !== void 0 && e.cancel(s), o.signal.removeEventListener("abort", c), d.delete(o), r.epoch === n && i--, t && p();
			});
		}
	}
	function m(i, a = !0) {
		let o = Object.freeze({ ...i }), s = v(a ? aS() : {
			...aS(),
			error: "draft-limit"
		}), c = !0, l, d, f, m, h, g, _, y = /* @__PURE__ */ new Map(), b = () => a && c && t && l?.id === o.roomId && l.me === o.account && l.members.includes(o.account) && (o.thread === "main" || l.epics.some((e) => e.id === o.thread)), x = (t) => {
			t?.timer !== void 0 && e.cancel(t.timer);
		}, S = (e) => c && t && g?.token === e.token, C = (e) => c && t && _?.token === e.token;
		function w() {
			let e = g;
			if (!e || !l) return;
			let t = wx(l, o.thread, e.snapshot);
			s.update((e) => e.candidate === t?.id ? e : {
				...e,
				candidate: t?.id
			}), e.ack && t && (x(e), g = void 0, s.update((t) => t.revision === e.snapshot.revision ? {
				...t,
				text: "",
				replyId: void 0,
				attachments: t.attachments.filter((e) => e.phase === "error"),
				revision: t.revision + 1,
				phase: "idle",
				error: "",
				candidate: void 0,
				notice: "sent"
			} : {
				...t,
				phase: "idle",
				error: "",
				candidate: void 0,
				notice: "sent-edited"
			}));
		}
		function E(e) {
			return Object.values(l?.polls || {}).find((t) => !e.baseline.has(t.id) && t.author === o.account && t.question === e.form.question && t.multi === e.form.multi && JSON.stringify(t.options) === JSON.stringify(e.form.options) && l.messages.some((n) => n.id > e.baselineMessage && n.thread === o.thread && n.author === o.account && n.kind !== "agent" && n.poll === t.id));
		}
		function D() {
			let e = _;
			if (!e || !l) return;
			let t = E(e);
			s.update((e) => e.pollCandidate === t?.id ? e : {
				...e,
				pollCandidate: t?.id
			}), e.ack && t && (x(e), _ = void 0, s.update((t) => ({
				...t,
				poll: t.poll.revision === e.form.revision ? iS() : t.poll,
				pollPhase: "idle",
				pollError: "",
				pollCandidate: void 0,
				notice: "poll-created"
			})));
		}
		function O(e, t) {
			S(e) && (x(e), e.timer = void 0, s.update((e) => ({
				...e,
				phase: "unconfirmed",
				error: t
			})));
		}
		function k(e, t) {
			C(e) && (x(e), e.timer = void 0, s.update((e) => ({
				...e,
				pollPhase: "unconfirmed",
				pollError: t
			})));
		}
		let A = {
			scope: o,
			state: s,
			available: () => a && c && t,
			sync(e, n, r) {
				c && t && (e.id !== o.roomId || e.me !== o.account ? (l = void 0, d = void 0, f = void 0) : (l = e, d = n, f = r, w(), D()));
			},
			edit(e) {
				a && c && t && s.update((t) => ({
					...t,
					text: e,
					revision: t.revision + 1,
					notice: ""
				}));
			},
			reply(e, t) {
				if (!b() || e.thread !== o.thread) return;
				let n = [...l.messages, ...l.origins || []].find((t) => t.id === e.id);
				n && n.thread === o.thread && Nv(l, n) && (s.update((e) => ({
					...e,
					text: t === void 0 ? e.text : t,
					replyId: n.id,
					revision: e.revision + 1,
					notice: ""
				})), m?.());
			},
			clearReply() {
				c && t && s.update((e) => ({
					...e,
					replyId: void 0,
					revision: e.revision + 1
				}));
			},
			focus() {
				b() && m?.();
			},
			attachFocus(e) {
				let t = Symbol();
				return h = t, m = e, () => {
					h === t && (m = void 0, h = void 0, l = void 0, d = void 0, f = void 0);
				};
			},
			addFiles(e) {
				if (b() && f) {
					for (let t of e) {
						if (T(s).attachments.length >= 10) {
							s.update((e) => ({
								...e,
								error: "attachments-limit"
							}));
							break;
						}
						let e = _x(t), i = vx(e);
						if (i) {
							s.update((t) => ({
								...t,
								error: `file-${i}: ${e.name}`
							}));
							continue;
						}
						let a = {
							id: ++r,
							name: e.name,
							type: gx(e.type),
							size: e.size,
							file: e,
							phase: "queued"
						};
						s.update((e) => ({
							...e,
							attachments: [...e.attachments, a],
							revision: e.revision + 1,
							error: ""
						})), u.push({
							entry: A,
							id: a.id,
							upload: f,
							epoch: n
						});
					}
					p();
				}
			},
			removeFile(e) {
				c && t && (y.get(e)?.abort(), y.delete(e), s.update((t) => ({
					...t,
					attachments: t.attachments.filter((t) => t.id !== e),
					revision: t.revision + 1
				})));
			},
			retryUpload(e) {
				if (!b() || !f) return;
				let t = T(s).attachments.find((t) => t.id === e);
				t?.file && t.phase === "error" && (s.update((t) => ({
					...t,
					attachments: t.attachments.map((t) => t.id === e ? {
						...t,
						phase: "queued",
						error: void 0
					} : t)
				})), u.push({
					entry: A,
					id: e,
					upload: f,
					epoch: n
				}), p());
			},
			item(e) {
				return c ? T(s).attachments.find((t) => t.id === e) : void 0;
			},
			uploading(e, t) {
				c && (y.set(e, t), s.update((t) => ({
					...t,
					attachments: t.attachments.map((t) => t.id === e ? {
						...t,
						phase: "uploading"
					} : t)
				})));
			},
			uploaded(e, t) {
				c && y.has(e) && (t.author === o.account ? (y.delete(e), s.update((n) => ({
					...n,
					attachments: n.attachments.map((n) => n.id === e ? {
						...n,
						file: void 0,
						meta: t,
						phase: "ready",
						error: void 0
					} : n)
				}))) : A.uploadError(e, "account-changed"));
			},
			uploadError(e, t) {
				c && y.has(e) && (y.delete(e), s.update((n) => ({
					...n,
					attachments: n.attachments.map((n) => n.id === e ? {
						...n,
						phase: "error",
						error: t
					} : n)
				})));
			},
			async submit() {
				if (!b() || !d || g) return;
				let t = T(s), n = t.text.trim();
				if (t.attachments.some((e) => e.phase === "queued" || e.phase === "uploading")) {
					s.update((e) => ({
						...e,
						error: "attachments-pending"
					}));
					return;
				}
				if (n.length > 4e3) {
					s.update((e) => ({
						...e,
						error: "text-limit"
					}));
					return;
				}
				let r = t.attachments.flatMap((e) => e.meta ? [e.meta.id] : []);
				if (!n && !r.length) return;
				let i = t.replyId ? [...l.messages, ...l.origins || []].find((e) => e.id === t.replyId && e.thread === o.thread && Nv(l, e)) : void 0;
				if (t.replyId && !i) {
					s.update((e) => ({
						...e,
						error: "reply-missing"
					}));
					return;
				}
				let a = {
					token: Symbol(),
					snapshot: {
						text: n,
						fileIds: r,
						replyId: i?.id,
						baseline: Tx(l),
						revision: t.revision
					},
					ack: !1
				};
				g = a, s.update((e) => ({
					...e,
					phase: "pending",
					error: "",
					candidate: void 0,
					notice: ""
				}));
				try {
					let t = await d({
						t: "msg",
						thread: o.thread,
						text: n,
						files: r,
						reply_to: i?.id
					});
					if (!S(a)) return;
					if (!t.ok) {
						cS(t.error) ? (g = void 0, s.update((e) => ({
							...e,
							phase: "error",
							error: t.error
						}))) : O(a, t.error);
						return;
					}
					a.ack = !0, w(), S(a) && (a.timer = e.schedule(() => O(a, "unconfirmed"), sS));
				} catch (e) {
					if (!S(a)) return;
					e instanceof TypeError && e.message === "Invalid room command" ? (g = void 0, s.update((t) => ({
						...t,
						phase: "error",
						error: e.message
					}))) : O(a, e instanceof Error ? e.message : "failed");
				}
			},
			review(e) {
				if (!c || !g || T(s).phase !== "unconfirmed") return;
				let t = g.snapshot;
				x(g), g = void 0, s.update((n) => !e && n.revision === t.revision ? {
					...n,
					text: "",
					replyId: void 0,
					attachments: n.attachments.filter((e) => e.phase === "error"),
					revision: n.revision + 1,
					phase: "idle",
					error: "",
					candidate: void 0,
					notice: "reviewed-discarded"
				} : {
					...n,
					phase: "idle",
					error: "",
					candidate: void 0,
					notice: "reviewed-kept"
				});
			},
			editPoll(e) {
				a && c && t && s.update((t) => ({
					...t,
					poll: {
						...t.poll,
						...e,
						revision: t.poll.revision + 1
					},
					notice: ""
				}));
			},
			async createPoll() {
				if (!b() || !d || _) return;
				let t = T(s).poll, n = {
					...t,
					question: t.question.trim(),
					options: t.options.map((e) => e.trim()).filter(Boolean)
				};
				if (!n.question || n.question.length > 300 || n.options.length < 2 || n.options.length > 10 || n.options.some((e) => e.length > 200)) {
					s.update((e) => ({
						...e,
						pollError: "poll-invalid"
					}));
					return;
				}
				let r = {
					token: Symbol(),
					form: n,
					baseline: new Set(Object.keys(l.polls || {})),
					baselineMessage: Tx(l),
					ack: !1
				};
				_ = r, s.update((e) => ({
					...e,
					pollPhase: "pending",
					pollError: "",
					pollCandidate: void 0,
					notice: ""
				}));
				try {
					let t = await d({
						t: "poll.create",
						thread: o.thread,
						question: n.question,
						options: n.options,
						multi: n.multi
					});
					if (!C(r)) return;
					if (!t.ok) {
						t.error === "offline" || t.error === "invalid command" ? (_ = void 0, s.update((e) => ({
							...e,
							pollPhase: "error",
							pollError: t.error
						}))) : k(r, t.error);
						return;
					}
					r.ack = !0, D(), C(r) && (r.timer = e.schedule(() => k(r, "unconfirmed"), sS));
				} catch (e) {
					k(r, e instanceof Error ? e.message : "failed");
				}
			},
			reviewPoll() {
				c && _ && T(s).pollPhase === "unconfirmed" && (x(_), _ = void 0, s.update((e) => ({
					...e,
					pollPhase: "idle",
					pollError: "",
					pollCandidate: void 0,
					notice: "reviewed"
				})));
			},
			dispose() {
				c = !1, x(g), x(_), g = void 0, _ = void 0;
				for (let e of y.values()) e.abort();
				y.clear(), m = void 0, l = void 0, d = void 0, f = void 0, s.set(aS());
			}
		};
		return A;
	}
	return {
		changes: { subscribe: o.subscribe },
		orphans(e) {
			return [...a.values()].filter((t) => {
				let n = T(t.state);
				return l(t.scope, e) && !!(n.text || n.replyId || n.attachments.length || n.poll.question || n.poll.multi || n.poll.options.some(Boolean));
			}).map((e) => ({
				scope: e.scope,
				state: T(e.state)
			}));
		},
		discardOrphan(e, n) {
			let r = f(e.scope), i = a.get(r);
			return !t || !i || !l(e.scope, n) || T(i.state) !== e.state ? !1 : (s.get(r)?.(), s.delete(r), a.delete(r), i.dispose(), c(), !0);
		},
		entry(e) {
			let t = f(e), n = a.get(t);
			if (!n) {
				if (a.size >= 64) {
					let t = [...a.values()].find((e) => {
						let t = T(e.state);
						return !t.text && !t.replyId && !t.attachments.length && (t.phase === "idle" || t.phase === "error") && !t.poll.question && !t.poll.options.some((e) => e) && !t.poll.multi && (t.pollPhase === "idle" || t.pollPhase === "error");
					});
					if (t) s.get(f(t.scope))?.(), s.delete(f(t.scope)), t.dispose(), a.delete(f(t.scope));
					else return m(e, !1);
				}
				n = m(e), a.set(t, n), s.set(t, n.state.subscribe(c));
			}
			return n;
		},
		reset() {
			n++, i = 0;
			for (let e of s.values()) e();
			s.clear();
			for (let e of a.values()) e.dispose();
			a.clear(), u.length = 0;
			for (let e of d) e.abort();
			d.clear(), c();
		},
		dispose() {
			t = !1, this.reset();
		}
	};
}
// svelte/roomStore.ts
function uS(e, t, n) {
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
function dS() {
	let e = v(null);
	return {
		subscribe: e.subscribe,
		get: () => T(e),
		replace: e.set,
		apply(t, n) {
			return e.update((e) => uS(e, t, n)), T(e);
		}
	};
}
// svelte/features/notifications/policy.ts
function fS(e, t, n, r, i, a) {
	let o = e.kind === "agent" || e.author === "ai", s = [...e.text.matchAll(/(?:^|[\s(])@([\p{L}\p{N}._-]+)/gu)].some((e) => a(e[1]) === t.me);
	if (e.author === t.me && !o || e.quiet || i || o && e.author !== t.me && !s && e.for_who !== t.me && t.messages.find((t) => t.id === e.reply_to)?.author !== t.me) return {
		chime: !1,
		browser: !1,
		mentioned: s
	};
	let c = r || e.thread !== n || s;
	return {
		chime: c,
		browser: c && r,
		mentioned: s
	};
}
// svelte/features/notifications/audio.ts
function pS() {
	let e = null, t = () => {
		try {
			e ??= new AudioContext(), e.resume().catch(() => {});
		} catch {}
	};
	return document.addEventListener("pointerdown", t, { once: !0 }), {
		unlock: t,
		play() {
			if (!e) return;
			let t = e.currentTime;
			for (let [n, r] of [[880, 0], [1318.5, .12]]) {
				let i = e.createOscillator(), a = e.createGain();
				i.type = "sine", i.frequency.value = n, a.gain.setValueAtTime(0, t + r), a.gain.linearRampToValueAtTime(.18, t + r + .02), a.gain.exponentialRampToValueAtTime(.001, t + r + .5), i.connect(a), a.connect(e.destination), i.start(t + r), i.stop(t + r + .55);
			}
		},
		dispose() {
			document.removeEventListener("pointerdown", t), e?.close().catch(() => {}), e = null;
		}
	};
}
// svelte/features/pwa/platform.ts
function mS() {
	let e = /iP(hone|ad|od)/.test(navigator.userAgent) || /Mac/.test(navigator.userAgent) && navigator.maxTouchPoints > 1, t = matchMedia("(display-mode: standalone)").matches || Reflect.get(navigator, "standalone") === !0;
	return {
		ios: e,
		standalone: t,
		iosWeb: e && !t,
		coarse: matchMedia("(pointer: coarse)").matches,
		safari: !e || /Safari\//.test(navigator.userAgent) && !/CriOS|FxiOS|EdgiOS|OPiOS|GSA|FBAN|FBAV|Instagram/.test(navigator.userAgent)
	};
}
function hS(e) {
	return "prompt" in e && typeof e.prompt == "function" && "userChoice" in e;
}
function gS(e) {
	if (typeof e != "object" || !e || !("outcome" in e) || e.outcome !== "accepted" && e.outcome !== "dismissed") throw Error("invalid-install-result");
	return e.outcome;
}
var _S = (e) => {
	try {
		return localStorage.getItem(e) === "1";
	} catch {
		return !1;
	}
};
function vS(e, t) {
	try {
		return localStorage.setItem(e, t ? "1" : ""), !0;
	} catch {
		return !1;
	}
}
// svelte/features/pwa/service.ts
function yS() {
	let e = v({
		...mS(),
		permission: "Notification" in window ? Notification.permission : "unsupported",
		muted: _S("vb.mute"),
		dismissed: _S("vb.pwaOff"),
		canInstall: !1,
		steps: !1,
		installBusy: !1,
		error: "",
		sent: null,
		testing: !1
	}), t = Yt(), n = Qt(t), r = Xt(n, {
		matchesKey: (e, t) => {
			let n = e.options?.applicationServerKey;
			if (!n) return !0;
			let r = new Uint8Array(n), i = Zt(t);
			return r.length === i.length && r.every((e, t) => e === i[t]);
		},
		get: async () => (await en())?.pushManager.getSubscription() ?? null,
		subscribe: async (e) => (await $t()).pushManager.subscribe({
			userVisibleOnly: !0,
			applicationServerKey: Zt(e)
		})
	}), i = pS(), a = 0, o = !0, s = null, c = !1, l = !1, u = null, d = /* @__PURE__ */ new Set(), f = () => "serviceWorker" in navigator && "PushManager" in window && !T(e).iosWeb, p = () => {
		o && e.update((e) => ({
			...e,
			...mS(),
			standalone: l || mS().standalone,
			permission: "Notification" in window ? Notification.permission : "unsupported"
		}));
	}, m = () => {
		if (p(), !o || !s || c || !f()) return Promise.resolve();
		let t = T(e);
		return r.set(s, t.permission === "granted" && !t.muted);
	}, h = (t) => {
		(t.key === "vb.mute" || t.key === "vb.pwaOff") && (e.update((e) => ({
			...e,
			muted: _S("vb.mute"),
			dismissed: _S("vb.pwaOff")
		})), m());
	}, g = () => {
		document.hidden || m();
	}, _ = (t) => {
		o && !T(e).ios && hS(t) && (t.preventDefault(), u = t, e.update((e) => ({
			...e,
			canInstall: !0
		})));
	}, y = () => {
		l = !0, u = null, p(), e.update((e) => ({
			...e,
			canInstall: !1
		}));
	}, b = matchMedia("(display-mode: standalone)"), x = matchMedia("(pointer: coarse)");
	return window.addEventListener("beforeinstallprompt", _), window.addEventListener("appinstalled", y), window.addEventListener("storage", h), document.addEventListener("visibilitychange", g), b.addEventListener("change", p), x.addEventListener("change", p), {
		state: e,
		push: r.state,
		account(t) {
			o && !c && s !== t && (s = t, a++, d.clear(), e.update((e) => ({
				...e,
				sent: null,
				testing: !1
			})), m());
		},
		refresh: m,
		retry() {
			m();
		},
		mute(t) {
			if (!o || c) return;
			let n = vS("vb.mute", t);
			e.update((e) => ({
				...e,
				muted: t,
				error: n ? "" : "storage"
			})), t || (i.unlock(), i.play()), m();
		},
		async bell() {
			if (!o || c) return !1;
			i.unlock(), p();
			let t = T(e), n = a;
			if (t.iosWeb || t.permission === "denied" || t.permission === "unsupported") return !1;
			if (t.permission === "default") {
				try {
					let e = await Notification.requestPermission();
					if (!o || c || n !== a) return !1;
					if (p(), e === "granted") return this.mute(!1), !0;
				} catch {
					o && !c && n === a && e.update((e) => ({
						...e,
						error: "permission"
					}));
				}
				return !1;
			}
			return this.mute(!t.muted), !0;
		},
		dismissInstall() {
			o && !c && (vS("vb.pwaOff", !0), e.update((e) => ({
				...e,
				dismissed: !0
			})));
		},
		async install() {
			if (!o || c || T(e).installBusy) return;
			let t = u;
			if (!t) e.update((e) => ({
				...e,
				steps: !e.steps
			}));
			else {
				u = null, e.update((e) => ({
					...e,
					installBusy: !0,
					error: "",
					canInstall: !1
				}));
				try {
					await t.prompt();
					let e = gS(await t.userChoice);
					o && e === "accepted" && (l = !0, p());
				} catch {
					o && e.update((e) => ({
						...e,
						error: "install"
					}));
				} finally {
					o && e.update((e) => ({
						...e,
						installBusy: !1
					}));
				}
			}
		},
		async test() {
			if (!o || c || T(e).testing) return;
			let n = a;
			e.update((e) => ({
				...e,
				testing: !0,
				error: "",
				sent: null
			}));
			try {
				let r = await t.test();
				o && n === a && e.update((e) => ({
					...e,
					sent: r.sent
				}));
			} catch {
				o && n === a && e.update((e) => ({
					...e,
					error: "test"
				}));
			} finally {
				o && n === a && e.update((e) => ({
					...e,
					testing: !1
				}));
			}
		},
		notify(t, n, r, l, u) {
			if (!o || c || s !== n.me || d.has(`${n.id}:${t.id}`)) return;
			d.add(`${n.id}:${t.id}`), d.size > 500 && d.delete(d.values().next().value);
			let f = fS(t, n, r, document.hidden, T(e).muted, l);
			if (f.chime && i.play(), f.browser && T(e).permission === "granted") try {
				let e = new Notification(`${f.mentioned ? "@ · " : ""}${u(t)} · ${n.book.title}`, {
					body: (t.text || "📎").slice(0, 180),
					tag: `vb-${n.id}`,
					icon: "/apple-touch-icon.png"
				});
				e.onclick = () => {
					o && window.focus(), e.close();
				};
			} catch {
				let r = a;
				$t().then(async (e) => {
					o && !c && r === a && await e.showNotification(`${f.mentioned ? "@ · " : ""}${u(t)} · ${n.book.title}`, {
						body: (t.text || "📎").slice(0, 180),
						tag: `vb-${n.id}`,
						icon: "/apple-touch-icon.png",
						data: { url: `/b/${n.id}${t.thread && t.thread !== "main" ? `?t=${encodeURIComponent(t.thread)}` : ""}#m${t.id}` }
					});
				}).catch(() => {
					o && !c && r === a && e.update((e) => ({
						...e,
						error: "foreground"
					}));
				});
			}
		},
		async beforeLogout() {
			return c = !0, a++, !("serviceWorker" in navigator) || !("PushManager" in window) ? {
				local: !0,
				settled: !0,
				confirmed: !0
			} : await r.beforeLogout();
		},
		dispose() {
			o = !1, r.dispose(), i.dispose(), window.removeEventListener("beforeinstallprompt", _), window.removeEventListener("appinstalled", y), window.removeEventListener("storage", h), document.removeEventListener("visibilitychange", g), b.removeEventListener("change", p), x.removeEventListener("change", p);
		}
	};
}
// svelte/features/file-viewer/navigation.ts
function bS(e, t, n, r) {
	let i = e?.popOutcome() ?? "none";
	return i === "handled" ? !0 : Mt(r) ? e?.restoreHistory(t) ?? !1 : i !== "route" && n();
}
// svelte/main.ts
var xS = /* @__PURE__ */ nn({
	consumeFileViewerPop: () => bS,
	createComposerDrafts: () => lS,
	createDocumentDrafts: () => Vu,
	createDocumentSession: () => Hu,
	createFileViewer: () => Wm,
	createPwaService: () => yS,
	createRoomMutations: () => iv,
	createRoomStore: () => dS,
	dismissDialogs: () => pt,
	documentTarget: () => Jt,
	fileTargetFromURL: () => Bt,
	fileVersions: () => Nt,
	knownViewerFiles: () => Rt,
	mountInbox: () => wS,
	mountPwa: () => TS,
	mountView: () => CS,
	pwaLogoutFailure: () => qu,
	pwaLogoutWarning: () => Ku,
	suggestionIdentity: () => M_
}), SS = {
	document: Pu,
	documentToolbar: Bu,
	documentPeek: Bu,
	home: ff,
	archived: yf,
	appNavigation: Pf,
	tasks: Xl,
	board: Op,
	files: qp,
	fileViewer: Cm,
	threadFiles: Dm,
	reminders: Wh,
	decisions: ah,
	sidebar: fv,
	threadHeader: X_,
	suggestionPreview: gv,
	chat: rx,
	composer: rS
};
function CS(e, t, n) {
	let r = v(n), i = SS[e], a = C(() => ie(rn, {
		target: t,
		props: {
			component: i,
			values: r
		}
	}));
	return {
		update(e) {
			C(() => r.set(e));
		},
		destroy() {
			C(() => {
				k(a);
			});
		}
	};
}
function wS(e, t) {
	let { waits: n, ...r } = t, i = v(n), a = C(() => ie(Vf, {
		target: e,
		props: {
			props: r,
			waits: i
		}
	}));
	return Object.assign(() => C(() => {
		k(a);
	}), { updateWaits(e) {
		C(() => i.set(e));
	} });
}
function TS(e, t, n, r) {
	let i = C(() => ie(t === "bell" ? rd : sd, {
		target: e,
		props: {
			owner: n,
			lang: r
		}
	}));
	return () => {
		C(() => {
			k(i);
		});
	};
}
export { bd as A, wh as C, kd as D, Ff as E, Ku as F, Vu as I, Hu as L, gd as M, vd as N, xd as O, qu as P, Th as S, Vm as T, Yg as _, bS as a, kg as b, lS as c, kv as d, Mv as f, M_ as g, iv as h, CS as i, cd as j, _d as k, Rv as l, Pv as m, wS as n, yS as o, jv as p, TS as r, dS as s, xS as t, Fv as u, a_ as v, Wm as w, Oh as x, t_ as y };
