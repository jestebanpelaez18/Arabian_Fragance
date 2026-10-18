import SmoothImage from "../ui/SmoothImage";

const IMAGE_SIZES = "(min-width: 1024px) 25vw, 50vw";

const HOVER_IMAGE_CLASS = [
  "absolute inset-0 object-cover opacity-0",
  "transition-opacity duration-700 ease-in-out",
  "[@media(hover:hover)_and_(pointer:fine)]:group-hover:opacity-100",
  "group-focus-within:opacity-100",
  "motion-reduce:transition-none",
].join(" ");

type ProductCardImagesProps = {
  name: string;
  primaryImage: string;
  hoverImage: string | null;
  priority?: boolean;
};

export default function ProductCardImages({
  name,
  primaryImage,
  hoverImage,
  priority = false,
}: ProductCardImagesProps) {
  return (
    <>
      <SmoothImage
        src={primaryImage}
        alt={name}
        fill
        sizes={IMAGE_SIZES}
        className="object-cover"
        priority={priority}
      />

      {hoverImage && hoverImage !== primaryImage && (
        <SmoothImage
          src={hoverImage}
          alt=""
          fill
          sizes={IMAGE_SIZES}
          className={HOVER_IMAGE_CLASS}
        />
      )}
    </>
  );
}
