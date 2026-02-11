import Image from 'next/image';

interface ParishHeaderProps {
  name: string;
  city: string;
  imageUrl?: string;
  onDonateClick?: () => void;
}
export function ParishHeader({ name, city, imageUrl, onDonateClick }: ParishHeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="mx-auto max-w-300 px-4 py-8">
        <div className="flex flex-col gap-6">
          {/* Zdjęcie parafii */}
          <div className="w-full h-64 md:h-96 bg-gray-200 rounded-lg overflow-hidden">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={name}
                width={1200}
                height={400}
                className="w-full h-full object-cover"
                unoptimized
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-gray-400 text-sm">Brak zdjęcia</span>
              </div>
            )}
          </div>

          {/* Nazwa i miasto */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {name}
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              {city}
            </p>

            {onDonateClick && (
              <button
                onClick={onDonateClick}
                className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
              >
                Wpłacam
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}