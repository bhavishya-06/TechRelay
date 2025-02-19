export interface TeamData {
  name: string;
  totalMembers: number;
  currentMemberNumber: number;
  currentMemberName: string;
  startTime: Date | null;
  endTime: Date | null;
  lifelines: number;
  usedLifelines?: string[];
}

export interface QuizData {
  currentQuestions: Question[];
  currentQuestionIndex: number;
  score: number;
  attempts: number;
}

export interface Question {
  question: string;
  options: string[];
  correct: number;
} 