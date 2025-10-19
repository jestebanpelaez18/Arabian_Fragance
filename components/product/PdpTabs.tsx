'use client';

import { useState, useCallback, KeyboardEvent } from 'react';

type Details = {
  concentration?: string;
  sizeLabel?: string;
  sku?: string | null;
};

type Props = {
  description?: string | null;
  details?: Details;
  notes?: string[];          // p.notes mapeado a string[]
  policies?: string[];       // líneas tipo "• VAT included…"
};

const tabs = ['Description', 'Details', 'Notes & Care', 'Packaging'] as const;
type TabKey = typeof tabs[number];

export default function PdpTabs({ description, details, notes, policies }: Props) {
  const [active, setActive] = useState<TabKey>('Description');

  const onKey = useCallback((e: KeyboardEvent<HTMLDivElement>) => {
    const idx = tabs.indexOf(active);
    if (e.key === 'ArrowRight') {
      setActive(tabs[(idx + 1) % tabs.length]);
    } else if (e.key === 'ArrowLeft') {
      setActive(tabs[(idx - 1 + tabs.length) % tabs.length]);
    }
  }, [active]);

  return (
    <section className="mt-14">
      {/* Header tabs */}
      <div
        className="flex gap-8 text-[15px] text-white/70"
        role="tablist"
        aria-label="Product information"
        onKeyDown={onKey}
      >
        {tabs.map((t) => {
          const isActive = active === t;
          return (
            <button
              key={t}
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${t}`}
              id={`tab-${t}`}
              onClick={() => setActive(t)}
              className={[
                "pb-2 border-b-2 transition-colors",
                isActive ? "border-white/80 text-white" : "border-transparent hover:border-white/40"
              ].join(' ')}
            >
              {t}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="mt-6 border-t border-white/10 pt-6 leading-relaxed text-white/90">
        {/* Description */}
        {active === 'Description' && (
          <div role="tabpanel" id="panel-Description" aria-labelledby="tab-Description">
            {description ? (
              <p className="whitespace-pre-line">{description}</p>
            ) : (
              <p>A timeless composition crafted with refined notes.</p>
            )}
            {!!policies?.length && (
              <ul className="mt-8 space-y-2 text-sm text-white/70">
                {policies.map((line, i) => <li key={i}>{line}</li>)}
              </ul>
            )}
          </div>
        )}

        {/* Details */}
        {active === 'Details' && (
          <div role="tabpanel" id="panel-Details" aria-labelledby="tab-Details">
            <dl className="grid grid-cols-[160px_1fr] gap-y-4 text-[15px]">
              <dt className="uppercase tracking-[0.18em] text-white/60">Concentration</dt>
              <dd className="text-white/90">{details?.concentration ?? 'Eau de Parfum'}</dd>
              <dt className="uppercase tracking-[0.18em] text-white/60">Size</dt>
              <dd className="text-white/90">{details?.sizeLabel ?? '100 ml'}</dd>
              {details?.sku ? (
                <>
                  <dt className="uppercase tracking-[0.18em] text-white/60">SKU</dt>
                  <dd className="text-white/80">{details.sku}</dd>
                </>
              ) : null}
            </dl>
          </div>
        )}

        {/* Notes & Care */}
        {active === 'Notes & Care' && (
          <div role="tabpanel" id="panel-Notes & Care" aria-labelledby="tab-Notes & Care">
            <p>Notes: {notes?.length ? notes.join(' · ') : '—'}.</p>
            <p className="mt-3 text-white/80">
              Store in a cool, dry place. Avoid direct sunlight.
            </p>
          </div>
        )}

        {/* Packaging */}
        {active === 'Packaging' && (
          <div role="tabpanel" id="panel-Packaging" aria-labelledby="tab-Packaging">
            <p>Presented in our signature Arabian Fragrance box.</p>
          </div>
        )}
      </div>
    </section>
  );
}
