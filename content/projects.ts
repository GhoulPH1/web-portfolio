import type { Project } from "./types";

const medicaShot = (file: string, alt: string, width: number, height: number, caption?: string) => ({
  src: `/assets/MedicaOne Screenshots/${file}`,
  alt,
  caption,
  width,
  height,
});

export const projects: Project[] = [
  {
    id: "medicaone",
    slug: "medicaone",
    title: "MedicaOne",
    summary:
      "A digital prescription management platform covering prescription template creation and issuing, prescription and medication management, and medication reminders and tracking.",
    problem:
      "Paper-based and fragmented prescription workflows make it harder to issue, review, and follow up on medications consistently. MedicaOne explores a web-based approach to those prescription-centered tasks.",
    intendedUsers:
      "Clinic staff and clinicians who create templates, issue digital prescriptions, manage medication records, and support reminder-oriented follow-up.",
    type: "academic",
    status: "completed",
    role: "Developer (academic / project work)",
    contributions: [
      "Built prescription-focused workflows with Next.js, React, and Firebase-backed data.",
      "Implemented interfaces for template creation, issuing prescriptions, and reviewing prescription/medication records.",
      "Explored medication reminder and tracking flows alongside cloud persistence patterns.",
    ],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Firebase Auth",
      "Cloud Firestore",
      "Tailwind CSS",
    ],
    features: [
      "Prescription template creation and digital prescription issuing",
      "Prescription and medication management",
      "Medication reminders and tracking",
    ],
    challenges: [
      "Keeping patient-facing and staff-facing flows understandable without overloading the interface.",
      "Structuring Firestore-backed records so prescription data stayed consistent across create, issue, and review steps.",
      "Balancing academic scope with a usable end-to-end prescription path.",
    ],
    outcomes: [],
    limitations: [
      "Academic project scope — not a production clinical system claim.",
      "Screenshots and demos use synthetic or anonymized data only; no real patient information.",
      "Broader patient-administration screens exist in the product but are not the focus of this case study.",
    ],
    lessons: [
      "Prescription workflows need clear status and review steps more than extra features.",
      "Cloud-backed forms benefit from explicit validation and predictable data shapes.",
      "Case-study storytelling works better when scoped to a few proven capabilities.",
    ],
    screenshots: [
      medicaShot(
        "Template builder.png",
        "MedicaOne template builder for creating reusable prescription templates",
        1340,
        678,
        "Template builder",
      ),
      medicaShot(
        "Issue Prescription.png",
        "MedicaOne screen for issuing a digital prescription",
        1341,
        681,
        "Issue prescription",
      ),
      medicaShot(
        "save prescription modal.png",
        "Confirmation modal when saving a digital prescription",
        1355,
        680,
        "Save prescription confirmation",
      ),
      medicaShot(
        "Prescription Management.png",
        "Prescription management view for reviewing and organizing prescriptions",
        1342,
        678,
        "Prescription management",
      ),
      medicaShot(
        "Prescription Overview.png",
        "Overview of prescriptions and related medication details",
        1339,
        676,
        "Prescription overview",
      ),
      medicaShot(
        "Landing page.png",
        "MedicaOne public landing page introducing digital prescription management",
        1347,
        684,
        "Landing page",
      ),
    ],
    links: [
      {
        label: "Live site",
        href: "https://medica-one.site",
        kind: "live",
      },
      {
        label: "GitHub repository (private)",
        href: "https://github.com/GoulPH1/medix1-app-gh-gc",
        kind: "repo",
      },
    ],
    caseStudyPath: "/projects/medicaone",
    featured: true,
  },
  {
    id: "foodhub",
    slug: "foodhub",
    title: "FoodHub",
    summary:
      "A web-based recipe management application with CRUD functionality and a responsive interface, built with Angular, PHP, and MySQL.",
    problem:
      "Needed a full-stack academic project to practice structuring recipes, forms, and database-backed content in a browser app.",
    intendedUsers: "Users who browse, create, and manage recipe records in a web interface.",
    type: "academic",
    status: "completed",
    role: "Developer (academic project)",
    contributions: [
      "Developed CRUD flows for recipe records across Angular frontend and PHP/MySQL backend.",
      "Built a responsive interface for common recipe management tasks.",
      "Practiced frontend–backend integration and database persistence.",
    ],
    technologies: ["Angular", "PHP", "MySQL"],
    features: [
      "Create, read, update, and delete recipe records",
      "Responsive user interface for recipe management",
    ],
    challenges: [
      "Keeping frontend forms aligned with PHP endpoints and MySQL schema.",
      "Debugging cross-layer issues between Angular views and backend responses.",
    ],
    outcomes: [],
    limitations: [
      "Advanced auth/access-control claims are omitted until separately verified.",
    ],
    lessons: [
      "Full-stack CRUD is clearer when API contracts stay small and explicit.",
      "Responsive layout decisions early reduce rework on forms and lists.",
    ],
    screenshots: [],
    links: [],
    caseStudyPath: "/projects/foodhub",
    featured: true,
  },
  {
    id: "sidescroll",
    slug: "sidescroll",
    title: "SideScroll",
    summary:
      "A simple blog web application with CRUD operations, authentication, and content management, built with Angular, PHP, and MySQL.",
    problem:
      "Needed a blog-style project to practice content management, authentication basics, and frontend–backend integration.",
    intendedUsers: "Authors and readers interacting with blog posts in a simple content workflow.",
    type: "academic",
    status: "completed",
    role: "Developer (academic project)",
    contributions: [
      "Implemented CRUD for posts and content management features.",
      "Added authentication-related flows as part of the learning project.",
      "Customized and debugged AI-assisted code to meet project requirements.",
    ],
    technologies: ["Angular", "PHP", "MySQL"],
    features: [
      "Blog post CRUD and content management",
      "Authentication-related flows",
    ],
    challenges: [
      "Adapting AI-assisted snippets so they matched the actual project requirements.",
      "Understanding how authentication state connected to content actions.",
    ],
    outcomes: [],
    limitations: [
      "Scope remained an academic learning project rather than a production blog platform.",
    ],
    lessons: [
      "AI-assisted code still needs careful reading, debugging, and ownership.",
      "Auth and content features are easier to reason about when responsibilities are separated.",
    ],
    screenshots: [],
    links: [],
    caseStudyPath: "/projects/sidescroll",
    featured: true,
  },
];

export function getAllProjects(): Project[] {
  return projects;
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}
