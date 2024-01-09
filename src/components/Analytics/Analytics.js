import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import GenericAnalyticsSection from '../GenericAnalyticsSection/GenericAnalyticsSection';
import { fetchRevenueAndSessionsData } from '../../services/analyticService';
import './Analytics.scss';

const Analytics = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [selectedCalendar, setSelectedCalendar] = useState(null);

    useEffect(() => {
        if(!user) {
            navigate('/login');
            return;
        }

        if(!Array.isArray(user.calendars) || user.calendars.length === 0) {
            navigate('/create-calendar');
            return;
        }

        setSelectedCalendar(user.calendars[0]);
    }, []);

    return (
        <div className="analytics-container p-4">
            <GenericAnalyticsSection
                title="Revenue"
                fetchFunction={(period, customPeriod, token) => fetchRevenueAndSessionsData(selectedCalendar?._id, 'revenue', period, customPeriod, token)}
                chartLabel="Total Revenue"
                dataType="revenue"
                yTitle="Revenue (BGN)"
                selectedCalendar={selectedCalendar}
            />
            <GenericAnalyticsSection
                title="Sessions"
                fetchFunction={(period, customPeriod, token) => fetchRevenueAndSessionsData(selectedCalendar?._id, 'sessions', period, customPeriod, token)}
                chartLabel="Total Sessions"
                dataType="session"
                yTitle="Sessions"
                selectedCalendar={selectedCalendar}
            />
        </div>
    );
};

export default Analytics;

