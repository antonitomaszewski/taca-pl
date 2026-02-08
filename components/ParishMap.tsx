'use client';

import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';


interface Parish {
  id: string;
  name: string;
  city: string;
  slug: string;
  lat: number;
  lng: number;
}

const PLACEHOLDER_PARISHES: Parish[] = [
  {
    id: '1',
    name: 'Parafia św. Wojciecha',
    city: 'Warszawa',
    slug: 'sw-wojciecha-warszawa',
    lat: 52.2297,
    lng: 21.0122,
  },
  {
    id: '2',
    name: 'Parafia Matki Bożej Częstochowskiej',
    city: 'Kraków',
    slug: 'matki-bozej-czestochowskiej-krakow',
    lat: 50.0647,
    lng: 19.9450,
  },
  {
    id: '3',
    name: 'Parafia św. Jana Chrzciciela',
    city: 'Gdańsk',
    slug: 'sw-jana-chrzciciela-gdansk',
    lat: 54.3520,
    lng: 18.6466,
  },
  {
    id: '4',
    name: 'Parafia Najświętszego Serca Pana Jezusa',
    city: 'Poznań',
    slug: 'najswietszego-serca-pana-jezusa-poznan',
    lat: 52.4064,
    lng: 16.9252,
  },
  {
    id: '5',
    name: 'Parafia św. Stanisława Kostki',
    city: 'Wrocław',
    slug: 'sw-stanislawa-kostki-wroclaw',
    lat: 51.1079,
    lng: 17.0385,
  },
];

function MapContent() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

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
      PLACEHOLDER_PARISHES.forEach((parish) => {
        const marker = L.marker([parish.lat, parish.lng]).addTo(map);

        // Tooltip z nazwą parafii (pokazuje się na hover)
        marker.bindTooltip(parish.name, {
          permanent: false,
          direction: 'top',
        });

        // Kliknięcie w marker → przekierowanie
        marker.on('click', () => {
          window.location.href = `/${parish.slug}`;
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
  }, []);

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