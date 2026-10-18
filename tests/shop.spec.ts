import { test, expect, type Page } from "@playwright/test";

function shopElements(page: Page) {
  const main = page.getByRole("main");

  return {
    main,
    cards: main.getByTestId("product-card"),
    filterButton: main.getByRole("button", {
      name: /^Filter(?: \(\d+\))?$/,
    }),
    dialog: page.getByRole("dialog", {
      name: "Filter",
      exact: true,
    }),
    counter: main.getByRole("status").filter({
      hasText: /^\d+\s+Fragrances?$/,
    }),
  };
}

async function openFilters(page: Page) {
  const { filterButton, dialog } = shopElements(page);

  await filterButton.click();
  await expect(dialog).toBeVisible();

  return dialog;
}

async function selectWomen(page: Page) {
  const dialog = await openFilters(page);

  const genderGroup = dialog.getByRole("group", {
    name: "Gender",
    exact: true,
  });

  const checkbox = genderGroup.getByRole("checkbox", {
    name: "Women",
    exact: true,
  });

  // Click the visible label because the native input is visually hidden.
  await genderGroup.getByText("Women", { exact: true }).click();
  await expect(checkbox).toBeChecked();

  return dialog;
}

async function applyWomen(page: Page) {
  const dialog = await selectWomen(page);

  await dialog.getByRole("button", {
    name: "Apply filters",
    exact: true,
  }).click();

  await expect(dialog).not.toBeVisible();

  await expect(page).toHaveURL((url) => {
    return (
      url.pathname === "/en/shop" &&
      url.searchParams.get("genders") === "women"
    );
  });

  const { cards } = shopElements(page);

  // Do not allow an empty or unavailable catalog to pass this test.
  await expect(cards.first()).toBeVisible();

  // Wait for the rendered results, not just for the URL to change.
  await expect
    .poll(async () => {
      const texts = await cards.allTextContents();
      return (
        texts.length > 0 &&
        texts.every((text) => text.includes("For Her"))
      );
    })
    .toBe(true);
}

test.describe("Shop filters", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/en/shop");

    const { cards, filterButton } = shopElements(page);

    await expect(cards.first()).toBeVisible();
    await expect(filterButton).toBeEnabled();
  });

  test("applies the gender filter and updates the results and counter", async ({
    page,
  }) => {
    await applyWomen(page);

    const { cards, counter, filterButton } = shopElements(page);
    const resultCount = await cards.count();

    await expect(counter).toHaveText(
      `${resultCount} ${
        resultCount === 1 ? "Fragrance" : "Fragrances"
      }`,
    );

    await expect(filterButton).toHaveText("Filter (1)");
  });

  test("closing without applying discards the draft selection", async ({
    page,
  }) => {
    const { cards, counter } = shopElements(page);

    const initialNames = await cards
      .getByRole("link")
      .filter({ hasText: /\S/ })
      .allTextContents();

    const initialCounter = await counter.innerText();

    const dialog = await selectWomen(page);

    // There are two close controls: overlay and visible close button.
    await dialog.getByRole("button", {
      name: "Close filters",
      exact: true,
    }).last().click();

    await expect(dialog).not.toBeVisible();
    await expect(page).toHaveURL(/\/en\/shop$/);

    await expect(
      cards.getByRole("link").filter({ hasText: /\S/ }),
    ).toHaveText(initialNames);

    await expect(counter).toHaveText(initialCounter);

    const reopenedDialog = await openFilters(page);

    await expect(
      reopenedDialog
        .getByRole("group", { name: "Gender", exact: true })
        .getByRole("checkbox", { name: "Women", exact: true }),
    ).not.toBeChecked();
  });

  test("keeps the applied filter after reloading", async ({ page }) => {
    await applyWomen(page);
    await page.reload();

    const { cards } = shopElements(page);

    await expect(cards.first()).toBeVisible();

    await expect
      .poll(async () => {
        const texts = await cards.allTextContents();
        return (
          texts.length > 0 &&
          texts.every((text) => text.includes("For Her"))
        );
      })
      .toBe(true);

    const dialog = await openFilters(page);

    await expect(
      dialog
        .getByRole("group", { name: "Gender", exact: true })
        .getByRole("checkbox", { name: "Women", exact: true }),
    ).toBeChecked();
  });

  test("Clear all restores the catalog without pressing Apply", async ({
    page,
  }) => {
    const { cards, counter, filterButton } = shopElements(page);

    const initialNames = await cards
      .getByRole("link")
      .filter({ hasText: /\S/ })
      .allTextContents();

    const initialCounter = await counter.innerText();

    await applyWomen(page);

    const dialog = await openFilters(page);

    await dialog.getByRole("button", {
      name: "Clear all",
      exact: true,
    }).click();

    await expect(page).toHaveURL(/\/en\/shop$/);

    // Clear all applies immediately while leaving the panel open.
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole("checkbox", {
      checked: true,
    })).toHaveCount(0);

    // Read the catalog after closing the panel, without pressing Apply.
    await dialog.getByRole("button", {
      name: "Close filters",
      exact: true,
    }).last().click();

    await expect(dialog).not.toBeVisible();

    await expect(
      cards.getByRole("link").filter({ hasText: /\S/ }),
    ).toHaveText(initialNames);

    await expect(counter).toHaveText(initialCounter);
    await expect(filterButton).toHaveText("Filter");
  });
});