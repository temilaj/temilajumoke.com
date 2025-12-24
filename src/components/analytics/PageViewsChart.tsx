import React from 'react';
import { getAnalyticsStats } from '@/lib/analytics/queries';

const days = 90;

export default async function PageViewsChart() {
  const stats = getAnalyticsStats(days);
  const data = stats.pageviewsByDay.reverse(); // Oldest to newest

  const maxViews = Math.max(...data.map(d => d.count), 1);

  return (
    <div className="bg-muted/30 border border-muted rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Pageviews Over Time</h3>
      {data.length === 0 ? (
        <p className="text-muted-foreground text-sm">No data available yet</p>
      ) : (
        <div className="space-y-2">
          {data.map(({ date, count }) => (
            <div key={date} className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground w-20">{date}</span>
              <div className="flex-1 bg-muted rounded-full h-6 relative">
                <div
                  className="bg-blue-500 h-full rounded-full transition-all"
                  style={{ width: `${(count / maxViews) * 100}%` }}
                />
              </div>
              <span className="text-sm font-medium w-12 text-right">{count}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
