import React, { useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import enUS from 'date-fns/locale/en-US'; // Direct Import
import 'react-big-calendar/lib/css/react-big-calendar.css';
import api from '../api';

const locales = {
  'en-US': enUS, // Using the direct import
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const CalendarView = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await api.get('/events');
      const formattedEvents = response.data.map((event) => ({
        title: event.name,
        start: new Date(event.date),
        end: new Date(event.date),
        description: event.description,
        location: event.location,
      }));
      setEvents(formattedEvents);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleEventClick = (event) => {
    alert(`
      Event: ${event.title}
      Description: ${event.description}
      Location: ${event.location}
      Date: ${event.start.toDateString()}
    `);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Event Calendar</h1>
      <div style={{ height: '75vh' }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: '100%' }}
          onSelectEvent={handleEventClick}
        />
      </div>
    </div>
  );
};

export default CalendarView;
