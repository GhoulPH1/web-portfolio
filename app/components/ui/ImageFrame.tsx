"use client";

import Image, { type ImageProps } from "next/image";
import { useEffect, useRef, useState } from "react";
import { observeOnce, prefersReducedMotion } from "../motion/observer";

type Props = {
  src: ImageProps["src"];
  alt: string;
  width: number;
  height: number;
  sizes?: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
  /** Aspect ratio utility classes, e.g. aspect-[16/10] */
  ratioClassName?: string;
  enableHoverScale?: boolean;
};

/**
 * Fixed-ratio frame: image uncovers only after load AND in-view.
 * Communicates: media is ready (not a half-loaded fade).
 */
export function ImageFrame({
  src,
  alt,
  width,
  height,
  sizes,
  priority = false,
  className = "",
  imgClassName = "",
  ratioClassName = "aspect-[16/10]",
  enableHoverScale = false,
}: Props) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const ready = inView && loaded;

  useEffect(() => {
    const node = frameRef.current;
    if (!node) return;
    if (prefersReducedMotion()) {
      queueMicrotask(() => setInView(true));
      return;
    }
    return observeOnce(node, () => setInView(true));
  }, []);

  useEffect(() => {
    const img = frameRef.current?.querySelector("img");
    if (img?.complete && img.naturalWidth > 0) {
      queueMicrotask(() => setLoaded(true));
    }
  }, [src]);

  useEffect(() => {
    if (!ready) return;
    const img = frameRef.current?.querySelector("img");
    if (!img) return;
    img.style.willChange = "opacity, transform";
    const clear = () => {
      img.style.willChange = "auto";
      img.removeEventListener("transitionend", clear);
    };
    img.addEventListener("transitionend", clear);
  }, [ready]);

  return (
    <div
      ref={frameRef}
      className={`overflow-hidden border border-rule bg-bg-alt ${ratioClassName} ${className}`.trim()}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        priority={priority}
        onLoad={() => setLoaded(true)}
        className={`motion-image h-full w-full object-cover object-top ${
          ready ? "is-ready" : ""
        } ${
          enableHoverScale
            ? "transition-transform duration-[var(--dur-base)] ease-[var(--ease-out)] [@media(hover:hover)]:group-hover:scale-[var(--image-scale)]"
            : ""
        } ${imgClassName}`.trim()}
      />
    </div>
  );
}
