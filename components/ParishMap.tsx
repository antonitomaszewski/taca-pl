'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import { getAllParishes, Parish } from '../lib/parishService';

function MapContent() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const [parishes, setParishes] = useState<Parish[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchParishes() {
      const data = await getAllParishes();
      setParishes(data);
      setLoading(false);
    }

    fetchParishes();
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || !mapRef.current || mapInstanceRef.current) return;

    // Dynamiczny import Leaflet
    import('leaflet').then((L) => {
      // Fix dla ikon markerów w Next.js
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
      });

      // Inicjalizacja mapy
      const map = L.map(mapRef.current!).setView([52.0, 19.0], 6);

      // Dodanie warstwy OpenStreetMap
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(map);

      // Dodanie markerów dla każdej parafii
      parishes.forEach((parish) => {
        const marker = L.marker([parish.location.lat, parish.location.lon]).addTo(map);

        // Tooltip z nazwą parafii (pokazuje się na hover)
        marker.bindTooltip(parish.name, {
          permanent: false,
          direction: 'top',
        });

        // Kliknięcie w marker → przekierowanie
        marker.on('click', () => {
          window.location.href = `/${parish.tag}`;
        });
      });

      mapInstanceRef.current = map;
    });

    // Cleanup przy odmontowaniu komponentu
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [parishes, loading]);

  if (loading) {
    return (
      <div className="w-full h-full rounded-lg bg-gray-100 flex items-center justify-center">
        <span className="text-gray-500">Ładowanie parafii...</span>
      </div>
    );
  }

  return <div ref={mapRef} className="w-full h-full rounded-lg" />;
}

// Eksport z wyłączonym SSR
export const ParishMap = dynamic(() => Promise.resolve(MapContent), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full rounded-lg bg-gray-100 flex items-center justify-center">
      <span className="text-gray-500">Ładowanie mapy...</span>
    </div>
  ),
});