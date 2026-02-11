interface ConsentSectionProps {
  acceptedTerms: boolean;
  acceptedPrivacy: boolean;
  onTermsChange: (value: boolean) => void;
  onPrivacyChange: (value: boolean) => void;
}

export function ConsentSection({
  acceptedTerms,
  acceptedPrivacy,
  onTermsChange,
  onPrivacyChange,
}: ConsentSectionProps) {
  return (
    <div className="space-y-3">
      {/* Terms checkbox */}
      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={acceptedTerms}
          onChange={(e) => onTermsChange(e.target.checked)}
          className="mt-1 w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
        />
        <span className="text-sm text-gray-700">
          Akceptuję{' '}
          <a href="#" className="text-green-600 hover:text-green-700 underline">
            regulamin
          </a>
        </span>
      </label>

      {/* Privacy checkbox */}
      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={acceptedPrivacy}
          onChange={(e) => onPrivacyChange(e.target.checked)}
          className="mt-1 w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
        />
        <span className="text-sm text-gray-700">
          Akceptuję{' '}
          <a href="#" className="text-green-600 hover:text-green-700 underline">
            politykę prywatności
          </a>
        </span>
      </label>
    </div>
  );
}