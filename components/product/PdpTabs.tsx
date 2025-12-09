"use client";

import { useState, useCallback, KeyboardEvent } from "react";

type Details = { concentration?: string; sizeLabel?: string; sku?: string | null };
type Pyramid = { top?: string[]; heart?: string[]; base?: string[] };

type Props = {
  description?: string | null;
  details?: Details;
  notes?: string[];
  policies?: string[];
  ingredients?: string | null;
  pyramid?: Pyramid;
};

const TABS = [
  { key: "Description", label: "DESCRIPTION" },
  { key: "Notes", label: "NOTES" },
  { key: "Ingredients", label: "INGREDIENTS" },
  { key: "Packaging", label: "PACKAGING & CARE" },
  { key: "Policies", label: "POLICIES" },
] as const;
type TabKey = (typeof TABS)[number]["key"];

export default function PdpTabs({
  description,
  notes,
  policies,
  ingredients,
  pyramid,
}: Props) {
  const [active, setActive] = useState<TabKey>("Description");

  const onKey = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      const i = TABS.findIndex((t) => t.key === active);
      if (e.key === "ArrowRight") setActive(TABS[(i + 1) % TABS.length].key);
      if (e.key === "ArrowLeft") setActive(TABS[(i - 1 + TABS.length) % TABS.length].key);
    },
    [active],
  );

  const [openInci, setOpenInci] = useState(false);
  const inciPreview = (ingredients ?? "").slice(0, 220);
  const showToggle = (ingredients ?? "").length > inciPreview.length;

  return (
    <section className="mt-12">
      {/* Tabs header */}
      <div
        role="tablist"
        aria-label="Product information"
        onKeyDown={onKey}
        className="font-garamond relative flex flex-nowrap items-end gap-x-6 md:gap-x-8 text-[12px] tracking-[0.08em]"
      >
        {TABS.map(({ key, label }) => {
          const isActive = active === key;
          return (
            <button
              key={key}
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${key}`}
              id={`tab-${key}`}
              onClick={() => setActive(key)}
              className={[
                "relative shrink-0 whitespace-nowrap pb-1.5 uppercase transition-colors duration-200 ease-out focus:outline-none",
                isActive ? "text-white" : "text-white/70 hover:text-white/85",
              ].join(" ")}
            >
              {label}
              {/* Subrayado animado: crece desde 0 hasta el ancho total del texto */}
              <span
                aria-hidden
                className={[
                  "absolute left-0 -bottom-[2px] h-[2px] bg-white",
                  "transition-all duration-300 ease-out",
                  isActive ? "w-full" : "w-0",
                ].join(" ")}
              />
            </button>
          );
        })}
      </div>

      {/* Content (fade/slide suave) */}
      <div
        key={active} // fuerza la animación al cambiar
        className="font-garamond mt-8 leading-relaxed text-white/90 animate-[fadeSlide_220ms_ease-out]"
      >
        <style jsx>{`
          @keyframes fadeSlide {
            from {
              opacity: 0;
              transform: translateY(6px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>

        {active === "Description" && (
          <div role="tabpanel" id="panel-Description" aria-labelledby="tab-Description">
            {description ? (
              <p className="whitespace-pre-line text-[15px] md:text-[16px]">{description}</p>
            ) : (
              <p className="text-[15px] md:text-[16px]">A timeless composition crafted with refined notes.</p>
            )}
          </div>
        )}

        {active === "Notes" && (
          <div role="tabpanel" id="panel-Notes" aria-labelledby="tab-Notes">
            {pyramid && (pyramid.top?.length || pyramid.heart?.length || pyramid.base?.length) ? (
              <dl className="grid grid-cols-[140px_1fr] gap-y-4 text-[15px] md:text-[16px]">
                {pyramid.top?.length ? (
                  <>
                    <dt className="uppercase tracking-[0.18em] text-white/60">Top</dt>
                    <dd className="text-white/90">{pyramid.top.join(" · ")}</dd>
                  </>
                ) : null}
                {pyramid.heart?.length ? (
                  <>
                    <dt className="uppercase tracking-[0.18em] text-white/60">Heart</dt>
                    <dd className="text-white/90">{pyramid.heart.join(" · ")}</dd>
                  </>
                ) : null}
                {pyramid.base?.length ? (
                  <>
                    <dt className="uppercase tracking-[0.18em] text-white/60">Base</dt>
                    <dd className="text-white/90">{pyramid.base.join(" · ")}</dd>
                  </>
                ) : null}
              </dl>
            ) : (
              <p className="text-[15px] md:text-[16px]">Notes: {notes?.length ? notes.join(" · ") : "—"}.</p>
            )}
          </div>
        )}

        {active === "Ingredients" && (
          <div role="tabpanel" id="panel-Ingredients" aria-labelledby="tab-Ingredients">
            {ingredients ? (
              <div>
                <h3 className="sr-only">Ingredients</h3>
                <p className="text-white/80 text-[15px] md:text-[16px]">
                  {openInci ? ingredients : inciPreview + (showToggle ? "…" : "")}
                </p>
                {showToggle && (
                  <button
                    className="mt-3 text-sm underline decoration-white/30 underline-offset-4 hover:decoration-[var(--gold)]"
                    onClick={() => setOpenInci((v) => !v)}
                  >
                    {openInci ? "Show less" : "Show more"}
                  </button>
                )}
              </div>
            ) : (
              <p className="text-[15px] md:text-[16px]">Ingredients information is not available for this product.</p>
            )}
          </div>
        )}

        {active === "Packaging" && (
          <div role="tabpanel" id="panel-Packaging" aria-labelledby="tab-Packaging">
            <ul className="space-y-2 text-white/80 text-[15px] md:text-[16px]">
              <li>
                All items are packaged in our signature Arabian Fragrance box, with complimentary gift wrap for a refined
                presentation.
              </li>
              <li>Store in a cool, dry place. Avoid direct sunlight.</li>
            </ul>
          </div>
        )}

        {active === "Policies" && (
          <div role="tabpanel" id="panel-Policies" aria-labelledby="tab-Policies">
            {!!policies?.length ? (
              <ul className="space-y-2 text-white/80 text-[15px] md:text-[16px]">
                {policies.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
            ) : (
              <p className="text-[15px] md:text-[16px]">No additional policies.</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}