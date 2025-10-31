"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart/store";

export default function CheckoutButton({
  className = "",
  children = "Checkout",
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  const { items } = useCart();
  const [loading, setLoading] = useState(false);

  async function onCheckout() {
    if (!items.length || loading) return;
    try {
      setLoading(true);

      const payload = items.map((it) => ({ id: it.id, qty: it.qty }));

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data?.url) {
        throw new Error(
          data?.error || `Checkout failed with status ${res.status}: Please try again or contact support`
        );
      }

      window.location.href = data.url;
    } catch (e) {
      console.error(e);
      alert("Unable to start checkout. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={onCheckout}
      disabled={loading || items.length === 0}
      className={className}
      aria-busy={loading}
    >
      {loading ? "Redirecting..." : children}
    </button>
  );
}
