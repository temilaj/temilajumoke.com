import React from 'react';

export default function Footer() {
  return (
    <footer className="py-16 border-t border-border">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
        <div className="space-y-2">
          <div className="text-sm text-muted-foreground">
            © 2014 - {new Date().getFullYear()} | Temi Lajumoke. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
