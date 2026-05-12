const express = require('express');
const router = express.Router();
const { 
  submitFeedback, 
  getFeedbackAnalytics 
} = require('../controllers/feedbackController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Submit feedback (Student)
router.post('/submit', protect, authorize('student'), submitFeedback);

// Get feedback analytics (Admin/HOD)
router.get('/analytics/:type', protect, authorize('admin', 'hod'), getFeedbackAnalytics);

module.exports = router;
