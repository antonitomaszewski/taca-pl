import { ParishHeader } from '@/components/ParishHeader';
import { ParishMiniMap } from '@/components/ParishMiniMap';

export default function ParishPage() {
  return (
    <main>
      <ParishHeader 
        name="Parafia św. Wojciecha" 
        city="Warszawa"
        imageUrl='/images/DSCF6138.JPG'
      />
    
    <div className="mx-auto max-w-[1200px] px-4 py-8">
        <div className="w-[300px] h-[300px]">
          <ParishMiniMap lat={52.2297} lon={21.0122} />
        </div>
      </div>
    </main>
  );
}