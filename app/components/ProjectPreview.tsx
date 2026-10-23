import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/types";

type Props = {
  project: Project;
};

const statusLabel: Record<string, string> = {
  completed: "Completed",
  "in-progress": "In progress",
  prototype: "Prototype",
  archived: "Archived",
};

export function ProjectPreview({ project }: Props) {
  const thumb = project.screenshots[0];

  return (
    <article className="border-t border-border py-8 first:border-t-0 first:pt-0">
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-10">
        <div className="min-w-0 flex-1">
          <p className="text-xs uppercase tracking-[0.14em] text-muted">
            {statusLabel[project.status] ?? project.status}
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight">
            <Link
              href={project.caseStudyPath}
              className="hover:text-accent"
            >{`Case study: ${project.title}`}</Link>
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
            {project.summary}
          </p>
          <ul className="mt-4 flex flex-wrap gap-2" aria-label={`Technologies used in ${project.title}`}>
            {project.technologies.map((tech) => (
              <li
                key={tech}
                className="border border-border bg-surface px-2.5 py-1 text-xs text-foreground"
              >
                {tech}
              </li>
            ))}
          </ul>
          <p className="mt-5">
            <Link
              href={project.caseStudyPath}
              className="text-sm font-medium text-accent hover:text-accent-hover"
            >
              View case study
              <span className="sr-only"> for {project.title}</span>
            </Link>
          </p>
        </div>
        {thumb ? (
          <div className="w-full shrink-0 md:w-64 lg:w-72">
            <Image
              src={thumb.src}
              alt={thumb.alt}
              width={thumb.width}
              height={thumb.height}
              className="h-auto w-full border border-border bg-surface object-cover object-top"
              sizes="(max-width: 768px) 100vw, 288px"
            />
          </div>
        ) : null}
      </div>
    </article>
  );
}
