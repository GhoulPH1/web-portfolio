import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectMeta } from "../../components/ProjectMeta";
import { ScreenshotFigure } from "../../components/ScreenshotFigure";
import {
  getAllProjectSlugs,
  getProjectBySlug,
} from "@/content/projects";

type PageProps = {
  params: Promise<{ slug: string }>;
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

  return (
    <main id="main" className="mx-auto w-full max-w-5xl flex-1 px-5 py-14 sm:px-8 sm:py-20">
      <p className="text-sm">
        <Link href="/projects" className="text-muted hover:text-foreground">
          ← Back to projects
        </Link>
      </p>

      <header className="mt-6 max-w-3xl">
        <h1 className="text-4xl font-semibold tracking-tight">{project.title}</h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">{project.summary}</p>
      </header>

      <div className="mt-8">
        <ProjectMeta
          type={project.type}
          status={project.status}
          role={project.role}
          technologies={project.technologies}
        />
      </div>

      {project.links.length > 0 ? (
        <ul className="mt-6 flex flex-wrap gap-4 text-sm">
          {project.links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-accent hover:text-accent-hover"
              >
                {link.label}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      ) : null}

      <Section title="Problem / motivation">
        <p>{project.problem}</p>
      </Section>

      <Section title="Intended users">
        <p>{project.intendedUsers}</p>
      </Section>

      <Section title="Contributions">
        <BulletList items={project.contributions} />
      </Section>

      {project.features.length > 0 ? (
        <Section title="Features">
          <BulletList items={project.features} />
        </Section>
      ) : null}

      {project.challenges.length > 0 ? (
        <Section title="Challenges and decisions">
          <BulletList items={project.challenges} />
        </Section>
      ) : null}

      {project.screenshots.length > 0 ? (
        <Section title="Screenshots">
          <div className="grid gap-6">
            {project.screenshots.map((shot) => (
              <ScreenshotFigure key={shot.src} screenshot={shot} />
            ))}
          </div>
        </Section>
      ) : null}

      {project.outcomes.length > 0 ? (
        <Section title="Outcomes">
          <BulletList items={project.outcomes} />
        </Section>
      ) : null}

      {project.limitations.length > 0 ? (
        <Section title="Limitations / unfinished work">
          <BulletList items={project.limitations} />
        </Section>
      ) : null}

      {project.lessons.length > 0 ? (
        <Section title="Lessons and improvements">
          <BulletList items={project.lessons} />
        </Section>
      ) : null}

      <p className="mt-14 text-sm">
        <Link href="/projects" className="font-medium text-accent hover:text-accent-hover">
          ← Back to projects
        </Link>
      </p>
    </main>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="mt-12 max-w-3xl">
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      <div className="mt-4 text-base leading-relaxed text-foreground/90">{children}</div>
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-2 pl-5">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
