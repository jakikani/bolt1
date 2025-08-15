import React from 'react';
import { Clock, Users, RotateCw } from 'lucide-react';
import { Meal } from '../../types';

interface MealCardProps {
  meal: Meal;
  mealType: 'breakfast' | 'lunch' | 'dinner';
  onRegenerate: () => void;
}

export const MealCard: React.FC<MealCardProps> = ({
  meal,
  mealType,
  onRegenerate,
}) => {
  const mealTypeColors = {
    breakfast: 'bg-orange-100 text-orange-800',
    lunch: 'bg-green-100 text-green-800',
    dinner: 'bg-purple-100 text-purple-800',
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative">
        <img 
          src={meal.image} 
          alt={meal.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${mealTypeColors[mealType]}`}>
            {mealType.charAt(0).toUpperCase() + mealType.slice(1)}
          </span>
        </div>
        <button
          onClick={onRegenerate}
          className="absolute top-4 right-4 p-2 bg-white bg-opacity-90 rounded-full hover:bg-opacity-100 transition-all"
          title="Regenerate meal"
        >
          <RotateCw size={16} className="text-gray-600" />
        </button>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{meal.name}</h3>
        
        <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <Clock size={16} />
            <span>{meal.cookingTime} min</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users size={16} />
            <span>{meal.difficulty}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-orange-600">{meal.calories}</p>
            <p className="text-sm text-gray-600">Calories</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">{meal.nutrition.protein}g</p>
            <p className="text-sm text-gray-600">Protein</p>
          </div>
        </div>

        <div className="flex justify-between text-xs text-gray-500">
          <span>Carbs: {meal.nutrition.carbs}g</span>
          <span>Fat: {meal.nutrition.fat}g</span>
          <span>Fiber: {meal.nutrition.fiber}g</span>
        </div>
      </div>
    </div>
  );
};