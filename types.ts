export interface Question {
  id: string;
  text: string;
  type: 'question' | 'case';
}

export interface EvaluationLevel {
  value: number;
  label: string;
  description: string;
}

export interface Competency {
  id: string;
  name: string;
  description: string;
  questions: Question[];
  evaluationLevels: EvaluationLevel[];
}

// Ключ - ID компетенции, значение - оценка (например, 1-5)
export type Scores = Record<string, number>;