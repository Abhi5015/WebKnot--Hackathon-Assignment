const Attendee = require('../models/Attendee');

// @desc   Add a new Attendee
// @route  POST /api/attendees
// @access Public
exports.addAttendee = async (req, res) => {
    try {
        const { name, email } = req.body;

        if (!name || !email) {
            return res.status(400).json({ message: 'Name and Email are required' });
        }

        const attendee = new Attendee({ name, email });
        await attendee.save();

        res.status(201).json(attendee);
    } catch (error) {
        console.error('Error adding attendee:', error);
        res.status(500).json({ message: 'Server error while adding attendee' });
    }
};

// @desc   Get all Attendees
// @route  GET /api/attendees
// @access Public
exports.getAttendees = async (req, res) => {
    try {
        const attendees = await Attendee.find();
        res.status(200).json(attendees);
    } catch (error) {
        console.error('Error fetching attendees:', error);
        res.status(500).json({ message: 'Server error while fetching attendees' });
    }
};

// @desc   Delete an Attendee
// @route  DELETE /api/attendees/:id
// @access Public
exports.deleteAttendee = async (req, res) => {
    try {
        const attendee = await Attendee.findByIdAndDelete(req.params.id);

        if (!attendee) {
            return res.status(404).json({ message: 'Attendee not found' });
        }

        res.status(200).json({ message: 'Attendee deleted successfully' });
    } catch (error) {
        console.error('Error deleting attendee:', error);
        res.status(500).json({ message: 'Server error while deleting attendee' });
    }
};
