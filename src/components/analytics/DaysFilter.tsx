'use client';
import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const dayOptions = [
  { value: '1', label: 'Last 24 hours' },
  { value: '2', label: 'Last 48 hours' },
  { value: '7', label: 'Last 7 days' },
  { value: '14', label: 'Last 14 days' },
  { value: '30', label: 'Last 30 days' },
  { value: '60', label: 'Last 60 days' },
  { value: '90', label: 'Last 90 days' },
  { value: '365', label: 'Last year' },
  { value: 'all', label: 'All time' },
];

export default function DaysFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentDays = searchParams.get('days') || '30';

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams.toString());

    if (value === '30') {
      params.delete('days');
    } else {
      params.set('days', value);
    }

    const queryString = params.toString();
    router.push(queryString ? `/analytics?${queryString}` : '/analytics');
  };

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="days-filter" className="text-sm text-muted-foreground">
        Time period:
      </label>
      <select
        id="days-filter"
        value={currentDays}
        onChange={handleChange}
        className="bg-muted/30 border border-muted rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
      >
        {dayOptions.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
