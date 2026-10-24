import Image from "next/image";
import type { ProjectScreenshot } from "@/content/types";

type Props = {
  screenshot: ProjectScreenshot;
};

export function ScreenshotFigure({ screenshot }: Props) {
  return (
    <figure className="group relative">
      {screenshot.caption ? (
        <figcaption className="mb-4 flex items-end justify-between gap-4">
          <span className="font-[family-name:var(--font-outfit)] text-base font-medium tracking-tight text-ink md:text-lg">
            {screenshot.caption}
          </span>
          <span
            aria-hidden
            className="mb-1.5 hidden h-px flex-1 bg-rule sm:block"
          />
        </figcaption>
      ) : null}
      <div className="relative">
        <div
          aria-hidden
          className="absolute -inset-x-2 -inset-y-2 border border-rule opacity-0 transition-opacity duration-200 group-hover:opacity-100 md:-inset-x-3 md:-inset-y-3"
        />
        <div className="relative overflow-hidden border border-ink/15 bg-bg-alt">
          <div className="flex items-center gap-2 border-b border-ink/10 bg-bg px-3 py-2">
            <span aria-hidden className="size-1.5 rounded-full bg-rule" />
            <span aria-hidden className="size-1.5 rounded-full bg-rule" />
            <span aria-hidden className="size-1.5 rounded-full bg-rule" />
            <span className="ml-2 truncate font-[family-name:var(--font-outfit)] text-[0.65rem] tracking-wide text-ink-muted">
              {screenshot.caption ?? "Screenshot"}
            </span>
          </div>
          <Image
            src={screenshot.src}
            alt={screenshot.alt}
            width={screenshot.width}
            height={screenshot.height}
            className="h-auto w-full object-cover object-top"
            sizes="(max-width: 1024px) 100vw, 720px"
          />
        </div>
        <span
          aria-hidden
          className="absolute -bottom-2 -right-2 size-8 border-b border-r border-accent opacity-60 transition-opacity duration-200 group-hover:opacity-100"
        />
      </div>
    </figure>
  );
}
