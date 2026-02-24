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
        className="relative flex items-center opacity-75 transition-all hover:text-[#C9A46A] hover:opacity-100"
        aria-label="Open bag"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.2}
          stroke="currentColor"
          className="h-[18px] w-[18px]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>

        <CartCount />
      </Link>

      <Portal>
        <CartDrawer open={open} onClose={() => setOpen(false)} />
      </Portal>
    </>
  );
}
