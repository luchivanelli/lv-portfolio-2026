"use client";

import { useEffect } from "react";
import { loadGsap, type GsapContext } from "../../lib/gsap";
import { sections } from "../../lib/data";
import { accentAt, rgbToCss, type RGB } from "../../lib/scene-config";
import { scrollState } from "../../lib/scroll-state";
import { useLanguage } from "../providers/LanguageProvider";

/**
 * Converts scroll position into float indexes (section / project) for the scene
 * and keeps the page accent colour in sync with the section (rainbow palette).
 * Each element gets a ScrollTrigger whose start/end mark the scroll positions at
 * which it enters and leaves the viewport; the midpoint is where the element is
 * centred. Interpolating between midpoints gives a continuous index.
 */
function floatIndex(centers: number[], y: number) {
  if (centers.length === 0) return 0;
  if (y <= centers[0]) return 0;
  const last = centers.length - 1;
  if (y >= centers[last]) return last;
  let i = 0;
  while (i < last - 1 && y > centers[i + 1]) i++;
  const span = centers[i + 1] - centers[i];
  return span > 0 ? i + (y - centers[i]) / span : i;
}

const accent: RGB = [0, 0, 0];
let lastAccent = "";
let lastAccentAt = 0;

/** Steps per section for the accent; the CSS transition on <html> smooths between them. */
const ACCENT_STEPS = 16;
const ACCENT_MIN_INTERVAL_MS = 90;

/**
 * Writes the accent for the current section to <html>, where every `accent`
 * utility reads it. Each write recalculates styles for the whole page, so the
 * value is quantized and rate-limited; the final value always lands.
 */
function applyAccent(sectionIndex: number, force = false) {
  const now = performance.now();
  if (!force && now - lastAccentAt < ACCENT_MIN_INTERVAL_MS) return;
  const stepped = Math.round(sectionIndex * ACCENT_STEPS) / ACCENT_STEPS;
  const css = rgbToCss(accentAt(stepped, accent));
  if (css === lastAccent) return;
  lastAccent = css;
  lastAccentAt = now;
  document.documentElement.style.setProperty("--color-accent", css);
}

export default function SceneScrollBridge() {
  const { language } = useLanguage();

  useEffect(() => {
    let ctx: GsapContext | undefined;
    let cancelled = false;

    loadGsap().then(({ gsap, ScrollTrigger }) => {
      if (cancelled) return;
      ctx = gsap.context(() => {
        const sectionEls = sections
          .map((s) => document.getElementById(s.id))
          .filter((el): el is HTMLElement => el !== null);
        const projectEls = gsap.utils.toArray<HTMLElement>("[data-project-index]");

        const track = (el: HTMLElement) =>
          ScrollTrigger.create({ trigger: el, start: "top bottom", end: "bottom top" });
        const sectionTriggers = sectionEls.map(track);
        const projectTriggers = projectEls.map(track);

        let sectionCenters: number[] = [];
        let projectCenters: number[] = [];
        const measure = () => {
          sectionCenters = sectionTriggers.map((t) => (t.start + t.end) / 2);
          projectCenters = projectTriggers.map((t) => (t.start + t.end) / 2);
        };
        let settleTimer = 0;
        const update = (y: number, force = false) => {
          scrollState.section = floatIndex(sectionCenters, y);
          scrollState.project = floatIndex(projectCenters, y);
          applyAccent(scrollState.section, force);
          // Make sure the exact colour lands once scrolling stops.
          window.clearTimeout(settleTimer);
          settleTimer = window.setTimeout(() => applyAccent(scrollState.section, true), ACCENT_MIN_INTERVAL_MS + 20);
        };

        ScrollTrigger.create({
          start: 0,
          end: "max",
          onRefresh: (self) => {
            measure();
            update(self.scroll(), true);
          },
          onUpdate: (self) => {
            update(self.scroll());
            scrollState.velocity = self.getVelocity();
          },
        });
      });
    });

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  // Text length changes with the language, so section heights do too.
  useEffect(() => {
    let cancelled = false;
    loadGsap().then(({ ScrollTrigger }) => {
      if (!cancelled) ScrollTrigger.refresh();
    });
    return () => {
      cancelled = true;
    };
  }, [language]);

  return null;
}
