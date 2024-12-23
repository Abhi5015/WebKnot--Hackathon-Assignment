import React, { useEffect, useState } from 'react';
import api from '../api';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import Modal from '../components/Modal';

const AttendeeManagement = () => {
  const [attendees, setAttendees] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newAttendee, setNewAttendee] = useState({ name: '', email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch Attendees
  useEffect(() => {
    fetchAttendees();
  }, []);

  const fetchAttendees = async () => {
    try {
      const response = await api.get('/attendees');
      setAttendees(response.data);
    } catch (error) {
      console.error('Error fetching attendees:', error);
    }
  };

  // Add Attendee
  const handleAddAttendee = async () => {
    if (!newAttendee.name || !newAttendee.email) {
      alert('Please fill in all fields.');
      return;
    }

    setIsSubmitting(true);
    try {
      await api.post('/attendees', newAttendee);
      setNewAttendee({ name: '', email: '' });
      setIsAddModalOpen(false);
      fetchAttendees();
    } catch (error) {
      console.error('Error adding attendee:', error);
      alert('Failed to add attendee.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete Attendee
  const handleDeleteAttendee = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this attendee?');
    if (!confirmDelete) return;

    setIsSubmitting(true);
    try {
      await api.delete(`/attendees/${id}`);
      setAttendees(attendees.filter((attendee) => attendee._id !== id));
    } catch (error) {
      console.error('Error deleting attendee:', error);
      alert('Failed to delete attendee.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
   
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Attendee Management</h1>
          <Button label="Add Attendee" variant="accent" onClick={() => setIsAddModalOpen(true)} />
        </div>

        {/* Attendee List */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-lg shadow-md">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {attendees.map((attendee) => (
                <tr key={attendee._id}>
                  <td className="py-2 px-4 border-b">{attendee.name}</td>
                  <td className="py-2 px-4 border-b">{attendee.email}</td>
                  <td className="py-2 px-4 border-b">
                    <Button
                      label="Delete"
                      variant="secondary"
                      onClick={() => handleDeleteAttendee(attendee._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add Attendee Modal */}
        <Modal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          title="Add New Attendee"
        >
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Attendee Name"
              value={newAttendee.name}
              onChange={(e) => setNewAttendee({ ...newAttendee, name: e.target.value })}
              className="w-full p-2 border rounded-md"
            />
            <input
              type="email"
              placeholder="Attendee Email"
              value={newAttendee.email}
              onChange={(e) => setNewAttendee({ ...newAttendee, email: e.target.value })}
              className="w-full p-2 border rounded-md"
            />
            <div className="flex justify-end space-x-2">
              <Button
                label="Cancel"
                variant="secondary"
                onClick={() => setIsAddModalOpen(false)}
              />
              <Button
                label="Add Attendee"
                variant="accent"
                onClick={handleAddAttendee}
                disabled={isSubmitting}
              />
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default AttendeeManagement;
