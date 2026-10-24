import { expect, test, type Locator, type Page } from "@playwright/test";

const PERFUME_URL = "/en/product/honey-musk";

async function openPerfume(page: Page) {
  const response = await page.goto(PERFUME_URL);

  expect(response?.status()).toBe(200);

  const heading = page.getByRole("heading", { level: 1 });

  await expect(heading).toHaveText(/honey musk/i);

  const panel = page.locator("aside").filter({ has: heading });

  await expect(panel).toHaveCount(1);

  return { heading, panel };
}

async function openJild(page: Page) {
  await page.goto("/en/shop/tolas");

  // Find the real product URL through the catalog.
  const productLink = page
    .getByTestId("product-card")
    .getByRole("link", { name: /jild/i })
    .first();

  await expect(productLink).toBeVisible();
  await productLink.click();

  const heading = page.getByRole("heading", { level: 1 });

  await expect(heading).toHaveText(/jild/i);

  const panel = page.locator("aside").filter({ has: heading });

  await expect(panel).toHaveCount(1);

  return { heading, panel };
}

async function expandAccordion(button: Locator, page: Page) {
  await expect(button).toHaveCount(1);

  if ((await button.getAttribute("aria-expanded")) !== "true") {
    await button.click();
  }

  await expect(button).toHaveAttribute("aria-expanded", "true");

  const contentId = await button.getAttribute("aria-controls");

  if (!contentId) {
    throw new Error("The accordion has no aria-controls attribute.");
  }

  const content = page.locator(`[id="${contentId}"]`);

  await expect(content).toBeVisible();
  await expect(content).toHaveAttribute("aria-hidden", "false");
  await expect(content).not.toHaveAttribute("inert", "");

  return content;
}

test.describe("Product notes", () => {
  test("shows the perfume pyramid in the section and accordion", async ({
    page,
  }) => {
    const { panel } = await openPerfume(page);

    const notes = page.getByRole("region", {
      name: "Olfactory Notes",
      exact: true,
    });

    await expect(notes).toBeVisible();

    for (const name of ["Top Notes", "Heart Notes", "Base Notes"]) {
      const heading = notes.getByRole("heading", {
        name,
        exact: true,
      });

      await expect(heading).toHaveCount(1);

      const group = heading.locator("..");

      await expect(group.locator("p")).toContainText(/\S/);
    }

    await expect(notes).not.toContainText(/not disclosed by the manufacturer/i);

    const accordion = await expandAccordion(
      panel.getByRole("button", { name: /^notes$/i }),
      page,
    );

    await expect(accordion.locator("dt")).toHaveCount(3);
    await expect(accordion.locator("dd")).toHaveCount(3);

    for (const values of await accordion.locator("dd").allTextContents()) {
      expect(values.trim()).not.toBe("");
      expect(values).not.toMatch(/not disclosed/i);
    }
  });

  test("shows Key Notes for Jild instead of an undisclosed pyramid", async ({
    page,
  }) => {
    const { panel } = await openJild(page);

    const notes = page.getByRole("region", {
      name: "Olfactory Notes",
      exact: true,
    });

    await expect(
      notes.getByRole("heading", {
        name: "Key Notes",
        exact: true,
      }),
    ).toBeVisible();

    await expect(notes.getByRole("heading", { level: 3 })).toHaveCount(1);

    const displayedNotes = notes.locator("p");

    await expect(displayedNotes).toContainText(/\S/);

    const text = (await displayedNotes.innerText()).replace(/\s+/g, " ").trim();

    const accordion = await expandAccordion(
      panel.getByRole("button", {
        name: "Key Notes",
        exact: true,
      }),
      page,
    );

    // Both views must display the same key-note content.
    await expect(accordion).toContainText(text);

    await expect(accordion.locator("dt")).toHaveCount(0);
    await expect(notes).not.toContainText(/not disclosed/i);
    await expect(accordion).not.toContainText(/not disclosed/i);
  });
});

test.describe("Product layering", () => {
  test("links an attar to a perfume and the perfume back to that attar", async ({
    page,
  }) => {
    await openJild(page);

    const attarPath = new URL(page.url()).pathname;

    const layering = page.getByRole("region", {
      name: "Layer With",
      exact: true,
    });

    await expect(layering).toHaveCount(1);

    const perfumeLink = layering.getByRole("link").first();

    await expect(perfumeLink).toHaveAttribute(
      "href",
      /^\/en\/product\/[^/?#]+$/,
    );

    const perfumePath = await perfumeLink.getAttribute("href");
    const perfumeName = (
      await perfumeLink.getByRole("heading", { level: 3 }).innerText()
    ).trim();

    expect(perfumePath).not.toBe(attarPath);

    await perfumeLink.click();

    await expect(page).toHaveURL((url) => url.pathname === perfumePath);

    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      perfumeName,
    );

    const relatedAttar = page
      .getByRole("region", { name: "Layer With", exact: true })
      .getByRole("link")
      .filter({ has: page.getByRole("heading", { name: /jild/i }) });

    await expect(relatedAttar).toHaveCount(1);
    await expect(relatedAttar).toHaveAttribute("href", attarPath);

    await relatedAttar.click();

    await expect(page).toHaveURL((url) => url.pathname === attarPath);

    await expect(page.getByRole("heading", { level: 1 })).toHaveText(/jild/i);
  });
});

test.describe("Product purchase", () => {
  test("adds two units and preserves them after reloading the bag", async ({
    page,
  }) => {
    // Playwright starts each test with a separate browser context.
    const { heading, panel } = await openPerfume(page);

    const productName = (await heading.innerText()).trim();

    const addButton = panel.getByRole("button", {
      name: "Add to Bag",
      exact: true,
    });

    await expect(addButton).toBeEnabled();
    await addButton.click();

    await page.goto("/en/bag");

    const row = page
      .getByRole("listitem")
      .filter({ has: page.getByText(productName, { exact: true }) });

    await expect(row).toHaveCount(1);
    await expect(row.locator('span[aria-live="polite"]')).toHaveText("1");

    // Add again from the PDP to verify that it updates the existing item.
    await openPerfume(page);

    await page
      .locator("aside")
      .getByRole("button", { name: "Add to Bag", exact: true })
      .click();

    await page.goto("/en/bag");

    await expect(row).toHaveCount(1);
    await expect(row.locator('span[aria-live="polite"]')).toHaveText("2");

    await page.reload();

    await expect(row).toHaveCount(1);
    await expect(row.locator('span[aria-live="polite"]')).toHaveText("2");
  });
});
