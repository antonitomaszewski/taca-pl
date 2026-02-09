import Link from 'next/link';
import { Parish } from '../lib/parishService';

interface ResultsListProps {
  results: Parish[];
}

export function ResultsList({ results }: ResultsListProps) {
  return (
    <div className="bg-gray-50 rounded-lg overflow-hidden">
      {results.map((parish) => (
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