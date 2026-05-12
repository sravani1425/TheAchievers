const Mentorship = require('../models/Mentorship');
const CounsellingSession = require('../models/CounsellingSession');
const User = require('../models/User');

// @desc    Allocate mentor to student (Admin only)
// @route   POST /api/counselling/allocate
// @access  Private/Admin
const allocateMentor = async (req, res) => {
  const { studentId, mentorId, department, semester } = req.body;

  try {
    // Check if both users exist and have correct roles
    const student = await User.findOne({ _id: studentId, role: 'student' });
    const mentor = await User.findOne({ _id: mentorId, role: 'faculty' });

    if (!student || !mentor) {
      return res.status(404).json({ message: 'Valid student or mentor not found' });
    }

    // Check if student already has an active mentor
    const existingAllocation = await Mentorship.findOne({ student: studentId, status: 'Active' });
    
    if (existingAllocation) {
      return res.status(400).json({ message: 'Student already has an active mentor. Reassign them instead.' });
    }

    const mentorship = await Mentorship.create({
      student: studentId,
      mentor: mentorId,
      department,
      semester
    });

    res.status(201).json(mentorship);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get all students assigned to a specific mentor
// @route   GET /api/counselling/mentor/:mentorId
// @access  Private/Mentor
const getMentorStudents = async (req, res) => {
  try {
    // A mentor can only view their own students, but an Admin can view any mentor's students
    if (req.user.role === 'faculty' && req.user._id.toString() !== req.params.mentorId) {
       return res.status(403).json({ message: 'Not authorized to view another mentor\'s students' });
    }

    const students = await Mentorship.find({ mentor: req.params.mentorId, status: 'Active' })
      .populate('student', 'name email department phone');
    
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Add a counselling session note
// @route   POST /api/counselling/session
// @access  Private/Mentor
const addCounsellingSession = async (req, res) => {
  const { mentorshipId, sessionDate, counsellingRemarks, followUpStatus, followUpDate } = req.body;

  try {
    const mentorship = await Mentorship.findById(mentorshipId);

    if (!mentorship) {
      return res.status(404).json({ message: 'Mentorship record not found' });
    }

    // Ensure only the assigned mentor or an admin can add a session
    if (req.user.role === 'faculty' && mentorship.mentor.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Not authorized to add session for this student' });
    }

    const session = await CounsellingSession.create({
      mentorship: mentorshipId,
      sessionDate,
      counsellingRemarks,
      followUpStatus,
      followUpDate
    });

    res.status(201).json(session);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get counselling history for a student
// @route   GET /api/counselling/history/:mentorshipId
// @access  Private/Mentor/Admin
const getStudentHistory = async (req, res) => {
  try {
    const history = await CounsellingSession.find({ mentorship: req.params.mentorshipId }).sort({ sessionDate: -1 });
    res.json(history);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  allocateMentor,
  getMentorStudents,
  addCounsellingSession,
  getStudentHistory
};
