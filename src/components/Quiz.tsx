import { useState } from 'react';
import { TeamData, QuizData } from '../types';
import { getQuestionsForMember } from '../data/questions';

interface QuizProps {
  teamData: TeamData;
  quizData: QuizData;
  setQuizData: React.Dispatch<React.SetStateAction<QuizData>>;
  onQuizComplete: (endTime: Date, wasSuccessful: boolean) => void;
}

function Quiz({ teamData, quizData, setQuizData, onQuizComplete }: QuizProps) {
  const [showAttemptResults, setShowAttemptResults] = useState(false);

  const handleAnswerSelect = (selectedIndex: number) => {
    const currentQuestion = quizData.currentQuestions[quizData.currentQuestionIndex];
    
    // Check if this will be the last answer
    const willBeLastQuestion = quizData.currentQuestionIndex === 9;
    
    if (selectedIndex === currentQuestion.correct) {
      // Update score and question index
      setQuizData(prev => ({
        ...prev,
        score: prev.score + 1,
        currentQuestionIndex: prev.currentQuestionIndex + 1
      }));
    } else {
      // Just update question index
      setQuizData(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1
      }));
    }

    // If this was the last question, show results
    if (willBeLastQuestion) {
      setShowAttemptResults(true);
    }
  };

  const handleRetryQuiz = () => {
    // Get fresh copy of questions with shuffled options for this member
    const freshQuestions = getQuestionsForMember(teamData.currentMemberNumber);
    
    setQuizData(prev => ({
      ...prev,
      currentQuestions: freshQuestions,
      currentQuestionIndex: 0,
      score: 0,
      attempts: prev.attempts + 1
    }));
    setShowAttemptResults(false);
  };

  const handleFinishQuiz = () => {
    onQuizComplete(new Date(), quizData.score >= 8);
  };

  const currentQuestion = quizData.currentQuestions[quizData.currentQuestionIndex];

  if (!currentQuestion && !showAttemptResults) {
    return null;
  }

  return (
    <div className="section">
      <h2>Quiz</h2>
      {!showAttemptResults ? (
        <>
          <div className="quiz-header">
            <h2>Member {teamData.currentMemberNumber}: {teamData.currentMemberName}</h2>
            <p>Question {quizData.currentQuestionIndex + 1} of 10</p>
            <p>Attempt: {quizData.attempts}</p>
          </div>
          
          <div className="question-container">
            <h3>{currentQuestion.question}</h3>
            <div className="options-container">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  className="option"
                  onClick={() => handleAnswerSelect(index)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="attempt-results">
          <h2>Attempt {quizData.attempts} Results</h2>
          <div className="score-display">
            <h3>Your Score: {quizData.score}/10</h3>
            {quizData.score >= 8 ? (
              <>
                <p className="success-message">Congratulations! You've passed!</p>
                <div className="retry-buttons">
                  <button onClick={handleRetryQuiz} className="retry-button">
                    Try Again
                  </button>
                  <button onClick={handleFinishQuiz} className="end-button">
                    Finish Quiz
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="retry-message">
                  You need 8 or more correct answers to pass.
                  <br />
                  Would you like to try again?
                </p>
                <div className="retry-buttons">
                  <button onClick={handleRetryQuiz} className="retry-button">
                    Retry Quiz
                  </button>
                  <button onClick={handleFinishQuiz} className="end-button">
                    End Quiz
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Quiz; 