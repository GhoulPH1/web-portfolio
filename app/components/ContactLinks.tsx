import { contact, gmailComposeUrl } from "@/content/site";
import { EmailIcon, GitHubIcon, PhoneIcon } from "./Icons";

type Props = {
  className?: string;
  showLabels?: boolean;
};

export function ContactLinks({ className = "", showLabels = true }: Props) {
  const github = contact.profiles.find((p) => p.label.toLowerCase() === "github");

  return (
    <ul className={`flex flex-wrap items-center gap-x-5 gap-y-3 text-sm ${className}`}>
      <li>
        <a
          href={gmailComposeUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-muted transition-colors hover:text-foreground"
        >
          <EmailIcon />
          {showLabels ? <span>{contact.email}</span> : null}
          <span className="sr-only">
            {showLabels
              ? " — compose email in Gmail (opens in a new tab)"
              : "Email Godric in Gmail (opens in a new tab)"}
          </span>
        </a>
      </li>
      {contact.phoneDisplay && contact.phoneTel ? (
        <li>
          <a
            href={`tel:${contact.phoneTel}`}
            className="inline-flex items-center gap-2 text-muted transition-colors hover:text-foreground"
          >
            <PhoneIcon />
            {showLabels ? (
              <span>{contact.phoneDisplay}</span>
            ) : (
              <span className="sr-only">Call {contact.phoneDisplay}</span>
            )}
          </a>
        </li>
      ) : null}
      {github ? (
        <li>
          <a
            href={github.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-muted transition-colors hover:text-foreground"
          >
            <GitHubIcon />
            {showLabels ? <span>GitHub</span> : null}
            <span className="sr-only">
              {showLabels ? " (opens in a new tab)" : "GitHub profile (opens in a new tab)"}
            </span>
          </a>
        </li>
      ) : null}
    </ul>
  );
}
