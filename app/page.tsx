import Link from "next/link";
import { ProjectPreview } from "./components/ProjectPreview";
import { ResumeDownloadLink } from "./components/ResumeDownloadLink";
import { getFeaturedProjects } from "@/content/projects";
import {
  homeGreeting,
  homeIntroduction,
  resume,
  siteMeta,
} from "@/content/site";

export default function Home() {
  const featured = getFeaturedProjects();

  return (
    <main id="main" className="mx-auto w-full max-w-5xl flex-1 px-5 py-14 sm:px-8 sm:py-20">
      <section aria-labelledby="home-identity" className="max-w-3xl">
        <p className="text-base text-muted">{homeGreeting}</p>
        <h1
          id="home-identity"
          className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl"
        >
          {siteMeta.siteName}
        </h1>
        <div className="mt-5 space-y-3 text-base leading-relaxed text-foreground/90">
          {homeIntroduction.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
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
        </div>
      </section>

      <section aria-labelledby="featured-work" className="mt-20">
        <div className="mb-8 flex items-end justify-between gap-4">
          <h2 id="featured-work" className="text-2xl font-semibold tracking-tight">
            Selected work
          </h2>
          <Link
            href="/projects"
            className="shrink-0 text-sm font-medium text-accent hover:text-accent-hover"
          >
            All projects
          </Link>
        </div>
        <div>
          {featured.map((project) => (
            <ProjectPreview key={project.id} project={project} />
          ))}
        </div>
      </section>
    </main>
  );
}
