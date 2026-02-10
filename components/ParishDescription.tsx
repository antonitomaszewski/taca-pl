interface ParishDescriptionProps {
  description: string;
}

export function ParishDescription({ description }: ParishDescriptionProps) {
  return (
    <div className="flex-1">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        O parafii
      </h2>
      <p className="text-gray-700 leading-relaxed whitespace-pre-line">
        {description}
      </p>
    </div>
  );
}