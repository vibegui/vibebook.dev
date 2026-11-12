import "../styles";
import { mountGallery } from "./main";

const target = document.getElementById("app");
if (!target) throw new Error("Missing component development root");
mountGallery(target);
