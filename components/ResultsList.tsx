import Link from 'next/link';

interface Parish {
  id: string;
  name: string;
  city: string;
  tag: string;
}

const PLACEHOLDER_PARISHES: Parish[] = [
  {
    id: '1',
    name: 'Parafia św. Wojciecha',
    city: 'Warszawa',
    tag: 'sw-wojciecha-warszawa',
  },
  {
    id: '2',
    name: 'Parafia Matki Bożej Częstochowskiej',
    city: 'Kraków',
    tag: 'matki-bozej-czestochowskiej-krakow',
  },
  {
    id: '3',
    name: 'Parafia św. Jana Chrzciciela',
    city: 'Gdańsk',
    tag: 'sw-jana-chrzciciela-gdansk',
  },
  {
    id: '4',
    name: 'Parafia Najświętszego Serca Pana Jezusa',
    city: 'Poznań',
    tag: 'najswietszego-serca-pana-jezusa-poznan',
  },
  {
    id: '5',
    name: 'Parafia św. Stanisława Kostki',
    city: 'Wrocław',
    tag: 'sw-stanislawa-kostki-wroclaw',
  },
];

export function ResultsList() {
  return (
    <div className="bg-gray-50 rounded-lg overflow-hidden">
      {PLACEHOLDER_PARISHES.map((parish) => (
        <Link
          key={parish.id}
          href={`/${parish.tag}`}
          className="block px-4 py-4 border-b border-gray-200 last:border-b-0 hover:bg-gray-100 transition-colors"
        >
          <h3 className="font-semibold text-gray-900 text-sm mb-1">
            {parish.name}
          </h3>
          <p className="text-gray-600 text-xs">
            {parish.city}
          </p>
        </Link>
      ))}
    </div>
  );
}