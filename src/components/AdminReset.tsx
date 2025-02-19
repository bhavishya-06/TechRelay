import React, { useState } from 'react';

interface AdminResetProps {
  onClose: () => void;
  onReset: () => void;
}

function AdminReset({ onClose, onReset }: AdminResetProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // You can change this password to anything you want
    if (password === 'techrelay123') {
      localStorage.removeItem('quizTaken');
      onReset();
      onClose();
    } else {
      setError('Incorrect password');
    }
  };

  return (
    <div className="admin-reset-overlay">
      <div className="admin-reset-modal">
        <h2>Admin Reset</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Admin Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <div className="button-group">
            <button type="submit">Reset Quiz</button>
            <button type="button" onClick={onClose} className="cancel-button">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminReset; 