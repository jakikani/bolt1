import React from 'react';
import { countries } from '../../data/countries';
import { Country } from '../../types';

interface CountrySelectionProps {
  selectedCountry: Country | null;
  onSelect: (country: Country) => void;
}

export const CountrySelection: React.FC<CountrySelectionProps> = ({
  selectedCountry,
  onSelect,
}) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {countries.map((country) => (
          <button
            key={country.code}
            onClick={() => onSelect(country)}
            className={`p-6 rounded-lg border-2 transition-all hover:scale-105 ${
              selectedCountry?.code === country.code
                ? 'border-green-500 bg-green-50 shadow-lg'
                : 'border-gray-200 hover:border-green-300 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center space-x-4">
              <span className="text-4xl">{country.flag}</span>
              <div className="text-left">
                <h3 className="font-semibold text-lg">{country.name}</h3>
                <p className="text-gray-600">
                  Currency: {country.currencySymbol} {country.currency}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};