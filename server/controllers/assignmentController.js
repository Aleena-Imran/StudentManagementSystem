import Assignment from "../models/Assignment.js";
import User from "../models/User.js";
import Student from "../models/Student.js";


// ==========================================
// GET ASSIGNMENTS
// ==========================================

export const getAssignments = async (req, res) => {
  try {
    let assignments;

    // STUDENT
    if (req.user.role === "student") {
      const user = await User.findById(req.user.id);

      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      const student = await Student.findOne({
        email: user.email,
      });

      if (!student) {
        return res.status(404).json({
          message: "Student profile not found",
        });
      }

      assignments = await Assignment.find({
        course: student.course,
      })
        .populate("createdBy", "name email")
        .sort({ dueDate: 1 });
    }

    // ADMIN / TEACHER
    else {
      assignments = await Assignment.find()
        .populate("createdBy", "name email")
        .sort({ dueDate: 1 });
    }

    res.status(200).json(assignments);

  } catch (error) {
    console.error("Get assignments error:", error);

    res.status(500).json({
      message: "Failed to fetch assignments",
      error: error.message,
    });
  }
};


// ==========================================
// CREATE ASSIGNMENT
// ==========================================

export const createAssignment = async (req, res) => {
  try {
    const {
      title,
      subject,
      description,
      dueDate,
      course,
    } = req.body;

    // Validate fields
    if (
      !title ||
      !subject ||
      !description ||
      !dueDate ||
      !course
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Create assignment
    const assignment = await Assignment.create({
      title: title.trim(),
      subject: subject.trim(),
      description: description.trim(),
      dueDate,
      course: course.trim(),
      createdBy: req.user.id,
    });

    res.status(201).json({
      message: "Assignment created successfully",
      assignment,
    });

  } catch (error) {
    console.error("Create assignment error:", error);

    res.status(500).json({
      message: "Failed to create assignment",
      error: error.message,
    });
  }
};


// ==========================================
// UPDATE ASSIGNMENT
// ==========================================

export const updateAssignment = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      title,
      subject,
      description,
      dueDate,
      course,
    } = req.body;

    const assignment = await Assignment.findById(id);

    if (!assignment) {
      return res.status(404).json({
        message: "Assignment not found",
      });
    }

    assignment.title =
      title?.trim() || assignment.title;

    assignment.subject =
      subject?.trim() || assignment.subject;

    assignment.description =
      description?.trim() || assignment.description;

    assignment.dueDate =
      dueDate || assignment.dueDate;

    assignment.course =
      course?.trim() || assignment.course;

    await assignment.save();

    res.status(200).json({
      message: "Assignment updated successfully",
      assignment,
    });

  } catch (error) {
    console.error("Update assignment error:", error);

    res.status(500).json({
      message: "Failed to update assignment",
      error: error.message,
    });
  }
};


// ==========================================
// DELETE ASSIGNMENT
// ==========================================

export const deleteAssignment = async (req, res) => {
  try {
    const { id } = req.params;

    const assignment = await Assignment.findById(id);

    if (!assignment) {
      return res.status(404).json({
        message: "Assignment not found",
      });
    }

    await assignment.deleteOne();

    res.status(200).json({
      message: "Assignment deleted successfully",
    });

  } catch (error) {
    console.error("Delete assignment error:", error);

    res.status(500).json({
      message: "Failed to delete assignment",
      error: error.message,
    });
  }
};