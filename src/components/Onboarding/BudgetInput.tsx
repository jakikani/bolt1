import React from 'react';
import { Country } from '../../types';

interface BudgetInputProps {
  budget: number;
  onBudgetChange: (budget: number) => void;
  country: Country;
}

export const BudgetInput: React.FC<BudgetInputProps> = ({
  budget,
  onBudgetChange,
  country,
}) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
          <span className="text-3xl">💰</span>
        </div>
        <p className="text-gray-600">
          Set your weekly grocery budget in {country.currency}
        </p>
      </div>

      <div className="max-w-md mx-auto">
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-xl font-semibold text-gray-700">
            {country.currencySymbol}
          </span>
          <input
            type="number"
            value={budget || ''}
            onChange={(e) => onBudgetChange(Number(e.target.value))}
            placeholder="0.00"
            className="w-full pl-10 pr-4 py-4 text-2xl font-semibold text-center border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            min="0"
            step="0.01"
          />
        </div>
        
        <div className="mt-4 grid grid-cols-3 gap-2">
          {[50, 100, 150].map((amount) => (
            <button
              key={amount}
              onClick={() => onBudgetChange(amount)}
              className="py-2 px-4 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {country.currencySymbol}{amount}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};