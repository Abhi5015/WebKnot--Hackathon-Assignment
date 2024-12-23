const Event = require('../models/Event');

// @desc   Create a new Event
// @route  POST /api/events
// @access Public
exports.createEvent = async (req, res) => {
    try {
        const { name, description, location, date } = req.body;

        if (!name || !description || !location || !date) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const event = new Event({ name, description, location, date });
        await event.save();

        res.status(201).json(event);
    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).json({ message: 'Server error while creating event' });
    }
};

// @desc   Get all Events
// @route  GET /api/events
// @access Public
exports.getEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json(events);
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ message: 'Server error while fetching events' });
    }
};

// @desc   Update an Event
// @route  PUT /api/events/:id
// @access Public
exports.updateEvent = async (req, res) => {
    try {
        const { name, description, location, date } = req.body;

        const updatedEvent = await Event.findByIdAndUpdate(
            req.params.id,
            { name, description, location, date },
            { new: true, runValidators: true }
        );

        if (!updatedEvent) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.status(200).json(updatedEvent);
    } catch (error) {
        console.error('Error updating event:', error);
        res.status(500).json({ message: 'Server error while updating event' });
    }
};

// @desc   Delete an Event
// @route  DELETE /api/events/:id
// @access Public
exports.deleteEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        console.error('Error deleting event:', error);
        res.status(500).json({ message: 'Server error while deleting event' });
    }
};
