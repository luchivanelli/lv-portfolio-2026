"use client";

import { useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import Core from "./Core";
import SceneFallback from "./SceneFallback";
import { scrollState } from "../../lib/scroll-state";
import { useDeviceTier } from "../../lib/use-device-tier";
import { useReducedMotion } from "../../lib/use-reduced-motion";

export default function SceneCanvas() {
  const tier = useDeviceTier();
  const reduced = useReducedMotion();

  // Pointer parallax only for fine pointers (mouse / trackpad).
  useEffect(() => {
    if (reduced || !window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => {
      scrollState.pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      scrollState.pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    const onLeave = () => {
      scrollState.pointer.x = 0;
      scrollState.pointer.y = 0;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [reduced]);

  if (tier === null) return null;
  if (tier === "none") return <SceneFallback />;

  return (
    <Canvas
      dpr={tier === "high" ? [1, 1.75] : [1, 1.5]}
      camera={{ fov: 40, position: [0, 0, 6], near: 0.1, far: 30 }}
      // Continuous rendering keeps the particle drift smooth on every device;
      // with reduced motion the scene renders a single static frame.
      frameloop={reduced ? "demand" : "always"}
      gl={{
        antialias: tier === "high",
        alpha: true,
        powerPreference: "high-performance",
        stencil: false,
      }}
      // The canvas is fixed: never re-measure it on scroll (saves layout reads while scrolling).
      resize={{ scroll: false, debounce: { scroll: 50, resize: 0 } }}
      className="h-full w-full"
    >
      <Core key={tier} tier={tier} reduced={reduced} />
    </Canvas>
  );
}
