import type { ContactInfo, NavItem, ResumeAsset, SiteMetadata } from "./types";

export const siteMeta: SiteMetadata = {
  siteName: "Godric G. Ramelo",
  defaultTitle: "Godric G. Ramelo — Portfolio",
  titleTemplate: "%s · Godric G. Ramelo",
  defaultDescription:
    "Godric G. Ramelo — Currently pursuing a BSIT degree at Gordon College. Academic projects and contact.",
  locale: "en",
};

export const contact: ContactInfo = {
  email: "godricramelo@gmail.com",
  phoneDisplay: "+63 927 179 0706",
  phoneTel: "+639271790706",
  locationDisplay: "Calapacuan, Subic, Zambales",
  profiles: [
    {
      label: "GitHub",
      href: "https://github.com/GoulPH1",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/godric-ramelo-646665444/",
    },
  ],
};

/** Gmail web compose — reliable on devices without a default mail client */
export function gmailComposeUrl(subject?: string, body?: string): string {
  const params = new URLSearchParams({
    view: "cm",
    fs: "1",
    to: contact.email,
  });
  if (subject) params.set("su", subject);
  if (body) params.set("body", body);
  return `https://mail.google.com/mail/?${params.toString()}`;
}

export const resume: ResumeAsset = {
  href: "/assets/Godric_Ramelo-Resume.pdf",
  label: "Download résumé (PDF)",
  available: true,
};

export const navItems: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about-me", label: "About" },
];

export const homeGreeting = "Hi, I am";

/** Owner-approved homepage introduction */
export const homeIntroduction = [
  "Currently pursuing an IT degree, turning practical problems into useful technology solutions.",
  "Developing practical skills to deliver IT solutions that solve real-world problems and improve everyday processes.",
];

export const rolesOpenTo =
  "Open to opportunities in IT";

export const aboutCredentials =
  "Currently pursuing a Bachelor of Science in Information Technology at Gordon College.";
  

export const aboutDirection =
  "Developing my technical skills through continuous learning and practical experience, with the goal of applying IT to solve real-world problems.";
