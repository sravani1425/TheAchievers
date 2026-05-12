const Attendance = require('../models/Attendance');

// @desc    Mark daily attendance for a batch of students
// @route   POST /api/attendance/mark
// @access  Private/Faculty/Admin
const markAttendance = async (req, res) => {
  const { date, subjectCode, subjectName, records } = req.body;
  
  // records is an array of { studentId, status }
  
  try {
    const attendanceDocs = records.map(record => ({
      student: record.studentId,
      date,
      subjectCode,
      subjectName,
      status: record.status,
      recordedBy: req.user._id
    }));

    await Attendance.insertMany(attendanceDocs);

    res.status(201).json({ message: 'Attendance marked successfully', count: attendanceDocs.length });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get attendance summary for a student
// @route   GET /api/attendance/student/:studentId
// @access  Private
const getStudentAttendance = async (req, res) => {
  try {
    const attendanceRecords = await Attendance.find({ student: req.params.studentId }).sort({ date: -1 });
    
    // Calculate subject-wise percentage
    const subjectStats = {};
    let totalClasses = 0;
    let totalPresent = 0;

    attendanceRecords.forEach(record => {
      if (!subjectStats[record.subjectCode]) {
        subjectStats[record.subjectCode] = { subjectName: record.subjectName, total: 0, present: 0 };
      }
      subjectStats[record.subjectCode].total += 1;
      totalClasses += 1;
      
      if (record.status === 'Present' || record.status === 'Late') {
        subjectStats[record.subjectCode].present += 1;
        totalPresent += 1;
      }
    });

    const summary = [];
    let hasShortage = false;

    for (const [code, stats] of Object.entries(subjectStats)) {
      const percentage = ((stats.present / stats.total) * 100).toFixed(2);
      const isShortage = percentage < 75; // 75% threshold
      if (isShortage) hasShortage = true;
      
      summary.push({
        subjectCode: code,
        subjectName: stats.subjectName,
        total: stats.total,
        present: stats.present,
        percentage,
        isShortage
      });
    }

    const overallPercentage = totalClasses > 0 ? ((totalPresent / totalClasses) * 100).toFixed(2) : 0;

    res.json({
      records: attendanceRecords.slice(0, 30), // Return last 30 daily records
      summary,
      overallPercentage,
      hasShortage,
      totalClasses,
      totalPresent
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  markAttendance,
  getStudentAttendance
};
