import type { Project } from "@/types/portfolio";
import { cn } from "@/lib/utils";

type ProductPreviewProps = {
  project: Project;
  className?: string;
};

export function ProductPreview({ project, className }: ProductPreviewProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-line bg-background",
        className,
      )}
    >
      <div className="flex items-center gap-1.5 border-b border-line px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="ml-2 truncate font-mono text-[10px] text-muted">
          {project.liveUrl.replace(/^https?:\/\//, "")}
        </span>
      </div>
      <div className="aspect-[16/10] p-3 sm:p-4">
        {project.id === "dh" ? <DhMock /> : null}
        {project.id === "pets-zone" ? <PetsMock /> : null}
        {project.id === "real-estate" ? <EstateMock /> : null}
        {project.id !== "dh" &&
        project.id !== "pets-zone" &&
        project.id !== "real-estate" ? (
          <GenericMock title={project.title} />
        ) : null}
      </div>
    </div>
  );
}

function DhMock() {
  return (
    <div className="flex h-full flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="h-3 w-24 rounded bg-ink/15" />
        <div className="flex gap-1">
          {["KW", "EG", "SA"].map((code, index) => (
            <span
              key={code}
              className={cn(
                "rounded-full px-2 py-0.5 font-mono text-[9px]",
                index === 0 ? "bg-primary/30 text-ink" : "bg-elevated text-muted",
              )}
            >
              {code}
            </span>
          ))}
        </div>
      </div>
      <div className="grid flex-1 grid-cols-3 gap-2">
        {["Physical", "Digital", "Vendor"].map((label, index) => (
          <div key={label} className="rounded-lg border border-line bg-elevated p-2">
            <div
              className={cn(
                "mb-2 h-12 rounded-md",
                index === 0 && "bg-gradient-to-br from-primary/40 to-accent/20",
                index === 1 && "bg-gradient-to-br from-accent/30 to-primary/20",
                index === 2 && "bg-gradient-to-br from-ink/10 to-primary/20",
              )}
            />
            <p className="text-[10px] text-ink">{label}</p>
            <p className="text-[9px] text-muted">KWD catalog</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function PetsMock() {
  return (
    <div className="flex h-full gap-3">
      <div className="hidden w-16 flex-col gap-2 sm:flex">
        {["Shop", "Vendors", "Cart"].map((item, index) => (
          <div
            key={item}
            className={cn(
              "rounded-md px-1.5 py-2 text-[9px]",
              index === 0 ? "bg-accent/20 text-accent" : "bg-elevated text-muted",
            )}
          >
            {item}
          </div>
        ))}
      </div>
      <div className="grid flex-1 grid-cols-2 gap-2">
        {["Premium feed", "Grooming", "Accessories", "Wallet"].map((item) => (
          <div key={item} className="rounded-lg border border-line bg-elevated p-2">
            <div className="mb-2 h-10 rounded bg-gradient-to-r from-accent/25 to-primary/20" />
            <p className="text-[10px] text-ink">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function EstateMock() {
  return (
    <div className="flex h-full flex-col gap-2">
      <div className="flex gap-2">
        <div className="h-7 flex-1 rounded-md border border-line bg-elevated" />
        <div className="h-7 w-16 rounded-md bg-primary/30" />
      </div>
      <div className="grid flex-1 grid-cols-3 gap-2">
        {["Compound", "Villa", "Apartment"].map((item, index) => (
          <div key={item} className="overflow-hidden rounded-lg border border-line bg-elevated">
            <div
              className={cn(
                "h-12",
                index === 1
                  ? "bg-gradient-to-br from-primary/50 to-accent/30"
                  : "bg-gradient-to-br from-elevated to-primary/20",
              )}
            />
            <div className="p-2">
              <p className="text-[10px] text-ink">{item}</p>
              <p className="text-[9px] text-muted">Cairo · filter</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function GenericMock({ title }: { title: string }) {
  return (
    <div className="flex h-full flex-col justify-end rounded-lg bg-gradient-to-br from-primary/20 to-accent/10 p-4">
      <p className="text-sm text-ink">{title}</p>
      <p className="text-xs text-muted">Screenshot coming soon</p>
    </div>
  );
}
