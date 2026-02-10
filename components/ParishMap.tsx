'use client';

import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { Parish } from '../lib/parishService';

interface ParishMapProps {
  parishes: Parish[];
  loading: boolean;
}

function MapContent({ parishes, loading }: ParishMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !mapRef.current || loading || parishes.length === 0) return;

    // Wyczyść starą mapę
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    // Dynamiczny import Leaflet
    import('leaflet').then((L) => {
      if (!mapRef.current) return;

      // Fix dla ikon markerów
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
      });

      // Inicjalizacja mapy
      const map = L.map(mapRef.current).setView([52.0, 19.0], 6);

      // Dodanie warstwy OpenStreetMap
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(map);

      // Dodanie markerów
      parishes.forEach((parish) => {
        const marker = L.marker([parish.location.lat, parish.location.lon]).addTo(map);

        marker.bindTooltip(parish.name, {
          permanent: false,
          direction: 'top',
        });

        marker.on('click', () => {
          window.location.href = `/${parish.tag}`;
        });
      });

      mapInstanceRef.current = map;
    });

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

  if (parishes.length === 0) {
    return (
      <div className="w-full h-full rounded-lg bg-gray-100 flex items-center justify-center">
        <span className="text-gray-500">Brak parafii do wyświetlenia</span>
      </div>
    );
  }

  return <div ref={mapRef} className="w-full h-full rounded-lg" />;
}

export const ParishMap = dynamic(() => Promise.resolve(MapContent), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full rounded-lg bg-gray-100 flex items-center justify-center">
      <span className="text-gray-500">Ładowanie mapy...</span>
    </div>
  ),
});