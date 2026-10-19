import { expect, test } from "@playwright/test";

test.describe("Shop responsive navigation", () => {
  test("mobile menu opens and closes", async ({ page, viewport }) => {
    test.skip(
      !viewport || viewport.width >= 1024,
      "Applies to viewports using the mobile menu",
    );

    await page.goto("/en/shop");

    const menuButton = page.getByRole("button", {
      name: "Open menu",
      exact: true,
    });

    await expect(menuButton).toBeVisible();
    await menuButton.click();

    const drawer = page.getByRole("dialog");

    await expect(drawer).toBeVisible();
    await expect(
      drawer.getByRole("button", { name: "Perfumes", exact: true }),
    ).toBeVisible();
    await expect(
      drawer.getByRole("link", { name: "Oils & Attars", exact: true }),
    ).toBeVisible();

    await menuButton.click();

    await expect(drawer).toHaveCount(0);
    await expect(page.getByRole("main")).toHaveCount(1);
    await expect(page.getByRole("main")).toBeVisible();
  });

  test("mobile perfume submenu navigates to a collection", async ({
    page,
    viewport,
  }) => {
    test.skip(
      !viewport || viewport.width >= 1024,
      "Applies to viewports using the mobile menu",
    );

    await page.goto("/en/shop");

    await page
      .getByRole("button", { name: "Open menu", exact: true })
      .click();

    const drawer = page.getByRole("dialog");

    await drawer
      .getByRole("button", { name: "Perfumes", exact: true })
      .click();

    const collectionLink = drawer.getByRole("link", {
      name: "The Luxury Collection",
      exact: true,
    });

    await expect(collectionLink).toBeVisible();
    await collectionLink.click();

    await expect(page).toHaveURL(/\/en\/shop\/luxury$/);
    await expect(page.getByRole("dialog")).toHaveCount(0);
    await expect(
      page.getByRole("main").getByTestId("product-card").first(),
    ).toBeVisible();
  });

  test("desktop perfume menu navigates to a collection", async ({
    page,
    viewport,
  }) => {
    test.skip(
      !viewport || viewport.width < 1024,
      "Applies to viewports using desktop navigation",
    );

    await page.goto("/en/shop");

    const header = page.getByRole("banner");

    await expect(
      header.getByRole("button", { name: "Open menu", exact: true }),
    ).toBeHidden();

    const perfumesButton = header.getByRole("button", {
      name: "Perfumes",
      exact: true,
    });

    await expect(perfumesButton).toBeVisible();
    await perfumesButton.hover();

    const collectionLink = header.getByRole("link", {
      name: "The Luxury Collection",
      exact: true,
    });

    await expect(collectionLink).toBeVisible();
    await collectionLink.click();

    await expect(page).toHaveURL(/\/en\/shop\/luxury$/);
    await expect(
      page.getByRole("main").getByTestId("product-card").first(),
    ).toBeVisible();
  });
});