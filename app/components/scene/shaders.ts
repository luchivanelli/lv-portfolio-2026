/**
 * Particle shaders. Each particle starts on the figure's surface (`position`,
 * transformed by the figure's world matrix) and flies to a point of a
 * viewport-filling box (`aTarget`) as uScatter goes 0 → 1.
 */
export const particlesVertex = /* glsl */ `
attribute vec3 aTarget;
attribute float aSeed;

uniform mat4 uFigureMatrix;
uniform float uScatter;
uniform float uTime;
uniform float uDrift;
uniform float uHalfW;
uniform float uHalfH;
uniform vec2 uFieldOffset;
uniform float uPixelRatio;
uniform float uPointSize;

varying float vAlpha;
varying float vSeed;

void main() {
  vec3 onFigure = (uFigureMatrix * vec4(position, 1.0)).xyz;

  // Target box: x/y are scaled by depth so the field covers the viewport at any z.
  float z = mix(-3.0, 1.2, aTarget.z);
  float depthScale = (6.0 - z) / 6.0;
  vec3 field = vec3(
    (aTarget.x * uHalfW + uFieldOffset.x) * depthScale,
    (aTarget.y * uHalfH + uFieldOffset.y) * depthScale,
    z
  );
  float phase = aSeed * 6.2831;
  field += uDrift * vec3(
    sin(uTime * 0.30 + phase) * 0.18,
    cos(uTime * 0.23 + phase * 2.0) * 0.18,
    sin(uTime * 0.17 + phase * 3.0) * 0.12
  );

  float t = smoothstep(0.0, 1.0, uScatter);
  // Each particle leaves a little later than its neighbour: the figure "peels" apart.
  float tt = smoothstep(0.0, 1.0, (t - aSeed * 0.25) / 0.75);
  vec3 p = mix(onFigure, field, tt);

  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  float size = uPointSize * (0.55 + aSeed * 0.9) * uPixelRatio;
  gl_PointSize = size * 6.0 / -mv.z;

  float depthFade = clamp((mv.z + 10.5) / 7.0, 0.35, 1.0);
  vAlpha = mix(0.4, 0.9, tt) * depthFade;
  vSeed = aSeed;
  gl_Position = projectionMatrix * mv;
}
`;

export const particlesFragment = /* glsl */ `
uniform vec3 uColor;
varying float vAlpha;
varying float vSeed;

void main() {
  vec2 c = gl_PointCoord - 0.5;
  float d = length(c);
  if (d > 0.5) discard;
  float soft = smoothstep(0.5, 0.12, d);
  vec3 col = mix(uColor, vec3(1.0), vSeed * 0.3);
  gl_FragColor = vec4(col, vAlpha * soft);
}
`;
