import "./styles";

if (new URLSearchParams(location.search).get("gallery") === "1") {
  const target = document.getElementById("app");
  if (!target) throw new Error("Missing gallery root");
  const { mountGallery } = await import("./gallery/main");
  mountGallery(target);
} else {
  await import("./legacy/host.js");
}
