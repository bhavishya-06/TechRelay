import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Prevent refresh
window.addEventListener('beforeunload', (e) => {
  e.preventDefault();
  e.returnValue = '';
  return false;
});

// Block all refresh attempts
window.addEventListener('unload', (e) => {
  e.preventDefault();
  return false;
});

// Prevent keyboard shortcuts but allow typing
window.addEventListener('keydown', (e) => {
  // Block all potential fullscreen exit keys
  if (
    e.key === 'Escape' || 
    e.key === 'F11' || 
    (e.altKey && e.key === 'Enter') ||
    (e.altKey && e.key === 'F4') ||
    (e.ctrlKey && e.altKey && e.key === 'Delete')
  ) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }

  // Only block if not in an input field
  const isInput = e.target instanceof HTMLInputElement || 
                 e.target instanceof HTMLTextAreaElement;

  if (!isInput) {
    // Block F5, Ctrl+R, Ctrl+Shift+R
    if (
      e.key === 'F5' || 
      (e.ctrlKey && e.key === 'r') || 
      (e.ctrlKey && e.shiftKey && e.key === 'R') ||
      (e.altKey && e.key === 'Tab')
    ) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
    
    // Prevent Ctrl+C, Ctrl+V, Ctrl+A outside of inputs
    if (e.ctrlKey && (e.key === 'c' || e.key === 'v' || e.key === 'a')) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  }
});

// Block browser refresh button
window.history.pushState(null, '', window.location.href);
window.onpopstate = function () {
    window.history.pushState(null, '', window.location.href);
};

// Disable right-click context menu
document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  return false;
});

// Add this to prevent alt+tab and window switching
window.addEventListener('blur', () => {
  if (document.fullscreenElement) {
    window.focus();
  }
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
) 