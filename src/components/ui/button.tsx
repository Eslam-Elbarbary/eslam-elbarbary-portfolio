import { cn } from "@/lib/utils";

type ButtonProps = {
  href?: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  external?: boolean;
  download?: boolean;
  disabled?: boolean;
  disabledLabel?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  "aria-label"?: string;
  "aria-expanded"?: boolean;
};

const variants = {
  primary:
    "btn-primary text-ink shadow-[0_0_0_1px_rgb(99_102_241_/_0.4),0_10px_30px_-12px_rgb(99_102_241_/_0.8)]",
  secondary:
    "border border-line-strong bg-elevated/60 text-ink hover:border-primary/40 hover:bg-elevated",
  ghost: "text-muted hover:text-ink",
};

export function Button({
  href,
  children,
  variant = "primary",
  className,
  external,
  download,
  disabled,
  disabledLabel,
  onClick,
  type = "button",
  "aria-label": ariaLabel,
  "aria-expanded": ariaExpanded,
}: ButtonProps) {
  const classes = cn(
    "group/btn inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium tracking-tight transition-[background-color,background-position,border-color,color,transform,opacity,box-shadow] duration-200",
    "hover:-translate-y-px active:scale-[0.98] [&_svg]:transition-transform [&_svg]:duration-200 hover:[&_svg]:translate-x-[3px]",
    variants[variant],
    disabled && "pointer-events-none cursor-not-allowed opacity-45",
    className,
  );

  if (disabled) {
    return (
      <span
        className={classes}
        aria-disabled="true"
        aria-label={ariaLabel}
        title={disabledLabel}
      >
        {children}
      </span>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        aria-label={ariaLabel}
        {...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : undefined)}
        {...(download ? { download: true } : undefined)}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      aria-label={ariaLabel}
      aria-expanded={ariaExpanded}
    >
      {children}
    </button>
  );
}
