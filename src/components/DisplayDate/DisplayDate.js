import React from 'react';

const DisplayDate = ({ currentDate, viewType }) => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const formatDate = (date) => {
        return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
    };

    const formatWeekRange = (startDate, endDate) => {
        return `${startDate.getDate()}-${endDate.getDate()}, ${months[endDate.getMonth()]} ${endDate.getFullYear()}`;
    };

    const displayDate = () => {
        switch (viewType) {
            case 'week':
                const startOfWeek = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 1));
                const endOfWeek = new Date(startOfWeek);
                endOfWeek.setDate(startOfWeek.getDate() + 6);
                return formatWeekRange(startOfWeek, endOfWeek);
            case 'day':
                return formatDate(currentDate);
            case 'month':
            default:
                return `${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
        }
    };

    return displayDate();
};

export default DisplayDate;
