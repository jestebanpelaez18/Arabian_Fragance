import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { i18n, type Locale } from "./i18n-config";

function isLocale(value: string): value is Locale {
  return i18n.locales.includes(value as Locale);
}

// Use a supported saved locale, or fall back to the configured default.
function getLocale(request: NextRequest): Locale {
  const cookieLocale = request.cookies.get("USER_LOCALE")?.value;
  if (cookieLocale && isLocale(cookieLocale)) {
    return cookieLocale;
  }

  return i18n.defaultLocale;
}

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // 1. Skip paths that shouldn't be translated (images, api, next internals)
  if (
    pathname.startsWith("/_next") ||
    pathname.includes("/api/") ||
    pathname.match(/\.(.*)$/) // matches files like .png, .ico
  ) {
    return NextResponse.next();
  }

  // 2. Check if the current pathname already has a locale (e.g. /fi/shop)
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) =>
      !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  );

  // 3. If it's missing, redirect to the URL with the locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);

    // e.g. incoming request is /shop -> redirect to /en/shop
    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
        request.url,
      ),
    );
  }

  return NextResponse.next();
}

// Specify which routes the middleware should run on
export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next).*)",
  ],
};
