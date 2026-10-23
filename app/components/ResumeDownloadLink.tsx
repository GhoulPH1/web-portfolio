import type { ResumeAsset } from "@/content/types";

type Props = {
  resume: ResumeAsset;
  className?: string;
};

export function ResumeDownloadLink({ resume, className }: Props) {
  if (!resume.available || !resume.href) {
    return <span className={className}>Résumé PDF coming soon</span>;
  }

  return (
    <a
      href={resume.href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {resume.label}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
