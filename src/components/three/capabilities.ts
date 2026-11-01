/**
 * Capability gating for the WebGL hero.
 *
 * The hero is decoration: it must never block reading the page, and it must
 * never be the reason a low-end device stutters. So we probe before mounting
 * and fall back to the CSS-only background when anything looks risky.
 */

export type Quality = 'off' | 'low' | 'high';

/** Does the browser actually give us a usable WebGL context? */
export function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext('webgl2') || canvas.getContext('webgl'))
    );
  } catch {
    return false;
  }
}

/**
 * Heuristic for how much scene to build.
 *
 * `deviceMemory` and `hardwareConcurrency` are the only cheap signals for
 * "this is a weak device" available before we allocate any GPU memory. They
 * are absent on Safari/Firefox, so absence is treated as capable rather than
 * as a reason to downgrade.
 */
export function detectQuality(): Quality {
  if (typeof window === 'undefined') return 'off';

  // An explicit user preference for less motion wins over everything.
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 'off';

  if (!supportsWebGL()) return 'off';

  const nav = navigator as Navigator & {
    deviceMemory?: number;
    connection?: { saveData?: boolean };
  };

  // Respect metered connections — this is a decorative payload.
  if (nav.connection?.saveData) return 'off';

  const cores = nav.hardwareConcurrency ?? 8;
  const memory = nav.deviceMemory ?? 8;
  const narrow = window.matchMedia('(max-width: 720px)').matches;

  if (cores <= 2 || memory <= 2) return 'off';
  if (narrow || cores <= 4 || memory <= 4) return 'low';

  return 'high';
}

/** Particle budget per quality tier. */
export const particleCount: Record<Quality, number> = {
  off: 0,
  low: 700,
  high: 2400,
};

/** Device pixel ratio ceiling per tier — the single biggest GPU cost lever. */
export const dprRange: Record<Quality, [number, number]> = {
  off: [1, 1],
  low: [1, 1.4],
  high: [1, 1.9],
};
