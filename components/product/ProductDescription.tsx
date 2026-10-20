import sanitizeHtml from "sanitize-html";

type ProductDescriptionProps = {
  html?: string | null;
  fallback?: string | null;
};

export default function ProductDescription({
  html,
  fallback,
}: ProductDescriptionProps) {
  if (!html?.trim()) {
    return fallback?.trim() ? (
      <p className="whitespace-pre-line">{fallback}</p>
    ) : null;
  }

  const cleanHtml = sanitizeHtml(html, {
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
      "a",
    ],
    allowedAttributes: {
      a: ["href", "title"],
    },
    allowedSchemes: ["http", "https", "mailto", "tel"],
    allowProtocolRelative: false,
  });

  return (
    <div
      className="[&_a:hover]:text-gold space-y-4 [&_a]:underline [&_a]:underline-offset-4 [&_b]:font-semibold [&_blockquote]:border-l [&_blockquote]:border-black/20 [&_blockquote]:pl-4 [&_h2]:text-lg [&_h2]:font-normal [&_h3]:text-base [&_h3]:font-normal [&_li]:my-1 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:whitespace-pre-line [&_strong]:font-semibold [&_u]:underline [&_ul]:list-disc [&_ul]:pl-5"
      dangerouslySetInnerHTML={{ __html: cleanHtml }}
    />
  );
}
