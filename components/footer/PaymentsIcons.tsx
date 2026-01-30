import Image from "next/image";

export default function PaymentIcons() {
  const methods = [
    {
      name: "Visa",
      src: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg",
      padding: "p-1", // Ajuste fino para que no toque los bordes
    },
    {
      name: "Mastercard",
      src: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg",
      padding: "p-0", // Mastercard llena mejor la tarjeta
    },
    {
      name: "American Express",
      src: "https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg",
      padding: "p-0",
    },
    {
      name: "Apple Pay",
      src: "https://upload.wikimedia.org/wikipedia/commons/b/b0/Apple_Pay_logo.svg",
      padding: "p-1",
    },
    {
      name: "Mobile Pay",
      src: "https://upload.wikimedia.org/wikipedia/commons/f/fd/MobilePay_logo.svg",
      padding: "p-1",
    },
    {
      name: "Klarna",
      src: "https://upload.wikimedia.org/wikipedia/commons/4/40/Klarna_Payment_Badge.svg",
      padding: "p-1",
    },
  ];

  return (
    <div className="mt-8 flex flex-wrap items-center justify-end gap-2">
      {methods.map((method) => (
        <div
          key={method.name}
          className={`flex h-8 w-12 items-center justify-center overflow-hidden rounded bg-white shadow-sm ${method.padding}`}
        >
          <Image
            src={method.src}
            alt={method.name}
            className="h-full w-full object-contain"
            width={48}
            height={32}
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
}
