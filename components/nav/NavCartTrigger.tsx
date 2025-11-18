"use client";
import Link from "next/link";
import { useState } from "react";
import CartDrawer from "@/components/cart/CartDrawer";
import CartCount from "@/components/cart/CartCount";
import Portal from "@/components/system/Portal";

export default function NavCartTrigger() {
  const [open, setOpen] = useState(false);

  function onClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button === 1)
      return;
    e.preventDefault();
    setOpen(true);
  }

  return (
    <>
      <Link
        href="/bag"
        onClick={onClick}
        className="nav-link relative inline-flex items-center gap-1.5"
        aria-label="Open cart"
      >
        {/* Icon for mobile */}
        <span className="flex h-7 items-center md:hidden">
          <svg
            width="24"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            className="block"
          >
            <path
              d="M6 7V6a6 6 0 1 1 12 0v1M3 7h18l-1.5 14.5a2 2 0 0 1-2 1.5H6.5a2 2 0 0 1-2-1.5L3 7z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        {/* Text for desktop */}
        <span className="hidden md:inline">Bag</span>
        <CartCount />
      </Link>

      <Portal>
        <CartDrawer open={open} onClose={() => setOpen(false)} />
      </Portal>
    </>
  );
}
