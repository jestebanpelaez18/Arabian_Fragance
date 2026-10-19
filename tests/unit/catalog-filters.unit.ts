import { expect, test } from "@playwright/test";
import type { Product } from "@/data/products";
import { filterCatalog } from "@/lib/shop/catalog-filters";

const PRODUCTS: Product[] = [
  {
    id: "a",
    slug: "test-a",
    name: "Test A",
    price: 100,
    productType: "Perfume",
    gender: "women",
    notes: ["Floral"],
    collectionHandles: ["luxury-collection"],
  },
  {
    id: "b",
    slug: "test-b",
    name: "Test B",
    price: 100,
    productType: "Perfume",
    gender: "men",
    notes: ["Woody"],
    collectionHandles: ["premium-collection"],
  },
  {
    id: "c",
    slug: "test-c",
    name: "Test C",
    price: 100,
    productType: "Perfume",
    gender: "unisex",
    notes: ["Amber"],
    collectionHandles: ["essential-collection"],
  },
  {
    id: "d",
    slug: "test-d",
    name: "Test D",
    price: 100,
    productType: "Perfume",
    gender: "women",
    notes: ["Woody", "Amber"],
    collectionHandles: ["luxury-collection", "premium-collection"],
  },
];

const ALL_GROUPS = {
  allowGender: true,
  allowCollection: true,
};

function productIds(products: Product[]) {
  return products.map((product) => product.id);
}

test.describe("Catalog filter logic", () => {
  test("returns the full catalog when no filters are selected", () => {
    const result = filterCatalog(PRODUCTS, {}, ALL_GROUPS);

    expect(productIds(result.filtered)).toEqual(["a", "b", "c", "d"]);
  });

  test("matches any selected note: Floral OR Woody", () => {
    const result = filterCatalog(
      PRODUCTS,
      { notes: "Floral,Woody" },
      ALL_GROUPS,
    );

    expect(productIds(result.filtered)).toEqual(["a", "b", "d"]);
  });

  test("matches any selected gender: women OR men", () => {
    const result = filterCatalog(
      PRODUCTS,
      { genders: "women,men" },
      ALL_GROUPS,
    );

    expect(productIds(result.filtered)).toEqual(["a", "b", "d"]);
  });

  test("matches any selected collection without duplicating products", () => {
    const result = filterCatalog(
      PRODUCTS,
      { collections: "luxury,premium" },
      ALL_GROUPS,
    );

    expect(productIds(result.filtered)).toEqual(["a", "b", "d"]);
  });

  test("requires a match in every selected group", () => {
    const result = filterCatalog(
      PRODUCTS,
      {
        notes: "Woody",
        genders: "women",
        collections: "premium",
      },
      ALL_GROUPS,
    );

    expect(productIds(result.filtered)).toEqual(["d"]);
  });

  test("returns no products for a valid combination with no matches", () => {
    const result = filterCatalog(
      PRODUCTS,
      {
        notes: "Floral",
        genders: "men",
      },
      ALL_GROUPS,
    );

    expect(result.selectedNotes).toEqual(["Floral"]);
    expect(result.selectedGenders).toEqual(["men"]);
    expect(result.filtered).toEqual([]);
  });

  test("ignores unknown values while keeping valid selections", () => {
    const result = filterCatalog(
      PRODUCTS,
      {
        notes: "Floral,Unknown",
        genders: "women,unknown",
        collections: "luxury,unknown",
      },
      ALL_GROUPS,
    );

    expect(result.selectedNotes).toEqual(["Floral"]);
    expect(result.selectedGenders).toEqual(["women"]);
    expect(result.selectedCollections).toEqual(["luxury"]);
    expect(productIds(result.filtered)).toEqual(["a"]);
  });

  test("trims whitespace and removes duplicate selections", () => {
    const result = filterCatalog(
      PRODUCTS,
      {
        notes: " Woody,Woody, ,",
        genders: " women,women,",
        collections: " premium,premium,",
      },
      ALL_GROUPS,
    );

    expect(result.selectedNotes).toEqual(["Woody"]);
    expect(result.selectedGenders).toEqual(["women"]);
    expect(result.selectedCollections).toEqual(["premium"]);
    expect(productIds(result.filtered)).toEqual(["d"]);
  });

  test("ignores gender and collection filters when those groups are disabled", () => {
    const result = filterCatalog(PRODUCTS, {
      notes: "Woody",
      genders: "women",
      collections: "luxury",
    });

    expect(result.availableGenders).toEqual([]);
    expect(result.availableCollections).toEqual([]);
    expect(result.selectedGenders).toEqual([]);
    expect(result.selectedCollections).toEqual([]);
    expect(productIds(result.filtered)).toEqual(["b", "d"]);
  });

  test("handles an empty catalog", () => {
    const result = filterCatalog(
      [],
      {
        notes: "Floral",
        genders: "women",
        collections: "luxury",
      },
      ALL_GROUPS,
    );

    expect(result.filtered).toEqual([]);
    expect(result.allNotes).toEqual([]);
    expect(result.availableGenders).toEqual([]);
    expect(result.availableCollections).toEqual([]);
    expect(result.selectedNotes).toEqual([]);
    expect(result.selectedGenders).toEqual([]);
    expect(result.selectedCollections).toEqual([]);
  });
});
