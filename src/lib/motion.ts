export const easings = {
  premium: [0.22, 1, 0.36, 1] as const,
  reveal: [0.16, 1, 0.3, 1] as const,
};

export const duration = {
  enter: 0.58,
  fast: 0.34,
  hover: 0.35,
  intro: 1.9,
};

export const staggerDelay = {
  section: 0.08,
  list: 0.05,
  hero: 0.07,
};

export const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const introTransition = {
  duration: duration.enter,
  ease: easings.premium,
};
