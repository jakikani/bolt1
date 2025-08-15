import React from 'react';
import { User, Calendar, DollarSign, ShoppingCart } from 'lucide-react';
import { UserPreferences } from '../../types';

interface DashboardHeaderProps {
  preferences: UserPreferences;
  currentWeekBudget: number;
  spentAmount: number;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  preferences,
  currentWeekBudget,
  spentAmount,
}) => {
  const budgetPercentage = (spentAmount / currentWeekBudget) * 100;

  return (
    <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Welcome back!</h1>
          <p className="text-green-100">
            Your {preferences.mealDuration}-week meal plan from {preferences.country.name} {preferences.country.flag}
          </p>
        </div>
        <div className="hidden md:flex items-center space-x-2 bg-white bg-opacity-20 rounded-lg p-3">
          <User size={20} />
          <span>Dashboard</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white bg-opacity-20 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <Calendar className="text-green-200" size={24} />
            <div>
              <p className="text-sm text-green-100">Current Week</p>
              <p className="text-xl font-semibold">Week 1 of {preferences.mealDuration}</p>
            </div>
          </div>
        </div>

        <div className="bg-white bg-opacity-20 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <DollarSign className="text-green-200" size={24} />
            <div>
              <p className="text-sm text-green-100">Weekly Budget</p>
              <p className="text-xl font-semibold">
                {preferences.country.currencySymbol}{spentAmount.toFixed(2)} / {preferences.country.currencySymbol}{currentWeekBudget.toFixed(2)}
              </p>
            </div>
          </div>
          <div className="mt-2 bg-white bg-opacity-30 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all ${
                budgetPercentage > 90 ? 'bg-red-300' : budgetPercentage > 70 ? 'bg-yellow-300' : 'bg-green-300'
              }`}
              style={{ width: `${Math.min(budgetPercentage, 100)}%` }}
            />
          </div>
        </div>

        <div className="bg-white bg-opacity-20 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <ShoppingCart className="text-green-200" size={24} />
            <div>
              <p className="text-sm text-green-100">Shopping Status</p>
              <p className="text-xl font-semibold">Ready to shop</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};