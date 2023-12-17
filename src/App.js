import React, { useState } from 'react';
import Calendar from './components/Calendar/Calendar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './App.scss';

function App() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  return (
    <div className="app-container">
      <div className={`side-panel left-panel ${isPanelOpen ? 'open' : 'closed'}`}>
        {isPanelOpen ? (
          <FontAwesomeIcon icon={faArrowLeft} className="toggle-icon" onClick={togglePanel} />
        ) : (
          <FontAwesomeIcon icon={faBars} className="menu-icon" onClick={togglePanel} />
        )}
        <div className={`panel-content ${isPanelOpen ? 'show' : ''}`}>
          <h2 style={{textAlign: 'center'}}>Logo here</h2>
          {/* Navigation links and other content here */}
        </div>
      </div>
      <div className="calendar-container">
        <Calendar />
      </div>
    </div>
  );
}

export default App;
