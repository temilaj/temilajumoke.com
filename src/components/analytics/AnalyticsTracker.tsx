'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

import { generateVistorId } from '@/lib/analytics/utils';

function getOrCreateVisitorId(): string {
  if (typeof window === 'undefined') return '';

  const key = 'analytics_visitor_id';
  let visitorId = localStorage.getItem(key);

  if (!visitorId) {
    visitorId = generateVistorId();
    localStorage.setItem(key, visitorId);
  }

  return visitorId;
}

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const trackedPaths = useRef(new Set<string>());

  useEffect(() => {
    // Skip if already tracked this path in this session
    if (trackedPaths.current.has(pathname)) return;

    const visitorId = getOrCreateVisitorId();
    const referrer = document.referrer || '';

    const trackPageView = async () => {
      try {
        await fetch('/api/analytics/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sessionId: visitorId,
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
