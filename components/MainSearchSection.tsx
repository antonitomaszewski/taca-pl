'use client';

import { useState, useEffect } from 'react';
import { ParishSearchBar } from "./ParishSearchBar";
import { ResultsList } from "./ResultsList";
import { ParishMap } from "./ParishMap";
import { Parish, getAllParishes, searchParishes } from '../lib/parishService';

export function MainSearchSection() {
  const [results, setResults] = useState<Parish[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');

  useEffect(() => {
    async function fetchParishes() {
      setLoading(true);
      const data = query.trim() 
        ? await searchParishes(query) 
        : await getAllParishes();
      setResults(data);
      setLoading(false);
    }

    fetchParishes();
  }, [query]);

  return (
    <section className="py-8">
      {/* Nagłówek */}
      <ParishSearchBar query={query} setQuery={setQuery} />

      {/* Layout: Mapa 80% + Lista 20% */}
      <div className="flex gap-4 h-[600px]">
        {/* Mapa */}
        <div className="flex-[8] bg-gray-100 rounded-lg overflow-hidden">
          <ParishMap />
        </div>
        {/* Lista wyników */}
        <div className="flex-[2] overflow-y-auto">
          {loading ? (
            <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-center h-full">
              <span className="text-gray-500 text-sm">Ładowanie...</span>
            </div>
          ) : (
            <ResultsList results={results} />
          )}
        </div>
      </div>
    </section>
  );
}