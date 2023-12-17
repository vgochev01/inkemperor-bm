import React, { useState, useEffect } from 'react';
import MonthView from '../MonthView/MonthView';
import WeekView from '../WeekView/WeekView';
import DayView from '../DayView/DayView';
import DisplayDate from '../DisplayDate/DisplayDate';
import CalendarNavigation from '../CalendarNavigation/CalendarNavigation';
import DatePickerWrapper from '../DatePickerWrapper/DatePickerWrapper';
import './Calendar.scss';

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [viewType, setViewType] = useState('week');

    const renderView = () => {
        switch (viewType) {
            case 'week':
                return <WeekView currentDate={currentDate} />;
            case 'day':
                return <DayView currentDate={currentDate} />;
            case 'month':
            default:
                return <MonthView currentDate={currentDate} />;
        }
    };

    useEffect(() => {
        renderView();
    }, [currentDate, showDatePicker, viewType]);

    return (
        <div id="calendar">
            <div id="monthDisplay">
                <span className="current-month">
                    <DisplayDate currentDate={currentDate} viewType={viewType} />
                    <DatePickerWrapper currentDate={currentDate} setCurrentDate={setCurrentDate} />
                </span>
                <CalendarNavigation currentDate={currentDate} setCurrentDate={setCurrentDate} viewType={viewType} setViewType={setViewType} />
            </div>
            {renderView()}
        </div>
    );
};

export default Calendar;
