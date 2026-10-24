type Props = {
  dark?: boolean;
  className?: string;
};

export function Hairline({ dark = false, className = "" }: Props) {
  return (
    <hr
      className={`hairline ${dark ? "hairline-dark" : ""} ${className}`.trim()}
    />
  );
}
