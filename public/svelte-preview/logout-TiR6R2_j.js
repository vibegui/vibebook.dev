import { a as e, i as t, o as n, t as r } from "./registration-CMVJ0lsw.js";
// svelte/features/notifications/logout.ts
async function i(i) {
	if (i) return i.beforeLogout();
	if (!("serviceWorker" in navigator) || !("PushManager" in window)) return {
		local: !0,
		settled: !0,
		confirmed: !0
	};
	let a = t(n(e()), {
		get: async () => (await r())?.pushManager.getSubscription() ?? null,
		subscribe: async () => {
			throw Error("cleanup-cannot-subscribe");
		}
	});
	try {
		return await a.beforeLogout();
	} finally {
		a.dispose();
	}
}
export { i as cleanupCurrentDevicePush };
