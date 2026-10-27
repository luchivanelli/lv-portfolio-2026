"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "../../lib/use-reduced-motion";

const HOLD_MS = 2600;
const LINE = "1.25em";

type Props = {
  phrases: readonly string[];
  className?: string;
};

/**
 * Single-line "window" where phrases roll vertically. Its height is fixed
 * (one line) so the heading never reflows the page. The first phrase is
 * duplicated at the end for a seamless loop; after sliding onto the duplicate
 * the track snaps back to the start without a transition.
 */
export default function PhraseRotator({ phrases, className = "" }: Props) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [animated, setAnimated] = useState(true);
  const list = phrases.length > 1 ? [...phrases, phrases[0]] : phrases;

  useEffect(() => {
    if (reduced || phrases.length < 2) return;
    const id = window.setInterval(() => setIndex((i) => Math.min(i + 1, phrases.length)), HOLD_MS);
    return () => window.clearInterval(id);
  }, [reduced, phrases.length]);

  // Landed on the duplicate: snap back to the real first phrase, then re-enable transitions.
  const onTransitionEnd = () => {
    if (index !== phrases.length) return;
    setAnimated(false);
    setIndex(0);
    requestAnimationFrame(() => requestAnimationFrame(() => setAnimated(true)));
  };

  return (
    <span className={`relative block overflow-hidden ${className}`} style={{ height: LINE }}>
      {/* Screen readers get a stable sentence instead of three rolling phrases. */}
      <span className="sr-only">{phrases[0]}</span>
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 block will-change-transform"
        style={{
          transform: `translateY(calc(${index} * -${LINE}))`,
          transition: animated && !reduced ? "transform 700ms cubic-bezier(0.22, 1, 0.36, 1)" : "none",
        }}
        onTransitionEnd={onTransitionEnd}
      >
        {list.map((phrase, i) => (
          <span key={i} className="block whitespace-nowrap leading-[1.25]" style={{ height: LINE }}>
            {phrase}
          </span>
        ))}
      </span>
    </span>
  );
}
