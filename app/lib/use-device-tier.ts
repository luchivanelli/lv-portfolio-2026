"use client";

import { useSyncExternalStore } from "react";

/**
 * high  → full scene
 * low   → reduced geometry, no antialias, lower dpr (touch-first or low-memory devices)
 * none  → no WebGL: render the static fallback
 */
export type DeviceTier = "high" | "low" | "none";

function detect(): DeviceTier {
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") ?? canvas.getContext("webgl");
    if (!gl) return "none";
  } catch {
    return "none";
  }

  const nav = navigator as Navigator & { deviceMemory?: number };
  const memory = nav.deviceMemory ?? 8;
  const cores = navigator.hardwareConcurrency ?? 4;
  const coarsePointer = window.matchMedia("(pointer: coarse)").matches;

  if (memory <= 4 || cores <= 2 || coarsePointer) return "low";
  return "high";
}

// Detected once per page load; the result never changes afterwards.
let cached: DeviceTier | null = null;
const subscribe = () => () => {};
const getSnapshot = () => (cached ??= detect());
const getServerSnapshot = () => null;

/** null until hydrated on the client. */
export function useDeviceTier(): DeviceTier | null {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
