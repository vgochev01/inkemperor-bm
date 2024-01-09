import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    // Retrieve the initial state from session storage
    const getSessionAuthState = () => {
        const storedToken = sessionStorage.getItem('accessToken');
        let storedUser = null;
        let storedExpiration = null;

        const userJson = sessionStorage.getItem('user');
        if (userJson) {
            storedUser = JSON.parse(userJson);
        }

        const expirationJson = sessionStorage.getItem('tokenExpiration');
        if (expirationJson) {
            storedExpiration = new Date(expirationJson);
        }

        return {
            accessToken: storedToken,
            isAuthenticated: !!storedToken,
            user: storedUser,
            tokenExpiration: storedExpiration
        };
    };

    const [authState, setAuthState] = useState(getSessionAuthState());

    const setAuthInfo = (user, accessToken, expiresIn) => {
        const expirationTime = expiresIn ? new Date(new Date().getTime() + expiresIn * 1000) : null;

        // Save the state in session storage
        sessionStorage.setItem('accessToken', accessToken);
        sessionStorage.setItem('user', JSON.stringify(user));
        sessionStorage.setItem('tokenExpiration', expirationTime.toISOString());

        setAuthState({
            accessToken: accessToken || null,
            isAuthenticated: !!accessToken,
            user: user || null,
            tokenExpiration: expirationTime
        });
    };

    const logout = () => {
        // Clear session storage on logout
        sessionStorage.clear();

        setAuthState({
            accessToken: null,
            isAuthenticated: false,
            user: null,
            tokenExpiration: null
        });
        navigate('/login', { state: { tokenExpired: true } });
    };

    const isTokenExpired = () => {
        return authState.tokenExpiration && new Date() > new Date(authState.tokenExpiration);
    };

    useEffect(() => {
        if (isTokenExpired()) {
            logout();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authState.tokenExpiration]);

    return (
        <AuthContext.Provider value={{ ...authState, setAuthInfo, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
