export interface TeamData {
  name: string;
  members: string[];
  currentMemberIndex: number;
  startTime: Date | null;
  endTime: Date | null;
  lifelines: number;
}

export interface QuizData {
  currentQuestions: Question[];
  currentQuestionIndex: number;
}

export interface Question {
  question: string;
  options: string[];
  correct: number;
} 