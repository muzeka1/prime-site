"use client";

import { ReactLenis } from "lenis/react";
import { ReactNode } from "react";

export default function LenisProvider({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.05,
        smoothWheel: true,
        syncTouch: true,
        touchMultiplier: 35,
        duration: 1.2,
      }}
    >
      {children}
    </ReactLenis>
  );
}