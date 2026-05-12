const express = require('express');
const router = express.Router();
const { 
  allocateMentor, 
  getMentorStudents, 
  addCounsellingSession, 
  getStudentHistory 
} = require('../controllers/counselController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Allocate mentor (Admin only)
router.post('/allocate', protect, authorize('admin', 'hod'), allocateMentor);

// Get students for a mentor (Mentor or Admin)
router.get('/mentor/:mentorId', protect, authorize('admin', 'faculty', 'hod'), getMentorStudents);

// Add session notes (Mentor only)
router.post('/session', protect, authorize('faculty', 'admin'), addCounsellingSession);

// Get student history
router.get('/history/:mentorshipId', protect, authorize('admin', 'faculty', 'hod'), getStudentHistory);

module.exports = router;
