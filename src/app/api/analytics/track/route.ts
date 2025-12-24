import { NextRequest, NextResponse } from 'next/server';

import { trackPageView } from '@/lib/analytics/tracker';
import { hashIp, parseUserAgent, getClientIp } from '@/lib/analytics/utils';

const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT = 100; // Max 100 requests per minute per IP
const RATE_WINDOW = 60 * 1000; // 1 minute

function checkRateLimit(ipHash: string): boolean {
  const now = Date.now();
  const requests = rateLimitMap.get(ipHash) || [];

  // Remove old requests outside window
  const recentRequests = requests.filter(time => now - time < RATE_WINDOW);

  if (recentRequests.length >= RATE_LIMIT) {
    return false;
  }

  recentRequests.push(now);
  rateLimitMap.set(ipHash, recentRequests);

  // Cleanup old entries every 1000 requests
  if (rateLimitMap.size > 1000) {
    for (const [key, times] of rateLimitMap.entries()) {
      if (times.every(t => now - t > RATE_WINDOW)) {
        rateLimitMap.delete(key);
      }
    }
  }

  return true;
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP and hash it
    const clientIp = getClientIp(request);
    const ipHash = hashIp(clientIp);

    if (!checkRateLimit(ipHash)) {
      return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
    }

    const body = await request.json();
    const { visitorId, path, referrer } = body;

    if (!visitorId || !path) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(visitorId)) {
      return NextResponse.json({ error: 'Invalid session ID' }, { status: 400 });
    }

    if (!path.startsWith('/') || path.length > 500) {
      return NextResponse.json({ error: 'Invalid path' }, { status: 400 });
    }

    const userAgent = request.headers.get('user-agent') || 'Unknown';
    const { browser, os, deviceType } = parseUserAgent(userAgent);

    // Track the pageview
    trackPageView({
      visitorId,
      path,
      referrer: referrer || null,
      userAgent,
      browser,
      deviceType,
      os,
      ipHash,
      timestamp: Math.floor(Date.now() / 1000),
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('[Analytics] Track error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
