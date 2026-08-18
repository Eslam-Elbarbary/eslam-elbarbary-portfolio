import { cn } from "@/lib/utils";

type TagProps = {
  children: React.ReactNode;
  className?: string;
};

export function Tag({ children, className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-line bg-elevated/70 px-2.5 py-1 font-mono text-[11px] font-medium tracking-wide text-muted transition-transform duration-300 group-hover:-translate-y-px",
        className,
      )}
    >
      {children}
    </span>
  );
}
