import React from 'react';
import type { Competency } from '../types';
import { Card } from './ui/Card';
import { CompetencyCard } from './CompetencyCard';

interface CompetencySelectorProps {
  allCompetencies: Competency[];
  selectedIds: Set<string>;
  onCompetencyChange: (id: string, isSelected: boolean) => void;
  className?: string;
}

export const CompetencySelector: React.FC<CompetencySelectorProps> = ({
  allCompetencies,
  selectedIds,
  onCompetencyChange,
  className,
}) => {
  return (
    <Card title="Блок 1: Выбор Компетенций" className={className}>
      <p className="text-slate-600 mb-6">
        Выбери из списка ниже те софт-скиллы, которые ты хочешь проверить на собеседовании. 
        На основе твоего выбора будут сгенерированы вопросы и оценочный лист.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {allCompetencies.map((competency) => (
          <CompetencyCard
            key={competency.id}
            competency={competency}
            isSelected={selectedIds.has(competency.id)}
            onSelect={onCompetencyChange}
          />
        ))}
      </div>
    </Card>
  );
};