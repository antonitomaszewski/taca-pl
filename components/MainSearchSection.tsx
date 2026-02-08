import { ParishSearchBar } from "./ParishSearchBar";
import { ResultsList } from "./ResultsList";
import { ParishMap } from "./ParishMap";

export function MainSearchSection() {
  return (
    <section className="py-8">
      {/* Nagłówek */}
      <ParishSearchBar />

      {/* Layout: Mapa 80% + Lista 20% */}
      <div className="flex gap-4 h-[600px]">
        {/* Mapa */}
        <div className="flex-[8] bg-gray-100 rounded-lg overflow-hidden">
          <ParishMap />
        </div>
        {/* Lista wyników */}
        <div className="flex-[2] overflow-y-auto">
          <ResultsList />
        </div>
      </div>
    </section>
  );
}