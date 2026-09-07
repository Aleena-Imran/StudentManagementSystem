import express from "express";
import bcrypt from "bcryptjs";

import User from "../models/User.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// ==========================================
// GET ALL TEACHERS
// ==========================================

router.get(
  "/",
  protect,
  authorize("admin"),
  async (req, res) => {
    try {
      const teachers = await User.find(
        { role: "teacher" },
        { password: 0 }
      ).sort({ createdAt: -1 });

      res.status(200).json({
        teachers,
      });
    } catch (error) {
      console.error("Get teachers error:", error);

      res.status(500).json({
        message: "Server Error",
      });
    }
  }
);

// ==========================================
// ADD TEACHER
// ==========================================

router.post(
  "/",
  protect,
  authorize("admin"),
  async (req, res) => {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({
          message: "Name, email and password are required",
        });
      }

      const existingTeacher = await User.findOne({
        email: email.toLowerCase(),
      });

      if (existingTeacher) {
        return res.status(400).json({
          message: "A user with this email already exists",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const teacher = await User.create({
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
        role: "teacher",
      });

      res.status(201).json({
        message: "Teacher added successfully",
        teacher: {
          _id: teacher._id,
          name: teacher.name,
          email: teacher.email,
          role: teacher.role,
        },
      });
    } catch (error) {
      console.error("Add teacher error:", error);

      res.status(500).json({
        message: "Server Error",
      });
    }
  }
);

// ==========================================
// UPDATE TEACHER
// ==========================================


router.put(
  "/:id",
  protect,
  authorize("admin"),
  async (req, res) => {
    try {
      const { name, email } = req.body;

      if (!name || !email) {
        return res.status(400).json({
          message: "Name and email are required",
        });
      }

      const teacher = await User.findOne({
        _id: req.params.id,
        role: "teacher",
      });

      if (!teacher) {
        return res.status(404).json({
          message: "Teacher not found",
        });
      }

      const existingUser = await User.findOne({
        email: email.toLowerCase(),
        _id: { $ne: req.params.id },
      });

      if (existingUser) {
        return res.status(400).json({
          message: "A user with this email already exists",
        });
      }

      teacher.name = name;
      teacher.email = email.toLowerCase();

      await teacher.save();

      res.status(200).json({
        message: "Teacher updated successfully",
        teacher: {
          _id: teacher._id,
          name: teacher.name,
          email: teacher.email,
          role: teacher.role,
        },
      });
    } catch (error) {
      console.error("Update teacher error:", error);

      res.status(500).json({
        message: "Server Error",
      });
    }
  }
);

// ==========================================
// DELETE TEACHER
// ==========================================

router.delete(
  "/:id",
  protect,
  authorize("admin"),
  async (req, res) => {
    try {
      const teacher = await User.findOneAndDelete({
        _id: req.params.id,
        role: "teacher",
      });

      if (!teacher) {
        return res.status(404).json({
          message: "Teacher not found",
        });
      }

      res.status(200).json({
        message: "Teacher deleted successfully",
      });
    } catch (error) {
      console.error("Delete teacher error:", error);

      res.status(500).json({
        message: "Server Error",
      });
    }
  }
);

export default router;