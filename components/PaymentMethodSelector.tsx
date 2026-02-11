interface PaymentMethodSelectorProps {
  value: 'blik' | 'card' | 'transfer';
  onChange: (method: 'blik' | 'card' | 'transfer') => void;
}

export function PaymentMethodSelector({ value, onChange }: PaymentMethodSelectorProps) {
  const methods = [
    { id: 'blik' as const, label: 'BLIK' },
    { id: 'card' as const, label: 'Karta' },
    { id: 'transfer' as const, label: 'Przelew online' },
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {methods.map((method) => (
        <button
          key={method.id}
          type="button"
          onClick={() => onChange(method.id)}
          className={`
            h-12 rounded-lg font-medium transition-colors
            ${value === method.id
              ? 'bg-green-600 text-white'
              : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
            }
          `}
        >
          {method.label}
        </button>
      ))}
    </div>
  );
}