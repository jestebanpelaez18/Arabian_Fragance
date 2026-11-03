# Arabian Fragrance

Custom headless storefront for Arabian Fragrance, built with Next.js and Shopify Storefront API.

Shopify manages the catalog and editable store content. This repository manages the storefront design, navigation, filtering, search and shopping bag. Checkout is created through Shopify and completed on Shopify's hosted checkout.

**Website:** https://wantafc.com  
**Hosting:** Vercel

## Technology

- Next.js 16 with App Router and React 19
- TypeScript
- Tailwind CSS 4
- Zustand for persistent shopping bag state
- Shopify Storefront API through GraphQL
- Playwright for unit and browser tests
- ESLint, Prettier and TypeScript checks

Supported locales are English (`en`), Finnish (`fi`) and Swedish (`sv`). English is the default.

## Local development

Use Node.js 20 to match the current GitHub Actions workflow.

### 1. Install dependencies

```bash
npm ci
```

### 2. Configure environment variables

Production environment variables are configured in Vercel. They are not automatically available on your computer.

To run the project locally, create `.env.local` in the project root, alongside `package.json`:

```dotenv
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-storefront-access-token
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Replace the Shopify placeholders with the values provided by the project administrator.

| Variable                          | Local development                          | Vercel production      |
| --------------------------------- | ------------------------------------------ | ---------------------- |
| `SHOPIFY_STORE_DOMAIN`            | Shopify store hostname, without `https://` | Shopify store hostname |
| `SHOPIFY_STOREFRONT_ACCESS_TOKEN` | Storefront API token                       | Configured in Vercel   |
| `NEXT_PUBLIC_SITE_URL`            | `http://localhost:3000`                    | `https://wantafc.com`  |

- `SHOPIFY_STORE_DOMAIN` identifies the Shopify backend, using its `.myshopify.com` hostname.
- `NEXT_PUBLIC_SITE_URL` is used for site metadata and absolute URLs. It does not configure domain ownership or DNS.
- `localhost:3000` is the address of the application running on your computer. It does not change the public website.
- Never commit `.env.local` or credentials to the repository.

Shopify access is required to load the catalog and editable content. Some editorial sections have local fallbacks, but these do not replace a configured Shopify connection.

### 3. Start the application

```bash
npm run dev
```

Open http://localhost:3000.

### Production configuration

The public storefront uses https://wantafc.com.

In Vercel's production environment, set:

```dotenv
NEXT_PUBLIC_SITE_URL=https://wantafc.com
```

Create a new deployment after changing environment variables so the updated configuration is applied.

## Commands

| Command                | Purpose                                     |
| ---------------------- | ------------------------------------------- |
| `npm run dev`          | Start the development server                |
| `npm run build`        | Create the production build using Webpack   |
| `npm run start`        | Serve the existing production build         |
| `npm run lint`         | Run ESLint; warnings fail the check         |
| `npm run format`       | Check formatting without modifying files    |
| `npm run format:write` | Apply Prettier formatting                   |
| `npm run typecheck`    | Check TypeScript types                      |
| `npm run ci`           | Run lint, formatting, type checks and build |

**`npm run ci` does not run Playwright tests.** Run those separately.

To run the production build locally:

```bash
npm run build
npm run start
```

## Tests

### Install browsers

Before the first browser test run:

```bash
npx playwright install --with-deps
```

### Unit tests

```bash
npx playwright test --config=playwright.unit.config.ts
```

Unit tests are located in `tests/unit/` and cover catalog filtering and Shopify HTML sanitization.

### Browser tests

Run the browser suite:

```bash
npx playwright test
```

Run an individual test file:

```bash
npx playwright test tests/shop.spec.ts
```

Open the HTML report:

```bash
npx playwright show-report
```

The browser configuration includes:

- Desktop Chrome
- Desktop Firefox
- Mobile Safari
- Mobile Chrome

Locally, Playwright starts the development server or reuses an existing server on port 3000. In CI, it starts the production server, so a successful build is required first.

