import Image from "next/image";

export default function CurrencySelector({
  selectCurrencyAria,
  logoAlt,
}: {
  selectCurrencyAria: string;
  logoAlt: string;
}) {
  return (
    <div className="mb-4 flex items-center justify-end gap-4 text-white/90 md:mt-6 md:mb-0">
      <select
        className="font-bodoni border-none bg-transparent text-xs md:text-sm"
        defaultValue="EUR"
        aria-label={selectCurrencyAria}
      >
        <option value="EUR">€ / EUR</option>
        <option value="USD">$ / USD</option>
        <option value="GBP">£ / GBP</option>
      </select>
      <Image
        src="/logo/AFC-logo-mark-light.svg"
        alt={logoAlt}
        width={28}
        height={28}
        priority
        className="h-8 w-auto select-none md:h-10"
      />
    </div>
  );
}
