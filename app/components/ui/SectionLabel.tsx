import { Hairline } from "./Hairline";

type Props = {
  index?: string;
  label: string;
  dark?: boolean;
  className?: string;
};

export function SectionLabel({
  index,
  label,
  dark = false,
  className = "",
}: Props) {
  const text = index ? `${index} / ${label}` : label;

  return (
    <div className={className}>
      <p
        className={`text-label ${dark ? "text-accent-on-dark" : "text-ink-muted"}`}
      >
        {text}
      </p>
      <Hairline dark={dark} className="mt-4" />
    </div>
  );
}
