/**
 * In-memory sliding-window rate limiter. State is per server process, which is
 * fine for a single `next start` instance; it resets on restart.
 */
export function createRateLimiter(limit: number, windowMs: number, maxKeys = 5000) {
  const hits = new Map<string, number[]>();

  return function isAllowed(key: string): boolean {
    const now = Date.now();
    const recent = (hits.get(key) ?? []).filter(time => now - time < windowMs);

    if (recent.length >= limit) {
      hits.set(key, recent);
      return false;
    }

    recent.push(now);
    // Re-insert so the Map's iteration order tracks least-recently-seen keys.
    hits.delete(key);
    hits.set(key, recent);

    // Keep memory bounded even if callers rotate keys (e.g. spoofed IP headers).
    if (hits.size > maxKeys) {
      for (const [otherKey, times] of hits) {
        if (times.every(time => now - time >= windowMs)) {
          hits.delete(otherKey);
        }
      }
      for (const otherKey of hits.keys()) {
        if (hits.size <= maxKeys) break;
        hits.delete(otherKey);
      }
    }

    return true;
  };
}
