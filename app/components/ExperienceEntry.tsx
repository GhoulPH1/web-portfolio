import type { ExperienceItem } from "@/content/types";

type Props = {
  item: ExperienceItem;
};

export function ExperienceEntry({ item }: Props) {
  return (
    <article>
      <h3 className="text-xl font-semibold tracking-tight">{item.title}</h3>
      <p className="mt-1 text-sm text-muted">
        {item.employmentType} · {item.organization}
      </p>
      <p className="mt-1 text-sm text-muted">
        {item.location} · {item.start} – {item.end}
      </p>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-relaxed text-foreground/90">
        {item.responsibilities.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
    </article>
  );
}
