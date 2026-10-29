import { expect, test, type Locator, type Page } from "@playwright/test";

type Locale = "en" | "fi" | "sv";
type TranslatedLocale = Exclude<Locale, "en">;

const COPY = {
  en: {
    filter: "Filter",
    scentProfile: "Scent profile",
    apply: "Apply filters",
    language: "English",
    description: "Description",
    application: "The Art of Application",
    purchase: /^(add to bag|out of stock)$/i,
  },
  fi: {
    filter: "Suodata",
    scentProfile: "Tuoksuprofiili",
    apply: "Käytä suodattimia",
    language: "Suomi",
    description: "Kuvaus",
    application: "Tuoksun käyttö",
    purchase: /^(lisää ostoskoriin|loppuunmyyty)$/i,
  },
  sv: {
    filter: "Filtrera",
    scentProfile: "Doftprofil",
    apply: "Tillämpa filter",
    language: "Svenska",
    description: "Beskrivning",
    application: "Konsten att applicera",
    purchase: /^(lägg i varukorgen|slut i lager)$/i,
  },
} as const;

// Expected visible translations, independent of the application's helper.
const NOTE_TRANSLATIONS: Record<string, Record<TranslatedLocale, string>> = {
  Woody: { fi: "Puinen", sv: "Träig" },
  Floral: { fi: "Kukkainen", sv: "Blommig" },
  Amber: { fi: "Ambra", sv: "Ambra" },
  Spice: { fi: "Mausteinen", sv: "Kryddig" },
  Musk: { fi: "Myski", sv: "Mysk" },
  Citrus: { fi: "Sitrus", sv: "Citrus" },
  Sweet: { fi: "Makea", sv: "Söt" },
  Fresh: { fi: "Raikas", sv: "Frisk" },
  Fruity: { fi: "Hedelmäinen", sv: "Fruktig" },
  Aquatic: { fi: "Vesimäinen", sv: "Akvatisk" },
  Gourmand: { fi: "Gourmand", sv: "Gourmand" },
  Earthy: { fi: "Maanläheinen", sv: "Jordig" },
  Herbal: { fi: "Yrttinen", sv: "Örtig" },
  Powdery: { fi: "Puuterinen", sv: "Pudrig" },
  Leather: { fi: "Nahka", sv: "Läder" },
  Tobacco: { fi: "Tupakka", sv: "Tobak" },
  Vanilla: { fi: "Vanilja", sv: "Vanilj" },
  Oud: { fi: "Oud", sv: "Oud" },
  Smoky: { fi: "Savuinen", sv: "Rökig" },
};

const CATALOG_PATHS = [
  "/shop",
  "/shop/women",
  "/shop/men",
  "/shop/unisex",
  "/shop/tolas",
  "/shop/body-mists",
  "/shop/discovery",
] as const;

const MAIN_LINKS = [
  { name: "Oils & Attars", path: "/shop/tolas" },
  { name: "Bath & Body", path: "/shop/body-mists" },
  { name: "Discovery", path: "/shop/discovery" },
  { name: "House of Arabian", path: "/about" },
];

const PERFUME_LINKS = [
  { name: /^Women's Perfumes$/i, path: "/shop/women" },
  { name: /^Men's Perfumes$/i, path: "/shop/men" },
  { name: /^Unisex Perfumes$/i, path: "/shop/unisex" },
  { name: /^Shop all$/i, path: "/shop" },
  {
    name: /^(?:The )?Luxury Collection$/i,
    path: "/shop/luxury",
  },
  {
    name: /^(?:The )?Premium Collection$/i,
    path: "/shop/premium",
  },
  {
    name: /^(?:The )?Essential Collection$/i,
    path: "/shop/essential",
  },
];

test.use({
  contextOptions: {
    reducedMotion: "reduce",
  },
});

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem("cookie_consent", "false");
  });
});

function productCards(page: Page) {
  return page.getByRole("main").getByTestId("product-card");
}

