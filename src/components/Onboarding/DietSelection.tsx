import React from 'react';
import { DietType } from '../../types';

interface DietSelectionProps {
  selectedDiet: DietType | null;
  onSelect: (diet: DietType) => void;
}

export const DietSelection: React.FC<DietSelectionProps> = ({
  selectedDiet,
  onSelect,
}) => {
  const dietOptions = [
    {
      type: 'non-vegetarian' as DietType,
      title: 'Non-Vegetarian',
      description: 'Includes meat, fish, and all vegetables',
      icon: '🍖',
    },
    {
      type: 'vegetarian' as DietType,
      title: 'Vegetarian',
      description: 'No meat or fish, includes dairy and eggs',
      icon: '🥕',
    },
    {
      type: 'vegan' as DietType,
      title: 'Vegan',
      description: 'Plant-based only, no animal products',
      icon: '🌱',
    },
    {
      type: 'pescatarian' as DietType,
      title: 'Pescatarian',
      description: 'Fish and seafood, no other meat',
      icon: '🐟',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {dietOptions.map((option) => (
        <button
          key={option.type}
          onClick={() => onSelect(option.type)}
          className={`p-6 rounded-lg border-2 transition-all hover:scale-105 ${
            selectedDiet === option.type
              ? 'border-green-500 bg-green-50 shadow-lg'
              : 'border-gray-200 hover:border-green-300 hover:bg-gray-50'
          }`}
        >
          <div className="text-center">
            <span className="text-4xl mb-3 block">{option.icon}</span>
            <h3 className="font-semibold text-lg mb-2">{option.title}</h3>
            <p className="text-gray-600 text-sm">{option.description}</p>
          </div>
        </button>
      ))}
    </div>
  );
};