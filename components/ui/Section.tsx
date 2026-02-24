type Props = {
  title: string;
  children: React.ReactNode;
  gap?: string;
  className?: string;
};

export default function Section({ title, children, gap = "gap-3", className = "" }: Props) {
  return (
    <div className={`flex flex-col ${gap} ${className}`}>
      <h2 className="text-xs uppercase tracking-widest opacity-40">{title}</h2>
      {children}
    </div>
  );
}
