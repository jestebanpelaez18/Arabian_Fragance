type DetailsGridProps = {
  concentration?: string;
  sizeLabel?: string;
  dispatchLabel?: string;
};

export default function DetailsGrid({
  concentration = "Parfum",
  sizeLabel,
  dispatchLabel = "Same-day dispatch",
}: DetailsGridProps) {
  return (
    <dl className="mt-10 grid grid-cols-[180px_minmax(0,1fr)] gap-x-10 gap-y-6 text-[15px]">
      <div className="contents">
        <dt className="tracking-[0.18em] whitespace-nowrap text-black/60 uppercase">
          Concentration
        </dt>
        <dd className="leading-7 text-black/90">{concentration}</dd>
      </div>

      <div className="contents">
        <dt className="tracking-[0.18em] whitespace-nowrap text-black/60 uppercase">
          Size
        </dt>
        <dd className="leading-7 text-black/90">
          <span className="inline-block border-b border-black/80 pb-[2px]">
            {sizeLabel}
          </span>
        </dd>
      </div>

      <div className="contents">
        <dt className="tracking-[0.18em] whitespace-nowrap text-black/60 uppercase">
          Dispatch
        </dt>
        <dd className="text-gold/90 leading-7">{dispatchLabel}</dd>
      </div>
    </dl>
  );
}
