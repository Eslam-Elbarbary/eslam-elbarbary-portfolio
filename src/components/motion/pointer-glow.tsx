"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

type PointerGlowProps = {
  id?: string;
  className?: string;
  children: React.ReactNode;
  as?: "div" | "article" | "section";
  disabled?: boolean;
};

export function PointerGlow({
  id,
  className,
  children,
  as = "div",
  disabled = false,
}: PointerGlowProps) {
  const ref = useRef<HTMLElement>(null);
  const mediaOk = useSyncExternalStore(
    subscribePointerGlow,
    getPointerGlowSnapshot,
    () => false,
  );
  const active = !disabled && mediaOk;

  useEffect(() => {
    const node = ref.current;
    if (!node || !active) return;

    const onMove = (event: PointerEvent) => {
      const bounds = node.getBoundingClientRect();
      node.style.setProperty("--px", `${event.clientX - bounds.left}px`);
      node.style.setProperty("--py", `${event.clientY - bounds.top}px`);
    };

    node.addEventListener("pointermove", onMove);
    return () => node.removeEventListener("pointermove", onMove);
  }, [active]);

  const Component = as;

  return (
    <Component
      id={id}
      ref={ref as never}
      className={cn(active && "pointer-glow", className)}
    >
      {children}
    </Component>
  );
}

function subscribePointerGlow(onChange: () => void) {
  const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
  const motionOk = window.matchMedia("(prefers-reduced-motion: no-preference)");
  fine.addEventListener("change", onChange);
  motionOk.addEventListener("change", onChange);
  return () => {
    fine.removeEventListener("change", onChange);
    motionOk.removeEventListener("change", onChange);
  };
}

function getPointerGlowSnapshot() {
  return (
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    window.matchMedia("(prefers-reduced-motion: no-preference)").matches
  );
}
