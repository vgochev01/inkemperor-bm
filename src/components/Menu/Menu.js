import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faChartSimple, faCalendarPlus } from '@fortawesome/free-solid-svg-icons';
import './Menu.scss';

const Menu = () => {
    const menuItems = [
        { name: 'Calendar', icon: faCalendarAlt },
        { name: 'Create Event', icon: faCalendarPlus },
        { name: 'Analytics', icon: faChartSimple },
    ];

    return <>
        <h2 className="logo">InkEmperor</h2>
        <div className="menu">
        {menuItems.map((item) => (
            <a href="javascript:void(0)" key={item.name} className="menu-item">
                <FontAwesomeIcon icon={item.icon} className="menu-item-icon" />
            {item.name}
            </a>
        ))}
        </div>
    </>;
};

export default Menu;
