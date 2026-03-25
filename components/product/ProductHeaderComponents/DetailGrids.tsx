type DetailsGridProps = {
  concentration?: string;
  sizeLabel?: string;
  dispatchLabel?: string;
  concentrationLabel?: string;
  sizeTextLabel?: string;
  dispatchTextLabel?: string;
};

export default function DetailsGrid({
  concentration = "",
  sizeLabel,
  dispatchLabel = "",
  concentrationLabel,
  sizeTextLabel,
  dispatchTextLabel,
}: DetailsGridProps) {
  return (
    <dl className="mt-10 grid grid-cols-[180px_minmax(0,1fr)] gap-x-10 gap-y-6 text-[15px]">
      <div className="contents">
        <dt className="tracking-[0.18em] whitespace-nowrap text-black/60 uppercase">
          {concentrationLabel}
        </dt>
        <dd className="leading-7 text-black/90">{concentration}</dd>
      </div>

      <div className="contents">
        <dt className="tracking-[0.18em] whitespace-nowrap text-black/60 uppercase">
          {sizeTextLabel}
        </dt>
        <dd className="leading-7 text-black/90">
          <span className="inline-block border-b border-black/80 pb-0.5">
            {sizeLabel}
          </span>
        </dd>
      </div>

      <div className="contents">
        <dt className="tracking-[0.18em] whitespace-nowrap text-black/60 uppercase">
          {dispatchTextLabel}
        </dt>
        <dd className="text-gold/90 leading-7">{dispatchLabel}</dd>
      </div>
    </dl>
  );
}
