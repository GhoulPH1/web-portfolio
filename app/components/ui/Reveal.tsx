"use client";

import {
  useEffect,
  useRef,
  useSyncExternalStore,
  type ReactNode,
} from "react";

type Props = {
  children: ReactNode;
  className?: string;
  delayMs?: number;
};

function subscribeReducedMotion(onStoreChange: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", onStoreChange);
  return () => mq.removeEventListener("change", onStoreChange);
}

function getReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function Reveal({ children, className = "", delayMs = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    () => true,
  );

  useEffect(() => {
    const node = ref.current;
    if (!node || reduceMotion) return;

    node.style.opacity = "0";
    node.style.transform = "translateY(12px)";
    node.style.transition = `opacity 280ms ease-out ${delayMs}ms, transform 280ms ease-out ${delayMs}ms`;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          node.style.opacity = "1";
          node.style.transform = "translateY(0)";
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [reduceMotion, delayMs]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
