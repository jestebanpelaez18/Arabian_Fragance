"use client";

import { useId, useState, type ReactNode } from "react";

export type ProductAccordionItem = {
  id: string;
  title: string;
  content: ReactNode;
};

type ProductAccordionProps = {
  items: ProductAccordionItem[];
  defaultOpenId?: string | null;
};

export default function ProductAccordion({
  items,
  defaultOpenId = "description",
}: ProductAccordionProps) {
  const instanceId = useId();

  const [openId, setOpenId] = useState<string | null>(() =>
    items.some((item) => item.id === defaultOpenId) ? defaultOpenId : null,
  );

  if (items.length === 0) return null;

  return (
    <div className="border-t border-black/15">
      {items.map((item) => {
        const isOpen = openId === item.id;
        const buttonId = `${instanceId}-${item.id}-button`;
        const panelId = `${instanceId}-${item.id}-panel`;

        return (
          <section key={item.id} className="border-b border-black/15">
            <h2>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() =>
                  setOpenId((current) => (current === item.id ? null : item.id))
                }
                className="font-garamond flex min-h-14 w-full items-center justify-between gap-5 py-4 text-left text-xs font-normal tracking-[0.12em] text-neutral-800 uppercase transition-colors hover:text-black focus-visible:outline focus-visible:outline-offset-4"
              >
                <span>{item.title}</span>

                <span aria-hidden="true" className="relative h-3 w-3 shrink-0">
                  <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-current" />

                  <span
                    className={[
                      "absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-current",
                      "transition-transform duration-300 ease-out motion-reduce:transition-none",
                      isOpen ? "scale-y-0" : "scale-y-100",
                    ].join(" ")}
                  />
                </span>
              </button>
            </h2>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              aria-hidden={!isOpen}
              inert={!isOpen}
              className={[
                "grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none",
                isOpen
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0",
              ].join(" ")}
            >
              <div className="min-h-0 overflow-hidden">
                <div className="font-garamond pb-6 text-base leading-relaxed text-neutral-600">
                  {item.content}
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
