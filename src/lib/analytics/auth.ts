import crypto from 'crypto';
import { cookies } from 'next/headers';

export const ANALYTICS_AUTH_COOKIE = 'analytics_auth';

/** Constant-time string comparison (hashing first so lengths never leak). */
export function safeEqual(a: string, b: string): boolean {
  const hashA = crypto.createHash('sha256').update(a).digest();
  const hashB = crypto.createHash('sha256').update(b).digest();
  return crypto.timingSafeEqual(hashA, hashB);
}

/**
 * The value stored in the auth cookie: a token derived from the API key, so the
 * key itself never leaves the server. Returns null (fail closed) when the key is
 * not configured.
 */
export function getSessionToken(): string | null {
  const apiKey = process.env.ANALYTICS_API_KEY;
  if (!apiKey) {
    return null;
  }
  return crypto.createHmac('sha256', apiKey).update('analytics-session-v1').digest('hex');
}

export async function isAnalyticsAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get(ANALYTICS_AUTH_COOKIE);
  const expectedToken = getSessionToken();

  if (!authCookie?.value || !expectedToken) {
    return false;
  }

  return safeEqual(authCookie.value, expectedToken);
}
