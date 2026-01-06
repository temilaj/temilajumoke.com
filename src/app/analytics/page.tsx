import React, { Suspense } from 'react';
import { redirect } from 'next/navigation';

import { isAnalyticsAuthenticated } from '@/lib/analytics/auth';
import { parseCSVLog } from '@/lib/analytics/queries';
import type { CSVRow } from '@/types/analytics';
import DashboardStats from '@/components/analytics/DashboardStats';
import PageViewsChart from '@/components/analytics/PageViewsChart';
import DeviceBreakdown from '@/components/analytics/DeviceBreakdown';
import TopPagesTable from '@/components/analytics/TopPagesTable';
import ReferrersTable from '@/components/analytics/ReferrersTable';
import LogoutButton from '@/components/analytics/LogoutButton';
import DaysFilter from '@/components/analytics/DaysFilter';

export const metadata = {
  title: 'Analytics Dashboard | Temi Lajumoke',
  description: 'Aanalytics dashboard',
  robots: 'noindex, nofollow',
};

type AnalyticsPageProps = {
  searchParams: Promise<{ days?: string }>;
};

export default async function AnalyticsPage({ searchParams }: AnalyticsPageProps) {
  const isAuthenticated = await isAnalyticsAuthenticated();

  if (!isAuthenticated) {
    redirect('/analytics/login');
  }

  const params = await searchParams;
  const daysParam = params.days || '30';
  const days = daysParam === 'all' ? Infinity : parseInt(daysParam, 10);

  const parsedData: CSVRow[] = parseCSVLog();

  const cutoff = days === Infinity ? 0 : Math.floor(Date.now() / 1000) - days * 24 * 60 * 60;
  const filteredData = parsedData.filter(row => row.timestamp > cutoff);

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-playfair font-bold mb-2">Analytics Dashboard</h1>
            <p className="text-muted-foreground">Website traffic and visitor insights</p>
          </div>
          <LogoutButton />
        </header>

        <DaysFilter />

        <Suspense fallback={<div>Loading stats...</div>}>
          <DashboardStats parsedData={filteredData} days={days} />
        </Suspense>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Suspense fallback={<div>Loading chart...</div>}>
            <PageViewsChart parsedData={filteredData} days={days} />
          </Suspense>

          <Suspense fallback={<div>Loading devices...</div>}>
            <DeviceBreakdown parsedData={filteredData} days={days} />
          </Suspense>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Suspense fallback={<div>Loading pages...</div>}>
            <TopPagesTable parsedData={filteredData} days={days} />
          </Suspense>

          <Suspense fallback={<div>Loading referrers...</div>}>
            <ReferrersTable parsedData={filteredData} days={days} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
