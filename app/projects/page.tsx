import type { Metadata } from "next";
import { ProjectPreview } from "../components/ProjectPreview";
import { getAllProjects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Case studies for MedicaOne, FoodHub, and SideScroll — academic web projects.",
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <main id="main" className="mx-auto w-full max-w-5xl flex-1 px-5 py-14 sm:px-8 sm:py-20">
      <header className="max-w-2xl">
        <h1 className="text-4xl font-semibold tracking-tight">Projects</h1>
        <p className="mt-4 text-base leading-relaxed text-muted">
          MedicaOne, FoodHub, and SideScroll.
        </p>
      </header>
      <div className="mt-12">
        {projects.map((project) => (
          <ProjectPreview key={project.id} project={project} />
        ))}
      </div>
    </main>
  );
}
