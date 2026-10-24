import Link from "next/link";

type Props = {
  href?: string;
  label?: string;
  className?: string;
};

export function BackLink({
  href = "/",
  label = "Home",
  className = "",
}: Props) {
  return (
    <div className={className}>
      <Link
        href={href}
        className="group inline-flex items-center gap-3 text-left"
        aria-label={label}
      >
        <span
          aria-hidden
          className="inline-flex size-9 shrink-0 items-center justify-center border border-rule text-ink transition-colors duration-200 group-hover:border-accent group-hover:bg-accent group-hover:text-bg"
        >
          <svg
            viewBox="0 0 16 16"
            className="size-3.5 transition-transform duration-200 group-hover:-translate-x-0.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10 3 5 8l5 5" />
          </svg>
        </span>
        <span className="text-label text-ink-muted transition-colors duration-200 group-hover:text-ink">
          {label}
        </span>
      </Link>
    </div>
  );
}
