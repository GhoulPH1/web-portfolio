import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  external?: boolean;
  className?: string;
};

export function Button({
  href,
  children,
  variant = "primary",
  external = false,
  className = "",
}: Props) {
  const base =
    "inline-flex min-h-11 items-center justify-center px-5 py-2.5 text-label transition-colors duration-200";
  const styles =
    variant === "primary"
      ? "bg-ink text-bg hover:bg-accent"
      : "border border-ink text-ink hover:border-accent hover:text-accent";

  const classes = `${base} ${styles} ${className}`.trim();

  if (external || href.startsWith("mailto:") || href.endsWith(".pdf")) {
    return (
      <a
        href={href}
        className={classes}
        {...(href.endsWith(".pdf") || external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
