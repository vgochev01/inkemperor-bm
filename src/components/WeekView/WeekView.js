import React from 'react';
import { Scheduler } from "@aldabil/react-scheduler";
import './WeekView.scss';

const WeekView = ({ currentDate }) => {
    const startOfWeek = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 1));
    const days = Array.from({ length: 7 }).map((_, index) => {
        const day = new Date(startOfWeek);
        day.setDate(day.getDate() + index);
        return day;
    });

    return (
        <Scheduler
            view="week"
            height="900"
            events={[
                {
                event_id: 1,
                title: "Event 1",
                start: new Date("2023/12/20 09:30"),
                end: new Date("2023/12/20 10:30"),
                },
                {
                event_id: 2,
                title: "Event 2",
                start: new Date("2021/5/4 10:00"),
                end: new Date("2021/5/4 11:00"),
                },
            ]}
        />
    );
};

export default WeekView;
