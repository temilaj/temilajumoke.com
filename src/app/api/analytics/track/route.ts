import { NextRequest, NextResponse } from 'next/server';

import { trackPageView } from '@/lib/analytics/tracker';
import { createRateLimiter } from '@/lib/analytics/rateLimit';
import { hashIp, parseUserAgent, getClientIp, getGeoLocation, readJsonBody } from '@/lib/analytics/utils';

const MAX_BODY_BYTES = 4096;
const MAX_PATH_LENGTH = 500;
const MAX_REFERRER_LENGTH = 1000;
const MAX_USER_AGENT_LENGTH = 512;

// Max 100 requests per minute per IP
const isTrackAllowed = createRateLimiter(100, 60 * 1000);

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const CONTROL_CHARS = /\p{Cc}/u;

export async function POST(request: NextRequest) {
  try {
    const clientIp = getClientIp(request);
    const ipHash = hashIp(clientIp);

    if (!isTrackAllowed(ipHash)) {
      return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
    }

    const body = await readJsonBody(request, MAX_BODY_BYTES);
    if (!body) {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    const { visitorId, sessionId, path, referrer } = body;

    if (!visitorId || !path || !sessionId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (typeof visitorId !== 'string' || !UUID_REGEX.test(visitorId)) {
      return NextResponse.json({ error: 'Invalid visitor ID' }, { status: 400 });
    }

    if (typeof sessionId !== 'string' || !UUID_REGEX.test(sessionId)) {
      return NextResponse.json({ error: 'Invalid session ID' }, { status: 400 });
    }

    if (
      typeof path !== 'string' ||
      !path.startsWith('/') ||
      path.length > MAX_PATH_LENGTH ||
      CONTROL_CHARS.test(path)
    ) {
      return NextResponse.json({ error: 'Invalid path' }, { status: 400 });
    }

    if (referrer != null && typeof referrer !== 'string') {
      return NextResponse.json({ error: 'Invalid referrer' }, { status: 400 });
    }

    const userAgent = (request.headers.get('user-agent') || 'Unknown').slice(0, MAX_USER_AGENT_LENGTH);
    const { browser, os, deviceType } = parseUserAgent(userAgent);

    // Get geolocation from IP
    const { country, city, state } = await getGeoLocation(clientIp);

    // Track the pageview
    trackPageView({
      visitorId,
      sessionId,
      path,
      referrer: referrer ? referrer.slice(0, MAX_REFERRER_LENGTH) : null,
      userAgent,
      browser,
      deviceType,
      os,
      ipHash,
      country,
      city,
      state,
      timestamp: Math.floor(Date.now() / 1000),
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('[Analytics] Track error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
