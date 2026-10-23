import type { LearningItem, LearningStatus } from "./types";

export const learning: LearningItem[] = [
  {
    id: "networking",
    topic: "Networking fundamentals",
    status: "in-progress",
  },
  {
    id: "service-desk",
    topic: "IT support practice (Service Desk Simulator)",
    status: "in-progress",
    relatedActivity: "Service Desk Simulator",
  },
  {
    id: "programming-fundamentals",
    topic: "Programming fundamentals",
    status: "relearning",
  },
  {
    id: "python",
    topic: "Python",
    status: "planned",
  },
];

export const learningStatusLabel: Record<LearningStatus, string> = {
  "in-progress": "In progress",
  relearning: "Relearning",
  planned: "Planned",
};

export function getActiveLearning(): LearningItem[] {
  return learning.filter(
    (item) => item.status === "in-progress" || item.status === "relearning",
  );
}

export function getPlannedLearning(): LearningItem[] {
  return learning.filter((item) => item.status === "planned");
}
