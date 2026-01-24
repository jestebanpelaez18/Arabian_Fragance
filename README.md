# Arabian Fragrance - Headless E-commerce (Production Code)

> ** NOTICE:**
> This repository contains the source code for a live production application ([wantafc.com](https://wantafc.com)).
> It allows you to review my coding style, project structure, and architectural decisions (Next.js 14 + Shopify Headless).
>
> **Access Level:** Public (Portfolio Mode).
> **Permissions:** Shared with explicit written authorization from the client.
> **Restrictions:** Cloning, modifying, or using this code for commercial purposes is strictly prohibited.

![Project Preview](https://wantafc.com/opengraph-image.png)

## 🛠 Tech Stack

* **Framework:** Next.js 14 (App Router, Server Components).
* **Language:** TypeScript.
* **Backend:** Shopify Plus (via Storefront API).
* **Styling:** Tailwind CSS.

## 📂 Architecture Highlights

If you are reviewing this code for a role, I recommend focusing on:

1.  **`lib/shopify/`**: Custom GraphQL fetcher implementation (lightweight, typed).
2.  **`app/shop/page.tsx`**: Dynamic filtering logic based on URL search params.
3.  **`components/cart/`**: Persistent cart state management.

---
**© 2026 Arabian Fragrance / Juanes.** All rights reserved.