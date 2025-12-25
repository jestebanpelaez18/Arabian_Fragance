import { test, expect } from "@playwright/test";

test("smoke: home carga", async ({ page }) => {
  await page.goto("/"); // usa baseURL del config
  await expect(page.getByRole("main")).toBeVisible();
});
