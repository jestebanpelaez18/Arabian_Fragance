import { VALID_NOTES, type Product } from "@/data/products";

type ProductNote = NonNullable<Product["notes"]>[number];

export function getAvailablePrimaryNotes(products: Product[]): ProductNote[] {
  const catalogNotes = new Set(
    products.flatMap((product) => product.notes ?? []),
  );

  return VALID_NOTES.filter((note) => catalogNotes.has(note));
}

export function sanitizeSelectedNotes(
  selected: string[],
  availableNotes: ProductNote[],
): ProductNote[] {
  const availableSet = new Set<string>(availableNotes);

  return Array.from(new Set(selected)).filter((note): note is ProductNote =>
    availableSet.has(note),
  );
}

export function productMatchesAnyNote(
  product: Product,
  selectedNotes: ProductNote[],
): boolean {
  if (selectedNotes.length === 0) return true;

  const notes = product.notes ?? [];

  return selectedNotes.some((note) => notes.includes(note));
}
