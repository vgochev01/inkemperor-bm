import React from 'react';
import './Event.scss';

const Event = ({ event }) => {
  const eventStyle = { backgroundColor: event.color };

  return (
    <div className="event" style={eventStyle}>
      <div className="event-title">
        {event.startTime} {event.title} ({event.artist})
      </div>
    </div>
  );
};

export default Event;