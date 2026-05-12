const mongoose = require('mongoose');

const counsellingSessionSchema = new mongoose.Schema({
  mentorship: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mentorship',
    required: true,
  },
  sessionDate: {
    type: Date,
    required: true,
  },
  counsellingRemarks: {
    type: String,
    required: true,
  },
  followUpStatus: {
    type: String,
    enum: ['None', 'Pending', 'Resolved'],
    default: 'None',
  },
  followUpDate: {
    type: Date,
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('CounsellingSession', counsellingSessionSchema);
