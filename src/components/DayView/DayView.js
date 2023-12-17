import React from 'react';
import './DayView.scss';

const DayView = ({ currentDate }) => {
    const hours = Array.from({ length: 10 }).map((_, index) => 9 + index); // Hours from 9 to 18

    return (
        <div className="day-view">
            {hours.map((hour, index) => (
                <div key={index} className="hour">
                    {hour}:00
                </div>
            ))}
        </div>
    );
};

export default DayView;
