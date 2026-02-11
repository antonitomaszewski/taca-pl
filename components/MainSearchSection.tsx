'use client';

import { useState, useEffect } from 'react';
import { ParishSearchBar } from "./ParishSearchBar";
import { ResultsList } from "./ResultsList";
import { ParishMap } from "./ParishMap";
import { Parish, getAllParishes, searchParishes } from '../lib/parishService';

export function MainSearchSection() {
  const [results, setResults] = useState<Parish[]>([]);
  const [allParishes, setAllParishes] = useState<Parish[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');

  // Pobierz wszystkie parafie raz na start
  useEffect(() => {
    async function fetchAllParishes() {
      setLoading(true);
      const data = await getAllParishes();
      setAllParishes(data);
      setResults(data);
      setLoading(false);
    }

    fetchAllParishes();
  }, []);

  // Wyszukiwanie - aktualizuje tylko listę wyników
  useEffect(() => {
    if (!query.trim()) {
      setResults(allParishes);
      return;
    }

    async function search() {
      const data = await searchParishes(query);
      setResults(data);
    }

    search();
  }, [query, allParishes]);

  return (
    <section className="py-8">
      <ParishSearchBar query={query} setQuery={setQuery} />

      <div className="flex gap-4 h-150">
        {/* Mapa */}
        <div className="flex-8 bg-gray-100 rounded-lg overflow-hidden">
          <ParishMap parishes={allParishes} loading={loading} />
        </div>
        
        {/* Lista wyników */}
        <div className="flex-2 overflow-y-auto">
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