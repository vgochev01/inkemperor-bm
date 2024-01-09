import React, { useState, useEffect } from 'react';
import CustomForm from '../CustomForm/CustomForm';
import { Button } from 'react-bootstrap';
import * as eventService from '../../services/eventService';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import eventFormFields from '../../forms/event';
import { useUI } from '../../context/UIContext';
import FsLightbox from "fslightbox-react";

import './EventDetails.scss';

const EventDetails = ({ event, artists, setShowModal, fetchEvents }) => {
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { accessToken } = useAuth();
    const [startDate, setStartDate] = useState(new Date(event.start || Date.now()));
    const [endDate, setEndDate] = useState(new Date(event.end || Date.now()));
    const { showSpinner, hideSpinner } = useUI();

    const [showEventPhoto, setShowEventPhoto] = useState(false);

    const [eventData, setEventData] = useState({
        from: '',
        to: '',
        allDay: event.allDay,
        recurring: event.extendedProps.recurring,
        tattooArtist: event.extendedProps.tattooArtist._id,
        sessionLength: event.extendedProps.sessionLength,
        clientName: event.extendedProps.clientInfo.name,
        clientEmail: event.extendedProps.clientInfo.email,
        clientPhoneNumber: event.extendedProps.clientInfo.phoneNumber,
        clientInstagram: event.extendedProps.clientInfo.instagram,
        deposit: event.extendedProps.deposit,
        additionalInfo: event.extendedProps.additionalInfo,
        photo: null
    });

    console.log(event.extendedProps);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        showSpinner();

        // Create a FormData object and append each field to it
        const formData = new FormData();
        for (const key in eventData) {
            if (eventData.hasOwnProperty(key)) {
                formData.append(key, eventData[key]);
            }
        }

        try {

            const data = await eventService.updateEvent(event.extendedProps._id, formData, accessToken);
            navigate(`/?eventId=${data._id}`);
            setShowModal(false);
            await fetchEvents();
        } catch (err) {
            setError(err?.message || 'Something went wrong! Please try again later!');
        } finally {
            hideSpinner();
        }
    };

    const deleteEvent = async () => {
        const { _id: id } = event && event.extendedProps;
        if(id) {
            try {
                showSpinner();
                const res = await eventService.removeEvent(id, accessToken);
                if(res.success) {
                    navigate('/');
                    setShowModal(false);
                    await fetchEvents();
                }
            } catch (err) {
                setError(err?.message || 'Something went wrong! Please try again later!');
            } finally {
                hideSpinner();
            }
        }
    }

    const fields = eventFormFields({
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        eventData,
        handleInputChange,
        artists
    })

    useEffect(() => {
        setEventData(prevState => ({
            ...prevState,
            from: startDate.toISOString(),
            to: endDate.toISOString()
        }));
    }, [startDate, endDate]);

    return (<>
        {event?.extendedProps?.photo && (
            <div className="event-photo-preview mb-3">
            <img
                src="https://www.sixbulletstattoo.com/wp-content/uploads/freshizer/126db884dca13ad4da958c41bf3dbb95_IMG-9499-768-c-90.jpg"
                alt="Event"
                onClick={() => setShowEventPhoto(!showEventPhoto)}
            />
            </div>
        )}

        <FsLightbox
				toggler={showEventPhoto}
				sources={[
					'https://www.sixbulletstattoo.com/wp-content/uploads/freshizer/126db884dca13ad4da958c41bf3dbb95_IMG-9499-768-c-90.jpg'
				]}
        />
        <CustomForm enctype="multipart/form-data" fields={fields} onSubmit={handleSubmit} error={error} />
        <Button variant="outline-secondary" className={`w-100 mt-3 delete-event-btn}`} onClick={deleteEvent}>
            Delete Event
        </Button>
    </>);
};

export default EventDetails;
