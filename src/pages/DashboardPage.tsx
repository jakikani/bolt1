import React from 'react';
import { Navigate } from 'react-router-dom';
import { Dashboard } from '../components/Dashboard';
import { useAuth } from '../contexts/AuthContext';
import { UserPreferences } from '../types';

export const DashboardPage: React.FC = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Get user preferences from localStorage
  const storedPreferences = localStorage.getItem('userPreferences');
  
  if (!storedPreferences) {
    return <Navigate to="/app/onboarding" replace />;
  }

  const preferences: UserPreferences = JSON.parse(storedPreferences);

  return <Dashboard preferences={preferences} />;
};