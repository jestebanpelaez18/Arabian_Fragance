import type { getUiLabels } from "@/lib/i18n/uiLabels";

type NavLabels = ReturnType<typeof getUiLabels>["navbar"];

type NavLabelKey = {
  [K in keyof NavLabels]: NavLabels[K] extends string ? K : never;
}[keyof NavLabels];

export type NavLink = {
  path: string;
  label: NavLabelKey;
  emphasized?: boolean;
};

export type NavSection = {
  title: NavLabelKey;
  links: NavLink[];
};

/** Sections inside the "Perfumes" menu. */
export const PERFUME_SECTIONS: NavSection[] = [
  {
    title: "byCategory",
    links: [
      { path: "/shop/women", label: "womenPerfumes" },
      { path: "/shop/men", label: "menPerfumes" },
      { path: "/shop/unisex", label: "unisexPerfumes" },
      { path: "/shop", label: "shopAll", emphasized: true },
    ],
  },
  {
    title: "byCollection",
    links: [
      { path: "/shop/luxury", label: "luxuryCollection" },
      { path: "/shop/premium", label: "premiumCollection" },
      { path: "/shop/essential", label: "essentialCollection" },
    ],
  },
];

/** Top-level links shown next to "Perfumes". */
export const MAIN_LINKS: NavLink[] = [
  { path: "/shop/tolas", label: "oilsAttars" },
  { path: "/shop/body-mists", label: "bathBody" },
  { path: "/shop/discovery", label: "discovery" },
  { path: "/about", label: "houseOfArabian" },
];
