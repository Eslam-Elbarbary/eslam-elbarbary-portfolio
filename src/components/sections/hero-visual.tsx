import Image from "next/image";

const badges = [
  {
    label: "React.js",
    className: "left-1 top-5 sm:left-0 sm:top-8 sm:-translate-x-[8%] xl:-translate-x-[28%]",
  },
  {
    label: "Next.js",
    className: "right-1 top-8 sm:right-0 sm:top-12 sm:translate-x-[8%] xl:translate-x-[28%]",
  },
  {
    label: "TypeScript",
    className: "bottom-6 right-1 sm:bottom-16 sm:right-0 sm:translate-x-[8%] lg:bottom-24 xl:translate-x-[28%]",
  },
] as const;

export function HeroVisual() {
  return (
    <div className="relative mx-auto w-[min(58vw,220px)] sm:w-[min(64vw,280px)] lg:mx-0 lg:w-[360px] xl:w-[400px]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[46%] h-[72%] w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgb(99_102_241_/_0.22),transparent_68%)] blur-2xl"
      />

      <div
        className="relative z-[1] w-full overflow-hidden rounded-[24px] bg-surface shadow-[0_0_0_1px_rgb(99_102_241_/_0.45),0_0_0_1px_rgb(34_211_238_/_0.18)_inset,0_22px_44px_-24px_rgb(0_0_0_/_0.9)] sm:rounded-[30px]"
        style={{ aspectRatio: "4 / 5" }}
      >
        <Image
          src="/images/profile/eslam.jpg"
          alt="Eslam Elbarbary - Front-End Developer"
          fill
          priority
          sizes="(max-width: 768px) 72vw, 400px"
          className="object-cover object-[50%_20%]"
        />
      </div>

      {badges.map((badge) => (
        <span
          key={badge.label}
          className={`absolute z-10 rounded-full border border-line bg-surface px-2 py-1 font-mono text-[10px] text-ink shadow-[0_8px_20px_-12px_rgb(0_0_0_/_0.75)] sm:px-3 sm:text-[11px] ${badge.className}`}
        >
          {badge.label}
        </span>
      ))}
    </div>
  );
}
