import Link from "next/link";
import { gmailComposeUrl, navItems, resume, siteMeta } from "@/content/site";
import { EmailIcon } from "./Icons";
import { ResumeDownloadLink } from "../components/ResumeDownloadLink";

export function SiteHeader() {
  return (
    <header className="border-b border-border bg-surface/90 backdrop-blur-sm">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-surface focus:px-3 focus:py-2 focus:text-sm"
      >
        Skip to main content
      </a>
      <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <Link
          href="/"
          className="font-semibold tracking-tight text-foreground hover:text-accent"
        >
          {siteMeta.siteName}
        </Link>
        <nav aria-label="Primary" className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-muted transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
          <ResumeDownloadLink resume={resume} className="text-muted hover:text-foreground" />
          <a
            href={gmailComposeUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-medium text-accent hover:text-accent-hover"
          >
            <EmailIcon />
            Email
            <span className="sr-only"> in Gmail (opens in a new tab)</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
