import Image from "next/image";

type GalleryImage = {
  url: string;
  altText?: string | null;
};

type ProductGalleryProps = {
  images: GalleryImage[];
  name: string;
  maxImages?: 1 | 2;
};

const IMAGE_SIZES =
  "(min-width: 1440px) 672px, (min-width: 1024px) calc(50vw - 48px), calc(100vw - 40px)";

export default function ProductGallery({
  images,
  name,
  maxImages = 2,
}: ProductGalleryProps) {
  const seen = new Set<string>();

  // Pick the allowed positions before removing duplicates, so a later image
  // never takes the place of one of the first ones.
  const selectedImages = images.slice(0, maxImages).filter((image) => {
    if (!image.url || seen.has(image.url)) return false;

    seen.add(image.url);
    return true;
  });

  const galleryImages =
    selectedImages.length > 0
      ? selectedImages
      : [{ url: "/catalog/Bottle_3.png", altText: name }];

  return (
    <div
      role="group"
      aria-label={name}
      tabIndex={galleryImages.length > 1 ? 0 : undefined}
      className="flex w-full min-w-0 snap-x snap-mandatory gap-3 overflow-x-auto focus-visible:outline focus-visible:outline-offset-4 lg:grid lg:gap-4 lg:overflow-visible"
    >
      {galleryImages.map((image, index) => (
        <div
          key={image.url}
          className="bg-background relative aspect-4/5 w-full shrink-0 snap-start overflow-hidden"
        >
          <Image
            src={image.url}
            alt={image.altText?.trim() || name}
            fill
            sizes={IMAGE_SIZES}
            priority={index === 0}
            className="object-contain object-center"
          />
        </div>
      ))}
    </div>
  );
}
