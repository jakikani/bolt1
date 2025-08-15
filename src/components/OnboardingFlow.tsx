import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, Check } from 'lucide-react';
import { OnboardingStep } from './Onboarding/OnboardingStep';
import { CountrySelection } from './Onboarding/CountrySelection';
import { CuisineSelection } from './Onboarding/CuisineSelection';
import { DietSelection } from './Onboarding/DietSelection';
import { AllergiesSelection } from './Onboarding/AllergiesSelection';
import { BudgetInput } from './Onboarding/BudgetInput';
import { Country, CuisineType, DietType, MealPlanningStyle, UserPreferences } from '../types';

interface OnboardingFlowProps {
  onComplete: (preferences: UserPreferences) => void;
}

export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [selectedCuisine, setSelectedCuisine] = useState<CuisineType | null>(null);
  const [selectedDiet, setSelectedDiet] = useState<DietType | null>(null);
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);
  const [customAllergies, setCustomAllergies] = useState<string[]>([]);
  const [mealDuration, setMealDuration] = useState(1);
  const [weeklyBudget, setWeeklyBudget] = useState(0);
  const [mealPlanningStyle, setMealPlanningStyle] = useState<MealPlanningStyle>('nutrition-focused');

  const steps = [
    'Country Selection',
    'Cuisine Preference',
    'Diet Type',
    'Allergies & Restrictions',
    'Meal Duration',
    'Weekly Budget',
    'Planning Style',
  ];

  const canProceed = () => {
    switch (currentStep) {
      case 0: return selectedCountry !== null;
      case 1: return selectedCuisine !== null;
      case 2: return selectedDiet !== null;
      case 3: return true; // Allergies are optional
      case 4: return mealDuration > 0;
      case 5: return weeklyBudget > 0;
      case 6: return true;
      default: return false;
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    if (!selectedCountry || !selectedCuisine || !selectedDiet) return;

    const preferences: UserPreferences = {
      country: selectedCountry,
      cuisineType: selectedCuisine,
      dietType: selectedDiet,
      allergies: selectedAllergies,
      mealDuration,
      weeklyBudget,
      mealPlanningStyle,
    };

    onComplete(preferences);
  };

  const toggleAllergy = (allergy: string) => {
    setSelectedAllergies(prev => 
      prev.includes(allergy) 
        ? prev.filter(a => a !== allergy)
        : [...prev, allergy]
    );
  };

  const addCustomAllergy = (allergy: string) => {
    setCustomAllergies(prev => [...prev, allergy]);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <OnboardingStep 
            title="Where are you located?" 
            subtitle="This helps us find local ingredients and prices"
          >
            <CountrySelection 
              selectedCountry={selectedCountry} 
              onSelect={setSelectedCountry} 
            />
          </OnboardingStep>
        );
      
      case 1:
        return (
          <OnboardingStep 
            title="What's your cuisine preference?" 
            subtitle="We'll suggest meals based on your taste"
          >
            <CuisineSelection 
              selectedCuisine={selectedCuisine} 
              onSelect={setSelectedCuisine}
              countryName={selectedCountry?.name}
            />
          </OnboardingStep>
        );
      
      case 2:
        return (
          <OnboardingStep 
            title="What's your diet type?" 
            subtitle="We'll customize meals to match your dietary preferences"
          >
            <DietSelection 
              selectedDiet={selectedDiet} 
              onSelect={setSelectedDiet} 
            />
          </OnboardingStep>
        );
      
      case 3:
        return (
          <OnboardingStep 
            title="Any allergies or restrictions?" 
            subtitle="We'll make sure all meals are safe for you"
          >
            <AllergiesSelection 
              selectedAllergies={selectedAllergies}
              onToggle={toggleAllergy}
              customAllergies={customAllergies}
              onAddCustom={addCustomAllergy}
            />
          </OnboardingStep>
        );
      
      case 4:
        return (
          <OnboardingStep 
            title="How long should your meal plan be?" 
            subtitle="Choose the duration that works best for you"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((weeks) => (
                <button
                  key={weeks}
                  onClick={() => setMealDuration(weeks)}
                  className={`p-6 rounded-lg border-2 transition-all hover:scale-105 ${
                    mealDuration === weeks
                      ? 'border-green-500 bg-green-50 shadow-lg'
                      : 'border-gray-200 hover:border-green-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="text-center">
                    <p className="text-3xl font-bold text-green-600 mb-2">{weeks}</p>
                    <p className="text-gray-700">Week{weeks > 1 ? 's' : ''}</p>
                  </div>
                </button>
              ))}
            </div>
          </OnboardingStep>
        );
      
      case 5:
        return (
          <OnboardingStep 
            title="What's your weekly budget?" 
            subtitle="We'll optimize your grocery shopping to stay within budget"
          >
            <BudgetInput 
              budget={weeklyBudget}
              onBudgetChange={setWeeklyBudget}
              country={selectedCountry!}
            />
          </OnboardingStep>
        );
      
      case 6:
        return (
          <OnboardingStep 
            title="Choose your meal planning style" 
            subtitle="How would you like us to plan your meals?"
          >
            <div className="space-y-4">
              {[
                {
                  type: 'nutrition-focused' as MealPlanningStyle,
                  title: 'Nutrition Focused',
                  description: 'Balanced meals with optimal macro and micronutrients',
                  icon: '🥗',
                },
                {
                  type: 'random-variety' as MealPlanningStyle,
                  title: 'Random Variety',
                  description: 'Surprise me with different dishes each week',
                  icon: '🎲',
                },
                {
                  type: 'weight-loss' as MealPlanningStyle,
                  title: 'Weight Management',
                  description: 'Meals optimized for your fitness goals',
                  icon: '💪',
                },
              ].map((style) => (
                <button
                  key={style.type}
                  onClick={() => setMealPlanningStyle(style.type)}
                  className={`w-full p-6 rounded-lg border-2 transition-all text-left hover:scale-105 ${
                    mealPlanningStyle === style.type
                      ? 'border-green-500 bg-green-50 shadow-lg'
                      : 'border-gray-200 hover:border-green-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <span className="text-3xl">{style.icon}</span>
                    <div>
                      <h3 className="font-semibold text-lg">{style.title}</h3>
                      <p className="text-gray-600">{style.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </OnboardingStep>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 py-8">
      {/* Progress Bar */}
      <div className="max-w-4xl mx-auto px-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900">Setup Your Meal Planner</h1>
          <span className="text-gray-600">
            {currentStep + 1} of {steps.length}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {renderStep()}

      {/* Navigation */}
      <div className="max-w-2xl mx-auto px-6 mt-8">
        <div className="flex justify-between">
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all ${
              currentStep === 0
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>

          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className={`flex items-center space-x-2 px-8 py-3 rounded-lg transition-all ${
              canProceed()
                ? 'bg-gradient-to-r from-green-600 to-blue-600 text-white hover:from-green-700 hover:to-blue-700 shadow-lg hover:shadow-xl'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {currentStep === steps.length - 1 ? (
              <>
                <Check size={20} />
                <span>Complete Setup</span>
              </>
            ) : (
              <>
                <span>Next</span>
                <ArrowRight size={20} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};