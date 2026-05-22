"use client";

import Link from "next/link";

const navLinks = [
  { label: "New Arrivals", href: "/collection/new-arrivals" },
  { label: "Best Sellers", href: "/collection/best-sellers" },
  { label: "Luxury Collection", href: "/collection/luxury" },
  { label: "Premium Collection", href: "/collection/premium" },
  { label: "Oud Signatures", href: "/collection/oud" },
];

export default function QuickNav() {
  return (
    // Clean, static navigation bar that scrolls away naturally with the page
    <nav className="w-full border-b border-black/10 bg-background py-4 md:py-5">
      
      {/* Container remains horizontal scrolling on mobile and centered layout on desktop */}
      <div className="mx-auto flex max-w-7xl items-center justify-start gap-8 overflow-x-auto px-6 md:justify-center md:gap-12 lg:gap-16 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {navLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            // 'group relative' enables the precise underline animation effect on hover
            className="group relative whitespace-nowrap text-[10px] font-medium tracking-[0.2em] text-neutral-500 uppercase transition-colors duration-300 hover:text-neutral-900 md:text-xs"
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