"use client";

import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  type CSSProperties,
  type ReactElement,
  type ReactNode,
} from "react";
import { observeOnce } from "../motion/observer";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger index within a group (0–5). Extra siblings share the last step. */
  index?: number;
  as?: "div" | "span" | "li" | "article" | "section";
};

const MAX_STAGGER = 5;

export function Reveal({
  children,
  className = "",
  index = 0,
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const staggerIndex = Math.min(Math.max(index, 0), MAX_STAGGER);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const markVisible = () => {
      node.classList.add("is-visible");
      node.style.willChange = "opacity, transform";
      const clear = () => {
        node.style.willChange = "auto";
        node.removeEventListener("transitionend", clear);
      };
      node.addEventListener("transitionend", clear);
    };

    // Above-the-fold / already intersecting: still use observer (fires sync-ish).
    return observeOnce(node, markVisible);
  }, []);

  return (
    <Tag
      ref={ref as never}
      className={`motion-reveal ${className}`.trim()}
      style={{ ["--stagger-index" as string]: staggerIndex } as CSSProperties}
    >
      {children}
    </Tag>
  );
}

type RevealGroupProps = {
  children: ReactNode;
  className?: string;
};

/** Staggers direct Reveal children (or clones elements with an index prop). */
export function RevealGroup({ children, className = "" }: RevealGroupProps) {
  return (
    <div className={className}>
      {Children.map(children, (child, i) => {
        if (!isValidElement(child)) return child;
        const el = child as ReactElement<{ index?: number }>;
        if (el.type === Reveal) {
          return cloneElement(el, { index: el.props.index ?? i });
        }
        return (
          <Reveal key={el.key ?? i} index={i}>
            {child}
          </Reveal>
        );
      })}
    </div>
  );
}
