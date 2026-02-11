'use client';

import { use, useEffect, useState } from 'react';
import { DonationCard } from '@/components/DonationCard';
import { getParishByTag, Parish } from '@/lib/parishService';
import pb from '@/lib/pocketbase';

export default function DonatePage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = use(params);
  const [parish, setParish] = useState<Parish | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchParish() {
      const data = await getParishByTag(tag);
      setParish(data);
      setLoading(false);
    }

    fetchParish();
  }, [tag]);

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-162.5 mx-auto bg-white rounded-lg border border-gray-200 shadow-sm p-8">
          <p className="text-center text-gray-500">Ładowanie...</p>
        </div>
      </main>
    );
  }

  if (!parish) {
    return (
      <main className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-162.5 mx-auto bg-white rounded-lg border border-gray-200 shadow-sm p-8">
          <p className="text-center text-gray-500">Parafia nie została znaleziona</p>
        </div>
      </main>
    );
  }

  return (
    <main>
      <DonationCard parish={parish} />
    </main>
  );
}