import React from 'react';
import './BasicEvent.scss';

const BasicEvent = ({ event }) => {
  const eventStyle = { backgroundColor: event.color };

  return (
    <div className="basic-event" style={eventStyle}>
      <div className="basic-event-title">
        {event.startTime} {event.title} ({event.artist})
      </div>
    </div>
  );
};

export default BasicEvent;