interface Props {
  variant: "center" | "even" | "between" | "start" | "end";
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export default function ColumnGroup({ variant, children, className, id }: Props) {
  const flexVariant = {
    center: "justify-center",
    even: "justify-evenly",
    between: "justify-between",
    start: "justify-start",
    end: "justify-end",
  }[`${variant}`];

  return (
    <div className={`flex flex-col ${flexVariant} ${className ?? ""}`} id={id}>
      {children}
    </div>
  );
}
