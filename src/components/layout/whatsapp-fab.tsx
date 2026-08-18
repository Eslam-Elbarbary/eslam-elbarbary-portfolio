"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { getSocial } from "@/data/portfolio";
import { cn } from "@/lib/utils";

export function WhatsAppFab() {
  const whatsapp = getSocial("whatsapp");
  const [contactVisible, setContactVisible] = useState(false);

  useEffect(() => {
    const contact = document.getElementById("contact");
    if (!contact) return;

    const observer = new IntersectionObserver(
      ([entry]) => setContactVisible(entry.isIntersecting),
      { threshold: 0.12, rootMargin: "0px 0px -12% 0px" },
    );
    observer.observe(contact);
    return () => observer.disconnect();
  }, []);

  if (!whatsapp?.available) return null;

  return (
    <a
      href={whatsapp.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      title="Chat on WhatsApp"
      aria-hidden={contactVisible}
      tabIndex={contactVisible ? -1 : 0}
      className={cn(
        "fixed z-40 inline-flex items-center justify-center rounded-2xl border border-line bg-elevated/90 text-ink shadow-[0_12px_32px_-18px_rgb(0_0_0_/_0.9)] backdrop-blur-md transition-[transform,opacity,border-color] duration-300",
        "right-4 h-[50px] w-[50px] sm:right-5 sm:h-12 sm:w-12",
        "bottom-[max(1rem,calc(0.75rem+env(safe-area-inset-bottom)))]",
        contactVisible
          ? "pointer-events-none scale-90 opacity-0"
          : "hover:-translate-y-0.5 hover:border-primary/40",
      )}
    >
      <span className="relative">
        <MessageCircle className="h-5 w-5" aria-hidden="true" />
        <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-[#25D366] shadow-[0_0_0_3px_rgb(17_24_39_/_0.9)]" />
      </span>
    </a>
  );
}
