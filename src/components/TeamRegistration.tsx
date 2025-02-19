import React, { useState } from 'react';
import { TeamData } from '../types';

interface TeamRegistrationProps {
  onStartQuiz: (data: TeamData) => void;
}

function TeamRegistration({ onStartQuiz }: TeamRegistrationProps) {
  const [teamName, setTeamName] = useState('');
  const [totalMembers, setTotalMembers] = useState<number>(2);
  const [memberNumber, setMemberNumber] = useState<number>(1);
  const [memberName, setMemberName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamName || !memberName) {
      setError('Please fill all fields');
      return;
    }

    onStartQuiz({
      name: teamName,
      totalMembers,
      currentMemberNumber: memberNumber,
      currentMemberName: memberName,
      lifelines: totalMembers,
      startTime: new Date(),
      endTime: null
    });
  };

  return (
    <div className="section">
      <h1>TechRelay Registration</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Team Name</label>
          <input
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            placeholder="Enter team name"
          />
        </div>

        <div className="form-group">
          <label>Number of Team Members</label>
          <select 
            value={totalMembers} 
            onChange={(e) => setTotalMembers(Number(e.target.value))}
            aria-label="Number of team members"
          >
            <option value={2}>2 Members</option>
            <option value={3}>3 Members</option>
            <option value={4}>4 Members</option>
          </select>
        </div>

        <div className="form-group">
          <label>Which member are you?</label>
          <select 
            value={memberNumber} 
            onChange={(e) => setMemberNumber(Number(e.target.value))}
            aria-label="Select your member number"
          >
            {[...Array(totalMembers)].map((_, i) => (
              <option key={i + 1} value={i + 1}>Member {i + 1}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Your Name</label>
          <input
            type="text"
            value={memberName}
            onChange={(e) => setMemberName(e.target.value)}
            placeholder="Enter your name"
          />
        </div>

        {error && <div className="error-message">{error}</div>}
        <button type="submit">Start Quiz</button>
      </form>
    </div>
  );
}

export default TeamRegistration; 