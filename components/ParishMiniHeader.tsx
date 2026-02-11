interface ParishMiniHeaderProps {
  name: string;
  city: string;
  imageUrl?: string;
}

export function ParishMiniHeader({ name, city, imageUrl }: ParishMiniHeaderProps) {
  return (
    <div className="flex gap-4 p-6 border-b border-gray-100">
      <div className="w-20 h-20 bg-gray-200 rounded-lg shrink-0 overflow-hidden">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={name} 
            className="w-full h-full object-cover" 
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-gray-400 text-xs">Brak zdjęcia</span>
          </div>
        )}
      </div>
      <div className="flex flex-col justify-center">
        <h2 className="text-lg font-semibold text-gray-900">{name}</h2>
        <p className="text-sm text-gray-600">{city}</p>
      </div>
    </div>
  );
}