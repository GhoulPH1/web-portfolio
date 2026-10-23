type Props = {
  status: string;
  role: string;
  technologies: string[];
};

const statusLabel: Record<string, string> = {
  completed: "Completed",
  "in-progress": "In progress",
  prototype: "Prototype",
  archived: "Archived",
};

export function ProjectMeta({ status, role, technologies }: Props) {
  return (
    <dl className="grid gap-4 border-y border-border py-5 text-sm sm:grid-cols-2">
      <div>
        <dt className="text-muted">Project</dt>
        <dd className="mt-1 font-medium">{role}</dd>
      </div>
      <div>
        <dt className="text-muted">Status</dt>
        <dd className="mt-1 font-medium">{statusLabel[status] ?? status}</dd>
      </div>
      <div className="sm:col-span-2">
        <dt className="text-muted">Technologies</dt>
        <dd className="mt-2 flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="border border-border bg-surface px-2.5 py-1 text-xs"
            >
              {tech}
            </span>
          ))}
        </dd>
      </div>
    </dl>
  );
}
