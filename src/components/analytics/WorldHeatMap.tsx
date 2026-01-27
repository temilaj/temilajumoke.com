'use client';

import React, { memo } from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';
import type { CSVRow } from '@/types/analytics';

const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

// Map common country names to ISO 3166-1 alpha-3 codes (used by world-atlas)
const countryNameToCode: Record<string, string> = {
  'United States': 'USA',
  'United Kingdom': 'GBR',
  'Canada': 'CAN',
  'Germany': 'DEU',
  'France': 'FRA',
  'Australia': 'AUS',
  'India': 'IND',
  'China': 'CHN',
  'Japan': 'JPN',
  'Brazil': 'BRA',
  'Mexico': 'MEX',
  'Russia': 'RUS',
  'South Korea': 'KOR',
  'Italy': 'ITA',
  'Spain': 'ESP',
  'Netherlands': 'NLD',
  'Sweden': 'SWE',
  'Norway': 'NOR',
  'Denmark': 'DNK',
  'Finland': 'FIN',
  'Poland': 'POL',
  'Belgium': 'BEL',
  'Switzerland': 'CHE',
  'Austria': 'AUT',
  'Ireland': 'IRL',
  'Portugal': 'PRT',
  'Greece': 'GRC',
  'Turkey': 'TUR',
  'Israel': 'ISR',
  'South Africa': 'ZAF',
  'Nigeria': 'NGA',
  'Egypt': 'EGY',
  'Kenya': 'KEN',
  'Argentina': 'ARG',
  'Chile': 'CHL',
  'Colombia': 'COL',
  'Peru': 'PER',
  'Venezuela': 'VEN',
  'Indonesia': 'IDN',
  'Philippines': 'PHL',
  'Vietnam': 'VNM',
  'Thailand': 'THA',
  'Malaysia': 'MYS',
  'Singapore': 'SGP',
  'New Zealand': 'NZL',
  'Pakistan': 'PAK',
  'Bangladesh': 'BGD',
  'Ukraine': 'UKR',
  'Czech Republic': 'CZE',
  'Czechia': 'CZE',
  'Romania': 'ROU',
  'Hungary': 'HUN',
  'United Arab Emirates': 'ARE',
  'Saudi Arabia': 'SAU',
  'Taiwan': 'TWN',
  'Hong Kong': 'HKG',
};

type WorldHeatMapProps = {
  parsedData: CSVRow[];
  days: number;
};

function WorldHeatMap({ parsedData, days }: WorldHeatMapProps) {
  // Calculate country counts
  const cutoff = days === Infinity ? 0 : Math.floor(Date.now() / 1000) - days * 24 * 60 * 60;
  const filteredRows = parsedData.filter(row => row.timestamp > cutoff);

  const countryCountMap = new Map<string, number>();
  for (const row of filteredRows) {
    const country = row.country || 'Unknown';
    if (country !== 'Unknown') {
      countryCountMap.set(country, (countryCountMap.get(country) || 0) + 1);
    }
  }

  // Convert to code-based map for the visualization
  const codeCountMap = new Map<string, number>();
  for (const [name, count] of countryCountMap) {
    const code = countryNameToCode[name];
    if (code) {
      codeCountMap.set(code, count);
    }
  }

  const maxCount = Math.max(...Array.from(codeCountMap.values()), 1);

  // Get color based on count
  const getColor = (code: string) => {
    const count = codeCountMap.get(code) || 0;
    if (count === 0) return '#1a1a2e';

    // Interpolate between light blue and bright blue based on intensity
    const intensity = Math.pow(count / maxCount, 0.4); // Use power curve for better distribution
    const r = Math.round(26 + (59 - 26) * (1 - intensity));
    const g = Math.round(26 + (130 - 26) * (1 - intensity));
    const b = Math.round(46 + (246 - 46) * intensity);
    return `rgb(${r}, ${g}, ${b})`;
  };

  // Get top countries for the legend
  const topCountries = Array.from(countryCountMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const totalVisits = filteredRows.filter(r => r.country && r.country !== 'Unknown').length;

  return (
    <div className="bg-muted/30 border border-muted rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Visitor Locations</h3>

      <div className="relative">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 120,
            center: [0, 30],
          }}
          style={{ width: '100%', height: 'auto' }}
        >
          <ZoomableGroup>
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map(geo => {
                  const code = geo.properties?.ISO_A3 || geo.id;
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={getColor(code)}
                      stroke="#2a2a3e"
                      strokeWidth={0.5}
                      style={{
                        default: { outline: 'none' },
                        hover: { outline: 'none', fill: '#6366f1' },
                        pressed: { outline: 'none' },
                      }}
                    />
                  );
                })
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </div>

      {/* Legend */}
      <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <span>Less</span>
          <div className="flex h-3">
            {[0.1, 0.3, 0.5, 0.7, 0.9].map((intensity, i) => {
              const r = Math.round(26 + (59 - 26) * (1 - intensity));
              const g = Math.round(26 + (130 - 26) * (1 - intensity));
              const b = Math.round(46 + (246 - 46) * intensity);
              return (
                <div
                  key={i}
                  className="w-6 h-full"
                  style={{ backgroundColor: `rgb(${r}, ${g}, ${b})` }}
                />
              );
            })}
          </div>
          <span>More</span>
        </div>
        <span>{totalVisits} visits from {countryCountMap.size} countries</span>
      </div>

      {/* Top Countries List */}
      {topCountries.length > 0 && (
        <div className="mt-4 pt-4 border-t border-muted">
          <h4 className="text-sm font-medium text-muted-foreground mb-2">Top Countries</h4>
          <div className="space-y-1">
            {topCountries.map(([country, count], idx) => {
              const percentage = totalVisits > 0 ? (count / totalVisits) * 100 : 0;
              return (
                <div key={idx} className="flex items-center gap-2">
                  <span className="text-xs w-28 truncate">{country}</span>
                  <div className="flex-1 bg-muted rounded-full h-3">
                    <div
                      className="bg-blue-500 h-full rounded-full"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-xs w-16 text-right">{count} ({percentage.toFixed(0)}%)</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default memo(WorldHeatMap);
