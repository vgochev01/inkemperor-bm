import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faChartSimple, faCalendarPlus, faUserShield, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { isMobile } from 'react-device-detect';
import './Menu.scss';

const Menu = ({ calendars, setIsPanelOpen }) => {
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
        setIsPanelOpen(false);
    };

    const menuItems = [
        { path: '/create-event', name: 'Create Event', icon: faCalendarPlus },
        { path: '/artists', name: 'Tattoo Artists', icon: faUserGroup },
        { path: '/analytics', name: 'Analytics', icon: faChartSimple },
    ];

    if (isAuthenticated) {
        if(user.userRole === 'owner') {
            menuItems.push({ path: '/create-user', name: 'Create User', icon: faUserShield });
        }
        menuItems.push({ path: '/logout', name: 'Logout', icon: faUserShield, action: handleLogout });
    } else {
        menuItems.push({ path: '/login', name: 'Login', icon: faUserShield });
    }

    const generateCalendarMenuItems = () => {
        return calendars.map(calendar => ({
            path: `/calendar/${calendar.calendarType}`,
            name: `${calendar.name}`,
            icon: faCalendarAlt,
        }));
    };

    let dynamicMenuItems = generateCalendarMenuItems();

    return (
        <>
            <h2 className="logo">InkEmperor</h2>
            <div className="menu">
                {dynamicMenuItems.concat(menuItems).map((item) => (
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
                            onClick={() => setIsPanelOpen(!!(!isMobile))}
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
