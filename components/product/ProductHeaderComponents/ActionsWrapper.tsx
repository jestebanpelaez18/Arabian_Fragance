import ProductActions from "@/components/product/ProductActions";

type ActionsWrapperProps = {
  product: { id: string; name: string; price: number; image: string };
  stock: number;
};

export default function ActionsWrapper({ product, stock }: ActionsWrapperProps) {
  return (
    <div className="mt-10 [&_a]:hidden [&_button]:h-14 [&_button]:w-full [&_button]:rounded-full [&_button]:bg-white [&_button]:text-sm [&_button]:tracking-[0.18em] [&_button]:text-[var(--background)] [&_button]:hover:opacity-90 [&_button:nth-of-type(2)]:hidden [&_div]:border-0 [&_div]:shadow-none [&_div]:ring-0 [&_form]:m-0 [&_form]:border-0 [&_form]:p-0 [&_form]:shadow-none [&_form]:ring-0">
      <ProductActions product={product} stock={stock} />
    </div>
  );
}