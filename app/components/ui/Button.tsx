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
      ? "border-0 bg-accent-on-dark text-[#0e0e0e] [@media(hover:hover)]:hover:bg-accent-deep [@media(hover:hover)]:hover:text-white focus-visible:bg-accent-deep focus-visible:text-white"
      : variant === "primary"
        ? "bg-ink text-bg [@media(hover:hover)]:hover:bg-accent focus-visible:bg-accent"
        : "border border-ink text-ink [@media(hover:hover)]:hover:border-accent [@media(hover:hover)]:hover:text-accent focus-visible:border-accent focus-visible:text-accent";

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
