const Internship = require('../models/Internship');

// @desc    Register a new internship
// @route   POST /api/internships/register
// @access  Private/Student
const registerInternship = async (req, res) => {
  const { companyName, roleTitle, startDate, endDate } = req.body;

  try {
    const internship = await Internship.create({
      student: req.user._id,
      companyName,
      roleTitle,
      startDate,
      endDate
    });

    res.status(201).json(internship);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Upload certificate for an internship
// @route   POST /api/internships/upload/:id
// @access  Private/Student
const uploadCertificate = async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id);

    if (!internship) {
      return res.status(404).json({ message: 'Internship not found' });
    }

    if (internship.student.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    internship.certificateUrl = req.file.path; // URL provided by Cloudinary
    internship.projectStatus = 'Completed';
    await internship.save();

    res.json(internship);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get student's internships
// @route   GET /api/internships/my-internships
// @access  Private/Student
const getMyInternships = async (req, res) => {
  try {
    const internships = await Internship.find({ student: req.user._id }).sort({ createdAt: -1 });
    res.json(internships);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  registerInternship,
  uploadCertificate,
  getMyInternships
};
