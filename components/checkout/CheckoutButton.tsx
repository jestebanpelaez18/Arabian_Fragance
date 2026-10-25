"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "@/lib/cart/store";
import { getLocaleFromPathname, getUiLabels } from "@/lib/i18n/uiLabels";

type CheckoutButtonProps = {
  className?: string;
  children?: ReactNode;
};

function readCheckoutUrl(data: unknown): string | null {
  if (
    typeof data !== "object" ||
    data === null ||
    !("url" in data) ||
    typeof data.url !== "string"
  ) {
    return null;
  }

  return data.url.trim() || null;
}

export default function CheckoutButton({
  className = "",
  children,
}: CheckoutButtonProps) {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const labels = getUiLabels(locale).commerce.cart;

  const items = useCart((state) => state.items);

  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const pendingRef = useRef(false);
  const errorId = useId();

  useEffect(() => {
    // Restore the button when returning through the browser's back cache.
    const handlePageShow = (event: PageTransitionEvent) => {
      if (!event.persisted) return;

      pendingRef.current = false;
      setLoading(false);
      setHasError(false);
    };

    window.addEventListener("pageshow", handlePageShow);

    return () => {
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, []);

  async function onCheckout() {
    if (pendingRef.current || items.length === 0) return;

    // The ref blocks repeated activation immediately, before React rerenders.
    pendingRef.current = true;
    setLoading(true);
    setHasError(false);

    const payload = items.map((item) => ({
      id: item.id,
      qty: item.qty,
    }));

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(
          `Checkout request failed with status ${response.status}.`,
        );
      }

      const data: unknown = await response.json();
      const checkoutUrl = readCheckoutUrl(data);

      if (!checkoutUrl) {
        throw new Error("Checkout response did not contain a URL.");
      }

      // Keep the loading state until navigation takes over.
      window.location.assign(checkoutUrl);
    } catch (error) {
      console.error("Unable to open checkout:", error);

      pendingRef.current = false;
      setLoading(false);
      setHasError(true);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={onCheckout}
        disabled={loading || items.length === 0}
        aria-busy={loading}
        aria-describedby={hasError ? errorId : undefined}
        className={className}
      >
        <span className="inline-flex items-center justify-center gap-3">
          {loading && (
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              className="shrink-0 animate-spin motion-reduce:animate-none"
              aria-hidden="true"
            >
              <circle
                cx="12"
                cy="12"
                r="9"
                stroke="currentColor"
                strokeWidth="1.5"
                opacity="0.25"
              />

              <path
                d="M12 3a9 9 0 0 1 9 9"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          )}

          <span>
            {loading ? labels.checkoutLoading : (children ?? labels.checkout)}
          </span>
        </span>
      </button>

      <span role="status" className="sr-only">
        {loading ? labels.checkoutLoading : ""}
      </span>

      {hasError && (
        <p
          id={errorId}
          role="alert"
          className="font-garamond mt-3 text-center text-sm leading-relaxed text-red-800"
        >
          {labels.checkoutError}
        </p>
      )}
    </>
  );
}
