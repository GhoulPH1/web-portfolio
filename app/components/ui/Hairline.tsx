"use client";

import { useEffect, useRef } from "react";
import { observeOnce } from "../motion/observer";

type Props = {
  dark?: boolean;
  className?: string;
  /** When true, draws scaleX on enter (communicates section boundary). */
  draw?: boolean;
};

export function Hairline({
  dark = false,
  className = "",
  draw = false,
}: Props) {
  const ref = useRef<HTMLHRElement>(null);

  useEffect(() => {
    if (!draw) return;
    const node = ref.current;
    if (!node) return;
    return observeOnce(node, () => {
      node.classList.add("is-visible");
      node.style.willChange = "transform";
      const clear = () => {
        node.style.willChange = "auto";
        node.removeEventListener("transitionend", clear);
      };
      node.addEventListener("transitionend", clear);
    });
  }, [draw]);

  return (
    <hr
      ref={ref}
      className={`hairline ${dark ? "hairline-dark" : ""} ${
        draw ? "motion-hairline" : ""
      } ${className}`.trim()}
    />
  );
}
