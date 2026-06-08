import { type Product } from "@/data/products";

type ProductNote = NonNullable<Product["notes"]>[number];

export const PRIMARY_NOTE_FAMILIES: ProductNote[] = [
  "Floral",
  "Woody",
  "Amber",
  "Spice",
  "Musk",
  "Citrus",
  "Leather",
];

export function getAvailablePrimaryNotes(products: Product[]): ProductNote[] {
  const catalogNotes = new Set(
    products
      .flatMap((product) => product.notes ?? [])
      .map((note) => note.trim())
      .filter(Boolean),
  );

  return PRIMARY_NOTE_FAMILIES.filter((note) => catalogNotes.has(note));
}

export function sanitizeSelectedNotes(
  selected: string[],
  availableNotes: ProductNote[],
): ProductNote[] {
  const availableSet = new Set(availableNotes);
  return selected.filter((note): note is ProductNote => availableSet.has(note as ProductNote));
}

export function productMatchesAllNotes(
  product: Product,
  selectedNotes: ProductNote[],
): boolean {
  if (selectedNotes.length === 0) return true;

  const notes = product.notes ?? [];
  if (notes.length === 0) return false;

  return selectedNotes.every((note) => notes.includes(note));
}
