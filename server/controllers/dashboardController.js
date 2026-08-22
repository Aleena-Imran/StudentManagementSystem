import Student from "../models/Student.js";
import User from "../models/User.js";
import Attendance from "../models/Attendance.js";
import Exam from "../models/Exam.js";

export const getDashboardStats = async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments();

    const totalTeachers = await User.countDocuments({
      role: "teacher",
    });

    const totalAttendance = await Attendance.countDocuments();

    const presentAttendance = await Attendance.countDocuments({
      status: "Present",
    });

    const attendancePercentage =
      totalAttendance === 0
        ? 0
        : ((presentAttendance / totalAttendance) * 100).toFixed(2);

    const upcomingExams = await Exam.countDocuments({
      examDate: { $gte: new Date() },
    });

    res.json({
      totalStudents,
      totalTeachers,
      attendancePercentage,
      upcomingExams,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};