// svelte/bootstrap.ts
if (new URLSearchParams(location.search).get("gallery") === "1") {
	let e = document.getElementById("app");
	if (!e) throw Error("Missing gallery root");
	let { mountGallery: t } = await import("./main-4nFoapQw.js");
	t(e);
} else await import("./host-Bj2SS346.js");
