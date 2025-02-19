import { useState } from 'react';
import './Lifeline.css';

interface LifelineProps {
  totalLifelines: number;
  usedLifelines: string[];
  onUseLifeline: (lifeline: string) => void;
}

export function Lifeline({ totalLifelines, usedLifelines, onUseLifeline }: LifelineProps) {
  const [showOptions, setShowOptions] = useState(false);

  const lifelineOptions = [
    { id: 'mentor', name: 'Ask From Mentor' },
    { id: 'friend', name: 'Call a Friend' },
    { id: 'skip', name: 'Skip and Swap' },
    { id: 'poll', name: 'Team Poll' }
  ];

  const remainingLifelines = totalLifelines - usedLifelines.length;

  const handleLifelineClick = (lifelineId: string) => {
    onUseLifeline(lifelineId);
    setShowOptions(false);
  };

  return (
    <div className="lifeline-container">
      {remainingLifelines > 0 && (
        <button 
          className="lifeline-main-button"
          onClick={() => setShowOptions(!showOptions)}
        >
          Lifeline ({remainingLifelines} remaining)
        </button>
      )}

      {showOptions && (
        <div className="lifeline-options">
          {lifelineOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => handleLifelineClick(option.id)}
              disabled={usedLifelines.includes(option.id)}
              className={`lifeline-option ${usedLifelines.includes(option.id) ? 'used' : ''}`}
            >
              {option.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
} 