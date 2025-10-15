import React from 'react';

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  id: string;
  description?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({ label, checked, onChange, id, description }) => {
  return (
    <div className="relative group">
      <label htmlFor={id} className="flex items-center p-3 rounded-xl hover:bg-slate-100 transition-colors duration-200 cursor-pointer">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="h-5 w-5 rounded-md border-gray-300 text-primary-DEFAULT focus:ring-primary-focus transition duration-150 ease-in-out"
        />
        <span className="ml-3 block text-md font-medium text-gray-700 select-none group-hover:text-blue-600 transition-colors">
          {label}
        </span>
      </label>
      {description && (
        <div 
            className="absolute z-20 w-64 p-3 text-sm font-normal text-white bg-slate-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out pointer-events-none left-1/2 -translate-x-1/2 top-full mt-2"
            role="tooltip"
        >
          {description}
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-8 border-b-slate-800"></div>
        </div>
      )}
    </div>
  );
};