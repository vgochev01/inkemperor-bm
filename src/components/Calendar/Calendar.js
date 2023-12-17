import React, { useState, useEffect } from 'react';
import './Calendar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import CalendarDay from '../CalendarDay/CalendarDay';

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [updateEvents, setUpdateEvents] = useState(null);

    const renderCalendar = () => {
        const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

        let firstDayIndex = firstDayOfMonth.getDay() - 1;
        if (firstDayIndex === -1) {
            firstDayIndex = 6; // Adjust for Sunday being 0
        }

        const lastDayIndex = lastDayOfMonth.getDay() - 1;
        const prevLastDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
        const nextDays = lastDayIndex === -1 ? 0 : 6 - lastDayIndex;

        const days = [];

        for (let x = firstDayIndex; x > 0; x--) {
            days.push(<CalendarDay date={prevLastDay - x + 1} additionalClass='prev-date' currentDate={currentDate} />);
        }

        for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
            if (i === new Date().getDate() && currentDate.getMonth() === new Date().getMonth()) {
                days.push(<CalendarDay date={i} additionalClass='today' currentDate={currentDate} />);
            } else {
                days.push(<CalendarDay date={i} currentDate={currentDate} />);
            }
        }

        for (let j = 1; j <= nextDays; j++) {
            days.push(<CalendarDay date={j} additionalClass='next-date' currentDate={currentDate} />);
        }

        return days;
    };

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    useEffect(() => {
        renderCalendar();
    }, [currentDate]);

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const prevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const goToToday = () => {
        setCurrentDate(new Date()); // Resets the date to today
    };

    return (
        <div id="calendar">
            <div id="monthDisplay">
                <span className="current-month">{months[currentDate.getMonth()]} {currentDate.getFullYear()}</span>
                <div className="change-month-buttons">
                    <button id="backButton" onClick={prevMonth}><FontAwesomeIcon icon={faArrowLeft} /></button>
                    <button id="nextButton" onClick={nextMonth}><FontAwesomeIcon icon={faArrowRight} /></button>
                    <button id="goToday" onClick={goToToday}>Today</button>
                </div>
            </div>
            <div id="daysOfWeek">
                <div>Mon</div>
                <div>Tue</div>
                <div>Wed</div>
                <div>Thu</div>
                <div>Fri</div>
                <div>Sat</div>
                <div>Sun</div>
            </div>
            <div id="calendarDays" className="grid">
                {renderCalendar()}
            </div>
        </div>
    );
};

export default Calendar;
