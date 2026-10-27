"use client";

import { useEffect, useState } from "react";
import { loadGsap, type GsapContext } from "../../lib/gsap";
import { sections, type SectionId } from "../../lib/data";

/** Id of the section currently crossing the middle of the viewport. */
export function useActiveSection(): SectionId {
  const [active, setActive] = useState<SectionId>(sections[0].id);

  useEffect(() => {
    let ctx: GsapContext | undefined;
    let cancelled = false;

    loadGsap().then(({ gsap, ScrollTrigger }) => {
      if (cancelled) return;
      ctx = gsap.context(() => {
        sections.forEach((section) => {
          const el = document.getElementById(section.id);
          if (!el) return;
          ScrollTrigger.create({
            trigger: el,
            start: "top 50%",
            end: "bottom 50%",
            onToggle: (self) => {
              if (self.isActive) setActive(section.id);
            },
          });
        });
      });
    });

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return active;
}
