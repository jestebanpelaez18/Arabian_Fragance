"use client";

import Image from "next/image";
import { useState } from "react";

const methods = [
  {
    name: "Visa",
    src: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg",
    padding: "p-1",
  },
  {
    name: "Mastercard",
    src: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg",
    padding: "p-0.5",
  },
  {
    name: "American Express",
    src: "https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg",
    padding: "p-0.5",
  },
  {
    name: "Apple Pay",
    src: "https://upload.wikimedia.org/wikipedia/commons/b/b0/Apple_Pay_logo.svg",
    padding: "p-1",
  },
  {
    name: "MobilePay",
    src: "https://upload.wikimedia.org/wikipedia/commons/f/fd/MobilePay_logo.svg",
    padding: "p-1",
  },
  {
    name: "Klarna",
    src: "https://upload.wikimedia.org/wikipedia/commons/4/40/Klarna_Payment_Badge.svg",
    padding: "p-1",
  },
];

export default function PaymentIcons() {
  const [failedImages, setFailedImages] = useState<string[]>([]);

  function handleImageError(name: string) {
    setFailedImages((current) =>
      current.includes(name) ? current : [...current, name],
    );
  }

  return (
    <ul className="flex flex-wrap items-center justify-start gap-2">
      {methods.map((method) => (
        <li
          key={method.name}
          className={`flex h-7 w-11 items-center justify-center overflow-hidden rounded-sm bg-white ${method.padding}`}
        >
          {failedImages.includes(method.name) ? (
            <span className="px-0.5 text-center font-sans text-[8px] leading-tight font-semibold text-neutral-900">
              {method.name}
            </span>
          ) : (
            <Image
              src={method.src}
              alt={method.name}
              width={44}
              height={28}
              unoptimized
              loading="lazy"
              onError={() => handleImageError(method.name)}
              className="h-full w-full object-contain"
            />
          )}
        </li>
      ))}
    </ul>
  );
}
