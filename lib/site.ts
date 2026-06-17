/**
 * Central site identity constants.
 *
 * Canonical origin: production serves on the www apex (the non-www `we-et.com`
 * 307-redirects to `https://www.we-et.com`). `NEXT_PUBLIC_SITE_URL` is currently
 * set to the non-www host, so we normalize it here to enforce www across every
 * derived URL (canonical tags, sitemap, robots, Open Graph). This keeps the
 * indexed host consistent with the served host. (review backlog F03)
 */
function normalizeOrigin(raw: string | undefined): string {
  const fallback = "http://localhost:3000";
  let url: URL;
  try {
    url = new URL(raw ?? fallback);
  } catch {
    url = new URL(fallback);
  }
  // Enforce the www apex on the production domain.
  if (url.hostname === "we-et.com") {
    url.hostname = "www.we-et.com";
  }
  return url.origin;
}

export const SITE_URL = normalizeOrigin(process.env.NEXT_PUBLIC_SITE_URL);
export const SITE_ORIGIN = SITE_URL;

/** Default Open Graph / social share image (root-relative). */
export const OG_IMAGE = "/OG_LOGO.webp";

/** `metadataBase` for Next.js Metadata — single source of truth for absolute URLs. */
export const metadataBase = new URL(SITE_URL);

/** Build an absolute URL from a root-relative path. */
export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}

/**
 * Canonical brand strings. Use these instead of ad-hoc spellings so the brand
 * renders consistently sitewide. (review backlog F52)
 */
export const BRAND = {
  /** Full display name used in titles and metadata. */
  name: "위트(weet)",
  /** Korean short name. */
  short: "위트",
  /** Legal entity name. */
  legal: "주식회사 위트",
  /** Latin brand mark (lowercase is the canonical form). */
  en: "weet",
} as const;
