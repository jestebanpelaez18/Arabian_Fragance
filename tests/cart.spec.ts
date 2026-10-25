import { expect, test, type Locator, type Page } from "@playwright/test";

type CartFixture = {
  id: string;
  slug: string;
  name: string;
  price: number;
  qty: number;
  image: string;
};

const ITEMS: CartFixture[] = [
  {
    id: "gid://shopify/ProductVariant/900000001",
    slug: "honey-musk",
    name: "Honey Musk",
    price: 70,
    qty: 1,
    image: "/catalog/Bottle_3.png",
  },
  {
    id: "gid://shopify/ProductVariant/900000002",
    slug: "jamila",
    name: "Jamila",
    price: 100,
    qty: 1,
    image: "/catalog/Bottle_3.png",
  },
];

const CHECKOUT_DESTINATION = "https://checkout.example.test/session";

const CHECKOUT_ERROR = "We could not open checkout. Please try again.";

async function seedCart(page: Page, items: CartFixture[] = ITEMS) {
  await page.addInitScript((initialItems) => {
    // Preserve changes made during the test when the page reloads.
    if (localStorage.getItem("af-cart-v1") === null) {
      localStorage.setItem(
        "af-cart-v1",
        JSON.stringify({
          state: { items: initialItems },
          version: 1,
        }),
      );
    }
  }, items);
}

function fullBag(page: Page) {
  return page
    .getByRole("heading", {
      name: "Your Bag",
      level: 1,
      exact: true,
    })
    .locator("..");
}

function productRow(scope: Locator, name: string) {
  return scope.getByRole("listitem").filter({ hasText: name });
}

function subtotal(scope: Locator) {
  return scope.getByText("Subtotal", { exact: true }).locator("..");
}

async function openBag(page: Page) {
  const trigger = page.getByRole("link", {
    name: "Open bag",
    exact: true,
  });

  await trigger.click();

  const drawer = page.getByRole("dialog", {
    name: "Your Bag",
    exact: true,
  });

  await expect(drawer).toBeVisible();

  // Wait for the opening animation instead of using a fixed delay.
  await drawer.evaluate(async (element) => {
    await Promise.allSettled(
      element
        .getAnimations({ subtree: true })
        .map((animation) => animation.finished),
    );
  });

  return { drawer, trigger };
}

async function expectNoHorizontalOverflow(page: Page) {
  await expect
    .poll(() =>
      page.evaluate(() => {
        const root = document.documentElement;

        return root.scrollWidth - root.clientWidth;
      }),
    )
    .toBeLessThanOrEqual(1);
}

async function mockCheckoutDestination(page: Page) {
  await page.route("https://checkout.example.test/**", (route) =>
    route.fulfill({
      contentType: "text/html",
      body: `
          <!doctype html>
          <html lang="en">
            <head>
              <title>Test checkout</title>
            </head>
            <body>
              <h1>Checkout destination</h1>
            </body>
          </html>
        `,
    }),
  );
}

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem("cookie_consent", "false");
  });

  // Individual checkout tests override this with mock responses.
  // No test should create a real Shopify checkout.
  await page.route("**/api/checkout", (route) => route.abort());
});

