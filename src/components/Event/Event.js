import React from 'react';
import './Event.scss';

const Event = ({ event }) => {
  const hourHeight = 60; // The height of one hour time slot in your grid
  const startHour = parseInt(event.startTime.split(':')[0], 10);
  const startMinutes = parseInt(event.startTime.split(':')[1], 10);
  const endHour = parseInt(event.endTime.split(':')[0], 10);
  const endMinutes = parseInt(event.endTime.split(':')[1], 10);
  
  // Calculate the grid row start position and the row span based on event's duration
  const gridRowStart = ((startHour - 7) * 60 + startMinutes) / hourHeight + 1; // +1 for CSS grid's 1-based index
  const gridRowEnd = ((endHour - 7) * 60 + endMinutes) / hourHeight + 1; // +1 for CSS grid's 1-based index

  const eventStyle = {
    backgroundColor: event.color,
    gridRowStart: gridRowStart,
    gridRowEnd: gridRowEnd,
  };

  return (
    <div className="event" style={eventStyle}>
      <div className="event-title">
        {event.startTime} - {event.endTime} {event.title} ({event.artist})
      </div>
    </div>
  );
};

export default Event;
