import { TeamData } from '../types';

interface ResultsProps {
  teamData: TeamData;
  wasSuccessful: boolean;
  score: number;
  attempts: number;
  onStartNew: () => void;
}

function Results({ teamData, wasSuccessful, score, attempts }: ResultsProps) {
  const timeTaken = teamData.endTime && teamData.startTime 
    ? (teamData.endTime.getTime() - teamData.startTime.getTime()) / 1000
    : 0;

  return (
    <div className="section">
      <h1>TechRelay Results</h1>
      <h2 className={wasSuccessful ? 'success-header' : 'failure-header'}>
        {wasSuccessful ? 'Quiz Completed Successfully!' : 'Quiz Not Completed'}
      </h2>
      
      <div className={`results ${wasSuccessful ? 'success' : 'failure'}`}>
        <h3>Team: {teamData.name}</h3>
        <p>Member {teamData.currentMemberNumber}: {teamData.currentMemberName}</p>
        <p>Total Time: {timeTaken.toFixed(2)} seconds</p>
        <p>Final Score: {score}/10</p>
        <p>Attempts Used: {attempts}</p>
        <p>Remaining Lifelines: {teamData.lifelines}</p>

        {wasSuccessful ? (
          <div className="success-message">
            <p>Congratulations! You've passed the quiz!</p>
            <p>You scored {score} out of 10 questions correctly.</p>
          </div>
        ) : (
          <div className="failure-message">
            <p>Quiz ended with a score of {score}/10</p>
            {attempts < 3 ? (
              <p>You can try again to improve your score.</p>
            ) : (
              <p>Maximum attempts reached.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Results; 