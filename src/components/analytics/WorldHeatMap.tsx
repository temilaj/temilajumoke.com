'use client';

import React, { memo, useState, useEffect } from 'react';
import { feature } from 'topojson-client';
import type { Topology, GeometryCollection } from 'topojson-specification';
import type { FeatureCollection, Geometry } from 'geojson';
import type { CSVRow } from '@/types/analytics';

// Map country names from ip-api to ISO 3166-1 numeric codes (used by world-atlas)
const countryNameToId: Record<string, string> = {
  Afghanistan: '004',
  Albania: '008',
  Algeria: '012',
  Argentina: '032',
  Australia: '036',
  Austria: '040',
  Bangladesh: '050',
  Belgium: '056',
  Brazil: '076',
  Bulgaria: '100',
  Canada: '124',
  Chile: '152',
  China: '156',
  Colombia: '170',
  Croatia: '191',
  'Czech Republic': '203',
  Czechia: '203',
  Denmark: '208',
  Egypt: '818',
  Estonia: '233',
  Finland: '246',
  France: '250',
  Germany: '276',
  Ghana: '288',
  Greece: '300',
  'Hong Kong': '344',
  Hungary: '348',
  India: '356',
  Indonesia: '360',
  Ireland: '372',
  Israel: '376',
  Italy: '380',
  Japan: '392',
  Kazakhstan: '398',
  Kenya: '404',
  Latvia: '428',
  Lithuania: '440',
  Malaysia: '458',
  Mexico: '484',
  Morocco: '504',
  Netherlands: '528',
  'New Zealand': '554',
  Nigeria: '566',
  Norway: '578',
  Pakistan: '586',
  Peru: '604',
  Philippines: '608',
  Poland: '616',
  Portugal: '620',
  Romania: '642',
  Russia: '643',
  'Saudi Arabia': '682',
  Serbia: '688',
  Singapore: '702',
  Slovakia: '703',
  Slovenia: '705',
  'South Africa': '710',
  'South Korea': '410',
  Spain: '724',
  Sweden: '752',
  Switzerland: '756',
  Taiwan: '158',
  Thailand: '764',
  Turkey: '792',
  Ukraine: '804',
  'United Arab Emirates': '784',
  'United Kingdom': '826',
  'United States': '840',
  Venezuela: '862',
  Vietnam: '704',
};

type WorldHeatMapProps = {
  parsedData: CSVRow[];
  days: number;
};

type CountryFeature = {
  id: string;
  name: string;
  path: string;
};

// Simple path generator for GeoJSON (Mercator-like projection)
function projectCoord(lon: number, lat: number, width: number, height: number): [number, number] {
  const x = ((lon + 180) / 360) * width;
  const latRad = (lat * Math.PI) / 180;
  const mercN = Math.log(Math.tan(Math.PI / 4 + latRad / 2));
  const y = height / 2 - (mercN * width) / (2 * Math.PI);
  return [x, Math.max(0, Math.min(height, y))];
}

function coordsToPath(coords: number[][][], width: number, height: number): string {
  return coords
    .map(ring => {
      // Split rings that cross the antimeridian (180° longitude)
      const segments: [number, number][][] = [[]];
      let currentSegment = 0;

      for (let i = 0; i < ring.length; i++) {
        const [lon, lat] = ring[i];
        const point = projectCoord(lon, lat, width, height);
        segments[currentSegment].push(point);

        // Check if next point crosses antimeridian (large longitude jump)
        if (i < ring.length - 1) {
          const nextLon = ring[i + 1][0];
          if (Math.abs(nextLon - lon) > 180) {
            // Start a new segment
            currentSegment++;
            segments[currentSegment] = [];
          }
        }
      }

      // Build path from segments
      return segments
        .filter(seg => seg.length > 2)
        .map(seg => 'M' + seg.map(p => p.join(',')).join('L') + 'Z')
        .join('');
    })
    .join('');
}

function geometryToPath(geometry: Geometry, width: number, height: number): string {
  if (geometry.type === 'Polygon') {
    return coordsToPath(geometry.coordinates as number[][][], width, height);
  } else if (geometry.type === 'MultiPolygon') {
    return (geometry.coordinates as number[][][][]).map(polygon => coordsToPath(polygon, width, height)).join('');
  }
  return '';
}

const topOptions = [
  { value: 5, label: 'Top 5' },
  { value: 10, label: 'Top 10' },
  { value: 15, label: 'Top 15' },
  { value: 20, label: 'Top 20' },
  { value: 25, label: 'Top 25' },
  { value: Infinity, label: 'All' },
];

