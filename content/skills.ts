import type { SkillCategory } from "./types";

export const skillCategories: SkillCategory[] = [
  {
    id: "support",
    label: "Support and troubleshooting",
    summary: "Capabilities from OJT, coursework, and practice.",
    items: [
      {
        id: "user-assistance",
        name: "User assistance and system navigation",
        level: "practical-familiarity",
        evidenceNote: "OJT",
      },
      {
        id: "data-encoding",
        name: "Data encoding",
        level: "practical-familiarity",
        evidenceNote: "OJT",
      },
      {
        id: "pc-troubleshooting",
        name: "PC troubleshooting",
        level: "foundational",
        evidenceNote: "Coursework",
      },
      {
        id: "service-desk",
        name: "Service desk scenarios",
        level: "learning",
        evidenceNote: "Practice",
      },
    ],
  },
  {
    id: "web",
    label: "Web development",
    summary: "Used in MedicaOne, FoodHub, and SideScroll.",
    items: [
      { id: "js", name: "JavaScript", level: "used-in-completed-project", evidenceRef: "medicaone" },
      { id: "ts", name: "TypeScript", level: "used-in-completed-project", evidenceRef: "medicaone" },
      { id: "react", name: "React", level: "used-in-completed-project", evidenceRef: "medicaone" },
      { id: "next", name: "Next.js", level: "used-in-completed-project", evidenceRef: "medicaone" },
      { id: "angular", name: "Angular", level: "used-in-completed-project", evidenceRef: "foodhub" },
      { id: "html", name: "HTML", level: "used-in-completed-project" },
      { id: "css", name: "CSS", level: "used-in-completed-project" },
      {
        id: "tailwind",
        name: "Tailwind CSS",
        level: "used-in-completed-project",
        evidenceRef: "medicaone",
      },
    ],
  },
  {
    id: "backend",
    label: "Backend and databases",
    summary: "PHP/MySQL in FoodHub and SideScroll; Firestore in MedicaOne.",
    items: [
      { id: "php", name: "PHP", level: "used-in-completed-project", evidenceRef: "foodhub" },
      { id: "mysql", name: "MySQL", level: "used-in-completed-project", evidenceRef: "foodhub" },
      {
        id: "firestore",
        name: "Firebase Cloud Firestore",
        level: "used-in-completed-project",
        evidenceRef: "medicaone",
      },
      {
        id: "firebase-auth",
        name: "Firebase Auth",
        level: "used-in-completed-project",
        evidenceRef: "medicaone",
      },
      {
        id: "mongo",
        name: "MongoDB",
        level: "foundational",
        // evidenceNote: "Basic familiarity; not demonstrated in the featured projects.",
      },
      {
        id: "rest-api",
        name: "RESTful API",
        level: "used-in-completed-project",
        // evidenceNote: "Basic familiarity; not demonstrated in the featured projects.",
      },
      // {
      //   id: "crud-operations",
      //   name: "CRUD Operations",
      //   level: "used-in-completed-project",
      //   // evidenceNote: "Basic familiarity; not demonstrated in the featured projects.",
      // },
    ],
  },
  {
    id: "design",
    label: "Interface design",
    items: [
      {
        id: "figma",
        name: "Figma",
        level: "foundational",
        evidenceNote: "Basic familiarity with interface layout and design workflows.",
      },
      {
        id: "canva",
        name: "Canva",
        level: "foundational",
        evidenceNote: "Basic familiarity with visual composition and presentation design.",
      },
    ],
  },
  {
    id: "tools",
    label: "Development tools",
    summary: "Tools used while building and debugging project work.",
    items: [
      { id: "vscode", name: "Visual Studio Code", level: "practical-familiarity" },
      { id: "git", name: "Git", level: "practical-familiarity" },
      { id: "github", name: "GitHub", level: "practical-familiarity" },
      { id: "xampp", name: "XAMPP", level: "practical-familiarity" },
      { id: "postman", name: "Postman", level: "practical-familiarity" },
      { id: "devtools", name: "Browser Developer Tools", level: "practical-familiarity" },
    ],
  },
  {
    id: "workflow",
    label: "Development practices",
    items: [
      {
        id: "ai-assist",
        name: "AI-assisted coding and debugging",
        level: "practical-familiarity",
        evidenceRef: "sidescroll",
        evidenceNote: "Development practice used on SideScroll. Not a certification.",
      },
    ],
  },
];
