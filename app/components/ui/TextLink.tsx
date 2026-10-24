import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpRightIcon,
} from "../Icons";

type Props = {
  href: string;
  children: ReactNode;
  external?: boolean;
  dark?: boolean;
  className?: string;
  /** Trailing glyph; defaults from external. Use "none" to omit. */
  trailing?: "auto" | "right" | "up-right" | "down" | "none";
};

export function TextLink({
  href,
  children,
  external = false,
  dark = false,
  className = "",
  trailing = "auto",
}: Props) {
  const color = dark ? "text-white hover:text-accent-on-dark" : "text-ink";

  const classes =
    `motion-underline group inline-flex items-center gap-1.5 pb-0.5 font-[family-name:var(--font-outfit)] text-sm font-medium tracking-wide transition-colors duration-[var(--dur-fast)] ease-[var(--ease-out)] ${color} ${className}`.trim();

  const kind =
    trailing === "auto" ? (external ? "up-right" : "right") : trailing;

  const TrailingIcon =
    kind === "up-right"
      ? ArrowUpRightIcon
      : kind === "down"
        ? ArrowDownIcon
        : kind === "right"
          ? ArrowRightIcon
          : null;

  const content = (
    <>
      <span>{children}</span>
      {TrailingIcon ? (
        <span
          aria-hidden
          className={`inline-flex transition-transform duration-[var(--dur-fast)] ease-[var(--ease-out)] ${
            kind === "down"
              ? "[@media(hover:hover)]:group-hover:translate-y-[var(--hover-nudge)] group-focus-visible:translate-y-[var(--hover-nudge)]"
              : "[@media(hover:hover)]:group-hover:translate-x-[var(--hover-nudge)] group-focus-visible:translate-x-[var(--hover-nudge)]"
          }`}
        >
          <TrailingIcon className="size-3.5" />
        </span>
      ) : null}
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
