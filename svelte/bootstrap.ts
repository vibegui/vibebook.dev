import "./styles";

if (document.querySelector('meta[name="vb-page"]')) {
  const target = document.getElementById("app");
  if (!target) throw new Error("Missing native page root");
  const { mountAuthPage } = await import("./features/auth/mount");
  mountAuthPage(target, document);
} else if (new URLSearchParams(location.search).get("gallery") === "1") {
  const target = document.getElementById("app");
  if (!target) throw new Error("Missing gallery root");
  const { mountGallery } = await import("./gallery/main");
  mountGallery(target);
} else {
  const target = document.getElementById("app");
  if (!target) throw new Error("Missing native application root");
  const { mountApplication } = await import("./features/application/mount");
  mountApplication(target, document);
}
