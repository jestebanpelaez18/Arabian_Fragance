import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { i18n } from "./i18n-config";

// Function to get the preferred locale from the user's request
function getLocale(request: NextRequest): string | undefined {
  // Try to get the language from a saved cookie first
  const cookieLocale = request.cookies.get("USER_LOCALE")?.value;
  if (cookieLocale && i18n.locales.includes(cookieLocale as any)) {
    return cookieLocale;
  }

  // Basic implementation: fall back to default English
  // (In the future, we can parse the 'accept-language' header here)
  return i18n.defaultLocale;
}

export function middleware(request: NextRequest) {
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
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // 3. If it's missing, redirect to the URL with the locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    
    // e.g. incoming request is /shop -> redirect to /en/shop
    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
        request.url
      )
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