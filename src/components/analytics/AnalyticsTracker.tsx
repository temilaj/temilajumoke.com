'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

// Session ID stored in sessionStorage
function getOrCreateSessionId(): string {
  if (typeof window === 'undefined') return '';

  const key = 'analytics_session_id';
  let sessionId = sessionStorage.getItem(key);

  if (!sessionId) {
    sessionId = crypto.randomUUID();
    sessionStorage.setItem(key, sessionId);
  }

  return sessionId;
}

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const trackedPaths = useRef(new Set<string>());

  useEffect(() => {
    // Skip if already tracked this path in this session
    if (trackedPaths.current.has(pathname)) return;

    const sessionId = getOrCreateSessionId();
    const referrer = document.referrer || '';

    // Send tracking request asynchronously (non-blocking)
    const trackPageView = async () => {
      try {
        await fetch('/api/analytics/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sessionId,
            path: pathname,
            referrer,
          }),
          // Use keepalive to ensure request completes even if page unloads
          keepalive: true,
        });

        trackedPaths.current.add(pathname);
      } catch (error) {
        console.debug('Analytics tracking failed:', error);
      }
    };

    // Track after a small delay to avoid blocking initial render
    const timeoutId = setTimeout(trackPageView, 100);

    return () => clearTimeout(timeoutId);
  }, [pathname]);

  // no need to render here
  return null;
}
