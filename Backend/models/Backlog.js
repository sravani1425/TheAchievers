const mongoose = require('mongoose');

const backlogSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  subjectCode: {
    type: String,
    required: true,
  },
  subjectName: {
    type: String,
    required: true,
  },
  semester: {
    type: Number,
    required: true,
  },
  attemptCount: {
    type: Number,
    default: 1,
  },
  resultStatus: {
    type: String,
    enum: ['Active', 'Cleared'],
    default: 'Active',
  },
  clearanceDate: {
    type: Date,
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Backlog', backlogSchema);
