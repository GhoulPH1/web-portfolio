import type { SkillCategory } from "@/content/types";
import { Hairline } from "./ui/Hairline";
import { Reveal } from "./ui/Reveal";

type Props = {
  categories: SkillCategory[];
};

export function SkillList({ categories }: Props) {
  return (
    <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
      {categories.map((category, categoryIndex) => (
        <Reveal key={category.id} index={categoryIndex}>
          <section aria-labelledby={`skill-${category.id}`}>
            <h3
              id={`skill-${category.id}`}
              className="font-[family-name:var(--font-outfit)] text-base font-medium tracking-tight"
            >
              {category.label}
            </h3>
            {category.summary ? (
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                {category.summary}
              </p>
            ) : null}
            <Hairline draw className="mt-4" />
            <ul className="mt-2">
              {category.items.map((item) => (
                <li
                  key={item.id}
                  className="border-b border-rule py-3 last:border-b-0"
                >
                  <p className="font-[family-name:var(--font-outfit)] text-sm text-ink">
                    {item.name}
                  </p>
                  {item.evidenceNote ? (
                    <p className="text-label mt-1 text-ink-muted">
                      {item.evidenceNote}
                    </p>
                  ) : null}
                </li>
              ))}
            </ul>
          </section>
        </Reveal>
      ))}
    </div>
  );
}
