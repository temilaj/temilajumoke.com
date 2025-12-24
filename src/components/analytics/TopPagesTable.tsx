import React from 'react';
import { getTopPages } from '@/lib/analytics/queries';

const days = 90;
export default async function TopPagesTable() {
  const pages = getTopPages(days, 10);

  return (
    <div className="bg-muted/30 border border-muted rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Top Pages</h3>
      {pages.length === 0 ? (
        <p className="text-muted-foreground text-sm">No data available yet</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-muted">
                <th className="text-left py-2 px-2">Page</th>
                <th className="text-right py-2 px-2">Views</th>
                <th className="text-right py-2 px-2">Unique</th>
              </tr>
            </thead>
            <tbody>
              {pages.map((page, idx) => (
                <tr key={idx} className="border-b border-muted/50">
                  <td className="py-2 px-2 font-mono text-xs truncate max-w-xs">{page.path}</td>
                  <td className="py-2 px-2 text-right">{page.views}</td>
                  <td className="py-2 px-2 text-right">{page.uniqueVisitors}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
