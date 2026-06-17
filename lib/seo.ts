import type { Metadata } from "next";
import { BRAND, OG_IMAGE } from "./site";

export interface PageMetaInput {
  /** Page <title> (the root template appends " | 위트(weet)"). */
  title: string;
  description: string;
  /** Root-relative path for canonical + og:url, e.g. "/products". */
  path: string;
  /** Override the social image; defaults to the brand OG image. */
  ogImage?: string;
  /** Set true to exclude from indexing. */
  noindex?: boolean;
  keywords?: string[];
}

/**
 * Build a page-level Metadata object with a guaranteed canonical URL and
 * Open Graph / Twitter image.
 *
 * Per-page metadata that defines `openGraph` without an `images` array used to
 * drop the social image entirely; routing every page through this helper keeps
 * og:image present sitewide. (review backlog F04, F18, F43)
 */
export function buildPageMetadata({
  title,
  description,
  path,
  ogImage = OG_IMAGE,
  noindex,
  keywords,
}: PageMetaInput): Metadata {
  const images = [{ url: ogImage, alt: BRAND.name }];
  return {
    title,
    description,
    ...(keywords ? { keywords } : {}),
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: path,
      siteName: BRAND.name,
      title,
      description,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    ...(noindex
      ? { robots: { index: false, follow: false, googleBot: { index: false, follow: false } } }
      : {}),
  };
}
