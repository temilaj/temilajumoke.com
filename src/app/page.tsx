'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import Hero from '@/components/Hero';
import Footer from '@/components/Footer';

import ThemeToggle from '@/components/ThemeToggle';
import { useTheme } from '@/hooks/useTheme';

type PageSection = 'Hero' | 'Experience';

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
      <header className="fixed top-0 left-0 right-0 z-20 p-8">
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <div className="flex items-center">
            <Image
              src={theme === 'light' ? '/temilajumoke-logo-transparent.png' : '/temilajumoke-logo-transparent.png'}
              alt="Temi Lajumoke Logo"
              className="h-8 w-auto dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
              width={200}
              height={48}
              priority
            />
          </div>
          <ThemeToggle />
        </div>
      </header>

      <nav className="fixed left-8 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
        <div className="flex flex-col gap-4">
          {SECTIONS.map(pageSection => (
            <button
              key={pageSection}
              onClick={() => document.getElementById(pageSection)?.scrollIntoView({ behavior: 'smooth' })}
              className={`w-2 h-8 rounded-full transition-all duration-500 ${
                activeSection === pageSection ? 'bg-foreground' : 'bg-muted-foreground/30 hover:bg-muted-foreground/60'
              }`}
              aria-label={`Navigate to ${pageSection}`}
            />
          ))}
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-8 lg:px-16">
        <Hero sectionsRef={sectionsRef} />

        <Footer />
      </main>

      <div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none"></div>
    </div>
  );
}
