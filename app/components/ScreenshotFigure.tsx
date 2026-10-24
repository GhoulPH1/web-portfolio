import Image from "next/image";
import type { ProjectScreenshot } from "@/content/types";

type Props = {
  screenshot: ProjectScreenshot;
};

export function ScreenshotFigure({ screenshot }: Props) {
  return (
    <figure className="border border-rule bg-bg-alt">
      <Image
        src={screenshot.src}
        alt={screenshot.alt}
        width={screenshot.width}
        height={screenshot.height}
        className="h-auto w-full object-cover object-top"
        sizes="(max-width: 1024px) 100vw, 720px"
      />
      {screenshot.caption ? (
        <figcaption className="text-label border-t border-rule px-4 py-3 text-ink-muted">
          {screenshot.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
