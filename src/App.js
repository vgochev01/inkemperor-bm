import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faArrowLeft, faXmark } from '@fortawesome/free-solid-svg-icons';
import {
  Routes,
  Route
} from 'react-router-dom';
import Menu from './components/Menu/Menu';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Calendar from './components/Calendar/Calendar';
import LoginPage from './components/LoginPage/LoginPage';
import CreateEvent from './components/CreateEvent/CreateEvent';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const { isAuthenticated} = useAuth();
  console.log(isAuthenticated);

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
      <div className={`app-container_content ${isPanelOpen ? 'panel-open' : ''}`}>
          <Routes>
            <Route path="/auth" element={<LoginPage />} />
            <Route path="/" element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Calendar />
              </ProtectedRoute>
            } />
            <Route path="/create-event" element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <CreateEvent />
              </ProtectedRoute>
            } />
            <Route path="/analytics" element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                {/* <Analytics /> */}
              </ProtectedRoute>
            } />
          </Routes>
      </div>
    </div>
  );
}

export default App;
