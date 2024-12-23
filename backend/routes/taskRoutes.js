const express = require('express');
const router = express.Router();
const {
    createTask,
    getTasks,
    updateTask
} = require('../controllers/taskController');

// Route to create a new task and retrieve tasks for an event
router.route('/').post(createTask).get(getTasks);

// Route to update the status of a specific task by ID
router.route('/:id').put(updateTask);

module.exports = router;
