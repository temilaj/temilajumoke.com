import React from 'react';
import { getDeviceStats } from '@/lib/analytics/queries';

const days = 90;
export default async function DeviceBreakdown() {
  const stats = getDeviceStats(days);

  return (
    <div className="bg-muted/30 border border-muted rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Device & Browser Breakdown</h3>

      <div className="space-y-4">
        <Section title="Browsers" data={stats.browsers.slice(0, 5)} labelKey="browser" />
        <Section title="Devices" data={stats.devices} labelKey="device_type" />
        <Section title="Operating Systems" data={stats.os.slice(0, 5)} labelKey="os" />
      </div>
    </div>
  );
}

function Section({
  title,
  data,
  labelKey,
}: {
  title: string;
  data: Array<{ [key: string]: string | number }>;
  labelKey: string;
}) {
  const total = data.reduce((sum, item) => sum + (item.count as number), 0);

  if (data.length === 0) {
    return (
      <div>
        <h4 className="text-sm font-medium text-muted-foreground mb-2">{title}</h4>
        <p className="text-muted-foreground text-xs">No data available yet</p>
      </div>
    );
  }

  return (
    <div>
      <h4 className="text-sm font-medium text-muted-foreground mb-2">{title}</h4>
      <div className="space-y-1">
        {data.map((item, idx) => {
          const percentage = total > 0 ? ((item.count as number) / total) * 100 : 0;
          return (
            <div key={idx} className="flex items-center gap-2">
              <span className="text-xs w-24 truncate">{item[labelKey]}</span>
              <div className="flex-1 bg-muted rounded-full h-4">
                <div className="bg-green-500 h-full rounded-full" style={{ width: `${percentage}%` }} />
              </div>
              <span className="text-xs w-12 text-right">{percentage.toFixed(0)}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
