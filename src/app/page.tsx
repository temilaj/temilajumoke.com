'use client';

import { useEffect, useRef, useState } from 'react';
import ThemeToggle from '../components/ThemeToggle';

import Hero from '@/components/Hero';

type PageSection = 'Hero';

export default function Home() {
  const [activeSection, setActiveSection] = useState<PageSection>('');
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

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
      {/* Header with Theme Toggle */}
      <header className="fixed top-0 right-0 z-20 p-8">
        <ThemeToggle />
      </header>

      <nav className="fixed left-8 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
        <div className="flex flex-col gap-4">
          {['Hero'].map(pageSection => (
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

        <footer className="py-16 border-t border-border">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">
                © 2014 - {new Date().getFullYear()} | Temi Lajumoke. All rights reserved.
              </div>
            </div>
          </div>
        </footer>
      </main>

      <div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none"></div>
    </div>
  );
}
