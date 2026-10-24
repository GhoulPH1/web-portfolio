"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { resume } from "@/content/site";
import { Container } from "./ui/Container";

const links = [
  { href: "/projects", label: "Work", homeHash: "#work" },
  { href: "/about-me", label: "About", homeHash: "#about" },
  { href: "/#contact", label: "Contact", homeHash: "#contact" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [observedHash, setObservedHash] = useState<string>("");
  const menuId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const activeHash = pathname === "/" ? observedHash : "";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (pathname !== "/") return;

    const sections = ["work", "about", "contact"]
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setObservedHash(`#${visible.target.id}`);
      },
      { rootMargin: "-30% 0px -50% 0px", threshold: [0.1, 0.35, 0.6] },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const panel = panelRef.current;
    const focusables = panel?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled])',
    );
    focusables?.[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        triggerRef.current?.focus();
        return;
      }
      if (e.key !== "Tab" || !focusables || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const isActive = (href: string, homeHash?: string) => {
    if (pathname === "/" && homeHash) return activeHash === homeHash;
    if (href === "/projects") return pathname.startsWith("/projects");
    if (href === "/about-me") return pathname.startsWith("/about-me");
    return false;
  };

  const linkClass = (active: boolean) =>
    `text-label relative pb-1 text-ink-muted transition-colors duration-200 hover:text-ink after:absolute after:bottom-0 after:left-0 after:h-px after:bg-accent after:transition-[width] after:duration-200 after:ease-out ${
      active ? "text-ink after:w-full" : "after:w-0 hover:after:w-full focus-visible:after:w-full"
    }`;

  return (
    <header
      className={`sticky top-0 z-40 bg-bg transition-[border-color] duration-200 ${
        scrolled ? "border-b border-rule" : "border-b border-transparent"
      }`}
    >
      <Container className="flex min-h-14 items-center justify-between gap-4 py-3">
        <Link
          href="/"
          className="font-[family-name:var(--font-outfit)] text-sm font-medium tracking-tight text-ink"
        >
          Godric Ramelo
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {links.map((item) => {
            const href =
              pathname === "/" && item.homeHash ? item.homeHash : item.href;
            const active = isActive(item.href, item.homeHash);
            return (
              <Link
                key={item.label}
                href={href}
                className={linkClass(active)}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
          {resume.available && resume.href ? (
            <a
              href={resume.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-label text-ink-muted transition-colors hover:text-ink"
            >
              Résumé ↗
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          ) : null}
        </nav>

        <button
          ref={triggerRef}
          type="button"
          className="text-label min-h-11 min-w-11 text-ink md:hidden"
          aria-expanded={menuOpen}
          aria-controls={menuId}
          onClick={() => setMenuOpen((o) => !o)}
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </Container>

      {menuOpen ? (
        <div
          id={menuId}
          ref={panelRef}
          className="fixed inset-0 z-50 flex flex-col bg-bg md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
        >
          <Container className="flex min-h-14 items-center justify-between py-3">
            <span className="font-[family-name:var(--font-outfit)] text-sm font-medium">
              Godric Ramelo
            </span>
            <button
              type="button"
              className="text-label min-h-11 min-w-11"
              onClick={() => {
                setMenuOpen(false);
                triggerRef.current?.focus();
              }}
            >
              Close
            </button>
          </Container>
          <nav aria-label="Mobile" className="flex flex-1 flex-col px-5">
            {links.map((item, i) => {
              const href =
                pathname === "/" && item.homeHash ? item.homeHash : item.href;
              return (
                <Link
                  key={item.label}
                  href={href}
                  className="border-b border-rule py-6 font-[family-name:var(--font-outfit)] text-3xl font-light tracking-tight"
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="text-ink-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>{" "}
                  {item.label}
                </Link>
              );
            })}
            {resume.available && resume.href ? (
              <a
                href={resume.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto border-t border-rule py-8 text-label"
                onClick={() => setMenuOpen(false)}
              >
                Résumé ↗
              </a>
            ) : null}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
