import { expect, test, type Page } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem("cookie_consent", "false");
  });
});

const PRODUCT_URL = "/en/product/honey-musk";

async function openProduct(page: Page) {
  const response = await page.goto(PRODUCT_URL);

  expect(response?.status()).toBe(200);

  const heading = page.getByRole("heading", { level: 1 });

  await expect(heading).toBeVisible();
  await expect(heading).toHaveText(/honey musk/i);

  const name = (await heading.innerText()).trim();

  const gallery = page.getByRole("group", {
    name,
    exact: true,
  });

  const panel = page.locator("aside").filter({ has: heading });

  await expect(gallery).toBeVisible();
  await expect(panel).toHaveCount(1);

  return { heading, gallery, panel };
}

async function expectNoHorizontalOverflow(page: Page) {
  try {
    await expect
      .poll(() =>
        page.evaluate(() => {
          const root = document.documentElement;

          return root.scrollWidth - root.clientWidth;
        }),
      )
      .toBeLessThanOrEqual(1);
  } catch (error) {
    const diagnostic = await page.evaluate(() => {
      const root = document.documentElement;
      const width = root.clientWidth;

      const elements = Array.from(
        document.querySelectorAll<HTMLElement>("body *"),
      )
        .filter((element) => {
          const rect = element.getBoundingClientRect();

          return (
            rect.width > 0 &&
            rect.height > 0 &&
            (rect.right > width + 1 || rect.left < -1)
          );
        })
        .map((element) => {
          const rect = element.getBoundingClientRect();

          const containers = [];
          let parent = element.parentElement;

          while (parent) {
            const overflowX = getComputedStyle(parent).overflowX;

            if (overflowX !== "visible") {
              containers.push({
                tag: parent.tagName.toLowerCase(),
                className: parent.className,
                overflowX,
              });
            }

            parent = parent.parentElement;
          }

          return {
            tag: element.tagName.toLowerCase(),
            id: element.id,
            className: element.getAttribute("class"),
            text: element.textContent?.trim().slice(0, 100),
            left: Math.round(rect.left * 100) / 100,
            right: Math.round(rect.right * 100) / 100,
            containers,
          };
        })
        .slice(0, 50);

      return {
        viewportWidth: width,
        documentWidth: root.scrollWidth,
        elements,
      };
    });

    await test.info().attach("horizontal-overflow.json", {
      body: JSON.stringify(diagnostic, null, 2),
      contentType: "application/json",
    });

    throw error;
  }
}

test.describe("Product detail page", () => {
  test("shows the product and loads its main photograph", async ({ page }) => {
    const { gallery } = await openProduct(page);

    // Honey Musk has the bottle and box photographs.
    await expect(gallery.getByRole("img")).toHaveCount(2);

    const primaryImage = gallery.getByRole("img").first();

    await expect(primaryImage).toBeVisible();

    await expect
      .poll(() =>
        primaryImage.evaluate(
          (image: HTMLImageElement) => image.complete && image.naturalWidth > 0,
        ),
      )
      .toBe(true);

    await expectNoHorizontalOverflow(page);
  });

  test("opens and closes the application accordion with the keyboard", async ({
    page,
  }) => {
    const { panel } = await openProduct(page);

    const application = panel.getByRole("button", {
      name: "The Art of Application",
      exact: true,
    });

    await expect(application).toHaveAttribute("aria-expanded", "false");

    const contentId = await application.getAttribute("aria-controls");

    expect(contentId).toBeTruthy();

    const content = page.locator(`[id="${contentId}"]`);

    await expect(content).toHaveCount(1);

    await application.focus();
    await expect(application).toBeFocused();

    await application.press("Enter");

    await expect(application).toHaveAttribute("aria-expanded", "true");
    await expect(content).toBeVisible();
    await expect(content).toContainText(/\S/);

    await application.press("Enter");

    await expect(application).toHaveAttribute("aria-expanded", "false");

    await expectNoHorizontalOverflow(page);
  });

  test("provides the localized shipping and returns links", async ({
    page,
  }) => {
    const { panel } = await openProduct(page);

    const policies = panel.getByRole("button", {
      name: /policies|shipping.*returns/i,
    });

    await expect(policies).toHaveCount(1);

    if ((await policies.getAttribute("aria-expanded")) !== "true") {
      await policies.click();
    }

    const shipping = panel.getByRole("link", {
      name: "Shipping",
      exact: true,
    });

    const returns = panel.getByRole("link", {
      name: "Returns & refunds",
      exact: true,
    });

    await expect(shipping).toBeVisible();
    await expect(shipping).toHaveAttribute(
      "href",
      "/en/policies/shipping-policy",
    );

    await expect(returns).toBeVisible();
    await expect(returns).toHaveAttribute("href", "/en/policies/refund-policy");
  });
});

