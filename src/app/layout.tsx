import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Home | Temi Lajumoke',
  description: "Hi, I'm Temi Lajumoke.",
  keywords: 'Temilaj, Temi Lajumoke, Software Engineer, Machine Learning Engineer, Software Developer,',
  author: 'Temi Lajumoke, Temilaj',
  robots: 'index, follow',

  'og:title': 'Temi Lajumoke',
  'og:description': "Hi, I'm Temi Lajumoke.",
  'og:image': 'https://temilajumoke.com/temilajumoke-logo.png',
  'og:determiner': 'the',
  'og:locale': 'en_Us',
  'og:locale:alternate': 'en_GB',
  'og:site_name': 'Temilajumoke.com',
  'og:type': 'website',
  'twitter:card': 'summary_large_image',
  'twitter:site': 'temilaj',
  'twitter:image:alt': 'temilajumoke.com logo',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
