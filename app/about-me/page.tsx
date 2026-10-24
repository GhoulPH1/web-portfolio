import type { Metadata } from "next";
import { LearningList } from "../components/LearningList";
import { SkillList } from "../components/SkillList";
import { BackLink } from "../components/ui/BackLink";
import { Hairline } from "../components/ui/Hairline";
import { Reveal } from "../components/ui/Reveal";
import { Section } from "../components/ui/Section";
import { SectionLabel } from "../components/ui/SectionLabel";
import { TextLink } from "../components/ui/TextLink";
import { education } from "@/content/education";
import { experience } from "@/content/experience";
import { skillCategories } from "@/content/skills";
import {
  aboutCredentials,
  aboutDirection,
  resume,
  rolesOpenTo,
} from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Education, experience, skills, and current learning for Godric G. Ramelo.",
};

export default function AboutMePage() {
  const edu = education[0];
  const job = experience[0];

  return (
    <main id="main">
      <Section>
        <Reveal>
          <BackLink href="/" label="Home" className="mb-10" />
        </Reveal>
        <Reveal index={1}>
          <SectionLabel index="02" label="About" />
        </Reveal>
        <div className="mt-10 grid gap-10 md:grid-cols-12">
          <Reveal index={2} className="md:col-span-5">
            <h1 className="text-h1">About</h1>
          </Reveal>
          <div className="md:col-span-6 md:col-start-7">
            <Reveal index={3}>
              <p className="text-body text-ink-muted">{aboutCredentials}</p>
              <p className="text-body mt-4 text-ink-muted">{aboutDirection}</p>
              <p className="text-body mt-4 text-ink-muted">{rolesOpenTo}</p>
              {resume.available && resume.href ? (
                <p className="mt-8">
                  <TextLink href={resume.href} external>
                    Résumé
                  </TextLink>
                </p>
              ) : null}
            </Reveal>
          </div>
        </div>

        <Hairline draw className="mt-16" />

        <div className="mt-12 space-y-14">
          {edu ? (
            <Reveal>
              <section id="education" aria-labelledby="education-heading">
                <h2 id="education-heading" className="text-label text-ink-muted">
                  Education
                </h2>
                <div className="mt-5 border-l border-rule pl-5 md:pl-6">
                  <p className="font-[family-name:var(--font-outfit)] text-lg font-medium tracking-tight">
                    {edu.credential}
                  </p>
                  <p className="mt-2 text-sm text-ink-muted">
                    {edu.statusLabel} · {edu.institution}, {edu.location}
                  </p>
                  <Reveal
                        className="max-w-none py-3 text-base text-ink-muted">
                  {edu.coursework.length > 0 ? (
                    <div className="mt-6">
                      <p className="text-label text-ink-muted">Coursework</p>
                      <p className="mt-3 max-w-none text-base text-ink-muted">
                        {edu.coursework.join(", ")}
                      </p>
                    </div>
                  ) : null}
                  </Reveal>
                  
                  <Reveal
                        className="max-w-none mt-3 border-t border-rule py-3 text-base text-ink-muted first:border-t-0">
                  {edu.exposure.length > 0 ? (
                    <div className="mt-3">
                      <p className="text-label text-ink-muted">Introduced to</p>
                      <p className="mt-3 max-w-none text-base text-ink-muted">
                        {edu.exposure.join(", ")}
                      </p>
                    </div>
                  ) : null}
                 </Reveal>
                </div>
              </section>
            </Reveal>
          ) : null}

          {job ? (
            <Reveal index={1}>
              <section id="experience" aria-labelledby="experience-heading">
                <Hairline draw className="mb-14" />
                <h2
                  id="experience-heading"
                  className="mt-12 text-label text-ink-muted"
                >
                  Experience
                </h2>
                <div className="mt-5 border-l border-rule pl-5 md:pl-6">
                  <p className="font-[family-name:var(--font-outfit)] text-lg font-medium tracking-tight">
                    {job.title}
                  </p>
                  <p className="mt-2 text-sm text-ink-muted">
                    {job.employmentType} · {job.organization}
                  </p>
                  <p className="mt-1 text-sm text-ink-muted">
                    {job.location} · {job.start} – {job.end}
                  </p>
                  <p className="text-label mt-8 text-ink-muted">
                    Responsibilities
                  </p>
                  <ul className="mt-3 space-y-0">
                    {job.responsibilities.map((item, i) => (
                      <Reveal
                        key={item}
                        index={Math.min(i, 5)}
                        as="li"
                        className="max-w-none border-t border-rule py-3 text-base text-ink-muted first:border-t-0"
                      >
                        {item}
                      </Reveal>
                    ))}
                  </ul>
                </div>
              </section>
            </Reveal>
          ) : null}
        </div>
      </Section>

      <Section id="skills" alt className="section-cv">
        <Reveal>
          <h2 className="text-h2">Skills</h2>
          <p className="text-body mt-3 text-ink-muted">
            Grouped by use in academic projects and support work.
          </p>
        </Reveal>
        <div className="mt-10">
          <SkillList categories={skillCategories} />
        </div>
      </Section>

      <Section id="learning" className="section-cv">
        <Reveal>
          <h2 className="text-h2">Currently learning</h2>
          <p className="text-body mt-3 text-ink-muted">
            Learning activities — not experience, training credentials, or
            certifications.
          </p>
        </Reveal>
        <div className="mt-10">
          <LearningList />
        </div>
      </Section>
    </main>
  );
}
