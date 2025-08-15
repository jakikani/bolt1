import { Meal, GroceryStore, Ingredient } from '../types';

export const mockMeals: Meal[] = [
  {
    id: '1',
    name: 'Grilled Chicken Salad',
    image: 'https://images.pexels.com/photos/1213710/pexels-photo-1213710.jpeg?auto=compress&cs=tinysrgb&w=400',
    calories: 420,
    cookingTime: 25,
    difficulty: 'Easy',
    nutrition: {
      protein: 35,
      carbs: 12,
      fat: 18,
      fiber: 8,
    },
    ingredients: [
      { id: '1', name: 'Chicken Breast', quantity: 200, unit: 'g', category: 'meat', estimatedCost: 4.50 },
      { id: '2', name: 'Mixed Greens', quantity: 150, unit: 'g', category: 'produce', estimatedCost: 2.20 },
      { id: '3', name: 'Cherry Tomatoes', quantity: 100, unit: 'g', category: 'produce', estimatedCost: 1.80 },
    ],
  },
  {
    id: '2',
    name: 'Vegetable Stir Fry',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
    calories: 320,
    cookingTime: 15,
    difficulty: 'Easy',
    nutrition: {
      protein: 12,
      carbs: 45,
      fat: 8,
      fiber: 12,
    },
    ingredients: [
      { id: '4', name: 'Bell Peppers', quantity: 200, unit: 'g', category: 'produce', estimatedCost: 2.00 },
      { id: '5', name: 'Broccoli', quantity: 150, unit: 'g', category: 'produce', estimatedCost: 1.50 },
      { id: '6', name: 'Soy Sauce', quantity: 30, unit: 'ml', category: 'pantry', estimatedCost: 0.50 },
    ],
  },
  {
    id: '3',
    name: 'Salmon Teriyaki',
    image: 'https://images.pexels.com/photos/725198/pexels-photo-725198.jpeg?auto=compress&cs=tinysrgb&w=400',
    calories: 380,
    cookingTime: 20,
    difficulty: 'Medium',
    nutrition: {
      protein: 28,
      carbs: 8,
      fat: 22,
      fiber: 2,
    },
    ingredients: [
      { id: '7', name: 'Salmon Fillet', quantity: 180, unit: 'g', category: 'meat', estimatedCost: 6.00 },
      { id: '8', name: 'Teriyaki Sauce', quantity: 50, unit: 'ml', category: 'pantry', estimatedCost: 1.20 },
      { id: '9', name: 'Jasmine Rice', quantity: 100, unit: 'g', category: 'pantry', estimatedCost: 0.80 },
    ],
  },
  {
    id: '4',
    name: 'Greek Yogurt Parfait',
    image: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=400',
    calories: 280,
    cookingTime: 5,
    difficulty: 'Easy',
    nutrition: {
      protein: 20,
      carbs: 35,
      fat: 8,
      fiber: 6,
    },
    ingredients: [
      { id: '10', name: 'Greek Yogurt', quantity: 200, unit: 'g', category: 'dairy', estimatedCost: 2.50 },
      { id: '11', name: 'Mixed Berries', quantity: 100, unit: 'g', category: 'produce', estimatedCost: 3.00 },
      { id: '12', name: 'Granola', quantity: 50, unit: 'g', category: 'pantry', estimatedCost: 1.50 },
    ],
  },
  {
    id: '5',
    name: 'Turkey Sandwich',
    image: 'https://images.pexels.com/photos/1603901/pexels-photo-1603901.jpeg?auto=compress&cs=tinysrgb&w=400',
    calories: 350,
    cookingTime: 10,
    difficulty: 'Easy',
    nutrition: {
      protein: 25,
      carbs: 40,
      fat: 12,
      fiber: 5,
    },
    ingredients: [
      { id: '13', name: 'Whole Wheat Bread', quantity: 2, unit: 'slices', category: 'bakery', estimatedCost: 1.00 },
      { id: '14', name: 'Turkey Slices', quantity: 100, unit: 'g', category: 'meat', estimatedCost: 3.50 },
      { id: '15', name: 'Lettuce', quantity: 50, unit: 'g', category: 'produce', estimatedCost: 0.75 },
    ],
  },
  {
    id: '6',
    name: 'Quinoa Bowl',
    image: 'https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg?auto=compress&cs=tinysrgb&w=400',
    calories: 400,
    cookingTime: 30,
    difficulty: 'Medium',
    nutrition: {
      protein: 18,
      carbs: 55,
      fat: 14,
      fiber: 10,
    },
    ingredients: [
      { id: '16', name: 'Quinoa', quantity: 100, unit: 'g', category: 'pantry', estimatedCost: 2.00 },
      { id: '17', name: 'Black Beans', quantity: 150, unit: 'g', category: 'pantry', estimatedCost: 1.25 },
      { id: '18', name: 'Avocado', quantity: 1, unit: 'piece', category: 'produce', estimatedCost: 2.50 },
    ],
  },
];

export const mockStores: Record<string, GroceryStore[]> = {
  CA: [
    { id: 'walmart-ca', name: 'Walmart', country: 'CA', logo: '🛒', priceData: {} },
    { id: 'loblaws-ca', name: 'Loblaws', country: 'CA', logo: '🏪', priceData: {} },
    { id: 'nofrills-ca', name: 'No Frills', country: 'CA', logo: '🛍️', priceData: {} },
    { id: 'costco-ca', name: 'Costco', country: 'CA', logo: '📦', priceData: {} },
  ],
  US: [
    { id: 'walmart-us', name: 'Walmart', country: 'US', logo: '🛒', priceData: {} },
    { id: 'target-us', name: 'Target', country: 'US', logo: '🎯', priceData: {} },
    { id: 'kroger-us', name: 'Kroger', country: 'US', logo: '🏪', priceData: {} },
    { id: 'costco-us', name: 'Costco', country: 'US', logo: '📦', priceData: {} },
  ],
  IN: [
    { id: 'bigbasket-in', name: 'BigBasket', country: 'IN', logo: '🛒', priceData: {} },
    { id: 'jiomart-in', name: 'JioMart', country: 'IN', logo: '🛍️', priceData: {} },
    { id: 'dmart-in', name: 'D-Mart', country: 'IN', logo: '🏪', priceData: {} },
  ],
};