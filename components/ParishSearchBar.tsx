interface ParishSearchBarProps {
  query: string;
  setQuery: (query: string) => void;
}

export function ParishSearchBar({ query, setQuery }: ParishSearchBarProps) {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">
        Znajdź swoją parafię
      </h1>
      
      <input
        type="text"
        placeholder="Wpisz nazwę parafii lub miejscowość..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
      />
    </div>
  );
}