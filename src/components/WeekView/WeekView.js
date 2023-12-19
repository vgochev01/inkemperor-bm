import React, { useState } from 'react';
import Event from '../Event/Event';
import './WeekView.scss';

const WeekView = ({ currentDate }) => {
    // Calculate the start of the week (Monday)
    const startOfWeek = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 1));
    const days = Array.from({ length: 7 }).map((_, index) => {
        const day = new Date(startOfWeek);
        day.setDate(day.getDate() + index);
        return day;
    });

    const [events, setEvents] = useState([
        {
          id: 1,
          startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 12), // Event this month, on the 12th
          startTime: "10:00",
          endTime: "12:00",
          title: "Dragon Tattoo Session",
          artist: "Jane Doe",
          color: "#FFD700" // Gold color
        },
        {
          id: 2,
          startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 18), // Event this month, on the 18th
          startTime: "13:00",
          endTime: "15:00",
          title: "Phoenix Tattoo Session",
          artist: "John Smith",
          color: "#FF4500" // OrangeRed color
        },
        {
          id: 3,
          startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 18), // Another event on the 18th
          startTime: "16:00",
          endTime: "18:00",
          title: "Koi Fish Tattoo Session",
          artist: "Alice Johnson",
          color: "#1E90FF" // DodgerBlue color
        },
        {
            id: 4,
            startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 20), // Start date
            endDate: new Date(new Date().getFullYear(), new Date().getMonth(), 20), // End date (next day)
            startTime: "10:00",
            endTime: "17:00", // End time on the next day
            title: "Full Sleeve Tattoo Session",
            artist: "Dave Grohl",
            color: "#32CD32" // LimeGreen color
        },
    ]);

    const getEventsForDay = (day) => {
        return events.filter(event => {
            const eventDate = new Date(event.startDate);
            return eventDate.toDateString() === day.toDateString();
        });
    };

    return (
        <div className="week-view">
            <div className="time-column">
                {Array.from({ length: 17 }, (_, index) => (
                    <div key={index} className="time-slot">{7 + index}:00</div>
                ))}
            </div>
            {days.map((day, index) => (
                <div key={index} className="week-day">
                    <div className='week-day-header'>
                        {day.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' })}
                    </div>
                    <div className='week-day-events'>
                        {getEventsForDay(day).map(event => (
                            <Event key={event.id} event={event} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default WeekView;