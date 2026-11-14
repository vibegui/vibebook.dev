// svelte/bootstrap.ts
if (document.querySelector("meta[name=\"vb-page\"]")) {
	let e = document.getElementById("app");
	if (!e) throw Error("Missing native page root");
	let { mountAuthPage: t } = await import("./mount-DqsGnTJJ.js");
	t(e, document);
} else if (new URLSearchParams(location.search).get("gallery") === "1") {
	let e = document.getElementById("app");
	if (!e) throw Error("Missing gallery root");
	let { mountGallery: t } = await import("./main--HBOkLv5.js");
	t(e);
} else {
	let e = document.getElementById("app");
	if (!e) throw Error("Missing native application root");
	let { mountApplication: t } = await import("./mount-B-h6RFO7.js");
	t(e, document);
}
