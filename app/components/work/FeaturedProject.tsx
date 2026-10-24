import type { Project } from "@/content/types";
import { ImageFrame } from "../ui/ImageFrame";
import { MetaList } from "../ui/MetaList";
import { Reveal } from "../ui/Reveal";
import { TextLink } from "../ui/TextLink";

type Props = {
  project: Project;
  index?: string;
};

export function FeaturedProject({ project, index = "01" }: Props) {
  const shot = project.screenshots[0];
  const stack = project.technologies.join(" / ");

  return (
    <Reveal>
      <article className="group grid gap-8 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4 lg:pt-2">
          <p className="text-label text-ink-muted">{index}</p>
          <h3 className="text-h2 mt-3">{project.title}</h3>
          <p className="text-body mt-4 text-ink-muted">{project.summary}</p>
          <MetaList
            className="mt-8"
            items={[
              { label: "Project", value: project.role },
              { label: "Stack", value: stack },
              {
                label: "Status",
                value:
                  project.status === "completed"
                    ? "Completed"
                    : project.status,
              },
            ]}
          />
          <p className="mt-8">
            <TextLink href={project.caseStudyPath}>View case study</TextLink>
          </p>
        </div>
        <div className="lg:col-span-8">
          {shot ? (
            <ImageFrame
              src={shot.src}
              alt={shot.alt}
              width={shot.width}
              height={shot.height}
              sizes="(max-width: 1024px) 100vw, 720px"
              priority
              enableHoverScale
              ratioClassName="aspect-[16/10]"
            />
          ) : (
            <div className="aspect-[16/10] border border-rule bg-bg-alt" />
          )}
        </div>
      </article>
    </Reveal>
  );
}
