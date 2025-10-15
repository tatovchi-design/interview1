
import React from 'react';
import type { Competency } from '../types';
import { Card } from './ui/Card';

interface QuestionListProps {
  selectedCompetencies: Competency[];
}

const Tag: React.FC<{ text: string }> = ({ text }) => {
    const isCase = text.toLowerCase() === 'кейс';
    const bgColor = isCase ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800';
    return <span className={`inline-block ml-2 px-2 py-0.5 rounded-full text-xs font-semibold ${bgColor}`}>{text}</span>
}

export const QuestionList: React.FC<QuestionListProps> = ({ selectedCompetencies }) => {
  if (selectedCompetencies.length === 0) {
    return null;
  }

  return (
    <Card title="Блок 2: Вопросы и Кейсы">
      <div className="space-y-8">
        {selectedCompetencies.map((comp) => (
          <div key={comp.id}>
            <h3 className="text-xl font-semibold text-gray-700 mb-3">{comp.name}</h3>
            <ul className="list-disc list-inside space-y-2 pl-2">
              {comp.questions.map((q) => (
                <li key={q.id} className="text-slate-600">
                  {q.text}
                  <Tag text={q.type === 'case' ? 'Кейс' : 'Вопрос'} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Card>
  );
};
