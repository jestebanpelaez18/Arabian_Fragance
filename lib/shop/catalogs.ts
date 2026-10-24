import type { Product } from "@/data/products";

type ShopCatalog = {
  title: string;
  subtitle: string;
  collectionHandle: string | null;
  matches: (product: Product) => boolean;
};

// Shopify translates productType under @inContext(language), so each type
// is matched against its known translations (the English value is the key).
const PRODUCT_TYPE_ALIASES = {
  Perfume: ["Perfume", "Hajuvesi"],
  Attar: ["Attar"],
  "Body Mist": ["Body Mist"],
  "Discovery Set": ["Discovery Set"],
} as const;

type ProductType = keyof typeof PRODUCT_TYPE_ALIASES;

function hasProductType(
  product: Pick<Product, "productType">,
  type: ProductType,
): boolean {
  const aliases: readonly string[] = PRODUCT_TYPE_ALIASES[type];
  return aliases.includes(product.productType ?? "");
}

export function isAttar(product: Pick<Product, "productType">): boolean {
  return hasProductType(product, "Attar");
}

export function isPerfume(product: Pick<Product, "productType">): boolean {
  return hasProductType(product, "Perfume");
}

function belongsToPerfumeCollection(product: Product, handle: string): boolean {
  return (
    isPerfume(product) && (product.collectionHandles?.includes(handle) ?? false)
  );
}

export const COLLECTION_HANDLES = {
  luxury: "luxury-collection",
  premium: "premium-collection",
  essential: "essential-collection",
} as const;

export const SHOP_INDEX_COLLECTION_HANDLE = "perfumes";

export const SHOP_CATALOGS = {
  women: {
    title: "Women's Perfumes",
    subtitle:
      "Luminous florals with oriental warmth. Compositions crafted for elegance, sensuality and a lasting trail—unmistakably Arabian.",
    collectionHandle: null,
    matches: (product: Product) =>
      isPerfume(product) && product.gender === "women",
  },
  men: {
    title: "Men's Perfumes",
    subtitle:
      "Smoky woods, spice and amber facets in measured balance. Distinctive signatures designed for modern understatement.",
    collectionHandle: null,
    matches: (product: Product) =>
      isPerfume(product) && product.gender === "men",
  },
  unisex: {
    title: "Unisex Perfumes",
    subtitle:
      "Refined, versatile compositions: resinous depth, airy florals and citrus lift—contemporary scents made to be shared.",
    collectionHandle: null,
    matches: (product: Product) =>
      isPerfume(product) && product.gender === "unisex",
  },
  luxury: {
    title: "Luxury Collection",
    subtitle: "",
    collectionHandle: COLLECTION_HANDLES.luxury,
    matches: (product: Product) =>
      belongsToPerfumeCollection(product, COLLECTION_HANDLES.luxury),
  },
  premium: {
    title: "Premium Collection",
    subtitle: "",
    collectionHandle: COLLECTION_HANDLES.premium,
    matches: (product: Product) =>
      belongsToPerfumeCollection(product, COLLECTION_HANDLES.premium),
  },
  essential: {
    title: "Essential Collection",
    subtitle: "",
    collectionHandle: COLLECTION_HANDLES.essential,
    matches: (product: Product) =>
      belongsToPerfumeCollection(product, COLLECTION_HANDLES.essential),
  },
  tolas: {
    title: "Oils & Attars",
    subtitle: "",
    collectionHandle: "oils-attars",
    matches: isAttar,
  },
  "body-mists": {
    title: "Body Mists",
    subtitle: "",
    collectionHandle: "bath-body",
    matches: (product: Product) => hasProductType(product, "Body Mist"),
  },
  discovery: {
    title: "Discovery",
    subtitle: "",
    collectionHandle: "discovery",
    matches: (product: Product) => hasProductType(product, "Discovery Set"),
  },
} satisfies Record<string, ShopCatalog>;

export type ShopSlug = keyof typeof SHOP_CATALOGS;

export function isShopSlug(value: string): value is ShopSlug {
  return Object.prototype.hasOwnProperty.call(SHOP_CATALOGS, value);
}
