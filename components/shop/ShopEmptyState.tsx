type Props = {
  title: string;
  description: string;
};

export default function ShopEmptyState({ title, description }: Props) {
  return (
    <div
      role="status"
      className="mx-auto flex max-w-xl flex-col items-center px-5 py-20 text-center md:py-28"
    >
      <h2 className="font-magister text-xl font-normal text-neutral-900 md:text-2xl">
        {title}
      </h2>

      <p className="font-garamond mt-3 text-base leading-relaxed text-black/60 md:text-lg">
        {description}
      </p>
    </div>
  );
}
