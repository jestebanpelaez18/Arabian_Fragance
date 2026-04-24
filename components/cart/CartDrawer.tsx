"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import CartView from "./CartView";
import { getLocaleFromPathname, getUiLabels } from "@/lib/i18n/uiLabels";

export default function CartDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const labels = getUiLabels(locale).commerce.cart;

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="z-drawer pointer-events-auto fixed inset-0">
      {/* Backdrop */}
      <div
        onClick={onClose}
        aria-label={labels.closeCart}
        className="absolute inset-0 bg-black/55 backdrop-blur-[2px]"
      />
      {/* Panel */}
      <div
        className="absolute top-0 right-0 h-full w-full shadow-2xl sm:w-[520px]"
        style={{
          backgroundColor: "var(--background)", // sólido
          color: "var(--foreground)",
        }}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <h2 className="text-xl tracking-tight">
            {labels.bagTitle}
          </h2>
          <button
            onClick={onClose}
            className="rounded-full px-3 py-1.5 text-xs tracking-[0.14em] ring-1 ring-white/20 hover:bg-white/5"
          >
            {labels.close.toUpperCase()}
          </button>
        </div>
        <CartView compact />
      </div>
    </div>
  );
}
