/** Center-crop to the existing 256px JPEG avatar contract. Caller owns permission to upload after every await. */
export async function avatarImage(
  file: File,
  current: () => boolean,
): Promise<Blob> {
  if (!["image/png", "image/jpeg", "image/webp"].includes(file.type))
    throw Error("unsupported-image");
  const image = await createImageBitmap(file);
  try {
    if (!current()) throw Error("cancelled");
    const size = Math.min(image.width, image.height);
    if (!size) throw Error("invalid-image");
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 256;
    const context = canvas.getContext("2d");
    if (!context) throw Error("invalid-image");
    context.drawImage(
      image,
      (image.width - size) / 2,
      (image.height - size) / 2,
      size,
      size,
      0,
      0,
      256,
      256,
    );
    const blob = await new Promise<Blob>((resolve, reject) =>
      canvas.toBlob(
        (value) => (value ? resolve(value) : reject(Error("invalid-image"))),
        "image/jpeg",
        0.86,
      ),
    );
    if (!current()) throw Error("cancelled");
    return blob;
  } finally {
    image.close();
  }
}
