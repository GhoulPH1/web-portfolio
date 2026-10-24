type VisibleCallback = (el: Element) => void;

const observed = new WeakMap<Element, VisibleCallback>();
let sharedObserver: IntersectionObserver | null = null;

function getObserver(): IntersectionObserver | null {
  if (typeof window === "undefined") return null;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return null;
  }

  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const cb = observed.get(entry.target);
          if (!cb) continue;
          cb(entry.target);
          sharedObserver?.unobserve(entry.target);
          observed.delete(entry.target);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );
  }

  return sharedObserver;
}

/** Observe once; callback fires the first time the element enters view. */
export function observeOnce(el: Element, onVisible: VisibleCallback) {
  if (typeof window === "undefined") return () => {};

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    onVisible(el);
    return () => {};
  }

  const observer = getObserver();
  if (!observer) {
    onVisible(el);
    return () => {};
  }

  observed.set(el, onVisible);
  observer.observe(el);

  return () => {
    observer.unobserve(el);
    observed.delete(el);
  };
}

export function prefersReducedMotion() {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
