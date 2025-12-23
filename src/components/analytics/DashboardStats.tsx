import React from 'react';
import { getAnalyticsStats } from '@/lib/analytics/queries';

export default async function DashboardStats() {
  const stats = getAnalyticsStats(30);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <StatCard title="Total Pageviews" value={stats.totalPageviews.toLocaleString()} subtitle="Last 30 days" />
      <StatCard title="Unique Visitors" value={stats.uniqueVisitors.toLocaleString()} subtitle="Last 30 days" />
    </div>
  );
}

function StatCard({ title, value, subtitle }: { title: string; value: string; subtitle: string }) {
  return (
    <div className="bg-muted/30 border border-muted rounded-lg p-6">
      <h3 className="text-sm text-muted-foreground font-medium mb-2">{title}</h3>
      <p className="text-3xl font-bold mb-1">{value}</p>
      <p className="text-xs text-muted-foreground">{subtitle}</p>
    </div>
  );
}
