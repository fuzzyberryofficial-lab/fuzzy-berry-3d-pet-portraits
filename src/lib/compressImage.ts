"use client";

// Phone photos are often 3–8 MB each, and the checkout sends up to three of
// them to /api/orders in a single request. Vercel rejects request bodies over
// 4.5 MB, so without shrinking them first the "Pay" button can fail for anyone
// who uploads normal phone photos. Resizing to 1800px keeps plenty of detail for
// the artist while keeping each photo at about 1 MB or less.

const MAX_SIDE = 1800;
const QUALITY = 0.82;
// Small enough already — skip the work and keep the original file untouched.
const SKIP_BELOW_BYTES = 900 * 1024;

export async function compressImage(file: File): Promise<File> {
  if (file.size <= SKIP_BELOW_BYTES) return file;

  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height));
    const width = Math.round(bitmap.width * scale);
    const height = Math.round(bitmap.height * scale);

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return file;
    ctx.drawImage(bitmap, 0, 0, width, height);
    bitmap.close();

    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", QUALITY));
    if (!blob || blob.size >= file.size) return file;

    const baseName = file.name.replace(/\.[^.]+$/, "") || "photo";
    return new File([blob], `${baseName}.jpg`, { type: "image/jpeg", lastModified: file.lastModified });
  } catch {
    // Some browsers can't decode certain formats (e.g. HEIC outside Safari).
    // Fall back to the original rather than blocking the customer.
    return file;
  }
}
