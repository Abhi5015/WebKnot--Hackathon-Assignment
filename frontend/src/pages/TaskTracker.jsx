import React, { useEffect, useState } from 'react';
import api from '../api';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import Modal from '../components/Modal';
import { io } from 'socket.io-client';

const TaskTracker = () => {
  const [tasks, setTasks] = useState([]);
  const [attendees, setAttendees] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    name: '',
    deadline: '',
    status: 'Pending',
    assignedAttendee: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // WebSocket Connection
  useEffect(() => {
    fetchTasks();
    fetchAttendees();

    const socket = io('http://localhost:5001');
    socket.on('taskUpdate', fetchTasks);

    return () => socket.disconnect();
  }, []);

  // Fetch Tasks
  const fetchTasks = async () => {
    try {
      const response = await api.get('/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  // Fetch Attendees
  const fetchAttendees = async () => {
    try {
      const response = await api.get('/attendees');
      setAttendees(response.data);
    } catch (error) {
      console.error('Error fetching attendees:', error);
    }
  };

  // Calculate Task Progress
  const calculateProgress = () => {
    if (tasks.length === 0) return 0;
    const completedTasks = tasks.filter((task) => task.status === 'Completed').length;
    return (completedTasks / tasks.length) * 100;
  };

  // Add Task
  const handleAddTask = async () => {
    if (!newTask.name || !newTask.deadline || !newTask.assignedAttendee) {
      alert('Please fill in all fields.');
      return;
    }

    setIsSubmitting(true);
    try {
      await api.post('/tasks', newTask);
      setNewTask({ name: '', deadline: '', status: 'Pending', assignedAttendee: '' });
      setIsAddModalOpen(false);
      fetchTasks();
    } catch (error) {
      console.error('Error adding task:', error);
      alert('Failed to add task.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Update Task Status
  const handleUpdateTaskStatus = async (id, status) => {
    try {
      await api.put(`/tasks/${id}`, { status });
      fetchTasks();
    } catch (error) {
      console.error('Error updating task status:', error);
      alert('Failed to update task status.');
    }
  };

  return (
    <div>
 
      <div className="container mx-auto p-4">
        {/* Page Title and Add Task Button */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Task Tracker</h1>
          <Button label="Add Task" variant="accent" onClick={() => setIsAddModalOpen(true)} />
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <h3 className="font-bold mb-2">Task Progress</h3>
          <div className="w-full bg-gray-200 rounded-full">
            <div
              className="bg-primary text-xs text-white text-center p-1 rounded-full"
              style={{ width: `${calculateProgress()}%` }}
            >
              {calculateProgress().toFixed(0)}%
            </div>
          </div>
        </div>

        {/* Task List */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-lg shadow-md">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Task Name</th>
                <th className="py-2 px-4 border-b">Deadline</th>
                <th className="py-2 px-4 border-b">Status</th>
                <th className="py-2 px-4 border-b">Assigned Attendee</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task._id}>
                  <td className="py-2 px-4 border-b">{task.name}</td>
                  <td className="py-2 px-4 border-b">{new Date(task.deadline).toLocaleDateString()}</td>
                  <td className="py-2 px-4 border-b">
                    <select
                      value={task.status}
                      onChange={(e) => handleUpdateTaskStatus(task._id, e.target.value)}
                      className="p-1 border rounded-md"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </td>
                  <td className="py-2 px-4 border-b">{task.assignedAttendee?.name || 'N/A'}</td>
                  <td className="py-2 px-4 border-b">
                    <Button label="Delete" variant="secondary" onClick={() => handleDeleteTask(task._id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add Task Modal */}
        <Modal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          title="Add New Task"
        >
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Task Name"
              value={newTask.name}
              onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
              className="w-full p-2 border rounded-md"
            />
            <input
              type="date"
              value={newTask.deadline}
              onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
              className="w-full p-2 border rounded-md"
            />
            <select
              value={newTask.assignedAttendee}
              onChange={(e) => setNewTask({ ...newTask, assignedAttendee: e.target.value })}
              className="w-full p-2 border rounded-md"
            >
              <option value="">Select Attendee</option>
              {attendees.map((attendee) => (
                <option key={attendee._id} value={attendee._id}>
                  {attendee.name}
                </option>
              ))}
            </select>
            <div className="flex justify-end space-x-2">
              <Button label="Cancel" variant="secondary" onClick={() => setIsAddModalOpen(false)} />
              <Button label="Add Task" variant="accent" onClick={handleAddTask} disabled={isSubmitting} />
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default TaskTracker;
