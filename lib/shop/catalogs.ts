import type { Product } from "@/data/products";

type ShopCatalog = {
  title: string;
  subtitle: string;
  matches: (product: Product) => boolean;
};

export function isPerfume(product: Product): boolean {
  return product.productType === "Perfume";
}

function belongsToPerfumeCollection(
  product: Product,
  handle: string,
): boolean {
  return (
    isPerfume(product) &&
    (product.collectionHandles?.includes(handle) ?? false)
  );
}

export const SHOP_CATALOGS = {
  women: {
    title: "Women's Perfumes",
    subtitle:
      "Luminous florals with oriental warmth. Compositions crafted for elegance, sensuality and a lasting trail—unmistakably Arabian.",
    matches: (product: Product) =>
      isPerfume(product) && product.gender === "women",
  },
  men: {
    title: "Men's Perfumes",
    subtitle:
      "Smoky woods, spice and amber facets in measured balance. Distinctive signatures designed for modern understatement.",
    matches: (product: Product) =>
      isPerfume(product) && product.gender === "men",
  },
  unisex: {
    title: "Unisex Perfumes",
    subtitle:
      "Refined, versatile compositions: resinous depth, airy florals and citrus lift—contemporary scents made to be shared.",
    matches: (product: Product) =>
      isPerfume(product) && product.gender === "unisex",
  },
  luxury: {
    title: "Luxury Collection",
    subtitle: "",
    matches: (product: Product) =>
      belongsToPerfumeCollection(product, "luxury-collection"),
  },
  premium: {
    title: "Premium Collection",
    subtitle: "",
    matches: (product: Product) =>
      belongsToPerfumeCollection(product, "premium-collection"),
  },
  essential: {
    title: "Essential Collection",
    subtitle: "",
    matches: (product: Product) =>
      belongsToPerfumeCollection(product, "essential-collection"),
  },
  tolas: {
    title: "Oils & Attars",
    subtitle: "",
    matches: (product: Product) => product.productType === "Attar",
  },
  "body-mists": {
    title: "Body Mists",
    subtitle: "",
    matches: (product: Product) => product.productType === "Body Mist",
  },
} satisfies Record<string, ShopCatalog>;

export type ShopSlug = keyof typeof SHOP_CATALOGS;

export function isShopSlug(value: string): value is ShopSlug {
  return Object.prototype.hasOwnProperty.call(SHOP_CATALOGS, value);
}