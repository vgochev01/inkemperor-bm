import React, { createContext, useState, useContext } from 'react';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';

const UIContext = createContext();

export const useUI = () => {
    return useContext(UIContext);
};

export const UIProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);

    const showSpinner = () => setIsLoading(true);
    const hideSpinner = () => setIsLoading(false);

    return (
        <UIContext.Provider value={{ isLoading, showSpinner, hideSpinner }}>
            {isLoading && <LoadingSpinner />}
            {children}
        </UIContext.Provider>
    );
};
