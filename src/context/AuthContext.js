import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const initAccessToken = localStorage.getItem('accessToken');
    const initUser = localStorage.getItem('user');
    const [authState, setAuthState] = useState({
        accessToken: initAccessToken,
        isAuthenticated: !!initAccessToken,
        user: initUser ? JSON.parse(initUser) : null,
    });

    const updateAuthState = (userData, accessToken) => {
    if(accessToken) {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('user', JSON.stringify(userData));
    } else {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
    }

    setAuthState({
        accessToken: accessToken || null,
        isAuthenticated: !!accessToken,
        user: userData || null
    });
    };

    return (
        <AuthContext.Provider value={{ ...authState, updateAuthState }}>
            {children}
        </AuthContext.Provider>
    );
};
