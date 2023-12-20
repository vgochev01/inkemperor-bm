import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';

import './Calendar.scss';

const Calendar = () => {
    return (
        <div id="calendar">
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                }}
                events={[
                    { title: 'event 1', date: '2023-12-20' },
                    { title: 'event 2', date: '2023-12-18' }
                ]}
            />
        </div>
    );
};

export default Calendar;
