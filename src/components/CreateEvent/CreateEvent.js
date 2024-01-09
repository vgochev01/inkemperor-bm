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
    const [validationState, setValidationState] = useState({});
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
        sessionLength: '',
        clientName: '',
        clientEmail: '',
        clientPhoneNumber: '',
        clientInstagram: '',
        deposit: '',
        revenue: '',
        additionalInfo: '',
        photo: null
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!Array.isArray(calendars) || calendars.length === 0) {
            setError('We could not find any calendars in your profile!');
            return;
        }

        if(!user || !isAuthenticated) {
            navigate('/login');
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

        const isFormValid = fields.every(field => validateField(field.name, eventData[field.name]));
        if (!isFormValid) {
            // Update validation state for all fields
            const newValidationState = {};
            fields.forEach(field => {
              newValidationState[field.name] = validateField(field.name, eventData[field.name]);
            });
            setValidationState(newValidationState);
            return;
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

    const handleInputChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        if (name === 'calendarId') {
            setSelectedCalendarId(value);
        } else {
            // Set the state based on input type
            setEventData(prevState => {
                return {
                    ...prevState,
                    [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value
                };
            });
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
        inputProps: {
            value: selectedCalendarId,
            onChange: handleInputChange
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
        ...(user.userRole === 'owner' ? [{ ...calendarSelectField, isValid: validationState['calendarId'] !== false }] : []),
        ...eventFields.map(field => ({ ...field, isValid: validationState[field.name] !== false }))
    ];

    const validateField = (name, value) => {
        console.log(name, value);
        if (fields.find(f => f.name === name).required) {
          return value.trim() !== '';
        }
        return true;
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        const isValid = validateField(name, value);
        setValidationState(prevState => ({ ...prevState, [name]: isValid }));
    };

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

    return (
        <Container className="d-flex justify-content-center align-items-center" id="createFormContainer">
            <Row className="m-0">
            <Col className="p-0">
                <Card className="create-event-card">
                <Card.Body className='mb-4'>
                    <div ref={errorRef}></div>
                    <CustomForm enctype="multipart/form-data" fields={fields} onSubmit={handleSubmit} title="Create Event" error={error} onBlur={handleBlur} />
                </Card.Body>
                </Card>
            </Col>
            </Row>
        </Container>
    );
};

export default CreateEvent;
