import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import 'react-datepicker/dist/react-datepicker.css';

const DatePickerWrapper = ({ currentDate, setCurrentDate }) => {
    const [showDatePicker, setShowDatePicker] = useState(false);

    const toggleDatePicker = () => setShowDatePicker(!showDatePicker);
    const handleDateChange = date => {
        setCurrentDate(date);
        setShowDatePicker(false);
    };

    return <>
        <div className='datepicker-icon'>
            <a href="javasript:void(0)" className="icon-cta open-datepicker" onClick={toggleDatePicker}>
                <FontAwesomeIcon icon={faCalendarDays} />
            </a>
            <div className="datepicker-container">
                {showDatePicker && (
                    <DatePicker
                        selected={currentDate}
                        onChange={handleDateChange}
                        onCalendarClose={toggleDatePicker}
                        inline
                    />
                )}
            </div>
        </div>
    </>
};

export default DatePickerWrapper;
