/** Image processing only: preserve the original icon's aspect ratio on transparent PNG. */
export async function roomIconPng(file: File): Promise<Blob> {
  const url = URL.createObjectURL(file);
  try {
    const image = await new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(Error("image unavailable"));
      img.src = url;
    });
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 128;
    const context = canvas.getContext("2d");
    if (!context) throw Error("image unavailable");
    const scale = Math.min(128 / image.naturalWidth, 128 / image.naturalHeight),
      width = image.naturalWidth * scale,
      height = image.naturalHeight * scale;
    context.drawImage(
      image,
      (128 - width) / 2,
      (128 - height) / 2,
      width,
      height,
    );
    return await new Promise<Blob>((resolve, reject) =>
      canvas.toBlob(
        (blob) => (blob ? resolve(blob) : reject(Error("image unavailable"))),
        "image/png",
      ),
    );
  } finally {
    URL.revokeObjectURL(url);
  }
}
