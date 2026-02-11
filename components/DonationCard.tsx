'use client';

import { useState } from 'react';
import { Parish } from '@/lib/parishService';
import { ParishMiniHeader } from './ParishMiniHeader';
import { AmountSelector } from './AmountSelector';
import { FrequencySelector } from './FrequencySelector';
import { PaymentMethodSelector } from './PaymentMethodSelector';
import { UserDataForm } from './UserDataForm';
import { DonationSummary } from './DonationSummary';
import { ConsentSection } from './ConsentSection';
import pb from '@/lib/pocketbase';

interface DonationCardProps {
  parish: Parish;
}

export function DonationCard({ parish }: DonationCardProps) {
  const [amount, setAmount] = useState(0);
  const [frequency, setFrequency] = useState<'once' | 'monthly'>('once');
  const [method, setMethod] = useState<'blik' | 'card' | 'transfer'>('blik');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);

  const imageUrl = parish.image 
    ? `${pb.baseURL}/api/files/parishes/${parish.id}/${parish.image}`
    : undefined;

  const isFormValid = 
    email.trim() !== '' &&
    amount > 0 &&
    acceptedTerms &&
    acceptedPrivacy;

  const handleSubmit = () => {
    console.log('SUBMIT DONATION', {
      parishId: parish.id,
      parishName: parish.name,
      amount,
      frequency,
      method,
      email,
      fullName,
      acceptedTerms,
      acceptedPrivacy,
    });
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-162.5 mx-auto bg-white rounded-lg border border-gray-200 shadow-sm">
        
        <ParishMiniHeader 
          name={parish.name}
          city={parish.city}
          imageUrl={imageUrl}
        />

        <div className="p-6 border-b border-gray-100">
          <div className="text-sm font-medium text-gray-700 mb-4">Kwota wpłaty</div>
          <AmountSelector value={amount} onChange={setAmount} />
        </div>

        <div className="p-6 border-b border-gray-100">
          <div className="text-sm font-medium text-gray-700 mb-4">Częstotliwość</div>
          <FrequencySelector value={frequency} onChange={setFrequency} />
        </div>

        <div className="p-6 border-b border-gray-100">
          <div className="text-sm font-medium text-gray-700 mb-4">Metoda płatności</div>
          <PaymentMethodSelector value={method} onChange={setMethod} />
        </div>

        <div className="p-6 border-b border-gray-100">
          <div className="text-sm font-medium text-gray-700 mb-4">Dane darczyńcy</div>
          <UserDataForm
            email={email}
            fullName={fullName}
            onEmailChange={setEmail}
            onFullNameChange={setFullName}
          />
        </div>

        <div className="p-6 border-b border-gray-100">
          <div className="text-sm font-medium text-gray-700 mb-4">Podsumowanie</div>
          <DonationSummary
            amount={amount}
            frequency={frequency}
            method={method}
            email={email}
            fullName={fullName}
            parishName={parish.name}
          />
        </div>

        <div className="p-6 border-b border-gray-100">
          <ConsentSection
            acceptedTerms={acceptedTerms}
            acceptedPrivacy={acceptedPrivacy}
            onTermsChange={setAcceptedTerms}
            onPrivacyChange={setAcceptedPrivacy}
          />
        </div>

        {/* DonateButton placeholder */}
        <div className="p-6">
          <button
            className="w-full h-14 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
            disabled={!isFormValid}
            onClick={handleSubmit}
          >
            Wpłacam
          </button>
        </div>

      </div>
    </div>
  );
}