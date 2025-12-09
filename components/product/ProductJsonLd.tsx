import Script from "next/script";

type ProductJsonLdProps = {
  json: unknown;
  id?: string;
  strategy?: "afterInteractive" | "beforeInteractive" | "lazyOnload";
};

export default function ProductJsonLd({
  json,
  id = "jsonld-product",
  strategy = "afterInteractive",
}: ProductJsonLdProps) {
  return (
    <Script
      id={id}
      type="application/ld+json"
      strategy={strategy}
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
