import type { Metadata } from "next";
import { notFound } from "next/navigation";
import RecommendedProducts from "@/components/product/RecommendedProducts";
import ProductJsonLd from "@/components/product/ProductJsonLd";
import ProductGallery from "@/components/product/ProductGallery";
import ProductHeaderPanel from "@/components/product/ProductHeaderPanel";
import ProductNotes from "@/components/product/ProductNotes";
import { productJsonLd } from "@/lib/seo/jsonld";
import type { Product } from "@/data/products";
import { i18n, type Locale } from "@/i18n-config";
import {
  getShopifyProductByHandle,
  getShopifyProductHandles,
} from "@/lib/shopify/get-product";
import {
  normalizeGender,
  normalizeToKnownNote,
  parseShopifyListField,
} from "@/lib/shopify/mapper";
import { isAttar, isPerfume } from "@/lib/shop/catalogs";
import {
  getLayeringAttars,
  type LayeringProduct,
} from "@/lib/shopify/get-layering-attars";

type Params = {
  slug: string;
  locale: Locale;
};

type Note = NonNullable<Product["notes"]>[number];

export async function generateStaticParams() {
  const handles = await getShopifyProductHandles();

  return i18n.locales.flatMap((locale) =>
    handles.map((slug) => ({
      locale,
      slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const product = await getShopifyProductByHandle(slug, locale);

  if (!product) return {};

  const title = `${product.title} | Arabian Fragrance`;

  const description = product.description
    ? product.description.substring(0, 160)
    : `Discover ${product.title}`;

  const image = product.images.edges[0]?.node.url || "/catalog/Bottle_3.png";

  return {
    title,
    description,
    openGraph: {
      type: "website",
      title,
      description,
      images: [image],
      siteName: "Arabian Fragrance",
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug, locale } = await params;
  const product = await getShopifyProductByHandle(slug, locale);

  if (!product) notFound();

  const productIsAttar = isAttar(product);

  const images = product.images.edges.map(({ node }) => node);

  const image = images[0]?.url || "/catalog/Bottle_3.png";

  const variant = product.variants.edges[0]?.node;

  const price = Number(
    variant?.price.amount ?? product.priceRange.minVariantPrice.amount,
  );

  const gender = normalizeGender(product.gender);

  const pyramid = {
    top: parseShopifyListField(product.topNotes),
    heart: parseShopifyListField(product.heartNotes),
    base: parseShopifyListField(product.baseNotes),
  };

  const mainAccords = parseShopifyListField(product.notes);

  const recommendationNotes =
    mainAccords.length > 0
      ? mainAccords
      : [...pyramid.top, ...pyramid.heart, ...pyramid.base];

  const notes: Note[] = Array.from(
    new Set(
      recommendationNotes
        .map(normalizeToKnownNote)
        .filter((note): note is Note => note !== undefined),
    ),
  );

  // An attar lists its linked perfumes; a perfume lists the attars that link to it.
  let layeringProducts: LayeringProduct[] = [];

  if (productIsAttar) {
    layeringProducts = (
      product.layeringProducts?.references?.nodes ?? []
    ).filter((item) => item.__typename === "Product" && item.id !== product.id);
  } else if (isPerfume(product)) {
    layeringProducts = await getLayeringAttars(product.id, locale);
  }

  const siteUrl = (
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ).replace(/\/$/, "");

  const productUrl = `${siteUrl}/${locale}/product/${product.handle}`;

  const productForJson: Product = {
    id: product.id,
    name: product.title,
    description: product.description,
    image,
    sku: variant?.sku || undefined,
    price,
    slug: product.handle,
    status: "active",
    gender,
    notes,
  };

  const jsonLd = productJsonLd(productForJson, {
    siteUrl,
    productUrl,
  });

  return (
    <div className="bg-background text-foreground">
      <ProductJsonLd json={jsonLd} />

      <section className="w-full px-5 pt-5 pb-8 lg:pt-6 lg:pb-12">
        <div className="grid grid-cols-1 items-start gap-y-8 lg:grid-cols-12 lg:gap-x-12 xl:gap-x-16">
          <div className="min-w-0 lg:col-span-6">
            <ProductGallery
              images={images}
              name={product.title}
              maxImages={productIsAttar ? 1 : 2}
            />
          </div>

          <ProductHeaderPanel
            name={product.title}
            mainAccords={mainAccords}
            price={price}
            fragranceType={product.fragranceType?.value.trim()}
            sizeLabel={product.size?.value.trim()}
            sku={variant?.sku}
            available={product.availableForSale}
            image={image}
            description={product.description}
            descriptionHtml={product.descriptionHtml}
            ingredients={product.ingredients?.value}
            pyramid={pyramid}
            storageInstructions={product.storageInstructions?.value}
            applicationInstructions={product.applicationInstructions?.value}
            layeringDescription={product.layeringDescription?.value}
            layeringProducts={layeringProducts}
            isAttar={productIsAttar}
            variantId={variant?.id}
            locale={locale}
            keyNotes={product.keyNotes?.value}
          />
        </div>
      </section>

      <ProductNotes
        pyramid={pyramid}
        keyNotes={product.keyNotes?.value}
        locale={locale}
      />

      <RecommendedProducts currentSlug={product.handle} locale={locale} />
    </div>
  );
}
