interface UserDataFormProps {
  email: string;
  fullName: string;
  onEmailChange: (value: string) => void;
  onFullNameChange: (value: string) => void;
}

export function UserDataForm({ 
  email, 
  fullName, 
  onEmailChange, 
  onFullNameChange 
}: UserDataFormProps) {
  return (
    <div className="space-y-4">
      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          placeholder="twoj@email.pl"
          required
        />
      </div>

      {/* Full Name */}
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
          Imię i nazwisko
        </label>
        <input
          id="fullName"
          type="text"
          value={fullName}
          onChange={(e) => onFullNameChange(e.target.value)}
          className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          placeholder="Jan Kowalski"
        />
      </div>
    </div>
  );
}