"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useEffect,
  useId,
  useRef,
  useState,
  type FocusEvent,
} from "react";
import { getAllProjects } from "@/content/projects";
import { contact, gmailComposeUrl, resume } from "@/content/site";
import { Container } from "./ui/Container";
import { ThemeToggle } from "./ui/ThemeToggle";

type NavKey = "work" | "about" | "contact";

type SubLink = {
  label: string;
  href: string;
  description?: string;
  index?: string;
  external?: boolean;
};

type NavItem = {
  key: NavKey;
  label: string;
  href: string;
  homeHash: string;
  panelLabel: string;
  links: SubLink[];
};

const projects = getAllProjects();

const navItems: NavItem[] = [
  {
    key: "work",
    label: "Work",
    href: "/projects",
    homeHash: "#work",
    panelLabel: "Selected work",
    links: [
      {
        label: "All work",
        href: "/projects",
        description: "Browse selected projects",
        index: "00",
      },
      ...projects.map((project, i) => ({
        label: project.title,
        href: project.caseStudyPath,
        description: project.summary,
        index: String(i + 1).padStart(2, "0"),
      })),
    ],
  },
  {
    key: "about",
    label: "About",
    href: "/about-me",
    homeHash: "#about",
    panelLabel: "Profile",
    links: [
      {
        label: "Full profile",
        href: "/about-me",
        description: "Overview and direction",
        index: "01",
      },
      {
        label: "Education",
        href: "/about-me#education",
        description: "Credential and coursework",
        index: "02",
      },
      {
        label: "Experience",
        href: "/about-me#experience",
        description: "Internship responsibilities",
        index: "03",
      },
      {
        label: "Skills",
        href: "/about-me#skills",
        description: "Tools and practical familiarity",
        index: "04",
      },
      {
        label: "Currently learning",
        href: "/about-me#learning",
        description: "In progress and planned study",
        index: "05",
      },
    ],
  },
  {
    key: "contact",
    label: "Contact",
    href: "/#contact",
    homeHash: "#contact",
    panelLabel: "Get in touch",
    links: [
      {
        label: "Email",
        href: gmailComposeUrl(),
        description: contact.email,
        index: "01",
        external: true,
      },
      ...contact.profiles.map((profile, i) => ({
        label: profile.label,
        href: profile.href,
        description: "Opens in a new tab",
        index: String(i + 2).padStart(2, "0"),
        external: true,
      })),
      ...(resume.available && resume.href
        ? [
            {
              label: "Résumé",
              href: resume.href,
              description: "PDF download",
              index: String(contact.profiles.length + 2).padStart(2, "0"),
              external: true,
            },
          ]
        : []),
    ],
  },
];

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

