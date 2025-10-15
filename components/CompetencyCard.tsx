import React from 'react';
import type { Competency } from '../types';

interface CompetencyCardProps {
  competency: Competency;
  isSelected: boolean;
  onSelect: (id: string, isSelected: boolean) => void;
}

export const CompetencyCard: React.FC<CompetencyCardProps> = ({ competency, isSelected, onSelect }) => {
  const { id, name, description } = competency;

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSelect(id, e.target.checked);
  };

  return (
    <div 
      className={`group p-4 border rounded-xl transition-all duration-300 ease-in-out ${
        isSelected 
          ? 'bg-primary/10 border-primary/50 shadow-md' 
          : 'bg-white border-slate-200 hover:border-primary/50 hover:shadow-sm'
      }`}
    >
      <label htmlFor={`comp-${id}`} className="flex items-start cursor-pointer">
        <input
          type="checkbox"
          id={`comp-${id}`}
          checked={isSelected}
          onChange={handleCheckboxChange}
          className="h-5 w-5 rounded-md border-gray-300 text-primary-DEFAULT focus:ring-primary-focus mt-1 flex-shrink-0"
        />
        <div className="ml-3 overflow-hidden">
          <h3 className="font-semibold text-gray-800">{name}</h3>
          <p className="text-sm text-slate-600 mt-1 max-h-0 opacity-0 group-hover:max-h-40 group-hover:opacity-100 transition-all duration-500 ease-in-out">
            {description}
          </p>
        </div>
      </label>
    </div>
  );
};