const express = require('express');
const router = express.Router();
const { createEvent, getEvents, updateEvent, deleteEvent } = require('../controllers/eventController');

router.route('/').post(createEvent).get(getEvents);
router.route('/:id').put(updateEvent).delete(deleteEvent);

module.exports = router;
