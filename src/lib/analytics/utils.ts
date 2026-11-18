import crypto from 'crypto';
import net from 'net';
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

  // The log is read back line by line, so a raw newline (even inside quotes)
  // would let a value forge extra rows. Collapse control characters to a space.
  const clean = String(value).replace(/\p{Cc}+/gu, ' ');

  if (clean.includes(',') || clean.includes('"')) {
    // Escape double quotes by doubling them
    const escaped = clean.replace(/"/g, '""');
    return `"${escaped}"`;
  }

  return clean;
}

/**
 * Reads a JSON object body, refusing anything larger than `maxBytes` (checked
 * while streaming, so a missing or false Content-Length cannot bypass it).
 * Returns null for oversized, malformed, or non-object bodies.
 */
export async function readJsonBody(request: Request, maxBytes: number): Promise<Record<string, unknown> | null> {
  const declaredLength = Number(request.headers.get('content-length'));
  if (declaredLength > maxBytes) {
    return null;
  }

  const reader = request.body?.getReader();
  if (!reader) {
    return null;
  }

  const chunks: Uint8Array[] = [];
  let size = 0;

  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;

    size += value.byteLength;
    if (size > maxBytes) {
      await reader.cancel();
      return null;
    }
    chunks.push(value);
  }

  try {
    const parsed: unknown = JSON.parse(Buffer.concat(chunks).toString('utf8'));
    if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
      return null;
    }
    return parsed as Record<string, unknown>;
  } catch {
    return null;
  }
}

export type GeoLocation = {
  country: string;
  city: string;
  state: string;
};

export async function getGeoLocation(ip: string): Promise<GeoLocation> {
  try {
    // Skip geolocation for local/unknown IPs.
    // The IP comes from a request header, so only ever put a well-formed address in the lookup URL
    if (
      net.isIP(ip) === 0 ||
      ip === '127.0.0.1' ||
      ip === '::1' ||
      ip.startsWith('192.168.') ||
      ip.startsWith('10.')
    ) {
      return { country: 'Unknown', city: 'Unknown', state: 'Unknown' };
    }

    const response = await fetch(`http://ip-api.com/json/${ip}?fields=status,country,regionName,city`, {
      signal: AbortSignal.timeout(2000), // 2 second timeout
    });

    if (!response.ok) {
      return { country: 'Unknown', city: 'Unknown', state: 'Unknown' };
    }

    const data = await response.json();

    if (data.status === 'success') {
      return {
        country: data.country || 'Unknown',
        city: data.city || 'Unknown',
        state: data.regionName || 'Unknown',
      };
    }

    return { country: 'Unknown', city: 'Unknown', state: 'Unknown' };
  } catch {
    // Fail silently
    return { country: 'Unknown', city: 'Unknown', state: 'Unknown' };
  }
}