Browser tests use Shopify-backed content. Changes to product names, availability, relationships or catalog data can affect test expectations.

### GitHub Actions

The workflow runs on pull requests and pushes to `main`.

It performs:

1. Dependency installation
2. Lint
3. Formatting checks
4. TypeScript checks
5. Unit tests
6. Production build
7. Browser tests in `tests/shop.spec.ts` and `tests/responsive.spec.ts`

The workflow currently runs a subset of the browser suite, not every browser test file.

The following repository secrets are required:

- `SHOPIFY_STORE_DOMAIN`
- `SHOPIFY_STOREFRONT_ACCESS_TOKEN`

Playwright reports and test results are uploaded as workflow artifacts and retained for seven days.

## Project structure

| Path                        | Responsibility                                                                                   |
| --------------------------- | ------------------------------------------------------------------------------------------------ |
| `app/[locale]/`             | Localized storefront routes and page metadata                                                    |
| `app/api/checkout/route.ts` | Create a Shopify cart and return its checkout URL                                                |
| `components/`               | Layout, navigation, catalog, product and page components                                         |
| `lib/shopify/`              | Shopify queries, fetcher and product mapping                                                     |
| `lib/shop/`                 | Catalog definitions, filtering and search logic                                                  |
| `data/products.ts`          | Shared `Product` and `Note` types and `VALID_NOTES`; the product catalog is fetched from Shopify |
| `lib/cart/store.ts`         | Zustand shopping bag and browser persistence                                                     |
| `lib/i18n/uiLabels.ts`      | Shared interface labels                                                                          |
| `dictionaries/`             | Localized page text and fallback content                                                         |
| `i18n-config.ts`            | Supported locales and default locale                                                             |
| `public/`                   | Local images, logos and fonts                                                                    |
| `tests/`                    | Browser tests                                                                                    |
| `tests/unit/`               | Unit tests                                                                                       |

## Editing content

This is a custom Next.js storefront. Shopify's theme editor does not control its layout.

Edit connected content in Shopify. Modify components and styles in this repository to change the storefront's presentation or behavior.

| Content                                                       | Where to edit                                                                 |
| ------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| Product titles, descriptions, prices, images and availability | Shopify products                                                              |
| Product notes, concentration, ingredients and layering        | Shopify product metafields                                                    |
| Collection titles, descriptions and images                    | Shopify collections                                                           |
| Homepage collection descriptions and button labels            | Collection metafields `custom.home_subtitle` and `custom.home_button_label`   |
| Homepage hero                                                 | Metaobject `home_hero`, entry `homepage`                                      |
| Homepage section headings                                     | Metaobject `home_section`, entries `categories`, `collections` and `featured` |
| Homepage promotional sections                                 | Metaobject `home_promotion`, entries `discovery`, `showroom` and `about`      |
| Our Story page                                                | Metaobject `about_page`, entry `our-story`                                    |
| Showroom page                                                 | Metaobject `showroom_page`, entry `helsinki`                                  |
| Footer social links                                           | Shopify menu with handle `footer-social`                                      |
| FAQ                                                           | Shopify page with handle `faq`                                                |
| Cookies Policy                                                | Shopify page with handle `cookies-policy`                                     |
| Shipping, refunds, privacy and terms                          | Shopify Settings → Policies                                                   |
| Contact page text                                             | `dictionaries/`                                                               |
| Contact page email                                            | `CONTACT_EMAIL` in `app/[locale]/contact/page.tsx`                            |
| Other interface labels and fallback text                      | `lib/i18n/uiLabels.ts` and `dictionaries/`                                    |

Homepage promotions and their corresponding detail pages are independent content entries. Editing the homepage's Our Story or Showroom introduction does not update the full page.

### Content requirements

- Preserve the handles and field keys expected by the code.
- Metaobjects must be active where applicable and accessible through the Storefront API.
- Pages must be published and contain a title and body.
- Image fields must reference images accessible to the storefront.
- Hero and promotion button links must use internal paths, such as `/shop/discovery`. The application adds the locale.
- Translate Shopify content separately from the repository's interface dictionaries.
- Many Shopify requests use a 300-second revalidation interval. Content changes may not appear immediately.

