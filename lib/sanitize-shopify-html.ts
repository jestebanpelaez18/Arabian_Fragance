import sanitizeHtml from "sanitize-html";

export function sanitizeShopifyHtml(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: [
      "p",
      "br",
      "strong",
      "b",
      "em",
      "i",
      "u",
      "ul",
      "ol",
      "li",
      "blockquote",
      "h2",
      "h3",
      "h4",
      "a",
      "table",
      "thead",
      "tbody",
      "tfoot",
      "tr",
      "th",
      "td",
    ],
    allowedAttributes: {
      a: ["href", "title"],
      th: ["colspan", "rowspan", "scope"],
      td: ["colspan", "rowspan"],
    },
    allowedSchemes: ["http", "https", "mailto", "tel"],
    allowProtocolRelative: false,
  });
}
