import React, { useState, useEffect, useRef } from 'react';
import { getAllEvents } from '../../services/eventService';
import { useAuth } from '../../context/AuthContext';
import { isMobile } from 'react-device-detect';
import EventModel from '../../models/EventModel';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import multiMonthPlugin from '@fullcalendar/multimonth';
import interactionPlugin from '@fullcalendar/interaction';
import { Modal } from 'react-bootstrap';
import './Calendar.scss';
import EventDetails from '../EventDetails/EventDetails';

const Calendar = ({ artists }) => {
    const calendarRef = useRef(null);
    const { accessToken } = useAuth();
    const [events, setEvents] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [currentView, setCurrentView] = useState('dayGridMonth');

    const fetchEvents = async () => {
        try {
            const apiEvents = await getAllEvents(accessToken);
            const formattedEvents = apiEvents.map(e => new EventModel(e));
            setEvents(formattedEvents);
        } catch (err) {
            alert(err.message);
        }
    }

    const headerToolbar = isMobile
        ? {
            left: 'prev,next today',
            center: 'title',
            right: 'multiMonthYear,timeGridDay'
          }
        : {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          };

    const handleEventClick = (clickInfo) => {
        setSelectedEvent(clickInfo.event);
        setShowModal(true);
    }

    const handleDateClick = (arg) => {
        if (currentView === 'multiMonthYear') {
            const calendarApi = calendarRef.current.getApi();
            calendarApi.changeView('timeGridDay', arg.dateStr); // Change to timeGridDay view for the clicked date
        }
    };

    const handleViewDidMount = (arg) => {
        setCurrentView(arg.view.type);
    };

    const getCalendarHeight = () => {
        if (isMobile && (currentView === 'dayGridMonth')) {
            return '550px';
        }
        return 'auto';
    };

    const getEventLimit = () => {
        if (currentView === 'dayGridMonth' || currentView === 'multiMonthYear') {
            return isMobile ? 1 : 4;
        }
        return false;
    };

    const getMoreLinkContent = (args) => {
        return <div id="moreEventsLink">+{args.num} events</div>
    }

    const renderEventContent = (eventInfo) => {
        const artistColor = eventInfo.event.extendedProps.tattooArtist.color;

        return (
            <div style={{ color: artistColor }}>
                {eventInfo.timeText && <div className='fc-event-time'>{eventInfo.timeText}</div>}
                <div className='fc-event-title'>{eventInfo.event.title}</div>
            </div>
        );
    }

    const calendarPlugins = isMobile
    ? [dayGridPlugin, timeGridPlugin, interactionPlugin, multiMonthPlugin]
    : [dayGridPlugin, timeGridPlugin, interactionPlugin];

    useEffect(() => {
        (async function() {
            await fetchEvents();
        })();
    }, [accessToken]);

    return (
        <div id="calendar">
            <FullCalendar
            ref={calendarRef}
            plugins={calendarPlugins}
            headerToolbar={headerToolbar}
            initialView={isMobile ? 'multiMonthYear' : 'dayGridMonth'}
            weekends={true}
            dateClick={handleDateClick}
            events={events}
            eventClick={handleEventClick}
            eventDisplay='block'
            dayMaxEventRows={getEventLimit()}
            moreLinkContent={getMoreLinkContent}
            moreLinkClick={isMobile ? 'day' : 'popover'}
            height={getCalendarHeight()}
            viewDidMount={handleViewDidMount}
            expandRows={true}
            // Other props and event handlers like dateClick, eventClick, etc.
            />

            <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" dialogClassName="event-details-dialog" style={{zIndex: 99999}}>
            <Modal.Header closeButton>
                <Modal.Title>Event Details</Modal.Title>
            </Modal.Header>
                <Modal.Body>
                    {selectedEvent && (
                    <>
                        <EventDetails mode="edit" event={selectedEvent} artists={artists} setShowModal={setShowModal} fetchEvents={fetchEvents} />
                    </>
                    )}
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default Calendar;
