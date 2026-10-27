"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { afterLoadIdle } from "../../lib/idle";
import { useLanguage } from "../providers/LanguageProvider";

// The canvas never renders on the server: the page's HTML stays fully SEO-friendly.
const SceneCanvas = dynamic(() => import("./SceneCanvas"), { ssr: false });

export default function SceneLoader() {
  const { t } = useLanguage();
  const [ready, setReady] = useState(false);

  // three.js is only fetched after `load` + idle so it never competes with LCP.
  useEffect(() => afterLoadIdle(() => setReady(true)), []);

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-0 transition-opacity duration-[1400ms] ease-out ${ready ? "opacity-100" : "opacity-0"}`}
      role="img"
      aria-label={t.a11y.scene}
    >
      {ready && <SceneCanvas />}
    </div>
  );
}
