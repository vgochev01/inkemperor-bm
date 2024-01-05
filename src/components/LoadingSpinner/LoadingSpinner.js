import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import './LoadingSpinner.scss';

const LoadingSpinner = () => {
    return (
        <div className="spinner-container">
            <Spinner animation="border" className="large-spinner" variant="success" />
        </div>
    );
};

export default LoadingSpinner;
