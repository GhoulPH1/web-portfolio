import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  external?: boolean;
  dark?: boolean;
  className?: string;
};

export function TextLink({
  href,
  children,
  external = false,
  dark = false,
  className = "",
}: Props) {
  const arrow = external ? "↗" : "→";
  const color = dark
    ? "text-white hover:text-accent-on-dark"
    : "text-ink";

  const classes =
    `motion-underline group inline-flex items-center gap-1.5 pb-0.5 font-[family-name:var(--font-outfit)] text-sm font-medium tracking-wide transition-colors duration-[var(--dur-fast)] ease-[var(--ease-out)] ${color} ${className}`.trim();

  const content = (
    <>
      <span>{children}</span>
      <span
        aria-hidden
        className="inline-block transition-transform duration-[var(--dur-fast)] ease-[var(--ease-out)] [@media(hover:hover)]:group-hover:translate-x-[var(--hover-nudge)] group-focus-visible:translate-x-[var(--hover-nudge)]"
      >
        {arrow}
      </span>
    </>
  );

  if (
    external ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.endsWith(".pdf")
  ) {
    return (
      <a
        href={href}
        className={classes}
        {...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : href.endsWith(".pdf")
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
      >
        {content}
        {(external || href.endsWith(".pdf")) && (
          <span className="sr-only"> (opens in a new tab)</span>
        )}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
