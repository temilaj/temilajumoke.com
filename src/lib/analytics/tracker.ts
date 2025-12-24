import { appendToLog } from '@/lib/analytics/storage';
import type { PageViewData } from '@/types/analytics';

export function trackPageView(data: PageViewData): void {
  try {
    appendToLog(
      data.timestamp,
      data.visitorId,
      data.path,
      data.referrer || '',
      data.userAgent,
      data.browser,
      data.deviceType,
      data.os,
      data.ipHash
    );
  } catch (error) {
    console.error('[Analytics] Error tracking pageview:', error);
  }
}
