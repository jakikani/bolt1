import React from 'react';
import { ShoppingCart, MapPin, DollarSign, Download, Share } from 'lucide-react';

export const GroceryPage: React.FC = () => {
  const groceryCategories = [
    {
      name: 'Produce',
      icon: '🥕',
      items: [
        { name: 'Mixed Greens', quantity: '450g', price: 6.60 },
        { name: 'Cherry Tomatoes', quantity: '300g', price: 5.40 },
        { name: 'Bell Peppers', quantity: '600g', price: 6.00 },
        { name: 'Broccoli', quantity: '450g', price: 4.50 },
      ]
    },
    {
      name: 'Meat & Seafood',
      icon: '🥩',
      items: [
        { name: 'Chicken Breast', quantity: '600g', price: 13.50 },
        { name: 'Salmon Fillet', quantity: '540g', price: 18.00 },
      ]
    },
    {
      name: 'Pantry',
      icon: '🥫',
      items: [
        { name: 'Soy Sauce', quantity: '90ml', price: 1.50 },
        { name: 'Teriyaki Sauce', quantity: '150ml', price: 3.60 },
        { name: 'Jasmine Rice', quantity: '300g', price: 2.40 },
      ]
    }
  ];

  const totalCost = groceryCategories.reduce((total, category) => 
    total + category.items.reduce((sum, item) => sum + item.price, 0), 0
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Grocery Lists</h1>
        <p className="text-gray-600">Your optimized shopping list for this week</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Grocery List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <ShoppingCart className="mr-3 text-green-600" size={28} />
                Weekly Grocery List
              </h2>
              <div className="flex space-x-2">
                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Download size={16} />
                  <span>Download</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  <Share size={16} />
                  <span>Share</span>
                </button>
              </div>
            </div>

            <div className="space-y-6">
              {groceryCategories.map((category) => (
                <div key={category.name} className="border-b border-gray-200 pb-4">
                  <h3 className="font-semibold text-lg text-gray-900 mb-3 flex items-center">
                    <span className="mr-2 text-2xl">{category.icon}</span>
                    {category.name}
                  </h3>
                  <div className="space-y-2">
                    {category.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <input type="checkbox" className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded" />
                          <div>
                            <p className="font-medium text-gray-900">{item.name}</p>
                            <p className="text-sm text-gray-600">{item.quantity}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">${item.price.toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-green-50 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-green-800">Total Estimated Cost</p>
                  <p className="text-2xl font-bold text-green-700">${totalCost.toFixed(2)}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-green-600">Budget: $150.00</p>
                  <p className="text-sm text-green-600">Remaining: ${(150 - totalCost).toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Store Comparison */}
        <div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Store Comparison</h3>
            
            <div className="space-y-4">
              <div className="p-4 border-2 border-green-500 bg-green-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">🛒</span>
                    <span className="font-semibold text-green-800">Walmart</span>
                  </div>
                  <span className="bg-green-600 text-white px-2 py-1 rounded text-xs font-medium">BEST PRICE</span>
                </div>
                <p className="text-2xl font-bold text-green-700">${totalCost.toFixed(2)}</p>
                <p className="text-sm text-green-600">Save $12.50 vs average</p>
                <div className="flex items-center mt-2 text-sm text-green-600">
                  <MapPin size={12} className="mr-1" />
                  <span>2.3 km away</span>
                </div>
              </div>

              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">🏪</span>
                    <span className="font-semibold text-gray-800">Loblaws</span>
                  </div>
                </div>
                <p className="text-2xl font-bold text-gray-700">${(totalCost * 1.15).toFixed(2)}</p>
                <p className="text-sm text-gray-600">+$9.20 vs best price</p>
                <div className="flex items-center mt-2 text-sm text-gray-600">
                  <MapPin size={12} className="mr-1" />
                  <span>1.8 km away</span>
                </div>
              </div>

              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">🛍️</span>
                    <span className="font-semibold text-gray-800">No Frills</span>
                  </div>
                </div>
                <p className="text-2xl font-bold text-gray-700">${(totalCost * 1.08).toFixed(2)}</p>
                <p className="text-sm text-gray-600">+$4.90 vs best price</p>
                <div className="flex items-center mt-2 text-sm text-gray-600">
                  <MapPin size={12} className="mr-1" />
                  <span>3.1 km away</span>
                </div>
              </div>
            </div>

            <button className="w-full mt-6 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium">
              Get Directions to Walmart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};