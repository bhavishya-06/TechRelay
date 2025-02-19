import { useState } from 'react';
import { TeamData, QuizData } from '../types';
import { getQuestionsForMember } from '../data/questions';
import { Lifeline } from './Lifeline';

interface QuizProps {
  teamData: TeamData;
  quizData: QuizData;
  setQuizData: React.Dispatch<React.SetStateAction<QuizData>>;
  onQuizComplete: (endTime: Date, wasSuccessful: boolean) => void;
}

function Quiz({ teamData, quizData, setQuizData, onQuizComplete }: QuizProps) {
  const [showAttemptResults, setShowAttemptResults] = useState(false);
  const [usedLifelines, setUsedLifelines] = useState<string[]>([]);
  const [lifelineMessage, setLifelineMessage] = useState<string>('');
  const [showLifelineMessage, setShowLifelineMessage] = useState(false);

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

  const handleUseLifeline = (lifelineId: string) => {
    if (usedLifelines.includes(lifelineId)) return;

    setUsedLifelines([...usedLifelines, lifelineId]);

    switch (lifelineId) {
      case 'mentor':
        setLifelineMessage('Please wait for your mentor to assist you...');
        break;
      case 'friend':
        setLifelineMessage('Please wait while we connect you with your friend...');
        break;
      case 'skip':
        setLifelineMessage('Please wait for the proctor to handle your Skip and Swap request...');
        break;
      case 'poll':
        setLifelineMessage('Please wait while we gather team responses...');
        break;
    }
    setShowLifelineMessage(true);
  };

  const handleSkipQuestion = () => {
    if (quizData.currentQuestionIndex < quizData.currentQuestions.length - 1) {
      setQuizData({
        ...quizData,
        currentQuestionIndex: quizData.currentQuestionIndex + 1
      });
    }
  };

  const currentQuestion = quizData.currentQuestions[quizData.currentQuestionIndex];

  // Add CSS for the message display
  const messageStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'rgba(44, 62, 80, 0.95)',
    color: 'white',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center',
    zIndex: 1000,
    maxWidth: '80%'
  } as const;

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
      
      <Lifeline 
        totalLifelines={teamData.totalMembers}
        usedLifelines={usedLifelines}
        onUseLifeline={handleUseLifeline}
      />

      {showLifelineMessage && (
        <div style={messageStyle}>
          <p>{lifelineMessage}</p>
          <button 
            onClick={() => setShowLifelineMessage(false)}
            style={{
              marginTop: '10px',
              padding: '8px 16px',
              backgroundColor: 'white',
              color: '#2c3e50',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            OK
          </button>
        </div>
      )}
    </div>
  );
}

export default Quiz; 