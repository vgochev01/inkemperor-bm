import React, { useState, useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faArrowLeft, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Routes, Route, useNavigate } from 'react-router-dom'; // Added useNavigate
import { isMobile } from 'react-device-detect';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Menu from './components/Menu/Menu';
import Filters from './components/Filters/Filters';
import Calendar from './components/Calendar/Calendar';
import LoginPage from './components/LoginPage/LoginPage';
import CreateUser from './components/CreateUser/CreateUser';
import CreateEvent from './components/CreateEvent/CreateEvent';
import TattooArtists from './components/TattooArtists/TattooArtists';
import Analytics from './components/Analytics/Analytics';
import * as artistService from './services/artistService';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [isPanelOpen, setIsPanelOpen] = useState(!isMobile);
  const { accessToken, isAuthenticated, user } = useAuth();
  const navigate = useNavigate(); // Use navigate from react-router-dom
  const [artists, setArtists] = useState([]);
  const [calendars, setCalendars] = useState([]);

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  const calendarRoutes = calendars.map(calendar => (
    <Route
      key={calendar._id}
      path={`/calendar/${calendar.calendarType}`}
      element={
        <ProtectedRoute isAuthenticated={isAuthenticated}>
          <Calendar artists={artists} calendar={calendar} />
        </ProtectedRoute>
      }
    />
  ));

  // Removed initialLoading state as it is no longer needed
  const hasSessionsCalendar = calendars.some(cal => cal.calendarType === 'sessions');

  useEffect(() => {
    document.body.style.overflow = isMobile && isPanelOpen ? 'hidden' : 'scroll';
  }, [isPanelOpen]);

  useEffect(() => {
    if (!accessToken || !isAuthenticated) {
      navigate('/login');
    } else if (isAuthenticated) {
      // Fetch artists and calendars only if authenticated
      artistService.getTattooArtists(accessToken)
        .then(data => {
          setArtists(Array.isArray(data) ? data : []);
          setCalendars(Array.isArray(user.calendars) ? user.calendars : []);
        })
        .catch(err => console.log(err.message));
    }
  }, [accessToken, isAuthenticated, navigate, user, hasSessionsCalendar]);

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
          <Menu setIsPanelOpen={setIsPanelOpen} calendars={calendars} />
          <Filters setIsPanelOpen={setIsPanelOpen} artists={artists} />
        </div>
      </div>
      <div className={`app-container_content ${isPanelOpen ? 'panel-open' : ''}`}>
          <Routes>
            <Route path="/" element={<></>} />
            <Route path="/dashboard" element={<></>} />
            <Route path="/login" element={<LoginPage setIsPanelOpen={setIsPanelOpen} />} />
            <Route path="/create-user" element={<CreateUser />} />
            <Route path="/create-event" element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <CreateEvent artists={artists} calendars={calendars} />
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
            {calendarRoutes}
          </Routes>
      </div>
    </div>
  );
}

export default App;
