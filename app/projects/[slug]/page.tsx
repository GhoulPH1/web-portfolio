import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ScreenshotFigure } from "../../components/ScreenshotFigure";
import { BackLink } from "../../components/ui/BackLink";
import { Container } from "../../components/ui/Container";
import { Hairline } from "../../components/ui/Hairline";
import { MetaList } from "../../components/ui/MetaList";
import { Reveal } from "../../components/ui/Reveal";
import { TextLink } from "../../components/ui/TextLink";
import type { Project } from "@/content/types";
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

export default function ProjectCaseStudyPage({ params }: PageProps) {
  return (
    <main id="main" className="bg-bg">
      <Container className="py-16 md:py-24 lg:py-28">
        <Suspense fallback={<CaseStudyFallback />}>
          <CaseStudyContent params={params} />
        </Suspense>
      </Container>
    </main>
  );
}

function CaseStudyFallback() {
  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-14" aria-hidden>
      <div className="lg:col-span-4">
        <div className="h-16 w-24 bg-bg-alt" />
        <div className="mt-4 h-10 w-48 bg-bg-alt" />
        <div className="mt-4 h-20 w-full max-w-sm bg-bg-alt" />
      </div>
      <div className="space-y-8 lg:col-span-8">
        <div className="h-32 bg-bg-alt" />
        <div className="h-48 bg-bg-alt" />
      </div>
    </div>
  );
}

async function CaseStudyContent({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const all = getAllProjects();
  const currentIndex = all.findIndex((p) => p.slug === slug);
  const next =
    currentIndex >= 0 ? all[(currentIndex + 1) % all.length] : undefined;
  const index = indexMap[project.slug] ?? "00";
  const stack = project.technologies.join(" / ");

  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
      <aside className="lg:col-span-4 lg:sticky lg:top-24 lg:self-start">
        <Reveal>
          <p className="font-[family-name:var(--font-outfit)] text-6xl font-light tracking-tight text-ink-muted md:text-7xl">
            {index}
          </p>
          <h1 className="text-h1 mt-4">{project.title}</h1>
          <p className="text-body text-lg text-ink-muted">{project.summary}</p>
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
          <BackLink href="/" label="Home" className="mt-10" />
        </Reveal>
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
                <Reveal
                  key={feature}
                  index={Math.min(i, 5)}
                  as="li"
                  className="grid grid-cols-[3rem_1fr] gap-4 border-t border-rule py-4 first:border-t-0"
                >
                  <span className="text-label text-ink-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-body max-w-none text-ink-muted">
                    {feature}
                  </span>
                </Reveal>
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
              {project.links.map((link, i) => (
                <Reveal key={link.href} index={Math.min(i, 5)} as="li">
                  <TextLink
                    href={link.href}
                    external={link.kind !== "other"}
                  >
                    {link.label}
                  </TextLink>
                </Reveal>
              ))}
            </ul>
          </CaseBlock>
        ) : null}

        {next && next.slug !== project.slug ? (
          <NextProjectLink
            project={next}
            index={indexMap[next.slug] ?? "00"}
          />
        ) : null}
      </div>
    </div>
  );
}

function NextProjectLink({
  project,
  index,
}: {
  project: Project;
  index: string;
}) {
  const shot = project.screenshots[0];

  return (
    <Reveal className="mt-20 md:mt-24">
      <Hairline draw />
      <Link
        href={project.caseStudyPath}
        prefetch
        className="group mt-8 grid gap-6 py-2 sm:grid-cols-[1fr_auto] sm:items-end sm:gap-10"
      >
        <div className="min-w-0">
          <p className="text-label text-ink-muted">Next project</p>
          <div className="mt-4 flex items-baseline gap-4">
            <span className="font-[family-name:var(--font-outfit)] text-3xl font-light tracking-tight text-ink-muted md:text-4xl">
              {index}
            </span>
            <h2 className="font-[family-name:var(--font-outfit)] text-2xl font-medium tracking-tight text-ink transition-colors duration-[var(--dur-fast)] ease-[var(--ease-out)] [@media(hover:hover)]:group-hover:text-accent group-focus-visible:text-accent md:text-3xl">
              {project.title}
            </h2>
          </div>
          <p className="text-body mt-3 max-w-md text-ink-muted">
            {project.summary}
          </p>
        </div>

        <div className="flex items-end gap-5">
          {shot ? (
            <div className="relative hidden h-20 w-32 overflow-hidden border border-rule sm:block md:h-24 md:w-40">
              <Image
                src={shot.src}
                alt=""
                width={shot.width}
                height={shot.height}
                className="h-full w-full object-cover object-top transition-transform duration-[var(--dur-base)] ease-[var(--ease-out)] [@media(hover:hover)]:group-hover:scale-[var(--image-scale)] group-focus-visible:scale-[var(--image-scale)]"
                sizes="160px"
              />
            </div>
          ) : null}
          <span
            aria-hidden
            className="mb-1 inline-flex size-9 shrink-0 items-center justify-center border border-rule text-ink transition-colors duration-[var(--dur-fast)] ease-[var(--ease-out)] [@media(hover:hover)]:group-hover:border-accent [@media(hover:hover)]:group-hover:bg-accent [@media(hover:hover)]:group-hover:text-bg group-focus-visible:border-accent group-focus-visible:bg-accent group-focus-visible:text-bg"
          >
            <svg
              viewBox="0 0 16 16"
              className="size-3.5 transition-transform duration-[var(--dur-fast)] ease-[var(--ease-out)] [@media(hover:hover)]:group-hover:translate-x-[var(--hover-nudge)] group-focus-visible:translate-x-[var(--hover-nudge)]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 3l5 5-5 5" />
            </svg>
          </span>
        </div>
      </Link>
      <Hairline draw className="mt-8" />
    </Reveal>
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
    <Reveal>
      <section className="mt-14">
        <h2 className="text-label text-ink-muted">{title}</h2>
        <div className="mt-4">{children}</div>
      </section>
    </Reveal>
  );
}

function LineList({ items }: { items: string[] }) {
  return (
    <ul>
      {items.map((item, i) => (
        <Reveal
          key={item}
          index={Math.min(i, 5)}
          as="li"
          className="border-t border-rule py-4 text-body text-ink-muted first:border-t-0"
        >
          {item}
        </Reveal>
      ))}
    </ul>
  );
}