function WorldHeatMap({ parsedData, days }: WorldHeatMapProps) {
  const [countries, setCountries] = useState<CountryFeature[]>([]);
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [topCount, setTopCount] = useState(10);

  const WIDTH = 800;
  const HEIGHT = 450;

  // Load and process TopoJSON
  useEffect(() => {
    fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
      .then(res => res.json())
      .then((topology: Topology<{ countries: GeometryCollection<{ name: string }> }>) => {
        const geojson = feature(topology, topology.objects.countries) as FeatureCollection;
        const features: CountryFeature[] = geojson.features
          .filter(f => f.id !== undefined && f.id !== null)
          .map(f => ({
            id: String(f.id),
            name: (f.properties?.name as string) || 'Unknown',
            path: geometryToPath(f.geometry, WIDTH, HEIGHT),
          }))
          .filter(f => f.path && f.id);
        setCountries(features);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load map:', err);
        setLoading(false);
      });
  }, []);

  // Calculate country counts
  const cutoff = days === Infinity ? 0 : Math.floor(Date.now() / 1000) - days * 24 * 60 * 60;
  const filteredRows = parsedData.filter(row => row.timestamp > cutoff);

  const countryCountMap = new Map<string, number>();
  const cityCountMap = new Map<string, number>();
  for (const row of filteredRows) {
    const country = row.country || 'Unknown';
    if (country !== 'Unknown') {
      countryCountMap.set(country, (countryCountMap.get(country) || 0) + 1);
    }
    const city = row.city || 'Unknown';
    if (city !== 'Unknown') {
      cityCountMap.set(city, (cityCountMap.get(city) || 0) + 1);
    }
  }

  // Convert to ID-based map for the visualization
  const idCountMap = new Map<string, number>();
  for (const [name, count] of countryCountMap) {
    const id = countryNameToId[name];
    if (id) {
      idCountMap.set(id, count);
    }
  }

  const maxCount = Math.max(...Array.from(idCountMap.values()), 1);

  // Get color based on count
  const getColor = (id: string) => {
    const count = idCountMap.get(id) || 0;
    if (count === 0) return '#1e293b'; // slate-800

    const intensity = Math.pow(count / maxCount, 0.4);
    // Interpolate from slate to blue
    const r = Math.round(30 + (59 - 30) * (1 - intensity));
    const g = Math.round(41 + (130 - 41) * (1 - intensity));
    const b = Math.round(59 + (246 - 59) * intensity);
    return `rgb(${r}, ${g}, ${b})`;
  };

  // Get top countries for legend
  const allSortedCountries = Array.from(countryCountMap.entries()).sort((a, b) => b[1] - a[1]);
  const topCountries = topCount === Infinity ? allSortedCountries : allSortedCountries.slice(0, topCount);

  // Get top cities
  const allSortedCities = Array.from(cityCountMap.entries()).sort((a, b) => b[1] - a[1]);
  const topCities = topCount === Infinity ? allSortedCities : allSortedCities.slice(0, topCount);

  // Use map totals instead of filtering again
  const totalVisits = Array.from(countryCountMap.values()).reduce((a, b) => a + b, 0);
  const totalCityVisits = Array.from(cityCountMap.values()).reduce((a, b) => a + b, 0);

  const getCountryCount = (id: string) => idCountMap.get(id) || 0;

  return (
    <div className="bg-muted/30 border border-muted rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Visitor Locations</h3>

      <div className="relative overflow-hidden rounded-lg bg-slate-900">
        {loading ? (
          <div className="h-64 flex items-center justify-center text-muted-foreground">Loading map...</div>
        ) : (
          <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="w-full h-auto">
            <rect width={WIDTH} height={HEIGHT} fill="#0f172a" />
            {countries.map(country => {
              const count = getCountryCount(country.id);
              const isHovered = hoveredCountry === country.id;
              return (
                <path
                  key={country.id}
                  d={country.path}
                  fill={isHovered ? '#6366f1' : getColor(country.id)}
                  stroke="#334155"
                  strokeWidth={0.3}
                  onMouseEnter={() => setHoveredCountry(country.id)}
                  onMouseLeave={() => setHoveredCountry(null)}
                  style={{ cursor: count > 0 ? 'pointer' : 'default', transition: 'fill 0.15s' }}
                />
              );
            })}
          </svg>
        )}

        {/* Tooltip */}
        {hoveredCountry && (
          <div className="absolute top-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
            {countries.find(c => c.id === hoveredCountry)?.name}: {getCountryCount(hoveredCountry)} visits
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <span>Less</span>
          <div className="flex h-3 rounded overflow-hidden">
            {[0.1, 0.3, 0.5, 0.7, 0.9].map((intensity, i) => {
              const r = Math.round(30 + (59 - 30) * (1 - intensity));
              const g = Math.round(41 + (130 - 41) * (1 - intensity));
              const b = Math.round(59 + (246 - 59) * intensity);
              return <div key={i} className="w-6 h-full" style={{ backgroundColor: `rgb(${r}, ${g}, ${b})` }} />;
            })}
          </div>
          <span>More</span>
        </div>
        <span>
          {totalVisits} visits from {countryCountMap.size} countries
        </span>
      </div>

      {(topCountries.length > 0 || topCities.length > 0) && (
        <div className="mt-4 pt-4 border-t border-muted">
          <div className="flex items-center justify-end gap-2 mb-4">
            <label htmlFor="top-count" className="text-sm text-muted-foreground">
              Show:
            </label>
            <select
              id="top-count"
              value={topCount}
              onChange={e => setTopCount(e.target.value === 'Infinity' ? Infinity : Number(e.target.value))}
              className="bg-muted/30 border border-muted rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {topOptions.map(option => (
                <option key={option.label} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {topCountries.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-2">Top Countries</h4>
              <div className="space-y-1">
                {topCountries.map(([country, count], idx) => {
                  const percentage = totalVisits > 0 ? (count / totalVisits) * 100 : 0;
                  return (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="text-xs w-28 truncate">{country}</span>
                      <div className="flex-1 bg-muted rounded-full h-3">
                        <div
                          className="bg-blue-500 h-full rounded-full transition-all"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-xs w-16 text-right">
                        {count} ({percentage.toFixed(0)}%)
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {topCities.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-2">Top Cities</h4>
              <div className="space-y-1">
                {topCities.map(([city, count], idx) => {
                  const percentage = totalCityVisits > 0 ? (count / totalCityVisits) * 100 : 0;
                  return (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="text-xs w-28 truncate">{city}</span>
                      <div className="flex-1 bg-muted rounded-full h-3">
                        <div
                          className="bg-indigo-500 h-full rounded-full transition-all"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-xs w-16 text-right">
                        {count} ({percentage.toFixed(0)}%)
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          </div>
        </div>
      )}
    </div>
  );
}

export default memo(WorldHeatMap);
