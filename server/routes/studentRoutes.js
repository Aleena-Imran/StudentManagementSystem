import express from "express";
import Student from "../models/Student.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all students
router.get(
  "/",
  protect,
  authorize("admin", "teacher"),
  async (req, res) => {
    try {
      const students = await Student.find().sort({ createdAt: -1 });

      res.status(200).json({
        students,
      });
    } catch (error) {
      console.error("Get students error:", error);

      res.status(500).json({
        message: "Server Error",
      });
    }
  }
);


// Add a new student
router.post(
  "/",
  protect,
  authorize("admin"),
  async (req, res) => {
    try {
      const { name, course } = req.body;

      if (!name || !course) {
        return res.status(400).json({
          message: "Name and course are required",
        });
      }

      const student = await Student.create({
        name,
        course,
      });

      res.status(201).json({
        message: "Student added successfully",
        student,
      });
    } catch (error) {
      console.error("Add student error:", error);

      res.status(500).json({
        message: "Server Error",
      });
    }
  }
);

// Update a student
router.put(
  "/:id",
  protect,
  authorize("admin"),
  async (req, res) => {
    try {
      const { name, course } = req.body;

      if (!name || !course) {
        return res.status(400).json({
          message: "Name and course are required",
        });
      }

      const student = await Student.findByIdAndUpdate(
        req.params.id,
        {
          name,
          course,
        },
        {
          new: true,
          runValidators: true,
        }
      );

      if (!student) {
        return res.status(404).json({
          message: "Student not found",
        });
      }

      res.status(200).json({
        message: "Student updated successfully",
        student,
      });
    } catch (error) {
      console.error("Update student error:", error);

      res.status(500).json({
        message: "Server Error",
      });
    }
  }
);

router.delete(
  "/:id",
  protect,
  authorize("admin"),
  async (req, res) => {
    try {
      const student = await Student.findByIdAndDelete(req.params.id);

      if (!student) {
        return res.status(404).json({
          message: "Student not found",
        });
      }

      res.status(200).json({
        message: "Student deleted successfully",
      });
    } catch (error) {
      console.error("Delete student error:", error);

      res.status(500).json({
        message: "Server Error",
      });
    }
  }
);

export default router;