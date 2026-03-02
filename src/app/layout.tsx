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

const seoDescription = "Staff Software Engineer at NVIDIA. About a decade of experience building scalable, high-performance systems — from AI-powered tools and cloud infrastructure to deep learning models.";

const openGraph: OpenGraph = {
  title: 'Temi Lajumoke — Staff Software & Machine Learning Engineer',
  description: seoDescription,
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
  title: 'Temi Lajumoke — Staff Software & Machine Learning Engineer',
  description: seoDescription,
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
  metadataBase: new URL('https://temilajumoke.com'),
  title: {
    default: 'Temi Lajumoke — Staff Software & Machine Learning Engineer',
    template: '%s | Temi Lajumoke',
  },
  description: seoDescription,
  keywords: 'Temi Lajumoke, Staff Software Engineer, Machine Learning Engineer, NVIDIA, AI Tools, Agentic AI, LLM, Large Language Models, Cloud Infrastructure, Deep Learning, Python, Go, TypeScript, Distributed Systems, Full Stack Engineer',
  authors: [author],
  creator: 'Temi Lajumoke',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph,
  twitter,
  alternates: {
    canonical: 'https://temilajumoke.com',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
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
