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
            checked: data.eventData.allDay,
            onChange: data.handleInputChange
        }
    },
    {
        controlId: 'recurring',
        label: 'Recurring',
        type: 'checkbox',
        name: 'recurring',
        inputProps: {
            checked: data.eventData.recurring,
            onChange: data.handleInputChange
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
            value: data.eventData.tattooArtist,
            onChange: data.handleInputChange
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
            value: data.eventData.sessionLength,
            onChange: data.handleInputChange
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
            value: data.eventData.deposit,
            onChange: data.handleInputChange
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
            value: data.eventData.clientName,
            onChange: data.handleInputChange
        }
    },
    {
        controlId: 'clientEmail',
        label: 'Client Email',
        icon: faEnvelope,
        type: 'email',
        name: 'clientEmail',
        inputProps: {
            value: data.eventData.clientEmail,
            onChange: data.handleInputChange
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
            value: data.eventData.clientPhoneNumber,
            onChange: data.handleInputChange
        }
    },
    {
        controlId: 'clientInstagram',
        label: 'Client Instagram',
        icon: faSquareInstagram,
        type: 'text',
        name: 'clientInstagram',
        inputProps: {
            value: data.eventData.clientInstagram,
            onChange: data.handleInputChange
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
            value: data.eventData.additionalInfo,
            onChange: data.handleInputChange
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