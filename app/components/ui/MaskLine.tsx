"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { observeOnce } from "../motion/observer";

type Props = {
  /** Full readable string for assistive tech. */
  text: string;
  /** Pre-split lines or words (build-time markup). */
  lines: string[];
  className?: string;
  lineClassName?: string;
};

/**
 * Line/word mask reveal for large display text only.
 * Full string stays available via aria-label; visual splits are aria-hidden.
 */
export function MaskLine({
  text,
  lines,
  className = "",
  lineClassName = "",
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    return observeOnce(node, () => {
      node.classList.add("is-visible");
      node.querySelectorAll(".motion-mask-line").forEach((line) => {
        line.classList.add("is-visible");
      });
    });
  }, []);

  return (
    <span
      ref={ref}
      className={`inline-block ${className}`.trim()}
      aria-label={text}
    >
      <span aria-hidden="true">
        {lines.map((line, i) => (
          <span
            key={`${line}-${i}`}
            className={`motion-mask-line ${lineClassName}`.trim()}
            style={
              {
                ["--stagger-index" as string]: Math.min(i, 5),
              } as CSSProperties
            }
          >
            <span>{line}</span>
            {i < lines.length - 1 ? " " : null}
          </span>
        ))}
      </span>
    </span>
  );
}
