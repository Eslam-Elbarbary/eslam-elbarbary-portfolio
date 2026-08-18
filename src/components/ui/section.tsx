import { cn } from "@/lib/utils";

type SectionProps = {
  id?: string;
  children: React.ReactNode;
  className?: string;
  tone?: "default" | "alt";
};

export function Section({
  id,
  children,
  className,
  tone = "default",
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative py-14 sm:py-16 md:py-24 lg:py-28",
        tone === "alt" && "bg-surface/40",
        className,
      )}
    >
      {children}
    </section>
  );
}
