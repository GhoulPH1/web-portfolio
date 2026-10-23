import {
  getActiveLearning,
  getPlannedLearning,
  learningStatusLabel,
} from "@/content/learning";
import type { LearningItem } from "@/content/types";

type Props = {
  /** When omitted, renders the full grouped learning list from content */
  items?: LearningItem[];
  grouped?: boolean;
};

function ItemList({ items }: { items: LearningItem[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item.id} className="border-l-2 border-accent pl-4">
          <p className="font-medium">{item.topic}</p>
          <p className="mt-0.5 text-sm text-muted">
            {learningStatusLabel[item.status]}
          </p>
        </li>
      ))}
    </ul>
  );
}

export function LearningList({ items, grouped = true }: Props) {
  if (items && !grouped) {
    if (items.length === 0) return null;
    return <ItemList items={items} />;
  }

  const active = getActiveLearning();
  const planned = getPlannedLearning();

  return (
    <div className="space-y-8">
      {active.length > 0 ? (
        <div>
          <h3 className="text-sm font-medium uppercase tracking-[0.12em] text-muted">
            In progress
          </h3>
          <div className="mt-3">
            <ItemList items={active} />
          </div>
        </div>
      ) : null}
      {planned.length > 0 ? (
        <div>
          <h3 className="text-sm font-medium uppercase tracking-[0.12em] text-muted">
            Planned
          </h3>
          <div className="mt-3">
            <ItemList items={planned} />
          </div>
        </div>
      ) : null}
    </div>
  );
}
