import fs from 'fs';
import path from 'path';

import { escapeCSV } from '@/lib/analytics/utils';

const LOG_FILE_NAME = process.env.ANALYTICS_FILE_NAME!;
const LOG_FILE_PATH = path.join(process.cwd(), LOG_FILE_NAME);
const CSV_HEADER = 'timestamp,session_id,path,referrer,user_agent,browser,device_type,os,ip_hash\n';

export function initializeLogFile(): void {
  try {
    if (!fs.existsSync(LOG_FILE_PATH)) {
      fs.writeFileSync(LOG_FILE_PATH, CSV_HEADER, 'utf8');
      console.log('[Analytics] Initialized analytics log file');
    }
  } catch (error) {
    console.error('[Analytics] Failed to initialize log file:', error);
  }
}

export function appendToLog(
  timestamp: number,
  visitorId: string,
  pagePath: string,
  referrer: string,
  userAgent: string,
  browser: string,
  deviceType: string,
  os: string,
  ipHash: string
): void {
  try {
    if (!fs.existsSync(LOG_FILE_PATH)) {
      initializeLogFile();
    }

    // Build CSV line with proper escaping
    const line =
      [
        timestamp.toString(),
        visitorId,
        pagePath,
        escapeCSV(referrer || ''),
        escapeCSV(userAgent),
        browser,
        deviceType,
        os,
        ipHash,
      ].join(',') + '\n';

    // Append to file synchronously
    fs.appendFileSync(LOG_FILE_PATH, line, 'utf8');
  } catch (error) {
    console.error('[Analytics] Failed to append to log:', error);
  }
}

export function getLogFilePath(): string {
  return LOG_FILE_PATH;
}
