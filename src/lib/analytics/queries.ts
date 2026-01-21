import fs from 'fs';
import { getLogFilePath } from './storage';
import type { AnalyticsStats, TopPage, TopReferrer, DeviceStats, CSVRow } from '@/types/analytics';

function parseCSVLine(line: string): CSVRow | null {
  try {
    const values: string[] = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];

      if (char === '"') {
        if (inQuotes && line[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        values.push(current);
        current = '';
      } else {
        current += char;
      }
    }
    values.push(current);

    if (values.length !== 10) return null;

    return {
      timestamp: parseInt(values[0], 10),
      visitorId: values[1],
      sessionId: values[2],
      path: values[3],
      referrer: values[4],
      user_agent: values[5],
      browser: values[6],
      deviceType: values[7],
      os: values[8],
      ipHash: values[9],
    };
  } catch {
    return null;
  }
}

export function parseCSVLog(): CSVRow[] {
  try {
    const logPath = getLogFilePath();

    if (!fs.existsSync(logPath)) {
      return [];
    }

    const content = fs.readFileSync(logPath, 'utf8');
    const lines = content.split('\n').slice(1); // Skip header

    const rows: CSVRow[] = [];
    for (const line of lines) {
      if (line.trim()) {
        const row = parseCSVLine(line);
        if (row) {
          rows.push(row);
        }
      }
    }

    return rows;
  } catch (error) {
    console.error('[Analytics] Error parsing CSV log:', error);
    return [];
  }
}

export function getAnalyticsStats(days: number = 30, rows?: CSVRow[]): AnalyticsStats {
  const parsedRows = rows ?? parseCSVLog();
  const cutoff = Math.floor(Date.now() / 1000) - days * 24 * 60 * 60;

  const filteredRows = parsedRows.filter(row => row.timestamp > cutoff);

  const totalPageviews = filteredRows.length;

  const uniqueVisitorIds = new Set(filteredRows.map(row => row.visitorId));
  const uniqueVisitors = uniqueVisitorIds.size;

  const uniqueSessionIds = new Set(filteredRows.map(row => row.sessionId));
  const uniqueSessions = uniqueSessionIds.size;

  // Count returning visitors (visitors with more than one session)
  const visitorSessionMap = new Map<string, Set<string>>();
  for (const row of filteredRows) {
    if (!visitorSessionMap.has(row.visitorId)) {
      visitorSessionMap.set(row.visitorId, new Set());
    }
    visitorSessionMap.get(row.visitorId)!.add(row.sessionId);
  }
  let returningVisitors = 0;
  for (const sessions of visitorSessionMap.values()) {
    if (sessions.size > 1) {
      returningVisitors++;
    }
  }

  const dayMap = new Map<string, number>();
  for (const row of filteredRows) {
    const date = new Date(row.timestamp * 1000).toISOString().split('T')[0];
    dayMap.set(date, (dayMap.get(date) || 0) + 1);
  }

  const pageviewsByDay = Array.from(dayMap.entries())
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, days);

  return {
    totalPageviews,
    uniqueVisitors,
    uniqueSessions,
    returningVisitors,
    pageviewsByDay,
  };
}

export function getTopPages(days: number = 30, limit: number = 10, rows?: CSVRow[]): TopPage[] {
  const parsedRows = rows ?? parseCSVLog();
  const cutoff = Math.floor(Date.now() / 1000) - days * 24 * 60 * 60;

  const filteredRows = parsedRows.filter(row => row.timestamp > cutoff);

  const pageMap = new Map<string, { views: number; sessions: Set<string> }>();
  for (const row of filteredRows) {
    if (!pageMap.has(row.path)) {
      pageMap.set(row.path, { views: 0, sessions: new Set() });
    }
    const page = pageMap.get(row.path)!;
    page.views++;
    page.sessions.add(row.visitorId);
  }

  return Array.from(pageMap.entries())
    .map(([path, data]) => ({
      path,
      views: data.views,
      uniqueVisitors: data.sessions.size,
    }))
    .sort((a, b) => b.views - a.views)
    .slice(0, limit);
}

export function getTopReferrers(days: number = 30, limit: number = 10, rows?: CSVRow[]): TopReferrer[] {
  const parsedRows = rows ?? parseCSVLog();
  const cutoff = Math.floor(Date.now() / 1000) - days * 24 * 60 * 60;

  const filteredRows = parsedRows.filter(row => row.timestamp > cutoff && row.referrer);

  const referrerMap = new Map<string, number>();
  for (const row of filteredRows) {
    if (row.referrer) {
      referrerMap.set(row.referrer, (referrerMap.get(row.referrer) || 0) + 1);
    }
  }

  return Array.from(referrerMap.entries())
    .map(([referrer, count]) => ({ referrer, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}

export function getDeviceStats(days: number = 30, rows?: CSVRow[]): DeviceStats {
  const parsedRows = rows ?? parseCSVLog();
  const cutoff = Math.floor(Date.now() / 1000) - days * 24 * 60 * 60;

  const filteredRows = parsedRows.filter(row => row.timestamp > cutoff);

  const browserMap = new Map<string, number>();
  const deviceMap = new Map<string, number>();
  const osMap = new Map<string, number>();

  for (const row of filteredRows) {
    browserMap.set(row.browser, (browserMap.get(row.browser) || 0) + 1);
    deviceMap.set(row.deviceType, (deviceMap.get(row.deviceType) || 0) + 1);
    osMap.set(row.os, (osMap.get(row.os) || 0) + 1);
  }

  return {
    browsers: Array.from(browserMap.entries())
      .map(([browser, count]) => ({ browser, count }))
      .sort((a, b) => b.count - a.count),
    devices: Array.from(deviceMap.entries())
      .map(([deviceType, count]) => ({ deviceType, count }))
      .sort((a, b) => b.count - a.count),
    os: Array.from(osMap.entries())
      .map(([os, count]) => ({ os, count }))
      .sort((a, b) => b.count - a.count),
  };
}
