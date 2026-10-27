"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  EdgesGeometry,
  IcosahedronGeometry,
  MathUtils,
  Matrix4,
  SRGBColorSpace,
  Sphere,
  Vector3,
  type DirectionalLight,
  type Group,
  type LineBasicMaterial,
  type MeshStandardMaterial,
  type ShaderMaterial,
} from "three";
import { sections } from "../../lib/data";
import {
  DAMPING,
  MOBILE_X_FACTOR,
  PARTICLE_COUNT,
  POINTER_TILT,
  PROJECT_FIELD_OFFSET,
  SURFACE,
  accentAt,
  sceneKeyframes,
  type RGB,
  type SceneKeyframe,
} from "../../lib/scene-config";
import { scrollState } from "../../lib/scroll-state";
import { particlesFragment, particlesVertex } from "./shaders";

type Props = {
  tier: "high" | "low";
  reduced: boolean;
};

const keyframes: SceneKeyframe[] = sections.map((s) => sceneKeyframes[s.id]);
const PROJECTS_INDEX = sections.findIndex((s) => s.id === "proyectos");
const first = keyframes[0];
const smooth = (t: number) => t * t * (3 - 2 * t);

/** Particles start on the icosahedron's surface and own a random viewport target. */
function createParticles(count: number) {
  const onFigure = new Float32Array(count * 3);
  const target = new Float32Array(count * 3);
  const seed = new Float32Array(count);
  const v = new Vector3();
  for (let i = 0; i < count; i++) {
    // Uniform direction on the sphere, radius jittered so the surface sparkles.
    const u = Math.random() * 2 - 1;
    const phi = Math.random() * Math.PI * 2;
    const r = Math.sqrt(1 - u * u);
    v.set(r * Math.cos(phi), r * Math.sin(phi), u).multiplyScalar(0.97 + Math.random() * 0.08);
    onFigure.set([v.x, v.y, v.z], i * 3);
    target.set([Math.random() * 2.3 - 1.15, Math.random() * 2.3 - 1.15, Math.random()], i * 3);
    seed[i] = Math.random();
  }
  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new BufferAttribute(onFigure, 3));
  geometry.setAttribute("aTarget", new BufferAttribute(target, 3));
  geometry.setAttribute("aSeed", new BufferAttribute(seed, 1));
  geometry.boundingSphere = new Sphere(new Vector3(), 20);
  return geometry;
}

/**
 * Hero: a lit, flat-shaded icosahedron with crisp edges.
 * Scroll: the figure grows and fades while its surface particles fly out to
 * fill the viewport as a slowly drifting background field. Everything is
 * tinted with the section accent (see accentAt). Mount with `key={tier}`.
 */
