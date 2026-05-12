const express = require('express');
const router = express.Router();
const { 
  addAcademicRecord, 
  getStudentRecords, 
  getActiveBacklogs 
} = require('../controllers/academicController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Add academic record (Admin/Faculty)
router.post('/record', protect, authorize('admin', 'faculty', 'hod'), addAcademicRecord);

// Get student academic records
router.get('/student/:studentId', protect, getStudentRecords);

// Get student backlogs
router.get('/backlogs/:studentId', protect, getActiveBacklogs);

module.exports = router;
