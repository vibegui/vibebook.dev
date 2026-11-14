// svelte/features/account/image.ts
async function e(e, t) {
	if (![
		"image/png",
		"image/jpeg",
		"image/webp"
	].includes(e.type)) throw Error("unsupported-image");
	let n = await createImageBitmap(e);
	try {
		if (!t()) throw Error("cancelled");
		let e = Math.min(n.width, n.height);
		if (!e) throw Error("invalid-image");
		let r = document.createElement("canvas");
		r.width = r.height = 256;
		let i = r.getContext("2d");
		if (!i) throw Error("invalid-image");
		i.drawImage(n, (n.width - e) / 2, (n.height - e) / 2, e, e, 0, 0, 256, 256);
		let a = await new Promise((e, t) => r.toBlob((n) => n ? e(n) : t(Error("invalid-image")), "image/jpeg", .86));
		if (!t()) throw Error("cancelled");
		return a;
	} finally {
		n.close();
	}
}
export { e as t };
