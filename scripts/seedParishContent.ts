import pb from '../lib/pocketbase.ts';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const PARISH_CONTENT = [
  {
    tag: 'sw-wojciecha-warszawa',
    description: `Parafia św. Wojciecha w Warszawie to jedno z najstarszych miejsc kultu religijnego w stolicy. Kościół został wzniesiony w XIV wieku i od tego czasu służy lokalnej społeczności.

Nasza parafia organizuje regularne nabożeństwa, spotkania dla dzieci i młodzieży oraz liczne inicjatywy charytatywne. Jesteśmy wspólnotą otwartą na wszystkich, którzy chcą pogłębić swoją wiarę i służyć innym.

Zapraszamy na Msze Święte:
- Niedziela: 7:00, 9:00, 11:00, 13:00, 18:00
- Dni powszednie: 7:00, 18:00

Serdecznie zapraszamy do odwiedzenia naszej świątyni i uczestnictwa w życiu parafii.`,
    imagePath: 'sw-wojciecha-warszawa.jpg',
  },
  {
    tag: 'matki-bozej-czestochowskiej-krakow',
    description: `Parafia Matki Bożej Częstochowskiej w Krakowie jest miejscem szczególnego kultu Czarnej Madonny. Nasza wspólnota gromadzi wiernych z całego miasta.

Organizujemy pielgrzymki, rekolekcje oraz spotkania formacyjne dla wszystkich grup wiekowych. Jesteśmy tu dla Was każdego dnia.`,
    imagePath: 'matki-bozej-czestochowskiej-krakow.jpg',
  },
  {
    tag: 'sw-jana-chrzciciela-gdansk',
    description: `Parafia św. Jana Chrzciciela w Gdańsku to historyczna świątynia z bogatą tradycją. Zapraszamy na codzienne nabożeństwa i wydarzenia kulturalne.`,
    imagePath: 'sw-jana-chrzciciela-gdansk.jpg',
  },
  {
    tag: 'najswietszego-serca-pana-jezusa-poznan',
    description: `Parafia Najświętszego Serca Pana Jezusa w Poznaniu to miejsce modlitwy i wspólnoty. Działamy na rzecz lokalnej społeczności od ponad 100 lat.`,
    imagePath: 'najswietszego-serca-pana-jezusa-poznan.jpg',
  },
  {
    tag: 'sw-stanislawa-kostki-wroclaw',
    description: `Parafia św. Stanisława Kostki we Wrocławiu zaprasza na Msze Święte i wydarzenia parafialne. Jesteśmy wspólnotą otwartą dla wszystkich.`,
    imagePath: 'sw-stanislawa-kostki-wroclaw.jpg',
  },
];

async function seedParishContent() {
  console.log('Rozpoczynam aktualizację treści parafii...\n');

  for (const content of PARISH_CONTENT) {
    try {
      // Znajdź parafię po tagu
      const parish = await pb.collection('parishes').getFirstListItem(`tag="${content.tag}"`);

      // Przygotuj dane do aktualizacji
      const formData = new FormData();
      formData.append('description', content.description);

      // Dodaj obraz jeśli ścieżka istnieje
      if (content.imagePath) {
        const imagePath = resolve(process.cwd(), 'scripts/images', content.imagePath);
        try {
          const imageBuffer = readFileSync(imagePath);
          const imageBlob = new Blob([imageBuffer]);
          formData.append('image', imageBlob, content.imagePath);
        } catch (imageError) {
          console.log(`⚠️  Nie znaleziono obrazu: ${content.imagePath}`);
        }
      }

      // Zaktualizuj rekord
      await pb.collection('parishes').update(parish.id, formData);

      console.log(`✓ Zaktualizowano: ${content.tag}`);
    } catch (error) {
      console.error(`✗ Błąd przy aktualizacji ${content.tag}:`, error);
    }
  }

  console.log('\nZakończono aktualizację treści!');
  process.exit(0);
}

seedParishContent();