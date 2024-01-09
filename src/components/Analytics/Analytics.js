import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import GenericAnalyticsSection from '../GenericAnalyticsSection/GenericAnalyticsSection';
import { fetchData } from '../../services/analyticService';
import './Analytics.scss';

const Analytics = () => {
    const { accessToken } = useAuth();
    const navigate = useNavigate();
    return (
        <div className="analytics-container p-4">
            <GenericAnalyticsSection
                title="Revenue"
                fetchFunction={(period, customPeriod, token) => fetchData('revenue', period, customPeriod, token)}
                chartLabel="Total Revenue"
                dataType="revenue"
                yTitle="Revenue (BGN)"
            />
            <GenericAnalyticsSection
                title="Sessions"
                fetchFunction={(period, customPeriod, token) => fetchData('sessions', period, customPeriod, token)}
                chartLabel="Total Sessions"
                dataType="session"
                yTitle="Sessions"
            />
        </div>
    );
};

export default Analytics;

