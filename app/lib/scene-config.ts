import { sections, type SectionId } from "./data";

/**
 * Scene behaviour per section. Values are interpolated between neighbouring
 * sections as the user scrolls, then damped in the render loop.
 *
 * - position: where the solid figure sits (world units). The camera is at z=6
 *   with a 40° fov, so on a 16:9 screen x≈±3.9 is the viewport edge. On narrow
 *   screens x is multiplied by MOBILE_X_FACTOR so the figure stays centred.
 * - scale: size of the figure (1 = hero size).
 * - scatter: 0 = solid figure, 1 = particles spread across the whole viewport.
 *   The figure fades out and grows while scatter rises.
 * - spin: base rotation speed of the figure in rad/s.
 * - drift: how much the particle field floats around when fully scattered.
 */
export type SceneKeyframe = {
  position: [number, number, number];
  scale: number;
  scatter: number;
  spin: number;
  drift: number;
};

export const sceneKeyframes: Record<SectionId, SceneKeyframe> = {
  inicio: { position: [2.0, 0.1, 0], scale: 1, scatter: 0, spin: 0.18, drift: 0.2 },
  experiencia: { position: [0, 0, -1], scale: 1.2, scatter: 1, spin: 0.1, drift: 0.6 },
  proyectos: { position: [0, 0, -1], scale: 1.2, scatter: 1, spin: 0.1, drift: 0.5 },
  stack: { position: [0, 0, -1], scale: 1.2, scatter: 1, spin: 0.1, drift: 1 },
  "sobre-mi": { position: [0, 0, -1], scale: 1.2, scatter: 1, spin: 0.1, drift: 0.6 },
  contacto: { position: [0, 0.35, 0], scale: 0.95, scatter: 0, spin: 0.22, drift: 0.2 },
};

/**
 * Accent colour per section, in rainbow order starting from blue. Buttons,
 * labels, the figure and the particles all follow it (see SceneScrollBridge,
 * which writes --color-accent on <html>). Keep every stop ≥ 4.5:1 on #0d0f0e.
 */
export const sectionAccents: Record<SectionId, string> = {
  inicio: "#60a5fa",
  experiencia: "#a78bfa",
  proyectos: "#f472b6",
  stack: "#fb923c",
  "sobre-mi": "#facc15",
  contacto: "#4ade80",
};

export type RGB = [number, number, number];

const hexToRgb = (hex: string): RGB => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255) as RGB;
const accentStops: RGB[] = sections.map((s) => hexToRgb(sectionAccents[s.id]));
const smooth = (t: number) => t * t * (3 - 2 * t);

/**
 * Accent colour (sRGB, 0..1) for a float section index (2.4 = 40% between
 * section 2 and 3). Kept free of three.js so the page bundle stays small.
 */
export function accentAt(sectionIndex: number, out: RGB = [0, 0, 0]): RGB {
  const last = accentStops.length - 1;
  const s = Math.min(Math.max(sectionIndex, 0), last);
  const i = Math.min(last - 1, Math.floor(s));
  const f = smooth(s - i);
  const a = accentStops[i];
  const b = accentStops[i + 1];
  for (let k = 0; k < 3; k++) out[k] = a[k] + (b[k] - a[k]) * f;
  return out;
}

export const rgbToCss = ([r, g, b]: RGB) => `rgb(${Math.round(r * 255)} ${Math.round(g * 255)} ${Math.round(b * 255)})`;

/** Horizontal particle-field pull while inside the projects section (alternates per project). */
export const PROJECT_FIELD_OFFSET = 0.9;

/** Horizontal positions are squeezed on narrow viewports (aspect < 1). */
export const MOBILE_X_FACTOR = 0.25;

/** How fast values chase their targets (higher = snappier). */
export const DAMPING = 3;

/** Max pointer parallax in radians. */
export const POINTER_TILT = 0.3;

/** Number of particles per device tier. */
export const PARTICLE_COUNT = { high: 3600, low: 1500 } as const;

/** Base colour of the solid figure before the accent tint. */
export const SURFACE = "#161a18";
