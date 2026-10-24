import {
  getActiveLearning,
  getPlannedLearning,
  learningStatusLabel,
} from "@/content/learning";
import type { LearningItem } from "@/content/types";
import { Hairline } from "./ui/Hairline";
import { Reveal } from "./ui/Reveal";

function NumberedItems({
  items,
  start = 1,
}: {
  items: LearningItem[];
  start?: number;
}) {
  return (
    <ul>
      {items.map((item, i) => (
        <Reveal
          key={item.id}
          index={Math.min(i, 5)}
          as="li"
          className="grid grid-cols-[3rem_1fr_auto] items-baseline gap-4 border-t border-rule py-5 first:border-t-0"
        >
          <span className="text-label text-ink-muted">
            .{String(start + i).padStart(2, "0")}
          </span>
          <div>
            <p className="font-[family-name:var(--font-outfit)] text-base font-medium tracking-tight">
              {item.topic}
            </p>
            {item.relatedActivity ? (
              <p className="mt-1 text-sm text-ink-muted">
                {item.relatedActivity}
              </p>
            ) : null}
          </div>
          <span className="text-label text-ink-muted">
            {learningStatusLabel[item.status]}
          </span>
        </Reveal>
      ))}
    </ul>
  );
}

export function LearningList() {
  const active = getActiveLearning();
  const planned = getPlannedLearning();

  return (
    <div className="space-y-12">
      {active.length > 0 ? (
        <Reveal>
          <div>
            <h3 className="text-label text-ink-muted">In progress</h3>
            <Hairline draw className="mt-4" />
            <NumberedItems items={active} start={1} />
          </div>
        </Reveal>
      ) : null}
      {planned.length > 0 ? (
        <Reveal index={1}>
          <div>
            <h3 className="text-label text-ink-muted">Planned</h3>
            <Hairline draw className="mt-4" />
            <NumberedItems items={planned} start={active.length + 1} />
          </div>
        </Reveal>
      ) : null}
    </div>
  );
}
