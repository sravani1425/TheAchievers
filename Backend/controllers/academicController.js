const AcademicRecord = require('../models/AcademicRecord');
const Backlog = require('../models/Backlog');

// Helper to calculate Grade Points based on Grade (simplified)
const getGradePoints = (grade) => {
  const grades = { 'O': 10, 'A+': 9, 'A': 8, 'B+': 7, 'B': 6, 'C': 5, 'P': 4, 'F': 0 };
  return grades[grade] || 0;
};

// @desc    Add academic record for a semester
// @route   POST /api/academic/record
// @access  Private/Admin/Faculty
const addAcademicRecord = async (req, res) => {
  const { studentId, semester, subjects } = req.body;

  try {
    let totalCredits = 0;
    let earnedPoints = 0;
    let hasFailures = false;

    const processedSubjects = subjects.map(sub => {
      const gp = getGradePoints(sub.grade);
      if (sub.grade === 'F') hasFailures = true;
      totalCredits += sub.credits;
      earnedPoints += (gp * sub.credits);
      return { ...sub, gradePoints: gp };
    });

    const sgpa = totalCredits > 0 ? (earnedPoints / totalCredits).toFixed(2) : 0;
    const status = hasFailures ? 'Promoted with Backlogs' : 'Pass';

    const record = await AcademicRecord.findOneAndUpdate(
      { student: studentId, semester },
      { 
        student: studentId, 
        semester, 
        subjects: processedSubjects, 
        sgpa, 
        status 
      },
      { new: true, upsert: true }
    );

    // If there are failures, add them to Backlogs
    if (hasFailures) {
      for (const sub of processedSubjects) {
        if (sub.grade === 'F') {
          await Backlog.findOneAndUpdate(
            { student: studentId, subjectCode: sub.subjectCode },
            { 
              student: studentId, 
              subjectCode: sub.subjectCode, 
              subjectName: sub.subjectName,
              semester: semester,
              $inc: { attemptCount: 1 },
              resultStatus: 'Active'
            },
            { upsert: true }
          );
        }
      }
    }

    res.status(201).json(record);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get student academic records
// @route   GET /api/academic/student/:studentId
// @access  Private
const getStudentRecords = async (req, res) => {
  try {
    const records = await AcademicRecord.find({ student: req.params.studentId }).sort({ semester: 1 });
    
    // Calculate CGPA
    let totalSgpa = 0;
    records.forEach(r => totalSgpa += r.sgpa);
    const cgpa = records.length > 0 ? (totalSgpa / records.length).toFixed(2) : 0;

    res.json({ records, cgpa });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get active backlogs for a student
// @route   GET /api/academic/backlogs/:studentId
// @access  Private
const getActiveBacklogs = async (req, res) => {
  try {
    const backlogs = await Backlog.find({ student: req.params.studentId, resultStatus: 'Active' });
    res.json(backlogs);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  addAcademicRecord,
  getStudentRecords,
  getActiveBacklogs
};
