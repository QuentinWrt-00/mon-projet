"use client";

import { useEffect, useRef, useState } from "react";

/** Masque le header au scroll vers le bas, le réaffiche vers le haut. */
export function useScrollHeaderVisibility() {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;

      if (current <= 0) {
        setIsVisible(true);
        lastScrollY.current = 0;
        return;
      }

      if (current > lastScrollY.current) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      lastScrollY.current = current;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return isVisible;
}