export default function Core({ tier, reduced }: Props) {
  const figure = useRef<Group>(null);
  const bodyMat = useRef<MeshStandardMaterial>(null);
  const edgeMat = useRef<LineBasicMaterial>(null);
  const keyLight = useRef<DirectionalLight>(null);
  const particleMat = useRef<ShaderMaterial>(null);
  const { viewport, invalidate } = useThree();

  const geometries = useMemo(() => {
    const body = new IcosahedronGeometry(1, 1);
    return { body, edges: new EdgesGeometry(body, 1), particles: createParticles(PARTICLE_COUNT[tier]) };
  }, [tier]);
  useEffect(() => () => Object.values(geometries).forEach((g) => g.dispose()), [geometries]);

  const uniforms = useMemo(
    () => ({
      uFigureMatrix: { value: new Matrix4() },
      uScatter: { value: first.scatter },
      uTime: { value: 0 },
      uDrift: { value: first.drift },
      uHalfW: { value: 4 },
      uHalfH: { value: 2.2 },
      uFieldOffset: { value: [0, 0] as [number, number] },
      uPixelRatio: { value: 1 },
      uPointSize: { value: tier === "high" ? 3.2 : 3.8 },
      uColor: { value: new Color(...accentAt(0)) },
    }),
    [tier]
  );

  const colors = useMemo(
    () => ({ accent: new Color(), surface: new Color(SURFACE), body: new Color(), rgb: [0, 0, 0] as RGB }),
    []
  );

  // Damped values the scene is currently at.
  const current = useRef({
    x: first.position[0],
    y: first.position[1],
    z: first.position[2],
    scale: first.scale,
    scatter: first.scatter,
    drift: first.drift,
    section: 0,
    fieldX: 0,
    tiltX: 0,
    tiltY: 0,
    spinX: 0,
    spinY: 0,
    time: 0,
  });

  // On-demand mode (low tier / reduced motion): render once now, then only when
  // scroll or pointer input arrives and until the damping settles.
  const onDemand = reduced || tier === "low";
  useEffect(() => {
    if (!onDemand) return;
    invalidate();
    if (reduced) return;
    const wake = () => invalidate();
    window.addEventListener("scroll", wake, { passive: true });
    window.addEventListener("pointermove", wake, { passive: true });
    return () => {
      window.removeEventListener("scroll", wake);
      window.removeEventListener("pointermove", wake);
    };
  }, [onDemand, reduced, invalidate]);

  useFrame((state, delta) => {
    const g = figure.current;
    if (!g) return;
    const dt = Math.min(delta, 1 / 20);
    const c = current.current;

    // --- targets from scroll position --------------------------------------
    const s = MathUtils.clamp(scrollState.section, 0, keyframes.length - 1);
    const i = Math.min(keyframes.length - 2, Math.floor(s));
    const f = smooth(s - i);
    const a = keyframes[i];
    const b = keyframes[i + 1];

    const xFactor = viewport.aspect < 1 ? MOBILE_X_FACTOR : viewport.aspect < 1.3 ? 0.6 : 1;
    const tx = MathUtils.lerp(a.position[0], b.position[0], f) * xFactor;
    const ty = MathUtils.lerp(a.position[1], b.position[1], f);
    const tz = MathUtils.lerp(a.position[2], b.position[2], f);
    const tScale = MathUtils.lerp(a.scale, b.scale, f) * (viewport.aspect < 1 ? 0.8 : 1);
    const tScatter = MathUtils.lerp(a.scatter, b.scatter, f);
    const tDrift = MathUtils.lerp(a.drift, b.drift, f);
    const spin = MathUtils.lerp(a.spin, b.spin, f);

    // Inside the projects section the field leans towards each project's image side.
    const projectWeight = 1 - Math.min(1, Math.abs(s - PROJECTS_INDEX));
    const tFieldX = projectWeight > 0 ? Math.cos(scrollState.project * Math.PI) * PROJECT_FIELD_OFFSET * xFactor * projectWeight : 0;

    // --- damping ------------------------------------------------------------
    const damp = (from: number, to: number) => (reduced ? to : MathUtils.damp(from, to, DAMPING, dt));
    c.x = damp(c.x, tx);
    c.y = damp(c.y, ty);
    c.z = damp(c.z, tz);
    c.scale = damp(c.scale, tScale);
    c.scatter = damp(c.scatter, tScatter);
    c.drift = damp(c.drift, tDrift);
    c.section = damp(c.section, s);
    c.fieldX = damp(c.fieldX, tFieldX);

    const pointerX = reduced ? 0 : scrollState.pointer.x;
    const pointerY = reduced ? 0 : scrollState.pointer.y;
    c.tiltY = damp(c.tiltY, pointerX * POINTER_TILT);
    c.tiltX = damp(c.tiltX, -pointerY * POINTER_TILT * 0.6);

    if (!reduced) {
      const velocityBoost = MathUtils.clamp(scrollState.velocity / 2500, -1.5, 1.5);
      c.spinY += (spin + velocityBoost * 0.5) * dt;
      c.spinX += spin * 0.4 * dt;
      c.time += dt * (1 + Math.abs(velocityBoost) * 0.6);

      if (onDemand) {
        const settled =
          Math.abs(c.x - tx) + Math.abs(c.y - ty) + Math.abs(c.z - tz) + Math.abs(c.scale - tScale) < 0.002 &&
          Math.abs(c.scatter - tScatter) + Math.abs(c.section - s) + Math.abs(c.fieldX - tFieldX) < 0.005 &&
          Math.abs(c.tiltY - pointerX * POINTER_TILT) + Math.abs(c.tiltX + pointerY * POINTER_TILT * 0.6) < 0.002 &&
          Math.abs(scrollState.velocity) < 1;
        if (!settled) invalidate();
      }
    }

    // --- apply: figure --------------------------------------------------------
    const dissolve = smooth(MathUtils.clamp(c.scatter / 0.65, 0, 1)); // 1 = fully gone
    g.position.set(c.x, c.y, c.z);
    g.scale.setScalar(c.scale * (1 + c.scatter * 1.8));
    g.rotation.set(c.spinX + c.tiltX, c.spinY + c.tiltY, 0);
    g.updateMatrixWorld();

    const [r, gg, bb] = accentAt(c.section, colors.rgb);
    colors.accent.setRGB(r, gg, bb, SRGBColorSpace);
    const body = bodyMat.current;
    if (body) {
      body.color.copy(colors.body.copy(colors.surface).lerp(colors.accent, 0.14));
      body.emissive.copy(colors.accent);
      body.opacity = 0.86 * (1 - dissolve);
      body.visible = dissolve < 0.999;
    }
    const edges = edgeMat.current;
    if (edges) {
      edges.color.copy(colors.accent);
      edges.opacity = 0.85 * (1 - dissolve);
      edges.visible = dissolve < 0.999;
    }
    if (keyLight.current) keyLight.current.color.copy(colors.accent);

    // --- apply: particles -----------------------------------------------------
    const pm = particleMat.current;
    if (pm) {
      const u = pm.uniforms as typeof uniforms;
      u.uFigureMatrix.value.copy(g.matrixWorld);
      u.uScatter.value = c.scatter;
      u.uTime.value = c.time;
      u.uDrift.value = c.drift;
      u.uHalfW.value = viewport.width / 2;
      u.uHalfH.value = viewport.height / 2;
      u.uFieldOffset.value[0] = c.fieldX;
      u.uPixelRatio.value = state.gl.getPixelRatio();
      u.uColor.value.copy(colors.accent);
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight ref={keyLight} position={[3, 4, 5]} intensity={1.7} />
      <directionalLight position={[-4, -2, -3]} intensity={0.8} color="#ffffff" />

      <group ref={figure}>
        <mesh geometry={geometries.body}>
          <meshStandardMaterial
            ref={bodyMat}
            flatShading
            transparent
            metalness={0.3}
            roughness={0.5}
            emissiveIntensity={0.1}
          />
        </mesh>
        <lineSegments geometry={geometries.edges}>
          <lineBasicMaterial ref={edgeMat} transparent />
        </lineSegments>
      </group>

      <points geometry={geometries.particles} frustumCulled={false}>
        <shaderMaterial
          ref={particleMat}
          uniforms={uniforms}
          vertexShader={particlesVertex}
          fragmentShader={particlesFragment}
          transparent
          depthWrite={false}
          blending={AdditiveBlending}
        />
      </points>
    </>
  );
}