test.describe("Shopping bag", () => {
  test("adds a real product from the PDP to the drawer", async ({ page }) => {
    await seedCart(page, []);
    await page.goto("/en/product/honey-musk");

    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Honey Musk",
        exact: true,
      }),
    ).toBeVisible();

    const addButton = page.getByRole("button", {
      name: /^add to bag$/i,
    });

    await expect(addButton).toBeEnabled();
    await addButton.click();

    const { drawer } = await openBag(page);
    const row = productRow(drawer, "Honey Musk");

    await expect(row).toBeVisible();

    await expect(
      row.getByRole("button", {
        name: "Decrease Honey Musk",
        exact: true,
      }),
    ).toBeDisabled();
  });

  test("updates quantities and totals and preserves them after reload", async ({
    page,
  }) => {
    await seedCart(page);
    await page.goto("/en/bag");

    const bag = fullBag(page);
    const honey = productRow(bag, "Honey Musk");

    const decrease = honey.getByRole("button", {
      name: "Decrease Honey Musk",
      exact: true,
    });

    const increase = honey.getByRole("button", {
      name: "Increase Honey Musk",
      exact: true,
    });

    await expect(decrease).toBeDisabled();
    await expect(subtotal(bag)).toContainText("€170.00");

    await increase.click();

    await expect(honey.getByText("2", { exact: true })).toBeVisible();

    await expect(honey).toContainText("€140.00");
    await expect(subtotal(bag)).toContainText("€240.00");

    await page.reload();

    await expect(
      productRow(fullBag(page), "Honey Musk").getByText("2", {
        exact: true,
      }),
    ).toBeVisible();

    await expect(subtotal(fullBag(page))).toContainText("€240.00");

    await productRow(fullBag(page), "Honey Musk")
      .getByRole("button", {
        name: "Decrease Honey Musk",
        exact: true,
      })
      .click();

    await expect(subtotal(fullBag(page))).toContainText("€170.00");

    await expect(
      productRow(fullBag(page), "Honey Musk").getByRole("button", {
        name: "Decrease Honey Musk",
        exact: true,
      }),
    ).toBeDisabled();
  });

  test("removes products and shows the empty state", async ({ page }) => {
    await seedCart(page);
    await page.goto("/en/bag");

    const bag = fullBag(page);

    await productRow(bag, "Jamila")
      .getByRole("button", {
        name: "Remove Jamila",
        exact: true,
      })
      .click();

    await expect(productRow(bag, "Jamila")).toHaveCount(0);
    await expect(subtotal(bag)).toContainText("€70.00");

    await productRow(bag, "Honey Musk")
      .getByRole("button", {
        name: "Remove Honey Musk",
        exact: true,
      })
      .click();

    await expect(
      bag.getByText("Your bag is empty", { exact: true }),
    ).toBeVisible();

    await expect(
      bag.getByRole("button", {
        name: "Checkout",
        exact: true,
      }),
    ).toHaveCount(0);

    await expect(
      bag.getByRole("link", {
        name: "Shop now",
        exact: true,
      }),
    ).toHaveAttribute("href", "/en/shop");

    await page.reload();

    await expect(
      fullBag(page).getByText("Your bag is empty", {
        exact: true,
      }),
    ).toBeVisible();
  });

  test("supports keyboard navigation and restores focus on close", async ({
    page,
    browserName,
  }) => {
    await seedCart(page);
    await page.goto("/en/bag");

    const { drawer, trigger } = await openBag(page);

    const close = drawer.getByRole("button", {
      name: "Close cart",
      exact: true,
    });

    const checkout = drawer.getByRole("button", {
      name: "Checkout",
      exact: true,
    });

    const forwardKey = browserName === "webkit" ? "Alt+Tab" : "Tab";

    const backwardKey =
      browserName === "webkit" ? "Alt+Shift+Tab" : "Shift+Tab";

    async function expectFocusInsideDrawer() {
      await expect
        .poll(
          () =>
            drawer.evaluate((element) => {
              const active = document.activeElement;

              return {
                inside: element.contains(active),
                tag: active?.tagName ?? null,
                label: active?.getAttribute("aria-label") ?? null,
                text: active?.textContent?.trim().slice(0, 100) ?? null,
              };
            }),
          {
            message: `Keyboard focus should remain in the drawer (${browserName})`,
          },
        )
        .toMatchObject({ inside: true });
    }

    await expect(close).toBeFocused();

    let reachedCheckout = false;

    for (let step = 0; step < 20; step += 1) {
      await page.keyboard.press(forwardKey);

      await expectFocusInsideDrawer();

      reachedCheckout = await checkout.evaluate(
        (element) => element === document.activeElement,
      );

      if (reachedCheckout) break;
    }

    expect(
      reachedCheckout,
      `Checkout should be reachable with the keyboard (${browserName})`,
    ).toBe(true);

    await page.keyboard.press(backwardKey);
    await expectFocusInsideDrawer();

    await page.keyboard.press("Escape");

    await expect(drawer).toBeHidden();
    await expect(trigger).toBeFocused();

    await expect
      .poll(() => page.evaluate(() => document.body.style.overflow))
      .not.toBe("hidden");

    await trigger.click();
    await expect(drawer).toBeVisible();

    await close.click();
    await expect(drawer).toBeHidden();
  });

  test("opens the full bag through View bag", async ({ page }) => {
    await seedCart(page);
    await page.goto("/en/shop");

    const { drawer } = await openBag(page);

    const viewBag = drawer.getByRole("link", {
      name: /^view bag$/i,
    });

    await expect(viewBag).toHaveAttribute("href", "/en/bag");
    await viewBag.click();

    await expect(page).toHaveURL(/\/en\/bag$/);
    await expect(drawer).toBeHidden();

    await expect(productRow(fullBag(page), "Honey Musk")).toBeVisible();

    await expect(subtotal(fullBag(page))).toContainText("€170.00");
  });
});

const VIEWPORTS = [
  { name: "narrow mobile", width: 320, height: 740 },
  { name: "tablet", width: 768, height: 900 },
  { name: "short desktop", width: 1280, height: 600 },
];

