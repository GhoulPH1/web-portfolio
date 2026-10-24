type Item = {
  label: string;
  value: string;
};

type Props = {
  items: Item[];
  className?: string;
};

export function MetaList({ items, className = "" }: Props) {
  const visible = items.filter((item) => item.value.trim().length > 0);
  if (visible.length === 0) return null;

  return (
    <dl className={`grid gap-5 sm:grid-cols-2 ${className}`.trim()}>
      {visible.map((item) => (
        <div key={item.label}>
          <dt className="text-label text-ink-muted">{item.label}</dt>
          <dd className="mt-3 font-[family-name:var(--font-outfit)] text-sm font-semibold text-ink">
            {item.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
