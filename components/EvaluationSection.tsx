import React from 'react';
import type { Competency, Scores } from '../types';
import { Card } from './ui/Card';

interface EvaluationSectionProps {
  selectedCompetencies: Competency[];
  scores: Scores;
  onScoreChange: (competencyId: string, score: number) => void;
  questionNotes: Record<string, string>;
  onNoteChange: (questionId: string, note: string) => void;
}

const Tag: React.FC<{ text: string }> = ({ text }) => {
    const isCase = text.toLowerCase() === 'кейс';
    const bgColor = isCase ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800';
    return <span className={`inline-block ml-2 px-2 py-0.5 rounded-full text-xs font-semibold ${bgColor}`}>{text}</span>
}


export const EvaluationSection: React.FC<EvaluationSectionProps> = ({
  selectedCompetencies,
  scores,
  onScoreChange,
  questionNotes,
  onNoteChange
}) => {
  return (
    <Card title="Блок 2: Оценка компетенций">
      <div className="space-y-8">
        {selectedCompetencies.map(comp => (
          <div key={comp.id} className="pt-6 border-t border-slate-200 first:pt-0 first:border-t-0">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">{comp.name}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              {/* Left Column: Questions */}
              <div className="bg-slate-50/70 p-4 rounded-lg border border-slate-200">
                <h4 className="font-semibold text-slate-700 mb-3">Вопросы и кейсы:</h4>
                <div className="space-y-5">
                  {comp.questions.map((q) => (
                    <div key={q.id}>
                       <p className="text-slate-800 font-semibold mb-2">
                        {q.text}
                        <Tag text={q.type === 'case' ? 'Кейс' : 'Вопрос'} />
                      </p>
                      <textarea
                        className="w-full text-sm p-2 bg-white border border-slate-300 rounded-xl shadow-sm focus:shadow-md focus:ring-primary-focus focus:border-primary-focus transition duration-150 placeholder-slate-400 resize-y min-h-[40px]"
                        placeholder="Твои заметки по ответу..."
                        value={questionNotes[q.id] || ''}
                        onChange={(e) => onNoteChange(q.id, e.target.value)}
                        rows={2}
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Right Column: Evaluation */}
              <div className="flex flex-col space-y-2">
                {comp.evaluationLevels.map(level => {
                  const isSelected = scores[comp.id] === level.value;
                  return (
                    <button
                      key={level.value}
                      onClick={() => onScoreChange(comp.id, level.value)}
                      className={`text-left p-3 border rounded-xl transition-all duration-200 ease-in-out transform hover:shadow-md hover:-translate-y-px focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-focus ${
                        isSelected 
                          ? 'bg-primary text-white border-primary-hover shadow-lg' 
                          : 'bg-white hover:border-primary/50 border-slate-200'
                      }`}
                    >
                      <span className="font-semibold block">{level.label}</span>
                      <span className={`text-sm ${isSelected ? 'text-primary/20' : 'text-slate-500'}`}>{level.description}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};