const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: function() { return !this.isAnonymous; }
  },
  feedbackType: {
    type: String,
    enum: ['Course', 'Faculty'],
    required: true
  },
  targetId: {
    type: String, // Can be course code or faculty Object ID
    required: true
  },
  targetName: {
    type: String,
    required: true
  },
  ratings: {
    type: Map,
    of: Number, // Stores key-value pairs, e.g., { "teachingClarity": 4, "subjectKnowledge": 5 }
    required: true
  },
  averageRating: {
    type: Number
  },
  comments: {
    type: String
  },
  isAnonymous: {
    type: Boolean,
    default: false
  },
  semester: {
    type: String
  }
}, {
  timestamps: true
});

// Pre-save middleware to calculate the average rating
feedbackSchema.pre('save', function(next) {
  if (this.ratings && this.ratings.size > 0) {
    let sum = 0;
    this.ratings.forEach((value) => {
      sum += value;
    });
    this.averageRating = sum / this.ratings.size;
  }
  next();
});

module.exports = mongoose.model('Feedback', feedbackSchema);
