import type { gsap as GsapType } from "gsap";
import type { ScrollTrigger as ScrollTriggerType } from "gsap/ScrollTrigger";
import { whenIdle } from "./idle";

export type GsapBundle = {
  gsap: typeof GsapType;
  ScrollTrigger: typeof ScrollTriggerType;
};
export type GsapContext = ReturnType<GsapBundle["gsap"]["context"]>;

let bundle: Promise<GsapBundle> | null = null;

/**
 * Loads GSAP + ScrollTrigger once, after the page is idle, and registers the
 * plugin a single time. Keeping GSAP out of the initial bundle keeps the first
 * paint and LCP independent from it.
 */
export function loadGsap(): Promise<GsapBundle> {
  bundle ??= whenIdle()
    .then(() => Promise.all([import("gsap"), import("gsap/ScrollTrigger")]))
    .then(([g, s]) => {
      g.gsap.registerPlugin(s.ScrollTrigger);
      // Mobile browsers resize the viewport when the URL bar hides; a full refresh there causes jank.
      s.ScrollTrigger.config({ ignoreMobileResize: true });
      return { gsap: g.gsap, ScrollTrigger: s.ScrollTrigger };
    });
  return bundle;
}
