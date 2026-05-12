const mongoose = require('mongoose');

const parentInteractionSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  parentName: {
    type: String,
    required: true,
  },
  parentContact: {
    type: String,
    required: true,
  },
  interactionDate: {
    type: Date,
    required: true,
  },
  interactionType: {
    type: String,
    enum: ['Phone Call', 'Email', 'In-Person Meeting', 'Online Meeting'],
    required: true,
  },
  discussionSummary: {
    type: String,
    required: true,
  },
  feedbackNotes: {
    type: String,
  },
  followUpAction: {
    type: String,
  },
  recordedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('ParentInteraction', parentInteractionSchema);
