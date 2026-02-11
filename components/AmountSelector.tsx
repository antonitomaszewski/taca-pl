interface AmountSelectorProps {
  value: number;
  onChange: (amount: number) => void;
}

export function AmountSelector({ value, onChange }: AmountSelectorProps) {
  const presets = [10, 20, 50, 100];

  const isPresetActive = (preset: number) => value === preset;

  return (
    <div className="space-y-4">
      {/* Preset buttons */}
      <div className="grid grid-cols-4 gap-3">
        {presets.map((preset) => (
          <button
            key={preset}
            type="button"
            onClick={() => onChange(preset)}
            className={`
              h-12 rounded-lg font-medium transition-colors
              ${isPresetActive(preset)
                ? 'bg-blue-50 border-2 border-blue-500 text-blue-700'
                : 'bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100'
              }
            `}
          >
            {preset} zł
          </button>
        ))}
      </div>

      {/* Custom amount input */}
      <div>
        <label htmlFor="custom-amount" className="block text-sm font-medium text-gray-700 mb-2">
          Inna kwota
        </label>
        <div className="relative">
          <input
            id="custom-amount"
            type="number"
            min="1"
            value={value || ''}
            onChange={(e) => onChange(Number(e.target.value))}
            className="w-full h-12 px-4 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            placeholder="Wpisz kwotę"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
            zł
          </span>
        </div>
      </div>
    </div>
  );
}