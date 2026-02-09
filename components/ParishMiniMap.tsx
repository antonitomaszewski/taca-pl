'use client';

import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

interface ParishMiniMapProps {
  lat: number;
  lon: number;
}

function MiniMapContent({ lat, lon }: ParishMiniMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !mapRef.current) return;

    // Jeśli mapa już istnieje, usuń ją
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    // Dynamiczny import Leaflet + CSS
    Promise.all([
      import('leaflet'),
      import('leaflet/dist/leaflet.css'),
    ]).then(([L]) => {
      if (!mapRef.current) return;

      // Fix dla ikon markerów
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
      });

      // Inicjalizacja mapy
      const map = L.map(mapRef.current).setView([lat, lon], 15);

      // Dodanie warstwy OpenStreetMap
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(map);

      // Dodanie markera w lokalizacji parafii
      L.marker([lat, lon]).addTo(map);

      mapInstanceRef.current = map;
    });

    // Cleanup
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [lat, lon]);

  return <div ref={mapRef} className="w-full h-full rounded-lg" />;
}

// Eksport z wyłączonym SSR
export const ParishMiniMap = dynamic(() => Promise.resolve(MiniMapContent), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full rounded-lg bg-gray-100 flex items-center justify-center">
      <span className="text-gray-500 text-sm">Ładowanie mapy...</span>
    </div>
  ),
});