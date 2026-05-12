const express = require('express');
const router = express.Router();
const { 
  markAttendance, 
  getStudentAttendance 
} = require('../controllers/attendanceController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Mark attendance (Faculty/Admin)
router.post('/mark', protect, authorize('admin', 'faculty', 'hod'), markAttendance);

// Get student attendance (Student/Faculty/Admin)
router.get('/student/:studentId', protect, getStudentAttendance);

module.exports = router;
