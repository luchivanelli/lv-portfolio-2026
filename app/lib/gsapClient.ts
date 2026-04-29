export async function loadGsap(options?: { registerScrollTrigger?: boolean }) {
  const { registerScrollTrigger = false } = options ?? {};

  const gsapModule = await import("gsap");
  const gsap = (gsapModule as any).gsap ?? (gsapModule as any).default;
  if (!gsap) {
    throw new Error("No se pudo cargar GSAP");
  }

  let ScrollTrigger: any = null;
  if (registerScrollTrigger) {
    const scrollTriggerModule = await import("gsap/ScrollTrigger");
    ScrollTrigger = (scrollTriggerModule as any).ScrollTrigger ?? (scrollTriggerModule as any).default;
    if (ScrollTrigger && typeof gsap.registerPlugin === "function") {
      gsap.registerPlugin(ScrollTrigger);
    }
  }

  return { gsap, ScrollTrigger };
}
