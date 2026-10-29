import { expect, test, type Locator, type Page } from "@playwright/test";

type Locale = "en" | "fi" | "sv";

const COPY = {
  en: {
    search: /^Search$/i,
    results: "Search results",
    layering: "Layer With",
    layeringGuide: "The Art of Layering",
  },
  fi: {
    search: /^Haku$/i,
    results: "Hakutulokset",
    layering: "Yhdistä tuoksuun",
    layeringGuide: "Tuoksujen kerrostaminen",
  },
  sv: {
    search: /^(Sok|Sök)$/i,
    results: "Sökresultat",
    layering: "Kombinera med",
    layeringGuide: "Konsten att kombinera dofter",
  },
} as const;

const SEARCH_CASES = [
  {
    name: "women's perfumes",
    catalog: "/shop/women",
    english: "women perfume",
    localized: {
      fi: "naiset hajuvesi",
      sv: "dam parfym",
    },
  },
  {
    name: "men's perfumes",
    catalog: "/shop/men",
    english: "men perfume",
    localized: {
      fi: "miehet hajuvesi",
      sv: "herr parfym",
    },
  },
  {
    name: "unisex perfumes",
    catalog: "/shop/unisex",
    english: "unisex perfume",
    localized: {
      fi: "unisex hajuvesi",
      sv: "unisex parfym",
    },
  },
  {
    name: "luxury perfumes",
    catalog: "/shop/luxury",
    english: "luxury perfume",
    localized: {
      fi: "luxury hajuvesi",
      sv: "luxury parfym",
    },
  },
  {
    name: "body mists",
    catalog: "/shop/body-mists",
    english: "body mist",
    localized: {
      fi: "vartalosuihke",
      sv: "kroppsspray",
    },
  },
  {
    name: "discovery sets",
    catalog: "/shop/discovery",
    english: "discovery set",
    localized: {
      fi: "näytepakkaus",
      sv: "provset",
    },
  },
  {
    name: "attars",
    catalog: "/shop/tolas",
    english: "attar",
    localized: {
      fi: "hajusteöljy",
      sv: "parfymolja",
    },
  },
] as const;

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

async function visit(page: Page, path: string) {
  const response = await page.goto(path);

  expect(response?.status()).toBe(200);

  await expect(
    page.getByRole("main").getByRole("heading", { level: 1 }),
  ).toBeVisible();
}

