import type { NextConfig } from 'next';

const isDev = process.env.NODE_ENV !== 'production';

// 'unsafe-inline' is required because the prerendered pages rely on Next's inline
// bootstrap scripts (a nonce-based policy would force every page to render dynamically).
// The policy still limits where scripts, data and frames may come from.
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  // cdn.jsdelivr.net serves the world map data for the analytics dashboard
  `connect-src 'self' https://cdn.jsdelivr.net${isDev ? ' ws: wss:' : ''}`,
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join('; ');

const securityHeaders = [
  { key: 'Content-Security-Policy', value: contentSecurityPolicy },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()' },
  // 180 days, this host only (no includeSubDomains / preload)
  { key: 'Strict-Transport-Security', value: 'max-age=15552000' },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
};

export default nextConfig;
