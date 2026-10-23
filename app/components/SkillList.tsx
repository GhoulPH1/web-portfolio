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
          {category.summary ? (
            <p className="mt-2 text-sm leading-relaxed text-muted">{category.summary}</p>
          ) : null}
          <ul className="mt-3 divide-y divide-border border-y border-border">
            {category.items.map((item) => (
              <li key={item.id} className="py-3">
                <p className="font-medium">{item.name}</p>
                {item.evidenceNote ? (
                  <p className="mt-1 text-sm text-muted">{item.evidenceNote}</p>
                ) : null}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
