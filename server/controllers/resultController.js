import Result from "../models/Result.js";
import User from "../models/User.js";
import Student from "../models/Student.js";

export const getStudentResults = async (req, res) => {
  try {
    // Find logged-in user
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Find corresponding student profile
    const student = await Student.findOne({
      email: user.email,
    });

    if (!student) {
      return res.status(404).json({
        message: "Student profile not found",
      });
    }

    // Get student's results
    const results = await Result.find({
      studentId: student._id,
    }).sort({
      examDate: -1,
    });

    res.status(200).json({
      results,
    });
  } catch (error) {
    console.error("Get results error:", error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const getStudentsForResults = async (req, res) => {
  try {
    const students = await Student.find(
      {},
      { name: 1, email: 1, course: 1 }
    ).sort({ name: 1 });

    res.status(200).json(students);
  } catch (error) {
    console.error("Get students for results error:", error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};


export const addResult = async (req, res) => {
  try {
    const {
      studentId,
      subject,
      assessment,
      marksObtained,
      maxMarks,
      grade,
      semester,
      examDate,
    } = req.body;

    if (
      !studentId ||
      !subject ||
      !assessment ||
      marksObtained === undefined ||
      !maxMarks ||
      !grade ||
      !semester
    ) {
      return res.status(400).json({
        message: "All required fields must be provided",
      });
    }

    if (Number(marksObtained) < 0) {
      return res.status(400).json({
        message: "Marks obtained cannot be negative",
      });
    }

    if (Number(marksObtained) > Number(maxMarks)) {
      return res.status(400).json({
        message: "Marks obtained cannot exceed maximum marks",
      });
    }

    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    const result = await Result.create({
      studentId,
      subject,
      assessment,
      marksObtained: Number(marksObtained),
      maxMarks: Number(maxMarks),
      grade,
      semester,
      examDate: examDate || undefined,
    });

    res.status(201).json({
      message: "Result added successfully",
      result,
    });
  } catch (error) {
    console.error("Add result error:", error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};