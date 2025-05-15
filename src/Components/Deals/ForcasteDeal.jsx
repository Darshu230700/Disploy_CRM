import FullCalendar from '@fullcalendar/react';
import React, { useEffect, useRef, useState } from 'react';
import dayGridPlugin from "@fullcalendar/daygrid";
import multiMonthPlugin from '@fullcalendar/multimonth';
import interactionPlugin from '@fullcalendar/interaction'; // Ensure to import interactionPlugin

export default function ForcasteDeal({ filteredDeal }) {
    const [events, setEvents] = useState([]);
    const calendarRef = useRef(null);

    useEffect(() => {
        const calendarEvents = filteredDeal.map(deal => ({
            title: `${deal.title} - ${deal.organizationName ?? ''} ${deal.personName ? `, ${deal.personName}` : ''}`,
            start: deal.expectedCloseDate,
            extendedProps: {
                dealID: deal.dealID,
                value: deal.value,
            }
        }));
        setEvents(calendarEvents);
    }, [filteredDeal]);

    const handleEventDrop = (info) => {
        const dealID = info.event.extendedProps.dealID;
        const updatedEvent = {
            ...info.event.extendedProps,
            expectedCloseDate: info.event.start
        };
        console.log('Updated Event:', updatedEvent);
        setEvents(events.map(event =>
            event.extendedProps.dealID === dealID
                ? { ...event, start: info.event.start }
                : event
        ));
    };

    return (
        <div className="my-custom-calendar">
            <FullCalendar
                plugins={[dayGridPlugin, multiMonthPlugin, interactionPlugin]}
                initialView="dayGridWeek"
                ref={calendarRef}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: ''
                }}
                events={events}
                editable={true}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
                eventDrop={handleEventDrop}
            />
        </div>
    )
}
