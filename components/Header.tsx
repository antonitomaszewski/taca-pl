import Link from 'next/link';

export function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-300 px-4 py-4">
        <Link 
          href="/" 
          className="inline-block text-2xl font-bold text-green-600 hover:text-green-700 transition-colors"
        >
          Taca.pl
        </Link>
      </div>
    </header>
  );
}