import type { LearningItem } from "@/content/types";

type Props = {
  items: LearningItem[];
  compact?: boolean;
};

export function LearningList({ items, compact = false }: Props) {
  if (items.length === 0) return null;

  return (
    <ul className={compact ? "space-y-3" : "space-y-5"}>
      {items.map((item) => (
        <li key={item.id} className="border-l-2 border-accent pl-4">
          <p className="font-medium">{item.topic}</p>
          <p className={`text-muted ${compact ? "text-sm" : "mt-1 text-sm leading-relaxed"}`}>
            {item.objective}
          </p>
          {!compact && item.relatedActivity ? (
            <p className="mt-1 text-sm text-muted">Activity: {item.relatedActivity}</p>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
