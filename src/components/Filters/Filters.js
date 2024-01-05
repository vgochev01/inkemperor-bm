import React, { useState, useEffect} from 'react';
import { useAuth } from '../../context/AuthContext';
import * as artistService from '../../services/artistService';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faChartSimple, faCalendarPlus, faUserShield, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import './Filters.scss';

const Filters = ({ artists, setIsPanelOpen }) => {
    const { isAuthenticated, accessToken } = useAuth();
    const navigate = useNavigate();

    return <>

    </>
};

export default Filters;