The exact fields for each content type are defined in its corresponding `lib/shopify/get-*.ts` file.

### Footer social links

Edit the Shopify menu with handle `footer-social`.

Add, remove or reorder its links to update the social links displayed in the footer. Each item needs a title and a valid HTTP or HTTPS URL.

### Catalog classification

The catalog uses these product types:

- `Perfume`
- `Attar`
- `Body Mist`
- `Discovery Set`

Collection handles are mapped in `lib/shop/catalogs.ts`. These include:

| Catalog       | Shopify collection handle |
| ------------- | ------------------------- |
| Perfumes      | `perfumes`                |
| Women         | `women-perfumes`          |
| Men           | `men-perfumes`            |
| Unisex        | `unisex-perfumes`         |
| Luxury        | `luxury-collection`       |
| Premium       | `premium-collection`      |
| Essential     | `essential-collection`    |
| Oils & Attars | `oils-attars`             |
| Body Mists    | `bath-body`               |
| Discovery     | `discovery`               |

Filtering uses original English classification values to keep behavior consistent across locales.

The heart-notes metafield is currently spelled `custom.hearth_notes` in the integration. Preserve this key unless Shopify and the queries are updated together.

The main product-list query currently loads up to 100 products. Review pagination before expanding beyond that limit.

## Shopping bag and checkout

Shopping bag items are persisted in browser local storage under `af-cart-v1`.

The checkout endpoint creates a Shopify cart from variant identifiers and quantities, then returns the Shopify checkout URL.

Payment methods, shipping options, taxes and checkout settings are managed in Shopify. Footer payment icons are display assets and do not configure payment providers.

Validate the available payment methods and delivery options in Shopify before enabling live sales.

## Contact and browser storage

The Contact page uses email links. It does not submit messages through a backend contact form.

No newsletter subscription integration is currently included.

The cookie banner stores its selection in local storage under `cookie_consent`. It does not currently activate or manage analytics or advertising tools. Review the banner behavior and policy before adding tracking.

## Deployment and maintenance

Configure the Shopify environment variables in the hosting environment before building.

Use `https://wantafc.com` as `NEXT_PUBLIC_SITE_URL` for the production storefront.

The current metadata and robots configuration enables indexing when `VERCEL_ENV` is `production` and disables it otherwise. Review this behavior if deploying outside Vercel.

Before releasing changes:

- Run the checks and relevant tests.
- Review the preview deployment on desktop and mobile.
- Check affected locales, links and Shopify content.
- Validate checkout separately when changing payments, shipping or checkout configuration.

The Storefront API version is currently hardcoded in `lib/shopify/shopify.ts`. Review and maintain it as Shopify API versions change.

Magister and Bodoni Moda are loaded from local font files. Other fonts still use `next/font/google`, which requires access to Google Fonts during compilation.

## Troubleshooting

### Missing or fallback editorial content

Check the metaobject handle, required fields, active status and Storefront access. Inspect server logs for the relevant query error.

### FAQ or Cookies Policy returns 404

Check the page's publication status, exact handle and non-empty title/body. Allow for cached responses after publishing.

### Catalog is empty or products appear in the wrong category

Check product publication, product type, gender metafield and collection membership against `lib/shop/catalogs.ts`.

### A Playwright navigation assertion times out

Inspect the report and trace. Check whether navigation failed or the destination is still loading. Do not replace the interaction with direct navigation just to make the test pass.

### Build fails while processing a Google Font

Check the failing font in the build output. Bodoni Moda is already loaded locally; other Google-hosted fonts may still require investigation.

## Visual design

Colors, typography, page layouts, and responsive behavior are defined in the Next.js codebase. Shopify’s theme editor does not control this storefront.

Content connected to Shopify—such as products, editorial text, images, policies, and social links—can be updated from the Shopify admin. Changes to the visual design require code changes and a new deployment through Vercel.

## License

See [LICENSE](LICENSE) for the repository's usage restrictions.
