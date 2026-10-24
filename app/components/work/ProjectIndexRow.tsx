import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/types";
import { Reveal } from "../ui/Reveal";

type Props = {
  project: Project;
  index: string;
  delayMs?: number;
};

export function ProjectIndexRow({ project, index, delayMs = 0 }: Props) {
  const shot = project.screenshots[0];
  const stack = project.technologies.join(" / ");

  return (
    <Reveal delayMs={delayMs}>
      <Link
        href={project.caseStudyPath}
        className="group grid grid-cols-[auto_1fr_auto] items-start gap-4 border-t border-rule py-8 md:grid-cols-[4rem_1fr_minmax(0,14rem)_auto] md:items-center md:gap-8"
      >
        <span className="text-label text-ink-muted pt-1">{index}</span>
        <div className="min-w-0">
          <h3 className="font-[family-name:var(--font-outfit)] text-xl font-medium tracking-tight transition-colors duration-200 group-hover:text-accent md:text-2xl">
            {project.title}
          </h3>
          <p className="text-body mt-2 text-ink-muted">{project.summary}</p>
          <p className="mt-3 font-[family-name:var(--font-outfit)] text-xs tracking-wide text-ink-muted md:hidden">
            {stack}
          </p>
        </div>
        <p className="hidden font-[family-name:var(--font-outfit)] text-xs tracking-wide text-ink-muted md:block">
          {stack}
        </p>
        <div className="flex items-center gap-4">
          {shot ? (
            <div className="hidden h-16 w-24 overflow-hidden border border-rule sm:block md:h-20 md:w-32">
              <Image
                src={shot.src}
                alt=""
                width={shot.width}
                height={shot.height}
                className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                sizes="128px"
              />
            </div>
          ) : null}
          <span
            aria-hidden
            className="text-ink transition-transform duration-200 group-hover:translate-x-1"
          >
            →
          </span>
        </div>
      </Link>
    </Reveal>
  );
}
