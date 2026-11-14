// svelte/features/chat/privacy.ts
var e = (e) => e.kind === "agent" && /^\u23f8/.test(e.text || "") && /"options":\["Aprovar","Negar"\]/.test(e.choices || ""), t = (e, t) => e.messages.find((e) => e.id === t) || e.origins?.find((e) => e.id === t), n = (e, t) => t?.kind === "agent" && t.author !== e.me && /^(⏸ Seu Claude|❓ Seu Claude)/.test(t.text || "");
function r(n, r) {
	if (!r.reply_to || r.kind === "agent") return !1;
	let i = t(n, r.reply_to);
	return !!i && e(i) && i.author === r.author;
}
function i(e, i) {
	let a = i.reply_to == null ? void 0 : t(e, i.reply_to);
	return !n(e, i) && !n(e, a) && !r(e, i);
}
var a = (e, t) => e.messages.filter((n) => n.thread === t && i(e, n));
export { i, e as n, a as r, t };
