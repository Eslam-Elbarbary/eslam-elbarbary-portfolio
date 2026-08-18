import { useId } from "react";
import { cn } from "@/lib/utils";

type EbLogoProps = {
  size?: number;
  className?: string;
  monochrome?: boolean;
  animated?: boolean;
  title?: string;
};

export const EB_MARK_PATH =
  "M9 6h16.8c8.7 0 14.2 5 14.2 11.3 0 4.2-2.8 7.3-7.6 8.5 5.6 1.1 9.4 5.5 9.4 11.2 0 7.1-5.8 11-15.6 11H9C7.3 48 6 46.7 6 45V9C6 7.3 7.3 6 9 6Zm8.6 7.4V22h8.2c3.6 0 5.7-1.7 5.7-4.3s-2.1-4.3-5.7-4.3h-8.2Zm0 16.4v9.2h9.2c4.2 0 6.6-1.9 6.6-4.6s-2.4-4.6-6.6-4.6h-9.2Z";

export function EbLogo({
  size = 32,
  className,
  monochrome = false,
  animated = false,
  title = "Eslam Elbarbary",
}: EbLogoProps) {
  const uid = useId().replace(/:/g, "");
  const gradientId = `eb-grad-${uid}`;
  const fill = monochrome ? "currentColor" : `url(#${gradientId})`;

  return (
    <svg
      viewBox="0 0 48 48"
      width={size}
      height={size}
      className={cn("eb-logo", animated && "eb-logo-animated", className)}
      role="img"
      aria-label={title}
    >
      <title>{title}</title>
      {monochrome ? null : (
        <defs>
          <linearGradient
            id={gradientId}
            x1="6"
            y1="6"
            x2="42"
            y2="42"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#6366F1" />
            <stop offset="100%" stopColor="#22D3EE" />
          </linearGradient>
        </defs>
      )}

      <path
        className="eb-logo-fill"
        fill={fill}
        fillRule="evenodd"
        d={EB_MARK_PATH}
      />

      {animated ? (
        <g
          fill="none"
          stroke={fill}
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path pathLength="1" className="eb-stroke eb-stroke-1" d="M9 7.2v33.6" />
          <path
            pathLength="1"
            className="eb-stroke eb-stroke-2"
            d="M9 7.2h15.6c7.2 0 11.6 3.6 11.6 8.6 0 4.7-3.5 7.6-10.2 7.6H9"
          />
          <path
            pathLength="1"
            className="eb-stroke eb-stroke-3"
            d="M9 23.4h14.8c8 0 12.4 3.8 12.4 9.4 0 5.8-4.6 9.4-12.8 9.4H9"
          />
        </g>
      ) : null}
    </svg>
  );
}
