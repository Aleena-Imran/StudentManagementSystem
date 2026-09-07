import Attendance from "../models/Attendance.js";
import User from "../models/User.js";
import Student from "../models/Student.js";

export const getMyAttendance = async (req, res) => {
  try {
    // Get logged-in user
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Find student profile using user's email
    const student = await Student.findOne({
      email: user.email,
    });

    if (!student) {
      return res.status(404).json({
        message: "Student profile not found",
      });
    }

    // Get attendance records belonging to this student
    const attendance = await Attendance.find({
      studentId: student._id,
    }).sort({ date: -1 });

    // Calculate statistics
    const totalDays = attendance.length;

    const presentDays = attendance.filter(
      (record) => record.status === "Present"
    ).length;

    const absentDays = attendance.filter(
      (record) => record.status === "Absent"
    ).length;

    const attendancePercentage =
      totalDays > 0
        ? ((presentDays / totalDays) * 100).toFixed(1)
        : 0;

    res.status(200).json({
      attendance,
      statistics: {
        totalDays,
        presentDays,
        absentDays,
        attendancePercentage,
      },
    });
  } catch (error) {
    console.error("Get my attendance error:", error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const getStudentsForAttendance = async (req, res) => {
  try {
    const students = await Student.find(
      {},
      { name: 1, course: 1 }
    ).sort({ name: 1 });

    res.status(200).json(students);
  } catch (error) {
    console.error("Get students for attendance error:", error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};


export const markAttendance = async (req, res) => {
  try {
    const { date, attendance } = req.body;

    if (!date || !Array.isArray(attendance)) {
      return res.status(400).json({
        message: "Date and attendance data are required",
      });
    }

    const selectedDate = new Date(date);

    if (isNaN(selectedDate.getTime())) {
      return res.status(400).json({
        message: "Invalid attendance date",
      });
    }

    // Normalize the date so attendance is stored for the selected day
    selectedDate.setHours(0, 0, 0, 0);

    const operations = attendance.map((record) => ({
      updateOne: {
        filter: {
          studentId: record.studentId,
          date: selectedDate,
        },
        update: {
          $set: {
            status: record.status,
          },
        },
        upsert: true,
      },
    }));

    if (operations.length > 0) {
      await Attendance.bulkWrite(operations);
    }

    res.status(200).json({
      message: "Attendance saved successfully",
    });
  } catch (error) {
    console.error("Mark attendance error:", error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};