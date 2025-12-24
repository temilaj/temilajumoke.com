import React, { Suspense } from 'react';
import { notFound } from 'next/navigation';
import DashboardStats from '@/components/analytics/DashboardStats';
import PageViewsChart from '@/components/analytics/PageViewsChart';
import DeviceBreakdown from '@/components/analytics/DeviceBreakdown';
import TopPagesTable from '@/components/analytics/TopPagesTable';
import ReferrersTable from '@/components/analytics/ReferrersTable';

export const metadata = {
  title: 'Analytics Dashboard | Temi Lajumoke',
  description: 'Aanalytics dashboard',
  robots: 'noindex, nofollow',
};

export default async function AnalyticsPage({ searchParams }: { searchParams: { key?: string } }) {
  const { key: providedKey } = await searchParams;
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Suspense fallback={<div>Loading chart...</div>}>
            <PageViewsChart />
          </Suspense>

          <Suspense fallback={<div>Loading devices...</div>}>
            <DeviceBreakdown />
          </Suspense>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Suspense fallback={<div>Loading pages...</div>}>
            <TopPagesTable />
          </Suspense>

          <Suspense fallback={<div>Loading referrers...</div>}>
            <ReferrersTable />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
