type SectionHeaderProps = {
  title: string;
  description: string;
};

export default function SectionHeader({ title, description }: SectionHeaderProps) {
  return (
    <section className="w-full bg-background px-4 py-14 text-center md:py-18">
      <div className="mx-auto flex max-w-3xl flex-col items-center">
        <h2 className="text-2xl leading-tight font-light tracking-[0.14em] uppercase text-neutral-900 md:text-3xl lg:text-4xl">
          {title}
        </h2>

        <p className="font-garamond mt-5 max-w-xl text-xs leading-relaxed font-light tracking-wide text-neutral-600 md:text-sm">
          {description}
        </p>
      </div>
    </section>
  );
}