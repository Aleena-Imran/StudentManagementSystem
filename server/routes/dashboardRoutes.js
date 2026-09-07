import express from "express";

import {
  getDashboardStats,
  getTeacherDashboard,
  getStudentDashboard,
} from "../controllers/dashboardController.js";

import {
  protect,
  authorize,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// ==========================================
// ADMIN DASHBOARD
// ==========================================

router.get(
  "/stats",
  protect,
  authorize("admin"),
  getDashboardStats
);

// TEACHER
router.get(
  "/teacher",
  protect,
  authorize("teacher"),
  getTeacherDashboard
);

// ==========================================
// STUDENT DASHBOARD
// ==========================================

router.get(
  "/student",
  protect,
  authorize("student"),
  getStudentDashboard
);

export default router;