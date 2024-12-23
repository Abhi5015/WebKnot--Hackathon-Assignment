const express = require('express');
const router = express.Router();
const {
    addAttendee,
    getAttendees,
    deleteAttendee
} = require('../controllers/attendeeController');

// Route to add a new attendee
router.route('/').post(addAttendee).get(getAttendees);

// Route to delete an attendee by ID
router.route('/:id').delete(deleteAttendee);

module.exports = router;
