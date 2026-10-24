import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "onDark";
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
    "inline-flex min-h-11 items-center justify-center px-5 py-2.5 text-label transition-[color,background-color,border-color,transform,opacity] duration-[var(--dur-fast)] ease-[var(--ease-out)] active:translate-y-px active:opacity-85";
  const styles =
    variant === "onDark"
      ? "border border-transparent bg-btn-on-dark text-btn-on-dark-text [@media(hover:hover)]:hover:bg-btn-on-dark-hover [@media(hover:hover)]:hover:text-btn-text focus-visible:bg-btn-on-dark-hover focus-visible:text-btn-text"
      : variant === "primary"
        ? "border border-btn-edge bg-btn text-btn-text [@media(hover:hover)]:hover:border-btn-hover [@media(hover:hover)]:hover:bg-btn-hover focus-visible:border-btn-hover focus-visible:bg-btn-hover"
        : "border border-btn bg-btn-surface text-btn [@media(hover:hover)]:hover:border-btn-hover [@media(hover:hover)]:hover:text-btn-hover focus-visible:border-btn-hover focus-visible:text-btn-hover";

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
