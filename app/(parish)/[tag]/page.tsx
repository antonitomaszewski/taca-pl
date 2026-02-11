'use client';

import { use, useEffect, useState } from 'react';
import { ParishHeader } from '@/components/ParishHeader';
import { ParishMiniMap } from '@/components/ParishMiniMap';
import { ParishDescription } from '@/components/ParishDescription';
import { getParishByTag, Parish } from '@/lib/parishService';
import pb from '@/lib/pocketbase';
import Client from 'pocketbase';

export default function ParishPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = use(params);
  const [parish, setParish] = useState<Parish | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchParish() {
      const data = await getParishByTag(tag);
      console.log('Parish data:', data);
      setParish(data);
      setLoading(false);
    }

    fetchParish();
  }, [tag]);

  if (loading) {
    return (
      <main>
        <div className="max-w-300 mx-auto px-4 py-8">
          <p>Ładowanie...</p>
        </div>
      </main>
    );
  }

  if (!parish) {
    return (
      <main>
        <div className="max-w-300 mx-auto px-4 py-8">
          <p>Parish not found</p>
        </div>
      </main>
    );
  }

    const imageUrl = parish.image 
    ? `${pb.baseUrl}/api/files/parishes/${parish.id}/${parish.image}`
    : undefined;

  return (
    <main>
      <ParishHeader 
        name={parish.name}
        city={parish.city}
        imageUrl={imageUrl}
        onDonateClick={() => console.log('Przejście do płatności')}
      />
    
      <div className="max-w-300 mx-auto px-4 py-8">
        <div className="flex gap-6">
          {/* Mapa - kwadratowa, stała szerokość */}
          <div className="w-87.5 h-87.5 shrink-0">
            <ParishMiniMap lat={parish.location.lat} lon={parish.location.lon} />
          </div>

          {/* Opis - reszta szerokości */}
          <div className="flex-1">
            <ParishDescription 
              description={parish.description}
            />
          </div>
        </div>
      </div>
    </main>
  );
}