import { useState, useEffect } from 'react';
import TeamRegistration from './components/TeamRegistration';
import Quiz from './components/Quiz';
import Results from './components/Results';
import { getQuestionsForMember } from './data/questions';
import { TeamData, QuizData } from './types';
import './index.css';
import './App.css';
import AdminReset from './components/AdminReset';

function App() {
  const [teamData, setTeamData] = useState<TeamData>({
    name: '',
    totalMembers: 2,
    currentMemberNumber: 1,
    currentMemberName: '',
    startTime: null,
    endTime: null,
    lifelines: 2
  });
  
  const [currentView, setCurrentView] = useState<'registration' | 'quiz' | 'results'>('registration');
  const [quizData, setQuizData] = useState<QuizData>({
    currentQuestions: [],
    currentQuestionIndex: 0,
    score: 0,
    attempts: 0
  });

  const [wasSuccessful, setWasSuccessful] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showAdminReset, setShowAdminReset] = useState(false);
  const [wasRefreshed, setWasRefreshed] = useState(false);

  // Check for refresh on mount
  useEffect(() => {
    const quizState = localStorage.getItem('quizState');
    if (quizState) {
      const { wasRefreshed } = JSON.parse(quizState);
      if (wasRefreshed && currentView === 'quiz') {
        // Quiz was interrupted by refresh
        handleQuizComplete(new Date(), false);
        localStorage.removeItem('quizState'); // Clear the refresh state
      }
    }

    // Check if page was refreshed
    if (performance.navigation.type === 1) {
      setWasRefreshed(true);
    }

    // Add keyboard shortcut for admin reset (Ctrl + Alt + R)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.altKey && e.key === 'r') {
        e.preventDefault();
        setShowAdminReset(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Check if quiz was already taken
  useEffect(() => {
    const quizTaken = localStorage.getItem('quizTaken');
    if (quizTaken) {
      const savedData = JSON.parse(quizTaken);
      setTeamData(savedData.teamData);
      setWasSuccessful(savedData.wasSuccessful);
      setCurrentView('results');
    }
  }, []);

  // Update the fullscreen effect
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isFullScreen = !!document.fullscreenElement;
      setIsFullscreen(isFullScreen);
      
      // Only force fullscreen during quiz
      if (!isFullScreen && currentView === 'quiz') {
        document.documentElement.requestFullscreen().catch(err => {
          console.log('Error attempting to enable fullscreen:', err);
        });
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, [currentView]);

  // Separate effect for quiz fullscreen enforcement
  useEffect(() => {
    if (currentView === 'quiz') {
      const enforceFullScreen = () => {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch(err => {
            console.log(err);
          });
        }
      };

      enforceFullScreen();

      const handleVisibilityChange = () => {
        if (document.visibilityState === 'visible') {
          enforceFullScreen();
        }
      };

      document.addEventListener('visibilitychange', handleVisibilityChange);
      window.addEventListener('blur', enforceFullScreen);
      window.addEventListener('focus', enforceFullScreen);

      return () => {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        window.removeEventListener('blur', enforceFullScreen);
        window.removeEventListener('focus', enforceFullScreen);
      };
    }
  }, [currentView]);

  // Update the title in the document
  useEffect(() => {
    document.title = 'TechRelay';
  }, []);

  const handleStartQuiz = (data: TeamData) => {
    const quizTaken = localStorage.getItem('quizTaken');
    if (quizTaken) return;

    document.documentElement.requestFullscreen().then(() => {
      setTeamData(data);
      setQuizData({
        currentQuestions: getQuestionsForMember(data.currentMemberNumber),
        currentQuestionIndex: 0,
        score: 0,
        attempts: 1
      });
      setCurrentView('quiz');
    }).catch(err => {
      console.log('Error attempting to enable fullscreen:', err);
    });
  };

  const handleQuizComplete = (endTime: Date, success: boolean) => {
    // Only exit fullscreen if we're finishing the quiz completely
    if (quizData.score >= 8 || quizData.attempts >= 3) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }
    }

    // If score is less than 8, allow re-attempt
    if (quizData.score < 8 && quizData.attempts < 3) {
      setQuizData(prev => ({
        ...prev,
        currentQuestionIndex: 0,
        score: 0,
        attempts: prev.attempts + 1
      }));
      return;
    }

    const updatedTeamData = {
      ...teamData,
      endTime: endTime
    };
    setTeamData(updatedTeamData);
    setWasSuccessful(success);
    setCurrentView('results');

    // Save quiz state
    const quizState = {
      teamData: updatedTeamData,
      wasSuccessful: success,
      score: quizData.score,
      attempts: quizData.attempts,
      completedAt: new Date().toISOString()
    };
    localStorage.setItem('quizTaken', JSON.stringify(quizState));
  };

  const handleReset = () => {
    setWasRefreshed(false);
    setCurrentView('registration');
    setTeamData({
      name: '',
      totalMembers: 2,
      currentMemberNumber: 1,
      currentMemberName: '',
      startTime: null,
      endTime: null,
      lifelines: 2
    });
    setQuizData({
      currentQuestions: [],
      currentQuestionIndex: 0,
      score: 0,
      attempts: 0
    });
  };

  if (wasRefreshed) {
    return (
      <div className="refresh-warning">
        <h2>Warning: Page Refresh Detected</h2>
        <p>Refreshing the page during the quiz is not allowed.</p>
        <p>Please contact an administrator to reset the quiz.</p>
        {showAdminReset && (
          <AdminReset
            onClose={() => setShowAdminReset(false)}
            onReset={handleReset}
          />
        )}
      </div>
    );
  }

  return (
    <>
      <div className="video-background">
        <video autoPlay muted loop playsInline>
          <source src="/background.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="branding">
        <p className="brand-name">TechRelay</p>
        <p className="brand-by">by DevForge</p>
      </div>
      <div className="container">
        {!isFullscreen && (
          <div className="fullscreen-message">
            <p>This quiz requires fullscreen mode.</p>
            <button onClick={() => document.documentElement.requestFullscreen()}>
              Enter Fullscreen
            </button>
          </div>
        )}
        
        {isFullscreen && currentView === 'registration' && !localStorage.getItem('quizTaken') && (
          <TeamRegistration onStartQuiz={handleStartQuiz} />
        )}
        
        {currentView === 'quiz' && !localStorage.getItem('quizTaken') && (
          <Quiz 
            teamData={teamData}
            quizData={quizData}
            setQuizData={setQuizData}
            onQuizComplete={handleQuizComplete}
          />
        )}
        
        {(currentView === 'results' || localStorage.getItem('quizTaken')) && (
          <Results 
            teamData={teamData}
            wasSuccessful={wasSuccessful}
            score={quizData.score}
            attempts={quizData.attempts}
            onStartNew={() => {}} // Remove ability to start new quiz
          />
        )}

        {localStorage.getItem('quizTaken') && currentView !== 'results' && (
          <div className="quiz-locked-message">
            <p>You have already completed the quiz.</p>
            <p>Please contact the administrator to reset your attempt.</p>
          </div>
        )}
      </div>
      {showAdminReset && (
        <AdminReset
          onClose={() => setShowAdminReset(false)}
          onReset={handleReset}
        />
      )}
    </>
  );
}

export default App; 