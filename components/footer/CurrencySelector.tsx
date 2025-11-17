import Image from "next/image";

export default function CurrencySelector() {
  return (
    <div className="flex items-center justify-end gap-4 mb-4 md:mt-6 md:mb-0">
      <select
        className="font-bodoni border-none bg-transparent text-xs md:text-sm"
        defaultValue="EUR"
        aria-label="Select currency"
      >
        <option value="EUR">€ / EUR</option>
        <option value="USD">$ / USD</option>
        <option value="GBP">£ / GBP</option>
      </select>
      <Image
        src="/logo/AFC-logo-mark-light.svg"
        alt="Arabian Fragrance"
        width={28}
        height={28}
        priority
        className="h-8 w-auto select-none md:h-10"
      />
    </div>
  );
}