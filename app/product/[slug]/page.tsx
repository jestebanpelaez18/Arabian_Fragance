import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { shopifyFetch } from "@/lib/shopify/shopify";
import RecommendedProducts from "@/components/product/RecommendedProducts";
import ProductJsonLd from "@/components/product/ProductJsonLd";
import ProductBreadcrumbs from "@/components/product/ProductBreadcrumbs";
import ProductImage from "@/components/product/ProductImage";
import { productJsonLd } from "@/lib/seo/jsonld";
import ProductHeaderPanel from "@/components/product/ProductHeaderPanel";
import { type Product } from "@/data/products";

// --- TYPES ---
type Params = { slug: string };
type Gender = "women" | "men" | "unisex";
type Note = NonNullable<Product["notes"]>[number];

interface ShopifyMetafield {
  value: string;
}

interface SingleProductOperation {
  data: {
    product: {
      id: string;
      title: string;
      description: string;
      handle: string;
      availableForSale: boolean;
      priceRange: {
        minVariantPrice: {
          amount: string;
          currencyCode: string;
        };
      };
      images: {
        edges: {
          node: {
            url: string;
            altText?: string;
          };
        }[];
      };
      variants: {
        edges: {
          node: {
            id: string;
            sku?: string;
            price: { amount: string; currencyCode: string };
          };
        }[];
      };
      ingredients?: ShopifyMetafield;
      notes?: ShopifyMetafield;
      topNotes?: ShopifyMetafield;
      heartNotes?: ShopifyMetafield;
      baseNotes?: ShopifyMetafield;
      gender?: ShopifyMetafield;
      storage_instructions?: ShopifyMetafield;
    } | null;
  };
}

interface AllProductsOperation {
  data: {
    products: {
      edges: {
        node: {
          handle: string;
        };
      }[];
    };
  };
}

const singleProductQuery = `
  query SingleProduct($handle: String!) {
    product(handle: $handle) {
      id
      title
      description
      handle
      availableForSale
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 1) {
        edges {
          node {
            url
            altText
          }
        }
      }
      variants(first: 1) {
        edges {
          node {
            id
            sku
            price {amount currencyCode}
          }
        }
      }
      ingredients: metafield(namespace: "custom", key: "ingredients") { value }
      notes: metafield(namespace: "custom", key: "main_accord") { value }
      topNotes: metafield(namespace: "custom", key: "top_notes") { value }
      heartNotes: metafield(namespace: "custom", key: "hearth_notes") { value }
      baseNotes: metafield(namespace: "custom", key: "base_notes") { value }
      gender: metafield(namespace: "custom", key: "gender") { value }
      storage_instructions: metafield(namespace: "custom", key: "storage_instructions") { value }
    }
  }
`;

const getAllSlugsQuery = `
  query AllProducts {
    products(first: 100) {
      edges {
        node {
          handle
        }
      }
    }
  }
`;

export async function generateStaticParams() {
  const response = await shopifyFetch<AllProductsOperation>({
    query: getAllSlugsQuery,
  });
  const products = response.body?.data?.products?.edges || [];

  return products.map(({ node }) => ({
    slug: node.handle,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;

  const response = await shopifyFetch<SingleProductOperation>({
    query: singleProductQuery,
    variables: { handle: slug },
  });

  const p = response.body?.data?.product;
  if (!p) return {};

  const title = `${p.title} | Arabian Fragrance`;
  const desc = p.description
    ? p.description.substring(0, 160)
    : `Discover ${p.title}`;
  const img = p.images?.edges?.[0]?.node?.url || "/catalog/Bottle_3.png";

  return {
    title,
    description: desc,
    openGraph: {
      type: "website",
      title,
      description: desc,
      images: [img],
      siteName: "Arabian Fragrance",
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;

  const response = await shopifyFetch<SingleProductOperation>({
    query: singleProductQuery,
    variables: { handle: slug },
  });

  const p = response.body?.data?.product;
  if (!p) return notFound();

  const img = p.images?.edges?.[0]?.node?.url || "/catalog/Bottle_3.png";
  const priceAmount = parseFloat(p.priceRange.minVariantPrice.amount);
  const sku = p.variants?.edges?.[0]?.node?.sku || "N/A";
  const variantId = p.variants?.edges?.[0]?.node?.id;

  const cleanList = (value: string | undefined) => {
    if (!value) return [];
    const cleaned = value.replace(/[\[\]"]/g, "");
    if (cleaned.includes("|")) return cleaned.split("|").map((s) => s.trim());
    if (cleaned.includes("•")) return cleaned.split("•").map((s) => s.trim());
    if (cleaned.includes("·")) return cleaned.split("·").map((s) => s.trim());
    if (cleaned.includes(",")) return cleaned.split(",").map((s) => s.trim());
    return [cleaned];
  };

  const ingredients = p.ingredients?.value || "Ingredients not available yet.";
  const storage_instructions =
    p.storage_instructions?.value ||
    "Store in a cool, dry place. Avoid direct sunlight.";

  const rawGender = p.gender?.value?.toLowerCase();
  const gender: Gender =
    rawGender === "women" || rawGender === "men" || rawGender === "unisex"
      ? rawGender
      : "unisex";

  let notes = cleanList(p.notes?.value) as Note[];

  const pyramid = {
    top: cleanList(p.topNotes?.value) as string[],
    heart: cleanList(p.heartNotes?.value) as string[],
    base: cleanList(p.baseNotes?.value) as string[],
  };

  if (notes.length === 0) {
    notes = [...pyramid.top, ...pyramid.heart, ...pyramid.base] as Note[];
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const productUrl = `${siteUrl}/product/${slug}`;

  const productForJson: Product = {
    id: p.id,
    name: p.title,
    description: p.description,
    image: img,
    sku: sku,
    price: priceAmount,
    slug: p.handle,
    status: p.availableForSale ? "active" : "active",
    gender: gender,
    notes: notes,
  };

  const jsonLd = productJsonLd(productForJson, { siteUrl, productUrl });

  return (
    <main className="bg-background text-foreground">
      <ProductJsonLd json={jsonLd} />
      <ProductBreadcrumbs current={p.title} />

      <section className="mx-auto w-full max-w-[1600px] px-5 py-10">
        <div className="grid grid-cols-1 items-start gap-x-8 gap-y-10 md:grid-cols-12 lg:gap-x-12 xl:gap-x-16">
          <div className="md:col-span-7">
            <ProductImage src={img} alt={p.title} />
          </div>

          <ProductHeaderPanel
            name={p.title}
            notes={notes}
            price={priceAmount}
            volumeMl={100}
            sku={sku}
            stock={p.availableForSale ? 10 : 0}
            image={img}
            description={p.description}
            ingredients={ingredients}
            pyramid={pyramid}
            storage_instructions={storage_instructions}
            variantId={variantId}
          />
        </div>
      </section>

      <RecommendedProducts
        currentSlug={p.handle}
        currentNotes={notes}
        gender={gender}
      />
    </main>
  );
}
