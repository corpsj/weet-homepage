/**
 * Global `next/image` loader.
 *
 * Why: Vercel's image optimizer (`/_next/image`) returns HTTP 402
 * (OPTIMIZED_IMAGE_REQUEST_PAYMENT_REQUIRED) once the optimization quota is
 * exhausted, which broke every Supabase-hosted product/project image in
 * production. Setting this as `images.loaderFile` makes ALL images bypass the
 * Vercel optimizer:
 *   - Supabase Storage objects are routed through Supabase's own render/image
 *     transform, which preserves responsive resizing at no Vercel cost.
 *   - Every other source (local /images, Instagram CDN, data/blob) is served
 *     as-is.
 * (review backlog F01)
 */
interface ImageLoaderArgs {
  src: string;
  width: number;
  quality?: number;
}

export default function supabaseImageLoader({ src, width, quality }: ImageLoaderArgs): string {
  const q = quality ?? 75;

  // Supabase Storage public object -> render/image transform (responsive, no Vercel optimizer).
  if (src.includes("/storage/v1/object/public/")) {
    const base = src.split("?")[0].replace(
      "/storage/v1/object/public/",
      "/storage/v1/render/image/public/",
    );
    return `${base}?width=${width}&quality=${q}`;
  }

  // Already a render/image URL — normalize width/quality.
  if (src.includes("/storage/v1/render/image/public/")) {
    const base = src.split("?")[0];
    return `${base}?width=${width}&quality=${q}`;
  }

  // Local and other remote sources: serve directly (already web-optimized assets).
  return src;
}
