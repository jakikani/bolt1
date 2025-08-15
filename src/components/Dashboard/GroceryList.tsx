import React from 'react';
import { ShoppingCart, MapPin, DollarSign } from 'lucide-react';
import { GroceryItem, UserPreferences } from '../../types';

interface GroceryListProps {
  groceryItems: GroceryItem[];
  preferences: UserPreferences;
  onStoreSelect: (storeId: string) => void;
}

export const GroceryList: React.FC<GroceryListProps> = ({
  groceryItems,
  preferences,
  onStoreSelect,
}) => {
  const categoryGroups = groceryItems.reduce((acc, item) => {
    const category = item.ingredient.category;
    if (!acc[category]) acc[category] = [];
    acc[category].push(item);
    return acc;
  }, {} as Record<string, GroceryItem[]>);

  const categoryIcons = {
    produce: '🥕',
    dairy: '🥛',
    meat: '🥩',
    pantry: '🥫',
    frozen: '🧊',
    bakery: '🍞',
  };

  const totalCost = groceryItems.reduce((sum, item) => 
    sum + (item.stores[0]?.price || item.ingredient.estimatedCost), 0
  );

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <ShoppingCart className="mr-3 text-green-600" size={28} />
          Weekly Grocery List
        </h2>
        <div className="text-right">
          <p className="text-sm text-gray-600">Total Estimated Cost</p>
          <p className="text-2xl font-bold text-green-600">
            {preferences.country.currencySymbol}{totalCost.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {Object.entries(categoryGroups).map(([category, items]) => (
          <div key={category} className="border-b border-gray-200 pb-4">
            <h3 className="font-semibold text-lg text-gray-900 mb-3 flex items-center">
              <span className="mr-2 text-2xl">
                {categoryIcons[category as keyof typeof categoryIcons]}
              </span>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </h3>
            <div className="space-y-2">
              {items.map((item) => (
                <div key={item.ingredient.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{item.ingredient.name}</p>
                    <p className="text-sm text-gray-600">
                      {item.totalQuantity} {item.ingredient.unit}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      {preferences.country.currencySymbol}
                      {(item.stores[0]?.price || item.ingredient.estimatedCost).toFixed(2)}
                    </p>
                    {item.stores[0] && (
                      <p className="text-sm text-gray-600 flex items-center">
                        <MapPin size={12} className="mr-1" />
                        {item.stores[0].store.name}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-green-50 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-green-800">Best Store Overall</p>
            <p className="text-sm text-green-600">Walmart - Save 15% compared to average</p>
          </div>
          <button
            onClick={() => onStoreSelect('walmart')}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};