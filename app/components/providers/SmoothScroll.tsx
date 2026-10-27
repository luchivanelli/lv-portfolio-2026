"use client";

import type Lenis from "lenis";
import { createContext, useCallback, useContext, useEffect, useRef } from "react";
import type { ReactNode, RefObject } from "react";
import { loadGsap } from "../../lib/gsap";
import { useReducedMotion } from "../../lib/use-reduced-motion";

const NAV_OFFSET = -56;

// A ref (not state) so creating/destroying Lenis never re-renders the tree.
const LenisContext = createContext<RefObject<Lenis | null> | null>(null);

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (reduced) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    // Lenis and GSAP load together, after the page is idle.
    Promise.all([loadGsap(), import("lenis")]).then(([{ gsap, ScrollTrigger }, { default: LenisCtor }]) => {
      if (cancelled) return;
      const instance = new LenisCtor({ lerp: 0.1, touchMultiplier: 1.5 });
      const onScroll = () => ScrollTrigger.update();
      instance.on("scroll", onScroll);

      // Drive Lenis from GSAP's ticker so both share a single rAF.
      const tick = (time: number) => instance.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      lenisRef.current = instance;

      cleanup = () => {
        gsap.ticker.remove(tick);
        instance.destroy();
        lenisRef.current = null;
      };
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [reduced]);

  return <LenisContext.Provider value={lenisRef}>{children}</LenisContext.Provider>;
}

/** Anchor navigation that works with Lenis, native scroll and reduced motion. */
export function useScrollTo() {
  const lenisRef = useContext(LenisContext);
  const reduced = useReducedMotion();

  return useCallback(
    (hash: string) => {
      const isTop = hash === "#" || hash === "#inicio";
      const target = isTop ? null : document.querySelector<HTMLElement>(hash);
      const lenis = lenisRef?.current ?? null;
      if (lenis) {
        lenis.scrollTo(target ?? 0, { offset: target ? NAV_OFFSET : 0 });
      } else if (target) {
        target.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
      }
      window.history.replaceState(null, "", target ? hash : window.location.pathname);
    },
    [lenisRef, reduced]
  );
}
