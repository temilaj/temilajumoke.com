export interface PageViewData {
  sessionId: string;
  path: string;
  referrer: string | null;
  userAgent: string;
  browser: string;
  deviceType: string;
  os: string;
  ipHash: string;
  timestamp: number;
}

export interface CSVRow {
  timestamp: number;
  session_id: string;
  path: string;
  referrer: string;
  user_agent: string;
  browser: string;
  device_type: string;
  os: string;
  ip_hash: string;
}

export interface AnalyticsStats {
  totalPageviews: number;
  uniqueVisitors: number;
  pageviewsByDay: Array<{ date: string; count: number }>;
}

export interface TopPage {
  path: string;
  views: number;
  unique_visitors: number;
}

export interface TopReferrer {
  referrer: string;
  count: number;
}

export interface DeviceStats {
  browsers: Array<{ browser: string; count: number }>;
  devices: Array<{ device_type: string; count: number }>;
  os: Array<{ os: string; count: number }>;
}
