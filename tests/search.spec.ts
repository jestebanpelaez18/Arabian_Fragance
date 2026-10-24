import { expect, test, type Locator, type Page } from "@playwright/test";

async function openSearch(page: Page) {
  const trigger = page
    .getByRole("banner")
    .getByRole("button", { name: "Search", exact: true });

  await expect(trigger).toBeVisible();
  await trigger.click();

  const dialog = page.getByRole("dialog", {
    name: "Search",
    exact: true,
  });

  const input = dialog.getByRole("searchbox", {
    name: "Search",
    exact: true,
  });

  await expect(dialog).toBeVisible();
  await expect(input).toBeFocused();

  return { trigger, dialog, input };
}

async function searchFor(page: Page, input: Locator, query: string) {
  await input.fill(query);

  const results = page.getByRole("region", {
    name: "Search results",
    exact: true,
  });

  await expect(results).toBeVisible();

  await expect.poll(() => results.getByRole("link").count()).toBeGreaterThan(0);

  return results;
}

async function expectNoHorizontalOverflow(page: Page) {
  await expect
    .poll(() =>
      page.evaluate(
        () =>
          document.documentElement.scrollWidth -
          document.documentElement.clientWidth,
      ),
    )
    .toBeLessThanOrEqual(1);
}

test.describe("Navigation search", () => {
  test("opens with focus and closes with Escape", async ({
    page,
    browserName,
  }) => {
    await page.goto("/en/shop");

    const { trigger, dialog, input } = await openSearch(page);

    await input.press("Escape");

    await expect(dialog).toHaveCount(0);
    // WebKit does not focus buttons on click, so there is no focus to restore.
    if (browserName !== "webkit") await expect(trigger).toBeFocused();

    await expect
      .poll(() => page.evaluate(() => document.body.style.overflow))
      .not.toBe("hidden");
  });

  test("searches by name and opens the correct product", async ({ page }) => {
    await page.goto("/en/shop");

    const { input, dialog } = await openSearch(page);
    const results = await searchFor(page, input, "Honey Musk");

    const product = results.getByRole("link", {
      name: "Honey Musk",
      exact: true,
    });

    await expect(product).toHaveCount(1);

    await expect(product).toHaveAttribute("href", "/en/product/honey-musk");

    await product.click();

    await expect(page).toHaveURL(/\/en\/product\/honey-musk$/);

    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Honey Musk",
    );

    await expect(dialog).toHaveCount(0);
  });

  test("shows results for the latest text after quick typing", async ({
    page,
  }) => {
    await page.goto("/en/shop");

    const { input } = await openSearch(page);

    await input.fill("Honey");
    await input.fill("Jamila");

    const results = page.getByRole("region", {
      name: "Search results",
      exact: true,
    });

    await expect(
      results.getByRole("link", {
        name: "Jamila",
        exact: true,
      }),
    ).toBeVisible();

    await expect(
      results.getByRole("link", {
        name: "Honey Musk",
        exact: true,
      }),
    ).toHaveCount(0);
  });

  for (const note of ["oud", "vanilla"]) {
    test(`finds Honey Musk through its ${note} note`, async ({ page }) => {
      await page.goto("/en/shop");

      const { input } = await openSearch(page);
      const results = await searchFor(page, input, note);

      await expect(
        results.getByRole("link", {
          name: "Honey Musk",
          exact: true,
        }),
      ).toBeVisible();
    });
  }

  const catalogCases = [
    {
      name: "gender combined with product type",
      catalog: "/en/shop/unisex",
      query: "unisex perfume",
    },
    {
      name: "collection combined with product type",
      catalog: "/en/shop/luxury",
      query: "luxury perfume",
    },
    {
      name: "body mist product type",
      catalog: "/en/shop/body-mists",
      query: "body mist",
    },
  ];

  for (const example of catalogCases) {
    test(`matches the catalog for ${example.name}`, async ({ page }) => {
      await page.goto(example.catalog);

      const cards = page.getByTestId("product-card");

      await expect(cards.first()).toBeVisible();

      // Read the expected products from the corresponding catalog page.
      // Avoid hardcoding counts that change when products are added.
      const expectedNames = await cards
        .locator("a[aria-label]")
        .evaluateAll((links) =>
          links.map((link) => link.getAttribute("aria-label") ?? ""),
        );

      expect(expectedNames.length).toBeGreaterThan(0);
      expect(expectedNames.every((name) => name.trim().length > 0)).toBe(true);

      const { input } = await openSearch(page);
      const results = await searchFor(page, input, example.query);

      await expect(results.getByRole("link")).toHaveCount(expectedNames.length);

      const actualNames = await results
        .getByRole("heading", { level: 3 })
        .allTextContents();

      expect(actualNames.map((name) => name.trim()).sort()).toEqual(
        expectedNames.map((name) => name.trim()).sort(),
      );
    });
  }

  test("shows an empty state and restores suggestions when cleared", async ({
    page,
  }) => {
    await page.goto("/en/shop");

    const { dialog, input } = await openSearch(page);

    await input.fill("zzzxqvnonexistent");

    await expect(dialog.getByRole("status")).toContainText(/no results for/i);

    await expect(
      dialog.getByRole("region", {
        name: "Search results",
        exact: true,
      }),
    ).toHaveCount(0);

    await input.fill("");

    await expect(input).toHaveValue("");

    await expect(
      dialog.getByRole("heading", {
        name: "Top products",
        exact: true,
      }),
    ).toBeVisible();

    await expect(dialog.getByRole("status")).not.toContainText(
      /no results for/i,
    );

    await expect
      .poll(() => dialog.getByRole("link").count())
      .toBeGreaterThan(0);
  });
});

const SEARCH_VIEWPORTS = [
  { name: "narrow mobile", width: 320, height: 740, columns: 2 },
  { name: "tablet", width: 768, height: 1024, columns: 3 },
  { name: "short laptop", width: 1280, height: 720, columns: 4 },
];

test.describe("Search responsive layout", () => {
  for (const viewport of SEARCH_VIEWPORTS) {
    test(`fits ${viewport.name} and keeps the close button accessible`, async ({
      page,
    }) => {
      await page.setViewportSize({
        width: viewport.width,
        height: viewport.height,
      });

      await page.goto("/en/shop");

      const { dialog, input } = await openSearch(page);

      await expectNoHorizontalOverflow(page);

      const results = await searchFor(page, input, "perfume");

      const grid = results.locator(":scope > div");

      await expect
        .poll(() =>
          grid.evaluate(
            (element) =>
              getComputedStyle(element).gridTemplateColumns.trim().split(/\s+/)
                .length,
          ),
        )
        .toBe(viewport.columns);

      await expectNoHorizontalOverflow(page);

      // Move to the final result inside the scrollable panel.
      const lastProduct = results.getByRole("link").last();

      await lastProduct.scrollIntoViewIfNeeded();
      await expect(lastProduct).toBeInViewport();

      const close = dialog.getByRole("button", {
        name: "Close search",
        exact: true,
      });

      await expect(close).toBeInViewport();

      await close.click();

      await expect(dialog).toHaveCount(0);
      await expectNoHorizontalOverflow(page);
    });
  }
});
