import React, { useState } from 'react';
import { DashboardHeader } from './Dashboard/DashboardHeader';
import { MealCard } from './Dashboard/MealCard';
import { GroceryList } from './Dashboard/GroceryList';
import { BudgetTracker } from './Dashboard/BudgetTracker';
import { UserPreferences, DailyMeals, GroceryItem } from '../types';
import { mockMeals } from '../data/mockData';

interface DashboardProps {
  preferences: UserPreferences;
}

export const Dashboard: React.FC<DashboardProps> = ({ preferences }) => {
  // Mock data for current week
  const [currentWeekMeals, setCurrentWeekMeals] = useState<DailyMeals[]>([
    {
      date: '2025-01-20',
      breakfast: mockMeals[0],
      lunch: mockMeals[1],
      dinner: mockMeals[2],
    },
    {
      date: '2025-01-21',
      breakfast: mockMeals[1],
      lunch: mockMeals[2],
      dinner: mockMeals[0],
    },
    {
      date: '2025-01-22',
      breakfast: mockMeals[2],
      lunch: mockMeals[0],
      dinner: mockMeals[1],
    },
  ]);

  // Mock grocery items
  const groceryItems: GroceryItem[] = mockMeals.flatMap(meal => 
    meal.ingredients.map(ingredient => ({
      ingredient,
      totalQuantity: ingredient.quantity * 3, // For 3 days
      stores: [{
        store: { id: 'walmart', name: 'Walmart', country: preferences.country.code, logo: '🛒', priceData: {} },
        price: ingredient.estimatedCost,
        available: true,
      }],
    }))
  );

  const currentSpend = groceryItems.reduce((sum, item) => sum + item.stores[0].price, 0);
  const projectedSpend = currentSpend * 1.1; // 10% buffer

  const handleRegenerateMeal = (mealType: 'breakfast' | 'lunch' | 'dinner', dayIndex: number) => {
    // Simple regeneration - cycle through available meals
    const availableMeals = mockMeals.filter(meal => meal.id !== currentWeekMeals[dayIndex][mealType].id);
    const newMeal = availableMeals[Math.floor(Math.random() * availableMeals.length)];
    
    setCurrentWeekMeals(prev => prev.map((day, index) => 
      index === dayIndex ? { ...day, [mealType]: newMeal } : day
    ));
  };

  const handleStoreSelect = (storeId: string) => {
    console.log('Selected store:', storeId);
    // Handle store selection for detailed view
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <DashboardHeader 
          preferences={preferences}
          currentWeekBudget={preferences.weeklyBudget}
          spentAmount={currentSpend}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Meal Planning Section */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">This Week's Meals</h2>
            <div className="space-y-8">
              {currentWeekMeals.map((day, dayIndex) => (
                <div key={day.date} className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {new Date(day.date).toLocaleDateString('en-US', { 
                      weekday: 'long',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <MealCard 
                      meal={day.breakfast}
                      mealType="breakfast"
                      onRegenerate={() => handleRegenerateMeal('breakfast', dayIndex)}
                    />
                    <MealCard 
                      meal={day.lunch}
                      mealType="lunch"
                      onRegenerate={() => handleRegenerateMeal('lunch', dayIndex)}
                    />
                    <MealCard 
                      meal={day.dinner}
                      mealType="dinner"
                      onRegenerate={() => handleRegenerateMeal('dinner', dayIndex)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Budget Tracker */}
          <div>
            <BudgetTracker 
              preferences={preferences}
              currentSpend={currentSpend}
              projectedSpend={projectedSpend}
            />
          </div>
        </div>

        {/* Grocery List Section */}
        <GroceryList 
          groceryItems={groceryItems}
          preferences={preferences}
          onStoreSelect={handleStoreSelect}
        />
      </div>
    </div>
  );
};