function SubmenuLink({
  item,
  onNavigate,
}: {
  item: SubLink;
  onNavigate?: (href: string, external?: boolean) => void;
}) {
  const classes =
    "group grid grid-cols-[2.5rem_1fr_auto] items-start gap-3 border-t border-rule py-4 first:border-t-0 md:grid-cols-[3rem_1fr_auto] md:gap-5 md:py-5";

  const content = (
    <>
      <span className="text-label pt-1 text-ink-muted">{item.index ?? "—"}</span>
      <span className="min-w-0">
        <span className="block font-[family-name:var(--font-outfit)] text-base font-medium tracking-tight text-ink transition-colors duration-200 group-hover:text-accent md:text-lg">
          {item.label}
        </span>
        {item.description ? (
          <span className="mt-1 block text-sm text-ink-muted">{item.description}</span>
        ) : null}
      </span>
      <span
        aria-hidden
        className="pt-1 text-ink transition-transform duration-200 group-hover:translate-x-0.5"
      >
        {item.external ? "↗" : "→"}
      </span>
    </>
  );

  if (item.external) {
    return (
      <a
        href={item.href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => onNavigate?.(item.href, true)}
      >
        {content}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }

  return (
    <Link
      href={item.href}
      className={classes}
      onClick={() => onNavigate?.(item.href, false)}
    >
      {content}
    </Link>
  );
}

function isSamePageSectionNav(href: string, pathname: string) {
  if (href.startsWith("#")) return true;
  if (pathname === "/" && /^\/#(work|about|contact)$/.test(href)) return true;
  if (pathname.startsWith("/about-me") && href.startsWith("/about-me#")) {
    return true;
  }
  return false;
}

function waitForScrollSettle(onSettled: () => void) {
  let settled = false;
  let idleTimer: ReturnType<typeof setTimeout> | null = null;

  const finish = () => {
    if (settled) return;
    settled = true;
    if (idleTimer) clearTimeout(idleTimer);
    window.removeEventListener("scrollend", finish);
    window.removeEventListener("scroll", onScroll);
    clearTimeout(fallback);
    onSettled();
  };

  const onScroll = () => {
    if (idleTimer) clearTimeout(idleTimer);
    idleTimer = setTimeout(finish, 140);
  };

  const fallback = setTimeout(finish, 900);

  requestAnimationFrame(() => {
    window.addEventListener("scrollend", finish, { once: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    idleTimer = setTimeout(finish, 160);
  });
}

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [flyout, setFlyout] = useState<NavKey | null>(null);
  const [mobileSection, setMobileSection] = useState<NavKey | null>(null);
  const [observedHash, setObservedHash] = useState<string>("");
  const [brandProgress, setBrandProgress] = useState(pathname === "/" ? 0 : 1);
  const menuId = useId();
  const panelId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const navRegionRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closedByNavRef = useRef(false);
  const brandProgressRef = useRef(brandProgress);
  const activeHash = pathname === "/" ? observedHash : "";
  const isHome = pathname === "/";
  const activeFlyout = navItems.find((item) => item.key === flyout) ?? null;

  const clearCloseTimer = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const openFlyout = (key: NavKey, fromPointer = true) => {
    if (fromPointer && closedByNavRef.current) return;
    clearCloseTimer();
    setFlyout(key);
  };

  const scheduleCloseFlyout = () => {
    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => setFlyout(null), 220);
  };

  const closeFlyout = () => {
    clearCloseTimer();
    setFlyout(null);
  };

  const lockClosedUntilPointerExit = () => {
    closedByNavRef.current = true;
  };

  const handleNavIntent = (href: string, external = false) => {
    lockClosedUntilPointerExit();

    if (external || !isSamePageSectionNav(href, pathname)) {
      closeFlyout();
      return;
    }

    waitForScrollSettle(() => {
      closeFlyout();
    });
  };

  const handleNavRegionMouseLeave = () => {
    scheduleCloseFlyout();
    closedByNavRef.current = false;
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isHome) {
      setBrandProgress(1);
      brandProgressRef.current = 1;
      return;
    }

    let frame = 0;

    const update = () => {
      const intro = document.getElementById("intro");
      if (!intro) {
        setBrandProgress(1);
        brandProgressRef.current = 1;
        return;
      }

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const rect = intro.getBoundingClientRect();
      const range = Math.max(rect.height * 0.55, 1);
      const next = clamp01(-rect.top / range);

      if (reduceMotion) {
        const snapped = next >= 0.5 ? 1 : 0;
        if (brandProgressRef.current !== snapped) {
          brandProgressRef.current = snapped;
          setBrandProgress(snapped);
        }
        return;
      }

      if (Math.abs(brandProgressRef.current - next) > 0.01) {
        brandProgressRef.current = next;
        setBrandProgress(next);
      } else if (next === 0 || next === 1) {
        brandProgressRef.current = next;
        setBrandProgress(next);
      }
    };

    const onScrollOrResize = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [isHome]);

  useEffect(() => {
    if (pathname !== "/") {
      setObservedHash("");
      return;
    }

    const intro = document.getElementById("intro");
    const sections = ["work", "about", "contact"]
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (sections.length === 0) return;

    const ratios = new Map<string, number>();

    const introIsDominant = () => {
      if (!intro) return window.scrollY < 48;
      const rect = intro.getBoundingClientRect();
      return rect.top >= -96 && rect.bottom > window.innerHeight * 0.55;
    };

    const syncUrlHash = (hash: string) => {
      if (hash) {
        if (window.location.hash === hash) return;
        window.history.replaceState(null, "", hash);
        return;
      }

      if (!window.location.hash) return;
      window.history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search || "/",
      );
    };

    const updateActive = () => {
      if (introIsDominant()) {
        setObservedHash("");
        syncUrlHash("");
        return;
      }

      let bestId = "";
      let bestRatio = 0;
      for (const [id, ratio] of ratios) {
        if (ratio > bestRatio) {
          bestRatio = ratio;
          bestId = id;
        }
      }

      const nextHash = bestId && bestRatio > 0 ? `#${bestId}` : "";
      setObservedHash(nextHash);
      syncUrlHash(nextHash);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(
            entry.target.id,
            entry.isIntersecting ? entry.intersectionRatio : 0,
          );
        }
        updateActive();
      },
      { rootMargin: "-30% 0px -50% 0px", threshold: [0, 0.1, 0.35, 0.6, 1] },
    );

    sections.forEach((s) => observer.observe(s));
    window.addEventListener("scroll", updateActive, { passive: true });
    updateActive();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateActive);
    };
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
        setMobileSection(null);
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

  useEffect(() => {
    if (!flyout) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeFlyout();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [flyout]);

  useEffect(() => () => clearCloseTimer(), []);

  const handleNavBlur = (event: FocusEvent<HTMLElement>) => {
    const next = event.relatedTarget as Node | null;
    if (next && navRegionRef.current?.contains(next)) return;
    scheduleCloseFlyout();
  };

  const isActive = (item: NavItem) => {
    if (pathname === "/" && item.homeHash) return activeHash === item.homeHash;
    if (item.key === "work") return pathname.startsWith("/projects");
    if (item.key === "about") return pathname.startsWith("/about-me");
    return false;
  };

  const mainHref = (item: NavItem) =>
    pathname === "/" && item.homeHash ? item.homeHash : item.href;

  const linkClass = (active: boolean) =>
    `text-label relative pb-1 text-ink-muted transition-colors duration-200 hover:text-ink after:absolute after:bottom-0 after:left-0 after:h-px after:bg-accent after:transition-[width] after:duration-200 after:ease-out ${
      active
        ? "text-ink after:w-full"
        : "after:w-0 hover:after:w-full focus-visible:after:w-full"
    }`;

  return (
    <header
      className={`sticky top-0 z-40 overflow-visible bg-bg transition-[border-color] duration-200 ${
        scrolled || flyout ? "border-b border-rule" : "border-b border-transparent"
      }`}
    >
      <div
        ref={navRegionRef}
        className="relative"
        onMouseLeave={handleNavRegionMouseLeave}
        onMouseEnter={clearCloseTimer}
        onBlur={handleNavBlur}
      >
        <Container className="relative z-10 flex min-h-14 items-center justify-between gap-4 py-3">
          <Link
            href="/"
            className="font-[family-name:var(--font-outfit)] text-sm font-medium tracking-tight text-ink will-change-[opacity,transform]"
            style={{
              opacity: brandProgress,
              transform: `translateY(${(1 - brandProgress) * 10}px)`,
              pointerEvents: brandProgress < 0.08 ? "none" : "auto",
            }}
            aria-hidden={brandProgress < 0.08}
            tabIndex={brandProgress < 0.08 ? -1 : undefined}
          >
            gdrc.rml
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => {
              const active = isActive(item);
              const expanded = flyout === item.key;
              const href = mainHref(item);
              return (
                <Link
                  key={item.key}
                  href={href}
                  className={linkClass(active || expanded)}
                  aria-current={active ? "page" : undefined}
                  aria-expanded={expanded}
                  aria-controls={panelId}
                  onMouseEnter={() => openFlyout(item.key, true)}
                  onFocus={() => openFlyout(item.key, false)}
                  onClick={() => handleNavIntent(href)}
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
            <ThemeToggle />
          </nav>

          <div className="flex items-center gap-3 md:hidden">
            <ThemeToggle />
            <button
              ref={triggerRef}
              type="button"
              className="text-label min-h-11 min-w-11 text-ink"
              aria-expanded={menuOpen}
              aria-controls={menuId}
              onClick={() => {
                setMenuOpen((o) => !o);
                setMobileSection(null);
              }}
            >
              {menuOpen ? "Close" : "Menu"}
            </button>
          </div>
        </Container>

        {activeFlyout ? (
          <div
            id={panelId}
            className="absolute inset-x-0 top-full z-50 hidden animate-[nav-flyout_200ms_ease-out] border-b border-t border-rule bg-bg md:block"
            role="region"
            aria-label={`${activeFlyout.label} submenu`}
          >
            <Container className="py-8 md:py-10">
              <div className="grid gap-8 md:grid-cols-12 md:gap-10">
                <div className="md:col-span-4">
                  <p className="text-label text-ink-muted">
                    {activeFlyout.panelLabel}
                  </p>
                  <p className="mt-4 font-[family-name:var(--font-outfit)] text-2xl font-light tracking-tight text-ink md:text-3xl">
                    {activeFlyout.label}
                  </p>
                  <p className="mt-6">
                    <Link
                      href={mainHref(activeFlyout)}
                      className="text-label text-ink-muted transition-colors hover:text-ink"
                      onClick={() => handleNavIntent(mainHref(activeFlyout))}
                    >
                      View {activeFlyout.label.toLowerCase()} →
                    </Link>
                  </p>
                </div>
                <div className="md:col-span-8">
                  <ul>
                    {activeFlyout.links.map((link) => (
                      <li key={`${activeFlyout.key}-${link.href}-${link.label}`}>
                        <SubmenuLink item={link} onNavigate={handleNavIntent} />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Container>
          </div>
        ) : null}
      </div>

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
              gdrc.rml
            </span>
            <button
              type="button"
              className="text-label min-h-11 min-w-11"
              onClick={() => {
                setMenuOpen(false);
                setMobileSection(null);
                triggerRef.current?.focus();
              }}
            >
              Close
            </button>
          </Container>
          <nav aria-label="Mobile" className="flex flex-1 flex-col overflow-y-auto px-5 pb-10">
            {navItems.map((item, i) => {
              const expanded = mobileSection === item.key;
              return (
                <div key={item.key} className="border-b border-rule">
                  <div className="flex items-stretch">
                    <button
                      type="button"
                      className="flex flex-1 items-baseline gap-3 py-6 text-left font-[family-name:var(--font-outfit)] text-3xl font-light tracking-tight"
                      aria-expanded={expanded}
                      onClick={() =>
                        setMobileSection((current) =>
                          current === item.key ? null : item.key,
                        )
                      }
                    >
                      <span className="text-ink-muted">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>{item.label}</span>
                    </button>
                    <Link
                      href={mainHref(item)}
                      className="text-label flex items-center px-3 text-ink-muted"
                      onClick={() => {
                        setMenuOpen(false);
                        setMobileSection(null);
                      }}
                    >
                      Open
                    </Link>
                  </div>
                  {expanded ? (
                    <div className="pb-4">
                      <ul>
                        {item.links.map((link) => (
                          <li key={`${item.key}-m-${link.href}-${link.label}`}>
                            <SubmenuLink
                              item={link}
                              onNavigate={() => {
                                setMenuOpen(false);
                                setMobileSection(null);
                              }}
                            />
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
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