async function readHandles(links: Locator): Promise<string[]> {
  const hrefs = await links.evaluateAll((elements) =>
    elements.map((element) => element.getAttribute("href")),
  );

  const handles = hrefs.map((href) => {
    const match = href?.match(/\/product\/([^/?#]+)/);

    if (!match) {
      throw new Error(`Invalid product link: ${href}`);
    }

    return match[1];
  });

  return Array.from(new Set(handles)).sort();
}

async function readCatalogHandles(page: Page): Promise<string[]> {
  const cards = page.getByRole("main").getByTestId("product-card");

  await expect(cards.first()).toBeVisible();

  return readHandles(cards.getByRole("link"));
}

async function openSearch(page: Page, locale: Locale) {
  const banner = page.getByRole("banner");

  await expect(banner).toHaveAttribute("data-navigation-ready", "true");

  await banner
    .getByRole("button", {
      name: COPY[locale].search,
    })
    .click();

  const dialog = page.getByRole("dialog", {
    name: COPY[locale].search,
  });

  await expect(dialog).toBeVisible();

  const input = dialog.getByRole("searchbox", {
    name: COPY[locale].search,
  });

  await expect(input).toBeFocused();

  return { dialog, input };
}

async function searchFor(
  dialog: Locator,
  input: Locator,
  locale: Locale,
  term: string,
) {
  await input.fill(term);
  await expect(input).toHaveValue(term);

  const results = dialog.getByRole("region", {
    name: COPY[locale].results,
    exact: true,
  });

  await expect(results).toBeVisible();
  await expect(results.getByRole("link").first()).toBeVisible();

  return results;
}

function layeringList(page: Page, locale: Locale) {
  const heading = page.getByRole("heading", { level: 1 });

  return page.locator("aside").filter({ has: heading }).getByRole("list", {
    name: COPY[locale].layering,
    exact: true,
  });
}

async function readLayeringHandles(page: Page, locale: Locale) {
  const list = layeringList(page, locale);

  await expect(list).toBeVisible();
  await expect(list.getByRole("link").first()).toBeVisible();

  return readHandles(list.getByRole("link"));
}

async function expectLocalizedLayeringLinks(page: Page, locale: Locale) {
  const links = layeringList(page, locale).getByRole("link");

  const hrefs = await links.evaluateAll((elements) =>
    elements.map((element) => element.getAttribute("href")),
  );

  expect(hrefs.length).toBeGreaterThan(0);

  for (const href of hrefs) {
    expect(href).toMatch(new RegExp(`^/${locale}/product/[^/?#]+$`));
  }
}

async function findEnglishLayeringExample(page: Page) {
  await visit(page, "/en/shop/tolas");

  const attarHandles = await readCatalogHandles(page);

  for (const attarHandle of attarHandles) {
    await visit(page, `/en/product/${attarHandle}`);

    const list = layeringList(page, "en");

    if ((await list.count()) === 0) {
      continue;
    }

    const perfumes = await readLayeringHandles(page, "en");

    if (perfumes.length > 0) {
      return {
        attarHandle,
        perfumes,
        perfumeHandle: perfumes[0],
      };
    }
  }

  throw new Error(
    "No English attar has layering products. " +
      "This test requires at least one configured pairing in Shopify.",
  );
}

test.describe("Search translations", () => {
  for (const locale of ["fi", "sv"] as const) {
    for (const example of SEARCH_CASES) {
      test(`${locale}: searches for ${example.name} in English and the local language`, async ({
        page,
      }) => {
        // Use the English category as an independent product baseline.
        await visit(page, `/en${example.catalog}`);

        const expected = await readCatalogHandles(page);

        expect(expected.length).toBeGreaterThan(0);

        await visit(page, `/${locale}/shop`);

        const { dialog, input } = await openSearch(page, locale);

        const queries = Array.from(
          new Set([example.english, example.localized[locale]]),
        );

        for (const query of queries) {
          const results = await searchFor(dialog, input, locale, query);

          await expect
            .poll(() => readHandles(results.getByRole("link")), {
              message:
                `${locale} search "${query}" should match ` +
                `the English ${example.catalog} catalog`,
            })
            .toEqual(expected);

          const hrefs = await results
            .getByRole("link")
            .evaluateAll((elements) =>
              elements.map((element) => element.getAttribute("href")),
            );

          for (const href of hrefs) {
            expect(href).toMatch(new RegExp(`^/${locale}/product/[^/?#]+$`));
          }
        }
      });
    }

    test(`${locale}: searching vanilla preserves the English results`, async ({
      page,
    }) => {
      await visit(page, "/en/shop");

      const englishSearch = await openSearch(page, "en");

      const englishResults = await searchFor(
        englishSearch.dialog,
        englishSearch.input,
        "en",
        "vanilla",
      );

      const expected = await readHandles(englishResults.getByRole("link"));

      // This is an existing catalog example used by the search tests.
      expect(expected).toContain("honey-musk");

      await visit(page, `/${locale}/shop`);

      const translatedSearch = await openSearch(page, locale);

      const localTerm = locale === "fi" ? "vanilja" : "vanilj";

      for (const query of ["vanilla", localTerm]) {
        const results = await searchFor(
          translatedSearch.dialog,
          translatedSearch.input,
          locale,
          query,
        );

        await expect
          .poll(() => readHandles(results.getByRole("link")))
          .toEqual(expected);
      }
    });
  }
});

test.describe("Layering translations", () => {
  test("preserves the same pairings from attar to perfume and back in every language", async ({
    page,
  }) => {
    // This test discovers a real pairing and visits both sides in three languages.
    test.setTimeout(120_000);

    const example = await findEnglishLayeringExample(page);

    await visit(page, `/en/product/${example.perfumeHandle}`);

    const expectedAttars = await readLayeringHandles(page, "en");

    expect(expectedAttars).toContain(example.attarHandle);

    for (const locale of ["en", "fi", "sv"] as const) {
      await visit(page, `/${locale}/product/${example.attarHandle}`);

      await expect
        .poll(() => readLayeringHandles(page, locale))
        .toEqual(example.perfumes);

      await expectLocalizedLayeringLinks(page, locale);

      const heading = page.getByRole("heading", { level: 1 });
      const panel = page.locator("aside").filter({ has: heading });

      await expect(
        panel.getByRole("button", {
          name: COPY[locale].layeringGuide,
          exact: true,
        }),
      ).toBeVisible();

      // Follow the real pairing link and verify its localized destination.
      await layeringList(page, locale)
        .locator(`a[href="/${locale}/product/${example.perfumeHandle}"]`)
        .click();

      await expect(page).toHaveURL(
        (url) => url.pathname === `/${locale}/product/${example.perfumeHandle}`,
      );

      await expect
        .poll(() => readLayeringHandles(page, locale))
        .toEqual(expectedAttars);

      await expectLocalizedLayeringLinks(page, locale);
    }
  });
});
