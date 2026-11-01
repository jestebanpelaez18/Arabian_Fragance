import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Playfair_Display,
  Roboto,
  Carlito,
  Bodoni_Moda,
  Plus_Jakarta_Sans,
} from "next/font/google";
import "../globals.css";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import CookieBanner from "@/components/ui/CookieBanner";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import { i18n } from "@/i18n-config";
import { getFooterSocialLinks } from "@/lib/shopify/get-footer-social-links";

const magister = localFont({
  src: "../../public/fonts/Magister-Extended.otf",
  variable: "--font-magister",
  display: "swap",
});

const geistGaramond = Cormorant_Garamond({
  variable: "--font-cormorant-garamond",
  subsets: ["latin"],
});

const geistPlayfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
});

const geistRoboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

const geistCarlito = Carlito({
  variable: "--font-carlito",
  subsets: ["latin"],
  weight: "400",
});

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-bodoni",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jakarta",
  display: "swap",
});

// Entorno / URL del sitio
const isProd = process.env.VERCEL_ENV === "production";
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (isProd ? "https://arabian-fragance.vercel.app" : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Arabian Fragrance",
    template: "%s | Arabian Fragrance",
  },
  description: "Luxury fragrances",
  robots: isProd
    ? { index: true, follow: true }
    : { index: false, follow: false },
  openGraph: {
    type: "website",
    siteName: "Arabian Fragrance",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
  },
  icons: {
    icon: [{ url: "/favicon.ico" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale: requestedLocale } = await params;

  const locale = i18n.locales.find((language) => language === requestedLocale);

  if (!locale) {
    notFound();
  }

  const socialLinks = await getFooterSocialLinks();

  return (
    <html lang={locale}>
      <body
        className={`${geistGaramond.variable} ${geistPlayfairDisplay.variable} ${geistRoboto.variable} ${geistCarlito.variable} ${jakarta.variable} ${bodoni.variable} ${magister.variable} flex min-h-svh flex-col antialiased`}
      >
        <Navbar />

        <main className="grow pt-16 lg:pt-[116px]">{children}</main>

        <Footer socialLinks={socialLinks} />

        <CookieBanner />
      </body>
    </html>
  );
}
