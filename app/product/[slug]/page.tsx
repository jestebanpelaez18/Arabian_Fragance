// app/product/[slug]/page.tsx

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { shopifyFetch } from "@/lib/shopify/shopify"; // Check if path is correct for your project
import RecommendedProducts from "@/components/product/RecommendedProducts";
import ProductJsonLd from "@/components/product/ProductJsonLd";
import ProductBreadcrumbs from "@/components/product/ProductBreadcrumbs";
import ProductImage from "@/components/product/ProductImage";
import { productJsonLd } from "@/lib/seo/jsonld";
import ProductHeaderPanel from "@/components/product/ProductHeaderPanel";

type Params = { slug: string };

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
            sku
          }
        }
      }
      # --- METAFIELDS ---
      
      ingredients: metafield(namespace: "custom", key: "ingredients") {
        value
      }
      
      # MAPPING: "notes" variable here is actually fetching "main_accord" (Subtitle)
      notes: metafield(namespace: "custom", key: "main_accord") {
        value
      }
      
      topNotes: metafield(namespace: "custom", key: "top_notes") {
        value
      }
      
      heartNotes: metafield(namespace: "custom", key: "hearth_notes") {
        value
      }
      
      baseNotes: metafield(namespace: "custom", key: "base_notes") {
        value
      }
      
      gender: metafield(namespace: "custom", key: "gender") {
        value
      }
      
      storage_instructions: metafield(namespace: "custom", key: "storage_instructions") {
        value
      }
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
  const response = await shopifyFetch({ query: getAllSlugsQuery });
  const products = response.body?.data?.products?.edges || [];

  return products.map(({ node }: any) => ({
    slug: node.handle,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  
  const response = await shopifyFetch({ 
    query: singleProductQuery, 
    variables: { handle: slug } 
  });
  
  const p = response.body?.data?.product;
  if (!p) return {};

  const title = `${p.title} | Arabian Fragrance`;
  const desc = p.description ? p.description.substring(0, 160) : `Discover ${p.title}`;
  const img = p.images?.edges?.[0]?.node?.url || "/placeholder.png";

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

export default async function ProductPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;

  const response = await shopifyFetch({ 
    query: singleProductQuery, 
    variables: { handle: slug } 
  });

  const p = response.body?.data?.product;
  if (!p) return notFound();

  const img = p.images?.edges?.[0]?.node?.url || "/catalog/Bottle_3.png";
  const priceAmount = parseFloat(p.priceRange.minVariantPrice.amount);
  const sku = p.variants?.edges?.[0]?.node?.sku || "N/A";
  
  // --- ROBUST PARSER FUNCTION (THE FIX) ---
  // This function cleans up brackets [], quotes "", and splits by multiple separators
  const cleanList = (value: string | undefined) => {
    if (!value) return [];
    
    // 1. Remove brackets [ ] and quotes " from the string
    // Converts '["ROSE" | "VANILLA"]' -> 'ROSE | VANILLA'
    // Converts '["Vanilla" · "Cedar"]' -> 'Vanilla · Cedar'
    let cleaned = value.replace(/[\[\]"]/g, '');

    // 2. Identify separator and split
    if (cleaned.includes('|')) {
      return cleaned.split('|').map(s => s.trim());
    }
    if (cleaned.includes('•')) {
      return cleaned.split('•').map(s => s.trim());
    }
    if (cleaned.includes('·')) { // Middle dot (seen in your screenshot)
      return cleaned.split('·').map(s => s.trim());
    }
    if (cleaned.includes(',')) {
      return cleaned.split(',').map(s => s.trim());
    }

    // 3. Fallback: return as single item
    return [cleaned];
  };

  const ingredients = p.ingredients?.value || "Ingredients not available yet.";
  const gender = p.gender?.value || "Unisex";
  const storage_instructions = p.storage_instructions?.value || "Store in a cool, dry place. Avoid direct sunlight.";
  
  // 'notes' variable here comes from 'main_accord' in the query
  // Using cleanList to fix the ["ROSE" | "VANILLA"] issue
  let notes = cleanList(p.notes?.value);
  
  const pyramid = {
    top: cleanList(p.topNotes?.value),
    heart: cleanList(p.heartNotes?.value),
    base: cleanList(p.baseNotes?.value),
  };

  // Fallback: If 'main_accord' is empty, construct it from the pyramid
  if (notes.length === 0) {
    notes = [...pyramid.top, ...pyramid.heart, ...pyramid.base];
  }

  // URLs
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const productUrl = `${siteUrl}/product/${slug}`;

  // JSON-LD Preparation
  const productForJson = {
    name: p.title,
    description: p.description,
    images: [img],
    sku: sku,
    price: priceAmount,
    slug: p.handle,
    available: p.availableForSale
  };

  // @ts-ignore 
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
            notes={notes} // This is the Subtitle (Main Accord)
            price={priceAmount}
            volumeMl={100} 
            sku={sku}
            stock={p.availableForSale ? 10 : 0}
            image={img}
            description={p.description}
            ingredients={ingredients}
            pyramid={pyramid} // This populates the Tabs (Top/Heart/Base)
            storage_instructions={storage_instructions}
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