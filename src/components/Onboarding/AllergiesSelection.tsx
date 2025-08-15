import React from 'react';

interface AllergiesSelectionProps {
  selectedAllergies: string[];
  onToggle: (allergy: string) => void;
  customAllergies: string[];
  onAddCustom: (allergy: string) => void;
}

export const AllergiesSelection: React.FC<AllergiesSelectionProps> = ({
  selectedAllergies,
  onToggle,
  customAllergies,
  onAddCustom,
}) => {
  const commonAllergies = [
    'Nuts',
    'Dairy',
    'Gluten',
    'Shellfish',
    'Soy',
    'Eggs',
  ];

  const [customInput, setCustomInput] = React.useState('');

  const handleAddCustom = () => {
    if (customInput.trim() && !customAllergies.includes(customInput.trim())) {
      onAddCustom(customInput.trim());
      setCustomInput('');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium text-gray-900 mb-4">Common Allergies</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {commonAllergies.map((allergy) => (
            <button
              key={allergy}
              onClick={() => onToggle(allergy)}
              className={`p-3 rounded-lg border-2 transition-all ${
                selectedAllergies.includes(allergy)
                  ? 'border-red-500 bg-red-50 text-red-700'
                  : 'border-gray-200 hover:border-red-300 hover:bg-gray-50'
              }`}
            >
              {allergy}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-medium text-gray-900 mb-4">Custom Allergies</h3>
        <div className="flex space-x-2 mb-3">
          <input
            type="text"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            placeholder="Add custom allergy..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            onKeyPress={(e) => e.key === 'Enter' && handleAddCustom()}
          />
          <button
            onClick={handleAddCustom}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Add
          </button>
        </div>
        
        {customAllergies.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {customAllergies.map((allergy) => (
              <span
                key={allergy}
                onClick={() => onToggle(allergy)}
                className={`px-3 py-1 rounded-full text-sm cursor-pointer transition-all ${
                  selectedAllergies.includes(allergy)
                    ? 'bg-red-100 text-red-700 border border-red-300'
                    : 'bg-gray-100 text-gray-700 border border-gray-300'
                }`}
              >
                {allergy}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};