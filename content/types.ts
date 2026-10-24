/** Evidence-linked skill proficiency — never percentages */
export type SkillLevel =
  | "foundational"
  | "practical-familiarity"
  | "used-in-completed-project"
  | "learning";

export type ProjectType =
  | "academic"
  | "personal"
  | "internship-related"
  | "other";

export type ProjectStatus =
  | "completed"
  | "in-progress"
  | "prototype"
  | "archived";

/** Learning list statuses — Planned must stay distinct from in-progress work */
export type LearningStatus = "in-progress" | "relearning" | "planned";

export interface ProjectScreenshot {
  src: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
}

export interface ProjectLink {
  label: string;
  href: string;
  kind: "repo" | "live" | "other";
}

export interface Project {
  id: string;
  slug: "medicaone" | "foodhub" | "sidescroll" | (string & {});
  title: string;
  summary: string;
  problem: string;
  intendedUsers: string;
  type: ProjectType;
  status: ProjectStatus;
  role: string;
  contributions: string[];
  technologies: string[];
  features: string[];
  challenges: string[];
  outcomes: string[];
  limitations: string[];
  lessons: string[];
  screenshots: ProjectScreenshot[];
  links: ProjectLink[];
  caseStudyPath: string;
  featured: boolean;
}

export interface ExperienceItem {
  id: string;
  organization: string;
  location: string;
  title: string;
  employmentType: string;
  start: string;
  end: string;
  responsibilities: string[];
}

export interface EducationItem {
  id: string;
  institution: string;
  location: string;
  credential: string;
  /** Public status label, e.g. "Currently pursuing" — never "undergraduate" */
  statusLabel: string;
  coursework: string[];
  exposure:string[];
  honors: string[];
}

export interface SkillItem {
  id: string;
  name: string;
  level: SkillLevel;
  evidenceRef?: string;
  evidenceNote?: string;
}

export interface SkillCategory {
  id: string;
  label: string;
  summary?: string;
  items: SkillItem[];
}

export interface LearningItem {
  id: string;
  topic: string;
  status: LearningStatus;
  relatedActivity?: string;
  updatedAt?: string;
}

export interface ContactInfo {
  email: string;
  phoneDisplay?: string;
  phoneTel?: string;
  locationDisplay?: string;
  profiles: { label: string; href: string }[];
}

export interface ResumeAsset {
  href?: string;
  label: string;
  available: boolean;
}

export interface SiteMetadata {
  siteName: string;
  defaultTitle: string;
  titleTemplate: string;
  defaultDescription: string;
  locale: string;
  metadataBase?: string;
  ogImagePath?: string;
}

export interface NavItem {
  href: string;
  label: string;
}
