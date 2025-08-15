import React from 'react';

interface OnboardingStepProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export const OnboardingStep: React.FC<OnboardingStepProps> = ({
  children,
  title,
  subtitle,
}) => {
  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
        {subtitle && (
          <p className="text-lg text-gray-600">{subtitle}</p>
        )}
      </div>
      <div className="bg-white rounded-xl shadow-lg p-8">
        {children}
      </div>
    </div>
  );
};