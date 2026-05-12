const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  subjectCode: { type: String, required: true },
  subjectName: { type: String, required: true },
  credits: { type: Number, required: true },
  internalMarks: { type: Number },
  externalMarks: { type: Number },
  totalMarks: { type: Number },
  grade: { type: String },
  gradePoints: { type: Number }
});

const academicRecordSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  semester: {
    type: Number,
    required: true,
  },
  subjects: [subjectSchema],
  sgpa: {
    type: Number,
    default: 0
  },
  cgpa: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['Pass', 'Fail', 'Promoted with Backlogs'],
    default: 'Pass'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('AcademicRecord', academicRecordSchema);
