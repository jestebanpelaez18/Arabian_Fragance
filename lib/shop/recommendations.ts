import type { Product } from "@/data/products";
import { COLLECTION_HANDLES } from "@/lib/shop/catalogs";

const PERFUME_COLLECTION_HANDLES = new Set<string>(
  Object.values(COLLECTION_HANDLES),
);

function normalize(value?: string): string {
  return value?.trim().toLowerCase() ?? "";
}

function toNormalizedSet(values: readonly string[] = []): Set<string> {
  return new Set(values.map(normalize).filter(Boolean));
}

function getPerfumeCollections(product: Product): Set<string> {
  return new Set(
    (product.collectionHandles ?? []).filter((handle) =>
      PERFUME_COLLECTION_HANDLES.has(handle),
    ),
  );
}

function countShared(first: Set<string>, second: Set<string>): number {
  return [...first].filter((value) => second.has(value)).length;
}

// Same gender ranks highest, unisex is compatible with any other gender.
function getGenderAffinity(current: string, candidate: string): number {
  if (!current || !candidate) return 0;
  if (current === candidate) return 2;
  if (current === "unisex" || candidate === "unisex") return 1;
  return 0;
}

/**
 * Picks products of the same type as `current`, ranked by shared main accords,
 * then same perfume collection, then gender affinity, then slug (stable order).
 */
export function getRecommendedProducts(
  products: Product[],
  current: Product,
  limit: number,
): Product[] {
  const currentType = normalize(current.productType);

  // Without a known type, avoid mixing unrelated product formats.
  if (!currentType) return [];

  const currentAccords = toNormalizedSet(current.notes);
  const currentCollections = getPerfumeCollections(current);
  const currentGender = normalize(current.gender);

  return products
    .filter(
      (product) =>
        product.id !== current.id &&
        normalize(product.productType) === currentType,
    )
    .map((product) => ({
      product,
      sharedAccords: countShared(
        currentAccords,
        toNormalizedSet(product.notes),
      ),
      sameCollection:
        countShared(currentCollections, getPerfumeCollections(product)) > 0,
      genderAffinity: getGenderAffinity(
        currentGender,
        normalize(product.gender),
      ),
    }))
    .sort(
      (a, b) =>
        b.sharedAccords - a.sharedAccords ||
        Number(b.sameCollection) - Number(a.sameCollection) ||
        b.genderAffinity - a.genderAffinity ||
        a.product.slug.localeCompare(b.product.slug),
    )
    .slice(0, limit)
    .map(({ product }) => product);
}
