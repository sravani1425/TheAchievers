const mongoose = require('mongoose');

const internshipSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  roleTitle: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  projectStatus: {
    type: String,
    enum: ['Registered', 'In Progress', 'Completed', 'Verified'],
    default: 'Registered',
  },
  guide: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  guideRemarks: {
    type: String,
  },
  certificateUrl: {
    type: String,
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Internship', internshipSchema);
