import React from 'react';
import './WeekView.scss';

const WeekView = ({ currentDate }) => {
    const startOfWeek = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 1));
    const days = Array.from({ length: 7 }).map((_, index) => {
        const day = new Date(startOfWeek);
        day.setDate(day.getDate() + index);
        return day;
    });

    return (
        <div className="week-view">
            {days.map((day, index) => (
                <div key={index} className="day">
                    {day.toLocaleDateString('default', { weekday: 'short', day: 'numeric', month: 'short' })}
                </div>
            ))}
        </div>
    );
};

export default WeekView;
