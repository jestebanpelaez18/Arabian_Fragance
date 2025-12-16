export default function BrandCopy({ text }: { text: string }) {
  return (
    <p className="font-bodoni mb-6 text-xs leading-relaxed text-white/90 md:mb-8">
      {text}
    </p>
  );
}
