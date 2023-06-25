import React from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import classes from './Calendar.module.scss';
import 'react-big-calendar/lib/css/react-big-calendar.css';



const localizer = momentLocalizer(moment)

export const Calendar = (props) => {
    const { events } = props;

    return (
        <BigCalendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{
                height: 700
            }}
        />
    )
}
