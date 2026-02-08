import pb from './pocketbase';

export interface Parish {
  id: string;
  name: string;
  city: string;
  tag: string;
  location: {
    lat: number;
    lon: number;
  };
}
export async function getAllParishes(): Promise<Parish[]> {
  const records = await pb.collection('parishes').getFullList({
    sort: 'name',
  });

  return records.map((record: any) => ({
    id: record.id,
    name: record.name,
    city: record.city,
    tag: record.tag,
    location: record.location,
  }));
}

export async function getParishByTag(tag: string): Promise<Parish | null> {
  try {
    const record = await pb.collection('parishes').getFirstListItem(`tag="${tag}"`);

    return {
      id: record.id,
      name: record.name,
      city: record.city,
      tag: record.tag,
      location: record.location,
    };
  } catch (error) {
    return null;
  }
}

export async function searchParishes(query: string): Promise<Parish[]> {
  if (!query.trim()) {
    return getAllParishes();
  }

  const records = await pb.collection('parishes').getFullList({
    filter: `name ~ "${query}" || city ~ "${query}"`,
    sort: 'name',
  });

  return records.map((record: any) => ({
    id: record.id,
    name: record.name,
    city: record.city,
    tag: record.tag,
    location: record.location,
  }));
}