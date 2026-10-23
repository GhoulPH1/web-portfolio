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
    summary: "Digital prescription management web app.",
    problem: "Academic project for digital prescription workflows in the browser.",
    intendedUsers: "",
    type: "academic",
    status: "completed",
    role: "Academic Capstone Project",
    contributions: [
      "Worked on prescription template creation and issuing screens.",
      "Worked on prescription and medication management views.",
      "Used Next.js, React, and Firebase (Auth + Firestore) for medication reminder and tracking flows.",
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
    challenges: [],
    outcomes: [],
    limitations: [
      "Academic project scope — not presented as a clinical production system.",
      "Screenshots and demos use synthetic or anonymized data only; no real patient information.",
      "Broader patient-administration screens exist in the product but are not the focus of this case study.",
    ],
    lessons: [],
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
    ],
    caseStudyPath: "/projects/medicaone",
    featured: true,
  },
  {
    id: "foodhub",
    slug: "foodhub",
    title: "FoodHub",
    summary: "Recipe management web app with CRUD.",
    problem: "Academic project: recipe app with create, read, update, and delete flows across Angular, PHP, and MySQL.",
    intendedUsers: "",
    type: "academic",
    status: "completed",
    role: "Academic Project",
    contributions: [
      "Implemented CRUD flows for recipe records across an Angular frontend and PHP/MySQL backend.",
      "Built a responsive interface for common recipe management tasks.",
      "Worked on frontend–backend integration and database persistence.",
    ],
    technologies: ["Angular", "PHP", "MySQL"],
    features: [
      "Create, read, update, and delete recipe records",
      "Responsive user interface for recipe management",
    ],
    challenges: [],
    outcomes: [],
    limitations: [],
    lessons: [],
    screenshots: [],
    links: [],
    caseStudyPath: "/projects/foodhub",
    featured: true,
  },
  {
    id: "sidescroll",
    slug: "sidescroll",
    title: "SideScroll",
    summary: "Blog web app with authentication and content management.",
    problem:
      "Academic project: blog-style app for content management, authentication, and frontend–backend integration.",
    intendedUsers: "",
    type: "academic",
    status: "completed",
    role: "Academic Project",
    contributions: [
      "Implemented CRUD for posts and content management features.",
      "Implemented authentication-related API logic for checking account credentials, validating passwords, and applying role-based access rules, including account verification and access control by user role.",
      "Customized and debugged AI-assisted code to meet project requirements.",
    ],
    technologies: ["Angular", "PHP", "MySQL"],
    features: [
      "Blog post CRUD and content management",
      "Authentication and access control: credential checks, password validation, and role-based access rules",
    ],
    challenges: [],
    outcomes: [],
    limitations: ["Academic learning project."],
    lessons: [],
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
