import { expect, test } from "@playwright/test";

const CONTACT_PAGES = [
  { locale: "en", heading: "Contact Us" },
  { locale: "fi", heading: "Ota yhteyttä" },
  { locale: "sv", heading: "Kontakta oss" },
] as const;

for (const { locale, heading } of CONTACT_PAGES) {
  test(`contact page works in ${locale}`, async ({ page }) => {
    await page.goto(`/${locale}/contact`);

    await expect(page.getByRole("heading", { level: 1 })).toHaveText(heading);
    await expect(
      page.getByRole("link", { name: "info@wantafc.com" }),
    ).toHaveAttribute("href", "mailto:info@wantafc.com");

    const directionsLink = page.getByRole("link", {
      name: /Mikonkatu 4/,
    });
    await expect(directionsLink).toHaveAttribute(
      "href",
      /google\.com\/maps\/search\/\?api=1&query=/,
    );
    await expect(directionsLink).toHaveAttribute("target", "_blank");
    await expect(directionsLink).toHaveAttribute("rel", "noopener noreferrer");

    const hasHorizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth,
    );
    expect(hasHorizontalOverflow).toBe(false);
  });
}
