export interface TeamData {
  name: string;
  totalMembers: number;
  currentMemberNumber: number;
  currentMemberName: string;
  startTime: Date | null;
  endTime: Date | null;
  lifelines: number;
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