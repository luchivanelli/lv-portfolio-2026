"use client";

import { useEffect, useRef } from "react";
import { loadGsap, type GsapContext } from "../../lib/gsap";
import { useReducedMotion } from "../../lib/use-reduced-motion";

type Options = {
  /** Selector for children to stagger. Without it the container itself animates. */
  selector?: string;
  stagger?: number;
  y?: number;
  start?: string;
};

/**
 * Scroll-triggered fade/slide reveal. Elements are visible by default (SEO,
 * no-JS, reduced motion); GSAP hides them right before animating in.
 */
export function useReveal<T extends HTMLElement>({
  selector,
  stagger = 0.1,
  y = 28,
  start = "top 85%",
}: Options = {}) {
  const ref = useRef<T>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    let ctx: GsapContext | undefined;
    let cancelled = false;

    loadGsap().then(({ gsap }) => {
      if (cancelled) return;
      ctx = gsap.context(() => {
        const targets = selector ? gsap.utils.toArray<HTMLElement>(selector, el) : [el];
        if (targets.length === 0) return;
        gsap.from(targets, {
          opacity: 0,
          y,
          duration: 0.8,
          ease: "power3.out",
          stagger,
          clearProps: "transform",
          scrollTrigger: { trigger: el, start, once: true },
        });
      }, el);
    });

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [reduced, selector, stagger, y, start]);

  return ref;
}
