import React from 'react';
import Calendar from './components/Calendar/Calendar';
import './App.scss';

function App() {
  return (
    <div className="app-container">
      <div className="side-panel left-panel">
        {/* Left panel content */}
        <h2 style={{textAlign: 'center'}}>Logo here</h2>
        {/* Add navigation links or other content */}
      </div>
      <div className="calendar-container">
        <Calendar />
      </div>
    </div>
  );
}

export default App;
