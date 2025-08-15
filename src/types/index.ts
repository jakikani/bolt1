export interface User {
  id: string;
  email: string;
  preferences: UserPreferences;
}

export interface UserPreferences {
  country: Country;
  cuisineType: CuisineType;
  dietType: DietType;
  allergies: string[];
  mealDuration: number;
  weeklyBudget: number;
  mealPlanningStyle: MealPlanningStyle;
}

export interface Country {
  code: string;
  name: string;
  flag: string;
  currency: string;
  currencySymbol: string;
}

export type CuisineType = 'local' | 'international' | 'custom';
export type DietType = 'vegetarian' | 'non-vegetarian' | 'vegan' | 'pescatarian';
export type MealPlanningStyle = 'nutrition-focused' | 'random-variety' | 'weight-loss';

export interface Meal {
  id: string;
  name: string;
  image: string;
  calories: number;
  cookingTime: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  nutrition: NutritionInfo;
  ingredients: Ingredient[];
}

export interface NutritionInfo {
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
}

export interface Ingredient {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  category: IngredientCategory;
  estimatedCost: number;
}

export type IngredientCategory = 'produce' | 'dairy' | 'meat' | 'pantry' | 'frozen' | 'bakery';

export interface GroceryStore {
  id: string;
  name: string;
  country: string;
  logo: string;
  priceData: Record<string, number>;
}

export interface MealPlan {
  id: string;
  userId: string;
  startDate: string;
  duration: number;
  meals: DailyMeals[];
  totalCost: number;
}

export interface DailyMeals {
  date: string;
  breakfast: Meal;
  lunch: Meal;
  dinner: Meal;
}

export interface GroceryList {
  id: string;
  mealPlanId: string;
  items: GroceryItem[];
  totalCost: number;
  storeComparison: StorePrice[];
}

export interface GroceryItem {
  ingredient: Ingredient;
  totalQuantity: number;
  stores: StorePrice[];
}

export interface StorePrice {
  store: GroceryStore;
  price: number;
  available: boolean;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: string;
}

export interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}