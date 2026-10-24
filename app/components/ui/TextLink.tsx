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
    ? "text-white decoration-accent-on-dark hover:text-accent-on-dark"
    : "text-ink decoration-rule hover:decoration-accent";

  const classes =
    `group inline-flex items-center gap-1.5 border-b border-current pb-0.5 font-[family-name:var(--font-outfit)] text-sm font-medium tracking-wide transition-colors duration-200 ${color} ${className}`.trim();

  const content = (
    <>
      <span>{children}</span>
      <span
        aria-hidden
        className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-focus-visible:translate-x-0.5"
      >
        {arrow}
      </span>
    </>
  );

  if (external || href.startsWith("mailto:") || href.startsWith("tel:") || href.endsWith(".pdf")) {
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
