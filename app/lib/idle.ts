/**
 * Everything non-critical (GSAP, Lenis, three.js) is fetched after the window
 * `load` event, an idle slot and a short fixed delay. The delay guarantees the
 * requests start after the hero text has painted even on very fast networks,
 * so the first paint / LCP never depend on these bundles, and the 3D scene
 * fades in right after the hero's CSS intro (~0.9s) finishes.
 */
const NON_CRITICAL_DELAY_MS = 500;

/** Runs `callback` after load + idle + NON_CRITICAL_DELAY_MS. Returns a cancel function. */
export function afterLoadIdle(callback: () => void): () => void {
  let idleId = 0;
  let timeoutId = 0;
  let cancelled = false;

  const run = () => {
    if (!cancelled) callback();
  };
  const delay = () => {
    timeoutId = window.setTimeout(run, NON_CRITICAL_DELAY_MS);
  };
  const schedule = () => {
    if (typeof window.requestIdleCallback === "function") {
      idleId = window.requestIdleCallback(delay, { timeout: 1500 });
    } else {
      delay();
    }
  };

  if (document.readyState === "complete") schedule();
  else window.addEventListener("load", schedule, { once: true });

  return () => {
    cancelled = true;
    window.removeEventListener("load", schedule);
    if (idleId && typeof window.cancelIdleCallback === "function") window.cancelIdleCallback(idleId);
    if (timeoutId) window.clearTimeout(timeoutId);
  };
}

/** Promise flavour of afterLoadIdle (cannot be cancelled). */
export function whenIdle(): Promise<void> {
  return new Promise((resolve) => {
    afterLoadIdle(resolve);
  });
}
