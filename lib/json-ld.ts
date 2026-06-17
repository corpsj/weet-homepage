/**
 * Serialize data for an inline `<script type="application/ld+json">`.
 *
 * Plain `JSON.stringify` does NOT escape `<`, so any admin- or user-supplied
 * text that reaches a JSON-LD block (FAQ answers, product/model names, project
 * titles, breadcrumbs) could contain `</script>` and break out of the script
 * element — a stored-XSS vector. We replace the HTML-significant characters with
 * their `\uXXXX` JSON escapes: the parsed JSON is identical, but the raw markup
 * can no longer terminate the script tag. (`application/ld+json` is data, not
 * executable JS, so only the tag-breakout characters need escaping.)
 */
export function jsonLdHtml(data: unknown): string {
  return JSON.stringify(data).replace(
    /[<>&]/g,
    (ch) => "\\u" + ch.charCodeAt(0).toString(16).padStart(4, "0"),
  );
}
