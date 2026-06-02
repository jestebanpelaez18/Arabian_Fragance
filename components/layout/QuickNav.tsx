"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getLocaleFromPathname, getUiLabels } from "@/lib/i18n/uiLabels";

export default function QuickNav() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const labels = getUiLabels(locale).sections.quickNav;

  const navLinks = [
    { label: labels.newArrivals, href: "/collection/new-arrivals" },
    { label: labels.bestSellers, href: "/collection/best-sellers" },
    { label: labels.luxuryCollection, href: "/collection/luxury" },
    { label: labels.premiumCollection, href: "/collection/premium" },
    { label: labels.oudSignatures, href: "/collection/oud" },
  ];

  return (
    // Clean, static navigation bar that scrolls away naturally with the page
    <nav className="bg-background w-full border-b border-black/10 py-4 md:py-5">
      {/* Container remains horizontal scrolling on mobile and centered layout on desktop */}
      <div className="mx-auto flex max-w-7xl items-center justify-start gap-8 overflow-x-auto px-6 [-ms-overflow-style:none] [scrollbar-width:none] md:justify-center md:gap-12 lg:gap-16 [&::-webkit-scrollbar]:hidden">
        {navLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            // 'group relative' enables the precise underline animation effect on hover
            className="group relative text-[10px] font-medium tracking-[0.2em] whitespace-nowrap text-neutral-500 uppercase transition-colors duration-300 hover:text-neutral-900 md:text-xs"
          >
            {link.label}

            {/* The animated fine underline anchor */}
            <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-neutral-900 transition-transform duration-300 group-hover:scale-x-100" />
          </Link>
        ))}
      </div>
    </nav>
  );
}
