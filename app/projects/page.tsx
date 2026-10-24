import type { Metadata } from "next";
import { FeaturedProject } from "../components/work/FeaturedProject";
import { ProjectIndexRow } from "../components/work/ProjectIndexRow";
import { BackLink } from "../components/ui/BackLink";
import { Hairline } from "../components/ui/Hairline";
import { Reveal } from "../components/ui/Reveal";
import { Section } from "../components/ui/Section";
import { SectionLabel } from "../components/ui/SectionLabel";
import { getAllProjects, getProjectBySlug } from "@/content/projects";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected projects: MedicaOne, FoodHub, and SideScroll.",
};

export default function ProjectsPage() {
  const medicaone = getProjectBySlug("medicaone");
  const others = getAllProjects().filter((p) => p.slug !== "medicaone");

  return (
    <main id="main">
      <Section className="section-cv">
        <Reveal>
          <BackLink href="/" label="Home" className="mb-10" />
        </Reveal>
        <Reveal index={1}>
          <SectionLabel index="01" label="Work" />
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-12">
          <Reveal index={2} className="md:col-span-7 md:col-start-5">
            <h1 className="text-h1">Selected work</h1>
          </Reveal>
        </div>

        <div className="mt-16 space-y-20">
          {medicaone ? (
            <FeaturedProject project={medicaone} index="01" />
          ) : null}
          <div>
            <Hairline draw />
            {others.map((project, i) => (
              <ProjectIndexRow
                key={project.id}
                project={project}
                index={String(i + 2).padStart(2, "0")}
                delayMs={i * 60}
              />
            ))}
            <Hairline draw />
          </div>
        </div>
      </Section>
    </main>
  );
}
