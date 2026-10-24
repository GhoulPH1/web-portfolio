import { FeaturedProject } from "./components/work/FeaturedProject";
import { ProjectIndexRow } from "./components/work/ProjectIndexRow";
import { Button } from "./components/ui/Button";
import { Hairline } from "./components/ui/Hairline";
import { Reveal } from "./components/ui/Reveal";
import { Section } from "./components/ui/Section";
import { SectionLabel } from "./components/ui/SectionLabel";
import { TextLink } from "./components/ui/TextLink";
import { getAllProjects, getProjectBySlug } from "@/content/projects";
import {
  aboutCredentials,
  aboutDirection,
  contact,
  gmailComposeUrl,
  homeGreeting,
  homeIntroduction,
  resume,
  rolesOpenTo,
} from "@/content/site";

export default function Home() {
  const medicaone = getProjectBySlug("medicaone");
  const others = getAllProjects().filter((p) => p.slug !== "medicaone");

  return (
    <main id="main">
      {/* Hero */}
      <section id="intro" className="bg-bg">
        <div className="mx-auto grid min-h-[calc(100svh-3.5rem)] w-full max-w-[1280px] grid-cols-1 content-center gap-10 px-5 py-20 md:grid-cols-12 md:gap-8 md:px-10 md:py-28">
          <div className="md:col-span-11 lg:col-span-10">
          <p className="font-[family-name:var(--font-outfit)] text-lg font-light tracking-wide text-ink-muted md:text-xl">
            {homeGreeting}
          </p>
            <h1 className="text-9xl mt-3 text-ink">
              <span className="font-light">Godric</span>{" "}
              <span className="inline-block font-medium">G. Ramelo</span>
            </h1>
          </div>

          <div className="md:col-span-6 md:col-start-6 lg:col-span-5 lg:col-start-7">
            <div className="space-y-3">
              {homeIntroduction.map((line) => (
                <p key={line} className="text-body text-ink-muted">
                  {line}
                </p>
              ))}
            </div>
          </div>

          <div className="md:col-span-12">
            <Hairline className="mb-6" />
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
              <TextLink href="#work">Selected work ↓</TextLink>
              {resume.available && resume.href ? (
                <TextLink href={resume.href} external>
                  Résumé
                </TextLink>
              ) : null}
              <p className="text-label flex items-center gap-2 text-ink-muted">
                <span
                  aria-hidden
                  className="inline-block size-1.5 rounded-full bg-accent"
                />
                {rolesOpenTo}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Selected work */}
      <Section id="work">
        <SectionLabel index="01" label="Work" />
        <div className="mt-10 grid gap-6 md:grid-cols-12">
          {/* <h2 className="text-h1 md:col-span-7 md:col-start-5">Selected work</h2> */}
        </div>

        <div className="mt-16 space-y-20">
          {medicaone ? <FeaturedProject project={medicaone} index="01" /> : null}
          <div>
            <Hairline />
            {others.map((project, i) => (
              <ProjectIndexRow
                key={project.id}
                project={project}
                index={String(i + 2).padStart(2, "0")}
                delayMs={i * 40}
              />
            ))}
            <Hairline />
          </div>
        </div>
      </Section>

      {/* About preview */}
      <Section id="about" alt>
        <SectionLabel index="02" label="About" />
        <div className="mt-10 mb-13 grid gap-10 md:grid-cols-12">
          <h2 className="text-h1 md:col-span-5">About</h2>
          <div className="md:col-span-6 md:col-start-7">
            <Reveal>
              <p className="text-body text-ink-muted">{aboutCredentials}</p>
              <p className="text-body mt-4 text-ink-muted">{aboutDirection}</p>
              <p className="mt-8">
                <TextLink href="/about-me">Full profile</TextLink>
              </p>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Contact */}
      <Section id="contact" dark>
        <SectionLabel index="03" label="Contact" dark />
        <div className="mt-10 grid gap-10 md:grid-cols-12">
          <div className="md:col-span-8">
            <p className="font-[family-name:var(--font-outfit)] text-3xl font-light tracking-tight text-white md:text-5xl">
              {/* {rolesOpenTo} */}Let’s connect.
            </p>
            <p className="mt-8">
              <a
                href={gmailComposeUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 border-b border-accent-on-dark pb-1 font-[family-name:var(--font-outfit)] text-xl font-light text-white transition-colors hover:text-accent-on-dark md:text-3xl"
              >
                {contact.email}
                <span
                  aria-hidden
                  className="transition-transform duration-200 group-hover:translate-x-1"
                >
                  ↗
                </span>
              </a>
            </p>
            <div className="mt-6 space-y-2 text-sm text-white/70">
              {contact.phoneDisplay ? <p>{contact.phoneDisplay}</p> : null}
              {contact.locationDisplay ? <p>{contact.locationDisplay}</p> : null}
            </div>
            {contact.profiles.length > 0 ? (
              <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                {contact.profiles.map((profile) => (
                  <li key={profile.href}>
                    <a
                      href={profile.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-label text-white/70 transition-colors hover:text-accent-on-dark"
                    >
                      {profile.label} ↗
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
            {resume.available && resume.href ? (
              <div className="mt-10">
                <Button href={resume.href} external variant="onDark">
                  Download résumé
                </Button>
              </div>
            ) : null}
          </div>
        </div>
      </Section>
    </main>
  );
}
