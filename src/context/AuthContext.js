import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    accessToken: localStorage.getItem('accessToken'),
    isAuthenticated: false,
    user: null,
  });

  const updateAuthState = (userData, accessToken) => {
    if(accessToken) {
        localStorage.setItem('accessToken', accessToken);
    } else {
        localStorage.removeItem('accessToken');
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
