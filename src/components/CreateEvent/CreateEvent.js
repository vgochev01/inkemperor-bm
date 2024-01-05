import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import CustomForm from '../CustomForm/CustomForm';
import { faCalendarAlt, faUserTie, faUser, faEnvelope, faPhone, faCamera, faInfoCircle, faClockRotateLeft, faSackDollar } from '@fortawesome/free-solid-svg-icons';
import { faSquareInstagram } from '@fortawesome/free-brands-svg-icons';
import * as eventService from '../../services/eventService';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './CreateEvent.scss';

const CreateEvent = ({ artists }) => {
    const [error, setError] = useState('');
    const errorRef = useRef(null);
    const navigate = useNavigate();
    const { accessToken } = useAuth();
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const [eventData, setEventData] = useState({
        from: '',
        to: '',
        allDay: false,
        recurring: false,
        tattooArtist: '',
        sessionLength: '',
        clientName: '',
        clientEmail: '',
        clientPhoneNumber: '',
        clientInstagram: '',
        deposit: '',
        additionalInfo: '',
        photo: null
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        // Set the state based on input type
        setEventData(prevState => {
            return {
                ...prevState,
                [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value
            };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

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

    const fields = [
        {
            controlId: 'from',
            label: 'From',
            icon: faCalendarAlt,
            type: 'datetime-local',
            name: 'from',
            date: startDate,
            setDate: setStartDate,
            required: true,
            inputProps: {
                value: eventData.from,
            }
        },
        {
            controlId: 'to',
            label: 'To',
            icon: faCalendarAlt,
            type: 'datetime-local',
            name: 'to',
            date: endDate,
            setDate: setEndDate,
            required: true,
            inputProps: {
                value: eventData.to,
            }
        },
        {
            controlId: 'allDay',
            label: 'All Day',
            type: 'checkbox',
            name: 'allDay',
            inputProps: {
                checked: eventData.allDay,
                onChange: handleInputChange
            }
        },
        {
            controlId: 'recurring',
            label: 'Recurring',
            type: 'checkbox',
            name: 'recurring',
            inputProps: {
                checked: eventData.recurring,
                onChange: handleInputChange
            }
        },
        {
            controlId: 'tattooArtist',
            label: 'Tattoo Artist',
            icon: faUserTie,
            type: 'select',
            name: 'tattooArtist', // Options should be populated with tattoo artist IDs
            options: artists.map(artist => {
                return {
                    value: artist._id,
                    text: artist.name
                }
            }),
            required: true,
            inputProps: {
                value: eventData.tattooArtist,
                onChange: handleInputChange
            }
        },
        {
            controlId: 'sessionLength',
            label: 'Session Length',
            icon: faClockRotateLeft,
            type: 'select',
            name: 'sessionLength',
            required: true,
            options: [
                { value: '1.5', text: 'Short Session - 1.5 hours' },
                { value: '3', text: 'Avg Session - 3 hours' },
                { value: '5', text: 'Long Session - 5 hours' }
            ],
            inputProps: {
                value: eventData.sessionLength,
                onChange: handleInputChange
            }
        },
        {
            controlId: 'deposit',
            label: 'Deposit (BGN)',
            icon: faSackDollar,
            type: 'number',
            name: 'deposit',
            required: true,
            inputProps: {
                value: eventData.deposit,
                onChange: handleInputChange
            }
        },
        {
            controlId: 'clientName',
            label: 'Client Name',
            icon: faUser,
            type: 'text',
            name: 'clientName',
            required: true,
            inputProps: {
                value: eventData.clientName,
                onChange: handleInputChange
            }
        },
        {
            controlId: 'clientEmail',
            label: 'Client Email',
            icon: faEnvelope,
            type: 'email',
            name: 'clientEmail',
            inputProps: {
                value: eventData.clientEmail,
                onChange: handleInputChange
            }
        },
        {
            controlId: 'clientPhoneNumber',
            label: 'Client Phone Number',
            icon: faPhone,
            type: 'text',
            name: 'clientPhoneNumber',
            required: true,
            inputProps: {
                value: eventData.clientPhone,
                onChange: handleInputChange
            }
        },
        {
            controlId: 'clientInstagram',
            label: 'Client Instagram',
            icon: faSquareInstagram,
            type: 'text',
            name: 'clientInstagram',
            inputProps: {
                value: eventData.clientInstagram,
                onChange: handleInputChange
            }
        },
        {
            controlId: 'additionalInfo',
            label: 'Additional Info',
            icon: faInfoCircle,
            type: 'textarea',
            name: 'additionalInfo',
            fullWidth: true,
            inputProps: {
                value: eventData.additionalInfo,
                onChange: handleInputChange
            }
        },
        {
            controlId: 'photo',
            label: 'Photo',
            icon: faCamera,
            type: 'file',
            name: 'photo',
            fullWidth: true,
            inputProps: {
                onChange: handleInputChange
            }
        }
    ];



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
    }, []);

    return (
        <Container className="d-flex justify-content-center align-items-center" id="createFormContainer">
            <Row className="m-0">
            <Col className="p-0">
                <Card className="create-event-card">
                <Card.Body className='mb-4'>
                    <div ref={errorRef}></div>
                    <CustomForm enctype="multipart/form-data" fields={fields} onSubmit={handleSubmit} title="Create Event" error={error} />
                </Card.Body>
                </Card>
            </Col>
            </Row>
        </Container>
    );
};

export default CreateEvent;
