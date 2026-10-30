import { test, expect } from "@playwright/test";

test.describe("Home", () => {
  test("shows navigation and the page heading across viewport sizes", async ({
    page,
    viewport,
  }) => {
    await page.goto("/");

    const header = page.getByRole("banner");
    await expect(header).toBeVisible();

    if (viewport && viewport.width < 1024) {
      await expect(
        header.getByRole("button", { name: "Open menu" }),
      ).toBeVisible();
    } else {
      await expect(
        header.getByRole("button", { name: "Perfumes" }),
      ).toBeVisible();
    }

    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });
});
