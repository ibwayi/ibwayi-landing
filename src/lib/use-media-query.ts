"use client";

import { useEffect, useState } from "react";

/**
 * Returns true when the given CSS media query matches. SSR-safe: returns
 * `false` during the first render (server + client mount) and only updates
 * after the effect runs. Callers should design for the false-first case
 * (e.g. assume desktop layout in SSR, flip to mobile after mount).
 *
 * Reasoning: returning a "best-guess" value on SSR causes hydration
 * mismatches; matchMedia isn't available on the server.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const update = () => setMatches(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, [query]);

  return matches;
}
