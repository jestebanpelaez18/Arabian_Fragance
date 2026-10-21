import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { shopifyFetch } from "@/lib/shopify/shopify";
import RecommendedProducts from "@/components/product/RecommendedProducts";
import ProductJsonLd from "@/components/product/ProductJsonLd";
import ProductGallery from "@/components/product/ProductGallery";
import ProductHeaderPanel from "@/components/product/ProductHeaderPanel";
import ProductNotes from "@/components/product/ProductNotes";
import { productJsonLd } from "@/lib/seo/jsonld";
import type { Product } from "@/data/products";
import { i18n, type Locale } from "@/i18n-config";
import { getShopifyLanguageCode } from "@/lib/shopify/locale";
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

type ShopifyMetafield = {
  value: string;
};

type LayeringReference = LayeringProduct & {
  __typename: "Product";
};

type ShopifyProduct = {
  id: string;
  title: string;
  description: string;
  descriptionHtml: string;
  handle: string;
  productType: string;
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
        altText?: string | null;
      };
    }[];
  };
  variants: {
    edges: {
      node: {
        id: string;
        sku?: string | null;
        price: {
          amount: string;
          currencyCode: string;
        };
      };
    }[];
  };
  ingredients?: ShopifyMetafield | null;
  notes?: ShopifyMetafield | null;
  topNotes?: ShopifyMetafield | null;
  heartNotes?: ShopifyMetafield | null;
  baseNotes?: ShopifyMetafield | null;
  gender?: ShopifyMetafield | null;
  fragranceType?: ShopifyMetafield | null;
  size?: ShopifyMetafield | null;
  concentration?: ShopifyMetafield | null;
  storageInstructions?: ShopifyMetafield | null;
  applicationInstructions?: ShopifyMetafield | null;
  layeringDescription?: ShopifyMetafield | null;
  layeringProducts?: {
    references?: {
      nodes: LayeringReference[];
    } | null;
  } | null;
};

type SingleProductOperation = {
  data?: {
    product: ShopifyProduct | null;
  };
  errors?: {
    message: string;
  }[];
};

type AllProductsOperation = {
  data?: {
    products: {
      edges: {
        node: {
          handle: string;
        };
      }[];
    };
  };
};

const singleProductQuery = `
  query SingleProduct(
    $handle: String!
    $language: LanguageCode!
  ) @inContext(language: $language) {
    product(handle: $handle) {
      id
      title
      description
      descriptionHtml
      handle
      productType
      availableForSale

      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }

      images(first: 2) {
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
            price {
              amount
              currencyCode
            }
          }
        }
      }

      ingredients: metafield(namespace: "custom", key: "ingredients") {
        value
      }
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
      fragranceType: metafield(
        namespace: "custom"
        key: "fragrance_type"
      ) {
        value
      }
      size: metafield(namespace: "custom", key: "size") {
        value
      }
      concentration: metafield(namespace: "custom", key: "concentration") {
        value
      }
      storageInstructions: metafield(
        namespace: "custom"
        key: "storage_instructions"
      ) {
        value
      }
      applicationInstructions: metafield(
        namespace: "custom"
        key: "application_instructions"
      ) {
        value
      }
      layeringDescription: metafield(
        namespace: "custom"
        key: "layering_description"
      ) {
        value
      }
      layeringProducts: metafield(
        namespace: "custom"
        key: "layering_products"
      ) {
        references(first: 20) {
          nodes {
            __typename
            ... on Product {
              id
              handle
              title
              featuredImage {
                url
                altText
              }
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
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

async function getProduct(slug: string, locale: Locale) {
  const response = await shopifyFetch<SingleProductOperation>({
    query: singleProductQuery,
    variables: {
      handle: slug,
      language: getShopifyLanguageCode(locale),
    },
  });

  if (response.body?.errors?.length) {
    throw new Error(
      response.body.errors.map((error) => error.message).join("; "),
    );
  }

  if (response.status >= 400 || !response.body?.data) {
    throw new Error("Unable to load the product from Shopify.");
  }

  return response.body.data.product;
}

export async function generateStaticParams() {
  const response = await shopifyFetch<AllProductsOperation>({
    query: getAllSlugsQuery,
  });

  const products = response.body?.data?.products?.edges ?? [];

  return i18n.locales.flatMap((locale) =>
    products.map(({ node }) => ({
      locale,
      slug: node.handle,
    })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const product = await getProduct(slug, locale);

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
  const product = await getProduct(slug, locale);

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
            stock={product.availableForSale ? 10 : 0}
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
          />
        </div>
      </section>

      <ProductNotes pyramid={pyramid} locale={locale} />

      <RecommendedProducts currentSlug={product.handle} locale={locale} />
    </div>
  );
}
