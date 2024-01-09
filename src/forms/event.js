import { faCalendarAlt, faUserTie, faUser, faEnvelope, faPhone, faCamera, faInfoCircle, faClockRotateLeft, faSackDollar } from '@fortawesome/free-solid-svg-icons';
import { faSquareInstagram } from '@fortawesome/free-brands-svg-icons';

const eventFormFields = (data) => [
    {
        controlId: 'from',
        label: 'From',
        icon: faCalendarAlt,
        type: 'datetime-local',
        name: 'from',
        date: data.startDate,
        setDate: data.setStartDate,
        required: true,
        inputProps: {
            value: data.eventData.from,
        }
    },
    {
        controlId: 'to',
        label: 'To',
        icon: faCalendarAlt,
        type: 'datetime-local',
        name: 'to',
        date: data.endDate,
        setDate: data.setEndDate,
        required: true,
        inputProps: {
            value: data.eventData.to,
        }
    },
    {
        controlId: 'allDay',
        label: 'All Day',
        type: 'checkbox',
        name: 'allDay',
        inputProps: {
            checked: data.eventData.allDay
        }
    },
    {
        controlId: 'recurring',
        label: 'Recurring',
        type: 'checkbox',
        name: 'recurring',
        inputProps: {
            checked: data.eventData.recurring
        }
    },
    {
        controlId: 'tattooArtist',
        label: 'Tattoo Artist',
        icon: faUserTie,
        type: 'select',
        name: 'tattooArtist', // Options should be populated with tattoo artist IDs
        options: data.artists.map(artist => {
            return {
                value: artist._id,
                text: artist.name
            }
        }),
        required: true,
        inputProps: {
            value: data.eventData.tattooArtist
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
            value: data.eventData.sessionLength
        }
    },
    {
        controlId: 'deposit',
        label: 'Deposit (BGN)',
        icon: faSackDollar,
        type: 'number',
        name: 'deposit',
        inputProps: {
            value: data.eventData.deposit
        }
    },
    {
        controlId: 'revenue',
        label: 'Revenue (BGN)',
        icon: faSackDollar,
        type: 'number',
        name: 'revenue',
        required: true,
        inputProps: {
            value: data.eventData.revenue
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
            value: data.eventData.clientName
        }
    },
    {
        controlId: 'clientEmail',
        label: 'Client Email',
        icon: faEnvelope,
        type: 'email',
        name: 'clientEmail',
        inputProps: {
            value: data.eventData.clientEmail
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
            value: data.eventData.clientPhoneNumber
        }
    },
    {
        controlId: 'clientInstagram',
        label: 'Client Instagram',
        icon: faSquareInstagram,
        type: 'text',
        name: 'clientInstagram',
        inputProps: {
            value: data.eventData.clientInstagram
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
            value: data.eventData.additionalInfo
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
            onChange: data.handleInputChange
        }
    }
];

export default eventFormFields;