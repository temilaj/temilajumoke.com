import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import { ANALYTICS_AUTH_COOKIE, getSessionToken, safeEqual } from '@/lib/analytics/auth';
import { createRateLimiter } from '@/lib/analytics/rateLimit';
import { getClientIp, readJsonBody } from '@/lib/analytics/utils';

const MAX_BODY_BYTES = 1024;
const LOGIN_WINDOW_MS = 15 * 60 * 1000;
// Max 10 login attempts per 15 minutes per client IP
const isLoginAllowed = createRateLimiter(10, LOGIN_WINDOW_MS);

export async function POST(request: NextRequest) {
  try {
    if (!isLoginAllowed(getClientIp(request))) {
      return NextResponse.json(
        { error: 'Too many attempts' },
        { status: 429, headers: { 'Retry-After': String(LOGIN_WINDOW_MS / 1000) } }
      );
    }

    const body = await readJsonBody(request, MAX_BODY_BYTES);
    const apiKey = body?.apiKey;

    const expectedKey = process.env.ANALYTICS_API_KEY;
    const sessionToken = getSessionToken();

    if (!expectedKey || !sessionToken) {
      console.error('[Analytics Auth] ANALYTICS_API_KEY is not configured; rejecting login');
      return NextResponse.json({ error: 'Invalid API key' }, { status: 401 });
    }

    if (typeof apiKey !== 'string' || !apiKey || !safeEqual(apiKey, expectedKey)) {
      return NextResponse.json({ error: 'Invalid API key' }, { status: 401 });
    }

    // Set secure HTTP-only cookie holding a token derived from the key, never the key itself
    const cookieStore = await cookies();
    cookieStore.set(ANALYTICS_AUTH_COOKIE, sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Analytics Auth] Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
