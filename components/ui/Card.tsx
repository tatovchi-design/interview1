import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '', title }) => {
  return (
    <div className={`bg-white rounded-xl shadow-lg card-print ${className}`}>
      <div className="p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b border-slate-200 pb-4">{title}</h2>
        <div className="space-y-6">
            {children}
        </div>
      </div>
    </div>
  );
};