import type { ReactNode } from "react";
import { Container } from "./Container";

type Props = {
  children: ReactNode;
  id?: string;
  alt?: boolean;
  dark?: boolean;
  className?: string;
};

export function Section({
  children,
  id,
  alt = false,
  dark = false,
  className = "",
}: Props) {
  const bg = dark ? "bg-bg-dark text-white" : alt ? "bg-bg-alt text-ink" : "bg-bg text-ink";

  return (
    <section
      id={id}
      className={`py-24 md:py-32 lg:py-40 ${bg} ${className}`.trim()}
    >
      <Container>{children}</Container>
    </section>
  );
}
