import type { Metadata } from "next";
import { ContactLinks } from "../components/ContactLinks";
import { EducationEntry } from "../components/EducationEntry";
import { ExperienceEntry } from "../components/ExperienceEntry";
import { LearningList } from "../components/LearningList";
import { ResumeDownloadLink } from "../components/ResumeDownloadLink";
import { SkillList } from "../components/SkillList";
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
    "Education, experience, skills, and current learning for Godric G. Ramelo — currently pursuing a BSIT degree at Gordon College.",
};

export default function AboutMePage() {
  return (
    <main id="main" className="mx-auto w-full max-w-5xl flex-1 px-5 py-14 sm:px-8 sm:py-20">
      <header className="max-w-3xl">
        <h1 className="text-4xl font-semibold tracking-tight">About</h1>
        <p className="mt-4 text-base leading-relaxed text-foreground/90">
          {aboutCredentials}
        </p>
        <p className="mt-3 text-base leading-relaxed text-muted">{aboutDirection}</p>
        <div className="mt-6 flex flex-col gap-4">
          <ResumeDownloadLink
            resume={resume}
            className="inline-flex w-fit bg-accent px-4 py-2.5 text-sm font-medium text-white hover:bg-accent-hover"
          />
          <p className="text-sm text-muted">{rolesOpenTo}</p>
          <ContactLinks />
        </div>
      </header>

      <section aria-labelledby="experience-heading" className="mt-16 max-w-3xl">
        <h2 id="experience-heading" className="text-2xl font-semibold tracking-tight">
          Experience
        </h2>
        <div className="mt-6 space-y-10">
          {experience.map((item) => (
            <ExperienceEntry key={item.id} item={item} />
          ))}
        </div>
      </section>

      <section aria-labelledby="education-heading" className="mt-16 max-w-3xl">
        <h2 id="education-heading" className="text-2xl font-semibold tracking-tight">
          Education
        </h2>
        <div className="mt-6 space-y-10">
          {education.map((item) => (
            <EducationEntry key={item.id} item={item} />
          ))}
        </div>
      </section>

      <section aria-labelledby="skills-heading" className="mt-16 max-w-3xl">
        <h2 id="skills-heading" className="text-2xl font-semibold tracking-tight">
          Skills
        </h2>
        <p className="mt-2 text-sm text-muted">
          Grouped by use in academic projects and support work.
        </p>
        <div className="mt-6">
          <SkillList categories={skillCategories} />
        </div>
      </section>

      <section aria-labelledby="learning-heading" className="mt-16 max-w-3xl">
        <h2 id="learning-heading" className="text-2xl font-semibold tracking-tight">
          Currently learning
        </h2>
        <p className="mt-2 text-sm text-muted">
          Learning activities — not experience, training credentials, or certifications.
        </p>
        <div className="mt-6">
          <LearningList />
        </div>
      </section>
    </main>
  );
}