test.describe("Shopping bag responsive layout", () => {
  for (const viewport of VIEWPORTS) {
    test(`keeps products and checkout reachable on ${viewport.name}`, async ({
      page,
    }) => {
      await page.setViewportSize({
        width: viewport.width,
        height: viewport.height,
      });

      const manyItems = Array.from({ length: 12 }, (_, index) => ({
        ...ITEMS[0],
        id: `gid://shopify/ProductVariant/${900001000 + index}`,
        name: `Test fragrance ${index + 1}`,
        slug: `test-fragrance-${index + 1}`,
      }));

      await seedCart(page, manyItems);
      await page.goto("/en/bag");
      await page.evaluate(() => document.fonts.ready);

      await expectNoHorizontalOverflow(page);

      const pageCheckout = fullBag(page).getByRole("button", {
        name: "Checkout",
        exact: true,
      });

      await pageCheckout.scrollIntoViewIfNeeded();
      await expect(pageCheckout).toBeInViewport();

      await page.evaluate(() => {
        window.scrollTo({
          top: 0,
          behavior: "instant",
        });
      });

      const { drawer } = await openBag(page);

      const drawerCheckout = drawer.getByRole("button", {
        name: "Checkout",
        exact: true,
      });

      await expect(drawerCheckout).toBeInViewport();

      const lastProduct = productRow(drawer, "Test fragrance 12");

      await lastProduct.scrollIntoViewIfNeeded();

      await expect(lastProduct).toBeInViewport();
      await expect(drawerCheckout).toBeInViewport();

      await expect
        .poll(() =>
          drawer.evaluate(
            (element) => element.scrollWidth - element.clientWidth,
          ),
        )
        .toBeLessThanOrEqual(1);

      await expectNoHorizontalOverflow(page);
    });
  }
});

test.describe("Checkout handoff", () => {
  test("blocks repeated activation, preserves the bag on failure and allows retry", async ({
    page,
  }) => {
    await seedCart(page);
    await mockCheckoutDestination(page);

    let requests = 0;
    let payload: unknown;

    let releaseResponse: () => void = () => {};

    const responseGate = new Promise<void>((resolve) => {
      releaseResponse = resolve;
    });

    await page.route("**/api/checkout", async (route) => {
      requests += 1;
      payload = route.request().postDataJSON();

      if (requests === 1) {
        await responseGate;

        await route.fulfill({
          status: 500,
          json: {
            error: "Simulated checkout failure",
          },
        });

        return;
      }

      await route.fulfill({
        json: {
          url: CHECKOUT_DESTINATION,
        },
      });
    });

    await page.goto("/en/bag");

    const bag = fullBag(page);

    await bag
      .getByRole("button", {
        name: "Checkout",
        exact: true,
      })
      .click();

    try {
      const loadingButton = bag.getByRole("button", {
        name: "Redirecting…",
        exact: true,
      });

      await expect(loadingButton).toBeDisabled();

      await expect(loadingButton).toHaveAttribute("aria-busy", "true");

      await expect.poll(() => requests).toBe(1);

      expect(payload).toEqual(
        ITEMS.map((item) => ({
          id: item.id,
          qty: item.qty,
        })),
      );

      await page.keyboard.press("Enter");
      await page.keyboard.press("Enter");

      expect(requests).toBe(1);
    } finally {
      releaseResponse();
    }

    await expect(bag.getByRole("alert")).toHaveText(CHECKOUT_ERROR);

    const retryButton = bag.getByRole("button", {
      name: "Checkout",
      exact: true,
    });

    await expect(retryButton).toBeEnabled();
    await expect(bag.getByRole("listitem")).toHaveCount(2);
    await expect(subtotal(bag)).toContainText("€170.00");

    await retryButton.click();

    await expect(page).toHaveURL(CHECKOUT_DESTINATION);

    await expect(
      page.getByRole("heading", {
        name: "Checkout destination",
        exact: true,
      }),
    ).toBeVisible();

    expect(requests).toBe(2);
  });

  for (const failure of ["network error", "missing URL"] as const) {
    test(`recovers from ${failure} inside the drawer`, async ({ page }) => {
      await seedCart(page);
      await mockCheckoutDestination(page);

      let attempts = 0;

      await page.route("**/api/checkout", async (route) => {
        attempts += 1;

        if (attempts === 1) {
          if (failure === "network error") {
            await route.abort("failed");
          } else {
            await route.fulfill({
              json: {},
            });
          }

          return;
        }

        await route.fulfill({
          json: {
            url: CHECKOUT_DESTINATION,
          },
        });
      });

      await page.goto("/en/bag");

      const { drawer } = await openBag(page);

      const checkout = drawer.getByRole("button", {
        name: "Checkout",
        exact: true,
      });

      await checkout.click();

      await expect(drawer.getByRole("alert")).toHaveText(CHECKOUT_ERROR);

      await expect(checkout).toBeEnabled();

      await expect(drawer.getByRole("listitem")).toHaveCount(2);

      await expect(subtotal(drawer)).toContainText("€170.00");

      await checkout.click();

      await expect(page).toHaveURL(CHECKOUT_DESTINATION);

      expect(attempts).toBe(2);
    });
  }
});
