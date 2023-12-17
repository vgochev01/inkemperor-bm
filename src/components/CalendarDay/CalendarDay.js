import React, { useEffect, useState } from 'react';
import './CalendarDay.scss';
import Event from '../Event/Event';

const CalendarDay = ({ date, additionalClass, currentDate }) => {
    const [events, setEvents] = useState([]);

    const fetchEvents = () => {
        const mockEvents = [
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
                endDate: new Date(new Date().getFullYear(), new Date().getMonth(), 21), // End date (next day)
                startTime: "10:00",
                endTime: "10:00", // End time on the next day
                title: "Full Sleeve Tattoo Session",
                artist: "Dave Grohl",
                color: "#32CD32" // LimeGreen color
            },
          ];

          const currentEvents = [];
          mockEvents.forEach(e => {
            const currentMonth = currentDate.getMonth();
            const currentYear = currentDate.getFullYear();

            if(e.startDate.getFullYear() === currentYear && e.startDate.getMonth() === currentMonth && e.startDate.getDate() === date) {
                currentEvents.push(e);
            } else if (e.endDate && e.endDate.getFullYear() === currentYear && e.endDate.getMonth() === currentMonth && e.endDate.getDate() === date) {
                currentEvents.push(e);
            }

          });
          setEvents(currentEvents);
    }

    useEffect(fetchEvents, []);
    useEffect(fetchEvents, [currentDate, date]);

  return (
    <div className={`calendar-day ${additionalClass || ''}`}>
      <div className='calendar-day_header'>{date}</div>
      {events.map(event => <Event key={event.id} event={event} />)}
    </div>
  );
};

export default CalendarDay;