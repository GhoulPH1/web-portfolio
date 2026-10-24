import { contact, gmailComposeUrl, resume, rolesOpenTo, siteMeta } from "@/content/site";
import { Container } from "./ui/Container";
import { Hairline } from "./ui/Hairline";
import { TextLink } from "./ui/TextLink";

export function SiteFooter() {
  return (
    <footer className="bg-bg-dark text-white">
      <Container className="py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-[family-name:var(--font-outfit)] text-lg font-light tracking-tight">
              {siteMeta.siteName}
            </p>
            <p className="text-body mt-3 text-white/70">{rolesOpenTo}</p>
          </div>
          <div className="md:col-span-3">
            <p className="text-label text-accent-on-dark">Navigate</p>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <TextLink href="/projects" dark>
                  Work
                </TextLink>
              </li>
              <li>
                <TextLink href="/about-me" dark>
                  About
                </TextLink>
              </li>
              <li>
                <TextLink href="/#contact" dark>
                  Contact
                </TextLink>
              </li>
              {resume.available && resume.href ? (
                <li>
                  <TextLink href={resume.href} external dark>
                    Résumé
                  </TextLink>
                </li>
              ) : null}
            </ul>
          </div>
          <div className="md:col-span-4">
            <p className="text-label text-accent-on-dark">Contact</p>
            <ul className="mt-4 space-y-3 text-sm text-white/80">
              <li>
                <a
                  href={gmailComposeUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-accent-on-dark"
                >
                  {contact.email}
                </a>
              </li>
              {contact.phoneDisplay ? <li>{contact.phoneDisplay}</li> : null}
              {contact.locationDisplay ? <li>{contact.locationDisplay}</li> : null}
              {contact.profiles.map((profile) => (
                <li key={profile.href}>
                  <a
                    href={profile.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-accent-on-dark"
                  >
                    {profile.label} ↗
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Hairline dark className="mt-12" />

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-xs text-white/50">
          <p>© {siteMeta.siteName}</p>
          <a href="#main" className="text-label text-white/70 hover:text-accent-on-dark">
            Back to top ↑
          </a>
        </div>
      </Container>
    </footer>
  );
}
