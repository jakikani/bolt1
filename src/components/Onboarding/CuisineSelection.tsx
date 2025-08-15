import React from 'react';
import { CuisineType } from '../../types';

interface CuisineSelectionProps {
  selectedCuisine: CuisineType | null;
  onSelect: (cuisine: CuisineType) => void;
  countryName?: string;
}

export const CuisineSelection: React.FC<CuisineSelectionProps> = ({
  selectedCuisine,
  onSelect,
  countryName,
}) => {
  const cuisineOptions = [
    {
      type: 'local' as CuisineType,
      title: `Local ${countryName || ''} Cuisine`,
      description: 'Traditional dishes from your selected country',
      icon: '🏠',
    },
    {
      type: 'international' as CuisineType,
      title: 'International Mix',
      description: 'A variety of cuisines from around the world',
      icon: '🌍',
    },
    {
      type: 'custom' as CuisineType,
      title: 'Custom Selection',
      description: 'Choose specific cuisines you prefer',
      icon: '⚙️',
    },
  ];

  return (
    <div className="space-y-4">
      {cuisineOptions.map((option) => (
        <button
          key={option.type}
          onClick={() => onSelect(option.type)}
          className={`w-full p-6 rounded-lg border-2 transition-all text-left hover:scale-105 ${
            selectedCuisine === option.type
              ? 'border-green-500 bg-green-50 shadow-lg'
              : 'border-gray-200 hover:border-green-300 hover:bg-gray-50'
          }`}
        >
          <div className="flex items-center space-x-4">
            <span className="text-3xl">{option.icon}</span>
            <div>
              <h3 className="font-semibold text-lg">{option.title}</h3>
              <p className="text-gray-600">{option.description}</p>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};