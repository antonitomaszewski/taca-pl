interface DonationSummaryProps {
  amount: number;
  frequency: 'once' | 'monthly';
  method: 'blik' | 'card' | 'transfer';
  email: string;
  fullName: string;
  parishName: string;
}

export function DonationSummary({
  amount,
  frequency,
  method,
  email,
  fullName,
  parishName,
}: DonationSummaryProps) {
  const frequencyLabel = frequency === 'once' ? 'Jednorazowa' : 'Miesięczna';
  
  const methodLabel = {
    blik: 'BLIK',
    card: 'Karta',
    transfer: 'Przelew online',
  }[method];

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-3">
      {/* Parish */}
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-600">Parafia</span>
        <span className="text-sm font-medium text-gray-900">{parishName}</span>
      </div>

      {/* Amount */}
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-600">Kwota</span>
        <span className="text-sm font-medium text-gray-900">
          {amount > 0 ? `${amount} zł` : '—'}
        </span>
      </div>

      {/* Frequency */}
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-600">Częstotliwość</span>
        <span className="text-sm font-medium text-gray-900">{frequencyLabel}</span>
      </div>

      {/* Payment Method */}
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-600">Metoda płatności</span>
        <span className="text-sm font-medium text-gray-900">{methodLabel}</span>
      </div>

      {/* Email */}
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-600">Email</span>
        <span className="text-sm font-medium text-gray-900">
          {email || '—'}
        </span>
      </div>

      {/* Full Name (if provided) */}
      {fullName && (
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Imię i nazwisko</span>
          <span className="text-sm font-medium text-gray-900">{fullName}</span>
        </div>
      )}
    </div>
  );
}