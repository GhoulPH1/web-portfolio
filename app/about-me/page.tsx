import type { Metadata } from "next";
import { LearningList } from "../components/LearningList";
import { SkillList } from "../components/SkillList";
import { Hairline } from "../components/ui/Hairline";
import { MetaList } from "../components/ui/MetaList";
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

  const credentialItems = [
    edu
      ? {
          label: "Education",
          value: `${edu.statusLabel} · ${edu.credential} · ${edu.institution}, ${edu.location}`,
        }
      : null,
    job
      ? {
          label: "INTERNSHIP",
          value: `${job.title} · ${job.organization} · ${job.start} – ${job.end}`,
        }
      : null,
    edu
      ? {
          label: "Coursework",
          value: edu.coursework.join(", "),
        }
      : null,
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <main id="main">
      <Section>
        <SectionLabel index="02" label="About" />
        <div className="mt-10 grid gap-10 md:grid-cols-12">
          <h1 className="text-h1 md:col-span-5">About</h1>
          <div className="md:col-span-6 md:col-start-7">
            <Reveal>
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

        <Hairline className="mt-16" />
        <div className="mt-10">
          <h2 className="text-label text-ink-muted">Credentials</h2>
          <MetaList className="mt-6 md:grid-cols-1" items={credentialItems} />
        </div>
      </Section>

      <Section alt>
        <h2 className="text-h2">Skills</h2>
        <p className="text-body mt-3 text-ink-muted">
          Grouped by use in academic projects and support work.
        </p>
        <div className="mt-10">
          <SkillList categories={skillCategories} />
        </div>
      </Section>

      <Section>
        <h2 className="text-h2">Currently learning</h2>
        <p className="text-body mt-3 text-ink-muted">
          Learning activities — not experience, training credentials, or certifications.
        </p>
        <div className="mt-10">
          <LearningList />
        </div>
      </Section>
    </main>
  );
}
