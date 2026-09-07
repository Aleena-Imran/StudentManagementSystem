import express from "express";

import {
  getMyAttendance,
  getStudentsForAttendance,
  markAttendance,
} from "../controllers/attendanceController.js";

import {
  protect,
  authorize,
} from "../middleware/authMiddleware.js";

const router = express.Router();


// STUDENT
router.get(
  "/my",
  protect,
  authorize("student"),
  getMyAttendance
);


// TEACHER
router.get(
  "/students",
  protect,
  authorize("teacher"),
  getStudentsForAttendance
);

router.post(
  "/",
  protect,
  authorize("teacher"),
  markAttendance
);

export default router;