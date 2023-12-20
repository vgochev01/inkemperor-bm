import React, { useState, useEffect } from 'react';
import MonthView from '../MonthView/MonthView';
import WeekView from '../WeekView/WeekView';
import DayView from '../DayView/DayView';
import DisplayDate from '../DisplayDate/DisplayDate';
import CalendarNavigation from '../CalendarNavigation/CalendarNavigation';
import DatePickerWrapper from '../DatePickerWrapper/DatePickerWrapper';
import { Scheduler } from "@aldabil/react-scheduler";
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
            <Scheduler
                view="week"
                height="900"
                events={[
                    {
                    event_id: 1,
                    title: "Event 1",
                    start: new Date("2023/12/20 09:30"),
                    end: new Date("2023/12/20 10:30"),
                    },
                    {
                    event_id: 2,
                    title: "Event 2",
                    start: new Date("2023/12/20 09:30"),
                    end: new Date("2023/12/21 11:30"),
                    },
                ]}
            />
        </div>
    );
};

export default Calendar;
