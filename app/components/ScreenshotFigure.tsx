import Image from "next/image";
import type { ProjectScreenshot } from "@/content/types";

type Props = {
  screenshot: ProjectScreenshot;
};

export function ScreenshotFigure({ screenshot }: Props) {
  return (
    <figure className="border border-border bg-surface">
      <Image
        src={screenshot.src}
        alt={screenshot.alt}
        width={screenshot.width}
        height={screenshot.height}
        className="h-auto w-full object-cover object-top"
        sizes="(max-width: 1024px) 100vw, 960px"
      />
      {screenshot.caption ? (
        <figcaption className="border-t border-border px-4 py-3 text-sm text-muted">
          {screenshot.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
