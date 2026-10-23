import Link from "next/link";
import { LearningList } from "./components/LearningList";
import { ProjectPreview } from "./components/ProjectPreview";
import { ResumeDownloadLink } from "./components/ResumeDownloadLink";
import { learning } from "@/content/learning";
import { getFeaturedProjects } from "@/content/projects";
import { gmailComposeUrl, homeSummary, positioning, resume, siteMeta } from "@/content/site";
import { EmailIcon } from "./components/Icons";

export default function Home() {
  const featured = getFeaturedProjects();

  return (
    <main id="main" className="mx-auto w-full max-w-5xl flex-1 px-5 py-14 sm:px-8 sm:py-20">
      <section aria-labelledby="home-identity" className="max-w-3xl">
        <p className="text-sm uppercase tracking-[0.16em] text-muted">Portfolio</p>
        <h1 id="home-identity" className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
          {siteMeta.siteName}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-foreground/90">{positioning}</p>
        <p className="mt-4 text-base leading-relaxed text-muted">{homeSummary}</p>
        <div className="mt-8 flex flex-wrap gap-3 text-sm">
          <Link
            href="/projects"
            className="bg-accent px-4 py-2.5 font-medium text-white hover:bg-accent-hover"
          >
            View projects
          </Link>
          <ResumeDownloadLink
            resume={resume}
            className="border border-border bg-surface px-4 py-2.5 font-medium hover:border-foreground/30"
          />
          <a
            href={gmailComposeUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-border bg-surface px-4 py-2.5 font-medium hover:border-foreground/30"
          >
            <EmailIcon />
            Email Godric
            <span className="sr-only"> in Gmail (opens in a new tab)</span>
          </a>
        </div>
      </section>

      <section aria-labelledby="featured-work" className="mt-20">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 id="featured-work" className="text-2xl font-semibold tracking-tight">
              Selected work
            </h2>
            <p className="mt-2 max-w-xl text-sm text-muted">
              Academic and internship-era projects across web development and usable interfaces.
            </p>
          </div>
          <Link href="/projects" className="shrink-0 text-sm font-medium text-accent hover:text-accent-hover">
            All projects
          </Link>
        </div>
        <div>
          {featured.map((project) => (
            <ProjectPreview key={project.id} project={project} />
          ))}
        </div>
      </section>

      <section aria-labelledby="learning-home" className="mt-16 border-t border-border pt-12">
        <h2 id="learning-home" className="text-2xl font-semibold tracking-tight">
          Currently learning
        </h2>
        <p className="mt-2 max-w-xl text-sm text-muted">
          Active learning activities — not certifications or work experience.
        </p>
        <div className="mt-6">
          <LearningList items={learning.slice(0, 3)} compact />
        </div>
        <p className="mt-6 text-sm">
          <Link href="/about-me" className="font-medium text-accent hover:text-accent-hover">
            More about background and skills
          </Link>
        </p>
      </section>
    </main>
  );
}
