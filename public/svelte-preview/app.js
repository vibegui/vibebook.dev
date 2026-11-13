// svelte/bootstrap.ts
if (document.querySelector("meta[name=\"vb-page\"]")) {
	let e = document.getElementById("app");
	if (!e) throw Error("Missing native page root");
	let { mountAuthPage: t } = await import("./mount-suW-fb1s.js");
	t(e, document);
} else if (new URLSearchParams(location.search).get("gallery") === "1") {
	let e = document.getElementById("app");
	if (!e) throw Error("Missing gallery root");
	let { mountGallery: t } = await import("./main-D_rJUewA.js");
	t(e);
} else await import("./host-BSpHp62q.js");
