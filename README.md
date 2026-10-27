# Portfolio — Luciana Vanelli

Portfolio personal con una experiencia 3D ligada al scroll. Next.js 16 (App Router) + TypeScript, Tailwind CSS v4, React Three Fiber, GSAP ScrollTrigger y Lenis.

## Scripts

```bash
npm run dev     # next dev --webpack
npm run build   # next build --webpack
npm run start
npm run lint
```

El flag `--webpack` se mantiene a propósito: Turbopack dio errores de chunks/404 en este proyecto.

## Dónde está cada cosa

| Qué | Dónde |
| --- | --- |
| Contenido (proyectos, experiencia, stack, datos de contacto) | `app/lib/data.ts` |
| Textos de UI por idioma (botones, títulos de sección) | `app/lib/i18n.ts` |
| Design tokens (colores, fuentes) | `app/globals.css` (`@theme`) |
| Comportamiento del objeto 3D por sección | `app/lib/scene-config.ts` |
| Shaders | `app/components/scene/shaders.ts` |
| Objeto 3D y loop de render | `app/components/scene/Core.tsx` |
| Canvas, detección de dispositivo y fallback | `app/components/scene/SceneCanvas.tsx` |
| Scroll → escena (índices por sección/proyecto) | `app/components/motion/SceneScrollBridge.tsx` |
| Lenis + ScrollTrigger | `app/components/providers/SmoothScroll.tsx` |
| Reveal de secciones | `app/components/motion/use-reveal.ts` |
| Secciones de la página | `app/components/sections/*` |

## Cómo ajustar la escena

La escena es una figura geométrica (icosaedro facetado con luces y bordes) que al scrollear se disuelve en un campo de partículas que cubre la pantalla, y se recompone en Contacto. Todo lo que cambia entre secciones vive en `app/lib/scene-config.ts`:

- **`sceneKeyframes`**: un keyframe por sección (`inicio`, `experiencia`, `proyectos`, `stack`, `sobre-mi`, `contacto`). Cada uno define `position` y `scale` de la figura, `scatter` (0 figura sólida, 1 partículas a pantalla completa), `spin` (velocidad de giro) y `drift` (cuánto flotan las partículas). Los valores se interpolan entre secciones vecinas según el scroll.
- **`sectionAccents`**: color de acento por sección, en orden arcoíris desde el azul. Lo usan la figura, las partículas y toda la UI (`SceneScrollBridge` escribe `--color-accent` en `<html>`, y las utilidades `accent` de Tailwind lo leen). Mantener cada color con contraste ≥ 4.5:1 sobre `#0d0f0e`.
- **`PROJECT_FIELD_OFFSET`**: cuánto se inclina el campo de partículas hacia el lado de la imagen en cada proyecto.
- **`DAMPING`**: qué tan rápido la escena persigue su objetivo (más alto = más reactivo).
- **`POINTER_TILT`**: cuánto inclina el cursor a la figura, en radianes.
- **`MOBILE_X_FACTOR`**: cuánto se achica el desplazamiento horizontal en pantallas angostas.
- **`PARTICLE_COUNT`**: partículas por nivel de dispositivo. **`SURFACE`**: color base de la figura antes del tinte.

Material, luces y tamaño de partícula: `app/components/scene/Core.tsx` (`meshStandardMaterial`, `directionalLight`, `uPointSize`).

El orden de las secciones (y de los keyframes) sale de `sections` en `app/lib/data.ts`. Para agregar una sección: sumarla a `sections`, darle un `id` al `<section>`, y agregar su keyframe y su color.

Detalle de geometría y dpr según dispositivo: `app/lib/use-device-tier.ts` y `SceneCanvas.tsx`. Con `prefers-reduced-motion` la escena se renderiza una sola vez y Lenis se desactiva.

## Rendimiento y accesibilidad

- Una figura de 80 caras más un buffer de puntos con shader propio. Sin texturas, modelos ni sombras proyectadas.
- `dpr` limitado a `[1, 1.75]` (`[1, 1.5]` en gama baja), sin sombras, sin postprocesado.
- Dispositivos táctiles o con poca memoria reciben menos subdivisiones y sin antialias. Sin WebGL se muestra un fallback CSS.
- El HTML de todas las secciones se renderiza en el servidor; solo el canvas es client-only.
- Imágenes en WebP optimizadas con `next/image`. Metadata y Open Graph generados desde `data.ts` (`app/opengraph-image.tsx`).
