import type { EducationItem } from "@/content/types";

type Props = {
  item: EducationItem;
};

export function EducationEntry({ item }: Props) {
  return (
    <article>
      <h3 className="text-xl font-semibold tracking-tight">{item.credential}</h3>
      <p className="mt-1 text-sm text-muted">
        {item.institution} · {item.location}
      </p>
      <p className="mt-1 text-sm text-muted">{item.statusLabel}</p>
      {item.coursework.length > 0 ? (
        <>
          <h4 className="mt-4 text-sm font-medium uppercase tracking-[0.12em] text-muted">
            Coursework
          </h4>
          <ul className="mt-2 flex flex-wrap gap-2">
            {item.coursework.map((course) => (
              <li
                key={course}
                className="border border-border bg-surface px-2.5 py-1 text-xs"
              >
                {course}
              </li>
            ))}
          </ul>
        </>
      ) : null}
      {item.honors.length > 0 ? (
        <ul className="mt-3 list-disc pl-5 text-sm">
          {item.honors.map((honor) => (
            <li key={honor}>{honor}</li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}
