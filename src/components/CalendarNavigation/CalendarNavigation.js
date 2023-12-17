import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import './CalendarNavigation.scss';

const CalendarNavigation = ({ currentDate, setCurrentDate, viewType, setViewType }) => {
    const goToToday = () => {
        setCurrentDate(new Date());
    };

    const goToPrev = () => {
        switch (viewType) {
            case 'week':
                setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() - 7)));
                break;
            case 'day':
                setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() - 1)));
                break;
            case 'month':
            default:
                setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
                break;
        }
    };

    const goToNext = () => {
        switch (viewType) {
            case 'week':
                setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() + 7)));
                break;
            case 'day':
                setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() + 1)));
                break;
            case 'month':
            default:
                setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
                break;
        }
    };

    return <>
        <div className="change-month-buttons">
            <div className="change-view-type">
                <button className={`view-button ${viewType === 'day' ? 'selected' : ''}`} onClick={() => setViewType('day')}>Day</button>
                <button className={`view-button ${viewType === 'week' ? 'selected' : ''}`} onClick={() => setViewType('week')}>Week</button>
                <button className={`view-button ${viewType === 'month' ? 'selected' : ''}`} onClick={() => setViewType('month')}>Month</button>
            </div>
            <button id="backButton" onClick={goToPrev}><FontAwesomeIcon icon={faArrowLeft} /></button>
            <button id="nextButton" onClick={goToNext}><FontAwesomeIcon icon={faArrowRight} /></button>
            <button className='view-button' id="goToday" onClick={goToToday}>Today</button>
        </div>
    </>
};

export default CalendarNavigation;
