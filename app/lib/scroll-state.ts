/**
 * Mutable scroll/pointer state shared between ScrollTrigger (writer) and the
 * R3F render loop (reader). Kept outside React so updates never trigger renders.
 */
export const scrollState = {
  /** Float index over `sections`: 2.4 means 40% of the way from section 2 to 3. */
  section: 0,
  /** Float index over project blocks, same convention. */
  project: 0,
  /** Scroll velocity in px/s (signed). */
  velocity: 0,
  /** Normalized pointer position, -1..1 on both axes. */
  pointer: { x: 0, y: 0 },
};
