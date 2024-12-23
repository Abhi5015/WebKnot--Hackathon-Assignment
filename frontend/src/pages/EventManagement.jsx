import React, { useEffect, useState } from 'react';
import api from '../api';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import Card from '../components/Card';
import Modal from '../components/Modal';

const EventManagement = () => {
  const [events, setEvents] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    name: '',
    description: '',
    location: '',
    date: '',
  });
  const [editEvent, setEditEvent] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch Events from Backend
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await api.get('/events');
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  // Add New Event
  const handleAddEvent = async () => {
    if (!newEvent.name || !newEvent.description || !newEvent.location || !newEvent.date) {
      alert('Please fill in all fields.');
      return;
    }

    setIsSubmitting(true);
    try {
      await api.post('/events', newEvent);
      setNewEvent({ name: '', description: '', location: '', date: '' });
      setIsAddModalOpen(false);
      fetchEvents();
    } catch (error) {
      console.error('Error adding event:', error);
      alert('Failed to add event.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Open Edit Modal
  const openEditModal = (event) => {
    setEditEvent(event);
    setIsEditModalOpen(true);
  };

  // Edit Event
  const handleEditEvent = async () => {
    if (!editEvent.name || !editEvent.description || !editEvent.location || !editEvent.date) {
      alert('Please fill in all fields.');
      return;
    }

    setIsSubmitting(true);
    try {
      await api.put(`/events/${editEvent._id}`, editEvent);
      setEditEvent(null);
      setIsEditModalOpen(false);
      fetchEvents();
    } catch (error) {
      console.error('Error updating event:', error);
      alert('Failed to update event.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete Event
  const handleDeleteEvent = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this event?');
    if (!confirmDelete) return;

    setIsSubmitting(true);
    try {
      await api.delete(`/events/${id}`);
      setEvents(events.filter((event) => event._id !== id));
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('Failed to delete event.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Event Management</h1>
          <Button label="Add Event" variant="accent" onClick={() => setIsAddModalOpen(true)} />
        </div>

        {/* Event Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {events.map((event) => (
            <Card key={event._id} title={event.name} description={event.description}>
              <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
              <div className="flex space-x-2 mt-2">
                <Button
                  label="Edit"
                  variant="primary"
                  onClick={() => openEditModal(event)}
                />
                <Button
                  label="Delete"
                  variant="secondary"
                  onClick={() => handleDeleteEvent(event._id)}
                />
              </div>
            </Card>
          ))}
        </div>

        {/* Add Event Modal */}
        <Modal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          title="Add New Event"
        >
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Event Name"
              value={newEvent.name}
              onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
              className="w-full p-2 border rounded-md"
            />
            <input
              type="text"
              placeholder="Description"
              value={newEvent.description}
              onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
              className="w-full p-2 border rounded-md"
            />
            <input
              type="text"
              placeholder="Location"
              value={newEvent.location}
              onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
              className="w-full p-2 border rounded-md"
            />
            <input
              type="date"
              value={newEvent.date}
              onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
              className="w-full p-2 border rounded-md"
            />
            <div className="flex justify-end space-x-2">
              <Button label="Cancel" variant="secondary" onClick={() => setIsAddModalOpen(false)} />
              <Button
                label="Add Event"
                variant="accent"
                onClick={handleAddEvent}
                disabled={isSubmitting}
              />
            </div>
          </div>
        </Modal>

        {/* Edit Event Modal */}
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          title="Edit Event"
        >
          <div className="space-y-4">
            <input
              type="text"
              value={editEvent?.name || ''}
              onChange={(e) => setEditEvent({ ...editEvent, name: e.target.value })}
              className="w-full p-2 border rounded-md"
            />
            <input
              type="date"
              value={editEvent?.date || ''}
              onChange={(e) => setEditEvent({ ...editEvent, date: e.target.value })}
              className="w-full p-2 border rounded-md"
            />
            <div className="flex justify-end space-x-2">
              <Button label="Cancel" variant="secondary" onClick={() => setIsEditModalOpen(false)} />
              <Button
                label="Save Changes"
                variant="primary"
                onClick={handleEditEvent}
                disabled={isSubmitting}
              />
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default EventManagement;
