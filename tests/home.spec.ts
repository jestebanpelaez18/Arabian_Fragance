import { test, expect } from "@playwright/test";

test.describe("Home", () => {
  test("muestra navegación y H1", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("navigation")).toBeVisible();
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });
});
