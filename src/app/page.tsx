'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import ThemeToggle from '@/components/ThemeToggle';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';

import { useTheme } from '@/hooks/useTheme';

type PageSection = 'Hero';

const SECTIONS: PageSection[] = ['Hero'];

export default function Home() {
  const [activeSection, setActiveSection] = useState<PageSection | ''>('');
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);
  const { theme } = useTheme();

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
            setActiveSection(entry.target.id as PageSection);
          }
        });
      },
      { threshold: 0.4, rootMargin: '0px 0px -20% 0px' }
    );

    sectionsRef.current.forEach(pageSection => {
      if (pageSection) {
        observer.observe(pageSection);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <header role="banner" className="fixed top-0 left-0 right-0 z-20 p-8">
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <Link
            className="pointer-events-none flex place-items-center gap-2 lg:pointer-events-auto lg:p-0 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:rounded-md"
            href="/"
            aria-label="Temi Lajumoke - Home"
          >
            <Image
              src={theme === 'light' ? '/temilajumoke-logo-transparent.png' : '/temilajumoke-logo-transparent.png'}
              alt="Temi Lajumoke Logo - Software & Machine Learning Engineer"
              className="h-8 lg:h-12 w-auto dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
              width={200}
              height={48}
              priority
            />
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <nav
        role="navigation"
        aria-label="Page sections navigation"
        className="fixed left-8 top-1/2 -translate-y-1/2 z-10 hidden lg:block"
      >
        <div className="flex flex-col gap-4" role="list">
          {SECTIONS.map(pageSection => (
            <button
              key={pageSection}
              onClick={() => document.getElementById(pageSection)?.scrollIntoView({ behavior: 'smooth' })}
              className={`w-2 h-8 rounded-full transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:w-2 ${
                activeSection === pageSection ? 'bg-foreground' : 'bg-muted-foreground/30 hover:bg-muted-foreground/60'
              }`}
              aria-label={`Navigate to ${pageSection} section`}
              aria-current={activeSection === pageSection ? 'true' : 'false'}
              role="listitem"
            />
          ))}
        </div>
      </nav>

      <main id="main-content" role="main" className="max-w-7xl mx-auto px-8 lg:px-16 pt-22 lg:pt-0">
        <Hero sectionsRef={sectionsRef} />

        <Footer />
      </main>

      <div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none"></div>
    </div>
  );
}
