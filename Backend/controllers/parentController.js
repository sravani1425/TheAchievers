const ParentInteraction = require('../models/ParentInteraction');

// @desc    Log a new parent interaction
// @route   POST /api/parents/interaction
// @access  Private/Faculty/Admin
const logInteraction = async (req, res) => {
  const { studentId, parentName, parentContact, interactionDate, interactionType, discussionSummary, feedbackNotes, followUpAction } = req.body;

  try {
    const interaction = await ParentInteraction.create({
      student: studentId,
      parentName,
      parentContact,
      interactionDate,
      interactionType,
      discussionSummary,
      feedbackNotes,
      followUpAction,
      recordedBy: req.user._id
    });

    res.status(201).json(interaction);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get parent interactions for a student
// @route   GET /api/parents/student/:studentId
// @access  Private/Faculty/Admin/Parent
const getStudentInteractions = async (req, res) => {
  try {
    const interactions = await ParentInteraction.find({ student: req.params.studentId })
      .populate('recordedBy', 'name role')
      .sort({ interactionDate: -1 });
      
    res.json(interactions);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  logInteraction,
  getStudentInteractions
};
