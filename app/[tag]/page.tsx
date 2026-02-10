'use client';

import { ParishHeader } from '@/components/ParishHeader';
import { ParishMiniMap } from '@/components/ParishMiniMap';
import { ParishDescription } from '@/components/ParishDescription';

export default function ParishPage() {
  return (
    <main>
      <ParishHeader 
        name="Parafia św. Wojciecha" 
        city="Warszawa"
        imageUrl='/images/DSCF6138.JPG'
        onDonateClick={() => console.log('Przejście do płatności')}
      />
    
      <div className="max-w-[1200px] mx-auto px-4 py-8">
        <div className="flex gap-6">
          {/* Mapa - kwadratowa, stała szerokość */}
          <div className="w-[350px] h-[350px] flex-shrink-0">
            <ParishMiniMap lat={52.2297} lon={21.0122} />
          </div>

          {/* Opis - reszta szerokości */}
          <div className="flex-1">
            <ParishDescription 
              description={`Parafia św. Wojciecha w Warszawie to jedno z najstarszych miejsc kultu religijnego w stolicy. Kościół został wzniesiony w XIV wieku i od tego czasu służy lokalnej społeczności.

Nasza parafia organizuje regularne nabożeństwa, spotkania dla dzieci i młodzieży oraz liczne inicjatywy charytatywne. Jesteśmy wspólnotą otwartą na wszystkich, którzy chcą pogłębić swoją wiarę i służyć innym.

Zapraszamy na Msze Święte:
- Niedziela: 7:00, 9:00, 11:00, 13:00, 18:00
- Dni powszednie: 7:00, 18:00

Serdecznie zapraszamy do odwiedzenia naszej świątyni i uczestnictwa w życiu parafii.`}
            />
          </div>
        </div>
      </div>
    </main>
  );
}