interface FrequencySelectorProps {
  value: 'once' | 'monthly';
  onChange: (value: 'once' | 'monthly') => void;
}

export function FrequencySelector({ value, onChange }: FrequencySelectorProps) {
  return (
    <div className="flex gap-3">
      <button
        type="button"
        onClick={() => onChange('once')}
        className={`
          flex-1 h-12 rounded-lg font-medium transition-colors
          ${value === 'once'
            ? 'bg-green-600 text-white'
            : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
          }
        `}
      >
        Jednorazowa
      </button>
      <button
        type="button"
        onClick={() => onChange('monthly')}
        className={`
          flex-1 h-12 rounded-lg font-medium transition-colors
          ${value === 'monthly'
            ? 'bg-green-600 text-white'
            : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
          }
        `}
      >
        Miesięczna
      </button>
    </div>
  );
}