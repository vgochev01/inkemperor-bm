import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faChartSimple, faCalendarPlus, faUserShield, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import './Menu.scss';

const Menu = ({ setIsPanelOpen }) => {
    const { isAuthenticated, updateAuthState } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        updateAuthState();
        navigate('/auth');
        setIsPanelOpen(false);
    };

    const menuItems = [
        { path: '/', name: 'Calendar', icon: faCalendarAlt },
        { path: '/create-event', name: 'Create Event', icon: faCalendarPlus },
        { path: '/artists', name: 'Tattoo Artists', icon: faUserGroup },
        { path: '/analytics', name: 'Analytics', icon: faChartSimple },
    ];

    if (isAuthenticated) {
        menuItems.push({ path: '/logout', name: 'Logout', icon: faUserShield, action: handleLogout });
    } else {
        menuItems.push({ path: '/auth', name: 'Login', icon: faUserShield });
    }

    return (
        <>
            <h2 className="logo">InkEmperor</h2>
            <div className="menu">
                {menuItems.map((item) => (
                    item.action ? (
                        <div key={item.path} className="menu-item" onClick={item.action}>
                            <FontAwesomeIcon icon={item.icon} className="menu-item-icon" />
                            {item.name}
                        </div>
                    ) : (
                        <NavLink
                            to={item.path}
                            key={item.path}
                            className={({ isActive }) => isActive ? "menu-item active" : "menu-item"}
                            onClick={() => setIsPanelOpen(false)}
                        >
                            <FontAwesomeIcon icon={item.icon} className="menu-item-icon" />
                            {item.name}
                        </NavLink>
                    )
                ))}
            </div>
        </>
    );
};

export default Menu;
