import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { ScreenshotFigure } from "../../components/ScreenshotFigure";
import { Container } from "../../components/ui/Container";
import { Hairline } from "../../components/ui/Hairline";
import { MetaList } from "../../components/ui/MetaList";
import { TextLink } from "../../components/ui/TextLink";
import {
  getAllProjects,
  getAllProjectSlugs,
  getProjectBySlug,
} from "@/content/projects";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const indexMap: Record<string, string> = {
  medicaone: "01",
  foodhub: "02",
  sidescroll: "03",
};

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project" };
  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function ProjectCaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const all = getAllProjects();
  const currentIndex = all.findIndex((p) => p.slug === slug);
  const next = currentIndex >= 0 ? all[(currentIndex + 1) % all.length] : undefined;
  const index = indexMap[project.slug] ?? "00";
  const stack = project.technologies.join(" / ");

  return (
    <main id="main" className="bg-bg">
      <Container className="py-16 md:py-24 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <aside className="lg:col-span-4 lg:self-start lg:sticky lg:top-24">
            <p className="font-[family-name:var(--font-outfit)] text-6xl font-light tracking-tight text-ink-muted md:text-7xl">
              {index}
            </p>
            <h1 className="text-h1 mt-4">{project.title}</h1>
            <p className="text-body text-ink-muted text-lg">{project.summary}</p>
            <MetaList
              className="mt-8"
              items={[
                { label: "Project", value: project.role },
                { label: "Stack", value: stack },
                {
                  label: "Status",
                  value:
                    project.status === "completed" ? "Completed" : project.status,
                },
              ]}
            />
            <p className="mt-10">
              <TextLink href="/projects">← Work</TextLink>
            </p>
          </aside>

          <div className="lg:col-span-8">

            {project.problem ? (
              <CaseBlock title="Purpose">
                <p className="text-body text-ink-muted">{project.problem}</p>
              </CaseBlock>
            ) : null}

            {project.contributions.length > 0 ? (
              <CaseBlock title="What I Worked On">
                <LineList items={project.contributions} />
              </CaseBlock>
            ) : null}

            {project.features.length > 0 ? (
              <CaseBlock title="Implemented features">
                <ol className="space-y-0">
                  {project.features.map((feature, i) => (
                    <li
                      key={feature}
                      className="grid grid-cols-[3rem_1fr] gap-4 border-t border-rule py-4 first:border-t-0"
                    >
                      <span className="text-label text-ink-muted">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-body text-ink-muted max-w-none">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ol>
              </CaseBlock>
            ) : null}

            {project.screenshots.length > 0 ? (
              <CaseBlock title="Screenshots">
                <div className="grid gap-8">
                  {project.screenshots.map((shot) => (
                    <ScreenshotFigure key={shot.src} screenshot={shot} />
                  ))}
                </div>
              </CaseBlock>
            ) : null}

            {project.limitations.length > 0 ? (
              <CaseBlock title="Limitations">
                <LineList items={project.limitations} />
              </CaseBlock>
            ) : null}

            {project.links.length > 0 ? (
              <CaseBlock title="Links">
                <ul className="space-y-3">
                  {project.links.map((link) => (
                    <li key={link.href}>
                      <TextLink href={link.href} external={link.kind !== "other"}>
                        {link.label}
                      </TextLink>
                    </li>
                  ))}
                </ul>
              </CaseBlock>
            ) : null}

            {next && next.slug !== project.slug ? (
              <>
                <Hairline className="mt-16" />
                <p className="mt-8">
                  <TextLink href={next.caseStudyPath}>
                    Next project · {next.title}
                  </TextLink>
                </p>
              </>
            ) : null}
          </div>
        </div>
      </Container>
    </main>
  );
}

function CaseBlock({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="mt-14">
      <h2 className="text-label text-ink-muted">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function LineList({ items }: { items: string[] }) {
  return (
    <ul>
      {items.map((item) => (
        <li
          key={item}
          className="border-t border-rule py-4 text-body text-ink-muted first:border-t-0"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
