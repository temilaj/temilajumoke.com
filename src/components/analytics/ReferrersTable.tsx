import React from 'react';
import { getTopReferrers } from '@/lib/analytics/queries';
import type { CSVRow } from '@/types/analytics';

type ReferrersTableProps = {
  parsedData: CSVRow[];
  days: number;
};

export default function ReferrersTable({ parsedData, days }: ReferrersTableProps) {
  const referrers = getTopReferrers(days, 10, parsedData);

  return (
    <div className="bg-muted/30 border border-muted rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Top Referrers</h3>
      {referrers.length === 0 ? (
        <p className="text-muted-foreground text-sm">No data available yet</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-muted">
                <th className="text-left py-2 px-2">Source</th>
                <th className="text-right py-2 px-2">Visits</th>
              </tr>
            </thead>
            <tbody>
              {referrers.map((ref, idx) => (
                <tr key={idx} className="border-b border-muted/50">
                  <td className="py-2 px-2 truncate max-w-xs">{ref.referrer || 'Direct'}</td>
                  <td className="py-2 px-2 text-right">{ref.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
