import Image from "next/image";

type ContainBlurImageProps = {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  draggable?: boolean;
  /** Scale the contained image (hover zoom). Blur fill stays put. */
  scale?: number;
  objectPosition?: string;
};

/** Full image via object-fit: contain, leftover edges filled with a blurred copy. */
export function ContainBlurImage({
  src,
  alt,
  sizes,
  priority = false,
  draggable,
  scale = 1,
  objectPosition = "center",
}: ContainBlurImageProps) {
  return (
    <>
      <Image
        src={src}
        alt=""
        fill
        aria-hidden
        sizes={sizes}
        priority={priority}
        draggable={draggable}
        style={{
          objectFit: "cover",
          objectPosition,
          filter: "blur(28px) saturate(1.45) brightness(0.72)",
          transform: "scale(1.22)",
          pointerEvents: "none",
          userSelect: "none",
        }}
      />
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        draggable={draggable}
        style={{
          objectFit: "contain",
          objectPosition,
          transform: scale === 1 ? undefined : `scale(${scale})`,
          transition: "transform .6s cubic-bezier(.2,.7,.2,1)",
          filter: "drop-shadow(0 10px 28px rgba(0,0,0,0.35))",
          pointerEvents: "none",
        }}
      />
    </>
  );
}