async function readProductHandles(page: Page): Promise<string[]> {
  const cards = productCards(page);

  await expect(cards.first()).toBeVisible();

  const handles = await cards.evaluateAll((elements) =>
    elements.map((element) => {
      const href = element.querySelector("a")?.getAttribute("href");
      const match = href?.match(/\/product\/([^/?#]+)/);

      if (!match) {
        throw new Error(`Product card has no valid product link: ${href}`);
      }

      return match[1];
    }),
  );

  expect(new Set(handles).size).toBe(handles.length);

  return handles.sort();
}

async function expectProducts(page: Page, expectedHandles: string[]) {
  await expect.poll(() => readProductHandles(page)).toEqual(expectedHandles);
}

async function openCatalog(page: Page, locale: Locale, path = "/shop") {
  const response = await page.goto(`/${locale}${path}`);

  expect(response?.status()).toBe(200);

  await expect(
    page.getByRole("main").getByRole("heading", { level: 1 }),
  ).toBeVisible();

  await expect(productCards(page).first()).toBeVisible();
}

async function waitForNavigation(page: Page) {
  const banner = page.getByRole("banner");

  await expect(banner).toHaveAttribute("data-navigation-ready", "true");

  return banner;
}

function usesMobileNavigation(page: Page) {
  const viewport = page.viewportSize();

  if (!viewport) {
    throw new Error("The test requires a configured viewport.");
  }

  return viewport.width < 1024;
}

async function openMobileMenu(page: Page) {
  const banner = await waitForNavigation(page);

  await banner
    .getByRole("button", {
      name: /^(open menu|avaa valikko|oppna meny|öppna meny)$/i,
    })
    .click();

  const drawer = page.getByRole("dialog");

  await expect(drawer).toBeVisible();

  return drawer;
}

async function switchLanguage(
  page: Page,
  currentLocale: Locale,
  nextLocale: Locale,
) {
  if (usesMobileNavigation(page)) {
    const drawer = await openMobileMenu(page);

    await drawer
      .getByRole("button", {
        name: /^(language|kieli|sprak|språk)\b/i,
      })
      .click();

    await drawer
      .getByRole("button", {
        name: COPY[nextLocale].language,
        exact: true,
      })
      .click();

    await expect(drawer).toBeHidden();
  } else {
    const banner = await waitForNavigation(page);

    await banner
      .getByRole("button", {
        name: new RegExp(`^${currentLocale}$`, "i"),
      })
      .click();

    await banner
      .getByRole("button", {
        name: COPY[nextLocale].language,
        exact: true,
      })
      .click();
  }
}

async function openNoteFilters(page: Page, locale: Locale) {
  await waitForNavigation(page);

  await page
    .getByRole("main")
    .getByRole("button", {
      name: new RegExp(`^${COPY[locale].filter}(?: \\(\\d+\\))?$`, "i"),
    })
    .click();

  const dialog = page.getByRole("dialog", {
    name: COPY[locale].filter,
    exact: true,
  });

  await expect(dialog).toBeVisible();

  const notes = dialog.getByRole("group", {
    name: new RegExp(`^${COPY[locale].scentProfile}$`, "i"),
  });

  await expect(notes).toBeVisible();

  return { dialog, notes };
}

async function readNoteLabels(group: Locator): Promise<string[]> {
  return (await group.locator("label").allTextContents())
    .map((text) => text.replace(/\s+/g, " ").trim())
    .sort();
}

async function applyWoody(
  page: Page,
  locale: Locale,
  dialog: Locator,
  notes: Locator,
) {
  const label = locale === "en" ? "Woody" : NOTE_TRANSLATIONS.Woody[locale];

  // The native checkbox is visually hidden; operate its visible label.
  await notes.getByText(label, { exact: true }).click();

  await expect(
    notes.getByRole("checkbox", { name: label, exact: true }),
  ).toBeChecked();

  await dialog
    .getByRole("button", {
      name: COPY[locale].apply,
      exact: true,
    })
    .click();

  await expect(dialog).toBeHidden();

  await expect(page).toHaveURL(
    (url) =>
      url.pathname === `/${locale}/shop` &&
      url.searchParams.get("notes") === "Woody",
  );
}

test.describe("Catalog translations", () => {
  for (const locale of ["fi", "sv"] as const) {
    for (const path of CATALOG_PATHS) {
      test(`${locale}${path} preserves the English catalog products`, async ({
        page,
      }) => {
        await openCatalog(page, "en", path);
        const expected = await readProductHandles(page);

        await openCatalog(page, locale, path);
        await expectProducts(page, expected);
      });
    }

    test(`${locale} preserves all note options, results and selection after reload`, async ({
      page,
    }) => {
      await openCatalog(page, "en");

      const englishFilters = await openNoteFilters(page, "en");
      const englishNotes = await readNoteLabels(englishFilters.notes);

      expect(englishNotes).toContain("Woody");

      const translatedNotes = englishNotes.map((note) => {
        const translation = NOTE_TRANSLATIONS[note]?.[locale];

        expect(
          translation,
          `Missing expected ${locale} translation for ${note}`,
        ).toBeTruthy();

        return translation;
      });

      await applyWoody(page, "en", englishFilters.dialog, englishFilters.notes);

      const expectedProducts = await readProductHandles(page);

      await openCatalog(page, locale);

      const translatedFilters = await openNoteFilters(page, locale);

      expect(await readNoteLabels(translatedFilters.notes)).toEqual(
        translatedNotes.sort(),
      );

      await applyWoody(
        page,
        locale,
        translatedFilters.dialog,
        translatedFilters.notes,
      );

      await expectProducts(page, expectedProducts);

      await page.reload();
      await expectProducts(page, expectedProducts);

      const reopened = await openNoteFilters(page, locale);

      await expect(
        reopened.notes.getByRole("checkbox", {
          name: NOTE_TRANSLATIONS.Woody[locale],
          exact: true,
        }),
      ).toBeChecked();
    });
  }
});

test.describe("Navigation languages", () => {
  for (const locale of ["en", "fi", "sv"] as const) {
    test(`${locale} keeps navigation names in English and links in the current language`, async ({
      page,
    }) => {
      await openCatalog(page, locale);

      let menu: Locator;

      if (usesMobileNavigation(page)) {
        const drawer = await openMobileMenu(page);

        for (const link of MAIN_LINKS) {
          await expect(
            drawer.getByRole("link", {
              name: link.name,
              exact: true,
            }),
          ).toHaveAttribute("href", `/${locale}${link.path}`);
        }

        await drawer
          .getByRole("button", { name: "Perfumes", exact: true })
          .click();

        menu = drawer;
      } else {
        const banner = await waitForNavigation(page);

        for (const link of MAIN_LINKS) {
          await expect(
            banner.getByRole("link", {
              name: link.name,
              exact: true,
            }),
          ).toHaveAttribute("href", `/${locale}${link.path}`);
        }

        const trigger = banner.getByRole("button", {
          name: "Perfumes",
          exact: true,
        });

        // Exercise the menu's keyboard interaction.
        await trigger.press("ArrowDown");
        await expect(trigger).toHaveAttribute("aria-expanded", "true");

        menu = banner.locator("#desktop-perfume-menu");
      }

      await expect(
        menu.getByRole("heading", { name: /^By category$/i }),
      ).toBeVisible();

      await expect(
        menu.getByRole("heading", { name: /^By collection$/i }),
      ).toBeVisible();

      for (const link of PERFUME_LINKS) {
        await expect(
          menu.getByRole("link", { name: link.name }),
        ).toHaveAttribute("href", `/${locale}${link.path}`);
      }

      await menu.getByRole("link", { name: /^Women's Perfumes$/i }).click();

      await expect(page).toHaveURL(
        (url) => url.pathname === `/${locale}/shop/women`,
      );

      await expect(productCards(page).first()).toBeVisible();
    });

    test(`${locale} shows the original product name and localized PDP controls`, async ({
      page,
    }) => {
      const response = await page.goto(`/${locale}/product/honey-musk`);

      expect(response?.status()).toBe(200);

      const heading = page.getByRole("heading", {
        level: 1,
        name: "Honey Musk",
        exact: true,
      });

      await expect(heading).toBeVisible();

      const panel = page.locator("aside").filter({ has: heading });

      await expect(panel).toHaveCount(1);

      await expect(
        panel.getByRole("button", {
          name: new RegExp(`^${COPY[locale].description}$`, "i"),
        }),
      ).toBeVisible();

      await expect(
        panel.getByRole("button", {
          name: new RegExp(`^${COPY[locale].application}$`, "i"),
        }),
      ).toBeVisible();

      await expect(
        panel.getByRole("button", {
          name: COPY[locale].purchase,
        }),
      ).toBeVisible();

      await page.evaluate(() => document.fonts.ready);

      await expect
        .poll(() =>
          page.evaluate(
            () =>
              document.documentElement.scrollWidth -
              document.documentElement.clientWidth,
          ),
        )
        .toBeLessThanOrEqual(1);
    });
  }

  test("switching languages preserves the category, query filters and products", async ({
    page,
  }) => {
    const path = "/shop/women";
    const query = "notes=Woody&collections=essential";

    await openCatalog(page, "en", `${path}?${query}`);
    const expectedProducts = await readProductHandles(page);

    let currentLocale: Locale = "en";

    for (const nextLocale of ["fi", "sv", "en"] as const) {
      await switchLanguage(page, currentLocale, nextLocale);

      await expect(page).toHaveURL(
        (url) =>
          url.pathname === `/${nextLocale}${path}` &&
          url.searchParams.get("notes") === "Woody" &&
          url.searchParams.get("collections") === "essential",
      );

      await expectProducts(page, expectedProducts);

      currentLocale = nextLocale;
    }
  });
});
