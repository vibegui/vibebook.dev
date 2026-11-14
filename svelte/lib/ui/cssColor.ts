/** Resolve CSS Color 4 for editor awareness and the private terminal renderer.
 * Canvas only reads color bytes; it never paints application presentation. */
export function cssColorBytes(document: Document, color: string) {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 1;
  const context = canvas.getContext("2d", { willReadFrequently: true });
  if (!context) throw Error("Color conversion unavailable");
  context.fillStyle = "rgb(1, 2, 3)";
  context.fillStyle = color;
  const first = context.fillStyle;
  context.fillStyle = "rgb(4, 5, 6)";
  context.fillStyle = color;
  if (first !== context.fillStyle) throw Error("Color conversion failed");
  context.clearRect(0, 0, 1, 1);
  context.fillRect(0, 0, 1, 1);
  return context.getImageData(0, 0, 1, 1).data;
}
export function cssRGBA(document: Document, color: string): string {
  const [r, g, b, a] = cssColorBytes(document, color);
  return `rgba(${r}, ${g}, ${b}, ${a! / 255})`;
}
export function cssHex(document: Document, color: string): string {
  const [r, g, b] = cssColorBytes(document, color);
  return `#${[r!, g!, b!].map((value) => value.toString(16).padStart(2, "0")).join("")}`;
}
