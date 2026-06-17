import { SITE_URL } from "@/lib/site";
import { jsonLdHtml } from "@/lib/json-ld";

export interface Crumb {
  name: string;
  /** Root-relative path, e.g. "/solution/energy". */
  path: string;
}

/**
 * Emits a schema.org BreadcrumbList as JSON-LD for deep pages, improving
 * breadcrumb rich-result eligibility. Safe in server or client components.
 * (review backlog F45)
 */
export function BreadcrumbJsonLd({ items }: { items: Crumb[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${SITE_URL}${c.path}`,
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLdHtml(data) }}
    />
  );
}
