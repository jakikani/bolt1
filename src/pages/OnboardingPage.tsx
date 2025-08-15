import React from 'react';
import { Navigate } from 'react-router-dom';
import { OnboardingFlow } from '../components/OnboardingFlow';
import { useAuth } from '../contexts/AuthContext';
import { UserPreferences } from '../types';

export const OnboardingPage: React.FC = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const handleOnboardingComplete = (preferences: UserPreferences) => {
    // Store preferences in localStorage for now
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
    // In a real app, you'd send this to your backend
    window.location.href = '/app/dashboard';
  };

  return <OnboardingFlow onComplete={handleOnboardingComplete} />;
};