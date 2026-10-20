type ProductStatus = "draft" | "active";

export type Note =
  | "Woody"
  | "Floral"
  | "Amber"
  | "Spice"
  | "Musk"
  | "Citrus"
  | "Sweet"
  | "Fresh"
  | "Fruity"
  | "Aquatic"
  | "Gourmand"
  | "Earthy"
  | "Herbal"
  | "Powdery"
  | "Leather"
  | "Tobacco"
  | "Vanilla"
  | "Oud"
  | "Smoky";

export const VALID_NOTES: readonly Note[] = [
  "Woody",
  "Floral",
  "Amber",
  "Spice",
  "Musk",
  "Citrus",
  "Sweet",
  "Fresh",
  "Fruity",
  "Aquatic",
  "Gourmand",
  "Earthy",
  "Herbal",
  "Powdery",
  "Leather",
  "Tobacco",
  "Vanilla",
  "Oud",
  "Smoky",
];

export type Product = {
  id: string;
  slug: string;
  name: string;
  productType?: string;
  collectionHandles?: string[];
  price: number;
  concentration?: string;
  fragranceType?: string;
  image?: string | null;
  images?: string[];
  gender: "women" | "men" | "unisex";
  notes?: Note[];
  description?: string;
  pyramid?: {
    top?: string[];
    heart?: string[];
    base?: string[];
  };
  ingredients?: string;
  bestSeller?: boolean;
  sku?: string;
  volumeMl?: number;
  stock?: number;
  status?: ProductStatus;
};
