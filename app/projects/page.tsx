import type { Metadata } from "next";
import { FeaturedProject } from "../components/work/FeaturedProject";
import { ProjectIndexRow } from "../components/work/ProjectIndexRow";
import { BackLink } from "../components/ui/BackLink";
import { Hairline } from "../components/ui/Hairline";
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
      <Section>
        <BackLink href="/" label="Home" className="mb-10" />
        <SectionLabel index="01" label="Work" />
        <div className="mt-10 grid gap-6 md:grid-cols-12">
          <h1 className="text-h1 md:col-span-7 md:col-start-5">Selected work</h1>
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
    </main>
  );
}
