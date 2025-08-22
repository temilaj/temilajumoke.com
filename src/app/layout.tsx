import './globals.css';
import type React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '../context/ThemeProvider';
import { playfairDisplay } from './fonts';
import { Author } from 'next/dist/lib/metadata/types/metadata-types';
import { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';
import { Twitter } from 'next/dist/lib/metadata/types/twitter-types';

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
  title: 'Home | Temi Lajumoke',
  description: "Hi, I'm Temi Lajumoke.",
  keywords: 'Temilaj, Temi Lajumoke, Software Engineer, Machine Learning Engineer, Software Developer,',
  authors: [author],
  robots: 'index, follow',
  openGraph,
  twitter,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfairDisplay.variable} antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
