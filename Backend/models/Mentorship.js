const mongoose = require('mongoose');

const mentorshipSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  mentor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  semester: {
    type: String,
  },
  allocationDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['Active', 'Completed', 'Reassigned'],
    default: 'Active',
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Mentorship', mentorshipSchema);
