import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import CustomForm from '../CustomForm/CustomForm';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import * as eventService from '../../services/eventService';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import eventFormFields from '../../forms/event';
import './CreateEvent.scss';

const CreateEvent = ({ calendars, artists }) => {
    const [error, setError] = useState('');
    const errorRef = useRef(null);
    const navigate = useNavigate();
    const { isAuthenticated, accessToken, user } = useAuth();
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [selectedCalendarId, setSelectedCalendarId] = useState('');

    const [eventData, setEventData] = useState({
        from: '',
        to: '',
        allDay: false,
        recurring: false,
        tattooArtist: artists.length > 0 ? artists[0]._id : '',
        sessionLength: '1.5',
        clientName: '',
        clientEmail: '',
        clientPhoneNumber: '',
        clientInstagram: '',
        deposit: '',
        revenue: '',
        paymentMethod: 'cash',
        additionalInfo: '',
        photo: null
    });

    const handleSubmit = (e) => {
        if(!Array.isArray(calendars) || calendars.length === 0) {
            setError('We could not find any calendars in your profile!');
            return;
        }

        if (user.userRole === 'owner') {
            eventData['calendarId'] = selectedCalendarId;
        } else {
            // For artists or subscribers, find and set the 'sessions' calendar ID
            const sessionsCalendar = calendars.find(cal => cal.calendarType === 'sessions');
            if (sessionsCalendar) {
                eventData['calendarId'] = sessionsCalendar._id;
            }
        }

        // Create a FormData object and append each field to it
        const formData = new FormData();
        for (const key in eventData) {
            if (eventData.hasOwnProperty(key)) {
                formData.append(key, eventData[key]);
            }
        }

        eventService.createEvent(formData, accessToken)
            .then(data => {
                navigate(`/?eventId=${data._id}`);
            })
            .catch(err => {
                setError(err?.message || 'Something went wrong! Please try again later!');
            });
    };

    const handleInputChange = (e, fieldData, setFieldData, setValidationState) => {
        const { name, value } = e.target;
        if (name === 'calendarId') {
            setSelectedCalendarId(value);
        }

        setValidationState(prevState => ({ ...prevState, [name]: true }));
    };

    const calendarSelectField = {
        controlId: 'calendarId',
        label: 'Calendar',
        icon: faCalendarAlt,
        type: 'select',
        name: 'calendarId',
        options: calendars.map(cal => {
            return { value: cal._id, text: cal.name };
        }),
        required: true,
        fullWidth: true,
        inputProps: {
            value: selectedCalendarId
        }
    };

    const eventFields = eventFormFields({
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        eventData,
        handleInputChange,
        artists
    });

    const fields = [
        ...(user.userRole === 'owner' ? [calendarSelectField] : []),
        ...eventFields
    ];

    useEffect(() => {
        if (user.userRole === 'owner' && calendars.length) {
            setSelectedCalendarId(calendars[0]._id); // Set the first calendar as default
        }
        // For artists or subscribers, find and set the 'sessions' calendar ID
        if (['artist', 'subscriber'].includes(user.userRole)) {
            const sessionsCalendar = calendars.find(cal => cal.calendarType === 'sessions');
            if (sessionsCalendar) {
                setSelectedCalendarId(sessionsCalendar._id);
            }
        }
    }, [calendars, user.userRole]);

    useEffect(() => {
        setEventData(prevState => ({
            ...prevState,
            from: startDate.toISOString(),
            to: endDate.toISOString()
        }));
    }, [startDate, endDate]);

    useEffect(() => {
        document.body.scrollTop = 0;
      }, [error]);

    useEffect(() => {
        setEventData(prevState => ({
            ...prevState,
            tattooArtist: artists.length > 0 && artists[0]._id
        }));
    }, [artists]);

    useEffect(() => {
        setEventData(prevState => ({
            ...prevState,
            calendarId: selectedCalendarId
        }))
    }, [selectedCalendarId]);

    return (
        <Container className="d-flex justify-content-center align-items-center" id="createFormContainer">
            <Row className="m-0">
            <Col className="p-0">
                <Card className="create-event-card">
                <Card.Body className='mb-4'>
                    <div ref={errorRef}></div>
                    <CustomForm enctype="multipart/form-data" fields={fields} data={eventData} setData={setEventData} customSubmit={handleSubmit} customInputChange={handleInputChange} title="Create Event" error={error} />
                </Card.Body>
                </Card>
            </Col>
            </Row>
        </Container>
    );
};

export default CreateEvent;
