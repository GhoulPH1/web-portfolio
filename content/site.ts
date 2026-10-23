import type { ContactInfo, NavItem, ResumeAsset, SiteMetadata } from "./types";

export const siteMeta: SiteMetadata = {
  siteName: "Godric G. Ramelo",
  defaultTitle: "Godric G. Ramelo — BSIT Portfolio",
  titleTemplate: "%s · Godric G. Ramelo",
  defaultDescription:
    "BSIT undergraduate portfolio spanning web development, interface usability, and technical support. Projects, experience, and a downloadable résumé.",
  locale: "en",
};

export const contact: ContactInfo = {
  email: "godricramelo@gmail.com",
  phoneDisplay: "0927 179 0706",
  phoneTel: "+639271790706",
  locationDisplay: "Calapacuan, Subic, Zambales",
  profiles: [
    {
      label: "GitHub",
      href: "https://github.com/GoulPH1",
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

export const positioning =
  "BSIT undergraduate focused on web development, interface usability, and technical support — seeking an entry-level IT role.";

export const homeSummary =
  "Introductory experience through academic projects and on-the-job training with the City Government of Olongapo. Comfortable with web technologies, databases, and helping people use digital systems.";
