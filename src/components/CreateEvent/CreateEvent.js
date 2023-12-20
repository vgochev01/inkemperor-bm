import React, { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import CustomForm from '../CustomForm/CustomForm';
import { faCalendarAlt, faUserTie, faUser, faEnvelope, faPhone, faCamera, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { faSquareInstagram } from '@fortawesome/free-brands-svg-icons';
import './CreateEvent.scss';

const CreateEvent = () => {
    const [eventData, setEventData] = useState({
        from: '',
        to: '',
        allDay: false,
        recurring: false,
        tattooArtist: '',
        sessionLength: '',
        clientName: '',
        clientEmail: '',
        clientPhone: '',
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

        console.log(eventData);
    };

    const fields = [
        {
            controlId: 'from',
            label: 'From',
            icon: faCalendarAlt,
            type: 'datetime-local',
            name: 'from',
            inputProps: {
                value: eventData.from,
                onChange: handleInputChange
            }
        },
        {
            controlId: 'to',
            label: 'To',
            icon: faCalendarAlt,
            type: 'datetime-local',
            name: 'to',
            inputProps: {
                value: eventData.to,
                onChange: handleInputChange
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
            type: 'text',
            name: 'tattooArtist',
            inputProps: {
                value: eventData.tattooArtist,
                onChange: handleInputChange
            }
        },
        {
            controlId: 'sessionLength',
            label: 'Session Length',
            type: 'select',
            name: 'sessionLength',
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
            type: 'number',
            name: 'deposit',
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
            controlId: 'clientPhone',
            label: 'Client Phone Number',
            icon: faPhone,
            type: 'text',
            name: 'clientPhone',
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
            inputProps: {
                onChange: handleInputChange
            }
        }
    ];

    return (
        <Container className="d-flex justify-content-center align-items-center" id="createFormContainer">
            <Row>
            <Col>
                <Card className="create-event-card">
                <Card.Body>
                    <CustomForm fields={fields} onSubmit={handleSubmit} title="Create Event" />
                </Card.Body>
                </Card>
            </Col>
            </Row>
        </Container>
    );
};

export default CreateEvent;
