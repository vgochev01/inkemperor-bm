import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const CalendarNavigation = ({ currentDate, setCurrentDate, viewType }) => {
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
            <button id="backButton" onClick={goToPrev}><FontAwesomeIcon icon={faArrowLeft} /></button>
            <button id="nextButton" onClick={goToNext}><FontAwesomeIcon icon={faArrowRight} /></button>
            <button id="goToday" onClick={goToToday}>Today</button>
        </div>
    </>
};

export default CalendarNavigation;
