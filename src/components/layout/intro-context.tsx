"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

type IntroContextValue = {
  ready: boolean;
  complete: () => void;
};

const IntroContext = createContext<IntroContextValue | null>(null);

export function IntroProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const complete = useCallback(() => setReady(true), []);

  const value = useMemo<IntroContextValue>(
    () => ({ ready, complete }),
    [ready, complete],
  );

  return <IntroContext.Provider value={value}>{children}</IntroContext.Provider>;
}

export function useIntro() {
  const context = useContext(IntroContext);
  if (!context) {
    return {
      ready: true,
      complete: () => {},
    };
  }
  return context;
}
