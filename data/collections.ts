// src/data/collections.ts
export type CollectionSlug = "desert-oud" | "golden-sands" | "rose-of-dubai";

export const COLLECTIONS: {
  slug: CollectionSlug;
  name: string;
  hero: { image: string; subtitle?: string };
}[] = [
  {
    slug: "desert-oud",
    name: "Desert Oud",
    hero: {
      image: "/collections/desertoudHeader.jpg",
      subtitle:
        "Experience the essence of the Arabian desert in every drop. Let each fragrance transport you to a world of luxury and allure.",
    },
  },
  {
    slug: "golden-sands",
    name: "Golden Sands",
    hero: {
      image: "/collections/goldensandsHeader.jpg",
      subtitle: "Golden warmth and resinous depth meet modern elegance.",
    },
  },
  {
    slug: "rose-of-dubai",
    name: "Rose of Dubai",
    hero: {
      image: "/collections/roseofdubaiHeader.jpg",
      subtitle: "Lush rose intertwined with saffron spice and amber glow.",
    },
  },
];

export const COLLECTION_PRODUCTS: Record<CollectionSlug, string[]> = {
    "desert-oud":   ["p1","p2","p3","p4"], 
    "golden-sands": ["p2","p1","p3","p4"],
    "rose-of-dubai":["p3","p4","p1","p2"],
};
