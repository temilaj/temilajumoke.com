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

export type GeoLocation = {
  country: string;
  city: string;
};

export async function getGeoLocation(ip: string): Promise<GeoLocation> {
  try {
    // Skip geolocation for local/unknown IPs
    if (ip === 'unknown' || ip === '127.0.0.1' || ip.startsWith('192.168.') || ip.startsWith('10.')) {
      return { country: 'Unknown', city: 'Unknown' };
    }

    const response = await fetch(`http://ip-api.com/json/${ip}?fields=status,country,city`, {
      signal: AbortSignal.timeout(2000), // 2 second timeout
    });

    if (!response.ok) {
      return { country: 'Unknown', city: 'Unknown' };
    }

    const data = await response.json();

    if (data.status === 'success') {
      return {
        country: data.country || 'Unknown',
        city: data.city || 'Unknown',
      };
    }

    return { country: 'Unknown', city: 'Unknown' };
  } catch {
    // Fail silently
    return { country: 'Unknown', city: 'Unknown' };
  }
}
