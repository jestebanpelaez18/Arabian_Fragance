"use client";

import { useState, useCallback, useRef, useEffect, KeyboardEvent } from "react";

type Details = {
  concentration?: string;
  sizeLabel?: string;
  sku?: string | null;
};

type Pyramid = { top?: string[]; heart?: string[]; base?: string[] };

type Props = {
  description?: string | null;
  details?: Details; // opcional (no lo muestro aquí, ya lo tienes en el panel superior)
  notes?: string[]; // para copy “Notes: …”
  policies?: string[]; // lista de políticas
  ingredients?: string | null; // string largo (INCI)
  pyramid?: Pyramid; // {top, heart, base}
};

/* ---------- Tabs model ---------- */
const TABS = [
  { key: "Description", label: "Description" },
  { key: "Notes", label: "Notes" },
  { key: "Ingredients", label: "Ingredients" },
  { key: "Packaging", label: "Packaging & Care" },
  { key: "Policies", label: "Policies" },
] as const;
type TabKey = (typeof TABS)[number]["key"];

/* ---------- Component ---------- */
export default function PdpTabs({
  description,
  notes,
  policies,
  ingredients,
  pyramid,
}: Props) {
  const [active, setActive] = useState<TabKey>("Description");

  /* underline indicator */
  const listRef = useRef<HTMLDivElement | null>(null);
  const btnRefs = useRef<Record<TabKey, HTMLButtonElement | null>>({
    Description: null,
    Notes: null,
    Ingredients: null,
    Packaging: null,
    Policies: null,
  });
  const [indicator, setIndicator] = useState<{ left: number; width: number }>({
    left: 0,
    width: 0,
  });

  const recalc = useCallback(() => {
    const el = btnRefs.current[active];
    const parent = listRef.current;
    if (!el || !parent) return;
    const parentRect = parent.getBoundingClientRect();
    const rect = el.getBoundingClientRect();
    setIndicator({ left: rect.left - parentRect.left, width: rect.width });
  }, [active]);

  useEffect(() => {
    recalc();
    const onResize = () => recalc();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [recalc]);

  const onKey = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      const idx = TABS.findIndex((t) => t.key === active);
      if (e.key === "ArrowRight") setActive(TABS[(idx + 1) % TABS.length].key);
      if (e.key === "ArrowLeft")
        setActive(TABS[(idx - 1 + TABS.length) % TABS.length].key);
    },
    [active],
  );

  /* ingredientes plegables */
  const [openInci, setOpenInci] = useState(false);
  const inciPreview = (ingredients ?? "").slice(0, 220);
  const showToggle = (ingredients ?? "").length > inciPreview.length;

  return (
    <section className="mt-14">
      {/* Header tabs (subrayado animado) */}
      <div
        ref={listRef}
        className="relative flex gap-8 text-[15px] text-white/70"
        role="tablist"
        aria-label="Product information"
        onKeyDown={onKey}
      >
        {/* indicator */}
        <span
          aria-hidden
          className="pointer-events-none absolute -bottom-[2px] h-[2px] bg-white/80 transition-[left,width] duration-300 ease-out"
          style={{ left: indicator.left, width: indicator.width }}
        />
        {TABS.map(({ key, label }) => {
          const isActive = active === key;
          return (
            <button
              key={key}
              ref={(el) => {
                btnRefs.current[key] = el;
              }}
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${key}`}
              id={`tab-${key}`}
              onClick={() => setActive(key)}
              className={[
                "relative pb-2 transition-colors focus:outline-none",
                isActive ? "text-white" : "hover:text-white/90",
              ].join(" ")}
            >
              {label}
              {/* bottom border (base) */}
              <span className="pointer-events-none absolute right-0 -bottom-[2px] left-0 h-px bg-white/10" />
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="mt-8 leading-relaxed text-white/90">
        {/* Description */}
        {active === "Description" && (
          <div
            role="tabpanel"
            id="panel-Description"
            aria-labelledby="tab-Description"
          >
            {description ? (
              <p className="whitespace-pre-line">{description}</p>
            ) : (
              <p>A timeless composition crafted with refined notes.</p>
            )}
          </div>
        )}

        {/* Notes (pyramid top / heart / base) */}
        {active === "Notes" && (
          <div role="tabpanel" id="panel-Notes" aria-labelledby="tab-Notes">
            {pyramid &&
            (pyramid.top?.length ||
              pyramid.heart?.length ||
              pyramid.base?.length) ? (
              <dl className="grid grid-cols-[140px_1fr] gap-y-4 text-[15px]">
                {pyramid.top?.length ? (
                  <>
                    <dt className="tracking-[0.18em] text-white/60 uppercase">
                      Top
                    </dt>
                    <dd className="text-white/90">{pyramid.top.join(" · ")}</dd>
                  </>
                ) : null}
                {pyramid.heart?.length ? (
                  <>
                    <dt className="tracking-[0.18em] text-white/60 uppercase">
                      Heart
                    </dt>
                    <dd className="text-white/90">
                      {pyramid.heart.join(" · ")}
                    </dd>
                  </>
                ) : null}
                {pyramid.base?.length ? (
                  <>
                    <dt className="tracking-[0.18em] text-white/60 uppercase">
                      Base
                    </dt>
                    <dd className="text-white/90">
                      {pyramid.base.join(" · ")}
                    </dd>
                  </>
                ) : null}
              </dl>
            ) : (
              <p>Notes: {notes?.length ? notes.join(" · ") : "—"}.</p>
            )}
          </div>
        )}

        {/* Ingredients (collapsible) */}
        {active === "Ingredients" && (
          <div
            role="tabpanel"
            id="panel-Ingredients"
            aria-labelledby="tab-Ingredients"
          >
            {ingredients ? (
              <div>
                <h3 className="sr-only">Ingredients</h3>
                <p className="text-white/80">
                  {openInci
                    ? ingredients
                    : inciPreview + (showToggle ? "…" : "")}
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
              <p>Ingredients information is not available for this product.</p>
            )}
          </div>
        )}

        {/* Packaging & Care */}
        {active === "Packaging" && (
          <div
            role="tabpanel"
            id="panel-Packaging"
            aria-labelledby="tab-Packaging"
          >
            <ul className="space-y-2 text-white/80">
              <li>
                All items are packaged in our signature Arabian Fragrance box,
                with complimentary gift wrap for a refined presentation.
              </li>
              <li> Store in a cool, dry place. Avoid direct sunlight.</li>
            </ul>
          </div>
        )}

        {/* Policies */}
        {active === "Policies" && (
          <div
            role="tabpanel"
            id="panel-Policies"
            aria-labelledby="tab-Policies"
          >
            {!!policies?.length ? (
              <ul className="space-y-2 text-white/80">
                {policies.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
            ) : (
              <p>No additional policies.</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
