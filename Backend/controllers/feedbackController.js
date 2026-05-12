const Feedback = require('../models/Feedback');

// @desc    Submit feedback (Course or Faculty)
// @route   POST /api/feedback/submit
// @access  Private/Student
const submitFeedback = async (req, res) => {
  const { feedbackType, targetId, targetName, ratings, comments, isAnonymous, semester } = req.body;

  try {
    const feedback = await Feedback.create({
      student: isAnonymous ? undefined : req.user._id,
      feedbackType,
      targetId,
      targetName,
      ratings,
      comments,
      isAnonymous,
      semester
    });

    res.status(201).json(feedback);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get feedback analytics (Admin/HOD)
// @route   GET /api/feedback/analytics/:type
// @access  Private/Admin/HOD
const getFeedbackAnalytics = async (req, res) => {
  try {
    const { type } = req.params; // 'Course' or 'Faculty'
    
    // Aggregate average rating per target
    const analytics = await Feedback.aggregate([
      { $match: { feedbackType: type } },
      { 
        $group: {
          _id: "$targetId",
          targetName: { $first: "$targetName" },
          overallAverage: { $avg: "$averageRating" },
          totalFeedbacks: { $sum: 1 }
        }
      },
      { $sort: { overallAverage: -1 } }
    ]);

    // Get raw feedback list for table display
    const rawFeedbacks = await Feedback.find({ feedbackType: type })
      .populate('student', 'name department')
      .sort({ createdAt: -1 });

    res.json({ analytics, rawFeedbacks });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  submitFeedback,
  getFeedbackAnalytics
};
