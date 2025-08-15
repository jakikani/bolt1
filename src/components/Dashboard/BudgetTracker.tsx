import React from 'react';
import { TrendingUp, DollarSign, Target } from 'lucide-react';
import { UserPreferences } from '../../types';

interface BudgetTrackerProps {
  preferences: UserPreferences;
  currentSpend: number;
  projectedSpend: number;
}

export const BudgetTracker: React.FC<BudgetTrackerProps> = ({
  preferences,
  currentSpend,
  projectedSpend,
}) => {
  const budgetUsed = (currentSpend / preferences.weeklyBudget) * 100;
  const projectedBudgetUsed = (projectedSpend / preferences.weeklyBudget) * 100;
  const savings = preferences.weeklyBudget - projectedSpend;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
        <TrendingUp className="mr-3 text-blue-600" size={28} />
        Budget Tracker
      </h2>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <DollarSign className="text-blue-600" size={20} />
              <span className="font-medium text-blue-800">Budget</span>
            </div>
            <p className="text-2xl font-bold text-blue-700">
              {preferences.country.currencySymbol}{preferences.weeklyBudget.toFixed(2)}
            </p>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Target className="text-green-600" size={20} />
              <span className="font-medium text-green-800">Projected</span>
            </div>
            <p className="text-2xl font-bold text-green-700">
              {preferences.country.currencySymbol}{projectedSpend.toFixed(2)}
            </p>
          </div>

          <div className="bg-orange-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="text-orange-600" size={20} />
              <span className="font-medium text-orange-800">Savings</span>
            </div>
            <p className="text-2xl font-bold text-orange-700">
              {preferences.country.currencySymbol}{Math.max(0, savings).toFixed(2)}
            </p>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Budget Usage</span>
            <span className="text-sm text-gray-600">
              {projectedBudgetUsed.toFixed(1)}% of budget
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className={`h-3 rounded-full transition-all duration-500 ${
                projectedBudgetUsed > 90
                  ? 'bg-red-500'
                  : projectedBudgetUsed > 70
                  ? 'bg-orange-500'
                  : 'bg-green-500'
              }`}
              style={{ width: `${Math.min(projectedBudgetUsed, 100)}%` }}
            />
          </div>
          {projectedBudgetUsed > 100 && (
            <p className="text-sm text-red-600 mt-1">
              Over budget by {preferences.country.currencySymbol}{(projectedSpend - preferences.weeklyBudget).toFixed(2)}
            </p>
          )}
        </div>

        <div className="border-t pt-4">
          <h3 className="font-medium text-gray-900 mb-3">This Week's Breakdown</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Groceries</span>
              <span className="font-medium">{preferences.country.currencySymbol}{projectedSpend.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Remaining Budget</span>
              <span className="font-medium text-green-600">
                {preferences.country.currencySymbol}{Math.max(0, savings).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};