type PriceBlockProps = {
  price: number;
  volumeMl?: number | null;
};

export default function PriceBlock({ price, volumeMl }: PriceBlockProps) {
  return (
    <section className="font-playfair-display pt-10">
      <div className="text-[34px] tracking-tight md:text-[38px]">
        {price} EUR
      </div>
      {volumeMl && (
        <div className="mt-1.5 text-sm text-black/70">/ {volumeMl} ml</div>
      )}
    </section>
  );
}
