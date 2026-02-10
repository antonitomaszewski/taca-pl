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
    if (typeof window === 'undefined' || !mapRef.current || mapInstanceRef.current) return;

    import('leaflet').then((L) => {
      if (!mapRef.current || mapInstanceRef.current) return;

      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
      });

      const map = L.map(mapRef.current).setView([lat, lon], 15);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(map);

      L.marker([lat, lon]).addTo(map);

      mapInstanceRef.current = map;
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [lat, lon]);

  return <div ref={mapRef} className="w-full h-full rounded-lg" />;
}

export const ParishMiniMap = dynamic(() => Promise.resolve(MiniMapContent), {
  ssr: false,
});