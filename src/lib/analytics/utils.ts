import crypto from 'crypto';
import { UAParser } from 'ua-parser-js';

export function hashIp(ip: string): string {
  const salt = process.env.ANALYTICS_SALT!;
  return crypto
    .createHash('sha256')
    .update(ip + salt)
    .digest('hex');
}

export function parseUserAgent(ua: string) {
  const parser = new UAParser(ua);
  return {
    browser: parser.getBrowser().name || 'Unknown',
    os: parser.getOS().name || 'Unknown',
    deviceType: parser.getDevice().type || 'desktop',
  };
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');

  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  if (realIp) {
    return realIp;
  }

  return 'unknown';
}

export function generateVistorId(): string {
  return crypto.randomUUID();
}

export function escapeCSV(value: string): string {
  if (!value) return '';

  if (value.includes(',') || value.includes('"') || value.includes('\n') || value.includes('\r')) {
    // Escape double quotes by doubling them
    const escaped = value.replace(/"/g, '""');
    return `"${escaped}"`;
  }

  return value;
}
