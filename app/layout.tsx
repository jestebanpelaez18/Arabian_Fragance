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
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

const geistGaramond = Cormorant_Garamond({
  variable: "--font-cormorand-garamond",
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

export const metadata: Metadata = {
  title: "Arabian Fragrance",
  description: "Luxury fragrances",
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
      </body>
    </html>
  );
}
