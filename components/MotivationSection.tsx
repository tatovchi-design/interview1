import React from 'react';
import { Card } from './ui/Card';
import { MOTIVATION_QUESTIONS } from '../constants';

interface MotivationSectionProps {
  notes: Record<string, string>;
  onNoteChange: (questionId: string, note: string) => void;
}

export const MotivationSection: React.FC<MotivationSectionProps> = ({ notes, onNoteChange }) => {
  return (
    <Card title="Блок 4: Мотивация">
      <div className="space-y-6">
        {MOTIVATION_QUESTIONS.map(question => (
          <div key={question.id}>
            <p className="text-slate-800 font-semibold mb-2">{question.text}</p>
            <textarea
              className="w-full text-sm p-3 bg-white border border-slate-300 rounded-xl shadow-sm focus:shadow-md focus:ring-primary-focus focus:border-primary-focus transition duration-150 placeholder-slate-400 resize-y min-h-[60px]"
              placeholder="Запиши ответ кандидата..."
              value={notes[question.id] || ''}
              onChange={(e) => onNoteChange(question.id, e.target.value)}
              rows={3}
            />
          </div>
        ))}
      </div>
    </Card>
  );
};