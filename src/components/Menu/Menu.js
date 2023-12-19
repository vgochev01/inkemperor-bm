import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faChartSimple, faCalendarPlus, faUserShield } from '@fortawesome/free-solid-svg-icons';
import './Menu.scss';

const Menu = () => {
    const menuItems = [
        { path: '/', name: 'Calendar', icon: faCalendarAlt },
        { path: '/auth', name: 'Login', icon: faUserShield },
        { path: '/create-event', name: 'Create Event', icon: faCalendarPlus },
        { path: '/analytics', name: 'Analytics', icon: faChartSimple },
    ];

    return <>
        <h2 className="logo">InkEmperor</h2>
        <div className="menu">
        {menuItems.map((item) => (
            <NavLink to={item.path} key={item.path} className="menu-item" activeClassName="active">
                <FontAwesomeIcon icon={item.icon} className="menu-item-icon" />
                {item.name}
            </NavLink>
        ))}
        </div>
    </>;
};

export default Menu;
