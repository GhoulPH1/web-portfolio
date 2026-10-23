import type { SkillCategory } from "./types";

export const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    label: "Programming languages",
    items: [
      {
        id: "js",
        name: "JavaScript",
        level: "used-in-completed-project",
        evidenceNote: "Used across web projects",
      },
      {
        id: "ts",
        name: "TypeScript",
        level: "practical-familiarity",
        evidenceRef: "medicaone",
        evidenceNote: "Used where applicable in MedicaOne",
      },
      {
        id: "php",
        name: "PHP",
        level: "used-in-completed-project",
        evidenceRef: "foodhub",
        evidenceNote: "FoodHub and SideScroll backends",
      },
    ],
  },
  {
    id: "web",
    label: "Web technologies",
    items: [
      { id: "html", name: "HTML", level: "foundational" },
      { id: "css", name: "CSS", level: "foundational" },
    ],
  },
  {
    id: "frameworks",
    label: "Frameworks & styling",
    items: [
      {
        id: "angular",
        name: "Angular",
        level: "used-in-completed-project",
        evidenceRef: "foodhub",
      },
      {
        id: "next",
        name: "Next.js",
        level: "used-in-completed-project",
        evidenceRef: "medicaone",
      },
      {
        id: "react",
        name: "React",
        level: "used-in-completed-project",
        evidenceRef: "medicaone",
      },
      {
        id: "tailwind",
        name: "Tailwind CSS",
        level: "practical-familiarity",
        evidenceRef: "medicaone",
      },
    ],
  },
  {
    id: "databases",
    label: "Databases",
    items: [
      {
        id: "mysql",
        name: "MySQL",
        level: "used-in-completed-project",
        evidenceRef: "foodhub",
      },
      {
        id: "firestore",
        name: "Firebase Cloud Firestore",
        level: "used-in-completed-project",
        evidenceRef: "medicaone",
      },
      {
        id: "mongo",
        name: "MongoDB",
        level: "foundational",
        evidenceNote: "Basic familiarity",
      },
    ],
  },
  {
    id: "tools",
    label: "Development tools",
    items: [
      { id: "vscode", name: "Visual Studio Code", level: "practical-familiarity" },
      { id: "git", name: "Git", level: "practical-familiarity" },
      { id: "github", name: "GitHub", level: "practical-familiarity" },
      { id: "xampp", name: "XAMPP", level: "practical-familiarity" },
      { id: "devtools", name: "Browser Developer Tools", level: "practical-familiarity" },
    ],
  },
  {
    id: "design",
    label: "UI / UX & design",
    items: [
      { id: "figma", name: "Figma", level: "foundational" },
      { id: "canva", name: "Canva", level: "foundational" },
    ],
  },
  {
    id: "workflow",
    label: "Development workflow",
    items: [
      {
        id: "ai-assist",
        name: "AI-assisted coding & debugging",
        level: "practical-familiarity",
        evidenceRef: "sidescroll",
        evidenceNote: "Used as learning and delivery support; not a certification",
      },
    ],
  },
];

export const skillLevelLabel: Record<string, string> = {
  foundational: "Foundational",
  "practical-familiarity": "Practical familiarity",
  "used-in-completed-project": "Used in a completed project",
  learning: "Currently learning",
};
