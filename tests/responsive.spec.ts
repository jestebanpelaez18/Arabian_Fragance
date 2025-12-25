import { test, expect } from "@playwright/test";

test.describe("Layout responsivo", () => {
  test("mobile: menú y contenido", async ({ page }) => {
    await page.goto("/");
    const menuButton = page.getByRole("button", {
      name: /menú|menu|hamburger|abrir/i,
    });
    if (await menuButton.isVisible()) {
      await menuButton.click();
      await expect(page.getByRole("navigation")).toBeVisible();
    }
    await expect(page.getByRole("main")).toBeVisible();
  });

  test("desktop: cards visibles", async ({ page }) => {
    await page.goto("/");
    const cards = page.locator('[data-testid="product-card"]');
    await expect(cards.first()).toBeVisible();
  });
});
