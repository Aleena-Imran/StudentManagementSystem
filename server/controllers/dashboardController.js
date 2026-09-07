import Student from "../models/Student.js";
import User from "../models/User.js";
import Attendance from "../models/Attendance.js";
import Exam from "../models/Exam.js";
import Assignment from "../models/Assignment.js";
import Result from "../models/Result.js";

// ==========================================
// ADMIN DASHBOARD
// ==========================================

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
      examDate: {
        $gte: new Date(),
      },
    });

    // ==========================================
    // ATTENDANCE OVERVIEW
    // ==========================================

    const attendanceRecords = await Attendance.find({})
      .sort({ date: 1 })
      .lean();

    const attendanceByDate = {};

    attendanceRecords.forEach((record) => {
      if (!record.date) return;

      const date = new Date(record.date);

      if (isNaN(date.getTime())) return;

      const dateKey = date.toISOString().split("T")[0];

      if (!attendanceByDate[dateKey]) {
        attendanceByDate[dateKey] = {
          total: 0,
          present: 0,
        };
      }

      attendanceByDate[dateKey].total += 1;

      if (
        String(record.status).trim().toLowerCase() === "present"
      ) {
        attendanceByDate[dateKey].present += 1;
      }
    });

    const attendanceOverview = Object.entries(
      attendanceByDate
    ).map(([date, data]) => ({
      date,
      attendance:
        data.total === 0
          ? 0
          : Math.round((data.present / data.total) * 100),
    }));

    res.json({
      totalStudents,
      totalTeachers,
      attendancePercentage,
      upcomingExams,
      attendanceOverview,
    });
  } catch (error) {
    console.error("Admin dashboard error:", error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// ==========================================
// TEACHER DASHBOARD
// ==========================================

export const getTeacherDashboard = async (req, res) => {
  try {
    const teacher = await User.findById(req.user.id);

    if (!teacher) {
      return res.status(404).json({
        message: "Teacher not found",
      });
    }

    const totalStudents = await Student.countDocuments();

    const totalAttendance = await Attendance.countDocuments();

    const presentAttendance = await Attendance.countDocuments({
      status: "Present",
    });

    const attendancePercentage =
      totalAttendance === 0
        ? 0
        : Math.round(
            (presentAttendance / totalAttendance) * 100
          );

    const upcomingExams = await Exam.countDocuments({
      examDate: {
        $gte: new Date(),
      },
    });

    const pendingAssignments = await Assignment.countDocuments({
      status: {
        $ne: "Completed",
      },
    });

    res.json({
      teacher: {
        name: teacher.name,
        email: teacher.email,
      },
      totalStudents,
      attendancePercentage,
      upcomingExams,
      pendingAssignments,
    });
  } catch (error) {
    console.error("Teacher dashboard error:", error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// ==========================================
// STUDENT DASHBOARD
// ==========================================

export const getStudentDashboard = async (req, res) => {
  try {
    // ==========================================
    // 1. Find logged-in user
    // ==========================================

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // ==========================================
    // 2. Find student profile
    // ==========================================

    const student = await Student.findOne({
      email: user.email,
    });

    if (!student) {
      return res.status(404).json({
        message:
          "Student profile not found. Please contact the administrator.",
      });
    }

    // ==========================================
    // 3. Get student's assignments
    // ==========================================

    const assignments = await Assignment.find({
      studentId: student._id,
    })
      .sort({ dueDate: 1 })
      .lean();

    // ==========================================
    // 4. Get student's results
    // ==========================================

    const results = await Result.find({
      studentId: student._id,
    })
      .sort({ examDate: -1 })
      .lean();

    // ==========================================
    // 5. Get student's attendance
    // ==========================================

    const attendanceRecords = await Attendance.find({
      studentId: student._id,
    })
      .sort({ date: 1 })
      .lean();

    // ==========================================
    // 6. Calculate attendance percentage
    // ==========================================

    const totalAttendance = attendanceRecords.length;

    const presentAttendance = attendanceRecords.filter(
      (record) =>
        String(record.status).trim().toLowerCase() ===
        "present"
    ).length;

    const attendancePercentage =
      totalAttendance === 0
        ? 0
        : Math.round(
            (presentAttendance / totalAttendance) * 100
          );

    // ==========================================
    // 7. Create attendance trend
    // ==========================================

    const attendanceTrend = attendanceRecords
      .map((record) => {
        if (!record.date) {
          return null;
        }

        const date = new Date(record.date);

        if (isNaN(date.getTime())) {
          return null;
        }

        return {
          date: date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          }),

          attendance:
            String(record.status).trim().toLowerCase() ===
            "present"
              ? 100
              : 0,
        };
      })
      .filter(Boolean);

    // ==========================================
    // 8. Get upcoming exams
    // ==========================================

    const upcomingExams = await Exam.find({
      examDate: {
        $gte: new Date(),
      },
    })
      .sort({ examDate: 1 })
      .limit(5)
      .lean();

    // ==========================================
    // 9. Send student dashboard data
    // ==========================================

    res.status(200).json({
      student: {
        name: student.name,
        email: student.email,
        course: student.course,
        grade: student.grade || "",
      },

      attendance: attendancePercentage,

      averageGrade: student.grade || "N/A",

      upcomingExams,

      attendanceTrend,

      assignments,

      results,
    });
  } catch (error) {
    console.error("Student dashboard error:", error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};