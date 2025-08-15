import React from 'react';
import { TrendingUp, DollarSign, Target, Calendar } from 'lucide-react';

export const BudgetPage: React.FC = () => {
  const weeklyBudget = 150;
  const currentSpend = 61.50;
  const projectedSpend = 67.65;
  const savings = weeklyBudget - projectedSpend;

  const weeklyData = [
    { week: 'Week 1', budget: 150, spent: 67.65, saved: 82.35 },
    { week: 'Week 2', budget: 150, spent: 145.20, saved: 4.80 },
    { week: 'Week 3', budget: 150, spent: 132.40, saved: 17.60 },
    { week: 'Week 4', budget: 150, spent: 158.90, saved: -8.90 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Budget Tracker</h1>
        <p className="text-gray-600">Monitor your grocery spending and savings</p>
      </div>

      {/* Budget Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-blue-100 p-2 rounded-lg">
              <DollarSign className="text-blue-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Weekly Budget</p>
              <p className="text-2xl font-bold text-blue-700">${weeklyBudget.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-orange-100 p-2 rounded-lg">
              <Target className="text-orange-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Current Spend</p>
              <p className="text-2xl font-bold text-orange-700">${currentSpend.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-green-100 p-2 rounded-lg">
              <TrendingUp className="text-green-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Projected Total</p>
              <p className="text-2xl font-bold text-green-700">${projectedSpend.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-purple-100 p-2 rounded-lg">
              <Calendar className="text-purple-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Estimated Savings</p>
              <p className="text-2xl font-bold text-purple-700">${Math.max(0, savings).toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Budget Progress */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">This Week's Progress</h2>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Budget Usage</span>
                <span className="text-sm text-gray-600">
                  {((projectedSpend / weeklyBudget) * 100).toFixed(1)}% of budget
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-gradient-to-r from-green-500 to-blue-500 h-4 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min((projectedSpend / weeklyBudget) * 100, 100)}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-green-600">Money Saved</p>
                <p className="text-xl font-bold text-green-700">${Math.max(0, savings).toFixed(2)}</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-600">Days Remaining</p>
                <p className="text-xl font-bold text-blue-700">4</p>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-medium text-gray-900 mb-3">Spending Breakdown</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Produce</span>
                  <span className="font-medium">$22.50</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Meat & Seafood</span>
                  <span className="font-medium">$31.50</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Pantry Items</span>
                  <span className="font-medium">$7.50</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Other</span>
                  <span className="font-medium">$6.15</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Monthly Overview */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Monthly Overview</h2>
          
          <div className="space-y-4">
            {weeklyData.map((week, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-900">{week.week}</span>
                  <span className={`text-sm font-medium ${
                    week.saved >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {week.saved >= 0 ? '+' : ''}${week.saved.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Budget: ${week.budget.toFixed(2)}</span>
                  <span>Spent: ${week.spent.toFixed(2)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      week.spent > week.budget ? 'bg-red-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${Math.min((week.spent / week.budget) * 100, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-900">Monthly Total</p>
                <p className="text-sm text-gray-600">4 weeks</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-gray-900">$504.15</p>
                <p className="text-sm text-green-600">Saved $95.85</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};