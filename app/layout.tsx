import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Playfair_Display,
  Roboto,
  Carlito,
  Bodoni_Moda,
  Plus_Jakarta_Sans,
} from "next/font/google";
import "./globals.css";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/navbar";
import CookieBanner from "@/components/ui/CookieBanner";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistGaramond.variable} ${geistPlayfairDisplay.variable} ${geistRoboto.variable} ${geistCarlito.variable} ${jakarta.variable} ${bodoni.variable} antialiased`}
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
        <CookieBanner />  
      </body>
    </html>
  );
}
