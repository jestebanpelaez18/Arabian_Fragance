"use client";
import { useEffect } from "react";
import CartView from "./CartView";

export default function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", onKey); };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[2147483647] pointer-events-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        aria-label="Close cart"
        className="absolute inset-0 bg-black/55 backdrop-blur-[2px]" 
      />
      {/* Panel */}
      <div
        className="absolute right-0 top-0 h-full w-full sm:w-[520px] shadow-2xl"
        style={{
          backgroundColor: "var(--background)",   // sólido
          color: "var(--foreground)",
        }}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <h2 className="font-playfair-display text-xl tracking-tight">Your Bag</h2>
          <button onClick={onClose} className="rounded-full px-3 py-1.5 text-xs tracking-[0.14em] ring-1 ring-white/20 hover:bg-white/5">
            CLOSE
          </button>
        </div>
        <CartView compact />
      </div>
    </div>
  );
}
