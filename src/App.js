import React, { useState, useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import * as artistService from './services/artistService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faArrowLeft, faXmark } from '@fortawesome/free-solid-svg-icons';
import {
  Routes,
  Route
} from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Menu from './components/Menu/Menu';
import Filters from './components/Filters/Filters';
import Calendar from './components/Calendar/Calendar';
import LoginPage from './components/LoginPage/LoginPage';
import CreateEvent from './components/CreateEvent/CreateEvent';
import TattooArtists from './components/TattooArtists/TattooArtists';
import Analytics from './components/Analytics/Analytics';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [isPanelOpen, setIsPanelOpen] = useState(!!(!isMobile));
  const { isAuthenticated, accessToken } = useAuth();
  const [artists, setArtists] = useState([]);

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  useEffect(() => {
    document.body.style.overflow = isMobile && isPanelOpen ? 'hidden' : 'scroll';
  }, [isPanelOpen]);

  useEffect(() => {
    (async function() {
        try {
            if(isAuthenticated) {
              const tattooArtists = await artistService.getTattooArtists(accessToken);
              setArtists(Array.isArray(tattooArtists) ? tattooArtists : []);
            }
        } catch (err) {
            alert(err.message || 'Something went wrong! Please try again later');
        }
    })();
  }, [accessToken]);

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
          <Menu setIsPanelOpen={setIsPanelOpen} />
          <Filters setIsPanelOpen={setIsPanelOpen} artists={artists} />
        </div>
      </div>
      <div className={`app-container_content ${isPanelOpen ? 'panel-open' : ''}`}>
          <Routes>
            <Route path="/auth" element={<LoginPage setIsPanelOpen={setIsPanelOpen} />} />
            <Route path="/" element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Calendar artists={artists} />
              </ProtectedRoute>
            } />
            <Route path="/create-event" element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <CreateEvent artists={artists} />
              </ProtectedRoute>
            } />
            <Route path="/artists" element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <TattooArtists artists={artists} setArtists={setArtists} />
              </ProtectedRoute>
            } />
            <Route path="/analytics" element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Analytics artists={artists} />
              </ProtectedRoute>
            } />
          </Routes>
      </div>
    </div>
  );
}

export default App;
