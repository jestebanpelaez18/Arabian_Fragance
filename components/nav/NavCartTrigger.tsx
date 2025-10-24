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
      >
        Bag <CartCount />
      </Link>

      <Portal>
        <CartDrawer open={open} onClose={() => setOpen(false)} />
      </Portal>
    </>
  );
}
