import { expect, test } from "@playwright/test";
import { sanitizeShopifyHtml } from "@/lib/sanitize-shopify-html";

test.describe("Shopify rich text sanitization", () => {
  test("removes scripts and inline event handlers", () => {
    const result = sanitizeShopifyHtml(
      '<p onclick="alert(1)">Safe text</p><script>alert(1)</script><img src=x onerror="alert(1)">',
    );

    expect(result).toContain("<p>Safe text</p>");
    expect(result).not.toContain("<script");
    expect(result).not.toContain("onclick");
    expect(result).not.toContain("<img");
  });

  test("removes unsafe link protocols but preserves safe links and tables", () => {
    const result = sanitizeShopifyHtml(
      '<a href="javascript:alert(1)">Unsafe</a><a href="https://example.com">Safe</a><table><tbody><tr><th scope="col">Heading</th><td>Value</td></tr></tbody></table>',
    );

    expect(result).not.toContain("javascript:");
    expect(result).toContain("<a>Unsafe</a>");
    expect(result).toContain('<a href="https://example.com">Safe</a>');
    expect(result).toContain('<th scope="col">Heading</th>');
    expect(result).toContain("<td>Value</td>");
  });
});
