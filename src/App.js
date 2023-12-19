import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faArrowLeft, faXmark } from '@fortawesome/free-solid-svg-icons';
import './App.scss';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Menu from './components/Menu/Menu';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Calendar from './components/Calendar/Calendar';
import LoginPage from './components/LoginPage/LoginPage';

function App() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  return (
    <div className="app-container">
      <div className={`side-panel ${isPanelOpen ? 'open' : 'closed'}`}>
        {isPanelOpen ? (
          <FontAwesomeIcon icon={faArrowLeft} className="toggle-icon" onClick={togglePanel} />
        ) : (
          <FontAwesomeIcon icon={faBars} className="menu-icon" onClick={togglePanel} />
        )}
        <h2 className="mobile-logo">InkEmperor</h2>
        <div className={`panel-content ${isPanelOpen ? 'show' : ''}`}>
          <FontAwesomeIcon icon={faXmark} size="lg" className="closeIcon" onClick={togglePanel} />
          <Menu />
        </div>
      </div>
      <div className="app-container_content">
          <Routes>
            <Route path="/auth" element={<LoginPage />} />
            <Route path="/" element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Calendar />
              </ProtectedRoute>
            } />
          </Routes>
      </div>
    </div>
  );
}

export default App;
