import React from 'react';
import { ShoppingCart, MapPin, DollarSign, CheckCircle, AlertCircle, Navigation } from 'lucide-react';
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

  // Mock store comparison data
  const storeComparison = [
    {
      id: 'walmart',
      name: 'Walmart',
      logo: '🛒',
      totalCost: totalCost,
      savings: 12.50,
      distance: '2.3 km',
      isRecommended: true,
      availability: 95,
    },
    {
      id: 'loblaws',
      name: 'Loblaws',
      logo: '🏪',
      totalCost: totalCost * 1.15,
      savings: -9.20,
      distance: '1.8 km',
      isRecommended: false,
      availability: 88,
    },
    {
      id: 'nofrills',
      name: 'No Frills',
      logo: '🛍️',
      totalCost: totalCost * 1.08,
      savings: -4.90,
      distance: '3.1 km',
      isRecommended: false,
      availability: 92,
    },
  ];
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Grocery List */}
      <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <ShoppingCart className="mr-3 text-green-600" size={28} />
            {preferences.mealDuration}-Week Grocery List
          </h2>
          <div className="text-right">
            <p className="text-sm text-gray-600">Total for {preferences.mealDuration * 7} Days</p>
            <p className="text-2xl font-bold text-green-600">
              {preferences.country.currencySymbol}{totalCost.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {Object.entries(categoryGroups).map(([category, items]) => (
            <div key={category} className="border-b border-gray-200 pb-4 last:border-b-0">
              <h3 className="font-semibold text-lg text-gray-900 mb-3 flex items-center">
                <span className="mr-2 text-2xl">
                  {categoryIcons[category as keyof typeof categoryIcons]}
                </span>
                {category.charAt(0).toUpperCase() + category.slice(1)}
                <span className="ml-2 bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                  {items.length} items
                </span>
              </h3>
              <div className="space-y-2">
                {items.map((item) => (
                  <div key={item.ingredient.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center space-x-3">
                      <input 
                        type="checkbox" 
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                      />
                      <div>
                        <p className="font-medium text-gray-900">{item.ingredient.name}</p>
                        <p className="text-sm text-gray-600">
                          {item.totalQuantity} {item.ingredient.unit} • For {preferences.mealDuration * 7} days
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        {preferences.country.currencySymbol}
                        {(item.stores[0]?.price || item.ingredient.estimatedCost).toFixed(2)}
                      </p>
                      {item.stores[0] && (
                        <p className="text-sm text-gray-600 flex items-center">
                          <CheckCircle size={12} className="mr-1 text-green-500" />
                          Available at {item.stores[0].store.name}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Store Comparison */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <MapPin className="mr-2 text-blue-600" size={24} />
          Where to Buy
        </h3>
        
        <div className="space-y-4">
          {storeComparison.map((store) => (
            <div 
              key={store.id} 
              className={`p-4 rounded-lg border-2 transition-all cursor-pointer hover:shadow-md ${
                store.isRecommended 
                  ? 'border-green-500 bg-green-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => onStoreSelect(store.id)}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{store.logo}</span>
                  <span className="font-semibold text-gray-800">{store.name}</span>
                </div>
                {store.isRecommended && (
                  <span className="bg-green-600 text-white px-2 py-1 rounded text-xs font-medium">
                    BEST PRICE
                  </span>
                )}
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Cost:</span>
                  <span className="font-bold text-lg">
                    {preferences.country.currencySymbol}{store.totalCost.toFixed(2)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Savings:</span>
                  <span className={`text-sm font-medium ${
                    store.savings > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {store.savings > 0 ? '+' : ''}{preferences.country.currencySymbol}{store.savings.toFixed(2)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Distance:</span>
                  <span className="text-sm text-gray-700">{store.distance}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Availability:</span>
                  <div className="flex items-center space-x-1">
                    {store.availability >= 90 ? (
                      <CheckCircle size={14} className="text-green-500" />
                    ) : (
                      <AlertCircle size={14} className="text-orange-500" />
                    )}
                    <span className="text-sm text-gray-700">{store.availability}%</span>
                  </div>
                </div>
              </div>
              
              <button className="w-full mt-3 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                <Navigation size={16} />
                <span>Get Directions</span>
              </button>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-blue-800 mb-2">💡 Shopping Tips</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Check store flyers for additional savings</li>
            <li>• Consider buying in bulk for non-perishables</li>
            <li>• Shop early morning for best produce selection</li>
          </ul>
        </div>
      </div>
    </div>
  );
};