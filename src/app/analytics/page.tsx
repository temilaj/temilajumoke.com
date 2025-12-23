import React, { Suspense } from 'react';
import { notFound } from 'next/navigation';

import DashboardStats from '@/components/analytics/DashboardStats';
export const metadata = {
  title: 'Analytics Dashboard | Temi Lajumoke',
  description: 'Aanalytics dashboard',
  robots: 'noindex, nofollow',
};

export default function AnalyticsPage({ searchParams }: { searchParams: { key?: string } }) {
  const providedKey = searchParams.key;
  const expectedKey = process.env.ANALYTICS_API_KEY;

  if (!providedKey || providedKey !== expectedKey) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <header>
          <h1 className="text-4xl font-playfair font-bold mb-2">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Website traffic and visitor insights</p>
        </header>

        <Suspense fallback={<div>Loading stats...</div>}>
          <DashboardStats />
        </Suspense>
      </div>
    </div>
  );
}
