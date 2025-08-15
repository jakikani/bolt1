import React from 'react';
import { Calendar, Clock, Users, RotateCw } from 'lucide-react';
import { mockMeals } from '../data/mockData';

export const MealsPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Meal Plans</h1>
        <p className="text-gray-600">Manage your weekly meal plans and discover new recipes</p>
      </div>

      {/* Week Navigation */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Current Week</h2>
            <p className="text-gray-600">January 20 - January 26, 2025</p>
          </div>
          <div className="flex space-x-2">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Previous Week
            </button>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              Next Week
            </button>
          </div>
        </div>
      </div>

      {/* Meal Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockMeals.map((meal) => (
          <div key={meal.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="relative">
              <img 
                src={meal.image} 
                alt={meal.name}
                className="w-full h-48 object-cover"
              />
              <button className="absolute top-4 right-4 p-2 bg-white bg-opacity-90 rounded-full hover:bg-opacity-100 transition-all">
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

              <div className="flex justify-between text-xs text-gray-500 mb-4">
                <span>Carbs: {meal.nutrition.carbs}g</span>
                <span>Fat: {meal.nutrition.fat}g</span>
                <span>Fiber: {meal.nutrition.fiber}g</span>
              </div>

              <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
                View Recipe
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};