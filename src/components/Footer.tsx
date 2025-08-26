import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-16 border-t border-border" role="contentinfo">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
        <div className="space-y-2">
          <div className="text-sm text-muted-foreground">
            <span aria-label={`Copyright 2014 to ${currentYear}, Temi Lajumoke, All rights reserved`}>
              © 2014 - {currentYear} | Temi Lajumoke. All rights reserved.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
