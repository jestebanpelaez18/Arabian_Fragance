import type { Product } from "@/data/products";
import { COLLECTION_HANDLES } from "@/lib/shop/catalogs";
import {
  getAvailablePrimaryNotes,
  productMatchesAnyNote,
  sanitizeSelectedNotes,
} from "@/lib/shop/note-filters";

const GENDERS = ["women", "men", "unisex"] as const;

type Gender = (typeof GENDERS)[number];
type Collection = keyof typeof COLLECTION_HANDLES;

export type CatalogSearchParams = {
  notes?: string;
  genders?: string;
  collections?: string;
};

function parseSelection(value?: string): string[] {
  return Array.from(
    new Set(
      (value ?? "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    ),
  );
}

export function filterCatalog(
  products: Product[],
  params: CatalogSearchParams,
  {
    allowGender = false,
    allowCollection = false,
  }: {
    allowGender?: boolean;
    allowCollection?: boolean;
  } = {},
) {
  const allNotes = getAvailablePrimaryNotes(products);

  const availableGenders = allowGender
    ? GENDERS.filter((gender) =>
        products.some((product) => product.gender === gender),
      )
    : [];

  const availableCollections = allowCollection
    ? (Object.keys(COLLECTION_HANDLES) as Collection[]).filter((collection) =>
        products.some((product) =>
          product.collectionHandles?.includes(COLLECTION_HANDLES[collection]),
        ),
      )
    : [];

  const selectedNotes = sanitizeSelectedNotes(
    parseSelection(params.notes),
    allNotes,
  );

  const selectedGenders = parseSelection(params.genders).filter(
    (gender): gender is Gender =>
      availableGenders.some((available) => available === gender),
  );

  const selectedCollections = parseSelection(params.collections).filter(
    (collection): collection is Collection =>
      availableCollections.some((available) => available === collection),
  );

  const filtered = products.filter((product) => {
    const matchesNotes = productMatchesAnyNote(product, selectedNotes);

    const matchesGender =
      selectedGenders.length === 0 || selectedGenders.includes(product.gender);

    const matchesCollection =
      selectedCollections.length === 0 ||
      selectedCollections.some((collection) =>
        product.collectionHandles?.includes(COLLECTION_HANDLES[collection]),
      );

    return matchesNotes && matchesGender && matchesCollection;
  });

  return {
    filtered,
    allNotes,
    availableGenders,
    availableCollections,
    selectedNotes,
    selectedGenders,
    selectedCollections,
  };
}
