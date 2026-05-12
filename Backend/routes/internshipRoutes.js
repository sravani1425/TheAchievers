const express = require('express');
const router = express.Router();
const { 
  registerInternship, 
  uploadCertificate, 
  getMyInternships 
} = require('../controllers/internshipController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../config/cloudinaryConfig');

// Register internship (Student)
router.post('/register', protect, registerInternship);

// Get my internships (Student)
router.get('/my-internships', protect, getMyInternships);

// Upload certificate (Student) - expects multipart/form-data field name 'certificate'
router.post('/upload/:id', protect, upload.single('certificate'), uploadCertificate);

module.exports = router;
