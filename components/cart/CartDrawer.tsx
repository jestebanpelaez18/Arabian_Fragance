"use client";

import { useEffect, useId, useRef } from "react";
import { usePathname } from "next/navigation";
import CartView from "./CartView";
import { getLocaleFromPathname, getUiLabels } from "@/lib/i18n/uiLabels";

type CartDrawerProps = {
  open: boolean;
  onClose: () => void;
};

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const labels = getUiLabels(locale).commerce.cart;

  const titleId = useId();

  const dialogRef = useRef<HTMLDialogElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const animationsRef = useRef<Animation[]>([]);
  const previousOverflowRef = useRef<string | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    const panel = panelRef.current;
    const overlay = overlayRef.current;

    if (!dialog || !panel || !overlay) return;
    if (!open && !dialog.open) return;

    let cancelled = false;

    // Read the current position before cancelling an interrupted animation.
    const currentTransform = dialog.open
      ? getComputedStyle(panel).transform
      : "translateX(100%)";

    const currentOpacity = dialog.open
      ? getComputedStyle(overlay).opacity
      : "0";

    animationsRef.current.forEach((animation) => animation.cancel());
    animationsRef.current = [];

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const duration = reducedMotion ? 0 : 320;

    if (open) {
      if (!dialog.open) {
        previousOverflowRef.current = document.body.style.overflow;
        dialog.showModal();
        document.body.style.overflow = "hidden";
      }

      animationsRef.current = [
        panel.animate(
          [{ transform: currentTransform }, { transform: "translateX(0)" }],
          {
            duration,
            easing: "cubic-bezier(0.22, 1, 0.36, 1)",
            fill: "both",
          },
        ),
        overlay.animate([{ opacity: currentOpacity }, { opacity: 1 }], {
          duration,
          easing: "ease-out",
          fill: "both",
        }),
      ];
    } else {
      const animations = [
        panel.animate(
          [{ transform: currentTransform }, { transform: "translateX(100%)" }],
          {
            duration,
            easing: "cubic-bezier(0.4, 0, 1, 1)",
            fill: "both",
          },
        ),
        overlay.animate([{ opacity: currentOpacity }, { opacity: 0 }], {
          duration,
          easing: "ease-in",
          fill: "both",
        }),
      ];

      animationsRef.current = animations;

      void Promise.allSettled(
        animations.map((animation) => animation.finished),
      ).then(() => {
        if (cancelled) return;

        if (dialog.open) {
          dialog.close();
        }

        animationsRef.current.forEach((animation) => animation.cancel());
        animationsRef.current = [];

        if (previousOverflowRef.current !== null) {
          document.body.style.overflow = previousOverflowRef.current;
          previousOverflowRef.current = null;
        }
      });
    }

    return () => {
      cancelled = true;
    };
  }, [open]);

  useEffect(() => {
    return () => {
      animationsRef.current.forEach((animation) => animation.cancel());

      if (previousOverflowRef.current !== null) {
        document.body.style.overflow = previousOverflowRef.current;
        previousOverflowRef.current = null;
      }
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      className="z-drawer fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none overflow-hidden border-0 bg-transparent p-0 text-neutral-900 backdrop:bg-transparent"
    >
      <div
        ref={overlayRef}
        aria-hidden="true"
        onClick={onClose}
        className="absolute inset-0 bg-black/35"
      />

      <div
        ref={panelRef}
        className="bg-background absolute inset-y-0 right-0 flex h-dvh w-full flex-col overflow-hidden sm:w-[540px]"
      >
        <header className="flex shrink-0 items-center justify-between gap-4 border-b border-black/10 px-5 py-4 sm:px-7">
          <h2
            id={titleId}
            className="font-magister text-2xl leading-tight font-normal tracking-[0.02em]"
          >
            {labels.bagTitle}
          </h2>

          <button
            autoFocus
            type="button"
            onClick={onClose}
            aria-label={labels.closeCart}
            className="hover:text-gold -mr-2 inline-flex h-11 w-11 shrink-0 items-center justify-center transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              aria-hidden="true"
            >
              <path d="m6 6 12 12M18 6 6 18" strokeLinecap="round" />
            </svg>
          </button>
        </header>

        <CartView compact onNavigate={onClose} />
      </div>
    </dialog>
  );
}
