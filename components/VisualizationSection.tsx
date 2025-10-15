import React, { useMemo } from 'react';
import type { Competency, Scores } from '../types';
import { RadarChartComponent } from './RadarChartComponent';
import { Card } from './ui/Card';

interface VisualizationSectionProps {
  selectedCompetencies: Competency[];
  scores: Scores;
}

export const VisualizationSection: React.FC<VisualizationSectionProps> = ({
  selectedCompetencies,
  scores,
}) => {
  const chartData = useMemo(() => {
    return selectedCompetencies.map(comp => ({
      name: comp.name,
      score: scores[comp.id] || 0,
    }));
  }, [selectedCompetencies, scores]);

  return (
    <Card title="Блок 3: Визуализация и Анализ">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-6">
        
        {/* --- Visualization Column --- */}
        <div className="lg:col-span-5">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Визуализация</h3>
          <div className="w-full h-80 md:h-96 bg-slate-100/50 p-4 rounded-lg border border-slate-200">
            {chartData.length > 2 ? (
              <RadarChartComponent data={chartData} />
            ) : (
              <div className="flex items-center justify-center h-full text-center text-slate-500">
                <p>Выбери 3 или более компетенции для построения диаграммы.</p>
              </div>
            )}
          </div>
        </div>

        {/* --- Analysis Column --- */}
        <div className="lg:col-span-7">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Анализ результатов</h3>
          <div className="w-full h-80 md:h-96 space-y-3 overflow-y-auto p-4 bg-slate-100/50 rounded-lg border border-slate-200">
            {selectedCompetencies.length > 0 ? selectedCompetencies.map(comp => {
              const score = scores[comp.id];
              const level = score ? comp.evaluationLevels.find(l => l.value === score) : undefined;

              return (
                <div key={comp.id} className="p-3 bg-white rounded-lg border border-slate-200 transition-all hover:border-slate-300 hover:shadow-sm">
                  <h4 className="font-bold text-md text-slate-800">{comp.name}</h4>
                  {level ? (
                    <p className="text-slate-600 text-sm mt-1">
                      <span className="font-semibold text-primary">{score}/5</span>
                      {' - '}
                      {level.description}
                    </p>
                  ) : (
                    <p className="text-slate-400 italic text-sm mt-1">Оценка не выставлена</p>
                  )}
                </div>
              );
            }) : (
              <div className="flex items-center justify-center h-full text-center text-slate-500">
                  <p>Оцени выбранные компетенции в Блоке 2, чтобы увидеть здесь анализ.</p>
                </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};