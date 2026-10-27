import { ImageResponse } from "next/og";
import { personal, stack } from "./lib/data";
import { sectionAccents } from "./lib/scene-config";

const accent = sectionAccents.inicio;

export const alt = `${personal.name} — ${personal.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Without a browser user agent Google serves TTF, which is the format satori can read.
async function loadGoogleFont(family: string, weight: number): Promise<ArrayBuffer | null> {
  try {
    const css = await (await fetch(`https://fonts.googleapis.com/css2?family=${family}:wght@${weight}`)).text();
    const match = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/);
    if (!match) return null;
    const res = await fetch(match[1]);
    return res.ok ? res.arrayBuffer() : null;
  } catch {
    return null;
  }
}

export default async function OpenGraphImage() {
  const mono = await loadGoogleFont("Space+Mono", 700);
  const highlights = stack.Frontend.slice(0, 6);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(135deg, #0d0f0e 0%, #131614 60%, #0d0f0e 100%)",
          color: "#e8ede9",
          fontFamily: mono ? "Space Mono" : "monospace",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, color: accent, fontSize: 24, letterSpacing: 6 }}>
          <div style={{ width: 14, height: 14, borderRadius: 999, background: accent }} />
          {personal.role.toUpperCase()}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 88, fontWeight: 700, lineHeight: 1 }}>{personal.name}</div>
          <div style={{ fontSize: 34, color: "#8a9990" }}>{personal.headline}</div>
        </div>
        <div style={{ display: "flex", gap: 14 }}>
          {highlights.map((tech) => (
            <div
              key={tech}
              style={{
                border: `1px solid ${accent}60`,
                background: `${accent}12`,
                color: accent,
                padding: "10px 18px",
                fontSize: 22,
                borderRadius: 4,
              }}
            >
              {tech}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: mono ? [{ name: "Space Mono", data: mono, weight: 700, style: "normal" }] : undefined,
    }
  );
}
