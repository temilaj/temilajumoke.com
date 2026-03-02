import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/analytics/',
      },
    ],
    sitemap: 'https://temilajumoke.com/sitemap.xml',
  };
}
