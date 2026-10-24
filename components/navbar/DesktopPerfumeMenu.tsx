"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import FeaturedNavigationPerfume from "@/components/navbar/FeaturedNavigationPerfume";
import { NAV_LINK_CLASS } from "@/components/navbar/nav-link-class";
import { PERFUME_SECTIONS } from "@/lib/shop/navigation";
import { getUiLabels } from "@/lib/i18n/uiLabels";
import type { Locale } from "@/i18n-config";

type Props = {
  locale: Locale;
  isOpen: boolean;
  /** Hover must not open the menu while another overlay is open. */
  hoverDisabled: boolean;
  onOpenChange: (open: boolean) => void;
  onTriggerClick: () => void;
};

export default function DesktopPerfumeMenu({
  locale,
  isOpen,
  hoverDisabled,
  onOpenChange,
  onTriggerClick,
}: Props) {
  const pathname = usePathname();
  const labels = getUiLabels(locale).navbar;
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;

      if (
        document.activeElement !== null &&
        menuRef.current?.contains(document.activeElement)
      ) {
        buttonRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !menuRef.current?.contains(event.target)
      ) {
        onOpenChange(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isOpen, onOpenChange]);

  return (
    <div
      ref={menuRef}
      className="flex h-full items-center"
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse" && !hoverDisabled) {
          onOpenChange(true);
        }
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") {
          onOpenChange(false);
        }
      }}
      onBlur={(event) => {
        const nextTarget = event.relatedTarget;

        if (
          !(nextTarget instanceof Node) ||
          !event.currentTarget.contains(nextTarget)
        ) {
          onOpenChange(false);
        }
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls="desktop-perfume-menu"
        className={NAV_LINK_CLASS}
        onClick={(event) => {
          onTriggerClick();

          // Keyboard activation toggles the menu; a pointer click
          // keeps the hovered menu open.
          onOpenChange(event.detail === 0 ? !isOpen : true);
        }}
        onKeyDown={(event) => {
          if (event.key !== "ArrowDown") return;

          event.preventDefault();
          onOpenChange(true);

          requestAnimationFrame(() => {
            menuRef.current
              ?.querySelector<HTMLAnchorElement>("#desktop-perfume-menu a")
              ?.focus();
          });
        }}
      >
        {labels.perfumes}
      </button>

      <div
        id="desktop-perfume-menu"
        aria-hidden={!isOpen}
        inert={!isOpen}
        className={[
          "bg-background absolute top-full left-0 z-9999 w-full",
          "border-t border-black/10",
          "shadow-[0_10px_18px_-18px_rgba(0,0,0,0.25)]",
          "max-h-[calc(100dvh-116px)] overflow-y-auto overscroll-contain",
          "transition-[opacity,visibility] duration-200 ease-out",
          "motion-reduce:transition-none",
          isOpen
            ? "visible opacity-100"
            : "pointer-events-none invisible opacity-0",
        ].join(" ")}
      >
        <div className="mx-auto grid w-full max-w-[1040px] grid-cols-[minmax(0,1fr)_minmax(0,1fr)_208px] items-start gap-x-14 px-10 py-9 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_240px] xl:gap-x-20 xl:py-10">
          {PERFUME_SECTIONS.map(({ title, links }) => (
            <div key={title} className="min-w-0">
              <h3 className="font-garamond! mb-5 text-sm leading-normal font-normal tracking-[0.12em] text-neutral-500 uppercase">
                {labels[title]}
              </h3>

              <ul className="space-y-1">
                {links.map(({ path, label, emphasized }) => {
                  const href = `/${locale}${path}`;

                  return (
                    <li key={path} className={emphasized ? "pt-3" : undefined}>
                      <Link
                        href={href}
                        onClick={() => onOpenChange(false)}
                        aria-current={pathname === href ? "page" : undefined}
                        className={[
                          "font-garamond inline-flex min-h-10 items-center",
                          "text-base leading-relaxed font-normal text-neutral-900",
                          "hover:text-gold transition-colors duration-200",
                          "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black",
                          emphasized
                            ? "underline decoration-black/20 underline-offset-4"
                            : "",
                        ].join(" ")}
                      >
                        {labels[label]}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}

          <FeaturedNavigationPerfume
            locale={locale}
            active={isOpen}
            onNavigate={() => onOpenChange(false)}
          />
        </div>
      </div>
    </div>
  );
}
