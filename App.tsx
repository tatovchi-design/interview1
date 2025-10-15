import React, { useState, useMemo, useEffect } from 'react';
import { CompetencySelector } from './components/CompetencySelector';
import { EvaluationSection } from './components/EvaluationSection';
import { VisualizationSection } from './components/VisualizationSection';
import { MotivationSection } from './components/MotivationSection';
import { ALL_COMPETENCIES } from './constants';
import type { Competency, Scores } from './types';

function App() {
  const [selectedCompetencyIds, setSelectedCompetencyIds] = useState<Set<string>>(new Set());
  const [scores, setScores] = useState<Scores>({});
  const [questionNotes, setQuestionNotes] = useState<Record<string, string>>({});
  const [motivationNotes, setMotivationNotes] = useState<Record<string, string>>({});
  const [candidateName, setCandidateName] = useState('');

  useEffect(() => {
    const originalTitle = document.title;
    const handleBeforePrint = () => {
      const reportTitle = `Отчет по кандидату - ${candidateName.trim() || 'Имя не указано'}`;
      document.title = reportTitle;
    };
    const handleAfterPrint = () => {
      document.title = originalTitle;
    };

    window.addEventListener('beforeprint', handleBeforePrint);
    window.addEventListener('afterprint', handleAfterPrint);

    return () => {
      window.removeEventListener('beforeprint', handleBeforePrint);
      window.removeEventListener('afterprint', handleAfterPrint);
      document.title = originalTitle;
    };
  }, [candidateName]);


  const handleCompetencyChange = (id: string, isSelected: boolean) => {
    const newSet = new Set(selectedCompetencyIds);
    if (isSelected) {
      newSet.add(id);
    } else {
      newSet.delete(id);
      // Remove score when competency is deselected
      setScores(prevScores => {
        const newScores = { ...prevScores };
        delete newScores[id];
        return newScores;
      });
       // Remove notes for the deselected competency's questions
      const competency = ALL_COMPETENCIES.find(c => c.id === id);
      if (competency) {
        setQuestionNotes(prevNotes => {
          const newNotes = { ...prevNotes };
          competency.questions.forEach(q => {
            delete newNotes[q.id];
          });
          return newNotes;
        });
      }
    }
    setSelectedCompetencyIds(newSet);
  };

  const handleCompetencyScoreChange = (competencyId: string, score: number) => {
    setScores(prevScores => ({
      ...prevScores,
      [competencyId]: score,
    }));
  };
  
  const handleNoteChange = (questionId: string, note: string) => {
    setQuestionNotes(prev => ({
      ...prev,
      [questionId]: note,
    }));
  };

  const handleMotivationNoteChange = (questionId: string, note: string) => {
    setMotivationNotes(prev => ({
      ...prev,
      [questionId]: note,
    }));
  };
  
  const handleDownloadPdf = () => {
    window.print();
  };

  const selectedCompetencies: Competency[] = useMemo(() => {
    return ALL_COMPETENCIES.filter(comp => selectedCompetencyIds.has(comp.id));
  }, [selectedCompetencyIds]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <header className="bg-white shadow-sm no-print">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-3xl font-bold text-primary">Конструктор компетенций</h1>
          <p className="text-slate-500 mt-1">Создай, проведи и оцени собеседование</p>
        </div>
      </header>
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="printable-content">
          <div className="hidden print:block mb-6">
            <h2 className="text-2xl font-bold">Отчет по кандидату: {candidateName || 'Имя не указано'}</h2>
            <p className="text-slate-600">Дата: {new Date().toLocaleDateString('ru-RU')}</p>
          </div>
          <div className="grid grid-cols-1 gap-8">
            {selectedCompetencies.length === 0 && (
              <div className="no-print text-center py-16 px-6 bg-white rounded-xl shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                  <h3 className="mt-2 text-lg font-medium text-slate-900">Начни работу</h3>
                  <p className="mt-1 text-slate-500">Выбери компетенции, чтобы сгенерировать вопросы и оценочный лист.</p>
                </div>
            )}
            
            <CompetencySelector
              allCompetencies={ALL_COMPETENCIES}
              selectedIds={selectedCompetencyIds}
              onCompetencyChange={handleCompetencyChange}
              className="no-print"
            />

            {selectedCompetencies.length > 0 && (
              <>
                <EvaluationSection
                  selectedCompetencies={selectedCompetencies}
                  scores={scores}
                  onScoreChange={handleCompetencyScoreChange}
                  questionNotes={questionNotes}
                  onNoteChange={handleNoteChange}
                />
                <VisualizationSection
                  selectedCompetencies={selectedCompetencies}
                  scores={scores}
                />
              </>
            )}

            <MotivationSection 
              notes={motivationNotes}
              onNoteChange={handleMotivationNoteChange}
            />
          </div>
        </div>

        <div className="no-print mt-8 p-6 bg-white rounded-xl shadow-lg flex flex-col sm:flex-row items-center gap-4">
          <div className="flex-grow w-full">
            <label htmlFor="candidateName" className="block text-sm font-medium text-slate-700 mb-1">
              Имя и фамилия кандидата
            </label>
            <input
              type="text"
              id="candidateName"
              value={candidateName}
              onChange={(e) => setCandidateName(e.target.value)}
              placeholder="Например, Иван Иванов"
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl shadow-sm focus:shadow-md focus:ring-primary-focus focus:border-primary-focus transition duration-150"
            />
          </div>
          <button
            onClick={handleDownloadPdf}
            className="w-full sm:w-auto mt-2 sm:mt-0 sm:self-end bg-primary text-white font-bold py-2 px-6 rounded-xl shadow-md hover:shadow-lg hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-focus transform transition-all duration-200 ease-in-out hover:-translate-y-px active:translate-y-0 flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd" />
            </svg>
            Скачать PDF
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;