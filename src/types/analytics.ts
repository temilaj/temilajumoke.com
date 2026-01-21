export type PageViewData = {
  visitorId: string;
  sessionId: string;
  path: string;
  referrer: string | null;
  userAgent: string;
  browser: string;
  deviceType: string;
  os: string;
  ipHash: string;
  timestamp: number;
};

export type CSVRow = {
  timestamp: number;
  visitorId: string;
  sessionId: string;
  path: string;
  referrer: string;
  user_agent: string;
  browser: string;
  deviceType: string;
  os: string;
  ipHash: string;
};

export type AnalyticsStats = {
  totalPageviews: number;
  uniqueVisitors: number;
  uniqueSessions: number;
  returningVisitors: number;
  pageviewsByDay: Array<{ date: string; count: number }>;
};

export type TopPage = {
  path: string;
  views: number;
  uniqueVisitors: number;
};

export type TopReferrer = {
  referrer: string;
  count: number;
};

export type DeviceStats = {
  browsers: Array<{ browser: string; count: number }>;
  devices: Array<{ deviceType: string; count: number }>;
  os: Array<{ os: string; count: number }>;
};
