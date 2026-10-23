import { skillLevelLabel } from "@/content/skills";
import type { SkillCategory } from "@/content/types";

type Props = {
  categories: SkillCategory[];
};

export function SkillList({ categories }: Props) {
  return (
    <div className="space-y-8">
      {categories.map((category) => (
        <section key={category.id} aria-labelledby={`skill-${category.id}`}>
          <h3 id={`skill-${category.id}`} className="text-lg font-semibold tracking-tight">
            {category.label}
          </h3>
          <ul className="mt-3 divide-y divide-border border-y border-border">
            {category.items.map((item) => (
              <li
                key={item.id}
                className="flex flex-col gap-1 py-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
              >
                <div>
                  <p className="font-medium">{item.name}</p>
                  {item.evidenceNote ? (
                    <p className="text-sm text-muted">{item.evidenceNote}</p>
                  ) : null}
                </div>
                <p className="shrink-0 text-sm text-muted">
                  {skillLevelLabel[item.level] ?? item.level}
                </p>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