const VIEWPORTS = [
  { name: "narrow mobile", width: 320, height: 740 },
  { name: "mobile", width: 390, height: 844 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "short laptop", width: 1280, height: 720 },
  { name: "desktop", width: 1440, height: 900 },
];

test.describe("Product responsive layout", () => {
  for (const viewport of VIEWPORTS) {
    test(`fits ${viewport.name} without overflowing`, async ({ page }) => {
      await page.setViewportSize({
        width: viewport.width,
        height: viewport.height,
      });

      const { gallery, panel } = await openProduct(page);

      await page.evaluate(() => document.fonts.ready);

      await expectNoHorizontalOverflow(page);

      const galleryBox = await gallery.boundingBox();
      const panelBox = await panel.boundingBox();

      expect(galleryBox).not.toBeNull();
      expect(panelBox).not.toBeNull();

      if (!galleryBox || !panelBox) {
        throw new Error("The gallery or product panel has no layout box.");
      }

      if (viewport.width < 1024) {
        // The product information follows the gallery on mobile and tablet.
        expect(panelBox.y).toBeGreaterThanOrEqual(
          galleryBox.y + galleryBox.height - 1,
        );

        // Images remain inside their own horizontal carousel.
        const carousel = await gallery.evaluate((element) => ({
          width: element.clientWidth,
          contentWidth: element.scrollWidth,
        }));

        expect(carousel.contentWidth).toBeGreaterThan(carousel.width);
      } else {
        // The gallery and information occupy separate desktop columns.
        expect(panelBox.x).toBeGreaterThanOrEqual(
          galleryBox.x + galleryBox.width - 1,
        );
      }

      // The final accordion must remain reachable, including on short laptops.
      const lastAccordion = panel.getByRole("button", {
        name: /^(policies|shipping\s*&\s*returns)$/i,
      });

      // Dismiss the cookie notice through its real control.

      // Reach the accordion using normal scrolling.
      // Check that its center is also free of overlapping elements.
      await expect
        .poll(
          async () => {
            const position = await lastAccordion.evaluate((element) => {
              const rect = element.getBoundingClientRect();

              const banner =
                document.querySelector("header[role='banner']") ??
                document.querySelector("header");

              const bannerBottom = Math.max(
                0,
                banner?.getBoundingClientRect().bottom ?? 0,
              );

              const fullyVisible =
                rect.top >= bannerBottom && rect.bottom <= window.innerHeight;

              const centerX = rect.left + rect.width / 2;
              const centerY = rect.top + rect.height / 2;

              const elementAtCenter = fullyVisible
                ? document.elementFromPoint(centerX, centerY)
                : null;

              return {
                reachable:
                  fullyVisible &&
                  elementAtCenter !== null &&
                  element.contains(elementAtCenter),
                direction: rect.top < bannerBottom ? -1 : 1,
              };
            });

            if (position.reachable) return true;

            await page.evaluate(
              async (delta) => {
                window.scrollBy({
                  top: delta,
                  left: 0,
                  behavior: "instant",
                });

                await new Promise<void>((resolve) => {
                  requestAnimationFrame(() => {
                    requestAnimationFrame(() => resolve());
                  });
                });
              },
              position.direction * Math.round(viewport.height * 0.4),
            );
            return false;
          },
          {
            message:
              "The final accordion should be reachable by scrolling without being covered",
            timeout: 10_000,
            intervals: [200],
          },
        )
        .toBe(true);

      // Verify that the user can actually operate it.
      await lastAccordion.click();

      await expect(lastAccordion).toHaveAttribute("aria-expanded", "true");

      await expectNoHorizontalOverflow(page);
    });
  }
});
