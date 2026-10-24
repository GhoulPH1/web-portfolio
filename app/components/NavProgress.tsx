"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * Pessimistic 1px route progress hairline.
 * Communicates: navigation is in flight (no splash / spinner).
 */
export function NavProgress() {
  const pathname = usePathname();
  const [state, setState] = useState<"idle" | "active" | "done">("idle");
  const previous = useRef(pathname);

  useEffect(() => {
    if (previous.current === pathname) return;
    previous.current = pathname;
    setState("active");
    const done = window.setTimeout(() => setState("done"), 280);
    const clear = window.setTimeout(() => setState("idle"), 480);
    return () => {
      window.clearTimeout(done);
      window.clearTimeout(clear);
    };
  }, [pathname]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest("a[href]") as HTMLAnchorElement | null;
      if (!anchor) return;
      if (anchor.target === "_blank" || anchor.hasAttribute("download")) return;
      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("mailto:")) return;
      try {
        const url = new URL(href, window.location.href);
        if (url.origin !== window.location.origin) return;
        if (
          url.pathname === window.location.pathname &&
          url.search === window.location.search
        ) {
          return;
        }
        setState("active");
      } catch {
        /* ignore */
      }
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  if (state === "idle") return null;

  return (
    <div
      className={`nav-progress ${state === "active" ? "is-active" : ""} ${
        state === "done" ? "is-done" : ""
      }`}
      aria-hidden
    />
  );
}
