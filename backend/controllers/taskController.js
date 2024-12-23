const Task = require('../models/Task');

// @desc   Create a new Task
// @route  POST /api/tasks
// @access Public
exports.createTask = async (req, res) => {
    try {
        const { name, deadline, status, assignedAttendee } = req.body;

        if (!name || !deadline || !assignedAttendee) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const task = new Task({ name, deadline, status, assignedAttendee });
        await task.save();

        res.status(201).json(task);
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ message: 'Server error while creating task' });
    }
};

// @desc   Get all Tasks
// @route  GET /api/tasks
// @access Public
exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find().populate('assignedAttendee', 'name email');
        res.status(200).json(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ message: 'Server error while fetching tasks' });
    }
};

// @desc   Update Task Status
// @route  PUT /api/tasks/:id
// @access Public
exports.updateTask = async (req, res) => {
    try {
        const { status } = req.body;

        const task = await Task.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json(task);
    } catch (error) {
        console.error('Error updating task status:', error);
        res.status(500).json({ message: 'Server error while updating task' });
    }
};
