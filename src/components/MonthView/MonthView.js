import React from 'react';
import './MonthView.scss';
import CalendarDay from '../CalendarDay/CalendarDay';

const MonthView = ({ currentDate }) => {
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

    return <>
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
    </>;
};

export default MonthView;
