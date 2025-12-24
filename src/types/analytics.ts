export interface PageViewData {
  visitorId: string;
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
  visitorId: string;
  path: string;
  referrer: string;
  user_agent: string;
  browser: string;
  deviceType: string;
  os: string;
  ipHash: string;
}

export interface AnalyticsStats {
  totalPageviews: number;
  uniqueVisitors: number;
  pageviewsByDay: Array<{ date: string; count: number }>;
}

export interface TopPage {
  path: string;
  views: number;
  uniqueVisitors: number;
}

export interface TopReferrer {
  referrer: string;
  count: number;
}

export interface DeviceStats {
  browsers: Array<{ browser: string; count: number }>;
  devices: Array<{ deviceType: string; count: number }>;
  os: Array<{ os: string; count: number }>;
}
