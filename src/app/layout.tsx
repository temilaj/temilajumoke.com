import './globals.css';

import type React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Author } from 'next/dist/lib/metadata/types/metadata-types';
import { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';
import { Twitter } from 'next/dist/lib/metadata/types/twitter-types';

import { ThemeProvider } from '@/context/ThemeProvider';
import { playfairDisplay, roboto } from '@/app/fonts';
import AnalyticsTracker from '@/components/analytics/AnalyticsTracker';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const author: Author = {
  name: 'Temi Lajumoke',
  url: 'https://temilajumoke.com',
};

const openGraph: OpenGraph = {
  title: 'Temi Lajumoke',
  description: "Hi, I'm Temi Lajumoke.",
  images: ['https://temilajumoke.com/temilajumoke-logo.png'],
  type: 'website',
  determiner: 'the',
  locale: 'en_US',
  alternateLocale: ['en_GB'],
  siteName: 'Temilajumoke.com',
  url: 'https://temilajumoke.com',
};

const twitter: Twitter = {
  card: 'summary_large_image',
  site: '@temilaj',
  creator: '@temilaj',
  title: 'Temi Lajumoke',
  description: "Hi, I'm Temi Lajumoke.",
  images: [
    {
      url: 'https://temilajumoke.com/temilajumoke-logo.png',
      alt: 'temilajumoke.com logo',
    },
  ],
  creatorId: 'temilaj',
  siteId: 'temilaj',
};

export const metadata: Metadata = {
  title: 'Home | Temi Lajumoke - Software & Machine Learning Engineer',
  description: "I'm a Software & Machine Learning Engineer with over 8 years of experience building scalable, high-performance systems across the full stack.",
  keywords: 'Temilaj, Temi Lajumoke, Software Engineer, Machine Learning Engineer, Software Developer, Full Stack Developer, AWS, React, Python, Java, TypeScript',
  authors: [author],
  robots: 'index, follow',
  openGraph,
  twitter,
  viewport: 'width=device-width, initial-scale=1',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' }
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfairDisplay.variable} ${roboto.variable} antialiased`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-foreground focus:text-background focus:rounded-md focus:shadow-lg transition-all"
        >
          Skip to main content
        </a>
        <AnalyticsTracker />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
