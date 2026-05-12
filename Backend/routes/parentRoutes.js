const express = require('express');
const router = express.Router();
const { logInteraction, getStudentInteractions } = require('../controllers/parentController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Log a parent interaction (Faculty/Admin)
router.post('/interaction', protect, authorize('faculty', 'admin', 'hod'), logInteraction);

// Get student's parent interactions
router.get('/student/:studentId', protect, getStudentInteractions);

module.exports = router;
