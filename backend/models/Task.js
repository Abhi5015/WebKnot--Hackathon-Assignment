const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
    name: String,
    deadline: Date,
    status: { type: String, enum: ['Pending', 'Completed'], default: 'Pending' },
    assignedAttendee: { type: mongoose.Schema.Types.ObjectId, ref: 'Attendee' }
});

module.exports = mongoose.model('Task', TaskSchema);
