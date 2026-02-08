import pb from '../lib/pocketbase.ts';

const PLACEHOLDER_PARISHES = [
  {
    name: 'Parafia św. Wojciecha',
    city: 'Warszawa',
    tag: 'sw-wojciecha-warszawa',
    location: { lat: 52.2297, lon: 21.0122 },
  },
  {
    name: 'Parafia Matki Bożej Częstochowskiej',
    city: 'Kraków',
    tag: 'matki-bozej-czestochowskiej-krakow',
    location: { lat: 50.0647, lon: 19.9450 },
  },
  {
    name: 'Parafia św. Jana Chrzciciela',
    city: 'Gdańsk',
    tag: 'sw-jana-chrzciciela-gdansk',
    location: { lat: 54.3520, lon: 18.6466 },
  },
  {
    name: 'Parafia Najświętszego Serca Pana Jezusa',
    city: 'Poznań',
    tag: 'najswietszego-serca-pana-jezusa-poznan',
    location: { lat: 52.4064, lon: 16.9252 },
  },
  {
    name: 'Parafia św. Stanisława Kostki',
    city: 'Wrocław',
    tag: 'sw-stanislawa-kostki-wroclaw',
    location: { lat: 51.1079, lon: 17.0385 },
  },
];

async function seedParishes() {
  for (const parish of PLACEHOLDER_PARISHES) {
    try {
      await pb.collection('parishes').create(parish);
      console.log('Dodano:', parish.tag);
    } catch (err) {
      console.error('Błąd przy dodawaniu:', parish.tag, err);
    }
  }
}

seedParishes();
