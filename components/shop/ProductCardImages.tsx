import SmoothImage from "../ui/SmoothImage";

const IMAGE_SIZES = "(min-width: 1024px) 25vw, 50vw";

const PRIMARY_IMAGE_CLASS = "object-cover";

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
  const showHoverImage = hoverImage && hoverImage !== primaryImage;

  return (
    <>
      <SmoothImage
        src={primaryImage}
        alt={name}
        fill
        sizes={IMAGE_SIZES}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        className={PRIMARY_IMAGE_CLASS}
      />

      {showHoverImage && (
        <SmoothImage
          src={hoverImage}
          alt=""
          fill
          sizes={IMAGE_SIZES}
          loading="lazy"
          fetchPriority="low"
          className={HOVER_IMAGE_CLASS}
        />
      )}
    </>
  );
}
