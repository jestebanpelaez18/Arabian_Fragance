import type { Product } from "@/data/products";

export type ProductNoteGroup = {
  id: "top" | "heart" | "base" | "key";
  values: string[];
};

function cleanNote(value: string): string {
  const trimmed = value.trim();

  const normalized = trimmed
    .toLowerCase()
    .replace(/[.!]+$/, "")
    .trim();

  if (
    normalized === "not disclosed by the manufacturer" ||
    normalized === "not disclosed"
  ) {
    return "";
  }

  return trimmed;
}

function cleanNotes(values?: readonly string[]): string[] {
  return Array.from(new Set((values ?? []).map(cleanNote).filter(Boolean)));
}

export function getProductNoteGroups(
  pyramid?: Product["pyramid"],
  keyNotes?: string | null,
): ProductNoteGroup[] {
  const pyramidGroups: ProductNoteGroup[] = [
    {
      id: "top",
      values: cleanNotes(pyramid?.top),
    },
    {
      id: "heart",
      values: cleanNotes(pyramid?.heart),
    },
    {
      id: "base",
      values: cleanNotes(pyramid?.base),
    },
  ];

  const availableGroups = pyramidGroups.filter(
    (group) => group.values.length > 0,
  );

  if (availableGroups.length > 0) return availableGroups;

  const keyNotesText = cleanNote(keyNotes ?? "");

  if (!keyNotesText) return [];

  return [
    {
      id: "key",
      values: [keyNotesText],
    },
  ];
}
