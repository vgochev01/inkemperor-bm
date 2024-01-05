import React from 'react';
import RevenueSection from '../RevenueSection/RevenueSection';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import * as analyticService from '../../services/analyticService';

import './Analytics.scss';

const Analytics = ({ artists, setIsPanelOpen }) => {
    const { accessToken } = useAuth();
    const navigate = useNavigate();

    return (
        <div className="analytics-container">
            <RevenueSection />
            {/* <SessionsSection />
            <ArtistPerformanceSection />
            <ClientsSection /> */}
        </div>
    );
};

export default Analytics;
